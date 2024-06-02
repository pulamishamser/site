jQuery(document).ready(function ($) {
    // alert('test');

    if ($('#ok18-roadblock-type').length > 0 && $('#ok18-roadblock-wrap').length > 0) {
        var roadblock_template = wp.template('roadblock-template');
        var roadblock_type = $('#ok18-roadblock-type').val();
        var device_type = (isMobile) ? 'mobile' : 'desktop';
        var today = ($('#ok18-roadblock-wrap').data('today')) ? $('#ok18-roadblock-wrap').data('today') : false;
        //console.log(today);
        if (today) {
            var url = okam_js_obj.ad_api_url + '/roadblock/' + roadblock_type + '/' + device_type + '?today=' + today
        } else {
            var url = okam_js_obj.ad_api_url + '/roadblock/' + roadblock_type + '/' + device_type;
        }
        $.ajax({
            type: 'get',
            url: url,
            success: function (res) {

                if (res.status == 200) {
                    $('#ok18-roadblock-wrap').html(roadblock_template(res.data));
                    $('.ok18-loader-wrap').fadeOut(500);
                    setTimeout(function () {
                        $('.ok_roadblock').fadeOut(1000);
                    }, 10000);
                } else {
                    $('.ok18-loader-wrap').fadeOut(500);
                }

            }
        });
    }
    if ($('#ok18-roadblock-type').length > 0 && $('#ok-box-ad-wrap').length > 0) {
        var boxad_template = wp.template('ok-box-ad');
        var boxad_type = $('#ok18-roadblock-type').val();
        var device_type = (isMobile) ? 'mobile' : 'desktop';
        var today = ($('#ok-box-ad-wrap').data('today')) ? $('#ok-box-ad-wrap').data('today') : false;
        //console.log(today);
        if (today) {
            var url = okam_js_obj.ad_api_url + '/boxad/' + boxad_type + '/' + device_type + '?today=' + today
        } else {
            var url = okam_js_obj.ad_api_url + '/boxad/' + boxad_type + '/' + device_type;
        }
        $.ajax({
            type: 'get',
            url: url,
            success: function (res) {
                if (res.status == 200) {
                    $('#ok-box-ad-wrap').html(boxad_template(res.data));

                }
            }
        });
    }
    var ad_template = wp.template('ad-template');

    if (!okam_js_obj.ad_block) {
        $('.okam-ad-position-wrap').each(function () {
            var alias = $(this).data('alias');
            var device_type = $(this).data('device-type');
            var ajax_call = true;
            if (isMobile) {
                if (!(device_type == 'mobile' || device_type == 'mobile-desktop')) {
                    ajax_call = false;
                }
            } else {
                if (!(device_type == 'desktop' || device_type == 'mobile-desktop')) {
                    ajax_call = false;
                }
            }
            if (ajax_call) {
                var today = ($(this).data('today')) ? $(this).data('today') : false;
                var country = ($(this).data('country')) ? $(this).data('country') : false;
                var limit = ($(this).data('limit')) ? $(this).data('limit') : false;
                if (today) {
                    var url = okam_js_obj.ad_api_url + '/ad_position/' + alias + '?today=' + today;
                } else {
                    if (country) {
                        var url = okam_js_obj.ad_api_url + '/ad_position/' + alias + '?country=' + country;
                    } else {
                        var url = okam_js_obj.ad_api_url + '/ad_position/' + alias;
                        if (limit) {
                            var url = okam_js_obj.ad_api_url + '/ad_position/' + alias + '?limit=' + limit;
                        }
                    }
                }
                var selector = $(this);
                $.ajax({
                    type: 'get',
                    url: url,
                    success: function (res) {

                        if (res.status == 200) {

                            selector.html(ad_template(res.data));



                            if (selector.find('.ok18-third-party-ad').length > 0) {
                                selector.find('.ok18-third-party-ad').each(function () {
                                    var loaded = $(this).data('loaded');
                                    if (loaded == 'no' && ad_url) {
                                        var ad_url = $(this).data('ad-url');
                                        $(this).load(ad_url);
                                        $(this).data('loaded', 'yes');
                                    }
                                });
                            }

                        }



                    }
                });
            }
        });
    }
    $('body').on('click', '.okam-each-ad', function (e) {
        // e.preventDefault();
        var ad_id = $(this).attr('id');
        var ad_id_array = ad_id.split('-');
        var ad_real_id = ad_id_array[2];
        var today = ($(this).closest('.okam-ad-position-wrap').data('today')) ? $(this).closest('.okam-ad-position-wrap').data('today') : false;
        var verification = $(this).data('verification');
        if (today) {
            var url = okam_js_obj.ad_api_url + '/ad_click_count/' + ad_real_id + '/?today=' + today;
        } else {
            var url = okam_js_obj.ad_api_url + '/ad_click_count/' + ad_real_id;
        }

        $.ajax({
            url: url,
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('OKAM-Verification', verification);
            }
        });
    });
    $('body').on('click', '.ok-rb-link', function (e) {
        // e.preventDefault();
        var rb_id = $(this).closest('.ok_roadblock').data('roadblock-id');
        var verification = $(this).closest('.ok_roadblock').data('verification');
        var today = ($('#ok18-roadblock-wrap').data('today')) ? $('#ok18-roadblock-wrap').data('today') : false;
        if (today) {
            var url = okam_js_obj.ad_api_url + '/rb_click_count/' + rb_id + '/?today=' + today;
        } else {
            var url = okam_js_obj.ad_api_url + '/rb_click_count/' + rb_id;
        }

        $.ajax({
            url: url,
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('OKAM-Verification', verification);
            }
        });
    });
    $('body').on('click', '.ok-box-ad-link', function (e) {
        // e.preventDefault();
        var ba_id = $(this).data('id');
        var verification = $(this).data('verification');
        var today = ($('#ok-box-ad-wrap').data('today')) ? $('#ok-box-ad-wrap').data('today') : false;
        if (today) {
            var url = okam_js_obj.ad_api_url + '/ba_click_count/' + ba_id + '/?today=' + today;
        } else {
            var url = okam_js_obj.ad_api_url + '/ba_click_count/' + ba_id;
        }

        $.ajax({
            url: url,
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('OKAM-Verification', verification);
            }
        });
    });
    var body_add_class = ['single-headerabsolute', 'single-top-header', 'single-footerabsolute', 'home-footerabsolute', 'home-headerabsolute'];
    for (var i = 0; i < body_add_class.length; i++) {
        var class_check = body_add_class[i];
        if ($('.' + class_check).length > 0) {
            var append_class = class_check + '-body-enabled';
            $('body').addClass(append_class);
        }
    }

    if ($('.ok18-inbetween-ad').length > 0) {
        setTimeout(function () {
            if ($('.ok18-inbetween-ad .okam-each-ad').length > 0) {
                var in_between_ad = $('.ok18-inbetween-ad').html();
                if (in_between_ad != '') {
                    var p_count = 0;
                    $('.ok18-single-post-content-wrap p').each(function () {
                        p_count++;
                        if (p_count == 2) {
                            $(this).after(in_between_ad);
                        }
                    });
                }
            }
        }, 5000);
    }
    if ($('.ok18-inbetween-ad-2').length > 0) {
        setTimeout(function () {
            if ($('.ok18-inbetween-ad-2 .okam-each-ad').length > 0) {
                $('.ok18-inbetween-ad-2 .okam-ad-position-wrap').addClass('single-inbetween-stories');
                var in_between_ad = $('.ok18-inbetween-ad-2').html();
                if (in_between_ad != '') {
                    var p_count = 0;
                    $('.ok18-single-post-content-wrap p').each(function () {
                        p_count++;
                        if (p_count == 4) {
                            $(this).after(in_between_ad);
                        }
                    });
                    if (p_count < 4) {
                        $('.ok18-single-post-content-wrap p').last().after(in_between_ad);
                    }
                }
            }
        }, 5000);
    }
    var p_ad_count = 0;
    if ($('.ok18-inbetween-mobile-ad').length > 0) {
        setTimeout(function () {
            if ($('.ok18-inbetween-mobile-ad .okam-each-ad').length > 0) {
                var ad_array = [];
                $('.ok18-inbetween-mobile-ad .okam-each-ad').each(function () {
                    var outerHTML = $(this).prop("outerHTML");
                    ad_array.push('<div class="single-inbetween-stories">' + outerHTML + '</div>');
                });
                if (ad_array.length > 0) {
                    var p_count = 0;
                    var p_start_count = 2;
                    $('.ok18-single-post-content-wrap p').each(function () {
                        p_count++;
                        ad_index = p_count - p_start_count;
                        if (ad_array[ad_index]) {
                            p_ad_count = p_count;
                            $(this).after(ad_array[ad_index]);
                        }
                    });
                    if (ad_index < (ad_array.length - 1)) {
                        for (var i = ad_index + 1; i < ad_array.length; i++) {
                            $('.ok18-single-post-content-wrap p').last().after(ad_array[i]);

                        }
                    }

                }

            }
        }, 5000);

    }
    if ($('.ok18-inbetween-mobile-ad-2').length > 0) {
        setTimeout(function () {
            if ($('.ok18-inbetween-mobile-ad-2 .okam-each-ad').length > 0) {
                var ad_array = [];
                $('.ok18-inbetween-mobile-ad-2 .okam-each-ad').each(function () {
                    var outerHTML = $(this).prop("outerHTML");
                    ad_array.push('<div class="single-inbetween-stories">' + outerHTML + '</div>');
                });
                if (ad_array.length > 0) {
                    var p_count = 0;
                    var p_start_count = p_ad_count + 1;
                    $('.ok18-single-post-content-wrap p').each(function () {
                        p_count++;
                        console.log(p_count);
                        ad_index = p_count - p_start_count;
                        if (ad_array[ad_index]) {
                            $(this).after(ad_array[ad_index]);
                        }
                    });
                    if (ad_index < (ad_array.length - 1)) {
                        for (var i = ad_index + 1; i < ad_array.length; i++) {
                            $('.ok18-single-post-content-wrap p').last().after(ad_array[i]);

                        }
                    }

                }

            }
        }, 6000);

    }

    $('body').on('click', '.close-box-adv', function () {
        $('#ok-box-ad-wrap').remove();
    });

});