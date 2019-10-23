/*global $, console, WOW, run, JsPDF, iScrollPos*/
$(document).ready(function () {
    "use strict";
    //make form last child in search resaults ((((why you remove it ? :D))))
     $('#flightsDataCont').ready(function () {
         $('.bookingoverlay').append($('.form-store'));
     });

     $('#flights .card').ready(function () {
         $('#flights').append($('#flights .form-store'));
         $('#flights').append($('#flights footer'));

     });

    //hidden body scroll when search resault appear
//    $('.pop-form-container button').on('click', function () {
//        $('body').css({
//            overflow: "hidden"
//        });
//    });

    //search results css fix
//    $('.pop-form-container button').on('click', function () {
//        $('.pop-form-container').fadeOut();
//    });
    $('#flights').css({
        top: $('nav').height()
    });

    //sub and loging hover
    //sub
    $('nav .form-container.sub-form-container').css({
        height: $('nav .form-container form').height() + 40
    });
    $('nav .sub-form-container').hide(100);
    $('.nav-sub a').on('mouseenter', function () {
        $('.nav-sub .sub-form-container').fadeToggle();
        $('.nav-log .log-form-container').fadeOut();
    })
    $('.sections, .one-slide').css({
        minHeight: $(window).height()
    });

    //login log-form-container
    $('.nav-log > a').on('mouseenter', function () {
        $('.nav-log .log-form-container').fadeToggle();
        $('.nav-sub .sub-form-container').fadeOut()
    });

    $('.box.fly').css({
        top: ($(window).height() - $('.box.fly').height()) / 2
    });
    $('.box.sub').css({
        top: ($(window).height() - $('.box.sub').height()) / 2
    });
    $('.box.bok').css({
        top: ($(window).height() - $('.box.bok').height()) / 2
    });
    $('.box.des').css({
        top: ($(window).height() - $('.box.des').height()) / 2
    });
    $('.box.search').css({
        top: ($(window).height() - $('.box.search').height()) / 2
    });
    $('.box.down').css({
        top: ($(window).height() - $('.box.down').height()) / 2
    });
    $('#slideshow').css({
        height: $(window).height()
    });
    $('.download .form-container').css({
        top: ( $('.download .img-container').height() - $('.download .form-container').height() ) / 2
    });


    //search
    $('.nav-input-search').click(function(){
      $('.pop-up').addClass('open');
        $('html, body').animate({
            scrollTop: 0
        }, 100);
    });
    $('.pop-up .close').click(function(){
      $('.pop-up').removeClass('open');
    });

    $('#flights .close-btn').on('click', function() {
       $('#flights').fadeOut();
        $('body').css({
            overflow: 'auto'
        });
    });
    //close bokking
    $('.bookingoverlay').append('<span class="close-btn">Close</span>');
    $('.bookingoverlay .close-btn').on('click', function() {
        $('.bookingoverlay').fadeOut();
    });
    $('.pop-form-container').css({
        position: 'relative',
        top: ( $(window).height() - $('div.pop-up .content .container').height() ) / 2
    })

    $('.pop-up .content').css({
        minHeight: $(window).height()
    });

    //team section // only mobile size
    if ($(window).width() > 768) {
        $('.pro-team').css({
            height: $('.largist').height()
        });

        $('.search-nav-container').css({
            left: ( $('.navbar-default').width() / 2 ) - 150
        });
        $('.box.des').css({
            top: ($(window).height() - $('.box.des').height()) / 2
        });
    } else if ($(window).width() < 768) {
        $('.sub-page-footer ul').slideUp();
        $('.sub-page-footer p').on('click', function () {
            $(this).next('ul').slideToggle();
            $('html, body').animate({
                scrollTop: ($(this).offset().top - $('nav').height()) - 10
            });
        });
    }
     $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.search-nav-container').css({
                left: ( $('.navbar-default').width() / 2 ) - 150
            });
        }

        $('.sections, .one-slide').css({
            minHeight: $(window).height()
        });
        $('.box.fly').css({
            top: ($(window).height() - $('.box.fly').height()) / 2
        });
        $('.box.sub').css({
            top: ($(window).height() - $('.box.sub').height()) / 2
        });
        $('.box.bok').css({
            top: ($(window).height() - $('.box.bok').height()) / 2
        });
        $('.box.des').css({
            top: ($(window).height() - $('.box.des').height()) / 2
        });
        $('.box.search').css({
            top: ($(window).height() - $('.box.search').height()) / 2
        });
        $('.box.down').css({
            top: ($(window).height() - $('.box.down').height()) / 2
        });
        $('#slideshow').css({
            height: $(window).height()
        });
         //large screen
       if ($(window).height() > 1000) {
            $('#slideshow').css({
                height: ($(window).height() / 10) * 8
            });
            $('.sections, .one-slide').css({
                minHeight: ($(window).height() / 10) * 8
            });
            $('.box.fly').css({
                top: ( $('#slideshow').height() - $('.box.fly').height()) / 2
            });
            $('.box.sub').css({
                top: ( $('#slideshow').height() - $('.box.sub').height()) / 2
            });
            $('.box.bok').css({
                top: ($(window).height() - $('.box.bok').height()) / 2
            });
            $('.box.des').css({
                top: ($(window).height() - $('.box.des').height()) / 2
            });
            $('.box.search').css({
                top: ($(window).height() - $('.box.search').height()) / 2
            });
            $('.box.down').css({
                top: ($(window).height() - $('.box.down').height()) / 2
            });
       }
     });

    $(document).ready(function () {

        if ( $(window).height() > 632 ) {
            $('.subscriptions .box h2.h3').css({
                marginBottom: 50
            });
            $('.booking button').css({
                marginTop: 100
            });
           // console.log($(window).height());
        } else if ( $(window).height() < 900 ) {

            $('.subscriptions .box h2.h3').css({
                marginBottom: '0px !important',
                paddingBottom: 20
            });
            $('.subscriptions .offer').css({
                padding:10
            });
            $('.subscriptions .offer .h4').css({
                 margin: '20px auto'
            });
            $('.subscriptions .offer button').css({
                margin: '20px auto'
            });
            $('.search-flights h2').css({
                marginBottom: 30
            });
        }

        $('#slideshow').fadeSlideShow({
            autoplay: true
        });
        $('.sections, .one-slide').css({
            minHeight: $(window).height()
        });
        $('.box.fly').css({
            top: ($(window).height() - $('.box.fly').height()) / 2
        });
        $('.box.sub').css({
            top: ($(window).height() - $('.box.sub').height()) / 2
        });
        $('.box.bok').css({
            top: ($(window).height() - $('.box.bok').height()) / 2
        });
        $('.box.des').css({
            top: ($(window).height() - $('.box.des').height()) / 2
        });
        $('.box.search').css({
            top: ($(window).height() - $('.box.search').height()) / 2
        });
        $('.box.down').css({
            top: ($(window).height() - $('.box.down').height()) / 2
        });
        $('#slideshow').css({
            height: $(window).height()
        });
        //large screens edit
        $(document).ready(function() {
               if ($(window).height() > 1000) {
                    $('#slideshow').css({
                        height: ($(window).height() / 10) * 8
                    });
                    $('.sections, .one-slide').css({
                        minHeight: ($(window).height() / 10) * 8
                    });
                    $('.box.fly').css({
                        top: ( $('#slideshow').height() - $('.box.fly').height()) / 2
                    });
                    $('.box.sub').css({
                        top: ( $('#slideshow').height() - $('.box.sub').height()) / 2
                    });
                    $('.box.bok').css({
                        top: ($(window).height() - $('.box.bok').height()) / 2
                    });
                    $('.box.des').css({
                        top: ($(window).height() - $('.box.des').height()) / 2
                    });
                    $('.box.search').css({
                        top: ($(window).height() - $('.box.search').height()) / 2
                    });
                    $('.box.down').css({
                        top: ($(window).height() - $('.box.down').height()) / 2
                    });
               }
        });
    });


});



