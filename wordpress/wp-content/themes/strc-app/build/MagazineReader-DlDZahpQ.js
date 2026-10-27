import { o as e, r as t, s as n } from "./UILanguage-BE9LLbXr.js";
//#region app/components/MagazineReader.tsx
var r = n(), i = e(), a = window.strcSettings.assetBase ?? "";
function o({ url: e, title: n, back: o, initialFullscreen: s = !1 }) {
	let c = (0, r.useRef)(null), l = (0, r.useRef)(null), [u, d] = (0, r.useState)(null), [f, p] = (0, r.useState)(1), [m, h] = (0, r.useState)(1), [g, _] = (0, r.useState)(600), [v, y] = (0, r.useState)(600), [b, x] = (0, r.useState)(s), [S, C] = (0, r.useState)(""), [w, T] = (0, r.useState)(!0), [E, D] = (0, r.useState)(0), [O, k] = (0, r.useState)(""), [A, j] = (0, r.useState)(!1), [M, N] = (0, r.useState)(s), [P, F] = (0, r.useState)(!1), [I, L] = (0, r.useState)(""), [R, z] = (0, r.useState)([]), [B, V] = (0, r.useState)(!1), H = (0, r.useRef)(0), U = (0, r.useRef)(null);
	(0, r.useEffect)(() => {
		let n = !1, r = () => {
			H.current++;
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
			n || (C(t("Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen.")), T(!1));
		}), () => {
			n = !0, r(), i?.destroy().catch(() => {});
		};
	}, [e, E]), (0, r.useEffect)(() => {
		let e = l.current;
		if (!e) return;
		let t = new ResizeObserver((e) => {
			_(Math.max(180, e[0].contentRect.width - 24)), y(Math.max(1, e[0].contentRect.height - 24));
		});
		return t.observe(e), () => t.disconnect();
	}, []), (0, r.useEffect)(() => {
		if (!u || !c.current) return;
		let e = !1, n, r = c.current;
		return (async () => {
			T(!0), k("");
			let t = await u.getPage(f);
			if (e) return;
			let i = t.getViewport({ scale: 1 }), a = (b ? Math.min(g / i.width, v / i.height) : Math.min(g / i.width, 1.6)) * m, o = Math.min(window.devicePixelRatio || 1, 2), s = t.getViewport({ scale: a * o });
			r.width = Math.floor(s.width), r.height = Math.floor(s.height), r.style.width = `${s.width / o}px`, r.style.height = `${s.height / o}px`, n = t.render({
				canvas: r,
				viewport: s
			}), await n.promise, e || T(!1);
			let c = t.streamTextContent().getReader(), l = "";
			try {
				for (; !e;) {
					let e = await c.read();
					if (e.done) break;
					l += e.value.items.map((e) => e.str ? e.str + (e.hasEOL ? "\n" : " ") : "").join("");
				}
				e || k(l);
			} finally {
				await c.cancel(/* @__PURE__ */ Error("PDF view changed.")).catch(() => {}), c.releaseLock();
			}
		})().catch(() => {
			e || (C(t("Diese Seite konnte nicht angezeigt werden. Bitte erneut versuchen oder die PDF herunterladen.")), T(!1));
		}), () => {
			e = !0, n?.cancel();
		};
	}, [
		u,
		f,
		m,
		g,
		v,
		b
	]);
	async function W() {
		if (!u || !I.trim()) return;
		let e = ++H.current;
		V(!0), F(!1), z([]);
		let n = [];
		try {
			for (let t = 1; t <= u.numPages; t++) {
				if (e !== H.current) return;
				(await (await u.getPage(t)).getTextContent()).items.map((e) => "str" in e ? e.str : "").join(" ").toLocaleLowerCase().includes(I.trim().toLocaleLowerCase()) && n.push(t);
			}
			e === H.current && (z(n), F(!0), n[0] && p(n[0]));
		} catch {
			C(t("Die Suche konnte nicht abgeschlossen werden."));
		} finally {
			e === H.current && V(!1);
		}
	}
	let G = (e) => {
		u && (p(Math.max(1, Math.min(u.numPages, e))), l.current?.scrollTo({
			top: 0,
			left: 0
		}));
	};
	return /* @__PURE__ */ (0, i.jsxs)("div", {
		className: "magazine-reader" + (M ? " is-fullscreen" : ""),
		onKeyDown: (e) => {
			if (e.key === "Escape" && M) {
				e.preventDefault(), e.stopPropagation(), N(!1), x(!1), h(1);
				return;
			}
			e.target instanceof HTMLElement && e.target.closest("input,select,textarea,[contenteditable]") || (e.key === "ArrowLeft" || e.key === "ArrowRight") && (e.preventDefault(), G(f + (e.key === "ArrowRight" ? 1 : -1)));
		},
		children: [
			/* @__PURE__ */ (0, i.jsxs)("div", {
				className: "magazine-reader-toolbar",
				role: "toolbar",
				"aria-label": t("Magazin bedienen"),
				children: [
					/* @__PURE__ */ (0, i.jsxs)("div", {
						className: "reader-group",
						children: [
							/* @__PURE__ */ (0, i.jsx)("button", {
								onClick: () => G(f - 1),
								disabled: !u || f === 1,
								"aria-label": t("Vorherige Seite"),
								children: "‹"
							}),
							/* @__PURE__ */ (0, i.jsxs)("span", {
								className: "reader-page",
								"aria-live": "polite",
								children: [
									f,
									" / ",
									u?.numPages ?? "…"
								]
							}),
							/* @__PURE__ */ (0, i.jsx)("button", {
								onClick: () => G(f + 1),
								disabled: !u || f === u.numPages,
								"aria-label": t("Nächste Seite"),
								children: "›"
							})
						]
					}),
					/* @__PURE__ */ (0, i.jsxs)("div", {
						className: "reader-group",
						children: [
							/* @__PURE__ */ (0, i.jsx)("button", {
								onClick: () => h((e) => Math.max(.5, e - .25)),
								disabled: m <= .5,
								"aria-label": t("Seite verkleinern"),
								children: "−"
							}),
							/* @__PURE__ */ (0, i.jsxs)("span", {
								className: "reader-zoom",
								children: [Math.round(m * 100), " %"]
							}),
							/* @__PURE__ */ (0, i.jsx)("button", {
								onClick: () => h((e) => Math.min(3, e + .25)),
								disabled: m >= 3,
								"aria-label": t("Seite vergrössern"),
								children: "+"
							}),
							/* @__PURE__ */ (0, i.jsx)("button", {
								"aria-pressed": b,
								onClick: () => {
									x((e) => !e), h(1);
								},
								children: t(b ? "Seitenbreite" : "Ganze Seite")
							})
						]
					}),
					/* @__PURE__ */ (0, i.jsxs)("form", {
						className: "reader-group reader-search",
						role: "search",
						onSubmit: (e) => {
							e.preventDefault(), W();
						},
						children: [
							/* @__PURE__ */ (0, i.jsx)("input", {
								type: "search",
								"aria-label": t("PDF durchsuchen"),
								placeholder: t("Im PDF suchen"),
								value: I,
								onChange: (e) => {
									L(e.target.value), F(!1), z([]), H.current++, V(!1);
								}
							}),
							/* @__PURE__ */ (0, i.jsx)("button", {
								disabled: !u || B || !I.trim(),
								children: t(B ? "Wird gesucht …" : "Suchen")
							}),
							R.length > 0 && /* @__PURE__ */ (0, i.jsxs)("select", {
								"aria-label": t("Treffer"),
								value: R.includes(f) ? String(f) : "",
								onChange: (e) => {
									e.target.value && G(Number(e.target.value));
								},
								children: [/* @__PURE__ */ (0, i.jsxs)("option", {
									value: "",
									children: [
										R.length,
										" ",
										t((R.length, "Treffer"))
									]
								}), R.map((e) => /* @__PURE__ */ (0, i.jsxs)("option", {
									value: e,
									children: [
										t("Seite"),
										" ",
										e
									]
								}, e))]
							}),
							P && !R.length && /* @__PURE__ */ (0, i.jsx)("span", {
								role: "status",
								children: t("Keine Treffer")
							})
						]
					}),
					/* @__PURE__ */ (0, i.jsxs)("div", {
						className: "reader-group",
						children: [/* @__PURE__ */ (0, i.jsx)("button", {
							onClick: () => j((e) => !e),
							"aria-pressed": A,
							children: t(A ? "Seitenansicht" : "Text")
						}), /* @__PURE__ */ (0, i.jsx)("button", {
							"aria-pressed": M,
							onClick: () => {
								N((e) => !e), x(!M), h(1);
							},
							"aria-label": t(M ? "Vollbild beenden" : "Vollbild"),
							children: M ? "✕" : "⛶"
						})]
					})
				]
			}),
			S && /* @__PURE__ */ (0, i.jsxs)("div", {
				className: "collection-state error",
				role: "alert",
				children: [/* @__PURE__ */ (0, i.jsx)("p", { children: S }), /* @__PURE__ */ (0, i.jsx)("button", {
					onClick: () => {
						C(""), d(null), T(!0), p(1), D((e) => e + 1);
					},
					children: t("Erneut versuchen")
				})]
			}),
			/* @__PURE__ */ (0, i.jsxs)("div", {
				className: "magazine-reader-page",
				ref: l,
				"aria-busy": w,
				onTouchStart: (e) => {
					U.current = e.touches[0]?.clientX ?? null;
				},
				onTouchEnd: (e) => {
					let t = U.current;
					if (U.current = null, t === null) return;
					let n = e.changedTouches[0]?.clientX - t;
					typeof n == "number" && Math.abs(n) > 55 && G(f + (n < 0 ? 1 : -1));
				},
				children: [
					w && !S && /* @__PURE__ */ (0, i.jsx)("p", {
						role: "status",
						children: t("Seite wird geladen …")
					}),
					/* @__PURE__ */ (0, i.jsx)("canvas", {
						ref: c,
						hidden: A || !!S,
						"aria-hidden": w,
						style: { visibility: w ? "hidden" : "visible" },
						role: "img",
						"aria-label": `${n}, ${t("Seite")} ${f}. ${t("Für vorlesbaren Inhalt Textansicht wählen.")}`
					}),
					A && !S && /* @__PURE__ */ (0, i.jsx)("div", {
						className: "magazine-reader-text",
						style: { fontSize: `${20 * m}px` },
						children: O || (w ? "" : t("Diese Seite enthält keinen auslesbaren Text. Bitte die Seitenansicht verwenden."))
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
