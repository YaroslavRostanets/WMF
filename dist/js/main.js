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

});