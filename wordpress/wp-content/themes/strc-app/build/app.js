import { n as e, t } from "./chunk-C_CI6nMA.js";
import { a as n, i as r, n as i, o as a, r as o, s, t as c } from "./UILanguage-XWG8yXrM.js";
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
			t !== null && ee(x, t.startTime - e);
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
								u !== null && ee(x, u.startTime - t), i = !1;
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
	function ee(t, n) {
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, ee(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
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
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), A = Symbol.for("react.memo_cache_sentinel"), ee = Symbol.iterator;
	function te(e) {
		return typeof e != "object" || !e ? null : (e = ee && e[ee] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ne = Symbol.for("react.client.reference");
	function j(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ne ? null : e.displayName || e.name || null;
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
			case D: return t = e.displayName || null, t === null ? j(e.type) || "Memo" : t;
			case O:
				t = e._payload, e = e._init;
				try {
					return j(e(t));
				} catch {}
		}
		return null;
	}
	var M = Array.isArray, N = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, re = [], I = -1;
	function L(e) {
		return { current: e };
	}
	function R(e) {
		0 > I || (e.current = re[I], re[I] = null, I--);
	}
	function z(e, t) {
		I++, re[I] = e.current, e.current = t;
	}
	var B = L(null), ie = L(null), V = L(null), ae = L(null);
	function oe(e, t) {
		switch (z(V, t), z(ie, e), z(B, null), t.nodeType) {
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
		R(B), z(B, e);
	}
	function H() {
		R(B), R(ie), R(V);
	}
	function U(e) {
		e.memoizedState !== null && z(ae, e);
		var t = B.current, n = Hd(t, e.type);
		t !== n && (z(ie, e), z(B, n));
	}
	function se(e) {
		ie.current === e && (R(B), R(ie)), ae.current === e && (R(ae), Qf._currentValue = F);
	}
	var ce, le;
	function ue(e) {
		if (ce === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ce = t && t[1] || "", le = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ce + e + le;
	}
	var de = !1;
	function fe(e, t) {
		if (!e || de) return "";
		de = !0;
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
			de = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? ue(n) : "";
	}
	function pe(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return ue(e.type);
			case 16: return ue("Lazy");
			case 13: return e.child !== t && t !== null ? ue("Suspense Fallback") : ue("Suspense");
			case 19: return ue("SuspenseList");
			case 0:
			case 15: return fe(e.type, !1);
			case 11: return fe(e.type.render, !1);
			case 1: return fe(e.type, !0);
			case 31: return ue("Activity");
			default: return "";
		}
	}
	function me(e) {
		try {
			var t = "", n = null;
			do
				t += pe(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var he = Object.prototype.hasOwnProperty, ge = t.unstable_scheduleCallback, _e = t.unstable_cancelCallback, ve = t.unstable_shouldYield, ye = t.unstable_requestPaint, be = t.unstable_now, xe = t.unstable_getCurrentPriorityLevel, Se = t.unstable_ImmediatePriority, Ce = t.unstable_UserBlockingPriority, we = t.unstable_NormalPriority, Te = t.unstable_LowPriority, Ee = t.unstable_IdlePriority, De = t.log, Oe = t.unstable_setDisableYieldValue, ke = null, W = null;
	function Ae(e) {
		if (typeof De == "function" && Oe(e), W && typeof W.setStrictMode == "function") try {
			W.setStrictMode(ke, e);
		} catch {}
	}
	var je = Math.clz32 ? Math.clz32 : Pe, Me = Math.log, Ne = Math.LN2;
	function Pe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Me(e) / Ne | 0) | 0;
	}
	var Fe = 256, Ie = 262144, Le = 4194304;
	function Re(e) {
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
	function ze(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Re(n))) : i = Re(o) : i = Re(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Re(n))) : i = Re(o)) : i = Re(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Be(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ve(e, t) {
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
	function He() {
		var e = Le;
		return Le <<= 1, !(Le & 62914560) && (Le = 4194304), e;
	}
	function Ue(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function We(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Ge(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - je(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && Ke(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function Ke(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - je(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function qe(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - je(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Je(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Ye(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Ye(e) {
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
	function Xe(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Ze() {
		var e = P.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function Qe(e, t) {
		var n = P.p;
		try {
			return P.p = e, t();
		} finally {
			P.p = n;
		}
	}
	var G = Math.random().toString(36).slice(2), $e = "__reactFiber$" + G, et = "__reactProps$" + G, tt = "__reactContainer$" + G, nt = "__reactEvents$" + G, rt = "__reactListeners$" + G, it = "__reactHandles$" + G, at = "__reactResources$" + G, ot = "__reactMarker$" + G;
	function st(e) {
		delete e[$e], delete e[et], delete e[nt], delete e[rt], delete e[it];
	}
	function ct(e) {
		var t = e[$e];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[tt] || n[$e]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[$e]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function lt(e) {
		if (e = e[$e] || e[tt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ut(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function dt(e) {
		var t = e[at];
		return t ||= e[at] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function ft(e) {
		e[ot] = !0;
	}
	var pt = /* @__PURE__ */ new Set(), mt = {};
	function ht(e, t) {
		gt(e, t), gt(e + "Capture", t);
	}
	function gt(e, t) {
		for (mt[e] = t, e = 0; e < t.length; e++) pt.add(t[e]);
	}
	var _t = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), vt = {}, yt = {};
	function bt(e) {
		return he.call(yt, e) ? !0 : he.call(vt, e) ? !1 : _t.test(e) ? yt[e] = !0 : (vt[e] = !0, !1);
	}
	function xt(e, t, n) {
		if (bt(t)) if (n === null) e.removeAttribute(t);
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
	function St(e, t, n) {
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
	function Ct(e, t, n, r) {
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
	function wt(e) {
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
	function Tt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Et(e, t, n) {
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
	function Dt(e) {
		if (!e._valueTracker) {
			var t = Tt(e) ? "checked" : "value";
			e._valueTracker = Et(e, t, "" + e[t]);
		}
	}
	function Ot(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Tt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function kt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var At = /[\n"\\]/g;
	function jt(e) {
		return e.replace(At, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Mt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + wt(t)) : e.value !== "" + wt(t) && (e.value = "" + wt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Pt(e, o, wt(n)) : Pt(e, o, wt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + wt(s) : e.removeAttribute("name");
	}
	function Nt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Dt(e);
				return;
			}
			n = n == null ? "" : "" + wt(n), t = t == null ? n : "" + wt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Dt(e);
	}
	function Pt(e, t, n) {
		t === "number" && kt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Ft(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + wt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function It(e, t, n) {
		if (t != null && (t = "" + wt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + wt(n);
	}
	function Lt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (M(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = wt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Dt(e);
	}
	function Rt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var zt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Bt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || zt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Vt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Bt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Bt(e, o, t[o]);
	}
	function Ht(e) {
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
	var Ut = new Map([
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
	]), Wt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Gt(e) {
		return Wt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Kt() {}
	var qt = null;
	function Jt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Yt = null, Xt = null;
	function Zt(e) {
		var t = lt(e);
		if (t && (e = t.stateNode)) {
			var n = e[et] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Mt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + jt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[et] || null;
								if (!a) throw Error(i(90));
								Mt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Ot(r);
					}
					break a;
				case "textarea":
					It(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Ft(e, !!n.multiple, t, !1);
			}
		}
	}
	var Qt = !1;
	function $t(e, t, n) {
		if (Qt) return e(t, n);
		Qt = !0;
		try {
			return e(t);
		} finally {
			if (Qt = !1, (Yt !== null || Xt !== null) && (yu(), Yt && (t = Yt, e = Xt, Xt = Yt = null, Zt(t), e))) for (t = 0; t < e.length; t++) Zt(e[t]);
		}
	}
	function en(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[et] || null;
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
	var tn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), nn = !1;
	if (tn) try {
		var rn = {};
		Object.defineProperty(rn, "passive", { get: function() {
			nn = !0;
		} }), window.addEventListener("test", rn, rn), window.removeEventListener("test", rn, rn);
	} catch {
		nn = !1;
	}
	var an = null, on = null, sn = null;
	function cn() {
		if (sn) return sn;
		var e, t = on, n = t.length, r, i = "value" in an ? an.value : an.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return sn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function ln(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function un() {
		return !0;
	}
	function dn() {
		return !1;
	}
	function fn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? un : dn, this.isPropagationStopped = dn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = un);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = un);
			},
			persist: function() {},
			isPersistent: un
		}), t;
	}
	var pn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, mn = fn(pn), hn = h({}, pn, {
		view: 0,
		detail: 0
	}), gn = fn(hn), _n, vn, yn, bn = h({}, hn, {
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
		getModifierState: jn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== yn && (yn && e.type === "mousemove" ? (_n = e.screenX - yn.screenX, vn = e.screenY - yn.screenY) : vn = _n = 0, yn = e), _n);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : vn;
		}
	}), xn = fn(bn), Sn = fn(h({}, bn, { dataTransfer: 0 })), Cn = fn(h({}, hn, { relatedTarget: 0 })), wn = fn(h({}, pn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Tn = fn(h({}, pn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), En = fn(h({}, pn, { data: 0 })), Dn = {
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
	}, On = {
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
	}, kn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function An(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = kn[e]) ? !!t[e] : !1;
	}
	function jn() {
		return An;
	}
	var Mn = fn(h({}, hn, {
		key: function(e) {
			if (e.key) {
				var t = Dn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = ln(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? On[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: jn,
		charCode: function(e) {
			return e.type === "keypress" ? ln(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? ln(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Nn = fn(h({}, bn, {
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
	})), Pn = fn(h({}, hn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: jn
	})), Fn = fn(h({}, pn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), In = fn(h({}, bn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Ln = fn(h({}, pn, {
		newState: 0,
		oldState: 0
	})), Rn = [
		9,
		13,
		27,
		32
	], zn = tn && "CompositionEvent" in window, Bn = null;
	tn && "documentMode" in document && (Bn = document.documentMode);
	var Vn = tn && "TextEvent" in window && !Bn, Hn = tn && (!zn || Bn && 8 < Bn && 11 >= Bn), Un = " ", Wn = !1;
	function Gn(e, t) {
		switch (e) {
			case "keyup": return Rn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Kn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var qn = !1;
	function Jn(e, t) {
		switch (e) {
			case "compositionend": return Kn(t);
			case "keypress": return t.which === 32 ? (Wn = !0, Un) : null;
			case "textInput": return e = t.data, e === Un && Wn ? null : e;
			default: return null;
		}
	}
	function Yn(e, t) {
		if (qn) return e === "compositionend" || !zn && Gn(e, t) ? (e = cn(), sn = on = an = null, qn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Hn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Xn = {
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
	function Zn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Xn[e.type] : t === "textarea";
	}
	function Qn(e, t, n, r) {
		Yt ? Xt ? Xt.push(r) : Xt = [r] : Yt = r, t = Td(t, "onChange"), 0 < t.length && (n = new mn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var $n = null, er = null;
	function tr(e) {
		vd(e, 0);
	}
	function nr(e) {
		if (Ot(ut(e))) return e;
	}
	function rr(e, t) {
		if (e === "change") return t;
	}
	var ir = !1;
	if (tn) {
		var ar;
		if (tn) {
			var or = "oninput" in document;
			if (!or) {
				var sr = document.createElement("div");
				sr.setAttribute("oninput", "return;"), or = typeof sr.oninput == "function";
			}
			ar = or;
		} else ar = !1;
		ir = ar && (!document.documentMode || 9 < document.documentMode);
	}
	function cr() {
		$n && ($n.detachEvent("onpropertychange", lr), er = $n = null);
	}
	function lr(e) {
		if (e.propertyName === "value" && nr(er)) {
			var t = [];
			Qn(t, er, e, Jt(e)), $t(tr, t);
		}
	}
	function ur(e, t, n) {
		e === "focusin" ? (cr(), $n = t, er = n, $n.attachEvent("onpropertychange", lr)) : e === "focusout" && cr();
	}
	function dr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return nr(er);
	}
	function fr(e, t) {
		if (e === "click") return nr(t);
	}
	function pr(e, t) {
		if (e === "input" || e === "change") return nr(t);
	}
	function mr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var hr = typeof Object.is == "function" ? Object.is : mr;
	function gr(e, t) {
		if (hr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!he.call(t, i) || !hr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function _r(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function vr(e, t) {
		var n = _r(e);
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
			n = _r(n);
		}
	}
	function yr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? yr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function br(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = kt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = kt(e.document);
		}
		return t;
	}
	function xr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Sr = tn && "documentMode" in document && 11 >= document.documentMode, Cr = null, wr = null, Tr = null, Er = !1;
	function Dr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Er || Cr == null || Cr !== kt(r) || (r = Cr, "selectionStart" in r && xr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Tr && gr(Tr, r) || (Tr = r, r = Td(wr, "onSelect"), 0 < r.length && (t = new mn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Cr)));
	}
	function Or(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var kr = {
		animationend: Or("Animation", "AnimationEnd"),
		animationiteration: Or("Animation", "AnimationIteration"),
		animationstart: Or("Animation", "AnimationStart"),
		transitionrun: Or("Transition", "TransitionRun"),
		transitionstart: Or("Transition", "TransitionStart"),
		transitioncancel: Or("Transition", "TransitionCancel"),
		transitionend: Or("Transition", "TransitionEnd")
	}, Ar = {}, jr = {};
	tn && (jr = document.createElement("div").style, "AnimationEvent" in window || (delete kr.animationend.animation, delete kr.animationiteration.animation, delete kr.animationstart.animation), "TransitionEvent" in window || delete kr.transitionend.transition);
	function Mr(e) {
		if (Ar[e]) return Ar[e];
		if (!kr[e]) return e;
		var t = kr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in jr) return Ar[e] = t[n];
		return e;
	}
	var Nr = Mr("animationend"), Pr = Mr("animationiteration"), Fr = Mr("animationstart"), Ir = Mr("transitionrun"), Lr = Mr("transitionstart"), Rr = Mr("transitioncancel"), zr = Mr("transitionend"), Br = /* @__PURE__ */ new Map(), Vr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Vr.push("scrollEnd");
	function Hr(e, t) {
		Br.set(e, t), ht(t, [e]);
	}
	var Ur = typeof reportError == "function" ? reportError : function(e) {
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
	}, Wr = [], Gr = 0, Kr = 0;
	function qr() {
		for (var e = Gr, t = Kr = Gr = 0; t < e;) {
			var n = Wr[t];
			Wr[t++] = null;
			var r = Wr[t];
			Wr[t++] = null;
			var i = Wr[t];
			Wr[t++] = null;
			var a = Wr[t];
			if (Wr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Zr(n, i, a);
		}
	}
	function Jr(e, t, n, r) {
		Wr[Gr++] = e, Wr[Gr++] = t, Wr[Gr++] = n, Wr[Gr++] = r, Kr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Yr(e, t, n, r) {
		return Jr(e, t, n, r), Qr(e);
	}
	function Xr(e, t) {
		return Jr(e, null, null, t), Qr(e);
	}
	function Zr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - je(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Qr(e) {
		if (50 < uu) throw uu = 0, du = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var $r = {};
	function ei(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ti(e, t, n, r) {
		return new ei(e, t, n, r);
	}
	function ni(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ri(e, t) {
		var n = e.alternate;
		return n === null ? (n = ti(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ii(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ai(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ni(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, B.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case k: return e = ti(31, n, t, a), e.elementType = k, e.lanes = o, e;
			case y: return oi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = ti(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = ti(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = ti(19, n, t, a), e.elementType = E, e.lanes = o, e;
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
		return t = ti(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function oi(e, t, n, r) {
		return e = ti(7, e, r, t), e.lanes = n, e;
	}
	function si(e, t, n) {
		return e = ti(6, e, null, t), e.lanes = n, e;
	}
	function ci(e) {
		var t = ti(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function li(e, t, n) {
		return t = ti(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ui = /* @__PURE__ */ new WeakMap();
	function di(e, t) {
		if (typeof e == "object" && e) {
			var n = ui.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: me(t)
			}, ui.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: me(t)
		};
	}
	var fi = [], pi = 0, mi = null, hi = 0, gi = [], _i = 0, vi = null, yi = 1, bi = "";
	function xi(e, t) {
		fi[pi++] = hi, fi[pi++] = mi, mi = e, hi = t;
	}
	function Si(e, t, n) {
		gi[_i++] = yi, gi[_i++] = bi, gi[_i++] = vi, vi = e;
		var r = yi;
		e = bi;
		var i = 32 - je(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - je(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, yi = 1 << 32 - je(t) + i | n << i | r, bi = a + e;
		} else yi = 1 << a | n << i | r, bi = e;
	}
	function Ci(e) {
		e.return !== null && (xi(e, 1), Si(e, 1, 0));
	}
	function wi(e) {
		for (; e === mi;) mi = fi[--pi], fi[pi] = null, hi = fi[--pi], fi[pi] = null;
		for (; e === vi;) vi = gi[--_i], gi[_i] = null, bi = gi[--_i], gi[_i] = null, yi = gi[--_i], gi[_i] = null;
	}
	function Ti(e, t) {
		gi[_i++] = yi, gi[_i++] = bi, gi[_i++] = vi, yi = t.id, bi = t.overflow, vi = e;
	}
	var Ei = null, Di = null, K = !1, Oi = null, ki = !1, Ai = Error(i(519));
	function ji(e) {
		throw Li(di(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ai;
	}
	function Mi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[$e] = e, t[et] = r, n) {
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
				$("invalid", t), Nt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), Lt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = Kt), t = !0) : t = !1, t || ji(e, !0);
	}
	function Ni(e) {
		for (Ei = e.return; Ei;) switch (Ei.tag) {
			case 5:
			case 31:
			case 13:
				ki = !1;
				return;
			case 27:
			case 3:
				ki = !0;
				return;
			default: Ei = Ei.return;
		}
	}
	function Pi(e) {
		if (e !== Ei) return !1;
		if (!K) return Ni(e), K = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && Di && ji(e), Ni(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Di = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Di = uf(e);
		} else t === 27 ? (t = Di, Zd(e.type) ? (e = lf, lf = null, Di = e) : Di = t) : Di = Ei ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Fi() {
		Di = Ei = null, K = !1;
	}
	function Ii() {
		var e = Oi;
		return e !== null && (Xl === null ? Xl = e : Xl.push.apply(Xl, e), Oi = null), e;
	}
	function Li(e) {
		Oi === null ? Oi = [e] : Oi.push(e);
	}
	var Ri = L(null), zi = null, Bi = null;
	function Vi(e, t, n) {
		z(Ri, t._currentValue), t._currentValue = n;
	}
	function Hi(e) {
		e._currentValue = Ri.current, R(Ri);
	}
	function Ui(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Wi(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ui(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ui(s, n, e), s = null;
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
	function Gi(e, t, n, r) {
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
					hr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ae.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Wi(t, e, n, r), t.flags |= 262144;
	}
	function Ki(e) {
		for (e = e.firstContext; e !== null;) {
			if (!hr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function qi(e) {
		zi = e, Bi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Ji(e) {
		return Xi(zi, e);
	}
	function Yi(e, t) {
		return zi === null && qi(e), Xi(e, t);
	}
	function Xi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Bi === null) {
			if (e === null) throw Error(i(308));
			Bi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Bi = Bi.next = t;
		return n;
	}
	var Zi = typeof AbortController < "u" ? AbortController : function() {
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
	}, Qi = t.unstable_scheduleCallback, $i = t.unstable_NormalPriority, ea = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ta() {
		return {
			controller: new Zi(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function na(e) {
		e.refCount--, e.refCount === 0 && Qi($i, function() {
			e.controller.abort();
		});
	}
	var ra = null, ia = 0, aa = 0, oa = null;
	function sa(e, t) {
		if (ra === null) {
			var n = ra = [];
			ia = 0, aa = ud(), oa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ia++, t.then(ca, ca), t;
	}
	function ca() {
		if (--ia === 0 && ra !== null) {
			oa !== null && (oa.status = "fulfilled");
			var e = ra;
			ra = null, aa = 0, oa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function la(e, t) {
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
	var ua = N.S;
	N.S = function(e, t) {
		$l = be(), typeof t == "object" && t && typeof t.then == "function" && sa(e, t), ua !== null && ua(e, t);
	};
	var da = L(null);
	function fa() {
		var e = da.current;
		return e === null ? Ll.pooledCache : e;
	}
	function pa(e, t) {
		t === null ? z(da, da.current) : z(da, t.pool);
	}
	function ma() {
		var e = fa();
		return e === null ? null : {
			parent: ea._currentValue,
			pool: e
		};
	}
	var ha = Error(i(460)), ga = Error(i(474)), _a = Error(i(542)), va = { then: function() {} };
	function ya(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ba(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Kt, Kt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, wa(e), e;
			default:
				if (typeof t.status == "string") t.then(Kt, Kt);
				else {
					if (e = Ll, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, wa(e), e;
				}
				throw Sa = t, ha;
		}
	}
	function xa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Sa = e, ha) : e;
		}
	}
	var Sa = null;
	function Ca() {
		if (Sa === null) throw Error(i(459));
		var e = Sa;
		return Sa = null, e;
	}
	function wa(e) {
		if (e === ha || e === _a) throw Error(i(483));
	}
	var Ta = null, Ea = 0;
	function Da(e) {
		var t = Ea;
		return Ea += 1, Ta === null && (Ta = []), ba(Ta, e, t);
	}
	function Oa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function ka(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Aa(e) {
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
			return e = ri(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = si(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === O && xa(i) === t.type) ? (t = a(t, n.props), Oa(t, n), t.return = e, t) : (t = ai(n.type, n.key, n.props, null, e.mode, r), Oa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = li(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = oi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = si("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = ai(t.type, t.key, t.props, null, e.mode, n), Oa(n, t), n.return = e, n;
					case v: return t = li(t, e.mode, n), t.return = e, t;
					case O: return t = xa(t), f(e, t, n);
				}
				if (M(t) || te(t)) return t = oi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Da(t), n);
				if (t.$$typeof === C) return f(e, Yi(e, t), n);
				ka(e, t);
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
					case O: return n = xa(n), p(e, t, n, r);
				}
				if (M(n) || te(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Da(n), r);
				if (n.$$typeof === C) return p(e, t, Yi(e, n), r);
				ka(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case O: return r = xa(r), m(e, t, n, r, i);
				}
				if (M(r) || te(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Da(r), i);
				if (r.$$typeof === C) return m(e, t, n, Yi(t, r), i);
				ka(t, r);
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
			if (h === s.length) return n(i, d), K && xi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return K && xi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), K && xi(i, h), l;
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
			if (v.done) return n(a, h), K && xi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return K && xi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), K && xi(a, g), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === O && xa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Oa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = oi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ai(o.type, o.key, o.props, null, e.mode, c), Oa(c, o), c.return = e, e = c);
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
							c = li(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case O: return o = xa(o), b(e, r, o, c);
				}
				if (M(o)) return h(e, r, o, c);
				if (te(o)) {
					if (l = te(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Da(o), c);
				if (o.$$typeof === C) return b(e, r, Yi(e, o), c);
				ka(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = si(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ea = 0;
				var i = b(e, t, n, r);
				return Ta = null, i;
			} catch (t) {
				if (t === ha || t === _a) throw t;
				var a = ti(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ja = Aa(!0), Ma = Aa(!1), Na = !1;
	function Pa(e) {
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
	function Fa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ia(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function La(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, J & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Qr(e), Zr(e, null, n), t;
		}
		return Jr(e, r, t, n), Qr(e);
	}
	function Ra(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, qe(e, n);
		}
	}
	function za(e, t) {
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
	var Ba = !1;
	function Va() {
		if (Ba) {
			var e = oa;
			if (e !== null) throw e;
		}
	}
	function Ha(e, t, n, r) {
		Ba = !1;
		var i = e.updateQueue;
		Na = !1;
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
				if (p ? (X & f) === f : (r & f) === f) {
					f !== 0 && f === aa && (Ba = !0), u !== null && (u = u.next = {
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
							case 2: Na = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Wl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ua(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Wa(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ua(n[e], t);
	}
	var Ga = L(null), Ka = L(0);
	function qa(e, t) {
		e = Hl, z(Ka, e), z(Ga, t), Hl = e | t.baseLanes;
	}
	function Ja() {
		z(Ka, Hl), z(Ga, Ga.current);
	}
	function Ya() {
		Hl = Ka.current, R(Ga), R(Ka);
	}
	var Xa = L(null), Za = null;
	function Qa(e) {
		var t = e.alternate;
		z(ro, ro.current & 1), z(Xa, e), Za === null && (t === null || Ga.current !== null || t.memoizedState !== null) && (Za = e);
	}
	function $a(e) {
		z(ro, ro.current), z(Xa, e), Za === null && (Za = e);
	}
	function eo(e) {
		e.tag === 22 ? (z(ro, ro.current), z(Xa, e), Za === null && (Za = e)) : to(e);
	}
	function to() {
		z(ro, ro.current), z(Xa, Xa.current);
	}
	function no(e) {
		R(Xa), Za === e && (Za = null), R(ro);
	}
	var ro = L(0);
	function io(e) {
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
	var ao = 0, q = null, oo = null, so = null, co = !1, lo = !1, uo = !1, fo = 0, po = 0, mo = null, ho = 0;
	function go() {
		throw Error(i(321));
	}
	function _o(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!hr(e[n], t[n])) return !1;
		return !0;
	}
	function vo(e, t, n, r, i, a) {
		return ao = a, q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, N.H = e === null || e.memoizedState === null ? Fs : Is, uo = !1, a = n(r, i), uo = !1, lo && (a = bo(t, n, r, i)), yo(e), a;
	}
	function yo(e) {
		N.H = Ps;
		var t = oo !== null && oo.next !== null;
		if (ao = 0, so = oo = q = null, co = !1, po = 0, mo = null, t) throw Error(i(300));
		e === null || $s || (e = e.dependencies, e !== null && Ki(e) && ($s = !0));
	}
	function bo(e, t, n, r) {
		q = e;
		var a = 0;
		do {
			if (lo && (mo = null), po = 0, lo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, so = oo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			N.H = Ls, o = t(n, r);
		} while (lo);
		return o;
	}
	function xo() {
		var e = N.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Oo(t) : t, e = e.useState()[0], (oo === null ? null : oo.memoizedState) !== e && (q.flags |= 1024), t;
	}
	function So() {
		var e = fo !== 0;
		return fo = 0, e;
	}
	function Co(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function wo(e) {
		if (co) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			co = !1;
		}
		ao = 0, so = oo = q = null, lo = !1, po = fo = 0, mo = null;
	}
	function To() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return so === null ? q.memoizedState = so = e : so = so.next = e, so;
	}
	function Eo() {
		if (oo === null) {
			var e = q.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = oo.next;
		var t = so === null ? q.memoizedState : so.next;
		if (t !== null) so = t, oo = e;
		else {
			if (e === null) throw q.alternate === null ? Error(i(467)) : Error(i(310));
			oo = e, e = {
				memoizedState: oo.memoizedState,
				baseState: oo.baseState,
				baseQueue: oo.baseQueue,
				queue: oo.queue,
				next: null
			}, so === null ? q.memoizedState = so = e : so = so.next = e;
		}
		return so;
	}
	function Do() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Oo(e) {
		var t = po;
		return po += 1, mo === null && (mo = []), e = ba(mo, e, t), t = q, (so === null ? t.memoizedState : so.next) === null && (t = t.alternate, N.H = t === null || t.memoizedState === null ? Fs : Is), e;
	}
	function ko(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Oo(e);
			if (e.$$typeof === C) return Ji(e);
		}
		throw Error(i(438, String(e)));
	}
	function Ao(e) {
		var t = null, n = q.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = q.alternate;
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
		}, n === null && (n = Do(), q.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function jo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Mo(e) {
		return No(Eo(), oo, e);
	}
	function No(e, t, n) {
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
				if (f === u.lane ? (ao & f) === f : (X & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === aa && (d = !0);
					else if ((ao & p) === p) {
						u = u.next, p === aa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, q.lanes |= p, Wl |= p;
					f = u.action, uo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, q.lanes |= f, Wl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !hr(o, e.memoizedState) && ($s = !0, d && (n = oa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Po(e) {
		var t = Eo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			hr(o, t.memoizedState) || ($s = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Fo(e, t, n) {
		var r = q, a = Eo(), o = K;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !hr((oo || a).memoizedState, n);
		if (s && (a.memoizedState = n, $s = !0), a = a.queue, os(Ro.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || so !== null && so.memoizedState.tag & 1) {
			if (r.flags |= 2048, ts(9, { destroy: void 0 }, Lo.bind(null, r, a, n, t), null), Ll === null) throw Error(i(349));
			o || ao & 127 || Io(r, t, n);
		}
		return n;
	}
	function Io(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = q.updateQueue, t === null ? (t = Do(), q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Lo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, zo(t) && Bo(e);
	}
	function Ro(e, t, n) {
		return n(function() {
			zo(t) && Bo(e);
		});
	}
	function zo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !hr(e, n);
		} catch {
			return !0;
		}
	}
	function Bo(e) {
		var t = Xr(e, 2);
		t !== null && mu(t, e, 2);
	}
	function Vo(e) {
		var t = To();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), uo) {
				Ae(!0);
				try {
					n();
				} finally {
					Ae(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: jo,
			lastRenderedState: e
		}, t;
	}
	function Ho(e, t, n, r) {
		return e.baseState = n, No(e, oo, typeof r == "function" ? r : jo);
	}
	function Uo(e, t, n, r, a) {
		if (js(e)) throw Error(i(485));
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
			N.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Wo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Wo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = N.T, o = {};
			N.T = o;
			try {
				var s = n(i, r), c = N.S;
				c !== null && c(o, s), Go(e, t, s);
			} catch (n) {
				qo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), N.T = a;
			}
		} else try {
			a = n(i, r), Go(e, t, a);
		} catch (n) {
			qo(e, t, n);
		}
	}
	function Go(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Ko(e, t, n);
		}, function(n) {
			return qo(e, t, n);
		}) : Ko(e, t, n);
	}
	function Ko(e, t, n) {
		t.status = "fulfilled", t.value = n, Jo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Wo(e, n)));
	}
	function qo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Jo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Jo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Yo(e, t) {
		return t;
	}
	function Xo(e, t) {
		if (K) {
			var n = Ll.formState;
			if (n !== null) {
				a: {
					var r = q;
					if (K) {
						if (Di) {
							b: {
								for (var i = Di, a = ki; i.nodeType !== 8;) {
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
								Di = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ji(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = To(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Yo,
			lastRenderedState: t
		}, n.queue = r, n = Os.bind(null, q, r), r.dispatch = n, r = Vo(!1), a = As.bind(null, q, !1, r.queue), r = To(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Uo.bind(null, q, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Zo(e) {
		return Qo(Eo(), oo, e);
	}
	function Qo(e, t, n) {
		if (t = No(e, t, Yo)[0], e = Mo(jo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Oo(t);
		} catch (e) {
			throw e === ha ? _a : e;
		}
		else r = t;
		t = Eo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (q.flags |= 2048, ts(9, { destroy: void 0 }, $o.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function $o(e, t) {
		e.action = t;
	}
	function es(e) {
		var t = Eo(), n = oo;
		if (n !== null) return Qo(t, n, e);
		Eo(), t = t.memoizedState, n = Eo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ts(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = q.updateQueue, t === null && (t = Do(), q.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ns() {
		return Eo().memoizedState;
	}
	function rs(e, t, n, r) {
		var i = To();
		q.flags |= e, i.memoizedState = ts(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function is(e, t, n, r) {
		var i = Eo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		oo !== null && r !== null && _o(r, oo.memoizedState.deps) ? i.memoizedState = ts(t, a, n, r) : (q.flags |= e, i.memoizedState = ts(1 | t, a, n, r));
	}
	function as(e, t) {
		rs(8390656, 8, e, t);
	}
	function os(e, t) {
		is(2048, 8, e, t);
	}
	function ss(e) {
		q.flags |= 4;
		var t = q.updateQueue;
		if (t === null) t = Do(), q.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function cs(e) {
		var t = Eo().memoizedState;
		return ss({
			ref: t,
			nextImpl: e
		}), function() {
			if (J & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ls(e, t) {
		return is(4, 2, e, t);
	}
	function us(e, t) {
		return is(4, 4, e, t);
	}
	function ds(e, t) {
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
	function fs(e, t, n) {
		n = n == null ? null : n.concat([e]), is(4, 4, ds.bind(null, t, e), n);
	}
	function ps() {}
	function ms(e, t) {
		var n = Eo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && _o(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function hs(e, t) {
		var n = Eo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && _o(t, r[1])) return r[0];
		if (r = e(), uo) {
			Ae(!0);
			try {
				e();
			} finally {
				Ae(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function gs(e, t, n) {
		return n === void 0 || ao & 1073741824 && !(X & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = pu(), q.lanes |= e, Wl |= e, n);
	}
	function _s(e, t, n, r) {
		return hr(n, t) ? n : Ga.current === null ? !(ao & 42) || ao & 1073741824 && !(X & 261930) ? ($s = !0, e.memoizedState = n) : (e = pu(), q.lanes |= e, Wl |= e, t) : (e = gs(e, n, r), hr(e, t) || ($s = !0), e);
	}
	function vs(e, t, n, r, i) {
		var a = P.p;
		P.p = a !== 0 && 8 > a ? a : 8;
		var o = N.T, s = {};
		N.T = s, As(e, !1, t, n);
		try {
			var c = i(), l = N.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? ks(e, t, la(c, r), fu(e)) : ks(e, t, r, fu(e));
		} catch (n) {
			ks(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, fu());
		} finally {
			P.p = a, o !== null && s.types !== null && (o.types = s.types), N.T = o;
		}
	}
	function ys() {}
	function bs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = xs(e).queue;
		vs(e, a, t, F, n === null ? ys : function() {
			return Ss(e), n(r);
		});
	}
	function xs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: F,
			baseState: F,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: jo,
				lastRenderedState: F
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
				lastRenderedReducer: jo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ss(e) {
		var t = xs(e);
		t.next === null && (t = e.alternate.memoizedState), ks(e, t.next.queue, {}, fu());
	}
	function Cs() {
		return Ji(Qf);
	}
	function ws() {
		return Eo().memoizedState;
	}
	function Ts() {
		return Eo().memoizedState;
	}
	function Es(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = fu();
					e = Ia(n);
					var r = La(t, e, n);
					r !== null && (mu(r, t, n), Ra(r, t, n)), t = { cache: ta() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ds(e, t, n) {
		var r = fu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, js(e) ? Ms(t, n) : (n = Yr(e, t, n, r), n !== null && (mu(n, e, r), Ns(n, t, r)));
	}
	function Os(e, t, n) {
		ks(e, t, n, fu());
	}
	function ks(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (js(e)) Ms(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, hr(s, o)) return Jr(e, t, i, 0), Ll === null && qr(), !1;
			} catch {}
			if (n = Yr(e, t, i, r), n !== null) return mu(n, e, r), Ns(n, t, r), !0;
		}
		return !1;
	}
	function As(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, js(e)) {
			if (t) throw Error(i(479));
		} else t = Yr(e, n, r, 2), t !== null && mu(t, e, 2);
	}
	function js(e) {
		var t = e.alternate;
		return e === q || t !== null && t === q;
	}
	function Ms(e, t) {
		lo = co = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ns(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, qe(e, n);
		}
	}
	var Ps = {
		readContext: Ji,
		use: ko,
		useCallback: go,
		useContext: go,
		useEffect: go,
		useImperativeHandle: go,
		useLayoutEffect: go,
		useInsertionEffect: go,
		useMemo: go,
		useReducer: go,
		useRef: go,
		useState: go,
		useDebugValue: go,
		useDeferredValue: go,
		useTransition: go,
		useSyncExternalStore: go,
		useId: go,
		useHostTransitionStatus: go,
		useFormState: go,
		useActionState: go,
		useOptimistic: go,
		useMemoCache: go,
		useCacheRefresh: go
	};
	Ps.useEffectEvent = go;
	var Fs = {
		readContext: Ji,
		use: ko,
		useCallback: function(e, t) {
			return To().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ji,
		useEffect: as,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), rs(4194308, 4, ds.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return rs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			rs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = To();
			t = t === void 0 ? null : t;
			var r = e();
			if (uo) {
				Ae(!0);
				try {
					e();
				} finally {
					Ae(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = To();
			if (n !== void 0) {
				var i = n(t);
				if (uo) {
					Ae(!0);
					try {
						n(t);
					} finally {
						Ae(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ds.bind(null, q, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = To();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Vo(e);
			var t = e.queue, n = Os.bind(null, q, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ps,
		useDeferredValue: function(e, t) {
			return gs(To(), e, t);
		},
		useTransition: function() {
			var e = Vo(!1);
			return e = vs.bind(null, q, e.queue, !0, !1), To().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = q, a = To();
			if (K) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Ll === null) throw Error(i(349));
				X & 127 || Io(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, as(Ro.bind(null, r, o, e), [e]), r.flags |= 2048, ts(9, { destroy: void 0 }, Lo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = To(), t = Ll.identifierPrefix;
			if (K) {
				var n = bi, r = yi;
				n = (r & ~(1 << 32 - je(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = fo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = ho++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Cs,
		useFormState: Xo,
		useActionState: Xo,
		useOptimistic: function(e) {
			var t = To();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = As.bind(null, q, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Ao,
		useCacheRefresh: function() {
			return To().memoizedState = Es.bind(null, q);
		},
		useEffectEvent: function(e) {
			var t = To(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (J & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Is = {
		readContext: Ji,
		use: ko,
		useCallback: ms,
		useContext: Ji,
		useEffect: os,
		useImperativeHandle: fs,
		useInsertionEffect: ls,
		useLayoutEffect: us,
		useMemo: hs,
		useReducer: Mo,
		useRef: ns,
		useState: function() {
			return Mo(jo);
		},
		useDebugValue: ps,
		useDeferredValue: function(e, t) {
			return _s(Eo(), oo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Mo(jo)[0], t = Eo().memoizedState;
			return [typeof e == "boolean" ? e : Oo(e), t];
		},
		useSyncExternalStore: Fo,
		useId: ws,
		useHostTransitionStatus: Cs,
		useFormState: Zo,
		useActionState: Zo,
		useOptimistic: function(e, t) {
			return Ho(Eo(), oo, e, t);
		},
		useMemoCache: Ao,
		useCacheRefresh: Ts
	};
	Is.useEffectEvent = cs;
	var Ls = {
		readContext: Ji,
		use: ko,
		useCallback: ms,
		useContext: Ji,
		useEffect: os,
		useImperativeHandle: fs,
		useInsertionEffect: ls,
		useLayoutEffect: us,
		useMemo: hs,
		useReducer: Po,
		useRef: ns,
		useState: function() {
			return Po(jo);
		},
		useDebugValue: ps,
		useDeferredValue: function(e, t) {
			var n = Eo();
			return oo === null ? gs(n, e, t) : _s(n, oo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Po(jo)[0], t = Eo().memoizedState;
			return [typeof e == "boolean" ? e : Oo(e), t];
		},
		useSyncExternalStore: Fo,
		useId: ws,
		useHostTransitionStatus: Cs,
		useFormState: es,
		useActionState: es,
		useOptimistic: function(e, t) {
			var n = Eo();
			return oo === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ho(n, oo, e, t);
		},
		useMemoCache: Ao,
		useCacheRefresh: Ts
	};
	Ls.useEffectEvent = cs;
	function Rs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var zs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = fu(), i = Ia(r);
			i.payload = t, n != null && (i.callback = n), t = La(e, i, r), t !== null && (mu(t, e, r), Ra(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = fu(), i = Ia(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = La(e, i, r), t !== null && (mu(t, e, r), Ra(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = fu(), r = Ia(n);
			r.tag = 2, t != null && (r.callback = t), t = La(e, r, n), t !== null && (mu(t, e, n), Ra(t, e, n));
		}
	};
	function Bs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !gr(n, r) || !gr(i, a) : !0;
	}
	function Vs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && zs.enqueueReplaceState(t, t.state, null);
	}
	function Hs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Us(e) {
		Ur(e);
	}
	function Ws(e) {
		console.error(e);
	}
	function Gs(e) {
		Ur(e);
	}
	function Ks(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function qs(e, t, n) {
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
	function Js(e, t, n) {
		return n = Ia(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Ks(e, t);
		}, n;
	}
	function Ys(e) {
		return e = Ia(e), e.tag = 3, e;
	}
	function Xs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				qs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			qs(t, n, r), typeof i != "function" && (nu === null ? nu = new Set([this]) : nu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Zs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Gi(t, n, a, !0), n = Xa.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Za === null ? Eu() : n.alternate === null && Ul === 0 && (Ul = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === va ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === va ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Eu(), !1;
		}
		if (K) return t = Xa.current, t === null ? (r !== Ai && (t = Error(i(423), { cause: r }), Li(di(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = di(r, n), a = Js(e.stateNode, r, a), za(e, a), Ul !== 4 && (Ul = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ai && (e = Error(i(422), { cause: r }), Li(di(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = di(o, n), Yl === null ? Yl = [o] : Yl.push(o), Ul !== 4 && (Ul = 2), t === null) return !0;
		r = di(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Js(n.stateNode, r, e), za(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (nu === null || !nu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Ys(a), Xs(a, e, n, r), za(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Qs = Error(i(461)), $s = !1;
	function ec(e, t, n, r) {
		t.child = e === null ? Ma(t, null, n, r) : ja(t, e.child, n, r);
	}
	function tc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return qi(t), r = vo(e, t, n, o, a, i), s = So(), e !== null && !$s ? (Co(e, t, i), Tc(e, t, i)) : (K && s && Ci(t), t.flags |= 1, ec(e, t, r, i), t.child);
	}
	function nc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ni(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, rc(e, t, a, r, i)) : (e = ai(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Ec(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? gr : n, n(o, r) && e.ref === t.ref) return Tc(e, t, i);
		}
		return t.flags |= 1, e = ri(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function rc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (gr(a, r) && e.ref === t.ref) if ($s = !1, t.pendingProps = r = a, Ec(e, i)) e.flags & 131072 && ($s = !0);
			else return t.lanes = e.lanes, Tc(e, t, i);
		}
		return dc(e, t, n, r, i);
	}
	function ic(e, t, n, r) {
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
				return oc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && pa(t, a === null ? null : a.cachePool), a === null ? Ja() : qa(t, a), eo(t);
			else return r = t.lanes = 536870912, oc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && pa(t, null), Ja(), to(t)) : (pa(t, a.cachePool), qa(t, a), to(t), t.memoizedState = null);
		return ec(e, t, i, n), t.child;
	}
	function ac(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function oc(e, t, n, r, i) {
		var a = fa();
		return a = a === null ? null : {
			parent: ea._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && pa(t, null), Ja(), eo(t), e !== null && Gi(e, t, r, !0), t.childLanes = i, null;
	}
	function sc(e, t) {
		return t = bc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function cc(e, t, n) {
		return ja(t, e.child, null, n), e = sc(t, t.pendingProps), e.flags |= 2, no(t), t.memoizedState = null, e;
	}
	function lc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (K) {
				if (r.mode === "hidden") return e = sc(t, r), t.lanes = 536870912, ac(null, e);
				if ($a(t), (e = Di) ? (e = rf(e, ki), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: vi === null ? null : {
						id: yi,
						overflow: bi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ci(e), n.return = t, t.child = n, Ei = t, Di = null)) : e = null, e === null) throw ji(t);
				return t.lanes = 536870912, null;
			}
			return sc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if ($a(t), a) if (t.flags & 256) t.flags &= -257, t = cc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if ($s || Gi(e, t, n, !1), a = (n & e.childLanes) !== 0, $s || a) {
				if (r = Ll, r !== null && (s = Je(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Xr(e, s), mu(r, e, s), Qs;
				Eu(), t = cc(e, t, n);
			} else e = o.treeContext, Di = cf(s.nextSibling), Ei = t, K = !0, Oi = null, ki = !1, e !== null && Ti(t, e), t = sc(t, r), t.flags |= 4096;
			return t;
		}
		return e = ri(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function uc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function dc(e, t, n, r, i) {
		return qi(t), n = vo(e, t, n, r, void 0, i), r = So(), e !== null && !$s ? (Co(e, t, i), Tc(e, t, i)) : (K && r && Ci(t), t.flags |= 1, ec(e, t, n, i), t.child);
	}
	function fc(e, t, n, r, i, a) {
		return qi(t), t.updateQueue = null, n = bo(t, r, n, i), yo(e), r = So(), e !== null && !$s ? (Co(e, t, a), Tc(e, t, a)) : (K && r && Ci(t), t.flags |= 1, ec(e, t, n, a), t.child);
	}
	function pc(e, t, n, r, i) {
		if (qi(t), t.stateNode === null) {
			var a = $r, o = n.contextType;
			typeof o == "object" && o && (a = Ji(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = zs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Pa(t), o = n.contextType, a.context = typeof o == "object" && o ? Ji(o) : $r, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Rs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && zs.enqueueReplaceState(a, a.state, null), Ha(t, r, a, i), Va(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Hs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = $r, typeof u == "object" && u && (o = Ji(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Vs(t, a, r, o), Na = !1;
			var f = t.memoizedState;
			a.state = f, Ha(t, r, a, i), Va(), l = t.memoizedState, s || f !== l || Na ? (typeof d == "function" && (Rs(t, n, d, r), l = t.memoizedState), (c = Na || Bs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Fa(e, t), o = t.memoizedProps, u = Hs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = $r, typeof l == "object" && l && (c = Ji(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Vs(t, a, r, c), Na = !1, f = t.memoizedState, a.state = f, Ha(t, r, a, i), Va();
			var p = t.memoizedState;
			o !== d || f !== p || Na || e !== null && e.dependencies !== null && Ki(e.dependencies) ? (typeof s == "function" && (Rs(t, n, s, r), p = t.memoizedState), (u = Na || Bs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Ki(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, uc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ja(t, e.child, null, i), t.child = ja(t, null, n, i)) : ec(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Tc(e, t, i), e;
	}
	function mc(e, t, n, r) {
		return Fi(), t.flags |= 256, ec(e, t, n, r), t.child;
	}
	var hc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function gc(e) {
		return {
			baseLanes: e,
			cachePool: ma()
		};
	}
	function _c(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ql), e;
	}
	function vc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (ro.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (K) {
				if (a ? Qa(t) : to(t), (e = Di) ? (e = rf(e, ki), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: vi === null ? null : {
						id: yi,
						overflow: bi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ci(e), n.return = t, t.child = n, Ei = t, Di = null)) : e = null, e === null) throw ji(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (to(t), a = t.mode, c = bc({
				mode: "hidden",
				children: c
			}, a), r = oi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = gc(n), r.childLanes = _c(e, s, n), t.memoizedState = hc, ac(null, r)) : (Qa(t), yc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Qa(t), t.flags &= -257, t = xc(e, t, n)) : t.memoizedState === null ? (to(t), c = r.fallback, a = t.mode, r = bc({
				mode: "visible",
				children: r.children
			}, a), c = oi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, ja(t, e.child, null, n), r = t.child, r.memoizedState = gc(n), r.childLanes = _c(e, s, n), t.memoizedState = hc, t = ac(null, r)) : (to(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Qa(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Li({
					value: r,
					source: null,
					stack: null
				}), t = xc(e, t, n);
			} else if ($s || Gi(e, t, n, !1), s = (n & e.childLanes) !== 0, $s || s) {
				if (s = Ll, s !== null && (r = Je(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Xr(e, r), mu(s, e, r), Qs;
				af(c) || Eu(), t = xc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Di = cf(c.nextSibling), Ei = t, K = !0, Oi = null, ki = !1, e !== null && Ti(t, e), t = yc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (to(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ri(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = oi(c, a, n, null), c.flags |= 2) : c = ri(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, ac(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = gc(n) : (a = c.cachePool, a === null ? a = ma() : (l = ea._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = _c(e, s, n), t.memoizedState = hc, ac(e.child, r)) : (Qa(t), n = e.child, e = n.sibling, n = ri(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function yc(e, t) {
		return t = bc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function bc(e, t) {
		return e = ti(22, e, null, t), e.lanes = 0, e;
	}
	function xc(e, t, n) {
		return ja(t, e.child, null, n), e = yc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Sc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ui(e.return, t, n);
	}
	function Cc(e, t, n, r, i, a) {
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
	function wc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = ro.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, z(ro, o), ec(e, t, r, n), r = K ? hi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Sc(e, n, t);
			else if (e.tag === 19) Sc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && io(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Cc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && io(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Cc(t, !0, n, null, a, r);
				break;
			case "together":
				Cc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Tc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Wl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Gi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ri(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ri(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Ec(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Ki(e))) : !0;
	}
	function Dc(e, t, n) {
		switch (t.tag) {
			case 3:
				oe(t, t.stateNode.containerInfo), Vi(t, ea, e.memoizedState.cache), Fi();
				break;
			case 27:
			case 5:
				U(t);
				break;
			case 4:
				oe(t, t.stateNode.containerInfo);
				break;
			case 10:
				Vi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, $a(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Qa(t), e = Tc(e, t, n), e === null ? null : e.sibling) : vc(e, t, n) : (Qa(t), t.flags |= 128, null);
				Qa(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Gi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return wc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), z(ro, ro.current), r) break;
				return null;
			case 22: return t.lanes = 0, ic(e, t, n, t.pendingProps);
			case 24: Vi(t, ea, e.memoizedState.cache);
		}
		return Tc(e, t, n);
	}
	function Oc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) $s = !0;
		else {
			if (!Ec(e, n) && !(t.flags & 128)) return $s = !1, Dc(e, t, n);
			$s = !!(e.flags & 131072);
		}
		else $s = !1, K && t.flags & 1048576 && Si(t, hi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = xa(t.elementType), t.type = e, typeof e == "function") ni(e) ? (r = Hs(e, r), t.tag = 1, t = pc(null, t, e, r, n)) : (t.tag = 0, t = dc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = tc(null, t, e, r, n);
								break a;
							} else if (a === D) {
								t.tag = 14, t = nc(null, t, e, r, n);
								break a;
							}
						}
						throw t = j(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return dc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Hs(r, t.pendingProps), pc(e, t, r, a, n);
			case 3:
				a: {
					if (oe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Fa(e, t), Ha(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Vi(t, ea, r), r !== o.cache && Wi(t, [ea], n, !0), Va(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = mc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = di(Error(i(424)), t), Li(a), t = mc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Di = cf(e.firstChild), Ei = t, K = !0, Oi = null, ki = !0, n = Ma(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Fi(), r === a) {
							t = Tc(e, t, n);
							break a;
						}
						ec(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return uc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : K || (n = t.type, e = t.pendingProps, r = Bd(V.current).createElement(n), r[$e] = t, r[et] = e, Pd(r, n, e), ft(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return U(t), e === null && K && (r = t.stateNode = ff(t.type, t.pendingProps, V.current), Ei = t, ki = !0, a = Di, Zd(t.type) ? (lf = a, Di = cf(r.firstChild)) : Di = a), ec(e, t, t.pendingProps.children, n), uc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && K && ((a = r = Di) && (r = tf(r, t.type, t.pendingProps, ki), r === null ? a = !1 : (t.stateNode = r, Ei = t, Di = cf(r.firstChild), ki = !1, a = !0)), a || ji(t)), U(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = vo(e, t, xo, null, null, n), Qf._currentValue = a), uc(e, t), ec(e, t, r, n), t.child;
			case 6: return e === null && K && ((e = n = Di) && (n = nf(n, t.pendingProps, ki), n === null ? e = !1 : (t.stateNode = n, Ei = t, Di = null, e = !0)), e || ji(t)), null;
			case 13: return vc(e, t, n);
			case 4: return oe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ja(t, null, r, n) : ec(e, t, r, n), t.child;
			case 11: return tc(e, t, t.type, t.pendingProps, n);
			case 7: return ec(e, t, t.pendingProps, n), t.child;
			case 8: return ec(e, t, t.pendingProps.children, n), t.child;
			case 12: return ec(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Vi(t, t.type, r.value), ec(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, qi(t), a = Ji(a), r = r(a), t.flags |= 1, ec(e, t, r, n), t.child;
			case 14: return nc(e, t, t.type, t.pendingProps, n);
			case 15: return rc(e, t, t.type, t.pendingProps, n);
			case 19: return wc(e, t, n);
			case 31: return lc(e, t, n);
			case 22: return ic(e, t, n, t.pendingProps);
			case 24: return qi(t), r = Ji(ea), e === null ? (a = fa(), a === null && (a = Ll, o = ta(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Pa(t), Vi(t, ea, a)) : ((e.lanes & n) !== 0 && (Fa(e, t), Ha(t, null, null, n), Va()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Vi(t, ea, r), r !== a.cache && Wi(t, [ea], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Vi(t, ea, r))), ec(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function kc(e) {
		e.flags |= 4;
	}
	function Ac(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Cu()) e.flags |= 8192;
			else throw Sa = va, ga;
		} else e.flags &= -16777217;
	}
	function jc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (Cu()) e.flags |= 8192;
		else throw Sa = va, ga;
	}
	function Mc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : He(), e.lanes |= t, Jl |= t);
	}
	function Nc(e, t) {
		if (!K) switch (e.tailMode) {
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
	function Pc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Fc(e, t, n) {
		var r = t.pendingProps;
		switch (wi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Pc(t), null;
			case 1: return Pc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Hi(ea), H(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Pi(t) ? kc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ii())), Pc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (kc(t), o === null ? (Pc(t), Ac(t, a, null, r, n)) : (Pc(t), jc(t, o))) : o ? o === e.memoizedState ? (Pc(t), t.flags &= -16777217) : (kc(t), Pc(t), jc(t, o)) : (e = e.memoizedProps, e !== r && kc(t), Pc(t), Ac(t, a, e, r, n)), null;
			case 27:
				if (se(t), n = V.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && kc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Pc(t), null;
					}
					e = B.current, Pi(t) ? Mi(t, e) : (e = ff(a, r, n), t.stateNode = e, kc(t));
				}
				return Pc(t), null;
			case 5:
				if (se(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && kc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Pc(t), null;
					}
					if (o = B.current, Pi(t)) Mi(t, o);
					else {
						var s = Bd(V.current);
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
						o[$e] = t, o[et] = r;
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
						r && kc(t);
					}
				}
				return Pc(t), Ac(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && kc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = V.current, Pi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ei, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[$e] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || ji(t, !0);
					} else e = Bd(e).createTextNode(r), e[$e] = t, t.stateNode = e;
				}
				return Pc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Pi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[$e] = t;
						} else Fi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Pc(t), e = !1;
					} else n = Ii(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (no(t), t) : (no(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Pc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Pi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[$e] = t;
						} else Fi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Pc(t), a = !1;
					} else a = Ii(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (no(t), t) : (no(t), null);
				}
				return no(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Mc(t, t.updateQueue), Pc(t), null);
			case 4: return H(), e === null && xd(t.stateNode.containerInfo), Pc(t), null;
			case 10: return Hi(t.type), Pc(t), null;
			case 19:
				if (R(ro), r = t.memoizedState, r === null) return Pc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Nc(r, !1);
				else {
					if (Ul !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = io(e), o !== null) {
							for (t.flags |= 128, Nc(r, !1), e = o.updateQueue, t.updateQueue = e, Mc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ii(n, e), n = n.sibling;
							return z(ro, ro.current & 1 | 2), K && xi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && be() > eu && (t.flags |= 128, a = !0, Nc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = io(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Mc(t, e), Nc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !K) return Pc(t), null;
					} else 2 * be() - r.renderingStartTime > eu && n !== 536870912 && (t.flags |= 128, a = !0, Nc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Pc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = be(), e.sibling = null, n = ro.current, z(ro, a ? n & 1 | 2 : n & 1), K && xi(t, r.treeForkCount), e);
			case 22:
			case 23: return no(t), Ya(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Pc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pc(t), n = t.updateQueue, n !== null && Mc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && R(da), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Hi(ea), Pc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Ic(e, t) {
		switch (wi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Hi(ea), H(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return se(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (no(t), t.alternate === null) throw Error(i(340));
					Fi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (no(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Fi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return R(ro), null;
			case 4: return H(), null;
			case 10: return Hi(t.type), null;
			case 22:
			case 23: return no(t), Ya(), e !== null && R(da), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Hi(ea), null;
			case 25: return null;
			default: return null;
		}
	}
	function Lc(e, t) {
		switch (wi(t), t.tag) {
			case 3:
				Hi(ea), H();
				break;
			case 26:
			case 27:
			case 5:
				se(t);
				break;
			case 4:
				H();
				break;
			case 31:
				t.memoizedState !== null && no(t);
				break;
			case 13:
				no(t);
				break;
			case 19:
				R(ro);
				break;
			case 10:
				Hi(t.type);
				break;
			case 22:
			case 23:
				no(t), Ya(), e !== null && R(da);
				break;
			case 24: Hi(ea);
		}
	}
	function Rc(e, t) {
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
			Q(t, t.return, e);
		}
	}
	function zc(e, t, n) {
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
								Q(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Q(t, t.return, e);
		}
	}
	function Bc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Wa(t, n);
			} catch (t) {
				Q(e, e.return, t);
			}
		}
	}
	function Vc(e, t, n) {
		n.props = Hs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Q(e, t, n);
		}
	}
	function Hc(e, t) {
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
			Q(e, t, n);
		}
	}
	function Uc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Q(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Q(e, t, n);
		}
		else n.current = null;
	}
	function Wc(e) {
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
			Q(e, e.return, t);
		}
	}
	function Gc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[et] = t;
		} catch (t) {
			Q(e, e.return, t);
		}
	}
	function Kc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function qc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Kc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Jc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Kt));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Jc(e, t, n), e = e.sibling; e !== null;) Jc(e, t, n), e = e.sibling;
	}
	function Yc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Yc(e, t, n), e = e.sibling; e !== null;) Yc(e, t, n), e = e.sibling;
	}
	function Xc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[$e] = e, t[et] = n;
		} catch (t) {
			Q(e, e.return, t);
		}
	}
	var Zc = !1, Qc = !1, $c = !1, el = typeof WeakSet == "function" ? WeakSet : Set, tl = null;
	function nl(e, t) {
		if (e = e.containerInfo, Rd = sp, e = br(e), xr(e)) {
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
		}, sp = !1, tl = t; tl !== null;) if (t = tl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, tl = e;
		else for (; tl !== null;) {
			switch (t = tl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Hs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Q(n, n.return, e);
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
				e.return = t.return, tl = e;
				break;
			}
			tl = t.return;
		}
	}
	function rl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				vl(e, n), r & 4 && Rc(5, n);
				break;
			case 1:
				if (vl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Q(n, n.return, e);
				}
				else {
					var i = Hs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Q(n, n.return, e);
					}
				}
				r & 64 && Bc(n), r & 512 && Hc(n, n.return);
				break;
			case 3:
				if (vl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Wa(e, t);
					} catch (e) {
						Q(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Xc(n);
			case 26:
			case 5:
				vl(e, n), t === null && r & 4 && Wc(n), r & 512 && Hc(n, n.return);
				break;
			case 12:
				vl(e, n);
				break;
			case 31:
				vl(e, n), r & 4 && ll(e, n);
				break;
			case 13:
				vl(e, n), r & 4 && ul(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Zc, !r) {
					t = t !== null && t.memoizedState !== null || Qc, i = Zc;
					var a = Qc;
					Zc = r, (Qc = t) && !a ? bl(e, n, (n.subtreeFlags & 8772) != 0) : vl(e, n), Zc = i, Qc = a;
				}
				break;
			case 30: break;
			default: vl(e, n);
		}
	}
	function il(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, il(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && st(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var al = null, ol = !1;
	function sl(e, t, n) {
		for (n = n.child; n !== null;) cl(e, t, n), n = n.sibling;
	}
	function cl(e, t, n) {
		if (W && typeof W.onCommitFiberUnmount == "function") try {
			W.onCommitFiberUnmount(ke, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Qc || Uc(n, t), sl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Qc || Uc(n, t);
				var r = al, i = ol;
				Zd(n.type) && (al = n.stateNode, ol = !1), sl(e, t, n), pf(n.stateNode), al = r, ol = i;
				break;
			case 5: Qc || Uc(n, t);
			case 6:
				if (r = al, i = ol, al = null, sl(e, t, n), al = r, ol = i, al !== null) if (ol) try {
					(al.nodeType === 9 ? al.body : al.nodeName === "HTML" ? al.ownerDocument.body : al).removeChild(n.stateNode);
				} catch (e) {
					Q(n, t, e);
				}
				else try {
					al.removeChild(n.stateNode);
				} catch (e) {
					Q(n, t, e);
				}
				break;
			case 18:
				al !== null && (ol ? (e = al, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(al, n.stateNode));
				break;
			case 4:
				r = al, i = ol, al = n.stateNode.containerInfo, ol = !0, sl(e, t, n), al = r, ol = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				zc(2, n, t), Qc || zc(4, n, t), sl(e, t, n);
				break;
			case 1:
				Qc || (Uc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Vc(n, t, r)), sl(e, t, n);
				break;
			case 21:
				sl(e, t, n);
				break;
			case 22:
				Qc = (r = Qc) || n.memoizedState !== null, sl(e, t, n), Qc = r;
				break;
			default: sl(e, t, n);
		}
	}
	function ll(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Q(t, t.return, e);
			}
		}
	}
	function ul(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Q(t, t.return, e);
		}
	}
	function dl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new el()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new el()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function fl(e, t) {
		var n = dl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function pl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							al = c.stateNode, ol = !1;
							break a;
						}
						break;
					case 5:
						al = c.stateNode, ol = !1;
						break a;
					case 3:
					case 4:
						al = c.stateNode.containerInfo, ol = !0;
						break a;
				}
				c = c.return;
			}
			if (al === null) throw Error(i(160));
			cl(o, s, a), al = null, ol = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) hl(t, e), t = t.sibling;
	}
	var ml = null;
	function hl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				pl(t, e), gl(e), r & 4 && (zc(3, e, e.return), Rc(3, e), zc(5, e, e.return));
				break;
			case 1:
				pl(t, e), gl(e), r & 512 && (Qc || n === null || Uc(n, n.return)), r & 64 && Zc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = ml;
				if (pl(t, e), gl(e), r & 512 && (Qc || n === null || Uc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[ot] || o[$e] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[$e] = e, ft(o), r = o;
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
							o[$e] = e, ft(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Gc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				pl(t, e), gl(e), r & 512 && (Qc || n === null || Uc(n, n.return)), n !== null && r & 4 && Gc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (pl(t, e), gl(e), r & 512 && (Qc || n === null || Uc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Rt(a, "");
					} catch (t) {
						Q(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Gc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && ($c = !0);
				break;
			case 6:
				if (pl(t, e), gl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Q(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = ml, ml = gf(t.containerInfo), pl(t, e), ml = a, gl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Q(e, e.return, t);
				}
				$c && ($c = !1, _l(e));
				break;
			case 4:
				r = ml, ml = gf(e.stateNode.containerInfo), pl(t, e), gl(e), ml = r;
				break;
			case 12:
				pl(t, e), gl(e);
				break;
			case 31:
				pl(t, e), gl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, fl(e, r)));
				break;
			case 13:
				pl(t, e), gl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Ql = be()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, fl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Zc, d = Qc;
				if (Zc = u || a, Qc = d || l, pl(t, e), Qc = d, Zc = u, gl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Zc || Qc || yl(e)), n = null, t = e;;) {
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
								Q(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Q(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Q(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, fl(e, n))));
				break;
			case 19:
				pl(t, e), gl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, fl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: pl(t, e), gl(e);
		}
	}
	function gl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Kc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Yc(e, qc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Rt(o, ""), n.flags &= -33), Yc(e, qc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Jc(e, qc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Q(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function _l(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			_l(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function vl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) rl(e, t.alternate, t), t = t.sibling;
	}
	function yl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					zc(4, t, t.return), yl(t);
					break;
				case 1:
					Uc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Vc(t, t.return, n), yl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Uc(t, t.return), yl(t);
					break;
				case 22:
					t.memoizedState === null && yl(t);
					break;
				case 30:
					yl(t);
					break;
				default: yl(t);
			}
			e = e.sibling;
		}
	}
	function bl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					bl(i, a, n), Rc(4, a);
					break;
				case 1:
					if (bl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Q(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ua(c[i], s);
						} catch (e) {
							Q(r, r.return, e);
						}
					}
					n && o & 64 && Bc(a), Hc(a, a.return);
					break;
				case 27: Xc(a);
				case 26:
				case 5:
					bl(i, a, n), n && r === null && o & 4 && Wc(a), Hc(a, a.return);
					break;
				case 12:
					bl(i, a, n);
					break;
				case 31:
					bl(i, a, n), n && o & 4 && ll(i, a);
					break;
				case 13:
					bl(i, a, n), n && o & 4 && ul(i, a);
					break;
				case 22:
					a.memoizedState === null && bl(i, a, n), Hc(a, a.return);
					break;
				case 30: break;
				default: bl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function xl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && na(n));
	}
	function Sl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && na(e));
	}
	function Cl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) wl(e, t, n, r), t = t.sibling;
	}
	function wl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Cl(e, t, n, r), i & 2048 && Rc(9, t);
				break;
			case 1:
				Cl(e, t, n, r);
				break;
			case 3:
				Cl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && na(e)));
				break;
			case 12:
				if (i & 2048) {
					Cl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Q(t, t.return, e);
					}
				} else Cl(e, t, n, r);
				break;
			case 31:
				Cl(e, t, n, r);
				break;
			case 13:
				Cl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Cl(e, t, n, r) : (a._visibility |= 2, Tl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Cl(e, t, n, r) : El(e, t), i & 2048 && xl(o, t);
				break;
			case 24:
				Cl(e, t, n, r), i & 2048 && Sl(t.alternate, t);
				break;
			default: Cl(e, t, n, r);
		}
	}
	function Tl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Tl(a, o, s, c, i), Rc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Tl(a, o, s, c, i)) : u._visibility & 2 ? Tl(a, o, s, c, i) : El(a, o), i && l & 2048 && xl(o.alternate, o);
					break;
				case 24:
					Tl(a, o, s, c, i), i && l & 2048 && Sl(o.alternate, o);
					break;
				default: Tl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function El(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					El(n, r), i & 2048 && xl(r.alternate, r);
					break;
				case 24:
					El(n, r), i & 2048 && Sl(r.alternate, r);
					break;
				default: El(n, r);
			}
			t = t.sibling;
		}
	}
	var Dl = 8192;
	function Ol(e, t, n) {
		if (e.subtreeFlags & Dl) for (e = e.child; e !== null;) kl(e, t, n), e = e.sibling;
	}
	function kl(e, t, n) {
		switch (e.tag) {
			case 26:
				Ol(e, t, n), e.flags & Dl && e.memoizedState !== null && Gf(n, ml, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Ol(e, t, n);
				break;
			case 3:
			case 4:
				var r = ml;
				ml = gf(e.stateNode.containerInfo), Ol(e, t, n), ml = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Dl, Dl = 16777216, Ol(e, t, n), Dl = r) : Ol(e, t, n));
				break;
			default: Ol(e, t, n);
		}
	}
	function Al(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function jl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				tl = r, Pl(r, e);
			}
			Al(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Ml(e), e = e.sibling;
	}
	function Ml(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				jl(e), e.flags & 2048 && zc(9, e, e.return);
				break;
			case 3:
				jl(e);
				break;
			case 12:
				jl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Nl(e)) : jl(e);
				break;
			default: jl(e);
		}
	}
	function Nl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				tl = r, Pl(r, e);
			}
			Al(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					zc(8, t, t.return), Nl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Nl(t));
					break;
				default: Nl(t);
			}
			e = e.sibling;
		}
	}
	function Pl(e, t) {
		for (; tl !== null;) {
			var n = tl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					zc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: na(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, tl = r;
			else a: for (n = e; tl !== null;) {
				r = tl;
				var i = r.sibling, a = r.return;
				if (il(r), r === n) {
					tl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, tl = i;
					break a;
				}
				tl = a;
			}
		}
	}
	var Fl = {
		getCacheForType: function(e) {
			var t = Ji(ea), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ji(ea).controller.signal;
		}
	}, Il = typeof WeakMap == "function" ? WeakMap : Map, J = 0, Ll = null, Y = null, X = 0, Z = 0, Rl = null, zl = !1, Bl = !1, Vl = !1, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = null, Xl = null, Zl = !1, Ql = 0, $l = 0, eu = Infinity, tu = null, nu = null, ru = 0, iu = null, au = null, ou = 0, su = 0, cu = null, lu = null, uu = 0, du = null;
	function fu() {
		return J & 2 && X !== 0 ? X & -X : N.T === null ? Ze() : ud();
	}
	function pu() {
		if (ql === 0) if (!(X & 536870912) || K) {
			var e = Ie;
			Ie <<= 1, !(Ie & 3932160) && (Ie = 262144), ql = e;
		} else ql = 536870912;
		return e = Xa.current, e !== null && (e.flags |= 32), ql;
	}
	function mu(e, t, n) {
		(e === Ll && (Z === 2 || Z === 9) || e.cancelPendingCommit !== null) && (xu(e, 0), vu(e, X, ql, !1)), We(e, n), (!(J & 2) || e !== Ll) && (e === Ll && (!(J & 2) && (Gl |= n), Ul === 4 && vu(e, X, ql, !1)), nd(e));
	}
	function hu(e, t, n) {
		if (J & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Be(e, t), a = r ? ku(e, t) : Du(e, t, !0), o = r;
		do {
			if (a === 0) {
				Bl && !r && vu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !_u(n)) {
					a = Du(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Yl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (xu(c, s).flags |= 256), s = Du(c, s, !1), s !== 2) {
								if (Vl && !l) {
									c.errorRecoveryDisabledLanes |= o, Gl |= o, a = 4;
									break a;
								}
								o = Xl, Xl = a, o !== null && (Xl === null ? Xl = o : Xl.push.apply(Xl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					xu(e, 0), vu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							vu(r, t, ql, !zl);
							break a;
						case 2:
							Xl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = Ql + 300 - be(), 10 < a)) {
						if (vu(r, t, ql, !zl), ze(r, 0, !0) !== 0) break a;
						ou = t, r.timeoutHandle = Kd(gu.bind(null, r, n, Xl, tu, Zl, t, ql, Gl, Jl, zl, o, "Throttled", -0, 0), a);
						break a;
					}
					gu(r, n, Xl, tu, Zl, t, ql, Gl, Jl, zl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		nd(e);
	}
	function gu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Kt
			}, kl(t, a, d);
			var m = (a & 62914560) === a ? Ql - be() : (a & 4194048) === a ? $l - be() : 0;
			if (m = qf(d, m), m !== null) {
				ou = a, e.cancelPendingCommit = m(Iu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), vu(e, a, o, !l);
				return;
			}
		}
		Iu(e, t, a, n, r, i, o, s, c);
	}
	function _u(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!hr(a(), i)) return !1;
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
	function vu(e, t, n, r) {
		t &= ~Kl, t &= ~Gl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - je(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && Ke(e, n, t);
	}
	function yu() {
		return J & 6 ? !0 : (rd(0, !1), !1);
	}
	function bu() {
		if (Y !== null) {
			if (Z === 0) var e = Y.return;
			else e = Y, Bi = zi = null, wo(e), Ta = null, Ea = 0, e = Y;
			for (; e !== null;) Lc(e.alternate, e), e = e.return;
			Y = null;
		}
	}
	function xu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), ou = 0, bu(), Ll = e, Y = n = ri(e.current, null), X = t, Z = 0, Rl = null, zl = !1, Bl = Be(e, t), Vl = !1, Jl = ql = Kl = Gl = Wl = Ul = 0, Xl = Yl = null, Zl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - je(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Hl = t, qr(), n;
	}
	function Su(e, t) {
		q = null, N.H = Ps, t === ha || t === _a ? (t = Ca(), Z = 3) : t === ga ? (t = Ca(), Z = 4) : Z = t === Qs ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Rl = t, Y === null && (Ul = 1, Ks(e, di(t, e.current)));
	}
	function Cu() {
		var e = Xa.current;
		return e === null ? !0 : (X & 4194048) === X ? Za === null : (X & 62914560) === X || X & 536870912 ? e === Za : !1;
	}
	function wu() {
		var e = N.H;
		return N.H = Ps, e === null ? Ps : e;
	}
	function Tu() {
		var e = N.A;
		return N.A = Fl, e;
	}
	function Eu() {
		Ul = 4, zl || (X & 4194048) !== X && Xa.current !== null || (Bl = !0), !(Wl & 134217727) && !(Gl & 134217727) || Ll === null || vu(Ll, X, ql, !1);
	}
	function Du(e, t, n) {
		var r = J;
		J |= 2;
		var i = wu(), a = Tu();
		(Ll !== e || X !== t) && (tu = null, xu(e, t)), t = !1;
		var o = Ul;
		a: do
			try {
				if (Z !== 0 && Y !== null) {
					var s = Y, c = Rl;
					switch (Z) {
						case 8:
							bu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Xa.current === null && (t = !0);
							var l = Z;
							if (Z = 0, Rl = null, Nu(e, s, c, l), n && Bl) {
								o = 0;
								break a;
							}
							break;
						default: l = Z, Z = 0, Rl = null, Nu(e, s, c, l);
					}
				}
				Ou(), o = Ul;
				break;
			} catch (t) {
				Su(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Bi = zi = null, J = r, N.H = i, N.A = a, Y === null && (Ll = null, X = 0, qr()), o;
	}
	function Ou() {
		for (; Y !== null;) ju(Y);
	}
	function ku(e, t) {
		var n = J;
		J |= 2;
		var r = wu(), a = Tu();
		Ll !== e || X !== t ? (tu = null, eu = be() + 500, xu(e, t)) : Bl = Be(e, t);
		a: do
			try {
				if (Z !== 0 && Y !== null) {
					t = Y;
					var o = Rl;
					b: switch (Z) {
						case 1:
							Z = 0, Rl = null, Nu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ya(o)) {
								Z = 0, Rl = null, Mu(t);
								break;
							}
							t = function() {
								Z !== 2 && Z !== 9 || Ll !== e || (Z = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Z = 7;
							break a;
						case 4:
							Z = 5;
							break a;
						case 7:
							ya(o) ? (Z = 0, Rl = null, Mu(t)) : (Z = 0, Rl = null, Nu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Y.tag) {
								case 26: s = Y.memoizedState;
								case 5:
								case 27:
									var c = Y;
									if (s ? Wf(s) : c.stateNode.complete) {
										Z = 0, Rl = null;
										var l = c.sibling;
										if (l !== null) Y = l;
										else {
											var u = c.return;
											u === null ? Y = null : (Y = u, Pu(u));
										}
										break b;
									}
							}
							Z = 0, Rl = null, Nu(e, t, o, 5);
							break;
						case 6:
							Z = 0, Rl = null, Nu(e, t, o, 6);
							break;
						case 8:
							bu(), Ul = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Au();
				break;
			} catch (t) {
				Su(e, t);
			}
		while (1);
		return Bi = zi = null, N.H = r, N.A = a, J = n, Y === null ? (Ll = null, X = 0, qr(), Ul) : 0;
	}
	function Au() {
		for (; Y !== null && !ve();) ju(Y);
	}
	function ju(e) {
		var t = Oc(e.alternate, e, Hl);
		e.memoizedProps = e.pendingProps, t === null ? Pu(e) : Y = t;
	}
	function Mu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = fc(n, t, t.pendingProps, t.type, void 0, X);
				break;
			case 11:
				t = fc(n, t, t.pendingProps, t.type.render, t.ref, X);
				break;
			case 5: wo(t);
			default: Lc(n, t), t = Y = ii(t, Hl), t = Oc(n, t, Hl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Pu(e) : Y = t;
	}
	function Nu(e, t, n, r) {
		Bi = zi = null, wo(t), Ta = null, Ea = 0;
		var i = t.return;
		try {
			if (Zs(e, i, t, n, X)) {
				Ul = 1, Ks(e, di(n, e.current)), Y = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Y = i, t;
			Ul = 1, Ks(e, di(n, e.current)), Y = null;
			return;
		}
		t.flags & 32768 ? (K || r === 1 ? e = !0 : Bl || X & 536870912 ? e = !1 : (zl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Xa.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Fu(t, e)) : Pu(t);
	}
	function Pu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Fu(t, zl);
				return;
			}
			e = t.return;
			var n = Fc(t.alternate, t, Hl);
			if (n !== null) {
				Y = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Y = t;
				return;
			}
			Y = t = e;
		} while (t !== null);
		Ul === 0 && (Ul = 5);
	}
	function Fu(e, t) {
		do {
			var n = Ic(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Y = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Y = e;
				return;
			}
			Y = e = n;
		} while (e !== null);
		Ul = 6, Y = null;
	}
	function Iu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Vu();
		while (ru !== 0);
		if (J & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Kr, Ge(e, n, o, s, c, l), e === Ll && (Y = Ll = null, X = 0), au = t, iu = e, ou = n, su = o, cu = a, lu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(we, function() {
				return Hu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = N.T, N.T = null, a = P.p, P.p = 2, s = J, J |= 4;
				try {
					nl(e, t, n);
				} finally {
					J = s, P.p = a, N.T = r;
				}
			}
			ru = 1, Lu(), Ru(), zu();
		}
	}
	function Lu() {
		if (ru === 1) {
			ru = 0;
			var e = iu, t = au, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = J;
				J |= 4;
				try {
					hl(t, e);
					var a = zd, o = br(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && yr(s.ownerDocument.documentElement, s)) {
						if (c !== null && xr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = vr(s, h), v = vr(s, g);
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
					J = i, P.p = r, N.T = n;
				}
			}
			e.current = t, ru = 2;
		}
	}
	function Ru() {
		if (ru === 2) {
			ru = 0;
			var e = iu, t = au, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = J;
				J |= 4;
				try {
					rl(e, t.alternate, t);
				} finally {
					J = i, P.p = r, N.T = n;
				}
			}
			ru = 3;
		}
	}
	function zu() {
		if (ru === 4 || ru === 3) {
			ru = 0, ye();
			var e = iu, t = au, n = ou, r = lu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? ru = 5 : (ru = 0, au = iu = null, Bu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (nu = null), Xe(n), t = t.stateNode, W && typeof W.onCommitFiberRoot == "function") try {
				W.onCommitFiberRoot(ke, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = N.T, i = P.p, P.p = 2, N.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					N.T = t, P.p = i;
				}
			}
			ou & 3 && Vu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === du ? uu++ : (uu = 0, du = e) : uu = 0, rd(0, !1);
		}
	}
	function Bu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, na(t)));
	}
	function Vu() {
		return Lu(), Ru(), zu(), Hu();
	}
	function Hu() {
		if (ru !== 5) return !1;
		var e = iu, t = su;
		su = 0;
		var n = Xe(ou), r = N.T, a = P.p;
		try {
			P.p = 32 > n ? 32 : n, N.T = null, n = cu, cu = null;
			var o = iu, s = ou;
			if (ru = 0, au = iu = null, ou = 0, J & 6) throw Error(i(331));
			var c = J;
			if (J |= 4, Ml(o.current), wl(o, o.current, s, n), J = c, rd(0, !1), W && typeof W.onPostCommitFiberRoot == "function") try {
				W.onPostCommitFiberRoot(ke, o);
			} catch {}
			return !0;
		} finally {
			P.p = a, N.T = r, Bu(e, t);
		}
	}
	function Uu(e, t, n) {
		t = di(n, t), t = Js(e.stateNode, t, 2), e = La(e, t, 2), e !== null && (We(e, 2), nd(e));
	}
	function Q(e, t, n) {
		if (e.tag === 3) Uu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Uu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (nu === null || !nu.has(r))) {
					e = di(n, e), n = Ys(2), r = La(t, n, 2), r !== null && (Xs(n, r, t, e), We(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Il();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Vl = !0, i.add(n), e = Gu.bind(null, e, t, n), t.then(e, e));
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ll === e && (X & n) === n && (Ul === 4 || Ul === 3 && (X & 62914560) === X && 300 > be() - Ql ? !(J & 2) && xu(e, 0) : Kl |= n, Jl === X && (Jl = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = He()), e = Xr(e, t), e !== null && (We(e, t), nd(e));
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
		return ge(e, t);
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
							a = (1 << 31 - je(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = X, a = ze(r, r === Ll ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Be(r, a) || (n = !0, cd(r, a));
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
		for (var t = be(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		ru !== 0 && ru !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - je(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ve(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Ll, n = X, n = ze(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Z === 2 || Z === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && _e(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Be(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && _e(r), Xe(n)) {
				case 2:
				case 8:
					n = Ce;
					break;
				case 32:
					n = we;
					break;
				case 268435456:
					n = Ee;
					break;
				default: n = we;
			}
			return r = sd.bind(null, e), n = ge(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && _e(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (ru !== 0 && ru !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Vu() && e.callbackNode !== n) return null;
		var r = X;
		return r = ze(e, e === Ll ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (hu(e, r, t), od(e, be()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Vu()) return null;
		hu(e, t, !0);
	}
	function ld() {
		Yd(function() {
			J & 6 ? ge(Se, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = aa;
			e === 0 && (e = Fe, Fe <<= 1, !(Fe & 261888) && (Fe = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Gt("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[et] || null).action), o = r.submitter;
			o && (t = (t = o[et] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new mn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (td !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								bs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), bs(n, {
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
	for (var md = 0; md < Vr.length; md++) {
		var hd = Vr[md];
		Hr(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Hr(Nr, "onAnimationEnd"), Hr(Pr, "onAnimationIteration"), Hr(Fr, "onAnimationStart"), Hr("dblclick", "onDoubleClick"), Hr("focusin", "onFocus"), Hr("focusout", "onBlur"), Hr(Ir, "onTransitionRun"), Hr(Lr, "onTransitionStart"), Hr(Rr, "onTransitionCancel"), Hr(zr, "onTransitionEnd"), gt("onMouseEnter", ["mouseout", "mouseover"]), gt("onMouseLeave", ["mouseout", "mouseover"]), gt("onPointerEnter", ["pointerout", "pointerover"]), gt("onPointerLeave", ["pointerout", "pointerover"]), ht("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ht("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ht("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), ht("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ht("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ht("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
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
						Ur(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Ur(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[nt];
		n === void 0 && (n = t[nt] = /* @__PURE__ */ new Set());
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
			e[bd] = !0, pt.forEach(function(t) {
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
		n = i.bind(null, t, n, e), i = void 0, !nn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					if (s = ct(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		$t(function() {
			var r = a, i = Jt(n), s = [];
			a: {
				var c = Br.get(e);
				if (c !== void 0) {
					var l = mn, u = e;
					switch (e) {
						case "keypress": if (ln(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Mn;
							break;
						case "focusin":
							u = "focus", l = Cn;
							break;
						case "focusout":
							u = "blur", l = Cn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Cn;
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
							l = xn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Sn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Pn;
							break;
						case Nr:
						case Pr:
						case Fr:
							l = wn;
							break;
						case zr:
							l = Fn;
							break;
						case "scroll":
						case "scrollend":
							l = gn;
							break;
						case "wheel":
							l = In;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Tn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Nn;
							break;
						case "toggle":
						case "beforetoggle": l = Ln;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = en(m, p), g != null && d.push(wd(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== qt && (u = n.relatedTarget || n.fromElement) && (ct(u) || u[tt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? ct(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = xn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Nn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ut(l), h = u == null ? c : ut(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, ct(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
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
					if (c = r ? ut(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = rr;
					else if (Zn(c)) if (ir) v = pr;
					else {
						v = dr;
						var y = ur;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Ht(r.elementType) && (v = rr) : v = fr;
					if (v &&= v(e, r)) {
						Qn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Pt(c, "number", c.value);
				}
				switch (y = r ? ut(r) : window, e) {
					case "focusin":
						(Zn(y) || y.contentEditable === "true") && (Cr = y, wr = r, Tr = null);
						break;
					case "focusout":
						Tr = wr = Cr = null;
						break;
					case "mousedown":
						Er = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Er = !1, Dr(s, n, i);
						break;
					case "selectionchange": if (Sr) break;
					case "keydown":
					case "keyup": Dr(s, n, i);
				}
				var b;
				if (zn) b: {
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
				else qn ? Gn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Hn && n.locale !== "ko" && (qn || x !== "onCompositionStart" ? x === "onCompositionEnd" && qn && (b = cn()) : (an = i, on = "value" in an ? an.value : an.textContent, qn = !0)), y = Td(r, x), 0 < y.length && (x = new En(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Kn(n), b !== null && (x.data = b)))), (b = Vn ? Jn(e, n) : Yn(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new En("onBeforeInput", "beforeinput", null, n, i), s.push({
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = en(e, n), i != null && r.unshift(wd(e, i, a)), i = en(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = en(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = en(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
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
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Rt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Rt(e, "" + r);
				break;
			case "className":
				St(e, "class", r);
				break;
			case "tabIndex":
				St(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				St(e, n, r);
				break;
			case "style":
				Vt(e, r, o);
				break;
			case "data": if (t !== "object") {
				St(e, "data", r);
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
				r = Gt("" + r), e.setAttribute(n, r);
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
				r = Gt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Kt);
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
				n = Gt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				$("beforetoggle", e), $("toggle", e), xt(e, "popover", r);
				break;
			case "xlinkActuate":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Ct(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Ct(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Ct(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				xt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Ut.get(n) || n, xt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Vt(e, r, o);
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
				typeof r == "string" ? Rt(e, r) : (typeof r == "number" || typeof r == "bigint") && Rt(e, "" + r);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Kt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!mt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[et] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : xt(e, n, r);
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
				Nt(e, o, c, l, u, s, a, !1);
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
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Ft(e, !!r, n, !0) : Ft(e, !!r, t, !1);
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
				Lt(e, r, a, o);
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
			default: if (Ht(t)) {
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
				Mt(e, s, c, l, u, d, o, a);
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
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Ft(e, !!n, n ? [] : "", !1) : Ft(e, !!n, t, !0)) : Ft(e, !!n, p, !1);
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
				It(e, p, m);
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
			default: if (Ht(t)) {
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
					a[ot] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
					ef(n), st(n);
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
			else if (!e[ot]) switch (t) {
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
		st(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = P.d;
	P.d = {
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
		var e = _f.f(), t = yu();
		return e || t;
	}
	function yf(e) {
		var t = lt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ss(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = jt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), ft(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + jt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + jt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + jt(n.imageSizes) + "\"]")) : i += "[href=\"" + jt(e) + "\"]";
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
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), ft(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + jt(r) + "\"][href=\"" + jt(e) + "\"]", a = i;
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
				r = n.createElement("link"), Pd(r, "link", e), ft(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = dt(r).hoistableStyles, a = Af(e);
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
					ft(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = dt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ft(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = dt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ft(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = V.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = dt(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = dt(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = dt(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + jt(e) + "\"";
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
		}), Pd(t, "link", n), ft(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + jt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + jt(n.href) + "\"]");
				if (r) return t.instance = r, ft(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), ft(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, ft(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), ft(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, ft(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ft(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[ot] || a[$e] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, ft(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), ft(a);
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
		_currentValue: F,
		_currentValue2: F,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ue(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ue(0), this.hiddenUpdates = Ue(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ti(3, null, null, t), e.current = a, a.stateNode = e, t = ta(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Pa(a), e;
	}
	function tp(e) {
		return e ? (e = $r, e) : $r;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ia(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = La(e, r, t), n !== null && (mu(n, e, t), Ra(n, e, t));
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
			var t = Xr(e, 67108864);
			t !== null && mu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = fu();
			t = Ye(t);
			var n = Xr(e, t);
			n !== null && mu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 2, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 8, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = lt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Re(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - je(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(J & 6) && (eu = be() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Xr(a, 2), s !== null && mu(s, a, 2), yu(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Jt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = ct(e), e !== null) {
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
			case "message": switch (xe()) {
				case Se: return 2;
				case Ce: return 8;
				case we:
				case Te: return 32;
				case Ee: return 268435456;
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
		}, t !== null && (t = lt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = ct(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Qe(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = l(n), t !== null) {
						e.blockedOn = t, Qe(e.priority, function() {
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
				qt = r, n.target.dispatchEvent(r), qt = null;
			} else return t = lt(n), t !== null && ap(t), e.blockedOn = n, !1;
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
				var a = lt(n);
				a !== null && (e.splice(t, 3), t -= 3, bs(a, {
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
			var i = n[r], a = n[r + 1], o = i[et] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[et] || null) s = o.formAction;
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
		np(n, fu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), yu(), t[tt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Ze();
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
	P.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = p(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: N,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			ke = zp.inject(Rp), W = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Us, s = Ws, c = Gs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[tt] = t.current, xd(e), new Fp(t);
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
	open: "Mitglieder",
	limited: "Berechtigte Clubfunktionen",
	restricted: "Vorstand / vertraulich"
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
}, ee = (e) => Array.isArray(e) ? e.join(", ") : e || "";
function te({ type: e, initial: t, accessClasses: n, definitions: r = E }) {
	let i = r.find((t) => t.key === e);
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
		/* @__PURE__ */ (0, _.jsx)("div", {
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
					defaultValue: ee(t[n])
				})
			] }, n))
		}),
		/* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-form-row",
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Sprache *", /* @__PURE__ */ (0, _.jsxs)("select", {
				name: "language",
				defaultValue: ee(t.language) || "de",
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
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Zugriff auf dieses Dokument *", /* @__PURE__ */ (0, _.jsx)("select", {
				name: "access",
				defaultValue: ee(t.access) || i?.access || "open",
				children: n.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
					value: e,
					children: O[e]
				}, e))
			})] })]
		}),
		/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Quelle / Urheber/in (optional)", /* @__PURE__ */ (0, _.jsx)("input", {
			name: "source",
			maxLength: 160,
			defaultValue: ee(t.source)
		})] }),
		/* @__PURE__ */ (0, _.jsx)("p", {
			className: "club-hint",
			children: "Die gewählte Zugriffsklasse gilt auch für die Dateien. «Mitglieder» bedeutet ausschliesslich berechtigte angemeldete Clubmitglieder."
		})
	] });
}
//#endregion
//#region app/components/ClubCatalog.tsx
var ne = {
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
}, j = (0, h.createContext)(ne);
function M({ children: e }) {
	let [t, n] = (0, h.useState)(ne);
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_catalog", {}, e.signal).then(n).catch(() => {}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsx)(j.Provider, {
		value: t,
		children: e
	});
}
var N = () => (0, h.useContext)(j);
function P() {
	let e = N(), [t, n] = (0, h.useState)(""), [r, i] = (0, h.useState)(!1);
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
									children: o("Mitglieder")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "limited",
									children: o("Berechtigte Clubfunktionen")
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
var F = [
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
], re = F.filter((e) => e.startsWith("TR")), I = () => ({
	model: "",
	details: "",
	year: "",
	colour: "",
	registration: "",
	status: "roadworthy",
	notes: ""
});
function L({ error: e, message: t }) {
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
function R({ title: e, children: t }) {
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "form-section",
		children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o(e) }), t]
	});
}
function z(e) {
	let t = e.trim(), n = t.replace(/\D/g, ""), r = "";
	return n.startsWith("0041") && n.length === 13 ? r = n.slice(4) : (t.startsWith("+41") || t.startsWith("0041")) && n.startsWith("41") && n.length === 11 ? r = n.slice(2) : n.startsWith("0") && n.length === 10 && (r = n.slice(1)), r.length === 9 ? `${t.startsWith("+41") || t.startsWith("0041") ? "+41 " : "0"}${r.slice(0, 2)} ${r.slice(2, 5)} ${r.slice(5, 7)} ${r.slice(7)}` : t;
}
function B({ prefix: e = "", names: t = !0, values: n = {}, mobileRequired: r = !1, formatSwissMobile: i = !1, personalDetails: a = !1 }) {
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
						e.currentTarget.value = z(e.currentTarget.value);
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
function ie({ value: e, onChange: t, application: n = !1 }) {
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
				}), F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
function V() {
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
function ae() {
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
var oe = {
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
	}
}, H = oe, U = Object.fromEntries(Object.entries(oe).map(([e, t]) => [e, "initialStatus" in t && t.initialStatus === "draft" ? {} : Object.fromEntries(t.fields.map((e) => [e.key, e.default]))])), se = Object.fromEntries(Object.entries(oe).map(([e, t]) => [e, !("initialStatus" in t && t.initialStatus === "draft")]));
function ce(e) {
	return Object.fromEntries(Object.keys({
		...U,
		...e
	}).map((t) => [t, {
		...U[t],
		...e[t]
	}]));
}
var le = (0, h.createContext)({
	values: U,
	published: se,
	loading: !0,
	refresh: async () => {},
	error: ""
});
function ue({ children: e }) {
	let [t, n] = (0, h.useState)(U), [r, i] = (0, h.useState)(""), [a, o] = (0, h.useState)(se), [s, c] = (0, h.useState)(!0), l = (0, h.useCallback)(async () => {
		try {
			let e = await C("strc_editorial", { operation: "public" });
			n(ce(e.values)), o({
				...se,
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
			n(ce(e.values)), o({
				...se,
				...e.published
			}), i(""), c(!1);
		}).catch(() => {
			e.signal.aborted || (i("Inhalte konnten nicht geladen werden."), c(!1));
		}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsx)(le.Provider, {
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
function de(e, t) {
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
function fe() {
	let e = (0, h.useContext)(le), { language: t } = n(), r = Object.fromEntries(Object.entries(e.values).map(([e, n]) => [e, de(n, t)]));
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
function pe({ html: e, className: t = "" }) {
	return /* @__PURE__ */ (0, _.jsx)("div", {
		className: `rich-content ${t}`,
		dangerouslySetInnerHTML: { __html: e }
	});
}
function me({ id: e, className: t = "" }) {
	let { text: n } = fe();
	return /* @__PURE__ */ (0, _.jsx)(pe, {
		html: n(e),
		className: t
	});
}
function he(e) {
	return e.startsWith("/") && !e.startsWith("//") ? `${window.strcSettings.assetBase ?? ""}${e}` : e;
}
function ge(e) {
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
	return he(n[t] ? `/regions/${n[t]}` : "/regions/00000326-Aarau_Obertorturm_4x3.png");
}
function _e(e) {
	return {
		backgroundImage: `url("${ge(e)}")`,
		backgroundSize: "cover",
		backgroundPosition: "center 65%",
		backgroundRepeat: "no-repeat"
	};
}
//#endregion
//#region app/components/ImageFrame.tsx
function ve(e, t = "contain") {
	let [n, r, i] = typeof e == "string" ? e.split("|") : [], a = (e) => e !== void 0 && /^\d{1,3}$/.test(e) ? Math.min(100, Math.max(0, Number(e))) : 50;
	return {
		objectFit: n === "cover" || n === "contain" ? n : t,
		objectPosition: `${a(r)}% ${a(i)}%`
	};
}
function ye({ value: e = "", image: t = "", label: n = "Bild im Rahmen", changed: r, portrait: i = !1 }) {
	let a = ve(e, i ? "cover" : "contain"), [o, s] = String(a.objectPosition).replaceAll("%", "").split(" "), c = (e, t, n) => r(`${e}|${t}|${n}`);
	return /* @__PURE__ */ (0, _.jsxs)("fieldset", {
		className: "image-frame-control",
		children: [
			/* @__PURE__ */ (0, _.jsx)("legend", { children: n }),
			t && /* @__PURE__ */ (0, _.jsx)("div", {
				className: `image-frame-preview${i ? " portrait" : ""}`,
				children: /* @__PURE__ */ (0, _.jsx)(v, {
					src: he(t),
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
function be({ documentKey: e, contained: t = !1 }) {
	let { text: n } = fe(), r = n(e + ".landingImage"), i = n(e + ".landingBody");
	if (!r && !i) return null;
	let a = r ? /* @__PURE__ */ (0, _.jsxs)("figure", {
		className: "static-cover",
		children: [/* @__PURE__ */ (0, _.jsx)(v, {
			src: he(r),
			alt: n(e + ".landingImageAlt"),
			width: 1440,
			height: 800,
			style: ve(n(e + ".landingImageFrame"))
		}), n(e + ".landingImageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: n(e + ".landingImageCaption") })]
	}) : null;
	return t ? /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "landing-introduction",
		"aria-label": o("Weitere Informationen"),
		children: [a, i && /* @__PURE__ */ (0, _.jsx)(me, { id: e + ".landingBody" })]
	}) : /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content landing-introduction",
		"aria-label": o("Weitere Informationen"),
		children: [a, i && /* @__PURE__ */ (0, _.jsx)(me, { id: e + ".landingBody" })]
	});
}
//#endregion
//#region app/components/Marketplace.tsx
var xe = [
	"Teile",
	"Fahrzeuge",
	"Zubehör",
	"Sonstiges"
], Se = (e) => Array.isArray(e.details?.parts) && e.details.parts.length ? e.details.parts : [e.title];
function Ce(e) {
	return e.details?.offerType === "free" ? "Kostenlos" : e.details?.offerType === "swap" ? "Tausch" : e.details?.priceMode === "request" ? "Preis auf Anfrage" : we.format(Number(e.price)) + (e.details?.priceMode === "negotiable" ? " VB" : "");
}
var we = new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: "CHF"
}), Te = window.strcSettings.wordpressUrl ?? "http://localhost:8080", Ee = window.strcSettings.siteUrl ?? "http://localhost:3000", De = `${Te}/wp-login.php?redirect_to=${encodeURIComponent(`${Ee}/#marktplatz`)}`;
function Oe(e, t) {
	return C("strc_marketplace", e, t);
}
function ke(e, t) {
	return w("strc_marketplace", t, e);
}
function W({ title: e, close: t, busy: n = !1, children: r }) {
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
function Ae({ section: e, session: t, notify: n }) {
	let { text: r } = fe(), i = e === "ersatzteile" ? "parts" : e === "fahrzeuge" ? "cars" : e === "meine" ? "mine" : "landing", [a, s] = (0, h.useState)({
		ads: [],
		total: 0,
		pages: 0
	}), [c, l] = (0, h.useState)(!0), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(null), C = N(), [w] = (0, h.useState)(e === "meine"), [T, E] = (0, h.useState)(1), [D, O] = (0, h.useState)(0), [k, A] = (0, h.useState)(!1), [ee, te] = (0, h.useState)(null), [ne, j] = (0, h.useState)(null), M = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		if (i === "landing") return;
		let e = new AbortController(), t = window.setTimeout(() => {
			l(!0), d(""), Oe({
				operation: "list",
				mine: w ? "1" : "0",
				search: i === "parts" ? "" : f,
				category: i === "parts" ? "parts" : i === "cars" ? "Fahrzeuge" : "",
				model: i === "parts" ? m : "",
				partCategory: i === "parts" ? y : "",
				page: String(T)
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
		w,
		t?.memberAccess,
		T,
		D
	]), (0, h.useEffect)(() => {
		if (i !== "mine" || !t?.memberAccess) return;
		let e = Number(window.location.hash.split("/")[2]);
		if (!Number.isSafeInteger(e) || e < 1) return;
		let n = new AbortController();
		return Oe({
			operation: "get",
			id: String(e)
		}, n.signal).then((e) => {
			e.mine ? j(e) : d(o("Dieses Inserat gehört nicht zu deinem Konto."));
		}).catch((e) => {
			n.signal.aborted || d(e.message);
		}), () => n.abort();
	}, [i, t?.memberAccess]);
	function P() {
		l(!0), O((e) => e + 1);
	}
	function re(e) {
		l(!0), e(), E(1);
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
		/* @__PURE__ */ (0, _.jsx)(be, { documentKey: "market" }),
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
	let I = i === "parts", L = w ? o("Meine Inserate") : r(I ? "market.partsTitle" : "market.carsTitle");
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Marktplatz")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: L }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: w ? o("Ihre Inserate mit Status – bearbeiten, verlängern oder als verkauft markieren.") : r(I ? "market.partsText" : "market.carsText") })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content marketplace market-section",
			"aria-label": L,
			children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-toolbar",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: w ? o("Meine Inserate") : I ? "Ersatzteile finden" : "Fahrzeuge entdecken" }), /* @__PURE__ */ (0, _.jsx)("p", { children: w ? o("Ein Inserat öffnen, um es zu bearbeiten.") : I ? r("market.partsGuide") : "Entdecke Triumphs aus dem Club und öffne ein Inserat für Bilder und Details." })] }), t?.canCreateAd && /* @__PURE__ */ (0, _.jsx)("button", {
						ref: M,
						className: "market-primary",
						onClick: () => A(!0),
						children: "＋ Inserat erstellen"
					})]
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-filters market-part-filters",
					children: [I && /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: ["Triumph-Modell", /* @__PURE__ */ (0, _.jsxs)("select", {
							value: m,
							onChange: (e) => re(() => g(e.target.value)),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Modelle")
							}), F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: e
							}, e))]
						})]
					}), I ? /* @__PURE__ */ (0, _.jsxs)("label", {
						className: "market-search",
						children: [o("Teilebereich"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: y,
							onChange: (e) => re(() => b(e.target.value)),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Teilebereiche")
							}), C.parts.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
							onChange: (e) => re(() => p(e.target.value))
						})]
					})]
				}),
				I && !w && !m && !y ? /* @__PURE__ */ (0, _.jsx)("p", {
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
						onClick: P,
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
							w ? "" : I ? " mit verfügbaren Teilen" : " mit Fahrzeugen"
						]
					}),
					a.ads.length ? I ? /* @__PURE__ */ (0, _.jsx)("ul", {
						className: "market-parts-list",
						"aria-label": "Verfügbare Teile",
						children: a.ads.flatMap((e) => Se(e).map((t, n) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							onClick: () => j(e),
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
										Se(e).length > 1 ? `${Se(e).length} Teile in einem Inserat · ` : "",
										e.details?.model || e.category,
										" · ",
										e.title
									] })]
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "market-part-price",
									children: [Ce(e), Se(e).length > 1 && /* @__PURE__ */ (0, _.jsx)("small", { children: "für das Inserat" })]
								})
							]
						}) }, `${e.id}-${n}`)))
					}) : /* @__PURE__ */ (0, _.jsx)("div", {
						className: "market-grid",
						children: a.ads.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "market-card",
							children: [/* @__PURE__ */ (0, _.jsxs)("button", {
								className: "market-card-open",
								onClick: () => j(e),
								"aria-label": `${e.title}, ${Ce(e)}, Details ansehen`,
								children: [/* @__PURE__ */ (0, _.jsxs)("div", {
									className: "market-card-image",
									children: [e.images[0] ? /* @__PURE__ */ (0, _.jsx)(v, {
										unoptimized: !0,
										src: e.images[0],
										alt: e.title,
										width: 600,
										height: 420
									}) : /* @__PURE__ */ (0, _.jsx)("span", { children: "Ohne Bild" }), e.sold && /* @__PURE__ */ (0, _.jsx)("b", {
										className: "market-sold",
										children: "Verkauft"
									})]
								}), /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "market-card-copy",
									children: [
										/* @__PURE__ */ (0, _.jsx)("h3", { children: e.title }),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: Ce(e) }),
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
								disabled: T === 1,
								onClick: () => {
									l(!0), E(T - 1);
								},
								children: o("Zurück")
							}),
							/* @__PURE__ */ (0, _.jsxs)("span", { children: [
								o("Seite"),
								" ",
								T,
								" ",
								o("von"),
								" ",
								a.pages
							] }),
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: T >= a.pages,
								onClick: () => {
									l(!0), E(T + 1);
								},
								children: o("Weiter")
							})
						]
					})
				] })
			]
		}),
		k && /* @__PURE__ */ (0, _.jsx)(je, {
			session: t,
			initialCategory: I ? "Teile" : "Fahrzeuge",
			close: () => A(!1),
			created: () => {
				A(!1), p(""), g(""), E(1), P(), S("created");
			}
		}),
		ee && /* @__PURE__ */ (0, _.jsx)(je, {
			ad: ee,
			session: t,
			initialCategory: ee.category === "Fahrzeuge" ? "Fahrzeuge" : "Teile",
			close: () => te(null),
			created: () => {
				te(null), P(), S("edited");
			}
		}),
		x && /* @__PURE__ */ (0, _.jsx)(W, {
			title: o("Vielen Dank!"),
			close: () => {
				S(null), requestAnimationFrame(() => M.current?.focus());
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
					/* @__PURE__ */ (0, _.jsx)("p", { children: o("Das Marktplatz-Team prüft das Inserat in der Regel innert ein bis zwei Tagen. Sobald es veröffentlicht ist, erhalten Sie eine Nachricht per E-Mail und im Dashboard.") }),
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
								S(null), requestAnimationFrame(() => M.current?.focus());
							},
							children: o("Schliessen")
						})
					})
				]
			})
		}),
		ne && /* @__PURE__ */ (0, _.jsx)(Me, {
			edit: () => {
				te(ne), j(null);
			},
			ad: ne,
			session: t,
			close: () => j(null),
			sold: () => {
				j(null), P(), n("Inserat gespeichert."), requestAnimationFrame(() => M.current?.focus());
			}
		})
	] });
}
function je({ ad: e, session: t, initialCategory: n, close: r, created: i }) {
	let a = N(), [s, c] = (0, h.useState)(e?.title || ""), [l, u] = (0, h.useState)(e?.price || ""), [d, f] = (0, h.useState)(String(e?.details.offerType || "sale")), [p, m] = (0, h.useState)(String(e?.details.priceMode || "fixed")), [g, y] = (0, h.useState)(e?.description || ""), [b, x] = (0, h.useState)(e?.category || n), [S, C] = (0, h.useState)(Array.isArray(e?.details.parts) ? e.details.parts.join("\n") : ""), [w, T] = (0, h.useState)(e?.imageIds || []), [E, D] = (0, h.useState)([]), [O, k] = (0, h.useState)((e?.documents || []).map((e) => e.key)), [A, ee] = (0, h.useState)([]), te = (0, h.useRef)(/* @__PURE__ */ new Set()), [ne, j] = (0, h.useState)(!1), [M, P] = (0, h.useState)(!1), re = (0, h.useRef)(!1), [I, L] = (0, h.useState)(""), [R, z] = (0, h.useState)(""), [B, ie] = (0, h.useState)(!1), V = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		let e = te.current;
		return () => {
			e.forEach((e) => URL.revokeObjectURL(e));
		};
	}, []);
	function ae() {
		s || l || g || S || A.length || E.length ? ie(!0) : r();
	}
	function oe(e) {
		if (z(""), w.length + A.length + e.length > 5) {
			z("Bitte höchstens 5 Bilder auswählen.");
			return;
		}
		if (e.some((e) => ![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(e.type) || !e.size || e.size > 20 * 1024 * 1024)) {
			z("Bitte JPG, PNG oder WebP verwenden, maximal 20 MB pro Bild.");
			return;
		}
		ee((t) => [...t, ...e.map((e) => {
			let t = URL.createObjectURL(e);
			return te.current.add(t), {
				file: e,
				url: t
			};
		})]);
	}
	return /* @__PURE__ */ (0, _.jsx)(W, {
		title: o(e ? "Inserat bearbeiten" : "Inserat erstellen"),
		close: ae,
		busy: M,
		children: t ? !t?.canCreateAd || !t.marketplaceNonce ? /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "market-login",
			children: [/* @__PURE__ */ (0, _.jsx)("p", { children: "Mit Ihrem Mitgliedskonto können Sie ein Inserat veröffentlichen. Titel, Preis, Beschreibung und Bilder sind öffentlich sichtbar. Ihre E-Mail-Adresse sehen nur angemeldete Mitglieder." }), /* @__PURE__ */ (0, _.jsx)("a", {
				className: "market-primary",
				href: De,
				children: o("Mitglieder-Login")
			})]
		}) : /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "market-form",
			onSubmit: async (n) => {
				if (n.preventDefault(), re.current) return;
				if (d === "sale" && p !== "request" && (!/^\d{1,7}([.,]\d{1,2})?$/.test(l.trim()) || Number(l.replace(",", ".")) > 1e6)) {
					L("Bitte einen Preis von CHF 0 bis CHF 1’000’000 mit höchstens zwei Nachkommastellen eingeben.");
					return;
				}
				re.current = !0, P(!0), L("");
				let r = new FormData(n.currentTarget);
				r.set("offerType", d), r.set("priceMode", p), r.set("operation", e ? "edit" : "create"), e && (r.set("retainedDocumentKeys", JSON.stringify(O)), r.set("id", String(e.id)), r.set("retainedImageIds", JSON.stringify(w))), r.set("title", s), r.set("price", l), r.set("description", g), r.set("category", b), r.set("parts", S), r.set("models", JSON.stringify(r.getAll("models[]"))), r.delete("models[]"), A.forEach((e) => r.append("images[]", e.file)), E.forEach((e) => r.append("documents[]", e));
				try {
					await ke(r, t.marketplaceNonce), i();
				} catch (e) {
					L(e instanceof Error ? e.message : "Speichern fehlgeschlagen."), requestAnimationFrame(() => V.current?.focus());
				} finally {
					re.current = !1, P(!1);
				}
			},
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "market-form-intro",
					children: "In wenigen Schritten online. Pflichtfelder sind mit * markiert. Gesuche gehören ins Forum."
				}),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: M,
					children: [
						/* @__PURE__ */ (0, _.jsx)("legend", {
							className: "market-sr-only",
							children: "Angaben zum Inserat"
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `market-dropzone ${ne ? "is-dragging" : ""}`,
							onDragOver: (e) => {
								e.preventDefault(), M || j(!0);
							},
							onDragLeave: () => j(!1),
							onDrop: (e) => {
								e.preventDefault(), j(!1), M || oe(Array.from(e.dataTransfer.files));
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
										oe(Array.from(e.target.files || [])), e.target.value = "";
									}
								}),
								/* @__PURE__ */ (0, _.jsx)("small", {
									id: "ad-images-hint",
									children: "Optional · bis zu 5 Bilder · JPG, PNG, WebP · je 20 MB"
								})
							]
						}),
						R && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "market-error",
							role: "alert",
							children: R
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
										URL.revokeObjectURL(e.url), te.current.delete(e.url), ee((t) => t.filter((t) => t.url !== e.url)), z("");
									},
									children: "×"
								})
							] }, e.url))
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
								children: (n === "Fahrzeuge" ? ["Fahrzeuge"] : xe.filter((e) => e !== "Fahrzeuge")).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))
							})] })]
						}),
						/* @__PURE__ */ (0, _.jsxs)("section", {
							className: "form-section",
							children: [
								/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("PDF-Anhänge (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
									type: "file",
									accept: "application/pdf,.pdf",
									multiple: !0,
									onChange: (e) => {
										let t = Array.from(e.target.files || []);
										if (e.target.value = "", t.length + E.length + O.length > 3 || t.some((e) => e.size > 10 * 1024 * 1024 || !e.size || !e.name.toLowerCase().endsWith(".pdf"))) {
											z(o("Bitte höchstens drei PDFs mit je maximal 10 MB auswählen."));
											return;
										}
										z(""), D((e) => [...e, ...t]);
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
							]
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
							}), F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: e
							}, e))]
						})] }) : /* @__PURE__ */ (0, _.jsxs)("fieldset", {
							className: "market-model-options",
							children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Passende Modelle (optional)") }), F.map((t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
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
						/* @__PURE__ */ (0, _.jsxs)("small", { children: [g.length, "/5000 Zeichen"] })
					]
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "market-privacy",
					children: "Interessenten erreichen Sie über das Kontaktformular im Inserat. Ihre persönlichen Kontaktdaten werden nicht öffentlich angezeigt."
				}),
				I && /* @__PURE__ */ (0, _.jsx)("p", {
					ref: V,
					tabIndex: -1,
					className: "market-error",
					role: "alert",
					children: I
				}),
				B ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-discard",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", { children: "Ungespeichertes Inserat verwerfen?" }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							onClick: () => ie(!1),
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
						disabled: M,
						onClick: ae,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						type: "submit",
						disabled: M,
						children: o(M ? "Wird gesendet …" : "Absenden")
					})]
				})
			]
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: "Anmeldung wird geprüft …"
		})
	});
}
function Me({ ad: e, session: t, close: n, sold: r, edit: i }) {
	let [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(!1);
	return /* @__PURE__ */ (0, _.jsxs)(W, {
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
				children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [e.category, e.sold ? " · Verkauft" : ""] }), /* @__PURE__ */ (0, _.jsx)("strong", { children: Ce(e) })]
			}),
			e.category === "Teile" && Array.isArray(e.details?.parts) && e.details.parts.length > 0 && /* @__PURE__ */ (0, _.jsxs)("section", {
				className: "market-detail-parts",
				children: [
					/* @__PURE__ */ (0, _.jsx)("h3", { children: "Enthaltene Teile" }),
					/* @__PURE__ */ (0, _.jsx)("ul", { children: e.details.parts.map((e, t) => /* @__PURE__ */ (0, _.jsx)("li", { children: e }, `${e}-${t}`)) }),
					e.details.parts.length > 1 && /* @__PURE__ */ (0, _.jsx)("p", { children: "Der angezeigte Preis gilt für das gesamte Inserat." })
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
			e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(pe, { html: e.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", {
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
				href: De,
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
							i.set("operation", n), i.set("id", String(e.id)), await ke(i, t?.marketplaceNonce || ""), r();
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
								await ke(n, t?.marketplaceNonce || ""), r();
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
						await ke(r, t?.marketplaceNonce || await Oe({ operation: "config" }).then((e) => e.nonce) || ""), l(!0);
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
var Ne = {
	information: "Details",
	scheduled: "Bald offen",
	open: "Anmelden",
	closed: "Geschlossen",
	full: "Ausgebucht",
	waiting: "Warteliste"
}, Pe = (e) => e ? new Date(e).toLocaleDateString("de-CH") : "–", Fe = (e) => e.scope?.slug === "region" || e.region ? "Region" : e.scope?.slug === "external" ? "Extern" : "Club";
function Ie({ location: e }) {
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
function Le({ event: e, memberAccess: t }) {
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
function Re({ events: e, eventsState: t, retryEvents: n, openEvent: r, memberAccess: i }) {
	let { text: a } = fe(), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)([]), [d, f] = (0, h.useState)(""), [p, m] = (0, h.useState)(!0), [g, v] = (0, h.useState)(0);
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
							children: Pe(e.startAt)
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
							children: o(Fe(e))
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Ort",
							children: /* @__PURE__ */ (0, _.jsx)(Ie, { location: e.location })
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
							children: Pe(e.registrationCloseAt)
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Teilnehmende",
							children: /* @__PURE__ */ (0, _.jsx)(Le, {
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
								children: e.externalRegistrationUrl ? "Extern anmelden ↗" : Ne[e.registrationStatus]
							}) : /* @__PURE__ */ (0, _.jsx)("button", {
								className: "agenda-status",
								onClick: () => r(e),
								children: t ? "Rückblick" : Ne[e.registrationStatus]
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
		/* @__PURE__ */ (0, _.jsx)(be, { documentKey: "agenda" }),
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
var ze = `${window.strcSettings.assetBase ?? ""}/fonts/StrcSans`, Be = `@font-face{font-family:"STRC Sans";src:url(${ze}-Regular.ttf) format("truetype");font-weight:400;size-adjust:109%}@font-face{font-family:"STRC Sans";src:url(${ze}-Bold.ttf) format("truetype");font-weight:700;size-adjust:109%}@font-face{font-family:"STRC Sans";src:url(${ze}-Italic.ttf) format("truetype");font-weight:400;font-style:italic;size-adjust:109%}`;
function Ve({ label: e, value: t, onChange: n, disabled: r = !1 }) {
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
						content_style: Be + "body{font-family:\"STRC Sans\",Arial,sans-serif;font-size:18px;line-height:1.65;color:#13202b}img{max-width:100%;height:auto}p,h2,h3,h4,span.strc-tab{white-space:pre-wrap;tab-size:8}",
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
var He = {
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
	strc_board_member: "Vorstandsmitglied",
	strc_developer: "Webmaster",
	strc_moderator: "Bisherige Bereichszuständigkeit"
}, Ue = {
	open: "Mitgliederunterlagen",
	limited: "Zusätzlich: berechtigte Clubfunktionen",
	restricted: "Vorstandsunterlagen"
};
function We({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(0), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_editorial", { operation: "people" }, e.signal).then((e) => {
			n(e), i(null), g("");
		}).catch((t) => {
			e.signal.aborted || g(t.message);
		}), () => e.abort();
	}, [u]);
	function b(e, t) {
		r && i({
			...r,
			assignments: r.assignments.map((n, r) => r === e ? {
				...n,
				...t
			} : n)
		});
	}
	async function x() {
		if (r) {
			p(!0), g(""), y("");
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
				}), y("Rollen und Zuständigkeiten gespeichert.");
			} catch (e) {
				g(e.message);
			} finally {
				p(!1);
			}
		}
	}
	let S = !!t && (!!t.roleOptions.strc_developer || !r?.assignments.some((e) => ["strc_administrator", "strc_developer"].includes(e.role))), E = a.trim().toLocaleLowerCase("de-CH"), D = t?.users.filter((e) => `${e.name} ${e.city}`.toLocaleLowerCase("de-CH").includes(E)) || [], O = t?.users.filter((e) => e.assignments.length > 0) || [], k = (e) => {
		s(""), i({
			...e,
			assignments: e.assignments.map((e) => ({
				...e,
				regions: [...e.regions],
				areas: [...e.areas],
				assignedEvents: [...e.assignedEvents]
			}))
		}), l(""), y(""), g("");
	};
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "role-assignment-panel",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Moderatorrollen") }),
			m && /* @__PURE__ */ (0, _.jsxs)("p", {
				role: "alert",
				children: [
					o(m),
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
			v && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o(v)
			}),
			t ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitgliedersuche"), /* @__PURE__ */ (0, _.jsx)("input", {
					type: "search",
					value: a,
					onChange: (e) => {
						s(e.target.value), i(null), l(""), y("");
					},
					disabled: f
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Person | Ort (Suchresultat)"), /* @__PURE__ */ (0, _.jsxs)("select", {
					value: r?.id || "",
					disabled: f,
					onChange: (e) => {
						let n = t.users.find((t) => t.id === Number(e.target.value));
						n ? k(n) : i(null);
					},
					children: [/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: o("Person wählen")
					}), D.map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
						value: e.id,
						children: [e.name, e.city ? " | " + e.city : ""]
					}, e.id))]
				})] }),
				!D.length && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine passenden Personen gefunden.") }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "role-assignment-columns",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [
						/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Rollenzuteilung") }),
						r && !S && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Dieses Konto verwaltet der Webmaster.") }),
						r ? /* @__PURE__ */ (0, _.jsxs)("fieldset", {
							disabled: f || !S,
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
											/* @__PURE__ */ (0, _.jsx)("strong", { children: o(He[e.role] || t.roleOptions[e.role] || e.role) }),
											/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Region"), /* @__PURE__ */ (0, _.jsx)("select", {
												multiple: !0,
												"aria-label": o("Region"),
												disabled: !a || !s,
												value: e.regions.map(String),
												onChange: (e) => b(n, { regions: Array.from(e.target.selectedOptions, (e) => Number(e.value)) }),
												children: t.regions.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
													value: e.id,
													children: e.name
												}, e.id))
											})] }),
											!s && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Clubweite Funktion") }),
											/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Dokumente"), /* @__PURE__ */ (0, _.jsxs)("select", {
												disabled: !a || e.role === "strc_board_member",
												value: e.role === "strc_board_member" ? "restricted" : e.libraryAccess,
												onChange: (e) => b(n, { libraryAccess: e.target.value }),
												children: [
													/* @__PURE__ */ (0, _.jsx)("option", {
														value: "open",
														children: o(Ue.open)
													}),
													/* @__PURE__ */ (0, _.jsx)("option", {
														value: "limited",
														children: o(Ue.limited)
													}),
													(e.libraryAccess === "restricted" || e.role === "strc_board_member") && /* @__PURE__ */ (0, _.jsx)("option", {
														value: "restricted",
														children: o(Ue.restricted)
													})
												]
											})] }),
											e.role === "strc_event_organiser" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Zugewiesene Veranstaltungen"), /* @__PURE__ */ (0, _.jsx)("select", {
												multiple: !0,
												value: e.assignedEvents.map(String),
												disabled: !a,
												onChange: (e) => b(n, { assignedEvents: Array.from(e.target.selectedOptions, (e) => Number(e.value)) }),
												children: t.events.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
													value: e.id,
													children: e.title
												}, e.id))
											})] }),
											e.role === "strc_moderator" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bereiche"), /* @__PURE__ */ (0, _.jsx)("select", {
												multiple: !0,
												value: e.areas,
												onChange: (e) => b(n, { areas: Array.from(e.target.selectedOptions, (e) => e.value) }),
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
										children: o(He[e] || t)
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
												libraryAccess: "open",
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
									onClick: () => void x(),
									children: o("Rollen und Zuständigkeiten speichern")
								})
							]
						}) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Wähle zuerst ein Mitglied.") })
					] }), /* @__PURE__ */ (0, _.jsxs)("aside", { children: [/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
						o("Resultierende Rollen"),
						" · ",
						O.length
					] }), O.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
						className: "role-assignment-result",
						children: [/* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							className: "card-title-button",
							disabled: f,
							onClick: () => k(e),
							children: [e.name, e.city ? " | " + e.city : ""]
						}), e.assignments.map((e) => /* @__PURE__ */ (0, _.jsxs)("p", { children: [
							o(He[e.role] || e.role),
							" | ",
							e.regions.length ? e.regions.map((e) => t.regions.find((t) => t.id === e)?.name || String(e)).join(", ") : o("Clubweit"),
							" | ",
							o(Ue[e.role === "strc_board_member" ? "restricted" : e.libraryAccess])
						] }, e.role))]
					}, e.id))] })]
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
function Ge({ nonce: e }) {
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
function Ke({ docKey: e, nonce: t, disabled: n, uploadState: r }) {
	let [i, a] = (0, h.useState)([]), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(null), [d, f] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let t = new AbortController();
		return C("strc_editorial", {
			operation: "documents",
			key: e
		}, t.signal).then((e) => a(e.documents)).catch((e) => {
			t.signal.aborted || c(e.message);
		}), () => t.abort();
	}, [e]);
	async function p(i) {
		if (!(d || n)) {
			if (i.size > 50 * 1024 * 1024) {
				c("Bitte ein PDF bis 50 MB wählen.");
				return;
			}
			f(!0), r(!0), c("");
			try {
				let n = new FormData();
				n.set("operation", "upload-document"), n.set("key", e), n.set("file", i);
				let r = await w("strc_editorial", t, n);
				a((e) => [r, ...e]);
			} catch (e) {
				c(e.message);
			} finally {
				f(!1), r(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "editorial-pdfs",
		children: [
			/* @__PURE__ */ (0, _.jsx)("summary", { children: "Öffentliche PDFs hochladen und verlinken" }),
			/* @__PURE__ */ (0, _.jsxs)("p", { children: [
				"Zum Beispiel Statuten: PDF hochladen, Link kopieren und über «Link einfügen» im Text verknüpfen. Diese Dateien sind öffentlich zugänglich. Interne Dokumente gehören in die ",
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: "#bibliothek",
					children: o("Bibliothek")
				}),
				"."
			] }),
			/* @__PURE__ */ (0, _.jsxs)("label", { children: ["PDF bis 50 MB", /* @__PURE__ */ (0, _.jsx)("input", {
				type: "file",
				accept: "application/pdf,.pdf",
				disabled: n || d,
				onChange: (e) => {
					let t = e.target.files?.[0];
					e.target.value = "", t && p(t);
				}
			})] }),
			d && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: "PDF wird hochgeladen …"
			}),
			s && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: s
			}),
			/* @__PURE__ */ (0, _.jsx)("ul", { children: i.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: e.title
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "button",
					className: "club-secondary",
					onClick: async () => {
						try {
							await navigator.clipboard.writeText(e.url), u(e.id);
						} catch {
							c("Bitte die Linkadresse im Feld markieren und kopieren.");
						}
					},
					children: "Link kopieren"
				}),
				/* @__PURE__ */ (0, _.jsx)("input", {
					"aria-label": "Link zu " + e.title,
					value: e.url,
					readOnly: !0,
					onFocus: (e) => e.target.select()
				}),
				l === e.id && /* @__PURE__ */ (0, _.jsx)("span", {
					role: "status",
					children: "Link kopiert."
				})
			] }, e.id)) })
		]
	});
}
//#endregion
//#region app/components/RegionalContent.tsx
function qe({ documentKey: e, values: t = {}, events: n, canEdit: r = !1 }) {
	let i = (e) => typeof t[e] == "string" ? t[e] : "", a = e === "triungsters", s = (e, t) => i(e).replace(/<[^>]+>/g, "").trim() ? /* @__PURE__ */ (0, _.jsx)(pe, { html: i(e) }) : /* @__PURE__ */ (0, _.jsx)("p", {
		className: "regional-empty",
		children: o(t)
	}), c = /^https:\/\//i.test(i("whatsappUrl")) ? i("whatsappUrl") : "";
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "regional-content",
		children: [
			/* @__PURE__ */ (0, _.jsx)("div", {
				className: "regional-toolbar",
				children: /* @__PURE__ */ (0, _.jsx)("a", {
					className: "club-secondary",
					href: r ? "#redaktion/" + e : "#mitglieder",
					children: o(r ? a ? "TRiungsters bearbeiten" : "Region bearbeiten" : "Moderator-Login")
				})
			}),
			i("image") && /* @__PURE__ */ (0, _.jsxs)("figure", {
				className: "static-cover",
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					src: he(i("image")),
					alt: i("imageAlt") || i("title"),
					width: 1440,
					height: 800,
					style: ve(i("imageFrame"))
				}), i("imageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: i("imageCaption") })]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "regional-grid",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel",
						children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Kontakt") }), /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "regional-contact",
							children: [i("contactImage") ? /* @__PURE__ */ (0, _.jsx)(v, {
								src: he(i("contactImage")),
								alt: i("contactName") || o("Ansprechperson"),
								width: 160,
								height: 160,
								style: ve(i("contactImageFrame"), "cover")
							}) : /* @__PURE__ */ (0, _.jsx)("div", {
								className: "regional-avatar",
								"aria-hidden": "true",
								children: "◉"
							}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [
								/* @__PURE__ */ (0, _.jsx)("h3", { children: i("contactName") || o("Ansprechperson folgt") }),
								/* @__PURE__ */ (0, _.jsx)("p", { children: i("contactRole") || o(a ? "TRiungsters-Kontakt" : "Regionalleitung") }),
								i("contactPhone") && /* @__PURE__ */ (0, _.jsx)("a", {
									href: "tel:" + i("contactPhone").replace(/[^+\d]/g, ""),
									children: i("contactPhone")
								}),
								i("contactEmail") && /* @__PURE__ */ (0, _.jsx)("a", {
									href: "mailto:" + encodeURIComponent(i("contactEmail")),
									children: i("contactEmail")
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Treffpunkt") }),
							/* @__PURE__ */ (0, _.jsx)("h3", { children: i("meetName") || o("Treffpunkt wird ergänzt") }),
							i("meetAddress") && /* @__PURE__ */ (0, _.jsx)("p", { children: i("meetAddress") }),
							i("meetSchedule") && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "regional-schedule",
								children: i("meetSchedule").replace(/\s*\|\s*/g, "\n")
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel",
						children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Nächste Treffen") }), s("meetDates", "Die nächsten Stammtischtermine werden hier ergänzt.")]
					}),
					/* @__PURE__ */ (0, _.jsxs)("section", {
						className: "regional-panel regional-whatsapp",
						children: [
							/* @__PURE__ */ (0, _.jsx)("h2", { children: o("WhatsApp-Gruppe") }),
							i("whatsappQr") && /* @__PURE__ */ (0, _.jsx)(v, {
								src: he(i("whatsappQr")),
								alt: o("QR-Code zur WhatsApp-Gruppe"),
								width: 180,
								height: 180
							}),
							/* @__PURE__ */ (0, _.jsx)("p", { children: o(c ? "In Verbindung bleiben und sich für die nächste Ausfahrt verabreden." : "Der Gruppenlink wird noch ergänzt.") }),
							c && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: c,
								target: "_blank",
								rel: "noopener noreferrer",
								children: o("Gruppe beitreten")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel",
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o(a ? "Über die TRiungsters" : "Regionale Informationen") }), s("body", "Informationen zu unserer Gemeinschaft folgen.")]
			}),
			/* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel",
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o(a ? "TRiungsters-News" : "Regionale Neuigkeiten") }), s("news", "Noch keine Neuigkeiten veröffentlicht.")]
			}),
			/* @__PURE__ */ (0, _.jsxs)("section", {
				className: "regional-panel regional-events-panel",
				children: [
					/* @__PURE__ */ (0, _.jsx)("h2", { children: o(a ? "Veranstaltungen" : "Regionale Veranstaltungen") }),
					i("eventBody") && /* @__PURE__ */ (0, _.jsx)(pe, { html: i("eventBody") }),
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
			})
		]
	});
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
			src: he(t.url),
			alt: t.alt,
			width: 900,
			height: 600,
			style: ve(t.frame)
		}), t.alt && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: t.alt })]
	}, e + ":" + n));
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "history-story",
		children: [i(0), n.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "history-text-block",
			children: [/* @__PURE__ */ (0, _.jsx)(pe, { html: e }), i(t + 1)]
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
						src: he(e.image),
						alt: e.name ? `${o("Porträt von")} ${e.name}` : o("Porträt"),
						width: 400,
						height: 500,
						style: ve(e.frame, "cover")
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
], G = (e, t) => typeof e[t] == "string" ? e[t] : "";
function $e(e) {
	let t = H[e];
	return t ? Object.fromEntries(t.fields.map((e) => [e.key, e.default])) : {};
}
function et({ model: e }) {
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
function tt({ values: e, model: t, unpublished: n = !1, preview: r = !1 }) {
	let i = G(e, "image"), a = G(e, "exampleNote");
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "vehicle-detail-content",
		children: [
			r && /* @__PURE__ */ (0, _.jsx)("h2", { children: G(e, "title") || t }),
			(n || a) && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-example-note",
				children: n ? o("Beispielansicht · redaktioneller Inhalt noch nicht veröffentlicht") : a
			}),
			/* @__PURE__ */ (0, _.jsxs)("figure", {
				className: "vehicle-detail-cover",
				children: [
					i ? /* @__PURE__ */ (0, _.jsx)(v, {
						src: he(i),
						alt: G(e, "imageAlt") || t,
						width: 1e3,
						height: 600,
						style: ve(e.imageFrame)
					}) : /* @__PURE__ */ (0, _.jsx)(et, { model: t }),
					" ",
					G(e, "imageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: G(e, "imageCaption") })
				]
			}),
			G(e, "intro") && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-detail-intro",
				children: G(e, "intro")
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "vehicle-detail-layout",
				children: [/* @__PURE__ */ (0, _.jsxs)("article", {
					className: `vehicle-detail-copy${G(e, "bodySecondary").replace(/<[^>]*>/g, "").trim() ? " two-columns" : ""}`,
					children: [
						G(e, "body") && /* @__PURE__ */ (0, _.jsx)(pe, { html: G(e, "body") }),
						" ",
						G(e, "bodySecondary") && /* @__PURE__ */ (0, _.jsx)(pe, { html: G(e, "bodySecondary") })
					]
				}), /* @__PURE__ */ (0, _.jsxs)("aside", {
					className: "vehicle-factbox",
					children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: G(e, "factsTitle") || o("Fahrzeugdaten") }), typeof e.factsBody == "string" ? /* @__PURE__ */ (0, _.jsx)(pe, { html: e.factsBody }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dl", { children: Qe.filter(([t]) => G(e, t)).map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(n) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: G(e, t) })] }, t)) }), G(e, "factsNote") && /* @__PURE__ */ (0, _.jsx)(pe, { html: G(e, "factsNote") })] })]
				})]
			})
		]
	});
}
function nt({ compact: e = !1, initialSelected: t = "", canEdit: n = !1 }) {
	let { values: r, published: i, error: a, refresh: s } = fe(), c = Ze.find((e) => e.toLowerCase() === t.toLowerCase()) || "", [l, u] = (0, h.useState)(c);
	function d(e) {
		let t = "model-" + e.toLowerCase();
		return i[t] ? r[t] || {} : $e(t);
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
						G(n, "image") ? /* @__PURE__ */ (0, _.jsx)("div", {
							className: "vehicle-card-image",
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								src: he(G(n, "image")),
								alt: G(n, "imageAlt") || t,
								width: 600,
								height: 360,
								style: ve(n.imageFrame)
							})
						}) : /* @__PURE__ */ (0, _.jsx)(et, { model: t }),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "vehicle-card-caption",
							children: /* @__PURE__ */ (0, _.jsx)("strong", { children: G(n, "title") || t })
						}),
						!e && /* @__PURE__ */ (0, _.jsx)("p", { children: o(i["model-" + t.toLowerCase()] && !G(n, "exampleNote") ? "Porträt & Fahrzeugdaten" : "Beispielansicht · Bild und Daten folgen") })
					]
				}, t);
			})
		}),
		l && /* @__PURE__ */ (0, _.jsxs)(W, {
			title: G(d(l), "title") || l,
			close: p,
			children: [/* @__PURE__ */ (0, _.jsx)(tt, {
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
function rt({ selected: e = "", canEdit: t = !1 }) {
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
		}), /* @__PURE__ */ (0, _.jsx)(nt, {
			initialSelected: e,
			canEdit: t
		})]
	})] });
}
//#endregion
//#region app/components/ShopOperations.tsx
function it({ nonce: e, close: t, saved: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)(!1), [c, l] = (0, h.useState)(""), u = (0, h.useRef)(crypto.randomUUID());
	function d(e, t, n) {
		i((r) => r.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}
	return /* @__PURE__ */ (0, _.jsx)(W, {
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
function at({ nonce: e }) {
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
var ot = (e, t, n) => new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: t,
	minimumFractionDigits: n,
	maximumFractionDigits: n
}).format(Number(e) / 10 ** n), st = [
	"",
	"artikel",
	"lager",
	"abrechnung"
], ct = () => {
	let e = typeof window > "u" ? "" : window.location.hash.split("/")[1] || "";
	return st.includes(e) ? e : "";
};
function lt() {
	let [e, t] = (0, h.useState)(ct);
	(0, h.useEffect)(() => {
		let e = () => t(ct());
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
				children: [/* @__PURE__ */ (0, _.jsx)(ut, { view: "stock" }), d.ordersUrl && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: d.ordersUrl,
					children: o("Bestand in WooCommerce anpassen →")
				}) })]
			}) : S === "abrechnung" && d ? /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-admin-view",
				children: [
					(d.canInspect || d.canManage) && /* @__PURE__ */ (0, _.jsx)(ut, { view: "orders" }),
					d.canManage && /* @__PURE__ */ (0, _.jsx)(at, { nonce: d.nonce || "" }),
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
								/* @__PURE__ */ (0, _.jsx)("strong", { children: ot(e.prices.price, e.prices.currency_code, e.prices.currency_minor_unit) }),
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
			i && d && /* @__PURE__ */ (0, _.jsx)(it, {
				nonce: d.nonce || "",
				close: () => a(!1),
				saved: (e, t) => {
					c(e), r(t), a(!1);
				}
			})
		]
	});
}
function ut({ view: e }) {
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
				/* @__PURE__ */ (0, _.jsx)(Wt, {
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
				/* @__PURE__ */ (0, _.jsx)(Wt, {
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
function dt() {
	let { text: e } = fe(), { language: t } = n(), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)("single"), [f, p] = (0, h.useState)([I()]), [m, g] = (0, h.useState)(!1), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(""), S = (0, h.useRef)(!1), T = (0, h.useRef)(""), E = (0, h.useRef)(null);
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
		if (!f.some((e) => re.includes(e.model))) {
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
			/* @__PURE__ */ (0, _.jsx)(me, { id: "membership.thankYouText" }),
			/* @__PURE__ */ (0, _.jsx)(L, { message: b }),
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
							/* @__PURE__ */ (0, _.jsx)(pe, { html: e("membership.fees", H.membership.fields.find((e) => e.key === "fees")?.default || "") }),
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
							/* @__PURE__ */ (0, _.jsx)(R, {
								title: u === "couple" ? "Hauptmitglied" : "Persönliche Angaben",
								children: /* @__PURE__ */ (0, _.jsx)(B, {
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
								}), /* @__PURE__ */ (0, _.jsxs)(R, {
									title: "Co-Pilot / zweite Person",
									children: [
										/* @__PURE__ */ (0, _.jsx)("p", { children: o("Jede Person erhält nach der Aufnahme eine eigene Mitgliedsnummer und ein eigenes Konto. Bitte zwei unterschiedliche E-Mail-Adressen verwenden.") }),
										/* @__PURE__ */ (0, _.jsx)(B, {
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
							/* @__PURE__ */ (0, _.jsxs)(R, {
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
							/* @__PURE__ */ (0, _.jsxs)(R, {
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
											/* @__PURE__ */ (0, _.jsx)(ie, {
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
										onClick: () => p((e) => [...e, I()]),
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
							/* @__PURE__ */ (0, _.jsx)(ae, {})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(L, { error: v }),
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
		children: [/* @__PURE__ */ (0, _.jsx)(L, { error: a }), a ? /* @__PURE__ */ (0, _.jsx)("button", {
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
function ft(e) {
	return e in H && "template" in H[e];
}
function pt({ href: e, title: t, text: n }) {
	return /* @__PURE__ */ (0, _.jsxs)("a", {
		className: "landing-card",
		href: e,
		children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: t }), /* @__PURE__ */ (0, _.jsx)("p", { children: n })]
	});
}
function mt({ canEdit: e = !1, memberAccess: t = !1 }) {
	let { text: n } = fe();
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
			children: [/* @__PURE__ */ (0, _.jsx)(be, {
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
					/* @__PURE__ */ (0, _.jsx)(me, { id: "club.joinText" }),
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
				].map(([e, t, r]) => /* @__PURE__ */ (0, _.jsx)(pt, {
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
					children: /* @__PURE__ */ (0, _.jsx)(pt, {
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
				/* @__PURE__ */ (0, _.jsx)(nt, {
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
function ht() {
	let { text: e } = fe();
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
				children: /* @__PURE__ */ (0, _.jsx)(me, { id: "club.body" })
			}), /* @__PURE__ */ (0, _.jsx)("aside", {
				className: "mission-picture",
				children: e("club.missionImage") ? /* @__PURE__ */ (0, _.jsx)(v, {
					src: he(e("club.missionImage")),
					alt: e("club.missionImageAlt") || o("Clubleben im Swiss TR-Club"),
					width: 600,
					height: 800,
					style: ve(e("club.missionImageFrame"))
				}) : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "static-image-placeholder",
					children: o("Ein Bild aus unserem Clubleben folgt.")
				})
			})]
		})]
	})] });
}
function gt({ documentKey: e, canEdit: t = !1 }) {
	let { values: n, published: r, loading: i, error: a, refresh: s } = fe(), c = H[e];
	return !c || !ft(e) ? /* @__PURE__ */ (0, _.jsxs)("section", {
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
		}), /* @__PURE__ */ (0, _.jsx)(lt, {})]
	})] }) : e === "triungsters" && !i && !a ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero regional-hero",
		style: {
			backgroundImage: `linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${ge("triungsters")}")`,
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
		children: /* @__PURE__ */ (0, _.jsx)(qe, {
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
			e === "membership" && /* @__PURE__ */ (0, _.jsx)(dt, {}),
			e === "shop" && /* @__PURE__ */ (0, _.jsx)(lt, {})
		]
	})] }) : /* @__PURE__ */ (0, _.jsx)(_t, {
		documentKey: e,
		values: n[e]
	});
}
function _t({ documentKey: e, values: t, preview: n = !1 }) {
	let r = (e) => typeof t[e] == "string" ? t[e] : "", i = e.startsWith("model-"), a = (e) => !!(e.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim() || /<img\b/i.test(e));
	if (e === "triungsters") return /* @__PURE__ */ (0, _.jsx)(qe, {
		documentKey: e,
		values: t,
		canEdit: !0
	});
	if (i) return /* @__PURE__ */ (0, _.jsx)(tt, {
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
				e === "organisation" && r("lead") && /* @__PURE__ */ (0, _.jsx)(pe, {
					className: "organisation-lead",
					html: r("lead")
				}),
				!c && (r("image") ? /* @__PURE__ */ (0, _.jsxs)("figure", {
					className: "static-cover",
					children: [/* @__PURE__ */ (0, _.jsx)(v, {
						src: he(r("image")),
						alt: r("imageAlt"),
						width: 1440,
						height: 800,
						style: ve(r("imageFrame"))
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
									src: he(r(e)),
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
							}) : /* @__PURE__ */ (0, _.jsx)(pe, { html: r("body") }) : n && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Hier steht später der Text der ersten Spalte.")
							}) }), s && /* @__PURE__ */ (0, _.jsx)(pe, { html: r("bodySecondary") })]
						}),
						i && (u.length > 0 || n) && /* @__PURE__ */ (0, _.jsxs)("aside", {
							className: "landing-sidebar vehicle-facts",
							children: [
								/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Fahrzeugdaten") }),
								/* @__PURE__ */ (0, _.jsx)("dl", { children: (n ? Qe : u).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(t) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: r(e) || o("Noch ergänzen") })] }, e)) }),
								r("factsNote") && /* @__PURE__ */ (0, _.jsx)(pe, { html: r("factsNote") })
							]
						}),
						!i && (r("sidebar") || n) && /* @__PURE__ */ (0, _.jsxs)("aside", {
							className: "landing-sidebar",
							children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: r("sidebarTitle") || o("Auf einen Blick") }), r("sidebar") ? /* @__PURE__ */ (0, _.jsx)(pe, { html: r("sidebar") }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Platz für Kontakte und weitere Informationen.") })]
						})
					]
				}),
				e === "organisation" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: ["board", "functions"].map((e) => /* @__PURE__ */ (0, _.jsx)(Xe, {
					title: r(e + "Title"),
					people: Array.isArray(t[e + "Portraits"]) ? t[e + "Portraits"] : [],
					preview: n,
					slots: e === "board" ? 7 : 5
				}, e)) }),
				e === "membership" && !n && /* @__PURE__ */ (0, _.jsx)(dt, {}),
				e === "shop" && !n && /* @__PURE__ */ (0, _.jsx)(lt, {})
			]
		})]
	});
}
//#endregion
//#region app/components/EditorialDashboard.tsx
var vt = "strc_editorial", yt = {
	news: "Neuigkeiten",
	forum: "Forum",
	gallery: "Galerie",
	library: "Bibliothek",
	market: "Marktplatz"
};
function bt({ nonce: e, canManageEvents: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(() => decodeURIComponent(window.location.hash.split("/")[1] || "")), [l, u] = (0, h.useState)(null), [d, f] = (0, h.useState)(0), { refresh: p } = fe();
	(0, h.useEffect)(() => {
		let e = () => {
			window.location.hash.split("/")[0] === "#redaktion" && (u(null), a(""), c(decodeURIComponent(window.location.hash.split("/")[1] || "")));
		};
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []), (0, h.useEffect)(() => {
		let e = new AbortController();
		return C(vt, {}, e.signal).then(r).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [d]), (0, h.useEffect)(() => {
		if (!s || s.startsWith("posts:") || s === "people" || s === "highlights") return;
		let e = new AbortController();
		return C(vt, {
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
				/* @__PURE__ */ (0, _.jsx)(P, {}),
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
						n.areas.filter((e) => yt[e]).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "editorial-card",
							onClick: () => m("posts:" + e),
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: yt[e] }), /* @__PURE__ */ (0, _.jsx)("span", { children: "Beiträge bearbeiten und veröffentlichen" })]
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
			s === "highlights" ? /* @__PURE__ */ (0, _.jsx)(Ge, { nonce: e }) : s === "people" ? /* @__PURE__ */ (0, _.jsx)(We, { nonce: e }) : s.startsWith("posts:") ? /* @__PURE__ */ (0, _.jsx)(wt, {
				kind: s.slice(6),
				nonce: e,
				changed: p
			}, s) : s && (l ? /* @__PURE__ */ (0, _.jsx)(xt, {
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
function xt({ doc: e, nonce: t, saved: r }) {
	let { language: i } = n(), [a, s] = (0, h.useState)(() => e.key.startsWith("model-") && e.values.image && !String(e.values.imageAlt || "").trim() ? {
		...e.values,
		imageAlt: String(e.values.title || e.schema.title)
	} : e.values), c = (0, h.useRef)(null), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(!1), p = l || d, [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(e.revision > 0 ? e.hasDraft ? "Gespeicherter Entwurf. Besucher sehen weiterhin die veröffentlichte Version." : "Veröffentlichter Stand geladen. Änderungen sind auf der Website sichtbar." : ""), [x, S] = (0, h.useState)(null), C = JSON.stringify(a) !== JSON.stringify(e.values);
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
	async function E(n) {
		if (!p) {
			u(!0), g("");
			try {
				let i = await w(vt, t, T({
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
	async function D() {
		if (!p) {
			u(!0), g("");
			try {
				S((await w(vt, t, T({
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
						onClick: () => void E("publish"),
						children: "Änderungen veröffentlichen"
					})
				]
			}),
			/* @__PURE__ */ (0, _.jsx)(Ke, {
				docKey: e.key,
				nonce: t,
				disabled: p,
				uploadState: f
			}),
			/* @__PURE__ */ (0, _.jsx)("fieldset", {
				disabled: p,
				children: e.schema.fields.filter((e) => !e.legacy && !e.translationOf).map((n) => /* @__PURE__ */ (0, _.jsx)(St, {
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
				}, n.key))
			}),
			/* @__PURE__ */ (0, _.jsxs)("details", { children: [
				/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Französische Inhalte") }),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("Leere französische Felder zeigen den vorhandenen deutschen Inhalt.")
				}),
				/* @__PURE__ */ (0, _.jsx)("fieldset", {
					disabled: p,
					children: e.schema.fields.filter((e) => e.translationOf).map((n) => /* @__PURE__ */ (0, _.jsx)(St, {
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
						onClick: () => void D(),
						children: o("Vorschau")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						disabled: p,
						onClick: () => void E("draft"),
						children: o("Entwurf speichern")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: p,
						onClick: () => void E("publish"),
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
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Inhaltsvorschau") }), e.key.startsWith("region-") ? /* @__PURE__ */ (0, _.jsx)(qe, {
					documentKey: e.key,
					values: de(x, i),
					canEdit: !0
				}) : ft(e.key) ? /* @__PURE__ */ (0, _.jsx)(_t, {
					documentKey: e.key,
					values: de(x, i),
					preview: !0
				}) : e.schema.fields.filter((e) => !e.legacy && e.type !== "imageFrame").map((e) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: e.label }), e.type === "rich" ? /* @__PURE__ */ (0, _.jsx)(pe, { html: String(x[e.key]) }) : e.type === "text" || e.type === "textarea" || e.type === "url" || e.type === "imageFrame" ? /* @__PURE__ */ (0, _.jsx)("p", { children: String(x[e.key]) }) : e.type === "image" ? x[e.key] ? /* @__PURE__ */ (0, _.jsx)(v, {
					src: he(String(x[e.key])),
					width: 200,
					height: 160,
					alt: e.label
				}) : null : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "editorial-image-list",
					children: x[e.key].map((e, t) => /* @__PURE__ */ (0, _.jsx)(v, {
						src: he(e.image || e.url),
						alt: e.alt || e.name,
						width: 180,
						height: 120
					}, t))
				})] }, e.key))]
			})
		]
	});
}
function St({ field: e, imageUrl: t = "", value: n, onChange: r, nonce: i, docKey: a, disabled: s = !1, uploadState: c }) {
	if (e.type === "textarea") return /* @__PURE__ */ (0, _.jsxs)("label", { children: [e.label, /* @__PURE__ */ (0, _.jsx)("textarea", {
		rows: 2,
		value: String(n ?? "").replace(/\s*\|\s*/g, "\n"),
		onChange: (e) => r(e.target.value)
	})] });
	if (e.type === "imageFrame") return /* @__PURE__ */ (0, _.jsx)(ye, {
		label: e.label,
		value: String(n || ""),
		image: t,
		changed: r
	});
	if (e.type === "rich") return /* @__PURE__ */ (0, _.jsx)(Ve, {
		label: e.label,
		value: String(n ?? ""),
		onChange: r,
		disabled: s
	});
	if (e.type === "image") return /* @__PURE__ */ (0, _.jsx)(Ct, {
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
						/* @__PURE__ */ (0, _.jsx)(Ct, {
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
						/* @__PURE__ */ (0, _.jsx)(Ct, {
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
function Ct({ label: e, value: t, changed: n, nonce: r, target: i, uploadState: a, uploadAction: s = vt, frame: c, frameChanged: l, portrait: u = !1 }) {
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
				src: he(t),
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
			t && l && /* @__PURE__ */ (0, _.jsx)(ye, {
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
function wt({ kind: e, nonce: t, changed: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)(null), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(!0);
	return (0, h.useEffect)(() => {
		let t = new AbortController(), n = setTimeout(() => {
			C(vt, {
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
	]), m ? /* @__PURE__ */ (0, _.jsx)(Tt, {
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
		/* @__PURE__ */ (0, _.jsxs)("h2", { children: [yt[e], " verwalten"] }),
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
		/* @__PURE__ */ (0, _.jsx)(Wt, {
			page: c,
			pages: a,
			change: l
		})
	] });
}
function Tt({ item: e, kind: t, nonce: n, saved: r, back: i }) {
	let [a, s] = (0, h.useState)(e), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)("");
	async function f(e) {
		e.preventDefault(), l(!0), d("");
		try {
			await w(vt, n, T({
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
					/* @__PURE__ */ (0, _.jsx)(Ve, {
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
							/* @__PURE__ */ (0, _.jsx)(Ve, {
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
						/* @__PURE__ */ (0, _.jsx)(Ct, {
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
var Et = {
	reserved: "Reserviert",
	confirmed: "Bestätigt",
	waiting: "Warteliste",
	pending_payment: "Reserviert",
	expired: "Abgelaufen",
	cancelled: "Abgemeldet",
	payment_review: "Zahlung prüfen"
}, Dt = {
	invoice: "Rechnung",
	twint: "TWINT",
	card: "Kreditkarte",
	none: "Keine Zahlung"
}, Ot = (e) => e.vehicle ? [e.vehicle.model, e.vehicle.registration].filter(Boolean).join(" · ") : "";
function kt({ eventId: e }) {
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
			Ot(e),
			e.meals.join(" / "),
			e.phone || "",
			e.email || "",
			(e.total / 100).toFixed(2),
			Et[e.state] || e.state,
			Dt[e.paymentMethod] || e.paymentMethod,
			Mt[e.paymentStatus] || e.paymentStatus
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
		children: [/* @__PURE__ */ (0, _.jsx)(L, {
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
								/* @__PURE__ */ (0, _.jsxs)("td", { children: [Et[e.state] || e.state, /* @__PURE__ */ (0, _.jsx)("small", { children: Mt[e.paymentStatus] || e.paymentStatus })] }),
								/* @__PURE__ */ (0, _.jsx)("td", { children: Ot(e) || "–" }),
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
						Et[n.state] || n.state
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
						Dt[n.paymentMethod] || n.paymentMethod,
						" · ",
						Mt[n.paymentStatus] || n.paymentStatus
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
										children: Mt[e]
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
							Mt[e.to],
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
var At = "strc_registration", jt = (e) => new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: "CHF"
}).format(e / 100), Mt = {
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
}, Nt = {
	invoice: "Rechnung",
	twint: "TWINT",
	card: "Kreditkarte",
	none: "Keine Zahlung"
}, Pt = {
	reserved: "Teilnahme reserviert – Zahlung ausstehend",
	confirmed: "Teilnahme bestätigt",
	waiting: "Warteliste",
	cancelled: "Abgemeldet",
	pending_payment: "Plätze reserviert – Zahlung ausstehend",
	expired: "Reservierung abgelaufen",
	payment_review: "Zahlung wird durch die Kasse geprüft"
};
function Ft({ event: e, localDate: t, nonce: n, eventId: r, uploadState: i, organisers: a }) {
	let [s, c] = (0, h.useState)(e?.registrationRequired || !1), l = e?.registration, [u, d] = (0, h.useState)({
		programImage: l?.programImage || "",
		agendaImage: l?.agendaImage || ""
	});
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)(R, {
			title: o("Programm & Ausfahrt"),
			children: [/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Programm / Tagesablauf"), /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_program",
					rows: 6,
					maxLength: 5e3,
					defaultValue: l?.program || ""
				})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Teilnahmeinformationen"), /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_agenda",
					rows: 6,
					maxLength: 5e3,
					defaultValue: l?.agenda || ""
				})] })]
			}), ["programImage", "agendaImage"].map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
				type: "hidden",
				name: "reg_" + e,
				value: u[e]
			}), /* @__PURE__ */ (0, _.jsx)(Ct, {
				label: t === 0 ? "Programmbild" : "Bild zur Ausfahrt",
				value: u[e],
				changed: (t) => d((n) => ({
					...n,
					[e]: t
				})),
				nonce: n,
				target: { id: String(r) },
				uploadAction: "strc_events",
				uploadState: i
			})] }, e))]
		}),
		/* @__PURE__ */ (0, _.jsx)(R, {
			title: o("Organisator"),
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-form-row",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Veranstaltungsleiter/in · Ansprechperson *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_organiser",
						required: !0,
						maxLength: 200,
						defaultValue: l?.organiser || ""
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kontakt-E-Mail *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_organiserEmail",
						type: "email",
						required: !0,
						maxLength: 200,
						defaultValue: l?.organiserEmail || ""
					})] }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mobilnummer *"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_organiserMobile",
						type: "tel",
						required: !0,
						maxLength: 40,
						pattern: "[+0-9() ./-]{7,40}",
						defaultValue: l?.organiserMobile || ""
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, _.jsxs)(R, {
			title: o("Anmeldung konfigurieren"),
			children: [
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						name: "registrationRequired",
						value: "1",
						checked: s,
						onChange: (e) => c(e.target.checked)
					}), o("Anmeldung erforderlich")]
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: "Die folgenden Angaben gelten, sobald eine Anmeldung erforderlich ist. Ohne Anmeldung bleiben sie gespeichert."
				}),
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
					] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Gäste pro Anmeldung"), /* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_guests",
						type: "number",
						min: 0,
						max: 2,
						defaultValue: Math.min(2, l?.guests ?? 2)
					})] })]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_copilot",
						type: "checkbox",
						value: "1",
						defaultChecked: l?.copilot ?? !0
					}), o("Verknüpften Co-Piloten zulassen")]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_vehicle",
						type: "checkbox",
						value: "1",
						defaultChecked: l?.vehicle ?? !0
					}), o("Fahrzeugauswahl anzeigen")]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						name: "reg_waitlist",
						type: "checkbox",
						value: "1",
						defaultChecked: l?.waitlist
					}), o("Bei voller Kapazität Warteliste führen")]
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [
					o("Externer Anmeldelink (optional)"),
					/* @__PURE__ */ (0, _.jsx)("input", {
						type: "url",
						name: "reg_externalUrl",
						maxLength: 200,
						defaultValue: l?.externalUrl || ""
					}),
					/* @__PURE__ */ (0, _.jsx)("small", { children: "Bei externem Link erfolgt die Anmeldung dort." })
				] })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)(R, {
			title: o("Beiträge & Optionen"),
			children: [
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						name: "reg_organiserFree",
						value: "1",
						defaultChecked: l?.organiserFree
					}), "Grundbeitrag für die benannte Veranstaltungsleitung erlassen"]
				}),
				/* @__PURE__ */ (0, _.jsx)("input", {
					type: "hidden",
					name: "reg_organiserMemberNumber",
					value: l?.organiserMemberNumber || ""
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [
					o("Mitgliederkonto des Organisators (optional)"),
					/* @__PURE__ */ (0, _.jsxs)("select", {
						name: "reg_organiserUserId",
						defaultValue: l?.organiserUserId || "",
						children: [/* @__PURE__ */ (0, _.jsx)("option", {
							value: "",
							children: o("Kein Konto zugeordnet")
						}), a.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
							value: e.id,
							children: e.name
						}, e.id))]
					}),
					/* @__PURE__ */ (0, _.jsx)("small", { children: "Die Befreiung betrifft nur den Grundbeitrag dieser Person. Essen und Unterkunft bleiben kostenpflichtig." })
				] }),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: "Alle Beträge in CHF. 0 = kostenlos. Bei kostenpflichtigen Anmeldungen stehen Rechnung und – nach Einrichtung – TWINT / Kreditkarte über zahls.ch zur Auswahl. Rechnungen erstellt die Kasse in Fairgate."
				}),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "club-form-row",
					children: [
						["fee", "Mitglied"],
						["copilotFee", "Co-Pilot"],
						["guestFee", "Gast"]
					].map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
						"Beitrag ",
						t,
						/* @__PURE__ */ (0, _.jsx)("input", {
							name: `reg_${e}`,
							inputMode: "decimal",
							defaultValue: ((l?.[e] || 0) / 100).toFixed(2)
						})
					] }, e))
				}),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Essensauswahl je Person (optional)", /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_meals",
					rows: 3,
					maxLength: 2e3,
					defaultValue: l?.meals || "",
					placeholder: "Vegetarisch | 25.00\nFleisch | 30.00"
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Zimmer / Unterkunft je Anmeldung (optional)", /* @__PURE__ */ (0, _.jsx)("textarea", {
					name: "reg_rooms",
					rows: 3,
					maxLength: 2e3,
					defaultValue: l?.rooms || "",
					placeholder: "Ohne Übernachtung | 0\nDoppelzimmer | 180.00"
				})] }),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: "Eine Option je Zeile: Bezeichnung | Aufpreis in CHF. Leere Felder werden im Anmeldeformular ausgeblendet. Zimmerzuteilung erfolgt manuell."
				})
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)(R, {
			title: o("Teilnahme & Abmeldung"),
			children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bedingungen"), /* @__PURE__ */ (0, _.jsx)("textarea", {
				name: "reg_conditions",
				maxLength: 2e3,
				rows: 4,
				defaultValue: l?.conditions || "Kostenfreie Abmeldung bis vier Tage vor Veranstaltungsbeginn. Danach bleibt der Teilnahmebeitrag grundsätzlich geschuldet."
			})] }), /* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Abmeldefrist anpassen") }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [
				o("Abmeldung bis (optional)"),
				/* @__PURE__ */ (0, _.jsx)("input", {
					type: "datetime-local",
					name: "reg_cancelAt",
					defaultValue: t(l?.cancelAt || "")
				}),
				/* @__PURE__ */ (0, _.jsx)("small", { children: "Ohne Angabe: vier Tage vor Beginn. Mehrtägige Veranstaltungen benötigen passende eigene Bedingungen." })
			] })] })]
		})
	] });
}
function It({ value: e }) {
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
			/* @__PURE__ */ (0, _.jsx)("dd", { children: /* @__PURE__ */ (0, _.jsx)("strong", { children: jt(e.total) }) }),
			e.notes && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Bemerkungen") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.notes })] })
		] })]
	});
}
function Lt({ eventId: e, memberAccess: t, hideTitle: n = !1 }) {
	let [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)([]), [v, y] = (0, h.useState)(!1), [b, x] = (0, h.useState)(null), [S, E] = (0, h.useState)("invoice"), [D, O] = (0, h.useState)(!1), [k, A] = (0, h.useState)(!1), ee = (0, h.useRef)(null), te = (0, h.useRef)(!1);
	if ((0, h.useEffect)(() => {
		if (!t) return;
		let n = new AbortController();
		return C(At, {
			operation: "config",
			eventId: String(e)
		}, n.signal).then((e) => {
			i(e), d("");
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
	async function ne(t) {
		if (!r || te.current) return;
		te.current = !0, p(!0), l("");
		let n = new FormData(t);
		n.set("operation", b ? "submit" : "preview"), n.set("eventId", String(e)), n.set("paymentMethod", S), n.set("guests", JSON.stringify(m)), n.set("copilot", v ? "1" : "0");
		let a = 1 + +!!v + m.length;
		n.set("selections", JSON.stringify(Array.from({ length: a }, (e, t) => ({ meal: String(n.get(`meal_${t}`) || "") })))), k && r.registration && (n.set("id", String(r.registration.id)), n.set("revision", r.registration.revision)), b && n.set("reviewToken", b.reviewToken);
		try {
			if (b) {
				let e = await w(At, r.nonce, n);
				i({
					...r,
					registration: e.registration
				}), d(e.message), x(null), A(!1);
			} else x(await w(At, r.nonce, n));
		} catch (e) {
			l(e.message);
		} finally {
			te.current = !1, p(!1);
		}
	}
	async function j() {
		if (!(!r?.registration || te.current)) {
			te.current = !0, p(!0), l("");
			try {
				d((await w(At, r.nonce, T({
					operation: "cancel",
					eventId: String(e),
					id: String(r.registration.id),
					revision: r.registration.revision
				}))).message), s((e) => e + 1), O(!1);
			} catch (e) {
				l(e.message);
			} finally {
				te.current = !1, p(!1);
			}
		}
	}
	async function M() {
		if (!(!r?.registration || f)) {
			p(!0), l("");
			try {
				let t = await w(At, r.nonce, T({
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
	let N = r?.registration, P = r ? [
		r.name,
		...v && r.copilot ? [r.copilot] : [],
		...m.map((e) => [e.firstName, e.lastName].filter(Boolean).join(" "))
	] : [];
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
					children: ((b?.preview.total || N?.total || r.settings.fee) > 0 ? [
						"Anmeldung",
						"Angaben prüfen",
						"Zahlung",
						"Bestätigung"
					] : [
						"Anmeldung",
						"Angaben prüfen",
						"Bestätigung"
					]).map((e, t, n) => /* @__PURE__ */ (0, _.jsxs)("li", {
						"aria-current": t === (N && !["cancelled", "expired"].includes(N.state) && !k ? ["pending_payment", "reserved"].includes(N.state) ? 2 : n.length - 1 : +!!b) ? "step" : void 0,
						children: [/* @__PURE__ */ (0, _.jsx)("span", { children: t + 1 }), o(e)]
					}, e))
				}),
				r.descriptionHtml && /* @__PURE__ */ (0, _.jsx)("section", {
					className: "event-announcement",
					"aria-label": "Eventausschreibung",
					children: /* @__PURE__ */ (0, _.jsx)(pe, { html: r.descriptionHtml })
				})
			] }),
			/* @__PURE__ */ (0, _.jsx)(L, {
				error: c,
				message: u
			}),
			r ? N && !["cancelled", "expired"].includes(N.state) && !k ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o(Pt[N.state]) }),
				/* @__PURE__ */ (0, _.jsx)(It, { value: N }),
				N.total > 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: N.state === "waiting" ? "Auf der Warteliste wird noch keine Zahlung fällig." : `${o(Nt[N.paymentMethod] || "Zahlung")} · ${o(Mt[N.paymentStatus] || N.paymentStatus)}` }),
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
								onClick: () => void M(),
								children: o("Stattdessen auf Rechnung anmelden")
							})]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Ein Abbruch ist keine Zahlungsbestätigung. Bis zum Ablauf kannst du denselben Zahlungslink erneut öffnen."
						})
					]
				}),
				N.state === "confirmed" && /* @__PURE__ */ (0, _.jsx)(zt, { value: N }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: N.conditions }),
				r.open && !["pending_payment", "payment_review"].includes(N.state) && /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => {
						A(!0), g(N.participants.filter((e) => e.kind === "guest").map((e) => ({
							firstName: e.firstName || e.name,
							lastName: e.lastName || "",
							memberNumber: e.memberNumber || "",
							isMember: !!e.memberNumber
						}))), y(N.participants.some((e) => e.kind === "copilot"));
					},
					children: o("Anmeldung ändern")
				}),
				r.canCancel && (D ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "form-review",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", { children: o("Teilnahme verbindlich abmelden?") }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: f,
							onClick: () => O(!1),
							children: o("Zurück")
						}),
						" ",
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: f,
							onClick: () => void j(),
							children: o("Abmeldung bestätigen")
						})
					]
				}) : /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => O(!0),
					children: o("Teilnahme abmelden")
				}))
			] }) : r.settings.externalUrl ? /* @__PURE__ */ (0, _.jsx)("a", {
				className: "market-primary",
				href: r.settings.externalUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				children: o("Extern anmelden (neuer Tab) →")
			}) : r.open ? /* @__PURE__ */ (0, _.jsxs)("form", {
				ref: ee,
				className: "club-form",
				onSubmit: (e) => {
					e.preventDefault(), ne(e.currentTarget);
				},
				children: [
					/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: f,
						hidden: !!b,
						children: [
							/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Für die Veranstaltung anmelden") }),
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
							r.settings.copilot && r.copilot && /* @__PURE__ */ (0, _.jsxs)("label", {
								className: "application-consent",
								children: [
									/* @__PURE__ */ (0, _.jsx)("input", {
										type: "checkbox",
										checked: v,
										onChange: (e) => y(e.target.checked)
									}),
									r.copilot,
									" als Co-Pilot anmelden"
								]
							}),
							m.map((e, t) => /* @__PURE__ */ (0, _.jsxs)(R, {
								title: `Zusätzliche Person ${t + 1}`,
								children: [
									/* @__PURE__ */ (0, _.jsxs)("div", {
										className: "club-form-row",
										children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Vorname *"), /* @__PURE__ */ (0, _.jsx)("input", {
											required: !0,
											maxLength: 80,
											value: e.firstName,
											onChange: (e) => g((n) => n.map((n, r) => r === t ? {
												...n,
												firstName: e.target.value
											} : n))
										})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Nachname *"), /* @__PURE__ */ (0, _.jsx)("input", {
											required: !0,
											maxLength: 80,
											value: e.lastName,
											onChange: (e) => g((n) => n.map((n, r) => r === t ? {
												...n,
												lastName: e.target.value
											} : n))
										})] })]
									}),
									/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitgliedschaft"), /* @__PURE__ */ (0, _.jsxs)("select", {
										value: e.isMember ? "member" : "guest",
										onChange: (e) => g((n) => n.map((n, r) => r === t ? {
											...n,
											isMember: e.target.value === "member",
											memberNumber: ""
										} : n)),
										children: [/* @__PURE__ */ (0, _.jsx)("option", {
											value: "guest",
											children: o("Gast")
										}), /* @__PURE__ */ (0, _.jsx)("option", {
											value: "member",
											children: o("Clubmitglied")
										})]
									})] }),
									e.isMember && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
										o("Mitgliedsnummer *"),
										/* @__PURE__ */ (0, _.jsx)("input", {
											required: !0,
											maxLength: 32,
											value: e.memberNumber,
											onChange: (e) => g((n) => n.map((n, r) => r === t ? {
												...n,
												memberNumber: e.target.value
											} : n))
										}),
										/* @__PURE__ */ (0, _.jsx)("small", { children: "Nummer und Name werden mit den Mitgliederdaten abgeglichen." })
									] }),
									/* @__PURE__ */ (0, _.jsx)("button", {
										type: "button",
										className: "market-text-button",
										onClick: () => g((e) => e.filter((e, n) => n !== t)),
										children: o("Person entfernen")
									})
								]
							}, t)),
							m.length < Math.min(2, r.settings.guests) && /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								onClick: () => g((e) => [...e, {
									firstName: "",
									lastName: "",
									memberNumber: "",
									isMember: !1
								}]),
								children: o("＋ Weitere Person hinzufügen")
							}),
							r.settings.vehicle && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug *"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "vehicle",
								required: !0,
								defaultValue: k ? String(N?.vehicle?.id || (F.includes(N?.vehicle?.model || "") ? "model:" + N?.vehicle?.model : {
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
										children: F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
							Object.keys(r.meals).length > 0 && P.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
								"Essen: ",
								e || `Gast ${t}`,
								" *",
								/* @__PURE__ */ (0, _.jsxs)("select", {
									name: `meal_${t}`,
									required: !0,
									defaultValue: k && N?.participants[t]?.meal || "",
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), Object.entries(r.meals).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
										value: e,
										children: [
											e,
											" · ",
											jt(t)
										]
									}, e))]
								})
							] }, t)),
							Object.keys(r.rooms).length > 0 && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Unterkunft *"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "room",
								required: !0,
								defaultValue: k && N?.room || "",
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), Object.entries(r.rooms).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
									value: e,
									children: [
										e,
										" · ",
										jt(t)
									]
								}, e))]
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bemerkungen (optional)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								name: "notes",
								rows: 3,
								maxLength: 1e3,
								defaultValue: k && N?.notes || ""
							})] }),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Bitte nur veranstaltungsrelevante Angaben eintragen. Gäste erhalten keine Mitgliedschaft.")
							})
						]
					}),
					b && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)(It, { value: b.preview }),
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
						b.preview.total > 0 && !k && /* @__PURE__ */ (0, _.jsxs)(R, {
							title: o("Zahlungsart"),
							children: [
								r.paymentMethods.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", {
									className: "application-consent",
									children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "radio",
										name: "paymentChoice",
										value: e,
										checked: S === e,
										onChange: () => E(e)
									}), o(Nt[e])]
								}, e)),
								/* @__PURE__ */ (0, _.jsx)("p", { children: S === "invoice" ? "Die Kasse sendet die Rechnung separat über Fairgate." : "Nach der Reservierung öffnest du den Zahlungslink zu zahls.ch. Deine Teilnahme wird nach bestätigter Zahlung aufgenommen." }),
								r.paymentMethods.length === 1 && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Online-Zahlung wird nach Einrichtung freigeschaltet.") })
							]
						})
					] }),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [
							k && !b && /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: f,
								onClick: () => A(!1),
								children: o("Änderung abbrechen")
							}),
							b && /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: f,
								onClick: () => x(null),
								children: o("Angaben bearbeiten")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								className: "market-primary",
								disabled: f,
								children: o(f ? "Wird verarbeitet …" : b ? k ? "Änderungen verbindlich speichern" : b.preview.total > 0 ? "Kostenpflichtig anmelden" : "Anmeldung bestätigen" : "Anmeldung prüfen →")
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
function Rt({ eventId: e }) {
	return /* @__PURE__ */ (0, _.jsx)(kt, { eventId: e });
}
function zt({ value: e }) {
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
var Bt = "strc_events";
function Vt(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : (t.setMinutes(t.getMinutes() - t.getTimezoneOffset()), t.toISOString().slice(0, 16));
}
function Ht({ session: e, changed: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)({
		events: [],
		pages: 0
	}), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(1), [p, m] = (0, h.useState)(0), [g, v] = (0, h.useState)(!0), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(void 0), [E, D] = (0, h.useState)(null), [O, k] = (0, h.useState)(!1), [A, ee] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController(), t = setTimeout(() => {
			v(!0), b(""), Promise.all([C(Bt, { operation: "settings" }, e.signal), C(Bt, {
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
		return C(Bt, {
			operation: "get",
			id: String(e)
		}, t.signal).then(S).catch((e) => {
			t.signal.aborted || b(e.message);
		}), () => t.abort();
	}, []);
	function te(e) {
		ee(e), v(!0), m((e) => e + 1), t();
	}
	async function ne(t, n) {
		k(!0), b("");
		try {
			await w(Bt, e.eventsNonce || "", T({
				operation: n,
				id: String(t.id)
			})), te("Termin aus dem Archiv wiederhergestellt.");
		} catch (e) {
			b(e.message);
		} finally {
			k(!1);
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
						onClick: () => S(null),
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
				A && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					className: "club-notice",
					children: A
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
								disabled: O,
								onClick: () => void ne(e, "restore"),
								children: o("Wiederherstellen")
							}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => S(e),
								children: o("Bearbeiten")
							}), e.registrationRequired && e.status === "publish" && /* @__PURE__ */ (0, _.jsx)("button", {
								className: "club-secondary",
								onClick: () => D(e),
								children: o("Teilnehmerliste")
							})] })
						})] }, e.id))
					}),
					/* @__PURE__ */ (0, _.jsx)(Wt, {
						page: d,
						pages: i.pages,
						change: f
					})
				] })
			]
		}),
		E && /* @__PURE__ */ (0, _.jsx)(W, {
			title: `Anmeldungen: ${E.title}`,
			close: () => D(null),
			children: /* @__PURE__ */ (0, _.jsx)(Rt, { eventId: E.id })
		}),
		x !== void 0 && n && /* @__PURE__ */ (0, _.jsx)(Ut, {
			event: x,
			settings: n,
			nonce: e.eventsNonce || "",
			close: () => S(void 0),
			saved: () => {
				S(void 0), te("Termin gespeichert.");
			}
		})
	] });
}
function Ut({ event: e, settings: t, nonce: n, close: r, saved: i }) {
	let [a, s] = (0, h.useState)(e?.descriptionHtml || e?.description || ""), [c, l] = (0, h.useState)(e?.descriptionFr || ""), [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(e?.scope || "region"), [m, g] = (0, h.useState)(!1), [v, y] = (0, h.useState)("");
	async function b(t) {
		if (!(u || m)) {
			g(!0), y("");
			try {
				let r = new FormData(t);
				r.set("operation", "save"), r.set("id", String(e?.id || 0)), r.set("scope", f), r.set("description", a), r.set("descriptionFr", c);
				for (let e of [
					"startAt",
					"endAt",
					"registrationOpenAt",
					"registrationCloseAt",
					"reg_cancelAt"
				]) {
					let t = String(r.get(e) || "");
					r.set(e, t ? new Date(t).toISOString() : "");
				}
				await w(Bt, n, r), i();
			} catch (e) {
				y(e.message);
			} finally {
				g(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsx)(W, {
		title: e ? "Termin bearbeiten" : "Termin erstellen",
		close: r,
		busy: m,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: (e) => {
				e.preventDefault(), b(e.currentTarget);
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: m || u,
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: e?.status === "publish" ? "Dieser Termin ist in der Agenda veröffentlicht." : "Dieser Termin ist ein Entwurf und noch nicht in der Agenda sichtbar. Zum Freigeben unten «Veröffentlichen» wählen."
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [
							"Verantwortliche/r Editor/in *",
							/* @__PURE__ */ (0, _.jsx)("input", {
								required: !0,
								value: t.editorName,
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
						t.global ? /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Bereich *", /* @__PURE__ */ (0, _.jsxs)("select", {
							required: !0,
							value: f,
							onChange: (e) => p(e.target.value),
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
							defaultValue: e?.eventType || "",
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}),
								e?.eventType === "weekend-meeting" && /* @__PURE__ */ (0, _.jsx)("option", {
									value: "weekend-meeting",
									children: o("Weekend Meeting (bisherige Zuordnung)")
								}),
								t.eventTypes.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e.slug,
									children: e.name
								}, e.slug))
							]
						})] }),
						f !== "club-national" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Region"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "regionId",
							required: f === "region",
							defaultValue: e?.regionId || (t.global ? "" : t.regions[0]?.id),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Bitte wählen")
							}), t.regions.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
								defaultValue: Vt(e?.startAt || "")
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Ende (optional)", /* @__PURE__ */ (0, _.jsx)("input", {
								type: "datetime-local",
								name: "endAt",
								defaultValue: Vt(e?.endAt || "")
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
						/* @__PURE__ */ (0, _.jsx)(Ve, {
							label: o("Beschreibung"),
							value: a,
							onChange: s,
							disabled: m || u
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
							/* @__PURE__ */ (0, _.jsx)(Ve, {
								label: o("Beschreibung (FR)"),
								value: c,
								onChange: l,
								disabled: m || u
							})
						] }),
						/* @__PURE__ */ (0, _.jsx)(Ft, {
							organisers: t.organisers,
							event: e,
							localDate: Vt,
							nonce: n,
							eventId: e?.id || 0,
							uploadState: d
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
				v && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state error",
					role: "alert",
					children: v
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: m || u,
						onClick: r,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: m || u,
						children: m ? "Wird gespeichert …" : "Termin speichern"
					})]
				})
			]
		})
	});
}
function Wt({ page: e, pages: t, change: n }) {
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
var Gt = [
	["lastName", "Nachname"],
	["firstName", "Vorname"],
	["postcode", "PLZ / Ort"],
	["region", "Region"],
	["vehicle", "Fahrzeug"]
], Kt = (e) => e === "restoration" ? "In Restauration" : "Fahrbereit";
function qt({ vehicle: e }) {
	let t = e.status !== "restoration";
	return /* @__PURE__ */ (0, _.jsxs)("span", {
		className: "dir-vehicle",
		title: o(Kt(e.status)),
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
					o(Kt(e.status)),
					")"
				]
			})
		]
	});
}
function Jt() {
	let { text: e } = fe(), [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("lastName"), [f, p] = (0, h.useState)(1), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(null), [x, S] = (0, h.useState)(!1), [w, T] = (0, h.useState)(0), [E, D] = (0, h.useState)(!0);
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
							}), F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
							children: Gt.map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
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
				t ? x ? /* @__PURE__ */ (0, _.jsx)(Xt, {
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
									/* @__PURE__ */ (0, _.jsx)("td", { children: e.vehicles.map((e) => /* @__PURE__ */ (0, _.jsx)(qt, { vehicle: e }, e.id)) }),
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
					/* @__PURE__ */ (0, _.jsx)(Wt, {
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
		y && /* @__PURE__ */ (0, _.jsx)(W, {
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
								/* @__PURE__ */ (0, _.jsx)(qt, { vehicle: e }),
								" ",
								e.details
							] }),
							/* @__PURE__ */ (0, _.jsxs)("dl", {
								className: "profile-facts",
								children: [[
									["year", "Baujahr"],
									["colour", "Farbe"],
									["registration", "Kennzeichen"]
								].map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(n) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: String(e[t] || "–") })] }, t)), /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Status") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: o(Kt(e.status)) })] })]
							})
						]
					}, e.id)) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine Fahrzeuge erfasst.") })
				]
			})
		})
	] });
}
var Yt = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"38\" viewBox=\"0 0 28 38\"><path d=\"M14 1C7 1 1.5 6.5 1.5 13.5 1.5 23 14 37 14 37s12.5-14 12.5-23.5C26.5 6.5 21 1 14 1Z\" fill=\"#114973\" stroke=\"#fff\" stroke-width=\"2\"/><circle cx=\"14\" cy=\"13.5\" r=\"5\" fill=\"#bd2028\"/></svg>";
function Xt({ members: t, detail: n, loading: r }) {
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
				html: Yt,
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
var Zt = window.strcSettings.assetBase ?? "";
function Qt({ url: e, title: t, classic: n, pages: r, download: i, search: a = !0 }) {
	let s = (r || []).join(","), c = (0, h.useRef)(null), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(""), p = (0, h.useRef)(0), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)(null), [b, x] = (0, h.useState)(!1), S = (0, h.useRef)({}), C = (0, h.useRef)({}), [w, T] = (0, h.useState)(null), [E, D] = (0, h.useState)(""), [O, k] = (0, h.useState)(null), [A, ee] = (0, h.useState)({}), [te, ne] = (0, h.useState)(1), [j, M] = (0, h.useState)(null), [N, P] = (0, h.useState)(() => typeof window < "u" && window.innerWidth < 760), [F, re] = (0, h.useState)(null), I = (0, h.useRef)({}), L = (0, h.useRef)(/* @__PURE__ */ new Set()), R = (0, h.useRef)(null), z = (0, h.useRef)(null), B = (0, h.useRef)([]), ie = (0, h.useRef)(0);
	(0, h.useEffect)(() => () => {
		B.current.forEach(clearTimeout), ie.current++;
	}, []), (0, h.useEffect)(() => {
		let t = !1;
		B.current.forEach(clearTimeout), B.current = [], ie.current++, I.current = {}, L.current.clear(), z.current = null, S.current = {}, C.current = {};
		let n;
		return (async () => {
			let r = await import("./pdf-CnPiFuPD.js");
			if (t) return;
			T(null), k(null), ee({}), ne(1), D(""), M(null), y(null), x(!1), p.current++, r.GlobalWorkerOptions.workerSrc = `${Zt}/pdfjs/pdf.worker.min.js`, n = r.getDocument({
				url: e,
				withCredentials: !0,
				rangeChunkSize: 65536,
				cMapUrl: `${Zt}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${Zt}/pdfjs/standard_fonts/`,
				wasmUrl: `${Zt}/pdfjs/wasm/`
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
			z.current = o, k(o), T(i);
		})().catch(() => {
			t || D(o("Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen."));
		}), () => {
			t = !0, n?.destroy().catch(() => {});
		};
	}, [e, s]), (0, h.useEffect)(() => {
		let e = () => u(document.fullscreenElement === c.current);
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, []);
	function V() {
		f(""), document.fullscreenElement ? document.exitFullscreen() : c.current?.requestFullscreen ? c.current.requestFullscreen().catch(() => f(o("Vollbild ist in diesem Browser nicht verfügbar."))) : f(o("Vollbild ist in diesem Browser nicht verfügbar."));
	}
	async function ae() {
		let e = m.trim().toLocaleLowerCase("de-CH"), t = z.current;
		if (!w || !t || e.length < 2) {
			y(null);
			return;
		}
		x(!0);
		let n = ie.current, r = ++p.current, i = [];
		try {
			for (let a = 1; a <= w.numPages; a++) {
				if (!S.current[a]) {
					let e = await w.getPage(a), t = await e.getTextContent();
					if (n !== ie.current || r !== p.current) return;
					C.current[a] = e.getViewport({ scale: 1 }).width, S.current[a] = t.items.map((e) => "str" in e ? {
						str: e.str,
						x: e.transform[4]
					} : {
						str: "",
						x: 0
					});
				}
				if (n !== ie.current || r !== p.current) return;
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
			n === ie.current && r === p.current && y([]);
		} finally {
			n === ie.current && r === p.current && x(!1);
		}
	}
	function oe(e) {
		B.current.forEach(clearTimeout), B.current = [], M(null), ne(e);
	}
	(0, h.useEffect)(() => {
		let e = () => P(window.innerWidth < 760);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []);
	let H = F ?? N, U = O ? O.length : 0, se = (e) => H ? [e] : e <= 1 ? [0, 1] : [e - e % 2, e - e % 2 + 1 <= U ? e - e % 2 + 1 : 0], ce = (e) => H ? e : e <= 1 ? 1 : e - e % 2, le = se(te), ue = ce(te), de = H ? ue + 1 : ue <= 1 ? 2 : ue + 2, fe = H ? ue - 1 : ue <= 3 ? 1 : ue - 2, pe = U > 0 && de <= U, me = ue > 1, he = (e) => {
		let t = O?.[e - 1];
		return t ? `${t.p}:${t.part}` : "";
	};
	function ge(e, t, n) {
		let r = document.createElement("canvas");
		return r.width = Math.floor(n), r.height = e.height, r.getContext("2d").drawImage(e, t, 0, n, e.height, 0, 0, n, e.height), r.toDataURL("image/jpeg", .86);
	}
	function _e(e) {
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
	async function ve(e) {
		let t = z.current, n = t?.[e - 1];
		if (!w || !n || I.current[`${n.p}:${n.part}`] || L.current.has(n.p)) return;
		L.current.add(n.p);
		let r = ie.current;
		try {
			let e = await w.getPage(n.p), i = e.getViewport({ scale: 1 }), a = e.getViewport({ scale: Math.min(2.2, 1300 / i.height) }), o = document.createElement("canvas");
			if (o.width = Math.floor(a.width), o.height = Math.floor(a.height), await e.render({
				canvas: o,
				viewport: a
			}).promise, r !== ie.current) return;
			let c = {};
			if (n.part === "full") c[`${n.p}:full`] = o.toDataURL("image/jpeg", .86);
			else if (c[`${n.p}:left`] = ge(o, 0, o.width / 2), c[`${n.p}:right`] = ge(o, o.width / 2, o.width / 2), n.edge) if (s || _e(o)) c[`${n.p}:center`] = ge(o, o.width / 4, o.width / 2);
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
				z.current = e, k(e);
			}
			I.current = {
				...I.current,
				...c
			}, ee(I.current), e.cleanup(), o.width = 0;
		} catch {
			r === ie.current && D(o("Die Seite konnte nicht geladen werden. Bitte lade das Magazin erneut."));
		} finally {
			r === ie.current && L.current.delete(n.p);
		}
	}
	(0, h.useEffect)(() => {
		if (!w || !O) return;
		let e = [
			...se(te),
			...se(Math.min(U, de)),
			...se(Math.max(1, fe)),
			...se(Math.min(U, de + (H ? 1 : 2)))
		];
		(async () => {
			for (let t of e) t && await ve(t);
		})();
	}, [
		w,
		O,
		te,
		H
	]);
	let ye = O?.length ? (O[1] || O[0]).r : .707;
	function be(e) {
		if (j || !w || e > 0 && !pe || e < 0 && !me) return;
		let t = e > 0 ? de : fe, n = se(t);
		M({
			...H ? e > 0 ? {
				under: [n[0]],
				front: le[0],
				back: -1,
				side: "right"
			} : {
				under: [le[0]],
				front: n[0],
				back: -1,
				side: "right",
				reverse: !0
			} : e > 0 ? {
				under: [le[0], n[1]],
				front: le[1],
				back: n[0],
				side: "right"
			} : {
				under: [n[0], le[1]],
				front: le[0],
				back: n[1],
				side: "left"
			},
			go: !1
		}), B.current.push(setTimeout(() => M((e) => e && {
			...e,
			go: !0
		}), 30)), B.current.push(setTimeout(() => {
			ne(t), M(null);
		}, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 680));
	}
	let xe = (e, t) => {
		if (e === -1) return /* @__PURE__ */ (0, _.jsx)("div", { className: `fb-face fb-paper ${t}` });
		if (!e) return /* @__PURE__ */ (0, _.jsx)("div", { className: `fb-face fb-empty ${t}` });
		let n = A[he(e)], r = Te(e);
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
	}, Se = j ? j.under : le, Ce = le.filter(Boolean), we = s ? s.split(",").map(Number) : null, Te = (e) => we?.[e - 1] ?? e, Ee = U ? we ? Ce.map(Te).join("–") : `${Ce.length > 1 ? Ce.join("–") : String(Ce[0] || 1)} ${o("von")} ${U}` : "", De = i === !1 ? "" : i || e;
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		ref: c,
		className: "strc-flipbook" + (H ? " is-single" : "") + (l ? " is-fullscreen" : ""),
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "fb-toolbar",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => be(-1),
						disabled: !me || !!j,
						children: ["← ", o("Zurück")]
					}),
					/* @__PURE__ */ (0, _.jsx)("span", {
						"aria-live": "polite",
						children: U ? `${o("Seite")} ${Ee}` : o("Magazin wird geladen …")
					}),
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => be(1),
						disabled: !pe || !!j,
						children: [o("Weiter"), " →"]
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: () => re(!H),
						children: o(H ? "Doppelseite" : "Einzelseite")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: V,
						"aria-pressed": l,
						children: l ? o("Vollbild beenden") : "⛶ " + o("Vollbild")
					}),
					De && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary fb-mode",
						href: De,
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
					e.preventDefault(), ae();
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
							className: le.includes(e.v) ? "is-current" : "",
							onClick: () => oe(e.v),
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
					aspectRatio: String((H ? 1 : 2) * ye),
					"--fb-ratio": (H ? 1 : 2) * ye
				},
				tabIndex: 0,
				role: "group",
				"aria-label": `${t} – ${o("Blättern mit Pfeiltasten, Klick oder Wischen")}`,
				onKeyDown: (e) => {
					e.key === "ArrowRight" ? (e.preventDefault(), be(1)) : e.key === "ArrowLeft" && (e.preventDefault(), be(-1));
				},
				onClick: (e) => {
					if (R.current === "swiped") {
						R.current = null;
						return;
					}
					let t = e.currentTarget.getBoundingClientRect();
					be(e.clientX - t.left > t.width / 2 ? 1 : -1);
				},
				onPointerDown: (e) => {
					R.current = e.clientX;
				},
				onPointerUp: (e) => {
					let t = R.current;
					R.current = null, typeof t == "number" && Math.abs(e.clientX - t) > 50 && (R.current = "swiped", be(e.clientX < t ? 1 : -1));
				},
				children: [
					H ? xe(Se[0], "fb-single") : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [xe(Se[0], "fb-left"), xe(Se[1], "fb-right")] }),
					j && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: `fb-leaf fb-leaf-${H ? "single" : j.side}${j.reverse ? " is-reverse" : ""}${j.go ? " is-turning" : ""}`,
						children: [xe(j.front, "fb-front"), xe(j.back, "fb-back")]
					}),
					!H && /* @__PURE__ */ (0, _.jsx)("span", {
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
var $t = {
	"#forum": "◎",
	"#galerie": "▧",
	"#bibliothek": "▤",
	"#marktplatz": "◇",
	"#tr-shop": "▣",
	"#agenda-verwalten": "▦",
	"#antraege": "✉"
}, en = (e) => $t[String(e || "").split("/")[0]] || "◉", tn = {
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
function nn({ extraTools: e = [] }) {
	let { language: t } = n(), [i, a] = (0, h.useState)(null), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(0), [d, f] = (0, h.useState)(!1);
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
	let p = i.magazineIssue || null, m = i.isBoard, g = i.notifications.filter((e) => e && typeof e == "object" && typeof e.title == "string" && typeof e.url == "string"), y = i.registrations.filter((e) => ![
		"cancelled",
		"expired",
		"waiting"
	].includes(e.state || "") && [
		"outstanding",
		"partially_paid",
		"pending_payment",
		"failed"
	].includes(e.paymentStatus || "")), b = (e) => {
		if (!e) return "";
		let t = new Date(e);
		return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(r());
	}, x = (e, t) => /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: e.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: e.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
		/* @__PURE__ */ (0, _.jsx)("a", {
			href: e.url,
			children: e.title.startsWith("Neue Antwort:") ? o("Neue Antwort:") + e.title.slice(13) : e.title
		}),
		e.registered && /* @__PURE__ */ (0, _.jsxs)("strong", { children: [" · ", o("Bereits angemeldet")] }),
		e.location && /* @__PURE__ */ (0, _.jsx)("p", { children: e.location }),
		b(e.startAt || e.at) && /* @__PURE__ */ (0, _.jsx)("p", { children: b(e.startAt || e.at) }),
		/* @__PURE__ */ (0, _.jsx)("p", { children: [
			e.status && o(tn[e.status] || e.status),
			e.state && o(tn[e.state] || e.state),
			e.paymentStatus && o(tn[e.paymentStatus] || e.paymentStatus),
			e.total
		].filter(Boolean).join(" · ") })
	] }, e.id || t)) }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o(t) }) }), S = e.filter((e) => e.url === "#agenda-verwalten" || e.url === "#antraege").map((e) => ({
		url: e.url,
		title: e.url === "#antraege" ? "Anträge bearbeiten" : "Agenda verwalten"
	})), w = e.find((e) => e.url === "#redaktion");
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
					", ",
					i.firstName || i.displayName,
					"!"
				] }),
				i.region && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
					o("Region"),
					" ",
					i.region
				] }),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "dashboard-car-chips",
					children: i.vehicles.map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
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
									/* @__PURE__ */ (0, _.jsx)("span", { children: [e.location, b(e.startAt || e.at)].filter(Boolean).join(" · ") }),
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
						x(g.slice(0, 6), "Keine neuen Benachrichtigungen."),
						y.length > 0 && x(y, ""),
						i.magazine && !p && /* @__PURE__ */ (0, _.jsx)("a", {
							href: i.magazine.url,
							children: i.magazine.title
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-activity db-card db-mine",
					children: [
						/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Meine Aktivitäten") }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Anmeldungen") }), x(i.registrations, "Noch keine Anmeldungen.")] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Beiträge und Inserate") }), x(i.uploads, "Noch keine Beiträge eingereicht.")] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Bestellungen") }), x(i.orders, "Noch keine Bestellungen.")] }),
						(i.queues.length > 0 || S.length > 0) && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "db-moderation",
							children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Meine Moderationsaufgaben") }), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "db-moderation-grid",
								children: [i.queues.map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
									className: "db-mod-tile" + ((e.count || 0) > 0 ? " has-open" : ""),
									href: e.url,
									children: [
										/* @__PURE__ */ (0, _.jsx)("i", {
											"aria-hidden": "true",
											children: en(e.url)
										}),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.title) }),
										/* @__PURE__ */ (0, _.jsx)("span", { children: (e.count || 0) > 0 ? `${e.count} ${o("In Prüfung")}` : o("Nichts offen") })
									]
								}, e.url)), S.map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
									className: "db-mod-tile is-tool",
									href: e.url,
									children: [
										/* @__PURE__ */ (0, _.jsx)("i", {
											"aria-hidden": "true",
											children: en(e.url)
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
						p && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "db-magazine",
							children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("TR-Magazin") }), /* @__PURE__ */ (0, _.jsxs)("button", {
								type: "button",
								className: "db-magazine-card",
								onClick: () => {
									p && (p.canRead && p.fileUrl ? f(!0) : window.location.href = p.loginUrl || i.magazine?.url || "#bibliothek");
								},
								children: [p.cover || p.previewPages?.[0] ? /* @__PURE__ */ (0, _.jsx)(v, {
									unoptimized: !0,
									width: 96,
									height: 128,
									className: "db-magazine-cover",
									src: p.cover || p.previewPages[0],
									alt: "",
									loading: "lazy"
								}) : /* @__PURE__ */ (0, _.jsxs)("span", {
									className: "db-magazine-mark",
									"aria-hidden": "true",
									children: ["TR", /* @__PURE__ */ (0, _.jsx)("small", { children: "MAGAZINE" })]
								}), /* @__PURE__ */ (0, _.jsxs)("span", {
									className: "db-magazine-text",
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: p.title }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Jetzt lesen"), " →"] })]
								})]
							})]
						}),
						d && p?.fileUrl && /* @__PURE__ */ (0, _.jsx)(W, {
							title: p.title,
							close: () => f(!1),
							children: /* @__PURE__ */ (0, _.jsx)(Qt, {
								url: p.fileUrl,
								title: p.title
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
							m && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: "#clubdokumente",
								children: o("Clubdokumente")
							}),
							w && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: w.url,
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
function rn() {
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
var an = {
	"Teile gesucht": "Ersatzteilsuche",
	"Garagen / Spezialisten": "TR-Spezialisten"
}, on = {
	Fahrzeuge: ["🚗", "TR2–TR3A · TR4–TR4A · TR5–TR6 · TR7–TR8 · andere Triumphs"],
	Technik: ["🔧", "Motor · Vergaser/Einspritzung · Elektrik · Fahrwerk · Karosserie · Getriebe/Overdrive"],
	Restaurationen: ["🛠", "Projekte und Erfahrungen"],
	"Teile gesucht": ["🔩", "Gesucht · Bezugsquellen · Identifikation"],
	"Garagen / Spezialisten": ["🏠", "Werkstätten · Spezialisten · Sattler · Lackierer"],
	"Events & Reisen": ["🗺", "Reiseberichte · Roadbooks · Hoteltipps"],
	Clubleben: ["🏛", "Fragen zum Club · Ideen & Vorschläge"]
}, sn = [
	"#e7f0f8",
	"#e9f4ec",
	"#fbf1e4",
	"#f6e8ea",
	"#f1edf7",
	"#e6f4f3",
	"#fdf6dc",
	"#eef1f3"
], cn = (e) => an[e] || e, ln = (e) => on[e]?.[0] || "💬", un = (e) => on[e]?.[1] || "", dn = (e) => sn[e % sn.length];
function fn(e = !0) {
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
function pn({ area: e, forum: t }) {
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
function mn({ forum: e }) {
	let t = N(), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)([]), [s, c] = (0, h.useState)(null), [l, u] = (0, h.useState)([]), [d, f] = (0, h.useState)([]), [p, m] = (0, h.useState)(!1), [g, v] = (0, h.useState)("");
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
	return /* @__PURE__ */ (0, _.jsxs)("section", {
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
						children: F.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
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
	});
}
//#endregion
//#region app/components/PdfThumb.tsx
var hn = window.strcSettings.assetBase ?? "", gn = /* @__PURE__ */ new Map();
function _n({ url: e, width: t = 120 }) {
	let n = (0, h.useRef)(null), [r, i] = (0, h.useState)(() => ({
		url: e,
		src: gn.get(e) || ""
	})), a = r.url === e ? r.src : gn.get(e) || "", [o, s] = (0, h.useState)(!1);
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
			a.GlobalWorkerOptions.workerSrc = `${hn}/pdfjs/pdf.worker.min.js`, r = a.getDocument({
				url: e,
				withCredentials: !0,
				rangeChunkSize: 65536,
				disableAutoFetch: !0,
				cMapUrl: `${hn}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${hn}/pdfjs/standard_fonts/`,
				wasmUrl: `${hn}/pdfjs/wasm/`
			});
			let o = await (await r.promise).getPage(1), s = o.getViewport({ scale: 1 }), c = s.width / s.height > 1.2, l = (c ? t * 2 : t) * 2 / s.width, u = o.getViewport({ scale: l }), d = document.createElement("canvas");
			d.width = Math.floor(u.width), d.height = Math.floor(u.height), await o.render({
				canvas: d,
				viewport: u
			}).promise;
			let f = d;
			c && (f = document.createElement("canvas"), f.width = Math.floor(d.width / 2), f.height = d.height, f.getContext("2d").drawImage(d, d.width / 4, 0, d.width / 2, d.height, 0, 0, d.width / 2, d.height));
			let p = f.toDataURL("image/jpeg", .8);
			gn.set(e, p), n || i({
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
var vn = (e) => Array.isArray(e) ? e.join(", ") : e || "";
function yn({ eventId: e }) {
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
function bn({ open: e }) {
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
				let n = t.files.filter((e) => e.mime.startsWith("image/")), r = vn(t.classification.date);
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
							/* @__PURE__ */ (0, _.jsx)(yn, { eventId: vn(t.classification.eventId) })
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
//#region app/components/Community.tsx
var xn = (0, h.lazy)(() => import("./MagazineReader-DYdiJlXm.js")), Sn = "strc_community", Cn = {
	events: "Veranstaltungen",
	portraits: "Mitgliederporträts",
	restorations: "Fahrzeugrestaurationen",
	history: "Clubgeschichte"
}, wn = {
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
}, Tn = {
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
function En(e) {
	return Array.isArray(e) ? e.join(", ") : e || "";
}
var Dn = [
	"technical",
	"club",
	"travel",
	"magazine",
	"newsletter",
	"board"
], On = {
	technical: "⚙",
	club: "☷",
	travel: "⌖",
	magazine: "▤",
	newsletter: "✉",
	board: "♜"
};
function kn({ kind: e, nonce: t, selectedId: n, initialGroup: i = "", title: a, section: s = "" }) {
	let { text: c } = fe(), l = N(), [u, d] = (0, h.useState)({
		items: [],
		total: 0,
		pages: 0
	}), [f, p] = (0, h.useState)(i), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(""), [E, D] = (0, h.useState)(!1), [O, A] = (0, h.useState)(1), [ee, te] = (0, h.useState)(0), [ne, j] = (0, h.useState)(!0), [M, P] = (0, h.useState)(""), [re, I] = (0, h.useState)(""), [L, R] = (0, h.useState)(void 0), [z, B] = (0, h.useState)(() => n || null), [ie, V] = (0, h.useState)(null), [ae, oe] = (0, h.useState)(!1), [H, U] = (0, h.useState)(null), [se, ce] = (0, h.useState)(null), le = fn(e === "forum"), [ue, de] = (0, h.useState)(""), [pe, me] = (0, h.useState)(""), [he, ge] = (0, h.useState)(""), _e = e === "forum" && s === "experten", [ve, ye] = (0, h.useState)(""), [be, xe] = (0, h.useState)(""), Se = ["magazine", "newsletter"].includes(f), Ce = !Se, we = (u.accessClasses || []).includes("restricted"), Te = !!u.canReview, Ee = e === "library" && {
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
			j(!0), P(""), C(Sn, {
				operation: "list",
				kind: e,
				group: f,
				search: e === "library" ? ve : e === "forum" ? he : "",
				model: e === "library" ? be : e === "forum" ? ue : "",
				component: e === "forum" ? pe : "",
				documentType: m,
				area: y,
				galleryCategory: x,
				trash: E ? "1" : "0",
				page: String(O)
			}, t.signal).then(d).catch((e) => {
				t.signal.aborted || P(e.message);
			}).finally(() => {
				t.signal.aborted || j(!1);
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
		ee,
		ve,
		be,
		ue,
		pe,
		he
	]);
	function je(e, t) {
		["magazine", "newsletter"].includes(f) || ["magazine", "newsletter"].includes(k(En(e.classification.documentType))) ? ce({
			file: t,
			title: e.title,
			download: f !== "newsletter" && k(En(e.classification.documentType)) !== "newsletter"
		}) : U(t);
	}
	function Me(e = "") {
		I(e), j(!0), te((e) => e + 1);
	}
	async function Ne(e, n) {
		oe(!0), P("");
		try {
			await w(Sn, t, T({
				operation: n,
				id: String(e.id)
			})), V(null), B(null), Me(n === "trash" ? "Beitrag ins Archiv verschoben." : n === "approve" ? "Beitrag freigegeben." : n === "reject" ? "Beitrag abgelehnt." : "Beitrag wiederhergestellt.");
		} catch (e) {
			P(e.message);
		} finally {
			oe(!1);
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
				e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-toolbar",
					children: [/* @__PURE__ */ (0, _.jsx)("span", {}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						onClick: () => R(null),
						children: o(Tn[e].create)
					})]
				}),
				e === "gallery" && !x && O === 1 && /* @__PURE__ */ (0, _.jsx)(bn, { open: (e) => B(e) }),
				e === "forum" && !y && le.settings?.canManage && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-toolbar",
					children: [/* @__PURE__ */ (0, _.jsx)("span", {}), /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary",
						href: _e ? "#forum" : "#forum/experten",
						children: o(_e ? "← Zurück zum Forum" : "Fachexperten zuteilen")
					})]
				}),
				_e ? /* @__PURE__ */ (0, _.jsx)(mn, { forum: le }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					(e === "library" || e === "forum") && /* @__PURE__ */ (0, _.jsx)("div", {
						className: "category-tiles",
						"aria-label": o(e === "library" ? "Bibliotheksbereiche" : "Forumsbereiche"),
						children: e === "library" ? [...u.libraryGroups || []].sort((e, t) => (Dn.indexOf(e.key) + 1 || 99) - (Dn.indexOf(t.key) + 1 || 99)).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "category-tile lib-tile lib-" + e.key,
							"aria-pressed": f === e.key,
							onClick: () => {
								p(f === e.key ? "" : e.key), g(f !== e.key && e.types.length === 1 ? e.types[0] : ""), ye(""), xe(""), A(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("span", {
								className: "category-tile-icon",
								"aria-hidden": "true",
								children: On[e.key] || "▤"
							}), /* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.label) })]
						}, e.key)) : (y ? [y] : l.areas).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "category-tile forum-tile" + (y === e ? " is-open" : ""),
							style: { background: dn(l.areas.indexOf(e)) },
							"aria-pressed": y === e,
							onClick: () => {
								b(y === e ? "" : e), de(""), me(""), ge(""), A(1);
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("span", {
									className: "category-tile-icon",
									"aria-hidden": "true",
									children: ln(e)
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "forum-tile-copy",
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: o(cn(e)) }), /* @__PURE__ */ (0, _.jsx)("small", { children: o(un(e)) })]
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
						children: [/* @__PURE__ */ (0, _.jsx)(pn, {
							area: y,
							forum: le
						}), /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-primary",
							onClick: () => R(null),
							children: ["✎ ", o("Thema erstellen")]
						})]
					}),
					re && /* @__PURE__ */ (0, _.jsx)("p", {
						className: "club-notice",
						role: "status",
						children: re
					}),
					e === "forum" && y && /* @__PURE__ */ (0, _.jsx)("button", {
						className: "community-overview-link",
						onClick: () => {
							b(""), D(!1), A(1);
						},
						children: o("← Alle Forumsbereiche")
					}),
					(e === "gallery" || e === "library" && f || e === "forum" && y) && /* @__PURE__ */ (0, _.jsxs)("div", {
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
								}), F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
								}), Object.entries(Cn).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(t)
								}, e))]
							})] }),
							e === "forum" && ["Fahrzeuge", "Technik"].includes(y) && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug"), /* @__PURE__ */ (0, _.jsxs)("select", {
								value: ue,
								onChange: (e) => {
									de(e.target.value), A(1);
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Modelle")
								}), F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
									De.length === 1 && g(De[0]), R(null);
								},
								children: [o("Dokument hochladen"), " ＋"]
							})
						]
					}),
					e === "library" && !f || e === "forum" && !y ? null : Ae ? ne ? /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: o("Beiträge werden geladen …")
					}) : M ? /* @__PURE__ */ (0, _.jsxs)("p", {
						className: "collection-state error",
						role: "alert",
						children: [M, /* @__PURE__ */ (0, _.jsx)("button", {
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
							children: o(E ? "Keine passenden Beiträge gefunden." : Tn[e].empty)
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
										children: /* @__PURE__ */ (0, _.jsx)(_n, { url: e.url })
									}) : /* @__PURE__ */ (0, _.jsx)("span", {
										className: "lib-thumb is-empty",
										"aria-hidden": "true",
										children: "PDF"
									});
								})(),
								e === "gallery" && t.files[0] && !E && /* @__PURE__ */ (0, _.jsx)("button", {
									className: "community-cover",
									onClick: () => B(t.id),
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
												new Date((e === "gallery" ? En(t.classification.date) : "") || t.createdAt).toLocaleDateString(r())
											]
										}),
										e === "forum" && En(t.classification.area) && /* @__PURE__ */ (0, _.jsx)("p", {
											className: "community-area-tag",
											children: o(En(t.classification.area))
										}),
										/* @__PURE__ */ (0, _.jsxs)("h2", { children: [t.pinned && /* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Angeheftet"), " · "] }), /* @__PURE__ */ (0, _.jsx)("button", {
											className: "card-title-button",
											onClick: () => {
												let n = e === "library" ? t.files.find((e) => e.mime === "application/pdf") : void 0;
												n ? je(t, n) : B(t.id);
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
												disabled: ae,
												className: "market-primary",
												onClick: () => void Ne(t, "approve"),
												children: o("Freigeben")
											}), /* @__PURE__ */ (0, _.jsx)("button", {
												disabled: ae,
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
												disabled: ae,
												onClick: () => void Ne(t, "restore"),
												children: o("Wiederherstellen")
											}) : /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: t.canEdit && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												onClick: () => R(t),
												children: o("Bearbeiten")
											}), e !== "gallery" && e !== "library" && /* @__PURE__ */ (0, _.jsx)("button", {
												className: "market-text-button",
												onClick: () => V(t),
												children: o("Ins Archiv verschieben")
											})] }) })
										})
									]
								})
							] }, t.id))
						}),
						/* @__PURE__ */ (0, _.jsx)(Wt, {
							page: O,
							pages: u.pages,
							change: A
						})
					] }) : /* @__PURE__ */ (0, _.jsx)("p", {
						className: "collection-state lib-hint",
						children: o("Bitte Dokumentart und Fahrzeug wählen.")
					})
				] })
			]
		}),
		L !== void 0 && /* @__PURE__ */ (0, _.jsx)(An, {
			kind: e,
			item: L,
			initialArea: y,
			groupTypes: e === "library" ? De : [],
			suggestedTitle: e === "library" && f === "magazine" ? ke() : "",
			initialDocumentType: m,
			accessClasses: u.accessClasses || ["open"],
			nonce: t,
			close: () => R(void 0),
			saved: (t) => {
				R(void 0), Me(e === "gallery" ? "Fotos hochgeladen. Die Galerie-Moderation prüft sie vor der Veröffentlichung." : t.status === "pending" ? "Beitrag zur Prüfung eingereicht." : "Beitrag gespeichert."), B(t.id);
			}
		}),
		se && /* @__PURE__ */ (0, _.jsx)(W, {
			title: se.title,
			close: () => ce(null),
			children: /* @__PURE__ */ (0, _.jsx)(Qt, {
				url: se.file.url,
				title: se.title,
				download: se.download ? se.file.url : !1
			})
		}),
		H && /* @__PURE__ */ (0, _.jsx)(W, {
			title: H.name,
			close: () => U(null),
			children: /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
				fallback: /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Leseansicht wird geladen …")
				}),
				children: /* @__PURE__ */ (0, _.jsx)(xn, {
					url: H.url,
					title: H.name,
					initialFullscreen: !0,
					back: () => U(null)
				})
			})
		}),
		z !== null && /* @__PURE__ */ (0, _.jsx)(jn, {
			id: z,
			nonce: t,
			close: () => B(null),
			updated: () => Me()
		}),
		ie && /* @__PURE__ */ (0, _.jsx)(W, {
			title: "Beitrag archivieren",
			close: () => V(null),
			busy: ae,
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-dialog-body",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						"«",
						ie.title,
						"» ins Archiv verschieben? Sie können den Beitrag dort wiederherstellen."
					] }),
					M && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "alert",
						children: M
					}),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: ae,
							onClick: () => V(null),
							children: o("Abbrechen")
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: ae,
							onClick: () => void Ne(ie, "trash"),
							children: o("Ins Archiv verschieben")
						})]
					})
				]
			})
		})
	] });
}
function An({ kind: e, item: t, nonce: n, close: r, saved: i, accessClasses: a, initialDocumentType: s, groupTypes: c = [], suggestedTitle: l = "", initialArea: u = "" }) {
	let d = N(), f = (0, h.useRef)(crypto.randomUUID()), p = (0, h.useRef)(/* @__PURE__ */ new WeakMap()), [m, g] = (0, h.useState)(t ? k(En(t.classification?.documentType)) : s), [v, b] = (0, h.useState)((e === "gallery" ? t?.description : t?.descriptionHtml || t?.description) || ""), x = e === "library" && !t && m === "magazine", S = e === "library" && !t && [
		"magazine",
		"newsletter",
		"statutes",
		"club",
		"agm",
		"board",
		"confidential",
		"operations"
	].includes(m), [T, E] = (0, h.useState)([]), [D, A] = (0, h.useState)(""), [ee, ne] = (0, h.useState)("add"), [j, M] = (0, h.useState)([]), [P, re] = (0, h.useState)(""), [I, L] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		if (e !== "gallery" || t) return;
		let n = new AbortController();
		return C(Sn, {
			operation: "gallery-events",
			recent: "1"
		}, n.signal).then(M).catch(() => {}), fetch(`${y}/wp-admin/admin-ajax.php?action=strc_session`, {
			credentials: "include",
			signal: n.signal
		}).then(async (e) => await e.json()).then((e) => L(e.displayName || "")).catch(() => {}), () => n.abort();
	}, [e, t]);
	let [R, z] = (0, h.useState)({}), [B, ie] = (0, h.useState)(""), [V, ae] = (0, h.useState)([]), [oe, H] = (0, h.useState)(""), [U, se] = (0, h.useState)(!1), [ce, le] = (0, h.useState)(!1), ue = (0, h.useRef)(!1);
	(0, h.useEffect)(() => {
		if (e !== "gallery" || t) return;
		let n = new AbortController();
		return C(Sn, { operation: "albums" }, n.signal).then(E).catch((e) => {
			n.signal.aborted || H(e.message);
		}), () => n.abort();
	}, [e, t]);
	function de(t) {
		if (H(""), x) {
			let e = t[0];
			if (!e) return;
			if (e.type !== "application/pdf" || e.size > 25 * 1024 * 1024) {
				H("Bitte ein PDF-Dokument bis 25 MB auswählen.");
				return;
			}
			ae([e]);
			return;
		}
		let n = e === "gallery" ? 20 : 6;
		if (e === "gallery" && t.some((e) => e.size < 2e6 || e.size > 10 * 1024 * 1024)) {
			H("Galeriebilder: je 2 bis 10 MB. Bitte das Originalfoto der Kamera oder des Smartphones verwenden (nicht aus WhatsApp).");
			return;
		}
		if (V.length + t.length > n) {
			H(`Bitte höchstens ${n} ${e === "gallery" ? "Galeriebilder" : "Dateien"} auswählen.`);
			return;
		}
		let r = [
			"image/jpeg",
			"image/png",
			"image/webp",
			...e === "gallery" ? [] : ["application/pdf"]
		];
		if (t.some((t) => !r.includes(t.type) || t.size < (e === "gallery" ? 2e6 : 1) || t.size > (e === "gallery" ? 10 : e === "library" && t.type === "application/pdf" ? 100 : 20) * 1024 * 1024)) {
			H(e === "gallery" ? "Galeriebilder: je 2 bis 10 MB. Bitte das Originalfoto der Kamera oder des Smartphones verwenden (nicht aus WhatsApp)." : "Bilder: maximal 20 MB. Bibliotheks-PDFs: maximal 100 MB; sonst 20 MB.");
			return;
		}
		if (e !== "gallery" && [...V, ...t].reduce((e, t) => e + t.size, 0) > 120 * 1024 * 1024) {
			H("Alle Dateien zusammen dürfen höchstens 120 MB gross sein.");
			return;
		}
		ae((e) => [...e, ...t]);
	}
	async function fe(r) {
		if (!ue.current) {
			if (!t && e !== "forum" && !V.length) {
				H("Bitte mindestens eine Datei auswählen.");
				return;
			}
			ue.current = !0, se(!0), H("");
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
				if (e === "gallery" && V.length) {
					let e = null, r = D || String(t?.id || ""), o = [];
					for (let t of V) {
						let i = new FormData();
						for (let [e, t] of a.entries()) i.append(e, t);
						i.set("operation", r ? "append" : "create"), r && i.set("id", r), i.append("files[]", t), p.current.has(t) || p.current.set(t, crypto.randomUUID()), i.set("fileToken", p.current.get(t)), ie(`${V.indexOf(t) + 1} / ${V.length} · ${t.name}`), i.set("caption", R[t.name + "-" + t.size] || "");
						try {
							e = await w(Sn, n, i), r = String(e.id), A(r);
						} catch (e) {
							o.push(t.name + ": " + e.message);
						}
					}
					if (o.length) {
						ae(V.filter((e) => o.some((t) => t.startsWith(e.name + ": ")))), H("Gespeicherte Bilder bleiben erhalten. Fehlgeschlagen: " + o.join(" · "));
						return;
					}
					e && i(e);
				} else V.forEach((e) => a.append("files[]", e)), i(await w(Sn, n, a));
			} catch (e) {
				H(e.message);
			} finally {
				ue.current = !1, se(!1);
			}
		}
	}
	return e === "library" && !m ? /* @__PURE__ */ (0, _.jsx)(W, {
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
	}) : /* @__PURE__ */ (0, _.jsx)(W, {
		title: t ? e === "gallery" ? "Album bearbeiten" : "Beitrag bearbeiten" : e === "library" ? (d.libraryTypes.find((e) => e.key === m)?.label || "Dokument") + " hochladen" : o(Tn[e].create),
		close: r,
		busy: U,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: (e) => {
				e.preventDefault(), fe(e.currentTarget);
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: U,
					children: [
						e === "gallery" && !t && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "gallery-mode",
							role: "radiogroup",
							"aria-label": o("Album"),
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "radio",
								name: "galleryMode",
								checked: ee === "add",
								onChange: () => ne("add")
							}), o("Bilder zu einer Veranstaltung hinzufügen")] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "radio",
								name: "galleryMode",
								checked: ee === "new",
								onChange: () => {
									ne("new"), A(""), re("");
								}
							}), o("Neues Album anlegen")] })]
						}),
						e === "gallery" && !t && ee === "add" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Veranstaltung *"),
							/* @__PURE__ */ (0, _.jsxs)("select", {
								required: !0,
								value: P,
								onChange: (e) => {
									let t = e.target.value;
									re(t);
									let n = T.find((e) => String(e.eventId || "") === t);
									A(n ? String(n.id) : "");
								},
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), j.map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
									value: e.id,
									children: [e.title, e.date ? " · " + new Date(e.date).toLocaleDateString("de-CH") : ""]
								}, e.id))]
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: o(D ? "Die Bilder werden dem bestehenden Album dieser Veranstaltung hinzugefügt." : "Für diese Veranstaltung wird ein Album angelegt.") })
						] }),
						e === "gallery" && !t && ee === "add" && P && !D && (() => {
							let e = j.find((e) => String(e.id) === P);
							return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "hidden",
									name: "title",
									value: e?.title || ""
								}),
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "hidden",
									name: "eventId",
									value: P
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
						(e !== "gallery" || t || ee === "new") && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Titel"),
							/* @__PURE__ */ (0, _.jsx)("input", {
								name: "title",
								required: !0,
								maxLength: 160,
								defaultValue: t?.title || (x ? l : "")
							}),
							x && /* @__PURE__ */ (0, _.jsx)("small", { children: o("Format: TR-Magazine . Jahr . Ausgabe Nummer") })
						] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeugmodell (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "model",
								defaultValue: En(t?.classification?.model),
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Modelle / keine Zuordnung")
								}), F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bereich"), /* @__PURE__ */ (0, _.jsx)("select", {
								name: "area",
								defaultValue: En(t?.classification?.area) || u || "Technik",
								children: d.areas.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(cn(e))
								}, e))
							})] })]
						}),
						e === "library" && d.libraryTypes.find((e) => e.key === m)?.fields.includes("model") && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Fahrzeugmodelle (optional)"),
							/* @__PURE__ */ (0, _.jsx)("select", {
								name: "models[]",
								multiple: !0,
								size: 5,
								defaultValue: t && Array.isArray(t.classification.models) ? t.classification.models : En(t?.classification?.model) ? [En(t?.classification?.model)] : [],
								children: F.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: e
								}, e))
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: o("Mehrere Modelle mit ⌘-Klick oder Strg-Klick auswählen.") })
						] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Technikbereich (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "component",
							defaultValue: En(t?.classification?.component),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Bitte wählen")
							}), d.components.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Für Reiseberichte und lange Mitgliederbeiträge eignet sich der Bereich «Events & Reisen». PDF-Dateien können Sie zusammen mit dem Beitrag hochladen."
						}),
						e === "gallery" && (t || ee === "new") && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kategorie"), /* @__PURE__ */ (0, _.jsx)("select", {
								name: "galleryCategory",
								defaultValue: En(t?.classification?.galleryCategory) || "events",
								children: Object.entries(Cn).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(t)
								}, e))
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Veranstaltungsdatum"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "date",
								type: "date",
								defaultValue: En(t?.classification?.date)
							})] })]
						}),
						t && e === "gallery" && En(t.classification?.eventId) && /* @__PURE__ */ (0, _.jsx)("input", {
							type: "hidden",
							name: "eventId",
							value: En(t.classification.eventId)
						}),
						e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "gallery-photographer",
							children: [
								o("Fotograf/in"),
								": ",
								/* @__PURE__ */ (0, _.jsx)("strong", { children: I || En(t?.classification?.photographer) || o("Ihr Name") }),
								" ",
								/* @__PURE__ */ (0, _.jsxs)("small", { children: [
									"(",
									o("wird automatisch eingetragen"),
									")"
								] })
							]
						}),
						e === "library" && !x && /* @__PURE__ */ (0, _.jsx)(te, {
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
							disabled: U
						})] }) : /* @__PURE__ */ (0, _.jsx)(Ve, {
							label: e === "forum" ? "Beitrag" : "Beschreibung",
							value: v,
							onChange: b,
							disabled: U
						}),
						!t && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `market-dropzone ${ce ? "is-dragging" : ""}`,
							onDragOver: (e) => {
								e.preventDefault(), U || le(!0);
							},
							onDragLeave: () => le(!1),
							onDrop: (e) => {
								e.preventDefault(), le(!1), U || de(Array.from(e.dataTransfer.files));
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
										de(Array.from(e.target.files || [])), e.target.value = "";
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
							children: V.map((t, n) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
								/* @__PURE__ */ (0, _.jsxs)("span", { children: [
									t.name,
									" · ",
									(t.size / 1024 / 1024).toFixed(1),
									" MB"
								] }),
								e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bildbeschriftung"), /* @__PURE__ */ (0, _.jsx)("input", {
									maxLength: 240,
									value: R[t.name + "-" + t.size] || "",
									onChange: (e) => z((n) => ({
										...n,
										[t.name + "-" + t.size]: e.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									"aria-label": `${t.name} entfernen`,
									onClick: () => ae((e) => e.filter((e, t) => t !== n)),
									children: o("Entfernen")
								})
							] }, `${n}-${t.name}`))
						})] }),
						!t && e === "gallery" && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "gallery-disclaimer",
							children: o("Mit dem Hochladen bestätigen Sie, dass die Fotos auf der Website und in Publikationen des Swiss TR-Club verwendet werden dürfen. Im Zweifel einfach hochladen – die Galerie-Moderation prüft jedes Bild vor der Veröffentlichung.")
						}),
						!t && !S && e !== "gallery" && (e !== "forum" || V.length > 0) && /* @__PURE__ */ (0, _.jsxs)("label", {
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
				U && B && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: B
				}),
				!S && /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "club-hint",
					children: [
						o(e === "library" ? "Sichtbarkeit gemäss gewählter Zugriffsklasse." : "Sichtbar für Clubmitglieder."),
						" ",
						o("Laden Sie nur Material hoch, das Sie teilen dürfen.")
					]
				}),
				oe && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state error",
					role: "alert",
					children: oe
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: U,
						onClick: r,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: U,
						children: o(U ? "Wird gespeichert …" : t ? "Änderungen speichern" : e === "forum" ? "Zur Prüfung einreichen" : "Hochladen")
					})]
				})
			]
		})
	});
}
function jn({ id: e, nonce: t, close: n, updated: i }) {
	let a = N();
	function s(e, t) {
		let n = En(t);
		return e === "documentType" ? o(a.libraryTypes.find((e) => e.key === n)?.label || n) : e === "language" ? o({
			de: "Deutsch",
			fr: "Français",
			en: "English",
			multi: "Mehrsprachig",
			other: "Nicht angegeben"
		}[n] || n) : e === "galleryCategory" ? o(Cn[n] || n) : n;
	}
	let [c, l] = (0, h.useState)(null), [u, d] = (0, h.useState)(1), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(!0), [x, S] = (0, h.useState)(""), [E, D] = (0, h.useState)(!1), [O, k] = (0, h.useState)(0), [A, ee] = (0, h.useState)(null), [te, ne] = (0, h.useState)(!1), [j, M] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let t = new AbortController();
		return C(Sn, {
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
	async function P() {
		D(!0), g("");
		try {
			await w(Sn, t, T({
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
	let F = c?.files.filter((e) => e.mime.startsWith("image/")) || [], re = Object.entries(c?.classification || {}).filter(([e, t]) => e !== "access" && e !== "eventId" && (Array.isArray(t) ? t.length > 0 : typeof t == "string" && t.trim() !== "")).map(([e, t]) => ({
		key: e,
		label: o(wn[e] || e),
		value: s(e, t)
	})), I = A && A.key === F[O]?.key ? A.value : F[O]?.caption || "", [L, R] = (0, h.useState)(!1), [z, B] = (0, h.useState)([]), [ie, V] = (0, h.useState)(null), [ae, oe] = (0, h.useState)(null);
	async function H(n, r) {
		D(!0);
		try {
			return await w(Sn, t, T({
				operation: n,
				id: String(e),
				...r
			})), oe(null), p((e) => e + 1), i(), !0;
		} catch (e) {
			return g(e.message), !1;
		} finally {
			D(!1);
		}
	}
	async function U() {
		let e = F[O];
		if (!(!c || !e)) {
			ne(!0), g("");
			try {
				await w(Sn, t, T({
					operation: "captions",
					id: String(c.id),
					key: e.key,
					caption: I
				})), ee(null), p((e) => e + 1), i();
			} catch (e) {
				g(e.message);
			} finally {
				ne(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsx)(W, {
		title: c?.title || "Beitrag",
		close: n,
		busy: E,
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "club-dialog-body",
			children: [y ? /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Beitrag wird geladen …")
			}) : /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: c && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "eyebrow",
					children: [
						c.author,
						" · ",
						new Date(c.createdAt).toLocaleDateString(r())
					]
				}),
				re.length > 4 ? /* @__PURE__ */ (0, _.jsxs)("details", {
					className: "community-classification",
					children: [/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
						o("Beitragsdetails"),
						" (",
						re.length,
						")"
					] }), /* @__PURE__ */ (0, _.jsx)("dl", { children: re.map((e) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: e.label }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.value })] }, e.key)) })]
				}) : re.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: re.map((e) => `${e.label}: ${e.value}`).join(" · ")
				}),
				c.kind === "gallery" && En(c.classification.eventId) && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#veranstaltung/" + En(c.classification.eventId),
					children: o("Zugehörige Veranstaltung")
				}) }),
				c.canReview && c.kind === "gallery" && /* @__PURE__ */ (0, _.jsx)(Nn, {
					item: c,
					busy: E,
					act: H
				}),
				" ",
				c.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(pe, { html: c.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "community-description",
					children: c.description
				}),
				F.length > 0 && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "community-gallery",
					children: [
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "community-gallery-main" + (j ? " is-zoomed" : ""),
							onClick: () => M((e) => !e),
							"aria-label": j ? "Bild verkleinern" : "Bild vergrössern",
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: F[O]?.url || F[0].url,
								alt: F[O]?.caption || F[O]?.name || F[0].name,
								width: 1e3,
								height: 700
							})
						}),
						F.length > 1 && /* @__PURE__ */ (0, _.jsx)("div", {
							className: "community-thumbnails",
							children: F.map((e, t) => /* @__PURE__ */ (0, _.jsx)("button", {
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
							href: F[O]?.url || F[0].url,
							download: F[O]?.name || F[0].name,
							children: o("Bild herunterladen")
						}),
						c.kind === "gallery" && F.length > 1 && /* @__PURE__ */ (0, _.jsxs)("details", {
							className: "gallery-download",
							children: [
								/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Mehrere Bilder herunterladen") }),
								/* @__PURE__ */ (0, _.jsx)("div", {
									className: "gallery-download-grid",
									children: F.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
										type: "checkbox",
										checked: z.includes(e.key),
										onChange: (t) => B((n) => t.target.checked ? [...n, e.key] : n.filter((t) => t !== e.key))
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
										onClick: () => B(z.length === F.length ? [] : F.map((e) => e.key)),
										children: o(z.length === F.length ? "Auswahl aufheben" : "Alle auswählen")
									}), /* @__PURE__ */ (0, _.jsxs)("button", {
										type: "button",
										className: "market-primary",
										disabled: !z.length,
										onClick: () => {
											F.filter((e) => z.includes(e.key)).forEach((e, t) => setTimeout(() => {
												let t = document.createElement("a");
												t.href = e.url, t.download = e.name, document.body.appendChild(t), t.click(), t.remove();
											}, t * 500));
										},
										children: [
											o("Ausgewählte herunterladen"),
											" (",
											z.length,
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
						F[O]?.originalUrl && c.kind === "gallery" && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-actions",
							children: [/* @__PURE__ */ (0, _.jsx)("a", {
								href: F[O]?.originalUrl,
								download: !0,
								children: o("Original herunterladen")
							}), ["public", "retainOriginal"].filter((e) => e !== "public" || c.canReview).map((n) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: !!F[O]?.[n],
								onChange: async (r) => {
									let i = F[O];
									try {
										await w(Sn, t, T({
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
							children: F[O]?.caption || F[O]?.name
						}),
						F[O]?.canCaption && c.kind === "gallery" && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "community-caption-editor",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bildbeschreibung"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								maxLength: 240,
								rows: 3,
								value: I,
								onChange: (e) => ee({
									key: F[O].key,
									value: e.target.value
								}),
								disabled: te
							})] }), /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: te,
								onClick: () => void U(),
								children: te ? "Wird gespeichert …" : "Bildbeschreibung speichern"
							})]
						}),
						F.length > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
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
									F.length
								] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									disabled: O >= F.length - 1,
									onClick: () => k((e) => e + 1),
									children: o("Nächstes Bild")
								})
							]
						})
					]
				}),
				ie && /* @__PURE__ */ (0, _.jsx)(xn, {
					url: ie.url,
					title: ie.name,
					back: () => V(null)
				}),
				/* @__PURE__ */ (0, _.jsx)("ul", {
					className: "community-files",
					children: c.files.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
						e.mime === "application/pdf" && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-text-button",
							onClick: () => V(e),
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
						onClick: () => void H("pin", { pinned: c.pinned ? "0" : "1" }),
						children: o(c.pinned ? "Anheftung entfernen" : "Thema anheften")
					}), /* @__PURE__ */ (0, _.jsx)(Mn, {
						id: e,
						merge: (e) => void H("merge", { target: String(e) }),
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
									await w(Sn, t, T({
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
									await w(Sn, t, T({
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
										await w(Sn, t, T({
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
						}), L ? /* @__PURE__ */ (0, _.jsxs)("span", {
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
											await w(Sn, t, T({
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
									onClick: () => R(!1),
									children: o("Abbrechen")
								})
							]
						}) : /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-text-button",
							disabled: E,
							onClick: () => R(!0),
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
									onClick: () => oe({
										id: e.id,
										text: e.text
									}),
									children: o("Bearbeiten")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-text-button",
									disabled: E,
									onClick: () => void H("reply-hide", { reply: String(e.id) }),
									children: o("Antwort ausblenden")
								})]
							})
						] }, e.id))
					}),
					ae && /* @__PURE__ */ (0, _.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault(), H("reply-edit", {
								reply: String(ae.id),
								text: ae.text
							});
						},
						children: [
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Antwort bearbeiten"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								required: !0,
								maxLength: 5e3,
								value: ae.text,
								onChange: (e) => oe({
									...ae,
									text: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: E,
								children: o("Speichern")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								onClick: () => oe(null),
								children: o("Abbrechen")
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(Wt, {
						page: u,
						pages: c.replyPages,
						change: (e) => {
							b(!0), d(e);
						}
					}),
					!c.closed && /* @__PURE__ */ (0, _.jsxs)("form", {
						className: "club-reply-form",
						onSubmit: (e) => {
							e.preventDefault(), P();
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
function Mn({ id: e, merge: t, busy: n }) {
	let [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	return (0, h.useEffect)(() => {
		let t = new AbortController();
		return C(Sn, {
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
function Nn({ item: e, busy: t, act: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(Sn, { operation: "albums" }, e.signal).then(s).catch((t) => {
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
var Pn = {
	history: "Club-Geschichte",
	news: "Neuigkeiten",
	applications: "Anträge",
	registration: "Anmeldung",
	profile: "Mein Profil",
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
}, Fn = {
	regions: "regionen",
	models: "tr-modelle",
	editorial: "redaktion",
	market: "marktplatz",
	shop: "tr-shop"
}, In = {
	fahrzeuge: "Fahrzeuge",
	ersatzteile: "Ersatzteile",
	meine: "Meine Inserate"
}, Ln = {
	artikel: "Artikel erfassen",
	lager: "Lager",
	abrechnung: "Abrechnung"
}, Rn = {
	zuerich: "Zürich",
	"suisse-romande": "Suisse romande"
}, zn = [
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
function Bn({ page: e, subroute: t }) {
	let { text: n } = fe();
	if (e === "home") return null;
	let r = [
		"history",
		"organisation",
		"mission",
		"membership",
		"models"
	].includes(e) ? [["#club", "Club"]] : e === "triungsters" ? [["#regionen", "Regionen"]] : zn.includes(e) ? [["#mitglieder", "Mitgliederbereich"]] : e === "registration" ? [["#agenda", "Agenda"]] : e === "shop" ? [["#marktplatz", "Marktplatz"]] : [];
	e === "clubdocs" && r.push(["#bibliothek", "Bibliothek"]);
	let i = e === "regions" && t ? Rn[t] || t.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ") : e === "models" && t ? n("model-" + t + ".title", t.toUpperCase()) : e === "editorial" && t ? t === "people" ? "Moderatorrollen" : n(t + ".title", "Seite bearbeiten") : e === "market" ? In[t] || "" : e === "shop" && Ln[t] || "";
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
				href: "#" + (Fn[e] || ""),
				children: o(Pn[e])
			}) }), /* @__PURE__ */ (0, _.jsx)("li", {
				"aria-current": "page",
				children: o(i)
			})] }) : /* @__PURE__ */ (0, _.jsx)("li", {
				"aria-current": "page",
				children: o(Pn[e] || "Swiss TR-Club")
			})
		] })
	});
}
//#endregion
//#region app/components/MemberForms.tsx
var Vn = "strc_forms";
function Hn() {
	let [e, t] = (0, h.useState)(""), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(!1), l = (0, h.useRef)(!1), u = (0, h.useRef)("");
	return (0, h.useEffect)(() => {
		C(Vn, { operation: "config" }).then((e) => t(e.nonce)).catch(() => r("Kontaktformular konnte nicht geladen werden. Bitte die Seite neu laden."));
	}, []), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "contact-form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: "Kontakt aufnehmen" }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: "Felder mit * sind erforderlich." }),
			i ? /* @__PURE__ */ (0, _.jsx)(L, { message: i }) : /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "club-form",
				onSubmit: async (t) => {
					if (t.preventDefault(), l.current) return;
					let n = new FormData(t.currentTarget);
					n.set("operation", "contact"), u.current ||= crypto.randomUUID(), n.set("requestId", u.current), l.current = !0, c(!0), r("");
					try {
						a((await w(Vn, e, n)).message);
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
							/* @__PURE__ */ (0, _.jsx)(ae, {})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(V, {}),
					/* @__PURE__ */ (0, _.jsx)(L, { error: n }),
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
function Un() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(0), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(null), [p, m] = (0, h.useState)(null), g = (0, h.useRef)(""), y = (0, h.useRef)(""), b = (0, h.useRef)(!1);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(Vn, { operation: "profile-read" }, e.signal).then(t).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [n]);
	async function x(t) {
		if (!(!e || b.current)) {
			b.current = !0, u(!0), a(""), c("");
			try {
				c((await w(Vn, e.nonce, t)).message), r((e) => e + 1), f(null), m(null), y.current = "";
			} catch (e) {
				a(e.message);
			} finally {
				u(!1), b.current = !1;
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero",
		children: [
			/* @__PURE__ */ (0, _.jsx)("p", {
				className: "eyebrow",
				children: o("Mein Mitgliederbereich")
			}),
			/* @__PURE__ */ (0, _.jsx)("h1", { children: o("Mein Profil & meine Triumphs") }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: "Kontaktdaten aktualisieren und Fahrzeuge pflegen." })
		]
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content member-forms",
		children: [
			/* @__PURE__ */ (0, _.jsx)("a", {
				href: "#mitglieder",
				children: "← Zurück zur Übersicht"
			}),
			/* @__PURE__ */ (0, _.jsx)(L, {
				error: i,
				message: s
			}),
			i && /* @__PURE__ */ (0, _.jsx)("button", {
				className: "market-text-button",
				onClick: () => {
					a(""), r((e) => e + 1);
				},
				children: o("Neu laden")
			}),
			e ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)(R, {
					title: o("Meine Mitgliedschaft"),
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", { children: e.name }),
						/* @__PURE__ */ (0, _.jsxs)("dl", {
							className: "profile-facts",
							children: [
								/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Mitgliedsnummer") }),
								/* @__PURE__ */ (0, _.jsx)("dd", { children: e.membership?.member_number || "–" }),
								/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Mitgliedschaft") }),
								/* @__PURE__ */ (0, _.jsx)("dd", { children: {
									individual: "Einzelmitgliedschaft",
									couple_primary: "Paarmitglied – Hauptmitglied",
									couple_partner: "Paarmitglied – Co-Pilot",
									youth: "Young / TRiungsters",
									honorary: "Ehrenmitglied"
								}[e.membership?.membership_type || ""] || e.membership?.membership_type || "Administrativer Zugang" }),
								/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Region") }),
								/* @__PURE__ */ (0, _.jsx)("dd", { children: e.membership?.region || "Noch nicht zugeordnet" })
							]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Offizielle Mitgliedsdaten werden vom Club in Fairgate geführt."
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("form", {
					className: "club-form",
					onSubmit: (e) => {
						e.preventDefault();
						let t = new FormData(e.currentTarget);
						t.set("operation", "profile"), y.current ||= crypto.randomUUID(), t.set("requestId", y.current), x(t);
					},
					children: [
						/* @__PURE__ */ (0, _.jsxs)("fieldset", {
							disabled: l,
							children: [
								/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Kontaktdaten ändern") }),
								e.pending.length > 0 && /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "form-review",
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: "Übernahme noch offen" }), /* @__PURE__ */ (0, _.jsxs)("p", { children: [
										"Ihre letzte Änderungsanfrage vom ",
										new Date(e.pending[0].submittedAt).toLocaleString("de-CH"),
										" ist gespeichert. Die Felder zeigen diese gewünschte Änderung."
									] })]
								}),
								/* @__PURE__ */ (0, _.jsx)(B, {
									names: !1,
									values: e.pending[0]?.values || e.contact
								}, e.pending[0]?.id || "confirmed")
							]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Eine neue E-Mail-Adresse ändert Ihren Login erst nach bestätigtem Abgleich. Ihre bestehenden Daten bleiben bis dahin gültig."
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: l,
							children: o("Änderungsanfrage speichern")
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)(R, {
					title: o("Meine Triumphs"),
					children: [
						!e.canEditVehicles && /* @__PURE__ */ (0, _.jsx)("p", { children: "Die Fahrzeuge werden vom Hauptmitglied gepflegt." }),
						e.legacyVehicle && /* @__PURE__ */ (0, _.jsxs)("p", {
							className: "club-hint",
							children: [
								"Bisherige Fahrzeugangabe: ",
								e.legacyVehicle,
								". Diese bleibt erhalten."
							]
						}),
						!e.vehicles.length && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Noch keine Fahrzeuge erfasst.") }),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "profile-vehicles",
							children: e.vehicles.map((t) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [
								t.photo && /* @__PURE__ */ (0, _.jsx)(v, {
									unoptimized: !0,
									src: t.photo,
									alt: t.model,
									width: 320,
									height: 210
								}),
								/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
									t.model,
									" ",
									t.details
								] }),
								/* @__PURE__ */ (0, _.jsx)("p", { children: [
									t.year,
									t.colour,
									t.registration
								].filter(Boolean).join(" · ") }),
								/* @__PURE__ */ (0, _.jsx)("p", { children: t.status === "restoration" ? "In Restauration" : "Fahrbereit" }),
								e.canEditVehicles && /* @__PURE__ */ (0, _.jsxs)("div", {
									className: "club-actions",
									children: [/* @__PURE__ */ (0, _.jsx)("button", {
										className: "club-secondary",
										onClick: () => {
											a(""), f(t);
										},
										children: o("Bearbeiten")
									}), /* @__PURE__ */ (0, _.jsx)("button", {
										className: "market-text-button",
										onClick: () => m(t),
										children: o("Entfernen")
									})]
								})
							] }, t.id))
						}),
						e.canEditVehicles && /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							onClick: () => {
								a(""), g.current = crypto.randomUUID(), f(I());
							},
							children: "＋ Triumph hinzufügen"
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("form", {
					className: "club-form",
					onSubmit: (e) => {
						e.preventDefault();
						let t = new FormData(e.currentTarget);
						t.set("operation", "preferences"), x(t);
					},
					children: [/* @__PURE__ */ (0, _.jsxs)("fieldset", {
						disabled: l,
						children: [
							/* @__PURE__ */ (0, _.jsx)("legend", { children: o("Profilbild & Sichtbarkeit") }),
							e.photo && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: e.photo + `&v=${n}`,
								alt: "Ihr Profilbild",
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
								children: "Ein JPG-, PNG- oder WebP-Bild, höchstens 20 MB."
							}),
							/* @__PURE__ */ (0, _.jsxs)("label", {
								className: "application-consent",
								children: [/* @__PURE__ */ (0, _.jsx)("input", {
									name: "directory",
									type: "checkbox",
									value: "1",
									defaultChecked: e.preferences.directory
								}), /* @__PURE__ */ (0, _.jsx)("span", { children: "Mein Profil im Mitgliederverzeichnis anzeigen." })]
							}),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: "Das Verzeichnis ist ausschliesslich für aktive Clubmitglieder erreichbar. Wohnadressen werden dort nicht angezeigt."
							})
						]
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: l,
						children: o("Profileinstellungen speichern")
					})]
				}),
				d && /* @__PURE__ */ (0, _.jsx)(W, {
					title: d.id ? "Triumph bearbeiten" : "Triumph hinzufügen",
					close: () => f(null),
					busy: l,
					children: /* @__PURE__ */ (0, _.jsxs)("form", {
						className: "club-form",
						onSubmit: (e) => {
							e.preventDefault();
							let t = new FormData(e.currentTarget);
							Object.entries(d).forEach(([e, n]) => {
								e !== "photo" && t.set(e, String(n));
							}), t.set("requestId", g.current), t.set("operation", "vehicle-save"), x(t);
						},
						children: [
							/* @__PURE__ */ (0, _.jsxs)("fieldset", {
								disabled: l,
								children: [
									/* @__PURE__ */ (0, _.jsx)("legend", {
										className: "market-sr-only",
										children: "Fahrzeugangaben"
									}),
									/* @__PURE__ */ (0, _.jsx)(ie, {
										value: d,
										onChange: f
									}),
									/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Fahrzeugbild (optional)", /* @__PURE__ */ (0, _.jsx)("input", {
										type: "file",
										name: "photo[]",
										accept: "image/jpeg,image/png,image/webp"
									})] }),
									/* @__PURE__ */ (0, _.jsx)("p", {
										className: "club-hint",
										children: "Ein Bild, höchstens 20 MB. Nur eigenes oder freigegebenes Bildmaterial verwenden."
									}),
									d.photo && /* @__PURE__ */ (0, _.jsxs)("label", {
										className: "application-consent",
										children: [/* @__PURE__ */ (0, _.jsx)("input", {
											type: "checkbox",
											name: "removePhoto",
											value: "1"
										}), "Bisheriges Fahrzeugbild entfernen"]
									})
								]
							}),
							/* @__PURE__ */ (0, _.jsx)(L, { error: i }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-actions",
								children: [/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "club-secondary",
									disabled: l,
									onClick: () => f(null),
									children: o("Abbrechen")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-primary",
									disabled: l,
									children: l ? "Wird gespeichert …" : "Fahrzeug speichern"
								})]
							})
						]
					})
				}),
				p && /* @__PURE__ */ (0, _.jsx)(W, {
					title: "Fahrzeug entfernen",
					close: () => m(null),
					busy: l,
					children: /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-dialog-body",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [p.model, " aus Ihrer Fahrzeugliste entfernen? Bisherige Veranstaltungsanmeldungen bleiben erhalten."] }),
							/* @__PURE__ */ (0, _.jsx)(L, { error: i }),
							/* @__PURE__ */ (0, _.jsxs)("div", {
								className: "club-actions",
								children: [/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									disabled: l,
									onClick: () => m(null),
									children: o("Abbrechen")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-primary",
									disabled: l,
									onClick: () => void x(T({
										operation: "vehicle-remove",
										id: String(p.id),
										revision: p.revision || ""
									})),
									children: "Fahrzeug entfernen"
								})]
							})
						]
					})
				})
			] }) : /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: "Profil wird geladen …"
			})
		]
	})] });
}
//#endregion
//#region app/components/ApplicationInbox.tsx
var Wn = {
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
}, Gn = {
	single: "Einzelmitgliedschaft",
	couple: "Paarmitgliedschaft",
	young: "Young / TRiungsters"
}, Kn = [
	"queued",
	"syncing",
	"provisioning",
	"mail_pending"
];
function qn({ person: e, title: t }) {
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
function Jn({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(1), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_applications", { page: String(a) }, e.signal).then(n).catch((t) => {
			e.signal.aborted || d(t.message);
		}), () => e.abort();
	}, [a, c]), (0, h.useEffect)(() => {
		if (!r || !Kn.includes(r.state)) return;
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
			/* @__PURE__ */ (0, _.jsx)(L, { error: u }),
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
									/* @__PURE__ */ (0, _.jsx)("span", { children: Gn[e.type] || e.type }),
									/* @__PURE__ */ (0, _.jsx)("small", { children: Wn[e.state] || "Manueller Abgleich erforderlich" })
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
							children: Wn[r.state] || "Manueller Abgleich erforderlich"
						}),
						r.error && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "form-error",
							role: "alert",
							children: r.error
						}),
						/* @__PURE__ */ (0, _.jsxs)("p", { children: [
							/* @__PURE__ */ (0, _.jsx)("strong", { children: Gn[r.payload.membershipType] }),
							" · Region ",
							r.payload.region
						] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsx)(qn, {
								person: r.payload.person,
								title: "Antragsteller/in"
							}), r.payload.copilot && /* @__PURE__ */ (0, _.jsx)(qn, {
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
									disabled: f || Kn.includes(r.state)
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
			v && r && /* @__PURE__ */ (0, _.jsxs)(W, {
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
function Yn() {
	let { text: e, values: t } = fe(), n = (t.home?.photos ?? []).filter((e) => e.url).slice(0, 12), r = n.slice(0, 6), i = n.slice(6, 12), a = (e, t) => /* @__PURE__ */ (0, _.jsx)("div", {
		className: `home-reference-half is-${t}`,
		children: /* @__PURE__ */ (0, _.jsx)("div", {
			className: `home-reference-track${e.length > 1 ? " is-moving" : ""} ${t === "left" ? "to-right" : "to-left"}`,
			children: (e.length > 1 ? [0, 1] : [0]).map((t) => /* @__PURE__ */ (0, _.jsx)("div", {
				className: "home-reference-photo-set",
				"aria-hidden": t === 1,
				children: e.map((e, n) => /* @__PURE__ */ (0, _.jsx)("figure", { children: /* @__PURE__ */ (0, _.jsx)(v, {
					src: he(e.url),
					alt: t === 0 ? e.alt : "",
					width: 640,
					height: 480,
					priority: t === 0 && n < 2,
					style: ve(e.frame, "cover")
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
					})] }), /* @__PURE__ */ (0, _.jsx)(me, {
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
				/* @__PURE__ */ (0, _.jsx)(me, {
					id: "home.mission",
					className: "home-reference-story"
				})
			]
		})
	});
}
//#endregion
//#region app/components/Magazine.tsx
var Xn = (0, h.lazy)(() => import("./MagazineReader-DYdiJlXm.js"));
function Zn({ issue: e, loading: t, error: r, retry: i }) {
	let { text: a } = fe(), s = a("home.magazinePreviewPages", "1,3,4,12,13,18,19").split(/[^0-9]+/).map(Number).filter((e) => e > 0).slice(0, 12), { language: c } = n(), l = (e, t) => c === "fr" ? t : e, [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(0), [y, b] = (0, h.useState)(!1), x = (0, h.useRef)(null), S = (0, h.useRef)(!1), C = (e?.previewPages || []).slice(0, 6), w = Math.min(m, Math.max(0, C.length - 1)), T = e?.previewCaptions?.[w] || `${l("Vorschau", "Aperçu")} ${w + 1} · ${e?.title || ""}`;
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
			u && /* @__PURE__ */ (0, _.jsx)(W, {
				title: e?.title || l("Das TR-Magazin", "Le TR-Magazine"),
				close: y ? () => b(!1) : E,
				children: !f && e?.canRead && e.fileUrl && s.length ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-magazine-flip",
					children: [
						/* @__PURE__ */ (0, _.jsx)(Qt, {
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
					children: /* @__PURE__ */ (0, _.jsx)(Xn, {
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
var Qn;
function $n() {
	let e = new Intl.DateTimeFormat("en", {
		timeZone: "Europe/Zurich",
		year: "numeric",
		month: "numeric",
		day: "numeric"
	}).formatToParts(/* @__PURE__ */ new Date()), t = (t) => Number(e.find((e) => e.type === t)?.value), n = Math.floor(Date.UTC(t("year"), t("month") - 1, t("day")) / 864e5);
	if (Qn?.day === n) return Qn.cycle;
	let r = 0;
	try {
		let e = JSON.parse(sessionStorage.getItem("strc_home_cycle") || "null");
		e && Number.isSafeInteger(e.cycle) && e.cycle >= 0 && Number.isSafeInteger(e.day) && (r = (e.cycle + Math.max(1, n - e.day)) % 2147483647), sessionStorage.setItem("strc_home_cycle", JSON.stringify({
			day: n,
			cycle: r
		}));
	} catch {}
	return Qn = {
		day: n,
		cycle: r
	}, r;
}
function er({ content: e, loading: t, error: i, retry: a, events: o, eventsState: s, openNews: c, openEvent: l }) {
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
				/* @__PURE__ */ (0, _.jsx)(Zn, {
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
var tr = (e) => new Date(e).toLocaleDateString(r(), {
	day: "numeric",
	month: "long",
	year: "numeric"
});
function nr({ memberAccess: e, archive: t = !1, upcomingEvents: r, eventsState: i = "ready", openEvent: a }) {
	let { text: s, values: c } = fe(), { language: l } = n(), u = c.home?.partners ?? [], [d, f] = (0, h.useState)(null), [p, m] = (0, h.useState)(""), [g, y] = (0, h.useState)(0), [b, x] = (0, h.useState)(null), [S, w] = (0, h.useState)(!1), [T, E] = (0, h.useState)(""), [D] = (0, h.useState)($n);
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
			!t && /* @__PURE__ */ (0, _.jsx)(Yn, {}),
			!t && /* @__PURE__ */ (0, _.jsx)(er, {
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
											children: tr(e.date)
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
								src: he(e.image),
								alt: e.name,
								width: 150,
								height: 90
							})
						}, e.name))
					})]
				})
			}),
			b && /* @__PURE__ */ (0, _.jsx)(W, {
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
								tr(b.date)
							]
						}),
						b.image && /* @__PURE__ */ (0, _.jsx)(v, {
							src: b.image,
							alt: "",
							width: 1200,
							height: 800
						}),
						b.bodyHtml ? /* @__PURE__ */ (0, _.jsx)(pe, { html: b.bodyHtml }) : /* @__PURE__ */ (0, _.jsx)("p", { children: b.body })
					]
				})
			})
		]
	});
}
//#endregion
//#region app/page.tsx
var rr = window.strcSettings.wordpressUrl ?? "http://localhost:8080", ir = window.strcSettings.siteUrl ?? "http://localhost:3000", ar = {
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
function or() {
	return /* @__PURE__ */ (0, _.jsx)(i, { children: /* @__PURE__ */ (0, _.jsx)(ue, { children: /* @__PURE__ */ (0, _.jsx)(M, { children: /* @__PURE__ */ (0, _.jsx)(sr, {}) }) }) });
}
function sr() {
	let { language: e } = n(), [t, r] = (0, h.useState)("home"), [i, a] = (0, h.useState)(""), [s, l] = (0, h.useState)(null), [u, d] = (0, h.useState)([]), [f, p] = (0, h.useState)("loading"), [m, g] = (0, h.useState)(null), [y, b] = (0, h.useState)(""), { text: x } = fe(), [S, C] = (0, h.useState)(0);
	function w() {
		p("loading"), C((e) => e + 1);
	}
	(0, h.useEffect)(() => {
		let e = () => {
			let [e, t = ""] = window.location.hash.slice(1).split("/");
			a(t);
			let n = Object.keys(ar).find((t) => ar[t] === e);
			r(!e && new URLSearchParams(window.location.search).has("member") ? "members" : n ?? "home"), g(null), window.scrollTo({
				top: 0,
				behavior: "instant"
			});
		}, t = requestAnimationFrame(e);
		return window.addEventListener("hashchange", e), () => {
			cancelAnimationFrame(t), window.removeEventListener("hashchange", e);
		};
	}, []), (0, h.useEffect)(() => {
		let e = !0;
		return fetch(`${rr}/wp-admin/admin-ajax.php?action=strc_session`, { credentials: "include" }).then((e) => e.ok ? e.json() : Promise.reject()).then((t) => {
			e && l(t);
		}).catch(() => {
			e && l({
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
				let a = await fetch(`${rr}/?rest_route=/strc/v1/events&view=upcoming&limit=100&page=${r}&language=${e}`, {
					cache: "no-store",
					signal: t.signal
				});
				if (!a.ok) throw Error();
				let o = await a.json();
				n.push(...o.events), i = o.pages || 1, r++;
			} while (r <= i);
			t.signal.aborted || (d(n), p("ready"));
		}
		return n().catch(() => {
			t.signal.aborted || p("error");
		}), () => t.abort();
	}, [
		S,
		t,
		e
	]);
	let T = t === "agenda" && /^\d+$/.test(i) ? u.find((e) => e.id === Number(i)) ?? null : null;
	function E(e) {
		r(e), g(null), window.location.hash = ar[e], window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}
	function D(e) {
		b(e), window.setTimeout(() => b(""), 2600);
	}
	(0, h.useEffect)(() => {
		let e = new URL(window.location.href), t = e.searchParams.get("newsletter");
		if (!t) return;
		let n = {
			confirmed: "Newsletter-Anmeldung bestätigt. Willkommen!",
			unsubscribed: "Du wurdest vom Newsletter abgemeldet.",
			invalid: "Der Newsletter-Link ist ungültig oder wurde bereits verwendet."
		};
		n[t] && window.setTimeout(() => D(n[t]), 0), e.searchParams.delete("newsletter"), window.history.replaceState(null, "", e);
	}, []);
	let O = t === "mission" ? "club" : t === "models" ? "model-" + i : t === "regions" && i ? "region-" + i : t;
	return /* @__PURE__ */ (0, _.jsxs)("main", { children: [
		/* @__PURE__ */ (0, _.jsxs)("header", {
			className: "site-header",
			children: [/* @__PURE__ */ (0, _.jsxs)("button", {
				className: "brand brand-button",
				onClick: () => E("home"),
				"aria-label": o("Swiss TR-Club Startseite"),
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					className: "brand-logo",
					src: he(x("global.logo")),
					width: 954,
					height: 954,
					alt: o("Swiss TR-Club Logo"),
					priority: !0
				}), /* @__PURE__ */ (0, _.jsxs)("span", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: x("global.name") }), /* @__PURE__ */ (0, _.jsx)("small", { children: x("global.tagline") })] })]
			}), /* @__PURE__ */ (0, _.jsxs)("nav", {
				"aria-label": o("Hauptnavigation"),
				children: [/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "nav-tabs",
					children: [
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: t === "home" ? "active" : "",
							onClick: () => E("home"),
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
							onClick: () => E("club"),
							children: x("global.navClub")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: t === "agenda" ? "active" : "",
							onClick: () => E("agenda"),
							children: x("global.navAgenda")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: t === "regions" ? "active" : "",
							onClick: () => E("regions"),
							children: x("global.navRegions")
						}),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: ["market", "shop"].includes(t) ? "active" : "",
							onClick: () => E("market"),
							children: x("global.navMarket")
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
							onClick: () => E("members"),
							children: o(s?.memberAccess ? "Mitgliederbereich" : "Mitglieder-Login")
						})
					]
				}), /* @__PURE__ */ (0, _.jsx)(c, {})]
			})]
		}),
		s?.canEditContent && /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "editorial-access-bar",
			children: [
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: "#redaktion",
					children: o("Redaktion öffnen")
				}),
				s.editableDocuments?.includes(O) && /* @__PURE__ */ (0, _.jsx)("a", {
					href: `#redaktion/${O}`,
					children: o("Diese Seite bearbeiten")
				}),
				s.logoutUrl && /* @__PURE__ */ (0, _.jsx)("a", {
					href: s.logoutUrl,
					children: o("Abmelden")
				})
			]
		}),
		/* @__PURE__ */ (0, _.jsx)(Bn, {
			page: t,
			subroute: i
		}),
		t === "editorial" && (s?.canEditContent ? /* @__PURE__ */ (0, _.jsx)(bt, {
			nonce: s.editorialNonce || "",
			canManageEvents: !!s.canManageEvents
		}) : /* @__PURE__ */ (0, _.jsx)(vr, {
			session: s,
			navigate: E
		})),
		t === "home" && /* @__PURE__ */ (0, _.jsx)(cr, {
			memberAccess: !!s?.memberAccess,
			navigate: E,
			events: u,
			eventsState: f,
			openEvent: g
		}),
		t === "club" && /* @__PURE__ */ (0, _.jsx)(mt, {
			canEdit: !!s?.canEditContent,
			memberAccess: !!s?.memberAccess
		}),
		t === "mission" && /* @__PURE__ */ (0, _.jsx)(ht, {}),
		t === "models" && /* @__PURE__ */ (0, _.jsx)(rt, {
			selected: i,
			canEdit: !!s?.canEditContent
		}, i),
		[
			"organisation",
			"membership",
			"shop",
			"triungsters",
			"history"
		].includes(t) && /* @__PURE__ */ (0, _.jsx)(gt, {
			documentKey: O,
			canEdit: s?.editableDocuments?.includes(O)
		}, O),
		t === "agenda" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(Re, {
			memberAccess: !!s?.memberAccess,
			events: u,
			eventsState: f,
			retryEvents: w,
			openEvent: g
		}) }),
		t === "regions" && /* @__PURE__ */ (0, _.jsx)(gr, {
			editableDocuments: s?.editableDocuments || [],
			events: u,
			eventsState: f,
			retryEvents: w,
			openEvent: g
		}),
		t === "market" && /* @__PURE__ */ (0, _.jsx)(Ae, {
			section: i,
			session: s,
			notify: D
		}, i),
		t === "profile" && (s?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(Un, {}) : /* @__PURE__ */ (0, _.jsx)(vr, {
			session: s,
			navigate: E
		})),
		t === "members" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(vr, {
			session: s,
			navigate: E
		}) }),
		t === "registration" && /* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content",
			children: [/* @__PURE__ */ (0, _.jsx)("a", {
				href: "#mitglieder",
				children: o("← Mitgliederbereich")
			}), /* @__PURE__ */ (0, _.jsx)(Lt, {
				eventId: Number(i),
				memberAccess: !!s?.memberAccess
			})]
		}),
		[
			"forum",
			"gallery",
			"library",
			"clubdocs"
		].includes(t) && (s?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(kn, {
			kind: t === "clubdocs" ? "library" : t,
			nonce: s.communityNonce || "",
			selectedId: Number(i) || void 0,
			initialGroup: t === "clubdocs" ? "club" : "",
			section: i,
			title: t === "clubdocs" ? "Clubdokumente" : void 0
		}, `${t}:${i}`) : t === "gallery" ? /* @__PURE__ */ (0, _.jsx)(rn, {}) : /* @__PURE__ */ (0, _.jsx)(vr, {
			session: s,
			navigate: E
		})),
		t === "news" && /* @__PURE__ */ (0, _.jsx)(nr, {
			navigate: E,
			memberAccess: !!s?.memberAccess,
			upcomingEvents: [],
			eventPreview: {
				title: "",
				text: ""
			},
			archive: !0
		}),
		t === "applications" && (s?.applicationsNonce ? /* @__PURE__ */ (0, _.jsx)(Jn, { nonce: s.applicationsNonce }) : /* @__PURE__ */ (0, _.jsx)(vr, {
			session: s,
			navigate: E
		})),
		t === "directory" && (s?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(Jt, {}) : /* @__PURE__ */ (0, _.jsx)(vr, {
			session: s,
			navigate: E
		})),
		t === "event-admin" && (s?.canManageEvents ? /* @__PURE__ */ (0, _.jsx)(Ht, {
			session: s,
			changed: w
		}) : /* @__PURE__ */ (0, _.jsx)(vr, {
			session: s,
			navigate: E
		})),
		[
			"contact",
			"privacy",
			"statutes"
		].includes(t) && /* @__PURE__ */ (0, _.jsx)(_r, { page: t }, t),
		/* @__PURE__ */ (0, _.jsxs)("footer", { children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "footer-brand",
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					className: "footer-logo",
					src: he(x("global.logo")),
					width: 954,
					height: 954,
					alt: o("Swiss TR-Club Logo")
				}), /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: x("global.name") }), /* @__PURE__ */ (0, _.jsx)("p", { children: x("global.footer") })] })]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Entdecken") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("club"),
					children: o("Über den Club")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("agenda"),
					children: o("Veranstaltungen")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("regions"),
					children: o("Regionen")
				})
			] }),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Mitglieder") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("members"),
					children: o("Dashboard")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("market"),
					children: o("Marktplatz")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("forum"),
					children: o("Forum")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("library"),
					children: o("Bibliothek")
				})
			] }),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("strong", { children: o("Kontakt & Recht") }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("contact"),
					children: o("Kontakt & Impressum")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("privacy"),
					children: o("Datenschutz")
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					onClick: () => E("statutes"),
					children: o("Statuten")
				})
			] })
		] }),
		(m || T) && /* @__PURE__ */ (0, _.jsx)(yr, {
			event: m || T,
			memberAccess: !!s?.memberAccess,
			close: () => {
				g(null), T && (window.location.hash = "#agenda");
			}
		}),
		y && /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "toast",
			role: "status",
			children: ["✓ ", y]
		})
	] });
}
function cr({ navigate: e, events: t, eventsState: n, openEvent: r, memberAccess: i }) {
	let a = t[0];
	return /* @__PURE__ */ (0, _.jsx)(nr, {
		eventPreview: n === "loading" ? {
			title: o("Termine werden geladen …"),
			text: o("Die nächsten Treffen findest du hier.")
		} : n === "error" ? {
			title: o("Agenda derzeit nicht erreichbar"),
			text: o("Bitte versuche es in der Terminübersicht erneut.")
		} : a ? {
			title: a.title,
			text: `${dr(a.startAt)} · ${a.location || fr(a)}`
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
function lr({ eyebrow: e, title: t, text: n, landscape: r }) {
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: `page-hero${r ? " regional-hero" : ""}`,
		style: r ? {
			backgroundImage: `linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${ge(r)}")`,
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
function ur(e) {
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
function dr(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? o("Wird bekanntgegeben") : new Intl.DateTimeFormat(r(), {
		dateStyle: "long",
		timeStyle: "short"
	}).format(t);
}
function fr(e) {
	return o(e.region?.name || e.scope?.name || e.eventType?.name || "Swiss TR-Club");
}
function pr(e) {
	return o({
		information: "Keine Anmeldung erforderlich",
		scheduled: "Anmeldung öffnet später",
		open: "Anmeldung offen",
		closed: "Anmeldung geschlossen",
		full: "Ausgebucht",
		waiting: "Warteliste offen"
	}[e]);
}
function mr({ state: e, count: t, retry: n }) {
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
function hr({ event: e, open: t }) {
	let n = ur(e.startAt);
	return /* @__PURE__ */ (0, _.jsxs)("article", {
		className: "event-card",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "event-date",
				children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: n.day }), /* @__PURE__ */ (0, _.jsx)("span", { children: n.month })]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("p", { children: fr(e) }),
				/* @__PURE__ */ (0, _.jsx)("h3", { children: e.title }),
				/* @__PURE__ */ (0, _.jsxs)("span", { children: [
					e.location || e.eventType?.name,
					" · ",
					pr(e.registrationStatus)
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
function gr({ events: e, eventsState: t, retryEvents: n, openEvent: r, editableDocuments: i }) {
	let { text: a, values: s } = fe(), [c, l] = (0, h.useState)([]), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)("loading"), [m, g] = (0, h.useState)(0);
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
			n = r, fetch(`${rr}/?rest_route=/strc/v1/regions`, {
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
		/* @__PURE__ */ (0, _.jsx)(lr, {
			eyebrow: o("Lokal präsent – lokal aktiv"),
			title: v ? `${o("Region")} ${o(v.name)}` : a("regions.title"),
			text: v ? a(`region-${v.slug}.intro`, a("regions.intro")) : a("regions.intro"),
			landscape: v?.slug
		}),
		!u && /* @__PURE__ */ (0, _.jsx)(be, { documentKey: "regions" }),
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
				f === "ready" && u === "triungsters" && /* @__PURE__ */ (0, _.jsx)(gt, {
					documentKey: "triungsters",
					canEdit: i.includes("triungsters")
				}, "triungsters-region"),
				f === "ready" && u !== "triungsters" && (v ? /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(qe, {
					documentKey: "region-" + v.slug,
					values: s["region-" + v.slug] || { body: v.description },
					canEdit: i.includes("region-" + v.slug),
					events: /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(mr, {
						state: t,
						count: y.length,
						retry: n
					}), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "events",
						children: y.map((e) => /* @__PURE__ */ (0, _.jsx)(hr, {
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
							style: _e(e.slug),
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
function _r({ page: e }) {
	let { text: t, error: n, refresh: r } = fe();
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(lr, {
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
			}) : t(`${e}.body`) ? /* @__PURE__ */ (0, _.jsx)(me, { id: `${e}.body` }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Dieser Inhalt wurde noch nicht veröffentlicht.") })
		}), e === "contact" && /* @__PURE__ */ (0, _.jsx)(Hn, {})]
	})] });
}
function vr({ session: e, navigate: t }) {
	let { text: n } = fe();
	if (e === null) return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content",
		children: /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Mitgliederzugang wird geprüft …")
		})
	});
	if (!e.memberAccess) return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(lr, {
		eyebrow: o("Geschützter Bereich"),
		title: n("members.title"),
		text: n("members.intro")
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "login-panel",
		children: [/* @__PURE__ */ (0, _.jsxs)("form", {
			method: "post",
			action: `${rr}/wp-login.php`,
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
					value: `${ir}/${window.location.hash || "#mitglieder"}`
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "submit",
					children: o("Sicher anmelden →")
				}),
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: `${rr}/wp-login.php?action=lostpassword`,
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
		children: /* @__PURE__ */ (0, _.jsx)(me, { id: "members.dashboardIntro" })
	}), /* @__PURE__ */ (0, _.jsx)(nn, { extraTools: r })] });
}
function yr({ event: e, close: t, memberAccess: n }) {
	return /* @__PURE__ */ (0, _.jsx)(W, {
		title: e.title,
		close: t,
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "event-details",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "eyebrow",
					children: [
						fr(e),
						" · ",
						e.eventType?.name
					]
				}),
				e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(pe, { html: e.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", { children: e.description || e.summary }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "detail-box",
					children: [
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Beginn") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.startAt ? dr(e.startAt) : "Wird bekanntgegeben" }),
						e.endAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Ende") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: dr(e.endAt) })] }),
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Ort") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.location || o("Wird bekanntgegeben") }),
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: pr(e.registrationStatus) }),
						e.registrationOpenAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung ab") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: dr(e.registrationOpenAt) })] }),
						e.registrationCloseAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung bis") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: dr(e.registrationCloseAt) })] })
					]
				}),
				e.registrationRequired && (e.externalRegistrationUrl ? /* @__PURE__ */ (0, _.jsx)("a", {
					className: "market-primary",
					href: e.externalRegistrationUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: o("Extern anmelden (neuer Tab) →")
				}) : /* @__PURE__ */ (0, _.jsx)(Lt, {
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
var br = document.getElementById("strc-app");
br && (0, g.createRoot)(br).render(/* @__PURE__ */ (0, _.jsx)(or, {}));
//#endregion
