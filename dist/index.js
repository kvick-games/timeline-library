import { jsx as i, jsxs as h, Fragment as xt } from "react/jsx-runtime";
import Rt, { useState as Te, useRef as ne, useMemo as we, useEffect as Ae, useCallback as fn, useImperativeHandle as Qr } from "react";
import { flushSync as On } from "react-dom";
import { EyeOff as Wn, Eye as Hn, RotateCcw as Jt, Layers3 as ot, ArrowLeft as Jr, CalendarDays as ea, BookOpen as Vn, ExternalLink as ei, ArrowUp as ti, ArrowDown as ai, X as Gn, SlidersHorizontal as ni, ChevronDown as ri, ArrowRight as ii, Sparkles as oi, Check as si, BrainCircuit as li, Globe2 as ci, Image as di, Clapperboard as jn, AudioLines as ui, Box as mi, Code2 as fi, Bot as pi, CarFront as hi } from "lucide-react";
import { AnimatePresence as Ge, motion as xe } from "motion/react";
const gi = 1e3 * 60 * 60 * 24;
function vi(t, a, n, r) {
  const e = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${e(t)}-${e(a)}-${e(n)}-${r}`;
}
function _e(t) {
  return /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
}
function Le(t, a = { month: "short", day: "numeric", year: "numeric" }, n = "day") {
  const r = typeof t == "string" ? _e(t) : t;
  return Number.isNaN(r.getTime()) ? typeof t == "string" ? t : "Date unavailable" : n === "year" ? r.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric"
  }) : n === "month" ? r.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    year: "numeric"
  }) : r.toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...a
  });
}
function qn(t, a, n = "day", r = "day") {
  if (!a || a === t)
    return Le(t, void 0, n);
  const e = _e(t), s = _e(a);
  if (Number.isNaN(e.getTime()) || Number.isNaN(s.getTime()))
    return `${t} - ${a}`;
  if (s.getTime() < e.getTime())
    return `${Le(t, void 0, n)} - ${Le(a, void 0, r)}`;
  if (n !== "day" || r !== "day")
    return `${Le(e, void 0, n)} - ${Le(s, void 0, r)}`;
  const c = e.getUTCFullYear() === s.getUTCFullYear();
  return c && e.getUTCMonth() === s.getUTCMonth() ? `${Le(e, { month: "short", day: "numeric" })}-${Le(s, { day: "numeric" })}, ${s.getUTCFullYear()}` : c ? `${Le(e, { month: "short", day: "numeric" })} - ${Le(s, { month: "short", day: "numeric", year: "numeric" })}` : `${Le(e)} - ${Le(s)}`;
}
function Kn(t, a, n) {
  return n.articleSlug ?? vi(t, a, n.name, n.date);
}
function $s(t) {
  return t.reduce((a, n) => (a[n.slug] = n, a), {});
}
function Us({
  articlesBySlug: t,
  eventTypesById: a,
  fallbackEventTypeId: n,
  groups: r
}) {
  const e = [];
  return r.forEach((s) => {
    s.productLines.forEach((c) => {
      const d = [...c.releases].sort(
        (u, m) => _e(u.date).getTime() - _e(m.date).getTime()
      ), f = d.map((u) => Kn(s.id, c.id, u));
      d.forEach((u, m) => {
        var L, X;
        const g = f[m], w = a[u.eventType ?? n] ?? a[n], y = _e(u.date), x = u.endDate ? _e(u.endDate) : y, M = Number.isNaN(y.getTime()) || Number.isNaN(x.getTime()) ? 1 : Math.max(1, Math.round((x.getTime() - y.getTime()) / gi) + 1);
        e.push({
          accent: s.accent,
          article: t[g] ?? null,
          classes: u.classes ?? c.defaultClasses ?? s.defaultClasses ?? [c.classId],
          companyLogoMark: s.logoMark ?? "generic",
          companyId: s.id,
          companyName: s.name,
          date: u.date,
          dateLabel: Le(u.date, void 0, u.datePrecision),
          dateRangeLabel: qn(u.date, u.endDate, u.datePrecision),
          durationDays: M,
          endDate: u.endDate,
          endDateLabel: u.endDate ? Le(u.endDate) : void 0,
          eventKind: w.kind,
          eventType: w.id,
          eventTypeLabel: w.label,
          eventTypeShortLabel: w.shortLabel,
          name: u.name,
          nextName: ((L = d[m + 1]) == null ? void 0 : L.name) ?? null,
          nextSlug: f[m + 1] ?? null,
          presets: u.presets ?? c.defaultPresets ?? s.defaultPresets,
          tags: u.tags ?? c.defaultTags ?? [],
          previousName: ((X = d[m - 1]) == null ? void 0 : X.name) ?? null,
          previousSlug: f[m - 1] ?? null,
          productLineId: c.id,
          productLineLabel: c.label,
          productLineShortLabel: c.shortLabel,
          slug: g
        });
      });
    });
  }), e;
}
let Ca = null;
function xi(t) {
  Ca = t;
}
function pe() {
  if (!Ca)
    throw new Error("TimelineExperience requires a timeline definition before rendering.");
  return Ca;
}
function ze() {
  return pe().groups;
}
function bi() {
  return pe().facets;
}
function Zn() {
  return pe().filterGroups;
}
function je() {
  return Zn().flatMap((t) => t.domainIds);
}
function nt() {
  return pe().attributeFilterIds;
}
function yi() {
  const t = pe().defaultFilterState;
  return {
    attributeIds: [...t.attributeIds],
    companyIds: [...t.companyIds],
    contentType: t.contentType,
    domainIds: [...t.domainIds]
  };
}
function ta() {
  return pe().contentTypeOptions;
}
function aa() {
  return pe().defaultSortMode;
}
function Qn() {
  return pe().displayLimits;
}
function na() {
  return pe().defaultDisplayLimit;
}
function wi() {
  return pe().eventTypes.reduce(
    (t, a) => (t[a.id] = a, t),
    {}
  );
}
function Je() {
  return pe().copy;
}
function rt() {
  return _e(pe().startDate);
}
function Ht(t, a) {
  if (t.length !== a.length)
    return !1;
  const n = new Set(a);
  return t.every((r) => n.has(r));
}
function We(t, a) {
  const n = new Set(t);
  return a.filter((r) => n.has(r));
}
function bt() {
  return yi();
}
function Oe(t) {
  const a = ze().map((n) => n.id);
  return {
    attributeIds: We(t.attributeIds, nt()),
    companyIds: We(t.companyIds, a),
    contentType: ta().some((n) => n.id === t.contentType) ? t.contentType : "all",
    domainIds: We(t.domainIds, je())
  };
}
function Jn(t, a) {
  return t.contentType === a.contentType && Ht(t.attributeIds, a.attributeIds) && Ht(t.companyIds, a.companyIds) && Ht(t.domainIds, a.domainIds);
}
function jt(t) {
  return bi().find((a) => a.id === t);
}
function pn(t) {
  var a;
  return ((a = jt(t)) == null ? void 0 : a.label) ?? t;
}
function Ti(t) {
  return new Set(je()).has(t);
}
function Ei(t) {
  return We(t.filter(Ti), je());
}
function ha(t) {
  return t.join(",");
}
function ga(t, a) {
  if (!t)
    return [];
  const n = t.split(",").map((r) => r.trim()).filter(Boolean);
  return We(n, a);
}
function hn(t) {
  return t.productLines.reduce((a, n) => {
    const r = n.releases.reduce((e, s) => {
      const c = _e(s.date).getTime();
      return Number.isNaN(c) ? e : Math.max(e, c);
    }, 0);
    return Math.max(a, r);
  }, 0);
}
function Mi(t) {
  var a, n;
  return ((n = (a = pe().scoring) == null ? void 0 : a.getFacetSignificanceBase) == null ? void 0 : n.call(a, t)) ?? 50;
}
function Ni(t) {
  var a, n;
  return ((n = (a = pe().scoring) == null ? void 0 : a.getEventTypeSignificanceBonus) == null ? void 0 : n.call(a, t)) ?? 0;
}
function Di(t, a) {
  var e, s;
  const n = (s = (e = pe().scoring) == null ? void 0 : e.getRecencySignificanceBonus) == null ? void 0 : s.call(
    e,
    t,
    a
  );
  if (n !== void 0)
    return n;
  const r = a - t;
  return r < 0 ? 2 : r <= 60 ? 12 : r <= 180 ? 9 : r <= 365 ? 6 : r <= 730 ? 3 : 0;
}
function er(t, a, n, r) {
  var x, M, L, X;
  const e = _e(n.date), s = n.endDate ? _e(n.endDate) : e, c = Number.isNaN(s.getTime()) ? 0 : Math.round((s.getTime() - rt().getTime()) / it), d = Ia(t, a, n), f = fr(t, a, n), u = ka(n), m = d.reduce(
    (ee, G) => Math.max(ee, Mi(G)),
    40
  ), g = ((M = (x = pe().scoring) == null ? void 0 : x.getTagSignificanceBonus) == null ? void 0 : M.call(x, f)) ?? 0, w = ((X = (L = pe().scoring) == null ? void 0 : L.getGroupRankBonus) == null ? void 0 : X.call(L, t)) ?? 0, y = m + g + w + Ni(u.id) + Di(c, r);
  return ue(Math.round(y), 1, 100);
}
function Ci(t, a, n) {
  return a.releases.reduce(
    (r, e) => Math.max(r, er(t, a, e, n)),
    0
  );
}
function gn(t, a) {
  return t.productLines.reduce(
    (n, r) => Math.max(n, Ci(t, r, a)),
    0
  );
}
function Ri(t, a, n) {
  const r = [...t];
  return a === "significance" ? (r.sort(
    (e, s) => gn(s, n) - gn(e, n) || (e.raceRank ?? 999) - (s.raceRank ?? 999) || e.name.localeCompare(s.name)
  ), r) : a === "latest" ? (r.sort(
    (e, s) => hn(s) - hn(e) || e.name.localeCompare(s.name)
  ), r) : (r.sort((e, s) => e.name.localeCompare(s.name)), r);
}
const it = 1e3 * 60 * 60 * 24, ke = 2.24, Aa = [0.22, 1, 0.36, 1], $e = { duration: 0.34, ease: Aa }, tr = { duration: 0.24, ease: Aa }, Ai = { duration: 0.4, ease: Aa }, pt = 320, ht = 196, Si = "#05070b", Ii = 72, ki = 80, Li = 56, _i = 60, Pi = 8, Fi = 44, $i = 32, Ui = 96, Xi = 56, Yi = 80, zi = 40, Vt = 1, Gt = 1.05, Mt = 4, Bt = 3.4, Bi = 420, Oi = 360, ar = 180, Wi = 300, Hi = 180, Vi = 260, nr = 112, Gi = 380, va = 0.06, gt = 6, rr = 0.92, ji = 25e-5, qi = 0.025, at = 18, Ki = 8, vn = 0.08, xn = 6e-4, Zi = 720, Qi = 720, bn = 540, Ji = 120, yn = 90, wn = 180, xa = 420, ba = 168, ft = 64, eo = 0.88, to = 1.65, ao = 1.45, Tn = 6, no = {
  bottom: 48,
  left: 24,
  right: 24,
  top: 72
}, ir = 760, or = 0.58, ro = 0.58, sr = { x: 0.5, y: 0.46 };
function lr(t) {
  return t ? pe().wideLogoMarks.includes(t) : !1;
}
function Sa(t) {
  return `${"/".endsWith("/") ? "/" : "//"}${t.replace(/^\/+/, "")}`;
}
function ra(t) {
  const a = t.replace(/^#\/?/, ""), n = a.indexOf("?"), r = n >= 0 ? a.slice(0, n) : a, e = n >= 0 ? a.slice(n + 1) : "";
  return {
    params: new URLSearchParams(e),
    path: r
  };
}
function cr(t) {
  const { path: a } = ra(t);
  if (!a)
    return { kind: "timeline" };
  const r = (pe().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), e = a.match(new RegExp(`^(?:${r}|events)/([^/?#]+)$`));
  return e ? { kind: "model", slug: decodeURIComponent(e[1]) } : { kind: "timeline" };
}
function dr(t) {
  const { params: a } = ra(t), n = a.get("ct"), r = bt();
  return Oe({
    attributeIds: ga(a.get("a"), nt()),
    companyIds: ga(a.get("co"), ze().map((e) => e.id)),
    contentType: ta().some((e) => e.id === n) ? n : "all",
    domainIds: a.has("d") ? ga(a.get("d"), je()) : r.domainIds
  });
}
function ur(t) {
  const a = ra(t).params.get("sort");
  return a && pe().sortOptions.some((n) => n.id === a) ? a : aa();
}
function mr(t) {
  const a = ra(t).params.get("rows");
  if (a === "all")
    return "all";
  const n = Number.parseInt(a ?? "", 10);
  return Qn().includes(n) ? n : na();
}
function ya({
  companySortMode: t,
  filterState: a,
  route: n,
  significanceDisplayLimit: r
}) {
  const e = Oe(a), s = bt(), c = new URLSearchParams();
  Ht(e.domainIds, s.domainIds) || c.set("d", ha(e.domainIds)), e.attributeIds.length > 0 && c.set("a", ha(e.attributeIds)), e.contentType !== s.contentType && c.set("ct", e.contentType), e.companyIds.length > 0 && c.set("co", ha(e.companyIds)), t !== aa() && c.set("sort", t), r !== na() && c.set("rows", String(r));
  const d = pe().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items", f = n.kind === "model" ? `/${d}/${encodeURIComponent(n.slug)}` : "/", u = c.toString().replaceAll("%2C", ",");
  return `#${f}${u ? `?${u}` : ""}`;
}
function io() {
  return typeof window > "u" ? { kind: "timeline" } : cr(window.location.hash);
}
function oo() {
  return typeof window > "u" ? bt() : dr(window.location.hash);
}
function so() {
  return typeof window > "u" ? aa() : ur(window.location.hash);
}
function lo() {
  return typeof window > "u" ? na() : mr(window.location.hash);
}
function co(t) {
  return !(t instanceof Element) || t.closest(
    "button, a, input, label, select, textarea, [data-row-focus-label], [data-timeline-pin]"
  ) ? !1 : !!t.closest("[data-timeline-field]");
}
function uo(t, a) {
  if (a && typeof document < "u") {
    const n = document.elementFromPoint(a.clientX, a.clientY);
    if (n)
      return n;
  }
  return t;
}
function wa(t, a, n, r) {
  if (!a)
    return;
  const e = uo(t, r);
  co(e) && n();
}
function mo(t, a) {
  return t.toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...a
  });
}
function Ta(t, a, n) {
  const r = t.replace("#", ""), e = r.length === 3 ? r.split("").map((m) => `${m}${m}`).join("") : r, s = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e))
    return t;
  const c = Number.parseInt(e.slice(0, 2), 16), d = Number.parseInt(e.slice(2, 4), 16), f = Number.parseInt(e.slice(4, 6), 16), u = (m) => Math.round(m + (a - m) * s);
  return `rgb(${u(c)} ${u(d)} ${u(f)})`;
}
function fo(t, a, n) {
  const r = (w) => {
    const y = w.replace("#", "");
    return y.length === 3 ? y.split("").map((x) => `${x}${x}`).join("") : y;
  }, e = r(t), s = r(a), c = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e) || !/^[0-9a-fA-F]{6}$/.test(s))
    return t;
  const d = [e.slice(0, 2), e.slice(2, 4), e.slice(4, 6)].map(
    (w) => Number.parseInt(w, 16)
  ), f = [s.slice(0, 2), s.slice(2, 4), s.slice(4, 6)].map(
    (w) => Number.parseInt(w, 16)
  ), [u, m, g] = d.map(
    (w, y) => Math.round(w + (f[y] - w) * c)
  );
  return `rgb(${u} ${m} ${g})`;
}
function He(t, a) {
  const n = t.replace("#", ""), r = n.length === 3 ? n.split("").map((d) => `${d}${d}`).join("") : n;
  if (!/^[0-9a-fA-F]{6}$/.test(r))
    return `rgba(255, 255, 255, ${a})`;
  const e = Number.parseInt(r.slice(0, 2), 16), s = Number.parseInt(r.slice(2, 4), 16), c = Number.parseInt(r.slice(4, 6), 16);
  return `rgba(${e}, ${s}, ${c}, ${a})`;
}
function po(t, a) {
  return a.defaultClasses ?? t.defaultClasses ?? [a.classId];
}
function ho(t, a) {
  return a.defaultPresets ?? t.defaultPresets;
}
function go(t, a, n) {
  return n.classes ?? po(t, a);
}
function Ia(t, a, n) {
  return n.presets ?? ho(t, a);
}
function vo(t) {
  return t.defaultTags ?? [];
}
function fr(t, a, n) {
  return n.tags ?? vo(a);
}
function ka(t) {
  const a = wi(), n = pe().defaultEventTypeId;
  return a[t.eventType ?? n] ?? a[n];
}
function xo(t) {
  var f;
  const a = Oe(t), n = je().filter((u) => a.domainIds.includes(u)), r = Jn(a, bt()), e = Je();
  if (n.length === 0)
    return {
      description: e.emptyBoardDetail,
      isComposite: !0,
      isDefault: !1,
      isEmpty: !0,
      label: e.emptyBoardLabel
    };
  if (r) {
    const u = a.domainIds[0], m = u ? jt(u) : null;
    return {
      description: (m == null ? void 0 : m.description) ?? e.defaultBoardDescription,
      isComposite: !1,
      isDefault: !0,
      isEmpty: !1,
      label: (m == null ? void 0 : m.label) ?? n.join(", ")
    };
  }
  const c = [n.length === je().length ? "All domains" : n.length === 1 ? pn(n[0]) : `${n.length} domains`];
  a.attributeIds.forEach((u) => {
    c.push(pn(u));
  });
  const d = bt().contentType;
  return a.contentType !== d && c.push(
    ((f = ta().find((u) => u.id === a.contentType)) == null ? void 0 : f.label) ?? a.contentType
  ), a.companyIds.length > 0 && c.push(`${a.companyIds.length} ${e.groupPluralLabel}`), {
    description: c.join(", "),
    isComposite: c.length > 1 || n.length > 1,
    isDefault: !1,
    isEmpty: !1,
    label: c.join(" · ")
  };
}
function bo(t, a) {
  if (a === "all")
    return !0;
  const n = ka(t), r = n.kind === "event" || n.id === "product-launch";
  return a === "events" ? r : !r;
}
function yo(t, a, n, r) {
  const e = Ia(t, a, n), s = r.domainIds.some((d) => e.includes(d)), c = r.attributeIds.length === 0 || r.attributeIds.some((d) => e.includes(d));
  return s && c && bo(n, r.contentType);
}
function ia(t, a, n = {}) {
  const r = Oe(a), e = new Set(r.companyIds);
  return r.domainIds.length === 0 ? [] : t.filter((s) => n.ignoreCompanyFilter || e.size === 0 || e.has(s.id)).map((s) => ({
    ...s,
    productLines: s.productLines.map((c) => ({
      ...c,
      releases: c.releases.filter(
        (d) => yo(s, c, d, r)
      )
    })).filter((c) => c.releases.length > 0)
  })).filter((s) => s.productLines.length > 0);
}
function pr(t) {
  return {
    providerCount: t.length,
    releaseCount: t.reduce(
      (a, n) => a + n.productLines.reduce((r, e) => r + e.releases.length, 0),
      0
    )
  };
}
function wo(t, a) {
  return je().reduce((n, r) => (n[r] = pr(
    ia(t, { ...a, companyIds: [], domainIds: [r] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function To(t, a) {
  return nt().reduce((n, r) => (n[r] = pr(
    ia(t, { ...a, attributeIds: [r], companyIds: [] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function Eo(t, a) {
  return ia(t, { ...a, companyIds: [] }, { ignoreCompanyFilter: !0 }).map((n) => ({
    id: n.id,
    name: n.name,
    releaseCount: n.productLines.reduce((r, e) => r + e.releases.length, 0)
  }));
}
function Mo(t) {
  const a = t.productLines.find((n) => n.classId !== "events") ?? t.productLines[0];
  return (a == null ? void 0 : a.classId) ?? t.defaultClasses[0] ?? pe().defaultClassId;
}
function No(t, a, n) {
  const r = [...t], [e] = r.splice(a, 1);
  return e === void 0 ? t : (r.splice(n, 0, e), r);
}
function oa(t) {
  const a = new Set(ze().map((s) => s.id)), n = t.filter((s) => a.has(s)), r = new Set(n), e = ze().map((s) => s.id).filter((s) => !r.has(s));
  return [...n, ...e];
}
function Do(t, a, n, r, e) {
  const s = new Map(t.map((m) => [m.id, m])), c = new Set(n), d = oa(a).map((m) => s.get(m)).filter((m) => !!m), f = new Set(d.map((m) => m.id)), u = t.filter((m) => !f.has(m.id));
  return Ri(
    [...d, ...u].filter((m) => !c.has(m.id)),
    r,
    e
  );
}
function Co(t, a, n) {
  if (a === "all")
    return t;
  const r = t.slice(0, a);
  if (!n || r.some((s) => s.id === n))
    return r;
  const e = t.find((s) => s.id === n);
  return e ? [...r, e] : r;
}
function Ro(t, a, n, r) {
  if (n === r)
    return t;
  const e = new Set(a), s = oa(t), c = s.filter((g) => e.has(g)), d = c.indexOf(n), f = c.indexOf(r);
  if (d < 0 || f < 0)
    return s;
  const u = No(c, d, f);
  let m = 0;
  return s.map((g) => {
    if (!e.has(g))
      return g;
    const w = u[m];
    return m += 1, w ?? g;
  });
}
function Ao(t, a, n, r) {
  const e = new Set(a), s = oa(t).filter(
    (f) => e.has(f)
  ), c = s.indexOf(n), d = r === "up" ? c - 1 : c + 1;
  return c < 0 || d < 0 || d >= s.length ? t : Ro(t, a, n, s[d]);
}
function So(t, a) {
  const n = [], r = t.map((c) => {
    const d = c.productLines.map((x) => {
      const L = x.releases.map((E) => ({
        ...E,
        classes: go(c, x, E),
        presets: Ia(c, x, E),
        tags: fr(c, x, E)
      })).sort((E, I) => {
        const Y = _e(E.date).getTime(), P = _e(I.date).getTime();
        return Y - P || E.name.localeCompare(I.name);
      }).reduce((E, I) => {
        const Y = _e(I.date), P = I.endDate ? _e(I.endDate) : Y;
        if (Number.isNaN(Y.getTime()))
          return n.push(`${c.name} / ${x.label}: ${I.name}`), E;
        if (I.endDate && Number.isNaN(P.getTime()))
          return n.push(`${c.name} / ${x.label}: ${I.name} end date`), E;
        const O = E[E.length - 1], j = Math.round((Y.getTime() - rt().getTime()) / it), Z = Number.isNaN(P.getTime()) ? j : Math.max(j, Math.round((P.getTime() - rt().getTime()) / it)), W = O ? j - O.globalDay : 0, ce = ka(I), q = er(c, x, I, a);
        return E.push({
          ...I,
          articleSlug: Kn(c.id, x.id, I),
          dateLabel: Le(Y, void 0, I.datePrecision),
          dateRangeLabel: qn(I.date, I.endDate, I.datePrecision),
          durationDays: Z - j + 1,
          endDateLabel: I.endDate ? Le(I.endDate) : void 0,
          endGlobalDay: Z,
          eventKind: ce.kind,
          eventType: ce.id,
          eventTypeLabel: ce.label,
          eventTypeShortLabel: ce.shortLabel,
          globalDay: j,
          gap: W,
          significanceScore: q
        }), E;
      }, []), X = L[L.length - 1] ?? null, ee = L.reduce((E, I) => E + I.gap, 0), G = L.length > 1 ? Math.round(ee / (L.length - 1)) : null, oe = L[0], J = L.reduce(
        (E, I) => Math.max(E, I.significanceScore),
        0
      );
      return {
        ...x,
        averageGap: G,
        latestRelease: X,
        releases: L,
        significanceScore: J,
        startDay: (oe == null ? void 0 : oe.globalDay) ?? 0,
        totalSpan: X && oe ? X.endGlobalDay - oe.globalDay : 0
      };
    }).sort(
      (x, M) => {
        var L, X;
        return M.significanceScore - x.significanceScore || (((L = M.latestRelease) == null ? void 0 : L.globalDay) ?? 0) - (((X = x.latestRelease) == null ? void 0 : X.globalDay) ?? 0) || x.label.localeCompare(M.label);
      }
    ), f = [...d].filter((x) => x.latestRelease).sort((x, M) => {
      var L, X;
      return (((L = M.latestRelease) == null ? void 0 : L.endGlobalDay) ?? 0) - (((X = x.latestRelease) == null ? void 0 : X.endGlobalDay) ?? 0);
    })[0] ?? null, u = (f == null ? void 0 : f.latestRelease) ?? null, m = [...d].flatMap((x) => x.releases).sort((x, M) => x.globalDay - M.globalDay)[0] ?? null, g = d.reduce(
      (x, M) => x + M.releases.reduce((L, X) => L + X.gap, 0),
      0
    ), w = d.reduce(
      (x, M) => x + Math.max(M.releases.length - 1, 0),
      0
    ), y = d.reduce(
      (x, M) => Math.max(x, M.significanceScore),
      0
    );
    return {
      ...c,
      averageGap: w > 0 ? Math.round(g / w) : null,
      latestProductLine: f,
      latestRelease: u,
      productLines: d,
      significanceScore: y,
      startDay: (m == null ? void 0 : m.globalDay) ?? 0,
      totalSpan: u && m ? u.endGlobalDay - m.globalDay : 0
    };
  }), e = r.reduce((c, d) => {
    var u;
    const f = ((u = d.latestRelease) == null ? void 0 : u.endGlobalDay) ?? 0;
    return Math.max(c, f);
  }, 0), s = r.reduce(
    (c, d) => c + d.productLines.reduce((f, u) => f + u.releases.length, 0),
    0
  );
  return {
    invalidEntries: n,
    latestGlobalDay: e,
    processedCompanies: r,
    totalReleases: s
  };
}
function En({ endDay: t, startDay: a }) {
  const n = [], r = [], e = Math.floor(a), s = Math.max(e, Math.ceil(t)), c = new Date(rt().getTime() + e * it), d = new Date(rt().getTime() + s * it), f = new Date(Date.UTC(c.getUTCFullYear(), c.getUTCMonth(), 1));
  for (f.getTime() < c.getTime() && f.setUTCMonth(f.getUTCMonth() + 1); f <= d; ) {
    const u = Math.round((f.getTime() - rt().getTime()) / it);
    f.getUTCMonth() === 0 ? r.push({ days: u, label: f.getUTCFullYear() }) : n.push({
      days: u,
      label: mo(f, { month: "short" })
    }), f.setUTCMonth(f.getUTCMonth() + 1);
  }
  return { monthTicks: n, yearTicks: r };
}
function qt({
  camera: t,
  compact: a = !1,
  futureBufferDays: n = 0,
  pastBufferDays: r = 0,
  viewport: e,
  zoom: s
}) {
  if (e.width <= 0)
    return { endDay: 0, startDay: 0 };
  const c = a ? ht : pt, d = a ? nr : ar, f = Math.max(s, 1e-3), u = t.x, m = t.x + e.width / f, g = (u - d - c) / ke, w = (m - d - c) / ke, y = Math.floor(g - r);
  return { endDay: Math.max(y + 30, Math.ceil(w + n)), startDay: y };
}
function Io(t, a = Ji) {
  const n = Math.max(1, a);
  return {
    endDay: Math.ceil(t.endDay / n) * n,
    startDay: Math.floor(t.startDay / n) * n
  };
}
function Mn({
  camera: t,
  compact: a = !1,
  viewport: n,
  zoom: r
}) {
  return n.width <= 0 ? { endDay: Number.POSITIVE_INFINITY, startDay: Number.NEGATIVE_INFINITY } : Io(
    qt({
      camera: t,
      compact: a,
      futureBufferDays: bn,
      pastBufferDays: bn,
      viewport: n,
      zoom: r
    })
  );
}
function ko(t, a) {
  return t.startDay === a.startDay && t.endDay === a.endDay;
}
function Ot(t, a, n) {
  return a >= n.startDay && t <= n.endDay;
}
function Nn({
  camera: t,
  compact: a = !1,
  minimumDays: n,
  viewport: r,
  zoom: e
}) {
  const s = qt({
    camera: t,
    compact: a,
    futureBufferDays: Zi,
    pastBufferDays: Qi,
    viewport: r,
    zoom: e
  });
  return {
    endDay: Math.max(n, s.endDay),
    startDay: Math.min(0, s.startDay)
  };
}
function Be(t, a) {
  return (t - a) * ke;
}
function Kt(t, a) {
  return Math.max(0, (a - t) * ke);
}
function La(t, a) {
  return t.latestRelease ? Math.max(0, Math.floor(a - t.latestRelease.endGlobalDay)) : 0;
}
function Lo(t, a) {
  return a === 0 ? 100 : Math.max(0, Math.round((1 - t / a) * 100));
}
function _o(t) {
  return `${t} ${t === 1 ? "Day" : "Days"} since last update`;
}
function Ea(t) {
  if (t <= 0)
    return "Same day";
  if (t < 31)
    return `${t} ${t === 1 ? "day" : "days"}`;
  const a = Math.floor(t / 365), n = t - a * 365, r = Math.floor(n / 30), e = n - r * 30, s = [];
  return a > 0 && s.push(`${a} ${a === 1 ? "year" : "years"}`), r > 0 && s.push(`${r} ${r === 1 ? "month" : "months"}`), e > 0 && a === 0 && s.push(`${e} ${e === 1 ? "day" : "days"}`), s.length > 0 ? s.join(", ") : `${t} days`;
}
function Po(t, a) {
  if (a === null || a <= 0)
    return null;
  const n = t - a, r = Math.abs(n);
  return r <= 2 ? `On pace with this line's ${a}-day average` : `${r} ${r === 1 ? "day" : "days"} ${n > 0 ? "slower" : "faster"} than this line's ${a}-day average`;
}
function Qe(t, a = 1) {
  return Math.max(1, Math.round(t * a));
}
function _a(t = !1, a = 1) {
  return Qe(t ? _i : Li, a);
}
function Pa(t, a = !1, n = 1) {
  const r = Math.max(t, 1), e = Qe(a ? ki : Ii, n), s = Qe(Pi, n), c = _a(a, n), d = r * c + Math.max(r - 1, 0) * s, f = Math.max(e, d + (r > 1 ? Qe(16, n) : 0));
  return {
    groupHeight: f,
    lineGap: s,
    lineHeight: c,
    topOffset: Math.max(0, (f - d) / 2)
  };
}
function Fa(t, a = !1, n = 1) {
  return Pa(t.productLines.length, a, n).groupHeight;
}
function $a(t, a, n = !1, r = 1) {
  const { lineGap: e, lineHeight: s, topOffset: c } = Pa(t, n, r);
  return c + a * (s + e) + s / 2;
}
function st(t = !1, a = 1) {
  return {
    bottomPadding: Qe(t ? zi : Xi, a),
    companyGap: Qe(t ? $i : Fi, a),
    topPadding: Qe(t ? Yi : Ui, a)
  };
}
function Zt(t, a = !1, n = 1) {
  const r = st(a, n), e = t.reduce((c, d) => c + Fa(d, a, n), 0), s = Math.max(t.length - 1, 0) * r.companyGap;
  return Math.max(
    Qe(a ? 384 : 448, n),
    e + s + r.topPadding + r.bottomPadding + Qe(a ? 40 : 32, n)
  );
}
function At(t, a = !1, n = 1, r = st(a, n)) {
  let e = r.topPadding;
  return t.map((s, c) => {
    const d = Fa(s, a, n), f = {
      company: s,
      height: d,
      index: c,
      y: e
    };
    return e += d + r.companyGap, f;
  });
}
function Qt({
  compact: t = !1,
  currentGlobalDay: a,
  maxDays: n,
  summaryCount: r,
  timelineStartDay: e = 0,
  timelineHeight: s,
  timelineWidth: c,
  viewport: d
}) {
  const f = Math.max(d.width, t ? 360 : 1024), u = Math.max(d.height, t ? 720 : 680), m = t ? ht : pt, g = t ? nr : ar, w = t ? Gi : Wi, y = t ? Hi : Bi, x = t ? Vi : Oi, M = g + m + a * ke, L = Math.max(0, M - f * (t ? 0.78 : 0.72)), X = t ? Math.min(390, Math.max(292, f - 64)) : 720, ee = t ? Math.min(360, Math.max(280, f - 56)) : 360, G = t ? Math.min(420, Math.max(290, f - 48)) : 520, oe = t ? Math.min(620, Math.max(320, f - 32)) : 1180, J = Math.max(y * 0.34, L + (t ? 20 : f * 0.24)), E = t ? 0 : 4, I = Math.max(
    0,
    Math.min(
      w - u * (t ? 0.28 : 0.24),
      E - (t ? 18 : 24)
    )
  ), Y = t ? J + X + 18 : Math.min(J + X + 28, L + f - ee - 24), P = E + 8, O = J, j = w + s + (t ? 42 : 52), Z = J, W = j + (t ? 132 : 118), ce = t ? f >= 640 ? 2 : 1 : 4, N = Math.max(1, Math.ceil(Math.max(r, 1) / ce)) * (t ? 172 : 224), R = g + m + Math.max(n, 0) * ke, C = g + e * ke, A = Math.max(
    R + y,
    C + c + m + y,
    Y + ee + y,
    Z + oe + y,
    L + f + y
  ), v = Math.max(
    w + s + x,
    W + N + x,
    P + (t ? 152 : 172) + x,
    I + u + x
  );
  return {
    contentCards: {
      intro: { height: t ? 176 : 202, width: X, x: J, y: E },
      latest: { height: t ? 96 : 74, width: G, x: O, y: j },
      notes: { height: t ? 142 : 170, width: ee, x: Y, y: P },
      summaries: { width: oe, x: Z, y: W }
    },
    initialCameraX: L,
    initialCameraY: I,
    railWidth: m,
    timelineX: g,
    timelineY: w,
    worldHeight: v,
    worldWidth: A
  };
}
function Fo(t) {
  return {
    x: t.initialCameraX,
    y: t.initialCameraY
  };
}
function dt(t, a = !1) {
  return {
    camera: Fo(t),
    zoom: a ? Gt : Vt
  };
}
function Ua(t) {
  return Number.isFinite(t) ? Math.max(1e-3, t) : 1;
}
function Xa(t, a) {
  return `translate3d(${-t.x * a}px, ${-t.y * a}px, 0) scale(${a})`;
}
const Ma = /* @__PURE__ */ new WeakMap(), $o = 126;
function Wt(t, a, n) {
  if (!t)
    return;
  t.style.transform = Xa(a, n), t.style.setProperty("--map-zoom", String(Ua(n))), t.style.willChange = "transform";
  const r = Ma.get(t);
  r !== void 0 && window.clearTimeout(r);
  const e = window.setTimeout(() => {
    t.style.willChange = "auto", Ma.delete(t);
  }, $o);
  Ma.set(t, e);
}
function Ve(t) {
  return {
    "--label-size": String(t)
  };
}
function Na(t, a, n) {
  const r = t.maxX - t.minX, e = t.maxY - t.minY, s = Math.max(0, (a - r) / 2), c = Math.max(0, (n - e) / 2);
  return {
    maxX: t.maxX + s,
    maxY: t.maxY + c,
    minX: t.minX - s,
    minY: t.minY - c
  };
}
function Ya(t, a) {
  for (const n of t)
    for (let r = 0; r < n.productLines.length; r += 1) {
      const s = n.productLines[r].releases.find((c) => c.articleSlug === a);
      if (s)
        return { company: n, productLineIndex: r, release: s };
    }
  return null;
}
const hr = 6, Uo = 2.75;
function Xo(t, a, n, r) {
  const e = st(n, r), s = At(t, n, r, e), c = new Map(s.map((f) => [f.company.id, f])), d = [];
  return t.forEach((f) => {
    const u = c.get(f.id);
    u && f.productLines.forEach((m, g) => {
      m.releases.forEach((w) => {
        d.push({
          slug: w.articleSlug,
          x: a.timelineX + a.railWidth + w.globalDay * ke,
          y: a.timelineY + u.y + $a(f.productLines.length, g, n, r)
        });
      });
    });
  }), d;
}
function Yo(t, a, n, r, e, s, c, d) {
  if (e) {
    const u = Ya(t, e);
    if (u) {
      const g = At(
        t,
        n,
        r,
        st(n, r)
      ).find((w) => w.company.id === u.company.id);
      if (g)
        return {
          x: a.timelineX + a.railWidth + u.release.globalDay * ke,
          y: a.timelineY + g.y + $a(u.company.productLines.length, u.productLineIndex, n, r)
        };
    }
  }
  const f = Math.max(c, 1e-3);
  return {
    x: s.x + d.width / (2 * f),
    y: s.y + d.height / (2 * f)
  };
}
function zo(t, a, n, r) {
  const e = (r == null ? void 0 : r.minPrimaryDistance) ?? hr;
  let s = null, c = 1 / 0, d = 1 / 0;
  return a.forEach((f) => {
    if (r != null && r.excludeSlug && f.slug === r.excludeSlug)
      return;
    const u = f.x - t.x, m = f.y - t.y;
    let g = 0, w = 0;
    if (n === "right") {
      if (u < e)
        return;
      g = u, w = Math.abs(m);
    } else if (n === "left") {
      if (u > -e)
        return;
      g = -u, w = Math.abs(m);
    } else if (n === "down") {
      if (m < e)
        return;
      g = m, w = Math.abs(u);
    } else {
      if (m > -e)
        return;
      g = -m, w = Math.abs(u);
    }
    const y = w * Uo + g, x = Math.hypot(u, m);
    (y < c || y === c && x < d) && (s = f, c = y, d = x);
  }), s;
}
function Bo(t) {
  return t === "ArrowRight" ? "right" : t === "ArrowLeft" ? "left" : t === "ArrowDown" ? "down" : t === "ArrowUp" ? "up" : null;
}
function Oo(t) {
  if (t.altKey || t.ctrlKey || t.metaKey)
    return !0;
  const a = t.target;
  return a instanceof Element ? a.closest('[aria-label="Timeline zoom controls"]') ? !0 : !!a.closest('input, textarea, select, [contenteditable="true"]') : !1;
}
function Dn({
  compact: t = !1,
  layout: a,
  productLineIndex: n,
  release: r,
  row: e,
  verticalScale: s = 1
}) {
  const c = _a(t, s), d = a.timelineY + e.y + $a(e.company.productLines.length, n, t, s), f = a.timelineX + a.railWidth + r.globalDay * ke, u = a.timelineX + a.railWidth + r.endGlobalDay * ke, m = t ? 28 : 36;
  return {
    maxX: Math.max(f, u) + m,
    maxY: d + c / 2 + 12,
    minX: Math.min(f, u) - m,
    minY: d - c / 2 - 12
  };
}
function Wo(t, a, n) {
  return n ? a ? { bottom: 40, left: 16, right: 16, top: 64 } : {
    bottom: 48,
    left: 100,
    right: Math.min(ir, Math.round(t.width * or)),
    top: 72
  } : no;
}
function Ho(t, a) {
  const n = Math.min(
    ir,
    Math.round(t.width * or)
  ), e = (t.width - n) * ro, s = Math.max(
    1,
    t.width - a.left - a.right - ft * 2
  );
  return { x: ue(
    (e - a.left - ft) / s,
    0.42,
    0.68
  ), y: sr.y };
}
function Vo({
  anchor: t,
  bounds: a,
  focusMaxZoom: n,
  insets: r,
  layout: e,
  maxZoom: s,
  minZoom: c,
  viewport: d
}) {
  if (d.width <= 0 || d.height <= 0)
    return null;
  const f = Math.max(
    1,
    d.width - r.left - r.right - ft * 2
  ), u = Math.max(
    1,
    d.height - r.top - r.bottom - ft * 2
  ), m = Math.max(a.maxX - a.minX, 1), g = Math.max(a.maxY - a.minY, 1), w = Math.min(f / m, u / g) * rr * eo, y = Number(ue(w, c, Math.min(s, n)).toFixed(3)), x = (a.minX + a.maxX) / 2, M = (a.minY + a.maxY) / 2, L = r.left + ft + f * t.x, X = r.top + ft + u * t.y, ee = Math.max(0, e.worldWidth - d.width / y), G = Math.max(0, e.worldHeight - d.height / y);
  return {
    camera: {
      x: ue(x - L / y, 0, ee),
      y: ue(M - X / y, 0, G)
    },
    zoom: y
  };
}
function gr(t, a, n, r, e = !1, s = 1) {
  if (t.kind === "bounds")
    return t.bounds;
  const c = st(e, s), d = At(a, e, s, c);
  if (t.kind === "slug") {
    const y = Ya(a, t.slug);
    if (!y)
      return null;
    const x = d.find((L) => L.company.id === y.company.id);
    if (!x)
      return null;
    const M = Dn({
      compact: e,
      layout: n,
      productLineIndex: y.productLineIndex,
      release: y.release,
      row: x,
      verticalScale: s
    });
    return Na(M, xa, ba);
  }
  if (t.kind === "slugs") {
    const y = t.slugs.map(
      (x) => gr(
        { kind: "slug", slug: x },
        a,
        n,
        r,
        e,
        s
      )
    ).filter((x) => !!x);
    return y.length === 0 ? null : y.reduce(
      (x, M) => ({
        maxX: Math.max(x.maxX, M.maxX),
        maxY: Math.max(x.maxY, M.maxY),
        minX: Math.min(x.minX, M.minX),
        minY: Math.min(x.minY, M.minY)
      }),
      y[0]
    );
  }
  if (t.kind === "release") {
    const y = d.find((L) => L.company.id === t.companyId);
    if (!y)
      return null;
    const x = y.company.productLines.findIndex((L) => L.id === t.productLineId);
    if (x < 0)
      return null;
    const M = Dn({
      compact: e,
      layout: n,
      productLineIndex: x,
      release: {
        endGlobalDay: t.endGlobalDay ?? t.globalDay,
        globalDay: t.globalDay
      },
      row: y,
      verticalScale: s
    });
    return Na(M, xa, ba);
  }
  const f = n.timelineX + n.railWidth + t.globalDay * ke, u = t.endGlobalDay ?? t.globalDay, m = n.timelineX + n.railWidth + u * ke, g = n.timelineY + r * 0.44, w = e ? 100 : 120;
  return Na(
    {
      maxX: Math.max(f, m) + 40,
      maxY: g + w / 2,
      minX: Math.min(f, m) - 40,
      minY: g - w / 2
    },
    xa,
    ba
  );
}
function Go(t, a, n, r) {
  const e = Math.max(a, 1e-3);
  return {
    worldX: t.x + n / e,
    worldY: t.y + r / e
  };
}
function ut(t, a, n, r, e) {
  const s = Math.max(e, 1e-3);
  return {
    x: t - n / s,
    y: a - r / s
  };
}
function Cn({
  anchorX: t,
  anchorY: a,
  camera: n,
  existingAnchor: r,
  zoom: e
}) {
  if (r && r.viewportX === t && r.viewportY === a)
    return r;
  const { worldX: s, worldY: c } = Go(n, e, t, a);
  return {
    viewportX: t,
    viewportY: a,
    worldX: s,
    worldY: c
  };
}
function mt(t, a, n) {
  return t + (a - t) * n;
}
function ue(t, a, n) {
  return Math.min(Math.max(t, a), n);
}
function jo(t) {
  const a = ue(t, 0, 1), n = 1 / (1 + Math.exp(gt / 2)), r = 1 / (1 + Math.exp(-gt / 2));
  return (1 / (1 + Math.exp(-gt * (a - 0.5))) - n) / (r - n);
}
function qo(t) {
  const a = ue(t, 0, 1), n = 1 / (1 + Math.exp(gt / 2)), r = 1 / (1 + Math.exp(-gt / 2)), e = n + a * (r - n);
  return ue(0.5 + Math.log(e / (1 - e)) / gt, 0, 1);
}
function Ra(t, a, n) {
  if (n <= a)
    return a;
  const r = jo(t);
  return a + r * (n - a);
}
function vr(t, a, n) {
  if (n <= a)
    return 0;
  const r = (ue(t, a, n) - a) / (n - a);
  return qo(r);
}
function Dt(t, a, n, r) {
  const e = vr(t, n, r);
  return Ra(e + a, n, r);
}
function Rn(t, a, n) {
  if (t <= 0 || n <= 0)
    return 0.35;
  const r = Math.max(t - a, 120);
  return ue(r / n * rr, 0.08, 1);
}
function Ko(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ i("path", { d: "M11 5v12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ i("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Zo(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ i("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ i("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Ct({ classId: t, className: a }) {
  const n = a ?? "h-4 w-4";
  return t === "frontier-llms" ? /* @__PURE__ */ i(li, { className: n, strokeWidth: 1.8 }) : t === "open-source-llms" ? /* @__PURE__ */ i(ci, { className: n, strokeWidth: 1.8 }) : t === "image-generation" ? /* @__PURE__ */ i(di, { className: n, strokeWidth: 1.8 }) : t === "video-generation" ? /* @__PURE__ */ i(jn, { className: n, strokeWidth: 1.8 }) : t === "audio-generation" ? /* @__PURE__ */ i(ui, { className: n, strokeWidth: 1.8 }) : t === "3d-generation" ? /* @__PURE__ */ i(mi, { className: n, strokeWidth: 1.8 }) : t === "world-models" ? /* @__PURE__ */ i(ot, { className: n, strokeWidth: 1.8 }) : t === "coding-harnesses" ? /* @__PURE__ */ i(fi, { className: n, strokeWidth: 1.8 }) : t === "events" ? /* @__PURE__ */ i(ea, { className: n, strokeWidth: 1.8 }) : t === "robotics" ? /* @__PURE__ */ i(pi, { className: n, strokeWidth: 1.8 }) : t === "vehicle-autonomy" ? /* @__PURE__ */ i(hi, { className: n, strokeWidth: 1.8 }) : /* @__PURE__ */ i(ot, { className: n, strokeWidth: 1.8 });
}
function Qo({
  attributeStats: t,
  boardView: a,
  className: n = "",
  companySortMode: r,
  companyOptions: e,
  domainStats: s,
  filterState: c,
  isOpen: d,
  onAttributeToggle: f,
  onClearAll: u,
  onClearCompanyFilter: m,
  onCompanyToggle: g,
  onCompanySortModeChange: w,
  onContentTypeChange: y,
  onDomainToggle: x,
  onReset: M,
  onSelectAll: L,
  onSignificanceDisplayLimitChange: X,
  onToggle: ee,
  significanceDisplayLimit: G,
  totalMatchedCompanyCount: oe,
  variant: J = "panel",
  visibleCompanyCount: E
}) {
  var he;
  const I = c.domainIds.length + c.attributeIds.length + c.companyIds.length + (c.contentType === "all" ? 0 : 1), Y = J === "rail", P = Y && !d, O = Je(), j = `${Y ? d ? "w-[var(--category-expanded-width,286px)]" : "w-[74px]" : "w-full"} timeline-fluid-obstacle overflow-hidden rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${P ? "cursor-pointer hover:bg-[var(--surface-strong)]" : ""} ${n}`, Z = ({
    buttonKey: N,
    description: R,
    icon: C,
    isSelected: A,
    meta: v,
    onClick: D,
    title: S
  }) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      title: S,
      disabled: !d,
      onClick: D,
      className: `flex h-11 w-full items-center gap-2 rounded-[0.85rem] border px-2.5 text-left transition duration-300 active:scale-[0.99] ${A ? "border-[var(--edge-strong)] bg-[var(--surface-strong)]" : "border-[var(--edge)] bg-transparent hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
      children: [
        C ?? /* @__PURE__ */ i(oi, { className: "h-4 w-4 shrink-0 text-[var(--ink)]", strokeWidth: 1.8 }),
        /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ i("span", { className: "block truncate text-xs font-semibold tracking-tight text-[var(--ink)]", children: R }),
          /* @__PURE__ */ i("span", { className: "mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--muted)]", children: v })
        ] }),
        /* @__PURE__ */ i(
          "span",
          {
            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${A ? "border-[var(--edge-strong)] bg-[var(--ink)] text-[var(--page-bg)]" : "border-[var(--edge)] text-transparent"}`,
            children: /* @__PURE__ */ i(si, { className: "h-3 w-3", strokeWidth: 2 })
          }
        )
      ]
    },
    N
  ), W = pe().sortOptions, ce = ((he = W.find((N) => N.id === r)) == null ? void 0 : he.label) ?? "Significance", q = r === "significance" ? "score" : ce;
  return /* @__PURE__ */ h("aside", { className: j, onClick: P ? ee : void 0, children: [
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-expanded": d,
        "aria-label": "Timeline filter and sort controls",
        onClick: (N) => {
          N.stopPropagation(), ee();
        },
        className: `flex w-full items-center gap-3 text-left transition duration-300 hover:bg-[var(--surface-strong)] active:scale-[0.99] ${d ? "justify-between border-b border-[var(--edge)] px-3 py-3" : "justify-center px-0 py-4"}`,
        children: [
          /* @__PURE__ */ i("span", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink)] shadow-[var(--soft-shadow)]", children: /* @__PURE__ */ i(ni, { className: "h-4 w-4", strokeWidth: 1.8 }) }),
          d ? /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ i("span", { className: "block text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]", children: O.filterPanelLabel }),
            /* @__PURE__ */ i("span", { className: "mt-1 block truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.label }),
            /* @__PURE__ */ h("span", { className: "mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
              E,
              "/",
              oe,
              " rows · sort ",
              q
            ] })
          ] }) : /* @__PURE__ */ i("span", { className: "sr-only", children: a.label }),
          /* @__PURE__ */ i(
            ri,
            {
              className: `h-4 w-4 shrink-0 text-[var(--ink-soft)] transition duration-300 ${d ? "rotate-180" : "-rotate-90"}`,
              strokeWidth: 1.8
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i(
      "div",
      {
        "data-filter-panel": !0,
        "aria-hidden": !d,
        className: `overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${d ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"}`,
        style: { pointerEvents: d ? "auto" : "none" },
        children: /* @__PURE__ */ i(
          xe.div,
          {
            initial: !1,
            animate: { y: d ? 0 : -10 },
            transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
            className: "max-h-[min(620px,calc(100dvh-18rem))] overflow-y-auto px-3 py-3",
            children: /* @__PURE__ */ h("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start", children: [
              /* @__PURE__ */ h("div", { className: "space-y-3", children: [
                Zn().map((N) => /* @__PURE__ */ h("div", { children: [
                  /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: N.label }),
                  /* @__PURE__ */ i("div", { className: "space-y-1.5", children: N.domainIds.map((R) => {
                    const C = jt(R);
                    if (!C)
                      return null;
                    const A = s[R] ?? { providerCount: 0, releaseCount: 0 };
                    return Z({
                      buttonKey: C.id,
                      description: C.label,
                      icon: /* @__PURE__ */ i(Ct, { classId: C.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                      isSelected: c.domainIds.includes(R),
                      meta: `${A.providerCount}c / ${A.releaseCount}r`,
                      onClick: () => x(R),
                      title: C.description
                    });
                  }) })
                ] }, N.label)),
                /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
                  /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: O.contentTypeHeading }),
                  /* @__PURE__ */ i("div", { className: "grid grid-cols-3 gap-1.5", children: ta().map((N) => {
                    const R = c.contentType === N.id, C = N.id === "events" ? ea : N.id === "releases" ? Vn : ot;
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => y(N.id),
                        title: N.description,
                        className: `inline-flex h-9 items-center justify-center gap-1.5 rounded-[0.85rem] border px-2 text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${R ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ i(C, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                          N.label
                        ]
                      },
                      N.id
                    );
                  }) })
                ] }),
                /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-1.5 border-t border-[var(--edge)] pt-3 md:border-t-0 md:pt-0", children: [
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: L,
                      title: O.selectAllTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(ot, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
                        O.selectAllLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: u,
                      title: O.clearFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(Gn, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        O.clearFiltersLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: M,
                      title: O.resetFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(Jt, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        O.resetFiltersLabel
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3 md:border-l md:border-t-0 md:py-1 md:pl-3", children: [
                /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: "Attributes" }),
                /* @__PURE__ */ i("div", { className: "space-y-1.5", children: nt().map((N) => {
                  const R = jt(N);
                  if (!R)
                    return null;
                  const C = t[N] ?? { providerCount: 0, releaseCount: 0 };
                  return Z({
                    buttonKey: N,
                    description: R.label,
                    icon: /* @__PURE__ */ i(Ct, { classId: R.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                    isSelected: c.attributeIds.includes(N),
                    meta: `${C.providerCount}c / ${C.releaseCount}r`,
                    onClick: () => f(N),
                    title: R.description
                  });
                }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: O.companyFiltersHeading }),
                /* @__PURE__ */ i("div", { className: "max-h-44 space-y-1.5 overflow-y-auto pr-1", children: e.length > 0 ? /* @__PURE__ */ h(xt, { children: [
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: m,
                      title: O.allRelevantLabel,
                      className: `flex h-8 w-full items-center justify-between rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${c.companyIds.length === 0 ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        O.allRelevantLabel,
                        /* @__PURE__ */ h("span", { className: "font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                          e.length,
                          "c"
                        ] })
                      ]
                    }
                  ),
                  e.map((N) => {
                    const R = c.companyIds.includes(N.id);
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => g(N.id),
                        title: `Filter to ${N.name}`,
                        className: `flex h-8 w-full items-center justify-between gap-2 rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${R ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: N.name }),
                          /* @__PURE__ */ h("span", { className: "shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                            N.releaseCount,
                            "r"
                          ] })
                        ]
                      },
                      N.id
                    );
                  })
                ] }) : /* @__PURE__ */ i("div", { className: "rounded-[0.75rem] border border-[var(--edge)] px-2 py-2 text-[11px] leading-4 text-[var(--muted)]", children: O.companyFilterEmpty }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: O.sortHeading }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-1 gap-1.5", children: W.map((N) => {
                  const R = r === N.id;
                  return /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => w(N.id),
                      className: `flex h-9 w-full items-center justify-between rounded-[0.85rem] border px-2.5 text-left text-xs font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${R ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        N.label,
                        /* @__PURE__ */ i(
                          "span",
                          {
                            className: `h-2.5 w-2.5 rounded-full border ${R ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--edge)] bg-transparent"}`
                          }
                        )
                      ]
                    },
                    N.id
                  );
                }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: O.displayedRowsHeading }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-4 gap-1.5 md:grid-cols-2", children: Qn().map((N) => {
                  const R = G === N, C = N === "all" ? "All" : String(N);
                  return /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => X(N),
                      className: `h-8 rounded-[0.85rem] border px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition duration-300 active:scale-[0.99] ${R ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: C
                    },
                    String(N)
                  );
                }) })
              ] })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ i(Ge, { initial: !1, children: !d && Y ? /* @__PURE__ */ h(
      xe.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        className: "flex flex-col items-center gap-3 px-2 pb-5",
        children: [
          /* @__PURE__ */ i("span", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]", style: { writingMode: "vertical-rl" }, children: O.filterPanelLabel }),
          /* @__PURE__ */ i("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] font-mono text-[10px] text-[var(--ink-soft)]", children: I })
        ]
      },
      "filter-rail"
    ) : null })
  ] });
}
function An(t) {
  return /* @__PURE__ */ i(Qo, { ...t });
}
function vt({
  children: t,
  label: a,
  onClick: n,
  pressed: r
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      "aria-label": a,
      "aria-pressed": r,
      onClick: n,
      className: `inline-flex h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium shadow-[var(--soft-shadow)] transition duration-300 hover:-translate-y-[1px] hover:border-[var(--edge-strong)] hover:bg-[var(--surface-strong)] active:translate-y-0 active:scale-[0.98] ${r ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] bg-[var(--surface)] text-[var(--ink-soft)]"}`,
      children: t
    }
  );
}
function xr({
  className: t = "",
  compact: a = !1,
  maxZoom: n,
  minZoom: r,
  onSliderActiveChange: e,
  onZoomChange: s,
  zoom: c
}) {
  const d = ne(null), f = ne(null), u = ne(null), m = ne(null), g = ne(null), [w, y] = Te(!1), [x, M] = Te(!1), [L, X] = Te(!1), ee = vr(c, r, n), G = 8 + (1 - ee) * 84, oe = a ? "h-3.5 w-3.5" : "h-4 w-4", J = w || x || L, E = J ? a ? "h-10 min-w-10 px-2 text-[9px]" : "h-11 min-w-11 px-2.5 text-[10px]" : a ? "h-4 min-w-4 px-0 text-[0px]" : "h-5 min-w-5 px-0 text-[0px]", I = a ? "group-hover/zoomrail:h-10 group-hover/zoomrail:min-w-10 group-hover/zoomrail:px-2 group-hover/zoomrail:text-[9px] group-focus-within/zoomrail:h-10 group-focus-within/zoomrail:min-w-10 group-focus-within/zoomrail:px-2 group-focus-within/zoomrail:text-[9px]" : "group-hover/zoomrail:h-11 group-hover/zoomrail:min-w-11 group-hover/zoomrail:px-2.5 group-hover/zoomrail:text-[10px] group-focus-within/zoomrail:h-11 group-focus-within/zoomrail:min-w-11 group-focus-within/zoomrail:px-2.5 group-focus-within/zoomrail:text-[10px]", Y = w ? "text-[var(--ink)] opacity-100" : "opacity-45", P = (v, D = !1) => {
    const S = () => {
      y(v), e == null || e(v);
    };
    if (D) {
      On(S);
      return;
    }
    S();
  }, O = (v) => {
    const D = Number(v.currentTarget.value);
    s(() => Ra(D, r, n));
  };
  Ae(() => () => {
    var v;
    g.current !== null && window.cancelAnimationFrame(g.current), m.current = null, (v = u.current) == null || v.call(u), e == null || e(!1);
  }, [e]);
  const j = (v) => {
    var U;
    const D = (U = d.current) == null ? void 0 : U.getBoundingClientRect();
    if (!D || D.height <= 0)
      return;
    const S = ue(1 - (v - D.top) / D.height, 0, 1);
    s(() => Ra(S, r, n));
  }, Z = () => {
    g.current !== null && (window.cancelAnimationFrame(g.current), g.current = null);
    const v = m.current;
    m.current = null, v !== null && j(v);
  }, W = (v) => {
    m.current = v, g.current === null && (g.current = window.requestAnimationFrame(() => {
      g.current = null;
      const D = m.current;
      m.current = null, D !== null && j(D);
    }));
  }, ce = (v) => {
    !v.isPrimary || v.button !== 0 || (f.current = v.pointerId, v.currentTarget.setPointerCapture(v.pointerId), P(!0, !0), j(v.clientY));
  }, q = (v) => {
    f.current === v.pointerId && (W(v.clientY), v.preventDefault());
  }, he = (v) => {
    f.current === v.pointerId && (Z(), v.currentTarget.hasPointerCapture(v.pointerId) && v.currentTarget.releasePointerCapture(v.pointerId), f.current = null, P(!1));
  }, N = () => {
    var v;
    Z(), (v = u.current) == null || v.call(u), u.current = null, P(!1);
  }, R = (v) => {
    var U;
    if (v.button !== 0 || f.current !== null)
      return;
    (U = u.current) == null || U.call(u), P(!0, !0), j(v.clientY);
    const D = (re) => {
      W(re.clientY), re.preventDefault();
    }, S = () => N();
    window.addEventListener("mousemove", D), window.addEventListener("mouseup", S, { once: !0 }), u.current = () => {
      window.removeEventListener("mousemove", D), window.removeEventListener("mouseup", S);
    };
  }, C = (v) => {
    const D = v.shiftKey ? va : qi;
    if (v.key === "ArrowUp" || v.key === "ArrowRight") {
      s((S) => Dt(S, D, r, n)), v.preventDefault();
      return;
    }
    if (v.key === "ArrowDown" || v.key === "ArrowLeft") {
      s((S) => Dt(S, -D, r, n)), v.preventDefault();
      return;
    }
    if (v.key === "PageUp") {
      s((S) => Dt(S, va, r, n)), v.preventDefault();
      return;
    }
    if (v.key === "PageDown") {
      s((S) => Dt(S, -va, r, n)), v.preventDefault();
      return;
    }
    if (v.key === "Home") {
      s(() => r), v.preventDefault();
      return;
    }
    v.key === "End" && (s(() => n), v.preventDefault());
  }, A = (v) => {
    v.currentTarget.contains(v.relatedTarget) || M(!1);
  };
  return /* @__PURE__ */ h(
    "div",
    {
      "aria-label": "Timeline zoom controls",
      "data-timeline-presentation-hide": !0,
      role: "group",
      className: `absolute z-40 flex ${a ? "min-h-[17rem] w-12 py-3" : "min-h-[22rem] w-14 py-4"} group/zoomrail select-none flex-col items-center justify-center gap-3 px-2 text-[var(--ink-soft)] transition-[opacity,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] hover:opacity-100 focus-within:text-[var(--ink)] focus-within:opacity-100 ${Y} ${t}`,
      onBlur: A,
      onFocus: () => M(!0),
      onMouseEnter: () => X(!0),
      onMouseLeave: () => X(!1),
      onPointerEnter: () => X(!0),
      onPointerLeave: () => X(!1),
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ i(Ko, { className: oe })
          }
        ),
        /* @__PURE__ */ h(
          "label",
          {
            ref: d,
            className: `relative z-10 ${a ? "h-[12.5rem] w-8" : "h-[16rem] w-9"} cursor-ns-resize touch-none rounded-full focus-within:ring-2 focus-within:ring-[rgba(237,242,250,0.3)]`,
            onMouseDown: R,
            onPointerCancel: he,
            onPointerDown: ce,
            onPointerMove: q,
            onPointerUp: he,
            children: [
              /* @__PURE__ */ i("span", { className: "sr-only", children: "Timeline zoom" }),
              /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: "absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-center",
                  style: {
                    backgroundImage: "radial-gradient(circle, rgba(237,242,250,0.28) 1.4px, transparent 1.6px)",
                    backgroundSize: "12px 12px"
                  }
                }
              ),
              /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: `pointer-events-none absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-center ${w ? "transition-none" : "transition-[clip-path] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: {
                    backgroundImage: "radial-gradient(circle, rgba(237,242,250,0.92) 1.5px, transparent 1.7px)",
                    backgroundSize: "12px 12px",
                    clipPath: `inset(${(1 - ee) * 100}% 0 0 0)`
                  }
                }
              ),
              /* @__PURE__ */ i(
                "span",
                {
                  className: `absolute left-1/2 grid ${E} ${I} -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(237,242,250,0.48)] bg-[rgba(237,242,250,0.95)] font-mono font-semibold text-[#0b0e14] shadow-[0_16px_32px_-22px_rgba(0,0,0,0.78)] ${w ? "scale-[1.04] transition-none" : "transition-[top,width,height,min-width,padding,transform,box-shadow,font-size] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: { top: `${G}%` },
                  children: /* @__PURE__ */ h("span", { className: `transition-opacity duration-200 group-hover/zoomrail:opacity-100 group-focus-within/zoomrail:opacity-100 ${J ? "opacity-100" : "opacity-0"}`, children: [
                    Math.round(c * 100),
                    "%"
                  ] })
                }
              ),
              /* @__PURE__ */ i(
                "input",
                {
                  "aria-label": "Timeline zoom",
                  "aria-orientation": "vertical",
                  "aria-valuetext": `${Math.round(c * 100)} percent`,
                  type: "range",
                  min: "0",
                  max: "1",
                  step: "0.001",
                  value: ee,
                  onBlur: () => P(!1),
                  onChange: O,
                  onKeyDown: C,
                  onPointerCancel: () => P(!1),
                  onPointerDown: () => P(!0, !0),
                  onPointerUp: () => P(!1),
                  className: "pointer-events-none absolute inset-0 z-30 h-full w-full cursor-ns-resize touch-none opacity-0 focus-visible:outline-none",
                  style: { direction: "rtl", writingMode: "vertical-lr" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ i(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ i(Zo, { className: oe })
          }
        )
      ]
    }
  );
}
function br({
  className: t = "",
  company: a
}) {
  return /* @__PURE__ */ i("span", { className: `inline-flex shrink-0 items-center justify-center text-[var(--ink)] ${t}`, children: /* @__PURE__ */ i(Ct, { classId: Mo(a), className: "h-[1rem] w-[1rem]" }) });
}
function Jo({
  compact: t = !1,
  company: a
}) {
  const n = a.logoMark, r = n ? pe().logoAssetPaths[n] : void 0, e = r && lr(n), s = e ? t ? "h-7 w-12 rounded-[0.72rem]" : "h-8 w-14 rounded-[0.82rem]" : t ? "h-7 w-7 rounded-[0.72rem]" : "h-8 w-8 rounded-[0.82rem]", c = e ? t ? "relative h-[11px] w-9 object-contain" : "relative h-3 w-11 object-contain" : t ? "relative h-[18px] w-[18px] object-contain" : "relative h-5 w-5 object-contain", d = t ? "text-[10px]" : "text-xs";
  return /* @__PURE__ */ i(
    "span",
    {
      "aria-label": `${a.name} logo`,
      className: `${s} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${r ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: `${a.name} logo`,
      children: r ? /* @__PURE__ */ i("img", { "aria-hidden": "true", alt: "", className: c, src: Sa(r) }) : n ? /* @__PURE__ */ h(xt, { children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${He(a.accent, 0.35)}, transparent 48%)`
            }
          }
        ),
        yr(n, a.accent, d)
      ] }) : /* @__PURE__ */ i(br, { className: t ? "h-4 w-4" : "h-5 w-5", company: a })
    }
  );
}
function yr(t, a, n) {
  const r = `relative font-semibold tracking-tight ${n}`;
  return t === "calendar" ? /* @__PURE__ */ i(ea, { className: "relative h-7 w-7 text-[var(--ink)]", strokeWidth: 1.8 }) : t === "gpt" || t === "openai" ? /* @__PURE__ */ i("span", { className: r, children: "AI" }) : t === "claude" || t === "anthropic" ? /* @__PURE__ */ i("span", { className: r, children: "C" }) : t === "cursor" ? /* @__PURE__ */ i("span", { className: r, children: "C" }) : t === "gemini" || t === "google" ? /* @__PURE__ */ i("span", { className: r, children: "G" }) : t === "deepseek" ? /* @__PURE__ */ i("span", { className: r, children: "D" }) : t === "sora" ? /* @__PURE__ */ i(jn, { className: "relative h-4 w-4", strokeWidth: 1.8 }) : t === "figure" ? /* @__PURE__ */ i("span", { className: r, children: "F" }) : t === "tesla" ? /* @__PURE__ */ i("span", { className: r, children: "T" }) : t === "xai" ? /* @__PURE__ */ i("span", { className: r, children: "x" }) : /* @__PURE__ */ i("span", { className: r, style: { color: a }, children: "AI" });
}
function es(t) {
  return t === "square" ? "rounded-[5px]" : t === "diamond" ? "rotate-45 rounded-[4px]" : "rounded-full";
}
function Sn(t) {
  return t.classId !== "events";
}
function ts(t, a) {
  const n = t[a];
  if (!n || !Sn(n))
    return null;
  const r = t.findIndex(Sn);
  if (r < 0 || r === a)
    return null;
  const e = t[r];
  return e ? {
    productLine: e,
    productLineIndex: r
  } : null;
}
function as({
  primaryLine: t,
  productLine: a,
  timelineStartDay: n
}) {
  var s;
  if (t.releases.length === 0 || a.releases.length === 0)
    return null;
  const r = ((s = t.releases[0]) == null ? void 0 : s.globalDay) ?? 0, e = a.releases.find((c) => c.globalDay >= r) ?? a.releases[0];
  return Be(e.globalDay, n);
}
function ns({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onModelSelect: c,
  productLine: d,
  productLineIndex: f,
  renderWindow: u,
  timelineStartDay: m,
  verticalScale: g = 1
}) {
  const w = _a(a, g), y = d.classId === "coding-harnesses", x = fo(n.accent, Si, 0.34), M = es(d.markerShape), L = a ? "h-3.5 w-3.5" : "h-4 w-4", X = a ? "absolute left-3 top-0 origin-bottom-left -translate-y-1 -rotate-[22deg]" : "absolute left-4 top-0 origin-bottom-left -translate-y-2 -rotate-[28deg] transition duration-300 group-hover:-translate-y-3", ee = a ? "timeline-map-screen-label whitespace-nowrap rounded-[0.7rem] border px-1.5 py-0.5 font-bold tracking-[0.01em] shadow-[var(--soft-shadow)] backdrop-blur-sm" : "timeline-map-screen-label whitespace-nowrap rounded-[0.8rem] border bg-[var(--surface-strong)] px-2 py-1 font-bold tracking-[0.015em] shadow-[var(--soft-shadow)] backdrop-blur-sm group-hover:bg-[var(--surface)]", G = a ? 10 : 12, oe = ts(n.productLines, f), J = oe ? as({
    primaryLine: oe.productLine,
    productLine: d,
    timelineStartDay: m
  }) ?? 0 : 0;
  return /* @__PURE__ */ h(
    xe.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: tr },
      transition: {
        opacity: $e
      },
      className: "relative z-10 shrink-0 hover:z-40 focus-within:z-40",
      style: { height: `${w}px` },
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: "absolute right-0 top-1/2 h-px -translate-y-1/2 bg-[var(--track-line)]",
            style: { left: `${J}px` }
          }
        ),
        /* @__PURE__ */ i("div", { className: "pointer-events-none absolute left-2 top-1/2 z-10 -translate-y-1/2", children: /* @__PURE__ */ h(
          "span",
          {
            className: "timeline-map-label inline-flex items-center gap-1.5 rounded-full border bg-[rgba(10,13,19,0.88)] px-2 py-1 font-mono uppercase tracking-[0.13em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)] backdrop-blur-sm",
            style: {
              borderColor: He(n.accent, 0.28),
              ...Ve(a ? 8 : 9)
            },
            children: [
              /* @__PURE__ */ i(Ct, { classId: d.classId, className: a ? "h-3 w-3" : "h-3.5 w-3.5" }),
              d.shortLabel
            ]
          }
        ) }),
        /* @__PURE__ */ i(Ge, { initial: !1, mode: "popLayout", children: d.releases.map((E, I) => {
          var de, Q;
          const Y = d.releases[I - 1], P = t === E.articleSlug, O = P || Ot(E.globalDay, E.endGlobalDay, u), j = !!Y && Ot((Y == null ? void 0 : Y.globalDay) ?? E.globalDay, E.globalDay, u), Z = E.endGlobalDay > E.globalDay && Ot(E.globalDay, E.endGlobalDay, u);
          if (!O && !j && !Z)
            return null;
          const W = Be(E.globalDay, m), ce = Y ? Be(Y.globalDay, m) : W, q = Y ? Math.max(0, W - ce) : 0, he = Y ? Po(E.gap, d.averageGap) : null, N = Kt(E.globalDay, E.endGlobalDay), R = ((de = d.latestRelease) == null ? void 0 : de.name) === E.name && ((Q = d.latestRelease) == null ? void 0 : Q.date) === E.date, C = R ? Ta(n.accent, 255, 0.12) : Ta(n.accent, 255, 0.24), A = He(n.accent, R ? 0.52 : 0.34), v = E.tags.includes("landmark-release"), D = R ? He(n.accent, 0.12) : v ? He(n.accent, 0.08) : void 0, U = E.eventKind === "event" ? "Open event" : "Open release", re = P ? `0 0 0 ${a ? 3 : 4}px rgba(237, 242, 250, 0.92), 0 0 0 ${a ? 7 : 8}px color-mix(in srgb, ${n.accent} 48%, transparent)` : v ? `0 0 0 ${a ? 5 : 6}px color-mix(in srgb, ${n.accent} 24%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 50%, transparent), 0 0 42px color-mix(in srgb, ${n.accent} 28%, transparent)` : R ? `0 0 0 ${a ? 4 : 5}px color-mix(in srgb, ${n.accent} 20%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 40%, transparent)` : `0 0 0 4px color-mix(in srgb, ${n.accent} 11%, transparent)`, te = P ? "saturate(1.45) brightness(1.14)" : v ? "saturate(1.38) brightness(1.1)" : R ? "saturate(1.35) brightness(1.08)" : void 0;
          return /* @__PURE__ */ h(
            xe.div,
            {
              initial: { opacity: 0, scale: 0.84 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.84 },
              transition: {
                opacity: $e,
                scale: $e
              },
              className: "absolute inset-0",
              children: [
                Y && j ? /* @__PURE__ */ h(xt, { children: [
                  /* @__PURE__ */ i(
                    xe.div,
                    {
                      initial: { opacity: 0, scaleX: 0 },
                      animate: { opacity: y ? 0.72 : 0.58, scaleX: 1 },
                      transition: $e,
                      className: `pointer-events-none absolute top-1/2 -translate-y-1/2 origin-left ${y ? "h-px" : "h-[2px]"}`,
                      style: {
                        backgroundColor: y ? x : n.accent,
                        left: `${ce}px`,
                        width: `${q}px`
                      }
                    }
                  ),
                  /* @__PURE__ */ i(
                    "div",
                    {
                      className: "timeline-gap absolute top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50",
                      style: {
                        left: `${ce + q / 2}px`,
                        "--gap-world-width": q
                      },
                      children: /* @__PURE__ */ h(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Gap of ${Ea(E.gap)} between ${Y.name} and ${E.name}`,
                          onPointerDown: (H) => H.stopPropagation(),
                          onClick: (H) => H.stopPropagation(),
                          className: "group/gap relative flex h-6 cursor-default items-center justify-center outline-none",
                          children: [
                            /* @__PURE__ */ h(
                              "span",
                              {
                                className: "timeline-gap-collapse timeline-gap-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2 py-1 font-mono uppercase tracking-[0.1em] text-[var(--ink)] shadow-[var(--soft-shadow)] group-focus-visible/gap:border-[var(--edge-strong)]",
                                style: Ve(a ? 9 : 10),
                                children: [
                                  E.gap,
                                  "d"
                                ]
                              }
                            ),
                            /* @__PURE__ */ h(
                              "span",
                              {
                                role: "tooltip",
                                className: "timeline-gap-tooltip pointer-events-none absolute left-1/2 top-full z-50 flex w-max max-w-[260px] flex-col gap-1 rounded-xl border border-[var(--edge-strong)] bg-[var(--surface-strong)] px-3 py-2 text-left opacity-0 shadow-[var(--panel-shadow)] transition-opacity duration-200 group-hover/gap:opacity-100 group-focus-visible/gap:opacity-100",
                                children: [
                                  /* @__PURE__ */ h("span", { className: "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                                    Y.name,
                                    " → ",
                                    E.name
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: [
                                    Ea(E.gap),
                                    " gap"
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                    Y.dateLabel,
                                    " – ",
                                    E.dateLabel
                                  ] }),
                                  he ? /* @__PURE__ */ i("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: he }) : null
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ] }) : null,
                Z ? /* @__PURE__ */ i(
                  xe.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: R ? 0.72 : 0.54, scaleX: 1 },
                    transition: $e,
                    className: `absolute top-1/2 z-10 origin-left -translate-y-1/2 rounded-full ${a ? "h-[7px]" : "h-2"}`,
                    style: {
                      backgroundColor: n.accent,
                      boxShadow: `0 0 18px color-mix(in srgb, ${n.accent} 34%, transparent)`,
                      left: `${W}px`,
                      minWidth: a ? "8px" : "10px",
                      width: `${N}px`
                    }
                  }
                ) : null,
                O ? /* @__PURE__ */ i(
                  xe.div,
                  {
                    initial: { opacity: 0, scale: 0.82, y: a ? 6 : 8 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.82, y: a ? 6 : 8 },
                    transition: {
                      opacity: $e,
                      scale: $e,
                      y: $e
                    },
                    className: `absolute top-1/2 -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50 ${P ? "z-30" : "z-20"}`,
                    style: { left: `${W}px` },
                    children: /* @__PURE__ */ i("div", { className: "overflow-visible", children: /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        "data-timeline-company-id": n.id,
                        "data-timeline-pin": !0,
                        "data-timeline-product-line-id": d.id,
                        "data-timeline-slug": E.articleSlug,
                        "aria-current": P ? "page" : void 0,
                        "aria-label": `${U} for ${E.name}, ${E.dateRangeLabel}`,
                        onClick: (H) => {
                          H.stopPropagation(), c(E.articleSlug);
                        },
                        onPointerDown: (H) => H.stopPropagation(),
                        className: `group relative block size-0 overflow-visible cursor-pointer text-left outline-none ${P ? "timeline-pin--selected" : ""}`,
                        children: [
                          /* @__PURE__ */ h("div", { className: "timeline-pin-marker-stack relative z-0 size-0 shrink-0", children: [
                            v ? /* @__PURE__ */ i(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: `${a ? "h-8 w-8" : "h-10 w-10"} timeline-pin-landmark-aura absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ${M}`,
                                style: { "--pin-accent": n.accent }
                              }
                            ) : null,
                            P ? /* @__PURE__ */ i(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: `timeline-pin-selection-ring ${a ? "timeline-pin-selection-ring--compact" : ""}`,
                                style: { "--pin-accent": n.accent }
                              }
                            ) : null,
                            /* @__PURE__ */ i(
                              "div",
                              {
                                className: `${L} timeline-pin-marker absolute left-0 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 border-[3px] border-[var(--surface-strong)] transition duration-300 ${M} ${P ? "timeline-pin-marker--selected scale-[1.18]" : "group-hover:scale-[1.22] group-focus-visible:scale-[1.22]"}`,
                                style: {
                                  backgroundColor: n.accent,
                                  boxShadow: re,
                                  filter: te
                                }
                              }
                            )
                          ] }),
                          /* @__PURE__ */ i("div", { className: `${X} z-[2]`, children: /* @__PURE__ */ i(
                            "div",
                            {
                              className: `${ee} ${P ? "timeline-pin-label--selected" : ""}`,
                              style: {
                                backgroundColor: P ? "var(--surface-strong)" : D,
                                borderColor: P ? He(n.accent, 0.88) : A,
                                borderWidth: P ? 2 : void 0,
                                color: P ? Ta(n.accent, 255, 0.06) : C,
                                boxShadow: P ? `0 0 0 1px color-mix(in srgb, ${n.accent} 55%, transparent)` : void 0,
                                textShadow: P ? "0 1px 14px rgba(0, 0, 0, 0.62)" : R ? "0 1px 12px rgba(0, 0, 0, 0.5)" : "0 1px 10px rgba(0, 0, 0, 0.38)",
                                filter: P ? "saturate(1.28)" : R ? "saturate(1.18)" : void 0,
                                ...Ve(G)
                              },
                              children: E.name
                            }
                          ) }),
                          a ? null : /* @__PURE__ */ h(
                            "div",
                            {
                              role: "tooltip",
                              className: "timeline-gap-tooltip pointer-events-none absolute left-1/2 top-8 z-50 flex w-max max-w-[280px] flex-col gap-1 rounded-xl border border-[var(--edge-strong)] bg-[var(--surface-strong)] px-3 py-2 text-left opacity-0 shadow-[var(--panel-shadow)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                              children: [
                                /* @__PURE__ */ h("span", { className: "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                                  n.name,
                                  " · ",
                                  d.shortLabel
                                ] }),
                                /* @__PURE__ */ i("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: E.name }),
                                /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                  E.eventTypeLabel,
                                  " · ",
                                  E.dateRangeLabel
                                ] }),
                                Y ? /* @__PURE__ */ h("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: [
                                  Ea(E.gap),
                                  " after ",
                                  Y.name
                                ] }) : null
                              ]
                            }
                          )
                        ]
                      }
                    ) })
                  }
                ) : null
              ]
            },
            E.articleSlug
          );
        }) }),
        d.latestRelease && e > d.latestRelease.endGlobalDay && Ot(d.latestRelease.endGlobalDay, e, u) ? /* @__PURE__ */ h(xt, { children: [
          /* @__PURE__ */ i(
            xe.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: y ? 0.48 : 0.42, scaleX: 1 },
              transition: $e,
              className: `absolute top-1/2 origin-left -translate-y-1/2 ${y ? "h-px" : "quiet-extension-flow h-[2px]"}`,
              style: {
                backgroundColor: y ? x : void 0,
                left: `${Be(d.latestRelease.endGlobalDay, m)}px`,
                "--quiet-flow-duration": `${a ? 5.4 : 6.4}s`,
                "--quiet-line-color": n.accent,
                width: `${Kt(d.latestRelease.endGlobalDay, e)}px`
              }
            }
          ),
          /* @__PURE__ */ i(
            "div",
            {
              className: "absolute top-1/2 z-0 -translate-y-1/2 pl-3",
              style: { left: `${Be(e, m)}px` },
              children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ h(
                "div",
                {
                  className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1 font-mono uppercase tracking-[0.14em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                  style: Ve(a ? 9 : 10),
                  children: [
                    "+",
                    La(d, e),
                    "d"
                  ]
                }
              ) })
            }
          )
        ] }) : null
      ]
    }
  );
}
const rs = Rt.memo(ns);
function is({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onCompanyBlur: c,
  onCompanyFocus: d,
  onModelSelect: f,
  renderWindow: u,
  timelineStartDay: m,
  verticalScale: g = 1
}) {
  const { lineGap: w } = Pa(n.productLines.length, a, g), y = () => d == null ? void 0 : d(n.id), x = () => c == null ? void 0 : c();
  return /* @__PURE__ */ i(
    xe.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: tr },
      transition: {
        opacity: $e
      },
      className: "relative flex flex-col justify-center",
      onClick: (M) => {
        const L = M.target;
        L instanceof Element && L.closest("button, a, input, label, select, textarea, [data-row-focus-label]") || y();
      },
      onMouseEnter: y,
      onMouseLeave: x,
      onPointerEnter: (M) => {
        M.pointerType !== "touch" && y();
      },
      onPointerLeave: (M) => {
        M.pointerType !== "touch" && x();
      },
      style: { height: `${Fa(n, a, g)}px`, gap: `${w}px` },
      children: /* @__PURE__ */ i(Ge, { initial: !1, mode: "popLayout", children: n.productLines.map((M, L) => /* @__PURE__ */ i(
        rs,
        {
          activeArticleSlug: t,
          compact: a,
          company: n,
          companyIndex: r,
          currentGlobalDay: e,
          maxDays: s,
          onModelSelect: f,
          productLine: M,
          productLineIndex: L,
          renderWindow: u,
          timelineStartDay: m,
          verticalScale: g
        },
        `${n.id}-${M.id}`
      )) })
    }
  );
}
function In(t, a) {
  return a ? t.productLines.some(
    (n) => n.releases.some((r) => r.articleSlug === a)
  ) : !1;
}
const wr = Rt.memo(
  is,
  (t, a) => {
    const n = In(t.company, t.activeArticleSlug), r = In(a.company, a.activeArticleSlug);
    return t.compact === a.compact && t.company === a.company && t.companyIndex === a.companyIndex && t.currentGlobalDay === a.currentGlobalDay && t.maxDays === a.maxDays && t.timelineStartDay === a.timelineStartDay && t.verticalScale === a.verticalScale && ko(t.renderWindow, a.renderWindow) && n === r && (!n || t.activeArticleSlug === a.activeArticleSlug);
  }
);
function os({
  compact: t = !1,
  company: a,
  currentGlobalDay: n,
  index: r,
  maxSummaryQuietDays: e
}) {
  var u, m;
  const s = Je(), c = La(a, n), d = Lo(c, e), f = a.productLines.length > 1;
  return /* @__PURE__ */ h(
    xe.div,
    {
      layout: !0,
      initial: { opacity: 0, y: t ? 12 : 14 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: t ? 12 : 14 },
      transition: {
        layout: Ai,
        opacity: $e,
        y: $e
      },
      className: "rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] p-4",
      children: [
        /* @__PURE__ */ h("div", { className: "min-w-0", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ i(br, { className: "h-7 w-7", company: a }),
            /* @__PURE__ */ h("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ i("p", { className: "truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.name }),
              /* @__PURE__ */ h("p", { className: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: [
                s.significanceLabel,
                " ",
                a.significanceScore
              ] })
            ] })
          ] }),
          f ? /* @__PURE__ */ i("div", { className: "mt-3 space-y-2", children: a.productLines.map((g) => {
            var w;
            return /* @__PURE__ */ h("div", { className: "min-w-0 rounded-[0.85rem] border border-[var(--edge)] bg-[rgba(255,255,255,0.02)] px-3 py-2", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center gap-2 text-xs font-semibold tracking-tight text-[var(--ink)]", children: [
                  /* @__PURE__ */ i(Ct, { classId: g.classId, className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ i("span", { className: "truncate", children: g.shortLabel })
                ] }),
                /* @__PURE__ */ i("span", { className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]", children: g.significanceScore })
              ] }),
              /* @__PURE__ */ i("p", { className: "mt-1 truncate text-sm text-[var(--ink-soft)]", children: ((w = g.latestRelease) == null ? void 0 : w.name) ?? "No releases" })
            ] }, `${a.id}-${g.id}-summary-line`);
          }) }) : /* @__PURE__ */ h(xt, { children: [
            /* @__PURE__ */ i("p", { className: "mt-3 text-base font-semibold tracking-tight text-[var(--ink)]", children: _o(c) }),
            /* @__PURE__ */ h("div", { className: "mt-2 min-w-0", children: [
              /* @__PURE__ */ i("p", { className: "truncate text-sm text-[var(--ink-soft)]", children: ((u = a.latestRelease) == null ? void 0 : u.name) ?? "No releases" }),
              /* @__PURE__ */ i("p", { className: "mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]", children: ((m = a.latestRelease) == null ? void 0 : m.dateRangeLabel) ?? "Date unavailable" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "mt-4 h-1.5 rounded-full bg-[var(--edge)]", children: /* @__PURE__ */ i(
          "div",
          {
            className: "h-full origin-left rounded-full",
            style: { backgroundColor: a.accent, width: `${d}%` }
          }
        ) })
      ]
    },
    `${a.id}-${t ? "mobile" : "desktop"}-summary`
  );
}
const Tr = Rt.memo(os);
function ss(t) {
  const a = t.companyLogoMark === "openai" ? "gpt" : t.companyLogoMark === "google" ? "gemini" : t.companyLogoMark === "anthropic" ? "claude" : t.companyLogoMark;
  return {
    modelLabel: t.name,
    modelMark: a
  };
}
function kn({
  accent: t,
  label: a,
  mark: n,
  size: r
}) {
  const e = r === "large", s = pe().logoAssetPaths[n], c = s && lr(n), d = c ? e ? "h-16 w-28 rounded-[1.25rem]" : "h-11 w-20 rounded-[0.95rem]" : e ? "h-16 w-16 rounded-[1.25rem]" : "h-11 w-11 rounded-[0.95rem]", f = c ? e ? "relative h-5 w-20 object-contain" : "relative h-3 w-14 object-contain" : e ? "relative h-10 w-10 object-contain" : "relative h-7 w-7 object-contain", u = e ? "text-lg" : "text-sm", m = n === "calendar" ? `${a} event icon` : `${a} logo`;
  return /* @__PURE__ */ h(
    "span",
    {
      "aria-label": m,
      className: `${d} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${s ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: m,
      children: [
        s ? null : /* @__PURE__ */ i(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${He(t, 0.35)}, transparent 48%)`
            }
          }
        ),
        s ? /* @__PURE__ */ i("img", { "aria-hidden": "true", alt: "", className: f, src: Sa(s) }) : yr(n, t, u)
      ]
    }
  );
}
function Ln({
  label: t,
  onNavigate: a,
  slug: n,
  title: r
}) {
  return !n || !r ? /* @__PURE__ */ h("div", { className: "rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--muted)]", children: [
    t,
    ": none"
  ] }) : /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      onClick: () => a(n),
      className: "group rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-left transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.99]",
      children: [
        /* @__PURE__ */ i("span", { className: "block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: t }),
        /* @__PURE__ */ h("span", { className: "mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
          r,
          /* @__PURE__ */ i(ii, { className: "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5", strokeWidth: 1.8 })
        ] })
      ]
    }
  );
}
function ls({ media: t }) {
  const [a, n] = Te(!1);
  return a ? null : /* @__PURE__ */ h("figure", { className: "mt-7 overflow-hidden rounded-[1.25rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)]", children: [
    /* @__PURE__ */ i(
      "img",
      {
        src: Sa(t.src),
        alt: t.alt,
        className: "w-full bg-black object-contain",
        loading: "lazy",
        onError: () => n(!0)
      }
    ),
    t.caption ? /* @__PURE__ */ i("figcaption", { className: "border-t border-[var(--edge)] px-4 py-3 text-xs leading-5 text-[var(--ink-soft)]", children: t.caption }) : null
  ] });
}
const _n = 640, Pn = 448, Er = 96, cs = 4096, Fn = 8, $n = 12e3, Un = 10, Da = 1300, ds = 3, Xn = 0.09, us = 0.35;
function ms(t) {
  let a = 2166136261;
  for (let n = 0; n < t.length; n += 1)
    a ^= t.charCodeAt(n), a = Math.imul(a, 16777619);
  return a >>> 0;
}
function fs(t) {
  let a = t || 1;
  return () => {
    a = a + 1831565813 | 0;
    let n = Math.imul(a ^ a >>> 15, 1 | a);
    return n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n, ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function ps(t) {
  const a = t.replace("#", ""), n = a.length === 3 ? a.split("").map((e) => e + e).join("") : a, r = Number.parseInt(n, 16);
  return !Number.isFinite(r) || n.length !== 6 ? [125, 145, 175] : [r >> 16 & 255, r >> 8 & 255, r & 255];
}
function Nt(t, a, n) {
  return [
    t[0] + (a[0] - t[0]) * n,
    t[1] + (a[1] - t[1]) * n,
    t[2] + (a[2] - t[2]) * n
  ];
}
const Yn = [
  [-0.295, 0.62],
  [0.31, 0.42],
  [-1.04, 0.25],
  [-0.78, 0.18]
], zn = [
  [0.5667, -0.5],
  [0.5, -0.55],
  [0.6, -0.45]
];
function hs(t) {
  const a = fs(ms(t)), n = Math.floor(a() * 4), r = a() * Math.PI * 2, e = 0.768 + a() * 0.034;
  let s = Math.cos(r) * e, c = Math.sin(r) * e, d = 0;
  if (n === 2) {
    const f = Yn[Math.floor(a() * Yn.length)];
    s = f[0] + (a() - 0.5) * 0.05, c = f[1] + (a() - 0.5) * 0.05;
  } else if (n === 3) {
    const f = zn[Math.floor(a() * zn.length)];
    s = f[0] + (a() - 0.5) * 0.03, d = f[1] + (a() - 0.5) * 0.03, c = 0;
  }
  return {
    variant: n,
    cRe: s,
    cIm: c,
    phoenixRe: d,
    zoom: 0.52 + a() * 0.33,
    rotation: a() * Math.PI * 2,
    centerX: (a() - 0.5) * 0.3,
    centerY: (a() - 0.5) * 0.3
  };
}
function gs(t, a, n) {
  let r = a, e = n, s = 0, c = 0;
  for (let d = 0; d < Er; d += 1) {
    const f = r * r + e * e;
    if (f > cs)
      return d + 1 - Math.log(Math.log(f) * 0.5) / Math.LN2;
    let u, m;
    if (t.variant === 1) {
      const g = Math.abs(r);
      u = g * g - e * e + t.cRe, m = 2 * g * e + t.cIm;
    } else t.variant === 2 ? (u = r * r - e * e + t.cRe, m = -2 * r * e + t.cIm) : t.variant === 3 ? (u = r * r - e * e + t.cRe + t.phoenixRe * s, m = 2 * r * e + t.phoenixRe * c) : (u = r * r - e * e + t.cRe, m = 2 * r * e + t.cIm);
    s = r, c = e, r = u, e = m;
  }
  return -1;
}
function vs({ accent: t, seedKey: a }) {
  const n = ne(null);
  return Ae(() => {
    const r = n.current, e = r == null ? void 0 : r.getContext("2d");
    if (!r || !e)
      return;
    const s = hs(a), c = ps(t), d = [8, 11, 16], f = [
      { at: 0, rgb: d },
      { at: 0.38, rgb: Nt(d, c, 0.45) },
      { at: 0.62, rgb: c },
      { at: 0.86, rgb: Nt(c, [235, 240, 248], 0.55) },
      { at: 1, rgb: [240, 244, 250] }
    ], u = (U) => {
      for (let re = 1; re < f.length; re += 1)
        if (U <= f[re].at) {
          const te = f[re - 1], de = f[re], Q = (U - te.at) / (de.at - te.at);
          return Nt(te.rgb, de.rgb, Q);
        }
      return f[f.length - 1].rgb;
    }, m = _n, g = Pn, w = m * g;
    e.clearRect(0, 0, m, g), e.imageSmoothingEnabled = !0, e.imageSmoothingQuality = "high";
    const y = Math.cos(s.rotation), x = Math.sin(s.rotation), M = m / g, L = Nt(d, c, 0.28), X = Nt(c, [240, 244, 250], 0.7), ee = (U) => {
      if (U < 0)
        return 1;
      const re = Math.min(
        1,
        Math.max(0, Math.log(1 + U) / Math.log(1 + Er))
      );
      return Math.pow(re, 1.1);
    }, G = (U, re, te, de) => {
      const Q = ((re + 0.5) / de * 2 - 1) / s.zoom, H = ((U + 0.5) / te * 2 - 1) * M / s.zoom, z = H * y - Q * x + s.centerX, V = H * x + Q * y + s.centerY, se = gs(s, z, V);
      return {
        interior: se < 0,
        shaped: ee(se)
      };
    }, oe = Math.ceil(m / Fn), J = Math.ceil(g / Fn), E = document.createElement("canvas");
    E.width = oe, E.height = J;
    const I = E.getContext("2d"), Y = document.createElement("canvas");
    Y.width = m, Y.height = g;
    const P = Y.getContext("2d");
    if (!I || !P)
      return;
    const O = I.createImageData(oe, J), j = P.createImageData(m, g), Z = new Uint8ClampedArray(w * 3), W = new Uint8ClampedArray(w), ce = new Float32Array(w), q = (U) => 1 - Math.pow(1 - U, 3);
    let he = !1, N = 0, R = "base", C = 0, A = 0, v = 0, D = 0;
    const S = () => {
      if (he)
        return;
      if (R === "base") {
        const Q = Math.max(1, Math.floor($n / oe)), H = Math.min(C + Q, J);
        for (let z = C; z < H; z += 1)
          for (let V = 0; V < oe; V += 1) {
            const se = G(V, z, oe, J), me = (z * oe + V) * 4, be = se.interior ? L : u(se.shaped);
            O.data[me] = be[0], O.data[me + 1] = be[1], O.data[me + 2] = be[2], O.data[me + 3] = se.interior ? 150 : Math.round(30 + se.shaped * 225);
          }
        C = H, C >= J && (I.putImageData(O, 0, 0), R = "baseFade"), N = window.requestAnimationFrame(S);
        return;
      }
      if (R === "baseFade") {
        A += 1, e.clearRect(0, 0, m, g), e.globalAlpha = A / Un, e.drawImage(E, 0, 0, m, g), e.globalAlpha = 1, A >= Un && (R = "full"), N = window.requestAnimationFrame(S);
        return;
      }
      if (R === "full") {
        const Q = Math.max(1, Math.floor($n / m)), H = Math.min(v + Q, g);
        for (let z = v; z < H; z += 1)
          for (let V = 0; V < m; V += 1) {
            const se = G(V, z, m, g), me = z * m + V, be = se.interior ? L : u(se.shaped);
            Z[me * 3] = be[0], Z[me * 3 + 1] = be[1], Z[me * 3 + 2] = be[2], W[me] = se.interior ? 150 : Math.round(30 + se.shaped * 225), ce[me] = se.shaped;
          }
        v = H, v >= g && (R = "reveal"), N = window.requestAnimationFrame(S);
        return;
      }
      if (D += 1, D % ds !== 0 && D < Da) {
        N = window.requestAnimationFrame(S);
        return;
      }
      const U = Math.min(1, D / Da), re = q(U) * (1 + Xn * 2), te = j.data;
      for (let Q = 0; Q < w; Q += 1) {
        const H = (re - ce[Q]) / Xn, z = H <= 0 ? 0 : H >= 1 ? 1 : H, V = z * (1 - z) * 2 * us, se = Q * 4;
        te[se] = Z[Q * 3] + (X[0] - Z[Q * 3]) * V, te[se + 1] = Z[Q * 3 + 1] + (X[1] - Z[Q * 3 + 1]) * V, te[se + 2] = Z[Q * 3 + 2] + (X[2] - Z[Q * 3 + 2]) * V, te[se + 3] = W[Q] * z + V * 30;
      }
      P.putImageData(j, 0, 0), e.clearRect(0, 0, m, g);
      const de = 1 - q(U);
      de > 3e-3 && (e.globalAlpha = de, e.drawImage(E, 0, 0, m, g), e.globalAlpha = 1), e.drawImage(Y, 0, 0), D < Da && (N = window.requestAnimationFrame(S));
    };
    return N = window.requestAnimationFrame(S), () => {
      he = !0, window.cancelAnimationFrame(N);
    };
  }, [t, a]), /* @__PURE__ */ i(
    "div",
    {
      "aria-hidden": !0,
      className: "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden md:h-[34rem] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.5)_58%,transparent_96%)]",
      children: /* @__PURE__ */ i(
        "canvas",
        {
          ref: n,
          width: _n,
          height: Pn,
          className: "h-full w-full object-cover opacity-75 blur-[1px]"
        }
      )
    }
  );
}
function xs({
  entry: t,
  onBack: a,
  onNavigate: n,
  requestedSlug: r
}) {
  const e = Je(), s = (t == null ? void 0 : t.article) ?? null, c = t ? t.eventKind === "event" ? {
    modelLabel: t.name,
    modelMark: "calendar"
  } : (s == null ? void 0 : s.logo) ?? ss(t) : null, d = (s == null ? void 0 : s.title) ?? (t == null ? void 0 : t.name) ?? e.routeMissingTitle, f = (s == null ? void 0 : s.summary) ?? (t ? `${t.name} is tracked as a ${t.eventTypeLabel.toLowerCase()} from ${t.companyName} in the ${t.productLineLabel} line.` : e.routeMissingDetail.replace("{slug}", r));
  return /* @__PURE__ */ h(
    xe.aside,
    {
      initial: { opacity: 0, x: 72 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 72 },
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      className: "fixed inset-y-0 right-0 z-40 w-full overflow-y-auto border-l border-[var(--edge-strong)] bg-[rgba(8,11,16,0.98)] shadow-[0_34px_100px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl md:w-[min(760px,58vw)]",
      children: [
        t ? /* @__PURE__ */ i(vs, { accent: t.accent, seedKey: r }) : null,
        /* @__PURE__ */ h("article", { className: "min-h-full px-5 py-5 md:px-8 md:py-8", children: [
          /* @__PURE__ */ h("div", { className: "sticky top-0 z-20 -mx-5 flex items-center justify-between gap-3 border-b border-[var(--edge)] bg-[rgba(8,11,16,0.94)] px-5 py-4 shadow-[0_18px_34px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl md:static md:mx-0 md:border-b-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none", children: [
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                onClick: a,
                className: "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                children: [
                  /* @__PURE__ */ i(Jr, { className: "h-4 w-4", strokeWidth: 1.8 }),
                  e.articleBackLabel
                ]
              }
            ),
            t ? /* @__PURE__ */ h("span", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: [
              /* @__PURE__ */ i(ea, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
              t.dateRangeLabel
            ] }) : null
          ] }),
          t && c ? /* @__PURE__ */ h("div", { className: "mt-9 flex items-start gap-4", children: [
            /* @__PURE__ */ i(kn, { accent: t.accent, label: c.modelLabel, mark: c.modelMark, size: "large" }),
            /* @__PURE__ */ i(kn, { accent: t.accent, label: t.companyName, mark: t.companyLogoMark, size: "small" })
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: (s == null ? void 0 : s.eyebrow) ?? (t == null ? void 0 : t.eventTypeLabel) ?? "Unknown route" }),
          /* @__PURE__ */ i("h1", { className: "mt-3 max-w-[12ch] text-4xl leading-none tracking-tighter text-[var(--ink)] md:text-6xl", children: d }),
          /* @__PURE__ */ i("p", { className: "mt-5 max-w-[68ch] text-base leading-8 text-[var(--ink-soft)] md:text-lg", children: (s == null ? void 0 : s.dek) ?? f }),
          s != null && s.media ? /* @__PURE__ */ i(ls, { media: s.media }) : null,
          t ? /* @__PURE__ */ i("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: ((s == null ? void 0 : s.facts) ?? [
            { label: "Company", value: t.companyName },
            { label: "Product line", value: t.productLineLabel },
            { label: t.eventKind === "event" ? "Event date" : "Release date", value: t.dateRangeLabel },
            { label: "Type", value: t.eventTypeLabel }
          ]).map((u) => /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
            /* @__PURE__ */ i("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: u.label }),
            /* @__PURE__ */ i("p", { className: "mt-1 text-sm font-semibold text-[var(--ink)]", children: u.value })
          ] }, `${u.label}-${u.value}`)) }) : null,
          /* @__PURE__ */ h("section", { className: "mt-9 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ h("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
              /* @__PURE__ */ i(Vn, { className: "h-4 w-4", strokeWidth: 1.8 }),
              "Summary"
            ] }),
            /* @__PURE__ */ i("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: f }),
            s != null && s.impact ? /* @__PURE__ */ i("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: s.impact }) : null
          ] }),
          s == null ? void 0 : s.sections.map((u) => /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ i("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: u.heading }),
            /* @__PURE__ */ i("div", { className: "mt-4 space-y-4", children: u.body.map((m) => /* @__PURE__ */ i("p", { className: "text-base leading-8 text-[var(--ink-soft)]", children: m }, m)) })
          ] }, u.heading)),
          s != null && s.sources.length ? /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ i("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: "Sources" }),
            /* @__PURE__ */ i("div", { className: "mt-4 space-y-2", children: s.sources.map((u) => /* @__PURE__ */ h(
              "a",
              {
                href: u.url,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]",
                children: [
                  /* @__PURE__ */ i("span", { children: u.label }),
                  /* @__PURE__ */ i(ei, { className: "h-4 w-4 shrink-0", strokeWidth: 1.8 })
                ]
              },
              u.url
            )) })
          ] }) : null,
          t ? /* @__PURE__ */ h("div", { className: "mt-8 grid gap-3 border-t border-[var(--edge)] pt-7 sm:grid-cols-2", children: [
            /* @__PURE__ */ i(Ln, { label: "Previous", onNavigate: n, slug: t.previousSlug, title: t.previousName }),
            /* @__PURE__ */ i(Ln, { label: "Next", onNavigate: n, slug: t.nextSlug, title: t.nextName })
          ] }) : /* @__PURE__ */ i("div", { className: "mt-8 rounded-[1.1rem] border border-[var(--edge)] bg-[var(--surface)] p-5", children: /* @__PURE__ */ i("p", { className: "text-sm leading-6 text-[var(--ink-soft)]", children: "This route does not match a known model or event entry." }) })
        ] })
      ]
    },
    "model-article-panel"
  );
}
function Bn({
  detail: t,
  title: a
}) {
  const n = Je();
  return /* @__PURE__ */ i("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ i("div", { className: "mx-auto flex min-h-[100dvh] max-w-[880px] items-center px-5 py-10 md:px-8", children: /* @__PURE__ */ h("div", { className: "rounded-[2rem] border border-[var(--edge)] bg-[var(--surface)] p-8 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: [
    /* @__PURE__ */ i("p", { className: "text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]", children: n.statusEyebrow }),
    /* @__PURE__ */ i("h1", { className: "mt-4 text-4xl tracking-tighter text-[var(--ink)]", children: a }),
    /* @__PURE__ */ i("p", { className: "mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--ink-soft)]", children: t })
  ] }) }) });
}
const bs = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`, ys = `
precision mediump float;

uniform sampler2D uVelocityMap;
uniform sampler2D uDyeMap;
uniform vec2 uTexel;
uniform vec2 uPointerPosition;
uniform vec2 uPointerVelocity;
uniform float uPointerActive;
uniform float uPointerRadius;
uniform float uDeltaTime;
uniform float uElapsedTime;
uniform float uAspect;
uniform vec4 uEmitterSeed;

varying vec2 vUv;

vec2 decodeVelocity(vec4 state) {
  return state.rg * 2.0 - 1.0;
}

vec4 encodeVelocity(vec2 velocity) {
  return vec4(clamp(velocity * 0.5 + 0.5, 0.0, 1.0), 0.0, 1.0);
}

float dyeAmount(vec4 dye) {
  return dot(dye.rgb, vec3(0.933)) + dye.a * 0.42;
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  value += valueNoise(p) * 0.5;
  p = p * 2.03 + 17.11;
  value += valueNoise(p) * 0.3;
  p = p * 2.01 + 31.73;
  value += valueNoise(p) * 0.2;
  return value;
}

float weatherCenter(float t, float phase) {
  float drift = fbm(vec2(t * 0.42 + phase, phase * 1.91));
  float wander = fbm(vec2(t * 0.17 + phase * 2.7, 8.4 + phase));
  float wave = sin(t * 0.31 + phase + drift * 6.28318);
  return clamp(0.5 + wave * 0.36 + (wander - 0.5) * 0.28, 0.08, 0.92);
}

float weatherSideY(float t, float phase) {
  float drift = fbm(vec2(t * 0.33 + phase, phase * 2.41));
  float wander = fbm(vec2(t * 0.19 + phase * 2.2, 13.7 + phase));
  float wave = sin(t * 0.27 + phase + drift * 6.28318);
  return clamp(0.5 + wave * 0.32 + (wander - 0.5) * 0.24, 0.12, 0.88);
}

float bottomTrackY(float t, float phase) {
  float drift = fbm(vec2(t * 0.28 + phase, phase * 2.17));
  float wave = sin(t * 0.38 + phase + drift * 6.28318);
  return clamp(0.026 + wave * 0.018 + (drift - 0.5) * 0.024, 0.0, 0.064);
}

float rightTrackX(float t, float phase) {
  float drift = fbm(vec2(t * 0.3 + phase, phase * 1.73));
  float wave = sin(t * 0.34 + phase + drift * 6.28318);
  return clamp(0.974 + wave * 0.015 + (drift - 0.5) * 0.012, 0.946, 0.992);
}

float emitterBase(vec2 uv, float center, float originY, float width, float strength) {
  float x = (uv.x - center) * uAspect;
  float y = uv.y - originY;
  float upward = max(y, 0.0);
  float source = exp(-(x * x) / max(width * width, 0.0001)) * smoothstep(0.19, 0.0, upward) * smoothstep(-0.03, 0.018, y);
  return source * strength;
}

float emitterColumn(vec2 uv, float center, float originY, float width, float strength) {
  float x = (uv.x - center) * uAspect;
  float y = uv.y - originY;
  float upward = max(y, 0.0);
  float rise = smoothstep(0.68, 0.0, upward) * smoothstep(-0.02, 0.04, y);
  float spread = mix(width * 1.1, width * 5.6, smoothstep(0.0, 0.68, upward));
  return exp(-(x * x) / max(spread * spread, 0.0001)) * rise * strength;
}

float emitterRoll(vec2 uv, float center, float originY, float width, float strength) {
  float x = (uv.x - center) * uAspect;
  float y = uv.y - originY;
  float upward = max(y, 0.0);
  float rise = smoothstep(0.56, 0.0, upward) * smoothstep(-0.02, 0.04, y);
  float field = exp(-(x * x) / max(width * width * 8.0, 0.0001)) * rise;
  return clamp(-x / max(width * 3.2, 0.0001), -1.0, 1.0) * field * strength;
}

float sideEmitterBase(vec2 uv, float originX, float centerY, float height, float strength) {
  vec2 p = vec2((uv.x - originX) * uAspect, uv.y - centerY);
  float source = exp(-(p.x * p.x) / (0.028 * 0.028)) * exp(-(p.y * p.y) / max(height * height, 0.0001));
  return source * strength;
}

float sideEmitterColumn(vec2 uv, float originX, float centerY, float height, float strength) {
  float inward = max(0.0, originX - uv.x);
  float spread = height + inward * 0.46;
  float vertical = exp(-((uv.y - centerY) * (uv.y - centerY)) / max(spread * spread, 0.0001));
  float horizontal = exp(-(inward * inward) / (0.34 * 0.34));
  return vertical * horizontal * strength;
}

float sideEmitterRoll(vec2 uv, float originX, float centerY, float height, float strength) {
  float inward = max(0.0, originX - uv.x);
  float field = sideEmitterColumn(uv, originX, centerY, height, strength) * smoothstep(0.52, 0.02, inward);
  return clamp((uv.y - centerY) / max(height * 3.6, 0.0001), -1.0, 1.0) * field;
}

void main() {
  vec2 uv = vUv;
  float dt = clamp(uDeltaTime, 0.0, 0.05);
  float fluidDt = dt * 0.25;
  vec2 currentVelocity = decodeVelocity(texture2D(uVelocityMap, uv));
  vec2 backUv = clamp(uv - currentVelocity * fluidDt * 1.08, vec2(0.001), vec2(0.999));
  vec2 velocity = decodeVelocity(texture2D(uVelocityMap, backUv));
  float frameScale = dt * 10.0;
  float fluidFrameScale = fluidDt * 60.0;

  float dyeCenter = dyeAmount(texture2D(uDyeMap, uv));
  float dyeLeft = dyeAmount(texture2D(uDyeMap, clamp(uv - vec2(uTexel.x, 0.0), vec2(0.001), vec2(0.999))));
  float dyeRight = dyeAmount(texture2D(uDyeMap, clamp(uv + vec2(uTexel.x, 0.0), vec2(0.001), vec2(0.999))));
  float dyeDown = dyeAmount(texture2D(uDyeMap, clamp(uv - vec2(0.0, uTexel.y), vec2(0.001), vec2(0.999))));
  float dyeUp = dyeAmount(texture2D(uDyeMap, clamp(uv + vec2(0.0, uTexel.y), vec2(0.001), vec2(0.999))));
  vec2 dyeGradient = vec2((dyeRight - dyeLeft) * uAspect, dyeUp - dyeDown);
  vec2 surfaceTangent = vec2(-dyeGradient.y, dyeGradient.x);
  float surfaceEnergy = smoothstep(0.012, 0.22, dyeCenter);
  velocity += clamp(surfaceTangent * 1.65, vec2(-0.026), vec2(0.026)) * surfaceEnergy * fluidFrameScale;

  float weatherTime = uElapsedTime * 0.72;
  float centerA = clamp(weatherCenter(weatherTime + uEmitterSeed.x * 17.0, 0.2 + uEmitterSeed.x * 6.28318) + (uEmitterSeed.x - 0.5) * 0.12, 0.08, 0.92);
  float centerB = clamp(weatherCenter(weatherTime * 0.86 + 9.0 + uEmitterSeed.y * 19.0, 2.6 + uEmitterSeed.y * 6.28318) + (uEmitterSeed.y - 0.5) * 0.12, 0.08, 0.92);
  float liftA = bottomTrackY(weatherTime * 0.92 + uEmitterSeed.x * 11.0, 1.4 + uEmitterSeed.x * 5.0);
  float liftB = bottomTrackY(weatherTime * 0.78 + uEmitterSeed.y * 13.0, 4.7 + uEmitterSeed.y * 5.0);
  float sideY = weatherSideY(weatherTime * 1.08 + 17.0 + uEmitterSeed.z * 23.0, 5.1 + uEmitterSeed.z * 6.28318);
  float sideX = rightTrackX(weatherTime * 0.82 + uEmitterSeed.z * 17.0, 2.2 + uEmitterSeed.w * 6.28318);
  float strengthA = smoothstep(0.18, 0.86, fbm(vec2(weatherTime * 0.58 + 1.3 + uEmitterSeed.x * 8.0, 2.0 + uEmitterSeed.x * 5.0)));
  float strengthB = smoothstep(0.22, 0.88, fbm(vec2(weatherTime * 0.52 + 8.7 + uEmitterSeed.y * 8.0, 5.0 + uEmitterSeed.y * 5.0)));
  float strengthC = smoothstep(0.26, 0.9, fbm(vec2(weatherTime * 0.64 + 15.4 + uEmitterSeed.z * 8.0, 9.0 + uEmitterSeed.z * 5.0)));
  float sideStrength = 0.52 + strengthC * 0.72;
  float baseField = emitterBase(uv, centerA, liftA, 0.042, strengthA);
  baseField += emitterBase(uv, centerB, liftB, 0.052, strengthB * 0.82);
  float columnField = emitterColumn(uv, centerA, liftA, 0.045, strengthA);
  columnField += emitterColumn(uv, centerB, liftB, 0.055, strengthB * 0.8);
  columnField = clamp(columnField, 0.0, 1.35);
  float rollField = emitterRoll(uv, centerA, liftA, 0.052, strengthA);
  rollField += emitterRoll(uv, centerB, liftB, 0.064, strengthB * 0.85);
  float sideBase = sideEmitterBase(uv, sideX, sideY, 0.048, sideStrength);
  float sideColumn = sideEmitterColumn(uv, sideX, sideY, 0.06, sideStrength * 0.82);
  float sideRoll = sideEmitterRoll(uv, sideX, sideY, 0.058, sideStrength * 0.9);
  float crossWind = fbm(uv * vec2(1.2, 5.4) + vec2(weatherTime * 0.045, weatherTime * 0.038)) - 0.5;
  float lateralFlow = rollField * 0.008 + crossWind * (columnField + sideColumn * 0.42) * 0.016 - sideBase * 0.115 - sideColumn * 0.034;
  float upwardFlow = baseField * 1.53 + columnField * 0.0125 + sideRoll * 0.22;
  vec2 ambientFlow = vec2(lateralFlow, upwardFlow);
  velocity += ambientFlow * frameScale;

  vec2 pointerDelta = vec2((uv.x - uPointerPosition.x) * uAspect, uv.y - uPointerPosition.y);
  float radius = max(uPointerRadius, 0.0001);
  float pointerField = exp(-dot(pointerDelta, pointerDelta) / (radius * radius)) * uPointerActive;
  float pointerSpeed = min(length(uPointerVelocity), 7.5);
  vec2 pointerDirection = uPointerVelocity / max(pointerSpeed, 0.0001);
  vec2 pointerNormal = vec2(-pointerDirection.y, pointerDirection.x);
  float crossWake = clamp(dot(pointerDelta, pointerNormal) / radius, -1.0, 1.0);
  velocity += pointerDirection * pointerSpeed * 0.22 * pointerField;
  velocity += pointerNormal * crossWake * pointerSpeed * 0.11 * pointerField;

  velocity *= pow(0.99984, frameScale);

  gl_FragColor = encodeVelocity(velocity);
}
`, ws = `
precision mediump float;

uniform sampler2D uVelocityMap;
uniform vec2 uTexel;
uniform float uAspect;

varying vec2 vUv;

vec2 decodeVelocity(vec4 state) {
  return state.rg * 2.0 - 1.0;
}

vec4 encodeScalar(float value) {
  return vec4(clamp(value * 0.5 + 0.5, 0.0, 1.0), 0.0, 0.0, 1.0);
}

void main() {
  vec2 uv = vUv;
  vec2 leftVelocity = decodeVelocity(texture2D(uVelocityMap, clamp(uv - vec2(uTexel.x, 0.0), vec2(0.001), vec2(0.999))));
  vec2 rightVelocity = decodeVelocity(texture2D(uVelocityMap, clamp(uv + vec2(uTexel.x, 0.0), vec2(0.001), vec2(0.999))));
  vec2 downVelocity = decodeVelocity(texture2D(uVelocityMap, clamp(uv - vec2(0.0, uTexel.y), vec2(0.001), vec2(0.999))));
  vec2 upVelocity = decodeVelocity(texture2D(uVelocityMap, clamp(uv + vec2(0.0, uTexel.y), vec2(0.001), vec2(0.999))));
  float curl = ((rightVelocity.y - leftVelocity.y) * uAspect - (upVelocity.x - downVelocity.x)) * 0.58;

  gl_FragColor = encodeScalar(curl);
}
`, Ts = `
precision mediump float;

uniform sampler2D uVelocityMap;
uniform sampler2D uCurlMap;
uniform vec2 uTexel;
uniform float uDeltaTime;
uniform float uStrength;
uniform float uAspect;

varying vec2 vUv;

vec2 decodeVelocity(vec4 state) {
  return state.rg * 2.0 - 1.0;
}

vec4 encodeVelocity(vec2 velocity) {
  return vec4(clamp(velocity * 0.5 + 0.5, 0.0, 1.0), 0.0, 1.0);
}

float decodeScalar(vec4 state) {
  return state.r * 2.0 - 1.0;
}

void main() {
  vec2 uv = vUv;
  float dt = clamp(uDeltaTime, 0.0, 0.05);
  vec2 velocity = decodeVelocity(texture2D(uVelocityMap, uv));
  float centerCurl = decodeScalar(texture2D(uCurlMap, uv));
  float leftCurl = abs(decodeScalar(texture2D(uCurlMap, clamp(uv - vec2(uTexel.x, 0.0), vec2(0.001), vec2(0.999)))));
  float rightCurl = abs(decodeScalar(texture2D(uCurlMap, clamp(uv + vec2(uTexel.x, 0.0), vec2(0.001), vec2(0.999)))));
  float downCurl = abs(decodeScalar(texture2D(uCurlMap, clamp(uv - vec2(0.0, uTexel.y), vec2(0.001), vec2(0.999)))));
  float upCurl = abs(decodeScalar(texture2D(uCurlMap, clamp(uv + vec2(0.0, uTexel.y), vec2(0.001), vec2(0.999)))));
  vec2 curlGradient = vec2((rightCurl - leftCurl) * uAspect, upCurl - downCurl);
  curlGradient /= max(length(curlGradient), 0.0001);
  vec2 confinement = vec2(curlGradient.y, -curlGradient.x) * centerCurl * uStrength;

  velocity += clamp(confinement, vec2(-1.2), vec2(1.2)) * dt;
  gl_FragColor = encodeVelocity(velocity);
}
`, Es = `
precision mediump float;

uniform sampler2D uVelocityMap;
uniform vec2 uTexel;
uniform vec4 uObstacleRect;
uniform float uAspect;

varying vec2 vUv;

vec2 decodeVelocity(vec4 state) {
  return state.rg * 2.0 - 1.0;
}

vec4 encodeScalar(float value) {
  return vec4(clamp(value * 0.5 + 0.5, 0.0, 1.0), 0.0, 0.0, 1.0);
}

float roundedBoxSdf(vec2 p, vec2 halfSize, float radius) {
  vec2 q = abs(p) - halfSize + radius;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
}

float solidMask(vec2 uv) {
  vec2 obstacleMin = uObstacleRect.xy;
  vec2 obstacleMax = uObstacleRect.zw;
  float obstacleActive = step(0.0, obstacleMax.x) * step(0.0, obstacleMax.y);
  vec2 obstacleCenter = (obstacleMin + obstacleMax) * 0.5;
  vec2 obstacleHalf = max((obstacleMax - obstacleMin) * 0.5, vec2(0.001));
  vec2 obstacleSpace = vec2((uv.x - obstacleCenter.x) * uAspect, uv.y - obstacleCenter.y);
  vec2 obstacleHalfSpace = vec2(obstacleHalf.x * uAspect, obstacleHalf.y);
  float sdf = roundedBoxSdf(obstacleSpace, obstacleHalfSpace, 0.035);
  return obstacleActive * (1.0 - smoothstep(-0.004, 0.012, sdf));
}

vec2 sampleVelocity(vec2 uv, vec2 centerVelocity) {
  float solid = solidMask(uv);
  return mix(decodeVelocity(texture2D(uVelocityMap, clamp(uv, vec2(0.001), vec2(0.999)))), centerVelocity, solid);
}

void main() {
  vec2 uv = vUv;
  vec2 centerVelocity = decodeVelocity(texture2D(uVelocityMap, uv));
  vec2 leftVelocity = sampleVelocity(uv - vec2(uTexel.x, 0.0), centerVelocity);
  vec2 rightVelocity = sampleVelocity(uv + vec2(uTexel.x, 0.0), centerVelocity);
  vec2 downVelocity = sampleVelocity(uv - vec2(0.0, uTexel.y), centerVelocity);
  vec2 upVelocity = sampleVelocity(uv + vec2(0.0, uTexel.y), centerVelocity);
  float divergence = 0.5 * ((rightVelocity.x - leftVelocity.x) + (upVelocity.y - downVelocity.y));

  gl_FragColor = encodeScalar(divergence);
}
`, Ms = `
precision mediump float;

uniform sampler2D uPressureMap;
uniform sampler2D uDivergenceMap;
uniform vec2 uTexel;
uniform vec4 uObstacleRect;
uniform float uAspect;

varying vec2 vUv;

float decodeScalar(vec4 state) {
  return state.r * 2.0 - 1.0;
}

vec4 encodeScalar(float value) {
  return vec4(clamp(value * 0.5 + 0.5, 0.0, 1.0), 0.0, 0.0, 1.0);
}

float roundedBoxSdf(vec2 p, vec2 halfSize, float radius) {
  vec2 q = abs(p) - halfSize + radius;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
}

float solidMask(vec2 uv) {
  vec2 obstacleMin = uObstacleRect.xy;
  vec2 obstacleMax = uObstacleRect.zw;
  float obstacleActive = step(0.0, obstacleMax.x) * step(0.0, obstacleMax.y);
  vec2 obstacleCenter = (obstacleMin + obstacleMax) * 0.5;
  vec2 obstacleHalf = max((obstacleMax - obstacleMin) * 0.5, vec2(0.001));
  vec2 obstacleSpace = vec2((uv.x - obstacleCenter.x) * uAspect, uv.y - obstacleCenter.y);
  vec2 obstacleHalfSpace = vec2(obstacleHalf.x * uAspect, obstacleHalf.y);
  float sdf = roundedBoxSdf(obstacleSpace, obstacleHalfSpace, 0.035);
  return obstacleActive * (1.0 - smoothstep(-0.004, 0.012, sdf));
}

float samplePressure(vec2 uv, float centerPressure) {
  float solid = solidMask(uv);
  return mix(decodeScalar(texture2D(uPressureMap, clamp(uv, vec2(0.001), vec2(0.999)))), centerPressure, solid);
}

void main() {
  vec2 uv = vUv;
  float centerPressure = decodeScalar(texture2D(uPressureMap, uv));
  float leftPressure = samplePressure(uv - vec2(uTexel.x, 0.0), centerPressure);
  float rightPressure = samplePressure(uv + vec2(uTexel.x, 0.0), centerPressure);
  float downPressure = samplePressure(uv - vec2(0.0, uTexel.y), centerPressure);
  float upPressure = samplePressure(uv + vec2(0.0, uTexel.y), centerPressure);
  float divergence = decodeScalar(texture2D(uDivergenceMap, uv));
  float pressure = (leftPressure + rightPressure + downPressure + upPressure - divergence) * 0.25;

  gl_FragColor = encodeScalar(pressure);
}
`, Ns = `
precision mediump float;

uniform sampler2D uVelocityMap;
uniform sampler2D uPressureMap;
uniform vec2 uTexel;
uniform vec4 uObstacleRect;
uniform float uAspect;

varying vec2 vUv;

vec2 decodeVelocity(vec4 state) {
  return state.rg * 2.0 - 1.0;
}

vec4 encodeVelocity(vec2 velocity) {
  return vec4(clamp(velocity * 0.5 + 0.5, 0.0, 1.0), 0.0, 1.0);
}

float decodeScalar(vec4 state) {
  return state.r * 2.0 - 1.0;
}

float roundedBoxSdf(vec2 p, vec2 halfSize, float radius) {
  vec2 q = abs(p) - halfSize + radius;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
}

float solidMask(vec2 uv) {
  vec2 obstacleMin = uObstacleRect.xy;
  vec2 obstacleMax = uObstacleRect.zw;
  float obstacleActive = step(0.0, obstacleMax.x) * step(0.0, obstacleMax.y);
  vec2 obstacleCenter = (obstacleMin + obstacleMax) * 0.5;
  vec2 obstacleHalf = max((obstacleMax - obstacleMin) * 0.5, vec2(0.001));
  vec2 obstacleSpace = vec2((uv.x - obstacleCenter.x) * uAspect, uv.y - obstacleCenter.y);
  vec2 obstacleHalfSpace = vec2(obstacleHalf.x * uAspect, obstacleHalf.y);
  float sdf = roundedBoxSdf(obstacleSpace, obstacleHalfSpace, 0.035);
  return obstacleActive * (1.0 - smoothstep(-0.004, 0.012, sdf));
}

float samplePressure(vec2 uv, float centerPressure) {
  float solid = solidMask(uv);
  return mix(decodeScalar(texture2D(uPressureMap, clamp(uv, vec2(0.001), vec2(0.999)))), centerPressure, solid);
}

void main() {
  vec2 uv = vUv;
  vec2 velocity = decodeVelocity(texture2D(uVelocityMap, uv));
  float centerPressure = decodeScalar(texture2D(uPressureMap, uv));
  float leftPressure = samplePressure(uv - vec2(uTexel.x, 0.0), centerPressure);
  float rightPressure = samplePressure(uv + vec2(uTexel.x, 0.0), centerPressure);
  float downPressure = samplePressure(uv - vec2(0.0, uTexel.y), centerPressure);
  float upPressure = samplePressure(uv + vec2(0.0, uTexel.y), centerPressure);
  vec2 gradient = vec2(rightPressure - leftPressure, upPressure - downPressure) * 0.52;
  velocity -= gradient;
  velocity = mix(velocity, vec2(0.0), solidMask(uv));

  gl_FragColor = encodeVelocity(velocity);
}
`, Ds = `
precision mediump float;

uniform sampler2D uVelocityMap;
uniform sampler2D uDyeMap;
uniform vec2 uPointerPosition;
uniform vec2 uPointerVelocity;
uniform float uPointerActive;
uniform float uPointerRadius;
uniform float uDeltaTime;
uniform float uElapsedTime;
uniform float uAspect;
uniform vec4 uEmitterSeed;

varying vec2 vUv;

vec2 decodeVelocity(vec4 state) {
  return state.rg * 2.0 - 1.0;
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  value += valueNoise(p) * 0.5;
  p = p * 2.03 + 17.11;
  value += valueNoise(p) * 0.3;
  p = p * 2.01 + 31.73;
  value += valueNoise(p) * 0.2;
  return value;
}

float weatherCenter(float t, float phase) {
  float drift = fbm(vec2(t * 0.42 + phase, phase * 1.91));
  float wander = fbm(vec2(t * 0.17 + phase * 2.7, 8.4 + phase));
  float wave = sin(t * 0.31 + phase + drift * 6.28318);
  return clamp(0.5 + wave * 0.36 + (wander - 0.5) * 0.28, 0.08, 0.92);
}

float weatherSideY(float t, float phase) {
  float drift = fbm(vec2(t * 0.33 + phase, phase * 2.41));
  float wander = fbm(vec2(t * 0.19 + phase * 2.2, 13.7 + phase));
  float wave = sin(t * 0.27 + phase + drift * 6.28318);
  return clamp(0.5 + wave * 0.32 + (wander - 0.5) * 0.24, 0.12, 0.88);
}

float bottomTrackY(float t, float phase) {
  float drift = fbm(vec2(t * 0.28 + phase, phase * 2.17));
  float wave = sin(t * 0.38 + phase + drift * 6.28318);
  return clamp(0.026 + wave * 0.018 + (drift - 0.5) * 0.024, 0.0, 0.064);
}

float rightTrackX(float t, float phase) {
  float drift = fbm(vec2(t * 0.3 + phase, phase * 1.73));
  float wave = sin(t * 0.34 + phase + drift * 6.28318);
  return clamp(0.974 + wave * 0.015 + (drift - 0.5) * 0.012, 0.946, 0.992);
}

float emitterBase(vec2 uv, float center, float originY, float width, float strength) {
  float x = (uv.x - center) * uAspect;
  float y = uv.y - originY;
  float upward = max(y, 0.0);
  float source = exp(-(x * x) / max(width * width, 0.0001)) * smoothstep(0.19, 0.0, upward) * smoothstep(-0.03, 0.018, y);
  return source * strength;
}

float emitterColumn(vec2 uv, float center, float originY, float width, float strength) {
  float x = (uv.x - center) * uAspect;
  float y = uv.y - originY;
  float upward = max(y, 0.0);
  float rise = smoothstep(0.68, 0.0, upward) * smoothstep(-0.02, 0.04, y);
  float spread = mix(width * 1.1, width * 5.6, smoothstep(0.0, 0.68, upward));
  return exp(-(x * x) / max(spread * spread, 0.0001)) * rise * strength;
}

float sideEmitterBase(vec2 uv, float originX, float centerY, float height, float strength) {
  vec2 p = vec2((uv.x - originX) * uAspect, uv.y - centerY);
  float source = exp(-(p.x * p.x) / (0.028 * 0.028)) * exp(-(p.y * p.y) / max(height * height, 0.0001));
  return source * strength;
}

float sideEmitterColumn(vec2 uv, float originX, float centerY, float height, float strength) {
  float inward = max(0.0, originX - uv.x);
  float spread = height + inward * 0.46;
  float vertical = exp(-((uv.y - centerY) * (uv.y - centerY)) / max(spread * spread, 0.0001));
  float horizontal = exp(-(inward * inward) / (0.34 * 0.34));
  return vertical * horizontal * strength;
}

void main() {
  vec2 uv = vUv;
  float dt = clamp(uDeltaTime, 0.0, 0.05);
  float fluidDt = dt * 0.25;
  vec2 velocity = decodeVelocity(texture2D(uVelocityMap, uv));
  vec2 backUv = clamp(uv - velocity * fluidDt * 1.08, vec2(0.001), vec2(0.999));
  vec4 dye = texture2D(uDyeMap, backUv);
  float frameScale = dt * 60.0;
  dye.rgb *= pow(0.9991, frameScale);
  dye.a *= pow(0.9984, frameScale);

  float weatherTime = uElapsedTime * 0.72;
  float centerA = clamp(weatherCenter(weatherTime + uEmitterSeed.x * 17.0, 0.2 + uEmitterSeed.x * 6.28318) + (uEmitterSeed.x - 0.5) * 0.12, 0.08, 0.92);
  float centerB = clamp(weatherCenter(weatherTime * 0.86 + 9.0 + uEmitterSeed.y * 19.0, 2.6 + uEmitterSeed.y * 6.28318) + (uEmitterSeed.y - 0.5) * 0.12, 0.08, 0.92);
  float liftA = bottomTrackY(weatherTime * 0.92 + uEmitterSeed.x * 11.0, 1.4 + uEmitterSeed.x * 5.0);
  float liftB = bottomTrackY(weatherTime * 0.78 + uEmitterSeed.y * 13.0, 4.7 + uEmitterSeed.y * 5.0);
  float sideY = weatherSideY(weatherTime * 1.08 + 17.0 + uEmitterSeed.z * 23.0, 5.1 + uEmitterSeed.z * 6.28318);
  float sideX = rightTrackX(weatherTime * 0.82 + uEmitterSeed.z * 17.0, 2.2 + uEmitterSeed.w * 6.28318);
  float strengthA = smoothstep(0.18, 0.86, fbm(vec2(weatherTime * 0.58 + 1.3 + uEmitterSeed.x * 8.0, 2.0 + uEmitterSeed.x * 5.0)));
  float strengthB = smoothstep(0.22, 0.88, fbm(vec2(weatherTime * 0.52 + 8.7 + uEmitterSeed.y * 8.0, 5.0 + uEmitterSeed.y * 5.0)));
  float strengthC = smoothstep(0.26, 0.9, fbm(vec2(weatherTime * 0.64 + 15.4 + uEmitterSeed.z * 8.0, 9.0 + uEmitterSeed.z * 5.0)));
  float sideStrength = 0.72 + strengthC * 0.72;
  float sourceBase = emitterBase(uv, centerA, liftA, 0.042, strengthA);
  sourceBase += emitterBase(uv, centerB, liftB, 0.052, strengthB * 0.82);
  float sourceColumn = emitterColumn(uv, centerA, liftA, 0.045, strengthA);
  sourceColumn += emitterColumn(uv, centerB, liftB, 0.055, strengthB * 0.8);
  sourceColumn = clamp(sourceColumn, 0.0, 1.35);
  float sideSource = sideEmitterBase(uv, sideX, sideY, 0.048, sideStrength);
  float sideColumn = sideEmitterColumn(uv, sideX, sideY, 0.06, sideStrength * 0.82);
  float sourceVeil = 0.58 + 0.42 * fbm(uv * vec2(4.2, 7.0) + vec2(weatherTime * 0.05, -weatherTime * 0.038));
  float ambientDye = (sourceBase * 0.021 + sourceColumn * 0.0065 + sideSource * 0.031 + sideColumn * 0.009) * sourceVeil * frameScale;
  dye.rgb += vec3(0.014, 0.085, 0.074) * ambientDye;
  dye.a += ambientDye * 0.42;

  vec2 pointerDelta = vec2((uv.x - uPointerPosition.x) * uAspect, uv.y - uPointerPosition.y);
  float radius = max(uPointerRadius * 0.92, 0.0001);
  float pointerField = exp(-dot(pointerDelta, pointerDelta) / (radius * radius)) * uPointerActive;
  float pointerSpeed = min(length(uPointerVelocity), 7.5);
  float dyeImpulse = pointerField * (0.075 + pointerSpeed * 0.052);
  dye.rgb += vec3(0.02, 0.12, 0.105) * dyeImpulse;
  dye.a += dyeImpulse * 0.48;

  gl_FragColor = clamp(dye, 0.0, 1.0);
}
`, Cs = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform vec2 uFluidTexel;
uniform vec4 uWidgetRect;
uniform float uElapsedTime;
uniform float uEmitterDebug;
uniform vec4 uEmitterSeed;
uniform sampler2D uVelocityMap;
uniform sampler2D uDyeMap;

varying vec2 vUv;

float dyeAmount(vec4 dye) {
  return dot(dye.rgb, vec3(0.333)) + dye.a * 0.42;
}

vec4 sampleDye(vec2 uv) {
  return texture2D(uDyeMap, clamp(uv, vec2(0.001), vec2(0.999)));
}

float roundedBoxSdf(vec2 p, vec2 halfSize, float radius) {
  vec2 q = abs(p) - halfSize + radius;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
}

float widgetMask(vec2 uv, float aspectRatio) {
  float active = step(0.0, uWidgetRect.z) * step(0.0, uWidgetRect.w);
  vec2 rectMin = uWidgetRect.xy;
  vec2 rectMax = uWidgetRect.zw;
  vec2 rectCenter = (rectMin + rectMax) * 0.5;
  vec2 rectHalf = max((rectMax - rectMin) * 0.5 - vec2(0.01, 0.014), vec2(0.001));
  vec2 p = vec2((uv.x - rectCenter.x) * aspectRatio, uv.y - rectCenter.y);
  vec2 halfSize = vec2(rectHalf.x * aspectRatio, rectHalf.y);
  float radius = min(0.03, min(halfSize.x, halfSize.y) * 0.4);
  float sdf = roundedBoxSdf(p, halfSize, radius);
  return active * (1.0 - smoothstep(-0.003, 0.006, sdf));
}

vec3 grayscaleColor(vec3 color) {
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  return clamp(vec3(luma), vec3(0.0), vec3(0.56));
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float triangularNoise(vec2 pixel, vec2 seed) {
  vec2 seededPixel = pixel + seed * 4096.0;
  float a = hash21(seededPixel);
  float b = hash21(seededPixel * 1.37 + seed.yx * 4096.0 + 17.0);
  return a + b - 1.0;
}

float isotropicHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float isotropicTriangularNoise(vec2 pixel, vec2 seed) {
  vec2 seededPixel = pixel + seed * 8192.0;
  float a = isotropicHash(seededPixel);
  float b = isotropicHash(seededPixel + vec2(19.19, 73.13));
  return a + b - 1.0;
}

float blueDitherNoise(vec2 pixel, vec4 seed, float time) {
  float frame = floor(time * 12.0);
  vec2 p = pixel + vec2(frame * 19.37, frame * 47.11);
  vec2 r0 = mat2(0.8660254, -0.5, 0.5, 0.8660254) * p;
  vec2 r1 = mat2(0.6087614, 0.7933533, -0.7933533, 0.6087614) * (p + seed.zw * 113.0);
  vec2 e0 = vec2(0.9238795, 0.3826834);
  vec2 e1 = vec2(-0.3826834, 0.9238795);
  float center = isotropicTriangularNoise(r0, seed.xy) * 0.62 + isotropicTriangularNoise(r1, seed.zw) * 0.38;
  float neighborMean = 0.0;
  neighborMean += isotropicTriangularNoise(r0 + e0, seed.zw);
  neighborMean += isotropicTriangularNoise(r0 - e0, seed.wz);
  neighborMean += isotropicTriangularNoise(r0 + e1, seed.yw);
  neighborMean += isotropicTriangularNoise(r0 - e1, seed.zy);
  neighborMean *= 0.25;

  return clamp((center - neighborMean) * 1.38, -1.0, 1.0);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float filmGrain(vec2 pixel, vec4 seed, float time) {
  float frame = floor(time * 8.0);
  vec2 p = pixel + vec2(frame * 37.0, frame * 17.0);
  float coarse = valueNoise(p / 32.0 + seed.xy * 83.0) - 0.5;
  float mid = valueNoise(p / 13.0 + seed.zw * 131.0) - 0.5;
  float fine = triangularNoise(p + vec2(29.0, 71.0), vec2(seed.y, seed.x)) * 0.5;
  float blue = blueDitherNoise(p, seed, time) * 0.5;

  return clamp(coarse * 0.58 + mid * 0.3 + fine * 0.08 + blue * 0.08, -0.5, 0.5) * 2.0;
}

float fbm(vec2 p) {
  float value = 0.0;
  value += valueNoise(p) * 0.5;
  p = p * 2.03 + 17.11;
  value += valueNoise(p) * 0.3;
  p = p * 2.01 + 31.73;
  value += valueNoise(p) * 0.2;
  return value;
}

float weatherCenter(float t, float phase) {
  float drift = fbm(vec2(t * 0.42 + phase, phase * 1.91));
  float wander = fbm(vec2(t * 0.17 + phase * 2.7, 8.4 + phase));
  float wave = sin(t * 0.31 + phase + drift * 6.28318);
  return clamp(0.5 + wave * 0.36 + (wander - 0.5) * 0.28, 0.08, 0.92);
}

float weatherSideY(float t, float phase) {
  float drift = fbm(vec2(t * 0.33 + phase, phase * 2.41));
  float wander = fbm(vec2(t * 0.19 + phase * 2.2, 13.7 + phase));
  float wave = sin(t * 0.27 + phase + drift * 6.28318);
  return clamp(0.5 + wave * 0.32 + (wander - 0.5) * 0.24, 0.12, 0.88);
}

float bottomTrackY(float t, float phase) {
  float drift = fbm(vec2(t * 0.28 + phase, phase * 2.17));
  float wave = sin(t * 0.38 + phase + drift * 6.28318);
  return clamp(0.026 + wave * 0.018 + (drift - 0.5) * 0.024, 0.0, 0.064);
}

float rightTrackX(float t, float phase) {
  float drift = fbm(vec2(t * 0.3 + phase, phase * 1.73));
  float wave = sin(t * 0.34 + phase + drift * 6.28318);
  return clamp(0.974 + wave * 0.015 + (drift - 0.5) * 0.012, 0.946, 0.992);
}

float debugEmitter(vec2 uv, float center, float originY, float strength, float width, float aspect) {
  float x = (uv.x - center) * aspect;
  float y = uv.y - originY;
  float baseDistance = length(vec2(x / max(width, 0.0001), (y - 0.052) / 0.024));
  float baseDot = (1.0 - smoothstep(0.82, 1.0, baseDistance)) * (0.36 + strength * 0.64);
  float ring = smoothstep(1.32, 1.08, baseDistance) * smoothstep(0.72, 1.0, baseDistance);
  float upward = max(y, 0.0);
  float columnWidth = mix(width * 0.9, width * 4.8, smoothstep(0.0, 0.62, upward));
  float column = exp(-(x * x) / max(columnWidth * columnWidth, 0.0001)) * smoothstep(0.62, 0.02, upward) * smoothstep(0.025, 0.16, upward);
  float guide = (1.0 - smoothstep(0.0025, 0.009, abs(uv.x - center))) * smoothstep(0.72, 0.05, upward);
  return baseDot * 1.2 + ring * 1.05 + column * strength * 0.72 + guide * (0.18 + strength * 0.26);
}

float debugSideEmitter(vec2 uv, float originX, float centerY, float strength, float height, float aspect) {
  vec2 p = vec2((uv.x - originX) * aspect, uv.y - centerY);
  float baseDistance = length(vec2(p.x / 0.028, p.y / max(height, 0.0001)));
  float baseDot = (1.0 - smoothstep(0.82, 1.0, baseDistance)) * (0.36 + strength * 0.64);
  float ring = (1.0 - smoothstep(1.08, 1.32, baseDistance)) * smoothstep(0.72, 1.0, baseDistance);
  float inward = max(0.0, originX - uv.x);
  float spread = height + inward * 0.46;
  float edgeFade = 1.0 - smoothstep(0.02, 0.72, inward);
  float column = exp(-((uv.y - centerY) * (uv.y - centerY)) / max(spread * spread, 0.0001)) * exp(-(inward * inward) / (0.34 * 0.34)) * edgeFade;
  float guide = (1.0 - smoothstep(0.0025, 0.009, abs(uv.y - centerY))) * smoothstep(0.55, originX, uv.x);
  return baseDot * 1.2 + ring * 1.05 + column * strength * 0.72 + guide * (0.18 + strength * 0.26);
}

vec2 rotate2d(vec2 p, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c) * p;
}

float starLayer(vec2 uv, float scale, float threshold, float size, float time) {
  vec2 cell = uv * scale;
  vec2 id = floor(cell);
  vec2 local = fract(cell) - 0.5;
  vec2 offset = vec2(hash21(id + 13.2), hash21(id + 47.7)) - 0.5;
  float seed = hash21(id + 91.4);
  float star = 1.0 - smoothstep(0.0, size, length(local - offset * 0.38));
  float twinkle = 0.72 + 0.28 * sin(time * (0.34 + seed * 0.42) + seed * 6.28318);
  return star * step(threshold, seed) * twinkle;
}

float galaxyDust(vec2 space, float time) {
  vec2 bandSpace = rotate2d(space, -0.36);
  float warp = (fbm(bandSpace * vec2(1.6, 4.7) + vec2(time * 0.012, -time * 0.006)) - 0.5) * 0.16;
  float band = exp(-pow((bandSpace.y + warp) / 0.18, 2.0));
  float taper = smoothstep(1.18, 0.04, abs(bandSpace.x));
  float granularity = smoothstep(0.3, 0.88, fbm(bandSpace * vec2(4.2, 11.0) + vec2(-time * 0.018, time * 0.01)));
  return band * taper * (0.38 + granularity * 0.62);
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 space = (uv - vec2(0.5)) * aspect;
  vec2 fluidVelocity = texture2D(uVelocityMap, uv).rg * 2.0 - 1.0;
  vec4 dye = sampleDye(uv);
  vec2 layerDrift = clamp(fluidVelocity * vec2(0.018, 0.014), vec2(-0.025), vec2(0.025));
  vec4 nearDye = sampleDye(uv - layerDrift + vec2(0.006, -0.004));
  vec4 farDye = sampleDye(uv + layerDrift * 0.72 + vec2(-0.012, 0.018));
  float fluidDye = dyeAmount(dye);
  float nearDensity = dyeAmount(nearDye);
  float farDensity = dyeAmount(farDye);
  float layeredDensity = clamp(fluidDye * 0.62 + nearDensity * 0.27 + farDensity * 0.18, 0.0, 1.0);
  vec3 layeredSmoke = dye.rgb * 1.0 + nearDye.rgb * 0.42 + farDye.rgb * 0.26;
  float dyeRight = dyeAmount(sampleDye(uv + vec2(uFluidTexel.x, 0.0)));
  float dyeUp = dyeAmount(sampleDye(uv + vec2(0.0, uFluidTexel.y)));
  vec2 dyeGradient = vec2(dyeRight - fluidDye, dyeUp - fluidDye);
  vec2 lightDirection = normalize(vec2(0.82, 0.42));
  float opticalDepth = 0.0;
  opticalDepth += dyeAmount(sampleDye(uv + lightDirection * 0.018)) * 0.34;
  opticalDepth += dyeAmount(sampleDye(uv + lightDirection * 0.043)) * 0.27;
  opticalDepth += dyeAmount(sampleDye(uv + lightDirection * 0.073)) * 0.21;
  opticalDepth += dyeAmount(sampleDye(uv + lightDirection * 0.11)) * 0.16;
  float transmittance = exp(-opticalDepth * 2.4);
  vec2 densityNormal = dyeGradient / max(length(dyeGradient), 0.0001);
  float rimLight = max(dot(densityNormal, lightDirection), 0.0) * smoothstep(0.016, 0.22, fluidDye);
  float innerScatter = layeredDensity * transmittance * smoothstep(0.018, 0.34, opticalDepth + layeredDensity * 0.45);
  float coreShadow = layeredDensity * (1.0 - transmittance) * 0.22;
  float speed = length(fluidVelocity * aspect);
  float haloDensity = 0.0;
  haloDensity += dyeAmount(sampleDye(uv - lightDirection * 0.052)) * 0.36;
  haloDensity += dyeAmount(sampleDye(uv - lightDirection * 0.092 + vec2(0.012, -0.006))) * 0.26;
  haloDensity += dyeAmount(sampleDye(uv - lightDirection * 0.14 + vec2(-0.018, 0.011))) * 0.2;
  haloDensity += dyeAmount(sampleDye(uv - lightDirection * 0.2)) * 0.14;
  float backGlow = smoothstep(0.01, 0.18, haloDensity) * (1.0 - smoothstep(0.62, 1.08, layeredDensity));
  float plumeGlow = smoothstep(0.012, 0.34, haloDensity + layeredDensity * 0.56);
  float edgeEnergy = smoothstep(0.002, 0.04, length(dyeGradient) * 9.0) * smoothstep(0.006, 0.18, layeredDensity);
  vec2 colorField = (uv - vec2(0.5)) * aspect;
  float paletteTime = uElapsedTime * 0.18;
  float greenField = pow(0.5 + 0.5 * sin(paletteTime + colorField.x * 1.35 - colorField.y * 0.76), 2.15);
  float violetField = pow(0.5 + 0.5 * sin(paletteTime + 1.5708 - colorField.x * 0.68 + colorField.y * 1.18), 2.15);
  float yellowField = pow(0.5 + 0.5 * sin(paletteTime + 3.14159 + colorField.x * 1.08 + colorField.y * 0.48), 2.35);
  float redField = pow(0.5 + 0.5 * sin(paletteTime + 4.71239 - colorField.x * 1.24 - colorField.y * 0.38), 2.35);
  float paletteTotal = max(greenField + violetField + yellowField + redField, 0.0001);
  vec3 spatialPalette = (
    vec3(0.018, 0.44, 0.31) * greenField +
    vec3(0.32, 0.11, 0.62) * violetField +
    vec3(0.54, 0.38, 0.09) * yellowField +
    vec3(0.34, 0.08, 0.07) * redField
  ) / paletteTotal;
  float cyclePhase = mod(uElapsedTime * 0.055, 4.0);
  float cycleGreen = smoothstep(1.0, 0.0, min(abs(cyclePhase), abs(cyclePhase - 4.0)));
  float cycleViolet = smoothstep(1.0, 0.0, abs(cyclePhase - 1.0));
  float cycleYellow = smoothstep(1.0, 0.0, abs(cyclePhase - 2.0));
  float cycleRed = smoothstep(1.0, 0.0, abs(cyclePhase - 3.0));
  float cycleTotal = max(cycleGreen + cycleViolet + cycleYellow + cycleRed, 0.0001);
  vec3 cyclePalette = (
    vec3(0.018, 0.44, 0.31) * cycleGreen +
    vec3(0.32, 0.11, 0.62) * cycleViolet +
    vec3(0.54, 0.38, 0.09) * cycleYellow +
    vec3(0.34, 0.08, 0.07) * cycleRed
  ) / cycleTotal;
  vec3 gradientPalette = mix(spatialPalette, cyclePalette, 0.58);
  float paletteMask = smoothstep(0.02, 0.42, haloDensity + layeredDensity * 0.52) * (0.45 + plumeGlow * 0.55);
  float caustic = smoothstep(0.009, 0.105, length(dyeGradient) * 7.5 + dye.a * 0.38);
  vec3 lightColor = vec3(0.08, 0.32, 0.28);
  vec3 rimColor = vec3(0.11, 0.46, 0.38);
  vec3 backGlowColor = vec3(0.04, 0.32, 0.24) * backGlow * 1.35 + vec3(0.09, 0.38, 0.28) * plumeGlow * 0.3;
  vec3 paletteGlow = gradientPalette * paletteMask * (0.22 + backGlow * 0.38 + edgeEnergy * 0.16);
  vec3 dyeColor = layeredSmoke * 1.46 + vec3(0.018, 0.175, 0.15) * layeredDensity + gradientPalette * layeredDensity * 0.11 * paletteMask;
  vec3 velocityColor = vec3(0.012, 0.085, 0.075) * smoothstep(0.012, 0.22, speed);
  vec3 causticColor = vec3(0.026, 0.16, 0.14) * caustic;
  vec3 volumeColor = lightColor * innerScatter * 0.34 + rimColor * rimLight * 0.14 + backGlowColor + paletteGlow;
  vec3 color = dyeColor + velocityColor + causticColor + volumeColor;
  color *= 1.0 - coreShadow;
  color = color / (vec3(1.0) + color * 1.95);
  color = clamp(color, vec3(0.0), vec3(0.32));
  float alpha = clamp(layeredDensity * 0.48 + caustic * 0.08 + innerScatter * 0.04 + backGlow * 0.08 + edgeEnergy * 0.022 + smoothstep(0.018, 0.28, speed) * 0.055, 0.0, 0.34);
  float panelSmokeMask = widgetMask(uv, aspect.x) * smoothstep(0.018, 0.38, layeredDensity + haloDensity * 0.42);
  vec3 panelGrayscaleColor = grayscaleColor(color);
  color = mix(color, panelGrayscaleColor, panelSmokeMask);
  alpha = clamp(alpha + panelSmokeMask * 0.02, 0.0, 0.36);

  float galaxyTime = uElapsedTime * 0.62;
  float dust = galaxyDust(space, galaxyTime);
  float core = exp(-dot(space - vec2(-0.09, 0.035), space - vec2(-0.09, 0.035)) / 0.085);
  float farStars = starLayer(uv + vec2(galaxyTime * 0.0009, -galaxyTime * 0.0005), 112.0, 0.982, 0.05, galaxyTime);
  float nearStars = starLayer(uv + vec2(-galaxyTime * 0.00055, galaxyTime * 0.0007), 58.0, 0.965, 0.038, galaxyTime);
  float pinStars = starLayer(uv, 182.0, 0.991, 0.028, galaxyTime);
  float stars = clamp(farStars * 0.45 + nearStars * 0.62 + pinStars * 0.34, 0.0, 1.0);
  vec3 dustColor = vec3(0.055, 0.09, 0.13) * dust;
  dustColor += vec3(0.08, 0.04, 0.065) * dust * smoothstep(-0.18, 0.32, space.x);
  dustColor += vec3(0.13, 0.102, 0.052) * core * 0.16;
  vec3 starColor = mix(vec3(0.54, 0.67, 0.72), vec3(0.86, 0.78, 0.62), smoothstep(0.2, 0.88, hash21(floor(uv * 96.0)))) * stars;
  float vignette = smoothstep(1.12, 0.18, length(space));
  vec3 galaxyColor = (dustColor * 0.82 + starColor * 0.22) * vignette;
  float galaxyAlpha = clamp(dust * 0.18 + core * 0.055 + stars * 0.11, 0.0, 0.3) * vignette;
  color = clamp(color * 0.58 + galaxyColor, vec3(0.0), vec3(0.38));
  alpha = clamp(alpha * 0.68 + galaxyAlpha, 0.0, 0.42);

  float weatherTime = uElapsedTime * 0.72;
  float centerA = clamp(weatherCenter(weatherTime + uEmitterSeed.x * 17.0, 0.2 + uEmitterSeed.x * 6.28318) + (uEmitterSeed.x - 0.5) * 0.12, 0.08, 0.92);
  float centerB = clamp(weatherCenter(weatherTime * 0.86 + 9.0 + uEmitterSeed.y * 19.0, 2.6 + uEmitterSeed.y * 6.28318) + (uEmitterSeed.y - 0.5) * 0.12, 0.08, 0.92);
  float liftA = bottomTrackY(weatherTime * 0.92 + uEmitterSeed.x * 11.0, 1.4 + uEmitterSeed.x * 5.0);
  float liftB = bottomTrackY(weatherTime * 0.78 + uEmitterSeed.y * 13.0, 4.7 + uEmitterSeed.y * 5.0);
  float sideY = weatherSideY(weatherTime * 1.08 + 17.0 + uEmitterSeed.z * 23.0, 5.1 + uEmitterSeed.z * 6.28318);
  float sideX = rightTrackX(weatherTime * 0.82 + uEmitterSeed.z * 17.0, 2.2 + uEmitterSeed.w * 6.28318);
  float strengthA = smoothstep(0.18, 0.86, fbm(vec2(weatherTime * 0.58 + 1.3 + uEmitterSeed.x * 8.0, 2.0 + uEmitterSeed.x * 5.0)));
  float strengthB = smoothstep(0.22, 0.88, fbm(vec2(weatherTime * 0.52 + 8.7 + uEmitterSeed.y * 8.0, 5.0 + uEmitterSeed.y * 5.0)));
  float strengthC = smoothstep(0.26, 0.9, fbm(vec2(weatherTime * 0.64 + 15.4 + uEmitterSeed.z * 8.0, 9.0 + uEmitterSeed.z * 5.0)));
  float sideStrength = 0.72 + strengthC * 0.72;
  float debugA = debugEmitter(uv, centerA, liftA, strengthA, 0.042, aspect.x);
  float debugB = debugEmitter(uv, centerB, liftB, strengthB * 0.82, 0.052, aspect.x);
  float debugC = debugSideEmitter(uv, sideX, sideY, sideStrength * 0.54, 0.048, aspect.x);
  vec3 debugColor = vec3(0.28, 0.95, 0.82) * debugA;
  debugColor += vec3(0.42, 0.78, 1.0) * debugB;
  debugColor += vec3(0.95, 0.78, 0.34) * debugC;
  float debugAlpha = clamp((debugA + debugB + debugC) * 0.92, 0.0, 0.92) * uEmitterDebug;
  color = mix(color, clamp(color + debugColor * 0.9, vec3(0.0), vec3(0.78)), debugAlpha);
  color *= 2.0;
  alpha = max(alpha, debugAlpha);

  float lowContrastMask = 1.0 - smoothstep(0.02, 0.22, length(dyeGradient) * 8.0 + stars * 0.42 + dust * 0.16);
  float dither = blueDitherNoise(gl_FragCoord.xy, uEmitterSeed, uElapsedTime);
  float grain = filmGrain(gl_FragCoord.xy, uEmitterSeed, uElapsedTime);
  vec3 baseBackground = vec3(0.0196, 0.0275, 0.0431);
  float baseTeal = exp(-dot((uv - vec2(0.16, 0.82)) * aspect, (uv - vec2(0.16, 0.82)) * aspect) / 0.48);
  float baseCool = exp(-dot((uv - vec2(0.48, 0.46)) * aspect, (uv - vec2(0.48, 0.46)) * aspect) / 0.62);
  float baseAmber = exp(-dot((uv - vec2(0.88, 0.22)) * aspect, (uv - vec2(0.88, 0.22)) * aspect) / 0.44);
  baseBackground += vec3(0.0025, 0.018, 0.016) * baseTeal;
  baseBackground += vec3(0.012, 0.018, 0.026) * baseCool;
  baseBackground += vec3(0.014, 0.009, 0.004) * baseAmber;
  vec3 composedColor = mix(baseBackground, color, alpha);
  float ditherStrength = mix(0.004, 0.01, lowContrastMask);
  float grainStrength = mix(0.0035, 0.0085, lowContrastMask);
  composedColor = clamp(
    composedColor + vec3(dither * ditherStrength + grain * grainStrength),
    vec3(0.0),
    vec3(1.0)
  );

  gl_FragColor = vec4(composedColor, 1.0);
}
`;
function Rs() {
  const t = ne(null), a = ne(!1), n = ne(!1);
  return Ae(() => {
    if (window.matchMedia("(max-width: 767px)").matches)
      return;
    const r = t.current, e = r == null ? void 0 : r.getContext("webgl", {
      alpha: !0,
      antialias: !1,
      depth: !1,
      failIfMajorPerformanceCaveat: !1,
      powerPreference: "low-power",
      premultipliedAlpha: !1,
      stencil: !1
    });
    if (!r || !e)
      return;
    const s = (_, T) => {
      const $ = e.createShader(_);
      return $ ? (e.shaderSource($, T), e.compileShader($), e.getShaderParameter($, e.COMPILE_STATUS) ? $ : (console.warn(e.getShaderInfoLog($)), e.deleteShader($), null)) : null;
    }, c = (_) => {
      const T = s(e.VERTEX_SHADER, bs), $ = s(e.FRAGMENT_SHADER, _);
      if (!T || !$)
        return T && e.deleteShader(T), $ && e.deleteShader($), null;
      const k = e.createProgram();
      return k ? (e.attachShader(k, T), e.attachShader(k, $), e.linkProgram(k), e.deleteShader(T), e.deleteShader($), e.getProgramParameter(k, e.LINK_STATUS) ? k : (console.warn(e.getProgramInfoLog(k)), e.deleteProgram(k), null)) : (e.deleteShader(T), e.deleteShader($), null);
    }, d = c(Cs), f = c(ys), u = c(ws), m = c(Ts), g = c(Es), w = c(Ms), y = c(Ns), x = c(Ds), M = () => {
      [d, f, u, m, g, w, y, x].forEach((_) => {
        _ && e.deleteProgram(_);
      });
    };
    if (!d || !f || !u || !m || !g || !w || !y || !x) {
      M();
      return;
    }
    const L = e.createBuffer();
    if (!L) {
      M();
      return;
    }
    e.bindBuffer(e.ARRAY_BUFFER, L), e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      e.STATIC_DRAW
    );
    const X = (_) => {
      const T = e.getAttribLocation(_, "aPosition");
      T < 0 || (e.bindBuffer(e.ARRAY_BUFFER, L), e.enableVertexAttribArray(T), e.vertexAttribPointer(T, 2, e.FLOAT, !1, 0, 0));
    }, ee = {
      resolution: e.getUniformLocation(d, "uResolution"),
      fluidTexel: e.getUniformLocation(d, "uFluidTexel"),
      widgetRect: e.getUniformLocation(d, "uWidgetRect"),
      elapsedTime: e.getUniformLocation(d, "uElapsedTime"),
      emitterDebug: e.getUniformLocation(d, "uEmitterDebug"),
      emitterSeed: e.getUniformLocation(d, "uEmitterSeed"),
      velocityMap: e.getUniformLocation(d, "uVelocityMap"),
      dyeMap: e.getUniformLocation(d, "uDyeMap")
    }, G = {
      velocityMap: e.getUniformLocation(f, "uVelocityMap"),
      dyeMap: e.getUniformLocation(f, "uDyeMap"),
      texel: e.getUniformLocation(f, "uTexel"),
      pointerPosition: e.getUniformLocation(f, "uPointerPosition"),
      pointerVelocity: e.getUniformLocation(f, "uPointerVelocity"),
      pointerActive: e.getUniformLocation(f, "uPointerActive"),
      pointerRadius: e.getUniformLocation(f, "uPointerRadius"),
      deltaTime: e.getUniformLocation(f, "uDeltaTime"),
      elapsedTime: e.getUniformLocation(f, "uElapsedTime"),
      aspect: e.getUniformLocation(f, "uAspect"),
      emitterSeed: e.getUniformLocation(f, "uEmitterSeed")
    }, oe = {
      velocityMap: e.getUniformLocation(u, "uVelocityMap"),
      texel: e.getUniformLocation(u, "uTexel"),
      aspect: e.getUniformLocation(u, "uAspect")
    }, J = {
      velocityMap: e.getUniformLocation(m, "uVelocityMap"),
      curlMap: e.getUniformLocation(m, "uCurlMap"),
      texel: e.getUniformLocation(m, "uTexel"),
      deltaTime: e.getUniformLocation(m, "uDeltaTime"),
      strength: e.getUniformLocation(m, "uStrength"),
      aspect: e.getUniformLocation(m, "uAspect")
    }, E = {
      velocityMap: e.getUniformLocation(g, "uVelocityMap"),
      texel: e.getUniformLocation(g, "uTexel"),
      obstacleRect: e.getUniformLocation(g, "uObstacleRect"),
      aspect: e.getUniformLocation(g, "uAspect")
    }, I = {
      pressureMap: e.getUniformLocation(w, "uPressureMap"),
      divergenceMap: e.getUniformLocation(w, "uDivergenceMap"),
      texel: e.getUniformLocation(w, "uTexel"),
      obstacleRect: e.getUniformLocation(w, "uObstacleRect"),
      aspect: e.getUniformLocation(w, "uAspect")
    }, Y = {
      velocityMap: e.getUniformLocation(y, "uVelocityMap"),
      pressureMap: e.getUniformLocation(y, "uPressureMap"),
      texel: e.getUniformLocation(y, "uTexel"),
      obstacleRect: e.getUniformLocation(y, "uObstacleRect"),
      aspect: e.getUniformLocation(y, "uAspect")
    }, P = {
      velocityMap: e.getUniformLocation(x, "uVelocityMap"),
      dyeMap: e.getUniformLocation(x, "uDyeMap"),
      pointerPosition: e.getUniformLocation(x, "uPointerPosition"),
      pointerVelocity: e.getUniformLocation(x, "uPointerVelocity"),
      pointerActive: e.getUniformLocation(x, "uPointerActive"),
      pointerRadius: e.getUniformLocation(x, "uPointerRadius"),
      deltaTime: e.getUniformLocation(x, "uDeltaTime"),
      elapsedTime: e.getUniformLocation(x, "uElapsedTime"),
      aspect: e.getUniformLocation(x, "uAspect"),
      emitterSeed: e.getUniformLocation(x, "uEmitterSeed")
    }, O = (_) => {
      const T = e.createTexture(), $ = e.createFramebuffer();
      if (!T || !$)
        return T && e.deleteTexture(T), $ && e.deleteFramebuffer($), !1;
      e.bindTexture(e.TEXTURE_2D, T), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, _, null), e.bindFramebuffer(e.FRAMEBUFFER, $), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, T, 0);
      const k = e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE;
      return e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(T), e.deleteFramebuffer($), k;
    }, Z = (() => {
      const _ = e.getExtension("OES_texture_half_float"), T = e.getExtension("OES_texture_half_float_linear");
      if (e.getExtension("EXT_color_buffer_half_float"), _ && T && O(_.HALF_FLOAT_OES))
        return {
          filter: e.LINEAR,
          type: _.HALF_FLOAT_OES
        };
      const $ = e.getExtension("OES_texture_float"), k = e.getExtension("OES_texture_float_linear");
      return e.getExtension("WEBGL_color_buffer_float"), $ && k && O(e.FLOAT) ? {
        filter: e.LINEAR,
        type: e.FLOAT
      } : {
        filter: e.LINEAR,
        type: e.UNSIGNED_BYTE
      };
    })(), W = (_, T, $) => {
      const k = e.createTexture(), ae = e.createFramebuffer();
      return !k || !ae ? (k && e.deleteTexture(k), ae && e.deleteFramebuffer(ae), null) : (e.bindTexture(e.TEXTURE_2D, k), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, Z.filter), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, Z.filter), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, _, T, 0, e.RGBA, Z.type, null), e.bindFramebuffer(e.FRAMEBUFFER, ae), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, k, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(k), e.deleteFramebuffer(ae), null) : (e.viewport(0, 0, _, T), e.clearColor($[0], $[1], $[2], $[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null), { framebuffer: ae, height: T, texture: k, width: _ }));
    }, ce = (_, T) => {
      e.bindFramebuffer(e.FRAMEBUFFER, _.framebuffer), e.viewport(0, 0, _.width, _.height), e.clearColor(T[0], T[1], T[2], T[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null);
    }, q = (_) => {
      e.deleteFramebuffer(_.framebuffer), e.deleteTexture(_.texture);
    }, he = () => {
      const _ = Math.min(window.devicePixelRatio || 1, 1.3), T = Math.max(120, Math.min(340, Math.floor(window.innerWidth * _ / 5))), $ = Math.max(80, Math.min(220, Math.floor(window.innerHeight * _ / 5)));
      return [T, $];
    };
    let N = 0, R = !1, C = null, A = null, v = null, D = null, S = null, U = 0, re = 0, te = 0;
    const de = performance.now(), Q = window.matchMedia("(prefers-reduced-motion: reduce)"), H = [-1, -1, -1, -1];
    let z = [0.5, 0.5], V = [0, 0], se = 0, me = null, be = de;
    const B = () => {
      const [_, T] = he();
      if ((C == null ? void 0 : C[0].width) === _ && C[0].height === T)
        return !0;
      C == null || C.forEach(q), A == null || A.forEach(q), v == null || v.forEach(q), D && q(D), S && q(S);
      const $ = [
        W(_, T, [0.5, 0.5, 0, 1]),
        W(_, T, [0.5, 0.5, 0, 1])
      ], k = [
        W(_, T, [0.5, 0, 0, 1]),
        W(_, T, [0.5, 0, 0, 1])
      ], ae = [
        W(_, T, [0, 0, 0, 0]),
        W(_, T, [0, 0, 0, 0])
      ], Se = W(_, T, [0.5, 0, 0, 1]), Ie = W(_, T, [0.5, 0, 0, 1]), Fe = [...$, ...k, ...ae, Se, Ie];
      return Fe.some((Xe) => !Xe) ? (Fe.forEach((Xe) => {
        Xe && q(Xe);
      }), C = null, A = null, v = null, D = null, S = null, !1) : (C = $, A = k, v = ae, D = Se, S = Ie, U = 0, re = 0, te = 0, !0);
    };
    let De = de;
    const et = 0.5, fe = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ], Ue = () => {
      const T = Math.max(1, Math.floor(window.innerWidth * 1)), $ = Math.max(1, Math.floor(window.innerHeight * 1));
      (r.width !== T || r.height !== $) && (r.width = T, r.height = $, e.viewport(0, 0, T, $)), e.useProgram(d), e.uniform2f(ee.resolution, T, $), B();
    }, le = (_) => {
      const T = _ * 60;
      se *= Math.pow(0.9, T), V = [
        V[0] * Math.pow(0.94, T),
        V[1] * Math.pow(0.94, T)
      ];
    }, Pe = (_) => {
      if (!a.current || _.pointerType === "touch")
        return;
      const T = Math.max(window.innerWidth, 1), $ = Math.max(window.innerHeight, 1), k = [
        Math.max(0, Math.min(1, _.clientX / T)),
        Math.max(0, Math.min(1, 1 - _.clientY / $))
      ], ae = performance.now(), Se = Math.max((ae - be) / 1e3, 1 / 120);
      if (me) {
        const Ie = [
          Math.max(-7.5, Math.min(7.5, (k[0] - me[0]) / Se)),
          Math.max(-7.5, Math.min(7.5, (k[1] - me[1]) / Se))
        ];
        V = [
          V[0] + (Ie[0] - V[0]) * 0.74,
          V[1] + (Ie[1] - V[1]) * 0.74
        ];
      }
      z = k, me = k, be = ae, se = Math.min(1, se + 0.92), Q.matches && ge(ae);
    }, K = () => {
      const _ = Math.max(window.innerWidth, 1), T = Math.max(window.innerHeight, 1), k = Array.from(document.querySelectorAll(".timeline-fluid-obstacle")).find((Se) => {
        const Ie = Se.getBoundingClientRect(), Fe = window.getComputedStyle(Se);
        return Fe.display !== "none" && Fe.visibility !== "hidden" && Ie.width > 1 && Ie.height > 1 && Ie.bottom > 0 && Ie.top < T && Ie.right > 0 && Ie.left < _;
      });
      if (!k)
        return [-1, -1, -1, -1];
      const ae = k.getBoundingClientRect();
      return [
        Math.max(0, Math.min(1, ae.left / _)),
        Math.max(0, Math.min(1, 1 - ae.bottom / T)),
        Math.max(0, Math.min(1, ae.right / _)),
        Math.max(0, Math.min(1, 1 - ae.top / T))
      ];
    }, sa = (_, T) => {
      if (!C || !A || !v || !D || !S)
        return;
      const $ = r.width / Math.max(r.height, 1);
      let k = C[U], ae = C[1 - U];
      const Se = v[te];
      e.bindFramebuffer(e.FRAMEBUFFER, ae.framebuffer), e.viewport(0, 0, ae.width, ae.height), e.useProgram(f), X(f), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, k.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Se.texture), e.uniform1i(G.velocityMap, 0), e.uniform1i(G.dyeMap, 1), e.uniform2f(G.texel, 1 / k.width, 1 / k.height), e.uniform2f(G.pointerPosition, z[0], z[1]), e.uniform2f(G.pointerVelocity, V[0], V[1]), e.uniform1f(G.pointerActive, a.current ? se : 0), e.uniform1f(G.pointerRadius, 0.088), e.uniform1f(G.deltaTime, _), e.uniform1f(G.elapsedTime, T), e.uniform1f(G.aspect, $), e.uniform4f(G.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6), U = 1 - U, k = C[U], e.bindFramebuffer(e.FRAMEBUFFER, S.framebuffer), e.viewport(0, 0, S.width, S.height), e.useProgram(u), X(u), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, k.texture), e.uniform1i(oe.velocityMap, 0), e.uniform2f(oe.texel, 1 / k.width, 1 / k.height), e.uniform1f(oe.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), ae = C[1 - U], e.bindFramebuffer(e.FRAMEBUFFER, ae.framebuffer), e.viewport(0, 0, ae.width, ae.height), e.useProgram(m), X(m), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, k.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, S.texture), e.uniform1i(J.velocityMap, 0), e.uniform1i(J.curlMap, 1), e.uniform2f(J.texel, 1 / k.width, 1 / k.height), e.uniform1f(J.deltaTime, _ * 0.25), e.uniform1f(J.strength, 13), e.uniform1f(J.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), U = 1 - U, k = C[U], e.bindFramebuffer(e.FRAMEBUFFER, D.framebuffer), e.viewport(0, 0, D.width, D.height), e.useProgram(g), X(g), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, k.texture), e.uniform1i(E.velocityMap, 0), e.uniform2f(E.texel, 1 / k.width, 1 / k.height), e.uniform4f(E.obstacleRect, H[0], H[1], H[2], H[3]), e.uniform1f(E.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), A.forEach((Xe) => ce(Xe, [0.5, 0, 0, 1])), re = 0;
      for (let Xe = 0; Xe < 12; Xe += 1) {
        const yt = A[re], tt = A[1 - re];
        e.bindFramebuffer(e.FRAMEBUFFER, tt.framebuffer), e.viewport(0, 0, tt.width, tt.height), e.useProgram(w), X(w), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, yt.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, D.texture), e.uniform1i(I.pressureMap, 0), e.uniform1i(I.divergenceMap, 1), e.uniform2f(I.texel, 1 / yt.width, 1 / yt.height), e.uniform4f(I.obstacleRect, H[0], H[1], H[2], H[3]), e.uniform1f(I.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), re = 1 - re;
      }
      ae = C[1 - U], e.bindFramebuffer(e.FRAMEBUFFER, ae.framebuffer), e.viewport(0, 0, ae.width, ae.height), e.useProgram(y), X(y), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, k.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, A[re].texture), e.uniform1i(Y.velocityMap, 0), e.uniform1i(Y.pressureMap, 1), e.uniform2f(Y.texel, 1 / k.width, 1 / k.height), e.uniform4f(Y.obstacleRect, H[0], H[1], H[2], H[3]), e.uniform1f(Y.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), U = 1 - U, k = C[U];
      const Ie = v[te], Fe = v[1 - te];
      e.bindFramebuffer(e.FRAMEBUFFER, Fe.framebuffer), e.viewport(0, 0, Fe.width, Fe.height), e.useProgram(x), X(x), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, k.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Ie.texture), e.uniform1i(P.velocityMap, 0), e.uniform1i(P.dyeMap, 1), e.uniform2f(P.pointerPosition, z[0], z[1]), e.uniform2f(P.pointerVelocity, V[0], V[1]), e.uniform1f(P.pointerActive, a.current ? se : 0), e.uniform1f(P.pointerRadius, 0.088), e.uniform1f(P.deltaTime, _), e.uniform1f(P.elapsedTime, T), e.uniform1f(P.aspect, $), e.uniform4f(P.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6), te = 1 - te;
    }, lt = (_) => {
      if (!C || !v)
        return;
      const T = C[U], $ = v[te];
      e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, r.width, r.height), e.useProgram(d), X(d), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, T.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, $.texture), e.uniform1i(ee.velocityMap, 0), e.uniform1i(ee.dyeMap, 1), e.uniform2f(ee.resolution, r.width, r.height), e.uniform2f(ee.fluidTexel, 1 / T.width, 1 / T.height);
      const k = K();
      e.uniform4f(ee.widgetRect, k[0], k[1], k[2], k[3]), e.uniform1f(ee.elapsedTime, _), e.uniform1f(ee.emitterDebug, n.current ? 1 : 0), e.uniform4f(ee.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6);
    }, ge = (_) => {
      Ue();
      const T = Math.min(Math.max((_ - De) / 1e3, 1 / 120), 1 / 20);
      De = _;
      const $ = (_ - de) / 1e3, k = T * et, ae = $ * et;
      le(T), sa(k, ae), lt(ae);
    }, Ce = (_) => {
      R || (N = window.requestAnimationFrame(Ce), !document.hidden && ge(_));
    }, qe = () => {
      R || (Ue(), ge(de + 1e3), Q.matches || (N = window.requestAnimationFrame(Ce)));
    };
    return window.addEventListener("resize", Ue), window.addEventListener("pointermove", Pe, { passive: !0 }), qe(), () => {
      R = !0, window.cancelAnimationFrame(N), window.removeEventListener("resize", Ue), window.removeEventListener("pointermove", Pe), C == null || C.forEach(q), A == null || A.forEach(q), v == null || v.forEach(q), D && q(D), S && q(S), e.deleteBuffer(L), M();
    };
  }, []), /* @__PURE__ */ h(xt, { children: [
    /* @__PURE__ */ i("div", { className: "aurora-backdrop", "aria-hidden": "true" }),
    /* @__PURE__ */ i(
      "canvas",
      {
        ref: t,
        className: "aurora-canvas",
        "aria-hidden": "true"
      }
    )
  ] });
}
function Mr({
  boardView: t,
  hiddenCompanyCount: a,
  onShowHiddenCompanies: n
}) {
  const r = a > 0, e = Je();
  return /* @__PURE__ */ i("div", { className: "flex min-h-[18rem] items-center justify-center px-6 py-14", children: /* @__PURE__ */ h("div", { className: "max-w-[34rem] text-center", children: [
    /* @__PURE__ */ i("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink-soft)]", children: /* @__PURE__ */ i(ot, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ i("p", { className: "mt-5 text-lg font-semibold tracking-tight text-[var(--ink)]", children: r ? `All visible ${e.groupPluralLabel} are hidden` : `${t.label} has no releases yet` }),
    /* @__PURE__ */ i("p", { className: "mt-2 text-sm leading-6 text-[var(--ink-soft)]", children: r ? `Show hidden ${e.groupPluralLabel} or turn on another product line to repopulate the timeline.` : e.emptyBoardDescription }),
    r ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        onClick: n,
        className: "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
        children: [
          /* @__PURE__ */ i(Jt, { className: "h-4 w-4", strokeWidth: 1.8 }),
          e.showHiddenLabel
        ]
      }
    ) : null
  ] }) });
}
function As() {
  return /* @__PURE__ */ i("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ h("div", { className: "mx-auto max-w-[1400px] px-5 pb-16 pt-8 md:px-8 md:pt-10", children: [
    /* @__PURE__ */ h("div", { className: "grid animate-pulse gap-10 lg:grid-cols-[minmax(0,1.18fr)_360px] lg:items-end", children: [
      /* @__PURE__ */ h("div", { className: "space-y-6", children: [
        /* @__PURE__ */ i("div", { className: "h-10 w-44 rounded-full bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
        /* @__PURE__ */ h("div", { className: "space-y-4", children: [
          /* @__PURE__ */ i("div", { className: "h-16 max-w-[720px] rounded-[1.75rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
          /* @__PURE__ */ i("div", { className: "h-6 max-w-[620px] rounded-full bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
        ] }),
        /* @__PURE__ */ h("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_280px]", children: [
          /* @__PURE__ */ i("div", { className: "h-32 rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
          /* @__PURE__ */ i("div", { className: "h-32 rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "h-[360px] rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
    ] }),
    /* @__PURE__ */ i("div", { className: "mt-10 overflow-hidden rounded-[2.4rem] border border-[var(--edge)] bg-[var(--surface)] p-6 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: /* @__PURE__ */ h("div", { className: "flex animate-pulse flex-col gap-6", children: [
      /* @__PURE__ */ h("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ i("div", { className: "h-8 w-80 rounded-full bg-[var(--surface-strong)]" }),
        /* @__PURE__ */ i("div", { className: "h-11 w-44 rounded-full bg-[var(--surface-strong)]" })
      ] }),
      [0, 1, 2, 3].map((t) => /* @__PURE__ */ i("div", { className: "relative h-[4.5rem] rounded-[1.25rem] bg-[var(--surface-strong)]", children: /* @__PURE__ */ i("div", { className: "absolute inset-y-1/2 left-12 right-12 h-px -translate-y-1/2 bg-[var(--edge)]" }) }, t))
    ] }) })
  ] }) });
}
function Nr({
  activeCompanyId: t,
  compact: a = !1,
  onCompanyBlur: n,
  onCompanyFocus: r,
  onCompanyTap: e,
  railWidth: s,
  rowLayouts: c,
  timelineWidth: d
}) {
  return /* @__PURE__ */ i("div", { "data-timeline-presentation-hide": !0, "aria-hidden": "true", className: "pointer-events-none absolute inset-0 z-[6]", children: c.map((f) => {
    const u = t === f.company.id;
    return /* @__PURE__ */ i(
      "div",
      {
        "data-row-focus-band": !0,
        className: "pointer-events-auto absolute left-0 rounded-[1.25rem]",
        onClick: (m) => {
          e && (m.stopPropagation(), e(f.company.id));
        },
        onMouseEnter: () => r(f.company.id),
        onMouseLeave: () => n == null ? void 0 : n(),
        onPointerEnter: (m) => {
          m.pointerType !== "touch" && r(f.company.id);
        },
        onPointerLeave: (m) => {
          m.pointerType !== "touch" && (n == null || n());
        },
        style: {
          height: `${f.height}px`,
          top: `${f.y}px`,
          width: `${d + s}px`
        },
        children: /* @__PURE__ */ i(
          "div",
          {
            className: `absolute inset-x-0 top-1/2 h-[calc(100%+1.25rem)] -translate-y-1/2 border-y transition duration-200 ${u ? "opacity-100" : "opacity-0"}`,
            style: {
              background: `linear-gradient(90deg, ${He(f.company.accent, a ? 0.16 : 0.12)}, transparent 42%, ${He(
                f.company.accent,
                0.08
              )})`,
              borderColor: He(f.company.accent, a ? 0.28 : 0.22)
            }
          }
        )
      },
      `${f.company.id}-${a ? "mobile" : "desktop"}-focus-band`
    );
  }) });
}
function Dr({
  compact: t = !1,
  onClearFocus: a,
  onCompanyHide: n,
  onCompanyMove: r,
  onPointerEnter: e,
  onPointerLeave: s,
  row: c,
  rowCount: d,
  screenX: f,
  screenY: u
}) {
  const m = c.company, g = m.latestRelease, w = g ? g.name : "No releases", y = m.productLines.map((M) => M.shortLabel).join(" / "), x = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[rgba(255,255,255,0.035)] text-[var(--ink-soft)] transition duration-200 hover:border-[var(--edge-strong)] hover:bg-[rgba(255,255,255,0.075)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-30";
  return /* @__PURE__ */ i(
    "div",
    {
      "data-row-focus-label": !0,
      "data-timeline-presentation-hide": !0,
      className: "pointer-events-none absolute z-30 will-change-transform",
      style: {
        transform: `translate3d(${f}px, ${u}px, 0) translateY(-50%)`
      },
      children: /* @__PURE__ */ h(
        xe.div,
        {
          initial: { opacity: 0, scale: 0.96, x: -8 },
          animate: { opacity: 1, scale: 1, x: 0 },
          exit: { opacity: 0, scale: 0.96, x: -8 },
          transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
          className: `pointer-events-auto rounded-[1.15rem] border border-[var(--edge-strong)] bg-[rgba(8,11,16,0.92)] shadow-[0_22px_48px_-30px_rgba(0,0,0,0.88)] backdrop-blur-xl ${t ? "w-[min(15.5rem,calc(100vw-8rem))] p-3" : "w-[18rem] p-3.5"}`,
          onMouseEnter: e,
          onMouseLeave: s,
          onPointerDown: (M) => M.stopPropagation(),
          onPointerEnter: e,
          onPointerLeave: s,
          children: [
            /* @__PURE__ */ h("div", { className: "flex min-w-0 items-start gap-3", children: [
              /* @__PURE__ */ i(Jo, { compact: t, company: m }),
              /* @__PURE__ */ h("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ h("div", { className: "flex min-w-0 items-center gap-2", children: [
                  /* @__PURE__ */ i("p", { className: "truncate text-sm font-semibold leading-tight tracking-tight text-[var(--ink)]", children: m.name }),
                  /* @__PURE__ */ i(
                    "span",
                    {
                      className: "h-1.5 w-1.5 shrink-0 rounded-full",
                      style: { backgroundColor: m.accent }
                    }
                  )
                ] }),
                /* @__PURE__ */ i("p", { className: "mt-1 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: y }),
                /* @__PURE__ */ i("p", { className: "mt-2 truncate text-xs font-medium text-[var(--ink-soft)]", children: w })
              ] })
            ] }),
            /* @__PURE__ */ h("div", { className: "mt-3 flex items-center justify-between gap-2 border-t border-[var(--edge)] pt-2.5", children: [
              /* @__PURE__ */ h("span", { className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: [
                "Score ",
                m.significanceScore,
                " · Row ",
                c.index + 1,
                "/",
                d
              ] }),
              /* @__PURE__ */ h("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${m.name} up`,
                    title: `Move ${m.name} up`,
                    className: x,
                    disabled: c.index === 0,
                    onClick: (M) => {
                      M.stopPropagation(), r(m.id, "up");
                    },
                    children: /* @__PURE__ */ i(ti, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${m.name} down`,
                    title: `Move ${m.name} down`,
                    className: x,
                    disabled: c.index === d - 1,
                    onClick: (M) => {
                      M.stopPropagation(), r(m.id, "down");
                    },
                    children: /* @__PURE__ */ i(ai, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Hide ${m.name}`,
                    title: `Hide ${m.name}`,
                    className: x,
                    onClick: (M) => {
                      M.stopPropagation(), n(m.id), a();
                    },
                    children: /* @__PURE__ */ i(Gn, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function Ss({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handlePointerDown: e,
  handlePointerMove: s,
  hiddenCompanyCount: c,
  handleZoomChange: d,
  isPanning: f,
  latestCompany: u,
  maxDays: m,
  minZoom: g,
  maxZoom: w,
  maxSummaryQuietDays: y,
  modelExplorer: x,
  monthTicks: M,
  onCompanyHide: L,
  onCompanyMove: X,
  onDismissArticle: ee,
  onModelSelect: G,
  onResetCamera: oe,
  onShowHiddenCompanies: J,
  onToggleTimelineGrid: E,
  processedCompanies: I,
  renderWindow: Y,
  scrollContainerRef: P,
  showTimelineGrid: O,
  stopPanning: j,
  summaryCompanies: Z,
  timelineStartDay: W,
  timelineWidth: ce,
  viewport: q,
  worldRef: he,
  yearTicks: N,
  zoom: R
}) {
  var Ue;
  const A = st(!1, 1), v = Zt(I, !1, 1), D = Qt({
    currentGlobalDay: r,
    maxDays: m,
    summaryCount: Z.length,
    timelineStartDay: W,
    timelineHeight: v,
    timelineWidth: ce,
    viewport: q
  }), S = At(I, !1, 1, A), [U, re] = Te(null), te = ne(null), de = () => {
    te.current !== null && (window.clearTimeout(te.current), te.current = null);
  }, Q = (le) => {
    de(), re(le);
  }, H = () => {
    de(), re(null);
  }, z = () => {
    de(), te.current = window.setTimeout(() => {
      re(null), te.current = null;
    }, 120);
  };
  Ae(() => () => de(), []);
  const V = S.find((le) => le.company.id === U) ?? null, me = ue(116, 16, Math.max(16, q.width - 288 - 16)), be = V ? ue(
    (D.timelineY + V.y + V.height / 2 - n.y) * R,
    82,
    Math.max(82, q.height - 84)
  ) : 0, B = Je(), De = a.isDefault ? B.defaultBoardDescription : a.isEmpty ? B.emptyBoardDetail : a.isComposite ? B.compositeBoardDescription(a.label) : B.singleBoardDescription(a.label), et = D.timelineX + W * ke, fe = ce + pt;
  return /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ i("div", { "data-timeline-presentation-hide": !0, className: "absolute left-5 top-5 z-40 [--category-expanded-width:40rem]", children: x }),
    /* @__PURE__ */ i(
      "div",
      {
        ref: P,
        className: `absolute inset-0 overflow-hidden [overflow-anchor:none] ${f ? "cursor-grabbing" : "cursor-grab"}`,
        onClickCapture: (le) => ee(le.target, { clientX: le.clientX, clientY: le.clientY }),
        onPointerDown: e,
        onPointerMove: s,
        onPointerUp: j,
        onPointerCancel: j,
        onLostPointerCapture: j,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: he,
            className: "relative",
            style: {
              height: `${D.worldHeight}px`,
              transform: Xa(n, R),
              transformOrigin: "0 0",
              width: `${D.worldWidth}px`,
              "--map-zoom": String(Ua(R))
            },
            children: [
              /* @__PURE__ */ h(
                xe.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[2rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.86)] p-7 shadow-[var(--panel-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${D.contentCards.intro.x}px`,
                    top: `${D.contentCards.intro.y}px`,
                    width: `${D.contentCards.intro.width}px`
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ i("h1", { className: "mt-4 max-w-4xl text-5xl leading-none tracking-tighter text-[var(--ink)]", children: B.primaryHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-5 max-w-[68ch] text-base leading-7 text-[var(--ink-soft)]", children: De })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                xe.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.45rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.78)] p-5 shadow-[var(--soft-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${D.contentCards.notes.x}px`,
                    top: `${D.contentCards.notes.y}px`,
                    width: `${D.contentCards.notes.width}px`,
                    "--border-sheen-delay": "2.8s"
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: B.timelineNotesHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-4 text-sm leading-7 text-[var(--ink-soft)]", children: B.timelineInteractionNoteDesktop })
                  ]
                }
              ),
              /* @__PURE__ */ i(
                xe.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${v}px`,
                    left: `${et}px`,
                    top: `${D.timelineY}px`,
                    width: `${fe}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ i(
                      Nr,
                      {
                        activeCompanyId: U,
                        onCompanyBlur: z,
                        onCompanyFocus: Q,
                        onCompanyTap: Q,
                        railWidth: pt,
                        rowLayouts: S,
                        timelineWidth: ce
                      }
                    ),
                    I.length === 0 ? /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-[320px] right-0 top-0 z-20 flex items-center justify-center px-6", children: /* @__PURE__ */ i(
                      Mr,
                      {
                        boardView: a,
                        hiddenCompanyCount: c,
                        onShowHiddenCompanies: J
                      }
                    ) }) : null,
                    /* @__PURE__ */ i(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${fe}px` },
                        children: /* @__PURE__ */ i("div", { style: { paddingLeft: `${pt}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${ce}px`, minHeight: `${v}px` },
                            children: [
                              O ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                M.map((le) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${Be(le.days, W)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-10 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.18em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: Ve(10),
                                        children: le.label
                                      }
                                    ) }) })
                                  },
                                  `month-${le.days}`
                                )),
                                N.map((le) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${Be(le.days, W)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-2 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1.5 font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: Ve(11),
                                        children: le.label
                                      }
                                    ) }) })
                                  },
                                  `year-${le.label}`
                                )),
                                /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${Be(r, W)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-2 font-semibold uppercase tracking-[0.18em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: Ve(11),
                                        children: B.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              I.length > 0 ? /* @__PURE__ */ i(
                                xe.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${A.companyGap}px`,
                                    paddingBottom: `${A.bottomPadding}px`,
                                    paddingTop: `${A.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ i(Ge, { initial: !1, mode: "popLayout", children: I.map((le, Pe) => /* @__PURE__ */ i(
                                    wr,
                                    {
                                      activeArticleSlug: t,
                                      company: le,
                                      companyIndex: Pe,
                                      currentGlobalDay: r,
                                      maxDays: m,
                                      onCompanyBlur: z,
                                      onCompanyFocus: Q,
                                      onModelSelect: G,
                                      renderWindow: Y,
                                      timelineStartDay: W,
                                      verticalScale: 1
                                    },
                                    le.id
                                  )) })
                                }
                              ) : null,
                              /* @__PURE__ */ i("div", { "aria-hidden": "true", className: "timeline-tail-fade" })
                            ]
                          }
                        ) })
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ h(
                xe.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center",
                  style: {
                    left: `${D.contentCards.latest.x}px`,
                    top: `${D.contentCards.latest.y}px`,
                    width: `${D.contentCards.latest.width}px`
                  },
                  children: [
                    /* @__PURE__ */ h("p", { className: "text-sm leading-relaxed text-[var(--ink-soft)]", children: [
                      B.latestDesktopLabel,
                      ": ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: (u == null ? void 0 : u.name) ?? B.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: ((Ue = u == null ? void 0 : u.latestRelease) == null ? void 0 : Ue.name) ?? B.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ i("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: B.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                xe.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.72, delay: 0.24, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${D.contentCards.summaries.x}px`,
                    top: `${D.contentCards.summaries.y}px`,
                    width: `${D.contentCards.summaries.width}px`
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]", children: B.recencyHeading }),
                    /* @__PURE__ */ i("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: /* @__PURE__ */ i(Ge, { initial: !1, mode: "popLayout", children: Z.map((le, Pe) => /* @__PURE__ */ i(
                      Tr,
                      {
                        company: le,
                        currentGlobalDay: r,
                        index: Pe,
                        maxSummaryQuietDays: y
                      },
                      le.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(Ge, { children: V ? /* @__PURE__ */ i(Rt.Fragment, { children: /* @__PURE__ */ i(
      Dr,
      {
        onClearFocus: H,
        onCompanyHide: L,
        onCompanyMove: X,
        onPointerEnter: de,
        onPointerLeave: z,
        row: V,
        rowCount: S.length,
        screenX: me,
        screenY: be
      }
    ) }, `${V.company.id}-desktop-focus-label`) : null }),
    /* @__PURE__ */ i(
      xr,
      {
        className: "right-5 top-1/2 -translate-y-1/2",
        maxZoom: w,
        minZoom: g,
        onZoomChange: d,
        zoom: R
      }
    ),
    /* @__PURE__ */ h("div", { "data-timeline-presentation-hide": !0, className: "absolute right-6 top-[calc(50%+12.5rem)] z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        vt,
        {
          label: O ? B.timelineGridHideLabel : B.timelineGridShowLabel,
          onClick: E,
          pressed: O,
          children: [
            O ? /* @__PURE__ */ i(Wn, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ i(Hn, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ i("span", { children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(vt, { label: B.resetCameraLabel, onClick: oe, children: [
        /* @__PURE__ */ i(Jt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { children: "Reset" })
      ] }),
      c > 0 ? /* @__PURE__ */ h(vt, { label: B.showHiddenLabel, onClick: J, children: [
        /* @__PURE__ */ i(ot, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { children: B.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function Is({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handleTouchEnd: e,
  handleTouchMove: s,
  handleTouchStart: c,
  handleZoomChange: d,
  hiddenCompanyCount: f,
  latestCompany: u,
  minZoom: m,
  maxZoom: g,
  maxDays: w,
  maxSummaryQuietDays: y,
  modelExplorer: x,
  monthTicks: M,
  onCompanyHide: L,
  onCompanyMove: X,
  onDismissArticle: ee,
  onModelSelect: G,
  onResetCamera: oe,
  onShowHiddenCompanies: J,
  onToggleTimelineGrid: E,
  processedCompanies: I,
  renderWindow: Y,
  scrollContainerRef: P,
  showTimelineGrid: O,
  timelineStartDay: j,
  timelineWidth: Z,
  viewport: W,
  worldRef: ce,
  yearTicks: q,
  zoom: he
}) {
  var be;
  const R = st(!0, 1), C = Zt(I, !0, 1), A = Qt({
    compact: !0,
    currentGlobalDay: r,
    maxDays: w,
    summaryCount: I.length,
    timelineStartDay: j,
    timelineHeight: C,
    timelineWidth: Z,
    viewport: W
  }), v = At(I, !0, 1, R), [D, S] = Te(null), U = (B) => S(B), re = () => S(null), te = v.find((B) => B.company.id === D) ?? null, Q = Math.max(16, Math.min(126, Math.max(16, W.width - 248 - 12))), H = te ? ue(
    (A.timelineY + te.y + te.height / 2 - n.y) * he,
    98,
    Math.max(98, W.height - 104)
  ) : 0, z = Je(), V = a.isDefault ? z.defaultBoardDescription : a.isEmpty ? z.emptyBoardDetail : a.isComposite ? z.compositeBoardDescriptionMobile(a.label) : z.singleBoardDescriptionMobile(a.label), se = A.timelineX + j * ke, me = Z + ht;
  return /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ i("div", { "data-timeline-presentation-hide": !0, className: "absolute left-3 top-3 z-40 [--category-expanded-width:min(20rem,calc(100vw-5rem))]", children: x }),
    /* @__PURE__ */ i(
      "div",
      {
        ref: P,
        className: "absolute inset-0 touch-none overflow-hidden [overflow-anchor:none]",
        onClickCapture: (B) => ee(B.target, { clientX: B.clientX, clientY: B.clientY }),
        onClick: (B) => {
          const De = B.target;
          De instanceof Element && (De.closest("[data-row-focus-band], [data-row-focus-label], button, a, input, label, select, textarea") || re());
        },
        onTouchCancel: e,
        onTouchEnd: e,
        onTouchMove: s,
        onTouchStart: c,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: ce,
            className: "relative",
            style: {
              height: `${A.worldHeight}px`,
              transform: Xa(n, he),
              transformOrigin: "0 0",
              width: `${A.worldWidth}px`,
              "--map-zoom": String(Ua(he))
            },
            children: [
              /* @__PURE__ */ h(
                xe.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.7rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.86)] p-5 shadow-[var(--panel-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${A.contentCards.intro.x}px`,
                    top: `${A.contentCards.intro.y}px`,
                    width: `${A.contentCards.intro.width}px`
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ i("h1", { className: "mt-3 max-w-sm text-[2.25rem] leading-none tracking-tighter text-[var(--ink)]", children: z.primaryHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-4 text-sm leading-6 text-[var(--ink-soft)]", children: V })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                xe.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.25rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.78)] p-4 shadow-[var(--soft-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${A.contentCards.notes.x}px`,
                    top: `${A.contentCards.notes.y}px`,
                    width: `${A.contentCards.notes.width}px`,
                    "--border-sheen-delay": "2.8s"
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: z.timelineNotesHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-3 text-xs leading-5 text-[var(--ink-soft)]", children: z.timelineInteractionNoteMobile })
                  ]
                }
              ),
              /* @__PURE__ */ i(
                xe.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${C}px`,
                    left: `${se}px`,
                    top: `${A.timelineY}px`,
                    width: `${me}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ i(
                      Nr,
                      {
                        activeCompanyId: D,
                        compact: !0,
                        onCompanyFocus: U,
                        onCompanyTap: U,
                        railWidth: ht,
                        rowLayouts: v,
                        timelineWidth: Z
                      }
                    ),
                    I.length === 0 ? /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-[196px] right-0 top-0 z-20 flex items-center justify-center px-3", children: /* @__PURE__ */ i(
                      Mr,
                      {
                        boardView: a,
                        hiddenCompanyCount: f,
                        onShowHiddenCompanies: J
                      }
                    ) }) : null,
                    /* @__PURE__ */ i(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${me}px` },
                        children: /* @__PURE__ */ i("div", { style: { paddingLeft: `${ht}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${Z}px`, minHeight: `${C}px` },
                            children: [
                              O ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                M.map((B) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${Be(B.days, j)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-9 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.16em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: Ve(9),
                                        children: B.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-month-${B.days}`
                                )),
                                q.map((B) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${Be(B.days, j)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1 font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: Ve(10),
                                        children: B.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-year-${B.label}`
                                )),
                                /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${Be(r, j)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1.5 font-semibold uppercase tracking-[0.16em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: Ve(10),
                                        children: z.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              I.length > 0 ? /* @__PURE__ */ i(
                                xe.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${R.companyGap}px`,
                                    paddingBottom: `${R.bottomPadding}px`,
                                    paddingTop: `${R.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ i(Ge, { initial: !1, mode: "popLayout", children: I.map((B, De) => /* @__PURE__ */ i(
                                    wr,
                                    {
                                      activeArticleSlug: t,
                                      compact: !0,
                                      company: B,
                                      companyIndex: De,
                                      currentGlobalDay: r,
                                      maxDays: w,
                                      onCompanyFocus: U,
                                      onModelSelect: G,
                                      renderWindow: Y,
                                      timelineStartDay: j,
                                      verticalScale: 1
                                    },
                                    B.id
                                  )) })
                                }
                              ) : null,
                              /* @__PURE__ */ i("div", { "aria-hidden": "true", className: "timeline-tail-fade timeline-tail-fade--compact" })
                            ]
                          }
                        ) })
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ h(
                xe.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${A.contentCards.latest.x}px`,
                    top: `${A.contentCards.latest.y}px`,
                    width: `${A.contentCards.latest.width}px`
                  },
                  children: [
                    /* @__PURE__ */ h("p", { className: "text-xs leading-5 text-[var(--ink-soft)]", children: [
                      z.latestMobileLabel,
                      ": ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: (u == null ? void 0 : u.name) ?? z.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: ((be = u == null ? void 0 : u.latestRelease) == null ? void 0 : be.name) ?? z.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ i("p", { className: "mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: z.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                xe.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.68, delay: 0.24, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${A.contentCards.summaries.x}px`,
                    top: `${A.contentCards.summaries.y}px`,
                    width: `${A.contentCards.summaries.width}px`
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]", children: z.recencyHeading }),
                    /* @__PURE__ */ i("div", { className: "grid gap-3 sm:grid-cols-2", children: /* @__PURE__ */ i(Ge, { initial: !1, mode: "popLayout", children: I.map((B, De) => /* @__PURE__ */ i(
                      Tr,
                      {
                        compact: !0,
                        company: B,
                        currentGlobalDay: r,
                        index: De,
                        maxSummaryQuietDays: y
                      },
                      B.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(Ge, { children: te ? /* @__PURE__ */ i(Rt.Fragment, { children: /* @__PURE__ */ i(
      Dr,
      {
        compact: !0,
        onClearFocus: re,
        onCompanyHide: L,
        onCompanyMove: X,
        row: te,
        rowCount: v.length,
        screenX: Q,
        screenY: H
      }
    ) }, `${te.company.id}-mobile-focus-label`) : null }),
    /* @__PURE__ */ i(
      xr,
      {
        compact: !0,
        className: "right-1 top-1/2 -translate-y-1/2",
        maxZoom: g,
        minZoom: m,
        onZoomChange: d,
        zoom: he
      }
    ),
    /* @__PURE__ */ h("div", { "data-timeline-presentation-hide": !0, className: "absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        vt,
        {
          label: O ? z.timelineGridHideLabel : z.timelineGridShowLabel,
          onClick: E,
          pressed: O,
          children: [
            O ? /* @__PURE__ */ i(Wn, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ i(Hn, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ i("span", { className: "sr-only", children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(vt, { label: z.resetCameraLabel, onClick: oe, children: [
        /* @__PURE__ */ i(Jt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { className: "sr-only", children: "Reset" })
      ] }),
      f > 0 ? /* @__PURE__ */ h(vt, { label: z.showHiddenLabel, onClick: J, children: [
        /* @__PURE__ */ i(ot, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { className: "sr-only", children: z.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function Xs({ controllerRef: t, definition: a, presentation: n = !1 }) {
  xi(a);
  const [r, e] = Te(() => oo()), [s, c] = Te(() => so()), [d, f] = Te(
    () => lo()
  ), [u, m] = Te(!1), [g, w] = Te(
    () => typeof window > "u" ? !0 : window.matchMedia("(min-width: 768px)").matches
  ), [y, x] = Te(Vt), [M, L] = Te(Gt), [X, ee] = Te(!1), [G, oe] = Te(!1), [J, E] = Te(!0), [I, Y] = Te([]), [P, O] = Te(() => ze().map((o) => o.id)), [j, Z] = Te({ x: 0, y: 0 }), [W, ce] = Te({ x: 0, y: 0 }), [q, he] = Te(() => io()), N = ne(Vt), R = ne(Gt), C = ne({ x: 0, y: 0 }), A = ne({ x: 0, y: 0 }), v = ne({
    complete: null,
    frameId: null,
    lastFrameAt: null,
    stiffness: at,
    target: {
      camera: { x: 0, y: 0 },
      zoom: Vt
    },
    zoomAnchor: null
  }), D = ne({
    complete: null,
    frameId: null,
    lastFrameAt: null,
    stiffness: at,
    target: {
      camera: { x: 0, y: 0 },
      zoom: Gt
    },
    zoomAnchor: null
  }), S = ne(null), U = ne(null), re = ne(null), te = ne(null), de = ne(null), Q = ne(null), H = ne(null), z = ne(null), V = ne(!1), se = ne(!1), me = ne(null), be = ne(null), B = ne(!1), De = ne(null), et = ne(() => {
  }), fe = ne(null), Ue = ne(null), le = ne({
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0
  });
  ne(/* @__PURE__ */ new Map());
  const Pe = ne(null), [K, sa] = Te({
    desktop: { height: 0, width: 0 },
    mobile: { height: 0, width: 0 }
  }), lt = Je(), ge = q.kind === "model" ? q.slug : null, Ce = ge ? pe().articleIndexBySlug[ge] ?? null : null, qe = q.kind === "model", T = (we(() => /* @__PURE__ */ new Date(), []).getTime() - rt().getTime()) / it, $ = we(() => xo(r), [r]), k = we(
    () => ia(ze(), r),
    [r]
  ), ae = we(
    () => Do(k, P, I, s, T),
    [P, s, T, I, k]
  ), Se = we(
    () => Co(ae, d, Ce == null ? void 0 : Ce.companyId),
    [Ce == null ? void 0 : Ce.companyId, ae, d]
  ), Ie = we(
    () => Se.map((o) => o.id),
    [Se]
  ), Fe = we(() => {
    const o = new Set(I);
    return k.filter((l) => o.has(l.id)).length;
  }, [I, k]), Xe = we(() => wo(ze(), r), [r]), yt = we(() => To(ze(), r), [r]), tt = we(() => Eo(ze(), r), [r]), Ee = we(
    () => So(Se, T),
    [T, Se]
  ), la = Math.max(Math.ceil(T) + 36, Ee.latestGlobalDay + 36, 720), za = Math.max(la * ke, 1), wt = Rn(K.desktop.width, pt, za), St = Rn(K.mobile.width, ht, za), Ba = Nn({
    camera: j,
    minimumDays: la,
    viewport: K.desktop,
    zoom: y
  }), Oa = Nn({
    camera: W,
    compact: !0,
    minimumDays: la,
    viewport: K.mobile,
    zoom: M
  }), It = Ba.endDay, kt = Ba.startDay, Lt = Oa.endDay, _t = Oa.startDay, ca = Math.max(Kt(kt, It), 1), da = Math.max(
    Kt(_t, Lt),
    1
  ), Cr = we(
    () => Mn({
      camera: j,
      viewport: K.desktop,
      zoom: y
    }),
    [j, K.desktop, y]
  ), Rr = we(
    () => Mn({
      camera: W,
      compact: !0,
      viewport: K.mobile,
      zoom: M
    }),
    [W, M, K.mobile]
  ), ua = 1, ma = 1, Pt = Zt(Ee.processedCompanies, !1, ua), Ft = Zt(Ee.processedCompanies, !0, ma), Wa = we(
    () => qt({
      camera: j,
      futureBufferDays: wn,
      pastBufferDays: yn,
      viewport: K.desktop,
      zoom: y
    }),
    [j, K.desktop, y]
  ), Ha = we(
    () => qt({
      camera: W,
      compact: !0,
      futureBufferDays: wn,
      pastBufferDays: yn,
      viewport: K.mobile,
      zoom: M
    }),
    [W, M, K.mobile]
  ), { monthTicks: Ar, yearTicks: Sr } = we(() => En(Wa), [Wa]), { monthTicks: Ir, yearTicks: kr } = we(
    () => En(Ha),
    [Ha]
  ), Va = we(() => [...Ee.processedCompanies].filter((o) => o.latestRelease).sort((o, l) => {
    var p, b;
    return (((p = l.latestRelease) == null ? void 0 : p.globalDay) ?? 0) - (((b = o.latestRelease) == null ? void 0 : b.globalDay) ?? 0);
  })[0] ?? null, [Ee.processedCompanies]), Tt = we(() => Ee.processedCompanies, [Ee.processedCompanies]), Ga = we(() => Tt.reduce((o, l) => {
    const p = La(l, T);
    return Math.max(o, p);
  }, 0), [T, Tt]), Ke = we(
    () => Qt({
      currentGlobalDay: T,
      maxDays: It,
      summaryCount: Tt.length,
      timelineStartDay: kt,
      timelineHeight: Pt,
      timelineWidth: ca,
      viewport: K.desktop
    }),
    [
      T,
      Pt,
      It,
      Tt.length,
      kt,
      ca,
      K.desktop
    ]
  ), Ze = we(
    () => Qt({
      compact: !0,
      currentGlobalDay: T,
      maxDays: Lt,
      summaryCount: Ee.processedCompanies.length,
      timelineStartDay: _t,
      timelineHeight: Ft,
      timelineWidth: da,
      viewport: K.mobile
    }),
    [
      T,
      Lt,
      _t,
      Ft,
      da,
      Ee.processedCompanies.length,
      K.mobile
    ]
  );
  Ae(() => {
    const o = window.setTimeout(() => oe(!0), 120);
    return () => window.clearTimeout(o);
  }, []), Ae(() => {
    const o = () => {
      const l = window.location.hash;
      he(cr(l)), e(dr(l)), c(ur(l)), f(mr(l));
    };
    return o(), window.addEventListener("hashchange", o), () => window.removeEventListener("hashchange", o);
  }, []), Ae(() => {
    if (n)
      return;
    const o = ya({
      companySortMode: s,
      filterState: r,
      route: q,
      significanceDisplayLimit: d
    });
    window.location.hash !== o && window.history.replaceState(null, "", o);
  }, [s, r, n, q, d]), Ae(() => () => {
    var o, l, p, b, F;
    (o = fe.current) == null || o.call(fe), v.current.frameId !== null && window.cancelAnimationFrame(v.current.frameId), (p = (l = v.current).complete) == null || p.call(l, "cancelled"), D.current.frameId !== null && window.cancelAnimationFrame(D.current.frameId), (F = (b = D.current).complete) == null || F.call(b, "cancelled");
  }, []), Ae(() => {
    Ce && (e((o) => {
      const l = Ei(Ce.presets), p = We(Ce.presets, nt()), b = Oe({
        ...o,
        attributeIds: We([...o.attributeIds, ...p], nt()),
        companyIds: o.companyIds.length > 0 && !o.companyIds.includes(Ce.companyId) ? [...o.companyIds, Ce.companyId] : o.companyIds,
        domainIds: l.length > 0 ? We([...o.domainIds, ...l], je()) : o.domainIds
      });
      return Jn(o, b) ? o : b;
    }), Y((o) => o.filter((l) => l !== Ce.companyId)));
  }, [Ce]), Ae(() => {
    const o = new Set(tt.map((l) => l.id));
    e((l) => {
      const p = l.companyIds.filter((b) => o.has(b));
      return p.length === l.companyIds.length ? l : { ...l, companyIds: p };
    });
  }, [tt]), Ae(() => {
    const o = window.matchMedia("(min-width: 768px)"), l = () => w(o.matches);
    return l(), o.addEventListener("change", l), () => o.removeEventListener("change", l);
  }, []), Ae(() => {
    const o = () => {
      var p, b, F, ie;
      sa({
        desktop: {
          height: ((p = S.current) == null ? void 0 : p.clientHeight) ?? window.innerHeight,
          width: ((b = S.current) == null ? void 0 : b.clientWidth) ?? window.innerWidth
        },
        mobile: {
          height: ((F = U.current) == null ? void 0 : F.clientHeight) ?? window.innerHeight,
          width: ((ie = U.current) == null ? void 0 : ie.clientWidth) ?? window.innerWidth
        }
      });
    };
    o();
    const l = window.requestAnimationFrame(o);
    return window.addEventListener("resize", o), () => {
      window.cancelAnimationFrame(l), window.removeEventListener("resize", o);
    };
  }, [g, G]), Ae(() => {
    if (V.current)
      return;
    const o = () => {
      if (V.current || !S.current || S.current.clientWidth === 0)
        return;
      const p = dt(Ke);
      C.current = p.camera, v.current.target = p, Ut(p.zoom, p.camera), V.current = !0;
    };
    if (o(), !V.current)
      return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, [Ke, K.desktop, y]), Ae(() => {
    if (se.current)
      return;
    const o = () => {
      if (se.current || !U.current || U.current.clientWidth === 0)
        return;
      const p = dt(Ze, !0);
      A.current = p.camera, D.current.target = p, Xt(p.zoom, p.camera), se.current = !0;
    };
    if (o(), !se.current)
      return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, [Ze, M, K.mobile]);
  const Lr = (o) => {
    e((l) => {
      const p = l.domainIds.includes(o) ? l.domainIds.filter((b) => b !== o) : We([...l.domainIds, o], je());
      return Oe({ ...l, companyIds: [], domainIds: p });
    });
  }, _r = (o) => {
    e((l) => {
      const p = l.attributeIds.includes(o) ? l.attributeIds.filter((b) => b !== o) : We([...l.attributeIds, o], nt());
      return Oe({ ...l, attributeIds: p, companyIds: [] });
    });
  }, Pr = (o) => {
    e((l) => Oe({ ...l, companyIds: [], contentType: o }));
  }, Fr = (o) => {
    e((l) => {
      const p = l.companyIds.length === 0 ? [o] : l.companyIds.includes(o) ? l.companyIds.filter((b) => b !== o) : [...l.companyIds, o];
      return Oe({ ...l, companyIds: p });
    });
  }, $r = () => {
    e((o) => ({ ...o, companyIds: [] }));
  }, Ur = () => {
    e(bt()), c(aa()), f(na()), Y([]), O(ze().map((o) => o.id));
  }, Xr = () => {
    e({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: [...je()]
    });
  }, Yr = () => {
    e({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: []
    });
  }, ja = (o) => {
    Y((l) => l.includes(o) ? l : [...l, o]);
  }, qa = () => {
    Y([]);
  }, Ka = fn(() => {
    E((o) => !o);
  }, []), Za = (o, l) => {
    O((p) => Ao(p, Ie, o, l));
  }, Qa = () => {
    window.location.hash = ya({
      companySortMode: s,
      filterState: r,
      route: { kind: "timeline" },
      significanceDisplayLimit: d
    });
  }, $t = (o) => {
    window.location.hash = ya({
      companySortMode: s,
      filterState: r,
      route: { kind: "model", slug: o },
      significanceDisplayLimit: d
    });
  }, fa = () => {
    q.kind === "model" && (be.current = null, Qa());
  }, Ja = (o, l) => {
    if (B.current) {
      B.current = !1;
      return;
    }
    wa(
      o,
      ge,
      fa,
      l
    );
  }, en = {
    attributeStats: yt,
    boardView: $,
    companySortMode: s,
    companyOptions: tt,
    domainStats: Xe,
    filterState: r,
    isOpen: u,
    onAttributeToggle: _r,
    onClearAll: Yr,
    onClearCompanyFilter: $r,
    onCompanyToggle: Fr,
    onCompanySortModeChange: c,
    onContentTypeChange: Pr,
    onDomainToggle: Lr,
    onReset: Ur,
    onSelectAll: Xr,
    onSignificanceDisplayLimitChange: f,
    onToggle: () => m((o) => !o),
    significanceDisplayLimit: d,
    totalMatchedCompanyCount: ae.length,
    visibleCompanyCount: Se.length
  }, Ut = (o, l) => {
    N.current = o, C.current = l, Wt(re.current, l, o), x(o), Z(l);
  }, Xt = (o, l) => {
    R.current = o, A.current = l, Wt(te.current, l, o), L(o), ce(l);
  }, tn = (o) => {
    var Ye;
    const l = v.current, p = l.lastFrameAt === null ? 1 / 60 : ue((o - l.lastFrameAt) / 1e3, 0, 0.064);
    l.lastFrameAt = o;
    const { target: b, zoomAnchor: F } = l, ie = 1 - Math.exp(-l.stiffness * p), ve = mt(N.current, b.zoom, ie), ye = F ? ut(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      ve
    ) : {
      x: mt(C.current.x, b.camera.x, ie),
      y: mt(C.current.y, b.camera.y, ie)
    };
    Ut(ve, ye);
    const Re = Math.hypot(b.camera.x - ye.x, b.camera.y - ye.y), Ne = Math.abs(b.zoom - ve);
    if (Re > vn || Ne > xn) {
      l.frameId = window.requestAnimationFrame(tn);
      return;
    }
    l.frameId = null, l.lastFrameAt = null;
    const Me = F ? ut(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      b.zoom
    ) : b.camera;
    l.zoomAnchor = null, Ut(b.zoom, Me), (Ye = l.complete) == null || Ye.call(l, "completed"), l.complete = null;
  }, an = (o) => {
    var Ye;
    const l = D.current, p = l.lastFrameAt === null ? 1 / 60 : ue((o - l.lastFrameAt) / 1e3, 0, 0.064);
    l.lastFrameAt = o;
    const { target: b, zoomAnchor: F } = l, ie = 1 - Math.exp(-l.stiffness * p), ve = mt(R.current, b.zoom, ie), ye = F ? ut(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      ve
    ) : {
      x: mt(A.current.x, b.camera.x, ie),
      y: mt(A.current.y, b.camera.y, ie)
    };
    Xt(ve, ye);
    const Re = Math.hypot(b.camera.x - ye.x, b.camera.y - ye.y), Ne = Math.abs(b.zoom - ve);
    if (Re > vn || Ne > xn) {
      l.frameId = window.requestAnimationFrame(an);
      return;
    }
    l.frameId = null, l.lastFrameAt = null;
    const Me = F ? ut(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      b.zoom
    ) : b.camera;
    l.zoomAnchor = null, Xt(b.zoom, Me), (Ye = l.complete) == null || Ye.call(l, "completed"), l.complete = null;
  }, Yt = (o, l) => {
    var b;
    const p = v.current;
    return (b = p.complete) == null || b.call(p, "cancelled"), p.target = o, p.stiffness = (l == null ? void 0 : l.stiffness) ?? at, l ? p.zoomAnchor = l.zoomAnchor ?? null : p.zoomAnchor = null, new Promise((F) => {
      p.complete = F, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(tn));
    });
  }, zt = (o, l) => {
    var b;
    const p = D.current;
    return (b = p.complete) == null || b.call(p, "cancelled"), p.target = o, p.stiffness = (l == null ? void 0 : l.stiffness) ?? at, l ? p.zoomAnchor = l.zoomAnchor ?? null : p.zoomAnchor = null, new Promise((F) => {
      p.complete = F, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(an));
    });
  }, pa = fn(
    (o, l) => {
      const p = !g, b = p ? K.mobile : K.desktop;
      if (b.width <= 0 || b.height <= 0)
        return Promise.resolve("unavailable");
      const F = p ? Ze : Ke, ie = p ? Ft : Pt, ve = gr(
        o,
        Ee.processedCompanies,
        F,
        ie,
        p,
        1
      );
      if (!ve)
        return Promise.resolve("unavailable");
      const ye = Wo(b, p, qe), Re = qe && !p ? Ho(b, ye) : sr, Ne = Vo({
        anchor: Re,
        bounds: ve,
        focusMaxZoom: Math.min(
          (l == null ? void 0 : l.maxZoom) ?? (p ? ao : to),
          p ? Bt : Mt
        ),
        insets: ye,
        layout: F,
        maxZoom: p ? Bt : Mt,
        minZoom: p ? St : wt,
        viewport: b
      });
      if (!Ne)
        return Promise.resolve("unavailable");
      const Me = {
        stiffness: (l == null ? void 0 : l.stiffness) ?? (o.kind === "slug" ? Ki : at)
      };
      return p ? zt(Ne, Me) : Yt(Ne, Me);
    },
    [
      Ke,
      wt,
      Pt,
      qe,
      g,
      Ze,
      St,
      Ft,
      Ee.processedCompanies,
      K.desktop,
      K.mobile
    ]
  ), nn = (o) => ([v.current, D.current].forEach((l) => {
    var p;
    l.frameId !== null && window.cancelAnimationFrame(l.frameId), (p = l.complete) == null || p.call(l, "cancelled"), l.complete = null, l.frameId = null, l.lastFrameAt = null, l.zoomAnchor = null;
  }), o.filterState && e(Oe(o.filterState)), o.companySortMode !== void 0 && c(o.companySortMode), o.significanceDisplayLimit !== void 0 && f(o.significanceDisplayLimit), o.hiddenCompanyIds && Y([...o.hiddenCompanyIds]), o.companyOrderIds && O(oa(o.companyOrderIds)), o.route && (he(o.route), be.current = null), o.showTimelineGrid !== void 0 && E(o.showTimelineGrid), (o.desktopCamera || o.desktopZoom !== void 0) && Ut(
    o.desktopZoom ?? N.current,
    o.desktopCamera ?? C.current
  ), (o.mobileCamera || o.mobileZoom !== void 0) && Xt(
    o.mobileZoom ?? R.current,
    o.mobileCamera ?? A.current
  ), new Promise((l) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => l()));
  }));
  Qr(
    t,
    () => ({
      cancelFocus() {
        [v.current, D.current].forEach((o) => {
          var l;
          o.frameId !== null && window.cancelAnimationFrame(o.frameId), (l = o.complete) == null || l.call(o, "cancelled"), o.complete = null, o.frameId = null, o.lastFrameAt = null, o.zoomAnchor = null;
        });
      },
      focus(o, l) {
        return o.kind === "default" ? g ? Yt(dt(Ke), { stiffness: l == null ? void 0 : l.stiffness }) : zt(dt(Ze, !0), { stiffness: l == null ? void 0 : l.stiffness }) : pa(o, l);
      },
      getState() {
        return {
          companyOrderIds: [...P],
          companySortMode: s,
          desktopCamera: { ...C.current },
          desktopZoom: N.current,
          filterState: {
            ...r,
            attributeIds: [...r.attributeIds],
            companyIds: [...r.companyIds],
            domainIds: [...r.domainIds]
          },
          hiddenCompanyIds: [...I],
          mobileCamera: { ...A.current },
          mobileZoom: R.current,
          route: { ...q },
          showTimelineGrid: J,
          significanceDisplayLimit: d
        };
      },
      restoreState(o) {
        return nn(o);
      },
      setState(o) {
        return nn(o);
      }
    }),
    [
      P,
      s,
      t,
      Ke,
      r,
      I,
      g,
      pa,
      Ze,
      q,
      J,
      d
    ]
  ), Ae(() => {
    if (!qe || !ge) {
      qe || (be.current = null);
      return;
    }
    if (!g) {
      be.current = ge;
      return;
    }
    !G || X || me.current !== null || (g ? K.desktop : K.mobile).width <= 0 || be.current !== ge && Ya(Ee.processedCompanies, ge) && (pa({ kind: "slug", slug: ge }), be.current = ge);
  }, [
    ge,
    qe,
    g,
    X,
    G,
    Ee.processedCompanies,
    K.desktop,
    K.mobile
  ]), Ae(() => {
    const o = (l) => {
      const p = Bo(l.key);
      if (n || !p || Oo(l) || !G)
        return;
      const b = !g, F = b ? K.mobile : K.desktop;
      if (F.width <= 0 || F.height <= 0)
        return;
      const ie = b ? Ze : Ke, ve = b ? ma : ua, ye = Xo(
        Ee.processedCompanies,
        ie,
        b,
        ve
      );
      if (ye.length === 0)
        return;
      const Re = b ? A.current : C.current, Ne = b ? R.current : N.current, Me = Yo(
        Ee.processedCompanies,
        ie,
        b,
        ve,
        ge,
        Re,
        Ne,
        F
      ), Ye = zo(Me, ye, p, {
        excludeSlug: ge,
        minPrimaryDistance: ge ? hr : 0
      });
      !Ye || Ye.slug === ge || (l.preventDefault(), be.current = null, $t(Ye.slug));
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, [
    ge,
    Ke,
    g,
    G,
    Ze,
    ma,
    ua,
    n,
    Ee.processedCompanies,
    K.desktop,
    K.mobile
  ]);
  const zr = () => {
    var l;
    const o = v.current;
    (l = o.complete) == null || l.call(o, "cancelled"), o.complete = null, o.frameId !== null && (window.cancelAnimationFrame(o.frameId), o.frameId = null), o.lastFrameAt = null, o.target = {
      camera: C.current,
      zoom: N.current
    }, o.stiffness = at, o.zoomAnchor = null;
  }, Br = () => {
    var l;
    const o = D.current;
    (l = o.complete) == null || l.call(o, "cancelled"), o.complete = null, o.frameId !== null && (window.cancelAnimationFrame(o.frameId), o.frameId = null), o.lastFrameAt = null, o.target = {
      camera: A.current,
      zoom: R.current
    }, o.stiffness = at, o.zoomAnchor = null;
  }, Or = () => {
    const o = S.current;
    de.current = ((o == null ? void 0 : o.clientWidth) ?? K.desktop.width) / 2, Q.current = ((o == null ? void 0 : o.clientHeight) ?? K.desktop.height) / 2, Yt(dt(Ke));
  }, Wr = () => {
    const o = U.current;
    H.current = ((o == null ? void 0 : o.clientWidth) ?? K.mobile.width) / 2, z.current = ((o == null ? void 0 : o.clientHeight) ?? K.mobile.height) / 2, zt(dt(Ze, !0));
  }, rn = (o, l) => {
    const p = S.current, b = K.desktop, F = ue(
      (l == null ? void 0 : l.x) ?? de.current ?? ((p == null ? void 0 : p.clientWidth) ?? b.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? b.width
    ), ie = ue(
      (l == null ? void 0 : l.y) ?? Q.current ?? ((p == null ? void 0 : p.clientHeight) ?? b.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? b.height
    ), ve = v.current, ye = N.current, Re = Number(ue(o(ye), wt, Mt).toFixed(3));
    if (Re === ye)
      return;
    const Ne = Cn({
      anchorX: F,
      anchorY: ie,
      camera: C.current,
      existingAnchor: ve.zoomAnchor,
      zoom: ye
    }), Me = ut(
      Ne.worldX,
      Ne.worldY,
      F,
      ie,
      Re
    );
    Yt(
      {
        camera: Me,
        zoom: Re
      },
      { zoomAnchor: Ne }
    );
  }, on = (o, l) => {
    const p = U.current, b = K.mobile, F = ue(
      (l == null ? void 0 : l.x) ?? H.current ?? ((p == null ? void 0 : p.clientWidth) ?? b.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? b.width
    ), ie = ue(
      (l == null ? void 0 : l.y) ?? z.current ?? ((p == null ? void 0 : p.clientHeight) ?? b.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? b.height
    ), ve = D.current, ye = R.current, Re = Number(ue(o(ye), St, Bt).toFixed(3));
    if (Re === ye)
      return;
    const Ne = Cn({
      anchorX: F,
      anchorY: ie,
      camera: A.current,
      existingAnchor: ve.zoomAnchor,
      zoom: ye
    }), Me = ut(
      Ne.worldX,
      Ne.worldY,
      F,
      ie,
      Re
    );
    zt(
      {
        camera: Me,
        zoom: Re
      },
      { zoomAnchor: Ne }
    );
  };
  et.current = (o) => {
    if (!S.current || o.deltaY === 0)
      return;
    o.cancelable && o.preventDefault();
    const l = S.current, p = l.getBoundingClientRect(), b = {
      x: ue(o.clientX - p.left, 0, l.clientWidth),
      y: ue(o.clientY - p.top, 0, l.clientHeight)
    };
    de.current = b.x, Q.current = b.y;
    const F = o.deltaMode === 1 ? o.deltaY * 16 : o.deltaMode === 2 ? o.deltaY * l.clientHeight : o.deltaY;
    rn(
      (ie) => Dt(ie, -F * ji, wt, Mt),
      b
    );
  }, Ae(() => {
    if (!G || !g)
      return;
    const o = S.current;
    if (!o)
      return;
    const l = (p) => et.current(p);
    return o.addEventListener("wheel", l, { passive: !1 }), () => {
      o.removeEventListener("wheel", l);
    };
  }, [g, G]);
  const Hr = (o) => {
    var F;
    if (o.pointerType !== "mouse" || o.button !== 0 || !S.current)
      return;
    const l = S.current, p = l.getBoundingClientRect();
    de.current = o.clientX - p.left, Q.current = o.clientY - p.top, zr(), B.current = !1, me.current = o.pointerId, le.current = {
      lastX: o.clientX,
      lastY: o.clientY,
      startX: o.clientX,
      startY: o.clientY
    }, l.setPointerCapture(o.pointerId), (F = fe.current) == null || F.call(fe);
    const b = (ie) => et.current(ie);
    window.addEventListener("wheel", b, { capture: !0, passive: !1 }), fe.current = () => {
      window.removeEventListener("wheel", b, !0);
    }, On(() => ee(!0)), o.preventDefault();
  }, sn = () => {
    if (De.current = null, !S.current)
      return;
    const o = Ue.current;
    if (!o || me.current === null)
      return;
    const p = S.current.getBoundingClientRect(), b = o.clientX - p.left;
    de.current = b, Q.current = o.clientY - p.top;
    const F = o.clientX - le.current.lastX, ie = o.clientY - le.current.lastY, ve = {
      x: C.current.x - F / Math.max(N.current, 1e-3),
      y: C.current.y - ie / Math.max(N.current, 1e-3)
    };
    v.current.target = {
      camera: ve,
      zoom: N.current
    }, C.current = ve, Wt(re.current, ve, N.current), le.current.lastX = o.clientX, le.current.lastY = o.clientY;
  }, Vr = (o) => {
    if (o.pointerType === "mouse" && S.current) {
      const l = S.current.getBoundingClientRect();
      de.current = ue(
        o.clientX - l.left,
        0,
        S.current.clientWidth
      ), Q.current = ue(
        o.clientY - l.top,
        0,
        S.current.clientHeight
      );
    }
    o.pointerId === me.current && (Ue.current = {
      clientX: o.clientX,
      clientY: o.clientY
    }, De.current === null && (De.current = window.requestAnimationFrame(sn)), o.preventDefault());
  }, Gr = (o) => {
    var p;
    if (o.pointerId !== me.current || !S.current)
      return;
    De.current !== null && (window.cancelAnimationFrame(De.current), De.current = null, sn()), S.current.hasPointerCapture(o.pointerId) && S.current.releasePointerCapture(o.pointerId), me.current = null, Ue.current = null, (p = fe.current) == null || p.call(fe), fe.current = null, Math.hypot(
      o.clientX - le.current.startX,
      o.clientY - le.current.startY
    ) > Tn ? B.current = !0 : wa(
      o.target,
      ge,
      fa,
      { clientX: o.clientX, clientY: o.clientY }
    ), Z(C.current), ee(!1);
  }, ln = (o, l) => Math.hypot(l.clientX - o.clientX, l.clientY - o.clientY), cn = (o, l) => ({
    clientX: (o.clientX + l.clientX) / 2,
    clientY: (o.clientY + l.clientY) / 2
  }), dn = (o, l) => {
    const p = l.getBoundingClientRect();
    H.current = ue(o.clientX - p.left, 0, l.clientWidth), z.current = ue(o.clientY - p.top, 0, l.clientHeight);
  }, un = (o, l) => {
    const p = {
      x: A.current.x - o / Math.max(R.current, 1e-3),
      y: A.current.y - l / Math.max(R.current, 1e-3)
    };
    D.current.target = {
      camera: p,
      zoom: R.current
    }, A.current = p, Wt(te.current, p, R.current);
  }, mn = (o) => o instanceof Element && !o.closest("[data-timeline-pin]") && !!o.closest("button, a, input, label, select, textarea, [data-row-focus-label]"), ct = (o) => ({
    clientX: o.clientX,
    clientY: o.clientY
  }), Et = (o) => {
    if (o.length === 0) {
      Pe.current = null, H.current = null, z.current = null;
      return;
    }
    if (o.length === 1) {
      const F = ct(o[0]);
      Pe.current = {
        distance: 0,
        lastMidpointX: F.clientX,
        lastMidpointY: F.clientY,
        lastX: F.clientX,
        lastY: F.clientY,
        startX: F.clientX,
        startY: F.clientY,
        type: "pan"
      };
      return;
    }
    const l = ct(o[0]), p = ct(o[1]), b = cn(l, p);
    Pe.current = {
      distance: Math.max(ln(l, p), 1),
      lastMidpointX: b.clientX,
      lastMidpointY: b.clientY,
      lastX: b.clientX,
      lastY: b.clientY,
      startX: b.clientX,
      startY: b.clientY,
      type: "pinch"
    };
  }, jr = (o) => {
    !U.current || mn(o.target) || (Br(), Et(o.touches));
  }, qr = (o) => {
    if (!U.current || mn(o.target))
      return;
    const l = U.current, p = Pe.current;
    if (!p) {
      Et(o.touches);
      return;
    }
    if (o.touches.length === 1) {
      const Me = ct(o.touches[0]);
      if (dn(Me, l), p.type === "pan") {
        const Ye = Me.clientX - p.lastX, Zr = Me.clientY - p.lastY;
        un(Ye, Zr), p.lastX = Me.clientX, p.lastY = Me.clientY;
      } else
        Et(o.touches);
      o.preventDefault();
      return;
    }
    if (o.touches.length < 2)
      return;
    const b = ct(o.touches[0]), F = ct(o.touches[1]), ie = cn(b, F), ve = Math.max(ln(b, F), 1);
    if (dn(ie, l), p.type !== "pinch") {
      Et(o.touches), o.preventDefault();
      return;
    }
    const ye = ie.clientX - p.lastMidpointX, Re = ie.clientY - p.lastMidpointY;
    un(ye, Re);
    const Ne = ue(ve / Math.max(p.distance, 1), 0.78, 1.28);
    on((Me) => Me * Ne, {
      x: H.current ?? l.clientWidth / 2,
      y: z.current ?? l.clientHeight / 2
    }), p.distance = ve, p.lastMidpointX = ie.clientX, p.lastMidpointY = ie.clientY, p.lastX = ie.clientX, p.lastY = ie.clientY, o.preventDefault();
  }, Kr = (o) => {
    const l = Pe.current;
    if (Et(o.touches), ce(A.current), !l || l.type !== "pan" || o.changedTouches.length === 0)
      return;
    const p = o.changedTouches[0];
    Math.hypot(p.clientX - l.startX, p.clientY - l.startY) > Tn || wa(
      p.target,
      ge,
      fa,
      { clientX: p.clientX, clientY: p.clientY }
    );
  };
  return ze().length === 0 ? /* @__PURE__ */ i(
    Bn,
    {
      title: lt.emptyDataTitle,
      detail: lt.emptyDataDetail
    }
  ) : Ee.invalidEntries.length > 0 ? /* @__PURE__ */ i(
    Bn,
    {
      title: lt.timelineStatusDataErrorTitle,
      detail: lt.timelineStatusDataErrorDetail(Ee.invalidEntries)
    }
  ) : G ? /* @__PURE__ */ h(
    "div",
    {
      "data-timeline-presentation": n ? "" : void 0,
      className: `relative isolate min-h-[100dvh] overflow-hidden bg-[var(--page-bg)] text-[var(--ink)] selection:bg-emerald-500/25 selection:text-[var(--ink)] ${n ? "pointer-events-none" : ""}`,
      children: [
        /* @__PURE__ */ i(Rs, {}),
        /* @__PURE__ */ h("div", { className: "relative z-10", children: [
          g ? null : /* @__PURE__ */ i("div", { className: "md:hidden", children: /* @__PURE__ */ i(
            Is,
            {
              activeArticleSlug: ge,
              boardView: $,
              camera: W,
              currentGlobalDay: T,
              handleTouchEnd: Kr,
              handleTouchMove: qr,
              handleTouchStart: jr,
              handleZoomChange: on,
              hiddenCompanyCount: Fe,
              latestCompany: Va,
              minZoom: St,
              maxZoom: Bt,
              maxDays: Lt,
              maxSummaryQuietDays: Ga,
              modelExplorer: /* @__PURE__ */ i(An, { ...en, variant: "rail" }),
              monthTicks: Ir,
              onCompanyHide: ja,
              onCompanyMove: Za,
              onDismissArticle: Ja,
              onModelSelect: $t,
              onResetCamera: Wr,
              onShowHiddenCompanies: qa,
              onToggleTimelineGrid: Ka,
              processedCompanies: Ee.processedCompanies,
              renderWindow: Rr,
              scrollContainerRef: U,
              showTimelineGrid: J,
              timelineStartDay: _t,
              timelineWidth: da,
              viewport: K.mobile,
              worldRef: te,
              yearTicks: kr,
              zoom: M
            }
          ) }),
          g ? /* @__PURE__ */ i("div", { className: "hidden md:block", children: /* @__PURE__ */ i(
            Ss,
            {
              activeArticleSlug: ge,
              boardView: $,
              camera: j,
              currentGlobalDay: T,
              handlePointerDown: Hr,
              handlePointerMove: Vr,
              handleZoomChange: rn,
              hiddenCompanyCount: Fe,
              isPanning: X,
              latestCompany: Va,
              maxDays: It,
              minZoom: wt,
              maxZoom: Mt,
              maxSummaryQuietDays: Ga,
              modelExplorer: /* @__PURE__ */ i(An, { ...en, variant: "rail" }),
              monthTicks: Ar,
              onCompanyHide: ja,
              onCompanyMove: Za,
              onDismissArticle: Ja,
              onModelSelect: $t,
              onResetCamera: Or,
              onShowHiddenCompanies: qa,
              onToggleTimelineGrid: Ka,
              processedCompanies: Ee.processedCompanies,
              renderWindow: Cr,
              scrollContainerRef: S,
              showTimelineGrid: J,
              stopPanning: Gr,
              summaryCompanies: Tt,
              timelineStartDay: kt,
              timelineWidth: ca,
              viewport: K.desktop,
              worldRef: re,
              yearTicks: Sr,
              zoom: y
            }
          ) }) : null
        ] }),
        /* @__PURE__ */ i(Ge, { children: qe && !n ? /* @__PURE__ */ i(
          xs,
          {
            entry: Ce,
            onBack: Qa,
            onNavigate: $t,
            requestedSlug: ge ?? ""
          }
        ) : null })
      ]
    }
  ) : /* @__PURE__ */ i(As, {});
}
export {
  gi as DAY_MS,
  Xs as TimelineExperience,
  Us as buildTimelineArticleIndex,
  vi as createTimelineItemSlug,
  Le as formatTimelineDate,
  qn as formatTimelineDateRange,
  Kn as getTimelineItemSlug,
  $s as indexTimelineArticles,
  _e as parseTimelineDate
};
