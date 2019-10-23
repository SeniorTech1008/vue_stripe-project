// /*global $, document, window*/
// $(document).ready(function () {
//     "use strict";

//     //select nice
//     //navbar changing color while scroll
//     $(window).on('scroll', function () {
//         if( $(window).scrollTop() >= $('.new-index.destinations-new-index').offset().top ){
//             console.log('i should be colored');
//             $('nav.new-index').addClass('scroll-bottom');
            
//         } else if ( $(window).scrollTop() < $('.new-index.destinations-new-index').offset().top ) {
//             console.log('i should be transparent');
//             $('nav.new-index').removeClass('scroll-bottom');
//         }
//     });
//     //resize header
//     $('header.new-index').css({
//         minHeight: ($(window).height() / 10) * 8
//     });
//     //box top center
//     $('header.new-index .box').css({
//         top: ($(window).height() - $('header.new-index .box').height() ) / 3 - ($('nav').height() + 40) 
//     });
//         //for mobile 
//     if ($(window).width() < 768) {
//         $('header.new-index .box').css({
//             top: 0
//         });
//     }
//     //search button center
//     $('header.new-index .form-container button').css({
//         marginTop: ( $('header.new-index .form-container .col-sm-2').height() - $('header.new-index .form-container button').height() ) / 4
//     });
//     //remove default hover offer 
//     $('.new-index.subs .offer').on('mouseenter', function () {
//         $('.new-index.subs .offer').removeClass('default-hover');
//     })
//     //sign in 
//     $('.signup .fly-smarter, .sign-up-section').css({
//         minHeight: $(window).height()
//     });
//     $('.signup .box').css({
//         top:  ( $(window).height() - $('.signup .box').height()  ) / 4 
//     });
//     if ($(window).width() < 768) {
//         $('.signup .box').css({
//             top:  0
//         });
//     }
//     if ($(window).height() > 900) {
//         $('.sign-up-section .form-container input').css({
//             marginBottom: 20
//         });
//         $('.sign-up-section .form-container h2').css({
//             margin: "40px 0"
//         });
//     }
//     //background-zoom
//     if ($(window).width() > 768) {
//         $('.fly-smarter').on('mouseenter', function() {
//             $(this).animate({
//                 backgroundSize: "120%",
//             }, 25000, "linear")
//         })
//     }

//     //resizeing
//     $(window).resize(function () {
//         //resize header
//         $('header.new-index').css({
//             minHeight: ($(window).height() / 10) * 8
//         });
//     });
    
// });