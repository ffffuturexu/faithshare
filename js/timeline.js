/*!
	Timeline - v0.0.1
	ilker Yılmaz
	https://github.com/ilkeryilmaz/timelinejs
 */
!
function(t) {
    Timeline = {
        init: function(e, i) {
            var s = this;
            s.$elem = t(i),
            s.dom = t("body"),
            s.wrapClass = "." + s.$elem.attr("class").split(" ").join("."),
            s.dotsItem = s.wrapClass + " .timeline-dots li",
            s.options = t.extend({},
            t.fn.Timeline.options, s.$elem.data(), e),
            s.initials = {
                autoPlayTimer: null,
                direction: "last" !== s.options.startItem ? 0 : 1
            },
            s.create_timeline()
        },
        create_timeline: function() {
            var t = this;
            t.build_out(),
            t.build_dots(),
            t.watch_events()
        },
        get_count: function() {
            var e = this,
            i = t("." + e.options.itemClass, e.$elem).length;
            return i
        },
        get_current: function() {
            var t, e = this;
            return t = "first" === e.options.startItem ? 0 : "last" === e.options.startItem ? e.get_count() - 1 : e.options.startItem
        },
        get_next: function() {
            var t = this;
            return t.get_current() + 1
        },
        get_prev: function() {
            var t = this;
            return t.get_current() - 1
        },
        watch_events: function() {
            var e = this;
            t(document.body).on("click", e.dotsItem,
            function(i) {
                var s = t(this).index();
                e.autoplay_clear(),
                e.change_slide("click", s)
            }),
            e.autoplay_init(),
            e.options.pauseOnHover && e.content_pause("item"),
            e.options.pauseOnDotsHover && e.content_pause("dots")
	        
		  	var startX = 0, endX = 0;
		  	var startY = 0, endY = 0;
		  	$('.timeline-detail').on('touchstart', function (e) {
		        startX = e.originalEvent.touches[0].clientX;// 触摸开始时记录一下手指所在的坐标x
		        startY = e.originalEvent.touches[0].clientY;
		   	});
		   	$('.timeline-detail').on('touchmove', function (e) {
		         endX = e.originalEvent.touches[0].clientX;// 离开屏幕一瞬间的坐标x
		         endY = e.originalEvent.touches[0].clientY;
		    });
		    $('.timeline-detail').on('touchend', function (i) {
		         var distanceX = Math.abs(startX - endX); // 获取差值
		         var distanceY = Math.abs(startY - endY);
		         if (distanceX > 30 && distanceX / distanceY > 3) {    //当差值大于30说明有方向的变化
		            if (startX > endX) {
			            var s = t($('li.slide-next')).index();
//			            console.log(s);
			            if (s > -1) {
			            	e.autoplay_clear(),
			            	e.change_slide("click", s)
			            }		            
		            }
		            else {
		            	var s = t($('li.slide-prev')).index();
//		            	console.log(s);
		            	if (s < 28){
		            		e.autoplay_clear(),
			            	e.change_slide("click", s)
		            	}        
		            }
		          }
		    });
		    
		    $(window).resize(function(i){
				e.change_timeline()
			});
			
			$(".timeline-dots-wrap").mousewheel(function(event, delta) {
		      	this.scrollLeft -= (delta * 30);
		      	event.preventDefault();
		   });
        },
        autoplay: function() {
            var t = this;
            t.autoplay_clear(),
            t.initials.autoPlayTimer = setInterval(function() {
                t.change_slide()
            },
            t.options.autoplaySpeed)
        },
        autoplay_init: function() {
            var t = this;
            t.options.autoplay && t.autoplay()
        },
        content_pause: function(e) {
            var i, s = this;
            i = "dots" === e ? s.wrapClass + " ." + s.options.dotsClass: s.wrapClass + " ." + s.options.itemClass,
            t(document.body).on("mouseenter", i,
            function(t) {
                s.autoplay_clear()
            }),
            t(document.body).on("mouseleave", i,
            function(t) {
                s.autoplay_init()
            })
        },
        autoplay_clear: function() {
            var t = this;
            t.initials.autoPlayTimer && clearInterval(t.initials.autoPlayTimer)
        },
        change_slide: function(t, e) {
            var i = this;
            t || (t = "load"),
            "click" === t ? (i.options.startItem = e, i.autoplay_init()) : i.get_count() - 1 > i.get_current() && 0 === i.initials.direction ? i.options.startItem = i.get_next() : i.get_current() > 0 && 1 === i.initials.direction ? i.options.startItem = i.get_next() : i.autoplay_clear(),
            i.change_timeline()
            $('.pre-scrollable').animate({scrollTop:0},10);
        },
        move_slide: function(e) {
            var i, s, a = this,
            o = t(a.wrapClass + " .timeline-list-wrap"),
            n = t(a.wrapClass + " ." + a.options.itemClass);
            "vertical" === e ? (i = t(a.wrapClass + " .timeline-list").height(), s = n.outerHeight() * a.get_count(), o.height(s)) : (i = t(a.wrapClass + " .timeline-list").width(), s = n.outerWidth() * a.get_count(), o.width(s));
            var l = -(i * a.get_current());
            "vertical" === e ? o.css({
                transform: "translate3d(0px," + l + "px, 0px)"
            }) : o.css({
                transform: "translate3d(" + l + "px, 0px, 0px)"
            })
        },
        timelime_calculations: function() {
            var t = this;
            "vertical" === t.options.mode ? t.move_slide("vertical") : t.move_slide("horizontal")
        },
        move_dots: function(e) {
            var i, s, a = this,
            o = t(a.wrapClass + " .timeline-dots-wrap"),
            n = t(a.wrapClass + " .timeline-dots li"),
            l = t(a.wrapClass + " .timeline-dots");
            "vertical" === e ? (i = n.outerHeight(!0), s = o.height()) : (i = n.outerWidth(!0), s = o.width());
            var r = i * a.get_current() - (s / 2),
            p = i * a.get_count();          
//          "vertical" === e ? (l.height(p), l.css({
//              transform: "translate3d(0px," + r + "px, 0px)"
//          })) : (l.width(p), l.css({
//              transform: "translate3d(" + r + "px, 0px, 0px)"
//          }))  
			"vertical" === e ? (l.height(p),  $(".timeline-dots-wrap").animate({scrollTop:r}, 500)) 
					: (l.width(p),  $(".timeline-dots-wrap").animate({scrollLeft:r}, 500)) 
        },
        dots_calculations: function() {
            var t = this;
            "vertical" === t.options.mode ? t.move_dots("vertical") : t.move_dots("horizontal"),
            t.dots_position()
        },
        dots_position: function() {
            var e = this,
            i = t(e.wrapClass + " .timeline-dots-wrap");
            "vertical" === e.options.mode ? "right" === e.options.dotsPosition ? i.addClass("right") : i.addClass("left") : "top" === e.options.dotsPosition ? i.addClass("top") : i.addClass("bottom")
        },
        build_out: function() {
            var e = this;
            e.$elem.addClass("timeline-" + e.options.mode).addClass("timeline-initialized"),
            e.$elem.children().addClass(e.options.itemClass),
            e.$elem.children().wrapAll('<div class="timeline-list-wrap"/>').parent(),
            e.$elem.children().wrap('<div class="timeline-list"/>').parent(),
            t("." + e.options.itemClass, e.$elem).eq(e.get_current()).addClass(e.options.activeClass),
            e.timelime_calculations(),
            e.update_ui()
        },
        build_dots: function() {
            var e, s, a = this;
            for (e = t("<ul />").addClass("timeline-dots"), i = 0; i <= a.get_count() - 1; i += 1) s = t(a.wrapClass + " ." + a.options.itemClass).eq(i).data("time"),
            e.append(t("<li />").append(a.options.customPaging.call(this, a, s)));
            a.$dots = e.appendTo(a.$elem),
            t(a.wrapClass + " .timeline-dots").wrapAll('<div class="timeline-dots-wrap"/>').parent(),
            a.dots_calculations(),
            a.update_ui()
        },
        update_ui: function() {
            var e = this,
            i = t("." + e.options.itemClass, e.$elem),
            s = t(e.dotsItem);
            i.removeClass(e.options.activeClass).removeClass(e.options.prevClass).removeClass(e.options.nextClass),
            i.eq(e.get_current()).addClass(e.options.activeClass),
            i.eq(e.get_prev()).addClass(e.options.prevClass),
            i.eq(e.get_next()).addClass(e.options.nextClass),
            s.removeClass(e.options.activeClass).removeClass(e.options.prevClass).removeClass(e.options.nextClass),
            s.eq(e.get_current()).addClass(e.options.activeClass),
            s.eq(e.get_prev()).addClass(e.options.prevClass),
            s.eq(e.get_next()).addClass(e.options.nextClass)
        },
        change_timeline: function() {
            var t = this;
            t.timelime_calculations(),
            t.dots_calculations(),
            t.update_ui()
        }
    },
    t.fn.Timeline = function(e) {
        return this.each(function() {
            var i = Object.create(Timeline);
            i.init(e, this),
            t.data(this, "timeline", i)
        })
    },
    t.fn.Timeline.options = {
        autoplay: !1,
        autoplaySpeed: 3e3,
        mode: "horizontal",
        itemClass: "timeline-item",
        dotsClass: "timeline-dots",
        activeClass: "slide-active",
        prevClass: "slide-prev",
        nextClass: "slide-next",
        startItem: "first",
        dotsPosition: "bottom",
        pauseOnHover: !0,
        pauseOnDotsHover: !1,
        customPaging: function(e, i) {
            return t('<button type="button" role="button" />').text(i)
        }
    }
} (jQuery, window, document);
