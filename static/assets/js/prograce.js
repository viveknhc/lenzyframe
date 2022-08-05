function footoclose() {}! 

function(t) {
    "use strict";

    Array.prototype.forEach2 = function(t) {
        for (var e = this.length, a = 0; e > a; a++) t(this[a], a)
    }, 


    jQuery(document).on("ready", function() {

        /* - PrograceBar
        ==============================================================================================================*/
            var n = jQuery.animateNumber.numberStepFactories.separator("'");
            jQuery(window).on("scroll", function() {
                var t = jQuery(window).scrollTop() + jQuery(window).height() - 100;
                jQuery("[data-numbers]", "body").toArray().forEach2(function(e) {
                    var a = jQuery(e);
                    return a.offset().top >= t ? !1 : (a.animateNumber({
                        number: a.data("numbers"),
                        numberStep: n
                    }, 1500), void a.removeAttr("data-numbers"))
                }), jQuery(".circle-graph:not(.cplete)", "body").toArray().forEach2(function(e) {
                    var a = jQuery(e),
                        o = Math.min(parseInt(a.data("graph-percent")), 50),
                        r = Math.min(Math.max(parseInt(a.data("graph-percent") - o), 0), 50);
                    return a.offset().top >= t ? !1 : (a.css({
                        "border-color": a.data("graph-color"),
                        color: a.data("graph-color")
                    }).html('<i class="b-left"><i></i></i><i class="b-right"><i></i></i><img src="images/px.gif" alt="" />'), void a.addClass("cplete").find("i.b-right i").animateRotate(-135, -135 + 3.6 * o, {
                        duration: 14 * o,
                        easing: "linear",
                        complete: function() {
                            a.find("i.b-left i").animateRotate(45, 45 + 3.6 * r, {
                                duration: 14 * r,
                                easing: "linear"
                            })
                        }
                    }))
                }), jQuery(".line-graph:not(.cplete)", "body").toArray().forEach2(function(e) {
                    var a = jQuery(e),
                        o = Math.min(parseInt(a.data("graph-percent")), 100);
                    return a.offset().top >= t ? !1 : (a.addClass("cplete").css({
                        "border-color": a.data("graph-color"),
                        color: a.data("graph-color")
                    }).append("<i></i>"), void a.children("i").animate({
                        width: o + "%"
                    }, 1e3))
                })
            }),
        /* - End Of PrograceBar
        ==============================================================================================================*/

        jQuery("#history").on("click", function() {
        }).children().on("click", function(t) {
            return !1
        })
    });

}(jQuery);