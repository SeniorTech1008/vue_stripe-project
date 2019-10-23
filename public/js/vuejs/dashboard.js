var app = new Vue({
    el: '#app',
    data: {
        tripType: 2,
        tokens: 0,
        departure: '',
        firstName: null,
        secondName: null,
        greeting: 'Welcome',
        plan: null,
        cityView: null,
        loggedin: false,
        search: {
            fly_from: '',
            fly_to: '',
            dateFrom: null,
            dateTo: null,
            apikey: "xklKtpJ5fxZnk4rsDepqOzLUaYYAO9dI"
        }
    },
    methods: {
        userInfo: function () {
            var user = firebase.auth().currentUser;

            if (user) {
                app.loggedin = true;
                firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {

                    var subscriberMarket = (snapshot.val() && snapshot.val().subscriber_market);
                    app.firstName = (snapshot.val() && snapshot.val().firstname);
                    app.secondName = (snapshot.val() && snapshot.val().lastname);
                    app.tokens = (snapshot.val() && snapshot.val().tokens.available);
                    app.plan = (snapshot.val() && snapshot.val().tokens.plan);

                    var thehours = new Date().getHours();
                    if (thehours >= 0 && thehours < 12) {
                        app.greeting = 'Good Morning';
                    } else if (thehours >= 12 && thehours < 17) {
                        app.greeting = 'Good Afternoon';
                    } else if (thehours >= 17 && thehours < 24) {
                        app.greeting = 'Good Evening';
                    }
                });
            }
        },
        searchFlight: function () {
            let final_date = $('input[name="datefilterstart"]').val();
            let final_date_r = $('input[name="datefilterend"]').val();
            let departure = $('select[name="departure"]').val();
            let arrival = $('#arrival').val();

            app.search.fly_from = departure;
            app.search.fly_to = arrival;
            app.search.dateFrom = this.formatDate(final_date);
            app.search.dateTo = this.formatDate(final_date_r);

            let params = new URLSearchParams();
            params.append('fly_from', app.search.fly_from);
            params.append('fly_to', app.search.fly_to);
            params.append('dateFrom', app.search.dateFrom);
            params.append('dateTo', app.search.dateTo);
            params.append('apikey', app.search.apikey);
            console.log(params.toString());
            axios.get('https://kiwicom-prod.apigee.net/v2/search?' + params.toString())
                .then(function (response) {
                    sessionStorage.setItem("flightSearchResult", JSON.stringify(response.data.data));
                    window.location = "results.html";
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        formatDate: function (formDate) {
            let date = new Date(formDate);
            return date.getDate() + "/" + (1 + date.getMonth()) + "/" + date.getFullYear()
        },

        setTown: function (town) {
            app.departure = town;
        }
    },
    beforeMount() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                app.userInfo();
            }
        });
    }
});

$(window).ready(function () {
    //trips slider
    $('.basic').niceSelect();

    $('.trips-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true, // parts of next and last images
        focusOnSelect: true,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {

                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {

                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //tisti slider
    $('.tisti-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false, // parts of next and last images
        focusOnSelect: true,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    //featuredslider
    $('.featured-browser').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: false, // parts of next and last images
        focusOnSelect: true,
        arrows: false,
        speed: 1000,
        autoplay: true,
        accessibility: false,
        focusOnSelect: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function () {
    var show_btn = $('#started');
    //  var show_btn=$('.show-modal');
    //$("#testmodal").modal('show');

    show_btn.click(function () {
        $("#login-Modal").modal('hide');
        $("#subscribe-Modal").modal('show');
    });
});

$(document).ready(function () {
    var show_btn = $('#login');
    //  var show_btn=$('.show-modal');
    //$("#testmodal").modal('show');

    show_btn.click(function () {
        $("#subscribe-Modal").modal('hide');
        $("#login-Modal").modal('show');
    });
});


var telInput = $("#phone"),
    errorMsg = $("#error-msg"),
    validMsg = $("#valid-msg");

// initialise plugin
telInput.intlTelInput({

    allowExtensions: true,
    formatOnDisplay: true,
    autoFormat: true,
    autoHideDialCode: true,
    autoPlaceholder: true,
    defaultCountry: "auto",
    ipinfoToken: "yolo",

    nationalMode: false,
    numberType: "MOBILE",
    //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    preferredCountries: ['sa', 'ae', 'qa', 'om', 'bh', 'kw', 'ma'],
    preventInvalidNumbers: true,
    separateDialCode: true,
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
        });
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
});

var reset = function () {
    telInput.removeClass("error");
    errorMsg.addClass("hide");
    validMsg.addClass("hide");
};

// on blur: validate
telInput.blur(function () {
    reset();
    if ($.trim(telInput.val())) {
        if (telInput.intlTelInput("isValidNumber")) {
            validMsg.removeClass("hide");
        } else {
            telInput.addClass("error");
            errorMsg.removeClass("hide");
        }
    }
});

// on keyup / change flag: reset
telInput.on("keyup change", reset);
