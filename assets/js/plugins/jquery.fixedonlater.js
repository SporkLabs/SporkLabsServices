/*!
 *  fixedonlater.js v0.1
 *  Fix element after scrolling one page height.
 *  Usage in combination with css, class .fixed-top or .fixed-bottom
 *
 *  by Rewea: http://www.rewea.com
 *
 *  Copyright 2013 Rewea.com - Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0).
 *  http://creativecommons.org/licenses/by-sa/3.0/deed.en_US
 */

$.fn.fixedonlater = function() {
    obj = $(this);
    objHeight = $(this).outerHeight();
    pageHeight = $(window).height();
    
    //Follow scrolling event
    $.event.add(window, "scroll", function() {
        pageScrollTop = $(window).scrollTop();
        
        //Give some time to browser
        setTimeout(function() {
            //If scrolled page is more then height of page - height of fixed element..
            if(pageScrollTop > (pageHeight - objHeight)) {
                //If object is not visable, make it visable.
                if(obj.css('opacity') != 1) {
                    obj.slideDown(250).animate(
                        { opacity: 1 },
                        { queue: false, duration: 100 }
                    );
                };
            } else {
                obj.slideUp(250).animate(
                    { opacity: 0 },
                    { queue: false, duration: 250 }
                );
            }
        }, 500);
    });
    
    $(window).bind('resize', function() {
        pageHeight = $(window).height();
    });
};

