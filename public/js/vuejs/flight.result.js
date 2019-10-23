$(".before-load").css("display", "block");
$(".body-page").css("display", "none");
$("#fast_facts").css('display', 'none');

Vue.filter('airlines', function(value) {
    switch (value) {
        case 'DL':
            return "Delta";
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
            return value[0];
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

    if (arr.length - 1 == 1 || arr.length - 1 == 0) {
        return 'Non';
    }
    return arr.length - 1;
});

Vue.filter('tokens', function(tokens) {
    if (tokens == 1) {
        return tokens + " Token";
    }

    return tokens + " Tokens";
});

Vue.filter('stops', function(arr) {
    let stops = '';
    for (let i = 1; i <= arr.length - 1; i++) {
        if (i == 1) {
            stops += arr[i].flyFrom;
        } else {
            stops += ", " + arr[i].flyFrom;
        }
    }
    return stops;
});
const app = new Vue({
    el: '#app',
    data: {
        dataSource: [],
        results: {},
        dep_date: null,
        ret_date: null,
        greeting: null,
        loggedin: false,
        flight_type: null,
        airlines: new Set(),
        two_way: sessionStorage.getItem('two_way') ? sessionStorage.getItem('two_way') : 'true',
        airlineFilter: 'true',
        dateFilter: 'true',
        fast_facts: 'American Airlines is the most booked carrier on Wanderift',
        advertSource: {
            return: {
                image_src: "images/flightnetwork.png",
                title: "Our Lowest Prices are Limited",
                body: "View deals before seats sell out and prices increase",
                website: "FlightNetwork.com"
            }
        },
        search: {
            fly_from: '',
            fly_to: '',
            depDate: null,
            retDate: null,
            apikey: "xklKtpJ5fxZnk4rsDepqOzLUaYYAO9dI"
        },
        tokens: {
            available: 0,
            lastupdated: null,
            plan: null,
            subscription: null,
            subscriptionId: null,
        },
        advert: [{
                image_src: "images/flightnetwork.png",
                title: "Our Lowest Prices are Limited",
                body: "View deals before seats sell out and prices increase",
                website: "FlightNetwork.com",
                url: "https://www.flightnetwork.com/en-us/"
            },
            {

                image_src: "images/priceline.png",
                title: "Need a Rental Car?",
                body: "Get a great deal on rental cars through Priceline",
                website: "Priceline.com",
                url: "https://www.priceline.com/"

            },
            {

                image_src: "images/stasher_logo.png",
                title: "Luggage storage in trusted shops & hotels",
                body: "Pay a small, fixed price and 24 hours of storage is yours,",
                website: "Stasher.com",
                url: "https://www.priceline.com/"

            },
        ],
        isRun: false,
        // advert_no: Math.floor(Math.random() * 3)
        return: {
            advert_no: Math.floor(Math.random() * 3)
        }
    },
    computed: {
        myMethod: function() {
            this.isRun == this.isRun
        },
        displayAdvert: function() {
            this.isRun == this.isRun
        },
    },
    methods: {
        userInfo: function() {
            let user = firebase.auth().currentUser;
            if (user) {
                app.loggedin = 'true';
                firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {

                    var subscriberMarket = (snapshot.val() && snapshot.val().subscriber_market);
                    app.firstName = (snapshot.val() && snapshot.val().firstname);
                    app.secondName = (snapshot.val() && snapshot.val().lastname);
                    if (snapshot.val().tokens) {
                        app.tokens.available = (snapshot.val() && snapshot.val().tokens.available);
                        app.tokens.plan = (snapshot.val() && snapshot.val().tokens.plan);
                        app.tokens.subscriptionId = (snapshot.val() && snapshot.val().tokens.subscription);
                        app.plan = (snapshot.val() && snapshot.val().tokens.plan);
                    }
                    var thehours = new Date().getHours();
                    if (thehours >= 0 && thehours < 12) {
                        app.greeting = 'Good Morning ' + app.firstName;
                    } else if (thehours >= 12 && thehours < 17) {
                        app.greeting = 'Good Afternoon ' + app.firstName;
                    } else if (thehours >= 17 && thehours < 24) {
                        app.greeting = 'Good Evening ' + app.firstName;
                    }
                });
            }
        },
        decodeFlight: function(flight) {
            switch (flight) {
                case 'DL':
                    return "Delta";
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
                    return flight[0];
                    break;
            }
        },
        confirmBooking: function(selectedFlight) {
            let loggedin = firebase.auth().currentUser;
            if (loggedin) {
                if (app.tokens.available == 0) {
                    $("#noTokenModal").modal('show');
                    return;
                }
                let params = new URLSearchParams();
                params.append('booking_token', selectedFlight.booking_token);
                params.append('bnum', 0);
                params.append('pnum', 1);
                params.append('visitor_uniqid', loggedin.uid);
                params.append('currency', 'USD');
                params.append('apikey', app.search.apikey);

                axios.get('https://kiwicom-prod.apigee.net/v2/booking/check_flights?' + params.toString())
                    .then(function(response) {
                        console.log(JSON.stringify(response.data));
                        sessionStorage.setItem("selectedFlight", JSON.stringify(response.data));
                        window.location = "confirm-booking.html";
                    });
            } else {
                sessionStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));
                $("#flightSearchModal").modal('show');
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
        directFlight: function() {
            app.dataSource.forEach((flight, index, arr) => {
                console.log(flight.route.length);
                if (flight.route.length > 1) {
                    delete app.dataSource[index];
                }
            });
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
            $("#fast_facts").css('display', 'block');
            if (sessionStorage.getItem('two_way') != 'true' && sessionStorage.getItem('two_way') != 'false') {
                sessionStorage.setItem('two_way', 'true');
            }

            if (JSON.parse(sessionStorage.getItem("flightSearchResult")) != null) {
                app.results = JSON.parse(sessionStorage.getItem("flightSearchResult"));
                app.two_way = sessionStorage.getItem('two_way');

                function compare(a, b) {
                    if (a.fare.adults < b.fare.adults) {
                        return -1;
                    }
                    if (a.fare.adults > b.fare.adults) {
                        return 1;
                    }
                    return 0;
                }
                app.results.sort(compare);

                let tempArr = [];
                app.results.forEach((item) => {
                    if (item.fare.adults < 450) {
                        tempArr.push(item);
                    }
                });

                app.results = tempArr;

                app.results.forEach(item => {
                    item.route.forEach(route => {
                        app.airlines.add(route.airline);
                    })
                })

                console.log(app.airlines);
                $(".before-load").css("display", "none");
                $(".body-page").css("display", "block");

                if (app.two_way == 'false') {
                    app.results.forEach(function(trip) {
                        if (trip.route.length == 1) {
                            app.dataSource.push(trip);
                            $(".before-load").css("display", "none");
                            $(".body-page").css("display", "block");
                            $(".flight-display").css("display", "block");
                        }
                    });

                } else if (app.two_way == 'true') {
                    app.results.forEach(function(trip) {
                        if (trip.route.length <= 2) {
                            if (app.formatDate(trip.local_departure) == sessionStorage.getItem("depDate") && app.formatDate(trip.route[1].local_departure) == sessionStorage.getItem("retDate")) {
                                app.dataSource.push(trip);
                                $(".before-load").css("display", "none");
                                $(".body-page").css("display", "block");
                                $(".flight-display").css("display", "block");
                            }
                        }
                    });
                } else {
                    app.results.forEach(function(trip) {
                        if (trip.route.length <= 2) {
                            app.dataSource.push(trip);
                            $(".before-load").css("display", "none");
                            $(".body-page").css("display", "block");
                            $(".flight-display").css("display", "block");
                        }
                    });
                }

                if (app.dataSource.length == 0) {
                    app.dateFilter = 'false';
                    app.results.forEach(function(trip) {
                        if (trip.route.length <= 2) {
                            app.dataSource.push(trip);
                            $(".before-load").css("display", "none");
                            $(".body-page").css("display", "block");
                        }
                    });
                } else {
                    app.dateFilter = 'true';
                    $(".before-load").css("display", "none");
                    $(".body-page").css("display", "block");
                    $(".flight-display").css("display", "block");
                }
            }
        },
        randomFacts: function() {
            facts = [
                "American Airlines is the most booked carrier on Wanderift”, \
        “An aircraft takes off or lands every 37 seconds at Chicago O'Hare's International Airport.”,\
        “1919. KLM Royal Dutch Airlines is the world's oldest airline, established in 1919.”,\
        “The Boeing 747 wing-span (195 feet) is longer than the Wright Brothers first flight of 120ft.”,\
        “At any given hour there are over 61,000 people airborne over the USA."
            ]

            return facts[Math.floor(Math.random() * 7)];
        },
        searchFlight: function(e) {
            $('#overlay').css("display", "block");
            let final_date = $('input[name="datefilterstart"]').val();
            let final_date_r = $('input[name="datefilterend"]').val();
            let departure = $('select[name="departure"]').val();
            let arrival = $('#arrival').val();

            app.search.fly_from = departure;
            app.search.fly_to = arrival;
            app.search.depDate = this.formatDate(final_date);
            app.search.retDate = this.formatDate(final_date_r);
            app.search.created = new Date();

            firebase.database().ref("/flightSearch/").push(app.search)
                .then(() => {
                    console.log("Flight Search saved successfully");
                })
                .catch((error) => {
                    console.log(error);
                });

            sessionStorage.setItem("depDate", this.formatDate(final_date));
            sessionStorage.setItem("retDate", this.formatDate(final_date_r));

            let params = new URLSearchParams();
            params.append('fly_from', app.search.fly_from);
            params.append('fly_to', app.search.fly_to);
            params.append('date_from', app.search.depDate);
            params.append('date_to', app.search.depDate);
            if (app.two_way == 'true') {
                params.append('return_from', app.search.retDate);
                params.append('return_to', app.search.retDate);
            }
            params.append('apikey', app.search.apikey);

            console.log(params.toString());
            axios.get('https://kiwicom-prod.apigee.net/v2/search?' + params.toString())
                .then(function(response) {
                    $('#overlay').css("display", "none");
                    sessionStorage.setItem("flightSearchResult", JSON.stringify(response.data.data));
                    window.location = "index.html";
                })
                .catch(function(error) {
                    console.log(error);
                });

        },
        formatDate: function(formDate) {
            let date = new Date(formDate);
            return date.getDate() + "/" + (1 + date.getMonth()) + "/" + date.getFullYear()
        },
        checkIndex: function(flight) {

            if (flight.route.length <= 2) {
                let index = app.dataSource.indexOf(flight);
                if (index % 5 == 0 && index != 0) {
                    app.isRun = true;
                    advert_no = Math.floor(Math.random() * 3);
                    return false;
                } else {
                    return true;
                }
            }

            return true;

        },
        filterByAirline: function(airline) {
            let newDataSource = JSON.parse(sessionStorage.getItem("flightSearchResult"));
            app.dataSource = [];
            newDataSource.forEach(function(flight) {
                airlineName = app.decodeFlight(flight.airlines[0]);
                if (airlineName == airline && flight.route.length <= 2) {
                    app.dataSource.push(flight);
                }
            });


            if (app.dataSource.length == 0) {
                app.airlineFilter = 'false';
                newDataSource.forEach(function(trip) {
                    if (trip.route.length <= 2) {
                        app.dataSource.push(trip);
                    }
                });
            } else {
                app.airlineFilter = 'true';
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

if ($(window).outerWidth() > 500) {

    $("#oneway").css('color', 'gray');

    $("#oneway").on('click', function() {
        $("#oneway").css('color', 'white');
        $("#roundtrip").css('color', 'gray');
        $("#returndate").prop('disabled', 'true');
        sessionStorage.setItem("two_way", 'false');
        app.two_way = 'false';
        if (app.dataSource[0] && app.dataSource[0].route.length == 2 && app.dataSource[0].route[0].flyTo == app.dataSource[0].route[1].flyFrom) {
            app.dataSource = [];
        } else {
            app.results.forEach(function(trip) {
                if (trip.route.length == 1) {
                    app.dataSource.push(trip);
                }
            });
        }
    });
    $("#roundtrip").on('click', function() {
        $("#oneway").css('color', 'gray');
        $("#roundtrip").css('color', 'white');
        $("#returndate").removeAttr('disabled');
        sessionStorage.setItem("two_way", 'true');
        app.two_way = 'true';
        if (app.dataSource[0] && (app.dataSource[0].route.length == 1 || app.dataSource[0].route.length > 2 || app.dataSource[0].route.length > 2 && app.dataSource[0].route[0].flyTo != app.dataSource[0].route[1].flyFrom)) {
            app.dataSource = [];
        } else {
            app.results.forEach(function(trip) {
                if (trip.route.length <= 2) {
                    app.dataSource.push(trip);
                }
            });
        }

    });

    if (app.two_way == 'true') {
        $("#oneway").css('color', 'gray');
        $("#roundtrip").css('color', 'white');
        $("#returndate").removeAttr('disabled');
    } else if (app.two_way == 'false') {
        $("#oneway").css('color', 'white');
        $("#roundtrip").css('color', 'gray');
        $("#returndate").prop('disabled', 'true');
    }
} else if ($(window).outerWidth() < 500) {

    $("#oneway").css('color', 'gray');
    // $("#roundtrip").css('color', 'white')

    $("#oneway").on('click', function() {
        sessionStorage.setItem("two_way", 'false');
        app.two_way = 'false';
        if (app.dataSource[0] && app.dataSource[0].route.length == 2 && app.dataSource[0].route[0].flyTo == app.dataSource[0].route[1].flyFrom) {
            app.dataSource = [];
        } else {
            app.dataSource = app.results;
        }

        $("#oneway").css('color', '#0abafe');
        $("#roundtrip").css('color', 'gray');
        $("#returndate").prop('disabled', 'true');
    });
    $("#roundtrip").on('click', function() {
        sessionStorage.setItem("two_way", 'true');
        app.two_way = 'true';
        if (app.dataSource[0] && (app.dataSource[0].route.length == 1 || app.dataSource[0].route.length > 2 || app.dataSource[0].route.length > 2 && app.dataSource[0].route[0].flyTo != app.dataSource[0].route[1].flyFrom)) {
            app.dataSource = [];
        } else {
            app.results.forEach(function(trip) {
                if (trip.route.length <= 2) {
                    app.dataSource.push(trip);
                }
            });
        }
        $("#oneway").css('color', 'gray');
        $("#roundtrip").css('color', '#0abafe');
        $("#returndate").removeAttr('disabled');
    });

    if (app.two_way == 'true') {
        $("#oneway").css('color', 'gray');
        $("#roundtrip").css('color', '#0abafe');
        $("#returndate").removeAttr('disabled');
    } else if (app.two_way == 'false') {
        $("#oneway").css('color', '#0abafe');
        $("#roundtrip").css('color', 'gray');
        $("#returndate").prop('disabled', 'true');
    }
}


$(document).ready(function() {
    $('#overlay').css("display", "none");
    scrollTop: 300;
});