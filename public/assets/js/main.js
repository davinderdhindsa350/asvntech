(function ($) {
	"use strict";
	
	/*----------------------------
    Responsive menu Active
    ------------------------------ */
	$(".mainmenu ul#primary-menu").slicknav({
		allowParentLinks: true,
		prependTo: '.responsive-menu',
	});
	
	/*----------------------------
    START - Menubar scroll animation
    ------------------------------
	jQuery(window).on('scroll', function() {
		if ($(this).scrollTop() > 10) {
			$('.header').addClass("sticky");
		} else {
			$('.header').removeClass("sticky");
		}
	});
	
	       ----------------------------
    START - Smooth scroll animation
    ------------------------------ */
	$('.mainmenu li a, .logo a,.slicknav_nav li a').on('click', function () {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
		&& location.hostname == this.hostname) {
		  var $target = $(this.hash);
		  $target = $target.length && $target
		  || $('[name=' + this.hash.slice(1) +']');
		  if ($target.length) {
			var targetOffset = $target.offset().top;
			$('html,body')
			.animate({scrollTop: targetOffset}, 2000);
		   return false;
		  }
		}
	});
	
	/*----------------------------
    START - Scroll to Top
    ------------------------------ */
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 600) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	$('.scrollToTop').on('click', function () {
		$('html, body').animate({scrollTop : 0},2000);
		return false;
	});
	
	/*----------------------------
    START - Slider activation
    ------------------------------ */
	$('.slider-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		autoplay: true,
    autoplaySpeed: 2000,
		dots: true,
		focusOnSelect: true,
		prevArrow: '',
		nextArrow: ''
	  });
	$('.screenshot-wrap').slick({
		autoplay: true,
		dots: true,
		autoplaySpeed: 1000,
		slidesToShow: 3,
		centerPadding: '20%',
		centerMode: true,
		prevArrow: '',
		nextArrow: '',
		responsive: [{

		  breakpoint: 992,
		  settings: {
			slidesToShow: 1,
			centerPadding: '33.3%'
		  }

		},{

		  breakpoint: 576,
		  settings: {
			slidesToShow: 1,
			centerPadding: '0'
		  }

		}]
	});
	
	var testimonialSlider = $('.testimonial-wrap');
	testimonialSlider.owlCarousel({
		loop:true,
		dots: true,
		mouseDrag: false,
		autoplay: true,
		autoplayTimeout:1500,
		nav: false,
		items: 1,
	});
	testimonialSlider.on("translate.owl.carousel", function(){
		$(".single-testimonial-box img, .author-rating").removeClass("animated zoomIn").css("opacity", "0");
	});
	testimonialSlider.on("translated.owl.carousel", function(){
		$(".single-testimonial-box img, .author-rating").addClass("animated zoomIn").css("opacity", "1");
	});
	testimonialSlider.on('changed.owl.carousel', function(property) {
		var current = property.item.index;
		var prevRating = $(property.target).find(".owl-item").eq(current).prev().find('.author-img').html();
		var nextRating = $(property.target).find(".owl-item").eq(current).next().find('.author-img').html();
		$('.thumb-prev .author-img').html(prevRating);
		$('.thumb-next .author-img').html(nextRating);
	});
	$('.thumb-next').on('click', function() {
		testimonialSlider.trigger('next.owl.carousel', [300]);
		return false;
	});
	$('.thumb-prev').on('click', function() {
		testimonialSlider.trigger('prev.owl.carousel', [300]);
		return false;
	});
	
	var heroSlider = $('.hero-area-slider');
	heroSlider.owlCarousel({
		loop:true,
		dots: false,
		autoplay: true,
		autoplayTimeout: 5000,
		nav: true,
		navText: ["<i class='icofont icofont-long-arrow-left'></i>", "<i class='icofont icofont-long-arrow-right'></i>"],
		items: 1,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		mouseDrag: true,
		touchDrag: true,
		responsive:{
			768:{
				mouseDrag: false,
				touchDrag: false,
			}
		}
	});
	
	/*----------------------------
	START - videos popup
	------------------------------ */
	$('.popup-youtube').magnificPopup({type:'iframe'});
	//iframe scripts
	$.extend(true, $.magnificPopup.defaults, {  
		iframe: {
			patterns: {
				//youtube videos
				youtube: {
					index: 'youtube.com/', 
					id: 'v=', 
					src: 'https://www.youtube.com/embed/%id%?autoplay=1' 
				}
			}
		}
	});
	
	/*----------------------------
    START - Counterup
    ------------------------------ */
	$('.counter').counterUp({
		delay: 20,
		time: 3000
	});
	
	/*----------------------------
    START - Video
    ------------------------------ */
	if($.fn.YTPlayer){
		$(".player").YTPlayer();
	}
	
	/*----------------------------
    START - Switcher animation
    ------------------------------ */
	$('#toggle-switcher').on('click', function(){
		if($(this).hasClass('open')){
			$(this).removeClass('open');
			$('#switch-style').animate({'right':'-232px'});
		}else{
			$(this).addClass('open');
			$('#switch-style').animate({'right':'0'});
		}
	});
	
	/*----------------------------
    START - Preloader
    ------------------------------ */
	jQuery(window).on('load', function(){
		jQuery("#preloader").fadeOut(500);
	});
	
	/*----------------------------
    START - WOW JS animation
    ------------------------------ */
	new WOW().init();

}(jQuery));

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}
function sendMail() {
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var contact = document.getElementById("contact1").value;
	var attachment = document.getElementById("attachment").files.item(0)
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (name == '' || name == null || name == undefined) {
		alert("Name should not be empty");
		return;
	}
	if (email == '' || email == null || email == undefined) {
		alert("Email should not be empty!!");
		return;
	}
	if (email.length < 1 || !email.match(mailformat)) {
		alert("Invalid Email !!");
		return;
	}
	if (contact == null || contact == '' || contact == undefined) {
		alert("Contact number should not be empty!!");
		return;
	}
	if (contact.match(/\d/g) == null || contact.match(/\d/g).length != 10) {
		alert("Invalid Contact Number !!");
		return;
	}
	debugger;
	if (attachment != null) {
		
		getBase64(attachment).then(
			data => {
				Email.send({
					SecureToken : "a897fcb9-eabf-48a5-86ec-0310d4a485a5",
					To: 'info@asvntech.com, sales@asvntech.com,davinderdhindsa350@gmail.com',
					From: "davinderdhindsa356@gmail.com",
					Subject: "Client Request ASVN Tech website",
					Body: "Client Name :  " + document.getElementById("name").value + " <br/>Email: " + document.getElementById("email").value + "<br/>Contact : " + document.getElementById("contact1").value + "<br/>Message :" + document.getElementById("message").value,
		
					Attachments: [
						{
							name: attachment.name,
							data: data
						}]
				}
				).then(
					message => {
						if (message == "OK")
							alert("Thanks we will connect you soon.")
						else
							alert("Please send mail to info@asvntech.com . Sorry due to some System error not able to save details")
					}
				)
			}
		);
		
	}
	else {

		Email.send({
			SecureToken : "a897fcb9-eabf-48a5-86ec-0310d4a485a5",
			To: 'info@asvntech.com, sales@asvntech.com,davinderdhindsa350@gmail.com',
			From: "davinderdhindsa356@gmail.com",
			Subject: "Client Request ASVN Tech website",
			Body: "Client Name :  " + document.getElementById("name").value + " <br/>Email: " + document.getElementById("email").value + "<br/>Contact : " + document.getElementById("contact1").value + "<br/>Message :" + document.getElementById("message").value
		}).then(
			message => {
				if (message == "OK")
					alert("Thanks we will connect you soon.")
				else
					alert("Please send mail to info@asvntech.com . Sorry due to some System error not able to save details")
			}
		)
	}
}
