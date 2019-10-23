const app = new Vue({
    el: '#app',
    data: {
        dataSource: [],
        results: {},
        dep_date: null,
        ret_date: null,
        greeting: null,
        loggedin: false,
        flightType: null,
        search: {
            fly_from: '',
            fly_to: '',
            dateFrom: null,
            dateTo: null,
            apikey: "xklKtpJ5fxZnk4rsDepqOzLUaYYAO9dI"
        }
    },
    methods: {
        userInfo: function() {
            var user = firebase.auth().currentUser;

            if (user) {
                app.loggedin = true;
                firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {

                    var subscriberMarket = (snapshot.val() && snapshot.val().subscriber_market);
                    app.firstName = (snapshot.val() && snapshot.val().firstname);
                    app.secondName = (snapshot.val() && snapshot.val().lastname);
                    app.tokens = (snapshot.val() && snapshot.val().tokens.available);
                    app.plan = (snapshot.val() && snapshot.val().tokens.plan);

                    var thehours = new Date().getHours();
                    if (app.firstName) {
                        if (thehours >= 0 && thehours < 12) {
                            app.greeting = 'Good morning ' + app.firstName;
                        } else if (thehours >= 12 && thehours < 17) {
                            app.greeting = 'Good afternoon ' + app.firstName;
                        } else if (thehours >= 17 && thehours < 24) {
                            app.greeting = 'Good evening ' + app.firstName;
                        }
                    } else {
                        if (thehours >= 0 && thehours < 12) {
                            app.greeting = 'Good Morning ';
                        } else if (thehours >= 12 && thehours < 17) {
                            app.greeting = 'Good Afternoon ';
                        } else if (thehours >= 17 && thehours < 24) {
                            app.greeting = 'Good Evening ';
                        }
                    }

                });
            }
        },
        pageLoad: function() {
            if (sessionStorage.getItem("flightSearchResult") == null) {
                let params = new URLSearchParams();
                params.append('fly_from', 'DFW');
                params.append('fly_to', 'IAH');
                params.append('dateFrom', app.formatDate(new Date() + 1));
                params.append('dateTo', app.formatDate(new Date() + 2));
                params.append('apikey', app.search.apikey);

                axios.get('https://kiwicom-prod.apigee.net/v2/search?' + params.toString())
                    .then(function(response) {
                        sessionStorage.setItem("flightSearchResult", JSON.stringify(response.data.data));
                        app.results = JSON.parse(sessionStorage.getItem("flightSearchResult"));

                        app.results.forEach(function(trip) {
                            if (trip.route.length <= 1) {
                                app.dataSource.push(trip);
                            }
                        })
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            } else {
                app.results = JSON.parse(sessionStorage.getItem("flightSearchResult"));

                app.results.forEach(function(trip) {
                    if (trip.route.length <= 1) {
                        app.dataSource.push(trip);
                    }
                })
            }


            if (sessionStorage.getItem("two_way") == 'true') {
                return app.flightType = 'Select Return Flight';
            } else {
                return app.flightType = 'Select Departure Flight';
            }

        }
    },
    beforeMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                app.userInfo();
            }
        });
    }
});

app.pageLoad();
