(function ($) {
    "use strict";
    // header search
    $('#search_btn').on('click', function (e) {
        e.preventDefault();
        $('body').css('overflow', 'hidden');

        $('.search-form-wrapper').addClass('active');
    });
    $('.search-close').on('click', function (e) {
        e.preventDefault();
        $('body').css('overflow', 'auto');
        $('.search-form-wrapper').removeClass('active');
    });

    window.onclick = function (e) {
        if (e.target.matches(".search-form-wrapper")) {
            $('.search-form-wrapper').removeClass('active');
        }
    }


    // mobile navigation
    $(".mobile-menu-toggle-btn, #offcanvas_btn").on("click", function () {
        $(".menu-sidebar-area").addClass("active");
        $(".body-overlay").addClass("active");
    });
    $(".menu-sidebar-close-btn").on("click", function () {
        $(".menu-sidebar-area").removeClass("active");
        $(".body-overlay").removeClass("active");
    });

    $(".body-overlay").on("click", function () {
        $(".menu-sidebar-area").removeClass("active");
        $(".body-overlay").removeClass("active");
    });
    // sticky header
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    if( height  > 1400 ) {
        const nav = $(".header-menu-area.sticky-header");
        let scrolled = false;
        $(window).scroll(function () {
            if (1 < $(window).scrollTop() && !scrolled) {
                nav
                    .addClass("sticky_menu animated fadeIn")
                    .animate({"margin-top": "0px"});
                scrolled = true;
            }
            if (1 > $(window).scrollTop() && scrolled) {
                nav.removeClass("sticky_menu animated fadeIn").css("margin-top", "0px");
                scrolled = false;
            }
        });
    }

    // partner logos
    $(".client-logo-slider-wrapper").slick({
        slidesToShow: 6,
        infinite: true,
        autoplay: true,
        draggable: true,
        arrows: false,
        slidesToScroll: 1,
        loop: true,
        dots: false,
        speed: 1500,
        rtl: false,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
            },
        },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
    // portfolio hover
    $('.portfolio-showscreen').each(function () {
        const item = $(this).find('.portfolio-card');
        const img = $(this).find('.tabimg');
        item.on('mouseenter', function () {
            const tab_id = $(this).attr('data-tab');
            item.removeClass('active');
            $(this).addClass('active');
            img.removeClass('active');
            $("#" + tab_id).addClass('active');
            if ($(this).hasClass('active')) {
                return false;
            }
        });
    });
    // jquery empty post content hide
    $('.blog-area .post-content p').filter(function () {
        return /\u00A0/.test($(this).text());
    }).hide();
    // skill progress bar js
    $('.skill-progress-card').one('inview', function (event, isInView) {
        $('.progress-inner').each(function () {
            $(this).find('.progress-content').animate({
                width: $(this).attr('data-percentage')
            }, 2000);

            $(this).find('.progress-number-count').animate({
                left: $(this).attr('data-percentage')
            }, {
                duration: 2000,
                step: function (now) {
                    let data = Math.round(now);
                    $(this).find('.progress-percent').html(data + '%');
                }
            });
        });
    });
    // slider
    $(".slider-wrapper").slick({
        slidesToShow: 1,
        infinite: true,
        autoplay: false,
        draggable: true,
        arrows: true,
        slidesToScroll: 1,
        loop: true,
        dots: true,
        speed: 1500,
        vertical: true,
        rtl: false,
        prevArrow: "<button type='button' class='prev-btn'><i class='fa-solid fa-arrow-left-long'></i></button>",
        nextArrow: "<button type='button' class='next-btn'><i class='fa-solid fa-arrow-right-long'></i></button>",

        responsive: [{
            breakpoint: 767,
            settings: {
                autoplay: true,
            },
        }, ],
    });
    $(".slider-wrapper-six").slick({
        slidesToShow: 1,
        infinite: true,
        autoplay: false,
        draggable: true,
        arrows: true,
        slidesToScroll: 1,
        loop: true,
        dots: false,
        speed: 1500,
        rtl: false,
        prevArrow: "<button type='button' class='prev-btn'><i class='fa-solid fa-arrow-left'></i></button>",
        nextArrow: "<button type='button' class='next-btn'><i class='fa-solid fa-arrow-right'></i></button>",
        responsive: [{
            breakpoint: 767,
            settings: {
                autoplay: false,
                arrows: false,
                dots: true,
            },
        }, ],
    });
    // info card slider
    $(".info-card-slider").slick({
        slidesToShow: 4,
        infinite: true,
        autoplay: true,
        draggable: true,
        arrows: true,
        prevArrow: "#info_prev_btn",
        nextArrow: "#info_next_btn",
        slidesToScroll: 1,
        loop: true,
        dots: false,
        speed: 1500,
        variableWidth: true,
        rtl: false,
        responsive: [{
            breakpoint: 1399,
            settings: {
                slidesToShow: 2,
                variableWidth: false,
            },
        },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                },
            },
        ],
    });
    // testimonial slider
    $("#testimonial_style_one").slick({
        slidesToShow: 1,
        infinite: true,
        autoplay: false,
        draggable: true,
        arrows: false,
        slidesToScroll: 1,
        loop: true,
        dots: true,
        variableWidth: false,
        speed: 1500,
        rtl: false,
    });
    // testimonial slider
    $("#testimonial_style_two").slick({
        slidesToShow: 3,
        infinite: true,
        autoplay: false,
        draggable: true,
        arrows: true,
        slidesToScroll: 1,
        loop: true,
        dots: false,
        speed: 1500,
        variableWidth: true,
        rtl: false,
        prevArrow: ".testimonial_two_prev_btn",
        nextArrow: ".testimonial_two_next_btn",
        responsive: [{
            breakpoint: 1399,
            settings: {
                slidesToShow: 2,
                variableWidth: false,
            },
        },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false
                },
            },
        ],
    });
    // project card slider
    $("#project_card_slider").slick({
        slidesToShow: 3,
        infinite: true,
        autoplay: true,
        draggable: true,
        arrows: false,
        slidesToScroll: 1,
        loop: true,
        dots: true,
        speed: 1500,
        rtl: false,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            },
        },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
    // feature slider js
    $(".feature-slider-wrapper").slick({
        slidesToShow: 3,
        infinite: true,
        autoplay: true,
        draggable: true,
        arrows: false,
        slidesToScroll: 1,
        centerMode: true,
        loop: true,
        dots: true,
        speed: 1500,
        rtl: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
            },
        },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    });
    // post card slider
    $(".post_card_slider").slick({
        slidesToShow: 2,
        infinite: true,
        autoplay: false,
        draggable: true,
        arrows: true,
        prevArrow: "#post_slider_prev_btn",
        nextArrow: "#post_slider_next_btn",
        slidesToScroll: 1,
        loop: true,
        dots: false,
        speed: 1500,
        rtl: false,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 2,
            },
        },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                },
            },
        ],
    });
    // related portfolio slider
    $("#related_portfolio").slick({
        slidesToShow: 3,
        infinite: true,
        autoplay: false,
        draggable: true,
        arrows: true,
        slidesToScroll: 1,
        loop: true,
        dots: false,
        speed: 1500,
        rtl: false,
        prevArrow: "<button type='button' class='portfolio-arrow-btn prev-btn'><i class='fa-solid fa-angle-left'></i></button>",
        nextArrow: "<button type='button' class='portfolio-arrow-btn next-btn'><i class='fa-solid fa-angle-right'></i></button>",
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
            },
        },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }).on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slides.width() + 'px');
    });
    // post gallery slider
    $(".post-gallery").slick({
        slidesToShow: 1,
        infinite: false,
        autoplay: false,
        draggable: false,
        arrows: false,
        slidesToScroll: 1,
        loop: false,
        dots: false,
        speed: 300,
        rtl: false,
        prevArrow: "<button type='button' class='post-gallery-btn prev-btn'><i class='fa fa-arrow-left'></i></button>",
        nextArrow: "<button type='button' class='post-gallery-btn next-btn'><i class='fa fa-arrow-right'></i></button>",
    });
    // portfolio logo slider
    $(".portfolio-slider").slick({
        slidesToShow: 2,
        infinite: true,
        autoplay: false,
        draggable: true,
        arrows: false,
        slidesToScroll: 1,
        variableWidth: true,
        loop: true,
        dots: false,
        speed: 1500,
        rtl: false,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 1,
                centerMode: true,
            },
        },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                    centerMode: false,
                },
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                    centerMode: false,
                },
            },
        ],
    });

    // team area slider
    $(".team-area-slider-wrapper").slick({
        slidesToShow: 4,
        infinite: true,
        autoplay: true,
        draggable: true,
        arrows: false,
        slidesToScroll: 1,
        loop: true,
        dots: false,
        speed: 1500,
        rtl: false,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
            },
        },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    });


    // brand marquee wrapper
    const swiper = new Swiper('.brand-marquee-slider', {
        loop: true,
        speed: 12000,
        slidesPerView: 6,
        autoplay: {
            delay: 0,
            pauseOnMouseEnter: false,        // stop autoplay when hovering
            disableOnInteraction: false,    // restart autoplay when hover is removed
            reverseDirection: true,         // reverse the autoplay direction
        },
        breakpoints: {
            1600: {
                slidesPerView: 6,
            },
            1300: {
                slidesPerView: 5,
            },
            1100: {
                slidesPerView: 4,
            },
            767: {
                slidesPerView: 3,
            },
            577: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        }
    })
    // counter js
    $(".counter").counterUp({
        delay: 10,
        time: 1000,
    });
    // magnific popup
    $(".video-play").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });
    // jquery wow js
    new WOW().init();
    // jquery nice select js
    $('select.select_option, select.wpcf7-select').niceSelect();
    // jquery tilt js
    $('.tilt-animate').tilt({
        maxTilt: 12,
        perspective: 1500,
    })


    // accordion init height
    const accordionEl = $(".accordion-box-wrapper");
    const accordionHeight = accordionEl.innerHeight();
    accordionEl.css("height", accordionHeight);

    // portfolio hover
    $('.portfolio-card-main-wrapper').each(function () {
        const item = $(this).find('.portfolio-card, .icon-card-inner');
        const img = $(this).find('.tabimg');
        item.on('mouseenter', function () {
            const tab_id = $(this).attr('data-tab');
            item.removeClass('active');
            $(this).addClass('active');
            img.removeClass('active');
            $("#" + tab_id).addClass('active');
            if ($(this).hasClass('active')) {
                return false;
            }
        });
    });
    // scroll to top js
    $(function () {
        $("#scrollTop").hide();
        var position = $(window).scrollTop();
        var timer;
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
            clearTimeout(timer);
            if (scrollTop > 100) {
                if (scrollTop > position) {
                    $('#scrollTop').fadeOut();
                } else {
                    $('#scrollTop').fadeIn();
                    timer = window.setTimeout(function () {
                        $("#scrollTop").fadeOut();
                    }, 3000);
                }
                position = scrollTop;
            } else {
                $('#scrollTop').fadeOut();
            }
        });
        $(".scrollup-btn").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    });
    // window load
    $(window).on("load", function () {
    // preeloader
        $("#preloader").fadeOut();
        $("#preloader-status").delay(0).fadeOut("slow");
        $("body").delay(200).css({
            "overflow-x": "hidden"
        });
    });

})(jQuery);
