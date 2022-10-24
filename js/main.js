(function($) {

    "use strict";

    // Document ready function 
    $(function() {

        /*-------------------------------------
            Popup
        -------------------------------------*/
        if ($(".popup-youtube").length) {
            $('.popup-youtube').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,

                fixedContentPos: false
            });
        }

        if ($('.elv-zoom-single').length) {
            $('.elv-zoom-single').magnificPopup({ type: 'image' });
        }

        if ($('.zoom-gallery').length) {
            $('.zoom-gallery').each(function() { // the containers for all your galleries
                $(this).magnificPopup({
                    delegate: 'a.gallery-zoom', // the selector for gallery item
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            });
        }
        /*-------------------------------------
        Booking dates and time
        -------------------------------------*/
        if ($('.rt-date').length) {
            $('.rt-date').datetimepicker({
                format: 'Y-m-d',
                timepicker: false
            });
        }
        if ($('.rt-time').length) {
            $('.rt-time').datetimepicker({
                format: 'H:i',
                datepicker: false
            });
        }

        /*-------------------------------------
         Jquery Serch Box
         -------------------------------------*/
        var topSearchForm = $('#top-search-form');

        topSearchForm.on('click', 'a.search-button', function(e) {
            e.preventDefault();

            var targrt = $(this).prev('input.search-input');
            targrt.animate({
                width: ["toggle", "swing"],
                height: ["toggle", "swing"],
                opacity: "toggle"
            }, 500, "linear");

            return false;

        });

        // On click loadmore functionality 
        $('.loadmore').on('click', 'a', function(e) {
            e.preventDefault();
            var _this = $(this),
                _parent = _this.parents('.menu-list-wrapper'),
                _target = _parent.find('.menu-list'),
                _set = _target.find('.menu-item.hidden').slice(0, 4); // Herre 2 is the limit
            if (_set.length) {
                _set.animate({ opacity: 0 });
                _set.promise().done(function() {
                    _set.removeClass('hidden');
                    _set.show().animate({ opacity: 1 }, 1000);
                });
            } else {
                _this.text('No more item to display');
            }

            return false;
        });


    });

    /*-------------------------------------
     jQuery MeanMenu activation code
     --------------------------------------*/
    $('nav#dropdown').meanmenu({ siteLogo: "<a href='index.html' class='logo-mobile-menu'><img src='img/mobile-logo.png' /></a>" });

    /*-------------------------------------
     Wow js Active
     -------------------------------------*/
    new WOW().init();

    /*---------------------------
     Scroll to top
     ----------------------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*-------------------------------------
     Sidebar Menu activation code
    -------------------------------------*/
    $('#additional-menu-area').on('click', 'span.side-menu-trigger', function() {

        var $this = $(this),
            wrapper = $(this).parents('body').find('>#wrapper');
        if ($this.hasClass('open')) {
            document.getElementById('mySidenav').style.width = '0';
            $this.removeClass('open').find('i.fa').removeClass('fa-times').addClass('fa-bars');
            wrapper.removeClass('open');
        } else {
            wrapper.addClass('open');
            $this.addClass('open').find('i.fa').removeClass('fa-bars').addClass('fa-times');
            document.getElementById('mySidenav').style.width = '280px';
        }

    });

    $('#mySidenav').on('click', '.closebtn', function(e) {
        e.preventDefault();
        var $this = $(this),
            wrapper = $(this).parents('body').find('>#wrapper');
        wrapper.removeClass('open');
        document.getElementById('mySidenav').style.width = '0';
        $('#additional-menu-area span.side-menu-trigger').removeClass('open').find('i.fa').removeClass('fa-times').addClass('fa-bars');

    });


    /****************************************
  Circle Bars - Knob
  ***************************************/
    if (typeof($.fn.knob) != 'undefined') {
        $('.knob.knob-nopercent').each(function() {
            var $this = $(this),
                knobVal = $this.attr('data-rel');
            $this.knob({
                'draw': function() {}
            });
            $this.appear(function() {
                $({
                    value: 0
                }).animate({
                    value: knobVal
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {

                        $this.val(Math.ceil(this.value)).trigger('change');
                    }
                });
            }, { accX: 0, accY: -150 });
        });


    }

    /*-------------------------------------
       Select2 activation code
       -------------------------------------*/
    if ($('.request-form-select select.select2').length) {
        $('.request-form-select select.select2').select2({
            theme: 'classic',
            dropdownAutoWidth: true,
            width: '100%'
        });
    }

    /*-------------------------------------
     Window load function
     -------------------------------------*/
    $(window).on('load', function() {

        var galleryIsoContainer = $('#blog-gallery');
        if (galleryIsoContainer.length) {

            var blogGallerIso = galleryIsoContainer.imagesLoaded(function() {
                blogGallerIso.isotope({
                    itemSelector: '.blog-item',
                    masonry: {
                        columnWidth: '.blog-item'
                    }
                });
            });
        }

        // Page Preloader
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });

        //jQuery for Isotope initialization
        var $container = $('#isotope-container');
        if ($container.length > 0) {
            var $isotope = $container.find('.featuredContainer').isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            $container.find('.isotope-classes-tab').on('click', 'a', function() {
                var $this = $(this);
                $this.parent('.isotope-classes-tab').find('a').removeClass('current');
                $this.addClass('current');
                var selector = $this.attr('data-filter');
                $isotope.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });
        }

        var testimonialCarousel = $('#rt-testimonial-slider-wrap');
        if (testimonialCarousel.length) {

            testimonialCarousel.find('.testimonial-sliders').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                autoplay: true,
                asNavFor: '.testimonial-carousel'
            });
            testimonialCarousel.find('.testimonial-carousel').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.testimonial-sliders',
                dots: false,
                arrows: true,
                prevArrow: true,
                nextArrow: true,
                centerMode: true,
                centerPadding: '0px',
                focusOnSelect: true
            });

        }

    }); // end window load function

    /*-------------------------------------
     About Counter
     -------------------------------------*/
    var counterContainer = $('.counter');
    if (counterContainer.length) {
        counterContainer.counterUp({
            delay: 50,
            time: 5000
        });

    }

    /*-------------------------------------
     Auto height for product listing
     -------------------------------------*/
    function equalHeight() {
        $('.products-container').each(function() {
            var mHeight = 0;
            $(this).children('div').children('div').height('auto');
            $(this).children('div').each(function() {
                var itemHeight = $(this).actual('height');
                if (itemHeight > mHeight) {
                    mHeight = itemHeight;
                }
                $(this).children('div').height(mHeight + 'px');
            });
        });
    }

    /*-------------------------------------
    Accordion for fixing F&Q
    -------------------------------------*/
    var faqAccordion = $('#faq-accordion');
    faqAccordion
        .on('show.bs.collapse', function(e) {
            faqAccordion.find('.panel-heading').removeClass('active');
            $(e.target).parents('.panel').find('.panel-heading').addClass('active');
            faqAccordion.find('.panel-collapse.collapse').slideUp('slow', function() {
                $(this).removeClass('in').css('display', '');
            });
        });


    /*-------------------------------------
     Accordion
     -------------------------------------*/
    var accordion = $('#accordion');
    accordion.children('.panel').children('.panel-collapse').each(function() {
        if ($(this).hasClass('in')) {
            $(this).parent('.panel').children('.panel-heading').addClass('active');
        }
    });
    accordion
        .on('show.bs.collapse', function(e) {
            $(e.target).prev('.panel-heading').addClass('active');
        })
        .on('hide.bs.collapse', function(e) {
            $(e.target).prev('.panel-heading').removeClass('active');
        });

    /*-------------------------------------
     Contact Form initiating
     -------------------------------------*/
    var contactForm = $('#contact-form');
    if (contactForm.length) {
        contactForm.validator().on('submit', function(e) {
            var $this = $(this),
                $target = contactForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                $target.html("<div class='alert alert-success'><p>Please select all required field.</p></div>");
            } else {

                $.ajax({
                    url: "vendor/php/contact-process.php",
                    type: "POST",
                    data: contactForm.serialize(),
                    beforeSend: function() {
                        $target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function(text) {
                        if (text == "success") {
                            $this[0].reset();
                            $target.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                        } else {
                            $target.html("<div class='alert alert-success'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });
    }

    /*-------------------------------------
     Request call Form initiating
     -------------------------------------*/
    var requestForm = $('#request-form');
    if (requestForm.length) {
        requestForm.validator().on('submit', function(e) {
            var $this = $(this),
                $target = requestForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                $target.html("<div class='alert alert-success'><p>Please select all required field.</p></div>");
            } else {

                $.ajax({
                    url: "vendor/php/request-process.php",
                    type: "POST",
                    data: requestForm.serialize(),
                    beforeSend: function() {
                        $target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function(text) {
                        if (text == "success") {
                            $this[0].reset();
                            $target.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                        } else {
                            $target.html("<div class='alert alert-success'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });
    }

    /*-------------------------------------
     Input Quantity Up & Down activation code
     -------------------------------------*/
    $('#quantity-holder').on('click', '.quantity-plus', function() {

        var $holder = $(this).parents('.quantity-holder');
        var $target = $holder.find('input.quantity-input');
        var $quantity = parseInt($target.val(), 10);
        if ($.isNumeric($quantity) && $quantity > 0) {
            $quantity = $quantity + 1;
            $target.val($quantity);
        } else {
            $target.val($quantity);
        }

    }).on('click', '.quantity-minus', function() {

        var $holder = $(this).parents('.quantity-holder');
        var $target = $holder.find('input.quantity-input');
        var $quantity = parseInt($target.val(), 10);
        if ($.isNumeric($quantity) && $quantity >= 2) {
            $quantity = $quantity - 1;
            $target.val($quantity);
        } else {
            $target.val(1);
        }

    });

    /*-------------------------------------
     Carousel slider initiation
     -------------------------------------*/
    $('.fn-carousel').each(function() {
        var carousel = $(this),
            loop = carousel.data('loop'),
            items = carousel.data('items'),
            margin = carousel.data('margin'),
            stagePadding = carousel.data('stage-padding'),
            autoplay = carousel.data('autoplay'),
            autoplayTimeout = carousel.data('autoplay-timeout'),
            smartSpeed = carousel.data('smart-speed'),
            dots = carousel.data('dots'),
            nav = carousel.data('nav'),
            navSpeed = carousel.data('nav-speed'),
            rXsmall = carousel.data('r-x-small'),
            rXsmallNav = carousel.data('r-x-small-nav'),
            rXsmallDots = carousel.data('r-x-small-dots'),
            rXmedium = carousel.data('r-x-medium'),
            rXmediumNav = carousel.data('r-x-medium-nav'),
            rXmediumDots = carousel.data('r-x-medium-dots'),
            rSmall = carousel.data('r-small'),
            rSmallNav = carousel.data('r-small-nav'),
            rSmallDots = carousel.data('r-small-dots'),
            rMedium = carousel.data('r-medium'),
            rMediumNav = carousel.data('r-medium-nav'),
            rMediumDots = carousel.data('r-medium-dots'),
            center = carousel.data('center');

        carousel.owlCarousel({
            loop: (loop ? true : false),
            items: (items ? items : 4),
            lazyLoad: true,
            margin: (margin ? margin : 0),
            autoplay: (autoplay ? true : false),
            autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
            smartSpeed: (smartSpeed ? smartSpeed : 250),
            dots: (dots ? true : false),
            nav: (nav ? true : false),
            navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
            navSpeed: (navSpeed ? true : false),
            center: (center ? true : false),
            responsiveClass: true,
            responsive: {
                0: {
                    items: (rXsmall ? rXsmall : 1),
                    nav: (rXsmallNav ? true : false),
                    dots: (rXsmallDots ? true : false)
                },
                480: {
                    items: (rXmedium ? rXmedium : 2),
                    nav: (rXmediumNav ? true : false),
                    dots: (rXmediumDots ? true : false)
                },
                768: {
                    items: (rSmall ? rSmall : 3),
                    nav: (rSmallNav ? true : false),
                    dots: (rSmallDots ? true : false)
                },
                992: {
                    items: (rMedium ? rMedium : 5),
                    nav: (rMediumNav ? true : false),
                    dots: (rMediumDots ? true : false)
                }
            }
        });

    });


    /*-------------------------------------
     Window onLoad and onResize event trigger
     -------------------------------------*/
    $(window).on('load resize', function() {
        //Define the maximum height for mobile menu
        var wHeight = $(window).height(),
            mLogoH = $('a.logo-mobile-menu').outerHeight();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('height', wHeight + 'px');

        var s = $('#sticker');
        if (s.parent('.header-one-style').length) {
            var topBar = s.prev('.header-top-bar'),
                total = topBar.outerHeight() + s.outerHeight();
            $('#wrapper').css("padding-top", total + 'px');
        }

    });

    /*-------------------------------------
     Jquery Stiky Menu at window Load
     -------------------------------------*/
    $(window).on('scroll', function() {

        var s = $('#sticker'),
            w = $('.wrapper'),
            h = s.outerHeight(),
            windowpos = $(window).scrollTop(),
            windowWidth = $(window).width(),
            h1 = s.parent('.header-one-style'),
            h2 = s.parent('.header-two-style'),
            h3 = s.parent('.header-three-style'),
            h4 = s.parent('.header-four-style'),
            h5 = s.parent('.header-five-style'),
            h6 = s.parent('.header-six-style'),
            topBar, topBarH, mBottom;

        if (windowWidth > 767) {
            w.css('padding-top', '');
            if (h1.length || h6.length) {
                topBar = s.prev('.header-top-bar');
                topBarH = topBar.outerHeight();
            } else if (h2.length) {
                topBar = h2;
                topBarH = h2.outerHeight() - 35;
            } else if (h4.length) {
                topBar = s.prev('.header-area');
                topBarH = topBar.outerHeight();
            } else if (h5.length || h3.length) {
                topBarH = 1;
            }


            if (windowpos >= topBarH) {
                s.addClass('stick');
                if (h1.length || h4.length || h6.length) {
                    topBar.css('margin-bottom', h + 'px');
                }
            } else {
                s.removeClass('stick');
                if (h1.length || h4.length || h6.length) {
                    topBar.css('margin-bottom', 0);
                }
            }
        }

    });


    /*----------------------------
      Product Count added spinner
    ------------------------------ */
    $('.spinner .btn:first-of-type').on('click', function() {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) + 1);
    });
    $('.spinner .btn:last-of-type').on('click', function() {
        $('.spinner input').val(parseInt($('.spinner input').val(), 10) - 1);
    });

    /*----------------------------
      Price range filter
    ------------------------------ */

    $(function() {
        var priceSlider = document.getElementById('price-range-filter');
        if (priceSlider) {
            noUiSlider.create(priceSlider, {
                start: [20, 80],
                connect: true,
                /*tooltips: true,*/
                range: {
                    'min': 0,
                    'max': 100
                },
                format: wNumb({
                    decimals: 0
                }),
            });
            var marginMin = document.getElementById('price-range-min'),
                marginMax = document.getElementById('price-range-max');

            priceSlider.noUiSlider.on('update', function(values, handle) {
                if (handle) {
                    marginMax.innerHTML = "$" + values[handle];
                } else {
                    marginMin.innerHTML = "$" + values[handle];
                }
            });
        }
    });

    /*-------------------------------------
     Google Map
     -------------------------------------*/
    if ($('#googleMap').length) {

        //Map initialize
        var initialize = function() {
            var mapOptions = {
                zoom: 15,
                scrollwheel: false,
                center: new google.maps.LatLng(-37.81618, 144.95692),
                styles: [{
                    stylers: [{
                        saturation: -100
                    }]
                }]
            };
            var map = new google.maps.Map(document.getElementById("googleMap"),
                mapOptions);
            var marker = new google.maps.Marker({
                position: map.getCenter(),
                animation: google.maps.Animation.BOUNCE,
                icon: 'img/map-marker.png',
                map: map
            });
        }

        // Add the map initialize function to the window load function
        google.maps.event.addDomListener(window, "load", initialize);
    }


})(jQuery);
