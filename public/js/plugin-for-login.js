/*global $, console, WOW, run, JsPDF, iScrollPos*/
$(document).ready(function () {
    "use strict";
    if ( $(window).height() < 800 ) {
        $('.subscribe .form-container .input-container input, .subscribe .form-container select').css({
            margin: '10px auto 15px auto'
        });
        $('.subscribe .form-container').css({
            paddingTop: 15,
            paddingBottom: 15
        });
        $('.subscribe .form-container input, .subscribe .form-container select').css({
            height: 40
        });
    }
    

    $('.header').css({
        minHeight: $(window).height()
    });

    $('.login .box').css({
        top: ($(window).height() - $('.login .box').height()) / 2 + ($('nav').height() / 2)
    });
    $('.subscribe .box').css({
        top: ($(window).height() - $('.subscribe .box').height()) / 2 + ($('nav').height() / 2)
    });

     $(window).resize(function() {
        $('.login .box').css({
            top: ($(window).height() - $('.login .box').height()) / 2 + ($('nav').height() / 2)
        });
        $('.subscribe .box').css({
            top: ($(window).height() - $('.subscribe .box').height()) / 2 + ($('nav').height() / 2)
        });
     });
    //fix for mobile 
    if ($(window).width() < 768) {
        $('.subscribe .box').css({
            top: $('nav').height() + 50
        });
        $('.subscribe').css({
            minHeight: $('.subscribe .box').height() + $('nav').height() + 100
        });
        $('.sub-page-footer ul').slideUp();
        $('.sub-page-footer p').on('click', function () {
            $(this).next('ul').slideToggle();
            $('html, body').animate({
                scrollTop: ($(this).offset().top - $('nav').height()) - 10
            });
        });
    }
});