$(window).resize(function () {

    "use strict";
//    $('.one-slide').css({
//        minHeight: $(window).height()
//    });

});


//fade
$.fn.fadeSlideShow = function(options) {

	return this.each(function(){
		settings = $.extend({
     		width: '100%', // default width of the slideshow
     		minHeight: $(window).height(), // default height of the slideshow
			speed: 1000, // default animation transition speed
			interval: 5000, // default interval between image change
			PlayPauseElement: 'fssPlayPause', // default css id for the play / pause element
			PlayText: 'Play', // default play text
			PauseText: 'Pause', // default pause text
			NextElement: 'fssNext', // default id for next button
			NextElementText: 'Next >', // default text for next button
			PrevElement: 'fssPrev', // default id for prev button
			PrevElementText: '< Prev', // default text for prev button
			ListElement: 'fssList', // default id for image / content controll list
			ListLi: 'fssLi', // default class for li's in the image / content controll
			ListLiActive: 'fssActive', // default class for active state in the controll list
			addListToId: false, // add the controll list to special id in your code - default false
			allowKeyboardCtrl: true, // allow keyboard controlls left / right / space
			autoplay: true // autoplay the slideshow
	 	}, options);

		// set style for wrapper element
		$(this).css({
			width: settings.width,
			height: settings.height,
			position: 'relative',
			overflow: 'hidden'
		});

		// set styles for child element
		$('> *',this).css({
			position: 'absolute',
			width: settings.width,
			height: settings.height
		});

		// count number of slides
		Slides = $('> *', this).length;
		Slides = Slides - 1;
		ActSlide = Slides;
		// Set $ Slide short var
		jQslide = $('> *', this);
		// save this
		fssThis = this;

		autoplay = function(){
			intval = setInterval(function(){
				jQslide.eq(ActSlide).fadeOut(settings.speed);

				// if list is on change the active class
				if(settings.ListElement){
					setActLi = (Slides - ActSlide) + 1;
					if(setActLi > Slides){setActLi=0;}
					$('#'+settings.ListElement+' li').removeClass(settings.ListLiActive);
					$('#'+settings.ListElement+' li').eq(setActLi).addClass(settings.ListLiActive);
				}

				if(ActSlide <= 0){
					jQslide.fadeIn(settings.speed);
					ActSlide = Slides;
				}else{
					ActSlide = ActSlide - 1;
				}
			}, settings.interval);

			if(settings.PlayPauseElement){
				$('#'+settings.PlayPauseElement).html(settings.PauseText);
			}
		}

		stopAutoplay = function(){
			clearInterval(intval);
			intval = false;
			if(settings.PlayPauseElement){
				$('#'+settings.PlayPauseElement).html(settings.PlayText);
			}
		}

		jumpTo = function(newIndex){
			if(newIndex < 0){newIndex = Slides;}
			else if(newIndex > Slides){newIndex = 0;}
			if( newIndex >= ActSlide ){
				$('> *:lt('+(newIndex+1)+')', fssThis).fadeIn(settings.speed);
			}else if(newIndex <= ActSlide){
				$('> *:gt('+newIndex+')', fssThis).fadeOut(settings.speed);
			}

			// set the active slide
			ActSlide = newIndex;

			if(settings.ListElement){
				// set active
				$('#'+settings.ListElement+' li').removeClass(settings.ListLiActive);
				$('#'+settings.ListElement+' li').eq((Slides-newIndex)).addClass(settings.ListLiActive);
			}
		}

		// if list is on render it
		if(settings.ListElement){
			i=0;
			li = '';
			while(i<=Slides){
				if(i==0){
					li = li+'<li class="'+settings.ListLi+i+' '+settings.ListLiActive+'"><a href="#">'+'<\/a><\/li>';
				}else{
					li = li+'<li class="'+settings.ListLi+i+'"><a href="#">'+'<\/a><\/li>';
				}
				i++;
			}
			List = '<ul id="'+settings.ListElement+'">'+li+'<\/ul>';

			// add list to a special id or append after the slideshow
			if(settings.addListToId){
				$('#'+settings.addListToId).append(List);
			}else{
				$(this).after(List);
			}

			$('#'+settings.ListElement+' a').bind('click', function(){
				index = $('#'+settings.ListElement+' a').index(this);
				stopAutoplay();
				ReverseIndex = Slides-index;

				jumpTo(ReverseIndex);

				return false;
			});
		}

		if(settings.PlayPauseElement){
			if(!$('#'+settings.PlayPauseElement).css('display')){
				$(this).after('<a href="#" id="'+settings.PlayPauseElement+'"><\/a>');
			}

			if(settings.autoplay){
				$('#'+settings.PlayPauseElement).html(settings.PauseText);
			}else{
				$('#'+settings.PlayPauseElement).html(settings.PlayText);
			}

			$('#'+settings.PlayPauseElement).bind('click', function(){
				if(intval){
					stopAutoplay();
				}else{
					autoplay();
				}
				return false;
			});
		}

		if(settings.NextElement){
			if(!$('#'+settings.NextElement).css('display')){
				$(this).after('<a href="#" id="'+settings.NextElement+'">'+settings.NextElementText+'<\/a>');
			}

			$('#'+settings.NextElement).bind('click', function(){
				nextSlide = ActSlide-1;
				stopAutoplay();
				jumpTo(nextSlide);
				return false;
			});
		}

		if(settings.PrevElement){
			if(!$('#'+settings.PrevElement).css('display')){
				$(this).after('<a href="#" id="'+settings.PrevElement+'">'+settings.PrevElementText+'<\/a>');
			}

			$('#'+settings.PrevElement).bind('click', function(){
				prevSlide = ActSlide+1;
				stopAutoplay();
				jumpTo(prevSlide);
				return false;
			});
		}

		if(settings.allowKeyboardCtrl){
			$(document).bind('keydown', function(e){
				if(e.which==39){
					nextSlide = ActSlide-1;
					stopAutoplay();
					jumpTo(nextSlide);
				}else if(e.which==37){
					prevSlide = ActSlide+1;
					stopAutoplay();
					jumpTo(prevSlide);
				}else if(e.which==32){
					if(intval){stopAutoplay();}
					else{autoplay();}
					return false;
				}
			});
		}

		// start autoplay or set it to false
		if(settings.autoplay){autoplay();}else{intval=false;}

	});



};
