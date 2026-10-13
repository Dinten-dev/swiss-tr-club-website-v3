import { o as e, r as t, s as n } from "./UILanguage-DxGOiSxe.js";
//#region app/components/MagazineReader.tsx
var r = n(), i = e(), a = window.strcSettings.assetBase ?? "";
function o({ url: e, title: n, back: o, initialFullscreen: s = !1 }) {
	let c = (0, r.useRef)(null), l = (0, r.useRef)(null), [u, d] = (0, r.useState)(null), [f, p] = (0, r.useState)(1), [m, h] = (0, r.useState)(1), [g, _] = (0, r.useState)(600), [v, y] = (0, r.useState)(""), [b, x] = (0, r.useState)(!0), [S, C] = (0, r.useState)(0), [w, T] = (0, r.useState)(""), [E, D] = (0, r.useState)(!1), [O, k] = (0, r.useState)(s), [A, j] = (0, r.useState)(!1), [M, N] = (0, r.useState)(""), [P, F] = (0, r.useState)([]), [I, L] = (0, r.useState)(!1), R = (0, r.useRef)(0), z = (0, r.useRef)(null);
	(0, r.useEffect)(() => {
		let n = !1, r = () => {
			R.current++;
		}, i;
		return (async () => {
			let t = await import("./pdf-CnPiFuPD.js");
			if (n) return;
			t.GlobalWorkerOptions.workerSrc = `${a}/pdfjs/pdf.worker.min.js`, i = t.getDocument({
				url: e,
				withCredentials: !0,
				rangeChunkSize: 65536,
				cMapUrl: `${a}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${a}/pdfjs/standard_fonts/`,
				wasmUrl: `${a}/pdfjs/wasm/`
			});
			let r = await i.promise;
			n || d(r);
		})().catch(() => {
			n || (y(t("Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen.")), x(!1));
		}), () => {
			n = !0, r(), i?.destroy().catch(() => {});
		};
	}, [e, S]), (0, r.useEffect)(() => {
		let e = l.current;
		if (!e) return;
		let t = new ResizeObserver((e) => _(Math.max(180, e[0].contentRect.width - 24)));
		return t.observe(e), () => t.disconnect();
	}, []), (0, r.useEffect)(() => {
		if (!u || !c.current) return;
		let e = !1, n, r = c.current;
		return (async () => {
			x(!0), T("");
			let t = await u.getPage(f);
			if (e) return;
			let i = t.getViewport({ scale: 1 }), a = Math.min(g / i.width, 1.6) * m, o = Math.min(window.devicePixelRatio || 1, 2), s = t.getViewport({ scale: a * o });
			r.width = Math.floor(s.width), r.height = Math.floor(s.height), r.style.width = `${s.width / o}px`, r.style.height = `${s.height / o}px`, n = t.render({
				canvas: r,
				viewport: s
			}), await n.promise, e || x(!1);
			let c = t.streamTextContent().getReader(), l = "";
			try {
				for (; !e;) {
					let e = await c.read();
					if (e.done) break;
					l += e.value.items.map((e) => e.str ? e.str + (e.hasEOL ? "\n" : " ") : "").join("");
				}
				e || T(l);
			} finally {
				await c.cancel(), c.releaseLock();
			}
		})().catch(() => {
			e || (y(t("Diese Seite konnte nicht angezeigt werden. Bitte erneut versuchen oder die PDF herunterladen.")), x(!1));
		}), () => {
			e = !0, n?.cancel();
		};
	}, [
		u,
		f,
		m,
		g
	]);
	async function B() {
		if (!u || !M.trim()) return;
		let e = ++R.current;
		L(!0), j(!1), F([]);
		let n = [];
		try {
			for (let t = 1; t <= u.numPages; t++) {
				if (e !== R.current) return;
				(await (await u.getPage(t)).getTextContent()).items.map((e) => "str" in e ? e.str : "").join(" ").toLocaleLowerCase().includes(M.trim().toLocaleLowerCase()) && n.push(t);
			}
			e === R.current && (F(n), j(!0), n[0] && p(n[0]));
		} catch {
			y(t("Die Suche konnte nicht abgeschlossen werden."));
		} finally {
			e === R.current && L(!1);
		}
	}
	let V = (e) => {
		u && (p(Math.max(1, Math.min(u.numPages, e))), l.current?.scrollTo({
			top: 0,
			left: 0
		}));
	};
	return /* @__PURE__ */ (0, i.jsxs)("div", {
		className: "magazine-reader" + (O ? " is-fullscreen" : ""),
		onKeyDown: (e) => {
			if (e.key === "Escape" && O) {
				e.preventDefault(), e.stopPropagation(), k(!1);
				return;
			}
			e.target instanceof HTMLInputElement || (e.key === "ArrowLeft" || e.key === "ArrowRight") && (e.preventDefault(), V(f + (e.key === "ArrowRight" ? 1 : -1)));
		},
		children: [
			/* @__PURE__ */ (0, i.jsxs)("div", {
				className: "magazine-reader-toolbar",
				"aria-label": t("Magazin bedienen"),
				children: [
					/* @__PURE__ */ (0, i.jsx)("button", {
						onClick: () => V(f - 1),
						disabled: !u || f === 1,
						children: t("← Zurück")
					}),
					/* @__PURE__ */ (0, i.jsxs)("span", {
						"aria-live": "polite",
						children: [
							t("Seite"),
							" ",
							f,
							" ",
							t("von"),
							" ",
							u?.numPages ?? "…"
						]
					}),
					/* @__PURE__ */ (0, i.jsx)("button", {
						onClick: () => V(f + 1),
						disabled: !u || f === u.numPages,
						children: t("Weiter →")
					}),
					/* @__PURE__ */ (0, i.jsx)("button", {
						onClick: () => h((e) => Math.max(.75, e - .25)),
						disabled: m <= .75,
						"aria-label": t("Seite verkleinern"),
						children: t("− Kleiner")
					}),
					/* @__PURE__ */ (0, i.jsx)("button", {
						onClick: () => h((e) => Math.min(2.5, e + .25)),
						disabled: m >= 2.5,
						"aria-label": t("Seite vergrössern"),
						children: t("+ Grösser")
					}),
					/* @__PURE__ */ (0, i.jsx)("button", {
						onClick: () => D((e) => !e),
						"aria-pressed": E,
						children: t(E ? "Seitenansicht" : "Textansicht")
					})
				]
			}),
			v && /* @__PURE__ */ (0, i.jsxs)("div", {
				className: "collection-state error",
				role: "alert",
				children: [/* @__PURE__ */ (0, i.jsx)("p", { children: v }), /* @__PURE__ */ (0, i.jsx)("button", {
					onClick: () => {
						y(""), d(null), x(!0), p(1), C((e) => e + 1);
					},
					children: t("Erneut versuchen")
				})]
			}),
			/* @__PURE__ */ (0, i.jsxs)("form", {
				className: "magazine-reader-toolbar",
				onSubmit: (e) => {
					e.preventDefault(), B();
				},
				children: [
					/* @__PURE__ */ (0, i.jsxs)("label", { children: [t("PDF durchsuchen"), /* @__PURE__ */ (0, i.jsx)("input", {
						type: "search",
						value: M,
						onChange: (e) => {
							N(e.target.value), j(!1), F([]), R.current++, L(!1);
						}
					})] }),
					/* @__PURE__ */ (0, i.jsx)("button", {
						disabled: !u || I || !M.trim(),
						children: t(I ? "Wird gesucht …" : "Suchen")
					}),
					P.map((e) => /* @__PURE__ */ (0, i.jsxs)("button", {
						type: "button",
						onClick: () => V(e),
						children: [
							t("Seite"),
							" ",
							e
						]
					}, e)),
					A && !P.length && /* @__PURE__ */ (0, i.jsx)("span", {
						role: "status",
						children: t("Keine Treffer in diesem PDF.")
					}),
					/* @__PURE__ */ (0, i.jsx)("button", {
						type: "button",
						"aria-pressed": O,
						onClick: () => k((e) => !e),
						children: t(O ? "Vollbild beenden" : "Vollbild")
					})
				]
			}),
			/* @__PURE__ */ (0, i.jsxs)("div", {
				className: "magazine-reader-page",
				ref: l,
				"aria-busy": b,
				onTouchStart: (e) => {
					z.current = e.touches[0]?.clientX ?? null;
				},
				onTouchEnd: (e) => {
					let t = z.current;
					if (z.current = null, t === null) return;
					let n = e.changedTouches[0]?.clientX - t;
					typeof n == "number" && Math.abs(n) > 55 && V(f + (n < 0 ? 1 : -1));
				},
				children: [
					b && !v && /* @__PURE__ */ (0, i.jsx)("p", {
						role: "status",
						children: t("Seite wird geladen …")
					}),
					/* @__PURE__ */ (0, i.jsx)("canvas", {
						ref: c,
						hidden: E || !!v,
						"aria-hidden": b,
						style: { visibility: b ? "hidden" : "visible" },
						role: "img",
						"aria-label": `${n}, ${t("Seite")} ${f}. ${t("Für vorlesbaren Inhalt Textansicht wählen.")}`
					}),
					E && !v && /* @__PURE__ */ (0, i.jsx)("div", {
						className: "magazine-reader-text",
						style: { fontSize: `${20 * m}px` },
						children: w || (b ? "" : t("Diese Seite enthält keinen auslesbaren Text. Bitte die Seitenansicht verwenden."))
					})
				]
			}),
			/* @__PURE__ */ (0, i.jsxs)("div", {
				className: "magazine-reader-footer",
				children: [
					/* @__PURE__ */ (0, i.jsx)("button", {
						onClick: o,
						children: t("Zurück zur Übersicht")
					}),
					/* @__PURE__ */ (0, i.jsxs)("span", {
						className: "magazine-reader-credit",
						children: [t("Mitgliederansicht"), " · © Swiss TR-Club"]
					}),
					/* @__PURE__ */ (0, i.jsx)("a", {
						href: e,
						download: !0,
						children: t("PDF herunterladen")
					})
				]
			})
		]
	});
}
//#endregion
export { o as default };
