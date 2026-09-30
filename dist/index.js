import { jsx as o, jsxs as h, Fragment as wt } from "react/jsx-runtime";
import Lt, { useState as Me, useRef as ne, useMemo as Ee, useEffect as Re, useCallback as bn, useImperativeHandle as ui, useLayoutEffect as mi } from "react";
import { flushSync as Qn } from "react-dom";
import { EyeOff as Jn, Eye as er, RotateCcw as la, Layers3 as st, ArrowLeft as fi, CalendarDays as ca, BookOpen as tr, ExternalLink as pi, ArrowUp as hi, ArrowDown as gi, X as ar, SlidersHorizontal as vi, ChevronDown as xi, ArrowRight as bi, Sparkles as yi, Check as wi, BrainCircuit as Ti, Globe2 as Mi, Image as Ei, Clapperboard as nr, AudioLines as Ni, Box as Di, Code2 as Ci, Bot as Ai, CarFront as Ri } from "lucide-react";
import { AnimatePresence as Ge, motion as ye } from "motion/react";
const rr = 1e3 * 60 * 60 * 24;
function Si(t, a, n, r) {
  const e = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${e(t)}-${e(a)}-${e(n)}-${r}`;
}
function Le(t) {
  return /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
}
const yn = /* @__PURE__ */ new Map();
function Ma(t, a) {
  const n = JSON.stringify(a);
  let r = yn.get(n);
  return r || (r = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...a }), yn.set(n, r)), r.format(t);
}
function ke(t, a = { month: "short", day: "numeric", year: "numeric" }, n = "day") {
  const r = typeof t == "string" ? Le(t) : t;
  return Number.isNaN(r.getTime()) ? typeof t == "string" ? t : "Date unavailable" : n === "year" ? Ma(r, { year: "numeric" }) : n === "month" ? Ma(r, { month: "short", year: "numeric" }) : Ma(r, a);
}
function ir(t, a, n = "day", r = "day") {
  if (!a || a === t)
    return ke(t, void 0, n);
  const e = Le(t), s = Le(a);
  if (Number.isNaN(e.getTime()) || Number.isNaN(s.getTime()))
    return `${t} - ${a}`;
  if (s.getTime() < e.getTime())
    return `${ke(t, void 0, n)} - ${ke(a, void 0, r)}`;
  if (n !== "day" || r !== "day")
    return `${ke(e, void 0, n)} - ${ke(s, void 0, r)}`;
  const c = e.getUTCFullYear() === s.getUTCFullYear();
  return c && e.getUTCMonth() === s.getUTCMonth() ? `${ke(e, { month: "short", day: "numeric" })}-${ke(s, { day: "numeric" })}, ${s.getUTCFullYear()}` : c ? `${ke(e, { month: "short", day: "numeric" })} - ${ke(s, { month: "short", day: "numeric", year: "numeric" })}` : `${ke(e)} - ${ke(s)}`;
}
function Ii(t, a = /* @__PURE__ */ new Date()) {
  const n = Le(t);
  if (Number.isNaN(n.getTime()))
    return null;
  const r = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()), e = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  return Math.round((e - r) / rr);
}
function ki(t, a = /* @__PURE__ */ new Date()) {
  const n = Ii(t, a);
  return n === null ? null : n === 0 ? "Today" : n === 1 ? "1 day ago" : n === -1 ? "Tomorrow" : n > 1 ? `${n.toLocaleString("en-US")} days ago` : `in ${Math.abs(n).toLocaleString("en-US")} days`;
}
function Li(t, {
  date: a,
  eventKind: n,
  now: r
}) {
  const e = ki(a, r);
  if (!e)
    return t;
  const s = n === "event" ? "Time since event" : "Time since release", c = { label: s, value: e }, d = t.findIndex((m) => m.label === s);
  if (d >= 0)
    return t.map((m, g) => g === d ? c : m);
  const f = n === "event" ? "Event date" : "Release date", u = t.findIndex((m) => m.label === f);
  return u === -1 ? [...t, c] : [...t.slice(0, u + 1), c, ...t.slice(u + 1)];
}
function or(t, a, n) {
  return n.articleSlug ?? Si(t, a, n.name, n.date);
}
function al(t) {
  return t.reduce((a, n) => (a[n.slug] = n, a), {});
}
function nl({
  articlesBySlug: t,
  eventTypesById: a,
  fallbackEventTypeId: n,
  groups: r
}) {
  const e = [];
  return r.forEach((s) => {
    s.productLines.forEach((c) => {
      const d = [...c.releases].sort(
        (u, m) => Le(u.date).getTime() - Le(m.date).getTime()
      ), f = d.map((u) => or(s.id, c.id, u));
      d.forEach((u, m) => {
        var L, X;
        const g = f[m], w = a[u.eventType ?? n] ?? a[n], y = Le(u.date), x = u.endDate ? Le(u.endDate) : y, M = Number.isNaN(y.getTime()) || Number.isNaN(x.getTime()) ? 1 : Math.max(1, Math.round((x.getTime() - y.getTime()) / rr) + 1);
        e.push({
          accent: s.accent,
          article: t[g] ?? null,
          classes: u.classes ?? c.defaultClasses ?? s.defaultClasses ?? [c.classId],
          companyLogoMark: s.logoMark ?? "generic",
          companyId: s.id,
          companyName: s.name,
          date: u.date,
          dateLabel: ke(u.date, void 0, u.datePrecision),
          dateRangeLabel: ir(u.date, u.endDate, u.datePrecision),
          durationDays: M,
          endDate: u.endDate,
          endDateLabel: u.endDate ? ke(u.endDate) : void 0,
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
let Pa = null;
function _i(t) {
  Pa = t;
}
function he() {
  if (!Pa)
    throw new Error("TimelineExperience requires a timeline definition before rendering.");
  return Pa;
}
function ze() {
  return he().groups;
}
function Pi() {
  return he().facets;
}
function sr() {
  return he().filterGroups;
}
function je() {
  return sr().flatMap((t) => t.domainIds);
}
function rt() {
  return he().attributeFilterIds;
}
function Fi() {
  const t = he().defaultFilterState;
  return {
    attributeIds: [...t.attributeIds],
    companyIds: [...t.companyIds],
    contentType: t.contentType,
    domainIds: [...t.domainIds]
  };
}
function da() {
  return he().contentTypeOptions;
}
function ua() {
  return he().defaultSortMode;
}
function lr() {
  return he().displayLimits;
}
function ma() {
  return he().defaultDisplayLimit;
}
function $i() {
  return he().eventTypes.reduce(
    (t, a) => (t[a.id] = a, t),
    {}
  );
}
function tt() {
  return he().copy;
}
function it() {
  return Le(he().startDate);
}
function ea(t, a) {
  if (t.length !== a.length)
    return !1;
  const n = new Set(a);
  return t.every((r) => n.has(r));
}
function We(t, a) {
  const n = new Set(t);
  return a.filter((r) => n.has(r));
}
function Tt() {
  return Fi();
}
function Oe(t) {
  const a = ze().map((n) => n.id);
  return {
    attributeIds: We(t.attributeIds, rt()),
    companyIds: We(t.companyIds, a),
    contentType: da().some((n) => n.id === t.contentType) ? t.contentType : "all",
    domainIds: We(t.domainIds, je())
  };
}
function cr(t, a) {
  return t.contentType === a.contentType && ea(t.attributeIds, a.attributeIds) && ea(t.companyIds, a.companyIds) && ea(t.domainIds, a.domainIds);
}
function ta(t) {
  return Pi().find((a) => a.id === t);
}
function wn(t) {
  var a;
  return ((a = ta(t)) == null ? void 0 : a.label) ?? t;
}
function Ui(t) {
  return new Set(je()).has(t);
}
function Xi(t) {
  return We(t.filter(Ui), je());
}
function Ea(t) {
  return t.join(",");
}
function Na(t, a) {
  if (!t)
    return [];
  const n = t.split(",").map((r) => r.trim()).filter(Boolean);
  return We(n, a);
}
function Tn(t) {
  return t.productLines.reduce((a, n) => {
    const r = n.releases.reduce((e, s) => {
      const c = Le(s.date).getTime();
      return Number.isNaN(c) ? e : Math.max(e, c);
    }, 0);
    return Math.max(a, r);
  }, 0);
}
function Yi(t) {
  var a, n;
  return ((n = (a = he().scoring) == null ? void 0 : a.getFacetSignificanceBase) == null ? void 0 : n.call(a, t)) ?? 50;
}
function zi(t) {
  var a, n;
  return ((n = (a = he().scoring) == null ? void 0 : a.getEventTypeSignificanceBonus) == null ? void 0 : n.call(a, t)) ?? 0;
}
function Bi(t, a) {
  var e, s;
  const n = (s = (e = he().scoring) == null ? void 0 : e.getRecencySignificanceBonus) == null ? void 0 : s.call(
    e,
    t,
    a
  );
  if (n !== void 0)
    return n;
  const r = a - t;
  return r < 0 ? 2 : r <= 60 ? 12 : r <= 180 ? 9 : r <= 365 ? 6 : r <= 730 ? 3 : 0;
}
function dr(t, a, n, r) {
  var x, M, L, X;
  const e = Le(n.date), s = n.endDate ? Le(n.endDate) : e, c = Number.isNaN(s.getTime()) ? 0 : Math.round((s.getTime() - it().getTime()) / ot), d = Ya(t, a, n), f = Mr(t, a, n), u = za(n), m = d.reduce(
    (te, j) => Math.max(te, Yi(j)),
    40
  ), g = ((M = (x = he().scoring) == null ? void 0 : x.getTagSignificanceBonus) == null ? void 0 : M.call(x, f)) ?? 0, w = ((X = (L = he().scoring) == null ? void 0 : L.getGroupRankBonus) == null ? void 0 : X.call(L, t)) ?? 0, y = m + g + w + zi(u.id) + Bi(c, r);
  return ie(Math.round(y), 1, 100);
}
function Oi(t, a, n) {
  return a.releases.reduce(
    (r, e) => Math.max(r, dr(t, a, e, n)),
    0
  );
}
function Mn(t, a) {
  return t.productLines.reduce(
    (n, r) => Math.max(n, Oi(t, r, a)),
    0
  );
}
function Wi(t, a, n) {
  const r = [...t];
  return a === "significance" ? (r.sort(
    (e, s) => Mn(s, n) - Mn(e, n) || (e.raceRank ?? 999) - (s.raceRank ?? 999) || e.name.localeCompare(s.name)
  ), r) : a === "latest" ? (r.sort(
    (e, s) => Tn(s) - Tn(e) || e.name.localeCompare(s.name)
  ), r) : (r.sort((e, s) => e.name.localeCompare(s.name)), r);
}
const ot = 1e3 * 60 * 60 * 24, _e = 2.24, Ua = [0.22, 1, 0.36, 1], Ue = { duration: 0.34, ease: Ua }, ur = { duration: 0.24, ease: Ua }, Hi = { duration: 0.4, ease: Ua }, vt = 320, xt = 196, Vi = "#05070b", Gi = 72, ji = 80, qi = 56, Zi = 60, Ki = 8, Qi = 44, Ji = 32, eo = 96, to = 56, ao = 80, no = 40, Rt = 1, St = 1.05, Ct = 4, Zt = 3.4, ro = 420, io = 360, mr = 180, oo = 300, so = 180, lo = 260, fr = 112, co = 380, Da = 0.06, bt = 6, pr = 0.92, uo = 25e-5, mo = 0.025, nt = 18, fo = 8, En = 0.08, Nn = 6e-4, po = 720, ho = 720, Dn = 540, go = 120, Cn = 90, An = 180, Ca = 420, Aa = 168, gt = 64, vo = 0.88, xo = 1.65, bo = 1.45, Rn = 6, yo = {
  bottom: 48,
  left: 24,
  right: 24,
  top: 72
}, hr = 760, gr = 0.58, wo = 0.58, vr = { x: 0.5, y: 0.46 };
function xr(t) {
  return t ? he().wideLogoMarks.includes(t) : !1;
}
function Xa(t) {
  return `${"/".endsWith("/") ? "/" : "//"}${t.replace(/^\/+/, "")}`;
}
function fa(t) {
  const a = t.replace(/^#\/?/, ""), n = a.indexOf("?"), r = n >= 0 ? a.slice(0, n) : a, e = n >= 0 ? a.slice(n + 1) : "";
  return {
    params: new URLSearchParams(e),
    path: r
  };
}
function br(t) {
  const { path: a } = fa(t);
  if (!a)
    return { kind: "timeline" };
  const r = (he().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), e = a.match(new RegExp(`^(?:${r}|events)/([^/?#]+)$`));
  return e ? { kind: "model", slug: decodeURIComponent(e[1]) } : { kind: "timeline" };
}
function yr(t) {
  const { params: a } = fa(t), n = a.get("ct"), r = Tt();
  return Oe({
    attributeIds: Na(a.get("a"), rt()),
    companyIds: Na(a.get("co"), ze().map((e) => e.id)),
    contentType: da().some((e) => e.id === n) ? n : "all",
    domainIds: a.has("d") ? Na(a.get("d"), je()) : r.domainIds
  });
}
function wr(t) {
  const a = fa(t).params.get("sort");
  return a && he().sortOptions.some((n) => n.id === a) ? a : ua();
}
function Tr(t) {
  const a = fa(t).params.get("rows");
  if (a === "all")
    return "all";
  const n = Number.parseInt(a ?? "", 10);
  return lr().includes(n) ? n : ma();
}
function Ra({
  companySortMode: t,
  filterState: a,
  route: n,
  significanceDisplayLimit: r
}) {
  const e = Oe(a), s = Tt(), c = new URLSearchParams();
  ea(e.domainIds, s.domainIds) || c.set("d", Ea(e.domainIds)), e.attributeIds.length > 0 && c.set("a", Ea(e.attributeIds)), e.contentType !== s.contentType && c.set("ct", e.contentType), e.companyIds.length > 0 && c.set("co", Ea(e.companyIds)), t !== ua() && c.set("sort", t), r !== ma() && c.set("rows", String(r));
  const d = he().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items", f = n.kind === "model" ? `/${d}/${encodeURIComponent(n.slug)}` : "/", u = c.toString().replaceAll("%2C", ",");
  return `#${f}${u ? `?${u}` : ""}`;
}
function To() {
  return typeof window > "u" ? { kind: "timeline" } : br(window.location.hash);
}
function Mo() {
  return typeof window > "u" ? Tt() : yr(window.location.hash);
}
function Eo() {
  return typeof window > "u" ? ua() : wr(window.location.hash);
}
function No() {
  return typeof window > "u" ? ma() : Tr(window.location.hash);
}
function Do(t) {
  return !(t instanceof Element) || t.closest(
    "button, a, input, label, select, textarea, [data-row-focus-label], [data-timeline-pin]"
  ) ? !1 : !!t.closest("[data-timeline-field]");
}
function Co(t, a) {
  if (a && typeof document < "u") {
    const n = document.elementFromPoint(a.clientX, a.clientY);
    if (n)
      return n;
  }
  return t;
}
function Sa(t, a, n, r) {
  if (!a)
    return;
  const e = Co(t, r);
  Do(e) && n();
}
function Ao(t, a) {
  return ke(t, a);
}
function Ia(t, a, n) {
  const r = t.replace("#", ""), e = r.length === 3 ? r.split("").map((m) => `${m}${m}`).join("") : r, s = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e))
    return t;
  const c = Number.parseInt(e.slice(0, 2), 16), d = Number.parseInt(e.slice(2, 4), 16), f = Number.parseInt(e.slice(4, 6), 16), u = (m) => Math.round(m + (a - m) * s);
  return `rgb(${u(c)} ${u(d)} ${u(f)})`;
}
function Ro(t, a, n) {
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
function So(t, a) {
  return a.defaultClasses ?? t.defaultClasses ?? [a.classId];
}
function Io(t, a) {
  return a.defaultPresets ?? t.defaultPresets;
}
function ko(t, a, n) {
  return n.classes ?? So(t, a);
}
function Ya(t, a, n) {
  return n.presets ?? Io(t, a);
}
function Lo(t) {
  return t.defaultTags ?? [];
}
function Mr(t, a, n) {
  return n.tags ?? Lo(a);
}
function za(t) {
  const a = $i(), n = he().defaultEventTypeId;
  return a[t.eventType ?? n] ?? a[n];
}
function _o(t) {
  var f;
  const a = Oe(t), n = je().filter((u) => a.domainIds.includes(u)), r = cr(a, Tt()), e = tt();
  if (n.length === 0)
    return {
      description: e.emptyBoardDetail,
      isComposite: !0,
      isDefault: !1,
      isEmpty: !0,
      label: e.emptyBoardLabel
    };
  if (r) {
    const u = a.domainIds[0], m = u ? ta(u) : null;
    return {
      description: (m == null ? void 0 : m.description) ?? e.defaultBoardDescription,
      isComposite: !1,
      isDefault: !0,
      isEmpty: !1,
      label: (m == null ? void 0 : m.label) ?? n.join(", ")
    };
  }
  const c = [n.length === je().length ? "All domains" : n.length === 1 ? wn(n[0]) : `${n.length} domains`];
  a.attributeIds.forEach((u) => {
    c.push(wn(u));
  });
  const d = Tt().contentType;
  return a.contentType !== d && c.push(
    ((f = da().find((u) => u.id === a.contentType)) == null ? void 0 : f.label) ?? a.contentType
  ), a.companyIds.length > 0 && c.push(`${a.companyIds.length} ${e.groupPluralLabel}`), {
    description: c.join(", "),
    isComposite: c.length > 1 || n.length > 1,
    isDefault: !1,
    isEmpty: !1,
    label: c.join(" · ")
  };
}
function Po(t, a) {
  if (a === "all")
    return !0;
  const n = za(t), r = n.kind === "event" || n.id === "product-launch";
  return a === "events" ? r : !r;
}
function Fo(t, a, n, r) {
  const e = Ya(t, a, n), s = r.domainIds.some((d) => e.includes(d)), c = r.attributeIds.length === 0 || r.attributeIds.some((d) => e.includes(d));
  return s && c && Po(n, r.contentType);
}
function pa(t, a, n = {}) {
  const r = Oe(a), e = new Set(r.companyIds);
  return r.domainIds.length === 0 ? [] : t.filter((s) => n.ignoreCompanyFilter || e.size === 0 || e.has(s.id)).map((s) => ({
    ...s,
    productLines: s.productLines.map((c) => ({
      ...c,
      releases: c.releases.filter(
        (d) => Fo(s, c, d, r)
      )
    })).filter((c) => c.releases.length > 0)
  })).filter((s) => s.productLines.length > 0);
}
function Er(t) {
  return {
    providerCount: t.length,
    releaseCount: t.reduce(
      (a, n) => a + n.productLines.reduce((r, e) => r + e.releases.length, 0),
      0
    )
  };
}
function $o(t, a) {
  return je().reduce((n, r) => (n[r] = Er(
    pa(t, { ...a, companyIds: [], domainIds: [r] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function Uo(t, a) {
  return rt().reduce((n, r) => (n[r] = Er(
    pa(t, { ...a, attributeIds: [r], companyIds: [] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function Xo(t, a) {
  return pa(t, { ...a, companyIds: [] }, { ignoreCompanyFilter: !0 }).map((n) => ({
    id: n.id,
    name: n.name,
    releaseCount: n.productLines.reduce((r, e) => r + e.releases.length, 0)
  }));
}
function Yo(t) {
  const a = t.productLines.find((n) => n.classId !== "events") ?? t.productLines[0];
  return (a == null ? void 0 : a.classId) ?? t.defaultClasses[0] ?? he().defaultClassId;
}
function zo(t, a, n) {
  const r = [...t], [e] = r.splice(a, 1);
  return e === void 0 ? t : (r.splice(n, 0, e), r);
}
function ha(t) {
  const a = new Set(ze().map((s) => s.id)), n = t.filter((s) => a.has(s)), r = new Set(n), e = ze().map((s) => s.id).filter((s) => !r.has(s));
  return [...n, ...e];
}
function Bo(t, a, n, r, e) {
  const s = new Map(t.map((m) => [m.id, m])), c = new Set(n), d = ha(a).map((m) => s.get(m)).filter((m) => !!m), f = new Set(d.map((m) => m.id)), u = t.filter((m) => !f.has(m.id));
  return Wi(
    [...d, ...u].filter((m) => !c.has(m.id)),
    r,
    e
  );
}
function Oo(t, a, n) {
  if (a === "all")
    return t;
  const r = t.slice(0, a);
  if (!n || r.some((s) => s.id === n))
    return r;
  const e = t.find((s) => s.id === n);
  return e ? [...r, e] : r;
}
function Wo(t, a, n, r) {
  if (n === r)
    return t;
  const e = new Set(a), s = ha(t), c = s.filter((g) => e.has(g)), d = c.indexOf(n), f = c.indexOf(r);
  if (d < 0 || f < 0)
    return s;
  const u = zo(c, d, f);
  let m = 0;
  return s.map((g) => {
    if (!e.has(g))
      return g;
    const w = u[m];
    return m += 1, w ?? g;
  });
}
function Ho(t, a, n, r) {
  const e = new Set(a), s = ha(t).filter(
    (f) => e.has(f)
  ), c = s.indexOf(n), d = r === "up" ? c - 1 : c + 1;
  return c < 0 || d < 0 || d >= s.length ? t : Wo(t, a, n, s[d]);
}
function Vo(t, a) {
  const n = [], r = t.map((c) => {
    const d = c.productLines.map((x) => {
      const L = x.releases.map((T) => ({
        ...T,
        classes: ko(c, x, T),
        presets: Ya(c, x, T),
        tags: Mr(c, x, T)
      })).sort((T, k) => {
        const Y = Le(T.date).getTime(), _ = Le(k.date).getTime();
        return Y - _ || T.name.localeCompare(k.name);
      }).reduce((T, k) => {
        const Y = Le(k.date), _ = k.endDate ? Le(k.endDate) : Y;
        if (Number.isNaN(Y.getTime()))
          return n.push(`${c.name} / ${x.label}: ${k.name}`), T;
        if (k.endDate && Number.isNaN(_.getTime()))
          return n.push(`${c.name} / ${x.label}: ${k.name} end date`), T;
        const W = T[T.length - 1], Z = Math.round((Y.getTime() - it().getTime()) / ot), K = Number.isNaN(_.getTime()) ? Z : Math.max(Z, Math.round((_.getTime() - it().getTime()) / ot)), H = W ? Z - W.globalDay : 0, de = za(k), q = dr(c, x, k, a);
        return T.push({
          ...k,
          articleSlug: or(c.id, x.id, k),
          dateLabel: ke(Y, void 0, k.datePrecision),
          dateRangeLabel: ir(k.date, k.endDate, k.datePrecision),
          durationDays: K - Z + 1,
          endDateLabel: k.endDate ? ke(k.endDate) : void 0,
          endGlobalDay: K,
          eventKind: de.kind,
          eventType: de.id,
          eventTypeLabel: de.label,
          eventTypeShortLabel: de.shortLabel,
          globalDay: Z,
          gap: H,
          significanceScore: q
        }), T;
      }, []), X = L[L.length - 1] ?? null, te = L.reduce((T, k) => T + k.gap, 0), j = L.length > 1 ? Math.round(te / (L.length - 1)) : null, oe = L[0], J = L.reduce(
        (T, k) => Math.max(T, k.significanceScore),
        0
      );
      return {
        ...x,
        averageGap: j,
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
function Sn({ endDay: t, startDay: a }) {
  const n = [], r = [], e = Math.floor(a), s = Math.max(e, Math.ceil(t)), c = new Date(it().getTime() + e * ot), d = new Date(it().getTime() + s * ot), f = new Date(Date.UTC(c.getUTCFullYear(), c.getUTCMonth(), 1));
  for (f.getTime() < c.getTime() && f.setUTCMonth(f.getUTCMonth() + 1); f <= d; ) {
    const u = Math.round((f.getTime() - it().getTime()) / ot);
    f.getUTCMonth() === 0 ? r.push({ days: u, label: f.getUTCFullYear() }) : n.push({
      days: u,
      label: Ao(f, { month: "short" })
    }), f.setUTCMonth(f.getUTCMonth() + 1);
  }
  return { monthTicks: n, yearTicks: r };
}
function aa({
  camera: t,
  compact: a = !1,
  futureBufferDays: n = 0,
  pastBufferDays: r = 0,
  viewport: e,
  zoom: s
}) {
  if (e.width <= 0)
    return { endDay: 0, startDay: 0 };
  const c = a ? xt : vt, d = a ? fr : mr, f = Math.max(s, 1e-3), u = t.x, m = t.x + e.width / f, g = (u - d - c) / _e, w = (m - d - c) / _e, y = Math.floor(g - r);
  return { endDay: Math.max(y + 30, Math.ceil(w + n)), startDay: y };
}
function na(t, a = go) {
  const n = Math.max(1, a);
  return {
    endDay: Math.ceil(t.endDay / n) * n,
    startDay: Math.floor(t.startDay / n) * n
  };
}
function In({
  camera: t,
  compact: a = !1,
  viewport: n,
  zoom: r
}) {
  return n.width <= 0 ? { endDay: Number.POSITIVE_INFINITY, startDay: Number.NEGATIVE_INFINITY } : na(
    aa({
      camera: t,
      compact: a,
      futureBufferDays: Dn,
      pastBufferDays: Dn,
      viewport: n,
      zoom: r
    })
  );
}
function Go(t, a) {
  return t.startDay === a.startDay && t.endDay === a.endDay;
}
function Kt(t, a, n) {
  return a >= n.startDay && t <= n.endDay;
}
function kn({
  camera: t,
  compact: a = !1,
  minimumDays: n,
  viewport: r,
  zoom: e
}) {
  const s = na(
    aa({
      camera: t,
      compact: a,
      futureBufferDays: po,
      pastBufferDays: ho,
      viewport: r,
      zoom: e
    })
  );
  return {
    endDay: Math.max(n, s.endDay),
    startDay: Math.min(0, s.startDay)
  };
}
function Be(t, a) {
  return (t - a) * _e;
}
function ra(t, a) {
  return Math.max(0, (a - t) * _e);
}
function Ba(t, a) {
  return t.latestRelease ? Math.max(0, Math.floor(a - t.latestRelease.endGlobalDay)) : 0;
}
function jo(t, a) {
  return a === 0 ? 100 : Math.max(0, Math.round((1 - t / a) * 100));
}
function qo(t) {
  return `${t} ${t === 1 ? "Day" : "Days"} since last update`;
}
function ka(t) {
  if (t <= 0)
    return "Same day";
  if (t < 31)
    return `${t} ${t === 1 ? "day" : "days"}`;
  const a = Math.floor(t / 365), n = t - a * 365, r = Math.floor(n / 30), e = n - r * 30, s = [];
  return a > 0 && s.push(`${a} ${a === 1 ? "year" : "years"}`), r > 0 && s.push(`${r} ${r === 1 ? "month" : "months"}`), e > 0 && a === 0 && s.push(`${e} ${e === 1 ? "day" : "days"}`), s.length > 0 ? s.join(", ") : `${t} days`;
}
function Zo(t, a) {
  if (a === null || a <= 0)
    return null;
  const n = t - a, r = Math.abs(n);
  return r <= 2 ? `On pace with this line's ${a}-day average` : `${r} ${r === 1 ? "day" : "days"} ${n > 0 ? "slower" : "faster"} than this line's ${a}-day average`;
}
function et(t, a = 1) {
  return Math.max(1, Math.round(t * a));
}
function Oa(t = !1, a = 1) {
  return et(t ? Zi : qi, a);
}
function Wa(t, a = !1, n = 1) {
  const r = Math.max(t, 1), e = et(a ? ji : Gi, n), s = et(Ki, n), c = Oa(a, n), d = r * c + Math.max(r - 1, 0) * s, f = Math.max(e, d + (r > 1 ? et(16, n) : 0));
  return {
    groupHeight: f,
    lineGap: s,
    lineHeight: c,
    topOffset: Math.max(0, (f - d) / 2)
  };
}
function Ha(t, a = !1, n = 1) {
  return Wa(t.productLines.length, a, n).groupHeight;
}
function Va(t, a, n = !1, r = 1) {
  const { lineGap: e, lineHeight: s, topOffset: c } = Wa(t, n, r);
  return c + a * (s + e) + s / 2;
}
function lt(t = !1, a = 1) {
  return {
    bottomPadding: et(t ? no : to, a),
    companyGap: et(t ? Ji : Qi, a),
    topPadding: et(t ? ao : eo, a)
  };
}
function ia(t, a = !1, n = 1) {
  const r = lt(a, n), e = t.reduce((c, d) => c + Ha(d, a, n), 0), s = Math.max(t.length - 1, 0) * r.companyGap;
  return Math.max(
    et(a ? 384 : 448, n),
    e + s + r.topPadding + r.bottomPadding + et(a ? 40 : 32, n)
  );
}
function _t(t, a = !1, n = 1, r = lt(a, n)) {
  let e = r.topPadding;
  return t.map((s, c) => {
    const d = Ha(s, a, n), f = {
      company: s,
      height: d,
      index: c,
      y: e
    };
    return e += d + r.companyGap, f;
  });
}
function oa({
  compact: t = !1,
  currentGlobalDay: a,
  maxDays: n,
  summaryCount: r,
  timelineStartDay: e = 0,
  timelineHeight: s,
  timelineWidth: c,
  viewport: d
}) {
  const f = Math.max(d.width, t ? 360 : 1024), u = Math.max(d.height, t ? 720 : 680), m = t ? xt : vt, g = t ? fr : mr, w = t ? co : oo, y = t ? so : ro, x = t ? lo : io, M = g + m + a * _e, L = Math.max(0, M - f * (t ? 0.78 : 0.72)), X = t ? Math.min(390, Math.max(292, f - 64)) : 720, te = t ? Math.min(360, Math.max(280, f - 56)) : 360, j = t ? Math.min(420, Math.max(290, f - 48)) : 520, oe = t ? Math.min(620, Math.max(320, f - 32)) : 1180, J = Math.max(y * 0.34, L + (t ? 20 : f * 0.24)), T = t ? 0 : 4, k = Math.max(
    0,
    Math.min(
      w - u * (t ? 0.28 : 0.24),
      T - (t ? 18 : 24)
    )
  ), Y = t ? J + X + 18 : Math.min(J + X + 28, L + f - te - 24), _ = T + 8, W = J, Z = w + s + (t ? 42 : 52), K = J, H = Z + (t ? 132 : 118), de = t ? f >= 640 ? 2 : 1 : 4, E = Math.max(1, Math.ceil(Math.max(r, 1) / de)) * (t ? 172 : 224), C = g + m + Math.max(n, 0) * _e, A = g + e * _e, R = Math.max(
    C + y,
    A + c + m + y,
    Y + te + y,
    K + oe + y,
    L + f + y
  ), v = Math.max(
    w + s + x,
    H + E + x,
    _ + (t ? 152 : 172) + x,
    k + u + x
  );
  return {
    contentCards: {
      intro: { height: t ? 176 : 202, width: X, x: J, y: T },
      latest: { height: t ? 96 : 74, width: j, x: W, y: Z },
      notes: { height: t ? 142 : 170, width: te, x: Y, y: _ },
      summaries: { width: oe, x: K, y: H }
    },
    initialCameraX: L,
    initialCameraY: k,
    railWidth: m,
    timelineX: g,
    timelineY: w,
    worldHeight: v,
    worldWidth: R
  };
}
function Ko(t) {
  return {
    x: t.initialCameraX,
    y: t.initialCameraY
  };
}
function ft(t, a = !1) {
  return {
    camera: Ko(t),
    zoom: a ? St : Rt
  };
}
function Nr(t) {
  return Number.isFinite(t) ? Math.max(1e-3, t) : 1;
}
function Ga(t, a) {
  return `translate3d(${-t.x * a}px, ${-t.y * a}px, 0) scale(${a})`;
}
const Qt = /* @__PURE__ */ new WeakMap(), Qo = 126, Dr = ["timeline-map-label", "timeline-map-screen-fixed", "timeline-gap-collapse"], Jo = "timeline-gap-tooltip", es = ".timeline-gap:hover .timeline-gap-tooltip, .timeline-gap:focus-within .timeline-gap-tooltip", Ln = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakMap();
function Cr(t) {
  let a = Ln.get(t);
  return a || (a = [...Dr, Jo].map(
    (n) => t.getElementsByClassName(n)
  ), Ln.set(t, a)), a;
}
function _n(t, a) {
  t.style.getPropertyValue("--map-zoom-frame") !== a && t.style.setProperty("--map-zoom-frame", a);
}
function ts(t, a) {
  const n = Cr(t);
  for (let r = 0; r < Dr.length; r += 1) {
    const e = n[r];
    for (let s = 0; s < e.length; s += 1)
      _n(e[s], a);
  }
  t.querySelectorAll(es).forEach((r) => _n(r, a));
}
function as(t) {
  for (const a of Cr(t))
    for (let n = 0; n < a.length; n += 1)
      a[n].style.removeProperty("--map-zoom-frame");
}
function Fa(t, a) {
  t.style.getPropertyValue("--map-zoom") !== a && t.style.setProperty("--map-zoom", a), as(t);
}
function Jt(t, a, n) {
  if (!t)
    return;
  t.style.transform = Ga(a, n);
  const r = String(Nr(n));
  sa.get(t) !== r && (Qt.has(t) ? ts(t, r) : Fa(t, r), sa.set(t, r)), t.style.willChange = "transform", t.setAttribute("data-camera-moving", "");
  const e = Qt.get(t);
  e !== void 0 && window.clearTimeout(e);
  const s = window.setTimeout(() => {
    t.style.willChange = "auto", t.removeAttribute("data-camera-moving"), Fa(t, r), Qt.delete(t);
  }, Qo);
  Qt.set(t, s);
}
function Ar(t, a) {
  mi(() => {
    const n = t.current;
    if (n && !sa.has(n)) {
      const r = String(Nr(a));
      Fa(n, r), sa.set(n, r);
    }
  }, [t]);
}
function Ve(t) {
  return {
    "--label-size": String(t)
  };
}
function La(t, a, n) {
  const r = t.maxX - t.minX, e = t.maxY - t.minY, s = Math.max(0, (a - r) / 2), c = Math.max(0, (n - e) / 2);
  return {
    maxX: t.maxX + s,
    maxY: t.maxY + c,
    minX: t.minX - s,
    minY: t.minY - c
  };
}
function ja(t, a) {
  for (const n of t)
    for (let r = 0; r < n.productLines.length; r += 1) {
      const s = n.productLines[r].releases.find((c) => c.articleSlug === a);
      if (s)
        return { company: n, productLineIndex: r, release: s };
    }
  return null;
}
const Rr = 6, ns = 2.75;
function rs(t, a, n, r) {
  const e = lt(n, r), s = _t(t, n, r, e), c = new Map(s.map((f) => [f.company.id, f])), d = [];
  return t.forEach((f) => {
    const u = c.get(f.id);
    u && f.productLines.forEach((m, g) => {
      m.releases.forEach((w) => {
        d.push({
          slug: w.articleSlug,
          x: a.timelineX + a.railWidth + w.globalDay * _e,
          y: a.timelineY + u.y + Va(f.productLines.length, g, n, r)
        });
      });
    });
  }), d;
}
function is(t, a, n, r, e, s, c, d) {
  if (e) {
    const u = ja(t, e);
    if (u) {
      const g = _t(
        t,
        n,
        r,
        lt(n, r)
      ).find((w) => w.company.id === u.company.id);
      if (g)
        return {
          x: a.timelineX + a.railWidth + u.release.globalDay * _e,
          y: a.timelineY + g.y + Va(u.company.productLines.length, u.productLineIndex, n, r)
        };
    }
  }
  const f = Math.max(c, 1e-3);
  return {
    x: s.x + d.width / (2 * f),
    y: s.y + d.height / (2 * f)
  };
}
function os(t, a, n, r) {
  const e = (r == null ? void 0 : r.minPrimaryDistance) ?? Rr;
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
    const y = w * ns + g, x = Math.hypot(u, m);
    (y < c || y === c && x < d) && (s = f, c = y, d = x);
  }), s;
}
function ss(t) {
  return t === "ArrowRight" ? "right" : t === "ArrowLeft" ? "left" : t === "ArrowDown" ? "down" : t === "ArrowUp" ? "up" : null;
}
function ls(t) {
  if (t.altKey || t.ctrlKey || t.metaKey)
    return !0;
  const a = t.target;
  return a instanceof Element ? a.closest('[aria-label="Timeline zoom controls"]') ? !0 : !!a.closest('input, textarea, select, [contenteditable="true"]') : !1;
}
function Pn({
  compact: t = !1,
  layout: a,
  productLineIndex: n,
  release: r,
  row: e,
  verticalScale: s = 1
}) {
  const c = Oa(t, s), d = a.timelineY + e.y + Va(e.company.productLines.length, n, t, s), f = a.timelineX + a.railWidth + r.globalDay * _e, u = a.timelineX + a.railWidth + r.endGlobalDay * _e, m = t ? 28 : 36;
  return {
    maxX: Math.max(f, u) + m,
    maxY: d + c / 2 + 12,
    minX: Math.min(f, u) - m,
    minY: d - c / 2 - 12
  };
}
function cs(t, a, n) {
  return n ? a ? { bottom: 40, left: 16, right: 16, top: 64 } : {
    bottom: 48,
    left: 100,
    right: Math.min(hr, Math.round(t.width * gr)),
    top: 72
  } : yo;
}
function ds(t, a) {
  const n = Math.min(
    hr,
    Math.round(t.width * gr)
  ), e = (t.width - n) * wo, s = Math.max(
    1,
    t.width - a.left - a.right - gt * 2
  );
  return { x: ie(
    (e - a.left - gt) / s,
    0.42,
    0.68
  ), y: vr.y };
}
function us({
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
    d.width - r.left - r.right - gt * 2
  ), u = Math.max(
    1,
    d.height - r.top - r.bottom - gt * 2
  ), m = Math.max(a.maxX - a.minX, 1), g = Math.max(a.maxY - a.minY, 1), w = Math.min(f / m, u / g) * pr * vo, y = Number(ie(w, c, Math.min(s, n)).toFixed(3)), x = (a.minX + a.maxX) / 2, M = (a.minY + a.maxY) / 2, L = r.left + gt + f * t.x, X = r.top + gt + u * t.y, te = Math.max(0, e.worldWidth - d.width / y), j = Math.max(0, e.worldHeight - d.height / y);
  return {
    camera: {
      x: ie(x - L / y, 0, te),
      y: ie(M - X / y, 0, j)
    },
    zoom: y
  };
}
function Sr(t, a, n, r, e = !1, s = 1) {
  if (t.kind === "bounds")
    return t.bounds;
  const c = lt(e, s), d = _t(a, e, s, c);
  if (t.kind === "slug") {
    const y = ja(a, t.slug);
    if (!y)
      return null;
    const x = d.find((L) => L.company.id === y.company.id);
    if (!x)
      return null;
    const M = Pn({
      compact: e,
      layout: n,
      productLineIndex: y.productLineIndex,
      release: y.release,
      row: x,
      verticalScale: s
    });
    return La(M, Ca, Aa);
  }
  if (t.kind === "slugs") {
    const y = t.slugs.map(
      (x) => Sr(
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
    const M = Pn({
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
    return La(M, Ca, Aa);
  }
  const f = n.timelineX + n.railWidth + t.globalDay * _e, u = t.endGlobalDay ?? t.globalDay, m = n.timelineX + n.railWidth + u * _e, g = n.timelineY + r * 0.44, w = e ? 100 : 120;
  return La(
    {
      maxX: Math.max(f, m) + 40,
      maxY: g + w / 2,
      minX: Math.min(f, m) - 40,
      minY: g - w / 2
    },
    Ca,
    Aa
  );
}
function ms(t, a, n, r) {
  const e = Math.max(a, 1e-3);
  return {
    worldX: t.x + n / e,
    worldY: t.y + r / e
  };
}
function pt(t, a, n, r, e) {
  const s = Math.max(e, 1e-3);
  return {
    x: t - n / s,
    y: a - r / s
  };
}
function Fn({
  anchorX: t,
  anchorY: a,
  camera: n,
  existingAnchor: r,
  zoom: e
}) {
  if (r && r.viewportX === t && r.viewportY === a)
    return r;
  const { worldX: s, worldY: c } = ms(n, e, t, a);
  return {
    viewportX: t,
    viewportY: a,
    worldX: s,
    worldY: c
  };
}
function ht(t, a, n) {
  return t + (a - t) * n;
}
function ie(t, a, n) {
  return Math.min(Math.max(t, a), n);
}
function fs(t) {
  const a = ie(t, 0, 1), n = 1 / (1 + Math.exp(bt / 2)), r = 1 / (1 + Math.exp(-bt / 2));
  return (1 / (1 + Math.exp(-bt * (a - 0.5))) - n) / (r - n);
}
function ps(t) {
  const a = ie(t, 0, 1), n = 1 / (1 + Math.exp(bt / 2)), r = 1 / (1 + Math.exp(-bt / 2)), e = n + a * (r - n);
  return ie(0.5 + Math.log(e / (1 - e)) / bt, 0, 1);
}
function $a(t, a, n) {
  if (n <= a)
    return a;
  const r = fs(t);
  return a + r * (n - a);
}
function Ir(t, a, n) {
  if (n <= a)
    return 0;
  const r = (ie(t, a, n) - a) / (n - a);
  return ps(r);
}
function It(t, a, n, r) {
  const e = Ir(t, n, r);
  return $a(e + a, n, r);
}
function $n(t, a, n) {
  if (t <= 0 || n <= 0)
    return 0.35;
  const r = Math.max(t - a, 120);
  return ie(r / n * pr, 0.08, 1);
}
function hs(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ o("path", { d: "M11 5v12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ o("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function gs(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ o("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ o("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function kt({ classId: t, className: a }) {
  const n = a ?? "h-4 w-4";
  return t === "frontier-llms" ? /* @__PURE__ */ o(Ti, { className: n, strokeWidth: 1.8 }) : t === "open-source-llms" ? /* @__PURE__ */ o(Mi, { className: n, strokeWidth: 1.8 }) : t === "image-generation" ? /* @__PURE__ */ o(Ei, { className: n, strokeWidth: 1.8 }) : t === "video-generation" ? /* @__PURE__ */ o(nr, { className: n, strokeWidth: 1.8 }) : t === "audio-generation" ? /* @__PURE__ */ o(Ni, { className: n, strokeWidth: 1.8 }) : t === "3d-generation" ? /* @__PURE__ */ o(Di, { className: n, strokeWidth: 1.8 }) : t === "world-models" ? /* @__PURE__ */ o(st, { className: n, strokeWidth: 1.8 }) : t === "coding-harnesses" ? /* @__PURE__ */ o(Ci, { className: n, strokeWidth: 1.8 }) : t === "events" ? /* @__PURE__ */ o(ca, { className: n, strokeWidth: 1.8 }) : t === "robotics" ? /* @__PURE__ */ o(Ai, { className: n, strokeWidth: 1.8 }) : t === "vehicle-autonomy" ? /* @__PURE__ */ o(Ri, { className: n, strokeWidth: 1.8 }) : /* @__PURE__ */ o(st, { className: n, strokeWidth: 1.8 });
}
function vs({
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
  onToggle: te,
  significanceDisplayLimit: j,
  totalMatchedCompanyCount: oe,
  variant: J = "panel",
  visibleCompanyCount: T
}) {
  var ge;
  const k = c.domainIds.length + c.attributeIds.length + c.companyIds.length + (c.contentType === "all" ? 0 : 1), Y = J === "rail", _ = Y && !d, W = tt(), Z = `${Y ? d ? "w-[var(--category-expanded-width,286px)]" : "w-[74px]" : "w-full"} timeline-fluid-obstacle overflow-hidden rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${_ ? "cursor-pointer hover:bg-[var(--surface-strong)]" : ""} ${n}`, K = ({
    buttonKey: E,
    description: C,
    icon: A,
    isSelected: R,
    meta: v,
    onClick: N,
    title: S
  }) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      title: S,
      disabled: !d,
      onClick: N,
      className: `flex h-11 w-full items-center gap-2 rounded-[0.85rem] border px-2.5 text-left transition duration-300 active:scale-[0.99] ${R ? "border-[var(--edge-strong)] bg-[var(--surface-strong)]" : "border-[var(--edge)] bg-transparent hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
      children: [
        A ?? /* @__PURE__ */ o(yi, { className: "h-4 w-4 shrink-0 text-[var(--ink)]", strokeWidth: 1.8 }),
        /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ o("span", { className: "block truncate text-xs font-semibold tracking-tight text-[var(--ink)]", children: C }),
          /* @__PURE__ */ o("span", { className: "mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--muted)]", children: v })
        ] }),
        /* @__PURE__ */ o(
          "span",
          {
            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${R ? "border-[var(--edge-strong)] bg-[var(--ink)] text-[var(--page-bg)]" : "border-[var(--edge)] text-transparent"}`,
            children: /* @__PURE__ */ o(wi, { className: "h-3 w-3", strokeWidth: 2 })
          }
        )
      ]
    },
    E
  ), H = he().sortOptions, de = ((ge = H.find((E) => E.id === r)) == null ? void 0 : ge.label) ?? "Significance", q = r === "significance" ? "score" : de;
  return /* @__PURE__ */ h("aside", { className: Z, onClick: _ ? te : void 0, children: [
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-expanded": d,
        "aria-label": "Timeline filter and sort controls",
        onClick: (E) => {
          E.stopPropagation(), te();
        },
        className: `flex w-full items-center gap-3 text-left transition duration-300 hover:bg-[var(--surface-strong)] active:scale-[0.99] ${d ? "justify-between border-b border-[var(--edge)] px-3 py-3" : "justify-center px-0 py-4"}`,
        children: [
          /* @__PURE__ */ o("span", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink)] shadow-[var(--soft-shadow)]", children: /* @__PURE__ */ o(vi, { className: "h-4 w-4", strokeWidth: 1.8 }) }),
          d ? /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ o("span", { className: "block text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]", children: W.filterPanelLabel }),
            /* @__PURE__ */ o("span", { className: "mt-1 block truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.label }),
            /* @__PURE__ */ h("span", { className: "mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
              T,
              "/",
              oe,
              " rows · sort ",
              q
            ] })
          ] }) : /* @__PURE__ */ o("span", { className: "sr-only", children: a.label }),
          /* @__PURE__ */ o(
            xi,
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
          ye.div,
          {
            initial: !1,
            animate: { y: d ? 0 : -10 },
            transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
            className: "max-h-[min(620px,calc(100dvh-18rem))] overflow-y-auto px-3 py-3",
            children: /* @__PURE__ */ h("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start", children: [
              /* @__PURE__ */ h("div", { className: "space-y-3", children: [
                sr().map((E) => /* @__PURE__ */ h("div", { children: [
                  /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: E.label }),
                  /* @__PURE__ */ o("div", { className: "space-y-1.5", children: E.domainIds.map((C) => {
                    const A = ta(C);
                    if (!A)
                      return null;
                    const R = s[C] ?? { providerCount: 0, releaseCount: 0 };
                    return K({
                      buttonKey: A.id,
                      description: A.label,
                      icon: /* @__PURE__ */ o(kt, { classId: A.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                      isSelected: c.domainIds.includes(C),
                      meta: `${R.providerCount}c / ${R.releaseCount}r`,
                      onClick: () => x(C),
                      title: A.description
                    });
                  }) })
                ] }, E.label)),
                /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
                  /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: W.contentTypeHeading }),
                  /* @__PURE__ */ o("div", { className: "grid grid-cols-3 gap-1.5", children: da().map((E) => {
                    const C = c.contentType === E.id, A = E.id === "events" ? ca : E.id === "releases" ? tr : st;
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => y(E.id),
                        title: E.description,
                        className: `inline-flex h-9 items-center justify-center gap-1.5 rounded-[0.85rem] border px-2 text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${C ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ o(A, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                          E.label
                        ]
                      },
                      E.id
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
                      title: W.selectAllTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(st, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
                        W.selectAllLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: u,
                      title: W.clearFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(ar, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        W.clearFiltersLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: M,
                      title: W.resetFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(la, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        W.resetFiltersLabel
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3 md:border-l md:border-t-0 md:py-1 md:pl-3", children: [
                /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: "Attributes" }),
                /* @__PURE__ */ o("div", { className: "space-y-1.5", children: rt().map((E) => {
                  const C = ta(E);
                  if (!C)
                    return null;
                  const A = t[E] ?? { providerCount: 0, releaseCount: 0 };
                  return K({
                    buttonKey: E,
                    description: C.label,
                    icon: /* @__PURE__ */ o(kt, { classId: C.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                    isSelected: c.attributeIds.includes(E),
                    meta: `${A.providerCount}c / ${A.releaseCount}r`,
                    onClick: () => f(E),
                    title: C.description
                  });
                }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: W.companyFiltersHeading }),
                /* @__PURE__ */ o("div", { className: "max-h-44 space-y-1.5 overflow-y-auto pr-1", children: e.length > 0 ? /* @__PURE__ */ h(wt, { children: [
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: m,
                      title: W.allRelevantLabel,
                      className: `flex h-8 w-full items-center justify-between rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${c.companyIds.length === 0 ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        W.allRelevantLabel,
                        /* @__PURE__ */ h("span", { className: "font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                          e.length,
                          "c"
                        ] })
                      ]
                    }
                  ),
                  e.map((E) => {
                    const C = c.companyIds.includes(E.id);
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => g(E.id),
                        title: `Filter to ${E.name}`,
                        className: `flex h-8 w-full items-center justify-between gap-2 rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${C ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ o("span", { className: "min-w-0 truncate", children: E.name }),
                          /* @__PURE__ */ h("span", { className: "shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                            E.releaseCount,
                            "r"
                          ] })
                        ]
                      },
                      E.id
                    );
                  })
                ] }) : /* @__PURE__ */ o("div", { className: "rounded-[0.75rem] border border-[var(--edge)] px-2 py-2 text-[11px] leading-4 text-[var(--muted)]", children: W.companyFilterEmpty }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: W.sortHeading }),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5", children: H.map((E) => {
                  const C = r === E.id;
                  return /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => w(E.id),
                      className: `flex h-9 w-full items-center justify-between rounded-[0.85rem] border px-2.5 text-left text-xs font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${C ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        E.label,
                        /* @__PURE__ */ o(
                          "span",
                          {
                            className: `h-2.5 w-2.5 rounded-full border ${C ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--edge)] bg-transparent"}`
                          }
                        )
                      ]
                    },
                    E.id
                  );
                }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: W.displayedRowsHeading }),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-4 gap-1.5 md:grid-cols-2", children: lr().map((E) => {
                  const C = j === E, A = E === "all" ? "All" : String(E);
                  return /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => X(E),
                      className: `h-8 rounded-[0.85rem] border px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition duration-300 active:scale-[0.99] ${C ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: A
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
    /* @__PURE__ */ o(Ge, { initial: !1, children: !d && Y ? /* @__PURE__ */ h(
      ye.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        className: "flex flex-col items-center gap-3 px-2 pb-5",
        children: [
          /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]", style: { writingMode: "vertical-rl" }, children: W.filterPanelLabel }),
          /* @__PURE__ */ o("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] font-mono text-[10px] text-[var(--ink-soft)]", children: k })
        ]
      },
      "filter-rail"
    ) : null })
  ] });
}
function Un(t) {
  return /* @__PURE__ */ o(vs, { ...t });
}
function yt({
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
function kr({
  className: t = "",
  compact: a = !1,
  maxZoom: n,
  minZoom: r,
  onSliderActiveChange: e,
  onZoomChange: s,
  zoom: c
}) {
  const d = ne(null), f = ne(null), u = ne(null), m = ne(null), g = ne(null), [w, y] = Me(!1), [x, M] = Me(!1), [L, X] = Me(!1), te = Ir(c, r, n), j = 8 + (1 - te) * 84, oe = a ? "h-3.5 w-3.5" : "h-4 w-4", J = w || x || L, T = J ? a ? "h-10 min-w-10 px-2 text-[9px]" : "h-11 min-w-11 px-2.5 text-[10px]" : a ? "h-4 min-w-4 px-0 text-[0px]" : "h-5 min-w-5 px-0 text-[0px]", k = a ? "group-hover/zoomrail:h-10 group-hover/zoomrail:min-w-10 group-hover/zoomrail:px-2 group-hover/zoomrail:text-[9px] group-focus-within/zoomrail:h-10 group-focus-within/zoomrail:min-w-10 group-focus-within/zoomrail:px-2 group-focus-within/zoomrail:text-[9px]" : "group-hover/zoomrail:h-11 group-hover/zoomrail:min-w-11 group-hover/zoomrail:px-2.5 group-hover/zoomrail:text-[10px] group-focus-within/zoomrail:h-11 group-focus-within/zoomrail:min-w-11 group-focus-within/zoomrail:px-2.5 group-focus-within/zoomrail:text-[10px]", Y = w ? "text-[var(--ink)] opacity-100" : "opacity-45", _ = (v, N = !1) => {
    const S = () => {
      y(v), e == null || e(v);
    };
    if (N) {
      Qn(S);
      return;
    }
    S();
  }, W = (v) => {
    const N = Number(v.currentTarget.value);
    s(() => $a(N, r, n));
  };
  Re(() => () => {
    var v;
    g.current !== null && window.cancelAnimationFrame(g.current), m.current = null, (v = u.current) == null || v.call(u), e == null || e(!1);
  }, [e]);
  const Z = (v) => {
    var U;
    const N = (U = d.current) == null ? void 0 : U.getBoundingClientRect();
    if (!N || N.height <= 0)
      return;
    const S = ie(1 - (v - N.top) / N.height, 0, 1);
    s(() => $a(S, r, n));
  }, K = () => {
    g.current !== null && (window.cancelAnimationFrame(g.current), g.current = null);
    const v = m.current;
    m.current = null, v !== null && Z(v);
  }, H = (v) => {
    m.current = v, g.current === null && (g.current = window.requestAnimationFrame(() => {
      g.current = null;
      const N = m.current;
      m.current = null, N !== null && Z(N);
    }));
  }, de = (v) => {
    !v.isPrimary || v.button !== 0 || (f.current = v.pointerId, v.currentTarget.setPointerCapture(v.pointerId), _(!0, !0), Z(v.clientY));
  }, q = (v) => {
    f.current === v.pointerId && (H(v.clientY), v.preventDefault());
  }, ge = (v) => {
    f.current === v.pointerId && (K(), v.currentTarget.hasPointerCapture(v.pointerId) && v.currentTarget.releasePointerCapture(v.pointerId), f.current = null, _(!1));
  }, E = () => {
    var v;
    K(), (v = u.current) == null || v.call(u), u.current = null, _(!1);
  }, C = (v) => {
    var U;
    if (v.button !== 0 || f.current !== null)
      return;
    (U = u.current) == null || U.call(u), _(!0, !0), Z(v.clientY);
    const N = (re) => {
      H(re.clientY), re.preventDefault();
    }, S = () => E();
    window.addEventListener("mousemove", N), window.addEventListener("mouseup", S, { once: !0 }), u.current = () => {
      window.removeEventListener("mousemove", N), window.removeEventListener("mouseup", S);
    };
  }, A = (v) => {
    const N = v.shiftKey ? Da : mo;
    if (v.key === "ArrowUp" || v.key === "ArrowRight") {
      s((S) => It(S, N, r, n)), v.preventDefault();
      return;
    }
    if (v.key === "ArrowDown" || v.key === "ArrowLeft") {
      s((S) => It(S, -N, r, n)), v.preventDefault();
      return;
    }
    if (v.key === "PageUp") {
      s((S) => It(S, Da, r, n)), v.preventDefault();
      return;
    }
    if (v.key === "PageDown") {
      s((S) => It(S, -Da, r, n)), v.preventDefault();
      return;
    }
    if (v.key === "Home") {
      s(() => r), v.preventDefault();
      return;
    }
    v.key === "End" && (s(() => n), v.preventDefault());
  }, R = (v) => {
    v.currentTarget.contains(v.relatedTarget) || M(!1);
  };
  return /* @__PURE__ */ h(
    "div",
    {
      "aria-label": "Timeline zoom controls",
      "data-timeline-presentation-hide": !0,
      role: "group",
      className: `absolute z-40 flex ${a ? "min-h-[17rem] w-12 py-3" : "min-h-[22rem] w-14 py-4"} group/zoomrail select-none flex-col items-center justify-center gap-3 px-2 text-[var(--ink-soft)] transition-[opacity,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] hover:opacity-100 focus-within:text-[var(--ink)] focus-within:opacity-100 ${Y} ${t}`,
      onBlur: R,
      onFocus: () => M(!0),
      onMouseEnter: () => X(!0),
      onMouseLeave: () => X(!1),
      onPointerEnter: () => X(!0),
      onPointerLeave: () => X(!1),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ o(hs, { className: oe })
          }
        ),
        /* @__PURE__ */ h(
          "label",
          {
            ref: d,
            className: `relative z-10 ${a ? "h-[12.5rem] w-8" : "h-[16rem] w-9"} cursor-ns-resize touch-none rounded-full focus-within:ring-2 focus-within:ring-[rgba(237,242,250,0.3)]`,
            onMouseDown: C,
            onPointerCancel: ge,
            onPointerDown: de,
            onPointerMove: q,
            onPointerUp: ge,
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
                  className: `pointer-events-none absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-center ${w ? "transition-none" : "transition-[clip-path] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: {
                    backgroundImage: "radial-gradient(circle, rgba(237,242,250,0.92) 1.5px, transparent 1.7px)",
                    backgroundSize: "12px 12px",
                    clipPath: `inset(${(1 - te) * 100}% 0 0 0)`
                  }
                }
              ),
              /* @__PURE__ */ o(
                "span",
                {
                  className: `absolute left-1/2 grid ${T} ${k} -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(237,242,250,0.48)] bg-[rgba(237,242,250,0.95)] font-mono font-semibold text-[#0b0e14] shadow-[0_16px_32px_-22px_rgba(0,0,0,0.78)] ${w ? "scale-[1.04] transition-none" : "transition-[top,width,height,min-width,padding,transform,box-shadow,font-size] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: { top: `${j}%` },
                  children: /* @__PURE__ */ h("span", { className: `transition-opacity duration-200 group-hover/zoomrail:opacity-100 group-focus-within/zoomrail:opacity-100 ${J ? "opacity-100" : "opacity-0"}`, children: [
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
                  value: te,
                  onBlur: () => _(!1),
                  onChange: W,
                  onKeyDown: A,
                  onPointerCancel: () => _(!1),
                  onPointerDown: () => _(!0, !0),
                  onPointerUp: () => _(!1),
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
            children: /* @__PURE__ */ o(gs, { className: oe })
          }
        )
      ]
    }
  );
}
function Lr({
  className: t = "",
  company: a
}) {
  return /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 items-center justify-center text-[var(--ink)] ${t}`, children: /* @__PURE__ */ o(kt, { classId: Yo(a), className: "h-[1rem] w-[1rem]" }) });
}
function xs({
  compact: t = !1,
  company: a
}) {
  const n = a.logoMark, r = n ? he().logoAssetPaths[n] : void 0, e = r && xr(n), s = e ? t ? "h-7 w-12 rounded-[0.72rem]" : "h-8 w-14 rounded-[0.82rem]" : t ? "h-7 w-7 rounded-[0.72rem]" : "h-8 w-8 rounded-[0.82rem]", c = e ? t ? "relative h-[11px] w-9 object-contain" : "relative h-3 w-11 object-contain" : t ? "relative h-[18px] w-[18px] object-contain" : "relative h-5 w-5 object-contain", d = t ? "text-[10px]" : "text-xs";
  return /* @__PURE__ */ o(
    "span",
    {
      "aria-label": `${a.name} logo`,
      className: `${s} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${r ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: `${a.name} logo`,
      children: r ? /* @__PURE__ */ o("img", { "aria-hidden": "true", alt: "", className: c, src: Xa(r) }) : n ? /* @__PURE__ */ h(wt, { children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${He(a.accent, 0.35)}, transparent 48%)`
            }
          }
        ),
        _r(n, a.accent, d)
      ] }) : /* @__PURE__ */ o(Lr, { className: t ? "h-4 w-4" : "h-5 w-5", company: a })
    }
  );
}
function _r(t, a, n) {
  const r = `relative font-semibold tracking-tight ${n}`;
  return t === "calendar" ? /* @__PURE__ */ o(ca, { className: "relative h-7 w-7 text-[var(--ink)]", strokeWidth: 1.8 }) : t === "gpt" || t === "openai" ? /* @__PURE__ */ o("span", { className: r, children: "AI" }) : t === "claude" || t === "anthropic" ? /* @__PURE__ */ o("span", { className: r, children: "C" }) : t === "cursor" ? /* @__PURE__ */ o("span", { className: r, children: "C" }) : t === "gemini" || t === "google" ? /* @__PURE__ */ o("span", { className: r, children: "G" }) : t === "deepseek" ? /* @__PURE__ */ o("span", { className: r, children: "D" }) : t === "sora" ? /* @__PURE__ */ o(nr, { className: "relative h-4 w-4", strokeWidth: 1.8 }) : t === "figure" ? /* @__PURE__ */ o("span", { className: r, children: "F" }) : t === "tesla" ? /* @__PURE__ */ o("span", { className: r, children: "T" }) : t === "xai" ? /* @__PURE__ */ o("span", { className: r, children: "x" }) : /* @__PURE__ */ o("span", { className: r, style: { color: a }, children: "AI" });
}
function bs(t) {
  return t === "square" ? "rounded-[5px]" : t === "diamond" ? "rotate-45 rounded-[4px]" : "rounded-full";
}
function Xn(t) {
  return t.classId !== "events";
}
function ys(t, a) {
  const n = t[a];
  if (!n || !Xn(n))
    return null;
  const r = t.findIndex(Xn);
  if (r < 0 || r === a)
    return null;
  const e = t[r];
  return e ? {
    productLine: e,
    productLineIndex: r
  } : null;
}
function ws({
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
function Ts({
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
  const w = Oa(a, g), y = d.classId === "coding-harnesses", x = Ro(n.accent, Vi, 0.34), M = bs(d.markerShape), L = a ? "h-3.5 w-3.5" : "h-4 w-4", X = a ? "absolute left-3 top-0 origin-bottom-left -translate-y-1 -rotate-[22deg]" : "absolute left-4 top-0 origin-bottom-left -translate-y-2 -rotate-[28deg] transition duration-300 group-hover:-translate-y-3", te = a ? "timeline-map-screen-label whitespace-nowrap rounded-[0.7rem] border px-1.5 py-0.5 font-bold tracking-[0.01em] shadow-[var(--soft-shadow)] backdrop-blur-sm" : "timeline-map-screen-label whitespace-nowrap rounded-[0.8rem] border bg-[var(--surface-strong)] px-2 py-1 font-bold tracking-[0.015em] shadow-[var(--soft-shadow)] group-hover:bg-[var(--surface)]", j = a ? 10 : 12, oe = ys(n.productLines, f), J = oe ? ws({
    primaryLine: oe.productLine,
    productLine: d,
    timelineStartDay: m
  }) ?? 0 : 0;
  return /* @__PURE__ */ h(
    ye.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: ur },
      transition: {
        opacity: Ue
      },
      className: "relative z-10 shrink-0 hover:z-40 focus-within:z-40",
      style: { height: `${w}px` },
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "absolute right-0 top-1/2 h-px -translate-y-1/2 bg-[var(--track-line)]",
            style: { left: `${J}px` }
          }
        ),
        /* @__PURE__ */ o("div", { className: "pointer-events-none absolute left-2 top-1/2 z-10 -translate-y-1/2", children: /* @__PURE__ */ h(
          "span",
          {
            className: "timeline-map-label inline-flex items-center gap-1.5 rounded-full border bg-[rgba(10,13,19,0.88)] px-2 py-1 font-mono uppercase tracking-[0.13em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)] backdrop-blur-sm",
            style: {
              borderColor: He(n.accent, 0.28),
              ...Ve(a ? 8 : 9)
            },
            children: [
              /* @__PURE__ */ o(kt, { classId: d.classId, className: a ? "h-3 w-3" : "h-3.5 w-3.5" }),
              d.shortLabel
            ]
          }
        ) }),
        /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: d.releases.map((T, k) => {
          var ue, Q;
          const Y = d.releases[k - 1], _ = t === T.articleSlug, W = _ || Kt(T.globalDay, T.endGlobalDay, u), Z = !!Y && Kt((Y == null ? void 0 : Y.globalDay) ?? T.globalDay, T.globalDay, u), K = T.endGlobalDay > T.globalDay && Kt(T.globalDay, T.endGlobalDay, u);
          if (!W && !Z && !K)
            return null;
          const H = Be(T.globalDay, m), de = Y ? Be(Y.globalDay, m) : H, q = Y ? Math.max(0, H - de) : 0, ge = Y ? Zo(T.gap, d.averageGap) : null, E = ra(T.globalDay, T.endGlobalDay), C = ((ue = d.latestRelease) == null ? void 0 : ue.name) === T.name && ((Q = d.latestRelease) == null ? void 0 : Q.date) === T.date, A = C ? Ia(n.accent, 255, 0.12) : Ia(n.accent, 255, 0.24), R = He(n.accent, C ? 0.52 : 0.34), v = T.tags.includes("landmark-release"), N = C ? He(n.accent, 0.12) : v ? He(n.accent, 0.08) : void 0, U = T.eventKind === "event" ? "Open event" : "Open release", re = _ ? `0 0 0 ${a ? 3 : 4}px rgba(237, 242, 250, 0.92), 0 0 0 ${a ? 7 : 8}px color-mix(in srgb, ${n.accent} 48%, transparent)` : v ? `0 0 0 ${a ? 5 : 6}px color-mix(in srgb, ${n.accent} 24%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 50%, transparent), 0 0 42px color-mix(in srgb, ${n.accent} 28%, transparent)` : C ? `0 0 0 ${a ? 4 : 5}px color-mix(in srgb, ${n.accent} 20%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 40%, transparent)` : `0 0 0 4px color-mix(in srgb, ${n.accent} 11%, transparent)`, ae = _ ? "saturate(1.45) brightness(1.14)" : v ? "saturate(1.38) brightness(1.1)" : C ? "saturate(1.35) brightness(1.08)" : void 0;
          return /* @__PURE__ */ h(
            ye.div,
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
                Y && Z ? /* @__PURE__ */ h(wt, { children: [
                  /* @__PURE__ */ o(
                    ye.div,
                    {
                      initial: { opacity: 0, scaleX: 0 },
                      animate: { opacity: y ? 0.72 : 0.58, scaleX: 1 },
                      transition: Ue,
                      className: `pointer-events-none absolute top-1/2 -translate-y-1/2 origin-left ${y ? "h-px" : "h-[2px]"}`,
                      style: {
                        backgroundColor: y ? x : n.accent,
                        left: `${de}px`,
                        width: `${q}px`
                      }
                    }
                  ),
                  /* @__PURE__ */ o(
                    "div",
                    {
                      className: "timeline-gap absolute top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50",
                      style: {
                        left: `${de + q / 2}px`,
                        "--gap-world-width": q
                      },
                      children: /* @__PURE__ */ h(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Gap of ${ka(T.gap)} between ${Y.name} and ${T.name}`,
                          onPointerDown: (V) => V.stopPropagation(),
                          onClick: (V) => V.stopPropagation(),
                          className: "group/gap relative flex h-6 cursor-default items-center justify-center outline-none",
                          children: [
                            /* @__PURE__ */ h(
                              "span",
                              {
                                className: "timeline-gap-collapse timeline-gap-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2 py-1 font-mono uppercase tracking-[0.1em] text-[var(--ink)] shadow-[var(--soft-shadow)] group-focus-visible/gap:border-[var(--edge-strong)]",
                                style: Ve(a ? 9 : 10),
                                children: [
                                  T.gap,
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
                                    T.name
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: [
                                    ka(T.gap),
                                    " gap"
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                    Y.dateLabel,
                                    " – ",
                                    T.dateLabel
                                  ] }),
                                  ge ? /* @__PURE__ */ o("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: ge }) : null
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ] }) : null,
                K ? /* @__PURE__ */ o(
                  ye.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: C ? 0.72 : 0.54, scaleX: 1 },
                    transition: Ue,
                    className: `absolute top-1/2 z-10 origin-left -translate-y-1/2 rounded-full ${a ? "h-[7px]" : "h-2"}`,
                    style: {
                      backgroundColor: n.accent,
                      boxShadow: `0 0 18px color-mix(in srgb, ${n.accent} 34%, transparent)`,
                      left: `${H}px`,
                      minWidth: a ? "8px" : "10px",
                      width: `${E}px`
                    }
                  }
                ) : null,
                W ? /* @__PURE__ */ o(
                  ye.div,
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
                    style: { left: `${H}px` },
                    children: /* @__PURE__ */ o("div", { className: "overflow-visible", children: /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        "data-timeline-company-id": n.id,
                        "data-timeline-pin": !0,
                        "data-timeline-product-line-id": d.id,
                        "data-timeline-slug": T.articleSlug,
                        "aria-current": _ ? "page" : void 0,
                        "aria-label": `${U} for ${T.name}, ${T.dateRangeLabel}`,
                        onClick: (V) => {
                          V.stopPropagation(), c(T.articleSlug);
                        },
                        onPointerDown: (V) => V.stopPropagation(),
                        className: `group relative block size-0 overflow-visible cursor-pointer text-left outline-none ${_ ? "timeline-pin--selected" : ""}`,
                        children: [
                          /* @__PURE__ */ h("div", { className: "timeline-pin-marker-stack relative z-0 size-0 shrink-0", children: [
                            v ? /* @__PURE__ */ o(
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
                                className: `${L} timeline-pin-marker absolute left-0 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 border-[3px] border-[var(--surface-strong)] transition duration-300 ${M} ${_ ? "timeline-pin-marker--selected scale-[1.18]" : "group-hover:scale-[1.22] group-focus-visible:scale-[1.22]"}`,
                                style: {
                                  backgroundColor: n.accent,
                                  boxShadow: re,
                                  filter: ae
                                }
                              }
                            )
                          ] }),
                          /* @__PURE__ */ o("div", { className: `${X} z-[2]`, children: /* @__PURE__ */ o(
                            "div",
                            {
                              className: `${te} ${// The fluid behind the timeline redraws every frame, so each
                              // backdrop blur is re-rendered every frame too. Desktop labels
                              // sit on the ~opaque surface unless they carry an accent tint,
                              // so only blur where the backdrop actually shows through.
                              a || N && !_ ? "backdrop-blur-sm" : ""} ${_ ? "timeline-pin-label--selected" : ""}`,
                              style: {
                                backgroundColor: _ ? "var(--surface-strong)" : N,
                                borderColor: _ ? He(n.accent, 0.88) : R,
                                borderWidth: _ ? 2 : void 0,
                                color: _ ? Ia(n.accent, 255, 0.06) : A,
                                boxShadow: _ ? `0 0 0 1px color-mix(in srgb, ${n.accent} 55%, transparent)` : void 0,
                                textShadow: _ ? "0 1px 14px rgba(0, 0, 0, 0.62)" : C ? "0 1px 12px rgba(0, 0, 0, 0.5)" : "0 1px 10px rgba(0, 0, 0, 0.38)",
                                filter: _ ? "saturate(1.28)" : C ? "saturate(1.18)" : void 0,
                                ...Ve(j)
                              },
                              children: T.name
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
                                /* @__PURE__ */ o("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: T.name }),
                                /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                  T.eventTypeLabel,
                                  " · ",
                                  T.dateRangeLabel
                                ] }),
                                Y ? /* @__PURE__ */ h("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: [
                                  ka(T.gap),
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
            T.articleSlug
          );
        }) }),
        d.latestRelease && e > d.latestRelease.endGlobalDay && Kt(d.latestRelease.endGlobalDay, e, u) ? /* @__PURE__ */ h(wt, { children: [
          /* @__PURE__ */ o(
            ye.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: y ? 0.48 : 0.42, scaleX: 1 },
              transition: Ue,
              className: `absolute top-1/2 origin-left -translate-y-1/2 ${y ? "h-px" : "quiet-extension-flow h-[2px]"}`,
              style: {
                backgroundColor: y ? x : void 0,
                left: `${Be(d.latestRelease.endGlobalDay, m)}px`,
                "--quiet-flow-duration": `${a ? 5.4 : 6.4}s`,
                "--quiet-line-color": n.accent,
                width: `${ra(d.latestRelease.endGlobalDay, e)}px`
              }
            }
          ),
          /* @__PURE__ */ o(
            "div",
            {
              className: "absolute top-1/2 z-0 -translate-y-1/2 pl-3",
              style: { left: `${Be(e, m)}px` },
              children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ h(
                "div",
                {
                  className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1 font-mono uppercase tracking-[0.14em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                  style: Ve(a ? 9 : 10),
                  children: [
                    "+",
                    Ba(d, e),
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
const Ms = Lt.memo(Ts);
function Es({
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
  const { lineGap: w } = Wa(n.productLines.length, a, g), y = () => d == null ? void 0 : d(n.id), x = () => c == null ? void 0 : c();
  return /* @__PURE__ */ o(
    ye.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: ur },
      transition: {
        opacity: Ue
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
      style: { height: `${Ha(n, a, g)}px`, gap: `${w}px` },
      children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: n.productLines.map((M, L) => /* @__PURE__ */ o(
        Ms,
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
function Yn(t, a) {
  return a ? t.productLines.some(
    (n) => n.releases.some((r) => r.articleSlug === a)
  ) : !1;
}
const Pr = Lt.memo(
  Es,
  (t, a) => {
    const n = Yn(t.company, t.activeArticleSlug), r = Yn(a.company, a.activeArticleSlug);
    return t.compact === a.compact && t.company === a.company && t.companyIndex === a.companyIndex && t.currentGlobalDay === a.currentGlobalDay && t.maxDays === a.maxDays && t.timelineStartDay === a.timelineStartDay && t.verticalScale === a.verticalScale && Go(t.renderWindow, a.renderWindow) && n === r && (!n || t.activeArticleSlug === a.activeArticleSlug);
  }
);
function Ns({
  compact: t = !1,
  company: a,
  currentGlobalDay: n,
  index: r,
  maxSummaryQuietDays: e
}) {
  var u, m;
  const s = tt(), c = Ba(a, n), d = jo(c, e), f = a.productLines.length > 1;
  return /* @__PURE__ */ h(
    ye.div,
    {
      layout: !0,
      initial: { opacity: 0, y: t ? 12 : 14 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: t ? 12 : 14 },
      transition: {
        layout: Hi,
        opacity: Ue,
        y: Ue
      },
      className: "rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] p-4",
      children: [
        /* @__PURE__ */ h("div", { className: "min-w-0", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ o(Lr, { className: "h-7 w-7", company: a }),
            /* @__PURE__ */ h("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ o("p", { className: "truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.name }),
              /* @__PURE__ */ h("p", { className: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: [
                s.significanceLabel,
                " ",
                a.significanceScore
              ] })
            ] })
          ] }),
          f ? /* @__PURE__ */ o("div", { className: "mt-3 space-y-2", children: a.productLines.map((g) => {
            var w;
            return /* @__PURE__ */ h("div", { className: "min-w-0 rounded-[0.85rem] border border-[var(--edge)] bg-[rgba(255,255,255,0.02)] px-3 py-2", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center gap-2 text-xs font-semibold tracking-tight text-[var(--ink)]", children: [
                  /* @__PURE__ */ o(kt, { classId: g.classId, className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ o("span", { className: "truncate", children: g.shortLabel })
                ] }),
                /* @__PURE__ */ o("span", { className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]", children: g.significanceScore })
              ] }),
              /* @__PURE__ */ o("p", { className: "mt-1 truncate text-sm text-[var(--ink-soft)]", children: ((w = g.latestRelease) == null ? void 0 : w.name) ?? "No releases" })
            ] }, `${a.id}-${g.id}-summary-line`);
          }) }) : /* @__PURE__ */ h(wt, { children: [
            /* @__PURE__ */ o("p", { className: "mt-3 text-base font-semibold tracking-tight text-[var(--ink)]", children: qo(c) }),
            /* @__PURE__ */ h("div", { className: "mt-2 min-w-0", children: [
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
const Fr = Lt.memo(Ns);
function Ds(t) {
  const a = t.companyLogoMark === "openai" ? "gpt" : t.companyLogoMark === "google" ? "gemini" : t.companyLogoMark === "anthropic" ? "claude" : t.companyLogoMark;
  return {
    modelLabel: t.name,
    modelMark: a
  };
}
function zn({
  accent: t,
  label: a,
  mark: n,
  size: r
}) {
  const e = r === "large", s = he().logoAssetPaths[n], c = s && xr(n), d = c ? e ? "h-16 w-28 rounded-[1.25rem]" : "h-11 w-20 rounded-[0.95rem]" : e ? "h-16 w-16 rounded-[1.25rem]" : "h-11 w-11 rounded-[0.95rem]", f = c ? e ? "relative h-5 w-20 object-contain" : "relative h-3 w-14 object-contain" : e ? "relative h-10 w-10 object-contain" : "relative h-7 w-7 object-contain", u = e ? "text-lg" : "text-sm", m = n === "calendar" ? `${a} event icon` : `${a} logo`;
  return /* @__PURE__ */ h(
    "span",
    {
      "aria-label": m,
      className: `${d} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${s ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: m,
      children: [
        s ? null : /* @__PURE__ */ o(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${He(t, 0.35)}, transparent 48%)`
            }
          }
        ),
        s ? /* @__PURE__ */ o("img", { "aria-hidden": "true", alt: "", className: f, src: Xa(s) }) : _r(n, t, u)
      ]
    }
  );
}
function Bn({
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
        /* @__PURE__ */ o("span", { className: "block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: t }),
        /* @__PURE__ */ h("span", { className: "mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
          r,
          /* @__PURE__ */ o(bi, { className: "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5", strokeWidth: 1.8 })
        ] })
      ]
    }
  );
}
function Cs({ media: t }) {
  const [a, n] = Me(!1);
  return a ? null : /* @__PURE__ */ h("figure", { className: "mt-7 overflow-hidden rounded-[1.25rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)]", children: [
    /* @__PURE__ */ o(
      "img",
      {
        src: Xa(t.src),
        alt: t.alt,
        className: "w-full bg-black object-contain",
        loading: "lazy",
        onError: () => n(!0)
      }
    ),
    t.caption ? /* @__PURE__ */ o("figcaption", { className: "border-t border-[var(--edge)] px-4 py-3 text-xs leading-5 text-[var(--ink-soft)]", children: t.caption }) : null
  ] });
}
const On = 640, Wn = 448, $r = 96, As = 4096, Hn = 8, Vn = 12e3, Gn = 10, _a = 1300, Rs = 3, jn = 0.09, Ss = 0.35;
function Is(t) {
  let a = 2166136261;
  for (let n = 0; n < t.length; n += 1)
    a ^= t.charCodeAt(n), a = Math.imul(a, 16777619);
  return a >>> 0;
}
function ks(t) {
  let a = t || 1;
  return () => {
    a = a + 1831565813 | 0;
    let n = Math.imul(a ^ a >>> 15, 1 | a);
    return n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n, ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function Ls(t) {
  const a = t.replace("#", ""), n = a.length === 3 ? a.split("").map((e) => e + e).join("") : a, r = Number.parseInt(n, 16);
  return !Number.isFinite(r) || n.length !== 6 ? [125, 145, 175] : [r >> 16 & 255, r >> 8 & 255, r & 255];
}
function At(t, a, n) {
  return [
    t[0] + (a[0] - t[0]) * n,
    t[1] + (a[1] - t[1]) * n,
    t[2] + (a[2] - t[2]) * n
  ];
}
const qn = [
  [-0.295, 0.62],
  [0.31, 0.42],
  [-1.04, 0.25],
  [-0.78, 0.18]
], Zn = [
  [0.5667, -0.5],
  [0.5, -0.55],
  [0.6, -0.45]
];
function _s(t) {
  const a = ks(Is(t)), n = Math.floor(a() * 4), r = a() * Math.PI * 2, e = 0.768 + a() * 0.034;
  let s = Math.cos(r) * e, c = Math.sin(r) * e, d = 0;
  if (n === 2) {
    const f = qn[Math.floor(a() * qn.length)];
    s = f[0] + (a() - 0.5) * 0.05, c = f[1] + (a() - 0.5) * 0.05;
  } else if (n === 3) {
    const f = Zn[Math.floor(a() * Zn.length)];
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
function Ps(t, a, n) {
  let r = a, e = n, s = 0, c = 0;
  for (let d = 0; d < $r; d += 1) {
    const f = r * r + e * e;
    if (f > As)
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
function Fs({ accent: t, seedKey: a }) {
  const n = ne(null);
  return Re(() => {
    const r = n.current, e = r == null ? void 0 : r.getContext("2d");
    if (!r || !e)
      return;
    const s = _s(a), c = Ls(t), d = [8, 11, 16], f = [
      { at: 0, rgb: d },
      { at: 0.38, rgb: At(d, c, 0.45) },
      { at: 0.62, rgb: c },
      { at: 0.86, rgb: At(c, [235, 240, 248], 0.55) },
      { at: 1, rgb: [240, 244, 250] }
    ], u = (U) => {
      for (let re = 1; re < f.length; re += 1)
        if (U <= f[re].at) {
          const ae = f[re - 1], ue = f[re], Q = (U - ae.at) / (ue.at - ae.at);
          return At(ae.rgb, ue.rgb, Q);
        }
      return f[f.length - 1].rgb;
    }, m = On, g = Wn, w = m * g;
    e.clearRect(0, 0, m, g), e.imageSmoothingEnabled = !0, e.imageSmoothingQuality = "high";
    const y = Math.cos(s.rotation), x = Math.sin(s.rotation), M = m / g, L = At(d, c, 0.28), X = At(c, [240, 244, 250], 0.7), te = (U) => {
      if (U < 0)
        return 1;
      const re = Math.min(
        1,
        Math.max(0, Math.log(1 + U) / Math.log(1 + $r))
      );
      return Math.pow(re, 1.1);
    }, j = (U, re, ae, ue) => {
      const Q = ((re + 0.5) / ue * 2 - 1) / s.zoom, V = ((U + 0.5) / ae * 2 - 1) * M / s.zoom, z = V * y - Q * x + s.centerX, G = V * x + Q * y + s.centerY, le = Ps(s, z, G);
      return {
        interior: le < 0,
        shaped: te(le)
      };
    }, oe = Math.ceil(m / Hn), J = Math.ceil(g / Hn), T = document.createElement("canvas");
    T.width = oe, T.height = J;
    const k = T.getContext("2d"), Y = document.createElement("canvas");
    Y.width = m, Y.height = g;
    const _ = Y.getContext("2d");
    if (!k || !_)
      return;
    const W = k.createImageData(oe, J), Z = _.createImageData(m, g), K = new Uint8ClampedArray(w * 3), H = new Uint8ClampedArray(w), de = new Float32Array(w), q = (U) => 1 - Math.pow(1 - U, 3);
    let ge = !1, E = 0, C = "base", A = 0, R = 0, v = 0, N = 0;
    const S = () => {
      if (ge)
        return;
      if (C === "base") {
        const Q = Math.max(1, Math.floor(Vn / oe)), V = Math.min(A + Q, J);
        for (let z = A; z < V; z += 1)
          for (let G = 0; G < oe; G += 1) {
            const le = j(G, z, oe, J), me = (z * oe + G) * 4, we = le.interior ? L : u(le.shaped);
            W.data[me] = we[0], W.data[me + 1] = we[1], W.data[me + 2] = we[2], W.data[me + 3] = le.interior ? 150 : Math.round(30 + le.shaped * 225);
          }
        A = V, A >= J && (k.putImageData(W, 0, 0), C = "baseFade"), E = window.requestAnimationFrame(S);
        return;
      }
      if (C === "baseFade") {
        R += 1, e.clearRect(0, 0, m, g), e.globalAlpha = R / Gn, e.drawImage(T, 0, 0, m, g), e.globalAlpha = 1, R >= Gn && (C = "full"), E = window.requestAnimationFrame(S);
        return;
      }
      if (C === "full") {
        const Q = Math.max(1, Math.floor(Vn / m)), V = Math.min(v + Q, g);
        for (let z = v; z < V; z += 1)
          for (let G = 0; G < m; G += 1) {
            const le = j(G, z, m, g), me = z * m + G, we = le.interior ? L : u(le.shaped);
            K[me * 3] = we[0], K[me * 3 + 1] = we[1], K[me * 3 + 2] = we[2], H[me] = le.interior ? 150 : Math.round(30 + le.shaped * 225), de[me] = le.shaped;
          }
        v = V, v >= g && (C = "reveal"), E = window.requestAnimationFrame(S);
        return;
      }
      if (N += 1, N % Rs !== 0 && N < _a) {
        E = window.requestAnimationFrame(S);
        return;
      }
      const U = Math.min(1, N / _a), re = q(U) * (1 + jn * 2), ae = Z.data;
      for (let Q = 0; Q < w; Q += 1) {
        const V = (re - de[Q]) / jn, z = V <= 0 ? 0 : V >= 1 ? 1 : V, G = z * (1 - z) * 2 * Ss, le = Q * 4;
        ae[le] = K[Q * 3] + (X[0] - K[Q * 3]) * G, ae[le + 1] = K[Q * 3 + 1] + (X[1] - K[Q * 3 + 1]) * G, ae[le + 2] = K[Q * 3 + 2] + (X[2] - K[Q * 3 + 2]) * G, ae[le + 3] = H[Q] * z + G * 30;
      }
      _.putImageData(Z, 0, 0), e.clearRect(0, 0, m, g);
      const ue = 1 - q(U);
      ue > 3e-3 && (e.globalAlpha = ue, e.drawImage(T, 0, 0, m, g), e.globalAlpha = 1), e.drawImage(Y, 0, 0), N < _a && (E = window.requestAnimationFrame(S));
    };
    return E = window.requestAnimationFrame(S), () => {
      ge = !0, window.cancelAnimationFrame(E);
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
          width: On,
          height: Wn,
          className: "h-full w-full object-cover opacity-75 blur-[1px]"
        }
      )
    }
  );
}
function $s({
  entry: t,
  onBack: a,
  onNavigate: n,
  requestedSlug: r
}) {
  const e = tt(), s = (t == null ? void 0 : t.article) ?? null, c = t ? t.eventKind === "event" ? {
    modelLabel: t.name,
    modelMark: "calendar"
  } : (s == null ? void 0 : s.logo) ?? Ds(t) : null, d = (s == null ? void 0 : s.title) ?? (t == null ? void 0 : t.name) ?? e.routeMissingTitle, f = (s == null ? void 0 : s.summary) ?? (t ? `${t.name} is tracked as a ${t.eventTypeLabel.toLowerCase()} from ${t.companyName} in the ${t.productLineLabel} line.` : e.routeMissingDetail.replace("{slug}", r));
  return /* @__PURE__ */ h(
    ye.aside,
    {
      initial: { opacity: 0, x: 72 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 72 },
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      className: "fixed inset-y-0 right-0 z-40 w-full overflow-y-auto border-l border-[var(--edge-strong)] bg-[rgba(8,11,16,0.98)] shadow-[0_34px_100px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl md:w-[min(760px,58vw)]",
      children: [
        t ? /* @__PURE__ */ o(Fs, { accent: t.accent, seedKey: r }) : null,
        /* @__PURE__ */ h("article", { className: "min-h-full px-5 py-5 md:px-8 md:py-8", children: [
          /* @__PURE__ */ h("div", { className: "sticky top-0 z-20 -mx-5 flex items-center justify-between gap-3 border-b border-[var(--edge)] bg-[rgba(8,11,16,0.94)] px-5 py-4 shadow-[0_18px_34px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl md:static md:mx-0 md:border-b-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none", children: [
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                onClick: a,
                className: "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                children: [
                  /* @__PURE__ */ o(fi, { className: "h-4 w-4", strokeWidth: 1.8 }),
                  e.articleBackLabel
                ]
              }
            ),
            t ? /* @__PURE__ */ h("span", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: [
              /* @__PURE__ */ o(ca, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
              t.dateRangeLabel
            ] }) : null
          ] }),
          t && c ? /* @__PURE__ */ h("div", { className: "mt-9 flex items-start gap-4", children: [
            /* @__PURE__ */ o(zn, { accent: t.accent, label: c.modelLabel, mark: c.modelMark, size: "large" }),
            /* @__PURE__ */ o(zn, { accent: t.accent, label: t.companyName, mark: t.companyLogoMark, size: "small" })
          ] }) : null,
          /* @__PURE__ */ o("p", { className: "mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: (s == null ? void 0 : s.eyebrow) ?? (t == null ? void 0 : t.eventTypeLabel) ?? "Unknown route" }),
          /* @__PURE__ */ o("h1", { className: "mt-3 max-w-[12ch] text-4xl leading-none tracking-tighter text-[var(--ink)] md:text-6xl", children: d }),
          /* @__PURE__ */ o("p", { className: "mt-5 max-w-[68ch] text-base leading-8 text-[var(--ink-soft)] md:text-lg", children: (s == null ? void 0 : s.dek) ?? f }),
          s != null && s.media ? /* @__PURE__ */ o(Cs, { media: s.media }) : null,
          t ? /* @__PURE__ */ o("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: Li(
            (s == null ? void 0 : s.facts) ?? [
              { label: "Company", value: t.companyName },
              { label: "Product line", value: t.productLineLabel },
              { label: t.eventKind === "event" ? "Event date" : "Release date", value: t.dateRangeLabel },
              { label: "Type", value: t.eventTypeLabel }
            ],
            { date: t.date, eventKind: t.eventKind }
          ).map((u) => /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
            /* @__PURE__ */ o("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: u.label }),
            /* @__PURE__ */ o("p", { className: "mt-1 text-sm font-semibold text-[var(--ink)]", children: u.value })
          ] }, `${u.label}-${u.value}`)) }) : null,
          /* @__PURE__ */ h("section", { className: "mt-9 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ h("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
              /* @__PURE__ */ o(tr, { className: "h-4 w-4", strokeWidth: 1.8 }),
              "Summary"
            ] }),
            /* @__PURE__ */ o("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: f }),
            s != null && s.impact ? /* @__PURE__ */ o("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: s.impact }) : null
          ] }),
          s == null ? void 0 : s.sections.map((u) => /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ o("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: u.heading }),
            /* @__PURE__ */ o("div", { className: "mt-4 space-y-4", children: u.body.map((m) => /* @__PURE__ */ o("p", { className: "text-base leading-8 text-[var(--ink-soft)]", children: m }, m)) })
          ] }, u.heading)),
          s != null && s.sources.length ? /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ o("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: "Sources" }),
            /* @__PURE__ */ o("div", { className: "mt-4 space-y-2", children: s.sources.map((u) => /* @__PURE__ */ h(
              "a",
              {
                href: u.url,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]",
                children: [
                  /* @__PURE__ */ o("span", { children: u.label }),
                  /* @__PURE__ */ o(pi, { className: "h-4 w-4 shrink-0", strokeWidth: 1.8 })
                ]
              },
              u.url
            )) })
          ] }) : null,
          t ? /* @__PURE__ */ h("div", { className: "mt-8 grid gap-3 border-t border-[var(--edge)] pt-7 sm:grid-cols-2", children: [
            /* @__PURE__ */ o(Bn, { label: "Previous", onNavigate: n, slug: t.previousSlug, title: t.previousName }),
            /* @__PURE__ */ o(Bn, { label: "Next", onNavigate: n, slug: t.nextSlug, title: t.nextName })
          ] }) : /* @__PURE__ */ o("div", { className: "mt-8 rounded-[1.1rem] border border-[var(--edge)] bg-[var(--surface)] p-5", children: /* @__PURE__ */ o("p", { className: "text-sm leading-6 text-[var(--ink-soft)]", children: "This route does not match a known model or event entry." }) })
        ] })
      ]
    },
    "model-article-panel"
  );
}
function Kn({
  detail: t,
  title: a
}) {
  const n = tt();
  return /* @__PURE__ */ o("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ o("div", { className: "mx-auto flex min-h-[100dvh] max-w-[880px] items-center px-5 py-10 md:px-8", children: /* @__PURE__ */ h("div", { className: "rounded-[2rem] border border-[var(--edge)] bg-[var(--surface)] p-8 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]", children: n.statusEyebrow }),
    /* @__PURE__ */ o("h1", { className: "mt-4 text-4xl tracking-tighter text-[var(--ink)]", children: a }),
    /* @__PURE__ */ o("p", { className: "mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--ink-soft)]", children: t })
  ] }) }) });
}
const Us = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`, Xs = `
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
`, Ys = `
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
`, zs = `
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
`, Bs = `
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
`, Os = `
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
`, Ws = `
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
`, Hs = `
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
`, Vs = `
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
function Gs() {
  const t = ne(null), a = ne(!1), n = ne(!1);
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
    const s = (I, D) => {
      const $ = e.createShader(I);
      return $ ? (e.shaderSource($, D), e.compileShader($), e.getShaderParameter($, e.COMPILE_STATUS) ? $ : (console.warn(e.getShaderInfoLog($)), e.deleteShader($), null)) : null;
    }, c = (I) => {
      const D = s(e.VERTEX_SHADER, Us), $ = s(e.FRAGMENT_SHADER, I);
      if (!D || !$)
        return D && e.deleteShader(D), $ && e.deleteShader($), null;
      const F = e.createProgram();
      return F ? (e.attachShader(F, D), e.attachShader(F, $), e.linkProgram(F), e.deleteShader(D), e.deleteShader($), e.getProgramParameter(F, e.LINK_STATUS) ? F : (console.warn(e.getProgramInfoLog(F)), e.deleteProgram(F), null)) : (e.deleteShader(D), e.deleteShader($), null);
    }, d = c(Vs), f = c(Xs), u = c(Ys), m = c(zs), g = c(Bs), w = c(Os), y = c(Ws), x = c(Hs), M = () => {
      [d, f, u, m, g, w, y, x].forEach((I) => {
        I && e.deleteProgram(I);
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
    const X = (I) => {
      const D = e.getAttribLocation(I, "aPosition");
      D < 0 || (e.bindBuffer(e.ARRAY_BUFFER, L), e.enableVertexAttribArray(D), e.vertexAttribPointer(D, 2, e.FLOAT, !1, 0, 0));
    }, te = {
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
    }, T = {
      velocityMap: e.getUniformLocation(g, "uVelocityMap"),
      texel: e.getUniformLocation(g, "uTexel"),
      obstacleRect: e.getUniformLocation(g, "uObstacleRect"),
      aspect: e.getUniformLocation(g, "uAspect")
    }, k = {
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
    }, _ = {
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
    }, W = (I) => {
      const D = e.createTexture(), $ = e.createFramebuffer();
      if (!D || !$)
        return D && e.deleteTexture(D), $ && e.deleteFramebuffer($), !1;
      e.bindTexture(e.TEXTURE_2D, D), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, I, null), e.bindFramebuffer(e.FRAMEBUFFER, $), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, D, 0);
      const F = e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE;
      return e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(D), e.deleteFramebuffer($), F;
    }, K = (() => {
      const I = e.getExtension("OES_texture_half_float"), D = e.getExtension("OES_texture_half_float_linear");
      if (e.getExtension("EXT_color_buffer_half_float"), I && D && W(I.HALF_FLOAT_OES))
        return {
          filter: e.LINEAR,
          type: I.HALF_FLOAT_OES
        };
      const $ = e.getExtension("OES_texture_float"), F = e.getExtension("OES_texture_float_linear");
      return e.getExtension("WEBGL_color_buffer_float"), $ && F && W(e.FLOAT) ? {
        filter: e.LINEAR,
        type: e.FLOAT
      } : {
        filter: e.LINEAR,
        type: e.UNSIGNED_BYTE
      };
    })(), H = (I, D, $) => {
      const F = e.createTexture(), se = e.createFramebuffer();
      return !F || !se ? (F && e.deleteTexture(F), se && e.deleteFramebuffer(se), null) : (e.bindTexture(e.TEXTURE_2D, F), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, K.filter), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, K.filter), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, I, D, 0, e.RGBA, K.type, null), e.bindFramebuffer(e.FRAMEBUFFER, se), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, F, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(F), e.deleteFramebuffer(se), null) : (e.viewport(0, 0, I, D), e.clearColor($[0], $[1], $[2], $[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null), { framebuffer: se, height: D, texture: F, width: I }));
    }, de = (I, D) => {
      e.bindFramebuffer(e.FRAMEBUFFER, I.framebuffer), e.viewport(0, 0, I.width, I.height), e.clearColor(D[0], D[1], D[2], D[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null);
    }, q = (I) => {
      e.deleteFramebuffer(I.framebuffer), e.deleteTexture(I.texture);
    }, ge = () => {
      const I = Math.min(window.devicePixelRatio || 1, 1.3), D = Math.max(120, Math.min(340, Math.floor(window.innerWidth * I / 5))), $ = Math.max(80, Math.min(220, Math.floor(window.innerHeight * I / 5)));
      return [D, $];
    };
    let E = 0, C = !1, A = null, R = null, v = null, N = null, S = null, U = 0, re = 0, ae = 0;
    const ue = performance.now(), Q = window.matchMedia("(prefers-reduced-motion: reduce)"), V = [-1, -1, -1, -1];
    let z = [0.5, 0.5], G = [0, 0], le = 0, me = null, we = ue;
    const B = () => {
      const [I, D] = ge();
      if ((A == null ? void 0 : A[0].width) === I && A[0].height === D)
        return !0;
      A == null || A.forEach(q), R == null || R.forEach(q), v == null || v.forEach(q), N && q(N), S && q(S);
      const $ = [
        H(I, D, [0.5, 0.5, 0, 1]),
        H(I, D, [0.5, 0.5, 0, 1])
      ], F = [
        H(I, D, [0.5, 0, 0, 1]),
        H(I, D, [0.5, 0, 0, 1])
      ], se = [
        H(I, D, [0, 0, 0, 0]),
        H(I, D, [0, 0, 0, 0])
      ], Ie = H(I, D, [0.5, 0, 0, 1]), Pe = H(I, D, [0.5, 0, 0, 1]), pe = [...$, ...F, ...se, Ie, Pe];
      return pe.some((Fe) => !Fe) ? (pe.forEach((Fe) => {
        Fe && q(Fe);
      }), A = null, R = null, v = null, N = null, S = null, !1) : (A = $, R = F, v = se, N = Ie, S = Pe, U = 0, re = 0, ae = 0, !0);
    };
    let Ce = ue;
    const at = 0.5, fe = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ], Xe = () => {
      const D = Math.max(1, Math.floor(window.innerWidth * 1)), $ = Math.max(1, Math.floor(window.innerHeight * 1));
      (r.width !== D || r.height !== $) && (r.width = D, r.height = $, e.viewport(0, 0, D, $)), e.useProgram(d), e.uniform2f(te.resolution, D, $), B();
    }, ce = (I) => {
      const D = I * 60;
      le *= Math.pow(0.9, D), G = [
        G[0] * Math.pow(0.94, D),
        G[1] * Math.pow(0.94, D)
      ];
    }, $e = (I) => {
      if (!a.current || I.pointerType === "touch")
        return;
      const D = Math.max(window.innerWidth, 1), $ = Math.max(window.innerHeight, 1), F = [
        Math.max(0, Math.min(1, I.clientX / D)),
        Math.max(0, Math.min(1, 1 - I.clientY / $))
      ], se = performance.now(), Ie = Math.max((se - we) / 1e3, 1 / 120);
      if (me) {
        const Pe = [
          Math.max(-7.5, Math.min(7.5, (F[0] - me[0]) / Ie)),
          Math.max(-7.5, Math.min(7.5, (F[1] - me[1]) / Ie))
        ];
        G = [
          G[0] + (Pe[0] - G[0]) * 0.74,
          G[1] + (Pe[1] - G[1]) * 0.74
        ];
      }
      z = F, me = F, we = se, le = Math.min(1, le + 0.92), Q.matches && Ae(se);
    }, ee = document.getElementsByClassName("timeline-fluid-obstacle"), Pt = () => {
      const I = Math.max(window.innerWidth, 1), D = Math.max(window.innerHeight, 1), $ = Array.from(ee).find((se) => {
        const Ie = se.getBoundingClientRect(), Pe = window.getComputedStyle(se);
        return Pe.display !== "none" && Pe.visibility !== "hidden" && Ie.width > 1 && Ie.height > 1 && Ie.bottom > 0 && Ie.top < D && Ie.right > 0 && Ie.left < I;
      });
      if (!$)
        return [-1, -1, -1, -1];
      const F = $.getBoundingClientRect();
      return [
        Math.max(0, Math.min(1, F.left / I)),
        Math.max(0, Math.min(1, 1 - F.bottom / D)),
        Math.max(0, Math.min(1, F.right / I)),
        Math.max(0, Math.min(1, 1 - F.top / D))
      ];
    };
    let Ye = [-1, -1, -1, -1], ve = 0;
    const Se = () => {
      ve !== 0 || C || (ve = window.setTimeout(() => {
        ve = 0, Ye = Pt();
      }, 0));
    }, qe = (I, D) => {
      if (!A || !R || !v || !N || !S)
        return;
      const $ = r.width / Math.max(r.height, 1);
      let F = A[U], se = A[1 - U];
      const Ie = v[ae];
      e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(f), X(f), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, F.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Ie.texture), e.uniform1i(j.velocityMap, 0), e.uniform1i(j.dyeMap, 1), e.uniform2f(j.texel, 1 / F.width, 1 / F.height), e.uniform2f(j.pointerPosition, z[0], z[1]), e.uniform2f(j.pointerVelocity, G[0], G[1]), e.uniform1f(j.pointerActive, a.current ? le : 0), e.uniform1f(j.pointerRadius, 0.088), e.uniform1f(j.deltaTime, I), e.uniform1f(j.elapsedTime, D), e.uniform1f(j.aspect, $), e.uniform4f(j.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6), U = 1 - U, F = A[U], e.bindFramebuffer(e.FRAMEBUFFER, S.framebuffer), e.viewport(0, 0, S.width, S.height), e.useProgram(u), X(u), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, F.texture), e.uniform1i(oe.velocityMap, 0), e.uniform2f(oe.texel, 1 / F.width, 1 / F.height), e.uniform1f(oe.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), se = A[1 - U], e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(m), X(m), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, F.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, S.texture), e.uniform1i(J.velocityMap, 0), e.uniform1i(J.curlMap, 1), e.uniform2f(J.texel, 1 / F.width, 1 / F.height), e.uniform1f(J.deltaTime, I * 0.25), e.uniform1f(J.strength, 13), e.uniform1f(J.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), U = 1 - U, F = A[U], e.bindFramebuffer(e.FRAMEBUFFER, N.framebuffer), e.viewport(0, 0, N.width, N.height), e.useProgram(g), X(g), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, F.texture), e.uniform1i(T.velocityMap, 0), e.uniform2f(T.texel, 1 / F.width, 1 / F.height), e.uniform4f(T.obstacleRect, V[0], V[1], V[2], V[3]), e.uniform1f(T.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), R.forEach((Fe) => de(Fe, [0.5, 0, 0, 1])), re = 0;
      for (let Fe = 0; Fe < 12; Fe += 1) {
        const ut = R[re], Ze = R[1 - re];
        e.bindFramebuffer(e.FRAMEBUFFER, Ze.framebuffer), e.viewport(0, 0, Ze.width, Ze.height), e.useProgram(w), X(w), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, ut.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, N.texture), e.uniform1i(k.pressureMap, 0), e.uniform1i(k.divergenceMap, 1), e.uniform2f(k.texel, 1 / ut.width, 1 / ut.height), e.uniform4f(k.obstacleRect, V[0], V[1], V[2], V[3]), e.uniform1f(k.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), re = 1 - re;
      }
      se = A[1 - U], e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(y), X(y), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, F.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, R[re].texture), e.uniform1i(Y.velocityMap, 0), e.uniform1i(Y.pressureMap, 1), e.uniform2f(Y.texel, 1 / F.width, 1 / F.height), e.uniform4f(Y.obstacleRect, V[0], V[1], V[2], V[3]), e.uniform1f(Y.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), U = 1 - U, F = A[U];
      const Pe = v[ae], pe = v[1 - ae];
      e.bindFramebuffer(e.FRAMEBUFFER, pe.framebuffer), e.viewport(0, 0, pe.width, pe.height), e.useProgram(x), X(x), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, F.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Pe.texture), e.uniform1i(_.velocityMap, 0), e.uniform1i(_.dyeMap, 1), e.uniform2f(_.pointerPosition, z[0], z[1]), e.uniform2f(_.pointerVelocity, G[0], G[1]), e.uniform1f(_.pointerActive, a.current ? le : 0), e.uniform1f(_.pointerRadius, 0.088), e.uniform1f(_.deltaTime, I), e.uniform1f(_.elapsedTime, D), e.uniform1f(_.aspect, $), e.uniform4f(_.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6), ae = 1 - ae;
    }, qa = (I) => {
      if (!A || !v)
        return;
      const D = A[U], $ = v[ae];
      e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, r.width, r.height), e.useProgram(d), X(d), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, D.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, $.texture), e.uniform1i(te.velocityMap, 0), e.uniform1i(te.dyeMap, 1), e.uniform2f(te.resolution, r.width, r.height), e.uniform2f(te.fluidTexel, 1 / D.width, 1 / D.height), e.uniform4f(te.widgetRect, Ye[0], Ye[1], Ye[2], Ye[3]), e.uniform1f(te.elapsedTime, I), e.uniform1f(te.emitterDebug, n.current ? 1 : 0), e.uniform4f(te.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6);
    }, Ae = (I) => {
      Xe();
      const D = Math.min(Math.max((I - Ce) / 1e3, 1 / 120), 1 / 20);
      Ce = I;
      const $ = (I - ue) / 1e3, F = D * at, se = $ * at;
      ce(D), qe(F, se), qa(se), Se();
    }, ct = (I) => {
      C || (E = window.requestAnimationFrame(ct), !document.hidden && Ae(I));
    }, dt = () => {
      C || (Xe(), Ye = Pt(), Ae(ue + 1e3), Q.matches || (E = window.requestAnimationFrame(ct)));
    };
    return window.addEventListener("resize", Xe), window.addEventListener("pointermove", $e, { passive: !0 }), dt(), () => {
      C = !0, window.cancelAnimationFrame(E), window.clearTimeout(ve), window.removeEventListener("resize", Xe), window.removeEventListener("pointermove", $e), A == null || A.forEach(q), R == null || R.forEach(q), v == null || v.forEach(q), N && q(N), S && q(S), e.deleteBuffer(L), M();
    };
  }, []), /* @__PURE__ */ h(wt, { children: [
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
function Ur({
  boardView: t,
  hiddenCompanyCount: a,
  onShowHiddenCompanies: n
}) {
  const r = a > 0, e = tt();
  return /* @__PURE__ */ o("div", { className: "flex min-h-[18rem] items-center justify-center px-6 py-14", children: /* @__PURE__ */ h("div", { className: "max-w-[34rem] text-center", children: [
    /* @__PURE__ */ o("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink-soft)]", children: /* @__PURE__ */ o(st, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ o("p", { className: "mt-5 text-lg font-semibold tracking-tight text-[var(--ink)]", children: r ? `All visible ${e.groupPluralLabel} are hidden` : `${t.label} has no releases yet` }),
    /* @__PURE__ */ o("p", { className: "mt-2 text-sm leading-6 text-[var(--ink-soft)]", children: r ? `Show hidden ${e.groupPluralLabel} or turn on another product line to repopulate the timeline.` : e.emptyBoardDescription }),
    r ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        onClick: n,
        className: "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
        children: [
          /* @__PURE__ */ o(la, { className: "h-4 w-4", strokeWidth: 1.8 }),
          e.showHiddenLabel
        ]
      }
    ) : null
  ] }) });
}
function js() {
  return /* @__PURE__ */ o("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ h("div", { className: "mx-auto max-w-[1400px] px-5 pb-16 pt-8 md:px-8 md:pt-10", children: [
    /* @__PURE__ */ h("div", { className: "grid animate-pulse gap-10 lg:grid-cols-[minmax(0,1.18fr)_360px] lg:items-end", children: [
      /* @__PURE__ */ h("div", { className: "space-y-6", children: [
        /* @__PURE__ */ o("div", { className: "h-10 w-44 rounded-full bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
        /* @__PURE__ */ h("div", { className: "space-y-4", children: [
          /* @__PURE__ */ o("div", { className: "h-16 max-w-[720px] rounded-[1.75rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
          /* @__PURE__ */ o("div", { className: "h-6 max-w-[620px] rounded-full bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
        ] }),
        /* @__PURE__ */ h("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_280px]", children: [
          /* @__PURE__ */ o("div", { className: "h-32 rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
          /* @__PURE__ */ o("div", { className: "h-32 rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "h-[360px] rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
    ] }),
    /* @__PURE__ */ o("div", { className: "mt-10 overflow-hidden rounded-[2.4rem] border border-[var(--edge)] bg-[var(--surface)] p-6 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: /* @__PURE__ */ h("div", { className: "flex animate-pulse flex-col gap-6", children: [
      /* @__PURE__ */ h("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ o("div", { className: "h-8 w-80 rounded-full bg-[var(--surface-strong)]" }),
        /* @__PURE__ */ o("div", { className: "h-11 w-44 rounded-full bg-[var(--surface-strong)]" })
      ] }),
      [0, 1, 2, 3].map((t) => /* @__PURE__ */ o("div", { className: "relative h-[4.5rem] rounded-[1.25rem] bg-[var(--surface-strong)]", children: /* @__PURE__ */ o("div", { className: "absolute inset-y-1/2 left-12 right-12 h-px -translate-y-1/2 bg-[var(--edge)]" }) }, t))
    ] }) })
  ] }) });
}
function Xr({
  activeCompanyId: t,
  compact: a = !1,
  onCompanyBlur: n,
  onCompanyFocus: r,
  onCompanyTap: e,
  railWidth: s,
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
          width: `${d + s}px`
        },
        children: /* @__PURE__ */ o(
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
function Yr({
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
  return /* @__PURE__ */ o(
    "div",
    {
      "data-row-focus-label": !0,
      "data-timeline-presentation-hide": !0,
      className: "pointer-events-none absolute z-30 will-change-transform",
      style: {
        transform: `translate3d(${f}px, ${u}px, 0) translateY(-50%)`
      },
      children: /* @__PURE__ */ h(
        ye.div,
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
              /* @__PURE__ */ o(xs, { compact: t, company: m }),
              /* @__PURE__ */ h("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ h("div", { className: "flex min-w-0 items-center gap-2", children: [
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
                /* @__PURE__ */ o("p", { className: "mt-2 truncate text-xs font-medium text-[var(--ink-soft)]", children: w })
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
                /* @__PURE__ */ o(
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
                    children: /* @__PURE__ */ o(hi, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ o(
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
                    children: /* @__PURE__ */ o(gi, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Hide ${m.name}`,
                    title: `Hide ${m.name}`,
                    className: x,
                    onClick: (M) => {
                      M.stopPropagation(), n(m.id), a();
                    },
                    children: /* @__PURE__ */ o(ar, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
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
function qs({
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
  onDismissArticle: te,
  onModelSelect: j,
  onResetCamera: oe,
  onShowHiddenCompanies: J,
  onToggleTimelineGrid: T,
  processedCompanies: k,
  renderWindow: Y,
  scrollContainerRef: _,
  showTimelineGrid: W,
  stopPanning: Z,
  summaryCompanies: K,
  timelineStartDay: H,
  timelineWidth: de,
  viewport: q,
  worldRef: ge,
  yearTicks: E,
  zoom: C
}) {
  var Xe;
  const R = lt(!1, 1), v = ia(k, !1, 1), N = oa({
    currentGlobalDay: r,
    maxDays: m,
    summaryCount: K.length,
    timelineStartDay: H,
    timelineHeight: v,
    timelineWidth: de,
    viewport: q
  }), S = _t(k, !1, 1, R), [U, re] = Me(null), ae = ne(null), ue = () => {
    ae.current !== null && (window.clearTimeout(ae.current), ae.current = null);
  }, Q = (ce) => {
    ue(), re(ce);
  }, V = () => {
    ue(), re(null);
  }, z = () => {
    ue(), ae.current = window.setTimeout(() => {
      re(null), ae.current = null;
    }, 120);
  };
  Re(() => () => ue(), []);
  const G = S.find((ce) => ce.company.id === U) ?? null, me = ie(116, 16, Math.max(16, q.width - 288 - 16)), we = G ? ie(
    (N.timelineY + G.y + G.height / 2 - n.y) * C,
    82,
    Math.max(82, q.height - 84)
  ) : 0, B = tt(), Ce = a.isDefault ? B.defaultBoardDescription : a.isEmpty ? B.emptyBoardDetail : a.isComposite ? B.compositeBoardDescription(a.label) : B.singleBoardDescription(a.label), at = N.timelineX + H * _e, fe = de + vt;
  return Ar(ge, C), /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ o("div", { "data-timeline-presentation-hide": !0, className: "absolute left-5 top-5 z-40 [--category-expanded-width:40rem]", children: x }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: _,
        className: `absolute inset-0 overflow-hidden [overflow-anchor:none] ${f ? "cursor-grabbing" : "cursor-grab"}`,
        onClickCapture: (ce) => te(ce.target, { clientX: ce.clientX, clientY: ce.clientY }),
        onPointerDown: e,
        onPointerMove: s,
        onPointerUp: Z,
        onPointerCancel: Z,
        onLostPointerCapture: Z,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: ge,
            className: "relative",
            style: {
              height: `${N.worldHeight}px`,
              transform: Ga(n, C),
              transformOrigin: "0 0",
              width: `${N.worldWidth}px`
            },
            children: [
              /* @__PURE__ */ h(
                ye.div,
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
                    /* @__PURE__ */ o("h1", { className: "mt-4 max-w-4xl text-5xl leading-none tracking-tighter text-[var(--ink)]", children: B.primaryHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-5 max-w-[68ch] text-base leading-7 text-[var(--ink-soft)]", children: Ce })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                ye.div,
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
                    /* @__PURE__ */ o("p", { className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: B.timelineNotesHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-4 text-sm leading-7 text-[var(--ink-soft)]", children: B.timelineInteractionNoteDesktop })
                  ]
                }
              ),
              /* @__PURE__ */ o(
                ye.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${v}px`,
                    left: `${at}px`,
                    top: `${N.timelineY}px`,
                    width: `${fe}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ o(
                      Xr,
                      {
                        activeCompanyId: U,
                        onCompanyBlur: z,
                        onCompanyFocus: Q,
                        onCompanyTap: Q,
                        railWidth: vt,
                        rowLayouts: S,
                        timelineWidth: de
                      }
                    ),
                    k.length === 0 ? /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-[320px] right-0 top-0 z-20 flex items-center justify-center px-6", children: /* @__PURE__ */ o(
                      Ur,
                      {
                        boardView: a,
                        hiddenCompanyCount: c,
                        onShowHiddenCompanies: J
                      }
                    ) }) : null,
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${fe}px` },
                        children: /* @__PURE__ */ o("div", { style: { paddingLeft: `${vt}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${de}px`, minHeight: `${v}px` },
                            children: [
                              W ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                M.map((ce) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${Be(ce.days, H)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-10 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.18em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: Ve(10),
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
                                    style: { left: `${Be(ce.days, H)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-2 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1.5 font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: Ve(11),
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
                                    style: { left: `${Be(r, H)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
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
                              k.length > 0 ? /* @__PURE__ */ o(
                                ye.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${R.companyGap}px`,
                                    paddingBottom: `${R.bottomPadding}px`,
                                    paddingTop: `${R.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: k.map((ce, $e) => /* @__PURE__ */ o(
                                    Pr,
                                    {
                                      activeArticleSlug: t,
                                      company: ce,
                                      companyIndex: $e,
                                      currentGlobalDay: r,
                                      maxDays: m,
                                      onCompanyBlur: z,
                                      onCompanyFocus: Q,
                                      onModelSelect: j,
                                      renderWindow: Y,
                                      timelineStartDay: H,
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
              /* @__PURE__ */ h(
                ye.div,
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
                    /* @__PURE__ */ h("p", { className: "text-sm leading-relaxed text-[var(--ink-soft)]", children: [
                      B.latestDesktopLabel,
                      ": ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: (u == null ? void 0 : u.name) ?? B.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: ((Xe = u == null ? void 0 : u.latestRelease) == null ? void 0 : Xe.name) ?? B.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ o("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: B.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                ye.div,
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
                    /* @__PURE__ */ o("p", { className: "mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]", children: B.recencyHeading }),
                    /* @__PURE__ */ o("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: K.map((ce, $e) => /* @__PURE__ */ o(
                      Fr,
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
    /* @__PURE__ */ o(Ge, { children: G ? /* @__PURE__ */ o(Lt.Fragment, { children: /* @__PURE__ */ o(
      Yr,
      {
        onClearFocus: V,
        onCompanyHide: L,
        onCompanyMove: X,
        onPointerEnter: ue,
        onPointerLeave: z,
        row: G,
        rowCount: S.length,
        screenX: me,
        screenY: we
      }
    ) }, `${G.company.id}-desktop-focus-label`) : null }),
    /* @__PURE__ */ o(
      kr,
      {
        className: "right-5 top-1/2 -translate-y-1/2",
        maxZoom: w,
        minZoom: g,
        onZoomChange: d,
        zoom: C
      }
    ),
    /* @__PURE__ */ h("div", { "data-timeline-presentation-hide": !0, className: "absolute right-6 top-[calc(50%+12.5rem)] z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        yt,
        {
          label: W ? B.timelineGridHideLabel : B.timelineGridShowLabel,
          onClick: T,
          pressed: W,
          children: [
            W ? /* @__PURE__ */ o(Jn, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ o(er, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ o("span", { children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(yt, { label: B.resetCameraLabel, onClick: oe, children: [
        /* @__PURE__ */ o(la, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { children: "Reset" })
      ] }),
      c > 0 ? /* @__PURE__ */ h(yt, { label: B.showHiddenLabel, onClick: J, children: [
        /* @__PURE__ */ o(st, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { children: B.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function Zs({
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
  onDismissArticle: te,
  onModelSelect: j,
  onResetCamera: oe,
  onShowHiddenCompanies: J,
  onToggleTimelineGrid: T,
  processedCompanies: k,
  renderWindow: Y,
  scrollContainerRef: _,
  showTimelineGrid: W,
  timelineStartDay: Z,
  timelineWidth: K,
  viewport: H,
  worldRef: de,
  yearTicks: q,
  zoom: ge
}) {
  var we;
  const C = lt(!0, 1), A = ia(k, !0, 1), R = oa({
    compact: !0,
    currentGlobalDay: r,
    maxDays: w,
    summaryCount: k.length,
    timelineStartDay: Z,
    timelineHeight: A,
    timelineWidth: K,
    viewport: H
  }), v = _t(k, !0, 1, C), [N, S] = Me(null), U = (B) => S(B), re = () => S(null), ae = v.find((B) => B.company.id === N) ?? null, Q = Math.max(16, Math.min(126, Math.max(16, H.width - 248 - 12))), V = ae ? ie(
    (R.timelineY + ae.y + ae.height / 2 - n.y) * ge,
    98,
    Math.max(98, H.height - 104)
  ) : 0, z = tt(), G = a.isDefault ? z.defaultBoardDescription : a.isEmpty ? z.emptyBoardDetail : a.isComposite ? z.compositeBoardDescriptionMobile(a.label) : z.singleBoardDescriptionMobile(a.label), le = R.timelineX + Z * _e, me = K + xt;
  return Ar(de, ge), /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ o("div", { "data-timeline-presentation-hide": !0, className: "absolute left-3 top-3 z-40 [--category-expanded-width:min(20rem,calc(100vw-5rem))]", children: x }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: _,
        className: "absolute inset-0 touch-none overflow-hidden [overflow-anchor:none]",
        onClickCapture: (B) => te(B.target, { clientX: B.clientX, clientY: B.clientY }),
        onClick: (B) => {
          const Ce = B.target;
          Ce instanceof Element && (Ce.closest("[data-row-focus-band], [data-row-focus-label], button, a, input, label, select, textarea") || re());
        },
        onTouchCancel: e,
        onTouchEnd: e,
        onTouchMove: s,
        onTouchStart: c,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: de,
            className: "relative",
            style: {
              height: `${R.worldHeight}px`,
              transform: Ga(n, ge),
              transformOrigin: "0 0",
              width: `${R.worldWidth}px`
            },
            children: [
              /* @__PURE__ */ h(
                ye.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.7rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.86)] p-5 shadow-[var(--panel-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${R.contentCards.intro.x}px`,
                    top: `${R.contentCards.intro.y}px`,
                    width: `${R.contentCards.intro.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ o("h1", { className: "mt-3 max-w-sm text-[2.25rem] leading-none tracking-tighter text-[var(--ink)]", children: z.primaryHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-4 text-sm leading-6 text-[var(--ink-soft)]", children: G })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                ye.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.25rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.78)] p-4 shadow-[var(--soft-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${R.contentCards.notes.x}px`,
                    top: `${R.contentCards.notes.y}px`,
                    width: `${R.contentCards.notes.width}px`,
                    "--border-sheen-delay": "2.8s"
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: z.timelineNotesHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-3 text-xs leading-5 text-[var(--ink-soft)]", children: z.timelineInteractionNoteMobile })
                  ]
                }
              ),
              /* @__PURE__ */ o(
                ye.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${A}px`,
                    left: `${le}px`,
                    top: `${R.timelineY}px`,
                    width: `${me}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ o(
                      Xr,
                      {
                        activeCompanyId: N,
                        compact: !0,
                        onCompanyFocus: U,
                        onCompanyTap: U,
                        railWidth: xt,
                        rowLayouts: v,
                        timelineWidth: K
                      }
                    ),
                    k.length === 0 ? /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-[196px] right-0 top-0 z-20 flex items-center justify-center px-3", children: /* @__PURE__ */ o(
                      Ur,
                      {
                        boardView: a,
                        hiddenCompanyCount: f,
                        onShowHiddenCompanies: J
                      }
                    ) }) : null,
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${me}px` },
                        children: /* @__PURE__ */ o("div", { style: { paddingLeft: `${xt}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${K}px`, minHeight: `${A}px` },
                            children: [
                              W ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                M.map((B) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${Be(B.days, Z)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-9 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
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
                                q.map((B) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${Be(B.days, Z)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
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
                                /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${Be(r, Z)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
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
                              k.length > 0 ? /* @__PURE__ */ o(
                                ye.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${C.companyGap}px`,
                                    paddingBottom: `${C.bottomPadding}px`,
                                    paddingTop: `${C.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: k.map((B, Ce) => /* @__PURE__ */ o(
                                    Pr,
                                    {
                                      activeArticleSlug: t,
                                      compact: !0,
                                      company: B,
                                      companyIndex: Ce,
                                      currentGlobalDay: r,
                                      maxDays: w,
                                      onCompanyFocus: U,
                                      onModelSelect: j,
                                      renderWindow: Y,
                                      timelineStartDay: Z,
                                      verticalScale: 1
                                    },
                                    B.id
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
              /* @__PURE__ */ h(
                ye.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${R.contentCards.latest.x}px`,
                    top: `${R.contentCards.latest.y}px`,
                    width: `${R.contentCards.latest.width}px`
                  },
                  children: [
                    /* @__PURE__ */ h("p", { className: "text-xs leading-5 text-[var(--ink-soft)]", children: [
                      z.latestMobileLabel,
                      ": ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: (u == null ? void 0 : u.name) ?? z.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: ((we = u == null ? void 0 : u.latestRelease) == null ? void 0 : we.name) ?? z.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ o("p", { className: "mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: z.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                ye.div,
                {
                  "data-timeline-presentation-hide": !0,
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.68, delay: 0.24, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${R.contentCards.summaries.x}px`,
                    top: `${R.contentCards.summaries.y}px`,
                    width: `${R.contentCards.summaries.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]", children: z.recencyHeading }),
                    /* @__PURE__ */ o("div", { className: "grid gap-3 sm:grid-cols-2", children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: k.map((B, Ce) => /* @__PURE__ */ o(
                      Fr,
                      {
                        compact: !0,
                        company: B,
                        currentGlobalDay: r,
                        index: Ce,
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
    /* @__PURE__ */ o(Ge, { children: ae ? /* @__PURE__ */ o(Lt.Fragment, { children: /* @__PURE__ */ o(
      Yr,
      {
        compact: !0,
        onClearFocus: re,
        onCompanyHide: L,
        onCompanyMove: X,
        row: ae,
        rowCount: v.length,
        screenX: Q,
        screenY: V
      }
    ) }, `${ae.company.id}-mobile-focus-label`) : null }),
    /* @__PURE__ */ o(
      kr,
      {
        compact: !0,
        className: "right-1 top-1/2 -translate-y-1/2",
        maxZoom: g,
        minZoom: m,
        onZoomChange: d,
        zoom: ge
      }
    ),
    /* @__PURE__ */ h("div", { "data-timeline-presentation-hide": !0, className: "absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        yt,
        {
          label: W ? z.timelineGridHideLabel : z.timelineGridShowLabel,
          onClick: T,
          pressed: W,
          children: [
            W ? /* @__PURE__ */ o(Jn, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ o(er, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ o("span", { className: "sr-only", children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(yt, { label: z.resetCameraLabel, onClick: oe, children: [
        /* @__PURE__ */ o(la, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: "Reset" })
      ] }),
      f > 0 ? /* @__PURE__ */ h(yt, { label: z.showHiddenLabel, onClick: J, children: [
        /* @__PURE__ */ o(st, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: z.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function rl({ controllerRef: t, definition: a, presentation: n = !1 }) {
  _i(a);
  const [r, e] = Me(() => Mo()), [s, c] = Me(() => Eo()), [d, f] = Me(
    () => No()
  ), [u, m] = Me(!1), [g, w] = Me(
    () => typeof window > "u" ? !0 : window.matchMedia("(min-width: 768px)").matches
  ), [y, x] = Me(Rt), [M, L] = Me(St), [X, te] = Me(!1), [j, oe] = Me(!1), [J, T] = Me(!0), [k, Y] = Me([]), [_, W] = Me(() => ze().map((i) => i.id)), [Z, K] = Me({ x: 0, y: 0 }), [H, de] = Me({ x: 0, y: 0 }), [q, ge] = Me(() => To()), E = ne(Rt), C = ne(St), A = ne({ x: 0, y: 0 }), R = ne({ x: 0, y: 0 }), v = ne({
    complete: null,
    durationMs: null,
    frameId: null,
    lastFrameAt: null,
    start: {
      camera: { x: 0, y: 0 },
      zoom: Rt
    },
    startedAt: null,
    stiffness: nt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: Rt
    },
    zoomAnchor: null
  }), N = ne({
    complete: null,
    durationMs: null,
    frameId: null,
    lastFrameAt: null,
    start: {
      camera: { x: 0, y: 0 },
      zoom: St
    },
    startedAt: null,
    stiffness: nt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: St
    },
    zoomAnchor: null
  }), S = ne(null), U = ne(null), re = ne(null), ae = ne(null), ue = ne(null), Q = ne(null), V = ne(null), z = ne(null), G = ne(!1), le = ne(!1), me = ne(null), we = ne(null), B = ne(!1), Ce = ne(null), at = ne(() => {
  }), fe = ne(null), Xe = ne(null), ce = ne({
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0
  });
  ne(/* @__PURE__ */ new Map());
  const $e = ne(null), [ee, Pt] = Me({
    desktop: { height: 0, width: 0 },
    mobile: { height: 0, width: 0 }
  }), Ye = tt(), ve = q.kind === "model" ? q.slug : null, Se = ve ? he().articleIndexBySlug[ve] ?? null : null, qe = q.kind === "model", Ae = (Ee(() => /* @__PURE__ */ new Date(), []).getTime() - it().getTime()) / ot, ct = Ee(() => _o(r), [r]), dt = Ee(
    () => pa(ze(), r),
    [r]
  ), I = Ee(
    () => Bo(dt, _, k, s, Ae),
    [_, s, Ae, k, dt]
  ), D = Ee(
    () => Oo(I, d, Se == null ? void 0 : Se.companyId),
    [Se == null ? void 0 : Se.companyId, I, d]
  ), $ = Ee(
    () => D.map((i) => i.id),
    [D]
  ), F = Ee(() => {
    const i = new Set(k);
    return dt.filter((l) => i.has(l.id)).length;
  }, [k, dt]), se = Ee(() => $o(ze(), r), [r]), Ie = Ee(() => Uo(ze(), r), [r]), Pe = Ee(() => Xo(ze(), r), [r]), pe = Ee(
    () => Vo(D, Ae),
    [Ae, D]
  ), Fe = Math.max(Math.ceil(Ae) + 36, pe.latestGlobalDay + 36, 720), ut = Math.max(Fe * _e, 1), Ze = $n(ee.desktop.width, vt, ut), Ft = $n(ee.mobile.width, xt, ut), Za = kn({
    camera: Z,
    minimumDays: Fe,
    viewport: ee.desktop,
    zoom: y
  }), Ka = kn({
    camera: H,
    compact: !0,
    minimumDays: Fe,
    viewport: ee.mobile,
    zoom: M
  }), $t = Za.endDay, Ut = Za.startDay, Xt = Ka.endDay, Yt = Ka.startDay, ga = Math.max(ra(Ut, $t), 1), va = Math.max(
    ra(Yt, Xt),
    1
  ), zr = Ee(
    () => In({
      camera: Z,
      viewport: ee.desktop,
      zoom: y
    }),
    [Z, ee.desktop, y]
  ), Br = Ee(
    () => In({
      camera: H,
      compact: !0,
      viewport: ee.mobile,
      zoom: M
    }),
    [H, M, ee.mobile]
  ), xa = 1, ba = 1, zt = ia(pe.processedCompanies, !1, xa), Bt = ia(pe.processedCompanies, !0, ba), Ot = na(
    aa({
      camera: Z,
      futureBufferDays: An,
      pastBufferDays: Cn,
      viewport: ee.desktop,
      zoom: y
    })
  ), Wt = na(
    aa({
      camera: H,
      compact: !0,
      futureBufferDays: An,
      pastBufferDays: Cn,
      viewport: ee.mobile,
      zoom: M
    })
  ), { monthTicks: Or, yearTicks: Wr } = Ee(
    () => Sn({ endDay: Ot.endDay, startDay: Ot.startDay }),
    [Ot.endDay, Ot.startDay]
  ), { monthTicks: Hr, yearTicks: Vr } = Ee(
    () => Sn({ endDay: Wt.endDay, startDay: Wt.startDay }),
    [Wt.endDay, Wt.startDay]
  ), Qa = Ee(() => [...pe.processedCompanies].filter((i) => i.latestRelease).sort((i, l) => {
    var p, b;
    return (((p = l.latestRelease) == null ? void 0 : p.globalDay) ?? 0) - (((b = i.latestRelease) == null ? void 0 : b.globalDay) ?? 0);
  })[0] ?? null, [pe.processedCompanies]), Mt = Ee(() => pe.processedCompanies, [pe.processedCompanies]), Ja = Ee(() => Mt.reduce((i, l) => {
    const p = Ba(l, Ae);
    return Math.max(i, p);
  }, 0), [Ae, Mt]), Ke = Ee(
    () => oa({
      currentGlobalDay: Ae,
      maxDays: $t,
      summaryCount: Mt.length,
      timelineStartDay: Ut,
      timelineHeight: zt,
      timelineWidth: ga,
      viewport: ee.desktop
    }),
    [
      Ae,
      zt,
      $t,
      Mt.length,
      Ut,
      ga,
      ee.desktop
    ]
  ), Qe = Ee(
    () => oa({
      compact: !0,
      currentGlobalDay: Ae,
      maxDays: Xt,
      summaryCount: pe.processedCompanies.length,
      timelineStartDay: Yt,
      timelineHeight: Bt,
      timelineWidth: va,
      viewport: ee.mobile
    }),
    [
      Ae,
      Xt,
      Yt,
      Bt,
      va,
      pe.processedCompanies.length,
      ee.mobile
    ]
  );
  Re(() => {
    const i = window.setTimeout(() => oe(!0), 120);
    return () => window.clearTimeout(i);
  }, []), Re(() => {
    const i = () => {
      const l = window.location.hash;
      ge(br(l)), e(yr(l)), c(wr(l)), f(Tr(l));
    };
    return i(), window.addEventListener("hashchange", i), () => window.removeEventListener("hashchange", i);
  }, []), Re(() => {
    if (n)
      return;
    const i = Ra({
      companySortMode: s,
      filterState: r,
      route: q,
      significanceDisplayLimit: d
    });
    window.location.hash !== i && window.history.replaceState(null, "", i);
  }, [s, r, n, q, d]), Re(() => () => {
    var i, l, p, b, P;
    (i = fe.current) == null || i.call(fe), v.current.frameId !== null && window.cancelAnimationFrame(v.current.frameId), (p = (l = v.current).complete) == null || p.call(l, "cancelled"), N.current.frameId !== null && window.cancelAnimationFrame(N.current.frameId), (P = (b = N.current).complete) == null || P.call(b, "cancelled");
  }, []), Re(() => {
    Se && (e((i) => {
      const l = Xi(Se.presets), p = We(Se.presets, rt()), b = Oe({
        ...i,
        attributeIds: We([...i.attributeIds, ...p], rt()),
        companyIds: i.companyIds.length > 0 && !i.companyIds.includes(Se.companyId) ? [...i.companyIds, Se.companyId] : i.companyIds,
        domainIds: l.length > 0 ? We([...i.domainIds, ...l], je()) : i.domainIds
      });
      return cr(i, b) ? i : b;
    }), Y((i) => i.filter((l) => l !== Se.companyId)));
  }, [Se]), Re(() => {
    const i = new Set(Pe.map((l) => l.id));
    e((l) => {
      const p = l.companyIds.filter((b) => i.has(b));
      return p.length === l.companyIds.length ? l : { ...l, companyIds: p };
    });
  }, [Pe]), Re(() => {
    const i = window.matchMedia("(min-width: 768px)"), l = () => w(i.matches);
    return l(), i.addEventListener("change", l), () => i.removeEventListener("change", l);
  }, []), Re(() => {
    const i = () => {
      var p, b, P, O;
      Pt({
        desktop: {
          height: ((p = S.current) == null ? void 0 : p.clientHeight) ?? window.innerHeight,
          width: ((b = S.current) == null ? void 0 : b.clientWidth) ?? window.innerWidth
        },
        mobile: {
          height: ((P = U.current) == null ? void 0 : P.clientHeight) ?? window.innerHeight,
          width: ((O = U.current) == null ? void 0 : O.clientWidth) ?? window.innerWidth
        }
      });
    };
    i();
    const l = window.requestAnimationFrame(i);
    return window.addEventListener("resize", i), () => {
      window.cancelAnimationFrame(l), window.removeEventListener("resize", i);
    };
  }, [g, j]), Re(() => {
    if (G.current)
      return;
    const i = () => {
      if (G.current || !S.current || S.current.clientWidth === 0)
        return;
      const p = ft(Ke);
      A.current = p.camera, v.current.target = p, Vt(p.zoom, p.camera), G.current = !0;
    };
    if (i(), !G.current)
      return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [Ke, ee.desktop, y]), Re(() => {
    if (le.current)
      return;
    const i = () => {
      if (le.current || !U.current || U.current.clientWidth === 0)
        return;
      const p = ft(Qe, !0);
      R.current = p.camera, N.current.target = p, Gt(p.zoom, p.camera), le.current = !0;
    };
    if (i(), !le.current)
      return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [Qe, M, ee.mobile]);
  const Gr = (i) => {
    e((l) => {
      const p = l.domainIds.includes(i) ? l.domainIds.filter((b) => b !== i) : We([...l.domainIds, i], je());
      return Oe({ ...l, companyIds: [], domainIds: p });
    });
  }, jr = (i) => {
    e((l) => {
      const p = l.attributeIds.includes(i) ? l.attributeIds.filter((b) => b !== i) : We([...l.attributeIds, i], rt());
      return Oe({ ...l, attributeIds: p, companyIds: [] });
    });
  }, qr = (i) => {
    e((l) => Oe({ ...l, companyIds: [], contentType: i }));
  }, Zr = (i) => {
    e((l) => {
      const p = l.companyIds.length === 0 ? [i] : l.companyIds.includes(i) ? l.companyIds.filter((b) => b !== i) : [...l.companyIds, i];
      return Oe({ ...l, companyIds: p });
    });
  }, Kr = () => {
    e((i) => ({ ...i, companyIds: [] }));
  }, Qr = () => {
    e(Tt()), c(ua()), f(ma()), Y([]), W(ze().map((i) => i.id));
  }, Jr = () => {
    e({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: [...je()]
    });
  }, ei = () => {
    e({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: []
    });
  }, en = (i) => {
    Y((l) => l.includes(i) ? l : [...l, i]);
  }, tn = () => {
    Y([]);
  }, an = bn(() => {
    T((i) => !i);
  }, []), nn = (i, l) => {
    W((p) => Ho(p, $, i, l));
  }, rn = () => {
    window.location.hash = Ra({
      companySortMode: s,
      filterState: r,
      route: { kind: "timeline" },
      significanceDisplayLimit: d
    });
  }, Ht = (i) => {
    window.location.hash = Ra({
      companySortMode: s,
      filterState: r,
      route: { kind: "model", slug: i },
      significanceDisplayLimit: d
    });
  }, ya = () => {
    q.kind === "model" && (we.current = null, rn());
  }, on = (i, l) => {
    if (B.current) {
      B.current = !1;
      return;
    }
    Sa(
      i,
      ve,
      ya,
      l
    );
  }, sn = {
    attributeStats: Ie,
    boardView: ct,
    companySortMode: s,
    companyOptions: Pe,
    domainStats: se,
    filterState: r,
    isOpen: u,
    onAttributeToggle: jr,
    onClearAll: ei,
    onClearCompanyFilter: Kr,
    onCompanyToggle: Zr,
    onCompanySortModeChange: c,
    onContentTypeChange: qr,
    onDomainToggle: Gr,
    onReset: Qr,
    onSelectAll: Jr,
    onSignificanceDisplayLimitChange: f,
    onToggle: () => m((i) => !i),
    significanceDisplayLimit: d,
    totalMatchedCompanyCount: I.length,
    visibleCompanyCount: D.length
  }, Vt = (i, l) => {
    E.current = i, A.current = l, Jt(re.current, l, i), x(i), K(l);
  }, Gt = (i, l) => {
    C.current = i, R.current = l, Jt(ae.current, l, i), L(i), de(l);
  }, ln = (i) => {
    var Dt;
    const l = v.current, p = l.lastFrameAt === null ? 1 / 60 : ie((i - l.lastFrameAt) / 1e3, 0, 0.064);
    l.lastFrameAt = i;
    const { target: b, zoomAnchor: P } = l;
    l.durationMs !== null && l.startedAt === null && (l.startedAt = i);
    const O = l.durationMs === null ? null : ie((i - (l.startedAt ?? i)) / l.durationMs, 0, 1), xe = O === null ? 1 - Math.exp(-l.stiffness * p) : O * O * O * (O * (O * 6 - 15) + 10), Ne = O === null ? E.current : l.start.zoom, De = O === null ? A.current : l.start.camera, Te = ht(Ne, b.zoom, xe), be = P ? pt(
      P.worldX,
      P.worldY,
      P.viewportX,
      P.viewportY,
      Te
    ) : {
      x: ht(De.x, b.camera.x, xe),
      y: ht(De.y, b.camera.y, xe)
    };
    Vt(Te, be);
    const Je = Math.hypot(b.camera.x - be.x, b.camera.y - be.y), Nt = Math.abs(b.zoom - Te);
    if (O !== null ? O < 1 : Je > En || Nt > Nn) {
      l.frameId = window.requestAnimationFrame(ln);
      return;
    }
    l.durationMs = null, l.frameId = null, l.lastFrameAt = null, l.startedAt = null;
    const Ta = P ? pt(
      P.worldX,
      P.worldY,
      P.viewportX,
      P.viewportY,
      b.zoom
    ) : b.camera;
    l.zoomAnchor = null, Vt(b.zoom, Ta), (Dt = l.complete) == null || Dt.call(l, "completed"), l.complete = null;
  }, cn = (i) => {
    var Dt;
    const l = N.current, p = l.lastFrameAt === null ? 1 / 60 : ie((i - l.lastFrameAt) / 1e3, 0, 0.064);
    l.lastFrameAt = i;
    const { target: b, zoomAnchor: P } = l;
    l.durationMs !== null && l.startedAt === null && (l.startedAt = i);
    const O = l.durationMs === null ? null : ie((i - (l.startedAt ?? i)) / l.durationMs, 0, 1), xe = O === null ? 1 - Math.exp(-l.stiffness * p) : O * O * O * (O * (O * 6 - 15) + 10), Ne = O === null ? C.current : l.start.zoom, De = O === null ? R.current : l.start.camera, Te = ht(Ne, b.zoom, xe), be = P ? pt(
      P.worldX,
      P.worldY,
      P.viewportX,
      P.viewportY,
      Te
    ) : {
      x: ht(De.x, b.camera.x, xe),
      y: ht(De.y, b.camera.y, xe)
    };
    Gt(Te, be);
    const Je = Math.hypot(b.camera.x - be.x, b.camera.y - be.y), Nt = Math.abs(b.zoom - Te);
    if (O !== null ? O < 1 : Je > En || Nt > Nn) {
      l.frameId = window.requestAnimationFrame(cn);
      return;
    }
    l.durationMs = null, l.frameId = null, l.lastFrameAt = null, l.startedAt = null;
    const Ta = P ? pt(
      P.worldX,
      P.worldY,
      P.viewportX,
      P.viewportY,
      b.zoom
    ) : b.camera;
    l.zoomAnchor = null, Gt(b.zoom, Ta), (Dt = l.complete) == null || Dt.call(l, "completed"), l.complete = null;
  }, jt = (i, l) => {
    var b;
    const p = v.current;
    return (b = p.complete) == null || b.call(p, "cancelled"), p.durationMs = (l == null ? void 0 : l.durationMs) === void 0 ? null : ie(l.durationMs, 120, 5e3), p.start = {
      camera: { ...A.current },
      zoom: E.current
    }, p.startedAt = null, p.target = i, p.stiffness = (l == null ? void 0 : l.stiffness) ?? nt, l ? p.zoomAnchor = l.zoomAnchor ?? null : p.zoomAnchor = null, new Promise((P) => {
      p.complete = P, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(ln));
    });
  }, qt = (i, l) => {
    var b;
    const p = N.current;
    return (b = p.complete) == null || b.call(p, "cancelled"), p.durationMs = (l == null ? void 0 : l.durationMs) === void 0 ? null : ie(l.durationMs, 120, 5e3), p.start = {
      camera: { ...R.current },
      zoom: C.current
    }, p.startedAt = null, p.target = i, p.stiffness = (l == null ? void 0 : l.stiffness) ?? nt, l ? p.zoomAnchor = l.zoomAnchor ?? null : p.zoomAnchor = null, new Promise((P) => {
      p.complete = P, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(cn));
    });
  }, wa = bn(
    (i, l) => {
      const p = !g, b = p ? ee.mobile : ee.desktop;
      if (b.width <= 0 || b.height <= 0)
        return Promise.resolve("unavailable");
      const P = p ? Qe : Ke, O = p ? Bt : zt, xe = Sr(
        i,
        pe.processedCompanies,
        P,
        O,
        p,
        1
      );
      if (!xe)
        return Promise.resolve("unavailable");
      const Ne = cs(b, p, qe), De = l != null && l.anchor ? {
        x: ie(l.anchor.x, 0, 1),
        y: ie(l.anchor.y, 0, 1)
      } : qe && !p ? ds(b, Ne) : vr, Te = us({
        anchor: De,
        bounds: xe,
        focusMaxZoom: Math.min(
          (l == null ? void 0 : l.maxZoom) ?? (p ? bo : xo),
          p ? Zt : Ct
        ),
        insets: Ne,
        layout: P,
        maxZoom: p ? Zt : Ct,
        minZoom: p ? Ft : Ze,
        viewport: b
      });
      if (!Te)
        return Promise.resolve("unavailable");
      const be = {
        durationMs: l == null ? void 0 : l.durationMs,
        stiffness: (l == null ? void 0 : l.stiffness) ?? (i.kind === "slug" ? fo : nt)
      };
      return p ? qt(Te, be) : jt(Te, be);
    },
    [
      Ke,
      Ze,
      zt,
      qe,
      g,
      Qe,
      Ft,
      Bt,
      pe.processedCompanies,
      ee.desktop,
      ee.mobile
    ]
  ), dn = (i) => ([v.current, N.current].forEach((l) => {
    var p;
    l.frameId !== null && window.cancelAnimationFrame(l.frameId), (p = l.complete) == null || p.call(l, "cancelled"), l.complete = null, l.durationMs = null, l.frameId = null, l.lastFrameAt = null, l.startedAt = null, l.zoomAnchor = null;
  }), i.filterState && e(Oe(i.filterState)), i.companySortMode !== void 0 && c(i.companySortMode), i.significanceDisplayLimit !== void 0 && f(i.significanceDisplayLimit), i.hiddenCompanyIds && Y([...i.hiddenCompanyIds]), i.companyOrderIds && W(ha(i.companyOrderIds)), i.route && (ge(i.route), we.current = null), i.showTimelineGrid !== void 0 && T(i.showTimelineGrid), (i.desktopCamera || i.desktopZoom !== void 0) && Vt(
    i.desktopZoom ?? E.current,
    i.desktopCamera ?? A.current
  ), (i.mobileCamera || i.mobileZoom !== void 0) && Gt(
    i.mobileZoom ?? C.current,
    i.mobileCamera ?? R.current
  ), new Promise((l) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => l()));
  }));
  ui(
    t,
    () => ({
      cancelFocus() {
        [v.current, N.current].forEach((i) => {
          var l;
          i.frameId !== null && window.cancelAnimationFrame(i.frameId), (l = i.complete) == null || l.call(i, "cancelled"), i.complete = null, i.durationMs = null, i.frameId = null, i.lastFrameAt = null, i.startedAt = null, i.zoomAnchor = null;
        });
      },
      focus(i, l) {
        return i.kind === "default" ? g ? jt(ft(Ke), {
          durationMs: l == null ? void 0 : l.durationMs,
          stiffness: l == null ? void 0 : l.stiffness
        }) : qt(ft(Qe, !0), {
          durationMs: l == null ? void 0 : l.durationMs,
          stiffness: l == null ? void 0 : l.stiffness
        }) : wa(i, l);
      },
      getState() {
        return {
          companyOrderIds: [..._],
          companySortMode: s,
          desktopCamera: { ...A.current },
          desktopZoom: E.current,
          filterState: {
            ...r,
            attributeIds: [...r.attributeIds],
            companyIds: [...r.companyIds],
            domainIds: [...r.domainIds]
          },
          hiddenCompanyIds: [...k],
          mobileCamera: { ...R.current },
          mobileZoom: C.current,
          route: { ...q },
          showTimelineGrid: J,
          significanceDisplayLimit: d
        };
      },
      restoreState(i) {
        return dn(i);
      },
      setState(i) {
        return dn(i);
      }
    }),
    [
      _,
      s,
      t,
      Ke,
      r,
      k,
      g,
      wa,
      Qe,
      q,
      J,
      d
    ]
  ), Re(() => {
    if (!qe || !ve) {
      qe || (we.current = null);
      return;
    }
    if (!g) {
      we.current = ve;
      return;
    }
    !j || X || me.current !== null || (g ? ee.desktop : ee.mobile).width <= 0 || we.current !== ve && ja(pe.processedCompanies, ve) && (wa({ kind: "slug", slug: ve }), we.current = ve);
  }, [
    ve,
    qe,
    g,
    X,
    j,
    pe.processedCompanies,
    ee.desktop,
    ee.mobile
  ]), Re(() => {
    const i = (l) => {
      const p = ss(l.key);
      if (n || !p || ls(l) || !j)
        return;
      const b = !g, P = b ? ee.mobile : ee.desktop;
      if (P.width <= 0 || P.height <= 0)
        return;
      const O = b ? Qe : Ke, xe = b ? ba : xa, Ne = rs(
        pe.processedCompanies,
        O,
        b,
        xe
      );
      if (Ne.length === 0)
        return;
      const De = b ? R.current : A.current, Te = b ? C.current : E.current, be = is(
        pe.processedCompanies,
        O,
        b,
        xe,
        ve,
        De,
        Te,
        P
      ), Je = os(be, Ne, p, {
        excludeSlug: ve,
        minPrimaryDistance: ve ? Rr : 0
      });
      !Je || Je.slug === ve || (l.preventDefault(), we.current = null, Ht(Je.slug));
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [
    ve,
    Ke,
    g,
    j,
    Qe,
    ba,
    xa,
    n,
    pe.processedCompanies,
    ee.desktop,
    ee.mobile
  ]);
  const ti = () => {
    var l;
    const i = v.current;
    (l = i.complete) == null || l.call(i, "cancelled"), i.complete = null, i.frameId !== null && (window.cancelAnimationFrame(i.frameId), i.frameId = null), i.durationMs = null, i.lastFrameAt = null, i.startedAt = null, i.target = {
      camera: A.current,
      zoom: E.current
    }, i.stiffness = nt, i.zoomAnchor = null;
  }, ai = () => {
    var l;
    const i = N.current;
    (l = i.complete) == null || l.call(i, "cancelled"), i.complete = null, i.frameId !== null && (window.cancelAnimationFrame(i.frameId), i.frameId = null), i.durationMs = null, i.lastFrameAt = null, i.startedAt = null, i.target = {
      camera: R.current,
      zoom: C.current
    }, i.stiffness = nt, i.zoomAnchor = null;
  }, ni = () => {
    const i = S.current;
    ue.current = ((i == null ? void 0 : i.clientWidth) ?? ee.desktop.width) / 2, Q.current = ((i == null ? void 0 : i.clientHeight) ?? ee.desktop.height) / 2, jt(ft(Ke));
  }, ri = () => {
    const i = U.current;
    V.current = ((i == null ? void 0 : i.clientWidth) ?? ee.mobile.width) / 2, z.current = ((i == null ? void 0 : i.clientHeight) ?? ee.mobile.height) / 2, qt(ft(Qe, !0));
  }, un = (i, l) => {
    const p = S.current, b = ee.desktop, P = ie(
      (l == null ? void 0 : l.x) ?? ue.current ?? ((p == null ? void 0 : p.clientWidth) ?? b.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? b.width
    ), O = ie(
      (l == null ? void 0 : l.y) ?? Q.current ?? ((p == null ? void 0 : p.clientHeight) ?? b.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? b.height
    ), xe = v.current, Ne = E.current, De = Number(ie(i(Ne), Ze, Ct).toFixed(3));
    if (De === Ne)
      return;
    const Te = Fn({
      anchorX: P,
      anchorY: O,
      camera: A.current,
      existingAnchor: xe.zoomAnchor,
      zoom: Ne
    }), be = pt(
      Te.worldX,
      Te.worldY,
      P,
      O,
      De
    );
    jt(
      {
        camera: be,
        zoom: De
      },
      { zoomAnchor: Te }
    );
  }, mn = (i, l) => {
    const p = U.current, b = ee.mobile, P = ie(
      (l == null ? void 0 : l.x) ?? V.current ?? ((p == null ? void 0 : p.clientWidth) ?? b.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? b.width
    ), O = ie(
      (l == null ? void 0 : l.y) ?? z.current ?? ((p == null ? void 0 : p.clientHeight) ?? b.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? b.height
    ), xe = N.current, Ne = C.current, De = Number(ie(i(Ne), Ft, Zt).toFixed(3));
    if (De === Ne)
      return;
    const Te = Fn({
      anchorX: P,
      anchorY: O,
      camera: R.current,
      existingAnchor: xe.zoomAnchor,
      zoom: Ne
    }), be = pt(
      Te.worldX,
      Te.worldY,
      P,
      O,
      De
    );
    qt(
      {
        camera: be,
        zoom: De
      },
      { zoomAnchor: Te }
    );
  };
  at.current = (i) => {
    if (!S.current || i.deltaY === 0)
      return;
    i.cancelable && i.preventDefault();
    const l = S.current, p = l.getBoundingClientRect(), b = {
      x: ie(i.clientX - p.left, 0, l.clientWidth),
      y: ie(i.clientY - p.top, 0, l.clientHeight)
    };
    ue.current = b.x, Q.current = b.y;
    const P = i.deltaMode === 1 ? i.deltaY * 16 : i.deltaMode === 2 ? i.deltaY * l.clientHeight : i.deltaY;
    un(
      (O) => It(O, -P * uo, Ze, Ct),
      b
    );
  }, Re(() => {
    if (!j || !g)
      return;
    const i = S.current;
    if (!i)
      return;
    const l = (p) => at.current(p);
    return i.addEventListener("wheel", l, { passive: !1 }), () => {
      i.removeEventListener("wheel", l);
    };
  }, [g, j]);
  const ii = (i) => {
    var P;
    if (i.pointerType !== "mouse" || i.button !== 0 || !S.current)
      return;
    const l = S.current, p = l.getBoundingClientRect();
    ue.current = i.clientX - p.left, Q.current = i.clientY - p.top, ti(), B.current = !1, me.current = i.pointerId, ce.current = {
      lastX: i.clientX,
      lastY: i.clientY,
      startX: i.clientX,
      startY: i.clientY
    }, l.setPointerCapture(i.pointerId), (P = fe.current) == null || P.call(fe);
    const b = (O) => at.current(O);
    window.addEventListener("wheel", b, { capture: !0, passive: !1 }), fe.current = () => {
      window.removeEventListener("wheel", b, !0);
    }, Qn(() => te(!0)), i.preventDefault();
  }, fn = () => {
    if (Ce.current = null, !S.current)
      return;
    const i = Xe.current;
    if (!i || me.current === null)
      return;
    const p = S.current.getBoundingClientRect(), b = i.clientX - p.left;
    ue.current = b, Q.current = i.clientY - p.top;
    const P = i.clientX - ce.current.lastX, O = i.clientY - ce.current.lastY, xe = {
      x: A.current.x - P / Math.max(E.current, 1e-3),
      y: A.current.y - O / Math.max(E.current, 1e-3)
    };
    v.current.target = {
      camera: xe,
      zoom: E.current
    }, A.current = xe, Jt(re.current, xe, E.current), ce.current.lastX = i.clientX, ce.current.lastY = i.clientY;
  }, oi = (i) => {
    if (i.pointerType === "mouse" && S.current) {
      const l = S.current.getBoundingClientRect();
      ue.current = ie(
        i.clientX - l.left,
        0,
        S.current.clientWidth
      ), Q.current = ie(
        i.clientY - l.top,
        0,
        S.current.clientHeight
      );
    }
    i.pointerId === me.current && (Xe.current = {
      clientX: i.clientX,
      clientY: i.clientY
    }, Ce.current === null && (Ce.current = window.requestAnimationFrame(fn)), i.preventDefault());
  }, si = (i) => {
    var p;
    if (i.pointerId !== me.current || !S.current)
      return;
    Ce.current !== null && (window.cancelAnimationFrame(Ce.current), Ce.current = null, fn()), S.current.hasPointerCapture(i.pointerId) && S.current.releasePointerCapture(i.pointerId), me.current = null, Xe.current = null, (p = fe.current) == null || p.call(fe), fe.current = null, Math.hypot(
      i.clientX - ce.current.startX,
      i.clientY - ce.current.startY
    ) > Rn ? B.current = !0 : Sa(
      i.target,
      ve,
      ya,
      { clientX: i.clientX, clientY: i.clientY }
    ), K(A.current), te(!1);
  }, pn = (i, l) => Math.hypot(l.clientX - i.clientX, l.clientY - i.clientY), hn = (i, l) => ({
    clientX: (i.clientX + l.clientX) / 2,
    clientY: (i.clientY + l.clientY) / 2
  }), gn = (i, l) => {
    const p = l.getBoundingClientRect();
    V.current = ie(i.clientX - p.left, 0, l.clientWidth), z.current = ie(i.clientY - p.top, 0, l.clientHeight);
  }, vn = (i, l) => {
    const p = {
      x: R.current.x - i / Math.max(C.current, 1e-3),
      y: R.current.y - l / Math.max(C.current, 1e-3)
    };
    N.current.target = {
      camera: p,
      zoom: C.current
    }, R.current = p, Jt(ae.current, p, C.current);
  }, xn = (i) => i instanceof Element && !i.closest("[data-timeline-pin]") && !!i.closest("button, a, input, label, select, textarea, [data-row-focus-label]"), mt = (i) => ({
    clientX: i.clientX,
    clientY: i.clientY
  }), Et = (i) => {
    if (i.length === 0) {
      $e.current = null, V.current = null, z.current = null;
      return;
    }
    if (i.length === 1) {
      const P = mt(i[0]);
      $e.current = {
        distance: 0,
        lastMidpointX: P.clientX,
        lastMidpointY: P.clientY,
        lastX: P.clientX,
        lastY: P.clientY,
        startX: P.clientX,
        startY: P.clientY,
        type: "pan"
      };
      return;
    }
    const l = mt(i[0]), p = mt(i[1]), b = hn(l, p);
    $e.current = {
      distance: Math.max(pn(l, p), 1),
      lastMidpointX: b.clientX,
      lastMidpointY: b.clientY,
      lastX: b.clientX,
      lastY: b.clientY,
      startX: b.clientX,
      startY: b.clientY,
      type: "pinch"
    };
  }, li = (i) => {
    !U.current || xn(i.target) || (ai(), Et(i.touches));
  }, ci = (i) => {
    if (!U.current || xn(i.target))
      return;
    const l = U.current, p = $e.current;
    if (!p) {
      Et(i.touches);
      return;
    }
    if (i.touches.length === 1) {
      const be = mt(i.touches[0]);
      if (gn(be, l), p.type === "pan") {
        const Je = be.clientX - p.lastX, Nt = be.clientY - p.lastY;
        vn(Je, Nt), p.lastX = be.clientX, p.lastY = be.clientY;
      } else
        Et(i.touches);
      i.preventDefault();
      return;
    }
    if (i.touches.length < 2)
      return;
    const b = mt(i.touches[0]), P = mt(i.touches[1]), O = hn(b, P), xe = Math.max(pn(b, P), 1);
    if (gn(O, l), p.type !== "pinch") {
      Et(i.touches), i.preventDefault();
      return;
    }
    const Ne = O.clientX - p.lastMidpointX, De = O.clientY - p.lastMidpointY;
    vn(Ne, De);
    const Te = ie(xe / Math.max(p.distance, 1), 0.78, 1.28);
    mn((be) => be * Te, {
      x: V.current ?? l.clientWidth / 2,
      y: z.current ?? l.clientHeight / 2
    }), p.distance = xe, p.lastMidpointX = O.clientX, p.lastMidpointY = O.clientY, p.lastX = O.clientX, p.lastY = O.clientY, i.preventDefault();
  }, di = (i) => {
    const l = $e.current;
    if (Et(i.touches), de(R.current), !l || l.type !== "pan" || i.changedTouches.length === 0)
      return;
    const p = i.changedTouches[0];
    Math.hypot(p.clientX - l.startX, p.clientY - l.startY) > Rn || Sa(
      p.target,
      ve,
      ya,
      { clientX: p.clientX, clientY: p.clientY }
    );
  };
  return ze().length === 0 ? /* @__PURE__ */ o(
    Kn,
    {
      title: Ye.emptyDataTitle,
      detail: Ye.emptyDataDetail
    }
  ) : pe.invalidEntries.length > 0 ? /* @__PURE__ */ o(
    Kn,
    {
      title: Ye.timelineStatusDataErrorTitle,
      detail: Ye.timelineStatusDataErrorDetail(pe.invalidEntries)
    }
  ) : j ? /* @__PURE__ */ h(
    "div",
    {
      "data-timeline-presentation": n ? "" : void 0,
      className: `relative isolate min-h-[100dvh] overflow-hidden bg-[var(--page-bg)] text-[var(--ink)] selection:bg-emerald-500/25 selection:text-[var(--ink)] ${n ? "pointer-events-none" : ""}`,
      children: [
        /* @__PURE__ */ o(Gs, {}),
        /* @__PURE__ */ h("div", { className: "relative z-10", children: [
          g ? null : /* @__PURE__ */ o("div", { className: "md:hidden", children: /* @__PURE__ */ o(
            Zs,
            {
              activeArticleSlug: ve,
              boardView: ct,
              camera: H,
              currentGlobalDay: Ae,
              handleTouchEnd: di,
              handleTouchMove: ci,
              handleTouchStart: li,
              handleZoomChange: mn,
              hiddenCompanyCount: F,
              latestCompany: Qa,
              minZoom: Ft,
              maxZoom: Zt,
              maxDays: Xt,
              maxSummaryQuietDays: Ja,
              modelExplorer: /* @__PURE__ */ o(Un, { ...sn, variant: "rail" }),
              monthTicks: Hr,
              onCompanyHide: en,
              onCompanyMove: nn,
              onDismissArticle: on,
              onModelSelect: Ht,
              onResetCamera: ri,
              onShowHiddenCompanies: tn,
              onToggleTimelineGrid: an,
              processedCompanies: pe.processedCompanies,
              renderWindow: Br,
              scrollContainerRef: U,
              showTimelineGrid: J,
              timelineStartDay: Yt,
              timelineWidth: va,
              viewport: ee.mobile,
              worldRef: ae,
              yearTicks: Vr,
              zoom: M
            }
          ) }),
          g ? /* @__PURE__ */ o("div", { className: "hidden md:block", children: /* @__PURE__ */ o(
            qs,
            {
              activeArticleSlug: ve,
              boardView: ct,
              camera: Z,
              currentGlobalDay: Ae,
              handlePointerDown: ii,
              handlePointerMove: oi,
              handleZoomChange: un,
              hiddenCompanyCount: F,
              isPanning: X,
              latestCompany: Qa,
              maxDays: $t,
              minZoom: Ze,
              maxZoom: Ct,
              maxSummaryQuietDays: Ja,
              modelExplorer: /* @__PURE__ */ o(Un, { ...sn, variant: "rail" }),
              monthTicks: Or,
              onCompanyHide: en,
              onCompanyMove: nn,
              onDismissArticle: on,
              onModelSelect: Ht,
              onResetCamera: ni,
              onShowHiddenCompanies: tn,
              onToggleTimelineGrid: an,
              processedCompanies: pe.processedCompanies,
              renderWindow: zr,
              scrollContainerRef: S,
              showTimelineGrid: J,
              stopPanning: si,
              summaryCompanies: Mt,
              timelineStartDay: Ut,
              timelineWidth: ga,
              viewport: ee.desktop,
              worldRef: re,
              yearTicks: Wr,
              zoom: y
            }
          ) }) : null
        ] }),
        /* @__PURE__ */ o(Ge, { children: qe && !n ? /* @__PURE__ */ o(
          $s,
          {
            entry: Se,
            onBack: rn,
            onNavigate: Ht,
            requestedSlug: ve ?? ""
          }
        ) : null })
      ]
    }
  ) : /* @__PURE__ */ o(js, {});
}
export {
  rr as DAY_MS,
  rl as TimelineExperience,
  nl as buildTimelineArticleIndex,
  Si as createTimelineItemSlug,
  ki as formatDaysSince,
  ke as formatTimelineDate,
  ir as formatTimelineDateRange,
  or as getTimelineItemSlug,
  Ii as getUtcCalendarDayDelta,
  al as indexTimelineArticles,
  Le as parseTimelineDate,
  Li as withDaysSinceFact
};
