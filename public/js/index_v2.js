var db = firebase.database();

var firestoredb = firebase.firestore();

// var username = document.getElementById('user-name');
// var availableTokens = document.getElementById('available-tokens');
// var tokenplus = document.getElementById('tokenplus');


// firebase calls
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         // console.log(user)
//         getUserDetails()
//         emailInput.value = user.email
//     }
// });

// function getUserDetails(uid) {
//     var userId = firebase.auth().currentUser.uid;

//     firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {

//         var subscriberMarket = (snapshot.val() && snapshot.val().subscriber_market);
//         var firstName = (snapshot.val() && snapshot.val().firstname);
//         var lastName = (snapshot.val() && snapshot.val().lastname);
//         var tokens = (snapshot.val() && snapshot.val().tokens.available);

//         onLoadPage(subscriberMarket);
//         username.innerHTML = firstName + ' ' + lastName
//         availableTokens.innerHTML = tokens
//         if (tokens > 0) {
//             tokenplus.style.display = "none";
//         } else {
//             tokenplus.style.display = "block";
//         }
//     });

// }


var dataScheme = {
    obj1: {
        ari_city: "Austin",
        carrier: "Delta Airlines",
        date: "2/17/2019",
        dep_city: "Atlanta",
        price: 170,
        time: "6:05 AM - 11:03 AM",
    }
};

//  var initialData = [ { ari_city: "Atlanta",
//     carrier: "Delta Airlines",
//     date: "2/29/2019",
//     dep_city: "Austin",
//     price: 170,
//     time: "11:05 AM - 01:03 PM",}];


// initialData.forEach((e) => {

//     firestoredb.collection('flightsData').add(e).then(status => {
//     console.log('written to db');
// });

// });


function getDatafromFB(queryData) {

    if (typeof queryData.counter == 'undefined') {
        queryData.counter = 0;
    }

    if (queryData.trip_type == 1) {

        firestoredb.collection('flightsData')
            .where('dep_city', '==', queryData.dep_city)
            .where('ari_city', '==', queryData.ari_city)
            .where('date', '==', queryData.trip_date)
            .orderBy('price', 'asc').get().then((e) => {
            let count = 0;

            if (e.size < 1) {
                /*console.log(queryData.counter);
                if(queryData.counter > 14) {
                    showNotFoundError();
                    return false;
                }
                var date = new Date(queryData.trip_date);
                var new_date = (date.getMonth() + 1) +'/'+ (date.getDate() + 1) + '/' + date.getFullYear();
                queryData.trip_date = new_date;
                queryData.counter++;
                showAlternateDateMesg();
                getDatafromFB(queryData);
                return false;*/

                for (var i = 0; i < getRandomInt(1, 3); i++) {

                    e = {
                        "ari_city": queryData.ari_city,
                        "date": queryData.trip_date,
                        "dep_city": queryData.dep_city,
                        "price": 90,
                        "carrier": getRandomFlight(),
                        "time": getRandomTime()
                    };

                    /*if (i === 0) {
                        e["time"] = getRandomInt(7, 9) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM";
                    } else if (i === 1) {
                        e["time"] = getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(12, 15) + ":" + getRandomInt(10, 59) + " PM";
                    } else if (i === 2) {
                        e["time"] = getRandomInt(15, 18) + ":" + getRandomInt(10, 59) + " PM - " + getRandomInt(18, 22) + ":" + getRandomInt(10, 59) + " PM";
                    }*/

                    var gen_data = {
                        trip_type: '1',
                        trip_data: e,
                    }

                    generateFlightBoxes(gen_data);
                }
                return;
            }

            e.forEach((doc) => {
                var gen_data = {
                    trip_type: '1',
                    trip_data: doc.data(),
                }

                if (count < 3) {
                    generateFlightBoxes(gen_data);
                }

                count++;
            });


        });

    } else {

        firestoredb.collection('flightsData')
            .where('dep_city', '==', queryData.dep_city)
            .where('ari_city', '==', queryData.ari_city)
            .where('date', '==', queryData.trip_date)
            .orderBy('price', 'asc').get().then((e) => {
            let count = 0;

            if (e.size < 1) {

                // console.log('size less than 1 ');
                // console.log(queryData);

                /*if (queryData.counter > 14) {
                    showNotFoundError();
                    return false;
                }

                var date = new Date(queryData.trip_date);

                var new_date = (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' + date.getFullYear();
                queryData.trip_date = new_date;
                queryData.counter++;
                getDatafromFB(queryData);
                showAlternateDateMesg();
                return false;*/

                for (var i = 0; i < 3; i++) {

                    e = {
                        "ari_city": queryData.ari_city,
                        "date": queryData.trip_date,
                        "dep_city": queryData.dep_city,
                        "price": 90,
                        "carrier": getRandomFlight(),
                        "time": getRandomTime()
                    };

                    /*if (i === 0) {
                        e["time"] = getRandomInt(7, 9) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM";
                    } else if (i === 1) {
                        e["time"] = getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(12, 15) + ":" + getRandomInt(10, 59) + " PM";
                    } else if (i === 2) {
                        e["time"] = getRandomInt(15, 18) + ":" + getRandomInt(10, 59) + " PM - " + getRandomInt(18, 22) + ":" + getRandomInt(10, 59) + " PM";
                    }*/

                    var gen_data = {
                        trip_type: '2',
                        trip_data: e,
                        index: i,
                    }

                    generateFlightBoxes(gen_data);
                }
            } else {

                e.forEach((doc) => {

                    var gen_data = {
                        trip_type: '2',
                        trip_data: doc.data(),
                        index: count,
                    }
                    if (count < 3) {
                        generateFlightBoxes(gen_data);
                    }

                    count++;
                });
            }

        });


        firestoredb.collection('flightsData').where('dep_city', '==', queryData.ari_city).where('ari_city', '==', queryData.dep_city).where('date', '==', queryData.return_date).orderBy('price', 'asc').get().then((e) => {
            let count = 0;

            // if(e.size < 1) {

            //     if(queryData.counter > 14) {

            //        // showNotFoundError();
            //         return false;
            //     }


            //     var date = new Date(queryData.return_date);

            //     var new_date = (date.getMonth() + 1) +'/'+ (date.getDate() + 1) + '/' + date.getFullYear();
            //     queryData.return_date = new_date;
            //     queryData.counter++;
            //     getDatafromFB(queryData);
            //     showAlternateDateMesg();
            //     return false;
            // }

            if (e.size < 1) {

                for (var i = 0; i < 3; i++) {

                    e = {
                        "ari_city": queryData.dep_city,
                        "date": queryData.trip_date,
                        "dep_city": queryData.ari_city,
                        "price": 90,
                        "carrier": getRandomFlight(),
                        "time": getRandomTime()
                    };

                    /*if (i === 0) {
                        e["time"] = getRandomInt(7, 9) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM";
                    } else if (i === 1) {
                        e["time"] = getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(12, 15) + ":" + getRandomInt(10, 59) + " PM";
                    } else if (i === 2) {
                        e["time"] = getRandomInt(15, 18) + ":" + getRandomInt(10, 59) + " PM - " + getRandomInt(18, 22) + ":" + getRandomInt(10, 59) + " PM";
                    }*/

                    var gen_data = {
                        trip_type: '2',
                        trip_data: e,
                        index: i,
                    };

                    addReturnFlights(gen_data);
                }

            } else {

                e.forEach((doc) => {

                    var gen_data = {
                        trip_type: '2',
                        trip_data: doc.data(),
                        index: count,
                    }


                    if (count < 3) {
                        addReturnFlights(gen_data);
                    }

                    count++;
                });
            }
        });
    }
}

