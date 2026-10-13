import { t as e } from "./chunk-C_CI6nMA.js";
//#region node_modules/react/cjs/react.production.js
var t = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function E(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function D(e, t) {
		return E(e.type, t, e.props);
	}
	function O(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function k(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var A = /\/+/g;
	function j(e, t) {
		return typeof e == "object" && e && e.key != null ? k("" + e.key) : t.toString(36);
	}
	function M(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function N(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, N(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + j(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(A, "$&/") + "/"), N(o, r, i, "", function(e) {
			return e;
		})) : o != null && (O(o) && (o = D(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + j(a, u), c += N(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + j(a, u++), c += N(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return N(M(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function P(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return N(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function F(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var I = typeof reportError == "function" ? reportError : function(e) {
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
	}, L = {
		map: P,
		forEach: function(e, t, n) {
			P(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return P(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return P(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!O(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = L, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return E(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return E(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = O, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: F
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, I);
		} catch (e) {
			I(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.6";
})), n = /* @__PURE__ */ e(((e, n) => {
	n.exports = t();
})), r = {
	Alle: "Tous",
	Entfernen: "Supprimer",
	"Zuordnung hinzufügen": "Ajouter une association",
	"Einstellungen gespeichert.": "Préférences enregistrées.",
	"Interessen, Fachwissen und Benachrichtigungen": "Intérêts, expertise et notifications",
	"Meine Interessen": "Mes intérêts",
	"Benachrichtigungen auf der Webseite": "Notifications sur le site",
	"Benachrichtigungen per E-Mail": "Notifications par e-mail",
	"Benachrichtigungen zu meinem Fachwissen": "Notifications liées à mon expertise",
	"Mein Fachwissen": "Mon expertise",
	"Fachwissen zuordnen": "Attribuer une expertise",
	"Mitglied suchen": "Rechercher un membre",
	"Fachwissen speichern": "Enregistrer l’expertise",
	"Diese Zuordnung erteilt keine Moderationsrechte. Benachrichtigungen wählt das Mitglied selbst.": "Cette association ne confère aucun droit de modération. Le membre choisit lui-même ses notifications.",
	Angeheftet: "Épinglé",
	"Zum zusammengeführten Thema": "Ouvrir le sujet fusionné",
	"Anheftung entfernen": "Désépingler",
	"Thema anheften": "Épingler le sujet",
	"Antwort ausblenden": "Masquer la réponse",
	"Antwort bearbeiten": "Modifier la réponse",
	"Themen zusammenführen": "Fusionner des sujets",
	Beitragsdetails: "Détails de la publication",
	"Zielthema suchen": "Rechercher le sujet cible",
	Zielthema: "Sujet cible",
	"Antworten werden übertragen. Das ursprüngliche Thema bleibt mit Verweis erhalten.": "Les réponses sont transférées. Le sujet d’origine est conservé avec un lien.",
	Zusammenführen: "Fusionner",
	Kategorie: "Catégorie",
	"Alle Kategorien": "Toutes les catégories",
	Mitgliederporträts: "Portraits de membres",
	Mitgliederansicht: "Vue réservée aux membres",
	Fahrzeugrestaurationen: "Restaurations de véhicules",
	Clubgeschichte: "Histoire du club",
	"Veranstaltung (optional)": "Événement (facultatif)",
	"Keine Zuordnung": "Aucune attribution",
	"Zugehörige Veranstaltung": "Événement associé",
	"Bilder prüfen und Album pflegen": "Valider les photos et gérer l’album",
	"Alle auswählen": "Tout sélectionner",
	"Auswahl aufheben": "Effacer la sélection",
	Freigegeben: "Approuvé",
	Abgelehnt: "Refusé",
	"Auswahl freigeben": "Approuver la sélection",
	"Auswahl ablehnen": "Refuser la sélection",
	"Als Titelbild wählen": "Choisir comme couverture",
	"Bilder in Album verschieben": "Déplacer les photos vers un album",
	"Auswahl verschieben": "Déplacer la sélection",
	Anlass: "Occasion",
	Datum: "Date",
	"Fotograf/in": "Photographe",
	Quelle: "Source",
	Ausgabe: "Numéro",
	Start: "Départ",
	Ziel: "Arrivée",
	Distanz: "Distance",
	Fahrzeit: "Temps de conduite",
	Dauer: "Durée",
	"Bestellungen und Lagerbestand": "Commandes et stock",
	"Abholung an Veranstaltung": "Retrait lors d’un événement",
	Bestellungen: "Commandes",
	"Angezeigte Bestellungen exportieren": "Exporter les commandes affichées",
	Bestellung: "Commande",
	Kunde: "Client",
	Status: "Statut",
	Betrag: "Montant",
	Abholung: "Retrait",
	Versand: "Livraison",
	Lagerbestand: "Stock",
	Artikel: "Article",
	Bestand: "Stock",
	pending: "En attente",
	"on-hold": "Paiement en attente",
	processing: "En cours",
	completed: "Terminée",
	cancelled: "Annulée",
	refunded: "Remboursée",
	failed: "Échec",
	instock: "En stock",
	outofstock: "Épuisé",
	onbackorder: "En réapprovisionnement",
	"Teilnahme von Warteliste bestätigen": "Confirmer la participation depuis la liste d’attente",
	Schliessen: "Fermer",
	Teilnehmende: "Participants",
	"Wird geladen …": "Chargement…",
	"Noch keine bestätigten Anmeldungen.": "Aucune inscription confirmée.",
	"Termine werden geladen …": "Chargement des dates…",
	"Agenda nicht erreichbar.": "Agenda indisponible.",
	"Keine passenden kommenden Termine.": "Aucun événement à venir correspondant.",
	"Keine passenden vergangenen Veranstaltungen.": "Aucun événement passé correspondant.",
	"Zum Dashboard →": "Vers le tableau de bord →",
	Aktualisieren: "Actualiser",
	Weiter: "Suivant",
	Bemerkungen: "Remarques",
	Bestätigen: "Confirmer",
	Startseite: "Accueil",
	"Nur für Mitglieder": "Réservé aux membres",
	"Bibliothek durchsuchen": "Rechercher dans la bibliothèque",
	"Beiträge werden geladen …": "Chargement des publications…",
	Dateien: "Fichiers",
	"Fahrzeugmodell (optional)": "Modèle de véhicule (facultatif)",
	"Alle Modelle / keine Zuordnung": "Tous les modèles / aucune association",
	"Fahrzeugmodelle (optional)": "Modèles de véhicules (facultatif)",
	"Mehrere Modelle mit ⌘-Klick oder Strg-Klick auswählen.": "Sélectionnez plusieurs modèles avec ⌘-clic ou Ctrl-clic.",
	"Technikbereich (optional)": "Domaine technique (facultatif)",
	"Anlass / Veranstaltung (optional)": "Occasion / événement (facultatif)",
	"Aufnahmedatum (optional)": "Date de prise de vue (facultatif)",
	"Kurze Anekdote zum Anlass (optional)": "Courte anecdote (facultatif)",
	"oder vom Gerät auswählen": "ou sélectionner sur votre appareil",
	"Beitrag wird geladen …": "Chargement de la publication…",
	"Noch keine Antworten. Schreiben Sie die erste.": "Aucune réponse. Écrivez la première.",
	Redaktion: "Rédaction",
	"Inhalte bearbeiten": "Modifier les contenus",
	"Zur Übersicht": "Retour à la liste",
	"Seiten und Texte": "Pages et textes",
	"Beiträge und Clubbereiche": "Publications et rubriques du club",
	"Agenda und Reisen": "Agenda et voyages",
	Vorschau: "Aperçu",
	"Seite ansehen": "Voir la page",
	Inhaltsvorschau: "Aperçu du contenu",
	Funktion: "Fonction",
	"Person entfernen": "Supprimer la personne",
	"Person hinzufügen": "Ajouter une personne",
	"Nach oben": "Monter",
	"Nach unten": "Descendre",
	"Eintrag hinzufügen": "Ajouter une entrée",
	"Bild entfernen": "Retirer l’image",
	"Beiträge suchen": "Rechercher des publications",
	"Noch keine Beiträge vorhanden.": "Aucune publication.",
	"Kurztext für die Vorschau": "Résumé pour l’aperçu",
	"Preis in CHF": "Prix en CHF",
	Entwurf: "Brouillon",
	"Person wählen": "Choisir une personne",
	Zuständigkeiten: "Responsabilités",
	"Rollen und Zuständigkeiten speichern": "Enregistrer les rôles et responsabilités",
	"Anmeldungen werden geladen …": "Chargement des inscriptions…",
	"Liste für Excel exportieren": "Exporter la liste pour Excel",
	"Zahlungsstand abstimmen": "Rapprocher les paiements",
	Zahlungsstand: "État du paiement",
	"Beleg / Begründung": "Justificatif / motif",
	"Zahlungsstand speichern": "Enregistrer l’état du paiement",
	"Termin erstellen": "Créer un événement",
	"Termine suchen": "Rechercher des événements",
	"Noch keine Fahrzeuge erfasst.": "Aucun véhicule enregistré.",
	"Keine passenden Mitglieder gefunden.": "Aucun membre correspondant.",
	"Profil öffnen": "Ouvrir le profil",
	"Liste anzeigen": "Afficher la liste",
	"Karte anzeigen": "Afficher la carte",
	"Sicher anmelden →": "Se connecter →",
	"E-Mail oder Benutzername": "E-mail ou identifiant",
	Passwort: "Mot de passe",
	"Passwort vergessen?": "Mot de passe oublié ?",
	"Anmeldung ansehen →": "Voir l’inscription →",
	"Zur Agenda →": "Vers l’agenda →",
	"Auswählen & bestellen →": "Choisir et commander →",
	"Zum Warenkorb →": "Vers le panier →",
	"Meine Bestellungen →": "Mes commandes →",
	"Bestellungen und Lager verwalten →": "Gérer les commandes et le stock →",
	"Meine Moderationsaufgaben": "Mes tâches de modération",
	"Meine Anmeldungen": "Mes inscriptions",
	"Meine Beiträge und Inserate": "Mes publications et annonces",
	"Keine bevorstehenden Veranstaltungen.": "Aucun événement à venir.",
	"Noch keine Anmeldungen.": "Aucune inscription.",
	"Noch keine Beiträge eingereicht.": "Aucune publication soumise.",
	"Noch keine Bestellungen.": "Aucune commande.",
	"Keine neuen Benachrichtigungen.": "Aucune nouvelle notification.",
	"Meine Veranstaltungsanmeldungen": "Mes inscriptions aux événements",
	"Mitglieder und ihre Triumphs finden.": "Retrouver les membres et leurs Triumph.",
	"Mitglieder werden geladen …": "Chargement des membres…",
	Einspritzung: "Injection",
	Kühlung: "Refroidissement",
	Auspuff: "Échappement",
	Kupplung: "Embrayage",
	Fahrwerk: "Suspension",
	Lenkung: "Direction",
	Zündung: "Allumage",
	Instrumente: "Instruments",
	"Kraftstoff / Vergaser": "Carburant / carburateurs",
	Overdrive: "Overdrive",
	Getriebe: "Boîte de vitesses",
	Chassis: "Châssis",
	"Inserat bearbeiten": "Modifier l’annonce",
	"Gültig bis": "Valable jusqu’au",
	"Abgelaufen am": "Expiré le",
	"Keine Treffer in diesem PDF.": "Aucun résultat dans ce PDF.",
	"Vollbild beenden": "Quitter le plein écran",
	Mitgliederverwaltung: "Gestion des membres",
	Veranstaltungsorganisator: "Organisateur d’événements",
	Regionalleiter: "Responsable régional",
	"Forum-Moderator": "Modérateur du forum",
	"Galerie-Moderator": "Modérateur de la galerie",
	"Marktplatz-Moderator": "Modérateur des annonces",
	Bibliotheksverwalter: "Responsable de la bibliothèque",
	Shopmanager: "Responsable de la boutique",
	Kassier: "Trésorier",
	Redaktor: "Rédacteur",
	Vorstandsmitglied: "Membre du comité",
	Webmaster: "Webmaster",
	Person: "Personne",
	"Das PDF konnte nicht geöffnet werden. Bitte erneut versuchen.": "Le PDF n’a pas pu être ouvert. Veuillez réessayer.",
	"← Zurück": "← Précédent",
	"Weiter →": "Suivant →",
	"− Kleiner": "− Réduire",
	"+ Grösser": "+ Agrandir",
	Seite: "Page",
	von: "sur",
	"Wird gesucht …": "Recherche en cours…",
	"Seite wird geladen …": "Chargement de la page…",
	ansehen: "ouvrir",
	herunterladen: "télécharger",
	durchsuchen: "rechercher",
	Fahrzeugstatus: "État du véhicule",
	Fahrbereit: "En état de rouler",
	"In Restauration": "En restauration",
	Bestätigt: "Confirmé",
	Warteliste: "Liste d’attente",
	Abgemeldet: "Annulé",
	"Zahlung offen": "Paiement en attente",
	"Teilweise bezahlt": "Partiellement payé",
	"Zahlung ausstehend": "Paiement en attente",
	"Noch nicht fällig": "Pas encore exigible",
	"Keine Zahlung erforderlich": "Aucun paiement requis",
	Veröffentlicht: "Publié",
	"Entwurf / abgelehnt": "Brouillon / refusé",
	"Standorte werden geladen …": "Chargement des localités…",
	"Einige Standorte konnten nicht geladen werden. Die Mitgliederliste bleibt verfügbar.": "Certaines localités n’ont pas pu être chargées. La liste des membres reste disponible.",
	"Verbindung unterbrochen. Bitte erneut versuchen.": "Connexion interrompue. Veuillez réessayer.",
	"Anrede (optional)": "Civilité (facultatif)",
	Korrespondenzsprache: "Langue de correspondance",
	Vorname: "Prénom",
	"Vorname *": "Prénom *",
	"Nachname *": "Nom *",
	"E-Mail": "E-mail",
	"E-Mail *": "E-mail *",
	"Mobilnummer *": "Numéro de portable *",
	"Telefon / Mobil (optional)": "Téléphone / portable (facultatif)",
	"Strasse und Hausnummer *": "Rue et numéro *",
	"Postleitzahl *": "Code postal *",
	"Ort *": "Localité *",
	"Land *": "Pays *",
	"Triumph-Modell *": "Modèle Triumph *",
	"Modell / Ausführung (optional)": "Modèle / version (facultatif)",
	"Baujahr (optional)": "Année (facultatif)",
	"Farbe (optional)": "Couleur (facultatif)",
	"Kennzeichen (optional)": "Immatriculation (facultatif)",
	"Weitere Angaben (optional)": "Informations complémentaires (facultatif)",
	"Ihre Angaben werden für diese Anfrage verwendet.": "Vos données sont utilisées pour cette demande.",
	"Datenschutzhinweise (neuer Tab)": "Protection des données (nouvel onglet)",
	"Programm & Ausfahrt": "Programme et sortie",
	"Programm / Tagesablauf": "Programme / déroulement",
	"Ausfahrt / praktische Informationen": "Sortie / informations pratiques",
	Veranstaltungsleitung: "Organisation de l’événement",
	"Veranstaltungsleiter/in · Ansprechperson *": "Organisateur / personne de contact *",
	"Kontakt-E-Mail *": "E-mail de contact *",
	"Anmeldung konfigurieren": "Configurer les inscriptions",
	"Anmeldung erforderlich": "Inscription requise",
	"Anmeldung ab (optional)": "Ouverture des inscriptions (facultatif)",
	"Anmeldung bis (optional)": "Clôture des inscriptions (facultatif)",
	"Maximale Personenzahl": "Nombre maximal de personnes",
	"Gäste pro Anmeldung": "Invités par inscription",
	"Verknüpften Co-Piloten zulassen": "Autoriser le copilote associé",
	"Fahrzeugauswahl anzeigen": "Afficher le choix du véhicule",
	"Bei voller Kapazität Warteliste führen": "Activer la liste d’attente lorsque la capacité est atteinte",
	"Externer Anmeldelink (optional)": "Lien d’inscription externe (facultatif)",
	"Beiträge & Optionen": "Tarifs et options",
	Mitglied: "Membre",
	Gast: "Invité",
	Clubmitglied: "Membre du club",
	"Teilnahme & Abmeldung": "Participation et annulation",
	Bedingungen: "Conditions",
	"Abmeldung bis (optional)": "Annulation jusqu’au (facultatif)",
	Unterkunft: "Hébergement",
	Gesamtbetrag: "Montant total",
	"Für die Anmeldung benötigen Sie Ihren Mitgliederzugang.": "L’inscription nécessite votre accès membre.",
	"Zum Mitglieder-Login →": "Connexion membres →",
	"Veranstaltung bearbeiten": "Modifier l’événement",
	"Angaben prüfen": "Vérifier les données",
	Zahlung: "Paiement",
	Bestätigung: "Confirmation",
	"Anmeldung wird geladen …": "Chargement de l’inscription…",
	"Teilnahme bestätigt": "Participation confirmée",
	"Teilnahme reserviert – Zahlung ausstehend": "Participation réservée – paiement en attente",
	"Plätze reserviert – Zahlung ausstehend": "Places réservées – paiement en attente",
	"Reservierung abgelaufen": "Réservation expirée",
	"Zahlung wird durch die Kasse geprüft": "Paiement en cours de vérification par le trésorier",
	Rechnung: "Facture",
	Kreditkarte: "Carte de crédit",
	"Keine Zahlung": "Aucun paiement",
	"Rechnung offen": "Facture en attente",
	"Nicht erforderlich": "Non requis",
	Bezahlt: "Payé",
	"Rückerstattung ausstehend": "Remboursement en attente",
	Rückerstattet: "Remboursé",
	"Teilweise rückerstattet": "Partiellement remboursé",
	"Erlassen / korrigiert": "Exonéré / corrigé",
	"Prüfung durch die Kasse": "Vérification par le trésorier",
	"Zahlungsfrist abgelaufen": "Délai de paiement expiré",
	"Die Kasse sendet dir die Rechnung separat über Fairgate.": "Le trésorier vous envoie la facture séparément via Fairgate.",
	"Die Kasse sendet die Rechnung separat über Fairgate.": "Le trésorier envoie la facture séparément via Fairgate.",
	"Auf der Warteliste wird noch keine Zahlung fällig.": "Aucun paiement n’est exigible sur la liste d’attente.",
	"Zahlungsstand aktualisieren": "Actualiser le paiement",
	"Stattdessen auf Rechnung anmelden": "S’inscrire sur facture",
	"Anmeldung ändern": "Modifier l’inscription",
	"Teilnahme verbindlich abmelden?": "Confirmer l’annulation de la participation ?",
	"Abmeldung bestätigen": "Confirmer l’annulation",
	"Teilnahme abmelden": "Annuler la participation",
	"Extern anmelden (neuer Tab) →": "Inscription externe (nouvel onglet) →",
	"Die Anmeldung ist momentan geschlossen.": "Les inscriptions sont actuellement fermées.",
	"Für die Veranstaltung anmelden": "S’inscrire à l’événement",
	"Angemeldet als": "Inscrit en tant que",
	"Mitgliedsnummer *": "Numéro de membre *",
	"＋ Weitere Person hinzufügen": "＋ Ajouter une personne",
	"Fahrzeug *": "Véhicule *",
	"Anderes Fahrzeug": "Autre véhicule",
	"Modernes Fahrzeug": "Véhicule moderne",
	"Ohne Fahrzeug": "Sans véhicule",
	"Unterkunft *": "Hébergement *",
	"Bemerkungen (optional)": "Remarques (facultatif)",
	"Bitte nur veranstaltungsrelevante Angaben eintragen. Gäste erhalten keine Mitgliedschaft.": "Veuillez indiquer uniquement les informations utiles à l’événement. Les invités ne deviennent pas membres.",
	"Ich bestätige die Teilnahmeangaben und akzeptiere die genannten Teilnahme- und Abmeldebedingungen. *": "Je confirme les données de participation et accepte les conditions de participation et d’annulation indiquées. *",
	Zahlungsart: "Mode de paiement",
	"Online-Zahlung wird nach Einrichtung freigeschaltet.": "Le paiement en ligne sera activé après configuration.",
	"Änderung abbrechen": "Annuler la modification",
	"Angaben bearbeiten": "Modifier les données",
	"Wird verarbeitet …": "Traitement en cours…",
	"Änderungen verbindlich speichern": "Confirmer les modifications",
	"Kostenpflichtig anmelden": "Confirmer l’inscription payante",
	"Anmeldung bestätigen": "Confirmer l’inscription",
	"Anmeldung prüfen →": "Vérifier l’inscription →",
	"Zum Kalender hinzufügen": "Ajouter au calendrier",
	"Sie haben noch keine Anmeldungen.": "Vous n’avez pas encore d’inscription.",
	"Bilder und Dokumente sind nur mit aktivem Mitgliederzugang erreichbar.": "Les images et documents sont réservés aux membres actifs.",
	"Ich darf dieses Material mit dem Club teilen und habe notwendige Rechte und Einwilligungen. *": "Je peux partager ce contenu avec le club et dispose des droits et autorisations nécessaires. *",
	"Laden Sie nur Material hoch, das Sie teilen dürfen.": "Téléversez uniquement du contenu que vous êtes autorisé à partager.",
	"Angehängte Dateien bleiben erhalten. Zusätzliches Material können Sie als neuen Beitrag hochladen.": "Les fichiers joints sont conservés. Vous pouvez ajouter du contenu dans une nouvelle publication.",
	"Dokumentart auswählen": "Choisir le type de document",
	"Beitrag bearbeiten": "Modifier la publication",
	"Dateien hier hineinziehen": "Déposer les fichiers ici",
	"Fotos hier hineinziehen": "Déposer les photos ici",
	"Keine passenden Beiträge gefunden.": "Aucune publication correspondante.",
	"Noch keine Themen vorhanden.": "Aucun sujet disponible.",
	"Noch keine Alben vorhanden.": "Aucun album disponible.",
	"Noch keine Dokumente vorhanden.": "Aucun document disponible.",
	"Bildbeschreibung speichern": "Enregistrer la légende",
	"Wird gespeichert …": "Enregistrement…",
	"Wird eingereicht …": "Envoi en cours…",
	"Anfrage senden": "Envoyer la demande",
	"Wird gesendet …": "Envoi en cours…",
	"Ihre Anfrage wurde an den Verkäufer gesendet.": "Votre demande a été envoyée au vendeur.",
	"Inserate werden geladen …": "Chargement des annonces…",
	"Sortiment wird geladen …": "Chargement des produits…",
	Ausverkauft: "Épuisé",
	"Bereits angemeldet": "Déjà inscrit",
	"Ihre Übersicht wird geladen …": "Chargement de votre espace…",
	"Fenster schliessen": "Fermer la fenêtre",
	"Neue Dokumentart (optional)": "Nouveau type de document (facultatif)",
	"Eine Kategorie pro Zeile. Bestehende Zuordnungen bleiben erhalten.": "Une catégorie par ligne. Les classifications existantes sont conservées.",
	"Französische Inhalte": "Contenu français",
	"Leere französische Felder zeigen den vorhandenen deutschen Inhalt.": "Les champs français vides affichent le contenu allemand existant.",
	"Titel (FR)": "Titre (FR)",
	"Beschreibung (FR)": "Description (FR)",
	"Französische Veranstaltungsfassung": "Version française de l’événement",
	"Für nationale Veranstaltungen die bestätigte französische Fassung ergänzen.": "Pour les événements nationaux, ajouter la version française validée.",
	"Archivierte Termine und Anmeldungen bleiben dauerhaft erhalten.": "Les événements archivés et les inscriptions sont conservés durablement.",
	"Funktionsrollen gelten zusätzlich zur Mitgliedschaft. Regionen und Veranstaltungen begrenzen die jeweiligen Aufgaben.": "Les rôles fonctionnels s’ajoutent à l’adhésion. Les régions et événements délimitent les responsabilités.",
	"Webmaster erhält technische Verwaltung. Vorstand gibt vertrauliche Bibliotheksunterlagen frei.": "Le webmaster assure l’administration technique. Le comité dispose de l’accès aux documents confidentiels.",
	"Zusätzlich: berechtigte Clubfunktionen": "En plus : fonctions autorisées du club",
	"Vorstand (nur mit Vorstandsrolle)": "Comité (rôle de membre du comité requis)",
	Neuigkeiten: "Actualités",
	"Agenda aller Regionen": "Agenda de toutes les régions",
	"Bibliothek und Magazin": "Bibliothèque et magazine",
	"Texte, Bilder und Beiträge verwalten – ohne Programmieren.": "Gérer les textes, images et publications sans programmation.",
	"Club-Geschichte": "Histoire du club",
	"Seite bearbeiten": "Modifier la page",
	"Club Event": "Événement du club",
	"Regionales Event": "Événement régional",
	"Externes Event": "Événement externe",
	"Wird bekanntgegeben": "À annoncer",
	"Öffnen →": "Ouvrir →",
	"Prüfen und bestätigen →": "Vérifier et confirmer →",
	"Rollen und Zuständigkeiten gespeichert. Die Person muss die Website neu laden.": "Rôles et responsabilités enregistrés. La personne doit recharger le site.",
	"Sitzung abgelaufen. Bitte neu laden und erneut anmelden.": "Session expirée. Recharger la page et se reconnecter.",
	"Kein Zugriff auf die Redaktion.": "Accès à la rédaction refusé.",
	"Aktiver Mitgliederzugang erforderlich.": "Une adhésion active est requise.",
	"Die Anfrage konnte nicht verarbeitet werden. Bitte erneut versuchen.": "La demande n’a pas pu être traitée. Veuillez réessayer.",
	"Die Anfrage konnte nicht abgeschlossen werden.": "La demande n’a pas pu être terminée.",
	"Keine Anmeldung erforderlich": "Aucune inscription requise",
	"Anmeldung öffnet später": "Les inscriptions ouvriront plus tard",
	"Anmeldung offen": "Inscriptions ouvertes",
	"Anmeldung geschlossen": "Inscriptions fermées",
	Ausgebucht: "Complet",
	"Warteliste offen": "Liste d’attente ouverte",
	Kulanzstatus: "Accès provisoire",
	"Zahlungen offen": "Paiements en attente",
	Erlassen: "Exonéré",
	Zurückerstattet: "Remboursé",
	Abgelaufen: "Expiré",
	Reserviert: "Réservé",
	"Zahlung fehlgeschlagen": "Paiement échoué",
	"Lesen →": "Lire →",
	"Noch nicht zugeordnet": "Pas encore attribué",
	"Verwaltung der Testseite": "Administration du site de test",
	"Swiss TR-Club Startseite": "Accueil Swiss TR-Club",
	"Swiss TR-Club Logo": "Logo Swiss TR-Club",
	Hauptnavigation: "Navigation principale",
	Home: "Accueil",
	"Redaktion öffnen": "Ouvrir la rédaction",
	"Diese Seite bearbeiten": "Modifier cette page",
	Abmelden: "Se déconnecter",
	"← Mitgliederbereich": "← Espace membres",
	"Agenda wird geladen …": "Chargement de l’agenda…",
	"Die Agenda kann momentan nicht geladen werden.": "L’agenda ne peut pas être chargé pour le moment.",
	"Momentan sind keine kommenden Veranstaltungen veröffentlicht.": "Aucun événement à venir n’est publié actuellement.",
	"Lokal präsent – lokal aktiv": "Présents et actifs dans les régions",
	"Regionen werden geladen …": "Chargement des régions…",
	"Regionen konnten nicht geladen werden.": "Les régions n’ont pas pu être chargées.",
	"Diese Region wurde nicht gefunden. Bitte wählen Sie eine Region.": "Cette région est introuvable. Veuillez choisir une région.",
	"Es sind noch keine Regionen hinterlegt.": "Aucune région n’a encore été ajoutée.",
	"Informationen des Clubs": "Informations du club",
	"Dieser Inhalt wurde noch nicht veröffentlicht.": "Ce contenu n’a pas encore été publié.",
	"Mitgliederzugang wird geprüft …": "Vérification de l’accès membre…",
	"Geschützter Bereich": "Espace protégé",
	"Geschützter Mitgliederbereich": "Espace membres protégé",
	"Ihre Mitgliedschaft besitzt momentan keinen Zugang zum Mitgliederbereich.": "Votre adhésion ne permet pas actuellement l’accès à l’espace membres.",
	"Noch nicht dabei?": "Pas encore membre ?",
	"Gemeinschaft beginnt mit einer ersten Ausfahrt.": "La communauté commence par une première sortie.",
	"Mitgliedsanträge werden persönlich geprüft und direkt durch den Swiss TR-Club verwaltet.": "Les demandes d’adhésion sont examinées personnellement et gérées directement par le Swiss TR-Club.",
	"Mitgliedschaft ansehen": "Découvrir l’adhésion",
	Beginn: "Début",
	Ende: "Fin",
	"Anmeldung ab": "Inscription dès le",
	"Anmeldung bis": "Inscription jusqu’au",
	"Porträt folgt": "Portrait à venir",
	"Portrait folgt": "Portrait à venir",
	Porträt: "Portrait",
	"Porträt von": "Portrait de",
	"Name ergänzen": "Ajouter un nom",
	"Event ansehen": "Voir l’événement",
	"Ausfahrten & Events": "Sorties et événements",
	"Gemeinsam unterwegs.": "Sur les routes ensemble.",
	"Die nächsten Erlebnisse und jüngsten Begegnungen.": "Les prochaines aventures et les rencontres récentes.",
	"Zur ganzen Agenda": "Voir tout l’agenda",
	"Veranstaltungen und Rückblicke": "Événements et rétrospectives",
	"Weitere Veranstaltungen entdecken.": "Découvrir d’autres événements.",
	"Vorherige Events": "Événements précédents",
	"Nächste Events": "Événements suivants",
	"Agenda öffnen": "Ouvrir l’agenda",
	"Einfach finden": "Trouver facilement",
	"Wohin möchtest du?": "Où souhaitez-vous aller ?",
	"Weitere Clubbereiche": "Autres rubriques du club",
	"Einblicke ins Clubleben": "Aperçus de la vie du club",
	"Unsere Gemeinschaft": "Notre communauté",
	"Blick ins Clubleben": "Aperçu de la vie du club",
	"Ein Blick ins Clubleben": "Un aperçu de la vie du club",
	"Automatischer Bildwechsel ist bei reduzierter Bewegung pausiert.": "Le défilement automatique des images est suspendu lorsque les animations sont réduites.",
	"Latest News · Neuigkeiten": "Dernières nouvelles",
	"Die Neuigkeiten konnten nicht geladen werden.": "Les actualités n’ont pas pu être chargées.",
	"Neuigkeiten werden geladen …": "Chargement des actualités…",
	"Aktuell sind noch keine Neuigkeiten veröffentlicht.": "Aucune actualité n’a encore été publiée.",
	"Weiterlesen →": "Lire la suite →",
	"Unsere Partner": "Nos partenaires",
	"Clubnews ·": "Actualités du club ·",
	"Weitere Informationen": "Informations complémentaires",
	"Mehr erfahren": "En savoir plus",
	"Unsere Leidenschaft": "Notre passion",
	"← Zur Clubübersicht": "← Présentation du club",
	"Ein Bild aus unserem Clubleben folgt.": "Une photo de la vie du club sera ajoutée.",
	"Seite nicht gefunden": "Page introuvable",
	"Zur Clubübersicht": "Retour à la présentation du club",
	"Swiss TR-Club · Zubehör und Clubartikel": "Swiss TR-Club · Accessoires et articles du club",
	"Artikel für TR-Freunde: Entdecke Clubkleidung, Zubehör und ausgewählte Artikel.": "Pour les passionnés de TR : découvrez les vêtements du club, les accessoires et notre sélection d’articles.",
	"← Zum Marktplatz": "← Petites annonces",
	"← Zur Übersicht": "← Retour à la liste",
	"Inhalt wird geladen …": "Chargement du contenu…",
	"Diese Seite wird vorbereitet. Der Inhalt ist noch nicht veröffentlicht.": "Cette page est en préparation. Son contenu n’a pas encore été publié.",
	"Hier erscheint das ausgewählte Titelbild.": "L’image principale choisie apparaîtra ici.",
	"Hier steht später der Text der ersten Spalte.": "Le texte de la première colonne apparaîtra ici.",
	Fahrzeugdaten: "Données du véhicule",
	"Platz für Kontakte und weitere Informationen.": "Espace pour les contacts et les informations complémentaires.",
	Treffpunkt: "Lieu de rencontre",
	"Nächste Treffen": "Prochaines rencontres",
	"WhatsApp-Gruppe": "Groupe WhatsApp",
	"QR-Code zur WhatsApp-Gruppe": "Code QR du groupe WhatsApp",
	"Gruppe beitreten": "Rejoindre le groupe",
	"Neue Veranstaltungen werden hier angekündigt. Alle Termine findest du in der": "Les nouveaux événements sont annoncés ici. Retrouvez toutes les dates dans l’",
	"Bild folgt": "Photo à venir",
	"Die aktuellen Modellinhalte konnten nicht geladen werden.": "Le contenu actuel des modèles n’a pas pu être chargé.",
	"Triumph-Modelle und Fahrzeugdaten": "Modèles Triumph et données des véhicules",
	"Bild, Texte und Fahrzeugdaten bearbeiten →": "Modifier la photo, les textes et les données du véhicule →",
	"Die Triumph TR-Modelle": "Les modèles Triumph TR",
	"Jeder TR hat seinen eigenen Charakter. Entdecke die Modelle und ihre Fahrzeugdaten.": "Chaque TR a son caractère. Découvrez les modèles et leurs caractéristiques.",
	"← Zum Club": "← Le club",
	"Zum Marktplatz": "Petites annonces",
	"Noch ergänzen": "À compléter",
	"Auf einen Blick": "En bref",
	"Alle Neuigkeiten anzeigen ↓": "Afficher toutes les actualités ↓",
	"Weitere Neuigkeiten laden ↓": "Charger d’autres actualités ↓",
	"Funktion (FR)": "Fonction (FR)",
	"Bezeichnung (FR, optional)": "Désignation (FR, facultatif)",
	"Bildbeschreibung (FR)": "Légende (FR)",
	"Inhalt (FR)": "Contenu (FR)",
	"Kurztext (FR)": "Résumé (FR)",
	"Französische Fassung": "Version française",
	"Clubleben im Swiss TR-Club": "Vie du Swiss TR-Club",
	Zürich: "Zurich",
	Bern: "Berne",
	Ostschweiz: "Suisse orientale",
	Innerschweiz: "Suisse centrale",
	Nordwestschweiz: "Suisse du Nord-Ouest",
	Präsident: "Président",
	Aktuar: "Secrétaire",
	"Redaktion und Medien": "Rédaction et médias",
	"Verantwortlicher Technik": "Responsable technique",
	"Event Koordinator": "Coordinateur des événements",
	"Regionen und Suisse Romande": "Régions et Suisse romande",
	"Euro Koordination": "Coordination européenne",
	Vakant: "Vacant",
	"Serpentinen einer Alpenstrasse aus der Vogelperspektive": "Lacets d’une route alpine vus du ciel",
	"Triumph-Roadster bei einem Treffen am See": "Roadsters Triumph lors d’une rencontre au bord du lac",
	"Club-Roadster im Morgenlicht vor einer Bergkulisse": "Roadster du club dans la lumière du matin devant les montagnes",
	"Rote Triumph-Roadster und glänzende Chromdetails": "Roadsters Triumph rouges et détails chromés brillants",
	"Rotes Triumph-TR6-Heck mit britischem Emblem": "Arrière d’une Triumph TR6 rouge avec emblème britannique",
	"Roadster und Besucher auf einer Wiese am See mit Bergen im Hintergrund": "Roadsters et visiteurs dans un pré au bord du lac, avec les montagnes en arrière-plan",
	"Triumph-Roadster am See im Abendlicht": "Roadster Triumph au bord du lac dans la lumière du soir",
	"Sonnenlicht auf der Motorhaube eines offenen Roadsters": "Soleil sur le capot d’un roadster ouvert",
	"Scheinwerfer und Chromstossstange eines roten Triumph": "Phare et pare-chocs chromé d’une Triumph rouge",
	"Mehrere Triumph-Roadster auf einer kurvigen Bergstrasse": "Plusieurs roadsters Triumph sur une route de montagne sinueuse",
	"Motorraum eines roten klassischen Roadsters": "Compartiment moteur d’un roadster classique rouge",
	"Heck eines hellblauen Triumph mit Chromgepäckträger": "Arrière d’une Triumph bleu clair avec porte-bagages chromé",
	"Club-Impression: Roadster bei einem Treffen am See": "Souvenir du club : roadster lors d’une rencontre au bord du lac",
	"Club-Impression: gemeinsam unterwegs auf einer Passstrasse": "Souvenir du club : ensemble sur une route de col",
	"TRiungsters bearbeiten": "Modifier les TRiungsters",
	"Region bearbeiten": "Modifier la région",
	"Moderator-Login": "Connexion modérateur",
	Ansprechperson: "Personne de contact",
	"Ansprechperson folgt": "La personne de contact sera indiquée prochainement",
	"TRiungsters-Kontakt": "Contact TRiungsters",
	Regionalleitung: "Responsable régional",
	"Treffpunkt wird ergänzt": "Le lieu de rencontre sera précisé",
	"Die nächsten Stammtischtermine werden hier ergänzt.": "Les prochaines rencontres régulières seront indiquées ici.",
	"In Verbindung bleiben und sich für die nächste Ausfahrt verabreden.": "Garder le contact et organiser la prochaine sortie.",
	"Der Gruppenlink wird noch ergänzt.": "Le lien du groupe sera ajouté prochainement.",
	"Über die TRiungsters": "À propos des TRiungsters",
	"Regionale Informationen": "Informations régionales",
	"TRiungsters-News": "Actualités des TRiungsters",
	"Regionale Neuigkeiten": "Actualités régionales",
	"Regionale Veranstaltungen": "Événements régionaux",
	"Informationen zu unserer Gemeinschaft folgen.": "Des informations sur notre communauté seront ajoutées prochainement.",
	"Noch keine Neuigkeiten veröffentlicht.": "Aucune actualité publiée pour le moment.",
	"Beispielansicht · redaktioneller Inhalt noch nicht veröffentlicht": "Aperçu · contenu rédactionnel pas encore publié",
	"Porträt & Fahrzeugdaten": "Présentation et caractéristiques",
	"Beispielansicht · Bild und Daten folgen": "Aperçu · photo et caractéristiques à venir",
	Bauzeit: "Période de production",
	Hubraum: "Cylindrée",
	Leistung: "Puissance",
	Stückzahl: "Nombre d’exemplaires",
	"Club-Logo": "Logo du club",
	"Die Freude am Fahren bringt uns zusammen.": "Le plaisir de conduire nous rassemble.",
	"Gemeinsam unterwegs": "En route ensemble",
	"Bewegung reduziert": "Animations réduites",
	Abspielen: "Lancer",
	Pause: "Pause",
	"Datum folgt": "Date à venir",
	Rückblick: "Rétrospective",
	Bevorstehend: "À venir",
	"Details öffnen": "Ouvrir les détails",
	"Veranstaltungen werden geladen …": "Chargement des événements…",
	"Die Veranstaltungen sind derzeit nicht erreichbar.": "Les événements sont momentanément indisponibles.",
	"Neue Termine erscheinen hier, sobald sie veröffentlicht sind.": "Les nouvelles dates apparaîtront ici dès leur publication.",
	lesen: "lire",
	öffnen: "ouvrir",
	"Website in neuem Tab": "Site web dans un nouvel onglet",
	"Die nächsten Treffen findest du hier.": "Vous trouverez ici les prochaines rencontres.",
	"Agenda derzeit nicht erreichbar": "Agenda momentanément indisponible",
	"Bitte versuche es in der Terminübersicht erneut.": "Veuillez réessayer dans l’agenda.",
	"Das nächste Wiedersehen": "Notre prochaine rencontre",
	"Aktuell sind noch keine kommenden Termine veröffentlicht. Die Regionen ergänzen ihre Treffen hier.": "Aucune date à venir n’est publiée pour le moment. Les régions ajoutent leurs rencontres ici.",
	"Inhalte konnten nicht aktualisiert werden. Bitte erneut laden.": "Impossible d’actualiser les contenus. Veuillez recharger.",
	"Inhalte konnten nicht geladen werden.": "Impossible de charger les contenus.",
	Seitenpfad: "Fil d’Ariane",
	Bibliotheksbereiche: "Rubriques de la bibliothèque",
	Forumsbereiche: "Rubriques du forum",
	"TR-Newsletter": "TR-Newsletter",
	Reiseberichte: "Récits de voyage",
	Clubdokumente: "Documents du club",
	"Operative Reglemente": "Règlements opérationnels",
	Vorstandsunterlagen: "Documents du comité",
	"Ersatzteile / Teile gesucht": "Pièces détachées / pièces recherchées",
	Bibliotheksgruppe: "Rubrique de la bibliothèque",
	"Weitere Filter": "Autres filtres",
	"Album bearbeiten": "Modifier l’album",
	Bildbeschriftung: "Légende de la photo",
	"Bild herunterladen": "Télécharger la photo",
	Teilnahmeinformationen: "Informations de participation",
	Organisator: "Organisateur",
	"Mitgliederkonto des Organisators (optional)": "Compte membre de l’organisateur (facultatif)",
	"Kein Konto zugeordnet": "Aucun compte attribué",
	"Abmeldefrist anpassen": "Adapter le délai d’annulation",
	"Weekend Meeting (bisherige Zuordnung)": "Weekend Meeting (ancienne attribution)",
	Willkommen: "Bienvenue",
	"Fahrzeuge erfassen": "Ajouter des véhicules",
	"Aktivitäten & Mitteilungen": "Activités et messages",
	"Meine Aktivitäten": "Mes activités",
	"Meine Inserate verwalten": "Gérer mes annonces",
	Schnellzugriffe: "Accès rapides",
	"Weitere Bereiche": "Autres rubriques",
	"← Zur Marktplatzübersicht": "← Aperçu de la bourse",
	"Meine Inserate": "Mes annonces",
	"Passende Modelle (optional)": "Modèles compatibles (facultatif)",
	Produktbild: "Image du produit",
	"Einstandspreis in CHF (optional)": "Prix de revient en CHF (facultatif)",
	"Varianten nach Grösse": "Variantes par taille",
	"Für jede Grösse gelten ein eigener Preis, Lagerbestand und ein optionales Bild.": "Chaque taille dispose de son prix, de son stock et d’une image facultative.",
	Variante: "Variante",
	"Grösse *": "Taille *",
	"Variantenbild (optional)": "Image de la variante (facultative)",
	"Variante entfernen": "Supprimer la variante",
	"Variante hinzufügen": "Ajouter une variante",
	"Der Artikel wird als Entwurf gespeichert und kann anschliessend geprüft und veröffentlicht werden.": "L’article est enregistré comme brouillon pour être vérifié puis publié.",
	"Artikel prüfen und veröffentlichen": "Vérifier et publier l’article",
	"Direktverkauf & manuelle Bestellung": "Vente directe et commande manuelle",
	"Artikel werden geladen …": "Chargement des articles…",
	Transaktionsart: "Type de transaction",
	Direktverkauf: "Vente directe",
	"Telefon / manuelle Bestellung": "Téléphone / commande manuelle",
	"Gratisabgabe Vorstand": "Remise gratuite au comité",
	"Geschenk / Preis / Clubzweck": "Cadeau / prix / usage du club",
	"Mitglied (optional)": "Membre (facultatif)",
	"Gast / keine Zuordnung": "Invité / aucune attribution",
	"E-Mail (optional)": "E-mail (facultatif)",
	"Artikel / Variante *": "Article / variante *",
	"Menge *": "Quantité *",
	"Artikel hinzufügen": "Ajouter un article",
	"Grund / Bemerkung": "Motif / remarque",
	Übergabe: "Remise",
	"Direkt übergeben": "Remis directement",
	"Veranstaltung *": "Événement *",
	"Strasse *": "Rue *",
	"PLZ *": "Code postal *",
	"Versandkosten CHF *": "Frais de livraison en CHF *",
	"Versand innerhalb der Schweiz. Abweichende Lieferungen werden in der Bestellverwaltung vereinbart.": "Livraison en Suisse. Les autres livraisons sont convenues dans la gestion des commandes.",
	"Rechnung · Zahlung offen": "Facture · paiement en attente",
	"Barzahlung erhalten": "Paiement en espèces reçu",
	"Externe Zahlung bereits bestätigt": "Paiement externe déjà confirmé",
	"Zahlungsbeleg / Referenz (bei externer Zahlung)": "Justificatif / référence (paiement externe)",
	"Bestellung prüfen": "Vérifier la commande",
	"Regulärer Warenwert": "Valeur normale des marchandises",
	"Beim Speichern wird der Lagerbestand reduziert.": "Le stock est réduit lors de l’enregistrement.",
	"Bestellung verbindlich speichern": "Confirmer et enregistrer la commande",
	"Bestellung verwalten": "Gérer la commande",
	"Zubehör und ausgewählte Artikel.": "Accessoires et articles sélectionnés.",
	"Im Sortiment": "Disponible",
	"Derzeit ausverkauft": "Actuellement épuisé",
	"Checkout wird eingerichtet": "Commande en cours de configuration",
	"Preis in CHF *": "Prix en CHF *",
	"Lagerbestand *": "Stock *",
	"Artikelname *": "Nom de l’article *",
	"Entwurf speichern": "Enregistrer le brouillon",
	"Zahlung prüfen": "Vérifier le paiement",
	"TR-Magazin": "TR-Magazine",
	"TR-Newsletter-Archiv": "Archives TR-Newsletter",
	Werkstatthandbücher: "Manuels d’atelier",
	Ersatzteilkataloge: "Catalogues de pièces détachées",
	"Technische Dokumente": "Documents techniques",
	Fahrzeugdokumente: "Documents des véhicules",
	Roadbooks: "Carnets de route",
	"Statuten / Mitgliederreglemente": "Statuts / règlements des membres",
	"Allgemeine Clubdokumente": "Documents généraux du club",
	"Finanz- / GV-Unterlagen für Mitglieder": "Documents financiers / d’assemblée générale pour les membres",
	"Operative Arbeitsdokumente": "Documents de travail opérationnels",
	"Regional- / Moderatorendokumente": "Documents des régions / de modération",
	"Interne Vorstandsunterlagen": "Documents internes du comité",
	"Vertrauliche Finanz- / Führungsunterlagen": "Documents financiers / de direction confidentiels",
	"Anderer Triumph": "Autre Triumph",
	Beitrag: "Publication",
	Beiträge: "Publications",
	"Bisheriges Dokument": "Document existant",
	Antworten: "Réponses",
	"Neue Antwort:": "Nouvelle réponse :"
}, i = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), a = /* @__PURE__ */ e(((e, t) => {
	t.exports = i();
})), o = n(), s = a(), c = {
	Startseitenübersicht: "Vue d’ensemble de l’accueil",
	"Beiträge für «Das Neueste» auswählen": "Choisir les dernières nouvelles",
	"Magazin bedienen": "Commandes du magazine",
	"Seite verkleinern": "Réduire la page",
	"Seite vergrössern": "Agrandir la page",
	"Für vorlesbaren Inhalt Textansicht wählen.": "Choisir la vue texte pour un contenu lisible à voix haute.",
	"Diese Seite enthält keinen auslesbaren Text. Bitte die Seitenansicht verwenden.": "Cette page ne contient pas de texte extractible. Utiliser la vue de la page.",
	"Kein Zugriff auf die Startseitenübersicht.": "Accès à la sélection de l’accueil refusé.",
	"Die Auswahl wurde inzwischen geändert. Bitte neu laden.": "La sélection a été modifiée entre-temps. Recharger la page.",
	"Bitte höchstens zwölf Beiträge auswählen.": "Sélectionner douze publications au maximum.",
	"Ungültige Beitragsauswahl.": "Sélection de publications invalide.",
	"Ein ausgewählter Beitrag ist nicht mehr verfügbar. Bitte die Auswahl aktualisieren.": "Une publication sélectionnée n’est plus disponible. Actualiser la sélection.",
	"Die Auswahl wurde gleichzeitig geändert. Bitte neu laden.": "La sélection a été modifiée simultanément. Recharger la page.",
	"Diese Seite konnte nicht angezeigt werden. Bitte erneut versuchen oder die PDF herunterladen.": "Cette page n’a pas pu être affichée. Réessayer ou télécharger le PDF.",
	"Die Suche konnte nicht abgeschlossen werden.": "La recherche n’a pas pu être terminée.",
	"Ihre Zuständigkeiten werden geladen …": "Chargement de vos domaines de responsabilité…",
	"Zur Übersicht zurückkehren? Nicht gespeicherte Eingaben gehen verloren.": "Revenir à la vue d’ensemble ? Les modifications non enregistrées seront perdues.",
	...r,
	Mitglieder: "Membres",
	Mitgliederbereich: "Espace membres",
	"Mitglieder-Login": "Connexion membres",
	"Mein Profil & meine Triumphs": "Mon profil et mes Triumph",
	Mitgliederverzeichnis: "Annuaire des membres",
	Mitgliederliste: "Liste des membres",
	"Für Clubmitglieder": "Pour les membres du club",
	"Mein Mitgliederbereich": "Mon espace membre",
	Galerie: "Galerie",
	Bibliothek: "Bibliothèque",
	Forum: "Forum",
	Agenda: "Agenda",
	Regionen: "Régions",
	Marktplatz: "Petites annonces",
	"TR-Shop": "Boutique TR",
	Kontakt: "Contact",
	"Kontakt & Recht": "Contact et informations légales",
	"Kontakt & Impressum": "Contact et mentions légales",
	Datenschutz: "Protection des données",
	Statuten: "Statuts",
	Dashboard: "Tableau de bord",
	"Über den Club": "Le club",
	Entdecken: "Découvrir",
	Veranstaltungen: "Événements",
	"Kommende Veranstaltungen": "Prochains événements",
	"Anstehende Veranstaltungen": "Prochains événements",
	"Vergangene Veranstaltungen": "Événements passés",
	Organisation: "Organisation",
	Leitbild: "Nos valeurs",
	Anmeldung: "Inscription",
	"Mein Profil & Triumphs": "Mon profil et mes Triumph",
	"Meine Triumphs": "Mes Triumph",
	"Meine Mitgliedschaft": "Mon adhésion",
	"Meine Anmeldungen": "Mes inscriptions",
	"Meine Bestellungen": "Mes commandes",
	"Meine Beiträge und Inserate": "Mes publications et annonces",
	"Meine Moderationsaufgaben": "Mes tâches de modération",
	Benachrichtigungen: "Notifications",
	"Aktuelles Magazin": "Magazine actuel",
	Abbrechen: "Annuler",
	Speichern: "Enregistrer",
	Bearbeiten: "Modifier",
	Freigeben: "Approuver",
	Ablehnen: "Refuser",
	Wiederherstellen: "Restaurer",
	"Zur Prüfung einreichen": "Soumettre à validation",
	"Änderungen speichern": "Enregistrer les modifications",
	"Ins Archiv verschieben": "Archiver",
	Archiv: "Archives",
	Suchen: "Rechercher",
	Suche: "Recherche",
	Sortieren: "Trier",
	Nachname: "Nom de famille",
	Ort: "Localité",
	Region: "Région",
	Modell: "Modèle",
	Titel: "Titre",
	Beschreibung: "Description",
	Dokumentart: "Type de document",
	Fahrzeug: "Véhicule",
	Sprache: "Langue",
	Jahr: "Année",
	Bereich: "Rubrique",
	Technikbereich: "Domaine technique",
	"PDF durchsuchen": "Rechercher dans le PDF",
	Vollbild: "Plein écran",
	Textansicht: "Vue texte",
	Seitenansicht: "Vue page",
	"PDF herunterladen": "Télécharger le PDF",
	"Zurück zur Übersicht": "Retour à la liste",
	"Erneut versuchen": "Réessayer",
	"Erneut laden": "Recharger",
	"Neu laden": "Recharger",
	"Nur meine Beiträge": "Mes publications uniquement",
	"Nur meine Inserate": "Mes annonces uniquement",
	"Alle Dokumentarten": "Tous les types de documents",
	"Alle Fahrzeuge": "Tous les véhicules",
	"Alle Sprachen": "Toutes les langues",
	"Alle Bereiche": "Toutes les rubriques",
	"Alle Modelle": "Tous les modèles",
	"Alle Technikbereiche": "Tous les domaines techniques",
	"Alle Regionen": "Toutes les régions",
	"Bitte wählen": "Veuillez choisir",
	Deutsch: "Allemand",
	Français: "Français",
	English: "Anglais",
	Mehrsprachig: "Multilingue",
	"Nicht angegeben": "Non indiqué",
	"Unbekannt / nicht angegeben": "Inconnu / non indiqué",
	"Thema erstellen": "Créer un sujet",
	"Thema öffnen": "Ouvrir le sujet",
	"Thema schliessen": "Fermer le sujet",
	"Thema abonnieren": "Suivre le sujet",
	"Abonnement beenden": "Ne plus suivre",
	"Ihre Antwort": "Votre réponse",
	"Antwort veröffentlichen": "Publier la réponse",
	"Dieses Thema ist geschlossen.": "Ce sujet est fermé.",
	Fahrzeuge: "Véhicules",
	Technik: "Technique",
	Restaurationen: "Restaurations",
	"Teile gesucht": "Pièces recherchées",
	"Garagen / Spezialisten": "Garages / spécialistes",
	"Events & Reisen": "Événements et voyages",
	Clubleben: "Vie du club",
	Motor: "Moteur",
	"Getriebe / Overdrive": "Boîte de vitesses / overdrive",
	Antrieb: "Transmission",
	"Fahrwerk / Lenkung": "Châssis / direction",
	Bremsen: "Freins",
	Elektrik: "Électricité",
	Karosserie: "Carrosserie",
	Innenausstattung: "Intérieur",
	"Räder / Reifen": "Roues / pneus",
	Sonstiges: "Autres",
	Zubehör: "Accessoires",
	Teile: "Pièces",
	"Fotos hochladen": "Importer des photos",
	Album: "Album",
	"Neues Album anlegen": "Créer un album",
	"Album öffnen": "Ouvrir l’album",
	"Material öffnen": "Ouvrir le document",
	"Material hochladen": "Importer un document",
	"Fotograf/in *": "Photographe *",
	Bildbeschreibung: "Légende de la photo",
	"Bildbeschreibung speichern": "Enregistrer la légende",
	"Vorheriges Bild": "Photo précédente",
	"Nächstes Bild": "Photo suivante",
	"Original herunterladen": "Télécharger l’original",
	"Für öffentliche Galerie auswählen": "Sélectionner pour la galerie publique",
	"Original länger als zwölf Monate aufbewahren": "Conserver l’original plus de douze mois",
	"In Prüfung": "En cours de validation",
	Veröffentlicht: "Publié",
	"Entwurf / abgelehnt": "Brouillon / refusé",
	Bestätigt: "Confirmé",
	Warteliste: "Liste d’attente",
	Abgemeldet: "Annulé",
	"Zahlung offen": "Paiement en attente",
	"Teilweise bezahlt": "Partiellement payé",
	"Zahlung ausstehend": "Paiement en attente",
	"Keine Zahlung erforderlich": "Aucun paiement requis",
	Archiviert: "Archivé",
	"Ersatzteile finden": "Trouver des pièces",
	"Fahrzeuge entdecken": "Découvrir les véhicules",
	"Verkäufer kontaktieren": "Contacter le vendeur",
	"Name *": "Nom *",
	"E-Mail-Adresse *": "Adresse e-mail *",
	"Telefon (optional)": "Téléphone (facultatif)",
	"Nachricht *": "Message *",
	"Anfrage senden": "Envoyer la demande",
	"Als verkauft markieren": "Marquer comme vendu",
	"Verkauf bestätigen": "Confirmer la vente",
	Zurück: "Retour",
	"Standort *": "Localité *",
	"Zustand *": "État *",
	Neu: "Neuf",
	Neuwertig: "Comme neuf",
	Fahrbereit: "En état de rouler",
	"In Restauration": "En restauration",
	Angebotsart: "Type d’offre",
	Preisangabe: "Prix",
	Verkauf: "Vente",
	Tausch: "Échange",
	"Kostenlos abzugeben": "À donner",
	Festpreis: "Prix fixe",
	Verhandlungsbasis: "À négocier",
	"Preis auf Anfrage": "Prix sur demande",
	"Inserat-Titel *": "Titre de l’annonce *",
	"Baujahr *": "Année *",
	"Aussenfarbe (optional)": "Couleur extérieure (facultatif)",
	"Innenfarbe (optional)": "Couleur intérieure (facultatif)",
	"Teilebereich (optional)": "Catégorie de pièces (facultatif)",
	"Beschreibung *": "Description *",
	"Artikel erstellen": "Créer un article",
	"Artikelname *": "Nom de l’article *",
	"Preis in CHF *": "Prix en CHF *",
	"Lagerbestand *": "Stock *",
	"Entwurf speichern": "Enregistrer le brouillon",
	"Das Sortiment": "Les articles",
	"Im Sortiment": "Disponible",
	Ausverkauft: "Épuisé",
	"Derzeit ausverkauft": "Actuellement épuisé",
	Rechnung: "Facture",
	TWINT: "TWINT",
	Karte: "Carte",
	"Mein Profil": "Mon profil",
	"Kontaktdaten ändern": "Modifier mes coordonnées",
	Mitgliedsnummer: "Numéro de membre",
	Mitgliedschaft: "Adhésion",
	"Profileinstellungen speichern": "Enregistrer les préférences",
	"Änderungsanfrage speichern": "Enregistrer la demande de modification",
	"Profilbild & Sichtbarkeit": "Photo et visibilité",
	"Profilbild entfernen": "Supprimer la photo",
	"Profilbild (optional)": "Photo de profil (facultatif)",
	Fahrzeugstatus: "État du véhicule",
	"Fahrzeuge pflegen →": "Gérer mes véhicules →",
	"Profil öffnen": "Ouvrir le profil",
	"Karte anzeigen": "Afficher la carte",
	"Liste anzeigen": "Afficher la liste",
	"Zurück zu meinem Bereich": "Retour à mon espace",
	"Keine passenden Mitglieder gefunden.": "Aucun membre correspondant.",
	"Noch keine Fahrzeuge erfasst.": "Aucun véhicule enregistré.",
	"Noch keine Anmeldungen.": "Aucune inscription.",
	"Noch keine Beiträge eingereicht.": "Aucune publication soumise.",
	"Noch keine Bestellungen.": "Aucune commande.",
	"Keine neuen Benachrichtigungen.": "Aucune nouvelle notification.",
	"Keine bevorstehenden Veranstaltungen.": "Aucun événement à venir.",
	"Die vollständige Galerie steht Clubmitgliedern zur Verfügung.": "La galerie complète est réservée aux membres du club.",
	"Zugang bestätigt": "Accès confirmé",
	Aktiv: "Actif",
	"Administrativer Zugang": "Accès administratif",
	"Anträge & Anfragen": "Demandes",
	"Agenda verwalten": "Gérer l’agenda",
	"Rollen und Zuständigkeiten": "Rôles et responsabilités",
	"Kategorien verwalten": "Gérer les catégories",
	Funktionsrollen: "Rôles fonctionnels",
	"Regionen und Veranstaltungen": "Régions et événements",
	"Zugewiesene Veranstaltungen": "Événements attribués",
	Bibliothekszugriff: "Accès à la bibliothèque",
	Berechtigung: "Autorisation",
	Mitgliederunterlagen: "Documents pour les membres",
	"Weitere Bereiche": "Autres rubriques",
	Dokumentarten: "Types de documents",
	Teilekategorien: "Catégories de pièces",
	Forumsbereiche: "Rubriques du forum",
	Technikbereiche: "Domaines techniques",
	Standardzugriff: "Accès par défaut",
	Vorstand: "Comité",
	"Berechtigte Clubfunktionen": "Fonctions autorisées du club",
	Name: "Nom",
	"Vorheriges Inseratbild": "Image précédente",
	"Nächstes Inseratbild": "Image suivante"
};
function l() {
	try {
		return typeof window < "u" && localStorage.getItem("strc_language") === "fr" ? "fr" : "de";
	} catch {
		return "de";
	}
}
var u = l();
function d() {
	return u === "fr" ? "fr-CH" : "de-CH";
}
function f(e) {
	return u === "fr" && c[e] || e;
}
var p = (0, o.createContext)({
	language: "de",
	change: (e) => {}
});
function m({ children: e }) {
	let [t, n] = (0, o.useState)(l);
	(0, o.useEffect)(() => {
		document.documentElement.lang = t, document.cookie = "strc_language=" + t + ";path=/;SameSite=Lax;Secure";
	}, [t]);
	function r(e) {
		if (["de", "fr"].includes(e)) {
			u = e;
			try {
				localStorage.setItem("strc_language", e);
			} catch {}
			n(e);
		}
	}
	return /* @__PURE__ */ (0, s.jsx)(p.Provider, {
		value: {
			language: t,
			change: r
		},
		children: /* @__PURE__ */ (0, s.jsx)("div", {
			className: "language-root",
			children: e
		})
	});
}
function h() {
	let { language: e, change: t } = (0, o.useContext)(p);
	return /* @__PURE__ */ (0, s.jsxs)("div", {
		className: "language-switcher",
		role: "group",
		"aria-label": "Sprache / Langue",
		children: [/* @__PURE__ */ (0, s.jsx)("button", {
			"aria-pressed": e === "de",
			onClick: () => t("de"),
			children: "DE"
		}), /* @__PURE__ */ (0, s.jsx)("button", {
			"aria-pressed": e === "fr",
			onClick: () => t("fr"),
			children: "FR"
		})]
	});
}
function g() {
	return (0, o.useContext)(p);
}
//#endregion
export { g as a, d as i, m as n, a as o, f as r, n as s, h as t };
