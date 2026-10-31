import { n as e, t } from "./chunk-C_CI6nMA.js";
import { a as n, i as r, n as i, o as a, r as o, s, t as c } from "./UILanguage-B7F4joP6.js";
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
	var N = Symbol.for("react.client.reference");
	function P(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === N ? null : e.displayName || e.name || null;
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
			case D: return t = e.displayName || null, t === null ? P(e.type) || "Memo" : t;
			case O:
				t = e._payload, e = e._init;
				try {
					return P(e(t));
				} catch {}
		}
		return null;
	}
	var F = Array.isArray, I = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, z = [], B = -1;
	function V(e) {
		return { current: e };
	}
	function H(e) {
		0 > B || (e.current = z[B], z[B] = null, B--);
	}
	function U(e, t) {
		B++, z[B] = e.current, e.current = t;
	}
	var W = V(null), ee = V(null), te = V(null), ne = V(null);
	function re(e, t) {
		switch (U(te, t), U(ee, e), U(W, null), t.nodeType) {
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
		H(W), U(W, e);
	}
	function ie() {
		H(W), H(ee), H(te);
	}
	function G(e) {
		e.memoizedState !== null && U(ne, e);
		var t = W.current, n = Hd(t, e.type);
		t !== n && (U(ee, e), U(W, n));
	}
	function ae(e) {
		ee.current === e && (H(W), H(ee)), ne.current === e && (H(ne), Qf._currentValue = R);
	}
	var K, oe;
	function se(e) {
		if (K === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			K = t && t[1] || "", oe = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + K + e + oe;
	}
	var ce = !1;
	function le(e, t) {
		if (!e || ce) return "";
		ce = !0;
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
			ce = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? se(n) : "";
	}
	function q(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return se(e.type);
			case 16: return se("Lazy");
			case 13: return e.child !== t && t !== null ? se("Suspense Fallback") : se("Suspense");
			case 19: return se("SuspenseList");
			case 0:
			case 15: return le(e.type, !1);
			case 11: return le(e.type.render, !1);
			case 1: return le(e.type, !0);
			case 31: return se("Activity");
			default: return "";
		}
	}
	function J(e) {
		try {
			var t = "", n = null;
			do
				t += q(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var ue = Object.prototype.hasOwnProperty, Y = t.unstable_scheduleCallback, de = t.unstable_cancelCallback, fe = t.unstable_shouldYield, pe = t.unstable_requestPaint, me = t.unstable_now, he = t.unstable_getCurrentPriorityLevel, ge = t.unstable_ImmediatePriority, _e = t.unstable_UserBlockingPriority, ve = t.unstable_NormalPriority, ye = t.unstable_LowPriority, be = t.unstable_IdlePriority, xe = t.log, Se = t.unstable_setDisableYieldValue, Ce = null, X = null;
	function we(e) {
		if (typeof xe == "function" && Se(e), X && typeof X.setStrictMode == "function") try {
			X.setStrictMode(Ce, e);
		} catch {}
	}
	var Te = Math.clz32 ? Math.clz32 : Oe, Ee = Math.log, De = Math.LN2;
	function Oe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ee(e) / De | 0) | 0;
	}
	var ke = 256, Ae = 262144, je = 4194304;
	function Me(e) {
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
	function Ne(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Me(n))) : i = Me(o) : i = Me(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Me(n))) : i = Me(o)) : i = Me(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Pe(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Fe(e, t) {
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
	function Ie() {
		var e = je;
		return je <<= 1, !(je & 62914560) && (je = 4194304), e;
	}
	function Le(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Re(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function ze(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Te(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && Be(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function Be(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Te(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Ve(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Te(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function He(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Ue(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Ue(e) {
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
	function We(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Ge() {
		var e = L.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function Ke(e, t) {
		var n = L.p;
		try {
			return L.p = e, t();
		} finally {
			L.p = n;
		}
	}
	var qe = Math.random().toString(36).slice(2), Je = "__reactFiber$" + qe, Ye = "__reactProps$" + qe, Xe = "__reactContainer$" + qe, Ze = "__reactEvents$" + qe, Qe = "__reactListeners$" + qe, $e = "__reactHandles$" + qe, et = "__reactResources$" + qe, tt = "__reactMarker$" + qe;
	function nt(e) {
		delete e[Je], delete e[Ye], delete e[Ze], delete e[Qe], delete e[$e];
	}
	function rt(e) {
		var t = e[Je];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Xe] || n[Je]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[Je]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function it(e) {
		if (e = e[Je] || e[Xe]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function at(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function ot(e) {
		var t = e[et];
		return t ||= e[et] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function st(e) {
		e[tt] = !0;
	}
	var ct = /* @__PURE__ */ new Set(), lt = {};
	function ut(e, t) {
		dt(e, t), dt(e + "Capture", t);
	}
	function dt(e, t) {
		for (lt[e] = t, e = 0; e < t.length; e++) ct.add(t[e]);
	}
	var ft = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), pt = {}, mt = {};
	function ht(e) {
		return ue.call(mt, e) ? !0 : ue.call(pt, e) ? !1 : ft.test(e) ? mt[e] = !0 : (pt[e] = !0, !1);
	}
	function gt(e, t, n) {
		if (ht(t)) if (n === null) e.removeAttribute(t);
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
	function _t(e, t, n) {
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
	function vt(e, t, n, r) {
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
	function yt(e) {
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
	function bt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function xt(e, t, n) {
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
	function St(e) {
		if (!e._valueTracker) {
			var t = bt(e) ? "checked" : "value";
			e._valueTracker = xt(e, t, "" + e[t]);
		}
	}
	function Ct(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = bt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function wt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Tt = /[\n"\\]/g;
	function Et(e) {
		return e.replace(Tt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Dt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + yt(t)) : e.value !== "" + yt(t) && (e.value = "" + yt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : kt(e, o, yt(n)) : kt(e, o, yt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + yt(s) : e.removeAttribute("name");
	}
	function Ot(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				St(e);
				return;
			}
			n = n == null ? "" : "" + yt(n), t = t == null ? n : "" + yt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), St(e);
	}
	function kt(e, t, n) {
		t === "number" && wt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function At(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + yt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function jt(e, t, n) {
		if (t != null && (t = "" + yt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + yt(n);
	}
	function Mt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (F(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = yt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), St(e);
	}
	function Nt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Pt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Ft(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Pt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function It(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Ft(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Ft(e, o, t[o]);
	}
	function Lt(e) {
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
	var Rt = new Map([
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
	]), zt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Bt(e) {
		return zt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Vt() {}
	var Ht = null;
	function Ut(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Wt = null, Gt = null;
	function Kt(e) {
		var t = it(e);
		if (t && (e = t.stateNode)) {
			var n = e[Ye] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Dt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Et("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Ye] || null;
								if (!a) throw Error(i(90));
								Dt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Ct(r);
					}
					break a;
				case "textarea":
					jt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && At(e, !!n.multiple, t, !1);
			}
		}
	}
	var qt = !1;
	function Jt(e, t, n) {
		if (qt) return e(t, n);
		qt = !0;
		try {
			return e(t);
		} finally {
			if (qt = !1, (Wt !== null || Gt !== null) && (vu(), Wt && (t = Wt, e = Gt, Gt = Wt = null, Kt(t), e))) for (t = 0; t < e.length; t++) Kt(e[t]);
		}
	}
	function Yt(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Ye] || null;
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
	var Xt = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), Zt = !1;
	if (Xt) try {
		var Qt = {};
		Object.defineProperty(Qt, "passive", { get: function() {
			Zt = !0;
		} }), window.addEventListener("test", Qt, Qt), window.removeEventListener("test", Qt, Qt);
	} catch {
		Zt = !1;
	}
	var $t = null, en = null, tn = null;
	function nn() {
		if (tn) return tn;
		var e, t = en, n = t.length, r, i = "value" in $t ? $t.value : $t.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return tn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function rn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function an() {
		return !0;
	}
	function on() {
		return !1;
	}
	function sn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? an : on, this.isPropagationStopped = on, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = an);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = an);
			},
			persist: function() {},
			isPersistent: an
		}), t;
	}
	var cn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, ln = sn(cn), un = h({}, cn, {
		view: 0,
		detail: 0
	}), dn = sn(un), fn, pn, mn, hn = h({}, un, {
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
		getModifierState: En,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== mn && (mn && e.type === "mousemove" ? (fn = e.screenX - mn.screenX, pn = e.screenY - mn.screenY) : pn = fn = 0, mn = e), fn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : pn;
		}
	}), gn = sn(hn), _n = sn(h({}, hn, { dataTransfer: 0 })), vn = sn(h({}, un, { relatedTarget: 0 })), yn = sn(h({}, cn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), bn = sn(h({}, cn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), xn = sn(h({}, cn, { data: 0 })), Sn = {
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
	}, Cn = {
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
	}, wn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Tn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = wn[e]) ? !!t[e] : !1;
	}
	function En() {
		return Tn;
	}
	var Dn = sn(h({}, un, {
		key: function(e) {
			if (e.key) {
				var t = Sn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = rn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: En,
		charCode: function(e) {
			return e.type === "keypress" ? rn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? rn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), On = sn(h({}, hn, {
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
	})), kn = sn(h({}, un, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: En
	})), An = sn(h({}, cn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), jn = sn(h({}, hn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Mn = sn(h({}, cn, {
		newState: 0,
		oldState: 0
	})), Nn = [
		9,
		13,
		27,
		32
	], Pn = Xt && "CompositionEvent" in window, Fn = null;
	Xt && "documentMode" in document && (Fn = document.documentMode);
	var In = Xt && "TextEvent" in window && !Fn, Ln = Xt && (!Pn || Fn && 8 < Fn && 11 >= Fn), Rn = " ", zn = !1;
	function Bn(e, t) {
		switch (e) {
			case "keyup": return Nn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Vn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Hn = !1;
	function Un(e, t) {
		switch (e) {
			case "compositionend": return Vn(t);
			case "keypress": return t.which === 32 ? (zn = !0, Rn) : null;
			case "textInput": return e = t.data, e === Rn && zn ? null : e;
			default: return null;
		}
	}
	function Wn(e, t) {
		if (Hn) return e === "compositionend" || !Pn && Bn(e, t) ? (e = nn(), tn = en = $t = null, Hn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Ln && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Gn = {
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
	function Kn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Gn[e.type] : t === "textarea";
	}
	function qn(e, t, n, r) {
		Wt ? Gt ? Gt.push(r) : Gt = [r] : Wt = r, t = Td(t, "onChange"), 0 < t.length && (n = new ln("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Jn = null, Yn = null;
	function Xn(e) {
		vd(e, 0);
	}
	function Zn(e) {
		if (Ct(at(e))) return e;
	}
	function Qn(e, t) {
		if (e === "change") return t;
	}
	var $n = !1;
	if (Xt) {
		var er;
		if (Xt) {
			var tr = "oninput" in document;
			if (!tr) {
				var nr = document.createElement("div");
				nr.setAttribute("oninput", "return;"), tr = typeof nr.oninput == "function";
			}
			er = tr;
		} else er = !1;
		$n = er && (!document.documentMode || 9 < document.documentMode);
	}
	function rr() {
		Jn && (Jn.detachEvent("onpropertychange", ir), Yn = Jn = null);
	}
	function ir(e) {
		if (e.propertyName === "value" && Zn(Yn)) {
			var t = [];
			qn(t, Yn, e, Ut(e)), Jt(Xn, t);
		}
	}
	function ar(e, t, n) {
		e === "focusin" ? (rr(), Jn = t, Yn = n, Jn.attachEvent("onpropertychange", ir)) : e === "focusout" && rr();
	}
	function or(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Zn(Yn);
	}
	function sr(e, t) {
		if (e === "click") return Zn(t);
	}
	function cr(e, t) {
		if (e === "input" || e === "change") return Zn(t);
	}
	function lr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var ur = typeof Object.is == "function" ? Object.is : lr;
	function dr(e, t) {
		if (ur(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!ue.call(t, i) || !ur(e[i], t[i])) return !1;
		}
		return !0;
	}
	function fr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function pr(e, t) {
		var n = fr(e);
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
			n = fr(n);
		}
	}
	function mr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? mr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function hr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = wt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = wt(e.document);
		}
		return t;
	}
	function gr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var _r = Xt && "documentMode" in document && 11 >= document.documentMode, vr = null, yr = null, br = null, xr = !1;
	function Sr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		xr || vr == null || vr !== wt(r) || (r = vr, "selectionStart" in r && gr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), br && dr(br, r) || (br = r, r = Td(yr, "onSelect"), 0 < r.length && (t = new ln("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = vr)));
	}
	function Cr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var wr = {
		animationend: Cr("Animation", "AnimationEnd"),
		animationiteration: Cr("Animation", "AnimationIteration"),
		animationstart: Cr("Animation", "AnimationStart"),
		transitionrun: Cr("Transition", "TransitionRun"),
		transitionstart: Cr("Transition", "TransitionStart"),
		transitioncancel: Cr("Transition", "TransitionCancel"),
		transitionend: Cr("Transition", "TransitionEnd")
	}, Tr = {}, Er = {};
	Xt && (Er = document.createElement("div").style, "AnimationEvent" in window || (delete wr.animationend.animation, delete wr.animationiteration.animation, delete wr.animationstart.animation), "TransitionEvent" in window || delete wr.transitionend.transition);
	function Dr(e) {
		if (Tr[e]) return Tr[e];
		if (!wr[e]) return e;
		var t = wr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Er) return Tr[e] = t[n];
		return e;
	}
	var Or = Dr("animationend"), kr = Dr("animationiteration"), Ar = Dr("animationstart"), jr = Dr("transitionrun"), Mr = Dr("transitionstart"), Nr = Dr("transitioncancel"), Pr = Dr("transitionend"), Fr = /* @__PURE__ */ new Map(), Ir = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Ir.push("scrollEnd");
	function Lr(e, t) {
		Fr.set(e, t), ut(t, [e]);
	}
	var Rr = typeof reportError == "function" ? reportError : function(e) {
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
	}, zr = [], Br = 0, Vr = 0;
	function Hr() {
		for (var e = Br, t = Vr = Br = 0; t < e;) {
			var n = zr[t];
			zr[t++] = null;
			var r = zr[t];
			zr[t++] = null;
			var i = zr[t];
			zr[t++] = null;
			var a = zr[t];
			if (zr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Kr(n, i, a);
		}
	}
	function Ur(e, t, n, r) {
		zr[Br++] = e, zr[Br++] = t, zr[Br++] = n, zr[Br++] = r, Vr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Wr(e, t, n, r) {
		return Ur(e, t, n, r), qr(e);
	}
	function Gr(e, t) {
		return Ur(e, null, null, t), qr(e);
	}
	function Kr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Te(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function qr(e) {
		if (50 < lu) throw lu = 0, uu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Jr = {};
	function Yr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Xr(e, t, n, r) {
		return new Yr(e, t, n, r);
	}
	function Zr(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Qr(e, t) {
		var n = e.alternate;
		return n === null ? (n = Xr(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function $r(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ei(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") Zr(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, W.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case k: return e = Xr(31, n, t, a), e.elementType = k, e.lanes = o, e;
			case y: return ti(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = Xr(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = Xr(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = Xr(19, n, t, a), e.elementType = E, e.lanes = o, e;
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
		return t = Xr(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ti(e, t, n, r) {
		return e = Xr(7, e, r, t), e.lanes = n, e;
	}
	function ni(e, t, n) {
		return e = Xr(6, e, null, t), e.lanes = n, e;
	}
	function ri(e) {
		var t = Xr(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ii(e, t, n) {
		return t = Xr(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ai = /* @__PURE__ */ new WeakMap();
	function oi(e, t) {
		if (typeof e == "object" && e) {
			var n = ai.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: J(t)
			}, ai.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: J(t)
		};
	}
	var si = [], ci = 0, li = null, ui = 0, di = [], fi = 0, pi = null, mi = 1, hi = "";
	function gi(e, t) {
		si[ci++] = ui, si[ci++] = li, li = e, ui = t;
	}
	function _i(e, t, n) {
		di[fi++] = mi, di[fi++] = hi, di[fi++] = pi, pi = e;
		var r = mi;
		e = hi;
		var i = 32 - Te(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Te(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, mi = 1 << 32 - Te(t) + i | n << i | r, hi = a + e;
		} else mi = 1 << a | n << i | r, hi = e;
	}
	function vi(e) {
		e.return !== null && (gi(e, 1), _i(e, 1, 0));
	}
	function yi(e) {
		for (; e === li;) li = si[--ci], si[ci] = null, ui = si[--ci], si[ci] = null;
		for (; e === pi;) pi = di[--fi], di[fi] = null, hi = di[--fi], di[fi] = null, mi = di[--fi], di[fi] = null;
	}
	function bi(e, t) {
		di[fi++] = mi, di[fi++] = hi, di[fi++] = pi, mi = t.id, hi = t.overflow, pi = e;
	}
	var xi = null, Si = null, Ci = !1, wi = null, Ti = !1, Ei = Error(i(519));
	function Di(e) {
		throw Ni(oi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ei;
	}
	function Oi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Je] = e, t[Ye] = r, n) {
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
				$("invalid", t), Ot(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), Mt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = Vt), t = !0) : t = !1, t || Di(e, !0);
	}
	function ki(e) {
		for (xi = e.return; xi;) switch (xi.tag) {
			case 5:
			case 31:
			case 13:
				Ti = !1;
				return;
			case 27:
			case 3:
				Ti = !0;
				return;
			default: xi = xi.return;
		}
	}
	function Ai(e) {
		if (e !== xi) return !1;
		if (!Ci) return ki(e), Ci = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && Si && Di(e), ki(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Si = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Si = uf(e);
		} else t === 27 ? (t = Si, Zd(e.type) ? (e = lf, lf = null, Si = e) : Si = t) : Si = xi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ji() {
		Si = xi = null, Ci = !1;
	}
	function Mi() {
		var e = wi;
		return e !== null && (Yl === null ? Yl = e : Yl.push.apply(Yl, e), wi = null), e;
	}
	function Ni(e) {
		wi === null ? wi = [e] : wi.push(e);
	}
	var Pi = V(null), Fi = null, Ii = null;
	function Li(e, t, n) {
		U(Pi, t._currentValue), t._currentValue = n;
	}
	function Ri(e) {
		e._currentValue = Pi.current, H(Pi);
	}
	function zi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Bi(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), zi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), zi(s, n, e), s = null;
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
	function Vi(e, t, n, r) {
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
					ur(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ne.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Bi(t, e, n, r), t.flags |= 262144;
	}
	function Hi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!ur(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Ui(e) {
		Fi = e, Ii = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Wi(e) {
		return Ki(Fi, e);
	}
	function Gi(e, t) {
		return Fi === null && Ui(e), Ki(e, t);
	}
	function Ki(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Ii === null) {
			if (e === null) throw Error(i(308));
			Ii = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Ii = Ii.next = t;
		return n;
	}
	var qi = typeof AbortController < "u" ? AbortController : function() {
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
	}, Ji = t.unstable_scheduleCallback, Yi = t.unstable_NormalPriority, Xi = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Zi() {
		return {
			controller: new qi(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Qi(e) {
		e.refCount--, e.refCount === 0 && Ji(Yi, function() {
			e.controller.abort();
		});
	}
	var $i = null, ea = 0, ta = 0, na = null;
	function ra(e, t) {
		if ($i === null) {
			var n = $i = [];
			ea = 0, ta = ud(), na = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ea++, t.then(ia, ia), t;
	}
	function ia() {
		if (--ea === 0 && $i !== null) {
			na !== null && (na.status = "fulfilled");
			var e = $i;
			$i = null, ta = 0, na = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function aa(e, t) {
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
	var oa = I.S;
	I.S = function(e, t) {
		Ql = me(), typeof t == "object" && t && typeof t.then == "function" && ra(e, t), oa !== null && oa(e, t);
	};
	var sa = V(null);
	function ca() {
		var e = sa.current;
		return e === null ? Pl.pooledCache : e;
	}
	function la(e, t) {
		t === null ? U(sa, sa.current) : U(sa, t.pool);
	}
	function ua() {
		var e = ca();
		return e === null ? null : {
			parent: Xi._currentValue,
			pool: e
		};
	}
	var da = Error(i(460)), fa = Error(i(474)), pa = Error(i(542)), ma = { then: function() {} };
	function ha(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ga(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Vt, Vt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ba(e), e;
			default:
				if (typeof t.status == "string") t.then(Vt, Vt);
				else {
					if (e = Pl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, ba(e), e;
				}
				throw va = t, da;
		}
	}
	function _a(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (va = e, da) : e;
		}
	}
	var va = null;
	function ya() {
		if (va === null) throw Error(i(459));
		var e = va;
		return va = null, e;
	}
	function ba(e) {
		if (e === da || e === pa) throw Error(i(483));
	}
	var xa = null, Sa = 0;
	function Ca(e) {
		var t = Sa;
		return Sa += 1, xa === null && (xa = []), ga(xa, e, t);
	}
	function wa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ta(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ea(e) {
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
			return e = Qr(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ni(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === O && _a(i) === t.type) ? (t = a(t, n.props), wa(t, n), t.return = e, t) : (t = ei(n.type, n.key, n.props, null, e.mode, r), wa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ii(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ti(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ni("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = ei(t.type, t.key, t.props, null, e.mode, n), wa(n, t), n.return = e, n;
					case v: return t = ii(t, e.mode, n), t.return = e, t;
					case O: return t = _a(t), f(e, t, n);
				}
				if (F(t) || M(t)) return t = ti(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ca(t), n);
				if (t.$$typeof === C) return f(e, Gi(e, t), n);
				Ta(e, t);
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
					case O: return n = _a(n), p(e, t, n, r);
				}
				if (F(n) || M(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ca(n), r);
				if (n.$$typeof === C) return p(e, t, Gi(e, n), r);
				Ta(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case O: return r = _a(r), m(e, t, n, r, i);
				}
				if (F(r) || M(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ca(r), i);
				if (r.$$typeof === C) return m(e, t, n, Gi(t, r), i);
				Ta(t, r);
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
			if (h === s.length) return n(i, d), Ci && gi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return Ci && gi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Ci && gi(i, h), l;
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
			if (v.done) return n(a, h), Ci && gi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return Ci && gi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), Ci && gi(a, g), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === O && _a(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), wa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = ti(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ei(o.type, o.key, o.props, null, e.mode, c), wa(c, o), c.return = e, e = c);
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
							c = ii(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case O: return o = _a(o), b(e, r, o, c);
				}
				if (F(o)) return h(e, r, o, c);
				if (M(o)) {
					if (l = M(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ca(o), c);
				if (o.$$typeof === C) return b(e, r, Gi(e, o), c);
				Ta(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ni(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Sa = 0;
				var i = b(e, t, n, r);
				return xa = null, i;
			} catch (t) {
				if (t === da || t === pa) throw t;
				var a = Xr(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Da = Ea(!0), Oa = Ea(!1), ka = !1;
	function Aa(e) {
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
	function ja(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ma(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Na(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Nl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = qr(e), Kr(e, null, n), t;
		}
		return Ur(e, r, t, n), qr(e);
	}
	function Pa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ve(e, n);
		}
	}
	function Fa(e, t) {
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
	var Ia = !1;
	function La() {
		if (Ia) {
			var e = na;
			if (e !== null) throw e;
		}
	}
	function Ra(e, t, n, r) {
		Ia = !1;
		var i = e.updateQueue;
		ka = !1;
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
				if (p ? (Fl & f) === f : (r & f) === f) {
					f !== 0 && f === ta && (Ia = !0), u !== null && (u = u.next = {
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
							case 2: ka = !0;
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
	function za(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ba(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) za(n[e], t);
	}
	var Va = V(null), Ha = V(0);
	function Ua(e, t) {
		e = Vl, U(Ha, e), U(Va, t), Vl = e | t.baseLanes;
	}
	function Wa() {
		U(Ha, Vl), U(Va, Va.current);
	}
	function Ga() {
		Vl = Ha.current, H(Va), H(Ha);
	}
	var Ka = V(null), qa = null;
	function Ja(e) {
		var t = e.alternate;
		U($a, $a.current & 1), U(Ka, e), qa === null && (t === null || Va.current !== null || t.memoizedState !== null) && (qa = e);
	}
	function Ya(e) {
		U($a, $a.current), U(Ka, e), qa === null && (qa = e);
	}
	function Xa(e) {
		e.tag === 22 ? (U($a, $a.current), U(Ka, e), qa === null && (qa = e)) : Za(e);
	}
	function Za() {
		U($a, $a.current), U(Ka, Ka.current);
	}
	function Qa(e) {
		H(Ka), qa === e && (qa = null), H($a);
	}
	var $a = V(0);
	function eo(e) {
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
	var to = 0, Z = null, no = null, ro = null, io = !1, ao = !1, oo = !1, so = 0, co = 0, lo = null, uo = 0;
	function fo() {
		throw Error(i(321));
	}
	function po(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!ur(e[n], t[n])) return !1;
		return !0;
	}
	function mo(e, t, n, r, i, a) {
		return to = a, Z = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, I.H = e === null || e.memoizedState === null ? js : Ms, oo = !1, a = n(r, i), oo = !1, ao && (a = go(t, n, r, i)), ho(e), a;
	}
	function ho(e) {
		I.H = As;
		var t = no !== null && no.next !== null;
		if (to = 0, ro = no = Z = null, io = !1, co = 0, lo = null, t) throw Error(i(300));
		e === null || Ys || (e = e.dependencies, e !== null && Hi(e) && (Ys = !0));
	}
	function go(e, t, n, r) {
		Z = e;
		var a = 0;
		do {
			if (ao && (lo = null), co = 0, ao = !1, 25 <= a) throw Error(i(301));
			if (a += 1, ro = no = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			I.H = Ns, o = t(n, r);
		} while (ao);
		return o;
	}
	function _o() {
		var e = I.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? wo(t) : t, e = e.useState()[0], (no === null ? null : no.memoizedState) !== e && (Z.flags |= 1024), t;
	}
	function vo() {
		var e = so !== 0;
		return so = 0, e;
	}
	function yo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function bo(e) {
		if (io) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			io = !1;
		}
		to = 0, ro = no = Z = null, ao = !1, co = so = 0, lo = null;
	}
	function xo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return ro === null ? Z.memoizedState = ro = e : ro = ro.next = e, ro;
	}
	function So() {
		if (no === null) {
			var e = Z.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = no.next;
		var t = ro === null ? Z.memoizedState : ro.next;
		if (t !== null) ro = t, no = e;
		else {
			if (e === null) throw Z.alternate === null ? Error(i(467)) : Error(i(310));
			no = e, e = {
				memoizedState: no.memoizedState,
				baseState: no.baseState,
				baseQueue: no.baseQueue,
				queue: no.queue,
				next: null
			}, ro === null ? Z.memoizedState = ro = e : ro = ro.next = e;
		}
		return ro;
	}
	function Co() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function wo(e) {
		var t = co;
		return co += 1, lo === null && (lo = []), e = ga(lo, e, t), t = Z, (ro === null ? t.memoizedState : ro.next) === null && (t = t.alternate, I.H = t === null || t.memoizedState === null ? js : Ms), e;
	}
	function To(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return wo(e);
			if (e.$$typeof === C) return Wi(e);
		}
		throw Error(i(438, String(e)));
	}
	function Eo(e) {
		var t = null, n = Z.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Z.alternate;
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
		}, n === null && (n = Co(), Z.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function Do(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Oo(e) {
		return ko(So(), no, e);
	}
	function ko(e, t, n) {
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
				if (f === u.lane ? (to & f) === f : (Fl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ta && (d = !0);
					else if ((to & p) === p) {
						u = u.next, p === ta && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Z.lanes |= p, Ul |= p;
					f = u.action, oo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Z.lanes |= f, Ul |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !ur(o, e.memoizedState) && (Ys = !0, d && (n = na, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ao(e) {
		var t = So(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			ur(o, t.memoizedState) || (Ys = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function jo(e, t, n) {
		var r = Z, a = So(), o = Ci;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !ur((no || a).memoizedState, n);
		if (s && (a.memoizedState = n, Ys = !0), a = a.queue, ns(Po.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || ro !== null && ro.memoizedState.tag & 1) {
			if (r.flags |= 2048, Zo(9, { destroy: void 0 }, No.bind(null, r, a, n, t), null), Pl === null) throw Error(i(349));
			o || to & 127 || Mo(r, t, n);
		}
		return n;
	}
	function Mo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Z.updateQueue, t === null ? (t = Co(), Z.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function No(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Fo(t) && Io(e);
	}
	function Po(e, t, n) {
		return n(function() {
			Fo(t) && Io(e);
		});
	}
	function Fo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !ur(e, n);
		} catch {
			return !0;
		}
	}
	function Io(e) {
		var t = Gr(e, 2);
		t !== null && pu(t, e, 2);
	}
	function Lo(e) {
		var t = xo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), oo) {
				we(!0);
				try {
					n();
				} finally {
					we(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Do,
			lastRenderedState: e
		}, t;
	}
	function Ro(e, t, n, r) {
		return e.baseState = n, ko(e, no, typeof r == "function" ? r : Do);
	}
	function zo(e, t, n, r, a) {
		if (Ds(e)) throw Error(i(485));
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
			I.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Bo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Bo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = I.T, o = {};
			I.T = o;
			try {
				var s = n(i, r), c = I.S;
				c !== null && c(o, s), Vo(e, t, s);
			} catch (n) {
				Uo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), I.T = a;
			}
		} else try {
			a = n(i, r), Vo(e, t, a);
		} catch (n) {
			Uo(e, t, n);
		}
	}
	function Vo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Ho(e, t, n);
		}, function(n) {
			return Uo(e, t, n);
		}) : Ho(e, t, n);
	}
	function Ho(e, t, n) {
		t.status = "fulfilled", t.value = n, Wo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Bo(e, n)));
	}
	function Uo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Wo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Wo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Go(e, t) {
		return t;
	}
	function Ko(e, t) {
		if (Ci) {
			var n = Pl.formState;
			if (n !== null) {
				a: {
					var r = Z;
					if (Ci) {
						if (Si) {
							b: {
								for (var i = Si, a = Ti; i.nodeType !== 8;) {
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
								Si = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Di(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = xo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Go,
			lastRenderedState: t
		}, n.queue = r, n = ws.bind(null, Z, r), r.dispatch = n, r = Lo(!1), a = Es.bind(null, Z, !1, r.queue), r = xo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = zo.bind(null, Z, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function qo(e) {
		return Jo(So(), no, e);
	}
	function Jo(e, t, n) {
		if (t = ko(e, t, Go)[0], e = Oo(Do)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = wo(t);
		} catch (e) {
			throw e === da ? pa : e;
		}
		else r = t;
		t = So();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Z.flags |= 2048, Zo(9, { destroy: void 0 }, Yo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Yo(e, t) {
		e.action = t;
	}
	function Xo(e) {
		var t = So(), n = no;
		if (n !== null) return Jo(t, n, e);
		So(), t = t.memoizedState, n = So();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Zo(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = Z.updateQueue, t === null && (t = Co(), Z.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Qo() {
		return So().memoizedState;
	}
	function $o(e, t, n, r) {
		var i = xo();
		Z.flags |= e, i.memoizedState = Zo(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function es(e, t, n, r) {
		var i = So();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		no !== null && r !== null && po(r, no.memoizedState.deps) ? i.memoizedState = Zo(t, a, n, r) : (Z.flags |= e, i.memoizedState = Zo(1 | t, a, n, r));
	}
	function ts(e, t) {
		$o(8390656, 8, e, t);
	}
	function ns(e, t) {
		es(2048, 8, e, t);
	}
	function rs(e) {
		Z.flags |= 4;
		var t = Z.updateQueue;
		if (t === null) t = Co(), Z.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function is(e) {
		var t = So().memoizedState;
		return rs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Nl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function as(e, t) {
		return es(4, 2, e, t);
	}
	function os(e, t) {
		return es(4, 4, e, t);
	}
	function ss(e, t) {
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
	function cs(e, t, n) {
		n = n == null ? null : n.concat([e]), es(4, 4, ss.bind(null, t, e), n);
	}
	function ls() {}
	function us(e, t) {
		var n = So();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && po(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ds(e, t) {
		var n = So();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && po(t, r[1])) return r[0];
		if (r = e(), oo) {
			we(!0);
			try {
				e();
			} finally {
				we(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function fs(e, t, n) {
		return n === void 0 || to & 1073741824 && !(Fl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = fu(), Z.lanes |= e, Ul |= e, n);
	}
	function ps(e, t, n, r) {
		return ur(n, t) ? n : Va.current === null ? !(to & 42) || to & 1073741824 && !(Fl & 261930) ? (Ys = !0, e.memoizedState = n) : (e = fu(), Z.lanes |= e, Ul |= e, t) : (e = fs(e, n, r), ur(e, t) || (Ys = !0), e);
	}
	function ms(e, t, n, r, i) {
		var a = L.p;
		L.p = a !== 0 && 8 > a ? a : 8;
		var o = I.T, s = {};
		I.T = s, Es(e, !1, t, n);
		try {
			var c = i(), l = I.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ts(e, t, aa(c, r), du(e)) : Ts(e, t, r, du(e));
		} catch (n) {
			Ts(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, du());
		} finally {
			L.p = a, o !== null && s.types !== null && (o.types = s.types), I.T = o;
		}
	}
	function hs() {}
	function gs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = _s(e).queue;
		ms(e, a, t, R, n === null ? hs : function() {
			return vs(e), n(r);
		});
	}
	function _s(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: R,
			baseState: R,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Do,
				lastRenderedState: R
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
				lastRenderedReducer: Do,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function vs(e) {
		var t = _s(e);
		t.next === null && (t = e.alternate.memoizedState), Ts(e, t.next.queue, {}, du());
	}
	function ys() {
		return Wi(Qf);
	}
	function bs() {
		return So().memoizedState;
	}
	function xs() {
		return So().memoizedState;
	}
	function Ss(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = du();
					e = Ma(n);
					var r = Na(t, e, n);
					r !== null && (pu(r, t, n), Pa(r, t, n)), t = { cache: Zi() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Cs(e, t, n) {
		var r = du();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ds(e) ? Os(t, n) : (n = Wr(e, t, n, r), n !== null && (pu(n, e, r), ks(n, t, r)));
	}
	function ws(e, t, n) {
		Ts(e, t, n, du());
	}
	function Ts(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ds(e)) Os(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, ur(s, o)) return Ur(e, t, i, 0), Pl === null && Hr(), !1;
			} catch {}
			if (n = Wr(e, t, i, r), n !== null) return pu(n, e, r), ks(n, t, r), !0;
		}
		return !1;
	}
	function Es(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ds(e)) {
			if (t) throw Error(i(479));
		} else t = Wr(e, n, r, 2), t !== null && pu(t, e, 2);
	}
	function Ds(e) {
		var t = e.alternate;
		return e === Z || t !== null && t === Z;
	}
	function Os(e, t) {
		ao = io = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function ks(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ve(e, n);
		}
	}
	var As = {
		readContext: Wi,
		use: To,
		useCallback: fo,
		useContext: fo,
		useEffect: fo,
		useImperativeHandle: fo,
		useLayoutEffect: fo,
		useInsertionEffect: fo,
		useMemo: fo,
		useReducer: fo,
		useRef: fo,
		useState: fo,
		useDebugValue: fo,
		useDeferredValue: fo,
		useTransition: fo,
		useSyncExternalStore: fo,
		useId: fo,
		useHostTransitionStatus: fo,
		useFormState: fo,
		useActionState: fo,
		useOptimistic: fo,
		useMemoCache: fo,
		useCacheRefresh: fo
	};
	As.useEffectEvent = fo;
	var js = {
		readContext: Wi,
		use: To,
		useCallback: function(e, t) {
			return xo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Wi,
		useEffect: ts,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), $o(4194308, 4, ss.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return $o(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			$o(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = xo();
			t = t === void 0 ? null : t;
			var r = e();
			if (oo) {
				we(!0);
				try {
					e();
				} finally {
					we(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = xo();
			if (n !== void 0) {
				var i = n(t);
				if (oo) {
					we(!0);
					try {
						n(t);
					} finally {
						we(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Cs.bind(null, Z, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = xo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Lo(e);
			var t = e.queue, n = ws.bind(null, Z, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			return fs(xo(), e, t);
		},
		useTransition: function() {
			var e = Lo(!1);
			return e = ms.bind(null, Z, e.queue, !0, !1), xo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Z, a = xo();
			if (Ci) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Pl === null) throw Error(i(349));
				Fl & 127 || Mo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ts(Po.bind(null, r, o, e), [e]), r.flags |= 2048, Zo(9, { destroy: void 0 }, No.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = xo(), t = Pl.identifierPrefix;
			if (Ci) {
				var n = hi, r = mi;
				n = (r & ~(1 << 32 - Te(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = so++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = uo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: ys,
		useFormState: Ko,
		useActionState: Ko,
		useOptimistic: function(e) {
			var t = xo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Es.bind(null, Z, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Eo,
		useCacheRefresh: function() {
			return xo().memoizedState = Ss.bind(null, Z);
		},
		useEffectEvent: function(e) {
			var t = xo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Nl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ms = {
		readContext: Wi,
		use: To,
		useCallback: us,
		useContext: Wi,
		useEffect: ns,
		useImperativeHandle: cs,
		useInsertionEffect: as,
		useLayoutEffect: os,
		useMemo: ds,
		useReducer: Oo,
		useRef: Qo,
		useState: function() {
			return Oo(Do);
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			return ps(So(), no.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Oo(Do)[0], t = So().memoizedState;
			return [typeof e == "boolean" ? e : wo(e), t];
		},
		useSyncExternalStore: jo,
		useId: bs,
		useHostTransitionStatus: ys,
		useFormState: qo,
		useActionState: qo,
		useOptimistic: function(e, t) {
			return Ro(So(), no, e, t);
		},
		useMemoCache: Eo,
		useCacheRefresh: xs
	};
	Ms.useEffectEvent = is;
	var Ns = {
		readContext: Wi,
		use: To,
		useCallback: us,
		useContext: Wi,
		useEffect: ns,
		useImperativeHandle: cs,
		useInsertionEffect: as,
		useLayoutEffect: os,
		useMemo: ds,
		useReducer: Ao,
		useRef: Qo,
		useState: function() {
			return Ao(Do);
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			var n = So();
			return no === null ? fs(n, e, t) : ps(n, no.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ao(Do)[0], t = So().memoizedState;
			return [typeof e == "boolean" ? e : wo(e), t];
		},
		useSyncExternalStore: jo,
		useId: bs,
		useHostTransitionStatus: ys,
		useFormState: Xo,
		useActionState: Xo,
		useOptimistic: function(e, t) {
			var n = So();
			return no === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ro(n, no, e, t);
		},
		useMemoCache: Eo,
		useCacheRefresh: xs
	};
	Ns.useEffectEvent = is;
	function Ps(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Fs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Ma(r);
			i.payload = t, n != null && (i.callback = n), t = Na(e, i, r), t !== null && (pu(t, e, r), Pa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Ma(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Na(e, i, r), t !== null && (pu(t, e, r), Pa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = du(), r = Ma(n);
			r.tag = 2, t != null && (r.callback = t), t = Na(e, r, n), t !== null && (pu(t, e, n), Pa(t, e, n));
		}
	};
	function Is(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !dr(n, r) || !dr(i, a) : !0;
	}
	function Ls(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Fs.enqueueReplaceState(t, t.state, null);
	}
	function Rs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function zs(e) {
		Rr(e);
	}
	function Bs(e) {
		console.error(e);
	}
	function Vs(e) {
		Rr(e);
	}
	function Hs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Us(e, t, n) {
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
	function Ws(e, t, n) {
		return n = Ma(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Hs(e, t);
		}, n;
	}
	function Gs(e) {
		return e = Ma(e), e.tag = 3, e;
	}
	function Ks(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Us(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Us(t, n, r), typeof i != "function" && (tu === null ? tu = new Set([this]) : tu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function qs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Vi(t, n, a, !0), n = Ka.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return qa === null ? Tu() : n.alternate === null && Hl === 0 && (Hl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ma ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ma ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Tu(), !1;
		}
		if (Ci) return t = Ka.current, t === null ? (r !== Ei && (t = Error(i(423), { cause: r }), Ni(oi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = oi(r, n), a = Ws(e.stateNode, r, a), Fa(e, a), Hl !== 4 && (Hl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ei && (e = Error(i(422), { cause: r }), Ni(oi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = oi(o, n), Jl === null ? Jl = [o] : Jl.push(o), Hl !== 4 && (Hl = 2), t === null) return !0;
		r = oi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ws(n.stateNode, r, e), Fa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (tu === null || !tu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Gs(a), Ks(a, e, n, r), Fa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Js = Error(i(461)), Ys = !1;
	function Xs(e, t, n, r) {
		t.child = e === null ? Oa(t, null, n, r) : Da(t, e.child, n, r);
	}
	function Zs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Ui(t), r = mo(e, t, n, o, a, i), s = vo(), e !== null && !Ys ? (yo(e, t, i), xc(e, t, i)) : (Ci && s && vi(t), t.flags |= 1, Xs(e, t, r, i), t.child);
	}
	function Qs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Zr(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, $s(e, t, a, r, i)) : (e = ei(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Sc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? dr : n, n(o, r) && e.ref === t.ref) return xc(e, t, i);
		}
		return t.flags |= 1, e = Qr(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function $s(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (dr(a, r) && e.ref === t.ref) if (Ys = !1, t.pendingProps = r = a, Sc(e, i)) e.flags & 131072 && (Ys = !0);
			else return t.lanes = e.lanes, xc(e, t, i);
		}
		return sc(e, t, n, r, i);
	}
	function ec(e, t, n, r) {
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
				return nc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && la(t, a === null ? null : a.cachePool), a === null ? Wa() : Ua(t, a), Xa(t);
			else return r = t.lanes = 536870912, nc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && la(t, null), Wa(), Za(t)) : (la(t, a.cachePool), Ua(t, a), Za(t), t.memoizedState = null);
		return Xs(e, t, i, n), t.child;
	}
	function tc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function nc(e, t, n, r, i) {
		var a = ca();
		return a = a === null ? null : {
			parent: Xi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && la(t, null), Wa(), Xa(t), e !== null && Vi(e, t, r, !0), t.childLanes = i, null;
	}
	function rc(e, t) {
		return t = gc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function ic(e, t, n) {
		return Da(t, e.child, null, n), e = rc(t, t.pendingProps), e.flags |= 2, Qa(t), t.memoizedState = null, e;
	}
	function ac(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (Ci) {
				if (r.mode === "hidden") return e = rc(t, r), t.lanes = 536870912, tc(null, e);
				if (Ya(t), (e = Si) ? (e = rf(e, Ti), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: pi === null ? null : {
						id: mi,
						overflow: hi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ri(e), n.return = t, t.child = n, xi = t, Si = null)) : e = null, e === null) throw Di(t);
				return t.lanes = 536870912, null;
			}
			return rc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Ya(t), a) if (t.flags & 256) t.flags &= -257, t = ic(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (Ys || Vi(e, t, n, !1), a = (n & e.childLanes) !== 0, Ys || a) {
				if (r = Pl, r !== null && (s = He(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Gr(e, s), pu(r, e, s), Js;
				Tu(), t = ic(e, t, n);
			} else e = o.treeContext, Si = cf(s.nextSibling), xi = t, Ci = !0, wi = null, Ti = !1, e !== null && bi(t, e), t = rc(t, r), t.flags |= 4096;
			return t;
		}
		return e = Qr(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function oc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function sc(e, t, n, r, i) {
		return Ui(t), n = mo(e, t, n, r, void 0, i), r = vo(), e !== null && !Ys ? (yo(e, t, i), xc(e, t, i)) : (Ci && r && vi(t), t.flags |= 1, Xs(e, t, n, i), t.child);
	}
	function cc(e, t, n, r, i, a) {
		return Ui(t), t.updateQueue = null, n = go(t, r, n, i), ho(e), r = vo(), e !== null && !Ys ? (yo(e, t, a), xc(e, t, a)) : (Ci && r && vi(t), t.flags |= 1, Xs(e, t, n, a), t.child);
	}
	function lc(e, t, n, r, i) {
		if (Ui(t), t.stateNode === null) {
			var a = Jr, o = n.contextType;
			typeof o == "object" && o && (a = Wi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Fs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Aa(t), o = n.contextType, a.context = typeof o == "object" && o ? Wi(o) : Jr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ps(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Fs.enqueueReplaceState(a, a.state, null), Ra(t, r, a, i), La(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Rs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Jr, typeof u == "object" && u && (o = Wi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ls(t, a, r, o), ka = !1;
			var f = t.memoizedState;
			a.state = f, Ra(t, r, a, i), La(), l = t.memoizedState, s || f !== l || ka ? (typeof d == "function" && (Ps(t, n, d, r), l = t.memoizedState), (c = ka || Is(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, ja(e, t), o = t.memoizedProps, u = Rs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Jr, typeof l == "object" && l && (c = Wi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ls(t, a, r, c), ka = !1, f = t.memoizedState, a.state = f, Ra(t, r, a, i), La();
			var p = t.memoizedState;
			o !== d || f !== p || ka || e !== null && e.dependencies !== null && Hi(e.dependencies) ? (typeof s == "function" && (Ps(t, n, s, r), p = t.memoizedState), (u = ka || Is(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Hi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, oc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Da(t, e.child, null, i), t.child = Da(t, null, n, i)) : Xs(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = xc(e, t, i), e;
	}
	function uc(e, t, n, r) {
		return ji(), t.flags |= 256, Xs(e, t, n, r), t.child;
	}
	var dc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function fc(e) {
		return {
			baseLanes: e,
			cachePool: ua()
		};
	}
	function pc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Kl), e;
	}
	function mc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : ($a.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (Ci) {
				if (a ? Ja(t) : Za(t), (e = Si) ? (e = rf(e, Ti), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: pi === null ? null : {
						id: mi,
						overflow: hi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ri(e), n.return = t, t.child = n, xi = t, Si = null)) : e = null, e === null) throw Di(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (Za(t), a = t.mode, c = gc({
				mode: "hidden",
				children: c
			}, a), r = ti(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = fc(n), r.childLanes = pc(e, s, n), t.memoizedState = dc, tc(null, r)) : (Ja(t), hc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Ja(t), t.flags &= -257, t = _c(e, t, n)) : t.memoizedState === null ? (Za(t), c = r.fallback, a = t.mode, r = gc({
				mode: "visible",
				children: r.children
			}, a), c = ti(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Da(t, e.child, null, n), r = t.child, r.memoizedState = fc(n), r.childLanes = pc(e, s, n), t.memoizedState = dc, t = tc(null, r)) : (Za(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Ja(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Ni({
					value: r,
					source: null,
					stack: null
				}), t = _c(e, t, n);
			} else if (Ys || Vi(e, t, n, !1), s = (n & e.childLanes) !== 0, Ys || s) {
				if (s = Pl, s !== null && (r = He(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Gr(e, r), pu(s, e, r), Js;
				af(c) || Tu(), t = _c(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Si = cf(c.nextSibling), xi = t, Ci = !0, wi = null, Ti = !1, e !== null && bi(t, e), t = hc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (Za(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = Qr(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ti(c, a, n, null), c.flags |= 2) : c = Qr(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, tc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = fc(n) : (a = c.cachePool, a === null ? a = ua() : (l = Xi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = pc(e, s, n), t.memoizedState = dc, tc(e.child, r)) : (Ja(t), n = e.child, e = n.sibling, n = Qr(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function hc(e, t) {
		return t = gc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function gc(e, t) {
		return e = Xr(22, e, null, t), e.lanes = 0, e;
	}
	function _c(e, t, n) {
		return Da(t, e.child, null, n), e = hc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function vc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), zi(e.return, t, n);
	}
	function yc(e, t, n, r, i, a) {
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
	function bc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = $a.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, U($a, o), Xs(e, t, r, n), r = Ci ? ui : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && vc(e, n, t);
			else if (e.tag === 19) vc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && eo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), yc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && eo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				yc(t, !0, n, null, a, r);
				break;
			case "together":
				yc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function xc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Ul |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Vi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Qr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Qr(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Sc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Hi(e))) : !0;
	}
	function Cc(e, t, n) {
		switch (t.tag) {
			case 3:
				re(t, t.stateNode.containerInfo), Li(t, Xi, e.memoizedState.cache), ji();
				break;
			case 27:
			case 5:
				G(t);
				break;
			case 4:
				re(t, t.stateNode.containerInfo);
				break;
			case 10:
				Li(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Ya(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Ja(t), e = xc(e, t, n), e === null ? null : e.sibling) : mc(e, t, n) : (Ja(t), t.flags |= 128, null);
				Ja(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Vi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return bc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), U($a, $a.current), r) break;
				return null;
			case 22: return t.lanes = 0, ec(e, t, n, t.pendingProps);
			case 24: Li(t, Xi, e.memoizedState.cache);
		}
		return xc(e, t, n);
	}
	function wc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) Ys = !0;
		else {
			if (!Sc(e, n) && !(t.flags & 128)) return Ys = !1, Cc(e, t, n);
			Ys = !!(e.flags & 131072);
		}
		else Ys = !1, Ci && t.flags & 1048576 && _i(t, ui, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = _a(t.elementType), t.type = e, typeof e == "function") Zr(e) ? (r = Rs(e, r), t.tag = 1, t = lc(null, t, e, r, n)) : (t.tag = 0, t = sc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = Zs(null, t, e, r, n);
								break a;
							} else if (a === D) {
								t.tag = 14, t = Qs(null, t, e, r, n);
								break a;
							}
						}
						throw t = P(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return sc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Rs(r, t.pendingProps), lc(e, t, r, a, n);
			case 3:
				a: {
					if (re(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, ja(e, t), Ra(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Li(t, Xi, r), r !== o.cache && Bi(t, [Xi], n, !0), La(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = uc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = oi(Error(i(424)), t), Ni(a), t = uc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Si = cf(e.firstChild), xi = t, Ci = !0, wi = null, Ti = !0, n = Oa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (ji(), r === a) {
							t = xc(e, t, n);
							break a;
						}
						Xs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return oc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Ci || (n = t.type, e = t.pendingProps, r = Bd(te.current).createElement(n), r[Je] = t, r[Ye] = e, Pd(r, n, e), st(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return G(t), e === null && Ci && (r = t.stateNode = ff(t.type, t.pendingProps, te.current), xi = t, Ti = !0, a = Si, Zd(t.type) ? (lf = a, Si = cf(r.firstChild)) : Si = a), Xs(e, t, t.pendingProps.children, n), oc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Ci && ((a = r = Si) && (r = tf(r, t.type, t.pendingProps, Ti), r === null ? a = !1 : (t.stateNode = r, xi = t, Si = cf(r.firstChild), Ti = !1, a = !0)), a || Di(t)), G(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = mo(e, t, _o, null, null, n), Qf._currentValue = a), oc(e, t), Xs(e, t, r, n), t.child;
			case 6: return e === null && Ci && ((e = n = Si) && (n = nf(n, t.pendingProps, Ti), n === null ? e = !1 : (t.stateNode = n, xi = t, Si = null, e = !0)), e || Di(t)), null;
			case 13: return mc(e, t, n);
			case 4: return re(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Da(t, null, r, n) : Xs(e, t, r, n), t.child;
			case 11: return Zs(e, t, t.type, t.pendingProps, n);
			case 7: return Xs(e, t, t.pendingProps, n), t.child;
			case 8: return Xs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Xs(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Li(t, t.type, r.value), Xs(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Ui(t), a = Wi(a), r = r(a), t.flags |= 1, Xs(e, t, r, n), t.child;
			case 14: return Qs(e, t, t.type, t.pendingProps, n);
			case 15: return $s(e, t, t.type, t.pendingProps, n);
			case 19: return bc(e, t, n);
			case 31: return ac(e, t, n);
			case 22: return ec(e, t, n, t.pendingProps);
			case 24: return Ui(t), r = Wi(Xi), e === null ? (a = ca(), a === null && (a = Pl, o = Zi(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Aa(t), Li(t, Xi, a)) : ((e.lanes & n) !== 0 && (ja(e, t), Ra(t, null, null, n), La()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Li(t, Xi, r), r !== a.cache && Bi(t, [Xi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Li(t, Xi, r))), Xs(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Tc(e) {
		e.flags |= 4;
	}
	function Ec(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Su()) e.flags |= 8192;
			else throw va = ma, fa;
		} else e.flags &= -16777217;
	}
	function Dc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (Su()) e.flags |= 8192;
		else throw va = ma, fa;
	}
	function Oc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Ie(), e.lanes |= t, ql |= t);
	}
	function kc(e, t) {
		if (!Ci) switch (e.tailMode) {
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
	function Ac(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function jc(e, t, n) {
		var r = t.pendingProps;
		switch (yi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Ac(t), null;
			case 1: return Ac(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ri(Xi), ie(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ai(t) ? Tc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Mi())), Ac(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Tc(t), o === null ? (Ac(t), Ec(t, a, null, r, n)) : (Ac(t), Dc(t, o))) : o ? o === e.memoizedState ? (Ac(t), t.flags &= -16777217) : (Tc(t), Ac(t), Dc(t, o)) : (e = e.memoizedProps, e !== r && Tc(t), Ac(t), Ec(t, a, e, r, n)), null;
			case 27:
				if (ae(t), n = te.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ac(t), null;
					}
					e = W.current, Ai(t) ? Oi(t, e) : (e = ff(a, r, n), t.stateNode = e, Tc(t));
				}
				return Ac(t), null;
			case 5:
				if (ae(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ac(t), null;
					}
					if (o = W.current, Ai(t)) Oi(t, o);
					else {
						var s = Bd(te.current);
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
						o[Je] = t, o[Ye] = r;
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
						r && Tc(t);
					}
				}
				return Ac(t), Ec(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = te.current, Ai(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = xi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Je] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || Di(t, !0);
					} else e = Bd(e).createTextNode(r), e[Je] = t, t.stateNode = e;
				}
				return Ac(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ai(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Je] = t;
						} else ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ac(t), e = !1;
					} else n = Mi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Qa(t), t) : (Qa(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Ac(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ai(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Je] = t;
						} else ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ac(t), a = !1;
					} else a = Mi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Qa(t), t) : (Qa(t), null);
				}
				return Qa(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Oc(t, t.updateQueue), Ac(t), null);
			case 4: return ie(), e === null && xd(t.stateNode.containerInfo), Ac(t), null;
			case 10: return Ri(t.type), Ac(t), null;
			case 19:
				if (H($a), r = t.memoizedState, r === null) return Ac(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) kc(r, !1);
				else {
					if (Hl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = eo(e), o !== null) {
							for (t.flags |= 128, kc(r, !1), e = o.updateQueue, t.updateQueue = e, Oc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) $r(n, e), n = n.sibling;
							return U($a, $a.current & 1 | 2), Ci && gi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && me() > $l && (t.flags |= 128, a = !0, kc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = eo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Oc(t, e), kc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !Ci) return Ac(t), null;
					} else 2 * me() - r.renderingStartTime > $l && n !== 536870912 && (t.flags |= 128, a = !0, kc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Ac(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = me(), e.sibling = null, n = $a.current, U($a, a ? n & 1 | 2 : n & 1), Ci && gi(t, r.treeForkCount), e);
			case 22:
			case 23: return Qa(t), Ga(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Ac(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ac(t), n = t.updateQueue, n !== null && Oc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && H(sa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ri(Xi), Ac(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Mc(e, t) {
		switch (yi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Ri(Xi), ie(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ae(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Qa(t), t.alternate === null) throw Error(i(340));
					ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Qa(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return H($a), null;
			case 4: return ie(), null;
			case 10: return Ri(t.type), null;
			case 22:
			case 23: return Qa(t), Ga(), e !== null && H(sa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Ri(Xi), null;
			case 25: return null;
			default: return null;
		}
	}
	function Nc(e, t) {
		switch (yi(t), t.tag) {
			case 3:
				Ri(Xi), ie();
				break;
			case 26:
			case 27:
			case 5:
				ae(t);
				break;
			case 4:
				ie();
				break;
			case 31:
				t.memoizedState !== null && Qa(t);
				break;
			case 13:
				Qa(t);
				break;
			case 19:
				H($a);
				break;
			case 10:
				Ri(t.type);
				break;
			case 22:
			case 23:
				Qa(t), Ga(), e !== null && H(sa);
				break;
			case 24: Ri(Xi);
		}
	}
	function Pc(e, t) {
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
	function Fc(e, t, n) {
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
	function Ic(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ba(t, n);
			} catch (t) {
				Uu(e, e.return, t);
			}
		}
	}
	function Lc(e, t, n) {
		n.props = Rs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function Rc(e, t) {
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
	function zc(e, t) {
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
	function Bc(e) {
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
	function Vc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[Ye] = t;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Hc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Uc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Hc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Wc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Vt));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Wc(e, t, n), e = e.sibling; e !== null;) Wc(e, t, n), e = e.sibling;
	}
	function Gc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Gc(e, t, n), e = e.sibling; e !== null;) Gc(e, t, n), e = e.sibling;
	}
	function Kc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[Je] = e, t[Ye] = n;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	var qc = !1, Jc = !1, Yc = !1, Xc = typeof WeakSet == "function" ? WeakSet : Set, Zc = null;
	function Qc(e, t) {
		if (e = e.containerInfo, Rd = sp, e = hr(e), gr(e)) {
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
		}, sp = !1, Zc = t; Zc !== null;) if (t = Zc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Zc = e;
		else for (; Zc !== null;) {
			switch (t = Zc, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Rs(n.type, a);
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
				e.return = t.return, Zc = e;
				break;
			}
			Zc = t.return;
		}
	}
	function $c(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				ml(e, n), r & 4 && Pc(5, n);
				break;
			case 1:
				if (ml(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Uu(n, n.return, e);
				}
				else {
					var i = Rs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				r & 64 && Ic(n), r & 512 && Rc(n, n.return);
				break;
			case 3:
				if (ml(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ba(e, t);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Kc(n);
			case 26:
			case 5:
				ml(e, n), t === null && r & 4 && Bc(n), r & 512 && Rc(n, n.return);
				break;
			case 12:
				ml(e, n);
				break;
			case 31:
				ml(e, n), r & 4 && al(e, n);
				break;
			case 13:
				ml(e, n), r & 4 && ol(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || qc, !r) {
					t = t !== null && t.memoizedState !== null || Jc, i = qc;
					var a = Jc;
					qc = r, (Jc = t) && !a ? gl(e, n, (n.subtreeFlags & 8772) != 0) : ml(e, n), qc = i, Jc = a;
				}
				break;
			case 30: break;
			default: ml(e, n);
		}
	}
	function el(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, el(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && nt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var tl = null, nl = !1;
	function rl(e, t, n) {
		for (n = n.child; n !== null;) il(e, t, n), n = n.sibling;
	}
	function il(e, t, n) {
		if (X && typeof X.onCommitFiberUnmount == "function") try {
			X.onCommitFiberUnmount(Ce, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Jc || zc(n, t), rl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Jc || zc(n, t);
				var r = tl, i = nl;
				Zd(n.type) && (tl = n.stateNode, nl = !1), rl(e, t, n), pf(n.stateNode), tl = r, nl = i;
				break;
			case 5: Jc || zc(n, t);
			case 6:
				if (r = tl, i = nl, tl = null, rl(e, t, n), tl = r, nl = i, tl !== null) if (nl) try {
					(tl.nodeType === 9 ? tl.body : tl.nodeName === "HTML" ? tl.ownerDocument.body : tl).removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				else try {
					tl.removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				break;
			case 18:
				tl !== null && (nl ? (e = tl, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(tl, n.stateNode));
				break;
			case 4:
				r = tl, i = nl, tl = n.stateNode.containerInfo, nl = !0, rl(e, t, n), tl = r, nl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Fc(2, n, t), Jc || Fc(4, n, t), rl(e, t, n);
				break;
			case 1:
				Jc || (zc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Lc(n, t, r)), rl(e, t, n);
				break;
			case 21:
				rl(e, t, n);
				break;
			case 22:
				Jc = (r = Jc) || n.memoizedState !== null, rl(e, t, n), Jc = r;
				break;
			default: rl(e, t, n);
		}
	}
	function al(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Uu(t, t.return, e);
			}
		}
	}
	function ol(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function sl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Xc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Xc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function cl(e, t) {
		var n = sl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ll(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							tl = c.stateNode, nl = !1;
							break a;
						}
						break;
					case 5:
						tl = c.stateNode, nl = !1;
						break a;
					case 3:
					case 4:
						tl = c.stateNode.containerInfo, nl = !0;
						break a;
				}
				c = c.return;
			}
			if (tl === null) throw Error(i(160));
			il(o, s, a), tl = null, nl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) dl(t, e), t = t.sibling;
	}
	var ul = null;
	function dl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ll(t, e), fl(e), r & 4 && (Fc(3, e, e.return), Pc(3, e), Fc(5, e, e.return));
				break;
			case 1:
				ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), r & 64 && qc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = ul;
				if (ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[tt] || o[Je] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[Je] = e, st(o), r = o;
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
							o[Je] = e, st(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Vc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), n !== null && r & 4 && Vc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Nt(a, "");
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Vc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Yc = !0);
				break;
			case 6:
				if (ll(t, e), fl(e), r & 4) {
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
				if (Bf = null, a = ul, ul = gf(t.containerInfo), ll(t, e), ul = a, fl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Uu(e, e.return, t);
				}
				Yc && (Yc = !1, pl(e));
				break;
			case 4:
				r = ul, ul = gf(e.stateNode.containerInfo), ll(t, e), fl(e), ul = r;
				break;
			case 12:
				ll(t, e), fl(e);
				break;
			case 31:
				ll(t, e), fl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 13:
				ll(t, e), fl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Zl = me()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = qc, d = Jc;
				if (qc = u || a, Jc = d || l, ll(t, e), Jc = d, qc = u, fl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || qc || Jc || hl(e)), n = null, t = e;;) {
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, cl(e, n))));
				break;
			case 19:
				ll(t, e), fl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ll(t, e), fl(e);
		}
	}
	function fl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Hc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Gc(e, Uc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Nt(o, ""), n.flags &= -33), Gc(e, Uc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Wc(e, Uc(e), s);
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
	function pl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			pl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function ml(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) $c(e, t.alternate, t), t = t.sibling;
	}
	function hl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Fc(4, t, t.return), hl(t);
					break;
				case 1:
					zc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Lc(t, t.return, n), hl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					zc(t, t.return), hl(t);
					break;
				case 22:
					t.memoizedState === null && hl(t);
					break;
				case 30:
					hl(t);
					break;
				default: hl(t);
			}
			e = e.sibling;
		}
	}
	function gl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					gl(i, a, n), Pc(4, a);
					break;
				case 1:
					if (gl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Uu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) za(c[i], s);
						} catch (e) {
							Uu(r, r.return, e);
						}
					}
					n && o & 64 && Ic(a), Rc(a, a.return);
					break;
				case 27: Kc(a);
				case 26:
				case 5:
					gl(i, a, n), n && r === null && o & 4 && Bc(a), Rc(a, a.return);
					break;
				case 12:
					gl(i, a, n);
					break;
				case 31:
					gl(i, a, n), n && o & 4 && al(i, a);
					break;
				case 13:
					gl(i, a, n), n && o & 4 && ol(i, a);
					break;
				case 22:
					a.memoizedState === null && gl(i, a, n), Rc(a, a.return);
					break;
				case 30: break;
				default: gl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function _l(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Qi(n));
	}
	function vl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Qi(e));
	}
	function yl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) bl(e, t, n, r), t = t.sibling;
	}
	function bl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				yl(e, t, n, r), i & 2048 && Pc(9, t);
				break;
			case 1:
				yl(e, t, n, r);
				break;
			case 3:
				yl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Qi(e)));
				break;
			case 12:
				if (i & 2048) {
					yl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Uu(t, t.return, e);
					}
				} else yl(e, t, n, r);
				break;
			case 31:
				yl(e, t, n, r);
				break;
			case 13:
				yl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? yl(e, t, n, r) : (a._visibility |= 2, xl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? yl(e, t, n, r) : Sl(e, t), i & 2048 && _l(o, t);
				break;
			case 24:
				yl(e, t, n, r), i & 2048 && vl(t.alternate, t);
				break;
			default: yl(e, t, n, r);
		}
	}
	function xl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					xl(a, o, s, c, i), Pc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, xl(a, o, s, c, i)) : u._visibility & 2 ? xl(a, o, s, c, i) : Sl(a, o), i && l & 2048 && _l(o.alternate, o);
					break;
				case 24:
					xl(a, o, s, c, i), i && l & 2048 && vl(o.alternate, o);
					break;
				default: xl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Sl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Sl(n, r), i & 2048 && _l(r.alternate, r);
					break;
				case 24:
					Sl(n, r), i & 2048 && vl(r.alternate, r);
					break;
				default: Sl(n, r);
			}
			t = t.sibling;
		}
	}
	var Cl = 8192;
	function wl(e, t, n) {
		if (e.subtreeFlags & Cl) for (e = e.child; e !== null;) Tl(e, t, n), e = e.sibling;
	}
	function Tl(e, t, n) {
		switch (e.tag) {
			case 26:
				wl(e, t, n), e.flags & Cl && e.memoizedState !== null && Gf(n, ul, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				wl(e, t, n);
				break;
			case 3:
			case 4:
				var r = ul;
				ul = gf(e.stateNode.containerInfo), wl(e, t, n), ul = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Cl, Cl = 16777216, wl(e, t, n), Cl = r) : wl(e, t, n));
				break;
			default: wl(e, t, n);
		}
	}
	function El(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Dl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Zc = r, Al(r, e);
			}
			El(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Ol(e), e = e.sibling;
	}
	function Ol(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Dl(e), e.flags & 2048 && Fc(9, e, e.return);
				break;
			case 3:
				Dl(e);
				break;
			case 12:
				Dl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, kl(e)) : Dl(e);
				break;
			default: Dl(e);
		}
	}
	function kl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Zc = r, Al(r, e);
			}
			El(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Fc(8, t, t.return), kl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, kl(t));
					break;
				default: kl(t);
			}
			e = e.sibling;
		}
	}
	function Al(e, t) {
		for (; Zc !== null;) {
			var n = Zc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Fc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Qi(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, Zc = r;
			else a: for (n = e; Zc !== null;) {
				r = Zc;
				var i = r.sibling, a = r.return;
				if (el(r), r === n) {
					Zc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Zc = i;
					break a;
				}
				Zc = a;
			}
		}
	}
	var jl = {
		getCacheForType: function(e) {
			var t = Wi(Xi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Wi(Xi).controller.signal;
		}
	}, Ml = typeof WeakMap == "function" ? WeakMap : Map, Nl = 0, Pl = null, Q = null, Fl = 0, Il = 0, Ll = null, Rl = !1, zl = !1, Bl = !1, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = null, Yl = null, Xl = !1, Zl = 0, Ql = 0, $l = Infinity, eu = null, tu = null, nu = 0, ru = null, iu = null, au = 0, ou = 0, su = null, cu = null, lu = 0, uu = null;
	function du() {
		return Nl & 2 && Fl !== 0 ? Fl & -Fl : I.T === null ? Ge() : ud();
	}
	function fu() {
		if (Kl === 0) if (!(Fl & 536870912) || Ci) {
			var e = Ae;
			Ae <<= 1, !(Ae & 3932160) && (Ae = 262144), Kl = e;
		} else Kl = 536870912;
		return e = Ka.current, e !== null && (e.flags |= 32), Kl;
	}
	function pu(e, t, n) {
		(e === Pl && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) && (bu(e, 0), _u(e, Fl, Kl, !1)), Re(e, n), (!(Nl & 2) || e !== Pl) && (e === Pl && (!(Nl & 2) && (Wl |= n), Hl === 4 && _u(e, Fl, Kl, !1)), nd(e));
	}
	function mu(e, t, n) {
		if (Nl & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Pe(e, t), a = r ? Ou(e, t) : Eu(e, t, !0), o = r;
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
					if ((t & 62914560) === t && (a = Zl + 300 - me(), 10 < a)) {
						if (_u(r, t, Kl, !Rl), Ne(r, 0, !0) !== 0) break a;
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
				unsuspend: Vt
			}, Tl(t, a, d);
			var m = (a & 62914560) === a ? Zl - me() : (a & 4194048) === a ? Ql - me() : 0;
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
					if (!ur(a(), i)) return !1;
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
			var a = 31 - Te(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && Be(e, n, t);
	}
	function vu() {
		return Nl & 6 ? !0 : (rd(0, !1), !1);
	}
	function yu() {
		if (Q !== null) {
			if (Il === 0) var e = Q.return;
			else e = Q, Ii = Fi = null, bo(e), xa = null, Sa = 0, e = Q;
			for (; e !== null;) Nc(e.alternate, e), e = e.return;
			Q = null;
		}
	}
	function bu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), au = 0, yu(), Pl = e, Q = n = Qr(e.current, null), Fl = t, Il = 0, Ll = null, Rl = !1, zl = Pe(e, t), Bl = !1, ql = Kl = Gl = Wl = Ul = Hl = 0, Yl = Jl = null, Xl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Te(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Vl = t, Hr(), n;
	}
	function xu(e, t) {
		Z = null, I.H = As, t === da || t === pa ? (t = ya(), Il = 3) : t === fa ? (t = ya(), Il = 4) : Il = t === Js ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Ll = t, Q === null && (Hl = 1, Hs(e, oi(t, e.current)));
	}
	function Su() {
		var e = Ka.current;
		return e === null ? !0 : (Fl & 4194048) === Fl ? qa === null : (Fl & 62914560) === Fl || Fl & 536870912 ? e === qa : !1;
	}
	function Cu() {
		var e = I.H;
		return I.H = As, e === null ? As : e;
	}
	function wu() {
		var e = I.A;
		return I.A = jl, e;
	}
	function Tu() {
		Hl = 4, Rl || (Fl & 4194048) !== Fl && Ka.current !== null || (zl = !0), !(Ul & 134217727) && !(Wl & 134217727) || Pl === null || _u(Pl, Fl, Kl, !1);
	}
	function Eu(e, t, n) {
		var r = Nl;
		Nl |= 2;
		var i = Cu(), a = wu();
		(Pl !== e || Fl !== t) && (eu = null, bu(e, t)), t = !1;
		var o = Hl;
		a: do
			try {
				if (Il !== 0 && Q !== null) {
					var s = Q, c = Ll;
					switch (Il) {
						case 8:
							yu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Ka.current === null && (t = !0);
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
		return t && e.shellSuspendCounter++, Ii = Fi = null, Nl = r, I.H = i, I.A = a, Q === null && (Pl = null, Fl = 0, Hr()), o;
	}
	function Du() {
		for (; Q !== null;) Au(Q);
	}
	function Ou(e, t) {
		var n = Nl;
		Nl |= 2;
		var r = Cu(), a = wu();
		Pl !== e || Fl !== t ? (eu = null, $l = me() + 500, bu(e, t)) : zl = Pe(e, t);
		a: do
			try {
				if (Il !== 0 && Q !== null) {
					t = Q;
					var o = Ll;
					b: switch (Il) {
						case 1:
							Il = 0, Ll = null, Mu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ha(o)) {
								Il = 0, Ll = null, ju(t);
								break;
							}
							t = function() {
								Il !== 2 && Il !== 9 || Pl !== e || (Il = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Il = 7;
							break a;
						case 4:
							Il = 5;
							break a;
						case 7:
							ha(o) ? (Il = 0, Ll = null, ju(t)) : (Il = 0, Ll = null, Mu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Q.tag) {
								case 26: s = Q.memoizedState;
								case 5:
								case 27:
									var c = Q;
									if (s ? Wf(s) : c.stateNode.complete) {
										Il = 0, Ll = null;
										var l = c.sibling;
										if (l !== null) Q = l;
										else {
											var u = c.return;
											u === null ? Q = null : (Q = u, Nu(u));
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
		return Ii = Fi = null, I.H = r, I.A = a, Nl = n, Q === null ? (Pl = null, Fl = 0, Hr(), Hl) : 0;
	}
	function ku() {
		for (; Q !== null && !fe();) Au(Q);
	}
	function Au(e) {
		var t = wc(e.alternate, e, Vl);
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Q = t;
	}
	function ju(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = cc(n, t, t.pendingProps, t.type, void 0, Fl);
				break;
			case 11:
				t = cc(n, t, t.pendingProps, t.type.render, t.ref, Fl);
				break;
			case 5: bo(t);
			default: Nc(n, t), t = Q = $r(t, Vl), t = wc(n, t, Vl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Q = t;
	}
	function Mu(e, t, n, r) {
		Ii = Fi = null, bo(t), xa = null, Sa = 0;
		var i = t.return;
		try {
			if (qs(e, i, t, n, Fl)) {
				Hl = 1, Hs(e, oi(n, e.current)), Q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Q = i, t;
			Hl = 1, Hs(e, oi(n, e.current)), Q = null;
			return;
		}
		t.flags & 32768 ? (Ci || r === 1 ? e = !0 : zl || Fl & 536870912 ? e = !1 : (Rl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ka.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Pu(t, e)) : Nu(t);
	}
	function Nu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Pu(t, Rl);
				return;
			}
			e = t.return;
			var n = jc(t.alternate, t, Vl);
			if (n !== null) {
				Q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Q = t;
				return;
			}
			Q = t = e;
		} while (t !== null);
		Hl === 0 && (Hl = 5);
	}
	function Pu(e, t) {
		do {
			var n = Mc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Q = e;
				return;
			}
			Q = e = n;
		} while (e !== null);
		Hl = 6, Q = null;
	}
	function Fu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Bu();
		while (nu !== 0);
		if (Nl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Vr, ze(e, n, o, s, c, l), e === Pl && (Q = Pl = null, Fl = 0), iu = t, ru = e, au = n, ou = o, su = a, cu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(ve, function() {
				return Vu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = I.T, I.T = null, a = L.p, L.p = 2, s = Nl, Nl |= 4;
				try {
					Qc(e, t, n);
				} finally {
					Nl = s, L.p = a, I.T = r;
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
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = Nl;
				Nl |= 4;
				try {
					dl(t, e);
					var a = zd, o = hr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && mr(s.ownerDocument.documentElement, s)) {
						if (c !== null && gr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = pr(s, h), v = pr(s, g);
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
					Nl = i, L.p = r, I.T = n;
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
				n = I.T, I.T = null;
				var r = L.p;
				L.p = 2;
				var i = Nl;
				Nl |= 4;
				try {
					$c(e, t.alternate, t);
				} finally {
					Nl = i, L.p = r, I.T = n;
				}
			}
			nu = 3;
		}
	}
	function Ru() {
		if (nu === 4 || nu === 3) {
			nu = 0, pe();
			var e = ru, t = iu, n = au, r = cu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? nu = 5 : (nu = 0, iu = ru = null, zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (tu = null), We(n), t = t.stateNode, X && typeof X.onCommitFiberRoot == "function") try {
				X.onCommitFiberRoot(Ce, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = I.T, i = L.p, L.p = 2, I.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					I.T = t, L.p = i;
				}
			}
			au & 3 && Bu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === uu ? lu++ : (lu = 0, uu = e) : lu = 0, rd(0, !1);
		}
	}
	function zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Qi(t)));
	}
	function Bu() {
		return Iu(), Lu(), Ru(), Vu();
	}
	function Vu() {
		if (nu !== 5) return !1;
		var e = ru, t = ou;
		ou = 0;
		var n = We(au), r = I.T, a = L.p;
		try {
			L.p = 32 > n ? 32 : n, I.T = null, n = su, su = null;
			var o = ru, s = au;
			if (nu = 0, iu = ru = null, au = 0, Nl & 6) throw Error(i(331));
			var c = Nl;
			if (Nl |= 4, Ol(o.current), bl(o, o.current, s, n), Nl = c, rd(0, !1), X && typeof X.onPostCommitFiberRoot == "function") try {
				X.onPostCommitFiberRoot(Ce, o);
			} catch {}
			return !0;
		} finally {
			L.p = a, I.T = r, zu(e, t);
		}
	}
	function Hu(e, t, n) {
		t = oi(n, t), t = Ws(e.stateNode, t, 2), e = Na(e, t, 2), e !== null && (Re(e, 2), nd(e));
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
					e = oi(n, e), n = Gs(2), r = Na(t, n, 2), r !== null && (Ks(n, r, t, e), Re(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ml();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Bl = !0, i.add(n), e = Gu.bind(null, e, t, n), t.then(e, e));
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Pl === e && (Fl & n) === n && (Hl === 4 || Hl === 3 && (Fl & 62914560) === Fl && 300 > me() - Zl ? !(Nl & 2) && bu(e, 0) : Gl |= n, ql === Fl && (ql = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = Ie()), e = Gr(e, t), e !== null && (Re(e, t), nd(e));
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
		return Y(e, t);
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
							a = (1 << 31 - Te(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = Fl, a = Ne(r, r === Pl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Pe(r, a) || (n = !0, cd(r, a));
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
		for (var t = me(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		nu !== 0 && nu !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Te(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Fe(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Pl, n = Fl, n = Ne(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && de(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Pe(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && de(r), We(n)) {
				case 2:
				case 8:
					n = _e;
					break;
				case 32:
					n = ve;
					break;
				case 268435456:
					n = be;
					break;
				default: n = ve;
			}
			return r = sd.bind(null, e), n = Y(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && de(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (nu !== 0 && nu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Bu() && e.callbackNode !== n) return null;
		var r = Fl;
		return r = Ne(e, e === Pl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (mu(e, r, t), od(e, me()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Bu()) return null;
		mu(e, t, !0);
	}
	function ld() {
		Yd(function() {
			Nl & 6 ? Y(ge, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = ta;
			e === 0 && (e = ke, ke <<= 1, !(ke & 261888) && (ke = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Bt("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[Ye] || null).action), o = r.submitter;
			o && (t = (t = o[Ye] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new ln("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (td !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								gs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), gs(n, {
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
	for (var md = 0; md < Ir.length; md++) {
		var hd = Ir[md];
		Lr(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Lr(Or, "onAnimationEnd"), Lr(kr, "onAnimationIteration"), Lr(Ar, "onAnimationStart"), Lr("dblclick", "onDoubleClick"), Lr("focusin", "onFocus"), Lr("focusout", "onBlur"), Lr(jr, "onTransitionRun"), Lr(Mr, "onTransitionStart"), Lr(Nr, "onTransitionCancel"), Lr(Pr, "onTransitionEnd"), dt("onMouseEnter", ["mouseout", "mouseover"]), dt("onMouseLeave", ["mouseout", "mouseover"]), dt("onPointerEnter", ["pointerout", "pointerover"]), dt("onPointerLeave", ["pointerout", "pointerover"]), ut("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ut("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ut("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), ut("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ut("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ut("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
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
						Rr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Rr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[Ze];
		n === void 0 && (n = t[Ze] = /* @__PURE__ */ new Set());
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
			e[bd] = !0, ct.forEach(function(t) {
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
		n = i.bind(null, t, n, e), i = void 0, !Zt || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					if (s = rt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Jt(function() {
			var r = a, i = Ut(n), s = [];
			a: {
				var c = Fr.get(e);
				if (c !== void 0) {
					var l = ln, u = e;
					switch (e) {
						case "keypress": if (rn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Dn;
							break;
						case "focusin":
							u = "focus", l = vn;
							break;
						case "focusout":
							u = "blur", l = vn;
							break;
						case "beforeblur":
						case "afterblur":
							l = vn;
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
							l = gn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = _n;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = kn;
							break;
						case Or:
						case kr:
						case Ar:
							l = yn;
							break;
						case Pr:
							l = An;
							break;
						case "scroll":
						case "scrollend":
							l = dn;
							break;
						case "wheel":
							l = jn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = bn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = On;
							break;
						case "toggle":
						case "beforetoggle": l = Mn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Yt(m, p), g != null && d.push(wd(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Ht && (u = n.relatedTarget || n.fromElement) && (rt(u) || u[Xe])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? rt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = gn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = On, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : at(l), h = u == null ? c : at(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, rt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
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
					if (c = r ? at(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = Qn;
					else if (Kn(c)) if ($n) v = cr;
					else {
						v = or;
						var y = ar;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Lt(r.elementType) && (v = Qn) : v = sr;
					if (v &&= v(e, r)) {
						qn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && kt(c, "number", c.value);
				}
				switch (y = r ? at(r) : window, e) {
					case "focusin":
						(Kn(y) || y.contentEditable === "true") && (vr = y, yr = r, br = null);
						break;
					case "focusout":
						br = yr = vr = null;
						break;
					case "mousedown":
						xr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						xr = !1, Sr(s, n, i);
						break;
					case "selectionchange": if (_r) break;
					case "keydown":
					case "keyup": Sr(s, n, i);
				}
				var b;
				if (Pn) b: {
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
				else Hn ? Bn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Ln && n.locale !== "ko" && (Hn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Hn && (b = nn()) : ($t = i, en = "value" in $t ? $t.value : $t.textContent, Hn = !0)), y = Td(r, x), 0 < y.length && (x = new xn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Vn(n), b !== null && (x.data = b)))), (b = In ? Un(e, n) : Wn(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new xn("onBeforeInput", "beforeinput", null, n, i), s.push({
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Yt(e, n), i != null && r.unshift(wd(e, i, a)), i = Yt(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Yt(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = Yt(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
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
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Nt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Nt(e, "" + r);
				break;
			case "className":
				_t(e, "class", r);
				break;
			case "tabIndex":
				_t(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				_t(e, n, r);
				break;
			case "style":
				It(e, r, o);
				break;
			case "data": if (t !== "object") {
				_t(e, "data", r);
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
				r = Bt("" + r), e.setAttribute(n, r);
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
				r = Bt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Vt);
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
				n = Bt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				$("beforetoggle", e), $("toggle", e), gt(e, "popover", r);
				break;
			case "xlinkActuate":
				vt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				vt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				vt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				vt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				vt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				vt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				vt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				vt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				vt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				gt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Rt.get(n) || n, gt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				It(e, r, o);
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
				typeof r == "string" ? Nt(e, r) : (typeof r == "number" || typeof r == "bigint") && Nt(e, "" + r);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Vt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!lt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[Ye] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : gt(e, n, r);
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
				Ot(e, o, c, l, u, s, a, !1);
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
				t = o, n = s, e.multiple = !!r, t == null ? n != null && At(e, !!r, n, !0) : At(e, !!r, t, !1);
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
				Mt(e, r, a, o);
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
			default: if (Lt(t)) {
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
				Dt(e, s, c, l, u, d, o, a);
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
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? At(e, !!n, n ? [] : "", !1) : At(e, !!n, t, !0)) : At(e, !!n, p, !1);
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
				jt(e, p, m);
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
			default: if (Lt(t)) {
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
					a[tt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
					ef(n), nt(n);
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
			else if (!e[tt]) switch (t) {
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
		nt(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = L.d;
	L.d = {
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
		var t = it(e);
		t !== null && t.tag === 5 && t.type === "form" ? vs(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Et(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), st(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + Et(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Et(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Et(n.imageSizes) + "\"]")) : i += "[href=\"" + Et(e) + "\"]";
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
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), st(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Et(r) + "\"][href=\"" + Et(e) + "\"]", a = i;
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
				r = n.createElement("link"), Pd(r, "link", e), st(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = ot(r).hoistableStyles, a = Af(e);
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
					st(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = ot(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), st(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = ot(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), st(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = te.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = ot(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = ot(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = ot(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + Et(e) + "\"";
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
		}), Pd(t, "link", n), st(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Et(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Et(n.href) + "\"]");
				if (r) return t.instance = r, st(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), st(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, st(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), st(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, st(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), st(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[tt] || a[Je] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, st(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), st(a);
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
		_currentValue: R,
		_currentValue2: R,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Le(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Le(0), this.hiddenUpdates = Le(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Xr(3, null, null, t), e.current = a, a.stateNode = e, t = Zi(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Aa(a), e;
	}
	function tp(e) {
		return e ? (e = Jr, e) : Jr;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ma(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Na(e, r, t), n !== null && (pu(n, e, t), Pa(n, e, t));
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
			var t = Gr(e, 67108864);
			t !== null && pu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = du();
			t = Ue(t);
			var n = Gr(e, t);
			n !== null && pu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = I.T;
		I.T = null;
		var a = L.p;
		try {
			L.p = 2, up(e, t, n, r);
		} finally {
			L.p = a, I.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = I.T;
		I.T = null;
		var a = L.p;
		try {
			L.p = 8, up(e, t, n, r);
		} finally {
			L.p = a, I.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = it(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Me(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Te(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(Nl & 6) && ($l = me() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Gr(a, 2), s !== null && pu(s, a, 2), vu(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Ut(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = rt(e), e !== null) {
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
			case "message": switch (he()) {
				case ge: return 2;
				case _e: return 8;
				case ve:
				case ye: return 32;
				case be: return 268435456;
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
		}, t !== null && (t = it(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = rt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Ke(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = l(n), t !== null) {
						e.blockedOn = t, Ke(e.priority, function() {
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
				Ht = r, n.target.dispatchEvent(r), Ht = null;
			} else return t = it(n), t !== null && ap(t), e.blockedOn = n, !1;
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
				var a = it(n);
				a !== null && (e.splice(t, 3), t -= 3, gs(a, {
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
			var i = n[r], a = n[r + 1], o = i[Ye] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Ye] || null) s = o.formAction;
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
			np(e.current, 2, null, e, null, null), vu(), t[Xe] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Ge();
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
	L.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = p(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: I,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Ce = zp.inject(Rp), X = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = zs, s = Bs, c = Vs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[Xe] = t.current, xd(e), new Fp(t);
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
		key: "board-meetings",
		label: "Vorstandssitzungen",
		group: "board",
		access: "restricted",
		fields: ["date", "version"]
	},
	{
		key: "board-plan",
		label: "Jahresplan",
		group: "board",
		access: "restricted",
		fields: ["date", "version"]
	},
	{
		key: "board-finance",
		label: "Finanzen",
		group: "board",
		access: "restricted",
		fields: ["date", "version"]
	},
	{
		key: "board-agm",
		label: "Generalversammlung",
		group: "board",
		access: "restricted",
		fields: ["date", "version"]
	},
	{
		key: "board-media",
		label: "Medien",
		group: "board",
		access: "restricted",
		fields: ["date", "version"]
	},
	{
		key: "board-admin",
		label: "Clubadministration",
		group: "board",
		access: "restricted",
		fields: ["date", "version"]
	},
	{
		key: "board-contracts",
		label: "Verträge",
		group: "board",
		access: "restricted",
		fields: ["date", "version"]
	},
	{
		key: "board-drafts",
		label: "Entwurfsbox",
		group: "board",
		access: "restricted",
		fields: ["date", "version"]
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
	limited: "Regional",
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
function M({ type: e, initial: t, accessClasses: n, definitions: r = E, canChangeAccess: i = !0 }) {
	let a = r.find((t) => t.key === e), s = j(t.access) || a?.access || "open", c = {
		open: 0,
		limited: 1,
		restricted: 2
	}, l = i ? n.filter((e) => (c[e] ?? -1) >= (c[a?.access || "open"] ?? 2)) : [s], u = ["magazine", "newsletter"].includes(e), d = [...a?.fields || ["year"], "source"].some((e) => e !== "model" && j(t[e]));
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsx)("input", {
			type: "hidden",
			name: "documentType",
			value: e
		}),
		/* @__PURE__ */ (0, _.jsxs)("p", {
			className: "library-form-type",
			children: [a?.label || "Bisheriges Dokument", " · eigenes Uploadformular"]
		}),
		u ? /* @__PURE__ */ (0, _.jsx)("div", {
			className: "club-form-row",
			children: (a?.fields || ["year"]).filter((e) => e !== "model").map((n) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
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
				defaultValue: s,
				children: l.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
			open: d || void 0,
			children: [
				/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Weitere Angaben (optional)") }),
				u ? null : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "club-form-row",
					children: (a?.fields || ["year"]).filter((e) => e !== "model").map((n) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
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
var N = {
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
}, P = (0, h.createContext)(N);
function F({ children: e }) {
	let [t, n] = (0, h.useState)(N);
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_catalog", {}, e.signal).then(n).catch(() => {}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsx)(P.Provider, {
		value: t,
		children: e
	});
}
var I = () => (0, h.useContext)(P);
function L() {
	let e = I(), [t, n] = (0, h.useState)(""), [r, i] = (0, h.useState)(!1);
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
									children: o("Regional")
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
var R = [
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
], z = R.filter((e) => e.startsWith("TR")), B = () => ({
	model: "",
	details: "",
	year: "",
	colour: "",
	registration: "",
	status: "roadworthy",
	notes: ""
});
function V({ error: e, message: t }) {
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
function H({ title: e, children: t, collapsible: n = !1, open: r = !1, note: i = "", hidden: a = !1 }) {
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
function U(e) {
	let t = e.trim(), n = t.replace(/\D/g, ""), r = "";
	return n.startsWith("0041") && n.length === 13 ? r = n.slice(4) : (t.startsWith("+41") || t.startsWith("0041")) && n.startsWith("41") && n.length === 11 ? r = n.slice(2) : n.startsWith("0") && n.length === 10 && (r = n.slice(1)), r.length === 9 ? `${t.startsWith("+41") || t.startsWith("0041") ? "+41 " : "0"}${r.slice(0, 2)} ${r.slice(2, 5)} ${r.slice(5, 7)} ${r.slice(7)}` : t;
}
function W({ prefix: e = "", names: t = !0, values: n = {}, mobileRequired: r = !1, formatSwissMobile: i = !1, personalDetails: a = !1 }) {
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
						e.currentTarget.value = U(e.currentTarget.value);
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
function ee({ value: e, onChange: t, application: n = !1 }) {
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
				}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
function te() {
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
function ne() {
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
//#endregion
//#region app/components/ZoomImage.tsx
function re({ src: e, alt: t, children: n }) {
	let [r, i] = (0, h.useState)(!1), [a, s] = (0, h.useState)(1);
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("button", {
		type: "button",
		className: "agenda-image-open",
		onClick: () => {
			s(1), i(!0);
		},
		"aria-label": o("Jahresprogramm vergrössern"),
		children: [n, /* @__PURE__ */ (0, _.jsx)("span", { children: o("Vergrössern und zoomen") })]
	}), r && /* @__PURE__ */ (0, _.jsxs)(X, {
		title: t || o("Jahresprogramm"),
		close: () => i(!1),
		children: [/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "image-zoom-toolbar",
			role: "group",
			"aria-label": o("Bildzoom"),
			children: [
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					disabled: a <= .5,
					onClick: () => s((e) => Math.max(.5, e - .25)),
					children: "−"
				}),
				/* @__PURE__ */ (0, _.jsxs)("span", {
					"aria-live": "polite",
					children: [Math.round(a * 100), " %"]
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					disabled: a >= 3,
					onClick: () => s((e) => Math.min(3, e + .25)),
					children: "+"
				}),
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: e,
					target: "_blank",
					rel: "noopener noreferrer",
					children: o("Originaldatei öffnen")
				})
			]
		}), /* @__PURE__ */ (0, _.jsx)("div", {
			className: "image-zoom-viewport",
			children: /* @__PURE__ */ (0, _.jsx)(v, {
				unoptimized: !0,
				src: e,
				alt: t,
				width: 2400,
				height: 1600,
				style: {
					width: `${a * 100}%`,
					maxWidth: "none",
					height: "auto"
				}
			})
		})]
	})] });
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
				key: "triungstersLabel",
				label: "TRiungsters – Oberzeile",
				type: "text",
				default: "TRiungsters · bis 35 Jahre"
			},
			{
				key: "triungstersTitle",
				label: "TRiungsters – Überschrift",
				type: "text",
				default: "Die nächste Generation am Steuer."
			},
			{
				key: "triungstersText",
				label: "TRiungsters – Kurztext",
				type: "textarea",
				default: "Du bist unter 35 und begeisterst dich für klassische Triumph? Bei den TRiungsters triffst du Gleichgesinnte, fährst an Ausfahrten und Treffen mit und gestaltest die Zukunft des Clubs mit."
			},
			{
				key: "triungstersImage",
				label: "TRiungsters – Bild (leer: Bild der TRiungsters-Seite)",
				type: "image",
				default: ""
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
				key: "slides",
				label: "Kopfbereich – Slider mit Anlass-Plakaten (Reihenfolge = Anzeige; Plakate werden vollständig gezeigt)",
				type: "images",
				maxItems: 12,
				default: [
					{
						url: "/club/agenda/warmup-2027.jpg",
						alt: "Warmup 2027 – Sonntag, 25. April 2027",
						altFr: "Warmup 2027 – dimanche 25 avril 2027"
					},
					{
						url: "/club/agenda/fruehlingsausfahrt-2027.jpg",
						alt: "TR-Frühlingsausfahrt 2027 – Sonntag, 9. Mai 2027",
						altFr: "Sortie de printemps TR 2027 – dimanche 9 mai 2027"
					},
					{
						url: "/club/agenda/grilltag-2027.jpg",
						alt: "Grilltag 2027 – Sonntag, 4. Juli 2027, ab 11 Uhr, beim Pontonierhaus in 5326 Schwaderloch",
						altFr: "Journée grillades 2027 – dimanche 4 juillet 2027, dès 11 h, au Pontonierhaus à 5326 Schwaderloch"
					},
					{
						url: "/club/agenda/mondscheinfahrt-2027.jpg",
						alt: "TR-Mondscheinfahrt 2027 – Weekend, 17.–18. Juli 2027",
						altFr: "Sortie au clair de lune TR 2027 – week-end des 17 et 18 juillet 2027"
					},
					{
						url: "/club/agenda/sommerausfahrt-2027.jpg",
						alt: "TR-Sommerausfahrt 2027 – Sonntag, 8. August 2027",
						altFr: "Sortie d’été TR 2027 – dimanche 8 août 2027"
					},
					{
						url: "/club/agenda/herbstausfahrt-2027.jpg",
						alt: "TR-Herbstausfahrt 2027 – Sonntag, 3. Oktober 2027",
						altFr: "Sortie d’automne TR 2027 – dimanche 3 octobre 2027"
					}
				]
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
				label: "Unsere Anlässe: Einleitung",
				type: "rich",
				default: ""
			},
			{
				key: "eventEmpty",
				label: "Unsere Anlässe: Hinweis, wenn keine Anlässe geplant sind",
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
				default: "<p>Wir möchten zur Paarmitgliedschaft wechseln. Der Jahresbeitrag ändert sich auf CHF 160.–.</p>"
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
				default: ""
			}
		]
	}
}, G = ie, ae = Object.fromEntries(Object.entries(ie).map(([e, t]) => [e, "initialStatus" in t && t.initialStatus === "draft" ? {} : Object.fromEntries(t.fields.map((e) => [e.key, e.default]))])), K = Object.fromEntries(Object.entries(ie).map(([e, t]) => [e, !("initialStatus" in t && t.initialStatus === "draft")]));
function oe(e) {
	return Object.fromEntries(Object.keys({
		...ae,
		...e
	}).map((t) => [t, {
		...ae[t],
		...e[t]
	}]));
}
var se = (0, h.createContext)({
	values: ae,
	published: K,
	loading: !0,
	refresh: async () => {},
	error: ""
});
function ce({ children: e }) {
	let [t, n] = (0, h.useState)(ae), [r, i] = (0, h.useState)(""), [a, o] = (0, h.useState)(K), [s, c] = (0, h.useState)(!0), l = (0, h.useCallback)(async () => {
		try {
			let e = await C("strc_editorial", { operation: "public" });
			n(oe(e.values)), o({
				...K,
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
				...K,
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
function q() {
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
function J({ html: e, className: t = "" }) {
	return /* @__PURE__ */ (0, _.jsx)("div", {
		className: `rich-content ${t}`,
		dangerouslySetInnerHTML: { __html: e }
	});
}
function ue({ id: e, className: t = "" }) {
	let { text: n } = q();
	return /* @__PURE__ */ (0, _.jsx)(J, {
		html: n(e),
		className: t
	});
}
function Y(e) {
	return e.startsWith("/") && !e.startsWith("//") ? `${window.strcSettings.assetBase ?? ""}${e}` : e;
}
function de(e) {
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
	return Y(n[t] ? `/regions/${n[t]}` : "/regions/00000326-Aarau_Obertorturm_4x3.png");
}
function fe(e) {
	return {
		backgroundImage: `url("${de(e)}")`,
		backgroundSize: "cover",
		backgroundPosition: "center 65%",
		backgroundRepeat: "no-repeat"
	};
}
//#endregion
//#region app/components/ImageFrame.tsx
function pe(e, t = "contain") {
	let [n, r, i] = typeof e == "string" ? e.split("|") : [], a = (e) => e !== void 0 && /^\d{1,3}$/.test(e) ? Math.min(100, Math.max(0, Number(e))) : 50;
	return {
		objectFit: n === "cover" || n === "contain" ? n : t,
		objectPosition: `${a(r)}% ${a(i)}%`
	};
}
function me({ value: e = "", image: t = "", label: n = "Bild im Rahmen", changed: r, portrait: i = !1 }) {
	let a = pe(e, i ? "cover" : "contain"), [o, s] = String(a.objectPosition).replaceAll("%", "").split(" "), c = (e, t, n) => r(`${e}|${t}|${n}`);
	return /* @__PURE__ */ (0, _.jsxs)("fieldset", {
		className: "image-frame-control",
		children: [
			/* @__PURE__ */ (0, _.jsx)("legend", { children: n }),
			t && /* @__PURE__ */ (0, _.jsx)("div", {
				className: `image-frame-preview${i ? " portrait" : ""}`,
				children: /* @__PURE__ */ (0, _.jsx)(v, {
					src: Y(t),
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
function he({ documentKey: e, contained: t = !1 }) {
	let { text: n } = q(), r = n(e + ".landingImage"), i = n(e + ".landingBody");
	if (!r && !i) return null;
	let a = r ? /* @__PURE__ */ (0, _.jsxs)("figure", {
		className: "static-cover",
		children: [e === "agenda" ? /* @__PURE__ */ (0, _.jsx)(re, {
			src: Y(r),
			alt: n(e + ".landingImageAlt"),
			children: /* @__PURE__ */ (0, _.jsx)(v, {
				src: Y(r),
				alt: n(e + ".landingImageAlt"),
				width: 1440,
				height: 800,
				style: pe(n(e + ".landingImageFrame"))
			})
		}) : /* @__PURE__ */ (0, _.jsx)(v, {
			src: Y(r),
			alt: n(e + ".landingImageAlt"),
			width: 1440,
			height: 800,
			style: pe(n(e + ".landingImageFrame"))
		}), n(e + ".landingImageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: n(e + ".landingImageCaption") })]
	}) : null;
	return t ? /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "landing-introduction",
		"aria-label": o("Weitere Informationen"),
		children: [a, i && /* @__PURE__ */ (0, _.jsx)(ue, { id: e + ".landingBody" })]
	}) : /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content landing-introduction",
		"aria-label": o("Weitere Informationen"),
		children: [a, i && /* @__PURE__ */ (0, _.jsx)(ue, { id: e + ".landingBody" })]
	});
}
//#endregion
//#region app/components/Marketplace.tsx
var ge = [
	"Teile",
	"Fahrzeuge",
	"Zubehör",
	"Sonstiges"
];
function _e(e) {
	return e.details?.offerType === "free" ? "Kostenlos" : e.details?.offerType === "swap" ? "Tausch" : e.details?.priceMode === "request" ? "Preis auf Anfrage" : ve.format(Number(e.price)) + (e.details?.priceMode === "negotiable" ? " VB" : "");
}
var ve = new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: "CHF"
}), ye = window.strcSettings.wordpressUrl ?? "http://localhost:8080", be = window.strcSettings.siteUrl ?? "http://localhost:3000", xe = `${ye}/wp-login.php?redirect_to=${encodeURIComponent(`${be}/#marktplatz`)}`;
function Se(e, t) {
	return C("strc_marketplace", e, t);
}
function Ce(e, t) {
	return w("strc_marketplace", t, e);
}
function X({ title: e, close: t, busy: n = !1, children: r }) {
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
			e.preventDefault(), e.target === e.currentTarget && !n && t();
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
function we({ section: e, session: t, notify: n }) {
	let { text: r } = q(), i = e === "ersatzteile" ? "parts" : e === "fahrzeuge" ? "cars" : e === "meine" ? "mine" : e === "pruefung" ? "review" : "landing", [a, s] = (0, h.useState)({
		ads: [],
		total: 0,
		pages: 0
	}), [c, l] = (0, h.useState)(!0), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(null), [C, w] = (0, h.useState)(!1), [T, E] = (0, h.useState)(""), D = I(), [O] = (0, h.useState)(e === "meine"), [k, A] = (0, h.useState)(1), [j, M] = (0, h.useState)(0), [N, P] = (0, h.useState)(!1), [F, L] = (0, h.useState)(null), [z, B] = (0, h.useState)(null), V = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		if (i === "landing") return;
		let e = new AbortController(), t = window.setTimeout(() => {
			l(!0), d(""), Se({
				operation: "list",
				mine: O ? "1" : "0",
				...i === "review" ? { review: "1" } : {},
				search: i === "parts" ? "" : f,
				category: i === "parts" ? "parts" : i === "cars" ? "Fahrzeuge" : "",
				model: i === "parts" ? m : "",
				partCategory: i === "parts" ? y : "",
				page: String(k)
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
		O,
		t?.memberAccess,
		k,
		j
	]), (0, h.useEffect)(() => {
		if (!["mine", "review"].includes(i) || !t?.memberAccess) return;
		let e = Number(window.location.hash.split("/")[2]);
		if (!Number.isSafeInteger(e) || e < 1) return;
		let n = new AbortController();
		return Se({
			operation: "get",
			id: String(e)
		}, n.signal).then((e) => {
			(i === "review" ? e.canReview : e.mine) ? B(e) : d(o("Kein Zugriff auf dieses Inserat."));
		}).catch((e) => {
			n.signal.aborted || d(e.message);
		}), () => n.abort();
	}, [i, t?.memberAccess]);
	function H() {
		l(!0), M((e) => e + 1);
	}
	function U(e) {
		l(!0), e(), A(1);
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
		/* @__PURE__ */ (0, _.jsx)(he, { documentKey: "market" }),
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
	let W = i === "parts", ee = i === "review", te = ee ? o("Inserate in Prüfung") : O ? o("Meine Inserate") : r(W ? "market.partsTitle" : "market.carsTitle");
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Marktplatz")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: te }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: ee ? o("Eingereichte Inserate öffnen und «Öffentlich freigeben» oder «Ablehnen» wählen.") : O ? o("Ihre Inserate mit Status – bearbeiten, verlängern oder als verkauft markieren.") : r(W ? "market.partsText" : "market.carsText") })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content marketplace market-section",
			"aria-label": te,
			children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-toolbar",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: ee ? o("Zur Prüfung") : O ? o("Meine Inserate") : W ? "Ersatzteile finden" : "Fahrzeuge entdecken" }), /* @__PURE__ */ (0, _.jsx)("p", { children: ee ? o("Neueste zuerst. Nach der Freigabe erscheint das Inserat öffentlich und verschwindet aus dieser Liste.") : O ? o("Ein Inserat öffnen, um es zu bearbeiten.") : W ? r("market.partsGuide") : "Entdecke Triumphs aus dem Club und öffne ein Inserat für Bilder und Details." })] }),
						t?.memberAccess && !ee && /* @__PURE__ */ (0, _.jsx)("a", {
							className: "club-secondary",
							href: "#marktplatz/meine",
							children: o("Meine Inserate")
						}),
						t?.canCreateAd && !ee && /* @__PURE__ */ (0, _.jsx)("button", {
							ref: V,
							className: "market-primary",
							onClick: () => P(!0),
							children: "＋ Inserat erstellen"
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-filters market-part-filters",
					children: [W && /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: ["Triumph-Modell", /* @__PURE__ */ (0, _.jsxs)("select", {
							value: m,
							onChange: (e) => U(() => g(e.target.value)),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Modelle")
							}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: e
							}, e))]
						})]
					}), W ? /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: [o("Teilebereich"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: y,
							onChange: (e) => U(() => b(e.target.value)),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Teilebereiche")
							}), D.parts.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})]
					}) : null]
				}),
				c ? /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state",
					role: "status",
					children: o("Inserate werden geladen …")
				}) : u ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "collection-state error",
					role: "alert",
					children: [u, /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-text-button",
						onClick: H,
						children: o("Erneut versuchen")
					})]
				}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					(W || O || ee) && /* @__PURE__ */ (0, _.jsxs)("p", {
						className: "market-count",
						role: "status",
						children: [
							a.total,
							" ",
							a.total === 1 ? "Inserat" : "Inserate",
							O || ee ? "" : W ? " mit verfügbaren Teilen" : " mit Fahrzeugen"
						]
					}),
					a.ads.length ? W ? /* @__PURE__ */ (0, _.jsx)("ul", {
						className: "market-parts-list",
						"aria-label": "Verfügbare Teile",
						children: a.ads.map((e) => {
							let t = Array.isArray(e.details?.parts) ? e.details.parts.filter((t) => t && t !== e.title) : [];
							return /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
								type: "button",
								onClick: () => B(e),
								"aria-label": `${e.title}, ${o("Inserat ansehen")}`,
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
										children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.title }), /* @__PURE__ */ (0, _.jsx)("small", { children: [e.details?.model || e.category, t.length ? `${o("Enthält")}: ${t.slice(0, 4).join(", ")}${t.length > 4 ? " …" : ""}` : ""].filter(Boolean).join(" · ") })]
									}),
									/* @__PURE__ */ (0, _.jsxs)("span", {
										className: "market-part-price",
										children: [_e(e), t.length > 1 && /* @__PURE__ */ (0, _.jsx)("small", { children: o("für das Inserat") })]
									})
								]
							}) }, e.id);
						})
					}) : /* @__PURE__ */ (0, _.jsx)("div", {
						className: "market-grid",
						children: a.ads.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "market-card",
							children: [/* @__PURE__ */ (0, _.jsxs)("button", {
								className: "market-card-open",
								onClick: () => B(e),
								"aria-label": `${e.title}, ${_e(e)}, Details ansehen`,
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
										/* @__PURE__ */ (0, _.jsx)("strong", { children: _e(e) }),
										/* @__PURE__ */ (0, _.jsx)("p", {
											className: "market-excerpt",
											children: e.description
										})
									]
								})]
							}), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-card-footer",
								children: [ee ? `${e.seller} · ` : "", new Date(e.createdAt).toLocaleDateString("de-CH")]
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
								disabled: k === 1,
								onClick: () => {
									l(!0), A(k - 1);
								},
								children: o("Zurück")
							}),
							/* @__PURE__ */ (0, _.jsxs)("span", { children: [
								o("Seite"),
								" ",
								k,
								" ",
								o("von"),
								" ",
								a.pages
							] }),
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: k >= a.pages,
								onClick: () => {
									l(!0), A(k + 1);
								},
								children: o("Weiter")
							})
						]
					})
				] })
			]
		}),
		N && /* @__PURE__ */ (0, _.jsx)(Te, {
			session: t,
			initialCategory: W ? "Teile" : "Fahrzeuge",
			close: () => P(!1),
			created: (e) => {
				P(!1), p(""), g(""), A(1), H(), E(e.warning || ""), w(e.status === "publish"), S("created");
			}
		}),
		F && /* @__PURE__ */ (0, _.jsx)(Te, {
			ad: F,
			session: t,
			initialCategory: F.category === "Fahrzeuge" ? "Fahrzeuge" : "Teile",
			close: () => L(null),
			created: (e) => {
				L(null), H(), E(e.warning || ""), w(e.status === "publish"), S("edited");
			}
		}),
		x && /* @__PURE__ */ (0, _.jsx)(X, {
			title: o("Vielen Dank!"),
			close: () => {
				S(null), requestAnimationFrame(() => V.current?.focus());
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
					T && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: T
					}),
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
								S(null), requestAnimationFrame(() => V.current?.focus());
							},
							children: o("Schliessen")
						})
					})
				]
			})
		}),
		z && /* @__PURE__ */ (0, _.jsx)(Ee, {
			edit: () => {
				L(z), B(null);
			},
			ad: z,
			session: t,
			close: () => B(null),
			sold: () => {
				B(null), H(), n("Inserat gespeichert."), requestAnimationFrame(() => V.current?.focus());
			}
		})
	] });
}
function Te({ ad: e, session: t, initialCategory: n, close: r, created: i }) {
	let a = I(), s = (0, h.useRef)(crypto.randomUUID()), [c, l] = (0, h.useState)(e?.title || ""), [u, d] = (0, h.useState)(e?.price || ""), [f, p] = (0, h.useState)(String(e?.details.offerType || "sale")), [m, g] = (0, h.useState)(String(e?.details.priceMode || "fixed")), [y, b] = (0, h.useState)(e?.description || ""), [x, S] = (0, h.useState)(e?.category || n), [C, w] = (0, h.useState)(Array.isArray(e?.details.parts) ? e.details.parts.join("\n") : ""), [T, E] = (0, h.useState)(e?.imageIds || []), [D, O] = (0, h.useState)([]), [k, A] = (0, h.useState)((e?.documents || []).map((e) => e.key)), [j, M] = (0, h.useState)([]), N = (0, h.useRef)(/* @__PURE__ */ new Set()), [P, F] = (0, h.useState)(!1), [L, z] = (0, h.useState)(!1), B = (0, h.useRef)(!1), [V, H] = (0, h.useState)(""), [U, W] = (0, h.useState)(""), [ee, te] = (0, h.useState)(!1), ne = (0, h.useRef)(null), [re, ie] = (0, h.useState)(!1), [G, ae] = (0, h.useState)(null), [K, oe] = (0, h.useState)(""), [se, ce] = (0, h.useState)([]);
	(0, h.useEffect)(() => {
		if (e) return;
		let t = new AbortController();
		return Se({ operation: "config" }, t.signal).then((e) => ie(!!e.canReview)).catch(() => {}), () => t.abort();
	}, [e]), (0, h.useEffect)(() => {
		if (!re || K.trim().length < 2) return;
		let e = new AbortController(), t = setTimeout(() => {
			Se({
				operation: "members",
				q: K.trim()
			}, e.signal).then((e) => ce(e.members)).catch(() => {});
		}, 250);
		return () => {
			clearTimeout(t), e.abort();
		};
	}, [re, K]), (0, h.useEffect)(() => {
		let e = N.current;
		return () => {
			e.forEach((e) => URL.revokeObjectURL(e));
		};
	}, []);
	function le() {
		c || u || y || C || j.length || D.length ? te(!0) : r();
	}
	function q(e) {
		if (W(""), T.length + j.length + e.length > 5) {
			W("Bitte höchstens 5 Bilder auswählen.");
			return;
		}
		if (e.some((e) => ![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(e.type) || !e.size || e.size > 20 * 1024 * 1024)) {
			W("Bitte JPG, PNG oder WebP verwenden, maximal 20 MB pro Bild.");
			return;
		}
		M((t) => [...t, ...e.map((e) => {
			let t = URL.createObjectURL(e);
			return N.current.add(t), {
				file: e,
				url: t
			};
		})]);
	}
	return /* @__PURE__ */ (0, _.jsx)(X, {
		title: o(e ? "Inserat bearbeiten" : "Inserat erstellen"),
		close: le,
		busy: L,
		children: t ? !t?.canCreateAd || !t.marketplaceNonce ? /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "market-login",
			children: [/* @__PURE__ */ (0, _.jsx)("p", { children: "Mit Ihrem Mitgliedskonto können Sie ein Inserat veröffentlichen. Titel, Preis, Beschreibung und Bilder sind öffentlich sichtbar. Ihre E-Mail-Adresse sehen nur angemeldete Mitglieder." }), /* @__PURE__ */ (0, _.jsx)("a", {
				className: "market-primary",
				href: xe,
				children: o("Mitglieder-Login")
			})]
		}) : /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "market-form",
			onSubmit: async (n) => {
				if (n.preventDefault(), B.current) return;
				if (f === "sale" && m !== "request" && (!/^\d{1,7}([.,]\d{1,2})?$/.test(u.trim()) || Number(u.replace(",", ".")) > 1e6)) {
					H("Bitte einen Preis von CHF 0 bis CHF 1’000’000 mit höchstens zwei Nachkommastellen eingeben.");
					return;
				}
				B.current = !0, z(!0), H("");
				let r = new FormData(n.currentTarget);
				r.set("requestId", s.current), r.set("offerType", f), r.set("priceMode", m), r.set("operation", e ? "edit" : "create"), !e && G && r.set("onBehalfOf", String(G.id)), e && (r.set("retainedDocumentKeys", JSON.stringify(k)), r.set("id", String(e.id)), r.set("retainedImageIds", JSON.stringify(T))), r.set("title", c), r.set("price", u), r.set("description", y), r.set("category", x), r.set("parts", C), r.set("models", JSON.stringify(r.getAll("models[]"))), r.delete("models[]"), j.forEach((e) => r.append("images[]", e.file)), D.forEach((e) => r.append("documents[]", e));
				try {
					i(await Ce(r, t.marketplaceNonce));
				} catch (e) {
					H(e instanceof Error ? e.message : "Speichern fehlgeschlagen."), requestAnimationFrame(() => ne.current?.focus());
				} finally {
					B.current = !1, z(!1);
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
						G ? /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "market-service-chosen",
							children: [
								o("Inserat im Namen von"),
								" ",
								/* @__PURE__ */ (0, _.jsx)("b", { children: G.name }),
								G.memberNumber ? ` · Nr. ${G.memberNumber}` : "",
								G.city ? ` · ${G.city}` : "",
								" ",
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									onClick: () => {
										ae(null), oe(""), ce([]);
									},
									children: o("ändern")
								})
							]
						}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitglied suchen (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								type: "search",
								value: K,
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
										ae(e), ce([]);
									},
									children: [e.name, /* @__PURE__ */ (0, _.jsx)("small", { children: [e.memberNumber && "Nr. " + e.memberNumber, e.city].filter(Boolean).join(" · ") })]
								}) }, e.id))
							}),
							K.trim().length >= 2 && !se.length && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Kein Mitglied gefunden.") })
						] }),
						/* @__PURE__ */ (0, _.jsx)("small", { children: o(G ? "Das Inserat gehört dem Mitglied, ist sofort online und Kontaktanfragen gehen an seine E-Mail. Das Mitglied wird per E-Mail informiert." : "Leer lassen, um ein eigenes Inserat zu erstellen.") })
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: L,
					children: [
						/* @__PURE__ */ (0, _.jsx)("legend", {
							className: "market-sr-only",
							children: "Angaben zum Inserat"
						}),
						x === "Fahrzeuge" ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsxs)("h3", {
								className: "market-step",
								children: [/* @__PURE__ */ (0, _.jsx)("span", { children: "1" }), o("Fahrzeug")]
							}),
							/* @__PURE__ */ (0, _.jsx)("label", {
								htmlFor: "ad-title",
								children: o("Angebot *")
							}),
							/* @__PURE__ */ (0, _.jsx)("input", {
								id: "ad-title",
								name: "title",
								value: c,
								onChange: (e) => l(e.target.value),
								required: !0,
								maxLength: 100,
								placeholder: o("z. B. TR6 PI, Mallard Blue, MFK-Veteran")
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Modell *"), /* @__PURE__ */ (0, _.jsxs)("select", {
									name: "model",
									defaultValue: String(e?.details.model || ""),
									required: !0,
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
										value: e,
										children: e
									}, e))]
								})] }) }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Baujahr *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "year",
									defaultValue: String(e?.details.year || ""),
									type: "number",
									required: !0,
									min: 1900,
									max: (/* @__PURE__ */ new Date()).getFullYear() + 1,
									placeholder: "1973"
								})] }) })]
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zustand *"), /* @__PURE__ */ (0, _.jsxs)("select", {
									name: "condition",
									defaultValue: String(e?.details.condition || ""),
									required: !0,
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), [
										"Fahrbereit",
										"Neuwertig",
										"Gebraucht – gut",
										"Gebraucht – mit Mängeln",
										"In Restauration",
										"Restaurierungsbedürftig"
									].map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
										value: e,
										children: o(e)
									}, e))]
								})] }) }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Standort *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "location",
									defaultValue: String(e?.details.location || (!e && !G ? t?.contact?.city : "") || ""),
									required: !0,
									maxLength: 160,
									placeholder: o("Ort / Region")
								})] }) })]
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kilometerstand (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "mileage",
									defaultValue: String(e?.details.mileage || ""),
									inputMode: "numeric",
									maxLength: 9,
									placeholder: "z. B. 85000"
								})] }) }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Letzte MFK (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "mfk",
									type: "date",
									defaultValue: String(e?.details.mfk || ""),
									max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
								})] }) })]
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Innenfarbe (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "interiorColour",
									defaultValue: String(e?.details.interiorColour || ""),
									maxLength: 160
								})] }) }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Aussenfarbe (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "exteriorColour",
									defaultValue: String(e?.details.exteriorColour || e?.details.colour || ""),
									maxLength: 160
								})] }) })]
							}),
							/* @__PURE__ */ (0, _.jsx)("input", {
								type: "hidden",
								name: "restoration",
								value: String(e?.details.restoration || "")
							}),
							/* @__PURE__ */ (0, _.jsx)("label", {
								htmlFor: "ad-description",
								children: o("Kurze Beschreibung / Besonderheiten *")
							}),
							/* @__PURE__ */ (0, _.jsx)("textarea", {
								id: "ad-description",
								name: "description",
								value: y,
								onChange: (e) => b(e.target.value),
								rows: 5,
								required: !0,
								maxLength: 5e3,
								placeholder: o("z. B. US-Modell, Overdrive, Hardtop, Restauration 2019, Belege vorhanden …")
							}),
							/* @__PURE__ */ (0, _.jsxs)("small", { children: [y.length, "/5000 Zeichen"] }),
							/* @__PURE__ */ (0, _.jsxs)("h3", {
								className: "market-step",
								children: [/* @__PURE__ */ (0, _.jsx)("span", { children: "2" }), o("Preis")]
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsxs)("label", {
									htmlFor: "ad-price",
									children: [o("Preis in CHF"), m === "request" ? " (nicht erforderlich)" : " *"]
								}), /* @__PURE__ */ (0, _.jsx)("input", {
									id: "ad-price",
									name: "price",
									inputMode: "decimal",
									value: u,
									onChange: (e) => d(e.target.value),
									required: m !== "request",
									disabled: m === "request",
									maxLength: 11,
									placeholder: "z. B. 38000"
								})] }), /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Preisangabe"), /* @__PURE__ */ (0, _.jsxs)("select", {
									value: m,
									onChange: (e) => g(e.target.value),
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
							})
						] }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
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
								value: c,
								onChange: (e) => l(e.target.value),
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
								value: y,
								onChange: (e) => b(e.target.value),
								rows: 5,
								required: !0,
								maxLength: 5e3,
								placeholder: "Was bieten Sie an? Zustand, passende Modelle, Abholung oder Versand …"
							}),
							/* @__PURE__ */ (0, _.jsxs)("small", { children: [y.length, "/5000 Zeichen"] }),
							/* @__PURE__ */ (0, _.jsxs)("h3", {
								className: "market-step",
								children: [/* @__PURE__ */ (0, _.jsx)("span", { children: "2" }), o("Angaben zum Fahrzeug / Teil")]
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Standort *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "location",
									defaultValue: String(e?.details.location || (!e && !G ? t?.contact?.city : "") || ""),
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
							x === "Fahrzeuge" ? /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Modell *"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "model",
								defaultValue: String(e?.details.model || ""),
								required: !0,
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: e
								}, e))]
							})] }) : /* @__PURE__ */ (0, _.jsxs)("fieldset", {
								className: "market-model-options",
								children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Passende Modelle (optional)") }), R.map((t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
									type: "checkbox",
									name: "models[]",
									value: t,
									defaultChecked: (Array.isArray(e?.details.models) ? e.details.models : [e?.details.model]).includes(t)
								}), t] }, t))]
							}),
							x === "Fahrzeuge" ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
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
							x === "Teile" && /* @__PURE__ */ (0, _.jsxs)("label", {
								htmlFor: "ad-parts",
								children: [
									"Enthaltene Teile (optional)",
									/* @__PURE__ */ (0, _.jsx)("textarea", {
										id: "ad-parts",
										name: "parts",
										value: C,
										onChange: (e) => w(e.target.value),
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
							x !== "Fahrzeuge" && /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "market-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Angebotsart"), /* @__PURE__ */ (0, _.jsxs)("select", {
									value: f,
									onChange: (e) => p(e.target.value),
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
									value: m,
									onChange: (e) => g(e.target.value),
									disabled: f !== "sale",
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
										children: [o("Preis in CHF"), f === "sale" && m !== "request" ? " *" : " (nicht erforderlich)"]
									}),
									/* @__PURE__ */ (0, _.jsx)("input", {
										id: "ad-price",
										name: "price",
										inputMode: "decimal",
										value: u,
										onChange: (e) => d(e.target.value),
										required: f === "sale" && m !== "request",
										disabled: f !== "sale" || m === "request",
										maxLength: 11,
										placeholder: "z. B. 250.00"
									}),
									x !== "Fahrzeuge" && /* @__PURE__ */ (0, _.jsx)("small", { children: "CHF 0 = kostenlos abzugeben" })
								] }), x === "Fahrzeuge" ? /* @__PURE__ */ (0, _.jsx)("div", { children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Preisangabe"), /* @__PURE__ */ (0, _.jsxs)("select", {
									value: m,
									onChange: (e) => g(e.target.value),
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
									value: x,
									onChange: (e) => S(e.target.value),
									children: (n === "Fahrzeuge" ? ["Fahrzeuge"] : ge.filter((e) => e !== "Fahrzeuge")).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
										value: e,
										children: o(e)
									}, e))
								})] })]
							})
						] }),
						/* @__PURE__ */ (0, _.jsxs)("h3", {
							className: "market-step",
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", { children: x === "Fahrzeuge" ? 3 : 4 }),
								o("Bilder"),
								/* @__PURE__ */ (0, _.jsx)("small", { children: o("optional, das erste Bild ist das Titelbild") })
							]
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `market-dropzone ${P ? "is-dragging" : ""}`,
							onDragOver: (e) => {
								e.preventDefault(), L || F(!0);
							},
							onDragLeave: () => F(!1),
							onDrop: (e) => {
								e.preventDefault(), F(!1), L || q(Array.from(e.dataTransfer.files));
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
										q(Array.from(e.target.files || [])), e.target.value = "";
									}
								}),
								/* @__PURE__ */ (0, _.jsx)("small", {
									id: "ad-images-hint",
									children: "Optional · bis zu 5 Bilder · JPG, PNG, WebP · je 20 MB"
								})
							]
						}),
						U && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "market-error",
							role: "alert",
							children: U
						}),
						e && /* @__PURE__ */ (0, _.jsx)("div", {
							className: "market-image-previews",
							children: e.imageIds.map((t, n) => T.includes(t) && /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: e.images[n],
								alt: e.title,
								width: 180,
								height: 140
							}), /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								"aria-label": o("Bild entfernen"),
								onClick: () => E((e) => e.filter((e) => e !== t)),
								children: "×"
							})] }, t))
						}),
						!!j.length && /* @__PURE__ */ (0, _.jsx)("div", {
							className: "market-image-previews",
							children: j.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [
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
										URL.revokeObjectURL(e.url), N.current.delete(e.url), M((t) => t.filter((t) => t.url !== e.url)), W("");
									},
									children: "×"
								})
							] }, e.url))
						}),
						/* @__PURE__ */ (0, _.jsxs)("details", {
							className: "market-more",
							open: x === "Fahrzeuge" || void 0,
							children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o(x === "Fahrzeuge" ? "PDF-Dokument (optional, max. 1)" : "Weitere Angaben (optional): PDF-Anhänge") }), /* @__PURE__ */ (0, _.jsxs)("section", { children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o(x === "Fahrzeuge" ? "PDF auswählen" : "PDF-Anhänge (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "file",
									accept: "application/pdf,.pdf",
									multiple: x !== "Fahrzeuge",
									onChange: (e) => {
										let t = Array.from(e.target.files || []);
										e.target.value = "";
										let n = x === "Fahrzeuge" ? 1 : 3;
										if (t.length + D.length + k.length > n || t.some((e) => e.size > 10 * 1024 * 1024 || !e.size || !e.name.toLowerCase().endsWith(".pdf"))) {
											W(o(x === "Fahrzeuge" ? "Bitte ein PDF mit maximal 10 MB auswählen." : "Bitte höchstens drei PDFs mit je maximal 10 MB auswählen."));
											return;
										}
										W(""), O((e) => [...e, ...t]);
									}
								})] }),
								/* @__PURE__ */ (0, _.jsx)("small", { children: o(x === "Fahrzeuge" ? "Ein PDF bis 10 MB, z. B. Fahrzeugausweis-Kopie oder Restaurationsbericht. Download nur für Mitglieder." : "Bis zu drei PDFs, je 10 MB. Download nur für berechtigte Mitglieder.") }),
								(e?.documents || []).filter((e) => k.includes(e.key)).map((e) => /* @__PURE__ */ (0, _.jsxs)("p", { children: [
									e.name,
									" ",
									/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "market-text-button",
										onClick: () => A((t) => t.filter((t) => t !== e.key)),
										children: o("Entfernen")
									})
								] }, e.key)),
								D.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("p", { children: [
									e.name,
									" ",
									/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "market-text-button",
										onClick: () => O((e) => e.filter((e, n) => n !== t)),
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
				V && /* @__PURE__ */ (0, _.jsx)("p", {
					ref: ne,
					tabIndex: -1,
					className: "market-error",
					role: "alert",
					children: V
				}),
				ee ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-discard",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", { children: "Ungespeichertes Inserat verwerfen?" }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							onClick: () => te(!1),
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
						disabled: L,
						onClick: le,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						type: "submit",
						disabled: L,
						children: o(L ? "Wird gesendet …" : "Absenden")
					})]
				})
			]
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: "Anmeldung wird geprüft …"
		})
	});
}
function Ee({ ad: e, session: t, close: n, sold: r, edit: i }) {
	let [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), m = (0, h.useRef)(crypto.randomUUID()), [g, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(!1), [S, C] = (0, h.useState)(!1), w = t?.contact;
	return /* @__PURE__ */ (0, _.jsxs)(X, {
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
				children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [e.category, e.sold ? " · Verkauft" : ""] }), /* @__PURE__ */ (0, _.jsx)("strong", { children: _e(e) })]
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
					mfk: "Letzte MFK",
					exteriorColour: "Aussenfarbe",
					interiorColour: "Innenfarbe",
					colour: "Farbe",
					partCategory: "Teilebereich",
					restoration: "Restaurationsarbeiten"
				}).map(([t, n]) => e.details[t] ? /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: n }), /* @__PURE__ */ (0, _.jsx)("dd", { children: t === "model" && Array.isArray(e.details.models) ? e.details.models.join(", ") : e.details[t] })] }, t) : null)
			}),
			e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(J, { html: e.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", {
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
			(e.mine || e.canReview) && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-actions market-manage",
				children: [/* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					disabled: f,
					onClick: i,
					children: o(e.mine ? "Inserat bearbeiten" : "Inserat bearbeiten (Moderation)")
				}), e.canReview && (S ? /* @__PURE__ */ (0, _.jsxs)("span", {
					className: "market-delete-confirm",
					children: [
						o("Inserat in den Papierkorb verschieben?"),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary is-danger",
							disabled: f,
							onClick: async () => {
								p(!0), d("");
								try {
									let i = new FormData();
									i.set("operation", "delete"), i.set("id", String(e.id)), await Ce(i, t?.marketplaceNonce || ""), r(), n();
								} catch (e) {
									d(e.message);
								} finally {
									p(!1);
								}
							},
							children: o("Ja, verschieben")
						}),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: f,
							onClick: () => C(!1),
							children: o("Abbrechen")
						})
					]
				}) : /* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-text-button",
					disabled: f,
					onClick: () => C(!0),
					children: o("Inserat löschen")
				}))]
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
				href: xe,
				children: o("Zum Herunterladen anmelden")
			})] }),
			(e.canReview || e.mine) && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o(e.status === "publish" ? "Veröffentlicht: Auch Nichtmitglieder können dieses Inserat sehen." : e.status === "pending" ? "In Prüfung: Die öffentliche Freigabe steht noch aus." : "Entwurf / abgelehnt: Dieses Inserat ist nicht öffentlich. Du kannst es bearbeiten und erneut einreichen.")
			}),
			e.canReview && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o("Moderation: Freigeben macht das Inserat öffentlich. Ablehnen setzt es als nicht öffentlichen Entwurf zurück.")
			}),
			(e.canReview || e.mine) && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "club-actions",
				"aria-label": o(e.canReview ? "Moderation" : "Inserat verwalten"),
				children: (e.canReview ? ["approve", "reject"] : ["withdraw", "renew"]).map((n) => /* @__PURE__ */ (0, _.jsx)("button", {
					disabled: f,
					className: "club-secondary",
					onClick: async () => {
						p(!0);
						try {
							let i = new FormData();
							i.set("operation", n), i.set("id", String(e.id)), await Ce(i, t?.marketplaceNonce || ""), r();
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
				children: b ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsx)("p", { children: "Als verkauft markieren? Das Inserat bleibt unter «Nur meine Inserate» sichtbar." }),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-cancel",
						disabled: f,
						onClick: () => x(!1),
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
								await Ce(n, t?.marketplaceNonce || ""), r();
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
					onClick: () => x(!0),
					children: o("Als verkauft markieren")
				})
			}) : /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "market-seller-contact",
				onSubmit: async (n) => {
					n.preventDefault(), p(!0), d("");
					let r = new FormData(n.currentTarget);
					r.set("requestId", m.current), r.set("operation", "contact"), r.set("id", String(e.id));
					try {
						y((await Ce(r, t?.marketplaceNonce || await Se({ operation: "config" }).then((e) => e.nonce) || "")).warning || ""), l(!0);
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
					c ? /* @__PURE__ */ (0, _.jsxs)("p", {
						role: "status",
						children: [o("Ihre Anfrage wurde an den Verkäufer gesendet."), g && /* @__PURE__ */ (0, _.jsxs)("span", { children: [" ", g] })]
					}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						w && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "market-contact-hint",
							children: o("Deine Angaben aus dem Mitgliederprofil sind eingesetzt und können angepasst werden.")
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "market-contact-grid",
							children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Name *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "name",
									required: !0,
									maxLength: 120,
									autoComplete: "name",
									defaultValue: w?.name || ""
								})] }),
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("E-Mail-Adresse *"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "email",
									type: "email",
									required: !0,
									maxLength: 254,
									autoComplete: "email",
									defaultValue: w?.email || ""
								})] }),
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Telefon (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									name: "phone",
									type: "tel",
									maxLength: 40,
									autoComplete: "tel",
									defaultValue: w?.phone || ""
								})] })
							]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachricht *"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							name: "message",
							required: !0,
							maxLength: 2e3,
							rows: 4,
							placeholder: o("Ist das Inserat noch verfügbar? …")
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
//#region app/components/AgendaSlider.tsx
var De = "(prefers-reduced-motion: reduce)", Oe = (e) => {
	let t = matchMedia(De);
	return t.addEventListener("change", e), () => t.removeEventListener("change", e);
}, ke = (e) => (document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e));
function Ae() {
	let { values: e } = q(), { language: t } = n(), r = (e.agenda?.slides ?? []).filter((e) => e.url), i = (0, h.useSyncExternalStore)(Oe, () => matchMedia(De).matches, () => !0), a = (0, h.useSyncExternalStore)(ke, () => !document.hidden, () => !1), [s, c] = (0, h.useState)(0), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(!1), p = (0, h.useRef)(null), m = r.length, g = m ? s % m : 0;
	if ((0, h.useEffect)(() => {
		if (i || l || d || !a || m < 2) return;
		let e = window.setTimeout(() => c((e) => (e + 1) % m), 6e3);
		return () => window.clearTimeout(e);
	}, [
		i,
		l,
		d,
		a,
		m,
		s
	]), !m) return null;
	let y = (e) => c((g + e + m) % m), b = (e) => t === "fr" && e.altFr ? e.altFr : e.alt;
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "agenda-slider",
		"aria-roledescription": "carousel",
		"aria-label": o("Anlässe im Überblick"),
		onKeyDown: (e) => {
			e.key === "ArrowLeft" && (e.preventDefault(), y(-1)), e.key === "ArrowRight" && (e.preventDefault(), y(1));
		},
		onMouseEnter: () => u(!0),
		onMouseLeave: () => u(!1),
		onFocusCapture: () => f(!0),
		onBlurCapture: (e) => {
			e.currentTarget.contains(e.relatedTarget) || f(!1);
		},
		children: [/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "agenda-slider-stage",
			onPointerDown: (e) => {
				!e.isPrimary || e.button !== 0 || e.target.closest("button,a") || (p.current = e.clientX, e.currentTarget.setPointerCapture(e.pointerId));
			},
			onPointerUp: (e) => {
				let t = p.current;
				if (p.current = null, t === null) return;
				let n = e.clientX - t;
				Math.abs(n) > 40 && y(n < 0 ? 1 : -1);
			},
			onPointerCancel: () => {
				p.current = null;
			},
			children: [r.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("figure", {
				className: `agenda-slide${t === g ? " is-active" : ""}`,
				"aria-roledescription": "slide",
				"aria-label": `${t + 1} / ${m}`,
				"aria-hidden": t !== g,
				children: [/* @__PURE__ */ (0, _.jsx)("div", {
					className: "agenda-slide-backdrop",
					style: { backgroundImage: `url("${Y(e.url)}")` },
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, _.jsx)(v, {
					src: Y(e.url),
					alt: b(e),
					width: 1600,
					height: 1130,
					priority: t === 0,
					loading: t === 0 ? void 0 : "lazy",
					draggable: !1
				})]
			}, e.url + t)), m > 1 && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
				type: "button",
				className: "agenda-slider-arrow is-prev",
				onClick: () => y(-1),
				"aria-label": o("Vorheriges Bild"),
				children: "‹"
			}), /* @__PURE__ */ (0, _.jsx)("button", {
				type: "button",
				className: "agenda-slider-arrow is-next",
				onClick: () => y(1),
				"aria-label": o("Nächstes Bild"),
				children: "›"
			})] })]
		}), /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "agenda-slider-controls",
			children: [m > 1 && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "agenda-slider-dots",
				role: "group",
				"aria-label": o("Bild wählen"),
				children: r.map((e, t) => /* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					"aria-label": b(e) || `${o("Bild")} ${t + 1}`,
					"aria-current": t === g,
					onClick: () => c(t)
				}, e.url + t))
			}), /* @__PURE__ */ (0, _.jsx)("a", {
				href: Y(r[g].url),
				target: "_blank",
				rel: "noopener noreferrer",
				children: o("Plakat vergrössern")
			})]
		})]
	});
}
//#endregion
//#region app/components/AgendaPage.tsx
var je = {
	information: "Details",
	scheduled: "Bald offen",
	open: "Anmelden",
	closed: "Geschlossen",
	full: "Ausgebucht",
	waiting: "Warteliste"
}, Me = (e) => e ? new Date(e).toLocaleDateString("de-CH") : "–", Ne = (e) => e.scope?.slug === "region" || e.region ? "Region" : e.scope?.slug === "external" ? "Extern" : "Club";
function Pe({ location: e }) {
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
function Fe({ event: e, memberAccess: t }) {
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
function Ie({ events: e, eventsState: t, retryEvents: r, openEvent: i, memberAccess: a }) {
	let { language: s } = n(), [c, l] = (0, h.useState)(1), [u, d] = (0, h.useState)(1), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)("12"), { text: v } = q(), [b, x] = (0, h.useState)(""), [S, C] = (0, h.useState)([]), [w, T] = (0, h.useState)(""), [E, D] = (0, h.useState)(!0), [O, k] = (0, h.useState)(0);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return D(!0), T(""), fetch(`${y}/?rest_route=/strc/v1/events&view=past&limit=20&page=${c}&months=${m}&scope=${b}&language=${s}`, {
			signal: e.signal,
			cache: "no-store"
		}).then(async (e) => {
			if (!e.ok) throw Error(o("Vergangene Termine konnten nicht geladen werden."));
			return await e.json();
		}).then((t) => {
			e.signal.aborted || (C((e) => c === 1 ? t.events : [...e, ...t.events]), d(t.pages), p(t.total));
		}).catch((t) => {
			e.signal.aborted || T(t.message);
		}).finally(() => {
			e.signal.aborted || D(!1);
		}), () => e.abort();
	}, [
		O,
		c,
		m,
		b,
		s
	]);
	let A = v("agenda.intro").split("|").map((e) => e.trim().replace("Club-Anlässe", "Clubanlässe")), j = [
		["", "Alle Events"],
		["club-national", A.length === 3 ? A[0] : v("agenda.clubTitle")],
		["region", A.length === 3 ? A[1] : v("agenda.regionalTitle")],
		["external", A.length === 3 ? A[2] : v("agenda.externalTitle")]
	], M = (e, t = !1) => e.filter((e) => !b || e.scope?.slug === b).sort((e, n) => (Date.parse(e.startAt) - Date.parse(n.startAt)) * (t ? -1 : 1)), N = M(e), P = M(S, !0);
	function F(e, t = !1) {
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
							children: Me(e.startAt)
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Veranstaltung",
							children: /* @__PURE__ */ (0, _.jsx)("button", {
								className: "agenda-event-title",
								onClick: () => i(e),
								children: e.title
							})
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Bereich",
							title: e.region?.name || void 0,
							children: o(Ne(e))
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Ort",
							children: /* @__PURE__ */ (0, _.jsx)(Pe, { location: e.location })
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
							children: Me(e.registrationCloseAt)
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Teilnehmende",
							children: /* @__PURE__ */ (0, _.jsx)(Fe, {
								event: e,
								memberAccess: a
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
								children: e.externalRegistrationUrl ? "Extern anmelden ↗" : je[e.registrationStatus]
							}) : /* @__PURE__ */ (0, _.jsx)("button", {
								className: "agenda-status",
								onClick: () => i(e),
								children: t ? "Rückblick" : je[e.registrationStatus]
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
				/* @__PURE__ */ (0, _.jsx)("h1", { children: v("agenda.title") }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: A.length === 3 ? A.join(" · ") : v("agenda.intro") })
			]
		}),
		/* @__PURE__ */ (0, _.jsx)(Ae, {}),
		/* @__PURE__ */ (0, _.jsx)(he, { documentKey: "agenda" }),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content agenda-overview",
			children: [
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "agenda-toolbar",
					children: /* @__PURE__ */ (0, _.jsx)("div", {
						className: "agenda-tabs",
						role: "group",
						"aria-label": "Veranstaltungsbereich",
						children: j.map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("button", {
							"aria-pressed": b === e,
							onClick: () => {
								x(e), l(1), C([]);
							},
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
							onClick: r,
							children: o("Erneut laden")
						})
					]
				}) : N.length ? F(N) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state",
					children: o("Keine passenden kommenden Termine.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("details", {
					className: "agenda-past",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
							o("Vergangene Veranstaltungen"),
							" (",
							f,
							")"
						] }),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "agenda-history-period",
							children: [o("Zeitraum"), /* @__PURE__ */ (0, _.jsx)("select", {
								value: m,
								onChange: (e) => {
									g(e.target.value), l(1), C([]);
								},
								children: [
									["12", "Letzte zwölf Monate"],
									["24", "Letzte zwei Jahre"],
									["0", "Alle verfügbaren vergangenen Termine"]
								].map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(t)
								}, e))
							})]
						}),
						P.length > 0 && F(P, !0),
						E ? /* @__PURE__ */ (0, _.jsx)("p", {
							role: "status",
							children: o("Wird geladen …")
						}) : w ? /* @__PURE__ */ (0, _.jsxs)("p", {
							role: "alert",
							children: [w, /* @__PURE__ */ (0, _.jsx)("button", {
								onClick: () => {
									D(!0), k((e) => e + 1);
								},
								children: o("Erneut laden")
							})]
						}) : P.length ? null : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine passenden vergangenen Veranstaltungen.") }),
						!E && !w && c < u && /* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							onClick: () => l((e) => e + 1),
							children: o("Weitere vergangene Termine laden")
						})
					]
				})
			]
		})
	] });
}
//#endregion
//#region app/components/RichEditor.tsx
var Le = `${window.strcSettings.assetBase ?? ""}/fonts/StrcSans`, Re = `@font-face{font-family:"STRC Sans";src:url(${Le}-Regular.ttf) format("truetype");font-weight:400;size-adjust:109%}@font-face{font-family:"STRC Sans";src:url(${Le}-Bold.ttf) format("truetype");font-weight:700;size-adjust:109%}@font-face{font-family:"STRC Sans";src:url(${Le}-Italic.ttf) format("truetype");font-weight:400;font-style:italic;size-adjust:109%}`;
function ze({ label: e, value: t, onChange: n, disabled: r = !1 }) {
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
						content_style: Re + "body{font-family:\"STRC Sans\",Arial,sans-serif;font-size:18px;line-height:1.65;color:#13202b}img{max-width:100%;height:auto}p,h2,h3,h4,span.strc-tab{white-space:pre-wrap;tab-size:8}",
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
								text: "Link",
								tooltip: "Link zu einer Website oder einem Forum einfügen / ändern",
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
//#region app/components/RouteHistory.ts
var Be = (e) => e && e !== "#" ? e : "#", Ve = "strcRouteVisit";
function He(e) {
	let t = [], n = /* @__PURE__ */ new Set(), r = -1, i = 0, a = e.crypto.randomUUID(), o = [], s = !1, c = () => {
		o.forEach((t) => e.clearTimeout(t)), o = [], s = !1;
	}, l = () => typeof e.history.state == "object" && e.history.state !== null ? e.history.state : {}, u = (t) => e.history.replaceState({
		...l(),
		[Ve]: t
	}, "");
	function d() {
		let d = Be(e.location.hash), f = l()[Ve];
		if (t[r]?.id === f && t[r]?.hash === d) return;
		c();
		let p = t.findIndex((e) => e.id === f && e.hash === d);
		if (p >= 0) {
			r = p;
			let n = t[r];
			s = !0;
			for (let i of [
				0,
				120,
				400
			]) o.push(e.setTimeout(() => {
				t[r] === n && s && e.scrollTo({
					top: n.y,
					behavior: "instant"
				});
			}, i));
			o.push(e.setTimeout(() => {
				s = !1, o = [];
			}, 450));
		} else {
			t.splice(r + 1);
			let e = {
				id: a + ":" + ++i,
				hash: d,
				y: 0
			};
			t.push(e), r = t.length - 1, u(e.id);
		}
		n.forEach((e) => e());
	}
	e.history.scrollRestoration = "manual", d(), e.addEventListener("scroll", () => {
		!s && t[r] && (t[r].y = e.scrollY);
	}, { passive: !0 }), e.addEventListener("hashchange", d), e.addEventListener("popstate", d);
	for (let t of [
		"wheel",
		"touchstart",
		"pointerdown",
		"keydown"
	]) e.addEventListener(t, c, { passive: !0 });
	return {
		replace: (i) => {
			c(), e.history.replaceState(l(), "", i), t[r].hash = Be(e.location.hash), t[r].y = e.scrollY, n.forEach((e) => e());
		},
		previous: () => t[r - 1]?.hash || "",
		subscribe: (e) => (n.add(e), () => {
			n.delete(e);
		})
	};
}
var Ue;
function We() {
	return !Ue && typeof window < "u" && (Ue = He(window)), Ue;
}
var Ge = () => We()?.previous() || "", Ke = (e) => We()?.subscribe(e) || (() => {}), qe = (e) => We()?.replace(e), Je = "strc_mail_templates";
function Ye() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(!1), l = (e) => {
		s && !window.confirm(o("Nicht gespeicherte Eingaben verwerfen?")) || (c(!1), e());
	}, [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)("templates"), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)(0);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(Je, { operation: "list" }, e.signal).then((e) => {
			t(e.templates), r(e.nonce), a(e.email);
		}).catch((t) => {
			e.signal.aborted || g(t.message);
		}), () => e.abort();
	}, [v]);
	let b = e?.find((e) => e.key === u), x = e ? [...new Set(e.map((e) => e.group))] : [];
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "mail-templates",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("E-Mail-Vorlagen") }),
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o("Betreff und Text der automatischen Mails auf Deutsch und Französisch. Platzhalter wie {{vorname}} füllt die Website beim Versand. Ohne Anpassung gelten die Standardtexte.")
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-tabs mail-tabs",
				role: "tablist",
				children: [/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": f === "templates",
					onClick: () => l(() => p("templates")),
					children: o("Vorlagen")
				}), /* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": f === "log",
					onClick: () => l(() => p("log")),
					children: o("Versandprotokoll")
				})]
			}),
			m && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				className: "collection-state error",
				children: m
			}),
			f === "log" ? /* @__PURE__ */ (0, _.jsx)(Ze, {}) : e ? b ? /* @__PURE__ */ (0, _.jsx)(Xe, {
				template: b,
				nonce: n,
				email: i,
				onDirty: c,
				back: () => l(() => d("")),
				saved: (e) => {
					t(e);
				}
			}, b.key + ":" + v) : x.map((t) => /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "mail-group",
				children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o(t) }), /* @__PURE__ */ (0, _.jsx)("ul", {
					className: "mail-list",
					children: e.filter((e) => e.group === t).map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "editorial-card",
						onClick: () => d(e.key),
						children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.label) }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [
							o("An"),
							": ",
							o(e.recipient),
							e.customized ? " · " + o("angepasst") : "",
							e.welcome && e.enabled === !1 ? " · " + o("nicht aktiv") : ""
						] })]
					}) }, e.key))
				})]
			}, t)) : !m && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Vorlagen werden geladen …")
			}),
			b && f === "templates" && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("button", {
				type: "button",
				className: "market-text-button",
				onClick: () => l(() => {
					d(""), y((e) => e + 1);
				}),
				children: o("← Alle Vorlagen")
			}) })
		]
	});
}
function Xe({ template: e, nonce: t, email: n, back: r, saved: i, onDirty: a }) {
	let [s, c] = (0, h.useState)({
		de: { ...e.de },
		fr: { ...e.fr }
	}), [l, u] = (0, h.useState)(!!e.enabled), [d, f] = (0, h.useState)("de"), [p, m] = (0, h.useState)(!1), [g, v] = (0, h.useState)(""), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(null), C = JSON.stringify(s) !== JSON.stringify({
		de: e.de,
		fr: e.fr
	}) || e.welcome && l !== !!e.enabled;
	(0, h.useEffect)(() => {
		a(C);
	}, [C, a]), (0, h.useEffect)(() => {
		if (!C) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [C]);
	let E = s[d], D = (e, t) => {
		c((n) => ({
			...n,
			[d]: {
				...n[d],
				[e]: t
			}
		})), S(null), v("");
	}, O = e.woo ? [] : e.required.filter((e) => !(E.subject + E.body).includes("{{" + e + "}}"));
	async function k(n) {
		m(!0), b(""), v("");
		try {
			let r = await w(Je, t, T({
				operation: n,
				key: e.key,
				revision: e.revision,
				language: d,
				values: JSON.stringify(s),
				enabled: l ? "1" : "0"
			}));
			if (n === "preview") {
				S({
					subject: r.subject || "",
					heading: r.heading || "",
					body: r.body || "",
					html: r.html || ""
				});
				return;
			}
			if (r.templates) {
				i(r.templates);
				let t = r.templates.find((t) => t.key === e.key);
				t && (c({
					de: { ...t.de },
					fr: { ...t.fr }
				}), u(!!t.enabled));
			}
			v(r.message || "");
		} catch (e) {
			b(e.message);
		} finally {
			m(!1);
		}
	}
	let A = (e) => D("body", E.body + (E.body.endsWith(" ") || !E.body ? "" : " ") + "{{" + e + "}}");
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "mail-form",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("fieldset", {
				disabled: p,
				children: [
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "eyebrow",
						children: o(e.group)
					}),
					/* @__PURE__ */ (0, _.jsx)("h3", { children: o(e.label) }),
					/* @__PURE__ */ (0, _.jsxs)("p", {
						className: "club-hint",
						children: [
							o("An"),
							": ",
							o(e.recipient)
						]
					}),
					e.note && /* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-hint",
						children: o(e.note)
					}),
					e.welcome && /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "application-consent",
						children: [/* @__PURE__ */ (0, _.jsx)("input", {
							type: "checkbox",
							checked: l,
							onChange: (e) => u(e.target.checked)
						}), o("Willkommensmail aktiv")]
					}),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "mail-language",
						role: "group",
						"aria-label": o("Sprache"),
						children: ["de", "fr"].map((e) => /* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: d === e ? "market-primary" : "club-secondary",
							"aria-pressed": d === e,
							onClick: () => {
								f(e), S(null);
							},
							children: e === "de" ? "Deutsch" : "Français"
						}, e))
					}),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Betreff"), /* @__PURE__ */ (0, _.jsx)("input", {
						value: E.subject,
						maxLength: 200,
						onChange: (e) => D("subject", e.target.value),
						placeholder: e.woo ? o("leer = WooCommerce-Standard") : ""
					})] }),
					e.woo && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Überschrift in der Mail"), /* @__PURE__ */ (0, _.jsx)("input", {
						value: E.heading,
						maxLength: 200,
						onChange: (e) => D("heading", e.target.value),
						placeholder: o("leer = WooCommerce-Standard")
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o(e.woo ? "Text unter der Bestellung" : "Text"), /* @__PURE__ */ (0, _.jsx)("textarea", {
						rows: 12,
						value: E.body,
						maxLength: 8e3,
						onChange: (e) => D("body", e.target.value),
						placeholder: e.woo ? o("leer = WooCommerce-Standard") : ""
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("p", {
						className: "mail-placeholders",
						children: [
							o("Platzhalter (anklicken zum Einfügen)"),
							": ",
							e.placeholders.map((t) => /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "mail-chip" + (e.required.includes(t) ? " is-required" : ""),
								onClick: () => A(t),
								children: "{{" + t + "}}"
							}, t))
						]
					}),
					O.length > 0 && /* @__PURE__ */ (0, _.jsxs)("p", {
						role: "alert",
						className: "club-notice",
						children: [
							o("Pflichtplatzhalter fehlt"),
							": ",
							O.map((e) => "{{" + e + "}}").join(", ")
						]
					}),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "market-primary",
								disabled: p || O.length > 0,
								onClick: () => void k("save"),
								children: o(p ? "Wird gespeichert …" : "Speichern")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: p,
								onClick: () => void k("preview"),
								children: o("Vorschau")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: p || O.length > 0 || !n,
								onClick: () => void k("test"),
								children: o("Testmail an mich")
							}),
							e.customized && /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "market-text-button",
								disabled: p,
								onClick: () => {
									window.confirm(o("Standardtext wiederherstellen? Deine Anpassung (DE und FR) wird verworfen.")) && k("reset");
								},
								children: o("Standardtext wiederherstellen")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "market-text-button",
								onClick: r,
								children: o("Abbrechen")
							})
						]
					}),
					n && /* @__PURE__ */ (0, _.jsxs)("p", {
						className: "club-hint",
						children: [
							o("Die Testmail geht nur an"),
							" ",
							n,
							"."
						]
					})
				]
			}),
			g && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				className: "club-notice",
				children: o(g)
			}),
			y && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				className: "collection-state error",
				children: y
			}),
			x && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "mail-preview",
				"aria-label": o("Vorschau"),
				children: [
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						/* @__PURE__ */ (0, _.jsxs)("strong", { children: [o("Betreff"), ":"] }),
						" ",
						x.subject || o("(WooCommerce-Standard)")
					] }),
					e.woo && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
						/* @__PURE__ */ (0, _.jsxs)("strong", { children: [o("Überschrift"), ":"] }),
						" ",
						x.heading || o("(WooCommerce-Standard)")
					] }),
					x.html ? /* @__PURE__ */ (0, _.jsx)("iframe", {
						className: "mail-preview-frame",
						title: o("Vorschau"),
						sandbox: "",
						srcDoc: x.html
					}) : /* @__PURE__ */ (0, _.jsx)("pre", { children: x.body || o("(WooCommerce-Standard)") })
				]
			})
		]
	});
}
function Ze() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)("");
	return (0, h.useEffect)(() => {
		let e = new AbortController(), r = setTimeout(() => {
			C(Je, {
				operation: "log",
				search: n
			}, e.signal).then((e) => {
				t(e.entries), a("");
			}).catch((t) => {
				e.signal.aborted || a(t.message);
			});
		}, 250);
		return () => {
			clearTimeout(r), e.abort();
		};
	}, [n]), /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "mail-log",
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o("Datum, Art, Empfänger und Ergebnis der letzten 90 Tage – ohne Inhalte. Ältere Einträge werden automatisch gelöscht.")
			}),
			/* @__PURE__ */ (0, _.jsxs)("label", {
				className: "market-search",
				children: [o("Suche nach Empfänger oder Art"), /* @__PURE__ */ (0, _.jsx)("input", {
					type: "search",
					value: n,
					onChange: (e) => r(e.target.value)
				})]
			}),
			i && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: i
			}),
			!e && !i && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Wird geladen …")
			}),
			e && (e.length ? /* @__PURE__ */ (0, _.jsx)("div", {
				className: "mail-log-table",
				children: /* @__PURE__ */ (0, _.jsxs)("table", { children: [/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, _.jsx)("th", {
						scope: "col",
						children: o("Datum")
					}),
					/* @__PURE__ */ (0, _.jsx)("th", {
						scope: "col",
						children: o("Art")
					}),
					/* @__PURE__ */ (0, _.jsx)("th", {
						scope: "col",
						children: o("Empfänger")
					}),
					/* @__PURE__ */ (0, _.jsx)("th", {
						scope: "col",
						children: o("Ergebnis")
					})
				] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: e.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("tr", {
					className: e.status === "ok" ? "" : "is-failed",
					children: [
						/* @__PURE__ */ (0, _.jsx)("td", { children: new Date(e.at).toLocaleString("de-CH", {
							dateStyle: "short",
							timeStyle: "short"
						}) }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: o(e.type) }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.to }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.status === "ok" ? o("Vom Maildienst angenommen") : o("Fehler") + (e.error ? ": " + e.error : "") })
					]
				}, t)) })] })
			}) : /* @__PURE__ */ (0, _.jsx)("p", {
				className: "collection-state",
				children: o("Keine Einträge.")
			}))
		]
	});
}
//#endregion
//#region app/components/RoleAssignments.tsx
var Qe = {
	strc_registration_moderator: "Mitgliederverwaltung",
	strc_agenda_moderator: "Agenda-Moderator",
	strc_event_organiser: "Veranstaltungsorganisator",
	strc_regional_manager: "Regionalleiter",
	strc_forum_moderator: "Forum-Moderator",
	strc_gallery_moderator: "Galerie-Moderator",
	strc_marketplace_moderator: "Marktplatz-Moderator",
	strc_library_administrator: "Bibliotheksverwalter",
	strc_shop_manager: "Shopmanager",
	strc_treasurer: "Kassier",
	strc_administrator_editor: "Admin (bisher Redaktor)",
	strc_administrator: "Admin",
	strc_superadmin: "Superadmin (Redaktor)",
	strc_board_member: "Vorstand",
	strc_developer: "Webmaster",
	strc_moderator: "Bisherige Bereichszuständigkeit"
}, $e = {
	strc_superadmin: "Alle Admin-Rechte und ernennt die Admins.",
	strc_administrator: "Redaktion, Agenda, Forum, Galerie, Marktplatz, Bibliothek und Shop.",
	strc_developer: "Nur Technik: Konfiguration, Plugins, Fairgate-Abgleich.",
	strc_board_member: "Sieht alle Dokumente, auch Protokolle und Vorstandsunterlagen.",
	strc_registration_moderator: "Mitgliedsanträge, Paarmitgliedschaften, Willkommensmail.",
	strc_treasurer: "Zahlungen und Abrechnung der Anlässe, Shop-Kontrolle.",
	strc_regional_manager: "Regionalseite und Anlässe der gewählten Region.",
	strc_agenda_moderator: "Agenda verwalten: gewählte Regionen, ohne Auswahl clubweit. Keine Bearbeitung der Regionalseiten.",
	strc_event_organiser: "Nur die zugewiesenen Anlässe und ihre Anmeldungen.",
	strc_forum_moderator: "Themen prüfen, anheften, zusammenführen, Fachexperten.",
	strc_gallery_moderator: "Fotos prüfen, Alben und Mitgliederporträts pflegen.",
	strc_marketplace_moderator: "Inserate prüfen und bereinigen.",
	strc_library_administrator: "Dokumente prüfen, einordnen und ersetzen.",
	strc_shop_manager: "Artikel, Lager, Bestellungen und Direktverkäufe.",
	strc_moderator: "Frühere Zuteilung nach Bereichen; bitte durch eine Rolle ersetzen."
}, et = [
	{
		title: "Administration",
		roles: [
			"strc_superadmin",
			"strc_administrator",
			"strc_developer"
		]
	},
	{
		title: "Dokumentzugang",
		roles: ["strc_board_member"]
	},
	{
		title: "Mitglieder und Finanzen",
		hint: "Nur mit eigener Rolle, auch für Admins.",
		roles: ["strc_registration_moderator", "strc_treasurer"]
	},
	{
		title: "Agenda und Regionen",
		roles: [
			"strc_agenda_moderator",
			"strc_regional_manager",
			"strc_event_organiser"
		]
	},
	{
		title: "Community und Shop",
		roles: [
			"strc_forum_moderator",
			"strc_gallery_moderator",
			"strc_marketplace_moderator",
			"strc_library_administrator",
			"strc_shop_manager"
		]
	}
], tt = et.flatMap((e) => e.roles), nt = (e) => [
	"strc_agenda_moderator",
	"strc_regional_manager",
	"strc_event_organiser",
	"strc_moderator"
].includes(e), rt = [
	"strc_regional_manager",
	"strc_administrator",
	"strc_superadmin",
	"strc_library_administrator"
], it = (e) => e === "strc_board_member" ? "restricted" : rt.includes(e) ? "limited" : "open", at = (e) => e.some((e) => e.role === "strc_board_member") ? "Vorstand" : e.some((e) => rt.includes(e.role)) ? "Regional" : "Mitglied", ot = (e) => e.strc_superadmin ? [] : e.strc_administrator ? ["strc_superadmin", "strc_developer"] : [
	"strc_administrator",
	"strc_superadmin",
	"strc_developer"
], st = (e) => e === "strc_administrator" ? "Teilt der Superadmin zu" : ["strc_superadmin", "strc_developer"].includes(e) ? "Teilt der Webmaster zu" : "Nicht zuteilbar", ct = {
	strc_board_member: "is-board",
	strc_administrator: "is-admin",
	strc_superadmin: "is-admin",
	strc_developer: "is-admin",
	strc_registration_moderator: "is-members",
	strc_treasurer: "is-members"
}, lt = (e) => ({
	...e,
	assignments: e.assignments.map((e) => ({
		...e,
		regions: [...e.regions],
		areas: [...e.areas],
		assignedEvents: [...e.assignedEvents]
	}))
}), ut = (e) => JSON.stringify([...e].sort((e, t) => e.role.localeCompare(t.role)).map((e) => ({
	...e,
	regions: [...e.regions].sort(),
	assignedEvents: [...e.assignedEvents].sort(),
	areas: [...e.areas].sort()
})));
function dt({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(0), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(""), [S, E] = (0, h.useState)(""), D = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_editorial", { operation: "people" }, e.signal).then((e) => {
			n(e), i(null), y("");
		}).catch((t) => {
			e.signal.aborted || y(t.message);
		}), () => e.abort();
	}, [u]);
	let O = !!r && ut(r.assignments) !== a;
	function k(e) {
		O && !window.confirm(o("Ungespeicherte Änderungen verwerfen?")) || (l(""), i(lt(e)), s(ut(e.assignments)), x(""), y(""), E(""), requestAnimationFrame(() => D.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		})));
	}
	function A(e, t) {
		r && i({
			...r,
			assignments: r.assignments.map((n) => n.role === e ? {
				...n,
				...t
			} : n)
		});
	}
	function j(e, t) {
		r && (x(""), i({
			...r,
			assignments: t ? [...r.assignments, {
				role: e,
				regions: [],
				libraryAccess: it(e),
				assignedEvents: [],
				areas: []
			}] : r.assignments.filter((t) => t.role !== e)
		}));
	}
	async function M() {
		if (r) {
			if (r.assignments.find((e) => e.role === "strc_regional_manager" && !e.regions.length)) {
				y(o("Bitte für den Regionalleiter eine Region wählen."));
				return;
			}
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
				i(lt(a)), s(ut(a.assignments)), n((e) => e && {
					...e,
					users: e.users.map((e) => e.id === a.id ? a : e)
				}), x("Gespeichert.");
			} catch (e) {
				y(e.message);
			} finally {
				p(!1);
			}
		}
	}
	let N = c.trim().toLocaleLowerCase("de-CH"), P = (0, h.useMemo)(() => N.length < 2 || !t ? [] : t.users.filter((e) => `${e.name} ${e.city}`.toLocaleLowerCase("de-CH").includes(N)).slice(0, 8), [N, t]), F = (0, h.useMemo)(() => (t?.users.filter((e) => e.assignments.length > 0) || []).sort((e, t) => e.name.localeCompare(t.name, "de-CH")), [t]), I = (0, h.useMemo)(() => {
		let e = {};
		for (let t of F) for (let n of t.assignments) (e[n.role] ||= []).push(t);
		return e;
	}, [F]), L = (e) => t?.regions.find((t) => t.id === e)?.name || String(e);
	if (!t) return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "role-assignment-panel",
		children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Rollen und Zuständigkeiten") }), v ? /* @__PURE__ */ (0, _.jsxs)("p", {
			role: "alert",
			children: [
				o(v),
				" ",
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					onClick: () => d((e) => e + 1),
					children: o("Neu laden")
				})
			]
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Mitglieder werden geladen …")
		})]
	});
	let R = !!r && !r.assignments.some((e) => ot(t.roleOptions).includes(e.role)), z = r?.assignments.filter((e) => !tt.includes(e.role)) || [], B = (e) => {
		let n = r?.assignments.find((t) => t.role === e), i = !!t.roleOptions[e];
		if (!i && !n) return /* @__PURE__ */ (0, _.jsxs)("li", {
			className: "role-option is-locked",
			children: [/* @__PURE__ */ (0, _.jsx)("span", {
				className: "role-option-check",
				"aria-hidden": "true",
				children: "🔒"
			}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: o(Qe[e] || e) }),
				/* @__PURE__ */ (0, _.jsx)("small", { children: o($e[e] || "") }),
				/* @__PURE__ */ (0, _.jsx)("em", { children: o(st(e)) })
			] })]
		}, e);
		let a = t.events.filter((e) => !S || e.title.toLocaleLowerCase("de-CH").includes(S.toLocaleLowerCase("de-CH")));
		return /* @__PURE__ */ (0, _.jsxs)("li", {
			className: "role-option" + (n ? " is-on" : ""),
			children: [
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
					type: "checkbox",
					checked: !!n,
					disabled: !i || f || !R || !n && !r?.isMember,
					onChange: (t) => j(e, t.target.checked)
				}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [
					/* @__PURE__ */ (0, _.jsx)("strong", { children: o(Qe[e] || e) }),
					/* @__PURE__ */ (0, _.jsx)("small", { children: o($e[e] || "") }),
					!i && n && /* @__PURE__ */ (0, _.jsx)("em", { children: o(st(e)) })
				] })] }),
				n && nt(e) && /* @__PURE__ */ (0, _.jsxs)("fieldset", {
					className: "role-scope",
					disabled: !i || f || !R,
					children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o(e === "strc_regional_manager" ? "Region *" : "Region (optional)") }), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "role-scope-chips",
						children: t.regions.map((t) => /* @__PURE__ */ (0, _.jsxs)("label", {
							className: n.regions.includes(t.id) ? "is-on" : "",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: n.regions.includes(t.id),
								onChange: (r) => A(e, { regions: r.target.checked ? [...n.regions, t.id] : n.regions.filter((e) => e !== t.id) })
							}), t.name]
						}, t.id))
					})]
				}),
				n && e === "strc_event_organiser" && /* @__PURE__ */ (0, _.jsxs)("fieldset", {
					className: "role-scope",
					disabled: !i || f || !R,
					children: [
						/* @__PURE__ */ (0, _.jsxs)("legend", { children: [
							o("Zugewiesene Anlässe"),
							" (",
							n.assignedEvents.length,
							")"
						] }),
						t.events.length > 8 && /* @__PURE__ */ (0, _.jsx)("input", {
							type: "search",
							placeholder: o("Anlass suchen"),
							value: S,
							onChange: (e) => E(e.target.value)
						}),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "role-scope-list",
							children: a.map((t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: n.assignedEvents.includes(t.id),
								onChange: (r) => A(e, { assignedEvents: r.target.checked ? [...n.assignedEvents, t.id] : n.assignedEvents.filter((e) => e !== t.id) })
							}), t.title] }, t.id))
						}),
						/* @__PURE__ */ (0, _.jsx)("small", { children: o("Selbst erstellte Anlässe werden automatisch zugewiesen.") })
					]
				})
			]
		}, e);
	};
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "role-assignment-panel",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("header", {
				className: "role-head",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Rollen und Zuständigkeiten") }), /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Mitglied suchen, Rollen ankreuzen, speichern. Ein Mitglied kann mehrere Rollen haben.")
				})] }), /* @__PURE__ */ (0, _.jsx)("ol", {
					className: "role-ladder",
					"aria-label": o("Stufen"),
					children: [
						["Webmaster", "Technik"],
						["Superadmin", "ernennt Admins"],
						["Admin", "Administration"],
						["Moderatoren", "eigener Bereich"],
						["Mitglieder", "eigenes Profil"]
					].map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e) }), /* @__PURE__ */ (0, _.jsx)("span", { children: o(t) })] }, e))
				})]
			}),
			v && /* @__PURE__ */ (0, _.jsxs)("p", {
				className: "club-notice is-error",
				role: "alert",
				children: [
					o(v),
					" ",
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "market-text-button",
						onClick: () => {
							y(""), d((e) => e + 1);
						},
						disabled: f,
						children: o("Neu laden")
					})
				]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "role-layout",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "role-editor",
					ref: D,
					children: [/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "role-search",
						children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitglied suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
							type: "search",
							value: c,
							placeholder: o("Name oder Ort, mind. 2 Zeichen"),
							onChange: (e) => l(e.target.value),
							disabled: f
						})] }), N.length >= 2 && /* @__PURE__ */ (0, _.jsx)("ul", {
							className: "role-search-results",
							children: P.length ? P.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
								type: "button",
								onClick: () => k(e),
								children: [
									/* @__PURE__ */ (0, _.jsx)("strong", { children: e.name }),
									e.city && /* @__PURE__ */ (0, _.jsx)("span", { children: e.city }),
									e.assignments.length > 0 && /* @__PURE__ */ (0, _.jsxs)("em", { children: [
										e.assignments.length,
										" ",
										o(e.assignments.length === 1 ? "Rolle" : "Rollen")
									] })
								]
							}) }, e.id)) : /* @__PURE__ */ (0, _.jsx)("li", {
								className: "is-empty",
								children: o("Keine passenden Personen gefunden.")
							})
						})]
					}), r ? /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "role-person",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "role-person-head",
								children: [
									/* @__PURE__ */ (0, _.jsx)("span", {
										className: "role-avatar",
										"aria-hidden": "true",
										children: r.name.split(/\s+/).slice(0, 2).map((e) => e[0]).join("")
									}),
									/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: r.name }), /* @__PURE__ */ (0, _.jsxs)("p", { children: [
										r.city,
										r.city ? " · " : "",
										o("Bibliothek"),
										": ",
										/* @__PURE__ */ (0, _.jsx)("strong", { children: o(at(r.assignments)) })
									] })] }),
									/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "market-text-button",
										onClick: () => {
											(!O || window.confirm(o("Ungespeicherte Änderungen verwerfen?"))) && (i(null), x(""));
										},
										children: o("Schliessen")
									})
								]
							}),
							!r.isMember && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-notice",
								children: o("Kein aktives Mitgliedskonto: Rollen können erst mit Mitgliedschaft zugeteilt werden.")
							}),
							!R && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-notice",
								children: o("Die Rollen dieses Kontos verwaltet eine höhere Stufe (Superadmin oder Webmaster).")
							}),
							et.map((e) => /* @__PURE__ */ (0, _.jsxs)("section", {
								className: "role-group",
								children: [/* @__PURE__ */ (0, _.jsxs)("h4", { children: [o(e.title), e.hint && /* @__PURE__ */ (0, _.jsx)("small", { children: o(e.hint) })] }), /* @__PURE__ */ (0, _.jsx)("ul", { children: e.roles.map(B) })]
							}, e.title)),
							z.length > 0 && /* @__PURE__ */ (0, _.jsxs)("section", {
								className: "role-group",
								children: [/* @__PURE__ */ (0, _.jsx)("h4", { children: o("Bisherige Zuteilungen") }), /* @__PURE__ */ (0, _.jsx)("ul", { children: z.map((e) => /* @__PURE__ */ (0, _.jsx)("li", {
									className: "role-option is-on",
									children: /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "checkbox",
										checked: !0,
										disabled: f || !R || !t.roleOptions.strc_registration_moderator,
										onChange: () => j(e.role, !1)
									}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [
										/* @__PURE__ */ (0, _.jsx)("strong", { children: o(Qe[e.role] || e.role) }),
										/* @__PURE__ */ (0, _.jsx)("small", { children: o($e[e.role] || "Bitte durch eine aktuelle Rolle ersetzen.") }),
										e.areas.length > 0 && /* @__PURE__ */ (0, _.jsx)("small", { children: e.areas.map((e) => o(t.areas[e] || e)).join(", ") })
									] })] })
								}, e.role)) })]
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "role-actions",
								children: [
									/* @__PURE__ */ (0, _.jsx)("span", {
										role: "status",
										children: b ? "✓ " + o(b) : O ? o("Ungespeicherte Änderungen") : ""
									}),
									/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "club-secondary",
										disabled: !O || f,
										onClick: () => {
											let e = t.users.find((e) => e.id === r.id);
											e && (i(lt(e)), x(""));
										},
										children: o("Verwerfen")
									}),
									/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "market-primary",
										disabled: !O || f || !R,
										onClick: () => void M(),
										children: o(f ? "Wird gespeichert …" : "Speichern")
									})
								]
							})
						]
					}) : /* @__PURE__ */ (0, _.jsx)("div", {
						className: "role-empty",
						children: /* @__PURE__ */ (0, _.jsx)("p", { children: o("Wähle ein Mitglied über die Suche oder rechts in der Übersicht.") })
					})]
				}), /* @__PURE__ */ (0, _.jsxs)("aside", {
					className: "role-overview",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "role-overview-head",
							children: [/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
								o("Wer macht was"),
								" · ",
								F.length
							] }), /* @__PURE__ */ (0, _.jsxs)("select", {
								"aria-label": o("Rolle filtern"),
								value: m,
								onChange: (e) => g(e.target.value),
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Rollen")
								}), tt.filter((e) => I[e]).map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
									value: e,
									children: [
										o(Qe[e] || e),
										" (",
										I[e].length,
										")"
									]
								}, e))]
							})]
						}),
						[...tt, ...Object.keys(I).filter((e) => !tt.includes(e))].filter((e) => I[e] && (!m || m === e)).map((e) => /* @__PURE__ */ (0, _.jsxs)("section", {
							className: "role-overview-group",
							children: [/* @__PURE__ */ (0, _.jsxs)("h4", { children: [/* @__PURE__ */ (0, _.jsx)("span", {
								className: "role-chip " + (ct[e] || ""),
								children: o(Qe[e] || e)
							}), /* @__PURE__ */ (0, _.jsx)("small", { children: I[e].length })] }), /* @__PURE__ */ (0, _.jsx)("ul", { children: I[e].map((t) => {
								let n = t.assignments.find((t) => t.role === e);
								return /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
									type: "button",
									className: r?.id === t.id ? "is-selected" : "",
									onClick: () => k(t),
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: t.name }), /* @__PURE__ */ (0, _.jsx)("span", { children: [
										n.regions.length ? n.regions.map(L).join(", ") : "",
										n.assignedEvents.length ? `${n.assignedEvents.length} ${o(n.assignedEvents.length === 1 ? "Anlass" : "Anlässe")}` : "",
										t.city
									].filter(Boolean).join(" · ") })]
								}) }, t.id);
							}) })]
						}, e)),
						!F.length && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: o("Noch keine Rollen zugeteilt.")
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint role-docs-hint",
							children: o("Bibliothek: Mitglieder sehen alle Dokumente ausser «Regional» und «Vorstand». Regionalleitungen, Admins und die Bibliotheksverwaltung sehen zusätzlich «Regional». Nur der Vorstand sieht alles.")
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region app/components/HomepageCuration.tsx
function ft({ nonce: e }) {
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
								children: i("Auswahl bereinigen", "Supprimer la sélection")
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
function pt({ docKey: e, nonce: t, disabled: n, uploadState: r, regional: i = !1 }) {
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
var mt = [
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
	"eventBody",
	"eventEmpty"
];
function ht({ documentKey: e, values: t = {}, events: n, eventCount: r, canEdit: i = !1 }) {
	let { refresh: a } = q(), [s, c] = (0, h.useState)(null), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(!1), [p, m] = (0, h.useState)(""), [g, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(!1), E = s ? s.values : t, D = (e) => typeof E[e] == "string" ? E[e] : "", O = e === "triungsters", k = (e, t) => D(e).replace(/<[^>]+>/g, "").trim() ? /* @__PURE__ */ (0, _.jsx)(J, { html: D(e) }) : /* @__PURE__ */ (0, _.jsx)("p", {
		className: "regional-empty",
		children: o(t)
	}), A = /^https:\/\//i.test(D("whatsappUrl")) ? D("whatsappUrl") : "", j = !!s && JSON.stringify(s.values) !== JSON.stringify(s.doc.values), M = l || d;
	(0, h.useEffect)(() => {
		if (!j) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [j]);
	async function N() {
		u(!0), m(""), b("");
		try {
			let t = await fetch(`${y}/wp-admin/admin-ajax.php?action=strc_session`, { credentials: "include" }).then((e) => e.json()), n = await C("strc_editorial", {
				operation: "document",
				key: e
			});
			c({
				doc: n,
				values: n.values,
				nonce: t.editorialNonce || ""
			}), n.hasDraft && b(o("Sie bearbeiten einen gespeicherten Entwurf. Besucher sehen noch die veröffentlichte Fassung."));
		} catch (e) {
			m(e.message);
		} finally {
			u(!1);
		}
	}
	async function P(t) {
		if (!(!s || M)) {
			u(!0), m(""), b("");
			try {
				let n = await w("strc_editorial", s.nonce, T({
					operation: "save",
					key: e,
					revision: String(s.doc.revision),
					mode: t,
					values: JSON.stringify(s.values)
				}));
				t === "publish" ? (await a(), c(null), b(o("Veröffentlicht. Die Regionalseite zeigt jetzt die neue Fassung."))) : (c({
					...s,
					doc: n,
					values: n.values
				}), b(o("Entwurf gespeichert. Besucher sehen weiterhin die veröffentlichte Fassung.")));
			} catch (e) {
				m(e.message);
			} finally {
				u(!1);
			}
		}
	}
	function F() {
		if (j && !x) {
			S(!0);
			return;
		}
		S(!1), c(null), m(""), b("");
	}
	let I = (e) => s?.doc.schema.fields.find((t) => t.key === e && !t.translationOf), L = (e) => {
		let t = I(e);
		return !!s && !!t && (!!s.doc.canAdminister || !t.adminOnly);
	}, R = (e, t) => {
		c((n) => n && {
			...n,
			values: {
				...n.values,
				[e]: t
			}
		}), S(!1);
	}, z = (e, t) => o(I(e)?.label || t), B = (e, t, n = !1) => L(e) ? /* @__PURE__ */ (0, _.jsxs)("label", {
		className: "regional-edit-field",
		children: [z(e, t), n ? /* @__PURE__ */ (0, _.jsx)("textarea", {
			rows: 2,
			value: D(e).replace(/\s*\|\s*/g, "\n"),
			onChange: (t) => R(e, t.target.value),
			disabled: M
		}) : /* @__PURE__ */ (0, _.jsx)("input", {
			value: D(e),
			onChange: (t) => R(e, t.target.value),
			disabled: M
		})]
	}) : null, V = (e, t) => L(e) ? /* @__PURE__ */ (0, _.jsx)("div", {
		className: "regional-edit-field",
		children: /* @__PURE__ */ (0, _.jsx)(ze, {
			label: z(e, t),
			value: D(e),
			onChange: (t) => R(e, t),
			disabled: M
		})
	}) : null, H = (t, n) => L(t) && s ? /* @__PURE__ */ (0, _.jsx)(Xt, {
		label: z(t, n),
		value: D(t),
		changed: (e) => R(t, e),
		nonce: s.nonce,
		target: { key: e },
		uploadState: f
	}) : null, U = s?.doc.canAdminister ? s.doc.schema.fields.filter((e) => e.adminOnly && !e.translationOf && !e.legacy && !mt.includes(e.key) && [
		"text",
		"textarea",
		"url",
		"rich",
		"image"
	].includes(e.type)) : [];
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "regional-content" + (s ? " is-editing" : ""),
		children: [
			/* @__PURE__ */ (0, _.jsx)("div", {
				className: "regional-toolbar",
				children: i ? s ? null : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					disabled: l,
					onClick: () => void N(),
					children: o(l ? "Wird geladen …" : O ? "TRiungsters-Seite bearbeiten" : "Diese Seite bearbeiten")
				}), !O && /* @__PURE__ */ (0, _.jsx)("a", {
					className: "market-primary",
					href: "#agenda-verwalten/neu/" + encodeURIComponent(e.replace(/^region-/, "")),
					children: o("Termin erstellen")
				})] }) : /* @__PURE__ */ (0, _.jsx)("a", {
					className: "club-secondary",
					href: "#mitglieder",
					children: o("Moderator-Login")
				})
			}),
			s && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "regional-edit-bar",
				role: "region",
				"aria-label": o("Bearbeitungsmodus"),
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Bearbeitungsmodus") }), /* @__PURE__ */ (0, _.jsx)("span", { children: o(j ? "Ungespeicherte Änderungen" : "Felder direkt in den Kästen ändern") })] }), /* @__PURE__ */ (0, _.jsx)("div", {
					className: "regional-edit-actions",
					children: x ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Änderungen verwerfen?") }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary is-danger",
							onClick: F,
							children: o("Verwerfen")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							onClick: () => S(!1),
							children: o("Weiter bearbeiten")
						})
					] }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							disabled: M,
							onClick: F,
							children: o("Beenden")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							disabled: M || !j,
							onClick: () => void P("draft"),
							children: o("Entwurf speichern")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "market-primary",
							disabled: M,
							onClick: () => void P("publish"),
							children: o(d ? "Bild wird hochgeladen …" : l ? "Bitte warten …" : "Veröffentlichen")
						})
					] })
				})]
			}),
			(p || g) && /* @__PURE__ */ (0, _.jsx)("p", {
				role: p ? "alert" : "status",
				className: p ? "collection-state error" : "club-notice",
				children: p || g
			}),
			s && U.length > 0 && /* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel regional-admin-panel",
				children: [
					/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Administration") }),
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-hint",
						children: o("Nur für die Administration sichtbar.")
					}),
					U.map((e) => e.type === "rich" ? /* @__PURE__ */ (0, _.jsx)("div", { children: V(e.key, e.label) }, e.key) : e.type === "image" ? /* @__PURE__ */ (0, _.jsx)("div", { children: H(e.key, e.label) }, e.key) : /* @__PURE__ */ (0, _.jsx)("div", { children: B(e.key, e.label, e.type === "textarea") }, e.key))
				]
			}),
			D("image") && /* @__PURE__ */ (0, _.jsxs)("figure", {
				className: "static-cover",
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					src: Y(D("image")),
					alt: D("imageAlt") || D("title"),
					width: 1440,
					height: 800,
					style: pe(D("imageFrame"))
				}), D("imageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: D("imageCaption") })]
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
								children: [D("contactImage") ? /* @__PURE__ */ (0, _.jsx)(v, {
									src: Y(D("contactImage")),
									alt: D("contactName") || o("Ansprechperson"),
									width: 160,
									height: 160,
									style: pe(D("contactImageFrame"), "cover")
								}) : /* @__PURE__ */ (0, _.jsx)("div", {
									className: "regional-avatar",
									"aria-hidden": "true",
									children: "◉"
								}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
									/* @__PURE__ */ (0, _.jsx)("h3", { children: D("contactName") || o("Ansprechperson folgt") }),
									/* @__PURE__ */ (0, _.jsx)("p", { children: D("contactRole") || o(O ? "TRiungsters-Kontakt" : "Regionalleitung") }),
									D("contactPhone") && /* @__PURE__ */ (0, _.jsx)("a", {
										href: "tel:" + D("contactPhone").replace(/[^+\d]/g, ""),
										children: D("contactPhone")
									}),
									D("contactEmail") && /* @__PURE__ */ (0, _.jsx)("a", {
										href: "mailto:" + encodeURIComponent(D("contactEmail")),
										children: D("contactEmail")
									})
								] })]
							}),
							s && (L("contactName") ? /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "regional-edit-group",
								children: [
									B("contactName", "Name"),
									B("contactRole", "Funktion"),
									B("contactPhone", "Telefon"),
									B("contactEmail", "E-Mail"),
									H("contactImage", "Porträt")
								]
							}) : /* @__PURE__ */ (0, _.jsx)("p", {
								className: "regional-edit-hint",
								children: o("Die Kontaktangaben pflegt die Administration.")
							}))
						]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel",
						children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Treffpunkt") }), s ? /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "regional-edit-group",
							children: [
								B("meetName", "Treffpunkt: Name"),
								B("meetAddress", "Treffpunkt: Adresse"),
								B("meetSchedule", "Rhythmus und Zeit", !0)
							]
						}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsx)("h3", { children: D("meetName") || o("Treffpunkt wird ergänzt") }),
							D("meetAddress") && /* @__PURE__ */ (0, _.jsx)("p", { children: D("meetAddress") }),
							D("meetSchedule") && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "regional-schedule",
								children: D("meetSchedule").replace(/\s*\|\s*/g, "\n")
							})
						] })]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel",
						children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Nächste Treffen") }), s ? V("meetDates", "Nächste Treffen") : k("meetDates", "Die nächsten Stammtischtermine werden hier ergänzt.")]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel regional-whatsapp",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: o("WhatsApp-Gruppe") }),
							D("whatsappQr") && /* @__PURE__ */ (0, _.jsx)(v, {
								src: Y(D("whatsappQr")),
								alt: o("QR-Code zur WhatsApp-Gruppe"),
								width: 180,
								height: 180
							}),
							/* @__PURE__ */ (0, _.jsx)("p", { children: o(A ? "In Verbindung bleiben und sich für die nächste Ausfahrt verabreden." : "Der Gruppenlink wird noch ergänzt.") }),
							A && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: A,
								target: "_blank",
								rel: "noopener noreferrer",
								children: o("Gruppe beitreten")
							}),
							s && (L("whatsappUrl") ? /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "regional-edit-group",
								children: [B("whatsappUrl", "Beitrittslink"), H("whatsappQr", "QR-Code als Bild")]
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
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o(O ? "Über die TRiungsters" : "Weitere Termine") }), s ? V("body", O ? "Über die TRiungsters" : "Weitere Termine") : k("body", "Informationen zu unserer Gemeinschaft folgen.")]
			}),
			/* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel",
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o(O ? "TRiungsters-News" : "Neuigkeiten") }), s ? V("news", O ? "TRiungsters-News" : "Neuigkeiten") : k("news", "Noch keine Neuigkeiten veröffentlicht.")]
			}),
			/* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel regional-events-panel",
				children: [
					/* @__PURE__ */ (0, _.jsx)("h2", { children: o(O ? "Veranstaltungen" : "Unsere Anlässe") }),
					s ? /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "regional-edit-group",
						children: [V("eventBody", "Einleitung (immer sichtbar)"), V("eventEmpty", "Hinweis, wenn keine Anlässe geplant sind")]
					}) : D("eventBody") && /* @__PURE__ */ (0, _.jsx)(J, { html: D("eventBody") }),
					" ",
					!s && r === 0 && D("eventEmpty") ? /* @__PURE__ */ (0, _.jsx)(J, { html: D("eventEmpty") }) : n || /* @__PURE__ */ (0, _.jsxs)("p", {
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
			s ? /* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel regional-documents",
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Dokumente") }), /* @__PURE__ */ (0, _.jsx)(pt, {
					docKey: e,
					nonce: s.nonce,
					disabled: M,
					uploadState: f,
					regional: !0
				})]
			}) : /* @__PURE__ */ (0, _.jsx)(gt, { documentKey: e }),
			s && /* @__PURE__ */ (0, _.jsxs)("p", {
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
function gt({ documentKey: e }) {
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
function _t(e) {
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
function vt({ html: e, photos: t }) {
	let n = _t(e), r = /* @__PURE__ */ new Map();
	t.filter((e) => e.url).forEach((e, t) => {
		let i = Number(e.position ?? (t + 1) * 2), a = Math.min(n.length, Math.max(0, Number.isFinite(i) ? i : n.length));
		r.set(a, [...r.get(a) || [], e]);
	});
	let i = (e) => r.get(e)?.map((t, n) => /* @__PURE__ */ (0, _.jsxs)("figure", {
		className: "history-inline-photo",
		children: [/* @__PURE__ */ (0, _.jsx)(v, {
			src: Y(t.url),
			alt: t.alt,
			width: 900,
			height: 600,
			style: pe(t.frame)
		}), t.alt && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: t.alt })]
	}, e + ":" + n));
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "history-story",
		children: [i(0), n.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "history-text-block",
			children: [/* @__PURE__ */ (0, _.jsx)(J, { html: e }), i(t + 1)]
		}, t))]
	});
}
function yt({ title: e, people: t, preview: n = !1, slots: r = 0 }) {
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
						src: Y(e.image),
						alt: e.name ? `${o("Porträt von")} ${e.name}` : o("Porträt"),
						width: 400,
						height: 500,
						style: pe(e.frame, "cover")
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
var bt = [
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
], xt = [
	["years", "Bauzeit"],
	["engine", "Motor"],
	["displacement", "Hubraum"],
	["power", "Leistung"],
	["transmission", "Getriebe"],
	["production", "Stückzahl"]
], St = (e, t) => typeof e[t] == "string" ? e[t] : "";
function Ct(e) {
	let t = G[e];
	return t ? Object.fromEntries(t.fields.map((e) => [e.key, e.default])) : {};
}
function wt({ model: e }) {
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
function Tt({ values: e, model: t, unpublished: n = !1, preview: r = !1 }) {
	let i = St(e, "image"), a = St(e, "exampleNote");
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "vehicle-detail-content",
		children: [
			r && /* @__PURE__ */ (0, _.jsx)("h2", { children: St(e, "title") || t }),
			(n || a) && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-example-note",
				children: n ? o("Beispielansicht · redaktioneller Inhalt noch nicht veröffentlicht") : a
			}),
			/* @__PURE__ */ (0, _.jsxs)("figure", {
				className: "vehicle-detail-cover",
				children: [
					i ? /* @__PURE__ */ (0, _.jsx)(v, {
						src: Y(i),
						alt: St(e, "imageAlt") || t,
						width: 1e3,
						height: 600,
						style: pe(e.imageFrame)
					}) : /* @__PURE__ */ (0, _.jsx)(wt, { model: t }),
					" ",
					St(e, "imageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: St(e, "imageCaption") })
				]
			}),
			St(e, "intro") && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-detail-intro",
				children: St(e, "intro")
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "vehicle-detail-layout",
				children: [/* @__PURE__ */ (0, _.jsxs)("article", {
					className: `vehicle-detail-copy${St(e, "bodySecondary").replace(/<[^>]*>/g, "").trim() ? " two-columns" : ""}`,
					children: [
						St(e, "body") && /* @__PURE__ */ (0, _.jsx)(J, { html: St(e, "body") }),
						" ",
						St(e, "bodySecondary") && /* @__PURE__ */ (0, _.jsx)(J, { html: St(e, "bodySecondary") })
					]
				}), /* @__PURE__ */ (0, _.jsxs)("aside", {
					className: "vehicle-factbox",
					children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: St(e, "factsTitle") || o("Fahrzeugdaten") }), typeof e.factsBody == "string" ? /* @__PURE__ */ (0, _.jsx)(J, { html: e.factsBody }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dl", { children: xt.filter(([t]) => St(e, t)).map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(n) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: St(e, t) })] }, t)) }), St(e, "factsNote") && /* @__PURE__ */ (0, _.jsx)(J, { html: St(e, "factsNote") })] })]
				})]
			})
		]
	});
}
function Et({ compact: e = !1, initialSelected: t = "", canEdit: n = !1 }) {
	let { values: r, published: i, error: a, refresh: s } = q(), c = bt.find((e) => e.toLowerCase() === t.toLowerCase()) || "", [l, u] = (0, h.useState)(c);
	function d(e) {
		let t = "model-" + e.toLowerCase();
		return i[t] ? r[t] || {} : Ct(t);
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
			children: bt.map((t) => {
				let n = d(t);
				return /* @__PURE__ */ (0, _.jsxs)("a", {
					className: "vehicle-model-card",
					href: "#tr-modelle/" + t.toLowerCase(),
					"aria-haspopup": "dialog",
					onClick: (e) => f(e, t),
					children: [
						St(n, "image") ? /* @__PURE__ */ (0, _.jsx)("div", {
							className: "vehicle-card-image",
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								src: Y(St(n, "image")),
								alt: St(n, "imageAlt") || t,
								width: 600,
								height: 360,
								style: pe(n.imageFrame)
							})
						}) : /* @__PURE__ */ (0, _.jsx)(wt, { model: t }),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "vehicle-card-caption",
							children: /* @__PURE__ */ (0, _.jsx)("strong", { children: St(n, "title") || t })
						}),
						!e && /* @__PURE__ */ (0, _.jsx)("p", { children: o(i["model-" + t.toLowerCase()] && !St(n, "exampleNote") ? "Porträt & Fahrzeugdaten" : "Beispielansicht · Bild und Daten folgen") })
					]
				}, t);
			})
		}),
		l && /* @__PURE__ */ (0, _.jsxs)(X, {
			title: St(d(l), "title") || l,
			close: p,
			children: [/* @__PURE__ */ (0, _.jsx)(Tt, {
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
function Dt({ selected: e = "", canEdit: t = !1 }) {
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
		}), /* @__PURE__ */ (0, _.jsx)(Et, {
			initialSelected: e,
			canEdit: t
		})]
	})] });
}
//#endregion
//#region app/components/ShopOperations.tsx
function Ot({ nonce: e, close: t, saved: n, productId: r }) {
	let [i, a] = (0, h.useState)([]), [s, c] = (0, h.useState)(!1), [l, u] = (0, h.useState)(""), d = (0, h.useRef)(crypto.randomUUID()), [f, p] = (0, h.useState)(null), [m, g] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		if (!r) return;
		let e = new AbortController();
		return C("strc_shop", {
			operation: "product-detail",
			id: String(r)
		}, e.signal).then((e) => {
			p(e), a(e.variants);
		}).catch((t) => {
			e.signal.aborted || u(t.message);
		}), () => e.abort();
	}, [r]);
	function y(e, t, n) {
		a((r) => r.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}
	let b = !!r, x = b ? f?.type === "variable" : i.length > 0;
	return b && !f ? /* @__PURE__ */ (0, _.jsx)(X, {
		title: o("Artikel bearbeiten"),
		close: t,
		children: l ? /* @__PURE__ */ (0, _.jsx)("p", {
			role: "alert",
			children: l
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Artikel wird geladen …")
		})
	}) : /* @__PURE__ */ (0, _.jsx)(X, {
		title: o(b ? "Artikel bearbeiten" : "Artikel erstellen"),
		close: t,
		busy: s,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: async (t) => {
				if (t.preventDefault(), s) return;
				c(!0), u("");
				let a = new FormData(t.currentTarget);
				a.set("operation", b ? "product-update" : "product-save"), b ? (a.set("id", String(r)), a.set("revision", f.revision), m && a.set("removeImage", "1")) : a.set("requestId", d.current), a.set("variants", JSON.stringify(i));
				try {
					let t = await w("strc_shop", e, a);
					n(t.message, t.editUrl || "");
				} catch (e) {
					u(e.message);
				} finally {
					c(!1);
				}
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: s,
					children: [
						b && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Status"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "status",
							defaultValue: f.status,
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "publish",
									children: o("Veröffentlicht (im Shop sichtbar)")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "draft",
									children: o("Entwurf (nicht sichtbar)")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "pending",
									children: o("Zur Prüfung")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "private",
									children: o("Privat")
								})
							]
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Artikelname *"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "title",
							required: !0,
							maxLength: 160,
							defaultValue: f?.title
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Beschreibung"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							name: "description",
							maxLength: 1e4,
							rows: 4,
							defaultValue: f?.description
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: ["SKU", /* @__PURE__ */ (0, _.jsx)("input", {
							name: "sku",
							maxLength: 100,
							defaultValue: f?.sku
						})] }),
						f?.image && !m && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "shop-editor-image",
							children: [/* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: f.image,
								alt: "",
								width: 120,
								height: 120
							}), /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "market-text-button",
								onClick: () => g(!0),
								children: o("Bild entfernen")
							})]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o(f?.image ? "Produktbild ersetzen" : "Produktbild"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "image",
							type: "file",
							accept: "image/jpeg,image/png,image/webp"
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [!x && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Preis in CHF *"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "price",
								required: !0,
								inputMode: "decimal",
								defaultValue: f?.price || "0.00"
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Lagerbestand *"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "stock",
								type: "number",
								min: "0",
								max: "999999",
								defaultValue: f?.stock || "0",
								required: !0
							})] })] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Einstandspreis in CHF (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "cost",
								inputMode: "decimal",
								defaultValue: f?.cost
							})] })]
						}),
						(!b || x) && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Varianten nach Grösse") }), /* @__PURE__ */ (0, _.jsx)("p", { children: o("Für jede Grösse gelten ein eigener Preis, Lagerbestand und ein optionales Bild.") })] }),
						i.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("fieldset", {
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
										onChange: (e) => y(t, n, e.target.value)
									})] }, n))
								}),
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o(e.image ? "Variantenbild ersetzen" : "Variantenbild (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "file",
									name: "variant_image_" + t,
									accept: "image/jpeg,image/png,image/webp"
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									disabled: b && i.length <= 1,
									onClick: () => a((e) => e.filter((e, n) => n !== t)),
									children: o("Variante entfernen")
								})
							]
						}, e.id || e.clientKey)),
						(!b || x) && /* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							disabled: i.length >= 30,
							onClick: () => a((e) => [...e, {
								clientKey: crypto.randomUUID(),
								size: "",
								price: "0.00",
								stock: "0",
								cost: ""
							}]),
							children: o("Variante hinzufügen")
						}),
						/* @__PURE__ */ (0, _.jsx)("p", { children: o(b ? "Änderungen gelten sofort. Entfernte Varianten sind danach nicht mehr bestellbar; bestehende Bestellungen bleiben unverändert." : "Der Artikel wird als Entwurf gespeichert und kann anschliessend geprüft und veröffentlicht werden.") })
					]
				}),
				l && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "alert",
					children: l
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-primary",
					disabled: s,
					children: o(s ? "Wird gespeichert …" : b ? "Änderungen speichern" : "Entwurf speichern")
				})
			]
		})
	});
}
function kt({ revision: e, edit: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_shop", { operation: "product-list" }, e.signal).then((e) => r(e.products)).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [e]);
	let s = {
		publish: "Veröffentlicht",
		draft: "Entwurf",
		pending: "Zur Prüfung",
		private: "Privat"
	};
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "shop-product-admin",
		children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Bestehende Artikel") }), i ? /* @__PURE__ */ (0, _.jsx)("p", {
			role: "alert",
			children: i
		}) : n ? n.length ? /* @__PURE__ */ (0, _.jsx)("ul", {
			className: "shop-product-rows",
			children: n.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
				e.image ? /* @__PURE__ */ (0, _.jsx)(v, {
					unoptimized: !0,
					src: e.image,
					alt: "",
					width: 48,
					height: 48
				}) : /* @__PURE__ */ (0, _.jsx)("span", {
					className: "shop-product-rows-empty",
					"aria-hidden": "true",
					children: "TR"
				}),
				/* @__PURE__ */ (0, _.jsxs)("span", {
					className: "shop-product-rows-name",
					children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, _.jsxs)("small", { children: [
						o(s[e.status] || e.status),
						e.type === "variable" ? " · " + o("mit Varianten") : "",
						e.price ? ` · CHF ${e.price}` : "",
						e.stock === null ? "" : ` · ${o("Bestand")} ${e.stock}`
					] })]
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					onClick: () => t(e.id),
					children: o("Bearbeiten")
				})
			] }, e.id))
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			className: "collection-state",
			children: o("Noch keine Artikel erfasst.")
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Artikel werden geladen …")
		})]
	});
}
function At({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)([{
		id: "",
		quantity: "1"
	}]), [a, s] = (0, h.useState)("direct"), [c, l] = (0, h.useState)("handover"), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(!1), [S, T] = (0, h.useState)(0), [E, D] = (0, h.useState)(null), O = (0, h.useRef)(crypto.randomUUID());
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_shop", { operation: "order-options" }, e.signal).then(n).catch((t) => {
			e.signal.aborted || d(t.message);
		}), () => e.abort();
	}, [S]), /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Direktverkauf & manuelle Bestellung") }),
			t ? /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "club-form",
				onChange: () => D(null),
				onSubmit: async (t) => {
					if (t.preventDefault(), b) return;
					x(!0), d("");
					let n = new FormData(t.currentTarget);
					n.set("operation", "order-save"), n.set("requestId", O.current), n.set("kind", a), n.set("fulfilment", c), n.set("items", JSON.stringify(r)), n.set("preview", E ? "0" : "1"), E && n.set("reviewToken", E.reviewToken);
					try {
						if (!E) D(await w("strc_shop", e, n));
						else {
							let t = await w("strc_shop", e, n);
							p(t.message), g(t.url), y(t.invoiceUrl || ""), D(null), i([{
								id: "",
								quantity: "1"
							}]), O.current = crypto.randomUUID(), T((e) => e + 1);
						}
					} catch (e) {
						d(e.message), D(null);
					} finally {
						x(!1);
					}
				},
				children: [
					/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: b,
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
									}]), D(null);
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
					E && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "form-review",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Bestellung prüfen") }),
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [
								o("Gesamtbetrag"),
								": CHF ",
								E.total
							] }),
							["board", "gift"].includes(a) && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
								o("Regulärer Warenwert"),
								": CHF ",
								E.regular
							] }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: o("Beim Speichern wird der Lagerbestand reduziert.") })
						]
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: b,
						children: o(b ? "Wird verarbeitet …" : E ? "Bestellung verbindlich speichern" : "Bestellung prüfen")
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
					v && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "market-primary",
						href: v,
						target: "_blank",
						rel: "noopener noreferrer",
						children: o("Rechnung herunterladen (PDF)")
					}),
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
var jt = (e, t, n) => new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: t,
	minimumFractionDigits: n,
	maximumFractionDigits: n
}).format(Number(e) / 10 ** n), Mt = [
	"",
	"artikel",
	"lager",
	"bestellungen",
	"direktverkauf",
	"abrechnung"
], Nt = () => {
	let e = typeof window > "u" ? "" : window.location.hash.split("/")[1] || "";
	return Mt.includes(e) ? e : "";
};
function Pt() {
	let [e, t] = (0, h.useState)(Nt);
	(0, h.useEffect)(() => {
		let e = () => t(Nt());
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []);
	let [n, r] = (0, h.useState)(!1), [i, a] = (0, h.useState)(0), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)([]), [d, f] = (0, h.useState)(null), [p, m] = (0, h.useState)(""), [g, b] = (0, h.useState)(!0), [x, S] = (0, h.useState)(null);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_shop", { operation: "config" }, e.signal).then(async (t) => {
			if (e.signal.aborted) return;
			if (f(t), !t.storeReady) {
				b(!1);
				return;
			}
			let n = await fetch(`${y}/wp-json/wc/store/v1/products?per_page=50&orderby=menu_order&order=asc`, {
				signal: e.signal,
				cache: "no-store"
			});
			if (!n.ok) throw Error("Shop-Sortiment ist momentan nicht erreichbar.");
			u(await n.json()), t.checkoutReady && fetch(`${y}/wp-json/wc/store/v1/cart`, {
				signal: e.signal,
				credentials: "include",
				cache: "no-store"
			}).then((e) => e.ok ? e.json() : null).then((t) => {
				!e.signal.aborted && t && typeof t == "object" && "items_count" in t && typeof t.items_count == "number" && S(t.items_count);
			}).catch(() => {});
		}).catch((t) => {
			e.signal.aborted || m(t instanceof Error ? t.message : "Shop konnte nicht geladen werden.");
		}).finally(() => {
			e.signal.aborted || b(!1);
		}), () => e.abort();
	}, []);
	let [E, D] = (0, h.useState)(null), [O, k] = (0, h.useState)(0), [A, j] = (0, h.useState)(!1), [M, N] = (0, h.useState)(""), P = (e, t) => D((n) => {
		if (!n) return n;
		let r = n.findIndex((t) => t.id === e);
		if (r < 0 || t < 0 || t >= n.length || r === t) return n;
		let i = [...n], [a] = i.splice(r, 1);
		return i.splice(t, 0, a), i;
	});
	async function F() {
		if (!(!E || !d?.nonce)) {
			j(!0), N("");
			try {
				let e = await w("strc_shop", d.nonce, T({
					operation: "product-order",
					ids: JSON.stringify(E.map((e) => e.id))
				}));
				u(E), D(null), N(e.message);
			} catch (e) {
				N(e.message);
			} finally {
				j(!1);
			}
		}
	}
	let I = E || l, L = [
		[
			"",
			"Sortiment",
			!0
		],
		[
			"artikel",
			"Artikel",
			!!d?.canManage
		],
		[
			"lager",
			"Lager",
			!!(d?.canManage || d?.canInspect)
		],
		[
			"bestellungen",
			"Bestellungen",
			!!(d?.canManage || d?.canInspect)
		],
		[
			"direktverkauf",
			"Direktverkauf",
			!!d?.canManage
		],
		[
			"abrechnung",
			"Abrechnung",
			!!(d?.canManage || d?.canInspect)
		]
	].filter((e) => e[2]), R = L.some((t) => t[0] === e) ? e : "", z = {
		"": ["Das Sortiment", "Zubehör und ausgewählte Artikel des Clubs."],
		artikel: ["Artikel", "Neue Artikel anlegen und bestehende Artikel bearbeiten: Preis, Lagerbestand, Bilder, Varianten und Veröffentlichung."],
		lager: ["Lagerbewirtschaftung", "Aktueller Bestand pro Artikel und Variante."],
		bestellungen: ["Bestellungen", "Alle Shop-Bestellungen mit Zahlungs- und Lieferstand. Filter nach Abholung oder Zahlungsstand, Export als CSV."],
		direktverkauf: ["Direktverkauf", "Verkauf am Anlass oder manuelle Bestellung erfassen; der Lagerbestand wird automatisch angepasst."],
		abrechnung: ["Abrechnung", "Umsatz, bezahlte und offene Beträge, nach Zahlungsart und Abholung."]
	}[R];
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "form-section shop-catalog",
		children: [
			L.length > 1 && /* @__PURE__ */ (0, _.jsx)("nav", {
				className: "shop-tabs",
				"aria-label": o("Shop-Bereiche"),
				children: L.map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#tr-shop" + (e ? "/" + e : ""),
					"aria-current": R === e ? "page" : void 0,
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
					/* @__PURE__ */ (0, _.jsx)("h2", { children: o(z[0]) }),
					/* @__PURE__ */ (0, _.jsx)("p", { children: o(z[1]) })
				] }), /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "shop-catalog-actions",
					children: [R === "" && d?.canManage && l.length > 1 && !E && /* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary shop-sort-toggle",
						onClick: () => {
							N(""), D(l);
						},
						children: ["⇅ ", o("Reihenfolge ändern")]
					}), R === "" && d?.checkoutReady && d.cartUrl && /* @__PURE__ */ (0, _.jsxs)("a", {
						className: "club-secondary shop-cart-link",
						href: d.cartUrl,
						children: [
							o("Zum Warenkorb"),
							/* @__PURE__ */ (0, _.jsx)("span", {
								className: "shop-cart-count" + (x ? " has-items" : ""),
								"aria-label": `${x ?? 0} ${o("Artikel im Warenkorb")}`,
								children: x ?? 0
							}),
							" →"
						]
					})]
				})]
			}),
			R === "artikel" && d ? /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-admin-view",
				children: [
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "club-actions",
						children: /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-primary",
							onClick: () => r("new"),
							children: [o("Neuen Artikel erfassen"), " ＋"]
						})
					}),
					s && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						className: "club-notice",
						children: s
					}),
					/* @__PURE__ */ (0, _.jsx)(kt, {
						revision: i,
						edit: (e) => {
							c(""), r(e);
						}
					})
				]
			}) : R === "lager" && d ? /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-admin-view",
				children: [/* @__PURE__ */ (0, _.jsx)(It, { view: "stock" }), d.canManage && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#tr-shop/artikel",
					children: o("Bestand und Preise unter «Artikel» anpassen →")
				}) })]
			}) : R === "bestellungen" && d ? /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-admin-view",
				children: [/* @__PURE__ */ (0, _.jsx)(It, {
					view: "orders",
					nonce: d.nonce || ""
				}), d.ordersUrl && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: d.ordersUrl,
					children: o("Alle Bestellungen in WooCommerce →")
				}) })]
			}) : R === "direktverkauf" && d ? /* @__PURE__ */ (0, _.jsx)("div", {
				className: "shop-admin-view",
				children: /* @__PURE__ */ (0, _.jsx)(At, { nonce: d.nonce || "" })
			}) : R === "abrechnung" && d ? /* @__PURE__ */ (0, _.jsx)("div", {
				className: "shop-admin-view",
				children: /* @__PURE__ */ (0, _.jsx)(It, { view: "summary" })
			}) : p ? /* @__PURE__ */ (0, _.jsx)("p", {
				className: "collection-state error",
				role: "alert",
				children: p
			}) : g ? /* @__PURE__ */ (0, _.jsx)("p", {
				className: "collection-state",
				role: "status",
				children: o("Sortiment wird geladen …")
			}) : d?.storeReady ? l.length ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				E && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "shop-sort-bar",
					role: "status",
					children: [/* @__PURE__ */ (0, _.jsx)("p", { children: o("Kacheln an die gewünschte Stelle ziehen oder mit ◀ ▶ verschieben.") }), /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							disabled: A,
							onClick: () => D(null),
							children: o("Abbrechen")
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "market-primary",
							disabled: A,
							onClick: () => void F(),
							children: o(A ? "Wird gespeichert …" : "Reihenfolge speichern")
						})]
					})]
				}),
				M && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-notice",
					role: "status",
					children: M
				}),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "shop-product-grid" + (E ? " is-sorting" : ""),
					children: I.map((e, t) => {
						let n = e.attributes.find((e) => /size|groesse|grösse/i.test(`${e.name} ${e.slug}`)), i = e.attributes.find((e) => /colou?r|farbe/i.test(`${e.name} ${e.slug}`)), a = [n, i].filter((e) => !!e).flatMap((e) => e.terms.map((e) => e.name)), s = e.permalink, c = d.checkoutReady ? e.is_in_stock ? "Auswählen & bestellen →" : "Ausverkauft" : "Checkout wird eingerichtet";
						return /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "shop-product-card" + (O === e.id ? " is-dragging" : ""),
							draggable: !!E,
							onDragStart: (t) => {
								E && (k(e.id), t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData("text/plain", String(e.id)));
							},
							onDragOver: (n) => {
								!E || !O || (n.preventDefault(), O !== e.id && P(O, t));
							},
							onDrop: (e) => {
								E && e.preventDefault(), k(0);
							},
							onDragEnd: () => k(0),
							children: [
								E && /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "shop-sort-controls",
									children: [
										/* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											"aria-label": o("Nach vorne verschieben"),
											disabled: t === 0 || A,
											onClick: () => P(e.id, t - 1),
											children: "◀"
										}),
										/* @__PURE__ */ (0, _.jsx)("span", { children: t + 1 }),
										/* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											"aria-label": o("Nach hinten verschieben"),
											disabled: t === I.length - 1 || A,
											onClick: () => P(e.id, t + 1),
											children: "▶"
										})
									]
								}),
								/* @__PURE__ */ (0, _.jsx)("a", {
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
								}),
								/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "shop-product-copy",
									children: [
										!e.is_in_stock && /* @__PURE__ */ (0, _.jsx)("p", {
											className: "eyebrow",
											children: o("Derzeit ausverkauft")
										}),
										/* @__PURE__ */ (0, _.jsx)("h3", { children: /* @__PURE__ */ (0, _.jsx)("a", {
											href: e.permalink,
											children: e.name
										}) }),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: jt(e.prices.price, e.prices.currency_code, e.prices.currency_minor_unit) }),
										a.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
											className: "shop-product-variants",
											children: [n && `Grössen: ${n.terms.map((e) => e.name).join(", ")}`, i && `Farben: ${i.terms.map((e) => e.name).join(", ")}`].filter(Boolean).join(" · ")
										}),
										d.checkoutReady && e.is_in_stock ? /* @__PURE__ */ (0, _.jsx)("a", {
											className: "market-primary shop-product-link",
											href: s,
											children: o(c)
										}) : d.isMember ? /* @__PURE__ */ (0, _.jsx)("span", {
											className: "shop-purchase-unavailable",
											"aria-disabled": "true",
											children: o(c)
										}) : /* @__PURE__ */ (0, _.jsx)("a", {
											className: "shop-product-link",
											href: s,
											children: o(c)
										}),
										d?.canManage && !E && /* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											className: "market-text-button shop-product-edit",
											onClick: () => r(e.id),
											children: o("Artikel bearbeiten")
										})
									]
								})
							]
						}, e.id);
					})
				}),
				!d.zahlsReady && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "shop-checkout-notice",
					role: "status",
					children: "Bestellung auf Rechnung ist verfügbar. TWINT und Karte folgen nach geprüfter Einrichtung."
				})
			] }) : /* @__PURE__ */ (0, _.jsx)("div", {
				className: "collection-state",
				children: "Noch sind keine Artikel veröffentlicht. Shop-Moderatoren können hier neue Angebote einstellen."
			}) : /* @__PURE__ */ (0, _.jsx)("div", {
				className: "collection-state",
				children: "Der Shop wird gerade eingerichtet. Das Sortiment erscheint hier, sobald WooCommerce aktiviert ist."
			}),
			n && d && /* @__PURE__ */ (0, _.jsx)(Ot, {
				productId: n === "new" ? void 0 : n,
				nonce: d.nonce || "",
				close: () => r(!1),
				saved: (e) => {
					c(e), r(!1), a((e) => e + 1);
				}
			}, String(n))
		]
	});
}
var Ft = {
	"on-hold": ["Rechnung offen", "is-open"],
	pending: ["Zahlung ausstehend", "is-open"],
	processing: ["Bezahlt · in Bearbeitung", "is-paid"],
	completed: ["Abgeschlossen", "is-done"],
	cancelled: ["Storniert", "is-off"],
	refunded: ["Erstattet", "is-off"],
	failed: ["Fehlgeschlagen", "is-off"]
};
function It({ view: e, nonce: t = "" }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)(1), [s, c] = (0, h.useState)(1), [l, u] = (0, h.useState)(""), [d, f] = (0, h.useState)(""), [p, m] = (0, h.useState)(""), [g, v] = (0, h.useState)(0), [y, b] = (0, h.useState)({});
	async function x(e) {
		v(e.id);
		try {
			let n = await w("strc_shop", t, T({
				operation: "invoice-issue",
				id: String(e.id)
			}));
			r((t) => t && {
				...t,
				orders: t.orders.map((t) => t.id === e.id ? {
					...t,
					invoice: n
				} : t)
			}), b((t) => ({
				...t,
				[e.id]: n.message
			}));
		} catch (t) {
			b((n) => ({
				...n,
				[e.id]: t.message
			}));
		} finally {
			v(0);
		}
	}
	(0, h.useEffect)(() => {
		let t = new AbortController();
		return C("strc_shop", {
			operation: "reports",
			page: String(i),
			stockPage: String(s),
			event: l,
			...e === "summary" ? { summary: "1" } : {}
		}, t.signal).then(r).catch((e) => {
			t.signal.aborted || m(e.message);
		}), () => t.abort();
	}, [
		i,
		s,
		l,
		e
	]);
	let S = (n?.orders || []).filter((e) => !d || (d === "open" ? ["on-hold", "pending"].includes(e.status) : d === "paid" ? ["processing", "completed"].includes(e.status) : d === "ship" ? !e.pickupEvent && !e.shippedAt && ![
		"cancelled",
		"refunded",
		"failed"
	].includes(e.status) : !0));
	function E() {
		if (!n) return;
		let e = (e) => "\"" + e.replace(/"/g, "\"\"").replace(/^[=+@\-\t\r]/, "'") + "\"", t = [[
			"Bestellung",
			"Datum",
			"Kunde",
			"Artikel",
			"Status",
			"Betrag",
			"Währung",
			"Zahlungsart",
			"Abholung",
			"Versandt",
			"Sendungsnummer"
		], ...S.map((e) => [
			e.number,
			e.date,
			e.customer,
			e.items.join(", "),
			Ft[e.status]?.[0] || e.status,
			e.total,
			e.currency,
			e.paymentMethod,
			e.pickupEvent,
			e.shippedAt || "",
			e.tracking || ""
		])], r = URL.createObjectURL(new Blob(["﻿" + t.map((t) => t.map(e).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" })), a = document.createElement("a");
		a.href = r, a.download = "tr-shop-bestellungen-seite-" + i + ".csv", a.click(), URL.revokeObjectURL(r);
	}
	let D = (e, t = "CHF") => `${t} ${Number(e).toLocaleString("de-CH", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "form-section shop-report",
		children: [
			p && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: p
			}),
			!n && !p && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Wird geladen …")
			}),
			n && e === "orders" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "shop-report-filters",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zahlungs- und Lieferstand"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: d,
							onChange: (e) => f(e.target.value),
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "open",
									children: o("Zahlung offen")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "paid",
									children: o("Bezahlt")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "ship",
									children: o("Versand offen")
								})
							]
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Abholung an Veranstaltung"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: l,
							onChange: (e) => {
								u(e.target.value), a(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle")
							}), n.events.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e.id,
								children: e.title
							}, e.id))]
						})] }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							onClick: E,
							disabled: !S.length,
							children: o("Aktuelle Seite als CSV exportieren")
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "shop-report-count",
					children: [
						S.length,
						" ",
						o(S.length === 1 ? "Bestellung" : "Bestellungen"),
						d ? ` · ${o("gefiltert")}` : "",
						n.pages > 1 ? ` · ${o("Seite")} ${i}/${n.pages}` : ""
					]
				}),
				S.length ? /* @__PURE__ */ (0, _.jsx)("div", {
					className: "shop-order-list",
					children: S.map((e) => {
						let [n, r] = Ft[e.status] || [e.status, ""];
						return /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "shop-order",
							children: [/* @__PURE__ */ (0, _.jsxs)("header", { children: [
								/* @__PURE__ */ (0, _.jsxs)("strong", { children: ["#", e.number] }),
								/* @__PURE__ */ (0, _.jsx)("span", { children: e.date ? new Date(e.date).toLocaleDateString("de-CH") : "" }),
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "shop-order-state " + r,
									children: o(n)
								})
							] }), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "shop-order-body",
								children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
									className: "shop-order-customer",
									children: e.customer || o("Ohne Namen")
								}), /* @__PURE__ */ (0, _.jsx)("p", {
									className: "shop-order-items",
									children: e.items.join(" · ")
								})] }), /* @__PURE__ */ (0, _.jsxs)("dl", { children: [
									/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Betrag") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: D(e.total, e.currency) })] }),
									/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Zahlung") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: o(e.paymentMethod) || "–" })] }),
									e.invoice && /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Rechnung") }), /* @__PURE__ */ (0, _.jsxs)("dd", { children: [
										e.invoice.url ? /* @__PURE__ */ (0, _.jsxs)("a", {
											href: e.invoice.url,
											target: "_blank",
											rel: "noopener noreferrer",
											children: [e.invoice.number, " · PDF"]
										}) : t ? /* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											className: "market-text-button",
											disabled: g === e.id,
											onClick: () => void x(e),
											children: o(g === e.id ? "Wird erstellt …" : "Rechnung erstellen")
										}) : o("noch nicht erstellt"),
										e.invoice.url && !e.invoice.sent && t && /* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											className: "market-text-button",
											disabled: g === e.id,
											onClick: () => void x(e),
											children: o(g === e.id ? "Wird versendet …" : "Mailversand erneut versuchen")
										}),
										y[e.id] && /* @__PURE__ */ (0, _.jsx)("small", {
											className: "shop-invoice-note",
											role: "status",
											children: o(y[e.id])
										})
									] })] }),
									/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Lieferung") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.pickupEvent ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
										o("Abholung"),
										": ",
										e.pickupEvent
									] }) : e.shippedAt ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
										"✓ ",
										o("versandt"),
										" ",
										new Date(e.shippedAt).toLocaleDateString("de-CH"),
										e.tracking ? " · " + e.tracking : ""
									] }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
										o("Versand"),
										" · ",
										o("offen")
									] }) })] })
								] })]
							})]
						}, e.id);
					})
				}) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state",
					children: o("Keine Bestellungen für diese Auswahl.")
				}),
				/* @__PURE__ */ (0, _.jsx)(An, {
					page: i,
					pages: n.pages,
					change: a
				})
			] }),
			n && e === "summary" && n.summary && (() => {
				let e = n.summary;
				return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "shop-kpis",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Bestellungen") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: e.count })] }),
							/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Umsatz") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: D(e.total, e.currency) })] }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "is-paid",
								children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Bezahlt") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: D(e.paid, e.currency) })]
							}),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "is-open",
								children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Offen") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: D(e.open, e.currency) })]
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "shop-summary-grid",
						children: [
							["Nach Zahlungsstand", e.byStatus.map((e) => ({
								label: Ft[e.status]?.[0] || e.status,
								count: e.count,
								total: e.total
							}))],
							["Nach Zahlungsart", e.byMethod],
							["Nach Abholung / Versand", e.byPickup]
						].map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("section", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o(t) }), n.length ? /* @__PURE__ */ (0, _.jsx)("table", { children: /* @__PURE__ */ (0, _.jsx)("tbody", { children: n.map((t) => /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, _.jsx)("td", { children: o(t.label) }),
							/* @__PURE__ */ (0, _.jsx)("td", {
								className: "is-count",
								children: t.count
							}),
							/* @__PURE__ */ (0, _.jsx)("td", {
								className: "is-amount",
								children: D(t.total, e.currency)
							})
						] }, t.label)) }) }) : /* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: o("Noch keine Daten.")
						})] }, t))
					}),
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-hint",
						children: o("Ohne stornierte, erstattete und fehlgeschlagene Bestellungen. Einzelne Bestellungen und den Export findest du unter «Bestellungen».")
					})
				] });
			})(),
			n && e === "stock" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Lagerbestand") }),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "table-scroll",
					children: /* @__PURE__ */ (0, _.jsxs)("table", { children: [/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Artikel") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: "SKU" }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Bestand") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Status") })
					] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: n.stock.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.name }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.sku }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.quantity ?? "–" }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: o(e.stockStatus) })
					] }, e.id)) })] })
				}),
				/* @__PURE__ */ (0, _.jsx)(An, {
					page: s,
					pages: n.stockPages,
					change: c
				})
			] })
		]
	});
}
//#endregion
//#region app/components/MembershipApplication.tsx
function Lt() {
	let { text: e } = q(), { language: t } = n(), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)("single"), [f, p] = (0, h.useState)([B()]), [m, g] = (0, h.useState)(!1), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(""), S = (0, h.useRef)(!1), T = (0, h.useRef)(""), E = (0, h.useRef)(null);
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
		if (!f.some((e) => z.includes(e.model))) {
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
			/* @__PURE__ */ (0, _.jsx)(ue, { id: "membership.thankYouText" }),
			/* @__PURE__ */ (0, _.jsx)(V, { message: b }),
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
				onInvalidCapture: (e) => {
					let t = e.target;
					t instanceof HTMLInputElement && t.type === "checkbox" && (e.preventDefault(), y(o("Bitte die erforderlichen Bestätigungen auswählen.")), t.focus());
				},
				onSubmit: (e) => void D(e),
				children: [
					/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: m,
						children: [
							/* @__PURE__ */ (0, _.jsx)("legend", {
								className: "market-sr-only",
								children: "Mitgliedsantrag"
							}),
							/* @__PURE__ */ (0, _.jsx)(J, { html: e("membership.fees", G.membership.fields.find((e) => e.key === "fees")?.default || "") }),
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
							/* @__PURE__ */ (0, _.jsx)(H, {
								title: u === "couple" ? "Hauptmitglied" : "Persönliche Angaben",
								children: /* @__PURE__ */ (0, _.jsx)(W, {
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
								}), /* @__PURE__ */ (0, _.jsxs)(H, {
									title: "Co-Pilot / zweite Person",
									children: [
										/* @__PURE__ */ (0, _.jsx)("p", { children: o("Jede Person erhält nach der Aufnahme eine eigene Mitgliedsnummer und ein eigenes Konto. Bitte zwei unterschiedliche E-Mail-Adressen verwenden.") }),
										/* @__PURE__ */ (0, _.jsx)(W, {
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
							/* @__PURE__ */ (0, _.jsxs)(H, {
								title: "Deine Region",
								children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Heimatregion (Stamm) *"), /* @__PURE__ */ (0, _.jsxs)("select", {
									name: "region",
									required: !0,
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), r.regions.filter((e) => e.slug !== "triungsters").map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
										value: e.slug,
										children: e.name
									}, e.slug))]
								})] }), /* @__PURE__ */ (0, _.jsx)("p", {
									className: "club-hint",
									children: o("TRiungsters ist eine Mitgliedergruppe; deine geografische Region wählst du unabhängig davon.")
								})]
							}),
							/* @__PURE__ */ (0, _.jsxs)(H, {
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
											/* @__PURE__ */ (0, _.jsx)(ee, {
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
										onClick: () => p((e) => [...e, B()]),
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
							/* @__PURE__ */ (0, _.jsx)(ne, {})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(V, { error: v }),
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
		children: [/* @__PURE__ */ (0, _.jsx)(V, { error: a }), a ? /* @__PURE__ */ (0, _.jsx)("button", {
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
function Rt(e) {
	return e in G && "template" in G[e];
}
function zt({ href: e, title: t, text: n }) {
	return /* @__PURE__ */ (0, _.jsxs)("a", {
		className: "landing-card",
		href: e,
		children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: t }), /* @__PURE__ */ (0, _.jsx)("p", { children: n })]
	});
}
function Bt({ canEdit: e = !1, memberAccess: t = !1 }) {
	let { text: n } = q();
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
			children: [/* @__PURE__ */ (0, _.jsx)(he, {
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
					/* @__PURE__ */ (0, _.jsx)(ue, { id: "club.joinText" }),
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
				].map(([e, t, r]) => /* @__PURE__ */ (0, _.jsx)(zt, {
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
					children: /* @__PURE__ */ (0, _.jsx)(zt, {
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
				/* @__PURE__ */ (0, _.jsx)(Et, {
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
function Vt() {
	let { text: e } = q();
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
				children: /* @__PURE__ */ (0, _.jsx)(ue, { id: "club.body" })
			}), /* @__PURE__ */ (0, _.jsx)("aside", {
				className: "mission-picture",
				children: e("club.missionImage") ? /* @__PURE__ */ (0, _.jsx)(v, {
					src: Y(e("club.missionImage")),
					alt: e("club.missionImageAlt") || o("Clubleben im Swiss TR-Club"),
					width: 600,
					height: 800,
					style: pe(e("club.missionImageFrame"))
				}) : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "static-image-placeholder",
					children: o("Ein Bild aus unserem Clubleben folgt.")
				})
			})]
		})]
	})] });
}
function Ht({ documentKey: e, canEdit: t = !1 }) {
	let { values: n, published: r, loading: i, error: a, refresh: s } = q(), c = G[e];
	return !c || !Rt(e) ? /* @__PURE__ */ (0, _.jsxs)("section", {
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
		}), /* @__PURE__ */ (0, _.jsx)(Pt, {})]
	})] }) : e === "triungsters" && !i && !a ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero regional-hero",
		style: {
			backgroundImage: `linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${de("triungsters")}")`,
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
		children: /* @__PURE__ */ (0, _.jsx)(ht, {
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
			e === "membership" && /* @__PURE__ */ (0, _.jsx)(Lt, {}),
			e === "shop" && /* @__PURE__ */ (0, _.jsx)(Pt, {})
		]
	})] }) : /* @__PURE__ */ (0, _.jsx)(Ut, {
		documentKey: e,
		values: n[e]
	});
}
function Ut({ documentKey: e, values: t, preview: n = !1 }) {
	let r = (e) => typeof t[e] == "string" ? t[e] : "", i = e.startsWith("model-"), a = (e) => !!(e.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim() || /<img\b/i.test(e));
	if (e === "triungsters") return /* @__PURE__ */ (0, _.jsx)(ht, {
		documentKey: e,
		values: t
	});
	if (i) return /* @__PURE__ */ (0, _.jsx)(Tt, {
		values: t,
		model: r("title") || e.replace("model-", "").toUpperCase(),
		preview: n
	});
	let s = a(r("bodySecondary")), c = e === "history", l = c && Array.isArray(t.photos) ? t.photos : [], u = xt.filter(([e]) => r(e));
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
				e === "organisation" && r("lead") && /* @__PURE__ */ (0, _.jsx)(J, {
					className: "organisation-lead",
					html: r("lead")
				}),
				!c && (r("image") ? /* @__PURE__ */ (0, _.jsxs)("figure", {
					className: "static-cover",
					children: [/* @__PURE__ */ (0, _.jsx)(v, {
						src: Y(r("image")),
						alt: r("imageAlt"),
						width: 1440,
						height: 800,
						style: pe(r("imageFrame"))
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
									src: Y(r(e)),
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
							children: [/* @__PURE__ */ (0, _.jsx)("div", { children: a(r("body")) ? c ? /* @__PURE__ */ (0, _.jsx)(vt, {
								html: r("body"),
								photos: l
							}) : /* @__PURE__ */ (0, _.jsx)(J, { html: r("body") }) : n && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Hier steht später der Text der ersten Spalte.")
							}) }), s && /* @__PURE__ */ (0, _.jsx)(J, { html: r("bodySecondary") })]
						}),
						i && (u.length > 0 || n) && /* @__PURE__ */ (0, _.jsxs)("aside", {
							className: "landing-sidebar vehicle-facts",
							children: [
								/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Fahrzeugdaten") }),
								/* @__PURE__ */ (0, _.jsx)("dl", { children: (n ? xt : u).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(t) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: r(e) || o("Noch ergänzen") })] }, e)) }),
								r("factsNote") && /* @__PURE__ */ (0, _.jsx)(J, { html: r("factsNote") })
							]
						}),
						!i && (r("sidebar") || n) && /* @__PURE__ */ (0, _.jsxs)("aside", {
							className: "landing-sidebar",
							children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: r("sidebarTitle") || o("Auf einen Blick") }), r("sidebar") ? /* @__PURE__ */ (0, _.jsx)(J, { html: r("sidebar") }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Platz für Kontakte und weitere Informationen.") })]
						})
					]
				}),
				e === "organisation" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: ["board", "functions"].map((e) => /* @__PURE__ */ (0, _.jsx)(yt, {
					title: r(e + "Title"),
					people: Array.isArray(t[e + "Portraits"]) ? t[e + "Portraits"] : [],
					preview: n,
					slots: e === "board" ? 7 : 5
				}, e)) }),
				e === "membership" && !n && /* @__PURE__ */ (0, _.jsx)(Lt, {}),
				e === "shop" && !n && /* @__PURE__ */ (0, _.jsx)(Pt, {})
			]
		})]
	});
}
//#endregion
//#region app/components/EditorialDashboard.tsx
var Wt = {
	a: "a) Treffpunkt",
	b: "b) Weitere Termine",
	c: "c) Neuigkeiten",
	d: "d) Unsere Anlässe",
	admin: "Administration"
}, Gt = "strc_editorial", Kt = {
	news: "Neuigkeiten",
	forum: "Forum",
	gallery: "Galerie",
	library: "Bibliothek",
	market: "Marktplatz"
};
function qt({ nonce: e, canManageEvents: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(() => decodeURIComponent(window.location.hash.split("/")[1] || "")), [l, u] = (0, h.useState)(null), [d, f] = (0, h.useState)(0), { refresh: p } = q();
	(0, h.useEffect)(() => {
		let e = () => {
			window.location.hash.split("/")[0] === "#redaktion" && (u(null), a(""), c(decodeURIComponent(window.location.hash.split("/")[1] || "")));
		};
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []), (0, h.useEffect)(() => {
		let e = new AbortController();
		return C(Gt, {}, e.signal).then(r).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [d]), (0, h.useEffect)(() => {
		if (!s || s.startsWith("posts:") || s === "people" || s === "highlights" || s === "mails") return;
		let e = new AbortController();
		return C(Gt, {
			operation: "document",
			key: s
		}, e.signal).then(u).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [s, d]);
	function m(e) {
		u(null), a(""), c(e), qe("#redaktion" + (e ? "/" + encodeURIComponent(e) : ""));
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
				/* @__PURE__ */ (0, _.jsx)(L, {}),
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
						n.areas.filter((e) => Kt[e]).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "editorial-card",
							onClick: () => m("posts:" + e),
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: Kt[e] }), /* @__PURE__ */ (0, _.jsx)("span", { children: "Beiträge bearbeiten und veröffentlichen" })]
						}, e)),
						n.magazineUrl && /* @__PURE__ */ (0, _.jsxs)("a", {
							className: "editorial-card",
							href: n.magazineUrl,
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: "TR-Magazin" }), /* @__PURE__ */ (0, _.jsx)("span", { children: "Ausgabe, Titelseite und Leseprobe auswählen" })]
						}),
						n.canManageMails && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "editorial-card",
							onClick: () => m("mails"),
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o("E-Mail-Vorlagen") }), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Texte der automatischen Mails und Versandprotokoll") })]
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
			s === "mails" ? /* @__PURE__ */ (0, _.jsx)(Ye, {}) : s === "highlights" ? /* @__PURE__ */ (0, _.jsx)(ft, { nonce: e }) : s === "people" ? /* @__PURE__ */ (0, _.jsx)(dt, { nonce: e }) : s.startsWith("posts:") ? /* @__PURE__ */ (0, _.jsx)(Zt, {
				kind: s.slice(6),
				nonce: e,
				changed: p
			}, s) : s && (l ? /* @__PURE__ */ (0, _.jsx)(Jt, {
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
function Jt({ doc: e, nonce: t, saved: r }) {
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
				let i = await w(Gt, t, T({
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
				S((await w(Gt, t, T({
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
			/* @__PURE__ */ (0, _.jsx)(pt, {
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
					children: [o(Wt[n.section] || ""), n.section === "admin" && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Nur für die Administration sichtbar") })]
				}), /* @__PURE__ */ (0, _.jsx)(Yt, {
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
					children: E.filter((e) => e.translationOf).map((n) => /* @__PURE__ */ (0, _.jsx)(Yt, {
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
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Inhaltsvorschau") }), e.key.startsWith("region-") ? /* @__PURE__ */ (0, _.jsx)(ht, {
					documentKey: e.key,
					values: le(x, i)
				}) : Rt(e.key) ? /* @__PURE__ */ (0, _.jsx)(Ut, {
					documentKey: e.key,
					values: le(x, i),
					preview: !0
				}) : e.schema.fields.filter((e) => !e.legacy && e.type !== "imageFrame").map((e) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: e.label }), e.type === "rich" ? /* @__PURE__ */ (0, _.jsx)(J, { html: String(x[e.key]) }) : e.type === "text" || e.type === "textarea" || e.type === "url" || e.type === "imageFrame" ? /* @__PURE__ */ (0, _.jsx)("p", { children: String(x[e.key]) }) : e.type === "image" ? x[e.key] ? /* @__PURE__ */ (0, _.jsx)(v, {
					src: Y(String(x[e.key])),
					width: 200,
					height: 160,
					alt: e.label
				}) : null : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "editorial-image-list",
					children: x[e.key].map((e, t) => /* @__PURE__ */ (0, _.jsx)(v, {
						src: Y(e.image || e.url),
						alt: e.alt || e.name,
						width: 180,
						height: 120
					}, t))
				})] }, e.key))]
			})
		]
	});
}
function Yt({ field: e, imageUrl: t = "", value: n, onChange: r, nonce: i, docKey: a, disabled: s = !1, uploadState: c }) {
	if (e.type === "textarea") return /* @__PURE__ */ (0, _.jsxs)("label", { children: [e.label, /* @__PURE__ */ (0, _.jsx)("textarea", {
		rows: 2,
		value: String(n ?? "").replace(/\s*\|\s*/g, "\n"),
		onChange: (e) => r(e.target.value)
	})] });
	if (e.type === "imageFrame") return /* @__PURE__ */ (0, _.jsx)(me, {
		label: e.label,
		value: String(n || ""),
		image: t,
		changed: r
	});
	if (e.type === "rich") return /* @__PURE__ */ (0, _.jsx)(ze, {
		label: e.label,
		value: String(n ?? ""),
		onChange: r,
		disabled: s
	});
	if (e.type === "image") return /* @__PURE__ */ (0, _.jsx)(Xt, {
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
						/* @__PURE__ */ (0, _.jsx)(Xt, {
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
						/* @__PURE__ */ (0, _.jsx)(Xt, {
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
function Xt({ label: e, value: t, changed: n, nonce: r, target: i, uploadState: a, uploadAction: s = Gt, frame: c, frameChanged: l, portrait: u = !1 }) {
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
				src: Y(t),
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
			t && l && /* @__PURE__ */ (0, _.jsx)(me, {
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
function Zt({ kind: e, nonce: t, changed: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)(null), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(!0);
	return (0, h.useEffect)(() => {
		let t = new AbortController(), n = setTimeout(() => {
			C(Gt, {
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
	]), m ? /* @__PURE__ */ (0, _.jsx)(Qt, {
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
		/* @__PURE__ */ (0, _.jsxs)("h2", { children: [Kt[e], " verwalten"] }),
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
		/* @__PURE__ */ (0, _.jsx)(An, {
			page: c,
			pages: a,
			change: l
		})
	] });
}
function Qt({ item: e, kind: t, nonce: n, saved: r, back: i }) {
	let [a, s] = (0, h.useState)(e), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)("");
	async function f(e) {
		e.preventDefault(), l(!0), d("");
		try {
			await w(Gt, n, T({
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
					/* @__PURE__ */ (0, _.jsx)(ze, {
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
							/* @__PURE__ */ (0, _.jsx)(ze, {
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
						/* @__PURE__ */ (0, _.jsx)(Xt, {
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
var $t = {
	reserved: "Reserviert",
	confirmed: "Bestätigt",
	waiting: "Warteliste",
	pending_payment: "Reserviert",
	expired: "Abgelaufen",
	cancelled: "Abgemeldet",
	payment_review: "Zahlung prüfen"
}, en = {
	invoice: "Rechnung",
	twint: "TWINT",
	card: "Kreditkarte",
	none: "Keine Zahlung"
}, tn = (e) => e.vehicle ? [e.vehicle.model, e.vehicle.registration].filter(Boolean).join(" · ") : "";
function nn({ eventId: e }) {
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
			tn(e),
			e.meals.join(" / "),
			e.phone || "",
			e.email || "",
			(e.total / 100).toFixed(2),
			$t[e.state] || e.state,
			en[e.paymentMethod] || e.paymentMethod,
			mn[e.paymentStatus] || e.paymentStatus
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
		children: [/* @__PURE__ */ (0, _.jsx)(V, {
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
								/* @__PURE__ */ (0, _.jsxs)("td", { children: [$t[e.state] || e.state, /* @__PURE__ */ (0, _.jsx)("small", { children: mn[e.paymentStatus] || e.paymentStatus })] }),
								/* @__PURE__ */ (0, _.jsx)("td", { children: tn(e) || "–" }),
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
						$t[n.state] || n.state
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
						en[n.paymentMethod] || n.paymentMethod,
						" · ",
						mn[n.paymentStatus] || n.paymentStatus
					] }),
					n.invoiceUrl && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsxs)("a", {
						href: n.invoiceUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						children: [
							o("Rechnung"),
							" ",
							n.invoiceNumber,
							" (PDF)"
						]
					}) }),
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
										children: mn[e]
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
							mn[e.to],
							" · ",
							e.note
						] }, t))
					] })
				]
			}, n.id))
		] })]
	});
}
function rn() {
	let [e, t] = (0, h.useState)(""), [n, r] = (0, h.useState)(1), [i, a] = (0, h.useState)(null), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(null), [d, f] = (0, h.useState)(0);
	return (0, h.useEffect)(() => {
		let t = new AbortController(), r = setTimeout(() => {
			C("strc_event_finance", {
				operation: "events",
				search: e,
				page: String(n)
			}, t.signal).then((e) => {
				a(e), c("");
			}).catch((e) => {
				t.signal.aborted || c(e.message);
			});
		}, 150);
		return () => {
			clearTimeout(r), t.abort();
		};
	}, [
		e,
		n,
		d
	]), /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Kasse")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: o("Anlässe und Teilnehmerlisten") }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: o("Teilnehmerlisten einsehen und den Zahlungsstand der Anmeldungen abstimmen.") })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content club-management",
			children: [
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "market-filters",
					children: /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: [o("Anlässe suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
							type: "search",
							value: e,
							onChange: (e) => {
								t(e.target.value), r(1);
							}
						})]
					})
				}),
				s && /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "collection-state error",
					role: "alert",
					children: [s, /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-text-button",
						onClick: () => f((e) => e + 1),
						children: o("Erneut versuchen")
					})]
				}),
				!i && !s ? /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Anlässe werden geladen …")
				}) : i && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					!i.events.length && /* @__PURE__ */ (0, _.jsx)("p", {
						className: "collection-state",
						children: o("Keine Anlässe mit Anmeldung vorhanden.")
					}),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "managed-events",
						children: i.events.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [
							/* @__PURE__ */ (0, _.jsxs)("p", {
								className: "eyebrow",
								children: [e.startAt ? new Date(e.startAt).toLocaleDateString("de-CH") : o("Datum fehlt"), e.archived ? " · " + o("Archiv") : ""]
							}),
							/* @__PURE__ */ (0, _.jsx)("h2", { children: e.title }),
							/* @__PURE__ */ (0, _.jsx)("p", { children: [
								e.location,
								`${e.registrations} ${o("Anmeldungen")}`,
								e.openPayments ? `${e.openPayments} ${o("Zahlungen offen")}` : ""
							].filter(Boolean).join(" · ") })
						] }), /* @__PURE__ */ (0, _.jsx)("div", {
							className: "club-actions",
							children: /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => u(e),
								children: o("Teilnehmerliste")
							})
						})] }, e.id))
					}),
					/* @__PURE__ */ (0, _.jsx)(An, {
						page: n,
						pages: i.pages,
						change: r
					})
				] })
			]
		}),
		l && /* @__PURE__ */ (0, _.jsx)(X, {
			title: `${o("Anmeldungen")}: ${l.title}`,
			close: () => {
				u(null), f((e) => e + 1);
			},
			children: /* @__PURE__ */ (0, _.jsx)(nn, { eventId: l.id })
		})
	] });
}
//#endregion
//#region app/components/RegistrationMemberSearch.tsx
function an({ eventId: e, selected: t, onSelect: n }) {
	let [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(!1);
	return (0, h.useEffect)(() => {
		let t = new AbortController();
		if (r.trim().length < 2) return;
		let n = setTimeout(() => {
			l(""), p(!1), d(!0), C("strc_registration", {
				operation: "members",
				eventId: String(e),
				q: r
			}, t.signal).then((e) => {
				t.signal.aborted || (s(e.members), p(!0));
			}).catch((e) => {
				t.signal.aborted || l(e.message);
			}).finally(() => {
				t.signal.aborted || d(!1);
			});
		}, 250);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [r, e]), /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "registration-member-search",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitglied suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
				type: "search",
				value: r,
				maxLength: 80,
				placeholder: o("Name oder Mitgliedsnummer"),
				onChange: (e) => {
					i(e.target.value), s([]), l(""), p(!1), d(!1);
				}
			})] }),
			u && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Mitglieder werden gesucht …")
			}),
			a.length > 0 && /* @__PURE__ */ (0, _.jsx)("ul", {
				"aria-label": o("Gefundene Mitglieder"),
				children: a.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
					type: "button",
					className: "club-secondary",
					onClick: () => {
						n(e), i(""), s([]), p(!1), d(!1);
					},
					children: [
						e.name,
						" · ",
						o("Mitgliedsnummer"),
						": ",
						e.memberNumber
					]
				}) }, e.memberNumber))
			}),
			f && !u && !a.length && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Keine passenden Mitglieder gefunden.")
			}),
			t && /* @__PURE__ */ (0, _.jsxs)("p", {
				className: "club-hint",
				children: [
					o("Gewählte Mitgliedsnummer"),
					": ",
					t
				]
			}),
			c && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: c
			})
		]
	});
}
//#endregion
//#region app/components/RegistrationForm.tsx
var on = {
	type: "",
	firstName: "",
	lastName: "",
	memberNumber: ""
}, sn = () => ({
	type: "guest",
	memberNumber: "",
	firstName: "",
	lastName: "",
	vehicle: "",
	copilot: { ...on },
	room: "double"
}), cn = {
	member: "fee",
	copilot: "copilotFee",
	guest: "guestFee",
	"guest-copilot": "guestCopilotFee"
};
function ln(e, t, n) {
	let r = cn[t];
	return (e.weekend && n === "double" ? e[`${r}Double`] : e[r]) || 0;
}
function un(e, t, n) {
	let r = t.copilot.type ? t.room : "single";
	return ln(e, n || t.type === "member" ? "member" : "guest", r) + (t.copilot.type ? ln(e, t.copilot.type === "guest" ? "guest-copilot" : "copilot", r) : 0);
}
function dn(e, t) {
	let n = [sn()];
	for (let r of e) {
		let e = (r.crew || (r.kind === "guest" ? n.length + 1 : r.kind === "guest-copilot" ? n.length : 1)) - 1;
		if (r.kind === "member" && e === 0) {
			r.room && (n[0].room = r.room === "single" ? "single" : "double"), n[0].meal = r.meal || "";
			continue;
		}
		for (; n.length <= e;) n.push(sn());
		let i = n[e];
		if (e > 0 && (i.existingCrew = e + 1), r.kind === "guest" || r.kind === "member") {
			Object.assign(i, {
				meal: r.meal || "",
				type: r.kind === "member" ? "member" : "guest",
				memberNumber: r.memberNumber || "",
				firstName: r.firstName || r.name,
				lastName: r.lastName || "",
				vehicle: r.vehicle || "",
				room: r.room === "single" ? "single" : "double"
			});
			continue;
		}
		i.copilot = {
			meal: r.meal || "",
			type: r.kind === "copilot" ? r.memberNumber || !t ? "member" : "partner" : "guest",
			firstName: r.firstName || r.name,
			lastName: r.lastName || "",
			memberNumber: r.memberNumber || ""
		};
	}
	return n;
}
var fn = "strc_registration", pn = (e) => new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: "CHF"
}).format(e / 100), mn = {
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
}, hn = {
	invoice: "Rechnung",
	twint: "TWINT",
	card: "Kreditkarte",
	none: "Keine Zahlung"
}, gn = {
	reserved: "Teilnahme reserviert – Zahlung ausstehend",
	confirmed: "Teilnahme bestätigt",
	waiting: "Warteliste",
	cancelled: "Abgemeldet",
	pending_payment: "Plätze reserviert – Zahlung ausstehend",
	expired: "Reservierung abgelaufen",
	payment_review: "Zahlung wird durch die Kasse geprüft"
}, _n = [
	["fee", "Buchung Mitglied"],
	["copilotFee", "Buchung Co-Pilot Mitglied"],
	["guestFee", "Buchung Gast"],
	["guestCopilotFee", "Buchung Co-Pilot Gast"]
], vn = {
	"Anderes Mitglied": "Anderes Mitglied",
	"Co-Pilot": "Begleitung",
	"Ohne Co-Pilot": "Ohne Begleitung",
	"Co-Pilot Mitglied": "Begleitung Mitglied",
	"Co-Pilot Gast": "Begleitung Gast",
	"verknüpfter Co-Pilot": "verknüpfte Begleitung",
	"Vorname Co-Pilot *": "Vorname Begleitung *",
	"Nachname Co-Pilot *": "Nachname Begleitung *",
	"Zusatzbuchung Gast": "Weitere Person",
	"＋ Zusatzbuchung Gast": "＋ Weitere Person",
	"Zusatzbuchung entfernen": "Weitere Person entfernen",
	"Vorname Gast *": "Vorname *",
	"Nachname Gast *": "Nachname *",
	"Buchung Co-Pilot Mitglied": "Buchung Begleitung Mitglied",
	"Buchung Gast": "Buchung weitere Person",
	"Buchung Co-Pilot Gast": "Buchung Begleitung Gast",
	"Co-Piloten zulassen (Mitglied oder Gast)": "Begleitung zulassen (Mitglied oder Gast)",
	"Zusätzliche Buchungen pro Anmeldung": "Weitere Personen pro Anmeldung",
	"Eine zusätzliche Gast-Buchung, optional mit Gastbegleitung. 0 = keine zusätzliche Gast-Buchung.": "Eine zusätzliche Gast-Buchung, optional mit Gastbegleitung. 0 = keine zusätzliche Gast-Buchung."
}, yn = (e, t) => o(e && vn[t] || t), bn = (e) => ((e || 0) / 100).toFixed(2);
function xn({ event: e, localDate: t, nonce: n, eventId: r, uploadState: i, organisers: a, weekend: s = !1, meeting: c = !1 }) {
	let [l, u] = (0, h.useState)(e?.registrationRequired || !1), d = e?.registration, [f, p] = (0, h.useState)(d?.organiserUserId ? String(d.organiserUserId) : ""), [m, g] = (0, h.useState)(d?.organiser || ""), [v, y] = (0, h.useState)({
		programImage: d?.programImage || "",
		agendaImage: d?.agendaImage || ""
	});
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)(H, {
			title: o("Programm & Ausfahrt"),
			collapsible: !0,
			open: !!(d?.program || d?.agenda || d?.programImage || d?.agendaImage),
			note: "optional · Programm, Teilnahmeinfos, Bilder",
			children: [/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Programm / Tagesablauf"), /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_program",
					rows: 6,
					maxLength: 5e3,
					defaultValue: d?.program || ""
				})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Teilnahmeinformationen"), /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_agenda",
					rows: 6,
					maxLength: 5e3,
					defaultValue: d?.agenda || ""
				})] })]
			}), ["programImage", "agendaImage"].map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
				type: "hidden",
				name: "reg_" + e,
				value: v[e]
			}), /* @__PURE__ */ (0, _.jsx)(Xt, {
				label: t === 0 ? "Programmbild" : "Bild zur Ausfahrt",
				value: v[e],
				changed: (t) => y((n) => ({
					...n,
					[e]: t
				})),
				nonce: n,
				target: { id: String(r) },
				uploadAction: "strc_events",
				uploadState: i
			})] }, e))]
		}),
		/* @__PURE__ */ (0, _.jsxs)(H, {
			title: o("Organisator"),
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [
				o("Veranstaltungsleitung (nominiertes Mitglied)"),
				/* @__PURE__ */ (0, _.jsxs)("select", {
					name: "reg_organiserUserId",
					value: f,
					onChange: (e) => {
						let t = e.target.value;
						p(t);
						let n = a.find((e) => String(e.id) === t);
						n && !m.trim() && g(n.name);
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
						value: m,
						onChange: (e) => g(e.target.value)
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kontakt-E-Mail *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_organiserEmail",
						type: "email",
						required: !0,
						maxLength: 200,
						defaultValue: d?.organiserEmail || ""
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mobilnummer *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_organiserMobile",
						type: "tel",
						required: !0,
						maxLength: 40,
						pattern: "[+0-9() ./-]{7,40}",
						defaultValue: d?.organiserMobile || ""
					})] })
				]
			})]
		}),
		/* @__PURE__ */ (0, _.jsxs)(H, {
			title: o("Anmeldung konfigurieren"),
			children: [
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						name: "registrationRequired",
						value: "1",
						checked: l,
						onChange: (e) => u(e.target.checked)
					}), o("Anmeldung erforderlich")]
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: "Ohne Anmeldung werden die Angaben dazu ausgeblendet; sie bleiben gespeichert."
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					hidden: !l,
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
								yn(c, "Zusätzliche Buchungen pro Anmeldung"),
								/* @__PURE__ */ (0, _.jsx)("input", {
									name: "reg_guests",
									type: "number",
									min: 0,
									max: 1,
									defaultValue: Math.min(1, d?.guests ?? 1)
								}),
								/* @__PURE__ */ (0, _.jsx)("small", { children: yn(c, "Eine zusätzliche Gast-Buchung, optional mit Gastbegleitung. 0 = keine zusätzliche Gast-Buchung.") })
							] })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								name: "reg_copilot",
								type: "checkbox",
								value: "1",
								defaultChecked: d?.copilot ?? !0
							}), yn(c, "Co-Piloten zulassen (Mitglied oder Gast)")]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								name: "reg_vehicle",
								type: "checkbox",
								value: "1",
								defaultChecked: c ? d?.meeting ? d.vehicle : !1 : d?.vehicle ?? !0
							}), o("Fahrzeugauswahl anzeigen")]
						}, c ? "meeting" : "drive"),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "application-consent",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								name: "reg_waitlist",
								type: "checkbox",
								value: "1",
								defaultChecked: d?.waitlist
							}), o("Bei voller Kapazität Warteliste führen")]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Externer Anmeldelink (optional)"),
							/* @__PURE__ */ (0, _.jsx)("input", {
								type: "url",
								name: "reg_externalUrl",
								maxLength: 200,
								defaultValue: d?.externalUrl || ""
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: "Bei externem Link erfolgt die Anmeldung dort." })
						] })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)(H, {
			title: o("Beiträge & Optionen"),
			hidden: !l,
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
					] }), _n.map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)(h.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("span", {
							className: "event-fee-label",
							children: yn(c, t)
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsxs)("span", {
							className: "visually-hidden",
							children: [yn(c, t), s ? " · " + o("Einzelzimmer") : ""]
						}), /* @__PURE__ */ (0, _.jsx)("input", {
							name: `reg_${e}`,
							inputMode: "decimal",
							"aria-label": yn(c, t) + (s ? " · " + o("Einzelzimmer") : ""),
							defaultValue: bn(d?.[e])
						})] }),
						s ? /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsxs)("span", {
							className: "visually-hidden",
							children: [
								yn(c, t),
								" · ",
								o("Doppelzimmer")
							]
						}), /* @__PURE__ */ (0, _.jsx)("input", {
							name: `reg_${e}Double`,
							inputMode: "decimal",
							"aria-label": yn(c, t) + " · " + o("Doppelzimmer"),
							defaultValue: bn(d?.[`${e}Double`])
						})] }) : /* @__PURE__ */ (0, _.jsx)("input", {
							type: "hidden",
							name: `reg_${e}Double`,
							value: bn(d?.[`${e}Double`])
						})
					] }, e))]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						name: "reg_organiserFree",
						value: "1",
						defaultChecked: d?.organiserFree
					}), o("Grundbeitrag für die Veranstaltungsleitung erlassen")]
				}),
				/* @__PURE__ */ (0, _.jsx)("input", {
					type: "hidden",
					name: "reg_organiserMemberNumber",
					value: d?.organiserMemberNumber || ""
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Der Erlass gilt für die oben nominierte Veranstaltungsleitung, sobald sie sich anmeldet. Essen und Unterkunft bleiben kostenpflichtig.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Essensauswahl je Person (optional)", /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_meals",
					rows: 3,
					maxLength: 2e3,
					defaultValue: d?.meals || "",
					placeholder: "Vegetarisch | 25.00\nFleisch | 30.00"
				})] }),
				s ? /* @__PURE__ */ (0, _.jsx)("input", {
					type: "hidden",
					name: "reg_rooms",
					value: d?.rooms || ""
				}) : /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Zimmer / Unterkunft je Anmeldung (optional)", /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_rooms",
					rows: 3,
					maxLength: 2e3,
					defaultValue: d?.rooms || "",
					placeholder: "Ohne Übernachtung | 0\nDoppelzimmer | 180.00"
				})] }),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: "Eine Option je Zeile: Bezeichnung | Aufpreis in CHF. Leere Felder werden im Anmeldeformular ausgeblendet. Zimmerzuteilung erfolgt manuell."
				})
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)(H, {
			title: o("Teilnahme & Abmeldung"),
			hidden: !l,
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bedingungen"), /* @__PURE__ */ (0, _.jsx)("textarea", {
				name: "reg_conditions",
				maxLength: 2e3,
				rows: 4,
				defaultValue: d?.conditions || "Kostenfreie Abmeldung bis vier Tage vor Veranstaltungsbeginn. Danach bleibt der Teilnahmebeitrag grundsätzlich geschuldet."
			})] }), /* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Abmeldefrist anpassen") }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
				o("Abmeldung bis (optional)"),
				/* @__PURE__ */ (0, _.jsx)("input", {
					type: "datetime-local",
					name: "reg_cancelAt",
					defaultValue: t(d?.cancelAt || "")
				}),
				/* @__PURE__ */ (0, _.jsx)("small", { children: "Ohne Angabe: vier Tage vor Beginn. Mehrtägige Veranstaltungen benötigen passende eigene Bedingungen." })
			] })] })]
		})
	] });
}
function Sn({ value: e }) {
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
			/* @__PURE__ */ (0, _.jsx)("dd", { children: /* @__PURE__ */ (0, _.jsx)("strong", { children: pn(e.total) }) }),
			e.notes && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Bemerkungen") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.notes })] })
		] })]
	});
}
function Cn({ eventId: e, memberAccess: t, hideTitle: n = !1 }) {
	let [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)([sn()]), [v, y] = (0, h.useState)(null), [b, x] = (0, h.useState)("invoice"), [S, E] = (0, h.useState)(!1), [D, O] = (0, h.useState)(!1), k = (0, h.useRef)(null), A = (0, h.useRef)(!1);
	if ((0, h.useEffect)(() => {
		if (!t) return;
		let n = new AbortController();
		return C(fn, {
			operation: "config",
			eventId: String(e)
		}, n.signal).then((e) => {
			i(e), d(""), !e.registration && e.settings.copilot && (e.copilot ? g([{
				...sn(),
				copilot: {
					...on,
					type: "partner"
				}
			}]) : e.copilotGuest && g([{
				...sn(),
				copilot: {
					type: "guest",
					firstName: e.copilotGuest.firstName,
					lastName: e.copilotGuest.lastName,
					memberNumber: ""
				}
			}]));
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
		if (m.some((e) => e.copilot.type === "member" && !e.copilot.memberNumber)) {
			l(o("Bitte das begleitende Mitglied über die Suche auswählen."));
			return;
		}
		A.current = !0, p(!0), l("");
		let n = new FormData(t);
		n.set("operation", v ? "submit" : "preview"), n.set("eventId", String(e)), n.set("paymentMethod", b), n.set("crews", JSON.stringify(m.map((e, t) => ({
			...t ? {
				existingCrew: e.existingCrew,
				pilot: {
					type: e.type,
					memberNumber: e.memberNumber,
					firstName: e.firstName,
					lastName: e.lastName,
					vehicle: e.vehicle
				}
			} : {},
			copilot: e.copilot.type ? e.copilot : null,
			room: e.room
		})))), n.set("selections", JSON.stringify(m.flatMap((e) => [{ meal: e.meal || "" }, ...e.copilot.type ? [{ meal: e.copilot.meal || "" }] : []]))), D && r.registration && (n.set("id", String(r.registration.id)), n.set("revision", r.registration.revision)), v && n.set("reviewToken", v.reviewToken);
		try {
			if (v) {
				let e = await w(fn, r.nonce, n);
				i({
					...r,
					registration: e.registration
				}), d(e.message), y(null), O(!1);
			} else y(await w(fn, r.nonce, n));
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
				d((await w(fn, r.nonce, T({
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
	async function N() {
		if (!(!r?.registration || f)) {
			p(!0), l("");
			try {
				let t = await w(fn, r.nonce, T({
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
	let P = (e) => yn(r?.settings.meeting, e), F = r?.registration, I = (e, t) => [e, t].filter(Boolean).join(" "), L = r ? m.flatMap((e, t) => [{
		name: t ? I(e.firstName, e.lastName) || `Gast ${t}` : r.name,
		meal: e.meal || "",
		crew: t,
		copilot: !1
	}, ...e.copilot.type ? [{
		name: e.copilot.type === "partner" ? r.copilot || P("Co-Pilot") : I(e.copilot.firstName, e.copilot.lastName) || P("Co-Pilot"),
		meal: e.copilot.meal || "",
		crew: t,
		copilot: !0
	}] : []]) : [], z = (e, t) => g((n) => n.map((n, r) => r === e ? {
		...n,
		...t
	} : n)), B = (e, t) => g((n) => n.map((n, r) => r === e ? {
		...n,
		copilot: {
			...n.copilot,
			...t
		}
	} : n));
	function U(t) {
		if (!r || !r.settings.copilot) return null;
		let n = m[t], i = t === 0, a = n.copilot.type, s = a === "member" && n.copilot.memberNumber, c = !i && a === "member" && !!n.existingCrew;
		return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
			/* @__PURE__ */ (0, _.jsxs)("label", { children: [P("Co-Pilot"), /* @__PURE__ */ (0, _.jsxs)("select", {
				value: a,
				disabled: c,
				onChange: (e) => B(t, {
					...on,
					type: e.target.value
				}),
				children: [
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: P("Ohne Co-Pilot")
					}),
					i && r.copilot && /* @__PURE__ */ (0, _.jsxs)("option", {
						value: "partner",
						children: [
							r.copilot,
							" (",
							P("verknüpfter Co-Pilot"),
							")"
						]
					}),
					(i || c) && /* @__PURE__ */ (0, _.jsx)("option", {
						value: "member",
						children: P("Anderes Mitglied")
					}),
					/* @__PURE__ */ (0, _.jsx)("option", {
						value: "guest",
						children: P("Co-Pilot Gast")
					})
				]
			})] }),
			a === "member" && (s ? /* @__PURE__ */ (0, _.jsxs)("p", {
				className: "registration-member-chosen",
				children: [
					o("Gewählt"),
					": ",
					/* @__PURE__ */ (0, _.jsx)("strong", { children: I(n.copilot.firstName, n.copilot.lastName) }),
					" · ",
					o("Mitgliedsnummer"),
					" ",
					n.copilot.memberNumber,
					" ",
					!c && /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "market-text-button",
						onClick: () => B(t, {
							...on,
							type: "member"
						}),
						children: o("ändern")
					})
				]
			}) : /* @__PURE__ */ (0, _.jsx)(an, {
				eventId: e,
				selected: "",
				onSelect: (e) => B(t, e)
			})),
			a === "member" && !s && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o("Mitglied über die Suche auswählen (Name oder Mitgliedsnummer).")
			}),
			a === "guest" && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [P("Vorname Co-Pilot *"), /* @__PURE__ */ (0, _.jsx)("input", {
					required: !0,
					maxLength: 80,
					value: n.copilot.firstName,
					onChange: (e) => B(t, { firstName: e.target.value })
				})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [P("Nachname Co-Pilot *"), /* @__PURE__ */ (0, _.jsx)("input", {
					required: !0,
					maxLength: 80,
					value: n.copilot.lastName,
					onChange: (e) => B(t, { lastName: e.target.value })
				})] })]
			}),
			r.settings.weekend && /* @__PURE__ */ (0, _.jsxs)("fieldset", {
				className: "crew-room",
				children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Zimmer") }), a ? /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: ["double", "single"].map((e) => /* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "radio",
						name: `room_${t}`,
						checked: n.room === e,
						onChange: () => z(t, { room: e })
					}), o(e === "double" ? "Doppelzimmer" : "2 × Einzelzimmer")]
				}, e)) }) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Einzelzimmer")
				})]
			})
		] });
	}
	function W(e) {
		if (!r) return null;
		let t = un(r.settings, m[e], e === 0);
		return t > 0 ? /* @__PURE__ */ (0, _.jsxs)("p", {
			className: "crew-price",
			children: [
				o("Beitrag dieser Buchung"),
				": ",
				/* @__PURE__ */ (0, _.jsx)("strong", { children: pn(t) }),
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
					children: ((v?.preview.total || F?.total || r.settings.fee) > 0 ? [
						"Anmeldung",
						"Angaben prüfen",
						"Zahlung",
						"Bestätigung"
					] : [
						"Anmeldung",
						"Angaben prüfen",
						"Bestätigung"
					]).map((e, t, n) => /* @__PURE__ */ (0, _.jsxs)("li", {
						"aria-current": t === (F && !["cancelled", "expired"].includes(F.state) && !D ? ["pending_payment", "reserved"].includes(F.state) ? 2 : n.length - 1 : +!!v) ? "step" : void 0,
						children: [/* @__PURE__ */ (0, _.jsx)("span", { children: t + 1 }), o(e)]
					}, e))
				}),
				!n && r.descriptionHtml && /* @__PURE__ */ (0, _.jsx)("section", {
					className: "event-announcement",
					"aria-label": "Eventausschreibung",
					children: /* @__PURE__ */ (0, _.jsx)(J, { html: r.descriptionHtml })
				})
			] }),
			/* @__PURE__ */ (0, _.jsx)(V, {
				error: c,
				message: u
			}),
			r ? F && !["cancelled", "expired"].includes(F.state) && !D ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o(gn[F.state]) }),
				/* @__PURE__ */ (0, _.jsx)(Sn, { value: F }),
				F.total > 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: F.state === "waiting" ? "Auf der Warteliste wird noch keine Zahlung fällig." : `${o(hn[F.paymentMethod] || "Zahlung")} · ${o(mn[F.paymentStatus] || F.paymentStatus)}` }),
				F.paymentMethod === "invoice" && F.paymentStatus === "outstanding" && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Die Kasse sendet dir die Rechnung separat über Fairgate.") }),
				F.state === "pending_payment" && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "form-review",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("p", { children: [
							"Deine Plätze sind bis ",
							(/* @__PURE__ */ new Date((F.holdUntil || 0) * 1e3)).toLocaleTimeString("de-CH"),
							" reserviert. Erst nach bestätigter Zahlung ist die Teilnahme verbindlich."
						] }),
						F.checkoutUrl ? /* @__PURE__ */ (0, _.jsx)("a", {
							className: "market-primary",
							href: F.checkoutUrl,
							children: "Bei zahls.ch bezahlen →"
						}) : /* @__PURE__ */ (0, _.jsx)("p", { children: "Der Zahlungslink konnte nicht sicher erstellt werden. Bitte kontaktiere die Veranstaltungsleitung oder warte den Ablauf ab." }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-actions",
							children: [/* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => s((e) => e + 1),
								children: o("Zahlungsstand aktualisieren")
							}), F.canInvoice && /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								disabled: f,
								onClick: () => void N(),
								children: o("Stattdessen auf Rechnung anmelden")
							})]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Ein Abbruch ist keine Zahlungsbestätigung. Bis zum Ablauf kannst du denselben Zahlungslink erneut öffnen."
						})
					]
				}),
				F.state === "confirmed" && /* @__PURE__ */ (0, _.jsx)(Tn, { value: F }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: F.conditions }),
				r.open && !["pending_payment", "payment_review"].includes(F.state) && /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => {
						O(!0), g(dn(F.participants, !!r.copilot));
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
							/* @__PURE__ */ (0, _.jsxs)(H, {
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
											" Änderungen machst du im «Mitgliedschafts-Profil»."
										]
									}),
									r.settings.vehicle && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug *"), /* @__PURE__ */ (0, _.jsxs)("select", {
										name: "vehicle",
										required: !0,
										defaultValue: D ? String(F?.vehicle?.id || (R.includes(F?.vehicle?.model || "") ? "model:" + F?.vehicle?.model : {
											"Modernes Fahrzeug": "guest",
											Gastfahrzeug: "guest",
											"Ohne Fahrzeug": "none",
											"Ohne Triumph (Co-Pilot)": "none"
										}[F?.vehicle?.model || ""] || "other")) : "",
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
												children: R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
													value: "model:" + e,
													children: e
												}, e))
											}),
											/* @__PURE__ */ (0, _.jsx)("option", {
												value: "other",
												children: o("Anderer Triumph")
											}),
											/* @__PURE__ */ (0, _.jsx)("option", {
												value: "guest",
												children: o("Gastfahrzeug")
											}),
											/* @__PURE__ */ (0, _.jsx)("option", {
												value: "none",
												children: o("Ohne Triumph (Co-Pilot)")
											})
										]
									})] }),
									U(0),
									W(0)
								]
							}),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Du kannst dich mit einer Begleitung (Mitglied oder Gast) und höchstens einer zusätzlichen Gast-Buchung mit Gastbegleitung anmelden. Bitte stimme die Teilnahme von Gästen mit der Veranstaltungsleitung ab.")
							}),
							D && m.some((e) => e.existingCrew && (e.type === "member" || e.copilot.type === "member" || m.length > 2)) && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-notice",
								children: o("Bestehende zusätzliche Personen bleiben erhalten. Weitere Mitglieder melden sich künftig mit ihrem eigenen Konto an.")
							}),
							m.slice(1).map((e, t) => {
								let n = t + 1;
								return /* @__PURE__ */ (0, _.jsxs)(H, {
									title: `${o("Weitere Person")} ${m.length > 2 ? n : ""}`.trim(),
									children: [
										e.type === "member" ? /* @__PURE__ */ (0, _.jsxs)("p", {
											className: "club-hint",
											children: [
												o("Bestehendes Mitglied"),
												": ",
												/* @__PURE__ */ (0, _.jsx)("strong", { children: I(e.firstName, e.lastName) }),
												" · ",
												o("Mitgliedsnummer"),
												" ",
												e.memberNumber
											]
										}) : /* @__PURE__ */ (0, _.jsxs)("div", {
											className: "club-form-row",
											children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Vorname Gast *"), /* @__PURE__ */ (0, _.jsx)("input", {
												required: !0,
												maxLength: 80,
												value: e.firstName,
												onChange: (e) => z(n, { firstName: e.target.value })
											})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachname Gast *"), /* @__PURE__ */ (0, _.jsx)("input", {
												required: !0,
												maxLength: 80,
												value: e.lastName,
												onChange: (e) => z(n, { lastName: e.target.value })
											})] })]
										}),
										r.settings.vehicle && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug der weiteren Person"), /* @__PURE__ */ (0, _.jsxs)("select", {
											value: e.vehicle,
											onChange: (e) => z(n, { vehicle: e.target.value }),
											children: [
												/* @__PURE__ */ (0, _.jsx)("option", {
													value: "",
													children: o("Bitte wählen")
												}),
												/* @__PURE__ */ (0, _.jsx)("optgroup", {
													label: "Triumph-Modelle",
													children: R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
														value: e,
														children: e
													}, e))
												}),
												/* @__PURE__ */ (0, _.jsx)("option", {
													value: "Anderer Triumph",
													children: o("Anderer Triumph")
												}),
												/* @__PURE__ */ (0, _.jsx)("option", {
													value: "Gastfahrzeug",
													children: o("Gastfahrzeug")
												}),
												/* @__PURE__ */ (0, _.jsx)("option", {
													value: "Ohne Triumph (Co-Pilot)",
													children: o("Ohne Triumph (Co-Pilot)")
												})
											]
										})] }),
										U(n),
										W(n),
										/* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											className: "market-text-button",
											onClick: () => g((e) => e.filter((e, t) => t !== n)),
											children: o("Weitere Person entfernen")
										})
									]
								}, n);
							}),
							m.length - 1 < Math.min(1, r.settings.guests) && /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								onClick: () => g((e) => [...e, sn()]),
								children: o("＋ Gast-Buchung hinzufügen")
							}),
							Object.keys(r.meals).length > 0 && L.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
								"Essen: ",
								e.name || `Gast ${t}`,
								" *",
								/* @__PURE__ */ (0, _.jsxs)("select", {
									name: `meal_${t}`,
									required: !0,
									value: e.meal,
									onChange: (t) => e.copilot ? B(e.crew, { meal: t.target.value }) : z(e.crew, { meal: t.target.value }),
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), Object.entries(r.meals).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
										value: e,
										children: [
											e,
											" · ",
											pn(t)
										]
									}, e))]
								})
							] }, t)),
							Object.keys(r.rooms).length > 0 && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Unterkunft *"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "room",
								required: !0,
								defaultValue: D && F?.room || "",
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), Object.entries(r.rooms).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
									value: e,
									children: [
										e,
										" · ",
										pn(t)
									]
								}, e))]
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bemerkungen (optional)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								name: "notes",
								rows: 3,
								maxLength: 1e3,
								defaultValue: D && F?.notes || ""
							})] }),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Bitte nur veranstaltungsrelevante Angaben eintragen. Gäste erhalten keine Mitgliedschaft.")
							})
						]
					}),
					v && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)(Sn, { value: v.preview }),
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
						v.preview.total > 0 && !D && /* @__PURE__ */ (0, _.jsxs)(H, {
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
									}), o(hn[e])]
								}, e)),
								/* @__PURE__ */ (0, _.jsx)("p", { children: b === "invoice" ? "Die Rechnung mit QR-Einzahlungsschein wird dir per E-Mail zugestellt." : "Nach der Reservierung öffnest du den Zahlungslink zu zahls.ch. Deine Teilnahme wird nach bestätigter Zahlung aufgenommen." }),
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
function wn({ eventId: e }) {
	return /* @__PURE__ */ (0, _.jsx)(nn, { eventId: e });
}
function Tn({ value: e }) {
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
var En = "strc_events";
function Dn(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : (t.setMinutes(t.getMinutes() - t.getTimezoneOffset()), t.toISOString().slice(0, 16));
}
function On({ session: e, changed: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)({
		events: [],
		pages: 0
	}), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(1), [p, m] = (0, h.useState)(0), [g, v] = (0, h.useState)(!0), [y, b] = (0, h.useState)(""), [x] = (0, h.useState)(() => {
		let e = window.location.hash.split("/");
		return e[1] === "neu" ? decodeURIComponent(e[2] || "") : null;
	}), [S, E] = (0, h.useState)(() => x === null ? void 0 : null), [D, O] = (0, h.useState)(null), [k, A] = (0, h.useState)(!1), [j, M] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController(), t = setTimeout(() => {
			v(!0), b(""), Promise.all([C(En, { operation: "settings" }, e.signal), C(En, {
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
		return C(En, {
			operation: "get",
			id: String(e)
		}, t.signal).then(E).catch((e) => {
			t.signal.aborted || b(e.message);
		}), () => t.abort();
	}, []);
	function N(e) {
		M(e), v(!0), m((e) => e + 1), t();
	}
	async function P(t, n) {
		A(!0), b("");
		try {
			await w(En, e.eventsNonce || "", T({
				operation: n,
				id: String(t.id)
			})), N("Termin aus dem Archiv wiederhergestellt.");
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
								onClick: () => void P(e, "restore"),
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
					/* @__PURE__ */ (0, _.jsx)(An, {
						page: d,
						pages: i.pages,
						change: f
					})
				] })
			]
		}),
		D && /* @__PURE__ */ (0, _.jsx)(X, {
			title: `Anmeldungen: ${D.title}`,
			close: () => O(null),
			children: /* @__PURE__ */ (0, _.jsx)(wn, { eventId: D.id })
		}),
		S !== void 0 && n && /* @__PURE__ */ (0, _.jsx)(kn, {
			event: S,
			initialRegion: S ? "" : x || "",
			settings: n,
			nonce: e.eventsNonce || "",
			close: () => E(void 0),
			saved: () => {
				E(void 0), N("Termin gespeichert.");
			}
		})
	] });
}
function kn({ event: e, initialRegion: t = "", settings: n, nonce: r, close: i, saved: a }) {
	let [s, c] = (0, h.useState)(e?.descriptionHtml || e?.description || ""), [l, u] = (0, h.useState)(e?.descriptionFr || ""), [d, f] = (0, h.useState)(() => e?.summary ?? ((e?.description || "").trim().length <= 120 ? (e?.description || "").trim() : "")), [p, m] = (0, h.useState)(!1), [g, v] = (0, h.useState)(e?.scope || "region"), [y, b] = (0, h.useState)(e?.eventType || ""), [x, S] = (0, h.useState)(!1), [C, T] = (0, h.useState)("");
	async function E(t) {
		if (!(p || x)) {
			S(!0), T("");
			try {
				let n = new FormData(t);
				n.set("operation", "save"), n.set("id", String(e?.id || 0)), n.set("scope", g), n.set("description", s), n.set("descriptionFr", l);
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
				await w(En, r, n), a();
			} catch (e) {
				T(e.message);
			} finally {
				S(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsx)(X, {
		title: e ? "Termin bearbeiten" : "Termin erstellen",
		close: i,
		busy: x,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: (e) => {
				e.preventDefault(), E(e.currentTarget);
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: x || p,
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
							value: g,
							onChange: (e) => v(e.target.value),
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
							value: y,
							onChange: (e) => b(e.target.value),
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
						g !== "club-national" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Region"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "regionId",
							required: g === "region",
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
								defaultValue: Dn(e?.startAt || "")
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Ende (optional)", /* @__PURE__ */ (0, _.jsx)("input", {
								type: "datetime-local",
								name: "endAt",
								defaultValue: Dn(e?.endAt || "")
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
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Kurzbeschrieb (für Anzeigen)"),
							/* @__PURE__ */ (0, _.jsx)("textarea", {
								name: "summary",
								rows: 2,
								maxLength: 120,
								value: d,
								onChange: (e) => f(e.target.value.replace(/\s*\n\s*/g, " "))
							}),
							/* @__PURE__ */ (0, _.jsxs)("small", { children: [
								d.length,
								"/120 · ",
								o("Erscheint in «Das Neueste», in der Agenda und auf den Regionsseiten. Leer = Anfang der Beschreibung.")
							] })
						] }),
						/* @__PURE__ */ (0, _.jsx)(ze, {
							label: o("Beschreibung (Programm, Details)"),
							value: s,
							onChange: c,
							disabled: x || p
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
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kurzbeschrieb (FR)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								name: "summaryFr",
								rows: 2,
								maxLength: 120,
								defaultValue: e?.summaryFr || ""
							})] }),
							/* @__PURE__ */ (0, _.jsx)(ze, {
								label: o("Beschreibung (FR)"),
								value: l,
								onChange: u,
								disabled: x || p
							})
						] }),
						/* @__PURE__ */ (0, _.jsx)(xn, {
							organisers: n.organisers,
							weekend: ["weekend", "weekend-meeting"].includes(y),
							meeting: y === "meeting",
							event: e,
							localDate: Dn,
							nonce: r,
							eventId: e?.id || 0,
							uploadState: m
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
				C && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state error",
					role: "alert",
					children: C
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: x || p,
						onClick: i,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: x || p,
						children: x ? "Wird gespeichert …" : "Termin speichern"
					})]
				})
			]
		})
	});
}
function An({ page: e, pages: t, change: n }) {
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
//#region app/components/VehiclePhotoFrame.tsx
var jn = "16 / 9", Mn = (e) => {
	let [, t, n] = (e || "").split("|"), r = (e) => e !== void 0 && /^\d{1,3}$/.test(e) ? Math.min(100, Math.max(0, Number(e))) : 50;
	return {
		x: r(t),
		y: r(n)
	};
};
function Nn({ src: e, value: t, changed: n }) {
	let r = (0, h.useRef)(null), { x: i, y: a } = Mn(t), s = (e, t) => n(`cover|${Math.round(Math.min(100, Math.max(0, e)))}|${Math.round(Math.min(100, Math.max(0, t)))}`);
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "vehicle-photo-frame",
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-photo-frame-label",
				children: o("Bildausschnitt")
			}),
			/* @__PURE__ */ (0, _.jsx)("div", {
				className: "vehicle-photo-frame-box",
				style: { aspectRatio: jn },
				role: "slider",
				tabIndex: 0,
				"aria-label": o("Bildausschnitt verschieben"),
				"aria-valuetext": `${i}% / ${a}%`,
				"aria-valuenow": i,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				onPointerDown: (e) => {
					let t = e.currentTarget.getBoundingClientRect();
					r.current = {
						x: i,
						y: a,
						startX: e.clientX,
						startY: e.clientY,
						width: t.width,
						height: t.height
					}, e.currentTarget.setPointerCapture(e.pointerId);
				},
				onPointerMove: (e) => {
					let t = r.current;
					t && s(t.x - (e.clientX - t.startX) / t.width * 100, t.y - (e.clientY - t.startY) / t.height * 100);
				},
				onPointerUp: () => {
					r.current = null;
				},
				onPointerCancel: () => {
					r.current = null;
				},
				onKeyDown: (e) => {
					let t = e.shiftKey ? 10 : 2, n = {
						ArrowLeft: [-t, 0],
						ArrowRight: [t, 0],
						ArrowUp: [0, -t],
						ArrowDown: [0, t]
					}[e.key];
					n && (e.preventDefault(), s(i + n[0], a + n[1]));
				},
				children: /* @__PURE__ */ (0, _.jsx)("img", {
					src: e,
					alt: "",
					draggable: !1,
					style: pe(`cover|${i}|${a}`, "cover")
				})
			}),
			/* @__PURE__ */ (0, _.jsxs)("p", {
				className: "club-hint",
				children: [
					o("Bild mit Maus oder Finger an die gewünschte Stelle ziehen. So erscheint es im Profil, in der Mitgliederliste und im Dashboard."),
					" ",
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "market-text-button",
						onClick: () => n(""),
						children: o("Zentrieren")
					})
				]
			})
		]
	});
}
//#endregion
//#region app/components/MemberDirectory.tsx
var Pn = [
	["lastName", "Nachname"],
	["firstName", "Vorname"],
	["postcode", "PLZ / Ort"],
	["region", "Region"],
	["vehicle", "Fahrzeug"]
], Fn = (e) => e === "restoration" ? "In Restauration" : "Fahrbereit";
function In({ vehicle: e }) {
	let t = e.status !== "restoration";
	return /* @__PURE__ */ (0, _.jsxs)("span", {
		className: "dir-vehicle",
		title: o(Fn(e.status)),
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
					o(Fn(e.status)),
					")"
				]
			})
		]
	});
}
function Ln() {
	let { text: e } = q(), [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("lastName"), [f, p] = (0, h.useState)(1), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(null), [x, S] = (0, h.useState)(!1), [w, T] = (0, h.useState)(0), [E, D] = (0, h.useState)(!0);
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
							}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
							children: Pn.map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
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
				t ? x ? /* @__PURE__ */ (0, _.jsx)(zn, {
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
									/* @__PURE__ */ (0, _.jsx)("td", { children: e.vehicles.map((e) => /* @__PURE__ */ (0, _.jsx)(In, { vehicle: e }, e.id)) }),
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
					/* @__PURE__ */ (0, _.jsx)(An, {
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
		y && /* @__PURE__ */ (0, _.jsx)(X, {
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
								width: 640,
								height: 360,
								style: {
									...pe(e.photoFrame, "cover"),
									aspectRatio: "16 / 9",
									height: "auto"
								}
							}),
							/* @__PURE__ */ (0, _.jsxs)("h4", { children: [
								/* @__PURE__ */ (0, _.jsx)(In, { vehicle: e }),
								" ",
								e.details
							] }),
							/* @__PURE__ */ (0, _.jsxs)("dl", {
								className: "profile-facts",
								children: [[
									["year", "Baujahr"],
									["colour", "Farbe"],
									["registration", "Kennzeichen"]
								].map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(n) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: String(e[t] || "–") })] }, t)), /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Status") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: o(Fn(e.status)) })] })]
							})
						]
					}, e.id)) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine Fahrzeuge erfasst.") })
				]
			})
		})
	] });
}
var Rn = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"38\" viewBox=\"0 0 28 38\"><path d=\"M14 1C7 1 1.5 6.5 1.5 13.5 1.5 23 14 37 14 37s12.5-14 12.5-23.5C26.5 6.5 21 1 14 1Z\" fill=\"#114973\" stroke=\"#fff\" stroke-width=\"2\"/><circle cx=\"14\" cy=\"13.5\" r=\"5\" fill=\"#bd2028\"/></svg>";
function zn({ members: t, detail: n, loading: r }) {
	let i = (0, h.useRef)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)({
		done: 0,
		total: 0
	});
	return (0, h.useEffect)(() => {
		let r = !1, a, c = new AbortController();
		return (async () => {
			let u = await import("./leaflet-src-BUmUk9La.js").then((t) => /* @__PURE__ */ e(t.default, 1));
			if (r || !i.current) return;
			let d = u.latLngBounds([45.78, 5.92], [47.86, 10.53]);
			a = u.map(i.current, {
				scrollWheelZoom: !0,
				maxZoom: 16,
				maxBounds: d.pad(.08),
				maxBoundsViscosity: 1
			}).fitBounds(d);
			let f = () => {
				a && a.setMinZoom(a.getBoundsZoom(d, !1));
			};
			f(), a.on("resize", f), u.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 16,
				attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
			}).addTo(a);
			let p = u.divIcon({
				html: Rn,
				className: "dir-pin",
				iconSize: [28, 38],
				iconAnchor: [14, 37],
				popupAnchor: [0, -32]
			}), m = [], h = (e, t, r = 0) => {
				t.forEach((t, i) => {
					let o = (i + r) * 2.4, s = i || r ? .0012 * Math.sqrt(i + r) : 0, c = [e[0] + s * Math.cos(o), e[1] + s * 1.4 * Math.sin(o)];
					m.push(c);
					let l = document.createElement("button");
					l.type = "button", l.className = "dir-pin-popup", l.innerHTML = "";
					let d = document.createElement("strong");
					if (d.textContent = t.firstName, l.appendChild(d), t.vehicle) {
						let e = document.createElement("span");
						e.textContent = t.vehicle, l.appendChild(e);
					}
					l.addEventListener("click", () => n(t.id)), u.marker(c, {
						icon: p,
						title: t.firstName
					}).addTo(a).bindPopup(l);
				});
			};
			t.filter((e) => e.position).forEach((e) => h(e.position, [e]));
			let g = /* @__PURE__ */ new Map();
			t.forEach((e) => {
				if (!e.position && e.postcode && (!e.country || e.country === "CH")) {
					let t = g.get(e.postcode) || [];
					t.push(e), g.set(e.postcode, t);
				}
			});
			let _ = Array.from(g), v = 0, y = 0;
			l({
				done: 0,
				total: _.length
			}), s("");
			async function b() {
				for (; v < _.length && !r;) {
					let [e, t] = _[v++];
					try {
						let n = await C("strc_directory", {
							operation: "location",
							postcode: e
						}, c.signal);
						if (r) return;
						n.position && h(n.position, t);
					} catch {
						r || s(o("Einige Standorte konnten nicht geladen werden."));
					} finally {
						r || l({
							done: ++y,
							total: _.length
						});
					}
				}
			}
			await Promise.all(Array.from({ length: Math.min(4, _.length) }, b)), !r && m.length && a.fitBounds(m, {
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
var Bn = (0, h.lazy)(() => import("./MagazineReader-Cvgx_U4k.js")), Vn = window.strcSettings.assetBase ?? "";
function Hn({ url: e, title: t, classic: n, pages: r, download: i, search: a = !0 }) {
	let [s, c] = (0, h.useState)(!1), l = (r || []).join(","), u = (0, h.useRef)(null), [d, f] = (0, h.useState)(!1), [p, m] = (0, h.useState)(""), g = (0, h.useRef)(0), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(null), [S, C] = (0, h.useState)(!1), w = (0, h.useRef)({}), T = (0, h.useRef)({}), [E, D] = (0, h.useState)(null), [O, k] = (0, h.useState)(""), [A, j] = (0, h.useState)(null), [M, N] = (0, h.useState)({}), [P, F] = (0, h.useState)(1), [I, L] = (0, h.useState)(null), [R, z] = (0, h.useState)(() => typeof window < "u" && window.innerWidth < 760), [B, V] = (0, h.useState)(null), [H, U] = (0, h.useState)(1), W = (0, h.useRef)(null), ee = (0, h.useRef)(null), te = (e) => {
		let t = W.current, n = Math.max(1, Math.min(3, Math.round(e * 4) / 4)), r = t ? (t.scrollLeft + t.clientWidth / 2) / Math.max(1, t.scrollWidth) : .5, i = t ? (t.scrollTop + t.clientHeight / 2) / Math.max(1, t.scrollHeight) : .5;
		U(n), requestAnimationFrame(() => {
			let e = W.current;
			e && (e.scrollLeft = r * e.scrollWidth - e.clientWidth / 2, e.scrollTop = i * e.scrollHeight - e.clientHeight / 2);
		});
	}, ne = (0, h.useRef)({}), re = (0, h.useRef)(/* @__PURE__ */ new Set()), ie = (0, h.useRef)(null), G = (0, h.useRef)(null), ae = (0, h.useRef)([]), K = (0, h.useRef)(0);
	(0, h.useEffect)(() => () => {
		ae.current.forEach(clearTimeout), K.current++;
	}, []), (0, h.useEffect)(() => {
		let t = !1;
		ae.current.forEach(clearTimeout), ae.current = [], K.current++, ne.current = {}, re.current.clear(), G.current = null, w.current = {}, T.current = {};
		let n;
		return (async () => {
			let r = await import("./pdf-CnPiFuPD.js");
			if (t) return;
			D(null), j(null), N({}), F(1), k(""), L(null), x(null), C(!1), g.current++, r.GlobalWorkerOptions.workerSrc = `${Vn}/pdfjs/pdf.worker.min.js`, n = r.getDocument({
				url: e,
				withCredentials: !0,
				rangeChunkSize: 65536,
				cMapUrl: `${Vn}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${Vn}/pdfjs/standard_fonts/`,
				wasmUrl: `${Vn}/pdfjs/wasm/`
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
			let o = l ? l.split(",").map(Number).map((e) => a[e - 1]).filter((e) => !!e) : a;
			G.current = o, j(o), D(i);
		})().catch(() => {
			t || k(o("Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen."));
		}), () => {
			t = !0, n?.destroy().catch(() => {});
		};
	}, [e, l]), (0, h.useEffect)(() => {
		let e = () => f(document.fullscreenElement === u.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	function oe() {
		m(""), document.fullscreenElement ? document.exitFullscreen() : u.current?.requestFullscreen ? u.current.requestFullscreen().catch(() => m(o("Vollbild ist in diesem Browser nicht verfügbar."))) : m(o("Vollbild ist in diesem Browser nicht verfügbar."));
	}
	async function se() {
		let e = v.trim().toLocaleLowerCase("de-CH"), t = G.current;
		if (!E || !t || e.length < 2) {
			x(null);
			return;
		}
		C(!0);
		let n = K.current, r = ++g.current, i = [];
		try {
			for (let a = 1; a <= E.numPages; a++) {
				if (!w.current[a]) {
					let e = await E.getPage(a), t = await e.getTextContent();
					if (n !== K.current || r !== g.current) return;
					T.current[a] = e.getViewport({ scale: 1 }).width, w.current[a] = t.items.map((e) => "str" in e ? {
						str: e.str,
						x: e.transform[4]
					} : {
						str: "",
						x: 0
					});
				}
				if (n !== K.current || r !== g.current) return;
				let o = w.current[a], s = T.current[a];
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
			x(i);
		} catch {
			n === K.current && r === g.current && x([]);
		} finally {
			n === K.current && r === g.current && C(!1);
		}
	}
	function ce(e) {
		ae.current.forEach(clearTimeout), ae.current = [], L(null), F(e);
	}
	(0, h.useEffect)(() => {
		let e = () => z(window.innerWidth < 760);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []);
	let le = B ?? R, q = A ? A.length : 0, J = (e) => le ? [e] : e <= 1 ? [0, 1] : [e - e % 2, e - e % 2 + 1 <= q ? e - e % 2 + 1 : 0], ue = (e) => le ? e : e <= 1 ? 1 : e - e % 2, Y = J(P), de = ue(P), fe = le ? de + 1 : de <= 1 ? 2 : de + 2, pe = le ? de - 1 : de <= 3 ? 1 : de - 2, me = q > 0 && fe <= q, he = de > 1, ge = (e) => {
		let t = A?.[e - 1];
		return t ? `${t.p}:${t.part}` : "";
	};
	function _e(e, t, n) {
		let r = document.createElement("canvas");
		return r.width = Math.floor(n), r.height = e.height, r.getContext("2d").drawImage(e, t, 0, n, e.height, 0, 0, n, e.height), r.toDataURL("image/jpeg", .86);
	}
	function ve(e) {
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
	async function ye(e) {
		let t = G.current, n = t?.[e - 1];
		if (!E || !n || ne.current[`${n.p}:${n.part}`] || re.current.has(n.p)) return;
		re.current.add(n.p);
		let r = K.current;
		try {
			let e = await E.getPage(n.p), i = e.getViewport({ scale: 1 }), a = e.getViewport({ scale: Math.min(2.2, 1300 / i.height) }), o = document.createElement("canvas");
			if (o.width = Math.floor(a.width), o.height = Math.floor(a.height), await e.render({
				canvas: o,
				viewport: a
			}).promise, r !== K.current) return;
			let s = {};
			if (n.part === "full") s[`${n.p}:full`] = o.toDataURL("image/jpeg", .86);
			else if (s[`${n.p}:left`] = _e(o, 0, o.width / 2), s[`${n.p}:right`] = _e(o, o.width / 2, o.width / 2), n.edge) if (l || ve(o)) s[`${n.p}:center`] = _e(o, o.width / 4, o.width / 2);
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
				G.current = e, j(e);
			}
			ne.current = {
				...ne.current,
				...s
			}, N(ne.current), e.cleanup(), o.width = 0;
		} catch {
			r === K.current && k(o("Die Seite konnte nicht geladen werden. Bitte lade das Magazin erneut."));
		} finally {
			r === K.current && re.current.delete(n.p);
		}
	}
	(0, h.useEffect)(() => {
		if (!E || !A) return;
		let e = [
			...J(P),
			...J(Math.min(q, fe)),
			...J(Math.max(1, pe)),
			...J(Math.min(q, fe + (le ? 1 : 2)))
		];
		(async () => {
			for (let t of e) t && await ye(t);
		})();
	}, [
		E,
		A,
		P,
		le
	]);
	let be = A?.length ? (A[1] || A[0]).r : .707;
	function xe(e) {
		if (I || !E || e > 0 && !me || e < 0 && !he) return;
		let t = e > 0 ? fe : pe, n = J(t);
		L({
			...le ? e > 0 ? {
				under: [n[0]],
				front: Y[0],
				back: -1,
				side: "right"
			} : {
				under: [Y[0]],
				front: n[0],
				back: -1,
				side: "right",
				reverse: !0
			} : e > 0 ? {
				under: [Y[0], n[1]],
				front: Y[1],
				back: n[0],
				side: "right"
			} : {
				under: [n[0], Y[1]],
				front: Y[0],
				back: n[1],
				side: "left"
			},
			go: !1
		}), ae.current.push(setTimeout(() => L((e) => e && {
			...e,
			go: !0
		}), 30)), ae.current.push(setTimeout(() => {
			F(t), L(null);
		}, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 680));
	}
	let Se = (e, t) => {
		if (e === -1) return /* @__PURE__ */ (0, _.jsx)("div", { className: `fb-face fb-paper ${t}` });
		if (!e) return /* @__PURE__ */ (0, _.jsx)("div", { className: `fb-face fb-empty ${t}` });
		let n = M[ge(e)], r = Te(e);
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
	}, Ce = I ? I.under : Y, X = Y.filter(Boolean), we = l ? l.split(",").map(Number) : null, Te = (e) => we?.[e - 1] ?? e, Ee = q ? we ? X.map(Te).join("–") : `${X.length > 1 ? X.join("–") : String(X[0] || 1)} ${o("von")} ${q}` : "", De = i === !1 ? "" : i || e;
	return s ? /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
		fallback: /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Leseansicht wird geladen …")
		}),
		children: /* @__PURE__ */ (0, _.jsx)(Bn, {
			url: e,
			title: t,
			initialPage: A?.[P - 1]?.p || 1,
			download: i !== !1,
			backLabel: "Zur Blätteransicht",
			back: () => c(!1)
		})
	}) : /* @__PURE__ */ (0, _.jsxs)("div", {
		ref: u,
		className: "strc-flipbook" + (le ? " is-single" : "") + (d ? " is-fullscreen" : ""),
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "fb-toolbar",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => xe(-1),
						disabled: !he || !!I,
						children: ["← ", o("Zurück")]
					}),
					/* @__PURE__ */ (0, _.jsx)("span", {
						"aria-live": "polite",
						children: q ? `${o("Seite")} ${Ee}` : o("Magazin wird geladen …")
					}),
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => xe(1),
						disabled: !me || !!I,
						children: [o("Weiter"), " →"]
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: () => V(!le),
						children: o(le ? "Doppelseite" : "Einzelseite")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: oe,
						"aria-pressed": d,
						children: d ? o("Vollbild beenden") : "⛶ " + o("Vollbild")
					}),
					De && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary fb-mode",
						href: De,
						download: !0,
						children: o("Download")
					}),
					!l && /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: !E,
						onClick: () => c(!0),
						children: o("Lesen und zoomen")
					}),
					n && /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: n,
						children: o("Textansicht")
					}),
					/* @__PURE__ */ (0, _.jsxs)("span", {
						className: "fb-zoom-controls",
						role: "group",
						"aria-label": o("Zoom"),
						children: [
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								onClick: () => te(H - .5),
								disabled: H <= 1,
								"aria-label": o("Verkleinern"),
								children: "−"
							}),
							/* @__PURE__ */ (0, _.jsxs)("span", {
								"aria-live": "polite",
								children: [Math.round(H * 100), " %"]
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								onClick: () => te(H + .5),
								disabled: H >= 3,
								"aria-label": o("Vergrössern"),
								children: "+"
							})
						]
					})
				]
			}),
			a && !l && /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "fb-search",
				role: "search",
				onSubmit: (e) => {
					e.preventDefault(), se();
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
						value: v,
						onChange: (e) => {
							g.current++, y(e.target.value), x(null), C(!1);
						}
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "submit",
						className: "club-secondary",
						disabled: !E || S || v.trim().length < 2,
						children: o(S ? "Suche läuft …" : "Suchen")
					}),
					b && /* @__PURE__ */ (0, _.jsx)("div", {
						className: "fb-hits",
						"aria-live": "polite",
						children: b.length ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [
							b.length,
							" ",
							o((b.length, "Treffer")),
							":"
						] }), b.slice(0, 40).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							className: Y.includes(e.v) ? "is-current" : "",
							onClick: () => ce(e.v),
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
			O ? /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: O
			}) : /* @__PURE__ */ (0, _.jsx)("div", {
				ref: W,
				className: `fb-zoom${H > 1 ? " is-zoomed" : ""}`,
				onPointerDown: (e) => {
					if (H <= 1 || e.pointerType === "touch") return;
					let t = e.currentTarget;
					ee.current = {
						x: e.clientX,
						y: e.clientY,
						left: t.scrollLeft,
						top: t.scrollTop
					}, t.setPointerCapture(e.pointerId);
				},
				onPointerMove: (e) => {
					let t = ee.current;
					t && (e.currentTarget.scrollLeft = t.left - (e.clientX - t.x), e.currentTarget.scrollTop = t.top - (e.clientY - t.y));
				},
				onPointerUp: () => {
					ee.current = null;
				},
				onPointerCancel: () => {
					ee.current = null;
				},
				children: /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "fb-book",
					style: {
						aspectRatio: String((le ? 1 : 2) * be),
						"--fb-ratio": (le ? 1 : 2) * be,
						"--fb-zoom": H
					},
					tabIndex: 0,
					role: "group",
					"aria-label": `${t} – ${o("Blättern mit Pfeiltasten, Klick oder Wischen")}`,
					onKeyDown: (e) => {
						if (e.key === "+" || e.key === "=") {
							e.preventDefault(), te(H + .5);
							return;
						}
						if (e.key === "-") {
							e.preventDefault(), te(H - .5);
							return;
						}
						e.key === "ArrowRight" ? (e.preventDefault(), xe(1)) : e.key === "ArrowLeft" && (e.preventDefault(), xe(-1));
					},
					onClick: (e) => {
						if (H > 1) return;
						if (ie.current === "swiped") {
							ie.current = null;
							return;
						}
						let t = e.currentTarget.getBoundingClientRect();
						xe(e.clientX - t.left > t.width / 2 ? 1 : -1);
					},
					onPointerDown: (e) => {
						ie.current = e.clientX;
					},
					onPointerUp: (e) => {
						let t = ie.current;
						ie.current = null, !(H > 1) && typeof t == "number" && Math.abs(e.clientX - t) > 50 && (ie.current = "swiped", xe(e.clientX < t ? 1 : -1));
					},
					children: [
						le ? Se(Ce[0], "fb-single") : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [Se(Ce[0], "fb-left"), Se(Ce[1], "fb-right")] }),
						I && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: `fb-leaf fb-leaf-${le ? "single" : I.side}${I.reverse ? " is-reverse" : ""}${I.go ? " is-turning" : ""}`,
							children: [Se(I.front, "fb-front"), Se(I.back, "fb-back")]
						}),
						!le && /* @__PURE__ */ (0, _.jsx)("span", {
							className: "fb-spine",
							"aria-hidden": "true"
						})
					]
				})
			}),
			p && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: p
			}),
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "fb-hint",
				children: o(H > 1 ? "Vergrösserte Seite mit der Maus ziehen oder scrollen. Blättern mit «Zurück» und «Weiter»." : "Zum Blättern auf die rechte oder linke Seite klicken, wischen oder die Pfeiltasten benutzen.")
			})
		]
	});
}
//#endregion
//#region app/components/ReviewNotifications.tsx
function Un() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(!0), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(!1), [l, u] = (0, h.useState)(""), [d, f] = (0, h.useState)(!1);
	if ((0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_review_notifications", {}, e.signal).then((e) => {
			t(e), e.preferences && (r(e.preferences.email), a(e.preferences.address));
		}).catch(() => {}), () => e.abort();
	}, []), !e?.reviewer || !e.preferences) return null;
	let p = n !== e.preferences.email || i.trim() !== e.preferences.address;
	async function m() {
		if (e) {
			c(!0), u("");
			try {
				t(await w("strc_review_notifications", e.nonce, T({
					operation: "save",
					email: n ? "1" : "0",
					address: i.trim()
				}))), u(o("Gespeichert."));
			} catch (e) {
				u(e.message);
			} finally {
				c(!1);
			}
		}
	}
	let g = () => {
		f(!1), u(""), e.preferences && (r(e.preferences.email), a(e.preferences.address));
	};
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("button", {
		type: "button",
		className: "club-secondary",
		onClick: () => f(!0),
		children: [o("Benachrichtigungen"), !e.preferences.email && /* @__PURE__ */ (0, _.jsxs)("span", {
			className: "db-badge-off",
			children: [" · ", o("aus")]
		})]
	}), d && /* @__PURE__ */ (0, _.jsx)(X, {
		title: o("Benachrichtigungen zu neuen Mitgliederbeiträgen"),
		close: g,
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "review-notifications",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Neue Einreichungen (Galerie, Bibliothek, Marktplatz) erscheinen immer hier im Dashboard. Die E-Mail dazu kannst du ausschalten oder an eine andere Adresse senden lassen.")
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						checked: n,
						disabled: s,
						onChange: (e) => r(e.target.checked)
					}), /* @__PURE__ */ (0, _.jsx)("span", { children: o("E-Mail-Benachrichtigung senden") })]
				}),
				n && /* @__PURE__ */ (0, _.jsxs)("label", {
					className: "review-address",
					children: [
						o("E-Mail-Adresse für diese Benachrichtigungen (optional)"),
						/* @__PURE__ */ (0, _.jsx)("input", {
							type: "email",
							maxLength: 200,
							value: i,
							placeholder: e.accountEmail,
							disabled: s,
							onChange: (e) => a(e.target.value)
						}),
						/* @__PURE__ */ (0, _.jsx)("small", { children: o("Leer = Adresse deines Kontos") })
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							onClick: g,
							children: o("Schliessen")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "market-primary",
							disabled: s || !p,
							onClick: () => void m(),
							children: o(s ? "Wird gespeichert …" : "Speichern")
						}),
						l && /* @__PURE__ */ (0, _.jsx)("span", {
							role: "status",
							children: l
						})
					]
				})
			]
		})
	})] });
}
//#endregion
//#region app/components/MemberDashboard.tsx
var Wn = {
	"#forum": "◎",
	"#galerie": "▧",
	"#bibliothek": "▤",
	"#marktplatz": "◇",
	"#tr-shop": "▣",
	"#agenda-verwalten": "▦",
	"#antraege": "✉",
	"#kasse": "₣"
}, Gn = (e) => Wn[String(e || "").split("/")[0]] || "◉", Kn = {
	review_open: "Offen",
	approved: "Freigegeben",
	rejected: "Abgelehnt",
	archived: "Archiviert",
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
function qn({ extraTools: e = [], logoutUrl: t = "" }) {
	let { language: i } = n(), [a, s] = (0, h.useState)(null), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(0), [f, p] = (0, h.useState)(0);
	(0, h.useEffect)(() => {
		if (!f) return;
		let e = (e) => {
			e.target instanceof Element && e.target.closest(".dashboard-car-chip-wrap") || p(0);
		};
		return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
	}, [f]);
	let [m, g] = (0, h.useState)(!1), [y, b] = (0, h.useState)(!1), [x, S] = (0, h.useState)(!1), [E, D] = (0, h.useState)("");
	if ((0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_dashboard", { language: i }, e.signal).then((e) => {
			s(e), l("");
		}).catch((t) => {
			e.signal.aborted || l(t.message);
		}), () => e.abort();
	}, [u, i]), c) return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content",
		children: [/* @__PURE__ */ (0, _.jsx)("p", {
			role: "alert",
			children: c
		}), /* @__PURE__ */ (0, _.jsx)("button", {
			className: "club-secondary",
			onClick: () => d((e) => e + 1),
			children: o("Erneut versuchen")
		})]
	});
	if (!a) return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content",
		children: /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Ihre Übersicht wird geladen …")
		})
	});
	let O = a.magazineIssue || null, k = a.isBoard, A = a.notifications.filter((e) => e && typeof e == "object" && typeof e.title == "string" && typeof e.url == "string"), j = a.registrations.filter((e) => ![
		"cancelled",
		"expired",
		"waiting"
	].includes(e.state || "") && [
		"outstanding",
		"partially_paid",
		"pending_payment",
		"failed"
	].includes(e.paymentStatus || "")), M = (e) => {
		if (!e) return "";
		let t = new Date(e);
		return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(r());
	}, N = (e, t) => /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: e.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: e.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
		/* @__PURE__ */ (0, _.jsx)("a", {
			href: e.url,
			children: e.title.startsWith("Neue Antwort:") ? o("Neue Antwort:") + e.title.slice(13) : e.title
		}),
		e.registered && /* @__PURE__ */ (0, _.jsxs)("strong", { children: [" · ", o("Bereits angemeldet")] }),
		e.location && /* @__PURE__ */ (0, _.jsx)("p", { children: e.location }),
		M(e.startAt || e.at) && /* @__PURE__ */ (0, _.jsx)("p", { children: M(e.startAt || e.at) }),
		/* @__PURE__ */ (0, _.jsx)("p", { children: [
			e.status && o(Kn[e.status] || e.status),
			e.state && o(Kn[e.state] || e.state),
			e.paymentStatus && o(Kn[e.paymentStatus] || e.paymentStatus),
			e.total
		].filter(Boolean).join(" · ") })
	] }, e.id || t)) }) : t ? /* @__PURE__ */ (0, _.jsx)("p", { children: o(t) }) : null }), P = e.filter((e) => [
		"#agenda-verwalten",
		"#antraege",
		"#kasse"
	].includes(e.url)).map((e) => ({
		url: e.url,
		title: e.url === "#antraege" ? "Anträge bearbeiten" : e.url === "#kasse" ? "Kasse: Teilnehmerlisten" : "Agenda verwalten"
	})), F = e.find((e) => e.url === "#redaktion"), I = () => {
		O && (O.canRead && O.fileUrl ? b(!0) : window.location.href = O.loginUrl || a.magazine?.url || "#bibliothek");
	}, L = a.membership || {}, R = a.subscriptions, z = R ? R.request ? {
		print: R.request.print,
		newsletter: R.request.newsletter
	} : {
		print: R.print,
		newsletter: R.newsletter
	} : null;
	async function B(e, t) {
		if (!z || !a?.nonce || x) return;
		let n = {
			...z,
			[e]: t
		};
		S(!0), D("");
		try {
			let e = await w("strc_dashboard", a.nonce, T({
				operation: "subscriptions",
				print: n.print ? "1" : "0",
				newsletter: n.newsletter ? "1" : "0"
			}));
			s((t) => t && {
				...t,
				subscriptions: e.subscriptions
			}), D(e.message);
		} catch (e) {
			D(e.message);
		} finally {
			S(!1);
		}
	}
	let V = [L.since && o("Mitglied seit") + ": " + L.since, (L.region || a.region) && o("Region") + " " + (L.region || a.region)].filter(Boolean);
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content personal-dashboard",
		children: [/* @__PURE__ */ (0, _.jsxs)("header", {
			className: "dashboard-welcome has-cockpit",
			style: { "--dashboard-art": `url("${Y("/club/cockpit-tr4a.png")}")` },
			children: [
				/* @__PURE__ */ (0, _.jsxs)("a", {
					className: "dashboard-avatar is-link" + (a.photo ? " has-photo" : ""),
					href: "#profil",
					title: o("Profil bearbeiten"),
					children: [
						a.photo ? /* @__PURE__ */ (0, _.jsx)(v, {
							unoptimized: !0,
							src: a.photo,
							alt: "",
							width: 88,
							height: 88
						}) : /* @__PURE__ */ (0, _.jsx)("span", {
							"aria-hidden": "true",
							children: (a.firstName || a.displayName).split(/\s+/).slice(0, 2).map((e) => Array.from(e)[0]).join("")
						}),
						/* @__PURE__ */ (0, _.jsx)("span", {
							className: "dashboard-avatar-edit",
							"aria-hidden": "true",
							children: "✎"
						}),
						/* @__PURE__ */ (0, _.jsx)("span", {
							className: "market-sr-only",
							children: o("Profil bearbeiten")
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "dashboard-welcome-main",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("h2", { children: [
							o("Willkommen"),
							" ",
							a.firstName || a.displayName,
							"!"
						] }),
						V.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "db-member-line",
							children: V.join(" | ")
						}),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "dashboard-car-chips",
							children: a.vehicles.slice(0, 3).map((e) => {
								let t = `${e.model} ${e.details} · ${o(e.status === "restoration" ? "In Restauration" : "Fahrbereit")}`.replace(/\s+/g, " ");
								return e.photo ? /* @__PURE__ */ (0, _.jsxs)("span", {
									className: "dashboard-car-chip-wrap",
									onMouseEnter: () => p(e.id),
									onMouseLeave: () => p((t) => t === e.id ? 0 : t),
									children: [/* @__PURE__ */ (0, _.jsxs)("button", {
										type: "button",
										className: "dashboard-car-chip has-photo",
										"aria-expanded": f === e.id,
										onClick: () => p(e.id),
										onKeyDown: (e) => {
											e.key === "Escape" && p(0);
										},
										children: [
											t,
											" ",
											/* @__PURE__ */ (0, _.jsx)("span", {
												"aria-hidden": "true",
												children: "▣"
											})
										]
									}), f === e.id && /* @__PURE__ */ (0, _.jsx)("span", {
										className: "dashboard-car-photo",
										role: "tooltip",
										children: /* @__PURE__ */ (0, _.jsx)(v, {
											unoptimized: !0,
											src: e.photo,
											alt: `${e.model} ${e.details}`.trim(),
											width: 480,
											height: 270,
											style: {
												...pe(e.photoFrame, "cover"),
												aspectRatio: "16 / 9",
												height: "auto"
											}
										})
									})]
								}, e.id) : /* @__PURE__ */ (0, _.jsx)("span", {
									className: "dashboard-car-chip",
									children: t
								}, e.id);
							})
						}),
						!a.vehicles.length && /* @__PURE__ */ (0, _.jsx)("a", {
							href: "#profil",
							children: o("Fahrzeuge erfassen")
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "dashboard-welcome-side",
					children: [
						L.type && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "db-membership-type",
							children: o(L.type)
						}),
						L.number && /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "db-member-number",
							children: [
								o("Mitgliedsnummer"),
								": ",
								/* @__PURE__ */ (0, _.jsx)("strong", { children: L.number })
							]
						}),
						L.partner && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "db-member-partner",
							children: L.partner
						}),
						/* @__PURE__ */ (0, _.jsxs)("a", {
							className: "dashboard-profile-link",
							href: "#profil",
							children: [
								o("Profil bearbeiten"),
								" ",
								/* @__PURE__ */ (0, _.jsx)("span", {
									"aria-hidden": "true",
									children: "→"
								})
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "dashboard-sections",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-upcoming db-card db-events",
					children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: "#agenda",
						children: o("Nächste Events")
					}) }), a.upcoming.length ? /* @__PURE__ */ (0, _.jsx)("ul", {
						className: "db-event-list",
						children: a.upcoming.slice(0, 3).map((e, t) => {
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
									/* @__PURE__ */ (0, _.jsx)("span", { children: [e.location, M(e.startAt || e.at)].filter(Boolean).join(" · ") }),
									e.registered ? /* @__PURE__ */ (0, _.jsxs)("span", {
										className: "db-registered",
										children: ["✓ ", o("Bereits angemeldet")]
									}) : null
								]
							})] }, e.id || t);
						})
					}) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine bevorstehenden Veranstaltungen.") })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-notifications db-card db-feed",
					children: [
						/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Aktivitäten & Mitteilungen") }),
						N(A.slice(0, 6), ""),
						j.length > 0 && N(j, ""),
						a.magazine && !O && /* @__PURE__ */ (0, _.jsx)("a", {
							href: a.magazine.url,
							children: a.magazine.title
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-activity db-card db-mine",
					children: [
						/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Meine Aktivitäten") }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Anlässe") }), N(a.registrations, "Noch keine Anmeldungen.")] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Beiträge und Inserate") }), N(a.uploads, "Noch keine Beiträge eingereicht.")] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Shop-Bestellungen") }), N(a.orders, "Noch keine Bestellungen.")] }),
						(a.queues.length > 0 || P.length > 0) && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "db-moderation",
							children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Meine Moderationsaufgaben") }), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "db-moderation-grid",
								children: [a.queues.filter((e) => e.url !== "#antraege/paar").map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
									className: "db-mod-tile" + ((e.count || 0) > 0 ? " has-open" : ""),
									href: e.url,
									children: [
										/* @__PURE__ */ (0, _.jsx)("i", {
											"aria-hidden": "true",
											children: Gn(e.url)
										}),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.title) }),
										/* @__PURE__ */ (0, _.jsx)("span", { children: (e.count || 0) > 0 ? `${e.count} ${o("In Prüfung")}` : o("Nichts offen") })
									]
								}, e.url)), P.map((e) => {
									let t = e.url === "#antraege" && a.queues.find((e) => e.url === "#antraege/paar")?.count || 0;
									return e.url === "#agenda-verwalten" && a.myEvents?.length ? /* @__PURE__ */ (0, _.jsxs)("div", {
										className: "db-mod-tile is-tool is-agenda" + (m ? " is-open" : ""),
										children: [/* @__PURE__ */ (0, _.jsxs)("button", {
											type: "button",
											className: "db-agenda-head",
											"aria-expanded": m,
											onClick: () => g((e) => !e),
											children: [
												/* @__PURE__ */ (0, _.jsx)("i", {
													"aria-hidden": "true",
													children: Gn(e.url)
												}),
												/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.title) }),
												/* @__PURE__ */ (0, _.jsxs)("span", { children: [
													a.myEvents.length,
													" ",
													o(a.myEvents.length === 1 ? "Termin" : "Termine"),
													" ",
													m ? "▴" : "▾"
												] })
											]
										}), m && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("ul", {
											className: "db-agenda-list",
											children: a.myEvents.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
												/* @__PURE__ */ (0, _.jsx)("span", {
													className: "db-agenda-date",
													children: M(e.startAt)
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
										}), /* @__PURE__ */ (0, _.jsxs)("a", {
											className: "db-agenda-open",
											href: e.url,
											children: [o("Agenda verwalten öffnen"), " →"]
										})] })]
									}, e.url) : /* @__PURE__ */ (0, _.jsxs)("div", {
										className: "db-mod-tile is-tool" + (t > 0 ? " has-open" : ""),
										children: [/* @__PURE__ */ (0, _.jsxs)("a", {
											className: "db-tool-main",
											href: e.url,
											children: [
												/* @__PURE__ */ (0, _.jsx)("i", {
													"aria-hidden": "true",
													children: Gn(e.url)
												}),
												/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.title) }),
												/* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Öffnen"), " →"] })
											]
										}), e.url === "#antraege" && /* @__PURE__ */ (0, _.jsxs)("a", {
											className: "db-tool-option",
											href: "#antraege/paar",
											children: [o("Paarmitgliedschaften"), t > 0 ? ` · ${t} ${o("offen")}` : ""]
										})]
									}, e.url);
								})]
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
						(O || z) && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "db-magazine",
							children: [
								/* @__PURE__ */ (0, _.jsx)("h3", { children: o("TR-Magazin") }),
								O && /* @__PURE__ */ (0, _.jsxs)("button", {
									type: "button",
									className: "db-magazine-card",
									onClick: I,
									children: [O.cover || O.previewPages?.[0] ? /* @__PURE__ */ (0, _.jsx)(v, {
										unoptimized: !0,
										width: 96,
										height: 128,
										className: "db-magazine-cover",
										src: O.cover || O.previewPages[0],
										alt: "",
										loading: "lazy"
									}) : /* @__PURE__ */ (0, _.jsxs)("span", {
										className: "db-magazine-mark",
										"aria-hidden": "true",
										children: ["TR", /* @__PURE__ */ (0, _.jsx)("small", { children: "MAGAZINE" })]
									}), /* @__PURE__ */ (0, _.jsxs)("span", {
										className: "db-magazine-text",
										children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: O.title }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Jetzt lesen"), " →"] })]
									})]
								}),
								z && /* @__PURE__ */ (0, _.jsxs)("fieldset", {
									className: "db-subscriptions",
									disabled: x,
									children: [
										/* @__PURE__ */ (0, _.jsx)("legend", {
											className: "market-sr-only",
											children: o("Abonnemente")
										}),
										/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											checked: z.print,
											onChange: (e) => void B("print", e.target.checked)
										}), o("Printausgabe abonniert")] }),
										/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											checked: z.newsletter,
											onChange: (e) => void B("newsletter", e.target.checked)
										}), o("eNewsletter abonniert")] }),
										E ? /* @__PURE__ */ (0, _.jsx)("small", {
											role: "status",
											children: E
										}) : R?.request ? /* @__PURE__ */ (0, _.jsx)("small", { children: o("Änderung gemeldet.") }) : null
									]
								})
							]
						}),
						y && O?.fileUrl && /* @__PURE__ */ (0, _.jsx)(X, {
							title: O.title,
							close: () => b(!1),
							children: /* @__PURE__ */ (0, _.jsx)(Hn, {
								url: O.fileUrl,
								title: O.title
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
								children: o("Mitgliedschafts-Profil")
							}),
							k && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: "#clubdokumente",
								children: o("Clubdokumente")
							}),
							F && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: F.url,
								children: o("Redaktion")
							}),
							/* @__PURE__ */ (0, _.jsx)(Un, {}),
							t && /* @__PURE__ */ (0, _.jsxs)("a", {
								className: "club-secondary db-logout",
								href: t,
								children: ["⏻ ", o("Abmelden")]
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
function Jn() {
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
var Yn = {
	"Teile gesucht": "Ersatzteilsuche",
	"Garagen / Spezialisten": "TR-Spezialisten"
}, Xn = {
	Fahrzeuge: ["🚗", "TR2–TR3A · TR4–TR4A · TR5–TR6 · TR7–TR8 · andere Triumphs"],
	Technik: ["🔧", "Motor · Vergaser/Einspritzung · Elektrik · Fahrwerk · Karosserie · Getriebe/Overdrive"],
	Restaurationen: ["🛠", "Projekte und Erfahrungen"],
	"Teile gesucht": ["🔩", "Gesucht · Bezugsquellen · Identifikation"],
	"Garagen / Spezialisten": ["🏠", "Werkstätten · Spezialisten · Sattler · Lackierer"],
	"Events & Reisen": ["🗺", "Reiseberichte · Roadbooks · Hoteltipps"],
	Clubleben: ["🏛", "Fragen zum Club · Ideen & Vorschläge"]
}, Zn = [
	"#e7f0f8",
	"#e9f4ec",
	"#fbf1e4",
	"#f6e8ea",
	"#f1edf7",
	"#e6f4f3",
	"#fdf6dc",
	"#eef1f3"
], Qn = (e) => Yn[e] || e, $n = (e) => Xn[e]?.[0] || "💬", er = (e) => Xn[e]?.[1] || "", tr = (e) => Zn[e % Zn.length];
function nr(e = !0) {
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
function rr({ area: e, forum: t }) {
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
var ir = [
	"Chassis",
	"Karosserie",
	"Räder / Reifen",
	"Innenausstattung",
	"Verdecke",
	"Instrumente",
	"Sonstiges"
];
function ar({ forum: e }) {
	let t = I(), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)([]), [s, c] = (0, h.useState)([]), [l, u] = (0, h.useState)(null), [d, f] = (0, h.useState)([]), [p, m] = (0, h.useState)([]), [g, v] = (0, h.useState)([]), [y, b] = (0, h.useState)(!1), [x, S] = (0, h.useState)(""), [E, D] = (0, h.useState)("");
	if ((0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_forum_settings", { search: "" }, e.signal).then((e) => c(e.members.filter((e) => e.expertise.some((e) => e.model || e.component)))).catch(() => {}), () => e.abort();
	}, []), (0, h.useEffect)(() => {
		if (n.trim().length < 2) return;
		let e = new AbortController(), t = setTimeout(() => {
			C("strc_forum_settings", { search: n }, e.signal).then((e) => a(e.members.slice(0, 8))).catch(() => {});
		}, 200);
		return () => {
			clearTimeout(t), e.abort();
		};
	}, [n]), !e.settings?.canManage) return /* @__PURE__ */ (0, _.jsx)("p", {
		role: "alert",
		children: o("Nur für Administration und Forumsmoderation.")
	});
	let O = l ? JSON.stringify([[...new Set(l.expertise.map((e) => e.model).filter(Boolean))].sort(), [...new Set(l.expertise.map((e) => e.component).filter(Boolean))].sort()]) : "", k = !!l && JSON.stringify([[...p].sort(), [...g].sort()]) !== O;
	function A(e) {
		k && !window.confirm(o("Ungespeicherte Änderungen verwerfen?")) || (r(""), u(e), m([...new Set(e.expertise.map((e) => e.model).filter(Boolean))]), v([...new Set(e.expertise.map((e) => e.component).filter(Boolean))]), S(""));
	}
	async function j() {
		if (!l || !e.settings) return;
		let t = (p.length ? p : [""]).flatMap((e) => (g.length ? g : [""]).map((t) => ({
			model: e,
			component: t,
			area: ""
		}))).filter((e) => e.model || e.component);
		b(!0), S("");
		try {
			await w("strc_forum_settings", e.settings.nonce, T({
				operation: "expert-save",
				id: String(l.id),
				expertise: JSON.stringify(t)
			}));
			let n = {
				...l,
				expertise: t
			};
			u(n), S(o("Gespeichert.")), c((e) => [...e.filter((e) => e.id !== n.id), ...t.length ? [n] : []].sort((e, t) => e.name.localeCompare(t.name, "de-CH")));
		} catch (e) {
			S(e.message);
		} finally {
			b(!1);
		}
	}
	let M = (e, t) => e.includes(t) ? e.filter((e) => e !== t) : [...e, t], N = (e) => ({
		m: [...new Set(e.expertise.map((e) => e.model).filter(Boolean))],
		c: [...new Set(e.expertise.map((e) => e.component).filter(Boolean))]
	}), P = s.filter((e) => !E || e.expertise.some((e) => e.model === E || e.component === E)), F = (e, t, n, r) => {
		let i = e.length > 0 && e.every((e) => t.includes(e));
		return /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "role-scope-chips",
			children: [/* @__PURE__ */ (0, _.jsx)("button", {
				type: "button",
				className: "role-scope-all" + (i ? " is-on" : ""),
				"aria-pressed": i,
				onClick: () => n(i ? t.filter((t) => !e.includes(t)) : [...new Set([...t, ...e])]),
				children: o("Alle")
			}), e.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", {
				className: t.includes(e) ? "is-on" : "",
				children: [/* @__PURE__ */ (0, _.jsx)("input", {
					type: "checkbox",
					checked: t.includes(e),
					onChange: () => n(M(t, e))
				}), r(e)]
			}, e))]
		});
	}, L = t.components.filter((e) => ir.includes(e)), z = t.components.filter((e) => !ir.includes(e));
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(cr, {}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "role-assignment-panel forum-experts",
		children: [/* @__PURE__ */ (0, _.jsx)("header", {
			className: "role-head",
			children: /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Fachexperten zuteilen") }), /* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o("Mitglied suchen, Fahrzeuge und Technikbereiche ankreuzen, speichern. Ohne Fahrzeug gilt der Bereich für alle Modelle. Fachexperte ist keine Rolle, sondern eine Einstufung für Benachrichtigungen.")
			})] })
		}), /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "role-layout",
			children: [/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "role-editor",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "role-search",
					children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitglied suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
						type: "search",
						value: n,
						placeholder: o("Name, mind. 2 Zeichen"),
						onChange: (e) => r(e.target.value)
					})] }), n.trim().length >= 2 && /* @__PURE__ */ (0, _.jsx)("ul", {
						className: "role-search-results",
						children: i.length ? i.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							onClick: () => A(e),
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.name }), e.expertise.some((e) => e.model || e.component) && /* @__PURE__ */ (0, _.jsx)("em", { children: o("Fachexperte") })]
						}) }, e.id)) : /* @__PURE__ */ (0, _.jsx)("li", {
							className: "is-empty",
							children: o("Keine passenden Personen gefunden.")
						})
					})]
				}), l ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "role-person",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "role-person-head",
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "role-avatar",
									"aria-hidden": "true",
									children: l.name.split(/\s+/).slice(0, 2).map((e) => e[0]).join("")
								}),
								/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: l.name }), /* @__PURE__ */ (0, _.jsx)("p", { children: p.length || g.length ? `${p.length} ${o("Fahrzeuge")} · ${g.length} ${o("Technikbereiche")}` : o("Noch keine Zuteilung") })] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									onClick: () => {
										(!k || window.confirm(o("Ungespeicherte Änderungen verwerfen?"))) && (u(null), S(""));
									},
									children: o("Schliessen")
								})
							]
						}),
						/* @__PURE__ */ (0, _.jsxs)("section", {
							className: "role-group",
							children: [/* @__PURE__ */ (0, _.jsx)("h4", { children: o("Fahrzeuge") }), F(R, p, m, (e) => e)]
						}),
						/* @__PURE__ */ (0, _.jsxs)("section", {
							className: "role-group",
							children: [/* @__PURE__ */ (0, _.jsx)("h4", { children: o("Technikbereiche") }), F(z, g, v, (e) => o(e))]
						}),
						L.length > 0 && /* @__PURE__ */ (0, _.jsxs)("section", {
							className: "role-group",
							children: [/* @__PURE__ */ (0, _.jsx)("h4", { children: o("Sonstiges") }), F(L, g, v, (e) => o(e))]
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "role-actions",
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", {
									role: "status",
									children: x ? "✓ " + x : k ? o("Ungespeicherte Änderungen") : ""
								}),
								(p.length > 0 || g.length > 0) && /* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "club-secondary",
									disabled: y,
									onClick: () => {
										m([]), v([]);
									},
									children: o("Alle entfernen")
								}),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-primary",
									disabled: y || !k,
									onClick: () => void j(),
									children: o(y ? "Wird gespeichert …" : "Speichern")
								})
							]
						})
					]
				}) : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "role-empty",
					children: /* @__PURE__ */ (0, _.jsx)("p", { children: o("Wähle ein Mitglied über die Suche oder rechts in der Übersicht.") })
				})]
			}), /* @__PURE__ */ (0, _.jsxs)("aside", {
				className: "role-overview",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "role-overview-head",
					children: [/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
						o("Wer ist Experte wofür"),
						" · ",
						s.length
					] }), /* @__PURE__ */ (0, _.jsxs)("select", {
						"aria-label": o("Nach Thema filtern"),
						value: E,
						onChange: (e) => D(e.target.value),
						children: [
							/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Themen")
							}),
							/* @__PURE__ */ (0, _.jsx)("optgroup", {
								label: o("Fahrzeuge"),
								children: R.filter((e) => s.some((t) => t.expertise.some((t) => t.model === e))).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: e
								}, e))
							}),
							/* @__PURE__ */ (0, _.jsx)("optgroup", {
								label: o("Technikbereiche"),
								children: t.components.filter((e) => s.some((t) => t.expertise.some((t) => t.component === e))).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))
							})
						]
					})]
				}), P.length ? /* @__PURE__ */ (0, _.jsx)("ul", {
					className: "expert-overview",
					children: P.map((e) => {
						let { m: t, c: n } = N(e), r = d.includes(e.id);
						return /* @__PURE__ */ (0, _.jsxs)("li", {
							className: l?.id === e.id ? "is-selected" : "",
							children: [/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "expert-row",
								children: [/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "expert-toggle",
									"aria-expanded": r,
									"aria-label": o(r ? "Zuklappen" : "Aufklappen") + ": " + e.name,
									onClick: () => f((t) => r ? t.filter((t) => t !== e.id) : [...t, e.id]),
									children: r ? "▾" : "▸"
								}), /* @__PURE__ */ (0, _.jsxs)("button", {
									type: "button",
									className: "expert-name",
									onClick: () => A(e),
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, _.jsx)("small", { children: [t.length ? `${t.length} ${o(t.length === 1 ? "Fahrzeug" : "Fahrzeuge")}` : o("alle Modelle"), `${n.length} ${o(n.length === 1 ? "Technikbereich" : "Technikbereiche")}`].join(" · ") })]
								})]
							}), r && /* @__PURE__ */ (0, _.jsxs)("span", {
								className: "role-chips",
								children: [t.map((e) => /* @__PURE__ */ (0, _.jsx)("span", {
									className: "role-chip",
									children: e
								}, e)), n.map((e) => /* @__PURE__ */ (0, _.jsx)("span", {
									className: "role-chip is-members",
									children: o(e)
								}, e))]
							})]
						}, e.id);
					})
				}) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o(E ? "Für dieses Thema ist noch niemand eingeteilt." : "Noch keine Fachexperten zugeteilt.")
				})]
			})]
		})]
	})] });
}
var or = {
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
}, sr = {
	accepted: "angenommen",
	failed: "abgelehnt",
	uncertain: "unklar",
	sending: "wird gesendet"
};
function cr() {
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
				children: o(or[s] || s)
			}),
			l && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: l
			}),
			e.deliveries.length > 0 && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Letzte Zustellungen an Make") }), /* @__PURE__ */ (0, _.jsx)("table", {
				className: "whatsapp-deliveries",
				children: /* @__PURE__ */ (0, _.jsx)("tbody", { children: e.deliveries.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, _.jsx)("td", { children: e.at ? new Date(e.at).toLocaleString("de-CH") : "" }),
					/* @__PURE__ */ (0, _.jsx)("td", { children: o(sr[e.state] || e.state) }),
					/* @__PURE__ */ (0, _.jsx)("td", { children: e.code ? `HTTP ${e.code}` : "" })
				] }, t)) })
			})] })
		]
	});
}
//#endregion
//#region app/components/PdfThumb.tsx
var lr = window.strcSettings.assetBase ?? "", ur = /* @__PURE__ */ new Map();
function dr({ url: e, width: t = 120 }) {
	let n = (0, h.useRef)(null), [r, i] = (0, h.useState)(() => ({
		url: e,
		src: ur.get(e) || ""
	})), a = r.url === e ? r.src : ur.get(e) || "", [o, s] = (0, h.useState)(!1);
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
			a.GlobalWorkerOptions.workerSrc = `${lr}/pdfjs/pdf.worker.min.js`, r = a.getDocument({
				url: e,
				withCredentials: !0,
				rangeChunkSize: 65536,
				disableAutoFetch: !0,
				cMapUrl: `${lr}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${lr}/pdfjs/standard_fonts/`,
				wasmUrl: `${lr}/pdfjs/wasm/`
			});
			let o = await (await r.promise).getPage(1), s = o.getViewport({ scale: 1 }), c = s.width / s.height > 1.2, l = (c ? t * 2 : t) * 2 / s.width, u = o.getViewport({ scale: l }), d = document.createElement("canvas");
			d.width = Math.floor(u.width), d.height = Math.floor(u.height), await o.render({
				canvas: d,
				viewport: u
			}).promise;
			let f = d;
			c && (f = document.createElement("canvas"), f.width = Math.floor(d.width / 2), f.height = d.height, f.getContext("2d").drawImage(d, d.width / 4, 0, d.width / 2, d.height, 0, 0, d.width / 2, d.height));
			let p = f.toDataURL("image/jpeg", .8);
			ur.set(e, p), n || i({
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
//#region app/components/GalleryUpload.ts
async function fr(e) {
	if (![
		"image/jpeg",
		"image/png",
		"image/webp"
	].includes(e.type) || !e.size || e.size > 50 * 1024 * 1024) throw Error("Bitte JPG, PNG oder WebP bis 50 MB auswählen.");
	let t = URL.createObjectURL(e), n = new window.Image(), r = document.createElement("canvas");
	try {
		n.src = t;
		try {
			await n.decode();
		} catch {
			throw Error("Das Bild konnte nicht gelesen werden. Bitte eine gültige Bilddatei auswählen.");
		}
		let i = n.naturalWidth, a = n.naturalHeight;
		if (!i || !a || i * a > 1e8) throw Error("Das Bild ist ungültig oder überschreitet 100 Megapixel.");
		if (e.size <= 16 * 1024 * 1024 && i * a <= 4e7) return {
			file: e,
			optimized: !1
		};
		let o = Math.min(1, 4e3 / Math.max(i, a)), s = .9;
		for (let t = 0; t < 9; t++) {
			r.width = Math.max(1, Math.round(i * o)), r.height = Math.max(1, Math.round(a * o));
			let t = r.getContext("2d");
			if (!t) throw Error("Die Bildverarbeitung ist in diesem Browser nicht verfügbar.");
			t.fillStyle = "#fff", t.fillRect(0, 0, r.width, r.height), t.drawImage(n, 0, 0, r.width, r.height);
			let c = await new Promise((e) => r.toBlob(e, "image/jpeg", s));
			if (!c) throw Error("Das Bild konnte nicht verkleinert werden.");
			if (c.size <= 16 * 1024 * 1024) return {
				file: new File([c], e.name.replace(/\.[^.]+$/, "") + ".jpg", {
					type: "image/jpeg",
					lastModified: e.lastModified
				}),
				optimized: !0
			};
			s > .6 ? s = Math.max(.6, s - .1) : o *= .8;
		}
		throw Error("Das Bild konnte nicht auf 16 MB verkleinert werden.");
	} finally {
		URL.revokeObjectURL(t), n.src = "", r.width = r.height = 1;
	}
}
//#endregion
//#region app/components/MemberPortrait.tsx
var pr = [
	"Zürich",
	"Bern",
	"Ostschweiz",
	"Mittelland",
	"Innerschweiz",
	"Nordwestschweiz",
	"Suisse Romande"
], mr = {
	vehicle: "",
	chassis: "",
	year: "",
	note: "",
	features: "",
	owner: "",
	place: "",
	region: ""
};
function hr(e) {
	let t = e?.portrait;
	return t && !Array.isArray(t) && t.owner ? t : null;
}
function gr({ item: e, edit: t }) {
	let n = hr(e);
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
						n.place && /* @__PURE__ */ (0, _.jsx)("p", { children: n.place }),
						n.region && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
							o("Region"),
							" ",
							o(n.region)
						] })
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
function _r({ item: e, nonce: t, close: n, saved: r, deleted: i }) {
	let [a, s] = (0, h.useState)(hr(e) || mr), [c, l] = (0, h.useState)(e?.description || ""), [u, d] = (0, h.useState)(null), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)(null), [b, x] = (0, h.useState)(null), [S, E] = (0, h.useState)(null);
	(0, h.useEffect)(() => {
		if (e || b || m.trim().length < 2) return;
		let t = new AbortController(), n = window.setTimeout(() => {
			C("strc_community", {
				operation: "portrait-member",
				search: m.trim()
			}, t.signal).then((e) => y(e.members)).catch(() => {
				t.signal.aborted || y([]);
			});
		}, 250);
		return () => {
			window.clearTimeout(n), t.abort();
		};
	}, [
		m,
		e,
		b
	]);
	function D(e) {
		x(e), s({
			...mr,
			owner: e.name,
			place: e.place,
			region: e.region
		}), e.vehicles.length === 1 && O(e.vehicles[0]);
	}
	function O(e) {
		s((t) => ({
			...t,
			vehicle: [e.model, e.details].filter(Boolean).join(" ").slice(0, 60),
			chassis: e.chassis.slice(0, 40),
			year: /^(19|20)\d{2}$/.test(e.year) ? e.year : t.year,
			features: t.features || e.notes.slice(0, 300)
		})), E(e.photo ? e : null);
	}
	let [k, A] = (0, h.useState)(!!e), [j, M] = (0, h.useState)(!1), [N, P] = (0, h.useState)(""), [F, I] = (0, h.useState)(!1);
	(0, h.useEffect)(() => () => {
		f && URL.revokeObjectURL(f);
	}, [f]);
	let L = e?.files.find((t) => t.key === e.coverKey) || e?.files[0], z = (e) => (t) => s((n) => ({
		...n,
		[e]: t.target.value
	}));
	function B(e) {
		if (P(""), e) {
			if (![
				"image/jpeg",
				"image/png",
				"image/webp"
			].includes(e.type)) {
				P(o("Bitte ein JPG-, PNG- oder WebP-Bild wählen."));
				return;
			}
			if (e.size > 20 * 1024 * 1024) {
				P(o("Das Bild darf höchstens 20 MB gross sein."));
				return;
			}
			d(e), p(URL.createObjectURL(e));
		}
	}
	async function V() {
		if (!j) {
			if (!e && !u && !S) {
				P(o("Bitte ein Bild auswählen."));
				return;
			}
			M(!0), P("");
			try {
				let n = T({
					operation: "portrait",
					...e ? { id: String(e.id) } : {},
					...a,
					region: a.region || "",
					text: c,
					consent: k ? "1" : "0",
					...!u && S ? { vehiclePhoto: String(S.id) } : {}
				});
				u && n.append("files[]", u), r((await w("strc_community", t, n)).id);
			} catch (e) {
				P(e.message);
			} finally {
				M(!1);
			}
		}
	}
	async function H() {
		if (e) {
			M(!0), P("");
			try {
				await w("strc_community", t, T({
					operation: "portrait-delete",
					id: String(e.id)
				})), i?.();
			} catch (e) {
				P(e.message), M(!1);
			}
		}
	}
	let U = {
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
		}] : S ? [{
			key: "preview",
			url: S.photo,
			name: "",
			mime: "image/jpeg"
		}] : L ? [L] : [],
		portrait: {
			...a,
			owner: a.owner || "…",
			vehicle: a.vehicle || "…"
		}
	};
	return /* @__PURE__ */ (0, _.jsx)(X, {
		title: o(e ? "Mitgliederporträt bearbeiten" : "Mitgliederporträt erfassen"),
		close: n,
		busy: j,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form portrait-form",
			onSubmit: (e) => {
				e.preventDefault(), V();
			},
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Mitgliedergalerie: ein Bild, ein Steckbrief und ein kurzer Text. Das Porträt ist nach dem Speichern sofort für Mitglieder sichtbar.")
				}),
				!e && /* @__PURE__ */ (0, _.jsxs)("fieldset", {
					className: "portrait-fields portrait-member",
					children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("1. Mitglied") }), b ? /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "portrait-member-chosen",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: b.name }), [b.place, b.region && o(b.region)].filter(Boolean).length > 0 && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [" · ", [b.place, b.region && o(b.region)].filter(Boolean).join(" · ")] })] }),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "market-text-button",
								onClick: () => {
									x(null), E(null), y(null);
								},
								children: o("Anderes Mitglied wählen")
							}),
							b.vehicles.length > 1 && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug aus dem Profil"), /* @__PURE__ */ (0, _.jsxs)("select", {
								defaultValue: "",
								onChange: (e) => {
									let t = b.vehicles.find((t) => String(t.id) === e.target.value);
									t && O(t);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), b.vehicles.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e.id,
									children: [
										e.model,
										e.details,
										e.year
									].filter(Boolean).join(" ")
								}, e.id))]
							})] }),
							!b.vehicles.length && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Im Profil ist noch kein Fahrzeug erfasst. Bitte die Angaben unten eintragen.")
							}),
							S && !u && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Das Fahrzeugbild aus dem Profil wird übernommen. Ein eigenes Bild unten ersetzt es.")
							})
						]
					}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Name des Mitglieds"), /* @__PURE__ */ (0, _.jsx)("input", {
						type: "search",
						value: m,
						onChange: (e) => {
							g(e.target.value), y(null);
						},
						placeholder: o("Vorname oder Name"),
						autoComplete: "off"
					})] }), v && (v.length ? /* @__PURE__ */ (0, _.jsx)("ul", {
						className: "portrait-member-matches",
						children: v.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							className: "market-text-button",
							onClick: () => D(e),
							children: [
								/* @__PURE__ */ (0, _.jsx)("strong", { children: e.name }),
								" ",
								[
									e.place,
									e.region && o(e.region),
									e.vehicles.map((e) => e.model).join(", ")
								].filter(Boolean).join(" · ")
							]
						}) }, e.id))
					}) : /* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-hint",
						children: o("Kein aktives Mitglied gefunden. Die Angaben lassen sich auch von Hand eintragen.")
					}))] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					className: "portrait-fields",
					children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Bild") }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
						o(e ? "Bild ersetzen (optional)" : "Bild *"),
						/* @__PURE__ */ (0, _.jsx)("input", {
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							disabled: j,
							onChange: (e) => {
								B(e.target.files?.[0]), e.target.value = "";
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
								onChange: z("vehicle"),
								placeholder: "TR6"
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Chassis"), /* @__PURE__ */ (0, _.jsx)("input", {
								maxLength: 40,
								value: a.chassis,
								onChange: z("chassis"),
								placeholder: "CF 2754 U"
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsx)("datalist", {
							id: "portrait-models",
							children: R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", { value: e }, e))
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Baujahr"), /* @__PURE__ */ (0, _.jsx)("input", {
								inputMode: "numeric",
								pattern: "(19|20)[0-9]{2}",
								maxLength: 4,
								value: a.year,
								onChange: z("year"),
								placeholder: "1973"
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zusatz"), /* @__PURE__ */ (0, _.jsx)("input", {
								maxLength: 60,
								value: a.note,
								onChange: z("note"),
								placeholder: o("z. B. MFK-Veteran")
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Besonderheiten (eine pro Zeile)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							rows: 3,
							maxLength: 300,
							value: a.features,
							onChange: z("features"),
							placeholder: "US-Modell\nMallard-Blue"
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Besitzer/in *"), /* @__PURE__ */ (0, _.jsx)("input", {
								required: !0,
								maxLength: 80,
								value: a.owner,
								onChange: z("owner"),
								placeholder: o("Vorname Name")
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("PLZ und Ort"), /* @__PURE__ */ (0, _.jsx)("input", {
								maxLength: 80,
								value: a.place,
								onChange: z("place"),
								placeholder: "8427 Freienstein"
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Region"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: a.region || "",
							onChange: z("region"),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Bitte wählen")
							}), pr.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] })
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
					children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Vorschau") }), /* @__PURE__ */ (0, _.jsx)(gr, { item: U })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						checked: k,
						onChange: (e) => A(e.target.checked)
					}), o("Das Mitglied ist mit der Veröffentlichung von Bild, Steckbrief und Text im Mitgliederbereich einverstanden.")]
				}),
				N && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "alert",
					children: N
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: j,
						onClick: n,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: j || !k,
						children: o(j ? "Wird gespeichert …" : e ? "Änderungen speichern" : "Porträt veröffentlichen")
					})]
				}),
				e && i && /* @__PURE__ */ (0, _.jsx)("div", {
					className: "portrait-delete",
					children: F ? /* @__PURE__ */ (0, _.jsxs)("span", { children: [
						o("Porträt mit Bild endgültig löschen?"),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary is-danger",
							disabled: j,
							onClick: () => void H(),
							children: o("Ja, löschen")
						}),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							className: "club-secondary",
							onClick: () => I(!1),
							children: o("Abbrechen")
						})
					] }) : /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "market-text-button",
						onClick: () => I(!0),
						children: o("Porträt löschen")
					})
				})
			]
		})
	});
}
//#endregion
//#region app/components/Community.tsx
var vr = (0, h.lazy)(() => import("./MagazineReader-Cvgx_U4k.js")), yr = "strc_community", br = {
	events: "Veranstaltungen",
	portraits: "Mitgliedergalerie",
	restorations: "Fahrzeugrestaurationen",
	history: "Clubgeschichte"
}, xr = {
	events: "⚑",
	portraits: "◉",
	restorations: "⚙",
	history: "⌛"
}, Sr = [
	"Zürich",
	"Bern",
	"Ostschweiz",
	"Mittelland",
	"Innerschweiz",
	"Nordwestschweiz",
	"Suisse Romande"
], Cr = {
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
}, wr = {
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
function Tr(e) {
	return Array.isArray(e) ? e.join(", ") : e || "";
}
function Er(e) {
	let t = new Date(e);
	return t.toLocaleDateString(r()) + ", " + t.toLocaleTimeString(r(), {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Dr({ name: e, posts: t, starter: n }) {
	return /* @__PURE__ */ (0, _.jsxs)("aside", {
		className: "forum-author",
		children: [
			/* @__PURE__ */ (0, _.jsx)("span", {
				className: "forum-avatar",
				"aria-hidden": "true",
				children: e.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0]?.toUpperCase()).join("") || "?"
			}),
			/* @__PURE__ */ (0, _.jsx)("strong", { children: e }),
			n && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Themenstarter") }),
			typeof t == "number" && /* @__PURE__ */ (0, _.jsxs)("small", { children: [
				t,
				" ",
				o(t === 1 ? "Beitrag" : "Beiträge")
			] })
		]
	});
}
var Or = [
	"technical",
	"club",
	"travel",
	"magazine",
	"newsletter",
	"board"
], kr = {
	technical: "⚙",
	club: "☷",
	travel: "⌖",
	magazine: "▤",
	newsletter: "✉",
	board: "♜"
};
function Ar({ kind: e, nonce: t, selectedId: n, initialGroup: i = "", title: a, section: s = "" }) {
	let { text: c } = q(), l = I(), [u, d] = (0, h.useState)({
		items: [],
		total: 0,
		pages: 0
	}), [f, p] = (0, h.useState)(i), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(""), [E, D] = (0, h.useState)(""), [O, A] = (0, h.useState)(""), [j, M] = (0, h.useState)({}), [N, P] = (0, h.useState)(!1), [F, L] = (0, h.useState)(1), [z, B] = (0, h.useState)(0), [V, H] = (0, h.useState)(!0), [U, W] = (0, h.useState)(""), [ee, te] = (0, h.useState)(""), [ne, re] = (0, h.useState)(void 0), [ie, G] = (0, h.useState)(void 0), [ae, K] = (0, h.useState)(() => n || null), [oe, se] = (0, h.useState)(null), [ce, le] = (0, h.useState)(null), [J, ue] = (0, h.useState)(!1), [Y, de] = (0, h.useState)(null), [fe, pe] = (0, h.useState)(null), me = nr(e === "forum"), [he, ge] = (0, h.useState)(""), [_e, ve] = (0, h.useState)(""), [ye, be] = (0, h.useState)(""), xe = e === "forum" && s === "experten", Se = s === "pruefung", Ce = s === "meine", [we, Te] = (0, h.useState)(""), [Ee, De] = (0, h.useState)(""), Oe = ["magazine", "newsletter"].includes(f), ke = !Oe, Ae = (u.accessClasses || []).includes("restricted"), je = !!u.canReview, Me = e === "library" && {
		technical: !0,
		travel: !0,
		club: Ae || je,
		magazine: je,
		newsletter: !1,
		board: Ae,
		operations: (u.accessClasses || []).includes("limited")
	}[f], Ne = (u.libraryGroups || []).find((e) => e.key === f)?.types || [], Pe = e === "library", Fe = () => {
		let e = (/* @__PURE__ */ new Date()).getFullYear(), t = u.items.map((e) => e.title.match(/(\d{4})\D+(?:Ausgabe|Nr\.?|No\.?)\s*(\d+)/i)).filter((t) => !!t && Number(t[1]) === e).map((e) => Number(e[2]));
		return `TR-Magazine . ${e} . Ausgabe ${t.length ? Math.max(...t) + 1 : 1}`;
	}, Ie = Se || Ce || N || e !== "library" || !!f && (f !== "technical" || !!(m && Ee));
	(0, h.useEffect)(() => {
		let t = new AbortController(), n = setTimeout(() => {
			H(!0), W(""), C(yr, {
				operation: "list",
				kind: e,
				group: f,
				mine: Ce ? "1" : "0",
				search: e === "library" ? we : e === "forum" ? ye : "",
				model: e === "library" ? Ee : e === "forum" ? he : "",
				component: e === "forum" ? _e : "",
				documentType: m,
				area: y,
				galleryCategory: x,
				...x === "portraits" ? {
					portraitRegion: E,
					portraitModel: O
				} : {},
				trash: N ? "1" : "0",
				page: String(F),
				...Se ? { review: "1" } : {}
			}, t.signal).then((e) => {
				d(e), e.galleryCounts && Object.keys(e.galleryCounts).length && M(e.galleryCounts);
			}).catch((e) => {
				t.signal.aborted || W(e.message);
			}).finally(() => {
				t.signal.aborted || H(!1);
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
		N,
		F,
		z,
		we,
		Ee,
		he,
		_e,
		ye,
		Se,
		Ce
	]);
	function Le(e, t) {
		["magazine", "newsletter"].includes(f) || ["magazine", "newsletter"].includes(k(Tr(e.classification.documentType))) ? pe({
			file: t,
			title: e.title,
			download: f !== "newsletter" && k(Tr(e.classification.documentType)) !== "newsletter"
		}) : de(t);
	}
	function Re(e = "") {
		te(e), H(!0), B((e) => e + 1);
	}
	let [ze, Be] = (0, h.useState)(0);
	async function Ve(e) {
		ue(!0), W("");
		try {
			let n = await w(yr, t, T({
				operation: "delete",
				id: String(e.id),
				deleteRevision: e.deleteRevision || ""
			}));
			Be(0), Re(n.warning || "Dokument endgültig gelöscht.");
		} catch (e) {
			W(e.message);
		} finally {
			ue(!1);
		}
	}
	async function He(e, n) {
		ue(!0), W("");
		try {
			await w(yr, t, T({
				operation: n,
				id: String(e.id)
			})), le(null), K(null), Re(n === "trash" ? "Beitrag ins Archiv verschoben." : n === "approve" ? "Beitrag freigegeben." : n === "reject" ? "Beitrag abgelehnt." : "Beitrag wiederhergestellt.");
		} catch (e) {
			W(e.message);
		} finally {
			ue(!1);
		}
	}
	let Ue = e === "gallery" && ae !== null;
	return (0, h.useEffect)(() => {
		if (e !== "gallery" || typeof window > "u") return;
		let t = ae === null ? Se ? "#galerie/pruefung" : Ce ? "#galerie/meine" : "#galerie" : `#galerie/${ae}`;
		window.location.hash !== t && qe(t), ae !== null && window.scrollTo({ top: 0 });
	}, [
		e,
		ae,
		Se,
		Ce
	]), /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
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
		Ue ? /* @__PURE__ */ (0, _.jsx)("section", {
			className: "page-content album-page",
			children: /* @__PURE__ */ (0, _.jsx)(Nr, {
				id: ae,
				nonce: t,
				inline: !0,
				close: () => K(null),
				updated: () => Re(),
				addPhotos: (e) => {
					se(e), re(null);
				}
			})
		}) : /* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content community",
			children: [
				e === "gallery" && !Se && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-toolbar",
					children: [/* @__PURE__ */ (0, _.jsx)("span", {}), /* @__PURE__ */ (0, _.jsxs)("span", {
						className: "gallery-toolbar-actions",
						children: [je && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "club-secondary",
							onClick: () => G(null),
							children: ["＋ ", o("Mitgliederporträt erfassen")]
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							onClick: () => re(null),
							children: o(wr[e].create)
						})]
					})]
				}),
				e === "forum" && !y && !Se && me.settings?.canManage && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-toolbar",
					children: [/* @__PURE__ */ (0, _.jsx)("span", {}), /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary",
						href: xe ? "#forum" : "#forum/experten",
						children: o(xe ? "← Zurück zum Forum" : "Fachexperten & WhatsApp")
					})]
				}),
				xe ? /* @__PURE__ */ (0, _.jsx)(ar, { forum: me }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					e !== "forum" && /* @__PURE__ */ (0, _.jsx)("div", {
						className: "club-toolbar",
						children: /* @__PURE__ */ (0, _.jsx)("a", {
							className: "club-secondary",
							href: "#" + {
								forum: "forum",
								gallery: "galerie",
								library: "bibliothek"
							}[e] + (Ce ? "" : "/meine"),
							children: o(Ce ? "Alle Beiträge" : "Meine Beiträge")
						})
					}),
					e === "forum" && Ce && !y && /* @__PURE__ */ (0, _.jsx)("div", {
						className: "club-toolbar",
						children: /* @__PURE__ */ (0, _.jsx)("h2", {
							className: "forum-mine-title",
							children: o("Meine Beiträge")
						})
					}),
					e === "forum" && !y && !Ce && !Se && /* @__PURE__ */ (0, _.jsx)(Br, {}),
					"    ",
					Se && /* @__PURE__ */ (0, _.jsxs)("div", {
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
					(e === "library" || e === "forum" || e === "gallery") && !Se && /* @__PURE__ */ (0, _.jsx)("div", {
						className: "category-tiles",
						"aria-label": o(e === "library" ? "Bibliotheksbereiche" : e === "gallery" ? "Galeriebereiche" : "Forumsbereiche"),
						children: e === "gallery" ? Object.entries(br).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "category-tile gallery-tile gallery-" + e,
							"aria-pressed": x === e,
							onClick: () => {
								S(x === e ? "" : e), D(""), A(""), L(1);
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "category-tile-icon",
									"aria-hidden": "true",
									children: xr[e] || "▧"
								}),
								/* @__PURE__ */ (0, _.jsx)("strong", { children: o(t) }),
								j[e] !== void 0 && /* @__PURE__ */ (0, _.jsxs)("span", {
									className: "category-tile-count",
									children: [
										j[e],
										" ",
										o(j[e] === 1 ? "Beitrag" : "Beiträge")
									]
								})
							]
						}, e)) : e === "library" ? [...u.libraryGroups || []].sort((e, t) => (Or.indexOf(e.key) + 1 || 99) - (Or.indexOf(t.key) + 1 || 99)).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "category-tile lib-tile lib-" + e.key,
							"aria-pressed": f === e.key,
							onClick: () => {
								p(f === e.key ? "" : e.key), g(f !== e.key && e.types.length === 1 ? e.types[0] : ""), Te(""), De(""), L(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("span", {
								className: "category-tile-icon",
								"aria-hidden": "true",
								children: kr[e.key] || "▤"
							}), /* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.label) })]
						}, e.key)) : (y ? [y] : l.areas).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "category-tile forum-tile" + (y === e ? " is-open" : ""),
							style: { background: tr(l.areas.indexOf(e)) },
							"aria-pressed": y === e,
							onClick: () => {
								b(y === e ? "" : e), ge(""), ve(""), be(""), L(1), Ce && typeof window < "u" && (window.location.hash = "#forum");
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "category-tile-icon",
									"aria-hidden": "true",
									children: $n(e)
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "forum-tile-copy",
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o(Qn(e)) }), /* @__PURE__ */ (0, _.jsx)("small", { children: o(er(e)) })]
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "forum-tile-meta",
									children: [me.subscribed(e) && /* @__PURE__ */ (0, _.jsxs)("b", {
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
						children: [/* @__PURE__ */ (0, _.jsx)(rr, {
							area: y,
							forum: me
						}), /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-primary",
							onClick: () => re(null),
							children: ["✎ ", o("Thema erstellen")]
						})]
					}),
					ee && /* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-notice",
						role: "status",
						children: ee
					}),
					e === "gallery" && !x && !Se && !Ce && (V ? /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: o("Beiträge werden geladen …")
					}) : U && /* @__PURE__ */ (0, _.jsxs)("p", {
						className: "collection-state error",
						role: "alert",
						children: [U, /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-text-button",
							onClick: () => Re(),
							children: o("Erneut versuchen")
						})]
					})),
					e === "forum" && y && /* @__PURE__ */ (0, _.jsx)("button", {
						className: "community-overview-link",
						onClick: () => {
							b(""), P(!1), L(1);
						},
						children: o("← Alle Forumsbereiche")
					}),
					!Se && (e === "gallery" || e === "library" && f || e === "forum" && y) && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "market-filters" + (e === "library" ? " lib-filters lib-filters-" + f : ""),
						children: [
							e === "library" && Oe && /* @__PURE__ */ (0, _.jsxs)("label", {
								className: "market-search",
								children: [o("Suchbegriff"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "search",
									value: we,
									onChange: (e) => {
										Te(e.target.value), L(1);
									}
								})]
							}),
							e === "library" && ke && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Dokumentart"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: m,
								onChange: (e) => {
									g(e.target.value), L(1);
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
								value: Ee,
								onChange: (e) => {
									De(e.target.value), L(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] }),
							e === "gallery" && x === "portraits" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Region"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: E,
								onChange: (e) => {
									D(e.target.value), L(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Regionen")
								}), Sr.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: O,
								onChange: (e) => {
									A(e.target.value), L(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Modelle")
								}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] })] }),
							e === "forum" && ["Fahrzeuge", "Technik"].includes(y) && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: he,
								onChange: (e) => {
									ge(e.target.value), L(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Modelle")
								}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: e
								}, e))]
							})] }),
							e === "forum" && y === "Technik" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Technikbereich"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: _e,
								onChange: (e) => {
									ve(e.target.value), L(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Technikbereiche")
								}), l.components.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] }),
							e === "forum" && y !== "Teile gesucht" && /* @__PURE__ */ (0, _.jsxs)("label", {
								className: "market-search",
								children: [o("Suche"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "search",
									value: ye,
									onChange: (e) => {
										be(e.target.value), L(1);
									},
									placeholder: o("Titel, Text oder Antworten")
								})]
							}),
							(e === "forum" || e === "library" && (je || f === "board" && Ae) && !["magazine", "newsletter"].includes(f)) && /* @__PURE__ */ (0, _.jsxs)("label", {
								className: "market-own",
								children: [/* @__PURE__ */ (0, _.jsx)("input", {
									type: "checkbox",
									checked: N,
									onChange: (e) => {
										P(e.target.checked), L(1);
									}
								}), o("Archiv")]
							}),
							Me && /* @__PURE__ */ (0, _.jsxs)("button", {
								className: "market-primary lib-upload",
								onClick: () => {
									Ne.length === 1 && g(Ne[0]), re(null);
								},
								children: [o("Dokument hochladen"), " ＋"]
							})
						]
					}),
					!Se && !Ce && !N && (e === "library" && !f || e === "forum" && !y || e === "gallery" && !x) ? null : !Se && !Ie ? /* @__PURE__ */ (0, _.jsx)("p", {
						className: "collection-state lib-hint",
						children: o("Bitte Dokumentart und Fahrzeug wählen.")
					}) : V ? /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: o("Beiträge werden geladen …")
					}) : U ? /* @__PURE__ */ (0, _.jsxs)("p", {
						className: "collection-state error",
						role: "alert",
						children: [U, /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-text-button",
							onClick: () => Re(),
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
							children: o(N ? "Keine passenden Beiträge gefunden." : wr[e].empty)
						}),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: e === "gallery" ? "community-list gallery-albums" : e === "library" ? "community-list lib-list" + (Pe ? " lib-list-thumbs" : "") : e === "forum" ? "community-list forum-topics" : "community-list",
							children: u.items.map((t) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [
								Pe && (() => {
									let e = t.files.find((e) => e.mime === "application/pdf");
									return e ? /* @__PURE__ */ (0, _.jsx)("button", {
										className: "lib-thumb",
										onClick: () => Le(t, e),
										"aria-label": `${t.title} öffnen`,
										children: /* @__PURE__ */ (0, _.jsx)(dr, { url: e.url })
									}) : /* @__PURE__ */ (0, _.jsx)("span", {
										className: "lib-thumb is-empty",
										"aria-hidden": "true",
										children: "PDF"
									});
								})(),
								e === "gallery" && t.files[0] && !N && /* @__PURE__ */ (0, _.jsx)("button", {
									className: "community-cover",
									onClick: () => K(t.id),
									"aria-label": `${t.title} öffnen`,
									children: /* @__PURE__ */ (0, _.jsx)(v, {
										unoptimized: !0,
										src: (t.files.find((e) => e.key === t.coverKey) || t.files[0]).url,
										alt: t.title,
										width: 600,
										height: 400
									})
								}),
								e === "forum" ? /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "forum-topic-row",
									children: [
										/* @__PURE__ */ (0, _.jsx)("span", {
											className: "forum-topic-icon",
											title: o(Qn(Tr(t.classification.area))),
											"aria-hidden": "true",
											children: $n(Tr(t.classification.area))
										}),
										/* @__PURE__ */ (0, _.jsxs)("div", {
											className: "forum-topic-main",
											children: [
												/* @__PURE__ */ (0, _.jsxs)("h2", { children: [t.pinned && /* @__PURE__ */ (0, _.jsx)("span", {
													className: "forum-pin",
													role: "img",
													title: o("Angeheftet"),
													"aria-label": o("Angeheftet"),
													children: "📎"
												}), /* @__PURE__ */ (0, _.jsx)("button", {
													className: "card-title-button",
													onClick: () => K(t.id),
													children: t.title
												})] }),
												Tr(t.classification.models) || Tr(t.classification.model) ? /* @__PURE__ */ (0, _.jsx)("p", {
													className: "forum-topic-models",
													children: Tr(t.classification.models) || Tr(t.classification.model)
												}) : null,
												/* @__PURE__ */ (0, _.jsxs)("p", {
													className: "forum-topic-meta",
													children: [
														o("von"),
														" ",
														t.author,
														" · ",
														Er(t.createdAt),
														t.closed ? " · " + o("geschlossen") : ""
													]
												}),
												y === "Teile gesucht" && /* @__PURE__ */ (0, _.jsx)(Lr, {
													item: t,
													open: () => K(t.id)
												}),
												t.status !== "publish" && /* @__PURE__ */ (0, _.jsx)("p", {
													className: "club-notice",
													children: o(t.status === "pending" ? "In Prüfung" : t.status === "draft" ? "Abgelehnt / Entwurf" : "Archiviert")
												}),
												t.canReview && t.status === "pending" && /* @__PURE__ */ (0, _.jsxs)("div", {
													className: "club-actions",
													children: [/* @__PURE__ */ (0, _.jsx)("button", {
														disabled: J,
														className: "market-primary",
														onClick: () => void He(t, "approve"),
														children: o("Freigeben")
													}), /* @__PURE__ */ (0, _.jsx)("button", {
														disabled: J,
														className: "club-secondary",
														onClick: () => void He(t, "reject"),
														children: o("Ablehnen")
													})]
												}),
												N ? /* @__PURE__ */ (0, _.jsx)("div", {
													className: "club-actions",
													children: t.canEdit && /* @__PURE__ */ (0, _.jsx)("button", {
														className: "club-secondary",
														disabled: J,
														onClick: () => void He(t, "restore"),
														children: o("Wiederherstellen")
													})
												}) : t.canEdit && /* @__PURE__ */ (0, _.jsxs)("div", {
													className: "club-actions",
													children: [/* @__PURE__ */ (0, _.jsx)("button", {
														className: "market-text-button",
														onClick: () => re(t),
														children: o("Bearbeiten")
													}), /* @__PURE__ */ (0, _.jsx)("button", {
														className: "market-text-button",
														onClick: () => le(t),
														children: o("Ins Archiv verschieben")
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, _.jsxs)("dl", {
											className: "forum-topic-stats",
											children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Antworten") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: t.replyCount })] }), /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Aufrufe") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: t.views || 0 })] })]
										}),
										/* @__PURE__ */ (0, _.jsx)("p", {
											className: "forum-topic-last",
											children: t.lastReply ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
												/* @__PURE__ */ (0, _.jsx)("span", { children: o("Letzte Antwort") }),
												/* @__PURE__ */ (0, _.jsx)("strong", { children: t.lastReply.author }),
												/* @__PURE__ */ (0, _.jsx)("span", { children: Er(t.lastReply.createdAt) })
											] }) : /* @__PURE__ */ (0, _.jsx)("span", { children: o("Noch keine Antworten") })
										})
									]
								}) : /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "community-card-body",
									children: [
										e !== "library" && !hr(t) && /* @__PURE__ */ (0, _.jsxs)("p", {
											className: "eyebrow",
											children: [
												t.author,
												" · ",
												new Date((e === "gallery" ? Tr(t.classification.date) : "") || t.createdAt).toLocaleDateString(r())
											]
										}),
										/* @__PURE__ */ (0, _.jsxs)("h2", { children: [t.pinned && /* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Angeheftet"), " · "] }), /* @__PURE__ */ (0, _.jsx)("button", {
											className: "card-title-button",
											onClick: () => {
												let n = e === "library" ? t.files.find((e) => e.mime === "application/pdf") : void 0;
												n ? Le(t, n) : K(t.id);
											},
											children: t.title
										})] }),
										t.status !== "publish" && /* @__PURE__ */ (0, _.jsx)("p", {
											className: "club-notice",
											children: o(t.status === "pending" ? "In Prüfung" : t.status === "draft" ? "Abgelehnt / Entwurf" : "Archiviert")
										}),
										e === "library" && t.replacedBy && /* @__PURE__ */ (0, _.jsxs)("p", {
											className: "lib-replaced",
											children: [
												o("Ersetzt durch"),
												": ",
												t.replacedBy.title
											]
										}),
										e === "library" && t.replaces && t.status === "pending" && /* @__PURE__ */ (0, _.jsxs)("p", {
											className: "lib-replaced",
											children: [
												o("Ersetzt bei Freigabe"),
												": ",
												t.replaces.title
											]
										}),
										t.canReview && t.status === "pending" && /* @__PURE__ */ (0, _.jsxs)("div", {
											className: "club-actions",
											children: [/* @__PURE__ */ (0, _.jsx)("button", {
												disabled: J,
												className: "market-primary",
												onClick: () => void He(t, "approve"),
												children: o("Freigeben")
											}), /* @__PURE__ */ (0, _.jsx)("button", {
												disabled: J,
												className: "club-secondary",
												onClick: () => void He(t, "reject"),
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
												o("Dateien")
											]
										})] }),
										(e !== "library" || t.canEdit || N) && /* @__PURE__ */ (0, _.jsx)("div", {
											className: "club-actions",
											children: N ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [t.canEdit && /* @__PURE__ */ (0, _.jsx)("button", {
												className: "club-secondary",
												disabled: J,
												onClick: () => void He(t, "restore"),
												children: o("Wiederherstellen")
											}), e === "library" && (f === "board" || k(Tr(t.classification.documentType)).startsWith("board") || Tr(t.classification.access) === "restricted" ? !!u.canPurgeBoard : t.canReview) && (ze === t.id ? /* @__PURE__ */ (0, _.jsxs)("span", {
												className: "lib-purge-confirm",
												children: [
													o("Dokument mit allen Dateien endgültig löschen?"),
													" ",
													/* @__PURE__ */ (0, _.jsx)("button", {
														className: "market-primary",
														disabled: J,
														onClick: () => void Ve(t),
														children: o("Ja, definitiv löschen")
													}),
													/* @__PURE__ */ (0, _.jsx)("button", {
														className: "club-secondary",
														disabled: J,
														onClick: () => Be(0),
														children: o("Abbrechen")
													})
												]
											}) : /* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button lib-purge",
												disabled: J,
												onClick: () => Be(t.id),
												children: o("Definitiv löschen")
											}))] }) : /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: t.canEdit && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												onClick: () => hr(t) ? G(t) : re(t),
												children: o("Bearbeiten")
											}), e !== "gallery" && (e !== "library" || t.canReview && !["magazine", "newsletter"].includes(f)) && /* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												onClick: () => le(t),
												children: o(e === "library" ? "Archivieren" : "Ins Archiv verschieben")
											})] }) })
										})
									]
								})
							] }, t.id))
						}),
						/* @__PURE__ */ (0, _.jsx)(An, {
							page: F,
							pages: u.pages,
							change: L
						}),
						e === "library" && N && f === "board" && u.boardDeletions && /* @__PURE__ */ (0, _.jsxs)("details", {
							className: "board-deletion-log",
							children: [/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
								o("Löschprotokoll Vorstandsunterlagen"),
								" (",
								u.boardDeletions.length,
								")"
							] }), u.boardDeletions.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: [...u.boardDeletions].reverse().map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
								/* @__PURE__ */ (0, _.jsx)("strong", { children: e.title }),
								" ",
								/* @__PURE__ */ (0, _.jsxs)("span", { children: [
									o(l.libraryTypes.find((t) => t.key === e.type)?.label || e.type),
									" · ",
									e.by,
									" · ",
									new Date(e.at).toLocaleString(r(), {
										dateStyle: "short",
										timeStyle: "short"
									}),
									" · ",
									o(e.state === "pending" ? "Abschluss prüfen" : e.state === "failed" ? "Löschung fehlgeschlagen" : "Gelöscht")
								] })
							] }, e.id || t)) }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Noch keine Löschversuche vorhanden.") })]
						})
					] })
				] })
			]
		}),
		ne !== void 0 && /* @__PURE__ */ (0, _.jsx)(jr, {
			kind: e,
			item: ne,
			replaceable: e === "library" && je && !N ? u.items.filter((e) => e.status === "publish").map((e) => ({
				id: e.id,
				title: e.title
			})) : [],
			appendTo: ne === null ? oe : null,
			initialArea: y,
			groupTypes: e === "library" ? Ne : [],
			suggestedTitle: e === "library" && f === "magazine" ? Fe() : "",
			initialDocumentType: m,
			accessClasses: u.accessClasses || ["open"],
			nonce: t,
			close: () => {
				re(void 0), se(null);
			},
			saved: (t) => {
				re(void 0), se(null), Re(e === "gallery" ? "Fotos hochgeladen und in der Galerie sichtbar." : t.status === "pending" ? "Beitrag zur Prüfung eingereicht." : "Beitrag gespeichert."), K(t.id);
			}
		}),
		fe && /* @__PURE__ */ (0, _.jsx)(X, {
			title: fe.title,
			close: () => pe(null),
			children: /* @__PURE__ */ (0, _.jsx)(Hn, {
				url: fe.file.url,
				title: fe.title,
				download: fe.download ? fe.file.url : !1
			})
		}),
		Y && /* @__PURE__ */ (0, _.jsx)(X, {
			title: Y.name,
			close: () => de(null),
			children: /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
				fallback: /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Leseansicht wird geladen …")
				}),
				children: /* @__PURE__ */ (0, _.jsx)(vr, {
					url: Y.url,
					title: Y.name,
					back: () => de(null)
				})
			})
		}),
		ie !== void 0 && /* @__PURE__ */ (0, _.jsx)(_r, {
			item: ie,
			nonce: t,
			close: () => G(void 0),
			saved: (e) => {
				G(void 0), Re("Porträt gespeichert und in der Mitgliedergalerie veröffentlicht."), K(e);
			},
			deleted: () => {
				G(void 0), K(null), Re("Porträt gelöscht.");
			}
		}),
		ae !== null && !Ue && /* @__PURE__ */ (0, _.jsx)(Nr, {
			id: ae,
			nonce: t,
			close: () => K(null),
			updated: () => Re()
		}),
		ce && /* @__PURE__ */ (0, _.jsx)(X, {
			title: "Beitrag archivieren",
			close: () => le(null),
			busy: J,
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-dialog-body",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						"«",
						ce.title,
						"» ins Archiv verschieben? Sie können den Beitrag dort wiederherstellen."
					] }),
					U && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "alert",
						children: U
					}),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: J,
							onClick: () => le(null),
							children: o("Abbrechen")
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: J,
							onClick: () => void He(ce, "trash"),
							children: o("Ins Archiv verschieben")
						})]
					})
				]
			})
		})
	] });
}
function jr({ kind: e, item: t, nonce: n, close: r, saved: i, accessClasses: a, initialDocumentType: s, groupTypes: c = [], suggestedTitle: l = "", initialArea: u = "", appendTo: d = null, replaceable: f = [] }) {
	let p = I(), m = (0, h.useRef)(crypto.randomUUID()), g = (0, h.useRef)(/* @__PURE__ */ new WeakMap()), v = (0, h.useRef)(/* @__PURE__ */ new WeakMap()), [b, x] = (0, h.useState)(t ? k(Tr(t.classification?.documentType)) : s), [S, T] = (0, h.useState)((e === "gallery" ? t?.description : t?.descriptionHtml || t?.description) || ""), E = e === "library" && !t && b === "magazine", D = e === "library" && !t && ([
		"magazine",
		"newsletter",
		"statutes",
		"club",
		"agm",
		"board",
		"confidential",
		"operations"
	].includes(b) || b.startsWith("board-")), [A, j] = (0, h.useState)([]), [N, P] = (0, h.useState)(d ? String(d.id) : ""), [F, L] = (0, h.useState)("add"), [z, B] = (0, h.useState)([]), [V, H] = (0, h.useState)(""), [U, W] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		if (e !== "gallery" || t) return;
		let n = new AbortController();
		return C(yr, {
			operation: "gallery-events",
			recent: "1"
		}, n.signal).then(B).catch(() => {}), fetch(`${y}/wp-admin/admin-ajax.php?action=strc_session`, {
			credentials: "include",
			signal: n.signal
		}).then(async (e) => await e.json()).then((e) => W(e.displayName || "")).catch(() => {}), () => n.abort();
	}, [e, t]);
	let [ee, te] = (0, h.useState)({}), [ne, re] = (0, h.useState)(""), [ie, G] = (0, h.useState)([]), [ae, K] = (0, h.useState)(""), [oe, se] = (0, h.useState)(!1), [ce, le] = (0, h.useState)(!1), q = (0, h.useRef)(!1);
	(0, h.useEffect)(() => {
		if (e !== "gallery" || t) return;
		let n = new AbortController();
		return C(yr, { operation: "albums" }, n.signal).then(j).catch((e) => {
			n.signal.aborted || K(e.message);
		}), () => n.abort();
	}, [e, t]);
	function J(t) {
		if (K(""), !t.length) return;
		if (e === "gallery") {
			let e = t.filter((e) => [
				"image/jpeg",
				"image/png",
				"image/webp"
			].includes(e.type) && e.size > 0 && e.size <= 50 * 1024 * 1024), n = t.filter((t) => !e.includes(t));
			G((t) => [...t, ...e.filter((e) => !t.some((t) => t.name === e.name && t.size === e.size && t.lastModified === e.lastModified))].slice(0, 1e3)), n.length && K("Nicht hinzugefügt (JPG, PNG oder WebP bis 50 MB): " + n.map((e) => e.name).join(", "));
			return;
		}
		if (E) {
			let e = t[0];
			if (!e) return;
			if (e.type !== "application/pdf" || e.size > 25 * 1024 * 1024) {
				K("Bitte ein PDF-Dokument bis 25 MB auswählen.");
				return;
			}
			G([e]);
			return;
		}
		if (ie.length + t.length > 6) {
			K("Bitte höchstens sechs Dateien auswählen.");
			return;
		}
		let n = [
			"image/jpeg",
			"image/png",
			"image/webp",
			"application/pdf"
		];
		if (t.some((t) => !n.includes(t.type) || t.size < 1 || t.size > (e === "library" && t.type === "application/pdf" ? 100 : 20) * 1024 * 1024)) {
			K("Bilder: maximal 20 MB. Bibliotheks-PDFs: maximal 100 MB; sonst 20 MB.");
			return;
		}
		if ([...ie, ...t].reduce((e, t) => e + t.size, 0) > 120 * 1024 * 1024) {
			K("Alle Dateien zusammen dürfen höchstens 120 MB gross sein.");
			return;
		}
		G((e) => [...e, ...t]);
	}
	async function ue(r) {
		if (!q.current) {
			if (!t && e !== "forum" && !ie.length) {
				K("Bitte mindestens eine Datei auswählen.");
				return;
			}
			q.current = !0, se(!0), K("");
			try {
				let a = new FormData(r);
				if (E) {
					let e = String(a.get("title") || "").match(/(\d{4})\D+(\d+)\s*$/);
					a.set("documentType", "magazine"), a.set("year", e?.[1] || String((/* @__PURE__ */ new Date()).getFullYear())), a.set("issue", e?.[2] || "1"), a.set("language", "de");
				}
				if ((D || e === "gallery") && a.set("rights", "1"), a.set("operation", N ? "append" : t ? "edit" : "create"), a.set("kind", e), a.set("requestId", m.current), a.set("description", S), t && a.set("id", String(t.id)), N && a.set("id", N), e === "library") {
					let e = a.getAll("models[]").filter((e) => typeof e == "string");
					a.delete("models[]"), a.set("models", JSON.stringify(e));
				}
				if (e === "gallery" && ie.length) {
					let e = null, r = N || String(t?.id || ""), o = [], s = [];
					for (let t of ie) {
						let i = new FormData();
						for (let [e, t] of a.entries()) i.append(e, t);
						i.set("operation", r ? "append" : "create"), r && i.set("id", r), g.current.has(t) || g.current.set(t, crypto.randomUUID()), i.set("fileToken", g.current.get(t)), re(`${ie.indexOf(t) + 1} / ${ie.length} · ${t.name}`), i.set("caption", ee[t.name + "-" + t.size] || "");
						try {
							let a = v.current.get(t);
							a || (a = await fr(t), v.current.set(t, a)), i.append("files[]", a.file), i.set("optimized", a.optimized ? "1" : "0"), e = await w(yr, n, i), v.current.delete(t), r = String(e.id), P(r);
						} catch (e) {
							o.push(t), s.push(t.name + ": " + e.message);
						}
					}
					if (o.length) {
						G(o), K("Gespeicherte Bilder bleiben erhalten. Erneut hochladen: " + s.join(" · "));
						return;
					}
					e && i(e);
				} else ie.forEach((e) => a.append("files[]", e)), i(await w(yr, n, a));
			} catch (e) {
				K(e.message);
			} finally {
				q.current = !1, se(!1);
			}
		}
	}
	return e === "library" && !b ? /* @__PURE__ */ (0, _.jsx)(X, {
		title: o("Dokumentart auswählen"),
		close: r,
		children: /* @__PURE__ */ (0, _.jsx)("div", {
			className: "library-type-grid",
			children: p.libraryTypes.filter((e) => a.includes(e.access) && (!c.length || c.includes(e.key))).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
				className: "editorial-card",
				onClick: () => x(e.key),
				children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [O[e.access], " · PDF bis 100 MB"] })]
			}, e.key))
		})
	}) : /* @__PURE__ */ (0, _.jsx)(X, {
		title: t ? e === "gallery" ? "Album bearbeiten" : "Beitrag bearbeiten" : e === "library" ? (p.libraryTypes.find((e) => e.key === b)?.label || "Dokument") + " hochladen" : o(wr[e].create),
		close: r,
		busy: oe,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: (e) => {
				e.preventDefault(), ue(e.currentTarget);
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: oe,
					children: [
						e === "gallery" && !t && d && /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "gallery-append-target",
							children: [
								o("Fotos werden dem Album hinzugefügt:"),
								" ",
								/* @__PURE__ */ (0, _.jsx)("strong", { children: d.title })
							]
						}),
						e === "gallery" && !t && !d && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "gallery-mode",
							role: "radiogroup",
							"aria-label": o("Album"),
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "radio",
								name: "galleryMode",
								checked: F === "add",
								onChange: () => L("add")
							}), o("Bilder zu einer Veranstaltung hinzufügen")] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "radio",
								name: "galleryMode",
								checked: F === "new",
								onChange: () => {
									L("new"), P(""), H("");
								}
							}), o("Neues Album anlegen")] })]
						}),
						e === "gallery" && !t && !d && F === "add" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Veranstaltung *"),
							/* @__PURE__ */ (0, _.jsxs)("select", {
								required: !0,
								value: V,
								onChange: (e) => {
									let t = e.target.value;
									H(t);
									let n = A.find((e) => String(e.eventId || "") === t);
									P(n ? String(n.id) : "");
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), z.map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
									value: e.id,
									children: [e.title, e.date ? " · " + new Date(e.date).toLocaleDateString("de-CH") : ""]
								}, e.id))]
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: o(N ? "Die Bilder werden dem bestehenden Album dieser Veranstaltung hinzugefügt." : "Für diese Veranstaltung wird ein Album angelegt.") })
						] }),
						e === "gallery" && !t && !d && F === "add" && V && !N && (() => {
							let e = z.find((e) => String(e.id) === V);
							return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "hidden",
									name: "title",
									value: e?.title || ""
								}),
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "hidden",
									name: "eventId",
									value: V
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
						(e !== "gallery" || t || F === "new" && !d) && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Titel"),
							/* @__PURE__ */ (0, _.jsx)("input", {
								name: "title",
								required: !0,
								maxLength: 160,
								defaultValue: t?.title || (E ? l : "")
							}),
							E && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Format: TR-Magazine . Jahr . Ausgabe Nummer") })
						] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bereich"), /* @__PURE__ */ (0, _.jsx)("select", {
							name: "area",
							defaultValue: Tr(t?.classification?.area) || u || "Technik",
							children: p.areas.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(Qn(e))
							}, e))
						})] }), /* @__PURE__ */ (0, _.jsxs)("details", {
							className: "market-more",
							open: !!(Tr(t?.classification?.model) || Tr(t?.classification?.component)) || void 0,
							children: [
								/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Zuordnung (optional): Fahrzeugmodell, Technikbereich") }),
								/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "club-form-row",
									children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeugmodell"), /* @__PURE__ */ (0, _.jsxs)("select", {
										name: "model",
										defaultValue: Tr(t?.classification?.model),
										children: [/* @__PURE__ */ (0, _.jsx)("option", {
											value: "",
											children: o("Alle Modelle / keine Zuordnung")
										}), R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
											value: e,
											children: o(e)
										}, e))]
									})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Technikbereich"), /* @__PURE__ */ (0, _.jsxs)("select", {
										name: "component",
										defaultValue: Tr(t?.classification?.component),
										children: [/* @__PURE__ */ (0, _.jsx)("option", {
											value: "",
											children: o("Bitte wählen")
										}), p.components.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
											value: e,
											children: o(e)
										}, e))]
									})] })]
								}),
								/* @__PURE__ */ (0, _.jsx)("small", { children: o("Hilft Fachexperten und Abonnenten, Ihren Beitrag zu finden.") })
							]
						})] }),
						e === "library" && p.libraryTypes.find((e) => e.key === b)?.fields.includes("model") && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Fahrzeugmodelle (optional)"),
							/* @__PURE__ */ (0, _.jsx)("select", {
								name: "models[]",
								multiple: !0,
								size: 5,
								defaultValue: t && Array.isArray(t.classification.models) ? t.classification.models : Tr(t?.classification?.model) ? [Tr(t?.classification?.model)] : [],
								children: R.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
						e === "gallery" && (t || F === "new" && !d) && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kategorie"), /* @__PURE__ */ (0, _.jsx)("select", {
								name: "galleryCategory",
								defaultValue: Tr(t?.classification?.galleryCategory) || "events",
								children: Object.entries(br).filter(([e]) => e !== "portraits").map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(t)
								}, e))
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Veranstaltungsdatum"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "date",
								type: "date",
								defaultValue: Tr(t?.classification?.date)
							})] })]
						}),
						t && e === "gallery" && Tr(t.classification?.eventId) && /* @__PURE__ */ (0, _.jsx)("input", {
							type: "hidden",
							name: "eventId",
							value: Tr(t.classification.eventId)
						}),
						e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "gallery-photographer",
							children: [
								o("Fotograf/in"),
								": ",
								/* @__PURE__ */ (0, _.jsx)("strong", { children: U || Tr(t?.classification?.photographer) || o("Ihr Name") }),
								" ",
								/* @__PURE__ */ (0, _.jsxs)("small", { children: [
									"(",
									o("wird automatisch eingetragen"),
									")"
								] })
							]
						}),
						e === "library" && !E && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(M, {
							canChangeAccess: !t || t.canReview,
							type: b,
							initial: t?.classification || {},
							accessClasses: a,
							definitions: p.libraryTypes
						}, b), e === "library" && !t && f.length > 0 && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Ersetzt Dokument (optional)"),
							/* @__PURE__ */ (0, _.jsxs)("select", {
								name: "replaces",
								defaultValue: "",
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Ersetzt kein bestehendes Dokument")
								}), f.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e.id,
									children: e.title
								}, e.id))]
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: o("Bei der Freigabe des neuen Dokuments wird das gewählte automatisch archiviert und verweist auf die neue Fassung.") })
						] })] }),
						E ? null : e === "gallery" ? !N && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Beschreibung des Albums (optional, max. 800 Zeichen)"),
							/* @__PURE__ */ (0, _.jsx)("textarea", {
								value: S,
								maxLength: 800,
								rows: 3,
								onChange: (e) => T(e.target.value),
								disabled: oe
							}),
							/* @__PURE__ */ (0, _.jsxs)("small", {
								className: S.length >= 800 ? "is-limit" : "",
								children: [S.length, " / 800"]
							})
						] }) : /* @__PURE__ */ (0, _.jsx)(ze, {
							label: e === "forum" ? "Beitrag" : "Beschreibung",
							value: S,
							onChange: T,
							disabled: oe
						}),
						!t && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `market-dropzone ${ce ? "is-dragging" : ""}`,
							onDragOver: (e) => {
								e.preventDefault(), oe || le(!0);
							},
							onDragLeave: () => le(!1),
							onDrop: (e) => {
								e.preventDefault(), le(!1), oe || J(Array.from(e.dataTransfer.files));
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("strong", { children: o(E ? "PDF hier hineinziehen" : e === "gallery" ? "Fotos hier hineinziehen" : "Dateien hier hineinziehen") }),
								e === "gallery" && /* @__PURE__ */ (0, _.jsx)("span", {
									className: "gallery-hint",
									children: o("Für das Magazin-Depot bleiben passende Bilder bis 16 MB unverändert. Grössere Dateien werden auf deinem Gerät optimiert; deine Kameradatei bleibt erhalten.")
								}),
								/* @__PURE__ */ (0, _.jsx)("span", { children: o("oder vom Gerät auswählen") }),
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "file",
									multiple: !E,
									accept: E ? "application/pdf" : e === "gallery" ? "image/jpeg,image/png,image/webp" : "image/jpeg,image/png,image/webp,application/pdf",
									"aria-label": o("Dateien auswählen"),
									onChange: (e) => {
										J(Array.from(e.target.files || [])), e.target.value = "";
									}
								}),
								/* @__PURE__ */ (0, _.jsx)("small", { children: E ? o("Ein PDF-Dokument · bis 25 MB") : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
									o(e === "gallery" ? "Bis zu 1’000 Bilder auswählen · je bis 50 MB · Upload bis 16 MB" : "Bis zu 6 Dateien · Bilder bis 20 MB"),
									e === "library" ? " · PDFs bis 100 MB" : "",
									e === "gallery" ? "" : " · insgesamt 120 MB",
									" · JPG, PNG, WebP",
									e === "gallery" || e === "forum" ? "" : " oder PDF",
									e === "forum" ? " oder PDF · optional" : ""
								] }) })
							]
						}), /* @__PURE__ */ (0, _.jsx)("ul", {
							className: "upload-list",
							children: ie.map((t, n) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
								/* @__PURE__ */ (0, _.jsxs)("span", { children: [
									t.name,
									" · ",
									(t.size / 1024 / 1024).toFixed(1),
									" MB"
								] }),
								e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bildbeschriftung"), /* @__PURE__ */ (0, _.jsx)("input", {
									maxLength: 240,
									value: ee[t.name + "-" + t.size] || "",
									onChange: (e) => te((n) => ({
										...n,
										[t.name + "-" + t.size]: e.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									"aria-label": `${t.name} entfernen`,
									onClick: () => G((e) => e.filter((e, t) => t !== n)),
									children: o("Entfernen")
								})
							] }, `${n}-${t.name}`))
						})] }),
						!t && e === "gallery" && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "gallery-disclaimer",
							children: o("Mit dem Hochladen bestätigst du, dass die Fotos auf der Website und in Publikationen des Swiss TR-Club verwendet werden dürfen. Die Fotos sind sofort für Clubmitglieder sichtbar; die Galerie-Moderation kann einzelne Bilder ausblenden.")
						}),
						!t && !D && e !== "gallery" && (e !== "forum" || ie.length > 0) && /* @__PURE__ */ (0, _.jsxs)("label", {
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
				oe && ne && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: ne
				}),
				!D && /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "club-hint",
					children: [
						o(e === "library" ? "Sichtbarkeit gemäss gewählter Zugriffsklasse." : "Sichtbar für Clubmitglieder."),
						" ",
						o("Laden Sie nur Material hoch, das Sie teilen dürfen.")
					]
				}),
				ae && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state error",
					role: "alert",
					children: ae
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: oe,
						onClick: r,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: oe,
						children: o(oe ? "Wird gespeichert …" : t ? "Änderungen speichern" : e === "forum" ? "Zur Prüfung einreichen" : "Hochladen")
					})]
				})
			]
		})
	});
}
function Mr(e) {
	e.forEach((e, t) => window.setTimeout(() => {
		let t = document.createElement("a");
		t.href = e.url, t.download = e.name, document.body.appendChild(t), t.click(), t.remove();
	}, t * 600));
}
function Nr({ id: e, nonce: t, close: n, updated: i, inline: a = !1, addPhotos: s }) {
	let c = (0, h.useRef)(null), l = I();
	function u(e, t) {
		let n = Tr(t);
		return e === "documentType" ? o(l.libraryTypes.find((e) => e.key === n)?.label || n) : e === "language" ? o({
			de: "Deutsch",
			fr: "Français",
			en: "English",
			multi: "Mehrsprachig",
			other: "Nicht angegeben"
		}[n] || n) : e === "galleryCategory" ? o(br[n] || n) : n;
	}
	let [d, f] = (0, h.useState)(null), [p, m] = (0, h.useState)(1), [g, y] = (0, h.useState)(0), [b, x] = (0, h.useState)(""), [S, E] = (0, h.useState)(!0), [D, O] = (0, h.useState)(""), [k, A] = (0, h.useState)(!1), [j, M] = (0, h.useState)(0), [N, P] = (0, h.useState)(null), [F, L] = (0, h.useState)(!1), [R, z] = (0, h.useState)(!1), [B, V] = (0, h.useState)(!1), H = (e) => {
		let t = c.current;
		if (!t) return;
		let n = Math.max(0, Math.min(e, t.children.length - 1));
		t.scrollTo({
			left: n * t.clientWidth,
			behavior: "smooth"
		}), M(n), z(!1), P(null);
	};
	(0, h.useEffect)(() => {
		let t = new AbortController();
		return C(yr, {
			operation: "detail",
			id: String(e),
			page: String(p)
		}, t.signal).then((e) => {
			f(e), E(!1);
		}).catch((e) => {
			t.signal.aborted || (x(e.message), E(!1));
		}), () => t.abort();
	}, [
		e,
		p,
		g
	]);
	async function U() {
		A(!0), x("");
		try {
			await w(yr, t, T({
				operation: "reply",
				id: String(e),
				text: D
			})), O(""), m(Math.ceil(((d?.replyCount || 0) + 1) / 20)), y((e) => e + 1), i();
		} catch (e) {
			x(e.message);
		} finally {
			A(!1);
		}
	}
	let W = d?.files.filter((e) => e.mime.startsWith("image/")) || [], ee = Object.entries(d?.classification || {}).filter(([e, t]) => e !== "access" && e !== "eventId" && (Array.isArray(t) ? t.length > 0 : typeof t == "string" && t.trim() !== "")).map(([e, t]) => ({
		key: e,
		label: o(Cr[e] || e),
		value: u(e, t)
	})), te = N && N.key === W[j]?.key ? N.value : W[j]?.caption || "", [ne, re] = (0, h.useState)(!1), [ie, G] = (0, h.useState)(!1), [ae, K] = (0, h.useState)([]), [oe, se] = (0, h.useState)(null), [ce, le] = (0, h.useState)(null);
	async function q(n, r) {
		A(!0);
		try {
			return await w(yr, t, T({
				operation: n,
				id: String(e),
				...r
			})), le(null), y((e) => e + 1), i(), !0;
		} catch (e) {
			return x(e.message), !1;
		} finally {
			A(!1);
		}
	}
	async function ue() {
		let e = W[j];
		if (!(!d || !e)) {
			L(!0), x("");
			try {
				await w(yr, t, T({
					operation: "captions",
					id: String(d.id),
					key: e.key,
					caption: te
				})), P(null), z(!1), y((e) => e + 1), i();
			} catch (e) {
				x(e.message);
			} finally {
				L(!1);
			}
		}
	}
	let Y = /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "club-dialog-body",
		children: [S ? /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Beitrag wird geladen …")
		}) : /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: d && hr(d) ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(gr, {
			item: d,
			edit: () => G(!0)
		}), ie && /* @__PURE__ */ (0, _.jsx)(_r, {
			item: d,
			nonce: t,
			close: () => G(!1),
			saved: () => {
				G(!1), y((e) => e + 1), i();
			},
			deleted: () => {
				i(), n();
			}
		})] }) : d && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
			d.kind === "forum" && /* @__PURE__ */ (0, _.jsxs)("p", {
				className: "forum-thread-stats",
				children: [
					$n(Tr(d.classification.area)),
					" ",
					o(Qn(Tr(d.classification.area))),
					" · ",
					d.replyCount,
					" ",
					o("Antworten"),
					" · ",
					d.views || 0,
					" ",
					o("Aufrufe")
				]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: d.kind === "forum" ? "forum-post is-opening" : "community-detail-main",
				children: [d.kind === "forum" && /* @__PURE__ */ (0, _.jsx)(Dr, {
					name: d.author,
					posts: d.authorPosts,
					starter: !0
				}), /* @__PURE__ */ (0, _.jsxs)("div", {
					className: d.kind === "forum" ? "forum-post-body" : "community-detail-main",
					children: [
						d.kind === "forum" ? /* @__PURE__ */ (0, _.jsx)("p", {
							className: "forum-post-date",
							children: Er(d.createdAt)
						}) : /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "eyebrow",
							children: [
								d.author,
								" · ",
								new Date(d.createdAt).toLocaleDateString(r())
							]
						}),
						ee.length > 4 ? /* @__PURE__ */ (0, _.jsxs)("details", {
							className: "community-classification",
							children: [/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
								o("Beitragsdetails"),
								" (",
								ee.length,
								")"
							] }), /* @__PURE__ */ (0, _.jsx)("dl", { children: ee.map((e) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: e.label }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.value })] }, e.key)) })]
						}) : ee.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: ee.map((e) => `${e.label}: ${e.value}`).join(" · ")
						}),
						d.kind === "gallery" && Tr(d.classification.eventId) && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
							href: "#veranstaltung/" + Tr(d.classification.eventId),
							children: o("Zugehörige Veranstaltung")
						}) }),
						d.kind === "library" && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: o({
								publish: "Freigegeben",
								pending: "In Prüfung",
								draft: "Abgelehnt / Entwurf",
								trash: "Archiviert"
							}[d.status] || d.status)
						}),
						d.canReview && d.kind === "library" && ["pending", "draft"].includes(d.status) && /* @__PURE__ */ (0, _.jsxs)("section", {
							className: "document-review-actions",
							"aria-label": o("Dokument prüfen"),
							children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Dokument prüfen") }), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-actions",
								children: [/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-primary",
									disabled: k || d.status === "publish",
									onClick: async () => {
										await q("approve", {}) && n();
									},
									children: o("Freigeben")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "club-secondary",
									disabled: k || d.status === "draft",
									onClick: async () => {
										await q("reject", {}) && n();
									},
									children: o("Ablehnen")
								})]
							})]
						}),
						d.canReview && d.kind === "gallery" && /* @__PURE__ */ (0, _.jsx)(Fr, {
							item: d,
							busy: k,
							act: q
						}),
						" ",
						d.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(J, { html: d.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", {
							className: "community-description",
							children: d.description
						}),
						W.length > 0 && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "community-gallery",
							children: [
								d.kind === "gallery" ? /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "album-carousel",
									children: [/* @__PURE__ */ (0, _.jsx)("div", {
										className: "album-track",
										ref: c,
										onScroll: (e) => {
											let t = e.currentTarget, n = Math.round(t.scrollLeft / Math.max(1, t.clientWidth));
											n !== j && (M(n), z(!1), P(null));
										},
										children: W.map((e, t) => /* @__PURE__ */ (0, _.jsx)("figure", {
											className: "album-slide",
											"aria-label": `Bild ${t + 1} von ${W.length}`,
											children: /* @__PURE__ */ (0, _.jsx)(v, {
												unoptimized: !0,
												src: e.url,
												alt: e.caption || e.name,
												width: 1400,
												height: 933
											})
										}, e.key))
									}), W.length > 1 && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
										/* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											className: "album-nav is-prev",
											disabled: j === 0,
											onClick: () => H(j - 1),
											"aria-label": o("Vorheriges Bild"),
											children: "‹"
										}),
										/* @__PURE__ */ (0, _.jsx)("button", {
											type: "button",
											className: "album-nav is-next",
											disabled: j >= W.length - 1,
											onClick: () => H(j + 1),
											"aria-label": o("Nächstes Bild"),
											children: "›"
										}),
										/* @__PURE__ */ (0, _.jsxs)("span", {
											className: "album-counter",
											"aria-live": "polite",
											children: [
												j + 1,
												" / ",
												W.length
											]
										})
									] })]
								}) : /* @__PURE__ */ (0, _.jsx)("button", {
									className: "community-gallery-main" + (B ? " is-zoomed" : ""),
									onClick: () => V((e) => !e),
									"aria-label": B ? "Bild verkleinern" : "Bild vergrössern",
									children: /* @__PURE__ */ (0, _.jsx)(v, {
										unoptimized: !0,
										src: W[j]?.url || W[0].url,
										alt: W[j]?.caption || W[j]?.name || W[0].name,
										width: 1e3,
										height: 700
									})
								}),
								W.length > 1 && /* @__PURE__ */ (0, _.jsx)("div", {
									className: "community-thumbnails" + (d.kind === "gallery" ? " is-pickable" : ""),
									children: W.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", {
										className: "thumb-pick" + (t === j ? " is-selected" : ""),
										children: [
											/* @__PURE__ */ (0, _.jsx)("button", {
												type: "button",
												className: t === j ? "is-selected" : "",
												onClick: () => d.kind === "gallery" ? H(t) : M(t),
												"aria-label": "Bild " + (t + 1) + " anzeigen",
												children: /* @__PURE__ */ (0, _.jsx)(v, {
													unoptimized: !0,
													src: e.url,
													alt: "",
													width: 220,
													height: 150
												})
											}),
											d.kind === "gallery" && e.public && /* @__PURE__ */ (0, _.jsx)("span", {
												className: "thumb-home",
												title: o("Auf der Startseite"),
												"aria-label": o("Auf der Startseite"),
												children: "⌂"
											}),
											d.kind === "gallery" && /* @__PURE__ */ (0, _.jsxs)("label", {
												className: "thumb-check",
												children: [/* @__PURE__ */ (0, _.jsx)("input", {
													type: "checkbox",
													checked: ae.includes(e.key),
													onChange: (t) => K((n) => t.target.checked ? [...n, e.key] : n.filter((t) => t !== e.key))
												}), /* @__PURE__ */ (0, _.jsxs)("span", {
													className: "market-sr-only",
													children: [
														o("Bild"),
														" ",
														t + 1,
														" ",
														o("auswählen")
													]
												})]
											})
										]
									}, e.key))
								}),
								/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "club-actions gallery-download-actions",
									children: [d.kind !== "gallery" || W.length === 1 ? /* @__PURE__ */ (0, _.jsx)("a", {
										className: "club-secondary",
										href: W[j]?.url || W[0].url,
										download: W[j]?.name || W[0].name,
										children: o(d.kind === "gallery" ? "Bild herunterladen" : "Aktuelles Bild herunterladen")
									}) : /* @__PURE__ */ (0, _.jsxs)("button", {
										type: "button",
										className: "market-primary",
										disabled: !ae.length,
										onClick: () => Mr(W.filter((e) => ae.includes(e.key)).map((e) => ({
											url: e.url,
											name: e.name
										}))),
										children: [
											o("Bildauswahl herunterladen"),
											" (",
											ae.length,
											")"
										]
									}), d.kind === "gallery" && W.some((e) => e.originalUrl) && /* @__PURE__ */ (0, _.jsxs)("button", {
										type: "button",
										className: "club-secondary",
										onClick: () => Mr(W.filter((e) => e.originalUrl).map((e) => ({
											url: e.originalUrl,
											name: e.name
										}))),
										children: [
											o("Alle Originale herunterladen"),
											" (",
											W.filter((e) => e.originalUrl).length,
											")"
										]
									})]
								}),
								d.kind === "gallery" && /* @__PURE__ */ (0, _.jsx)("p", {
									className: "club-hint",
									children: o("Downloads nur für den privaten Gebrauch. Weitere Veröffentlichung nur mit Erlaubnis.")
								}),
								d.kind === "gallery" && d.canReview && W[j] && /* @__PURE__ */ (0, _.jsxs)("label", {
									className: "album-switch album-home-switch",
									children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "checkbox",
										role: "switch",
										checked: !!W[j].public,
										onChange: async (n) => {
											let r = W[j];
											try {
												await w(yr, t, T({
													operation: "image-policy",
													id: String(e),
													key: r.key,
													public: n.target.checked ? "1" : "0"
												})), y((e) => e + 1);
											} catch (e) {
												x(e.message);
											}
										}
									}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [
										o("Dieses Bild auf der Startseite zeigen"),
										" (",
										j + 1,
										"/",
										W.length,
										")"
									] })]
								}),
								d.kind === "gallery" && W[j]?.photographer && /* @__PURE__ */ (0, _.jsxs)("p", {
									className: "community-photographer",
									children: [
										o("Foto"),
										": ",
										W[j].photographer
									]
								}),
								!R && /* @__PURE__ */ (0, _.jsx)("p", {
									className: "community-caption",
									children: W[j]?.caption || W[j]?.name
								}),
								W[j]?.canCaption && d.kind === "gallery" && !R && /* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									onClick: () => z(!0),
									children: o("Bildbeschreibung bearbeiten")
								}),
								W[j]?.canCaption && d.kind === "gallery" && R && /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "community-caption-editor",
									children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bildbeschreibung"), /* @__PURE__ */ (0, _.jsx)("textarea", {
										maxLength: 240,
										rows: 3,
										value: te,
										onChange: (e) => P({
											key: W[j].key,
											value: e.target.value
										}),
										disabled: F
									})] }), /* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "club-secondary",
										disabled: F,
										onClick: () => void ue(),
										children: F ? "Wird gespeichert …" : "Bildbeschreibung speichern"
									})]
								}),
								W.length > 1 && d.kind !== "gallery" && /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "club-actions",
									children: [
										/* @__PURE__ */ (0, _.jsx)("button", {
											className: "club-secondary",
											disabled: j === 0,
											onClick: () => M((e) => e - 1),
											children: o("Vorheriges Bild")
										}),
										/* @__PURE__ */ (0, _.jsxs)("span", { children: [
											j + 1,
											" / ",
											W.length
										] }),
										/* @__PURE__ */ (0, _.jsx)("button", {
											className: "club-secondary",
											disabled: j >= W.length - 1,
											onClick: () => M((e) => e + 1),
											children: o("Nächstes Bild")
										})
									]
								})
							]
						}),
						oe && /* @__PURE__ */ (0, _.jsx)(vr, {
							url: oe.url,
							title: oe.name,
							back: () => se(null)
						}),
						/* @__PURE__ */ (0, _.jsx)("ul", {
							className: "community-files",
							children: d.files.filter((e) => !e.mime.startsWith("image/")).map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
								e.mime === "application/pdf" && /* @__PURE__ */ (0, _.jsxs)("button", {
									className: "market-text-button",
									onClick: () => se(e),
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
						})
					]
				})]
			}),
			d.kind === "forum" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				d.mergedInto > 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#forum/" + d.mergedInto,
					children: o("Zum zusammengeführten Thema")
				}) }),
				d.closed ? /* @__PURE__ */ (0, _.jsx)("p", { children: o("Dieses Thema ist geschlossen.") }) : null,
				/* @__PURE__ */ (0, _.jsxs)("details", {
					className: "forum-replies-block",
					open: !0,
					children: [
						/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
							o("Antworten"),
							" (",
							d.replyCount,
							")"
						] }),
						!d.replies.length && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "forum-empty",
							children: o("Noch keine Antworten. Schreib die erste.")
						}),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "forum-replies",
							children: d.replies.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("article", {
								className: "forum-post",
								children: [/* @__PURE__ */ (0, _.jsx)(Dr, {
									name: e.author,
									posts: e.authorPosts
								}), /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "forum-post-body",
									children: [
										/* @__PURE__ */ (0, _.jsxs)("p", {
											className: "forum-post-date",
											children: [Er(e.createdAt), /* @__PURE__ */ (0, _.jsxs)("span", { children: ["#", (p - 1) * 20 + t + 1] })]
										}),
										/* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)(Ir, { text: e.text }) }),
										d.canReview && /* @__PURE__ */ (0, _.jsxs)("div", {
											className: "club-actions",
											children: [/* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												onClick: () => le({
													id: e.id,
													text: e.text
												}),
												children: o("Bearbeiten")
											}), /* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												disabled: k,
												onClick: () => void q("reply-hide", { reply: String(e.id) }),
												children: o("Antwort ausblenden")
											})]
										})
									]
								})]
							}, e.id))
						}),
						ce && /* @__PURE__ */ (0, _.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault(), q("reply-edit", {
									reply: String(ce.id),
									text: ce.text
								});
							},
							children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Antwort bearbeiten"), /* @__PURE__ */ (0, _.jsx)("textarea", {
									required: !0,
									maxLength: 5e3,
									value: ce.text,
									onChange: (e) => le({
										...ce,
										text: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									disabled: k,
									children: o("Speichern")
								}),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									onClick: () => le(null),
									children: o("Abbrechen")
								})
							]
						}),
						/* @__PURE__ */ (0, _.jsx)(An, {
							page: p,
							pages: d.replyPages,
							change: (e) => {
								E(!0), m(e);
							}
						})
					]
				}),
				!d.closed && /* @__PURE__ */ (0, _.jsxs)("form", {
					className: "club-reply-form",
					onSubmit: (e) => {
						e.preventDefault(), U();
					},
					children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mein Beitrag:"), /* @__PURE__ */ (0, _.jsx)("textarea", {
						required: !0,
						maxLength: 5e3,
						rows: 4,
						value: D,
						disabled: k,
						onChange: (e) => O(e.target.value)
					})] }), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: k,
						children: k ? "Wird gesendet …" : "Absenden"
					})]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "forum-thread-tools",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-actions",
							children: [/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: k,
								className: "club-secondary",
								onClick: async () => {
									A(!0);
									try {
										await w(yr, t, T({
											operation: "subscribe",
											id: String(e),
											subscribe: d.subscribed ? "0" : "1"
										})), y((e) => e + 1);
									} catch (e) {
										x(e.message);
									} finally {
										A(!1);
									}
								},
								children: d.subscribed ? "Abonnement beenden" : "Thema abonnieren"
							}), d.canClose && /* @__PURE__ */ (0, _.jsx)("button", {
								disabled: k,
								className: "club-secondary",
								onClick: async () => {
									try {
										await w(yr, t, T({
											operation: "close",
											id: String(e),
											closed: d.closed ? "0" : "1"
										})), y((e) => e + 1);
									} catch (e) {
										x(e.message);
									}
								},
								children: d.closed ? "Thema öffnen" : "Thema schliessen"
							})]
						}),
						d.canReview && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: k,
							onClick: () => void q("pin", { pinned: d.pinned ? "0" : "1" }),
							children: o(d.pinned ? "Anheftung entfernen" : "Thema anheften")
						}), /* @__PURE__ */ (0, _.jsx)(Pr, {
							id: e,
							merge: (e) => void q("merge", { target: String(e) }),
							busy: k
						})] }),
						d.canEdit && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "forum-owner-actions",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", {
								className: "application-consent",
								children: [/* @__PURE__ */ (0, _.jsx)("input", {
									type: "checkbox",
									checked: d.status === "trash",
									disabled: k,
									onChange: async (n) => {
										A(!0), x("");
										try {
											await w(yr, t, T({
												operation: n.target.checked ? "trash" : "restore",
												id: String(e)
											})), y((e) => e + 1), i();
										} catch (e) {
											x(e.message);
										} finally {
											A(!1);
										}
									}
								}), o("Thema archivieren (bleibt im Archiv lesbar)")]
							}), ne ? /* @__PURE__ */ (0, _.jsxs)("span", {
								className: "forum-delete-confirm",
								children: [
									o("Thema mit allen Antworten endgültig löschen?"),
									" ",
									/* @__PURE__ */ (0, _.jsx)("button", {
										className: "market-primary",
										disabled: k,
										onClick: async () => {
											A(!0), x("");
											try {
												await w(yr, t, T({
													operation: "delete",
													id: String(e)
												})), i(), n();
											} catch (e) {
												x(e.message), A(!1);
											}
										},
										children: o("Ja, löschen")
									}),
									" ",
									/* @__PURE__ */ (0, _.jsx)("button", {
										className: "club-secondary",
										disabled: k,
										onClick: () => re(!1),
										children: o("Abbrechen")
									})
								]
							}) : /* @__PURE__ */ (0, _.jsx)("button", {
								className: "market-text-button",
								disabled: k,
								onClick: () => re(!0),
								children: o("Thema löschen")
							})]
						})
					]
				})
			] })
		] }) }), b && /* @__PURE__ */ (0, _.jsxs)("p", {
			className: "collection-state error",
			role: "alert",
			children: [b, /* @__PURE__ */ (0, _.jsx)("button", {
				className: "market-text-button",
				onClick: () => {
					x(""), E(!0), y((e) => e + 1);
				},
				children: o("Erneut versuchen")
			})]
		})]
	});
	return oe ? /* @__PURE__ */ (0, _.jsx)(X, {
		title: oe.name,
		close: n,
		children: /* @__PURE__ */ (0, _.jsx)(vr, {
			url: oe.url,
			title: oe.name,
			back: n
		})
	}) : a ? /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "album-view",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "album-view-head",
				children: [/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "community-overview-link",
					onClick: n,
					children: o("← Alle Alben")
				}), d && d.kind === "gallery" && d.status === "publish" && !hr(d) && s && /* @__PURE__ */ (0, _.jsxs)("button", {
					type: "button",
					className: "market-primary",
					onClick: () => s({
						id: d.id,
						title: d.title
					}),
					children: ["＋ ", o("Eigene Fotos hinzufügen")]
				})]
			}),
			/* @__PURE__ */ (0, _.jsx)("h2", {
				className: "album-view-title",
				children: d?.title || ""
			}),
			Y
		]
	}) : /* @__PURE__ */ (0, _.jsx)(X, {
		title: d?.title || "Beitrag",
		close: n,
		busy: k,
		children: Y
	});
}
function Pr({ id: e, merge: t, busy: n }) {
	let [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	return (0, h.useEffect)(() => {
		let t = new AbortController();
		return C(yr, {
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
function Fr({ item: e, busy: t, act: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(yr, { operation: "albums" }, e.signal).then(s).catch((t) => {
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
			/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Album pflegen (Moderation)") }),
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-hint",
				children: o("Hochgeladene Bilder sind sofort sichtbar. Hier lassen sich einzelne Bilder ausblenden und wieder einblenden.")
			}),
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
						o(e.reviewStatus === "rejected" ? "Ausgeblendet" : "Sichtbar")
					] })
				] }, e.key))
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-actions",
				children: [
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: t || !r.length,
						onClick: () => void f("photos-review", { state: "rejected" }),
						children: o("Auswahl ausblenden")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: t || !r.length,
						onClick: () => void f("photos-review", { state: "approved" }),
						children: o("Auswahl einblenden")
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
function Ir({ text: e }) {
	return /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: e.split(/(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/g).map((e, t) => {
		if (t % 2 == 0) return e;
		let n = e.replace(/[.,;:!?)\]]+$/, ""), r = e.slice(n.length);
		return /* @__PURE__ */ (0, _.jsxs)("span", { children: [/* @__PURE__ */ (0, _.jsx)("a", {
			href: n.startsWith("http") ? n : "https://" + n,
			target: "_blank",
			rel: "noopener noreferrer nofollow ugc",
			children: n
		}), r] }, t);
	}) });
}
function Lr({ item: e, open: t }) {
	let n = e.files.filter((e) => e.mime.startsWith("image/")), r = e.files.filter((e) => !e.mime.startsWith("image/"));
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "forum-board-body",
		children: [
			e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(J, { html: e.descriptionHtml }) : e.description && /* @__PURE__ */ (0, _.jsx)("p", { children: e.description }),
			n.length > 0 && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "forum-board-images",
				children: n.slice(0, 6).map((e) => /* @__PURE__ */ (0, _.jsx)("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: /* @__PURE__ */ (0, _.jsx)(v, {
						unoptimized: !0,
						src: e.url,
						alt: e.caption || e.name,
						width: 240,
						height: 180
					})
				}, e.key))
			}),
			r.length > 0 && /* @__PURE__ */ (0, _.jsx)("ul", {
				className: "forum-board-files",
				children: r.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: e.name
				}) }, e.key))
			}),
			/* @__PURE__ */ (0, _.jsxs)("button", {
				type: "button",
				className: "club-secondary",
				onClick: t,
				children: [
					o("Öffnen und antworten"),
					" (",
					e.replyCount,
					")"
				]
			})
		]
	});
}
var Rr = "strc-forum-guide-seen", zr = () => () => {};
function Br() {
	return /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "forum-guide",
		open: !(0, h.useSyncExternalStore)(zr, () => {
			try {
				return localStorage.getItem(Rr) === "1";
			} catch {
				return !0;
			}
		}, () => !0),
		onToggle: (e) => {
			if (!e.currentTarget.open) try {
				localStorage.setItem(Rr, "1");
			} catch {}
		},
		children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("So funktioniert das Forum") }), /* @__PURE__ */ (0, _.jsxs)("ol", { children: [
			/* @__PURE__ */ (0, _.jsx)("li", { children: o("Bereich wählen: Klicke auf eine Kachel, z. B. «Technik» oder «Ersatzteilsuche». Dort siehst du alle Themen dieses Bereichs.") }),
			/* @__PURE__ */ (0, _.jsx)("li", { children: o("Thema öffnen: Klicke auf den Titel, um Beitrag und Antworten zu lesen.") }),
			/* @__PURE__ */ (0, _.jsx)("li", { children: o("Antworten: Im geöffneten Thema unten deine Antwort schreiben. Webadressen werden automatisch zu Links.") }),
			/* @__PURE__ */ (0, _.jsx)("li", { children: o("Neues Thema: Im Bereich auf «Thema erstellen» klicken. Mit dem Knopf «Link» in der Werkzeugleiste fügst du Verweise auf andere Websites oder Foren ein; Bilder und PDF kannst du anhängen.") }),
			/* @__PURE__ */ (0, _.jsx)("li", { children: o("Benachrichtigung: Mit «Abonnieren» wirst du über neue Beiträge im Bereich informiert, auf Wunsch zusätzlich per WhatsApp.") })
		] })]
	});
}
//#endregion
//#region app/components/Breadcrumbs.tsx
function Vr() {
	let e = (0, h.useSyncExternalStore)(Ke, Ge, () => "");
	return e ? /* @__PURE__ */ (0, _.jsxs)("button", {
		type: "button",
		className: "site-back-link",
		onClick: () => window.history.back(),
		children: ["← ", o(e === "#" ? "Zurück zur Startseite" : "Zurück")]
	}) : null;
}
var Hr = {
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
	finance: "Kasse",
	editorial: "Redaktion"
}, Ur = {
	regions: "regionen",
	models: "tr-modelle",
	editorial: "redaktion",
	market: "marktplatz",
	shop: "tr-shop"
}, Wr = {
	fahrzeuge: "Fahrzeuge",
	ersatzteile: "Ersatzteile",
	meine: "Meine Inserate",
	pruefung: "In Prüfung"
}, Gr = {
	artikel: "Artikel",
	lager: "Lager",
	abrechnung: "Abrechnung"
}, Kr = {
	zuerich: "Zürich",
	"suisse-romande": "Suisse romande"
}, qr = [
	"profile",
	"applications",
	"forum",
	"gallery",
	"library",
	"clubdocs",
	"directory",
	"editorial",
	"event-admin",
	"finance"
];
function Jr({ page: e, subroute: t }) {
	let { text: n } = q();
	if ((0, h.useEffect)(() => {
		Ge();
	}, []), e === "home") return null;
	let r = [
		"history",
		"organisation",
		"mission",
		"membership",
		"models"
	].includes(e) ? [["#club", "Club"]] : e === "triungsters" ? [["#regionen", "Regionen"]] : qr.includes(e) ? [["#mitglieder", "Mitgliederbereich"]] : e === "registration" ? [["#agenda", "Agenda"]] : e === "shop" ? [["#marktplatz", "Marktplatz"]] : [];
	e === "clubdocs" && r.push(["#bibliothek", "Bibliothek"]);
	let i = e === "regions" && t ? Kr[t] || t.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ") : e === "models" && t ? n("model-" + t + ".title", t.toUpperCase()) : e === "editorial" && t ? t === "people" ? "Moderatorrollen" : t === "mails" ? "E-Mail-Vorlagen" : n(t + ".title", "Seite bearbeiten") : e === "market" ? Wr[t] || "" : e === "shop" && Gr[t] || "";
	return /* @__PURE__ */ (0, _.jsxs)("nav", {
		className: "site-breadcrumbs",
		"aria-label": o("Seitenpfad"),
		children: [/* @__PURE__ */ (0, _.jsx)(Vr, {}), /* @__PURE__ */ (0, _.jsxs)("ol", { children: [
			/* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: "#",
				children: o("Startseite")
			}) }),
			r.map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: e,
				children: o(t)
			}) }, e)),
			i ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: "#" + (Ur[e] || ""),
				children: o(Hr[e])
			}) }), /* @__PURE__ */ (0, _.jsx)("li", {
				"aria-current": "page",
				children: o(i)
			})] }) : /* @__PURE__ */ (0, _.jsx)("li", {
				"aria-current": "page",
				children: o(Hr[e] || "Swiss TR-Club")
			})
		] })]
	});
}
//#endregion
//#region app/components/MemberForms.tsx
var Yr = "strc_forms";
function Xr() {
	let [e, t] = (0, h.useState)(""), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(!1), l = (0, h.useRef)(!1), u = (0, h.useRef)("");
	return (0, h.useEffect)(() => {
		C(Yr, { operation: "config" }).then((e) => t(e.nonce)).catch(() => r("Kontaktformular konnte nicht geladen werden. Bitte die Seite neu laden."));
	}, []), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "contact-form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: "Kontakt aufnehmen" }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: "Felder mit * sind erforderlich." }),
			i ? /* @__PURE__ */ (0, _.jsx)(V, { message: i }) : /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "club-form",
				onSubmit: async (t) => {
					if (t.preventDefault(), l.current) return;
					let n = new FormData(t.currentTarget);
					n.set("operation", "contact"), u.current ||= crypto.randomUUID(), n.set("requestId", u.current), l.current = !0, c(!0), r("");
					try {
						a((await w(Yr, e, n)).message);
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
							/* @__PURE__ */ (0, _.jsx)(ne, {})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(te, {}),
					/* @__PURE__ */ (0, _.jsx)(V, { error: n }),
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
var Zr = {
	female: "Weiblich",
	male: "Männlich",
	other: "Divers"
}, Qr = {
	de: "Deutsch",
	fr: "Français"
}, $r = (e) => {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString("de-CH");
}, ei = [
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
function ti(e, t) {
	return t ? e === "gender" ? o(Zr[t] || t) : e === "language" ? o(Qr[t] || t) : e === "salutation" ? o(t) : e === "birth_date" ? $r(t) : t : "–";
}
function ni({ block: e }) {
	return /* @__PURE__ */ (0, _.jsx)("dl", {
		className: "profile-data",
		children: ei.map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsxs)("dt", { children: [o(n), e.locked.includes(t) && /* @__PURE__ */ (0, _.jsx)("span", {
			className: "profile-lock",
			title: o("Wird vom Club in Fairgate geführt"),
			"aria-label": o("nicht veränderbar"),
			children: " 🔒"
		})] }), /* @__PURE__ */ (0, _.jsx)("dd", { children: ti(t, e.values[t]) })] }, t))
	});
}
function ri({ block: e, names: t, busy: n, submit: r, cancel: i, submitLabel: a }) {
	let s = e.values, c = (n) => !t || e.locked.includes(n), l = (e, t) => /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "profile-fixed",
		children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [o(t), " 🔒"] }), /* @__PURE__ */ (0, _.jsx)("strong", { children: ti(e, s[e]) })]
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
						}), Object.entries(Zr).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
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
function ii() {
	let { text: e } = q(), [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(0), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(null), [m, g] = (0, h.useState)({
		owner: -1,
		url: ""
	}), [y, b] = (0, h.useState)(null), x = (0, h.useRef)(""), S = (0, h.useRef)(!1), [E, D] = (0, h.useState)(""), [O, k] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(Yr, { operation: "profile-read" }, e.signal).then(n).catch((t) => {
			e.signal.aborted || s(t.message);
		}), () => e.abort();
	}, [r]);
	async function A(e, n = Yr, r = t?.nonce || "") {
		if (!(!t || S.current)) {
			S.current = !0, d(!0), s(""), l("");
			try {
				l((await w(n, r, e)).message), i((e) => e + 1), p(null), b(null), D(""), k(!1);
			} catch (e) {
				s(e.message);
			} finally {
				d(!1), S.current = !1;
			}
		}
	}
	let j = (e, t) => (e.set("operation", t), e), M = t?.subscriptions, N = M ? M.request ? {
		print: M.request.print,
		newsletter: M.request.newsletter
	} : {
		print: M.print,
		newsletter: M.newsletter
	} : null, P = t?.mode === "partner", F = t?.mode === "single" ? "Mitglied" : "Hauptmitglied", I = t ? t.copilot.kind === "member" ? `${o("Mitglied")} · ${o("Paarmitgliedschaft")}${t.copilot.memberNumber ? " · Nr. " + t.copilot.memberNumber : ""}` : t.copilot.kind === "guest" ? o("Nicht-Mitglied") : o("Noch kein Co-Pilot erfasst") : "", L = !!t && t.copilot.kind === "guest" && [
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
			/* @__PURE__ */ (0, _.jsx)(V, {
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
				P && /* @__PURE__ */ (0, _.jsx)("p", {
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
								children: o(F)
							}), /* @__PURE__ */ (0, _.jsx)("h2", { children: [t.person.values.first_name, t.person.values.last_name].filter(Boolean).join(" ") || t.name })] }),
							!P && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: e("profile.memberHint")
							}),
							t.person.pending && /* @__PURE__ */ (0, _.jsxs)("p", {
								className: "profile-pending",
								children: [
									o("Änderung vom"),
									" ",
									$r(t.person.pending.at),
									" ",
									o("gemeldet – wird in Fairgate übernommen.")
								]
							}),
							E === "person" ? /* @__PURE__ */ (0, _.jsx)(ri, {
								block: t.person,
								names: !1,
								busy: u,
								cancel: () => D(""),
								submitLabel: "Angaben speichern",
								submit: (e) => void A(j(e, "profile"))
							}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(ni, { block: t.person }), t.canEdit && /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => {
									l(""), D("person");
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
									children: I
								})
							] }),
							!P && t.mode === "single" && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: e("profile.copilotHint")
							}),
							t.copilot.pending && /* @__PURE__ */ (0, _.jsxs)("p", {
								className: "profile-pending",
								children: [
									o("Änderung vom"),
									" ",
									$r(t.copilot.pending.at),
									" ",
									o("gemeldet – wird in Fairgate übernommen.")
								]
							}),
							E === "copilot" ? /* @__PURE__ */ (0, _.jsx)(ri, {
								block: t.copilot,
								names: t.copilot.kind !== "member",
								busy: u,
								cancel: () => D(""),
								submitLabel: t.copilot.kind === "none" ? "Co-Pilot erfassen" : "Angaben speichern",
								submit: (e) => void A(j(e, "copilot-save"))
							}) : t.copilot.kind === "none" ? t.canEdit && /* @__PURE__ */ (0, _.jsxs)("button", {
								className: "market-primary",
								onClick: () => {
									l(""), D("copilot");
								},
								children: ["＋ ", o("Co-Pilot erfassen")]
							}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(ni, { block: t.copilot }), t.canEdit && /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => {
									l(""), D("copilot");
								},
								children: o("Angaben bearbeiten")
							})] })
						]
					})]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "profile-tiles",
					children: [
						(t.couple.state === "pending" || t.couple.state === "active" && t.mode === "primary" || t.couple.available && t.canEdit && t.copilot.kind === "guest") && /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "profile-card profile-tile",
							children: [
								/* @__PURE__ */ (0, _.jsxs)("header", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
									className: "eyebrow",
									children: o("Mitgliedschaft")
								}), /* @__PURE__ */ (0, _.jsx)("h2", { children: o("Paarmitgliedschaft") })] }),
								t.couple.state === "pending" && /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "profile-couple is-pending",
									children: [
										/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Paarmitgliedschaft beantragt") }),
										/* @__PURE__ */ (0, _.jsxs)("p", { children: [
											o("Beantragt am"),
											" ",
											$r(t.couple.at || ""),
											". ",
											o("Sobald der Wechsel in Fairgate umgesetzt ist, wird die Paarmitgliedschaft hier aktiv.")
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
												checked: O,
												disabled: u || !L,
												onChange: (e) => k(e.target.checked)
											}), /* @__PURE__ */ (0, _.jsx)("span", { children: o("Zur Paarmitgliedschaft wechseln") })]
										}),
										/* @__PURE__ */ (0, _.jsx)(J, { html: e("profile.coupleText") }),
										!L && /* @__PURE__ */ (0, _.jsx)("p", {
											className: "club-hint",
											children: o("Dafür bitte zuerst E-Mail, Mobilnummer und Adresse des Co-Piloten erfassen.")
										}),
										O && /* @__PURE__ */ (0, _.jsx)("button", {
											className: "market-primary",
											disabled: u,
											onClick: () => void A(T({ operation: "couple-request" })),
											children: o("Wechsel verbindlich beantragen")
										})
									]
								})
							]
						}),
						N && /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "profile-card profile-tile",
							children: [/* @__PURE__ */ (0, _.jsxs)("header", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
								className: "eyebrow",
								children: o("Abonnemente")
							}), /* @__PURE__ */ (0, _.jsx)("h2", { children: o("TR-Magazin & eNewsletter") })] }), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "db-subscriptions profile-subscriptions",
								children: [
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "checkbox",
										checked: N.print,
										disabled: u,
										onChange: (e) => void A(T({
											operation: "subscriptions",
											print: e.target.checked ? "1" : "0",
											newsletter: N.newsletter ? "1" : "0"
										}), "strc_dashboard", t.dashboardNonce)
									}), o("Printausgabe abonniert")] }),
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "checkbox",
										checked: N.newsletter,
										disabled: u,
										onChange: (e) => void A(T({
											operation: "subscriptions",
											print: N.print ? "1" : "0",
											newsletter: e.target.checked ? "1" : "0"
										}), "strc_dashboard", t.dashboardNonce)
									}), o("eNewsletter abonniert")] }),
									M?.request && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Änderung gemeldet.") })
								]
							})]
						}),
						/* @__PURE__ */ (0, _.jsxs)("article", {
							className: "profile-card profile-tile",
							children: [/* @__PURE__ */ (0, _.jsxs)("header", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
								className: "eyebrow",
								children: o("Verzeichnis")
							}), /* @__PURE__ */ (0, _.jsx)("h2", { children: o("Profilbild") })] }), /* @__PURE__ */ (0, _.jsxs)("form", {
								className: "club-form",
								onSubmit: (e) => {
									e.preventDefault(), A(j(new FormData(e.currentTarget), "preferences"));
								},
								children: [/* @__PURE__ */ (0, _.jsxs)("fieldset", {
									disabled: u,
									children: [
										/* @__PURE__ */ (0, _.jsx)("legend", {
											className: "market-sr-only",
											children: o("Profilbild")
										}),
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
							})]
						}),
						/* @__PURE__ */ (0, _.jsxs)("article", {
							className: "profile-card profile-tile is-wide",
							children: [
								/* @__PURE__ */ (0, _.jsxs)("header", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
									className: "eyebrow",
									children: o("Fahrzeuge")
								}), /* @__PURE__ */ (0, _.jsx)("h2", { children: o("Meine Triumphs") })] }),
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
								!t.vehicles.length && /* @__PURE__ */ (0, _.jsx)("p", { children: o(t.noTr ? "In Fairgate vermerkt: zurzeit kein TR." : "Noch keine Fahrzeuge erfasst.") }),
								/* @__PURE__ */ (0, _.jsx)("div", {
									className: "profile-vehicles",
									children: t.vehicles.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [
										e.photo && /* @__PURE__ */ (0, _.jsx)(v, {
											unoptimized: !0,
											src: e.photo,
											alt: e.model,
											width: 640,
											height: 360,
											style: {
												...pe(e.photoFrame, "cover"),
												aspectRatio: "16 / 9",
												height: "auto"
											}
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
												onClick: () => b(e),
												children: o("Entfernen")
											})]
										})
									] }, e.id))
								}),
								t.canEditVehicles && /* @__PURE__ */ (0, _.jsxs)("button", {
									className: "market-primary",
									onClick: () => {
										s(""), x.current = crypto.randomUUID(), p(B());
									},
									children: ["＋ ", o("Triumph hinzufügen")]
								})
							]
						})
					]
				}),
				f && /* @__PURE__ */ (0, _.jsx)(X, {
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
							}), t.set("requestId", x.current), t.set("operation", "vehicle-save"), A(t);
						},
						children: [
							/* @__PURE__ */ (0, _.jsxs)("fieldset", {
								disabled: u,
								children: [
									/* @__PURE__ */ (0, _.jsx)("legend", {
										className: "market-sr-only",
										children: o("Fahrzeugangaben")
									}),
									/* @__PURE__ */ (0, _.jsx)(ee, {
										value: f,
										onChange: p,
										application: !0
									}),
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeugbild (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
										type: "file",
										name: "photo[]",
										accept: "image/jpeg,image/png,image/webp",
										onChange: (e) => {
											let t = e.target.files?.[0];
											g((e) => (e.url && URL.revokeObjectURL(e.url), {
												owner: f.id ?? 0,
												url: t ? URL.createObjectURL(t) : ""
											}));
										}
									})] }),
									(() => {
										let e = (m.owner === (f.id ?? 0) ? m.url : "") || f.photo || "";
										return e ? /* @__PURE__ */ (0, _.jsx)(Nn, {
											src: e,
											value: f.photoFrame,
											changed: (e) => p({
												...f,
												photoFrame: e
											})
										}) : null;
									})(),
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
							/* @__PURE__ */ (0, _.jsx)(V, { error: a }),
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
				y && /* @__PURE__ */ (0, _.jsx)(X, {
					title: o("Fahrzeug entfernen"),
					close: () => b(null),
					busy: u,
					children: /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-dialog-body",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [
								y.model,
								" ",
								o("aus der Fahrzeugliste entfernen? Bisherige Veranstaltungsanmeldungen bleiben erhalten.")
							] }),
							/* @__PURE__ */ (0, _.jsx)(V, { error: a }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-actions",
								children: [/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									disabled: u,
									onClick: () => b(null),
									children: o("Abbrechen")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-primary",
									disabled: u,
									onClick: () => void A(T({
										operation: "vehicle-remove",
										id: String(y.id),
										revision: y.revision || ""
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
var ai = {
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
}, oi = {
	single: "Einzelmitgliedschaft",
	couple: "Paarmitgliedschaft",
	young: "Young / TRiungsters"
}, si = [
	"queued",
	"syncing",
	"provisioning",
	"mail_pending"
];
function ci({ person: e, title: t }) {
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
function li({ nonce: e }) {
	let [t, n] = (0, h.useState)(() => typeof window < "u" && window.location.hash.startsWith("#antraege/paar") ? "couples" : "applications");
	function r(e) {
		n(e), typeof window < "u" && qe(e === "couples" ? "#antraege/paar" : "#antraege");
	}
	let [i, a] = (0, h.useState)(null), [s, c] = (0, h.useState)(null), [l, u] = (0, h.useState)(1), [d, f] = (0, h.useState)(0), [p, m] = (0, h.useState)(""), [g, v] = (0, h.useState)(!1), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_applications", { page: String(l) }, e.signal).then(a).catch((t) => {
			e.signal.aborted || m(t.message);
		}), () => e.abort();
	}, [l, d]), (0, h.useEffect)(() => {
		if (!s || !si.includes(s.state)) return;
		let t = !0, n = setTimeout(() => {
			w("strc_applications", e, T({
				operation: "process",
				id: String(s.id)
			})).then((e) => {
				t && (c(e.application), f((e) => e + 1));
			}).catch((e) => {
				t && m(e.message);
			});
		}, 1800);
		return () => {
			t = !1, clearTimeout(n);
		};
	}, [s, e]);
	async function E(e) {
		v(!0), m("");
		try {
			let t = await C("strc_applications", {
				operation: "detail",
				id: String(e)
			});
			c(t.application), b(t.application.reviewNote || "");
		} catch (e) {
			m(e.message);
		} finally {
			v(!1);
		}
	}
	async function D(t, n = {}) {
		if (!(!s || g)) {
			v(!0), m("");
			try {
				c((await w("strc_applications", e, T({
					operation: t,
					id: String(s.id),
					revision: s.revision,
					note: y,
					...n
				}))).application), S(""), f((e) => e + 1);
			} catch (e) {
				S(""), m(e.message);
			} finally {
				v(!1);
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
				}), /* @__PURE__ */ (0, _.jsx)("h1", { children: o("Anträge bearbeiten") })] }), /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#mitglieder",
					children: o("Zum Dashboard →")
				})]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "inbox-tabs",
				role: "tablist",
				children: [/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": t === "applications",
					className: t === "applications" ? "is-active" : "",
					onClick: () => r("applications"),
					children: o("Mitgliedsanträge")
				}), /* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": t === "couples",
					className: t === "couples" ? "is-active" : "",
					onClick: () => r("couples"),
					children: o("Paarmitgliedschaften")
				})]
			}),
			t === "couples" ? /* @__PURE__ */ (0, _.jsx)(di, { nonce: e }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("p", { children: "Prüfe die Angaben und bestätige die Aufnahme. Nach bestätigter Mitgliedschaft in Fairgate werden die Website-Konten eingerichtet. Die Willkommensmail bleibt deaktiviert, bis sie ausdrücklich freigegeben wird." }),
				/* @__PURE__ */ (0, _.jsx)(V, { error: p }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "inbox-layout",
					children: [/* @__PURE__ */ (0, _.jsxs)("aside", {
						"aria-label": "Eingegangene Anträge",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							onClick: () => {
								f((e) => e + 1), s && E(s.id);
							},
							disabled: g,
							children: o("Aktualisieren")
						}), i ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsx)("ul", {
								className: "inbox-list",
								children: i.items.map((e) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
									className: s?.id === e.id ? "selected" : "",
									disabled: g,
									onClick: () => void E(e.id),
									"aria-current": s?.id === e.id ? "true" : void 0,
									children: [
										/* @__PURE__ */ (0, _.jsx)("strong", { children: e.name || `Antrag #${e.id}` }),
										/* @__PURE__ */ (0, _.jsx)("span", { children: oi[e.type] || e.type }),
										/* @__PURE__ */ (0, _.jsx)("small", { children: ai[e.state] || "Manueller Abgleich erforderlich" })
									]
								}) }, e.id))
							}),
							i.items.length === 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: "Noch keine Mitgliedsanträge eingegangen." }),
							i.pages > 1 && /* @__PURE__ */ (0, _.jsxs)("nav", {
								"aria-label": "Antragsseiten",
								children: [
									/* @__PURE__ */ (0, _.jsx)("button", {
										disabled: l <= 1 || g,
										onClick: () => u((e) => e - 1),
										children: o("Zurück")
									}),
									" ",
									l,
									" / ",
									i.pages,
									" ",
									/* @__PURE__ */ (0, _.jsx)("button", {
										disabled: l >= i.pages || g,
										onClick: () => u((e) => e + 1),
										children: o("Weiter")
									})
								]
							}),
							/* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: i.otherInboxUrl,
								children: "Kontaktanfragen und Profiländerungen →"
							}) })
						] }) : /* @__PURE__ */ (0, _.jsx)("p", {
							role: "status",
							children: "Anträge werden geladen …"
						})]
					}), /* @__PURE__ */ (0, _.jsx)("article", {
						className: "inbox-detail",
						"aria-busy": g,
						children: s ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsxs)("p", {
								className: "eyebrow",
								children: [
									"Antrag #",
									s.id,
									" · ",
									s.date
								]
							}),
							/* @__PURE__ */ (0, _.jsxs)("h2", { children: [
								s.payload.person.first_name,
								" ",
								s.payload.person.last_name
							] }),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-notice",
								role: "status",
								children: ai[s.state] || "Manueller Abgleich erforderlich"
							}),
							s.error && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "form-error",
								role: "alert",
								children: s.error
							}),
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [
								/* @__PURE__ */ (0, _.jsx)("strong", { children: oi[s.payload.membershipType] }),
								" · Region ",
								s.payload.region
							] }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-form-row",
								children: [/* @__PURE__ */ (0, _.jsx)(ci, {
									person: s.payload.person,
									title: "Antragsteller/in"
								}), s.payload.copilot && /* @__PURE__ */ (0, _.jsx)(ci, {
									person: s.payload.copilot,
									title: "Co-Pilot"
								})]
							}),
							/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Fahrzeuge") }),
							s.payload.vehicles.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: s.payload.vehicles.map((e, t) => /* @__PURE__ */ (0, _.jsx)("li", { children: [
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
							s.payload.notes && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Bemerkungen") }), /* @__PURE__ */ (0, _.jsx)("p", {
								className: "preserve-lines",
								children: s.payload.notes
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [
								"Statuten: ",
								s.payload.declarations.statutes ? "bestätigt" : "fehlt",
								" · Datenschutz: ",
								s.payload.declarations.privacy ? "bestätigt" : "fehlt",
								s.payload.copilot && ` · Zustimmung Co-Pilot: ${s.payload.declarations.copilot ? "bestätigt" : "fehlt"}`
							] }),
							Object.entries(s.contacts || {}).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("p", { children: [
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
										value: y,
										onChange: (e) => b(e.target.value),
										rows: 3,
										maxLength: 2e3,
										disabled: g || si.includes(s.state)
									})] }),
									[
										"pending_review",
										"clarification",
										"approved_pending_sync",
										"awaiting_configuration"
									].includes(s.state) && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
										!s.ready && /* @__PURE__ */ (0, _.jsx)("p", {
											className: "club-notice",
											children: "Die Fairgate-Schreibanbindung ist noch nicht freigegeben. Du kannst die Prüfung bestätigen; der Antrag bleibt bis zur Einrichtung offen. Es werden noch keine Mitgliedsnummer, Konten oder Willkommensmails erzeugt."
										}),
										/* @__PURE__ */ (0, _.jsxs)("div", {
											className: "club-form-actions",
											children: [
												/* @__PURE__ */ (0, _.jsx)("button", {
													className: "market-primary",
													disabled: g,
													onClick: () => S("approve"),
													children: o("Bestätigen")
												}),
												/* @__PURE__ */ (0, _.jsx)("button", {
													className: "club-secondary",
													disabled: g,
													onClick: () => void D("clarification"),
													children: "Rückfrage vermerken"
												}),
												/* @__PURE__ */ (0, _.jsx)("button", {
													className: "club-secondary",
													disabled: g,
													onClick: () => S("rejected"),
													children: o("Ablehnen")
												})
											]
										}),
										/* @__PURE__ */ (0, _.jsx)("p", {
											className: "club-hint",
											children: "Rückfragen und Ablehnungen werden intern vermerkt. Bitte informiere die Person persönlich."
										})
									] }),
									["needs_reconciliation", "sync_error"].includes(s.state) && /* @__PURE__ */ (0, _.jsxs)("form", {
										onSubmit: (e) => {
											e.preventDefault();
											let t = new FormData(e.currentTarget);
											D("reconcile", {
												personId: String(t.get("personId") || ""),
												copilotId: String(t.get("copilotId") || "")
											});
										},
										children: [
											/* @__PURE__ */ (0, _.jsx)("h3", { children: "Mit Fairgate abgleichen" }),
											/* @__PURE__ */ (0, _.jsx)("p", { children: "Vorhandene Kontakte und gegebenenfalls die Paarverknüpfung in Fairgate prüfen. Der Abgleich liest die offiziellen Daten erneut; unterbrochene Schreibvorgänge werden nicht wiederholt." }),
											["person", ...s.payload.copilot ? ["copilot"] : []].map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
												e === "person" ? "Antragsteller/in" : "Co-Pilot",
												" – Fairgate Contact ID",
												/* @__PURE__ */ (0, _.jsx)("input", {
													name: `${e}Id`,
													pattern: "[1-9][0-9]*",
													required: !0,
													defaultValue: s.contacts?.[e]?.contactId || "",
													readOnly: !!s.contacts?.[e]?.contactId
												})
											] }, e)),
											/* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-primary",
												disabled: g || !s.ready,
												children: "Daten erneut prüfen"
											})
										]
									}),
									["mail_error", "mail_uncertain"].includes(s.state) && /* @__PURE__ */ (0, _.jsx)("button", {
										className: "market-primary",
										disabled: g,
										onClick: () => S("retry_mail"),
										children: "Willkommensmail erneut senden"
									})
								]
							}),
							s.audit?.length ? /* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: "Bearbeitungsverlauf" }), /* @__PURE__ */ (0, _.jsx)("ol", { children: s.audit.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
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
				x && s && /* @__PURE__ */ (0, _.jsxs)(X, {
					title: x === "approve" ? "Mitgliedsantrag bestätigen" : x === "rejected" ? "Antrag ablehnen" : "Willkommensmail erneut senden",
					close: () => {
						g || S("");
					},
					busy: g,
					children: [/* @__PURE__ */ (0, _.jsx)("p", { children: x === "approve" ? s.ready ? `Die Daten werden an Fairgate übertragen. Nach bestätigter Mitgliedschaft und offizieller Mitgliedsnummer folgen Website-Konten. ${s.mailEnabled ? "Die Willkommensmail ist aktiviert." : "Die Willkommensmail bleibt deaktiviert."}` : "Die Prüfung wird bestätigt. Die Übernahme wartet auf die Einrichtung der Fairgate-Anbindung." : x === "rejected" ? "Der Antrag wird als abgelehnt vermerkt. Es entstehen keine neuen Konten oder Willkommensmails." : "Bitte zuerst das Mailprotokoll prüfen. Bei unklarem Versand kann die Person bereits eine Einladung erhalten haben. Ein neuer Versand ersetzt den bisherigen Passwortlink." }), /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-form-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: g,
							onClick: () => void D(x),
							children: g ? "Wird gespeichert …" : x === "approve" ? "Bestätigen" : x === "rejected" ? "Ablehnung speichern" : "Erneut senden"
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: g,
							onClick: () => S(""),
							children: o("Abbrechen")
						})]
					})]
				})
			] })
		]
	});
}
var ui = {
	pending_review: "Offen",
	clarification: "Rückfrage",
	approved_pending_sync: "In Fairgate verbunden",
	completed: "Paarmitgliedschaft aktiv",
	rejected: "Abgelehnt"
};
function di({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)({});
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_applications", { operation: "couples" }, e.signal).then((e) => n(e.items)).catch((t) => {
			e.signal.aborted || i(t.message);
		}), () => e.abort();
	}, []);
	async function f(t, r) {
		l(t.id), i(""), s("");
		try {
			let i = await w("strc_applications", e, T({
				operation: "couple-state",
				id: String(t.id),
				revision: t.revision,
				state: r,
				note: u[t.id] ?? t.note
			}));
			n(i.items), s(i.message);
		} catch (e) {
			i(e.message);
		} finally {
			l(0);
		}
	}
	let p = (t || []).filter((e) => ["pending_review", "clarification"].includes(e.state)), m = (t || []).filter((e) => !["pending_review", "clarification"].includes(e.state)), g = (e) => {
		let t = e.copilot, n = ["pending_review", "clarification"].includes(e.state);
		return /* @__PURE__ */ (0, _.jsxs)("article", {
			className: "form-section couple-request",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("header", { children: [/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
					e.member.name,
					" ",
					/* @__PURE__ */ (0, _.jsxs)("span", { children: ["+ ", [t.first_name, t.last_name].filter(Boolean).join(" ")] })
				] }), /* @__PURE__ */ (0, _.jsx)("span", {
					className: "couple-state is-" + e.state,
					children: o(ui[e.state] || e.state)
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "club-hint",
					children: [
						o("Eingegangen"),
						": ",
						new Date(e.date.replace(" ", "T")).toLocaleDateString("de-CH"),
						e.fee ? ` · ${o("Neuer Beitrag")}: ${e.fee}` : ""
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "couple-request-grid",
					children: [/* @__PURE__ */ (0, _.jsxs)("section", { children: [/* @__PURE__ */ (0, _.jsx)("h4", { children: o("Hauptmitglied") }), /* @__PURE__ */ (0, _.jsxs)("p", { children: [
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.member.name }),
						e.member.memberNumber && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsx)("br", {}),
							o("Mitgliedsnummer"),
							": ",
							e.member.memberNumber
						] }),
						/* @__PURE__ */ (0, _.jsx)("br", {}),
						e.member.email,
						e.member.fairgateContactId && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsx)("br", {}),
							"Fairgate-ID: ",
							e.member.fairgateContactId
						] })
					] })] }), /* @__PURE__ */ (0, _.jsxs)("section", { children: [/* @__PURE__ */ (0, _.jsx)("h4", { children: o("Co-Pilot (neues Paarmitglied)") }), /* @__PURE__ */ (0, _.jsxs)("p", { children: [
						/* @__PURE__ */ (0, _.jsx)("strong", { children: [
							t.salutation,
							t.first_name,
							t.last_name
						].filter(Boolean).join(" ") }),
						t.birth_date && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsx)("br", {}),
							o("Geburtsdatum"),
							": ",
							t.birth_date
						] }),
						/* @__PURE__ */ (0, _.jsx)("br", {}),
						t.email,
						/* @__PURE__ */ (0, _.jsx)("br", {}),
						t.phone,
						/* @__PURE__ */ (0, _.jsx)("br", {}),
						t.street,
						/* @__PURE__ */ (0, _.jsx)("br", {}),
						t.postcode,
						" ",
						t.city,
						t.country ? ", " + t.country : ""
					] })] })]
				}),
				n && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "club-notice",
					children: [
						o("In Fairgate beim Mitglied unter «Haushalt/Partner» die Co-Pilot-Angaben prüfen und den Co-Piloten als Paarmitglied verbinden. Beim nächsten Abgleich wird die Paarmitgliedschaft hier aktiv; das Mitglied und der Kassier werden dann automatisch informiert."),
						/* @__PURE__ */ (0, _.jsx)("br", {}),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.copilotInFairgate ? "Co-Pilot-Angaben in Fairgate übertragen." : "Co-Pilot-Angaben noch nicht in Fairgate – bitte aus den Angaben oben erfassen.") })
					]
				}), /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-form couple-review",
					children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Interne Notiz"), /* @__PURE__ */ (0, _.jsx)("textarea", {
						rows: 2,
						maxLength: 2e3,
						value: u[e.id] ?? e.note,
						disabled: c > 0,
						onChange: (t) => d((n) => ({
							...n,
							[e.id]: t.target.value
						}))
					})] }), /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-form-actions",
						children: [
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: "market-primary",
								disabled: c > 0,
								onClick: () => void f(e, "approved_pending_sync"),
								children: c === e.id ? o("Wird gespeichert …") : o("In Fairgate verbunden – erledigt")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								disabled: c > 0,
								onClick: () => void f(e, "clarification"),
								children: o("Rückfrage vermerken")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								disabled: c > 0,
								onClick: () => void f(e, "rejected"),
								children: o("Ablehnen")
							})
						]
					})]
				})] }),
				!n && e.note && /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "club-hint",
					children: [
						o("Notiz"),
						": ",
						e.note
					]
				})
			]
		}, e.id);
	};
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "couple-requests",
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", { children: o("Mitglieder, die zur Paarmitgliedschaft wechseln möchten. Die Bearbeitung erfolgt in Fairgate; aktivierte Paare werden hier automatisch abgeschlossen.") }),
			/* @__PURE__ */ (0, _.jsx)(V, { error: r }),
			a && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "club-notice",
				role: "status",
				children: a
			}),
			t ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [p.length ? p.map(g) : /* @__PURE__ */ (0, _.jsx)("p", {
				className: "collection-state",
				children: o("Keine offenen Anfragen.")
			}), m.length > 0 && /* @__PURE__ */ (0, _.jsxs)("details", {
				className: "couple-done",
				children: [/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
					o("Zuletzt bearbeitet"),
					" (",
					m.length,
					")"
				] }), m.map(g)]
			})] }) : /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Anfragen werden geladen …")
			})
		]
	});
}
//#endregion
//#region app/components/HomepageOverview.tsx
function fi(e) {
	let t = document.getElementById(e);
	t && (t.scrollIntoView({
		behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
		block: "start"
	}), t.focus({ preventScroll: !0 }));
}
//#endregion
//#region app/components/swissOutline.ts
var pi = {
	width: 620,
	height: 424,
	path: "M493.9,72.3 L499.0,106.4 L478.8,153.6 L538.5,188.7 L605.8,193.9 L595.4,273.0 L537.3,305.5 L439.7,281.3 L411.1,359.0 L348.2,365.1 L325.4,334.6 L251.4,400.0 L187.8,409.1 L131.1,367.8 L85.8,283.3 L22.8,313.5 L24.7,226.3 L121.2,118.0 L117.0,69.0 L177.1,86.8 L213.3,53.8 L325.5,55.2 L352.6,13.3 L493.9,72.3 Z"
}, mi = {
	zuerich: [354.9, 102.1],
	bern: [211.1, 183.1],
	ostschweiz: [464.3, 92.5],
	mittelland: [270.4, 109.8],
	innerschweiz: [324.5, 163.8],
	nordwestschweiz: [229.5, 65.5],
	"suisse-romande": [102.9, 265.9]
}, hi = "(prefers-reduced-motion: reduce)", gi = (e) => {
	let t = matchMedia(hi);
	return t.addEventListener("change", e), () => t.removeEventListener("change", e);
};
function _i() {
	return (0, h.useSyncExternalStore)(gi, () => matchMedia(hi).matches, () => !0);
}
var vi = () => matchMedia(hi).matches ? "instant" : "smooth", yi = (e, t) => t === "fr" && e.altFr ? e.altFr : e.alt;
function bi({ nextEvent: e }) {
	let { text: t, values: r } = q(), { language: i } = n(), a = _i(), s = t("home.heroImage").trim(), c = (r.home?.photos ?? []).filter((e) => e.url), l = [...s ? [{
		url: s,
		alt: ""
	}] : [], ...c.filter((e) => e.url !== s)].slice(0, 4);
	l.length || l.push({
		url: "/club/scheinwerfer.jpg",
		alt: ""
	});
	let u = [t("home.intro"), t("home.mission")].filter((e) => e.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim()), [d, f] = (0, h.useState)(0), [p, m] = (0, h.useState)(!1), [g, y] = (0, h.useState)(!0);
	(0, h.useEffect)(() => {
		let e = () => y(!document.hidden);
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), (0, h.useEffect)(() => {
		if (a || p || !g || Math.max(l.length, u.length) < 2) return;
		let e = window.setTimeout(() => f((e) => e + 1), 7e3);
		return () => window.clearTimeout(e);
	}, [
		a,
		p,
		g,
		l.length,
		u.length,
		d
	]);
	let b = (t) => {
		!e || !document.getElementById("home-next-event") || (t.preventDefault(), fi("home-next-event"));
	}, x = d % l.length, S = yi(l[x] ?? l[0], i);
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "hx-hero",
		"aria-labelledby": "home-arrival-title",
		onFocusCapture: () => m(!0),
		onBlurCapture: (e) => {
			e.currentTarget.contains(e.relatedTarget) || m(!1);
		},
		children: [
			l.map((e, t) => /* @__PURE__ */ (0, _.jsx)("div", {
				className: `hx-hero-slide${t === x ? " is-active" : ""}${a ? "" : " is-moving"}`,
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, _.jsx)(v, {
					src: Y(e.url),
					alt: "",
					width: 1920,
					height: 1080,
					priority: t === 0,
					loading: t === 0 ? void 0 : "lazy",
					style: pe(e.frame, "cover")
				})
			}, e.url + t)),
			/* @__PURE__ */ (0, _.jsx)("div", {
				className: "hx-hero-shade",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "home-width hx-hero-copy",
				children: [
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "hx-eyebrow",
						children: t("home.eyebrow", "Willkommen beim Swiss TR-Club")
					}),
					/* @__PURE__ */ (0, _.jsx)("h1", {
						id: "home-arrival-title",
						children: t("home.title")
					}),
					u.length > 1 && !a ? /* @__PURE__ */ (0, _.jsx)("div", {
						className: "hx-hero-leads",
						"aria-live": "off",
						children: u.map((e, t) => /* @__PURE__ */ (0, _.jsx)(J, {
							html: e,
							className: `hx-hero-intro${t === d % u.length ? " is-active" : ""}`
						}, t))
					}) : u.map((e, t) => /* @__PURE__ */ (0, _.jsx)(J, {
						html: e,
						className: "hx-hero-intro is-active"
					}, t)),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "hx-hero-actions",
						children: [/* @__PURE__ */ (0, _.jsxs)("a", {
							className: "hx-button hx-button-red",
							href: "#anmeldung",
							children: [
								o("Mitglied werden"),
								" ",
								/* @__PURE__ */ (0, _.jsx)("span", {
									"aria-hidden": "true",
									children: "→"
								})
							]
						}), /* @__PURE__ */ (0, _.jsx)("a", {
							className: "hx-button hx-button-ghost",
							href: "#agenda",
							onClick: b,
							children: o(e ? "Nächster Anlass" : "Zur Agenda")
						})]
					})
				]
			}),
			l.length > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "home-width hx-hero-meta",
				children: [S && /* @__PURE__ */ (0, _.jsx)("span", { children: S }), /* @__PURE__ */ (0, _.jsx)("div", {
					className: "hx-hero-dots",
					role: "group",
					"aria-label": o("Titelbild wählen"),
					children: l.map((e, t) => /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						"aria-label": `${o("Bild")} ${t + 1}`,
						"aria-current": t === x,
						onClick: () => f(t)
					}, e.url + t))
				})]
			})
		]
	});
}
function xi(e, t) {
	let n = Math.max(0, Math.floor((e - t) / 6e4));
	return {
		days: Math.floor(n / 1440),
		hours: Math.floor(n / 60) % 24,
		minutes: n % 60
	};
}
function Si({ event: e, open: t }) {
	let [n, i] = (0, h.useState)(() => Date.now());
	if ((0, h.useEffect)(() => {
		let e = window.setInterval(() => i(Date.now()), 3e4);
		return () => window.clearInterval(e);
	}, []), !e) return null;
	let a = new Date(e.startAt);
	if (Number.isNaN(a.getTime())) return null;
	let s = xi(a.getTime(), n), c = r(), l = { timeZone: "Europe/Zurich" }, u = `${a.toLocaleDateString(c, {
		...l,
		weekday: "short",
		day: "numeric",
		month: "long",
		year: "numeric"
	})}, ${a.toLocaleTimeString(c, {
		...l,
		hour: "2-digit",
		minute: "2-digit"
	})}`, d = e.location || e.region?.name || "", f = e.registrationCloseAt ? new Date(e.registrationCloseAt) : null, p = e.registrationStatus === "open" ? f && !Number.isNaN(f.getTime()) ? `${o("Anmeldung offen bis")} ${f.toLocaleDateString(c, {
		...l,
		day: "numeric",
		month: "long"
	})}` : o("Anmeldung offen") : e.registrationStatus === "waiting" ? o("Warteliste offen") : "", m = (e) => String(e).padStart(2, "0"), g = o(e.registrationStatus === "open" || e.registrationStatus === "waiting" ? "Jetzt anmelden" : "Details ansehen");
	return /* @__PURE__ */ (0, _.jsx)("div", {
		className: "home-width hx-next",
		id: "home-next-event",
		tabIndex: -1,
		children: /* @__PURE__ */ (0, _.jsxs)("section", {
			className: "hx-next-card",
			"aria-labelledby": "hx-next-title",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("time", {
					className: "hx-calendar",
					dateTime: e.startAt,
					children: [/* @__PURE__ */ (0, _.jsx)("span", { children: a.toLocaleDateString(c, {
						...l,
						month: "short"
					}).replace(".", "") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: a.toLocaleDateString(c, {
						...l,
						day: "numeric"
					}) })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "hx-next-info",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: o("Nächster Anlass")
						}),
						/* @__PURE__ */ (0, _.jsx)("h2", {
							id: "hx-next-title",
							children: e.title
						}),
						/* @__PURE__ */ (0, _.jsx)("p", { children: [u, d].filter(Boolean).join(" · ") }),
						p && /* @__PURE__ */ (0, _.jsx)("span", {
							className: "hx-next-status",
							children: p
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "hx-countdown",
					"aria-label": `${o("Noch")} ${s.days} ${o(s.days === 1 ? "Tag" : "Tage")}`,
					children: [
						/* @__PURE__ */ (0, _.jsxs)("div", {
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, _.jsx)("b", { children: s.days }), /* @__PURE__ */ (0, _.jsx)("small", { children: o(s.days === 1 ? "Tag" : "Tage") })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, _.jsx)("b", { children: m(s.hours) }), /* @__PURE__ */ (0, _.jsx)("small", { children: o("Std") })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, _.jsx)("b", { children: m(s.minutes) }), /* @__PURE__ */ (0, _.jsx)("small", { children: o("Min") })]
						})
					]
				}),
				t ? /* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "hx-button hx-button-red",
					onClick: () => t(e),
					children: g
				}) : /* @__PURE__ */ (0, _.jsx)("a", {
					className: "hx-button hx-button-red",
					href: `#agenda/${e.id}`,
					children: g
				})
			]
		})
	});
}
function Ci({ value: e, from: t = 0, run: n }) {
	let [r, i] = (0, h.useState)(e);
	return (0, h.useEffect)(() => {
		if (!n) return;
		let r = 0, a = performance.now(), o = (n) => {
			let s = Math.min(1, (n - a) / 1400);
			i(Math.round(t + (e - t) * (1 - (1 - s) ** 3))), s < 1 && (r = requestAnimationFrame(o));
		};
		return r = requestAnimationFrame(o), () => cancelAnimationFrame(r);
	}, [
		n,
		e,
		t
	]), /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: r });
}
function wi({ stats: e }) {
	let t = _i(), n = (0, h.useRef)(null), [r, i] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let e = n.current;
		if (!e || t || r || !("IntersectionObserver" in window)) return;
		let a = new IntersectionObserver((e) => {
			e[0]?.isIntersecting && (i(!0), a.disconnect());
		}, { threshold: .4 });
		return a.observe(e), () => a.disconnect();
	}, [
		t,
		r,
		e
	]);
	let a = [[
		1975,
		"gegründet",
		"über 50 Jahre Clubgeschichte",
		1900
	]];
	return e?.members && a.push([
		e.members,
		"Mitglieder",
		"in der ganzen Schweiz",
		0
	]), e?.vehicles && a.push([
		e.vehicles,
		"Triumph im Club",
		"vom TR2 bis zum TR8",
		0
	]), e?.regions.length && a.push([
		e.regions.length,
		"Regionen",
		"mit eigenem Stamm",
		0
	]), a.length < 2 ? null : /* @__PURE__ */ (0, _.jsx)("section", {
		className: "hx-stats",
		ref: n,
		"aria-label": o("Der Club in Zahlen"),
		children: /* @__PURE__ */ (0, _.jsx)("div", {
			className: "home-width",
			children: /* @__PURE__ */ (0, _.jsx)("ul", { children: a.map(([e, t, n, i]) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
				/* @__PURE__ */ (0, _.jsx)("b", { children: /* @__PURE__ */ (0, _.jsx)(Ci, {
					value: e,
					from: i,
					run: r
				}) }),
				/* @__PURE__ */ (0, _.jsx)("span", { children: o(t) }),
				/* @__PURE__ */ (0, _.jsx)("small", { children: o(n) })
			] }, t)) })
		})
	});
}
function Ti({ count: e }) {
	let { text: t } = q(), n = t("home.triungstersImage").trim() || t("triungsters.image").trim(), r = t("home.triungstersTitle");
	return r ? /* @__PURE__ */ (0, _.jsx)("section", {
		className: "hx-triungsters",
		"aria-labelledby": "hx-triungsters-title",
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "home-width hx-triungsters-inner",
			children: [/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "hx-triungsters-image",
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					src: n ? Y(n) : de("triungsters"),
					alt: "",
					width: 900,
					height: 675
				}), e ? /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "hx-triungsters-count",
					children: [/* @__PURE__ */ (0, _.jsx)("b", { children: e }), /* @__PURE__ */ (0, _.jsx)("span", { children: o("TRiungsters im Club") })]
				}) : null]
			}), /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "hx-triungsters-copy",
				children: [
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "hx-eyebrow",
						children: t("home.triungstersLabel")
					}),
					/* @__PURE__ */ (0, _.jsx)("h2", {
						id: "hx-triungsters-title",
						children: r
					}),
					t("home.triungstersText") && /* @__PURE__ */ (0, _.jsx)("p", { children: t("home.triungstersText") }),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "hx-hero-actions",
						children: [/* @__PURE__ */ (0, _.jsxs)("a", {
							className: "hx-button hx-button-red",
							href: "#triungsters",
							children: [
								o("Mehr über die TRiungsters"),
								" ",
								/* @__PURE__ */ (0, _.jsx)("span", {
									"aria-hidden": "true",
									children: "→"
								})
							]
						}), /* @__PURE__ */ (0, _.jsx)("a", {
							className: "hx-button hx-button-ghost",
							href: "#anmeldung",
							children: o("Als TRiungster beitreten")
						})]
					})
				]
			})]
		})
	}) : null;
}
var Ei = (e, t) => {
	let n = typeof e[t] == "string" ? e[t].trim() : "";
	return /^(?:beispiel|exemple|example)\b/i.test(n) ? "" : n;
}, Di = (e) => e.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&#039;|&#39;/g, "'").replace(/\s+/g, " ").trim();
function Oi(e, t) {
	let n = typeof e.factsBody == "string" ? e.factsBody : "";
	for (let e of n.split(/<\/p>/i)) {
		let n = e.match(/<strong>([\s\S]*?)<\/strong>([\s\S]*)/i);
		if (!n || !t.some((e) => Di(n[1]).toLowerCase() === e.toLowerCase())) continue;
		let r = n[2].split(/<br\s*\/?>/i).map(Di).find(Boolean) || "";
		return /^(?:beispiel|exemple|example)\b/i.test(r) ? "" : r;
	}
	return "";
}
function ki() {
	let { values: e, published: t } = q(), n = (0, h.useRef)(null), r = (n) => {
		let r = "model-" + n.toLowerCase();
		return t[r] && e[r] || {};
	}, i = (e) => {
		let t = n.current;
		t && t.scrollBy({
			left: e * t.clientWidth * .8,
			behavior: vi()
		});
	};
	return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "hx-models",
		"aria-labelledby": "hx-models-title",
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "home-width",
			children: [/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "hx-head",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Die Triumph TR-Familie")
				}), /* @__PURE__ */ (0, _.jsx)("h2", {
					id: "hx-models-title",
					children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: "#tr-modelle",
						children: o("Vom TR2 bis zum TR8")
					})
				})] }), /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "hx-track-controls",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						"aria-label": o("Vorherige Modelle"),
						onClick: () => i(-1),
						children: "←"
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						"aria-label": o("Weitere Modelle"),
						onClick: () => i(1),
						children: "→"
					})]
				})]
			}), /* @__PURE__ */ (0, _.jsx)("div", {
				className: "hx-model-track",
				ref: n,
				children: bt.map((e) => {
					let t = r(e), n = Ei(t, "image"), i = Oi(t, ["Bauzeit", "Période de production"]) || Ei(t, "years"), a = Oi(t, ["Motor", "Moteur"]) || [Ei(t, "engine"), Ei(t, "displacement")].filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, _.jsxs)("a", {
						className: "hx-model",
						href: `#tr-modelle/${e.toLowerCase()}`,
						children: [
							/* @__PURE__ */ (0, _.jsx)("span", {
								className: "hx-model-image",
								children: n ? /* @__PURE__ */ (0, _.jsx)(v, {
									src: Y(n),
									alt: "",
									width: 420,
									height: 250,
									style: pe(t.imageFrame)
								}) : /* @__PURE__ */ (0, _.jsx)(wt, { model: e })
							}),
							/* @__PURE__ */ (0, _.jsx)("strong", { children: Ei(t, "title") || e }),
							i && /* @__PURE__ */ (0, _.jsx)("span", {
								className: "hx-model-years",
								children: i
							}),
							a && /* @__PURE__ */ (0, _.jsx)("small", { children: a })
						]
					}, e);
				})
			})]
		})
	});
}
var Ai = [
	"start",
	14,
	5
], ji = {
	nordwestschweiz: [
		"end",
		-14,
		5
	],
	mittelland: [
		"end",
		-14,
		5
	],
	zuerich: [
		"middle",
		0,
		30
	]
};
function Mi({ regions: e }) {
	let { text: t } = q(), n = e.filter((e) => mi[e.slug]), [r, i] = (0, h.useState)("innerschweiz"), a = n.find((e) => e.slug === r) || n[0];
	if (!a) return null;
	let s = (e) => t(`region-${e}.intro`, t("regions.intro"));
	return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "hx-regions",
		"aria-labelledby": "hx-regions-title",
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "home-width",
			children: [/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "hx-head",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Lokal präsent – lokal aktiv")
				}), /* @__PURE__ */ (0, _.jsx)("h2", {
					id: "hx-regions-title",
					children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: "#regionen",
						children: o("Unsere Regionen")
					})
				})] }), /* @__PURE__ */ (0, _.jsxs)("a", {
					className: "hx-more",
					href: "#regionen",
					children: [
						o("Alle Regionen"),
						" ",
						/* @__PURE__ */ (0, _.jsx)("span", {
							"aria-hidden": "true",
							children: "→"
						})
					]
				})]
			}), /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "hx-regions-grid",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsxs)("svg", {
					className: "hx-map",
					viewBox: `0 0 ${pi.width} ${pi.height}`,
					role: "img",
					"aria-label": o("Schweizerkarte mit den Regionen des Swiss TR-Club"),
					children: [/* @__PURE__ */ (0, _.jsx)("path", {
						className: "hx-map-land",
						d: pi.path
					}), n.map((e) => {
						let [t, n] = mi[e.slug], [r, s, c] = ji[e.slug] ?? Ai;
						return /* @__PURE__ */ (0, _.jsxs)("g", {
							className: `hx-pin${e.slug === a.slug ? " is-active" : ""}`,
							onClick: () => i(e.slug),
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, _.jsx)("circle", {
									className: "hx-pin-halo",
									cx: t,
									cy: n,
									r: 12
								}),
								/* @__PURE__ */ (0, _.jsx)("circle", {
									className: "hx-pin-dot",
									cx: t,
									cy: n,
									r: 9
								}),
								/* @__PURE__ */ (0, _.jsx)("text", {
									x: t + s,
									y: n + c,
									textAnchor: r,
									children: o(e.name)
								})
							]
						}, e.slug);
					})]
				}), /* @__PURE__ */ (0, _.jsx)("div", {
					className: "hx-region-chips",
					role: "group",
					"aria-label": o("Region wählen"),
					children: n.map((e) => /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						"aria-pressed": e.slug === a.slug,
						onClick: () => i(e.slug),
						children: o(e.name)
					}, e.slug))
				})] }), /* @__PURE__ */ (0, _.jsxs)("article", {
					className: "hx-region-panel",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, _.jsx)(v, {
						src: de(a.slug),
						alt: "",
						width: 800,
						height: 600
					}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: o("Region")
						}),
						/* @__PURE__ */ (0, _.jsx)("h3", { children: o(a.name) }),
						s(a.slug) && /* @__PURE__ */ (0, _.jsx)("p", { children: s(a.slug) }),
						/* @__PURE__ */ (0, _.jsxs)("a", {
							className: "hx-button hx-button-line",
							href: `#regionen/${a.slug}`,
							children: [
								o("Regionalseite öffnen"),
								" ",
								/* @__PURE__ */ (0, _.jsx)("span", {
									"aria-hidden": "true",
									children: "→"
								})
							]
						})
					] })]
				})]
			})]
		})
	});
}
function Ni() {
	let { values: e } = q(), { language: t } = n(), [r, i] = (0, h.useState)([]);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_community", { operation: "teasers" }, e.signal).then((e) => {
			Array.isArray(e) && i(e);
		}).catch(() => {}), () => e.abort();
	}, []);
	let a = (e.home?.photos ?? []).filter((e) => e.url).slice(0, 6), s = r.length >= 3, c = s ? Math.min(6, r.length) : a.length;
	return c < 3 ? null : /* @__PURE__ */ (0, _.jsx)("section", {
		className: "hx-wall-section",
		"aria-labelledby": "hx-wall-title",
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "home-width",
			children: [/* @__PURE__ */ (0, _.jsx)("div", {
				className: "hx-head",
				children: /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Galerie")
				}), /* @__PURE__ */ (0, _.jsx)("h2", {
					id: "hx-wall-title",
					children: o("Momente aus dem Clubleben")
				})] })
			}), /* @__PURE__ */ (0, _.jsx)("div", {
				className: `hx-wall is-${c}`,
				children: s ? r.slice(0, 6).map((e, t) => /* @__PURE__ */ (0, _.jsxs)("figure", { children: [/* @__PURE__ */ (0, _.jsx)(v, {
					unoptimized: !0,
					src: e.url,
					alt: e.caption || o("Clubfoto"),
					width: 900,
					height: 640,
					loading: "lazy",
					style: { objectFit: "cover" }
				}), e.caption && /* @__PURE__ */ (0, _.jsx)("figcaption", {
					"aria-hidden": "true",
					children: e.caption.replace(/[.!?]+$/, "")
				})] }, e.url + t)) : a.map((e, n) => {
					let r = yi(e, t);
					return /* @__PURE__ */ (0, _.jsxs)("figure", { children: [/* @__PURE__ */ (0, _.jsx)(v, {
						src: Y(e.url),
						alt: r,
						width: 900,
						height: 640,
						loading: "lazy",
						style: pe(e.frame, "cover")
					}), r && /* @__PURE__ */ (0, _.jsx)("figcaption", {
						"aria-hidden": "true",
						children: r.replace(/[.!?]+$/, "")
					})] }, e.url + n);
				})
			})]
		})
	});
}
//#endregion
//#region app/components/Magazine.tsx
var Pi = (0, h.lazy)(() => import("./MagazineReader-Cvgx_U4k.js"));
function Fi({ issue: e, loading: t, error: r, retry: i }) {
	let { text: a } = q(), s = a("home.magazinePreviewPages", "1,3,4,12,13,18,19").split(/[^0-9]+/).map(Number).filter((e) => e > 0).slice(0, 12), { language: c } = n(), l = (e, t) => c === "fr" ? t : e, [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(0), [y, b] = (0, h.useState)(!1), x = (0, h.useRef)(null), S = (0, h.useRef)(!1), C = e?.previewPages || [], w = !!e?.cover && !C.includes(e.cover), T = [...w && e?.cover ? [e.cover] : [], ...C].slice(0, 6), E = Math.min(m, Math.max(0, T.length - 1)), D = w && E === 0 ? `${l("Titelseite", "Couverture")} · ${e?.title || ""}` : e?.previewCaptions?.[E - +!!w] || `${l("Vorschau", "Aperçu")} ${E + 1} · ${e?.title || ""}`;
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
	function O() {
		d(!1), b(!1), p(!1);
		let e = new URL(window.location.href);
		e.searchParams.delete("magazine"), window.history.replaceState(window.history.state, "", e), requestAnimationFrame(() => x.current?.focus({ preventScroll: !0 }));
	}
	let k = T[E] || e?.cover, A = T.length > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "magazine-spread-pager",
		children: [
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: E === 0,
				onClick: () => g(E - 1),
				"aria-label": l("Vorherige Vorschau", "Aperçu précédent"),
				children: "←"
			}),
			/* @__PURE__ */ (0, _.jsxs)("span", {
				"aria-live": "polite",
				children: [
					E + 1,
					" / ",
					T.length
				]
			}),
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: E === T.length - 1,
				onClick: () => g(E + 1),
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
				className: `home-preview-card home-tile-magazine${k ? " has-cover" : ""}`,
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
				children: [k ? /* @__PURE__ */ (0, _.jsx)("div", {
					className: "home-tile-cover",
					children: /* @__PURE__ */ (0, _.jsx)(v, {
						unoptimized: !0,
						src: k,
						alt: D,
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
						/* @__PURE__ */ (0, _.jsx)("p", { children: r ? l("Die Ausgabe konnte nicht geladen werden. Hier erneut versuchen.", "L’édition n’a pas pu être chargée. Réessayer ici.") : t ? l("Magazin wird geladen …", "Chargement du magazine…") : T.length ? D : e?.teaser || l("Die aktuelle Ausgabe wird hier ergänzt.", "La dernière édition sera ajoutée ici.") })
					]
				})]
			}),
			T.length > 1 && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "magazine-home-pager",
				children: A
			}),
			u && /* @__PURE__ */ (0, _.jsx)(X, {
				title: e?.title || l("Das TR-Magazin", "Le TR-Magazine"),
				close: y ? () => b(!1) : O,
				children: !f && e?.canRead && e.fileUrl && s.length ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-magazine-flip",
					children: [
						/* @__PURE__ */ (0, _.jsx)(Hn, {
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
								onClick: O,
								children: o("Schliessen")
							})]
						})
					]
				}) : f && e?.canRead ? /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
					fallback: /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: l("Leseansicht wird geladen …", "Chargement du lecteur…")
					}),
					children: /* @__PURE__ */ (0, _.jsx)(Pi, {
						url: e.fileUrl,
						title: e.title,
						initialFullscreen: !0,
						back: () => p(!1)
					})
				}) : /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-magazine-preview",
					children: [
						k && /* @__PURE__ */ (0, _.jsx)("button", {
							className: `magazine-spread-stage${y ? " is-zoomed" : ""}`,
							onClick: () => b((e) => !e),
							"aria-label": l(y ? "Verkleinern" : "Vorschau vergrössern", y ? "Réduire" : "Agrandir l’aperçu"),
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								className: "magazine-spread-image",
								src: k,
								alt: D,
								width: 1800,
								height: 1300
							})
						}),
						k && /* @__PURE__ */ (0, _.jsx)("p", { children: D }),
						A,
						/* @__PURE__ */ (0, _.jsx)("p", { children: e?.teaser || l("Die aktuelle Ausgabe wird hier ergänzt.", "La dernière édition sera ajoutée ici.") }),
						e?.canRead ? /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "home-button",
							onClick: () => p(!0),
							children: [l("Magazin lesen", "Lire le magazine"), " →"]
						}) : e && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("p", { children: l("Die vollständige Ausgabe ist für Clubmitglieder.", "L’édition complète est réservée aux membres.") }), /* @__PURE__ */ (0, _.jsxs)("a", {
							className: "home-button",
							href: e.loginUrl,
							children: [l("Anmelden & lesen", "Se connecter et consulter"), " →"]
						})] }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "home-text-link",
							onClick: O,
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
var Ii;
function Li() {
	let e = new Intl.DateTimeFormat("en", {
		timeZone: "Europe/Zurich",
		year: "numeric",
		month: "numeric",
		day: "numeric"
	}).formatToParts(/* @__PURE__ */ new Date()), t = (t) => Number(e.find((e) => e.type === t)?.value), n = Math.floor(Date.UTC(t("year"), t("month") - 1, t("day")) / 864e5);
	if (Ii?.day === n) return Ii.cycle;
	let r = 0;
	try {
		let e = JSON.parse(sessionStorage.getItem("strc_home_cycle") || "null");
		e && Number.isSafeInteger(e.cycle) && e.cycle >= 0 && Number.isSafeInteger(e.day) && (r = (e.cycle + Math.max(1, n - e.day)) % 2147483647), sessionStorage.setItem("strc_home_cycle", JSON.stringify({
			day: n,
			cycle: r
		}));
	} catch {}
	return Ii = {
		day: n,
		cycle: r
	}, r;
}
function Ri({ content: e, loading: t, error: i, retry: a, events: o, allEvents: s, eventsState: c, openNews: l, openEvent: u }) {
	let { language: d } = n(), f = (e, t) => d === "fr" ? t : e, [p] = (0, h.useState)(() => Date.now()), m = o.filter((e) => new Date(e.startAt).getTime() >= p).sort((e, t) => Date.parse(e.startAt) - Date.parse(t.startAt)).slice(0, 3), g = (e) => new Date(e).toLocaleDateString(r(), {
		day: "numeric",
		month: "long",
		year: "numeric"
	}), v = (e) => new Date(e).toLocaleDateString("de-CH", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		timeZone: "Europe/Zurich"
	}), y = {
		news: f("Clubnews", "Actualités du club"),
		event: f("Veranstaltung", "Événement"),
		forum: "Forum"
	}, b = {
		forum: f("Neues Forumsthema", "Nouveau sujet du forum"),
		reply: f("Neue Antwort im Forum", "Nouvelle réponse dans le forum"),
		gallery: f("Fotogalerie", "Galerie photos"),
		library: f("Neu in der Bibliothek", "Nouveau dans la bibliothèque"),
		market: f("Neues Inserat", "Nouvelle annonce")
	}, x = /* @__PURE__ */ (0, _.jsxs)("p", {
		className: "home-feed-state",
		role: "alert",
		children: [
			f("Die Übersicht konnte nicht geladen werden.", "La vue d’ensemble n’a pas pu être chargée."),
			" ",
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "home-text-link",
				onClick: a,
				children: f("Erneut versuchen", "Réessayer")
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
							children: f("Das Neueste", "Les dernières nouvelles")
						}),
						/* @__PURE__ */ (0, _.jsx)("h2", {
							id: "home-highlights-title",
							children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: "#neuigkeiten",
								children: f("Aktuell im Club", "Actuellement au sein du club")
							})
						}),
						i ? x : t ? /* @__PURE__ */ (0, _.jsx)("p", {
							role: "status",
							children: f("Neuigkeiten werden geladen …", "Chargement des actualités…")
						}) : e?.highlights?.items.length ? /* @__PURE__ */ (0, _.jsx)("ol", {
							className: "home-feed-list",
							children: e.highlights.items.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [(() => {
								let t = e.kind === "event" ? (s || o).find((t) => t.id === e.id) : void 0, n = e.kind === "event" && e.eventDate ? `${v(e.eventDate)} | ${e.title}` : e.title;
								return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("p", {
									className: "home-feed-meta",
									children: [y[e.kind], e.kind === "event" ? null : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [" · ", /* @__PURE__ */ (0, _.jsx)("time", {
										dateTime: e.date,
										children: g(e.date)
									})] })]
								}), /* @__PURE__ */ (0, _.jsx)("h3", { children: e.kind === "news" ? /* @__PURE__ */ (0, _.jsx)("button", {
									onClick: (t) => l(e, t.currentTarget),
									children: n
								}) : t && u ? /* @__PURE__ */ (0, _.jsx)("button", {
									onClick: () => u(t),
									children: n
								}) : /* @__PURE__ */ (0, _.jsx)("a", {
									href: e.href,
									children: n
								}) })] });
							})(), /* @__PURE__ */ (0, _.jsx)("p", { children: e.excerpt })] }, e.id))
						}) : /* @__PURE__ */ (0, _.jsx)("p", {
							className: "home-feed-state",
							children: f("Aktuell sind keine Beiträge für diese Übersicht veröffentlicht.", "Aucune publication n’est actuellement disponible dans cette sélection.")
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("section", {
					className: "home-feed-panel",
					"aria-labelledby": "home-next-events-title",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: f("Nächste Events", "Prochains événements")
						}),
						/* @__PURE__ */ (0, _.jsx)("h2", {
							id: "home-next-events-title",
							children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: "#agenda",
								children: f("Gemeinsam unterwegs", "En route ensemble")
							})
						}),
						c === "loading" ? /* @__PURE__ */ (0, _.jsx)("p", {
							role: "status",
							children: f("Veranstaltungen werden geladen …", "Chargement des événements…")
						}) : c === "error" ? /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "home-feed-state",
							role: "alert",
							children: [
								f("Veranstaltungen konnten nicht geladen werden.", "Les événements n’ont pas pu être chargés."),
								" ",
								/* @__PURE__ */ (0, _.jsx)("a", {
									href: "#agenda",
									children: f("Agenda öffnen", "Ouvrir l’agenda")
								})
							]
						}) : m.length ? /* @__PURE__ */ (0, _.jsx)("ol", {
							className: "home-feed-list home-feed-events",
							children: m.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [/* @__PURE__ */ (0, _.jsxs)("time", {
								className: "home-feed-date",
								dateTime: e.startAt,
								children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: new Date(e.startAt).toLocaleDateString(r(), { day: "2-digit" }) }), /* @__PURE__ */ (0, _.jsx)("span", { children: new Date(e.startAt).toLocaleDateString(r(), { month: "short" }) })]
							}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: u ? /* @__PURE__ */ (0, _.jsx)("button", {
								onClick: () => u(e),
								children: e.title
							}) : /* @__PURE__ */ (0, _.jsx)("a", {
								href: `#agenda/${e.id}`,
								children: e.title
							}) }), /* @__PURE__ */ (0, _.jsx)("p", { children: [e.region?.name, e.location].filter(Boolean).join(" · ") })] })] }, e.id))
						}) : /* @__PURE__ */ (0, _.jsx)("p", {
							className: "home-feed-state",
							children: f("Zurzeit sind keine kommenden Veranstaltungen veröffentlicht. Neue Termine findest du hier, sobald sie freigegeben sind.", "Aucun événement à venir n’est actuellement publié. Les nouvelles dates apparaîtront ici dès leur publication.")
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("section", {
					className: "home-feed-panel home-feed-community",
					"aria-labelledby": "home-community-title",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "eyebrow",
							children: f("Community", "Communauté")
						}),
						/* @__PURE__ */ (0, _.jsx)("h2", {
							id: "home-community-title",
							children: /* @__PURE__ */ (0, _.jsx)("a", {
								href: "#mitglieder",
								children: f("Aus dem Clubleben", "Actualités du club")
							})
						}),
						i ? x : t ? /* @__PURE__ */ (0, _.jsx)("p", {
							role: "status",
							children: f("Beiträge werden geladen …", "Chargement des publications…")
						}) : e?.memberAccess ? e.activities.length ? /* @__PURE__ */ (0, _.jsx)("ol", {
							className: "home-feed-list",
							children: e.activities.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", {
								className: "home-feed-activity",
								children: [/* @__PURE__ */ (0, _.jsx)("span", {
									className: "home-feed-avatar",
									"aria-hidden": "true",
									children: {
										gallery: "▧",
										forum: "✎",
										reply: "↩",
										library: "▤",
										market: "◇"
									}[e.kind] || "•"
								}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
									/* @__PURE__ */ (0, _.jsx)("p", {
										className: "home-feed-kind",
										children: b[e.kind]
									}),
									/* @__PURE__ */ (0, _.jsx)("h3", { children: /* @__PURE__ */ (0, _.jsx)("a", {
										href: e.href,
										children: e.title
									}) }),
									e.kind !== "gallery" && /* @__PURE__ */ (0, _.jsx)("p", {
										className: "home-feed-meta",
										children: /* @__PURE__ */ (0, _.jsx)("time", {
											dateTime: e.date,
											children: g(e.date)
										})
									})
								] })]
							}, `${e.kind}-${e.id}-${t}`))
						}) : /* @__PURE__ */ (0, _.jsx)("p", {
							className: "home-feed-state",
							children: f("Noch keine freigegebenen Community-Beiträge.", "Aucune publication de la communauté n’a encore été approuvée.")
						}) : /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "home-feed-state",
							children: [/* @__PURE__ */ (0, _.jsx)("p", { children: f("Fotos, Wissen und Geschichten unserer Mitglieder. Melde dich an, um die neuesten Beiträge zu sehen.", "Photos, connaissances et récits de nos membres. Connecte-toi pour découvrir les dernières publications.") }), /* @__PURE__ */ (0, _.jsxs)("a", {
								className: "home-button",
								href: "#club",
								children: [
									f("Zum Club", "Le club"),
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
				/* @__PURE__ */ (0, _.jsx)(Fi, {
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
var zi = (e) => new Date(e).toLocaleDateString(r(), {
	day: "numeric",
	month: "long",
	year: "numeric"
});
function Bi({ memberAccess: e, archive: t = !1, upcomingEvents: r, allEvents: i, eventsState: a = "ready", openEvent: s }) {
	let { text: c, values: l } = q(), { language: u } = n(), d = l.home?.partners ?? [], [f, p] = (0, h.useState)(null), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(0), [x, S] = (0, h.useState)(null), [w, T] = (0, h.useState)(!1), [E, D] = (0, h.useState)(""), [O] = (0, h.useState)(Li);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_homepage", {
			language: u,
			operation: t ? "list" : "overview",
			cycle: String(O)
		}, e.signal).then((e) => {
			p(e), g(""), S((t) => t && (e.news.find((e) => e.id === t.id) || e.highlights?.items.filter((e) => e.kind === "news").map((e) => ({
				...e,
				body: ""
			})).find((e) => e.id === t.id)) || null);
		}).catch((t) => {
			e.signal.aborted || g(t.message);
		}), () => e.abort();
	}, [
		y,
		e,
		u,
		t,
		O
	]);
	let k = () => {
		g(""), p(null), b((e) => e + 1);
	}, A = async () => {
		if (!(!f || w)) {
			T(!0), D("");
			try {
				let e = await C("strc_homepage", {
					page: String(f.newsPage + 1),
					language: u
				});
				p((t) => t && {
					...t,
					news: [...t.news, ...e.news.filter((e) => !t.news.some((t) => t.id === e.id))],
					newsPage: e.newsPage,
					newsPages: e.newsPages
				}), e.news[0] && requestAnimationFrame(() => document.getElementById(`home-news-${e.news[0].id}`)?.focus());
			} catch {
				D("Weitere Neuigkeiten konnten nicht geladen werden. Bitte erneut versuchen.");
			} finally {
				T(!1);
			}
		}
	}, j = (e, t) => {
		t.focus({ preventScroll: !0 }), S(e);
	}, [M] = (0, h.useState)(() => Date.now()), N = r.filter((e) => Date.parse(e.startAt) >= M).sort((e, t) => Date.parse(e.startAt) - Date.parse(t.startAt))[0];
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "home-editorial",
		children: [
			!t && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)(bi, { nextEvent: N }),
				/* @__PURE__ */ (0, _.jsx)(Si, {
					event: N,
					open: s
				}),
				/* @__PURE__ */ (0, _.jsx)(wi, { stats: f?.stats }),
				/* @__PURE__ */ (0, _.jsx)(Ti, { count: f?.stats?.youth })
			] }),
			!t && /* @__PURE__ */ (0, _.jsx)(Ri, {
				content: f,
				loading: !f && !m,
				error: !!m,
				retry: k,
				events: r,
				allEvents: i,
				eventsState: a,
				openEvent: s,
				openNews: (e, t) => j({
					...e,
					body: ""
				}, t)
			}),
			!t && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)(ki, {}),
				f?.stats?.regions && /* @__PURE__ */ (0, _.jsx)(Mi, { regions: f.stats.regions }),
				/* @__PURE__ */ (0, _.jsx)(Ni, {})
			] }),
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
						children: c("home.newsTitle")
					})] }), /* @__PURE__ */ (0, _.jsx)("p", { children: c("home.newsIntro") })]
				}), m ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "collection-state error",
					role: "alert",
					children: [o("Die Neuigkeiten konnten nicht geladen werden."), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "home-text-link",
						onClick: k,
						children: o("Erneut versuchen")
					})]
				}) : f ? f.news.length === 0 ? /* @__PURE__ */ (0, _.jsx)("div", {
					className: "home-empty",
					children: /* @__PURE__ */ (0, _.jsx)("p", { children: o("Aktuell sind noch keine Neuigkeiten veröffentlicht.") })
				}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "home-news-grid",
						children: f.news.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "home-news-card",
							children: [e.image && /* @__PURE__ */ (0, _.jsxs)("button", {
								className: "home-news-image",
								"aria-label": `${e.title} ${o("lesen")}`,
								onClick: (t) => j(e, t.currentTarget),
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
											children: zi(e.date)
										})
									}),
									/* @__PURE__ */ (0, _.jsx)("h3", { children: /* @__PURE__ */ (0, _.jsx)("button", {
										id: `home-news-${e.id}`,
										onClick: (t) => j(e, t.currentTarget),
										children: e.title
									}) }),
									/* @__PURE__ */ (0, _.jsx)("p", { children: e.excerpt }),
									/* @__PURE__ */ (0, _.jsx)("button", {
										className: "home-text-link",
										onClick: (t) => j(e, t.currentTarget),
										children: o("Weiterlesen →")
									})
								]
							})]
						}, e.id))
					}),
					E && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "alert",
						children: E
					}),
					f.newsPage < f.newsPages && /* @__PURE__ */ (0, _.jsx)("button", {
						className: "home-button home-news-more",
						onClick: A,
						disabled: w,
						children: o(w ? "Neuigkeiten werden geladen …" : f.newsPage === 1 ? "Alle Neuigkeiten anzeigen ↓" : "Weitere Neuigkeiten laden ↓")
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
						}) }), c("home.sponsorsIntro") && /* @__PURE__ */ (0, _.jsx)("p", { children: c("home.sponsorsIntro") })]
					}), /* @__PURE__ */ (0, _.jsx)("div", {
						className: `home-sponsor-logos hx-marquee${d.length > 3 ? " is-moving" : ""}`,
						children: /* @__PURE__ */ (0, _.jsx)("div", {
							className: "hx-marquee-track",
							children: (d.length > 3 ? [0, 1] : [0]).map((e) => /* @__PURE__ */ (0, _.jsx)("div", {
								className: "hx-marquee-set",
								"aria-hidden": e === 1 || void 0,
								children: d.map((t) => /* @__PURE__ */ (0, _.jsx)("a", {
									href: t.url,
									target: "_blank",
									rel: "noopener noreferrer",
									tabIndex: e === 1 ? -1 : void 0,
									"aria-label": `${t.name} – ${o("Website in neuem Tab")}`,
									children: /* @__PURE__ */ (0, _.jsx)(v, {
										src: Y(t.image),
										alt: e === 1 ? "" : t.name,
										width: 150,
										height: 90
									})
								}, t.name))
							}, e))
						})
					})]
				})
			}),
			x && /* @__PURE__ */ (0, _.jsx)(X, {
				title: x.title,
				close: () => S(null),
				children: /* @__PURE__ */ (0, _.jsxs)("article", {
					className: "home-news-detail",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("p", {
							className: "home-meta",
							children: [
								o("Clubnews ·"),
								" ",
								zi(x.date)
							]
						}),
						x.image && /* @__PURE__ */ (0, _.jsx)(v, {
							src: x.image,
							alt: "",
							width: 1200,
							height: 800
						}),
						x.bodyHtml ? /* @__PURE__ */ (0, _.jsx)(J, { html: x.bodyHtml }) : /* @__PURE__ */ (0, _.jsx)("p", { children: x.body })
					]
				})
			})
		]
	});
}
//#endregion
//#region app/page.tsx
var Vi = window.strcSettings.wordpressUrl ?? "http://localhost:8080", Hi = window.strcSettings.siteUrl ?? "http://localhost:3000", Ui = {
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
	editorial: "redaktion",
	finance: "kasse"
};
function Wi() {
	return /* @__PURE__ */ (0, _.jsx)(i, { children: /* @__PURE__ */ (0, _.jsx)(ce, { children: /* @__PURE__ */ (0, _.jsx)(F, { children: /* @__PURE__ */ (0, _.jsx)(Gi, {}) }) }) });
}
function Gi() {
	let { language: e } = n(), [t, r] = (0, h.useState)("home"), [i, a] = (0, h.useState)("#agenda"), s = (0, h.useRef)(""), l = (0, h.useRef)(!1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(!1), [y, b] = (0, h.useState)(null), [x, S] = (0, h.useState)([]), [C, w] = (0, h.useState)("loading"), [T, E] = (0, h.useState)(null), [D, O] = (0, h.useState)(""), { text: k } = q(), [A, j] = (0, h.useState)(0);
	function M() {
		w("loading"), j((e) => e + 1);
	}
	(0, h.useEffect)(() => {
		let e = () => {
			let [e, t = ""] = window.location.hash.slice(1).split("/");
			if (e === "veranstaltung") {
				let e = "strc-event-origin-" + t;
				l.current && [
					"agenda",
					"mitglieder",
					"regionen",
					""
				].includes(s.current) && sessionStorage.setItem(e, "#" + s.current);
				let n = sessionStorage.getItem(e) || "#agenda";
				a([
					"#agenda",
					"#mitglieder",
					"#regionen",
					"#"
				].includes(n) ? n : "#agenda");
			}
			s.current = e, l.current = !0, d(t), p(e === "marktplatz" ? window.location.hash : "");
			let n = Object.keys(Ui).find((t) => Ui[t] === e);
			r(!e && new URLSearchParams(window.location.search).has("member") ? "members" : n ?? "home"), E(null), window.scrollTo({
				top: 0,
				behavior: "instant"
			});
		}, t = requestAnimationFrame(e);
		return window.addEventListener("hashchange", e), () => {
			cancelAnimationFrame(t), window.removeEventListener("hashchange", e);
		};
	}, []), (0, h.useEffect)(() => {
		let e = !0;
		return fetch(`${Vi}/wp-admin/admin-ajax.php?action=strc_session`, { credentials: "include" }).then((e) => e.ok ? e.json() : Promise.reject()).then((t) => {
			e && b(t);
		}).catch(() => {
			e && b({
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
				let a = await fetch(`${Vi}/?rest_route=/strc/v1/events&view=upcoming&limit=100&page=${r}&language=${e}`, {
					cache: "no-store",
					signal: t.signal
				});
				if (!a.ok) throw Error();
				let o = await a.json();
				n.push(...o.events), i = o.pages || 1, r++;
			} while (r <= i);
			t.signal.aborted || (S(n), w("ready"));
		}
		return n().catch(() => {
			t.signal.aborted || w("error");
		}), () => t.abort();
	}, [
		A,
		t,
		e
	]);
	let N = t === "agenda" && /^\d+$/.test(u) ? x.find((e) => e.id === Number(u)) ?? null : null;
	function P(e) {
		r(e), E(null), window.location.hash = Ui[e], window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}
	function F(e) {
		O(e), window.setTimeout(() => O(""), 2600);
	}
	(0, h.useEffect)(() => {
		let e = new URL(window.location.href), t = e.searchParams.get("newsletter");
		if (!t) return;
		let n = {
			confirmed: "Newsletter-Anmeldung bestätigt. Willkommen!",
			unsubscribed: "Du wurdest vom Newsletter abgemeldet.",
			invalid: "Der Newsletter-Link ist ungültig oder wurde bereits verwendet."
		};
		n[t] && window.setTimeout(() => F(n[t]), 0), e.searchParams.delete("newsletter"), window.history.replaceState(null, "", e);
	}, []);
	let I = t === "mission" ? "club" : t === "models" ? "model-" + u : t === "regions" && u ? "region-" + u : t;
	return /* @__PURE__ */ (0, _.jsxs)("main", { children: [
		/* @__PURE__ */ (0, _.jsxs)("header", {
			className: "site-header",
			children: [/* @__PURE__ */ (0, _.jsxs)("button", {
				className: "brand brand-button",
				onClick: () => P("home"),
				"aria-label": o("Swiss TR-Club Startseite"),
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					className: "brand-logo",
					src: Y(k("global.logo")),
					width: 954,
					height: 954,
					alt: o("Swiss TR-Club Logo"),
					priority: !0
				}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: k("global.name") }), /* @__PURE__ */ (0, _.jsx)("small", { children: k("global.tagline") })] })]
			}), /* @__PURE__ */ (0, _.jsxs)("nav", {
				"aria-label": o("Hauptnavigation"),
				className: m ? "is-menu-open" : "",
				onKeyDown: (e) => {
					e.key === "Escape" && m && (g(!1), e.currentTarget.querySelector(".nav-toggle")?.focus());
				},
				children: [
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "nav-toggle",
						"aria-expanded": m,
						"aria-controls": "hauptmenu",
						onClick: () => g((e) => !e),
						children: [/* @__PURE__ */ (0, _.jsxs)("span", {
							className: "nav-toggle-icon",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, _.jsx)("i", {}),
								/* @__PURE__ */ (0, _.jsx)("i", {}),
								/* @__PURE__ */ (0, _.jsx)("i", {})
							]
						}), o(m ? "Schliessen" : "Menü")]
					}),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "nav-tabs",
						id: "hauptmenu",
						onClick: () => g(!1),
						children: [
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: t === "home" ? "active" : "",
								onClick: () => P("home"),
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
								onClick: () => P("club"),
								children: k("global.navClub")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: t === "agenda" ? "active" : "",
								onClick: () => P("agenda"),
								children: k("global.navAgenda")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: t === "regions" ? "active" : "",
								onClick: () => P("regions"),
								children: k("global.navRegions")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: ["market", "shop"].includes(t) ? "active" : "",
								onClick: () => P("market"),
								children: k("global.navMarket")
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
									"event-admin",
									"finance"
								].includes(t) ? "active" : "",
								onClick: () => P("members"),
								children: o(y?.memberAccess ? "Mitgliederbereich" : "Mitglieder-Login")
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(c, {}),
					y?.logoutUrl && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "nav-logout",
						href: y.logoutUrl,
						title: o("Abmelden"),
						"aria-label": o("Abmelden"),
						children: /* @__PURE__ */ (0, _.jsxs)("svg", {
							viewBox: "0 0 24 24",
							width: "22",
							height: "22",
							"aria-hidden": "true",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.2",
							strokeLinecap: "round",
							children: [/* @__PURE__ */ (0, _.jsx)("path", { d: "M12 3v8" }), /* @__PURE__ */ (0, _.jsx)("path", { d: "M6.3 6.8a8 8 0 1 0 11.4 0" })]
						})
					})
				]
			})]
		}),
		(y?.canEditContent || y?.authenticated) && /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "editorial-access-bar",
			children: [y.canEditContent && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("a", {
				href: "#redaktion",
				children: o("Redaktion öffnen")
			}), y.editableDocuments?.includes(I) && /* @__PURE__ */ (0, _.jsx)("a", {
				href: `#redaktion/${I}`,
				children: o("Diese Seite bearbeiten")
			})] }), y.memberAccess && !y.canEditContent && /* @__PURE__ */ (0, _.jsx)("a", {
				href: "#mitglieder",
				children: o("Mein Dashboard")
			})]
		}),
		/* @__PURE__ */ (0, _.jsx)(Jr, {
			page: t,
			subroute: u
		}),
		t === "editorial" && (y?.canEditContent ? /* @__PURE__ */ (0, _.jsx)(qt, {
			nonce: y.editorialNonce || "",
			canManageEvents: !!y.canManageEvents
		}) : /* @__PURE__ */ (0, _.jsx)(na, {
			session: y,
			navigate: P
		})),
		t === "home" && /* @__PURE__ */ (0, _.jsx)(Ki, {
			memberAccess: !!y?.memberAccess,
			navigate: P,
			events: x,
			eventsState: C,
			openEvent: E
		}),
		t === "club" && /* @__PURE__ */ (0, _.jsx)(Bt, {
			canEdit: !!y?.canEditContent,
			memberAccess: !!y?.memberAccess
		}),
		t === "mission" && /* @__PURE__ */ (0, _.jsx)(Vt, {}),
		t === "models" && /* @__PURE__ */ (0, _.jsx)(Dt, {
			selected: u,
			canEdit: !!y?.canEditContent
		}, u),
		[
			"organisation",
			"membership",
			"shop",
			"triungsters",
			"history"
		].includes(t) && /* @__PURE__ */ (0, _.jsx)(Ht, {
			documentKey: I,
			canEdit: y?.editableDocuments?.includes(I)
		}, I),
		t === "agenda" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(Ie, {
			memberAccess: !!y?.memberAccess,
			events: x,
			eventsState: C,
			retryEvents: M,
			openEvent: E
		}) }),
		t === "regions" && /* @__PURE__ */ (0, _.jsx)(ea, {
			editableDocuments: y?.editableDocuments || [],
			events: x,
			eventsState: C,
			retryEvents: M,
			openEvent: E
		}),
		t === "market" && /* @__PURE__ */ (0, _.jsx)(we, {
			section: u,
			session: y,
			notify: F
		}, f),
		t === "profile" && (y?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(ii, {}) : /* @__PURE__ */ (0, _.jsx)(na, {
			session: y,
			navigate: P
		})),
		t === "members" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(na, {
			session: y,
			navigate: P
		}) }),
		t === "registration" && /* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content",
			children: [/* @__PURE__ */ (0, _.jsx)("a", {
				href: i,
				children: o(i === "#mitglieder" ? "← Mitgliederbereich" : i === "#regionen" ? "← Regionen" : i === "#" ? "← Startseite" : "← Zur Agenda")
			}), /* @__PURE__ */ (0, _.jsx)(Cn, {
				eventId: Number(u),
				memberAccess: !!y?.memberAccess
			})]
		}),
		[
			"forum",
			"gallery",
			"library",
			"clubdocs"
		].includes(t) && (y?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(Ar, {
			kind: t === "clubdocs" ? "library" : t,
			nonce: y.communityNonce || "",
			selectedId: Number(u) || void 0,
			initialGroup: t === "clubdocs" ? "club" : "",
			section: u,
			title: t === "clubdocs" ? "Clubdokumente" : void 0
		}, `${t}:${u}`) : t === "gallery" ? /* @__PURE__ */ (0, _.jsx)(Jn, {}) : /* @__PURE__ */ (0, _.jsx)(na, {
			session: y,
			navigate: P
		})),
		t === "news" && /* @__PURE__ */ (0, _.jsx)(Bi, {
			navigate: P,
			memberAccess: !!y?.memberAccess,
			upcomingEvents: [],
			eventPreview: {
				title: "",
				text: ""
			},
			archive: !0
		}),
		t === "applications" && (y?.applicationsNonce ? /* @__PURE__ */ (0, _.jsx)(li, { nonce: y.applicationsNonce }) : /* @__PURE__ */ (0, _.jsx)(na, {
			session: y,
			navigate: P
		})),
		t === "directory" && (y?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(Ln, {}) : /* @__PURE__ */ (0, _.jsx)(na, {
			session: y,
			navigate: P
		})),
		t === "finance" && (y?.canReadFinance ? /* @__PURE__ */ (0, _.jsx)(rn, {}) : /* @__PURE__ */ (0, _.jsx)(na, {
			session: y,
			navigate: P
		})),
		t === "event-admin" && (y?.canManageEvents ? /* @__PURE__ */ (0, _.jsx)(On, {
			session: y,
			changed: M
		}) : /* @__PURE__ */ (0, _.jsx)(na, {
			session: y,
			navigate: P
		})),
		[
			"contact",
			"privacy",
			"statutes"
		].includes(t) && /* @__PURE__ */ (0, _.jsx)(ta, { page: t }, t),
		/* @__PURE__ */ (0, _.jsxs)("footer", {
			className: "site-footer",
			children: [/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "footer-brand",
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					className: "footer-logo",
					src: Y(k("global.logo")),
					width: 954,
					height: 954,
					alt: o("Swiss TR-Club Logo")
				}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
					/* @__PURE__ */ (0, _.jsx)("strong", { children: k("global.name") }),
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "footer-tagline",
						children: k("global.tagline")
					}),
					k("global.footer").replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase() !== k("global.tagline").replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase() && /* @__PURE__ */ (0, _.jsx)("p", { children: k("global.footer") })
				] })]
			}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Kontakt & Recht") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => P("contact"),
					children: o("Kontakt & Impressum")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => P("privacy"),
					children: o("Datenschutz")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => P("statutes"),
					children: o("Statuten")
				})
			] })]
		}),
		(T || N) && /* @__PURE__ */ (0, _.jsx)(ra, {
			event: T || N,
			memberAccess: !!y?.memberAccess,
			close: () => {
				E(null), N && (window.location.hash = "#agenda");
			}
		}),
		D && /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "toast",
			role: "status",
			children: ["✓ ", D]
		})
	] });
}
function Ki({ navigate: e, events: t, eventsState: n, openEvent: r, memberAccess: i }) {
	let a = t[0];
	return /* @__PURE__ */ (0, _.jsx)(Bi, {
		eventPreview: n === "loading" ? {
			title: o("Termine werden geladen …"),
			text: o("Die nächsten Treffen findest du hier.")
		} : n === "error" ? {
			title: o("Agenda derzeit nicht erreichbar"),
			text: o("Bitte versuche es in der Terminübersicht erneut.")
		} : a ? {
			title: a.title,
			text: `${Yi(a.startAt)} · ${a.location || Xi(a)}`
		} : {
			title: o("Das nächste Wiedersehen"),
			text: o("Aktuell sind noch keine kommenden Termine veröffentlicht. Die Regionen ergänzen ihre Treffen hier.")
		},
		upcomingEvents: t.slice(0, 5),
		allEvents: t,
		eventsState: n,
		openEvent: r,
		memberAccess: i,
		navigate: e
	});
}
function qi({ eyebrow: e, title: t, text: n, landscape: r }) {
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: `page-hero${r ? " regional-hero" : ""}`,
		style: r ? {
			backgroundImage: `linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${de(r)}")`,
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
function Ji(e) {
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
function Yi(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? o("Wird bekanntgegeben") : new Intl.DateTimeFormat(r(), {
		dateStyle: "long",
		timeStyle: "short"
	}).format(t);
}
function Xi(e) {
	return o(e.region?.name || e.scope?.name || e.eventType?.name || "Swiss TR-Club");
}
function Zi(e) {
	return o({
		information: "Keine Anmeldung erforderlich",
		scheduled: "Anmeldung öffnet später",
		open: "Anmeldung offen",
		closed: "Anmeldung geschlossen",
		full: "Ausgebucht",
		waiting: "Warteliste offen"
	}[e]);
}
function Qi({ state: e, count: t, retry: n }) {
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
function $i({ event: e, open: t }) {
	let n = Ji(e.startAt);
	return /* @__PURE__ */ (0, _.jsxs)("article", {
		className: "event-card",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "event-date",
				children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: n.day }), /* @__PURE__ */ (0, _.jsx)("span", { children: n.month })]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("p", { children: Xi(e) }),
				/* @__PURE__ */ (0, _.jsx)("h3", { children: e.title }),
				/* @__PURE__ */ (0, _.jsxs)("span", { children: [
					e.location || e.eventType?.name,
					" · ",
					Zi(e.registrationStatus)
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
function ea({ events: e, eventsState: t, retryEvents: n, openEvent: r, editableDocuments: i }) {
	let { text: a, values: s } = q(), [c, l] = (0, h.useState)([]), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)("loading"), [m, g] = (0, h.useState)(0);
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
			n = r, fetch(`${Vi}/?rest_route=/strc/v1/regions`, {
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
		/* @__PURE__ */ (0, _.jsx)(qi, {
			eyebrow: o("Lokal präsent – lokal aktiv"),
			title: v ? `${o("Region")} ${o(v.name)}` : a("regions.title"),
			text: v ? a(`region-${v.slug}.intro`, a("regions.intro")) : a("regions.intro"),
			landscape: v?.slug
		}),
		!u && /* @__PURE__ */ (0, _.jsx)(he, { documentKey: "regions" }),
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
				f === "ready" && u === "triungsters" && /* @__PURE__ */ (0, _.jsx)(Ht, {
					documentKey: "triungsters",
					canEdit: i.includes("triungsters")
				}, "triungsters-region"),
				f === "ready" && u !== "triungsters" && (v ? /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(ht, {
					documentKey: "region-" + v.slug,
					values: s["region-" + v.slug] || { body: v.description },
					canEdit: i.includes("region-" + v.slug),
					eventCount: t === "ready" ? y.length : void 0,
					events: /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(Qi, {
						state: t,
						count: y.length,
						retry: n
					}), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "events",
						children: y.map((e) => /* @__PURE__ */ (0, _.jsx)($i, {
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
							style: fe(e.slug),
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
function ta({ page: e }) {
	let { text: t, error: n, refresh: r } = q();
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(qi, {
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
			}) : t(`${e}.body`) ? /* @__PURE__ */ (0, _.jsx)(ue, { id: `${e}.body` }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Dieser Inhalt wurde noch nicht veröffentlicht.") })
		}), e === "contact" && /* @__PURE__ */ (0, _.jsx)(Xr, {})]
	})] });
}
function na({ session: e, navigate: t }) {
	let { text: n } = q();
	if (e === null) return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content",
		children: /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Mitgliederzugang wird geprüft …")
		})
	});
	if (!e.memberAccess) return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(qi, {
		eyebrow: o("Geschützter Bereich"),
		title: n("members.title"),
		text: n("members.intro")
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "login-panel",
		children: [/* @__PURE__ */ (0, _.jsxs)("form", {
			method: "post",
			action: `${Vi}/wp-login.php`,
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
					value: `${Hi}/${window.location.hash || "#mitglieder"}`
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "submit",
					children: o("Sicher anmelden →")
				}),
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: `${Vi}/wp-login.php?action=lostpassword`,
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
	}), e.canReadFinance && r.push({
		url: "#kasse",
		label: "Kasse",
		icon: "₣"
	}), e.formsInboxUrl && r.push({
		url: "#antraege",
		label: "Anträge & Anfragen",
		icon: "✎"
	}), /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content dashboard-introduction",
		children: /* @__PURE__ */ (0, _.jsx)(ue, { id: "members.dashboardIntro" })
	}), /* @__PURE__ */ (0, _.jsx)(qn, {
		extraTools: r,
		logoutUrl: e.logoutUrl || ""
	})] });
}
function ra({ event: e, close: t, memberAccess: n }) {
	return /* @__PURE__ */ (0, _.jsx)(X, {
		title: e.title,
		close: t,
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "event-details",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "eyebrow",
					children: [
						Xi(e),
						" · ",
						e.eventType?.name
					]
				}),
				e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(J, { html: e.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", { children: e.description || e.summary }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "detail-box",
					children: [
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Beginn") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.startAt ? Yi(e.startAt) : "Wird bekanntgegeben" }),
						e.endAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Ende") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: Yi(e.endAt) })] }),
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Ort") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.location || o("Wird bekanntgegeben") }),
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: Zi(e.registrationStatus) }),
						e.registrationOpenAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung ab") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: Yi(e.registrationOpenAt) })] }),
						e.registrationCloseAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung bis") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: Yi(e.registrationCloseAt) })] })
					]
				}),
				e.registrationRequired && (e.externalRegistrationUrl ? /* @__PURE__ */ (0, _.jsx)("a", {
					className: "market-primary",
					href: e.externalRegistrationUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: o("Extern anmelden (neuer Tab) →")
				}) : /* @__PURE__ */ (0, _.jsx)(Cn, {
					eventId: e.id,
					memberAccess: n,
					hideTitle: !0
				})),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "event-dialog-dismiss",
					children: /* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						onClick: t,
						children: o(e.registrationRequired && !e.externalRegistrationUrl ? "Fenster schliessen (ohne Anmeldung)" : "Schliessen")
					})
				})
			]
		})
	});
}
//#endregion
//#region wordpress/main.tsx
var ia = document.getElementById("strc-app");
ia && (0, g.createRoot)(ia).render(/* @__PURE__ */ (0, _.jsx)(Wi, {}));
//#endregion
