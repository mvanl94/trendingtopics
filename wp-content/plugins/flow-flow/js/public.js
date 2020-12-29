window.FF_DEBUG = -1 !== location.href.indexOf("debug=1"), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e) {
            if (null == this) throw new TypeError('"this" is null or not defined');
            var t = Object(this),
                i = t.length >>> 0;
            if ("function" != typeof e) throw new TypeError("predicate must be a function");
            for (var s = arguments[1], n = 0; n < i;) {
                var o = t[n];
                if (e.call(s, o, n, t)) return o;
                n++
            }
        },
        configurable: !0,
        writable: !0
    }),
    function(i) {
        "function" == typeof define && define.amd ? define(["jquery"], i) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
            return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), i(t), t
        } : i(jQuery)
    }(function(p) {
        "use strict";
        var t = p(document),
            a = p(window),
            d = "selectric",
            i = ".sl",
            s = ["a", "e", "i", "o", "u", "n", "c", "y"],
            n = [/[\xE0-\xE5]/g, /[\xE8-\xEB]/g, /[\xEC-\xEF]/g, /[\xF2-\xF6]/g, /[\xF9-\xFC]/g, /[\xF1]/g, /[\xE7]/g, /[\xFD-\xFF]/g],
            o = function(e, t) {
                var i = this;
                i.element = e, i.$element = p(e), i.state = {
                    multiple: !!i.$element.attr("multiple"),
                    enabled: !1,
                    opened: !1,
                    currValue: -1,
                    selectedIdx: -1,
                    highlightedIdx: -1
                }, i.eventTriggers = {
                    open: i.open,
                    close: i.close,
                    destroy: i.destroy,
                    refresh: i.refresh,
                    init: i.init
                }, i.init(t)
            };
        o.prototype = {
            utils: {
                isMobile: function() {
                    return /android|ip(hone|od|ad)/i.test(navigator.userAgent)
                },
                escapeRegExp: function(e) {
                    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                },
                replaceDiacritics: function(e) {
                    for (var t = n.length; t--;) e = e.toLowerCase().replace(n[t], s[t]);
                    return e
                },
                format: function(e) {
                    var s = arguments;
                    return ("" + e).replace(/\{(?:(\d+)|(\w+))\}/g, function(e, t, i) {
                        return i && s[1] ? s[1][i] : s[t]
                    })
                },
                nextEnabledItem: function(e, t) {
                    for (; e[t = (t + 1) % e.length].disabled;);
                    return t
                },
                previousEnabledItem: function(e, t) {
                    for (; e[t = (0 < t ? t : e.length) - 1].disabled;);
                    return t
                },
                toDash: function(e) {
                    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
                },
                triggerCallback: function(e, t) {
                    var i = t.element,
                        s = t.options["on" + e],
                        n = [i].concat([].slice.call(arguments).slice(1));
                    p.isFunction(s) && s.apply(i, n), p(i).trigger(d + "-" + this.toDash(e), n)
                },
                arrayToClassname: function(e) {
                    var t = p.grep(e, function(e) {
                        return !!e
                    });
                    return p.trim(t.join(" "))
                }
            },
            init: function(e) {
                var t = this;
                if (t.options = p.extend(!0, {}, p.fn[d].defaults, t.options, e), t.utils.triggerCallback("BeforeInit", t), t.destroy(!0), t.options.disableOnMobile && t.utils.isMobile()) t.disableOnMobile = !0;
                else {
                    t.classes = t.getClassNames();
                    var i = p("<input/>", {
                            class: t.classes.input,
                            readonly: t.utils.isMobile()
                        }),
                        s = p("<div/>", {
                            class: t.classes.items,
                            tabindex: -1
                        }),
                        n = p("<div/>", {
                            class: t.classes.scroll
                        }),
                        o = p("<div/>", {
                            class: t.classes.prefix,
                            html: t.options.arrowButtonMarkup
                        }),
                        r = p("<span/>", {
                            class: "label"
                        }),
                        a = t.$element.wrap("<div/>").parent().append(o.prepend(r), s, i),
                        l = p("<div/>", {
                            class: t.classes.hideselect
                        });
                    t.elements = {
                        input: i,
                        items: s,
                        itemsScroll: n,
                        wrapper: o,
                        label: r,
                        outerWrapper: a
                    }, t.options.nativeOnMobile && t.utils.isMobile() && (t.elements.input = void 0, l.addClass(t.classes.prefix + "-is-native"), t.$element.on("change", function() {
                        t.refresh()
                    })), t.$element.on(t.eventTriggers).wrap(l), t.originalTabindex = t.$element.prop("tabindex"), t.$element.prop("tabindex", -1), t.populate(), t.activate(), t.utils.triggerCallback("Init", t)
                }
            },
            activate: function() {
                var e = this,
                    t = e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),
                    i = e.$element.width();
                t.removeClass(e.classes.tempshow), e.utils.triggerCallback("BeforeActivate", e), e.elements.outerWrapper.prop("class", e.utils.arrayToClassname([e.classes.wrapper, e.$element.prop("class").replace(/\S+/g, e.classes.prefix + "-$&"), e.options.responsive ? e.classes.responsive : ""])), e.options.inheritOriginalWidth && 0 < i && e.elements.outerWrapper.width(i), e.unbindEvents(), e.$element.prop("disabled") ? (e.elements.outerWrapper.addClass(e.classes.disabled), e.elements.input && e.elements.input.prop("disabled", !0)) : (e.state.enabled = !0, e.elements.outerWrapper.removeClass(e.classes.disabled), e.$li = e.elements.items.removeAttr("style").find("li"), e.bindEvents()), e.utils.triggerCallback("Activate", e)
            },
            getClassNames: function() {
                var s = this,
                    n = s.options.customClass,
                    o = {};
                return p.each("Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Scroll Group GroupLabel".split(" "), function(e, t) {
                    var i = n.prefix + t;
                    o[t.toLowerCase()] = n.camelCase ? i : s.utils.toDash(i)
                }), o.prefix = n.prefix, o
            },
            setLabel: function() {
                var i = this,
                    t = i.options.labelBuilder;
                if (i.state.multiple) {
                    var e = p.isArray(i.state.currValue) ? i.state.currValue : [i.state.currValue];
                    e = 0 === e.length ? [0] : e;
                    var s = p.map(e, function(t) {
                        return p.grep(i.lookupItems, function(e) {
                            return e.index === t
                        })[0]
                    });
                    s = p.grep(s, function(e) {
                        return 1 < s.length || 0 === s.length ? "" !== p.trim(e.value) : e
                    }), s = p.map(s, function(e) {
                        return p.isFunction(t) ? t(e) : i.utils.format(t, e)
                    }), i.options.multiple.maxLabelEntries && (s.length >= i.options.multiple.maxLabelEntries + 1 ? (s = s.slice(0, i.options.multiple.maxLabelEntries)).push(p.isFunction(t) ? t({
                        text: "..."
                    }) : i.utils.format(t, {
                        text: "..."
                    })) : s.slice(s.length - 1)), i.elements.label.html(s.join(i.options.multiple.separator))
                } else {
                    var n = i.lookupItems[i.state.currValue];
                    i.elements.label.html(p.isFunction(t) ? t(n) : i.utils.format(t, n))
                }
            },
            populate: function() {
                var s = this,
                    e = s.$element.children(),
                    t = s.$element.find("option"),
                    i = t.filter(":selected"),
                    n = t.index(i),
                    o = 0,
                    r = s.state.multiple ? [] : 0;
                1 < i.length && s.state.multiple && (n = [], i.each(function() {
                    n.push(p(this).index())
                })), s.state.currValue = ~n ? n : r, s.state.selectedIdx = s.state.currValue, s.state.highlightedIdx = s.state.currValue, s.items = [], s.lookupItems = [], e.length && (e.each(function(e) {
                    var t = p(this);
                    if (t.is("optgroup")) {
                        var i = {
                            element: t,
                            label: t.prop("label"),
                            groupDisabled: t.prop("disabled"),
                            items: []
                        };
                        t.children().each(function(e) {
                            var t = p(this);
                            i.items[e] = s.getItemData(o, t, i.groupDisabled || t.prop("disabled")), s.lookupItems[o] = i.items[e], o++
                        }), s.items[e] = i
                    } else s.items[e] = s.getItemData(o, t, t.prop("disabled")), s.lookupItems[o] = s.items[e], o++
                }), s.setLabel(), s.elements.items.append(s.elements.itemsScroll.html(s.getItemsMarkup(s.items))))
            },
            getItemData: function(e, t, i) {
                return {
                    index: e,
                    element: t,
                    value: t.val(),
                    className: t.prop("class"),
                    text: t.html(),
                    slug: p.trim(this.utils.replaceDiacritics(t.html())),
                    selected: t.prop("selected"),
                    disabled: i
                }
            },
            getItemsMarkup: function(e) {
                var i = this,
                    s = "<ul>";
                return p.isFunction(i.options.listBuilder) && i.options.listBuilder && (e = i.options.listBuilder(e)), p.each(e, function(e, t) {
                    void 0 !== t.label ? (s += i.utils.format('<ul class="{1}"><li class="{2}">{3}</li>', i.utils.arrayToClassname([i.classes.group, t.groupDisabled ? "disabled" : "", t.element.prop("class")]), i.classes.grouplabel, t.element.prop("label")), p.each(t.items, function(e, t) {
                        s += i.getItemMarkup(t.index, t)
                    }), s += "</ul>") : s += i.getItemMarkup(t.index, t)
                }), s + "</ul>"
            },
            getItemMarkup: function(e, t) {
                var i = this,
                    s = i.options.optionsItemBuilder,
                    n = {
                        value: t.value,
                        text: t.text,
                        slug: t.slug,
                        index: t.index
                    };
                return i.utils.format('<li data-index="{1}" class="{2}">{3}</li>', e, i.utils.arrayToClassname([t.className, e === i.items.length - 1 ? "last" : "", t.disabled ? "disabled" : "", t.selected ? "selected" : ""]), p.isFunction(s) ? i.utils.format(s(t), t) : i.utils.format(s, n))
            },
            unbindEvents: function() {
                this.elements.wrapper.add(this.$element).add(this.elements.outerWrapper).add(this.elements.input).off(i)
            },
            bindEvents: function() {
                var s = this;
                s.elements.outerWrapper.on("mouseenter.sl mouseleave" + i, function(e) {
                    p(this).toggleClass(s.classes.hover, "mouseenter" === e.type), s.options.openOnHover && (clearTimeout(s.closeTimer), "mouseleave" === e.type ? s.closeTimer = setTimeout(p.proxy(s.close, s), s.options.hoverIntentTimeout) : s.open())
                }), s.elements.wrapper.on("click" + i, function(e) {
                    s.state.opened ? s.close() : s.open(e)
                }), s.options.nativeOnMobile && s.utils.isMobile() || (s.$element.on("focus" + i, function() {
                    s.elements.input.focus()
                }), s.elements.input.prop({
                    tabindex: s.originalTabindex,
                    disabled: !1
                }).on("keydown" + i, p.proxy(s.handleKeys, s)).on("focusin" + i, function(e) {
                    s.elements.outerWrapper.addClass(s.classes.focus), s.elements.input.one("blur", function() {
                        s.elements.input.blur()
                    }), s.options.openOnFocus && !s.state.opened && s.open(e)
                }).on("focusout" + i, function() {
                    s.elements.outerWrapper.removeClass(s.classes.focus)
                }).on("input propertychange", function() {
                    var e = s.elements.input.val(),
                        i = new RegExp("^" + s.utils.escapeRegExp(e), "i");
                    clearTimeout(s.resetStr), s.resetStr = setTimeout(function() {
                        s.elements.input.val("")
                    }, s.options.keySearchTimeout), e.length && p.each(s.items, function(e, t) {
                        (!t.disabled && i.test(t.text) || i.test(t.slug)) && s.highlight(e)
                    })
                })), s.$li.on({
                    mousedown: function(e) {
                        e.preventDefault(), e.stopPropagation()
                    },
                    click: function() {
                        return s.select(p(this).data("index")), !1
                    }
                })
            },
            handleKeys: function(e) {
                var t = this,
                    i = e.which,
                    s = t.options.keys,
                    n = -1 < p.inArray(i, s.previous),
                    o = -1 < p.inArray(i, s.next),
                    r = -1 < p.inArray(i, s.select),
                    a = -1 < p.inArray(i, s.open),
                    l = t.state.highlightedIdx,
                    d = n && 0 === l || o && l + 1 === t.items.length,
                    c = 0;
                if (13 !== i && 32 !== i || e.preventDefault(), n || o) {
                    if (!t.options.allowWrap && d) return;
                    n && (c = t.utils.previousEnabledItem(t.lookupItems, l)), o && (c = t.utils.nextEnabledItem(t.lookupItems, l)), t.highlight(c)
                }
                return r && t.state.opened ? (t.select(l), void(t.state.multiple && t.options.multiple.keepMenuOpen || t.close())) : void(a && !t.state.opened && t.open())
            },
            refresh: function() {
                this.populate(), this.activate(), this.utils.triggerCallback("Refresh", this)
            },
            setOptionsDimensions: function() {
                var e = this,
                    t = e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),
                    i = e.options.maxHeight,
                    s = e.elements.items.outerWidth(),
                    n = e.elements.wrapper.outerWidth() - (s - e.elements.items.width());
                !e.options.expandToItemText || s < n ? e.finalWidth = n : (e.elements.items.css("overflow", "scroll"), e.elements.outerWrapper.width(9e4), e.finalWidth = e.elements.items.width(), e.elements.items.css("overflow", ""), e.elements.outerWrapper.width("")), e.elements.items.width(e.finalWidth).height() > i && e.elements.items.height(i), t.removeClass(e.classes.tempshow)
            },
            isInViewport: function() {
                var e = this,
                    t = a.scrollTop(),
                    i = a.height(),
                    s = e.elements.outerWrapper.offset().top,
                    n = s + e.elements.outerWrapper.outerHeight() + e.itemsHeight <= t + i,
                    o = s - e.itemsHeight > t,
                    r = !n && o;
                e.elements.outerWrapper.toggleClass(e.classes.above, r)
            },
            detectItemVisibility: function(e) {
                var t = this,
                    i = t.$li.filter("[data-index]");
                t.state.multiple && (e = p.isArray(e) && 0 === e.length ? 0 : e, e = p.isArray(e) ? Math.min.apply(Math, e) : e);
                var s = i.eq(e).outerHeight(),
                    n = i[e].offsetTop,
                    o = t.elements.itemsScroll.scrollTop(),
                    r = n + 2 * s;
                t.elements.itemsScroll.scrollTop(r > o + t.itemsHeight ? r - t.itemsHeight : n - s < o ? n - s : o)
            },
            open: function(e) {
                var n = this;
                return (!n.options.nativeOnMobile || !n.utils.isMobile()) && (n.utils.triggerCallback("BeforeOpen", n), e && (e.preventDefault(), n.options.stopPropagation && e.stopPropagation()), void(n.state.enabled && (n.setOptionsDimensions(), p("." + n.classes.hideselect, "." + n.classes.open).children()[d]("close"), n.state.opened = !0, n.itemsHeight = n.elements.items.outerHeight(), n.itemsInnerHeight = n.elements.items.height(), n.elements.outerWrapper.addClass(n.classes.open), n.elements.input.val(""), e && "focusin" !== e.type && n.elements.input.focus(), setTimeout(function() {
                    t.on("click" + i, p.proxy(n.close, n)).on("scroll" + i, p.proxy(n.isInViewport, n))
                }, 1), n.isInViewport(), n.options.preventWindowScroll && t.on("mousewheel.sl DOMMouseScroll" + i, "." + n.classes.scroll, function(e) {
                    var t = e.originalEvent,
                        i = p(this).scrollTop(),
                        s = 0;
                    "detail" in t && (s = -1 * t.detail), "wheelDelta" in t && (s = t.wheelDelta), "wheelDeltaY" in t && (s = t.wheelDeltaY), "deltaY" in t && (s = -1 * t.deltaY), (i === this.scrollHeight - n.itemsInnerHeight && s < 0 || 0 === i && 0 < s) && e.preventDefault()
                }), n.detectItemVisibility(n.state.selectedIdx), n.highlight(n.state.multiple ? -1 : n.state.selectedIdx), n.utils.triggerCallback("Open", n))))
            },
            close: function() {
                var e = this;
                e.utils.triggerCallback("BeforeClose", e), t.off(i), e.elements.outerWrapper.removeClass(e.classes.open), e.state.opened = !1, e.utils.triggerCallback("Close", e)
            },
            change: function() {
                var i = this;
                i.utils.triggerCallback("BeforeChange", i), i.state.multiple ? (p.each(i.lookupItems, function(e) {
                    i.lookupItems[e].selected = !1, i.$element.find("option").prop("selected", !1)
                }), p.each(i.state.selectedIdx, function(e, t) {
                    i.lookupItems[t].selected = !0, i.$element.find("option").eq(t).prop("selected", !0)
                }), i.state.currValue = i.state.selectedIdx, i.setLabel(), i.utils.triggerCallback("Change", i)) : i.state.currValue !== i.state.selectedIdx && (i.$element.prop("selectedIndex", i.state.currValue = i.state.selectedIdx).data("value", i.lookupItems[i.state.selectedIdx].text), i.setLabel(), i.utils.triggerCallback("Change", i))
            },
            highlight: function(e) {
                var t = this,
                    i = t.$li.filter("[data-index]").removeClass("highlighted");
                t.utils.triggerCallback("BeforeHighlight", t), void 0 === e || -1 === e || t.lookupItems[e].disabled || (i.eq(t.state.highlightedIdx = e).addClass("highlighted"), t.detectItemVisibility(e), t.utils.triggerCallback("Highlight", t))
            },
            select: function(e) {
                var t = this,
                    i = t.$li.filter("[data-index]");
                if (t.utils.triggerCallback("BeforeSelect", t, e), void 0 !== e && -1 !== e && !t.lookupItems[e].disabled) {
                    if (t.state.multiple) {
                        t.state.selectedIdx = p.isArray(t.state.selectedIdx) ? t.state.selectedIdx : [t.state.selectedIdx];
                        var s = p.inArray(e, t.state.selectedIdx); - 1 !== s ? t.state.selectedIdx.splice(s, 1) : t.state.selectedIdx.push(e), i.removeClass("selected").filter(function(e) {
                            return -1 !== p.inArray(e, t.state.selectedIdx)
                        }).addClass("selected")
                    } else i.removeClass("selected").eq(t.state.selectedIdx = e).addClass("selected");
                    t.state.multiple && t.options.multiple.keepMenuOpen || t.close(), t.change(), t.utils.triggerCallback("Select", t, e)
                }
            },
            destroy: function(e) {
                var t = this;
                t.state && t.state.enabled && (t.elements.items.add(t.elements.wrapper).add(t.elements.input).remove(), e || t.$element.removeData(d).removeData("value"), t.$element.prop("tabindex", t.originalTabindex).off(i).off(t.eventTriggers).unwrap().unwrap(), t.state.enabled = !1)
            }
        }, p.fn[d] = function(t) {
            return this.each(function() {
                var e = p.data(this, d);
                e && !e.disableOnMobile ? "string" == typeof t && e[t] ? e[t]() : e.init(t) : p.data(this, d, new o(this, t))
            })
        }, p.fn[d].defaults = {
            onChange: function(e) {
                p(e).change()
            },
            maxHeight: 300,
            keySearchTimeout: 500,
            arrowButtonMarkup: '<b class="button">&#x25be;</b>',
            disableOnMobile: !1,
            nativeOnMobile: !0,
            openOnFocus: !0,
            openOnHover: !1,
            hoverIntentTimeout: 500,
            expandToItemText: !1,
            responsive: !1,
            preventWindowScroll: !0,
            inheritOriginalWidth: !1,
            allowWrap: !0,
            stopPropagation: !0,
            optionsItemBuilder: "{text}",
            labelBuilder: "{text}",
            listBuilder: !1,
            keys: {
                previous: [37, 38],
                next: [39, 40],
                select: [9, 13, 27],
                open: [13, 32, 37, 38, 39, 40],
                close: [9, 27]
            },
            customClass: {
                prefix: d,
                camelCase: !1
            },
            multiple: {
                separator: ", ",
                keepMenuOpen: !0,
                maxLabelEntries: !1
            }
        }
    }),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(d) {
        "use strict";
        var n, r = window.Slick || {};
        n = 0, (r = function(e, t) {
            var i, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: d(e),
                appendDots: d(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return d('<button type="button" data-role="none" role="button" tabindex="0" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots slick-nav",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, d.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = d(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, i = d(e).data("slick") || {}, s.options = d.extend({}, s.defaults, t, i), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, void 0 !== document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = d.proxy(s.autoPlay, s), s.autoPlayClear = d.proxy(s.autoPlayClear, s), s.autoPlayIterator = d.proxy(s.autoPlayIterator, s), s.changeSlide = d.proxy(s.changeSlide, s), s.clickHandler = d.proxy(s.clickHandler, s), s.selectHandler = d.proxy(s.selectHandler, s), s.setPosition = d.proxy(s.setPosition, s), s.swipeHandler = d.proxy(s.swipeHandler, s), s.dragHandler = d.proxy(s.dragHandler, s), s.keyHandler = d.proxy(s.keyHandler, s), s.instanceUid = n++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
        }).prototype.activateADA = function() {
            this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, r.prototype.addSlide = r.prototype.slickAdd = function(e, t, i) {
            var s = this;
            if ("boolean" == typeof t) i = t, t = null;
            else if (t < 0 || t >= s.slideCount) return !1;
            s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? d(e).appendTo(s.$slideTrack) : i ? d(e).insertBefore(s.$slides.eq(t)) : d(e).insertAfter(s.$slides.eq(t)) : !0 === i ? d(e).prependTo(s.$slideTrack) : d(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
                d(t).attr("data-slick-index", e)
            }), s.$slidesCache = s.$slides, s.reinit()
        }, r.prototype.animateHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({
                    height: t
                }, e.options.speed)
            }
        }, r.prototype.animateSlide = function(e, t) {
            var i = {},
                s = this;
            s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                left: e
            }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
                top: e
            }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), d({
                animStart: s.currentLeft
            }).animate({
                animStart: e
            }, {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function(e) {
                    e = Math.ceil(e), !1 === s.options.vertical ? i[s.animType] = "translate(" + e + "px, 0px)" : i[s.animType] = "translate(0px," + e + "px)", s.$slideTrack.css(i)
                },
                complete: function() {
                    t && t.call()
                }
            })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? i[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(i), t && setTimeout(function() {
                s.disableTransition(), t.call()
            }, s.options.speed))
        }, r.prototype.getNavTarget = function() {
            var e = this.options.asNavFor;
            return e && null !== e && (e = d(e).not(this.$slider)), e
        }, r.prototype.asNavFor = function(t) {
            var e = this.getNavTarget();
            null !== e && "object" == typeof e && e.each(function() {
                var e = d(this).slick("getSlick");
                e.unslicked || e.slideHandler(t, !0)
            })
        }, r.prototype.applyTransition = function(e) {
            var t = this,
                i = {};
            !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
        }, r.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, r.prototype.autoPlayClear = function() {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer)
        }, r.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
        }, r.prototype.buildArrows = function() {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = d(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = d(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, r.prototype.buildDots = function() {
            var e, t, i = this;
            if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
                for (i.$slider.addClass("slick-dotted"), t = d("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) t.append(d("<li />").append(i.options.customPaging.call(this, i, e)));
                i.$dots = t.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, r.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                d(t).attr("data-slick-index", e).data("originalStyling", d(t).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? d('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (!0 === e.options.centerMode || !0 === e.options.swipeToSlide) && (e.options.slidesToScroll = 1), d("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, r.prototype.buildRows = function() {
            var e, t, i, s, n, o, r, a = this;
            if (s = document.createDocumentFragment(), o = a.$slider.children(), 1 < a.options.rows) {
                for (r = a.options.slidesPerRow * a.options.rows, n = Math.ceil(o.length / r), e = 0; e < n; e++) {
                    var l = document.createElement("div");
                    for (t = 0; t < a.options.rows; t++) {
                        var d = document.createElement("div");
                        for (i = 0; i < a.options.slidesPerRow; i++) {
                            var c = e * r + (t * a.options.slidesPerRow + i);
                            o.get(c) && d.appendChild(o.get(c))
                        }
                        l.appendChild(d)
                    }
                    s.appendChild(l)
                }
                a.$slider.empty().append(s), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, r.prototype.checkResponsive = function(e, t) {
            var i, s, n, o = this,
                r = !1,
                a = o.$slider.width(),
                l = window.innerWidth || d(window).width();
            if ("window" === o.respondTo ? n = l : "slider" === o.respondTo ? n = a : "min" === o.respondTo && (n = Math.min(l, a)), o.options.responsive && o.options.responsive.length && null !== o.options.responsive) {
                for (i in s = null, o.breakpoints) o.breakpoints.hasOwnProperty(i) && (!1 === o.originalSettings.mobileFirst ? n < o.breakpoints[i] && (s = o.breakpoints[i]) : n > o.breakpoints[i] && (s = o.breakpoints[i]));
                null !== s ? null !== o.activeBreakpoint ? (s !== o.activeBreakpoint || t) && (o.activeBreakpoint = s, "unslick" === o.breakpointSettings[s] ? o.unslick(s) : (o.options = d.extend({}, o.originalSettings, o.breakpointSettings[s]), !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e)), r = s) : (o.activeBreakpoint = s, "unslick" === o.breakpointSettings[s] ? o.unslick(s) : (o.options = d.extend({}, o.originalSettings, o.breakpointSettings[s]), !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e)), r = s) : null !== o.activeBreakpoint && (o.activeBreakpoint = null, o.options = o.originalSettings, !0 === e && (o.currentSlide = o.options.initialSlide), o.refresh(e), r = s), e || !1 === r || o.$slider.trigger("breakpoint", [o, r])
            }
        }, r.prototype.changeSlide = function(e, t) {
            var i, s, n = this,
                o = d(e.currentTarget);
            switch (o.is("a") && e.preventDefault(), o.is("li") || (o = o.closest("li")), i = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
                case "previous":
                    s = 0 === i ? n.options.slidesToScroll : n.options.slidesToShow - i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - s, !1, t);
                    break;
                case "next":
                    s = 0 === i ? n.options.slidesToScroll : i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + s, !1, t);
                    break;
                case "index":
                    var r = 0 === e.data.index ? 0 : e.data.index || o.index() * n.options.slidesToScroll;
                    n.slideHandler(n.checkNavigable(r), !1, t), o.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, r.prototype.checkNavigable = function(e) {
            var t, i;
            if (i = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
            else
                for (var s in t) {
                    if (e < t[s]) {
                        e = i;
                        break
                    }
                    i = t[s]
                }
            return e
        }, r.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && d("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", d.proxy(e.interrupt, e, !0)).off("mouseleave.slick", d.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), d(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().off("click.slick", e.selectHandler), d(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), d(window).off("resize.slick.slick-" + e.instanceUid, e.resize), d("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), d(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), d(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, r.prototype.cleanUpSlideEvents = function() {
            var e = this;
            e.$list.off("mouseenter.slick", d.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", d.proxy(e.interrupt, e, !1))
        }, r.prototype.cleanUpRows = function() {
            var e;
            1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e))
        }, r.prototype.clickHandler = function(e) {
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, r.prototype.destroy = function(e) {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), d(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                d(this).attr("style", d(this).data("originalStyling"))
            }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
        }, r.prototype.disableTransition = function(e) {
            var t = {};
            t[this.transitionType] = "", !1 === this.options.fade ? this.$slideTrack.css(t) : this.$slides.eq(e).css(t)
        }, r.prototype.fadeSlide = function(e, t) {
            var i = this;
            !1 === i.cssTransitions ? (i.$slides.eq(e).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(e).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), t && setTimeout(function() {
                i.disableTransition(e), t.call()
            }, i.options.speed))
        }, r.prototype.fadeSlideOut = function(e) {
            var t = this;
            !1 === t.cssTransitions ? t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, r.prototype.filterSlides = r.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
        }, r.prototype.focusHandler = function() {
            var i = this;
            i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(e) {
                e.stopImmediatePropagation();
                var t = d(this);
                setTimeout(function() {
                    i.options.pauseOnFocus && (i.focussed = t.is(":focus"), i.autoPlay())
                }, 0)
            })
        }, r.prototype.getCurrent = r.prototype.slickCurrentSlide = function() {
            return this.currentSlide
        }, r.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                i = 0,
                s = 0;
            if (!0 === e.options.infinite)
                for (; t < e.slideCount;) ++s, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else if (!0 === e.options.centerMode) s = e.slideCount;
            else if (e.options.asNavFor)
                for (; t < e.slideCount;) ++s, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else s = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
            return s - 1
        }, r.prototype.getLeft = function(e) {
            var t, i, s, n = this,
                o = 0;
            return n.slideOffset = 0, i = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, o = i * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll != 0 && e + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (e > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1, o = (n.options.slidesToShow - (e - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, o = n.slideCount % n.options.slidesToScroll * i * -1))) : e + n.options.slidesToShow > n.slideCount && (n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth, o = (e + n.options.slidesToShow - n.slideCount) * i), n.slideCount <= n.options.slidesToShow && (o = n.slideOffset = 0), !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), t = !1 === n.options.vertical ? e * n.slideWidth * -1 + n.slideOffset : e * i * -1 + o, !0 === n.options.variableWidth && (s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow), t = !0 === n.options.rtl ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, !0 === n.options.centerMode && (s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1), t = !0 === n.options.rtl ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, t += (n.$list.width() - s.outerWidth()) / 2)), t
        }, r.prototype.getOption = r.prototype.slickGetOption = function(e) {
            return this.options[e]
        }, r.prototype.getNavigableIndexes = function() {
            var e, t = this,
                i = 0,
                s = 0,
                n = [];
            for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll, s = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); i < e;) n.push(i), i = s + t.options.slidesToScroll, s += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return n
        }, r.prototype.getSlick = function() {
            return this
        }, r.prototype.getSlideCount = function() {
            var i, s, n = this;
            return s = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(e, t) {
                return t.offsetLeft - s + d(t).outerWidth() / 2 > -1 * n.swipeLeft ? (i = t, !1) : void 0
            }), Math.abs(d(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
        }, r.prototype.goTo = r.prototype.slickGoTo = function(e, t) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, r.prototype.init = function(e) {
            var t = this;
            d(t.$slider).hasClass("slick-initialized") || (d(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, r.prototype.initADA = function() {
            var t = this;
            t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(e) {
                d(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + t.instanceUid + e
                })
            }), null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(e) {
                d(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + t.instanceUid + e,
                    id: "slick-slide" + t.instanceUid + e
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
        }, r.prototype.initArrowEvents = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, r.prototype.initDotEvents = function() {
            var e = this;
            !0 === e.options.dots && e.slideCount > e.options.slidesToShow && d("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && d("li", e.$dots).on("mouseenter.slick", d.proxy(e.interrupt, e, !0)).on("mouseleave.slick", d.proxy(e.interrupt, e, !1))
        }, r.prototype.initSlideEvents = function() {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", d.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", d.proxy(e.interrupt, e, !1)))
        }, r.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), d(document).on(e.visibilityChange, d.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler), d(window).on("orientationchange.slick.slick-" + e.instanceUid, d.proxy(e.orientationChange, e)), d(window).on("resize.slick.slick-" + e.instanceUid, d.proxy(e.resize, e)), d("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), d(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), d(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, r.prototype.initUI = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
        }, r.prototype.keyHandler = function(e) {
            var t = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "next" : "previous"
                }
            }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "previous" : "next"
                }
            }))
        }, r.prototype.lazyLoad = function() {
            function e(e) {
                d("img[data-lazy]", e).each(function() {
                    var e = d(this),
                        t = d(this).attr("data-lazy"),
                        i = document.createElement("img");
                    i.onload = function() {
                        e.animate({
                            opacity: 0
                        }, 100, function() {
                            e.attr("src", t).animate({
                                opacity: 1
                            }, 200, function() {
                                e.removeAttr("data-lazy").removeClass("slick-loading")
                            }), s.$slider.trigger("lazyLoaded", [s, e, t])
                        })
                    }, i.onerror = function() {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, t])
                    }, i.src = t
                })
            }
            var t, i, s = this;
            !0 === s.options.centerMode ? !0 === s.options.infinite ? i = (t = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (t = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), i = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (t = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, i = Math.ceil(t + s.options.slidesToShow), !0 === s.options.fade && (0 < t && t--, i <= s.slideCount && i++)), e(s.$slider.find(".slick-slide").slice(t, i)), s.slideCount <= s.options.slidesToShow ? e(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? e(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && e(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
        }, r.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.$slideTrack.css({
                opacity: 1
            }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, r.prototype.next = r.prototype.slickNext = function() {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, r.prototype.orientationChange = function() {
            this.checkResponsive(), this.setPosition()
        }, r.prototype.pause = r.prototype.slickPause = function() {
            this.autoPlayClear(), this.paused = !0
        }, r.prototype.play = r.prototype.slickPlay = function() {
            var e = this;
            e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
        }, r.prototype.postSlide = function(e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && t.initADA())
        }, r.prototype.prev = r.prototype.slickPrev = function() {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, r.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, r.prototype.progressiveLazyLoad = function(e) {
            e = e || 1;
            var t, i, s, n = this,
                o = d("img[data-lazy]", n.$slider);
            o.length ? (t = o.first(), i = t.attr("data-lazy"), (s = document.createElement("img")).onload = function() {
                t.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"), !0 === n.options.adaptiveHeight && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, t, i]), n.progressiveLazyLoad()
            }, s.onerror = function() {
                e < 3 ? setTimeout(function() {
                    n.progressiveLazyLoad(e + 1)
                }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, t, i]), n.progressiveLazyLoad())
            }, s.src = i) : n.$slider.trigger("allImagesLoaded", [n])
        }, r.prototype.refresh = function(e) {
            var t, i, s = this;
            i = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > i && (s.currentSlide = i), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), d.extend(s, s.initials, {
                currentSlide: t
            }), s.init(), e || s.changeSlide({
                data: {
                    message: "index",
                    index: t
                }
            }, !1)
        }, r.prototype.registerBreakpoints = function() {
            var e, t, i, s = this,
                n = s.options.responsive || null;
            if ("array" === d.type(n) && n.length) {
                for (e in s.respondTo = s.options.respondTo || "window", n)
                    if (i = s.breakpoints.length - 1, t = n[e].breakpoint, n.hasOwnProperty(e)) {
                        for (; 0 <= i;) s.breakpoints[i] && s.breakpoints[i] === t && s.breakpoints.splice(i, 1), i--;
                        s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                    } s.breakpoints.sort(function(e, t) {
                    return s.options.mobileFirst ? e - t : t - e
                })
            }
        }, r.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, r.prototype.resize = function() {
            var e = this;
            d(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = d(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, r.prototype.removeSlide = r.prototype.slickRemove = function(e, t, i) {
            var s = this;
            return "boolean" == typeof e ? e = !0 === (t = e) ? 0 : s.slideCount - 1 : e = !0 === t ? --e : e, !(s.slideCount < 1 || e < 0 || e > s.slideCount - 1) && (s.unload(), !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(e).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, void s.reinit())
        }, r.prototype.setCSS = function(e) {
            var t, i, s = this,
                n = {};
            !0 === s.options.rtl && (e = -e), t = "left" == s.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == s.positionProp ? Math.ceil(e) + "px" : "0px", n[s.positionProp] = e, !1 === s.transformsEnabled || (!(n = {}) === s.cssTransitions ? n[s.animType] = "translate(" + t + ", " + i + ")" : n[s.animType] = "translate3d(" + t + ", " + i + ", 0px)"), s.$slideTrack.css(n)
        }, r.prototype.setDimensions = function() {
            var e = this;
            !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, r.prototype.setFade = function() {
            var i, s = this;
            s.$slides.each(function(e, t) {
                i = s.slideWidth * e * -1, !0 === s.options.rtl ? d(t).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: s.options.zIndex - 2,
                    opacity: 0
                }) : d(t).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: s.options.zIndex - 2,
                    opacity: 0
                })
            }), s.$slides.eq(s.currentSlide).css({
                zIndex: s.options.zIndex - 1,
                opacity: 1
            })
        }, r.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", t)
            }
        }, r.prototype.setOption = r.prototype.slickSetOption = function() {
            var e, t, i, s, n, o = this,
                r = !1;
            if ("object" === d.type(arguments[0]) ? (i = arguments[0], r = arguments[1], n = "multiple") : "string" === d.type(arguments[0]) && (i = arguments[0], s = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === d.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) o.options[i] = s;
            else if ("multiple" === n) d.each(i, function(e, t) {
                o.options[e] = t
            });
            else if ("responsive" === n)
                for (t in s)
                    if ("array" !== d.type(o.options.responsive)) o.options.responsive = [s[t]];
                    else {
                        for (e = o.options.responsive.length - 1; 0 <= e;) o.options.responsive[e].breakpoint === s[t].breakpoint && o.options.responsive.splice(e, 1), e--;
                        o.options.responsive.push(s[t])
                    } r && (o.unload(), o.reinit())
        }, r.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
        }, r.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
        }, r.prototype.setSlideClasses = function(e) {
            var t, i, s, n, o = this;
            i = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), o.$slides.eq(e).addClass("slick-current"), !0 === o.options.centerMode ? (t = Math.floor(o.options.slidesToShow / 2), !0 === o.options.infinite && (t <= e && e <= o.slideCount - 1 - t ? o.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = o.options.slidesToShow + e, i.slice(s - t + 1, s + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - o.options.slidesToShow).addClass("slick-center") : e === o.slideCount - 1 && i.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(e).addClass("slick-center")) : 0 <= e && e <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(e, e + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= o.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = o.slideCount % o.options.slidesToShow, s = !0 === o.options.infinite ? o.options.slidesToShow + e : e, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - e < o.options.slidesToShow ? i.slice(s - (o.options.slidesToShow - n), s + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === o.options.lazyLoad && o.lazyLoad()
        }, r.prototype.setupInfinite = function() {
            var e, t, i, s = this;
            if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
                for (i = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - i; e -= 1) t = e - 1, d(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < i; e += 1) t = e, d(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    d(this).attr("id", "")
                })
            }
        }, r.prototype.interrupt = function(e) {
            e || this.autoPlay(), this.interrupted = e
        }, r.prototype.selectHandler = function(e) {
            var t = this,
                i = d(e.target).is(".slick-slide") ? d(e.target) : d(e.target).parents(".slick-slide"),
                s = parseInt(i.attr("data-slick-index"));
            return s || (s = 0), t.slideCount <= t.options.slidesToShow ? (t.setSlideClasses(s), void t.asNavFor(s)) : void t.slideHandler(s)
        }, r.prototype.slideHandler = function(e, t, i) {
            var s, n, o, r, a, l = null,
                d = this;
            return t = t || !1, !0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === e || d.slideCount <= d.options.slidesToShow ? void 0 : (!1 === t && d.asNavFor(e), s = e, l = d.getLeft(s), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll) ? void(!1 === d.options.fade && (s = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
                d.postSlide(s)
            }) : d.postSlide(s))) : !1 === d.options.infinite && !0 === d.options.centerMode && (e < 0 || e > d.slideCount - d.options.slidesToScroll) ? void(!1 === d.options.fade && (s = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
                d.postSlide(s)
            }) : d.postSlide(s))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), n = s < 0 ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + s : s >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : s - d.slideCount : s, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, n]), o = d.currentSlide, d.currentSlide = n, d.setSlideClasses(d.currentSlide), d.options.asNavFor && ((a = (a = d.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), !0 === d.options.fade ? (!0 !== i ? (d.fadeSlideOut(o), d.fadeSlide(n, function() {
                d.postSlide(n)
            })) : d.postSlide(n), void d.animateHeight()) : void(!0 !== i ? d.animateSlide(l, function() {
                d.postSlide(n)
            }) : d.postSlide(n))))
        }, r.prototype.startLoad = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, r.prototype.swipeDirection = function() {
            var e, t, i, s, n = this;
            return e = n.touchObject.startX - n.touchObject.curX, t = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(t, e), (s = Math.round(180 * i / Math.PI)) < 0 && (s = 360 - Math.abs(s)), s <= 45 && 0 <= s ? !1 === n.options.rtl ? "left" : "right" : s <= 360 && 315 <= s ? !1 === n.options.rtl ? "left" : "right" : 135 <= s && s <= 225 ? !1 === n.options.rtl ? "right" : "left" : !0 === n.options.verticalSwiping ? 35 <= s && s <= 135 ? "down" : "up" : "vertical"
        }, r.prototype.swipeEnd = function(e) {
            var t, i, s = this;
            if (s.dragging = !1, s.interrupted = !1, s.shouldClick = !(10 < s.touchObject.swipeLength), void 0 === s.touchObject.curX) return !1;
            if (!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]), s.touchObject.swipeLength >= s.touchObject.minSwipe) {
                switch (i = s.swipeDirection()) {
                    case "left":
                    case "down":
                        t = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount(), s.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        t = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount(), s.currentDirection = 1
                }
                "vertical" != i && (s.slideHandler(t), s.touchObject = {}, s.$slider.trigger("swipe", [s, i]))
            } else s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide), s.touchObject = {})
        }, r.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, r.prototype.swipeMove = function(e) {
            var t, i, s, n, o, r = this;
            return o = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!r.dragging || o && 1 !== o.length) && (t = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== o ? o[0].pageX : e.clientX, r.touchObject.curY = void 0 !== o ? o[0].pageY : e.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), !0 === r.options.verticalSwiping && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), "vertical" !== (i = r.swipeDirection()) ? (void 0 !== e.originalEvent && 4 < r.touchObject.swipeLength && e.preventDefault(), n = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), !0 === r.options.verticalSwiping && (n = r.touchObject.curY > r.touchObject.startY ? 1 : -1), s = r.touchObject.swipeLength, (r.touchObject.edgeHit = !1) === r.options.infinite && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (s = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), !1 === r.options.vertical ? r.swipeLeft = t + s * n : r.swipeLeft = t + s * (r.$list.height() / r.listWidth) * n, !0 === r.options.verticalSwiping && (r.swipeLeft = t + s * n), !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
        }, r.prototype.swipeStart = function(e) {
            var t, i = this;
            return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? !(i.touchObject = {}) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(i.dragging = !0))
        }, r.prototype.unfilterSlides = r.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
        }, r.prototype.unload = function() {
            var e = this;
            d(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, r.prototype.unslick = function(e) {
            this.$slider.trigger("unslick", [this, e]), this.destroy()
        }, r.prototype.updateArrows = function() {
            var e = this;
            Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, r.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, r.prototype.visibility = function() {
            this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
        }, d.fn.slick = function() {
            var e, t, i = this,
                s = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                o = i.length;
            for (e = 0; e < o; e++)
                if ("object" == typeof s || void 0 === s ? i[e].slick = new r(i[e], s) : t = i[e].slick[s].apply(i[e].slick, n), void 0 !== t) return t;
            return i
        }
    }), window.CustomModernizr = function(e, p, o) {
        function t(e) {
            c.cssText = e
        }

        function r(e, t) {
            return typeof e === t
        }

        function a(e, t) {
            for (var i in e) {
                var s = e[i];
                if (!~("" + s).indexOf("-") && c[s] !== o) return "pfx" != t || s
            }
            return !1
        }

        function s(e, t, i) {
            var s = e.charAt(0).toUpperCase() + e.slice(1),
                n = (e + " " + g.join(s + " ") + s).split(" ");
            return r(t, "string") || r(t, "undefined") ? a(n, t) : function(e, t, i) {
                for (var s in e) {
                    var n = t[e[s]];
                    if (n !== o) return !1 === i ? e[s] : r(n, "function") ? n.bind(i || t) : n
                }
                return !1
            }(n = (e + " " + v.join(s + " ") + s).split(" "), t, i)
        }
        var i, n, l = {},
            f = p.documentElement,
            h = "modernizr",
            d = p.createElement(h),
            c = d.style,
            u = " -webkit- -moz- -o- -ms- ".split(" "),
            m = "Webkit Moz O ms",
            g = m.split(" "),
            v = m.toLowerCase().split(" "),
            w = {},
            y = [],
            b = y.slice,
            x = function(e, t, i, s) {
                var n, o, r, a, l = p.createElement("div"),
                    d = p.body,
                    c = d || p.createElement("body");
                if (parseInt(i, 10))
                    for (; i--;)(r = p.createElement("div")).id = s ? s[i] : h + (i + 1), l.appendChild(r);
                return n = ["&#173;", '<style id="s', h, '">', e, "</style>"].join(""), l.id = h, (d ? l : c).innerHTML += n, c.appendChild(l), d || (c.style.background = "", c.style.overflow = "hidden", a = f.style.overflow, f.style.overflow = "hidden", f.appendChild(c)), o = t(l, e), d ? l.parentNode.removeChild(l) : (c.parentNode.removeChild(c), f.style.overflow = a), !!o
            },
            k = {}.hasOwnProperty;
        for (var C in n = r(k, "undefined") || r(k.call, "undefined") ? function(e, t) {
                return t in e && r(e.constructor.prototype[t], "undefined")
            } : function(e, t) {
                return k.call(e, t)
            }, Function.prototype.bind || (Function.prototype.bind = function(s) {
                var n = this;
                if ("function" != typeof n) throw new TypeError;
                var o = b.call(arguments, 1),
                    r = function() {
                        if (this instanceof r) {
                            var e = function() {};
                            e.prototype = n.prototype;
                            var t = new e,
                                i = n.apply(t, o.concat(b.call(arguments)));
                            return Object(i) === i ? i : t
                        }
                        return n.apply(s, o.concat(b.call(arguments)))
                    };
                return r
            }), w.csstransforms = function() {
                return !!s("transform")
            }, w.csstransforms3d = function() {
                var i = !!s("perspective");
                return i && "webkitPerspective" in f.style && x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(e, t) {
                    i = 9 === e.offsetLeft && 3 === e.offsetHeight
                }), i
            }, w.csstransitions = function() {
                return s("transition")
            }, w) n(w, C) && (i = C.toLowerCase(), l[i] = w[C](), y.push((l[i] ? "" : "no-") + i));
        return l.addTest = function(e, t) {
            if ("object" == typeof e)
                for (var i in e) n(e, i) && l.addTest(i, e[i]);
            else {
                if (e = e.toLowerCase(), l[e] !== o) return l;
                t = "function" == typeof t ? t() : t, f.className += " " + (t ? "" : "no-") + e, l[e] = t
            }
            return l
        }, t(""), d = null, l._version = "2.6.2", l._prefixes = u, l._domPrefixes = v, l._cssomPrefixes = g, l.testProp = function(e) {
            return a([e])
        }, l.testAllProps = s, l.testStyles = x, l.prefixed = function(e, t, i) {
            return t ? s(e, t, i) : s(e, "pfx")
        }, f.className = f.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + y.join(" "), l
    }(0, this.document), window.findAndReplaceDOMText = function() {
        var i = "retain",
            v = document;

        function l() {
            return function(e, t, i, s, n) {
                if (t && !t.nodeType && arguments.length <= 2) return !1;
                var o = "function" == typeof i;
                o && (r = i, i = function(e, t) {
                    return r(e.text, t.startIndex)
                });
                var r;
                var a = d(t, {
                    find: e,
                    wrap: o ? null : i,
                    replace: o ? i : "$" + (s || "&"),
                    prepMatch: function(e, t) {
                        if (!e[0]) throw "findAndReplaceDOMText cannot handle zero-length matches";
                        if (0 < s) {
                            var i = e[s];
                            e.index += e[0].indexOf(i), e[0] = i
                        }
                        return e.endIndex = e.index + e[0].length, e.startIndex = e.index, e.index = t, e
                    },
                    filterElements: n
                });
                return l.revert = function() {
                    return a.revert()
                }, !0
            }.apply(null, arguments) || d.apply(null, arguments)
        }

        function d(e, t) {
            return new s(e, t)
        }

        function s(e, t) {
            t.portionMode = t.portionMode || i, this.node = e, this.options = t, this.prepMatch = t.prepMatch || this.prepMatch, this.reverts = [], this.matches = this.search(), this.matches.length && this.processMatches()
        }
        return (l.Finder = s).prototype = {
            search: function() {
                var e, t = 0,
                    i = this.options.find,
                    s = this.getAggregateText(),
                    n = [];
                if ((i = "string" == typeof i ? RegExp(String(i).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"), "g") : i).global)
                    for (; e = i.exec(s);) n.push(this.prepMatch(e, t++));
                else(e = s.match(i)) && n.push(this.prepMatch(e, 0));
                return n
            },
            prepMatch: function(e, t) {
                if (!e[0]) throw new Error("findAndReplaceDOMText cannot handle zero-length matches");
                return e.endIndex = e.index + e[0].length, e.startIndex = e.index, e.index = t, e
            },
            getAggregateText: function() {
                var s = this.options.filterElements;
                return function e(t) {
                    if (3 === t.nodeType) return t.data;
                    if (s && !s(t)) return "";
                    var i = "";
                    if (t = t.firstChild)
                        for (; i += e(t), t = t.nextSibling;);
                    return i
                }(this.node)
            },
            processMatches: function() {
                var e, t, i, s = this.matches,
                    n = this.node,
                    o = this.options.filterElements,
                    r = [],
                    a = n,
                    l = s.shift(),
                    d = 0,
                    c = 0,
                    p = [n];
                e: for (;;) {
                    if (3 === a.nodeType && (!t && a.length + d >= l.endIndex ? t = {
                            node: a,
                            index: c++,
                            text: a.data.substring(l.startIndex - d, l.endIndex - d),
                            indexInMatch: d - l.startIndex,
                            indexInNode: l.startIndex - d,
                            endIndexInNode: l.endIndex - d,
                            isEnd: !0
                        } : e && r.push({
                            node: a,
                            index: c++,
                            text: a.data,
                            indexInMatch: d - l.startIndex,
                            indexInNode: 0
                        }), !e && a.length + d > l.startIndex && (e = {
                            node: a,
                            index: c++,
                            indexInMatch: 0,
                            indexInNode: l.startIndex - d,
                            endIndexInNode: l.endIndex - d,
                            text: a.data.substring(l.startIndex - d, l.endIndex - d)
                        }), d += a.data.length), i = 1 === a.nodeType && o && !o(a), e && t) {
                        if (a = this.replaceMatch(l, e, r, t), d -= t.node.data.length - t.endIndexInNode, t = e = null, r = [], c = 0, 0, !(l = s.shift())) break
                    } else if (!i && (a.firstChild || a.nextSibling)) {
                        a.firstChild ? (p.push(a), a = a.firstChild) : a = a.nextSibling;
                        continue
                    }
                    for (;;) {
                        if (a.nextSibling) {
                            a = a.nextSibling;
                            break
                        }
                        if ((a = p.pop()) === n) break e
                    }
                }
            },
            revert: function() {
                for (var e = this.reverts.length; e--;) this.reverts[e]();
                this.reverts = []
            },
            prepareReplacementString: function(e, t, s, i) {
                var n = this.options.portionMode;
                return "first" === n && 0 < t.indexInMatch ? "" : (e = e.replace(/\$(\d+|&|`|')/g, function(e, t) {
                    var i;
                    switch (t) {
                        case "&":
                            i = s[0];
                            break;
                        case "`":
                            i = s.input.substring(0, s.startIndex);
                            break;
                        case "'":
                            i = s.input.substring(s.endIndex);
                            break;
                        default:
                            i = s[+t]
                    }
                    return i
                }), "first" === n ? e : t.isEnd ? e.substring(t.indexInMatch) : e.substring(t.indexInMatch, t.indexInMatch + t.text.length))
            },
            getPortionReplacementNode: function(e, t, i) {
                var s = this.options.replace || "$&",
                    n = this.options.clss,
                    o = this.options.wrap;
                if (o && o.nodeType) {
                    var r = v.createElement("div");
                    r.innerHTML = o.outerHTML || (new XMLSerializer).serializeToString(o), o = r.firstChild
                }
                if ("function" == typeof s) return (s = s(e, t, i)) && s.nodeType ? s : v.createTextNode(String(s));
                var a = "string" == typeof o ? v.createElement(o) : o;
                return n && (a.className = n), (s = v.createTextNode(this.prepareReplacementString(s, e, t, i))).data && a ? (a.appendChild(s), a) : s
            },
            replaceMatch: function(e, t, i, s) {
                var n, o, r = t.node,
                    a = s.node;
                if (r === a) {
                    var l = r;
                    0 < t.indexInNode && (n = v.createTextNode(l.data.substring(0, t.indexInNode)), l.parentNode.insertBefore(n, l));
                    var d = this.getPortionReplacementNode(s, e);
                    return l.parentNode.insertBefore(d, l), s.endIndexInNode < l.length && (o = v.createTextNode(l.data.substring(s.endIndexInNode)), l.parentNode.insertBefore(o, l)), l.parentNode.removeChild(l), this.reverts.push(function() {
                        n === d.previousSibling && n.parentNode.removeChild(n), o === d.nextSibling && o.parentNode.removeChild(o), d.parentNode.replaceChild(l, d)
                    }), d
                }
                n = v.createTextNode(r.data.substring(0, t.indexInNode)), o = v.createTextNode(a.data.substring(s.endIndexInNode));
                for (var c = this.getPortionReplacementNode(t, e), p = [], f = 0, h = i.length; f < h; ++f) {
                    var u = i[f],
                        m = this.getPortionReplacementNode(u, e);
                    u.node.parentNode.replaceChild(m, u.node), this.reverts.push(function(e, t) {
                        return function() {
                            t.parentNode.replaceChild(e.node, t)
                        }
                    }(u, m)), p.push(m)
                }
                var g = this.getPortionReplacementNode(s, e);
                return r.parentNode.insertBefore(n, r), r.parentNode.insertBefore(c, r), r.parentNode.removeChild(r), a.parentNode.insertBefore(g, a), a.parentNode.insertBefore(o, a), a.parentNode.removeChild(a), this.reverts.push(function() {
                    n.parentNode.removeChild(n), c.parentNode.replaceChild(r, c), o.parentNode.removeChild(o), g.parentNode.replaceChild(a, g)
                }), g
            }
        }, l
    }(),
    function(w, e) {
        function c(t, i, s, n, o) {
            var r = !1;
            return t.contents().detach().each(function() {
                var e = w(this);
                if (void 0 === this) return !0;
                if (e.is("script, .dotdotdot-keep")) t.append(e);
                else {
                    if (r) return !0;
                    t.append(e), !o || e.is(n.after) || e.find(n.after).length || t[t.is("a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style") ? "after" : "append"](o), y(s, n) && (r = 3 == this.nodeType ? function(e, t, i, s, n) {
                        var o = e[0];
                        if (!o) return !1;
                        var r = k(o),
                            a = -1 !== r.indexOf(" ") ? " " : "　",
                            l = "letter" == s.wrap ? "" : a,
                            d = r.split(l),
                            c = -1,
                            p = -1,
                            f = 0,
                            h = d.length - 1;
                        for (s.fallbackToLetter && 0 == f && 0 == h && (l = "", d = r.split(l), h = d.length - 1); f <= h && (0 != f || 0 != h);) {
                            var u = Math.floor((f + h) / 2);
                            if (u == p) break;
                            p = u, x(o, d.slice(0, p + 1).join(l) + s.ellipsis), i.children().each(function() {
                                w(this).toggle().toggle()
                            }), y(i, s) ? (h = p, s.fallbackToLetter && 0 == f && 0 == h && (l = "", d = d[0].split(l), p = c = -1, f = 0, h = d.length - 1)) : f = c = p
                        }
                        if (-1 == c || 1 == d.length && 0 == d[0].length) {
                            var m = e.parent();
                            e.detach();
                            var g = n && n.closest(m).length ? n.length : 0;
                            if (m.contents().length > g ? o = C(m.contents().eq(-1 - g), t) : (o = C(m, t, !0), g || m.detach()), o && (r = b(k(o), s), x(o, r), g && n)) {
                                var v = n.parent();
                                w(o).parent().append(n), w.trim(v.html()) || v.remove()
                            }
                        } else r = b(d.slice(0, c + 1).join(l), s), x(o, r);
                        return !0
                    }(e, i, s, n, o) : c(e, i, s, n, o)), r || o && o.detach()
                }
            }), i.addClass("is-truncated"), r
        }

        function y(e, t) {
            return e.innerHeight() > t.maxHeight
        }

        function b(e, t) {
            for (; - 1 < w.inArray(e.slice(-1), t.lastCharacter.remove);) e = e.slice(0, -1);
            return w.inArray(e.slice(-1), t.lastCharacter.noEllipsis) < 0 && (e += t.ellipsis), e
        }

        function p(e) {
            return {
                width: e.innerWidth(),
                height: e.innerHeight()
            }
        }

        function x(e, t) {
            e.innerText ? e.innerText = t : e.nodeValue ? e.nodeValue = t : e.textContent && (e.textContent = t)
        }

        function k(e) {
            return e.innerText ? e.innerText : e.nodeValue ? e.nodeValue : e.textContent ? e.textContent : ""
        }

        function o(e) {
            for (;
                (e = e.previousSibling) && 1 !== e.nodeType && 3 !== e.nodeType;);
            return e
        }

        function C(e, t, i) {
            var s, n = e && e[0];
            if (n) {
                if (!i) {
                    if (3 === n.nodeType) return n;
                    if (w.trim(e.text())) return C(e.contents().last(), t)
                }
                for (s = o(n); !s;) {
                    if ((e = e.parent()).is(t) || !e.length) return !1;
                    s = o(e[0])
                }
                if (s) return C(w(s), t)
            }
            return !1
        }
        if (!w.fn.dotdotdot) {
            w.fn.dotdotdot = function(e) {
                if (0 == this.length) return w.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;
                if (1 < this.length) return this.each(function() {
                    w(this).dotdotdot(e)
                });
                var n = this,
                    o = n.contents();
                n.data("dotdotdot") && n.trigger("destroy.dot"), n.data("dotdotdot-style", n.attr("style") || ""), n.css("word-wrap", "break-word"), "nowrap" === n.css("white-space") && n.css("white-space", "normal"), n.bind_events = function() {
                    return n.bind("update.dot", function(e, t) {
                        switch (n.removeClass("is-truncated"), e.preventDefault(), e.stopPropagation(), typeof r.height) {
                            case "number":
                                r.maxHeight = r.height;
                                break;
                            case "function":
                                r.maxHeight = r.height.call(n[0]);
                                break;
                            default:
                                r.maxHeight = function(e) {
                                    for (var t = e.innerHeight(), i = ["paddingTop", "paddingBottom"], s = 0, n = i.length; s < n; s++) {
                                        var o = parseInt(e.css(i[s]), 10);
                                        isNaN(o) && (o = 0), t -= o
                                    }
                                    return t
                                }(n)
                        }
                        r.maxHeight += r.tolerance, void 0 !== t && (("string" == typeof t || "nodeType" in t && 1 === t.nodeType) && (t = w("<div />").append(t).contents()), t instanceof w && (o = t)), (d = n.wrapInner('<div class="dotdotdot" />').children()).contents().detach().end().append(o.clone(!0)).find("br").replaceWith("  <br />  ").end().css({
                            height: "auto",
                            width: "auto",
                            border: "none",
                            padding: 0,
                            margin: 0
                        });
                        var i = !1,
                            s = !1;
                        return a.afterElement && ((i = a.afterElement.clone(!0)).show(), a.afterElement.detach()), y(d, r) && (s = "children" == r.wrap ? function(e, t, i) {
                            var s = e.children(),
                                n = !1;
                            e.empty();
                            for (var o = 0, r = s.length; o < r; o++) {
                                var a = s.eq(o);
                                if (e.append(a), i && e.append(i), y(e, t)) {
                                    a.remove(), n = !0;
                                    break
                                }
                                i && i.detach()
                            }
                            return n
                        }(d, r, i) : c(d, n, d, r, i)), d.replaceWith(d.contents()), d = null, w.isFunction(r.callback) && r.callback.call(n[0], s, o), a.isTruncated = s
                    }).bind("isTruncated.dot", function(e, t) {
                        return e.preventDefault(), e.stopPropagation(), "function" == typeof t && t.call(n[0], a.isTruncated), a.isTruncated
                    }).bind("originalContent.dot", function(e, t) {
                        return e.preventDefault(), e.stopPropagation(), "function" == typeof t && t.call(n[0], o), o
                    }).bind("destroy.dot", function(e) {
                        e.preventDefault(), e.stopPropagation(), n.unwatch().unbind_events().contents().detach().end().append(o).attr("style", n.data("dotdotdot-style") || "").removeClass("is-truncated").data("dotdotdot", !1)
                    }), n
                }, n.unbind_events = function() {
                    return n.unbind(".dot"), n
                }, n.watch = function() {
                    if (n.unwatch(), "window" == r.watch) {
                        var e = w(window),
                            t = e.width(),
                            i = e.height();
                        e.bind("resize.dot" + a.dotId, function() {
                            t == e.width() && i == e.height() && r.windowResizeFix || (t = e.width(), i = e.height(), l && clearInterval(l), l = setTimeout(function() {
                                n.trigger("update.dot")
                            }, 100))
                        })
                    } else s = p(n), l = setInterval(function() {
                        if (n.is(":visible")) {
                            var e = p(n);
                            s.width == e.width && s.height == e.height || (n.trigger("update.dot"), s = e)
                        }
                    }, 500);
                    return n
                }, n.unwatch = function() {
                    return w(window).unbind("resize.dot" + a.dotId), l && clearInterval(l), n
                };
                var t, i, r = w.extend(!0, {}, w.fn.dotdotdot.defaults, e),
                    a = {},
                    s = {},
                    l = null,
                    d = null;
                return r.lastCharacter.remove instanceof Array || (r.lastCharacter.remove = w.fn.dotdotdot.defaultArrays.lastCharacter.remove), r.lastCharacter.noEllipsis instanceof Array || (r.lastCharacter.noEllipsis = w.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), a.afterElement = (t = r.after, i = n, !!t && ("string" == typeof t ? !!(t = w(t, i)).length && t : !!t.jquery && t)), a.isTruncated = !1, a.dotId = f++, n.data("dotdotdot", !0).bind_events().trigger("update.dot"), r.watch && n.watch(), n
            }, w.fn.dotdotdot.defaults = {
                ellipsis: "... ",
                wrap: "word",
                fallbackToLetter: !0,
                lastCharacter: {},
                tolerance: 0,
                callback: null,
                after: null,
                height: null,
                watch: !1,
                windowResizeFix: !0
            }, w.fn.dotdotdot.defaultArrays = {
                lastCharacter: {
                    remove: [" ", "　", ",", ";", ".", "!", "?"],
                    noEllipsis: []
                }
            }, w.fn.dotdotdot.debug = function(e) {};
            var f = 1,
                t = w.fn.html;
            w.fn.html = function(e) {
                return null != e && !w.isFunction(e) && this.data("dotdotdot") ? this.trigger("update", [e]) : t.apply(this, arguments)
            };
            var i = w.fn.text;
            w.fn.text = function(e) {
                return null != e && !w.isFunction(e) && this.data("dotdotdot") ? (e = w("<div />").text(e).html(), this.trigger("update", [e])) : i.apply(this, arguments)
            }
        }
    }(jQuery), jQuery(document).ready(function(o) {
        o(".dot-ellipsis").each(function() {
            var e = o(this).hasClass("dot-resize-update"),
                t = o(this).hasClass("dot-timer-update"),
                s = 0,
                i = o(this).attr("class").split(/\s+/);
            o.each(i, function(e, t) {
                var i = t.match(/^dot-height-(\d+)$/);
                null !== i && (s = Number(i[1]))
            });
            var n = new Object;
            t && (n.watch = !0), e && (n.watch = "window"), 0 < s && (n.height = s), o(this).dotdotdot(n)
        })
    }), jQuery(window).on("load", function() {
        jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot")
    }), window.ShuffleCustom = function($, e, r) {
        "use strict";
        if ("object" != typeof e) throw new Error("Shuffle.js requires Modernizr.\nhttp://vestride.github.io/Shuffle/#dependencies");
        var t, i = e.prefixed("transition"),
            s = e.prefixed("transitionDelay"),
            n = e.prefixed("transitionDuration"),
            o = {
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionend"
            } [i],
            a = e.prefixed("transform"),
            l = (t = a) ? t.replace(/([A-Z])/g, function(e, t) {
                return "-" + t.toLowerCase()
            }).replace(/^ms-/, "-ms-") : "",
            d = e.csstransforms && e.csstransitions,
            c = e.csstransforms3d,
            p = "shuffle",
            f = "all";

        function h(e, t, i) {
            for (var s = 0, n = e.length; s < n; s++)
                if (t.call(i, e[s], s, e) === {}) return
        }

        function u(e, t, i) {
            return setTimeout($.proxy(e, t), i)
        }

        function m(e) {
            return Math.max.apply(Math, e)
        }

        function g(e) {
            return $.isNumeric(e) ? e : 0
        }
        var v = function(e, t) {
            this.x = g(e), this.y = g(t)
        };
        v.equals = function(e, t) {
            return e.x === t.x && e.y === t.y
        };
        var w = 0,
            y = $(window),
            b = 0,
            _ = function(e, t, i) {
                t = t || {}, $.extend(this, _.options, t, _.settings), this.$el = $(e), this.id = b++, this.element = e, this.only_sort = i, this.unique = "shuffle_" + w++, this._fire(_.EventType.LOADING), this._init(), u(function() {
                    this.initialized = !0, this._fire(_.EventType.DONE)
                }, this, 16)
            };
        return _.EventType = {
            LOADING: "loading",
            DONE: "done",
            LAYOUT: "layout",
            REMOVED: "removed"
        }, _.ClassName = {
            BASE: p,
            SHUFFLE_ITEM: "shuffle-item",
            FILTERED: "filtered",
            CONCEALED: "concealed"
        }, _.options = {
            group: f,
            speed: 250,
            easing: "ease-out",
            itemSelector: "",
            sizer: null,
            gutterWidth: 0,
            columnWidth: 0,
            delimeter: null,
            buffer: 0,
            initialSort: null,
            throttle: function(i, s, n) {
                var o, r, a, l = null,
                    d = 0;
                n = n || {};
                var c = function() {
                    d = !1 === n.leading ? 0 : $.now(), l = null, a = i.apply(o, r), o = r = null
                };
                return function() {
                    var e = $.now();
                    d || !1 !== n.leading || (d = e);
                    var t = s - (e - d);
                    return o = this, r = arguments, t <= 0 || s < t ? (clearTimeout(l), l = null, d = e, a = i.apply(o, r), o = r = null) : l || !1 === n.trailing || (l = setTimeout(c, t)), a
                }
            },
            throttleTime: 100,
            sequentialFadeDelay: 150,
            supported: d
        }, _.settings = {
            useSizer: !1,
            itemCss: {
                position: "absolute",
                top: 0,
                left: 0,
                visibility: "visible"
            },
            revealAppendedDelay: 300,
            lastSort: {},
            lastFilter: f,
            enabled: !0,
            destroyed: !1,
            initialized: !1,
            _animations: [],
            styleQueue: []
        }, _.Point = v, _._getItemTransformString = function(e, t) {
            return c ? "translate3d(" + e.x + "px, " + e.y + "px, 0) scale3d(" + t + ", " + t + ", 1)" : "translate(" + e.x + "px, " + e.y + "px) scale(" + t + ")"
        }, _._getNumberStyle = function(e, t) {
            return _._getFloat($(e).css(t))
        }, _._getInt = function(e) {
            return g(parseInt(e, 10))
        }, _._getFloat = function(e) {
            return g(parseFloat(e))
        }, _._getOuterWidth = function(e, t) {
            return $(e).outerWidth(!!t)
        }, _._getOuterHeight = function(e, t) {
            return $(e).outerHeight(!!t)
        }, _._skipTransition = function(e, t, i) {
            var s = e.style[n];
            e.style[n] = "0ms", t.call(i), e.offsetWidth, e.style[n] = s
        }, _.prototype._init = function() {
            if (this.$items = this._getItems(), !this.only_sort) {
                this.sizer = this._getElementOption(this.sizer), this.sizer && (this.useSizer = !0), this.$el.addClass(_.ClassName.BASE), this.containerWidth = _._getOuterWidth(this.element), this._itemMargin = this._getGutterSize(this.containerWidth), this._initItems(), y.on("resize." + p + "." + this.unique, this._getResizeFunction());
                var e = this.$el.css(["position", "overflow"]),
                    t = _._getOuterWidth(this.element);
                this._validateStyles(e), this._setColumns(t)
            }
            this.shuffle(this.group, this.initialSort), this.supported && u(function() {
                this.destroyed || (this._setTransitions(), this.element.style[i] = "height " + this.speed + "ms " + this.easing)
            }, this)
        }, _.prototype._getResizeFunction = function() {
            var e = $.proxy(this._onResize, this);
            return this.throttle ? this.throttle(e, this.throttleTime) : e
        }, _.prototype._getElementOption = function(e) {
            return "string" == typeof e ? this.$el.find(e)[0] || null : e && e.nodeType && 1 === e.nodeType ? e : e && e.jquery ? e[0] : null
        }, _.prototype._validateStyles = function(e) {
            "static" === e.position && (this.element.style.position = "relative"), e.overflow
        }, _.prototype._filter = function(e, t) {
            e = e || this.lastFilter, t = t || this.$items;
            var i = this._getFilteredSets(e, t);
            return this._toggleFilterClasses(i.filtered, i.concealed), "string" == typeof(this.lastFilter = e) && (this.group = e), i.filtered
        }, _.prototype._getFilteredSets = function(i, e) {
            var s = $(),
                n = $();
            return i === f ? s = e : h(e, function(e) {
                var t = $(e);
                this._doesPassFilter(i, t) || t.is(".ff-ad") ? s = s.add(t) : n = n.add(t)
            }, this), {
                filtered: s,
                concealed: n
            }
        }, _.prototype._doesPassFilter = function(e, t) {
            if ($.isFunction(e)) return e.call(t[0], t, this);
            var i = t.data("groups"),
                s = this.delimeter && !$.isArray(i) ? i.split(this.delimeter) : i;
            return -1 < $.inArray(e, s)
        }, _.prototype._toggleFilterClasses = function(e, t) {
            e.removeClass(_.ClassName.CONCEALED).addClass(_.ClassName.FILTERED), t.removeClass(_.ClassName.FILTERED).addClass(_.ClassName.CONCEALED)
        }, _.prototype._initItems = function(e, b, t) {
            var x, k, C, i, s, n, o, r, a, l, d, c, p, T = this,
                f = e || this.$items,
                S = this.columnWidth(this.containerWidth, this._itemMargin),
                I = this.streamOpts.layout,
                h = this.streamOpts.trueLayout;
            if ("carousel" === h) {
                this.$el.data("slick") && (s = this.$el.slick("slickCurrentSlide"), this.$el.slick("unslick").off("destroy").off("beforeChange"), this.$el.find(".ff-carousel-slide").each(function() {
                    $(this).find(".ff-item").unwrap()
                }), t && this.$el.append(e), this.$items = this._getItems(), this.$el.data("slick", null));
                for (var u = 0; u < this.$items.length; u += this.streamOpts.itemsPerSlide) this.$items.slice(u, u + this.streamOpts.itemsPerSlide).wrapAll("<div class='ff-carousel-slide'></div>");
                0 < this._itemMargin && (i = parseInt(this._itemMargin / 2), (o = document.getElementById("ff-carousel-css")) && o.parentNode.removeChild(o), this._addStyleSheet(".ff-stream-wrapper { padding: " + i + "px;} .ff-truelayout-carousel .ff-item {margin: " + i + "px}", "ff-carousel-css"))
            }
            this.itemCss.width = S, this.gridLayout = I, b && "carousel" !== h || (f.addClass([_.ClassName.SHUFFLE_ITEM, _.ClassName.FILTERED].join(" ")), f.css(this.itemCss).data("point", new v).data("scale", 1)), "grid" === I ? (x = this.streamOpts["g-ratio-h"] * S / this.streamOpts["g-ratio-w"], x = Math.floor(x), k = Math.floor(x * this._altEval(this.streamOpts["g-ratio-img"])), n = f.first(), C = n.find(".ff-item-meta").height(), (o = document.getElementById("ff-grid-css-" + this.streamOpts.id)) && o.parentNode.removeChild(o), this._addStyleSheet("#ff-stream-" + this.streamOpts.id + " .ff-item-cont { height: " + (x - 44) + "px; /*overflow:hidden*/} #ff-stream-" + this.streamOpts.id + " .ff-ad .ff-item-cont { height: " + x + "px; overflow:hidden} #ff-stream-" + this.streamOpts.id + " .ff-has-overlay .ff-item-cont { height: " + x + "px; /*overflow:hidden*/} #ff-stream-" + this.streamOpts.id + " .ff-item .ff-img-holder{height: " + k + "px}#ff-stream-" + this.streamOpts.id + " .ff-has-overlay .ff-img-holder{height: " + x + "px}", "ff-grid-css-" + this.streamOpts.id)) : this.streamOpts.isOverlay && (n = f.first(), C = n.find(".ff-item-meta").height()), f.each(function(e) {
                var t, i, s, n, o, r, a, l, d, c, p, f, h, u = $(this),
                    m = u.data(),
                    g = m.media && m.media.split(";"),
                    v = u.find(".ff-img-holder img"),
                    w = {},
                    y = T.streamOpts.isOverlay && v.length;
                g ? (i = (t = {
                    width: g[4] || g[0],
                    height: g[5] || g[1]
                }).width && t.height ? T._calcImageProportion(S, t) : 0, v.css("minHeight", '80px')) : v.length && (g = v.data("size")) && (i = (t = {
                    width: g.width,
                    height: g.height
                }).width && t.height ? T._calcImageProportion(S, t) : 0, v.css("minHeight", i)), ("grid" === I || y) && (d = u.find(y ? ".ff-overlay-wrapper" : ".ff-item-cont"), a = u.find(".ff-content"), l = d.find("> h4"), c = d.children(), y && (c = c.not(".ff-overlay")), "label1" === T.streamOpts["icon-style"] && u.is(".ff-meta-first") || (c = c.not(".ff-label-wrapper")), f = parseInt(c.first().css("marginTop")), h = parseInt(c.last().css("marginBottom")), r = .07 * S, p = (c.length - 1) * r + f + h, o = l.length ? l.height() : 0, (s = (x || i || v.height()) - ("ad" === u.data("type") ? 0 : (v.length && !y ? k : 0) + o + C + 44) - p) < 21 && (s = 20 <= s ? 20 : o ? 0 : s < 0 ? 21 + s - r : s), w = {
                    height: s
                }, a.css(w), 0 !== w.height && a.length || (n = x - (v.length && !y ? k : 0) - C - 44 - p, w = {}, (n = Math.floor(n)) <= 21 && (20 <= n ? (l.addClass("ff-header-min"), n = 21) : (n = n < 0 ? 21 + n - r : n, w.textIndent = "-9999px")), (w.height = n) <= 0 && l.detach(), l.css(w)), b && u.find(".ff-content").dotdotdot({
                    ellipsis: "...",
                    after: ""
                }))
            }), "carousel" === h && (p = this.streamOpts["c-autoplay"] ? this.streamOpts["c-autoplay"].trim() : "", a = "yep" == this.streamOpts["c-arrows-always"] ? "ff-arrows-always" : "ff-arrows-hover", l = "yep" == this.streamOpts["c-arrows-mob"] ? "ff-arrows-mob" : "", d = "yep" == this.streamOpts["c-dots"] ? "ff-dots-visible" : "ff-dots-hidden", c = "yep" == this.streamOpts["c-dots-mob"] ? "ff-dots-mob" : "", r = {
                infinite: !0,
                dots: !0,
                slidesToShow: 1,
                initialSlide: s || 0,
                prevArrow: '<span class="flaticon-chevron-left slick-prev"></span>',
                nextArrow: '<span class="flaticon-chevron-right slick-next"></span>'
            }, "" != p && (r.autoplay = !0, r.autoplaySpeed = 1e3 * p), T.$el.slick(r).addClass(a + " " + d + " " + l + " " + c).on("destroy", function() {
                T.$el.trigger("slick-destroyed")
            }).on("beforeChange", function(e, t, i, s) {
                i < s && s === t.slideCount - 1 && T.$el.trigger("slick-last-slide", {
                    slick: t
                })
            }).data("slick", T.$el.slick("getSlick")))
        }, _.prototype._calcImageProportion = function(e, t) {
            var i = e / t.width;
            return Math.round(t.height * i)
        }, _.prototype._addCSSRule = function(e, t, i) {
            if (e && e.cssRules) {
                for (var s = e.cssRules.length - 1, n = s; 0 < n; n--) {
                    var o = e.cssRules[n];
                    o.selectorText === t && (i = o.style.cssText + i, e.deleteRule(n), s = n)
                }
                return e.insertRule ? e.insertRule(t + "{" + i + "}", s) : e.addRule(t, i, s), e.cssRules[s].cssText
            }
        }, _.prototype._altEval = function(e) {
            return new Function("return " + e)()
        }, _.prototype._addStyleSheet = function(e, t) {
            var i = document.createElement("style");
            return i.type = "text/css", t && (i.id = t), /WebKit|MSIE/i.test(navigator.userAgent) ? i.styleSheet ? i.styleSheet.cssText = e : i.innerText = e : i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), i
        }, _.prototype._updateItemCount = function() {
            this.visibleItems = this._getFilteredItems().length
        }, _.prototype._setTransition = function(e) {
            e.style[i] = l + " " + this.speed + "ms " + this.easing + ", opacity " + this.speed + "ms " + this.easing
        }, _.prototype._setTransitions = function(e) {
            h(e = e || this.$items, function(e) {
                this._setTransition(e)
            }, this)
        }, _.prototype._setSequentialDelay = function(e) {
            this.supported && h(e, function(e, t) {
                e.style[s] = "0ms," + (t + 1) * this.sequentialFadeDelay + "ms"
            }, this)
        }, _.prototype._getItems = function() {
            return this.$el.find(this.itemSelector)
        }, _.prototype._getFilteredItems = function() {
            return this.destroyed ? $() : this.$items.filter("." + _.ClassName.FILTERED)
        }, _.prototype._getConcealedItems = function() {
            return this.$items.filter("." + _.ClassName.CONCEALED)
        }, _.prototype._getColumnSize = function(e, t) {
            var i;
            return 0 === (i = $.isFunction(this.columnWidth) ? this.columnWidth(e, t) : this.useSizer ? _._getOuterWidth(this.sizer) : this.columnWidth ? this.columnWidth : 0 < this.$items.length ? _._getOuterWidth(this.$items[0], !0) : e) && (i = e), i + t
        }, _.prototype._getGutterSize = function(e) {
            return $.isFunction(this.gutterWidth) ? this.gutterWidth(e) : this.useSizer ? _._getNumberStyle(this.sizer, "marginLeft") : this.gutterWidth
        }, _.prototype._setColumns = function(e) {
            var t = e || _._getOuterWidth(this.element),
                i = this._itemMargin = this._getGutterSize(t),
                s = this._getColumnSize(t, i);
            this.containerWidth = t;
            var n = ((t -= 2 * i) + i) / s;
            this.cols = Math.max(Math.floor(n), 1), this.colWidth = s
        }, _.prototype._setContainerSize = function() {
            this.$el.css("height", this._getContainerSize())
        }, _.prototype._getContainerSize = function() {
            return m(this.positions)
        }, _.prototype._fire = function(e, t) {
            this.$el.trigger(e + "." + p, t && t.length ? t : [this])
        }, _.prototype._resetCols = function() {
            var e = this.cols;
            for (this.positions = []; e--;) this.positions.push(0)
        }, _.prototype._layout = function(e, t) {
            var i = this;
            h(e, function(e) {
                i._layoutItem(e, !!t)
            }, i), i._processStyleQueue(), i._setContainerSize()
        }, _.prototype._layoutItem = function(e, t) {
            var i = $(e),
                s = i.data(),
                n = (s.point, s.scale, {
                    width: _._getOuterWidth(e, !0),
                    height: _._getOuterHeight(e, !0)
                }),
                o = this._getItemPosition(n);
            s.point = o, s.scale = 1, this.styleQueue.push({
                $item: i,
                point: o,
                scale: 1,
                width: this.itemCss.width,
                opacity: t ? 0 : 1,
                skipTransition: t,
                callfront: function() {
                    t || i.css("visibility", "visible")
                },
                callback: function() {
                    t && i.css("visibility", "hidden")
                }
            })
        }, _.prototype._getItemPosition = function(e, t) {
            var i = this._getColumnSpan(e.width, this.colWidth, this.cols),
                s = this._getColumnSet(i, this.cols),
                n = this._getShortColumn(s, this.buffer),
                o = Math.round((this.containerWidth - (e.width * this.cols + this._itemMargin * (this.cols - 1))) / 2),
                r = new v(Math.round(this.colWidth * n + (0 < o ? o : 0)), Math.round(s[n]));
            0 != r.y && (r.y = r.y + this._itemMargin);
            for (var a = s[n] + e.height + (0 != r.y ? this._itemMargin : 0), l = this.cols + 1 - s.length, d = 0; d < l; d++) this.positions[n + d] = a;
            return r
        }, _.prototype._getColumnSpan = function(e, t, i) {
            var s = e / t;
            return Math.abs(Math.round(s) - s) < .3 && (s = Math.round(s)), Math.min(Math.ceil(s), i)
        }, _.prototype._getColumnSet = function(e, t) {
            if (1 === e) return this.positions;
            for (var i = t + 1 - e, s = [], n = 0; n < i; n++) s[n] = m(this.positions.slice(n, n + e));
            return s
        }, _.prototype._getShortColumn = function(e, t) {
            for (var i, s = (i = e, Math.min.apply(Math, i)), n = 0, o = e.length; n < o; n++)
                if (e[n] >= s - t && e[n] <= s + t) return n;
            return 0
        }, _.prototype._shrink = function(e) {
            h(e || this._getConcealedItems(), function(e) {
                var t = $(e),
                    i = t.data();
                .001 !== i.scale && (i.scale = .001, this.styleQueue.push({
                    $item: t,
                    point: i.point,
                    scale: .001,
                    opacity: 0,
                    callback: function() {
                        t.css({
                            visibility: "hidden"
                        })
                    }
                }))
            }, this)
        }, _.prototype._onResize = function() {
            if (this.enabled && !this.destroyed && !this.isTransitioning) {
                var e = _._getOuterWidth(this.element);
                if (e !== this.containerWidth) {
                    if (this.containerWidth = e, this._itemMargin = this._getGutterSize(this.containerWidth), "grid" === this.gridLayout) {
                        var t = document.getElementById("ff-grid-css-" + this.streamOpts.id),
                            i = document.getElementById("ff-carousel-css");
                        t.parentNode.removeChild(t), i && i.parentNode.removeChild(i)
                    }
                    this._initItems(this.$items, !0), this.update()
                }
            }
        }, _.prototype._getStylesForTransition = function(e, t) {
            var i = {
                opacity: e.opacity
            };
            return e.width && (i.width = e.width), this.supported ? i[a] = _._getItemTransformString(e.point, e.scale) : (i.left = e.point.x, i.top = e.point.y), i
        }, _.prototype._transition = function(e) {
            var t = this._getStylesForTransition(e);
            e.$item.data("keep-pos") ? (e.$item.removeData("keep-pos"), u(function() {
                this._startItemAnimation(e.$item, t, e.callfront || $.noop, e.callback || $.noop)
            }, this, 1e3)) : this._startItemAnimation(e.$item, t, e.callfront || $.noop, e.callback || $.noop)
        }, _.prototype._startItemAnimation = function(e, t, i, s) {
            if (i(), !this.initialized) return e.css(t), void s();
            if (this.supported) e.css(t), e.on(o, function e(t) {
                t.target === t.currentTarget && ($(t.target).off(o, e), s())
            });
            else {
                var n = e.stop(!0).animate(t, this.speed, "swing", s);
                this._animations.push(n.promise())
            }
        }, _.prototype._processStyleQueue = function(e) {
            var t = $();
            h(this.styleQueue, function(e) {
                e.skipTransition ? this._styleImmediately(e) : (t = t.add(e.$item), this._transition(e))
            }, this), 0 < t.length && this.initialized ? (this.isTransitioning = !0, this.supported ? this._whenCollectionDone(t, o, this._movementFinished) : this._whenAnimationsDone(this._movementFinished), this.isTransitioning = !1) : e || u(this._layoutEnd, this), this.styleQueue.length = 0
        }, _.prototype._styleImmediately = function(e) {
            _._skipTransition(e.$item[0], function() {
                e.$item.css(this._getStylesForTransition(e))
            }, this)
        }, _.prototype._movementFinished = function() {
            this._layoutEnd()
        }, _.prototype._layoutEnd = function() {
            this.destroyed || this._fire(_.EventType.LAYOUT)
        }, _.prototype._addItems = function(e, t, i) {
            this._initItems(e, !1, !0), this._setTransitions(e), this.$items = this._getItems(), this._shrink(e), h(this.styleQueue, function(e) {
                e.skipTransition = !0
            }), this._processStyleQueue(!0), t ? this._addItemsToEnd(e, i) : this.shuffle(this.lastFilter)
        }, _.prototype._addItemsToEnd = function(e, t) {
            var i = this._filter(null, e).get();
            this._updateItemCount(), this._layout(i, !0), t && this.supported && this._setSequentialDelay(i), this._revealAppended(i)
        }, _.prototype._revealAppended = function(e) {
            u(function() {
                h(e, function(e) {
                    var t = $(e);
                    this._transition({
                        $item: t,
                        opacity: 1,
                        point: t.data("point"),
                        scale: 1
                    })
                }, this), this._whenCollectionDone($(e), o, function() {
                    $(e).css(s, "0ms"), this._movementFinished()
                })
            }, this, this.revealAppendedDelay)
        }, _.prototype._whenCollectionDone = function(e, i, s) {
            var n = 0,
                o = e.length,
                r = this;
            e.on(i, function e(t) {
                t.target === t.currentTarget && ($(t.target).off(i, e), ++n === o && s.call(r))
            })
        }, _.prototype._whenAnimationsDone = function(e) {
            $.when.apply(null, this._animations).always($.proxy(function() {
                this._animations.length = 0, e.call(this)
            }, this))
        }, _.prototype.shuffle = function(e, t) {
            this.enabled && !this.isTransitioning && (e || (e = f), this._filter(e), this._updateItemCount(), this._shrink(), this.sort(t))
        }, _.prototype.sort = function(e) {
            if (this.enabled && !this.isTransitioning) {
                this._resetCols();
                var t = e || this.lastSort,
                    i = this._getFilteredItems().sorted(t);
                this._layout(i), this.lastSort = t
            }
        }, _.prototype.update = function(e) {
            var a = this;
            this.enabled && !this.isTransitioning && (e || (this._setColumns(), this.$items.css("width", this.colWidth - this._itemMargin), this.$items.each(function(e, t) {
                var i = $(this),
                    s = i.data(),
                    n = s.media && s.media.split(";");
                if (n) {
                    var o = {
                            width: n[4],
                            height: n[5]
                        },
                        r = a._calcImageProportion(a.colWidth - a._itemMargin, o);
                    i.find(".ff-img-holder img").css("minHeight", '80px')
                    // i.find(".ff-img-holder img").css("minHeight", r)
                }
            }), this.itemCss.width = this.colWidth - this._itemMargin), a.sort())
        }, _.prototype.layout = function() {
            this.destroyed || this.update(!0)
        }, _.prototype.appended = function(e, t, i) {
            this._addItems(e, !0, !0)
        }, _.prototype.disable = function() {
            this.enabled = !1
        }, _.prototype.enable = function(e) {
            !(this.enabled = !0) !== e && this.update()
        }, _.prototype.remove = function(e) {
            e.length && e.jquery && (this._toggleFilterClasses($(), e), this._shrink(e), this.sort(), this.$el.one(_.EventType.LAYOUT + "." + p, $.proxy(function() {
                e.remove(), this.$items = this._getItems(), this._updateItemCount(), this._fire(_.EventType.REMOVED, [e, this]), e = null
            }, this)))
        }, _.prototype.destroy = function() {
            y.off("." + this.unique), this.$el.removeClass(p).removeAttr("style").removeData(p), this.$items.removeAttr("style").removeData("point").removeData("scale").removeClass([_.ClassName.CONCEALED, _.ClassName.FILTERED, _.ClassName.SHUFFLE_ITEM].join(" ")), this.$items = null, this.$el = null, this.sizer = null, this.element = null, this.destroyed = !0
        }, $.fn.shuffleCustom = function(i) {
            var s = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var e = $(this),
                    t = e.data(p);
                t ? "string" == typeof i && t[i] && t[i].apply(t, s) : (t = new _(this, i, "only_sort" === s[1]), e.data(p, t))
            })
        }, $.fn.sorted = function(e) {
            var n = $.extend({}, $.fn.sorted.defaults, e),
                t = this.get(),
                o = !1;
            return t.length ? n.randomize ? function(e) {
                var t, i, s = e.length;
                if (!s) return e;
                for (; --s;) i = Math.floor(Math.random() * (s + 1)), t = e[i], e[i] = e[s], e[s] = t;
                return e
            }(t) : ($.isFunction(n.by) && t.sort(function(e, t) {
                if (o) return 0;
                var i = n.by($(e)),
                    s = n.by($(t));
                return i === r && s === r ? (o = !0, 0) : i < s || "sortFirst" === i || "sortLast" === s ? -1 : s < i || "sortLast" === i || "sortFirst" === s ? 1 : 0
            }), o ? this.get() : (n.reverse && t.reverse(), t)) : []
        }, $.fn.sorted.defaults = {
            reverse: !1,
            by: null,
            randomize: !1
        }, _
    }(window.jQuery, window.CustomModernizr),
    function(e, c) {
        var s, t = e.jQuery || e.Cowboy || (e.Cowboy = {});
        t.throttle = s = function(n, o, r, a) {
            var l, d = 0;

            function e() {
                var e = this,
                    t = +new Date - d,
                    i = arguments;

                function s() {
                    d = +new Date, r.apply(e, i)
                }
                a && !l && s(), l && clearTimeout(l), a === c && n < t ? s() : !0 !== o && (l = setTimeout(a ? function() {
                    l = c
                } : s, a === c ? n - t : n))
            }
            return "boolean" != typeof o && (a = r, r = o, o = c), t.guid && (e.guid = r.guid = r.guid || t.guid++), e
        }, t.debounce = function(e, t, i) {
            return i === c ? s(e, t, !1) : s(e, i, !1 !== t)
        }
    }(this),
    function(a) {
        "use strict";
        var i = null,
            e = !1,
            t = a(window),
            s = function(e) {
                var t = this;
                if (a.extend(t, s.options, e, s.settings), !a.isFunction(t.enter)) throw new TypeError("Viewport.add :: No `enter` function provided in Viewport options.");
                "string" == typeof t.threshold && -1 < t.threshold.indexOf("%") ? (t.isThresholdPercentage = !0, t.threshold = parseFloat(t.threshold) / 100) : t.threshold < 1 && 0 < t.threshold && (t.isThresholdPercentage = !0), t.hasLeaveCallback = a.isFunction(t.leave), t.$element = a(t.element), t.idx = e.idx, t.update()
            };
        s.prototype.update = function(e) {
            var t = this;
            t.offset = t.relativeToParentElem ? t.$element.position() : t.$element.offset(), e || (t.height = t.$element.height(), t.$element.data("height", t.height))
        }, s.options = {
            threshold: 200,
            delay: 0
        }, s.settings = {
            triggered: !1,
            isThresholdPercentage: !1
        };
        var n = function(e, t) {
            return this.init(e, t)
        };
        n.prototype = {
            init: function(e, t) {
                window.FF_DEBUG;
                var i = this;
                return i.list = [], i.lastScrollY = 0, i.$container = a(t), i.windowHeight = i.$container.height(), i.windowWidth = i.$container.width(), i.container = t, i.opts = e, i.screenSize = {
                    w: i.windowWidth,
                    h: i.windowHeight
                }, i.throttleTime = 100, i.$doc = a(document), i.onResize(), i.bindEvents(), i.willProcessNextFrame = !0, requestAnimationFrame(function() {
                    i.setScrollTop(i.container), i.process("init"), i.willProcessNextFrame = !1
                }), i
            },
            bindEvents: function() {
                var r = this;
                t.on("resize.viewport", a.proxy(r.onResize, r)), e || (r.$doc.on("ff-comments-loaded", function(e, t) {
                    if (t.$slide && void 0 !== t.idx) {
                        var i, s = t.$slide,
                            n = s.data(),
                            o = s.height();
                        n.height != o && (i = r.list.slice(t.idx + 1, r.list.length), a.each(i, function(e, t) {
                            t.offset.top = t.offset.top + (o - n.height)
                        }))
                    }
                }), e = !0), r.opts.viewportin && r.$container.on("scroll.viewport", a.throttle(r.throttleTime, a.proxy(r.onScroll, r))), r.hasActiveHandlers = !0
            },
            unbindEvents: function() {
                t.add(this.$container).off(".viewport"), this.hasActiveHandlers = !1
            },
            maybeUnbindEvents: function() {
                this.list.length || this.unbindEvents()
            },
            add: function(e) {
                var t = this;
                t.list.push(e), t.hasActiveHandlers || t.bindEvents(), t.willProcessNextFrame || (t.willProcessNextFrame = !0, requestAnimationFrame(function() {
                    t.willProcessNextFrame = !1, t.process("add")
                }))
            },
            saveDimensions: function() {
                var e = this;
                a.each(e.list, function(e, t) {
                    t.update()
                }), e.windowHeight = t.height(), e.windowWidth = t.width(), e.screenSize = {
                    w: e.windowWidth,
                    h: e.windowHeight
                }
            },
            onScroll: function(e) {
                this.list.length && (this.setScrollTop(e.currentTarget), this.process("scroll"))
            },
            onResize: function() {
                this.refresh()
            },
            refresh: function() {
                this.list.length && this.saveDimensions()
            },
            refreshOffsets: function() {
                this.list.length && a.each(this.list, function(e, t) {
                    t.update("offsetOnly")
                })
            },
            isInViewport: function(e) {
                var t, i, s = this,
                    n = e.offset,
                    o = e.threshold,
                    r = o,
                    a = s.lastScrollY;
                return e.isThresholdPercentage && (o = 0), t = s.isTopInView(a, s.windowHeight, n.top, e.height, o, e), i = s.isBottomInView(a, s.windowHeight, n.top, e.height), t && e.isThresholdPercentage && (t = s.isTopPastPercent(a, s.windowHeight, n.top, e.height, r)), t || i
            },
            isTopInView: function(e, t, i, s, n, o) {
                return e <= i + n && i + n < e + t
            },
            isTopPastPercent: function(e, t, i, s, n) {
                return n <= (e + t - i) / t
            },
            isOutOfViewport: function(e, t) {
                var i, s = e.offset,
                    n = this.lastScrollY;
                return "bottom" === t && (i = !this.isBottomInView(n, this.windowHeight, s.top, e.height)), i
            },
            isBottomInView: function(e, t, i, s) {
                var n = i + s;
                return e < n && n <= e + t
            },
            triggerEnter: function(e) {
                setTimeout(function() {
                    e.enter.call(e.element, e)
                }, e.delay), a.isFunction(e.leave) ? e.triggered = !0 : this.list.splice(a.inArray(e, this.list), 1), this.maybeUnbindEvents()
            },
            getScreenSize: function() {
                return this.screenSize
            },
            triggerLeave: function(e) {
                setTimeout(function() {
                    e.leave.call(e.element, e)
                }, e.delay), e.triggered = !1
            },
            setScrollTop: function(e) {
                var t = this.lastScrollY,
                    i = a(e).scrollTop();
                this.$container.trigger("scroll-direction", {
                    direction: t < i ? "down" : "up",
                    previousScroll: t,
                    currentScroll: i
                }), this.lastScrollY = i
            },
            process: function(e) {
                var n = this,
                    t = a.extend([], n.list);
                a.each(t, function(e, t) {
                    var i = n.isInViewport(t),
                        s = t.hasLeaveCallback && n.isOutOfViewport(t, "bottom");
                    return !t.triggered && i ? (n.opts.observeLast && t.idx >= n.list.length - 3 && n.$container.trigger("second-to-last-in-the-view", {
                        viewportItem: t,
                        viewport: n
                    }), n.triggerEnter(t)) : !i && s && t.triggered ? n.triggerLeave(t) : void 0
                })
            }
        }, n.add = function(e) {
            return n.getInstance(e).add(new s(e))
        }, n.refresh = function() {
            n.getInstance().refresh()
        }, n.getInstance = function(e, t) {
            return i || (i = new n(e, t)), i
        }, window.FF_Viewport = n, window.FF_ViewportItem = s
    }(window.jQuery),
    function(i, e, F) {
        "use strict";
        var s = i.document.documentElement,
            p = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                msTransition: "MSTransitionEnd",
                transition: "transitionend"
            } [e.prefixed("transition")],
            f = e.csstransitions,
            h = e.csstransforms3d;

        function u(e, t) {
            e.style.WebkitTransform = t, e.style.msTransform = t, e.style.transform = t
        }

        function m() {
            var e = s.clientWidth,
                t = i.innerWidth;
            return e < t ? t : e
        }

        function g() {
            var e = s.clientHeight,
                t = i.innerHeight;
            return e < t ? t : e
        }

        function n(e, t) {
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
            return e
        }

        function t(e, t) {
            return this.el = e[0], this.$el = e, this.options = n({}, this.options), n(this.options, t), this._init()
        }
        t.prototype.options = {}, t.prototype._init = function() {
            return this.$body = F("body"), this.grid = this.el.querySelector(".ff-stream-wrapper"), this.gridItems = [].slice.call(this.grid.querySelectorAll(".ff-item:not(.ff-ad)")), this.gridItems.length || (this.gridItems = [].slice.call(this.grid.querySelectorAll("li[class*=ff-slide]"))), this.itemsCount = this.gridItems.length, this.$wrapper = this.$el.find(".ff-slideshow-classic"), this.slideshow = this.el.querySelector(".ff-slideshow-classic > ul"), this.$slideshow = F(this.slideshow), this.$slideshow.data("media", !1), this.$wrapper.addClass("ff-" + this.options.iconStyle + "-icon"), this._addSlideShowItems(this.gridItems), this.slideshowItems = [].slice.call(this.slideshow.children), this.current = -1, this.ctrlPrev = this.el.querySelector(".ff-nav-prev"), this.ctrlNext = this.el.querySelector(".ff-nav-next"), this.ctrlClose = this.el.querySelector(".ff-nav-close"), this.plugin = this.$el.data("plugin"), this._initEvents(), this
        }, t.prototype._addSlideShowItems = function(e, t, I, $, _) {
            var O = this,
                E = F(),
                A = I ? 640 : 600;
            if (e.forEach(function(e, t) {
                    var i, s, n, o, r, a, l, d, c, p, f, h, u, m = -1 != e.className.indexOf("ff-slide") ? F(e).data("original-element") : F(e),
                        g = F('<li><div class="ff-slide-wrapper"></div></li>'),
                        v = g.find(".ff-slide-wrapper"),
                        w = m.find(".picture-item__inner").children().clone(),
                        y = m.attr("data-type"),
                        b = "",
                        x = !1,
                        k = FlowFlowOpts.view_on + " " + y,
                        C = m.attr("data-media");
                    if ("rss" != y && "posts" != y || (k = FlowFlowOpts.view_on_site), C ? (I || O.$slideshow.data("media", !0), n = C.split(";"), a = parseInt(n[0]), o = parseInt(n[1]), l = n[2], r = n[3], "instagram" === y && "image" !== r && (l.indexOf(".jpg") + 1 || l.indexOf(".png") + 1) && (r = "image"), v.data("media", C), I && (o *= A / a, a = A), i = F('<div class="ff-media-wrapper' + ("image" == r ? "" : " ff-video") + '" style="' + (I ? "height:" + o + "px;" : "") + "max-height: " + o + 'px;"></div>'), v.prepend(i), "image" == r ? (d = o / a, !I && 1e3 < o && (a *= 1e3 / o, o = 1e3), (A < a || I) && (o *= A / a, a = A), b = '<span class="ff-img-holder ' + (1 < d ? " ff-img-portrait" : " ff-img-landscape") + '"' + (I ? "" : ' style="width: ' + a + "px; max-height: " + o + "px; height: " + o + 'px;"') + '><img class="ff-initial-image" src="' + l + '"/></span>', i.addClass("ff-slide-img-loading").data("media-image", n[2])) : (r.indexOf("video/mp4") + 1 ? b = '<video controls width="' + a + '" height="' + o + '"><source src="' + n[2] + '" type="video/mp4">Your browser does not support the video tag.</video>' : (l = l.replace("http:", "").replace("https:", "").replace("/v/", "/embed/").replace("autoplay=1", "autoplay=0") + ("vimeo" != y ? "&fs=1&enablejsapi=1&mute=0" : ""), I && (o *= A / a, a = A), b = '<iframe width="' + a + '" height="' + o + '" src="' + l + '" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" webkitallowfullscreen mozallowfullscreen autoplay="1" wmode="opaque" data-controls="true" allow="encrypted-media"></iframe>', l.indexOf("facebook.com/video/embed") + 1 && i.after('<span class="ff-cta">(Click image to play video)</span>')), i.addClass("ff-slide-img-loading")), i.data("media", b), w.find(".ff-img-holder").remove()) : w.find(".ff-img-holder").length ? w.find(".ff-img-holder").each(function(e, t) {
                            var i = F(this),
                                s = F(this).find("img"),
                                n = s.get(0);
                            x ? i.remove() : (i.removeClass("ff-img-loading").addClass("ff-img-loaded").css({
                                "background-image": 'url("' + n.src + '")',
                                width: parseInt(n.style.width),
                                height: parseInt(n.style.height)
                            }), s.remove(), x = !0, o = parseInt(n.style.height))
                        }) : (i = F('<div class="ff-media-wrapper"></div>'), v.prepend(i), o = "initial"), v.append(w.not(".ff-img-holder")), I && v.prepend('<div class="ff-item-header"></div>'), s = v.find(".ff-item-cont"), p = m.find(".ff-moderation-wrapper"), s.append(g.find("h4")), s.append(g.find(".ff-article")), s.append(g.find(".ff-item-meta")), s.find(".ff-userpic").append(g.find(".ff-icon")), s.find(".ff-item-meta").prepend(s.find(".ff-userpic")).append(v.find(".ff-item-bar")).append(v.find(".ff-name")), s.find(".ff-name").removeClass("ff-name").addClass("ff-external-link").html(k).attr("href", s.find(".ff-timestamp").attr("href")), I ? (v.find(".ff-item-header").append('<div class="ff-dropdown"></div>').prepend(s.find(".ff-userpic")).prepend(s.find(".ff-nickname")), p.length && v.prepend(p.clone())) : s.find(".ff-item-meta").append('<div class="ff-dropdown"></div>'), v.find(".ff-dropdown").append(s.find(".ff-external-link")).append(s.find(".ff-share-wrapper")).append('<span class="flaticon-share2"></span>'), s.find(".ff-item-bar").append(s.find(".ff-timestamp")).append(s.find(".ff-location")), s.find(".ff-item-bar").before(s.find(".ff-content")), s.find(".ff-content").prepend(s.find("h4")), "" != s.find(".ff-content").html() && s.find(".ff-content").addClass("not-empty"), o = "initial" == o ? o : o < 420 ? "420px" : 1e3 < o ? "1000px" : o + "px", I || (s.closest(".ff-slide-wrapper").css("max-height", o), s.css("height", o)), "twitter" == y && s.find(".ff-comments").remove(), s.append('<div class="ff-comments-list"><div class="ff-comments-list-inner"><div class="ff-slide-loader"><span>' + FlowFlowOpts.loading + "...</span></div></div></div>"), g.attr("data-type", m.attr("data-type")).attr("post-id", m.attr("post-id")).attr("data-feed", m.attr("data-feed")), m.hasClass("ff-supports-comments")) {
                        g.addClass("ff-supports-comments ff-slide-" + y + (C ? " ff-slide-media" : " ff-slide-no-media"));
                        var T = s.find(".ff-item-meta").outerHeight(),
                            S = o - T;
                        s.find(".ff-comments-list").css("min-height", S + "px")
                    } else g.addClass("ff-no-comments ff-slide-" + y + (C ? " ff-slide-media" : " ff-slide-no-media"));
                    if (E = E.add(g), $) {
                        if (v = (c = g.clone(!0)).find(".ff-slide-wrapper"), _)
                            for (f = {
                                    text: c.find(".ff-item-cont").detach(),
                                    image: c.find(".ff-media-wrapper").detach(),
                                    meta: c.find(".ff-item-header").detach()
                                }, h = 0, u = _.length; h < u; h++) v.append(f[_[h]]);
                        m.before(c).detach(), c.data("original-element", m)
                    }
                }), I) return E;
            O.$slideshow.append(E), t && (O.gridItems = O.gridItems.concat(e)), O.$slideshow.data("media") && O.$slideshow.addClass("ff-slideshow-media")
        }, t.prototype._initEvents = function(e) {
            var t = this;
            this.initItemsEvents(this.gridItems), F(this.ctrlPrev).on("click", function() {
                t._navigate("prev")
            }), F(this.ctrlNext).on("click", function() {
                t._navigate("next")
            }), F(this.ctrlClose).on("click", function() {
                t._closeSlideshow()
            }), this.$wrapper.on("click", function(e) {
                F(e.target).closest("li, nav").length || t._closeSlideshow()
            }), F(i).on("resize", function() {
                t._resizeHandler()
            }), F(document).on("keydown", function(e) {
                if (t.isSlideshowVisible) switch (e.keyCode || e.which) {
                    case 37:
                        t._navigate("prev");
                        break;
                    case 39:
                        t._navigate("next");
                        break;
                    case 27:
                        t._closeSlideshow()
                }
            }), this.$wrapper.on("touchmove", function(e) {
                e.stopPropagation()
            })
        }, t.prototype.initItemsEvents = function(e, l) {
            var d = this,
                c = F(this.grid).data("opts") && F(this.grid).data("opts").titles;
            l = l || 0, e.forEach(function(e, a) {
                F(e).on("click", function(e) {
                    var t = F(this).closest(".ff-stream").data("plugin"),
                        i = F(e.target),
                        s = i.closest("a"),
                        n = i.closest("h4").length,
                        o = i.closest(".ff-icon-share").length,
                        r = i.closest(".ff-moderation-wrapper").length;
                    if (s.length && !i.is("img") || o || r) {
                        if ("yep" === c && n) return;
                        if (!n) return
                    }
                    e.preventDefault(), d._openSlideshow(t, a + l)
                })
            })
        }, t.prototype._freezeScroll = function(e) {
            0 < F(".ff-item-cont:hover").length || e.preventDefault()
        }, t.prototype.checkScrollbar = function() {
            this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight, this.scrollbarWidth = this.measureScrollbar(), 0 < this.scrollbarWidth && (this.scrollbarVisible = !0)
        }, t.prototype.setScrollbar = function() {
            var e = parseInt(this.$body.css("padding-right") || 0, 10);
            this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth)
        }, t.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", "")
        }, t.prototype.measureScrollbar = function() {
            var e = document.createElement("div");
            e.className = "ff-modal-scrollbar-measure", this.$body.append(e);
            var t = e.offsetWidth - e.clientWidth;
            return this.$body[0].removeChild(e), t
        }, t.prototype.loadCommentsAndCarousel = function(e, t, i) {
            var l = this.$slideshow.find('[post-id="' + i + '"]'),
                o = l.find(".ff-comments-list-inner");
            if ("added" !== o.data("comments") && "added" !== l.data("carousel")) {
                var s = F.get(FlowFlowOpts.ajaxurl, {
                    shop: FlowFlowOpts.domain,
                    action: e + "_load_comments_and_carousel",
                    feed_id4post: t,
                    post_id: i,
                    permalink: l.find("a.ff-timestamp").attr("href")
                });
                o.find(".ff-slide-loader").show(), F.when(s).then(function(e) {
                    var a = "",
                        t = e.comments;
                    t && 0 !== t.length ? t.forEach(function(e, t, i) {
                        var s, n, o = "string" == typeof e.from && e.from && "Facebook user" !== e.from && -1 != e.from.indexOf("{") ? JSON.parse(e.from) : e.from,
                            r = e.text;
                        "instagram" == l.data("type") && (n = "https://www.instagram.com/" + (s = o.username)), "facebook" == l.data("type") && (s = o && o.name ? o.name : o || "", n = "https://www.facebook.com/" + (o ? o.id : "")), "youtube" == l.data("type") && (s = o.full_name, n = "https://www.youtube.com/channel/" + o.id), "posts" == l.data("type") && (n = "/author/" + (s = o.name)), a += '<div class="ff-slide-comment">', s ? (a += '<a href="' + n + '" rel="noreferrer" target="_blank" title="' + s + '">', a += "<b>" + s + "</b>", a += "</a>", a += "<span>" + r + "</span>") : a += '<span>"' + r + '"</span>', a += "</div>"
                    }) : a += "<div>" + (FlowFlowOpts && FlowFlowOpts.no_comments ? FlowFlowOpts.no_comments : "No comments yet.") + ' <a href="' + l.find(".ff-comments").attr("href") + '" rel="noreferrer" target="_blank">' + (FlowFlowOpts && FlowFlowOpts.be_first ? FlowFlowOpts.be_first : "Be the first!") + "</a></div>", o.html(a).data("comments", "added"), setTimeout(function() {
                        o.addClass("ff-comments-loaded")
                    }, 0);
                    var i = e.carousel;
                    if (!(i.length < 2)) {
                        var s = l.find(".ff-img-holder").outerWidth(),
                            n = l.find(".ff-img-holder").outerHeight();
                        l.find(".ff-media-wrapper").css("width", s + "px").css("height", n + "px"), l.find(".ff-media-wrapper").find(".ff-slideshow-carousel").remove(), l.find(".ff-media-wrapper").append('<div class="ff-slideshow-carousel" style="height:' + n + 'px"></div>'), i.forEach(function(e, t) {
                            if ("image" == e.media_type || "photo" == e.media_type || e.media_url.indexOf(".jpg") + 1 || e.media_url.indexOf(".png") + 1) var i = '<span class="ff-img-holder" style="background-image: url(' + e.media_url + ')">';
                            l.find(".ff-slideshow-carousel").append(i)
                        });
                        l.find(".ff-media-wrapper > .ff-img-holder").hide(), l.find(".ff-slideshow-carousel").slick({
                            adaptiveHeight: !0,
                            infinite: !0,
                            arrows: !0,
                            dots: !0,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            prevArrow: '<span class="ff-arrow-left slick-prev slick-nav"></span>',
                            nextArrow: '<span class="ff-arrow-right slick-next slick-nav"></span>'
                        }), l.data("carousel", "added")
                    }
                }, function(e) {
                    o.html("Sorry, something went wrong during loading comments for this post. Try to re-open lightbox.")
                })
            }
        }, t.prototype._openSlideshow = function(e, t) {
            this.isSlideshowVisible = !0, this.current = t, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("ff-modal-open" + (this.scrollbarVisible ? " ff-modal-scrollbar" : ""));
            var i = this;
            i._setViewportItems();
            var s = F(i.currentItem),
                n = F(i.nextItem),
                o = F(i.prevItem),
                r = m(),
                a = g();
            i.$curr = s, this.loadCommentsAndCarousel(e, s.attr("data-feed"), s.attr("post-id")), s.find(".ff-media-wrapper").each(function(e, t) {
                var i = F(this),
                    s = i.parent().parent().data("type");
                if (i.data("media") && "inserted" !== i.data("media")) {
                    if (i.data("media-image")) {
                        var n = new Image;
                        n.src = i.data("media-image"), n.onload = function() {
                            i.removeClass("ff-slide-img-loading")
                        }
                    } else i.removeClass("ff-slide-img-loading");
                    "soundcloud" == s ? i.parent().parent().find(".ff-item-meta").after(i.data("media")) : i.append(i.data("media")), i.data("media", "inserted")
                }
            }), n.add(o).find(".ff-media-wrapper").each(function(e, t) {
                var i = F(this),
                    s = i.data("media"),
                    n = i.parent().parent().data("type");
                if (s && "inserted" !== s && !/iframe|video/.test(s)) {
                    if (i.data("media-image")) {
                        var o = new Image;
                        o.src = i.data("media-image"), o.onload = function() {
                            i.removeClass("ff-slide-img-loading")
                        }
                    } else i.removeClass("ff-slide-img-loading");
                    "soundcloud" == n ? i.parent().parent().find(".ff-item-meta").after(i.data("media")) : i.append(i.data("media")), i.data("media", "inserted")
                }
            }), s.addClass("ff-current ff-show");
            var l = parseInt(Number(i.currentItem.offsetHeight / 2 * 1));
            if (a < 2 * l ? l = parseInt(a / 2) - 25 : l -= 25, u(i.currentItem, h ? "translate3d(" + parseInt(Number(i.currentItem.offsetWidth / 2 * -1)) + "px, -" + l + "px, 0px)" : "translate(-50%, -50%)"), i.prevItem) {
                o.addClass("ff-show");
                var d = Number(-1 * (r / 2 + i.prevItem.offsetWidth / 2));
                u(i.prevItem, h ? "translate3d(" + (d + 100) + "px, -50%, 0px)" : "translate(" + d + "px, -50%)")
            }
            if (i.nextItem) {
                n.addClass("ff-show");
                d = Number(r / 2 + i.nextItem.offsetWidth / 2);
                u(i.nextItem, h ? "translate3d(" + (d - 100) + "px,-50%, 0px)" : "translate(" + d + "px, -50%)")
            }
            setTimeout(function() {
                i.$wrapper.addClass("ff-slideshow-open").scrollTop(0)
            }, 200)
        }, t.prototype._navigate = function(s) {
            if (!this.isAnimating)
                if ("next" === s && this.current === this.itemsCount - 1 || "prev" === s && 0 === this.current) this._closeSlideshow();
                else {
                    if ("next" === s && this.current < this.itemsCount) var e = this.current + 1;
                    if ("prev" === s && 0 < this.current) e = this.current - 1;
                    this.loadCommentsAndCarousel(this.plugin, this.gridItems[e].attributes["data-feed"].value, this.gridItems[e].attributes["post-id"].value), this.isAnimating = !0, this._setViewportItems();
                    var n, t, o, r = this,
                        a = m(),
                        l = g(),
                        i = this.currentItem.offsetWidth,
                        d = h ? "translate3d(-" + Number(a / 2 + i / 2) + "px, -50%, -150px)" : "translate(-" + Number(a / 2 + i / 2) + "px, -50%)",
                        c = h ? "translate3d(" + Number(a / 2 + i / 2) + "px, -50%, -150px)" : "translate(" + Number(a / 2 + i / 2) + "px, -50%)";
                    "next" === s ? (n = h ? "translate3d( -" + Number(2 * a / 2 + i / 2) + "px, -50%, -150px )" : "translate(-" + Number(2 * a / 2 + i / 2) + "px, -50%)", t = h ? "translate3d( " + Number(2 * a / 2 + i / 2) + "px, -50%, -150px )" : "translate(" + Number(2 * a / 2 + i / 2) + "px, -50%)") : (n = h ? "translate3d( " + Number(2 * a / 2 + i / 2) + "px, -50%, -150px )" : "translate(" + Number(2 * a / 2 + i / 2) + "px)", t = h ? "translate3d( -" + Number(2 * a / 2 + i / 2) + "px, -50%, -150px )" : "translate(-" + Number(2 * a / 2 + i / 2) + "px, -50%)"), r.$slideshow.removeClass("ff-animatable"), ("next" === s && this.current < this.itemsCount - 2 || "prev" === s && 1 < this.current) && (u(o = this.slideshowItems["next" === s ? this.current + 2 : this.current - 2], t), F(o).addClass("ff-show").find(".ff-media-wrapper").each(function(e, t) {
                        var i = F(this),
                            s = i.data("media"),
                            n = i.parent().parent().data("type");
                        if (s && "inserted" !== s && !/iframe|video/.test(s)) {
                            if (i.data("media-image")) {
                                var o = new Image;
                                o.src = i.data("media-image"), o.onload = function() {
                                    i.removeClass("ff-slide-img-loading")
                                }
                            } else i.removeClass("ff-slide-img-loading");
                            "soundcloud" == n ? i.parent().parent().find(".ff-item-meta").after(i.data("media")) : i.prepend(i.data("media")), i.data("media", "inserted")
                        }
                    }));
                    setTimeout(function() {
                        var e;
                        r.$slideshow.addClass("ff-animatable"), r.$curr.removeClass("ff-current");
                        var t = "next" === s ? r.nextItem : r.prevItem;
                        F(t).addClass("ff-current").find(".ff-media-wrapper").each(function(e, t) {
                            var i = F(this),
                                s = i.data("media"),
                                n = i.parent().parent().data("type");
                            if (s && "inserted" !== s) {
                                if (i.data("media-image")) {
                                    var o = new Image;
                                    o.src = i.data("media-image"), o.onload = function() {
                                        i.removeClass("ff-slide-img-loading")
                                    }
                                } else i.removeClass("ff-slide-img-loading");
                                "soundcloud" == n ? i.parent().parent().find(".ff-item-meta").after(i.data("media")) : i.prepend(i.data("media")), i.data("media", "inserted")
                            }
                        }), u(r.currentItem, "next" === s ? d : c), r.nextItem && (e = parseInt(Number(r.nextItem.offsetHeight / 2 * 1)), l < 2 * e ? e = parseInt(l / 2) - 25 : "next" === s && r.$wrapper.scrollTop(0), u(r.nextItem, "next" === s ? h ? "translate3d(" + parseInt(Number(r.nextItem.offsetWidth / 2 * -1)) + "px, -" + e + "px, 0px)" : "translate(-50%, -50%)" : n)), r.prevItem && (e = parseInt(Number(r.prevItem.offsetHeight / 2 * 1)), l < 2 * e ? (e = parseInt(l / 2) - 25, "prev" === s && r.$slideshow.scrollTop(0)) : "prev" === s && r.$wrapper.scrollTop(0), u(r.prevItem, "next" === s ? n : h ? "translate3d(" + parseInt(Number(r.prevItem.offsetWidth / 2 * -1)) + "px, -" + e + "px, 0px)" : "translate(-50%, -50%)")), o && u(o, "next" === s ? c : d);
                        var i = function(e) {
                            if (f && 800 <= a) {
                                if (-1 === e.originalEvent.propertyName.indexOf("transform")) return !1;
                                F(this).off(p, i)
                            }
                            r.prevItem && "next" === s ? F(r.prevItem).removeClass("ff-show") : r.nextItem && "prev" === s && F(r.nextItem).removeClass("ff-show"), r._resetMedia(F(r.currentItem)), "next" === s ? (r.prevItem = r.currentItem, r.currentItem = r.nextItem, o && (r.nextItem = o)) : (r.nextItem = r.currentItem, r.currentItem = r.prevItem, o && (r.prevItem = o)), r.$curr = F(r.currentItem), r.current = "next" === s ? r.current + 1 : r.current - 1, r.isAnimating = !1
                        };
                        f && 800 <= a ? r.$curr.on(p, i) : i()
                    }, 25)
                }
        }, t.prototype._closeSlideshow = function(e) {
            this.$wrapper.removeClass("ff-slideshow-open"), this.$slideshow.removeClass("ff-animatable"), this.resetScrollbar(), this.$body.removeClass("ff-modal-open ff-modal-scrollbar");
            var i = this,
                s = function(e) {
                    if (f && e) {
                        if ("section" !== e.target.tagName.toLowerCase()) return;
                        F(this).off(p, s)
                    }
                    var t = F(i.currentItem);
                    (i.$curr = t).removeClass("ff-current"), t.removeClass("ff-show"), i._resetMedia(t), i.prevItem && F(i.prevItem).removeClass("ff-show"), i.nextItem && F(i.nextItem).removeClass("ff-show"), i.slideshowItems.forEach(function(e) {
                        u(e, "")
                    }), i.isSlideshowVisible = !1
                };
            f ? this.$wrapper.on(p, s) : s()
        }, t.prototype._resetMedia = function(e) {
            var t = e.attr("data-type");
            if ("vine" !== t && "soundcloud" !== t) {
                var i = e.find(".ff-video"),
                    s = i.find("iframe, video");
                s.length && (s.is("iframe") ? i.prepend(s) : s.get(0).pause())
            }
        }, t.prototype._setViewportItems = function() {
            this.currentItem = null, this.prevItem = null, this.nextItem = null, this.$curr = null, 0 < this.current && (this.prevItem = this.slideshowItems[this.current - 1]), this.current < this.itemsCount - 1 && (this.nextItem = this.slideshowItems[this.current + 1]), this.currentItem = this.slideshowItems[this.current], this.$curr = F(this.currentItem)
        }, t.prototype._resizeHandler = function() {
            var e = this;
            this._resizeTimeout && clearTimeout(this._resizeTimeout), this._resizeTimeout = setTimeout(function() {
                e._resize(), e._resizeTimeout = null
            }, 50)
        }, t.prototype._resize = function() {
            if (this.isSlideshowVisible) {
                if (this.prevItem) {
                    var e = Number(-1 * (m() / 2 + this.prevItem.offsetWidth / 2));
                    u(this.prevItem, h ? "translate3d(" + e + "px, -50%, -150px)" : "translate(" + e + "px, -50%)")
                }
                if (this.nextItem) {
                    e = Number(m() / 2 + this.nextItem.offsetWidth / 2);
                    u(this.nextItem, h ? "translate3d(" + e + "px, -50%, -150px)" : "translate(" + e + "px, -50%)")
                }
                var t = g(),
                    i = parseInt(Number(this.currentItem.offsetHeight / 2 * 1));
                t < 2 * i && (i = parseInt(t / 2) - 25), u(this.currentItem, h ? "translate3d(" + parseInt(Number(this.currentItem.offsetWidth / 2 * -1)) + "px, -" + i + "px, 0px)" : "translate(-50%, -50%)")
            }
        }, i.CBPGridGallery = t
    }(window, window.CustomModernizr, window.jQuery),
    function(P) {
        function a(e, g, t) {
            var v, i, s, n, o = 0,
                r = [],
                a = (t = jQuery.makeArray(t || e.querySelectorAll(g.itemSelector))).length,
                l = P(e),
                d = P(t),
                c = e.getBoundingClientRect(),
                p = g.sizes.spacing;
            for (I = p.length; I--;)
                if (n = p[I].size, c.width < n) {
                    s = parseInt(p[I].val);
                    break
                } for (var f, h, u, m, w, y, b, x, k = Math.floor(c.right - c.left) - 2 * s, C = [], T = N(k, g.sizes.row), S = N(k, g.sizes.spacing), I = 0; I < a; ++I) !(f = t[I].getElementsByTagName("img")[0]) || t[I].className.indexOf("ff-ad") + 1 ? (h = 300, u = T) : ((m = f.getAttribute("data-size")) && (m = m.split(";"), h = parseInt(m[0]), u = parseInt(m[1])), h && u || ((h = parseInt(f.getAttribute("width"))) || f.setAttribute("width", h = f.offsetWidth), (u = parseInt(f.getAttribute("height"))) || f.setAttribute("height", u = f.offsetHeight))), C[I] = {
                width: (w = h, y = u, b = T, void 0, x = b / y, Math.round(w * x)),
                height: T
            };
            l.css("padding", "0 " + s + "px"), a = t.length;
            for (var $ = 0; $ < a; ++$) {
                if (t[$].classList ? (t[$].classList.remove(g.firstItemClass), t[$].classList.remove(g.lastRowClass)) : t[$].className = t[$].className.replace(new RegExp("(^|\\b)" + g.firstItemClass + "|" + g.lastRowClass + "(\\b|$)", "gi"), " "), o += C[$].width, r.push(t[$]), $ === a - 1)
                    for (var _ = 0; _ < r.length; _++) 0 === _ && (r[_].className += " " + g.lastRowClass), r[_].style.cssText = "width: " + C[$ + parseInt(_) - r.length + 1].width + "px;height: " + C[$ + parseInt(_) - r.length + 1].height + "px;margin-right:" + (_ < r.length - 1 ? S + "px" : 0);
                if (o + S * (r.length - 1) > k) {
                    var O, E = o + S * (r.length - 1) - k,
                        A = (r.length, 0);
                    for (_ = 0; _ < r.length; _++) {
                        O = r[_];
                        var F = C[$ + parseInt(_) - r.length + 1].width,
                            M = F - F / o * E,
                            z = Math.round(C[$ + parseInt(_) - r.length + 1].height * (M / F));
                        .5 <= A + 1 - M % 1 ? (A -= M % 1, M = Math.floor(M)) : (A += 1 - M % 1, M = Math.ceil(M)), O.style.cssText = "width: " + M + "px;height: " + z + "px;margin-right: " + (_ < r.length - 1 ? S : 0) + "px;margin-bottom: " + S + "px", O.querySelectorAll(".ff-img-holder").length ? O.querySelectorAll(".ff-img-holder")[0].style.cssText = "width: " + M + "px;height: " + z + "px;" : O.querySelectorAll(".picture-item__inner")[0].style.cssText = "width: " + M + "px;height: " + z + "px;", P(O).data("newHeight", z), P(O).data("newWidth", M), 0 === _ && (O.className += " " + g.firstItemClass)
                    }
                    r = [], o = 0
                }
            }

            function N(e, t) {
                var i, s;
                for (i = t.length; i--;)
                    if (e < t[i].size) {
                        s = parseInt(t[i].val);
                        break
                    } return s
            }
            i = d.not(".ff-ad").first(), v = i.find(".ff-item-meta").height(), d.each(function(e) {
                var t, i, s, n, o, r, a, l, d, c, p, f = P(this),
                    h = f.data(),
                    u = (h.media && h.media.split(";"), {}),
                    m = !!f.find(".ff-img-holder img").length;
                a = f.find(m ? ".ff-overlay-wrapper" : ".ff-item-cont"), o = f.find(".ff-content"), r = f.find(".ff-overlay-wrapper > h4"), l = (l = a.children()).not(".ff-overlay"), "label1" === g.streamOpts["icon-style"] && f.is(".ff-meta-first") || (l = l.not(".ff-label-wrapper")), c = parseInt(l.first().css("marginTop")), p = parseInt(l.last().css("marginBottom")), n = .07 * f.data("newWidth"), d = (l.length - 1) * n + c + p, s = r.length ? r.height() : 0, (t = f.data("newHeight") - s - v - 44 - d) < 21 && (t = 20 <= t ? 20 : s ? 0 : t < 0 ? 21 + t - n : t), u = {
                    height: t
                }, o.css(u), 0 !== u.height && o.length || (i = f.data("newHeight") - v - 44 - d, u = {}, (i = Math.floor(i)) <= 21 && (20 <= i + n ? (r.addClass("ff-header-min"), i = 21) : (i = i < 0 ? 21 + i - n : i, u.textIndent = "-9999px")), (u.height = i) <= 0 && r.detach(), r.css(u))
            })
        }
        P.fn.rowGrid = function(o, r) {
            return this.each(function() {
                var e, t, i, s, n = P(this);
                "appended" === o ? (o = n.data("grid-options"), e = (t = n.children("." + o.lastRowClass)).nextAll(o.itemSelector).add(t), a(this, o, e)) : "shuffle" === o ? (o = n.data("grid-options"), e = n.data("items"), i = this, (s = function(s, e) {
                    var n = P(),
                        o = P();
                    return function(e, t, i) {
                        for (var s = 0, n = e.length; s < n; s++)
                            if (t.call(i, e[s], s, e) === {}) return
                    }(e, function(e) {
                        var t, i = P(e);
                        t = i, s.call(t[0], t) || i.is(".ff-ad") ? n = n.add(i) : o = o.add(i)
                    }, this), {
                        filtered: n,
                        concealed: o
                    }
                }(r, e)).filtered.each(function() {
                    var e = P(this);
                    e.add(e.find(".ff-img-holder, .picture-item__inner")).removeAttr("style")
                }), s.concealed.hide(), P(i).data("group", s.filtered), e = s.filtered, a(this, o, e)) : (o = P.extend({}, P.fn.rowGrid.defaults, o), n.data("grid-options", o), a(this, o), o.resize && P(window).on("resize.rowGrid", {
                    container: this
                }, function(e) {
                    var t = P(e.data.container).data("group");
                    t && t.each(function() {
                        var e = P(this);
                        e.add(e.find(".ff-img-holder, .picture-item__inner")).removeAttr("style")
                    }), P(e.data.container).find(".ff-item:not(.ff-ad) .ff-content").dotdotdot({
                        ellipsis: "...",
                        after: ""
                    }), a(e.data.container, o, t)
                }))
            })
        }, P.fn.rowGrid.defaults = {
            minMargin: null,
            maxMargin: null,
            resize: !0,
            lastRowClass: "last-row",
            firstItemClass: null
        }
    }(jQuery),
    function(s) {
        "use strict";
        var e, d, t = s("html"),
            i = navigator.userAgent.toLowerCase(),
            n = /safari|chrome/.test(i),
            B = /android|blackBerry|iphone|ipad|ipod|opera mini|iemobile/i.test(i),
            o = /msie|trident.*rv\:11\./.test(i),
            r = /firefox/.test(i),
            g = !1,
            V = window.FlowFlowOpts;
        if (o) {
            if (/msie 8/.test(i)) return;
            e = /msie 9/.test(i)
        }
        t.addClass("ff-browser-" + (n ? /chrome/.test(i) ? "chrome" : "safari" : o ? "ie" + (e ? " ff-ie9" : "") : r ? "ff" : "")), s.expr.createPseudo && "function" == typeof s.expr.createPseudo ? s.expr[":"].contains = s.expr.createPseudo(function(t) {
            return function(e) {
                return 0 <= s(e).text().toUpperCase().indexOf(t.toUpperCase())
            }
        }) : s.expr[":"].contains = function(e, t, i) {
            return 0 <= s(e).text().toUpperCase().indexOf(i[3].toUpperCase())
        };
        var v = function(A) {
            var P, x, k, C, s, L = "agoStyleDate" === V.date_style ? function(e, t) {
                    return function(e) {
                        var t, i, s, n, o, r, a = V.server_time,
                            l = a - e,
                            d = new Date(1e3 * e),
                            c = h.length - 1;
                        for (r = c; 0 <= r && (t = l / h[r]) <= 1; r--);
                        r < 0 && (r = 0);
                        switch (t = Math.floor(t), r) {
                            case 3:
                                if (1 == t) {
                                    i = V.dates.Yesterday;
                                    break
                                }
                                case 4:
                                case 5:
                                    s = d.getMonth(), n = d.getDate(), i = u[s] + " " + n;
                                    break;
                                case 6:
                                case 7:
                                    s = d.getMonth(), n = d.getDate(), o = d.getFullYear(), i = u[s] + " " + n + ", " + o;
                                    break;
                                default:
                                    a - l % h[r], p = t, f = (f = m)[r], i = p + f + " " + V.dates.ago
                        }
                        var p, f;
                        return i
                    }(e)
                } : function(e, t) {
                    return t
                },
                h = [1, 60, 3600, 86400, 604800, 2630880, 31570560, 315705600],
                u = V.dates.months,
                m = [V.dates.s, V.dates.m, V.dates.h],
                T = A("body"),
                F = {},
                S = function() {
                    var e = window.sessionStorage;
                    try {
                        return e.setItem("test", "1"), e.removeItem("test"), !0
                    } catch (e) {
                        return !1
                    }
                }(),
                c = {
                    tiny: {
                        maxWidth: 300
                    },
                    small: {
                        minWidth: 300
                    },
                    medium: {
                        minWidth: 480
                    },
                    large: {
                        minWidth: 800
                    }
                };

            function e() {
                return A(document).bind("ffimgloaded", function(e, t) {
                    var i = t.$grid.data("shuffle");
                    i && i.layout()
                }), e = function() {
                    return v
                }, v
            }

            function M(e, t) {
                t = Math.pow(10, t);
                for (var i = ["k", "m", "b", "t"], s = i.length - 1; 0 <= s; s--) {
                    var n = Math.pow(10, 3 * (s + 1));
                    if (n <= e) {
                        1e3 == (e = Math.round(e * t / n) / t) && s < i.length - 1 && (e = 1, s++), e += i[s];
                        break
                    }
                }
                return e
            }

            function W(e) {
                switch (e) {
                    case "user_timeline":
                        return '<i class="flaticon-feed_type_user"></i>';
                    case "likes":
                    case "liked":
                        return '<i class="flaticon-feed_type_like"></i>';
                    case "tag":
                        return '<i class="flaticon-feed_type_hash"></i>';
                    case "location":
                    case "coordinates":
                        return '<i class="flaticon-feed_type_loc"></i>';
                    default:
                        return ""
                }
            }

            function p(e) {
                var t = e.find(".ff-filter-holder"),
                    i = e.find(".selectric-ff-filters-select"),
                    s = e.find(".ff-filter-holder .ff-filter"),
                    n = t.width(),
                    o = (e.find(".ff-search").outerWidth(), 0);
                A.each(s, function() {
                    o += A(this).outerWidth() + 12
                }), i.hide(), s.show(), n < o && (i.css("display", "inline-block"), s.hide())
            }

            function f(e, t) {
                var i, s, n, o, r, a, l = e[0].offsetWidth,
                    d = e.data("size");
                for (i in c) n = l, o = c[i], void 0, r = o.minWidth || 0, a = o.maxWidth || 1 / 0, r <= n && n <= a && (s = i);
                s && d != s && e.add(t).attr("data-size", s)
            }

            function I(t, i, e) {
                s && clearTimeout(s), s = setTimeout(function() {
                    var e;
                    f(e = t), p(e), f(i), s = null
                }, 50)
            }

            function z(e, t) {
                for (var a, i = 0, s = t.template.length; i < s; i++) "image" === t.template[i] && (a = i);
                e.each(function(e, t) {
                    var i, s, n = A(t),
                        o = n.find(".ff-img-holder"),
                        r = "insertBefore";
                    o.closest(".ff-content").length && (i = n.find(".ff-item-cont").children().not(".ff-label-wrapper"), a >= i.length ? (s = i.length - 1, a > i.length && (r = "insertAfter")) : s = a, o[r](i.eq(s))), n.addClass("ff-" + (o.length ? "" : "no-") + "image")
                })
            }

            function N(t) {
                var e, i, s, n, o = A(this),
                    r = this,
                    a = o.parent(),
                    l = a.is("a") ? a : o;
                (s = o.data("size")) && (e = s.split(";")[1], i = e && 0 != e), i || (e = o.attr("height") || o.height(), i = e && 0 != e), s || o.data("size", {
                    height: e,
                    width: o.attr("width") || o.width()
                }), a.is(".ff-img-holder") || (o.removeAttr("width").removeAttr("height"), n = A('<span class="ff-img-holder ff-img-loading" style="width: 100%;max-height: none"></span>'), l.wrap(n)), r.onload = function() {
                    i || A(document).trigger("ffimgloaded", {
                        $grid: t
                    });
                    var e = o.closest(".ff-img-holder");
                    e.removeClass("ff-img-loading"), setTimeout(function() {
                        e.addClass("ff-img-loaded"), e = null
                    }, 100), r = o = null
                }, r.onerror = function() {
                    o.closest(".ff-img-holder").removeClass("ff-img-loading").addClass("ff-img-loaded"), r = o = null
                }, l = a = null
            }

            function H(e, t, i, s, n, o) {
                var r, a, l, d, c, p, f, h, u, m, g, v, w, y, b, x, k, C, T, S, I = e.length,
                    $ = "",
                    _ = "",
                    O = "",
                    E = n["icon-style"] && -1 < n["icon-style"].indexOf("stamp"),
                    A = t,
                    F = "yep" === n["max-res"];
                o || (o = 0), n && "randomCompare" == n.order && (e = function(e) {
                    var t, i, s = e.length;
                    for (; 0 !== s;) i = Math.floor(Math.random() * s), t = e[s -= 1], e[s] = e[i], e[i] = t;
                    return e
                }(e));
                var M = n.feeds.reduce(function(e, t) {
                    return e[t.id] || (e[t.id] = {
                        id: t.id,
                        type: t["timeline-type"],
                        content: t["location-meta"] ? t["location-meta"].name : t.content
                    }), e
                }, {});
                for (r = 0; r < I; r++) {
                    if (l = e[r], a = r + 1, u = O = h = S = _ = "", y = {}, T = n.isOverlay && (!!l.img || -1 !== l.text.indexOf("<img")), "ad" !== l.type) {
                        f = void 0 !== l.source ? l.source : l.permalink, s && l.mod && (k = "new" == l.status ? " ff-moderation-new-post" : "", C = "approved" == l.status ? "checked" : "", _ = '<div class="ff-moderation-wrapper ' + ("approved" == l.status ? "ff-approved" : "") + k + '"><span>Approve</span> <label for="ff-mod-' + (A + o) + '"><input id="ff-mod-' + (A + o) + '" type="checkbox" class="ff-switcher" value="yes" ' + C + "/><div><span></span></div></label></div>"), l.additional && ("twitter" === l.type && (u += '<a href="https://twitter.com/intent/tweet?in_reply_to=' + l.id + '" class="ff-comments"> <i class="ff-icon-reply"></i></a>'), -1 < (w = parseInt(l.additional.views)) && "soundcloud" !== l.type && (u += '<a href="' + l.permalink + '" class="ff-views"><i class="ff-icon-view"></i> <span>' + (w < 0 ? "" : G(w, 2)) + "</span></a>"), -1 < (m = parseInt(l.additional.likes)) && "twitter" !== l.type && (u += '<a href="' + l.permalink + '" class="ff-likes"><i class="ff-icon-like"></i> <span>' + (m < 0 ? "" : G(m, 2)) + "</span></a>"), -1 < (v = parseInt(l.additional.shares)) && (u += '<a href="' + ("twitter" === l.type ? "https://twitter.com/intent/retweet?tweet_id=" + l.id : l.permalink) + '" class="ff-shares"><i class="ff-icon-shares"></i> <span>' + (v < 0 ? "" : G(v, 2)) + "</span></a>"), -1 < m && "twitter" === l.type && (u += '<a href="https://twitter.com/intent/favorite?tweet_id=' + l.id + '" class="ff-likes"><i class="ff-icon-like"></i> <span>' + (m < 0 ? "" : G(m, 2)) + "</span></a>"), g = parseInt(l.additional.comments), "twitter" !== l.type && -1 < g && (u += '<a href="' + l.permalink + '" class="ff-comments"><i class="ff-icon-comment"></i> <span>' + (-1 < g ? G(g, 2) : "") + "</span></a>")), i && (O += '<div class="ff-share-wrapper"><i class="ff-icon-share"></i><div class="ff-share-popup"><a href="http://www.facebook.com/sharer.php?u=' + (p = encodeURIComponent(l.permalink)) + '" class="ff-fb-share">Facebook</a><a href="https://twitter.com/share?' + (l.header ? "text=" + encodeURIComponent(l.header) + "&" : "") + "url=" + p + '" class="ff-tw-share">Twitter</a><a href="https://www.pinterest.com/pin/create/button/?url=' + p + (l.media ? "&media=" + encodeURIComponent(l.media.url) : "") + '" class="ff-pin-share">Pinterest</a><a href="https://www.linkedin.com/cws/share?url=' + p + '" class="ff-li-share">Linkedin</a><a href="mailto:?subject=' + (l.header ? encodeURIComponent(l.header) : "") + "&body=" + p + '" class="ff-email-share">Email</a></div></div>'), S = l.media ? ' data-media="' + l.media.width + ";" + l.media.height + ";" + ("yep" === V.forceHTTPS ? l.media.url.replace("http:", "https:") : l.media.url) + ";" + l.media.type + (l.img ? ";" + l.img.width + ";" + l.img.height : "") + '"' : "", x = F && l.media && "image" === l.media.type ? l.media : l.img, y.image = x ? '<span class="ff-img-holder ff-img-loading' + (1 < x.width / x.height ? " ff-img-landscape" : " ff-img-portrait ") + '" ' + S + '><img class="ff-initial-image" ' + ("yep" !== n.viewportin && "justified" !== n.layout || "list" === n.trueLayout ? "src" : "data-src") + '="' + ("yep" === V.forceHTTPS ? x.url.replace("http:", "https:") : x.url) + '" data-size="' + x.width + ";" + x.height + '" /></span>' : "", y.header = l.header ? '<h4><a rel="nofollow" href="' + f + '">' + l.header + "</a></h4>" : "", y.text = '<div class="ff-content">' + l.text + "</div>", y.meta = '<div class="ff-item-meta"><span class="ff-userpic" style="background:url(' + ("yep" === V.forceHTTPS ? l.userpic.replace("http:", "https:") : l.userpic) + ')"><i class="ff-icon ff-label-' + M[l.feed].type + '"><i class="ff-icon-inner"></i></i></span><h6><a rel="nofollow" href="' + l.userlink + '" class="ff-name ' + (l.userlink ? "" : " ff-no-link") + '">' + l.screenname + '</a></h6><a rel="nofollow" href="' + l.userlink + '" class="ff-nickname' + (l.userlink ? "" : " ff-no-link") + '">' + (l.nickname ? l.nickname : l.screenname) + '</a><a rel="nofollow" href="' + l.permalink + '" class="ff-timestamp">' + L(l.system_timestamp, l.timestamp) + "</a>", l.location && (y.meta += '<span class="ff-location">' + l.location.name + "</span>"), y.meta += "</div>", "flow_flow" == P && (y.labelIcon = E ? "" : '<h6 class="ff-label-wrapper"><i class="ff-icon ff-label-' + M[l.feed].type + '"><i class="ff-icon-inner"><span class="ff-label-text">' + l.type + "</span></i></i></h6>"), "insta_flow" == P && (b = W(M[l.feed].type), y.labelIcon = E ? "" : '<h6 class="ff-label-wrapper"><i class="ff-icon ff-label-' + M[l.feed].type + '"><i class="ff-icon-inner"><span class="ff-label-text">' + b + M[l.feed].content + "</span></i></i></h6>");
                        for (var z = 0, N = n.template.length; z < N; z++) 1 === z && T && (h += '<div class="ff-overlay-wrapper">'), h += y[n.template[z]], "meta" === n.template[z] && (h += y.labelIcon), z === N - 1 && T && (h += '<h6 class="ff-item-bar">' + u + O + "</h6>", h += '<div class="ff-overlay"></div></div>');
                        0 < l.carousel_size ? h += '<div class="ff-carousel-icon"></div>' : l.media && "video/mp4" == l.media.type && (h += '<div class="ff-video-icon"></div>'), $ += '<article class="ff-item' + (l.media && "image" != l.media.type && 0 == l.carousel_size && "instagram" != l.type ? " ff-video-preview" : "") + " ff-" + l.type + ("meta" === n.template[n.isOverlay ? 1 : 0] || !l.img && "meta" === n.template[1] ? " ff-meta-first" : "") + (l.header ? " ff-has-header" : "") + (l.img ? " ff-image" : " ff-no-image") + (T ? " ff-has-overlay" : "") + (l.with_comments ? " ff-supports-comments" : "") + '" id="ff-uid-' + A + '" post-id="' + l.id + '" data-type="' + l.type + '" data-feed="' + l.feed + '" data-index="' + (a + o) + '"' + S + ' data-timestamp="' + l.system_timestamp + '">' + (s && l.mod ? _ : "") + '<div class="picture-item__inner"><div class="ff-item-cont">' + h + "</div>" + (T ? "" : '<h6 class="ff-item-bar">' + u + O + "</h6>"), B && ($ += '<a class="ff-mob-link" href="' + l.permalink + '"></a>'), $ += "</div>", $ += "</article>"
                    } else d = "yep" === l.label ? 'data-label="' + l.labelTxt + ";" + l.labelCol + '"' : "", c = 'style="' + (l.textCol ? "color:" + l.textCol + ";" : "") + ("js" === l.adtype ? "height:" + l.height + "px" : "") + '"', $ += '<div class="ff-item ff-' + l.type + (l.permalink ? " ff-ad-link" : "") + '" id="ff-uid-' + A + '" post-id="' + l.id + '" data-type="' + l.type + '" data-adtype="' + l.adtype + '" data-index="' + a + '" ' + d + '><div class="picture-item__inner" style="' + (l.cardBG ? "background-color:" + l.cardBG + ";" : "") + '"><div class="ff-item-cont"><div class="ff-content" ' + c + ">" + l.text.replace(/document\.write\((.+?)\)/i, function(e, t) {
                        return "jQuery(" + t + ').appendTo(jQuery("#ff-uid-' + A + ' .ff-content"))'
                    }) + "</div>", l.permalink && ($ += '<a class="ff-link" href="' + l.permalink + '"></a>'), $ += "</div></div></div>";
                    A++
                }
                return $
            }

            function D(t, n) {
                clearTimeout(d);
                var i = t.data("opts");
                g || (t.find(".ff-item").each(a), g = !0), d = setTimeout(function() {
                    var e;
                    t.find(".ff-highlight").each(function() {
                        A(this).replaceWith(this.childNodes)
                    }), "list" === i.trueLayout ? t.find("li[post-id]").each(function() {
                        var e;
                        (e = A(this).find("*").filter(function() {
                            var e = A(this),
                                t = this.tagName.toUpperCase();
                            if ((!this.children.length || 0 <= this.className.indexOf("ff-content")) && !/icon|share/.test(this.className) && "IMG" != t) return 0 <= e.text().toUpperCase().indexOf(n.toUpperCase())
                        })).length && o(n, e)
                    }) : (e = "justified" !== t.data("opts").layout ? "shuffleCustom" : "rowGrid", t[e]("shuffle", function(e, t) {
                        var i, s;
                        return (!t || "all" === t.group || -1 !== A.inArray(t.group, e.data("groups"))) && ((i = e.find("*").filter(function() {
                            A(this);
                            var e = this.tagName.toUpperCase();
                            if ((!this.children.length || 0 <= this.className.indexOf("ff-content")) && !/icon|share/.test(this.className) && "IMG" != e) return 0 <= A(this).text().toUpperCase().indexOf(n.toUpperCase())
                        })).length ? o(n, i) : s = -1 !== (s = A.trim(e.attr("data-type")).toLowerCase()).indexOf(n), i.length || s)
                    }, "only_sort"))
                }, 100)
            }

            function o(s, e) {
                e.each(function(e, t) {
                    var i = A(t);
                    i.is(".ff-content") ? D.finder = window.findAndReplaceDOMText(t, {
                        find: new RegExp(s, "i"),
                        wrap: "span",
                        clss: "ff-highlight"
                    }) : i.html(function(e, t) {
                        return t.replace(new RegExp(s, "i"), function(e) {
                            return '<span class="ff-highlight">' + e + "</span>"
                        })
                    })
                })
            }

            function j(s, e, n) {
                g || (e.find(".ff-item").each(a), g = !0);
                var t = e.data("opts");
                "list" === t.trueLayout ? n ? (e.find("li[post-id]").hide(), e.find('li[data-type="' + n + '"]').show()) : e.find("li[post-id]").show() : e["justified" !== t.layout ? "shuffleCustom" : "rowGrid"]("shuffle", function(e, t) {
                    return (!t || "all" === t.group || -1 !== A.inArray(t.group, e.data("groups"))) && ("flow_flow" == s && (i = A.trim(e.attr("data-type")).toLowerCase()), "insta_flow" == s && (i = A.trim(e.attr("data-feed")).toLowerCase()), n ? -1 !== i.indexOf(n) : 1);
                    var i
                }, "only_sort")
            }

            function r(u, i, e, t, m, g, v) {
                u.find(".shuffle__sizer");
                var w, y, r, a, b, h, s = u.find(".ff-item"),
                    n = g.data("plugin"),
                    o = m.trueLayout,
                    l = "grid" === o ? "" : "masonry" === o ? "m-" : "carousel" === o ? "c-" : "j-",
                    d = {
                        columns: [{
                            size: 1e4,
                            val: m[l + "c-desktop"]
                        }, {
                            size: 1200,
                            val: m[l + "c-laptop"]
                        }, {
                            size: 1024,
                            val: m[l + "c-tablet-l"]
                        }, {
                            size: 768,
                            val: m[l + "c-tablet-p"]
                        }, {
                            size: 480,
                            val: m[l + "c-smart-l"]
                        }, {
                            size: 380,
                            val: m[l + "c-smart-p"]
                        }],
                        rows: [{
                            size: 1e4,
                            val: m[l + "r-desktop"]
                        }, {
                            size: 1200,
                            val: m[l + "r-laptop"]
                        }, {
                            size: 1024,
                            val: m[l + "r-tablet-l"]
                        }, {
                            size: 768,
                            val: m[l + "r-tablet-p"]
                        }, {
                            size: 480,
                            val: m[l + "r-smart-l"]
                        }, {
                            size: 380,
                            val: m[l + "r-smart-p"]
                        }],
                        spacing: [{
                            size: 1e4,
                            val: m[l + "s-desktop"]
                        }, {
                            size: 1200,
                            val: m[l + "s-laptop"]
                        }, {
                            size: 1024,
                            val: m[l + "s-tablet-l"]
                        }, {
                            size: 768,
                            val: m[l + "s-tablet-p"]
                        }, {
                            size: 480,
                            val: m[l + "s-smart-l"]
                        }, {
                            size: 380,
                            val: m[l + "s-smart-p"]
                        }],
                        row: [{
                            size: 1e4,
                            val: m[l + "h-desktop"]
                        }, {
                            size: 1200,
                            val: m[l + "h-laptop"]
                        }, {
                            size: 1024,
                            val: m[l + "h-tablet-l"]
                        }, {
                            size: 768,
                            val: m[l + "h-tablet-p"]
                        }, {
                            size: 480,
                            val: m[l + "h-smart-l"]
                        }, {
                            size: 380,
                            val: m[l + "h-smart-p"]
                        }]
                    };

                function c(e, c) {
                    var p = A(this),
                        f = g.find(".ff-loader"),
                        h = g.find(".ff-item, li[post-id]").not(".ff-ad").length,
                        t = {
                            shop: FlowFlowOpts.domain,
                            action: ("insta_flow" === n ? "insta_flow_" : "") + "fetch_posts",
                            "stream-id": m.id,
                            page: m["next-page"],
                            countOfPages: m.countOfPages,
                            hash: m.hash,
                            token: FlowFlowOpts.token
                        };
                    return c ? p.addClass("ff-fetching-posts") : (p.css("opacity", 0), f.insertAfter(p).show().removeClass("ff-squeezed")), A.get(FlowFlowOpts.ajaxurl, t, function(e) {
                        var t = e,
                            i = t.items,
                            s = (i.length, A('[id^="ff-uid-"]').length + 1 || 1),
                            n = H(i, s, !0, V.moderation, m, s - 1),
                            o = A(n),
                            r = o.not(".ff-ad"),
                            a = r.toArray();
                        if (t) {
                            if (u.trigger("loaded_more", {
                                    items: o
                                }), m.hash = t.hash, m["next-page"] = t.page + 1, m.countOfPages = t.countOfPages, "carousel" !== m.trueLayout && u.append(o), "justified" !== m.layout ? u.shuffleCustom("appended", o) : u.rowGrid("appended"), q(o), "yep" !== m.viewportin && "justified" !== m.layout && !v || "list" === m.trueLayout || E(u, o, "yep" === m.viewportin, s), r.each(function() {
                                    A(this).find("img").not(":first").remove()
                                }), o.find("img").each(function() {
                                    N.apply(this, [u])
                                }), "yep" === V.open_in_new) {
                                var l = location.hostname;
                                o.find("a").filter(function() {
                                    return this.hostname != l
                                }).attr("target", "_blank").attr("rel", "noreferrer")
                            }
                            if (z(r, m), "list" === m.trueLayout && (CBPGridGallery.prototype._addSlideShowItems(a, !1, !0, "replace", m.template), u.find(".ff-media-wrapper:gt(" + (m["page-posts"] * t.page - 1) + ")").each($).each(U(_, {
                                    comments: m.wallcomments,
                                    ignoreLoadedEvent: !0
                                }))), y ? (y._addSlideShowItems(a, "appended"), y.initItemsEvents(a, h), y.slideshowItems = [].slice.call(y.slideshow.children), y.itemsCount = y.itemsCount + r.length) : b && (b.find(".ff-infinite-content").append(CBPGridGallery.prototype._addSlideShowItems(a, !1, !0)), R(u, b.find(".ff-infinite-content > li"))), f.addClass("ff-squeezed").delay(300).hide(), setTimeout(function() {
                                    r.filter(":lt(5)").addClass("in"), r.find(".ff-content").dotdotdot({
                                        ellipsis: "...",
                                        after: ""
                                    }), setTimeout(function() {
                                        t.page + 1 != t.countOfPages ? c || p.css("opacity", 1) : c ? g.off("beforeChange") : p.remove(), w.layout(), c && p.removeClass("ff-fetching-posts")
                                    }, 200)
                                }, 14), FlowFlowOpts.dependencies.ads && t.ads) {
                                var d = jQuery.post(V.ajaxurl, {
                                    action: "flow_flow_ad_action",
                                    status: "view",
                                    id: t.ads
                                });
                                A.when(d).always(function(e) {})
                            }
                        } else console.log("FLOW-FLOW: Empty response from server")
                    })
                }
                return r = u.parent(), q(s), setTimeout(f.bind(this, r, u), 4), f.call(this, r, u), "justified" !== m.layout ? (u.shuffleCustom({
                    itemSelector: ".ff-item",
                    gutterWidth: function(e) {
                        var t = Array.prototype.slice.call(arguments);
                        return t.push(d.spacing),
                            function(e, t) {
                                var i, s, n;
                                for (i = t.length; i--;)
                                    if (n = t[i].size, e < n) {
                                        s = parseInt(t[i].val);
                                        break
                                    } return s
                            }.apply(null, t)
                    },
                    columnWidth: function(e, t) {
                        var i = Array.prototype.slice.call(arguments),
                            p = (t || this._itemMargin, this);
                        return i.push(d), i.push(this.streamOpts.trueLayout),
                            function(e, t, i, s) {
                                var n, o, r, a, l, d, c = i.columns;
                                for (n = c.length; n--;)
                                    if (r = c[n].size, e < r) {
                                        a = parseInt(c[n].val), "carousel" === s ? (d = i.rows, l = d[n].val, o = (e - 2 * t - t * (a - 1)) / a, p.streamOpts.itemsPerSlide = a * l) : o = (e - 2 * t - t * (a - 1)) / a;
                                        break
                                    } return o || 260
                            }.apply(null, i)
                    },
                    streamOpts: m
                }), A(document).on("done.stream", function(e, t, i) {
                    var s;
                    if (i != m.id) return s = u.data("viewport"), void setTimeout(function() {
                        s && s.refreshOffsets()
                    }, 100);
                    setTimeout(function() {
                        t.update(), g.find(".ff-loadmore-wrapper").css("visibility", "visible")
                    }, 14)
                })) : (u.rowGrid({
                    minMargin: 5,
                    maxMargin: 5,
                    itemSelector: ".ff-item",
                    firstItemClass: "first-item",
                    resize: !0,
                    sizes: d,
                    streamOpts: m
                }), setTimeout(function() {
                    g.find(".ff-loadmore-wrapper").css("visibility", "visible")
                }, 0)), "list" == m.trueLayout && (CBPGridGallery.prototype._addSlideShowItems([].slice.call(u[0].querySelectorAll(".ff-item:not(.ff-ad)")), !1, !0, "replace", m.template), u.addClass("ff-infinite ff-slideshow"), u.find(".ff-media-wrapper").each($).each(U(_, {
                    comments: m.wallcomments,
                    ignoreLoadedEvent: !0
                }))), t && ("news" !== m["gallery-type"] ? (y = new CBPGridGallery(r, {
                    iconStyle: m["icons-style"]
                }), a = r.find(".ff-slideshow-classic").attr("id", r.attr("id") + "-slideshow")) : (b = A('<section class="ff-infinite ff-slideshow ff-' + m["icons-style"] + '-icon" id="ff-stream-infinite-' + m.id + '"><div class="ff-infinite-outer"><ul class="ff-infinite-content"></ul><div class="mouse-scroll"><span class="mouse-scroll__mouse" aria-hidden="true"><span class="mouse-scroll__mouse__wheel mouse-scroll__mouse__wheel--1"></span><span class="mouse-scroll__mouse__wheel mouse-scroll__mouse__wheel--2"></span></span><span class="mouse-scroll__label">' + FlowFlowOpts.scroll + '</span></div><span class="ff-nav-close"></span><span class="ff-scroll-end"></span></div></section>')).find(".ff-infinite-content").append(CBPGridGallery.prototype._addSlideShowItems([].slice.call(u[0].querySelectorAll("list" == m.trueLayout ? "li[class*=ff-slide]" : "carousel" == m.trueLayout ? ".slick-slide:not(.slick-cloned ) .ff-item:not(.ff-ad)" : ".ff-item:not(.ff-ad)")), !1, !0)), "yep" === m.hidemeta && a && a.addClass("ff-hide-meta"), setTimeout(function() {
                    var e, s, n = "down",
                        o = 0;
                    if ("news" != m["gallery-type"]) T.append(a), f(a);
                    else {
                        T.append(b), f(b), e = A('<div class="ff-nav-mob"><span class="ff-nav-mob__heading">' + (m.heading || "") + '</span><span class="ff-nav-mob__close"></span></div>'), b.after(e), b.on("click", function(e) {
                            A(e.target).closest("li").length || (b.removeClass("ff-infinite-open ff-scroll-up"), O(), T.removeClass("ff-modal-open ff-modal-scrollbar"), b.find("iframe, video").each(function() {
                                var e = A(this);
                                e.closest(".ff-media-wrapper").data("mediaInserted", !1), e.remove()
                            }))
                        }), e.on("click", function() {
                            b.removeClass("ff-infinite-open ff-scroll-up"), O(), T.removeClass("ff-modal-open ff-modal-scrollbar")
                        }), b.on("click", ".ff-share-wrapper", function(e) {
                            var t = A(this);
                            t.data("opened") ? (t.removeClass("ff-popup__visible"), t.data("opened", !1)) : (t.addClass("ff-popup__visible"), t.data("opened", !0))
                        });
                        var t = new FF_Viewport(m, ".ff-infinite-outer");
                        u.data("viewportForInfinite", t), u.on("click", ".ff-item:not(.ff-ad), li[class*=ff-slide]", function(e) {
                            var t, i, s = A(this),
                                n = "carousel" == m.trueLayout ? u.find(".slick-slide:not(.slick-cloned ) .ff-item:not(.ff-ad)") : u.find(".ff-item:not(.ff-ad)"),
                                o = n.length ? n.index(s) : s.index(),
                                r = A(e.target),
                                a = r.closest('a, [class*="slick-nav"]'),
                                l = r.closest("h4").length,
                                d = r.closest(".ff-icon-share").length,
                                c = r.closest(".ff-moderation-wrapper").length,
                                p = b.find(".ff-media-wrapper").slice(0 < o - 1 ? o - 1 : 0, o + 2),
                                f = b.find(".ff-infinite-content > li");
                            if (a.length && !r.is("img") || d || c) {
                                if ("yep" === m.titles && l) return;
                                if (!l) return
                            }
                            e.preventDefault(), b.addClass("ff-infinite-open"), k = document.body.scrollHeight > document.documentElement.clientHeight, 0 < (x = function() {
                                var e = document.createElement("div");
                                e.className = "ff-modal-scrollbar-measure", T.append(e);
                                var t = e.offsetWidth - e.clientWidth;
                                return T[0].removeChild(e), t
                            }()) && (C = !0), i = parseInt(T.css("padding-right") || 0, 10), k && T.css("padding-right", i + x), T.addClass("ff-modal-open" + (C ? " ff-modal-scrollbar" : "")), p.each($).each(U(_, {
                                $slides: f,
                                origIdx: o
                            })), t = f.eq(o).position().top, b.find(".ff-infinite-outer").scrollTop(t), b.removeClass("ff-scroll-up"), m.startingPos = t, m.observeLast = !0, R(u, f), setTimeout(function() {
                                b.find(".ff-infinite-outer").one("scroll", function() {
                                    h = !0
                                })
                            }, 600), S && ("shown" === sessionStorage.getItem("ff-scroll-icon") ? b.find(".mouse-scroll").hide() : sessionStorage.setItem("ff-scroll-icon", "shown")), setTimeout(function() {
                                b.find(".mouse-scroll").fadeOut()
                            }, 5e3)
                        }), A(document).on("ff-comments-loaded", function(e, t) {
                            t.$slide && void 0 !== t.idx && t.params && (h || 0 !== t.idx || t.params.$slides.eq(t.params.origIdx).is(t.$slide) || b.find(".ff-infinite-outer").animate({
                                scrollTop: t.$slide.next("li").position().top
                            }, 0))
                        }), b.on("scroll-direction", function(e, t) {
                            var i = n;
                            (n = t.direction) !== i ? o = 0 : (2 === (o += 1) && "down" === n && b.removeClass("ff-scroll-up"), 3 === o && "up" === n && b.addClass("ff-scroll-up"))
                        }).on("second-to-last-in-the-view", function(e, t) {
                            if (!s) {
                                var i = c();
                                s = !0, i.then(function() {
                                    s = !1
                                })
                            }
                        })
                    }
                    v || A(window).on("resize", I.bind(this, r, a || b, u))
                }, 0)), setTimeout(p.bind(this, r), 4), "yep" !== m.viewportin && "justified" !== m.layout && !v || "list" === m.trueLayout || E(u, s, "yep" === m.viewportin), u.find(".ff-item:not(.ff-ad) .ff-content").dotdotdot({
                    ellipsis: "...",
                    after: ""
                }), w = u.data("shuffle"), i && (i = parseInt(i), u.addClass("ff-slider").parent().css("paddingBottom", "70px"), function(t, o, e, i) {
                    var s, n = A('<span class="ff-control-prev"/>'),
                        r = A('<span class="ff-control-next"/>'),
                        a = Math.ceil(e.$items.length / o);
                    n.on("click", g), r.on("click", v), B && (l = t, d = g, c = v, l.bind("touchstart", function(e) {
                        h = (new Date).getTime(), p = e.originalEvent.touches[0].pageX, f = e.originalEvent.touches[0].clientY
                    }).bind("touchmove", function(e) {
                        u = e.originalEvent.touches[0].pageX, m = e.originalEvent.touches[0].clientY
                    }).bind("touchend", function() {
                        var e = p < u ? "right" : "left",
                            t = 60 < m - f || m - f < -60,
                            i = 60 < u - p || u - p < -60,
                            s = (new Date).getTime();
                        if (!(300 < s - h || t) && i) switch (e) {
                            case "left":
                                c();
                                break;
                            case "right":
                                d()
                        }
                    }));
                    var l, d, c, p, f, h, u, m;

                    function g() {
                        var e = s.data("currentSlide"),
                            t = e - 1;
                        t < 1 && (t = a), s.data("currentSlide", t), w(t), i && setTimeout(y, 0)
                    }

                    function v() {
                        var e = s.data("currentSlide"),
                            t = e + 1;
                        a < t && (t = 1), s.data("currentSlide", t), w(t), i && setTimeout(y, 0)
                    }

                    function w(n) {
                        t.shuffleCustom("shuffle", function(e, t) {
                            var i, s;
                            return ("all" === t.group || -1 !== A.inArray(t.group, e.data("groups"))) && (i = e.attr("data-index"), s = o * n, o * (n - 1) < i && i <= s)
                        })
                    }

                    function y() {
                        var e = t.offset().top;
                        A("html, body").animate({
                            scrollTop: e - 100
                        }, 300)
                    }(s = A('<div class="ff-controls-wrapper"></div>').append(n).append(r)).data("currentSlide", 1), t.on("layout.shuffle", function() {}), t.append(s)
                }(u, i, w, e), u.shuffleCustom("shuffle", function(e, t) {
                    return parseInt(e.attr("data-index")) <= i
                }), u.data("num", s.length), u.data("visible", 0)), g.find(".ff-loadmore-wrapper span").click(c), g.on("slick-last-slide", c), g.on("slick-destroyed", function() {}), A(document).trigger("done.stream", [w, m.id]), w
            }

            function $(e) {
                var t = A(this),
                    i = t.data("media"),
                    s = t.data("mediaInserted");
                if (i && !s) {
                    if (t.data("media-image")) {
                        var n = new Image;
                        n.src = t.data("media-image"), n.onload = function() {
                            t.removeClass("ff-slide-img-loading")
                        }
                    } else t.removeClass("ff-slide-img-loading");
                    t.append(i), t.data("mediaInserted", "inserted")
                }
            }

            function _(r, e, l) {
                var d = A(this).closest("li");
                if (d.length) {
                    var c = d.find(".ff-comments-list-inner");
                    if (!d.data("comments") && !d.data("carousel")) {
                        var t = A.get(FlowFlowOpts.ajaxurl, {
                            shop: FlowFlowOpts.domain,
                            action: P + "_load_comments_and_carousel",
                            feed_id4post: d.data("feed"),
                            post_id: d.attr("post-id"),
                            permalink: d.find("a.ff-timestamp").attr("href")
                        });
                        l && "nope" === l.comments ? d.addClass("ff-comments-hidden") : c.find(".ff-slide-loader").show(), A.when(t).then(function(e) {
                            var t, a = "",
                                i = e.comments;
                            i && 0 !== i.length ? (5 <= i.length && (t = i.length, i = i.slice(0, 5)), i.forEach(function(e, t, i) {
                                var s, n, o = "string" == typeof e.from && e.from && "Facebook user" !== e.from ? JSON.parse(e.from) : e.from,
                                    r = e.text;
                                "instagram" == d.data("type") && (n = "https://www.instagram.com/" + (s = o.username)), "facebook" == d.data("type") && (s = o && o.name ? o.name : o || "", n = "https://www.facebook.com/" + (o ? o.id : "")), "youtube" == d.data("type") && (s = o.full_name, n = "https://www.youtube.com/channel/" + o.id), "posts" == d.data("type") && (n = "/author/" + (s = o.name)), a += '<div class="ff-slide-comment">', s ? (a += '<a href="' + n + '" rel="noreferrer" target="_blank" title="' + s + '">', a += "<b>" + s + "</b>", a += "</a>", a += "<span>" + r + "</span>") : a += '<span>"' + r + '"</span>', a += "</div>"
                            })) : a += "<div>" + (FlowFlowOpts && FlowFlowOpts.no_comments ? FlowFlowOpts.no_comments : "No comments yet.") + ' <a href="' + d.find(".ff-comments").attr("href") + '" rel="noreferrer" target="_blank">' + (FlowFlowOpts && FlowFlowOpts.be_first ? FlowFlowOpts.be_first : "Be the first!") + "</a></div>", t && (a += '<div><a rel="noreferrer" target="_blank" href="' + d.find(".ff-external-link").attr("href") + '">' + FlowFlowOpts.view_all + " " + d.find(".ff-comments span").text() + " " + FlowFlowOpts.comments + "</a></div>"), c.html(a), d.data("comments", "added"), d.is(".ff-supports-comments") && (l && l.ignoreLoadedEvent || A(document).trigger("ff-comments-loaded", {
                                idx: r,
                                $slide: d,
                                params: l
                            })), setTimeout(function() {
                                c.addClass("ff-comments-loaded" + (t ? "" : " ff-few-comments"))
                            }, 0);
                            var s = e.carousel;
                            if (!(s.length < 2 || d.has(".ff-video").length)) {
                                var n = d.find(".ff-img-holder").outerWidth(),
                                    o = d.find(".ff-img-holder").outerHeight();
                                d.find(".ff-media-wrapper").css("width", n + "px").css("height", o + "px"), d.find(".ff-media-wrapper").find(".ff-slideshow-carousel").remove(), d.find(".ff-media-wrapper").append('<div class="ff-slideshow-carousel" style="height:' + o + 'px"></div>'), s.forEach(function(e, t) {
                                    if ("image" == e.media_type || "photo" == e.media_type) var i = '<span class="ff-img-holder" style="background-image: url(' + e.media_url + ')">';
                                    d.find(".ff-slideshow-carousel").append(i)
                                });
                                d.find(".ff-media-wrapper > .ff-img-holder").hide(), d.find(".ff-slideshow-carousel").slick({
                                    adaptiveHeight: !0,
                                    infinite: !0,
                                    arrows: !0,
                                    dots: !0,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    prevArrow: '<span class="ff-arrow-left slick-prev slick-nav"></span>',
                                    nextArrow: '<span class="ff-arrow-right slick-next slick-nav"></span>'
                                }), d.data("carousel", "added")
                            }
                        }, function(e) {
                            c.html("Sorry, something went wrong during loading comments for this post. Try to re-open lightbox.")
                        }), d.data("carousel", "pending").data("comments", "pending")
                    }
                }
            }

            function O() {
                T.css("padding-right", "")
            }

            function E(e, t, i, s) {
                s || (s = 0);
                var n = e.data("viewport");
                t.each(function(e) {
                    n.add(new FF_ViewportItem({
                        element: this,
                        idx: e + s,
                        threshold: 130,
                        enter: a,
                        leave: l,
                        needScroll: i
                    }))
                })
            }

            function R(e, t, i) {
                i || (i = 0);
                var s = e.data("viewportForInfinite");
                t.each(function(t) {
                    var e = A(this);
                    e.data("viewport-tracked") || (s.add(new FF_ViewportItem({
                        element: this,
                        threshold: 0,
                        idx: t + i,
                        enter: function() {
                            var e = A(this);
                            e.data("viewport", "in"), e.find(".ff-media-wrapper").each(function() {
                                $.call(this)
                            }), e.data("comments") || _.call(this, t)
                        },
                        leave: function() {
                            A(this).data("viewport", "out")
                        },
                        relativeToParentElem: !0
                    })), e.data("viewport-tracked", !0))
                })
            }

            function q(e) {
                e.find(".picture-item__inner").addClass("picture-item__inner--transition")
            }

            function a() {
                var e = A(this),
                    t = e.find(".ff-img-holder img");
                t.length && t.data("src") && !t.data("mounted") && (t.attr("src", t.data("src")), t.data("mounted", 1)), e.addClass("in").data("viewport", "in")
            }

            function l() {
                A(this).data("viewport", "out")
            }
            return {
                init: e,
                streams: F,
                addTransitionToItems: q,
                addViewportItems: E,
                prepareImageFor: N,
                adjustItems: z,
                shuffle: r,
                recalcLayout: function(e) {
                    e.$el.layout()
                },
                buildItems: H,
                buildStreamWith: function(e, n, t, i, s) {
                    var o, r, a, l, d, c, p, f, h, u, m, g, v = "";
                    if (e) {
                        if ("yep" !== n.viewportin && "justified" !== n.layout && !s || "list" === n.trueLayout || (g = new FF_Viewport(n, window)), P = n.plugin, !n.feeds || "[]" === n.feeds) return "<p>No feeds to show. Add at least one</p>";
                        if (!n.layout) return "<p>Please choose stream layout on options page</p>";
                        "string" == typeof n.feeds && (n.feeds = JSON.parse(n.feeds)), c = n.feeds, n.hash = e.hash, n["next-page"] = e.page + 1, n.countOfPages = e.countOfPages;
                        var w, y, b, x, k, C, T = e.items,
                            S = 0,
                            I = T.length,
                            $ = A('[id^="ff-uid-"]').length + 1 || 1;
                        if ("yep" === n.gallery && "news" != n["gallery-type"] && (v += '<section class="ff-slideshow ff-slideshow-classic"><ul></ul><nav><span class="ff-nav-prev"></span><span class="icon ff-nav-next"></span><span class="ff-nav-close"></span></nav><div class="ff-nav-info-keys">' + window.FlowFlowOpts.lightbox_navigate + "</div></section>"), v += '<div class="ff-header ff-loading">', n.heading && (v += "<h1>" + n.heading.replace(/\\/g, "") + "</h1>"), n.subheading && (v += "<h2>" + n.subheading.replace(/\\/g, "") + "</h2>"), "yep" == n["show-profile"] && 0 < T.length && 1 === n.feeds.length && "user_timeline" == n.feeds[0]["timeline-type"] && (v += '<div class="ff-stream-profile">                        <div class="ff-stream-profile-fixed">                            <div class="ff-stream-profile-inner">                                <div class="ff-stream-profile-avatar" style="background-image: url(' + (d = T[0]).userpic + ')"></div>\t\t\t\t\t\t\t\t<div class="ff-stream-profile-content">\t\t\t\t\t\t\t\t\t<div class="ff-stream-profile-header">\t\t\t\t\t\t\t\t\t\t<h3>' + d.nickname + '</h3>\t\t\t\t\t\t\t\t\t\t<a href="https://www.instagram.com/' + d.nickname + '" rel="noreferrer" target="_blank" title="Follow ' + d.screenname + '">follow</a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<ul class="ff-stream-profile-meta">\t\t\t\t\t\t\t\t\t\t<li><b>' + M(d.user_counts_media, 0) + "</b> " + window.FlowFlowOpts.posts + "</li><li><b>" + M(d.user_counts_followed_by, 0) + "</b> " + window.FlowFlowOpts.followers + "</li><li><b>" + M(d.user_counts_follows, 0) + "</b> " + window.FlowFlowOpts.following + '</li>\t\t\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t\t\t\t<div class="ff-stream-profile-bio"><strong>' + d.screenname + "</strong>" + function(e, t) {
                                if (!e) return "";
                                var i = !0 === t || null == t ? "_blank" : "";
                                return e.replace(/(http|ftp|https:\/\/[\w\-_]+\.{1}[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/gi, function(e) {
                                    var t = /^(?:(?:https?|ftp):\/\/)/i.test(e) ? e : "http://" + e;
                                    return '<a href="' + t + '" target="' + i + '">' + e + "</a>"
                                }).replace(/\@(\w+)(?!\w)/g, function(e) {
                                    return '<a href="https://www.instagram.com/' + e.replace("@", "") + '" target="' + i + '">' + e + "</a>"
                                }).replace(/\#\w+(?!\w)/g, function(e) {
                                    return '<a href="https://www.instagram.com/explore/tags/' + e.replace("#", "") + '" target="' + i + '">' + e + "</a>"
                                })
                            }(d.user_bio) + "</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>"), "yep" === n.filter) {
                            if ("flow_flow" == P) {
                                for (f = "", p = {}, S = m = 0; S < I; S++) p[T[S].type] = 1;
                                for (var _ in p) "ad" !== _ && (m += 1, f += '<span class="ff-filter" data-filter="' + _ + '"><i class="ff-type-' + _ + '"></i></span>', h += '<option class="ff-filter-option ff-type-' + _ + '" value="' + _ + '">' + _ + "</option>");
                                h = 1 < m ? '<option class="ff-filter-option ff-type-all" value="">' + V.filter_all + "</option>" + h : h, f += '<select class="ff-filters-select">' + h + "</select>", v += '<div class="ff-filter-holder">' + (1 < m ? '<span class="ff-filter ff-type-all ff-filter--active">' + V.filter_all + "</span>" + f : "") + '<span class="ff-search"><input type="text" placeholder="' + V.filter_search + '"/></span></div>'
                            }
                            "insta_flow" == P && (f = h = "", u = [], m = 0, c.forEach(function(e, t, i) {
                                var s = e.content;
                                e.hasOwnProperty("location-meta") && e["location-meta"].hasOwnProperty("name") && (s = e["location-meta"].name), u.push({
                                    id: e.id,
                                    type: e["timeline-type"],
                                    label: s
                                })
                            }), u.forEach(function(e, t, i) {
                                if ("ad" !== e.type) {
                                    var s = W(e.type);
                                    m += 1, f += '<span class="ff-filter ff-type-' + e.type + '" data-filter="' + e.id + '">\t\t\t\t\t\t' + s + "<span>" + e.label + "</span></span>", h += '<option class="ff-filter-option" value="' + e.id + '">' + e.label + "</option>"
                                }
                            }), h = 1 < m ? '<option class="ff-filter-option ff-type-all" value="">' + V.filter_all + "</option>" + h : h, f += '<select class="ff-filters-select">' + h + "</select>", v += '<div class="ff-filter-holder">' + (1 < m ? '<span class="ff-filter ff-type-all ff-filter--active">' + V.filter_all + "</span>" + f : "") + '<span class="ff-search"><input type="text" placeholder="' + V.filter_search + '"/></span></div>')
                        }
                        if (t && (V.moderation = t, v += '<div class="ff-moderation-holder"><p><strong>PREMODERATION MODE IS ON</strong>. APPROVE POSTS AND HIT <strong>APPLY CHANGES</strong>.</p><span class="ff-moderation-button ff-moderation-apply">Apply changes</span><span class="ff-moderation-button ff-moderation-approve-new">Approve new posts</span></div>'), v += "</div>", n["gc-style"], v += '<div class="ff-stream-wrapper ff-' + (B ? "mobile" : "desktop") + " shuffle--container" + ("yep" === n.viewportin && !B && window.requestAnimationFrame && "carousel" !== n.trueLayout ? " shuffle--animatein" : " shuffle--animateoff") + " ff-layout-" + n.layout + " ff-truelayout-" + n.trueLayout + " ff-upic-" + n["upic-pos"] + " ff-upic-" + n["upic-style"] + " ff-align-" + n.talign + " ff-sc-" + n["icon-style"] + " ff-" + n["icons-style"] + '-icon">', v += H(T, $, !0, t, n), "carousel" !== n.trueLayout && "list" !== n.trueLayout && (v += '<div class="shuffle__sizer"></div>'), v += "</div>", 1 < e.countOfPages && e.page + 1 != e.countOfPages && ("yep" !== n.mobileslider || !B) && "carousel" != n.trueLayout && (v += '<div class="ff-loadmore-wrapper"><span class="ff-btn">' + window.FlowFlowOpts.show_more + "</span></div>"), "carousel" === n.trueLayout && (v += '<div class="ff-slide-overlay"><div class="ff-slide-loader"><span>' + FlowFlowOpts.loading + "</span></div></div>"), (o = A(v)).each(function(e) {
                                if (this.className.indexOf("ff-stream-wrapper") + 1) return r = A(this), !1
                            }), l = (a = o.find(".ff-item")).not(".ff-ad"), r.data("opts", n).data("items", a).data("viewport", g), l.each(function() {
                                var e = A(this);
                                e.is(".ff-image") ? e.find("img").not(".ff-initial-image").remove() : e.find("img").not(":first").remove()
                            }), o.find("p:empty, .ff-content a:empty").remove(), o.find(".ff-filters-select").selectric({
                                nativeOnMobile: !1,
                                labelBuilder: function(t) {
                                    var e = n.feeds.find(function(e) {
                                        return e.id == t.value
                                    });
                                    return (e ? W(e["timeline-type"]) : "") + t.text
                                },
                                optionsItemBuilder: function(t, e, i) {
                                    var s = n.feeds.find(function(e) {
                                        return e.id == t.value
                                    });
                                    return (s ? W(s["timeline-type"]) : "") + t.text
                                }
                            }).on("change", function(e) {
                                var t = this.value;
                                j(P, r, t)
                            }), o.find("img").each(function() {
                                N.apply(this, [r])
                            }), o.find(".ff-filter").click(function() {
                                o.find(".ff-filter--active").removeClass("ff-filter--active");
                                var e = A(this).addClass("ff-filter--active").attr("data-filter");
                                j(P, r, e)
                            }).mouseenter(function() {
                                var e, t = A(this),
                                    i = t.data("filter");
                                "flow_flow" == P && (e = r.find(i ? "[data-type=" + i + "]" : ".ff-item, li[post-id]").length), "insta_flow" == P && (e = r.find(i ? "[data-feed=" + i + "]" : ".ff-item, li[post-id]").length), t.attr("data-num", e)
                            }), o.find(".ff-search input").on("keyup", function() {
                                var e = this.value.toLowerCase();
                                D(r, e)
                            }), o.on("click", "a", function(e) {
                                var t = A(this),
                                    i = A(this).attr("href");
                                return -1 == i.indexOf("mailto:?") && t.closest(".ff-share-popup").length ? (window.open(i, "sharer", "toolbar=0,status=0,width=626,height=436"), !1) : (!t.is(".ff-no-link") || "nope" !== n.gallery && !B) && void 0
                            }), o.on("click", ".ff-share-wrapper", function(e) {
                                var t = A(this);
                                t.data("opened") ? (t.removeClass("ff-popup__visible"), t.data("opened", !1)) : (t.addClass("ff-popup__visible"), t.data("opened", !0))
                            }), "nope" === n.gallery ? (r.addClass("ff-gallery-off").on("click", '.ff-item:not(".ff-ad") .picture-item__inner', function(e) {
                                var t = A(e.target),
                                    i = A(this);
                                if (!t.closest("a, .ff-share-wrapper").length || t.is("img")) return B ? i.toggleClass("ff-taped") : function(e) {
                                    if (document.createEvent) {
                                        var t = document.createEvent("MouseEvents");
                                        t.initEvent("click", !1, !0), e.dispatchEvent(t)
                                    } else document.createEventObject ? e.fireEvent("onclick") : "function" == typeof e.onclick && e.onclick()
                                }(i.find(".ff-timestamp")[0]), !1
                            }), r.on("click", ".ff-timestamp", function(e) {
                                e.stopImmediatePropagation()
                            })) : r.addClass("ff-gallery-on"), "yep" === V.open_in_new) {
                            var O = location.hostname;
                            o.find("a").filter(function() {
                                var e = this.href;
                                return this.hostname != O && e && -1 == e.indexOf("mailto")
                            }).attr("target", "_blank").attr("rel", "noreferrer")
                        }
                        for (var E in z(l, n), t && (w = o, b = (y = n).id, x = y.hash, k = {}, C = FlowFlowOpts.token, w.find(".ff-moderation-apply").click(function(e) {
                                var t = A.post(FlowFlowOpts.ajaxurl, {
                                    action: "flow_flow_moderation_apply_action",
                                    moderation_action: "custom_approve",
                                    stream: b,
                                    changed: k,
                                    hash: x,
                                    token: C
                                });
                                A.when(t).then(function(e) {
                                    location.reload()
                                }, function() {
                                    location.reload()
                                })
                            }), w.find(".ff-moderation-approve-new").click(function(e) {
                                var t = A.post(FlowFlowOpts.ajaxurl, {
                                    action: "flow_flow_moderation_apply_action",
                                    moderation_action: "new_posts_approve",
                                    stream: b,
                                    hash: x,
                                    token: C
                                });
                                A.when(t).then(function(e) {
                                    location.reload()
                                }, function() {
                                    location.reload()
                                })
                            }), w.on("change", ".ff-moderation-wrapper input", function(e) {
                                var t = A(this),
                                    i = t.is(":checked"),
                                    s = t.closest(".ff-item, li[class*=ff-slide]").attr("post-id");
                                t.closest(".ff-moderation-wrapper")[i ? "addClass" : "removeClass"]("ff-approved"), k[s] = {
                                    approved: i
                                }
                            })), F[n.id] = r, i) i[E] && this[E].init(r);
                        return o
                    }
                    console.log("FLOW-FLOW: Empty response from server")
                },
                setupGrid: function(e, t, i, s, n, o) {
                    setTimeout(function() {
                        r(e, t, i, s, n, o)
                    }, 0)
                },
                adjustImgHeight: function(e, n) {
                    e.find("img").each(function() {
                        var e = A(this),
                            t = parseInt(e.css("height")),
                            i = parseInt(e.css("width")),
                            s = n / i;
                        e.css("height", Math.round(t * s) + "px")
                    })
                }
            }
        }(s);
        window.FlowFlow = v.init();
        var U = function(t, i) {
            return function() {
                var e = Array.prototype.slice.call(arguments);
                return e.push(i), t.apply(this, e)
            }
        };

        function G(e, t, i, s) {
            return e = Number(e), !1 !== (s = s || !1) ? a(e, t, i, s) : a(e, t, i, 1e12 <= e ? "T" : 1e9 <= e ? "B" : 1e6 <= e ? "M" : 1e3 <= e ? "K" : "")
        }

        function a(e, t, i, s) {
            var n = 0;
            switch (s) {
                case "T":
                    n = e / 1e12;
                    break;
                case "B":
                    n = e / 1e9;
                    break;
                case "M":
                    n = e / 1e6;
                    break;
                case "K":
                    n = e / 1e3;
                    break;
                case "":
                    n = e
            }!1 !== t && (new RegExp("\\.\\d{" + (t + 1) + ",}$").test("" + n) && (n = n.toFixed(t)));
            return !1 !== i && (n = Number(n).toFixed(i)), n + s
        }
    }(jQuery), jQuery(document).on("done.stream", function(e, t, i) {
        jQuery(function() {
            setTimeout(function() {}, 500)
        })
    });
