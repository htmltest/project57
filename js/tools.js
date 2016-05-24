(function($) {

    $(document).ready(function() {

        $('.types-menu > a').click(function(e) {
            $('.types-menu').toggleClass('open');
            e.preventDefault();
        });

        $('.types-menu-close').click(function(e) {
            $('.types-menu').removeClass('open');
            e.preventDefault();
        });

        $('.gallery-item').fancybox({
            padding: 10,
            tpl : {
                closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            helpers : {
                overlay : {
                    locked : false
                }
            }
        });

        $.extend($.validator.messages, {
            required: 'Это поле должно быть заполнено',
            email: 'Введен некорректный e-mail'
        });

        $('form').each(function() {
            $(this).validate();
        });

        $('.filter-select select').change(function() {
            //$(this).parents().filter('form').submit();
            //тут можно отправить форму после изменения значения селекта
        });

        $('.filter-select select').chosen({disable_search: true});
        $(window).resize(function() {
            $('.filter-select select').chosen('destroy');
            $('.filter-select select').chosen({disable_search: true});
        });

        $('.filter-slider-inner').each(function() {
            var curSlider = $(this).parent();
            noUiSlider.create(this, {
                start: [Number(curSlider.find('.filter-slider-start-from').val()), Number(curSlider.find('.filter-slider-start-to').val())],
                range: {
                    'min': [Number(curSlider.find('.filter-slider-range-min').html())],
                    'max': [Number(curSlider.find('.filter-slider-range-max').html())]
                },
                format: wNumb({
                    decimals: 0
                })
            }).on('update', function(values, handle) {
                curSlider.find('.filter-slider-value').eq(handle).html(String(values[handle]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                curSlider.find('input').eq(handle).val(values[handle]);
            });
            this.noUiSlider.on('set', function() {
                //curSlider.parents().filter('form').submit();
                //тут можно отправить форму после изменения значений
            });
        });

        $('.house-gallery').each(function() {
            var curGallery = $(this);

            curGallery.find('.house-gallery-preview li:first').addClass('active');

            curGallery.data('curIndex', 0);

            curGallery.find('.house-gallery-big-prev').css({'display': 'none'});
            if (curGallery.find('.house-gallery-big li').length < 2) {
                curGallery.find('.house-gallery-big-next').css({'display': 'none'});
            }

            curGallery.find('.house-gallery-big-next').click(function(e) {
                curGallery.find('.house-gallery-big ul').stop(true, true);

                var curIndex = curGallery.data('curIndex');
                curIndex++;
                curGallery.find('.house-gallery-big-prev').css({'display': 'block'});
                if (curIndex >= curGallery.find('.house-gallery-big li').length - 1) {
                    curIndex = curGallery.find('.house-gallery-big li').length - 1;
                    curGallery.find('.house-gallery-big-next').css({'display': 'none'});
                }

                curGallery.find('.house-gallery-preview li.active').removeClass('active');
                curGallery.find('.house-gallery-preview li').eq(curIndex).addClass('active');

                curGallery.data('curIndex', curIndex);
                curGallery.find('.house-gallery-big ul').animate({'left': -curIndex * curGallery.find('.house-gallery-big').width(), 'height': curGallery.find('.house-gallery-big ul li').eq(curIndex).height()});
                curGallery.find('.house-gallery-preview').data('jsp').scrollToElement(curGallery.find('.house-gallery-preview li').eq(curIndex), true, true);

                e.preventDefault();
            });

            curGallery.find('.house-gallery-big-prev').click(function(e) {
                curGallery.find('.house-gallery-big ul').stop(true, true);

                var curIndex = curGallery.data('curIndex');
                curIndex--;
                curGallery.find('.house-gallery-big-next').css({'display': 'block'});
                if (curIndex <= 0) {
                    curIndex = 0;
                    curGallery.find('.house-gallery-big-prev').css({'display': 'none'});
                }

                curGallery.find('.house-gallery-preview li.active').removeClass('active');
                curGallery.find('.house-gallery-preview li').eq(curIndex).addClass('active');

                curGallery.data('curIndex', curIndex);
                curGallery.find('.house-gallery-big ul').animate({'left': -curIndex * curGallery.find('.house-gallery-big').width(), 'height': curGallery.find('.house-gallery-big ul li').eq(curIndex).height()});
                curGallery.find('.house-gallery-preview').data('jsp').scrollToElement(curGallery.find('.house-gallery-preview li').eq(curIndex), true, true);

                e.preventDefault();
            });

            curGallery.find('.house-gallery-preview li a').click(function(e) {
                var curLi = $(this).parent();

                if (!curLi.hasClass('active')) {
                    curGallery.find('.house-gallery-big ul').stop(true, true);

                    curIndex = curGallery.find('.house-gallery-preview li').index(curLi);

                    curGallery.find('.house-gallery-big-prev').css({'display': 'block'});
                    if (curIndex == 0) {
                        curGallery.find('.house-gallery-big-prev').css({'display': 'none'});
                    }

                    curGallery.find('.house-gallery-big-next').css({'display': 'block'});
                    if (curIndex >= curGallery.find('.house-gallery-big li').length - 1) {
                        curGallery.find('.house-gallery-big-next').css({'display': 'none'});
                    }

                    curGallery.find('.house-gallery-preview li.active').removeClass('active');
                    curGallery.find('.house-gallery-preview li').eq(curIndex).addClass('active');

                    curGallery.data('curIndex', curIndex);
                    curGallery.find('.house-gallery-big ul').animate({'left': -curIndex * curGallery.find('.house-gallery-big').width(), 'height': curGallery.find('.house-gallery-big ul li').eq(curIndex).height()});
                }

                e.preventDefault();
            });

            $(window).load(function() {
                curGallery.find('.house-gallery-preview').jScrollPane({autoReinitialise: true});
                curGallery.find('.house-gallery-big li').width(curGallery.find('.house-gallery-big').width());
                var curIndex = curGallery.data('curIndex');
                curGallery.find('.house-gallery-big ul').css({'left': -curIndex * curGallery.find('.house-gallery-big').width(), 'height': curGallery.find('.house-gallery-big ul li').eq(curIndex).height()});
            });

            $(window).resize(function() {
                var curIndex = curGallery.data('curIndex');
                curGallery.find('.house-gallery-big li').width(curGallery.find('.house-gallery-big').width());
                curGallery.find('.house-gallery-big ul').css({'left': -curIndex * curGallery.find('.house-gallery-big').width(), 'height': curGallery.find('.house-gallery-big ul li').eq(curIndex).height()});
            });
        });

        $('.complect-text-more a').click(function(e) {
            var curLink = $(this);

            var curText = curLink.find('span').html();
            curLink.find('span').html(curLink.data('backtext'));
            curLink.data('backtext', curText);

            var curBlock = curLink.parent().parent();
            curBlock.toggleClass('open');
            if (curBlock.hasClass('open')) {
                curBlock.find('.complect-text-inner').css({'max-height': curBlock.find('.complect-text-wrap').outerHeight(true)});
            } else {
                curBlock.find('.complect-text-inner').removeAttr('style');
            }

            e.preventDefault();
        });

        $('#fullpage').fullpage({
            afterLoad: resizeFullpageSections,
            afterResize: resizeFullpageSections
        });

        function resizeFullpageSections() {
            $('.main-news').each(function() {
                $('.main-news-container').height($('#news').height() - $('#news .main-title').outerHeight() - 120 - 36);
                $('.main-news-container').jScrollPane({showArrows: true, autoReinitialise: true});
            });
            $('.section-content').each(function() {
                var curBlock = $(this);
                curBlock.height($(window).height());
                curBlock.jScrollPane({autoReinitialise: true});
            });
        }

        $('.scroll-next').click(function(e){
            $.fn.fullpage.moveSectionDown();
            e.preventDefault();
        });

        $('.house-complect-link a').click(function(e) {
            $.scrollTo($('.complects'), 500, {offset: {top: -30}});
            e.preventDefault();
        });

        $('.house-consult-link, .complect-consult a').click(function(e) {
            $.ajax({
                type: 'POST',
                url: $(this).attr('href'),
                dataType: 'html',
                cache: false
            }).done(function(html) {
                if ($('.window').length > 0) {
                    windowClose();
                }
                windowOpen(html);
            });
            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {

        $('.page-404').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var maxHeight = $('.wrapper').height() - 263;
            if (curHeight < maxHeight) {
                curBlock.css({'top': (maxHeight - curHeight) / 2});
            } else {
                curBlock.css({'top': 0});
            }
        });

        $('.houses').each(function() {
            var curList = $('.houses-item');
            curList.find('.houses-item-name').css({'min-height': 0 + 'px'});

            curList.find('.houses-item-name').each(function() {
                var curBlock = $(this);
                var curHeight = curBlock.height();
                var curTop = curBlock.offset().top;

                curList.find('.houses-item-name').each(function() {
                    var otherBlock = $(this);
                    if (otherBlock.offset().top == curTop) {
                        var newHeight = otherBlock.height();
                        if (newHeight > curHeight) {
                            curBlock.css({'min-height': newHeight + 'px'});
                        } else {
                            otherBlock.css({'min-height': curHeight + 'px'});
                        }
                    }
                });
            });
        });

        $('.complect-text').each(function() {
            var curBlock = $(this);
            if (!curBlock.hasClass('open')) {
                if (curBlock.find('.complect-text-wrap').height() > curBlock.find('.complect-text-inner').height()) {
                    curBlock.find('.complect-text-more').show();
                } else {
                    curBlock.find('.complect-text-more').hide();
                }
            }
        });

    });

    function windowOpen(contentWindow) {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();
        var curScrollTop    = $(window).scrollTop();
        var curScrollLeft   = $(window).scrollLeft();

        var bodyWidth = $('body').width();
        $('body').css({'height': windowHeight, 'overflow': 'hidden'});
        var scrollWidth =  $('body').width() - bodyWidth;
        $('body').css({'padding-right': scrollWidth + 'px'});
        $(window).scrollTop(0);
        $(window).scrollLeft(0);
        $('body').css({'margin-top': -curScrollTop});
        $('body').data('scrollTop', curScrollTop);
        $('body').css({'margin-left': -curScrollLeft});
        $('body').data('scrollLeft', curScrollLeft);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-loading"></div><div class="window-container window-container-load"><div class="window-content">' + contentWindow + '<a href="#" class="window-close"></a></div></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').load(function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-loading').remove();
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-loading').remove();
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close').click(function(e) {
            windowClose();
            e.preventDefault();
        });

        $('body').bind('keyup', keyUpBody);

        $('.window form').validate();

    }

    function windowPosition() {
        var windowWidth     = $(window).width();
        var windowHeight    = $(window).height();

        if ($('.window-container').width() > windowWidth - 40) {
            $('.window-container').css({'left': 20, 'margin-left': 0});
            $('.window-overlay').width($('.window-container').width() + 40);
        } else {
            $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});
            $('.window-overlay').width('100%');
        }

        if ($('.window-container').height() > windowHeight - 40) {
            $('.window-overlay').height($('.window-container').height() + 40);
            $('.window-container').css({'top': 20, 'margin-top': 0});
        } else {
            $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2});
            $('.window-overlay').height('100%');
        }
    }

    function keyUpBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    function windowClose() {
        $('body').unbind('keyup', keyUpBody);
        $('.window').remove();
        $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
        $(window).scrollTop($('body').data('scrollTop'));
        $(window).scrollLeft($('body').data('scrollLeft'));
    }

    $(window).resize(function() {
        if ($('.window').length > 0) {
            var windowWidth     = $(window).width();
            var windowHeight    = $(window).height();
            var curScrollTop    = $(window).scrollTop();
            var curScrollLeft   = $(window).scrollLeft();

            $('body').css({'height': '100%', 'overflow': 'visible', 'padding-right': 0, 'margin': 0});
            var bodyWidth = $('body').width();
            $('body').css({'height': windowHeight, 'overflow': 'hidden'});
            var scrollWidth =  $('body').width() - bodyWidth;
            $('body').css({'padding-right': scrollWidth + 'px'});
            $(window).scrollTop(0);
            $(window).scrollLeft(0);
            $('body').data('scrollTop', 0);
            $('body').data('scrollLeft', 0);

            windowPosition();
        }
    });

})(jQuery);