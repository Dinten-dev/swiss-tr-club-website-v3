import { n as e, t } from "./chunk-C_CI6nMA.js";
import { a as n, i as r, n as i, o as a, r as o, s, t as c } from "./UILanguage-D4-CX2f4.js";
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
	function ee(e) {
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
			case D: return t = e.displayName || null, t === null ? ee(e.type) || "Memo" : t;
			case O:
				t = e._payload, e = e._init;
				try {
					return ee(e(t));
				} catch {}
		}
		return null;
	}
	var P = Array.isArray, F = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, te = [], ne = -1;
	function R(e) {
		return { current: e };
	}
	function z(e) {
		0 > ne || (e.current = te[ne], te[ne] = null, ne--);
	}
	function B(e, t) {
		ne++, te[ne] = e.current, e.current = t;
	}
	var V = R(null), re = R(null), ie = R(null), ae = R(null);
	function oe(e, t) {
		switch (B(ie, t), B(re, e), B(V, null), t.nodeType) {
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
		z(V), B(V, e);
	}
	function se() {
		z(V), z(re), z(ie);
	}
	function ce(e) {
		e.memoizedState !== null && B(ae, e);
		var t = V.current, n = Hd(t, e.type);
		t !== n && (B(re, e), B(V, n));
	}
	function le(e) {
		re.current === e && (z(V), z(re)), ae.current === e && (z(ae), Qf._currentValue = L);
	}
	var ue, de;
	function fe(e) {
		if (ue === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ue = t && t[1] || "", de = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ue + e + de;
	}
	var pe = !1;
	function me(e, t) {
		if (!e || pe) return "";
		pe = !0;
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
			pe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? fe(n) : "";
	}
	function he(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return fe(e.type);
			case 16: return fe("Lazy");
			case 13: return e.child !== t && t !== null ? fe("Suspense Fallback") : fe("Suspense");
			case 19: return fe("SuspenseList");
			case 0:
			case 15: return me(e.type, !1);
			case 11: return me(e.type.render, !1);
			case 1: return me(e.type, !0);
			case 31: return fe("Activity");
			default: return "";
		}
	}
	function ge(e) {
		try {
			var t = "", n = null;
			do
				t += he(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var H = Object.prototype.hasOwnProperty, _e = t.unstable_scheduleCallback, ve = t.unstable_cancelCallback, ye = t.unstable_shouldYield, be = t.unstable_requestPaint, xe = t.unstable_now, Se = t.unstable_getCurrentPriorityLevel, Ce = t.unstable_ImmediatePriority, we = t.unstable_UserBlockingPriority, Te = t.unstable_NormalPriority, Ee = t.unstable_LowPriority, De = t.unstable_IdlePriority, Oe = t.log, ke = t.unstable_setDisableYieldValue, Ae = null, U = null;
	function je(e) {
		if (typeof Oe == "function" && ke(e), U && typeof U.setStrictMode == "function") try {
			U.setStrictMode(Ae, e);
		} catch {}
	}
	var Me = Math.clz32 ? Math.clz32 : Fe, Ne = Math.log, Pe = Math.LN2;
	function Fe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ne(e) / Pe | 0) | 0;
	}
	var Ie = 256, Le = 262144, Re = 4194304;
	function ze(e) {
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
	function Be(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = ze(n))) : i = ze(o) : i = ze(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = ze(n))) : i = ze(o)) : i = ze(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Ve(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function He(e, t) {
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
	function Ue() {
		var e = Re;
		return Re <<= 1, !(Re & 62914560) && (Re = 4194304), e;
	}
	function We(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ge(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Ke(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Me(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && qe(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function qe(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Me(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Je(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Me(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ye(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Xe(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Xe(e) {
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
	function Ze(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Qe() {
		var e = I.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function $e(e, t) {
		var n = I.p;
		try {
			return I.p = e, t();
		} finally {
			I.p = n;
		}
	}
	var et = Math.random().toString(36).slice(2), tt = "__reactFiber$" + et, nt = "__reactProps$" + et, rt = "__reactContainer$" + et, it = "__reactEvents$" + et, at = "__reactListeners$" + et, ot = "__reactHandles$" + et, st = "__reactResources$" + et, ct = "__reactMarker$" + et;
	function lt(e) {
		delete e[tt], delete e[nt], delete e[it], delete e[at], delete e[ot];
	}
	function ut(e) {
		var t = e[tt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[rt] || n[tt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[tt]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function dt(e) {
		if (e = e[tt] || e[rt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ft(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function pt(e) {
		var t = e[st];
		return t ||= e[st] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function mt(e) {
		e[ct] = !0;
	}
	var ht = /* @__PURE__ */ new Set(), gt = {};
	function _t(e, t) {
		vt(e, t), vt(e + "Capture", t);
	}
	function vt(e, t) {
		for (gt[e] = t, e = 0; e < t.length; e++) ht.add(t[e]);
	}
	var yt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), bt = {}, xt = {};
	function St(e) {
		return H.call(xt, e) ? !0 : H.call(bt, e) ? !1 : yt.test(e) ? xt[e] = !0 : (bt[e] = !0, !1);
	}
	function Ct(e, t, n) {
		if (St(t)) if (n === null) e.removeAttribute(t);
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
	function wt(e, t, n) {
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
	function Tt(e, t, n, r) {
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
	function Et(e) {
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
	function Dt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Ot(e, t, n) {
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
	function kt(e) {
		if (!e._valueTracker) {
			var t = Dt(e) ? "checked" : "value";
			e._valueTracker = Ot(e, t, "" + e[t]);
		}
	}
	function At(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Dt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function jt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Mt = /[\n"\\]/g;
	function Nt(e) {
		return e.replace(Mt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Pt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Et(t)) : e.value !== "" + Et(t) && (e.value = "" + Et(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : It(e, o, Et(n)) : It(e, o, Et(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Et(s) : e.removeAttribute("name");
	}
	function Ft(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				kt(e);
				return;
			}
			n = n == null ? "" : "" + Et(n), t = t == null ? n : "" + Et(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), kt(e);
	}
	function It(e, t, n) {
		t === "number" && jt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Lt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Et(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Rt(e, t, n) {
		if (t != null && (t = "" + Et(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Et(n);
	}
	function zt(e, t, n, r) {
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
		n = Et(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), kt(e);
	}
	function Bt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Vt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Ht(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Vt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Ut(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Ht(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Ht(e, o, t[o]);
	}
	function Wt(e) {
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
	var Gt = new Map([
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
	]), Kt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function qt(e) {
		return Kt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Jt() {}
	var Yt = null;
	function Xt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Zt = null, Qt = null;
	function $t(e) {
		var t = dt(e);
		if (t && (e = t.stateNode)) {
			var n = e[nt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Pt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Nt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[nt] || null;
								if (!a) throw Error(i(90));
								Pt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && At(r);
					}
					break a;
				case "textarea":
					Rt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Lt(e, !!n.multiple, t, !1);
			}
		}
	}
	var en = !1;
	function tn(e, t, n) {
		if (en) return e(t, n);
		en = !0;
		try {
			return e(t);
		} finally {
			if (en = !1, (Zt !== null || Qt !== null) && (bu(), Zt && (t = Zt, e = Qt, Qt = Zt = null, $t(t), e))) for (t = 0; t < e.length; t++) $t(e[t]);
		}
	}
	function nn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[nt] || null;
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
	var rn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), an = !1;
	if (rn) try {
		var on = {};
		Object.defineProperty(on, "passive", { get: function() {
			an = !0;
		} }), window.addEventListener("test", on, on), window.removeEventListener("test", on, on);
	} catch {
		an = !1;
	}
	var sn = null, cn = null, ln = null;
	function un() {
		if (ln) return ln;
		var e, t = cn, n = t.length, r, i = "value" in sn ? sn.value : sn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return ln = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function dn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function fn() {
		return !0;
	}
	function pn() {
		return !1;
	}
	function mn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? fn : pn, this.isPropagationStopped = pn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = fn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = fn);
			},
			persist: function() {},
			isPersistent: fn
		}), t;
	}
	var hn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, gn = mn(hn), _n = h({}, hn, {
		view: 0,
		detail: 0
	}), vn = mn(_n), yn, bn, xn, Sn = h({}, _n, {
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
		getModifierState: Nn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== xn && (xn && e.type === "mousemove" ? (yn = e.screenX - xn.screenX, bn = e.screenY - xn.screenY) : bn = yn = 0, xn = e), yn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : bn;
		}
	}), Cn = mn(Sn), wn = mn(h({}, Sn, { dataTransfer: 0 })), Tn = mn(h({}, _n, { relatedTarget: 0 })), En = mn(h({}, hn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Dn = mn(h({}, hn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), On = mn(h({}, hn, { data: 0 })), kn = {
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
	}, An = {
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
	}, jn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Mn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = jn[e]) ? !!t[e] : !1;
	}
	function Nn() {
		return Mn;
	}
	var Pn = mn(h({}, _n, {
		key: function(e) {
			if (e.key) {
				var t = kn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = dn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? An[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Nn,
		charCode: function(e) {
			return e.type === "keypress" ? dn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? dn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Fn = mn(h({}, Sn, {
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
	})), In = mn(h({}, _n, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Nn
	})), Ln = mn(h({}, hn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Rn = mn(h({}, Sn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), zn = mn(h({}, hn, {
		newState: 0,
		oldState: 0
	})), Bn = [
		9,
		13,
		27,
		32
	], Vn = rn && "CompositionEvent" in window, Hn = null;
	rn && "documentMode" in document && (Hn = document.documentMode);
	var Un = rn && "TextEvent" in window && !Hn, Wn = rn && (!Vn || Hn && 8 < Hn && 11 >= Hn), Gn = " ", Kn = !1;
	function qn(e, t) {
		switch (e) {
			case "keyup": return Bn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Jn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Yn = !1;
	function Xn(e, t) {
		switch (e) {
			case "compositionend": return Jn(t);
			case "keypress": return t.which === 32 ? (Kn = !0, Gn) : null;
			case "textInput": return e = t.data, e === Gn && Kn ? null : e;
			default: return null;
		}
	}
	function Zn(e, t) {
		if (Yn) return e === "compositionend" || !Vn && qn(e, t) ? (e = un(), ln = cn = sn = null, Yn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Wn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Qn = {
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
	function $n(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Qn[e.type] : t === "textarea";
	}
	function er(e, t, n, r) {
		Zt ? Qt ? Qt.push(r) : Qt = [r] : Zt = r, t = Ed(t, "onChange"), 0 < t.length && (n = new gn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var tr = null, nr = null;
	function rr(e) {
		yd(e, 0);
	}
	function ir(e) {
		if (At(ft(e))) return e;
	}
	function ar(e, t) {
		if (e === "change") return t;
	}
	var or = !1;
	if (rn) {
		var sr;
		if (rn) {
			var cr = "oninput" in document;
			if (!cr) {
				var lr = document.createElement("div");
				lr.setAttribute("oninput", "return;"), cr = typeof lr.oninput == "function";
			}
			sr = cr;
		} else sr = !1;
		or = sr && (!document.documentMode || 9 < document.documentMode);
	}
	function ur() {
		tr && (tr.detachEvent("onpropertychange", dr), nr = tr = null);
	}
	function dr(e) {
		if (e.propertyName === "value" && ir(nr)) {
			var t = [];
			er(t, nr, e, Xt(e)), tn(rr, t);
		}
	}
	function fr(e, t, n) {
		e === "focusin" ? (ur(), tr = t, nr = n, tr.attachEvent("onpropertychange", dr)) : e === "focusout" && ur();
	}
	function pr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return ir(nr);
	}
	function mr(e, t) {
		if (e === "click") return ir(t);
	}
	function hr(e, t) {
		if (e === "input" || e === "change") return ir(t);
	}
	function gr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var _r = typeof Object.is == "function" ? Object.is : gr;
	function vr(e, t) {
		if (_r(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!H.call(t, i) || !_r(e[i], t[i])) return !1;
		}
		return !0;
	}
	function yr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function br(e, t) {
		var n = yr(e);
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
			n = yr(n);
		}
	}
	function xr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Sr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = jt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = jt(e.document);
		}
		return t;
	}
	function Cr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var wr = rn && "documentMode" in document && 11 >= document.documentMode, Tr = null, Er = null, Dr = null, Or = !1;
	function kr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Or || Tr == null || Tr !== jt(r) || (r = Tr, "selectionStart" in r && Cr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Dr && vr(Dr, r) || (Dr = r, r = Ed(Er, "onSelect"), 0 < r.length && (t = new gn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Tr)));
	}
	function Ar(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var jr = {
		animationend: Ar("Animation", "AnimationEnd"),
		animationiteration: Ar("Animation", "AnimationIteration"),
		animationstart: Ar("Animation", "AnimationStart"),
		transitionrun: Ar("Transition", "TransitionRun"),
		transitionstart: Ar("Transition", "TransitionStart"),
		transitioncancel: Ar("Transition", "TransitionCancel"),
		transitionend: Ar("Transition", "TransitionEnd")
	}, Mr = {}, Nr = {};
	rn && (Nr = document.createElement("div").style, "AnimationEvent" in window || (delete jr.animationend.animation, delete jr.animationiteration.animation, delete jr.animationstart.animation), "TransitionEvent" in window || delete jr.transitionend.transition);
	function Pr(e) {
		if (Mr[e]) return Mr[e];
		if (!jr[e]) return e;
		var t = jr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Nr) return Mr[e] = t[n];
		return e;
	}
	var Fr = Pr("animationend"), Ir = Pr("animationiteration"), Lr = Pr("animationstart"), Rr = Pr("transitionrun"), zr = Pr("transitionstart"), Br = Pr("transitioncancel"), Vr = Pr("transitionend"), Hr = /* @__PURE__ */ new Map(), Ur = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Ur.push("scrollEnd");
	function Wr(e, t) {
		Hr.set(e, t), _t(t, [e]);
	}
	var Gr = typeof reportError == "function" ? reportError : function(e) {
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
	}, Kr = [], qr = 0, Jr = 0;
	function Yr() {
		for (var e = qr, t = Jr = qr = 0; t < e;) {
			var n = Kr[t];
			Kr[t++] = null;
			var r = Kr[t];
			Kr[t++] = null;
			var i = Kr[t];
			Kr[t++] = null;
			var a = Kr[t];
			if (Kr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && $r(n, i, a);
		}
	}
	function Xr(e, t, n, r) {
		Kr[qr++] = e, Kr[qr++] = t, Kr[qr++] = n, Kr[qr++] = r, Jr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Zr(e, t, n, r) {
		return Xr(e, t, n, r), ei(e);
	}
	function Qr(e, t) {
		return Xr(e, null, null, t), ei(e);
	}
	function $r(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Me(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ei(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ti = {};
	function ni(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ri(e, t, n, r) {
		return new ni(e, t, n, r);
	}
	function ii(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ai(e, t) {
		var n = e.alternate;
		return n === null ? (n = ri(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function oi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function si(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ii(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, V.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case k: return e = ri(31, n, t, a), e.elementType = k, e.lanes = o, e;
			case y: return ci(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = ri(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = ri(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = ri(19, n, t, a), e.elementType = E, e.lanes = o, e;
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
		return t = ri(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ci(e, t, n, r) {
		return e = ri(7, e, r, t), e.lanes = n, e;
	}
	function li(e, t, n) {
		return e = ri(6, e, null, t), e.lanes = n, e;
	}
	function ui(e) {
		var t = ri(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function di(e, t, n) {
		return t = ri(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var fi = /* @__PURE__ */ new WeakMap();
	function pi(e, t) {
		if (typeof e == "object" && e) {
			var n = fi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: ge(t)
			}, fi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: ge(t)
		};
	}
	var mi = [], hi = 0, gi = null, _i = 0, vi = [], yi = 0, bi = null, xi = 1, Si = "";
	function Ci(e, t) {
		mi[hi++] = _i, mi[hi++] = gi, gi = e, _i = t;
	}
	function wi(e, t, n) {
		vi[yi++] = xi, vi[yi++] = Si, vi[yi++] = bi, bi = e;
		var r = xi;
		e = Si;
		var i = 32 - Me(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Me(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, xi = 1 << 32 - Me(t) + i | n << i | r, Si = a + e;
		} else xi = 1 << a | n << i | r, Si = e;
	}
	function Ti(e) {
		e.return !== null && (Ci(e, 1), wi(e, 1, 0));
	}
	function Ei(e) {
		for (; e === gi;) gi = mi[--hi], mi[hi] = null, _i = mi[--hi], mi[hi] = null;
		for (; e === bi;) bi = vi[--yi], vi[yi] = null, Si = vi[--yi], vi[yi] = null, xi = vi[--yi], vi[yi] = null;
	}
	function Di(e, t) {
		vi[yi++] = xi, vi[yi++] = Si, vi[yi++] = bi, xi = t.id, Si = t.overflow, bi = e;
	}
	var Oi = null, ki = null, W = !1, Ai = null, ji = !1, Mi = Error(i(519));
	function Ni(e) {
		throw zi(pi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Mi;
	}
	function Pi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[tt] = e, t[nt] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Ft(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), zt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = Jt), t = !0) : t = !1, t || Ni(e, !0);
	}
	function Fi(e) {
		for (Oi = e.return; Oi;) switch (Oi.tag) {
			case 5:
			case 31:
			case 13:
				ji = !1;
				return;
			case 27:
			case 3:
				ji = !0;
				return;
			default: Oi = Oi.return;
		}
	}
	function Ii(e) {
		if (e !== Oi) return !1;
		if (!W) return Fi(e), W = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && ki && Ni(e), Fi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ki = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			ki = uf(e);
		} else t === 27 ? (t = ki, Zd(e.type) ? (e = lf, lf = null, ki = e) : ki = t) : ki = Oi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Li() {
		ki = Oi = null, W = !1;
	}
	function Ri() {
		var e = Ai;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Ai = null), e;
	}
	function zi(e) {
		Ai === null ? Ai = [e] : Ai.push(e);
	}
	var Bi = R(null), Vi = null, Hi = null;
	function Ui(e, t, n) {
		B(Bi, t._currentValue), t._currentValue = n;
	}
	function Wi(e) {
		e._currentValue = Bi.current, z(Bi);
	}
	function Gi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ki(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Gi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Gi(s, n, e), s = null;
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
	function qi(e, t, n, r) {
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
					_r(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ae.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Ki(t, e, n, r), t.flags |= 262144;
	}
	function Ji(e) {
		for (e = e.firstContext; e !== null;) {
			if (!_r(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Yi(e) {
		Vi = e, Hi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Xi(e) {
		return Qi(Vi, e);
	}
	function Zi(e, t) {
		return Vi === null && Yi(e), Qi(e, t);
	}
	function Qi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Hi === null) {
			if (e === null) throw Error(i(308));
			Hi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Hi = Hi.next = t;
		return n;
	}
	var $i = typeof AbortController < "u" ? AbortController : function() {
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
	}, ea = t.unstable_scheduleCallback, ta = t.unstable_NormalPriority, na = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ra() {
		return {
			controller: new $i(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ia(e) {
		e.refCount--, e.refCount === 0 && ea(ta, function() {
			e.controller.abort();
		});
	}
	var aa = null, oa = 0, sa = 0, ca = null;
	function la(e, t) {
		if (aa === null) {
			var n = aa = [];
			oa = 0, sa = dd(), ca = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return oa++, t.then(ua, ua), t;
	}
	function ua() {
		if (--oa === 0 && aa !== null) {
			ca !== null && (ca.status = "fulfilled");
			var e = aa;
			aa = null, sa = 0, ca = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function da(e, t) {
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
	var fa = F.S;
	F.S = function(e, t) {
		eu = xe(), typeof t == "object" && t && typeof t.then == "function" && la(e, t), fa !== null && fa(e, t);
	};
	var pa = R(null);
	function ma() {
		var e = pa.current;
		return e === null ? Rl.pooledCache : e;
	}
	function ha(e, t) {
		t === null ? B(pa, pa.current) : B(pa, t.pool);
	}
	function ga() {
		var e = ma();
		return e === null ? null : {
			parent: na._currentValue,
			pool: e
		};
	}
	var _a = Error(i(460)), va = Error(i(474)), ya = Error(i(542)), ba = { then: function() {} };
	function xa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Sa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Jt, Jt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ea(e), e;
			default:
				if (typeof t.status == "string") t.then(Jt, Jt);
				else {
					if (e = Rl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, Ea(e), e;
				}
				throw wa = t, _a;
		}
	}
	function Ca(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (wa = e, _a) : e;
		}
	}
	var wa = null;
	function Ta() {
		if (wa === null) throw Error(i(459));
		var e = wa;
		return wa = null, e;
	}
	function Ea(e) {
		if (e === _a || e === ya) throw Error(i(483));
	}
	var Da = null, Oa = 0;
	function ka(e) {
		var t = Oa;
		return Oa += 1, Da === null && (Da = []), Sa(Da, e, t);
	}
	function Aa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function ja(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ma(e) {
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
			return e = ai(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = li(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === O && Ca(i) === t.type) ? (t = a(t, n.props), Aa(t, n), t.return = e, t) : (t = si(n.type, n.key, n.props, null, e.mode, r), Aa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = di(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ci(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = li("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = si(t.type, t.key, t.props, null, e.mode, n), Aa(n, t), n.return = e, n;
					case v: return t = di(t, e.mode, n), t.return = e, t;
					case O: return t = Ca(t), f(e, t, n);
				}
				if (P(t) || M(t)) return t = ci(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, ka(t), n);
				if (t.$$typeof === C) return f(e, Zi(e, t), n);
				ja(e, t);
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
					case O: return n = Ca(n), p(e, t, n, r);
				}
				if (P(n) || M(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, ka(n), r);
				if (n.$$typeof === C) return p(e, t, Zi(e, n), r);
				ja(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case O: return r = Ca(r), m(e, t, n, r, i);
				}
				if (P(r) || M(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, ka(r), i);
				if (r.$$typeof === C) return m(e, t, n, Zi(t, r), i);
				ja(t, r);
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
			if (h === s.length) return n(i, d), W && Ci(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return W && Ci(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), W && Ci(i, h), l;
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
			if (v.done) return n(a, h), W && Ci(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return W && Ci(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), W && Ci(a, g), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === O && Ca(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Aa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = ci(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = si(o.type, o.key, o.props, null, e.mode, c), Aa(c, o), c.return = e, e = c);
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
							c = di(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case O: return o = Ca(o), b(e, r, o, c);
				}
				if (P(o)) return h(e, r, o, c);
				if (M(o)) {
					if (l = M(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, ka(o), c);
				if (o.$$typeof === C) return b(e, r, Zi(e, o), c);
				ja(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = li(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Oa = 0;
				var i = b(e, t, n, r);
				return Da = null, i;
			} catch (t) {
				if (t === _a || t === ya) throw t;
				var a = ri(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Na = Ma(!0), Pa = Ma(!1), Fa = !1;
	function Ia(e) {
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
	function La(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ra(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function za(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, q & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ei(e), $r(e, null, n), t;
		}
		return Xr(e, r, t, n), ei(e);
	}
	function Ba(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Je(e, n);
		}
	}
	function Va(e, t) {
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
	var Ha = !1;
	function Ua() {
		if (Ha) {
			var e = ca;
			if (e !== null) throw e;
		}
	}
	function Wa(e, t, n, r) {
		Ha = !1;
		var i = e.updateQueue;
		Fa = !1;
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
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === sa && (Ha = !0), u !== null && (u = u.next = {
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
							case 2: Fa = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ga(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ka(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ga(n[e], t);
	}
	var qa = R(null), Ja = R(0);
	function Ya(e, t) {
		e = Ul, B(Ja, e), B(qa, t), Ul = e | t.baseLanes;
	}
	function Xa() {
		B(Ja, Ul), B(qa, qa.current);
	}
	function Za() {
		Ul = Ja.current, z(qa), z(Ja);
	}
	var Qa = R(null), $a = null;
	function eo(e) {
		var t = e.alternate;
		B(ao, ao.current & 1), B(Qa, e), $a === null && (t === null || qa.current !== null || t.memoizedState !== null) && ($a = e);
	}
	function to(e) {
		B(ao, ao.current), B(Qa, e), $a === null && ($a = e);
	}
	function no(e) {
		e.tag === 22 ? (B(ao, ao.current), B(Qa, e), $a === null && ($a = e)) : ro(e);
	}
	function ro() {
		B(ao, ao.current), B(Qa, Qa.current);
	}
	function io(e) {
		z(Qa), $a === e && ($a = null), z(ao);
	}
	var ao = R(0);
	function oo(e) {
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
	var so = 0, G = null, K = null, co = null, lo = !1, uo = !1, fo = !1, po = 0, mo = 0, ho = null, go = 0;
	function _o() {
		throw Error(i(321));
	}
	function vo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!_r(e[n], t[n])) return !1;
		return !0;
	}
	function yo(e, t, n, r, i, a) {
		return so = a, G = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, F.H = e === null || e.memoizedState === null ? Is : Ls, fo = !1, a = n(r, i), fo = !1, uo && (a = xo(t, n, r, i)), bo(e), a;
	}
	function bo(e) {
		F.H = Fs;
		var t = K !== null && K.next !== null;
		if (so = 0, co = K = G = null, lo = !1, mo = 0, ho = null, t) throw Error(i(300));
		e === null || ec || (e = e.dependencies, e !== null && Ji(e) && (ec = !0));
	}
	function xo(e, t, n, r) {
		G = e;
		var a = 0;
		do {
			if (uo && (ho = null), mo = 0, uo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, co = K = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			F.H = Rs, o = t(n, r);
		} while (uo);
		return o;
	}
	function So() {
		var e = F.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ko(t) : t, e = e.useState()[0], (K === null ? null : K.memoizedState) !== e && (G.flags |= 1024), t;
	}
	function Co() {
		var e = po !== 0;
		return po = 0, e;
	}
	function wo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function To(e) {
		if (lo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			lo = !1;
		}
		so = 0, co = K = G = null, uo = !1, mo = po = 0, ho = null;
	}
	function Eo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return co === null ? G.memoizedState = co = e : co = co.next = e, co;
	}
	function Do() {
		if (K === null) {
			var e = G.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = K.next;
		var t = co === null ? G.memoizedState : co.next;
		if (t !== null) co = t, K = e;
		else {
			if (e === null) throw G.alternate === null ? Error(i(467)) : Error(i(310));
			K = e, e = {
				memoizedState: K.memoizedState,
				baseState: K.baseState,
				baseQueue: K.baseQueue,
				queue: K.queue,
				next: null
			}, co === null ? G.memoizedState = co = e : co = co.next = e;
		}
		return co;
	}
	function Oo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ko(e) {
		var t = mo;
		return mo += 1, ho === null && (ho = []), e = Sa(ho, e, t), t = G, (co === null ? t.memoizedState : co.next) === null && (t = t.alternate, F.H = t === null || t.memoizedState === null ? Is : Ls), e;
	}
	function Ao(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ko(e);
			if (e.$$typeof === C) return Xi(e);
		}
		throw Error(i(438, String(e)));
	}
	function jo(e) {
		var t = null, n = G.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = G.alternate;
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
		}, n === null && (n = Oo(), G.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function Mo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function No(e) {
		return Po(Do(), K, e);
	}
	function Po(e, t, n) {
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
				if (f === u.lane ? (so & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === sa && (d = !0);
					else if ((so & p) === p) {
						u = u.next, p === sa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, G.lanes |= p, Gl |= p;
					f = u.action, fo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, G.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !_r(o, e.memoizedState) && (ec = !0, d && (n = ca, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Fo(e) {
		var t = Do(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			_r(o, t.memoizedState) || (ec = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Io(e, t, n) {
		var r = G, a = Do(), o = W;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !_r((K || a).memoizedState, n);
		if (s && (a.memoizedState = n, ec = !0), a = a.queue, ss(zo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || co !== null && co.memoizedState.tag & 1) {
			if (r.flags |= 2048, ns(9, { destroy: void 0 }, Ro.bind(null, r, a, n, t), null), Rl === null) throw Error(i(349));
			o || so & 127 || Lo(r, t, n);
		}
		return n;
	}
	function Lo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = G.updateQueue, t === null ? (t = Oo(), G.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ro(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Bo(t) && Vo(e);
	}
	function zo(e, t, n) {
		return n(function() {
			Bo(t) && Vo(e);
		});
	}
	function Bo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !_r(e, n);
		} catch {
			return !0;
		}
	}
	function Vo(e) {
		var t = Qr(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Ho(e) {
		var t = Eo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), fo) {
				je(!0);
				try {
					n();
				} finally {
					je(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Mo,
			lastRenderedState: e
		}, t;
	}
	function Uo(e, t, n, r) {
		return e.baseState = n, Po(e, K, typeof r == "function" ? r : Mo);
	}
	function Wo(e, t, n, r, a) {
		if (Ms(e)) throw Error(i(485));
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
			F.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Go(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Go(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = F.T, o = {};
			F.T = o;
			try {
				var s = n(i, r), c = F.S;
				c !== null && c(o, s), Ko(e, t, s);
			} catch (n) {
				Jo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), F.T = a;
			}
		} else try {
			a = n(i, r), Ko(e, t, a);
		} catch (n) {
			Jo(e, t, n);
		}
	}
	function Ko(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			qo(e, t, n);
		}, function(n) {
			return Jo(e, t, n);
		}) : qo(e, t, n);
	}
	function qo(e, t, n) {
		t.status = "fulfilled", t.value = n, Yo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Go(e, n)));
	}
	function Jo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Yo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Yo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Xo(e, t) {
		return t;
	}
	function Zo(e, t) {
		if (W) {
			var n = Rl.formState;
			if (n !== null) {
				a: {
					var r = G;
					if (W) {
						if (ki) {
							b: {
								for (var i = ki, a = ji; i.nodeType !== 8;) {
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
								ki = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ni(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Eo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Xo,
			lastRenderedState: t
		}, n.queue = r, n = ks.bind(null, G, r), r.dispatch = n, r = Ho(!1), a = js.bind(null, G, !1, r.queue), r = Eo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Wo.bind(null, G, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Qo(e) {
		return $o(Do(), K, e);
	}
	function $o(e, t, n) {
		if (t = Po(e, t, Xo)[0], e = No(Mo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ko(t);
		} catch (e) {
			throw e === _a ? ya : e;
		}
		else r = t;
		t = Do();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (G.flags |= 2048, ns(9, { destroy: void 0 }, es.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function es(e, t) {
		e.action = t;
	}
	function ts(e) {
		var t = Do(), n = K;
		if (n !== null) return $o(t, n, e);
		Do(), t = t.memoizedState, n = Do();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ns(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = G.updateQueue, t === null && (t = Oo(), G.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function rs() {
		return Do().memoizedState;
	}
	function is(e, t, n, r) {
		var i = Eo();
		G.flags |= e, i.memoizedState = ns(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function as(e, t, n, r) {
		var i = Do();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		K !== null && r !== null && vo(r, K.memoizedState.deps) ? i.memoizedState = ns(t, a, n, r) : (G.flags |= e, i.memoizedState = ns(1 | t, a, n, r));
	}
	function os(e, t) {
		is(8390656, 8, e, t);
	}
	function ss(e, t) {
		as(2048, 8, e, t);
	}
	function cs(e) {
		G.flags |= 4;
		var t = G.updateQueue;
		if (t === null) t = Oo(), G.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ls(e) {
		var t = Do().memoizedState;
		return cs({
			ref: t,
			nextImpl: e
		}), function() {
			if (q & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function us(e, t) {
		return as(4, 2, e, t);
	}
	function ds(e, t) {
		return as(4, 4, e, t);
	}
	function fs(e, t) {
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
	function ps(e, t, n) {
		n = n == null ? null : n.concat([e]), as(4, 4, fs.bind(null, t, e), n);
	}
	function ms() {}
	function hs(e, t) {
		var n = Do();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && vo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function gs(e, t) {
		var n = Do();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && vo(t, r[1])) return r[0];
		if (r = e(), fo) {
			je(!0);
			try {
				e();
			} finally {
				je(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function _s(e, t, n) {
		return n === void 0 || so & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), G.lanes |= e, Gl |= e, n);
	}
	function vs(e, t, n, r) {
		return _r(n, t) ? n : qa.current === null ? !(so & 42) || so & 1073741824 && !(Y & 261930) ? (ec = !0, e.memoizedState = n) : (e = mu(), G.lanes |= e, Gl |= e, t) : (e = _s(e, n, r), _r(e, t) || (ec = !0), e);
	}
	function ys(e, t, n, r, i) {
		var a = I.p;
		I.p = a !== 0 && 8 > a ? a : 8;
		var o = F.T, s = {};
		F.T = s, js(e, !1, t, n);
		try {
			var c = i(), l = F.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? As(e, t, da(c, r), pu(e)) : As(e, t, r, pu(e));
		} catch (n) {
			As(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			I.p = a, o !== null && s.types !== null && (o.types = s.types), F.T = o;
		}
	}
	function bs() {}
	function xs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ss(e).queue;
		ys(e, a, t, L, n === null ? bs : function() {
			return Cs(e), n(r);
		});
	}
	function Ss(e) {
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
				lastRenderedReducer: Mo,
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
				lastRenderedReducer: Mo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Cs(e) {
		var t = Ss(e);
		t.next === null && (t = e.alternate.memoizedState), As(e, t.next.queue, {}, pu());
	}
	function ws() {
		return Xi(Qf);
	}
	function Ts() {
		return Do().memoizedState;
	}
	function Es() {
		return Do().memoizedState;
	}
	function Ds(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Ra(n);
					var r = za(t, e, n);
					r !== null && (hu(r, t, n), Ba(r, t, n)), t = { cache: ra() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Os(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ms(e) ? Ns(t, n) : (n = Zr(e, t, n, r), n !== null && (hu(n, e, r), Ps(n, t, r)));
	}
	function ks(e, t, n) {
		As(e, t, n, pu());
	}
	function As(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ms(e)) Ns(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, _r(s, o)) return Xr(e, t, i, 0), Rl === null && Yr(), !1;
			} catch {}
			if (n = Zr(e, t, i, r), n !== null) return hu(n, e, r), Ps(n, t, r), !0;
		}
		return !1;
	}
	function js(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ms(e)) {
			if (t) throw Error(i(479));
		} else t = Zr(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Ms(e) {
		var t = e.alternate;
		return e === G || t !== null && t === G;
	}
	function Ns(e, t) {
		uo = lo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ps(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Je(e, n);
		}
	}
	var Fs = {
		readContext: Xi,
		use: Ao,
		useCallback: _o,
		useContext: _o,
		useEffect: _o,
		useImperativeHandle: _o,
		useLayoutEffect: _o,
		useInsertionEffect: _o,
		useMemo: _o,
		useReducer: _o,
		useRef: _o,
		useState: _o,
		useDebugValue: _o,
		useDeferredValue: _o,
		useTransition: _o,
		useSyncExternalStore: _o,
		useId: _o,
		useHostTransitionStatus: _o,
		useFormState: _o,
		useActionState: _o,
		useOptimistic: _o,
		useMemoCache: _o,
		useCacheRefresh: _o
	};
	Fs.useEffectEvent = _o;
	var Is = {
		readContext: Xi,
		use: Ao,
		useCallback: function(e, t) {
			return Eo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Xi,
		useEffect: os,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), is(4194308, 4, fs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return is(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			is(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Eo();
			t = t === void 0 ? null : t;
			var r = e();
			if (fo) {
				je(!0);
				try {
					e();
				} finally {
					je(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Eo();
			if (n !== void 0) {
				var i = n(t);
				if (fo) {
					je(!0);
					try {
						n(t);
					} finally {
						je(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Os.bind(null, G, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Eo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ho(e);
			var t = e.queue, n = ks.bind(null, G, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ms,
		useDeferredValue: function(e, t) {
			return _s(Eo(), e, t);
		},
		useTransition: function() {
			var e = Ho(!1);
			return e = ys.bind(null, G, e.queue, !0, !1), Eo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = G, a = Eo();
			if (W) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Rl === null) throw Error(i(349));
				Y & 127 || Lo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, os(zo.bind(null, r, o, e), [e]), r.flags |= 2048, ns(9, { destroy: void 0 }, Ro.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Eo(), t = Rl.identifierPrefix;
			if (W) {
				var n = Si, r = xi;
				n = (r & ~(1 << 32 - Me(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = po++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = go++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: ws,
		useFormState: Zo,
		useActionState: Zo,
		useOptimistic: function(e) {
			var t = Eo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = js.bind(null, G, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: jo,
		useCacheRefresh: function() {
			return Eo().memoizedState = Ds.bind(null, G);
		},
		useEffectEvent: function(e) {
			var t = Eo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (q & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ls = {
		readContext: Xi,
		use: Ao,
		useCallback: hs,
		useContext: Xi,
		useEffect: ss,
		useImperativeHandle: ps,
		useInsertionEffect: us,
		useLayoutEffect: ds,
		useMemo: gs,
		useReducer: No,
		useRef: rs,
		useState: function() {
			return No(Mo);
		},
		useDebugValue: ms,
		useDeferredValue: function(e, t) {
			return vs(Do(), K.memoizedState, e, t);
		},
		useTransition: function() {
			var e = No(Mo)[0], t = Do().memoizedState;
			return [typeof e == "boolean" ? e : ko(e), t];
		},
		useSyncExternalStore: Io,
		useId: Ts,
		useHostTransitionStatus: ws,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e, t) {
			return Uo(Do(), K, e, t);
		},
		useMemoCache: jo,
		useCacheRefresh: Es
	};
	Ls.useEffectEvent = ls;
	var Rs = {
		readContext: Xi,
		use: Ao,
		useCallback: hs,
		useContext: Xi,
		useEffect: ss,
		useImperativeHandle: ps,
		useInsertionEffect: us,
		useLayoutEffect: ds,
		useMemo: gs,
		useReducer: Fo,
		useRef: rs,
		useState: function() {
			return Fo(Mo);
		},
		useDebugValue: ms,
		useDeferredValue: function(e, t) {
			var n = Do();
			return K === null ? _s(n, e, t) : vs(n, K.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Fo(Mo)[0], t = Do().memoizedState;
			return [typeof e == "boolean" ? e : ko(e), t];
		},
		useSyncExternalStore: Io,
		useId: Ts,
		useHostTransitionStatus: ws,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e, t) {
			var n = Do();
			return K === null ? (n.baseState = e, [e, n.queue.dispatch]) : Uo(n, K, e, t);
		},
		useMemoCache: jo,
		useCacheRefresh: Es
	};
	Rs.useEffectEvent = ls;
	function zs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Bs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ra(r);
			i.payload = t, n != null && (i.callback = n), t = za(e, i, r), t !== null && (hu(t, e, r), Ba(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ra(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = za(e, i, r), t !== null && (hu(t, e, r), Ba(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Ra(n);
			r.tag = 2, t != null && (r.callback = t), t = za(e, r, n), t !== null && (hu(t, e, n), Ba(t, e, n));
		}
	};
	function Vs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !vr(n, r) || !vr(i, a) : !0;
	}
	function Hs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Bs.enqueueReplaceState(t, t.state, null);
	}
	function Us(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Ws(e) {
		Gr(e);
	}
	function Gs(e) {
		console.error(e);
	}
	function Ks(e) {
		Gr(e);
	}
	function qs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Js(e, t, n) {
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
	function Ys(e, t, n) {
		return n = Ra(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			qs(e, t);
		}, n;
	}
	function Xs(e) {
		return e = Ra(e), e.tag = 3, e;
	}
	function Zs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Js(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Js(t, n, r), typeof i != "function" && (ru === null ? ru = new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Qs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && qi(t, n, a, !0), n = Qa.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return $a === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ba ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ba ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (W) return t = Qa.current, t === null ? (r !== Mi && (t = Error(i(423), { cause: r }), zi(pi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = pi(r, n), a = Ys(e.stateNode, r, a), Va(e, a), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Mi && (e = Error(i(422), { cause: r }), zi(pi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = pi(o, n), Xl === null ? Xl = [o] : Xl.push(o), Wl !== 4 && (Wl = 2), t === null) return !0;
		r = pi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ys(n.stateNode, r, e), Va(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Xs(a), Zs(a, e, n, r), Va(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var $s = Error(i(461)), ec = !1;
	function tc(e, t, n, r) {
		t.child = e === null ? Pa(t, null, n, r) : Na(t, e.child, n, r);
	}
	function nc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Yi(t), r = yo(e, t, n, o, a, i), s = Co(), e !== null && !ec ? (wo(e, t, i), Ec(e, t, i)) : (W && s && Ti(t), t.flags |= 1, tc(e, t, r, i), t.child);
	}
	function rc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ii(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ic(e, t, a, r, i)) : (e = si(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Dc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? vr : n, n(o, r) && e.ref === t.ref) return Ec(e, t, i);
		}
		return t.flags |= 1, e = ai(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ic(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (vr(a, r) && e.ref === t.ref) if (ec = !1, t.pendingProps = r = a, Dc(e, i)) e.flags & 131072 && (ec = !0);
			else return t.lanes = e.lanes, Ec(e, t, i);
		}
		return fc(e, t, n, r, i);
	}
	function ac(e, t, n, r) {
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
				return sc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ha(t, a === null ? null : a.cachePool), a === null ? Xa() : Ya(t, a), no(t);
			else return r = t.lanes = 536870912, sc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ha(t, null), Xa(), ro(t)) : (ha(t, a.cachePool), Ya(t, a), ro(t), t.memoizedState = null);
		return tc(e, t, i, n), t.child;
	}
	function oc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function sc(e, t, n, r, i) {
		var a = ma();
		return a = a === null ? null : {
			parent: na._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ha(t, null), Xa(), no(t), e !== null && qi(e, t, r, !0), t.childLanes = i, null;
	}
	function cc(e, t) {
		return t = xc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function lc(e, t, n) {
		return Na(t, e.child, null, n), e = cc(t, t.pendingProps), e.flags |= 2, io(t), t.memoizedState = null, e;
	}
	function uc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (W) {
				if (r.mode === "hidden") return e = cc(t, r), t.lanes = 536870912, oc(null, e);
				if (to(t), (e = ki) ? (e = rf(e, ji), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: bi === null ? null : {
						id: xi,
						overflow: Si
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ui(e), n.return = t, t.child = n, Oi = t, ki = null)) : e = null, e === null) throw Ni(t);
				return t.lanes = 536870912, null;
			}
			return cc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (to(t), a) if (t.flags & 256) t.flags &= -257, t = lc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (ec || qi(e, t, n, !1), a = (n & e.childLanes) !== 0, ec || a) {
				if (r = Rl, r !== null && (s = Ye(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Qr(e, s), hu(r, e, s), $s;
				Du(), t = lc(e, t, n);
			} else e = o.treeContext, ki = cf(s.nextSibling), Oi = t, W = !0, Ai = null, ji = !1, e !== null && Di(t, e), t = cc(t, r), t.flags |= 4096;
			return t;
		}
		return e = ai(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function dc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function fc(e, t, n, r, i) {
		return Yi(t), n = yo(e, t, n, r, void 0, i), r = Co(), e !== null && !ec ? (wo(e, t, i), Ec(e, t, i)) : (W && r && Ti(t), t.flags |= 1, tc(e, t, n, i), t.child);
	}
	function pc(e, t, n, r, i, a) {
		return Yi(t), t.updateQueue = null, n = xo(t, r, n, i), bo(e), r = Co(), e !== null && !ec ? (wo(e, t, a), Ec(e, t, a)) : (W && r && Ti(t), t.flags |= 1, tc(e, t, n, a), t.child);
	}
	function mc(e, t, n, r, i) {
		if (Yi(t), t.stateNode === null) {
			var a = ti, o = n.contextType;
			typeof o == "object" && o && (a = Xi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Bs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ia(t), o = n.contextType, a.context = typeof o == "object" && o ? Xi(o) : ti, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (zs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Bs.enqueueReplaceState(a, a.state, null), Wa(t, r, a, i), Ua(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Us(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ti, typeof u == "object" && u && (o = Xi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Hs(t, a, r, o), Fa = !1;
			var f = t.memoizedState;
			a.state = f, Wa(t, r, a, i), Ua(), l = t.memoizedState, s || f !== l || Fa ? (typeof d == "function" && (zs(t, n, d, r), l = t.memoizedState), (c = Fa || Vs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, La(e, t), o = t.memoizedProps, u = Us(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ti, typeof l == "object" && l && (c = Xi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Hs(t, a, r, c), Fa = !1, f = t.memoizedState, a.state = f, Wa(t, r, a, i), Ua();
			var p = t.memoizedState;
			o !== d || f !== p || Fa || e !== null && e.dependencies !== null && Ji(e.dependencies) ? (typeof s == "function" && (zs(t, n, s, r), p = t.memoizedState), (u = Fa || Vs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Ji(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, dc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Na(t, e.child, null, i), t.child = Na(t, null, n, i)) : tc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ec(e, t, i), e;
	}
	function hc(e, t, n, r) {
		return Li(), t.flags |= 256, tc(e, t, n, r), t.child;
	}
	var gc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function _c(e) {
		return {
			baseLanes: e,
			cachePool: ga()
		};
	}
	function vc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function yc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (ao.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (W) {
				if (a ? eo(t) : ro(t), (e = ki) ? (e = rf(e, ji), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: bi === null ? null : {
						id: xi,
						overflow: Si
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ui(e), n.return = t, t.child = n, Oi = t, ki = null)) : e = null, e === null) throw Ni(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (ro(t), a = t.mode, c = xc({
				mode: "hidden",
				children: c
			}, a), r = ci(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = _c(n), r.childLanes = vc(e, s, n), t.memoizedState = gc, oc(null, r)) : (eo(t), bc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (eo(t), t.flags &= -257, t = Sc(e, t, n)) : t.memoizedState === null ? (ro(t), c = r.fallback, a = t.mode, r = xc({
				mode: "visible",
				children: r.children
			}, a), c = ci(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Na(t, e.child, null, n), r = t.child, r.memoizedState = _c(n), r.childLanes = vc(e, s, n), t.memoizedState = gc, t = oc(null, r)) : (ro(t), t.child = e.child, t.flags |= 128, t = null);
			else if (eo(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, zi({
					value: r,
					source: null,
					stack: null
				}), t = Sc(e, t, n);
			} else if (ec || qi(e, t, n, !1), s = (n & e.childLanes) !== 0, ec || s) {
				if (s = Rl, s !== null && (r = Ye(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Qr(e, r), hu(s, e, r), $s;
				af(c) || Du(), t = Sc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, ki = cf(c.nextSibling), Oi = t, W = !0, Ai = null, ji = !1, e !== null && Di(t, e), t = bc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (ro(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ai(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ci(c, a, n, null), c.flags |= 2) : c = ai(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, oc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = _c(n) : (a = c.cachePool, a === null ? a = ga() : (l = na._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = vc(e, s, n), t.memoizedState = gc, oc(e.child, r)) : (eo(t), n = e.child, e = n.sibling, n = ai(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function bc(e, t) {
		return t = xc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function xc(e, t) {
		return e = ri(22, e, null, t), e.lanes = 0, e;
	}
	function Sc(e, t, n) {
		return Na(t, e.child, null, n), e = bc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Cc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Gi(e.return, t, n);
	}
	function wc(e, t, n, r, i, a) {
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
	function Tc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = ao.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, B(ao, o), tc(e, t, r, n), r = W ? _i : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Cc(e, n, t);
			else if (e.tag === 19) Cc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && oo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), wc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && oo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				wc(t, !0, n, null, a, r);
				break;
			case "together":
				wc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ec(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (qi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ai(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ai(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Dc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Ji(e))) : !0;
	}
	function Oc(e, t, n) {
		switch (t.tag) {
			case 3:
				oe(t, t.stateNode.containerInfo), Ui(t, na, e.memoizedState.cache), Li();
				break;
			case 27:
			case 5:
				ce(t);
				break;
			case 4:
				oe(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ui(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, to(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (eo(t), e = Ec(e, t, n), e === null ? null : e.sibling) : yc(e, t, n) : (eo(t), t.flags |= 128, null);
				eo(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (qi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Tc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), B(ao, ao.current), r) break;
				return null;
			case 22: return t.lanes = 0, ac(e, t, n, t.pendingProps);
			case 24: Ui(t, na, e.memoizedState.cache);
		}
		return Ec(e, t, n);
	}
	function kc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) ec = !0;
		else {
			if (!Dc(e, n) && !(t.flags & 128)) return ec = !1, Oc(e, t, n);
			ec = !!(e.flags & 131072);
		}
		else ec = !1, W && t.flags & 1048576 && wi(t, _i, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ca(t.elementType), t.type = e, typeof e == "function") ii(e) ? (r = Us(e, r), t.tag = 1, t = mc(null, t, e, r, n)) : (t.tag = 0, t = fc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = nc(null, t, e, r, n);
								break a;
							} else if (a === D) {
								t.tag = 14, t = rc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ee(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return fc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Us(r, t.pendingProps), mc(e, t, r, a, n);
			case 3:
				a: {
					if (oe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, La(e, t), Wa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ui(t, na, r), r !== o.cache && Ki(t, [na], n, !0), Ua(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = hc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = pi(Error(i(424)), t), zi(a), t = hc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (ki = cf(e.firstChild), Oi = t, W = !0, Ai = null, ji = !0, n = Pa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Li(), r === a) {
							t = Ec(e, t, n);
							break a;
						}
						tc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return dc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : W || (n = t.type, e = t.pendingProps, r = Bd(ie.current).createElement(n), r[tt] = t, r[nt] = e, Pd(r, n, e), mt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ce(t), e === null && W && (r = t.stateNode = ff(t.type, t.pendingProps, ie.current), Oi = t, ji = !0, a = ki, Zd(t.type) ? (lf = a, ki = cf(r.firstChild)) : ki = a), tc(e, t, t.pendingProps.children, n), dc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && W && ((a = r = ki) && (r = tf(r, t.type, t.pendingProps, ji), r === null ? a = !1 : (t.stateNode = r, Oi = t, ki = cf(r.firstChild), ji = !1, a = !0)), a || Ni(t)), ce(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = yo(e, t, So, null, null, n), Qf._currentValue = a), dc(e, t), tc(e, t, r, n), t.child;
			case 6: return e === null && W && ((e = n = ki) && (n = nf(n, t.pendingProps, ji), n === null ? e = !1 : (t.stateNode = n, Oi = t, ki = null, e = !0)), e || Ni(t)), null;
			case 13: return yc(e, t, n);
			case 4: return oe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Na(t, null, r, n) : tc(e, t, r, n), t.child;
			case 11: return nc(e, t, t.type, t.pendingProps, n);
			case 7: return tc(e, t, t.pendingProps, n), t.child;
			case 8: return tc(e, t, t.pendingProps.children, n), t.child;
			case 12: return tc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ui(t, t.type, r.value), tc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Yi(t), a = Xi(a), r = r(a), t.flags |= 1, tc(e, t, r, n), t.child;
			case 14: return rc(e, t, t.type, t.pendingProps, n);
			case 15: return ic(e, t, t.type, t.pendingProps, n);
			case 19: return Tc(e, t, n);
			case 31: return uc(e, t, n);
			case 22: return ac(e, t, n, t.pendingProps);
			case 24: return Yi(t), r = Xi(na), e === null ? (a = ma(), a === null && (a = Rl, o = ra(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ia(t), Ui(t, na, a)) : ((e.lanes & n) !== 0 && (La(e, t), Wa(t, null, null, n), Ua()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ui(t, na, r), r !== a.cache && Ki(t, [na], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ui(t, na, r))), tc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Ac(e) {
		e.flags |= 4;
	}
	function jc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (wu()) e.flags |= 8192;
			else throw wa = ba, va;
		} else e.flags &= -16777217;
	}
	function Mc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (wu()) e.flags |= 8192;
		else throw wa = ba, va;
	}
	function Nc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Ue(), e.lanes |= t, Yl |= t);
	}
	function Pc(e, t) {
		if (!W) switch (e.tailMode) {
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
	function Fc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Ic(e, t, n) {
		var r = t.pendingProps;
		switch (Ei(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Fc(t), null;
			case 1: return Fc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Wi(na), se(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ii(t) ? Ac(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ri())), Fc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Ac(t), o === null ? (Fc(t), jc(t, a, null, r, n)) : (Fc(t), Mc(t, o))) : o ? o === e.memoizedState ? (Fc(t), t.flags &= -16777217) : (Ac(t), Fc(t), Mc(t, o)) : (e = e.memoizedProps, e !== r && Ac(t), Fc(t), jc(t, a, e, r, n)), null;
			case 27:
				if (le(t), n = ie.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Fc(t), null;
					}
					e = V.current, Ii(t) ? Pi(t, e) : (e = ff(a, r, n), t.stateNode = e, Ac(t));
				}
				return Fc(t), null;
			case 5:
				if (le(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Fc(t), null;
					}
					if (o = V.current, Ii(t)) Pi(t, o);
					else {
						var s = Bd(ie.current);
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
						o[tt] = t, o[nt] = r;
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
						r && Ac(t);
					}
				}
				return Fc(t), jc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ie.current, Ii(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Oi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[tt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Ni(t, !0);
					} else e = Bd(e).createTextNode(r), e[tt] = t, t.stateNode = e;
				}
				return Fc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ii(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[tt] = t;
						} else Li(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Fc(t), e = !1;
					} else n = Ri(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (io(t), t) : (io(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Fc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ii(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[tt] = t;
						} else Li(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Fc(t), a = !1;
					} else a = Ri(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (io(t), t) : (io(t), null);
				}
				return io(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Nc(t, t.updateQueue), Fc(t), null);
			case 4: return se(), e === null && Sd(t.stateNode.containerInfo), Fc(t), null;
			case 10: return Wi(t.type), Fc(t), null;
			case 19:
				if (z(ao), r = t.memoizedState, r === null) return Fc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Pc(r, !1);
				else {
					if (Wl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = oo(e), o !== null) {
							for (t.flags |= 128, Pc(r, !1), e = o.updateQueue, t.updateQueue = e, Nc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) oi(n, e), n = n.sibling;
							return B(ao, ao.current & 1 | 2), W && Ci(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && xe() > tu && (t.flags |= 128, a = !0, Pc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = oo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Nc(t, e), Pc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !W) return Fc(t), null;
					} else 2 * xe() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Pc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Fc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = xe(), e.sibling = null, n = ao.current, B(ao, a ? n & 1 | 2 : n & 1), W && Ci(t, r.treeForkCount), e);
			case 22:
			case 23: return io(t), Za(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Fc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Fc(t), n = t.updateQueue, n !== null && Nc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && z(pa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Wi(na), Fc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Lc(e, t) {
		switch (Ei(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Wi(na), se(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return le(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (io(t), t.alternate === null) throw Error(i(340));
					Li();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (io(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Li();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return z(ao), null;
			case 4: return se(), null;
			case 10: return Wi(t.type), null;
			case 22:
			case 23: return io(t), Za(), e !== null && z(pa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Wi(na), null;
			case 25: return null;
			default: return null;
		}
	}
	function Rc(e, t) {
		switch (Ei(t), t.tag) {
			case 3:
				Wi(na), se();
				break;
			case 26:
			case 27:
			case 5:
				le(t);
				break;
			case 4:
				se();
				break;
			case 31:
				t.memoizedState !== null && io(t);
				break;
			case 13:
				io(t);
				break;
			case 19:
				z(ao);
				break;
			case 10:
				Wi(t.type);
				break;
			case 22:
			case 23:
				io(t), Za(), e !== null && z(pa);
				break;
			case 24: Wi(na);
		}
	}
	function zc(e, t) {
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
			Z(t, t.return, e);
		}
	}
	function Bc(e, t, n) {
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
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Vc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ka(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Hc(e, t, n) {
		n.props = Us(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Uc(e, t) {
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
			Z(e, t, n);
		}
	}
	function Wc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Z(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Z(e, t, n);
		}
		else n.current = null;
	}
	function Gc(e) {
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
			Z(e, e.return, t);
		}
	}
	function Kc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[nt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function qc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Jc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || qc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Yc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Jt));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Yc(e, t, n), e = e.sibling; e !== null;) Yc(e, t, n), e = e.sibling;
	}
	function Xc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Xc(e, t, n), e = e.sibling; e !== null;) Xc(e, t, n), e = e.sibling;
	}
	function Zc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[tt] = e, t[nt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var Qc = !1, $c = !1, el = !1, tl = typeof WeakSet == "function" ? WeakSet : Set, nl = null;
	function rl(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Sr(e), Cr(e)) {
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
		}, sp = !1, nl = t; nl !== null;) if (t = nl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, nl = e;
		else for (; nl !== null;) {
			switch (t = nl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Us(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
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
				e.return = t.return, nl = e;
				break;
			}
			nl = t.return;
		}
	}
	function il(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				yl(e, n), r & 4 && zc(5, n);
				break;
			case 1:
				if (yl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = Us(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Vc(n), r & 512 && Uc(n, n.return);
				break;
			case 3:
				if (yl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ka(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Zc(n);
			case 26:
			case 5:
				yl(e, n), t === null && r & 4 && Gc(n), r & 512 && Uc(n, n.return);
				break;
			case 12:
				yl(e, n);
				break;
			case 31:
				yl(e, n), r & 4 && ul(e, n);
				break;
			case 13:
				yl(e, n), r & 4 && dl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Qc, !r) {
					t = t !== null && t.memoizedState !== null || $c, i = Qc;
					var a = $c;
					Qc = r, ($c = t) && !a ? xl(e, n, (n.subtreeFlags & 8772) != 0) : yl(e, n), Qc = i, $c = a;
				}
				break;
			case 30: break;
			default: yl(e, n);
		}
	}
	function al(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, al(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && lt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var ol = null, sl = !1;
	function cl(e, t, n) {
		for (n = n.child; n !== null;) ll(e, t, n), n = n.sibling;
	}
	function ll(e, t, n) {
		if (U && typeof U.onCommitFiberUnmount == "function") try {
			U.onCommitFiberUnmount(Ae, n);
		} catch {}
		switch (n.tag) {
			case 26:
				$c || Wc(n, t), cl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				$c || Wc(n, t);
				var r = ol, i = sl;
				Zd(n.type) && (ol = n.stateNode, sl = !1), cl(e, t, n), pf(n.stateNode), ol = r, sl = i;
				break;
			case 5: $c || Wc(n, t);
			case 6:
				if (r = ol, i = sl, ol = null, cl(e, t, n), ol = r, sl = i, ol !== null) if (sl) try {
					(ol.nodeType === 9 ? ol.body : ol.nodeName === "HTML" ? ol.ownerDocument.body : ol).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					ol.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				ol !== null && (sl ? (e = ol, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(ol, n.stateNode));
				break;
			case 4:
				r = ol, i = sl, ol = n.stateNode.containerInfo, sl = !0, cl(e, t, n), ol = r, sl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Bc(2, n, t), $c || Bc(4, n, t), cl(e, t, n);
				break;
			case 1:
				$c || (Wc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Hc(n, t, r)), cl(e, t, n);
				break;
			case 21:
				cl(e, t, n);
				break;
			case 22:
				$c = (r = $c) || n.memoizedState !== null, cl(e, t, n), $c = r;
				break;
			default: cl(e, t, n);
		}
	}
	function ul(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function fl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new tl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new tl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function pl(e, t) {
		var n = fl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ml(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							ol = c.stateNode, sl = !1;
							break a;
						}
						break;
					case 5:
						ol = c.stateNode, sl = !1;
						break a;
					case 3:
					case 4:
						ol = c.stateNode.containerInfo, sl = !0;
						break a;
				}
				c = c.return;
			}
			if (ol === null) throw Error(i(160));
			ll(o, s, a), ol = null, sl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) gl(t, e), t = t.sibling;
	}
	var hl = null;
	function gl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ml(t, e), _l(e), r & 4 && (Bc(3, e, e.return), zc(3, e), Bc(5, e, e.return));
				break;
			case 1:
				ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), r & 64 && Qc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = hl;
				if (ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[ct] || o[tt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[tt] = e, mt(o), r = o;
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
							o[tt] = e, mt(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Kc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), n !== null && r & 4 && Kc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Bt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Kc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (el = !0);
				break;
			case 6:
				if (ml(t, e), _l(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = hl, hl = gf(t.containerInfo), ml(t, e), hl = a, _l(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				el && (el = !1, vl(e));
				break;
			case 4:
				r = hl, hl = gf(e.stateNode.containerInfo), ml(t, e), _l(e), hl = r;
				break;
			case 12:
				ml(t, e), _l(e);
				break;
			case 31:
				ml(t, e), _l(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 13:
				ml(t, e), _l(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = xe()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Qc, d = $c;
				if (Qc = u || a, $c = d || l, ml(t, e), $c = d, Qc = u, _l(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Qc || $c || bl(e)), n = null, t = e;;) {
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
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, pl(e, n))));
				break;
			case 19:
				ml(t, e), _l(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ml(t, e), _l(e);
		}
	}
	function _l(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (qc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Xc(e, Jc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Bt(o, ""), n.flags &= -33), Xc(e, Jc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Yc(e, Jc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function vl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			vl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function yl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) il(e, t.alternate, t), t = t.sibling;
	}
	function bl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Bc(4, t, t.return), bl(t);
					break;
				case 1:
					Wc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Hc(t, t.return, n), bl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Wc(t, t.return), bl(t);
					break;
				case 22:
					t.memoizedState === null && bl(t);
					break;
				case 30:
					bl(t);
					break;
				default: bl(t);
			}
			e = e.sibling;
		}
	}
	function xl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					xl(i, a, n), zc(4, a);
					break;
				case 1:
					if (xl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ga(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Vc(a), Uc(a, a.return);
					break;
				case 27: Zc(a);
				case 26:
				case 5:
					xl(i, a, n), n && r === null && o & 4 && Gc(a), Uc(a, a.return);
					break;
				case 12:
					xl(i, a, n);
					break;
				case 31:
					xl(i, a, n), n && o & 4 && ul(i, a);
					break;
				case 13:
					xl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 22:
					a.memoizedState === null && xl(i, a, n), Uc(a, a.return);
					break;
				case 30: break;
				default: xl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Sl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ia(n));
	}
	function Cl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ia(e));
	}
	function wl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Tl(e, t, n, r), t = t.sibling;
	}
	function Tl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				wl(e, t, n, r), i & 2048 && zc(9, t);
				break;
			case 1:
				wl(e, t, n, r);
				break;
			case 3:
				wl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ia(e)));
				break;
			case 12:
				if (i & 2048) {
					wl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else wl(e, t, n, r);
				break;
			case 31:
				wl(e, t, n, r);
				break;
			case 13:
				wl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? wl(e, t, n, r) : (a._visibility |= 2, El(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? wl(e, t, n, r) : Dl(e, t), i & 2048 && Sl(o, t);
				break;
			case 24:
				wl(e, t, n, r), i & 2048 && Cl(t.alternate, t);
				break;
			default: wl(e, t, n, r);
		}
	}
	function El(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					El(a, o, s, c, i), zc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, El(a, o, s, c, i)) : u._visibility & 2 ? El(a, o, s, c, i) : Dl(a, o), i && l & 2048 && Sl(o.alternate, o);
					break;
				case 24:
					El(a, o, s, c, i), i && l & 2048 && Cl(o.alternate, o);
					break;
				default: El(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Dl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Dl(n, r), i & 2048 && Sl(r.alternate, r);
					break;
				case 24:
					Dl(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				default: Dl(n, r);
			}
			t = t.sibling;
		}
	}
	var Ol = 8192;
	function kl(e, t, n) {
		if (e.subtreeFlags & Ol) for (e = e.child; e !== null;) Al(e, t, n), e = e.sibling;
	}
	function Al(e, t, n) {
		switch (e.tag) {
			case 26:
				kl(e, t, n), e.flags & Ol && e.memoizedState !== null && Gf(n, hl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				kl(e, t, n);
				break;
			case 3:
			case 4:
				var r = hl;
				hl = gf(e.stateNode.containerInfo), kl(e, t, n), hl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ol, Ol = 16777216, kl(e, t, n), Ol = r) : kl(e, t, n));
				break;
			default: kl(e, t, n);
		}
	}
	function jl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ml(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nl = r, Fl(r, e);
			}
			jl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Nl(e), e = e.sibling;
	}
	function Nl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ml(e), e.flags & 2048 && Bc(9, e, e.return);
				break;
			case 3:
				Ml(e);
				break;
			case 12:
				Ml(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Pl(e)) : Ml(e);
				break;
			default: Ml(e);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nl = r, Fl(r, e);
			}
			jl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Bc(8, t, t.return), Pl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Pl(t));
					break;
				default: Pl(t);
			}
			e = e.sibling;
		}
	}
	function Fl(e, t) {
		for (; nl !== null;) {
			var n = nl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Bc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ia(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, nl = r;
			else a: for (n = e; nl !== null;) {
				r = nl;
				var i = r.sibling, a = r.return;
				if (al(r), r === n) {
					nl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, nl = i;
					break a;
				}
				nl = a;
			}
		}
	}
	var Il = {
		getCacheForType: function(e) {
			var t = Xi(na), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Xi(na).controller.signal;
		}
	}, Ll = typeof WeakMap == "function" ? WeakMap : Map, q = 0, Rl = null, J = null, Y = 0, X = 0, zl = null, Bl = !1, Vl = !1, Hl = !1, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return q & 2 && Y !== 0 ? Y & -Y : F.T === null ? Qe() : dd();
	}
	function mu() {
		if (Jl === 0) if (!(Y & 536870912) || W) {
			var e = Le;
			Le <<= 1, !(Le & 3932160) && (Le = 262144), Jl = e;
		} else Jl = 536870912;
		return e = Qa.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === Rl && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Y, Jl, !1)), Ge(e, n), (!(q & 2) || e !== Rl) && (e === Rl && (!(q & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (q & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Ve(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Vl && !r && yu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !vu(n)) {
					a = Ou(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Xl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
								if (Hl && !l) {
									c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
									break a;
								}
								o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Su(e, 0), yu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							yu(r, t, Jl, !Bl);
							break a;
						case 2:
							Zl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = $l + 300 - xe(), 10 < a)) {
						if (yu(r, t, Jl, !Bl), Be(r, 0, !0) !== 0) break a;
						su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, "Throttled", -0, 0), a);
						break a;
					}
					_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Jt
			}, Al(t, a, d);
			var m = (a & 62914560) === a ? $l - xe() : (a & 4194048) === a ? eu - xe() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!_r(a(), i)) return !1;
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
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Me(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && qe(e, n, t);
	}
	function bu() {
		return q & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Hi = Vi = null, To(e), Da = null, Oa = 0, e = J;
			for (; e !== null;) Rc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), Rl = e, J = n = ai(e.current, null), Y = t, X = 0, zl = null, Bl = !1, Vl = Ve(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Me(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Ul = t, Yr(), n;
	}
	function Cu(e, t) {
		G = null, F.H = Fs, t === _a || t === ya ? (t = Ta(), X = 3) : t === va ? (t = Ta(), X = 4) : X = t === $s ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, zl = t, J === null && (Wl = 1, qs(e, pi(t, e.current)));
	}
	function wu() {
		var e = Qa.current;
		return e === null ? !0 : (Y & 4194048) === Y ? $a === null : (Y & 62914560) === Y || Y & 536870912 ? e === $a : !1;
	}
	function Tu() {
		var e = F.H;
		return F.H = Fs, e === null ? Fs : e;
	}
	function Eu() {
		var e = F.A;
		return F.A = Il, e;
	}
	function Du() {
		Wl = 4, Bl || (Y & 4194048) !== Y && Qa.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || Rl === null || yu(Rl, Y, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = q;
		q |= 2;
		var i = Tu(), a = Eu();
		(Rl !== e || Y !== t) && (nu = null, Su(e, t)), t = !1;
		var o = Wl;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = zl;
					switch (X) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Qa.current === null && (t = !0);
							var l = X;
							if (X = 0, zl = null, Pu(e, s, c, l), n && Vl) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, zl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = Wl;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Hi = Vi = null, q = r, F.H = i, F.A = a, J === null && (Rl = null, Y = 0, Yr()), o;
	}
	function ku() {
		for (; J !== null;) Mu(J);
	}
	function Au(e, t) {
		var n = q;
		q |= 2;
		var r = Tu(), a = Eu();
		Rl !== e || Y !== t ? (nu = null, tu = xe() + 500, Su(e, t)) : Vl = Ve(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = zl;
					b: switch (X) {
						case 1:
							X = 0, zl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (xa(o)) {
								X = 0, zl = null, Nu(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || Rl !== e || (X = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							xa(o) ? (X = 0, zl = null, Nu(t)) : (X = 0, zl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Wf(s) : c.stateNode.complete) {
										X = 0, zl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Fu(u));
										}
										break b;
									}
							}
							X = 0, zl = null, Pu(e, t, o, 5);
							break;
						case 6:
							X = 0, zl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), Wl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return Hi = Vi = null, F.H = r, F.A = a, q = n, J === null ? (Rl = null, Y = 0, Yr(), Wl) : 0;
	}
	function ju() {
		for (; J !== null && !ye();) Mu(J);
	}
	function Mu(e) {
		var t = kc(e.alternate, e, Ul);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = pc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = pc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: To(t);
			default: Rc(n, t), t = J = oi(t, Ul), t = kc(n, t, Ul);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Pu(e, t, n, r) {
		Hi = Vi = null, To(t), Da = null, Oa = 0;
		var i = t.return;
		try {
			if (Qs(e, i, t, n, Y)) {
				Wl = 1, qs(e, pi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Wl = 1, qs(e, pi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (W || r === 1 ? e = !0 : Vl || Y & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Qa.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Bl);
				return;
			}
			e = t.return;
			var n = Ic(t.alternate, t, Ul);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Wl === 0 && (Wl = 5);
	}
	function Iu(e, t) {
		do {
			var n = Lc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Wl = 6, J = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (q & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Jr, Ke(e, n, o, s, c, l), e === Rl && (J = Rl = null, Y = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Te, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = F.T, F.T = null, a = I.p, I.p = 2, s = q, q |= 4;
				try {
					rl(e, t, n);
				} finally {
					q = s, I.p = a, F.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = F.T, F.T = null;
				var r = I.p;
				I.p = 2;
				var i = q;
				q |= 4;
				try {
					gl(t, e);
					var a = zd, o = Sr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && xr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Cr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = br(s, h), v = br(s, g);
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
					q = i, I.p = r, F.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = F.T, F.T = null;
				var r = I.p;
				I.p = 2;
				var i = q;
				q |= 4;
				try {
					il(e, t.alternate, t);
				} finally {
					q = i, I.p = r, F.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, be();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), Ze(n), t = t.stateNode, U && typeof U.onCommitFiberRoot == "function") try {
				U.onCommitFiberRoot(Ae, t, void 0, (t.current.flags & 128) == 128);
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
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ia(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = Ze(su), r = F.T, a = I.p;
		try {
			I.p = 32 > n ? 32 : n, F.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, q & 6) throw Error(i(331));
			var c = q;
			if (q |= 4, Nl(o.current), Tl(o, o.current, s, n), q = c, id(0, !1), U && typeof U.onPostCommitFiberRoot == "function") try {
				U.onPostCommitFiberRoot(Ae, o);
			} catch {}
			return !0;
		} finally {
			I.p = a, F.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = pi(n, t), t = Ys(e.stateNode, t, 2), e = za(e, t, 2), e !== null && (Ge(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = pi(n, e), n = Xs(2), r = za(t, n, 2), r !== null && (Zs(n, r, t, e), Ge(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ll();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Hl = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Rl === e && (Y & n) === n && (Wl === 4 || Wl === 3 && (Y & 62914560) === Y && 300 > xe() - $l ? !(q & 2) && Su(e, 0) : ql |= n, Yl === Y && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = Ue()), e = Qr(e, t), e !== null && (Ge(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
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
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return _e(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Me(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ld(r, a));
					} else a = Y, a = Be(r, r === Rl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Ve(r, a) || (n = !0, ld(r, a));
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = xe(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Me(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = He(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Rl, n = Y, n = Be(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ve(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Ve(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && ve(r), Ze(n)) {
				case 2:
				case 8:
					n = we;
					break;
				case 32:
					n = Te;
					break;
				case 268435456:
					n = De;
					break;
				default: n = Te;
			}
			return r = cd.bind(null, e), n = _e(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ve(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = Be(e, e === Rl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, xe()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			q & 6 ? _e(Ce, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = sa;
			e === 0 && (e = Ie, Ie <<= 1, !(Ie & 261888) && (Ie = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : qt("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[nt] || null).action), o = r.submitter;
			o && (t = (t = o[nt] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new gn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								xs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), xs(n, {
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
	for (var hd = 0; hd < Ur.length; hd++) {
		var gd = Ur[hd];
		Wr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Wr(Fr, "onAnimationEnd"), Wr(Ir, "onAnimationIteration"), Wr(Lr, "onAnimationStart"), Wr("dblclick", "onDoubleClick"), Wr("focusin", "onFocus"), Wr("focusout", "onBlur"), Wr(Rr, "onTransitionRun"), Wr(zr, "onTransitionStart"), Wr(Br, "onTransitionCancel"), Wr(Vr, "onTransitionEnd"), vt("onMouseEnter", ["mouseout", "mouseover"]), vt("onMouseLeave", ["mouseout", "mouseover"]), vt("onPointerEnter", ["pointerout", "pointerover"]), vt("onPointerLeave", ["pointerout", "pointerover"]), _t("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), _t("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), _t("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), _t("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), _t("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), _t("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
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
						Gr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Gr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[it];
		n === void 0 && (n = t[it] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, ht.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !an || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
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
					if (s = ut(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		tn(function() {
			var r = a, i = Xt(n), s = [];
			a: {
				var c = Hr.get(e);
				if (c !== void 0) {
					var l = gn, u = e;
					switch (e) {
						case "keypress": if (dn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Pn;
							break;
						case "focusin":
							u = "focus", l = Tn;
							break;
						case "focusout":
							u = "blur", l = Tn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Tn;
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
							l = Cn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = wn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = In;
							break;
						case Fr:
						case Ir:
						case Lr:
							l = En;
							break;
						case Vr:
							l = Ln;
							break;
						case "scroll":
						case "scrollend":
							l = vn;
							break;
						case "wheel":
							l = Rn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Dn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Fn;
							break;
						case "toggle":
						case "beforetoggle": l = zn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = nn(m, p), g != null && d.push(Td(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Yt && (u = n.relatedTarget || n.fromElement) && (ut(u) || u[rt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? ut(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Cn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Fn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ft(l), h = u == null ? c : ft(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, ut(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? ft(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = ar;
					else if ($n(c)) if (or) v = hr;
					else {
						v = pr;
						var y = fr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Wt(r.elementType) && (v = ar) : v = mr;
					if (v &&= v(e, r)) {
						er(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && It(c, "number", c.value);
				}
				switch (y = r ? ft(r) : window, e) {
					case "focusin":
						($n(y) || y.contentEditable === "true") && (Tr = y, Er = r, Dr = null);
						break;
					case "focusout":
						Dr = Er = Tr = null;
						break;
					case "mousedown":
						Or = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Or = !1, kr(s, n, i);
						break;
					case "selectionchange": if (wr) break;
					case "keydown":
					case "keyup": kr(s, n, i);
				}
				var b;
				if (Vn) b: {
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
				else Yn ? qn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Wn && n.locale !== "ko" && (Yn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Yn && (b = un()) : (sn = i, cn = "value" in sn ? sn.value : sn.textContent, Yn = !0)), y = Ed(r, x), 0 < y.length && (x = new On(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Jn(n), b !== null && (x.data = b)))), (b = Un ? Xn(e, n) : Zn(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new On("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), md(s, e, r, n, i);
			}
			yd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = nn(e, n), i != null && r.unshift(Td(e, i, a)), i = nn(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = nn(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = nn(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Bt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Bt(e, "" + r);
				break;
			case "className":
				wt(e, "class", r);
				break;
			case "tabIndex":
				wt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				wt(e, n, r);
				break;
			case "style":
				Ut(e, r, o);
				break;
			case "data": if (t !== "object") {
				wt(e, "data", r);
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
				r = qt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = qt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Jt);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
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
				n = qt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				Q("beforetoggle", e), Q("toggle", e), Ct(e, "popover", r);
				break;
			case "xlinkActuate":
				Tt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Tt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Tt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Tt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Tt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Tt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Tt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Tt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Tt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Ct(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Gt.get(n) || n, Ct(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Ut(e, r, o);
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
				typeof r == "string" ? Bt(e, r) : (typeof r == "number" || typeof r == "bigint") && Bt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Jt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!gt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[nt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Ct(e, n, r);
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
				Q("error", e), Q("load", e);
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
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
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
						default: $(e, t, r, d, n, null);
					}
				}
				Ft(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Lt(e, !!r, n, !0) : Lt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: $(e, t, s, c, n, null);
				}
				zt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
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
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (Wt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
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
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
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
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Pt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Lt(e, !!n, n ? [] : "", !1) : Lt(e, !!n, t, !0)) : Lt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
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
					default: a !== o && $(e, t, s, a, r, o);
				}
				Rt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (Wt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
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
					a[ct] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
					ef(n), lt(n);
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
			else if (!e[ct]) switch (t) {
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
		lt(e);
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
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = dt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Cs(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Nt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), mt(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + Nt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Nt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Nt(n.imageSizes) + "\"]")) : i += "[href=\"" + Nt(e) + "\"]";
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
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), mt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Nt(r) + "\"][href=\"" + Nt(e) + "\"]", a = i;
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
				r = n.createElement("link"), Pd(r, "link", e), mt(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = pt(r).hoistableStyles, a = Af(e);
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
					mt(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = pt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), mt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = pt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), mt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = ie.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = pt(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = pt(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = pt(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + Nt(e) + "\"";
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
		}), Pd(t, "link", n), mt(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Nt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Nt(n.href) + "\"]");
				if (r) return t.instance = r, mt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), mt(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, mt(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), mt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, mt(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), mt(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[ct] || a[tt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, mt(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), mt(a);
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
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = We(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = We(0), this.hiddenUpdates = We(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ri(3, null, null, t), e.current = a, a.stateNode = e, t = ra(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ia(a), e;
	}
	function tp(e) {
		return e ? (e = ti, e) : ti;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ra(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = za(e, r, t), n !== null && (hu(n, e, t), Ba(n, e, t));
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
			var t = Qr(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = Xe(t);
			var n = Qr(e, t);
			n !== null && hu(n, e, t), ip(e, t);
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
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = dt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = ze(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Me(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(q & 6) && (tu = xe() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Qr(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Xt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = ut(e), e !== null) {
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
			case "message": switch (Se()) {
				case Ce: return 2;
				case we: return 8;
				case Te:
				case Ee: return 32;
				case De: return 268435456;
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
		}, t !== null && (t = dt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = ut(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, $e(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = l(n), t !== null) {
						e.blockedOn = t, $e(e.priority, function() {
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
				Yt = r, n.target.dispatchEvent(r), Yt = null;
			} else return t = dt(n), t !== null && ap(t), e.blockedOn = n, !1;
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
				var a = dt(n);
				a !== null && (e.splice(t, 3), t -= 3, xs(a, {
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
			var i = n[r], a = n[r + 1], o = i[nt] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[nt] || null) s = o.formAction;
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
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[rt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Qe();
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
			Ae = zp.inject(Rp), U = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Ws, s = Gs, c = Ks;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[rt] = t.current, Sd(e), new Fp(t);
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
}, j = (e) => Array.isArray(e) ? e.join(", ") : e || "";
function M({ type: e, initial: t, accessClasses: n, definitions: r = E }) {
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
					defaultValue: j(t[n])
				})
			] }, n))
		}),
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
			})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Zugriff auf dieses Dokument *", /* @__PURE__ */ (0, _.jsx)("select", {
				name: "access",
				defaultValue: j(t.access) || i?.access || "open",
				children: n.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
					value: e,
					children: O[e]
				}, e))
			})] })]
		}),
		/* @__PURE__ */ (0, _.jsxs)("label", { children: ["Quelle / Urheber/in (optional)", /* @__PURE__ */ (0, _.jsx)("input", {
			name: "source",
			maxLength: 160,
			defaultValue: j(t.source)
		})] }),
		/* @__PURE__ */ (0, _.jsx)("p", {
			className: "club-hint",
			children: "Die gewählte Zugriffsklasse gilt auch für die Dateien. «Mitglieder» bedeutet ausschliesslich berechtigte angemeldete Clubmitglieder."
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
}, ee = (0, h.createContext)(N);
function P({ children: e }) {
	let [t, n] = (0, h.useState)(N);
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_catalog", {}, e.signal).then(n).catch(() => {}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsx)(ee.Provider, {
		value: t,
		children: e
	});
}
var F = () => (0, h.useContext)(ee);
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
], te = L.filter((e) => e.startsWith("TR")), ne = () => ({
	model: "",
	details: "",
	year: "",
	colour: "",
	registration: "",
	status: "roadworthy",
	notes: ""
});
function R({ error: e, message: t }) {
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
function z({ title: e, children: t }) {
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "form-section",
		children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o(e) }), t]
	});
}
function B(e) {
	let t = e.trim(), n = t.replace(/\D/g, ""), r = "";
	return n.startsWith("0041") && n.length === 13 ? r = n.slice(4) : (t.startsWith("+41") || t.startsWith("0041")) && n.startsWith("41") && n.length === 11 ? r = n.slice(2) : n.startsWith("0") && n.length === 10 && (r = n.slice(1)), r.length === 9 ? `${t.startsWith("+41") || t.startsWith("0041") ? "+41 " : "0"}${r.slice(0, 2)} ${r.slice(2, 5)} ${r.slice(5, 7)} ${r.slice(7)}` : t;
}
function V({ prefix: e = "", names: t = !0, values: n = {}, mobileRequired: r = !1, formatSwissMobile: i = !1, personalDetails: a = !1 }) {
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
						e.currentTarget.value = B(e.currentTarget.value);
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
function re({ value: e, onChange: t, application: n = !1 }) {
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
function ie() {
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
}, se = oe, ce = Object.fromEntries(Object.entries(oe).map(([e, t]) => [e, "initialStatus" in t && t.initialStatus === "draft" ? {} : Object.fromEntries(t.fields.map((e) => [e.key, e.default]))])), le = Object.fromEntries(Object.entries(oe).map(([e, t]) => [e, !("initialStatus" in t && t.initialStatus === "draft")]));
function ue(e) {
	return Object.fromEntries(Object.keys({
		...ce,
		...e
	}).map((t) => [t, {
		...ce[t],
		...e[t]
	}]));
}
var de = (0, h.createContext)({
	values: ce,
	published: le,
	loading: !0,
	refresh: async () => {},
	error: ""
});
function fe({ children: e }) {
	let [t, n] = (0, h.useState)(ce), [r, i] = (0, h.useState)(""), [a, o] = (0, h.useState)(le), [s, c] = (0, h.useState)(!0), l = (0, h.useCallback)(async () => {
		try {
			let e = await C("strc_editorial", { operation: "public" });
			n(ue(e.values)), o({
				...le,
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
			n(ue(e.values)), o({
				...le,
				...e.published
			}), i(""), c(!1);
		}).catch(() => {
			e.signal.aborted || (i("Inhalte konnten nicht geladen werden."), c(!1));
		}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsx)(de.Provider, {
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
function pe(e, t) {
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
function me() {
	let e = (0, h.useContext)(de), { language: t } = n(), r = Object.fromEntries(Object.entries(e.values).map(([e, n]) => [e, pe(n, t)]));
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
function he({ html: e, className: t = "" }) {
	return /* @__PURE__ */ (0, _.jsx)("div", {
		className: `rich-content ${t}`,
		dangerouslySetInnerHTML: { __html: e }
	});
}
function ge({ id: e, className: t = "" }) {
	let { text: n } = me();
	return /* @__PURE__ */ (0, _.jsx)(he, {
		html: n(e),
		className: t
	});
}
function H(e) {
	return e.startsWith("/") && !e.startsWith("//") ? `${window.strcSettings.assetBase ?? ""}${e}` : e;
}
function _e(e) {
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
	return H(n[t] ? `/regions/${n[t]}` : "/regions/00000326-Aarau_Obertorturm_4x3.png");
}
function ve(e) {
	return {
		backgroundImage: `url("${_e(e)}")`,
		backgroundSize: "cover",
		backgroundPosition: "center 65%",
		backgroundRepeat: "no-repeat"
	};
}
//#endregion
//#region app/components/ImageFrame.tsx
function ye(e, t = "contain") {
	let [n, r, i] = typeof e == "string" ? e.split("|") : [], a = (e) => e !== void 0 && /^\d{1,3}$/.test(e) ? Math.min(100, Math.max(0, Number(e))) : 50;
	return {
		objectFit: n === "cover" || n === "contain" ? n : t,
		objectPosition: `${a(r)}% ${a(i)}%`
	};
}
function be({ value: e = "", image: t = "", label: n = "Bild im Rahmen", changed: r, portrait: i = !1 }) {
	let a = ye(e, i ? "cover" : "contain"), [o, s] = String(a.objectPosition).replaceAll("%", "").split(" "), c = (e, t, n) => r(`${e}|${t}|${n}`);
	return /* @__PURE__ */ (0, _.jsxs)("fieldset", {
		className: "image-frame-control",
		children: [
			/* @__PURE__ */ (0, _.jsx)("legend", { children: n }),
			t && /* @__PURE__ */ (0, _.jsx)("div", {
				className: `image-frame-preview${i ? " portrait" : ""}`,
				children: /* @__PURE__ */ (0, _.jsx)(v, {
					src: H(t),
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
function xe({ documentKey: e, contained: t = !1 }) {
	let { text: n } = me(), r = n(e + ".landingImage"), i = n(e + ".landingBody");
	if (!r && !i) return null;
	let a = r ? /* @__PURE__ */ (0, _.jsxs)("figure", {
		className: "static-cover",
		children: [/* @__PURE__ */ (0, _.jsx)(v, {
			src: H(r),
			alt: n(e + ".landingImageAlt"),
			width: 1440,
			height: 800,
			style: ye(n(e + ".landingImageFrame"))
		}), n(e + ".landingImageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: n(e + ".landingImageCaption") })]
	}) : null;
	return t ? /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "landing-introduction",
		"aria-label": o("Weitere Informationen"),
		children: [a, i && /* @__PURE__ */ (0, _.jsx)(ge, { id: e + ".landingBody" })]
	}) : /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-content landing-introduction",
		"aria-label": o("Weitere Informationen"),
		children: [a, i && /* @__PURE__ */ (0, _.jsx)(ge, { id: e + ".landingBody" })]
	});
}
//#endregion
//#region app/components/Marketplace.tsx
var Se = [
	"Teile",
	"Fahrzeuge",
	"Zubehör",
	"Sonstiges"
], Ce = (e) => Array.isArray(e.details?.parts) && e.details.parts.length ? e.details.parts : [e.title];
function we(e) {
	return e.details?.offerType === "free" ? "Kostenlos" : e.details?.offerType === "swap" ? "Tausch" : e.details?.priceMode === "request" ? "Preis auf Anfrage" : Te.format(Number(e.price)) + (e.details?.priceMode === "negotiable" ? " VB" : "");
}
var Te = new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: "CHF"
}), Ee = window.strcSettings.wordpressUrl ?? "http://localhost:8080", De = window.strcSettings.siteUrl ?? "http://localhost:3000", Oe = `${Ee}/wp-login.php?redirect_to=${encodeURIComponent(`${De}/#marktplatz`)}`;
function ke(e, t) {
	return C("strc_marketplace", e, t);
}
function Ae(e, t) {
	return w("strc_marketplace", t, e);
}
function U({ title: e, close: t, busy: n = !1, children: r }) {
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
function je({ section: e, session: t, notify: n }) {
	let { text: r } = me(), i = e === "ersatzteile" ? "parts" : e === "fahrzeuge" ? "cars" : "landing", [a, s] = (0, h.useState)({
		ads: [],
		total: 0,
		pages: 0
	}), [c, l] = (0, h.useState)(!0), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(""), [m, g] = (0, h.useState)(""), [y] = (0, h.useState)(e === "meine"), [b, x] = (0, h.useState)(1), [S, C] = (0, h.useState)(0), [w, T] = (0, h.useState)(!1), [E, D] = (0, h.useState)(null), [O, k] = (0, h.useState)(null), A = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		if (i === "landing") return;
		let e = new AbortController(), t = window.setTimeout(() => {
			l(!0), d(""), ke({
				operation: "list",
				mine: y ? "1" : "0",
				search: f,
				category: i === "parts" ? "parts" : "Fahrzeuge",
				model: i === "parts" ? m : "",
				page: String(b)
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
		t?.memberAccess,
		b,
		S
	]);
	function j() {
		l(!0), C((e) => e + 1);
	}
	function M(e) {
		l(!0), e(), x(1);
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
		/* @__PURE__ */ (0, _.jsx)(xe, { documentKey: "market" }),
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
	let N = i === "parts", ee = r(N ? "market.partsTitle" : "market.carsTitle");
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Marktplatz")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: ee }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: r(N ? "market.partsText" : "market.carsText") })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content marketplace market-section",
			"aria-label": ee,
			children: [
				/* @__PURE__ */ (0, _.jsx)("a", {
					className: "market-back",
					href: "#marktplatz",
					children: "Marktplatz-Übersicht"
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-toolbar",
					children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: N ? "Ersatzteile finden" : "Fahrzeuge entdecken" }), /* @__PURE__ */ (0, _.jsx)("p", { children: N ? r("market.partsGuide") : "Entdecke Triumphs aus dem Club und öffne ein Inserat für Bilder und Details." })] }), t?.canCreateAd && /* @__PURE__ */ (0, _.jsx)("button", {
						ref: A,
						className: "market-primary",
						onClick: () => T(!0),
						children: "＋ Inserat erstellen"
					})]
				}),
				/* @__PURE__ */ (0, _.jsx)("a", {
					className: "page-back",
					href: "#marktplatz",
					children: o("← Zur Marktplatzübersicht")
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-filters market-part-filters",
					children: [
						e === "meine" && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Meine Inserate") }),
						N && /* @__PURE__ */ (0, _.jsxs)("label", {
							className: "market-search",
							children: ["Triumph-Modell", /* @__PURE__ */ (0, _.jsxs)("select", {
								value: m,
								onChange: (e) => M(() => g(e.target.value)),
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Modelle")
								}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: e
								}, e))]
							})]
						}),
						/* @__PURE__ */ (0, _.jsxs)("label", {
							className: "market-search",
							children: [N ? "Teil oder Stichwort" : "Fahrzeug suchen", /* @__PURE__ */ (0, _.jsx)("input", {
								type: "search",
								placeholder: N ? "z. B. Einspritzung" : "z. B. TR6",
								value: f,
								onChange: (e) => M(() => p(e.target.value))
							})]
						})
					]
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
						onClick: j,
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
							N ? " mit verfügbaren Teilen" : " mit Fahrzeugen"
						]
					}),
					a.ads.length ? N ? /* @__PURE__ */ (0, _.jsx)("ul", {
						className: "market-parts-list",
						"aria-label": "Verfügbare Teile",
						children: a.ads.flatMap((e) => Ce(e).map((t, n) => /* @__PURE__ */ (0, _.jsx)("li", { children: /* @__PURE__ */ (0, _.jsxs)("button", {
							type: "button",
							onClick: () => k(e),
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
										Ce(e).length > 1 ? `${Ce(e).length} Teile in einem Inserat · ` : "",
										e.details?.model || e.category,
										" · ",
										e.title
									] })]
								}),
								/* @__PURE__ */ (0, _.jsxs)("span", {
									className: "market-part-price",
									children: [we(e), Ce(e).length > 1 && /* @__PURE__ */ (0, _.jsx)("small", { children: "für das Inserat" })]
								})
							]
						}) }, `${e.id}-${n}`)))
					}) : /* @__PURE__ */ (0, _.jsx)("div", {
						className: "market-grid",
						children: a.ads.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "market-card",
							children: [/* @__PURE__ */ (0, _.jsxs)("button", {
								className: "market-card-open",
								onClick: () => k(e),
								"aria-label": `${e.title}, ${we(e)}, Details ansehen`,
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
										/* @__PURE__ */ (0, _.jsxs)("p", {
											className: "eyebrow",
											children: [e.category, e.mine ? " · Ihr Inserat" : ""]
										}),
										/* @__PURE__ */ (0, _.jsx)("h3", { children: e.title }),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: we(e) }),
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
							/* @__PURE__ */ (0, _.jsx)("p", { children: f || m ? "Versuche ein anderes Modell oder Stichwort." : "Sobald Clubmitglieder etwas anbieten, erscheint es hier." })
						]
					}),
					a.pages > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "market-pagination",
						children: [
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: b === 1,
								onClick: () => {
									l(!0), x(b - 1);
								},
								children: o("Zurück")
							}),
							/* @__PURE__ */ (0, _.jsxs)("span", { children: [
								o("Seite"),
								" ",
								b,
								" ",
								o("von"),
								" ",
								a.pages
							] }),
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: b >= a.pages,
								onClick: () => {
									l(!0), x(b + 1);
								},
								children: o("Weiter")
							})
						]
					})
				] })
			]
		}),
		w && /* @__PURE__ */ (0, _.jsx)(Me, {
			session: t,
			initialCategory: N ? "Teile" : "Fahrzeuge",
			close: () => T(!1),
			created: () => {
				T(!1), p(""), g(""), x(1), j(), n("Ihr Inserat wurde zur Prüfung eingereicht."), requestAnimationFrame(() => A.current?.focus());
			}
		}),
		E && /* @__PURE__ */ (0, _.jsx)(Me, {
			ad: E,
			session: t,
			initialCategory: E.category === "Fahrzeuge" ? "Fahrzeuge" : "Teile",
			close: () => D(null),
			created: () => {
				D(null), j(), n("Änderungen wurden zur Prüfung eingereicht.");
			}
		}),
		O && /* @__PURE__ */ (0, _.jsx)(Ne, {
			edit: () => {
				D(O), k(null);
			},
			ad: O,
			session: t,
			close: () => k(null),
			sold: () => {
				k(null), j(), n("Inserat gespeichert."), requestAnimationFrame(() => A.current?.focus());
			}
		})
	] });
}
function Me({ ad: e, session: t, initialCategory: n, close: r, created: i }) {
	let a = F(), [s, c] = (0, h.useState)(e?.title || ""), [l, u] = (0, h.useState)(e?.price || ""), [d, f] = (0, h.useState)(String(e?.details.offerType || "sale")), [p, m] = (0, h.useState)(String(e?.details.priceMode || "fixed")), [g, y] = (0, h.useState)(e?.description || ""), [b, x] = (0, h.useState)(e?.category || n), [S, C] = (0, h.useState)(Array.isArray(e?.details.parts) ? e.details.parts.join("\n") : ""), [w, T] = (0, h.useState)(e?.imageIds || []), [E, D] = (0, h.useState)([]), [O, k] = (0, h.useState)((e?.documents || []).map((e) => e.key)), [A, j] = (0, h.useState)([]), M = (0, h.useRef)(/* @__PURE__ */ new Set()), [N, ee] = (0, h.useState)(!1), [P, I] = (0, h.useState)(!1), te = (0, h.useRef)(!1), [ne, R] = (0, h.useState)(""), [z, B] = (0, h.useState)(""), [V, re] = (0, h.useState)(!1), ie = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		let e = M.current;
		return () => {
			e.forEach((e) => URL.revokeObjectURL(e));
		};
	}, []);
	function ae() {
		s || l || g || S || A.length || E.length ? re(!0) : r();
	}
	function oe(e) {
		if (B(""), w.length + A.length + e.length > 5) {
			B("Bitte höchstens 5 Bilder auswählen.");
			return;
		}
		if (e.some((e) => ![
			"image/jpeg",
			"image/png",
			"image/webp"
		].includes(e.type) || !e.size || e.size > 20 * 1024 * 1024)) {
			B("Bitte JPG, PNG oder WebP verwenden, maximal 20 MB pro Bild.");
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
	return /* @__PURE__ */ (0, _.jsx)(U, {
		title: o(e ? "Inserat bearbeiten" : "Inserat erstellen"),
		close: ae,
		busy: P,
		children: t ? !t?.canCreateAd || !t.marketplaceNonce ? /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "market-login",
			children: [/* @__PURE__ */ (0, _.jsx)("p", { children: "Mit Ihrem Mitgliedskonto können Sie ein Inserat veröffentlichen. Titel, Preis, Beschreibung und Bilder sind öffentlich sichtbar. Ihre E-Mail-Adresse sehen nur angemeldete Mitglieder." }), /* @__PURE__ */ (0, _.jsx)("a", {
				className: "market-primary",
				href: Oe,
				children: o("Mitglieder-Login")
			})]
		}) : /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "market-form",
			onSubmit: async (n) => {
				if (n.preventDefault(), te.current) return;
				if (d === "sale" && p !== "request" && (!/^\d{1,7}([.,]\d{1,2})?$/.test(l.trim()) || Number(l.replace(",", ".")) > 1e6)) {
					R("Bitte einen Preis von CHF 0 bis CHF 1’000’000 mit höchstens zwei Nachkommastellen eingeben.");
					return;
				}
				te.current = !0, I(!0), R("");
				let r = new FormData(n.currentTarget);
				r.set("offerType", d), r.set("priceMode", p), r.set("operation", e ? "edit" : "create"), e && (r.set("retainedDocumentKeys", JSON.stringify(O)), r.set("id", String(e.id)), r.set("retainedImageIds", JSON.stringify(w))), r.set("title", s), r.set("price", l), r.set("description", g), r.set("category", b), r.set("parts", S), r.set("models", JSON.stringify(r.getAll("models[]"))), r.delete("models[]"), A.forEach((e) => r.append("images[]", e.file)), E.forEach((e) => r.append("documents[]", e));
				try {
					await Ae(r, t.marketplaceNonce), i();
				} catch (e) {
					R(e instanceof Error ? e.message : "Speichern fehlgeschlagen."), requestAnimationFrame(() => ie.current?.focus());
				} finally {
					te.current = !1, I(!1);
				}
			},
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "market-form-intro",
					children: "In wenigen Schritten online. Pflichtfelder sind mit * markiert. Gesuche gehören ins Forum."
				}),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: P,
					children: [
						/* @__PURE__ */ (0, _.jsx)("legend", {
							className: "market-sr-only",
							children: "Angaben zum Inserat"
						}),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `market-dropzone ${N ? "is-dragging" : ""}`,
							onDragOver: (e) => {
								e.preventDefault(), P || ee(!0);
							},
							onDragLeave: () => ee(!1),
							onDrop: (e) => {
								e.preventDefault(), ee(!1), P || oe(Array.from(e.dataTransfer.files));
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
						z && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "market-error",
							role: "alert",
							children: z
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
										URL.revokeObjectURL(e.url), M.current.delete(e.url), j((t) => t.filter((t) => t.url !== e.url)), B("");
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
								children: (n === "Fahrzeuge" ? ["Fahrzeuge"] : Se.filter((e) => e !== "Fahrzeuge")).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
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
											B(o("Bitte höchstens drei PDFs mit je maximal 10 MB auswählen."));
											return;
										}
										B(""), D((e) => [...e, ...t]);
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
				ne && /* @__PURE__ */ (0, _.jsx)("p", {
					ref: ie,
					tabIndex: -1,
					className: "market-error",
					role: "alert",
					children: ne
				}),
				V ? /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-discard",
					children: [
						/* @__PURE__ */ (0, _.jsx)("p", { children: "Ungespeichertes Inserat verwerfen?" }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							type: "button",
							onClick: () => re(!1),
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
						onClick: ae,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						type: "submit",
						disabled: P,
						children: P ? "Wird eingereicht …" : "Zur Prüfung einreichen"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: "Anmeldung wird geprüft …"
		})
	});
}
function Ne({ ad: e, session: t, close: n, sold: r, edit: i }) {
	let [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(!1);
	return /* @__PURE__ */ (0, _.jsxs)(U, {
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
				children: [/* @__PURE__ */ (0, _.jsxs)("span", { children: [e.category, e.sold ? " · Verkauft" : ""] }), /* @__PURE__ */ (0, _.jsx)("strong", { children: we(e) })]
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
			e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(he, { html: e.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", {
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
				href: Oe,
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
							i.set("operation", n), i.set("id", String(e.id)), await Ae(i, t?.marketplaceNonce || ""), r();
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
								await Ae(n, t?.marketplaceNonce || ""), r();
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
						await Ae(r, t?.marketplaceNonce || await ke({ operation: "config" }).then((e) => e.nonce) || ""), l(!0);
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
var Pe = {
	information: "Details",
	scheduled: "Bald offen",
	open: "Anmelden",
	closed: "Geschlossen",
	full: "Ausgebucht",
	waiting: "Warteliste"
}, Fe = (e) => e ? new Date(e).toLocaleDateString("de-CH") : "–";
function Ie({ event: e, memberAccess: t }) {
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
function Le({ events: e, eventsState: t, retryEvents: n, openEvent: r, memberAccess: i }) {
	let { text: a } = me(), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)([]), [d, f] = (0, h.useState)(""), [p, m] = (0, h.useState)(!0), [g, v] = (0, h.useState)(0);
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
							children: Fe(e.startAt)
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
							children: e.region?.name || e.scope?.name.replace("Club-Anlässe", "Clubanlässe") || "Swiss TR-Club"
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Ort",
							children: e.location || "–"
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Plätze",
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
							children: Fe(e.registrationCloseAt)
						}),
						/* @__PURE__ */ (0, _.jsx)("td", {
							"data-label": "Teilnehmende",
							children: /* @__PURE__ */ (0, _.jsx)(Ie, {
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
								children: e.externalRegistrationUrl ? "Extern anmelden ↗" : Pe[e.registrationStatus]
							}) : /* @__PURE__ */ (0, _.jsx)("button", {
								className: "agenda-status",
								onClick: () => r(e),
								children: t ? "Rückblick" : Pe[e.registrationStatus]
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
				/* @__PURE__ */ (0, _.jsx)("p", { children: a("agenda.intro") })
			]
		}),
		/* @__PURE__ */ (0, _.jsx)(xe, { documentKey: "agenda" }),
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
						content_style: "body{font-family:Arial,sans-serif;font-size:18px;line-height:1.65;color:#13202b}img{max-width:100%;height:auto}p,h2,h3,h4,span.strc-tab{white-space:pre-wrap;tab-size:8}",
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
	strc_board_member: "Vorstandsmitglied",
	strc_developer: "Webmaster",
	strc_moderator: "Bisherige Bereichszuständigkeit"
}, Be = {
	open: "Mitgliederunterlagen",
	limited: "Zusätzlich: berechtigte Clubfunktionen",
	restricted: "Vorstandsunterlagen"
};
function Ve({ nonce: e }) {
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
											/* @__PURE__ */ (0, _.jsx)("strong", { children: o(ze[e.role] || t.roleOptions[e.role] || e.role) }),
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
														children: o(Be.open)
													}),
													/* @__PURE__ */ (0, _.jsx)("option", {
														value: "limited",
														children: o(Be.limited)
													}),
													(e.libraryAccess === "restricted" || e.role === "strc_board_member") && /* @__PURE__ */ (0, _.jsx)("option", {
														value: "restricted",
														children: o(Be.restricted)
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
							o(ze[e.role] || e.role),
							" | ",
							e.regions.length ? e.regions.map((e) => t.regions.find((t) => t.id === e)?.name || String(e)).join(", ") : o("Clubweit"),
							" | ",
							o(Be[e.role === "strc_board_member" ? "restricted" : e.libraryAccess])
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
function He({ nonce: e }) {
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
function Ue({ docKey: e, nonce: t, disabled: n, uploadState: r }) {
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
function We({ documentKey: e, values: t = {}, events: n, canEdit: r = !1 }) {
	let i = (e) => typeof t[e] == "string" ? t[e] : "", a = e === "triungsters", s = (e, t) => i(e).replace(/<[^>]+>/g, "").trim() ? /* @__PURE__ */ (0, _.jsx)(he, { html: i(e) }) : /* @__PURE__ */ (0, _.jsx)("p", {
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
					src: H(i("image")),
					alt: i("imageAlt") || i("title"),
					width: 1440,
					height: 800,
					style: ye(i("imageFrame"))
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
								src: H(i("contactImage")),
								alt: i("contactName") || o("Ansprechperson"),
								width: 160,
								height: 160,
								style: ye(i("contactImageFrame"), "cover")
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
								src: H(i("whatsappQr")),
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
					i("eventBody") && /* @__PURE__ */ (0, _.jsx)(he, { html: i("eventBody") }),
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
function Ge(e) {
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
function Ke({ html: e, photos: t }) {
	let n = Ge(e), r = /* @__PURE__ */ new Map();
	t.filter((e) => e.url).forEach((e, t) => {
		let i = Number(e.position ?? (t + 1) * 2), a = Math.min(n.length, Math.max(0, Number.isFinite(i) ? i : n.length));
		r.set(a, [...r.get(a) || [], e]);
	});
	let i = (e) => r.get(e)?.map((t, n) => /* @__PURE__ */ (0, _.jsxs)("figure", {
		className: "history-inline-photo",
		children: [/* @__PURE__ */ (0, _.jsx)(v, {
			src: H(t.url),
			alt: t.alt,
			width: 900,
			height: 600,
			style: ye(t.frame)
		}), t.alt && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: t.alt })]
	}, e + ":" + n));
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "history-story",
		children: [i(0), n.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "history-text-block",
			children: [/* @__PURE__ */ (0, _.jsx)(he, { html: e }), i(t + 1)]
		}, t))]
	});
}
function qe({ title: e, people: t, preview: n = !1, slots: r = 0 }) {
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
						src: H(e.image),
						alt: e.name ? `${o("Porträt von")} ${e.name}` : o("Porträt"),
						width: 400,
						height: 500,
						style: ye(e.frame, "cover")
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
var Je = [
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
], Ye = [
	["years", "Bauzeit"],
	["engine", "Motor"],
	["displacement", "Hubraum"],
	["power", "Leistung"],
	["transmission", "Getriebe"],
	["production", "Stückzahl"]
], Xe = (e, t) => typeof e[t] == "string" ? e[t] : "";
function Ze(e) {
	let t = se[e];
	return t ? Object.fromEntries(t.fields.map((e) => [e.key, e.default])) : {};
}
function Qe({ model: e }) {
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
function $e({ values: e, model: t, unpublished: n = !1, preview: r = !1 }) {
	let i = Xe(e, "image"), a = Xe(e, "exampleNote");
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "vehicle-detail-content",
		children: [
			r && /* @__PURE__ */ (0, _.jsx)("h2", { children: Xe(e, "title") || t }),
			(n || a) && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-example-note",
				children: n ? o("Beispielansicht · redaktioneller Inhalt noch nicht veröffentlicht") : a
			}),
			/* @__PURE__ */ (0, _.jsxs)("figure", {
				className: "vehicle-detail-cover",
				children: [
					i ? /* @__PURE__ */ (0, _.jsx)(v, {
						src: H(i),
						alt: Xe(e, "imageAlt") || t,
						width: 1e3,
						height: 600,
						style: ye(e.imageFrame)
					}) : /* @__PURE__ */ (0, _.jsx)(Qe, { model: t }),
					" ",
					Xe(e, "imageCaption") && /* @__PURE__ */ (0, _.jsx)("figcaption", { children: Xe(e, "imageCaption") })
				]
			}),
			Xe(e, "intro") && /* @__PURE__ */ (0, _.jsx)("p", {
				className: "vehicle-detail-intro",
				children: Xe(e, "intro")
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "vehicle-detail-layout",
				children: [/* @__PURE__ */ (0, _.jsxs)("article", {
					className: `vehicle-detail-copy${Xe(e, "bodySecondary").replace(/<[^>]*>/g, "").trim() ? " two-columns" : ""}`,
					children: [
						Xe(e, "body") && /* @__PURE__ */ (0, _.jsx)(he, { html: Xe(e, "body") }),
						" ",
						Xe(e, "bodySecondary") && /* @__PURE__ */ (0, _.jsx)(he, { html: Xe(e, "bodySecondary") })
					]
				}), /* @__PURE__ */ (0, _.jsxs)("aside", {
					className: "vehicle-factbox",
					children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: Xe(e, "factsTitle") || o("Fahrzeugdaten") }), typeof e.factsBody == "string" ? /* @__PURE__ */ (0, _.jsx)(he, { html: e.factsBody }) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dl", { children: Ye.filter(([t]) => Xe(e, t)).map(([t, n]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(n) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: Xe(e, t) })] }, t)) }), Xe(e, "factsNote") && /* @__PURE__ */ (0, _.jsx)(he, { html: Xe(e, "factsNote") })] })]
				})]
			})
		]
	});
}
function et({ compact: e = !1, initialSelected: t = "", canEdit: n = !1 }) {
	let { values: r, published: i, error: a, refresh: s } = me(), c = Je.find((e) => e.toLowerCase() === t.toLowerCase()) || "", [l, u] = (0, h.useState)(c);
	function d(e) {
		let t = "model-" + e.toLowerCase();
		return i[t] ? r[t] || {} : Ze(t);
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
			children: Je.map((t) => {
				let n = d(t);
				return /* @__PURE__ */ (0, _.jsxs)("a", {
					className: "vehicle-model-card",
					href: "#tr-modelle/" + t.toLowerCase(),
					"aria-haspopup": "dialog",
					onClick: (e) => f(e, t),
					children: [
						Xe(n, "image") ? /* @__PURE__ */ (0, _.jsx)("div", {
							className: "vehicle-card-image",
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								src: H(Xe(n, "image")),
								alt: Xe(n, "imageAlt") || t,
								width: 600,
								height: 360,
								style: ye(n.imageFrame)
							})
						}) : /* @__PURE__ */ (0, _.jsx)(Qe, { model: t }),
						/* @__PURE__ */ (0, _.jsx)("div", {
							className: "vehicle-card-caption",
							children: /* @__PURE__ */ (0, _.jsx)("strong", { children: Xe(n, "title") || t })
						}),
						!e && /* @__PURE__ */ (0, _.jsx)("p", { children: o(i["model-" + t.toLowerCase()] && !Xe(n, "exampleNote") ? "Porträt & Fahrzeugdaten" : "Beispielansicht · Bild und Daten folgen") })
					]
				}, t);
			})
		}),
		l && /* @__PURE__ */ (0, _.jsxs)(U, {
			title: Xe(d(l), "title") || l,
			close: p,
			children: [/* @__PURE__ */ (0, _.jsx)($e, {
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
function tt({ selected: e = "", canEdit: t = !1 }) {
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
		}), /* @__PURE__ */ (0, _.jsx)(et, {
			initialSelected: e,
			canEdit: t
		})]
	})] });
}
//#endregion
//#region app/components/ShopOperations.tsx
function nt({ nonce: e, close: t, saved: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)(!1), [c, l] = (0, h.useState)(""), u = (0, h.useRef)(crypto.randomUUID());
	function d(e, t, n) {
		i((r) => r.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}
	return /* @__PURE__ */ (0, _.jsx)(U, {
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
function rt({ nonce: e }) {
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
var it = (e, t, n) => new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: t,
	minimumFractionDigits: n,
	maximumFractionDigits: n
}).format(Number(e) / 10 ** n);
function at() {
	let [e, t] = (0, h.useState)(""), [n, r] = (0, h.useState)(!1), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)([]), [l, u] = (0, h.useState)(null), [d, f] = (0, h.useState)(""), [p, m] = (0, h.useState)(!0);
	return (0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_shop", { operation: "config" }, e.signal).then(async (t) => {
			if (e.signal.aborted) return;
			if (u(t), !t.storeReady) {
				m(!1);
				return;
			}
			let n = await fetch(`${y}/wp-json/wc/store/v1/products?per_page=20&orderby=popularity`, {
				signal: e.signal,
				cache: "no-store"
			});
			if (!n.ok) throw Error("Shop-Sortiment ist momentan nicht erreichbar.");
			c(await n.json());
		}).catch((t) => {
			e.signal.aborted || f(t instanceof Error ? t.message : "Shop konnte nicht geladen werden.");
		}).finally(() => {
			e.signal.aborted || m(!1);
		}), () => e.abort();
	}, []), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "form-section shop-catalog",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "shop-catalog-heading",
				children: [/* @__PURE__ */ (0, _.jsxs)("div", { children: [
					/* @__PURE__ */ (0, _.jsx)("p", {
						className: "eyebrow",
						children: "Swiss TR-Club · Shop"
					}),
					/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Das Sortiment") }),
					/* @__PURE__ */ (0, _.jsx)("p", { children: o("Zubehör und ausgewählte Artikel.") })
				] }), /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "shop-catalog-actions",
					children: [l?.canManage && l.productEditorUrl && /* @__PURE__ */ (0, _.jsxs)("button", {
						className: "market-primary",
						onClick: () => r(!0),
						children: [o("Artikel erstellen"), " ＋"]
					}), l?.checkoutReady && l.cartUrl && /* @__PURE__ */ (0, _.jsx)("a", {
						className: "club-secondary",
						href: l.cartUrl,
						children: o("Zum Warenkorb →")
					})]
				})]
			}),
			d ? /* @__PURE__ */ (0, _.jsx)("p", {
				className: "collection-state error",
				role: "alert",
				children: d
			}) : p ? /* @__PURE__ */ (0, _.jsx)("p", {
				className: "collection-state",
				role: "status",
				children: o("Sortiment wird geladen …")
			}) : l?.storeReady ? s.length ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("div", {
				className: "shop-product-grid",
				children: s.map((e) => {
					let t = e.attributes.find((e) => /size|groesse|grösse/i.test(`${e.name} ${e.slug}`)), n = e.attributes.find((e) => /colou?r|farbe/i.test(`${e.name} ${e.slug}`)), r = [t, n].filter((e) => !!e).flatMap((e) => e.terms.map((e) => e.name)), i = e.permalink, a = l.checkoutReady ? e.is_in_stock ? "Auswählen & bestellen →" : "Ausverkauft" : "Checkout wird eingerichtet";
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
								/* @__PURE__ */ (0, _.jsx)("strong", { children: it(e.prices.price, e.prices.currency_code, e.prices.currency_minor_unit) }),
								r.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
									className: "shop-product-variants",
									children: [t && `Grössen: ${t.terms.map((e) => e.name).join(", ")}`, n && `Farben: ${n.terms.map((e) => e.name).join(", ")}`].filter(Boolean).join(" · ")
								}),
								l.checkoutReady && e.is_in_stock ? /* @__PURE__ */ (0, _.jsx)("a", {
									className: "market-primary shop-product-link",
									href: i,
									children: o(a)
								}) : l.isMember ? /* @__PURE__ */ (0, _.jsx)("span", {
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
			}), !l.zahlsReady && /* @__PURE__ */ (0, _.jsx)("p", {
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
			l?.canInspect && /* @__PURE__ */ (0, _.jsx)(ot, {}),
			l?.canManage && l.ordersUrl && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: l.ordersUrl,
				children: o("Bestellungen und Lager verwalten →")
			}) }),
			l?.isMember && l.myOrdersUrl && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
				href: l.myOrdersUrl,
				children: o("Meine Bestellungen →")
			}) }),
			i && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: i
			}),
			n && l && /* @__PURE__ */ (0, _.jsx)(nt, {
				nonce: l.nonce || "",
				close: () => r(!1),
				saved: (e, n) => {
					a(e), t(n), r(!1);
				}
			}),
			e && /* @__PURE__ */ (0, _.jsx)("a", {
				href: e,
				children: o("Artikel prüfen und veröffentlichen")
			}),
			l?.canManage && /* @__PURE__ */ (0, _.jsx)(rt, { nonce: l.nonce || "" })
		]
	});
}
function ot() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(1), [i, a] = (0, h.useState)(1), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_shop", {
			operation: "reports",
			page: String(n),
			stockPage: String(i),
			event: s
		}, e.signal).then(t).catch((t) => {
			e.signal.aborted || u(t.message);
		}), () => e.abort();
	}, [
		n,
		i,
		s
	]);
	function d() {
		if (!e) return;
		let t = (e) => "\"" + e.replace(/"/g, "\"\"").replace(/^[=+@\-\t\r]/, "'") + "\"", r = [[
			"Bestellung",
			"Datum",
			"Kunde",
			"Status",
			"Betrag",
			"Währung",
			"Zahlungsart",
			"Abholung"
		], ...e.orders.map((e) => [
			e.number,
			e.date,
			e.customer,
			e.status,
			e.total,
			e.currency,
			e.paymentMethod,
			e.pickupEvent
		])], i = URL.createObjectURL(new Blob(["﻿" + r.map((e) => e.map(t).join(";")).join("\r\n")], { type: "text/csv;charset=utf-8" })), a = document.createElement("a");
		a.href = i, a.download = "tr-shop-bestellungen-seite-" + n + ".csv", a.click(), URL.revokeObjectURL(i);
	}
	return /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Bestellungen und Lagerbestand") }),
			l && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: l
			}),
			e && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Abholung an Veranstaltung"), /* @__PURE__ */ (0, _.jsxs)("select", {
					value: s,
					onChange: (e) => {
						c(e.target.value), r(1);
					},
					children: [/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: o("Alle")
					}), e.events.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
						value: e.id,
						children: e.title
					}, e.id))]
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("p", { children: [
					e.total,
					" ",
					o("Bestellungen")
				] }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: d,
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
					] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: e.orders.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
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
				/* @__PURE__ */ (0, _.jsx)(Bt, {
					page: n,
					pages: e.pages,
					change: r
				}),
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Lagerbestand") }),
				/* @__PURE__ */ (0, _.jsx)("div", {
					className: "table-scroll",
					children: /* @__PURE__ */ (0, _.jsxs)("table", { children: [/* @__PURE__ */ (0, _.jsx)("thead", { children: /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Artikel") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: "SKU" }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Bestand") }),
						/* @__PURE__ */ (0, _.jsx)("th", { children: o("Status") })
					] }) }), /* @__PURE__ */ (0, _.jsx)("tbody", { children: e.stock.map((e) => /* @__PURE__ */ (0, _.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.name }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.sku }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: e.quantity ?? "–" }),
						/* @__PURE__ */ (0, _.jsx)("td", { children: o(e.stockStatus) })
					] }, e.id)) })] })
				}),
				/* @__PURE__ */ (0, _.jsx)(Bt, {
					page: i,
					pages: e.stockPages,
					change: a
				})
			] })
		]
	});
}
//#endregion
//#region app/components/MembershipApplication.tsx
function st() {
	let { text: e } = me(), { language: t } = n(), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)("single"), [f, p] = (0, h.useState)([ne()]), [m, g] = (0, h.useState)(!1), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(""), S = (0, h.useRef)(!1), T = (0, h.useRef)(""), E = (0, h.useRef)(null);
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
		if (!f.some((e) => te.includes(e.model))) {
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
			/* @__PURE__ */ (0, _.jsx)(ge, { id: "membership.thankYouText" }),
			/* @__PURE__ */ (0, _.jsx)(R, { message: b }),
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
							/* @__PURE__ */ (0, _.jsx)(he, { html: e("membership.fees", se.membership.fields.find((e) => e.key === "fees")?.default || "") }),
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
							/* @__PURE__ */ (0, _.jsx)(z, {
								title: u === "couple" ? "Hauptmitglied" : "Persönliche Angaben",
								children: /* @__PURE__ */ (0, _.jsx)(V, {
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
								}), /* @__PURE__ */ (0, _.jsxs)(z, {
									title: "Co-Pilot / zweite Person",
									children: [
										/* @__PURE__ */ (0, _.jsx)("p", { children: o("Jede Person erhält nach der Aufnahme eine eigene Mitgliedsnummer und ein eigenes Konto. Bitte zwei unterschiedliche E-Mail-Adressen verwenden.") }),
										/* @__PURE__ */ (0, _.jsx)(V, {
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
							/* @__PURE__ */ (0, _.jsxs)(z, {
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
							/* @__PURE__ */ (0, _.jsxs)(z, {
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
											/* @__PURE__ */ (0, _.jsx)(re, {
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
										onClick: () => p((e) => [...e, ne()]),
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
					/* @__PURE__ */ (0, _.jsx)(R, { error: v }),
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
		children: [/* @__PURE__ */ (0, _.jsx)(R, { error: a }), a ? /* @__PURE__ */ (0, _.jsx)("button", {
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
function ct(e) {
	return e in se && "template" in se[e];
}
function lt({ href: e, title: t, text: n }) {
	return /* @__PURE__ */ (0, _.jsxs)("a", {
		className: "landing-card",
		href: e,
		children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: t }), /* @__PURE__ */ (0, _.jsx)("p", { children: n })]
	});
}
function ut({ canEdit: e = !1, memberAccess: t = !1 }) {
	let { text: n } = me();
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
			children: [/* @__PURE__ */ (0, _.jsx)(xe, {
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
					/* @__PURE__ */ (0, _.jsx)(ge, { id: "club.joinText" }),
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
				].map(([e, t, r]) => /* @__PURE__ */ (0, _.jsx)(lt, {
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
					children: /* @__PURE__ */ (0, _.jsx)(lt, {
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
				/* @__PURE__ */ (0, _.jsx)(et, {
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
function dt() {
	let { text: e } = me();
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
				children: /* @__PURE__ */ (0, _.jsx)(ge, { id: "club.body" })
			}), /* @__PURE__ */ (0, _.jsx)("aside", {
				className: "mission-picture",
				children: e("club.missionImage") ? /* @__PURE__ */ (0, _.jsx)(v, {
					src: H(e("club.missionImage")),
					alt: e("club.missionImageAlt") || o("Clubleben im Swiss TR-Club"),
					width: 600,
					height: 800,
					style: ye(e("club.missionImageFrame"))
				}) : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "static-image-placeholder",
					children: o("Ein Bild aus unserem Clubleben folgt.")
				})
			})]
		})]
	})] });
}
function ft({ documentKey: e, canEdit: t = !1 }) {
	let { values: n, published: r, loading: i, error: a, refresh: s } = me(), c = se[e];
	return !c || !ct(e) ? /* @__PURE__ */ (0, _.jsxs)("section", {
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
		}), /* @__PURE__ */ (0, _.jsx)(at, {})]
	})] }) : e === "triungsters" && !i && !a ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("section", {
		className: "page-hero regional-hero",
		style: {
			backgroundImage: `linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${_e("triungsters")}")`,
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
		children: /* @__PURE__ */ (0, _.jsx)(We, {
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
			e === "membership" && /* @__PURE__ */ (0, _.jsx)(st, {}),
			e === "shop" && /* @__PURE__ */ (0, _.jsx)(at, {})
		]
	})] }) : /* @__PURE__ */ (0, _.jsx)(pt, {
		documentKey: e,
		values: n[e]
	});
}
function pt({ documentKey: e, values: t, preview: n = !1 }) {
	let r = (e) => typeof t[e] == "string" ? t[e] : "", i = e.startsWith("model-"), a = (e) => !!(e.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim() || /<img\b/i.test(e));
	if (e === "triungsters") return /* @__PURE__ */ (0, _.jsx)(We, {
		documentKey: e,
		values: t,
		canEdit: !0
	});
	if (i) return /* @__PURE__ */ (0, _.jsx)($e, {
		values: t,
		model: r("title") || e.replace("model-", "").toUpperCase(),
		preview: n
	});
	let s = a(r("bodySecondary")), c = e === "history", l = c && Array.isArray(t.photos) ? t.photos : [], u = Ye.filter(([e]) => r(e));
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
				e === "organisation" && r("lead") && /* @__PURE__ */ (0, _.jsx)(he, {
					className: "organisation-lead",
					html: r("lead")
				}),
				!c && (r("image") ? /* @__PURE__ */ (0, _.jsxs)("figure", {
					className: "static-cover",
					children: [/* @__PURE__ */ (0, _.jsx)(v, {
						src: H(r("image")),
						alt: r("imageAlt"),
						width: 1440,
						height: 800,
						style: ye(r("imageFrame"))
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
									src: H(r(e)),
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
							children: [/* @__PURE__ */ (0, _.jsx)("div", { children: a(r("body")) ? c ? /* @__PURE__ */ (0, _.jsx)(Ke, {
								html: r("body"),
								photos: l
							}) : /* @__PURE__ */ (0, _.jsx)(he, { html: r("body") }) : n && /* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Hier steht später der Text der ersten Spalte.")
							}) }), s && /* @__PURE__ */ (0, _.jsx)(he, { html: r("bodySecondary") })]
						}),
						i && (u.length > 0 || n) && /* @__PURE__ */ (0, _.jsxs)("aside", {
							className: "landing-sidebar vehicle-facts",
							children: [
								/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Fahrzeugdaten") }),
								/* @__PURE__ */ (0, _.jsx)("dl", { children: (n ? Ye : u).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o(t) }), /* @__PURE__ */ (0, _.jsx)("dd", { children: r(e) || o("Noch ergänzen") })] }, e)) }),
								r("factsNote") && /* @__PURE__ */ (0, _.jsx)(he, { html: r("factsNote") })
							]
						}),
						!i && (r("sidebar") || n) && /* @__PURE__ */ (0, _.jsxs)("aside", {
							className: "landing-sidebar",
							children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: r("sidebarTitle") || o("Auf einen Blick") }), r("sidebar") ? /* @__PURE__ */ (0, _.jsx)(he, { html: r("sidebar") }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Platz für Kontakte und weitere Informationen.") })]
						})
					]
				}),
				e === "organisation" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: ["board", "functions"].map((e) => /* @__PURE__ */ (0, _.jsx)(qe, {
					title: r(e + "Title"),
					people: Array.isArray(t[e + "Portraits"]) ? t[e + "Portraits"] : [],
					preview: n,
					slots: e === "board" ? 7 : 5
				}, e)) }),
				e === "membership" && !n && /* @__PURE__ */ (0, _.jsx)(st, {}),
				e === "shop" && !n && /* @__PURE__ */ (0, _.jsx)(at, {})
			]
		})]
	});
}
//#endregion
//#region app/components/EditorialDashboard.tsx
var mt = "strc_editorial", ht = {
	news: "Neuigkeiten",
	forum: "Forum",
	gallery: "Galerie",
	library: "Bibliothek",
	market: "Marktplatz"
};
function gt({ nonce: e, canManageEvents: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(() => decodeURIComponent(window.location.hash.split("/")[1] || "")), [l, u] = (0, h.useState)(null), [d, f] = (0, h.useState)(0), { refresh: p } = me();
	(0, h.useEffect)(() => {
		let e = () => {
			window.location.hash.split("/")[0] === "#redaktion" && (u(null), a(""), c(decodeURIComponent(window.location.hash.split("/")[1] || "")));
		};
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []), (0, h.useEffect)(() => {
		let e = new AbortController();
		return C(mt, {}, e.signal).then(r).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [d]), (0, h.useEffect)(() => {
		if (!s || s.startsWith("posts:") || s === "people" || s === "highlights") return;
		let e = new AbortController();
		return C(mt, {
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
						n.areas.filter((e) => ht[e]).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "editorial-card",
							onClick: () => m("posts:" + e),
							children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: ht[e] }), /* @__PURE__ */ (0, _.jsx)("span", { children: "Beiträge bearbeiten und veröffentlichen" })]
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
			s === "highlights" ? /* @__PURE__ */ (0, _.jsx)(He, { nonce: e }) : s === "people" ? /* @__PURE__ */ (0, _.jsx)(Ve, { nonce: e }) : s.startsWith("posts:") ? /* @__PURE__ */ (0, _.jsx)(bt, {
				kind: s.slice(6),
				nonce: e,
				changed: p
			}, s) : s && (l ? /* @__PURE__ */ (0, _.jsx)(_t, {
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
function _t({ doc: e, nonce: t, saved: r }) {
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
				let i = await w(mt, t, T({
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
				S((await w(mt, t, T({
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
			/* @__PURE__ */ (0, _.jsx)(Ue, {
				docKey: e.key,
				nonce: t,
				disabled: p,
				uploadState: f
			}),
			/* @__PURE__ */ (0, _.jsx)("fieldset", {
				disabled: p,
				children: e.schema.fields.filter((e) => !e.legacy && !e.translationOf).map((n) => /* @__PURE__ */ (0, _.jsx)(vt, {
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
					children: e.schema.fields.filter((e) => e.translationOf).map((n) => /* @__PURE__ */ (0, _.jsx)(vt, {
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
				children: [/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Inhaltsvorschau") }), e.key.startsWith("region-") ? /* @__PURE__ */ (0, _.jsx)(We, {
					documentKey: e.key,
					values: pe(x, i),
					canEdit: !0
				}) : ct(e.key) ? /* @__PURE__ */ (0, _.jsx)(pt, {
					documentKey: e.key,
					values: pe(x, i),
					preview: !0
				}) : e.schema.fields.filter((e) => !e.legacy && e.type !== "imageFrame").map((e) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: e.label }), e.type === "rich" ? /* @__PURE__ */ (0, _.jsx)(he, { html: String(x[e.key]) }) : e.type === "text" || e.type === "textarea" || e.type === "url" || e.type === "imageFrame" ? /* @__PURE__ */ (0, _.jsx)("p", { children: String(x[e.key]) }) : e.type === "image" ? x[e.key] ? /* @__PURE__ */ (0, _.jsx)(v, {
					src: H(String(x[e.key])),
					width: 200,
					height: 160,
					alt: e.label
				}) : null : /* @__PURE__ */ (0, _.jsx)("div", {
					className: "editorial-image-list",
					children: x[e.key].map((e, t) => /* @__PURE__ */ (0, _.jsx)(v, {
						src: H(e.image || e.url),
						alt: e.alt || e.name,
						width: 180,
						height: 120
					}, t))
				})] }, e.key))]
			})
		]
	});
}
function vt({ field: e, imageUrl: t = "", value: n, onChange: r, nonce: i, docKey: a, disabled: s = !1, uploadState: c }) {
	if (e.type === "textarea") return /* @__PURE__ */ (0, _.jsxs)("label", { children: [e.label, /* @__PURE__ */ (0, _.jsx)("textarea", {
		rows: 2,
		value: String(n ?? "").replace(/\s*\|\s*/g, "\n"),
		onChange: (e) => r(e.target.value)
	})] });
	if (e.type === "imageFrame") return /* @__PURE__ */ (0, _.jsx)(be, {
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
	if (e.type === "image") return /* @__PURE__ */ (0, _.jsx)(yt, {
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
						/* @__PURE__ */ (0, _.jsx)(yt, {
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
						/* @__PURE__ */ (0, _.jsx)(yt, {
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
function yt({ label: e, value: t, changed: n, nonce: r, target: i, uploadState: a, uploadAction: s = mt, frame: c, frameChanged: l, portrait: u = !1 }) {
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
				src: H(t),
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
			t && l && /* @__PURE__ */ (0, _.jsx)(be, {
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
function bt({ kind: e, nonce: t, changed: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(1), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)(null), [v, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(!0);
	return (0, h.useEffect)(() => {
		let t = new AbortController(), n = setTimeout(() => {
			C(mt, {
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
	]), m ? /* @__PURE__ */ (0, _.jsx)(xt, {
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
		/* @__PURE__ */ (0, _.jsxs)("h2", { children: [ht[e], " verwalten"] }),
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
		/* @__PURE__ */ (0, _.jsx)(Bt, {
			page: c,
			pages: a,
			change: l
		})
	] });
}
function xt({ item: e, kind: t, nonce: n, saved: r, back: i }) {
	let [a, s] = (0, h.useState)(e), [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)("");
	async function f(e) {
		e.preventDefault(), l(!0), d("");
		try {
			await w(mt, n, T({
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
						/* @__PURE__ */ (0, _.jsx)(yt, {
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
var St = {
	reserved: "Reserviert",
	confirmed: "Bestätigt",
	waiting: "Warteliste",
	pending_payment: "Reserviert",
	expired: "Abgelaufen",
	cancelled: "Abgemeldet",
	payment_review: "Zahlung prüfen"
}, Ct = {
	invoice: "Rechnung",
	twint: "TWINT",
	card: "Kreditkarte",
	none: "Keine Zahlung"
};
function wt({ eventId: e }) {
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
			"Betrag CHF",
			"Anmeldestatus",
			"Zahlungsart",
			"Zahlungsstand"
		], ...t.rows.map((e) => [
			e.id,
			e.name,
			e.participants,
			(e.total / 100).toFixed(2),
			St[e.state] || e.state,
			Ct[e.paymentMethod] || e.paymentMethod,
			Dt[e.paymentStatus] || e.paymentStatus
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
		children: [/* @__PURE__ */ (0, _.jsx)(R, {
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
			t?.rows.map((n) => /* @__PURE__ */ (0, _.jsxs)("article", {
				className: "form-review",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("h3", { children: [
						n.name,
						" · ",
						St[n.state] || n.state
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
						Ct[n.paymentMethod] || n.paymentMethod,
						" · ",
						Dt[n.paymentStatus] || n.paymentStatus
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
										children: Dt[e]
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
							Dt[e.to],
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
var Tt = "strc_registration", Et = (e) => new Intl.NumberFormat("de-CH", {
	style: "currency",
	currency: "CHF"
}).format(e / 100), Dt = {
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
}, Ot = {
	invoice: "Rechnung",
	twint: "TWINT",
	card: "Kreditkarte",
	none: "Keine Zahlung"
}, kt = {
	reserved: "Teilnahme reserviert – Zahlung ausstehend",
	confirmed: "Teilnahme bestätigt",
	waiting: "Warteliste",
	cancelled: "Abgemeldet",
	pending_payment: "Plätze reserviert – Zahlung ausstehend",
	expired: "Reservierung abgelaufen",
	payment_review: "Zahlung wird durch die Kasse geprüft"
};
function At({ event: e, localDate: t, nonce: n, eventId: r, uploadState: i, organisers: a }) {
	let [s, c] = (0, h.useState)(e?.registrationRequired || !1), l = e?.registration, [u, d] = (0, h.useState)({
		programImage: l?.programImage || "",
		agendaImage: l?.agendaImage || ""
	});
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)(z, {
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
			}), /* @__PURE__ */ (0, _.jsx)(yt, {
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
		/* @__PURE__ */ (0, _.jsx)(z, {
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
		/* @__PURE__ */ (0, _.jsxs)(z, {
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
		/* @__PURE__ */ (0, _.jsxs)(z, {
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
		/* @__PURE__ */ (0, _.jsxs)(z, {
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
function jt({ value: e }) {
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
			/* @__PURE__ */ (0, _.jsx)("dd", { children: /* @__PURE__ */ (0, _.jsx)("strong", { children: Et(e.total) }) }),
			e.notes && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: o("Bemerkungen") }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.notes })] })
		] })]
	});
}
function Mt({ eventId: e, memberAccess: t, hideTitle: n = !1 }) {
	let [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(0), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)([]), [v, y] = (0, h.useState)(!1), [b, x] = (0, h.useState)(null), [S, E] = (0, h.useState)("invoice"), [D, O] = (0, h.useState)(!1), [k, A] = (0, h.useState)(!1), j = (0, h.useRef)(null), M = (0, h.useRef)(!1);
	if ((0, h.useEffect)(() => {
		if (!t) return;
		let n = new AbortController();
		return C(Tt, {
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
	async function N(t) {
		if (!r || M.current) return;
		M.current = !0, p(!0), l("");
		let n = new FormData(t);
		n.set("operation", b ? "submit" : "preview"), n.set("eventId", String(e)), n.set("paymentMethod", S), n.set("guests", JSON.stringify(m)), n.set("copilot", v ? "1" : "0");
		let a = 1 + +!!v + m.length;
		n.set("selections", JSON.stringify(Array.from({ length: a }, (e, t) => ({ meal: String(n.get(`meal_${t}`) || "") })))), k && r.registration && (n.set("id", String(r.registration.id)), n.set("revision", r.registration.revision)), b && n.set("reviewToken", b.reviewToken);
		try {
			if (b) {
				let e = await w(Tt, r.nonce, n);
				i({
					...r,
					registration: e.registration
				}), d(e.message), x(null), A(!1);
			} else x(await w(Tt, r.nonce, n));
		} catch (e) {
			l(e.message);
		} finally {
			M.current = !1, p(!1);
		}
	}
	async function ee() {
		if (!(!r?.registration || M.current)) {
			M.current = !0, p(!0), l("");
			try {
				d((await w(Tt, r.nonce, T({
					operation: "cancel",
					eventId: String(e),
					id: String(r.registration.id),
					revision: r.registration.revision
				}))).message), s((e) => e + 1), O(!1);
			} catch (e) {
				l(e.message);
			} finally {
				M.current = !1, p(!1);
			}
		}
	}
	async function P() {
		if (!(!r?.registration || f)) {
			p(!0), l("");
			try {
				let t = await w(Tt, r.nonce, T({
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
	let F = r?.registration, I = r ? [
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
					children: ((b?.preview.total || F?.total || r.settings.fee) > 0 ? [
						"Anmeldung",
						"Angaben prüfen",
						"Zahlung",
						"Bestätigung"
					] : [
						"Anmeldung",
						"Angaben prüfen",
						"Bestätigung"
					]).map((e, t, n) => /* @__PURE__ */ (0, _.jsxs)("li", {
						"aria-current": t === (F && !["cancelled", "expired"].includes(F.state) && !k ? ["pending_payment", "reserved"].includes(F.state) ? 2 : n.length - 1 : +!!b) ? "step" : void 0,
						children: [/* @__PURE__ */ (0, _.jsx)("span", { children: t + 1 }), o(e)]
					}, e))
				}),
				r.descriptionHtml && /* @__PURE__ */ (0, _.jsx)("section", {
					className: "event-announcement",
					"aria-label": "Eventausschreibung",
					children: /* @__PURE__ */ (0, _.jsx)(he, { html: r.descriptionHtml })
				})
			] }),
			/* @__PURE__ */ (0, _.jsx)(R, {
				error: c,
				message: u
			}),
			r ? F && !["cancelled", "expired"].includes(F.state) && !k ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o(kt[F.state]) }),
				/* @__PURE__ */ (0, _.jsx)(jt, { value: F }),
				F.total > 0 && /* @__PURE__ */ (0, _.jsx)("p", { children: F.state === "waiting" ? "Auf der Warteliste wird noch keine Zahlung fällig." : `${o(Ot[F.paymentMethod] || "Zahlung")} · ${o(Dt[F.paymentStatus] || F.paymentStatus)}` }),
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
								onClick: () => void P(),
								children: o("Stattdessen auf Rechnung anmelden")
							})]
						}),
						/* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Ein Abbruch ist keine Zahlungsbestätigung. Bis zum Ablauf kannst du denselben Zahlungslink erneut öffnen."
						})
					]
				}),
				F.state === "confirmed" && /* @__PURE__ */ (0, _.jsx)(Pt, { value: F }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: F.conditions }),
				r.open && !["pending_payment", "payment_review"].includes(F.state) && /* @__PURE__ */ (0, _.jsx)("button", {
					className: "club-secondary",
					onClick: () => {
						A(!0), g(F.participants.filter((e) => e.kind === "guest").map((e) => ({
							firstName: e.firstName || e.name,
							lastName: e.lastName || "",
							memberNumber: e.memberNumber || "",
							isMember: !!e.memberNumber
						}))), y(F.participants.some((e) => e.kind === "copilot"));
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
							onClick: () => void ee(),
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
				ref: j,
				className: "club-form",
				onSubmit: (e) => {
					e.preventDefault(), N(e.currentTarget);
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
							m.map((e, t) => /* @__PURE__ */ (0, _.jsxs)(z, {
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
								defaultValue: k ? String(F?.vehicle?.id || (L.includes(F?.vehicle?.model || "") ? "model:" + F?.vehicle?.model : {
									"Modernes Fahrzeug": "modern",
									"Ohne Fahrzeug": "none"
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
							Object.keys(r.meals).length > 0 && I.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [
								"Essen: ",
								e || `Gast ${t}`,
								" *",
								/* @__PURE__ */ (0, _.jsxs)("select", {
									name: `meal_${t}`,
									required: !0,
									defaultValue: k && F?.participants[t]?.meal || "",
									children: [/* @__PURE__ */ (0, _.jsx)("option", {
										value: "",
										children: o("Bitte wählen")
									}), Object.entries(r.meals).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
										value: e,
										children: [
											e,
											" · ",
											Et(t)
										]
									}, e))]
								})
							] }, t)),
							Object.keys(r.rooms).length > 0 && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Unterkunft *"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "room",
								required: !0,
								defaultValue: k && F?.room || "",
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Bitte wählen")
								}), Object.entries(r.rooms).map(([e, t]) => /* @__PURE__ */ (0, _.jsxs)("option", {
									value: e,
									children: [
										e,
										" · ",
										Et(t)
									]
								}, e))]
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bemerkungen (optional)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								name: "notes",
								rows: 3,
								maxLength: 1e3,
								defaultValue: k && F?.notes || ""
							})] }),
							/* @__PURE__ */ (0, _.jsx)("p", {
								className: "club-hint",
								children: o("Bitte nur veranstaltungsrelevante Angaben eintragen. Gäste erhalten keine Mitgliedschaft.")
							})
						]
					}),
					b && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)(jt, { value: b.preview }),
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
						b.preview.total > 0 && !k && /* @__PURE__ */ (0, _.jsxs)(z, {
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
									}), o(Ot[e])]
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
function Nt({ eventId: e }) {
	return /* @__PURE__ */ (0, _.jsx)(wt, { eventId: e });
}
function Pt({ value: e }) {
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
var Ft = "strc_events";
function It(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : (t.setMinutes(t.getMinutes() - t.getTimezoneOffset()), t.toISOString().slice(0, 16));
}
function Lt({ session: e, changed: t }) {
	let [n, r] = (0, h.useState)(null), [i, a] = (0, h.useState)({
		events: [],
		pages: 0
	}), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(1), [p, m] = (0, h.useState)(0), [g, v] = (0, h.useState)(!0), [y, b] = (0, h.useState)(""), [x, S] = (0, h.useState)(void 0), [E, D] = (0, h.useState)(null), [O, k] = (0, h.useState)(null), [A, j] = (0, h.useState)(!1), [M, N] = (0, h.useState)(!1), [ee, P] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController(), t = setTimeout(() => {
			v(!0), b(""), Promise.all([C(Ft, { operation: "settings" }, e.signal), C(Ft, {
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
		return C(Ft, {
			operation: "get",
			id: String(e)
		}, t.signal).then(S).catch((e) => {
			t.signal.aborted || b(e.message);
		}), () => t.abort();
	}, []);
	function F(e) {
		P(e), v(!0), m((e) => e + 1), t();
	}
	async function I(t, n) {
		j(!0), b("");
		try {
			await w(Ft, e.eventsNonce || "", T({
				operation: n,
				id: String(t.id)
			})), D(null), F(n === "trash" ? "Termin ins Archiv verschoben." : "Termin aus dem Archiv wiederhergestellt.");
		} catch (e) {
			b(e.message);
		} finally {
			j(!1);
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
				/* @__PURE__ */ (0, _.jsx)("h1", { children: n?.global ? "Alle Regionen. Eine Agenda." : "Termine Ihrer Region." }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: "Termine erstellen, bearbeiten und veröffentlichen." })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content club-management",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-toolbar",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: !n,
						onClick: () => S(null),
						children: o("Termin erstellen")
					}), e.canAssignRegions && /* @__PURE__ */ (0, _.jsx)("button", {
						className: "club-secondary",
						onClick: () => N((e) => !e),
						children: M ? "Regionsrechte schliessen" : "Regionale Moderatoren verwalten"
					})]
				}),
				M && n && /* @__PURE__ */ (0, _.jsx)(zt, {
					regions: n.regions,
					nonce: e.eventsNonce || ""
				}),
				ee && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					className: "club-notice",
					children: ee
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
								disabled: A,
								onClick: () => void I(e, "restore"),
								children: o("Wiederherstellen")
							}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
								/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									onClick: () => S(e),
									children: o("Bearbeiten")
								}),
								e.registrationRequired && e.status === "publish" && /* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									onClick: () => k(e),
									children: "Anmeldungen"
								}),
								/* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-text-button",
									onClick: () => D(e),
									children: "Archivieren"
								})
							] })
						})] }, e.id))
					}),
					/* @__PURE__ */ (0, _.jsx)(Bt, {
						page: d,
						pages: i.pages,
						change: f
					})
				] })
			]
		}),
		O && /* @__PURE__ */ (0, _.jsx)(U, {
			title: `Anmeldungen: ${O.title}`,
			close: () => k(null),
			children: /* @__PURE__ */ (0, _.jsx)(Nt, { eventId: O.id })
		}),
		x !== void 0 && n && /* @__PURE__ */ (0, _.jsx)(Rt, {
			event: x,
			settings: n,
			nonce: e.eventsNonce || "",
			close: () => S(void 0),
			saved: () => {
				S(void 0), F("Termin gespeichert.");
			}
		}),
		E && /* @__PURE__ */ (0, _.jsx)(U, {
			title: "Termin archivieren",
			close: () => D(null),
			busy: A,
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-dialog-body",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						"«",
						E.title,
						"» aus der öffentlichen Agenda nehmen und ins Archiv verschieben? Der Termin bleibt im Archiv erhalten und kann wiederhergestellt werden."
					] }),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: A,
							onClick: () => D(null),
							children: o("Abbrechen")
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: A,
							onClick: () => void I(E, "trash"),
							children: o("Ins Archiv verschieben")
						})]
					}),
					y && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "alert",
						children: y
					})
				]
			})
		})
	] });
}
function Rt({ event: e, settings: t, nonce: n, close: r, saved: i }) {
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
				await w(Ft, n, r), i();
			} catch (e) {
				y(e.message);
			} finally {
				g(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsx)(U, {
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
								defaultValue: It(e?.startAt || "")
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: ["Ende (optional)", /* @__PURE__ */ (0, _.jsx)("input", {
								type: "datetime-local",
								name: "endAt",
								defaultValue: It(e?.endAt || "")
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
							/* @__PURE__ */ (0, _.jsx)(Re, {
								label: o("Beschreibung (FR)"),
								value: c,
								onChange: l,
								disabled: m || u
							})
						] }),
						/* @__PURE__ */ (0, _.jsx)(At, {
							organisers: t.organisers,
							event: e,
							localDate: It,
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
function zt({ regions: e, nonce: t }) {
	let [n, r] = (0, h.useState)([]), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)([]), [l, u] = (0, h.useState)(""), [d, f] = (0, h.useState)(""), [p, m] = (0, h.useState)(!1), [g, v] = (0, h.useState)(0), [y, b] = (0, h.useState)(!0);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(Ft, { operation: "admins" }, e.signal).then((e) => {
			r(e.users), b(!1);
		}).catch((t) => {
			e.signal.aborted || (u(t.message), b(!1));
		}), () => e.abort();
	}, [g]);
	async function x() {
		m(!0), u(""), f("");
		try {
			await w(Ft, t, T({
				operation: "assign",
				userId: i,
				regions: s.join(",")
			})), r((e) => e.map((e) => String(e.id) === i ? {
				...e,
				regions: s
			} : e)), f("Regionsrechte gespeichert. Sie gelten mit aktivem Mitgliederzugang.");
		} catch (e) {
			u(e.message);
		} finally {
			m(!1);
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "region-assignments",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: "Regionale Moderatoren" }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: "Wählen Sie ein Mitglied und die Regionen, deren Agenda es verwalten darf. Ohne Häkchen wird die regionale Verwaltung entzogen. Clubadministratoren behalten Zugriff auf alle Regionen." }),
			y ? /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: o("Mitglieder werden geladen …")
			}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Person"), /* @__PURE__ */ (0, _.jsxs)("select", {
					disabled: p,
					value: i,
					onChange: (e) => {
						a(e.target.value), c(n.find((t) => String(t.id) === e.target.value)?.regions || []), f("");
					},
					children: [/* @__PURE__ */ (0, _.jsx)("option", {
						value: "",
						children: o("Person wählen")
					}), n.map((e) => /* @__PURE__ */ (0, _.jsxs)("option", {
						value: e.id,
						children: [
							e.name,
							" (Konto ",
							e.id,
							")"
						]
					}, e.id))]
				})] }),
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: !i || p,
					children: [/* @__PURE__ */ (0, _.jsx)("legend", { children: "Verwaltete Regionen" }), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "region-checkboxes",
						children: e.map((e) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [/* @__PURE__ */ (0, _.jsx)("input", {
							type: "checkbox",
							checked: s.includes(e.id),
							onChange: (t) => c((n) => t.target.checked ? [...n, e.id] : n.filter((t) => t !== e.id))
						}), e.name] }, e.id))
					})]
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-primary",
					disabled: !i || p,
					onClick: () => void x(),
					children: p ? "Wird gespeichert …" : "Regionsrechte speichern"
				})
			] }),
			d && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: d
			}),
			l && /* @__PURE__ */ (0, _.jsxs)("p", {
				role: "alert",
				children: [l, /* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-text-button",
					onClick: () => {
						u(""), b(!0), v((e) => e + 1);
					},
					children: o("Erneut versuchen")
				})]
			})
		]
	});
}
function Bt({ page: e, pages: t, change: n }) {
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
function Vt() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(""), [d, f] = (0, h.useState)("lastName"), [p, m] = (0, h.useState)(1), [g, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(null), [S, w] = (0, h.useState)(!1), [T, E] = (0, h.useState)(0);
	(0, h.useEffect)(() => {
		let e = new AbortController(), r = setTimeout(() => {
			C("strc_directory", {
				operation: "list",
				search: n,
				region: i,
				model: s,
				vehicleStatus: l,
				sort: d,
				page: String(p)
			}, e.signal).then((e) => {
				t(e), y("");
			}).catch((t) => {
				e.signal.aborted || y(t.message);
			});
		}, 180);
		return () => {
			clearTimeout(r), e.abort();
		};
	}, [
		n,
		i,
		s,
		l,
		d,
		p,
		T
	]);
	let D = (0, h.useCallback)(async (e) => {
		try {
			x(await C("strc_directory", {
				operation: "detail",
				id: String(e)
			}));
		} catch (e) {
			y(e.message);
		}
	}, []);
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "eyebrow",
					children: o("Für Clubmitglieder")
				}),
				/* @__PURE__ */ (0, _.jsx)("h1", { children: o("Mitgliederverzeichnis") }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: o("Mitglieder und ihre Triumphs finden.") })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-filters",
					children: [
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Suche"), /* @__PURE__ */ (0, _.jsx)("input", {
							type: "search",
							placeholder: "Name, Ort, PLZ, Fahrzeug oder Kennzeichen",
							value: n,
							onChange: (e) => {
								r(e.target.value), m(1);
							}
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Region"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: i,
							onChange: (e) => {
								a(e.target.value), m(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Regionen")
							}), e?.regions.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Modell"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: s,
							onChange: (e) => {
								c(e.target.value), m(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Modelle")
							}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeugstatus"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: l,
							onChange: (e) => {
								u(e.target.value), m(1);
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "roadworthy",
									children: o("Fahrbereit")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "restoration",
									children: o("In Restauration")
								})
							]
						})] }),
						/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Sortieren"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: d,
							onChange: (e) => f(e.target.value),
							children: [
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "lastName",
									children: o("Nachname")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "city",
									children: o("Ort")
								}),
								/* @__PURE__ */ (0, _.jsx)("option", {
									value: "region",
									children: o("Region")
								})
							]
						})] }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							"aria-pressed": S,
							onClick: () => w((e) => !e),
							children: o(S ? "Liste anzeigen" : "Karte anzeigen")
						})
					]
				}),
				g && /* @__PURE__ */ (0, _.jsxs)("p", {
					role: "alert",
					children: [g, /* @__PURE__ */ (0, _.jsx)("button", {
						onClick: () => E((e) => e + 1),
						children: o("Erneut versuchen")
					})]
				}),
				e ? /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsxs)("p", {
						role: "status",
						children: [
							e.total,
							" ",
							o("Mitglieder")
						]
					}),
					S && /* @__PURE__ */ (0, _.jsx)(Ht, {
						members: e.mapMembers,
						detail: D
					}),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "community-grid",
						children: e.members.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", {
							className: "directory-card",
							children: [
								e.photo && /* @__PURE__ */ (0, _.jsx)(v, {
									unoptimized: !0,
									src: e.photo,
									width: 100,
									height: 100,
									alt: e.name
								}),
								/* @__PURE__ */ (0, _.jsx)("h2", { children: e.name }),
								/* @__PURE__ */ (0, _.jsxs)("p", { children: [
									e.postcode,
									" ",
									e.city,
									e.region ? " · " + e.region : ""
								] }),
								/* @__PURE__ */ (0, _.jsx)("p", { children: e.vehicles.map((e) => e.model).join(", ") }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									className: "club-secondary",
									onClick: () => void D(e.id),
									children: o("Profil öffnen")
								})
							]
						}, e.id))
					}),
					!e.members.length && /* @__PURE__ */ (0, _.jsx)("p", { children: o("Keine passenden Mitglieder gefunden.") }),
					/* @__PURE__ */ (0, _.jsx)(Bt, {
						page: p,
						pages: e.pages,
						change: m
					})
				] }) : /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Mitglieder werden geladen …")
				})
			]
		}),
		b && /* @__PURE__ */ (0, _.jsx)(U, {
			title: b.name,
			close: () => x(null),
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-dialog-body",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						b.postcode,
						" ",
						b.city,
						" · ",
						b.region
					] }),
					b.email && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: "mailto:" + b.email,
						children: b.email
					}) }),
					b.phone && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
						href: "tel:" + b.phone.replace(/[^+0-9]/g, ""),
						children: b.phone
					}) }),
					/* @__PURE__ */ (0, _.jsx)("h3", { children: "Triumphs" }),
					b.vehicles.map((e) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [
						e.photo && /* @__PURE__ */ (0, _.jsx)(v, {
							unoptimized: !0,
							src: e.photo,
							alt: e.model,
							width: 320,
							height: 210
						}),
						/* @__PURE__ */ (0, _.jsxs)("h4", { children: [
							e.model,
							" ",
							e.details
						] }),
						/* @__PURE__ */ (0, _.jsxs)("p", { children: [
							e.year,
							" · ",
							e.registration,
							" · ",
							e.status === "restoration" ? "In Restauration" : "Fahrbereit"
						] })
					] }, e.id))
				]
			})
		})
	] });
}
function Ht({ members: t, detail: n }) {
	let r = (0, h.useRef)(null), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)({
		done: 0,
		total: 0
	});
	return (0, h.useEffect)(() => {
		let i = !1, s, l = new AbortController();
		return (async () => {
			let u = await import("./leaflet-src-BUmUk9La.js").then((t) => /* @__PURE__ */ e(t.default, 1));
			if (i || !r.current) return;
			s = u.map(r.current, {
				scrollWheelZoom: !1,
				maxZoom: 12
			}).setView([46.8, 8.2], 7), u.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 12,
				attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
			}).addTo(s);
			let d = /* @__PURE__ */ new Map();
			t.forEach((e) => {
				if (e.postcode && (!e.country || e.country === "CH")) {
					let t = d.get(e.postcode) || [];
					t.push(e), d.set(e.postcode, t);
				}
			});
			let f = Array.from(d), p = 0, m = 0;
			c({
				done: 0,
				total: f.length
			}), a("");
			async function h() {
				for (; p < f.length && !i;) {
					let [e, t] = f[p++];
					try {
						let r = await C("strc_directory", {
							operation: "location",
							postcode: e
						}, l.signal);
						if (i) return;
						if (r.position) {
							let e = document.createElement("div");
							t.forEach((t) => {
								let r = document.createElement("button");
								r.textContent = t.name, r.type = "button", r.addEventListener("click", () => n(t.id)), e.appendChild(r), e.appendChild(document.createElement("br"));
							}), u.circleMarker(r.position, {
								radius: 10,
								color: "#08334f",
								fillOpacity: .75
							}).addTo(s).bindPopup(e);
						}
					} catch {
						i || a(o("Einige Standorte konnten nicht geladen werden. Die Mitgliederliste bleibt verfügbar."));
					} finally {
						i || c({
							done: ++m,
							total: f.length
						});
					}
				}
			}
			await Promise.all(Array.from({ length: Math.min(4, f.length) }, h));
		})().catch(() => {
			i || a("Einige Standorte konnten nicht geladen werden. Die Mitgliederliste bleibt verfügbar.");
		}), () => {
			i = !0, l.abort(), s?.remove();
		};
	}, [t, n]), /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
		/* @__PURE__ */ (0, _.jsx)("p", {
			className: "club-hint",
			children: "Ungefähre Standorte nach Postleitzahl. Keine Wohnadressen. Karte zeigt alle gefilterten Mitglieder."
		}),
		s.done < s.total && /* @__PURE__ */ (0, _.jsxs)("p", {
			role: "status",
			children: [
				o("Standorte werden geladen …"),
				" ",
				s.done,
				"/",
				s.total
			]
		}),
		/* @__PURE__ */ (0, _.jsx)("div", {
			ref: r,
			className: "directory-map",
			"aria-label": "Ungefähre Mitgliederstandorte"
		}),
		i && /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: i
		})
	] });
}
//#endregion
//#region app/components/StrcFlipbook.tsx
var Ut = window.strcSettings.assetBase ?? "";
function Wt({ url: e, title: t, classic: n }) {
	let [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(""), [c, l] = (0, h.useState)(null), [u, d] = (0, h.useState)({}), [f, p] = (0, h.useState)(1), [m, g] = (0, h.useState)(null), [v, y] = (0, h.useState)(() => typeof window < "u" && window.innerWidth < 760), [b, x] = (0, h.useState)(null), S = (0, h.useRef)({}), C = (0, h.useRef)(/* @__PURE__ */ new Set()), w = (0, h.useRef)(null), T = (0, h.useRef)(null), E = (0, h.useRef)([]), D = (0, h.useRef)(0);
	(0, h.useEffect)(() => () => {
		E.current.forEach(clearTimeout), D.current++;
	}, []), (0, h.useEffect)(() => {
		let t = !1;
		E.current.forEach(clearTimeout), E.current = [], D.current++, S.current = {}, C.current.clear(), T.current = null;
		let n;
		return (async () => {
			let r = await import("./pdf-CnPiFuPD.js");
			if (t) return;
			i(null), l(null), d({}), p(1), s(""), g(null), r.GlobalWorkerOptions.workerSrc = `${Ut}/pdfjs/pdf.worker.min.js`, n = r.getDocument({
				url: e,
				withCredentials: !0,
				rangeChunkSize: 65536,
				cMapUrl: `${Ut}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${Ut}/pdfjs/standard_fonts/`,
				wasmUrl: `${Ut}/pdfjs/wasm/`
			});
			let a = await n.promise;
			if (t) return;
			let o = [];
			for (let e = 1; e <= a.numPages; e++) {
				let n = (await a.getPage(e)).getViewport({ scale: 1 });
				if (t) return;
				let r = n.width / 2 / n.height;
				n.width / n.height > 1.2 ? e === 1 || e === a.numPages ? o.push({
					p: e,
					part: "center",
					r,
					edge: !0
				}) : o.push({
					p: e,
					part: "left",
					r
				}, {
					p: e,
					part: "right",
					r
				}) : o.push({
					p: e,
					part: "full",
					r: n.width / n.height
				});
			}
			T.current = o, l(o), i(a);
		})().catch(() => {
			t || s(o("Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen."));
		}), () => {
			t = !0, n?.destroy().catch(() => {});
		};
	}, [e]), (0, h.useEffect)(() => {
		let e = () => y(window.innerWidth < 760);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []);
	let O = b ?? v, k = c ? c.length : 0, A = (e) => O ? [e] : e <= 1 ? [0, 1] : [e - e % 2, e - e % 2 + 1 <= k ? e - e % 2 + 1 : 0], j = (e) => O ? e : e <= 1 ? 1 : e - e % 2, M = A(f), N = j(f), ee = O ? N + 1 : N <= 1 ? 2 : N + 2, P = O ? N - 1 : N <= 3 ? 1 : N - 2, F = k > 0 && ee <= k, I = N > 1, L = (e) => {
		let t = c?.[e - 1];
		return t ? `${t.p}:${t.part}` : "";
	};
	function te(e, t, n) {
		let r = document.createElement("canvas");
		return r.width = Math.floor(n), r.height = e.height, r.getContext("2d").drawImage(e, t, 0, n, e.height, 0, 0, n, e.height), r.toDataURL("image/jpeg", .86);
	}
	function ne(e) {
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
	async function R(e) {
		let t = T.current, n = t?.[e - 1];
		if (!r || !n || S.current[`${n.p}:${n.part}`] || C.current.has(n.p)) return;
		C.current.add(n.p);
		let i = D.current;
		try {
			let e = await r.getPage(n.p), a = e.getViewport({ scale: 1 }), o = e.getViewport({ scale: Math.min(2.2, 1300 / a.height) }), s = document.createElement("canvas");
			if (s.width = Math.floor(o.width), s.height = Math.floor(o.height), await e.render({
				canvas: s,
				viewport: o
			}).promise, i !== D.current) return;
			let c = {};
			if (n.part === "full") c[`${n.p}:full`] = s.toDataURL("image/jpeg", .86);
			else if (c[`${n.p}:left`] = te(s, 0, s.width / 2), c[`${n.p}:right`] = te(s, s.width / 2, s.width / 2), n.edge) if (ne(s)) c[`${n.p}:center`] = te(s, s.width / 4, s.width / 2);
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
				T.current = e, l(e);
			}
			S.current = {
				...S.current,
				...c
			}, d(S.current), e.cleanup(), s.width = 0;
		} catch {
			i === D.current && s(o("Die Seite konnte nicht geladen werden. Öffne Suche, Text & Download."));
		} finally {
			C.current.delete(n.p);
		}
	}
	(0, h.useEffect)(() => {
		if (!r || !c) return;
		let e = [
			...A(f),
			...A(Math.min(k, ee)),
			...A(Math.max(1, P)),
			...A(Math.min(k, ee + (O ? 1 : 2)))
		];
		(async () => {
			for (let t of e) t && await R(t);
		})();
	}, [
		r,
		c,
		f,
		O
	]);
	let z = c?.length ? (c[1] || c[0]).r : .707;
	function B(e) {
		if (m || !r || e > 0 && !F || e < 0 && !I) return;
		let t = e > 0 ? ee : P, n = A(t);
		g({
			...O ? e > 0 ? {
				under: [n[0]],
				front: M[0],
				back: -1,
				side: "right"
			} : {
				under: [M[0]],
				front: n[0],
				back: -1,
				side: "right",
				reverse: !0
			} : e > 0 ? {
				under: [M[0], n[1]],
				front: M[1],
				back: n[0],
				side: "right"
			} : {
				under: [n[0], M[1]],
				front: M[0],
				back: n[1],
				side: "left"
			},
			go: !1
		}), E.current.push(setTimeout(() => g((e) => e && {
			...e,
			go: !0
		}), 30)), E.current.push(setTimeout(() => {
			p(t), g(null);
		}, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 40 : 680));
	}
	let V = (e, t) => {
		if (e === -1) return /* @__PURE__ */ (0, _.jsx)("div", { className: `fb-face fb-paper ${t}` });
		if (!e) return /* @__PURE__ */ (0, _.jsx)("div", { className: `fb-face fb-empty ${t}` });
		let n = u[L(e)];
		return /* @__PURE__ */ (0, _.jsx)("div", {
			className: `fb-face ${t}`,
			children: n ? /* @__PURE__ */ (0, _.jsx)("img", {
				src: n,
				alt: `${o("Seite")} ${e}`,
				draggable: !1
			}) : /* @__PURE__ */ (0, _.jsx)("span", {
				className: "fb-loading",
				children: o("Seite wird geladen …")
			})
		});
	}, re = m ? m.under : M, ie = M.filter(Boolean), ae = k ? `${ie.length > 1 ? ie.join("–") : String(ie[0] || 1)} ${o("von")} ${k}` : "";
	return /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "strc-flipbook" + (O ? " is-single" : ""),
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "fb-toolbar",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => B(-1),
						disabled: !I || !!m,
						children: ["← ", o("Zurück")]
					}),
					/* @__PURE__ */ (0, _.jsx)("span", {
						"aria-live": "polite",
						children: k ? `${o("Seite")} ${ae}` : o("Magazin wird geladen …")
					}),
					/* @__PURE__ */ (0, _.jsxs)("button", {
						type: "button",
						className: "club-secondary",
						onClick: () => B(1),
						disabled: !F || !!m,
						children: [o("Weiter"), " →"]
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: () => x(!O),
						children: o(O ? "Doppelseite" : "Einzelseite")
					}),
					/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary fb-mode",
						onClick: n,
						children: o("Suche, Text & Download")
					})
				]
			}),
			a ? /* @__PURE__ */ (0, _.jsx)("p", {
				role: "alert",
				children: a
			}) : /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "fb-book",
				style: {
					aspectRatio: String((O ? 1 : 2) * z),
					"--fb-ratio": (O ? 1 : 2) * z
				},
				tabIndex: 0,
				role: "group",
				"aria-label": `${t} – ${o("Blättern mit Pfeiltasten, Klick oder Wischen")}`,
				onKeyDown: (e) => {
					e.key === "ArrowRight" ? (e.preventDefault(), B(1)) : e.key === "ArrowLeft" && (e.preventDefault(), B(-1));
				},
				onClick: (e) => {
					if (w.current === "swiped") {
						w.current = null;
						return;
					}
					let t = e.currentTarget.getBoundingClientRect();
					B(e.clientX - t.left > t.width / 2 ? 1 : -1);
				},
				onPointerDown: (e) => {
					w.current = e.clientX;
				},
				onPointerUp: (e) => {
					let t = w.current;
					w.current = null, typeof t == "number" && Math.abs(e.clientX - t) > 50 && (w.current = "swiped", B(e.clientX < t ? 1 : -1));
				},
				children: [
					O ? V(re[0], "fb-single") : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [V(re[0], "fb-left"), V(re[1], "fb-right")] }),
					m && /* @__PURE__ */ (0, _.jsxs)("div", {
						className: `fb-leaf fb-leaf-${O ? "single" : m.side}${m.reverse ? " is-reverse" : ""}${m.go ? " is-turning" : ""}`,
						children: [V(m.front, "fb-front"), V(m.back, "fb-back")]
					}),
					!O && /* @__PURE__ */ (0, _.jsx)("span", {
						className: "fb-spine",
						"aria-hidden": "true"
					})
				]
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
var Gt = (0, h.lazy)(() => import("./MagazineReader-C4i17Z2c.js")), Kt = {
	"#forum": "◎",
	"#galerie": "▧",
	"#bibliothek": "▤",
	"#marktplatz": "◇",
	"#tr-shop": "▣",
	"#agenda-verwalten": "▦",
	"#antraege": "✉"
}, qt = (e) => Kt[String(e || "").split("/")[0]] || "◉", Jt = {
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
function Yt({ extraTools: e = [] }) {
	let { language: t } = n(), [i, a] = (0, h.useState)(null), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(0), [d, f] = (0, h.useState)(!1), [p, m] = (0, h.useState)("flip");
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
	let g = i.magazineIssue || null, y = i.isBoard, b = i.notifications.filter((e) => e && typeof e == "object" && typeof e.title == "string" && typeof e.url == "string"), x = i.registrations.filter((e) => ![
		"cancelled",
		"expired",
		"waiting"
	].includes(e.state || "") && [
		"outstanding",
		"partially_paid",
		"pending_payment",
		"failed"
	].includes(e.paymentStatus || "")), S = (e) => {
		if (!e) return "";
		let t = new Date(e);
		return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(r());
	}, w = (e, t) => /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: e.length ? /* @__PURE__ */ (0, _.jsx)("ul", { children: e.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
		/* @__PURE__ */ (0, _.jsx)("a", {
			href: e.url,
			children: e.title.startsWith("Neue Antwort:") ? o("Neue Antwort:") + e.title.slice(13) : e.title
		}),
		e.registered && /* @__PURE__ */ (0, _.jsxs)("strong", { children: [" · ", o("Bereits angemeldet")] }),
		e.location && /* @__PURE__ */ (0, _.jsx)("p", { children: e.location }),
		S(e.startAt || e.at) && /* @__PURE__ */ (0, _.jsx)("p", { children: S(e.startAt || e.at) }),
		/* @__PURE__ */ (0, _.jsx)("p", { children: [
			e.status && o(Jt[e.status] || e.status),
			e.state && o(Jt[e.state] || e.state),
			e.paymentStatus && o(Jt[e.paymentStatus] || e.paymentStatus),
			e.total
		].filter(Boolean).join(" · ") })
	] }, e.id || t)) }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o(t) }) }), T = e.filter((e) => e.url === "#agenda-verwalten" || e.url === "#antraege").map((e) => ({
		url: e.url,
		title: e.url === "#antraege" ? "Anträge bearbeiten" : "Agenda verwalten"
	})), E = e.find((e) => e.url === "#redaktion");
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
									/* @__PURE__ */ (0, _.jsx)("span", { children: [e.location, S(e.startAt || e.at)].filter(Boolean).join(" · ") }),
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
						w(b.slice(0, 6), "Keine neuen Benachrichtigungen."),
						x.length > 0 && w(x, ""),
						i.magazine && !g && /* @__PURE__ */ (0, _.jsx)("a", {
							href: i.magazine.url,
							children: i.magazine.title
						})
					]
				}),
				/* @__PURE__ */ (0, _.jsxs)("article", {
					className: "form-section dashboard-activity db-card db-mine",
					children: [
						/* @__PURE__ */ (0, _.jsx)("h2", { children: o("Meine Aktivitäten") }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Anmeldungen") }), w(i.registrations, "Noch keine Anmeldungen.")] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [
							/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Beiträge und Inserate") }),
							w(i.uploads, "Noch keine Beiträge eingereicht."),
							/* @__PURE__ */ (0, _.jsx)("a", {
								href: "#marktplatz/meine",
								children: o("Meine Inserate verwalten")
							})
						] }),
						/* @__PURE__ */ (0, _.jsxs)("details", { children: [/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Meine Bestellungen") }), w(i.orders, "Noch keine Bestellungen.")] }),
						(i.queues.length > 0 || T.length > 0) && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "db-moderation",
							children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Meine Moderationsaufgaben") }), /* @__PURE__ */ (0, _.jsxs)("div", {
								className: "db-moderation-grid",
								children: [i.queues.map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
									className: "db-mod-tile" + ((e.count || 0) > 0 ? " has-open" : ""),
									href: e.url,
									children: [
										/* @__PURE__ */ (0, _.jsx)("i", {
											"aria-hidden": "true",
											children: qt(e.url)
										}),
										/* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.title) }),
										/* @__PURE__ */ (0, _.jsx)("span", { children: (e.count || 0) > 0 ? `${e.count} ${o("In Prüfung")}` : o("Nichts offen") })
									]
								}, e.url)), T.map((e) => /* @__PURE__ */ (0, _.jsxs)("a", {
									className: "db-mod-tile is-tool",
									href: e.url,
									children: [
										/* @__PURE__ */ (0, _.jsx)("i", {
											"aria-hidden": "true",
											children: qt(e.url)
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
						g && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "db-magazine",
							children: [/* @__PURE__ */ (0, _.jsx)("h3", { children: o("TR-Magazin") }), /* @__PURE__ */ (0, _.jsxs)("button", {
								type: "button",
								className: "db-magazine-card",
								onClick: () => {
									g && (g.canRead && g.fileUrl ? (m("flip"), f(!0)) : window.location.href = g.loginUrl || i.magazine?.url || "#bibliothek");
								},
								children: [g.cover || g.previewPages?.[0] ? /* @__PURE__ */ (0, _.jsx)(v, {
									unoptimized: !0,
									width: 96,
									height: 128,
									className: "db-magazine-cover",
									src: g.cover || g.previewPages[0],
									alt: "",
									loading: "lazy"
								}) : /* @__PURE__ */ (0, _.jsxs)("span", {
									className: "db-magazine-mark",
									"aria-hidden": "true",
									children: ["TR", /* @__PURE__ */ (0, _.jsx)("small", { children: "MAGAZINE" })]
								}), /* @__PURE__ */ (0, _.jsxs)("span", {
									className: "db-magazine-text",
									children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: g.title }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Jetzt lesen"), " →"] })]
								})]
							})]
						}),
						d && g?.fileUrl && /* @__PURE__ */ (0, _.jsx)(U, {
							title: g.title,
							close: () => f(!1),
							children: p === "flip" ? /* @__PURE__ */ (0, _.jsx)(Wt, {
								url: g.fileUrl,
								title: g.title,
								classic: () => m("classic")
							}) : /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
								fallback: /* @__PURE__ */ (0, _.jsx)("p", {
									role: "status",
									children: o("Leseansicht wird geladen …")
								}),
								children: /* @__PURE__ */ (0, _.jsx)(Gt, {
									url: g.fileUrl,
									title: g.title,
									back: () => m("flip")
								})
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
							y && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: "#clubdokumente",
								children: o("Clubdokumente")
							}),
							E && /* @__PURE__ */ (0, _.jsx)("a", {
								className: "club-secondary",
								href: E.url,
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
function Xt() {
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
//#region app/components/ForumPreferences.tsx
function Zt({ rows: e, change: t }) {
	let n = F();
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("div", { children: e.map((r, i) => /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "club-form-row",
		children: [[
			"model",
			"component",
			"area"
		].map((a) => /* @__PURE__ */ (0, _.jsxs)("label", { children: [o({
			model: "Modell",
			component: "Technikbereich",
			area: "Bereich"
		}[a]), /* @__PURE__ */ (0, _.jsxs)("select", {
			value: r[a],
			onChange: (n) => t(e.map((e, t) => t === i ? {
				...e,
				[a]: n.target.value
			} : e)),
			children: [/* @__PURE__ */ (0, _.jsx)("option", {
				value: "",
				children: o("Alle")
			}), (a === "model" ? L : a === "component" ? n.components : n.areas).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
				value: e,
				children: o(e)
			}, e))]
		})] }, a)), /* @__PURE__ */ (0, _.jsx)("button", {
			className: "market-text-button",
			type: "button",
			onClick: () => t(e.filter((e, t) => t !== i)),
			children: o("Entfernen")
		})]
	}, i)) }), /* @__PURE__ */ (0, _.jsx)("button", {
		type: "button",
		className: "club-secondary",
		disabled: e.length >= 30,
		onClick: () => t([...e, {
			model: "",
			component: "",
			area: ""
		}]),
		children: o("Zuordnung hinzufügen")
	})] });
}
function Qt() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(null), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_forum_settings", { search: n }, e.signal).then((e) => t((t) => t ? {
			...t,
			members: e.members
		} : e)).catch((t) => {
			e.signal.aborted || c(t.message);
		}), () => e.abort();
	}, [n]);
	async function d(t = !1) {
		if (e) {
			u(!0);
			try {
				await w("strc_forum_settings", e.nonce, T(t && i ? {
					operation: "expert-save",
					id: String(i.id),
					expertise: JSON.stringify(i.expertise)
				} : {
					operation: "save",
					interests: JSON.stringify(e.preferences.interests),
					email: e.preferences.email ? "1" : "0",
					website: e.preferences.website ? "1" : "0",
					whatsapp: e.preferences.whatsapp ? "1" : "0",
					expertNotifications: e.preferences.expertNotifications ? "1" : "0"
				})), c(o("Einstellungen gespeichert."));
			} catch (e) {
				c(e.message);
			} finally {
				u(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsxs)("details", {
		className: "form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("summary", { children: o("Interessen, Fachwissen und Benachrichtigungen") }),
			e && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
				/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Meine Interessen") }),
				/* @__PURE__ */ (0, _.jsx)(Zt, {
					rows: e.preferences.interests,
					change: (n) => t({
						...e,
						preferences: {
							...e.preferences,
							interests: n
						}
					})
				}),
				[
					"website",
					"email",
					"expertNotifications"
				].map((n) => /* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						checked: e.preferences[n],
						onChange: (r) => t({
							...e,
							preferences: {
								...e.preferences,
								[n]: r.target.checked
							}
						})
					}), o({
						website: "Benachrichtigungen auf der Webseite",
						email: "Benachrichtigungen per E-Mail",
						expertNotifications: "Benachrichtigungen zu meinem Fachwissen"
					}[n])]
				}, n)),
				/* @__PURE__ */ (0, _.jsxs)("label", {
					className: "application-consent",
					children: [/* @__PURE__ */ (0, _.jsx)("input", {
						type: "checkbox",
						checked: e.preferences.whatsapp,
						onChange: (n) => t({
							...e,
							preferences: {
								...e.preferences,
								whatsapp: n.target.checked
							}
						})
					}), o("Ich möchte Forumshinweise per WhatsApp erhalten. Meine Mobilnummer und der Hinweistext werden dafür über Make an WhatsApp übermittelt. Ich kann die Einwilligung jederzeit hier widerrufen.")]
				}),
				/* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: o("WhatsApp-Hinweise bleiben ausgeschaltet, bis der Club die Nachrichtenvorlage und den Versanddienst freigibt.")
				}),
				!!e.expertise.length && /* @__PURE__ */ (0, _.jsxs)("p", { children: [
					o("Mein Fachwissen"),
					": ",
					e.expertise.map((e) => [
						e.model,
						e.component,
						e.area
					].filter(Boolean).join(" · ")).join("; ")
				] }),
				/* @__PURE__ */ (0, _.jsx)("button", {
					className: "market-primary",
					disabled: l,
					onClick: () => void d(),
					children: o("Speichern")
				}),
				e.canManage && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsx)("h3", { children: o("Fachwissen zuordnen") }),
					/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Mitglied suchen"), /* @__PURE__ */ (0, _.jsx)("input", {
						type: "search",
						value: n,
						onChange: (e) => r(e.target.value)
					})] }),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: "club-actions",
						children: e.members.map((e) => /* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							onClick: () => a(e),
							children: e.name
						}, e.id))
					}),
					i && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
						/* @__PURE__ */ (0, _.jsx)("h4", { children: i.name }),
						/* @__PURE__ */ (0, _.jsx)(Zt, {
							rows: i.expertise,
							change: (e) => a({
								...i,
								expertise: e
							})
						}),
						/* @__PURE__ */ (0, _.jsx)("p", { children: o("Diese Zuordnung erteilt keine Moderationsrechte. Benachrichtigungen wählt das Mitglied selbst.") }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: l,
							onClick: () => void d(!0),
							children: o("Fachwissen speichern")
						})
					] })
				] })
			] }),
			s && /* @__PURE__ */ (0, _.jsx)("p", {
				role: "status",
				children: s
			})
		]
	});
}
//#endregion
//#region app/components/Community.tsx
var $t = (0, h.lazy)(() => import("./MagazineReader-C4i17Z2c.js")), en = "strc_community", tn = {
	events: "Veranstaltungen",
	portraits: "Mitgliederporträts",
	restorations: "Fahrzeugrestaurationen",
	history: "Clubgeschichte"
}, nn = {
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
}, rn = {
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
		create: "Material hochladen",
		empty: "Noch keine Dokumente vorhanden."
	}
};
function an(e) {
	return Array.isArray(e) ? e.join(", ") : e || "";
}
var on = [
	"technical",
	"club",
	"travel",
	"magazine",
	"newsletter",
	"board"
], sn = {
	technical: "⚙",
	club: "☷",
	travel: "⌖",
	magazine: "▤",
	newsletter: "✉",
	board: "♜"
};
function cn({ kind: e, nonce: t, selectedId: n, initialGroup: i = "", title: a }) {
	let { text: s } = me(), c = F(), [l, u] = (0, h.useState)({
		items: [],
		total: 0,
		pages: 0
	}), [d, f] = (0, h.useState)(i), [p, m] = (0, h.useState)(""), [g, y] = (0, h.useState)(""), [b, x] = (0, h.useState)(""), [S, E] = (0, h.useState)(!1), [D, O] = (0, h.useState)(1), [k, A] = (0, h.useState)(0), [j, M] = (0, h.useState)(!0), [N, ee] = (0, h.useState)(""), [P, I] = (0, h.useState)(""), [te, ne] = (0, h.useState)(void 0), [R, z] = (0, h.useState)(() => n || null), [B, V] = (0, h.useState)(null), [re, ie] = (0, h.useState)(!1), [ae, oe] = (0, h.useState)(null), [se, ce] = (0, h.useState)(""), [le, ue] = (0, h.useState)(""), [de, fe] = (0, h.useState)(!1), pe = ["magazine", "newsletter"].includes(d), he = !pe, ge = e !== "library" || !!d && (d !== "technical" || !!(p && le));
	(0, h.useEffect)(() => {
		let t = new AbortController(), n = setTimeout(() => {
			M(!0), ee(""), C(en, {
				operation: "list",
				kind: e,
				group: d,
				search: e === "library" ? se : "",
				model: e === "library" ? le : "",
				mine: e === "library" && de ? "1" : "0",
				documentType: p,
				area: g,
				galleryCategory: b,
				trash: S ? "1" : "0",
				page: String(D)
			}, t.signal).then(u).catch((e) => {
				t.signal.aborted || ee(e.message);
			}).finally(() => {
				t.signal.aborted || M(!1);
			});
		}, 180);
		return () => {
			clearTimeout(n), t.abort();
		};
	}, [
		e,
		d,
		p,
		g,
		b,
		S,
		D,
		k,
		se,
		le,
		de
	]);
	function H(e = "") {
		I(e), M(!0), A((e) => e + 1);
	}
	async function _e(e, n) {
		ie(!0), ee("");
		try {
			await w(en, t, T({
				operation: n,
				id: String(e.id)
			})), V(null), z(null), H(n === "trash" ? "Beitrag ins Archiv verschoben." : n === "approve" ? "Beitrag freigegeben." : n === "reject" ? "Beitrag abgelehnt." : "Beitrag wiederhergestellt.");
		} catch (e) {
			ee(e.message);
		} finally {
			ie(!1);
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
				/* @__PURE__ */ (0, _.jsx)("h1", { children: o(a || s(`${e}.title`)) }),
				/* @__PURE__ */ (0, _.jsx)("p", { children: s(`${e}.intro`) })
			]
		}),
		/* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content community",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-toolbar",
					children: [/* @__PURE__ */ (0, _.jsx)("span", {}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						onClick: () => ne(null),
						children: o(rn[e].create)
					})]
				}),
				(e === "library" || e === "forum") && /* @__PURE__ */ (0, _.jsx)("div", {
					className: "category-tiles",
					"aria-label": o(e === "library" ? "Bibliotheksbereiche" : "Forumsbereiche"),
					children: e === "library" ? [...l.libraryGroups || []].sort((e, t) => (on.indexOf(e.key) + 1 || 99) - (on.indexOf(t.key) + 1 || 99)).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
						className: "category-tile lib-tile lib-" + e.key,
						"aria-pressed": d === e.key,
						onClick: () => {
							f(d === e.key ? "" : e.key), m(d !== e.key && e.types.length === 1 ? e.types[0] : ""), ce(""), ue(""), O(1);
						},
						children: [/* @__PURE__ */ (0, _.jsx)("span", {
							className: "category-tile-icon",
							"aria-hidden": "true",
							children: sn[e.key] || "▤"
						}), /* @__PURE__ */ (0, _.jsx)("strong", { children: o(e.label) })]
					}, e.key)) : c.areas.map((e, t) => /* @__PURE__ */ (0, _.jsxs)("button", {
						className: "category-tile",
						"aria-pressed": g === e,
						onClick: () => {
							y(g === e ? "" : e), O(1);
						},
						children: [/* @__PURE__ */ (0, _.jsx)("span", {
							className: "category-tile-icon",
							"aria-hidden": "true",
							children: [
								"⌁",
								"⚙",
								"⚒",
								"▦",
								"⌂",
								"⌖",
								"♧"
							][t] || "▤"
						}), /* @__PURE__ */ (0, _.jsx)("strong", { children: o(e === "Teile gesucht" ? "Ersatzteile / Teile gesucht" : e) })]
					}, e))
				}),
				e === "forum" && /* @__PURE__ */ (0, _.jsx)(Qt, {}),
				P && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-notice",
					role: "status",
					children: P
				}),
				e === "forum" && g && /* @__PURE__ */ (0, _.jsx)("button", {
					className: "community-overview-link",
					onClick: () => {
						y(""), O(1);
					},
					children: o("← Forumübersicht")
				}),
				(e !== "library" || d) && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "market-filters" + (e === "library" ? " lib-filters lib-filters-" + d : ""),
					children: [
						e === "library" && pe && /* @__PURE__ */ (0, _.jsxs)("label", {
							className: "market-search",
							children: [o("Suchbegriff"), /* @__PURE__ */ (0, _.jsx)("input", {
								type: "search",
								value: se,
								onChange: (e) => {
									ce(e.target.value), O(1);
								}
							})]
						}),
						e === "library" && he && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Dokumentart"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: p,
							onChange: (e) => {
								m(e.target.value), O(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Dokumentarten")
							}), c.libraryTypes.filter((e) => (l.accessClasses || []).includes(e.access) && (!d || (l.libraryGroups || []).find((e) => e.key === d)?.types.includes(e.key))).map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e.key,
								children: o(e.label)
							}, e.key))]
						})] }),
						e === "library" && d === "technical" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeug"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: le,
							onChange: (e) => {
								ue(e.target.value), O(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Bitte wählen")
							}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] }),
						e === "library" && /* @__PURE__ */ (0, _.jsxs)("label", {
							className: "market-own",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: de,
								onChange: (e) => {
									fe(e.target.checked), O(1);
								}
							}), o("Nur meine Beiträge")]
						}),
						e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kategorie"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: b,
							onChange: (e) => {
								x(e.target.value), O(1);
							},
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Alle Kategorien")
							}), Object.entries(tn).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(t)
							}, e))]
						})] }),
						(e === "library" || e === "forum") && /* @__PURE__ */ (0, _.jsxs)("label", {
							className: "market-own",
							children: [/* @__PURE__ */ (0, _.jsx)("input", {
								type: "checkbox",
								checked: S,
								onChange: (e) => {
									E(e.target.checked), O(1);
								}
							}), o("Archiv")]
						})
					]
				}),
				e === "library" && !d ? null : ge ? j ? /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Beiträge werden geladen …")
				}) : N ? /* @__PURE__ */ (0, _.jsxs)("p", {
					className: "collection-state error",
					role: "alert",
					children: [N, /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-text-button",
						onClick: () => H(),
						children: o("Erneut versuchen")
					})]
				}) : /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
					/* @__PURE__ */ (0, _.jsxs)("p", {
						className: "market-count",
						role: "status",
						children: [
							l.total,
							" ",
							o(l.total === 1 ? "Beitrag" : "Beiträge")
						]
					}),
					!l.items.length && /* @__PURE__ */ (0, _.jsx)("p", {
						className: "collection-state",
						children: o(S ? "Keine passenden Beiträge gefunden." : rn[e].empty)
					}),
					/* @__PURE__ */ (0, _.jsx)("div", {
						className: e === "gallery" ? "community-list gallery-albums" : e === "library" ? "community-list lib-list" : "community-list",
						children: l.items.map((t) => /* @__PURE__ */ (0, _.jsxs)("article", { children: [e === "gallery" && t.files[0] && !S && /* @__PURE__ */ (0, _.jsx)("button", {
							className: "community-cover",
							onClick: () => z(t.id),
							"aria-label": `${t.title} öffnen`,
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								src: (t.files.find((e) => e.key === t.coverKey) || t.files[0]).url,
								alt: t.title,
								width: 600,
								height: 400
							})
						}), /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "community-card-body",
							children: [
								e !== "library" && /* @__PURE__ */ (0, _.jsxs)("p", {
									className: "eyebrow",
									children: [
										t.author,
										" · ",
										new Date((e === "gallery" ? an(t.classification.date) : "") || t.createdAt).toLocaleDateString(r())
									]
								}),
								e === "forum" && an(t.classification.area) && /* @__PURE__ */ (0, _.jsx)("p", {
									className: "community-area-tag",
									children: o(an(t.classification.area))
								}),
								/* @__PURE__ */ (0, _.jsxs)("h2", { children: [t.pinned && /* @__PURE__ */ (0, _.jsxs)("span", { children: [o("Angeheftet"), " · "] }), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "card-title-button",
									onClick: () => {
										let n = e === "library" ? t.files.find((e) => e.mime === "application/pdf") : void 0;
										n ? oe(n) : z(t.id);
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
										disabled: re,
										className: "market-primary",
										onClick: () => void _e(t, "approve"),
										children: o("Freigeben")
									}), /* @__PURE__ */ (0, _.jsx)("button", {
										disabled: re,
										className: "club-secondary",
										onClick: () => void _e(t, "reject"),
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
								(e !== "library" || de || S) && /* @__PURE__ */ (0, _.jsx)("div", {
									className: "club-actions",
									children: S ? /* @__PURE__ */ (0, _.jsx)("button", {
										className: "club-secondary",
										disabled: re,
										onClick: () => void _e(t, "restore"),
										children: o("Wiederherstellen")
									}) : /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: t.canEdit && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("button", {
										className: "market-text-button",
										onClick: () => ne(t),
										children: o("Bearbeiten")
									}), e !== "gallery" && e !== "library" && /* @__PURE__ */ (0, _.jsx)("button", {
										className: "market-text-button",
										onClick: () => V(t),
										children: o("Ins Archiv verschieben")
									})] }) })
								})
							]
						})] }, t.id))
					}),
					/* @__PURE__ */ (0, _.jsx)(Bt, {
						page: D,
						pages: l.pages,
						change: O
					})
				] }) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state lib-hint",
					children: o("Bitte Dokumentart und Fahrzeug wählen.")
				})
			]
		}),
		te !== void 0 && /* @__PURE__ */ (0, _.jsx)(ln, {
			kind: e,
			item: te,
			initialDocumentType: p,
			accessClasses: l.accessClasses || ["open"],
			nonce: t,
			close: () => ne(void 0),
			saved: (e) => {
				ne(void 0), H(e.status === "pending" ? "Beitrag zur Prüfung eingereicht." : "Beitrag gespeichert."), z(e.id);
			}
		}),
		ae && /* @__PURE__ */ (0, _.jsx)(U, {
			title: ae.name,
			close: () => oe(null),
			children: /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
				fallback: /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: o("Leseansicht wird geladen …")
				}),
				children: /* @__PURE__ */ (0, _.jsx)($t, {
					url: ae.url,
					title: ae.name,
					initialFullscreen: !0,
					back: () => oe(null)
				})
			})
		}),
		R !== null && /* @__PURE__ */ (0, _.jsx)(un, {
			id: R,
			nonce: t,
			close: () => z(null),
			updated: () => H()
		}),
		B && /* @__PURE__ */ (0, _.jsx)(U, {
			title: "Beitrag archivieren",
			close: () => V(null),
			busy: re,
			children: /* @__PURE__ */ (0, _.jsxs)("div", {
				className: "club-dialog-body",
				children: [
					/* @__PURE__ */ (0, _.jsxs)("p", { children: [
						"«",
						B.title,
						"» ins Archiv verschieben? Sie können den Beitrag dort wiederherstellen."
					] }),
					N && /* @__PURE__ */ (0, _.jsx)("p", {
						role: "alert",
						children: N
					}),
					/* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-actions",
						children: [/* @__PURE__ */ (0, _.jsx)("button", {
							className: "club-secondary",
							disabled: re,
							onClick: () => V(null),
							children: o("Abbrechen")
						}), /* @__PURE__ */ (0, _.jsx)("button", {
							className: "market-primary",
							disabled: re,
							onClick: () => void _e(B, "trash"),
							children: o("Ins Archiv verschieben")
						})]
					})
				]
			})
		})
	] });
}
function ln({ kind: e, item: t, nonce: n, close: r, saved: i, accessClasses: a, initialDocumentType: s }) {
	let c = F(), l = (0, h.useRef)(crypto.randomUUID()), u = (0, h.useRef)(/* @__PURE__ */ new WeakMap()), [d, f] = (0, h.useState)(t ? k(an(t.classification?.documentType)) : s), [p, m] = (0, h.useState)((e === "gallery" ? t?.description : t?.descriptionHtml || t?.description) || ""), [g, v] = (0, h.useState)([]), [y, b] = (0, h.useState)([]), [x, S] = (0, h.useState)(""), [T, E] = (0, h.useState)({}), [D, A] = (0, h.useState)(""), [j, N] = (0, h.useState)([]), [ee, P] = (0, h.useState)(""), [I, te] = (0, h.useState)(!1), [ne, R] = (0, h.useState)(!1), z = (0, h.useRef)(!1);
	(0, h.useEffect)(() => {
		if (e !== "gallery") return;
		let t = new AbortController();
		return C(en, { operation: "gallery-events" }, t.signal).then(v).catch((e) => {
			t.signal.aborted || P(e.message);
		}), () => t.abort();
	}, [e]), (0, h.useEffect)(() => {
		if (e !== "gallery" || t) return;
		let n = new AbortController();
		return C(en, { operation: "albums" }, n.signal).then(b).catch((e) => {
			n.signal.aborted || P(e.message);
		}), () => n.abort();
	}, [e, t]);
	function B(t) {
		P("");
		let n = e === "gallery" ? 20 : 6;
		if (j.length + t.length > n) {
			P(`Bitte höchstens ${n} ${e === "gallery" ? "Galeriebilder" : "Dateien"} auswählen.`);
			return;
		}
		let r = [
			"image/jpeg",
			"image/png",
			"image/webp",
			...e === "gallery" ? [] : ["application/pdf"]
		];
		if (t.some((t) => !r.includes(t.type) || t.size < (e === "gallery" ? 25e5 : 1) || t.size > (e === "library" && t.type === "application/pdf" ? 100 : 20) * 1024 * 1024)) {
			P(e === "gallery" ? "Galeriebilder: mindestens 2,5 MB und höchstens 20 MB." : "Bilder: maximal 20 MB. Bibliotheks-PDFs: maximal 100 MB; sonst 20 MB.");
			return;
		}
		if (e !== "gallery" && [...j, ...t].reduce((e, t) => e + t.size, 0) > 120 * 1024 * 1024) {
			P("Alle Dateien zusammen dürfen höchstens 120 MB gross sein.");
			return;
		}
		N((e) => [...e, ...t]);
	}
	async function V(r) {
		if (!z.current) {
			if (!t && e !== "forum" && !j.length) {
				P("Bitte mindestens eine Datei auswählen.");
				return;
			}
			z.current = !0, te(!0), P("");
			try {
				let a = new FormData(r);
				if (a.set("operation", x ? "append" : t ? "edit" : "create"), a.set("kind", e), a.set("requestId", l.current), a.set("description", p), t && a.set("id", String(t.id)), x && a.set("id", x), e === "library") {
					let e = a.getAll("models[]").filter((e) => typeof e == "string");
					a.delete("models[]"), a.set("models", JSON.stringify(e));
				}
				if (e === "gallery" && j.length) {
					let e = null, r = x || String(t?.id || ""), o = [];
					for (let t of j) {
						let i = new FormData();
						for (let [e, t] of a.entries()) i.append(e, t);
						i.set("operation", r ? "append" : "create"), r && i.set("id", r), i.append("files[]", t), u.current.has(t) || u.current.set(t, crypto.randomUUID()), i.set("fileToken", u.current.get(t)), A(`${j.indexOf(t) + 1} / ${j.length} · ${t.name}`), i.set("caption", T[t.name + "-" + t.size] || "");
						try {
							e = await w(en, n, i), r = String(e.id), S(r);
						} catch (e) {
							o.push(t.name + ": " + e.message);
						}
					}
					if (o.length) {
						N(j.filter((e) => o.some((t) => t.startsWith(e.name + ": ")))), P("Gespeicherte Bilder bleiben erhalten. Fehlgeschlagen: " + o.join(" · "));
						return;
					}
					e && i(e);
				} else j.forEach((e) => a.append("files[]", e)), i(await w(en, n, a));
			} catch (e) {
				P(e.message);
			} finally {
				z.current = !1, te(!1);
			}
		}
	}
	return e === "library" && !d ? /* @__PURE__ */ (0, _.jsx)(U, {
		title: o("Dokumentart auswählen"),
		close: r,
		children: /* @__PURE__ */ (0, _.jsx)("div", {
			className: "library-type-grid",
			children: c.libraryTypes.filter((e) => a.includes(e.access)).map((e) => /* @__PURE__ */ (0, _.jsxs)("button", {
				className: "editorial-card",
				onClick: () => f(e.key),
				children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, _.jsxs)("span", { children: [O[e.access], " · PDF bis 100 MB"] })]
			}, e.key))
		})
	}) : /* @__PURE__ */ (0, _.jsx)(U, {
		title: t ? e === "gallery" ? "Album bearbeiten" : "Beitrag bearbeiten" : e === "library" ? (c.libraryTypes.find((e) => e.key === d)?.label || "Dokument") + " hochladen" : rn[e].create,
		close: r,
		busy: I,
		children: /* @__PURE__ */ (0, _.jsxs)("form", {
			className: "club-form",
			onSubmit: (e) => {
				e.preventDefault(), V(e.currentTarget);
			},
			children: [
				/* @__PURE__ */ (0, _.jsxs)("fieldset", {
					disabled: I,
					children: [
						e === "gallery" && !t && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Album"), /* @__PURE__ */ (0, _.jsxs)("select", {
							value: x,
							onChange: (e) => S(e.target.value),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Neues Album anlegen")
							}), y.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e.id,
								children: e.title
							}, e.id))]
						})] }),
						(!x || e !== "gallery") && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Titel"), /* @__PURE__ */ (0, _.jsx)("input", {
							name: "title",
							required: !0,
							maxLength: 160,
							defaultValue: t?.title || ""
						})] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fahrzeugmodell (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "model",
								defaultValue: an(t?.classification?.model),
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Alle Modelle / keine Zuordnung")
								}), L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))]
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bereich"), /* @__PURE__ */ (0, _.jsx)("select", {
								name: "area",
								defaultValue: an(t?.classification?.area) || "Technik",
								children: c.areas.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(e)
								}, e))
							})] })]
						}),
						e === "library" && c.libraryTypes.find((e) => e.key === d)?.fields.includes("model") && /* @__PURE__ */ (0, _.jsxs)("label", { children: [
							o("Fahrzeugmodelle (optional)"),
							/* @__PURE__ */ (0, _.jsx)("select", {
								name: "models[]",
								multiple: !0,
								size: 5,
								defaultValue: t && Array.isArray(t.classification.models) ? t.classification.models : an(t?.classification?.model) ? [an(t?.classification?.model)] : [],
								children: L.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: e
								}, e))
							}),
							/* @__PURE__ */ (0, _.jsx)("small", { children: o("Mehrere Modelle mit ⌘-Klick oder Strg-Klick auswählen.") })
						] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Technikbereich (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
							name: "component",
							defaultValue: an(t?.classification?.component),
							children: [/* @__PURE__ */ (0, _.jsx)("option", {
								value: "",
								children: o("Bitte wählen")
							}), c.components.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
								value: e,
								children: o(e)
							}, e))]
						})] }),
						e === "forum" && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "club-hint",
							children: "Für Reiseberichte und lange Mitgliederbeiträge eignet sich der Bereich «Events & Reisen». PDF-Dateien können Sie zusammen mit dem Beitrag hochladen."
						}),
						e === "gallery" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kategorie"), /* @__PURE__ */ (0, _.jsx)("select", {
								name: "galleryCategory",
								defaultValue: an(t?.classification?.galleryCategory) || "events",
								children: Object.entries(tn).map(([e, t]) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e,
									children: o(t)
								}, e))
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Veranstaltung (optional)"), /* @__PURE__ */ (0, _.jsxs)("select", {
								name: "eventId",
								defaultValue: an(t?.classification?.eventId),
								children: [/* @__PURE__ */ (0, _.jsx)("option", {
									value: "",
									children: o("Keine Zuordnung")
								}), g.map((e) => /* @__PURE__ */ (0, _.jsx)("option", {
									value: e.id,
									children: e.title
								}, e.id))]
							})] }),
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Fotograf/in *"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "photographer",
								required: !0,
								maxLength: 160,
								defaultValue: an(t?.classification?.photographer)
							})] }),
							!x && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Anlass / Veranstaltung (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "occasion",
								maxLength: 160,
								defaultValue: an(t?.classification?.occasion)
							})] }), /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Aufnahmedatum (optional)"), /* @__PURE__ */ (0, _.jsx)("input", {
								name: "date",
								type: "date",
								defaultValue: an(t?.classification?.date)
							})] })] })
						] }),
						e === "library" && /* @__PURE__ */ (0, _.jsx)(M, {
							type: d,
							initial: t?.classification || {},
							accessClasses: a,
							definitions: c.libraryTypes
						}, d),
						e === "gallery" ? !x && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Kurze Anekdote zum Anlass (optional)"), /* @__PURE__ */ (0, _.jsx)("textarea", {
							value: p,
							maxLength: 500,
							rows: 4,
							onChange: (e) => m(e.target.value),
							disabled: I
						})] }) : /* @__PURE__ */ (0, _.jsx)(Re, {
							label: e === "forum" ? "Beitrag" : "Beschreibung",
							value: p,
							onChange: m,
							disabled: I
						}),
						!t && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsxs)("div", {
							className: `market-dropzone ${ne ? "is-dragging" : ""}`,
							onDragOver: (e) => {
								e.preventDefault(), I || R(!0);
							},
							onDragLeave: () => R(!1),
							onDrop: (e) => {
								e.preventDefault(), R(!1), I || B(Array.from(e.dataTransfer.files));
							},
							children: [
								/* @__PURE__ */ (0, _.jsx)("strong", { children: e === "gallery" ? "Fotos hier hineinziehen" : "Dateien hier hineinziehen" }),
								/* @__PURE__ */ (0, _.jsx)("span", { children: o("oder vom Gerät auswählen") }),
								/* @__PURE__ */ (0, _.jsx)("input", {
									type: "file",
									multiple: !0,
									accept: e === "gallery" ? "image/jpeg,image/png,image/webp" : "image/jpeg,image/png,image/webp,application/pdf",
									"aria-label": "Dateien auswählen",
									onChange: (e) => {
										B(Array.from(e.target.files || [])), e.target.value = "";
									}
								}),
								/* @__PURE__ */ (0, _.jsxs)("small", { children: [
									e === "gallery" ? "Bis zu 20 Bilder · je 2,5 bis 20 MB" : "Bis zu 6 Dateien · Bilder bis 20 MB",
									e === "library" ? " · PDFs bis 100 MB" : "",
									e === "gallery" ? " · einzeln übertragen" : " · insgesamt 120 MB",
									" · JPG, PNG, WebP",
									e === "gallery" || e === "forum" ? "" : " oder PDF",
									e === "forum" ? " oder PDF · optional" : ""
								] })
							]
						}), /* @__PURE__ */ (0, _.jsx)("ul", {
							className: "upload-list",
							children: j.map((t, n) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
								/* @__PURE__ */ (0, _.jsxs)("span", { children: [
									t.name,
									" · ",
									(t.size / 1024 / 1024).toFixed(1),
									" MB"
								] }),
								e === "gallery" && /* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Bildbeschriftung"), /* @__PURE__ */ (0, _.jsx)("input", {
									maxLength: 240,
									value: T[t.name + "-" + t.size] || "",
									onChange: (e) => E((n) => ({
										...n,
										[t.name + "-" + t.size]: e.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, _.jsx)("button", {
									type: "button",
									className: "market-text-button",
									"aria-label": `${t.name} entfernen`,
									onClick: () => N((e) => e.filter((e, t) => t !== n)),
									children: o("Entfernen")
								})
							] }, `${n}-${t.name}`))
						})] }),
						!t && (e !== "forum" || j.length > 0) && /* @__PURE__ */ (0, _.jsxs)("label", {
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
				I && D && /* @__PURE__ */ (0, _.jsx)("p", {
					role: "status",
					children: D
				}),
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "club-hint",
					children: [
						e === "library" ? "Sichtbarkeit gemäss gewählter Zugriffsklasse." : "Sichtbar für Clubmitglieder.",
						" ",
						o("Laden Sie nur Material hoch, das Sie teilen dürfen.")
					]
				}),
				ee && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "collection-state error",
					role: "alert",
					children: ee
				}),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "club-actions",
					children: [/* @__PURE__ */ (0, _.jsx)("button", {
						type: "button",
						className: "club-secondary",
						disabled: I,
						onClick: r,
						children: o("Abbrechen")
					}), /* @__PURE__ */ (0, _.jsx)("button", {
						className: "market-primary",
						disabled: I,
						children: I ? "Wird gespeichert …" : t ? "Änderungen speichern" : "Zur Prüfung einreichen"
					})]
				})
			]
		})
	});
}
function un({ id: e, nonce: t, close: n, updated: i }) {
	let a = F();
	function s(e, t) {
		let n = an(t);
		return e === "documentType" ? o(a.libraryTypes.find((e) => e.key === n)?.label || n) : e === "language" ? o({
			de: "Deutsch",
			fr: "Français",
			en: "English",
			multi: "Mehrsprachig",
			other: "Nicht angegeben"
		}[n] || n) : e === "galleryCategory" ? o(tn[n] || n) : n;
	}
	let [c, l] = (0, h.useState)(null), [u, d] = (0, h.useState)(1), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)(""), [y, b] = (0, h.useState)(!0), [x, S] = (0, h.useState)(""), [E, D] = (0, h.useState)(!1), [O, k] = (0, h.useState)(0), [A, j] = (0, h.useState)(null), [M, N] = (0, h.useState)(!1), [ee, P] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		let t = new AbortController();
		return C(en, {
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
			await w(en, t, T({
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
	let L = c?.files.filter((e) => e.mime.startsWith("image/")) || [], te = Object.entries(c?.classification || {}).filter(([e, t]) => e !== "access" && e !== "eventId" && (Array.isArray(t) ? t.length > 0 : typeof t == "string" && t.trim() !== "")).map(([e, t]) => ({
		key: e,
		label: o(nn[e] || e),
		value: s(e, t)
	})), ne = A && A.key === L[O]?.key ? A.value : L[O]?.caption || "", [R, z] = (0, h.useState)(null), [B, V] = (0, h.useState)(null);
	async function re(n, r) {
		D(!0);
		try {
			return await w(en, t, T({
				operation: n,
				id: String(e),
				...r
			})), V(null), p((e) => e + 1), i(), !0;
		} catch (e) {
			return g(e.message), !1;
		} finally {
			D(!1);
		}
	}
	async function ie() {
		let e = L[O];
		if (!(!c || !e)) {
			N(!0), g("");
			try {
				await w(en, t, T({
					operation: "captions",
					id: String(c.id),
					key: e.key,
					caption: ne
				})), j(null), p((e) => e + 1), i();
			} catch (e) {
				g(e.message);
			} finally {
				N(!1);
			}
		}
	}
	return /* @__PURE__ */ (0, _.jsx)(U, {
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
				te.length > 4 ? /* @__PURE__ */ (0, _.jsxs)("details", {
					className: "community-classification",
					children: [/* @__PURE__ */ (0, _.jsxs)("summary", { children: [
						o("Beitragsdetails"),
						" (",
						te.length,
						")"
					] }), /* @__PURE__ */ (0, _.jsx)("dl", { children: te.map((e) => /* @__PURE__ */ (0, _.jsxs)("div", { children: [/* @__PURE__ */ (0, _.jsx)("dt", { children: e.label }), /* @__PURE__ */ (0, _.jsx)("dd", { children: e.value })] }, e.key)) })]
				}) : te.length > 0 && /* @__PURE__ */ (0, _.jsx)("p", {
					className: "club-hint",
					children: te.map((e) => `${e.label}: ${e.value}`).join(" · ")
				}),
				c.kind === "gallery" && an(c.classification.eventId) && /* @__PURE__ */ (0, _.jsx)("p", { children: /* @__PURE__ */ (0, _.jsx)("a", {
					href: "#veranstaltung/" + an(c.classification.eventId),
					children: o("Zugehörige Veranstaltung")
				}) }),
				c.canReview && c.kind === "gallery" && /* @__PURE__ */ (0, _.jsx)(fn, {
					item: c,
					busy: E,
					act: re
				}),
				" ",
				c.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(he, { html: c.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", {
					className: "community-description",
					children: c.description
				}),
				L.length > 0 && /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "community-gallery",
					children: [
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "community-gallery-main" + (ee ? " is-zoomed" : ""),
							onClick: () => P((e) => !e),
							"aria-label": ee ? "Bild verkleinern" : "Bild vergrössern",
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
										await w(en, t, T({
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
								value: ne,
								onChange: (e) => j({
									key: L[O].key,
									value: e.target.value
								}),
								disabled: M
							})] }), /* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								className: "club-secondary",
								disabled: M,
								onClick: () => void ie(),
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
				R && /* @__PURE__ */ (0, _.jsx)($t, {
					url: R.url,
					title: R.name,
					back: () => z(null)
				}),
				/* @__PURE__ */ (0, _.jsx)("ul", {
					className: "community-files",
					children: c.files.map((e) => /* @__PURE__ */ (0, _.jsxs)("li", { children: [
						e.mime === "application/pdf" && /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "market-text-button",
							onClick: () => z(e),
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
						onClick: () => void re("pin", { pinned: c.pinned ? "0" : "1" }),
						children: o(c.pinned ? "Anheftung entfernen" : "Thema anheften")
					}), /* @__PURE__ */ (0, _.jsx)(dn, {
						id: e,
						merge: (e) => void re("merge", { target: String(e) }),
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
									await w(en, t, T({
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
									await w(en, t, T({
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
									onClick: () => V({
										id: e.id,
										text: e.text
									}),
									children: o("Bearbeiten")
								}), /* @__PURE__ */ (0, _.jsx)("button", {
									className: "market-text-button",
									disabled: E,
									onClick: () => void re("reply-hide", { reply: String(e.id) }),
									children: o("Antwort ausblenden")
								})]
							})
						] }, e.id))
					}),
					B && /* @__PURE__ */ (0, _.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault(), re("reply-edit", {
								reply: String(B.id),
								text: B.text
							});
						},
						children: [
							/* @__PURE__ */ (0, _.jsxs)("label", { children: [o("Antwort bearbeiten"), /* @__PURE__ */ (0, _.jsx)("textarea", {
								required: !0,
								maxLength: 5e3,
								value: B.text,
								onChange: (e) => V({
									...B,
									text: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, _.jsx)("button", {
								disabled: E,
								children: o("Speichern")
							}),
							/* @__PURE__ */ (0, _.jsx)("button", {
								type: "button",
								onClick: () => V(null),
								children: o("Abbrechen")
							})
						]
					}),
					/* @__PURE__ */ (0, _.jsx)(Bt, {
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
function dn({ id: e, merge: t, busy: n }) {
	let [r, i] = (0, h.useState)(""), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	return (0, h.useEffect)(() => {
		let t = new AbortController();
		return C(en, {
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
function fn({ item: e, busy: t, act: n }) {
	let [r, i] = (0, h.useState)([]), [a, s] = (0, h.useState)([]), [c, l] = (0, h.useState)(""), [u, d] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(en, { operation: "albums" }, e.signal).then(s).catch((t) => {
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
var pn = {
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
	directory: "Mitgliederverzeichnis",
	contact: "Kontakt",
	privacy: "Datenschutz",
	statutes: "Statuten",
	"event-admin": "Agenda verwalten",
	editorial: "Redaktion"
};
function mn({ page: e, subroute: t }) {
	let { text: n } = me();
	if (e === "home") return null;
	let r = [
		"history",
		"triungsters",
		"organisation",
		"mission",
		"membership",
		"models"
	].includes(e) ? [["#club", "Club"]] : [
		"profile",
		"applications",
		"forum",
		"gallery",
		"library",
		"directory",
		"editorial"
	].includes(e) ? [["#mitglieder", "Mitgliederbereich"]] : e === "registration" || e === "event-admin" ? [["#agenda", "Agenda"]] : e === "shop" ? [["#marktplatz", "Marktplatz"]] : [], i = e === "regions" && t ? t.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ") : e === "models" && t ? n("model-" + t + ".title", t.toUpperCase()) : e === "editorial" && t ? n(t + ".title", "Seite bearbeiten") : "", a = e === "regions" ? "regionen" : e === "models" ? "tr-modelle" : "redaktion";
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
				href: "#" + a,
				children: o(pn[e])
			}) }), /* @__PURE__ */ (0, _.jsx)("li", {
				"aria-current": "page",
				children: o(i)
			})] }) : /* @__PURE__ */ (0, _.jsx)("li", {
				"aria-current": "page",
				children: o(pn[e] || "Swiss TR-Club")
			})
		] })
	});
}
//#endregion
//#region app/components/MemberForms.tsx
var hn = "strc_forms";
function gn() {
	let [e, t] = (0, h.useState)(""), [n, r] = (0, h.useState)(""), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(!1), l = (0, h.useRef)(!1), u = (0, h.useRef)("");
	return (0, h.useEffect)(() => {
		C(hn, { operation: "config" }).then((e) => t(e.nonce)).catch(() => r("Kontaktformular konnte nicht geladen werden. Bitte die Seite neu laden."));
	}, []), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "contact-form-section",
		children: [
			/* @__PURE__ */ (0, _.jsx)("h2", { children: "Kontakt aufnehmen" }),
			/* @__PURE__ */ (0, _.jsx)("p", { children: "Felder mit * sind erforderlich." }),
			i ? /* @__PURE__ */ (0, _.jsx)(R, { message: i }) : /* @__PURE__ */ (0, _.jsxs)("form", {
				className: "club-form",
				onSubmit: async (t) => {
					if (t.preventDefault(), l.current) return;
					let n = new FormData(t.currentTarget);
					n.set("operation", "contact"), u.current ||= crypto.randomUUID(), n.set("requestId", u.current), l.current = !0, c(!0), r("");
					try {
						a((await w(hn, e, n)).message);
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
					/* @__PURE__ */ (0, _.jsx)(ie, {}),
					/* @__PURE__ */ (0, _.jsx)(R, { error: n }),
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
function _n() {
	let [e, t] = (0, h.useState)(null), [n, r] = (0, h.useState)(0), [i, a] = (0, h.useState)(""), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(null), [p, m] = (0, h.useState)(null), g = (0, h.useRef)(""), y = (0, h.useRef)(""), b = (0, h.useRef)(!1);
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C(hn, { operation: "profile-read" }, e.signal).then(t).catch((t) => {
			e.signal.aborted || a(t.message);
		}), () => e.abort();
	}, [n]);
	async function x(t) {
		if (!(!e || b.current)) {
			b.current = !0, u(!0), a(""), c("");
			try {
				c((await w(hn, e.nonce, t)).message), r((e) => e + 1), f(null), m(null), y.current = "";
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
			/* @__PURE__ */ (0, _.jsx)(R, {
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
				/* @__PURE__ */ (0, _.jsxs)(z, {
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
								/* @__PURE__ */ (0, _.jsx)(V, {
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
				/* @__PURE__ */ (0, _.jsxs)(z, {
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
								a(""), g.current = crypto.randomUUID(), f(ne());
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
				d && /* @__PURE__ */ (0, _.jsx)(U, {
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
									/* @__PURE__ */ (0, _.jsx)(re, {
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
							/* @__PURE__ */ (0, _.jsx)(R, { error: i }),
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
				p && /* @__PURE__ */ (0, _.jsx)(U, {
					title: "Fahrzeug entfernen",
					close: () => m(null),
					busy: l,
					children: /* @__PURE__ */ (0, _.jsxs)("div", {
						className: "club-dialog-body",
						children: [
							/* @__PURE__ */ (0, _.jsxs)("p", { children: [p.model, " aus Ihrer Fahrzeugliste entfernen? Bisherige Veranstaltungsanmeldungen bleiben erhalten."] }),
							/* @__PURE__ */ (0, _.jsx)(R, { error: i }),
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
var vn = {
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
}, yn = {
	single: "Einzelmitgliedschaft",
	couple: "Paarmitgliedschaft",
	young: "Young / TRiungsters"
}, bn = [
	"queued",
	"syncing",
	"provisioning",
	"mail_pending"
];
function xn({ person: e, title: t }) {
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
function Sn({ nonce: e }) {
	let [t, n] = (0, h.useState)(null), [r, i] = (0, h.useState)(null), [a, s] = (0, h.useState)(1), [c, l] = (0, h.useState)(0), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)(!1), [m, g] = (0, h.useState)(""), [v, y] = (0, h.useState)("");
	(0, h.useEffect)(() => {
		let e = new AbortController();
		return C("strc_applications", { page: String(a) }, e.signal).then(n).catch((t) => {
			e.signal.aborted || d(t.message);
		}), () => e.abort();
	}, [a, c]), (0, h.useEffect)(() => {
		if (!r || !bn.includes(r.state)) return;
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
			/* @__PURE__ */ (0, _.jsx)(R, { error: u }),
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
									/* @__PURE__ */ (0, _.jsx)("span", { children: yn[e.type] || e.type }),
									/* @__PURE__ */ (0, _.jsx)("small", { children: vn[e.state] || "Manueller Abgleich erforderlich" })
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
							children: vn[r.state] || "Manueller Abgleich erforderlich"
						}),
						r.error && /* @__PURE__ */ (0, _.jsx)("p", {
							className: "form-error",
							role: "alert",
							children: r.error
						}),
						/* @__PURE__ */ (0, _.jsxs)("p", { children: [
							/* @__PURE__ */ (0, _.jsx)("strong", { children: yn[r.payload.membershipType] }),
							" · Region ",
							r.payload.region
						] }),
						/* @__PURE__ */ (0, _.jsxs)("div", {
							className: "club-form-row",
							children: [/* @__PURE__ */ (0, _.jsx)(xn, {
								person: r.payload.person,
								title: "Antragsteller/in"
							}), r.payload.copilot && /* @__PURE__ */ (0, _.jsx)(xn, {
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
									disabled: f || bn.includes(r.state)
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
			v && r && /* @__PURE__ */ (0, _.jsxs)(U, {
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
function Cn() {
	let { text: e, values: t } = me(), n = (t.home?.photos ?? []).filter((e) => e.url).slice(0, 12), r = n.slice(0, 6), i = n.slice(6, 12), a = (e, t) => /* @__PURE__ */ (0, _.jsx)("div", {
		className: `home-reference-half is-${t}`,
		children: /* @__PURE__ */ (0, _.jsx)("div", {
			className: `home-reference-track${e.length > 1 ? " is-moving" : ""} ${t === "left" ? "to-right" : "to-left"}`,
			children: (e.length > 1 ? [0, 1] : [0]).map((t) => /* @__PURE__ */ (0, _.jsx)("div", {
				className: "home-reference-photo-set",
				"aria-hidden": t === 1,
				children: e.map((e, n) => /* @__PURE__ */ (0, _.jsx)("figure", { children: /* @__PURE__ */ (0, _.jsx)(v, {
					src: H(e.url),
					alt: t === 0 ? e.alt : "",
					width: 640,
					height: 480,
					priority: t === 0 && n < 2,
					style: ye(e.frame, "cover")
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
					})] }), /* @__PURE__ */ (0, _.jsx)(ge, {
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
				/* @__PURE__ */ (0, _.jsx)(ge, {
					id: "home.mission",
					className: "home-reference-story"
				})
			]
		})
	});
}
//#endregion
//#region app/components/Magazine.tsx
var wn = (0, h.lazy)(() => import("./MagazineReader-C4i17Z2c.js"));
function Tn({ issue: e, loading: t, error: r, retry: i }) {
	let { language: a } = n(), s = (e, t) => a === "fr" ? t : e, [c, l] = (0, h.useState)(!1), [u, d] = (0, h.useState)(!1), [f, p] = (0, h.useState)(0), [m, g] = (0, h.useState)(!1), y = (0, h.useRef)(null), b = (0, h.useRef)(!1), x = (e?.previewPages || []).slice(0, 6), S = Math.min(f, Math.max(0, x.length - 1)), C = e?.previewCaptions?.[S] || `${s("Vorschau", "Aperçu")} ${S + 1} · ${e?.title || ""}`;
	(0, h.useEffect)(() => {
		if (!e || b.current || new URLSearchParams(window.location.search).get("magazine") !== String(e.id)) return;
		b.current = !0;
		let t = requestAnimationFrame(() => {
			l(!0), d(e.canRead);
		});
		return () => {
			cancelAnimationFrame(t), b.current = !1;
		};
	}, [e]);
	function w() {
		l(!1), g(!1), d(!1);
		let e = new URL(window.location.href);
		e.searchParams.delete("magazine"), window.history.replaceState(null, "", e), requestAnimationFrame(() => y.current?.focus({ preventScroll: !0 }));
	}
	let T = x[S] || e?.cover, E = x.length > 1 && /* @__PURE__ */ (0, _.jsxs)("div", {
		className: "magazine-spread-pager",
		children: [
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: S === 0,
				onClick: () => p(S - 1),
				"aria-label": s("Vorherige Vorschau", "Aperçu précédent"),
				children: "←"
			}),
			/* @__PURE__ */ (0, _.jsxs)("span", {
				"aria-live": "polite",
				children: [
					S + 1,
					" / ",
					x.length
				]
			}),
			/* @__PURE__ */ (0, _.jsx)("button", {
				className: "club-secondary",
				disabled: S === x.length - 1,
				onClick: () => p(S + 1),
				"aria-label": s("Nächste Vorschau", "Aperçu suivant"),
				children: "→"
			})
		]
	});
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "home-magazine",
		id: "home-magazine",
		"aria-label": s("Das TR-Magazin", "Le TR-Magazine"),
		children: [
			/* @__PURE__ */ (0, _.jsxs)("a", {
				className: `home-preview-card home-tile-magazine${T ? " has-cover" : ""}`,
				href: "#home-magazine",
				"aria-haspopup": "dialog",
				"aria-disabled": t,
				onClick: (n) => {
					if (n.preventDefault(), !t) {
						if (r) {
							i();
							return;
						}
						y.current = n.currentTarget, d(!!e?.canRead), l(!0);
					}
				},
				children: [T ? /* @__PURE__ */ (0, _.jsx)("div", {
					className: "home-tile-cover",
					children: /* @__PURE__ */ (0, _.jsx)(v, {
						unoptimized: !0,
						src: T,
						alt: C,
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
						/* @__PURE__ */ (0, _.jsx)("h2", { children: e?.title || s("Das TR-Magazin", "Le TR-Magazine") }),
						/* @__PURE__ */ (0, _.jsx)("p", { children: r ? s("Die Ausgabe konnte nicht geladen werden. Hier erneut versuchen.", "L’édition n’a pas pu être chargée. Réessayer ici.") : t ? s("Magazin wird geladen …", "Chargement du magazine…") : x.length ? C : e?.teaser || s("Die aktuelle Ausgabe wird hier ergänzt.", "La dernière édition sera ajoutée ici.") })
					]
				})]
			}),
			x.length > 1 && /* @__PURE__ */ (0, _.jsx)("div", {
				className: "magazine-home-pager",
				children: E
			}),
			c && /* @__PURE__ */ (0, _.jsx)(U, {
				title: e?.title || s("Das TR-Magazin", "Le TR-Magazine"),
				close: m ? () => g(!1) : w,
				children: u && e?.canRead ? /* @__PURE__ */ (0, _.jsx)(h.Suspense, {
					fallback: /* @__PURE__ */ (0, _.jsx)("p", {
						role: "status",
						children: s("Leseansicht wird geladen …", "Chargement du lecteur…")
					}),
					children: /* @__PURE__ */ (0, _.jsx)(wn, {
						url: e.fileUrl,
						title: e.title,
						initialFullscreen: !0,
						back: () => d(!1)
					})
				}) : /* @__PURE__ */ (0, _.jsxs)("div", {
					className: "home-magazine-preview",
					children: [
						T && /* @__PURE__ */ (0, _.jsx)("button", {
							className: `magazine-spread-stage${m ? " is-zoomed" : ""}`,
							onClick: () => g((e) => !e),
							"aria-label": s(m ? "Verkleinern" : "Vorschau vergrössern", m ? "Réduire" : "Agrandir l’aperçu"),
							children: /* @__PURE__ */ (0, _.jsx)(v, {
								unoptimized: !0,
								className: "magazine-spread-image",
								src: T,
								alt: C,
								width: 1800,
								height: 1300
							})
						}),
						T && /* @__PURE__ */ (0, _.jsx)("p", { children: C }),
						E,
						/* @__PURE__ */ (0, _.jsx)("p", { children: e?.teaser || s("Die aktuelle Ausgabe wird hier ergänzt.", "La dernière édition sera ajoutée ici.") }),
						e?.canRead ? /* @__PURE__ */ (0, _.jsxs)("button", {
							className: "home-button",
							onClick: () => d(!0),
							children: [s("Magazin lesen", "Lire le magazine"), " →"]
						}) : e && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("p", { children: s("Die vollständige Ausgabe ist für Clubmitglieder.", "L’édition complète est réservée aux membres.") }), /* @__PURE__ */ (0, _.jsxs)("a", {
							className: "home-button",
							href: e.loginUrl,
							children: [s("Anmelden & lesen", "Se connecter et lire"), " →"]
						})] }),
						/* @__PURE__ */ (0, _.jsx)("button", {
							className: "home-text-link",
							onClick: w,
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
var En;
function Dn() {
	let e = new Intl.DateTimeFormat("en", {
		timeZone: "Europe/Zurich",
		year: "numeric",
		month: "numeric",
		day: "numeric"
	}).formatToParts(/* @__PURE__ */ new Date()), t = (t) => Number(e.find((e) => e.type === t)?.value), n = Math.floor(Date.UTC(t("year"), t("month") - 1, t("day")) / 864e5);
	if (En?.day === n) return En.cycle;
	let r = 0;
	try {
		let e = JSON.parse(sessionStorage.getItem("strc_home_cycle") || "null");
		e && Number.isSafeInteger(e.cycle) && e.cycle >= 0 && Number.isSafeInteger(e.day) && (r = (e.cycle + Math.max(1, n - e.day)) % 2147483647), sessionStorage.setItem("strc_home_cycle", JSON.stringify({
			day: n,
			cycle: r
		}));
	} catch {}
	return En = {
		day: n,
		cycle: r
	}, r;
}
function On({ content: e, loading: t, error: i, retry: a, events: o, eventsState: s, openNews: c, openEvent: l }) {
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
				/* @__PURE__ */ (0, _.jsx)(Tn, {
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
var kn = (e) => new Date(e).toLocaleDateString(r(), {
	day: "numeric",
	month: "long",
	year: "numeric"
});
function An({ memberAccess: e, archive: t = !1, upcomingEvents: r, eventsState: i = "ready", openEvent: a }) {
	let { text: s, values: c } = me(), { language: l } = n(), u = c.home?.partners ?? [], [d, f] = (0, h.useState)(null), [p, m] = (0, h.useState)(""), [g, y] = (0, h.useState)(0), [b, x] = (0, h.useState)(null), [S, w] = (0, h.useState)(!1), [T, E] = (0, h.useState)(""), [D] = (0, h.useState)(Dn);
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
			!t && /* @__PURE__ */ (0, _.jsx)(Cn, {}),
			!t && /* @__PURE__ */ (0, _.jsx)(On, {
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
											children: kn(e.date)
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
								src: H(e.image),
								alt: e.name,
								width: 150,
								height: 90
							})
						}, e.name))
					})]
				})
			}),
			b && /* @__PURE__ */ (0, _.jsx)(U, {
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
								kn(b.date)
							]
						}),
						b.image && /* @__PURE__ */ (0, _.jsx)(v, {
							src: b.image,
							alt: "",
							width: 1200,
							height: 800
						}),
						b.bodyHtml ? /* @__PURE__ */ (0, _.jsx)(he, { html: b.bodyHtml }) : /* @__PURE__ */ (0, _.jsx)("p", { children: b.body })
					]
				})
			})
		]
	});
}
//#endregion
//#region app/page.tsx
var jn = window.strcSettings.wordpressUrl ?? "http://localhost:8080", Mn = window.strcSettings.siteUrl ?? "http://localhost:3000", Nn = {
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
function Pn() {
	return /* @__PURE__ */ (0, _.jsx)(i, { children: /* @__PURE__ */ (0, _.jsx)(fe, { children: /* @__PURE__ */ (0, _.jsx)(P, { children: /* @__PURE__ */ (0, _.jsx)(Fn, {}) }) }) });
}
function Fn() {
	let { language: e } = n(), [t, r] = (0, h.useState)("home"), [i, a] = (0, h.useState)(""), [s, l] = (0, h.useState)(null), [u, d] = (0, h.useState)([]), [f, p] = (0, h.useState)("loading"), [m, g] = (0, h.useState)(null), [y, b] = (0, h.useState)(""), { text: x } = me(), [S, C] = (0, h.useState)(0);
	function w() {
		p("loading"), C((e) => e + 1);
	}
	(0, h.useEffect)(() => {
		let e = () => {
			let [e, t = ""] = window.location.hash.slice(1).split("/");
			a(t);
			let n = Object.keys(Nn).find((t) => Nn[t] === e);
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
		return fetch(`${jn}/wp-admin/admin-ajax.php?action=strc_session`, { credentials: "include" }).then((e) => e.ok ? e.json() : Promise.reject()).then((t) => {
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
				let a = await fetch(`${jn}/?rest_route=/strc/v1/events&view=upcoming&limit=100&page=${r}&language=${e}`, {
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
		r(e), g(null), window.location.hash = Nn[e], window.scrollTo({
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
					src: H(x("global.logo")),
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
						s?.memberAccess && /* @__PURE__ */ (0, _.jsx)("button", {
							className: t === "members" ? "active" : "",
							onClick: () => E("members"),
							children: o("Mitgliederbereich")
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
		/* @__PURE__ */ (0, _.jsx)(mn, {
			page: t,
			subroute: i
		}),
		t === "editorial" && (s?.canEditContent ? /* @__PURE__ */ (0, _.jsx)(gt, {
			nonce: s.editorialNonce || "",
			canManageEvents: !!s.canManageEvents
		}) : /* @__PURE__ */ (0, _.jsx)(Kn, {
			session: s,
			navigate: E
		})),
		t === "home" && /* @__PURE__ */ (0, _.jsx)(In, {
			memberAccess: !!s?.memberAccess,
			navigate: E,
			events: u,
			eventsState: f,
			openEvent: g
		}),
		t === "club" && /* @__PURE__ */ (0, _.jsx)(ut, {
			canEdit: !!s?.canEditContent,
			memberAccess: !!s?.memberAccess
		}),
		t === "mission" && /* @__PURE__ */ (0, _.jsx)(dt, {}),
		t === "models" && /* @__PURE__ */ (0, _.jsx)(tt, {
			selected: i,
			canEdit: !!s?.canEditContent
		}, i),
		[
			"organisation",
			"membership",
			"shop",
			"triungsters",
			"history"
		].includes(t) && /* @__PURE__ */ (0, _.jsx)(ft, {
			documentKey: O,
			canEdit: s?.editableDocuments?.includes(O)
		}, O),
		t === "agenda" && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("div", {
			className: "agenda-admin-link",
			children: s?.canManageEvents ? /* @__PURE__ */ (0, _.jsx)("button", {
				className: "market-primary",
				onClick: () => E("event-admin"),
				children: o("Agenda verwalten")
			}) : /* @__PURE__ */ (0, _.jsx)("a", {
				className: "club-secondary",
				href: "#agenda-verwalten",
				children: o("Moderator-Login")
			})
		}), /* @__PURE__ */ (0, _.jsx)(Le, {
			memberAccess: !!s?.memberAccess,
			events: u,
			eventsState: f,
			retryEvents: w,
			openEvent: g
		})] }),
		t === "regions" && /* @__PURE__ */ (0, _.jsx)(Wn, {
			editableDocuments: s?.editableDocuments || [],
			events: u,
			eventsState: f,
			retryEvents: w,
			openEvent: g
		}),
		t === "market" && /* @__PURE__ */ (0, _.jsx)(je, {
			section: i,
			session: s,
			notify: D
		}, i),
		t === "profile" && (s?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(_n, {}) : /* @__PURE__ */ (0, _.jsx)(Kn, {
			session: s,
			navigate: E
		})),
		t === "members" && /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(Kn, {
			session: s,
			navigate: E
		}) }),
		t === "registration" && /* @__PURE__ */ (0, _.jsxs)("section", {
			className: "page-content",
			children: [/* @__PURE__ */ (0, _.jsx)("a", {
				href: "#mitglieder",
				children: o("← Mitgliederbereich")
			}), /* @__PURE__ */ (0, _.jsx)(Mt, {
				eventId: Number(i),
				memberAccess: !!s?.memberAccess
			})]
		}),
		[
			"forum",
			"gallery",
			"library",
			"clubdocs"
		].includes(t) && (s?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(cn, {
			kind: t === "clubdocs" ? "library" : t,
			nonce: s.communityNonce || "",
			selectedId: Number(i) || void 0,
			initialGroup: t === "clubdocs" ? "club" : "",
			title: t === "clubdocs" ? "Clubdokumente" : void 0
		}, `${t}:${i}`) : t === "gallery" ? /* @__PURE__ */ (0, _.jsx)(Xt, {}) : /* @__PURE__ */ (0, _.jsx)(Kn, {
			session: s,
			navigate: E
		})),
		t === "news" && /* @__PURE__ */ (0, _.jsx)(An, {
			navigate: E,
			memberAccess: !!s?.memberAccess,
			upcomingEvents: [],
			eventPreview: {
				title: "",
				text: ""
			},
			archive: !0
		}),
		t === "applications" && (s?.applicationsNonce ? /* @__PURE__ */ (0, _.jsx)(Sn, { nonce: s.applicationsNonce }) : /* @__PURE__ */ (0, _.jsx)(Kn, {
			session: s,
			navigate: E
		})),
		t === "directory" && (s?.memberAccess ? /* @__PURE__ */ (0, _.jsx)(Vt, {}) : /* @__PURE__ */ (0, _.jsx)(Kn, {
			session: s,
			navigate: E
		})),
		t === "event-admin" && (s?.canManageEvents ? /* @__PURE__ */ (0, _.jsx)(Lt, {
			session: s,
			changed: w
		}) : /* @__PURE__ */ (0, _.jsx)(Kn, {
			session: s,
			navigate: E
		})),
		[
			"contact",
			"privacy",
			"statutes"
		].includes(t) && /* @__PURE__ */ (0, _.jsx)(Gn, { page: t }, t),
		/* @__PURE__ */ (0, _.jsxs)("footer", { children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "footer-brand",
				children: [/* @__PURE__ */ (0, _.jsx)(v, {
					className: "footer-logo",
					src: H(x("global.logo")),
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
		(m || T) && /* @__PURE__ */ (0, _.jsx)(qn, {
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
function In({ navigate: e, events: t, eventsState: n, openEvent: r, memberAccess: i }) {
	let a = t[0];
	return /* @__PURE__ */ (0, _.jsx)(An, {
		eventPreview: n === "loading" ? {
			title: o("Termine werden geladen …"),
			text: o("Die nächsten Treffen findest du hier.")
		} : n === "error" ? {
			title: o("Agenda derzeit nicht erreichbar"),
			text: o("Bitte versuche es in der Terminübersicht erneut.")
		} : a ? {
			title: a.title,
			text: `${zn(a.startAt)} · ${a.location || Bn(a)}`
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
function Ln({ eyebrow: e, title: t, text: n, landscape: r }) {
	return /* @__PURE__ */ (0, _.jsxs)("section", {
		className: `page-hero${r ? " regional-hero" : ""}`,
		style: r ? {
			backgroundImage: `linear-gradient(90deg,rgba(10,37,63,.91),rgba(10,37,63,.66)),url("${_e(r)}")`,
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
function Rn(e) {
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
function zn(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? o("Wird bekanntgegeben") : new Intl.DateTimeFormat(r(), {
		dateStyle: "long",
		timeStyle: "short"
	}).format(t);
}
function Bn(e) {
	return o(e.region?.name || e.scope?.name || e.eventType?.name || "Swiss TR-Club");
}
function Vn(e) {
	return o({
		information: "Keine Anmeldung erforderlich",
		scheduled: "Anmeldung öffnet später",
		open: "Anmeldung offen",
		closed: "Anmeldung geschlossen",
		full: "Ausgebucht",
		waiting: "Warteliste offen"
	}[e]);
}
function Hn({ state: e, count: t, retry: n }) {
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
function Un({ event: e, open: t }) {
	let n = Rn(e.startAt);
	return /* @__PURE__ */ (0, _.jsxs)("article", {
		className: "event-card",
		children: [
			/* @__PURE__ */ (0, _.jsxs)("div", {
				className: "event-date",
				children: [/* @__PURE__ */ (0, _.jsx)("strong", { children: n.day }), /* @__PURE__ */ (0, _.jsx)("span", { children: n.month })]
			}),
			/* @__PURE__ */ (0, _.jsxs)("div", { children: [
				/* @__PURE__ */ (0, _.jsx)("p", { children: Bn(e) }),
				/* @__PURE__ */ (0, _.jsx)("h3", { children: e.title }),
				/* @__PURE__ */ (0, _.jsxs)("span", { children: [
					e.location || e.eventType?.name,
					" · ",
					Vn(e.registrationStatus)
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
function Wn({ events: e, eventsState: t, retryEvents: n, openEvent: r, editableDocuments: i }) {
	let { text: a, values: s } = me(), [c, l] = (0, h.useState)([]), [u, d] = (0, h.useState)(""), [f, p] = (0, h.useState)("loading"), [m, g] = (0, h.useState)(0);
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
			n = r, fetch(`${jn}/?rest_route=/strc/v1/regions`, {
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
		/* @__PURE__ */ (0, _.jsx)(Ln, {
			eyebrow: o("Lokal präsent – lokal aktiv"),
			title: v ? `${o("Region")} ${o(v.name)}` : a("regions.title"),
			text: v ? a(`region-${v.slug}.intro`, a("regions.intro")) : a("regions.intro"),
			landscape: v?.slug
		}),
		!u && /* @__PURE__ */ (0, _.jsx)(xe, { documentKey: "regions" }),
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
				f === "ready" && u === "triungsters" && /* @__PURE__ */ (0, _.jsx)(ft, {
					documentKey: "triungsters",
					canEdit: i.includes("triungsters")
				}, "triungsters-region"),
				f === "ready" && u !== "triungsters" && (v ? /* @__PURE__ */ (0, _.jsx)(_.Fragment, { children: /* @__PURE__ */ (0, _.jsx)(We, {
					documentKey: "region-" + v.slug,
					values: s["region-" + v.slug] || { body: v.description },
					canEdit: i.includes("region-" + v.slug),
					events: /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(Hn, {
						state: t,
						count: y.length,
						retry: n
					}), /* @__PURE__ */ (0, _.jsx)("div", {
						className: "events",
						children: y.map((e) => /* @__PURE__ */ (0, _.jsx)(Un, {
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
							style: ve(e.slug),
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
function Gn({ page: e }) {
	let { text: t, error: n, refresh: r } = me();
	return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(Ln, {
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
			}) : t(`${e}.body`) ? /* @__PURE__ */ (0, _.jsx)(ge, { id: `${e}.body` }) : /* @__PURE__ */ (0, _.jsx)("p", { children: o("Dieser Inhalt wurde noch nicht veröffentlicht.") })
		}), e === "contact" && /* @__PURE__ */ (0, _.jsx)(gn, {})]
	})] });
}
function Kn({ session: e, navigate: t }) {
	let { text: n } = me();
	if (e === null) return /* @__PURE__ */ (0, _.jsx)("section", {
		className: "page-content",
		children: /* @__PURE__ */ (0, _.jsx)("p", {
			role: "status",
			children: o("Mitgliederzugang wird geprüft …")
		})
	});
	if (!e.memberAccess) return /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)(Ln, {
		eyebrow: o("Geschützter Bereich"),
		title: n("members.title"),
		text: n("members.intro")
	}), /* @__PURE__ */ (0, _.jsxs)("section", {
		className: "login-panel",
		children: [/* @__PURE__ */ (0, _.jsxs)("form", {
			method: "post",
			action: `${jn}/wp-login.php`,
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
					value: `${Mn}/${window.location.hash || "#mitglieder"}`
				}),
				/* @__PURE__ */ (0, _.jsx)("button", {
					type: "submit",
					children: o("Sicher anmelden →")
				}),
				/* @__PURE__ */ (0, _.jsx)("a", {
					href: `${jn}/wp-login.php?action=lostpassword`,
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
		children: /* @__PURE__ */ (0, _.jsx)(ge, { id: "members.dashboardIntro" })
	}), /* @__PURE__ */ (0, _.jsx)(Yt, { extraTools: r })] });
}
function qn({ event: e, close: t, memberAccess: n }) {
	return /* @__PURE__ */ (0, _.jsx)(U, {
		title: e.title,
		close: t,
		children: /* @__PURE__ */ (0, _.jsxs)("div", {
			className: "event-details",
			children: [
				/* @__PURE__ */ (0, _.jsxs)("p", {
					className: "eyebrow",
					children: [
						Bn(e),
						" · ",
						e.eventType?.name
					]
				}),
				e.descriptionHtml ? /* @__PURE__ */ (0, _.jsx)(he, { html: e.descriptionHtml }) : /* @__PURE__ */ (0, _.jsx)("p", { children: e.description || e.summary }),
				/* @__PURE__ */ (0, _.jsxs)("div", {
					className: "detail-box",
					children: [
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Beginn") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.startAt ? zn(e.startAt) : "Wird bekanntgegeben" }),
						e.endAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Ende") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: zn(e.endAt) })] }),
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Ort") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: e.location || o("Wird bekanntgegeben") }),
						/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung") }),
						/* @__PURE__ */ (0, _.jsx)("strong", { children: Vn(e.registrationStatus) }),
						e.registrationOpenAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung ab") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: zn(e.registrationOpenAt) })] }),
						e.registrationCloseAt && /* @__PURE__ */ (0, _.jsxs)(_.Fragment, { children: [/* @__PURE__ */ (0, _.jsx)("span", { children: o("Anmeldung bis") }), /* @__PURE__ */ (0, _.jsx)("strong", { children: zn(e.registrationCloseAt) })] })
					]
				}),
				e.registrationRequired && (e.externalRegistrationUrl ? /* @__PURE__ */ (0, _.jsx)("a", {
					className: "market-primary",
					href: e.externalRegistrationUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					children: o("Extern anmelden (neuer Tab) →")
				}) : /* @__PURE__ */ (0, _.jsx)(Mt, {
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
var Jn = document.getElementById("strc-app");
Jn && (0, g.createRoot)(Jn).render(/* @__PURE__ */ (0, _.jsx)(Pn, {}));
//#endregion
