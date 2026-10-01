import { jsx as o, jsxs as g, Fragment as Tt } from "react/jsx-runtime";
import _t, { useState as Me, useRef as re, useMemo as Ee, useEffect as Re, useCallback as Mn, useImperativeHandle as gi, useLayoutEffect as ar } from "react";
import { flushSync as nr } from "react-dom";
import { EyeOff as rr, Eye as ir, RotateCcw as ca, Layers3 as st, ArrowLeft as vi, CalendarDays as da, BookOpen as or, ExternalLink as xi, ArrowUp as bi, ArrowDown as yi, X as lr, SlidersHorizontal as wi, ChevronDown as Ti, ArrowRight as Mi, Sparkles as Ei, Check as Ni, BrainCircuit as Di, Globe2 as Ci, Image as Ai, Clapperboard as sr, AudioLines as Ri, Box as Si, Code2 as Ii, Bot as ki, CarFront as Li } from "lucide-react";
import { AnimatePresence as je, motion as we } from "motion/react";
const cr = 1e3 * 60 * 60 * 24;
function _i(t, a, n, r) {
  const e = (l) => l.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${e(t)}-${e(a)}-${e(n)}-${r}`;
}
function _e(t) {
  return /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
}
const En = /* @__PURE__ */ new Map();
function Ea(t, a) {
  const n = JSON.stringify(a);
  let r = En.get(n);
  return r || (r = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...a }), En.set(n, r)), r.format(t);
}
function Le(t, a = { month: "short", day: "numeric", year: "numeric" }, n = "day") {
  const r = typeof t == "string" ? _e(t) : t;
  return Number.isNaN(r.getTime()) ? typeof t == "string" ? t : "Date unavailable" : n === "year" ? Ea(r, { year: "numeric" }) : n === "month" ? Ea(r, { month: "short", year: "numeric" }) : Ea(r, a);
}
function dr(t, a, n = "day", r = "day") {
  if (!a || a === t)
    return Le(t, void 0, n);
  const e = _e(t), l = _e(a);
  if (Number.isNaN(e.getTime()) || Number.isNaN(l.getTime()))
    return `${t} - ${a}`;
  if (l.getTime() < e.getTime())
    return `${Le(t, void 0, n)} - ${Le(a, void 0, r)}`;
  if (n !== "day" || r !== "day")
    return `${Le(e, void 0, n)} - ${Le(l, void 0, r)}`;
  const c = e.getUTCFullYear() === l.getUTCFullYear();
  return c && e.getUTCMonth() === l.getUTCMonth() ? `${Le(e, { month: "short", day: "numeric" })}-${Le(l, { day: "numeric" })}, ${l.getUTCFullYear()}` : c ? `${Le(e, { month: "short", day: "numeric" })} - ${Le(l, { month: "short", day: "numeric", year: "numeric" })}` : `${Le(e)} - ${Le(l)}`;
}
function Pi(t, a = /* @__PURE__ */ new Date()) {
  const n = _e(t);
  if (Number.isNaN(n.getTime()))
    return null;
  const r = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()), e = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  return Math.round((e - r) / cr);
}
function Fi(t, a = /* @__PURE__ */ new Date()) {
  const n = Pi(t, a);
  return n === null ? null : n === 0 ? "Today" : n === 1 ? "1 day ago" : n === -1 ? "Tomorrow" : n > 1 ? `${n.toLocaleString("en-US")} days ago` : `in ${Math.abs(n).toLocaleString("en-US")} days`;
}
function $i(t, {
  date: a,
  eventKind: n,
  now: r
}) {
  const e = Fi(a, r);
  if (!e)
    return t;
  const l = n === "event" ? "Time since event" : "Time since release", c = { label: l, value: e }, d = t.findIndex((m) => m.label === l);
  if (d >= 0)
    return t.map((m, h) => h === d ? c : m);
  const f = n === "event" ? "Event date" : "Release date", u = t.findIndex((m) => m.label === f);
  return u === -1 ? [...t, c] : [...t.slice(0, u + 1), c, ...t.slice(u + 1)];
}
function ur(t, a, n) {
  return n.articleSlug ?? _i(t, a, n.name, n.date);
}
function fs(t) {
  return t.reduce((a, n) => (a[n.slug] = n, a), {});
}
function ps({
  articlesBySlug: t,
  eventTypesById: a,
  fallbackEventTypeId: n,
  groups: r
}) {
  const e = [];
  return r.forEach((l) => {
    l.productLines.forEach((c) => {
      const d = [...c.releases].sort(
        (u, m) => _e(u.date).getTime() - _e(m.date).getTime()
      ), f = d.map((u) => ur(l.id, c.id, u));
      d.forEach((u, m) => {
        var k, L;
        const h = f[m], b = a[u.eventType ?? n] ?? a[n], y = _e(u.date), v = u.endDate ? _e(u.endDate) : y, M = Number.isNaN(y.getTime()) || Number.isNaN(v.getTime()) ? 1 : Math.max(1, Math.round((v.getTime() - y.getTime()) / cr) + 1);
        e.push({
          accent: l.accent,
          article: t[h] ?? null,
          classes: u.classes ?? c.defaultClasses ?? l.defaultClasses ?? [c.classId],
          companyLogoMark: l.logoMark ?? "generic",
          companyId: l.id,
          companyName: l.name,
          date: u.date,
          dateLabel: Le(u.date, void 0, u.datePrecision),
          dateRangeLabel: dr(u.date, u.endDate, u.datePrecision),
          durationDays: M,
          endDate: u.endDate,
          endDateLabel: u.endDate ? Le(u.endDate) : void 0,
          eventKind: b.kind,
          eventType: b.id,
          eventTypeLabel: b.label,
          eventTypeShortLabel: b.shortLabel,
          name: u.name,
          nextName: ((k = d[m + 1]) == null ? void 0 : k.name) ?? null,
          nextSlug: f[m + 1] ?? null,
          presets: u.presets ?? c.defaultPresets ?? l.defaultPresets,
          tags: u.tags ?? c.defaultTags ?? [],
          previousName: ((L = d[m - 1]) == null ? void 0 : L.name) ?? null,
          previousSlug: f[m - 1] ?? null,
          productLineId: c.id,
          productLineLabel: c.label,
          productLineShortLabel: c.shortLabel,
          slug: h
        });
      });
    });
  }), e;
}
let Xa = null;
function Ui(t) {
  Xa = t;
}
function he() {
  if (!Xa)
    throw new Error("TimelineExperience requires a timeline definition before rendering.");
  return Xa;
}
function Oe() {
  return he().groups;
}
function Xi() {
  return he().facets;
}
function mr() {
  return he().filterGroups;
}
function qe() {
  return mr().flatMap((t) => t.domainIds);
}
function it() {
  return he().attributeFilterIds;
}
function Yi() {
  const t = he().defaultFilterState;
  return {
    attributeIds: [...t.attributeIds],
    companyIds: [...t.companyIds],
    contentType: t.contentType,
    domainIds: [...t.domainIds]
  };
}
function ua() {
  return he().contentTypeOptions;
}
function ma() {
  return he().defaultSortMode;
}
function fr() {
  return he().displayLimits;
}
function fa() {
  return he().defaultDisplayLimit;
}
function zi() {
  return he().eventTypes.reduce(
    (t, a) => (t[a.id] = a, t),
    {}
  );
}
function at() {
  return he().copy;
}
function ot() {
  return _e(he().startDate);
}
function ta(t, a) {
  if (t.length !== a.length)
    return !1;
  const n = new Set(a);
  return t.every((r) => n.has(r));
}
function Ve(t, a) {
  const n = new Set(t);
  return a.filter((r) => n.has(r));
}
function Mt() {
  return Yi();
}
function He(t) {
  const a = Oe().map((n) => n.id);
  return {
    attributeIds: Ve(t.attributeIds, it()),
    companyIds: Ve(t.companyIds, a),
    contentType: ua().some((n) => n.id === t.contentType) ? t.contentType : "all",
    domainIds: Ve(t.domainIds, qe())
  };
}
function pr(t, a) {
  return t.contentType === a.contentType && ta(t.attributeIds, a.attributeIds) && ta(t.companyIds, a.companyIds) && ta(t.domainIds, a.domainIds);
}
function aa(t) {
  return Xi().find((a) => a.id === t);
}
function Nn(t) {
  var a;
  return ((a = aa(t)) == null ? void 0 : a.label) ?? t;
}
function Bi(t) {
  return new Set(qe()).has(t);
}
function Oi(t) {
  return Ve(t.filter(Bi), qe());
}
function Na(t) {
  return t.join(",");
}
function Da(t, a) {
  if (!t)
    return [];
  const n = t.split(",").map((r) => r.trim()).filter(Boolean);
  return Ve(n, a);
}
function Dn(t) {
  return t.productLines.reduce((a, n) => {
    const r = n.releases.reduce((e, l) => {
      const c = _e(l.date).getTime();
      return Number.isNaN(c) ? e : Math.max(e, c);
    }, 0);
    return Math.max(a, r);
  }, 0);
}
function Wi(t) {
  var a, n;
  return ((n = (a = he().scoring) == null ? void 0 : a.getFacetSignificanceBase) == null ? void 0 : n.call(a, t)) ?? 50;
}
function Hi(t) {
  var a, n;
  return ((n = (a = he().scoring) == null ? void 0 : a.getEventTypeSignificanceBonus) == null ? void 0 : n.call(a, t)) ?? 0;
}
function Vi(t, a) {
  var e, l;
  const n = (l = (e = he().scoring) == null ? void 0 : e.getRecencySignificanceBonus) == null ? void 0 : l.call(
    e,
    t,
    a
  );
  if (n !== void 0)
    return n;
  const r = a - t;
  return r < 0 ? 2 : r <= 60 ? 12 : r <= 180 ? 9 : r <= 365 ? 6 : r <= 730 ? 3 : 0;
}
function hr(t, a, n, r) {
  var v, M, k, L;
  const e = _e(n.date), l = n.endDate ? _e(n.endDate) : e, c = Number.isNaN(l.getTime()) ? 0 : Math.round((l.getTime() - ot().getTime()) / lt), d = Wa(t, a, n), f = Ar(t, a, n), u = Ha(n), m = d.reduce(
    (G, j) => Math.max(G, Wi(j)),
    40
  ), h = ((M = (v = he().scoring) == null ? void 0 : v.getTagSignificanceBonus) == null ? void 0 : M.call(v, f)) ?? 0, b = ((L = (k = he().scoring) == null ? void 0 : k.getGroupRankBonus) == null ? void 0 : L.call(k, t)) ?? 0, y = m + h + b + Hi(u.id) + Vi(c, r);
  return ie(Math.round(y), 1, 100);
}
function Gi(t, a, n) {
  return a.releases.reduce(
    (r, e) => Math.max(r, hr(t, a, e, n)),
    0
  );
}
function Cn(t, a) {
  return t.productLines.reduce(
    (n, r) => Math.max(n, Gi(t, r, a)),
    0
  );
}
function ji(t, a, n) {
  const r = [...t];
  return a === "significance" ? (r.sort(
    (e, l) => Cn(l, n) - Cn(e, n) || (e.raceRank ?? 999) - (l.raceRank ?? 999) || e.name.localeCompare(l.name)
  ), r) : a === "latest" ? (r.sort(
    (e, l) => Dn(l) - Dn(e) || e.name.localeCompare(l.name)
  ), r) : (r.sort((e, l) => e.name.localeCompare(l.name)), r);
}
const lt = 1e3 * 60 * 60 * 24, Se = 2.24, Ba = [0.22, 1, 0.36, 1], Ue = { duration: 0.34, ease: Ba }, gr = { duration: 0.24, ease: Ba }, qi = { duration: 0.4, ease: Ba }, xt = 320, bt = 196, Zi = "#05070b", Ki = 72, Qi = 80, Ji = 56, eo = 60, to = 8, ao = 44, no = 32, ro = 96, io = 56, oo = 80, lo = 40, St = 1, It = 1.05, At = 4, Kt = 3.4, so = 420, co = 360, vr = 180, uo = 300, mo = 180, fo = 260, xr = 112, po = 380, Ca = 0.06, yt = 6, br = 0.92, ho = 25e-5, go = 0.025, rt = 18, vo = 8, An = 0.08, Rn = 6e-4, xo = 720, bo = 720, Sn = 540, yo = 120, In = 90, kn = 180, Aa = 420, Ra = 168, vt = 64, wo = 0.88, To = 1.65, Mo = 1.45, Ln = 6, Eo = {
  bottom: 48,
  left: 24,
  right: 24,
  top: 72
}, yr = 760, wr = 0.58, No = 0.58, Tr = { x: 0.5, y: 0.46 };
function Mr(t) {
  return t ? he().wideLogoMarks.includes(t) : !1;
}
function Oa(t) {
  return `${"/".endsWith("/") ? "/" : "//"}${t.replace(/^\/+/, "")}`;
}
function pa(t) {
  const a = t.replace(/^#\/?/, ""), n = a.indexOf("?"), r = n >= 0 ? a.slice(0, n) : a, e = n >= 0 ? a.slice(n + 1) : "";
  return {
    params: new URLSearchParams(e),
    path: r
  };
}
function Er(t) {
  const { path: a } = pa(t);
  if (!a)
    return { kind: "timeline" };
  const r = (he().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), e = a.match(new RegExp(`^(?:${r}|events)/([^/?#]+)$`));
  return e ? { kind: "model", slug: decodeURIComponent(e[1]) } : { kind: "timeline" };
}
function Nr(t) {
  const { params: a } = pa(t), n = a.get("ct"), r = Mt();
  return He({
    attributeIds: Da(a.get("a"), it()),
    companyIds: Da(a.get("co"), Oe().map((e) => e.id)),
    contentType: ua().some((e) => e.id === n) ? n : "all",
    domainIds: a.has("d") ? Da(a.get("d"), qe()) : r.domainIds
  });
}
function Dr(t) {
  const a = pa(t).params.get("sort");
  return a && he().sortOptions.some((n) => n.id === a) ? a : ma();
}
function Cr(t) {
  const a = pa(t).params.get("rows");
  if (a === "all")
    return "all";
  const n = Number.parseInt(a ?? "", 10);
  return fr().includes(n) ? n : fa();
}
function Sa({
  companySortMode: t,
  filterState: a,
  route: n,
  significanceDisplayLimit: r
}) {
  const e = He(a), l = Mt(), c = new URLSearchParams();
  ta(e.domainIds, l.domainIds) || c.set("d", Na(e.domainIds)), e.attributeIds.length > 0 && c.set("a", Na(e.attributeIds)), e.contentType !== l.contentType && c.set("ct", e.contentType), e.companyIds.length > 0 && c.set("co", Na(e.companyIds)), t !== ma() && c.set("sort", t), r !== fa() && c.set("rows", String(r));
  const d = he().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items", f = n.kind === "model" ? `/${d}/${encodeURIComponent(n.slug)}` : "/", u = c.toString().replaceAll("%2C", ",");
  return `#${f}${u ? `?${u}` : ""}`;
}
function Do() {
  return typeof window > "u" ? { kind: "timeline" } : Er(window.location.hash);
}
function Co() {
  return typeof window > "u" ? Mt() : Nr(window.location.hash);
}
function Ao() {
  return typeof window > "u" ? ma() : Dr(window.location.hash);
}
function Ro() {
  return typeof window > "u" ? fa() : Cr(window.location.hash);
}
function So(t) {
  return !(t instanceof Element) || t.closest(
    "button, a, input, label, select, textarea, [data-row-focus-label], [data-timeline-pin]"
  ) ? !1 : !!t.closest("[data-timeline-field]");
}
function Io(t, a) {
  if (a && typeof document < "u") {
    const n = document.elementFromPoint(a.clientX, a.clientY);
    if (n)
      return n;
  }
  return t;
}
function Ia(t, a, n, r) {
  if (!a)
    return;
  const e = Io(t, r);
  So(e) && n();
}
function ko(t, a) {
  return Le(t, a);
}
function ka(t, a, n) {
  const r = t.replace("#", ""), e = r.length === 3 ? r.split("").map((m) => `${m}${m}`).join("") : r, l = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e))
    return t;
  const c = Number.parseInt(e.slice(0, 2), 16), d = Number.parseInt(e.slice(2, 4), 16), f = Number.parseInt(e.slice(4, 6), 16), u = (m) => Math.round(m + (a - m) * l);
  return `rgb(${u(c)} ${u(d)} ${u(f)})`;
}
function Lo(t, a, n) {
  const r = (b) => {
    const y = b.replace("#", "");
    return y.length === 3 ? y.split("").map((v) => `${v}${v}`).join("") : y;
  }, e = r(t), l = r(a), c = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e) || !/^[0-9a-fA-F]{6}$/.test(l))
    return t;
  const d = [e.slice(0, 2), e.slice(2, 4), e.slice(4, 6)].map(
    (b) => Number.parseInt(b, 16)
  ), f = [l.slice(0, 2), l.slice(2, 4), l.slice(4, 6)].map(
    (b) => Number.parseInt(b, 16)
  ), [u, m, h] = d.map(
    (b, y) => Math.round(b + (f[y] - b) * c)
  );
  return `rgb(${u} ${m} ${h})`;
}
function Xe(t, a) {
  const n = t.replace("#", ""), r = n.length === 3 ? n.split("").map((d) => `${d}${d}`).join("") : n;
  if (!/^[0-9a-fA-F]{6}$/.test(r))
    return `rgba(255, 255, 255, ${a})`;
  const e = Number.parseInt(r.slice(0, 2), 16), l = Number.parseInt(r.slice(2, 4), 16), c = Number.parseInt(r.slice(4, 6), 16);
  return `rgba(${e}, ${l}, ${c}, ${a})`;
}
function _o(t, a) {
  return a.defaultClasses ?? t.defaultClasses ?? [a.classId];
}
function Po(t, a) {
  return a.defaultPresets ?? t.defaultPresets;
}
function Fo(t, a, n) {
  return n.classes ?? _o(t, a);
}
function Wa(t, a, n) {
  return n.presets ?? Po(t, a);
}
function $o(t) {
  return t.defaultTags ?? [];
}
function Ar(t, a, n) {
  return n.tags ?? $o(a);
}
function Ha(t) {
  const a = zi(), n = he().defaultEventTypeId;
  return a[t.eventType ?? n] ?? a[n];
}
function Uo(t) {
  var f;
  const a = He(t), n = qe().filter((u) => a.domainIds.includes(u)), r = pr(a, Mt()), e = at();
  if (n.length === 0)
    return {
      description: e.emptyBoardDetail,
      isComposite: !0,
      isDefault: !1,
      isEmpty: !0,
      label: e.emptyBoardLabel
    };
  if (r) {
    const u = a.domainIds[0], m = u ? aa(u) : null;
    return {
      description: (m == null ? void 0 : m.description) ?? e.defaultBoardDescription,
      isComposite: !1,
      isDefault: !0,
      isEmpty: !1,
      label: (m == null ? void 0 : m.label) ?? n.join(", ")
    };
  }
  const c = [n.length === qe().length ? "All domains" : n.length === 1 ? Nn(n[0]) : `${n.length} domains`];
  a.attributeIds.forEach((u) => {
    c.push(Nn(u));
  });
  const d = Mt().contentType;
  return a.contentType !== d && c.push(
    ((f = ua().find((u) => u.id === a.contentType)) == null ? void 0 : f.label) ?? a.contentType
  ), a.companyIds.length > 0 && c.push(`${a.companyIds.length} ${e.groupPluralLabel}`), {
    description: c.join(", "),
    isComposite: c.length > 1 || n.length > 1,
    isDefault: !1,
    isEmpty: !1,
    label: c.join(" · ")
  };
}
function Xo(t, a) {
  if (a === "all")
    return !0;
  const n = Ha(t), r = n.kind === "event" || n.id === "product-launch";
  return a === "events" ? r : !r;
}
function Yo(t, a, n, r) {
  const e = Wa(t, a, n), l = r.domainIds.some((d) => e.includes(d)), c = r.attributeIds.length === 0 || r.attributeIds.some((d) => e.includes(d));
  return l && c && Xo(n, r.contentType);
}
function ha(t, a, n = {}) {
  const r = He(a), e = new Set(r.companyIds);
  return r.domainIds.length === 0 ? [] : t.filter((l) => n.ignoreCompanyFilter || e.size === 0 || e.has(l.id)).map((l) => ({
    ...l,
    productLines: l.productLines.map((c) => ({
      ...c,
      releases: c.releases.filter(
        (d) => Yo(l, c, d, r)
      )
    })).filter((c) => c.releases.length > 0)
  })).filter((l) => l.productLines.length > 0);
}
function Rr(t) {
  return {
    providerCount: t.length,
    releaseCount: t.reduce(
      (a, n) => a + n.productLines.reduce((r, e) => r + e.releases.length, 0),
      0
    )
  };
}
function zo(t, a) {
  return qe().reduce((n, r) => (n[r] = Rr(
    ha(t, { ...a, companyIds: [], domainIds: [r] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function Bo(t, a) {
  return it().reduce((n, r) => (n[r] = Rr(
    ha(t, { ...a, attributeIds: [r], companyIds: [] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function Oo(t, a) {
  return ha(t, { ...a, companyIds: [] }, { ignoreCompanyFilter: !0 }).map((n) => ({
    id: n.id,
    name: n.name,
    releaseCount: n.productLines.reduce((r, e) => r + e.releases.length, 0)
  }));
}
function Wo(t) {
  const a = t.productLines.find((n) => n.classId !== "events") ?? t.productLines[0];
  return (a == null ? void 0 : a.classId) ?? t.defaultClasses[0] ?? he().defaultClassId;
}
function Ho(t, a, n) {
  const r = [...t], [e] = r.splice(a, 1);
  return e === void 0 ? t : (r.splice(n, 0, e), r);
}
function ga(t) {
  const a = new Set(Oe().map((l) => l.id)), n = t.filter((l) => a.has(l)), r = new Set(n), e = Oe().map((l) => l.id).filter((l) => !r.has(l));
  return [...n, ...e];
}
function Vo(t, a, n, r, e) {
  const l = new Map(t.map((m) => [m.id, m])), c = new Set(n), d = ga(a).map((m) => l.get(m)).filter((m) => !!m), f = new Set(d.map((m) => m.id)), u = t.filter((m) => !f.has(m.id));
  return ji(
    [...d, ...u].filter((m) => !c.has(m.id)),
    r,
    e
  );
}
function Go(t, a, n) {
  if (a === "all")
    return t;
  const r = t.slice(0, a);
  if (!n || r.some((l) => l.id === n))
    return r;
  const e = t.find((l) => l.id === n);
  return e ? [...r, e] : r;
}
function jo(t, a, n, r) {
  if (n === r)
    return t;
  const e = new Set(a), l = ga(t), c = l.filter((h) => e.has(h)), d = c.indexOf(n), f = c.indexOf(r);
  if (d < 0 || f < 0)
    return l;
  const u = Ho(c, d, f);
  let m = 0;
  return l.map((h) => {
    if (!e.has(h))
      return h;
    const b = u[m];
    return m += 1, b ?? h;
  });
}
function qo(t, a, n, r) {
  const e = new Set(a), l = ga(t).filter(
    (f) => e.has(f)
  ), c = l.indexOf(n), d = r === "up" ? c - 1 : c + 1;
  return c < 0 || d < 0 || d >= l.length ? t : jo(t, a, n, l[d]);
}
function Zo(t, a) {
  const n = [], r = t.map((c) => {
    const d = c.productLines.map((v) => {
      const k = v.releases.map((W) => ({
        ...W,
        classes: Fo(c, v, W),
        presets: Wa(c, v, W),
        tags: Ar(c, v, W)
      })).sort((W, S) => {
        const K = _e(W.date).getTime(), H = _e(S.date).getTime();
        return K - H || W.name.localeCompare(S.name);
      }).reduce((W, S) => {
        const K = _e(S.date), H = S.endDate ? _e(S.endDate) : K;
        if (Number.isNaN(K.getTime()))
          return n.push(`${c.name} / ${v.label}: ${S.name}`), W;
        if (S.endDate && Number.isNaN(H.getTime()))
          return n.push(`${c.name} / ${v.label}: ${S.name} end date`), W;
        const T = W[W.length - 1], q = Math.round((K.getTime() - ot().getTime()) / lt), z = Number.isNaN(H.getTime()) ? q : Math.max(q, Math.round((H.getTime() - ot().getTime()) / lt)), _ = T ? q - T.globalDay : 0, de = Ha(S), Q = hr(c, v, S, a);
        return W.push({
          ...S,
          articleSlug: ur(c.id, v.id, S),
          dateLabel: Le(K, void 0, S.datePrecision),
          dateRangeLabel: dr(S.date, S.endDate, S.datePrecision),
          durationDays: z - q + 1,
          endDateLabel: S.endDate ? Le(S.endDate) : void 0,
          endGlobalDay: z,
          eventKind: de.kind,
          eventType: de.id,
          eventTypeLabel: de.label,
          eventTypeShortLabel: de.shortLabel,
          globalDay: q,
          gap: _,
          significanceScore: Q
        }), W;
      }, []), L = k[k.length - 1] ?? null, G = k.reduce((W, S) => W + S.gap, 0), j = k.length > 1 ? Math.round(G / (k.length - 1)) : null, le = k[0], Z = k.reduce(
        (W, S) => Math.max(W, S.significanceScore),
        0
      );
      return {
        ...v,
        averageGap: j,
        latestRelease: L,
        releases: k,
        significanceScore: Z,
        startDay: (le == null ? void 0 : le.globalDay) ?? 0,
        totalSpan: L && le ? L.endGlobalDay - le.globalDay : 0
      };
    }).sort(
      (v, M) => {
        var k, L;
        return M.significanceScore - v.significanceScore || (((k = M.latestRelease) == null ? void 0 : k.globalDay) ?? 0) - (((L = v.latestRelease) == null ? void 0 : L.globalDay) ?? 0) || v.label.localeCompare(M.label);
      }
    ), f = [...d].filter((v) => v.latestRelease).sort((v, M) => {
      var k, L;
      return (((k = M.latestRelease) == null ? void 0 : k.endGlobalDay) ?? 0) - (((L = v.latestRelease) == null ? void 0 : L.endGlobalDay) ?? 0);
    })[0] ?? null, u = (f == null ? void 0 : f.latestRelease) ?? null, m = [...d].flatMap((v) => v.releases).sort((v, M) => v.globalDay - M.globalDay)[0] ?? null, h = d.reduce(
      (v, M) => v + M.releases.reduce((k, L) => k + L.gap, 0),
      0
    ), b = d.reduce(
      (v, M) => v + Math.max(M.releases.length - 1, 0),
      0
    ), y = d.reduce(
      (v, M) => Math.max(v, M.significanceScore),
      0
    );
    return {
      ...c,
      averageGap: b > 0 ? Math.round(h / b) : null,
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
  }, 0), l = r.reduce(
    (c, d) => c + d.productLines.reduce((f, u) => f + u.releases.length, 0),
    0
  );
  return {
    invalidEntries: n,
    latestGlobalDay: e,
    processedCompanies: r,
    totalReleases: l
  };
}
function _n({ endDay: t, startDay: a }) {
  const n = [], r = [], e = Math.floor(a), l = Math.max(e, Math.ceil(t)), c = new Date(ot().getTime() + e * lt), d = new Date(ot().getTime() + l * lt), f = new Date(Date.UTC(c.getUTCFullYear(), c.getUTCMonth(), 1));
  for (f.getTime() < c.getTime() && f.setUTCMonth(f.getUTCMonth() + 1); f <= d; ) {
    const u = Math.round((f.getTime() - ot().getTime()) / lt);
    f.getUTCMonth() === 0 ? r.push({ days: u, label: f.getUTCFullYear() }) : n.push({
      days: u,
      label: ko(f, { month: "short" })
    }), f.setUTCMonth(f.getUTCMonth() + 1);
  }
  return { monthTicks: n, yearTicks: r };
}
function na({
  camera: t,
  compact: a = !1,
  futureBufferDays: n = 0,
  pastBufferDays: r = 0,
  viewport: e,
  zoom: l
}) {
  if (e.width <= 0)
    return { endDay: 0, startDay: 0 };
  const c = a ? bt : xt, d = a ? xr : vr, f = Math.max(l, 1e-3), u = t.x, m = t.x + e.width / f, h = (u - d - c) / Se, b = (m - d - c) / Se, y = Math.floor(h - r);
  return { endDay: Math.max(y + 30, Math.ceil(b + n)), startDay: y };
}
function ra(t, a = yo) {
  const n = Math.max(1, a);
  return {
    endDay: Math.ceil(t.endDay / n) * n,
    startDay: Math.floor(t.startDay / n) * n
  };
}
function Pn({
  camera: t,
  compact: a = !1,
  viewport: n,
  zoom: r
}) {
  return n.width <= 0 ? { endDay: Number.POSITIVE_INFINITY, startDay: Number.NEGATIVE_INFINITY } : ra(
    na({
      camera: t,
      compact: a,
      futureBufferDays: Sn,
      pastBufferDays: Sn,
      viewport: n,
      zoom: r
    })
  );
}
function Ko(t, a) {
  return t.startDay === a.startDay && t.endDay === a.endDay;
}
function Qt(t, a, n) {
  return a >= n.startDay && t <= n.endDay;
}
function Fn({
  camera: t,
  compact: a = !1,
  minimumDays: n,
  viewport: r,
  zoom: e
}) {
  const l = ra(
    na({
      camera: t,
      compact: a,
      futureBufferDays: xo,
      pastBufferDays: bo,
      viewport: r,
      zoom: e
    })
  );
  return {
    endDay: Math.max(n, l.endDay),
    startDay: Math.min(0, l.startDay)
  };
}
function We(t, a) {
  return (t - a) * Se;
}
function ia(t, a) {
  return Math.max(0, (a - t) * Se);
}
function Va(t, a) {
  return t.latestRelease ? Math.max(0, Math.floor(a - t.latestRelease.endGlobalDay)) : 0;
}
function Qo(t, a) {
  return a === 0 ? 100 : Math.max(0, Math.round((1 - t / a) * 100));
}
function Jo(t) {
  return `${t} ${t === 1 ? "Day" : "Days"} since last update`;
}
function La(t) {
  if (t <= 0)
    return "Same day";
  if (t < 31)
    return `${t} ${t === 1 ? "day" : "days"}`;
  const a = Math.floor(t / 365), n = t - a * 365, r = Math.floor(n / 30), e = n - r * 30, l = [];
  return a > 0 && l.push(`${a} ${a === 1 ? "year" : "years"}`), r > 0 && l.push(`${r} ${r === 1 ? "month" : "months"}`), e > 0 && a === 0 && l.push(`${e} ${e === 1 ? "day" : "days"}`), l.length > 0 ? l.join(", ") : `${t} days`;
}
function el(t, a) {
  if (a === null || a <= 0)
    return null;
  const n = t - a, r = Math.abs(n);
  return r <= 2 ? `On pace with this line's ${a}-day average` : `${r} ${r === 1 ? "day" : "days"} ${n > 0 ? "slower" : "faster"} than this line's ${a}-day average`;
}
const _a = 3, tl = 4, al = 12, nl = 132, rl = "[data-timeline-pin]:not([aria-current]):not([data-timeline-event-type]) .timeline-map-screen-label", Pa = /* @__PURE__ */ new Map();
let Fa;
function Be(t) {
  const a = Number.parseFloat(t ?? "");
  return Number.isFinite(a) ? a : 0;
}
function il(t) {
  const a = t.parentElement;
  if (!a)
    return null;
  const n = getComputedStyle(a), r = getComputedStyle(t), [e, l] = n.translate === "none" ? [] : n.translate.split(" "), c = n.rotate === "none" ? 0 : -Be(n.rotate);
  return {
    anchorX: Be(n.left) + Be(e),
    anchorY: -(Be(n.top) + a.offsetHeight + Be(l)),
    angleRad: c * Math.PI / 180,
    font: `${r.fontWeight} ${r.fontSize} ${r.fontFamily}`,
    fontSizePx: Be(r.fontSize),
    heightPx: t.offsetHeight,
    horizontalChromePx: Be(r.paddingLeft) + Be(r.paddingRight) + Be(r.borderLeftWidth) + Be(r.borderRightWidth),
    letterSpacingPx: Be(r.letterSpacing)
  };
}
function ol(t, a) {
  Fa === void 0 && (Fa = document.createElement("canvas").getContext("2d"));
  const n = Fa;
  let r = t.length * a.fontSizePx * 0.6;
  return n && (n.font = a.font, r = n.measureText(t).width), r + t.length * a.letterSpacingPx + a.horizontalChromePx;
}
function ll(t, a) {
  const n = Math.sin(a.angleRad), r = Math.cos(a.angleRad), e = a.heightPx + _a, l = a.heightPx / 2 * r, c = a.heightPx / 2 * n - a.anchorX, d = Math.max(
    tl,
    al - a.anchorY - l
  ), f = t.map((h) => ({
    lift: 0,
    slug: h.articleSlug,
    width: ol(h.name, a),
    x: h.globalDay * Se
  })).sort((h, b) => h.x - b.x), u = (h, b) => {
    const y = h + a.anchorX + (b > 0 ? c : 0), v = a.anchorY + b;
    return { n: -y * n + v * r, s: y * r + v * n };
  }, m = (h, b) => {
    const y = u(h.x, h.lift), v = u(b.x, b.lift), M = v.s - y.s;
    return Math.abs(y.n - v.n) < e && M < h.width + _a && -M < b.width + _a;
  };
  for (let h = f.length - 2; h >= 0; h -= 1) {
    const b = f[h], y = f.slice(h + 1).filter((L) => L.x - b.x < b.width / r + e);
    if (!y.some((L) => m(b, L)))
      continue;
    const v = u(b.x, 0).n - c * n, M = y.map((L) => Math.max(d, (u(L.x, L.lift).n + e - v) / r + 0.5)).sort((L, G) => L - G), k = M.find(
      (L) => y.every((G) => !m({ ...b, lift: L }, G))
    );
    b.lift = Math.min(nl, k ?? M[M.length - 1]);
  }
  return new Map(
    f.map((h) => {
      const b = Math.round(h.lift);
      return [
        h.slug,
        b > 0 ? { leaderHeight: a.anchorY + b + l, lift: b, shiftX: c } : { leaderHeight: 0, lift: 0, shiftX: 0 }
      ];
    })
  );
}
function tt(t, a = 1) {
  return Math.max(1, Math.round(t * a));
}
function Ga(t = !1, a = 1) {
  return tt(t ? eo : Ji, a);
}
function ja(t, a = !1, n = 1) {
  const r = Math.max(t, 1), e = tt(a ? Qi : Ki, n), l = tt(to, n), c = Ga(a, n), d = r * c + Math.max(r - 1, 0) * l, f = Math.max(e, d + (r > 1 ? tt(16, n) : 0));
  return {
    groupHeight: f,
    lineGap: l,
    lineHeight: c,
    topOffset: Math.max(0, (f - d) / 2)
  };
}
function qa(t, a = !1, n = 1) {
  return ja(t.productLines.length, a, n).groupHeight;
}
function Za(t, a, n = !1, r = 1) {
  const { lineGap: e, lineHeight: l, topOffset: c } = ja(t, n, r);
  return c + a * (l + e) + l / 2;
}
function ct(t = !1, a = 1) {
  return {
    bottomPadding: tt(t ? lo : io, a),
    companyGap: tt(t ? no : ao, a),
    topPadding: tt(t ? oo : ro, a)
  };
}
function oa(t, a = !1, n = 1) {
  const r = ct(a, n), e = t.reduce((c, d) => c + qa(d, a, n), 0), l = Math.max(t.length - 1, 0) * r.companyGap;
  return Math.max(
    tt(a ? 384 : 448, n),
    e + l + r.topPadding + r.bottomPadding + tt(a ? 40 : 32, n)
  );
}
function Pt(t, a = !1, n = 1, r = ct(a, n)) {
  let e = r.topPadding;
  return t.map((l, c) => {
    const d = qa(l, a, n), f = {
      company: l,
      height: d,
      index: c,
      y: e
    };
    return e += d + r.companyGap, f;
  });
}
function la({
  compact: t = !1,
  currentGlobalDay: a,
  maxDays: n,
  summaryCount: r,
  timelineStartDay: e = 0,
  timelineHeight: l,
  timelineWidth: c,
  viewport: d
}) {
  const f = Math.max(d.width, t ? 360 : 1024), u = Math.max(d.height, t ? 720 : 680), m = t ? bt : xt, h = t ? xr : vr, b = t ? po : uo, y = t ? mo : so, v = t ? fo : co, M = h + m + a * Se, k = Math.max(0, M - f * (t ? 0.78 : 0.72)), L = t ? Math.min(390, Math.max(292, f - 64)) : 720, G = t ? Math.min(360, Math.max(280, f - 56)) : 360, j = t ? Math.min(420, Math.max(290, f - 48)) : 520, le = t ? Math.min(620, Math.max(320, f - 32)) : 1180, Z = Math.max(y * 0.34, k + (t ? 20 : f * 0.24)), W = t ? 0 : 4, S = Math.max(
    0,
    Math.min(
      b - u * (t ? 0.28 : 0.24),
      W - (t ? 18 : 24)
    )
  ), K = t ? Z + L + 18 : Math.min(Z + L + 28, k + f - G - 24), H = W + 8, T = Z, q = b + l + (t ? 42 : 52), z = Z, _ = q + (t ? 132 : 118), de = t ? f >= 640 ? 2 : 1 : 4, E = Math.max(1, Math.ceil(Math.max(r, 1) / de)) * (t ? 172 : 224), P = h + m + Math.max(n, 0) * Se, C = h + e * Se, A = Math.max(
    P + y,
    C + c + m + y,
    K + G + y,
    z + le + y,
    k + f + y
  ), x = Math.max(
    b + l + v,
    _ + E + v,
    H + (t ? 152 : 172) + v,
    S + u + v
  );
  return {
    contentCards: {
      intro: { height: t ? 176 : 202, width: L, x: Z, y: W },
      latest: { height: t ? 96 : 74, width: j, x: T, y: q },
      notes: { height: t ? 142 : 170, width: G, x: K, y: H },
      summaries: { width: le, x: z, y: _ }
    },
    initialCameraX: k,
    initialCameraY: S,
    railWidth: m,
    timelineX: h,
    timelineY: b,
    worldHeight: x,
    worldWidth: A
  };
}
function sl(t) {
  return {
    x: t.initialCameraX,
    y: t.initialCameraY
  };
}
function pt(t, a = !1) {
  return {
    camera: sl(t),
    zoom: a ? It : St
  };
}
function Sr(t) {
  return Number.isFinite(t) ? Math.max(1e-3, t) : 1;
}
function Ka(t, a) {
  return `translate3d(${-t.x * a}px, ${-t.y * a}px, 0) scale(${a})`;
}
const Jt = /* @__PURE__ */ new WeakMap(), cl = 126, Ir = ["timeline-map-label", "timeline-map-screen-fixed", "timeline-gap-collapse"], dl = "timeline-gap-tooltip", ul = ".timeline-gap:hover .timeline-gap-tooltip, .timeline-gap:focus-within .timeline-gap-tooltip", $n = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakMap();
function kr(t) {
  let a = $n.get(t);
  return a || (a = [...Ir, dl].map(
    (n) => t.getElementsByClassName(n)
  ), $n.set(t, a)), a;
}
function Un(t, a) {
  t.style.getPropertyValue("--map-zoom-frame") !== a && t.style.setProperty("--map-zoom-frame", a);
}
function ml(t, a) {
  const n = kr(t);
  for (let r = 0; r < Ir.length; r += 1) {
    const e = n[r];
    for (let l = 0; l < e.length; l += 1)
      Un(e[l], a);
  }
  t.querySelectorAll(ul).forEach((r) => Un(r, a));
}
function fl(t) {
  for (const a of kr(t))
    for (let n = 0; n < a.length; n += 1)
      a[n].style.removeProperty("--map-zoom-frame");
}
function Ya(t, a) {
  t.style.getPropertyValue("--map-zoom") !== a && t.style.setProperty("--map-zoom", a), fl(t);
}
function ea(t, a, n) {
  if (!t)
    return;
  t.style.transform = Ka(a, n);
  const r = String(Sr(n));
  sa.get(t) !== r && (Jt.has(t) ? ml(t, r) : Ya(t, r), sa.set(t, r)), t.style.willChange = "transform", t.setAttribute("data-camera-moving", "");
  const e = Jt.get(t);
  e !== void 0 && window.clearTimeout(e);
  const l = window.setTimeout(() => {
    t.style.willChange = "auto", t.removeAttribute("data-camera-moving"), Ya(t, r), Jt.delete(t);
  }, cl);
  Jt.set(t, l);
}
function Lr(t, a) {
  ar(() => {
    const n = t.current;
    if (n && !sa.has(n)) {
      const r = String(Sr(a));
      Ya(n, r), sa.set(n, r);
    }
  }, [t]);
}
function Ge(t) {
  return {
    "--label-size": String(t)
  };
}
function $a(t, a, n) {
  const r = t.maxX - t.minX, e = t.maxY - t.minY, l = Math.max(0, (a - r) / 2), c = Math.max(0, (n - e) / 2);
  return {
    maxX: t.maxX + l,
    maxY: t.maxY + c,
    minX: t.minX - l,
    minY: t.minY - c
  };
}
function Qa(t, a) {
  for (const n of t)
    for (let r = 0; r < n.productLines.length; r += 1) {
      const l = n.productLines[r].releases.find((c) => c.articleSlug === a);
      if (l)
        return { company: n, productLineIndex: r, release: l };
    }
  return null;
}
const _r = 6, pl = 2.75;
function hl(t, a, n, r) {
  const e = ct(n, r), l = Pt(t, n, r, e), c = new Map(l.map((f) => [f.company.id, f])), d = [];
  return t.forEach((f) => {
    const u = c.get(f.id);
    u && f.productLines.forEach((m, h) => {
      m.releases.forEach((b) => {
        d.push({
          slug: b.articleSlug,
          x: a.timelineX + a.railWidth + b.globalDay * Se,
          y: a.timelineY + u.y + Za(f.productLines.length, h, n, r)
        });
      });
    });
  }), d;
}
function gl(t, a, n, r, e, l, c, d) {
  if (e) {
    const u = Qa(t, e);
    if (u) {
      const h = Pt(
        t,
        n,
        r,
        ct(n, r)
      ).find((b) => b.company.id === u.company.id);
      if (h)
        return {
          x: a.timelineX + a.railWidth + u.release.globalDay * Se,
          y: a.timelineY + h.y + Za(u.company.productLines.length, u.productLineIndex, n, r)
        };
    }
  }
  const f = Math.max(c, 1e-3);
  return {
    x: l.x + d.width / (2 * f),
    y: l.y + d.height / (2 * f)
  };
}
function vl(t, a, n, r) {
  const e = (r == null ? void 0 : r.minPrimaryDistance) ?? _r;
  let l = null, c = 1 / 0, d = 1 / 0;
  return a.forEach((f) => {
    if (r != null && r.excludeSlug && f.slug === r.excludeSlug)
      return;
    const u = f.x - t.x, m = f.y - t.y;
    let h = 0, b = 0;
    if (n === "right") {
      if (u < e)
        return;
      h = u, b = Math.abs(m);
    } else if (n === "left") {
      if (u > -e)
        return;
      h = -u, b = Math.abs(m);
    } else if (n === "down") {
      if (m < e)
        return;
      h = m, b = Math.abs(u);
    } else {
      if (m > -e)
        return;
      h = -m, b = Math.abs(u);
    }
    const y = b * pl + h, v = Math.hypot(u, m);
    (y < c || y === c && v < d) && (l = f, c = y, d = v);
  }), l;
}
function xl(t) {
  return t === "ArrowRight" ? "right" : t === "ArrowLeft" ? "left" : t === "ArrowDown" ? "down" : t === "ArrowUp" ? "up" : null;
}
function bl(t) {
  if (t.altKey || t.ctrlKey || t.metaKey)
    return !0;
  const a = t.target;
  return a instanceof Element ? a.closest('[aria-label="Timeline zoom controls"]') ? !0 : !!a.closest('input, textarea, select, [contenteditable="true"]') : !1;
}
function Xn({
  compact: t = !1,
  layout: a,
  productLineIndex: n,
  release: r,
  row: e,
  verticalScale: l = 1
}) {
  const c = Ga(t, l), d = a.timelineY + e.y + Za(e.company.productLines.length, n, t, l), f = a.timelineX + a.railWidth + r.globalDay * Se, u = a.timelineX + a.railWidth + r.endGlobalDay * Se, m = t ? 28 : 36;
  return {
    maxX: Math.max(f, u) + m,
    maxY: d + c / 2 + 12,
    minX: Math.min(f, u) - m,
    minY: d - c / 2 - 12
  };
}
function yl(t, a, n) {
  return n ? a ? { bottom: 40, left: 16, right: 16, top: 64 } : {
    bottom: 48,
    left: 100,
    right: Math.min(yr, Math.round(t.width * wr)),
    top: 72
  } : Eo;
}
function wl(t, a) {
  const n = Math.min(
    yr,
    Math.round(t.width * wr)
  ), e = (t.width - n) * No, l = Math.max(
    1,
    t.width - a.left - a.right - vt * 2
  );
  return { x: ie(
    (e - a.left - vt) / l,
    0.42,
    0.68
  ), y: Tr.y };
}
function Tl({
  anchor: t,
  bounds: a,
  focusMaxZoom: n,
  insets: r,
  layout: e,
  maxZoom: l,
  minZoom: c,
  viewport: d
}) {
  if (d.width <= 0 || d.height <= 0)
    return null;
  const f = Math.max(
    1,
    d.width - r.left - r.right - vt * 2
  ), u = Math.max(
    1,
    d.height - r.top - r.bottom - vt * 2
  ), m = Math.max(a.maxX - a.minX, 1), h = Math.max(a.maxY - a.minY, 1), b = Math.min(f / m, u / h) * br * wo, y = Number(ie(b, c, Math.min(l, n)).toFixed(3)), v = (a.minX + a.maxX) / 2, M = (a.minY + a.maxY) / 2, k = r.left + vt + f * t.x, L = r.top + vt + u * t.y, G = Math.max(0, e.worldWidth - d.width / y), j = Math.max(0, e.worldHeight - d.height / y);
  return {
    camera: {
      x: ie(v - k / y, 0, G),
      y: ie(M - L / y, 0, j)
    },
    zoom: y
  };
}
function Pr(t, a, n, r, e = !1, l = 1) {
  if (t.kind === "bounds")
    return t.bounds;
  const c = ct(e, l), d = Pt(a, e, l, c);
  if (t.kind === "slug") {
    const y = Qa(a, t.slug);
    if (!y)
      return null;
    const v = d.find((k) => k.company.id === y.company.id);
    if (!v)
      return null;
    const M = Xn({
      compact: e,
      layout: n,
      productLineIndex: y.productLineIndex,
      release: y.release,
      row: v,
      verticalScale: l
    });
    return $a(M, Aa, Ra);
  }
  if (t.kind === "slugs") {
    const y = t.slugs.map(
      (v) => Pr(
        { kind: "slug", slug: v },
        a,
        n,
        r,
        e,
        l
      )
    ).filter((v) => !!v);
    return y.length === 0 ? null : y.reduce(
      (v, M) => ({
        maxX: Math.max(v.maxX, M.maxX),
        maxY: Math.max(v.maxY, M.maxY),
        minX: Math.min(v.minX, M.minX),
        minY: Math.min(v.minY, M.minY)
      }),
      y[0]
    );
  }
  if (t.kind === "release") {
    const y = d.find((k) => k.company.id === t.companyId);
    if (!y)
      return null;
    const v = y.company.productLines.findIndex((k) => k.id === t.productLineId);
    if (v < 0)
      return null;
    const M = Xn({
      compact: e,
      layout: n,
      productLineIndex: v,
      release: {
        endGlobalDay: t.endGlobalDay ?? t.globalDay,
        globalDay: t.globalDay
      },
      row: y,
      verticalScale: l
    });
    return $a(M, Aa, Ra);
  }
  const f = n.timelineX + n.railWidth + t.globalDay * Se, u = t.endGlobalDay ?? t.globalDay, m = n.timelineX + n.railWidth + u * Se, h = n.timelineY + r * 0.44, b = e ? 100 : 120;
  return $a(
    {
      maxX: Math.max(f, m) + 40,
      maxY: h + b / 2,
      minX: Math.min(f, m) - 40,
      minY: h - b / 2
    },
    Aa,
    Ra
  );
}
function Ml(t, a, n, r) {
  const e = Math.max(a, 1e-3);
  return {
    worldX: t.x + n / e,
    worldY: t.y + r / e
  };
}
function ht(t, a, n, r, e) {
  const l = Math.max(e, 1e-3);
  return {
    x: t - n / l,
    y: a - r / l
  };
}
function Yn({
  anchorX: t,
  anchorY: a,
  camera: n,
  existingAnchor: r,
  zoom: e
}) {
  if (r && r.viewportX === t && r.viewportY === a)
    return r;
  const { worldX: l, worldY: c } = Ml(n, e, t, a);
  return {
    viewportX: t,
    viewportY: a,
    worldX: l,
    worldY: c
  };
}
function gt(t, a, n) {
  return t + (a - t) * n;
}
function ie(t, a, n) {
  return Math.min(Math.max(t, a), n);
}
function El(t) {
  const a = ie(t, 0, 1), n = 1 / (1 + Math.exp(yt / 2)), r = 1 / (1 + Math.exp(-yt / 2));
  return (1 / (1 + Math.exp(-yt * (a - 0.5))) - n) / (r - n);
}
function Nl(t) {
  const a = ie(t, 0, 1), n = 1 / (1 + Math.exp(yt / 2)), r = 1 / (1 + Math.exp(-yt / 2)), e = n + a * (r - n);
  return ie(0.5 + Math.log(e / (1 - e)) / yt, 0, 1);
}
function za(t, a, n) {
  if (n <= a)
    return a;
  const r = El(t);
  return a + r * (n - a);
}
function Fr(t, a, n) {
  if (n <= a)
    return 0;
  const r = (ie(t, a, n) - a) / (n - a);
  return Nl(r);
}
function kt(t, a, n, r) {
  const e = Fr(t, n, r);
  return za(e + a, n, r);
}
function zn(t, a, n) {
  if (t <= 0 || n <= 0)
    return 0.35;
  const r = Math.max(t - a, 120);
  return ie(r / n * br, 0.08, 1);
}
function Dl(t) {
  return /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ o("path", { d: "M11 5v12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ o("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Cl(t) {
  return /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ o("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ o("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Lt({ classId: t, className: a }) {
  const n = a ?? "h-4 w-4";
  return t === "frontier-llms" ? /* @__PURE__ */ o(Di, { className: n, strokeWidth: 1.8 }) : t === "open-source-llms" ? /* @__PURE__ */ o(Ci, { className: n, strokeWidth: 1.8 }) : t === "image-generation" ? /* @__PURE__ */ o(Ai, { className: n, strokeWidth: 1.8 }) : t === "video-generation" ? /* @__PURE__ */ o(sr, { className: n, strokeWidth: 1.8 }) : t === "audio-generation" ? /* @__PURE__ */ o(Ri, { className: n, strokeWidth: 1.8 }) : t === "3d-generation" ? /* @__PURE__ */ o(Si, { className: n, strokeWidth: 1.8 }) : t === "world-models" ? /* @__PURE__ */ o(st, { className: n, strokeWidth: 1.8 }) : t === "coding-harnesses" ? /* @__PURE__ */ o(Ii, { className: n, strokeWidth: 1.8 }) : t === "events" ? /* @__PURE__ */ o(da, { className: n, strokeWidth: 1.8 }) : t === "robotics" ? /* @__PURE__ */ o(ki, { className: n, strokeWidth: 1.8 }) : t === "vehicle-autonomy" ? /* @__PURE__ */ o(Li, { className: n, strokeWidth: 1.8 }) : /* @__PURE__ */ o(st, { className: n, strokeWidth: 1.8 });
}
function Al({
  attributeStats: t,
  boardView: a,
  className: n = "",
  companySortMode: r,
  companyOptions: e,
  domainStats: l,
  filterState: c,
  isOpen: d,
  onAttributeToggle: f,
  onClearAll: u,
  onClearCompanyFilter: m,
  onCompanyToggle: h,
  onCompanySortModeChange: b,
  onContentTypeChange: y,
  onDomainToggle: v,
  onReset: M,
  onSelectAll: k,
  onSignificanceDisplayLimitChange: L,
  onToggle: G,
  significanceDisplayLimit: j,
  totalMatchedCompanyCount: le,
  variant: Z = "panel",
  visibleCompanyCount: W
}) {
  var ve;
  const S = c.domainIds.length + c.attributeIds.length + c.companyIds.length + (c.contentType === "all" ? 0 : 1), K = Z === "rail", H = K && !d, T = at(), q = `${K ? d ? "w-[var(--category-expanded-width,286px)]" : "w-[74px]" : "w-full"} timeline-fluid-obstacle overflow-hidden rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${H ? "cursor-pointer hover:bg-[var(--surface-strong)]" : ""} ${n}`, z = ({
    buttonKey: E,
    description: P,
    icon: C,
    isSelected: A,
    meta: x,
    onClick: N,
    title: R
  }) => /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      title: R,
      disabled: !d,
      onClick: N,
      className: `flex h-11 w-full items-center gap-2 rounded-[0.85rem] border px-2.5 text-left transition duration-300 active:scale-[0.99] ${A ? "border-[var(--edge-strong)] bg-[var(--surface-strong)]" : "border-[var(--edge)] bg-transparent hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
      children: [
        C ?? /* @__PURE__ */ o(Ei, { className: "h-4 w-4 shrink-0 text-[var(--ink)]", strokeWidth: 1.8 }),
        /* @__PURE__ */ g("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ o("span", { className: "block truncate text-xs font-semibold tracking-tight text-[var(--ink)]", children: P }),
          /* @__PURE__ */ o("span", { className: "mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--muted)]", children: x })
        ] }),
        /* @__PURE__ */ o(
          "span",
          {
            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${A ? "border-[var(--edge-strong)] bg-[var(--ink)] text-[var(--page-bg)]" : "border-[var(--edge)] text-transparent"}`,
            children: /* @__PURE__ */ o(Ni, { className: "h-3 w-3", strokeWidth: 2 })
          }
        )
      ]
    },
    E
  ), _ = he().sortOptions, de = ((ve = _.find((E) => E.id === r)) == null ? void 0 : ve.label) ?? "Significance", Q = r === "significance" ? "score" : de;
  return /* @__PURE__ */ g("aside", { className: q, onClick: H ? G : void 0, children: [
    /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        "aria-expanded": d,
        "aria-label": "Timeline filter and sort controls",
        onClick: (E) => {
          E.stopPropagation(), G();
        },
        className: `flex w-full items-center gap-3 text-left transition duration-300 hover:bg-[var(--surface-strong)] active:scale-[0.99] ${d ? "justify-between border-b border-[var(--edge)] px-3 py-3" : "justify-center px-0 py-4"}`,
        children: [
          /* @__PURE__ */ o("span", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink)] shadow-[var(--soft-shadow)]", children: /* @__PURE__ */ o(wi, { className: "h-4 w-4", strokeWidth: 1.8 }) }),
          d ? /* @__PURE__ */ g("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ o("span", { className: "block text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]", children: T.filterPanelLabel }),
            /* @__PURE__ */ o("span", { className: "mt-1 block truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.label }),
            /* @__PURE__ */ g("span", { className: "mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
              W,
              "/",
              le,
              " rows · sort ",
              Q
            ] })
          ] }) : /* @__PURE__ */ o("span", { className: "sr-only", children: a.label }),
          /* @__PURE__ */ o(
            Ti,
            {
              className: `h-4 w-4 shrink-0 text-[var(--ink-soft)] transition duration-300 ${d ? "rotate-180" : "-rotate-90"}`,
              strokeWidth: 1.8
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        "data-filter-panel": !0,
        "aria-hidden": !d,
        className: `overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${d ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"}`,
        style: { pointerEvents: d ? "auto" : "none" },
        children: /* @__PURE__ */ o(
          we.div,
          {
            initial: !1,
            animate: { y: d ? 0 : -10 },
            transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
            className: "max-h-[min(620px,calc(100dvh-18rem))] overflow-y-auto px-3 py-3",
            children: /* @__PURE__ */ g("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start", children: [
              /* @__PURE__ */ g("div", { className: "space-y-3", children: [
                mr().map((E) => /* @__PURE__ */ g("div", { children: [
                  /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: E.label }),
                  /* @__PURE__ */ o("div", { className: "space-y-1.5", children: E.domainIds.map((P) => {
                    const C = aa(P);
                    if (!C)
                      return null;
                    const A = l[P] ?? { providerCount: 0, releaseCount: 0 };
                    return z({
                      buttonKey: C.id,
                      description: C.label,
                      icon: /* @__PURE__ */ o(Lt, { classId: C.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                      isSelected: c.domainIds.includes(P),
                      meta: `${A.providerCount}c / ${A.releaseCount}r`,
                      onClick: () => v(P),
                      title: C.description
                    });
                  }) })
                ] }, E.label)),
                /* @__PURE__ */ g("div", { className: "border-t border-[var(--edge)] pt-3", children: [
                  /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: T.contentTypeHeading }),
                  /* @__PURE__ */ o("div", { className: "grid grid-cols-3 gap-1.5", children: ua().map((E) => {
                    const P = c.contentType === E.id, C = E.id === "events" ? da : E.id === "releases" ? or : st;
                    return /* @__PURE__ */ g(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => y(E.id),
                        title: E.description,
                        className: `inline-flex h-9 items-center justify-center gap-1.5 rounded-[0.85rem] border px-2 text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ o(C, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                          E.label
                        ]
                      },
                      E.id
                    );
                  }) })
                ] }),
                /* @__PURE__ */ g("div", { className: "grid grid-cols-3 gap-1.5 border-t border-[var(--edge)] pt-3 md:border-t-0 md:pt-0", children: [
                  /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: k,
                      title: T.selectAllTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(st, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
                        T.selectAllLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: u,
                      title: T.clearFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(lr, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        T.clearFiltersLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: M,
                      title: T.resetFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(ca, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        T.resetFiltersLabel
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ g("div", { className: "border-t border-[var(--edge)] pt-3 md:border-l md:border-t-0 md:py-1 md:pl-3", children: [
                /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: "Attributes" }),
                /* @__PURE__ */ o("div", { className: "space-y-1.5", children: it().map((E) => {
                  const P = aa(E);
                  if (!P)
                    return null;
                  const C = t[E] ?? { providerCount: 0, releaseCount: 0 };
                  return z({
                    buttonKey: E,
                    description: P.label,
                    icon: /* @__PURE__ */ o(Lt, { classId: P.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                    isSelected: c.attributeIds.includes(E),
                    meta: `${C.providerCount}c / ${C.releaseCount}r`,
                    onClick: () => f(E),
                    title: P.description
                  });
                }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: T.companyFiltersHeading }),
                /* @__PURE__ */ o("div", { className: "max-h-44 space-y-1.5 overflow-y-auto pr-1", children: e.length > 0 ? /* @__PURE__ */ g(Tt, { children: [
                  /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: m,
                      title: T.allRelevantLabel,
                      className: `flex h-8 w-full items-center justify-between rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${c.companyIds.length === 0 ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        T.allRelevantLabel,
                        /* @__PURE__ */ g("span", { className: "font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                          e.length,
                          "c"
                        ] })
                      ]
                    }
                  ),
                  e.map((E) => {
                    const P = c.companyIds.includes(E.id);
                    return /* @__PURE__ */ g(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => h(E.id),
                        title: `Filter to ${E.name}`,
                        className: `flex h-8 w-full items-center justify-between gap-2 rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: E.name }),
                          /* @__PURE__ */ g("span", { className: "shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                            E.releaseCount,
                            "r"
                          ] })
                        ]
                      },
                      E.id
                    );
                  })
                ] }) : /* @__PURE__ */ o("div", { className: "rounded-[0.75rem] border border-[var(--edge)] px-2 py-2 text-[11px] leading-4 text-[var(--muted)]", children: T.companyFilterEmpty }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: T.sortHeading }),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5", children: _.map((E) => {
                  const P = r === E.id;
                  return /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => b(E.id),
                      className: `flex h-9 w-full items-center justify-between rounded-[0.85rem] border px-2.5 text-left text-xs font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        E.label,
                        /* @__PURE__ */ o(
                          "span",
                          {
                            className: `h-2.5 w-2.5 rounded-full border ${P ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--edge)] bg-transparent"}`
                          }
                        )
                      ]
                    },
                    E.id
                  );
                }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: T.displayedRowsHeading }),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-4 gap-1.5 md:grid-cols-2", children: fr().map((E) => {
                  const P = j === E, C = E === "all" ? "All" : String(E);
                  return /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => L(E),
                      className: `h-8 rounded-[0.85rem] border px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: C
                    },
                    String(E)
                  );
                }) })
              ] })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ o(je, { initial: !1, children: !d && K ? /* @__PURE__ */ g(
      we.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        className: "flex flex-col items-center gap-3 px-2 pb-5",
        children: [
          /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]", style: { writingMode: "vertical-rl" }, children: T.filterPanelLabel }),
          /* @__PURE__ */ o("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] font-mono text-[10px] text-[var(--ink-soft)]", children: S })
        ]
      },
      "filter-rail"
    ) : null })
  ] });
}
function Bn(t) {
  return /* @__PURE__ */ o(Al, { ...t });
}
function wt({
  children: t,
  label: a,
  onClick: n,
  pressed: r
}) {
  return /* @__PURE__ */ o(
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
function $r({
  className: t = "",
  compact: a = !1,
  maxZoom: n,
  minZoom: r,
  onSliderActiveChange: e,
  onZoomChange: l,
  zoom: c
}) {
  const d = re(null), f = re(null), u = re(null), m = re(null), h = re(null), [b, y] = Me(!1), [v, M] = Me(!1), [k, L] = Me(!1), G = Fr(c, r, n), j = 8 + (1 - G) * 84, le = a ? "h-3.5 w-3.5" : "h-4 w-4", Z = b || v || k, W = Z ? a ? "h-10 min-w-10 px-2 text-[9px]" : "h-11 min-w-11 px-2.5 text-[10px]" : a ? "h-4 min-w-4 px-0 text-[0px]" : "h-5 min-w-5 px-0 text-[0px]", S = a ? "group-hover/zoomrail:h-10 group-hover/zoomrail:min-w-10 group-hover/zoomrail:px-2 group-hover/zoomrail:text-[9px] group-focus-within/zoomrail:h-10 group-focus-within/zoomrail:min-w-10 group-focus-within/zoomrail:px-2 group-focus-within/zoomrail:text-[9px]" : "group-hover/zoomrail:h-11 group-hover/zoomrail:min-w-11 group-hover/zoomrail:px-2.5 group-hover/zoomrail:text-[10px] group-focus-within/zoomrail:h-11 group-focus-within/zoomrail:min-w-11 group-focus-within/zoomrail:px-2.5 group-focus-within/zoomrail:text-[10px]", K = b ? "text-[var(--ink)] opacity-100" : "opacity-45", H = (x, N = !1) => {
    const R = () => {
      y(x), e == null || e(x);
    };
    if (N) {
      nr(R);
      return;
    }
    R();
  }, T = (x) => {
    const N = Number(x.currentTarget.value);
    l(() => za(N, r, n));
  };
  Re(() => () => {
    var x;
    h.current !== null && window.cancelAnimationFrame(h.current), m.current = null, (x = u.current) == null || x.call(u), e == null || e(!1);
  }, [e]);
  const q = (x) => {
    var B;
    const N = (B = d.current) == null ? void 0 : B.getBoundingClientRect();
    if (!N || N.height <= 0)
      return;
    const R = ie(1 - (x - N.top) / N.height, 0, 1);
    l(() => za(R, r, n));
  }, z = () => {
    h.current !== null && (window.cancelAnimationFrame(h.current), h.current = null);
    const x = m.current;
    m.current = null, x !== null && q(x);
  }, _ = (x) => {
    m.current = x, h.current === null && (h.current = window.requestAnimationFrame(() => {
      h.current = null;
      const N = m.current;
      m.current = null, N !== null && q(N);
    }));
  }, de = (x) => {
    !x.isPrimary || x.button !== 0 || (f.current = x.pointerId, x.currentTarget.setPointerCapture(x.pointerId), H(!0, !0), q(x.clientY));
  }, Q = (x) => {
    f.current === x.pointerId && (_(x.clientY), x.preventDefault());
  }, ve = (x) => {
    f.current === x.pointerId && (z(), x.currentTarget.hasPointerCapture(x.pointerId) && x.currentTarget.releasePointerCapture(x.pointerId), f.current = null, H(!1));
  }, E = () => {
    var x;
    z(), (x = u.current) == null || x.call(u), u.current = null, H(!1);
  }, P = (x) => {
    var B;
    if (x.button !== 0 || f.current !== null)
      return;
    (B = u.current) == null || B.call(u), H(!0, !0), q(x.clientY);
    const N = (ee) => {
      _(ee.clientY), ee.preventDefault();
    }, R = () => E();
    window.addEventListener("mousemove", N), window.addEventListener("mouseup", R, { once: !0 }), u.current = () => {
      window.removeEventListener("mousemove", N), window.removeEventListener("mouseup", R);
    };
  }, C = (x) => {
    const N = x.shiftKey ? Ca : go;
    if (x.key === "ArrowUp" || x.key === "ArrowRight") {
      l((R) => kt(R, N, r, n)), x.preventDefault();
      return;
    }
    if (x.key === "ArrowDown" || x.key === "ArrowLeft") {
      l((R) => kt(R, -N, r, n)), x.preventDefault();
      return;
    }
    if (x.key === "PageUp") {
      l((R) => kt(R, Ca, r, n)), x.preventDefault();
      return;
    }
    if (x.key === "PageDown") {
      l((R) => kt(R, -Ca, r, n)), x.preventDefault();
      return;
    }
    if (x.key === "Home") {
      l(() => r), x.preventDefault();
      return;
    }
    x.key === "End" && (l(() => n), x.preventDefault());
  }, A = (x) => {
    x.currentTarget.contains(x.relatedTarget) || M(!1);
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "aria-label": "Timeline zoom controls",
      "data-timeline-presentation-hide": !0,
      role: "group",
      className: `absolute z-40 flex ${a ? "min-h-[17rem] w-12 py-3" : "min-h-[22rem] w-14 py-4"} group/zoomrail select-none flex-col items-center justify-center gap-3 px-2 text-[var(--ink-soft)] transition-[opacity,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] hover:opacity-100 focus-within:text-[var(--ink)] focus-within:opacity-100 ${K} ${t}`,
      onBlur: A,
      onFocus: () => M(!0),
      onMouseEnter: () => L(!0),
      onMouseLeave: () => L(!1),
      onPointerEnter: () => L(!0),
      onPointerLeave: () => L(!1),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ o(Dl, { className: le })
          }
        ),
        /* @__PURE__ */ g(
          "label",
          {
            ref: d,
            className: `relative z-10 ${a ? "h-[12.5rem] w-8" : "h-[16rem] w-9"} cursor-ns-resize touch-none rounded-full focus-within:ring-2 focus-within:ring-[rgba(237,242,250,0.3)]`,
            onMouseDown: P,
            onPointerCancel: ve,
            onPointerDown: de,
            onPointerMove: Q,
            onPointerUp: ve,
            children: [
              /* @__PURE__ */ o("span", { className: "sr-only", children: "Timeline zoom" }),
              /* @__PURE__ */ o(
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
              /* @__PURE__ */ o(
                "span",
                {
                  "aria-hidden": "true",
                  className: `pointer-events-none absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-center ${b ? "transition-none" : "transition-[clip-path] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: {
                    backgroundImage: "radial-gradient(circle, rgba(237,242,250,0.92) 1.5px, transparent 1.7px)",
                    backgroundSize: "12px 12px",
                    clipPath: `inset(${(1 - G) * 100}% 0 0 0)`
                  }
                }
              ),
              /* @__PURE__ */ o(
                "span",
                {
                  className: `absolute left-1/2 grid ${W} ${S} -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(237,242,250,0.48)] bg-[rgba(237,242,250,0.95)] font-mono font-semibold text-[#0b0e14] shadow-[0_16px_32px_-22px_rgba(0,0,0,0.78)] ${b ? "scale-[1.04] transition-none" : "transition-[top,width,height,min-width,padding,transform,box-shadow,font-size] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: { top: `${j}%` },
                  children: /* @__PURE__ */ g("span", { className: `transition-opacity duration-200 group-hover/zoomrail:opacity-100 group-focus-within/zoomrail:opacity-100 ${Z ? "opacity-100" : "opacity-0"}`, children: [
                    Math.round(c * 100),
                    "%"
                  ] })
                }
              ),
              /* @__PURE__ */ o(
                "input",
                {
                  "aria-label": "Timeline zoom",
                  "aria-orientation": "vertical",
                  "aria-valuetext": `${Math.round(c * 100)} percent`,
                  type: "range",
                  min: "0",
                  max: "1",
                  step: "0.001",
                  value: G,
                  onBlur: () => H(!1),
                  onChange: T,
                  onKeyDown: C,
                  onPointerCancel: () => H(!1),
                  onPointerDown: () => H(!0, !0),
                  onPointerUp: () => H(!1),
                  className: "pointer-events-none absolute inset-0 z-30 h-full w-full cursor-ns-resize touch-none opacity-0 focus-visible:outline-none",
                  style: { direction: "rtl", writingMode: "vertical-lr" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ o(Cl, { className: le })
          }
        )
      ]
    }
  );
}
function Ur({
  className: t = "",
  company: a
}) {
  return /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 items-center justify-center text-[var(--ink)] ${t}`, children: /* @__PURE__ */ o(Lt, { classId: Wo(a), className: "h-[1rem] w-[1rem]" }) });
}
function Rl({
  compact: t = !1,
  company: a
}) {
  const n = a.logoMark, r = n ? he().logoAssetPaths[n] : void 0, e = r && Mr(n), l = e ? t ? "h-7 w-12 rounded-[0.72rem]" : "h-8 w-14 rounded-[0.82rem]" : t ? "h-7 w-7 rounded-[0.72rem]" : "h-8 w-8 rounded-[0.82rem]", c = e ? t ? "relative h-[11px] w-9 object-contain" : "relative h-3 w-11 object-contain" : t ? "relative h-[18px] w-[18px] object-contain" : "relative h-5 w-5 object-contain", d = t ? "text-[10px]" : "text-xs";
  return /* @__PURE__ */ o(
    "span",
    {
      "aria-label": `${a.name} logo`,
      className: `${l} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${r ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: `${a.name} logo`,
      children: r ? /* @__PURE__ */ o("img", { "aria-hidden": "true", alt: "", className: c, src: Oa(r) }) : n ? /* @__PURE__ */ g(Tt, { children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${Xe(a.accent, 0.35)}, transparent 48%)`
            }
          }
        ),
        Xr(n, a.accent, d)
      ] }) : /* @__PURE__ */ o(Ur, { className: t ? "h-4 w-4" : "h-5 w-5", company: a })
    }
  );
}
function Xr(t, a, n) {
  const r = `relative font-semibold tracking-tight ${n}`;
  return t === "calendar" ? /* @__PURE__ */ o(da, { className: "relative h-7 w-7 text-[var(--ink)]", strokeWidth: 1.8 }) : t === "gpt" || t === "openai" ? /* @__PURE__ */ o("span", { className: r, children: "AI" }) : t === "claude" || t === "anthropic" ? /* @__PURE__ */ o("span", { className: r, children: "C" }) : t === "cursor" ? /* @__PURE__ */ o("span", { className: r, children: "C" }) : t === "gemini" || t === "google" ? /* @__PURE__ */ o("span", { className: r, children: "G" }) : t === "deepseek" ? /* @__PURE__ */ o("span", { className: r, children: "D" }) : t === "sora" ? /* @__PURE__ */ o(sr, { className: "relative h-4 w-4", strokeWidth: 1.8 }) : t === "figure" ? /* @__PURE__ */ o("span", { className: r, children: "F" }) : t === "tesla" ? /* @__PURE__ */ o("span", { className: r, children: "T" }) : t === "xai" ? /* @__PURE__ */ o("span", { className: r, children: "x" }) : /* @__PURE__ */ o("span", { className: r, style: { color: a }, children: "AI" });
}
function Sl(t) {
  return t === "square" ? "rounded-[5px]" : t === "diamond" ? "rotate-45 rounded-[4px]" : "rounded-full";
}
function On(t) {
  return t.classId !== "events";
}
function Il(t, a) {
  const n = t[a];
  if (!n || !On(n))
    return null;
  const r = t.findIndex(On);
  if (r < 0 || r === a)
    return null;
  const e = t[r];
  return e ? {
    productLine: e,
    productLineIndex: r
  } : null;
}
function kl({
  primaryLine: t,
  productLine: a,
  timelineStartDay: n
}) {
  var l;
  if (t.releases.length === 0 || a.releases.length === 0)
    return null;
  const r = ((l = t.releases[0]) == null ? void 0 : l.globalDay) ?? 0, e = a.releases.find((c) => c.globalDay >= r) ?? a.releases[0];
  return We(e.globalDay, n);
}
function Ll({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: l,
  onModelSelect: c,
  productLine: d,
  productLineIndex: f,
  renderWindow: u,
  timelineStartDay: m,
  verticalScale: h = 1
}) {
  const b = Ga(a, h), y = d.classId === "coding-harnesses", v = Lo(n.accent, Zi, 0.34), M = Sl(d.markerShape), k = a ? "h-3.5 w-3.5" : "h-4 w-4", L = a ? "absolute left-3 top-0 origin-bottom-left -translate-y-1 -rotate-[22deg]" : "absolute left-4 top-0 origin-bottom-left -translate-y-2 -rotate-[28deg] transition duration-300 group-hover:-translate-y-3", G = a ? "timeline-map-screen-label whitespace-nowrap rounded-[0.7rem] border px-1.5 py-0.5 font-bold tracking-[0.01em] shadow-[var(--soft-shadow)] backdrop-blur-sm" : "timeline-map-screen-label whitespace-nowrap rounded-[0.8rem] border bg-[var(--surface-strong)] px-2 py-1 font-bold tracking-[0.015em] shadow-[var(--soft-shadow)] group-hover:bg-[var(--surface)]", j = a ? 10 : 12, le = re(null), [Z, W] = Me(
    () => Pa.get(a) ?? null
  ), S = Ee(
    () => Z ? ll(d.releases, Z) : null,
    [d.releases, Z]
  );
  ar(() => {
    var z;
    let T = Pa.get(a);
    if (!T) {
      const _ = (z = le.current) == null ? void 0 : z.querySelector(rl);
      if (T = _ ? il(_) ?? void 0 : void 0, !T)
        return;
      Pa.set(a, T);
    }
    const q = T;
    W((_) => _ === q ? _ : q);
  });
  const K = Il(n.productLines, f), H = K ? kl({
    primaryLine: K.productLine,
    productLine: d,
    timelineStartDay: m
  }) ?? 0 : 0;
  return /* @__PURE__ */ g(
    we.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: gr },
      transition: {
        opacity: Ue
      },
      ref: le,
      className: "relative z-10 shrink-0 hover:z-40 focus-within:z-40",
      style: { height: `${b}px` },
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "absolute right-0 top-1/2 h-px -translate-y-1/2 bg-[var(--track-line)]",
            style: { left: `${H}px` }
          }
        ),
        /* @__PURE__ */ o("div", { className: "pointer-events-none absolute left-2 top-1/2 z-10 -translate-y-1/2", children: /* @__PURE__ */ g(
          "span",
          {
            className: "timeline-map-label inline-flex items-center gap-1.5 rounded-full border bg-[rgba(10,13,19,0.88)] px-2 py-1 font-mono uppercase tracking-[0.13em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)] backdrop-blur-sm",
            style: {
              borderColor: Xe(n.accent, 0.28),
              ...Ge(a ? 8 : 9)
            },
            children: [
              /* @__PURE__ */ o(Lt, { classId: d.classId, className: a ? "h-3 w-3" : "h-3.5 w-3.5" }),
              d.shortLabel
            ]
          }
        ) }),
        /* @__PURE__ */ o(je, { initial: !1, mode: "popLayout", children: d.releases.map((T, q) => {
          var ue, ge;
          const z = d.releases[q - 1], _ = t === T.articleSlug, de = _ || Qt(T.globalDay, T.endGlobalDay, u), Q = !!z && Qt((z == null ? void 0 : z.globalDay) ?? T.globalDay, T.globalDay, u), ve = T.endGlobalDay > T.globalDay && Qt(T.globalDay, T.endGlobalDay, u);
          if (!de && !Q && !ve)
            return null;
          const E = We(T.globalDay, m), P = z ? We(z.globalDay, m) : E, C = z ? Math.max(0, E - P) : 0, A = z ? el(T.gap, d.averageGap) : null, x = ia(T.globalDay, T.endGlobalDay), N = ((ue = d.latestRelease) == null ? void 0 : ue.name) === T.name && ((ge = d.latestRelease) == null ? void 0 : ge.date) === T.date, R = N ? ka(n.accent, 255, 0.12) : ka(n.accent, 255, 0.24), B = Xe(n.accent, N ? 0.52 : 0.34), ee = T.tags.includes("landmark-release"), te = N ? Xe(n.accent, 0.12) : ee ? Xe(n.accent, 0.08) : void 0, ae = T.eventKind === "event" ? "Open event" : "Open release", J = S == null ? void 0 : S.get(T.articleSlug), X = J && J.lift > 0 ? J : null, V = _ ? `0 0 0 ${a ? 3 : 4}px rgba(237, 242, 250, 0.92), 0 0 0 ${a ? 7 : 8}px color-mix(in srgb, ${n.accent} 48%, transparent)` : ee ? `0 0 0 ${a ? 5 : 6}px color-mix(in srgb, ${n.accent} 24%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 50%, transparent), 0 0 42px color-mix(in srgb, ${n.accent} 28%, transparent)` : N ? `0 0 0 ${a ? 4 : 5}px color-mix(in srgb, ${n.accent} 20%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 40%, transparent)` : `0 0 0 4px color-mix(in srgb, ${n.accent} 11%, transparent)`, oe = _ ? "saturate(1.45) brightness(1.14)" : ee ? "saturate(1.38) brightness(1.1)" : N ? "saturate(1.35) brightness(1.08)" : void 0;
          return /* @__PURE__ */ g(
            we.div,
            {
              initial: { opacity: 0, scale: 0.84 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.84 },
              transition: {
                opacity: Ue,
                scale: Ue
              },
              className: "absolute inset-0",
              children: [
                z && Q ? /* @__PURE__ */ g(Tt, { children: [
                  /* @__PURE__ */ o(
                    we.div,
                    {
                      initial: { opacity: 0, scaleX: 0 },
                      animate: { opacity: y ? 0.72 : 0.58, scaleX: 1 },
                      transition: Ue,
                      className: `pointer-events-none absolute top-1/2 -translate-y-1/2 origin-left ${y ? "h-px" : "h-[2px]"}`,
                      style: {
                        backgroundColor: y ? v : n.accent,
                        left: `${P}px`,
                        width: `${C}px`
                      }
                    }
                  ),
                  /* @__PURE__ */ o(
                    "div",
                    {
                      className: "timeline-gap absolute top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50",
                      style: {
                        left: `${P + C / 2}px`,
                        "--gap-world-width": C
                      },
                      children: /* @__PURE__ */ g(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Gap of ${La(T.gap)} between ${z.name} and ${T.name}`,
                          onPointerDown: (U) => U.stopPropagation(),
                          onClick: (U) => U.stopPropagation(),
                          className: "group/gap relative flex h-6 cursor-default items-center justify-center outline-none",
                          children: [
                            /* @__PURE__ */ g(
                              "span",
                              {
                                className: "timeline-gap-collapse timeline-gap-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2 py-1 font-mono uppercase tracking-[0.1em] text-[var(--ink)] shadow-[var(--soft-shadow)] group-focus-visible/gap:border-[var(--edge-strong)]",
                                style: Ge(a ? 9 : 10),
                                children: [
                                  T.gap,
                                  "d"
                                ]
                              }
                            ),
                            /* @__PURE__ */ g(
                              "span",
                              {
                                role: "tooltip",
                                className: "timeline-gap-tooltip pointer-events-none absolute left-1/2 top-full z-50 flex w-max max-w-[260px] flex-col gap-1 rounded-xl border border-[var(--edge-strong)] bg-[var(--surface-strong)] px-3 py-2 text-left opacity-0 shadow-[var(--panel-shadow)] transition-opacity duration-200 group-hover/gap:opacity-100 group-focus-visible/gap:opacity-100",
                                children: [
                                  /* @__PURE__ */ g("span", { className: "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                                    z.name,
                                    " → ",
                                    T.name
                                  ] }),
                                  /* @__PURE__ */ g("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: [
                                    La(T.gap),
                                    " gap"
                                  ] }),
                                  /* @__PURE__ */ g("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                    z.dateLabel,
                                    " – ",
                                    T.dateLabel
                                  ] }),
                                  A ? /* @__PURE__ */ o("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: A }) : null
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ] }) : null,
                ve ? /* @__PURE__ */ o(
                  we.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: N ? 0.72 : 0.54, scaleX: 1 },
                    transition: Ue,
                    className: `absolute top-1/2 z-10 origin-left -translate-y-1/2 rounded-full ${a ? "h-[7px]" : "h-2"}`,
                    style: {
                      backgroundColor: n.accent,
                      boxShadow: `0 0 18px color-mix(in srgb, ${n.accent} 34%, transparent)`,
                      left: `${E}px`,
                      minWidth: a ? "8px" : "10px",
                      width: `${x}px`
                    }
                  }
                ) : null,
                de && X ? (
                  // Sits below every release (z-20) so it passes behind neighbouring labels.
                  /* @__PURE__ */ o(
                    "div",
                    {
                      "aria-hidden": "true",
                      "data-timeline-label-leader": !0,
                      className: "pointer-events-none absolute top-1/2 z-[15] w-px",
                      style: {
                        left: `${E}px`,
                        height: `${X.leaderHeight}px`,
                        transform: "translate(-50%, -100%)",
                        background: `linear-gradient(to top, ${Xe(n.accent, 0.2)}, ${Xe(n.accent, _ ? 0.9 : 0.6)})`
                      }
                    }
                  )
                ) : null,
                de ? /* @__PURE__ */ o(
                  we.div,
                  {
                    initial: { opacity: 0, scale: 0.82, y: a ? 6 : 8 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.82, y: a ? 6 : 8 },
                    transition: {
                      opacity: Ue,
                      scale: Ue,
                      y: Ue
                    },
                    className: `absolute top-1/2 -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50 ${_ ? "z-30" : "z-20"}`,
                    style: { left: `${E}px` },
                    children: /* @__PURE__ */ o("div", { className: "overflow-visible", children: /* @__PURE__ */ g(
                      "button",
                      {
                        type: "button",
                        "data-timeline-company-id": n.id,
                        "data-timeline-pin": !0,
                        "data-timeline-product-line-id": d.id,
                        "data-timeline-slug": T.articleSlug,
                        "aria-current": _ ? "page" : void 0,
                        "aria-label": `${ae} for ${T.name}, ${T.dateRangeLabel}`,
                        onClick: (U) => {
                          U.stopPropagation(), c(T.articleSlug);
                        },
                        onPointerDown: (U) => U.stopPropagation(),
                        className: `group relative block size-0 overflow-visible cursor-pointer text-left outline-none ${_ ? "timeline-pin--selected" : ""}`,
                        children: [
                          /* @__PURE__ */ g("div", { className: "timeline-pin-marker-stack relative z-0 size-0 shrink-0", children: [
                            ee ? /* @__PURE__ */ o(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: `${a ? "h-8 w-8" : "h-10 w-10"} timeline-pin-landmark-aura absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ${M}`,
                                style: { "--pin-accent": n.accent }
                              }
                            ) : null,
                            _ ? /* @__PURE__ */ o(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: `timeline-pin-selection-ring ${a ? "timeline-pin-selection-ring--compact" : ""}`,
                                style: { "--pin-accent": n.accent }
                              }
                            ) : null,
                            /* @__PURE__ */ o(
                              "div",
                              {
                                className: `${k} timeline-pin-marker absolute left-0 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 border-[3px] border-[var(--surface-strong)] transition duration-300 ${M} ${_ ? "timeline-pin-marker--selected scale-[1.18]" : "group-hover:scale-[1.22] group-focus-visible:scale-[1.22]"}`,
                                style: {
                                  backgroundColor: n.accent,
                                  boxShadow: V,
                                  filter: oe
                                }
                              }
                            )
                          ] }),
                          /* @__PURE__ */ o(
                            "div",
                            {
                              className: `${L} z-[2]`,
                              style: X ? { marginLeft: `${X.shiftX}px`, marginTop: `${-X.lift}px` } : void 0,
                              children: /* @__PURE__ */ o(
                                "div",
                                {
                                  className: `${G} ${// The fluid behind the timeline redraws every frame, so each
                                  // backdrop blur is re-rendered every frame too. Desktop labels
                                  // sit on the ~opaque surface unless they carry an accent tint,
                                  // so only blur where the backdrop actually shows through.
                                  a || te && !_ ? "backdrop-blur-sm" : ""} ${_ ? "timeline-pin-label--selected" : ""}`,
                                  style: {
                                    backgroundColor: _ ? "var(--surface-strong)" : te,
                                    borderColor: _ ? Xe(n.accent, 0.88) : B,
                                    borderWidth: _ ? 2 : void 0,
                                    color: _ ? ka(n.accent, 255, 0.06) : R,
                                    boxShadow: _ ? `0 0 0 1px color-mix(in srgb, ${n.accent} 55%, transparent)` : void 0,
                                    textShadow: _ ? "0 1px 14px rgba(0, 0, 0, 0.62)" : N ? "0 1px 12px rgba(0, 0, 0, 0.5)" : "0 1px 10px rgba(0, 0, 0, 0.38)",
                                    filter: _ ? "saturate(1.28)" : N ? "saturate(1.18)" : void 0,
                                    ...Ge(j)
                                  },
                                  children: T.name
                                }
                              )
                            }
                          ),
                          a ? null : /* @__PURE__ */ g(
                            "div",
                            {
                              role: "tooltip",
                              className: "timeline-gap-tooltip pointer-events-none absolute left-1/2 top-8 z-50 flex w-max max-w-[280px] flex-col gap-1 rounded-xl border border-[var(--edge-strong)] bg-[var(--surface-strong)] px-3 py-2 text-left opacity-0 shadow-[var(--panel-shadow)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                              children: [
                                /* @__PURE__ */ g("span", { className: "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                                  n.name,
                                  " · ",
                                  d.shortLabel
                                ] }),
                                /* @__PURE__ */ o("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: T.name }),
                                /* @__PURE__ */ g("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                  T.eventTypeLabel,
                                  " · ",
                                  T.dateRangeLabel
                                ] }),
                                z ? /* @__PURE__ */ g("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: [
                                  La(T.gap),
                                  " after ",
                                  z.name
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
            T.articleSlug
          );
        }) }),
        d.latestRelease && e > d.latestRelease.endGlobalDay && Qt(d.latestRelease.endGlobalDay, e, u) ? /* @__PURE__ */ g(Tt, { children: [
          /* @__PURE__ */ o(
            we.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: y ? 0.48 : 0.42, scaleX: 1 },
              transition: Ue,
              className: `absolute top-1/2 origin-left -translate-y-1/2 ${y ? "h-px" : "quiet-extension-flow h-[2px]"}`,
              style: {
                backgroundColor: y ? v : void 0,
                left: `${We(d.latestRelease.endGlobalDay, m)}px`,
                "--quiet-flow-duration": `${a ? 5.4 : 6.4}s`,
                "--quiet-line-color": n.accent,
                width: `${ia(d.latestRelease.endGlobalDay, e)}px`
              }
            }
          ),
          /* @__PURE__ */ o(
            "div",
            {
              className: "absolute top-1/2 z-0 -translate-y-1/2 pl-3",
              style: { left: `${We(e, m)}px` },
              children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ g(
                "div",
                {
                  className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1 font-mono uppercase tracking-[0.14em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                  style: Ge(a ? 9 : 10),
                  children: [
                    "+",
                    Va(d, e),
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
const _l = _t.memo(Ll);
function Pl({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: l,
  onCompanyBlur: c,
  onCompanyFocus: d,
  onModelSelect: f,
  renderWindow: u,
  timelineStartDay: m,
  verticalScale: h = 1
}) {
  const { lineGap: b } = ja(n.productLines.length, a, h), y = () => d == null ? void 0 : d(n.id), v = () => c == null ? void 0 : c();
  return /* @__PURE__ */ o(
    we.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: gr },
      transition: {
        opacity: Ue
      },
      className: "relative flex flex-col justify-center",
      onClick: (M) => {
        const k = M.target;
        k instanceof Element && k.closest("button, a, input, label, select, textarea, [data-row-focus-label]") || y();
      },
      onMouseEnter: y,
      onMouseLeave: v,
      onPointerEnter: (M) => {
        M.pointerType !== "touch" && y();
      },
      onPointerLeave: (M) => {
        M.pointerType !== "touch" && v();
      },
      style: { height: `${qa(n, a, h)}px`, gap: `${b}px` },
      children: /* @__PURE__ */ o(je, { initial: !1, mode: "popLayout", children: n.productLines.map((M, k) => /* @__PURE__ */ o(
        _l,
        {
          activeArticleSlug: t,
          compact: a,
          company: n,
          companyIndex: r,
          currentGlobalDay: e,
          maxDays: l,
          onModelSelect: f,
          productLine: M,
          productLineIndex: k,
          renderWindow: u,
          timelineStartDay: m,
          verticalScale: h
        },
        `${n.id}-${M.id}`
      )) })
    }
  );
}
function Wn(t, a) {
  return a ? t.productLines.some(
    (n) => n.releases.some((r) => r.articleSlug === a)
  ) : !1;
}
const Yr = _t.memo(
  Pl,
  (t, a) => {
    const n = Wn(t.company, t.activeArticleSlug), r = Wn(a.company, a.activeArticleSlug);
    return t.compact === a.compact && t.company === a.company && t.companyIndex === a.companyIndex && t.currentGlobalDay === a.currentGlobalDay && t.maxDays === a.maxDays && t.timelineStartDay === a.timelineStartDay && t.verticalScale === a.verticalScale && Ko(t.renderWindow, a.renderWindow) && n === r && (!n || t.activeArticleSlug === a.activeArticleSlug);
  }
);
function Fl({
  compact: t = !1,
  company: a,
  currentGlobalDay: n,
  index: r,
  maxSummaryQuietDays: e
}) {
  var u, m;
  const l = at(), c = Va(a, n), d = Qo(c, e), f = a.productLines.length > 1;
  return /* @__PURE__ */ g(
    we.div,
    {
      layout: !0,
      initial: { opacity: 0, y: t ? 12 : 14 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: t ? 12 : 14 },
      transition: {
        layout: qi,
        opacity: Ue,
        y: Ue
      },
      className: "rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] p-4",
      children: [
        /* @__PURE__ */ g("div", { className: "min-w-0", children: [
          /* @__PURE__ */ g("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ o(Ur, { className: "h-7 w-7", company: a }),
            /* @__PURE__ */ g("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ o("p", { className: "truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.name }),
              /* @__PURE__ */ g("p", { className: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: [
                l.significanceLabel,
                " ",
                a.significanceScore
              ] })
            ] })
          ] }),
          f ? /* @__PURE__ */ o("div", { className: "mt-3 space-y-2", children: a.productLines.map((h) => {
            var b;
            return /* @__PURE__ */ g("div", { className: "min-w-0 rounded-[0.85rem] border border-[var(--edge)] bg-[rgba(255,255,255,0.02)] px-3 py-2", children: [
              /* @__PURE__ */ g("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ g("span", { className: "inline-flex min-w-0 items-center gap-2 text-xs font-semibold tracking-tight text-[var(--ink)]", children: [
                  /* @__PURE__ */ o(Lt, { classId: h.classId, className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ o("span", { className: "truncate", children: h.shortLabel })
                ] }),
                /* @__PURE__ */ o("span", { className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]", children: h.significanceScore })
              ] }),
              /* @__PURE__ */ o("p", { className: "mt-1 truncate text-sm text-[var(--ink-soft)]", children: ((b = h.latestRelease) == null ? void 0 : b.name) ?? "No releases" })
            ] }, `${a.id}-${h.id}-summary-line`);
          }) }) : /* @__PURE__ */ g(Tt, { children: [
            /* @__PURE__ */ o("p", { className: "mt-3 text-base font-semibold tracking-tight text-[var(--ink)]", children: Jo(c) }),
            /* @__PURE__ */ g("div", { className: "mt-2 min-w-0", children: [
              /* @__PURE__ */ o("p", { className: "truncate text-sm text-[var(--ink-soft)]", children: ((u = a.latestRelease) == null ? void 0 : u.name) ?? "No releases" }),
              /* @__PURE__ */ o("p", { className: "mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]", children: ((m = a.latestRelease) == null ? void 0 : m.dateRangeLabel) ?? "Date unavailable" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "mt-4 h-1.5 rounded-full bg-[var(--edge)]", children: /* @__PURE__ */ o(
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
const zr = _t.memo(Fl);
function $l(t) {
  const a = t.companyLogoMark === "openai" ? "gpt" : t.companyLogoMark === "google" ? "gemini" : t.companyLogoMark === "anthropic" ? "claude" : t.companyLogoMark;
  return {
    modelLabel: t.name,
    modelMark: a
  };
}
function Hn({
  accent: t,
  label: a,
  mark: n,
  size: r
}) {
  const e = r === "large", l = he().logoAssetPaths[n], c = l && Mr(n), d = c ? e ? "h-16 w-28 rounded-[1.25rem]" : "h-11 w-20 rounded-[0.95rem]" : e ? "h-16 w-16 rounded-[1.25rem]" : "h-11 w-11 rounded-[0.95rem]", f = c ? e ? "relative h-5 w-20 object-contain" : "relative h-3 w-14 object-contain" : e ? "relative h-10 w-10 object-contain" : "relative h-7 w-7 object-contain", u = e ? "text-lg" : "text-sm", m = n === "calendar" ? `${a} event icon` : `${a} logo`;
  return /* @__PURE__ */ g(
    "span",
    {
      "aria-label": m,
      className: `${d} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${l ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: m,
      children: [
        l ? null : /* @__PURE__ */ o(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${Xe(t, 0.35)}, transparent 48%)`
            }
          }
        ),
        l ? /* @__PURE__ */ o("img", { "aria-hidden": "true", alt: "", className: f, src: Oa(l) }) : Xr(n, t, u)
      ]
    }
  );
}
function Vn({
  label: t,
  onNavigate: a,
  slug: n,
  title: r
}) {
  return !n || !r ? /* @__PURE__ */ g("div", { className: "rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--muted)]", children: [
    t,
    ": none"
  ] }) : /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: () => a(n),
      className: "group rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-left transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.99]",
      children: [
        /* @__PURE__ */ o("span", { className: "block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: t }),
        /* @__PURE__ */ g("span", { className: "mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
          r,
          /* @__PURE__ */ o(Mi, { className: "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5", strokeWidth: 1.8 })
        ] })
      ]
    }
  );
}
function Ul({ media: t }) {
  const [a, n] = Me(!1);
  return a ? null : /* @__PURE__ */ g("figure", { className: "mt-7 overflow-hidden rounded-[1.25rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)]", children: [
    /* @__PURE__ */ o(
      "img",
      {
        src: Oa(t.src),
        alt: t.alt,
        className: "w-full bg-black object-contain",
        loading: "lazy",
        onError: () => n(!0)
      }
    ),
    t.caption ? /* @__PURE__ */ o("figcaption", { className: "border-t border-[var(--edge)] px-4 py-3 text-xs leading-5 text-[var(--ink-soft)]", children: t.caption }) : null
  ] });
}
const Gn = 640, jn = 448, Br = 96, Xl = 4096, qn = 8, Zn = 12e3, Kn = 10, Ua = 1300, Yl = 3, Qn = 0.09, zl = 0.35;
function Bl(t) {
  let a = 2166136261;
  for (let n = 0; n < t.length; n += 1)
    a ^= t.charCodeAt(n), a = Math.imul(a, 16777619);
  return a >>> 0;
}
function Ol(t) {
  let a = t || 1;
  return () => {
    a = a + 1831565813 | 0;
    let n = Math.imul(a ^ a >>> 15, 1 | a);
    return n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n, ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function Wl(t) {
  const a = t.replace("#", ""), n = a.length === 3 ? a.split("").map((e) => e + e).join("") : a, r = Number.parseInt(n, 16);
  return !Number.isFinite(r) || n.length !== 6 ? [125, 145, 175] : [r >> 16 & 255, r >> 8 & 255, r & 255];
}
function Rt(t, a, n) {
  return [
    t[0] + (a[0] - t[0]) * n,
    t[1] + (a[1] - t[1]) * n,
    t[2] + (a[2] - t[2]) * n
  ];
}
const Jn = [
  [-0.295, 0.62],
  [0.31, 0.42],
  [-1.04, 0.25],
  [-0.78, 0.18]
], er = [
  [0.5667, -0.5],
  [0.5, -0.55],
  [0.6, -0.45]
];
function Hl(t) {
  const a = Ol(Bl(t)), n = Math.floor(a() * 4), r = a() * Math.PI * 2, e = 0.768 + a() * 0.034;
  let l = Math.cos(r) * e, c = Math.sin(r) * e, d = 0;
  if (n === 2) {
    const f = Jn[Math.floor(a() * Jn.length)];
    l = f[0] + (a() - 0.5) * 0.05, c = f[1] + (a() - 0.5) * 0.05;
  } else if (n === 3) {
    const f = er[Math.floor(a() * er.length)];
    l = f[0] + (a() - 0.5) * 0.03, d = f[1] + (a() - 0.5) * 0.03, c = 0;
  }
  return {
    variant: n,
    cRe: l,
    cIm: c,
    phoenixRe: d,
    zoom: 0.52 + a() * 0.33,
    rotation: a() * Math.PI * 2,
    centerX: (a() - 0.5) * 0.3,
    centerY: (a() - 0.5) * 0.3
  };
}
function Vl(t, a, n) {
  let r = a, e = n, l = 0, c = 0;
  for (let d = 0; d < Br; d += 1) {
    const f = r * r + e * e;
    if (f > Xl)
      return d + 1 - Math.log(Math.log(f) * 0.5) / Math.LN2;
    let u, m;
    if (t.variant === 1) {
      const h = Math.abs(r);
      u = h * h - e * e + t.cRe, m = 2 * h * e + t.cIm;
    } else t.variant === 2 ? (u = r * r - e * e + t.cRe, m = -2 * r * e + t.cIm) : t.variant === 3 ? (u = r * r - e * e + t.cRe + t.phoenixRe * l, m = 2 * r * e + t.phoenixRe * c) : (u = r * r - e * e + t.cRe, m = 2 * r * e + t.cIm);
    l = r, c = e, r = u, e = m;
  }
  return -1;
}
function Gl({ accent: t, seedKey: a }) {
  const n = re(null);
  return Re(() => {
    const r = n.current, e = r == null ? void 0 : r.getContext("2d");
    if (!r || !e)
      return;
    const l = Hl(a), c = Wl(t), d = [8, 11, 16], f = [
      { at: 0, rgb: d },
      { at: 0.38, rgb: Rt(d, c, 0.45) },
      { at: 0.62, rgb: c },
      { at: 0.86, rgb: Rt(c, [235, 240, 248], 0.55) },
      { at: 1, rgb: [240, 244, 250] }
    ], u = (B) => {
      for (let ee = 1; ee < f.length; ee += 1)
        if (B <= f[ee].at) {
          const te = f[ee - 1], me = f[ee], ae = (B - te.at) / (me.at - te.at);
          return Rt(te.rgb, me.rgb, ae);
        }
      return f[f.length - 1].rgb;
    }, m = Gn, h = jn, b = m * h;
    e.clearRect(0, 0, m, h), e.imageSmoothingEnabled = !0, e.imageSmoothingQuality = "high";
    const y = Math.cos(l.rotation), v = Math.sin(l.rotation), M = m / h, k = Rt(d, c, 0.28), L = Rt(c, [240, 244, 250], 0.7), G = (B) => {
      if (B < 0)
        return 1;
      const ee = Math.min(
        1,
        Math.max(0, Math.log(1 + B) / Math.log(1 + Br))
      );
      return Math.pow(ee, 1.1);
    }, j = (B, ee, te, me) => {
      const ae = ((ee + 0.5) / me * 2 - 1) / l.zoom, J = ((B + 0.5) / te * 2 - 1) * M / l.zoom, X = J * y - ae * v + l.centerX, V = J * v + ae * y + l.centerY, oe = Vl(l, X, V);
      return {
        interior: oe < 0,
        shaped: G(oe)
      };
    }, le = Math.ceil(m / qn), Z = Math.ceil(h / qn), W = document.createElement("canvas");
    W.width = le, W.height = Z;
    const S = W.getContext("2d"), K = document.createElement("canvas");
    K.width = m, K.height = h;
    const H = K.getContext("2d");
    if (!S || !H)
      return;
    const T = S.createImageData(le, Z), q = H.createImageData(m, h), z = new Uint8ClampedArray(b * 3), _ = new Uint8ClampedArray(b), de = new Float32Array(b), Q = (B) => 1 - Math.pow(1 - B, 3);
    let ve = !1, E = 0, P = "base", C = 0, A = 0, x = 0, N = 0;
    const R = () => {
      if (ve)
        return;
      if (P === "base") {
        const ae = Math.max(1, Math.floor(Zn / le)), J = Math.min(C + ae, Z);
        for (let X = C; X < J; X += 1)
          for (let V = 0; V < le; V += 1) {
            const oe = j(V, X, le, Z), ue = (X * le + V) * 4, ge = oe.interior ? k : u(oe.shaped);
            T.data[ue] = ge[0], T.data[ue + 1] = ge[1], T.data[ue + 2] = ge[2], T.data[ue + 3] = oe.interior ? 150 : Math.round(30 + oe.shaped * 225);
          }
        C = J, C >= Z && (S.putImageData(T, 0, 0), P = "baseFade"), E = window.requestAnimationFrame(R);
        return;
      }
      if (P === "baseFade") {
        A += 1, e.clearRect(0, 0, m, h), e.globalAlpha = A / Kn, e.drawImage(W, 0, 0, m, h), e.globalAlpha = 1, A >= Kn && (P = "full"), E = window.requestAnimationFrame(R);
        return;
      }
      if (P === "full") {
        const ae = Math.max(1, Math.floor(Zn / m)), J = Math.min(x + ae, h);
        for (let X = x; X < J; X += 1)
          for (let V = 0; V < m; V += 1) {
            const oe = j(V, X, m, h), ue = X * m + V, ge = oe.interior ? k : u(oe.shaped);
            z[ue * 3] = ge[0], z[ue * 3 + 1] = ge[1], z[ue * 3 + 2] = ge[2], _[ue] = oe.interior ? 150 : Math.round(30 + oe.shaped * 225), de[ue] = oe.shaped;
          }
        x = J, x >= h && (P = "reveal"), E = window.requestAnimationFrame(R);
        return;
      }
      if (N += 1, N % Yl !== 0 && N < Ua) {
        E = window.requestAnimationFrame(R);
        return;
      }
      const B = Math.min(1, N / Ua), ee = Q(B) * (1 + Qn * 2), te = q.data;
      for (let ae = 0; ae < b; ae += 1) {
        const J = (ee - de[ae]) / Qn, X = J <= 0 ? 0 : J >= 1 ? 1 : J, V = X * (1 - X) * 2 * zl, oe = ae * 4;
        te[oe] = z[ae * 3] + (L[0] - z[ae * 3]) * V, te[oe + 1] = z[ae * 3 + 1] + (L[1] - z[ae * 3 + 1]) * V, te[oe + 2] = z[ae * 3 + 2] + (L[2] - z[ae * 3 + 2]) * V, te[oe + 3] = _[ae] * X + V * 30;
      }
      H.putImageData(q, 0, 0), e.clearRect(0, 0, m, h);
      const me = 1 - Q(B);
      me > 3e-3 && (e.globalAlpha = me, e.drawImage(W, 0, 0, m, h), e.globalAlpha = 1), e.drawImage(K, 0, 0), N < Ua && (E = window.requestAnimationFrame(R));
    };
    return E = window.requestAnimationFrame(R), () => {
      ve = !0, window.cancelAnimationFrame(E);
    };
  }, [t, a]), /* @__PURE__ */ o(
    "div",
    {
      "aria-hidden": !0,
      className: "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden md:h-[34rem] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.5)_58%,transparent_96%)]",
      children: /* @__PURE__ */ o(
        "canvas",
        {
          ref: n,
          width: Gn,
          height: jn,
          className: "h-full w-full object-cover opacity-75 blur-[1px]"
        }
      )
    }
  );
}
function jl({
  entry: t,
  onBack: a,
  onNavigate: n,
  requestedSlug: r
}) {
  const e = at(), l = (t == null ? void 0 : t.article) ?? null, c = t ? t.eventKind === "event" ? {
    modelLabel: t.name,
    modelMark: "calendar"
  } : (l == null ? void 0 : l.logo) ?? $l(t) : null, d = (l == null ? void 0 : l.title) ?? (t == null ? void 0 : t.name) ?? e.routeMissingTitle, f = (l == null ? void 0 : l.summary) ?? (t ? `${t.name} is tracked as a ${t.eventTypeLabel.toLowerCase()} from ${t.companyName} in the ${t.productLineLabel} line.` : e.routeMissingDetail.replace("{slug}", r));
  return /* @__PURE__ */ g(
    we.aside,
    {
      initial: { opacity: 0, x: 72 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 72 },
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      className: "fixed inset-y-0 right-0 z-40 w-full overflow-y-auto border-l border-[var(--edge-strong)] bg-[rgba(8,11,16,0.98)] shadow-[0_34px_100px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl md:w-[min(760px,58vw)]",
      children: [
        t ? /* @__PURE__ */ o(Gl, { accent: t.accent, seedKey: r }) : null,
        /* @__PURE__ */ g("article", { className: "min-h-full px-5 py-5 md:px-8 md:py-8", children: [
          /* @__PURE__ */ g("div", { className: "sticky top-0 z-20 -mx-5 flex items-center justify-between gap-3 border-b border-[var(--edge)] bg-[rgba(8,11,16,0.94)] px-5 py-4 shadow-[0_18px_34px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl md:static md:mx-0 md:border-b-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none", children: [
            /* @__PURE__ */ g(
              "button",
              {
                type: "button",
                onClick: a,
                className: "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                children: [
                  /* @__PURE__ */ o(vi, { className: "h-4 w-4", strokeWidth: 1.8 }),
                  e.articleBackLabel
                ]
              }
            ),
            t ? /* @__PURE__ */ g("span", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: [
              /* @__PURE__ */ o(da, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
              t.dateRangeLabel
            ] }) : null
          ] }),
          t && c ? /* @__PURE__ */ g("div", { className: "mt-9 flex items-start gap-4", children: [
            /* @__PURE__ */ o(Hn, { accent: t.accent, label: c.modelLabel, mark: c.modelMark, size: "large" }),
            /* @__PURE__ */ o(Hn, { accent: t.accent, label: t.companyName, mark: t.companyLogoMark, size: "small" })
          ] }) : null,
          /* @__PURE__ */ o("p", { className: "mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: (l == null ? void 0 : l.eyebrow) ?? (t == null ? void 0 : t.eventTypeLabel) ?? "Unknown route" }),
          /* @__PURE__ */ o("h1", { className: "mt-3 max-w-[12ch] text-4xl leading-none tracking-tighter text-[var(--ink)] md:text-6xl", children: d }),
          /* @__PURE__ */ o("p", { className: "mt-5 max-w-[68ch] text-base leading-8 text-[var(--ink-soft)] md:text-lg", children: (l == null ? void 0 : l.dek) ?? f }),
          l != null && l.media ? /* @__PURE__ */ o(Ul, { media: l.media }) : null,
          t ? /* @__PURE__ */ o("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: $i(
            (l == null ? void 0 : l.facts) ?? [
              { label: "Company", value: t.companyName },
              { label: "Product line", value: t.productLineLabel },
              { label: t.eventKind === "event" ? "Event date" : "Release date", value: t.dateRangeLabel },
              { label: "Type", value: t.eventTypeLabel }
            ],
            { date: t.date, eventKind: t.eventKind }
          ).map((u) => /* @__PURE__ */ g("div", { className: "border-t border-[var(--edge)] pt-3", children: [
            /* @__PURE__ */ o("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: u.label }),
            /* @__PURE__ */ o("p", { className: "mt-1 text-sm font-semibold text-[var(--ink)]", children: u.value })
          ] }, `${u.label}-${u.value}`)) }) : null,
          /* @__PURE__ */ g("section", { className: "mt-9 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ g("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
              /* @__PURE__ */ o(or, { className: "h-4 w-4", strokeWidth: 1.8 }),
              "Summary"
            ] }),
            /* @__PURE__ */ o("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: f }),
            l != null && l.impact ? /* @__PURE__ */ o("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: l.impact }) : null
          ] }),
          l == null ? void 0 : l.sections.map((u) => /* @__PURE__ */ g("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ o("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: u.heading }),
            /* @__PURE__ */ o("div", { className: "mt-4 space-y-4", children: u.body.map((m) => /* @__PURE__ */ o("p", { className: "text-base leading-8 text-[var(--ink-soft)]", children: m }, m)) })
          ] }, u.heading)),
          l != null && l.sources.length ? /* @__PURE__ */ g("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ o("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: "Sources" }),
            /* @__PURE__ */ o("div", { className: "mt-4 space-y-2", children: l.sources.map((u) => /* @__PURE__ */ g(
              "a",
              {
                href: u.url,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]",
                children: [
                  /* @__PURE__ */ o("span", { children: u.label }),
                  /* @__PURE__ */ o(xi, { className: "h-4 w-4 shrink-0", strokeWidth: 1.8 })
                ]
              },
              u.url
            )) })
          ] }) : null,
          t ? /* @__PURE__ */ g("div", { className: "mt-8 grid gap-3 border-t border-[var(--edge)] pt-7 sm:grid-cols-2", children: [
            /* @__PURE__ */ o(Vn, { label: "Previous", onNavigate: n, slug: t.previousSlug, title: t.previousName }),
            /* @__PURE__ */ o(Vn, { label: "Next", onNavigate: n, slug: t.nextSlug, title: t.nextName })
          ] }) : /* @__PURE__ */ o("div", { className: "mt-8 rounded-[1.1rem] border border-[var(--edge)] bg-[var(--surface)] p-5", children: /* @__PURE__ */ o("p", { className: "text-sm leading-6 text-[var(--ink-soft)]", children: "This route does not match a known model or event entry." }) })
        ] })
      ]
    },
    "model-article-panel"
  );
}
function tr({
  detail: t,
  title: a
}) {
  const n = at();
  return /* @__PURE__ */ o("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ o("div", { className: "mx-auto flex min-h-[100dvh] max-w-[880px] items-center px-5 py-10 md:px-8", children: /* @__PURE__ */ g("div", { className: "rounded-[2rem] border border-[var(--edge)] bg-[var(--surface)] p-8 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]", children: n.statusEyebrow }),
    /* @__PURE__ */ o("h1", { className: "mt-4 text-4xl tracking-tighter text-[var(--ink)]", children: a }),
    /* @__PURE__ */ o("p", { className: "mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--ink-soft)]", children: t })
  ] }) }) });
}
const ql = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`, Zl = `
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
`, Kl = `
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
`, Ql = `
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
`, Jl = `
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
`, es = `
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
`, ts = `
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
`, as = `
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
`, ns = `
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
function rs() {
  const t = re(null), a = re(!1), n = re(!1);
  return Re(() => {
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
    const l = (I, D) => {
      const Y = e.createShader(I);
      return Y ? (e.shaderSource(Y, D), e.compileShader(Y), e.getShaderParameter(Y, e.COMPILE_STATUS) ? Y : (console.warn(e.getShaderInfoLog(Y)), e.deleteShader(Y), null)) : null;
    }, c = (I) => {
      const D = l(e.VERTEX_SHADER, ql), Y = l(e.FRAGMENT_SHADER, I);
      if (!D || !Y)
        return D && e.deleteShader(D), Y && e.deleteShader(Y), null;
      const $ = e.createProgram();
      return $ ? (e.attachShader($, D), e.attachShader($, Y), e.linkProgram($), e.deleteShader(D), e.deleteShader(Y), e.getProgramParameter($, e.LINK_STATUS) ? $ : (console.warn(e.getProgramInfoLog($)), e.deleteProgram($), null)) : (e.deleteShader(D), e.deleteShader(Y), null);
    }, d = c(ns), f = c(Zl), u = c(Kl), m = c(Ql), h = c(Jl), b = c(es), y = c(ts), v = c(as), M = () => {
      [d, f, u, m, h, b, y, v].forEach((I) => {
        I && e.deleteProgram(I);
      });
    };
    if (!d || !f || !u || !m || !h || !b || !y || !v) {
      M();
      return;
    }
    const k = e.createBuffer();
    if (!k) {
      M();
      return;
    }
    e.bindBuffer(e.ARRAY_BUFFER, k), e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      e.STATIC_DRAW
    );
    const L = (I) => {
      const D = e.getAttribLocation(I, "aPosition");
      D < 0 || (e.bindBuffer(e.ARRAY_BUFFER, k), e.enableVertexAttribArray(D), e.vertexAttribPointer(D, 2, e.FLOAT, !1, 0, 0));
    }, G = {
      resolution: e.getUniformLocation(d, "uResolution"),
      fluidTexel: e.getUniformLocation(d, "uFluidTexel"),
      widgetRect: e.getUniformLocation(d, "uWidgetRect"),
      elapsedTime: e.getUniformLocation(d, "uElapsedTime"),
      emitterDebug: e.getUniformLocation(d, "uEmitterDebug"),
      emitterSeed: e.getUniformLocation(d, "uEmitterSeed"),
      velocityMap: e.getUniformLocation(d, "uVelocityMap"),
      dyeMap: e.getUniformLocation(d, "uDyeMap")
    }, j = {
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
    }, le = {
      velocityMap: e.getUniformLocation(u, "uVelocityMap"),
      texel: e.getUniformLocation(u, "uTexel"),
      aspect: e.getUniformLocation(u, "uAspect")
    }, Z = {
      velocityMap: e.getUniformLocation(m, "uVelocityMap"),
      curlMap: e.getUniformLocation(m, "uCurlMap"),
      texel: e.getUniformLocation(m, "uTexel"),
      deltaTime: e.getUniformLocation(m, "uDeltaTime"),
      strength: e.getUniformLocation(m, "uStrength"),
      aspect: e.getUniformLocation(m, "uAspect")
    }, W = {
      velocityMap: e.getUniformLocation(h, "uVelocityMap"),
      texel: e.getUniformLocation(h, "uTexel"),
      obstacleRect: e.getUniformLocation(h, "uObstacleRect"),
      aspect: e.getUniformLocation(h, "uAspect")
    }, S = {
      pressureMap: e.getUniformLocation(b, "uPressureMap"),
      divergenceMap: e.getUniformLocation(b, "uDivergenceMap"),
      texel: e.getUniformLocation(b, "uTexel"),
      obstacleRect: e.getUniformLocation(b, "uObstacleRect"),
      aspect: e.getUniformLocation(b, "uAspect")
    }, K = {
      velocityMap: e.getUniformLocation(y, "uVelocityMap"),
      pressureMap: e.getUniformLocation(y, "uPressureMap"),
      texel: e.getUniformLocation(y, "uTexel"),
      obstacleRect: e.getUniformLocation(y, "uObstacleRect"),
      aspect: e.getUniformLocation(y, "uAspect")
    }, H = {
      velocityMap: e.getUniformLocation(v, "uVelocityMap"),
      dyeMap: e.getUniformLocation(v, "uDyeMap"),
      pointerPosition: e.getUniformLocation(v, "uPointerPosition"),
      pointerVelocity: e.getUniformLocation(v, "uPointerVelocity"),
      pointerActive: e.getUniformLocation(v, "uPointerActive"),
      pointerRadius: e.getUniformLocation(v, "uPointerRadius"),
      deltaTime: e.getUniformLocation(v, "uDeltaTime"),
      elapsedTime: e.getUniformLocation(v, "uElapsedTime"),
      aspect: e.getUniformLocation(v, "uAspect"),
      emitterSeed: e.getUniformLocation(v, "uEmitterSeed")
    }, T = (I) => {
      const D = e.createTexture(), Y = e.createFramebuffer();
      if (!D || !Y)
        return D && e.deleteTexture(D), Y && e.deleteFramebuffer(Y), !1;
      e.bindTexture(e.TEXTURE_2D, D), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, I, null), e.bindFramebuffer(e.FRAMEBUFFER, Y), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, D, 0);
      const $ = e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE;
      return e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(D), e.deleteFramebuffer(Y), $;
    }, z = (() => {
      const I = e.getExtension("OES_texture_half_float"), D = e.getExtension("OES_texture_half_float_linear");
      if (e.getExtension("EXT_color_buffer_half_float"), I && D && T(I.HALF_FLOAT_OES))
        return {
          filter: e.LINEAR,
          type: I.HALF_FLOAT_OES
        };
      const Y = e.getExtension("OES_texture_float"), $ = e.getExtension("OES_texture_float_linear");
      return e.getExtension("WEBGL_color_buffer_float"), Y && $ && T(e.FLOAT) ? {
        filter: e.LINEAR,
        type: e.FLOAT
      } : {
        filter: e.LINEAR,
        type: e.UNSIGNED_BYTE
      };
    })(), _ = (I, D, Y) => {
      const $ = e.createTexture(), se = e.createFramebuffer();
      return !$ || !se ? ($ && e.deleteTexture($), se && e.deleteFramebuffer(se), null) : (e.bindTexture(e.TEXTURE_2D, $), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, z.filter), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, z.filter), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, I, D, 0, e.RGBA, z.type, null), e.bindFramebuffer(e.FRAMEBUFFER, se), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, $, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture($), e.deleteFramebuffer(se), null) : (e.viewport(0, 0, I, D), e.clearColor(Y[0], Y[1], Y[2], Y[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null), { framebuffer: se, height: D, texture: $, width: I }));
    }, de = (I, D) => {
      e.bindFramebuffer(e.FRAMEBUFFER, I.framebuffer), e.viewport(0, 0, I.width, I.height), e.clearColor(D[0], D[1], D[2], D[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null);
    }, Q = (I) => {
      e.deleteFramebuffer(I.framebuffer), e.deleteTexture(I.texture);
    }, ve = () => {
      const I = Math.min(window.devicePixelRatio || 1, 1.3), D = Math.max(120, Math.min(340, Math.floor(window.innerWidth * I / 5))), Y = Math.max(80, Math.min(220, Math.floor(window.innerHeight * I / 5)));
      return [D, Y];
    };
    let E = 0, P = !1, C = null, A = null, x = null, N = null, R = null, B = 0, ee = 0, te = 0;
    const me = performance.now(), ae = window.matchMedia("(prefers-reduced-motion: reduce)"), J = [-1, -1, -1, -1];
    let X = [0.5, 0.5], V = [0, 0], oe = 0, ue = null, ge = me;
    const U = () => {
      const [I, D] = ve();
      if ((C == null ? void 0 : C[0].width) === I && C[0].height === D)
        return !0;
      C == null || C.forEach(Q), A == null || A.forEach(Q), x == null || x.forEach(Q), N && Q(N), R && Q(R);
      const Y = [
        _(I, D, [0.5, 0.5, 0, 1]),
        _(I, D, [0.5, 0.5, 0, 1])
      ], $ = [
        _(I, D, [0.5, 0, 0, 1]),
        _(I, D, [0.5, 0, 0, 1])
      ], se = [
        _(I, D, [0, 0, 0, 0]),
        _(I, D, [0, 0, 0, 0])
      ], ke = _(I, D, [0.5, 0, 0, 1]), Pe = _(I, D, [0.5, 0, 0, 1]), pe = [...Y, ...$, ...se, ke, Pe];
      return pe.some((Fe) => !Fe) ? (pe.forEach((Fe) => {
        Fe && Q(Fe);
      }), C = null, A = null, x = null, N = null, R = null, !1) : (C = Y, A = $, x = se, N = ke, R = Pe, B = 0, ee = 0, te = 0, !0);
    };
    let Ce = me;
    const nt = 0.5, fe = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ], Ye = () => {
      const D = Math.max(1, Math.floor(window.innerWidth * 1)), Y = Math.max(1, Math.floor(window.innerHeight * 1));
      (r.width !== D || r.height !== Y) && (r.width = D, r.height = Y, e.viewport(0, 0, D, Y)), e.useProgram(d), e.uniform2f(G.resolution, D, Y), U();
    }, ce = (I) => {
      const D = I * 60;
      oe *= Math.pow(0.9, D), V = [
        V[0] * Math.pow(0.94, D),
        V[1] * Math.pow(0.94, D)
      ];
    }, $e = (I) => {
      if (!a.current || I.pointerType === "touch")
        return;
      const D = Math.max(window.innerWidth, 1), Y = Math.max(window.innerHeight, 1), $ = [
        Math.max(0, Math.min(1, I.clientX / D)),
        Math.max(0, Math.min(1, 1 - I.clientY / Y))
      ], se = performance.now(), ke = Math.max((se - ge) / 1e3, 1 / 120);
      if (ue) {
        const Pe = [
          Math.max(-7.5, Math.min(7.5, ($[0] - ue[0]) / ke)),
          Math.max(-7.5, Math.min(7.5, ($[1] - ue[1]) / ke))
        ];
        V = [
          V[0] + (Pe[0] - V[0]) * 0.74,
          V[1] + (Pe[1] - V[1]) * 0.74
        ];
      }
      X = $, ue = $, ge = se, oe = Math.min(1, oe + 0.92), ae.matches && Ae(se);
    }, ne = document.getElementsByClassName("timeline-fluid-obstacle"), Ft = () => {
      const I = Math.max(window.innerWidth, 1), D = Math.max(window.innerHeight, 1), Y = Array.from(ne).find((se) => {
        const ke = se.getBoundingClientRect(), Pe = window.getComputedStyle(se);
        return Pe.display !== "none" && Pe.visibility !== "hidden" && ke.width > 1 && ke.height > 1 && ke.bottom > 0 && ke.top < D && ke.right > 0 && ke.left < I;
      });
      if (!Y)
        return [-1, -1, -1, -1];
      const $ = Y.getBoundingClientRect();
      return [
        Math.max(0, Math.min(1, $.left / I)),
        Math.max(0, Math.min(1, 1 - $.bottom / D)),
        Math.max(0, Math.min(1, $.right / I)),
        Math.max(0, Math.min(1, 1 - $.top / D))
      ];
    };
    let ze = [-1, -1, -1, -1], xe = 0;
    const Ie = () => {
      xe !== 0 || P || (xe = window.setTimeout(() => {
        xe = 0, ze = Ft();
      }, 0));
    }, Ze = (I, D) => {
      if (!C || !A || !x || !N || !R)
        return;
      const Y = r.width / Math.max(r.height, 1);
      let $ = C[B], se = C[1 - B];
      const ke = x[te];
      e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(f), L(f), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, ke.texture), e.uniform1i(j.velocityMap, 0), e.uniform1i(j.dyeMap, 1), e.uniform2f(j.texel, 1 / $.width, 1 / $.height), e.uniform2f(j.pointerPosition, X[0], X[1]), e.uniform2f(j.pointerVelocity, V[0], V[1]), e.uniform1f(j.pointerActive, a.current ? oe : 0), e.uniform1f(j.pointerRadius, 0.088), e.uniform1f(j.deltaTime, I), e.uniform1f(j.elapsedTime, D), e.uniform1f(j.aspect, Y), e.uniform4f(j.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6), B = 1 - B, $ = C[B], e.bindFramebuffer(e.FRAMEBUFFER, R.framebuffer), e.viewport(0, 0, R.width, R.height), e.useProgram(u), L(u), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.uniform1i(le.velocityMap, 0), e.uniform2f(le.texel, 1 / $.width, 1 / $.height), e.uniform1f(le.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), se = C[1 - B], e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(m), L(m), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, R.texture), e.uniform1i(Z.velocityMap, 0), e.uniform1i(Z.curlMap, 1), e.uniform2f(Z.texel, 1 / $.width, 1 / $.height), e.uniform1f(Z.deltaTime, I * 0.25), e.uniform1f(Z.strength, 13), e.uniform1f(Z.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), B = 1 - B, $ = C[B], e.bindFramebuffer(e.FRAMEBUFFER, N.framebuffer), e.viewport(0, 0, N.width, N.height), e.useProgram(h), L(h), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.uniform1i(W.velocityMap, 0), e.uniform2f(W.texel, 1 / $.width, 1 / $.height), e.uniform4f(W.obstacleRect, J[0], J[1], J[2], J[3]), e.uniform1f(W.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), A.forEach((Fe) => de(Fe, [0.5, 0, 0, 1])), ee = 0;
      for (let Fe = 0; Fe < 12; Fe += 1) {
        const mt = A[ee], Ke = A[1 - ee];
        e.bindFramebuffer(e.FRAMEBUFFER, Ke.framebuffer), e.viewport(0, 0, Ke.width, Ke.height), e.useProgram(b), L(b), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, mt.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, N.texture), e.uniform1i(S.pressureMap, 0), e.uniform1i(S.divergenceMap, 1), e.uniform2f(S.texel, 1 / mt.width, 1 / mt.height), e.uniform4f(S.obstacleRect, J[0], J[1], J[2], J[3]), e.uniform1f(S.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), ee = 1 - ee;
      }
      se = C[1 - B], e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(y), L(y), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, A[ee].texture), e.uniform1i(K.velocityMap, 0), e.uniform1i(K.pressureMap, 1), e.uniform2f(K.texel, 1 / $.width, 1 / $.height), e.uniform4f(K.obstacleRect, J[0], J[1], J[2], J[3]), e.uniform1f(K.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), B = 1 - B, $ = C[B];
      const Pe = x[te], pe = x[1 - te];
      e.bindFramebuffer(e.FRAMEBUFFER, pe.framebuffer), e.viewport(0, 0, pe.width, pe.height), e.useProgram(v), L(v), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Pe.texture), e.uniform1i(H.velocityMap, 0), e.uniform1i(H.dyeMap, 1), e.uniform2f(H.pointerPosition, X[0], X[1]), e.uniform2f(H.pointerVelocity, V[0], V[1]), e.uniform1f(H.pointerActive, a.current ? oe : 0), e.uniform1f(H.pointerRadius, 0.088), e.uniform1f(H.deltaTime, I), e.uniform1f(H.elapsedTime, D), e.uniform1f(H.aspect, Y), e.uniform4f(H.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6), te = 1 - te;
    }, Ja = (I) => {
      if (!C || !x)
        return;
      const D = C[B], Y = x[te];
      e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, r.width, r.height), e.useProgram(d), L(d), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, D.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Y.texture), e.uniform1i(G.velocityMap, 0), e.uniform1i(G.dyeMap, 1), e.uniform2f(G.resolution, r.width, r.height), e.uniform2f(G.fluidTexel, 1 / D.width, 1 / D.height), e.uniform4f(G.widgetRect, ze[0], ze[1], ze[2], ze[3]), e.uniform1f(G.elapsedTime, I), e.uniform1f(G.emitterDebug, n.current ? 1 : 0), e.uniform4f(G.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6);
    }, Ae = (I) => {
      Ye();
      const D = Math.min(Math.max((I - Ce) / 1e3, 1 / 120), 1 / 20);
      Ce = I;
      const Y = (I - me) / 1e3, $ = D * nt, se = Y * nt;
      ce(D), Ze($, se), Ja(se), Ie();
    }, dt = (I) => {
      P || (E = window.requestAnimationFrame(dt), !document.hidden && Ae(I));
    }, ut = () => {
      P || (Ye(), ze = Ft(), Ae(me + 1e3), ae.matches || (E = window.requestAnimationFrame(dt)));
    };
    return window.addEventListener("resize", Ye), window.addEventListener("pointermove", $e, { passive: !0 }), ut(), () => {
      P = !0, window.cancelAnimationFrame(E), window.clearTimeout(xe), window.removeEventListener("resize", Ye), window.removeEventListener("pointermove", $e), C == null || C.forEach(Q), A == null || A.forEach(Q), x == null || x.forEach(Q), N && Q(N), R && Q(R), e.deleteBuffer(k), M();
    };
  }, []), /* @__PURE__ */ g(Tt, { children: [
    /* @__PURE__ */ o("div", { className: "aurora-backdrop", "aria-hidden": "true" }),
    /* @__PURE__ */ o(
      "canvas",
      {
        ref: t,
        className: "aurora-canvas",
        "aria-hidden": "true"
      }
    )
  ] });
}
function Or({
  boardView: t,
  hiddenCompanyCount: a,
  onShowHiddenCompanies: n
}) {
  const r = a > 0, e = at();
  return /* @__PURE__ */ o("div", { className: "flex min-h-[18rem] items-center justify-center px-6 py-14", children: /* @__PURE__ */ g("div", { className: "max-w-[34rem] text-center", children: [
    /* @__PURE__ */ o("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink-soft)]", children: /* @__PURE__ */ o(st, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ o("p", { className: "mt-5 text-lg font-semibold tracking-tight text-[var(--ink)]", children: r ? `All visible ${e.groupPluralLabel} are hidden` : `${t.label} has no releases yet` }),
    /* @__PURE__ */ o("p", { className: "mt-2 text-sm leading-6 text-[var(--ink-soft)]", children: r ? `Show hidden ${e.groupPluralLabel} or turn on another product line to repopulate the timeline.` : e.emptyBoardDescription }),
    r ? /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: n,
        className: "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
        children: [
          /* @__PURE__ */ o(ca, { className: "h-4 w-4", strokeWidth: 1.8 }),
          e.showHiddenLabel
        ]
      }
    ) : null
  ] }) });
}
function is() {
  return /* @__PURE__ */ o("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ g("div", { className: "mx-auto max-w-[1400px] px-5 pb-16 pt-8 md:px-8 md:pt-10", children: [
    /* @__PURE__ */ g("div", { className: "grid animate-pulse gap-10 lg:grid-cols-[minmax(0,1.18fr)_360px] lg:items-end", children: [
      /* @__PURE__ */ g("div", { className: "space-y-6", children: [
        /* @__PURE__ */ o("div", { className: "h-10 w-44 rounded-full bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
        /* @__PURE__ */ g("div", { className: "space-y-4", children: [
          /* @__PURE__ */ o("div", { className: "h-16 max-w-[720px] rounded-[1.75rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
          /* @__PURE__ */ o("div", { className: "h-6 max-w-[620px] rounded-full bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
        ] }),
        /* @__PURE__ */ g("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_280px]", children: [
          /* @__PURE__ */ o("div", { className: "h-32 rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
          /* @__PURE__ */ o("div", { className: "h-32 rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "h-[360px] rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
    ] }),
    /* @__PURE__ */ o("div", { className: "mt-10 overflow-hidden rounded-[2.4rem] border border-[var(--edge)] bg-[var(--surface)] p-6 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: /* @__PURE__ */ g("div", { className: "flex animate-pulse flex-col gap-6", children: [
      /* @__PURE__ */ g("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ o("div", { className: "h-8 w-80 rounded-full bg-[var(--surface-strong)]" }),
        /* @__PURE__ */ o("div", { className: "h-11 w-44 rounded-full bg-[var(--surface-strong)]" })
      ] }),
      [0, 1, 2, 3].map((t) => /* @__PURE__ */ o("div", { className: "relative h-[4.5rem] rounded-[1.25rem] bg-[var(--surface-strong)]", children: /* @__PURE__ */ o("div", { className: "absolute inset-y-1/2 left-12 right-12 h-px -translate-y-1/2 bg-[var(--edge)]" }) }, t))
    ] }) })
  ] }) });
}
function Wr({
  activeCompanyId: t,
  compact: a = !1,
  onCompanyBlur: n,
  onCompanyFocus: r,
  onCompanyTap: e,
  railWidth: l,
  rowLayouts: c,
  timelineWidth: d
}) {
  return /* @__PURE__ */ o("div", { "data-timeline-presentation-hide": !0, "aria-hidden": "true", className: "pointer-events-none absolute inset-0 z-[6]", children: c.map((f) => {
    const u = t === f.company.id;
    return /* @__PURE__ */ o(
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
          width: `${d + l}px`
        },
        children: /* @__PURE__ */ o(
          "div",
          {
            className: `absolute inset-x-0 top-1/2 h-[calc(100%+1.25rem)] -translate-y-1/2 border-y transition duration-200 ${u ? "opacity-100" : "opacity-0"}`,
            style: {
              background: `linear-gradient(90deg, ${Xe(f.company.accent, a ? 0.16 : 0.12)}, transparent 42%, ${Xe(
                f.company.accent,
                0.08
              )})`,
              borderColor: Xe(f.company.accent, a ? 0.28 : 0.22)
            }
          }
        )
      },
      `${f.company.id}-${a ? "mobile" : "desktop"}-focus-band`
    );
  }) });
}
function Hr({
  compact: t = !1,
  onClearFocus: a,
  onCompanyHide: n,
  onCompanyMove: r,
  onPointerEnter: e,
  onPointerLeave: l,
  row: c,
  rowCount: d,
  screenX: f,
  screenY: u
}) {
  const m = c.company, h = m.latestRelease, b = h ? h.name : "No releases", y = m.productLines.map((M) => M.shortLabel).join(" / "), v = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[rgba(255,255,255,0.035)] text-[var(--ink-soft)] transition duration-200 hover:border-[var(--edge-strong)] hover:bg-[rgba(255,255,255,0.075)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-30";
  return /* @__PURE__ */ o(
    "div",
    {
      "data-row-focus-label": !0,
      "data-timeline-presentation-hide": !0,
      className: "pointer-events-none absolute z-30 will-change-transform",
      style: {
        transform: `translate3d(${f}px, ${u}px, 0) translateY(-50%)`
      },
      children: /* @__PURE__ */ g(
        we.div,
        {
          initial: { opacity: 0, scale: 0.96, x: -8 },
          animate: { opacity: 1, scale: 1, x: 0 },
          exit: { opacity: 0, scale: 0.96, x: -8 },
          transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
          className: `pointer-events-auto rounded-[1.15rem] border border-[var(--edge-strong)] bg-[rgba(8,11,16,0.92)] shadow-[0_22px_48px_-30px_rgba(0,0,0,0.88)] backdrop-blur-xl ${t ? "w-[min(15.5rem,calc(100vw-8rem))] p-3" : "w-[18rem] p-3.5"}`,
          onMouseEnter: e,
          onMouseLeave: l,
          onPointerDown: (M) => M.stopPropagation(),
          onPointerEnter: e,
          onPointerLeave: l,
          children: [
            /* @__PURE__ */ g("div", { className: "flex min-w-0 items-start gap-3", children: [
              /* @__PURE__ */ o(Rl, { compact: t, company: m }),
              /* @__PURE__ */ g("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ g("div", { className: "flex min-w-0 items-center gap-2", children: [
                  /* @__PURE__ */ o("p", { className: "truncate text-sm font-semibold leading-tight tracking-tight text-[var(--ink)]", children: m.name }),
                  /* @__PURE__ */ o(
                    "span",
                    {
                      className: "h-1.5 w-1.5 shrink-0 rounded-full",
                      style: { backgroundColor: m.accent }
                    }
                  )
                ] }),
                /* @__PURE__ */ o("p", { className: "mt-1 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: y }),
                /* @__PURE__ */ o("p", { className: "mt-2 truncate text-xs font-medium text-[var(--ink-soft)]", children: b })
              ] })
            ] }),
            /* @__PURE__ */ g("div", { className: "mt-3 flex items-center justify-between gap-2 border-t border-[var(--edge)] pt-2.5", children: [
              /* @__PURE__ */ g("span", { className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: [
                "Score ",
                m.significanceScore,
                " · Row ",
                c.index + 1,
                "/",
                d
              ] }),
              /* @__PURE__ */ g("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${m.name} up`,
                    title: `Move ${m.name} up`,
                    className: v,
                    disabled: c.index === 0,
                    onClick: (M) => {
                      M.stopPropagation(), r(m.id, "up");
                    },
                    children: /* @__PURE__ */ o(bi, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${m.name} down`,
                    title: `Move ${m.name} down`,
                    className: v,
                    disabled: c.index === d - 1,
                    onClick: (M) => {
                      M.stopPropagation(), r(m.id, "down");
                    },
                    children: /* @__PURE__ */ o(yi, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Hide ${m.name}`,
                    title: `Hide ${m.name}`,
                    className: v,
                    onClick: (M) => {
                      M.stopPropagation(), n(m.id), a();
                    },
                    children: /* @__PURE__ */ o(lr, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
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
function os({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handlePointerDown: e,
  handlePointerMove: l,
  hiddenCompanyCount: c,
  handleZoomChange: d,
  isPanning: f,
  latestCompany: u,
  maxDays: m,
  minZoom: h,
  maxZoom: b,
  maxSummaryQuietDays: y,
  modelExplorer: v,
  monthTicks: M,
  onCompanyHide: k,
  onCompanyMove: L,
  onDismissArticle: G,
  onModelSelect: j,
  onResetCamera: le,
  onShowHiddenCompanies: Z,
  onToggleTimelineGrid: W,
  processedCompanies: S,
  renderWindow: K,
  scrollContainerRef: H,
  showTimelineGrid: T,
  stopPanning: q,
  summaryCompanies: z,
  timelineStartDay: _,
  timelineWidth: de,
  viewport: Q,
  worldRef: ve,
  yearTicks: E,
  zoom: P
}) {
  var Ye;
  const A = ct(!1, 1), x = oa(S, !1, 1), N = la({
    currentGlobalDay: r,
    maxDays: m,
    summaryCount: z.length,
    timelineStartDay: _,
    timelineHeight: x,
    timelineWidth: de,
    viewport: Q
  }), R = Pt(S, !1, 1, A), [B, ee] = Me(null), te = re(null), me = () => {
    te.current !== null && (window.clearTimeout(te.current), te.current = null);
  }, ae = (ce) => {
    me(), ee(ce);
  }, J = () => {
    me(), ee(null);
  }, X = () => {
    me(), te.current = window.setTimeout(() => {
      ee(null), te.current = null;
    }, 120);
  };
  Re(() => () => me(), []);
  const V = R.find((ce) => ce.company.id === B) ?? null, ue = ie(116, 16, Math.max(16, Q.width - 288 - 16)), ge = V ? ie(
    (N.timelineY + V.y + V.height / 2 - n.y) * P,
    82,
    Math.max(82, Q.height - 84)
  ) : 0, U = at(), Ce = a.isDefault ? U.defaultBoardDescription : a.isEmpty ? U.emptyBoardDetail : a.isComposite ? U.compositeBoardDescription(a.label) : U.singleBoardDescription(a.label), nt = N.timelineX + _ * Se, fe = de + xt;
  return Lr(ve, P), /* @__PURE__ */ g("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ o("div", { "data-timeline-presentation-hide": !0, className: "absolute left-5 top-5 z-40 [--category-expanded-width:40rem]", children: v }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: H,
        className: `absolute inset-0 overflow-hidden [overflow-anchor:none] ${f ? "cursor-grabbing" : "cursor-grab"}`,
        onClickCapture: (ce) => G(ce.target, { clientX: ce.clientX, clientY: ce.clientY }),
        onPointerDown: e,
        onPointerMove: l,
        onPointerUp: q,
        onPointerCancel: q,
        onLostPointerCapture: q,
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: ve,
            className: "relative",
            style: {
              height: `${N.worldHeight}px`,
              transform: Ka(n, P),
              transformOrigin: "0 0",
              width: `${N.worldWidth}px`
            },
            children: [
              /* @__PURE__ */ g(
                we.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[2rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.86)] p-7 shadow-[var(--panel-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${N.contentCards.intro.x}px`,
                    top: `${N.contentCards.intro.y}px`,
                    width: `${N.contentCards.intro.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ o("h1", { className: "mt-4 max-w-4xl text-5xl leading-none tracking-tighter text-[var(--ink)]", children: U.primaryHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-5 max-w-[68ch] text-base leading-7 text-[var(--ink-soft)]", children: Ce })
                  ]
                }
              ),
              /* @__PURE__ */ g(
                we.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.45rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.78)] p-5 shadow-[var(--soft-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${N.contentCards.notes.x}px`,
                    top: `${N.contentCards.notes.y}px`,
                    width: `${N.contentCards.notes.width}px`,
                    "--border-sheen-delay": "2.8s"
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: U.timelineNotesHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-4 text-sm leading-7 text-[var(--ink-soft)]", children: U.timelineInteractionNoteDesktop })
                  ]
                }
              ),
              /* @__PURE__ */ o(
                we.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${x}px`,
                    left: `${nt}px`,
                    top: `${N.timelineY}px`,
                    width: `${fe}px`
                  },
                  children: /* @__PURE__ */ g("div", { className: "relative", children: [
                    /* @__PURE__ */ o(
                      Wr,
                      {
                        activeCompanyId: B,
                        onCompanyBlur: X,
                        onCompanyFocus: ae,
                        onCompanyTap: ae,
                        railWidth: xt,
                        rowLayouts: R,
                        timelineWidth: de
                      }
                    ),
                    S.length === 0 ? /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-[320px] right-0 top-0 z-20 flex items-center justify-center px-6", children: /* @__PURE__ */ o(
                      Or,
                      {
                        boardView: a,
                        hiddenCompanyCount: c,
                        onShowHiddenCompanies: Z
                      }
                    ) }) : null,
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${fe}px` },
                        children: /* @__PURE__ */ o("div", { style: { paddingLeft: `${xt}px` }, children: /* @__PURE__ */ g(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${de}px`, minHeight: `${x}px` },
                            children: [
                              T ? /* @__PURE__ */ g("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                M.map((ce) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${We(ce.days, _)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-10 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.18em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: Ge(10),
                                        children: ce.label
                                      }
                                    ) }) })
                                  },
                                  `month-${ce.days}`
                                )),
                                E.map((ce) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${We(ce.days, _)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-2 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1.5 font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: Ge(11),
                                        children: ce.label
                                      }
                                    ) }) })
                                  },
                                  `year-${ce.label}`
                                )),
                                /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${We(r, _)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-2 font-semibold uppercase tracking-[0.18em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: Ge(11),
                                        children: U.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              S.length > 0 ? /* @__PURE__ */ o(
                                we.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${A.companyGap}px`,
                                    paddingBottom: `${A.bottomPadding}px`,
                                    paddingTop: `${A.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ o(je, { initial: !1, mode: "popLayout", children: S.map((ce, $e) => /* @__PURE__ */ o(
                                    Yr,
                                    {
                                      activeArticleSlug: t,
                                      company: ce,
                                      companyIndex: $e,
                                      currentGlobalDay: r,
                                      maxDays: m,
                                      onCompanyBlur: X,
                                      onCompanyFocus: ae,
                                      onModelSelect: j,
                                      renderWindow: K,
                                      timelineStartDay: _,
                                      verticalScale: 1
                                    },
                                    ce.id
                                  )) })
                                }
                              ) : null,
                              /* @__PURE__ */ o("div", { "aria-hidden": "true", className: "timeline-tail-fade" })
                            ]
                          }
                        ) })
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ g(
                we.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center",
                  style: {
                    left: `${N.contentCards.latest.x}px`,
                    top: `${N.contentCards.latest.y}px`,
                    width: `${N.contentCards.latest.width}px`
                  },
                  children: [
                    /* @__PURE__ */ g("p", { className: "text-sm leading-relaxed text-[var(--ink-soft)]", children: [
                      U.latestDesktopLabel,
                      ": ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: (u == null ? void 0 : u.name) ?? U.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: ((Ye = u == null ? void 0 : u.latestRelease) == null ? void 0 : Ye.name) ?? U.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ o("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: U.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ g(
                we.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.72, delay: 0.24, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${N.contentCards.summaries.x}px`,
                    top: `${N.contentCards.summaries.y}px`,
                    width: `${N.contentCards.summaries.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]", children: U.recencyHeading }),
                    /* @__PURE__ */ o("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: /* @__PURE__ */ o(je, { initial: !1, mode: "popLayout", children: z.map((ce, $e) => /* @__PURE__ */ o(
                      zr,
                      {
                        company: ce,
                        currentGlobalDay: r,
                        index: $e,
                        maxSummaryQuietDays: y
                      },
                      ce.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ o(je, { children: V ? /* @__PURE__ */ o(_t.Fragment, { children: /* @__PURE__ */ o(
      Hr,
      {
        onClearFocus: J,
        onCompanyHide: k,
        onCompanyMove: L,
        onPointerEnter: me,
        onPointerLeave: X,
        row: V,
        rowCount: R.length,
        screenX: ue,
        screenY: ge
      }
    ) }, `${V.company.id}-desktop-focus-label`) : null }),
    /* @__PURE__ */ o(
      $r,
      {
        className: "right-5 top-1/2 -translate-y-1/2",
        maxZoom: b,
        minZoom: h,
        onZoomChange: d,
        zoom: P
      }
    ),
    /* @__PURE__ */ g("div", { "data-timeline-presentation-hide": !0, className: "absolute right-6 top-[calc(50%+12.5rem)] z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ g(
        wt,
        {
          label: T ? U.timelineGridHideLabel : U.timelineGridShowLabel,
          onClick: W,
          pressed: T,
          children: [
            T ? /* @__PURE__ */ o(rr, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ o(ir, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ o("span", { children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ g(wt, { label: U.resetCameraLabel, onClick: le, children: [
        /* @__PURE__ */ o(ca, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { children: "Reset" })
      ] }),
      c > 0 ? /* @__PURE__ */ g(wt, { label: U.showHiddenLabel, onClick: Z, children: [
        /* @__PURE__ */ o(st, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { children: U.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function ls({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handleTouchEnd: e,
  handleTouchMove: l,
  handleTouchStart: c,
  handleZoomChange: d,
  hiddenCompanyCount: f,
  latestCompany: u,
  minZoom: m,
  maxZoom: h,
  maxDays: b,
  maxSummaryQuietDays: y,
  modelExplorer: v,
  monthTicks: M,
  onCompanyHide: k,
  onCompanyMove: L,
  onDismissArticle: G,
  onModelSelect: j,
  onResetCamera: le,
  onShowHiddenCompanies: Z,
  onToggleTimelineGrid: W,
  processedCompanies: S,
  renderWindow: K,
  scrollContainerRef: H,
  showTimelineGrid: T,
  timelineStartDay: q,
  timelineWidth: z,
  viewport: _,
  worldRef: de,
  yearTicks: Q,
  zoom: ve
}) {
  var ge;
  const P = ct(!0, 1), C = oa(S, !0, 1), A = la({
    compact: !0,
    currentGlobalDay: r,
    maxDays: b,
    summaryCount: S.length,
    timelineStartDay: q,
    timelineHeight: C,
    timelineWidth: z,
    viewport: _
  }), x = Pt(S, !0, 1, P), [N, R] = Me(null), B = (U) => R(U), ee = () => R(null), te = x.find((U) => U.company.id === N) ?? null, ae = Math.max(16, Math.min(126, Math.max(16, _.width - 248 - 12))), J = te ? ie(
    (A.timelineY + te.y + te.height / 2 - n.y) * ve,
    98,
    Math.max(98, _.height - 104)
  ) : 0, X = at(), V = a.isDefault ? X.defaultBoardDescription : a.isEmpty ? X.emptyBoardDetail : a.isComposite ? X.compositeBoardDescriptionMobile(a.label) : X.singleBoardDescriptionMobile(a.label), oe = A.timelineX + q * Se, ue = z + bt;
  return Lr(de, ve), /* @__PURE__ */ g("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ o("div", { "data-timeline-presentation-hide": !0, className: "absolute left-3 top-3 z-40 [--category-expanded-width:min(20rem,calc(100vw-5rem))]", children: v }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: H,
        className: "absolute inset-0 touch-none overflow-hidden [overflow-anchor:none]",
        onClickCapture: (U) => G(U.target, { clientX: U.clientX, clientY: U.clientY }),
        onClick: (U) => {
          const Ce = U.target;
          Ce instanceof Element && (Ce.closest("[data-row-focus-band], [data-row-focus-label], button, a, input, label, select, textarea") || ee());
        },
        onTouchCancel: e,
        onTouchEnd: e,
        onTouchMove: l,
        onTouchStart: c,
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: de,
            className: "relative",
            style: {
              height: `${A.worldHeight}px`,
              transform: Ka(n, ve),
              transformOrigin: "0 0",
              width: `${A.worldWidth}px`
            },
            children: [
              /* @__PURE__ */ g(
                we.div,
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
                    /* @__PURE__ */ o("p", { className: "font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ o("h1", { className: "mt-3 max-w-sm text-[2.25rem] leading-none tracking-tighter text-[var(--ink)]", children: X.primaryHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-4 text-sm leading-6 text-[var(--ink-soft)]", children: V })
                  ]
                }
              ),
              /* @__PURE__ */ g(
                we.div,
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
                    /* @__PURE__ */ o("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: X.timelineNotesHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-3 text-xs leading-5 text-[var(--ink-soft)]", children: X.timelineInteractionNoteMobile })
                  ]
                }
              ),
              /* @__PURE__ */ o(
                we.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${C}px`,
                    left: `${oe}px`,
                    top: `${A.timelineY}px`,
                    width: `${ue}px`
                  },
                  children: /* @__PURE__ */ g("div", { className: "relative", children: [
                    /* @__PURE__ */ o(
                      Wr,
                      {
                        activeCompanyId: N,
                        compact: !0,
                        onCompanyFocus: B,
                        onCompanyTap: B,
                        railWidth: bt,
                        rowLayouts: x,
                        timelineWidth: z
                      }
                    ),
                    S.length === 0 ? /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-[196px] right-0 top-0 z-20 flex items-center justify-center px-3", children: /* @__PURE__ */ o(
                      Or,
                      {
                        boardView: a,
                        hiddenCompanyCount: f,
                        onShowHiddenCompanies: Z
                      }
                    ) }) : null,
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${ue}px` },
                        children: /* @__PURE__ */ o("div", { style: { paddingLeft: `${bt}px` }, children: /* @__PURE__ */ g(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${z}px`, minHeight: `${C}px` },
                            children: [
                              T ? /* @__PURE__ */ g("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                M.map((U) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${We(U.days, q)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-9 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.16em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: Ge(9),
                                        children: U.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-month-${U.days}`
                                )),
                                Q.map((U) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${We(U.days, q)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1 font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: Ge(10),
                                        children: U.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-year-${U.label}`
                                )),
                                /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${We(r, q)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1.5 font-semibold uppercase tracking-[0.16em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: Ge(10),
                                        children: X.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              S.length > 0 ? /* @__PURE__ */ o(
                                we.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${P.companyGap}px`,
                                    paddingBottom: `${P.bottomPadding}px`,
                                    paddingTop: `${P.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ o(je, { initial: !1, mode: "popLayout", children: S.map((U, Ce) => /* @__PURE__ */ o(
                                    Yr,
                                    {
                                      activeArticleSlug: t,
                                      compact: !0,
                                      company: U,
                                      companyIndex: Ce,
                                      currentGlobalDay: r,
                                      maxDays: b,
                                      onCompanyFocus: B,
                                      onModelSelect: j,
                                      renderWindow: K,
                                      timelineStartDay: q,
                                      verticalScale: 1
                                    },
                                    U.id
                                  )) })
                                }
                              ) : null,
                              /* @__PURE__ */ o("div", { "aria-hidden": "true", className: "timeline-tail-fade timeline-tail-fade--compact" })
                            ]
                          }
                        ) })
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ g(
                we.div,
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
                    /* @__PURE__ */ g("p", { className: "text-xs leading-5 text-[var(--ink-soft)]", children: [
                      X.latestMobileLabel,
                      ": ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: (u == null ? void 0 : u.name) ?? X.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: ((ge = u == null ? void 0 : u.latestRelease) == null ? void 0 : ge.name) ?? X.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ o("p", { className: "mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: X.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ g(
                we.div,
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
                    /* @__PURE__ */ o("p", { className: "mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]", children: X.recencyHeading }),
                    /* @__PURE__ */ o("div", { className: "grid gap-3 sm:grid-cols-2", children: /* @__PURE__ */ o(je, { initial: !1, mode: "popLayout", children: S.map((U, Ce) => /* @__PURE__ */ o(
                      zr,
                      {
                        compact: !0,
                        company: U,
                        currentGlobalDay: r,
                        index: Ce,
                        maxSummaryQuietDays: y
                      },
                      U.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ o(je, { children: te ? /* @__PURE__ */ o(_t.Fragment, { children: /* @__PURE__ */ o(
      Hr,
      {
        compact: !0,
        onClearFocus: ee,
        onCompanyHide: k,
        onCompanyMove: L,
        row: te,
        rowCount: x.length,
        screenX: ae,
        screenY: J
      }
    ) }, `${te.company.id}-mobile-focus-label`) : null }),
    /* @__PURE__ */ o(
      $r,
      {
        compact: !0,
        className: "right-1 top-1/2 -translate-y-1/2",
        maxZoom: h,
        minZoom: m,
        onZoomChange: d,
        zoom: ve
      }
    ),
    /* @__PURE__ */ g("div", { "data-timeline-presentation-hide": !0, className: "absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ g(
        wt,
        {
          label: T ? X.timelineGridHideLabel : X.timelineGridShowLabel,
          onClick: W,
          pressed: T,
          children: [
            T ? /* @__PURE__ */ o(rr, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ o(ir, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ o("span", { className: "sr-only", children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ g(wt, { label: X.resetCameraLabel, onClick: le, children: [
        /* @__PURE__ */ o(ca, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: "Reset" })
      ] }),
      f > 0 ? /* @__PURE__ */ g(wt, { label: X.showHiddenLabel, onClick: Z, children: [
        /* @__PURE__ */ o(st, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: X.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function hs({ controllerRef: t, definition: a, presentation: n = !1 }) {
  Ui(a);
  const [r, e] = Me(() => Co()), [l, c] = Me(() => Ao()), [d, f] = Me(
    () => Ro()
  ), [u, m] = Me(!1), [h, b] = Me(
    () => typeof window > "u" ? !0 : window.matchMedia("(min-width: 768px)").matches
  ), [y, v] = Me(St), [M, k] = Me(It), [L, G] = Me(!1), [j, le] = Me(!1), [Z, W] = Me(!0), [S, K] = Me([]), [H, T] = Me(() => Oe().map((i) => i.id)), [q, z] = Me({ x: 0, y: 0 }), [_, de] = Me({ x: 0, y: 0 }), [Q, ve] = Me(() => Do()), E = re(St), P = re(It), C = re({ x: 0, y: 0 }), A = re({ x: 0, y: 0 }), x = re({
    complete: null,
    durationMs: null,
    frameId: null,
    lastFrameAt: null,
    start: {
      camera: { x: 0, y: 0 },
      zoom: St
    },
    startedAt: null,
    stiffness: rt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: St
    },
    zoomAnchor: null
  }), N = re({
    complete: null,
    durationMs: null,
    frameId: null,
    lastFrameAt: null,
    start: {
      camera: { x: 0, y: 0 },
      zoom: It
    },
    startedAt: null,
    stiffness: rt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: It
    },
    zoomAnchor: null
  }), R = re(null), B = re(null), ee = re(null), te = re(null), me = re(null), ae = re(null), J = re(null), X = re(null), V = re(!1), oe = re(!1), ue = re(null), ge = re(null), U = re(!1), Ce = re(null), nt = re(() => {
  }), fe = re(null), Ye = re(null), ce = re({
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0
  });
  re(/* @__PURE__ */ new Map());
  const $e = re(null), [ne, Ft] = Me({
    desktop: { height: 0, width: 0 },
    mobile: { height: 0, width: 0 }
  }), ze = at(), xe = Q.kind === "model" ? Q.slug : null, Ie = xe ? he().articleIndexBySlug[xe] ?? null : null, Ze = Q.kind === "model", Ae = (Ee(() => /* @__PURE__ */ new Date(), []).getTime() - ot().getTime()) / lt, dt = Ee(() => Uo(r), [r]), ut = Ee(
    () => ha(Oe(), r),
    [r]
  ), I = Ee(
    () => Vo(ut, H, S, l, Ae),
    [H, l, Ae, S, ut]
  ), D = Ee(
    () => Go(I, d, Ie == null ? void 0 : Ie.companyId),
    [Ie == null ? void 0 : Ie.companyId, I, d]
  ), Y = Ee(
    () => D.map((i) => i.id),
    [D]
  ), $ = Ee(() => {
    const i = new Set(S);
    return ut.filter((s) => i.has(s.id)).length;
  }, [S, ut]), se = Ee(() => zo(Oe(), r), [r]), ke = Ee(() => Bo(Oe(), r), [r]), Pe = Ee(() => Oo(Oe(), r), [r]), pe = Ee(
    () => Zo(D, Ae),
    [Ae, D]
  ), Fe = Math.max(Math.ceil(Ae) + 36, pe.latestGlobalDay + 36, 720), mt = Math.max(Fe * Se, 1), Ke = zn(ne.desktop.width, xt, mt), $t = zn(ne.mobile.width, bt, mt), en = Fn({
    camera: q,
    minimumDays: Fe,
    viewport: ne.desktop,
    zoom: y
  }), tn = Fn({
    camera: _,
    compact: !0,
    minimumDays: Fe,
    viewport: ne.mobile,
    zoom: M
  }), Ut = en.endDay, Xt = en.startDay, Yt = tn.endDay, zt = tn.startDay, va = Math.max(ia(Xt, Ut), 1), xa = Math.max(
    ia(zt, Yt),
    1
  ), Vr = Ee(
    () => Pn({
      camera: q,
      viewport: ne.desktop,
      zoom: y
    }),
    [q, ne.desktop, y]
  ), Gr = Ee(
    () => Pn({
      camera: _,
      compact: !0,
      viewport: ne.mobile,
      zoom: M
    }),
    [_, M, ne.mobile]
  ), ba = 1, ya = 1, Bt = oa(pe.processedCompanies, !1, ba), Ot = oa(pe.processedCompanies, !0, ya), Wt = ra(
    na({
      camera: q,
      futureBufferDays: kn,
      pastBufferDays: In,
      viewport: ne.desktop,
      zoom: y
    })
  ), Ht = ra(
    na({
      camera: _,
      compact: !0,
      futureBufferDays: kn,
      pastBufferDays: In,
      viewport: ne.mobile,
      zoom: M
    })
  ), { monthTicks: jr, yearTicks: qr } = Ee(
    () => _n({ endDay: Wt.endDay, startDay: Wt.startDay }),
    [Wt.endDay, Wt.startDay]
  ), { monthTicks: Zr, yearTicks: Kr } = Ee(
    () => _n({ endDay: Ht.endDay, startDay: Ht.startDay }),
    [Ht.endDay, Ht.startDay]
  ), an = Ee(() => [...pe.processedCompanies].filter((i) => i.latestRelease).sort((i, s) => {
    var p, w;
    return (((p = s.latestRelease) == null ? void 0 : p.globalDay) ?? 0) - (((w = i.latestRelease) == null ? void 0 : w.globalDay) ?? 0);
  })[0] ?? null, [pe.processedCompanies]), Et = Ee(() => pe.processedCompanies, [pe.processedCompanies]), nn = Ee(() => Et.reduce((i, s) => {
    const p = Va(s, Ae);
    return Math.max(i, p);
  }, 0), [Ae, Et]), Qe = Ee(
    () => la({
      currentGlobalDay: Ae,
      maxDays: Ut,
      summaryCount: Et.length,
      timelineStartDay: Xt,
      timelineHeight: Bt,
      timelineWidth: va,
      viewport: ne.desktop
    }),
    [
      Ae,
      Bt,
      Ut,
      Et.length,
      Xt,
      va,
      ne.desktop
    ]
  ), Je = Ee(
    () => la({
      compact: !0,
      currentGlobalDay: Ae,
      maxDays: Yt,
      summaryCount: pe.processedCompanies.length,
      timelineStartDay: zt,
      timelineHeight: Ot,
      timelineWidth: xa,
      viewport: ne.mobile
    }),
    [
      Ae,
      Yt,
      zt,
      Ot,
      xa,
      pe.processedCompanies.length,
      ne.mobile
    ]
  );
  Re(() => {
    const i = window.setTimeout(() => le(!0), 120);
    return () => window.clearTimeout(i);
  }, []), Re(() => {
    const i = () => {
      const s = window.location.hash;
      ve(Er(s)), e(Nr(s)), c(Dr(s)), f(Cr(s));
    };
    return i(), window.addEventListener("hashchange", i), () => window.removeEventListener("hashchange", i);
  }, []), Re(() => {
    if (n)
      return;
    const i = Sa({
      companySortMode: l,
      filterState: r,
      route: Q,
      significanceDisplayLimit: d
    });
    window.location.hash !== i && window.history.replaceState(null, "", i);
  }, [l, r, n, Q, d]), Re(() => () => {
    var i, s, p, w, F;
    (i = fe.current) == null || i.call(fe), x.current.frameId !== null && window.cancelAnimationFrame(x.current.frameId), (p = (s = x.current).complete) == null || p.call(s, "cancelled"), N.current.frameId !== null && window.cancelAnimationFrame(N.current.frameId), (F = (w = N.current).complete) == null || F.call(w, "cancelled");
  }, []), Re(() => {
    Ie && (e((i) => {
      const s = Oi(Ie.presets), p = Ve(Ie.presets, it()), w = He({
        ...i,
        attributeIds: Ve([...i.attributeIds, ...p], it()),
        companyIds: i.companyIds.length > 0 && !i.companyIds.includes(Ie.companyId) ? [...i.companyIds, Ie.companyId] : i.companyIds,
        domainIds: s.length > 0 ? Ve([...i.domainIds, ...s], qe()) : i.domainIds
      });
      return pr(i, w) ? i : w;
    }), K((i) => i.filter((s) => s !== Ie.companyId)));
  }, [Ie]), Re(() => {
    const i = new Set(Pe.map((s) => s.id));
    e((s) => {
      const p = s.companyIds.filter((w) => i.has(w));
      return p.length === s.companyIds.length ? s : { ...s, companyIds: p };
    });
  }, [Pe]), Re(() => {
    const i = window.matchMedia("(min-width: 768px)"), s = () => b(i.matches);
    return s(), i.addEventListener("change", s), () => i.removeEventListener("change", s);
  }, []), Re(() => {
    const i = () => {
      var p, w, F, O;
      Ft({
        desktop: {
          height: ((p = R.current) == null ? void 0 : p.clientHeight) ?? window.innerHeight,
          width: ((w = R.current) == null ? void 0 : w.clientWidth) ?? window.innerWidth
        },
        mobile: {
          height: ((F = B.current) == null ? void 0 : F.clientHeight) ?? window.innerHeight,
          width: ((O = B.current) == null ? void 0 : O.clientWidth) ?? window.innerWidth
        }
      });
    };
    i();
    const s = window.requestAnimationFrame(i);
    return window.addEventListener("resize", i), () => {
      window.cancelAnimationFrame(s), window.removeEventListener("resize", i);
    };
  }, [h, j]), Re(() => {
    if (V.current)
      return;
    const i = () => {
      if (V.current || !R.current || R.current.clientWidth === 0)
        return;
      const p = pt(Qe);
      C.current = p.camera, x.current.target = p, Gt(p.zoom, p.camera), V.current = !0;
    };
    if (i(), !V.current)
      return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [Qe, ne.desktop, y]), Re(() => {
    if (oe.current)
      return;
    const i = () => {
      if (oe.current || !B.current || B.current.clientWidth === 0)
        return;
      const p = pt(Je, !0);
      A.current = p.camera, N.current.target = p, jt(p.zoom, p.camera), oe.current = !0;
    };
    if (i(), !oe.current)
      return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [Je, M, ne.mobile]);
  const Qr = (i) => {
    e((s) => {
      const p = s.domainIds.includes(i) ? s.domainIds.filter((w) => w !== i) : Ve([...s.domainIds, i], qe());
      return He({ ...s, companyIds: [], domainIds: p });
    });
  }, Jr = (i) => {
    e((s) => {
      const p = s.attributeIds.includes(i) ? s.attributeIds.filter((w) => w !== i) : Ve([...s.attributeIds, i], it());
      return He({ ...s, attributeIds: p, companyIds: [] });
    });
  }, ei = (i) => {
    e((s) => He({ ...s, companyIds: [], contentType: i }));
  }, ti = (i) => {
    e((s) => {
      const p = s.companyIds.length === 0 ? [i] : s.companyIds.includes(i) ? s.companyIds.filter((w) => w !== i) : [...s.companyIds, i];
      return He({ ...s, companyIds: p });
    });
  }, ai = () => {
    e((i) => ({ ...i, companyIds: [] }));
  }, ni = () => {
    e(Mt()), c(ma()), f(fa()), K([]), T(Oe().map((i) => i.id));
  }, ri = () => {
    e({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: [...qe()]
    });
  }, ii = () => {
    e({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: []
    });
  }, rn = (i) => {
    K((s) => s.includes(i) ? s : [...s, i]);
  }, on = () => {
    K([]);
  }, ln = Mn(() => {
    W((i) => !i);
  }, []), sn = (i, s) => {
    T((p) => qo(p, Y, i, s));
  }, cn = () => {
    window.location.hash = Sa({
      companySortMode: l,
      filterState: r,
      route: { kind: "timeline" },
      significanceDisplayLimit: d
    });
  }, Vt = (i) => {
    window.location.hash = Sa({
      companySortMode: l,
      filterState: r,
      route: { kind: "model", slug: i },
      significanceDisplayLimit: d
    });
  }, wa = () => {
    Q.kind === "model" && (ge.current = null, cn());
  }, dn = (i, s) => {
    if (U.current) {
      U.current = !1;
      return;
    }
    Ia(
      i,
      xe,
      wa,
      s
    );
  }, un = {
    attributeStats: ke,
    boardView: dt,
    companySortMode: l,
    companyOptions: Pe,
    domainStats: se,
    filterState: r,
    isOpen: u,
    onAttributeToggle: Jr,
    onClearAll: ii,
    onClearCompanyFilter: ai,
    onCompanyToggle: ti,
    onCompanySortModeChange: c,
    onContentTypeChange: ei,
    onDomainToggle: Qr,
    onReset: ni,
    onSelectAll: ri,
    onSignificanceDisplayLimitChange: f,
    onToggle: () => m((i) => !i),
    significanceDisplayLimit: d,
    totalMatchedCompanyCount: I.length,
    visibleCompanyCount: D.length
  }, Gt = (i, s) => {
    E.current = i, C.current = s, ea(ee.current, s, i), v(i), z(s);
  }, jt = (i, s) => {
    P.current = i, A.current = s, ea(te.current, s, i), k(i), de(s);
  }, mn = (i) => {
    var Ct;
    const s = x.current, p = s.lastFrameAt === null ? 1 / 60 : ie((i - s.lastFrameAt) / 1e3, 0, 0.064);
    s.lastFrameAt = i;
    const { target: w, zoomAnchor: F } = s;
    s.durationMs !== null && s.startedAt === null && (s.startedAt = i);
    const O = s.durationMs === null ? null : ie((i - (s.startedAt ?? i)) / s.durationMs, 0, 1), be = O === null ? 1 - Math.exp(-s.stiffness * p) : O * O * O * (O * (O * 6 - 15) + 10), Ne = O === null ? E.current : s.start.zoom, De = O === null ? C.current : s.start.camera, Te = gt(Ne, w.zoom, be), ye = F ? ht(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      Te
    ) : {
      x: gt(De.x, w.camera.x, be),
      y: gt(De.y, w.camera.y, be)
    };
    Gt(Te, ye);
    const et = Math.hypot(w.camera.x - ye.x, w.camera.y - ye.y), Dt = Math.abs(w.zoom - Te);
    if (O !== null ? O < 1 : et > An || Dt > Rn) {
      s.frameId = window.requestAnimationFrame(mn);
      return;
    }
    s.durationMs = null, s.frameId = null, s.lastFrameAt = null, s.startedAt = null;
    const Ma = F ? ht(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      w.zoom
    ) : w.camera;
    s.zoomAnchor = null, Gt(w.zoom, Ma), (Ct = s.complete) == null || Ct.call(s, "completed"), s.complete = null;
  }, fn = (i) => {
    var Ct;
    const s = N.current, p = s.lastFrameAt === null ? 1 / 60 : ie((i - s.lastFrameAt) / 1e3, 0, 0.064);
    s.lastFrameAt = i;
    const { target: w, zoomAnchor: F } = s;
    s.durationMs !== null && s.startedAt === null && (s.startedAt = i);
    const O = s.durationMs === null ? null : ie((i - (s.startedAt ?? i)) / s.durationMs, 0, 1), be = O === null ? 1 - Math.exp(-s.stiffness * p) : O * O * O * (O * (O * 6 - 15) + 10), Ne = O === null ? P.current : s.start.zoom, De = O === null ? A.current : s.start.camera, Te = gt(Ne, w.zoom, be), ye = F ? ht(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      Te
    ) : {
      x: gt(De.x, w.camera.x, be),
      y: gt(De.y, w.camera.y, be)
    };
    jt(Te, ye);
    const et = Math.hypot(w.camera.x - ye.x, w.camera.y - ye.y), Dt = Math.abs(w.zoom - Te);
    if (O !== null ? O < 1 : et > An || Dt > Rn) {
      s.frameId = window.requestAnimationFrame(fn);
      return;
    }
    s.durationMs = null, s.frameId = null, s.lastFrameAt = null, s.startedAt = null;
    const Ma = F ? ht(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      w.zoom
    ) : w.camera;
    s.zoomAnchor = null, jt(w.zoom, Ma), (Ct = s.complete) == null || Ct.call(s, "completed"), s.complete = null;
  }, qt = (i, s) => {
    var w;
    const p = x.current;
    return (w = p.complete) == null || w.call(p, "cancelled"), p.durationMs = (s == null ? void 0 : s.durationMs) === void 0 ? null : ie(s.durationMs, 120, 5e3), p.start = {
      camera: { ...C.current },
      zoom: E.current
    }, p.startedAt = null, p.target = i, p.stiffness = (s == null ? void 0 : s.stiffness) ?? rt, s ? p.zoomAnchor = s.zoomAnchor ?? null : p.zoomAnchor = null, new Promise((F) => {
      p.complete = F, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(mn));
    });
  }, Zt = (i, s) => {
    var w;
    const p = N.current;
    return (w = p.complete) == null || w.call(p, "cancelled"), p.durationMs = (s == null ? void 0 : s.durationMs) === void 0 ? null : ie(s.durationMs, 120, 5e3), p.start = {
      camera: { ...A.current },
      zoom: P.current
    }, p.startedAt = null, p.target = i, p.stiffness = (s == null ? void 0 : s.stiffness) ?? rt, s ? p.zoomAnchor = s.zoomAnchor ?? null : p.zoomAnchor = null, new Promise((F) => {
      p.complete = F, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(fn));
    });
  }, Ta = Mn(
    (i, s) => {
      const p = !h, w = p ? ne.mobile : ne.desktop;
      if (w.width <= 0 || w.height <= 0)
        return Promise.resolve("unavailable");
      const F = p ? Je : Qe, O = p ? Ot : Bt, be = Pr(
        i,
        pe.processedCompanies,
        F,
        O,
        p,
        1
      );
      if (!be)
        return Promise.resolve("unavailable");
      const Ne = yl(w, p, Ze), De = s != null && s.anchor ? {
        x: ie(s.anchor.x, 0, 1),
        y: ie(s.anchor.y, 0, 1)
      } : Ze && !p ? wl(w, Ne) : Tr, Te = Tl({
        anchor: De,
        bounds: be,
        focusMaxZoom: Math.min(
          (s == null ? void 0 : s.maxZoom) ?? (p ? Mo : To),
          p ? Kt : At
        ),
        insets: Ne,
        layout: F,
        maxZoom: p ? Kt : At,
        minZoom: p ? $t : Ke,
        viewport: w
      });
      if (!Te)
        return Promise.resolve("unavailable");
      const ye = {
        durationMs: s == null ? void 0 : s.durationMs,
        stiffness: (s == null ? void 0 : s.stiffness) ?? (i.kind === "slug" ? vo : rt)
      };
      return p ? Zt(Te, ye) : qt(Te, ye);
    },
    [
      Qe,
      Ke,
      Bt,
      Ze,
      h,
      Je,
      $t,
      Ot,
      pe.processedCompanies,
      ne.desktop,
      ne.mobile
    ]
  ), pn = (i) => ([x.current, N.current].forEach((s) => {
    var p;
    s.frameId !== null && window.cancelAnimationFrame(s.frameId), (p = s.complete) == null || p.call(s, "cancelled"), s.complete = null, s.durationMs = null, s.frameId = null, s.lastFrameAt = null, s.startedAt = null, s.zoomAnchor = null;
  }), i.filterState && e(He(i.filterState)), i.companySortMode !== void 0 && c(i.companySortMode), i.significanceDisplayLimit !== void 0 && f(i.significanceDisplayLimit), i.hiddenCompanyIds && K([...i.hiddenCompanyIds]), i.companyOrderIds && T(ga(i.companyOrderIds)), i.route && (ve(i.route), ge.current = null), i.showTimelineGrid !== void 0 && W(i.showTimelineGrid), (i.desktopCamera || i.desktopZoom !== void 0) && Gt(
    i.desktopZoom ?? E.current,
    i.desktopCamera ?? C.current
  ), (i.mobileCamera || i.mobileZoom !== void 0) && jt(
    i.mobileZoom ?? P.current,
    i.mobileCamera ?? A.current
  ), new Promise((s) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => s()));
  }));
  gi(
    t,
    () => ({
      cancelFocus() {
        [x.current, N.current].forEach((i) => {
          var s;
          i.frameId !== null && window.cancelAnimationFrame(i.frameId), (s = i.complete) == null || s.call(i, "cancelled"), i.complete = null, i.durationMs = null, i.frameId = null, i.lastFrameAt = null, i.startedAt = null, i.zoomAnchor = null;
        });
      },
      focus(i, s) {
        return i.kind === "default" ? h ? qt(pt(Qe), {
          durationMs: s == null ? void 0 : s.durationMs,
          stiffness: s == null ? void 0 : s.stiffness
        }) : Zt(pt(Je, !0), {
          durationMs: s == null ? void 0 : s.durationMs,
          stiffness: s == null ? void 0 : s.stiffness
        }) : Ta(i, s);
      },
      getState() {
        return {
          companyOrderIds: [...H],
          companySortMode: l,
          desktopCamera: { ...C.current },
          desktopZoom: E.current,
          filterState: {
            ...r,
            attributeIds: [...r.attributeIds],
            companyIds: [...r.companyIds],
            domainIds: [...r.domainIds]
          },
          hiddenCompanyIds: [...S],
          mobileCamera: { ...A.current },
          mobileZoom: P.current,
          route: { ...Q },
          showTimelineGrid: Z,
          significanceDisplayLimit: d
        };
      },
      restoreState(i) {
        return pn(i);
      },
      setState(i) {
        return pn(i);
      }
    }),
    [
      H,
      l,
      t,
      Qe,
      r,
      S,
      h,
      Ta,
      Je,
      Q,
      Z,
      d
    ]
  ), Re(() => {
    if (!Ze || !xe) {
      Ze || (ge.current = null);
      return;
    }
    if (!h) {
      ge.current = xe;
      return;
    }
    !j || L || ue.current !== null || (h ? ne.desktop : ne.mobile).width <= 0 || ge.current !== xe && Qa(pe.processedCompanies, xe) && (Ta({ kind: "slug", slug: xe }), ge.current = xe);
  }, [
    xe,
    Ze,
    h,
    L,
    j,
    pe.processedCompanies,
    ne.desktop,
    ne.mobile
  ]), Re(() => {
    const i = (s) => {
      const p = xl(s.key);
      if (n || !p || bl(s) || !j)
        return;
      const w = !h, F = w ? ne.mobile : ne.desktop;
      if (F.width <= 0 || F.height <= 0)
        return;
      const O = w ? Je : Qe, be = w ? ya : ba, Ne = hl(
        pe.processedCompanies,
        O,
        w,
        be
      );
      if (Ne.length === 0)
        return;
      const De = w ? A.current : C.current, Te = w ? P.current : E.current, ye = gl(
        pe.processedCompanies,
        O,
        w,
        be,
        xe,
        De,
        Te,
        F
      ), et = vl(ye, Ne, p, {
        excludeSlug: xe,
        minPrimaryDistance: xe ? _r : 0
      });
      !et || et.slug === xe || (s.preventDefault(), ge.current = null, Vt(et.slug));
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [
    xe,
    Qe,
    h,
    j,
    Je,
    ya,
    ba,
    n,
    pe.processedCompanies,
    ne.desktop,
    ne.mobile
  ]);
  const oi = () => {
    var s;
    const i = x.current;
    (s = i.complete) == null || s.call(i, "cancelled"), i.complete = null, i.frameId !== null && (window.cancelAnimationFrame(i.frameId), i.frameId = null), i.durationMs = null, i.lastFrameAt = null, i.startedAt = null, i.target = {
      camera: C.current,
      zoom: E.current
    }, i.stiffness = rt, i.zoomAnchor = null;
  }, li = () => {
    var s;
    const i = N.current;
    (s = i.complete) == null || s.call(i, "cancelled"), i.complete = null, i.frameId !== null && (window.cancelAnimationFrame(i.frameId), i.frameId = null), i.durationMs = null, i.lastFrameAt = null, i.startedAt = null, i.target = {
      camera: A.current,
      zoom: P.current
    }, i.stiffness = rt, i.zoomAnchor = null;
  }, si = () => {
    const i = R.current;
    me.current = ((i == null ? void 0 : i.clientWidth) ?? ne.desktop.width) / 2, ae.current = ((i == null ? void 0 : i.clientHeight) ?? ne.desktop.height) / 2, qt(pt(Qe));
  }, ci = () => {
    const i = B.current;
    J.current = ((i == null ? void 0 : i.clientWidth) ?? ne.mobile.width) / 2, X.current = ((i == null ? void 0 : i.clientHeight) ?? ne.mobile.height) / 2, Zt(pt(Je, !0));
  }, hn = (i, s) => {
    const p = R.current, w = ne.desktop, F = ie(
      (s == null ? void 0 : s.x) ?? me.current ?? ((p == null ? void 0 : p.clientWidth) ?? w.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? w.width
    ), O = ie(
      (s == null ? void 0 : s.y) ?? ae.current ?? ((p == null ? void 0 : p.clientHeight) ?? w.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? w.height
    ), be = x.current, Ne = E.current, De = Number(ie(i(Ne), Ke, At).toFixed(3));
    if (De === Ne)
      return;
    const Te = Yn({
      anchorX: F,
      anchorY: O,
      camera: C.current,
      existingAnchor: be.zoomAnchor,
      zoom: Ne
    }), ye = ht(
      Te.worldX,
      Te.worldY,
      F,
      O,
      De
    );
    qt(
      {
        camera: ye,
        zoom: De
      },
      { zoomAnchor: Te }
    );
  }, gn = (i, s) => {
    const p = B.current, w = ne.mobile, F = ie(
      (s == null ? void 0 : s.x) ?? J.current ?? ((p == null ? void 0 : p.clientWidth) ?? w.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? w.width
    ), O = ie(
      (s == null ? void 0 : s.y) ?? X.current ?? ((p == null ? void 0 : p.clientHeight) ?? w.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? w.height
    ), be = N.current, Ne = P.current, De = Number(ie(i(Ne), $t, Kt).toFixed(3));
    if (De === Ne)
      return;
    const Te = Yn({
      anchorX: F,
      anchorY: O,
      camera: A.current,
      existingAnchor: be.zoomAnchor,
      zoom: Ne
    }), ye = ht(
      Te.worldX,
      Te.worldY,
      F,
      O,
      De
    );
    Zt(
      {
        camera: ye,
        zoom: De
      },
      { zoomAnchor: Te }
    );
  };
  nt.current = (i) => {
    if (!R.current || i.deltaY === 0)
      return;
    i.cancelable && i.preventDefault();
    const s = R.current, p = s.getBoundingClientRect(), w = {
      x: ie(i.clientX - p.left, 0, s.clientWidth),
      y: ie(i.clientY - p.top, 0, s.clientHeight)
    };
    me.current = w.x, ae.current = w.y;
    const F = i.deltaMode === 1 ? i.deltaY * 16 : i.deltaMode === 2 ? i.deltaY * s.clientHeight : i.deltaY;
    hn(
      (O) => kt(O, -F * ho, Ke, At),
      w
    );
  }, Re(() => {
    if (!j || !h)
      return;
    const i = R.current;
    if (!i)
      return;
    const s = (p) => nt.current(p);
    return i.addEventListener("wheel", s, { passive: !1 }), () => {
      i.removeEventListener("wheel", s);
    };
  }, [h, j]);
  const di = (i) => {
    var F;
    if (i.pointerType !== "mouse" || i.button !== 0 || !R.current)
      return;
    const s = R.current, p = s.getBoundingClientRect();
    me.current = i.clientX - p.left, ae.current = i.clientY - p.top, oi(), U.current = !1, ue.current = i.pointerId, ce.current = {
      lastX: i.clientX,
      lastY: i.clientY,
      startX: i.clientX,
      startY: i.clientY
    }, s.setPointerCapture(i.pointerId), (F = fe.current) == null || F.call(fe);
    const w = (O) => nt.current(O);
    window.addEventListener("wheel", w, { capture: !0, passive: !1 }), fe.current = () => {
      window.removeEventListener("wheel", w, !0);
    }, nr(() => G(!0)), i.preventDefault();
  }, vn = () => {
    if (Ce.current = null, !R.current)
      return;
    const i = Ye.current;
    if (!i || ue.current === null)
      return;
    const p = R.current.getBoundingClientRect(), w = i.clientX - p.left;
    me.current = w, ae.current = i.clientY - p.top;
    const F = i.clientX - ce.current.lastX, O = i.clientY - ce.current.lastY, be = {
      x: C.current.x - F / Math.max(E.current, 1e-3),
      y: C.current.y - O / Math.max(E.current, 1e-3)
    };
    x.current.target = {
      camera: be,
      zoom: E.current
    }, C.current = be, ea(ee.current, be, E.current), ce.current.lastX = i.clientX, ce.current.lastY = i.clientY;
  }, ui = (i) => {
    if (i.pointerType === "mouse" && R.current) {
      const s = R.current.getBoundingClientRect();
      me.current = ie(
        i.clientX - s.left,
        0,
        R.current.clientWidth
      ), ae.current = ie(
        i.clientY - s.top,
        0,
        R.current.clientHeight
      );
    }
    i.pointerId === ue.current && (Ye.current = {
      clientX: i.clientX,
      clientY: i.clientY
    }, Ce.current === null && (Ce.current = window.requestAnimationFrame(vn)), i.preventDefault());
  }, mi = (i) => {
    var p;
    if (i.pointerId !== ue.current || !R.current)
      return;
    Ce.current !== null && (window.cancelAnimationFrame(Ce.current), Ce.current = null, vn()), R.current.hasPointerCapture(i.pointerId) && R.current.releasePointerCapture(i.pointerId), ue.current = null, Ye.current = null, (p = fe.current) == null || p.call(fe), fe.current = null, Math.hypot(
      i.clientX - ce.current.startX,
      i.clientY - ce.current.startY
    ) > Ln ? U.current = !0 : Ia(
      i.target,
      xe,
      wa,
      { clientX: i.clientX, clientY: i.clientY }
    ), z(C.current), G(!1);
  }, xn = (i, s) => Math.hypot(s.clientX - i.clientX, s.clientY - i.clientY), bn = (i, s) => ({
    clientX: (i.clientX + s.clientX) / 2,
    clientY: (i.clientY + s.clientY) / 2
  }), yn = (i, s) => {
    const p = s.getBoundingClientRect();
    J.current = ie(i.clientX - p.left, 0, s.clientWidth), X.current = ie(i.clientY - p.top, 0, s.clientHeight);
  }, wn = (i, s) => {
    const p = {
      x: A.current.x - i / Math.max(P.current, 1e-3),
      y: A.current.y - s / Math.max(P.current, 1e-3)
    };
    N.current.target = {
      camera: p,
      zoom: P.current
    }, A.current = p, ea(te.current, p, P.current);
  }, Tn = (i) => i instanceof Element && !i.closest("[data-timeline-pin]") && !!i.closest("button, a, input, label, select, textarea, [data-row-focus-label]"), ft = (i) => ({
    clientX: i.clientX,
    clientY: i.clientY
  }), Nt = (i) => {
    if (i.length === 0) {
      $e.current = null, J.current = null, X.current = null;
      return;
    }
    if (i.length === 1) {
      const F = ft(i[0]);
      $e.current = {
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
    const s = ft(i[0]), p = ft(i[1]), w = bn(s, p);
    $e.current = {
      distance: Math.max(xn(s, p), 1),
      lastMidpointX: w.clientX,
      lastMidpointY: w.clientY,
      lastX: w.clientX,
      lastY: w.clientY,
      startX: w.clientX,
      startY: w.clientY,
      type: "pinch"
    };
  }, fi = (i) => {
    !B.current || Tn(i.target) || (li(), Nt(i.touches));
  }, pi = (i) => {
    if (!B.current || Tn(i.target))
      return;
    const s = B.current, p = $e.current;
    if (!p) {
      Nt(i.touches);
      return;
    }
    if (i.touches.length === 1) {
      const ye = ft(i.touches[0]);
      if (yn(ye, s), p.type === "pan") {
        const et = ye.clientX - p.lastX, Dt = ye.clientY - p.lastY;
        wn(et, Dt), p.lastX = ye.clientX, p.lastY = ye.clientY;
      } else
        Nt(i.touches);
      i.preventDefault();
      return;
    }
    if (i.touches.length < 2)
      return;
    const w = ft(i.touches[0]), F = ft(i.touches[1]), O = bn(w, F), be = Math.max(xn(w, F), 1);
    if (yn(O, s), p.type !== "pinch") {
      Nt(i.touches), i.preventDefault();
      return;
    }
    const Ne = O.clientX - p.lastMidpointX, De = O.clientY - p.lastMidpointY;
    wn(Ne, De);
    const Te = ie(be / Math.max(p.distance, 1), 0.78, 1.28);
    gn((ye) => ye * Te, {
      x: J.current ?? s.clientWidth / 2,
      y: X.current ?? s.clientHeight / 2
    }), p.distance = be, p.lastMidpointX = O.clientX, p.lastMidpointY = O.clientY, p.lastX = O.clientX, p.lastY = O.clientY, i.preventDefault();
  }, hi = (i) => {
    const s = $e.current;
    if (Nt(i.touches), de(A.current), !s || s.type !== "pan" || i.changedTouches.length === 0)
      return;
    const p = i.changedTouches[0];
    Math.hypot(p.clientX - s.startX, p.clientY - s.startY) > Ln || Ia(
      p.target,
      xe,
      wa,
      { clientX: p.clientX, clientY: p.clientY }
    );
  };
  return Oe().length === 0 ? /* @__PURE__ */ o(
    tr,
    {
      title: ze.emptyDataTitle,
      detail: ze.emptyDataDetail
    }
  ) : pe.invalidEntries.length > 0 ? /* @__PURE__ */ o(
    tr,
    {
      title: ze.timelineStatusDataErrorTitle,
      detail: ze.timelineStatusDataErrorDetail(pe.invalidEntries)
    }
  ) : j ? /* @__PURE__ */ g(
    "div",
    {
      "data-timeline-presentation": n ? "" : void 0,
      className: `relative isolate min-h-[100dvh] overflow-hidden bg-[var(--page-bg)] text-[var(--ink)] selection:bg-emerald-500/25 selection:text-[var(--ink)] ${n ? "pointer-events-none" : ""}`,
      children: [
        /* @__PURE__ */ o(rs, {}),
        /* @__PURE__ */ g("div", { className: "relative z-10", children: [
          h ? null : /* @__PURE__ */ o("div", { className: "md:hidden", children: /* @__PURE__ */ o(
            ls,
            {
              activeArticleSlug: xe,
              boardView: dt,
              camera: _,
              currentGlobalDay: Ae,
              handleTouchEnd: hi,
              handleTouchMove: pi,
              handleTouchStart: fi,
              handleZoomChange: gn,
              hiddenCompanyCount: $,
              latestCompany: an,
              minZoom: $t,
              maxZoom: Kt,
              maxDays: Yt,
              maxSummaryQuietDays: nn,
              modelExplorer: /* @__PURE__ */ o(Bn, { ...un, variant: "rail" }),
              monthTicks: Zr,
              onCompanyHide: rn,
              onCompanyMove: sn,
              onDismissArticle: dn,
              onModelSelect: Vt,
              onResetCamera: ci,
              onShowHiddenCompanies: on,
              onToggleTimelineGrid: ln,
              processedCompanies: pe.processedCompanies,
              renderWindow: Gr,
              scrollContainerRef: B,
              showTimelineGrid: Z,
              timelineStartDay: zt,
              timelineWidth: xa,
              viewport: ne.mobile,
              worldRef: te,
              yearTicks: Kr,
              zoom: M
            }
          ) }),
          h ? /* @__PURE__ */ o("div", { className: "hidden md:block", children: /* @__PURE__ */ o(
            os,
            {
              activeArticleSlug: xe,
              boardView: dt,
              camera: q,
              currentGlobalDay: Ae,
              handlePointerDown: di,
              handlePointerMove: ui,
              handleZoomChange: hn,
              hiddenCompanyCount: $,
              isPanning: L,
              latestCompany: an,
              maxDays: Ut,
              minZoom: Ke,
              maxZoom: At,
              maxSummaryQuietDays: nn,
              modelExplorer: /* @__PURE__ */ o(Bn, { ...un, variant: "rail" }),
              monthTicks: jr,
              onCompanyHide: rn,
              onCompanyMove: sn,
              onDismissArticle: dn,
              onModelSelect: Vt,
              onResetCamera: si,
              onShowHiddenCompanies: on,
              onToggleTimelineGrid: ln,
              processedCompanies: pe.processedCompanies,
              renderWindow: Vr,
              scrollContainerRef: R,
              showTimelineGrid: Z,
              stopPanning: mi,
              summaryCompanies: Et,
              timelineStartDay: Xt,
              timelineWidth: va,
              viewport: ne.desktop,
              worldRef: ee,
              yearTicks: qr,
              zoom: y
            }
          ) }) : null
        ] }),
        /* @__PURE__ */ o(je, { children: Ze && !n ? /* @__PURE__ */ o(
          jl,
          {
            entry: Ie,
            onBack: cn,
            onNavigate: Vt,
            requestedSlug: xe ?? ""
          }
        ) : null })
      ]
    }
  ) : /* @__PURE__ */ o(is, {});
}
export {
  cr as DAY_MS,
  hs as TimelineExperience,
  ps as buildTimelineArticleIndex,
  _i as createTimelineItemSlug,
  Fi as formatDaysSince,
  Le as formatTimelineDate,
  dr as formatTimelineDateRange,
  ur as getTimelineItemSlug,
  Pi as getUtcCalendarDayDelta,
  fs as indexTimelineArticles,
  _e as parseTimelineDate,
  $i as withDaysSinceFact
};
