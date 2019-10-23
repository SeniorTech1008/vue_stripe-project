var db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

Vue.filter('capitalize', function(value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

/*Vue.filter('plan', function(value) {
    if (value == 'Pro') {
        return 'Wanderift Pro $459/mo';
    } else if (value == 'Lite') {
        return 'Wanderift Lite $369/mo';
    }
})*/

var app = new Vue({
    el: '#app',
    data: {
        tripType: 2,
        updatePlan: null,
        departure: '',
        customer: null,
        stripeToken: null,
        subscription: false,
        greeting: 'Welcome',
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        selectedSubscription: null,
        newTokens: 0,
        progress: 10,
        max: 100,
        complete: false,
        error: null,
        client: {
            firstname: null,
            lastname: null,
            company: null,
            dob: null,
            gender: null,
            subscriber_market: null,
            email: null,
        },
        tokens: {
            available: 0,
            lastupdated: null,
            plan: null,
            subscription: null,
            subscriptionId: null,
        },
        resetPass: {
            password: null,
            newPassword: null
        },
        error: {
            message: null
        },
        card: {
            number: null, //"4242424242424242",
            cvc: null, //"123",
            nameOnCard: null, //"Samuel M",
            exp_date: '12/2020',
            exp_month: null,
            exp_year: null,
        },
        customerInfo: {
            id: null,
            token: null,
            plan: null,
            planId: null
        },
        flight: {}
    },
    methods: {
        userInfo: function() {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {

                app.client.firstname = (snapshot.val() && snapshot.val().firstname);
                app.client.lastname = (snapshot.val() && snapshot.val().lastname);
                app.client.company = (snapshot.val() && snapshot.val().company);
                app.tokens.available = (snapshot.val() && snapshot.val().tokens.available);
                app.tokens.plan = (snapshot.val() && snapshot.val().tokens.plan);
                app.tokens.subscriptionId = (snapshot.val() && snapshot.val().tokens.subscription);
                app.client.dob = (snapshot.val() && snapshot.val().dob);
                app.client.gender = (snapshot.val() && snapshot.val().gender);
                app.client.email = (snapshot.val() && snapshot.val().email);
                app.client.subscriber_market = (snapshot.val() && snapshot.val().subscriber_market);

                app.client.dob = app.formatDate(app.client.dob);
                if (app.client.gender === "M" || app.client.gender === "F") {
                    app.client.gender = app.client.gender === "M" ? "Male" : "Female";
                }

                var thehours = new Date().getHours();
                if (thehours >= 0 && thehours < 12) {
                    app.greeting = 'Good Morning';
                } else if (thehours >= 12 && thehours < 17) {
                    app.greeting = 'Good Afternoon';
                } else if (thehours >= 17 && thehours < 24) {
                    app.greeting = 'Good Evening';
                }
            });
        },
        saveFfn: function() {

            firebase.database().ref("/frequent-flier-no/").push(app.flight)
                .then(() => {
                    console.log("Saved successfully");
                    app.flight = {};
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateUserDetails: function() {
            var user = firebase.auth().currentUser;
            firebase.database().ref('users/' + user.uid).update(app.client);
            location.reload();
        },
        updatePassword: function() {
            var user = firebase.auth().currentUser;
            let newPassword = app.resetPass.newPassword;

            firebase.auth().signInWithEmailAndPassword(user.email, app.resetPass.password)
                .then(function() {
                    user.updatePassword(newPassword).then(function() {
                        console.log("Password updated successfully");
                        app.resetPass = {};
                    }).catch(function(error) {
                        console.log(error);
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });

        },
        formatDate: function(formDate) {
            let date = new Date(formDate);
            return date.getFullYear() + "-" + ((date.getMonth() + 1) < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
        },
        logout: function() {
            firebase.auth().signOut().then(function() {
                window.location = 'account-corporate-subscription.html';
            }).catch(function(error) {
                console.log("Error logging out")
            });
        },
        closeModal: function() {
            $("#paymentmodal").modal('close');
        },
        updatePayment: function(plan) {
            $("#paymentmodal").modal('show');
            if (plan == "Pro") {
                // app.customerInfo.planId = "plan_Er5i3BJ39A7Ccb"; //text
                app.customerInfo.planId = "plan_ErY8w0nvgrFeCr"; //live

            } else if (plan == "Lite") {
                // app.customerInfo.planId = "plan_Er5i9pQRByOfAE"; //test
                app.customerInfo.planId = "plan_ErY8rm5vhfgKny"; //live

            }
            app.customerInfo.plan = plan;
            console.log(app.customerInfo.plan)
            var user = firebase.auth().currentUser;

            app.progress = 20;
            if (app.card.exp_date) {
                app.card.exp_month = app.card.exp_date.split("/")[0];
                app.card.exp_year = app.card.exp_date.split("/")[1];

                delete app.card.exp_date;
                delete app.card.nameOnCard;
            }
            db.collection('cardInfo').doc(user.uid)
                .set(app.card)
                .then(function() {
                    const config = {
                        baseURL: 'https://wanderift-server-753e6.firebaseapp.com',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    };

                    axios.post('/create-token', app.card, config)
                        .then(function(response) {
                            window.api_response = response;
                            app.stripeToken = response.data.id;
                            app.createCustomer(app.stripeToken);
                            app.progress = 25;
                        })
                        .catch(function(error) {
                            app.error = error.message;
                        })

                });
        },
        createCustomer: function(token) {
            var user = firebase.auth().currentUser;

            const customerData = {
                email: user.email,
                description: user.name,
                source: token
            };

            const config = {
                baseURL: 'https://wanderift-server-753e6.firebaseapp.com',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            axios.post('/customers', customerData, config)
                .then(function(response) {

                    app.customer = response.data;
                    app.customerInfo.id = app.customer.id;
                    app.customerInfo.token = token;
                    console.log(app.customerInfo);
                    db.collection('customerInfo').doc(user.uid)
                        .set(app.customerInfo)
                        .then(function() {
                            console.log("Customer data saved successfully")
                            app.subscribe();
                            app.progress = 50;
                        })
                        .catch(function(error) {
                            app.error = error.message;
                        })
                })
                .catch(function(error) {
                    app.error = error.message;
                });
        },
        subscribe() {
            if (app.customerInfo.id) {
               /* const subscription = {
                    customer: app.customerInfo.id,
                    plan: app.customerInfo.planId
                };

                if (app.customerInfo.plan === "Free") {
                    app.newTokens = 0
                } else if (app.customerInfo.plan === "Pro") {
                    app.newTokens = 4
                } else if (app.customerInfo.plan === "Lite") {
                    app.newTokens = 3
                }
                app.progress = 75;
                const config = {
                    baseURL: 'https://wanderift-server-753e6.firebaseapp.com',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                var user = firebase.auth().currentUser;
                app.tokens.available += app.newTokens
                axios.post('/subscriptions  ', subscription, config)
                    .then(function(response) {
                        if (response.data.id) {
                            app.progress = 80;
                            var d = new Date();
                            var n = d.getMonth();
                            firebase.database().ref('users/' + user.uid).update({
                                    tokens: {
                                        available: app.tokens.available,
                                        lastupdated: n,
                                        plan: app.customerInfo.plan,
                                        subscription: response.data.id
                                    }
                                })
                                .then(function() {
                                    app.progress = 100;
                                    app.complete = true;
                                    setTimeout(() => {
                                        $("#paymentmodal").modal('toggle');
                                        $("#paymentSuccess").modal('show')
                                            // window.location = "index.html"
                                    }, 1000);

                                })
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                        app.error = error;
                    });*/
            } else {
                alert("Please add a payment card on Payment Preference");
            }
        },
        cancleSubscription: function() {
            const config = {
                baseURL: 'https://wanderift-server-753e6.firebaseapp.com',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            console.log(app.tokens.subscriptionId);
            let sub = {
                id: app.tokens.subscriptionId
            }
            var user = firebase.auth().currentUser;
            axios.post('/cancel-subscriptions  ', sub, config)
                .then(function(response) {
                    if (response.data) {
                        var d = new Date();
                        var n = d.getMonth();
                        firebase.database().ref('users/' + user.uid).update({
                            tokens: {
                                available: 0,
                                lastupdated: n,
                                plan: null,
                                subscription: null
                            }
                        });
                        db.collection('customerInfo').doc(user.uid).update({
                                token: null,
                                plan: "Free",
                                planId: null
                            })
                            .then(function() {
                                location.reload();
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }
                })
                .catch(function(error) {
                    console.log(error)
                });
        }
    },
    beforeMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
            if (user) {
                app.userInfo();
                let cardDoc = db.collection("cardInfo").doc(user.uid);
                cardDoc.get().then(function(card) {
                    if (card.exists) {
                        app.card = card.data();
                        app.card.nameOnCard = user.email.split("@")[0];
                        app.card.exp_date = app.card.exp_month + "/" + app.card.exp_year;
                        console.log(app.card);
                    } else {
                        console.log("Card information not found");
                    }
                });

                let customerDoc = db.collection("customerInfo").doc(user.uid);
                customerDoc.get().then(function(customer) {
                    if (customer.exists) {
                        app.customerInfo = customer.data();
                    } else {
                        console.log("Customer not found");
                    }
                });
            } else {
                window.location = 'account-corporate-subscription.html';
            }

        });
    }
});