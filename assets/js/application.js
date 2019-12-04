$(document).ready(function(){
    /*
    *   Global variables.
    */
    var pageHeight = $(window).height();
    var pageWidth = $(window).width();
    var navigationHeight = $("#navigation").outerHeight();
    
    var pageWelcome = $('#page-welcome');
    var pageWelcomeContent = $('#page-welcome .centralized');
    var pageWelcomeBgrRatio = 1800/1200;

    function placeWelcome(){
        var
            w, h, new_w, new_h,
            x, y, dx, dy,
            x_ratio, y_ratio,
            scaleX, scaleY,
            transform, isSafari8 = false;

        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
            isSafari8 = parseInt(navigator.userAgent.split('Version/')[1].split(' ')[0])>=8;
        }
        w = pageWelcome.width();
        h = pageWelcome.height();
        if (w/h < pageWelcomeBgrRatio){
            new_w = h*pageWelcomeBgrRatio;
            dx = (new_w-w)/2;
            new_h = h;
            dy = 0;
            scaleX = 1.6*w/1800;
        } else {
            new_w = w;
            dx = 0;
            new_h = w/pageWelcomeBgrRatio;
            dy = (new_h-h)/2;
            scaleX = 1.7*h/1200;
        }

        y_ratio = new_h/1200;
        x_ratio = new_w/1800;
        scaleX = x_ratio*1.5;
        scaleY = y_ratio*1.5;
        x = 450*x_ratio-dx;
        y = 530*y_ratio-dy;

        transform = 'scaleX(' + scaleX + ') scaleY('+scaleY+') rotate(-4deg)';
        pageWelcomeContent.css({
          '-webkit-transform' : transform,
          '-moz-transform'    : transform,
          '-ms-transform'     : transform,
          '-o-transform'      : transform,
          'transform'         : transform,
          'top'               : isSafari8?y+17:y,
          'left'              : x
        });
    }

    function initWelcome(){
        placeWelcome();
        pageWelcomeContent.css('visibility','visible');
        pageWelcomeContent.fadeTo(500, 1);
    }

    initWelcome();

    /*
    *   ON RESIZE, check again
    */
    $(window).resize(function () {
        pageWidth = $(window).width();
        pageHeight = $(window).height();

        placeWelcome();
    });
    
    /*
    *   ON LOAD
    */

    // Fix navigation.
    $('#navigation').fixedonlater();
    
    //Initialize scroll so if user droped to other part of page then home page.
    $(window).trigger('scroll');
   
    // Carousel "Quote slider" initialization.
    $('#quote-slider').carousel({
        interval: 20000
    })

    //Scroll spy and scroll filter
    $('#main-menu').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollOffset: navigationHeight - 10,
        scrollThreshold: 0.5,
        scrollSpeed: 750,
        filter: '',
        easing: 'swing',
     });
    
    
    // Paralax initialization.
    // Exclude for mobile.
    if(pageWidth > 980){
        //Dont user paralax for tablet and mobile devices.
        //$('#page-welcome').parallax("0%", 0.2);
        $('#page-features').parallax("0%", 0.07);
        $('#page-twitter').parallax("0%", 0.1);
    }
    
    //Emulate touch on table/mobile touchstart.
    if(typeof(window.ontouchstart) != 'undefined') {
        var touchElements = [".social-icons a", ".portfolio-items li", ".about-items .item"];
        
        $.each(touchElements, function (i, val) {
            $(val).each(function(i, obj) {
                $(obj).bind('click', function(e){
                
                    if($(this).hasClass('clickInNext')){
                        $(this).removeClass('clickInNext');
                    } else {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        $(this).mouseover();
                        $(this).addClass('clickInNext');
                    }
                });
            });
        });
    }

    /*
    *   BLOCK | Navigation
    *
    *   Smooth scroll
    *   Main menu links
    *   Logo click on Welcome page
    */
    $('#page-welcome .logo a').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - navigationHeight + 4
            
        }, 800);
        
        //Fix jumping of navigation.
        setTimeout(function() {
            $(window).trigger('scroll');
        }, 900);
        
        return false;
    });
    
    
    /*
    *   PAGE | Welcome 
    *
    *   Initialize slider for welcome page H1 message.
    */
   $('#welcome-messages ul').bxSlider({
        mode: 'vertical',
        auto: true,
        minSlides: 1,
        responsive: true,
        touchEnabled: true,
        pager: false,
        controls: false,
        useCSS: false,
        pause: 5000
    });
    /*
    *   PAGE | WORK
    *
    *   .plugin-filter - Defines action links.
    *   .plugin-filter-elements - Defines items with li.
    */
    $('.plugin-filter').click(function(){
        return false;
    });
    $('.plugin-filter-elements').mixitup({
        targetSelector: '.mix',
        filterSelector: '.plugin-filter',
        sortSelector: '.sort',
        buttonEvent: 'click',
        effects: ['fade','rotateY'],
        listEffects: null,
        easing: 'smooth',
        layoutMode: 'grid',
        targetDisplayGrid: 'inline-block',
        targetDisplayList: 'block',
        gridClass: '',
        listClass: '',
        transitionSpeed: 600,
        showOnLoad: 'all',
        sortOnLoad: false,
        multiFilter: false,
        filterLogic: 'or',
        resizeContainer: true,
        minHeight: 0,
        failClass: 'fail',
        perspectiveDistance: '3000',
        perspectiveOrigin: '50% 50%',
        animateGridList: true,
        onMixLoad: null,
        onMixStart: null,
        onMixEnd: null
    });
    
    /*
    *   PAGE | Twitter 
    *   
    *   CONFIGURE FIRST
    *
    *   Pull latest tweets from user.
    *   Configuration: /plugins/twitter/index.php
    
    $('.twitterfeed').tweet({
        modpath: 'plugins/twitter/',
        username: 'TheGridelicious',
        count: 3
    });
    */
    
    //Prepare markup for twitter feed and carousel. Alow twitter to load. 1s, load time.
    setTimeout(function() {
        var myCarousel = $("#twitterfeed-slider");
        myCarousel.append("<ol class='carousel-indicators'></ol>");
        
        myCarousel.find('.tweet_list').addClass("carousel-inner");
        myCarousel.find('.tweet_list li').addClass('item').first().addClass("active");
            
        var indicators = myCarousel.find(".carousel-indicators"); 
        myCarousel.find(".carousel-inner").children(".item").each(function(index) {
            (index === 0) ? 
            indicators.append("<li data-target='#twitterfeed-slider' data-slide-to='"+index+"' class='active'></li>") : 
            indicators.append("<li data-target='#twitterfeed-slider' data-slide-to='"+index+"'></li>");
        });
        
        //After creating markup, start carousel.
       $('#twitterfeed-slider').carousel({
            interval: 5000,
            pause: "hover"
        });
        
    }, 1000);
});


/*
*   Ajax request.
*   Start loading.
*   Append loading notification.
*/
$( document ).ajaxSend( function() {

    // Show loader.
    if($(".loading").length == 0) {
        $("body").append('<div class="loading"><div class="progress progress-striped active"><div class="bar"></div></div></div>');
        $(".loading").slideDown();
        $(".loading .progress .bar").delay(300).css("width", "100%");
    }
});

/*
*   Reinitialize Scrollspy after ajax request is completed.
*   Refreshing will recalculate positions of each page in document.
*   Time delay is added to allow ajax loaded content to expand and change height of page.
*/
$( document ).ajaxComplete(function() {

    // Remove loading section.
    $(".loading").delay(1000).slideUp(500, function(){
        $(this).remove();
    });
    
    
    // Portfolio details - close.
    $(".close-portfolio span").click(function(e) {
        $(".portfolio-item-details").delay(500).slideUp(500, function(){
            $(this).remove();
        });
        
        window.location.hash= "!";
        return false;
    });
});

