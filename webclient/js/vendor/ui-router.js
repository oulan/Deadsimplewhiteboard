/**
 * State-based routing for AngularJS
 * @version v0.2.10
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
function(a, b, c) {
    "use strict";

    function d(a, b) {
        return I(new(I(function() {}, {
            prototype: a
        })), b)
    }

    function e(a) {
        return H(arguments, function(b) {
            b !== a && H(b, function(b, c) {
                a.hasOwnProperty(c) || (a[c] = b)
            })
        }), a
    }

    function f(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d]) break;
            c.push(a.path[d])
        }
        return c
    }

    function g(a, b) {
        if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0,
            d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)
            if (d in a && a[d] === b) return d;
        return -1
    }

    function h(a, b, c, d) {
        var e, h = f(c, d),
            i = {},
            j = [];
        for (var k in h)
            if (h[k].params && h[k].params.length) {
                e = h[k].params;
                for (var l in e) g(j, e[l]) >= 0 || (j.push(e[l]), i[e[l]] = a[e[l]])
            }
        return I({}, i, b)
    }

    function i(a, b) {
        var c = {};
        return H(a, function(a) {
            var d = b[a];
            c[a] = null != d ? String(d) : null
        }), c
    }

    function j(a, b, c) {
        if (!c) {
            c = [];
            for (var d in a) c.push(d)
        }
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (a[f] != b[f]) return !1
        }
        return !0
    }

    function k(a, b) {
        var c = {};
        return H(a, function(a) {
            c[a] = b[a]
        }), c
    }

    function l(a, b) {
        var d = 1,
            f = 2,
            g = {},
            h = [],
            i = g,
            j = I(a.when(g), {
                $$promises: g,
                $$values: g
            });
        this.study = function(g) {
            function k(a, c) {
                if (o[c] !== f) {
                    if (n.push(c), o[c] === d) throw n.splice(0, n.indexOf(c)), new Error("Cyclic dependency: " + n.join(" -> "));
                    if (o[c] = d, E(a)) m.push(c, [
                        function() {
                            return b.get(a)
                        }
                    ], h);
                    else {
                        var e = b.annotate(a);
                        H(e, function(a) {
                            a !== c && g.hasOwnProperty(a) && k(g[a], a)
                        }), m.push(c, a, e)
                    }
                    n.pop(), o[c] = f
                }
            }

            function l(a) {
                return F(a) && a.then && a.$$promises
            }
            if (!F(g)) throw new Error("'invocables' must be an object");
            var m = [],
                n = [],
                o = {};
            return H(g, k), g = n = o = null,
                function(d, f, g) {
                    function h() {
                        --s || (t || e(r, f.$$values), p.$$values = r, p.$$promises = !0, o.resolve(r))
                    }

                    function k(a) {
                        p.$$failure = a, o.reject(a)
                    }

                    function n(c, e, f) {
                        function i(a) {
                            l.reject(a), k(a)
                        }

                        function j() {
                            if (!C(p.$$failure)) try {
                                l.resolve(b.invoke(e, g, r)), l.promise.then(function(a) {
                                    r[c] = a, h()
                                }, i)
                            } catch (a) {
                                i(a)
                            }
                        }
                        var l = a.defer(),
                            m = 0;
                        H(f, function(a) {
                            q.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, q[a].then(function(b) {
                                r[a] = b, --m || j()
                            }, i))
                        }), m || j(), q[c] = l.promise
                    }
                    if (l(d) && g === c && (g = f, f = d, d = null), d) {
                        if (!F(d)) throw new Error("'locals' must be an object")
                    } else d = i; if (f) {
                        if (!l(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                    } else f = j;
                    var o = a.defer(),
                        p = o.promise,
                        q = p.$$promises = {},
                        r = I({}, d),
                        s = 1 + m.length / 3,
                        t = !1;
                    if (C(f.$$failure)) return k(f.$$failure), p;
                    f.$$values ? (t = e(r, f.$$values), h()) : (I(q, f.$$promises), f.then(h, k));
                    for (var u = 0, v = m.length; v > u; u += 3) d.hasOwnProperty(m[u]) ? h() : n(m[u], m[u + 1], m[u + 2]);
                    return p
                }
        }, this.resolve = function(a, b, c, d) {
            return this.study(a)(b, c, d)
        }
    }

    function m(a, b, c) {
        this.fromConfig = function(a, b, c) {
            return C(a.template) ? this.fromString(a.template, b) : C(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : C(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
        }, this.fromString = function(a, b) {
            return D(a) ? a(b) : a
        }, this.fromUrl = function(c, d) {
            return D(c) && (c = c(d)), null == c ? null : a.get(c, {
                cache: b
            }).then(function(a) {
                return a.data
            })
        }, this.fromProvider = function(a, b, d) {
            return c.invoke(a, null, d || {
                params: b
            })
        }
    }

    function n(a) {
        function b(b) {
            if (!/^\w+(-+\w+)*$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
            if (f[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
            f[b] = !0, j.push(b)
        }

        function c(a) {
            return a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&")
        }
        var d, e = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
            f = {},
            g = "^",
            h = 0,
            i = this.segments = [],
            j = this.params = [];
        this.source = a;
        for (var k, l, m;
            (d = e.exec(a)) && (k = d[2] || d[3], l = d[4] || ("*" == d[1] ? ".*" : "[^/]*"), m = a.substring(h, d.index), !(m.indexOf("?") >= 0));) g += c(m) + "(" + l + ")", b(k), i.push(m), h = e.lastIndex;
        m = a.substring(h);
        var n = m.indexOf("?");
        if (n >= 0) {
            var o = this.sourceSearch = m.substring(n);
            m = m.substring(0, n), this.sourcePath = a.substring(0, h + n), H(o.substring(1).split(/[&?]/), b)
        } else this.sourcePath = a, this.sourceSearch = "";
        g += c(m) + "$", i.push(m), this.regexp = new RegExp(g), this.prefix = i[0]
    }

    function o() {
        this.compile = function(a) {
            return new n(a)
        }, this.isMatcher = function(a) {
            return F(a) && D(a.exec) && D(a.format) && D(a.concat)
        }, this.$get = function() {
            return this
        }
    }

    function p(a) {
        function b(a) {
            var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
            return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
        }

        function c(a, b) {
            return a.replace(/\$(\$|\d{1,2})/, function(a, c) {
                return b["$" === c ? 0 : Number(c)]
            })
        }

        function d(a, b, c) {
            if (!c) return !1;
            var d = a.invoke(b, b, {
                $match: c
            });
            return C(d) ? d : !0
        }
        var e = [],
            f = null;
        this.rule = function(a) {
            if (!D(a)) throw new Error("'rule' must be a function");
            return e.push(a), this
        }, this.otherwise = function(a) {
            if (E(a)) {
                var b = a;
                a = function() {
                    return b
                }
            } else if (!D(a)) throw new Error("'rule' must be a function");
            return f = a, this
        }, this.when = function(e, f) {
            var g, h = E(f);
            if (E(e) && (e = a.compile(e)), !h && !D(f) && !G(f)) throw new Error("invalid 'handler' in when()");
            var i = {
                    matcher: function(b, c) {
                        return h && (g = a.compile(c), c = ["$match",
                            function(a) {
                                return g.format(a)
                            }
                        ]), I(function(a, e) {
                            return d(a, c, b.exec(e.path(), e.search()))
                        }, {
                            prefix: E(b.prefix) ? b.prefix : ""
                        })
                    },
                    regex: function(a, e) {
                        if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");
                        return h && (g = e, e = ["$match",
                            function(a) {
                                return c(g, a)
                            }
                        ]), I(function(b, c) {
                            return d(b, e, a.exec(c.path()))
                        }, {
                            prefix: b(a)
                        })
                    }
                },
                j = {
                    matcher: a.isMatcher(e),
                    regex: e instanceof RegExp
                };
            for (var k in j)
                if (j[k]) return this.rule(i[k](e, f));
            throw new Error("invalid 'what' in when()")
        }, this.$get = ["$location", "$rootScope", "$injector",
            function(a, b, c) {
                function d(b) {
                    function d(b) {
                        var d = b(c, a);
                        return d ? (E(d) && a.replace().url(d), !0) : !1
                    }
                    if (!b || !b.defaultPrevented) {
                        var g, h = e.length;
                        for (g = 0; h > g; g++)
                            if (d(e[g])) return;
                        f && d(f)
                    }
                }
                return b.$on("$locationChangeSuccess", d), {
                    sync: function() {
                        d()
                    }
                }
            }
        ]
    }

    function q(a, e, f) {
        function g(a) {
            return 0 === a.indexOf(".") || 0 === a.indexOf("^")
        }

        function l(a, b) {
            var d = E(a),
                e = d ? a : a.name,
                f = g(e);
            if (f) {
                if (!b) throw new Error("No reference point given for path '" + e + "'");
                for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)
                    if ("" !== h[i] || 0 !== i) {
                        if ("^" !== h[i]) break;
                        if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                        k = k.parent
                    } else k = b;
                h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
            }
            var l = w[e];
            return !l || !d && (d || l !== a && l.self !== a) ? c : l
        }

        function m(a, b) {
            x[a] || (x[a] = []), x[a].push(b)
        }

        function n(b) {
            b = d(b, {
                self: b,
                resolve: b.resolve || {},
                toString: function() {
                    return this.name
                }
            });
            var c = b.name;
            if (!E(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");
            if (w.hasOwnProperty(c)) throw new Error("State '" + c + "'' is already defined");
            var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : E(b.parent) ? b.parent : "";
            if (e && !w[e]) return m(e, b.self);
            for (var f in z) D(z[f]) && (b[f] = z[f](b, z.$delegates[f]));
            if (w[c] = b, !b[y] && b.url && a.when(b.url, ["$match", "$stateParams",
                function(a, c) {
                    v.$current.navigable == b && j(a, c) || v.transitionTo(b, a, {
                        location: !1
                    })
                }
            ]), x[c])
                for (var g = 0; g < x[c].length; g++) n(x[c][g]);
            return b
        }

        function o(a) {
            return a.indexOf("*") > -1
        }

        function p(a) {
            var b = a.split("."),
                c = v.$current.name.split(".");
            if ("**" === b[0] && (c = c.slice(c.indexOf(b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(c.indexOf(b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length) return !1;
            for (var d = 0, e = b.length; e > d; d++) "*" === b[d] && (c[d] = "*");
            return c.join("") === b.join("")
        }

        function q(a, b) {
            return E(a) && !C(b) ? z[a] : D(b) && E(a) ? (z[a] && !z.$delegates[a] && (z.$delegates[a] = z[a]), z[a] = b, this) : this
        }

        function r(a, b) {
            return F(a) ? b = a : b.name = a, n(b), this
        }

        function s(a, e, g, m, n, q, r, s, x) {
            function z() {
                r.url() !== M && (r.url(M), r.replace())
            }

            function A(a, c, d, f, h) {
                var i = d ? c : k(a.params, c),
                    j = {
                        $stateParams: i
                    };
                h.resolve = n.resolve(a.resolve, j, h.resolve, a);
                var l = [h.resolve.then(function(a) {
                    h.globals = a
                })];
                return f && l.push(f), H(a.views, function(c, d) {
                    var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
                    e.$template = [
                        function() {
                            return g.load(d, {
                                view: c,
                                locals: j,
                                params: i,
                                notify: !1
                            }) || ""
                        }
                    ], l.push(n.resolve(e, j, h.resolve, a).then(function(f) {
                        if (D(c.controllerProvider) || G(c.controllerProvider)) {
                            var g = b.extend({}, e, j);
                            f.$$controller = m.invoke(c.controllerProvider, null, g)
                        } else f.$$controller = c.controller;
                        f.$$state = a, f.$$controllerAs = c.controllerAs, h[d] = f
                    }))
                }), e.all(l).then(function() {
                    return h
                })
            }
            var B = e.reject(new Error("transition superseded")),
                F = e.reject(new Error("transition prevented")),
                K = e.reject(new Error("transition aborted")),
                L = e.reject(new Error("transition failed")),
                M = r.url(),
                N = x.baseHref();
            return u.locals = {
                resolve: null,
                globals: {
                    $stateParams: {}
                }
            }, v = {
                params: {},
                current: u.self,
                $current: u,
                transition: null
            }, v.reload = function() {
                v.transitionTo(v.current, q, {
                    reload: !0,
                    inherit: !1,
                    notify: !1
                })
            }, v.go = function(a, b, c) {
                return this.transitionTo(a, b, I({
                    inherit: !0,
                    relative: v.$current
                }, c))
            }, v.transitionTo = function(b, c, f) {
                c = c || {}, f = I({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, f || {});
                var g, k = v.$current,
                    n = v.params,
                    o = k.path,
                    p = l(b, f.relative);
                if (!C(p)) {
                    var s = {
                        to: b,
                        toParams: c,
                        options: f
                    };
                    if (g = a.$broadcast("$stateNotFound", s, k.self, n), g.defaultPrevented) return z(), K;
                    if (g.retry) {
                        if (f.$retry) return z(), L;
                        var w = v.transition = e.when(g.retry);
                        return w.then(function() {
                            return w !== v.transition ? B : (s.options.$retry = !0, v.transitionTo(s.to, s.toParams, s.options))
                        }, function() {
                            return K
                        }), z(), w
                    }
                    if (b = s.to, c = s.toParams, f = s.options, p = l(b, f.relative), !C(p)) {
                        if (f.relative) throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'");
                        throw new Error("No such state '" + b + "'")
                    }
                }
                if (p[y]) throw new Error("Cannot transition to abstract state '" + b + "'");
                f.inherit && (c = h(q, c || {}, v.$current, p)), b = p;
                var x, D, E = b.path,
                    G = u.locals,
                    H = [];
                for (x = 0, D = E[x]; D && D === o[x] && j(c, n, D.ownParams) && !f.reload; x++, D = E[x]) G = H[x] = D.locals;
                if (t(b, k, G, f)) return b.self.reloadOnSearch !== !1 && z(), v.transition = null, e.when(v.current);
                if (c = i(b.params, c || {}), f.notify && (g = a.$broadcast("$stateChangeStart", b.self, c, k.self, n), g.defaultPrevented)) return z(), F;
                for (var N = e.when(G), O = x; O < E.length; O++, D = E[O]) G = H[O] = d(G), N = A(D, c, D === b, N, G);
                var P = v.transition = N.then(function() {
                    var d, e, g;
                    if (v.transition !== P) return B;
                    for (d = o.length - 1; d >= x; d--) g = o[d], g.self.onExit && m.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                    for (d = x; d < E.length; d++) e = E[d], e.locals = H[d], e.self.onEnter && m.invoke(e.self.onEnter, e.self, e.locals.globals);
                    if (v.transition !== P) return B;
                    v.$current = b, v.current = b.self, v.params = c, J(v.params, q), v.transition = null;
                    var h = b.navigable;
                    return f.location && h && (r.url(h.url.format(h.locals.globals.$stateParams)), "replace" === f.location && r.replace()), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, k.self, n), M = r.url(), v.current
                }, function(d) {
                    return v.transition !== P ? B : (v.transition = null, a.$broadcast("$stateChangeError", b.self, c, k.self, n, d), z(), e.reject(d))
                });
                return P
            }, v.is = function(a, d) {
                var e = l(a);
                return C(e) ? v.$current !== e ? !1 : C(d) && null !== d ? b.equals(q, d) : !0 : c
            }, v.includes = function(a, d) {
                if (E(a) && o(a)) {
                    if (!p(a)) return !1;
                    a = v.$current.name
                }
                var e = l(a);
                if (!C(e)) return c;
                if (!C(v.$current.includes[e.name])) return !1;
                var f = !0;
                return b.forEach(d, function(a, b) {
                    C(q[b]) && q[b] === a || (f = !1)
                }), f
            }, v.href = function(a, b, c) {
                c = I({
                    lossy: !0,
                    inherit: !1,
                    absolute: !1,
                    relative: v.$current
                }, c || {});
                var d = l(a, c.relative);
                if (!C(d)) return null;
                b = h(q, b || {}, v.$current, d);
                var e = d && c.lossy ? d.navigable : d,
                    g = e && e.url ? e.url.format(i(d.params, b || {})) : null;
                return !f.html5Mode() && g && (g = "#" + f.hashPrefix() + g), "/" !== N && (f.html5Mode() ? g = N.slice(0, -1) + g : c.absolute && (g = N.slice(1) + g)), c.absolute && g && (g = r.protocol() + "://" + r.host() + (80 == r.port() || 443 == r.port() ? "" : ":" + r.port()) + (!f.html5Mode() && g ? "/" : "") + g), g
            }, v.get = function(a, b) {
                if (!C(a)) {
                    var c = [];
                    return H(w, function(a) {
                        c.push(a.self)
                    }), c
                }
                var d = l(a, b);
                return d && d.self ? d.self : null
            }, v
        }

        function t(a, b, c, d) {
            return a !== b || (c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1 ? void 0 : !0
        }
        var u, v, w = {},
            x = {},
            y = "abstract",
            z = {
                parent: function(a) {
                    if (C(a.parent) && a.parent) return l(a.parent);
                    var b = /^(.+)\.[^.]+$/.exec(a.name);
                    return b ? l(b[1]) : u
                },
                data: function(a) {
                    return a.parent && a.parent.data && (a.data = a.self.data = I({}, a.parent.data, a.data)), a.data
                },
                url: function(a) {
                    var b = a.url;
                    if (E(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1)) : (a.parent.navigable || u).url.concat(b);
                    if (e.isMatcher(b) || null == b) return b;
                    throw new Error("Invalid url '" + b + "' in state '" + a + "'")
                },
                navigable: function(a) {
                    return a.url ? a : a.parent ? a.parent.navigable : null
                },
                params: function(a) {
                    if (!a.params) return a.url ? a.url.parameters() : a.parent.params;
                    if (!G(a.params)) throw new Error("Invalid params in state '" + a + "'");
                    if (a.url) throw new Error("Both params and url specicified in state '" + a + "'");
                    return a.params
                },
                views: function(a) {
                    var b = {};
                    return H(C(a.views) ? a.views : {
                        "": a
                    }, function(c, d) {
                        d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
                    }), b
                },
                ownParams: function(a) {
                    if (!a.parent) return a.params;
                    var b = {};
                    H(a.params, function(a) {
                        b[a] = !0
                    }), H(a.parent.params, function(c) {
                        if (!b[c]) throw new Error("Missing required parameter '" + c + "' in state '" + a.name + "'");
                        b[c] = !1
                    });
                    var c = [];
                    return H(b, function(a, b) {
                        a && c.push(b)
                    }), c
                },
                path: function(a) {
                    return a.parent ? a.parent.path.concat(a) : []
                },
                includes: function(a) {
                    var b = a.parent ? I({}, a.parent.includes) : {};
                    return b[a.name] = !0, b
                },
                $delegates: {}
            };
        u = n({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }), u.navigable = null, this.decorator = q, this.state = r, this.$get = s, s.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$location", "$urlRouter", "$browser"]
    }

    function r() {
        function a(a, b) {
            return {
                load: function(c, d) {
                    var e, f = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return d = I(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
                }
            }
        }
        this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
    }

    function s() {
        var a = !1;
        this.useAnchorScroll = function() {
            a = !0
        }, this.$get = ["$anchorScroll", "$timeout",
            function(b, c) {
                return a ? b : function(a) {
                    c(function() {
                        a[0].scrollIntoView()
                    }, 0, !1)
                }
            }
        ]
    }

    function t(a, c, d) {
        function e() {
            return c.has ? function(a) {
                return c.has(a) ? c.get(a) : null
            } : function(a) {
                try {
                    return c.get(a)
                } catch (b) {
                    return null
                }
            }
        }

        function f(a, b) {
            var c = function() {
                return {
                    enter: function(a, b, c) {
                        b.after(a), c()
                    },
                    leave: function(a, b) {
                        a.remove(), b()
                    }
                }
            };
            if (i) return {
                enter: function(a, b, c) {
                    i.enter(a, null, b, c)
                },
                leave: function(a, b) {
                    i.leave(a, b)
                }
            };
            if (h) {
                var d = h && h(b, a);
                return {
                    enter: function(a, b, c) {
                        d.enter(a, null, b), c()
                    },
                    leave: function(a, b) {
                        d.leave(a), b()
                    }
                }
            }
            return c()
        }
        var g = e(),
            h = g("$animator"),
            i = g("$animate"),
            j = {
                restrict: "ECA",
                terminal: !0,
                priority: 400,
                transclude: "element",
                compile: function(c, e, g) {
                    return function(c, e, h) {
                        function i() {
                            k && (k.remove(), k = null), m && (m.$destroy(), m = null), l && (q.leave(l, function() {
                                k = null
                            }), k = l, l = null)
                        }

                        function j(f) {
                            var h = c.$new(),
                                j = l && l.data("$uiViewName"),
                                k = j && a.$current && a.$current.locals[j];
                            if (f || k !== n) {
                                var r = g(h, function(a) {
                                    q.enter(a, e, function() {
                                        (b.isDefined(p) && !p || c.$eval(p)) && d(a)
                                    }), i()
                                });
                                n = a.$current.locals[r.data("$uiViewName")], l = r, m = h, m.$emit("$viewContentLoaded"), m.$eval(o)
                            }
                        }
                        var k, l, m, n, o = h.onload || "",
                            p = h.autoscroll,
                            q = f(h, c);
                        c.$on("$stateChangeSuccess", function() {
                            j(!1)
                        }), c.$on("$viewContentLoading", function() {
                            j(!1)
                        }), j(!0)
                    }
                }
            };
        return j
    }

    function u(a, b, c) {
        return {
            restrict: "ECA",
            priority: -400,
            compile: function(d) {
                var e = d.html();
                return function(d, f, g) {
                    var h = g.uiView || g.name || "",
                        i = f.inheritedData("$uiView");
                    h.indexOf("@") < 0 && (h = h + "@" + (i ? i.state.name : "")), f.data("$uiViewName", h);
                    var j = c.$current,
                        k = j && j.locals[h];
                    if (k) {
                        f.data("$uiView", {
                            name: h,
                            state: k.$$state
                        }), f.html(k.$template ? k.$template : e);
                        var l = a(f.contents());
                        if (k.$$controller) {
                            k.$scope = d;
                            var m = b(k.$$controller, k);
                            k.$$controllerAs && (d[k.$$controllerAs] = m), f.data("$ngControllerController", m), f.children().data("$ngControllerController", m)
                        }
                        l(d)
                    }
                }
            }
        }
    }

    function v(a) {
        var b = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
        if (!b || 4 !== b.length) throw new Error("Invalid state ref '" + a + "'");
        return {
            state: b[1],
            paramExpr: b[3] || null
        }
    }

    function w(a) {
        var b = a.parent().inheritedData("$uiView");
        return b && b.state && b.state.name ? b.state : void 0
    }

    function x(a, c) {
        var d = ["location", "inherit", "reload"];
        return {
            restrict: "A",
            require: "?^uiSrefActive",
            link: function(e, f, g, h) {
                var i = v(g.uiSref),
                    j = null,
                    k = w(f) || a.$current,
                    l = "FORM" === f[0].nodeName,
                    m = l ? "action" : "href",
                    n = !0,
                    o = {
                        relative: k
                    },
                    p = e.$eval(g.uiSrefOpts) || {};
                b.forEach(d, function(a) {
                    a in p && (o[a] = p[a])
                });
                var q = function(b) {
                    if (b && (j = b), n) {
                        var c = a.href(i.state, j, o);
                        return h && h.$$setStateInfo(i.state, j), c ? void(f[0][m] = c) : (n = !1, !1)
                    }
                };
                i.paramExpr && (e.$watch(i.paramExpr, function(a) {
                    a !== j && q(a)
                }, !0), j = e.$eval(i.paramExpr)), q(), l || f.bind("click", function(b) {
                    var d = b.which || b.button;
                    d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target") || (c(function() {
                        a.go(i.state, j, o)
                    }), b.preventDefault())
                })
            }
        }
    }

    function y(a, b, c) {
        return {
            restrict: "A",
            controller: ["$scope", "$element", "$attrs",
                function(d, e, f) {
                    function g() {
                        a.$current.self === i && h() ? e.addClass(l) : e.removeClass(l)
                    }

                    function h() {
                        return !k || j(k, b)
                    }
                    var i, k, l;
                    l = c(f.uiSrefActive || "", !1)(d), this.$$setStateInfo = function(b, c) {
                        i = a.get(b, w(e)), k = c, g()
                    }, d.$on("$stateChangeSuccess", g)
                }
            ]
        }
    }

    function z(a) {
        return function(b) {
            return a.is(b)
        }
    }

    function A(a) {
        return function(b) {
            return a.includes(b)
        }
    }

    function B(a, b) {
        function e(a) {
            this.locals = a.locals.globals, this.params = this.locals.$stateParams
        }

        function f() {
            this.locals = null, this.params = null
        }

        function g(c, g) {
            if (null != g.redirectTo) {
                var h, j = g.redirectTo;
                if (E(j)) h = j;
                else {
                    if (!D(j)) throw new Error("Invalid 'redirectTo' in when()");
                    h = function(a, b) {
                        return j(a, b.path(), b.search())
                    }
                }
                b.when(c, h)
            } else a.state(d(g, {
                parent: null,
                name: "route:" + encodeURIComponent(c),
                url: c,
                onEnter: e,
                onExit: f
            }));
            return i.push(g), this
        }

        function h(a, b, d) {
            function e(a) {
                return "" !== a.name ? a : c
            }
            var f = {
                routes: i,
                params: d,
                current: c
            };
            return b.$on("$stateChangeStart", function(a, c, d, f) {
                b.$broadcast("$routeChangeStart", e(c), e(f))
            }), b.$on("$stateChangeSuccess", function(a, c, d, g) {
                f.current = e(c), b.$broadcast("$routeChangeSuccess", e(c), e(g)), J(d, f.params)
            }), b.$on("$stateChangeError", function(a, c, d, f, g, h) {
                b.$broadcast("$routeChangeError", e(c), e(f), h)
            }), f
        }
        var i = [];
        e.$inject = ["$$state"], this.when = g, this.$get = h, h.$inject = ["$state", "$rootScope", "$routeParams"]
    }
    var C = b.isDefined,
        D = b.isFunction,
        E = b.isString,
        F = b.isObject,
        G = b.isArray,
        H = b.forEach,
        I = b.extend,
        J = b.copy;
    b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), l.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", l), m.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", m), n.prototype.concat = function(a) {
        return new n(this.sourcePath + a + this.sourceSearch)
    }, n.prototype.toString = function() {
        return this.source
    }, n.prototype.exec = function(a, b) {
        var c = this.regexp.exec(a);
        if (!c) return null;
        var d, e = this.params,
            f = e.length,
            g = this.segments.length - 1,
            h = {};
        if (g !== c.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
        for (d = 0; g > d; d++) h[e[d]] = c[d + 1];
        for (; f > d; d++) h[e[d]] = b[e[d]];
        return h
    }, n.prototype.parameters = function() {
        return this.params
    }, n.prototype.format = function(a) {
        var b = this.segments,
            c = this.params;
        if (!a) return b.join("");
        var d, e, f, g = b.length - 1,
            h = c.length,
            i = b[0];
        for (d = 0; g > d; d++) f = a[c[d]], null != f && (i += encodeURIComponent(f)), i += b[d + 1];
        for (; h > d; d++) f = a[c[d]], null != f && (i += (e ? "&" : "?") + c[d] + "=" + encodeURIComponent(f), e = !0);
        return i
    }, b.module("ui.router.util").provider("$urlMatcherFactory", o), p.$inject = ["$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", p), q.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider", "$locationProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", q), r.$inject = [], b.module("ui.router.state").provider("$view", r), b.module("ui.router.state").provider("$uiViewScroll", s), t.$inject = ["$state", "$injector", "$uiViewScroll"], u.$inject = ["$compile", "$controller", "$state"], b.module("ui.router.state").directive("uiView", t), b.module("ui.router.state").directive("uiView", u), x.$inject = ["$state", "$timeout"], y.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", x).directive("uiSrefActive", y), z.$inject = ["$state"], A.$inject = ["$state"], b.module("ui.router.state").filter("isState", z).filter("includedByState", A), B.$inject = ["$stateProvider", "$urlRouterProvider"], b.module("ui.router.compat").provider("$route", B).directive("ngView", t)
}(window, window.angular);