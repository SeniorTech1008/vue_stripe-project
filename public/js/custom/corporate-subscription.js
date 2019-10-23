
    (function () {
        let slider = document.getElementById("tockenSlider");
        let tockens = document.getElementById("tockens");
        let totalPrice = document.getElementById("totalPrice");
        let costpertockenDOM = document.getElementById("perTocken");
        let totalSavingDOM = document.getElementById("totalSaving");
        let costPerTocken = 117;
        const fixedPrice = 180;
        const StartingTockens = slider.value;
        let totalSavingPerTocken = fixedPrice - costPerTocken;

        totalSavingDOM.innerHTML = "$" + totalSavingPerTocken * StartingTockens;
        costpertockenDOM.innerHTML = '$' + costPerTocken;
        slider.oninput = function () {
            if (this.value >= 50) {
                costPerTocken = 117;
                costpertockenDOM.innerHTML = '$' + costPerTocken;
                totalSavingPerTocken = fixedPrice - costPerTocken;
            }
            else if (this.value >= 25){
                costPerTocken = 121;
                costpertockenDOM.innerHTML = '$' + costPerTocken;
                totalSavingPerTocken = fixedPrice - costPerTocken;
            }
            else {
                costPerTocken = 123;
                costpertockenDOM.innerHTML = '$' + costPerTocken;
                totalSavingPerTocken = fixedPrice - costPerTocken;
            }
            tockens.innerHTML = this.value;
            totalPrice.innerHTML = '$' + this.value * costPerTocken;
            totalSavingDOM.innerHTML = "$" + totalSavingPerTocken * this.value;
        }
        for (let i = 1; i <= 3; i++) {
            document.getElementById("input" + i).addEventListener("focus", function() {
                document.getElementById("icon" + i).style.display = "none";
            });
            document.getElementById("input" + i).addEventListener("focusout", function() {
                if(document.getElementById("input" + i).value == "") {
                    document.getElementById("icon" + i).style.display = "block";
                }

            })
        }
    })();

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
            $.get("http://ipinfo.io", function () {}, "jsonp").always(function (resp) {
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

    jQuery(function ($) {
        $(".tab").click(function () {
            var id = $(this).index(".tab");

            $(this).toggleClass("active");
            $(".contents").eq(id).slideToggle('slow');
        });
    });

    $(document).ready(function() {
        $('#image-loader').hide();
        $("#searchFlight_w").click(function() {
            $('.flight-display').css("display", "none");
            $('#image-loader').show();
            $('html,body').animate({
                // scrollTop: 500
            }, 'slow');
            return false;
            $('.flight-display').css("display", "block");
            scrollTop: 500
        });
    });

    $("#open-popup").click(function() {
        $("body").addClass('modal-open');
        $("body").css('padding-right', '17px');
        $('#subscribe-Modal').show();
        $('#subscribe-Modal').addClass('in');
        $('.modal-backdrop').show();
        $('.modal-backdrop').addClass('in');

    });
    
    $("#login-Modal-btn").click(function() {
        $("body").addClass('modal-open');
        $("body").css('padding-right', '17px');
        $('#subscribe-Modal').hide();
        $('#subscribe-Modal').remove('in');
        $('#login-Modal').show();
        $('#login-Modal').addClass('in');
        $('.modal-backdrop').show();
        $('.modal-backdrop').addClass('in');

    });
    $(".modal-backdrop").click(function() {
        $("body").removeClass('modal-open');
        $("body").css('padding-right', '0px');
        // $('#subscribe-Modal').hide();
        $('#subscribe-Modal').removeClass('in');
        $('.modal-backdrop').hide();
        $('.modal-backdrop').removeClass('in');
        // $('#login-Modal').hide();
        $('#login-Modal').removeClass('in');
        $('#login-Modal').css('top', '-10000px');
        $('#subscribe-Modal').css('top', '-10000px');
    });


    $(document).ready(function() {
        setTimeout(function() {
            $('html, body').animate({
                    scrollTop: $(".body-page").offset().top - 70
                },
                'slow');
        }, 1000);
    });

    $("#btn-submit").click(function() {
        console.log("I am here");
        window.location = "account-corporate-subscription.html"

    });

    $('a.login-Modal').on('click', function(e) {
        e.preventDefault()
        $("body").addClass('modal-open');
        $('#login-Modal').css('top', '0px');
        $('#login-Modal').addClass('in');
        $('#login-Modal .modal-backdrop').show();
        $('#login-Modal .modal-backdrop').addClass('in');
        $($('.mobile-sign-in ul li')[1]).remove();
        $($('.mobile-sign-in ul li')[0]).text('Back');
        $($('.mobile-sign-in ul li')[0]).css({
            'border': 'none',
            'width': '100%'
        });
        setTimeout(function(){
            $($('.mobile-sign-in ul')[0]).on('click', function(e){
                e.preventDefault();
                location.reload()
            });
        }, 300);
        $('html').css('overflow-y', 'hidden');
        $('.body_index #login-Modal').show();
    })
    $('a.subscribe-Modal').on('click', function(e) {
        e.preventDefault()
        $("body").addClass('modal-open');
        $('#subscribe-Modal').css('top', '0px');
        $('#subscribe-Modal').addClass('in');
        $('#subscribe-Modal .modal-backdrop').show();
        $('#subscribe-Modal .modal-backdrop').addClass('in');
        $($('.mobile-sign-in ul li')[1]).remove();
        $($('.mobile-sign-in ul li')[0]).text('Back');
        $($('.mobile-sign-in ul li')[0]).css({
            'border': 'none',
            'width': '100%'
        });
        setTimeout(function(){
            $($('.mobile-sign-in ul')[0]).on('click', function(e){
                e.preventDefault();
                location.reload()
            });
        }, 300);
        $('html').css('overflow-y', 'hidden');
        $('.body_index #subscribe-Modal').show();
    });


    $('#slider-one').carousel()
    $('#slider-two').carousel()

    if($(window).outerWidth() < 500){
        if(localStorage.getItem('wanderlift') == 'true'){
            localStorage.setItem('wanderlift', 'false')
            $('.body_index .footer-new, .body_index .body-page').css('display', 'block');
            $('header.new-index, .welcome-wande').css('display', 'none');
        } else if(localStorage.getItem('wanderlift') == 'false'){
            $('.body_index .before-load.bg-change, .body_index .footer-new, .body_index .body-page, .welcome-wande').css('display', 'none');
            $('header.new-index').css('display', 'block');
        }

        $('.btn-search').on('click', function(){
            localStorage.setItem('wanderlift', 'true')
        });

        $('.flight-box-back').on('click', function(){
            localStorage.setItem('wanderlift', 'false');
            location.reload();
        })
    }

