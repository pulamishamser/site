function englishToNepali(number) {
    if (!number) {
        return '';
    }
    let nepaliNumberss = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    const numberToConvert = number.toString().split('');

    let result = numberToConvert.map((num, i) => {
        return nepaliNumberss[i, num];
    });

    return result.join('');
}
function ok18_setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function ok18_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function ok18_is_url(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}
const isDevice = {
    android() {
        return /Android/i.test(navigator.userAgent);
    },
    iOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
};
jQuery(document).ready(function ($) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    if ($('.current-time-tag').length > 0) {
        $('.current-time-tag').html(time);
    }



    function loadLtr() {
        var mobileDevice = $(window).width();
        if (mobileDevice <= 767) {
            $('.ok-section-khelkud .span-4 .ok-news-post').removeClass('ok-post-overlay');
            $('.ok-section-khelkud .span-4 .ok-news-post').addClass('ok-post-ltr');
            $('.ok-section-khelkud .span-4 .ok-post-ltr').css({
                'margin-top': '20px',
                'border-bottom': 'solid 1px rgba(255,255,255,.18)'
            });

            $('.chutaunu-vayo-ki .span-3 .ok-news-post').removeClass('ok-post-overlay');
            $('.chutaunu-vayo-ki .span-3 .ok-news-post').addClass('ok-post-ltr');

            $('.sport-misc .span-3 .ok-news-post').removeClass('ok-card-post');
            $('.sport-misc .span-3 .ok-news-post').addClass('ok-post-ltr');

            $('.health-news .span-4 .ok-news-post').removeClass('ok-post-overlay');
            $('.health-news .span-4 .ok-news-post').addClass('ok-post-ltr');

            $('.ok-entertainment-taja-news .span-4 .ok-news-post').removeClass('ok-post-overlay');
            $('.ok-entertainment-taja-news .span-4 .ok-news-post').addClass('ok-post-ltr');

            $('.ok-khelkud-samachar .span-4 .ok-news-post').removeClass('ok-post-overlay');
            $('.ok-khelkud-samachar .span-4 .ok-news-post').addClass('ok-post-ltr');

            $('.ok-section-pradesh-samachar .ok-grid-12 .span-4 .ok-news-post').addClass('ok-post-ltr');

            $('.ok-category-section .ok-grid-12 .span-4 .ok-news-post').addClass('ok-post-ltr');
            $('.ok-category-section .ok-grid-12 .span-4:nth-child(5n) .ok-news-post').removeClass('ok-post-ltr');
            $('.ok-category-section .ok-grid-12 .span-4:nth-child(5n) .ok-news-post .ok-post-thumb').css({
                'height': '300px',
                'border-radius': '0'
            });
            $('.ok-category-section .ok-grid-12 .span-4:nth-child(5n) .ok-news-post .ok-post-content-wrap').css({
                'padding': '0 20px'
            });
        }
    }

    //Tabs
    $('.tab-nav-item').on('click', function (e) {
        var getId = $(this).attr('data-id');
        $(this).parents('.tab-nav').find('.tab-nav-item').removeClass('active-nav');
        $(this).addClass('active-nav');
        $(this).parents('.has-tab-nav').next('.tab-container').find('.tab-content').hide();
        $(this).parents('.tab-nav').next('.tab-container').find('.tab-content').hide();
        $('#' + getId).fadeIn();
        if (getId == 'comentry') {

            setTimeout(function () {
                $('#comentry-1-inning').show();
            }, 1000);
            $('.okcm-inning-tab').parent().show();
            e.stopPropagation();
        } else {
            $('.okcm-inning-tab').parent().hide();
        }
    });

    $('.tab-nav-item').on('click', function () {
        var getId = $(this).attr('data-id');
        $(this).parents('.ok-sport-tab-nav').find('.tab-nav-item').removeClass('active-nav');
        $(this).addClass('active-nav');
        $(this).parents('.ok-sport-tab-nav').next('.ok-sport-tab-content-wrap').find('.ok-sport-tab-content').hide();
        $('#' + getId).fadeIn();
    });

    //ODI tab
    $('.odi-tab-nav-item').on('click', function () {
        var getId = $(this).attr('data-id');
        $('.odi-tab-nav-item').removeClass('active-tab');
        $(this).addClass('active-tab');
        $(this).parents('.odi-tab').find('.odi-tab-content').hide();
        $('#' + getId).fadeIn();
    });

    //Expand partially shown text==========
    $('.expand-reading').on('click', function () {
        var btnVal = $('.expand-reading').text();
        $(this).parent('.partial-texts').toggleClass('read-full');
        $(this).toggleClass('pos-static');
        $(this).text((btnVal === 'Read Full') ? 'Collapse' : 'Read Full')
    })

    $('.nav-item').on('click', function () {
        var getId = $(this).attr('data-id');
        $(this).parents('.score-card-tab-nav').find('.nav-item').removeClass('active-nav');
        $(this).addClass('active-nav');
        $(this).parents('.score-detail-card-head').siblings('.score-card-tab-content').hide();
        $('#' + getId).fadeIn();
    });

    // generic tab right bar
    $('.oks-tab-nav-item').on('click', function () {
        var getId = $(this).attr('data-id');
        $(this).parent('.oks-tab-navs').find('.oks-tab-nav-item').removeClass('active-tab');
        $(this).addClass('active-tab');
        $(this).parent('.oks-tab-navs').next('.oks-tab-container').find('.oks-tab-item').hide();
        $('#' + getId).fadeIn();
    });

    $('.fill').each(function () {
        var fillWidth = $(this).attr('bar-fill');
        $(this).css({
            'width': fillWidth
        });
    });


    var mobileDevice = $(window).width();
    if (mobileDevice <= 767) {
        $('.ok-section-khelkud .span-4 .ok-news-post').removeClass('ok-post-overlay');
        $('.ok-section-khelkud .span-4 .ok-news-post').addClass('ok-post-ltr');
        $('.ok-section-khelkud .span-4 .ok-post-ltr').css({
            'margin-top': '20px',
            'border-bottom': 'solid 1px rgba(255,255,255,.18)'
        });

        $('.chutaunu-vayo-ki .span-3 .ok-news-post').removeClass('ok-post-overlay');
        $('.chutaunu-vayo-ki .span-3 .ok-news-post').addClass('ok-post-ltr');

        $('.sport-misc .span-3 .ok-news-post').removeClass('ok-card-post');
        $('.sport-misc .span-3 .ok-news-post').addClass('ok-post-ltr');

        $('.health-news .span-4 .ok-news-post').removeClass('ok-post-overlay');
        $('.health-news .span-4 .ok-news-post').addClass('ok-post-ltr');

        $('.ok-entertainment-taja-news .span-4 .ok-news-post').removeClass('ok-post-overlay');
        $('.ok-entertainment-taja-news .span-4 .ok-news-post').addClass('ok-post-ltr');

        $('.ok-khelkud-samachar .span-4 .ok-news-post').removeClass('ok-post-overlay');
        $('.ok-khelkud-samachar .span-4 .ok-news-post').addClass('ok-post-ltr');

        $('.ok-section-pradesh-samachar .ok-grid-12 .span-4 .ok-news-post').addClass('ok-post-ltr');

        $('.ok-category-section .ok-grid-12 .span-4 .ok-news-post').addClass('ok-post-ltr');
        $('.ok-category-section .ok-grid-12 .span-4:nth-child(5n) .ok-news-post').removeClass('ok-post-ltr');
        $('.ok-category-section .ok-grid-12 .span-4:nth-child(5n) .ok-news-post .ok-post-thumb').css({
            'height': '300px',
            'border-radius': '0'
        });
        $('.ok-category-section .ok-grid-12 .span-4:nth-child(5n) .ok-news-post .ok-post-content-wrap').css({
            'padding': '0 20px'
        });
    }

    //Top add expose
    setTimeout(function () {
        $('.ok-top-push-adv').slideDown(200);
    }, 500);
    //Carousels
    var carousels = $('#pradesh-carousel, #video-carousel, #suchana-prabidhi, #jiwan-saili-carousel, #magagine-carousel, #model-carousel');
    carousels.owlCarousel({
        loop: false,
        dots: false,
        margin: 30,
        nav: true,
        autoHeight: true,
        autoHeightClass: 'owl-height',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    //Fixtures Carousels
    var carousels = $('.fixturesCards');
    carousels.owlCarousel({
        loop: false,
        dots: false,
        margin: 5,
        nav: true,
        autoHeight: true,
        autoHeightClass: 'owl-height',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    $('#featured-carousel').owlCarousel({
        loop: true,
        dots: false,
        margin: 30,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoHeight: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    $('#nhFeat').owlCarousel({
        loop: false,
        dots: false,
        margin: 10,
        nav: true,
        autoplay: false,

        responsive: {
            0: {
                items: 1,
                center: true
            },
            600: {
                items: 2,
                center: false
            },
            1000: {
                items: 3
            }
        }
    });

    $('#nicCampaign').owlCarousel({
        loop: false,
        dots: false,
        margin: 40,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoHeight: true,
        responsive: {
            0: {
                items: 1,
                margin: 20,
            },
            600: {
                items: 2,
                margin: 30,
            },
            1000: {
                items: 3
            }
        }
    });

    $('#authorCarousel').owlCarousel({
        loop: true,
        dots: false,
        margin: 30,
        nav: true,
        autoplay: false,
        autoHeight: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 4
            },
            1000: {
                items: 8
            }
        }
    });

    $('.trigger-login-box').on('click', function (e) {
        e.preventDefault();
        $('.ok-conv-login-for-new').slideDown();
    });

    $('.ok-signup-trigger').on('click', function () {
        $('.ok-signup-form').fadeIn();
        $('.ok-login-form').fadeOut();
    });

    $('.ok-login-trigger').on('click', function () {
        $('.ok-login-form').fadeIn();
    });


    $('.ok-close-pop').on('click', function () {
        $(this).parents('.ok-signup-form').fadeOut();
        $(this).parents('.ok-login-form').fadeOut();
    });

    $('.close-overlap-adv').on('click', function () {
        $(this).parent('.ok-overlap-adv').addClass('push-to-bottom');
        $(this).addClass('close-adv');
    });

    $('.close-small-adv').on('click', function () {
        var media = $("#adVid").get(0);
        media.pause();
        media.currentTime = 0;
        $(this).parent('.ok-overlap-adv').hide();
    });

    $('.unmute-btn').on('click', function () {
        $("video").prop('muted', false);
        $(this).fadeOut();
        $('.mute-btn').css({ 'display': 'block' });
    });

    $('.mute-btn').on('click', function () {
        $("video").prop('muted', true);
        $(this).fadeOut();
        $('.unmute-btn').css({ 'display': 'block' });
    });

    $('body').on('click', '.user-profile-trigger', function () {
        $('.oum-profile-wrap').css({ 'right': '0' })
    });

    $('body').on('click', '.oum-popup-close', function () {
        $('.oum-profile-wrap').css({ 'right': '-408px' })
    });

    if ($('.ok-nav').length > 0) {
        $(document).scroll(function () {
            let navTopPos = $('.ok-nav').position().top;
            let scrolledVal = $(window).scrollTop();
            if (scrolledVal >= navTopPos) {
                $('.ok-nav').addClass('sticky-nav');
            } else {
                $('.ok-nav').removeClass('sticky-nav');
            }
        });
    }

    $('.ok-nav ul li:last-child').on('click', function () {
        $('.ok-trending-mega-menu').toggleClass('expand-trending');
    });

    /**
     * Comments Migration
     */

    $('.ok-push-menu-trigger').on('click', function () {
        $('.ok-sidemenu').addClass('reveal-ok-sidemenu');
    });

    $('.ok-mob-search-trigger').on('click', function () {
        $('.ok-mob-search-pannel').addClass('reveal-ok-sidemenu');
    });

    $('.ok-collpse-sidemenu').on('click', function () {
        $('.ok-sidemenu').removeClass('reveal-ok-sidemenu');
        $('.ok-mob-search-pannel').removeClass('reveal-ok-sidemenu');
    });

    $('body').on('click', '.ok18-comment-submit-trigger', function () {
        $(this).closest('form').submit();
    });

    var whiteLogoPath = 'https://www.onlinekhabar.com/wp-content/themes/onlinekhabar-2021/img/logo-white.png';
    //Business page tempalte header
    if ($('.page-template-template-business').length > 0) {
        $('.page-template-template-business .site-header .ok-logo-wrap a > img').attr('src', whiteLogoPath);
        var catPageTitle = '<h2>विजनेस</h2>';
        $('.site-header .ok-logo-wrap').append(catPageTitle);
    }

    //Finance page tempalte header
    if ($('.page-template-template-finance').length > 0) {
        $('.page-template-template-finance .site-header .ok-logo-wrap a > img').attr('src', whiteLogoPath);
        var catPageTitle = '<h2>बैंकिङ शिक्षा</h2>';
        $('.site-header .ok-logo-wrap').append(catPageTitle);
    }

    //Lifestyle page tempalte header
    if ($('.page-template-template-lifestyle').length > 0) {
        $('.page-template-template-lifestyle .site-header .ok-logo-wrap a > img').attr('src', whiteLogoPath);
        var catPageTitle = '<h2>जीवनशैली</h2>';
        $('.site-header .ok-logo-wrap').append(catPageTitle);
    }

    //Entertainment page tempalte header
    if ($('.page-template-template-entertainment').length > 0) {
        $('.page-template-template-entertainment .site-header .ok-logo-wrap a > img').attr('src', whiteLogoPath);
        var catPageTitle = '<h2>मनोरन्जन</h2>';
        $('.site-header .ok-logo-wrap').append(catPageTitle);
    }

    //Bichar page tempalte header
    if ($('.page-template-template-bichar').length > 0) {
        $('.page-template-template-bichar .site-header .ok-logo-wrap a > img').attr('src', whiteLogoPath);
        var catPageTitle = '<h2>विचार</h2>';
        $('.site-header .ok-logo-wrap').append(catPageTitle);
    }

    //Sport page header
    if ($('.page-template-template-sport').length > 0) {
        $('.page-template-template-sport .site-header .ok-logo-wrap a > img').attr('src', whiteLogoPath);
        var catPageTitle = '<h2>खेलकुद</h2>';
        $('.site-header .ok-logo-wrap').append(catPageTitle);
    }

    //worldcup page header
    if ($('.page-template-template-world-cup-022').length > 0) {
        $('.page-template-template-world-cup-022 .site-header .ok-logo-wrap a > img').attr('src', whiteLogoPath);
        var catPageTitle = '<h2>विश्वकप</h2>';
        $('.site-header .ok-logo-wrap').append(catPageTitle);
    }

    //get top position

    if ($('.ok-post-header-container').length > 0) {
        $(window).scroll(function () {
            var postTitleTop = $('.ok-post-header-container').offset().top - 80;
            var scrollWindow = $(window).scrollTop();
            if ($(window).width() > 767) {

                if (scrollWindow >= postTitleTop) {
                    $('.ok-post-header-container').addClass('ok-stick-heading');
                    $('.ok-post-header-container').css({
                        'top': '60px'
                    });
                } else {
                    $('.ok-post-header-container').removeClass('ok-stick-heading');
                    $('.ok-post-header-container').css({
                        'top': '0'
                    });
                }
            }
        });
    }

    $('span.fill').each(function () {
        var statVal = $(this).attr('data-stat');
        $(this).css({
            'width': statVal + '%'
        })
    });

    $('body').on('submit', '.ok18-comment-form', function (e) {
        e.preventDefault();
        var form_data = $(this).serialize();
        var selector = $(this);
        $.ajax({
            type: 'post',
            url: ok18_frontend_script_obj.ajax_url,
            data: {
                action: 'ok18_comment_action',
                _wpnonce: ok18_frontend_script_obj.ajax_nonce,
                form_data: form_data
            },
            beforeSend: function (xhr) {
                selector.find('.ok18-ajax-loader').show();
                selector.find('.ok18-comment-response').slideUp(500);
            },
            success: function (response) {
                selector.find('.ok18-ajax-loader').hide();
                response = $.parseJSON(response);
                if (response.success && response.success == 1) {
                    selector.find('.ok18-comment-response').removeClass('.ok18-error').addClass('ok18-success').html('Comment submitted successfully.').slideDown(500);
                    selector.trigger('reset');
                } else {
                    selector.find('.ok18-comment-response').removeClass('.ok18-success').addClass('ok18-error').html('Please enter all the details properly and resubmit again.').slideDown(500);
                }
            }
        });
        //        console.log(form_data);

    });
    $('body').on('click', '.ok-comment-report-trigger', function () {
        var comment_id = $(this).data('comment-id');
        var report_comment_cookie = ok18_getCookie('ok18_' + comment_id);
        if (report_comment_cookie == '') {
            $.ajax({
                type: 'post',
                url: ok18_frontend_script_obj.ajax_url,
                data: {
                    action: 'ok18_report_comment_action',
                    _wpnonce: ok18_frontend_script_obj.ajax_nonce,
                    comment_id: comment_id
                },
                beforeSend: function (xhr) {

                },
                success: function (response) {

                    if (response == 'success') {

                        alert('Comment has been reported');
                        var cookie_name = 'ok18_' + comment_id;
                        ok18_setCookie(cookie_name, 1, 365);
                    }
                }
            });
        } else {

        }
    });
    $('body').on('click', '.ok-comment-replies-trigger', function () {
        var comment_id = $(this).data('comment-id');
        var selector = $(this);
        if (selector.closest('.ok18-main-comment-wrap').find('.ok18-comment-replies-wrap').html() == '') {
            $.ajax({
                type: 'post',
                url: ok18_frontend_script_obj.ajax_url,
                data: {
                    action: 'ok18_comment_replies_action',
                    _wpnonce: ok18_frontend_script_obj.ajax_nonce,
                    comment_id: comment_id

                },
                beforeSend: function (xhr) {
                    selector.parent().find('.ok18-ajax-loader').show();
                },
                success: function (res) {
                    selector.parent().find('.ok18-ajax-loader').hide();
                    selector.closest('.ok18-main-comment-wrap').find('.ok18-comment-replies-wrap').html(res);
                }
            });
        } else {
            selector.closest('.ok18-main-comment-wrap').find('.ok18-comment-replies-wrap').slideDown(500);
        }
    });
    $('body').on('click', '.ok18-hide-replies', function () {
        $(this).parent().slideUp(500);
    });
    $('body').on('click', '.ok18-comment-form-ref', function () {
        // alert($('.Post__feedback').offset().top);
        $('#ok18-reply-form-tab-trigger').click();
        $('html,body').animate({
            //scrollTop: $('#ok18-reply-form-tab-trigger').offset().top
            scrollTop: $('.ok18-comment-wrap').offset().top
        }, 500);
    });

    $('body').on('click', '.ok-comment-reply-form-trigger', function () {
        $(this).closest('.ok18-main-comment-outer-wrap').find('.ok18-comment-reply-form-wrap').show();
    });
    $('body').on('click', '.ok18-comment-reply-close', function () {
        $(this).parent().hide();
    });
    //list view /grid view


    //Ward Tab==============
    $('body').on('click', '.el-tab-nav span', function () {
        var activeTabNav = $(this).attr('data-id');
        $('.el-tab-nav span').removeClass('active');
        $(this).addClass('active');
        $('.el-tab-container').hide();
        $('#' + activeTabNav).fadeIn();
    });

    //Top add expose
    setTimeout(function () {
        $('.ok-top-push-adv').slideDown(200);
    }, 500);


    //Trigger trending drawer
    $('.trending-trigger').on('click', function () {
        $('.ok-trending-drawer').addClass('reveal-right-drawer');
        $('body').addClass('fade-layer');
        $('div:not(.ok-slide-trending, .ok-slide-trending div)').addClass('blur');
    });

    $('.ok-user-trigger').on('click', function () {
        $('.ok-user-drawer').addClass('reveal-right-drawer');
        $('body').addClass('fade-layer');
        $('div:not(.ok-slide-profile, .ok-slide-profile div)').addClass('blur');
    });

    $('.latest-trigger').on('click', function () {
        $('.ok-latest-updates-drawer').addClass('reveal-right-drawer');
        $('body').addClass('fade-layer');
        $('div:not(.ok-slide-trending, .ok-slide-trending div)').addClass('blur');
    });

    $('.close-drawer').on('click', function () {
        $('.ok-trending-drawer').removeClass('reveal-right-drawer');
        $('.ok-latest-updates-drawer').removeClass('reveal-right-drawer');
        $('.ok-user-drawer').removeClass('reveal-right-drawer');
        $('body').removeClass('fade-layer');
        $('div').removeClass('blur');
    });

    $('.close-box-adv').on('click', function () {
        $(this).parents('.carousel').hide();
    });




    /**
     * Popular post ajax
     */
    $('.ok18-detail-popular').click(function () {
        var selector = $(this);
        $('.ok18-detail-popular').removeClass('ok18-popular-active');
        $(this).addClass('ok18-popular-active');
        var duration = $(this).data('popular-duration');
        $.ajax({
            type: 'get',
            url: ok18_frontend_script_obj.ajax_url,
            data: {
                action: 'ok18_detail_popular_action',
                _wpnonce: ok18_frontend_script_obj.ajax_nonce,
                duration: duration
            },
            beforeSend: function (xhr) {
                selector.closest('.ok18-lokpriye-wrap').find('.ok18-ajax-loader').show();
            },
            success: function (res) {
                selector.closest('.ok18-lokpriye-wrap').find('.ok18-ajax-loader').hide();
                selector.closest('.ok18-lokpriye-wrap').find('.ok18-lokpriye-posts-wrap').html(res);
            }
        });
    });

    $('.latest-healt-tags').on('wheel', function (e) {
        if (!$(this).hasClass('flx-wrap')) {
            e.preventDefault();
            $(this).scrollLeft($(this).scrollLeft() + e.originalEvent.deltaY);
        }
    });

    /**
     * Emoji actions
     */
    $('body').on('click', '.ok18-emoji-trigger', function () {
        var emoji_name = $(this).data('emoji');
        var post_id = $(this).data('post-id');
        var emoji_count = $(this).data('emoji-count');
        var cookie_check = 'ok_emoji_' + post_id;
        if (ok18_getCookie(cookie_check) == '') {
            ok18_setCookie(cookie_check, 1);
            $.ajax({
                type: 'post',
                url: ok18_frontend_script_obj.ajax_url,
                data: {
                    action: 'ok18_emoji_action',
                    _wpnonce: ok18_frontend_script_obj.ajax_nonce,
                    post_id: post_id,
                    emoji_name: emoji_name
                },
                beforeSend: function (xhr) {
                },
                success: function (res) {
                    res = $.parseJSON(res);
                    if (res.status == 200) {
                        var reactions = res.reactions;
                        var reaction_name;
                        for (reaction_name in reactions) {
                            $('.ok18-emoji-' + reaction_name + '-per').html(reactions[reaction_name] + '%');
                        }
                    }

                }
            });
        }

    });

    /**
     * In between content append
     */
    if ($('.ok18-related-posts-wrap').length > 0) {
        var related_posts = $('.ok18-related-posts-wrap').html();
        if (related_posts != '') {
            var p_count = 0;
            $('.ok18-single-post-content-wrap p').each(function () {
                p_count++;
                if (p_count == 3) {
                    $(this).after(related_posts);
                }
            });
        }
    }



    /**
     * Comments load more
     */
    $('body').on('click', '.ok18-comment-load-more', function (e) {
        var offset = $(this).data('offset');
        var post_id = $(this).data('post-id');
        var selector = $(this);
        $.ajax({
            type: 'get',
            url: ok18_frontend_script_obj.ajax_url,
            data: {
                action: 'ok18_comments_load_action',
                _wpnonce: ok18_frontend_script_obj.ajax_nonce,
                post_id: post_id,
                offset: offset
            },
            beforeSend: function (xhr) {
                selector.next('.ok18-ajax-loader').show();
            },
            success: function (res) {
                selector.next('.ok18-ajax-loader').hide();
                if (!(res == 'empty' || res == 0)) {
                    offset = parseInt(offset) + 20;
                    selector.data('offset', offset);
                    $('.ok18-comments-list-wrap').append(res);
                } else {
                    selector.remove();
                }

            }
        });
    });
    /**
     * Roadblock skip
     */
    $('body').on('click', '.ok_roadblok_skip', function () {
        $('.ok_roadblock').fadeOut(1000);
    });
    if ($('.ok_roadblok_skip').length > 0) {
        setTimeout(function () {
            $('.ok_roadblock').fadeOut(1000);
        }, 10000);
    }

    /**
     *  Comment box open if comment count is 0
     */
    if ($('.ok-comment-count').length > 0) {
        var comment_count = $('.ok-comment-count').html();
        if (comment_count == '0') {
            $('#ok18-reply-form-tab-trigger').click();
        }
    }

    /**
     * 
     */
    $('#primary-menu .menu-item a').click(function () {
        if ($(this).attr('href')) {
            var href = $(this).attr('href');
            if (ok18_is_url(href)) {
                var menu_label = $(this).html();
                gtag('event', menu_label, { 'event_category': 'MenuClick', 'event_label': menu_label })
                console.log(menu_label);
            }
        }
    });

    if ($('#ok18-main-post-id').length > 0) {
        var post_id = $('#ok18-main-post-id').val();

        /**
         * Emoji Fetch
         */
        var emoji_template = wp.template('emoji-template');
        var emoji_api_url = ok18_frontend_script_obj.api_url + 'emoji/' + post_id;
        $.ajax({
            type: 'get',
            url: emoji_api_url,
            beforeSend: function (xhr) {

            },
            success: function (res) {
                $('.ok-post-emoji-append').html(emoji_template(res.data));
            }
        });

        /*
         * Comments ajax fetch 
         */
        var comment_template = wp.template('comment-template');

        var limit = (isMobile) ? 10 : 50;
        var offset = 0;
        var comments_api_url = ok18_frontend_script_obj.api_url + 'comments/' + post_id + '/0';
        var popular_url = ok18_frontend_script_obj.api_url + 'comments/popular/' + post_id;
        // console.log(ok18_frontend_script_obj.api_url + 'comments/' + post_id + '/0', );
        $.ajax({
            type: 'get',
            url: comments_api_url,
            data: {
                limit: limit,
                offset: offset
            },
            beforeSend: function (xhr) {

            },
            success: function (res) {
                $('#tab-1').html(comment_template(res.data));
                $('.ok18-hidden-comments').html(comment_template(res.data));
                $('.ok18-comments-count').html(res.total_comments);
                if (res.total_comments == 0) {
                    $('#ok18-reply-form-tab-trigger').click();
                }
            }
        });
        $.ajax({
            type: 'get',
            url: popular_url,
            success: function (res) {
                $('#tab-2').html(comment_template(res.data));
            }
        });

        if ($('.ok18-comment-load-more').length > 0) {
            if (isMobile) {
                $('.ok18-comment-load-more').attr('data-offset', 10);
            }
        }


    }
    if ($('.ok18-date-holder').length > 0) {
        var today = $('.ok18-date-holder').data('today');
        if (today != '') {
            var url = ok18_frontend_script_obj.api_url + 'today' + '?today=' + today;
        } else {
            var url = ok18_frontend_script_obj.api_url + 'today';
        }
        $.ajax({
            type: 'get',
            url: url,
            success: function (res) {
                if (res.status == 200) {
                    $('.ok18-date-holder').html(res.data);
                    $('.ok18-data-holder-sticky').html(res.data);
                }
            }
        });
    }

    $('.ok18-most-commented').each(function () {
        var selector = $(this);
        var limit = $(this).data('limit');
        var most_commented_api_url = ok18_frontend_script_obj.api_url + 'most_commented';
        var template = $(this).data('template');
        var most_commented_template = wp.template(template);

        $.ajax({
            type: 'get',
            url: most_commented_api_url,
            data: {
                limit: limit

            },
            beforeSend: function (xhr) {

            },
            success: function (res) {
                selector.html(most_commented_template(res.data));

            }
        });

    });

    //Close footer fixed ad
    $('.close-ad').off().on('click', function () {
        $(this).parent('.footer-absolute').fadeOut();
    });
    if ($('.okc-question').length > 0) {
        $('.okc-question').each(function () {
            if ($(this).html() == '') {
                $(this).closest('.okc-captcha-wrap').find('.okc-captcha-reload').click();
            }
        });
    }

    //Header push adv
    $('.expand-adv').on('click', function () {
        $(this).fadeOut();
        $('.expanded').slideDown();
        $('.shrinked-img').fadeOut();
        setTimeout(function () {
            $('.expand-adv').css({ 'display': 'inline-block' });
            $('.expanded').slideUp();
            $('.shrinked-img').fadeIn();
        }, 5000);
    });

    setTimeout(function () {
        $('.expand-adv').css({ 'display': 'inline-block' });
        $('.expanded').slideUp();
        $('.shrinked-img').fadeIn();
    }, 5000);

    $('.ok18-single-post-content-wrap table').each(function () {
        $(this).wrap("<div class='responsive-table-wrap'></div>");
    });

    /**
     * Go to all comments section
     */
    $('body').on('click', '.ok18-all-comments-ref', function () {
        $('body,html').animate({
            scrollTop: $('.ok18-comment-wrap').offset().top
        }, 800);
    });

    $('.lifestyle-megamenu-append-wrap').append($('.ok-megamenu.life-style'));
    $('.others-megamenu-append-wrap').append($('.ok-megamenu.all-cats'));

    /**
     * Smart Search
     */
    $('.ok-smart-search-field').keyup(function () {
        if ($(this).val() != '') {
            var key = ok18_frontend_script_obj.smart_search_api_key;
            var keyword = $(this).val();
            var search_api_url = ok18_frontend_script_obj.smart_search_url + '&q=' + keyword;
            $.ajax({
                type: 'get',
                url: search_api_url,
                headers: {
                    'Authorization': 'Bearer ' + key,
                },
                beforeSend: function (xhr) {

                },
                success: function (res) {
                    if (res.hits.length > 0) {
                        var search_result_template = wp.template('search-results-list');
                        $('.ok-smart-results-wrap').html(search_result_template(res.hits));

                        $('.okms-view-all-result').attr('href', ok18_frontend_script_obj.siteurl + '?search_keyword=' + keyword);
                        $('.search-auto-complete-wrap').show();
                    } else {
                        $('.search-results-append').html('');


                        $('.okms-view-all-result').attr('href', 'javascript:void(0);');

                        $('.search-auto-complete-wrap').hide();

                    }
                }
            })

        } else {
            $('.search-auto-complete-wrap').hide();
        }
    });

    $('#search-load-more-trigger').click(function () {
        var current_offset = parseInt($('#search-current-offset').val());
        var total_results = parseInt($('#search-total-results').val());
        var key = $(this).data('key');
        if (current_offset > total_results) {
            $(this).remove();
            return;
        }
        var new_offset = parseInt(current_offset) + 10;
        var search_api_url = $('#search-api-url').val() + '&offset=' + current_offset;
        $.ajax({
            type: 'get',
            url: search_api_url,

            headers: {
                'Authorization': 'Bearer ' + key,
            },
            beforeSend: function (xhr) {

            },
            success: function (res) {
                var search_result_template = wp.template('search-results-list');
                $('.search-results-append').append(search_result_template(res.hits));
                $('#search-current-offset').val(new_offset);

            }
        })
    }
    );

    if ($('.ok-comments-revamp-list-wrap').length > 0) {
        /*
         * Comments ajax fetch 
         */
        var comment_new_template = wp.template('comments-list-template');


        var limit = (isMobile) ? 10 : 50;
        var offset = 0;
        var orderby = $('.ok-active-comment-orderby').data('orderby');
        var comments_api_url = ok18_frontend_script_obj.api_url + 'comments/' + post_id + '/0';

        // console.log(okeh_js_obj.api_url + 'comments/' + post_id + '/0', );
        $.ajax({
            type: 'get',
            url: comments_api_url,
            data: {
                limit: limit,
                offset: offset,
                orderby: orderby
            },
            beforeSend: function (xhr) {

            },
            success: function (res) {

                $('.ok-comments-revamp-list-wrap').html(comment_new_template(res.data));
                $('.ok-comment-number .comment-number').html(res.total_comments + ' <span>Comments</span>');
                if ($('.ok-post-comments-sidepanel').length > 0) {
                    var comment_side_panel_template = wp.template('side-panel-comments-list-template');
                    $('.ok-post-comments-sidepanel .oum-popup-body').html(comment_side_panel_template(res.data));
                    $('.ok-post-comments-sidepanel .ok-comments-count').html(res.total_comments);

                }
                $('.oum-comments-text-input').each(function () {
                    var id = $(this).attr('id');
                    var id_array = id.split('_');
                    var comment_text = oum_getCookie(id);
                    if (comment_text) {
                        $(this).val(comment_text);
                        if (id_array[id_array.length - 1] != 0) {
                            $(this).closest('.ok-field-for-reply').show();
                        }
                    }
                });

            }
        });

        $('body').on('click', '.ok-comments-orderby', function () {
            var orderby = $(this).data('orderby');
            var selector = $(this);
            $('.ok-comments-orderby').removeClass('ok-active-comment-orderby');
            $(this).addClass('ok-active-comment-orderby');
            $.ajax({
                type: 'get',
                url: comments_api_url,
                data: {
                    limit: limit,
                    offset: offset,
                    orderby: orderby
                },
                beforeSend: function (xhr) {
                    selector.parent().find('.ok-ajax-loader').show();
                },
                success: function (res) {
                    selector.parent().find('.ok-ajax-loader').hide();
                    $('.ok-comments-revamp-list-wrap').html(comment_new_template(res.data));
                }
            });
        });
    }
    $('body').on('click', '.ok-comment-report-trigger', function () {
        var comment_id = $(this).data('comment-id');
        var report_comment_cookie = ok18_getCookie('okeh_' + comment_id);
        if (report_comment_cookie == '') {
            $.ajax({
                type: 'post',
                url: okeh_js_obj.ajax_url,
                data: {
                    action: 'okeh_report_comment_action',
                    _wpnonce: okeh_js_obj.ajax_nonce,
                    comment_id: comment_id
                },
                beforeSend: function (xhr) {

                },
                success: function (response) {

                    if (response == 'success') {

                        alert('Comment has been reported');
                        var cookie_name = 'ok_' + comment_id;
                        ok18_setCookie(cookie_name, 1, 365);
                    }
                }
            });
        } else {

        }
    });

    if ($('.ok-related-append').length > 0) {
        setTimeout(function () {
            var ok_related_news = $('.ok-related-append').html();
            if (ok_related_news != '') {
                var p_count = 0;
                $('.ok18-single-post-content-wrap p').each(function () {
                    p_count++;
                    if (p_count == 4) {
                        $(this).after(ok_related_news);
                    }
                });
            }
        }, 5000);
    }

    $('body').on('click', '.rel-comments', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.ok-conversation-section').offset().top
        }, 2000);
        $('.quick-comment-lists').fadeOut();
        $('.quick-comment-lists').find('.ok-sidepanel-body').removeClass('reveal-ok-sidemenu');
    });

    $('.ok-comment-number').on('click', function () {
        $('.quick-comment-lists').fadeIn();
        $('.quick-comment-lists').find('.ok-sidepanel-body').addClass('reveal-ok-sidemenu');
    });

    /**
     * API Fetch
     */
    $('.ok-api-fetch').each(function () {
        var selector = $(this);
        var api = $(this).data('api');
        var api_url = ok18_frontend_script_obj.api_url + api;
        var template_name = $(this).data('template');
        var template = wp.template(template_name);
        $.ajax({
            type: 'get',
            url: api_url,
            success: function (res) {
                if (res.status == 200) {
                    selector.html(template(res.data));
                    loadLtr();
                }

            }
        });
    });
    /**
     * Election API Fetch
     */
    $('.okel-api-fetch').each(function () {
        var selector = $(this);
        var api = $(this).data('api');
        var api_url = api;
        var template_name = $(this).data('template');
        var template = wp.template(template_name);
        $.ajax({
            type: 'get',
            url: api_url,
            success: function (res) {
                if (res.status == 200) {
                    selector.html(template(res.data));


                }

            }
        });
    });

    if ($('.ok-top-result-filter').length > 0) {
        $.ajax({
            url: "https://election.onlinekhabar.com/wp-json/okelapi/v1/all-states",
            type: 'get',
            success: function (res) {
                var option_html = '<option value="">प्रदेश</option>';
                if (res.status == 200) {
                    var states = res.data.states;
                    for (var i = 0; i < states.length; i++) {
                        option_html += '<option value="' + states[i].state_id + '">' + states[i].state_name + '</option>';
                    }
                    $('.okel-top-state-filter').html(option_html);
                }
            }
        });
        $.ajax({
            url: "https://election.onlinekhabar.com/wp-json/okelapi/v1/all-districts",
            type: 'get',
            success: function (res) {
                var option_html = '<option value="">जिल्ला</option>';
                if (res.status == 200) {
                    var districts = res.data.districts;
                    for (var i = 0; i < districts.length; i++) {
                        option_html += '<option value="' + districts[i].district_id + '">' + districts[i].district_name + '</option>';
                    }
                    $('.okel-top-district-filter').html(option_html);
                }
            }
        });



        $('body').on('change', '.okel-top-state-filter', function () {
            var selector = $(this);
            var state_id = $(this).val();
            if (state_id == '') {
                var api_url = 'https://election.onlinekhabar.com/wp-json/okelapi/v1/all-districts/';
            } else {
                var api_url = 'https://election.onlinekhabar.com/wp-json/okelapi/v1/state-districts/' + state_id;
            }
            $.get(api_url,
                function (res, status) {
                    var options_html = '<option value="">जिल्ला</option>';
                    if (res.status == 200 && res.data.districts) {
                        for (i = 0; i < res.data.districts.length; i++) {
                            options_html += '<option value="' + res.data.districts[i].district_id + '">' + res.data.districts[i].district_name + '</option>'
                        }
                        $('.okel-top-district-filter').html(options_html);
                    }
                });


        });

        $('body').on('click', '#top-filter-submit-trigger', function () {
            $(this).closest('form').submit();
        });
    }

    $('body').on('change', '#ok-goto-rashi-page', function () {
        var term_link = $(this).val();
        if (term_link != '') {
            window.location = term_link;
            exit;
        }
    });



    /* if(isMobile){
         if(isDevice.iOS()){
             $('.ap-download-btn a').attr('href','https://apps.apple.com/np/app/online-khabar/id923813068');
         }
         if(isDevice.android()){
             $('.ap-download-btn a').attr('href','https://play.google.com/store/apps/details?id=com.shirantech.onlinekhabar&hl=en&gl=US');
         }
     }*/
    $('body').on('click', '.okcm-inning-tab .nav-item', function () {
        $('.okcm-inning-tab .nav-item').removeClass('active-nav');
        $(this).addClass('active-nav');
        var inning_id = $(this).data('id');
        $('.commentary-inning-main-wrap').hide();
        $('#' + inning_id).show();
    });

    $('body').on('click', '.filter-event-type-trigger a', function (e) {
        e.preventDefault();
        var event_type = $(this).data('filter-type');
        if (event_type == 'all') {
            $(this).closest('.capsule-tab-item').find('.match-event').show();
        } else {
            $(this).closest('.capsule-tab-item').find('.match-event').hide();
            $(this).closest('.capsule-tab-item').find('.event-type-' + event_type).show();
        }

    });
    $('body').on('click', '.okcapi-filter-event-type-trigger a', function (e) {
        e.preventDefault();
        var event_type = $(this).data('filter-type');
        if (event_type == 'all') {
            $(this).closest('.capsule-tab-item').find('.match-event').show();
        } else {
            $(this).closest('.capsule-tab-item').find('.match-event').hide();
            $(this).closest('.capsule-tab-item').find('.event-type-' + event_type).show();
        }

    });

    $('.end-of-over-info').each(function () {
        $(this).prev('.match-event').css({
            'border': 'none'
        });
    });

    $('.fixture-cards-wrapper').find('.tab-container-title').first().css({ 'display': 'flex' });
    $('body').on('click', '.cricket-tournament-tab', function () {
        $(this).parents('.all-fixture-tab-nav').find('.cricket-tournament-tab').removeClass('active-nav');
        $('.tab-container-title').hide();
        $(this).addClass('active-nav');
        var tournament_id = $(this).data('id');
        var tournament_url = $(this).data('url');
        $(this).parents('.oks-tournament-tab-navs').next('.fixture-cards-wrapper').find('.tab-container-title[data-id="' + tournament_id + '"]').css({ 'display': 'flex' });
        $(this).parents('.oks-tournament-tab-navs').next('.fixture-cards-wrapper').find('.cricket-tournament-matches-wrapper').hide();
        $(this).parents('.oks-tournament-tab-navs').next('.fixture-cards-wrapper').find('.cricket-tournament-matches-wrapper[data-id="' + tournament_id + '"]').fadeIn();
        $('.cricket-tournament-all-link').attr('href', tournament_url);
    });

    $('body').on('change', '.okcm-tournament-switcher', function () {
        var url = $(this).val();
        window.location = url;
        return;
    });


    $('body').on('click', '.personality-category-filter', function (e) {
        $('.personality-category-filter .topics-thumb').removeClass('active');
        $(this).find('.topics-thumb').addClass('active');
        var pc_slug = $(this).data('pc-slug');
        $('.personality-card-item').hide();
        $('.personality-category-' + pc_slug).show();
    });

});