function getDatafromFB2(queryData) {

    console.log("queryData");
    console.log(queryData);

    if (typeof queryData.counter == 'undefined') {
        queryData.counter = 0;
    }

    if (queryData.trip_type == 1) {

        firestoredb.collection('flightsData').where('dep_city', '==', queryData.dep_city).where('ari_city', '==', queryData.ari_city).where('date', '==', queryData.trip_date).orderBy('price', 'asc').get().then((e) => {
            let count = 0;

            if (e.size < 1) {
                /*console.log(queryData.counter);
                if(queryData.counter > 14) {
                    showNotFoundError();
                    return false;
                }
                var date = new Date(queryData.trip_date);
                var new_date = (date.getMonth() + 1) +'/'+ (date.getDate() + 1) + '/' + date.getFullYear();
                queryData.trip_date = new_date;
                queryData.counter++;
                showAlternateDateMesg();
                getDatafromFB(queryData);
                return false;*/

                for (var i = 0; i < getRandomInt(1, 3); i++) {

                    e = {
                        "ari_city": queryData.ari_city,
                        "date": queryData.trip_date,
                        "dep_city": queryData.dep_city,
                        "price": 90,
                        "carrier": getRandomFlight(),
                        "time": getRandomTime()
                    };

                    /*if (i === 0) {
                        e["time"] = getRandomInt(7, 9) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM";
                    } else if (i === 1) {
                        e["time"] = getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(12, 15) + ":" + getRandomInt(10, 59) + " PM";
                    } else if (i === 2) {
                        e["time"] = getRandomInt(15, 18) + ":" + getRandomInt(10, 59) + " PM - " + getRandomInt(18, 22) + ":" + getRandomInt(10, 59) + " PM";
                    }*/

                    var gen_data = {
                        trip_type: '1',
                        trip_data: e,
                    }

                    generateFlightBoxes2(gen_data);
                }
                return;
            }

            e.forEach((doc) => {
                var gen_data = {
                    trip_type: '1',
                    trip_data: doc.data(),
                }

                if (count < 3) {
                    generateFlightBoxes2(gen_data);
                }

                count++;
            });


        });

    } else {

        firestoredb.collection('flightsData').where('dep_city', '==', queryData.dep_city).where('ari_city', '==', queryData.ari_city).where('date', '==', queryData.trip_date).orderBy('price', 'asc').get().then((e) => {
            let count = 0;

            if (e.size < 1) {

                // console.log('size less than 1 ');
                // console.log(queryData);

                /*if (queryData.counter > 14) {
                    showNotFoundError();
                    return false;
                }

                var date = new Date(queryData.trip_date);

                var new_date = (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' + date.getFullYear();
                queryData.trip_date = new_date;
                queryData.counter++;
                getDatafromFB(queryData);
                showAlternateDateMesg();
                return false;*/

                for (var i = 0; i < 3; i++) {

                    e = {
                        "ari_city": queryData.ari_city,
                        "date": queryData.trip_date,
                        "dep_city": queryData.dep_city,
                        "price": 90,
                        "carrier": getRandomFlight(),
                        "time": getRandomTime()
                    };

                    /*if (i === 0) {
                        e["time"] = getRandomInt(7, 9) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM";
                    } else if (i === 1) {
                        e["time"] = getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(12, 15) + ":" + getRandomInt(10, 59) + " PM";
                    } else if (i === 2) {
                        e["time"] = getRandomInt(15, 18) + ":" + getRandomInt(10, 59) + " PM - " + getRandomInt(18, 22) + ":" + getRandomInt(10, 59) + " PM";
                    }*/

                    var gen_data = {
                        trip_type: '2',
                        trip_data: e,
                        index: i,
                    }

                    generateFlightBoxes2(gen_data);
                }
            } else {

                e.forEach((doc) => {

                    var gen_data = {
                        trip_type: '2',
                        trip_data: doc.data(),
                        index: count,
                    }
                    if (count < 3) {
                        generateFlightBoxes2(gen_data);
                    }

                    count++;
                });
            }

        });


       /* firestoredb.collection('flightsData').where('dep_city', '==', queryData.ari_city).where('ari_city', '==', queryData.dep_city).where('date', '==', queryData.return_date).orderBy('price', 'asc').get().then((e) => {
            let count = 0;

            // if(e.size < 1) {

            //     if(queryData.counter > 14) {

            //        // showNotFoundError();
            //         return false;
            //     }


            //     var date = new Date(queryData.return_date);

            //     var new_date = (date.getMonth() + 1) +'/'+ (date.getDate() + 1) + '/' + date.getFullYear();
            //     queryData.return_date = new_date;
            //     queryData.counter++;
            //     getDatafromFB(queryData);
            //     showAlternateDateMesg();
            //     return false;
            // }

            if (e.size < 1) {

                for (var i = 0; i < 3; i++) {

                    e = {
                        "ari_city": queryData.dep_city,
                        "date": queryData.trip_date,
                        "dep_city": queryData.ari_city,
                        "price": 90,
                        "carrier": getRandomFlight(),
                        "time": getRandomTime()
                    };

                    /*if (i === 0) {
                        e["time"] = getRandomInt(7, 9) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM";
                    } else if (i === 1) {
                        e["time"] = getRandomInt(10, 11) + ":" + getRandomInt(10, 59) + " AM - " + getRandomInt(12, 15) + ":" + getRandomInt(10, 59) + " PM";
                    } else if (i === 2) {
                        e["time"] = getRandomInt(15, 18) + ":" + getRandomInt(10, 59) + " PM - " + getRandomInt(18, 22) + ":" + getRandomInt(10, 59) + " PM";
                    }

                    var gen_data = {
                        trip_type: '2',
                        trip_data: e,
                        index: i,
                    };

                    addReturnFlights(gen_data);
                }

            } else {

                e.forEach((doc) => {

                    var gen_data = {
                        trip_type: '2',
                        trip_data: doc.data(),
                        index: count,
                    }


                    if (count < 3) {
                        addReturnFlights(gen_data);
                    }

                    count++;
                });
            }
        });*/
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFlight() {
    var num = getRandomInt(0, 2);
    var a = ["American Airlines", "Delta Airlines", "United Airlines"]
    return a[num];
}

function getRandomTime() {
    var num = getRandomInt(0, 2);
    var a = ["Morning", "Afternoon", "Evening"]
    return a[num];
}

//converting text to TitleCase function
function toTitleCase(str) {
    str = str.replace("_", " ");
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function generateFlightBoxes(flightData) {
    $('.book-flight-wrap').fadeOut(300);
    $('.bookingoverlay').fadeIn(300);

    // var trip_date = $('div[rel-attr="2"] input[name="datefilter"]').val();
    // var dualdates = trip_date.split('-');
    var final_date_r = $('input[name="datefilterend"]').val();

    flightData.trip_data.dep_city = toTitleCase(flightData.trip_data.dep_city);
    flightData.trip_data.ari_city = toTitleCase(flightData.trip_data.ari_city);
    if (flightData.trip_type == '1') {

        var fdata = flightData.trip_data;

        var html = '<div class="flight row">';

        html += '<div class="col-sm-2 carrier no-gutters"><span class="head">Carrier</span><img  width="140" src="' + getFlightIcon(fdata.carrier) + '"></div>';

        html += '<div class="col-sm-3 flights-data no-gutters"><span class="head">Trip Cities</span><span class="dep city"> Departure City: ' + fdata.dep_city + '</span> <span class="dep city">Arrival City: ' + fdata.ari_city + '</span></div>';

        html += '<div class="col-sm-2 trip_date no-gutters"><span class="head">Departure Date </span><span class="booking-date">' + fdata.date + '</span></div>';

        //html += '<div class="col-sm-4 flights-data no-gutters"><span class="head">Trip</span><span class="dep city">Date' + fdata.date + '</span> <span class="dep city">Return date' + final_date_r + '</span></div>';

        html += '<div class="col-sm-2 f_times no-gutters"><span class="head">Flight Times</span><span class="f-time">Time (Dep - Ari): ' + fdata.time + '</span></div>';

        html += '<div class="col-sm-3 f_times no-gutters"><span class="head">Cost</span><span class="f-time">Wanderift: 1 Token</span></div>';

        html += '<div class="booking-btn one-way"><button trip_type="1" onClick="bookFlight(this);" dep="' + fdata.dep_city + '" ari="' + fdata.ari_city + '" date="' + fdata.date + '" time="' + fdata.time + '" carrier="' + fdata.carrier + '" price="' + fdata.price + '">Book now</button></div>';
        html += '<div class="success-msg"></div>';
        html += '</div>';


        $('#flights').css("display", "block");
        $('#flightsData').append(html);
    } else if (flightData.trip_type == '2') {

        var fdata = flightData.trip_data;
        var html = '<div class="twoway_trips main-wrapper row">';
        html += '<div class="flight row trip_one">';
        html += '<div class="col-sm-2 col-xsm-2 carrier no-gutters"><span class="head">Carrier</span><img  width="140" src="' + getFlightIcon(fdata.carrier) + '"></div>';

        html += '<div class="col-sm-3 col-xsm-3 flights-data no-gutters"><span class="head">Trip Cities</span><span class="dep city">Departure City: ' + fdata.dep_city + '</span> <span class="dep city">Arrival City: ' + fdata.ari_city + '</span></div>';

        // var trip_date = $('div[rel-attr="2"] input[name="datefilter"]').val();
        // var dualdates = trip_date.split('-');
        var final_date_r = $('input[name="datefilterend"]').val();


        //html += '<div class="col-sm-4 flights-data no-gutters"><span class="head">Trip</span><span class="dep city">Date' + fdata.date + '</span> <span class="dep city">Return date' + final_date_r + '</span></div>';

        html += '<div class="col-sm-2 col-xsm-2 trip_date no-gutters"><span class="head">Departure Date </span><span class="booking-date">' + fdata.date + '</span></div>';

        html += '<div class="col-sm-2 col-xsm-2 f_times no-gutters"><span class="head">Flight Times</span><span class="f-time">Time (Dep - Ari): ' + fdata.time + '</span></div>';
        html += '<div class="col-sm-3 col-xsm-3 f_times no-gutters"><span class="head">Cost</span><span class="f-time">Wanderift: 1 Token</span></div>';

        html += '</div>';

        html += '<div id="flightholder_' + flightData.index + '" class="flight row trip_two"></div>';

        html += '<div class="booking-btn one-way"><button trip_type="2" onClick="bookFlight(this);" dep="' + fdata.dep_city + '" ari="' + fdata.ari_city + '" date="' + fdata.date + '" time="' + fdata.time + '" carrier="' + fdata.carrier + '" price="' + fdata.price + '">Book now</button></div>';
        html += '<div class="success-msg"></div>';

        html += '</div>'

        $('#flights').css("display", "block");
        $('#flightsData').append(html);


    }
	
}

function generateFlightBoxes2(flightData) {
    $('.book-flight-wrap').fadeOut(300);
    $('.bookingoverlay').fadeIn(300);

    // var trip_date = $('div[rel-attr="2"] input[name="datefilter"]').val();
    // var dualdates = trip_date.split('-');
    var final_date_r = $('input[name="datefilterend"]').val();

    flightData.trip_data.dep_city = toTitleCase(flightData.trip_data.dep_city);
    flightData.trip_data.ari_city = toTitleCase(flightData.trip_data.ari_city);
    if (flightData.trip_type == '1') {

        var fdata = flightData.trip_data;

        var html = '<div class="flight row">';

        html += '<div class="col-sm-2 carrier no-gutters"><span class="head">Carrier</span><img  width="140" src="' + getFlightIcon(fdata.carrier) + '"></div>';

        html += '<div class="col-sm-3 flights-data no-gutters"><span class="head">Trip Cities</span><span class="dep city"> Departure City: ' + fdata.dep_city + '</span> <span class="dep city">Arrival City: ' + fdata.ari_city + '</span></div>';

        html += '<div class="col-sm-2 trip_date no-gutters"><span class="head">Departure Date </span><span class="booking-date">' + fdata.date + '</span></div>';

        //html += '<div class="col-sm-4 flights-data no-gutters"><span class="head">Trip</span><span class="dep city">Date' + fdata.date + '</span> <span class="dep city">Return date' + final_date_r + '</span></div>';

        html += '<div class="col-sm-2 f_times no-gutters"><span class="head">Flight Times</span><span class="f-time">Time (Dep - Ari): ' + fdata.time + '</span></div>';

        html += '<div class="col-sm-3 f_times no-gutters"><span class="head">Cost</span><span class="f-time">Wanderift: 1 Token</span></div>';

        html += '<div class="booking-btn one-way"><button trip_type="1" onClick="bookFlight(this);" dep="' + fdata.dep_city + '" ari="' + fdata.ari_city + '" date="' + fdata.date + '" time="' + fdata.time + '" carrier="' + fdata.carrier + '" price="' + fdata.price + '">Book now</button></div>';
        html += '<div class="success-msg"></div>';
        html += '</div>';


        $('#flights').css("display", "block");
        $('#flightsData').append(html);
    } else if (flightData.trip_type == '2') {

        var fdata = flightData.trip_data;
        var html = '<div class="twoway_trips main-wrapper row">';
        html += '<div class="flight row trip_one">';
        html += '<div class="col-sm-2 col-xsm-2 carrier no-gutters"><span class="head">Carrier</span><img  width="140" src="' + getFlightIcon(fdata.carrier) + '"></div>';

        html += '<div class="col-sm-3 col-xsm-3 flights-data no-gutters"><span class="head">Trip Cities</span><span class="dep city">Departure City: ' + fdata.dep_city + '</span> <span class="dep city">Arrival City: ' + fdata.ari_city + '</span></div>';

        // var trip_date = $('div[rel-attr="2"] input[name="datefilter"]').val();
        // var dualdates = trip_date.split('-');
        var final_date_r = $('input[name="datefilterend"]').val();


        //html += '<div class="col-sm-4 flights-data no-gutters"><span class="head">Trip</span><span class="dep city">Date' + fdata.date + '</span> <span class="dep city">Return date' + final_date_r + '</span></div>';

        html += '<div class="col-sm-2 col-xsm-2 trip_date no-gutters"><span class="head">Departure Date </span><span class="booking-date">' + fdata.date + '</span></div>';

        html += '<div class="col-sm-2 col-xsm-2 f_times no-gutters"><span class="head">Flight Times</span><span class="f-time">Time (Dep - Ari): ' + fdata.time + '</span></div>';
        html += '<div class="col-sm-3 col-xsm-3 f_times no-gutters"><span class="head">Cost</span><span class="f-time">Wanderift: 1 Token</span></div>';

        html += '</div>';

        html += '<div id="flightholder_' + flightData.index + '" class="flight row trip_two"></div>';

        html += '<div class="booking-btn one-way"><button trip_type="2" onClick="bookFlight(this);" dep="' + fdata.dep_city + '" ari="' + fdata.ari_city + '" date="' + fdata.date + '" time="' + fdata.time + '" carrier="' + fdata.carrier + '" price="' + fdata.price + '">Book now</button></div>';
        html += '<div class="success-msg"></div>';

        html += '</div>'

        $('#flights').css("display", "block");
        $('#flightsData').append(html);


    }
	
	
	
}

function getFlightIcon(carrier) {
    if (carrier == 'Delta Airlines') {
        return './images/delta.png';
    } else if (carrier == 'United Airlines') {
        return './images/united.png';
    } else if (carrier == 'American Airlines') {
        return './images/american_airline.png';
    } else {
        return './images/united.png';
    }
}

$(function () {

    // reInitSlider($('.booking-form select[name="dep_city"]'));

    $('.close-results').click(function () {
        location.reload();
    });

    // $('#one-way-booking').submit((e) => {
    //     e.preventDefault();
    //
    //     if (!$('#one-way-booking').validate()) {
    //
    //         $('.one-way-booking .form-error').html('Please Fill all fields first.');
    //         return false;
    //     }
    //
    //     // var trip_type = $('.trip_selector span.is_active').attr('rel-attr');
    //     var trip_type = $("input[name='tripType']:checked").val();
    //
    //     console.log(trip_type);
    //     if (trip_type == 1) {
    //
    //         var trip_date = $('.one-way-booking[rel-attr="1"] input[name="datefilter"]').val();
    //
    //         var trip_date = new Date(trip_date);
    //
    //         var final_trip_date = (trip_date.getMonth() + 1) + '/' + trip_date.getDate() + '/' + trip_date.getFullYear();
    //
    //
    //         var submittedData = {
    //             "dep_city": $('div[rel-attr="1"] select[name="departure"]').val(),
    //             "ari_city": $('div[rel-attr="1"] select[name="arrival"]').val(),
    //             "trip_date": final_trip_date,
    //             'trip_type': "1",
    //         };
    //         firestoredb.collection('search-stats').add(submittedData).then(status => {
    //             console.log('Search stats saved');
    //         });
    //
    //     }
    //
    //
    //     getDatafromFB(submittedData);
    //
    //     setTimeout(function () {
    //
    //         //  $('.book-flight-wrap').fadeOut(300);
    //         // $('.bookingoverlay').fadeIn(300)
    //     }, 1000);
    //
    //     $('.dep_status').html('Flights : ' + submittedData.dep_city);
    //     $('.ari_status').html(' ' + submittedData.ari_city);
    //
    //
    // });


    // fligth 2 booking form
    $('#two-way-booking').submit((e) => {
        e.preventDefault();

        if (!$('#two-way-booking').validate()) {

            $('.two-way-booking .form-error').html('Please Fill all fields first.');
            return false;
        }


        // var trip_type = $('.trip_selector span.is_active').attr('rel-attr');
        var trip_type = $("input[name='tripType']:checked").val();

        // if trip is a two way trip
        if (trip_type == 2) {
            // calculating flight date
            // var trip_date = $('div[rel-attr="2"] input[name="datefilter"]').val();


            // var dualdates = trip_date.split('-');

            var final_date = $('input[name="datefilterstart"]').val();

            var trip_date = new Date(final_date);

            var final_trip_date = (trip_date.getMonth() + 1) + '/' + trip_date.getDate() + '/' + trip_date.getFullYear();

            var final_date_r = $('input[name="datefilterend"]').val();

            final_date_r = new Date(final_date_r).getTime();
            final_date = new Date(final_date).getTime();



            var today = new Date().getTime();

            if (final_date_r < (today - 8.64e+7)) {
                alert("Please choose a Return date later than or same as today");
                location.reload();

            } else if (final_date < (today - 8.64e+7)) {
                alert("Please choose a Departure date later than or same as today")
                location.reload();
            }

            var return_trip_date = new Date(final_date_r);

            var return_final_trip_date = (return_trip_date.getMonth() + 1) + '/' + return_trip_date.getDate() + '/' + return_trip_date.getFullYear();

            submittedData = {
                "dep_city": $('select[name="departure"]').val(),
                "ari_city": $(' select[name="arrival"]').val(),
                "trip_date": final_trip_date,
                "return_date": return_final_trip_date,
                'trip_type': "2",
            };

            let flightResult = {
                dep_date: final_date,
                ret_date: final_date_r,
                departure: $('select[name="departure"]').val(),
                arrival: $(' select[name="arrival"]').val()
            }

            localStorage.setItem( 'flightResult', JSON.stringify(flightResult));

            firestoredb.collection('search-stats').add(submittedData).then(status => {
                $('.pop-up').removeClass('open');
                console.log('Search stats saved');
            });


        } else if (trip_type == 1) {
            // var trip_date = $('.one-way-booking[rel-attr="1"] input[name="datefilter"]').val();
            var trip_date = $('input[name="datefilterstart"]').val();

            var trip_date = new Date(trip_date);

            var final_trip_date = (trip_date.getMonth() + 1) + '/' + trip_date.getDate() + '/' + trip_date.getFullYear();

            trip_date = trip_date.getTime();

            var today = new Date().getTime();

            if (trip_date < (today - 8.64e+7)) {
                alert("Please choose a Departure date later than or same as today");
                location.reload();
            }

            var submittedData = {
                "dep_city": $('select[name="departure"]').val(),
                "ari_city": $('select[name="arrival"]').val(),
                "trip_date": final_trip_date,
                'trip_type': "1",
            };
            firestoredb.collection('search-stats').add(submittedData).then(status => {
                console.log('Search stats saved');
            });

            let flightResult = {
                dep_date: trip_date,
                ret_date: final_date_r,
                departure: $('select[name="departure"]').val(),
                arrival: $(' select[name="arrival"]').val()
            }

            localStorage.setItem( 'flightResult', JSON.stringify(flightResult));

            alert(localStorage.getItem("flightResult").dep_date);
        }

        getDatafromFB(submittedData);

        setTimeout(function () {

            // $('.book-flight-wrap').fadeOut(300);
            //    $('.bookingoverlay').fadeIn(300)
        }, 1000);

       $('.dep_status').html('Flights : ' + toTitleCase(submittedData.dep_city));
       $('.ari_status').html(' ' + toTitleCase(submittedData.ari_city) + ' (Round Trip)');


    });
	
	
	function searchIndex(e) {
	    e.preventDefault();
        if (!$('#one-way-booking').validate()) {

            $('.two-way-booking .form-error').html('Please Fill all fields first.');
            return false;
        }


        // var trip_type = $('.trip_selector span.is_active').attr('rel-attr');
        var trip_type = $("input[name='tripType']:checked").val();

        // if trip is a two way trip
        if (trip_type == 2) {
            // calculating flight date
            // var trip_date = $('div[rel-attr="2"] input[name="datefilter"]').val();


            // var dualdates = trip_date.split('-');

            var final_date = $('input[name="datefilterstart"]').val();

            var trip_date = new Date(final_date);

            var final_trip_date = (trip_date.getMonth() + 1) + '/' + trip_date.getDate() + '/' + trip_date.getFullYear();

            var final_date_r = $('input[name="datefilterend"]').val();

            final_date_r = new Date(final_date_r).getTime();
            final_date = new Date(final_date).getTime();

            var today = new Date().getTime();

            if (final_date_r < (today - 8.64e+7)) {
                alert("Please choose a Return date later than or same as today");
                location.reload();

            } else if (final_date < (today - 8.64e+7)) {
                alert("Please choose a Departure date later than or same as today")
                location.reload();
            }

            var return_trip_date = new Date(final_date_r);

            var return_final_trip_date = (return_trip_date.getMonth() + 1) + '/' + return_trip_date.getDate() + '/' + return_trip_date.getFullYear();

            submittedData = {
                "dep_city": $('select[name="departure"]').val(),
                "ari_city": $(' select[name="arrival"]').val(),
                "trip_date": final_trip_date,
                "return_date": return_final_trip_date,
                'trip_type': "2",
            };

            firestoredb.collection('search-stats').add(submittedData).then(status => {
                $('.pop-up').removeClass('open');
                console.log('Search stats saved');
            });
        } else if (trip_type == 1) {
            // var trip_date = $('.one-way-booking[rel-attr="1"] input[name="datefilter"]').val();
            var trip_date = $('input[name="datefilterstart"]').val();

            var trip_date = new Date(trip_date);

            var final_trip_date = (trip_date.getMonth() + 1) + '/' + trip_date.getDate() + '/' + trip_date.getFullYear();

            trip_date = trip_date.getTime();

            var today = new Date().getTime();

            if (trip_date < (today - 8.64e+7)) {
                alert("Please choose a Departure date later than or same as today");
                location.reload();
            }

            var submittedData = {
                "dep_city": $('select[name="departure"]').val(),
                "ari_city": $('select[name="arrival"]').val(),
                "trip_date": final_trip_date,
                'trip_type': "1",
            };
            firestoredb.collection('search-stats').add(submittedData).then(status => {
                console.log('Search stats saved');
            });
        }

        //getDatafromFB2(submittedData);

        setTimeout(function () {

            // $('.book-flight-wrap').fadeOut(300);
            //    $('.bookingoverlay').fadeIn(300)
        }, 1000);

       //$('.dep_status').html('Flights : ' + toTitleCase(submittedData.dep_city));
       //$('.ari_status').html(' ' + toTitleCase(submittedData.ari_city) + ' (Round Trip)');
	   
	   
	   location.href = "file:///D:/Remote-Job/Wanderift-master/Wanderift-master/public/results.html";
	   $('.result-from').val(submittedData.dep_city);
	   $('.result-to').val(submittedData.ari_city);
	   $('.result-date').val(final_date +' - '+ final_date_r);

    };


    $('select#departure').change(function (e) {
        shuffleArrivalCities(this);
        // reInitSlider(this);


    });


    $('.trip_selector span').click(function (e) {

        $('.trip_selector span').each(function () {
            $(this).removeClass('is_active');
        });

        $(this).addClass('is_active');

        $('.booking-form-wrapper').each(function () {
            $(this).hide(0);
        });

        var linkclass = $(this).attr('rel-attr');
        $('.booking-form-wrapper[rel-attr="' + linkclass + '"]').show(0);


    });

    // $('.trip_selector span')[0].click();


    // $('#onewayform input[name="trip_date"]').daterangepicker({
    //     singleDatePicker: true,
    //     showDropdowns: true,});

    // $('#twowayform input[name="trip_date"]').daterangepicker({
    //         singleDatePicker: true,
    //         showDropdowns: true,});


    // $('#twowayform input[name="return_date"]').daterangepicker({
    //     singleDatePicker: true,
    //     showDropdowns: true,});


});

function searchIndex() {
    $("#booking-form").on('subm')
    e.preventDefault();
        // var trip_type = $('.trip_selector span.is_active').attr('rel-attr');
        var trip_type = $("input[name='tripType']:checked").val();

        // if trip is a two way trip
        if (trip_type == 2) {
            // calculating flight date
            // var trip_date = $('div[rel-attr="2"] input[name="datefilter"]').val();


            // var dualdates = trip_date.split('-');

            var final_date = $('input[name="datefilterstart"]').val();

            var trip_date = new Date(final_date);

            var final_trip_date = (trip_date.getMonth() + 1) + '/' + trip_date.getDate() + '/' + trip_date.getFullYear();

            var final_date_r = $('input[name="datefilterend"]').val();

            final_date_r = new Date(final_date_r).getTime();
            final_date = new Date(final_date).getTime();

            var today = new Date().getTime();

            if (final_date_r < (today - 8.64e+7)) {
                alert("Please choose a Return date later than or same as today");
                location.reload();

            } else if (final_date < (today - 8.64e+7)) {
                alert("Please choose a Departure date later than or same as today")
                location.reload();
            }

            var return_trip_date = new Date(final_date_r);

            var return_final_trip_date = (return_trip_date.getMonth() + 1) + '/' + return_trip_date.getDate() + '/' + return_trip_date.getFullYear();

            submittedData = {
                "dep_city": $('select[name="departure"]').val(),
                "ari_city": $(' select[name="arrival"]').val(),
                "trip_date": final_trip_date,
                "return_date": return_final_trip_date,
                'trip_type': "2",
            };

            firestoredb.collection('search-stats').add(submittedData).then(status => {
                $('.pop-up').removeClass('open');
                console.log('Search stats saved');
            });
        } else if (trip_type == 1) {
            // var trip_date = $('.one-way-booking[rel-attr="1"] input[name="datefilter"]').val();
            var trip_date = $('input[name="datefilterstart"]').val();

            var trip_date = new Date(trip_date);

            var final_trip_date = (trip_date.getMonth() + 1) + '/' + trip_date.getDate() + '/' + trip_date.getFullYear();

            trip_date = trip_date.getTime();

            var today = new Date().getTime();

            if (trip_date < (today - 8.64e+7)) {
                alert("Please choose a Departure date later than or same as today");
                location.reload();
            }

            var submittedData = {
                "dep_city": $('select[name="departure"]').val(),
                "ari_city": $('select[name="arrival"]').val(),
                "trip_date": final_trip_date,
                'trip_type': "1",
            };
            firestoredb.collection('search-stats').add(submittedData).then(status => {
                console.log('Search stats saved');
            });
        }

        //getDatafromFB2(submittedData);

        setTimeout(function () {

            // $('.book-flight-wrap').fadeOut(300);
            //    $('.bookingoverlay').fadeIn(300)
        }, 1000);

       //$('.dep_status').html('Flights : ' + toTitleCase(submittedData.dep_city));
       //$('.ari_status').html(' ' + toTitleCase(submittedData.ari_city) + ' (Round Trip)');
	   
	   
	   location.href = "./";
	   $('.result-from').val(submittedData.dep_city);
	   $('.result-to').val(submittedData.ari_city);
	   $('.result-date').val(final_date +' - '+ final_date_r);

    };


function addReturnFlights(queryData) {
    queryData.trip_data.dep_city = toTitleCase(queryData.trip_data.dep_city);
    queryData.trip_data.ari_city = toTitleCase(queryData.trip_data.ari_city);
    fdata = queryData.trip_data;

    // var trip_date = $('div[rel-attr="2"] input[name="datefilter"]').val();
    // var dualdates = trip_date.split('-');
    var final_date_r = $('input[name="datefilterend"]').val();

    var return_trip_date = new Date(final_date_r);

    var return_final_trip_date = (return_trip_date.getMonth() + 1) + '/' + return_trip_date.getDate() + '/' + return_trip_date.getFullYear();

    var html = '<div class="col-sm-2 carrier no-gutters" carrier-name="' + fdata.carrier + '"><span class="head">Carrier</span><img  width="140" src="' + getFlightIcon(fdata.carrier) + '"></div>';

    html += '<div class="col-sm-3 flights-data no-gutters"><span class="head">Trip Cities</span><span class="dep city">Departure City: ' + fdata.dep_city + '</span> <span class="dep city">Arrival City: ' + fdata.ari_city + '</span></div>';

    html += '<div class="col-sm-2 trip_date no-gutters"><span class="head">Return Date </span><br><span class="booking-date">' + return_final_trip_date + '</span></div>';

    html += '<div class="col-sm-2 f_times no-gutters"><span class="head">Flight Times</span><span class="f-time">Time (Dep - Ari): <span class="flight-time">' + fdata.time + '</span></span></div>';
    html += '<div class="col-sm-3 f_times no-gutters"><span class="head">Cost</span><span class="f-time">Wanderift: 1 Token</span></div>';

    html += '</div>';

    // var html = '<h2>TEsting the Data</h2>'

    // $('.flight.row.trip_two')[queryData.index].html('');
    $('#flightholder_' + queryData.index + '.flight.row.trip_two').append(html);


}

function bookFlight(elem) {
    var booking = {};
    trip_type = $(elem).attr('trip_type');

    if (trip_type == 1) {
        booking.triptype = 'one way';
    } else if (trip_type == 2) {
        booking.type = 'round trip';
    }

    booking.dep_city = $(elem).attr('dep');
    booking.ari_city = $(elem).attr('ari');
    booking.date = $(elem).attr('date');
    booking.time = $(elem).attr('time');
    booking.carrier = $(elem).attr('carrier');
    booking.price = $(elem).attr('price');
    booking.booked_on = new Date(Date.now());

    if (trip_type == 2) {
        booking.return_date = $(elem).parents('.twoway_trips').find('span.booking-date').html();
        booking.return_time = $(elem).parents('.twoway_trips').find('span.flight-time').html();
        booking.return_carrier = $(elem).parents('.twoway_trips').find('div[carrier-name]').attr('carrier-name');

    }

    // firebase db tokens handling

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            booking.useremail = user.email;
            //get data from the user
            firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {

                var tokens = (snapshot.val() && snapshot.val().tokens.available);

                if (tokens > 0) {
                    // showSuccessModal()
                    //Make booking

                    //db.ref('bookings/' + user.uid + '/' + today).set(formData);

                    firestoredb.collection('flightsBookings').add(booking).then(status => {
                        console.log('written to db');
                        $('#successDiv').show(20);

                        setTimeout(function () {
                            $('#flights').fadeOut(200);
                        }, 3000)

                    });

                    //deducting token from available tokens
                    var newToken = tokens - 1;
                    var postData = { available: newToken, lastupdated: new Date().getMonth() };
                    var updates = {};
                    //updating data
                    updates['/users/' + user.uid + '/tokens/'] = postData;

                    firebase.database().ref().update(updates);
                    setTimeout(function () {
                        location.reload();
                    }, 5000)

                } else {
                    $('#errorDiv').show(20);
                        setTimeout(function () {
                            $('#flights').fadeOut(200);
                        }, 3000)
                }
            });
        } else {
            alert("Please Log in to book a flight")
            $('#flights').hide(50);
        }
    });


    // Firebase db token handling


    //checking user login status
    //   firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //       //get data from the user
    //       firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {

    //         var tokens = (snapshot.val() && snapshot.val().tokens.available);

    //         if (tokens > 0) {
    //           showSuccessModal()
    //           //Make booking
    //           db.ref('bookings/' + user.uid + '/' + today).set(booking);

    //           //deducting token from available tokens
    //           var newToken = tokens - 1;
    //           var postData = { available: newToken, lastupdated: currentMonth };
    //           var updates = {};
    //           //updating data
    //           updates['/users/' + user.uid + '/tokens/'] = postData;
    //           firebase.database().ref().update(updates);
    //           tokenplus.style.display = "none";
    //         } else {
    //           NoTokenModal();
    //         }
    //       });
    //     }
    //   });

}


