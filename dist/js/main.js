$(document).ready(function () {
    var menuState = false;
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

        console.log(state.device);
    }

    function runTablet(){

        console.log(state.device);
    }

    function runDesctop(){

        console.log(state.device);
    }

    $(window).getDevice(768,992);

    $(".home-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        arrows: false
    });

    $(".one-char:not(.active)").find(".char-list").slideUp(5);
    $(".js-btn-char").click(function(){
        var sib = $(this).closest(".one-char").siblings();
        var parent = $(this).closest(".one-char");
        sib.removeClass("active");
        sib.find(".js-btn-char").removeClass("active");
        sib.find(".char-list").slideUp();

        parent.find(".char-list").slideDown();
        parent.addClass("active");
        $(this).addClass("active");
    });

    $(".actual-block .more").click(function(){
        var parent = $(this).closest(".actual-block");

        if($(this).find(".actual-block").hasClass("active")){
            parent.find(".active-text").fadeOut();
            parent.removeClass("active");
        } else {
            parent.addClass("active");
            parent.find(".active-text").fadeIn();
        }
    });

    $(".actual-block .hider").click(function(){
        var parent = $(this).closest(".actual-block");
        parent.find(".active-text").fadeOut();
        parent.removeClass("active");
    });

    $(".one-eq .more").click(function(){
       var parent = $(this).closest(".one-eq");
        parent.addClass("active");
       parent.find(".active-text").fadeIn();
    });

    $(".one-eq .hider").click(function(){
        var parent = $(this).closest(".one-eq");
        parent.removeClass("active");
        parent.find(".active-text").fadeOut();
    });

    $(".js-feedback-open").click(function(){

        if(menuState){
            $(".feedback-modal").fadeOut();
            $(".thanks-modal").fadeOut();
            $(this).removeClass("mod-open");
            menuState = false;
            return false;
        } else {
            var _ = $(this).addClass("mod-open");
            menuState = true;
            $(".feedback-modal").fadeIn();

            jQuery(function($){
                $(document).mouseup(function (e){
                    var div = $(".feedback-modal");
                    if (!div.is(e.target)
                        && div.has(e.target).length === 0) {
                        div.fadeOut();
                        _.removeClass("mod-open");
                    }
                });
            });

        }

    });

    $(".js-feedback-open .submit").click(function () {
        $(".feedback-modal").fadeOut();
        $(".thanks-modal").fadeIn();

        jQuery(function($){
            $(document).mouseup(function (e){
                var div = $(".thanks-modal");
                if (!div.is(e.target)
                    && div.has(e.target).length === 0) {
                    div.fadeOut();
                }
            });
        });
    });

    $(window).on("scroll",function(){
        console.log($(window).scrollTop());
        if($(window).scrollTop() > 100 && $(window).scrollTop() < 150){
            $("header").addClass("pre-fixed");
        } else if ($(window).scrollTop() > 150) {
            $("header").removeClass("pre-fixed").addClass("fixed");
            $("body").css({
                "padding-top": "100px"
            });
        } else {
            $("header").removeClass("fixed pre-fixed");
            $("body").css({
                "padding-top": "0"
            });
        }
    });

});