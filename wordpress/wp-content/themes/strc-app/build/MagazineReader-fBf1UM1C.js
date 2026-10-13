import { n as e, t } from "./jsx-runtime-CdS6qnrt.js";
//#region app/components/MagazineReader.tsx
var n = e(), r = t(), i = window.strcSettings.assetBase ?? "";
function a({ url: e, title: t, back: a }) {
	let o = (0, n.useRef)(null), s = (0, n.useRef)(null), [c, l] = (0, n.useState)(null), [u, d] = (0, n.useState)(1), [f, p] = (0, n.useState)(1), [m, h] = (0, n.useState)(600), [g, _] = (0, n.useState)(""), [v, y] = (0, n.useState)(!0), [b, x] = (0, n.useState)(0), [S, C] = (0, n.useState)(""), [w, T] = (0, n.useState)(!1);
	(0, n.useEffect)(() => {
		let t = new AbortController(), n = !1, r;
		return (async () => {
			let a = await import("./pdf-BdiGqHcD.js");
			if (n) return;
			a.GlobalWorkerOptions.workerSrc = `${i}/pdfjs/pdf.worker.min.mjs`;
			let o = await fetch(e, {
				credentials: "include",
				cache: "no-store",
				signal: t.signal
			});
			if (!o.ok) throw Error(o.status === 403 ? "Bitte erneut als Clubmitglied anmelden." : "Die Magazin-Datei ist momentan nicht verfügbar.");
			let s = await o.arrayBuffer();
			if (n) return;
			r = a.getDocument({
				data: s,
				cMapUrl: `${i}/pdfjs/cmaps/`,
				cMapPacked: !0,
				standardFontDataUrl: `${i}/pdfjs/standard_fonts/`,
				wasmUrl: `${i}/pdfjs/wasm/`
			});
			let c = await r.promise;
			n || l(c);
		})().catch((e) => {
			n || (_(e instanceof Error ? e.message : "Die Ausgabe konnte nicht geöffnet werden."), y(!1));
		}), () => {
			n = !0, t.abort(), r?.destroy();
		};
	}, [e, b]), (0, n.useEffect)(() => {
		let e = s.current;
		if (!e) return;
		let t = new ResizeObserver((e) => h(Math.max(180, e[0].contentRect.width - 24)));
		return t.observe(e), () => t.disconnect();
	}, []), (0, n.useEffect)(() => {
		if (!c || !o.current) return;
		let e = !1, t, n = o.current;
		return (async () => {
			y(!0), C("");
			let r = await c.getPage(u);
			if (e) return;
			let i = r.getViewport({ scale: 1 }), a = Math.min(m / i.width, 1.6) * f, o = Math.min(window.devicePixelRatio || 1, 2), s = r.getViewport({ scale: a * o });
			n.width = Math.floor(s.width), n.height = Math.floor(s.height), n.style.width = `${s.width / o}px`, n.style.height = `${s.height / o}px`, t = r.render({
				canvas: n,
				viewport: s
			}), await t.promise;
			let l = await r.getTextContent();
			e || (C(l.items.map((e) => "str" in e ? e.str + ("hasEOL" in e && e.hasEOL ? "\n" : " ") : "").join("")), y(!1));
		})().catch((t) => {
			e || (_(t instanceof Error ? t.message : "Die Seite konnte nicht angezeigt werden."), y(!1));
		}), () => {
			e = !0, t?.cancel();
		};
	}, [
		c,
		u,
		f,
		m
	]);
	let E = (e) => {
		c && (d(Math.max(1, Math.min(c.numPages, e))), s.current?.scrollTo({
			top: 0,
			left: 0
		}));
	};
	return /* @__PURE__ */ (0, r.jsxs)("div", {
		className: "magazine-reader",
		onKeyDown: (e) => {
			e.target instanceof HTMLInputElement || (e.key === "ArrowLeft" || e.key === "ArrowRight") && (e.preventDefault(), E(u + (e.key === "ArrowRight" ? 1 : -1)));
		},
		children: [
			/* @__PURE__ */ (0, r.jsxs)("div", {
				className: "magazine-reader-toolbar",
				"aria-label": "Magazin bedienen",
				children: [
					/* @__PURE__ */ (0, r.jsx)("button", {
						onClick: () => E(u - 1),
						disabled: !c || u === 1,
						children: "← Zurück"
					}),
					/* @__PURE__ */ (0, r.jsxs)("span", {
						"aria-live": "polite",
						children: [
							"Seite ",
							u,
							" von ",
							c?.numPages ?? "…"
						]
					}),
					/* @__PURE__ */ (0, r.jsx)("button", {
						onClick: () => E(u + 1),
						disabled: !c || u === c.numPages,
						children: "Weiter →"
					}),
					/* @__PURE__ */ (0, r.jsx)("button", {
						onClick: () => p((e) => Math.max(.75, e - .25)),
						disabled: f <= .75,
						"aria-label": "Seite verkleinern",
						children: "− Kleiner"
					}),
					/* @__PURE__ */ (0, r.jsx)("button", {
						onClick: () => p((e) => Math.min(2.5, e + .25)),
						disabled: f >= 2.5,
						"aria-label": "Seite vergrössern",
						children: "+ Grösser"
					}),
					/* @__PURE__ */ (0, r.jsx)("button", {
						onClick: () => T((e) => !e),
						"aria-pressed": w,
						children: w ? "Seitenansicht" : "Textansicht"
					})
				]
			}),
			g && /* @__PURE__ */ (0, r.jsxs)("div", {
				className: "collection-state error",
				role: "alert",
				children: [/* @__PURE__ */ (0, r.jsx)("p", { children: g }), /* @__PURE__ */ (0, r.jsx)("button", {
					onClick: () => {
						_(""), l(null), y(!0), d(1), x((e) => e + 1);
					},
					children: "Erneut versuchen"
				})]
			}),
			/* @__PURE__ */ (0, r.jsxs)("div", {
				className: "magazine-reader-page",
				ref: s,
				"aria-busy": v,
				children: [
					v && !g && /* @__PURE__ */ (0, r.jsx)("p", {
						role: "status",
						children: "Seite wird geladen …"
					}),
					/* @__PURE__ */ (0, r.jsx)("canvas", {
						ref: o,
						hidden: w || !!g || v,
						role: "img",
						"aria-label": `${t}, Seite ${u}. Für vorlesbaren Inhalt Textansicht wählen.`
					}),
					w && !g && /* @__PURE__ */ (0, r.jsx)("div", {
						className: "magazine-reader-text",
						children: S || (v ? "" : "Diese Seite enthält keinen auslesbaren Text. Bitte die Seitenansicht verwenden.")
					})
				]
			}),
			/* @__PURE__ */ (0, r.jsxs)("div", {
				className: "magazine-reader-footer",
				children: [/* @__PURE__ */ (0, r.jsx)("button", {
					onClick: a,
					children: "Zurück zur Ausgabe"
				}), /* @__PURE__ */ (0, r.jsx)("a", {
					href: e,
					download: !0,
					children: "PDF herunterladen"
				})]
			})
		]
	});
}
//#endregion
export { a as default };
