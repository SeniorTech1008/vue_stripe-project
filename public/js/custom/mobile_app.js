
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
$(document).ready(function() {
var show_btn = $('#started');
//  var show_btn=$('.show-modal');
//$("#testmodal").modal('show');
show_btn.click(function() {
$("#login-Modal").modal('hide');
$("#subscribe-Modal").modal('show');
});
});
$(document).ready(function() {
var show_btn = $('#login');
//  var show_btn=$('.show-modal');
//$("#testmodal").modal('show');
show_btn.click(function() {
$("#subscribe-Modal").modal('hide');
$("#login-Modal").modal('show');
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
if(localStorage.getItem('wanderlift') == null) {
localStorage.setItem('wanderlift', 'false');
}
if(localStorage.getItem('wanderlift') == 'true') {
localStorage.setItem('wanderlift', 'false')
$('.body_index .footer-new, .body_index .body-page').css('display', 'block');
$('header.new-index, .welcome-wande').css('display', 'none');
} else if(localStorage.getItem('wanderlift') == 'false'){
$('.body_index .before-load.bg-change, .body_index .footer-new, .body_index .body-page, .welcome-wande').css('display', 'none');
$('header.new-index').css('display', 'block');
}
$('.btn-search').on('click', function() {
localStorage.setItem('wanderlift', 'true')
});
$('.flight-box-back').on('click', function() {
localStorage.setItem('wanderlift', 'false');
location.reload();
})
}
$('.btn--signup').on('click', function(e) {
e.preventDefault();
$("#flightSearchModal").modal('hide');
$('.subscribe-Modal').click();
})
$('.modal-backdrop').on('click', function() {
setTimeout(function(){
$('html').css('overflow', 'visible')
}, 200)
})
