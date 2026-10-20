import { n as e, t } from "./chunk-C_CI6nMA.js";
import { a as n, i as r, n as i, o as a, r as o, s, t as c } from "./UILanguage-u4X_5GKm.js";
//#region node_modules/scheduler/cjs/scheduler.production.js
var l = /* @__PURE__ */ t(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, O());
		else {
			var t = n(l);
			t !== null && j(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), u = /* @__PURE__ */ t(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ t(((e) => {
	var t = s();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function l(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = c.T, n = i.p;
		try {
			if (c.T = null, i.p = 2, e) return e();
		} finally {
			c.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = l(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = l(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return c.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return c.H.useHostTransitionStatus();
	}, e.version = "19.2.6";
})), f = /* @__PURE__ */ t(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = d();
})), p = /* @__PURE__ */ t(((e) => {
	var t = u(), n = s(), r = f();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function c(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function d(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function p(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return d(a), e;
					if (s === r) return d(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, l = a.child; l;) {
					if (l === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (l === r) {
						c = !0, r = a, n = s;
						break;
					}
					l = l.sibling;
				}
				if (!c) {
					for (l = s.child; l;) {
						if (l === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (l === r) {
							c = !0, r = s, n = a;
							break;
						}
						l = l.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function m(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = m(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), A = Symbol.for("react.memo_cache_sentinel"), j = Symbol.iterator;
	function M(e) {
		return typeof e != "object" || !e ? null : (e = j && e[j] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ee = Symbol.for("react.client.reference");
	function N(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ee ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case T: return "Suspense";
			case E: return "SuspenseList";
			case k: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case D: return t = e.displayName || null, t === null ? N(e.type) || "Memo" : t;
			case O:
				t = e._payload, e = e._init;
				try {
					return N(e(t));
				} catch {}
		}
		return null;
	}
	var P = Array.isArray, F = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, R = [], te = -1;
	function z(e) {
		return { current: e };
	}
	function B(e) {
		0 > te || (e.current = R[te], R[te] = null, te--);
	}
	function V(e, t) {
		te++, R[te] = e.current, e.current = t;
	}
	var H = z(null), ne = z(null), U = z(null), re = z(null);
	function ie(e, t) {
		switch (V(U, t), V(ne, e), V(H, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		B(H), V(H, e);
	}
	function W() {
		B(H), B(ne), B(U);
	}
	function G(e) {
		e.memoizedState !== null && V(re, e);
		var t = H.current, n = Hd(t, e.type);
		t !== n && (V(ne, e), V(H, n));
	}
	function ae(e) {
		ne.current === e && (B(H), B(ne)), re.current === e && (B(re), Qf._currentValue = L);
	}
	var oe, se;
	function ce(e) {
		if (oe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			oe = t && t[1] || "", se = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + oe + e + se;
	}
	var le = !1;
	function ue(e, t) {
		if (!e || le) return "";
		le = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			le = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? ce(n) : "";
	}
	function de(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return ce(e.type);
			case 16: return ce("Lazy");
			case 13: return e.child !== t && t !== null ? ce("Suspense Fallback") : ce("Suspense");
			case 19: return ce("SuspenseList");
			case 0:
			case 15: return ue(e.type, !1);
			case 11: return ue(e.type.render, !1);
			case 1: return ue(e.type, !0);
			case 31: return ce("Activity");
			default: return "";
		}
	}
	function fe(e) {
		try {
			var t = "", n = null;
			do
				t += de(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var pe = Object.prototype.hasOwnProperty, me = t.unstable_scheduleCallback, he = t.unstable_cancelCallback, ge = t.unstable_shouldYield, _e = t.unstable_requestPaint, K = t.unstable_now, ve = t.unstable_getCurrentPriorityLevel, ye = t.unstable_ImmediatePriority, be = t.unstable_UserBlockingPriority, xe = t.unstable_NormalPriority, Se = t.unstable_LowPriority, Ce = t.unstable_IdlePriority, we = t.log, Te = t.unstable_setDisableYieldValue, Ee = null, q = null;
	function De(e) {
		if (typeof we == "function" && Te(e), q && typeof q.setStrictMode == "function") try {
			q.setStrictMode(Ee, e);
		} catch {}
	}
	var Oe = Math.clz32 ? Math.clz32 : je, ke = Math.log, Ae = Math.LN2;
	function je(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (ke(e) / Ae | 0) | 0;
	}
	var Me = 256, Ne = 262144, Pe = 4194304;
	function Fe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ie(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Fe(n))) : i = Fe(o) : i = Fe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Fe(n))) : i = Fe(o)) : i = Fe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Le(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Re(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function ze() {
		var e = Pe;
		return Pe <<= 1, !(Pe & 62914560) && (Pe = 4194304), e;
	}
	function Be(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ve(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function He(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Oe(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && Ue(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function Ue(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Oe(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function We(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Oe(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ge(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Ke(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Ke(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function qe(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Je() {
		var e = I.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function Ye(e, t) {
		var n = I.p;
		try {
			return I.p = e, t();
		} finally {
			I.p = n;
		}
	}
	var Xe = Math.random().toString(36).slice(2), Ze = "__reactFiber$" + Xe, Qe = "__reactProps$" + Xe, $e = "__reactContainer$" + Xe, et = "__reactEvents$" + Xe, tt = "__reactListeners$" + Xe, nt = "__reactHandles$" + Xe, rt = "__reactResources$" + Xe, it = "__reactMarker$" + Xe;
	function at(e) {
		delete e[Ze], delete e[Qe], delete e[et], delete e[tt], delete e[nt];
	}
	function ot(e) {
		var t = e[Ze];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[$e] || n[Ze]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[Ze]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function st(e) {
		if (e = e[Ze] || e[$e]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ct(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function lt(e) {
		var t = e[rt];
		return t ||= e[rt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function ut(e) {
		e[it] = !0;
	}
	var dt = /* @__PURE__ */ new Set(), ft = {};
	function pt(e, t) {
		mt(e, t), mt(e + "Capture", t);
	}
	function mt(e, t) {
		for (ft[e] = t, e = 0; e < t.length; e++) dt.add(t[e]);
	}
	var ht = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), gt = {}, _t = {};
	function vt(e) {
		return pe.call(_t, e) ? !0 : pe.call(gt, e) ? !1 : ht.test(e) ? _t[e] = !0 : (gt[e] = !0, !1);
	}
	function yt(e, t, n) {
		if (vt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function bt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function xt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function St(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Ct(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function wt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Tt(e) {
		if (!e._valueTracker) {
			var t = Ct(e) ? "checked" : "value";
			e._valueTracker = wt(e, t, "" + e[t]);
		}
	}
	function Et(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ct(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Dt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Ot = /[\n"\\]/g;
	function kt(e) {
		return e.replace(Ot, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function At(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Mt(e, o, St(n)) : Mt(e, o, St(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + St(s) : e.removeAttribute("name");
	}
	function jt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Tt(e);
				return;
			}
			n = n == null ? "" : "" + St(n), t = t == null ? n : "" + St(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Tt(e);
	}
	function Mt(e, t, n) {
		t === "number" && Dt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Nt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + St(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Pt(e, t, n) {
		if (t != null && (t = "" + St(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + St(n);
	}
	function Ft(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (P(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = St(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Tt(e);
	}
	function It(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Lt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Rt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Lt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function zt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Rt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Rt(e, o, t[o]);
	}
	function Bt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Vt = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Ht = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Ut(e) {
		return Ht.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Wt() {}
	var Gt = null;
	function Kt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var qt = null, Jt = null;
	function Yt(e) {
		var t = st(e);
		if (t && (e = t.stateNode)) {
			var n = e[Qe] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (At(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + kt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Qe] || null;
								if (!a) throw Error(i(90));
								At(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Et(r);
					}
					break a;
				case "textarea":
					Pt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Nt(e, !!n.multiple, t, !1);
			}
		}
	}
	var Xt = !1;
	function Zt(e, t, n) {
		if (Xt) return e(t, n);
		Xt = !0;
		try {
			return e(t);
		} finally {
			if (Xt = !1, (qt !== null || Jt !== null) && (vu(), qt && (t = qt, e = Jt, Jt = qt = null, Yt(t), e))) for (t = 0; t < e.length; t++) Yt(e[t]);
		}
	}
	function Qt(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Qe] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var $t = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), en = !1;
	if ($t) try {
		var tn = {};
		Object.defineProperty(tn, "passive", { get: function() {
			en = !0;
		} }), window.addEventListener("test", tn, tn), window.removeEventListener("test", tn, tn);
	} catch {
		en = !1;
	}
	var nn = null, rn = null, an = null;
	function on() {
		if (an) return an;
		var e, t = rn, n = t.length, r, i = "value" in nn ? nn.value : nn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return an = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function sn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function cn() {
		return !0;
	}
	function ln() {
		return !1;
	}
	function un(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? cn : ln, this.isPropagationStopped = ln, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = cn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = cn);
			},
			persist: function() {},
			isPersistent: cn
		}), t;
	}
	var dn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, fn = un(dn), pn = h({}, dn, {
		view: 0,
		detail: 0
	}), mn = un(pn), hn, gn, _n, vn = h({}, pn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: kn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== _n && (_n && e.type === "mousemove" ? (hn = e.screenX - _n.screenX, gn = e.screenY - _n.screenY) : gn = hn = 0, _n = e), hn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : gn;
		}
	}), yn = un(vn), bn = un(h({}, vn, { dataTransfer: 0 })), xn = un(h({}, pn, { relatedTarget: 0 })), Sn = un(h({}, dn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Cn = un(h({}, dn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), wn = un(h({}, dn, { data: 0 })), Tn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, En = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Dn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function On(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Dn[e]) ? !!t[e] : !1;
	}
	function kn() {
		return On;
	}
	var An = un(h({}, pn, {
		key: function(e) {
			if (e.key) {
				var t = Tn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = sn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? En[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: kn,
		charCode: function(e) {
			return e.type === "keypress" ? sn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? sn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), jn = un(h({}, vn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Mn = un(h({}, pn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: kn
	})), Nn = un(h({}, dn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Pn = un(h({}, vn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Fn = un(h({}, dn, {
		newState: 0,
		oldState: 0
	})), In = [
		9,
		13,
		27,
		32
	], Ln = $t && "CompositionEvent" in window, Rn = null;
	$t && "documentMode" in document && (Rn = document.documentMode);
	var zn = $t && "TextEvent" in window && !Rn, Bn = $t && (!Ln || Rn && 8 < Rn && 11 >= Rn), Vn = " ", Hn = !1;
	function Un(e, t) {
		switch (e) {
			case "keyup": return In.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Wn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Gn = !1;
	function Kn(e, t) {
		switch (e) {
			case "compositionend": return Wn(t);
			case "keypress": return t.which === 32 ? (Hn = !0, Vn) : null;
			case "textInput": return e = t.data, e === Vn && Hn ? null : e;
			default: return null;
		}
	}
	function qn(e, t) {
		if (Gn) return e === "compositionend" || !Ln && Un(e, t) ? (e = on(), an = rn = nn = null, Gn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Bn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Jn = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Yn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Jn[e.type] : t === "textarea";
	}
	function Xn(e, t, n, r) {
		qt ? Jt ? Jt.push(r) : Jt = [r] : qt = r, t = Td(t, "onChange"), 0 < t.length && (n = new fn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Zn = null, Qn = null;
	function $n(e) {
		vd(e, 0);
	}
	function er(e) {
		if (Et(ct(e))) return e;
	}
	function tr(e, t) {
		if (e === "change") return t;
	}
	var nr = !1;
	if ($t) {
		var rr;
		if ($t) {
			var ir = "oninput" in document;
			if (!ir) {
				var ar = document.createElement("div");
				ar.setAttribute("oninput", "return;"), ir = typeof ar.oninput == "function";
			}
			rr = ir;
		} else rr = !1;
		nr = rr && (!document.documentMode || 9 < document.documentMode);
	}
	function or() {
		Zn && (Zn.detachEvent("onpropertychange", sr), Qn = Zn = null);
	}
	function sr(e) {
		if (e.propertyName === "value" && er(Qn)) {
			var t = [];
			Xn(t, Qn, e, Kt(e)), Zt($n, t);
		}
	}
	function cr(e, t, n) {
		e === "focusin" ? (or(), Zn = t, Qn = n, Zn.attachEvent("onpropertychange", sr)) : e === "focusout" && or();
	}
	function lr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return er(Qn);
	}
	function ur(e, t) {
		if (e === "click") return er(t);
	}
	function dr(e, t) {
		if (e === "input" || e === "change") return er(t);
	}
	function fr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var pr = typeof Object.is == "function" ? Object.is : fr;
	function mr(e, t) {
		if (pr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!pe.call(t, i) || !pr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function hr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function gr(e, t) {
		var n = hr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = hr(n);
		}
	}
	function _r(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? _r(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function vr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Dt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Dt(e.document);
		}
		return t;
	}
	function yr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var br = $t && "documentMode" in document && 11 >= document.documentMode, xr = null, Sr = null, Cr = null, wr = !1;
	function Tr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		wr || xr == null || xr !== Dt(r) || (r = xr, "selectionStart" in r && yr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Cr && mr(Cr, r) || (Cr = r, r = Td(Sr, "onSelect"), 0 < r.length && (t = new fn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = xr)));
	}
	function Er(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Dr = {
		animationend: Er("Animation", "AnimationEnd"),
		animationiteration: Er("Animation", "AnimationIteration"),
		animationstart: Er("Animation", "AnimationStart"),
		transitionrun: Er("Transition", "TransitionRun"),
		transitionstart: Er("Transition", "TransitionStart"),
		transitioncancel: Er("Transition", "TransitionCancel"),
		transitionend: Er("Transition", "TransitionEnd")
	}, Or = {}, kr = {};
	$t && (kr = document.createElement("div").style, "AnimationEvent" in window || (delete Dr.animationend.animation, delete Dr.animationiteration.animation, delete Dr.animationstart.animation), "TransitionEvent" in window || delete Dr.transitionend.transition);
	function Ar(e) {
		if (Or[e]) return Or[e];
		if (!Dr[e]) return e;
		var t = Dr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in kr) return Or[e] = t[n];
		return e;
	}
	var jr = Ar("animationend"), Mr = Ar("animationiteration"), Nr = Ar("animationstart"), Pr = Ar("transitionrun"), Fr = Ar("transitionstart"), Ir = Ar("transitioncancel"), Lr = Ar("transitionend"), Rr = /* @__PURE__ */ new Map(), zr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	zr.push("scrollEnd");
	function Br(e, t) {
		Rr.set(e, t), pt(t, [e]);
	}
	var Vr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Hr = [], Ur = 0, Wr = 0;
	function Gr() {
		for (var e = Ur, t = Wr = Ur = 0; t < e;) {
			var n = Hr[t];
			Hr[t++] = null;
			var r = Hr[t];
			Hr[t++] = null;
			var i = Hr[t];
			Hr[t++] = null;
			var a = Hr[t];
			if (Hr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Yr(n, i, a);
		}
	}
	function Kr(e, t, n, r) {
		Hr[Ur++] = e, Hr[Ur++] = t, Hr[Ur++] = n, Hr[Ur++] = r, Wr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function qr(e, t, n, r) {
		return Kr(e, t, n, r), Xr(e);
	}
	function Jr(e, t) {
		return Kr(e, null, null, t), Xr(e);
	}
	function Yr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Oe(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Xr(e) {
		if (50 < lu) throw lu = 0, uu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Zr = {};
	function Qr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function $r(e, t, n, r) {
		return new Qr(e, t, n, r);
	}
	function ei(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ti(e, t) {
		var n = e.alternate;
		return n === null ? (n = $r(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ni(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ri(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ei(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, H.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case k: return e = $r(31, n, t, a), e.elementType = k, e.lanes = o, e;
			case y: return ii(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = $r(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = $r(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = $r(19, n, t, a), e.elementType = E, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case D:
						s = 14;
						break a;
					case O:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = $r(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ii(e, t, n, r) {
		return e = $r(7, e, r, t), e.lanes = n, e;
	}
	function ai(e, t, n) {
		return e = $r(6, e, null, t), e.lanes = n, e;
	}
	function oi(e) {
		var t = $r(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function si(e, t, n) {
		return t = $r(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ci = /* @__PURE__ */ new WeakMap();
	function li(e, t) {
		if (typeof e == "object" && e) {
			var n = ci.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: fe(t)
			}, ci.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: fe(t)
		};
	}
	var ui = [], di = 0, fi = null, pi = 0, mi = [], hi = 0, gi = null, _i = 1, vi = "";
	function yi(e, t) {
		ui[di++] = pi, ui[di++] = fi, fi = e, pi = t;
	}
	function bi(e, t, n) {
		mi[hi++] = _i, mi[hi++] = vi, mi[hi++] = gi, gi = e;
		var r = _i;
		e = vi;
		var i = 32 - Oe(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Oe(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, _i = 1 << 32 - Oe(t) + i | n << i | r, vi = a + e;
		} else _i = 1 << a | n << i | r, vi = e;
	}
	function xi(e) {
		e.return !== null && (yi(e, 1), bi(e, 1, 0));
	}
	function Si(e) {
		for (; e === fi;) fi = ui[--di], ui[di] = null, pi = ui[--di], ui[di] = null;
		for (; e === gi;) gi = mi[--hi], mi[hi] = null, vi = mi[--hi], mi[hi] = null, _i = mi[--hi], mi[hi] = null;
	}
	function Ci(e, t) {
		mi[hi++] = _i, mi[hi++] = vi, mi[hi++] = gi, _i = t.id, vi = t.overflow, gi = e;
	}
	var wi = null, Ti = null, J = !1, Ei = null, Di = !1, Oi = Error(i(519));
	function ki(e) {
		throw Fi(li(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Oi;
	}
	function Ai(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Ze] = e, t[Qe] = r, n) {
			case "dialog":
				$("cancel", t), $("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				$("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < gd.length; n++) $(gd[n], t);
				break;
			case "source":
				$("error", t);
				break;
			case "img":
			case "image":
			case "link":
				$("error", t), $("load", t);
				break;
			case "details":
				$("toggle", t);
				break;
			case "input":
				$("invalid", t), jt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), Ft(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = Wt), t = !0) : t = !1, t || ki(e, !0);
	}
	function ji(e) {
		for (wi = e.return; wi;) switch (wi.tag) {
			case 5:
			case 31:
			case 13:
				Di = !1;
				return;
			case 27:
			case 3:
				Di = !0;
				return;
			default: wi = wi.return;
		}
	}
	function Mi(e) {
		if (e !== wi) return !1;
		if (!J) return ji(e), J = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && Ti && ki(e), ji(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ti = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ti = uf(e);
		} else t === 27 ? (t = Ti, Zd(e.type) ? (e = lf, lf = null, Ti = e) : Ti = t) : Ti = wi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ni() {
		Ti = wi = null, J = !1;
	}
	function Pi() {
		var e = Ei;
		return e !== null && (Yl === null ? Yl = e : Yl.push.apply(Yl, e), Ei = null), e;
	}
	function Fi(e) {
		Ei === null ? Ei = [e] : Ei.push(e);
	}
	var Ii = z(null), Li = null, Ri = null;
	function zi(e, t, n) {
		V(Ii, t._currentValue), t._currentValue = n;
	}
	function Bi(e) {
		e._currentValue = Ii.current, B(Ii);
	}
	function Vi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Hi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Vi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Vi(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Ui(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					pr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === re.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Hi(t, e, n, r), t.flags |= 262144;
	}
	function Wi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!pr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Gi(e) {
		Li = e, Ri = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Ki(e) {
		return Ji(Li, e);
	}
	function qi(e, t) {
		return Li === null && Gi(e), Ji(e, t);
	}
	function Ji(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Ri === null) {
			if (e === null) throw Error(i(308));
			Ri = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Ri = Ri.next = t;
		return n;
	}
	var Yi = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Xi = t.unstable_scheduleCallback, Zi = t.unstable_NormalPriority, Qi = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function $i() {
		return {
			controller: new Yi(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ea(e) {
		e.refCount--, e.refCount === 0 && Xi(Zi, function() {
			e.controller.abort();
		});
	}
	var ta = null, na = 0, ra = 0, ia = null;
	function aa(e, t) {
		if (ta === null) {
			var n = ta = [];
			na = 0, ra = ud(), ia = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return na++, t.then(oa, oa), t;
	}
	function oa() {
		if (--na === 0 && ta !== null) {
			ia !== null && (ia.status = "fulfilled");
			var e = ta;
			ta = null, ra = 0, ia = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function sa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ca = F.S;
	F.S = function(e, t) {
		Ql = K(), typeof t == "object" && t && typeof t.then == "function" && aa(e, t), ca !== null && ca(e, t);
	};
	var la = z(null);
	function ua() {
		var e = la.current;
		return e === null ? Fl.pooledCache : e;
	}
	function da(e, t) {
		t === null ? V(la, la.current) : V(la, t.pool);
	}
	function fa() {
		var e = ua();
		return e === null ? null : {
			parent: Qi._currentValue,
			pool: e
		};
	}
	var pa = Error(i(460)), ma = Error(i(474)), ha = Error(i(542)), ga = { then: function() {} };
	function _a(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function va(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Wt, Wt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Sa(e), e;
			default:
				if (typeof t.status == "string") t.then(Wt, Wt);
				else {
					if (e = Fl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Sa(e), e;
				}
				throw ba = t, pa;
		}
	}
	function ya(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ba = e, pa) : e;
		}
	}
	var ba = null;
	function xa() {
		if (ba === null) throw Error(i(459));
		var e = ba;
		return ba = null, e;
	}
	function Sa(e) {
		if (e === pa || e === ha) throw Error(i(483));
	}
	var Ca = null, wa = 0;
	function Ta(e) {
		var t = wa;
		return wa += 1, Ca === null && (Ca = []), va(Ca, e, t);
	}
	function Ea(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Da(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Oa(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = ti(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ai(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === O && ya(i) === t.type) ? (t = a(t, n.props), Ea(t, n), t.return = e, t) : (t = ri(n.type, n.key, n.props, null, e.mode, r), Ea(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = si(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ii(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ai("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = ri(t.type, t.key, t.props, null, e.mode, n), Ea(n, t), n.return = e, n;
					case v: return t = si(t, e.mode, n), t.return = e, t;
					case O: return t = ya(t), f(e, t, n);
				}
				if (P(t) || M(t)) return t = ii(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ta(t), n);
				if (t.$$typeof === C) return f(e, qi(e, t), n);
				Da(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case O: return n = ya(n), p(e, t, n, r);
				}
				if (P(n) || M(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ta(n), r);
				if (n.$$typeof === C) return p(e, t, qi(e, n), r);
				Da(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case O: return r = ya(r), m(e, t, n, r, i);
				}
				if (P(r) || M(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ta(r), i);
				if (r.$$typeof === C) return m(e, t, n, qi(t, r), i);
				Da(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), J && yi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return J && yi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), J && yi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), J && yi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return J && yi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), J && yi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === O && ya(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ea(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = ii(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ri(o.type, o.key, o.props, null, e.mode, c), Ea(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = si(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case O: return o = ya(o), b(e, r, o, c);
				}
				if (P(o)) return h(e, r, o, c);
				if (M(o)) {
					if (l = M(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ta(o), c);
				if (o.$$typeof === C) return b(e, r, qi(e, o), c);
				Da(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ai(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				wa = 0;
				var i = b(e, t, n, r);
				return Ca = null, i;
			} catch (t) {
				if (t === pa || t === ha) throw t;
				var a = $r(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ka = Oa(!0), Aa = Oa(!1), ja = !1;
	function Ma(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Na(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Pa(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Fa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, X & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Xr(e), Yr(e, null, n), t;
		}
		return Kr(e, r, t, n), Xr(e);
	}
	function Ia(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
		}
	}
	function La(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ra = !1;
	function za() {
		if (Ra) {
			var e = ia;
			if (e !== null) throw e;
		}
	}
	function Ba(e, t, n, r) {
		Ra = !1;
		var i = e.updateQueue;
		ja = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Q & f) === f : (r & f) === f) {
					f !== 0 && f === ra && (Ra = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: ja = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Ul |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Va(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ha(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Va(n[e], t);
	}
	var Ua = z(null), Wa = z(0);
	function Ga(e, t) {
		e = Vl, V(Wa, e), V(Ua, t), Vl = e | t.baseLanes;
	}
	function Ka() {
		V(Wa, Vl), V(Ua, Ua.current);
	}
	function qa() {
		Vl = Wa.current, B(Ua), B(Wa);
	}
	var Ja = z(null), Ya = null;
	function Xa(e) {
		var t = e.alternate;
		V(to, to.current & 1), V(Ja, e), Ya === null && (t === null || Ua.current !== null || t.memoizedState !== null) && (Ya = e);
	}
	function Za(e) {
		V(to, to.current), V(Ja, e), Ya === null && (Ya = e);
	}
	function Qa(e) {
		e.tag === 22 ? (V(to, to.current), V(Ja, e), Ya === null && (Ya = e)) : $a(e);
	}
	function $a() {
		V(to, to.current), V(Ja, Ja.current);
	}
	function eo(e) {
		B(Ja), Ya === e && (Ya = null), B(to);
	}
	var to = z(0);
	function no(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var ro = 0, Y = null, io = null, ao = null, oo = !1, so = !1, co = !1, lo = 0, uo = 0, fo = null, po = 0;
	function mo() {
		throw Error(i(321));
	}
	function ho(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!pr(e[n], t[n])) return !1;
		return !0;
	}
	function go(e, t, n, r, i, a) {
		return ro = a, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, F.H = e === null || e.memoizedState === null ? Ns : Ps, co = !1, a = n(r, i), co = !1, so && (a = vo(t, n, r, i)), _o(e), a;
	}
	function _o(e) {
		F.H = Ms;
		var t = io !== null && io.next !== null;
		if (ro = 0, ao = io = Y = null, oo = !1, uo = 0, fo = null, t) throw Error(i(300));
		e === null || Zs || (e = e.dependencies, e !== null && Wi(e) && (Zs = !0));
	}
	function vo(e, t, n, r) {
		Y = e;
		var a = 0;
		do {
			if (so && (fo = null), uo = 0, so = !1, 25 <= a) throw Error(i(301));
			if (a += 1, ao = io = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			F.H = Fs, o = t(n, r);
		} while (so);
		return o;
	}
	function yo() {
		var e = F.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Eo(t) : t, e = e.useState()[0], (io === null ? null : io.memoizedState) !== e && (Y.flags |= 1024), t;
	}
	function bo() {
		var e = lo !== 0;
		return lo = 0, e;
	}
	function xo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function So(e) {
		if (oo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			oo = !1;
		}
		ro = 0, ao = io = Y = null, so = !1, uo = lo = 0, fo = null;
	}
	function Co() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return ao === null ? Y.memoizedState = ao = e : ao = ao.next = e, ao;
	}
	function wo() {
		if (io === null) {
			var e = Y.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = io.next;
		var t = ao === null ? Y.memoizedState : ao.next;
		if (t !== null) ao = t, io = e;
		else {
			if (e === null) throw Y.alternate === null ? Error(i(467)) : Error(i(310));
			io = e, e = {
				memoizedState: io.memoizedState,
				baseState: io.baseState,
				baseQueue: io.baseQueue,
				queue: io.queue,
				next: null
			}, ao === null ? Y.memoizedState = ao = e : ao = ao.next = e;
		}
		return ao;
	}
	function To() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Eo(e) {
		var t = uo;
		return uo += 1, fo === null && (fo = []), e = va(fo, e, t), t = Y, (ao === null ? t.memoizedState : ao.next) === null && (t = t.alternate, F.H = t === null || t.memoizedState === null ? Ns : Ps), e;
	}
	function Do(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Eo(e);
			if (e.$$typeof === C) return Ki(e);
		}
		throw Error(i(438, String(e)));
	}
	function Oo(e) {
		var t = null, n = Y.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Y.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = To(), Y.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function ko(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ao(e) {
		return jo(wo(), io, e);
	}
	function jo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (ro & f) === f : (Q & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ra && (d = !0);
					else if ((ro & p) === p) {
						u = u.next, p === ra && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Y.lanes |= p, Ul |= p;
					f = u.action, co && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Y.lanes |= f, Ul |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !pr(o, e.memoizedState) && (Zs = !0, d && (n = ia, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Mo(e) {
		var t = wo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			pr(o, t.memoizedState) || (Zs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function No(e, t, n) {
		var r = Y, a = wo(), o = J;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !pr((io || a).memoizedState, n);
		if (s && (a.memoizedState = n, Zs = !0), a = a.queue, is(Io.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || ao !== null && ao.memoizedState.tag & 1) {
			if (r.flags |= 2048, $o(9, { destroy: void 0 }, Fo.bind(null, r, a, n, t), null), Fl === null) throw Error(i(349));
			o || ro & 127 || Po(r, t, n);
		}
		return n;
	}
	function Po(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Y.updateQueue, t === null ? (t = To(), Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Fo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Lo(t) && Ro(e);
	}
	function Io(e, t, n) {
		return n(function() {
			Lo(t) && Ro(e);
		});
	}
	function Lo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !pr(e, n);
		} catch {
			return !0;
		}
	}
	function Ro(e) {
		var t = Jr(e, 2);
		t !== null && pu(t, e, 2);
	}
	function zo(e) {
		var t = Co();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), co) {
				De(!0);
				try {
					n();
				} finally {
					De(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ko,
			lastRenderedState: e
		}, t;
	}
	function Bo(e, t, n, r) {
		return e.baseState = n, jo(e, io, typeof r == "function" ? r : ko);
	}
	function Vo(e, t, n, r, a) {
		if (ks(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			F.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ho(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ho(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = F.T, o = {};
			F.T = o;
			try {
				var s = n(i, r), c = F.S;
				c !== null && c(o, s), Uo(e, t, s);
			} catch (n) {
				Go(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), F.T = a;
			}
		} else try {
			a = n(i, r), Uo(e, t, a);
		} catch (n) {
			Go(e, t, n);
		}
	}
	function Uo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Wo(e, t, n);
		}, function(n) {
			return Go(e, t, n);
		}) : Wo(e, t, n);
	}
	function Wo(e, t, n) {
		t.status = "fulfilled", t.value = n, Ko(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ho(e, n)));
	}
	function Go(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ko(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ko(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function qo(e, t) {
		return t;
	}
	function Jo(e, t) {
		if (J) {
			var n = Fl.formState;
			if (n !== null) {
				a: {
					var r = Y;
					if (J) {
						if (Ti) {
							b: {
								for (var i = Ti, a = Di; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Ti = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ki(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Co(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: qo,
			lastRenderedState: t
		}, n.queue = r, n = Es.bind(null, Y, r), r.dispatch = n, r = zo(!1), a = Os.bind(null, Y, !1, r.queue), r = Co(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Vo.bind(null, Y, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Yo(e) {
		return Xo(wo(), io, e);
	}
	function Xo(e, t, n) {
		if (t = jo(e, t, qo)[0], e = Ao(ko)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Eo(t);
		} catch (e) {
			throw e === pa ? ha : e;
		}
		else r = t;
		t = wo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Y.flags |= 2048, $o(9, { destroy: void 0 }, Zo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Zo(e, t) {
		e.action = t;
	}
	function Qo(e) {
		var t = wo(), n = io;
		if (n !== null) return Xo(t, n, e);
		wo(), t = t.memoizedState, n = wo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function $o(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = Y.updateQueue, t === null && (t = To(), Y.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function es() {
		return wo().memoizedState;
	}
	function ts(e, t, n, r) {
		var i = Co();
		Y.flags |= e, i.memoizedState = $o(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ns(e, t, n, r) {
		var i = wo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		io !== null && r !== null && ho(r, io.memoizedState.deps) ? i.memoizedState = $o(t, a, n, r) : (Y.flags |= e, i.memoizedState = $o(1 | t, a, n, r));
	}
	function rs(e, t) {
		ts(8390656, 8, e, t);
	}
	function is(e, t) {
		ns(2048, 8, e, t);
	}
	function as(e) {
		Y.flags |= 4;
		var t = Y.updateQueue;
		if (t === null) t = To(), Y.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function os(e) {
		var t = wo().memoizedState;
		return as({
			ref: t,
			nextImpl: e
		}), function() {
			if (X & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ss(e, t) {
		return ns(4, 2, e, t);
	}
	function cs(e, t) {
		return ns(4, 4, e, t);
	}
	function ls(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function us(e, t, n) {
		n = n == null ? null : n.concat([e]), ns(4, 4, ls.bind(null, t, e), n);
	}
	function ds() {}
	function fs(e, t) {
		var n = wo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && ho(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ps(e, t) {
		var n = wo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && ho(t, r[1])) return r[0];
		if (r = e(), co) {
			De(!0);
			try {
				e();
			} finally {
				De(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ms(e, t, n) {
		return n === void 0 || ro & 1073741824 && !(Q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = fu(), Y.lanes |= e, Ul |= e, n);
	}
	function hs(e, t, n, r) {
		return pr(n, t) ? n : Ua.current === null ? !(ro & 42) || ro & 1073741824 && !(Q & 261930) ? (Zs = !0, e.memoizedState = n) : (e = fu(), Y.lanes |= e, Ul |= e, t) : (e = ms(e, n, r), pr(e, t) || (Zs = !0), e);
	}
	function gs(e, t, n, r, i) {
		var a = I.p;
		I.p = a !== 0 && 8 > a ? a : 8;
		var o = F.T, s = {};
		F.T = s, Os(e, !1, t, n);
		try {
			var c = i(), l = F.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ds(e, t, sa(c, r), du(e)) : Ds(e, t, r, du(e));
		} catch (n) {
			Ds(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, du());
		} finally {
			I.p = a, o !== null && s.types !== null && (o.types = s.types), F.T = o;
		}
	}
	function _s() {}
	function vs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = ys(e).queue;
		gs(e, a, t, L, n === null ? _s : function() {
			return bs(e), n(r);
		});
	}
	function ys(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: L,
			baseState: L,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ko,
				lastRenderedState: L
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ko,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function bs(e) {
		var t = ys(e);
		t.next === null && (t = e.alternate.memoizedState), Ds(e, t.next.queue, {}, du());
	}
	function xs() {
		return Ki(Qf);
	}
	function Ss() {
		return wo().memoizedState;
	}
	function Cs() {
		return wo().memoizedState;
	}
	function ws(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = du();
					e = Pa(n);
					var r = Fa(t, e, n);
					r !== null && (pu(r, t, n), Ia(r, t, n)), t = { cache: $i() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ts(e, t, n) {
		var r = du();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ks(e) ? As(t, n) : (n = qr(e, t, n, r), n !== null && (pu(n, e, r), js(n, t, r)));
	}
	function Es(e, t, n) {
		Ds(e, t, n, du());
	}
	function Ds(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ks(e)) As(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, pr(s, o)) return Kr(e, t, i, 0), Fl === null && Gr(), !1;
			} catch {}
			if (n = qr(e, t, i, r), n !== null) return pu(n, e, r), js(n, t, r), !0;
		}
		return !1;
	}
	function Os(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ks(e)) {
			if (t) throw Error(i(479));
		} else t = qr(e, n, r, 2), t !== null && pu(t, e, 2);
	}
	function ks(e) {
		var t = e.alternate;
		return e === Y || t !== null && t === Y;
	}
	function As(e, t) {
		so = oo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function js(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
		}
	}
	var Ms = {
		readContext: Ki,
		use: Do,
		useCallback: mo,
		useContext: mo,
		useEffect: mo,
		useImperativeHandle: mo,
		useLayoutEffect: mo,
		useInsertionEffect: mo,
		useMemo: mo,
		useReducer: mo,
		useRef: mo,
		useState: mo,
		useDebugValue: mo,
		useDeferredValue: mo,
		useTransition: mo,
		useSyncExternalStore: mo,
		useId: mo,
		useHostTransitionStatus: mo,
		useFormState: mo,
		useActionState: mo,
		useOptimistic: mo,
		useMemoCache: mo,
		useCacheRefresh: mo
	};
	Ms.useEffectEvent = mo;
	var Ns = {
		readContext: Ki,
		use: Do,
		useCallback: function(e, t) {
			return Co().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ki,
		useEffect: rs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ts(4194308, 4, ls.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ts(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ts(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Co();
			t = t === void 0 ? null : t;
			var r = e();
			if (co) {
				De(!0);
				try {
					e();
				} finally {
					De(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Co();
			if (n !== void 0) {
				var i = n(t);
				if (co) {
					De(!0);
					try {
						n(t);
					} finally {
						De(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ts.bind(null, Y, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Co();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = zo(e);
			var t = e.queue, n = Es.bind(null, Y, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			return ms(Co(), e, t);
		},
		useTransition: function() {
			var e = zo(!1);
			return e = gs.bind(null, Y, e.queue, !0, !1), Co().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Y, a = Co();
			if (J) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Fl === null) throw Error(i(349));
				Q & 127 || Po(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, rs(Io.bind(null, r, o, e), [e]), r.flags |= 2048, $o(9, { destroy: void 0 }, Fo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Co(), t = Fl.identifierPrefix;
			if (J) {
				var n = vi, r = _i;
				n = (r & ~(1 << 32 - Oe(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = lo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = po++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: xs,
		useFormState: Jo,
		useActionState: Jo,
		useOptimistic: function(e) {
			var t = Co();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Os.bind(null, Y, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Oo,
		useCacheRefresh: function() {
			return Co().memoizedState = ws.bind(null, Y);
		},
		useEffectEvent: function(e) {
			var t = Co(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (X & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ps = {
		readContext: Ki,
		use: Do,
		useCallback: fs,
		useContext: Ki,
		useEffect: is,
		useImperativeHandle: us,
		useInsertionEffect: ss,
		useLayoutEffect: cs,
		useMemo: ps,
		useReducer: Ao,
		useRef: es,
		useState: function() {
			return Ao(ko);
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			return hs(wo(), io.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ao(ko)[0], t = wo().memoizedState;
			return [typeof e == "boolean" ? e : Eo(e), t];
		},
		useSyncExternalStore: No,
		useId: Ss,
		useHostTransitionStatus: xs,
		useFormState: Yo,
		useActionState: Yo,
		useOptimistic: function(e, t) {
			return Bo(wo(), io, e, t);
		},
		useMemoCache: Oo,
		useCacheRefresh: Cs
	};
	Ps.useEffectEvent = os;
	var Fs = {
		readContext: Ki,
		use: Do,
		useCallback: fs,
		useContext: Ki,
		useEffect: is,
		useImperativeHandle: us,
		useInsertionEffect: ss,
		useLayoutEffect: cs,
		useMemo: ps,
		useReducer: Mo,
		useRef: es,
		useState: function() {
			return Mo(ko);
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			var n = wo();
			return io === null ? ms(n, e, t) : hs(n, io.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Mo(ko)[0], t = wo().memoizedState;
			return [typeof e == "boolean" ? e : Eo(e), t];
		},
		useSyncExternalStore: No,
		useId: Ss,
		useHostTransitionStatus: xs,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e, t) {
			var n = wo();
			return io === null ? (n.baseState = e, [e, n.queue.dispatch]) : Bo(n, io, e, t);
		},
		useMemoCache: Oo,
		useCacheRefresh: Cs
	};
	Fs.useEffectEvent = os;
	function Is(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ls = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Pa(r);
			i.payload = t, n != null && (i.callback = n), t = Fa(e, i, r), t !== null && (pu(t, e, r), Ia(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Pa(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Fa(e, i, r), t !== null && (pu(t, e, r), Ia(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = du(), r = Pa(n);
			r.tag = 2, t != null && (r.callback = t), t = Fa(e, r, n), t !== null && (pu(t, e, n), Ia(t, e, n));
		}
	};
	function Rs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !mr(n, r) || !mr(i, a) : !0;
	}
	function zs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ls.enqueueReplaceState(t, t.state, null);
	}
	function Bs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Vs(e) {
		Vr(e);
	}
	function Hs(e) {
		console.error(e);
	}
	function Us(e) {
		Vr(e);
	}
	function Ws(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Gs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ks(e, t, n) {
		return n = Pa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Ws(e, t);
		}, n;
	}
	function qs(e) {
		return e = Pa(e), e.tag = 3, e;
	}
	function Js(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Gs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Gs(t, n, r), typeof i != "function" && (tu === null ? tu = new Set([this]) : tu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Ys(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Ui(t, n, a, !0), n = Ja.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Ya === null ? Tu() : n.alternate === null && Hl === 0 && (Hl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ga ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ga ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Tu(), !1;
		}
		if (J) return t = Ja.current, t === null ? (r !== Oi && (t = Error(i(423), { cause: r }), Fi(li(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = li(r, n), a = Ks(e.stateNode, r, a), La(e, a), Hl !== 4 && (Hl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Oi && (e = Error(i(422), { cause: r }), Fi(li(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = li(o, n), Jl === null ? Jl = [o] : Jl.push(o), Hl !== 4 && (Hl = 2), t === null) return !0;
		r = li(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ks(n.stateNode, r, e), La(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (tu === null || !tu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = qs(a), Js(a, e, n, r), La(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Xs = Error(i(461)), Zs = !1;
	function Qs(e, t, n, r) {
		t.child = e === null ? Aa(t, null, n, r) : ka(t, e.child, n, r);
	}
	function $s(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Gi(t), r = go(e, t, n, o, a, i), s = bo(), e !== null && !Zs ? (xo(e, t, i), Cc(e, t, i)) : (J && s && xi(t), t.flags |= 1, Qs(e, t, r, i), t.child);
	}
	function ec(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ei(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, tc(e, t, a, r, i)) : (e = ri(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !wc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? mr : n, n(o, r) && e.ref === t.ref) return Cc(e, t, i);
		}
		return t.flags |= 1, e = ti(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function tc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (mr(a, r) && e.ref === t.ref) if (Zs = !1, t.pendingProps = r = a, wc(e, i)) e.flags & 131072 && (Zs = !0);
			else return t.lanes = e.lanes, Cc(e, t, i);
		}
		return lc(e, t, n, r, i);
	}
	function nc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return ic(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && da(t, a === null ? null : a.cachePool), a === null ? Ka() : Ga(t, a), Qa(t);
			else return r = t.lanes = 536870912, ic(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && da(t, null), Ka(), $a(t)) : (da(t, a.cachePool), Ga(t, a), $a(t), t.memoizedState = null);
		return Qs(e, t, i, n), t.child;
	}
	function rc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function ic(e, t, n, r, i) {
		var a = ua();
		return a = a === null ? null : {
			parent: Qi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && da(t, null), Ka(), Qa(t), e !== null && Ui(e, t, r, !0), t.childLanes = i, null;
	}
	function ac(e, t) {
		return t = vc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function oc(e, t, n) {
		return ka(t, e.child, null, n), e = ac(t, t.pendingProps), e.flags |= 2, eo(t), t.memoizedState = null, e;
	}
	function sc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (J) {
				if (r.mode === "hidden") return e = ac(t, r), t.lanes = 536870912, rc(null, e);
				if (Za(t), (e = Ti) ? (e = rf(e, Di), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: gi === null ? null : {
						id: _i,
						overflow: vi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = oi(e), n.return = t, t.child = n, wi = t, Ti = null)) : e = null, e === null) throw ki(t);
				return t.lanes = 536870912, null;
			}
			return ac(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Za(t), a) if (t.flags & 256) t.flags &= -257, t = oc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (Zs || Ui(e, t, n, !1), a = (n & e.childLanes) !== 0, Zs || a) {
				if (r = Fl, r !== null && (s = Ge(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Jr(e, s), pu(r, e, s), Xs;
				Tu(), t = oc(e, t, n);
			} else e = o.treeContext, Ti = cf(s.nextSibling), wi = t, J = !0, Ei = null, Di = !1, e !== null && Ci(t, e), t = ac(t, r), t.flags |= 4096;
			return t;
		}
		return e = ti(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function cc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function lc(e, t, n, r, i) {
		return Gi(t), n = go(e, t, n, r, void 0, i), r = bo(), e !== null && !Zs ? (xo(e, t, i), Cc(e, t, i)) : (J && r && xi(t), t.flags |= 1, Qs(e, t, n, i), t.child);
	}
	function uc(e, t, n, r, i, a) {
		return Gi(t), t.updateQueue = null, n = vo(t, r, n, i), _o(e), r = bo(), e !== null && !Zs ? (xo(e, t, a), Cc(e, t, a)) : (J && r && xi(t), t.flags |= 1, Qs(e, t, n, a), t.child);
	}
	function dc(e, t, n, r, i) {
		if (Gi(t), t.stateNode === null) {
			var a = Zr, o = n.contextType;
			typeof o == "object" && o && (a = Ki(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ls, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ma(t), o = n.contextType, a.context = typeof o == "object" && o ? Ki(o) : Zr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Is(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ls.enqueueReplaceState(a, a.state, null), Ba(t, r, a, i), za(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Bs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Zr, typeof u == "object" && u && (o = Ki(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && zs(t, a, r, o), ja = !1;
			var f = t.memoizedState;
			a.state = f, Ba(t, r, a, i), za(), l = t.memoizedState, s || f !== l || ja ? (typeof d == "function" && (Is(t, n, d, r), l = t.memoizedState), (c = ja || Rs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Na(e, t), o = t.memoizedProps, u = Bs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Zr, typeof l == "object" && l && (c = Ki(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && zs(t, a, r, c), ja = !1, f = t.memoizedState, a.state = f, Ba(t, r, a, i), za();
			var p = t.memoizedState;
			o !== d || f !== p || ja || e !== null && e.dependencies !== null && Wi(e.dependencies) ? (typeof s == "function" && (Is(t, n, s, r), p = t.memoizedState), (u = ja || Rs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Wi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, cc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ka(t, e.child, null, i), t.child = ka(t, null, n, i)) : Qs(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Cc(e, t, i), e;
	}
	function fc(e, t, n, r) {
		return Ni(), t.flags |= 256, Qs(e, t, n, r), t.child;
	}
	var pc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function mc(e) {
		return {
			baseLanes: e,
			cachePool: fa()
		};
	}
	function hc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Kl), e;
	}
	function gc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (to.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (J) {
				if (a ? Xa(t) : $a(t), (e = Ti) ? (e = rf(e, Di), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: gi === null ? null : {
						id: _i,
						overflow: vi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = oi(e), n.return = t, t.child = n, wi = t, Ti = null)) : e = null, e === null) throw ki(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? ($a(t), a = t.mode, c = vc({
				mode: "hidden",
				children: c
			}, a), r = ii(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = mc(n), r.childLanes = hc(e, s, n), t.memoizedState = pc, rc(null, r)) : (Xa(t), _c(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Xa(t), t.flags &= -257, t = yc(e, t, n)) : t.memoizedState === null ? ($a(t), c = r.fallback, a = t.mode, r = vc({
				mode: "visible",
				children: r.children
			}, a), c = ii(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, ka(t, e.child, null, n), r = t.child, r.memoizedState = mc(n), r.childLanes = hc(e, s, n), t.memoizedState = pc, t = rc(null, r)) : ($a(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Xa(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Fi({
					value: r,
					source: null,
					stack: null
				}), t = yc(e, t, n);
			} else if (Zs || Ui(e, t, n, !1), s = (n & e.childLanes) !== 0, Zs || s) {
				if (s = Fl, s !== null && (r = Ge(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Jr(e, r), pu(s, e, r), Xs;
				af(c) || Tu(), t = yc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Ti = cf(c.nextSibling), wi = t, J = !0, Ei = null, Di = !1, e !== null && Ci(t, e), t = _c(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? ($a(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ti(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ii(c, a, n, null), c.flags |= 2) : c = ti(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, rc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = mc(n) : (a = c.cachePool, a === null ? a = fa() : (l = Qi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = hc(e, s, n), t.memoizedState = pc, rc(e.child, r)) : (Xa(t), n = e.child, e = n.sibling, n = ti(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function _c(e, t) {
		return t = vc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function vc(e, t) {
		return e = $r(22, e, null, t), e.lanes = 0, e;
	}
	function yc(e, t, n) {
		return ka(t, e.child, null, n), e = _c(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function bc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Vi(e.return, t, n);
	}
	function xc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Sc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = to.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, V(to, o), Qs(e, t, r, n), r = J ? pi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && bc(e, n, t);
			else if (e.tag === 19) bc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && no(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), xc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && no(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				xc(t, !0, n, null, a, r);
				break;
			case "together":
				xc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Cc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Ul |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Ui(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ti(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ti(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function wc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Wi(e))) : !0;
	}
	function Tc(e, t, n) {
		switch (t.tag) {
			case 3:
				ie(t, t.stateNode.containerInfo), zi(t, Qi, e.memoizedState.cache), Ni();
				break;
			case 27:
			case 5:
				G(t);
				break;
			case 4:
				ie(t, t.stateNode.containerInfo);
				break;
			case 10:
				zi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Za(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Xa(t), e = Cc(e, t, n), e === null ? null : e.sibling) : gc(e, t, n) : (Xa(t), t.flags |= 128, null);
				Xa(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Ui(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Sc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), V(to, to.current), r) break;
				return null;
			case 22: return t.lanes = 0, nc(e, t, n, t.pendingProps);
			case 24: zi(t, Qi, e.memoizedState.cache);
		}
		return Cc(e, t, n);
	}
	function Ec(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) Zs = !0;
		else {
			if (!wc(e, n) && !(t.flags & 128)) return Zs = !1, Tc(e, t, n);
			Zs = !!(e.flags & 131072);
		}
		else Zs = !1, J && t.flags & 1048576 && bi(t, pi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ya(t.elementType), t.type = e, typeof e == "function") ei(e) ? (r = Bs(e, r), t.tag = 1, t = dc(null, t, e, r, n)) : (t.tag = 0, t = lc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = $s(null, t, e, r, n);
								break a;
							} else if (a === D) {
								t.tag = 14, t = ec(null, t, e, r, n);
								break a;
							}
						}
						throw t = N(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return lc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Bs(r, t.pendingProps), dc(e, t, r, a, n);
			case 3:
				a: {
					if (ie(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Na(e, t), Ba(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, zi(t, Qi, r), r !== o.cache && Hi(t, [Qi], n, !0), za(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = fc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = li(Error(i(424)), t), Fi(a), t = fc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ti = cf(e.firstChild), wi = t, J = !0, Ei = null, Di = !0, n = Aa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ni(), r === a) {
							t = Cc(e, t, n);
							break a;
						}
						Qs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return cc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : J || (n = t.type, e = t.pendingProps, r = Bd(U.current).createElement(n), r[Ze] = t, r[Qe] = e, Pd(r, n, e), ut(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return G(t), e === null && J && (r = t.stateNode = ff(t.type, t.pendingProps, U.current), wi = t, Di = !0, a = Ti, Zd(t.type) ? (lf = a, Ti = cf(r.firstChild)) : Ti = a), Qs(e, t, t.pendingProps.children, n), cc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && J && ((a = r = Ti) && (r = tf(r, t.type, t.pendingProps, Di), r === null ? a = !1 : (t.stateNode = r, wi = t, Ti = cf(r.firstChild), Di = !1, a = !0)), a || ki(t)), G(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = go(e, t, yo, null, null, n), Qf._currentValue = a), cc(e, t), Qs(e, t, r, n), t.child;
			case 6: return e === null && J && ((e = n = Ti) && (n = nf(n, t.pendingProps, Di), n === null ? e = !1 : (t.stateNode = n, wi = t, Ti = null, e = !0)), e || ki(t)), null;
			case 13: return gc(e, t, n);
			case 4: return ie(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ka(t, null, r, n) : Qs(e, t, r, n), t.child;
			case 11: return $s(e, t, t.type, t.pendingProps, n);
			case 7: return Qs(e, t, t.pendingProps, n), t.child;
			case 8: return Qs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Qs(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, zi(t, t.type, r.value), Qs(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Gi(t), a = Ki(a), r = r(a), t.flags |= 1, Qs(e, t, r, n), t.child;
			case 14: return ec(e, t, t.type, t.pendingProps, n);
			case 15: return tc(e, t, t.type, t.pendingProps, n);
			case 19: return Sc(e, t, n);
			case 31: return sc(e, t, n);
			case 22: return nc(e, t, n, t.pendingProps);
			case 24: return Gi(t), r = Ki(Qi), e === null ? (a = ua(), a === null && (a = Fl, o = $i(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ma(t), zi(t, Qi, a)) : ((e.lanes & n) !== 0 && (Na(e, t), Ba(t, null, null, n), za()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, zi(t, Qi, r), r !== a.cache && Hi(t, [Qi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), zi(t, Qi, r))), Qs(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Dc(e) {
		e.flags |= 4;
	}
	function Oc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Su()) e.flags |= 8192;
			else throw ba = ga, ma;
		} else e.flags &= -16777217;
	}
	function kc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (Su()) e.flags |= 8192;
		else throw ba = ga, ma;
	}
	function Ac(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : ze(), e.lanes |= t, ql |= t);
	}
	function jc(e, t) {
		if (!J) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Mc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Nc(e, t, n) {
		var r = t.pendingProps;
		switch (Si(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Mc(t), null;
			case 1: return Mc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Bi(Qi), W(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Mi(t) ? Dc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Pi())), Mc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Dc(t), o === null ? (Mc(t), Oc(t, a, null, r, n)) : (Mc(t), kc(t, o))) : o ? o === e.memoizedState ? (Mc(t), t.flags &= -16777217) : (Dc(t), Mc(t), kc(t, o)) : (e = e.memoizedProps, e !== r && Dc(t), Mc(t), Oc(t, a, e, r, n)), null;
			case 27:
				if (ae(t), n = U.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Dc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Mc(t), null;
					}
					e = H.current, Mi(t) ? Ai(t, e) : (e = ff(a, r, n), t.stateNode = e, Dc(t));
				}
				return Mc(t), null;
			case 5:
				if (ae(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Dc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Mc(t), null;
					}
					if (o = H.current, Mi(t)) Ai(t, o);
					else {
						var s = Bd(U.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Ze] = t, o[Qe] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Dc(t);
					}
				}
				return Mc(t), Oc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Dc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = U.current, Mi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = wi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Ze] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || ki(t, !0);
					} else e = Bd(e).createTextNode(r), e[Ze] = t, t.stateNode = e;
				}
				return Mc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Mi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Ze] = t;
						} else Ni(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Mc(t), e = !1;
					} else n = Pi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (eo(t), t) : (eo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Mc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Mi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Ze] = t;
						} else Ni(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Mc(t), a = !1;
					} else a = Pi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (eo(t), t) : (eo(t), null);
				}
				return eo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ac(t, t.updateQueue), Mc(t), null);
			case 4: return W(), e === null && xd(t.stateNode.containerInfo), Mc(t), null;
			case 10: return Bi(t.type), Mc(t), null;
			case 19:
				if (B(to), r = t.memoizedState, r === null) return Mc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) jc(r, !1);
				else {
					if (Hl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = no(e), o !== null) {
							for (t.flags |= 128, jc(r, !1), e = o.updateQueue, t.updateQueue = e, Ac(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ni(n, e), n = n.sibling;
							return V(to, to.current & 1 | 2), J && yi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && K() > $l && (t.flags |= 128, a = !0, jc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = no(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Ac(t, e), jc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !J) return Mc(t), null;
					} else 2 * K() - r.renderingStartTime > $l && n !== 536870912 && (t.flags |= 128, a = !0, jc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Mc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = K(), e.sibling = null, n = to.current, V(to, a ? n & 1 | 2 : n & 1), J && yi(t, r.treeForkCount), e);
			case 22:
			case 23: return eo(t), qa(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Mc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Mc(t), n = t.updateQueue, n !== null && Ac(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && B(la), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Bi(Qi), Mc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Pc(e, t) {
		switch (Si(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Bi(Qi), W(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ae(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (eo(t), t.alternate === null) throw Error(i(340));
					Ni();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (eo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ni();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return B(to), null;
			case 4: return W(), null;
			case 10: return Bi(t.type), null;
			case 22:
			case 23: return eo(t), qa(), e !== null && B(la), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Bi(Qi), null;
			case 25: return null;
			default: return null;
		}
	}
	function Fc(e, t) {
		switch (Si(t), t.tag) {
			case 3:
				Bi(Qi), W();
				break;
			case 26:
			case 27:
			case 5:
				ae(t);
				break;
			case 4:
				W();
				break;
			case 31:
				t.memoizedState !== null && eo(t);
				break;
			case 13:
				eo(t);
				break;
			case 19:
				B(to);
				break;
			case 10:
				Bi(t.type);
				break;
			case 22:
			case 23:
				eo(t), qa(), e !== null && B(la);
				break;
			case 24: Bi(Qi);
		}
	}
	function Ic(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function Lc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Uu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function Rc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ha(t, n);
			} catch (t) {
				Uu(e, e.return, t);
			}
		}
	}
	function zc(e, t, n) {
		n.props = Bs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function Bc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function Vc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Uu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Uu(e, t, n);
		}
		else n.current = null;
	}
	function Hc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Uc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[Qe] = t;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Wc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Gc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Wc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Kc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Wt));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Kc(e, t, n), e = e.sibling; e !== null;) Kc(e, t, n), e = e.sibling;
	}
	function qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (qc(e, t, n), e = e.sibling; e !== null;) qc(e, t, n), e = e.sibling;
	}
	function Jc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[Ze] = e, t[Qe] = n;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	var Yc = !1, Xc = !1, Zc = !1, Qc = typeof WeakSet == "function" ? WeakSet : Set, $c = null;
	function el(e, t) {
		if (e = e.containerInfo, Rd = sp, e = vr(e), yr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, $c = t; $c !== null;) if (t = $c, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, $c = e;
		else for (; $c !== null;) {
			switch (t = $c, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Bs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Uu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, $c = e;
				break;
			}
			$c = t.return;
		}
	}
	function tl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				gl(e, n), r & 4 && Ic(5, n);
				break;
			case 1:
				if (gl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Uu(n, n.return, e);
				}
				else {
					var i = Bs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				r & 64 && Rc(n), r & 512 && Bc(n, n.return);
				break;
			case 3:
				if (gl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ha(e, t);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Jc(n);
			case 26:
			case 5:
				gl(e, n), t === null && r & 4 && Hc(n), r & 512 && Bc(n, n.return);
				break;
			case 12:
				gl(e, n);
				break;
			case 31:
				gl(e, n), r & 4 && sl(e, n);
				break;
			case 13:
				gl(e, n), r & 4 && cl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Yc, !r) {
					t = t !== null && t.memoizedState !== null || Xc, i = Yc;
					var a = Xc;
					Yc = r, (Xc = t) && !a ? vl(e, n, (n.subtreeFlags & 8772) != 0) : gl(e, n), Yc = i, Xc = a;
				}
				break;
			case 30: break;
			default: gl(e, n);
		}
	}
	function nl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, nl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && at(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var rl = null, il = !1;
	function al(e, t, n) {
		for (n = n.child; n !== null;) ol(e, t, n), n = n.sibling;
	}
	function ol(e, t, n) {
		if (q && typeof q.onCommitFiberUnmount == "function") try {
			q.onCommitFiberUnmount(Ee, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Xc || Vc(n, t), al(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Xc || Vc(n, t);
				var r = rl, i = il;
				Zd(n.type) && (rl = n.stateNode, il = !1), al(e, t, n), pf(n.stateNode), rl = r, il = i;
				break;
			case 5: Xc || Vc(n, t);
			case 6:
				if (r = rl, i = il, rl = null, al(e, t, n), rl = r, il = i, rl !== null) if (il) try {
					(rl.nodeType === 9 ? rl.body : rl.nodeName === "HTML" ? rl.ownerDocument.body : rl).removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				else try {
					rl.removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				break;
			case 18:
				rl !== null && (il ? (e = rl, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(rl, n.stateNode));
				break;
			case 4:
				r = rl, i = il, rl = n.stateNode.containerInfo, il = !0, al(e, t, n), rl = r, il = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Lc(2, n, t), Xc || Lc(4, n, t), al(e, t, n);
				break;
			case 1:
				Xc || (Vc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && zc(n, t, r)), al(e, t, n);
				break;
			case 21:
				al(e, t, n);
				break;
			case 22:
				Xc = (r = Xc) || n.memoizedState !== null, al(e, t, n), Xc = r;
				break;
			default: al(e, t, n);
		}
	}
	function sl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Uu(t, t.return, e);
			}
		}
	}
	function cl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function ll(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Qc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Qc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ul(e, t) {
		var n = ll(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function dl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							rl = c.stateNode, il = !1;
							break a;
						}
						break;
					case 5:
						rl = c.stateNode, il = !1;
						break a;
					case 3:
					case 4:
						rl = c.stateNode.containerInfo, il = !0;
						break a;
				}
				c = c.return;
			}
			if (rl === null) throw Error(i(160));
			ol(o, s, a), rl = null, il = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) pl(t, e), t = t.sibling;
	}
	var fl = null;
	function pl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				dl(t, e), ml(e), r & 4 && (Lc(3, e, e.return), Ic(3, e), Lc(5, e, e.return));
				break;
			case 1:
				dl(t, e), ml(e), r & 512 && (Xc || n === null || Vc(n, n.return)), r & 64 && Yc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = fl;
				if (dl(t, e), ml(e), r & 512 && (Xc || n === null || Vc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[it] || o[Ze] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[Ze] = e, ut(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[Ze] = e, ut(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Uc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				dl(t, e), ml(e), r & 512 && (Xc || n === null || Vc(n, n.return)), n !== null && r & 4 && Uc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (dl(t, e), ml(e), r & 512 && (Xc || n === null || Vc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						It(a, "");
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Uc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Zc = !0);
				break;
			case 6:
				if (dl(t, e), ml(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = fl, fl = gf(t.containerInfo), dl(t, e), fl = a, ml(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Uu(e, e.return, t);
				}
				Zc && (Zc = !1, hl(e));
				break;
			case 4:
				r = fl, fl = gf(e.stateNode.containerInfo), dl(t, e), ml(e), fl = r;
				break;
			case 12:
				dl(t, e), ml(e);
				break;
			case 31:
				dl(t, e), ml(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ul(e, r)));
				break;
			case 13:
				dl(t, e), ml(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Zl = K()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ul(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Yc, d = Xc;
				if (Yc = u || a, Xc = d || l, dl(t, e), Xc = d, Yc = u, ml(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Yc || Xc || _l(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ul(e, n))));
				break;
			case 19:
				dl(t, e), ml(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ul(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: dl(t, e), ml(e);
		}
	}
	function ml(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Wc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						qc(e, Gc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (It(o, ""), n.flags &= -33), qc(e, Gc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Kc(e, Gc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Uu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function hl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			hl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function gl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) tl(e, t.alternate, t), t = t.sibling;
	}
	function _l(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Lc(4, t, t.return), _l(t);
					break;
				case 1:
					Vc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && zc(t, t.return, n), _l(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Vc(t, t.return), _l(t);
					break;
				case 22:
					t.memoizedState === null && _l(t);
					break;
				case 30:
					_l(t);
					break;
				default: _l(t);
			}
			e = e.sibling;
		}
	}
	function vl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					vl(i, a, n), Ic(4, a);
					break;
				case 1:
					if (vl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Uu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Va(c[i], s);
						} catch (e) {
							Uu(r, r.return, e);
						}
					}
					n && o & 64 && Rc(a), Bc(a, a.return);
					break;
				case 27: Jc(a);
				case 26:
				case 5:
					vl(i, a, n), n && r === null && o & 4 && Hc(a), Bc(a, a.return);
					break;
				case 12:
					vl(i, a, n);
					break;
				case 31:
					vl(i, a, n), n && o & 4 && sl(i, a);
					break;
				case 13:
					vl(i, a, n), n && o & 4 && cl(i, a);
					break;
				case 22:
					a.memoizedState === null && vl(i, a, n), Bc(a, a.return);
					break;
				case 30: break;
				default: vl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function yl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ea(n));
	}
	function bl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ea(e));
	}
	function xl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Sl(e, t, n, r), t = t.sibling;
	}
	function Sl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, t, n, r), i & 2048 && Ic(9, t);
				break;
			case 1:
				xl(e, t, n, r);
				break;
			case 3:
				xl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ea(e)));
				break;
			case 12:
				if (i & 2048) {
					xl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Uu(t, t.return, e);
					}
				} else xl(e, t, n, r);
				break;
			case 31:
				xl(e, t, n, r);
				break;
			case 13:
				xl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? xl(e, t, n, r) : (a._visibility |= 2, Cl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? xl(e, t, n, r) : wl(e, t), i & 2048 && yl(o, t);
				break;
			case 24:
				xl(e, t, n, r), i & 2048 && bl(t.alternate, t);
				break;
			default: xl(e, t, n, r);
		}
	}
	function Cl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Cl(a, o, s, c, i), Ic(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Cl(a, o, s, c, i)) : u._visibility & 2 ? Cl(a, o, s, c, i) : wl(a, o), i && l & 2048 && yl(o.alternate, o);
					break;
				case 24:
					Cl(a, o, s, c, i), i && l & 2048 && bl(o.alternate, o);
					break;
				default: Cl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					wl(n, r), i & 2048 && yl(r.alternate, r);
					break;
				case 24:
					wl(n, r), i & 2048 && bl(r.alternate, r);
					break;
				default: wl(n, r);
			}
			t = t.sibling;
		}
	}
	var Tl = 8192;
	function El(e, t, n) {
		if (e.subtreeFlags & Tl) for (e = e.child; e !== null;) Dl(e, t, n), e = e.sibling;
	}
	function Dl(e, t, n) {
		switch (e.tag) {
			case 26:
				El(e, t, n), e.flags & Tl && e.memoizedState !== null && Gf(n, fl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				El(e, t, n);
				break;
			case 3:
			case 4:
				var r = fl;
				fl = gf(e.stateNode.containerInfo), El(e, t, n), fl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Tl, Tl = 16777216, El(e, t, n), Tl = r) : El(e, t, n));
				break;
			default: El(e, t, n);
		}
	}
	function Ol(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function kl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				$c = r, Ml(r, e);
			}
			Ol(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Al(e), e = e.sibling;
	}
	function Al(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				kl(e), e.flags & 2048 && Lc(9, e, e.return);
				break;
			case 3:
				kl(e);
				break;
			case 12:
				kl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, jl(e)) : kl(e);
				break;
			default: kl(e);
		}
	}
	function jl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				$c = r, Ml(r, e);
			}
			Ol(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Lc(8, t, t.return), jl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, jl(t));
					break;
				default: jl(t);
			}
			e = e.sibling;
		}
	}
	function Ml(e, t) {
		for (; $c !== null;) {
			var n = $c;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Lc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ea(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, $c = r;
			else a: for (n = e; $c !== null;) {
				r = $c;
				var i = r.sibling, a = r.return;
				if (nl(r), r === n) {
					$c = null;
					break a;
				}
				if (i !== null) {
					i.return = a, $c = i;
					break a;
				}
				$c = a;
			}
		}
	}
	var Nl = {
		getCacheForType: function(e) {
			var t = Ki(Qi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ki(Qi).controller.signal;
		}
	}, Pl = typeof WeakMap == "function" ? WeakMap : Map, X = 0, Fl = null, Z = null, Q = 0, Il = 0, Ll = null, Rl = !1, zl = !1, Bl = !1, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = null, Yl = null, Xl = !1, Zl = 0, Ql = 0, $l = Infinity, eu = null, tu = null, nu = 0, ru = null, iu = null, au = 0, ou = 0, su = null, cu = null, lu = 0, uu = null;
	function du() {
		return X & 2 && Q !== 0 ? Q & -Q : F.T === null ? Je() : ud();
	}
	function fu() {
		if (Kl === 0) if (!(Q & 536870912) || J) {
			var e = Ne;
			Ne <<= 1, !(Ne & 3932160) && (Ne = 262144), Kl = e;
		} else Kl = 536870912;
		return e = Ja.current, e !== null && (e.flags |= 32), Kl;
	}
	function pu(e, t, n) {
		(e === Fl && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) && (bu(e, 0), _u(e, Q, Kl, !1)), Ve(e, n), (!(X & 2) || e !== Fl) && (e === Fl && (!(X & 2) && (Wl |= n), Hl === 4 && _u(e, Q, Kl, !1)), nd(e));
	}
	function mu(e, t, n) {
		if (X & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Le(e, t), a = r ? Ou(e, t) : Eu(e, t, !0), o = r;
		do {
			if (a === 0) {
				zl && !r && _u(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !gu(n)) {
					a = Eu(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Jl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (bu(c, s).flags |= 256), s = Eu(c, s, !1), s !== 2) {
								if (Bl && !l) {
									c.errorRecoveryDisabledLanes |= o, Wl |= o, a = 4;
									break a;
								}
								o = Yl, Yl = a, o !== null && (Yl === null ? Yl = o : Yl.push.apply(Yl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					bu(e, 0), _u(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							_u(r, t, Kl, !Rl);
							break a;
						case 2:
							Yl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = Zl + 300 - K(), 10 < a)) {
						if (_u(r, t, Kl, !Rl), Ie(r, 0, !0) !== 0) break a;
						au = t, r.timeoutHandle = Kd(hu.bind(null, r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, "Throttled", -0, 0), a);
						break a;
					}
					hu(r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		nd(e);
	}
	function hu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Wt
			}, Dl(t, a, d);
			var m = (a & 62914560) === a ? Zl - K() : (a & 4194048) === a ? Ql - K() : 0;
			if (m = qf(d, m), m !== null) {
				au = a, e.cancelPendingCommit = m(Fu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), _u(e, a, o, !l);
				return;
			}
		}
		Fu(e, t, a, n, r, i, o, s, c);
	}
	function gu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!pr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function _u(e, t, n, r) {
		t &= ~Gl, t &= ~Wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Oe(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && Ue(e, n, t);
	}
	function vu() {
		return X & 6 ? !0 : (rd(0, !1), !1);
	}
	function yu() {
		if (Z !== null) {
			if (Il === 0) var e = Z.return;
			else e = Z, Ri = Li = null, So(e), Ca = null, wa = 0, e = Z;
			for (; e !== null;) Fc(e.alternate, e), e = e.return;
			Z = null;
		}
	}
	function bu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), au = 0, yu(), Fl = e, Z = n = ti(e.current, null), Q = t, Il = 0, Ll = null, Rl = !1, zl = Le(e, t), Bl = !1, ql = Kl = Gl = Wl = Ul = Hl = 0, Yl = Jl = null, Xl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Oe(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Vl = t, Gr(), n;
	}
	function xu(e, t) {
		Y = null, F.H = Ms, t === pa || t === ha ? (t = xa(), Il = 3) : t === ma ? (t = xa(), Il = 4) : Il = t === Xs ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Ll = t, Z === null && (Hl = 1, Ws(e, li(t, e.current)));
	}
	function Su() {
		var e = Ja.current;
		return e === null ? !0 : (Q & 4194048) === Q ? Ya === null : (Q & 62914560) === Q || Q & 536870912 ? e === Ya : !1;
	}
	function Cu() {
		var e = F.H;
		return F.H = Ms, e === null ? Ms : e;
	}
	function wu() {
		var e = F.A;
		return F.A = Nl, e;
	}
	function Tu() {
		Hl = 4, Rl || (Q & 4194048) !== Q && Ja.current !== null || (zl = !0), !(Ul & 134217727) && !(Wl & 134217727) || Fl === null || _u(Fl, Q, Kl, !1);
	}
	function Eu(e, t, n) {
		var r = X;
		X |= 2;
		var i = Cu(), a = wu();
		(Fl !== e || Q !== t) && (eu = null, bu(e, t)), t = !1;
		var o = Hl;
		a: do
			try {
				if (Il !== 0 && Z !== null) {
					var s = Z, c = Ll;
					switch (Il) {
						case 8:
							yu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Ja.current === null && (t = !0);
							var l = Il;
							if (Il = 0, Ll = null, Mu(e, s, c, l), n && zl) {
								o = 0;
								break a;
							}
							break;
						default: l = Il, Il = 0, Ll = null, Mu(e, s, c, l);
					}
				}
				Du(), o = Hl;
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Ri = Li = null, X = r, F.H = i, F.A = a, Z === null && (Fl = null, Q = 0, Gr()), o;
	}
	function Du() {
		for (; Z !== null;) Au(Z);
	}
	function Ou(e, t) {
		var n = X;
		X |= 2;
		var r = Cu(), a = wu();
		Fl !== e || Q !== t ? (eu = null, $l = K() + 500, bu(e, t)) : zl = Le(e, t);
		a: do
			try {
				if (Il !== 0 && Z !== null) {
					t = Z;
					var o = Ll;
					b: switch (Il) {
						case 1:
							Il = 0, Ll = null, Mu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (_a(o)) {
								Il = 0, Ll = null, ju(t);
								break;
							}
							t = function() {
								Il !== 2 && Il !== 9 || Fl !== e || (Il = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Il = 7;
							break a;
						case 4:
							Il = 5;
							break a;
						case 7:
							_a(o) ? (Il = 0, Ll = null, ju(t)) : (Il = 0, Ll = null, Mu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Z.tag) {
								case 26: s = Z.memoizedState;
								case 5:
								case 27:
									var c = Z;
									if (s ? Wf(s) : c.stateNode.complete) {
										Il = 0, Ll = null;
										var l = c.sibling;
										if (l !== null) Z = l;
										else {
											var u = c.return;
											u === null ? Z = null : (Z = u, Nu(u));
										}
										break b;
									}
							}
							Il = 0, Ll = null, Mu(e, t, o, 5);
							break;
						case 6:
							Il = 0, Ll = null, Mu(e, t, o, 6);
							break;
						case 8:
							yu(), Hl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ku();
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return Ri = Li = null, F.H = r, F.A = a, X = n, Z === null ? (Fl = null, Q = 0, Gr(), Hl) : 0;
	}
	function ku() {
		for (; Z !== null && !ge();) Au(Z);
	}
	function Au(e) {
		var t = Ec(e.alternate, e, Vl);
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Z = t;
	}
	function ju(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = uc(n, t, t.pendingProps, t.type, void 0, Q);
				break;
			case 11:
				t = uc(n, t, t.pendingProps, t.type.render, t.ref, Q);
				break;
			case 5: So(t);
			default: Fc(n, t), t = Z = ni(t, Vl), t = Ec(n, t, Vl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Z = t;
	}
	function Mu(e, t, n, r) {
		Ri = Li = null, So(t), Ca = null, wa = 0;
		var i = t.return;
		try {
			if (Ys(e, i, t, n, Q)) {
				Hl = 1, Ws(e, li(n, e.current)), Z = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Z = i, t;
			Hl = 1, Ws(e, li(n, e.current)), Z = null;
			return;
		}
		t.flags & 32768 ? (J || r === 1 ? e = !0 : zl || Q & 536870912 ? e = !1 : (Rl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ja.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Pu(t, e)) : Nu(t);
	}
	function Nu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Pu(t, Rl);
				return;
			}
			e = t.return;
			var n = Nc(t.alternate, t, Vl);
			if (n !== null) {
				Z = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Z = t;
				return;
			}
			Z = t = e;
		} while (t !== null);
		Hl === 0 && (Hl = 5);
	}
	function Pu(e, t) {
		do {
			var n = Pc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Z = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Z = e;
				return;
			}
			Z = e = n;
		} while (e !== null);
		Hl = 6, Z = null;
	}
	function Fu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Bu();
		while (nu !== 0);
		if (X & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Wr, He(e, n, o, s, c, l), e === Fl && (Z = Fl = null, Q = 0), iu = t, ru = e, au = n, ou = o, su = a, cu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(xe, function() {
				return Vu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = F.T, F.T = null, a = I.p, I.p = 2, s = X, X |= 4;
				try {
					el(e, t, n);
				} finally {
					X = s, I.p = a, F.T = r;
				}
			}
			nu = 1, Iu(), Lu(), Ru();
		}
	}
	function Iu() {
		if (nu === 1) {
			nu = 0;
			var e = ru, t = iu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = F.T, F.T = null;
				var r = I.p;
				I.p = 2;
				var i = X;
				X |= 4;
				try {
					pl(t, e);
					var a = zd, o = vr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && _r(s.ownerDocument.documentElement, s)) {
						if (c !== null && yr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = gr(s, h), v = gr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					X = i, I.p = r, F.T = n;
				}
			}
			e.current = t, nu = 2;
		}
	}
	function Lu() {
		if (nu === 2) {
			nu = 0;
			var e = ru, t = iu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = F.T, F.T = null;
				var r = I.p;
				I.p = 2;
				var i = X;
				X |= 4;
				try {
					tl(e, t.alternate, t);
				} finally {
					X = i, I.p = r, F.T = n;
				}
			}
			nu = 3;
		}
	}
	function Ru() {
		if (nu === 4 || nu === 3) {
			nu = 0, _e();
			var e = ru, t = iu, n = au, r = cu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? nu = 5 : (nu = 0, iu = ru = null, zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (tu = null), qe(n), t = t.stateNode, q && typeof q.onCommitFiberRoot == "function") try {
				q.onCommitFiberRoot(Ee, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = F.T, i = I.p, I.p = 2, F.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					F.T = t, I.p = i;
				}
			}
			au & 3 && Bu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === uu ? lu++ : (lu = 0, uu = e) : lu = 0, rd(0, !1);
		}
	}
	function zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ea(t)));
	}
	function Bu() {
		return Iu(), Lu(), Ru(), Vu();
	}
	function Vu() {
		if (nu !== 5) return !1;
		var e = ru, t = ou;
		ou = 0;
		var n = qe(au), r = F.T, a = I.p;
		try {
			I.p = 32 > n ? 32 : n, F.T = null, n = su, su = null;
			var o = ru, s = au;
			if (nu = 0, iu = ru = null, au = 0, X & 6) throw Error(i(331));
			var c = X;
			if (X |= 4, Al(o.current), Sl(o, o.current, s, n), X = c, rd(0, !1), q && typeof q.onPostCommitFiberRoot == "function") try {
				q.onPostCommitFiberRoot(Ee, o);
			} catch {}
			return !0;
		} finally {
			I.p = a, F.T = r, zu(e, t);
		}
	}
	function Hu(e, t, n) {
		t = li(n, t), t = Ks(e.stateNode, t, 2), e = Fa(e, t, 2), e !== null && (Ve(e, 2), nd(e));
	}
	function Uu(e, t, n) {
		if (e.tag === 3) Hu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Hu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (tu === null || !tu.has(r))) {
					e = li(n, e), n = qs(2), r = Fa(t, n, 2), r !== null && (Js(n, r, t, e), Ve(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Pl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Bl = !0, i.add(n), e = Gu.bind(null, e, t, n), t.then(e, e));
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Fl === e && (Q & n) === n && (Hl === 4 || Hl === 3 && (Q & 62914560) === Q && 300 > K() - Zl ? !(X & 2) && bu(e, 0) : Gl |= n, ql === Q && (ql = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = ze()), e = Jr(e, t), e !== null && (Ve(e, t), nd(e));
	}
	function qu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ku(e, n);
	}
	function Ju(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Ku(e, n);
	}
	function Yu(e, t) {
		return me(e, t);
	}
	var Xu = null, Zu = null, Qu = !1, $u = !1, ed = !1, td = 0;
	function nd(e) {
		e !== Zu && e.next === null && (Zu === null ? Xu = Zu = e : Zu = Zu.next = e), $u = !0, Qu || (Qu = !0, ld());
	}
	function rd(e, t) {
		if (!ed && $u) {
			ed = !0;
			do
				for (var n = !1, r = Xu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Oe(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = Q, a = Ie(r, r === Fl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Le(r, a) || (n = !0, cd(r, a));
					r = r.next;
				}
			while (n);
			ed = !1;
		}
	}
	function id() {
		ad();
	}
	function ad() {
		$u = Qu = !1;
		var e = 0;
		td !== 0 && Gd() && (e = td);
		for (var t = K(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		nu !== 0 && nu !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Oe(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Re(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Fl, n = Q, n = Ie(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && he(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Le(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && he(r), qe(n)) {
				case 2:
				case 8:
					n = be;
					break;
				case 32:
					n = xe;
					break;
				case 268435456:
					n = Ce;
					break;
				default: n = xe;
			}
			return r = sd.bind(null, e), n = me(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && he(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (nu !== 0 && nu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Bu() && e.callbackNode !== n) return null;
		var r = Q;
		return r = Ie(e, e === Fl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (mu(e, r, t), od(e, K()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Bu()) return null;
		mu(e, t, !0);
	}
	function ld() {
		Yd(function() {
			X & 6 ? me(ye, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = ra;
			e === 0 && (e = Me, Me <<= 1, !(Me & 261888) && (Me = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ut("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[Qe] || null).action), o = r.submitter;
			o && (t = (t = o[Qe] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new fn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (td !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								vs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), vs(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var md = 0; md < zr.length; md++) {
		var hd = zr[md];
		Br(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Br(jr, "onAnimationEnd"), Br(Mr, "onAnimationIteration"), Br(Nr, "onAnimationStart"), Br("dblclick", "onDoubleClick"), Br("focusin", "onFocus"), Br("focusout", "onBlur"), Br(Pr, "onTransitionRun"), Br(Fr, "onTransitionStart"), Br(Ir, "onTransitionCancel"), Br(Lr, "onTransitionEnd"), mt("onMouseEnter", ["mouseout", "mouseover"]), mt("onMouseLeave", ["mouseout", "mouseover"]), mt("onPointerEnter", ["pointerout", "pointerover"]), mt("onPointerLeave", ["pointerout", "pointerover"]), pt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), pt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), pt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), pt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), pt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var gd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _d = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gd));
	function vd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Vr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Vr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[et];
		n === void 0 && (n = t[et] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Sd(t, e, 2, !1), n.add(r));
	}
	function yd(e, t, n) {
		var r = 0;
		t && (r |= 4), Sd(n, e, r, t);
	}
	var bd = "_reactListening" + Math.random().toString(36).slice(2);
	function xd(e) {
		if (!e[bd]) {
			e[bd] = !0, dt.forEach(function(t) {
				t !== "selectionchange" && (_d.has(t) || yd(t, !1, e), yd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[bd] || (t[bd] = !0, yd("selectionchange", !1, t));
		}
	}
	function Sd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !en || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Cd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = ot(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Zt(function() {
			var r = a, i = Kt(n), s = [];
			a: {
				var c = Rr.get(e);
				if (c !== void 0) {
					var l = fn, u = e;
					switch (e) {
						case "keypress": if (sn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = An;
							break;
						case "focusin":
							u = "focus", l = xn;
							break;
						case "focusout":
							u = "blur", l = xn;
							break;
						case "beforeblur":
						case "afterblur":
							l = xn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = yn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = bn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Mn;
							break;
						case jr:
						case Mr:
						case Nr:
							l = Sn;
							break;
						case Lr:
							l = Nn;
							break;
						case "scroll":
						case "scrollend":
							l = mn;
							break;
						case "wheel":
							l = Pn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Cn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = jn;
							break;
						case "toggle":
						case "beforetoggle": l = Fn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Qt(m, p), g != null && d.push(wd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Gt && (u = n.relatedTarget || n.fromElement) && (ot(u) || u[$e])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? ot(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = yn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = jn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ct(l), h = u == null ? c : ct(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, ot(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ed, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Dd(s, c, l, d, !1), u !== null && f !== null && Dd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? ct(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = tr;
					else if (Yn(c)) if (nr) v = dr;
					else {
						v = lr;
						var y = cr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Bt(r.elementType) && (v = tr) : v = ur;
					if (v &&= v(e, r)) {
						Xn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Mt(c, "number", c.value);
				}
				switch (y = r ? ct(r) : window, e) {
					case "focusin":
						(Yn(y) || y.contentEditable === "true") && (xr = y, Sr = r, Cr = null);
						break;
					case "focusout":
						Cr = Sr = xr = null;
						break;
					case "mousedown":
						wr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						wr = !1, Tr(s, n, i);
						break;
					case "selectionchange": if (br) break;
					case "keydown":
					case "keyup": Tr(s, n, i);
				}
				var b;
				if (Ln) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else Gn ? Un(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Bn && n.locale !== "ko" && (Gn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Gn && (b = on()) : (nn = i, rn = "value" in nn ? nn.value : nn.textContent, Gn = !0)), y = Td(r, x), 0 < y.length && (x = new wn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Wn(n), b !== null && (x.data = b)))), (b = zn ? Kn(e, n) : qn(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new wn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), pd(s, e, r, n, i);
			}
			vd(s, t);
		});
	}
	function wd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Td(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Qt(e, n), i != null && r.unshift(wd(e, i, a)), i = Qt(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ed(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Dd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Qt(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = Qt(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Od = /\r\n?/g, kd = /\u0000|\uFFFD/g;
	function Ad(e) {
		return (typeof e == "string" ? e : "" + e).replace(Od, "\n").replace(kd, "");
	}
	function jd(e, t) {
		return t = Ad(t), Ad(e) === t;
	}
	function Md(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || It(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && It(e, "" + r);
				break;
			case "className":
				bt(e, "class", r);
				break;
			case "tabIndex":
				bt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				bt(e, n, r);
				break;
			case "style":
				zt(e, r, o);
				break;
			case "data": if (t !== "object") {
				bt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Ut("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Md(e, t, "name", a.name, a, null), Md(e, t, "formEncType", a.formEncType, a, null), Md(e, t, "formMethod", a.formMethod, a, null), Md(e, t, "formTarget", a.formTarget, a, null)) : (Md(e, t, "encType", a.encType, a, null), Md(e, t, "method", a.method, a, null), Md(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Ut("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Wt);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Ut("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				$("beforetoggle", e), $("toggle", e), yt(e, "popover", r);
				break;
			case "xlinkActuate":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				xt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				xt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				yt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Vt.get(n) || n, yt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				zt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? It(e, r) : (typeof r == "number" || typeof r == "bigint") && It(e, "" + r);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Wt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!ft.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[Qe] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : yt(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				$("error", e), $("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Md(e, t, o, s, n, null);
					}
				}
				a && Md(e, t, "srcSet", n.srcSet, n, null), r && Md(e, t, "src", n.src, n, null);
				return;
			case "input":
				$("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Md(e, t, r, d, n, null);
					}
				}
				jt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in $("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Md(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Nt(e, !!r, n, !0) : Nt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in $("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Md(e, t, s, c, n, null);
				}
				Ft(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Md(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				$("beforetoggle", e), $("toggle", e), $("cancel", e), $("close", e);
				break;
			case "iframe":
			case "object":
				$("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < gd.length; r++) $(gd[r], e);
				break;
			case "image":
				$("error", e), $("load", e);
				break;
			case "details":
				$("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": $("error", e), $("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Md(e, t, u, r, n, null);
				}
				return;
			default: if (Bt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Md(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Md(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Md(e, t, p, m, r, f);
					}
				}
				At(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Md(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Md(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Nt(e, !!n, n ? [] : "", !1) : Nt(e, !!n, t, !0)) : Nt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Md(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Md(e, t, s, a, r, o);
				}
				Pt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Md(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Md(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Md(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Md(e, t, u, p, r, m);
				}
				return;
			default: if (Bt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Md(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Md(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Wd ? !1 : (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[it] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), at(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[it]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		at(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = I.d;
	I.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = vu();
		return e || t;
	}
	function yf(e) {
		var t = st(e);
		t !== null && t.tag === 5 && t.type === "form" ? bs(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = kt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), ut(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + kt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + kt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + kt(n.imageSizes) + "\"]")) : i += "[href=\"" + kt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), ut(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + kt(r) + "\"][href=\"" + kt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), ut(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = lt(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					ut(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = lt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ut(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = lt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ut(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = U.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = lt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = lt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = lt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + kt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), ut(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + kt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + kt(n.href) + "\"]");
				if (r) return t.instance = r, ut(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), ut(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, ut(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), ut(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, ut(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ut(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[it] || a[Ze] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, ut(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), ut(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: L,
		_currentValue2: L,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Be(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Be(0), this.hiddenUpdates = Be(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = $r(3, null, null, t), e.current = a, a.stateNode = e, t = $i(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ma(a), e;
	}
	function tp(e) {
		return e ? (e = Zr, e) : Zr;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Pa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Fa(e, r, t), n !== null && (pu(n, e, t), Ia(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Jr(e, 67108864);
			t !== null && pu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = du();
			t = Ke(t);
			var n = Jr(e, t);
			n !== null && pu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = F.T;
		F.T = null;
		var a = I.p;
		try {
			I.p = 2, up(e, t, n, r);
		} finally {
			I.p = a, F.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = F.T;
		F.T = null;
		var a = I.p;
		try {
			I.p = 8, up(e, t, n, r);
		} finally {
			I.p = a, F.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = st(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Fe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Oe(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(X & 6) && ($l = K() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Jr(a, 2), s !== null && pu(s, a, 2), vu(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Kt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = ot(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = l(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (ve()) {
				case ye: return 2;
				case be: return 8;
				case xe:
				case Se: return 32;
				case Ce: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = st(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = ot(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Ye(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = l(n), t !== null) {
						e.blockedOn = t, Ye(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Gt = r, n.target.dispatchEvent(r), Gt = null;
			} else return t = st(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = st(n);
				a !== null && (e.splice(t, 3), t -= 3, vs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Qe] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Qe] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, du(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), vu(), t[$e] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Je();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.6") throw Error(i(527, Lp, "19.2.6"));
	I.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = p(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: F,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Ee = zp.inject(Rp), q = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Vs, s = Hs, c = Us;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[$e] = t.current, xd(e), new Fp(t);
	};
})), m = /* @__PURE__ */ t(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = s(), g = m(), _ = a();
function v({ priority: e, unoptimized: t, ...n }) {
	return /* @__PURE__ */ (0, _.jsx)("img", {
		...n,
		alt: n.alt ?? "",
		loading: e ? "eager" : n.loading ?? "lazy",
		fetchPriority: e ? "high" : "auto"
	});
}
//#endregion
//#region app/components/ClubApi.ts
var y = window.strcSettings.wordpressUrl ?? "http://localhost:8080", b = class extends Error {
	constructor(e, t) {
		super(e), this.status = t, this.name = "ClubApiError";
	}
};
async function x(e) {
	let t;
	try {
		t = await e.json();
	} catch {
		throw Error(o("Die Anfrage konnte nicht verarbeitet werden. Bitte erneut versuchen."));
	}
	if (!e.ok || !t.success) throw new b(o(t.data?.message || "Die Anfrage konnte nicht abgeschlossen werden."), e.status);
	return t.data;
}
async function S(e, t) {
	try {
		return await fetch(e, t);
	} catch (e) {
		throw t.signal?.aborted ? e : Error(o("Verbindung unterbrochen. Bitte erneut versuchen."));
	}
}
async function C(e, t, n) {
	let r = `${y}/wp-admin/admin-ajax.php?${new URLSearchParams({
		action: e,
		...t
	})}`, i = {
		credentials: "include",
		cache: "no-store",
		signal: n
	}, a;
	try {
		a = await S(r, i);
	} catch (e) {
		if (n?.aborted) throw e;
		a = await S(r, i);
	}
	return [
		502,
		503,
		504
	].includes(a.status) && (a = await S(r, i)), x(a);
}
async function w(e, t, n) {
	if (e === "strc_editorial") {
		let e = await S(`${y}/wp-admin/admin-ajax.php?action=strc_session`, {
			credentials: "include",
			cache: "no-store"
		});
		if (!e.ok) throw Error("Anmeldung konnte nicht geprüft werden. Bitte erneut speichern.");
		let n = await e.json();
		if (!n.authenticated || !n.canEditContent || !n.editorialNonce) throw new b("Bitte in einem zweiten Tab erneut anmelden und danach hier nochmals speichern.", 403);
		t = n.editorialNonce;
	}
	return n.set("action", e), n.set("nonce", t), S(`${y}/wp-admin/admin-ajax.php`, {
		method: "POST",
		credentials: "include",
		body: n
	}).then(x);
}
function T(e) {
	let t = new FormData();
	for (let [n, r] of Object.entries(e)) t.set(n, r);
	return t;
}
//#endregion
//#region ../wordpress/wp-content/plugins/strc-core/src/Community/library-types.json
var E = [
	{
		key: "magazine",
		label: "TR-Magazin",
		access: "open",
		fields: ["issue", "year"]
	},
	{
		key: "newsletter",
		label: "TR-Newsletter-Archiv",
		access: "open",
		fields: ["issue", "year"]
	},
	{
		key: "manual",
		label: "Werkstatthandbücher",
		access: "open",
		fields: ["model", "year"]
	},
	{
		key: "parts",
		label: "Ersatzteilkataloge",
		access: "open",
		fields: ["model", "year"]
	},
	{
		key: "technical",
		label: "Technische Dokumente",
		access: "open",
		fields: ["model", "component"]
	},
	{
		key: "vehicle",
		label: "Fahrzeugdokumente",
		access: "open",
		fields: ["model", "year"]
	},
	{
		key: "roadbook",
		label: "Roadbooks",
		access: "open",
		fields: [
			"region",
			"start",
			"end",
			"distance",
			"drivingTime",
			"duration",
			"year"
		]
	},
	{
		key: "statutes",
		label: "Statuten / Mitgliederreglemente",
		access: "open",
		fields: ["version", "date"]
	},
	{
		key: "club",
		label: "Allgemeine Clubdokumente",
		access: "open",
		fields: ["version", "date"]
	},
	{
		key: "agm",
		label: "Finanz- / GV-Unterlagen für Mitglieder",
		access: "open",
		fields: ["year", "occasion"]
	},
	{
		key: "operations",
		label: "Operative Arbeitsdokumente",
		access: "limited",
		fields: ["version", "date"]
	},
	{
		key: "regional",
		label: "Regional- / Moderatorendokumente",
		access: "limited",
		fields: ["region", "date"]
	},
	{
		key: "board",
		label: "Interne Vorstandsunterlagen",
		access: "restricted",
		fields: ["date", "version"]
	},
	{
		key: "confidential",
		label: "Vertrauliche Finanz- / Führungsunterlagen",
		access: "restricted",
		fields: ["year", "version"]
	},
	{
		key: "travel-report",
		label: "Reiseberichte",
		group: "travel",
		access: "open",
		fields: ["region", "year"]
	}
], D = E, O = {
	open: "Mitglied",
	limited: "Moderator",
	restricted: "Vorstand"
};
function k(e) {
	return E.find((t) => t.key === e)?.key || ({
		"TR-Magazin": "magazine",
		"Technik / Anleitung": "technical"
	}[e] ?? e) || "legacy";
}
var A = {
	issue: "Ausgabe / Nummer",
	year: "Erscheinungsjahr",
	component: "Baugruppe / Technikbereich",
	occasion: "Anlass / Veranstaltung",
	date: "Datum",
	version: "Version / Stand",
	region: "Region / Zuständigkeit (auch Ausland)",
	start: "Startort",
	end: "Zielort",
	distance: "Distanz (km)",
	drivingTime: "Fahrzeit",
	duration: "Dauer (Halbtag, Tag, Wochenende, mehrere Tage)"
}, j = (e) => Array.isArray(e) ? e.join(", ") : e || "";
function M({ type: e, initial: t, accessClasses: n, definitions: r = E }) {
	let i = r.find((t) => t.key === e), a = ["magazine", "newsletter"].includes(e), s = [...i?.fields || ["year"], "source"].some((e) => e !== "model" && j(t[e]));
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsx)("input", {
			type: "hidden",
			name: "documentType",
			value: e
		}),
		/* @__PURE__ */ (0, _.jsxs)("p", {
			className: "library-form-type",
			children: [i?.label || "Bisheriges Dokument", " · eigenes Uploadformular"]
		}),
		a ? /* @__PURE__ */ (0, _.jsx)("div", {
			className: "club-form-row",
			children: (i?.fields || ["year"]).filter((e) => e !== "model").map((n) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
				A[n] || n,
				["magazine", "newsletter"].includes(e) && ["issue", "year"].includes(n) ? " *" : " (optional)",
				/* @__PURE__ */ (0, _.jsx)("input", {
					name: n,
					type: n === "date" ? "date" : n === "year" ? "number" : "text",
					required: ["magazine", "newsletter"].includes(e) && ["issue", "year"].includes(n),
					min: n === "year" ? 1900 : void 0,
					max: n === "year" ? (/* @__PURE__ */ new Date()).getFullYear() + 1 : void 0,
					maxLength: 160,
					defaultValue: j(t[n])
				})
			] }, n))
		}) : null,
		/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Sprache *", /* @__PURE__ */ (0, _.jsxs)("select", {
				name: "language",
				defaultValue: j(t.language) || "de",
				children: [
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "de",
						children: o("Deutsch")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "fr",
						children: o("Français")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "en",
						children: o("English")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "multi",
						children: o("Mehrsprachig")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "other",
						children: o("Unbekannt / nicht angegeben")
					})
				]
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Sichtbar für *", /* @__PURE__ */ (0, _.jsx)("select", {
				name: "access",
				defaultValue: j(t.access) || i?.access || "open",
				children: n.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
					value: e,
					children: O[e]
				}, e))
			})] })]
		}),
		/* @__PURE__ */ (0, _.jsx)("p", {
			className: "club-hint",
			children: "Die gewählte Stufe gilt auch für die Dateien. «Mitglied»: alle angemeldeten Clubmitglieder · «Moderator»: zusätzlich alle mit einer Clubfunktion · «Vorstand»: nur die Rolle Vorstand."
		}),
		/* @__PURE__ */ (0, _.jsxs)("details", {
			className: "market-more",
			open: s || void 0,
			children: [
				/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Weitere Angaben (optional)") }),
				a ? null : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "club-form-row",
					children: (i?.fields || ["year"]).filter((e) => e !== "model").map((n) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
						A[n] || n,
						["magazine", "newsletter"].includes(e) && ["issue", "year"].includes(n) ? " *" : " (optional)",
						/* @__PURE__ */ (0, _.jsx)("input", {
							name: n,
							type: n === "date" ? "date" : n === "year" ? "number" : "text",
							required: ["magazine", "newsletter"].includes(e) && ["issue", "year"].includes(n),
							min: n === "year" ? 1900 : void 0,
							max: n === "year" ? (/* @__PURE__ */ new Date()).getFullYear() + 1 : void 0,
							maxLength: 160,
							defaultValue: j(t[n])
						})
					] }, n))
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Quelle / Urheber/in (optional)", /* @__PURE__ */ (0, _.jsx)("input", {
					name: "source",
					maxLength: 160,
					defaultValue: j(t.source)
				})] })
			]
		})
	] });
}
//#endregion
//#region app/components/ClubCatalog.tsx
var ee = {
	parts: [
		"Motor",
		"Getriebe / Overdrive",
		"Antrieb",
		"Fahrwerk / Lenkung",
		"Bremsen",
		"Elektrik",
		"Karosserie",
		"Innenausstattung",
		"Räder / Reifen",
		"Zubehör",
		"Literatur / Automobilia",
		"Werkzeug / Werkstatt",
		"Verschiedenes",
		"Garagenräumung"
	],
	areas: [
		"Fahrzeuge",
		"Technik",
		"Restaurationen",
		"Teile gesucht",
		"Garagen / Spezialisten",
		"Events & Reisen",
		"Clubleben"
	],
	components: [
		"Motor",
		"Kraftstoff / Vergaser",
		"Einspritzung",
		"Kühlung",
		"Auspuff",
		"Getriebe / Overdrive",
		"Kupplung",
		"Antrieb",
		"Fahrwerk",
		"Lenkung",
		"Bremsen",
		"Elektrik",
		"Zündung",
		"Karosserie",
		"Innenausstattung",
		"Räder / Reifen",
		"Instrumente",
		"Sonstiges"
	],
	libraryTypes: D,
	canManage: !1,
	nonce: null
}, N = (0, h.createContext)(ee);
function P({ children: e }) {
	let [t, n] = (0, h.useState)(ee);
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_catalog", {}, e.signal).then(n).catch(() => {}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsx)(N.Provider, {
		value: t,
		children: e
	});
}
var F = () => (0, h.useContext)(N);
function I() {
	let e = F(), [t, n] = (0, h.useState)(""), [r, i] = (0, h.useState)(!1);
	return e.canManage ? /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "form-section",
		children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Kategorien verwalten") }), /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: async (t) => {
				t.preventDefault();
				let r = new FormData(t.currentTarget);
				i(!0);
				try {
					await w("strc_catalog", e.nonce || "", T({
						operation: "save",
						catalog: JSON.stringify({
							...Object.fromEntries([
								"parts",
								"areas",
								"components"
							].map((e) => [e, String(r.get(e) || "").split("\n").map((e) => e.trim()).filter(Boolean)])),
							libraryTypes: [...e.libraryTypes.map((e) => ({
								...e,
								label: String(r.get("library-label-" + e.key) || e.label),
								access: String(r.get("library-access-" + e.key) || e.access),
								group: String(r.get("library-group-" + e.key) || "")
							})), ...String(r.get("new-library-label") || "").trim() ? [{
								key: "custom-" + crypto.randomUUID(),
								label: String(r.get("new-library-label")).trim(),
								access: "open",
								fields: ["model", "year"]
							}] : []]
						})
					})), n("Kategorien gespeichert. Bitte die Seite neu laden.");
				} catch (e) {
					n(e.message);
				} finally {
					i(!1);
				}
			},
			children: [
				[
					"parts",
					"areas",
					"components"
				].map((t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [{
					parts: "Teilekategorien",
					areas: "Forumsbereiche",
					components: "Technikbereiche"
				}[t], /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: t,
					rows: 7,
					defaultValue: e[t].join("\n"),
					disabled: r
				})] }, t)),
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Dokumentarten") }),
				e.libraryTypes.map((e) => /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-form-row",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Name"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "library-label-" + e.key,
							defaultValue: e.label,
							maxLength: 100
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Standardzugriff"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "library-access-" + e.key,
							defaultValue: e.access,
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "open",
									children: o("Mitglied")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "limited",
									children: o("Moderator")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "restricted",
									children: o("Vorstand")
								})
							]
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bibliotheksgruppe"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "library-group-" + e.key,
							defaultValue: e.group || {
								magazine: "magazine",
								newsletter: "newsletter",
								manual: "technical",
								parts: "technical",
								technical: "technical",
								vehicle: "technical",
								roadbook: "travel",
								regional: "travel",
								statutes: "club",
								club: "club",
								agm: "club",
								operations: "operations",
								board: "board",
								confidential: "board"
							}[e.key] || "",
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Keine Zuordnung")
							}), Object.entries({
								magazine: "TR-Magazin",
								newsletter: "TR-Newsletter",
								technical: "Technische Dokumente",
								travel: "Reiseberichte",
								club: "Clubdokumente",
								operations: "Operative Reglemente",
								board: "Vorstandsunterlagen"
							}).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(t)
							}, e))]
						})] })
					]
				}, e.key)),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Neue Dokumentart (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
					name: "new-library-label",
					maxLength: 100
				})] }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: o("Eine Kategorie pro Zeile. Bestehende Zuordnungen bleiben erhalten.") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-primary",
					disabled: r,
					children: o("Speichern")
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: t
				})
			]
		})]
	}) : null;
}
//#endregion
//#region app/components/FormFields.tsx
var L = [
	"TR2",
	"TR3",
	"TR3A",
	"TR3B",
	"TR4",
	"TR4A",
	"TR5",
	"TR250",
	"TR6",
	"TR6 PI",
	"TR7",
	"TR8",
	"GT6",
	"Spitfire",
	"Stag",
	"2000",
	"2.5 PI",
	"Anderer Triumph"
], R = L.filter((e) => e.startsWith("TR")), te = () => ({
	model: "",
	details: "",
	year: "",
	colour: "",
	registration: "",
	status: "roadworthy",
	notes: ""
});
function z({ error: e, message: t }) {
	let n = (0, h.useRef)(null);
	return (0, h.useEffect)(() => {
		(e || t) && n.current?.focus();
	}, [e, t]), e || t ? /* @__PURE__ */ (0, _.jsx)("div", {
		ref: n,
		tabIndex: -1,
		className: e ? "form-notice form-error" : "form-notice club-notice",
		role: e ? "alert" : "status",
		children: o(e || t || "")
	}) : null;
}
function B({ title: e, children: t, collapsible: n = !1, open: r = !1, note: i = "", hidden: a = !1 }) {
	return n ? /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "form-section is-collapsible",
		open: r || void 0,
		hidden: a,
		children: [/* @__PURE__ */ (0, _.jsxs)("summary", { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o(e) }), i && /* @__PURE__ */ (0, _.jsx)("small", { children: o(i) })] }), /* @__PURE__ */ (0, _.jsx)("div", {
			className: "form-section-body",
			children: t
		})]
	}) : /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "form-section",
		hidden: a,
		children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o(e) }), t]
	});
}
function V(e) {
	let t = e.trim(), n = t.replace(/\D/g, ""), r = "";
	return n.startsWith("0041") && n.length === 13 ? r = n.slice(4) : (t.startsWith("+41") || t.startsWith("0041")) && n.startsWith("41") && n.length === 11 ? r = n.slice(2) : n.startsWith("0") && n.length === 10 && (r = n.slice(1)), r.length === 9 ? `${t.startsWith("+41") || t.startsWith("0041") ? "+41 " : "0"}${r.slice(0, 2)} ${r.slice(2, 5)} ${r.slice(5, 7)} ${r.slice(7)}` : t;
}
function H({ prefix: e = "", names: t = !0, values: n = {}, mobileRequired: r = !1, formatSwissMobile: i = !1, personalDetails: a = !1 }) {
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		t && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Anrede (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
				name: `${e}salutation`,
				defaultValue: n.salutation || "",
				children: [/* @__PURE__ */ (0, _.jsx)("option", {
					value: "",
					children: o("Bitte wählen")
				}), [
					"Frau",
					"Herr",
					"Ohne Anrede"
				].map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
					value: e,
					children: o(e)
				}, e))]
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Korrespondenzsprache"), /* @__PURE__ */ (0, _.jsxs)("select", {
				name: `${e}language`,
				defaultValue: n.language || "de",
				children: [/* @__PURE__ */ (0, _.jsx)("option", {
					value: "de",
					children: o("Deutsch")
				}), /* @__PURE__ */ (0, _.jsx)("option", {
					value: "fr",
					children: o("Français")
				})]
			})] })]
		}), /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Vorname *"), /* @__PURE__ */ (0, _.jsx)("input", {
				name: `${e}first_name`,
				required: !0,
				maxLength: 160,
				autoComplete: `section-${e || "primary"} given-name`,
				defaultValue: n.first_name
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachname *"), /* @__PURE__ */ (0, _.jsx)("input", {
				name: `${e}last_name`,
				required: !0,
				maxLength: 160,
				autoComplete: `section-${e || "primary"} family-name`,
				defaultValue: n.last_name
			})] })]
		})] }),
		a && /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Geschlecht (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
				name: `${e}gender`,
				defaultValue: n.gender || "",
				children: [
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: o("Keine Angabe")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "female",
						children: o("Weiblich")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "male",
						children: o("Männlich")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "other",
						children: o("Divers")
					})
				]
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Geburtsdatum (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
				type: "date",
				name: `${e}birth_date`,
				max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				defaultValue: n.birth_date
			})] })]
		}),
		/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail *"), /* @__PURE__ */ (0, _.jsx)("input", {
				name: `${e}email`,
				type: "email",
				required: !0,
				maxLength: 200,
				autoComplete: `section-${e || "primary"} email`,
				defaultValue: n.email
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
				o(r ? "Mobilnummer *" : "Telefon / Mobil (optional)"),
				/* @__PURE__ */ (0, _.jsx)("input", {
					name: `${e}phone`,
					type: "tel",
					required: r,
					minLength: r ? 5 : void 0,
					maxLength: 40,
					autoComplete: `section-${e || "primary"} tel`,
					placeholder: r ? "+41 79 123 45 67 oder 079 123 45 67" : void 0,
					defaultValue: n.phone,
					onBlur: i ? (e) => {
						e.currentTarget.value = V(e.currentTarget.value);
					} : void 0
				}),
				i && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Schweizer Nummern werden vereinheitlicht; andere Ländervorwahlen bleiben unverändert.") })
			] })]
		}),
		/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Strasse und Hausnummer *"), /* @__PURE__ */ (0, _.jsx)("input", {
			name: `${e}street`,
			required: !0,
			maxLength: 200,
			autoComplete: `section-${e || "primary"} street-address`,
			defaultValue: n.street
		})] }),
		/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Postleitzahl *"), /* @__PURE__ */ (0, _.jsx)("input", {
				name: `${e}postcode`,
				required: !0,
				maxLength: 20,
				autoComplete: `section-${e || "primary"} postal-code`,
				defaultValue: n.postcode
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Ort *"), /* @__PURE__ */ (0, _.jsx)("input", {
				name: `${e}city`,
				required: !0,
				maxLength: 160,
				autoComplete: `section-${e || "primary"} address-level2`,
				defaultValue: n.city
			})] })]
		}),
		/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Land *"), /* @__PURE__ */ (0, _.jsx)("input", {
			name: `${e}country`,
			required: !0,
			maxLength: 100,
			autoComplete: `section-${e || "primary"} country-name`,
			defaultValue: n.country || "Schweiz"
		})] })
	] });
}
function ne({ value: e, onChange: t, application: n = !1 }) {
	function r(n, r) {
		t({
			...e,
			[n]: r
		});
	}
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Triumph-Modell *"), /* @__PURE__ */ (0, _.jsxs)("select", {
				value: e.model,
				required: !0,
				onChange: (e) => r("model", e.target.value),
				children: [/* @__PURE__ */ (0, _.jsx)("option", {
					value: "",
					children: o("Bitte wählen")
				}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
					value: e,
					children: o(e)
				}, e))]
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o(n ? "Baujahr *" : "Modell / Ausführung (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
				type: n ? "number" : "text",
				required: n,
				min: n ? 1900 : void 0,
				max: n ? (/* @__PURE__ */ new Date()).getFullYear() + 1 : void 0,
				maxLength: 160,
				value: n ? e.year : e.details,
				onChange: (e) => r(n ? "year" : "details", e.target.value)
			})] })]
		}),
		n ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Aussenfarbe (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
				maxLength: 160,
				value: e.exteriorColour ?? e.colour,
				onChange: (n) => t({
					...e,
					exteriorColour: n.target.value,
					colour: n.target.value
				})
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Chassisnummer (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
				maxLength: 160,
				value: e.chassisNumber || "",
				onChange: (e) => r("chassisNumber", e.target.value)
			})] })]
		}), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Innenfarbe (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
			maxLength: 160,
			value: e.interiorColour || "",
			onChange: (e) => r("interiorColour", e.target.value)
		})] })] }) : /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Baujahr (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
				type: "number",
				min: 1900,
				max: (/* @__PURE__ */ new Date()).getFullYear() + 1,
				value: e.year,
				onChange: (e) => r("year", e.target.value)
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Farbe (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
				maxLength: 160,
				value: e.colour,
				onChange: (e) => r("colour", e.target.value)
			})] })]
		}),
		/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kennzeichen (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
				maxLength: 160,
				value: e.registration,
				onChange: (e) => r("registration", e.target.value)
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeugstatus"), /* @__PURE__ */ (0, _.jsxs)("select", {
				value: e.status,
				onChange: (e) => r("status", e.target.value),
				children: [/* @__PURE__ */ (0, _.jsx)("option", {
					value: "roadworthy",
					children: o("Fahrbereit")
				}), /* @__PURE__ */ (0, _.jsx)("option", {
					value: "restoration",
					children: o("In Restauration")
				})]
			})] })]
		}),
		/* @__PURE__ */ (0, _.jsxs)("label", { children: [o(n ? "Besonderheiten (optional)" : "Weitere Angaben (optional)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
			maxLength: 1e3,
			rows: 3,
			value: e.notes,
			onChange: (e) => r("notes", e.target.value)
		})] })
	] });
}
function U() {
	return /* @__PURE__ */ (0, _.jsxs)("p", {
		className: "club-hint",
		children: [
			o("Ihre Angaben werden für diese Anfrage verwendet."),
			" ",
			/* @__PURE__ */ (0, _.jsx)("a", {
				href: "#datenschutz",
				target: "_blank",
				rel: "noopener noreferrer",
				children: o("Datenschutzhinweise (neuer Tab)")
			})
		]
	});
}
function re() {
	return /* @__PURE__ */ (0, _.jsx)("div", {
		className: "application-honeypot",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Website", /* @__PURE__ */ (0, _.jsx)("input", {
			name: "website",
			tabIndex: -1,
			autoComplete: "off"
		})] })
	});
}
var ie = {
	home: {
		title: "Startseite",
		route: "#",
		fields: [
			{
				key: "eyebrow",
				label: "Lead – Oberzeile",
				type: "text",
				default: "Swiss TR-Club · Seit 1975"
			},
			{
				key: "title",
				label: "Lead – Überschrift",
				type: "text",
				default: "Leidenschaft, die verbindet."
			},
			{
				key: "heroImage",
				label: "Lead – Hintergrundbild",
				type: "image",
				default: "/club/scheinwerfer.jpg"
			},
			{
				key: "intro",
				label: "Einstieg – Kurztext",
				type: "rich",
				default: "<p>Gemeinsam unterwegs. Mit unseren Triumphs und den Menschen dahinter. Entdecke Ausfahrten, geteiltes Wissen und ein Clubleben, das Generationen verbindet.</p>"
			},
			{
				key: "mission",
				label: "Leitbild – aufklappbarer Text",
				type: "rich",
				default: "<p>Wir pflegen ein aktives und abwechslungsreiches Clubleben, das Menschen mit ihrer gemeinsamen Begeisterung für Triumph TR-Fahrzeuge verbindet. Im Mittelpunkt stehen die Freude am Fahren, die Leidenschaft für klassische Automobile und eine lebendige Gemeinschaft.</p>\n      <p>Mit Ausfahrten, Veranstaltungen und persönlichen Begegnungen schaffen wir bleibende Erlebnisse und fördern den offenen, generationenübergreifenden Austausch. Langjährige Enthusiasten und neue Interessierte sind gleichermassen willkommen.</p>\n      <p>Freundschaft, Respekt und gegenseitige Unterstützung prägen unser Vereinsleben – mit dem gemeinsamen Ziel, die Faszination unserer TRs lebendig zu halten und weiterzugeben.</p>"
			},
			{
				key: "heroAction",
				label: "Einstieg – Hauptlink",
				type: "text",
				default: "Ausfahrten entdecken"
			},
			{
				key: "heroSecondaryAction",
				label: "Einstieg – Link zum Club",
				type: "text",
				default: "Den Club kennenlernen"
			},
			{
				key: "photoLabel",
				label: "Einstieg – Bildbereich",
				type: "text",
				default: "Einblicke ins Clubleben"
			},
			{
				key: "missionSummary",
				label: "Leitbild – Kurzfassung",
				type: "text",
				default: "Die Freude am Fahren bringt uns zusammen. Freundschaft und gegenseitige Unterstützung halten uns zusammen."
			},
			{
				key: "missionToggle",
				label: "Leitbild – Aufklappen",
				type: "text",
				default: "Was uns verbindet"
			},
			{
				key: "newsLabel",
				label: "Kachel Neuigkeiten",
				type: "text",
				default: "Neuigkeiten"
			},
			{
				key: "agendaLabel",
				label: "Kachel Agenda",
				type: "text",
				default: "Agenda"
			},
			{
				key: "activityLabel",
				label: "Kachel Aktivitäten",
				type: "text",
				default: "Member activity"
			},
			{
				key: "activityTitle",
				label: "Aktivitäten – Titel",
				type: "text",
				default: "Unser Club lebt vom Mitmachen"
			},
			{
				key: "activityText",
				label: "Aktivitäten – Kurztext",
				type: "text",
				default: "Fotos teilen, Fragen stellen und Erfahrungen austauschen."
			},
			{
				key: "newsTitle",
				label: "News – Überschrift",
				type: "text",
				default: "Neues aus dem Clubleben."
			},
			{
				key: "newsIntro",
				label: "News – Einleitung",
				type: "text",
				default: "Geschichten, Rückblicke und Neuigkeiten aus dem Swiss TR-Club."
			},
			{
				key: "memberTitle",
				label: "Mitglieder – Überschrift",
				type: "text",
				default: "Dein Club auf einen Blick."
			},
			{
				key: "memberIntro",
				label: "Mitglieder – Einleitung",
				type: "text",
				default: "Termine entdecken, das TR-Magazin lesen und mit dem Club in Verbindung bleiben."
			},
			{
				key: "sponsorsTitle",
				label: "Partner – Überschrift",
				type: "text",
				default: "Gemeinsam mehr bewegen."
			},
			{
				key: "sponsorsIntro",
				label: "Partner – Einleitung",
				type: "text",
				default: "Unterstützer des Swiss TR-Clubs."
			},
			{
				key: "photos",
				label: "Einstieg – Bilder: links Triumphs, rechts Ausflüge",
				type: "images",
				default: [
					{
						url: "/club/club-morgenlicht.jpg",
						alt: "Club-Roadster im Morgenlicht vor einer Bergkulisse"
					},
					{
						url: "/club/alpenstrasse.jpg",
						alt: "Serpentinen einer Alpenstrasse aus der Vogelperspektive"
					},
					{
						url: "/club/roadster-am-see.jpg",
						alt: "Triumph-Roadster bei einem Treffen am See"
					},
					{
						url: "/club/triumph-details.jpg",
						alt: "Rote Triumph-Roadster und glänzende Chromdetails"
					},
					{
						url: "/club/tr6-detail.jpg",
						alt: "Rotes Triumph-TR6-Heck mit britischem Emblem"
					},
					{
						url: "/club/treffen-am-see.jpg",
						alt: "Roadster und Besucher auf einer Wiese am See mit Bergen im Hintergrund"
					},
					{
						url: "/club/abend-am-see.jpg",
						alt: "Triumph-Roadster am See im Abendlicht"
					},
					{
						url: "/club/morgenlicht.jpg",
						alt: "Sonnenlicht auf der Motorhaube eines offenen Roadsters"
					},
					{
						url: "/club/scheinwerfer.jpg",
						alt: "Scheinwerfer und Chromstossstange eines roten Triumph"
					},
					{
						url: "/club/passfahrt.jpg",
						alt: "Mehrere Triumph-Roadster auf einer kurvigen Bergstrasse"
					},
					{
						url: "/club/motorraum.jpg",
						alt: "Motorraum eines roten klassischen Roadsters"
					},
					{
						url: "/club/reisegepaeck.jpg",
						alt: "Heck eines hellblauen Triumph mit Chromgepäckträger"
					}
				]
			},
			{
				key: "partners",
				label: "Sponsoren",
				type: "partners",
				default: [
					{
						image: "/club/sponsors/1.png",
						name: "BELMOT Swiss",
						url: "http://www.belmot.ch"
					},
					{
						image: "/club/sponsors/2.png",
						name: "British Classic Cars AG",
						url: "http://www.british-classics.ch"
					},
					{
						image: "/club/sponsors/3.png",
						name: "Emil Frey Classics AG",
						url: "https://www.emilfreyclassics.ch/"
					},
					{
						image: "/club/sponsors/4.png",
						name: "FRANKS Originale",
						url: "http://franks-originale.ch"
					},
					{
						image: "/club/sponsors/5.png",
						name: "Garage Messmer GmbH",
						url: "http://www.garagemessmer.ch"
					},
					{
						image: "/club/sponsors/6.png",
						name: "Jaggi Autosattlerei GmbH",
						url: "http://www.autosattlerei-jaggi.ch/oldtimer"
					},
					{
						image: "/club/sponsors/7.png",
						name: "Jäggi Classics",
						url: "http://jaeggi-classics.ch"
					},
					{
						image: "/club/sponsors/8.png",
						name: "West-Classic",
						url: "http://www.west-classic.ch/"
					}
				]
			},
			{
				key: "clubLandingTitle",
				label: "Clubkachel – Titel",
				type: "text",
				default: "Der Club"
			},
			{
				key: "clubLandingText",
				label: "Clubkachel – Text",
				type: "text",
				default: "Organisation, Leitbild, Regionen und die Triumph TR-Modelle."
			},
			{
				key: "agendaLandingTitle",
				label: "Eventkachel – Titel",
				type: "text",
				default: "Events & Agenda"
			},
			{
				key: "agendaLandingText",
				label: "Eventkachel – Text",
				type: "text",
				default: "Ausfahrten, regionale Treffen und gemeinsame Erlebnisse."
			},
			{
				key: "marketLandingTitle",
				label: "Marktplatzkachel – Titel",
				type: "text",
				default: "Marktplatz"
			},
			{
				key: "marketLandingText",
				label: "Marktplatzkachel – Text",
				type: "text",
				default: "Fahrzeuge, Ersatzteile und Zubehör entdecken und weitergeben."
			},
			{
				key: "historyLabel",
				label: "Kachel Clubgeschichte – Oberzeile",
				type: "text",
				default: "Club-Geschichte"
			},
			{
				key: "historyTitle",
				label: "Kachel Clubgeschichte – Titel",
				type: "text",
				default: "Wie alles begann."
			},
			{
				key: "historyText",
				label: "Kachel Clubgeschichte – Kurztext",
				type: "text",
				default: "Vier Triumph-Fans, eine Idee und eine Leidenschaft, die seit 1975 verbindet."
			},
			{
				key: "historyYear",
				label: "Kachel Clubgeschichte – Jahreszahl",
				type: "text",
				default: "1975"
			},
			{
				key: "dashboardTitle",
				label: "Dashboard-Verweis – Titel",
				type: "text",
				default: "Dein Club. Auch zwischen den Ausfahrten."
			},
			{
				key: "dashboardText",
				label: "Dashboard-Verweis – Kurztext",
				type: "text",
				default: "Termine planen, Erfahrungen teilen und mit anderen Mitgliedern in Verbindung bleiben."
			},
			{
				key: "magazinePreviewPages",
				label: "TR-Magazin-Vorschau: Seiten zum Blättern (Nummern wie im Flipbook, z. B. 1,3,4,12,13,18,19)",
				type: "text",
				default: "1,3,4,12,13,18,19"
			}
		]
	},
	club: {
		title: "Club – Übersicht und Leitbild",
		route: "#club",
		fields: [
			{
				key: "eyebrow",
				label: "Oberzeile",
				type: "text",
				default: "Der Club"
			},
			{
				key: "title",
				label: "Überschrift",
				type: "text",
				default: "Gemeinsam unterwegs seit 1975."
			},
			{
				key: "intro",
				label: "Einleitung",
				type: "text",
				default: "Der Swiss TR-Club verbindet Menschen, die britische Triumph-Roadster fahren, pflegen und lieben."
			},
			{
				key: "missionLabel",
				label: "Leitbild – Oberzeile",
				type: "text",
				default: "Unser Leitbild"
			},
			{
				key: "missionTitle",
				label: "Leitbild – Überschrift",
				type: "text",
				default: "Was uns verbindet."
			},
			{
				key: "body",
				label: "Vollständiges Leitbild",
				type: "rich",
				default: "<p>Wir pflegen ein aktives und abwechslungsreiches Clubleben, das Menschen mit der gemeinsamen Begeisterung für die Triumph TR-Fahrzeuge verbindet. Im Mittelpunkt stehen die Freude am Fahren, die Leidenschaft für klassische Automobile und die Pflege einer lebendigen Gemeinschaft.</p><p>Mit gemeinsamen Ausfahrten, Veranstaltungen und persönlichen Begegnungen schaffen wir bleibende Erlebnisse und fördern den Austausch unter Gleichgesinnten. Dabei verbinden wir Tradition, Fahrspass und technische Begeisterung mit Offenheit, Kollegialität und gegenseitiger Unterstützung.</p><p>Unser Club steht für einen offenen und aktiven Dialog über Generationen hinweg. Wir möchten sowohl langjährige Enthusiasten als auch neue Interessierte willkommen heissen und ein Umfeld schaffen, in dem sich Menschen aller Altersklassen wohlfühlen und ihre Begeisterung für TRs teilen können.</p><p>Die Freude an unseren TRs bildet das Herzstück unseres Vereinslebens – verbunden mit Freundschaft, Respekt und dem gemeinsamen Ziel, die Faszination der Fahrzeuge lebendig zu halten und weiterzugeben.</p>"
			},
			{
				key: "facts",
				label: "Club-Fakten",
				type: "rich",
				default: "<p><strong>1975</strong> – Gründung des Clubs</p><p><strong>8</strong> – Regionen in der Schweiz</p><p><strong>TR</strong> – Gemeinsame Leidenschaft</p><p><strong>2026</strong> – Neue digitale Plattform</p>"
			},
			{
				key: "joinTitle",
				label: "Mitgliedschaft – Überschrift",
				type: "text",
				default: "Ihr Triumph gehört dazu."
			},
			{
				key: "joinText",
				label: "Mitgliedschaft – Text",
				type: "rich",
				default: "<p>Profitieren Sie von Veranstaltungen, Wissen und Gemeinschaft.</p>"
			},
			{
				key: "organisationText",
				label: "Kachel Organisation",
				type: "text",
				default: "Vorstand, Aufgaben und Ansprechpersonen."
			},
			{
				key: "missionText",
				label: "Kachel Leitbild",
				type: "text",
				default: "Unsere Werte und die Freude am gemeinsamen Unterwegssein."
			},
			{
				key: "regionsText",
				label: "Kachel Regionen",
				type: "text",
				default: "Treffen und Kontakte in Ihrer Nähe."
			},
			{
				key: "membershipText",
				label: "Kachel Anmeldung",
				type: "text",
				default: "Den Club kennenlernen und Mitglied werden."
			},
			{
				key: "modelsTitle",
				label: "TR-Box – Titel",
				type: "text",
				default: "Die Triumph TRs"
			},
			{
				key: "modelsText",
				label: "TR-Box – Text",
				type: "text",
				default: "Entdecken Sie die Modelle und ihre Geschichten."
			},
			{
				key: "triungstersText",
				label: "Kachel TRiungsters",
				type: "text",
				default: "Die nächste Generation im Swiss TR-Club."
			},
			{
				key: "landingBody",
				label: "Landingpage – freier Inhalt",
				type: "rich",
				default: ""
			},
			{
				key: "landingImage",
				label: "Landingpage – Bild",
				type: "image",
				default: ""
			},
			{
				key: "landingImageFrame",
				label: "Landingpage – Bild: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "landingImage"
			},
			{
				key: "landingImageAlt",
				label: "Landingpage – Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "landingImageCaption",
				label: "Landingpage – Bildlegende",
				type: "text",
				default: ""
			},
			{
				key: "historyTitle",
				label: "Kachel Club-Geschichte – Titel",
				type: "text",
				default: "Club-Geschichte"
			},
			{
				key: "historyText",
				label: "Kachel Club-Geschichte – Beschreibung",
				type: "text",
				default: "Unsere Anfänge, gemeinsame Erlebnisse und mehr als fünf Jahrzehnte Leidenschaft."
			},
			{
				key: "missionImage",
				label: "Leitbild: Bild rechts",
				type: "image",
				default: ""
			},
			{
				key: "missionImageFrame",
				label: "Leitbild: Bild rechts: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "missionImage"
			},
			{
				key: "missionImageAlt",
				label: "Leitbild: Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "joinEyebrow",
				label: "Mitglied werden: rote Überschrift",
				type: "text",
				default: "Mitglied werden"
			},
			{
				key: "joinButton",
				label: "Mitglied werden: Button",
				type: "text",
				default: "Zur Anmeldung"
			},
			{
				key: "organisationTitle",
				label: "Organisation: Kacheltitel",
				type: "text",
				default: "Organisation"
			},
			{
				key: "missionCardTitle",
				label: "Leitbild: Kacheltitel",
				type: "text",
				default: "Leitbild"
			},
			{
				key: "regionsTitle",
				label: "Regionen: Kacheltitel",
				type: "text",
				default: "Regionen"
			},
			{
				key: "triungstersTitle",
				label: "TRiungsters: Kacheltitel",
				type: "text",
				default: "TRiungsters"
			}
		]
	},
	agenda: {
		title: "Agenda – Landingpage",
		route: "#agenda",
		fields: [
			{
				key: "title",
				label: "Überschrift",
				type: "text",
				default: "Agenda"
			},
			{
				key: "intro",
				label: "Einleitung und Filtertitel (drei Bereiche mit | trennen)",
				type: "text",
				default: "Clubausfahrten, regionale Treffen und internationale Begegnungen."
			},
			{
				key: "clubTitle",
				label: "Clubkachel – Titel",
				type: "text",
				default: "Club Schweiz"
			},
			{
				key: "clubText",
				label: "Clubkachel – Text",
				type: "text",
				default: "Gemeinsam unterwegs mit dem ganzen Club."
			},
			{
				key: "regionalTitle",
				label: "Regionskachel – Titel",
				type: "text",
				default: "Regionale Treffen"
			},
			{
				key: "regionalText",
				label: "Regionskachel – Text",
				type: "text",
				default: "Persönliche Begegnungen in Ihrer Nähe."
			},
			{
				key: "externalTitle",
				label: "Externe Kachel – Titel",
				type: "text",
				default: "Externe Events"
			},
			{
				key: "externalText",
				label: "Externe Kachel – Text",
				type: "text",
				default: "Weitere Treffen rund um klassische Fahrzeuge."
			},
			{
				key: "landingBody",
				label: "Landingpage – freier Inhalt",
				type: "rich",
				default: ""
			},
			{
				key: "landingImage",
				label: "Landingpage – Bild",
				type: "image",
				default: ""
			},
			{
				key: "landingImageFrame",
				label: "Landingpage – Bild: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "landingImage"
			},
			{
				key: "landingImageAlt",
				label: "Landingpage – Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "landingImageCaption",
				label: "Landingpage – Bildlegende",
				type: "text",
				default: ""
			}
		]
	},
	regions: {
		title: "Regionen – Landingpage",
		route: "#regionen",
		fields: [
			{
				key: "title",
				label: "Überschrift",
				type: "text",
				default: "Unsere Regionen"
			},
			{
				key: "intro",
				label: "Einleitung",
				type: "text",
				default: "Lokal präsent – lokal aktiv."
			},
			{
				key: "landingBody",
				label: "Landingpage – freier Inhalt",
				type: "rich",
				default: ""
			},
			{
				key: "landingImage",
				label: "Landingpage – Bild",
				type: "image",
				default: ""
			},
			{
				key: "landingImageFrame",
				label: "Landingpage – Bild: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "landingImage"
			},
			{
				key: "landingImageAlt",
				label: "Landingpage – Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "landingImageCaption",
				label: "Landingpage – Bildlegende",
				type: "text",
				default: ""
			}
		]
	},
	market: {
		title: "Marktplatz – Landingpage",
		route: "#marktplatz",
		fields: [
			{
				key: "title",
				label: "Überschrift",
				type: "text",
				default: "Von Mitglied zu Mitglied."
			},
			{
				key: "intro",
				label: "Einleitung",
				type: "text",
				default: "Teile, Fahrzeuge und Zubehör. Inserat erstellen, Interessenten finden und direkt miteinander Kontakt aufnehmen."
			},
			{
				key: "shopTitle",
				label: "Shopkachel – Titel",
				type: "text",
				default: "TR-Shop"
			},
			{
				key: "shopText",
				label: "Shopkachel – Text",
				type: "text",
				default: "Clubartikel und Informationen zur Bestellung."
			},
			{
				key: "partsTitle",
				label: "Teilekachel – Titel",
				type: "text",
				default: "Ersatzteile"
			},
			{
				key: "partsText",
				label: "Teilekachel – Text",
				type: "text",
				default: "Passendes für Pflege, Reparatur und Restauration."
			},
			{
				key: "partsGuide",
				label: "Ersatzteile – Anleitung",
				type: "text",
				default: "Wähle ein Triumph-Modell und suche nach einem Teil oder Stichwort. Beide Angaben werden gemeinsam berücksichtigt. Jeder Eintrag in der Liste öffnet das vollständige Inserat."
			},
			{
				key: "carsTitle",
				label: "Fahrzeugkachel – Titel",
				type: "text",
				default: "Fahrzeuge"
			},
			{
				key: "carsText",
				label: "Fahrzeugkachel – Text",
				type: "text",
				default: "Triumph-Roadster mit Geschichte suchen und anbieten."
			},
			{
				key: "landingBody",
				label: "Landingpage – freier Inhalt",
				type: "rich",
				default: ""
			},
			{
				key: "landingImage",
				label: "Landingpage – Bild",
				type: "image",
				default: ""
			},
			{
				key: "landingImageFrame",
				label: "Landingpage – Bild: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "landingImage"
			},
			{
				key: "landingImageAlt",
				label: "Landingpage – Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "landingImageCaption",
				label: "Landingpage – Bildlegende",
				type: "text",
				default: ""
			}
		]
	},
	forum: {
		title: "Forum – Einleitung",
		route: "#forum",
		fields: [{
			key: "title",
			label: "Überschrift",
			type: "text",
			default: "Forum"
		}, {
			key: "intro",
			label: "Einleitung",
			type: "text",
			default: "Fragen stellen, Erfahrungen teilen und Dateien austauschen."
		}]
	},
	gallery: {
		title: "Galerie – Einleitung",
		route: "#galerie",
		fields: [{
			key: "title",
			label: "Überschrift",
			type: "text",
			default: "Galerie"
		}, {
			key: "intro",
			label: "Einleitung",
			type: "text",
			default: "Bilder von Ausfahrten, Treffen und Triumph-Fahrzeugen teilen."
		}]
	},
	library: {
		title: "Bibliothek – Einleitung",
		route: "#bibliothek",
		fields: [{
			key: "title",
			label: "Überschrift",
			type: "text",
			default: "Bibliothek"
		}, {
			key: "intro",
			label: "Einleitung",
			type: "text",
			default: "Dokumente, Magazine und technisches Wissen miteinander teilen."
		}]
	},
	members: {
		title: "Dashboard und Mitglieder-Login",
		route: "#mitglieder",
		fields: [
			{
				key: "title",
				label: "Überschrift",
				type: "text",
				default: "Willkommen zurück."
			},
			{
				key: "intro",
				label: "Einleitung",
				type: "text",
				default: "Anmelden und alle Clubaktivitäten an einem Ort sehen."
			},
			{
				key: "welcome",
				label: "Dashboard – Begrüssung",
				type: "text",
				default: "Willkommen,"
			},
			{
				key: "dashboardIntro",
				label: "Dashboard – Einleitung",
				type: "rich",
				default: "<p>Ihr Zugang zum Clubleben: Termine entdecken, Erfahrungen teilen und in Verbindung bleiben.</p>"
			},
			{
				key: "membershipTitle",
				label: "Dashboard – Mitgliedschaftstitel",
				type: "text",
				default: "Mitgliedschaft"
			},
			{
				key: "membershipText",
				label: "Dashboard – Mitgliedschaftshinweis",
				type: "rich",
				default: "<p>Ihre Mitgliedsdaten werden direkt durch den Swiss TR-Club verwaltet.</p>"
			},
			{
				key: "newsTitle",
				label: "Dashboard – Infobox-Titel",
				type: "text",
				default: "Aktuell"
			},
			{
				key: "newsBody",
				label: "Dashboard – Infobox-Inhalt",
				type: "rich",
				default: "<ul><li>Clubtermine in der Agenda entdecken</li><li>Eigene Inserate im Marktplatz erstellen</li><li>Fotos, Dokumente und Erfahrungen mit Mitgliedern teilen</li></ul>"
			}
		]
	},
	directory: {
		title: "Mitgliederverzeichnis – Einleitung",
		route: "#mitgliederliste",
		fields: [
			{
				key: "title",
				label: "Überschrift",
				type: "text",
				default: "Mitgliederverzeichnis"
			},
			{
				key: "intro",
				label: "Einleitung",
				type: "text",
				default: "Mitglieder und ihre Triumphs finden."
			},
			{
				key: "privacy",
				label: "Datenschutz-Hinweis",
				type: "text",
				default: "Das Verzeichnis ist nur für aktive Clubmitglieder sichtbar. Die Karte zeigt ungefähre Standorte nach Postleitzahl; Wohnadressen werden nicht zur Standortbestimmung verwendet."
			}
		]
	},
	contact: {
		title: "Kontakt & Impressum",
		route: "#kontakt",
		fields: [{
			key: "title",
			label: "Überschrift",
			type: "text",
			default: "Kontakt & Impressum"
		}, {
			key: "body",
			label: "Inhalt",
			type: "rich",
			default: ""
		}]
	},
	privacy: {
		title: "Datenschutz",
		route: "#datenschutz",
		fields: [{
			key: "title",
			label: "Überschrift",
			type: "text",
			default: "Datenschutz"
		}, {
			key: "body",
			label: "Inhalt",
			type: "rich",
			default: ""
		}]
	},
	statutes: {
		title: "Statuten",
		route: "#statuten",
		fields: [{
			key: "title",
			label: "Überschrift",
			type: "text",
			default: "Statuten"
		}, {
			key: "body",
			label: "Inhalt",
			type: "rich",
			default: ""
		}]
	},
	global: {
		title: "Logo, Navigation und Fusszeile",
		route: "#",
		fields: [
			{
				key: "name",
				label: "Clubname",
				type: "text",
				default: "Swiss TR-Club"
			},
			{
				key: "tagline",
				label: "Logo-Zusatz",
				type: "text",
				default: "Passion since 1975"
			},
			{
				key: "logo",
				label: "Clublogo",
				type: "image",
				default: "/strc-logo.png"
			},
			{
				key: "logoFrame",
				label: "Clublogo: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "logo"
			},
			{
				key: "footer",
				label: "Text in der Fusszeile",
				type: "text",
				default: "Freude an britischen Roadstern seit 1975."
			},
			{
				key: "navClub",
				label: "Tab Club",
				type: "text",
				default: "Club"
			},
			{
				key: "navAgenda",
				label: "Tab Agenda",
				type: "text",
				default: "Agenda"
			},
			{
				key: "navRegions",
				label: "Tab Regionen",
				type: "text",
				default: "Regionen"
			},
			{
				key: "navMarket",
				label: "Tab Marktplatz",
				type: "text",
				default: "Marktplatz"
			},
			{
				key: "navLogin",
				label: "Tab Login",
				type: "text",
				default: "Mitglieder-Login"
			}
		]
	},
	organisation: {
		title: "Organisation",
		route: "#organisation",
		template: "article",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "Organisation"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: ""
			},
			{
				key: "lead",
				label: "Lead über dem Organisationsbild",
				type: "rich",
				default: ""
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: ""
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "sidebarTitle",
				label: "Infobox – Titel",
				type: "text",
				default: "Auf einen Blick"
			},
			{
				key: "sidebar",
				label: "Infobox – Kontakte und Aufgaben",
				type: "rich",
				default: ""
			},
			{
				key: "boardTitle",
				label: "Vorstand – Gruppentitel",
				type: "text",
				default: "Vorstand"
			},
			{
				key: "boardPortraits",
				label: "Vorstand – Porträts",
				type: "people",
				maxItems: 7,
				default: [
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					}
				]
			},
			{
				key: "functionsTitle",
				label: "Weitere Funktionen – Gruppentitel",
				type: "text",
				default: "Weitere Funktionen"
			},
			{
				key: "functionsPortraits",
				label: "Weitere Funktionen – Porträts",
				type: "people",
				maxItems: 5,
				default: [
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					},
					{
						image: "",
						name: "",
						role: ""
					}
				]
			}
		]
	},
	membership: {
		title: "Anmeldung",
		route: "#anmeldung",
		template: "article",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "Anmeldung"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: ""
			},
			{
				key: "thankYouTitle",
				label: "Anmeldung – Dankestitel",
				type: "text",
				default: "Herzliches Dankeschön"
			},
			{
				key: "thankYouText",
				label: "Anmeldung – Dankestext",
				type: "rich",
				default: ""
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: ""
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "sidebarTitle",
				label: "Infobox – Titel",
				type: "text",
				default: "Mitglied werden"
			},
			{
				key: "sidebar",
				label: "Infobox – Mitgliedschaft und Beiträge",
				type: "rich",
				default: ""
			},
			{
				key: "fees",
				label: "Mitgliederbeiträge ab 2027",
				type: "rich",
				default: "<p>Ab 2027 gelten folgende Mitgliederbeiträge pro Kalenderjahr:</p><ul><li>Einzelmitgliedschaft: CHF 120.–</li><li>Paarmitgliedschaft: CHF 160.–</li><li>Jungmitglieder bis Alter 35: CHF 50.–</li></ul>"
			}
		]
	},
	shop: {
		title: "TR-Shop",
		route: "#tr-shop",
		template: "article",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR-Shop"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: ""
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: ""
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "sidebarTitle",
				label: "Infobox – Titel",
				type: "text",
				default: "Kontakt und Bestellung"
			},
			{
				key: "sidebar",
				label: "Infobox – Bestellinformationen",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr2": {
		title: "TR2",
		route: "#tr-modelle/tr2",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR2"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr3": {
		title: "TR3",
		route: "#tr-modelle/tr3",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR3"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr3a": {
		title: "TR3A",
		route: "#tr-modelle/tr3a",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR3A"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr4": {
		title: "TR4",
		route: "#tr-modelle/tr4",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR4"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr4a": {
		title: "TR4A",
		route: "#tr-modelle/tr4a",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR4A"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr5": {
		title: "TR5",
		route: "#tr-modelle/tr5",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR5"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr250": {
		title: "TR250",
		route: "#tr-modelle/tr250",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR250"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr6": {
		title: "TR6",
		route: "#tr-modelle/tr6",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR6"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr7": {
		title: "TR7",
		route: "#tr-modelle/tr7",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR7"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	"model-tr8": {
		title: "TR8",
		route: "#tr-modelle/tr8",
		template: "vehicle",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TR8"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Ein Platz für die Geschichte, Besonderheiten und Technik dieses Triumphs."
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<p>Hier entsteht das Modellporträt: mit einer kurzen Einführung, besonderen Merkmalen und Tipps aus dem Club. Die Redaktion ergänzt den endgültigen Text.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "years",
				label: "Bauzeit",
				type: "text",
				default: "Beispiel: 1960–1965",
				legacy: !0
			},
			{
				key: "engine",
				label: "Motor",
				type: "text",
				default: "Beispiel: Reihenmotor",
				legacy: !0
			},
			{
				key: "displacement",
				label: "Hubraum",
				type: "text",
				default: "Beispiel: 2’000 cm³",
				legacy: !0
			},
			{
				key: "power",
				label: "Leistung",
				type: "text",
				default: "Beispiel: 100 PS",
				legacy: !0
			},
			{
				key: "transmission",
				label: "Getriebe",
				type: "text",
				default: "Beispiel: 4-Gang-Schaltgetriebe",
				legacy: !0
			},
			{
				key: "production",
				label: "Stückzahl",
				type: "text",
				default: "Beispiel: 10’000 Fahrzeuge",
				legacy: !0
			},
			{
				key: "factsNote",
				label: "Hinweis zu Varianten / Quellen",
				type: "rich",
				default: "<p>Alle Fahrzeugangaben sind unverbindliche Musterwerte. Die tatsächlichen Daten und Quellen werden durch die Redaktion ergänzt.</p>",
				legacy: !0
			},
			{
				key: "exampleNote",
				label: "Beispielhinweis (nach Prüfung und Ersetzen aller Musterwerte leeren)",
				type: "text",
				default: "Beispielansicht · Daten noch nicht bestätigt"
			},
			{
				key: "factsTitle",
				label: "Überschrift der Faktenbox",
				type: "text",
				default: "Fahrzeugdaten"
			},
			{
				key: "factsBody",
				label: "Faktenbox: frei beschreibbarer Inhalt",
				type: "rich",
				default: ""
			}
		]
	},
	triungsters: {
		title: "TRiungsters",
		route: "#triungsters",
		template: "article",
		initialStatus: "draft",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "TRiungsters"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: ""
			},
			{
				key: "image",
				label: "Bild oben",
				type: "image",
				default: ""
			},
			{
				key: "imageFrame",
				label: "Bild oben: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "image"
			},
			{
				key: "imageAlt",
				label: "Bildbeschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bildlegende / Bildnachweis",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: ""
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "sidebarTitle",
				label: "Infobox – Titel",
				type: "text",
				default: "Auf einen Blick"
			},
			{
				key: "sidebar",
				label: "Infobox – Kontakte und weitere Informationen",
				type: "rich",
				default: ""
			},
			{
				key: "contactName",
				label: "Kontakt: Name",
				type: "text",
				default: ""
			},
			{
				key: "contactRole",
				label: "Kontakt: Funktion",
				type: "text",
				default: "Regionalleitung"
			},
			{
				key: "contactImage",
				label: "Kontakt: Portrait",
				type: "image",
				default: ""
			},
			{
				key: "contactImageFrame",
				label: "Kontakt: Portrait: Einpassen",
				type: "imageFrame",
				default: "contain|50|50",
				imageKey: "contactImage"
			},
			{
				key: "contactPhone",
				label: "Kontakt: Telefon",
				type: "text",
				default: ""
			},
			{
				key: "contactEmail",
				label: "Kontakt: E-Mail",
				type: "text",
				default: ""
			},
			{
				key: "meetName",
				label: "Treffpunkt: Name",
				type: "text",
				default: ""
			},
			{
				key: "meetAddress",
				label: "Treffpunkt: Adresse",
				type: "text",
				default: ""
			},
			{
				key: "meetSchedule",
				label: "Treffpunkt: Rhythmus und Uhrzeit (zwei Zeilen möglich)",
				type: "textarea",
				default: ""
			},
			{
				key: "meetDates",
				label: "Nächste Treffen / Stammtische",
				type: "rich",
				default: ""
			},
			{
				key: "whatsappUrl",
				label: "WhatsApp: Beitrittslink",
				type: "url",
				default: ""
			},
			{
				key: "whatsappQr",
				label: "WhatsApp: QR-Code als Bild",
				type: "image",
				default: ""
			},
			{
				key: "news",
				label: "Regionale Neuigkeiten",
				type: "rich",
				default: ""
			},
			{
				key: "eventBody",
				label: "Regionale Veranstaltung: Zusatzinformationen",
				type: "rich",
				default: ""
			},
			{
				key: "toolbarText",
				label: "Text oberhalb der Kontaktkachel",
				type: "text",
				default: "Die nächste Generation im Swiss TR-Club"
			}
		]
	},
	history: {
		title: "Club-Geschichte",
		route: "#club-geschichte",
		template: "article",
		fields: [
			{
				key: "title",
				label: "Seitentitel",
				type: "text",
				default: "Unsere Club-Geschichte"
			},
			{
				key: "intro",
				label: "Kurze Einleitung",
				type: "text",
				default: "Seit 1975 verbindet uns die Begeisterung für Triumph."
			},
			{
				key: "image",
				label: "Logo links",
				type: "image",
				default: ""
			},
			{
				key: "imageAlt",
				label: "Logo links – Beschreibung",
				type: "text",
				default: ""
			},
			{
				key: "imageCaption",
				label: "Bisherige Bildlegende (wird auf dieser Seite nicht angezeigt)",
				type: "text",
				default: ""
			},
			{
				key: "secondaryLogo",
				label: "Logo rechts",
				type: "image",
				default: ""
			},
			{
				key: "secondaryLogoAlt",
				label: "Logo rechts – Beschreibung",
				type: "text",
				default: ""
			},
			{
				key: "body",
				label: "Text – erste Spalte",
				type: "rich",
				default: "<h2>Eine gemeinsame Idee</h2><p>Als Ersatzteile in der Schweiz immer schwieriger erhältlich wurden, gründeten vier Triumph-Enthusiasten 1975 die TR-Register Swiss-Group. Aus einer praktischen Herausforderung entstand eine Gemeinschaft.</p><h2>Mehr Zuspruch als erwartet</h2><p>Für den Anfang hatten sich die Gründer 15 Mitglieder gewünscht. Bereits im ersten Jahr zählte der Club 60 Mitglieder.</p><h2>50 Jahre gemeinsam unterwegs</h2><p>2025 feierte der Swiss TR-Club sein 50-jähriges Bestehen mit mehr als 300 Mitgliedern. Die gemeinsame Leidenschaft für die britischen Roadster verbindet bis heute.</p>"
			},
			{
				key: "bodySecondary",
				label: "Text – zweite Spalte (optional; leer = eine Spalte)",
				type: "rich",
				default: ""
			},
			{
				key: "sidebarTitle",
				label: "Statistik – Titel",
				type: "text",
				default: "Die Anfänge auf einen Blick"
			},
			{
				key: "sidebar",
				label: "Statistik – Zahlen, Meilensteine und Quellen",
				type: "rich",
				default: "<p><strong>1975</strong><br>Gründung der TR-Register Swiss-Group</p><p><strong>4 Gründer</strong><br>Gemeinsam gegen den Ersatzteilmangel</p><p><strong>60 Mitglieder</strong><br>Bereits im ersten Clubjahr</p><p><strong>2025</strong><br>50-jähriges Jubiläum</p>"
			},
			{
				key: "photos",
				label: "Einstieg – Bilder: links Triumphs, rechts Ausflüge",
				type: "storyImages",
				default: [{
					url: "/club/treffen-am-see.jpg",
					alt: "Club-Impression: Roadster bei einem Treffen am See",
					position: "2"
				}, {
					url: "/club/passfahrt.jpg",
					alt: "Club-Impression: gemeinsam unterwegs auf einer Passstrasse",
					position: "4"
				}],
				maxItems: 3
			},
			{
				key: "logoScale",
				label: "Optische Grösse Logo 1 in Prozent (100–150)",
				type: "text",
				default: "120"
			},
			{
				key: "secondaryLogoScale",
				label: "Optische Grösse Logo 2 in Prozent (100–150)",
				type: "text",
				default: "100"
			}
		]
	},
	profile: {
		title: "Mitgliedschafts-Profil",
		route: "#profil",
		fields: [
			{
				key: "title",
				label: "Überschrift",
				type: "text",
				default: "Mitgliedschafts-Profil"
			},
			{
				key: "intro",
				label: "Einleitung",
				type: "text",
				default: "Deine Angaben und die deines Co-Piloten auf einen Blick."
			},
			{
				key: "memberHint",
				label: "Hinweis linke Spalte (Mitglied)",
				type: "text",
				default: "Vorname, Name, Geschlecht und Geburtsdatum führt der Club in Fairgate. Alle anderen Angaben kannst du selbst anpassen."
			},
			{
				key: "copilotHint",
				label: "Hinweis rechte Spalte (Co-Pilot)",
				type: "text",
				default: "Ist dein Co-Pilot kein Clubmitglied, kannst du ihn hier erfassen. Bei Anlass-Anmeldungen wird er dann vorausgefüllt (Gästepreis)."
			},
			{
				key: "coupleText",
				label: "Text zum Wechsel in die Paarmitgliedschaft",
				type: "rich",
				default: "<p>Wir möchten zur Paarmitgliedschaft wechseln. Der Jahresbeitrag ändert sich auf CHF 160.–. Der Aktuar verbindet uns danach in Fairgate.</p>"
			},
			{
				key: "vehiclesHint",
				label: "Hinweis Fahrzeuge",
				type: "text",
				default: "Die Fahrzeuge sind auf das Hauptmitglied eingetragen."
			},
			{
				key: "subscriptionsHint",
				label: "Hinweis TR-Magazin & eNewsletter",
				type: "text",
				default: "Änderungen gehen an die Mitgliederverwaltung und werden in Fairgate übernommen."
			}
		]
	}
}, W = ie, G = Object.fromEntries(Object.entries(ie).map(([e, t]) => [e, "initialStatus" in t && t.initialStatus === "draft" ? {} : Object.fromEntries(t.fields.map((e) => [e.key, e.default]))])), ae = Object.fromEntries(Object.entries(ie).map(([e, t]) => [e, !("initialStatus" in t && t.initialStatus === "draft")]));
function oe(e) {
	return Object.fromEntries(Object.keys({
		...G,
		...e
	}).map((t) => [t, {
		...G[t],
		...e[t]
	}]));
}
var se = (0, h.createContext)({
	values: G,
	published: ae,
	loading: !0,
	refresh: async () => {},
	error: ""
});
function ce({ children: e }) {
	let [t, n] = (0, h.useState)(G), [r, i] = (0, h.useState)(""), [a, o] = (0, h.useState)(ae), [s, c] = (0, h.useState)(!0), l = (0, h.useCallback)(async () => {
		try {
			let e = await C("strc_editorial", { operation: "public" });
			n(oe(e.values)), o({
				...ae,
				...e.published
			}), i("");
		} catch {
			i("Inhalte konnten nicht aktualisiert werden. Bitte erneut laden.");
		} finally {
			c(!1);
		}
	}, []);
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_editorial", { operation: "public" }, e.signal).then((e) => {
			n(oe(e.values)), o({
				...ae,
				...e.published
			}), i(""), c(!1);
		}).catch(() => {
			e.signal.aborted || (i("Inhalte konnten nicht geladen werden."), c(!1));
		}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsx)(se.Provider, {
		value: {
			values: t,
			published: a,
			loading: s,
			refresh: l,
			error: r
		},
		children: e
	});
}
function le(e, t) {
	if (t !== "fr") return e;
	let n = { ...e };
	for (let [t, r] of Object.entries(e)) t.endsWith("__fr") && typeof r == "string" && r.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim() && (n[t.slice(0, -4)] = r);
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && r.length && ("alt" in r[0] ? n[t] = r.map((e) => ({
		...e,
		alt: e.altFr || e.alt
	})) : "role" in r[0] && (n[t] = r.map((e) => ({
		...e,
		name: e.nameFr || e.name,
		role: e.roleFr || e.role
	}))));
	return n;
}
function ue() {
	let e = (0, h.useContext)(se), { language: t } = n(), r = Object.fromEntries(Object.entries(e.values).map(([e, n]) => [e, le(n, t)]));
	return {
		...e,
		error: o(e.error),
		values: r,
		text: (e, t = "") => {
			let [n, i] = e.split("."), a = r[n]?.[i];
			return o(typeof a == "string" ? a : t);
		}
	};
}
function de({ html: e, className: t = "" }) {
	return /* @__PURE__ */ (0, _.jsx)("div", {
		className: `rich-content ${t}`,
		dangerouslySetInnerHTML: { __html: e }
	});
}
function fe({ id: e, className: t = "" }) {
	let { text: n } = ue();
	return /* @__PURE__ */ (0, _.jsx)(de, {
		html: n(e),
		className: t
	});
}
function pe(e) {
	return e.startsWith("/") && !e.startsWith("//") ? `${window.strcSettings.assetBase ?? ""}${e}` : e;
}
function me(e) {
	let t = e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), n = {
		zuerich: "00000325-Zuerich_Grossmuenster_4x3.png",
		bern: "00000328-Bern_Zytglogge_4x3.png",
		ostschweiz: "00000330-St_Gallen_Kathedrale_4x3.png",
		innerschweiz: "00000329-Luzern_Kapellbruecke_4x3.png",
		zentralschweiz: "00000329-Luzern_Kapellbruecke_4x3.png",
		nordwestschweiz: "00000327-Basel_Muenster_4x3.png",
		mittelland: "00000326-Aarau_Obertorturm_4x3.png",
		romandie: "00000332-Waadt_Schloss_Chillon_4x3.png",
		"swiss-romande": "00000332-Waadt_Schloss_Chillon_4x3.png",
		"suisse-romande": "00000332-Waadt_Schloss_Chillon_4x3.png",
		triungsters: "00000331-TRiungsters_TR_Roadster_4x3.png"
	};
	return pe(n[t] ? `/regions/${n[t]}` : "/regions/00000326-Aarau_Obertorturm_4x3.png");
}
function he(e) {
	return {
		backgroundImage: `url("${me(e)}")`,
		backgroundSize: "cover",
		backgroundPosition: "center 65%",
		backgroundRepeat: "no-repeat"
	};
}
//#endregion
//#region app/components/ImageFrame.tsx
function ge(e, t = "contain") {
	let [n, r, i] = typeof e == "string" ? e.split("|") : [], a = (e) => e !== void 0 && /^\d{1,3}$/.test(e) ? Math.min(100, Math.max(0, Number(e))) : 50;
	return {
		objectFit: n === "cover" || n === "contain" ? n : t,
		objectPosition: `${a(r)}% ${a(i)}%`
	};
}
function _e({ value: e = "", image: t = "", label: n = "Bild im Rahmen", changed: r, portrait: i = !1 }) {
	let a = ge(e, i ? "cover" : "contain"), [o, s] = String(a.objectPosition).replaceAll("%", "").split(" "), c = (e, t, n) => r(`${e}|${t}|${n}`);
	return /* @__PURE__ */ (0, _.jsxs)("fieldset", {
		className: "image-frame-control",
		children: [
			/* @__PURE__ */ (0, _.jsx)("legend", { children: n }),
			t && /* @__PURE__ */ (0, _.jsx)("div", {
				className: `image-frame-preview${i ? " portrait" : ""}`,
				children: /* @__PURE__ */ (0, _.jsx)(v, {
					src: pe(t),
					alt: "Vorschau des Bildausschnitts",
					width: 720,
					height: i ? 900 : 430,
					style: a
				})
			}),
			/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Einpassen", /* @__PURE__ */ (0, _.jsxs)("select", {
				value: a.objectFit,
				onChange: (e) => c(e.target.value, o, s),
				children: [/* @__PURE__ */ (0, _.jsx)("option", {
					value: "contain",
					children: "Ganzes Bild zeigen"
				}), /* @__PURE__ */ (0, _.jsx)("option", {
					value: "cover",
					children: "Rahmen ausfüllen / zuschneiden"
				})]
			})] }),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [
					"Horizontal: ",
					o,
					"%",
					/* @__PURE__ */ (0, _.jsx)("input", {
						type: "range",
						min: "0",
						max: "100",
						value: o,
						onChange: (e) => c(String(a.objectFit), e.target.value, s)
					})
				] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
					"Vertikal: ",
					s,
					"%",
					/* @__PURE__ */ (0, _.jsx)("input", {
						type: "range",
						min: "0",
						max: "100",
						value: s,
						onChange: (e) => c(String(a.objectFit), o, e.target.value)
					})
				] })]
			}),
			/* @__PURE__ */ (0, _.jsx)("small", { children: "Links / oben: 0%, Mitte: 50%, rechts / unten: 100%. Das Originalbild bleibt erhalten. Änderungen anschliessend veröffentlichen." })
		]
	});
}
//#endregion
//#region app/components/LandingIntroduction.tsx
function K({ documentKey: e, contained: t = !1 }) {
	let { text: n } = ue(), r = n(e + ".landingImage"), i = n(e + ".landingBody");
	if (!r && !i) return null;
	let a = r ? /* @__PURE__ */ (0, _.jsxs)("figure", {
		className: "static-cover",
		children: [/* @__PURE__ */ (0, _.jsx)(v, {
			src: pe(r),
			alt: n(e + ".landingImageAlt"),
			width: 1440,
			height: 800,
			style: ge(n(e + ".landingImageFrame"))
		}), n(e + ".landingImageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: n(e + ".landingImageCaption") })]
	}) : null;
	return t ? /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "landing-introduction",
		"aria-label": o("Weitere Informationen"),
		children: [a, i && /* @__PURE__ */ (0, _.jsx)(fe, { id: e + ".landingBody" })]
	}) : /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content landing-introduction",
		"aria-label": o("Weitere Informationen"),
		children: [a, i && /* @__PURE__ */ (0, _.jsx)(fe, { id: e + ".landingBody" })]
	});
}
//#endregion
//#region app/components/Marketplace.tsx
var ve = [
	"Teile",
	"Fahrzeuge",
	"Zubehör",
	"Sonstiges"
], ye = (e) => Array.isArray(e.details?.parts) && e.details.parts.length ? e.details.parts : [e.title];
function be(e) {
	return e.details?.offerType === "free" ? "Kostenlos" : e.details?.offerType === "swap" ? "Tausch" : e.details?.priceMode === "request" ? "Preis auf Anfrage" : xe.format(Number(e.price)) + (e.details?.priceMode === "negotiable" ? " VB" : "");
}
var xe = new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: "CHF"
}), Se = window.strcSettings.wordpressUrl ?? "http://localhost:8080", Ce = window.strcSettings.siteUrl ?? "http://localhost:3000", we = `${Se}/wp-login.php?redirect_to=${encodeURIComponent(`${Ce}/#marktplatz`)}`;
function Te(e, t) {
	return C("strc_marketplace", e, t);
}
function Ee(e, t) {
	return w("strc_marketplace", t, e);
}
function q({ title: e, close: t, busy: n = !1, children: r }) {
	let i = (0, h.useRef)(null), a = (0, h.useId)();
	return (0, h.useEffect)(() => {
		let e = i.current, t = document.activeElement, n = document.body.style.overflow;
		return e?.showModal(), document.body.style.overflow = "hidden", () => {
			e?.close(), document.body.style.overflow = n, t?.focus();
		};
	}, []), /* @__PURE__ */ (0, _.jsxs)("dialog", {
		ref: i,
		className: "market-dialog",
		"aria-labelledby": a,
		onCancel: (e) => {
			e.preventDefault(), n || t();
		},
		children: [/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "market-dialog-heading",
			children: [/* @__PURE__ */ (0, _.jsx)("h2", {
				id: a,
				children: e
			}), /* @__PURE__ */ (0, _.jsx)("button", {
				type: "button",
				className: "market-close",
				"aria-label": o("Fenster schliessen"),
				disabled: n,
				onClick: t,
				children: "×"
			})]
		}), r]
	});
}
function De({ section: e, session: t, notify: n }) {
	let { text: r } = ue(), i = e === "ersatzteile" ? "parts" : e === "fahrzeuge" ? "cars" : e === "meine" ? "mine" : e === "pruefung" ? "review" : "landing", [a, s] = (0, h.useState)({
		ads: [],
		total: 0,
		pages: 0
	}), [c, l] = (0, h.useState)(!0), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(null), [C, w] = (0, h.useState)(!1), T = F(), [E] = (0, h.useState)(e === "meine"), [D, O] = (0, h.useState)(1), [k, A] = (0, h.useState)(0), [j, M] = (0, h.useState)(!1), [ee, N] = (0, h.useState)(null), [P, I] = (0, h.useState)(null), R = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		if (i === "landing") return;
		let e = new AbortController(), t = window.setTimeout(() => {
			l(!0), d(""), Te({
				operation: "list",
				mine: E ? "1" : "0",
				...i === "review" ? { review: "1" } : {},
				search: i === "parts" ? "" : f,
				category: i === "parts" ? "parts" : i === "cars" ? "Fahrzeuge" : "",
				model: i === "parts" ? m : "",
				partCategory: i === "parts" ? y : "",
				page: String(D)
			}, e.signal).then((t) => {
				e.signal.aborted || s(t);
			}).catch((t) => {
				e.signal.aborted || d(t.message);
			}).finally(() => {
				e.signal.aborted || l(!1);
			});
		}, 200);
		return () => {
			clearTimeout(t), e.abort();
		};
	}, [
		i,
		f,
		m,
		y,
		E,
		t?.memberAccess,
		D,
		k
	]), (0, h.useEffect)(() => {
		if (i !== "mine" || !t?.memberAccess) return;
		let e = Number(window.location.hash.split("/")[2]);
		if (!Number.isSafeInteger(e) || e < 1) return;
		let n = new AbortController();
		return Te({
			operation: "get",
			id: String(e)
		}, n.signal).then((e) => {
			e.mine ? I(e) : d(o("Dieses Inserat gehört nicht zu deinem Konto."));
		}).catch((e) => {
			n.signal.aborted || d(e.message);
		}), () => n.abort();
	}, [i, t?.memberAccess]);
	function te() {
		l(!0), A((e) => e + 1);
	}
	function z(e) {
		l(!0), e(), O(1);
	}
	if (i === "landing") return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Marktplatz")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: r("market.title") }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: r("market.intro") })
			]
		}),
		/* @__PURE__ */ (0, _.jsx)(K, { documentKey: "market" }),
		/* @__PURE__ */ (0, _.jsx)("section", {
			className: "page-content marketplace market-entry",
			"aria-label": "Marktplatzbereiche",
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "landing-grid landing-grid-three market-landing",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("a", {
						className: "landing-card",
						href: "#tr-shop",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: r("market.shopTitle") }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: r("market.shopText") }),
							/* @__PURE__ */ (0, _.jsx)("span", {
								className: "landing-card-link",
								children: "TR-Shop öffnen"
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsxs)("a", {
						className: "landing-card",
						href: "#marktplatz/ersatzteile",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: r("market.partsTitle") }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: r("market.partsText") }),
							/* @__PURE__ */ (0, _.jsx)("span", {
								className: "landing-card-link",
								children: "Ersatzteile ansehen"
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsxs)("a", {
						className: "landing-card",
						href: "#marktplatz/fahrzeuge",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: r("market.carsTitle") }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: r("market.carsText") }),
							/* @__PURE__ */ (0, _.jsx)("span", {
								className: "landing-card-link",
								children: "Fahrzeuge ansehen"
							})
						]
					})
				]
			})
		})
	] });
	let B = i === "parts", V = i === "review", H = V ? o("Inserate in Prüfung") : E ? o("Meine Inserate") : r(B ? "market.partsTitle" : "market.carsTitle");
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Marktplatz")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: H }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: V ? o("Eingereichte Inserate öffnen und «Öffentlich freigeben» oder «Ablehnen» wählen.") : E ? o("Ihre Inserate mit Status – bearbeiten, verlängern oder als verkauft markieren.") : r(B ? "market.partsText" : "market.carsText") })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content marketplace market-section",
			"aria-label": H,
			children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-toolbar",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: V ? o("Zur Prüfung") : E ? o("Meine Inserate") : B ? "Ersatzteile finden" : "Fahrzeuge entdecken" }), /* @__PURE__ */ (0, _.jsx)("p", { children: V ? o("Neueste zuerst. Nach der Freigabe erscheint das Inserat öffentlich und verschwindet aus dieser Liste.") : E ? o("Ein Inserat öffnen, um es zu bearbeiten.") : B ? r("market.partsGuide") : "Entdecke Triumphs aus dem Club und öffne ein Inserat für Bilder und Details." })] }), t?.canCreateAd && !V && /* @__PURE__ */ (0, _.jsx)("button", {
						ref: R,
						className: "market-primary",
						onClick: () => M(!0),
						children: "＋ Inserat erstellen"
					})]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-filters market-part-filters",
					children: [B && /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: ["Triumph-Modell", /* @__PURE__ */ (0, _.jsxs)("select", {
							value: m,
							onChange: (e) => z(() => g(e.target.value)),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Modelle")
							}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: e
							}, e))]
						})]
					}), B ? /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: [o("Teilebereich"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: y,
							onChange: (e) => z(() => b(e.target.value)),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Teilebereiche")
							}), T.parts.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})]
					}) : /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: [o("Fahrzeug suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
							type: "search",
							placeholder: "z. B. TR6",
							value: f,
							onChange: (e) => z(() => p(e.target.value))
						})]
					})]
				}),
				B && !E && !m && !y ? /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state market-hint",
					children: o("Bitte ein Triumph-Modell oder einen Teilebereich wählen.")
				}) : c ? /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state",
					role: "status",
					children: o("Inserate werden geladen …")
				}) : u ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "collection-state error",
					role: "alert",
					children: [u, /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-text-button",
						onClick: te,
						children: o("Erneut versuchen")
					})]
				}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsxs)("p", {
						className: "market-count",
						role: "status",
						children: [
							a.total,
							" ",
							a.total === 1 ? "Inserat" : "Inserate",
							E || V ? "" : B ? " mit verfügbaren Teilen" : " mit Fahrzeugen"
						]
					}),
					a.ads.length ? B ? /* @__PURE__ */ (0, _.jsx)("ul", {
						className: "market-parts-list",
						"aria-label": "Verfügbare Teile",
						children: a.ads.flatMap((e) => ye(e).map((t, n) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							onClick: () => I(e),
							"aria-label": `${t}, Inserat ${e.title} ansehen`,
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "market-part-thumb",
									children: e.images[0] ? /* @__PURE__ */ (0, _.jsx)(v, {
										unoptimized: !0,
										src: e.images[0],
										alt: "",
										width: 112,
										height: 80
									}) : /* @__PURE__ */ (0, _.jsx)("span", {
										"aria-hidden": "true",
										children: "◇"
									})
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "market-part-copy",
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: t }), /* @__PURE__ */ (0, _.jsxs)("small", { children: [
										ye(e).length > 1 ? `${ye(e).length} Teile in einem Inserat · ` : "",
										e.details?.model || e.category,
										" · ",
										e.title
									] })]
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "market-part-price",
									children: [be(e), ye(e).length > 1 && /* @__PURE__ */ (0, _.jsx)("small", { children: "für das Inserat" })]
								})
							]
						}) }, `${e.id}-${n}`)))
					}) : /* @__PURE__ */ (0, _.jsx)("div", {
						className: "market-grid",
						children: a.ads.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "market-card",
							children: [/* @__PURE__ */ (0, _.jsxs)("button", {
								className: "market-card-open",
								onClick: () => I(e),
								"aria-label": `${e.title}, ${be(e)}, Details ansehen`,
								children: [/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "market-card-image",
									children: [
										e.images[0] ? /* @__PURE__ */ (0, _.jsx)(v, {
											unoptimized: !0,
											src: e.images[0],
											alt: e.title,
											width: 600,
											height: 420
										}) : /* @__PURE__ */ (0, _.jsx)("span", { children: "Ohne Bild" }),
										e.sold && /* @__PURE__ */ (0, _.jsx)("b", {
											className: "market-sold",
											children: "Verkauft"
										}),
										e.status === "pending" && /* @__PURE__ */ (0, _.jsx)("b", {
											className: "market-pending",
											children: o("In Prüfung")
										})
									]
								}), /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "market-card-copy",
									children: [
										/* @__PURE__ */ (0, _.jsx)("h3", { children: e.title }),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: be(e) }),
										/* @__PURE__ */ (0, _.jsx)("p", {
											className: "market-excerpt",
											children: e.description
										})
									]
								})]
							}), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-card-footer",
								children: [
									e.seller,
									" · ",
									new Date(e.createdAt).toLocaleDateString("de-CH")
								]
							})]
						}, e.id))
					}) : /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "market-empty",
						children: [
							/* @__PURE__ */ (0, _.jsx)("span", {
								"aria-hidden": "true",
								children: "◇"
							}),
							/* @__PURE__ */ (0, _.jsx)("h3", { children: "Keine passenden Inserate." }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: f || m || y ? "Versuche ein anderes Modell oder einen anderen Teilebereich." : "Sobald Clubmitglieder etwas anbieten, erscheint es hier." })
						]
					}),
					a.pages > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "market-pagination",
						children: [
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: D === 1,
								onClick: () => {
									l(!0), O(D - 1);
								},
								children: o("Zurück")
							}),
							/* @__PURE__ */ (0, _.jsxs)("span", { children: [
								o("Seite"),
								" ",
								D,
								" ",
								o("von"),
								" ",
								a.pages
							] }),
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: D >= a.pages,
								onClick: () => {
									l(!0), O(D + 1);
								},
								children: o("Weiter")
							})
						]
					})
				] })
			]
		}),
		j && /* @__PURE__ */ (0, _.jsx)(Oe, {
			session: t,
			initialCategory: B ? "Teile" : "Fahrzeuge",
			close: () => M(!1),
			created: (e) => {
				M(!1), p(""), g(""), O(1), te(), w(e.status === "publish"), S("created");
			}
		}),
		ee && /* @__PURE__ */ (0, _.jsx)(Oe, {
			ad: ee,
			session: t,
			initialCategory: ee.category === "Fahrzeuge" ? "Fahrzeuge" : "Teile",
			close: () => N(null),
			created: (e) => {
				N(null), te(), w(e.status === "publish"), S("edited");
			}
		}),
		x && /* @__PURE__ */ (0, _.jsx)(q, {
			title: o("Vielen Dank!"),
			close: () => {
				S(null), requestAnimationFrame(() => R.current?.focus());
			},
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-dialog-body market-confirmation",
				children: [
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "market-confirmation-icon",
						"aria-hidden": "true",
						children: "✓"
					}),
					/* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("strong", { children: o(x === "created" ? "Ihr Inserat ist bei uns eingegangen." : "Ihre Änderungen sind bei uns eingegangen.") }) }),
					/* @__PURE__ */ (0, _.jsx)("p", { children: o(C ? "Ihr Inserat ist ab sofort online und 90 Tage sichtbar." : "Fahrzeuginserate prüft das Marktplatz-Team in der Regel innert ein bis zwei Tagen. Sobald es veröffentlicht ist, erhalten Sie eine Nachricht per E-Mail und im Dashboard.") }),
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						o("Ihre Inserate finden Sie jederzeit unter"),
						" ",
						/* @__PURE__ */ (0, _.jsx)("a", {
							href: "#marktplatz/meine",
							children: o("Meine Inserate")
						}),
						"."
					] }),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "club-actions",
						children: /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							onClick: () => {
								S(null), requestAnimationFrame(() => R.current?.focus());
							},
							children: o("Schliessen")
						})
					})
				]
			})
		}),
		P && /* @__PURE__ */ (0, _.jsx)(ke, {
			edit: () => {
				N(P), I(null);
			},
			ad: P,
			session: t,
			close: () => I(null),
			sold: () => {
				I(null), te(), n("Inserat gespeichert."), requestAnimationFrame(() => R.current?.focus());
			}
		})
	] });
}
function Oe({ ad: e, session: t, initialCategory: n, close: r, created: i }) {
	let a = F(), [s, c] = (0, h.useState)(e?.title || ""), [l, u] = (0, h.useState)(e?.price || ""), [d, f] = (0, h.useState)(String(e?.details.offerType || "sale")), [p, m] = (0, h.useState)(String(e?.details.priceMode || "fixed")), [g, y] = (0, h.useState)(e?.description || ""), [b, x] = (0, h.useState)(e?.category || n), [S, C] = (0, h.useState)(Array.isArray(e?.details.parts) ? e.details.parts.join("\n") : ""), [w, T] = (0, h.useState)(e?.imageIds || []), [E, D] = (0, h.useState)([]), [O, k] = (0, h.useState)((e?.documents || []).map((e) => e.key)), [A, j] = (0, h.useState)([]), M = (0, h.useRef)(/* @__PURE__ */ new Set()), [ee, N] = (0, h.useState)(!1), [P, I] = (0, h.useState)(!1), R = (0, h.useRef)(!1), [te, z] = (0, h.useState)(""), [B, V] = (0, h.useState)(""), [H, ne] = (0, h.useState)(!1), U = (0, h.useRef)(null), [re, ie] = (0, h.useState)(!1), [W, G] = (0, h.useState)(null), [ae, oe] = (0, h.useState)(""), [se, ce] = (0, h.useState)([]);
	(0, h.useEffect)(() => {
		if (e) return;
		let t = new AbortController();
		return Te({ operation: "config" }, t.signal).then((e) => ie(!!e.canReview)).catch(() => {}), () => t.abort();
	}, [e]), (0, h.useEffect)(() => {
		if (!re || ae.trim().length < 2) return;
		let e = new AbortController(), t = setTimeout(() => {
			Te({
				operation: "members",
				q: ae.trim()
			}, e.signal).then((e) => ce(e.members)).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(t), e.abort();
		};
	}, [re, ae]), (0, h.useEffect)(() => {
		let e = M.current;
		return () => {
			e.forEach((e) => URL.revokeObjectURL(e));
		};
	}, []);
	function le() {
		s || l || g || S || A.length || E.length ? ne(!0) : r();
	}
	function ue(e) {
		if (V(""), w.length + A.length + e.length > 5) {
			V("Bitte höchstens 5 Bilder auswählen.");
			return;
		}
		if (e.some((e) => ![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(e.type) || !e.size || e.size > 20 * 1024 * 1024)) {
			V("Bitte JPG, PNG oder WebP verwenden, maximal 20 MB pro Bild.");
			return;
		}
		j((t) => [...t, ...e.map((e) => {
			let t = URL.createObjectURL(e);
			return M.current.add(t), {
				file: e,
				url: t
			};
		})]);
	}
	return /* @__PURE__ */ (0, _.jsx)(q, {
		title: o(e ? "Inserat bearbeiten" : "Inserat erstellen"),
		close: le,
		busy: P,
		children: t ? !t?.canCreateAd || !t.marketplaceNonce ? /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "market-login",
			children: [/* @__PURE__ */ (0, _.jsx)("p", { children: "Mit Ihrem Mitgliedskonto können Sie ein Inserat veröffentlichen. Titel, Preis, Beschreibung und Bilder sind öffentlich sichtbar. Ihre E-Mail-Adresse sehen nur angemeldete Mitglieder." }), /* @__PURE__ */ (0, _.jsx)("a", {
				className: "market-primary",
				href: we,
				children: o("Mitglieder-Login")
			})]
		}) : /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "market-form",
			onSubmit: async (n) => {
				if (n.preventDefault(), R.current) return;
				if (d === "sale" && p !== "request" && (!/^\d{1,7}([.,]\d{1,2})?$/.test(l.trim()) || Number(l.replace(",", ".")) > 1e6)) {
					z("Bitte einen Preis von CHF 0 bis CHF 1’000’000 mit höchstens zwei Nachkommastellen eingeben.");
					return;
				}
				R.current = !0, I(!0), z("");
				let r = new FormData(n.currentTarget);
				r.set("offerType", d), r.set("priceMode", p), r.set("operation", e ? "edit" : "create"), !e && W && r.set("onBehalfOf", String(W.id)), e && (r.set("retainedDocumentKeys", JSON.stringify(O)), r.set("id", String(e.id)), r.set("retainedImageIds", JSON.stringify(w))), r.set("title", s), r.set("price", l), r.set("description", g), r.set("category", b), r.set("parts", S), r.set("models", JSON.stringify(r.getAll("models[]"))), r.delete("models[]"), A.forEach((e) => r.append("images[]", e.file)), E.forEach((e) => r.append("documents[]", e));
				try {
					i(await Ee(r, t.marketplaceNonce));
				} catch (e) {
					z(e instanceof Error ? e.message : "Speichern fehlgeschlagen."), requestAnimationFrame(() => U.current?.focus());
				} finally {
					R.current = !1, I(!1);
				}
			},
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "market-form-intro",
					children: "In wenigen Schritten online. Pflichtfelder sind mit * markiert. Gesuche gehören ins Forum."
				}),
				re && !e && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-service",
					children: [
						/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Service: Inserat für ein Mitglied erstellen") }),
						W ? /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "market-service-chosen",
							children: [
								o("Inserat im Namen von"),
								" ",
								/* @__PURE__ */ (0, _.jsx)("b", { children: W.name }),
								W.memberNumber ? ` · Nr. ${W.memberNumber}` : "",
								W.city ? ` · ${W.city}` : "",
								" ",
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									onClick: () => {
										G(null), oe(""), ce([]);
									},
									children: o("ändern")
								})
							]
						}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitglied suchen (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								type: "search",
								value: ae,
								onChange: (e) => {
									oe(e.target.value), e.target.value.trim().length < 2 && ce([]);
								},
								placeholder: o("Name, E-Mail oder Login")
							})] }),
							se.length > 0 && /* @__PURE__ */ (0, _.jsx)("ul", {
								className: "market-service-hits",
								children: se.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
									type: "button",
									onClick: () => {
										G(e), ce([]);
									},
									children: [e.name, /* @__PURE__ */ (0, _.jsx)("small", { children: [e.memberNumber && "Nr. " + e.memberNumber, e.city].filter(Boolean).join(" · ") })]
								}) }, e.id))
							}),
							ae.trim().length >= 2 && !se.length && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Kein Mitglied gefunden.") })
						] }),
						/* @__PURE__ */ (0, _.jsx)("small", { children: o(W ? "Das Inserat gehört dem Mitglied, ist sofort online und Kontaktanfragen gehen an seine E-Mail. Das Mitglied wird per E-Mail informiert." : "Leer lassen, um ein eigenes Inserat zu erstellen.") })
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: P,
					children: [
						/* @__PURE__ */ (0, _.jsx)("legend", {
							className: "market-sr-only",
							children: "Angaben zum Inserat"
						}),
						/* @__PURE__ */ (0, _.jsxs)("h3", {
							className: "market-step",
							children: [/* @__PURE__ */ (0, _.jsx)("span", { children: "1" }), o("Was bieten Sie an?")]
						}),
						/* @__PURE__ */ (0, _.jsx)("label", {
							htmlFor: "ad-title",
							children: o("Inserat-Titel *")
						}),
						/* @__PURE__ */ (0, _.jsx)("input", {
							id: "ad-title",
							name: "title",
							value: s,
							onChange: (e) => c(e.target.value),
							required: !0,
							maxLength: 100,
							placeholder: "z. B. Speichenräder für Triumph TR6"
						}),
						/* @__PURE__ */ (0, _.jsx)("label", {
							htmlFor: "ad-description",
							children: o("Beschreibung *")
						}),
						/* @__PURE__ */ (0, _.jsx)("textarea", {
							id: "ad-description",
							name: "description",
							value: g,
							onChange: (e) => y(e.target.value),
							rows: 5,
							required: !0,
							maxLength: 5e3,
							placeholder: "Was bieten Sie an? Zustand, passende Modelle, Abholung oder Versand …"
						}),
						/* @__PURE__ */ (0, _.jsxs)("small", { children: [g.length, "/5000 Zeichen"] }),
						/* @__PURE__ */ (0, _.jsxs)("h3", {
							className: "market-step",
							children: [/* @__PURE__ */ (0, _.jsx)("span", { children: "2" }), o("Angaben zum Fahrzeug / Teil")]
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "market-form-row",
							children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Standort *"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "location",
								defaultValue: String(e?.details.location || ""),
								required: !0,
								maxLength: 160,
								placeholder: "Ort / Region"
							})] }) }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zustand *"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "condition",
								defaultValue: String(e?.details.condition || ""),
								required: !0,
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), [
									"Neu",
									"Neuwertig",
									"Gebraucht – gut",
									"Gebraucht – mit Mängeln",
									"Restaurierungsbedürftig",
									"Fahrbereit",
									"In Restauration"
								].map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] }) })]
						}),
						b === "Fahrzeuge" ? /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Modell *"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "model",
							defaultValue: String(e?.details.model || ""),
							required: !0,
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Bitte wählen")
							}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: e
							}, e))]
						})] }) : /* @__PURE__ */ (0, _.jsxs)("fieldset", {
							className: "market-model-options",
							children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Passende Modelle (optional)") }), L.map((t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								name: "models[]",
								value: t,
								defaultChecked: (Array.isArray(e?.details.models) ? e.details.models : [e?.details.model]).includes(t)
							}), t] }, t))]
						}),
						b === "Fahrzeuge" ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Baujahr *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "year",
									defaultValue: String(e?.details.year || ""),
									type: "number",
									required: !0,
									min: 1900,
									max: (/* @__PURE__ */ new Date()).getFullYear() + 1
								})] }) }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kilometerstand (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "mileage",
									defaultValue: String(e?.details.mileage || ""),
									inputMode: "numeric",
									maxLength: 9,
									placeholder: "z. B. 85000"
								})] }) })]
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Aussenfarbe (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "exteriorColour",
									defaultValue: String(e?.details.exteriorColour || e?.details.colour || ""),
									maxLength: 160
								})] }) }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Innenfarbe (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "interiorColour",
									defaultValue: String(e?.details.interiorColour || ""),
									maxLength: 160
								})] }) })]
							}),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Restaurationsarbeiten und Zeitpunkt (optional)", /* @__PURE__ */ (0, _.jsx)("textarea", {
								name: "restoration",
								defaultValue: String(e?.details.restoration || ""),
								maxLength: 2e3,
								rows: 3
							})] })
						] }) : /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Teilebereich (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "partCategory",
							defaultValue: String(e?.details.partCategory || ""),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Bitte wählen")
							}), a.parts.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] }),
						b === "Teile" && /* @__PURE__ */ (0, _.jsxs)("label", {
							htmlFor: "ad-parts",
							children: [
								"Enthaltene Teile (optional)",
								/* @__PURE__ */ (0, _.jsx)("textarea", {
									id: "ad-parts",
									name: "parts",
									value: S,
									onChange: (e) => C(e.target.value),
									rows: 4,
									maxLength: 2e3,
									placeholder: "Kurbelwelle\nEinspritzanlage\nScheinwerfer"
								}),
								/* @__PURE__ */ (0, _.jsx)("small", { children: "Ein Teil pro Zeile, maximal 20. Alle Teile erscheinen einzeln in der Kurzliste; der Preis gilt für das gesamte Inserat." })
							]
						}),
						/* @__PURE__ */ (0, _.jsxs)("h3", {
							className: "market-step",
							children: [/* @__PURE__ */ (0, _.jsx)("span", { children: "3" }), o("Preis")]
						}),
						b !== "Fahrzeuge" && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "market-form-row",
							children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Angebotsart"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: d,
								onChange: (e) => f(e.target.value),
								children: [
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "sale",
										children: o("Verkauf")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "swap",
										children: o("Tausch")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "free",
										children: o("Kostenlos abzugeben")
									})
								]
							})] }) }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Preisangabe"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: p,
								onChange: (e) => m(e.target.value),
								disabled: d !== "sale",
								children: [
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "fixed",
										children: o("Festpreis")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "negotiable",
										children: o("Verhandlungsbasis")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "request",
										children: o("Preis auf Anfrage")
									})
								]
							})] }) })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "market-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [
								/* @__PURE__ */ (0, _.jsxs)("label", {
									htmlFor: "ad-price",
									children: [o("Preis in CHF"), d === "sale" && p !== "request" ? " *" : " (nicht erforderlich)"]
								}),
								/* @__PURE__ */ (0, _.jsx)("input", {
									id: "ad-price",
									name: "price",
									inputMode: "decimal",
									value: l,
									onChange: (e) => u(e.target.value),
									required: d === "sale" && p !== "request",
									disabled: d !== "sale" || p === "request",
									maxLength: 11,
									placeholder: "z. B. 250.00"
								}),
								b !== "Fahrzeuge" && /* @__PURE__ */ (0, _.jsx)("small", { children: "CHF 0 = kostenlos abzugeben" })
							] }), b === "Fahrzeuge" ? /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Preisangabe"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: p,
								onChange: (e) => m(e.target.value),
								children: [
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "fixed",
										children: o("Festpreis")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "negotiable",
										children: o("Verhandlungsbasis")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "request",
										children: o("Preis auf Anfrage")
									})
								]
							})] }) }) : /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("label", {
								htmlFor: "ad-category",
								children: o("Kategorie")
							}), /* @__PURE__ */ (0, _.jsx)("select", {
								id: "ad-category",
								value: b,
								onChange: (e) => x(e.target.value),
								children: (n === "Fahrzeuge" ? ["Fahrzeuge"] : ve.filter((e) => e !== "Fahrzeuge")).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("h3", {
							className: "market-step",
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", { children: "4" }),
								o("Bilder"),
								/* @__PURE__ */ (0, _.jsx)("small", { children: o("optional, das erste Bild ist das Titelbild") })
							]
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `market-dropzone ${ee ? "is-dragging" : ""}`,
							onDragOver: (e) => {
								e.preventDefault(), P || N(!0);
							},
							onDragLeave: () => N(!1),
							onDrop: (e) => {
								e.preventDefault(), N(!1), P || ue(Array.from(e.dataTransfer.files));
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "market-drop-icon",
									"aria-hidden": "true",
									children: "＋"
								}),
								/* @__PURE__ */ (0, _.jsx)("strong", { children: "Bilder hier hineinziehen" }),
								/* @__PURE__ */ (0, _.jsx)("span", { children: o("oder vom Gerät auswählen") }),
								/* @__PURE__ */ (0, _.jsx)("input", {
									id: "ad-images",
									type: "file",
									accept: "image/jpeg,image/png,image/webp",
									multiple: !0,
									"aria-label": "Bilder auswählen",
									"aria-describedby": "ad-images-hint",
									onChange: (e) => {
										ue(Array.from(e.target.files || [])), e.target.value = "";
									}
								}),
								/* @__PURE__ */ (0, _.jsx)("small", {
									id: "ad-images-hint",
									children: "Optional · bis zu 5 Bilder · JPG, PNG, WebP · je 20 MB"
								})
							]
						}),
						B && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "market-error",
							role: "alert",
							children: B
						}),
						e && /* @__PURE__ */ (0, _.jsx)("div", {
							className: "market-image-previews",
							children: e.imageIds.map((t, n) => w.includes(t) && /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: e.images[n],
								alt: e.title,
								width: 180,
								height: 140
							}), /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								"aria-label": o("Bild entfernen"),
								onClick: () => T((e) => e.filter((e) => e !== t)),
								children: "×"
							})] }, t))
						}),
						!!A.length && /* @__PURE__ */ (0, _.jsx)("div", {
							className: "market-image-previews",
							children: A.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [
								/* @__PURE__ */ (0, _.jsx)(v, {
									unoptimized: !0,
									src: e.url,
									alt: `Vorschau: ${e.file.name}`,
									width: 180,
									height: 140
								}),
								/* @__PURE__ */ (0, _.jsx)("span", { children: t === 0 ? "Titelbild" : `Bild ${t + 1}` }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									"aria-label": `${e.file.name} entfernen`,
									onClick: () => {
										URL.revokeObjectURL(e.url), M.current.delete(e.url), j((t) => t.filter((t) => t.url !== e.url)), V("");
									},
									children: "×"
								})
							] }, e.url))
						}),
						/* @__PURE__ */ (0, _.jsxs)("details", {
							className: "market-more",
							children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Weitere Angaben (optional): PDF-Anhänge") }), /* @__PURE__ */ (0, _.jsxs)("section", { children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("PDF-Anhänge (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "file",
									accept: "application/pdf,.pdf",
									multiple: !0,
									onChange: (e) => {
										let t = Array.from(e.target.files || []);
										if (e.target.value = "", t.length + E.length + O.length > 3 || t.some((e) => e.size > 10 * 1024 * 1024 || !e.size || !e.name.toLowerCase().endsWith(".pdf"))) {
											V(o("Bitte höchstens drei PDFs mit je maximal 10 MB auswählen."));
											return;
										}
										V(""), D((e) => [...e, ...t]);
									}
								})] }),
								/* @__PURE__ */ (0, _.jsx)("small", { children: o("Bis zu drei PDFs, je 10 MB. Download nur für berechtigte Mitglieder.") }),
								(e?.documents || []).filter((e) => O.includes(e.key)).map((e) => /* @__PURE__ */ (0, _.jsxs)("p", { children: [
									e.name,
									" ",
									/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "market-text-button",
										onClick: () => k((t) => t.filter((t) => t !== e.key)),
										children: o("Entfernen")
									})
								] }, e.key)),
								E.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("p", { children: [
									e.name,
									" ",
									/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "market-text-button",
										onClick: () => D((e) => e.filter((e, n) => n !== t)),
										children: o("Entfernen")
									})
								] }, t))
							] })]
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "market-privacy",
					children: "Interessenten erreichen Sie über das Kontaktformular im Inserat. Ihre persönlichen Kontaktdaten werden nicht öffentlich angezeigt."
				}),
				te && /* @__PURE__ */ (0, _.jsx)("p", {
					ref: U,
					tabIndex: -1,
					className: "market-error",
					role: "alert",
					children: te
				}),
				H ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-discard",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", { children: "Ungespeichertes Inserat verwerfen?" }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							onClick: () => ne(!1),
							children: "Weiter bearbeiten"
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							onClick: r,
							children: "Verwerfen"
						})
					]
				}) : /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-form-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "market-cancel",
						disabled: P,
						onClick: le,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						type: "submit",
						disabled: P,
						children: o(P ? "Wird gesendet …" : "Absenden")
					})]
				})
			]
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: "Anmeldung wird geprüft …"
		})
	});
}
function ke({ ad: e, session: t, close: n, sold: r, edit: i }) {
	let [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(!1);
	return /* @__PURE__ */ (0, _.jsxs)(q, {
		title: e.title,
		close: n,
		busy: f,
		children: [
			!!e.images.length && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "market-gallery",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-gallery-stage",
					children: [/* @__PURE__ */ (0, _.jsx)(v, {
						unoptimized: !0,
						className: "market-detail-image",
						src: e.images[a],
						alt: `${e.title}, Bild ${a + 1} von ${e.images.length}`,
						width: 900,
						height: 600
					}), e.images.length > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "market-gallery-controls",
						children: [
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								"aria-label": o("Vorheriges Inseratbild"),
								onClick: () => s((t) => (t - 1 + e.images.length) % e.images.length),
								children: "‹"
							}),
							/* @__PURE__ */ (0, _.jsxs)("span", {
								"aria-live": "polite",
								children: [
									a + 1,
									" / ",
									e.images.length
								]
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								"aria-label": o("Nächstes Inseratbild"),
								onClick: () => s((t) => (t + 1) % e.images.length),
								children: "›"
							})
						]
					})]
				}), e.images.length > 1 && /* @__PURE__ */ (0, _.jsx)("div", {
					className: "market-thumbnails",
					"aria-label": "Alle Inseratbilder",
					children: e.images.map((e, t) => /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						"aria-label": `Bild ${t + 1} anzeigen`,
						"aria-pressed": t === a,
						onClick: () => s(t),
						children: /* @__PURE__ */ (0, _.jsx)(v, {
							unoptimized: !0,
							src: e,
							alt: "",
							width: 100,
							height: 80
						})
					}, `${e}-${t}`))
				})]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "market-detail-meta",
				children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [e.category, e.sold ? " · Verkauft" : ""] }), /* @__PURE__ */ (0, _.jsx)("strong", { children: be(e) })]
			}),
			e.category === "Teile" && Array.isArray(e.details?.parts) && e.details.parts.length > 0 && /* @__PURE__ */ (0, _.jsxs)("section", {
				className: "market-detail-parts",
				children: [
					/* @__PURE__ */ (0, _.jsx)("h3", { children: "Enthaltene Teile" }),
					/* @__PURE__ */ (0, _.jsx)("ul", { children: e.details.parts.map((e, t) => /* @__PURE__ */ (0, _.jsx)("li", { children: e }, `${e}-${t}`)) }),
					e.details.parts.length > 1 && /* @__PURE__ */ (0, _.jsx)("p", { children: "Der angezeigte Preis gilt für das gesamte Inserat." })
				]
			}),
			e.service && /* @__PURE__ */ (0, _.jsxs)("p", {
				className: "club-hint market-service-note",
				children: [
					o("Erstellt durch den Marktplatz-Service"),
					" (",
					e.service,
					")"
				]
			}),
			e.details && /* @__PURE__ */ (0, _.jsx)("dl", {
				className: "profile-facts",
				children: Object.entries({
					location: "Standort",
					condition: "Zustand",
					model: "Modell",
					year: "Baujahr",
					mileage: "Kilometerstand",
					exteriorColour: "Aussenfarbe",
					interiorColour: "Innenfarbe",
					colour: "Farbe",
					partCategory: "Teilebereich",
					restoration: "Restaurationsarbeiten"
				}).map(([t, n]) => e.details[t] ? /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: n }), /* @__PURE__ */ (0, _.jsx)("dd", { children: t === "model" && Array.isArray(e.details.models) ? e.details.models.join(", ") : e.details[t] })] }, t) : null)
			}),
			e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(de, { html: e.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", {
				className: "market-description",
				children: e.description
			}),
			/* @__PURE__ */ (0, _.jsxs)("p", {
				className: "market-seller",
				children: [
					"Angeboten von ",
					e.seller,
					" · ",
					new Date(e.createdAt).toLocaleDateString("de-CH")
				]
			}),
			e.status !== "publish" && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-notice",
				children: e.status === "pending" ? "In Prüfung" : "Entwurf / zurückgezogen"
			}),
			e.mine && /* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: f,
				onClick: i,
				children: o("Inserat bearbeiten")
			}),
			e.expiresAt && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
				o(new Date(e.expiresAt) < /* @__PURE__ */ new Date() ? "Abgelaufen am" : "Gültig bis"),
				" ",
				new Date(e.expiresAt).toLocaleDateString("de-CH")
			] }),
			!!e.documents?.length && /* @__PURE__ */ (0, _.jsxs)("section", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("PDF-Anhänge") }), t?.memberAccess ? /* @__PURE__ */ (0, _.jsx)("ul", { children: e.documents.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: e.url,
				download: !0,
				children: e.name
			}) }, e.key)) }) : /* @__PURE__ */ (0, _.jsx)("a", {
				href: we,
				children: o("Zum Herunterladen anmelden")
			})] }),
			(e.canReview || e.mine) && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "club-actions",
				children: (e.canReview ? ["approve", "reject"] : ["withdraw", "renew"]).map((n) => /* @__PURE__ */ (0, _.jsx)("button", {
					disabled: f,
					className: "club-secondary",
					onClick: async () => {
						p(!0);
						try {
							let i = new FormData();
							i.set("operation", n), i.set("id", String(e.id)), await Ee(i, t?.marketplaceNonce || ""), r();
						} catch (e) {
							d(e.message);
						} finally {
							p(!1);
						}
					},
					children: {
						approve: "Öffentlich freigeben",
						reject: "Ablehnen",
						withdraw: "Zurückziehen",
						renew: "Erneut zur Prüfung einreichen"
					}[n]
				}, n))
			}),
			u && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "market-error",
				role: "alert",
				children: u
			}),
			!e.sold && e.status === "publish" && (e.mine ? /* @__PURE__ */ (0, _.jsx)("div", {
				className: "market-sale-actions",
				children: m ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsx)("p", { children: "Als verkauft markieren? Das Inserat bleibt unter «Nur meine Inserate» sichtbar." }),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-cancel",
						disabled: f,
						onClick: () => g(!1),
						children: o("Zurück")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: f,
						onClick: async () => {
							p(!0), d("");
							let n = new FormData();
							n.set("operation", "sold"), n.set("id", String(e.id));
							try {
								await Ee(n, t?.marketplaceNonce || ""), r();
							} catch (e) {
								d(e instanceof Error ? e.message : "Speichern fehlgeschlagen.");
							} finally {
								p(!1);
							}
						},
						children: f ? "Wird gespeichert …" : "Verkauf bestätigen"
					})
				] }) : /* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-primary",
					onClick: () => g(!0),
					children: o("Als verkauft markieren")
				})
			}) : /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "market-seller-contact",
				onSubmit: async (n) => {
					n.preventDefault(), p(!0), d("");
					let r = new FormData(n.currentTarget);
					r.set("operation", "contact"), r.set("id", String(e.id));
					try {
						await Ee(r, t?.marketplaceNonce || await Te({ operation: "config" }).then((e) => e.nonce) || ""), l(!0);
					} catch (e) {
						d(e instanceof Error ? e.message : "Anfrage konnte nicht gesendet werden.");
					} finally {
						p(!1);
					}
				},
				children: [
					/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Verkäufer kontaktieren") }),
					/* @__PURE__ */ (0, _.jsx)("input", {
						name: "website",
						tabIndex: -1,
						autoComplete: "off",
						"aria-hidden": "true",
						className: "market-sr-only"
					}),
					c ? /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: o("Ihre Anfrage wurde an den Verkäufer gesendet.")
					}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Name *"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "name",
							required: !0,
							maxLength: 120,
							autoComplete: "name"
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail-Adresse *"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "email",
							type: "email",
							required: !0,
							maxLength: 254,
							autoComplete: "email"
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Telefon (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "phone",
							type: "tel",
							maxLength: 40,
							autoComplete: "tel"
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachricht *"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							name: "message",
							required: !0,
							maxLength: 2e3,
							rows: 4
						})] }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: f,
							children: f ? "Wird gesendet …" : "Anfrage senden"
						})
					] })
				]
			}))
		]
	});
}
//#endregion
//#region app/components/AgendaPage.tsx
var Ae = {
	information: "Details",
	scheduled: "Bald offen",
	open: "Anmelden",
	closed: "Geschlossen",
	full: "Ausgebucht",
	waiting: "Warteliste"
}, je = (e) => e ? new Date(e).toLocaleDateString("de-CH") : "–", Me = (e) => e.scope?.slug === "region" || e.region ? "Region" : e.scope?.slug === "external" ? "Extern" : "Club";
function Ne({ location: e }) {
	let [t, n] = (0, h.useState)(!1), r = (0, h.useId)(), i = (e || "").split("|").map((e) => e.trim()).filter(Boolean);
	if (!i.length) return /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: "–" });
	let a = i.length > 1 ? i[i.length - 1].replace(/^\d{4,5}\s+/, "") : "", o = [i[0], a].filter(Boolean).join(" | ");
	return i.length < 3 ? /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: o }) : /* @__PURE__ */ (0, _.jsxs)("span", {
		className: "agenda-place",
		children: [/* @__PURE__ */ (0, _.jsx)("button", {
			type: "button",
			className: "agenda-place-trigger",
			"aria-expanded": t,
			"aria-controls": r,
			title: i.join(", "),
			onClick: () => n((e) => !e),
			onBlur: () => n(!1),
			children: o
		}), t && /* @__PURE__ */ (0, _.jsx)("span", {
			className: "agenda-place-popover",
			id: r,
			role: "tooltip",
			children: i.join("\n")
		})]
	});
}
function Pe({ event: e, memberAccess: t }) {
	let n = (0, h.useId)(), [r, i] = (0, h.useState)(!1), [a, s] = (0, h.useState)(!1), [c, l] = (0, h.useState)(null), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(0);
	return (0, h.useEffect)(() => {
		if (!r || !t) return;
		let n = new AbortController();
		return C("strc_registration", {
			operation: "roster",
			eventId: String(e.id)
		}, n.signal).then((e) => {
			l(e.participants), d("");
		}).catch((e) => {
			n.signal.aborted || d(e.message);
		}), () => n.abort();
	}, [
		r,
		t,
		e.id,
		f
	]), t ? /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "agenda-participants",
		onMouseEnter: () => i(!0),
		onMouseLeave: () => {
			a || i(!1);
		},
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || (i(!1), s(!1));
		},
		onKeyDown: (e) => {
			e.key === "Escape" && (i(!1), s(!1));
		},
		children: [/* @__PURE__ */ (0, _.jsxs)("button", {
			className: "participant-trigger",
			type: "button",
			"aria-expanded": r,
			"aria-controls": n,
			onFocus: (e) => {
				e.target.matches(":focus-visible") && i(!0);
			},
			onClick: () => {
				s(!a), i(!a);
			},
			children: [
				e.participantCount ?? 0,
				" ",
				o("Teilnehmende")
			]
		}), r && /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "participant-popover",
			id: n,
			role: "region",
			"aria-label": "Teilnehmende und Fahrzeuge",
			children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: "Angemeldete Teilnehmende" }),
				u ? /* @__PURE__ */ (0, _.jsxs)("p", {
					role: "alert",
					children: [u, /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						onClick: () => p((e) => e + 1),
						children: o("Erneut laden")
					})]
				}) : c === null ? /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Wird geladen …")
				}) : c.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: c.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [e.name, e.vehicle.model && /* @__PURE__ */ (0, _.jsxs)("span", { children: [" · ", [
					e.vehicle.model,
					e.vehicle.year,
					e.vehicle.color
				].filter(Boolean).join(", ")] })] }, t)) }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Noch keine bestätigten Anmeldungen.") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "participant-close",
					type: "button",
					onClick: () => {
						i(!1), s(!1);
					},
					children: o("Schliessen")
				})
			]
		})]
	}) : /* @__PURE__ */ (0, _.jsxs)("span", { children: [
		e.participantCount ?? 0,
		" ",
		/* @__PURE__ */ (0, _.jsx)("small", { children: "· Liste für Mitglieder" })
	] });
}
function Fe({ events: e, eventsState: t, retryEvents: n, openEvent: r, memberAccess: i }) {
	let { text: a } = ue(), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)([]), [d, f] = (0, h.useState)(""), [p, m] = (0, h.useState)(!0), [g, v] = (0, h.useState)(0);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		async function t() {
			let t = [], n = 1, r = 1;
			do {
				let i = await fetch(`${y}/?rest_route=/strc/v1/events&view=past&limit=100&page=${n}`, {
					signal: e.signal,
					cache: "no-store"
				});
				if (!i.ok) throw Error("Vergangene Termine konnten nicht geladen werden.");
				let a = await i.json();
				t.push(...a.events), r = a.pages || 1, n++;
			} while (n <= r);
			e.signal.aborted || (u(t), f(""));
		}
		return t().catch((t) => {
			e.signal.aborted || f(t.message);
		}).finally(() => {
			e.signal.aborted || m(!1);
		}), () => e.abort();
	}, [g]);
	let b = a("agenda.intro").split("|").map((e) => e.trim().replace("Club-Anlässe", "Clubanlässe")), x = [
		["", "Alle Events"],
		["club-national", b.length === 3 ? b[0] : a("agenda.clubTitle")],
		["region", b.length === 3 ? b[1] : a("agenda.regionalTitle")],
		["external", b.length === 3 ? b[2] : a("agenda.externalTitle")]
	], S = (e, t = !1) => e.filter((e) => !s || e.scope?.slug === s).sort((e, n) => (Date.parse(e.startAt) - Date.parse(n.startAt)) * (t ? -1 : 1)), C = S(e), w = S(l, !0);
	function T(e, t = !1) {
		return /* @__PURE__ */ (0, _.jsxs)("table", {
			className: "agenda-table",
			children: [
				/* @__PURE__ */ (0, _.jsx)("caption", {
					className: "sr-only",
					children: t ? "Vergangene Veranstaltungen" : "Kommende Veranstaltungen"
				}),
				/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsx)("tr", { children: [
					"Datum",
					"Veranstaltung",
					"Bereich",
					"Ort",
					"Plätze",
					"Offen bis",
					"Teilnehmende",
					"Anmeldung"
				].map((e) => /* @__PURE__ */ (0, _.jsx)("th", {
					scope: "col",
					children: e
				}, e)) }) }),
				/* @__PURE__ */ (0, _.jsx)("tbody", { children: e.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", {
					className: t ? "is-past" : "",
					children: [
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Datum",
							children: je(e.startAt)
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Veranstaltung",
							children: /* @__PURE__ */ (0, _.jsx)("button", {
								className: "agenda-event-title",
								onClick: () => r(e),
								children: e.title
							})
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Bereich",
							title: e.region?.name || void 0,
							children: o(Me(e))
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Ort",
							children: /* @__PURE__ */ (0, _.jsx)(Ne, { location: e.location })
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Plätze",
							className: "agenda-seats",
							children: e.capacity > 0 ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [
								t ? e.participantCount ?? 0 : Math.max(0, e.capacity - (e.occupiedCount ?? e.participantCount ?? 0)),
								" / ",
								e.capacity,
								" ",
								t ? "angemeldet" : "frei"
							] }), /* @__PURE__ */ (0, _.jsx)("meter", {
								min: 0,
								max: e.capacity,
								low: e.capacity * .7,
								high: e.capacity * .9,
								optimum: 0,
								value: Math.min(e.capacity, e.occupiedCount ?? e.participantCount ?? 0),
								"aria-label": "Belegte Personenplätze"
							})] }) : /* @__PURE__ */ (0, _.jsx)("span", { children: e.registrationRequired ? "Ohne Begrenzung" : "–" })
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Offen bis",
							children: je(e.registrationCloseAt)
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Teilnehmende",
							children: /* @__PURE__ */ (0, _.jsx)(Pe, {
								event: e,
								memberAccess: i
							})
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Anmeldung",
							children: !t && ["open", "waiting"].includes(e.registrationStatus) ? /* @__PURE__ */ (0, _.jsx)("a", {
								className: "agenda-register",
								href: e.externalRegistrationUrl || "#veranstaltung/" + e.id,
								...e.externalRegistrationUrl ? {
									target: "_blank",
									rel: "noopener noreferrer"
								} : {},
								children: e.externalRegistrationUrl ? "Extern anmelden ↗" : Ae[e.registrationStatus]
							}) : /* @__PURE__ */ (0, _.jsx)("button", {
								className: "agenda-status",
								onClick: () => r(e),
								children: t ? "Rückblick" : Ae[e.registrationStatus]
							})
						})
					]
				}, e.id)) })
			]
		});
	}
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Veranstaltungen")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: a("agenda.title") }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: b.length === 3 ? b.join(" · ") : a("agenda.intro") })
			]
		}),
		/* @__PURE__ */ (0, _.jsx)(K, { documentKey: "agenda" }),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content agenda-overview",
			children: [
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "agenda-toolbar",
					children: /* @__PURE__ */ (0, _.jsx)("div", {
						className: "agenda-tabs",
						role: "group",
						"aria-label": "Veranstaltungsbereich",
						children: x.map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("button", {
							"aria-pressed": s === e,
							onClick: () => c(e),
							children: t
						}, e))
					})
				}),
				/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Kommende Veranstaltungen") }),
				t === "loading" ? /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Termine werden geladen …")
				}) : t === "error" ? /* @__PURE__ */ (0, _.jsxs)("p", {
					role: "alert",
					children: [
						o("Agenda nicht erreichbar."),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							onClick: n,
							children: o("Erneut laden")
						})
					]
				}) : C.length ? T(C) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state",
					children: o("Keine passenden kommenden Termine.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("details", {
					className: "agenda-past",
					children: [/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
						"Vergangene Veranstaltungen (",
						w.length,
						")"
					] }), p ? /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: o("Wird geladen …")
					}) : d ? /* @__PURE__ */ (0, _.jsxs)("p", {
						role: "alert",
						children: [d, /* @__PURE__ */ (0, _.jsx)("button", {
							onClick: () => {
								m(!0), v((e) => e + 1);
							},
							children: o("Erneut laden")
						})]
					}) : w.length ? T(w, !0) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine passenden vergangenen Veranstaltungen.") })]
				})
			]
		})
	] });
}
//#endregion
//#region app/components/RichEditor.tsx
var Ie = `${window.strcSettings.assetBase ?? ""}/fonts/StrcSans`, Le = `@font-face{font-family:"STRC Sans";src:url(${Ie}-Regular.ttf) format("truetype");font-weight:400;size-adjust:109%}@font-face{font-family:"STRC Sans";src:url(${Ie}-Bold.ttf) format("truetype");font-weight:700;size-adjust:109%}@font-face{font-family:"STRC Sans";src:url(${Ie}-Italic.ttf) format("truetype");font-weight:400;font-style:italic;size-adjust:109%}`;
function Re({ label: e, value: t, onChange: n, disabled: r = !1 }) {
	let i = "strc-editor-" + (0, h.useId)().replace(/[^a-z0-9]/gi, ""), a = (0, h.useRef)(n), s = (0, h.useRef)(t), c = (0, h.useRef)(r), l = (0, h.useRef)([]), u = (0, h.useRef)(!1), [d, f] = (0, h.useState)(!1), [p, m] = (0, h.useState)(null), g = (0, h.useRef)(null), v = (0, h.useRef)(null), y = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		a.current = n;
	}, [n]), (0, h.useEffect)(() => {
		let e = 0, t = !1, n, r = () => {
			if (!t) {
				if (!window.wp?.editor) {
					if (++e < 80) {
						n = setTimeout(r, 100);
						return;
					}
					f(!0);
					return;
				}
				window.wp.editor.initialize(i, {
					tinymce: {
						wpautop: !0,
						menubar: !1,
						height: 280,
						plugins: "lists,paste,wordpress",
						toolbar1: "undo redo | strcparagraph strcheading | bold italic | bullist numlist outdent indent | blockquote | strclink unlink | removeformat",
						toolbar2: "",
						block_formats: "Absatz=p;Überschrift 2=h2;Überschrift 3=h3",
						content_style: Le + "body{font-family:\"STRC Sans\",Arial,sans-serif;font-size:18px;line-height:1.65;color:#13202b}img{max-width:100%;height:auto}p,h2,h3,h4,span.strc-tab{white-space:pre-wrap;tab-size:8}",
						setup: (e) => {
							e.on("keydown", (t) => {
								if (t.key === "Escape") {
									t.preventDefault(), t.stopImmediatePropagation(), y.current?.focus();
									return;
								}
								if (t.key !== "Tab" || t.ctrlKey || t.metaKey || t.altKey || e.selection.getNode().closest("li") || c.current) return;
								if (t.shiftKey) {
									let n = e.selection.getRng(), r = n.startContainer, i = n.startOffset;
									n.collapsed && r.nodeType === Node.TEXT_NODE && i > 0 && r.textContent?.[i - 1] === "	" && (t.preventDefault(), t.stopImmediatePropagation(), n.setStart(r, i - 1), n.deleteContents(), a.current(e.getContent()));
									return;
								}
								t.preventDefault(), t.stopImmediatePropagation(), e.execCommand("mceInsertContent", !1, "<span class=\"strc-tab\">&#9;</span>");
								let n = e.getContent();
								l.current.push(n), a.current(n);
							}), e.addButton("strcparagraph", {
								text: "Absatz",
								onclick: () => e.execCommand("FormatBlock", !1, "p")
							}), e.addButton("strcheading", {
								text: "Überschrift",
								onclick: () => e.execCommand("FormatBlock", !1, "h2")
							}), e.addButton("strclink", {
								icon: "link",
								tooltip: "Link einfügen / ändern",
								onclick: () => {
									g.current = e.selection.getBookmark(), m(e.selection.getNode().closest("a")?.getAttribute("href") || "");
								}
							}), e.on("init", () => {
								u.current = !0, e.setContent(s.current), u.current = !1;
								let t = c.current ? "readonly" : "design";
								e.mode ? e.mode.set(t) : e.setMode?.(t);
							}), e.on("change input undo redo", () => {
								if (u.current) return;
								let t = e.getContent();
								l.current.push(t), a.current(t);
							});
						}
					},
					quicktags: !1,
					mediaButtons: !1
				});
			}
		};
		return r(), () => {
			t = !0, clearTimeout(n), window.wp?.editor?.remove(i);
		};
	}, [i]), (0, h.useEffect)(() => {
		s.current = t;
		let e = window.tinymce?.get(i), n = l.current.lastIndexOf(t);
		if (n !== -1) {
			l.current.splice(0, n + 1);
			return;
		}
		if (!e?.initialized || e.getContent() === t) return;
		l.current = [];
		let r = e.hasFocus() ? e.selection.getBookmark(2, !0) : null;
		u.current = !0;
		try {
			e.setContent(t), r && e.selection.moveToBookmark(r);
		} finally {
			u.current = !1;
		}
	}, [i, t]), (0, h.useEffect)(() => {
		c.current = r;
		let e = window.tinymce?.get(i), t = r ? "readonly" : "design";
		e?.mode ? e.mode.set(t) : e?.setMode?.(t);
	}, [r, i]);
	let b = p !== null;
	(0, h.useEffect)(() => {
		b && v.current?.focus();
	}, [b]);
	function x() {
		let e = window.tinymce?.get(i);
		if (!e) return;
		let t = (p || "").trim();
		if (t && !/^(https?:\/\/|mailto:|tel:|#|\/(?!\/))/i.test(t)) {
			v.current?.setCustomValidity("Bitte eine vollständige Adresse mit https:// angeben."), v.current?.reportValidity();
			return;
		}
		e.focus(), e.selection.moveToBookmark(g.current), e.execCommand(t ? "mceInsertLink" : "unlink", !1, t ? { href: t } : void 0);
		let n = e.getContent();
		l.current.push(n), a.current(n), m(null);
	}
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "rich-editor",
		children: [
			/* @__PURE__ */ (0, _.jsx)("label", {
				htmlFor: i,
				children: e
			}),
			d && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: "Der Texteditor konnte nicht geladen werden. Bitte die Seite neu laden."
			}),
			/* @__PURE__ */ (0, _.jsx)("textarea", {
				id: i,
				defaultValue: t,
				style: {
					visibility: "hidden",
					height: 0
				},
				"aria-hidden": "true"
			}),
			p !== null && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "editorial-link",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Linkadresse", /* @__PURE__ */ (0, _.jsx)("input", {
						ref: v,
						value: p,
						placeholder: "https://…",
						onChange: (e) => {
							e.target.setCustomValidity(""), m(e.target.value);
						},
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), x());
						}
					})] }),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						onClick: x,
						children: "Link übernehmen"
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => m(null),
						children: o("Abbrechen")
					})
				]
			}),
			/* @__PURE__ */ (0, _.jsx)("button", {
				ref: y,
				type: "button",
				className: "market-text-button",
				children: o("Editor verlassen")
			}),
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: "Tab richtet Text aus. Escape verlässt den Editor. Für Listen «Aufzählung» oder «Nummerierung» wählen. Innerhalb einer Liste rückt Tab den Punkt ein, Umschalt+Tab aus. Die Pfeiltasten in der Werkzeugleiste funktionieren ebenfalls."
			})
		]
	});
}
//#endregion
//#region app/components/RoleAssignments.tsx
var ze = {
	strc_registration_moderator: "Mitgliederverwaltung",
	strc_event_organiser: "Veranstaltungsorganisator",
	strc_regional_manager: "Regionalleiter",
	strc_forum_moderator: "Forum-Moderator",
	strc_gallery_moderator: "Galerie-Moderator",
	strc_marketplace_moderator: "Marktplatz-Moderator",
	strc_library_administrator: "Bibliotheksverwalter",
	strc_shop_manager: "Shopmanager",
	strc_treasurer: "Kassier",
	strc_administrator_editor: "Redaktor",
	strc_administrator: "Administrator",
	strc_board_member: "Vorstand",
	strc_developer: "Webmaster",
	strc_moderator: "Bisherige Bereichszuständigkeit"
}, Be = (e) => e === "strc_board_member" ? "Vorstand" : "Moderator", Ve = {
	strc_board_member: "is-board",
	strc_administrator: "is-admin",
	strc_developer: "is-admin",
	strc_registration_moderator: "is-members",
	strc_treasurer: "is-members"
};
function He({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(0), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_editorial", { operation: "people" }, e.signal).then((e) => {
			n(e), i(null), y("");
		}).catch((t) => {
			e.signal.aborted || y(t.message);
		}), () => e.abort();
	}, [u]);
	function S(e, t) {
		r && i({
			...r,
			assignments: r.assignments.map((n, r) => r === e ? {
				...n,
				...t
			} : n)
		});
	}
	async function E() {
		if (r) {
			p(!0), y(""), x("");
			try {
				let t = await w("strc_editorial", e, T({
					operation: "assign",
					userId: String(r.id),
					revision: r.revision,
					assignments: JSON.stringify(r.assignments)
				})), a = {
					...r,
					...t
				};
				i(a), n((e) => e && {
					...e,
					users: e.users.map((e) => e.id === a.id ? a : e)
				}), x("Rollen und Zuständigkeiten gespeichert.");
			} catch (e) {
				y(e.message);
			} finally {
				p(!1);
			}
		}
	}
	let D = !!t && (!!t.roleOptions.strc_developer || !r?.assignments.some((e) => ["strc_administrator", "strc_developer"].includes(e.role))), O = a.trim().toLocaleLowerCase("de-CH"), k = t?.users.filter((e) => `${e.name} ${e.city}`.toLocaleLowerCase("de-CH").includes(O)) || [], A = (t?.users.filter((e) => e.assignments.length > 0) || []).sort((e, t) => e.name.localeCompare(t.name, "de-CH")), j = m ? A.filter((e) => e.assignments.some((e) => e.role === m)) : A, M = (e) => {
		s(""), i({
			...e,
			assignments: e.assignments.map((e) => ({
				...e,
				regions: [...e.regions],
				areas: [...e.areas],
				assignedEvents: [...e.assignedEvents]
			}))
		}), l(""), x(""), y("");
	};
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "role-assignment-panel",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Rollen und Zuständigkeiten") }),
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o("Mitglieder haben ohne Rolle Zugriff auf alle Mitgliederunterlagen. Rollen teilen nur Administratoren zu; ein Mitglied kann mehrere Rollen haben.")
			}),
			v && /* @__PURE__ */ (0, _.jsxs)("p", {
				role: "alert",
				children: [
					o(v),
					" ",
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => d((e) => e + 1),
						disabled: f,
						children: o("Neu laden")
					})
				]
			}),
			b && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o(b)
			}),
			t ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitgliedersuche"), /* @__PURE__ */ (0, _.jsx)("input", {
					type: "search",
					value: a,
					onChange: (e) => {
						s(e.target.value), i(null), l(""), x("");
					},
					disabled: f
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Person | Ort (Suchresultat)"), /* @__PURE__ */ (0, _.jsxs)("select", {
					value: r?.id || "",
					disabled: f,
					onChange: (e) => {
						let n = t.users.find((t) => t.id === Number(e.target.value));
						n ? M(n) : i(null);
					},
					children: [/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: o("Person wählen")
					}), k.map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
						value: e.id,
						children: [e.name, e.city ? " | " + e.city : ""]
					}, e.id))]
				})] }),
				!k.length && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine passenden Personen gefunden.") }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "role-assignment-columns",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [
						/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Rollenzuteilung") }),
						r && !D && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Dieses Konto verwaltet der Webmaster.") }),
						r ? /* @__PURE__ */ (0, _.jsxs)("fieldset", {
							disabled: f || !D,
							children: [
								/* @__PURE__ */ (0, _.jsxs)("legend", { children: [
									r.name,
									" ",
									r.city ? "| " + r.city : ""
								] }),
								r.assignments.map((e, n) => {
									let a = !!t.roleOptions[e.role] || e.role === "strc_moderator", s = [
										"strc_regional_manager",
										"strc_event_organiser",
										"strc_moderator"
									].includes(e.role);
									return /* @__PURE__ */ (0, _.jsxs)("section", {
										className: "role-assignment-row",
										children: [
											/* @__PURE__ */ (0, _.jsx)("strong", { children: o(ze[e.role] || t.roleOptions[e.role] || e.role) }),
											s && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Region"), /* @__PURE__ */ (0, _.jsx)("select", {
												multiple: !0,
												"aria-label": o("Region"),
												disabled: !a || !s,
												value: e.regions.map(String),
												onChange: (e) => S(n, { regions: Array.from(e.target.selectedOptions, (e) => Number(e.value)) }),
												children: t.regions.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
													value: e.id,
													children: e.name
												}, e.id))
											})] }),
											!s && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Clubweite Funktion") }),
											/* @__PURE__ */ (0, _.jsxs)("p", {
												className: "role-assignment-docs",
												children: [
													o("Bibliothek"),
													": ",
													/* @__PURE__ */ (0, _.jsx)("strong", { children: o(Be(e.role)) }),
													"-",
													o("Dokumente")
												]
											}),
											e.role === "strc_event_organiser" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zugewiesene Veranstaltungen"), /* @__PURE__ */ (0, _.jsx)("select", {
												multiple: !0,
												value: e.assignedEvents.map(String),
												disabled: !a,
												onChange: (e) => S(n, { assignedEvents: Array.from(e.target.selectedOptions, (e) => Number(e.value)) }),
												children: t.events.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
													value: e.id,
													children: e.title
												}, e.id))
											})] }),
											e.role === "strc_moderator" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bereiche"), /* @__PURE__ */ (0, _.jsx)("select", {
												multiple: !0,
												value: e.areas,
												onChange: (e) => S(n, { areas: Array.from(e.target.selectedOptions, (e) => e.value) }),
												children: Object.entries(t.areas).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
													value: e,
													children: o(t)
												}, e))
											})] }),
											a && /* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												type: "button",
												onClick: () => i({
													...r,
													assignments: r.assignments.filter((e, t) => t !== n)
												}),
												children: o("Funktion entfernen")
											})
										]
									}, e.role);
								}),
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Funktion"), /* @__PURE__ */ (0, _.jsxs)("select", {
									value: c,
									onChange: (e) => l(e.target.value),
									disabled: !r.isMember,
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), Object.entries(t.roleOptions).filter(([e]) => !r.assignments.some((t) => t.role === e)).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
										value: e,
										children: o(ze[e] || t)
									}, e))]
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "club-secondary",
									disabled: !c || !r.isMember,
									onClick: () => {
										i({
											...r,
											assignments: [...r.assignments, {
												role: c,
												regions: [],
												libraryAccess: c === "strc_board_member" ? "restricted" : "limited",
												assignedEvents: [],
												areas: []
											}]
										}), l("");
									},
									children: o("Funktion hinzufügen")
								}),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-primary",
									onClick: () => void E(),
									children: o("Rollen und Zuständigkeiten speichern")
								})
							]
						}) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Wähle zuerst ein Mitglied.") })
					] }), /* @__PURE__ */ (0, _.jsxs)("aside", { children: [
						/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
							o("Zugeteilte Rollen"),
							" · ",
							j.length
						] }),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "role-assignment-filter",
							children: [o("Filter"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: m,
								onChange: (e) => g(e.target.value),
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Rollen")
								}), Array.from(new Set(A.flatMap((e) => e.assignments.map((e) => e.role)))).sort((e, t) => o(ze[e] || e).localeCompare(o(ze[t] || t), "de-CH")).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(ze[e] || t.roleOptions[e] || e)
								}, e))]
							})]
						}),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "role-assignment-table-wrap",
							children: /* @__PURE__ */ (0, _.jsxs)("table", {
								className: "role-assignment-table",
								children: [/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsxs)("tr", { children: [/* @__PURE__ */ (0, _.jsx)("th", { children: o("Mitglied") }), /* @__PURE__ */ (0, _.jsx)("th", { children: o("Rollen") })] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: j.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", {
									className: r?.id === e.id ? "is-selected" : "",
									children: [/* @__PURE__ */ (0, _.jsxs)("td", { children: [/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "card-title-button",
										disabled: f,
										onClick: () => M(e),
										children: e.name
									}), e.city && /* @__PURE__ */ (0, _.jsx)("small", { children: e.city })] }), /* @__PURE__ */ (0, _.jsx)("td", { children: /* @__PURE__ */ (0, _.jsx)("div", {
										className: "role-chips",
										children: e.assignments.map((e) => /* @__PURE__ */ (0, _.jsxs)("span", {
											className: "role-chip " + (Ve[e.role] || ""),
											children: [o(ze[e.role] || e.role), e.regions.length ? " (" + e.regions.map((e) => t.regions.find((t) => t.id === e)?.name || String(e)).join(", ") + ")" : ""]
										}, e.role))
									}) })]
								}, e.id)) })]
							})
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: o("Bibliothek: Jede Clubfunktion sieht die Moderator-Dokumente, nur die Rolle Vorstand zusätzlich die Vorstandsdokumente.")
						})
					] })]
				})
			] }) : /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Mitglieder werden geladen …")
			})
		]
	});
}
//#endregion
//#region app/components/HomepageCuration.tsx
function Ue({ nonce: e }) {
	let { language: t } = n(), i = (e, n) => t === "fr" ? n : e, [a, o] = (0, h.useState)(null), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(""), [d, f] = (0, h.useState)(!1), [p, m] = (0, h.useState)(0);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_editorial", { operation: "highlights" }, e.signal).then(o).catch((t) => {
			e.signal.aborted || c(t.message);
		}), () => e.abort();
	}, [p]);
	async function g() {
		if (a) {
			f(!0), c(""), u("");
			try {
				o(await w("strc_editorial", e, T({
					operation: "highlights-save",
					revision: String(a.revision),
					mode: a.mode,
					ids: JSON.stringify(a.ids)
				}))), u(i("Auswahl veröffentlicht. Die Startseite zeigt drei Beiträge aus dieser Auswahl.", "Sélection publiée. La page d’accueil affiche trois publications de cette sélection."));
			} catch (e) {
				c(e.message);
			} finally {
				f(!1);
			}
		}
	}
	let v = {
		news: i("Clubnews", "Actualités du club"),
		event: i("Veranstaltung", "Événement"),
		forum: i("Forum · nur für Mitglieder", "Forum · réservé aux membres")
	};
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "editorial-document",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: i("Startseitenübersicht", "Vue d’ensemble de l’accueil") }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: i("«Das Neueste» zeigt höchstens drei Beiträge. Bei mehr als drei verfügbaren Beiträgen wechselt die Auswahl beim Neuladen oder an einem neuen Tag. Die neuesten zwölf Beiträge bilden den automatischen Vorrat.", "La rubrique des dernières nouvelles affiche jusqu’à trois publications. Avec plus de trois publications disponibles, la sélection change au rechargement ou lors d’un nouveau jour. Le mode automatique utilise les douze publications les plus récentes.") }),
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: i("Nur veröffentlichte Clubnews, kommende Veranstaltungen und veröffentlichte Forumthemen sind wählbar. Forumthemen bleiben ausschliesslich für Mitglieder sichtbar. Die Agenda zeigt unabhängig davon die nächsten drei Termine.", "La sélection comprend les actualités publiées, les événements à venir et les sujets publiés du forum. Le forum reste réservé aux membres. L’agenda affiche indépendamment les trois prochains événements.")
			}),
			a ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("fieldset", {
				disabled: d,
				children: [
					/* @__PURE__ */ (0, _.jsx)("legend", { children: i("Auswahl für «Das Neueste»", "Sélection des dernières nouvelles") }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [i("Beiträge auswählen", "Choisir les publications"), /* @__PURE__ */ (0, _.jsxs)("select", {
						value: a.mode,
						onChange: (e) => {
							o({
								...a,
								mode: e.target.value
							}), u("");
						},
						children: [/* @__PURE__ */ (0, _.jsx)("option", {
							value: "automatic",
							children: i("Automatisch: neueste Beiträge", "Automatique : publications récentes")
						}), /* @__PURE__ */ (0, _.jsx)("option", {
							value: "selected",
							children: i("Auswahl durch die Redaktion", "Sélection par la rédaction")
						})]
					})] }),
					a.mode === "selected" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsxs)("p", { children: [
							a.ids.length,
							"/12 ",
							i("Beiträge ausgewählt", "publications sélectionnées")
						] }),
						a.items.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", {
							className: "editorial-check",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: a.ids.includes(e.id),
								disabled: !a.ids.includes(e.id) && a.ids.length >= 12,
								onChange: (t) => {
									o({
										...a,
										ids: t.target.checked ? [...a.ids, e.id] : a.ids.filter((t) => t !== e.id)
									}), u("");
								}
							}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.title }), /* @__PURE__ */ (0, _.jsxs)("small", {
								className: "homepage-curation-meta",
								children: [
									v[e.kind],
									" · ",
									new Date(e.date).toLocaleDateString(r())
								]
							})] })]
						}, e.id)),
						a.ids.some((e) => !a.items.some((t) => t.id === e)) && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
							i("Nicht mehr verfügbare Beiträge wurden ausgeblendet.", "Les publications indisponibles ont été masquées."),
							" ",
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "home-text-link",
								onClick: () => o({
									...a,
									ids: a.ids.filter((e) => a.items.some((t) => t.id === e))
								}),
								children: i("Auswahl bereinigen", "Nettoyer la sélection")
							})
						] })
					] })
				]
			}), /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "editorial-save",
				children: [/* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-primary",
					disabled: d,
					onClick: () => void g(),
					children: d ? i("Wird gespeichert …", "Enregistrement…") : i("Auswahl veröffentlichen", "Publier la sélection")
				}), /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#",
					children: i("Startseite ansehen", "Voir la page d’accueil")
				})]
			})] }) : !s && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: i("Auswahl wird geladen …", "Chargement de la sélection…")
			}),
			s && /* @__PURE__ */ (0, _.jsxs)("p", {
				role: "alert",
				children: [
					s,
					" ",
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "home-text-link",
						disabled: d,
						onClick: () => {
							c(""), m((e) => e + 1);
						},
						children: i("Neu laden", "Recharger")
					})
				]
			}),
			l && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: l
			})
		]
	});
}
//#endregion
//#region app/components/PublicDocuments.tsx
function We({ docKey: e, nonce: t, disabled: n, uploadState: r, regional: i = !1 }) {
	let [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(null), [m, g] = (0, h.useState)(!1), [v, y] = (0, h.useState)(null), [b, x] = (0, h.useState)(""), [S, E] = (0, h.useState)({});
	(0, h.useEffect)(() => {
		let t = new AbortController();
		return C("strc_editorial", {
			operation: "documents",
			key: e
		}, t.signal).then((e) => s(e.documents)).catch((e) => {
			t.signal.aborted || l(e.message);
		}), () => t.abort();
	}, [e]);
	async function D(a) {
		if (!(m || n)) {
			if (a.size > 50 * 1024 * 1024) {
				l("Bitte ein PDF bis 50 MB wählen.");
				return;
			}
			g(!0), r(!0), l(""), d("");
			try {
				let n = new FormData();
				n.set("operation", "upload-document"), n.set("key", e), n.set("title", b.trim()), n.set("file", a);
				let r = await w("strc_editorial", t, n);
				s((e) => [r, ...e]), x(""), d(i ? "PDF hochgeladen. Es ist auf der Regionalseite unter «Dokumente» sichtbar." : "PDF hochgeladen.");
			} catch (e) {
				l(e.message);
			} finally {
				g(!1), r(!1);
			}
		}
	}
	async function O(n) {
		g(!0), l(""), d("");
		try {
			s((await w("strc_editorial", t, T({
				operation: "delete-document",
				key: e,
				id: String(n)
			}))).documents), y(null), d("PDF gelöscht.");
		} catch (e) {
			l(e.message);
		} finally {
			g(!1);
		}
	}
	async function k(n) {
		let r = (S[n] ?? "").trim();
		if (r) {
			g(!0), l(""), d("");
			try {
				s((await w("strc_editorial", t, T({
					operation: "rename-document",
					key: e,
					id: String(n),
					title: r
				}))).documents), E((e) => {
					let t = { ...e };
					return delete t[n], t;
				}), d("Titel gespeichert.");
			} catch (e) {
				l(e.message);
			} finally {
				g(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "editorial-pdfs",
		open: i || void 0,
		children: [
			/* @__PURE__ */ (0, _.jsx)("summary", { children: i ? "Dokumente (PDF) der Regionalseite" : "Öffentliche PDFs hochladen und verlinken" }),
			/* @__PURE__ */ (0, _.jsxs)("p", { children: [
				i ? "Hochgeladene PDFs erscheinen sofort auf der Regionalseite im Feld «Dokumente», mit dem Titel, den Sie hier vergeben (z. B. «Leitfaden für die Organisation von Veranstaltungen»)." : "Zum Beispiel Statuten: PDF hochladen, Link kopieren und über «Link einfügen» im Text verknüpfen.",
				" ",
				o("Diese Dateien sind öffentlich zugänglich. Interne Dokumente gehören in die"),
				" ",
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: "#bibliothek",
					children: o("Bibliothek")
				}),
				"."
			] }),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [
					o("Titel des Dokuments"),
					/* @__PURE__ */ (0, _.jsx)("input", {
						value: b,
						maxLength: 160,
						disabled: n || m,
						placeholder: o("z. B. Leitfaden für die Organisation von Veranstaltungen"),
						onChange: (e) => x(e.target.value)
					}),
					/* @__PURE__ */ (0, _.jsx)("small", { children: o("Leer lassen = Dateiname.") })
				] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("PDF bis 50 MB"), /* @__PURE__ */ (0, _.jsx)("input", {
					type: "file",
					accept: "application/pdf,.pdf",
					disabled: n || m,
					onChange: (e) => {
						let t = e.target.files?.[0];
						e.target.value = "", t && D(t);
					}
				})] })]
			}),
			m && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Bitte warten …")
			}),
			c && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: c
			}),
			u && !m && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				className: "club-hint",
				children: u
			}),
			/* @__PURE__ */ (0, _.jsx)("ul", { children: a.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: e.title
				}),
				/* @__PURE__ */ (0, _.jsxs)("span", {
					className: "editorial-pdf-title",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						"aria-label": "Titel von " + e.title,
						value: S[e.id] ?? e.title,
						maxLength: 160,
						disabled: m || n,
						onChange: (t) => {
							let n = t.target.value;
							E((t) => ({
								...t,
								[e.id]: n
							}));
						}
					}), S[e.id] !== void 0 && S[e.id] !== e.title && /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: m || n,
						onClick: () => void k(e.id),
						children: o("Titel speichern")
					})]
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					onClick: async () => {
						try {
							await navigator.clipboard.writeText(e.url), p(e.id);
						} catch {
							l("Bitte die Linkadresse im Feld markieren und kopieren.");
						}
					},
					children: o("Link kopieren")
				}),
				/* @__PURE__ */ (0, _.jsx)("input", {
					"aria-label": "Link zu " + e.title,
					value: e.url,
					readOnly: !0,
					onFocus: (e) => e.target.select()
				}),
				f === e.id && /* @__PURE__ */ (0, _.jsx)("span", {
					role: "status",
					children: o("Link kopiert.")
				}),
				v === e.id ? /* @__PURE__ */ (0, _.jsxs)("span", {
					className: "editorial-pdf-delete",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary is-danger",
						disabled: m,
						onClick: () => void O(e.id),
						children: o("Endgültig löschen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => y(null),
						children: o("Abbrechen")
					})]
				}) : /* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					disabled: m || n,
					onClick: () => y(e.id),
					children: o("Löschen")
				})
			] }, e.id)) })
		]
	});
}
//#endregion
//#region app/components/RegionalContent.tsx
var Ge = [
	"contactName",
	"contactRole",
	"contactImage",
	"contactImageFrame",
	"contactPhone",
	"contactEmail",
	"meetName",
	"meetAddress",
	"meetSchedule",
	"meetDates",
	"whatsappUrl",
	"whatsappQr",
	"body",
	"news",
	"eventBody"
];
function Ke({ documentKey: e, values: t = {}, events: n, canEdit: r = !1 }) {
	let { refresh: i } = ue(), [a, s] = (0, h.useState)(null), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(""), [b, x] = (0, h.useState)(!1), S = a ? a.values : t, E = (e) => typeof S[e] == "string" ? S[e] : "", D = e === "triungsters", O = (e, t) => E(e).replace(/<[^>]+>/g, "").trim() ? /* @__PURE__ */ (0, _.jsx)(de, { html: E(e) }) : /* @__PURE__ */ (0, _.jsx)("p", {
		className: "regional-empty",
		children: o(t)
	}), k = /^https:\/\//i.test(E("whatsappUrl")) ? E("whatsappUrl") : "", A = !!a && JSON.stringify(a.values) !== JSON.stringify(a.doc.values), j = c || u;
	(0, h.useEffect)(() => {
		if (!A) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [A]);
	async function M() {
		l(!0), p(""), g("");
		try {
			let t = await fetch(`${y}/wp-admin/admin-ajax.php?action=strc_session`, { credentials: "include" }).then((e) => e.json()), n = await C("strc_editorial", {
				operation: "document",
				key: e
			});
			s({
				doc: n,
				values: n.values,
				nonce: t.editorialNonce || ""
			}), n.hasDraft && g(o("Sie bearbeiten einen gespeicherten Entwurf. Besucher sehen noch die veröffentlichte Fassung."));
		} catch (e) {
			p(e.message);
		} finally {
			l(!1);
		}
	}
	async function ee(t) {
		if (!(!a || j)) {
			l(!0), p(""), g("");
			try {
				let n = await w("strc_editorial", a.nonce, T({
					operation: "save",
					key: e,
					revision: String(a.doc.revision),
					mode: t,
					values: JSON.stringify(a.values)
				}));
				t === "publish" ? (await i(), s(null), g(o("Veröffentlicht. Die Regionalseite zeigt jetzt die neue Fassung."))) : (s({
					...a,
					doc: n,
					values: n.values
				}), g(o("Entwurf gespeichert. Besucher sehen weiterhin die veröffentlichte Fassung.")));
			} catch (e) {
				p(e.message);
			} finally {
				l(!1);
			}
		}
	}
	function N() {
		if (A && !b) {
			x(!0);
			return;
		}
		x(!1), s(null), p(""), g("");
	}
	let P = (e) => a?.doc.schema.fields.find((t) => t.key === e && !t.translationOf), F = (e) => {
		let t = P(e);
		return !!a && !!t && (!!a.doc.canAdminister || !t.adminOnly);
	}, I = (e, t) => {
		s((n) => n && {
			...n,
			values: {
				...n.values,
				[e]: t
			}
		}), x(!1);
	}, L = (e, t) => o(P(e)?.label || t), R = (e, t, n = !1) => F(e) ? /* @__PURE__ */ (0, _.jsxs)("label", {
		className: "regional-edit-field",
		children: [L(e, t), n ? /* @__PURE__ */ (0, _.jsx)("textarea", {
			rows: 2,
			value: E(e).replace(/\s*\|\s*/g, "\n"),
			onChange: (t) => I(e, t.target.value),
			disabled: j
		}) : /* @__PURE__ */ (0, _.jsx)("input", {
			value: E(e),
			onChange: (t) => I(e, t.target.value),
			disabled: j
		})]
	}) : null, te = (e, t) => F(e) ? /* @__PURE__ */ (0, _.jsx)("div", {
		className: "regional-edit-field",
		children: /* @__PURE__ */ (0, _.jsx)(Re, {
			label: L(e, t),
			value: E(e),
			onChange: (t) => I(e, t),
			disabled: j
		})
	}) : null, z = (t, n) => F(t) && a ? /* @__PURE__ */ (0, _.jsx)(Tt, {
		label: L(t, n),
		value: E(t),
		changed: (e) => I(t, e),
		nonce: a.nonce,
		target: { key: e },
		uploadState: d
	}) : null, B = a?.doc.canAdminister ? a.doc.schema.fields.filter((e) => e.adminOnly && !e.translationOf && !e.legacy && !Ge.includes(e.key) && [
		"text",
		"textarea",
		"url",
		"rich",
		"image"
	].includes(e.type)) : [];
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "regional-content" + (a ? " is-editing" : ""),
		children: [
			/* @__PURE__ */ (0, _.jsx)("div", {
				className: "regional-toolbar",
				children: r ? a ? null : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					disabled: c,
					onClick: () => void M(),
					children: o(c ? "Wird geladen …" : D ? "TRiungsters-Seite bearbeiten" : "Diese Seite bearbeiten")
				}), !D && /* @__PURE__ */ (0, _.jsx)("a", {
					className: "market-primary",
					href: "#agenda-verwalten/neu/" + encodeURIComponent(e.replace(/^region-/, "")),
					children: o("Termin erstellen")
				})] }) : /* @__PURE__ */ (0, _.jsx)("a", {
					className: "club-secondary",
					href: "#mitglieder",
					children: o("Moderator-Login")
				})
			}),
			a && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "regional-edit-bar",
				role: "region",
				"aria-label": o("Bearbeitungsmodus"),
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Bearbeitungsmodus") }), /* @__PURE__ */ (0, _.jsx)("span", { children: o(A ? "Ungespeicherte Änderungen" : "Felder direkt in den Kästen ändern") })] }), /* @__PURE__ */ (0, _.jsx)("div", {
					className: "regional-edit-actions",
					children: b ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Änderungen verwerfen?") }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary is-danger",
							onClick: N,
							children: o("Verwerfen")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							onClick: () => x(!1),
							children: o("Weiter bearbeiten")
						})
					] }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							disabled: j,
							onClick: N,
							children: o("Beenden")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							disabled: j || !A,
							onClick: () => void ee("draft"),
							children: o("Entwurf speichern")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "market-primary",
							disabled: j,
							onClick: () => void ee("publish"),
							children: o(u ? "Bild wird hochgeladen …" : c ? "Bitte warten …" : "Veröffentlichen")
						})
					] })
				})]
			}),
			(f || m) && /* @__PURE__ */ (0, _.jsx)("p", {
				role: f ? "alert" : "status",
				className: f ? "collection-state error" : "club-notice",
				children: f || m
			}),
			a && B.length > 0 && /* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel regional-admin-panel",
				children: [
					/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Administration") }),
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-hint",
						children: o("Nur für die Administration sichtbar.")
					}),
					B.map((e) => e.type === "rich" ? /* @__PURE__ */ (0, _.jsx)("div", { children: te(e.key, e.label) }, e.key) : e.type === "image" ? /* @__PURE__ */ (0, _.jsx)("div", { children: z(e.key, e.label) }, e.key) : /* @__PURE__ */ (0, _.jsx)("div", { children: R(e.key, e.label, e.type === "textarea") }, e.key))
				]
			}),
			E("image") && /* @__PURE__ */ (0, _.jsxs)("figure", {
				className: "static-cover",
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					src: pe(E("image")),
					alt: E("imageAlt") || E("title"),
					width: 1440,
					height: 800,
					style: ge(E("imageFrame"))
				}), E("imageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: E("imageCaption") })]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "regional-grid",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Kontakt") }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "regional-contact",
								children: [E("contactImage") ? /* @__PURE__ */ (0, _.jsx)(v, {
									src: pe(E("contactImage")),
									alt: E("contactName") || o("Ansprechperson"),
									width: 160,
									height: 160,
									style: ge(E("contactImageFrame"), "cover")
								}) : /* @__PURE__ */ (0, _.jsx)("div", {
									className: "regional-avatar",
									"aria-hidden": "true",
									children: "◉"
								}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
									/* @__PURE__ */ (0, _.jsx)("h3", { children: E("contactName") || o("Ansprechperson folgt") }),
									/* @__PURE__ */ (0, _.jsx)("p", { children: E("contactRole") || o(D ? "TRiungsters-Kontakt" : "Regionalleitung") }),
									E("contactPhone") && /* @__PURE__ */ (0, _.jsx)("a", {
										href: "tel:" + E("contactPhone").replace(/[^+\d]/g, ""),
										children: E("contactPhone")
									}),
									E("contactEmail") && /* @__PURE__ */ (0, _.jsx)("a", {
										href: "mailto:" + encodeURIComponent(E("contactEmail")),
										children: E("contactEmail")
									})
								] })]
							}),
							a && (F("contactName") ? /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "regional-edit-group",
								children: [
									R("contactName", "Name"),
									R("contactRole", "Funktion"),
									R("contactPhone", "Telefon"),
									R("contactEmail", "E-Mail"),
									z("contactImage", "Porträt")
								]
							}) : /* @__PURE__ */ (0, _.jsx)("p", {
								className: "regional-edit-hint",
								children: o("Die Kontaktangaben pflegt die Administration.")
							}))
						]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel",
						children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Treffpunkt") }), a ? /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "regional-edit-group",
							children: [
								R("meetName", "Treffpunkt: Name"),
								R("meetAddress", "Treffpunkt: Adresse"),
								R("meetSchedule", "Rhythmus und Zeit", !0)
							]
						}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsx)("h3", { children: E("meetName") || o("Treffpunkt wird ergänzt") }),
							E("meetAddress") && /* @__PURE__ */ (0, _.jsx)("p", { children: E("meetAddress") }),
							E("meetSchedule") && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "regional-schedule",
								children: E("meetSchedule").replace(/\s*\|\s*/g, "\n")
							})
						] })]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel",
						children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Nächste Treffen") }), a ? te("meetDates", "Nächste Treffen") : O("meetDates", "Die nächsten Stammtischtermine werden hier ergänzt.")]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel regional-whatsapp",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: o("WhatsApp-Gruppe") }),
							E("whatsappQr") && /* @__PURE__ */ (0, _.jsx)(v, {
								src: pe(E("whatsappQr")),
								alt: o("QR-Code zur WhatsApp-Gruppe"),
								width: 180,
								height: 180
							}),
							/* @__PURE__ */ (0, _.jsx)("p", { children: o(k ? "In Verbindung bleiben und sich für die nächste Ausfahrt verabreden." : "Der Gruppenlink wird noch ergänzt.") }),
							k && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: k,
								target: "_blank",
								rel: "noopener noreferrer",
								children: o("Gruppe beitreten")
							}),
							a && (F("whatsappUrl") ? /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "regional-edit-group",
								children: [R("whatsappUrl", "Beitrittslink"), z("whatsappQr", "QR-Code als Bild")]
							}) : /* @__PURE__ */ (0, _.jsx)("p", {
								className: "regional-edit-hint",
								children: o("Die WhatsApp-Gruppe pflegt die Administration.")
							}))
						]
					})
				]
			}),
			/* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel",
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o(D ? "Über die TRiungsters" : "Regionale Informationen") }), a ? te("body", "Regionale Informationen") : O("body", "Informationen zu unserer Gemeinschaft folgen.")]
			}),
			a ? /* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel regional-documents",
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Dokumente") }), /* @__PURE__ */ (0, _.jsx)(We, {
					docKey: e,
					nonce: a.nonce,
					disabled: j,
					uploadState: d,
					regional: !0
				})]
			}) : /* @__PURE__ */ (0, _.jsx)(qe, { documentKey: e }),
			/* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel",
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o(D ? "TRiungsters-News" : "Regionale Neuigkeiten") }), a ? te("news", "Regionale Neuigkeiten") : O("news", "Noch keine Neuigkeiten veröffentlicht.")]
			}),
			/* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel regional-events-panel",
				children: [
					/* @__PURE__ */ (0, _.jsx)("h2", { children: o(D ? "Veranstaltungen" : "Regionale Veranstaltungen") }),
					a ? te("eventBody", "Text über der Terminliste") : E("eventBody") && /* @__PURE__ */ (0, _.jsx)(de, { html: E("eventBody") }),
					" ",
					n || /* @__PURE__ */ (0, _.jsxs)("p", {
						className: "regional-empty",
						children: [
							o("Neue Veranstaltungen werden hier angekündigt. Alle Termine findest du in der"),
							" ",
							/* @__PURE__ */ (0, _.jsx)("a", {
								href: "#agenda",
								children: o("Agenda")
							}),
							"."
						]
					})
				]
			}),
			a && /* @__PURE__ */ (0, _.jsxs)("p", {
				className: "regional-edit-hint",
				children: [
					o("Französische Texte und frühere Fassungen:"),
					" ",
					/* @__PURE__ */ (0, _.jsx)("a", {
						href: "#redaktion/" + e,
						children: o("im Redaktionsbereich öffnen")
					})
				]
			})
		]
	});
}
function qe({ documentKey: e }) {
	let [t, n] = (0, h.useState)([]);
	return (0, h.useEffect)(() => {
		let t = new AbortController();
		return C("strc_editorial", {
			operation: "public-documents",
			key: e
		}, t.signal).then((e) => n(e.documents)).catch(() => {}), () => t.abort();
	}, [e]), t.length ? /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "regional-panel regional-documents",
		children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Dokumente") }), /* @__PURE__ */ (0, _.jsx)("ul", { children: t.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("a", {
			href: e.url,
			target: "_blank",
			rel: "noopener noreferrer",
			children: [/* @__PURE__ */ (0, _.jsx)("span", {
				"aria-hidden": "true",
				children: "PDF"
			}), e.title]
		}) }, e.id)) })]
	}) : null;
}
//#endregion
//#region app/components/ArticleMedia.tsx
function Je(e) {
	let t = [], n = 0, r = 0, i = /<\/?([a-z][\w-]*)\b[^>]*>/gi, a;
	for (; a = i.exec(e);) {
		let o = a[1].toLowerCase(), s = a[0].startsWith("</");
		if (!s && ![
			"img",
			"br",
			"hr",
			"wbr",
			"input",
			"source"
		].includes(o) && !a[0].endsWith("/>") && r++, s && (r = Math.max(0, r - 1)), r === 0) {
			let r = i.lastIndex;
			t.push(e.slice(n, r)), n = r;
		}
	}
	return n < e.length && t.push(e.slice(n)), t.filter((e) => e.trim());
}
function Ye({ html: e, photos: t }) {
	let n = Je(e), r = /* @__PURE__ */ new Map();
	t.filter((e) => e.url).forEach((e, t) => {
		let i = Number(e.position ?? (t + 1) * 2), a = Math.min(n.length, Math.max(0, Number.isFinite(i) ? i : n.length));
		r.set(a, [...r.get(a) || [], e]);
	});
	let i = (e) => r.get(e)?.map((t, n) => /* @__PURE__ */ (0, _.jsxs)("figure", {
		className: "history-inline-photo",
		children: [/* @__PURE__ */ (0, _.jsx)(v, {
			src: pe(t.url),
			alt: t.alt,
			width: 900,
			height: 600,
			style: ge(t.frame)
		}), t.alt && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: t.alt })]
	}, e + ":" + n));
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "history-story",
		children: [i(0), n.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "history-text-block",
			children: [/* @__PURE__ */ (0, _.jsx)(de, { html: e }), i(t + 1)]
		}, t))]
	});
}
function Xe({ title: e, people: t, preview: n = !1, slots: r = 0 }) {
	let i = (r ? Array.from({ length: Math.max(r, t.length) }, (e, n) => t[n] || {
		image: "",
		name: "",
		role: ""
	}) : n ? t : t.filter((e) => e.name || e.image || e.role)).filter((e) => e.name || e.image || e.role || e.email);
	return i.length ? /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "organisation-people",
		children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: e }), /* @__PURE__ */ (0, _.jsx)("div", {
			className: "portrait-grid",
			children: i.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("article", {
				className: "portrait-card",
				children: [
					e.image && /* @__PURE__ */ (0, _.jsx)(v, {
						src: pe(e.image),
						alt: e.name ? `${o("Porträt von")} ${e.name}` : o("Porträt"),
						width: 400,
						height: 500,
						style: ge(e.frame, "cover")
					}),
					/* @__PURE__ */ (0, _.jsx)("h3", { children: e.name || o("Mitglied") }),
					e.role && /* @__PURE__ */ (0, _.jsx)("p", { children: e.role }),
					e.email && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "portrait-email",
						href: "mailto:" + encodeURIComponent(e.email),
						children: e.email
					})
				]
			}, t))
		})]
	}) : null;
}
//#endregion
//#region app/components/VehicleModels.tsx
var Ze = [
	"TR2",
	"TR3",
	"TR3A",
	"TR4",
	"TR4A",
	"TR5",
	"TR250",
	"TR6",
	"TR7",
	"TR8"
], Qe = [
	["years", "Bauzeit"],
	["engine", "Motor"],
	["displacement", "Hubraum"],
	["power", "Leistung"],
	["transmission", "Getriebe"],
	["production", "Stückzahl"]
], $e = (e, t) => typeof e[t] == "string" ? e[t] : "";
function et(e) {
	let t = W[e];
	return t ? Object.fromEntries(t.fields.map((e) => [e.key, e.default])) : {};
}
function tt({ model: e }) {
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "vehicle-placeholder",
		children: [
			/* @__PURE__ */ (0, _.jsx)("span", {
				className: "vehicle-placeholder-model",
				"aria-hidden": "true",
				children: e
			}),
			/* @__PURE__ */ (0, _.jsxs)("svg", {
				viewBox: "0 0 300 110",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, _.jsx)("path", { d: "M27 76h18m40 0h128m41 0h19l-4-20-33-9-31-21h-62l-34 22-60 9-16 9-6 10Z" }),
					/* @__PURE__ */ (0, _.jsx)("path", { d: "m119 47 28-17h54l23 17H119Zm-17 5 139-1M92 61h111" }),
					/* @__PURE__ */ (0, _.jsx)("circle", {
						cx: "65",
						cy: "77",
						r: "19"
					}),
					/* @__PURE__ */ (0, _.jsx)("circle", {
						cx: "234",
						cy: "77",
						r: "19"
					}),
					/* @__PURE__ */ (0, _.jsx)("circle", {
						cx: "65",
						cy: "77",
						r: "10"
					}),
					/* @__PURE__ */ (0, _.jsx)("circle", {
						cx: "234",
						cy: "77",
						r: "10"
					})
				]
			}),
			/* @__PURE__ */ (0, _.jsx)("span", {
				className: "vehicle-placeholder-label",
				children: o("Bild folgt")
			})
		]
	});
}
function nt({ values: e, model: t, unpublished: n = !1, preview: r = !1 }) {
	let i = $e(e, "image"), a = $e(e, "exampleNote");
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "vehicle-detail-content",
		children: [
			r && /* @__PURE__ */ (0, _.jsx)("h2", { children: $e(e, "title") || t }),
			(n || a) && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-example-note",
				children: n ? o("Beispielansicht · redaktioneller Inhalt noch nicht veröffentlicht") : a
			}),
			/* @__PURE__ */ (0, _.jsxs)("figure", {
				className: "vehicle-detail-cover",
				children: [
					i ? /* @__PURE__ */ (0, _.jsx)(v, {
						src: pe(i),
						alt: $e(e, "imageAlt") || t,
						width: 1e3,
						height: 600,
						style: ge(e.imageFrame)
					}) : /* @__PURE__ */ (0, _.jsx)(tt, { model: t }),
					" ",
					$e(e, "imageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: $e(e, "imageCaption") })
				]
			}),
			$e(e, "intro") && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-detail-intro",
				children: $e(e, "intro")
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "vehicle-detail-layout",
				children: [/* @__PURE__ */ (0, _.jsxs)("article", {
					className: `vehicle-detail-copy${$e(e, "bodySecondary").replace(/<[^>]*>/g, "").trim() ? " two-columns" : ""}`,
					children: [
						$e(e, "body") && /* @__PURE__ */ (0, _.jsx)(de, { html: $e(e, "body") }),
						" ",
						$e(e, "bodySecondary") && /* @__PURE__ */ (0, _.jsx)(de, { html: $e(e, "bodySecondary") })
					]
				}), /* @__PURE__ */ (0, _.jsxs)("aside", {
					className: "vehicle-factbox",
					children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: $e(e, "factsTitle") || o("Fahrzeugdaten") }), typeof e.factsBody == "string" ? /* @__PURE__ */ (0, _.jsx)(de, { html: e.factsBody }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dl", { children: Qe.filter(([t]) => $e(e, t)).map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(n) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: $e(e, t) })] }, t)) }), $e(e, "factsNote") && /* @__PURE__ */ (0, _.jsx)(de, { html: $e(e, "factsNote") })] })]
				})]
			})
		]
	});
}
function rt({ compact: e = !1, initialSelected: t = "", canEdit: n = !1 }) {
	let { values: r, published: i, error: a, refresh: s } = ue(), c = Ze.find((e) => e.toLowerCase() === t.toLowerCase()) || "", [l, u] = (0, h.useState)(c);
	function d(e) {
		let t = "model-" + e.toLowerCase();
		return i[t] ? r[t] || {} : et(t);
	}
	function f(e, t) {
		e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || (e.preventDefault(), e.currentTarget.focus(), u(t));
	}
	function p() {
		u(""), c && (window.location.hash = "tr-modelle");
	}
	let m = "model-" + l.toLowerCase();
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		a && /* @__PURE__ */ (0, _.jsxs)("p", {
			role: "alert",
			children: [
				o("Die aktuellen Modellinhalte konnten nicht geladen werden."),
				" ",
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "home-text-link",
					onClick: () => void s(),
					children: o("Erneut laden")
				})
			]
		}),
		/* @__PURE__ */ (0, _.jsx)("nav", {
			className: `vehicle-model-grid${e ? " compact" : ""}`,
			"aria-label": o("Triumph-Modelle und Fahrzeugdaten"),
			children: Ze.map((t) => {
				let n = d(t);
				return /* @__PURE__ */ (0, _.jsxs)("a", {
					className: "vehicle-model-card",
					href: "#tr-modelle/" + t.toLowerCase(),
					"aria-haspopup": "dialog",
					onClick: (e) => f(e, t),
					children: [
						$e(n, "image") ? /* @__PURE__ */ (0, _.jsx)("div", {
							className: "vehicle-card-image",
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								src: pe($e(n, "image")),
								alt: $e(n, "imageAlt") || t,
								width: 600,
								height: 360,
								style: ge(n.imageFrame)
							})
						}) : /* @__PURE__ */ (0, _.jsx)(tt, { model: t }),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "vehicle-card-caption",
							children: /* @__PURE__ */ (0, _.jsx)("strong", { children: $e(n, "title") || t })
						}),
						!e && /* @__PURE__ */ (0, _.jsx)("p", { children: o(i["model-" + t.toLowerCase()] && !$e(n, "exampleNote") ? "Porträt & Fahrzeugdaten" : "Beispielansicht · Bild und Daten folgen") })
					]
				}, t);
			})
		}),
		l && /* @__PURE__ */ (0, _.jsxs)(q, {
			title: $e(d(l), "title") || l,
			close: p,
			children: [/* @__PURE__ */ (0, _.jsx)(nt, {
				values: d(l),
				model: l,
				unpublished: !i[m]
			}), n && /* @__PURE__ */ (0, _.jsx)("a", {
				className: "vehicle-edit-link",
				href: "#redaktion/" + m,
				children: o("Bild, Texte und Fahrzeugdaten bearbeiten →")
			})]
		})
	] });
}
function it({ selected: e = "", canEdit: t = !1 }) {
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero",
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "eyebrow",
				children: o("Unsere Leidenschaft")
			}),
			/* @__PURE__ */ (0, _.jsx)("h1", { children: o("Die Triumph TR-Modelle") }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: o("Jeder TR hat seinen eigenen Charakter. Entdecke die Modelle und ihre Fahrzeugdaten.") })
		]
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content vehicle-gallery",
		children: [/* @__PURE__ */ (0, _.jsx)("a", {
			className: "page-back",
			href: "#club",
			children: o("← Zum Club")
		}), /* @__PURE__ */ (0, _.jsx)(rt, {
			initialSelected: e,
			canEdit: t
		})]
	})] });
}
//#endregion
//#region app/components/ShopOperations.tsx
function at({ nonce: e, close: t, saved: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)(!1), [c, l] = (0, h.useState)(""), u = (0, h.useRef)(crypto.randomUUID());
	function d(e, t, n) {
		i((r) => r.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}
	return /* @__PURE__ */ (0, _.jsx)(q, {
		title: o("Artikel erstellen"),
		close: t,
		busy: a,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: async (t) => {
				if (t.preventDefault(), a) return;
				s(!0), l("");
				let i = new FormData(t.currentTarget);
				i.set("operation", "product-save"), i.set("requestId", u.current), i.set("variants", JSON.stringify(r));
				try {
					let t = await w("strc_shop", e, i);
					n(t.message, t.editUrl);
				} catch (e) {
					l(e.message);
				} finally {
					s(!1);
				}
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: a,
					children: [
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Artikelname *"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "title",
							required: !0,
							maxLength: 160
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Beschreibung"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							name: "description",
							maxLength: 1e4,
							rows: 4
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: ["SKU", /* @__PURE__ */ (0, _.jsx)("input", {
							name: "sku",
							maxLength: 100
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Produktbild"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "image",
							type: "file",
							accept: "image/jpeg,image/png,image/webp"
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Preis in CHF *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "price",
									required: !0,
									inputMode: "decimal",
									defaultValue: "0.00"
								})] }),
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Lagerbestand *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "stock",
									type: "number",
									min: "0",
									max: "999999",
									defaultValue: "0",
									required: !0
								})] }),
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Einstandspreis in CHF (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "cost",
									inputMode: "decimal"
								})] })
							]
						}),
						/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Varianten nach Grösse") }),
						/* @__PURE__ */ (0, _.jsx)("p", { children: o("Für jede Grösse gelten ein eigener Preis, Lagerbestand und ein optionales Bild.") }),
						r.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("fieldset", {
							className: "form-section",
							children: [
								/* @__PURE__ */ (0, _.jsxs)("legend", { children: [
									o("Variante"),
									" ",
									t + 1
								] }),
								/* @__PURE__ */ (0, _.jsx)("div", {
									className: "club-form-row",
									children: [
										"size",
										"price",
										"stock",
										"cost"
									].map((n) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [o({
										size: "Grösse *",
										price: "Preis in CHF *",
										stock: "Lagerbestand *",
										cost: "Einstandspreis in CHF (optional)"
									}[n]), /* @__PURE__ */ (0, _.jsx)("input", {
										required: n !== "cost",
										type: n === "stock" ? "number" : "text",
										min: n === "stock" ? 0 : void 0,
										max: n === "stock" ? 999999 : void 0,
										maxLength: n === "size" ? 50 : 20,
										value: e[n],
										onChange: (e) => d(t, n, e.target.value)
									})] }, n))
								}),
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Variantenbild (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "file",
									name: "variant_image_" + t,
									accept: "image/jpeg,image/png,image/webp"
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									onClick: () => i((e) => e.filter((e, n) => n !== t)),
									children: o("Variante entfernen")
								})
							]
						}, t)),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							disabled: r.length >= 30,
							onClick: () => i((e) => [...e, {
								size: "",
								price: "0.00",
								stock: "0",
								cost: ""
							}]),
							children: o("Variante hinzufügen")
						}),
						/* @__PURE__ */ (0, _.jsx)("p", { children: o("Der Artikel wird als Entwurf gespeichert und kann anschliessend geprüft und veröffentlicht werden.") })
					]
				}),
				c && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "alert",
					children: c
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-primary",
					disabled: a,
					children: o(a ? "Wird gespeichert …" : "Entwurf speichern")
				})
			]
		})
	});
}
function ot({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)([{
		id: "",
		quantity: "1"
	}]), [a, s] = (0, h.useState)("direct"), [c, l] = (0, h.useState)("handover"), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)(!1), [b, x] = (0, h.useState)(0), [S, T] = (0, h.useState)(null), E = (0, h.useRef)(crypto.randomUUID());
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_shop", { operation: "order-options" }, e.signal).then(n).catch((t) => {
			e.signal.aborted || d(t.message);
		}), () => e.abort();
	}, [b]), /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Direktverkauf & manuelle Bestellung") }),
			t ? /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "club-form",
				onChange: () => T(null),
				onSubmit: async (t) => {
					if (t.preventDefault(), v) return;
					y(!0), d("");
					let n = new FormData(t.currentTarget);
					n.set("operation", "order-save"), n.set("requestId", E.current), n.set("kind", a), n.set("fulfilment", c), n.set("items", JSON.stringify(r)), n.set("preview", S ? "0" : "1"), S && n.set("reviewToken", S.reviewToken);
					try {
						if (!S) T(await w("strc_shop", e, n));
						else {
							let t = await w("strc_shop", e, n);
							p(t.message), g(t.url), T(null), i([{
								id: "",
								quantity: "1"
							}]), E.current = crypto.randomUUID(), x((e) => e + 1);
						}
					} catch (e) {
						d(e.message), T(null);
					} finally {
						y(!1);
					}
				},
				children: [
					/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: v,
						children: [
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Transaktionsart"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: a,
								onChange: (e) => s(e.target.value),
								children: [
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "direct",
										children: o("Direktverkauf")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "manual",
										children: o("Telefon / manuelle Bestellung")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "board",
										children: o("Gratisabgabe Vorstand")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "gift",
										children: o("Geschenk / Preis / Clubzweck")
									})
								]
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitglied (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "customerId",
								required: a === "board",
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Gast / keine Zuordnung")
								}), t.members.filter((e) => a !== "board" || e.board).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e.id,
									children: e.name
								}, e.id))]
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-form-row",
								children: [
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Vorname"), /* @__PURE__ */ (0, _.jsx)("input", {
										name: "firstName",
										maxLength: 100
									})] }),
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachname"), /* @__PURE__ */ (0, _.jsx)("input", {
										name: "lastName",
										maxLength: 100
									})] }),
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
										name: "email",
										type: "email",
										maxLength: 200
									})] })
								]
							}),
							r.map((e, n) => /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-form-row",
								children: [
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Artikel / Variante *"), /* @__PURE__ */ (0, _.jsxs)("select", {
										required: !0,
										value: e.id,
										onChange: (e) => i((t) => t.map((t, r) => r === n ? {
											...t,
											id: e.target.value
										} : t)),
										children: [/* @__PURE__ */ (0, _.jsx)("option", {
											value: "",
											children: o("Bitte wählen")
										}), t.products.map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
											value: e.id,
											children: [
												e.name,
												" · CHF ",
												e.price,
												e.stock === null ? "" : ` · ${o("Bestand")} ${e.stock}`
											]
										}, e.id))]
									})] }),
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Menge *"), /* @__PURE__ */ (0, _.jsx)("input", {
										required: !0,
										type: "number",
										min: "1",
										max: "9999",
										value: e.quantity,
										onChange: (e) => i((t) => t.map((t, r) => r === n ? {
											...t,
											quantity: e.target.value
										} : t))
									})] }),
									r.length > 1 && /* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "market-text-button",
										onClick: () => i((e) => e.filter((e, t) => t !== n)),
										children: o("Entfernen")
									})
								]
							}, n)),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: r.length >= 30,
								onClick: () => {
									i((e) => [...e, {
										id: "",
										quantity: "1"
									}]), T(null);
								},
								children: o("Artikel hinzufügen")
							}),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Grund / Bemerkung"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "reason",
								required: ["board", "gift"].includes(a),
								maxLength: 500
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Übergabe"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: c,
								onChange: (e) => l(e.target.value),
								children: [
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "handover",
										children: o("Direkt übergeben")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "pickup",
										children: o("Abholung an Veranstaltung")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "shipping",
										children: o("Versand")
									})
								]
							})] }),
							c === "pickup" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Veranstaltung *"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "eventId",
								required: !0,
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), t.events.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e.id,
									children: e.title
								}, e.id))]
							})] }),
							c === "shipping" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Strasse *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "street",
									required: !0,
									maxLength: 200
								})] }),
								/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "club-form-row",
									children: [
										/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("PLZ *"), /* @__PURE__ */ (0, _.jsx)("input", {
											name: "postcode",
											required: !0,
											maxLength: 15
										})] }),
										/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Ort *"), /* @__PURE__ */ (0, _.jsx)("input", {
											name: "city",
											required: !0,
											maxLength: 100
										})] }),
										/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Versandkosten CHF *"), /* @__PURE__ */ (0, _.jsx)("input", {
											name: "shipping",
											required: !0,
											inputMode: "decimal",
											defaultValue: (/* @__PURE__ */ new Date()).getFullYear() >= 2027 ? "12.00" : "10.00"
										})] })
									]
								}),
								/* @__PURE__ */ (0, _.jsx)("p", { children: o("Versand innerhalb der Schweiz. Abweichende Lieferungen werden in der Bestellverwaltung vereinbart.") })
							] }),
							!["board", "gift"].includes(a) && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zahlungsart"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "payment",
								children: [
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "invoice",
										children: o("Rechnung · Zahlung offen")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "cash",
										children: o("Barzahlung erhalten")
									}),
									/* @__PURE__ */ (0, _.jsx)("option", {
										value: "external",
										children: o("Externe Zahlung bereits bestätigt")
									})
								]
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zahlungsbeleg / Referenz (bei externer Zahlung)"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "reference",
								maxLength: 200
							})] })] })
						]
					}),
					S && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "form-review",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Bestellung prüfen") }),
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [
								o("Gesamtbetrag"),
								": CHF ",
								S.total
							] }),
							["board", "gift"].includes(a) && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
								o("Regulärer Warenwert"),
								": CHF ",
								S.regular
							] }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: o("Beim Speichern wird der Lagerbestand reduziert.") })
						]
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: v,
						children: o(v ? "Wird verarbeitet …" : S ? "Bestellung verbindlich speichern" : "Bestellung prüfen")
					})
				]
			}) : /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Artikel werden geladen …")
			}),
			u && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: u
			}),
			f && /* @__PURE__ */ (0, _.jsxs)("p", {
				role: "status",
				children: [
					f,
					" ",
					m && /* @__PURE__ */ (0, _.jsx)("a", {
						href: m,
						children: o("Bestellung verwalten")
					})
				]
			})
		]
	});
}
//#endregion
//#region app/components/ShopAccess.tsx
var st = (e, t, n) => new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: t,
	minimumFractionDigits: n,
	maximumFractionDigits: n
}).format(Number(e) / 10 ** n), ct = [
	"",
	"artikel",
	"lager",
	"abrechnung"
], lt = () => {
	let e = typeof window > "u" ? "" : window.location.hash.split("/")[1] || "";
	return ct.includes(e) ? e : "";
};
function ut() {
	let [e, t] = (0, h.useState)(lt);
	(0, h.useEffect)(() => {
		let e = () => t(lt());
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []);
	let [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(!1), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)([]), [d, f] = (0, h.useState)(null), [p, m] = (0, h.useState)(""), [g, b] = (0, h.useState)(!0);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_shop", { operation: "config" }, e.signal).then(async (t) => {
			if (e.signal.aborted) return;
			if (f(t), !t.storeReady) {
				b(!1);
				return;
			}
			let n = await fetch(`${y}/wp-json/wc/store/v1/products?per_page=20&orderby=popularity`, {
				signal: e.signal,
				cache: "no-store"
			});
			if (!n.ok) throw Error("Shop-Sortiment ist momentan nicht erreichbar.");
			u(await n.json());
		}).catch((t) => {
			e.signal.aborted || m(t instanceof Error ? t.message : "Shop konnte nicht geladen werden.");
		}).finally(() => {
			e.signal.aborted || b(!1);
		}), () => e.abort();
	}, []);
	let x = [
		[
			"",
			"Sortiment",
			!0
		],
		[
			"artikel",
			"Artikel erfassen",
			!!d?.canManage
		],
		[
			"lager",
			"Lager",
			!!(d?.canManage || d?.canInspect)
		],
		[
			"abrechnung",
			"Abrechnung",
			!!(d?.canManage || d?.canInspect)
		]
	].filter((e) => e[2]), S = x.some((t) => t[0] === e) ? e : "", w = {
		"": ["Das Sortiment", "Zubehör und ausgewählte Artikel des Clubs."],
		artikel: ["Artikel erfassen", "Neue Artikel mit Preis, Lagerbestand und Varianten anlegen. Neue Artikel werden als Entwurf gespeichert und vor der Veröffentlichung geprüft."],
		lager: ["Lagerbewirtschaftung", "Aktueller Bestand pro Artikel und Variante."],
		abrechnung: ["Abrechnungskontrolle", "Bestellungen, Zahlungsstand und Abholung prüfen, exportieren und Direktverkäufe erfassen."]
	}[S];
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "form-section shop-catalog",
		children: [
			x.length > 1 && /* @__PURE__ */ (0, _.jsx)("nav", {
				className: "shop-tabs",
				"aria-label": o("Shop-Bereiche"),
				children: x.map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#tr-shop" + (e ? "/" + e : ""),
					"aria-current": S === e ? "page" : void 0,
					children: o(t)
				}, e))
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-catalog-heading",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "eyebrow",
						children: "Swiss TR-Club · Shop"
					}),
					/* @__PURE__ */ (0, _.jsx)("h2", { children: o(w[0]) }),
					/* @__PURE__ */ (0, _.jsx)("p", { children: o(w[1]) })
				] }), /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "shop-catalog-actions",
					children: [S === "" && d?.checkoutReady && d.cartUrl && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary",
						href: d.cartUrl,
						children: o("Zum Warenkorb →")
					}), S === "" && d?.isMember && d.myOrdersUrl && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary",
						href: d.myOrdersUrl,
						children: o("Meine Bestellungen →")
					})]
				})]
			}),
			S === "artikel" && d ? /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-admin-view",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-primary",
							onClick: () => a(!0),
							children: [o("Neuen Artikel erfassen"), " ＋"]
						}), d.productEditorUrl && /* @__PURE__ */ (0, _.jsx)("a", {
							className: "club-secondary",
							href: d.productEditorUrl,
							children: o("Bestehende Artikel bearbeiten →")
						})]
					}),
					s && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						className: "club-notice",
						children: s
					}),
					n && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: n,
						children: o("Artikel prüfen und veröffentlichen →")
					}) })
				]
			}) : S === "lager" && d ? /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-admin-view",
				children: [/* @__PURE__ */ (0, _.jsx)(dt, { view: "stock" }), d.ordersUrl && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: d.ordersUrl,
					children: o("Bestand in WooCommerce anpassen →")
				}) })]
			}) : S === "abrechnung" && d ? /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-admin-view",
				children: [
					(d.canInspect || d.canManage) && /* @__PURE__ */ (0, _.jsx)(dt, { view: "orders" }),
					d.canManage && /* @__PURE__ */ (0, _.jsx)(ot, { nonce: d.nonce || "" }),
					d.ordersUrl && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: d.ordersUrl,
						children: o("Alle Bestellungen in WooCommerce →")
					}) })
				]
			}) : p ? /* @__PURE__ */ (0, _.jsx)("p", {
				className: "collection-state error",
				role: "alert",
				children: p
			}) : g ? /* @__PURE__ */ (0, _.jsx)("p", {
				className: "collection-state",
				role: "status",
				children: o("Sortiment wird geladen …")
			}) : d?.storeReady ? l.length ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("div", {
				className: "shop-product-grid",
				children: l.map((e) => {
					let t = e.attributes.find((e) => /size|groesse|grösse/i.test(`${e.name} ${e.slug}`)), n = e.attributes.find((e) => /colou?r|farbe/i.test(`${e.name} ${e.slug}`)), r = [t, n].filter((e) => !!e).flatMap((e) => e.terms.map((e) => e.name)), i = e.permalink, a = d.checkoutReady ? e.is_in_stock ? "Auswählen & bestellen →" : "Ausverkauft" : "Checkout wird eingerichtet";
					return /* @__PURE__ */ (0, _.jsxs)("article", {
						className: "shop-product-card",
						children: [/* @__PURE__ */ (0, _.jsx)("a", {
							className: "shop-product-image",
							href: e.permalink,
							"aria-label": `${e.name} ansehen`,
							children: e.images[0] ? /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: e.images[0].src,
								alt: e.images[0].alt || e.name,
								width: 700,
								height: 700
							}) : /* @__PURE__ */ (0, _.jsx)("span", {
								"aria-hidden": "true",
								children: "TR"
							})
						}), /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "shop-product-copy",
							children: [
								/* @__PURE__ */ (0, _.jsx)("p", {
									className: "eyebrow",
									children: o(e.is_in_stock ? "Im Sortiment" : "Derzeit ausverkauft")
								}),
								/* @__PURE__ */ (0, _.jsx)("h3", { children: /* @__PURE__ */ (0, _.jsx)("a", {
									href: e.permalink,
									children: e.name
								}) }),
								/* @__PURE__ */ (0, _.jsx)("strong", { children: st(e.prices.price, e.prices.currency_code, e.prices.currency_minor_unit) }),
								r.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
									className: "shop-product-variants",
									children: [t && `Grössen: ${t.terms.map((e) => e.name).join(", ")}`, n && `Farben: ${n.terms.map((e) => e.name).join(", ")}`].filter(Boolean).join(" · ")
								}),
								d.checkoutReady && e.is_in_stock ? /* @__PURE__ */ (0, _.jsx)("a", {
									className: "market-primary shop-product-link",
									href: i,
									children: o(a)
								}) : d.isMember ? /* @__PURE__ */ (0, _.jsx)("span", {
									className: "shop-purchase-unavailable",
									"aria-disabled": "true",
									children: o(a)
								}) : /* @__PURE__ */ (0, _.jsx)("a", {
									className: "shop-product-link",
									href: i,
									children: o(a)
								})
							]
						})]
					}, e.id);
				})
			}), !d.zahlsReady && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "shop-checkout-notice",
				role: "status",
				children: "Bestellung auf Rechnung ist verfügbar. TWINT und Karte folgen nach geprüfter Einrichtung."
			})] }) : /* @__PURE__ */ (0, _.jsx)("div", {
				className: "collection-state",
				children: "Noch sind keine Artikel veröffentlicht. Shop-Moderatoren können hier neue Angebote einstellen."
			}) : /* @__PURE__ */ (0, _.jsx)("div", {
				className: "collection-state",
				children: "Der Shop wird gerade eingerichtet. Das Sortiment erscheint hier, sobald WooCommerce aktiviert ist."
			}),
			i && d && /* @__PURE__ */ (0, _.jsx)(at, {
				nonce: d.nonce || "",
				close: () => a(!1),
				saved: (e, t) => {
					c(e), r(t), a(!1);
				}
			})
		]
	});
}
function dt({ view: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(1), [a, s] = (0, h.useState)(1), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_shop", {
			operation: "reports",
			page: String(r),
			stockPage: String(a),
			event: c
		}, e.signal).then(n).catch((t) => {
			e.signal.aborted || d(t.message);
		}), () => e.abort();
	}, [
		r,
		a,
		c
	]);
	function f() {
		if (!t) return;
		let e = (e) => "\"" + e.replace(/"/g, "\"\"").replace(/^[=+@\-\t\r]/, "'") + "\"", n = [[
			"Bestellung",
			"Datum",
			"Kunde",
			"Status",
			"Betrag",
			"Währung",
			"Zahlungsart",
			"Abholung"
		], ...t.orders.map((e) => [
			e.number,
			e.date,
			e.customer,
			e.status,
			e.total,
			e.currency,
			e.paymentMethod,
			e.pickupEvent
		])], i = URL.createObjectURL(new Blob(["﻿" + n.map((t) => t.map(e).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" })), a = document.createElement("a");
		a.href = i, a.download = "tr-shop-bestellungen-seite-" + r + ".csv", a.click(), URL.revokeObjectURL(i);
	}
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "form-section shop-report",
		children: [
			u && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: u
			}),
			!t && !u && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Wird geladen …")
			}),
			t && e === "orders" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Bestellungen") }),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Abholung an Veranstaltung"), /* @__PURE__ */ (0, _.jsxs)("select", {
					value: c,
					onChange: (e) => {
						l(e.target.value), i(1);
					},
					children: [/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: o("Alle")
					}), t.events.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
						value: e.id,
						children: e.title
					}, e.id))]
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("p", { children: [
					t.total,
					" ",
					o("Bestellungen")
				] }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: f,
					children: o("Angezeigte Bestellungen exportieren")
				}),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "table-scroll",
					children: /* @__PURE__ */ (0, _.jsxs)("table", { children: [/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Bestellung") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Kunde") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Status") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Betrag") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Abholung") })
					] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: t.orders.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, _.jsxs)("td", { children: [
							"#",
							e.number,
							/* @__PURE__ */ (0, _.jsx)("br", {}),
							e.items.join(", ")
						] }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.customer }),
						/* @__PURE__ */ (0, _.jsxs)("td", { children: [
							o(e.status),
							" · ",
							o(e.paymentMethod)
						] }),
						/* @__PURE__ */ (0, _.jsxs)("td", { children: [
							e.total,
							" ",
							e.currency
						] }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.pickupEvent || o("Versand") })
					] }, e.id)) })] })
				}),
				/* @__PURE__ */ (0, _.jsx)(en, {
					page: r,
					pages: t.pages,
					change: i
				})
			] }),
			t && e === "stock" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Lagerbestand") }),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "table-scroll",
					children: /* @__PURE__ */ (0, _.jsxs)("table", { children: [/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Artikel") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: "SKU" }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Bestand") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Status") })
					] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: t.stock.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.name }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.sku }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.quantity ?? "–" }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: o(e.stockStatus) })
					] }, e.id)) })] })
				}),
				/* @__PURE__ */ (0, _.jsx)(en, {
					page: a,
					pages: t.stockPages,
					change: s
				})
			] })
		]
	});
}
//#endregion
//#region app/components/MembershipApplication.tsx
function ft() {
	let { text: e } = ue(), { language: t } = n(), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)("single"), [f, p] = (0, h.useState)([te()]), [m, g] = (0, h.useState)(!1), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(""), S = (0, h.useRef)(!1), T = (0, h.useRef)(""), E = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_membership_application", { operation: "config" }, e.signal).then((e) => {
			i(e), s("");
		}).catch(() => {
			e.signal.aborted || s("Die Online-Anmeldung ist momentan nicht erreichbar.");
		}), () => e.abort();
	}, [c]);
	async function D(e) {
		if (e.preventDefault(), !r || S.current) return;
		if (!f.some((e) => R.includes(e.model))) {
			y("Bitte mindestens einen Triumph TR angeben. Weitere Triumph-Modelle können du zusätzlich erfassen.");
			return;
		}
		let t = new FormData(e.currentTarget);
		for (let e of ["", ...u === "couple" ? ["copilot_"] : []]) {
			let n = String(t.get(e + "phone") || "").trim();
			if (!/^[+0-9() .\/-]{5,40}$/.test(n) || n.replace(/\D/g, "").length < 5) {
				y(e ? "Bitte eine gültige Mobilnummer für den Co-Piloten angeben." : "Bitte eine gültige Mobilnummer angeben.");
				return;
			}
		}
		if (u === "couple" && String(t.get("email") || "").trim().toLowerCase() === String(t.get("copilot_email") || "").trim().toLowerCase()) {
			y("Für beide Personen ist eine eigene E-Mail-Adresse erforderlich.");
			return;
		}
		S.current = !0, g(!0), y(""), T.current ||= crypto.randomUUID(), t.set("operation", "submit"), t.set("requestId", T.current), t.set("vehicles", JSON.stringify(f));
		try {
			x((await w("strc_membership_application", r.nonce, t)).message);
		} catch (e) {
			y(e instanceof Error ? e.message : "Übermittlung fehlgeschlagen. Deine Eingaben bleiben erhalten.");
		} finally {
			g(!1), S.current = !1;
		}
	}
	return r ? r.available ? b ? /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "membership-application",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: e("membership.thankYouTitle", "Herzliches Dankeschön") }),
			/* @__PURE__ */ (0, _.jsx)(fe, { id: "membership.thankYouText" }),
			/* @__PURE__ */ (0, _.jsx)(z, { message: b }),
			/* @__PURE__ */ (0, _.jsx)("a", {
				href: "#club",
				children: o("Zur Clubseite")
			})
		]
	}) : /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "membership-application",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Mitgliedschaftsantrag") }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: o("Felder mit * sind erforderlich. Dein Antrag wird persönlich geprüft.") }),
			/* @__PURE__ */ (0, _.jsxs)("form", {
				ref: E,
				className: "club-form membership-form",
				onSubmit: (e) => void D(e),
				children: [
					/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: m,
						children: [
							/* @__PURE__ */ (0, _.jsx)("legend", {
								className: "market-sr-only",
								children: "Mitgliedsantrag"
							}),
							/* @__PURE__ */ (0, _.jsx)(de, { html: e("membership.fees", W.membership.fields.find((e) => e.key === "fees")?.default || "") }),
							/* @__PURE__ */ (0, _.jsxs)("section", {
								className: "form-section",
								children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Gewünschte Mitgliedschaft *"), /* @__PURE__ */ (0, _.jsxs)("select", {
									name: "membership_type",
									value: u,
									onChange: (e) => d(e.target.value),
									children: [
										/* @__PURE__ */ (0, _.jsx)("option", {
											value: "single",
											children: o("Einzelmitgliedschaft")
										}),
										/* @__PURE__ */ (0, _.jsx)("option", {
											value: "couple",
											children: o("Paarmitgliedschaft")
										}),
										/* @__PURE__ */ (0, _.jsx)("option", {
											value: "young",
											children: o("Young / TRiungsters")
										})
									]
								})] }), /* @__PURE__ */ (0, _.jsxs)("label", {
									className: "application-consent",
									children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "checkbox",
										checked: u === "couple",
										onChange: (e) => d(e.target.checked ? "couple" : "single")
									}), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Co-Pilot gleichzeitig anmelden (Paarmitgliedschaft)") })]
								})]
							}),
							/* @__PURE__ */ (0, _.jsx)(B, {
								title: u === "couple" ? "Hauptmitglied" : "Persönliche Angaben",
								children: /* @__PURE__ */ (0, _.jsx)(H, {
									mobileRequired: !0,
									formatSwissMobile: !0,
									personalDetails: !0
								})
							}),
							/* @__PURE__ */ (0, _.jsxs)("fieldset", {
								disabled: u !== "couple" || m,
								hidden: u !== "couple",
								children: [/* @__PURE__ */ (0, _.jsx)("legend", {
									className: "market-sr-only",
									children: "Co-Pilot"
								}), /* @__PURE__ */ (0, _.jsxs)(B, {
									title: "Co-Pilot / zweite Person",
									children: [
										/* @__PURE__ */ (0, _.jsx)("p", { children: o("Jede Person erhält nach der Aufnahme eine eigene Mitgliedsnummer und ein eigenes Konto. Bitte zwei unterschiedliche E-Mail-Adressen verwenden.") }),
										/* @__PURE__ */ (0, _.jsx)(H, {
											prefix: "copilot_",
											mobileRequired: !0,
											formatSwissMobile: !0,
											personalDetails: !0
										}),
										/* @__PURE__ */ (0, _.jsxs)("label", {
											className: "application-consent",
											children: [/* @__PURE__ */ (0, _.jsx)("input", {
												type: "checkbox",
												name: "copilot_confirm",
												value: "1",
												required: !0
											}), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Die zweite Person stimmt diesem Antrag und der Übermittlung ihrer Angaben zu. *") })]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, _.jsxs)(B, {
								title: "Deine Region",
								children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Heimatregion (Stamm) *"), /* @__PURE__ */ (0, _.jsxs)("select", {
									name: "region",
									required: !0,
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), r.regions.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
										value: e.slug,
										children: e.name
									}, e.slug))]
								})] }), /* @__PURE__ */ (0, _.jsx)("p", {
									className: "club-hint",
									children: o("TRiungsters ist eine Mitgliedergruppe; deine geografische Region wählst du unabhängig davon.")
								})]
							}),
							/* @__PURE__ */ (0, _.jsxs)(B, {
								title: "Deine Triumphs",
								children: [
									/* @__PURE__ */ (0, _.jsxs)("p", { children: [o("Bitte mindestens einen Triumph TR angeben."), u === "couple" ? " " + o("Die Fahrzeuge werden dem Hauptmitglied zugeordnet.") : ""] }),
									f.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", {
										className: "form-subsection",
										children: [
											/* @__PURE__ */ (0, _.jsxs)("h4", { children: [
												o("Fahrzeug"),
												" ",
												t + 1
											] }),
											/* @__PURE__ */ (0, _.jsx)(ne, {
												application: !0,
												value: e,
												onChange: (e) => p((n) => n.map((n, r) => r === t ? e : n))
											}),
											/* @__PURE__ */ (0, _.jsxs)("button", {
												type: "button",
												className: "market-text-button",
												disabled: f.length === 1,
												onClick: () => p((e) => e.filter((e, n) => n !== t)),
												children: [
													o("Fahrzeug"),
													" ",
													t + 1,
													" ",
													o("entfernen")
												]
											})
										]
									}, t)),
									/* @__PURE__ */ (0, _.jsxs)("button", {
										type: "button",
										className: "club-secondary",
										onClick: () => p((e) => [...e, te()]),
										children: ["＋ ", o("Triumph hinzufügen")]
									})
								]
							}),
							/* @__PURE__ */ (0, _.jsxs)("section", {
								className: "form-section",
								children: [
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bemerkungen (optional)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
										name: "notes",
										rows: 3,
										maxLength: 2e3
									})] }),
									/* @__PURE__ */ (0, _.jsxs)("label", {
										className: "application-consent",
										children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											name: "statutes",
											value: "1",
											required: !0
										}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [
											o("Ich akzeptiere die"),
											" ",
											/* @__PURE__ */ (0, _.jsx)("a", {
												href: "#statuten",
												target: "_blank",
												rel: "noopener noreferrer",
												children: o("Statuten (neuer Tab)")
											}),
											". *"
										] })]
									}),
									/* @__PURE__ */ (0, _.jsxs)("label", {
										className: "application-consent",
										children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											name: "privacy",
											value: "1",
											required: !0
										}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [
											o("Ich habe die"),
											" ",
											/* @__PURE__ */ (0, _.jsx)("a", {
												href: "#datenschutz",
												target: "_blank",
												rel: "noopener noreferrer",
												children: o("Datenschutzhinweise (neuer Tab)")
											}),
											t === "fr" ? ". *" : " gelesen. *"
										] })]
									})
								]
							}),
							/* @__PURE__ */ (0, _.jsx)(re, {})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(z, { error: v }),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: m,
							children: o(m ? "Antrag wird gesendet …" : "Absenden")
						}), v && /* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "market-text-button",
							onClick: () => l((e) => e + 1),
							children: o("Sitzung erneuern")
						})]
					})
				]
			})
		]
	}) : /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "membership-application",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: "Mitglied werden" }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: "Bitte kontaktiere den Club für deine Anmeldung." }),
			/* @__PURE__ */ (0, _.jsx)("a", {
				className: "market-primary",
				href: "#kontakt",
				children: "Kontakt aufnehmen →"
			})
		]
	}) : /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "membership-application",
		children: [/* @__PURE__ */ (0, _.jsx)(z, { error: a }), a ? /* @__PURE__ */ (0, _.jsx)("button", {
			className: "club-secondary",
			onClick: () => l((e) => e + 1),
			children: "Erneut prüfen"
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Anmeldung wird geladen …")
		})]
	});
}
//#endregion
//#region app/components/LandingPages.tsx
function pt(e) {
	return e in W && "template" in W[e];
}
function mt({ href: e, title: t, text: n }) {
	return /* @__PURE__ */ (0, _.jsxs)("a", {
		className: "landing-card",
		href: e,
		children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: t }), /* @__PURE__ */ (0, _.jsx)("p", { children: n })]
	});
}
function ht({ canEdit: e = !1, memberAccess: t = !1 }) {
	let { text: n } = ue();
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-hero club-page-hero",
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-page-hero-copy",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: n("club.eyebrow")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: n("club.title") }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: n("club.intro") })
			]
		})
	}), /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "club-overview-layout",
		children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content club-intro-row",
			children: [/* @__PURE__ */ (0, _.jsx)(K, {
				documentKey: "club",
				contained: !0
			}), /* @__PURE__ */ (0, _.jsxs)("aside", {
				className: "club-join-card",
				children: [
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "eyebrow",
						children: n("club.joinEyebrow") || "Mitglied werden"
					}),
					/* @__PURE__ */ (0, _.jsx)("h2", { children: n("club.joinTitle") || "Mitglied werden" }),
					/* @__PURE__ */ (0, _.jsx)(fe, { id: "club.joinText" }),
					/* @__PURE__ */ (0, _.jsxs)("a", {
						className: "market-primary",
						href: "#anmeldung",
						children: [
							n("club.joinButton") || "Zur Anmeldung",
							" ",
							/* @__PURE__ */ (0, _.jsx)("span", {
								"aria-hidden": "true",
								children: "→"
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, _.jsx)("section", {
			className: "page-content landing-layout club-landing-cards",
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "landing-grid",
				children: [[
					[
						"organisation",
						"Organisation",
						"organisationText"
					],
					[
						"leitbild",
						"Leitbild",
						"missionText"
					],
					[
						"regionen",
						"Regionen",
						"regionsText"
					],
					[
						"triungsters",
						"TRiungsters",
						"triungstersText"
					]
				].map(([e, t, r]) => /* @__PURE__ */ (0, _.jsx)(mt, {
					href: "#" + e,
					title: n("club." + ({
						organisation: "organisationTitle",
						leitbild: "missionCardTitle",
						regionen: "regionsTitle",
						triungsters: "triungstersTitle"
					}[e] || ""), t),
					text: n("club." + r),
					action: !0
				}, e)), /* @__PURE__ */ (0, _.jsx)("div", {
					className: "club-history-card",
					children: /* @__PURE__ */ (0, _.jsx)(mt, {
						href: "#club-geschichte",
						title: n("club.historyTitle"),
						text: n("club.historyText"),
						action: !0
					})
				})]
			})
		})] }), /* @__PURE__ */ (0, _.jsxs)("aside", {
			className: "landing-sidebar club-models-sidebar",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Unsere Leidenschaft")
				}),
				/* @__PURE__ */ (0, _.jsx)("h2", { children: n("club.modelsTitle") }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: n("club.modelsText") }),
				/* @__PURE__ */ (0, _.jsx)(rt, {
					compact: !0,
					canEdit: e
				}),
				!t && /* @__PURE__ */ (0, _.jsx)("a", {
					className: "market-primary club-login-entry",
					href: "#mitglieder",
					children: o("Mitglieder-Login")
				})
			]
		})]
	})] });
}
function gt() {
	let { text: e } = ue();
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero",
		children: [/* @__PURE__ */ (0, _.jsx)("p", {
			className: "eyebrow",
			children: e("club.missionLabel")
		}), /* @__PURE__ */ (0, _.jsx)("h1", { children: e("club.missionTitle") })]
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content",
		children: [/* @__PURE__ */ (0, _.jsx)("a", {
			className: "page-back",
			href: "#club",
			children: o("← Zur Clubübersicht")
		}), /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "landing-layout",
			children: [/* @__PURE__ */ (0, _.jsx)("article", {
				className: "static-copy",
				children: /* @__PURE__ */ (0, _.jsx)(fe, { id: "club.body" })
			}), /* @__PURE__ */ (0, _.jsx)("aside", {
				className: "mission-picture",
				children: e("club.missionImage") ? /* @__PURE__ */ (0, _.jsx)(v, {
					src: pe(e("club.missionImage")),
					alt: e("club.missionImageAlt") || o("Clubleben im Swiss TR-Club"),
					width: 600,
					height: 800,
					style: ge(e("club.missionImageFrame"))
				}) : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "static-image-placeholder",
					children: o("Ein Bild aus unserem Clubleben folgt.")
				})
			})]
		})]
	})] });
}
function _t({ documentKey: e, canEdit: t = !1 }) {
	let { values: n, published: r, loading: i, error: a, refresh: s } = ue(), c = W[e];
	return !c || !pt(e) ? /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content",
		children: [/* @__PURE__ */ (0, _.jsx)("h1", { children: o("Seite nicht gefunden") }), /* @__PURE__ */ (0, _.jsx)("a", {
			className: "page-back",
			href: "#club",
			children: o("Zur Clubübersicht")
		})]
	}) : e === "shop" ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero shop-page-hero",
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "eyebrow",
				children: o("Swiss TR-Club · Zubehör und Clubartikel")
			}),
			/* @__PURE__ */ (0, _.jsx)("h1", { children: o("TR-Shop") }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: o("Artikel für TR-Freunde: Entdecke Clubkleidung, Zubehör und ausgewählte Artikel.") })
		]
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content",
		children: [/* @__PURE__ */ (0, _.jsx)("a", {
			className: "page-back",
			href: "#marktplatz",
			children: o("← Zum Marktplatz")
		}), /* @__PURE__ */ (0, _.jsx)(ut, {})]
	})] }) : e === "triungsters" && !i && !a ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero regional-hero",
		style: {
			backgroundImage: `linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${me("triungsters")}")`,
			backgroundSize: "cover",
			backgroundPosition: "center"
		},
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "eyebrow",
				children: o("Lokal präsent – lokal aktiv")
			}),
			/* @__PURE__ */ (0, _.jsx)("h1", { children: o("TRiungsters") }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: r[e] ? String(n[e]?.intro || "") : "" })
		]
	}), /* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content",
		children: /* @__PURE__ */ (0, _.jsx)(Ke, {
			documentKey: e,
			canEdit: t,
			values: r[e] ? n[e] : {}
		})
	})] }) : i || a || !r[e] ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero",
		children: [/* @__PURE__ */ (0, _.jsx)("p", {
			className: "eyebrow",
			children: o("Swiss TR-Club")
		}), /* @__PURE__ */ (0, _.jsx)("h1", { children: o(c.title) })]
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content",
		children: [
			/* @__PURE__ */ (0, _.jsx)("a", {
				className: "page-back",
				href: e === "shop" ? "#marktplatz" : "#club",
				children: o("← Zur Übersicht")
			}),
			i ? /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Inhalt wird geladen …")
			}) : a ? /* @__PURE__ */ (0, _.jsxs)("p", {
				role: "alert",
				children: [
					a,
					" ",
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						onClick: () => void s(),
						children: o("Erneut laden")
					})
				]
			}) : /* @__PURE__ */ (0, _.jsx)("div", {
				className: "collection-state",
				children: /* @__PURE__ */ (0, _.jsx)("p", { children: o("Diese Seite wird vorbereitet. Der Inhalt ist noch nicht veröffentlicht.") })
			}),
			e === "membership" && /* @__PURE__ */ (0, _.jsx)(ft, {}),
			e === "shop" && /* @__PURE__ */ (0, _.jsx)(ut, {})
		]
	})] }) : /* @__PURE__ */ (0, _.jsx)(vt, {
		documentKey: e,
		values: n[e]
	});
}
function vt({ documentKey: e, values: t, preview: n = !1 }) {
	let r = (e) => typeof t[e] == "string" ? t[e] : "", i = e.startsWith("model-"), a = (e) => !!(e.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim() || /<img\b/i.test(e));
	if (e === "triungsters") return /* @__PURE__ */ (0, _.jsx)(Ke, {
		documentKey: e,
		values: t
	});
	if (i) return /* @__PURE__ */ (0, _.jsx)(nt, {
		values: t,
		model: r("title") || e.replace("model-", "").toUpperCase(),
		preview: n
	});
	let s = a(r("bodySecondary")), c = e === "history", l = c && Array.isArray(t.photos) ? t.photos : [], u = Qe.filter(([e]) => r(e));
	return /* @__PURE__ */ (0, _.jsxs)("article", {
		className: `static-page${c ? " history-page" : ""}`,
		children: [/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o(i ? "Die Triumph TR-Modelle" : "Swiss TR-Club")
				}),
				n ? /* @__PURE__ */ (0, _.jsx)("h2", {
					className: "static-preview-title",
					children: r("title")
				}) : /* @__PURE__ */ (0, _.jsx)("h1", { children: r("title") }),
				r("intro") && /* @__PURE__ */ (0, _.jsx)("p", { children: r("intro") })
			]
		}), /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "page-content",
			children: [
				!n && /* @__PURE__ */ (0, _.jsxs)("a", {
					className: "page-back",
					href: e === "shop" ? "#marktplatz" : "#club",
					children: ["← ", o(e === "shop" ? "Zum Marktplatz" : "Zur Clubübersicht")]
				}),
				e === "organisation" && r("lead") && /* @__PURE__ */ (0, _.jsx)(de, {
					className: "organisation-lead",
					html: r("lead")
				}),
				!c && (r("image") ? /* @__PURE__ */ (0, _.jsxs)("figure", {
					className: "static-cover",
					children: [/* @__PURE__ */ (0, _.jsx)(v, {
						src: pe(r("image")),
						alt: r("imageAlt"),
						width: 1440,
						height: 800,
						style: ge(r("imageFrame"))
					}), r("imageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: r("imageCaption") })]
				}) : n && /* @__PURE__ */ (0, _.jsx)("div", {
					className: "static-image-placeholder",
					children: o("Hier erscheint das ausgewählte Titelbild.")
				})),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: `static-layout ${c ? "history-text-layout" : ""} ${i || r("sidebar") || n ? "has-sidebar" : ""}`,
					children: [
						c && /* @__PURE__ */ (0, _.jsx)("div", {
							className: "history-logos",
							children: [["image", "imageAlt"], ["secondaryLogo", "secondaryLogoAlt"]].map(([e, t], i) => r(e) ? /* @__PURE__ */ (0, _.jsx)("span", {
								className: "history-logo-frame",
								children: /* @__PURE__ */ (0, _.jsx)(v, {
									src: pe(r(e)),
									alt: r(t) || `${o("Club-Logo")} ${i + 1}`,
									width: 180,
									height: 180,
									style: { transform: `scale(${Math.max(100, Math.min(150, Number(r(i === 0 ? "logoScale" : "secondaryLogoScale")) || (i === 0 ? 120 : 100))) / 100})` }
								})
							}, e) : n ? /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "history-logo-placeholder",
								children: [
									o("Logo"),
									" ",
									i + 1
								]
							}, e) : null)
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `static-copy ${s ? "two-columns" : ""}`,
							children: [/* @__PURE__ */ (0, _.jsx)("div", { children: a(r("body")) ? c ? /* @__PURE__ */ (0, _.jsx)(Ye, {
								html: r("body"),
								photos: l
							}) : /* @__PURE__ */ (0, _.jsx)(de, { html: r("body") }) : n && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Hier steht später der Text der ersten Spalte.")
							}) }), s && /* @__PURE__ */ (0, _.jsx)(de, { html: r("bodySecondary") })]
						}),
						i && (u.length > 0 || n) && /* @__PURE__ */ (0, _.jsxs)("aside", {
							className: "landing-sidebar vehicle-facts",
							children: [
								/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Fahrzeugdaten") }),
								/* @__PURE__ */ (0, _.jsx)("dl", { children: (n ? Qe : u).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(t) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: r(e) || o("Noch ergänzen") })] }, e)) }),
								r("factsNote") && /* @__PURE__ */ (0, _.jsx)(de, { html: r("factsNote") })
							]
						}),
						!i && (r("sidebar") || n) && /* @__PURE__ */ (0, _.jsxs)("aside", {
							className: "landing-sidebar",
							children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: r("sidebarTitle") || o("Auf einen Blick") }), r("sidebar") ? /* @__PURE__ */ (0, _.jsx)(de, { html: r("sidebar") }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Platz für Kontakte und weitere Informationen.") })]
						})
					]
				}),
				e === "organisation" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: ["board", "functions"].map((e) => /* @__PURE__ */ (0, _.jsx)(Xe, {
					title: r(e + "Title"),
					people: Array.isArray(t[e + "Portraits"]) ? t[e + "Portraits"] : [],
					preview: n,
					slots: e === "board" ? 7 : 5
				}, e)) }),
				e === "membership" && !n && /* @__PURE__ */ (0, _.jsx)(ft, {}),
				e === "shop" && !n && /* @__PURE__ */ (0, _.jsx)(ut, {})
			]
		})]
	});
}
//#endregion
//#region app/components/EditorialDashboard.tsx
var yt = {
	a: "a) Treffpunkt",
	b: "b) Regionale Informationen",
	c: "c) Regionale Neuigkeiten",
	d: "d) Regionale Veranstaltungen",
	admin: "Administration"
}, bt = "strc_editorial", xt = {
	news: "Neuigkeiten",
	forum: "Forum",
	gallery: "Galerie",
	library: "Bibliothek",
	market: "Marktplatz"
};
function St({ nonce: e, canManageEvents: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(() => decodeURIComponent(window.location.hash.split("/")[1] || "")), [l, u] = (0, h.useState)(null), [d, f] = (0, h.useState)(0), { refresh: p } = ue();
	(0, h.useEffect)(() => {
		let e = () => {
			window.location.hash.split("/")[0] === "#redaktion" && (u(null), a(""), c(decodeURIComponent(window.location.hash.split("/")[1] || "")));
		};
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []), (0, h.useEffect)(() => {
		let e = new AbortController();
		return C(bt, {}, e.signal).then(r).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [d]), (0, h.useEffect)(() => {
		if (!s || s.startsWith("posts:") || s === "people" || s === "highlights") return;
		let e = new AbortController();
		return C(bt, {
			operation: "document",
			key: s
		}, e.signal).then(u).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [s, d]);
	function m(e) {
		u(null), a(""), c(e), window.history.replaceState(null, "", "#redaktion" + (e ? "/" + encodeURIComponent(e) : ""));
	}
	function g() {
		m(""), f((e) => e + 1);
	}
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content editorial",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "editorial-heading",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "eyebrow",
						children: o("Redaktion")
					}),
					/* @__PURE__ */ (0, _.jsx)("h1", { children: o("Inhalte bearbeiten") }),
					/* @__PURE__ */ (0, _.jsx)("p", { children: o("Texte, Bilder und Beiträge verwalten – ohne Programmieren.") })
				] }), s && /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => {
						window.confirm(o("Zur Übersicht zurückkehren? Nicht gespeicherte Eingaben gehen verloren.")) && g();
					},
					children: o("Zur Übersicht")
				})]
			}),
			i && /* @__PURE__ */ (0, _.jsxs)("p", {
				className: "collection-state error",
				role: "alert",
				children: [i, /* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => {
						a(""), f((e) => e + 1);
					},
					children: o("Neu laden")
				})]
			}),
			!n && !i && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Ihre Zuständigkeiten werden geladen …")
			}),
			n && !s && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)(I, {}),
				/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Seiten und Texte") }),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "editorial-grid",
					children: n.documents.map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
						className: "editorial-card",
						onClick: () => m(e.key),
						children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.title }), /* @__PURE__ */ (0, _.jsx)("span", { children: e.hasDraft ? "Entwurf vorhanden" : "Texte und Bilder bearbeiten" })]
					}, e.key))
				}),
				/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Beiträge und Clubbereiche") }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "editorial-grid",
					children: [
						t && /* @__PURE__ */ (0, _.jsxs)("a", {
							className: "editorial-card",
							href: "#agenda-verwalten",
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Agenda und Reisen") }), /* @__PURE__ */ (0, _.jsx)("span", { children: "Termine Ihres Verantwortungsbereichs" })]
						}),
						n.areas.includes("news") && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "editorial-card",
							onClick: () => m("highlights"),
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Startseitenübersicht") }), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Beiträge für «Das Neueste» auswählen") })]
						}),
						n.areas.filter((e) => xt[e]).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "editorial-card",
							onClick: () => m("posts:" + e),
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: xt[e] }), /* @__PURE__ */ (0, _.jsx)("span", { children: "Beiträge bearbeiten und veröffentlichen" })]
						}, e)),
						n.magazineUrl && /* @__PURE__ */ (0, _.jsxs)("a", {
							className: "editorial-card",
							href: n.magazineUrl,
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: "TR-Magazin" }), /* @__PURE__ */ (0, _.jsx)("span", { children: "Ausgabe, Titelseite und Leseprobe auswählen" })]
						}),
						n.canAssign && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "editorial-card",
							onClick: () => m("people"),
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Rollen und Zuständigkeiten") }), /* @__PURE__ */ (0, _.jsx)("span", { children: "Funktionsrollen und Bereiche zuweisen" })]
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: "Angezeigt werden nur Ihre freigegebenen Bereiche. Layout und technische Einstellungen betreut der Webmaster."
				})
			] }),
			s === "highlights" ? /* @__PURE__ */ (0, _.jsx)(Ue, { nonce: e }) : s === "people" ? /* @__PURE__ */ (0, _.jsx)(He, { nonce: e }) : s.startsWith("posts:") ? /* @__PURE__ */ (0, _.jsx)(Et, {
				kind: s.slice(6),
				nonce: e,
				changed: p
			}, s) : s && (l ? /* @__PURE__ */ (0, _.jsx)(Ct, {
				doc: l,
				nonce: e,
				saved: (e) => {
					u(e), p();
				}
			}, l.key + ":" + l.revision) : !i && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Inhalt wird geladen …")
			}))
		]
	});
}
function Ct({ doc: e, nonce: t, saved: r }) {
	let { language: i } = n(), [a, s] = (0, h.useState)(() => e.key.startsWith("model-") && e.values.image && !String(e.values.imageAlt || "").trim() ? {
		...e.values,
		imageAlt: String(e.values.title || e.schema.title)
	} : e.values), c = (0, h.useRef)(null), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(!1), p = l || d, [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(e.revision > 0 ? e.hasDraft ? "Gespeicherter Entwurf. Besucher sehen weiterhin die veröffentlichte Version." : "Veröffentlichter Stand geladen. Änderungen sind auf der Website sichtbar." : ""), [x, S] = (0, h.useState)(null), C = JSON.stringify(a) !== JSON.stringify(e.values), E = e.schema.fields.filter((t) => !t.legacy && (e.canAdminister || !t.adminOnly));
	(0, h.useEffect)(() => {
		m && (c.current?.focus(), c.current?.scrollIntoView({
			block: "center",
			behavior: "instant"
		}));
	}, [m]), (0, h.useEffect)(() => {
		if (!C && !d) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [C, d]);
	async function D(n) {
		if (!p) {
			u(!0), g("");
			try {
				let i = await w(bt, t, T({
					operation: "save",
					key: e.key,
					revision: String(e.revision),
					mode: n,
					values: JSON.stringify(a)
				}));
				b(n === "publish" ? "Veröffentlicht. Die Website zeigt Ihre Änderungen." : "Entwurf gespeichert. Besucher sehen weiterhin die veröffentlichte Version."), r(i);
			} catch (e) {
				g(e.message);
			} finally {
				u(!1);
			}
		}
	}
	async function O() {
		if (!p) {
			u(!0), g("");
			try {
				S((await w(bt, t, T({
					operation: "preview",
					key: e.key,
					values: JSON.stringify(a)
				}))).values);
			} catch (e) {
				g(e.message);
			} finally {
				u(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "editorial-document",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: e.schema.title }),
			/* @__PURE__ */ (0, _.jsxs)("p", {
				className: "club-hint",
				children: [e.hasDraft ? "Sie bearbeiten den gespeicherten Entwurf." : "Sie bearbeiten den veröffentlichten Inhalt.", " Erst «Veröffentlichen» ändert die sichtbare Website."]
			}),
			e.hasDraft && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "editorial-draft-banner",
				role: "status",
				children: [
					/* @__PURE__ */ (0, _.jsx)("strong", { children: "Dieser Entwurf ist noch nicht auf der Website sichtbar." }),
					/* @__PURE__ */ (0, _.jsx)("p", { children: "Das gilt auch für neu hochgeladene Bilder. Prüfe die Vorschau und veröffentliche anschliessend die gesamte Seite." }),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: p,
						onClick: () => void D("publish"),
						children: "Änderungen veröffentlichen"
					})
				]
			}),
			/* @__PURE__ */ (0, _.jsx)(We, {
				docKey: e.key,
				nonce: t,
				disabled: p,
				uploadState: f,
				regional: e.key.startsWith("region-") || e.key === "triungsters"
			}),
			/* @__PURE__ */ (0, _.jsx)("fieldset", {
				disabled: p,
				children: E.filter((e) => !e.translationOf).map((n, r, i) => /* @__PURE__ */ (0, _.jsxs)(h.Fragment, { children: [n.section && n.section !== i[r - 1]?.section && /* @__PURE__ */ (0, _.jsxs)("h3", {
					className: "editorial-section" + (n.section === "admin" ? " is-admin" : ""),
					children: [o(yt[n.section] || ""), n.section === "admin" && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Nur für die Administration sichtbar") })]
				}), /* @__PURE__ */ (0, _.jsx)(wt, {
					field: n,
					imageUrl: String(a[n.imageKey || "image"] || ""),
					value: a[n.key],
					onChange: (t) => {
						s((r) => ({
							...r,
							[n.key]: t,
							...n.key === "image" && t && e.key.startsWith("model-") && !String(r.imageAlt || "").trim() ? { imageAlt: String(r.title || e.schema.title) } : {}
						})), S(null);
					},
					nonce: t,
					docKey: e.key,
					disabled: p,
					uploadState: f
				})] }, n.key))
			}),
			/* @__PURE__ */ (0, _.jsxs)("details", { children: [
				/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Französische Inhalte") }),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Leere französische Felder zeigen den vorhandenen deutschen Inhalt.")
				}),
				/* @__PURE__ */ (0, _.jsx)("fieldset", {
					disabled: p,
					children: E.filter((e) => e.translationOf).map((n) => /* @__PURE__ */ (0, _.jsx)(wt, {
						field: n,
						value: a[n.key],
						onChange: (e) => {
							s((t) => ({
								...t,
								[n.key]: e
							})), S(null);
						},
						nonce: t,
						docKey: e.key,
						disabled: p,
						uploadState: f
					}, n.key))
				})
			] }),
			e.history.length > 0 && /* @__PURE__ */ (0, _.jsxs)("label", {
				className: "editorial-history",
				children: ["Frühere Fassung ins Formular laden", /* @__PURE__ */ (0, _.jsxs)("select", {
					disabled: p,
					defaultValue: "",
					onChange: (t) => {
						t.target.value !== "" && (s(e.history[Number(t.target.value)].values), S(null));
					},
					children: [/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: "Fassung auswählen …"
					}), e.history.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("option", {
						value: t,
						children: [
							new Date(e.at).toLocaleString("de-CH"),
							" · ",
							e.by
						]
					}, t))]
				})]
			}),
			m && /* @__PURE__ */ (0, _.jsxs)("p", {
				ref: c,
				tabIndex: -1,
				role: "alert",
				className: "collection-state error",
				children: [m, " Ihre Eingaben bleiben erhalten."]
			}),
			/* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				className: "editorial-state",
				children: C ? "Ungespeicherte Änderungen – bitte Entwurf speichern oder veröffentlichen." : y
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "editorial-save",
				children: [
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: p,
						onClick: () => void O(),
						children: o("Vorschau")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: p,
						onClick: () => void D("draft"),
						children: o("Entwurf speichern")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: p,
						onClick: () => void D("publish"),
						children: d ? "Bild wird hochgeladen …" : l ? "Bitte warten …" : "Veröffentlichen"
					}),
					/* @__PURE__ */ (0, _.jsx)("a", {
						href: e.schema.route,
						children: o("Seite ansehen")
					})
				]
			}),
			x && /* @__PURE__ */ (0, _.jsxs)("section", {
				className: "editorial-preview",
				"aria-label": o("Inhaltsvorschau"),
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Inhaltsvorschau") }), e.key.startsWith("region-") ? /* @__PURE__ */ (0, _.jsx)(Ke, {
					documentKey: e.key,
					values: le(x, i)
				}) : pt(e.key) ? /* @__PURE__ */ (0, _.jsx)(vt, {
					documentKey: e.key,
					values: le(x, i),
					preview: !0
				}) : e.schema.fields.filter((e) => !e.legacy && e.type !== "imageFrame").map((e) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: e.label }), e.type === "rich" ? /* @__PURE__ */ (0, _.jsx)(de, { html: String(x[e.key]) }) : e.type === "text" || e.type === "textarea" || e.type === "url" || e.type === "imageFrame" ? /* @__PURE__ */ (0, _.jsx)("p", { children: String(x[e.key]) }) : e.type === "image" ? x[e.key] ? /* @__PURE__ */ (0, _.jsx)(v, {
					src: pe(String(x[e.key])),
					width: 200,
					height: 160,
					alt: e.label
				}) : null : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "editorial-image-list",
					children: x[e.key].map((e, t) => /* @__PURE__ */ (0, _.jsx)(v, {
						src: pe(e.image || e.url),
						alt: e.alt || e.name,
						width: 180,
						height: 120
					}, t))
				})] }, e.key))]
			})
		]
	});
}
function wt({ field: e, imageUrl: t = "", value: n, onChange: r, nonce: i, docKey: a, disabled: s = !1, uploadState: c }) {
	if (e.type === "textarea") return /* @__PURE__ */ (0, _.jsxs)("label", { children: [e.label, /* @__PURE__ */ (0, _.jsx)("textarea", {
		rows: 2,
		value: String(n ?? "").replace(/\s*\|\s*/g, "\n"),
		onChange: (e) => r(e.target.value)
	})] });
	if (e.type === "imageFrame") return /* @__PURE__ */ (0, _.jsx)(_e, {
		label: e.label,
		value: String(n || ""),
		image: t,
		changed: r
	});
	if (e.type === "rich") return /* @__PURE__ */ (0, _.jsx)(Re, {
		label: e.label,
		value: String(n ?? ""),
		onChange: r,
		disabled: s
	});
	if (e.type === "image") return /* @__PURE__ */ (0, _.jsx)(Tt, {
		label: e.label,
		value: String(n ?? ""),
		changed: (e) => r(e),
		nonce: i,
		target: { key: a },
		uploadState: c
	});
	if (e.type === "people") {
		let t = Array.isArray(n) ? n : [], s = (e, n, i) => r(t.map((t, r) => r === e ? {
			...t,
			[n]: i
		} : t));
		return /* @__PURE__ */ (0, _.jsxs)("section", {
			className: "editorial-people",
			children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: e.label }),
				/* @__PURE__ */ (0, _.jsxs)("p", { children: [
					"Bis zu ",
					e.maxItems,
					" Personen. Leere Einträge erscheinen nur in der Vorschau."
				] }),
				t.map((e, n) => /* @__PURE__ */ (0, _.jsxs)("fieldset", {
					className: "editorial-person",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("legend", { children: [
							o("Person"),
							" ",
							n + 1
						] }),
						/* @__PURE__ */ (0, _.jsx)(Tt, {
							label: `Porträt ${n + 1}`,
							value: e.image,
							frame: e.frame || "cover|50|50",
							frameChanged: (e) => s(n, "frame", e),
							portrait: !0,
							changed: (e) => s(n, "image", e),
							nonce: i,
							target: { key: a },
							uploadState: c
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Name"), /* @__PURE__ */ (0, _.jsx)("input", {
							value: e.name,
							onChange: (e) => s(n, "name", e.target.value)
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Funktion"), /* @__PURE__ */ (0, _.jsx)("input", {
							value: e.role,
							onChange: (e) => s(n, "role", e.target.value)
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Funktion (FR)"), /* @__PURE__ */ (0, _.jsx)("input", {
							value: e.roleFr || "",
							onChange: (e) => s(n, "roleFr", e.target.value)
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bezeichnung (FR, optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
							value: e.nameFr || "",
							onChange: (e) => s(n, "nameFr", e.target.value)
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail"), /* @__PURE__ */ (0, _.jsx)("input", {
							type: "email",
							maxLength: 254,
							value: e.email || "",
							onChange: (e) => s(n, "email", e.target.value)
						})] }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							onClick: () => r(t.filter((e, t) => t !== n)),
							children: o("Person entfernen")
						})
					]
				}, n)),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					disabled: t.length >= (e.maxItems || 30),
					onClick: () => r([...t, {
						image: "",
						name: "",
						role: ""
					}]),
					children: o("Person hinzufügen")
				})
			]
		});
	}
	if (e.type === "images" || e.type === "partners" || e.type === "storyImages") {
		let t = Array.isArray(n) ? n : [], s = (e, n, i) => r(t.map((t, r) => r === e ? {
			...t,
			[n]: i
		} : t));
		return /* @__PURE__ */ (0, _.jsxs)("section", {
			className: "editorial-media",
			children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: e.label }),
				t.map((n, l) => /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "editorial-media-row",
					children: [
						/* @__PURE__ */ (0, _.jsx)(Tt, {
							label: `Bild ${l + 1}`,
							value: n.image || n.url,
							frame: n.frame || (e.type === "images" ? "cover|50|50" : "contain|50|50"),
							frameChanged: e.type === "partners" ? void 0 : (e) => s(l, "frame", e),
							changed: (t) => s(l, e.type === "partners" ? "image" : "url", t),
							nonce: i,
							target: { key: a },
							uploadState: c
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [e.type === "partners" ? "Partnername" : "Bildbeschreibung", /* @__PURE__ */ (0, _.jsx)("input", {
							value: n.alt ?? n.name,
							onChange: (t) => s(l, e.type === "partners" ? "name" : "alt", t.target.value)
						})] }),
						e.type !== "partners" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bildbeschreibung (FR)"), /* @__PURE__ */ (0, _.jsx)("input", {
							value: n.altFr || "",
							onChange: (e) => s(l, "altFr", e.target.value)
						})] }),
						a === "home" && e.key === "photos" && /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Bildstreifen", /* @__PURE__ */ (0, _.jsxs)("select", {
							value: n.group || "",
							onChange: (e) => s(l, "group", e.target.value),
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: "Automatisch zuordnen"
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "tr",
									children: "Links · Triumphs"
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "trips",
									children: "Rechts · Ausflüge"
								})
							]
						})] }),
						e.type === "storyImages" && /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Nach Textblock (0 = vor dem Text)", /* @__PURE__ */ (0, _.jsx)("input", {
							type: "number",
							min: "0",
							max: "999",
							step: "1",
							value: n.position ?? String((l + 1) * 2),
							onChange: (e) => s(l, "position", e.target.value)
						})] }),
						e.type === "partners" && /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Partner-Website", /* @__PURE__ */ (0, _.jsx)("input", {
							type: "url",
							value: n.url,
							onChange: (e) => s(l, "url", e.target.value)
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-actions",
							children: [
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									disabled: l === 0,
									onClick: () => {
										let e = [...t];
										[e[l - 1], e[l]] = [e[l], e[l - 1]], r(e);
									},
									children: o("Nach oben")
								}),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									disabled: l === t.length - 1,
									onClick: () => {
										let e = [...t];
										[e[l + 1], e[l]] = [e[l], e[l + 1]], r(e);
									},
									children: o("Nach unten")
								}),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									onClick: () => r(t.filter((e, t) => t !== l)),
									children: o("Entfernen")
								})
							]
						})
					]
				}, l)),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					disabled: t.length >= (e.maxItems || 30),
					onClick: () => r([...t, e.type === "partners" ? {
						url: "",
						image: "",
						name: ""
					} : e.type === "storyImages" ? {
						url: "",
						alt: "",
						position: String((t.length + 1) * 2)
					} : {
						url: "",
						alt: ""
					}]),
					children: o("Eintrag hinzufügen")
				})
			]
		});
	}
	return /* @__PURE__ */ (0, _.jsxs)("label", { children: [e.label, /* @__PURE__ */ (0, _.jsx)("input", {
		value: String(n ?? ""),
		onChange: (e) => r(e.target.value)
	})] });
}
function Tt({ label: e, value: t, changed: n, nonce: r, target: i, uploadState: a, uploadAction: s = bt, frame: c, frameChanged: l, portrait: u = !1 }) {
	let [d, f] = (0, h.useState)(!1), [p, m] = (0, h.useState)(""), [g, y] = (0, h.useState)(!1), [b, x] = (0, h.useState)("");
	async function S(e) {
		if (e.size > 20 * 1024 * 1024) {
			m("Bitte ein Bild bis 20 MB wählen.");
			return;
		}
		f(!0), a?.(!0), y(!1), m(""), x("");
		try {
			let t = T({
				operation: "upload",
				...i
			});
			t.set("file", e);
			let a = await w(s, r, t);
			n(a.url, a.id), y(!0);
		} catch (e) {
			m(e.message);
		} finally {
			f(!1), a?.(!1);
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "editorial-image",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("label", { children: [e, /* @__PURE__ */ (0, _.jsx)("input", {
				readOnly: i.kind === "news",
				value: t,
				placeholder: "Bildadresse",
				onChange: (e) => n(e.target.value, 0)
			})] }),
			t && /* @__PURE__ */ (0, _.jsx)(v, {
				src: pe(t),
				width: 180,
				height: 110,
				alt: e,
				onError: () => x(t)
			}),
			/* @__PURE__ */ (0, _.jsxs)("label", {
				className: "editorial-upload",
				children: [d ? "Bild wird hochgeladen …" : "Bild auswählen / ersetzen", /* @__PURE__ */ (0, _.jsx)("input", {
					type: "file",
					disabled: d,
					accept: "image/jpeg,image/png,image/webp",
					onChange: (e) => {
						let t = e.target.files?.[0];
						t && S(t), e.target.value = "";
					}
				})]
			}),
			t && l && /* @__PURE__ */ (0, _.jsx)(_e, {
				image: t,
				value: c,
				changed: l,
				portrait: u
			}),
			" ",
			t && /* @__PURE__ */ (0, _.jsx)("button", {
				type: "button",
				className: "market-text-button",
				onClick: () => n("", 0),
				children: o("Bild entfernen")
			}),
			/* @__PURE__ */ (0, _.jsx)("small", { children: "Öffentliches Bild · JPG, PNG oder WebP · maximal 20 MB" }),
			g && t && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				className: "club-hint",
				children: "Bild hochgeladen und eingefügt. Bitte «Vorschau» prüfen und anschliessend «Veröffentlichen» wählen, damit es auf der Website erscheint."
			}),
			t && b === t && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: "Das Bild konnte nicht angezeigt werden. Bitte Bildadresse prüfen oder erneut hochladen."
			}),
			p && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: p
			})
		]
	});
}
function Et({ kind: e, nonce: t, changed: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)(null), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(!0);
	return (0, h.useEffect)(() => {
		let t = new AbortController(), n = setTimeout(() => {
			C(bt, {
				operation: "posts",
				kind: e,
				page: String(c),
				search: u
			}, t.signal).then((e) => {
				i(e.items), s(e.pages), x(!1);
			}).catch((e) => {
				t.signal.aborted || (y(e.message), x(!1));
			});
		}, 150);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [
		e,
		c,
		u,
		f
	]), m ? /* @__PURE__ */ (0, _.jsx)(Dt, {
		item: m,
		kind: e,
		nonce: t,
		saved: () => {
			g(null), p((e) => e + 1), n();
		},
		back: () => {
			window.confirm("Bearbeitung schliessen? Nicht gespeicherte Eingaben gehen verloren.") && g(null);
		}
	}, m.id) : /* @__PURE__ */ (0, _.jsxs)("div", { children: [
		/* @__PURE__ */ (0, _.jsxs)("h2", { children: [xt[e], " verwalten"] }),
		/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-toolbar",
			children: [e === "news" ? /* @__PURE__ */ (0, _.jsx)("button", {
				className: "market-primary",
				onClick: () => g({
					id: 0,
					title: "",
					body: "",
					excerpt: "",
					status: "draft",
					version: "",
					image: "",
					imageId: 0,
					price: ""
				}),
				children: "Newsbeitrag erstellen"
			}) : /* @__PURE__ */ (0, _.jsx)("a", {
				className: "club-secondary",
				href: "#" + ({
					gallery: "galerie",
					library: "bibliothek",
					market: "marktplatz"
				}[e] || e),
				children: "Zum Bereich / neuen Beitrag erstellen"
			}), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Beiträge suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
				type: "search",
				value: u,
				onChange: (e) => {
					d(e.target.value), l(1), x(!0);
				}
			})] })]
		}),
		v && /* @__PURE__ */ (0, _.jsx)("p", {
			role: "alert",
			children: v
		}),
		b ? /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Beiträge werden geladen …")
		}) : /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "editorial-post-list",
			children: [!r.length && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Noch keine Beiträge vorhanden.") }), r.map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
				className: "editorial-card",
				onClick: () => g(e),
				children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.title }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [e.status === "publish" ? "Veröffentlicht" : e.status === "trash" ? "Archiv" : "Entwurf", " · Bearbeiten"] })]
			}, e.id))]
		}),
		/* @__PURE__ */ (0, _.jsx)(en, {
			page: c,
			pages: a,
			change: l
		})
	] });
}
function Dt({ item: e, kind: t, nonce: n, saved: r, back: i }) {
	let [a, s] = (0, h.useState)(e), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)("");
	async function f(e) {
		e.preventDefault(), l(!0), d("");
		try {
			await w(bt, n, T({
				operation: "post-save",
				kind: t,
				...Object.fromEntries(Object.entries(a).map(([e, t]) => [e, String(t)]))
			})), r();
		} catch (e) {
			d(e.message);
		} finally {
			l(!1);
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("form", {
		onSubmit: (e) => void f(e),
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: e.id ? "Beitrag bearbeiten" : "Newsbeitrag erstellen" }),
			/* @__PURE__ */ (0, _.jsxs)("fieldset", {
				disabled: c,
				children: [
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Titel"), /* @__PURE__ */ (0, _.jsx)("input", {
						required: !0,
						maxLength: 160,
						value: a.title,
						onChange: (e) => s((t) => ({
							...t,
							title: e.target.value
						}))
					})] }),
					/* @__PURE__ */ (0, _.jsx)(Re, {
						label: "Inhalt",
						value: a.body,
						onChange: (e) => s((t) => ({
							...t,
							body: e
						})),
						disabled: c
					}),
					t === "news" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kurztext für die Vorschau"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							rows: 3,
							value: a.excerpt,
							onChange: (e) => s((t) => ({
								...t,
								excerpt: e.target.value
							}))
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [
							/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Französische Fassung") }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Titel (FR)"), /* @__PURE__ */ (0, _.jsx)("input", {
								maxLength: 160,
								value: a.titleFr || "",
								onChange: (e) => s((t) => ({
									...t,
									titleFr: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, _.jsx)(Re, {
								label: o("Inhalt (FR)"),
								value: a.bodyFr || "",
								onChange: (e) => s((t) => ({
									...t,
									bodyFr: e
								})),
								disabled: c
							}),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kurztext (FR)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								value: a.excerptFr || "",
								onChange: (e) => s((t) => ({
									...t,
									excerptFr: e.target.value
								}))
							})] })
						] }),
						/* @__PURE__ */ (0, _.jsx)(Tt, {
							label: "Beitragsbild",
							value: a.image,
							nonce: n,
							target: { kind: "news" },
							changed: (e, t) => s((n) => ({
								...n,
								image: e,
								imageId: t
							}))
						})
					] }),
					t === "market" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Preis in CHF"), /* @__PURE__ */ (0, _.jsx)("input", {
						required: !0,
						inputMode: "decimal",
						value: a.price,
						onChange: (e) => s((t) => ({
							...t,
							price: e.target.value
						}))
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Status"), /* @__PURE__ */ (0, _.jsxs)("select", {
						value: a.status,
						onChange: (e) => s((t) => ({
							...t,
							status: e.target.value
						})),
						children: [
							/* @__PURE__ */ (0, _.jsx)("option", {
								value: "draft",
								children: o("Entwurf")
							}),
							/* @__PURE__ */ (0, _.jsx)("option", {
								value: "publish",
								children: o("Veröffentlicht")
							}),
							/* @__PURE__ */ (0, _.jsx)("option", {
								value: "trash",
								children: o("Archiv")
							})
						]
					})] })
				]
			}),
			u && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				className: "collection-state error",
				children: u
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "editorial-save",
				children: [/* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					type: "button",
					disabled: c,
					onClick: i,
					children: o("Zurück")
				}), /* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-primary",
					disabled: c,
					children: c ? "Wird gespeichert …" : "Beitrag speichern"
				})]
			})
		]
	});
}
//#endregion
//#region app/components/EventFinancePanel.tsx
var Ot = {
	reserved: "Reserviert",
	confirmed: "Bestätigt",
	waiting: "Warteliste",
	pending_payment: "Reserviert",
	expired: "Abgelaufen",
	cancelled: "Abgemeldet",
	payment_review: "Zahlung prüfen"
}, kt = {
	invoice: "Rechnung",
	twint: "TWINT",
	card: "Kreditkarte",
	none: "Keine Zahlung"
}, At = (e) => e.vehicle ? [e.vehicle.model, e.vehicle.registration].filter(Boolean).join(" · ") : "";
function jt({ eventId: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let t = new AbortController();
		return C("strc_event_finance", {
			operation: "list",
			eventId: String(e)
		}, t.signal).then(n).catch((e) => {
			t.signal.aborted || i(e.message);
		}), () => t.abort();
	}, [e, c]);
	function f() {
		if (!t) return;
		let n = (e) => "\"" + String(e).replace(/^[=+@\-\t\r]/, "'$&").replace(/"/g, "\"\"") + "\"", r = "﻿" + [[
			"Anmeldung",
			"Name",
			"Teilnehmende",
			"Fahrzeug",
			"Menüs",
			"Telefon",
			"E-Mail",
			"Betrag CHF",
			"Anmeldestatus",
			"Zahlungsart",
			"Zahlungsstand"
		], ...t.rows.map((e) => [
			e.id,
			e.name,
			e.participants,
			At(e),
			e.meals.join(" / "),
			e.phone || "",
			e.email || "",
			(e.total / 100).toFixed(2),
			Ot[e.state] || e.state,
			kt[e.paymentMethod] || e.paymentMethod,
			Bt[e.paymentStatus] || e.paymentStatus
		])].map((e) => e.map(n).join(";")).join("\r\n"), i = URL.createObjectURL(new Blob([r], { type: "text/csv;charset=utf-8" })), a = document.createElement("a");
		a.href = i, a.download = `strc-veranstaltung-${e}.csv`, a.click(), setTimeout(() => URL.revokeObjectURL(i), 1e3);
	}
	async function p(n, r) {
		if (!t || u) return;
		d(!0), i("");
		let a = new FormData(n);
		try {
			s((await w("strc_event_finance", t.nonce, T({
				operation: "reconcile",
				eventId: String(e),
				id: String(r.id),
				revision: r.revision,
				status: String(a.get("status")),
				note: String(a.get("note"))
			}))).message), l((e) => e + 1);
		} catch (e) {
			i(e.message);
		} finally {
			d(!1);
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "club-dialog-body",
		children: [/* @__PURE__ */ (0, _.jsx)(z, {
			error: r,
			message: a
		}), !t && !r ? /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Anmeldungen werden geladen …")
		}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
			/* @__PURE__ */ (0, _.jsxs)("p", {
				className: "club-hint",
				children: [t?.onlineReady ? "Online-Zahlung ist eingerichtet." : "Online-Zahlung ist noch nicht eingerichtet.", t?.canReconcile && !t.treasuryReady && " Die E-Mail-Adresse der Kasse fehlt noch; Rechnungsanfragen stehen bis dahin in dieser Übersicht."]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-actions",
				children: [/* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: f,
					disabled: !t?.rows.length,
					children: o("Liste für Excel exportieren")
				}), /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => l((e) => e + 1),
					children: o("Aktualisieren")
				})]
			}),
			t?.rows.length === 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Noch keine Anmeldungen.") }),
			!!t?.rows.length && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
					o("Teilnehmerliste"),
					" · ",
					t.rows.filter((e) => !["cancelled", "expired"].includes(e.state)).length,
					" ",
					o("Anmeldungen")
				] }),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "table-scroll",
					children: /* @__PURE__ */ (0, _.jsxs)("table", {
						className: "event-roster",
						children: [/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, _.jsx)("th", { children: o("Name") }),
							/* @__PURE__ */ (0, _.jsx)("th", { children: o("Status / Zahlung") }),
							/* @__PURE__ */ (0, _.jsx)("th", { children: o("Fahrzeug") }),
							/* @__PURE__ */ (0, _.jsx)("th", { children: o("Menüs") }),
							/* @__PURE__ */ (0, _.jsx)("th", { children: o("Telefon") }),
							/* @__PURE__ */ (0, _.jsx)("th", { children: o("E-Mail") })
						] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: t.rows.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", {
							className: ["cancelled", "expired"].includes(e.state) ? "is-cancelled" : "",
							children: [
								/* @__PURE__ */ (0, _.jsxs)("td", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.name }), e.participants && e.participants !== e.name && /* @__PURE__ */ (0, _.jsx)("small", { children: e.participants })] }),
								/* @__PURE__ */ (0, _.jsxs)("td", { children: [Ot[e.state] || e.state, /* @__PURE__ */ (0, _.jsx)("small", { children: Bt[e.paymentStatus] || e.paymentStatus })] }),
								/* @__PURE__ */ (0, _.jsx)("td", { children: At(e) || "–" }),
								/* @__PURE__ */ (0, _.jsx)("td", { children: e.meals.length ? e.meals.map((e) => /* @__PURE__ */ (0, _.jsx)("small", { children: e }, e)) : "–" }),
								/* @__PURE__ */ (0, _.jsx)("td", { children: e.phone ? /* @__PURE__ */ (0, _.jsx)("a", {
									href: "tel:" + e.phone.replace(/[^+\d]/g, ""),
									children: e.phone
								}) : "–" }),
								/* @__PURE__ */ (0, _.jsx)("td", { children: e.email ? /* @__PURE__ */ (0, _.jsx)("a", {
									href: "mailto:" + e.email,
									children: e.email
								}) : "–" })
							]
						}, e.id)) })]
					})
				}),
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Zahlungen und Details") })
			] }),
			t?.rows.map((n) => /* @__PURE__ */ (0, _.jsxs)("article", {
				className: "form-review",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
						n.name,
						" · ",
						Ot[n.state] || n.state
					] }),
					/* @__PURE__ */ (0, _.jsx)("p", { children: n.participants }),
					n.vehicle && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
						"Fahrzeug: ",
						n.vehicle.model,
						" ",
						n.vehicle.registration
					] }),
					n.meals.map((e) => /* @__PURE__ */ (0, _.jsx)("p", { children: e }, e)),
					n.room && /* @__PURE__ */ (0, _.jsxs)("p", { children: ["Unterkunft: ", n.room] }),
					n.notes && /* @__PURE__ */ (0, _.jsxs)("p", { children: ["Bemerkungen: ", n.notes] }),
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						/* @__PURE__ */ (0, _.jsx)("strong", { children: new Intl.NumberFormat("de-CH", {
							style: "currency",
							currency: "CHF"
						}).format(n.total / 100) }),
						" · ",
						kt[n.paymentMethod] || n.paymentMethod,
						" · ",
						Bt[n.paymentStatus] || n.paymentStatus
					] }),
					t.canPromote && n.state === "waiting" && /* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: u,
						onClick: async () => {
							d(!0);
							try {
								s((await w("strc_event_finance", t.nonce, T({
									operation: "promote",
									eventId: String(e),
									id: String(n.id),
									revision: n.revision
								}))).message), l((e) => e + 1);
							} catch (e) {
								i(e.message);
							} finally {
								d(!1);
							}
						},
						children: o("Teilnahme von Warteliste bestätigen")
					}),
					t.canReconcile && n.state !== "waiting" && n.paymentMethod === "invoice" && /* @__PURE__ */ (0, _.jsxs)("details", { children: [
						/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Zahlungsstand abstimmen") }),
						/* @__PURE__ */ (0, _.jsxs)("form", {
							className: "club-form",
							onSubmit: (e) => {
								e.preventDefault(), p(e.currentTarget, n);
							},
							children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zahlungsstand"), /* @__PURE__ */ (0, _.jsx)("select", {
									name: "status",
									defaultValue: n.paymentStatus,
									children: [
										"outstanding",
										"partially_paid",
										"paid",
										"waived",
										"refund_pending",
										"refunded"
									].map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
										value: e,
										children: Bt[e]
									}, e))
								})] }),
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Beleg / Begründung"), /* @__PURE__ */ (0, _.jsx)("textarea", {
									name: "note",
									maxLength: 500,
									required: !0,
									rows: 2
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									disabled: u,
									className: "market-primary",
									children: o("Zahlungsstand speichern")
								})
							]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Dies dokumentiert den Abgleich mit Fairgate. Es wird kein Geld eingezogen oder zurückerstattet."
						}),
						n.financeAudit.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("p", { children: [
							new Date(e.at).toLocaleString("de-CH"),
							" · ",
							Bt[e.to],
							" · ",
							e.note
						] }, t))
					] })
				]
			}, n.id))
		] })]
	});
}
//#endregion
//#region app/components/RegistrationForm.tsx
var Mt = {
	type: "",
	firstName: "",
	lastName: "",
	memberNumber: ""
}, Nt = () => ({
	firstName: "",
	lastName: "",
	vehicle: "",
	copilot: { ...Mt },
	room: "double"
}), Pt = {
	member: "fee",
	copilot: "copilotFee",
	guest: "guestFee",
	"guest-copilot": "guestCopilotFee"
};
function Ft(e, t, n) {
	let r = Pt[t];
	return (e.weekend && n === "double" ? e[`${r}Double`] : e[r]) || 0;
}
function It(e, t, n) {
	let r = t.copilot.type ? t.room : "single";
	return Ft(e, n ? "member" : "guest", r) + (t.copilot.type ? Ft(e, t.copilot.type === "guest" ? "guest-copilot" : "copilot", r) : 0);
}
function Lt(e, t) {
	let n = [Nt()];
	for (let r of e) {
		let e = (r.crew || (r.kind === "guest" ? n.length + 1 : 1)) - 1;
		if (r.kind === "member") {
			r.room && (n[0].room = r.room === "single" ? "single" : "double");
			continue;
		}
		for (; n.length <= e;) n.push(Nt());
		let i = n[e];
		if (r.kind === "guest") {
			Object.assign(i, {
				firstName: r.firstName || r.name,
				lastName: r.lastName || "",
				vehicle: r.vehicle || "",
				room: r.room === "single" ? "single" : "double"
			});
			continue;
		}
		i.copilot = {
			type: r.kind === "copilot" ? r.memberNumber || !t ? "member" : "partner" : "guest",
			firstName: r.firstName || r.name,
			lastName: r.lastName || "",
			memberNumber: r.memberNumber || ""
		};
	}
	return n;
}
var Rt = "strc_registration", zt = (e) => new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: "CHF"
}).format(e / 100), Bt = {
	not_required: "Nicht erforderlich",
	not_due: "Noch nicht fällig",
	outstanding: "Rechnung offen",
	pending: "Zahlung ausstehend",
	paid: "Bezahlt",
	partially_paid: "Teilweise bezahlt",
	refund_pending: "Rückerstattung ausstehend",
	refunded: "Rückerstattet",
	partially_refunded: "Teilweise rückerstattet",
	waived: "Erlassen / korrigiert",
	review_required: "Prüfung durch die Kasse",
	expired: "Zahlungsfrist abgelaufen"
}, Vt = {
	invoice: "Rechnung",
	twint: "TWINT",
	card: "Kreditkarte",
	none: "Keine Zahlung"
}, Ht = {
	reserved: "Teilnahme reserviert – Zahlung ausstehend",
	confirmed: "Teilnahme bestätigt",
	waiting: "Warteliste",
	cancelled: "Abgemeldet",
	pending_payment: "Plätze reserviert – Zahlung ausstehend",
	expired: "Reservierung abgelaufen",
	payment_review: "Zahlung wird durch die Kasse geprüft"
}, Ut = [
	["fee", "Buchung Mitglied"],
	["copilotFee", "Buchung Co-Pilot Mitglied"],
	["guestFee", "Buchung Gast"],
	["guestCopilotFee", "Buchung Co-Pilot Gast"]
], Wt = (e) => ((e || 0) / 100).toFixed(2);
function Gt({ event: e, localDate: t, nonce: n, eventId: r, uploadState: i, organisers: a, weekend: s = !1 }) {
	let [c, l] = (0, h.useState)(e?.registrationRequired || !1), u = e?.registration, [d, f] = (0, h.useState)(u?.organiserUserId ? String(u.organiserUserId) : ""), [p, m] = (0, h.useState)(u?.organiser || ""), [g, v] = (0, h.useState)({
		programImage: u?.programImage || "",
		agendaImage: u?.agendaImage || ""
	});
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)(B, {
			title: o("Programm & Ausfahrt"),
			collapsible: !0,
			open: !!(u?.program || u?.agenda || u?.programImage || u?.agendaImage),
			note: "optional · Programm, Teilnahmeinfos, Bilder",
			children: [/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Programm / Tagesablauf"), /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_program",
					rows: 6,
					maxLength: 5e3,
					defaultValue: u?.program || ""
				})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Teilnahmeinformationen"), /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_agenda",
					rows: 6,
					maxLength: 5e3,
					defaultValue: u?.agenda || ""
				})] })]
			}), ["programImage", "agendaImage"].map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
				type: "hidden",
				name: "reg_" + e,
				value: g[e]
			}), /* @__PURE__ */ (0, _.jsx)(Tt, {
				label: t === 0 ? "Programmbild" : "Bild zur Ausfahrt",
				value: g[e],
				changed: (t) => v((n) => ({
					...n,
					[e]: t
				})),
				nonce: n,
				target: { id: String(r) },
				uploadAction: "strc_events",
				uploadState: i
			})] }, e))]
		}),
		/* @__PURE__ */ (0, _.jsxs)(B, {
			title: o("Organisator"),
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [
				o("Veranstaltungsleitung (nominiertes Mitglied)"),
				/* @__PURE__ */ (0, _.jsxs)("select", {
					name: "reg_organiserUserId",
					value: d,
					onChange: (e) => {
						let t = e.target.value;
						f(t);
						let n = a.find((e) => String(e.id) === t);
						n && !p.trim() && m(n.name);
					},
					children: [/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: o("Bitte wählen (bei externer Leitung leer lassen)")
					}), a.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
						value: e.id,
						children: e.name
					}, e.id))]
				}),
				/* @__PURE__ */ (0, _.jsx)("small", { children: o("Die nominierte Person erhält Zugriff auf diesen Termin und die Teilnehmerliste (mit Funktion «Event-Organisation»). Ein Erlass des Grundbeitrags gilt automatisch für sie.") })
			] }), /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Veranstaltungsleiter/in · Ansprechperson *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_organiser",
						required: !0,
						maxLength: 200,
						value: p,
						onChange: (e) => m(e.target.value)
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kontakt-E-Mail *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_organiserEmail",
						type: "email",
						required: !0,
						maxLength: 200,
						defaultValue: u?.organiserEmail || ""
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mobilnummer *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_organiserMobile",
						type: "tel",
						required: !0,
						maxLength: 40,
						pattern: "[+0-9() ./-]{7,40}",
						defaultValue: u?.organiserMobile || ""
					})] })
				]
			})]
		}),
		/* @__PURE__ */ (0, _.jsxs)(B, {
			title: o("Anmeldung konfigurieren"),
			children: [
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						name: "registrationRequired",
						value: "1",
						checked: c,
						onChange: (e) => l(e.target.checked)
					}), o("Anmeldung erforderlich")]
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: "Ohne Anmeldung werden die Angaben dazu ausgeblendet; sie bleiben gespeichert."
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					hidden: !c,
					children: [
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Anmeldung ab (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								type: "datetime-local",
								name: "registrationOpenAt",
								defaultValue: t(e?.registrationOpenAt || "")
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Offen bis (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								type: "datetime-local",
								name: "registrationCloseAt",
								defaultValue: t(e?.registrationCloseAt || "")
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [
								o("Maximale Personenzahl"),
								/* @__PURE__ */ (0, _.jsx)("input", {
									name: "capacity",
									type: "number",
									min: 0,
									max: 1e5,
									defaultValue: e?.capacity || 0
								}),
								/* @__PURE__ */ (0, _.jsx)("small", { children: "0 = keine Begrenzung. Gäste zählen mit." })
							] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
								o("Zusätzliche Gast-Buchungen pro Anmeldung"),
								/* @__PURE__ */ (0, _.jsx)("input", {
									name: "reg_guests",
									type: "number",
									min: 0,
									max: 2,
									defaultValue: Math.min(2, u?.guests ?? 2)
								}),
								/* @__PURE__ */ (0, _.jsx)("small", { children: o("Gast als Pilot mit eigenem Fahrzeug, optional mit Co-Pilot (Gast). 0 = keine Gäste.") })
							] })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								name: "reg_copilot",
								type: "checkbox",
								value: "1",
								defaultChecked: u?.copilot ?? !0
							}), o("Co-Piloten zulassen (Mitglied oder Gast)")]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								name: "reg_vehicle",
								type: "checkbox",
								value: "1",
								defaultChecked: u?.vehicle ?? !0
							}), o("Fahrzeugauswahl anzeigen")]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								name: "reg_waitlist",
								type: "checkbox",
								value: "1",
								defaultChecked: u?.waitlist
							}), o("Bei voller Kapazität Warteliste führen")]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Externer Anmeldelink (optional)"),
							/* @__PURE__ */ (0, _.jsx)("input", {
								type: "url",
								name: "reg_externalUrl",
								maxLength: 200,
								defaultValue: u?.externalUrl || ""
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: "Bei externem Link erfolgt die Anmeldung dort." })
						] })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)(B, {
			title: o("Beiträge & Optionen"),
			hidden: !c,
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Alle Beträge in CHF pro Person. 0 = kostenlos. Bei kostenpflichtigen Anmeldungen stehen Rechnung und – nach Einrichtung – TWINT / Kreditkarte über zahls.ch zur Auswahl. Rechnungen erstellt die Kasse in Fairgate.")
				}),
				s && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Weekend: Pro Person je ein Preis für Einzelzimmer und für Doppelzimmer. Wer allein bucht, erhält ein Einzelzimmer; mit Co-Pilot wählt man Doppelzimmer oder 2 × Einzelzimmer.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "event-fee-grid" + (s ? " is-weekend" : ""),
					children: [s && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("span", { "aria-hidden": "true" }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Einzelzimmer") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Doppelzimmer") })
					] }), Ut.map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)(h.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("span", {
							className: "event-fee-label",
							children: o(t)
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsxs)("span", {
							className: "visually-hidden",
							children: [o(t), s ? " · " + o("Einzelzimmer") : ""]
						}), /* @__PURE__ */ (0, _.jsx)("input", {
							name: `reg_${e}`,
							inputMode: "decimal",
							"aria-label": o(t) + (s ? " · " + o("Einzelzimmer") : ""),
							defaultValue: Wt(u?.[e])
						})] }),
						s ? /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsxs)("span", {
							className: "visually-hidden",
							children: [
								o(t),
								" · ",
								o("Doppelzimmer")
							]
						}), /* @__PURE__ */ (0, _.jsx)("input", {
							name: `reg_${e}Double`,
							inputMode: "decimal",
							"aria-label": o(t) + " · " + o("Doppelzimmer"),
							defaultValue: Wt(u?.[`${e}Double`])
						})] }) : /* @__PURE__ */ (0, _.jsx)("input", {
							type: "hidden",
							name: `reg_${e}Double`,
							value: Wt(u?.[`${e}Double`])
						})
					] }, e))]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						name: "reg_organiserFree",
						value: "1",
						defaultChecked: u?.organiserFree
					}), o("Grundbeitrag für die Veranstaltungsleitung erlassen")]
				}),
				/* @__PURE__ */ (0, _.jsx)("input", {
					type: "hidden",
					name: "reg_organiserMemberNumber",
					value: u?.organiserMemberNumber || ""
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Der Erlass gilt für die oben nominierte Veranstaltungsleitung, sobald sie sich anmeldet. Essen und Unterkunft bleiben kostenpflichtig.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Essensauswahl je Person (optional)", /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_meals",
					rows: 3,
					maxLength: 2e3,
					defaultValue: u?.meals || "",
					placeholder: "Vegetarisch | 25.00\nFleisch | 30.00"
				})] }),
				s ? /* @__PURE__ */ (0, _.jsx)("input", {
					type: "hidden",
					name: "reg_rooms",
					value: u?.rooms || ""
				}) : /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Zimmer / Unterkunft je Anmeldung (optional)", /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_rooms",
					rows: 3,
					maxLength: 2e3,
					defaultValue: u?.rooms || "",
					placeholder: "Ohne Übernachtung | 0\nDoppelzimmer | 180.00"
				})] }),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: "Eine Option je Zeile: Bezeichnung | Aufpreis in CHF. Leere Felder werden im Anmeldeformular ausgeblendet. Zimmerzuteilung erfolgt manuell."
				})
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)(B, {
			title: o("Teilnahme & Abmeldung"),
			hidden: !c,
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bedingungen"), /* @__PURE__ */ (0, _.jsx)("textarea", {
				name: "reg_conditions",
				maxLength: 2e3,
				rows: 4,
				defaultValue: u?.conditions || "Kostenfreie Abmeldung bis vier Tage vor Veranstaltungsbeginn. Danach bleibt der Teilnahmebeitrag grundsätzlich geschuldet."
			})] }), /* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Abmeldefrist anpassen") }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
				o("Abmeldung bis (optional)"),
				/* @__PURE__ */ (0, _.jsx)("input", {
					type: "datetime-local",
					name: "reg_cancelAt",
					defaultValue: t(u?.cancelAt || "")
				}),
				/* @__PURE__ */ (0, _.jsx)("small", { children: "Ohne Angabe: vier Tage vor Beginn. Mehrtägige Veranstaltungen benötigen passende eigene Bedingungen." })
			] })] })]
		})
	] });
}
function Kt({ value: e }) {
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "form-review",
		children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: e.eventTitle }), /* @__PURE__ */ (0, _.jsxs)("dl", { children: [
			/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Teilnehmende") }),
			/* @__PURE__ */ (0, _.jsx)("dd", { children: e.participants.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [e.name, e.meal ? ` · ${e.meal}` : ""] }, t)) }),
			e.vehicle && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Fahrzeug") }), /* @__PURE__ */ (0, _.jsxs)("dd", { children: [
				e.vehicle.model,
				" ",
				e.vehicle.registration
			] })] }),
			e.room && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Unterkunft") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.room })] }),
			/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Gesamtbetrag") }),
			/* @__PURE__ */ (0, _.jsx)("dd", { children: /* @__PURE__ */ (0, _.jsx)("strong", { children: zt(e.total) }) }),
			e.notes && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Bemerkungen") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.notes })] })
		] })]
	});
}
function qt({ eventId: e, memberAccess: t, hideTitle: n = !1 }) {
	let [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)([Nt()]), [v, y] = (0, h.useState)(null), [b, x] = (0, h.useState)("invoice"), [S, E] = (0, h.useState)(!1), [D, O] = (0, h.useState)(!1), k = (0, h.useRef)(null), A = (0, h.useRef)(!1);
	if ((0, h.useEffect)(() => {
		if (!t) return;
		let n = new AbortController();
		return C(Rt, {
			operation: "config",
			eventId: String(e)
		}, n.signal).then((e) => {
			i(e), d(""), !e.registration && e.copilotGuest && e.settings.copilot && g([{
				...Nt(),
				copilot: {
					type: "guest",
					firstName: e.copilotGuest.firstName,
					lastName: e.copilotGuest.lastName,
					memberNumber: ""
				}
			}]);
		}).catch((e) => {
			n.signal.aborted || l(e.message);
		}), () => n.abort();
	}, [
		e,
		t,
		a
	]), (0, h.useEffect)(() => {
		if (!["pending_payment", "reserved"].includes(r?.registration?.state || "")) return;
		let e = window.setInterval(() => {
			document.visibilityState === "visible" && s((e) => e + 1);
		}, 1e4);
		return () => window.clearInterval(e);
	}, [r?.registration?.state]), !t) return /* @__PURE__ */ (0, _.jsxs)("p", {
		className: "form-review",
		children: [
			o("Für die Anmeldung benötigen Sie Ihren Mitgliederzugang."),
			" ",
			/* @__PURE__ */ (0, _.jsx)("a", {
				href: "#mitglieder",
				children: o("Zum Mitglieder-Login →")
			})
		]
	});
	async function j(t) {
		if (!r || A.current) return;
		A.current = !0, p(!0), l("");
		let n = new FormData(t);
		n.set("operation", v ? "submit" : "preview"), n.set("eventId", String(e)), n.set("paymentMethod", b), n.set("crews", JSON.stringify(m.map((e, t) => ({
			...t ? { pilot: {
				firstName: e.firstName,
				lastName: e.lastName,
				vehicle: e.vehicle
			} } : {},
			copilot: e.copilot.type ? e.copilot : null,
			room: e.room
		}))));
		let a = m.reduce((e, t) => e + 1 + +!!t.copilot.type, 0);
		n.set("selections", JSON.stringify(Array.from({ length: a }, (e, t) => ({ meal: String(n.get(`meal_${t}`) || "") })))), D && r.registration && (n.set("id", String(r.registration.id)), n.set("revision", r.registration.revision)), v && n.set("reviewToken", v.reviewToken);
		try {
			if (v) {
				let e = await w(Rt, r.nonce, n);
				i({
					...r,
					registration: e.registration
				}), d(e.message), y(null), O(!1);
			} else y(await w(Rt, r.nonce, n));
		} catch (e) {
			l(e.message);
		} finally {
			A.current = !1, p(!1);
		}
	}
	async function M() {
		if (!(!r?.registration || A.current)) {
			A.current = !0, p(!0), l("");
			try {
				d((await w(Rt, r.nonce, T({
					operation: "cancel",
					eventId: String(e),
					id: String(r.registration.id),
					revision: r.registration.revision
				}))).message), s((e) => e + 1), E(!1);
			} catch (e) {
				l(e.message);
			} finally {
				A.current = !1, p(!1);
			}
		}
	}
	async function ee() {
		if (!(!r?.registration || f)) {
			p(!0), l("");
			try {
				let t = await w(Rt, r.nonce, T({
					operation: "invoice",
					eventId: String(e),
					id: String(r.registration.id),
					revision: r.registration.revision
				}));
				i({
					...r,
					registration: t.registration
				}), d(t.message);
			} catch (e) {
				l(e.message);
			} finally {
				p(!1);
			}
		}
	}
	let N = r?.registration, P = (e, t) => [e, t].filter(Boolean).join(" "), F = r ? m.flatMap((e, t) => [t ? P(e.firstName, e.lastName) || `Gast ${t}` : r.name, ...e.copilot.type ? [e.copilot.type === "partner" ? r.copilot || "Co-Pilot" : P(e.copilot.firstName, e.copilot.lastName) || "Co-Pilot"] : []]) : [], I = (e, t) => g((n) => n.map((n, r) => r === e ? {
		...n,
		...t
	} : n)), R = (e, t) => g((n) => n.map((n, r) => r === e ? {
		...n,
		copilot: {
			...n.copilot,
			...t
		}
	} : n));
	function te(e) {
		if (!r || !r.settings.copilot) return null;
		let t = m[e], n = e === 0, i = t.copilot.type;
		return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
			/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Co-Pilot"), /* @__PURE__ */ (0, _.jsxs)("select", {
				value: i,
				onChange: (t) => R(e, {
					...Mt,
					type: t.target.value
				}),
				children: [
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: o("Ohne Co-Pilot")
					}),
					n && r.copilot && /* @__PURE__ */ (0, _.jsxs)("option", {
						value: "partner",
						children: [
							r.copilot,
							" (",
							o("verknüpfter Co-Pilot"),
							")"
						]
					}),
					n && /* @__PURE__ */ (0, _.jsx)("option", {
						value: "member",
						children: o("Co-Pilot Mitglied")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "guest",
						children: o("Co-Pilot Gast")
					})
				]
			})] }),
			(i === "member" || i === "guest") && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Vorname Co-Pilot *"), /* @__PURE__ */ (0, _.jsx)("input", {
						required: !0,
						maxLength: 80,
						value: t.copilot.firstName,
						onChange: (t) => R(e, { firstName: t.target.value })
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachname Co-Pilot *"), /* @__PURE__ */ (0, _.jsx)("input", {
						required: !0,
						maxLength: 80,
						value: t.copilot.lastName,
						onChange: (t) => R(e, { lastName: t.target.value })
					})] }),
					i === "member" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
						o("Mitgliedsnummer *"),
						/* @__PURE__ */ (0, _.jsx)("input", {
							required: !0,
							maxLength: 32,
							value: t.copilot.memberNumber,
							onChange: (t) => R(e, { memberNumber: t.target.value })
						}),
						/* @__PURE__ */ (0, _.jsx)("small", { children: o("Nummer und Name werden mit den Mitgliederdaten abgeglichen.") })
					] })
				]
			}),
			r.settings.weekend && /* @__PURE__ */ (0, _.jsxs)("fieldset", {
				className: "crew-room",
				children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Zimmer") }), i ? /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: ["double", "single"].map((n) => /* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "radio",
						name: `room_${e}`,
						checked: t.room === n,
						onChange: () => I(e, { room: n })
					}), o(n === "double" ? "Doppelzimmer" : "2 × Einzelzimmer")]
				}, n)) }) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Einzelzimmer")
				})]
			})
		] });
	}
	function V(e) {
		if (!r) return null;
		let t = It(r.settings, m[e], e === 0);
		return t > 0 ? /* @__PURE__ */ (0, _.jsxs)("p", {
			className: "crew-price",
			children: [
				o("Beitrag dieser Buchung"),
				": ",
				/* @__PURE__ */ (0, _.jsx)("strong", { children: zt(t) }),
				Object.keys(r.meals).length > 0 ? " " + o("(ohne Essen)") : ""
			]
		}) : null;
	}
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "event-registration",
		children: [
			r && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				!n && /* @__PURE__ */ (0, _.jsx)("h1", { children: r.eventTitle }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "event-organiser",
					children: [
						r.settings.organiser && /* @__PURE__ */ (0, _.jsxs)("strong", { children: ["Organisator: ", r.settings.organiser] }),
						r.settings.organiserEmail && /* @__PURE__ */ (0, _.jsx)("a", {
							href: "mailto:" + r.settings.organiserEmail,
							children: r.settings.organiserEmail
						}),
						r.settings.organiserMobile && /* @__PURE__ */ (0, _.jsx)("a", {
							href: "tel:" + r.settings.organiserMobile.replace(/[^+\d]/g, ""),
							children: r.settings.organiserMobile
						})
					]
				}),
				r.canEdit && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "event-edit-action",
					children: /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary",
						href: "#agenda-verwalten/" + e,
						children: o("Veranstaltung bearbeiten")
					})
				}),
				/* @__PURE__ */ (0, _.jsx)("ol", {
					className: "registration-steps",
					"aria-label": "Anmeldeschritte",
					children: ((v?.preview.total || N?.total || r.settings.fee) > 0 ? [
						"Anmeldung",
						"Angaben prüfen",
						"Zahlung",
						"Bestätigung"
					] : [
						"Anmeldung",
						"Angaben prüfen",
						"Bestätigung"
					]).map((e, t, n) => /* @__PURE__ */ (0, _.jsxs)("li", {
						"aria-current": t === (N && !["cancelled", "expired"].includes(N.state) && !D ? ["pending_payment", "reserved"].includes(N.state) ? 2 : n.length - 1 : +!!v) ? "step" : void 0,
						children: [/* @__PURE__ */ (0, _.jsx)("span", { children: t + 1 }), o(e)]
					}, e))
				}),
				r.descriptionHtml && /* @__PURE__ */ (0, _.jsx)("section", {
					className: "event-announcement",
					"aria-label": "Eventausschreibung",
					children: /* @__PURE__ */ (0, _.jsx)(de, { html: r.descriptionHtml })
				})
			] }),
			/* @__PURE__ */ (0, _.jsx)(z, {
				error: c,
				message: u
			}),
			r ? N && !["cancelled", "expired"].includes(N.state) && !D ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o(Ht[N.state]) }),
				/* @__PURE__ */ (0, _.jsx)(Kt, { value: N }),
				N.total > 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: N.state === "waiting" ? "Auf der Warteliste wird noch keine Zahlung fällig." : `${o(Vt[N.paymentMethod] || "Zahlung")} · ${o(Bt[N.paymentStatus] || N.paymentStatus)}` }),
				N.paymentMethod === "invoice" && N.paymentStatus === "outstanding" && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Die Kasse sendet dir die Rechnung separat über Fairgate.") }),
				N.state === "pending_payment" && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "form-review",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("p", { children: [
							"Deine Plätze sind bis ",
							(/* @__PURE__ */ new Date((N.holdUntil || 0) * 1e3)).toLocaleTimeString("de-CH"),
							" reserviert. Erst nach bestätigter Zahlung ist die Teilnahme verbindlich."
						] }),
						N.checkoutUrl ? /* @__PURE__ */ (0, _.jsx)("a", {
							className: "market-primary",
							href: N.checkoutUrl,
							children: "Bei zahls.ch bezahlen →"
						}) : /* @__PURE__ */ (0, _.jsx)("p", { children: "Der Zahlungslink konnte nicht sicher erstellt werden. Bitte kontaktiere die Veranstaltungsleitung oder warte den Ablauf ab." }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-actions",
							children: [/* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => s((e) => e + 1),
								children: o("Zahlungsstand aktualisieren")
							}), N.canInvoice && /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								disabled: f,
								onClick: () => void ee(),
								children: o("Stattdessen auf Rechnung anmelden")
							})]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Ein Abbruch ist keine Zahlungsbestätigung. Bis zum Ablauf kannst du denselben Zahlungslink erneut öffnen."
						})
					]
				}),
				N.state === "confirmed" && /* @__PURE__ */ (0, _.jsx)(Yt, { value: N }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: N.conditions }),
				r.open && !["pending_payment", "payment_review"].includes(N.state) && /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => {
						O(!0), g(Lt(N.participants, !!r.copilot));
					},
					children: o("Anmeldung ändern")
				}),
				r.canCancel && (S ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "form-review",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", { children: o("Teilnahme verbindlich abmelden?") }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: f,
							onClick: () => E(!1),
							children: o("Zurück")
						}),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: f,
							onClick: () => void M(),
							children: o("Abmeldung bestätigen")
						})
					]
				}) : /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => E(!0),
					children: o("Teilnahme abmelden")
				}))
			] }) : r.settings.externalUrl ? /* @__PURE__ */ (0, _.jsx)("a", {
				className: "market-primary",
				href: r.settings.externalUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o("Extern anmelden (neuer Tab) →")
			}) : r.open ? /* @__PURE__ */ (0, _.jsxs)("form", {
				ref: k,
				className: "club-form",
				onSubmit: (e) => {
					e.preventDefault(), j(e.currentTarget);
				},
				children: [
					/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: f,
						hidden: !!v,
						children: [
							/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Für die Veranstaltung anmelden") }),
							/* @__PURE__ */ (0, _.jsxs)(B, {
								title: o("Buchung Mitglied"),
								children: [
									/* @__PURE__ */ (0, _.jsxs)("p", { children: [
										o("Angemeldet als"),
										" ",
										/* @__PURE__ */ (0, _.jsx)("strong", { children: r.name })
									] }),
									/* @__PURE__ */ (0, _.jsxs)("div", {
										className: "club-form-row",
										children: [
											/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Vorname"), /* @__PURE__ */ (0, _.jsx)("input", {
												readOnly: !0,
												value: r.firstName || r.name
											})] }),
											/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachname"), /* @__PURE__ */ (0, _.jsx)("input", {
												readOnly: !0,
												value: r.lastName
											})] }),
											/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail"), /* @__PURE__ */ (0, _.jsx)("input", {
												readOnly: !0,
												value: r.email
											})] })
										]
									}),
									/* @__PURE__ */ (0, _.jsxs)("p", {
										className: "club-hint",
										children: [
											"Diese Angaben stammen aus deinem Mitgliederprofil.",
											r.fairgateLinked ? " Dein Profil ist mit Fairgate verknüpft." : "",
											" Änderungen kannst du unter «Mein Profil» beantragen."
										]
									}),
									r.settings.vehicle && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug *"), /* @__PURE__ */ (0, _.jsxs)("select", {
										name: "vehicle",
										required: !0,
										defaultValue: D ? String(N?.vehicle?.id || (L.includes(N?.vehicle?.model || "") ? "model:" + N?.vehicle?.model : {
											"Modernes Fahrzeug": "modern",
											"Ohne Fahrzeug": "none"
										}[N?.vehicle?.model || ""] || "other")) : "",
										children: [
											/* @__PURE__ */ (0, _.jsx)("option", {
												value: "",
												children: o("Bitte wählen")
											}),
											r.vehicles.map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
												value: e.id,
												children: [
													e.model,
													" ",
													e.year,
													" ",
													e.registration
												]
											}, e.id)),
											/* @__PURE__ */ (0, _.jsx)("optgroup", {
												label: "Triumph-Modelle",
												children: L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
													value: "model:" + e,
													children: e
												}, e))
											}),
											/* @__PURE__ */ (0, _.jsx)("option", {
												value: "other",
												children: o("Anderes Fahrzeug")
											}),
											/* @__PURE__ */ (0, _.jsx)("option", {
												value: "modern",
												children: o("Modernes Fahrzeug")
											}),
											/* @__PURE__ */ (0, _.jsx)("option", {
												value: "none",
												children: o("Ohne Fahrzeug")
											})
										]
									})] }),
									te(0),
									V(0)
								]
							}),
							m.slice(1).map((e, t) => {
								let n = t + 1;
								return /* @__PURE__ */ (0, _.jsxs)(B, {
									title: `${o("Zusatzbuchung Gast")} ${m.length > 2 ? n : ""}`.trim(),
									children: [
										/* @__PURE__ */ (0, _.jsxs)("div", {
											className: "club-form-row",
											children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Vorname Gast *"), /* @__PURE__ */ (0, _.jsx)("input", {
												required: !0,
												maxLength: 80,
												value: e.firstName,
												onChange: (e) => I(n, { firstName: e.target.value })
											})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachname Gast *"), /* @__PURE__ */ (0, _.jsx)("input", {
												required: !0,
												maxLength: 80,
												value: e.lastName,
												onChange: (e) => I(n, { lastName: e.target.value })
											})] })]
										}),
										r.settings.vehicle && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug des Gastes"), /* @__PURE__ */ (0, _.jsxs)("select", {
											value: e.vehicle,
											onChange: (e) => I(n, { vehicle: e.target.value }),
											children: [
												/* @__PURE__ */ (0, _.jsx)("option", {
													value: "",
													children: o("Bitte wählen")
												}),
												/* @__PURE__ */ (0, _.jsx)("optgroup", {
													label: "Triumph-Modelle",
													children: L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
														value: e,
														children: e
													}, e))
												}),
												/* @__PURE__ */ (0, _.jsx)("option", {
													value: "Anderes Fahrzeug",
													children: o("Anderes Fahrzeug")
												}),
												/* @__PURE__ */ (0, _.jsx)("option", {
													value: "Modernes Fahrzeug",
													children: o("Modernes Fahrzeug")
												}),
												/* @__PURE__ */ (0, _.jsx)("option", {
													value: "Ohne Fahrzeug",
													children: o("Ohne Fahrzeug")
												})
											]
										})] }),
										te(n),
										V(n),
										/* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											className: "market-text-button",
											onClick: () => g((e) => e.filter((e, t) => t !== n)),
											children: o("Zusatzbuchung entfernen")
										})
									]
								}, n);
							}),
							m.length - 1 < Math.min(2, r.settings.guests) && /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								onClick: () => g((e) => [...e, Nt()]),
								children: o("＋ Zusatzbuchung Gast")
							}),
							Object.keys(r.meals).length > 0 && F.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
								"Essen: ",
								e || `Gast ${t}`,
								" *",
								/* @__PURE__ */ (0, _.jsxs)("select", {
									name: `meal_${t}`,
									required: !0,
									defaultValue: D && N?.participants[t]?.meal || "",
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), Object.entries(r.meals).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
										value: e,
										children: [
											e,
											" · ",
											zt(t)
										]
									}, e))]
								})
							] }, t)),
							Object.keys(r.rooms).length > 0 && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Unterkunft *"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "room",
								required: !0,
								defaultValue: D && N?.room || "",
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), Object.entries(r.rooms).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
									value: e,
									children: [
										e,
										" · ",
										zt(t)
									]
								}, e))]
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bemerkungen (optional)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								name: "notes",
								rows: 3,
								maxLength: 1e3,
								defaultValue: D && N?.notes || ""
							})] }),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Bitte nur veranstaltungsrelevante Angaben eintragen. Gäste erhalten keine Mitgliedschaft.")
							})
						]
					}),
					v && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)(Kt, { value: v.preview }),
						/* @__PURE__ */ (0, _.jsx)("p", { children: r.settings.conditions }),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								name: "conditions",
								type: "checkbox",
								value: "1",
								required: !0
							}), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Ich bestätige die Teilnahmeangaben und akzeptiere die genannten Teilnahme- und Abmeldebedingungen. *") })]
						}),
						v.preview.total > 0 && !D && /* @__PURE__ */ (0, _.jsxs)(B, {
							title: o("Zahlungsart"),
							children: [
								r.paymentMethods.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", {
									className: "application-consent",
									children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "radio",
										name: "paymentChoice",
										value: e,
										checked: b === e,
										onChange: () => x(e)
									}), o(Vt[e])]
								}, e)),
								/* @__PURE__ */ (0, _.jsx)("p", { children: b === "invoice" ? "Die Kasse sendet die Rechnung separat über Fairgate." : "Nach der Reservierung öffnest du den Zahlungslink zu zahls.ch. Deine Teilnahme wird nach bestätigter Zahlung aufgenommen." }),
								r.paymentMethods.length === 1 && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Online-Zahlung wird nach Einrichtung freigeschaltet.") })
							]
						})
					] }),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [
							D && !v && /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: f,
								onClick: () => O(!1),
								children: o("Änderung abbrechen")
							}),
							v && /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: f,
								onClick: () => y(null),
								children: o("Angaben bearbeiten")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: "market-primary",
								disabled: f,
								children: o(f ? "Wird verarbeitet …" : v ? D ? "Änderungen verbindlich speichern" : v.preview.total > 0 ? "Kostenpflichtig anmelden" : "Anmeldung bestätigen" : "Anmeldung prüfen →")
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Die Anmeldung ist momentan geschlossen.") }) : /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Anmeldung wird geladen …")
			})
		]
	});
}
function Jt({ eventId: e }) {
	return /* @__PURE__ */ (0, _.jsx)(jt, { eventId: e });
}
function Yt({ value: e }) {
	function t() {
		let t = (e) => e.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, "\\$&"), n = new Date(e.eventStart).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z/, "Z"), r = [
			"BEGIN:VCALENDAR",
			"VERSION:2.0",
			"PRODID:-//Swiss TR-Club//Events//DE",
			"BEGIN:VEVENT",
			`UID:strc-event-${e.eventId}@swisstrclub.ch`,
			`DTSTAMP:${(/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z/, "Z")}`,
			`DTSTART:${n}`,
			`SUMMARY:${t(e.eventTitle)}`,
			"END:VEVENT",
			"END:VCALENDAR"
		].join("\r\n") + "\r\n", i = URL.createObjectURL(new Blob([r], { type: "text/calendar;charset=utf-8" })), a = document.createElement("a");
		a.href = i, a.download = "strc-veranstaltung.ics", a.click(), setTimeout(() => URL.revokeObjectURL(i), 1e3);
	}
	return /* @__PURE__ */ (0, _.jsx)("button", {
		className: "club-secondary",
		onClick: t,
		children: o("Zum Kalender hinzufügen")
	});
}
//#endregion
//#region app/components/EventManager.tsx
var Xt = "strc_events";
function Zt(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : (t.setMinutes(t.getMinutes() - t.getTimezoneOffset()), t.toISOString().slice(0, 16));
}
function Qt({ session: e, changed: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)({
		events: [],
		pages: 0
	}), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(1), [p, m] = (0, h.useState)(0), [g, v] = (0, h.useState)(!0), [y, b] = (0, h.useState)(""), [x] = (0, h.useState)(() => {
		let e = window.location.hash.split("/");
		return e[1] === "neu" ? decodeURIComponent(e[2] || "") : null;
	}), [S, E] = (0, h.useState)(() => x === null ? void 0 : null), [D, O] = (0, h.useState)(null), [k, A] = (0, h.useState)(!1), [j, M] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController(), t = setTimeout(() => {
			v(!0), b(""), Promise.all([C(Xt, { operation: "settings" }, e.signal), C(Xt, {
				operation: "list",
				search: s,
				trash: l ? "1" : "0",
				page: String(d)
			}, e.signal)]).then(([e, t]) => {
				r(e), a(t);
			}).catch((t) => {
				e.signal.aborted || b(t.message);
			}).finally(() => {
				e.signal.aborted || v(!1);
			});
		}, 150);
		return () => {
			clearTimeout(t), e.abort();
		};
	}, [
		s,
		l,
		d,
		p
	]), (0, h.useEffect)(() => {
		let e = Number(window.location.hash.split("/")[1]);
		if (!Number.isSafeInteger(e) || e < 1) return;
		let t = new AbortController();
		return C(Xt, {
			operation: "get",
			id: String(e)
		}, t.signal).then(E).catch((e) => {
			t.signal.aborted || b(e.message);
		}), () => t.abort();
	}, []);
	function ee(e) {
		M(e), v(!0), m((e) => e + 1), t();
	}
	async function N(t, n) {
		A(!0), b("");
		try {
			await w(Xt, e.eventsNonce || "", T({
				operation: n,
				id: String(t.id)
			})), ee("Termin aus dem Archiv wiederhergestellt.");
		} catch (e) {
			b(e.message);
		} finally {
			A(!1);
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Agenda verwalten")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: n?.global ? "Clubanlässe und Termine" : "Ihre Termine" }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: n?.global ? "Clubanlässe und Veranstaltungen erfassen, ausschreiben und veröffentlichen. Vergangene Termine werden nach zwölf Monaten automatisch archiviert." : "Termine erstellen, bearbeiten und Teilnehmerlisten einsehen." })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content club-management",
			children: [
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "club-toolbar",
					children: /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: !n,
						onClick: () => E(null),
						children: o("Termin erstellen")
					})
				}),
				e.canAssignRegions && /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "club-hint",
					children: [
						o("Regionale Zuständigkeiten (Regionalleitung) werden unter"),
						" ",
						/* @__PURE__ */ (0, _.jsx)("a", {
							href: "#redaktion/people",
							children: o("Redaktion → Moderatorrollen")
						}),
						" ",
						o("vergeben. Die Event-Organisation wird im Formular des Termins bestimmt.")
					]
				}),
				j && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					className: "club-notice",
					children: j
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-filters",
					children: [/* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: [o("Termine suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
							type: "search",
							value: s,
							onChange: (e) => {
								c(e.target.value), f(1);
							}
						})]
					}), /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-own",
						children: [/* @__PURE__ */ (0, _.jsx)("input", {
							type: "checkbox",
							checked: l,
							onChange: (e) => {
								u(e.target.checked), f(1);
							}
						}), o("Archiv")]
					})]
				}),
				l && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Archivierte Termine und Anmeldungen bleiben dauerhaft erhalten.")
				}),
				y && /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "collection-state error",
					role: "alert",
					children: [y, /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-text-button",
						onClick: () => m((e) => e + 1),
						children: o("Erneut versuchen")
					})]
				}),
				g ? /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Termine werden geladen …")
				}) : !y && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					!i.events.length && /* @__PURE__ */ (0, _.jsx)("p", {
						className: "collection-state",
						children: "Keine passenden Termine vorhanden."
					}),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "managed-events",
						children: i.events.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [
							/* @__PURE__ */ (0, _.jsxs)("p", {
								className: "eyebrow",
								children: [
									e.scope === "region" ? n?.regions.find((t) => t.id === e.regionId)?.name || "Regionales Event" : {
										"club-national": "Club Event",
										external: "Externes Event"
									}[e.scope] || "Club Event",
									" · ",
									e.status === "publish" ? "Veröffentlicht" : e.status === "trash" ? "Archiv" : "Entwurf"
								]
							}),
							/* @__PURE__ */ (0, _.jsx)("h2", { children: e.title }),
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [
								e.startAt ? new Date(e.startAt).toLocaleString("de-CH") : "Datum fehlt",
								" · ",
								e.location
							] }),
							l && /* @__PURE__ */ (0, _.jsxs)("p", {
								className: "club-hint",
								children: [
									"Archiviert am ",
									e.archivedAt ? new Date(e.archivedAt).toLocaleDateString("de-CH") : "–",
									" · ",
									o("Archivierte Termine und Anmeldungen bleiben dauerhaft erhalten.")
								]
							})
						] }), /* @__PURE__ */ (0, _.jsx)("div", {
							className: "club-actions",
							children: l ? /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								disabled: k,
								onClick: () => void N(e, "restore"),
								children: o("Wiederherstellen")
							}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => E(e),
								children: o("Bearbeiten")
							}), e.registrationRequired && e.status === "publish" && /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => O(e),
								children: o("Teilnehmerliste")
							})] })
						})] }, e.id))
					}),
					/* @__PURE__ */ (0, _.jsx)(en, {
						page: d,
						pages: i.pages,
						change: f
					})
				] })
			]
		}),
		D && /* @__PURE__ */ (0, _.jsx)(q, {
			title: `Anmeldungen: ${D.title}`,
			close: () => O(null),
			children: /* @__PURE__ */ (0, _.jsx)(Jt, { eventId: D.id })
		}),
		S !== void 0 && n && /* @__PURE__ */ (0, _.jsx)($t, {
			event: S,
			initialRegion: S ? "" : x || "",
			settings: n,
			nonce: e.eventsNonce || "",
			close: () => E(void 0),
			saved: () => {
				E(void 0), ee("Termin gespeichert.");
			}
		})
	] });
}
function $t({ event: e, initialRegion: t = "", settings: n, nonce: r, close: i, saved: a }) {
	let [s, c] = (0, h.useState)(e?.descriptionHtml || e?.description || ""), [l, u] = (0, h.useState)(e?.descriptionFr || ""), [d, f] = (0, h.useState)(!1), [p, m] = (0, h.useState)(e?.scope || "region"), [g, v] = (0, h.useState)(e?.eventType || ""), [y, b] = (0, h.useState)(!1), [x, S] = (0, h.useState)("");
	async function C(t) {
		if (!(d || y)) {
			b(!0), S("");
			try {
				let n = new FormData(t);
				n.set("operation", "save"), n.set("id", String(e?.id || 0)), n.set("scope", p), n.set("description", s), n.set("descriptionFr", l);
				for (let e of [
					"startAt",
					"endAt",
					"registrationOpenAt",
					"registrationCloseAt",
					"reg_cancelAt"
				]) {
					let t = String(n.get(e) || "");
					n.set(e, t ? new Date(t).toISOString() : "");
				}
				await w(Xt, r, n), a();
			} catch (e) {
				S(e.message);
			} finally {
				b(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsx)(q, {
		title: e ? "Termin bearbeiten" : "Termin erstellen",
		close: i,
		busy: y,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: (e) => {
				e.preventDefault(), C(e.currentTarget);
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: y || d,
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: e?.status === "publish" ? "Dieser Termin ist in der Agenda veröffentlicht." : "Dieser Termin ist ein Entwurf und noch nicht in der Agenda sichtbar. Zum Freigeben unten «Veröffentlichen» wählen."
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [
							"Verantwortliche/r Editor/in *",
							/* @__PURE__ */ (0, _.jsx)("input", {
								required: !0,
								value: n.editorName,
								readOnly: !0,
								"aria-readonly": "true"
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: "Wird über das angemeldete Editor-Konto zugeordnet." })
						] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Titel"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "title",
							required: !0,
							maxLength: 160,
							defaultValue: e?.title || ""
						})] }),
						n.global ? /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Bereich *", /* @__PURE__ */ (0, _.jsxs)("select", {
							required: !0,
							value: p,
							onChange: (e) => m(e.target.value),
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "club-national",
									children: "Club Event"
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "region",
									children: "Regionales Event"
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "external",
									children: "Externes Event"
								})
							]
						})] }) : /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "club-hint",
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: "Bereich *" }), " Regionales Event · Zugriff auf die zugewiesene Region."]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Veranstaltungsart *", /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "eventType",
							required: !0,
							value: g,
							onChange: (e) => v(e.target.value),
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}),
								e?.eventType === "weekend-meeting" && /* @__PURE__ */ (0, _.jsx)("option", {
									value: "weekend-meeting",
									children: o("Weekend Meeting (bisherige Zuordnung)")
								}),
								n.eventTypes.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e.slug,
									children: e.name
								}, e.slug))
							]
						})] }),
						p !== "club-national" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Region"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "regionId",
							required: p === "region",
							defaultValue: e?.regionId || n.regions.find((e) => e.slug === t)?.id || (n.global ? "" : n.regions[0]?.id),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Bitte wählen")
							}), n.regions.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e.id,
								children: e.name
							}, e.id))]
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Beginn", /* @__PURE__ */ (0, _.jsx)("input", {
								type: "datetime-local",
								name: "startAt",
								required: !0,
								defaultValue: Zt(e?.startAt || "")
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Ende (optional)", /* @__PURE__ */ (0, _.jsx)("input", {
								type: "datetime-local",
								name: "endAt",
								defaultValue: Zt(e?.endAt || "")
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Uhrzeiten entsprechen der Zeitzone Ihres Geräts."
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Treffpunkt (Restaurant | Ort)"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "location",
							maxLength: 200,
							placeholder: "Restaurant Bären | Benken/ZH",
							defaultValue: e?.location || ""
						})] }),
						/* @__PURE__ */ (0, _.jsx)(Re, {
							label: o("Beschreibung"),
							value: s,
							onChange: c,
							disabled: y || d
						}),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [
							/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Französische Veranstaltungsfassung") }),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Für nationale Veranstaltungen die bestätigte französische Fassung ergänzen.")
							}),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Titel (FR)"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "titleFr",
								maxLength: 160,
								defaultValue: e?.titleFr || ""
							})] }),
							/* @__PURE__ */ (0, _.jsx)(Re, {
								label: o("Beschreibung (FR)"),
								value: l,
								onChange: u,
								disabled: y || d
							})
						] }),
						/* @__PURE__ */ (0, _.jsx)(Gt, {
							organisers: n.organisers,
							weekend: ["weekend", "weekend-meeting"].includes(g),
							event: e,
							localDate: Zt,
							nonce: r,
							eventId: e?.id || 0,
							uploadState: f
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Status"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "status",
							defaultValue: e?.status || "draft",
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "publish",
								children: "Veröffentlichen"
							}), /* @__PURE__ */ (0, _.jsx)("option", {
								value: "draft",
								children: "Als Entwurf speichern"
							})]
						})] })
					]
				}),
				x && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state error",
					role: "alert",
					children: x
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: y || d,
						onClick: i,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: y || d,
						children: y ? "Wird gespeichert …" : "Termin speichern"
					})]
				})
			]
		})
	});
}
function en({ page: e, pages: t, change: n }) {
	return t > 1 ? /* @__PURE__ */ (0, _.jsxs)("nav", {
		className: "club-pagination",
		"aria-label": "Seiten",
		children: [
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: o("Zurück")
			}),
			/* @__PURE__ */ (0, _.jsxs)("span", { children: [
				o("Seite"),
				" ",
				e,
				" ",
				o("von"),
				" ",
				t
			] }),
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: e >= t,
				onClick: () => n(e + 1),
				children: o("Weiter")
			})
		]
	}) : null;
}
//#endregion
//#region app/components/MemberDirectory.tsx
var tn = [
	["lastName", "Nachname"],
	["firstName", "Vorname"],
	["postcode", "PLZ / Ort"],
	["region", "Region"],
	["vehicle", "Fahrzeug"]
], nn = (e) => e === "restoration" ? "In Restauration" : "Fahrbereit";
function rn({ vehicle: e }) {
	let t = e.status !== "restoration";
	return /* @__PURE__ */ (0, _.jsxs)("span", {
		className: "dir-vehicle",
		title: o(nn(e.status)),
		children: [
			/* @__PURE__ */ (0, _.jsx)("i", {
				className: "dir-dot " + (t ? "is-ready" : "is-restoration"),
				"aria-hidden": "true"
			}),
			e.model,
			/* @__PURE__ */ (0, _.jsxs)("span", {
				className: "sr-only",
				children: [
					" (",
					o(nn(e.status)),
					")"
				]
			})
		]
	});
}
function an() {
	let { text: e } = ue(), [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("lastName"), [f, p] = (0, h.useState)(1), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(null), [x, S] = (0, h.useState)(!1), [w, T] = (0, h.useState)(0), [E, D] = (0, h.useState)(!0);
	(0, h.useEffect)(() => {
		let e = new AbortController(), t = setTimeout(() => {
			D(!0), C("strc_directory", {
				operation: "list",
				search: r,
				region: a,
				model: c,
				sort: u,
				map: x ? "1" : "0",
				page: String(f)
			}, e.signal).then((e) => {
				n(e), g("");
			}).catch((t) => {
				e.signal.aborted || g(t.message);
			}).finally(() => {
				e.signal.aborted || D(!1);
			});
		}, 180);
		return () => {
			clearTimeout(t), e.abort();
		};
	}, [
		r,
		a,
		c,
		u,
		f,
		x,
		w
	]);
	let O = (0, h.useCallback)(async (e) => {
		try {
			b(await C("strc_directory", {
				operation: "detail",
				id: String(e)
			}));
		} catch (e) {
			g(e.message);
		}
	}, []), k = (e) => {
		e(), p(1);
	};
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Für Clubmitglieder")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: e("directory.title", "Mitgliederverzeichnis") }),
				/* @__PURE__ */ (0, _.jsxs)("p", { children: [e("directory.intro", "Mitglieder und ihre Triumphs finden."), t ? ` · ${t.total} ${o("Mitglieder")}` : ""] })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content member-directory",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "dir-toolbar",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "dir-switch",
							role: "group",
							"aria-label": o("Ansicht"),
							children: [/* @__PURE__ */ (0, _.jsxs)("button", {
								type: "button",
								"aria-pressed": !x,
								onClick: () => S(!1),
								children: ["☰ ", o("Liste")]
							}), /* @__PURE__ */ (0, _.jsxs)("button", {
								type: "button",
								"aria-pressed": x,
								onClick: () => S(!0),
								children: ["📍 ", o("Karte")]
							})]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "dir-search",
							children: [/* @__PURE__ */ (0, _.jsx)("span", {
								className: "sr-only",
								children: o("Name suchen")
							}), /* @__PURE__ */ (0, _.jsx)("input", {
								type: "search",
								placeholder: o("Name suchen …"),
								value: r,
								onChange: (e) => k(() => i(e.target.value))
							})]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("span", {
							className: "sr-only",
							children: o("Region")
						}), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: a,
							onChange: (e) => k(() => s(e.target.value)),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Regionen")
							}), (t?.regions || []).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("span", {
							className: "sr-only",
							children: o("Fahrzeug")
						}), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: c,
							onChange: (e) => k(() => l(e.target.value)),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Fahrzeuge")
							}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] }),
						!x && /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("span", {
							className: "sr-only",
							children: o("Sortierung")
						}), /* @__PURE__ */ (0, _.jsx)("select", {
							value: u,
							onChange: (e) => d(e.target.value),
							children: tn.map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
								value: e,
								children: [
									o("Sortierung"),
									": ",
									o(t)
								]
							}, e))
						})] })
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "dir-privacy",
					children: ["🔒 ", e("directory.privacy", "Diese Liste ist ausschliesslich für Mitglieder. Bitte keine Kontaktdaten ohne Zustimmung weitergeben.")]
				}),
				m && /* @__PURE__ */ (0, _.jsxs)("p", {
					role: "alert",
					children: [m, /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-text-button",
						onClick: () => T((e) => e + 1),
						children: o("Erneut versuchen")
					})]
				}),
				t ? x ? /* @__PURE__ */ (0, _.jsx)(sn, {
					members: t.mapMembers,
					detail: O,
					loading: E
				}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsxs)("p", {
						className: "dir-count",
						role: "status",
						children: [
							t.total,
							" ",
							o(t.total === 1 ? "Mitglied" : "Mitglieder"),
							E ? " · " + o("wird aktualisiert …") : ""
						]
					}),
					t.members.length ? /* @__PURE__ */ (0, _.jsx)("div", {
						className: "table-scroll",
						children: /* @__PURE__ */ (0, _.jsxs)("table", {
							className: "dir-table",
							children: [/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsxs)("tr", { children: [[
								["lastName", "Name"],
								["postcode", "PLZ / Ort"],
								["region", "Region"],
								["vehicle", "Fahrzeuge"]
							].map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("th", {
								scope: "col",
								"aria-sort": u === e ? "ascending" : void 0,
								children: /* @__PURE__ */ (0, _.jsxs)("button", {
									type: "button",
									onClick: () => d(e),
									children: [
										o(t),
										" ",
										u === e ? "↓" : "↕"
									]
								})
							}, e)), /* @__PURE__ */ (0, _.jsx)("th", { children: /* @__PURE__ */ (0, _.jsx)("span", {
								className: "sr-only",
								children: o("Profil")
							}) })] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: t.members.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", {
								onClick: () => void O(e.id),
								children: [
									/* @__PURE__ */ (0, _.jsx)("td", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
										type: "button",
										className: "dir-name",
										onClick: (t) => {
											t.stopPropagation(), O(e.id);
										},
										children: [e.lastName || e.name, e.firstName ? ", " + e.firstName : ""]
									}) }),
									/* @__PURE__ */ (0, _.jsx)("td", { children: [e.postcode, e.city].filter(Boolean).join(" ") }),
									/* @__PURE__ */ (0, _.jsx)("td", { children: e.region && /* @__PURE__ */ (0, _.jsx)("span", {
										className: "dir-region",
										children: o(e.region)
									}) }),
									/* @__PURE__ */ (0, _.jsx)("td", { children: e.vehicles.map((e) => /* @__PURE__ */ (0, _.jsx)(rn, { vehicle: e }, e.id)) }),
									/* @__PURE__ */ (0, _.jsx)("td", {
										className: "dir-arrow",
										"aria-hidden": "true",
										children: "→"
									})
								]
							}, e.id)) })]
						})
					}) : /* @__PURE__ */ (0, _.jsx)("p", {
						className: "collection-state",
						children: o("Keine passenden Mitglieder gefunden.")
					}),
					/* @__PURE__ */ (0, _.jsxs)("p", {
						className: "dir-legend",
						children: [
							/* @__PURE__ */ (0, _.jsx)("i", {
								className: "dir-dot is-ready",
								"aria-hidden": "true"
							}),
							" ",
							o("Fahrbereit"),
							" ",
							/* @__PURE__ */ (0, _.jsx)("i", {
								className: "dir-dot is-restoration",
								"aria-hidden": "true"
							}),
							" ",
							o("Nicht fahrbereit / in Restauration")
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(en, {
						page: f,
						pages: t.pages,
						change: p
					})
				] }) : /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Mitglieder werden geladen …")
				})
			]
		}),
		y && /* @__PURE__ */ (0, _.jsx)(q, {
			title: y.name,
			close: () => b(null),
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-dialog-body dir-detail",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "dir-detail-head",
						children: [y.photo && /* @__PURE__ */ (0, _.jsx)(v, {
							unoptimized: !0,
							src: y.photo,
							alt: y.name,
							width: 96,
							height: 96
						}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [[y.postcode, y.city].filter(Boolean).join(" "), y.region ? " · " + o(y.region) : ""] }),
							y.email && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: "mailto:" + y.email,
								children: y.email
							}) }),
							y.phone && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: "tel:" + y.phone.replace(/[^+0-9]/g, ""),
								children: y.phone
							}) })
						] })]
					}),
					/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Fahrzeuge") }),
					y.vehicles.length ? y.vehicles.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
						className: "dir-vehicle-card",
						children: [
							e.photo && /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: e.photo,
								alt: e.model,
								width: 320,
								height: 210
							}),
							/* @__PURE__ */ (0, _.jsxs)("h4", { children: [
								/* @__PURE__ */ (0, _.jsx)(rn, { vehicle: e }),
								" ",
								e.details
							] }),
							/* @__PURE__ */ (0, _.jsxs)("dl", {
								className: "profile-facts",
								children: [[
									["year", "Baujahr"],
									["colour", "Farbe"],
									["registration", "Kennzeichen"]
								].map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(n) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: String(e[t] || "–") })] }, t)), /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Status") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: o(nn(e.status)) })] })]
							})
						]
					}, e.id)) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine Fahrzeuge erfasst.") })
				]
			})
		})
	] });
}
var on = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"38\" viewBox=\"0 0 28 38\"><path d=\"M14 1C7 1 1.5 6.5 1.5 13.5 1.5 23 14 37 14 37s12.5-14 12.5-23.5C26.5 6.5 21 1 14 1Z\" fill=\"#114973\" stroke=\"#fff\" stroke-width=\"2\"/><circle cx=\"14\" cy=\"13.5\" r=\"5\" fill=\"#bd2028\"/></svg>";
function sn({ members: t, detail: n, loading: r }) {
	let i = (0, h.useRef)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)({
		done: 0,
		total: 0
	});
	return (0, h.useEffect)(() => {
		let r = !1, a, c = new AbortController();
		return (async () => {
			let u = await import("./leaflet-src-BUmUk9La.js").then((t) => /* @__PURE__ */ e(t.default, 1));
			if (r || !i.current) return;
			a = u.map(i.current, {
				scrollWheelZoom: !0,
				maxZoom: 16
			}).setView([46.85, 8.25], 8), u.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 16,
				attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
			}).addTo(a);
			let d = u.divIcon({
				html: on,
				className: "dir-pin",
				iconSize: [28, 38],
				iconAnchor: [14, 37],
				popupAnchor: [0, -32]
			}), f = [], p = (e, t, r = 0) => {
				t.forEach((t, i) => {
					let o = (i + r) * 2.4, s = i || r ? .0012 * Math.sqrt(i + r) : 0, c = [e[0] + s * Math.cos(o), e[1] + s * 1.4 * Math.sin(o)];
					f.push(c);
					let l = document.createElement("button");
					l.type = "button", l.className = "dir-pin-popup", l.innerHTML = "";
					let p = document.createElement("strong");
					if (p.textContent = t.firstName, l.appendChild(p), t.vehicle) {
						let e = document.createElement("span");
						e.textContent = t.vehicle, l.appendChild(e);
					}
					l.addEventListener("click", () => n(t.id)), u.marker(c, {
						icon: d,
						title: t.firstName
					}).addTo(a).bindPopup(l);
				});
			};
			t.filter((e) => e.position).forEach((e) => p(e.position, [e]));
			let m = /* @__PURE__ */ new Map();
			t.forEach((e) => {
				if (!e.position && e.postcode && (!e.country || e.country === "CH")) {
					let t = m.get(e.postcode) || [];
					t.push(e), m.set(e.postcode, t);
				}
			});
			let h = Array.from(m), g = 0, _ = 0;
			l({
				done: 0,
				total: h.length
			}), s("");
			async function v() {
				for (; g < h.length && !r;) {
					let [e, t] = h[g++];
					try {
						let n = await C("strc_directory", {
							operation: "location",
							postcode: e
						}, c.signal);
						if (r) return;
						n.position && p(n.position, t);
					} catch {
						r || s(o("Einige Standorte konnten nicht geladen werden."));
					} finally {
						r || l({
							done: ++_,
							total: h.length
						});
					}
				}
			}
			await Promise.all(Array.from({ length: Math.min(4, h.length) }, v)), !r && f.length && a.fitBounds(f, {
				padding: [30, 30],
				maxZoom: 12
			});
		})().catch(() => {
			r || s(o("Die Karte konnte nicht geladen werden."));
		}), () => {
			r = !0, c.abort(), a?.remove();
		};
	}, [t, n]), /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "dir-map-wrap",
		children: [
			(r || c.done < c.total) && /* @__PURE__ */ (0, _.jsxs)("p", {
				role: "status",
				className: "dir-map-status",
				children: [
					o("Standorte werden geladen …"),
					" ",
					c.total ? `${c.done}/${c.total}` : ""
				]
			}),
			/* @__PURE__ */ (0, _.jsx)("div", {
				ref: i,
				className: "directory-map",
				"aria-label": o("Mitgliederkarte")
			}),
			/* @__PURE__ */ (0, _.jsxs)("p", {
				className: "dir-map-legend",
				children: [
					/* @__PURE__ */ (0, _.jsx)("span", {
						className: "dir-pin-mini",
						"aria-hidden": "true"
					}),
					" ",
					o("Mitglied · Ungefährer Standort nach Postleitzahl")
				]
			}),
			a && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: a
			})
		]
	});
}
//#endregion
//#region app/components/StrcFlipbook.tsx
var cn = window.strcSettings.assetBase ?? "";
function ln({ url: e, title: t, classic: n, pages: r, download: i, search: a = !0 }) {
	let s = (r || []).join(","), c = (0, h.useRef)(null), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(""), p = (0, h.useRef)(0), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)(null), [b, x] = (0, h.useState)(!1), S = (0, h.useRef)({}), C = (0, h.useRef)({}), [w, T] = (0, h.useState)(null), [E, D] = (0, h.useState)(""), [O, k] = (0, h.useState)(null), [A, j] = (0, h.useState)({}), [M, ee] = (0, h.useState)(1), [N, P] = (0, h.useState)(null), [F, I] = (0, h.useState)(() => typeof window < "u" && window.innerWidth < 760), [L, R] = (0, h.useState)(null), te = (0, h.useRef)({}), z = (0, h.useRef)(/* @__PURE__ */ new Set()), B = (0, h.useRef)(null), V = (0, h.useRef)(null), H = (0, h.useRef)([]), ne = (0, h.useRef)(0);
	(0, h.useEffect)(() => () => {
		H.current.forEach(clearTimeout), ne.current++;
	}, []), (0, h.useEffect)(() => {
		let t = !1;
		H.current.forEach(clearTimeout), H.current = [], ne.current++, te.current = {}, z.current.clear(), V.current = null, S.current = {}, C.current = {};
		let n;
		return (async () => {
			let r = await import("./pdf-CnPiFuPD.js");
			if (t) return;
			T(null), k(null), j({}), ee(1), D(""), P(null), y(null), x(!1), p.current++, r.GlobalWorkerOptions.workerSrc = `${cn}/pdfjs/pdf.worker.min.js`, n = r.getDocument({
				url: e,
				withCredentials: !0,
				rangeChunkSize: 65536,
				cMapUrl: `${cn}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${cn}/pdfjs/standard_fonts/`,
				wasmUrl: `${cn}/pdfjs/wasm/`
			});
			let i = await n.promise;
			if (t) return;
			let a = [];
			for (let e = 1; e <= i.numPages; e++) {
				let n = (await i.getPage(e)).getViewport({ scale: 1 });
				if (t) return;
				let r = n.width / 2 / n.height;
				n.width / n.height > 1.2 ? e === 1 || e === i.numPages ? a.push({
					p: e,
					part: "center",
					r,
					edge: !0
				}) : a.push({
					p: e,
					part: "left",
					r
				}, {
					p: e,
					part: "right",
					r
				}) : a.push({
					p: e,
					part: "full",
					r: n.width / n.height
				});
			}
			let o = s ? s.split(",").map(Number).map((e) => a[e - 1]).filter((e) => !!e) : a;
			V.current = o, k(o), T(i);
		})().catch(() => {
			t || D(o("Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen."));
		}), () => {
			t = !0, n?.destroy().catch(() => {});
		};
	}, [e, s]), (0, h.useEffect)(() => {
		let e = () => u(document.fullscreenElement === c.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	function U() {
		f(""), document.fullscreenElement ? document.exitFullscreen() : c.current?.requestFullscreen ? c.current.requestFullscreen().catch(() => f(o("Vollbild ist in diesem Browser nicht verfügbar."))) : f(o("Vollbild ist in diesem Browser nicht verfügbar."));
	}
	async function re() {
		let e = m.trim().toLocaleLowerCase("de-CH"), t = V.current;
		if (!w || !t || e.length < 2) {
			y(null);
			return;
		}
		x(!0);
		let n = ne.current, r = ++p.current, i = [];
		try {
			for (let a = 1; a <= w.numPages; a++) {
				if (!S.current[a]) {
					let e = await w.getPage(a), t = await e.getTextContent();
					if (n !== ne.current || r !== p.current) return;
					C.current[a] = e.getViewport({ scale: 1 }).width, S.current[a] = t.items.map((e) => "str" in e ? {
						str: e.str,
						x: e.transform[4]
					} : {
						str: "",
						x: 0
					});
				}
				if (n !== ne.current || r !== p.current) return;
				let o = S.current[a], s = C.current[a];
				for (let n of [
					"left",
					"right",
					"all"
				]) {
					let r = o.filter((e) => n === "all" || (n === "left" ? e.x < s / 2 : e.x >= s / 2)).map((e) => e.str).join(" "), c = r.toLocaleLowerCase("de-CH").indexOf(e);
					if (c < 0) continue;
					let l = t.findIndex((e) => e.p === a && (n === "all" ? ["full", "center"].includes(e.part) : e.part === n)) + 1;
					l > 0 && !i.some((e) => e.v === l) && i.push({
						v: l,
						text: r.slice(Math.max(0, c - 40), c + e.length + 40).replace(/\s+/g, " ").trim()
					});
				}
			}
			y(i);
		} catch {
			n === ne.current && r === p.current && y([]);
		} finally {
			n === ne.current && r === p.current && x(!1);
		}
	}
	function ie(e) {
		H.current.forEach(clearTimeout), H.current = [], P(null), ee(e);
	}
	(0, h.useEffect)(() => {
		let e = () => I(window.innerWidth < 760);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []);
	let W = L ?? F, G = O ? O.length : 0, ae = (e) => W ? [e] : e <= 1 ? [0, 1] : [e - e % 2, e - e % 2 + 1 <= G ? e - e % 2 + 1 : 0], oe = (e) => W ? e : e <= 1 ? 1 : e - e % 2, se = ae(M), ce = oe(M), le = W ? ce + 1 : ce <= 1 ? 2 : ce + 2, ue = W ? ce - 1 : ce <= 3 ? 1 : ce - 2, de = G > 0 && le <= G, fe = ce > 1, pe = (e) => {
		let t = O?.[e - 1];
		return t ? `${t.p}:${t.part}` : "";
	};
	function me(e, t, n) {
		let r = document.createElement("canvas");
		return r.width = Math.floor(n), r.height = e.height, r.getContext("2d").drawImage(e, t, 0, n, e.height, 0, 0, n, e.height), r.toDataURL("image/jpeg", .86);
	}
	function he(e) {
		try {
			let t = e.getContext("2d"), n = e.width, r = e.height, i = (e) => {
				let i = t.getImageData(Math.floor(e), 0, Math.floor(n * .18), r).data, a = 0;
				for (let e = 0; e < i.length; e += 16) i[e] + i[e + 1] + i[e + 2] < 690 && a++;
				return a / (i.length / 16);
			};
			return i(n * .03) < .02 && i(n * .79) < .02;
		} catch {
			return !0;
		}
	}
	async function ge(e) {
		let t = V.current, n = t?.[e - 1];
		if (!w || !n || te.current[`${n.p}:${n.part}`] || z.current.has(n.p)) return;
		z.current.add(n.p);
		let r = ne.current;
		try {
			let e = await w.getPage(n.p), i = e.getViewport({ scale: 1 }), a = e.getViewport({ scale: Math.min(2.2, 1300 / i.height) }), o = document.createElement("canvas");
			if (o.width = Math.floor(a.width), o.height = Math.floor(a.height), await e.render({
				canvas: o,
				viewport: a
			}).promise, r !== ne.current) return;
			let c = {};
			if (n.part === "full") c[`${n.p}:full`] = o.toDataURL("image/jpeg", .86);
			else if (c[`${n.p}:left`] = me(o, 0, o.width / 2), c[`${n.p}:right`] = me(o, o.width / 2, o.width / 2), n.edge) if (s || he(o)) c[`${n.p}:center`] = me(o, o.width / 4, o.width / 2);
			else {
				let e = t.flatMap((e) => e === n ? [{
					p: e.p,
					part: "left",
					r: e.r
				}, {
					p: e.p,
					part: "right",
					r: e.r
				}] : [e]);
				V.current = e, k(e);
			}
			te.current = {
				...te.current,
				...c
			}, j(te.current), e.cleanup(), o.width = 0;
		} catch {
			r === ne.current && D(o("Die Seite konnte nicht geladen werden. Bitte lade das Magazin erneut."));
		} finally {
			r === ne.current && z.current.delete(n.p);
		}
	}
	(0, h.useEffect)(() => {
		if (!w || !O) return;
		let e = [
			...ae(M),
			...ae(Math.min(G, le)),
			...ae(Math.max(1, ue)),
			...ae(Math.min(G, le + (W ? 1 : 2)))
		];
		(async () => {
			for (let t of e) t && await ge(t);
		})();
	}, [
		w,
		O,
		M,
		W
	]);
	let _e = O?.length ? (O[1] || O[0]).r : .707;
	function K(e) {
		if (N || !w || e > 0 && !de || e < 0 && !fe) return;
		let t = e > 0 ? le : ue, n = ae(t);
		P({
			...W ? e > 0 ? {
				under: [n[0]],
				front: se[0],
				back: -1,
				side: "right"
			} : {
				under: [se[0]],
				front: n[0],
				back: -1,
				side: "right",
				reverse: !0
			} : e > 0 ? {
				under: [se[0], n[1]],
				front: se[1],
				back: n[0],
				side: "right"
			} : {
				under: [n[0], se[1]],
				front: se[0],
				back: n[1],
				side: "left"
			},
			go: !1
		}), H.current.push(setTimeout(() => P((e) => e && {
			...e,
			go: !0
		}), 30)), H.current.push(setTimeout(() => {
			ee(t), P(null);
		}, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 680));
	}
	let ve = (e, t) => {
		if (e === -1) return /* @__PURE__ */ (0, _.jsx)("div", { className: `fb-face fb-paper ${t}` });
		if (!e) return /* @__PURE__ */ (0, _.jsx)("div", { className: `fb-face fb-empty ${t}` });
		let n = A[pe(e)], r = Se(e);
		return /* @__PURE__ */ (0, _.jsx)("div", {
			className: `fb-face ${t}`,
			children: n ? /* @__PURE__ */ (0, _.jsx)("img", {
				src: n,
				alt: `${o("Seite")} ${r}`,
				draggable: !1
			}) : /* @__PURE__ */ (0, _.jsx)("span", {
				className: "fb-loading",
				children: o("Seite wird geladen …")
			})
		});
	}, ye = N ? N.under : se, be = se.filter(Boolean), xe = s ? s.split(",").map(Number) : null, Se = (e) => xe?.[e - 1] ?? e, Ce = G ? xe ? be.map(Se).join("–") : `${be.length > 1 ? be.join("–") : String(be[0] || 1)} ${o("von")} ${G}` : "", we = i === !1 ? "" : i || e;
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		ref: c,
		className: "strc-flipbook" + (W ? " is-single" : "") + (l ? " is-fullscreen" : ""),
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "fb-toolbar",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => K(-1),
						disabled: !fe || !!N,
						children: ["← ", o("Zurück")]
					}),
					/* @__PURE__ */ (0, _.jsx)("span", {
						"aria-live": "polite",
						children: G ? `${o("Seite")} ${Ce}` : o("Magazin wird geladen …")
					}),
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => K(1),
						disabled: !de || !!N,
						children: [o("Weiter"), " →"]
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: () => R(!W),
						children: o(W ? "Doppelseite" : "Einzelseite")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: U,
						"aria-pressed": l,
						children: l ? o("Vollbild beenden") : "⛶ " + o("Vollbild")
					}),
					we && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary fb-mode",
						href: we,
						download: !0,
						children: o("Download")
					}),
					n && /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: n,
						children: o("Textansicht")
					})
				]
			}),
			a && !s && /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "fb-search",
				role: "search",
				onSubmit: (e) => {
					e.preventDefault(), re();
				},
				children: [
					/* @__PURE__ */ (0, _.jsx)("label", {
						className: "sr-only",
						htmlFor: t + "-search",
						children: o("Im Magazin suchen")
					}),
					/* @__PURE__ */ (0, _.jsx)("input", {
						id: t + "-search",
						type: "search",
						placeholder: o("Im Magazin suchen …"),
						value: m,
						onChange: (e) => {
							p.current++, g(e.target.value), y(null), x(!1);
						}
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "submit",
						className: "club-secondary",
						disabled: !w || b || m.trim().length < 2,
						children: o(b ? "Suche läuft …" : "Suchen")
					}),
					v && /* @__PURE__ */ (0, _.jsx)("div", {
						className: "fb-hits",
						"aria-live": "polite",
						children: v.length ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [
							v.length,
							" ",
							o((v.length, "Treffer")),
							":"
						] }), v.slice(0, 40).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							className: se.includes(e.v) ? "is-current" : "",
							onClick: () => ie(e.v),
							title: e.text,
							children: [
								o("Seite"),
								" ",
								e.v
							]
						}, e.v))] }) : /* @__PURE__ */ (0, _.jsx)("span", { children: o("Keine Treffer.") })
					})
				]
			}),
			E ? /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: E
			}) : /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "fb-book",
				style: {
					aspectRatio: String((W ? 1 : 2) * _e),
					"--fb-ratio": (W ? 1 : 2) * _e
				},
				tabIndex: 0,
				role: "group",
				"aria-label": `${t} – ${o("Blättern mit Pfeiltasten, Klick oder Wischen")}`,
				onKeyDown: (e) => {
					e.key === "ArrowRight" ? (e.preventDefault(), K(1)) : e.key === "ArrowLeft" && (e.preventDefault(), K(-1));
				},
				onClick: (e) => {
					if (B.current === "swiped") {
						B.current = null;
						return;
					}
					let t = e.currentTarget.getBoundingClientRect();
					K(e.clientX - t.left > t.width / 2 ? 1 : -1);
				},
				onPointerDown: (e) => {
					B.current = e.clientX;
				},
				onPointerUp: (e) => {
					let t = B.current;
					B.current = null, typeof t == "number" && Math.abs(e.clientX - t) > 50 && (B.current = "swiped", K(e.clientX < t ? 1 : -1));
				},
				children: [
					W ? ve(ye[0], "fb-single") : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [ve(ye[0], "fb-left"), ve(ye[1], "fb-right")] }),
					N && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: `fb-leaf fb-leaf-${W ? "single" : N.side}${N.reverse ? " is-reverse" : ""}${N.go ? " is-turning" : ""}`,
						children: [ve(N.front, "fb-front"), ve(N.back, "fb-back")]
					}),
					!W && /* @__PURE__ */ (0, _.jsx)("span", {
						className: "fb-spine",
						"aria-hidden": "true"
					})
				]
			}),
			d && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: d
			}),
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "fb-hint",
				children: o("Zum Blättern auf die rechte oder linke Seite klicken, wischen oder die Pfeiltasten benutzen.")
			})
		]
	});
}
//#endregion
//#region app/components/MemberDashboard.tsx
var un = {
	"#forum": "◎",
	"#galerie": "▧",
	"#bibliothek": "▤",
	"#marktplatz": "◇",
	"#tr-shop": "▣",
	"#agenda-verwalten": "▦",
	"#antraege": "✉"
}, dn = (e) => un[String(e || "").split("/")[0]] || "◉", fn = {
	pending: "In Prüfung",
	draft: "Entwurf / abgelehnt",
	publish: "Veröffentlicht",
	confirmed: "Bestätigt",
	waiting: "Warteliste",
	cancelled: "Abgemeldet",
	outstanding: "Zahlung offen",
	partially_paid: "Teilweise bezahlt",
	pending_payment: "Zahlung ausstehend",
	not_due: "Noch nicht fällig",
	not_required: "Keine Zahlung erforderlich",
	paid: "Bezahlt",
	waived: "Erlassen",
	refunded: "Zurückerstattet",
	expired: "Abgelaufen",
	reserved: "Reserviert",
	failed: "Zahlung fehlgeschlagen",
	review_required: "Zahlung prüfen"
};
function pn({ extraTools: e = [] }) {
	let { language: t } = n(), [i, a] = (0, h.useState)(null), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(0), [d, f] = (0, h.useState)(!1), [p, m] = (0, h.useState)(!1), [g, y] = (0, h.useState)("");
	if ((0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_dashboard", { language: t }, e.signal).then((e) => {
			a(e), c("");
		}).catch((t) => {
			e.signal.aborted || c(t.message);
		}), () => e.abort();
	}, [l, t]), s) return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content",
		children: [/* @__PURE__ */ (0, _.jsx)("p", {
			role: "alert",
			children: s
		}), /* @__PURE__ */ (0, _.jsx)("button", {
			className: "club-secondary",
			onClick: () => u((e) => e + 1),
			children: o("Erneut versuchen")
		})]
	});
	if (!i) return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content",
		children: /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Ihre Übersicht wird geladen …")
		})
	});
	let b = i.magazineIssue || null, x = i.isBoard, S = i.notifications.filter((e) => e && typeof e == "object" && typeof e.title == "string" && typeof e.url == "string"), E = i.registrations.filter((e) => ![
		"cancelled",
		"expired",
		"waiting"
	].includes(e.state || "") && [
		"outstanding",
		"partially_paid",
		"pending_payment",
		"failed"
	].includes(e.paymentStatus || "")), D = (e) => {
		if (!e) return "";
		let t = new Date(e);
		return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(r());
	}, O = (e, t) => /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: e.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: e.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
		/* @__PURE__ */ (0, _.jsx)("a", {
			href: e.url,
			children: e.title.startsWith("Neue Antwort:") ? o("Neue Antwort:") + e.title.slice(13) : e.title
		}),
		e.registered && /* @__PURE__ */ (0, _.jsxs)("strong", { children: [" · ", o("Bereits angemeldet")] }),
		e.location && /* @__PURE__ */ (0, _.jsx)("p", { children: e.location }),
		D(e.startAt || e.at) && /* @__PURE__ */ (0, _.jsx)("p", { children: D(e.startAt || e.at) }),
		/* @__PURE__ */ (0, _.jsx)("p", { children: [
			e.status && o(fn[e.status] || e.status),
			e.state && o(fn[e.state] || e.state),
			e.paymentStatus && o(fn[e.paymentStatus] || e.paymentStatus),
			e.total
		].filter(Boolean).join(" · ") })
	] }, e.id || t)) }) : t ? /* @__PURE__ */ (0, _.jsx)("p", { children: o(t) }) : null }), k = e.filter((e) => e.url === "#agenda-verwalten" || e.url === "#antraege").map((e) => ({
		url: e.url,
		title: e.url === "#antraege" ? "Anträge bearbeiten" : "Agenda verwalten"
	})), A = e.find((e) => e.url === "#redaktion"), j = () => {
		b && (b.canRead && b.fileUrl ? f(!0) : window.location.href = b.loginUrl || i.magazine?.url || "#bibliothek");
	}, M = i.membership || {}, ee = i.subscriptions, N = ee ? ee.request ? {
		print: ee.request.print,
		newsletter: ee.request.newsletter
	} : {
		print: ee.print,
		newsletter: ee.newsletter
	} : null;
	async function P(e, t) {
		if (!N || !i?.nonce || p) return;
		let n = {
			...N,
			[e]: t
		};
		m(!0), y("");
		try {
			let e = await w("strc_dashboard", i.nonce, T({
				operation: "subscriptions",
				print: n.print ? "1" : "0",
				newsletter: n.newsletter ? "1" : "0"
			}));
			a((t) => t && {
				...t,
				subscriptions: e.subscriptions
			}), y(e.message);
		} catch (e) {
			y(e.message);
		} finally {
			m(!1);
		}
	}
	let F = [
		M.type,
		M.number,
		M.partner
	].filter(Boolean), I = [M.since && o("Mitglied seit") + ": " + M.since, (M.region || i.region) && o("Region") + " " + (M.region || i.region)].filter(Boolean);
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content personal-dashboard",
		children: [/* @__PURE__ */ (0, _.jsxs)("header", {
			className: "dashboard-welcome",
			children: [/* @__PURE__ */ (0, _.jsx)("span", {
				className: "dashboard-avatar",
				"aria-hidden": "true",
				children: (i.firstName || i.displayName).split(/\s+/).slice(0, 2).map((e) => Array.from(e)[0]).join("")
			}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsxs)("h2", { children: [
					o("Willkommen"),
					" ",
					i.firstName || i.displayName,
					"!"
				] }),
				F.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "db-member-line",
					children: F.join(" | ")
				}),
				I.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "db-member-line",
					children: I.join(" | ")
				}),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "dashboard-car-chips",
					children: i.vehicles.slice(0, 3).map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
						href: "#profil",
						children: [
							e.model,
							" ",
							e.details,
							" · ",
							o(e.status === "restoration" ? "In Restauration" : "Fahrbereit")
						]
					}, e.id))
				}),
				!i.vehicles.length && /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#profil",
					children: o("Fahrzeuge erfassen")
				})
			] })]
		}), /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "dashboard-sections",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-upcoming db-card db-events",
					children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: "#agenda",
						children: o("Nächste Events")
					}) }), i.upcoming.length ? /* @__PURE__ */ (0, _.jsx)("ul", {
						className: "db-event-list",
						children: i.upcoming.slice(0, 3).map((e, t) => {
							let n = new Date(e.startAt || e.at || ""), i = !Number.isNaN(n.getTime());
							return /* @__PURE__ */ (0, _.jsxs)("li", { children: [/* @__PURE__ */ (0, _.jsxs)("span", {
								className: "db-event-date",
								"aria-hidden": "true",
								children: [/* @__PURE__ */ (0, _.jsx)("span", {
									className: "d",
									children: i ? n.getDate() : "–"
								}), i ? n.toLocaleDateString(r(), { month: "short" }).replace(".", "") : ""]
							}), /* @__PURE__ */ (0, _.jsxs)("span", {
								className: "db-event-info",
								children: [
									/* @__PURE__ */ (0, _.jsx)("a", {
										href: e.url,
										children: e.title
									}),
									/* @__PURE__ */ (0, _.jsx)("span", { children: [e.location, D(e.startAt || e.at)].filter(Boolean).join(" · ") }),
									e.registered ? /* @__PURE__ */ (0, _.jsxs)("span", {
										className: "db-registered",
										children: ["✓ ", o("Bereits angemeldet")]
									}) : /* @__PURE__ */ (0, _.jsxs)("a", {
										className: "db-reg-btn",
										href: e.url,
										children: [o("Details"), " →"]
									})
								]
							})] }, e.id || t);
						})
					}) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine bevorstehenden Veranstaltungen.") })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-notifications db-card db-feed",
					children: [
						/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Aktivitäten & Mitteilungen") }),
						O(S.slice(0, 6), ""),
						E.length > 0 && O(E, ""),
						i.magazine && !b && /* @__PURE__ */ (0, _.jsx)("a", {
							href: i.magazine.url,
							children: i.magazine.title
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-activity db-card db-mine",
					children: [
						/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Meine Aktivitäten") }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Anlässe") }), O(i.registrations, "Noch keine Anmeldungen.")] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Beiträge und Inserate") }), O(i.uploads, "Noch keine Beiträge eingereicht.")] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Shop-Bestellungen") }), O(i.orders, "Noch keine Bestellungen.")] }),
						(i.queues.length > 0 || k.length > 0) && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "db-moderation",
							children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Meine Moderationsaufgaben") }), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "db-moderation-grid",
								children: [i.queues.map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
									className: "db-mod-tile" + ((e.count || 0) > 0 ? " has-open" : ""),
									href: e.url,
									children: [
										/* @__PURE__ */ (0, _.jsx)("i", {
											"aria-hidden": "true",
											children: dn(e.url)
										}),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.title) }),
										/* @__PURE__ */ (0, _.jsx)("span", { children: (e.count || 0) > 0 ? `${e.count} ${o("In Prüfung")}` : o("Nichts offen") })
									]
								}, e.url)), k.map((e) => e.url === "#agenda-verwalten" && i.myEvents?.length ? /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "db-mod-tile is-tool is-agenda",
									children: [/* @__PURE__ */ (0, _.jsxs)("a", {
										className: "db-agenda-head",
										href: e.url,
										children: [
											/* @__PURE__ */ (0, _.jsx)("i", {
												"aria-hidden": "true",
												children: dn(e.url)
											}),
											/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.title) }),
											/* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Öffnen"), " →"] })
										]
									}), /* @__PURE__ */ (0, _.jsx)("ul", {
										className: "db-agenda-list",
										children: i.myEvents.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
											/* @__PURE__ */ (0, _.jsx)("span", {
												className: "db-agenda-date",
												children: D(e.startAt)
											}),
											/* @__PURE__ */ (0, _.jsx)("a", {
												href: "#agenda-verwalten/" + e.id,
												children: e.title
											}),
											/* @__PURE__ */ (0, _.jsx)("span", {
												className: "db-agenda-state" + (e.status === "publish" ? "" : " is-draft"),
												children: o(e.status === "publish" ? "Veröffentlicht" : "Entwurf")
											}),
											e.registrationRequired && /* @__PURE__ */ (0, _.jsxs)("span", {
												className: "db-agenda-count",
												children: [
													e.registered,
													e.capacity ? " / " + e.capacity : "",
													" ",
													o("angemeldet")
												]
											})
										] }, e.id))
									})]
								}, e.url) : /* @__PURE__ */ (0, _.jsxs)("a", {
									className: "db-mod-tile is-tool",
									href: e.url,
									children: [
										/* @__PURE__ */ (0, _.jsx)("i", {
											"aria-hidden": "true",
											children: dn(e.url)
										}),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.title) }),
										/* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Öffnen"), " →"] })
									]
								}, e.url))]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-quick-access db-card db-quick",
					children: [
						/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Schnellzugriffe") }),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "dashboard-quicklinks",
							children: [
								[
									"#mitgliederliste",
									"◉",
									"Mitglieder"
								],
								[
									"#forum",
									"◎",
									"Forum"
								],
								[
									"#galerie",
									"▧",
									"Galerie"
								],
								[
									"#bibliothek",
									"▤",
									"Bibliothek"
								],
								[
									"#marktplatz",
									"◇",
									"Marktplatz"
								],
								[
									"#tr-shop",
									"▣",
									"TR-Shop"
								]
							].map(([e, t, n]) => /* @__PURE__ */ (0, _.jsxs)("a", {
								href: e,
								children: [/* @__PURE__ */ (0, _.jsx)("span", {
									"aria-hidden": "true",
									children: t
								}), /* @__PURE__ */ (0, _.jsx)("strong", { children: o(n) })]
							}, e))
						}),
						(b || N) && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "db-magazine",
							children: [
								/* @__PURE__ */ (0, _.jsx)("h3", { children: o("TR-Magazin") }),
								b && /* @__PURE__ */ (0, _.jsxs)("button", {
									type: "button",
									className: "db-magazine-card",
									onClick: j,
									children: [b.cover || b.previewPages?.[0] ? /* @__PURE__ */ (0, _.jsx)(v, {
										unoptimized: !0,
										width: 96,
										height: 128,
										className: "db-magazine-cover",
										src: b.cover || b.previewPages[0],
										alt: "",
										loading: "lazy"
									}) : /* @__PURE__ */ (0, _.jsxs)("span", {
										className: "db-magazine-mark",
										"aria-hidden": "true",
										children: ["TR", /* @__PURE__ */ (0, _.jsx)("small", { children: "MAGAZINE" })]
									}), /* @__PURE__ */ (0, _.jsxs)("span", {
										className: "db-magazine-text",
										children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: b.title }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Jetzt lesen"), " →"] })]
									})]
								}),
								N && /* @__PURE__ */ (0, _.jsxs)("fieldset", {
									className: "db-subscriptions",
									disabled: p,
									children: [
										/* @__PURE__ */ (0, _.jsx)("legend", {
											className: "market-sr-only",
											children: o("Abonnemente")
										}),
										/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											checked: N.print,
											onChange: (e) => void P("print", e.target.checked)
										}), o("Printausgabe abonniert")] }),
										/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											checked: N.newsletter,
											onChange: (e) => void P("newsletter", e.target.checked)
										}), o("eNewsletter abonniert")] }),
										g ? /* @__PURE__ */ (0, _.jsx)("small", {
											role: "status",
											children: g
										}) : /* @__PURE__ */ (0, _.jsx)("small", { children: o(ee?.request ? "Änderung gemeldet, wird von der Mitgliederverwaltung in Fairgate übernommen." : "Stand aus Fairgate.") })
									]
								})
							]
						}),
						d && b?.fileUrl && /* @__PURE__ */ (0, _.jsx)(q, {
							title: b.title,
							close: () => f(!1),
							children: /* @__PURE__ */ (0, _.jsx)(ln, {
								url: b.fileUrl,
								title: b.title
							})
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-more db-card db-admin",
					children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Administration") }), /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [
							/* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: "#profil",
								children: o("Mein Profil")
							}),
							x && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: "#clubdokumente",
								children: o("Clubdokumente")
							}),
							A && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: A.url,
								children: o("Redaktion")
							})
						]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region app/components/PublicGallery.tsx
function mn() {
	let [e, t] = (0, h.useState)([]);
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_community", { operation: "teasers" }, e.signal).then(t).catch(() => {}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h1", { children: o("Galerie") }),
			e.length > 0 && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "community-grid",
				children: e.map((e) => /* @__PURE__ */ (0, _.jsxs)("figure", { children: [/* @__PURE__ */ (0, _.jsx)("a", {
					href: e.url,
					children: /* @__PURE__ */ (0, _.jsx)(v, {
						unoptimized: !0,
						src: e.url,
						alt: e.caption || "Freigegebenes Clubfoto",
						width: 600,
						height: 400
					})
				}), e.caption && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: e.caption })] }, e.url))
			}),
			/* @__PURE__ */ (0, _.jsx)("p", { children: o("Die vollständige Galerie steht Clubmitgliedern zur Verfügung.") }),
			/* @__PURE__ */ (0, _.jsx)("a", {
				className: "market-primary",
				href: y + "/wp-login.php?redirect_to=" + encodeURIComponent(y + "/#galerie"),
				children: o("Mitglieder-Login")
			})
		]
	});
}
//#endregion
//#region app/components/ForumArea.tsx
var hn = {
	"Teile gesucht": "Ersatzteilsuche",
	"Garagen / Spezialisten": "TR-Spezialisten"
}, gn = {
	Fahrzeuge: ["🚗", "TR2–TR3A · TR4–TR4A · TR5–TR6 · TR7–TR8 · andere Triumphs"],
	Technik: ["🔧", "Motor · Vergaser/Einspritzung · Elektrik · Fahrwerk · Karosserie · Getriebe/Overdrive"],
	Restaurationen: ["🛠", "Projekte und Erfahrungen"],
	"Teile gesucht": ["🔩", "Gesucht · Bezugsquellen · Identifikation"],
	"Garagen / Spezialisten": ["🏠", "Werkstätten · Spezialisten · Sattler · Lackierer"],
	"Events & Reisen": ["🗺", "Reiseberichte · Roadbooks · Hoteltipps"],
	Clubleben: ["🏛", "Fragen zum Club · Ideen & Vorschläge"]
}, _n = [
	"#e7f0f8",
	"#e9f4ec",
	"#fbf1e4",
	"#f6e8ea",
	"#f1edf7",
	"#e6f4f3",
	"#fdf6dc",
	"#eef1f3"
], vn = (e) => hn[e] || e, yn = (e) => gn[e]?.[0] || "💬", bn = (e) => gn[e]?.[1] || "", xn = (e) => _n[e % _n.length];
function Sn(e = !0) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(0);
	(0, h.useEffect)(() => {
		if (!e) return;
		let t = new AbortController();
		return C("strc_forum_settings", {}, t.signal).then(n).catch(() => {}), () => t.abort();
	}, [r, e]);
	async function a(e) {
		t && (await w("strc_forum_settings", t.nonce, T({
			operation: "save",
			interests: JSON.stringify(e.interests),
			email: e.email ? "1" : "0",
			website: e.website ? "1" : "0",
			whatsapp: e.whatsapp ? "1" : "0",
			expertNotifications: e.expertNotifications ? "1" : "0"
		})), n({
			...t,
			preferences: e
		}));
	}
	return {
		settings: t,
		save: a,
		subscribed: (e) => !!t?.preferences.interests.some((t) => t.area === e && !t.model && !t.component),
		reload: () => i((e) => e + 1)
	};
}
function Cn({ area: e, forum: t }) {
	let [n, r] = (0, h.useState)(!1), [i, a] = (0, h.useState)(""), { settings: s, save: c, subscribed: l } = t;
	if (!s) return null;
	let u = l(e), d = s.preferences;
	async function f(e, t) {
		r(!0), a("");
		try {
			await c({
				...d,
				...e
			}), a(t);
		} catch (e) {
			a(e.message);
		} finally {
			r(!1);
		}
	}
	let p = () => f({
		website: !0,
		interests: u ? d.interests.filter((t) => !(t.area === e && !t.model && !t.component)) : [...d.interests, {
			model: "",
			component: "",
			area: e
		}]
	}, o(u ? "Abo beendet." : "Abonniert: Neue Beiträge erscheinen in Ihrem Dashboard."));
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "forum-subscribe",
		children: [
			/* @__PURE__ */ (0, _.jsx)("button", {
				type: "button",
				className: u ? "club-secondary is-subscribed" : "market-primary",
				disabled: n,
				"aria-pressed": u,
				onClick: () => void p(),
				children: u ? "✓ " + o("Abonniert") : "＋ " + o("Abonnieren")
			}),
			u && /* @__PURE__ */ (0, _.jsxs)("label", {
				className: "forum-whatsapp",
				children: [/* @__PURE__ */ (0, _.jsx)("input", {
					type: "checkbox",
					checked: d.whatsapp,
					disabled: n,
					onChange: (e) => void f({ whatsapp: e.target.checked }, e.target.checked ? o("WhatsApp-Hinweise eingeschaltet.") : o("WhatsApp-Hinweise ausgeschaltet."))
				}), o("Zusätzlich per WhatsApp informieren (an meine Mobilnummer im Profil, jederzeit widerrufbar)")]
			}),
			i && /* @__PURE__ */ (0, _.jsx)("span", {
				role: "status",
				className: "forum-subscribe-status",
				children: i
			})
		]
	});
}
function wn({ forum: e }) {
	let t = F(), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)([]), [s, c] = (0, h.useState)(null), [l, u] = (0, h.useState)([]), [d, f] = (0, h.useState)([]), [p, m] = (0, h.useState)(!1), [g, v] = (0, h.useState)("");
	if ((0, h.useEffect)(() => {
		let e = new AbortController(), t = setTimeout(() => {
			C("strc_forum_settings", { search: n }, e.signal).then((e) => a(e.members)).catch(() => {});
		}, 200);
		return () => {
			clearTimeout(t), e.abort();
		};
	}, [n]), !e.settings?.canManage) return /* @__PURE__ */ (0, _.jsx)("p", {
		role: "alert",
		children: o("Nur für Administration und Forumsmoderation.")
	});
	function y(e) {
		c(e), u([...new Set(e.expertise.map((e) => e.model).filter(Boolean))]), f([...new Set(e.expertise.map((e) => e.component).filter(Boolean))]), v("");
	}
	async function b() {
		if (!s || !e.settings) return;
		let t = (l.length ? l : [""]).flatMap((e) => (d.length ? d : [""]).map((t) => ({
			model: e,
			component: t,
			area: ""
		}))).filter((e) => e.model || e.component);
		m(!0), v("");
		try {
			await w("strc_forum_settings", e.settings.nonce, T({
				operation: "expert-save",
				id: String(s.id),
				expertise: JSON.stringify(t)
			})), v(o("Fachexperte gespeichert.")), a((e) => e.map((e) => e.id === s.id ? {
				...e,
				expertise: t
			} : e));
		} catch (e) {
			v(e.message);
		} finally {
			m(!1);
		}
	}
	let x = (e, t) => e.includes(t) ? e.filter((e) => e !== t) : [...e, t];
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(Dn, {}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "forum-experts form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Fachexperten zuteilen") }),
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o("Mitglied wählen und Fahrzeuge sowie Technikbereiche ankreuzen. Beispiel: TR3, TR4, TR4A, TR5 für Motor, Vergaser, Getriebe. Ohne Fahrzeug gilt der Bereich für alle Modelle.")
			}),
			/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitglied suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
				type: "search",
				value: n,
				onChange: (e) => r(e.target.value),
				placeholder: o("Name …")
			})] }),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "forum-expert-members",
				children: [i.map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
					type: "button",
					className: s?.id === e.id ? "market-primary" : "club-secondary",
					onClick: () => y(e),
					children: [e.name, e.expertise.length ? ` · ${e.expertise.length}` : ""]
				}, e.id)), !i.length && /* @__PURE__ */ (0, _.jsx)("span", {
					className: "club-hint",
					children: o(n ? "Keine Treffer." : "Noch keine Fachexperten zugeteilt. Namen eingeben, um ein Mitglied zu suchen.")
				})]
			}),
			s && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "forum-expert-form",
				children: [
					/* @__PURE__ */ (0, _.jsx)("h3", { children: s.name }),
					/* @__PURE__ */ (0, _.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Fahrzeuge") }), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "forum-checkgrid",
						children: L.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
							type: "checkbox",
							checked: l.includes(e),
							onChange: () => u((t) => x(t, e))
						}), e] }, e))
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Technikbereiche") }), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "forum-checkgrid",
						children: t.components.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
							type: "checkbox",
							checked: d.includes(e),
							onChange: () => f((t) => x(t, e))
						}), o(e)] }, e))
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: p || !l.length && !d.length && !s.expertise.length,
							onClick: () => void b(),
							children: o("Speichern")
						}), l.length || d.length ? /* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: p,
							onClick: () => {
								u([]), f([]);
							},
							children: o("Alle Häkchen entfernen")
						}) : null]
					}),
					g && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: g
					})
				]
			})
		]
	})] });
}
var Tn = {
	accepted: "Make hat die Testnachricht angenommen. Sie sollte in Kürze auf Ihrem Handy eintreffen; sonst im Make-Verlauf nachsehen.",
	failed: "Make hat die Nachricht abgelehnt (siehe Code unten). Bitte Webhook und Szenario in Make prüfen.",
	uncertain: "Make war nicht erreichbar oder hat nicht rechtzeitig geantwortet.",
	disabled: "Der WhatsApp-Versand ist auf dem Server ausgeschaltet (STRC_MAKE_WHATSAPP_ENABLED).",
	"incomplete-config": "Auf dem Server fehlen Webhook oder Vorlagennamen.",
	"no-consent": "Für den Test bitte zuerst einen Forumsbereich abonnieren und «Zusätzlich per WhatsApp informieren» anhaken.",
	inactive: "Ihr Mitgliederkonto ist nicht aktiv.",
	"no-phone": "In Ihrem Profil fehlt eine gültige Mobilnummer.",
	"bad-webhook": "Die Webhook-Adresse ist ungültig (muss https://…make.com sein).",
	"no-template": "Der Vorlagenname ist leer.",
	duplicate: "Diese Nachricht wurde bereits gesendet."
}, En = {
	accepted: "angenommen",
	failed: "abgelehnt",
	uncertain: "unklar",
	sending: "wird gesendet"
};
function Dn() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(!1), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_forum_settings", { operation: "whatsapp-status" }, e.signal).then((e) => {
			t(e.status), r(e.nonce);
		}).catch((t) => {
			e.signal.aborted || u(t.message);
		}), () => e.abort();
	}, []);
	async function d() {
		a(!0), c(""), u("");
		try {
			let e = await w("strc_forum_settings", n, T({ operation: "whatsapp-test" }));
			t(e.status), r(e.nonce), c(e.test);
		} catch (e) {
			u(e.message);
		} finally {
			a(!1);
		}
	}
	if (l && !e) return /* @__PURE__ */ (0, _.jsx)("p", {
		role: "alert",
		children: l
	});
	if (!e) return null;
	let f = (e, t, n = "") => /* @__PURE__ */ (0, _.jsxs)("li", {
		className: e ? "is-ok" : "is-missing",
		children: [
			/* @__PURE__ */ (0, _.jsx)("span", {
				"aria-hidden": "true",
				children: e ? "✓" : "✗"
			}),
			o(t),
			n && /* @__PURE__ */ (0, _.jsxs)("small", { children: [" · ", n] })
		]
	});
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "whatsapp-status form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("WhatsApp-Benachrichtigung (Make)") }),
			/* @__PURE__ */ (0, _.jsxs)("ul", { children: [
				f(e.enabled, "Versand auf dem Server eingeschaltet"),
				f(e.webhookValid, "Make-Webhook hinterlegt", e.webhookHost),
				f(!!e.templateDe && !!e.templateFr, "WhatsApp-Vorlagen DE / FR", [e.templateDe, e.templateFr].filter(Boolean).join(" / ")),
				f(e.myConsent, "Ihre WhatsApp-Einwilligung im Forum"),
				f(!!e.myPhone, "Ihre Mobilnummer im Profil", e.myPhone)
			] }),
			/* @__PURE__ */ (0, _.jsxs)("p", {
				className: "club-hint",
				children: [
					e.subscribers,
					" ",
					o("Mitglieder haben WhatsApp-Hinweise eingeschaltet.")
				]
			}),
			/* @__PURE__ */ (0, _.jsx)("div", {
				className: "club-actions",
				children: /* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "market-primary",
					disabled: i,
					onClick: () => void d(),
					children: o(i ? "Wird gesendet …" : "Testnachricht an mich senden")
				})
			}),
			s && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				className: s === "accepted" ? "club-notice" : "collection-state error",
				children: o(Tn[s] || s)
			}),
			l && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: l
			}),
			e.deliveries.length > 0 && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Letzte Zustellungen an Make") }), /* @__PURE__ */ (0, _.jsx)("table", {
				className: "whatsapp-deliveries",
				children: /* @__PURE__ */ (0, _.jsx)("tbody", { children: e.deliveries.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, _.jsx)("td", { children: e.at ? new Date(e.at).toLocaleString("de-CH") : "" }),
					/* @__PURE__ */ (0, _.jsx)("td", { children: o(En[e.state] || e.state) }),
					/* @__PURE__ */ (0, _.jsx)("td", { children: e.code ? `HTTP ${e.code}` : "" })
				] }, t)) })
			})] })
		]
	});
}
//#endregion
//#region app/components/PdfThumb.tsx
var On = window.strcSettings.assetBase ?? "", kn = /* @__PURE__ */ new Map();
function An({ url: e, width: t = 120 }) {
	let n = (0, h.useRef)(null), [r, i] = (0, h.useState)(() => ({
		url: e,
		src: kn.get(e) || ""
	})), a = r.url === e ? r.src : kn.get(e) || "", [o, s] = (0, h.useState)(!1);
	return (0, h.useEffect)(() => {
		if (a || !n.current) return;
		let e = new IntersectionObserver((t) => {
			t.some((e) => e.isIntersecting) && (s(!0), e.disconnect());
		}, { rootMargin: "200px" });
		return e.observe(n.current), () => e.disconnect();
	}, [a, e]), (0, h.useEffect)(() => {
		if (!o || a) return;
		let n = !1, r;
		return (async () => {
			let a = await import("./pdf-CnPiFuPD.js");
			a.GlobalWorkerOptions.workerSrc = `${On}/pdfjs/pdf.worker.min.js`, r = a.getDocument({
				url: e,
				withCredentials: !0,
				rangeChunkSize: 65536,
				disableAutoFetch: !0,
				cMapUrl: `${On}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${On}/pdfjs/standard_fonts/`,
				wasmUrl: `${On}/pdfjs/wasm/`
			});
			let o = await (await r.promise).getPage(1), s = o.getViewport({ scale: 1 }), c = s.width / s.height > 1.2, l = (c ? t * 2 : t) * 2 / s.width, u = o.getViewport({ scale: l }), d = document.createElement("canvas");
			d.width = Math.floor(u.width), d.height = Math.floor(u.height), await o.render({
				canvas: d,
				viewport: u
			}).promise;
			let f = d;
			c && (f = document.createElement("canvas"), f.width = Math.floor(d.width / 2), f.height = d.height, f.getContext("2d").drawImage(d, d.width / 4, 0, d.width / 2, d.height, 0, 0, d.width / 2, d.height));
			let p = f.toDataURL("image/jpeg", .8);
			kn.set(e, p), n || i({
				url: e,
				src: p
			}), o.cleanup();
		})().catch(() => {}), () => {
			n = !0, r?.destroy().catch(() => {});
		};
	}, [
		o,
		a,
		e,
		t
	]), /* @__PURE__ */ (0, _.jsx)("span", {
		ref: n,
		className: "pdf-thumb",
		style: { width: t },
		children: a ? /* @__PURE__ */ (0, _.jsx)("img", {
			src: a,
			alt: ""
		}) : /* @__PURE__ */ (0, _.jsx)("span", {
			className: "pdf-thumb-placeholder",
			"aria-hidden": "true",
			children: "PDF"
		})
	});
}
//#endregion
//#region app/components/GalleryRecent.tsx
var jn = (e) => Array.isArray(e) ? e.join(", ") : e || "";
function Mn({ eventId: e }) {
	let [t, n] = (0, h.useState)(!1), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)("");
	return (0, h.useEffect)(() => {
		if (!t || r) return;
		let n = new AbortController();
		return C("strc_registration", {
			operation: "roster",
			eventId: e
		}, n.signal).then((e) => i(e.participants)).catch((e) => {
			n.signal.aborted || s(e.message);
		}), () => n.abort();
	}, [
		t,
		r,
		e
	]), /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "gallery-participants",
		children: [/* @__PURE__ */ (0, _.jsxs)("button", {
			type: "button",
			className: "market-text-button",
			"aria-expanded": t,
			onClick: () => n((e) => !e),
			children: [
				o("Teilnehmer"),
				" ",
				t ? "▴" : "▾"
			]
		}), t && (a ? /* @__PURE__ */ (0, _.jsx)("p", {
			role: "alert",
			children: a
		}) : r ? r.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: r.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [e.name, e.vehicle?.model && /* @__PURE__ */ (0, _.jsxs)("span", { children: [" · ", [e.vehicle.model, e.vehicle.year].filter(Boolean).join(" ")] })] }, t)) }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine Teilnehmerliste vorhanden.") }) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Wird geladen …")
		}))]
	});
}
function Nn({ open: e }) {
	let [t, n] = (0, h.useState)(null);
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_community", { operation: "gallery-recent" }, e.signal).then((e) => n(e.items)).catch(() => n([])), () => e.abort();
	}, []), t?.length ? /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "gallery-recent",
		"aria-label": o("Letzte Veranstaltungen"),
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Letzte Veranstaltungen") }),
			t.map((t) => {
				let n = t.files.filter((e) => e.mime.startsWith("image/")), r = jn(t.classification.date);
				return /* @__PURE__ */ (0, _.jsxs)("article", {
					className: "gallery-recent-row",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "gallery-recent-copy",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h3", { children: /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "card-title-button",
								onClick: () => e(t.id),
								children: t.title
							}) }),
							r && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "eyebrow",
								children: new Date(r).toLocaleDateString("de-CH")
							}),
							t.description && /* @__PURE__ */ (0, _.jsxs)("p", { children: [t.description.slice(0, 60), t.description.length > 60 ? " …" : ""] }),
							/* @__PURE__ */ (0, _.jsx)(Mn, { eventId: jn(t.classification.eventId) })
						]
					}), /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "gallery-recent-thumbs",
						children: [n.slice(0, 4).map((n) => /* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							onClick: () => e(t.id),
							"aria-label": `${t.title} öffnen`,
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: n.url,
								alt: "",
								width: 180,
								height: 130
							})
						}, n.key)), n.length > 4 && /* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							className: "gallery-recent-more",
							onClick: () => e(t.id),
							children: ["+", n.length - 4]
						})]
					})]
				}, t.id);
			}),
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Alle Alben") })
		]
	}) : null;
}
//#endregion
//#region app/components/MemberPortrait.tsx
var Pn = {
	vehicle: "",
	chassis: "",
	year: "",
	note: "",
	features: "",
	owner: "",
	place: ""
};
function Fn(e) {
	let t = e?.portrait;
	return t && !Array.isArray(t) && t.owner ? t : null;
}
function In({ item: e, edit: t }) {
	let n = Fn(e);
	if (!n) return null;
	let r = e.files.find((t) => t.key === e.coverKey) || e.files.find((e) => e.mime.startsWith("image/")), i = n.features.split("\n").map((e) => e.trim()).filter(Boolean), a = [
		n.chassis && `${o("Chassis")}: ${n.chassis}`,
		n.year && `${o("Baujahr")}: ${n.year}`,
		n.note
	].filter(Boolean);
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "portrait",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "portrait-top",
				children: [r ? /* @__PURE__ */ (0, _.jsx)("a", {
					className: "portrait-photo",
					href: r.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: /* @__PURE__ */ (0, _.jsx)(v, {
						unoptimized: !0,
						src: r.url,
						alt: e.title,
						width: 900,
						height: 600
					})
				}) : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "portrait-photo is-empty",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, _.jsxs)("aside", {
					className: "portrait-card",
					"aria-label": o("Steckbrief"),
					children: [
						/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Steckbrief") }),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "portrait-vehicle",
							children: n.vehicle
						}),
						a.map((e) => /* @__PURE__ */ (0, _.jsx)("p", { children: e }, e)),
						i.length > 0 && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("h4", { children: [o("Besonderheiten"), ":"] }), i.map((e) => /* @__PURE__ */ (0, _.jsx)("p", { children: e }, e))] }),
						/* @__PURE__ */ (0, _.jsxs)("h4", { children: [o("Besitzer"), ":"] }),
						/* @__PURE__ */ (0, _.jsx)("p", { children: n.owner }),
						n.place && /* @__PURE__ */ (0, _.jsx)("p", { children: n.place })
					]
				})]
			}),
			e.description && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "portrait-text",
				children: e.description.split(/\n+/).map((e, t) => /* @__PURE__ */ (0, _.jsx)("p", { children: e }, t))
			}),
			t && e.canReview && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "club-actions",
				children: /* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					onClick: t,
					children: o("Porträt bearbeiten")
				})
			})
		]
	});
}
function Ln({ item: e, nonce: t, close: n, saved: r, deleted: i }) {
	let [a, s] = (0, h.useState)(Fn(e) || Pn), [c, l] = (0, h.useState)(e?.description || ""), [u, d] = (0, h.useState)(null), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(!!e), [v, y] = (0, h.useState)(!1), [b, x] = (0, h.useState)(""), [S, C] = (0, h.useState)(!1);
	(0, h.useEffect)(() => () => {
		f && URL.revokeObjectURL(f);
	}, [f]);
	let E = e?.files.find((t) => t.key === e.coverKey) || e?.files[0], D = (e) => (t) => s((n) => ({
		...n,
		[e]: t.target.value
	}));
	function O(e) {
		if (x(""), e) {
			if (![
				"image/jpeg",
				"image/png",
				"image/webp"
			].includes(e.type)) {
				x(o("Bitte ein JPG-, PNG- oder WebP-Bild wählen."));
				return;
			}
			if (e.size > 20 * 1024 * 1024) {
				x(o("Das Bild darf höchstens 20 MB gross sein."));
				return;
			}
			d(e), p(URL.createObjectURL(e));
		}
	}
	async function k() {
		if (!v) {
			if (!e && !u) {
				x(o("Bitte ein Bild auswählen."));
				return;
			}
			y(!0), x("");
			try {
				let n = T({
					operation: "portrait",
					...e ? { id: String(e.id) } : {},
					...a,
					text: c,
					consent: m ? "1" : "0"
				});
				u && n.append("files[]", u), r((await w("strc_community", t, n)).id);
			} catch (e) {
				x(e.message);
			} finally {
				y(!1);
			}
		}
	}
	async function A() {
		if (e) {
			y(!0), x("");
			try {
				await w("strc_community", t, T({
					operation: "portrait-delete",
					id: String(e.id)
				})), i?.();
			} catch (e) {
				x(e.message), y(!1);
			}
		}
	}
	let j = {
		id: e?.id || 0,
		title: a.owner || o("Vorschau"),
		description: c,
		canReview: !1,
		coverKey: "preview",
		files: f ? [{
			key: "preview",
			url: f,
			name: "",
			mime: "image/jpeg"
		}] : E ? [E] : [],
		portrait: {
			...a,
			owner: a.owner || "…",
			vehicle: a.vehicle || "…"
		}
	};
	return /* @__PURE__ */ (0, _.jsx)(q, {
		title: o(e ? "Mitgliederporträt bearbeiten" : "Mitgliederporträt erfassen"),
		close: n,
		busy: v,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form portrait-form",
			onSubmit: (e) => {
				e.preventDefault(), k();
			},
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Mitgliedergalerie: ein Bild, ein Steckbrief und ein kurzer Text. Das Porträt ist nach dem Speichern sofort für Mitglieder sichtbar.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					className: "portrait-fields",
					children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Bild") }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
						o(e ? "Bild ersetzen (optional)" : "Bild *"),
						/* @__PURE__ */ (0, _.jsx)("input", {
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							disabled: v,
							onChange: (e) => {
								O(e.target.files?.[0]), e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, _.jsx)("small", { children: o("JPG, PNG oder WebP bis 20 MB, Querformat empfohlen.") })
					] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					className: "portrait-fields",
					children: [
						/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Steckbrief") }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug *"), /* @__PURE__ */ (0, _.jsx)("input", {
								required: !0,
								maxLength: 60,
								list: "portrait-models",
								value: a.vehicle,
								onChange: D("vehicle"),
								placeholder: "TR6"
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Chassis"), /* @__PURE__ */ (0, _.jsx)("input", {
								maxLength: 40,
								value: a.chassis,
								onChange: D("chassis"),
								placeholder: "CF 2754 U"
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsx)("datalist", {
							id: "portrait-models",
							children: L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", { value: e }, e))
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Baujahr"), /* @__PURE__ */ (0, _.jsx)("input", {
								inputMode: "numeric",
								pattern: "(19|20)[0-9]{2}",
								maxLength: 4,
								value: a.year,
								onChange: D("year"),
								placeholder: "1973"
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zusatz"), /* @__PURE__ */ (0, _.jsx)("input", {
								maxLength: 60,
								value: a.note,
								onChange: D("note"),
								placeholder: o("z. B. MFK-Veteran")
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Besonderheiten (eine pro Zeile)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							rows: 3,
							maxLength: 300,
							value: a.features,
							onChange: D("features"),
							placeholder: "US-Modell\nMallard-Blue"
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Besitzer/in *"), /* @__PURE__ */ (0, _.jsx)("input", {
								required: !0,
								maxLength: 80,
								value: a.owner,
								onChange: D("owner"),
								placeholder: o("Vorname Name")
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("PLZ und Ort"), /* @__PURE__ */ (0, _.jsx)("input", {
								maxLength: 80,
								value: a.place,
								onChange: D("place"),
								placeholder: "8427 Freienstein"
							})] })]
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					className: "portrait-fields",
					children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Text") }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
						o("Text des Mitglieds"),
						/* @__PURE__ */ (0, _.jsx)("textarea", {
							rows: 8,
							maxLength: 800,
							value: c,
							onChange: (e) => l(e.target.value)
						}),
						/* @__PURE__ */ (0, _.jsxs)("small", {
							className: c.length >= 800 ? "is-limit" : "",
							children: [
								c.length,
								" / ",
								800,
								" ",
								o("Zeichen")
							]
						})
					] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("details", {
					className: "portrait-preview",
					open: !0,
					children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Vorschau") }), /* @__PURE__ */ (0, _.jsx)(In, { item: j })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						checked: m,
						onChange: (e) => g(e.target.checked)
					}), o("Das Mitglied ist mit der Veröffentlichung von Bild, Steckbrief und Text im Mitgliederbereich einverstanden.")]
				}),
				b && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "alert",
					children: b
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: v,
						onClick: n,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: v || !m,
						children: o(v ? "Wird gespeichert …" : e ? "Änderungen speichern" : "Porträt veröffentlichen")
					})]
				}),
				e && i && /* @__PURE__ */ (0, _.jsx)("div", {
					className: "portrait-delete",
					children: S ? /* @__PURE__ */ (0, _.jsxs)("span", { children: [
						o("Porträt mit Bild endgültig löschen?"),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary is-danger",
							disabled: v,
							onClick: () => void A(),
							children: o("Ja, löschen")
						}),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							onClick: () => C(!1),
							children: o("Abbrechen")
						})
					] }) : /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "market-text-button",
						onClick: () => C(!0),
						children: o("Porträt löschen")
					})
				})
			]
		})
	});
}
//#endregion
//#region app/components/Community.tsx
var Rn = (0, h.lazy)(() => import("./MagazineReader-DnlZ1knC.js")), zn = "strc_community", Bn = {
	events: "Veranstaltungen",
	portraits: "Mitgliedergalerie",
	restorations: "Fahrzeugrestaurationen",
	history: "Clubgeschichte"
}, Vn = {
	model: "Modell",
	models: "Fahrzeuge",
	component: "Technikbereich",
	area: "Bereich",
	occasion: "Anlass",
	date: "Datum",
	photographer: "Fotograf/in",
	galleryCategory: "Kategorie",
	documentType: "Dokumentart",
	language: "Sprache",
	source: "Quelle",
	year: "Jahr",
	issue: "Ausgabe",
	version: "Version",
	region: "Region",
	start: "Start",
	end: "Ziel",
	distance: "Distanz",
	drivingTime: "Fahrzeit",
	duration: "Dauer"
}, Hn = {
	forum: {
		title: "Forum",
		intro: "Fragen stellen, Erfahrungen teilen und Dateien austauschen.",
		create: "Thema erstellen",
		empty: "Noch keine Themen vorhanden."
	},
	gallery: {
		title: "Galerie",
		intro: "Bilder von Ausfahrten, Treffen und Triumph-Fahrzeugen teilen.",
		create: "Fotos hochladen",
		empty: "Noch keine Alben vorhanden."
	},
	library: {
		title: "Bibliothek",
		intro: "Dokumente, Magazine und technisches Wissen miteinander teilen.",
		create: "Dokument hochladen",
		empty: "Noch keine Dokumente vorhanden."
	}
};
function Un(e) {
	return Array.isArray(e) ? e.join(", ") : e || "";
}
var Wn = [
	"technical",
	"club",
	"travel",
	"magazine",
	"newsletter",
	"board"
], Gn = {
	technical: "⚙",
	club: "☷",
	travel: "⌖",
	magazine: "▤",
	newsletter: "✉",
	board: "♜"
};
function Kn({ kind: e, nonce: t, selectedId: n, initialGroup: i = "", title: a, section: s = "" }) {
	let { text: c } = ue(), l = F(), [u, d] = (0, h.useState)({
		items: [],
		total: 0,
		pages: 0
	}), [f, p] = (0, h.useState)(i), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(""), [E, D] = (0, h.useState)(!1), [O, A] = (0, h.useState)(1), [j, M] = (0, h.useState)(0), [ee, N] = (0, h.useState)(!0), [P, I] = (0, h.useState)(""), [R, te] = (0, h.useState)(""), [z, B] = (0, h.useState)(void 0), [V, H] = (0, h.useState)(void 0), [ne, U] = (0, h.useState)(() => n || null), [re, ie] = (0, h.useState)(null), [W, G] = (0, h.useState)(!1), [ae, oe] = (0, h.useState)(null), [se, ce] = (0, h.useState)(null), le = Sn(e === "forum"), [de, fe] = (0, h.useState)(""), [pe, me] = (0, h.useState)(""), [he, ge] = (0, h.useState)(""), _e = e === "forum" && s === "experten", K = s === "pruefung", [ve, ye] = (0, h.useState)(""), [be, xe] = (0, h.useState)(""), Se = ["magazine", "newsletter"].includes(f), Ce = !Se, we = (u.accessClasses || []).includes("restricted"), Te = !!u.canReview, Ee = e === "library" && {
		technical: !0,
		travel: !0,
		club: we || Te,
		magazine: Te,
		newsletter: !1,
		board: we,
		operations: (u.accessClasses || []).includes("limited")
	}[f], De = (u.libraryGroups || []).find((e) => e.key === f)?.types || [], Oe = e === "library" && [
		"magazine",
		"newsletter",
		"club"
	].includes(f), ke = () => {
		let e = (/* @__PURE__ */ new Date()).getFullYear(), t = u.items.map((e) => e.title.match(/(\d{4})\D+(?:Ausgabe|Nr\.?|No\.?)\s*(\d+)/i)).filter((t) => !!t && Number(t[1]) === e).map((e) => Number(e[2]));
		return `TR-Magazine . ${e} . Ausgabe ${t.length ? Math.max(...t) + 1 : 1}`;
	}, Ae = e !== "library" || !!f && (f !== "technical" || !!(m && be));
	(0, h.useEffect)(() => {
		let t = new AbortController(), n = setTimeout(() => {
			N(!0), I(""), C(zn, {
				operation: "list",
				kind: e,
				group: f,
				search: e === "library" ? ve : e === "forum" ? he : "",
				model: e === "library" ? be : e === "forum" ? de : "",
				component: e === "forum" ? pe : "",
				documentType: m,
				area: y,
				galleryCategory: x,
				trash: E ? "1" : "0",
				page: String(O),
				...K ? { review: "1" } : {}
			}, t.signal).then(d).catch((e) => {
				t.signal.aborted || I(e.message);
			}).finally(() => {
				t.signal.aborted || N(!1);
			});
		}, 180);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [
		e,
		f,
		m,
		y,
		x,
		E,
		O,
		j,
		ve,
		be,
		de,
		pe,
		he,
		K
	]);
	function je(e, t) {
		["magazine", "newsletter"].includes(f) || ["magazine", "newsletter"].includes(k(Un(e.classification.documentType))) ? ce({
			file: t,
			title: e.title,
			download: f !== "newsletter" && k(Un(e.classification.documentType)) !== "newsletter"
		}) : oe(t);
	}
	function Me(e = "") {
		te(e), N(!0), M((e) => e + 1);
	}
	async function Ne(e, n) {
		G(!0), I("");
		try {
			await w(zn, t, T({
				operation: n,
				id: String(e.id)
			})), ie(null), U(null), Me(n === "trash" ? "Beitrag ins Archiv verschoben." : n === "approve" ? "Beitrag freigegeben." : n === "reject" ? "Beitrag abgelehnt." : "Beitrag wiederhergestellt.");
		} catch (e) {
			I(e.message);
		} finally {
			G(!1);
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Nur für Mitglieder")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: o(a || c(`${e}.title`)) }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: c(`${e}.intro`) })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content community",
			children: [
				e === "gallery" && !K && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-toolbar",
					children: [/* @__PURE__ */ (0, _.jsx)("span", {}), /* @__PURE__ */ (0, _.jsxs)("span", {
						className: "gallery-toolbar-actions",
						children: [Te && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "club-secondary",
							onClick: () => H(null),
							children: ["＋ ", o("Mitgliederporträt erfassen")]
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							onClick: () => B(null),
							children: o(Hn[e].create)
						})]
					})]
				}),
				e === "gallery" && !K && !x && O === 1 && /* @__PURE__ */ (0, _.jsx)(Nn, { open: (e) => U(e) }),
				e === "forum" && !y && !K && le.settings?.canManage && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-toolbar",
					children: [/* @__PURE__ */ (0, _.jsx)("span", {}), /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary",
						href: _e ? "#forum" : "#forum/experten",
						children: o(_e ? "← Zurück zum Forum" : "Fachexperten & WhatsApp")
					})]
				}),
				_e ? /* @__PURE__ */ (0, _.jsx)(wn, { forum: le }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					K && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "community-review-head",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Zur Prüfung") }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: o("Eingereichte Beiträge öffnen und freigeben oder ablehnen. Freigegebene verschwinden aus dieser Liste.") }),
							/* @__PURE__ */ (0, _.jsx)("a", {
								className: "community-overview-link",
								href: "#" + {
									forum: "forum",
									gallery: "galerie",
									library: "bibliothek"
								}[e],
								children: o("← Zur Übersicht")
							})
						]
					}),
					(e === "library" || e === "forum") && !K && /* @__PURE__ */ (0, _.jsx)("div", {
						className: "category-tiles",
						"aria-label": o(e === "library" ? "Bibliotheksbereiche" : "Forumsbereiche"),
						children: e === "library" ? [...u.libraryGroups || []].sort((e, t) => (Wn.indexOf(e.key) + 1 || 99) - (Wn.indexOf(t.key) + 1 || 99)).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "category-tile lib-tile lib-" + e.key,
							"aria-pressed": f === e.key,
							onClick: () => {
								p(f === e.key ? "" : e.key), g(f !== e.key && e.types.length === 1 ? e.types[0] : ""), ye(""), xe(""), A(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("span", {
								className: "category-tile-icon",
								"aria-hidden": "true",
								children: Gn[e.key] || "▤"
							}), /* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.label) })]
						}, e.key)) : (y ? [y] : l.areas).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "category-tile forum-tile" + (y === e ? " is-open" : ""),
							style: { background: xn(l.areas.indexOf(e)) },
							"aria-pressed": y === e,
							onClick: () => {
								b(y === e ? "" : e), fe(""), me(""), ge(""), A(1);
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "category-tile-icon",
									"aria-hidden": "true",
									children: yn(e)
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "forum-tile-copy",
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o(vn(e)) }), /* @__PURE__ */ (0, _.jsx)("small", { children: o(bn(e)) })]
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "forum-tile-meta",
									children: [le.subscribed(e) && /* @__PURE__ */ (0, _.jsxs)("b", {
										className: "forum-badge",
										children: ["✓ ", o("abonniert")]
									}), typeof u.areaCounts?.[e] == "number" && /* @__PURE__ */ (0, _.jsxs)("small", { children: [
										u.areaCounts[e],
										" ",
										o(u.areaCounts[e] === 1 ? "Thema" : "Themen")
									] })]
								})
							]
						}, e))
					}),
					e === "forum" && y && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "forum-area-bar",
						children: [/* @__PURE__ */ (0, _.jsx)(Cn, {
							area: y,
							forum: le
						}), /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-primary",
							onClick: () => B(null),
							children: ["✎ ", o("Thema erstellen")]
						})]
					}),
					R && /* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-notice",
						role: "status",
						children: R
					}),
					e === "forum" && y && /* @__PURE__ */ (0, _.jsx)("button", {
						className: "community-overview-link",
						onClick: () => {
							b(""), D(!1), A(1);
						},
						children: o("← Alle Forumsbereiche")
					}),
					!K && (e === "gallery" || e === "library" && f || e === "forum" && y) && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "market-filters" + (e === "library" ? " lib-filters lib-filters-" + f : ""),
						children: [
							e === "library" && Se && /* @__PURE__ */ (0, _.jsxs)("label", {
								className: "market-search",
								children: [o("Suchbegriff"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "search",
									value: ve,
									onChange: (e) => {
										ye(e.target.value), A(1);
									}
								})]
							}),
							e === "library" && Ce && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Dokumentart"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: m,
								onChange: (e) => {
									g(e.target.value), A(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Dokumentarten")
								}), l.libraryTypes.filter((e) => (u.accessClasses || []).includes(e.access) && (!f || (u.libraryGroups || []).find((e) => e.key === f)?.types.includes(e.key))).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e.key,
									children: o(e.label)
								}, e.key))]
							})] }),
							e === "library" && f === "technical" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: be,
								onChange: (e) => {
									xe(e.target.value), A(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] }),
							e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kategorie"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: x,
								onChange: (e) => {
									S(e.target.value), A(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Kategorien")
								}), Object.entries(Bn).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(t)
								}, e))]
							})] }),
							e === "forum" && ["Fahrzeuge", "Technik"].includes(y) && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: de,
								onChange: (e) => {
									fe(e.target.value), A(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Modelle")
								}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: e
								}, e))]
							})] }),
							e === "forum" && y === "Technik" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Technikbereich"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: pe,
								onChange: (e) => {
									me(e.target.value), A(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Technikbereiche")
								}), l.components.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] }),
							e === "forum" && /* @__PURE__ */ (0, _.jsxs)("label", {
								className: "market-search",
								children: [o("Suche"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "search",
									value: he,
									onChange: (e) => {
										ge(e.target.value), A(1);
									},
									placeholder: o("Titel, Text oder Antworten")
								})]
							}),
							e === "forum" && /* @__PURE__ */ (0, _.jsxs)("label", {
								className: "market-own",
								children: [/* @__PURE__ */ (0, _.jsx)("input", {
									type: "checkbox",
									checked: E,
									onChange: (e) => {
										D(e.target.checked), A(1);
									}
								}), o("Archiv")]
							}),
							Ee && /* @__PURE__ */ (0, _.jsxs)("button", {
								className: "market-primary lib-upload",
								onClick: () => {
									De.length === 1 && g(De[0]), B(null);
								},
								children: [o("Dokument hochladen"), " ＋"]
							})
						]
					}),
					!K && (e === "library" && !f || e === "forum" && !y) ? null : !K && !Ae ? /* @__PURE__ */ (0, _.jsx)("p", {
						className: "collection-state lib-hint",
						children: o("Bitte Dokumentart und Fahrzeug wählen.")
					}) : ee ? /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: o("Beiträge werden geladen …")
					}) : P ? /* @__PURE__ */ (0, _.jsxs)("p", {
						className: "collection-state error",
						role: "alert",
						children: [P, /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-text-button",
							onClick: () => Me(),
							children: o("Erneut versuchen")
						})]
					}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsxs)("p", {
							className: "market-count",
							role: "status",
							children: [
								u.total,
								" ",
								o(u.total === 1 ? "Beitrag" : "Beiträge")
							]
						}),
						!u.items.length && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "collection-state",
							children: o(E ? "Keine passenden Beiträge gefunden." : Hn[e].empty)
						}),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: e === "gallery" ? "community-list gallery-albums" : e === "library" ? "community-list lib-list" + (Oe ? " lib-list-thumbs" : "") : "community-list",
							children: u.items.map((t) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [
								Oe && (() => {
									let e = t.files.find((e) => e.mime === "application/pdf");
									return e ? /* @__PURE__ */ (0, _.jsx)("button", {
										className: "lib-thumb",
										onClick: () => je(t, e),
										"aria-label": `${t.title} öffnen`,
										children: /* @__PURE__ */ (0, _.jsx)(An, { url: e.url })
									}) : /* @__PURE__ */ (0, _.jsx)("span", {
										className: "lib-thumb is-empty",
										"aria-hidden": "true",
										children: "PDF"
									});
								})(),
								e === "gallery" && t.files[0] && !E && /* @__PURE__ */ (0, _.jsx)("button", {
									className: "community-cover",
									onClick: () => U(t.id),
									"aria-label": `${t.title} öffnen`,
									children: /* @__PURE__ */ (0, _.jsx)(v, {
										unoptimized: !0,
										src: (t.files.find((e) => e.key === t.coverKey) || t.files[0]).url,
										alt: t.title,
										width: 600,
										height: 400
									})
								}),
								/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "community-card-body",
									children: [
										e !== "library" && /* @__PURE__ */ (0, _.jsxs)("p", {
											className: "eyebrow",
											children: [
												t.author,
												" · ",
												new Date((e === "gallery" ? Un(t.classification.date) : "") || t.createdAt).toLocaleDateString(r())
											]
										}),
										e === "forum" && Un(t.classification.area) && /* @__PURE__ */ (0, _.jsx)("p", {
											className: "community-area-tag",
											children: o(Un(t.classification.area))
										}),
										/* @__PURE__ */ (0, _.jsxs)("h2", { children: [t.pinned && /* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Angeheftet"), " · "] }), /* @__PURE__ */ (0, _.jsx)("button", {
											className: "card-title-button",
											onClick: () => {
												let n = e === "library" ? t.files.find((e) => e.mime === "application/pdf") : void 0;
												n ? je(t, n) : U(t.id);
											},
											children: t.title
										})] }),
										t.status !== "publish" && /* @__PURE__ */ (0, _.jsx)("p", {
											className: "club-notice",
											children: o(t.status === "pending" ? "In Prüfung" : t.status === "draft" ? "Abgelehnt / Entwurf" : "Archiviert")
										}),
										t.canReview && t.status === "pending" && /* @__PURE__ */ (0, _.jsxs)("div", {
											className: "club-actions",
											children: [/* @__PURE__ */ (0, _.jsx)("button", {
												disabled: W,
												className: "market-primary",
												onClick: () => void Ne(t, "approve"),
												children: o("Freigeben")
											}), /* @__PURE__ */ (0, _.jsx)("button", {
												disabled: W,
												className: "club-secondary",
												onClick: () => void Ne(t, "reject"),
												children: o("Ablehnen")
											})]
										}),
										e !== "library" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("p", {
											className: "community-excerpt",
											children: [t.description.slice(0, 180), t.description.length > 180 ? " …" : ""]
										}), /* @__PURE__ */ (0, _.jsxs)("p", {
											className: "club-hint",
											children: [
												t.files.length,
												" ",
												o("Dateien"),
												e === "forum" ? ` · ${t.replyCount} ${o("Antworten")}` : ""
											]
										})] }),
										(e !== "library" || t.canEdit || E) && /* @__PURE__ */ (0, _.jsx)("div", {
											className: "club-actions",
											children: E ? /* @__PURE__ */ (0, _.jsx)("button", {
												className: "club-secondary",
												disabled: W,
												onClick: () => void Ne(t, "restore"),
												children: o("Wiederherstellen")
											}) : /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: t.canEdit && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												onClick: () => Fn(t) ? H(t) : B(t),
												children: o("Bearbeiten")
											}), e !== "gallery" && e !== "library" && /* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												onClick: () => ie(t),
												children: o("Ins Archiv verschieben")
											})] }) })
										})
									]
								})
							] }, t.id))
						}),
						/* @__PURE__ */ (0, _.jsx)(en, {
							page: O,
							pages: u.pages,
							change: A
						})
					] })
				] })
			]
		}),
		z !== void 0 && /* @__PURE__ */ (0, _.jsx)(qn, {
			kind: e,
			item: z,
			initialArea: y,
			groupTypes: e === "library" ? De : [],
			suggestedTitle: e === "library" && f === "magazine" ? ke() : "",
			initialDocumentType: m,
			accessClasses: u.accessClasses || ["open"],
			nonce: t,
			close: () => B(void 0),
			saved: (t) => {
				B(void 0), Me(e === "gallery" ? "Fotos hochgeladen. Die Galerie-Moderation prüft sie vor der Veröffentlichung." : t.status === "pending" ? "Beitrag zur Prüfung eingereicht." : "Beitrag gespeichert."), U(t.id);
			}
		}),
		se && /* @__PURE__ */ (0, _.jsx)(q, {
			title: se.title,
			close: () => ce(null),
			children: /* @__PURE__ */ (0, _.jsx)(ln, {
				url: se.file.url,
				title: se.title,
				download: se.download ? se.file.url : !1
			})
		}),
		ae && /* @__PURE__ */ (0, _.jsx)(q, {
			title: ae.name,
			close: () => oe(null),
			children: /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
				fallback: /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Leseansicht wird geladen …")
				}),
				children: /* @__PURE__ */ (0, _.jsx)(Rn, {
					url: ae.url,
					title: ae.name,
					initialFullscreen: !0,
					back: () => oe(null)
				})
			})
		}),
		V !== void 0 && /* @__PURE__ */ (0, _.jsx)(Ln, {
			item: V,
			nonce: t,
			close: () => H(void 0),
			saved: (e) => {
				H(void 0), Me("Porträt gespeichert und in der Mitgliedergalerie veröffentlicht."), U(e);
			},
			deleted: () => {
				H(void 0), U(null), Me("Porträt gelöscht.");
			}
		}),
		ne !== null && /* @__PURE__ */ (0, _.jsx)(Jn, {
			id: ne,
			nonce: t,
			close: () => U(null),
			updated: () => Me()
		}),
		re && /* @__PURE__ */ (0, _.jsx)(q, {
			title: "Beitrag archivieren",
			close: () => ie(null),
			busy: W,
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-dialog-body",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						"«",
						re.title,
						"» ins Archiv verschieben? Sie können den Beitrag dort wiederherstellen."
					] }),
					P && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "alert",
						children: P
					}),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: W,
							onClick: () => ie(null),
							children: o("Abbrechen")
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: W,
							onClick: () => void Ne(re, "trash"),
							children: o("Ins Archiv verschieben")
						})]
					})
				]
			})
		})
	] });
}
function qn({ kind: e, item: t, nonce: n, close: r, saved: i, accessClasses: a, initialDocumentType: s, groupTypes: c = [], suggestedTitle: l = "", initialArea: u = "" }) {
	let d = F(), f = (0, h.useRef)(crypto.randomUUID()), p = (0, h.useRef)(/* @__PURE__ */ new WeakMap()), [m, g] = (0, h.useState)(t ? k(Un(t.classification?.documentType)) : s), [v, b] = (0, h.useState)((e === "gallery" ? t?.description : t?.descriptionHtml || t?.description) || ""), x = e === "library" && !t && m === "magazine", S = e === "library" && !t && [
		"magazine",
		"newsletter",
		"statutes",
		"club",
		"agm",
		"board",
		"confidential",
		"operations"
	].includes(m), [T, E] = (0, h.useState)([]), [D, A] = (0, h.useState)(""), [j, ee] = (0, h.useState)("add"), [N, P] = (0, h.useState)([]), [I, R] = (0, h.useState)(""), [te, z] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		if (e !== "gallery" || t) return;
		let n = new AbortController();
		return C(zn, {
			operation: "gallery-events",
			recent: "1"
		}, n.signal).then(P).catch(() => {}), fetch(`${y}/wp-admin/admin-ajax.php?action=strc_session`, {
			credentials: "include",
			signal: n.signal
		}).then(async (e) => await e.json()).then((e) => z(e.displayName || "")).catch(() => {}), () => n.abort();
	}, [e, t]);
	let [B, V] = (0, h.useState)({}), [H, ne] = (0, h.useState)(""), [U, re] = (0, h.useState)([]), [ie, W] = (0, h.useState)(""), [G, ae] = (0, h.useState)(!1), [oe, se] = (0, h.useState)(!1), ce = (0, h.useRef)(!1);
	(0, h.useEffect)(() => {
		if (e !== "gallery" || t) return;
		let n = new AbortController();
		return C(zn, { operation: "albums" }, n.signal).then(E).catch((e) => {
			n.signal.aborted || W(e.message);
		}), () => n.abort();
	}, [e, t]);
	function le(t) {
		if (W(""), x) {
			let e = t[0];
			if (!e) return;
			if (e.type !== "application/pdf" || e.size > 25 * 1024 * 1024) {
				W("Bitte ein PDF-Dokument bis 25 MB auswählen.");
				return;
			}
			re([e]);
			return;
		}
		let n = e === "gallery" ? 20 : 6;
		if (e === "gallery" && t.some((e) => e.size < 2e6 || e.size > 10 * 1024 * 1024)) {
			W("Galeriebilder: je 2 bis 10 MB. Bitte das Originalfoto der Kamera oder des Smartphones verwenden (nicht aus WhatsApp).");
			return;
		}
		if (U.length + t.length > n) {
			W(`Bitte höchstens ${n} ${e === "gallery" ? "Galeriebilder" : "Dateien"} auswählen.`);
			return;
		}
		let r = [
			"image/jpeg",
			"image/png",
			"image/webp",
			...e === "gallery" ? [] : ["application/pdf"]
		];
		if (t.some((t) => !r.includes(t.type) || t.size < (e === "gallery" ? 2e6 : 1) || t.size > (e === "gallery" ? 10 : e === "library" && t.type === "application/pdf" ? 100 : 20) * 1024 * 1024)) {
			W(e === "gallery" ? "Galeriebilder: je 2 bis 10 MB. Bitte das Originalfoto der Kamera oder des Smartphones verwenden (nicht aus WhatsApp)." : "Bilder: maximal 20 MB. Bibliotheks-PDFs: maximal 100 MB; sonst 20 MB.");
			return;
		}
		if (e !== "gallery" && [...U, ...t].reduce((e, t) => e + t.size, 0) > 120 * 1024 * 1024) {
			W("Alle Dateien zusammen dürfen höchstens 120 MB gross sein.");
			return;
		}
		re((e) => [...e, ...t]);
	}
	async function ue(r) {
		if (!ce.current) {
			if (!t && e !== "forum" && !U.length) {
				W("Bitte mindestens eine Datei auswählen.");
				return;
			}
			ce.current = !0, ae(!0), W("");
			try {
				let a = new FormData(r);
				if (x) {
					let e = String(a.get("title") || "").match(/(\d{4})\D+(\d+)\s*$/);
					a.set("documentType", "magazine"), a.set("year", e?.[1] || String((/* @__PURE__ */ new Date()).getFullYear())), a.set("issue", e?.[2] || "1"), a.set("language", "de");
				}
				if ((S || e === "gallery") && a.set("rights", "1"), a.set("operation", D ? "append" : t ? "edit" : "create"), a.set("kind", e), a.set("requestId", f.current), a.set("description", v), t && a.set("id", String(t.id)), D && a.set("id", D), e === "library") {
					let e = a.getAll("models[]").filter((e) => typeof e == "string");
					a.delete("models[]"), a.set("models", JSON.stringify(e));
				}
				if (e === "gallery" && U.length) {
					let e = null, r = D || String(t?.id || ""), o = [];
					for (let t of U) {
						let i = new FormData();
						for (let [e, t] of a.entries()) i.append(e, t);
						i.set("operation", r ? "append" : "create"), r && i.set("id", r), i.append("files[]", t), p.current.has(t) || p.current.set(t, crypto.randomUUID()), i.set("fileToken", p.current.get(t)), ne(`${U.indexOf(t) + 1} / ${U.length} · ${t.name}`), i.set("caption", B[t.name + "-" + t.size] || "");
						try {
							e = await w(zn, n, i), r = String(e.id), A(r);
						} catch (e) {
							o.push(t.name + ": " + e.message);
						}
					}
					if (o.length) {
						re(U.filter((e) => o.some((t) => t.startsWith(e.name + ": ")))), W("Gespeicherte Bilder bleiben erhalten. Fehlgeschlagen: " + o.join(" · "));
						return;
					}
					e && i(e);
				} else U.forEach((e) => a.append("files[]", e)), i(await w(zn, n, a));
			} catch (e) {
				W(e.message);
			} finally {
				ce.current = !1, ae(!1);
			}
		}
	}
	return e === "library" && !m ? /* @__PURE__ */ (0, _.jsx)(q, {
		title: o("Dokumentart auswählen"),
		close: r,
		children: /* @__PURE__ */ (0, _.jsx)("div", {
			className: "library-type-grid",
			children: d.libraryTypes.filter((e) => a.includes(e.access) && (!c.length || c.includes(e.key))).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
				className: "editorial-card",
				onClick: () => g(e.key),
				children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [O[e.access], " · PDF bis 100 MB"] })]
			}, e.key))
		})
	}) : /* @__PURE__ */ (0, _.jsx)(q, {
		title: t ? e === "gallery" ? "Album bearbeiten" : "Beitrag bearbeiten" : e === "library" ? (d.libraryTypes.find((e) => e.key === m)?.label || "Dokument") + " hochladen" : o(Hn[e].create),
		close: r,
		busy: G,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: (e) => {
				e.preventDefault(), ue(e.currentTarget);
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: G,
					children: [
						e === "gallery" && !t && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "gallery-mode",
							role: "radiogroup",
							"aria-label": o("Album"),
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "radio",
								name: "galleryMode",
								checked: j === "add",
								onChange: () => ee("add")
							}), o("Bilder zu einer Veranstaltung hinzufügen")] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "radio",
								name: "galleryMode",
								checked: j === "new",
								onChange: () => {
									ee("new"), A(""), R("");
								}
							}), o("Neues Album anlegen")] })]
						}),
						e === "gallery" && !t && j === "add" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Veranstaltung *"),
							/* @__PURE__ */ (0, _.jsxs)("select", {
								required: !0,
								value: I,
								onChange: (e) => {
									let t = e.target.value;
									R(t);
									let n = T.find((e) => String(e.eventId || "") === t);
									A(n ? String(n.id) : "");
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), N.map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
									value: e.id,
									children: [e.title, e.date ? " · " + new Date(e.date).toLocaleDateString("de-CH") : ""]
								}, e.id))]
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: o(D ? "Die Bilder werden dem bestehenden Album dieser Veranstaltung hinzugefügt." : "Für diese Veranstaltung wird ein Album angelegt.") })
						] }),
						e === "gallery" && !t && j === "add" && I && !D && (() => {
							let e = N.find((e) => String(e.id) === I);
							return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "hidden",
									name: "title",
									value: e?.title || ""
								}),
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "hidden",
									name: "eventId",
									value: I
								}),
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "hidden",
									name: "galleryCategory",
									value: "events"
								}),
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "hidden",
									name: "date",
									value: e?.date || ""
								})
							] });
						})(),
						(e !== "gallery" || t || j === "new") && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Titel"),
							/* @__PURE__ */ (0, _.jsx)("input", {
								name: "title",
								required: !0,
								maxLength: 160,
								defaultValue: t?.title || (x ? l : "")
							}),
							x && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Format: TR-Magazine . Jahr . Ausgabe Nummer") })
						] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bereich"), /* @__PURE__ */ (0, _.jsx)("select", {
							name: "area",
							defaultValue: Un(t?.classification?.area) || u || "Technik",
							children: d.areas.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(vn(e))
							}, e))
						})] }), /* @__PURE__ */ (0, _.jsxs)("details", {
							className: "market-more",
							open: !!(Un(t?.classification?.model) || Un(t?.classification?.component)) || void 0,
							children: [
								/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Zuordnung (optional): Fahrzeugmodell, Technikbereich") }),
								/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "club-form-row",
									children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeugmodell"), /* @__PURE__ */ (0, _.jsxs)("select", {
										name: "model",
										defaultValue: Un(t?.classification?.model),
										children: [/* @__PURE__ */ (0, _.jsx)("option", {
											value: "",
											children: o("Alle Modelle / keine Zuordnung")
										}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
											value: e,
											children: o(e)
										}, e))]
									})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Technikbereich"), /* @__PURE__ */ (0, _.jsxs)("select", {
										name: "component",
										defaultValue: Un(t?.classification?.component),
										children: [/* @__PURE__ */ (0, _.jsx)("option", {
											value: "",
											children: o("Bitte wählen")
										}), d.components.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
											value: e,
											children: o(e)
										}, e))]
									})] })]
								}),
								/* @__PURE__ */ (0, _.jsx)("small", { children: o("Hilft Fachexperten und Abonnenten, Ihren Beitrag zu finden.") })
							]
						})] }),
						e === "library" && d.libraryTypes.find((e) => e.key === m)?.fields.includes("model") && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Fahrzeugmodelle (optional)"),
							/* @__PURE__ */ (0, _.jsx)("select", {
								name: "models[]",
								multiple: !0,
								size: 5,
								defaultValue: t && Array.isArray(t.classification.models) ? t.classification.models : Un(t?.classification?.model) ? [Un(t?.classification?.model)] : [],
								children: L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: e
								}, e))
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: o("Mehrere Modelle mit ⌘-Klick oder Strg-Klick auswählen.") })
						] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Für Reiseberichte und lange Mitgliederbeiträge eignet sich der Bereich «Events & Reisen». PDF-Dateien können Sie zusammen mit dem Beitrag hochladen."
						}),
						e === "gallery" && (t || j === "new") && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kategorie"), /* @__PURE__ */ (0, _.jsx)("select", {
								name: "galleryCategory",
								defaultValue: Un(t?.classification?.galleryCategory) || "events",
								children: Object.entries(Bn).filter(([e]) => e !== "portraits").map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(t)
								}, e))
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Veranstaltungsdatum"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "date",
								type: "date",
								defaultValue: Un(t?.classification?.date)
							})] })]
						}),
						t && e === "gallery" && Un(t.classification?.eventId) && /* @__PURE__ */ (0, _.jsx)("input", {
							type: "hidden",
							name: "eventId",
							value: Un(t.classification.eventId)
						}),
						e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "gallery-photographer",
							children: [
								o("Fotograf/in"),
								": ",
								/* @__PURE__ */ (0, _.jsx)("strong", { children: te || Un(t?.classification?.photographer) || o("Ihr Name") }),
								" ",
								/* @__PURE__ */ (0, _.jsxs)("small", { children: [
									"(",
									o("wird automatisch eingetragen"),
									")"
								] })
							]
						}),
						e === "library" && !x && /* @__PURE__ */ (0, _.jsx)(M, {
							type: m,
							initial: t?.classification || {},
							accessClasses: a,
							definitions: d.libraryTypes
						}, m),
						x ? null : e === "gallery" ? !D && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kurze Anekdote (optional, max. 60 Zeichen – erscheint in der Übersicht)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							value: v,
							maxLength: 60,
							rows: 2,
							onChange: (e) => b(e.target.value),
							disabled: G
						})] }) : /* @__PURE__ */ (0, _.jsx)(Re, {
							label: e === "forum" ? "Beitrag" : "Beschreibung",
							value: v,
							onChange: b,
							disabled: G
						}),
						!t && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `market-dropzone ${oe ? "is-dragging" : ""}`,
							onDragOver: (e) => {
								e.preventDefault(), G || se(!0);
							},
							onDragLeave: () => se(!1),
							onDrop: (e) => {
								e.preventDefault(), se(!1), G || le(Array.from(e.dataTransfer.files));
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("strong", { children: o(x ? "PDF hier hineinziehen" : e === "gallery" ? "Fotos hier hineinziehen" : "Dateien hier hineinziehen") }),
								e === "gallery" && /* @__PURE__ */ (0, _.jsx)("span", {
									className: "gallery-hint",
									children: o("Bitte das Originalfoto der Kamera oder des Smartphones hochladen – Fotos aus WhatsApp sind meist zu klein für das TR-Magazin.")
								}),
								/* @__PURE__ */ (0, _.jsx)("span", { children: o("oder vom Gerät auswählen") }),
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "file",
									multiple: !x,
									accept: x ? "application/pdf" : e === "gallery" ? "image/jpeg,image/png,image/webp" : "image/jpeg,image/png,image/webp,application/pdf",
									"aria-label": o("Dateien auswählen"),
									onChange: (e) => {
										le(Array.from(e.target.files || [])), e.target.value = "";
									}
								}),
								/* @__PURE__ */ (0, _.jsx)("small", { children: x ? o("Ein PDF-Dokument · bis 25 MB") : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
									o(e === "gallery" ? "Bis zu 20 Bilder · je 2 bis 10 MB" : "Bis zu 6 Dateien · Bilder bis 20 MB"),
									e === "library" ? " · PDFs bis 100 MB" : "",
									e === "gallery" ? "" : " · insgesamt 120 MB",
									" · JPG, PNG, WebP",
									e === "gallery" || e === "forum" ? "" : " oder PDF",
									e === "forum" ? " oder PDF · optional" : ""
								] }) })
							]
						}), /* @__PURE__ */ (0, _.jsx)("ul", {
							className: "upload-list",
							children: U.map((t, n) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
								/* @__PURE__ */ (0, _.jsxs)("span", { children: [
									t.name,
									" · ",
									(t.size / 1024 / 1024).toFixed(1),
									" MB"
								] }),
								e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bildbeschriftung"), /* @__PURE__ */ (0, _.jsx)("input", {
									maxLength: 240,
									value: B[t.name + "-" + t.size] || "",
									onChange: (e) => V((n) => ({
										...n,
										[t.name + "-" + t.size]: e.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									"aria-label": `${t.name} entfernen`,
									onClick: () => re((e) => e.filter((e, t) => t !== n)),
									children: o("Entfernen")
								})
							] }, `${n}-${t.name}`))
						})] }),
						!t && e === "gallery" && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "gallery-disclaimer",
							children: o("Mit dem Hochladen bestätigen Sie, dass die Fotos auf der Website und in Publikationen des Swiss TR-Club verwendet werden dürfen. Im Zweifel einfach hochladen – die Galerie-Moderation prüft jedes Bild vor der Veröffentlichung.")
						}),
						!t && !S && e !== "gallery" && (e !== "forum" || U.length > 0) && /* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								name: "rights",
								value: "1",
								required: !0
							}), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Ich darf dieses Material mit dem Club teilen und habe notwendige Rechte und Einwilligungen. *") })]
						}),
						t && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: o("Angehängte Dateien bleiben erhalten. Zusätzliches Material können Sie als neuen Beitrag hochladen.")
						})
					]
				}),
				G && H && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: H
				}),
				!S && /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "club-hint",
					children: [
						o(e === "library" ? "Sichtbarkeit gemäss gewählter Zugriffsklasse." : "Sichtbar für Clubmitglieder."),
						" ",
						o("Laden Sie nur Material hoch, das Sie teilen dürfen.")
					]
				}),
				ie && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state error",
					role: "alert",
					children: ie
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: G,
						onClick: r,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: G,
						children: o(G ? "Wird gespeichert …" : t ? "Änderungen speichern" : e === "forum" ? "Zur Prüfung einreichen" : "Hochladen")
					})]
				})
			]
		})
	});
}
function Jn({ id: e, nonce: t, close: n, updated: i }) {
	let a = F();
	function s(e, t) {
		let n = Un(t);
		return e === "documentType" ? o(a.libraryTypes.find((e) => e.key === n)?.label || n) : e === "language" ? o({
			de: "Deutsch",
			fr: "Français",
			en: "English",
			multi: "Mehrsprachig",
			other: "Nicht angegeben"
		}[n] || n) : e === "galleryCategory" ? o(Bn[n] || n) : n;
	}
	let [c, l] = (0, h.useState)(null), [u, d] = (0, h.useState)(1), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(!0), [x, S] = (0, h.useState)(""), [E, D] = (0, h.useState)(!1), [O, k] = (0, h.useState)(0), [A, j] = (0, h.useState)(null), [M, ee] = (0, h.useState)(!1), [N, P] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let t = new AbortController();
		return C(zn, {
			operation: "detail",
			id: String(e),
			page: String(u)
		}, t.signal).then((e) => {
			l(e), b(!1);
		}).catch((e) => {
			t.signal.aborted || (g(e.message), b(!1));
		}), () => t.abort();
	}, [
		e,
		u,
		f
	]);
	async function I() {
		D(!0), g("");
		try {
			await w(zn, t, T({
				operation: "reply",
				id: String(e),
				text: x
			})), S(""), d(Math.ceil(((c?.replyCount || 0) + 1) / 20)), p((e) => e + 1), i();
		} catch (e) {
			g(e.message);
		} finally {
			D(!1);
		}
	}
	let L = c?.files.filter((e) => e.mime.startsWith("image/")) || [], R = Object.entries(c?.classification || {}).filter(([e, t]) => e !== "access" && e !== "eventId" && (Array.isArray(t) ? t.length > 0 : typeof t == "string" && t.trim() !== "")).map(([e, t]) => ({
		key: e,
		label: o(Vn[e] || e),
		value: s(e, t)
	})), te = A && A.key === L[O]?.key ? A.value : L[O]?.caption || "", [z, B] = (0, h.useState)(!1), [V, H] = (0, h.useState)(!1), [ne, U] = (0, h.useState)([]), [re, ie] = (0, h.useState)(null), [W, G] = (0, h.useState)(null);
	async function ae(n, r) {
		D(!0);
		try {
			return await w(zn, t, T({
				operation: n,
				id: String(e),
				...r
			})), G(null), p((e) => e + 1), i(), !0;
		} catch (e) {
			return g(e.message), !1;
		} finally {
			D(!1);
		}
	}
	async function oe() {
		let e = L[O];
		if (!(!c || !e)) {
			ee(!0), g("");
			try {
				await w(zn, t, T({
					operation: "captions",
					id: String(c.id),
					key: e.key,
					caption: te
				})), j(null), p((e) => e + 1), i();
			} catch (e) {
				g(e.message);
			} finally {
				ee(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsx)(q, {
		title: c?.title || "Beitrag",
		close: n,
		busy: E,
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-dialog-body",
			children: [y ? /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Beitrag wird geladen …")
			}) : /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: c && Fn(c) ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(In, {
				item: c,
				edit: () => H(!0)
			}), V && /* @__PURE__ */ (0, _.jsx)(Ln, {
				item: c,
				nonce: t,
				close: () => H(!1),
				saved: () => {
					H(!1), p((e) => e + 1), i();
				},
				deleted: () => {
					i(), n();
				}
			})] }) : c && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "eyebrow",
					children: [
						c.author,
						" · ",
						new Date(c.createdAt).toLocaleDateString(r())
					]
				}),
				R.length > 4 ? /* @__PURE__ */ (0, _.jsxs)("details", {
					className: "community-classification",
					children: [/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
						o("Beitragsdetails"),
						" (",
						R.length,
						")"
					] }), /* @__PURE__ */ (0, _.jsx)("dl", { children: R.map((e) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: e.label }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.value })] }, e.key)) })]
				}) : R.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: R.map((e) => `${e.label}: ${e.value}`).join(" · ")
				}),
				c.kind === "gallery" && Un(c.classification.eventId) && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#veranstaltung/" + Un(c.classification.eventId),
					children: o("Zugehörige Veranstaltung")
				}) }),
				c.canReview && c.kind === "gallery" && /* @__PURE__ */ (0, _.jsx)(Xn, {
					item: c,
					busy: E,
					act: ae
				}),
				" ",
				c.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(de, { html: c.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "community-description",
					children: c.description
				}),
				L.length > 0 && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "community-gallery",
					children: [
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "community-gallery-main" + (N ? " is-zoomed" : ""),
							onClick: () => P((e) => !e),
							"aria-label": N ? "Bild verkleinern" : "Bild vergrössern",
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: L[O]?.url || L[0].url,
								alt: L[O]?.caption || L[O]?.name || L[0].name,
								width: 1e3,
								height: 700
							})
						}),
						L.length > 1 && /* @__PURE__ */ (0, _.jsx)("div", {
							className: "community-thumbnails",
							children: L.map((e, t) => /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: t === O ? "is-selected" : "",
								onClick: () => k(t),
								"aria-label": "Bild " + (t + 1) + " anzeigen",
								children: /* @__PURE__ */ (0, _.jsx)(v, {
									unoptimized: !0,
									src: e.url,
									alt: "",
									width: 220,
									height: 150
								})
							}, e.key))
						}),
						/* @__PURE__ */ (0, _.jsx)("a", {
							className: "club-secondary",
							href: L[O]?.url || L[0].url,
							download: L[O]?.name || L[0].name,
							children: o("Bild herunterladen")
						}),
						c.kind === "gallery" && L.length > 1 && /* @__PURE__ */ (0, _.jsxs)("details", {
							className: "gallery-download",
							children: [
								/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Mehrere Bilder herunterladen") }),
								/* @__PURE__ */ (0, _.jsx)("div", {
									className: "gallery-download-grid",
									children: L.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "checkbox",
										checked: ne.includes(e.key),
										onChange: (t) => U((n) => t.target.checked ? [...n, e.key] : n.filter((t) => t !== e.key))
									}), /* @__PURE__ */ (0, _.jsx)(v, {
										unoptimized: !0,
										src: e.url,
										alt: "",
										width: 120,
										height: 90
									})] }, e.key))
								}),
								/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "club-actions",
									children: [/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "club-secondary",
										onClick: () => U(ne.length === L.length ? [] : L.map((e) => e.key)),
										children: o(ne.length === L.length ? "Auswahl aufheben" : "Alle auswählen")
									}), /* @__PURE__ */ (0, _.jsxs)("button", {
										type: "button",
										className: "market-primary",
										disabled: !ne.length,
										onClick: () => {
											L.filter((e) => ne.includes(e.key)).forEach((e, t) => setTimeout(() => {
												let t = document.createElement("a");
												t.href = e.url, t.download = e.name, document.body.appendChild(t), t.click(), t.remove();
											}, t * 500));
										},
										children: [
											o("Ausgewählte herunterladen"),
											" (",
											ne.length,
											")"
										]
									})]
								}),
								/* @__PURE__ */ (0, _.jsx)("p", {
									className: "club-hint",
									children: o("Downloads nur für den privaten Gebrauch. Weitere Veröffentlichung nur mit Erlaubnis.")
								})
							]
						}),
						L[O]?.originalUrl && c.kind === "gallery" && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-actions",
							children: [/* @__PURE__ */ (0, _.jsx)("a", {
								href: L[O]?.originalUrl,
								download: !0,
								children: o("Original herunterladen")
							}), ["public", "retainOriginal"].filter((e) => e !== "public" || c.canReview).map((n) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: !!L[O]?.[n],
								onChange: async (r) => {
									let i = L[O];
									try {
										await w(zn, t, T({
											operation: "image-policy",
											id: String(e),
											key: i.key,
											public: (n === "public" ? r.target.checked : i.public) ? "1" : "0",
											retainOriginal: (n === "retainOriginal" ? r.target.checked : i.retainOriginal) ? "1" : "0"
										})), p((e) => e + 1);
									} catch (e) {
										g(e.message);
									}
								}
							}), n === "public" ? "Für öffentliche Galerie auswählen" : "Original länger als zwölf Monate aufbewahren"] }, n))]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "community-caption",
							children: L[O]?.caption || L[O]?.name
						}),
						L[O]?.canCaption && c.kind === "gallery" && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "community-caption-editor",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bildbeschreibung"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								maxLength: 240,
								rows: 3,
								value: te,
								onChange: (e) => j({
									key: L[O].key,
									value: e.target.value
								}),
								disabled: M
							})] }), /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: M,
								onClick: () => void oe(),
								children: M ? "Wird gespeichert …" : "Bildbeschreibung speichern"
							})]
						}),
						L.length > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-actions",
							children: [
								/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									disabled: O === 0,
									onClick: () => k((e) => e - 1),
									children: o("Vorheriges Bild")
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", { children: [
									O + 1,
									" / ",
									L.length
								] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									disabled: O >= L.length - 1,
									onClick: () => k((e) => e + 1),
									children: o("Nächstes Bild")
								})
							]
						})
					]
				}),
				re && /* @__PURE__ */ (0, _.jsx)(Rn, {
					url: re.url,
					title: re.name,
					back: () => ie(null)
				}),
				/* @__PURE__ */ (0, _.jsx)("ul", {
					className: "community-files",
					children: c.files.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
						e.mime === "application/pdf" && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-text-button",
							onClick: () => ie(e),
							children: [
								e.name,
								" ",
								o("ansehen")
							]
						}),
						/* @__PURE__ */ (0, _.jsxs)("a", {
							href: e.url,
							download: e.name,
							children: [
								e.name,
								" ",
								o("herunterladen"),
								" ↓"
							]
						}),
						/* @__PURE__ */ (0, _.jsxs)("small", { children: [(e.size / 1024 / 1024).toFixed(1), " MB"] })
					] }, e.url))
				}),
				c.kind === "forum" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					c.mergedInto > 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: "#forum/" + c.mergedInto,
						children: o("Zum zusammengeführten Thema")
					}) }),
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-hint",
						children: "Angeheftete Themen stehen oben. Beim Zusammenführen wandern Antworten in das Zielthema; das ursprüngliche Thema bleibt mit Verweis bestehen."
					}),
					c.canReview && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: E,
						onClick: () => void ae("pin", { pinned: c.pinned ? "0" : "1" }),
						children: o(c.pinned ? "Anheftung entfernen" : "Thema anheften")
					}), /* @__PURE__ */ (0, _.jsx)(Yn, {
						id: e,
						merge: (e) => void ae("merge", { target: String(e) }),
						busy: E
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							disabled: E,
							className: "club-secondary",
							onClick: async () => {
								D(!0);
								try {
									await w(zn, t, T({
										operation: "subscribe",
										id: String(e),
										subscribe: c.subscribed ? "0" : "1"
									})), p((e) => e + 1);
								} catch (e) {
									g(e.message);
								} finally {
									D(!1);
								}
							},
							children: c.subscribed ? "Abonnement beenden" : "Thema abonnieren"
						}), c.canClose && /* @__PURE__ */ (0, _.jsx)("button", {
							disabled: E,
							className: "club-secondary",
							onClick: async () => {
								try {
									await w(zn, t, T({
										operation: "close",
										id: String(e),
										closed: c.closed ? "0" : "1"
									})), p((e) => e + 1);
								} catch (e) {
									g(e.message);
								}
							},
							children: c.closed ? "Thema öffnen" : "Thema schliessen"
						})]
					}),
					c.canEdit && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "forum-owner-actions",
						children: [/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: c.status === "trash",
								disabled: E,
								onChange: async (n) => {
									D(!0), g("");
									try {
										await w(zn, t, T({
											operation: n.target.checked ? "trash" : "restore",
											id: String(e)
										})), p((e) => e + 1), i();
									} catch (e) {
										g(e.message);
									} finally {
										D(!1);
									}
								}
							}), o("Thema archivieren (bleibt im Archiv lesbar)")]
						}), z ? /* @__PURE__ */ (0, _.jsxs)("span", {
							className: "forum-delete-confirm",
							children: [
								o("Thema mit allen Antworten endgültig löschen?"),
								" ",
								/* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-primary",
									disabled: E,
									onClick: async () => {
										D(!0), g("");
										try {
											await w(zn, t, T({
												operation: "delete",
												id: String(e)
											})), i(), n();
										} catch (e) {
											g(e.message), D(!1);
										}
									},
									children: o("Ja, löschen")
								}),
								" ",
								/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									disabled: E,
									onClick: () => B(!1),
									children: o("Abbrechen")
								})
							]
						}) : /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-text-button",
							disabled: E,
							onClick: () => B(!0),
							children: o("Thema löschen")
						})]
					}),
					c.closed ? /* @__PURE__ */ (0, _.jsx)("p", { children: o("Dieses Thema ist geschlossen.") }) : null,
					/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
						"Antworten (",
						c.replyCount,
						")"
					] }),
					!c.replies.length && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Noch keine Antworten. Schreib die erste.") }),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "forum-replies",
						children: c.replies.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [
							/* @__PURE__ */ (0, _.jsx)("strong", { children: e.author }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: e.text }),
							c.canReview && /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-actions",
								children: [/* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-text-button",
									onClick: () => G({
										id: e.id,
										text: e.text
									}),
									children: o("Bearbeiten")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-text-button",
									disabled: E,
									onClick: () => void ae("reply-hide", { reply: String(e.id) }),
									children: o("Antwort ausblenden")
								})]
							})
						] }, e.id))
					}),
					W && /* @__PURE__ */ (0, _.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault(), ae("reply-edit", {
								reply: String(W.id),
								text: W.text
							});
						},
						children: [
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Antwort bearbeiten"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								required: !0,
								maxLength: 5e3,
								value: W.text,
								onChange: (e) => G({
									...W,
									text: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: E,
								children: o("Speichern")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								onClick: () => G(null),
								children: o("Abbrechen")
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(en, {
						page: u,
						pages: c.replyPages,
						change: (e) => {
							b(!0), d(e);
						}
					}),
					!c.closed && /* @__PURE__ */ (0, _.jsxs)("form", {
						className: "club-reply-form",
						onSubmit: (e) => {
							e.preventDefault(), I();
						},
						children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mein Beitrag:"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							required: !0,
							maxLength: 5e3,
							rows: 4,
							value: x,
							disabled: E,
							onChange: (e) => S(e.target.value)
						})] }), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: E,
							children: E ? "Wird gesendet …" : "Absenden"
						})]
					})
				] })
			] }) }), m && /* @__PURE__ */ (0, _.jsxs)("p", {
				className: "collection-state error",
				role: "alert",
				children: [m, /* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-text-button",
					onClick: () => {
						g(""), b(!0), p((e) => e + 1);
					},
					children: o("Erneut versuchen")
				})]
			})]
		})
	});
}
function Yn({ id: e, merge: t, busy: n }) {
	let [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	return (0, h.useEffect)(() => {
		let t = new AbortController();
		return C(zn, {
			kind: "forum",
			search: r
		}, t.signal).then((t) => s(t.items.filter((t) => t.id !== e && t.status === "publish" && !t.mergedInto))).catch((e) => {
			t.signal.aborted || d(e.message);
		}), () => t.abort();
	}, [e, r]), /* @__PURE__ */ (0, _.jsxs)("details", { children: [
		/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Themen zusammenführen") }),
		/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zielthema suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
			type: "search",
			value: r,
			onChange: (e) => {
				i(e.target.value), l("");
			}
		})] }),
		/* @__PURE__ */ (0, _.jsxs)("select", {
			"aria-label": o("Zielthema"),
			value: c,
			onChange: (e) => l(e.target.value),
			children: [/* @__PURE__ */ (0, _.jsx)("option", {
				value: "",
				children: o("Bitte wählen")
			}), a.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
				value: e.id,
				children: e.title
			}, e.id))]
		}),
		/* @__PURE__ */ (0, _.jsx)("p", { children: o("Antworten werden übertragen. Das ursprüngliche Thema bleibt mit Verweis erhalten.") }),
		/* @__PURE__ */ (0, _.jsx)("button", {
			className: "club-secondary",
			disabled: n || !c,
			onClick: () => t(Number(c)),
			children: o("Zusammenführen")
		}),
		u && /* @__PURE__ */ (0, _.jsx)("p", {
			role: "alert",
			children: u
		})
	] });
}
function Xn({ item: e, busy: t, act: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(zn, { operation: "albums" }, e.signal).then(s).catch((t) => {
			e.signal.aborted || d(t.message);
		}), () => e.abort();
	}, []);
	async function f(e, t = {}) {
		await n(e, {
			keys: JSON.stringify(r),
			...t
		}) && i([]);
	}
	return /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Bilder prüfen und Album pflegen") }),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-actions",
				children: [/* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => i(e.files.map((e) => e.key)),
					children: o("Alle auswählen")
				}), /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => i([]),
					children: o("Auswahl aufheben")
				})]
			}),
			/* @__PURE__ */ (0, _.jsx)("div", {
				className: "community-thumbnails",
				children: e.files.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
					/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						checked: r.includes(e.key),
						onChange: (t) => i((n) => t.target.checked ? [...n, e.key] : n.filter((t) => t !== e.key))
					}),
					/* @__PURE__ */ (0, _.jsx)(v, {
						unoptimized: !0,
						src: e.url,
						alt: e.caption || e.name,
						width: 180,
						height: 120
					}),
					/* @__PURE__ */ (0, _.jsxs)("span", { children: [
						e.name,
						" · ",
						o({
							approved: "Freigegeben",
							pending: "In Prüfung",
							rejected: "Abgelehnt"
						}[e.reviewStatus] || e.reviewStatus)
					] })
				] }, e.key))
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-actions",
				children: [
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: t || !r.length,
						onClick: () => void f("photos-review", { state: "approved" }),
						children: o("Auswahl freigeben")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: t || !r.length,
						onClick: () => void f("photos-review", { state: "rejected" }),
						children: o("Auswahl ablehnen")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: t || r.length !== 1,
						onClick: () => void f("cover"),
						children: o("Als Titelbild wählen")
					})
				]
			}),
			/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bilder in Album verschieben"), /* @__PURE__ */ (0, _.jsxs)("select", {
				value: c,
				onChange: (e) => l(e.target.value),
				children: [/* @__PURE__ */ (0, _.jsx)("option", {
					value: "",
					children: o("Bitte wählen")
				}), a.filter((t) => t.id !== e.id).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
					value: e.id,
					children: e.title
				}, e.id))]
			})] }),
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: t || !r.length || !c,
				onClick: () => void f("photos-move", { target: c }),
				children: o("Auswahl verschieben")
			}),
			u && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: u
			})
		]
	});
}
//#endregion
//#region app/components/Breadcrumbs.tsx
var Zn = {
	history: "Club-Geschichte",
	news: "Neuigkeiten",
	applications: "Anträge",
	registration: "Anmeldung",
	profile: "Mitgliedschafts-Profil",
	triungsters: "TRiungsters",
	organisation: "Organisation",
	mission: "Leitbild",
	membership: "Mitglied werden",
	models: "TR-Modelle",
	shop: "TR-Shop",
	club: "Club",
	agenda: "Agenda",
	regions: "Regionen",
	market: "Marktplatz",
	members: "Mitgliederbereich",
	forum: "Forum",
	gallery: "Galerie",
	library: "Bibliothek",
	clubdocs: "Clubdokumente",
	directory: "Mitgliederverzeichnis",
	contact: "Kontakt",
	privacy: "Datenschutz",
	statutes: "Statuten",
	"event-admin": "Agenda verwalten",
	editorial: "Redaktion"
}, Qn = {
	regions: "regionen",
	models: "tr-modelle",
	editorial: "redaktion",
	market: "marktplatz",
	shop: "tr-shop"
}, $n = {
	fahrzeuge: "Fahrzeuge",
	ersatzteile: "Ersatzteile",
	meine: "Meine Inserate",
	pruefung: "In Prüfung"
}, er = {
	artikel: "Artikel erfassen",
	lager: "Lager",
	abrechnung: "Abrechnung"
}, tr = {
	zuerich: "Zürich",
	"suisse-romande": "Suisse romande"
}, nr = [
	"profile",
	"applications",
	"forum",
	"gallery",
	"library",
	"clubdocs",
	"directory",
	"editorial",
	"event-admin"
];
function rr({ page: e, subroute: t }) {
	let { text: n } = ue();
	if (e === "home") return null;
	let r = [
		"history",
		"organisation",
		"mission",
		"membership",
		"models"
	].includes(e) ? [["#club", "Club"]] : e === "triungsters" ? [["#regionen", "Regionen"]] : nr.includes(e) ? [["#mitglieder", "Mitgliederbereich"]] : e === "registration" ? [["#agenda", "Agenda"]] : e === "shop" ? [["#marktplatz", "Marktplatz"]] : [];
	e === "clubdocs" && r.push(["#bibliothek", "Bibliothek"]);
	let i = e === "regions" && t ? tr[t] || t.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ") : e === "models" && t ? n("model-" + t + ".title", t.toUpperCase()) : e === "editorial" && t ? t === "people" ? "Moderatorrollen" : n(t + ".title", "Seite bearbeiten") : e === "market" ? $n[t] || "" : e === "shop" && er[t] || "";
	return /* @__PURE__ */ (0, _.jsx)("nav", {
		className: "site-breadcrumbs",
		"aria-label": o("Seitenpfad"),
		children: /* @__PURE__ */ (0, _.jsxs)("ol", { children: [
			/* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: "#",
				children: o("Startseite")
			}) }),
			r.map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: e,
				children: o(t)
			}) }, e)),
			i ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: "#" + (Qn[e] || ""),
				children: o(Zn[e])
			}) }), /* @__PURE__ */ (0, _.jsx)("li", {
				"aria-current": "page",
				children: o(i)
			})] }) : /* @__PURE__ */ (0, _.jsx)("li", {
				"aria-current": "page",
				children: o(Zn[e] || "Swiss TR-Club")
			})
		] })
	});
}
//#endregion
//#region app/components/MemberForms.tsx
var ir = "strc_forms";
function ar() {
	let [e, t] = (0, h.useState)(""), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(!1), l = (0, h.useRef)(!1), u = (0, h.useRef)("");
	return (0, h.useEffect)(() => {
		C(ir, { operation: "config" }).then((e) => t(e.nonce)).catch(() => r("Kontaktformular konnte nicht geladen werden. Bitte die Seite neu laden."));
	}, []), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "contact-form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: "Kontakt aufnehmen" }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: "Felder mit * sind erforderlich." }),
			i ? /* @__PURE__ */ (0, _.jsx)(z, { message: i }) : /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "club-form",
				onSubmit: async (t) => {
					if (t.preventDefault(), l.current) return;
					let n = new FormData(t.currentTarget);
					n.set("operation", "contact"), u.current ||= crypto.randomUUID(), n.set("requestId", u.current), l.current = !0, c(!0), r("");
					try {
						a((await w(ir, e, n)).message);
					} catch (e) {
						r(e.message);
					} finally {
						c(!1), l.current = !1;
					}
				},
				children: [
					/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: s,
						children: [
							/* @__PURE__ */ (0, _.jsx)("legend", {
								className: "market-sr-only",
								children: "Kontaktanfrage"
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-form-row",
								children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Name *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "name",
									autoComplete: "name",
									maxLength: 160,
									required: !0
								})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "email",
									type: "email",
									autoComplete: "email",
									maxLength: 200,
									required: !0
								})] })]
							}),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Telefon (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "phone",
								type: "tel",
								autoComplete: "tel",
								maxLength: 40
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Worum geht es? *", /* @__PURE__ */ (0, _.jsx)("select", {
								name: "subject",
								children: [
									"Allgemeine Frage",
									"Mitgliedschaft",
									"Regionen",
									"Veranstaltungen",
									"Website"
								].map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Ihre Nachricht *", /* @__PURE__ */ (0, _.jsx)("textarea", {
								name: "message",
								required: !0,
								rows: 6,
								maxLength: 5e3
							})] }),
							/* @__PURE__ */ (0, _.jsx)(re, {})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(U, {}),
					/* @__PURE__ */ (0, _.jsx)(z, { error: n }),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: s || !e,
						children: s ? "Wird übermittelt …" : "Nachricht senden"
					})
				]
			})
		]
	});
}
var or = {
	female: "Weiblich",
	male: "Männlich",
	other: "Divers"
}, sr = {
	de: "Deutsch",
	fr: "Français"
}, cr = (e) => {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString("de-CH");
}, lr = [
	["salutation", "Anrede"],
	["first_name", "Vorname"],
	["last_name", "Name"],
	["gender", "Geschlecht"],
	["birth_date", "Geburtsdatum"],
	["language", "Korrespondenzsprache"],
	["email", "E-Mail"],
	["phone", "Mobilnummer"],
	["street", "Strasse und Nr."],
	["postcode", "PLZ"],
	["city", "Ort"],
	["country", "Land"]
];
function ur(e, t) {
	return t ? e === "gender" ? o(or[t] || t) : e === "language" ? o(sr[t] || t) : e === "salutation" ? o(t) : e === "birth_date" ? cr(t) : t : "–";
}
function dr({ block: e }) {
	return /* @__PURE__ */ (0, _.jsx)("dl", {
		className: "profile-data",
		children: lr.map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsxs)("dt", { children: [o(n), e.locked.includes(t) && /* @__PURE__ */ (0, _.jsx)("span", {
			className: "profile-lock",
			title: o("Wird vom Club in Fairgate geführt"),
			"aria-label": o("nicht veränderbar"),
			children: " 🔒"
		})] }), /* @__PURE__ */ (0, _.jsx)("dd", { children: ur(t, e.values[t]) })] }, t))
	});
}
function fr({ block: e, names: t, busy: n, submit: r, cancel: i, submitLabel: a }) {
	let s = e.values, c = (n) => !t || e.locked.includes(n), l = (e, t) => /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "profile-fixed",
		children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [o(t), " 🔒"] }), /* @__PURE__ */ (0, _.jsx)("strong", { children: ur(e, s[e]) })]
	});
	return /* @__PURE__ */ (0, _.jsxs)("form", {
		className: "club-form profile-form",
		onSubmit: (e) => {
			e.preventDefault(), r(new FormData(e.currentTarget));
		},
		children: [/* @__PURE__ */ (0, _.jsxs)("fieldset", {
			disabled: n,
			children: [
				/* @__PURE__ */ (0, _.jsx)("legend", {
					className: "market-sr-only",
					children: o("Angaben bearbeiten")
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-form-row",
					children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Anrede (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
						name: "salutation",
						defaultValue: s.salutation,
						children: [/* @__PURE__ */ (0, _.jsx)("option", {
							value: "",
							children: o("Bitte wählen")
						}), [
							"Frau",
							"Herr",
							"Ohne Anrede"
						].map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
							value: e,
							children: o(e)
						}, e))]
					})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Korrespondenzsprache"), /* @__PURE__ */ (0, _.jsxs)("select", {
						name: "language",
						defaultValue: s.language || "de",
						children: [/* @__PURE__ */ (0, _.jsx)("option", {
							value: "de",
							children: "Deutsch"
						}), /* @__PURE__ */ (0, _.jsx)("option", {
							value: "fr",
							children: "Français"
						})]
					})] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-form-row",
					children: [c("first_name") ? l("first_name", "Vorname") : /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Vorname *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "first_name",
						required: !0,
						maxLength: 160,
						defaultValue: s.first_name
					})] }), c("last_name") ? l("last_name", "Name") : /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Name *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "last_name",
						required: !0,
						maxLength: 160,
						defaultValue: s.last_name
					})] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-form-row",
					children: [c("gender") ? l("gender", "Geschlecht") : /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Geschlecht (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
						name: "gender",
						defaultValue: s.gender,
						children: [/* @__PURE__ */ (0, _.jsx)("option", {
							value: "",
							children: o("Keine Angabe")
						}), Object.entries(or).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
							value: e,
							children: o(t)
						}, e))]
					})] }), c("birth_date") ? l("birth_date", "Geburtsdatum") : /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Geburtsdatum (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
						type: "date",
						name: "birth_date",
						max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
						defaultValue: s.birth_date
					})] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-form-row",
					children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "email",
						type: "email",
						required: !0,
						maxLength: 200,
						defaultValue: s.email
					})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mobilnummer *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "phone",
						type: "tel",
						required: !0,
						minLength: 5,
						maxLength: 40,
						defaultValue: s.phone,
						placeholder: "+41 79 123 45 67"
					})] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Strasse und Hausnummer *"), /* @__PURE__ */ (0, _.jsx)("input", {
					name: "street",
					required: !0,
					maxLength: 200,
					defaultValue: s.street
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-form-row",
					children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Postleitzahl *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "postcode",
						required: !0,
						maxLength: 20,
						defaultValue: s.postcode
					})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Ort *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "city",
						required: !0,
						maxLength: 160,
						defaultValue: s.city
					})] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Land *"), /* @__PURE__ */ (0, _.jsx)("input", {
					name: "country",
					required: !0,
					maxLength: 100,
					defaultValue: s.country || "Schweiz"
				})] })
			]
		}), /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-actions",
			children: [/* @__PURE__ */ (0, _.jsx)("button", {
				type: "button",
				className: "club-secondary",
				disabled: n,
				onClick: i,
				children: o("Abbrechen")
			}), /* @__PURE__ */ (0, _.jsx)("button", {
				className: "market-primary",
				disabled: n,
				children: o(n ? "Wird gespeichert …" : a)
			})]
		})]
	});
}
function pr() {
	let { text: e } = ue(), [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(0), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(null), [m, g] = (0, h.useState)(null), y = (0, h.useRef)(""), b = (0, h.useRef)(!1), [x, S] = (0, h.useState)(""), [E, D] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(ir, { operation: "profile-read" }, e.signal).then(n).catch((t) => {
			e.signal.aborted || s(t.message);
		}), () => e.abort();
	}, [r]);
	async function O(e, n = ir, r = t?.nonce || "") {
		if (!(!t || b.current)) {
			b.current = !0, d(!0), s(""), l("");
			try {
				l((await w(n, r, e)).message), i((e) => e + 1), p(null), g(null), S(""), D(!1);
			} catch (e) {
				s(e.message);
			} finally {
				d(!1), b.current = !1;
			}
		}
	}
	let k = (e, t) => (e.set("operation", t), e), A = t?.subscriptions, j = A ? A.request ? {
		print: A.request.print,
		newsletter: A.request.newsletter
	} : {
		print: A.print,
		newsletter: A.newsletter
	} : null, M = t?.mode === "partner", ee = t?.mode === "single" ? "Mitglied" : "Hauptmitglied", N = t ? t.copilot.kind === "member" ? `${o("Mitglied")} · ${o("Paarmitgliedschaft")}${t.copilot.memberNumber ? " · Nr. " + t.copilot.memberNumber : ""}` : t.copilot.kind === "guest" ? o("Nicht-Mitglied") : o("Noch kein Co-Pilot erfasst") : "", P = !!t && t.copilot.kind === "guest" && [
		"first_name",
		"last_name",
		"email",
		"phone",
		"street",
		"postcode",
		"city",
		"country"
	].every((e) => t.copilot.values[e]);
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero",
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "eyebrow",
				children: o("Mein Mitgliederbereich")
			}),
			/* @__PURE__ */ (0, _.jsx)("h1", { children: e("profile.title") }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: e("profile.intro") })
		]
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content member-forms member-profile",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("a", {
				href: "#mitglieder",
				children: ["← ", o("Zurück zur Übersicht")]
			}),
			/* @__PURE__ */ (0, _.jsx)(z, {
				error: a,
				message: c
			}),
			a && /* @__PURE__ */ (0, _.jsx)("button", {
				className: "market-text-button",
				onClick: () => {
					s(""), i((e) => e + 1);
				},
				children: o("Neu laden")
			}),
			t ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("dl", {
					className: "profile-summary",
					children: [
						["Mitgliedsnummer", t.membership.number || "–"],
						["Mitgliedschaft", o(t.membership.typeLabel || "–")],
						["Region", t.membership.region || o("Noch nicht zugeordnet")],
						["Mitglied seit", t.membership.since || "–"]
					].map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(e) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: t })] }, e))
				}),
				M && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-notice",
					children: o("Die Profildaten eurer Paarmitgliedschaft werden vom Hauptmitglied gepflegt. Du kannst sie hier ansehen.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "profile-columns",
					children: [/* @__PURE__ */ (0, _.jsxs)("article", {
						className: "profile-card",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("header", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
								className: "eyebrow",
								children: o(ee)
							}), /* @__PURE__ */ (0, _.jsx)("h2", { children: [t.person.values.first_name, t.person.values.last_name].filter(Boolean).join(" ") || t.name })] }),
							!M && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: e("profile.memberHint")
							}),
							t.person.pending && /* @__PURE__ */ (0, _.jsxs)("p", {
								className: "profile-pending",
								children: [
									o("Änderung vom"),
									" ",
									cr(t.person.pending.at),
									" ",
									o("gemeldet – wird in Fairgate übernommen.")
								]
							}),
							x === "person" ? /* @__PURE__ */ (0, _.jsx)(fr, {
								block: t.person,
								names: !1,
								busy: u,
								cancel: () => S(""),
								submitLabel: "Angaben speichern",
								submit: (e) => void O(k(e, "profile"))
							}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(dr, { block: t.person }), t.canEdit && /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => {
									l(""), S("person");
								},
								children: o("Angaben bearbeiten")
							})] })
						]
					}), /* @__PURE__ */ (0, _.jsxs)("article", {
						className: "profile-card is-copilot",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("header", { children: [
								/* @__PURE__ */ (0, _.jsx)("p", {
									className: "eyebrow",
									children: o("Co-Pilot")
								}),
								/* @__PURE__ */ (0, _.jsx)("h2", { children: [t.copilot.values.first_name, t.copilot.values.last_name].filter(Boolean).join(" ") || o("Co-Pilot") }),
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "profile-status is-" + (t.copilot.kind || "none"),
									children: N
								})
							] }),
							!M && t.mode === "single" && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: e("profile.copilotHint")
							}),
							t.copilot.pending && /* @__PURE__ */ (0, _.jsxs)("p", {
								className: "profile-pending",
								children: [
									o("Änderung vom"),
									" ",
									cr(t.copilot.pending.at),
									" ",
									o("gemeldet – wird in Fairgate übernommen.")
								]
							}),
							x === "copilot" ? /* @__PURE__ */ (0, _.jsx)(fr, {
								block: t.copilot,
								names: t.copilot.kind !== "member",
								busy: u,
								cancel: () => S(""),
								submitLabel: t.copilot.kind === "none" ? "Co-Pilot erfassen" : "Angaben speichern",
								submit: (e) => void O(k(e, "copilot-save"))
							}) : t.copilot.kind === "none" ? t.canEdit && /* @__PURE__ */ (0, _.jsxs)("button", {
								className: "market-primary",
								onClick: () => {
									l(""), S("copilot");
								},
								children: ["＋ ", o("Co-Pilot erfassen")]
							}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(dr, { block: t.copilot }), t.canEdit && /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => {
									l(""), S("copilot");
								},
								children: o("Angaben bearbeiten")
							})] }),
							t.couple.state === "pending" && /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "profile-couple is-pending",
								children: [
									/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Paarmitgliedschaft beantragt") }),
									/* @__PURE__ */ (0, _.jsxs)("p", { children: [
										o("Beantragt am"),
										" ",
										cr(t.couple.at || ""),
										". ",
										o("Der Aktuar verbindet euch in Fairgate; danach ist die Paarmitgliedschaft hier aktiv.")
									] }),
									/* @__PURE__ */ (0, _.jsx)("span", {
										className: "profile-status is-pending",
										children: "pending"
									})
								]
							}),
							t.couple.state === "active" && t.mode === "primary" && /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "profile-couple is-active",
								children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Paarmitgliedschaft aktiv") }), /* @__PURE__ */ (0, _.jsx)("span", {
									className: "profile-status is-active",
									children: "active"
								})]
							}),
							t.couple.available && t.canEdit && !["pending", "active"].includes(t.couple.state) && t.copilot.kind === "guest" && /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "profile-couple",
								children: [
									t.couple.state === "rejected" && /* @__PURE__ */ (0, _.jsx)("p", {
										className: "club-hint",
										children: o("Ein früherer Antrag wurde nicht umgesetzt. Bei Fragen bitte an den Aktuar wenden.")
									}),
									/* @__PURE__ */ (0, _.jsxs)("label", {
										className: "application-consent",
										children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											checked: E,
											disabled: u || !P,
											onChange: (e) => D(e.target.checked)
										}), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Zur Paarmitgliedschaft wechseln") })]
									}),
									/* @__PURE__ */ (0, _.jsx)(de, { html: e("profile.coupleText") }),
									!P && /* @__PURE__ */ (0, _.jsx)("p", {
										className: "club-hint",
										children: o("Dafür bitte zuerst E-Mail, Mobilnummer und Adresse des Co-Piloten erfassen.")
									}),
									E && /* @__PURE__ */ (0, _.jsx)("button", {
										className: "market-primary",
										disabled: u,
										onClick: () => void O(T({ operation: "couple-request" })),
										children: o("Wechsel verbindlich beantragen")
									})
								]
							})
						]
					})]
				}),
				j && /* @__PURE__ */ (0, _.jsx)(B, {
					title: o("TR-Magazin & eNewsletter"),
					children: /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "db-subscriptions profile-subscriptions",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: j.print,
								disabled: u,
								onChange: (e) => void O(T({
									operation: "subscriptions",
									print: e.target.checked ? "1" : "0",
									newsletter: j.newsletter ? "1" : "0"
								}), "strc_dashboard", t.dashboardNonce)
							}), o("Printausgabe abonniert")] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: j.newsletter,
								disabled: u,
								onChange: (e) => void O(T({
									operation: "subscriptions",
									print: j.print ? "1" : "0",
									newsletter: e.target.checked ? "1" : "0"
								}), "strc_dashboard", t.dashboardNonce)
							}), o("eNewsletter abonniert")] }),
							/* @__PURE__ */ (0, _.jsx)("small", { children: A?.request ? o("Änderung gemeldet, wird von der Mitgliederverwaltung in Fairgate übernommen.") : e("profile.subscriptionsHint") })
						]
					})
				}),
				/* @__PURE__ */ (0, _.jsxs)(B, {
					title: o("Meine Triumphs"),
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: e("profile.vehiclesHint")
						}),
						t.legacyVehicle && /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "club-hint",
							children: [
								o("Bisherige Fahrzeugangabe"),
								": ",
								t.legacyVehicle
							]
						}),
						!t.vehicles.length && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Noch keine Fahrzeuge erfasst.") }),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "profile-vehicles",
							children: t.vehicles.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [
								e.photo && /* @__PURE__ */ (0, _.jsx)(v, {
									unoptimized: !0,
									src: e.photo,
									alt: e.model,
									width: 320,
									height: 210
								}),
								/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
									e.model,
									" ",
									e.details
								] }),
								/* @__PURE__ */ (0, _.jsx)("dl", {
									className: "profile-data is-compact",
									children: [
										["Baujahr", e.year],
										["Aussenfarbe", e.exteriorColour || e.colour],
										["Innenfarbe", e.interiorColour],
										["Chassisnummer", e.chassisNumber],
										["Kennzeichen", e.registration],
										["Fahrzeugstatus", e.status === "restoration" ? o("In Restauration") : o("Fahrbereit")],
										["Besonderheiten", e.notes]
									].filter(([, e]) => e).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(e) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: t })] }, e))
								}),
								t.canEditVehicles && /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "club-actions",
									children: [/* @__PURE__ */ (0, _.jsx)("button", {
										className: "club-secondary",
										onClick: () => {
											s(""), p(e);
										},
										children: o("Bearbeiten")
									}), /* @__PURE__ */ (0, _.jsx)("button", {
										className: "market-text-button",
										onClick: () => g(e),
										children: o("Entfernen")
									})]
								})
							] }, e.id))
						}),
						t.canEditVehicles && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-primary",
							onClick: () => {
								s(""), y.current = crypto.randomUUID(), p(te());
							},
							children: ["＋ ", o("Triumph hinzufügen")]
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("form", {
					className: "club-form",
					onSubmit: (e) => {
						e.preventDefault(), O(k(new FormData(e.currentTarget), "preferences"));
					},
					children: [/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: u,
						children: [
							/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Profilbild") }),
							t.photo && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: t.photo + `&v=${r}`,
								alt: o("Dein Profilbild"),
								width: 140,
								height: 140
							}), /* @__PURE__ */ (0, _.jsxs)("label", {
								className: "application-consent",
								children: [/* @__PURE__ */ (0, _.jsx)("input", {
									type: "checkbox",
									name: "removePhoto",
									value: "1"
								}), o("Profilbild entfernen")]
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Profilbild (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "photo[]",
								type: "file",
								accept: "image/jpeg,image/png,image/webp"
							})] }),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Ein JPG-, PNG- oder WebP-Bild, höchstens 20 MB.")
							}),
							/* @__PURE__ */ (0, _.jsx)("input", {
								type: "hidden",
								name: "directory",
								value: "0"
							}),
							/* @__PURE__ */ (0, _.jsxs)("label", {
								className: "application-consent",
								children: [/* @__PURE__ */ (0, _.jsx)("input", {
									name: "directory",
									type: "checkbox",
									value: "1",
									defaultChecked: t.preferences.directory
								}), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Mein Profil im Mitgliederverzeichnis anzeigen.") })]
							})
						]
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: u,
						children: o("Profilbild speichern")
					})]
				}),
				f && /* @__PURE__ */ (0, _.jsx)(q, {
					title: f.id ? "Triumph bearbeiten" : "Triumph hinzufügen",
					close: () => p(null),
					busy: u,
					children: /* @__PURE__ */ (0, _.jsxs)("form", {
						className: "club-form",
						onSubmit: (e) => {
							e.preventDefault();
							let t = new FormData(e.currentTarget);
							Object.entries(f).forEach(([e, n]) => {
								e !== "photo" && n !== void 0 && t.set(e, String(n));
							}), t.set("requestId", y.current), t.set("operation", "vehicle-save"), O(t);
						},
						children: [
							/* @__PURE__ */ (0, _.jsxs)("fieldset", {
								disabled: u,
								children: [
									/* @__PURE__ */ (0, _.jsx)("legend", {
										className: "market-sr-only",
										children: o("Fahrzeugangaben")
									}),
									/* @__PURE__ */ (0, _.jsx)(ne, {
										value: f,
										onChange: p,
										application: !0
									}),
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeugbild (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
										type: "file",
										name: "photo[]",
										accept: "image/jpeg,image/png,image/webp"
									})] }),
									/* @__PURE__ */ (0, _.jsx)("p", {
										className: "club-hint",
										children: o("Ein Bild, höchstens 20 MB. Nur eigenes oder freigegebenes Bildmaterial verwenden.")
									}),
									f.photo && /* @__PURE__ */ (0, _.jsxs)("label", {
										className: "application-consent",
										children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											name: "removePhoto",
											value: "1"
										}), o("Bisheriges Fahrzeugbild entfernen")]
									})
								]
							}),
							/* @__PURE__ */ (0, _.jsx)(z, { error: a }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-actions",
								children: [/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "club-secondary",
									disabled: u,
									onClick: () => p(null),
									children: o("Abbrechen")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-primary",
									disabled: u,
									children: o(u ? "Wird gespeichert …" : "Fahrzeug speichern")
								})]
							})
						]
					})
				}),
				m && /* @__PURE__ */ (0, _.jsx)(q, {
					title: o("Fahrzeug entfernen"),
					close: () => g(null),
					busy: u,
					children: /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-dialog-body",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [
								m.model,
								" ",
								o("aus der Fahrzeugliste entfernen? Bisherige Veranstaltungsanmeldungen bleiben erhalten.")
							] }),
							/* @__PURE__ */ (0, _.jsx)(z, { error: a }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-actions",
								children: [/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									disabled: u,
									onClick: () => g(null),
									children: o("Abbrechen")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-primary",
									disabled: u,
									onClick: () => void O(T({
										operation: "vehicle-remove",
										id: String(m.id),
										revision: m.revision || ""
									})),
									children: o("Fahrzeug entfernen")
								})]
							})
						]
					})
				})
			] }) : /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Profil wird geladen …")
			})
		]
	})] });
}
//#endregion
//#region app/components/ApplicationInbox.tsx
var mr = {
	pending_review: "Prüfung offen",
	clarification: "Rückfrage erforderlich",
	rejected: "Abgelehnt",
	approved_pending_sync: "Übernahme offen",
	awaiting_configuration: "Bestätigt – Anbindung ausstehend",
	queued: "Übernahme vorbereitet",
	syncing: "Fairgate wird aktualisiert",
	provisioning: "Mitgliedskonto wird eingerichtet",
	needs_reconciliation: "Abgleich in Fairgate erforderlich",
	sync_error: "Übernahme prüfen",
	mail_pending: "Willkommensmail wird vorbereitet",
	mail_error: "Mailversand fehlgeschlagen",
	mail_uncertain: "Mailversand prüfen",
	accepted: "Aufgenommen",
	accepted_no_mail: "Aufgenommen – keine Willkommensmail versandt"
}, hr = {
	single: "Einzelmitgliedschaft",
	couple: "Paarmitgliedschaft",
	young: "Young / TRiungsters"
}, gr = [
	"queued",
	"syncing",
	"provisioning",
	"mail_pending"
];
function _r({ person: e, title: t }) {
	return /* @__PURE__ */ (0, _.jsxs)("section", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: t }), /* @__PURE__ */ (0, _.jsxs)("p", { children: [
		/* @__PURE__ */ (0, _.jsxs)("strong", { children: [
			e.first_name,
			" ",
			e.last_name
		] }),
		/* @__PURE__ */ (0, _.jsx)("br", {}),
		e.email,
		/* @__PURE__ */ (0, _.jsx)("br", {}),
		e.phone || "Kein Telefon angegeben",
		/* @__PURE__ */ (0, _.jsx)("br", {}),
		e.street,
		/* @__PURE__ */ (0, _.jsx)("br", {}),
		e.postcode,
		" ",
		e.city,
		", ",
		e.country,
		e.gender && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
			/* @__PURE__ */ (0, _.jsx)("br", {}),
			o("Geschlecht"),
			": ",
			o({
				female: "Weiblich",
				male: "Männlich",
				other: "Divers"
			}[e.gender] || e.gender)
		] }),
		e.birth_date && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
			/* @__PURE__ */ (0, _.jsx)("br", {}),
			o("Geburtsdatum"),
			": ",
			e.birth_date
		] }),
		/* @__PURE__ */ (0, _.jsx)("br", {}),
		"Korrespondenz: ",
		e.language === "fr" ? "Français" : "Deutsch"
	] })] });
}
function vr({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(1), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_applications", { page: String(a) }, e.signal).then(n).catch((t) => {
			e.signal.aborted || d(t.message);
		}), () => e.abort();
	}, [a, c]), (0, h.useEffect)(() => {
		if (!r || !gr.includes(r.state)) return;
		let t = !0, n = setTimeout(() => {
			w("strc_applications", e, T({
				operation: "process",
				id: String(r.id)
			})).then((e) => {
				t && (i(e.application), l((e) => e + 1));
			}).catch((e) => {
				t && d(e.message);
			});
		}, 1800);
		return () => {
			t = !1, clearTimeout(n);
		};
	}, [r, e]);
	async function b(e) {
		p(!0), d("");
		try {
			let t = await C("strc_applications", {
				operation: "detail",
				id: String(e)
			});
			i(t.application), g(t.application.reviewNote || "");
		} catch (e) {
			d(e.message);
		} finally {
			p(!1);
		}
	}
	async function x(t, n = {}) {
		if (!(!r || f)) {
			p(!0), d("");
			try {
				i((await w("strc_applications", e, T({
					operation: t,
					id: String(r.id),
					revision: r.revision,
					note: m,
					...n
				}))).application), y(""), l((e) => e + 1);
			} catch (e) {
				y(""), d(e.message);
			} finally {
				p(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content application-inbox",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "home-section-heading",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: "Clubverwaltung"
				}), /* @__PURE__ */ (0, _.jsx)("h1", { children: "Mitgliedsanträge" })] }), /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#mitglieder",
					children: o("Zum Dashboard →")
				})]
			}),
			/* @__PURE__ */ (0, _.jsx)("p", { children: "Prüfe die Angaben und bestätige die Aufnahme. Nach bestätigter Mitgliedschaft in Fairgate werden die Website-Konten eingerichtet. Die Willkommensmail bleibt deaktiviert, bis sie ausdrücklich freigegeben wird." }),
			/* @__PURE__ */ (0, _.jsx)(z, { error: u }),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "inbox-layout",
				children: [/* @__PURE__ */ (0, _.jsxs)("aside", {
					"aria-label": "Eingegangene Anträge",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						onClick: () => {
							l((e) => e + 1), r && b(r.id);
						},
						disabled: f,
						children: o("Aktualisieren")
					}), t ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("ul", {
							className: "inbox-list",
							children: t.items.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
								className: r?.id === e.id ? "selected" : "",
								disabled: f,
								onClick: () => void b(e.id),
								"aria-current": r?.id === e.id ? "true" : void 0,
								children: [
									/* @__PURE__ */ (0, _.jsx)("strong", { children: e.name || `Antrag #${e.id}` }),
									/* @__PURE__ */ (0, _.jsx)("span", { children: hr[e.type] || e.type }),
									/* @__PURE__ */ (0, _.jsx)("small", { children: mr[e.state] || "Manueller Abgleich erforderlich" })
								]
							}) }, e.id))
						}),
						t.items.length === 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: "Noch keine Mitgliedsanträge eingegangen." }),
						t.pages > 1 && /* @__PURE__ */ (0, _.jsxs)("nav", {
							"aria-label": "Antragsseiten",
							children: [
								/* @__PURE__ */ (0, _.jsx)("button", {
									disabled: a <= 1 || f,
									onClick: () => s((e) => e - 1),
									children: o("Zurück")
								}),
								" ",
								a,
								" / ",
								t.pages,
								" ",
								/* @__PURE__ */ (0, _.jsx)("button", {
									disabled: a >= t.pages || f,
									onClick: () => s((e) => e + 1),
									children: o("Weiter")
								})
							]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
							href: t.otherInboxUrl,
							children: "Kontaktanfragen und Profiländerungen →"
						}) })
					] }) : /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: "Anträge werden geladen …"
					})]
				}), /* @__PURE__ */ (0, _.jsx)("article", {
					className: "inbox-detail",
					"aria-busy": f,
					children: r ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsxs)("p", {
							className: "eyebrow",
							children: [
								"Antrag #",
								r.id,
								" · ",
								r.date
							]
						}),
						/* @__PURE__ */ (0, _.jsxs)("h2", { children: [
							r.payload.person.first_name,
							" ",
							r.payload.person.last_name
						] }),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-notice",
							role: "status",
							children: mr[r.state] || "Manueller Abgleich erforderlich"
						}),
						r.error && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "form-error",
							role: "alert",
							children: r.error
						}),
						/* @__PURE__ */ (0, _.jsxs)("p", { children: [
							/* @__PURE__ */ (0, _.jsx)("strong", { children: hr[r.payload.membershipType] }),
							" · Region ",
							r.payload.region
						] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsx)(_r, {
								person: r.payload.person,
								title: "Antragsteller/in"
							}), r.payload.copilot && /* @__PURE__ */ (0, _.jsx)(_r, {
								person: r.payload.copilot,
								title: "Co-Pilot"
							})]
						}),
						/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Fahrzeuge") }),
						r.payload.vehicles.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: r.payload.vehicles.map((e, t) => /* @__PURE__ */ (0, _.jsx)("li", { children: [
							e.model,
							e.details,
							e.year,
							e.exteriorColour || e.colour,
							e.interiorColour,
							e.chassisNumber,
							e.registration,
							e.status === "restoration" ? "In Restauration" : "Fahrbereit",
							e.notes
						].filter(Boolean).join(" · ") }, t)) }) : /* @__PURE__ */ (0, _.jsx)("p", { children: "Keine Fahrzeuge angegeben." }),
						r.payload.notes && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Bemerkungen") }), /* @__PURE__ */ (0, _.jsx)("p", {
							className: "preserve-lines",
							children: r.payload.notes
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("p", { children: [
							"Statuten: ",
							r.payload.declarations.statutes ? "bestätigt" : "fehlt",
							" · Datenschutz: ",
							r.payload.declarations.privacy ? "bestätigt" : "fehlt",
							r.payload.copilot && ` · Zustimmung Co-Pilot: ${r.payload.declarations.copilot ? "bestätigt" : "fehlt"}`
						] }),
						Object.entries(r.contacts || {}).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("p", { children: [
							/* @__PURE__ */ (0, _.jsxs)("strong", { children: [e === "person" ? "Antragsteller/in" : "Co-Pilot", ":"] }),
							" Fairgate Contact ID ",
							t.contactId || "Abgleich erforderlich",
							" · Mitgliedsnummer ",
							t.official?.member_number || "ausstehend",
							t.mailState && ` · Mail: ${t.mailState === "sent" ? "vom Maildienst angenommen" : t.mailState === "failed" ? "fehlgeschlagen" : t.mailState === "sending" ? "Versand läuft / prüfen" : t.mailState === "disabled" ? "deaktiviert; keine Mail versandt" : "ausstehend"}`
						] }, e)),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form",
							children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Interne Prüfnotiz", /* @__PURE__ */ (0, _.jsx)("textarea", {
									value: m,
									onChange: (e) => g(e.target.value),
									rows: 3,
									maxLength: 2e3,
									disabled: f || gr.includes(r.state)
								})] }),
								[
									"pending_review",
									"clarification",
									"approved_pending_sync",
									"awaiting_configuration"
								].includes(r.state) && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
									!r.ready && /* @__PURE__ */ (0, _.jsx)("p", {
										className: "club-notice",
										children: "Die Fairgate-Schreibanbindung ist noch nicht freigegeben. Du kannst die Prüfung bestätigen; der Antrag bleibt bis zur Einrichtung offen. Es werden noch keine Mitgliedsnummer, Konten oder Willkommensmails erzeugt."
									}),
									/* @__PURE__ */ (0, _.jsxs)("div", {
										className: "club-form-actions",
										children: [
											/* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-primary",
												disabled: f,
												onClick: () => y("approve"),
												children: o("Bestätigen")
											}),
											/* @__PURE__ */ (0, _.jsx)("button", {
												className: "club-secondary",
												disabled: f,
												onClick: () => void x("clarification"),
												children: "Rückfrage vermerken"
											}),
											/* @__PURE__ */ (0, _.jsx)("button", {
												className: "club-secondary",
												disabled: f,
												onClick: () => y("rejected"),
												children: o("Ablehnen")
											})
										]
									}),
									/* @__PURE__ */ (0, _.jsx)("p", {
										className: "club-hint",
										children: "Rückfragen und Ablehnungen werden intern vermerkt. Bitte informiere die Person persönlich."
									})
								] }),
								["needs_reconciliation", "sync_error"].includes(r.state) && /* @__PURE__ */ (0, _.jsxs)("form", {
									onSubmit: (e) => {
										e.preventDefault();
										let t = new FormData(e.currentTarget);
										x("reconcile", {
											personId: String(t.get("personId") || ""),
											copilotId: String(t.get("copilotId") || "")
										});
									},
									children: [
										/* @__PURE__ */ (0, _.jsx)("h3", { children: "Mit Fairgate abgleichen" }),
										/* @__PURE__ */ (0, _.jsx)("p", { children: "Vorhandene Kontakte und gegebenenfalls die Paarverknüpfung in Fairgate prüfen. Der Abgleich liest die offiziellen Daten erneut; unterbrochene Schreibvorgänge werden nicht wiederholt." }),
										["person", ...r.payload.copilot ? ["copilot"] : []].map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
											e === "person" ? "Antragsteller/in" : "Co-Pilot",
											" – Fairgate Contact ID",
											/* @__PURE__ */ (0, _.jsx)("input", {
												name: `${e}Id`,
												pattern: "[1-9][0-9]*",
												required: !0,
												defaultValue: r.contacts?.[e]?.contactId || "",
												readOnly: !!r.contacts?.[e]?.contactId
											})
										] }, e)),
										/* @__PURE__ */ (0, _.jsx)("button", {
											className: "market-primary",
											disabled: f || !r.ready,
											children: "Daten erneut prüfen"
										})
									]
								}),
								["mail_error", "mail_uncertain"].includes(r.state) && /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-primary",
									disabled: f,
									onClick: () => y("retry_mail"),
									children: "Willkommensmail erneut senden"
								})
							]
						}),
						r.audit?.length ? /* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: "Bearbeitungsverlauf" }), /* @__PURE__ */ (0, _.jsx)("ol", { children: r.audit.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
							e.at,
							" · ",
							{
								approve: "Bestätigt",
								clarification: "Rückfrage",
								rejected: "Abgelehnt",
								reconcile: "Abgleich angefordert",
								retry_mail: "Mail erneut angefordert"
							}[e.action] || e.action,
							" · Verwaltung #",
							e.by
						] }, t)) })] }) : null
					] }) : /* @__PURE__ */ (0, _.jsx)("p", { children: "Wähle einen Antrag aus, um alle Angaben zu prüfen." })
				})]
			}),
			v && r && /* @__PURE__ */ (0, _.jsxs)(q, {
				title: v === "approve" ? "Mitgliedsantrag bestätigen" : v === "rejected" ? "Antrag ablehnen" : "Willkommensmail erneut senden",
				close: () => {
					f || y("");
				},
				busy: f,
				children: [/* @__PURE__ */ (0, _.jsx)("p", { children: v === "approve" ? r.ready ? `Die Daten werden an Fairgate übertragen. Nach bestätigter Mitgliedschaft und offizieller Mitgliedsnummer folgen Website-Konten. ${r.mailEnabled ? "Die Willkommensmail ist aktiviert." : "Die Willkommensmail bleibt deaktiviert."}` : "Die Prüfung wird bestätigt. Die Übernahme wartet auf die Einrichtung der Fairgate-Anbindung." : v === "rejected" ? "Der Antrag wird als abgelehnt vermerkt. Es entstehen keine neuen Konten oder Willkommensmails." : "Bitte zuerst das Mailprotokoll prüfen. Bei unklarem Versand kann die Person bereits eine Einladung erhalten haben. Ein neuer Versand ersetzt den bisherigen Passwortlink." }), /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-form-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: f,
						onClick: () => void x(v),
						children: f ? "Wird gespeichert …" : v === "approve" ? "Bestätigen" : v === "rejected" ? "Ablehnung speichern" : "Erneut senden"
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: f,
						onClick: () => y(""),
						children: o("Abbrechen")
					})]
				})]
			})
		]
	});
}
//#endregion
//#region app/components/HomepageOverview.tsx
function yr() {
	let { text: e, values: t } = ue(), n = (t.home?.photos ?? []).filter((e) => e.url).slice(0, 12), r = n.slice(0, 6), i = n.slice(6, 12), a = (e, t) => /* @__PURE__ */ (0, _.jsx)("div", {
		className: `home-reference-half is-${t}`,
		children: /* @__PURE__ */ (0, _.jsx)("div", {
			className: `home-reference-track${e.length > 1 ? " is-moving" : ""} ${t === "left" ? "to-right" : "to-left"}`,
			children: (e.length > 1 ? [0, 1] : [0]).map((t) => /* @__PURE__ */ (0, _.jsx)("div", {
				className: "home-reference-photo-set",
				"aria-hidden": t === 1,
				children: e.map((e, n) => /* @__PURE__ */ (0, _.jsx)("figure", { children: /* @__PURE__ */ (0, _.jsx)(v, {
					src: pe(e.url),
					alt: t === 0 ? e.alt : "",
					width: 640,
					height: 480,
					priority: t === 0 && n < 2,
					style: ge(e.frame, "cover")
				}) }, e.url + n))
			}, t))
		})
	}, t);
	return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "home-arrival",
		"aria-labelledby": "home-arrival-title",
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "home-width",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-reference-intro",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
						className: "eyebrow",
						children: e("home.eyebrow", "Willkommen beim Swiss TR-Club")
					}), /* @__PURE__ */ (0, _.jsx)("h1", {
						id: "home-arrival-title",
						children: e("home.title")
					})] }), /* @__PURE__ */ (0, _.jsx)(fe, {
						id: "home.intro",
						className: "home-reference-description"
					})]
				}),
				n.length > 0 && /* @__PURE__ */ (0, _.jsx)("div", {
					className: `home-reference-photos${i.length ? " is-split" : ""}`,
					role: "region",
					"aria-label": o("Einblicke ins Clubleben"),
					tabIndex: 0,
					children: i.length ? [a(r, "left"), a(i, "right")] : a(r, "left")
				}),
				/* @__PURE__ */ (0, _.jsx)(fe, {
					id: "home.mission",
					className: "home-reference-story"
				})
			]
		})
	});
}
//#endregion
//#region app/components/Magazine.tsx
var br = (0, h.lazy)(() => import("./MagazineReader-DnlZ1knC.js"));
function xr({ issue: e, loading: t, error: r, retry: i }) {
	let { text: a } = ue(), s = a("home.magazinePreviewPages", "1,3,4,12,13,18,19").split(/[^0-9]+/).map(Number).filter((e) => e > 0).slice(0, 12), { language: c } = n(), l = (e, t) => c === "fr" ? t : e, [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(0), [y, b] = (0, h.useState)(!1), x = (0, h.useRef)(null), S = (0, h.useRef)(!1), C = (e?.previewPages || []).slice(0, 6), w = Math.min(m, Math.max(0, C.length - 1)), T = e?.previewCaptions?.[w] || `${l("Vorschau", "Aperçu")} ${w + 1} · ${e?.title || ""}`;
	(0, h.useEffect)(() => {
		if (!e || S.current || new URLSearchParams(window.location.search).get("magazine") !== String(e.id)) return;
		S.current = !0;
		let t = requestAnimationFrame(() => {
			d(!0), p(!1);
		});
		return () => {
			cancelAnimationFrame(t), S.current = !1;
		};
	}, [e]);
	function E() {
		d(!1), b(!1), p(!1);
		let e = new URL(window.location.href);
		e.searchParams.delete("magazine"), window.history.replaceState(null, "", e), requestAnimationFrame(() => x.current?.focus({ preventScroll: !0 }));
	}
	let D = C[w] || e?.cover, O = C.length > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "magazine-spread-pager",
		children: [
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: w === 0,
				onClick: () => g(w - 1),
				"aria-label": l("Vorherige Vorschau", "Aperçu précédent"),
				children: "←"
			}),
			/* @__PURE__ */ (0, _.jsxs)("span", {
				"aria-live": "polite",
				children: [
					w + 1,
					" / ",
					C.length
				]
			}),
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: w === C.length - 1,
				onClick: () => g(w + 1),
				"aria-label": l("Nächste Vorschau", "Aperçu suivant"),
				children: "→"
			})
		]
	});
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "home-magazine",
		id: "home-magazine",
		"aria-label": l("Das TR-Magazin", "Le TR-Magazine"),
		children: [
			/* @__PURE__ */ (0, _.jsxs)("a", {
				className: `home-preview-card home-tile-magazine${D ? " has-cover" : ""}`,
				href: "#home-magazine",
				"aria-haspopup": "dialog",
				"aria-disabled": t,
				onClick: (e) => {
					if (e.preventDefault(), !t) {
						if (r) {
							i();
							return;
						}
						x.current = e.currentTarget, p(!1), d(!0);
					}
				},
				children: [D ? /* @__PURE__ */ (0, _.jsx)("div", {
					className: "home-tile-cover",
					children: /* @__PURE__ */ (0, _.jsx)(v, {
						unoptimized: !0,
						src: D,
						alt: T,
						width: 900,
						height: 650
					})
				}) : /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-magazine-mark",
					"aria-hidden": "true",
					children: ["TR", /* @__PURE__ */ (0, _.jsx)("span", { children: "MAGAZINE" })]
				}), /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-tile-magazine-caption",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: "TR Magazine"
						}),
						/* @__PURE__ */ (0, _.jsx)("h2", { children: e?.title || l("Das TR-Magazin", "Le TR-Magazine") }),
						/* @__PURE__ */ (0, _.jsx)("p", { children: r ? l("Die Ausgabe konnte nicht geladen werden. Hier erneut versuchen.", "L’édition n’a pas pu être chargée. Réessayer ici.") : t ? l("Magazin wird geladen …", "Chargement du magazine…") : C.length ? T : e?.teaser || l("Die aktuelle Ausgabe wird hier ergänzt.", "La dernière édition sera ajoutée ici.") })
					]
				})]
			}),
			C.length > 1 && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "magazine-home-pager",
				children: O
			}),
			u && /* @__PURE__ */ (0, _.jsx)(q, {
				title: e?.title || l("Das TR-Magazin", "Le TR-Magazine"),
				close: y ? () => b(!1) : E,
				children: !f && e?.canRead && e.fileUrl && s.length ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-magazine-flip",
					children: [
						/* @__PURE__ */ (0, _.jsx)(ln, {
							url: e.fileUrl,
							title: e.title,
							pages: s
						}),
						/* @__PURE__ */ (0, _.jsx)("p", { children: e.teaser }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-actions",
							children: [/* @__PURE__ */ (0, _.jsxs)("a", {
								className: "home-button",
								href: "#mitglieder",
								children: [l("Ganze Ausgabe im Mitgliederbereich", "Édition complète dans l’espace membres"), " →"]
							}), /* @__PURE__ */ (0, _.jsx)("button", {
								className: "home-text-link",
								onClick: E,
								children: o("Schliessen")
							})]
						})
					]
				}) : f && e?.canRead ? /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
					fallback: /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: l("Leseansicht wird geladen …", "Chargement du lecteur…")
					}),
					children: /* @__PURE__ */ (0, _.jsx)(br, {
						url: e.fileUrl,
						title: e.title,
						initialFullscreen: !0,
						back: () => p(!1)
					})
				}) : /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-magazine-preview",
					children: [
						D && /* @__PURE__ */ (0, _.jsx)("button", {
							className: `magazine-spread-stage${y ? " is-zoomed" : ""}`,
							onClick: () => b((e) => !e),
							"aria-label": l(y ? "Verkleinern" : "Vorschau vergrössern", y ? "Réduire" : "Agrandir l’aperçu"),
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								className: "magazine-spread-image",
								src: D,
								alt: T,
								width: 1800,
								height: 1300
							})
						}),
						D && /* @__PURE__ */ (0, _.jsx)("p", { children: T }),
						O,
						/* @__PURE__ */ (0, _.jsx)("p", { children: e?.teaser || l("Die aktuelle Ausgabe wird hier ergänzt.", "La dernière édition sera ajoutée ici.") }),
						e?.canRead ? /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "home-button",
							onClick: () => p(!0),
							children: [l("Magazin lesen", "Lire le magazine"), " →"]
						}) : e && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("p", { children: l("Die vollständige Ausgabe ist für Clubmitglieder.", "L’édition complète est réservée aux membres.") }), /* @__PURE__ */ (0, _.jsxs)("a", {
							className: "home-button",
							href: e.loginUrl,
							children: [l("Anmelden & lesen", "Se connecter et lire"), " →"]
						})] }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "home-text-link",
							onClick: E,
							children: o("Schliessen")
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region app/components/HomepageFeed.tsx
var Sr;
function Cr() {
	let e = new Intl.DateTimeFormat("en", {
		timeZone: "Europe/Zurich",
		year: "numeric",
		month: "numeric",
		day: "numeric"
	}).formatToParts(/* @__PURE__ */ new Date()), t = (t) => Number(e.find((e) => e.type === t)?.value), n = Math.floor(Date.UTC(t("year"), t("month") - 1, t("day")) / 864e5);
	if (Sr?.day === n) return Sr.cycle;
	let r = 0;
	try {
		let e = JSON.parse(sessionStorage.getItem("strc_home_cycle") || "null");
		e && Number.isSafeInteger(e.cycle) && e.cycle >= 0 && Number.isSafeInteger(e.day) && (r = (e.cycle + Math.max(1, n - e.day)) % 2147483647), sessionStorage.setItem("strc_home_cycle", JSON.stringify({
			day: n,
			cycle: r
		}));
	} catch {}
	return Sr = {
		day: n,
		cycle: r
	}, r;
}
function wr({ content: e, loading: t, error: i, retry: a, events: o, eventsState: s, openNews: c, openEvent: l }) {
	let { language: u } = n(), d = (e, t) => u === "fr" ? t : e, [f] = (0, h.useState)(() => Date.now()), p = o.filter((e) => new Date(e.startAt).getTime() >= f).sort((e, t) => Date.parse(e.startAt) - Date.parse(t.startAt)).slice(0, 3), m = (e) => new Date(e).toLocaleDateString(r(), {
		day: "numeric",
		month: "long",
		year: "numeric"
	}), g = {
		information: d("Ohne Anmeldung", "Sans inscription"),
		scheduled: d("Anmeldung folgt", "Inscription à venir"),
		open: d("Anmeldung offen", "Inscription ouverte"),
		closed: d("Anmeldung geschlossen", "Inscription close"),
		full: d("Ausgebucht", "Complet"),
		waiting: d("Warteliste offen", "Liste d’attente ouverte")
	}, v = {
		news: d("Clubnews", "Actualités du club"),
		event: d("Veranstaltung", "Événement"),
		forum: "Forum"
	}, y = {
		forum: d("hat ein Thema veröffentlicht", "a publié un sujet"),
		reply: d("hat im Forum geantwortet", "a répondu dans le forum"),
		gallery: d("hat Fotos geteilt", "a partagé des photos"),
		library: d("hat ein Dokument bereitgestellt", "a partagé un document"),
		market: d("hat ein Inserat veröffentlicht", "a publié une annonce")
	}, b = /* @__PURE__ */ (0, _.jsxs)("p", {
		className: "home-feed-state",
		role: "alert",
		children: [
			d("Die Übersicht konnte nicht geladen werden.", "La vue d’ensemble n’a pas pu être chargée."),
			" ",
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "home-text-link",
				onClick: a,
				children: d("Erneut versuchen", "Réessayer")
			})
		]
	});
	return /* @__PURE__ */ (0, _.jsx)("div", {
		className: "home-width home-feed",
		id: "home-feed",
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "home-feed-grid",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("section", {
					className: "home-feed-panel home-feed-news",
					"aria-labelledby": "home-highlights-title",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: d("Das Neueste", "Les dernières nouvelles")
						}),
						/* @__PURE__ */ (0, _.jsx)("h2", {
							id: "home-highlights-title",
							children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: "#neuigkeiten",
								children: d("Aktuell im Club", "L’actualité du club")
							})
						}),
						i ? b : t ? /* @__PURE__ */ (0, _.jsx)("p", {
							role: "status",
							children: d("Neuigkeiten werden geladen …", "Chargement des actualités…")
						}) : e?.highlights?.items.length ? /* @__PURE__ */ (0, _.jsx)("ol", {
							className: "home-feed-list",
							children: e.highlights.items.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
								/* @__PURE__ */ (0, _.jsxs)("p", {
									className: "home-feed-meta",
									children: [
										v[e.kind],
										" · ",
										/* @__PURE__ */ (0, _.jsx)("time", {
											dateTime: e.date,
											children: m(e.date)
										})
									]
								}),
								/* @__PURE__ */ (0, _.jsx)("h3", { children: e.kind === "news" ? /* @__PURE__ */ (0, _.jsx)("button", {
									onClick: (t) => c(e, t.currentTarget),
									children: e.title
								}) : /* @__PURE__ */ (0, _.jsx)("a", {
									href: e.href,
									children: e.title
								}) }),
								/* @__PURE__ */ (0, _.jsx)("p", { children: e.excerpt })
							] }, e.id))
						}) : /* @__PURE__ */ (0, _.jsx)("p", {
							className: "home-feed-state",
							children: d("Aktuell sind keine Beiträge für diese Übersicht veröffentlicht.", "Aucune publication n’est actuellement disponible dans cette sélection.")
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("section", {
					className: "home-feed-panel",
					"aria-labelledby": "home-next-events-title",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: d("Nächste Events", "Prochains événements")
						}),
						/* @__PURE__ */ (0, _.jsx)("h2", {
							id: "home-next-events-title",
							children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: "#agenda",
								children: d("Gemeinsam unterwegs", "En route ensemble")
							})
						}),
						s === "loading" ? /* @__PURE__ */ (0, _.jsx)("p", {
							role: "status",
							children: d("Veranstaltungen werden geladen …", "Chargement des événements…")
						}) : s === "error" ? /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "home-feed-state",
							role: "alert",
							children: [
								d("Veranstaltungen konnten nicht geladen werden.", "Les événements n’ont pas pu être chargés."),
								" ",
								/* @__PURE__ */ (0, _.jsx)("a", {
									href: "#agenda",
									children: d("Agenda öffnen", "Ouvrir l’agenda")
								})
							]
						}) : p.length ? /* @__PURE__ */ (0, _.jsx)("ol", {
							className: "home-feed-list home-feed-events",
							children: p.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [/* @__PURE__ */ (0, _.jsxs)("time", {
								className: "home-feed-date",
								dateTime: e.startAt,
								children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: new Date(e.startAt).toLocaleDateString(r(), { day: "2-digit" }) }), /* @__PURE__ */ (0, _.jsx)("span", { children: new Date(e.startAt).toLocaleDateString(r(), { month: "short" }) })]
							}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
								/* @__PURE__ */ (0, _.jsx)("h3", { children: l ? /* @__PURE__ */ (0, _.jsx)("button", {
									onClick: () => l(e),
									children: e.title
								}) : /* @__PURE__ */ (0, _.jsx)("a", {
									href: `#agenda/${e.id}`,
									children: e.title
								}) }),
								/* @__PURE__ */ (0, _.jsx)("p", { children: [e.region?.name, e.location].filter(Boolean).join(" · ") }),
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "home-feed-status",
									children: g[e.registrationStatus]
								})
							] })] }, e.id))
						}) : /* @__PURE__ */ (0, _.jsx)("p", {
							className: "home-feed-state",
							children: d("Zurzeit sind keine kommenden Veranstaltungen veröffentlicht. Neue Termine findest du hier, sobald sie freigegeben sind.", "Aucun événement à venir n’est actuellement publié. Les nouvelles dates apparaîtront ici dès leur publication.")
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("section", {
					className: "home-feed-panel home-feed-community",
					"aria-labelledby": "home-community-title",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: d("Community", "Communauté")
						}),
						/* @__PURE__ */ (0, _.jsx)("h2", {
							id: "home-community-title",
							children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: "#mitglieder",
								children: d("Aus dem Clubleben", "La vie du club")
							})
						}),
						i ? b : t ? /* @__PURE__ */ (0, _.jsx)("p", {
							role: "status",
							children: d("Beiträge werden geladen …", "Chargement des publications…")
						}) : e?.memberAccess ? e.activities.length ? /* @__PURE__ */ (0, _.jsx)("ol", {
							className: "home-feed-list",
							children: e.activities.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", {
								className: "home-feed-activity",
								children: [/* @__PURE__ */ (0, _.jsx)("span", {
									className: "home-feed-avatar",
									"aria-hidden": "true",
									children: e.author ? e.author.split(/\s+/).slice(0, 2).map((e) => Array.from(e)[0]).join("") : "TR"
								}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
									/* @__PURE__ */ (0, _.jsxs)("p", { children: [
										/* @__PURE__ */ (0, _.jsx)("strong", { children: e.author || d("Clubmitglied", "Membre du club") }),
										" ",
										y[e.kind]
									] }),
									/* @__PURE__ */ (0, _.jsx)("h3", { children: /* @__PURE__ */ (0, _.jsx)("a", {
										href: e.href,
										children: e.title
									}) }),
									/* @__PURE__ */ (0, _.jsxs)("p", {
										className: "home-feed-meta",
										children: [e.kind === "gallery" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
											e.photoCount,
											" ",
											d("freigegebene Fotos", "photos approuvées"),
											" · "
										] }), /* @__PURE__ */ (0, _.jsx)("time", {
											dateTime: e.date,
											children: m(e.date)
										})]
									})
								] })]
							}, `${e.kind}-${e.id}-${t}`))
						}) : /* @__PURE__ */ (0, _.jsx)("p", {
							className: "home-feed-state",
							children: d("Noch keine freigegebenen Community-Beiträge.", "Aucune publication de la communauté n’a encore été approuvée.")
						}) : /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "home-feed-state",
							children: [/* @__PURE__ */ (0, _.jsx)("p", { children: d("Fotos, Wissen und Geschichten unserer Mitglieder. Melde dich an, um die neuesten Beiträge zu sehen.", "Photos, connaissances et récits de nos membres. Connecte-toi pour découvrir les dernières publications.") }), /* @__PURE__ */ (0, _.jsxs)("a", {
								className: "home-button",
								href: "#club",
								children: [
									d("Zum Club", "Le club"),
									" ",
									/* @__PURE__ */ (0, _.jsx)("span", {
										"aria-hidden": "true",
										children: "→"
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsx)(xr, {
					issue: e?.magazine ?? null,
					loading: t,
					error: i,
					retry: a
				})
			]
		})
	});
}
//#endregion
//#region app/components/HomepageSections.tsx
var Tr = (e) => new Date(e).toLocaleDateString(r(), {
	day: "numeric",
	month: "long",
	year: "numeric"
});
function Er({ memberAccess: e, archive: t = !1, upcomingEvents: r, eventsState: i = "ready", openEvent: a }) {
	let { text: s, values: c } = ue(), { language: l } = n(), u = c.home?.partners ?? [], [d, f] = (0, h.useState)(null), [p, m] = (0, h.useState)(""), [g, y] = (0, h.useState)(0), [b, x] = (0, h.useState)(null), [S, w] = (0, h.useState)(!1), [T, E] = (0, h.useState)(""), [D] = (0, h.useState)(Cr);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_homepage", {
			language: l,
			operation: t ? "list" : "overview",
			cycle: String(D)
		}, e.signal).then((e) => {
			f(e), m(""), x((t) => t && (e.news.find((e) => e.id === t.id) || e.highlights?.items.filter((e) => e.kind === "news").map((e) => ({
				...e,
				body: ""
			})).find((e) => e.id === t.id)) || null);
		}).catch((t) => {
			e.signal.aborted || m(t.message);
		}), () => e.abort();
	}, [
		g,
		e,
		l,
		t,
		D
	]);
	let O = () => {
		m(""), f(null), y((e) => e + 1);
	}, k = async () => {
		if (!(!d || S)) {
			w(!0), E("");
			try {
				let e = await C("strc_homepage", {
					page: String(d.newsPage + 1),
					language: l
				});
				f((t) => t && {
					...t,
					news: [...t.news, ...e.news.filter((e) => !t.news.some((t) => t.id === e.id))],
					newsPage: e.newsPage,
					newsPages: e.newsPages
				}), e.news[0] && requestAnimationFrame(() => document.getElementById(`home-news-${e.news[0].id}`)?.focus());
			} catch {
				E("Weitere Neuigkeiten konnten nicht geladen werden. Bitte erneut versuchen.");
			} finally {
				w(!1);
			}
		}
	}, A = (e, t) => {
		t.focus({ preventScroll: !0 }), x(e);
	};
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "home-editorial",
		children: [
			!t && /* @__PURE__ */ (0, _.jsx)(yr, {}),
			!t && /* @__PURE__ */ (0, _.jsx)(wr, {
				content: d,
				loading: !d && !p,
				error: !!p,
				retry: O,
				events: r,
				eventsState: i,
				openEvent: a,
				openNews: (e, t) => A({
					...e,
					body: ""
				}, t)
			}),
			t && /* @__PURE__ */ (0, _.jsxs)("section", {
				className: "home-width home-news",
				id: "home-news",
				tabIndex: -1,
				"aria-labelledby": "home-news-title",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-section-heading",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
						className: "eyebrow",
						children: o("Latest News · Neuigkeiten")
					}), /* @__PURE__ */ (0, _.jsx)("h1", {
						id: "home-news-title",
						children: s("home.newsTitle")
					})] }), /* @__PURE__ */ (0, _.jsx)("p", { children: s("home.newsIntro") })]
				}), p ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "collection-state error",
					role: "alert",
					children: [o("Die Neuigkeiten konnten nicht geladen werden."), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "home-text-link",
						onClick: O,
						children: o("Erneut versuchen")
					})]
				}) : d ? d.news.length === 0 ? /* @__PURE__ */ (0, _.jsx)("div", {
					className: "home-empty",
					children: /* @__PURE__ */ (0, _.jsx)("p", { children: o("Aktuell sind noch keine Neuigkeiten veröffentlicht.") })
				}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "home-news-grid",
						children: d.news.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "home-news-card",
							children: [e.image && /* @__PURE__ */ (0, _.jsxs)("button", {
								className: "home-news-image",
								"aria-label": `${e.title} ${o("lesen")}`,
								onClick: (t) => A(e, t.currentTarget),
								children: [/* @__PURE__ */ (0, _.jsx)(v, {
									src: e.image,
									alt: "",
									width: 1080,
									height: 720
								}), /* @__PURE__ */ (0, _.jsx)("span", {
									"aria-hidden": "true",
									children: "↗"
								})]
							}), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "home-news-copy",
								children: [
									/* @__PURE__ */ (0, _.jsx)("p", {
										className: "home-meta",
										children: /* @__PURE__ */ (0, _.jsx)("time", {
											dateTime: e.date,
											children: Tr(e.date)
										})
									}),
									/* @__PURE__ */ (0, _.jsx)("h3", { children: /* @__PURE__ */ (0, _.jsx)("button", {
										id: `home-news-${e.id}`,
										onClick: (t) => A(e, t.currentTarget),
										children: e.title
									}) }),
									/* @__PURE__ */ (0, _.jsx)("p", { children: e.excerpt }),
									/* @__PURE__ */ (0, _.jsx)("button", {
										className: "home-text-link",
										onClick: (t) => A(e, t.currentTarget),
										children: o("Weiterlesen →")
									})
								]
							})]
						}, e.id))
					}),
					T && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "alert",
						children: T
					}),
					d.newsPage < d.newsPages && /* @__PURE__ */ (0, _.jsx)("button", {
						className: "home-button home-news-more",
						onClick: k,
						disabled: S,
						children: o(S ? "Neuigkeiten werden geladen …" : d.newsPage === 1 ? "Alle Neuigkeiten anzeigen ↓" : "Weitere Neuigkeiten laden ↓")
					})
				] }) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state",
					role: "status",
					children: o("Neuigkeiten werden geladen …")
				})]
			}),
			!t && /* @__PURE__ */ (0, _.jsx)("section", {
				className: "home-sponsors",
				id: "home-sponsors",
				tabIndex: -1,
				"aria-label": o("Unsere Partner"),
				children: /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-width",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "home-section-heading",
						children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: o("Unsere Partner")
						}) }), s("home.sponsorsIntro") && /* @__PURE__ */ (0, _.jsx)("p", { children: s("home.sponsorsIntro") })]
					}), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "home-sponsor-logos",
						children: u.map((e) => /* @__PURE__ */ (0, _.jsx)("a", {
							href: e.url,
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": `${e.name} – ${o("Website in neuem Tab")}`,
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								src: pe(e.image),
								alt: e.name,
								width: 150,
								height: 90
							})
						}, e.name))
					})]
				})
			}),
			b && /* @__PURE__ */ (0, _.jsx)(q, {
				title: b.title,
				close: () => x(null),
				children: /* @__PURE__ */ (0, _.jsxs)("article", {
					className: "home-news-detail",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("p", {
							className: "home-meta",
							children: [
								o("Clubnews ·"),
								" ",
								Tr(b.date)
							]
						}),
						b.image && /* @__PURE__ */ (0, _.jsx)(v, {
							src: b.image,
							alt: "",
							width: 1200,
							height: 800
						}),
						b.bodyHtml ? /* @__PURE__ */ (0, _.jsx)(de, { html: b.bodyHtml }) : /* @__PURE__ */ (0, _.jsx)("p", { children: b.body })
					]
				})
			})
		]
	});
}
//#endregion
//#region app/page.tsx
var Dr = window.strcSettings.wordpressUrl ?? "http://localhost:8080", Or = window.strcSettings.siteUrl ?? "http://localhost:3000", kr = {
	history: "club-geschichte",
	news: "neuigkeiten",
	applications: "antraege",
	registration: "veranstaltung",
	profile: "profil",
	triungsters: "triungsters",
	organisation: "organisation",
	mission: "leitbild",
	membership: "anmeldung",
	models: "tr-modelle",
	shop: "tr-shop",
	home: "",
	club: "club",
	agenda: "agenda",
	regions: "regionen",
	market: "marktplatz",
	members: "mitglieder",
	forum: "forum",
	gallery: "galerie",
	library: "bibliothek",
	clubdocs: "clubdokumente",
	directory: "mitgliederliste",
	contact: "kontakt",
	privacy: "datenschutz",
	statutes: "statuten",
	"event-admin": "agenda-verwalten",
	editorial: "redaktion"
};
function Ar() {
	return /* @__PURE__ */ (0, _.jsx)(i, { children: /* @__PURE__ */ (0, _.jsx)(ce, { children: /* @__PURE__ */ (0, _.jsx)(P, { children: /* @__PURE__ */ (0, _.jsx)(jr, {}) }) }) });
}
function jr() {
	let { language: e } = n(), [t, r] = (0, h.useState)("home"), [i, a] = (0, h.useState)(""), [s, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)(null), [f, p] = (0, h.useState)([]), [m, g] = (0, h.useState)("loading"), [y, b] = (0, h.useState)(null), [x, S] = (0, h.useState)(""), { text: C } = ue(), [w, T] = (0, h.useState)(0);
	function E() {
		g("loading"), T((e) => e + 1);
	}
	(0, h.useEffect)(() => {
		let e = () => {
			let [e, t = ""] = window.location.hash.slice(1).split("/");
			a(t);
			let n = Object.keys(kr).find((t) => kr[t] === e);
			r(!e && new URLSearchParams(window.location.search).has("member") ? "members" : n ?? "home"), b(null), window.scrollTo({
				top: 0,
				behavior: "instant"
			});
		}, t = requestAnimationFrame(e);
		return window.addEventListener("hashchange", e), () => {
			cancelAnimationFrame(t), window.removeEventListener("hashchange", e);
		};
	}, []), (0, h.useEffect)(() => {
		let e = !0;
		return fetch(`${Dr}/wp-admin/admin-ajax.php?action=strc_session`, { credentials: "include" }).then((e) => e.ok ? e.json() : Promise.reject()).then((t) => {
			e && d(t);
		}).catch(() => {
			e && d({
				authenticated: !1,
				memberAccess: !1
			});
		}), () => {
			e = !1;
		};
	}, []), (0, h.useEffect)(() => {
		let t = new AbortController();
		async function n() {
			let n = [], r = 1, i = 1;
			do {
				let a = await fetch(`${Dr}/?rest_route=/strc/v1/events&view=upcoming&limit=100&page=${r}&language=${e}`, {
					cache: "no-store",
					signal: t.signal
				});
				if (!a.ok) throw Error();
				let o = await a.json();
				n.push(...o.events), i = o.pages || 1, r++;
			} while (r <= i);
			t.signal.aborted || (p(n), g("ready"));
		}
		return n().catch(() => {
			t.signal.aborted || g("error");
		}), () => t.abort();
	}, [
		w,
		t,
		e
	]);
	let D = t === "agenda" && /^\d+$/.test(i) ? f.find((e) => e.id === Number(i)) ?? null : null;
	function O(e) {
		r(e), b(null), window.location.hash = kr[e], window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}
	function k(e) {
		S(e), window.setTimeout(() => S(""), 2600);
	}
	(0, h.useEffect)(() => {
		let e = new URL(window.location.href), t = e.searchParams.get("newsletter");
		if (!t) return;
		let n = {
			confirmed: "Newsletter-Anmeldung bestätigt. Willkommen!",
			unsubscribed: "Du wurdest vom Newsletter abgemeldet.",
			invalid: "Der Newsletter-Link ist ungültig oder wurde bereits verwendet."
		};
		n[t] && window.setTimeout(() => k(n[t]), 0), e.searchParams.delete("newsletter"), window.history.replaceState(null, "", e);
	}, []);
	let A = t === "mission" ? "club" : t === "models" ? "model-" + i : t === "regions" && i ? "region-" + i : t;
	return /* @__PURE__ */ (0, _.jsxs)("main", { children: [
		/* @__PURE__ */ (0, _.jsxs)("header", {
			className: "site-header",
			children: [/* @__PURE__ */ (0, _.jsxs)("button", {
				className: "brand brand-button",
				onClick: () => O("home"),
				"aria-label": o("Swiss TR-Club Startseite"),
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					className: "brand-logo",
					src: pe(C("global.logo")),
					width: 954,
					height: 954,
					alt: o("Swiss TR-Club Logo"),
					priority: !0
				}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: C("global.name") }), /* @__PURE__ */ (0, _.jsx)("small", { children: C("global.tagline") })] })]
			}), /* @__PURE__ */ (0, _.jsxs)("nav", {
				"aria-label": o("Hauptnavigation"),
				className: s ? "is-menu-open" : "",
				onKeyDown: (e) => {
					e.key === "Escape" && s && (l(!1), e.currentTarget.querySelector(".nav-toggle")?.focus());
				},
				children: [
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "nav-toggle",
						"aria-expanded": s,
						"aria-controls": "hauptmenu",
						onClick: () => l((e) => !e),
						children: [/* @__PURE__ */ (0, _.jsxs)("span", {
							className: "nav-toggle-icon",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, _.jsx)("i", {}),
								/* @__PURE__ */ (0, _.jsx)("i", {}),
								/* @__PURE__ */ (0, _.jsx)("i", {})
							]
						}), o(s ? "Schliessen" : "Menü")]
					}),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "nav-tabs",
						id: "hauptmenu",
						onClick: () => l(!1),
						children: [
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: t === "home" ? "active" : "",
								onClick: () => O("home"),
								children: o("Home")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: [
									"club",
									"organisation",
									"mission",
									"membership",
									"models",
									"triungsters",
									"history"
								].includes(t) ? "active" : "",
								onClick: () => O("club"),
								children: C("global.navClub")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: t === "agenda" ? "active" : "",
								onClick: () => O("agenda"),
								children: C("global.navAgenda")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: t === "regions" ? "active" : "",
								onClick: () => O("regions"),
								children: C("global.navRegions")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: ["market", "shop"].includes(t) ? "active" : "",
								onClick: () => O("market"),
								children: C("global.navMarket")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: [
									"members",
									"profile",
									"applications",
									"forum",
									"gallery",
									"library",
									"clubdocs",
									"directory",
									"editorial",
									"event-admin"
								].includes(t) ? "active" : "",
								onClick: () => O("members"),
								children: o(u?.memberAccess ? "Mitgliederbereich" : "Mitglieder-Login")
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(c, {})
				]
			})]
		}),
		u?.canEditContent && /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "editorial-access-bar",
			children: [
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: "#redaktion",
					children: o("Redaktion öffnen")
				}),
				u.editableDocuments?.includes(A) && /* @__PURE__ */ (0, _.jsx)("a", {
					href: `#redaktion/${A}`,
					children: o("Diese Seite bearbeiten")
				}),
				u.logoutUrl && /* @__PURE__ */ (0, _.jsx)("a", {
					href: u.logoutUrl,
					children: o("Abmelden")
				})
			]
		}),
		/* @__PURE__ */ (0, _.jsx)(rr, {
			page: t,
			subroute: i
		}),
		t === "editorial" && (u?.canEditContent ? /* @__PURE__ */ (0, _.jsx)(St, {
			nonce: u.editorialNonce || "",
			canManageEvents: !!u.canManageEvents
		}) : /* @__PURE__ */ (0, _.jsx)(Hr, {
			session: u,
			navigate: O
		})),
		t === "home" && /* @__PURE__ */ (0, _.jsx)(Mr, {
			memberAccess: !!u?.memberAccess,
			navigate: O,
			events: f,
			eventsState: m,
			openEvent: b
		}),
		t === "club" && /* @__PURE__ */ (0, _.jsx)(ht, {
			canEdit: !!u?.canEditContent,
			memberAccess: !!u?.memberAccess
		}),
		t === "mission" && /* @__PURE__ */ (0, _.jsx)(gt, {}),
		t === "models" && /* @__PURE__ */ (0, _.jsx)(it, {
			selected: i,
			canEdit: !!u?.canEditContent
		}, i),
		[
			"organisation",
			"membership",
			"shop",
			"triungsters",
			"history"
		].includes(t) && /* @__PURE__ */ (0, _.jsx)(_t, {
			documentKey: A,
			canEdit: u?.editableDocuments?.includes(A)
		}, A),
		t === "agenda" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(Fe, {
			memberAccess: !!u?.memberAccess,
			events: f,
			eventsState: m,
			retryEvents: E,
			openEvent: b
		}) }),
		t === "regions" && /* @__PURE__ */ (0, _.jsx)(Br, {
			editableDocuments: u?.editableDocuments || [],
			events: f,
			eventsState: m,
			retryEvents: E,
			openEvent: b
		}),
		t === "market" && /* @__PURE__ */ (0, _.jsx)(De, {
			section: i,
			session: u,
			notify: k
		}, i),
		t === "profile" && (u?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(pr, {}) : /* @__PURE__ */ (0, _.jsx)(Hr, {
			session: u,
			navigate: O
		})),
		t === "members" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(Hr, {
			session: u,
			navigate: O
		}) }),
		t === "registration" && /* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content",
			children: [/* @__PURE__ */ (0, _.jsx)("a", {
				href: "#mitglieder",
				children: o("← Mitgliederbereich")
			}), /* @__PURE__ */ (0, _.jsx)(qt, {
				eventId: Number(i),
				memberAccess: !!u?.memberAccess
			})]
		}),
		[
			"forum",
			"gallery",
			"library",
			"clubdocs"
		].includes(t) && (u?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(Kn, {
			kind: t === "clubdocs" ? "library" : t,
			nonce: u.communityNonce || "",
			selectedId: Number(i) || void 0,
			initialGroup: t === "clubdocs" ? "club" : "",
			section: i,
			title: t === "clubdocs" ? "Clubdokumente" : void 0
		}, `${t}:${i}`) : t === "gallery" ? /* @__PURE__ */ (0, _.jsx)(mn, {}) : /* @__PURE__ */ (0, _.jsx)(Hr, {
			session: u,
			navigate: O
		})),
		t === "news" && /* @__PURE__ */ (0, _.jsx)(Er, {
			navigate: O,
			memberAccess: !!u?.memberAccess,
			upcomingEvents: [],
			eventPreview: {
				title: "",
				text: ""
			},
			archive: !0
		}),
		t === "applications" && (u?.applicationsNonce ? /* @__PURE__ */ (0, _.jsx)(vr, { nonce: u.applicationsNonce }) : /* @__PURE__ */ (0, _.jsx)(Hr, {
			session: u,
			navigate: O
		})),
		t === "directory" && (u?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(an, {}) : /* @__PURE__ */ (0, _.jsx)(Hr, {
			session: u,
			navigate: O
		})),
		t === "event-admin" && (u?.canManageEvents ? /* @__PURE__ */ (0, _.jsx)(Qt, {
			session: u,
			changed: E
		}) : /* @__PURE__ */ (0, _.jsx)(Hr, {
			session: u,
			navigate: O
		})),
		[
			"contact",
			"privacy",
			"statutes"
		].includes(t) && /* @__PURE__ */ (0, _.jsx)(Vr, { page: t }, t),
		/* @__PURE__ */ (0, _.jsxs)("footer", { children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "footer-brand",
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					className: "footer-logo",
					src: pe(C("global.logo")),
					width: 954,
					height: 954,
					alt: o("Swiss TR-Club Logo")
				}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: C("global.name") }), /* @__PURE__ */ (0, _.jsx)("p", { children: C("global.footer") })] })]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Entdecken") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("club"),
					children: o("Über den Club")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("agenda"),
					children: o("Veranstaltungen")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("regions"),
					children: o("Regionen")
				})
			] }),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Mitglieder") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("members"),
					children: o("Dashboard")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("market"),
					children: o("Marktplatz")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("forum"),
					children: o("Forum")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("library"),
					children: o("Bibliothek")
				})
			] }),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Kontakt & Recht") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("contact"),
					children: o("Kontakt & Impressum")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("privacy"),
					children: o("Datenschutz")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => O("statutes"),
					children: o("Statuten")
				})
			] })
		] }),
		(y || D) && /* @__PURE__ */ (0, _.jsx)(Ur, {
			event: y || D,
			memberAccess: !!u?.memberAccess,
			close: () => {
				b(null), D && (window.location.hash = "#agenda");
			}
		}),
		x && /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "toast",
			role: "status",
			children: ["✓ ", x]
		})
	] });
}
function Mr({ navigate: e, events: t, eventsState: n, openEvent: r, memberAccess: i }) {
	let a = t[0];
	return /* @__PURE__ */ (0, _.jsx)(Er, {
		eventPreview: n === "loading" ? {
			title: o("Termine werden geladen …"),
			text: o("Die nächsten Treffen findest du hier.")
		} : n === "error" ? {
			title: o("Agenda derzeit nicht erreichbar"),
			text: o("Bitte versuche es in der Terminübersicht erneut.")
		} : a ? {
			title: a.title,
			text: `${Fr(a.startAt)} · ${a.location || Ir(a)}`
		} : {
			title: o("Das nächste Wiedersehen"),
			text: o("Aktuell sind noch keine kommenden Termine veröffentlicht. Die Regionen ergänzen ihre Treffen hier.")
		},
		upcomingEvents: t.slice(0, 5),
		eventsState: n,
		openEvent: r,
		memberAccess: i,
		navigate: e
	});
}
function Nr({ eyebrow: e, title: t, text: n, landscape: r }) {
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: `page-hero${r ? " regional-hero" : ""}`,
		style: r ? {
			backgroundImage: `linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${me(r)}")`,
			backgroundSize: "cover",
			backgroundPosition: "center"
		} : void 0,
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "eyebrow",
				children: e
			}),
			/* @__PURE__ */ (0, _.jsx)("h1", { children: t }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: n })
		]
	});
}
function Pr(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? {
		day: "–",
		month: "DATUM",
		year: ""
	} : {
		day: new Intl.DateTimeFormat(r(), { day: "2-digit" }).format(t),
		month: new Intl.DateTimeFormat(r(), { month: "short" }).format(t).replace(".", "").toUpperCase(),
		year: new Intl.DateTimeFormat(r(), { year: "numeric" }).format(t)
	};
}
function Fr(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? o("Wird bekanntgegeben") : new Intl.DateTimeFormat(r(), {
		dateStyle: "long",
		timeStyle: "short"
	}).format(t);
}
function Ir(e) {
	return o(e.region?.name || e.scope?.name || e.eventType?.name || "Swiss TR-Club");
}
function Lr(e) {
	return o({
		information: "Keine Anmeldung erforderlich",
		scheduled: "Anmeldung öffnet später",
		open: "Anmeldung offen",
		closed: "Anmeldung geschlossen",
		full: "Ausgebucht",
		waiting: "Warteliste offen"
	}[e]);
}
function Rr({ state: e, count: t, retry: n }) {
	return e === "loading" ? /* @__PURE__ */ (0, _.jsx)("p", {
		className: "collection-state",
		role: "status",
		children: o("Agenda wird geladen …")
	}) : e === "error" ? /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "collection-state error",
		role: "alert",
		children: [o("Die Agenda kann momentan nicht geladen werden."), /* @__PURE__ */ (0, _.jsx)("button", {
			className: "market-text-button",
			onClick: n,
			children: o("Erneut versuchen")
		})]
	}) : t === 0 ? /* @__PURE__ */ (0, _.jsx)("p", {
		className: "collection-state",
		children: o("Momentan sind keine kommenden Veranstaltungen veröffentlicht.")
	}) : null;
}
function zr({ event: e, open: t }) {
	let n = Pr(e.startAt);
	return /* @__PURE__ */ (0, _.jsxs)("article", {
		className: "event-card",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "event-date",
				children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: n.day }), /* @__PURE__ */ (0, _.jsx)("span", { children: n.month })]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("p", { children: Ir(e) }),
				/* @__PURE__ */ (0, _.jsx)("h3", { children: e.title }),
				/* @__PURE__ */ (0, _.jsxs)("span", { children: [
					e.location || e.eventType?.name,
					" · ",
					Lr(e.registrationStatus)
				] })
			] }),
			/* @__PURE__ */ (0, _.jsx)("button", {
				onClick: t,
				"aria-label": `${e.title} ${o("öffnen")}`,
				children: "→"
			})
		]
	});
}
function Br({ events: e, eventsState: t, retryEvents: n, openEvent: r, editableDocuments: i }) {
	let { text: a, values: s } = ue(), [c, l] = (0, h.useState)([]), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)("loading"), [m, g] = (0, h.useState)(0);
	(0, h.useEffect)(() => {
		let e = () => d(decodeURIComponent(window.location.hash.split("/")[1] || "")), t = requestAnimationFrame(e);
		return window.addEventListener("hashchange", e), () => {
			cancelAnimationFrame(t), window.removeEventListener("hashchange", e);
		};
	}, []), (0, h.useEffect)(() => {
		let e = new AbortController(), t = !1, n = null, r = () => {
			if (document.visibilityState === "hidden") return;
			n?.abort();
			let r = new AbortController();
			n = r, fetch(`${Dr}/?rest_route=/strc/v1/regions`, {
				signal: r.signal,
				cache: "no-store"
			}).then((e) => e.ok ? e.json() : Promise.reject()).then((n) => {
				!e.signal.aborted && !r.signal.aborted && (t = !0, l([...n.regions, {
					name: "TRiungsters",
					slug: "triungsters",
					description: "Die nächste Generation im Swiss TR-Club.",
					memberCount: n.triungstersMemberCount
				}]), p("ready"));
			}).catch(() => {
				!e.signal.aborted && !r.signal.aborted && !t && p("error");
			});
		};
		r();
		let i = window.setInterval(r, 6e4), a = () => {
			document.visibilityState === "visible" && r();
		};
		return document.addEventListener("visibilitychange", a), window.addEventListener("focus", r), () => {
			e.abort(), n?.abort(), window.clearInterval(i), document.removeEventListener("visibilitychange", a), window.removeEventListener("focus", r);
		};
	}, [m]);
	let v = c.find((e) => e.slug === u), y = e.filter((e) => e.region?.slug === u);
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsx)(Nr, {
			eyebrow: o("Lokal präsent – lokal aktiv"),
			title: v ? `${o("Region")} ${o(v.name)}` : a("regions.title"),
			text: v ? a(`region-${v.slug}.intro`, a("regions.intro")) : a("regions.intro"),
			landscape: v?.slug
		}),
		!u && /* @__PURE__ */ (0, _.jsx)(K, { documentKey: "regions" }),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content",
			children: [
				f === "loading" && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Regionen werden geladen …")
				}),
				f === "error" && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "collection-state error",
					role: "alert",
					children: [o("Regionen konnten nicht geladen werden."), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-text-button",
						onClick: () => {
							p("loading"), g((e) => e + 1);
						},
						children: o("Erneut versuchen")
					})]
				}),
				f === "ready" && u === "triungsters" && /* @__PURE__ */ (0, _.jsx)(_t, {
					documentKey: "triungsters",
					canEdit: i.includes("triungsters")
				}, "triungsters-region"),
				f === "ready" && u !== "triungsters" && (v ? /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(Ke, {
					documentKey: "region-" + v.slug,
					values: s["region-" + v.slug] || { body: v.description },
					canEdit: i.includes("region-" + v.slug),
					events: /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(Rr, {
						state: t,
						count: y.length,
						retry: n
					}), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "events",
						children: y.map((e) => /* @__PURE__ */ (0, _.jsx)(zr, {
							event: e,
							open: () => r(e)
						}, e.id))
					})] })
				}) }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					u && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "alert",
						children: o("Diese Region wurde nicht gefunden. Bitte wählen Sie eine Region.")
					}),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "regions-grid",
						children: c.map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
							className: "region-card",
							href: e.slug === "triungsters" ? "#triungsters" : `#regionen/${e.slug}`,
							style: he(e.slug),
							children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o(e.name).replace("Nordwestschweiz", "Nordwest­schweiz") }), typeof e.memberCount == "number" && Number.isFinite(e.memberCount) && e.memberCount >= 0 && /* @__PURE__ */ (0, _.jsxs)("p", {
								className: "region-member-count",
								children: [
									e.memberCount,
									" ",
									o("Mitglieder")
								]
							}, e.memberCount)]
						}, e.slug))
					}),
					!c.length && /* @__PURE__ */ (0, _.jsx)("p", {
						className: "collection-state",
						children: o("Es sind noch keine Regionen hinterlegt.")
					})
				] }))
			]
		})
	] });
}
function Vr({ page: e }) {
	let { text: t, error: n, refresh: r } = ue();
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(Nr, {
		eyebrow: o("Swiss TR-Club"),
		title: t(`${e}.title`),
		text: o("Informationen des Clubs")
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content",
		children: [/* @__PURE__ */ (0, _.jsx)("div", {
			className: "information-content",
			children: n ? /* @__PURE__ */ (0, _.jsxs)("p", {
				role: "alert",
				children: [n, /* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => void r(),
					children: o("Erneut laden")
				})]
			}) : t(`${e}.body`) ? /* @__PURE__ */ (0, _.jsx)(fe, { id: `${e}.body` }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Dieser Inhalt wurde noch nicht veröffentlicht.") })
		}), e === "contact" && /* @__PURE__ */ (0, _.jsx)(ar, {})]
	})] });
}
function Hr({ session: e, navigate: t }) {
	let { text: n } = ue();
	if (e === null) return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content",
		children: /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Mitgliederzugang wird geprüft …")
		})
	});
	if (!e.memberAccess) return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(Nr, {
		eyebrow: o("Geschützter Bereich"),
		title: n("members.title"),
		text: n("members.intro")
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "login-panel",
		children: [/* @__PURE__ */ (0, _.jsxs)("form", {
			method: "post",
			action: `${Dr}/wp-login.php`,
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "secure-label",
					children: o("Geschützter Mitgliederbereich")
				}),
				/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Mitglieder-Login") }),
				e?.authenticated && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "login-warning",
					children: o("Ihre Mitgliedschaft besitzt momentan keinen Zugang zum Mitgliederbereich.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail oder Benutzername"), /* @__PURE__ */ (0, _.jsx)("input", {
					name: "log",
					type: "text",
					autoComplete: "username",
					required: !0
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Passwort"), /* @__PURE__ */ (0, _.jsx)("input", {
					name: "pwd",
					type: "password",
					autoComplete: "current-password",
					required: !0
				})] }),
				/* @__PURE__ */ (0, _.jsx)("input", {
					type: "hidden",
					name: "redirect_to",
					value: `${Or}/${window.location.hash || "#mitglieder"}`
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "submit",
					children: o("Sicher anmelden →")
				}),
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: `${Dr}/wp-login.php?action=lostpassword`,
					children: o("Passwort vergessen?")
				})
			]
		}), /* @__PURE__ */ (0, _.jsxs)("aside", { children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "eyebrow",
				children: o("Noch nicht dabei?")
			}),
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Gemeinschaft beginnt mit einer ersten Ausfahrt.") }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: o("Mitgliedsanträge werden persönlich geprüft und direkt durch den Swiss TR-Club verwaltet.") }),
			/* @__PURE__ */ (0, _.jsx)("button", {
				onClick: () => t("club"),
				children: o("Mitgliedschaft ansehen")
			})
		] })]
	})] });
	let r = [];
	return e.canEditContent && e.canManageRoles && r.push({
		url: "#redaktion",
		label: "Redaktion",
		icon: "✎"
	}), e.canManageEvents && r.push({
		url: "#agenda-verwalten",
		label: "Agenda verwalten",
		icon: "A"
	}), e.formsInboxUrl && r.push({
		url: "#antraege",
		label: "Anträge & Anfragen",
		icon: "✎"
	}), /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content dashboard-introduction",
		children: /* @__PURE__ */ (0, _.jsx)(fe, { id: "members.dashboardIntro" })
	}), /* @__PURE__ */ (0, _.jsx)(pn, { extraTools: r })] });
}
function Ur({ event: e, close: t, memberAccess: n }) {
	return /* @__PURE__ */ (0, _.jsx)(q, {
		title: e.title,
		close: t,
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "event-details",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "eyebrow",
					children: [
						Ir(e),
						" · ",
						e.eventType?.name
					]
				}),
				e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(de, { html: e.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", { children: e.description || e.summary }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "detail-box",
					children: [
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Beginn") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.startAt ? Fr(e.startAt) : "Wird bekanntgegeben" }),
						e.endAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Ende") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: Fr(e.endAt) })] }),
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Ort") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.location || o("Wird bekanntgegeben") }),
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: Lr(e.registrationStatus) }),
						e.registrationOpenAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung ab") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: Fr(e.registrationOpenAt) })] }),
						e.registrationCloseAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung bis") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: Fr(e.registrationCloseAt) })] })
					]
				}),
				e.registrationRequired && (e.externalRegistrationUrl ? /* @__PURE__ */ (0, _.jsx)("a", {
					className: "market-primary",
					href: e.externalRegistrationUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: o("Extern anmelden (neuer Tab) →")
				}) : /* @__PURE__ */ (0, _.jsx)(qt, {
					eventId: e.id,
					memberAccess: n,
					hideTitle: !0
				})),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "modal-action",
					onClick: t,
					children: o("Schliessen")
				})
			]
		})
	});
}
//#endregion
//#region wordpress/main.tsx
var Wr = document.getElementById("strc-app");
Wr && (0, g.createRoot)(Wr).render(/* @__PURE__ */ (0, _.jsx)(Ar, {}));
//#endregion
