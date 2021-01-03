/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

$(document).ready(function (){
    $('#adminLoginNavbar').show();
    var usernameval = $('#usernamevalue').val().length;
    var adminval = $('#adminTrueFalse').val();
    $('#usernamevalue').val() == "false" ? usernameval = 0 : 0 ;
    if(adminval == "true" || usernameval > 0){
        $('#adminLoginNavbar').hide();
    }
});

 /* $('#contactForm').submit(function(e){
    e.preventDefault();
     console.log(this);
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var message = $('#message').val();
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : "/adminContactSendMail",
		data : {	
			"formdata" : "123456"		
		},
		success : function(data) {
            if(data){
                mailsent();
            }
		},
		error : function(e) {
			console.log("ERROR: ", e);
			alert("Please Contact the System Admin");
		},
		done : function(e) {
			console.log("DONE");
		},
		complete : function(e) {
			console.log("Completed");	
		}
	});
 }); */

$('#adminloginSubmitbtn').click(function (event) {
    event.preventDefault(); // prevent default submit behaviour
        $this = $("#adminloginSubmitbtn");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        
        $.ajax({
            url: "login",
            type: "POST",
            data: {
              "email" : $('#adminEmail').val(),
              "password" : $('#adminPassword').val()
            },
            success: function (result) {
              console.log(result)
              if(result == 'success'){
                window.location.href="/admin";
              }
              if(result == 'failed'){
                // Failed message
                Swal.fire({
                    title: "Please Try again!",
                    text: "Username or Password Credentials are Wrong",
                    icon: 'error',
                    timer: 1700,
                    showConfirmButton: false
                }).then(function (){
                   /*  window.location.href="/"; */
                });
               /*  $("#adminLoginForm").trigger("reset");
                $("#darkModalForm").hide();
                 */
              }
            },
            error: function () {
                // Fail message
                Swal.fire(
                    ' Sorry ',
                    'It seems that my server is not responding. Please try again later!!',
                    'error'
                    );
                //clear all fields
                $("#adminLoginForm").trigger("reset");
            },
            complete: function () {
                setTimeout(function () {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);
            },
        }); 
});