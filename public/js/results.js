$(window).ready(function () {

    $("#round-trip-button").on('click', function () {

        let final_date = $('input[name="datefilterstart"]').val();
        let final_date_r = $('input[name="datefilterend"]').val();
        let departure = $('select[name="departure"]').val();
        // let arrival = $('select[name="arrival"]').val();
        let arrival = $('#arrival').val();

        let flightResult = {
            dep_date: final_date,
            arr_date: final_date_r,
            departure: departure,
            arrival: arrival
        };

        sessionStorage.setItem("flightSearch", JSON.stringify(flightResult));

        window.location = "index.html";

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
    telInput.on("keyup change", reset)
})

