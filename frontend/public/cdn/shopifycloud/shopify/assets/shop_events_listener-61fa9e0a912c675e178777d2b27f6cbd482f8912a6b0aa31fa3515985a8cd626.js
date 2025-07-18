/** @format */

!(function () {
 var e = function (e) {
   var t = {
    exports: {},
   };
   return e.call(t.exports, t, t.exports), t.exports;
  },
  t = (function () {
   function e(e, t) {
    for (var n = 0; n < t.length; n++) {
     var r = t[n];
     (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
    }
   }
   return function (t, n, r) {
    // return n && e(t.prototype, n), r && e(t, r), t
   };
  })(),
  n = function (e, t) {
   if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
  },
  r = function (e) {
   if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
   }
   return Array.from(e);
  };
 e(function (e, a) {
  "use strict";

  function o(e, t) {
   if (e.length != t.length)
    throw Error("Payload body and response have different number of items");
   e.forEach(function (e, n) {
    var r = 1;
    try {
     r = parseInt(t[n].quantity, 10) || 1;
    } catch (e) {
     console &&
      console.warn &&
      console.warn(
       "[shop_events_listener] Error in handleBulkItemCartAddResponse: " +
        e.message,
      );
    }
    s(e, r);
   });
  }

  function i(e, t) {
   for (var n = new Array(t), r = 0; r < t; r++) n[r] = {};
   var a = !0,
    o = !1,
    i = void 0;
   try {
    for (
     var c, s = decodeURI(e).split("&")[Symbol.iterator]();
     !(a = (c = s.next()).done);
     a = !0
    ) {
     var d = c.value.split("="),
      u = d[0].match(/items\[(\d+)\]\[(\w+)\].*/);
     if (u) {
      var l = u[1],
       y = u[2];
      "quantity" === y
       ? (n[l].quantity = d[1])
       : "id" === y && (n[l].id = d[1]);
     }
    }
   } catch (e) {
    (o = !0), (i = e);
   } finally {
    try {
     !a && s.return && s.return();
    } finally {
     if (o) throw i;
    }
   }
   return n;
  }

  function c(e) {
   if (!e) return 1;
   try {
    return JSON.parse(e).quantity || 1;
   } catch (a) {
    if (e instanceof FormData) {
     if (e.has("quantity")) return e.get("quantity");
    } else
     for (var t = e.split("&"), n = 0; n < t.length; n++) {
      var r = t[n].split("=");
      if ("quantity" === r[0]) return r[1];
     }
   }
   return 1;
  }

  function s(e, t) {
   var n = l("cart"),
    r = u(
     {
      variantId: String(e.id),
      productId: e.product_id,
      currency: window.ShopifyAnalytics.meta.currency,
      quantity: String(t || 1),
      price: e.presentment_price,
      name: e.title,
      sku: e.sku,
      brand: e.vendor,
      variant: e.variant_title,
      category: e.product_type,
     },
     d(),
    ),
    a = u(
     {
      cartToken: n,
     },
     r,
    );
   window.ShopifyAnalytics.lib.track("Added Product", a);
   var o = u(
    {
     referer: window.location.href,
    },
    r,
   );
   window.ShopifyAnalytics.lib.track(
    "monorail://trekkie_storefront_track_added_product/1.1",
    o,
   );
  }

  function d() {
   var e = {};
   return (
    window.ShopifyAnalytics.meta.page &&
     (e = {
      pageType: window.ShopifyAnalytics.meta.page.pageType,
      resourceType: window.ShopifyAnalytics.meta.page.resourceType,
      resourceId: window.ShopifyAnalytics.meta.page.resourceId,
     }),
    e
   );
  }

  function u(e, t) {
   for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
   return e;
  }

  function l(e) {
   try {
    var t = new RegExp("(" + e + ")=([^;]+)").exec(document.cookie);
    return t ? unescape(t[2]) : null;
   } catch (e) {
    return null;
   }
  }
  Object.defineProperty(a, "__esModule", {
   value: !0,
  });
  var y,
   f,
   h,
   p = (function () {
    function e(t, r, a, o) {
     n(this, e),
      (this.xhr = t),
      (this.url = r),
      (this.method = a),
      (this.body = o);
    }
    return (
     t(e, null, [
      {
       key: "handleXhrOpen",
       value: function () {},
      },
     ]),
     t(
      e,
      [
       {
        key: "onReadyStateChange",
        value: function () {
         this.xhr.readyState === XMLHttpRequest.DONE &&
          e.handleXhrDone({
           method: this.method,
           url: this.url,
           body: this.body,
           xhr: this.xhr,
          }),
          this.oldOnReadyStateChange && this.oldOnReadyStateChange();
        },
       },
      ],
      [
       {
        key: "handleXhrDone",
        value: function (t) {
         try {
          var n = document.createElement("a");
          n.href = t.url;
          var r = n.pathname ? n.pathname : t.url;
          e.ADD_TO_CART_REGEX.test(r) &&
           e._parsePayloadResponse(t, function (e) {
            var n = Object.keys(e);
            if (1 === n.length && "items" === n[0]) {
             var r = e.items,
              a = void 0;
             try {
              a = JSON.parse(t.body).items;
             } catch (e) {
              a = i(t.body, r.length);
             }
             o(r, a);
            } else s(e, c(t.body));
           });
         } catch (e) {
          console &&
           console.warn &&
           console.warn(
            "[shop_events_listener] Error in handleXhrDone:  " + e.message,
           );
         }
        },
       },
       {
        key: "parseBlobToJson",
        value: function (e, t) {
         var n = new FileReader();
         n.addEventListener("loadend", function () {
          return t(
           JSON.parse(
            String.fromCharCode.apply(String, r(new Uint8Array(n.result))),
           ),
          );
         }),
          n.readAsArrayBuffer(e);
        },
       },
       {
        key: "_parsePayloadResponse",
        value: function (t, n) {
         t.xhr.response instanceof Blob
          ? e.parseBlobToJson(t.xhr.response, n)
          : t.xhr.responseText && n(JSON.parse(t.xhr.responseText));
        },
       },
      ],
     ),
     e
    );
   })();
  (p.ADD_TO_CART_REGEX =
   /^(?:\/[a-zA-Z]+(?:\-[a-zA-Z]+)?)?\/cart\/add(?:\.js|\.json)?$/),
   (a.default = p),
   (function () {
    function e(e, t, n) {
     window.jQuery && window.jQuery(e).bind
      ? window.jQuery(e).bind(t, n)
      : e.addEventListener
      ? e.addEventListener(t, n)
      : e.attachEvent && e.attachEvent("on" + t, n);
    }

    function t(e) {
     if (
      !(
       (e = e || window.event).defaultPrevented ||
       (e.isDefaultPrevented && e.isDefaultPrevented())
      )
     ) {
      var t = e.target || e.srcElement;
      if (t && (t.getAttribute("action") || t.getAttribute("href")))
       try {
        var n = void 0,
         r = t.id || t.elements.id;
        n = r.options ? r.options[r.selectedIndex] : r;
        var a = l("cart"),
         i = o(n.value);
        i.quantity = String(t.quantity ? t.quantity.value : 1);
        var c = u(
          {
           cartToken: a,
          },
          i,
         ),
         s = u(
          {
           referer: window.location.href,
          },
          i,
         );
        window.ShopifyAnalytics.lib.track("Added Product", c),
         window.ShopifyAnalytics.lib.track(
          "monorail://trekkie_storefront_track_added_product/1.1",
          s,
         );
       } catch (e) {
        console &&
         console.warn &&
         console.warn(
          "[shop_events_listener] Error in handleSubmitCartAdd: " + e.message,
         );
       }
     }
    }

    function n(e) {
     var t = (e = e || window.event).target || e.srcElement;
     if (
      t &&
      t.getAttribute("action") &&
      null !== t.getAttribute("data-payment-form")
     )
      try {
       window.ShopifyAnalytics.lib.track("Added Payment", {
        currency: window.ShopifyAnalytics.meta.currency,
        total: window.ShopifyAnalytics.meta.checkout.payment_due / 100,
       });
      } catch (e) {
       console &&
        console.warn &&
        console.warn(
         "[shop_events_listener] Error in handleSubmitToPaymentAdd: " +
          e.message,
        );
      }
    }

    function r(e) {
     a((e = e || window.event).currentTarget);
    }

    function a(e) {
     try {
      var t = void 0,
       n = e.id || e.elements.id;
      if (
       !(t =
        n.options && n.options[n.selectedIndex]
         ? n.options[n.selectedIndex]
         : n)
      )
       return;
      var r = t.value;
      if (
       window.ShopifyAnalytics.meta.selectedVariantId &&
       window.ShopifyAnalytics.meta.selectedVariantId == r
      )
       return;
      window.ShopifyAnalytics.meta.selectedVariantId = r;
      var a = o(r);
      window.ShopifyAnalytics.lib.track("Viewed Product Variant", a);
     } catch (e) {
      console &&
       console.warn &&
       console.warn(
        "[shop_events_listener] Error in trackViewedProductVariant: " +
         e.message,
       );
     }
    }

    function o(e) {
     var t = u(s(e), d());
     return (t.currency = window.ShopifyAnalytics.meta.currency), t;
    }

    function i(e, t) {
     var n = !0,
      r = !1,
      a = void 0;
     try {
      for (
       var o, i = t[Symbol.iterator]();
       !(n = (o = i.next()).done);
       n = !0
      ) {
       var s = o.value,
        d = c(e, s);
       if (d)
        return {
         product: s,
         variant: d,
        };
      }
     } catch (e) {
      (r = !0), (a = e);
     } finally {
      try {
       !n && i.return && i.return();
      } finally {
       if (r) throw a;
      }
     }
    }

    function c(e, t) {
     var n = !0,
      r = !1,
      a = void 0;
     try {
      for (
       var o, i = t.variants[Symbol.iterator]();
       !(n = (o = i.next()).done);
       n = !0
      ) {
       var c = o.value;
       if (c.id == e) return c;
      }
     } catch (e) {
      (r = !0), (a = e);
     } finally {
      try {
       !n && i.return && i.return();
      } finally {
       if (r) throw a;
      }
     }
    }

    function s(e) {
     var t = void 0,
      n = void 0,
      r = void 0;
     if (window.ShopifyAnalytics.meta.products) {
      var a = i(e, window.ShopifyAnalytics.meta.products);
      (t = a.product), (n = a.variant);
     } else
      window.ShopifyAnalytics.meta.product &&
       (n = c(e, (t = window.ShopifyAnalytics.meta.product)));
     return (
      t
       ? ((r = {
          productId: t.id,
          productGid: t.gid,
          brand: t.vendor,
          category: t.type,
         }),
         n &&
          (r = u(r, {
           variantId: e,
           price: n.price / 100,
           name: n.name,
           sku: n.sku,
           variant: n.public_title,
          })))
       : (r = {
          variantId: e,
         }),
      r
     );
    }
    e(window, "load", function () {
     for (var o = 0; o < document.forms.length; o++) {
      var i = document.forms[o].getAttribute("action");
      i &&
       i.indexOf("/cart/add") >= 0 &&
       (e(document.forms[o], "submit", t),
       e(document.forms[o], "change", r),
       a(document.forms[o]));
      var c = document.forms[o].elements.previous_step;
      c && "payment_method" === c.value && e(document.body, "submit", n);
     }
    });
   })(),
   (y = XMLHttpRequest),
   (f = y.prototype.open),
   (h = y.prototype.send),
   (y.prototype.open = function (e, t) {
    (this._url = t),
     (this._method = e),
     p.handleXhrOpen(),
     f.apply(this, arguments);
   }),
   (y.prototype.send = function (e) {
    var t = new p(this, this._url, this._method, e);
    this.addEventListener
     ? this.addEventListener(
        "readystatechange",
        t.onReadyStateChange.bind(t),
        !1,
       )
     : ((t.oldOnReadyStateChange = this.onreadystatechange),
       (this.onreadystatechange = t.onReadyStateChange)),
     h.call(this, e);
   }),
   (function (e, t) {
    function n(e, t) {
     e.clone()
      .json()
      .then(function (e) {
       var n = t.items;
       return o(e.items, n), e;
      })
      .catch(a);
    }

    function r(e, t) {
     var n = c(t);
     e.clone()
      .json()
      .then(function (e) {
       return s(e, n);
      })
      .catch(a);
    }

    function a(e) {
     console &&
      console.warn &&
      console.warn(
       "[shop_events_listener] Error in handleFetchRequest:  " + e.message,
      );
    }
    "function" == typeof t &&
     (e.fetch = function () {
      var e = arguments;
      return t
       .apply(this, Array.prototype.slice.call(arguments))
       .then(function (t) {
        if (!t.ok) return t;
        var o = document.createElement("a");
        o.href = t.url;
        var i = o.pathname ? o.pathname : t.url;
        try {
         if (p.ADD_TO_CART_REGEX.test(i)) {
          try {
           var c = JSON.parse(e[1].body);
           if (Object.keys(c).includes("items")) return n(t, c), t;
          } catch (e) {}
          r(t, e[1].body);
         }
        } catch (e) {
         a(e);
        }
        return t;
       });
     });
   })(window, window.fetch);
 });
})(
 "undefined" != typeof global ? global : "undefined" != typeof window && window,
);
