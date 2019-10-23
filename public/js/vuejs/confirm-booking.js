var db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

Vue.filter('airlines', function(value) {
    switch (value) {
        case 'DL':
            return "Delta";
        case 'AS':
            return 'Alaska Airlines';
            break;
        case 'NK':
            return 'Spirit Airlines';
            break;
        case 'B6':
            return 'JetBlue';
            break;
        case 'F9':
            return 'Frontier';
            break;
        case 'G4':
            return 'Allegiant';
            break;
        case 'UA':
            return 'United';
            break;
        case 'AA':
            return 'American';
            break;
        case 'WN':
            return 'Southwest';
            break;
        default:
            return value;
            break;
    }
})

Vue.filter('datediff', function(value) {
    let duration = (new Date(value.local_arrival).getTime() - new Date(value.local_departure).getTime());
    let hours = Math.floor(duration / 3600000);
    let minutes = Math.floor((duration % 3600000) / 60000);

    return hours + "h " + minutes + "m";
});

Vue.filter('length', function(arr) {
    return arr.length
});
const app = new Vue({
    el: '#app',
    data: {
        dataSource: {},
        card: {},
        two_way: 'true',
        subscription: null,
        plan: null,
        firstname: null,
        secondname: null,
        gender: null,
        dob: null,
        tokens: 0,
        apikey: "xklKtpJ5fxZnk4rsDepqOzLUaYYAO9dI",
        success: null,
        bookingError: {},
        booked: {
            title: "You're All Set!",
            message: `We've received your booking for Dallas - Las Vegas,
            you will receive an email with your confirmation number and trip details shortly!`,
            status: false
        }
    },
    methods: {
        userInfo: function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    app.loggedin = true;
                    firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {

                        var subscriberMarket = (snapshot.val() && snapshot.val().subscriber_market);
                        app.firstName = (snapshot.val() && snapshot.val().firstname);
                        app.dob = (snapshot.val() && snapshot.val().dob);
                        app.gender = (snapshot.val() && snapshot.val().gender);
                        app.secondName = (snapshot.val() && snapshot.val().lastname);
                        app.tokens = (snapshot.val() && snapshot.val().tokens.available);
                        app.plan = (snapshot.val() && snapshot.val().tokens.plan);

                        var thehours = new Date().getHours();
                        if (thehours >= 0 && thehours < 12) {
                            app.greeting = 'Good Morning ' + app.firstName;
                        } else if (thehours >= 12 && thehours < 17) {
                            app.greeting = 'Good Afternoon ' + app.firstName;
                        } else if (thehours >= 17 && thehours < 24) {
                            app.greeting = 'Good Evening ' + app.firstName;
                        }
                    });
                } else {
                    alert("Please login to continue");
                    window.location = "index.html";
                }
            });
        },
        confirmBooking: function(flightBooked) {
            $("#myModal").modal("show");
            var user = firebase.auth().currentUser;
            if (user) {

                firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {

                    let cardDoc = db.collection("cardInfo").doc(user.uid);
                    cardDoc.get().then(function(card) {
                        if (card.exists) {
                            app.card = card.data();
                            let params = new URLSearchParams();
                            params.append('visitor_uniqid', user.uid);
                            params.append('apikey', app.apikey);

                            let passengerData = {
                                bags: 0,
                                booking_token: flightBooked.booking_token,
                                currency: "usd",
                                lang: "en",
                                locale: "en",
                                passengers: [{
                                    birthday: app.dob,
                                    cardno: app.card.number,
                                    category: "adults",
                                    email: user.email,
                                    expiration: app.card.exp_month + "/" + app.card.exp_year,
                                    name: app.firstName,
                                    nationality: "SE",
                                    surname: app.secondName,
                                    phone: "",
                                    title: app.gender == "Male" ? "Mr" : "Mrs"
                                }]
                            }
                            const config = {
                                baseURL: 'https://wanderift-server-753e6.firebaseapp.com',
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            };

                            axios.post('https://kiwicom-prod.apigee.net/v2/booking/save_booking?' + params.toString(), JSON.stringify(passengerData), config)
                                .then(function(response) {

                                    if (app.tokens > 0) {

                                        const firestore = firebase.firestore();
                                        const settings = { timestampsInSnapshots: true };
                                        firestore.settings(settings);

                                        let booking = {};
                                        let ded_token = 0;
                                        if (sessionStorage.getItem("two_way") == 'true') {
                                            flightBooked = flightBooked;
                                            booking.return = {};
                                            booking.useremail = user.email;
                                            booking.dep_city = flightBooked.flights[0].src;
                                            booking.ari_city = flightBooked.flights[0].dst;
                                            booking.dep_date = app.timestampToDate(flightBooked.flights[0].local_departure);
                                            booking.arr_date = app.timestampToDate(flightBooked.flights[0].local_arrival);
                                            booking.carrier = flightBooked.flights[0].operating_airline.name;
                                            booking.booked_on = new Date().getTime();
                                            booking.return.dep_city = flightBooked.flights[1].src;
                                            booking.return.ari_city = flightBooked.flights[1].dst;
                                            booking.return.dep_date = app.timestampToDate(flightBooked.flights[1].local_departure);
                                            booking.return.arr_date = app.timestampToDate(flightBooked.flights[1].local_arrival);
                                            booking.return.carrier = flightBooked.flights[1].operating_airline.name;
                                            ded_token = 2;

                                            firebase.database().ref("/flightBooking/").push(booking)
                                                .then(() => {
                                                    console.log("Flight book saved successfully");
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });

                                            //deducting token from available tokens
                                            let newToken = app.tokens - ded_token;

                                            newToken < 0 ? 0 : newToken;

                                            var postData = { available: newToken, subscription: app.subscription, plan: app.plan, lastupdated: new Date().getMonth() };
                                            var updates = {};
                                            //updating data
                                            updates['/users/' + user.uid + '/tokens/'] = postData;

                                            firebase.database().ref().update(updates);

                                            // window.location = "index.html";
                                            // email: 'bookings@wanderift.com
                                        } else {
                                            flightBooked = flightBooked;
                                            ded_token = 1;
                                            booking.useremail = user.email;
                                            booking.dep_city = flightBooked.flights[0].src;
                                            booking.ari_city = flightBooked.flights[0].dst;
                                            booking.dep_date = app.timestampToDate(flightBooked.flights[0].local_departure);
                                            booking.arr_date = app.timestampToDate(flightBooked.flights[0].local_arrival);
                                            booking.carrier = flightBooked.flights[0].operating_airline.name;
                                            booking.booked_on = new Date().getTime();

                                            firebase.database().ref("/flightBooking/").push(booking)
                                                .then(() => {
                                                    console.log("Flight book saved successfully");
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });

                                            //deducting token from available tokens
                                            let newToken = app.tokens - ded_token;

                                            newToken < 0 ? 0 : newToken;

                                            alert(newToken);
                                            var postData = { available: newToken, subscription: app.subscription, plan: app.plan, lastupdated: new Date().getMonth() };
                                            var updates = {};
                                            //updating data
                                            updates['/users/' + user.uid + '/tokens/'] = postData;

                                            firebase.database().ref().update(updates);

                                            // window.location = "index.html";
                                        }
                                    } else {
                                        alert("Insufficient tokens to book flight. Please recharge your tokens");
                                        window.location = "account.html"
                                    }
                                    app.booked.status = true;
                                })
                                .catch((error) => {
                                    app.success = false;
                                    app.bookingError = error;

                                    app.booked.title = "Error";
                                    app.booked.message = "Failed to booke flight. Please Contact support at info@wanderift.com";
                                    app.booked.status = true;
                                });
                        } else {
                            console.log("Card information not found");
                        }
                    });
                })
            } else {
                alert("Please Login to book flights")
                window.location = "index.html"
            }
        },
        toTitleCase: function(str) {
            str = str.replace("_", " ");
            return str.replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
        },
        decodeFlight: function(flight) {
            switch (flight) {
                case 'DL':
                    return "Delta";
                    break;
                case 'AS':
                    return 'Alaska';
                    break;
                case 'NK':
                    return 'Spirit';
                    break;
                case 'B6':
                    return 'JetBlue';
                    break;
                case 'F9':
                    return 'Frontier';
                    break;
                case 'G4':
                    return 'Allegiant';
                    break;
                case 'UA':
                    return 'United';
                    break;
                case 'AA':
                    return 'American';
                    break;
                case 'WN':
                    return 'Southwest';
                    break;
                case 'SY':
                    return 'Sun Country';
                    break;
                default:
                    return flight;
                    break;
            }
        },
        getFlightImage: function(flight) {

            switch (app.decodeFlight(flight)) {
                case "American":
                    return "images/american_airlines_logo.png";
                case "United":
                    return "images/united_airlines.png";
                case "Delta":
                    return "images/delta_airlines.png";
                case 'Alaska':
                    return "images/alaska.jpg";
                case 'Spirit':
                    return 'images/spirit.jpg';
                case 'JetBlue':
                    return 'images/jet_Blue.jpg';
                case 'Frontier':
                    return 'images/frontier_airlines.png';
                case 'Allegiant':
                    return 'images/allegiant_air.png';
                case 'Southwest':
                    return 'images/southwest_airlines_logo.png';
                case 'Sun Country':
                    return 'images/sun_country.png';
                case 'Multiple':
                    return 'img/multiple_airlines.png'
                default:
                    return null;
            }
        },
        pageLoad: function() {
            app.userInfo();
            app.two_way = sessionStorage.getItem("two_way");
            app.results = JSON.parse(sessionStorage.getItem("selectedFlight"));
            app.dataSource = app.results;
        },
        timestampToDate: function(date) {
            let d = new Date(date);
            return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        },
        selectReturn: function(dataSource) {
            sessionStorage.setItem("two_way", true);
            sessionStorage.setItem("round_one", JSON.stringify(dataSource));
            app.displayDeparture = false;

            let params = new URLSearchParams();
            params.append('fly_from', dataSource.flyTo);
            params.append('fly_to', dataSource.flyFrom);
            params.append('dateFrom', this.timestampToDate(dataSource.local_departure));
            params.append('dateTo', this.timestampToDate(dataSource.local_arrival));
            params.append('apikey', "xklKtpJ5fxZnk4rsDepqOzLUaYYAO9dI");
            axios.get('https://kiwicom-prod.apigee.net/v2/search?' + params.toString())
                .then(function(response) {
                    sessionStorage.setItem("flightSearchResult", JSON.stringify(response.data.data));
                    window.location = "index.html";
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    }
});

app.pageLoad();

// FqBqlDXDRPXhBLJQLWZk1Q1bAoi2