function shuffleArrivalCities(element) {

    var value = $(element).val();

    var targetElem = $('select#arrival');

    var atlanta = ['Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var austin = ['Atlanta', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var boston = ['Atlanta', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var chicago = ['Atlanta', 'Austin', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var dallas = ['Atlanta', 'Austin', 'Chicago', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var denver = ['Atlanta', 'Austin', 'Chicago', 'Dallas', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var houston = ['Atlanta', 'Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var miami = ['Atlanta', 'Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var newyork = ['Albuquerque', 'Atlanta', 'Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'Miami', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var lasvegas = ['Atlanta', 'Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var losangles = ['Atlanta', 'Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle', 'Washington D.C'];

    var philadelphia = ['Atlanta', 'Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle', 'Washington D.C'];

    var phoenix = ['Atlanta', 'Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'San Francisco', 'Seattle'];

    var sanfrancisco = ['Atlanta', 'Austin', 'Chicago', 'Dallas', 'Denver', 'Detroit', 'Houston', 'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando', 'Salt Lake City', 'Seattle', 'Washington D.C'];

    if (value == "Atlanta") {
        var output = '';
        atlanta.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

    if (value == "Austin") {
        var output = '';
        austin.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

    if (value == "Boston") {
        var output = '';
        austin.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

    if (value == "Chicago") {
        var output = '';
        chicago.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

    if (value == "Dallas") {
        var output = '';
        dallas.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }


    if (value == "Denver") {
        var output = '';
        denver.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

    if (value == "Houston") {
        var output = '';
        houston.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }


    if (value == "Miami") {
        var output = '';
        miami.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

    if (value == "New York") {
        var output = '';
        newyork.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }


    if (value == "Las Vegas") {
        var output = '';
        lasvegas.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }


    if (value == "Los Angeles") {
        var output = '';
        losangles.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

    if (value == "San Francisco") {
        var output = '';
        sanfrancisco.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

    if (value == "Phoenix") {
        var output = '';
        sanfrancisco.forEach((e) => {
            output += '<option value="' + e + '">' + e + '</option>';

            targetElem.html(output);
        });
    }

}

function reInitSlider(value) {

    var element = $(value).children(':selected').attr('slide-rel');


    var popularkeys = Object.keys(popularTrips);
    var popularvals = Object.values(popularTrips);

    var hotkeys = Object.keys(hotDestinations);
    var hotvals = Object.values(hotDestinations);

    var coldkeys = Object.keys(winterWeather);
    var coldvals = Object.values(winterWeather);

    var index = 0;
    popularkeys.forEach(key => {
        if (key == element) {
            AddSlider(popularvals[index], 'popular', key);
        }
        index++;
    });

    var index = 0;
    hotkeys.forEach(key => {
        if (key == element) {
            AddSlider(hotvals[index], 'hot', key);
        }
        index++;
    });

    var index = 0;
    coldkeys.forEach(key => {
        if (key == element) {
            AddSlider(coldvals[index], 'cold', key);
        }
        index++;
    });

}


function AddSlider(value, sliderType, key) {

    if (sliderType == 'popular') {
        var target = $('div.popular_slider');
    } else if (sliderType == 'hot') {
        var target = $('div.hot_slider');
    } else if (sliderType == 'cold') {
        var target = $('div.cold_slider');
    }

    target.slick('destroy');

    target.html('');
    var output = '';
    value.forEach(function (e) {

        output += '<div class="slider-item">';
        output += '<a data-ari="' + e + '" class="arrival_short"><img src="./images/flight_cards/' + e.replace(' ', '_') + '.png"></a></div>';


    });

    target.html(output);

    if (sliderType == 'popular') {


        var key = key.charAt(0).toUpperCase() + key.substr(1);

        $('.poptrip_heading').html(key);
        target.slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            speed: 800,
            dots: false,
            arrows: true,
            nextArrow: $('.popular_trips .next-arrow.ts-arrow'),
            prevArrow: $('.popular_trips .prev-arrow.ts-arrow'),
            autoplay: false,
            autoplaySpeed: 2500,
            responsive: [{
                breakpoint: 776,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

    }
    // popular trip end

    if (sliderType == 'hot') {
        var key = key.charAt(0).toUpperCase() + key.substr(1);

        $('.hotdest_heading').html(key);

        target.slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            speed: 800,
            dots: false,
            arrows: true,
            nextArrow: $('.hot_destinations .next-arrow.ts-arrow'),
            prevArrow: $('.hot_destinations .prev-arrow.ts-arrow'),
            autoplay: false,
            autoplaySpeed: 2500,
            responsive: [{
                breakpoint: 776,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }


    if (sliderType == 'cold') {
        var key = key.charAt(0).toUpperCase() + key.substr(1);
        $('.colddest_heading').html(key);
        target.slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            speed: 800,
            dots: false,
            arrows: true,
            nextArrow: $('.cold_destinations .next-arrow.ts-arrow'),
            prevArrow: $('.cold_destinations .prev-arrow.ts-arrow'),
            autoplay: false,
            autoplaySpeed: 2500,
            responsive: [{
                breakpoint: 776,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }

    $('.arrival_short').click(function () {

        var arrival_city = $(this).attr('data-ari');
        // console.log(arrival_city);

        $('select.arr-city').html('<option value="' + arrival_city + '">' + arrival_city + '</option>');
    });


}

function showAlternateDateMesg() {
    jQuery('h3.sub-heading.alternate-date-mesg').show();
}

function showNotFoundError() {
    $('.form-error').html('Sorry there are no flights found, please contact our team to book a flight');
}