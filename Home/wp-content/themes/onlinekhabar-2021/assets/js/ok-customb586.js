jQuery(document).ready(function ($) {

    $('.tab-nav span').on('click', function () {
        var clickedDataVal = $(this).attr('data-id');
        $(this).parents('.okv4-tab-generic').find('.tab-nav span').removeClass('active-nav');
        $(this).addClass('active-nav');
        $(this).parents('.tab-nav').next('.tab-content-wrap').find('.tab-container').hide();
        $('#' + clickedDataVal).fadeIn();
    });

    $('.menu').append(`<span class="close-menu">+</span>`);
    //mobile menu
    $('.mobile-menu-trigger').on('click', function (){
        $('.menu').addClass('reveal-menu');
    });

    $('body').on('click', '.close-menu', function (){
        $('.menu').removeClass('reveal-menu');
    });

    //Scroll horizontal on mousewheel
    if($(window).width() >= 768){
        $('.ok-story-cards-wrap, .testimonial-items-wrapper').on('wheel', function(e){
            if (!$(this).hasClass('flx-wrap')) {
                var $this = $(this);
                var scrollLeft = $this.scrollLeft();
                var maxScrollLeft = this.scrollWidth - $this.width();

                if ((scrollLeft >= maxScrollLeft && e.originalEvent.deltaY > 0) || (scrollLeft <= 0 && e.originalEvent.deltaY < 0)) {
                    // If scrolled to the end in either direction, or scrolled to the start in the opposite direction
                    return true; // Allow default scrolling behavior
                }
                e.preventDefault();
                $this.scrollLeft(scrollLeft + e.originalEvent.deltaY);
            }
        });
    }

    $('.elem-wrapper, .ok-story-cards-wrap, .carousel-wrapper').on('wheel', function(e){
        var $this = $(this);
        var scrollLeft = $this.scrollLeft();
        var maxScrollLeft = this.scrollWidth - $this.width();

        if ((scrollLeft >= maxScrollLeft && e.originalEvent.deltaY > 0) || (scrollLeft <= 0 && e.originalEvent.deltaY < 0)) {
            // If scrolled to the end in either direction, or scrolled to the start in the opposite direction
            return true; // Allow default scrolling behavior
        }
        e.preventDefault();
        $this.scrollLeft(scrollLeft + e.originalEvent.deltaY);
    });

    $('.primary-menu-trigger').on('click', function (){
        $('.ok-prime-menu').addClass('reveal-prime-menu');
    });
    $('.ok-collpse-sidemenu').on('click', function (){
        $('.ok-prime-menu').removeClass('reveal-prime-menu');
    });

    $('.expand-text-btn').on('click', function(){
        $(this).prev('.partial-text').toggleClass('normal-para');
    });





    //####### Custom Carousel ###
    $('.carousel-btn.prev').click(function() {
        let goPro = '';
        const wrapper = $(this).siblings('.carousel-wrapper');
        const cardWidth = wrapper.find('.carousel-item').outerWidth();
        let currentIndex = Math.max(Math.floor(wrapper.scrollLeft() / cardWidth) - 1, 0);
        let scrollPosition = currentIndex * cardWidth;
        wrapper.animate({ scrollLeft: scrollPosition }, 'slow');
        updateArrows(wrapper, currentIndex);
    });

    $('.carousel-btn.next').click(function() {
        const wrapper = $(this).siblings('.carousel-wrapper');
        const cardWidth = wrapper.find('.carousel-item').outerWidth();
        let currentIndex = Math.min(Math.floor(wrapper.scrollLeft() / cardWidth) + 1, wrapper.find('.carousel-item').length - 1);
        wrapper.animate({ scrollLeft: currentIndex * cardWidth }, 'slow');
        updateArrows(wrapper, currentIndex);
    });

    $('.q-f-cards-wrapper').scroll(function() {
        const wrapper = $(this);
        const currentIndex = Math.floor(wrapper.scrollLeft() / wrapper.find('.carousel-item').outerWidth());
        updateArrows(wrapper, currentIndex);
    });

    function updateArrows(wrapper, currentIndex) {
        const prevBtn = wrapper.siblings('.carousel-btn.prev');
        const nextBtn = wrapper.siblings('.carousel-btn.next');

        prevBtn.toggleClass('hidden', currentIndex === 0);
        nextBtn.toggleClass('hidden', currentIndex === wrapper.find('.carousel-item').length - 1);
    }
    //##########################

    //capsule -tab
    $('.capsule-tab-nav-item').on('click', function (){
        let getClictedId = $(this).attr('data-id');
        $(this).parents('.capsule-tab-nav').find('.capsule-tab-nav-item').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.capsule-tab-nav').next('.capsule-tab-container').find('.capsule-tab-item').hide();
        $('#' + getClictedId).fadeIn();
    });

    //Line Tab
    $('.line-tab-nav .line-tab-nav-item').on('click', function (){
        let getClictedId = $(this).attr('data-id');
        $(this).parents('.line-tab-nav').find('.line-tab-nav-item').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.line-tab-nav').next('.line-tab-container').find('.line-tab-tab-content').hide();
        $('#' + getClictedId).fadeIn();
    });

    //Generic OWL Carousel ###########
    $('#owlGeneric').owlCarousel({
        loop: true,
        dots: false,
        margin: 14,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoHeight: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });

    $('#tournamentInner').owlCarousel({
        loop: true,
        dots: false,
        margin: 14,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoHeight: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    });

    //####### ENDS

    //###################################### count paragraphs and display rightbar items

    if($('.right_related_sticky').length > 0){
        $(document).scroll(function (){
            let scrolled = $(document).scrollTop();
            let bannerHeight = $('.mag-banner').outerHeight();
            let numberOfParagraph = $('.content_p_wrapper').find('p').siblings('p').length;
            console.log(numberOfParagraph) //24 items
            let rightbarBreaker1 = 0;
            let rightbarBreaker2 = 0;
            let rightbarBreaker3 = 0;

            if (numberOfParagraph >= 6) {
                let firstFourParagraphs = $('.content_p_wrapper').find('p').siblings('p').slice(0, 5);
                firstFourParagraphs.each(function() {
                    rightbarBreaker1 += $(this).outerHeight();
                });
            }

            if (numberOfParagraph >= 13) {
                let firstFourParagraphs = $('.content_p_wrapper').find('p').siblings('p').slice(6, 12);
                firstFourParagraphs.each(function() {
                    rightbarBreaker2 += $(this).outerHeight();
                });
            }

            if (numberOfParagraph >= 24) {
                let firstFourParagraphs = $('.content_p_wrapper').find('p').siblings('p').slice(14, 23);
                firstFourParagraphs.each(function() {
                    rightbarBreaker3 += $(this).outerHeight();
                });
            }

            let scrolledItem = rightbarBreaker1 + bannerHeight + 100;
            let maxScrolledItem = rightbarBreaker1 + bannerHeight + 1800;
            let maxScrolledItem2 = maxScrolledItem + rightbarBreaker2 + 200;
            let maxScrolledItem3 = maxScrolledItem2 + rightbarBreaker3 + 200;

            if (scrolled > scrolledItem && scrolled <= maxScrolledItem) {
                $('.related-story').fadeIn();
            } else {
                $('.related-story').fadeOut();
            }

            if (scrolled > maxScrolledItem && scrolled <= maxScrolledItem2) {
                $('.right_blocquote').fadeIn();
            } else {
                $('.right_blocquote').fadeOut();
            }

            if (scrolled > maxScrolledItem2) {
                $('.reel_holder').fadeIn();
            } else {
                $('.reel_holder').fadeOut();
            }

        });
    }

    //########################## Progress Bar
    if($('.circle_progress').length > 0){
        const block = document.querySelectorAll('.circle_progress');
        window.addEventListener('load', function(){
            block.forEach(item => {
                let setNum = item.querySelector('.num');
                let numElement = item.querySelector('.num').getAttribute('data-completed');
                let num = numElement;
                let count = 0;
                let time = 1000 / num;
                let circle = item.querySelector('.circle');
                setInterval(() => {
                    if(count == num){
                        clearInterval();
                    } else {
                        count += 1;
                        setNum.innerText = count;
                    }
                }, time)
                circle.style.strokeDashoffset
                    = 503 - ( 503 * ( num / 100 ));
                let dots = item.querySelector('.dots');
                dots.style.transform =
                    `rotate(${360 * (num / 100)}deg)`;
                if(num == 100){
                    dots.style.opacity = 0;
                }
            })
        });
    }


});


