import { o as e, r as t, s as n } from "./UILanguage-1b9oExuB.js";
//#region app/components/MagazineReader.tsx
var r = n(), i = e(), a = window.strcSettings.assetBase ?? "";
function o({ url: e, title: n, back: o, initialFullscreen: s = !1, initialPage: c = 1, download: l = !0, backLabel: u = "Zurück zur Übersicht" }) {
	let d = (0, r.useRef)(null), f = (0, r.useRef)(null), [p, m] = (0, r.useState)(null), [h, g] = (0, r.useState)(Math.max(1, c)), [_, v] = (0, r.useState)(1), [y, b] = (0, r.useState)(600), [x, S] = (0, r.useState)(600), [C, w] = (0, r.useState)(s), [T, E] = (0, r.useState)(""), [D, O] = (0, r.useState)(!0), [k, A] = (0, r.useState)(0), [j, M] = (0, r.useState)(""), [N, P] = (0, r.useState)(!1), [F, I] = (0, r.useState)(s), [L, R] = (0, r.useState)(!1), [z, B] = (0, r.useState)(""), [V, H] = (0, r.useState)([]), [U, W] = (0, r.useState)(!1), G = (0, r.useRef)(0), K = (0, r.useRef)(null);
	(0, r.useEffect)(() => {
		let n = !1, r = () => {
			G.current++;
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
			n || (m(r), g(Math.max(1, Math.min(r.numPages, c))));
		})().catch(() => {
			n || (E(t("Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen.")), O(!1));
		}), () => {
			n = !0, r(), i?.destroy().catch(() => {});
		};
	}, [
		e,
		k,
		c
	]), (0, r.useEffect)(() => {
		let e = f.current;
		if (!e) return;
		let t = new ResizeObserver((e) => {
			b(Math.max(180, e[0].contentRect.width - 24)), S(Math.max(1, e[0].contentRect.height - 24));
		});
		return t.observe(e), () => t.disconnect();
	}, []), (0, r.useEffect)(() => {
		if (!p || !d.current) return;
		let e = !1, n, r = d.current;
		return (async () => {
			O(!0), M("");
			let t = await p.getPage(h);
			if (e) return;
			let i = t.getViewport({ scale: 1 }), a = (C ? Math.min(y / i.width, x / i.height) : Math.min(y / i.width, 1.6)) * _, o = Math.min(window.devicePixelRatio || 1, 2), s = t.getViewport({ scale: a * o });
			r.width = Math.floor(s.width), r.height = Math.floor(s.height), r.style.width = `${s.width / o}px`, r.style.height = `${s.height / o}px`, n = t.render({
				canvas: r,
				viewport: s
			}), await n.promise, e || O(!1);
			let c = t.streamTextContent().getReader(), l = "";
			try {
				for (; !e;) {
					let e = await c.read();
					if (e.done) break;
					l += e.value.items.map((e) => e.str ? e.str + (e.hasEOL ? "\n" : " ") : "").join("");
				}
				e || M(l);
			} finally {
				await c.cancel(/* @__PURE__ */ Error("PDF view changed.")).catch(() => {}), c.releaseLock();
			}
		})().catch(() => {
			e || (E(t("Diese Seite konnte nicht angezeigt werden. Bitte erneut versuchen oder die PDF herunterladen.")), O(!1));
		}), () => {
			e = !0, n?.cancel();
		};
	}, [
		p,
		h,
		_,
		y,
		x,
		C
	]);
	async function q() {
		if (!p || !z.trim()) return;
		let e = ++G.current;
		W(!0), R(!1), H([]);
		let n = [];
		try {
			for (let t = 1; t <= p.numPages; t++) {
				if (e !== G.current) return;
				(await (await p.getPage(t)).getTextContent()).items.map((e) => "str" in e ? e.str : "").join(" ").toLocaleLowerCase().includes(z.trim().toLocaleLowerCase()) && n.push(t);
			}
			e === G.current && (H(n), R(!0), n[0] && g(n[0]));
		} catch {
			E(t("Die Suche konnte nicht abgeschlossen werden."));
		} finally {
			e === G.current && W(!1);
		}
	}
	let J = (e) => {
		p && (g(Math.max(1, Math.min(p.numPages, e))), f.current?.scrollTo({
			top: 0,
			left: 0
		}));
	};
	return /* @__PURE__ */ (0, i.jsxs)("div", {
		className: "magazine-reader" + (F ? " is-fullscreen" : ""),
		onKeyDown: (e) => {
			if (e.key === "Escape" && F) {
				e.preventDefault(), e.stopPropagation(), I(!1), w(!1), v(1);
				return;
			}
			e.target instanceof HTMLElement && e.target.closest("input,select,textarea,[contenteditable]") || (e.key === "ArrowLeft" || e.key === "ArrowRight") && (e.preventDefault(), J(h + (e.key === "ArrowRight" ? 1 : -1)));
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
								onClick: () => J(h - 1),
								disabled: !p || h === 1,
								"aria-label": t("Vorherige Seite"),
								children: "‹"
							}),
							/* @__PURE__ */ (0, i.jsxs)("span", {
								className: "reader-page",
								"aria-live": "polite",
								children: [
									h,
									" / ",
									p?.numPages ?? "…"
								]
							}),
							/* @__PURE__ */ (0, i.jsx)("button", {
								onClick: () => J(h + 1),
								disabled: !p || h === p.numPages,
								"aria-label": t("Nächste Seite"),
								children: "›"
							})
						]
					}),
					/* @__PURE__ */ (0, i.jsxs)("div", {
						className: "reader-group",
						children: [
							/* @__PURE__ */ (0, i.jsx)("button", {
								onClick: () => v((e) => Math.max(.5, e - .25)),
								disabled: _ <= .5,
								"aria-label": t("Seite verkleinern"),
								children: "−"
							}),
							/* @__PURE__ */ (0, i.jsxs)("span", {
								className: "reader-zoom",
								children: [Math.round(_ * 100), " %"]
							}),
							/* @__PURE__ */ (0, i.jsx)("button", {
								onClick: () => v((e) => Math.min(3, e + .25)),
								disabled: _ >= 3,
								"aria-label": t("Seite vergrössern"),
								children: "+"
							}),
							/* @__PURE__ */ (0, i.jsx)("button", {
								"aria-pressed": C,
								onClick: () => {
									w((e) => !e), v(1);
								},
								children: t(C ? "Seitenbreite" : "Ganze Seite")
							})
						]
					}),
					/* @__PURE__ */ (0, i.jsxs)("form", {
						className: "reader-group reader-search",
						role: "search",
						onSubmit: (e) => {
							e.preventDefault(), q();
						},
						children: [
							/* @__PURE__ */ (0, i.jsx)("input", {
								type: "search",
								"aria-label": t("PDF durchsuchen"),
								placeholder: t("Im PDF suchen"),
								value: z,
								onChange: (e) => {
									B(e.target.value), R(!1), H([]), G.current++, W(!1);
								}
							}),
							/* @__PURE__ */ (0, i.jsx)("button", {
								disabled: !p || U || !z.trim(),
								children: t(U ? "Wird gesucht …" : "Suchen")
							}),
							V.length > 0 && /* @__PURE__ */ (0, i.jsxs)("select", {
								"aria-label": t("Treffer"),
								value: V.includes(h) ? String(h) : "",
								onChange: (e) => {
									e.target.value && J(Number(e.target.value));
								},
								children: [/* @__PURE__ */ (0, i.jsxs)("option", {
									value: "",
									children: [
										V.length,
										" ",
										t((V.length, "Treffer"))
									]
								}), V.map((e) => /* @__PURE__ */ (0, i.jsxs)("option", {
									value: e,
									children: [
										t("Seite"),
										" ",
										e
									]
								}, e))]
							}),
							L && !V.length && /* @__PURE__ */ (0, i.jsx)("span", {
								role: "status",
								children: t("Keine Treffer")
							})
						]
					}),
					/* @__PURE__ */ (0, i.jsxs)("div", {
						className: "reader-group",
						children: [/* @__PURE__ */ (0, i.jsx)("button", {
							onClick: () => P((e) => !e),
							"aria-pressed": N,
							children: t(N ? "Seitenansicht" : "Text")
						}), /* @__PURE__ */ (0, i.jsx)("button", {
							"aria-pressed": F,
							onClick: () => {
								I((e) => !e), w(!F), v(1);
							},
							"aria-label": t(F ? "Vollbild beenden" : "Vollbild"),
							children: t(F ? "Vollbild beenden" : "Vollbild")
						})]
					})
				]
			}),
			T && /* @__PURE__ */ (0, i.jsxs)("div", {
				className: "collection-state error",
				role: "alert",
				children: [/* @__PURE__ */ (0, i.jsx)("p", { children: T }), /* @__PURE__ */ (0, i.jsx)("button", {
					onClick: () => {
						E(""), m(null), O(!0), g(1), A((e) => e + 1);
					},
					children: t("Erneut versuchen")
				})]
			}),
			/* @__PURE__ */ (0, i.jsxs)("div", {
				className: "magazine-reader-page",
				ref: f,
				"aria-busy": D,
				onTouchStart: (e) => {
					K.current = e.touches[0]?.clientX ?? null;
				},
				onTouchEnd: (e) => {
					let t = K.current;
					if (K.current = null, t === null) return;
					let n = e.changedTouches[0]?.clientX - t;
					typeof n == "number" && Math.abs(n) > 55 && J(h + (n < 0 ? 1 : -1));
				},
				children: [
					D && !T && /* @__PURE__ */ (0, i.jsx)("p", {
						role: "status",
						children: t("Seite wird geladen …")
					}),
					/* @__PURE__ */ (0, i.jsx)("canvas", {
						ref: d,
						hidden: N || !!T,
						"aria-hidden": D,
						style: { visibility: D ? "hidden" : "visible" },
						role: "img",
						"aria-label": `${n}, ${t("Seite")} ${h}. ${t("Für vorlesbaren Inhalt Textansicht wählen.")}`
					}),
					N && !T && /* @__PURE__ */ (0, i.jsx)("div", {
						className: "magazine-reader-text",
						style: { fontSize: `${20 * _}px` },
						children: j || (D ? "" : t("Diese Seite enthält keinen auslesbaren Text. Bitte die Seitenansicht verwenden."))
					})
				]
			}),
			/* @__PURE__ */ (0, i.jsxs)("div", {
				className: "magazine-reader-footer",
				children: [
					/* @__PURE__ */ (0, i.jsx)("button", {
						onClick: o,
						children: t(u)
					}),
					/* @__PURE__ */ (0, i.jsxs)("span", {
						className: "magazine-reader-credit",
						children: [t("Mitgliederansicht"), " · © Swiss TR-Club"]
					}),
					l && /* @__PURE__ */ (0, i.jsx)("a", {
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
