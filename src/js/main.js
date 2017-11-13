$(document).ready(function () {

    /*--Определение двайса--*/
    var state = {
        _device: "",
        _mobInit: function(){
            runMobile();
        },
        _tabletInit: function() {
            runTablet();
        },
        _descInit: function() {
            runDesctop();
        },
        _preWindowWidth: $(window).width(),
        _windowIncreases: function() {
            if(state._preWindowWidth > $(window).width()){
                state._preWindowWidth = $(window).width();
                return false;
            } else if (state._preWindowWidth < $(window).width()){
                state._preWindowWidth = $(window).width();
                return true;
            }
        }
    };

    (function( $ ) {
        $.fn.getDevice = function(braikPointMob,braikPointTablet) {
            Object.defineProperty(state, "device", {

                get: function() {
                    return this._device;
                },

                set: function(value) {
                    this._device = value;
                    if(value == "desctop"){
                        state._descInit();

                    } else if (value == "tablet"){
                        state._tabletInit();
                    } else if (value == "mobile"){
                        state._mobInit();
                    }
                }
            });

            $(this).on("resize load", function(){
                if($(this).width() < braikPointMob && state.device != "mobile"){
                    state.device = "mobile";
                } else if($(this).width() > braikPointMob && $(this).width() < braikPointTablet && state.device != "tablet") {
                    state.device = "tablet";
                }
                else if ($(this).width() > braikPointTablet && state.device != "desctop") {
                    state.device = "desctop";
                }
            });
        };
    })(jQuery);

    function runMobile(){
        $(".project-page .gray-info").appendTo(".project-page .col-2.js-last");
        console.log(state.device);
    }

    function runTablet(){
        $(".search-form").removeClass("open");
        console.log(state.device);
    }

    function runDesctop(){
        $(".project-page .gray-info").appendTo(".project-page .col-2.js-first");
        $(".search-form").removeClass("open-fix");
        console.log(state.device);
    }

    $(window).getDevice(768,992);

   /*--Выпадающие списки в Хедере --*/
    $('.menu-list li').hover(function(){
        $(this).addClass('open');
        $(this).find('.dropdown-list').fadeIn(150);
    },function(){
        $(this).removeClass('open');
        $(this).find('.dropdown-list').fadeOut(150);
    });
   /*--конец Выпадающие списки в хедере--*/

    $(".home-slider").slick({
        dots: true,
        responsive: [
            {
                breakpoint: 540,
                settings: {
                    dots: false
                },
            }],
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>'
    });

    $(".projects-list").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                },
            },{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
            }
        }],
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>'
    });

    $(".progress-cont").hover(function(){
        $(this).find(".info-block").fadeIn(150);
    },function(){
        $(this).find(".info-block").fadeOut(150);
    });


    $(window).resize(function(){
        mobileMenu();
        mobileMenu();
        mobileMenu();
        mobileMenu();
    });




    $('#mobile-menu-btn').click(function(){
       $('.mobile-menu-list-wrap').fadeIn(150);
        $(document).mouseup(function (e) {
            var container = $('.mobile-menu-list-wrap');
            if (container.has(e.target).length === 0){
                container.fadeOut(150);
            }
        });
    });

    $('.menu-btn-in').click(function(){
        $('.mobile-menu-list-wrap').fadeOut(150);
    });

    function mobileMenu(){
        $('.mobile-menu-list-wrap').hide();
       var preSize = menuWidth ();

       if($(window).width() < 767){
           var elm = $('#menu-list > li');
           for(var i = elm.length; i > 0; i--){
               $('#menu-list > li:last-child').appendTo($("#mobile-menu-list"));
               $('#mobile-menu-list li').unbind('mouseenter mouseleave');
               mobileMenuInit();
           }
       }
       else if(state._windowIncreases()){
           if (preSize + 200< $("#align").width()) {
               $('#mobile-menu-list > li:last-child').appendTo($("#menu-list"));
           }
       } else {
           if(preSize > $("#align").width() - 80) {
               $('#menu-list > li:last-child').appendTo($("#mobile-menu-list"));
               mobileMenuInit();
           }
       }
        preSize = menuWidth ();

       if(!$("#mobile-menu-list").children().length){
           $(".mobile-menu").hide();
           $(".menu-list").css({
               "min-width": "100%"
           })
       } else {
           $(".mobile-menu").show();
           $(".menu-list").css({
               "min-width": "calc( 100% - 80px )"
           });
       }

       function menuWidth () {
          var sum = 0;
           $('#menu-list li').each(function(i,item){
              sum += $(item).outerWidth();
           });
           return sum;
       }

       function mobileMenuInit(){
           $('#mobile-menu-list li').unbind('mouseenter mouseleave');
           $("#mobile-menu-list > li > a").unbind('click');
           $("#mobile-menu-list > li > a").click(function(){
               var p = $(this).parent();
               if(!p.hasClass('open')){
                   p.siblings().removeClass('open');
                   p.siblings().find('.dropdown-list').slideUp();
                   p.addClass("open");
                   p.find('.dropdown-list').slideDown();
               } else {
                   p.removeClass("open");
                   p.find('.dropdown-list').slideUp();
               }
           });
       }

    }

    $(window).resize();

    $(".docs-slider").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                },
            },{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>'
    });


    /*--Табы Карточка программы --*/
    $(".tabs-btns a").click(function(){
      var activeTabId = $(this).attr("data-tab");
          $(this).addClass("active");
          $(this).siblings().removeClass("active");
          $(activeTabId).siblings().fadeOut(150);
          $(activeTabId).fadeIn(150);
    });

    $(".digest-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    /*--конец Табы карточка программы --*/

    $(".drop-down-toggle").click(function(){
        var handler = function(e){
            if (!parentWrap.is(e.target)
                && parentWrap.has(e.target).length === 0) {
                parentWrap.removeClass("open");
                list.fadeOut(150);
                $(document).unbind('mouseup',handler);
            }
        };
        var parentWrap = $(this).closest(".drop-down-wrap");
        var list = parentWrap.find(".std-drop-down");
        if(parentWrap.hasClass("open")){
            parentWrap.removeClass("open");
            list.fadeOut(150);
            $(document).unbind('mouseup',handler);
        } else {
            parentWrap.addClass("open");
            list.fadeIn(150);
            $(document).mouseup(handler);
        }
    });

    $(".text-page .project-cont").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>'
    });

    /*--Форма поиска--*/
    $(".close-btn").click(function(){
        console.log("t");
       $(this).closest(".search-form").removeClass("open-fix");
    });
    $(".js-open-search").click(function(){

        if(state.device == "desctop"){
            var close = function(e){
                var container = $(".search-form");
                if (container.has(e.target).length === 0){
                    container.removeClass("open");
                }
            };

            if($(this).closest(".search-form").hasClass("open")){
                $(document).unbind("mouseup",close);
            } else {
                $(this).closest(".search-form").addClass("open");
                $(document).mouseup(function(e){
                    close(e);
                });
            }
        } else {
            var closeFix = function(e){
                var container = $(".search-form");
                if (container.has(e.target).length === 0){
                    container.removeClass("open-fix");
                }
            };

            if($(this).closest(".search-form").hasClass("open-fix")){
                $(document).unbind("mouseup",closeFix);
            } else {
                $(".search-form").addClass("open-fix");
                $(document).mouseup(function(e){
                    closeFix(e);
                });
            }
        }

    });
    /*--конец Форма поиска--*/

    /*--Копирование в буфер обмена--*/

    function copy(str){
        var tmp   = document.createElement('INPUT'),
            focus = document.activeElement;
        tmp.value = str;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
        focus.focus();
    }

    /*--конец Копирование в буфер обмена--*/

    /*--копировать баннер в буфер обмена--*/

    $(".copy-text").click(function(){
        var str = $(this).closest(".banner-descr").find(".banner-href").text();
        copy(str);
        $(".fa-files-o").remove();
        $(this).append('<i class="fa fa-files-o animated fadeOut" aria-hidden="true"></i>');
    });

    /*--конец копировать баннер в буфер обмена--*/
});