/*global $, console, WOW, run, JsPDF, iScrollPos*/
$(document).ready(function () {
    "use strict";
    //pop up
    //search
    $('.cagegories .img-container .img-title, .nav-input-search').click(function(){
      $('.pop-up').addClass('open');
        $('html, body').animate({
            scrollTop: 0
        }, 100);
        $('body').css({
            overflow: 'hidden'
        });
    });
    $('.pop-up .close').click(function(){
      $('.pop-up').removeClass('open');
        $('body').css({
            overflow: 'auto'
        });
    });
    $('.pop-form-container').css({
        position: 'relative',
        top: ( $(window).height() - $('div.pop-up .content .container').height() ) / 2
    })

    $('.pop-up .content').css({
        minHeight: $(window).height()
    });
    //close bokking
    $('.bookingoverlay').append('<span class="close-btn">Close</span>');
    $('.bookingoverlay .close-btn').on('click', function() {
        $('.bookingoverlay').fadeOut();
    });
    //sliders
    //desti slider
    $('.desti-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false, // parts of next and last images
      focusOnSelect: true,
        arrows: true,
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
            slidesToShow: 2,
            slidesToScroll: 2
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
    //trenign slider
    $('.trending-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false, // parts of next and last images
      focusOnSelect: true,
        arrows: true,
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
            slidesToShow: 2,
            slidesToScroll: 2
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
    
    
    //sidebar 
    //default
    $('.account .side-nav ul li').on('click', function () {
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
        $('.account .info ul li').slideUp();
        $('#' + $(this).data('target')).slideDown();


    });
    $('.account .info ul li:not(:first)').fadeOut();
    
    //side bar shows
    
    
    //css fixes
    //margin-top to ignore fixed navbar
    $('.welcome-section').css({
        marginTop: $('nav').height() * 2
    });
    $('.slick-prev').append('<div class="arrow-container"><img class="imgresponsive arrow" alt="img" src="images/left-arrow.png"/></div>');
    $('.slick-next').append('<div class="arrow-container"><img class="imgresponsive arrow" alt="img" src="images/right-arrow.png"/><div>');
    //If  mobile
    if ($(window).width() < 768) {
        $('.welcome-section').css({
            marginTop: $('nav').height() + 30
        });
        $('.sub-page-footer ul').slideUp();
        $('.sub-page-footer p').on('click', function () {
            $(this).next('ul').slideToggle();
            $('html, body').animate({
                scrollTop: ($(this).offset().top - $('nav').height()) - 10
            });
        });
        
        $('.account .side-nav ul li').on('click', function () {
            $('html, body').animate({
                scrollTop: $('.account .side-nav ul li:last-child a').offset().top
            });
        });
    } 
    //if not mobile
    else if ($(window).width() > 768) {

    }
    

    //resize window
    $(window).resize(function () {

        "use strict";
    //    $('.one-slide').css({
    //        minHeight: $(window).height()
    //    });

    });
    
    
    //categories
    $('.cagegories .img-container .img-title h4').css({
        marginTop: ( $('.cagegories .img-container').height() - $('.cagegories .img-container .img-title h4').height() ) / 2
    });
    
    
    $(document).ready(function () {
        //small hieghts
        if ( $(window).height() > 632 ) {
            $('.subscriptions .box h2.h3').css({
                marginBottom: 50
            });
        }
    });

});



