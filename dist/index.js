import { jsx as o, jsxs as h, Fragment as gt } from "react/jsx-runtime";
import Nt, { useState as Ee, useRef as ne, useMemo as Te, useEffect as Ce, useCallback as ln } from "react";
import { flushSync as Xn } from "react-dom";
import { EyeOff as Yn, Eye as zn, RotateCcw as Gt, Layers3 as rt, ArrowLeft as jr, CalendarDays as jt, BookOpen as Bn, ExternalLink as qr, ArrowUp as Kr, ArrowDown as Zr, X as On, SlidersHorizontal as Qr, ChevronDown as Jr, ArrowRight as eo, Sparkles as to, Check as ao, BrainCircuit as no, Globe2 as ro, Image as oo, Clapperboard as Wn, AudioLines as io, Box as so, Code2 as lo, Bot as co, CarFront as uo } from "lucide-react";
import { AnimatePresence as He, motion as ge } from "motion/react";
const mo = 1e3 * 60 * 60 * 24;
function fo(t, a, n, r) {
  const e = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${e(t)}-${e(a)}-${e(n)}-${r}`;
}
function Le(t) {
  return /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
}
function Ie(t, a = { month: "short", day: "numeric", year: "numeric" }, n = "day") {
  const r = typeof t == "string" ? Le(t) : t;
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
function Hn(t, a, n = "day", r = "day") {
  if (!a || a === t)
    return Ie(t, void 0, n);
  const e = Le(t), s = Le(a);
  if (Number.isNaN(e.getTime()) || Number.isNaN(s.getTime()))
    return `${t} - ${a}`;
  if (s.getTime() < e.getTime())
    return `${Ie(t, void 0, n)} - ${Ie(a, void 0, r)}`;
  if (n !== "day" || r !== "day")
    return `${Ie(e, void 0, n)} - ${Ie(s, void 0, r)}`;
  const l = e.getUTCFullYear() === s.getUTCFullYear();
  return l && e.getUTCMonth() === s.getUTCMonth() ? `${Ie(e, { month: "short", day: "numeric" })}-${Ie(s, { day: "numeric" })}, ${s.getUTCFullYear()}` : l ? `${Ie(e, { month: "short", day: "numeric" })} - ${Ie(s, { month: "short", day: "numeric", year: "numeric" })}` : `${Ie(e)} - ${Ie(s)}`;
}
function Vn(t, a, n) {
  return n.articleSlug ?? fo(t, a, n.name, n.date);
}
function ks(t) {
  return t.reduce((a, n) => (a[n.slug] = n, a), {});
}
function Is({
  articlesBySlug: t,
  eventTypesById: a,
  fallbackEventTypeId: n,
  groups: r
}) {
  const e = [];
  return r.forEach((s) => {
    s.productLines.forEach((l) => {
      const d = [...l.releases].sort(
        (c, m) => Le(c.date).getTime() - Le(m.date).getTime()
      ), f = d.map((c) => Vn(s.id, l.id, c));
      d.forEach((c, m) => {
        var A, F;
        const v = f[m], y = a[c.eventType ?? n] ?? a[n], b = Le(c.date), x = c.endDate ? Le(c.endDate) : b, D = Number.isNaN(b.getTime()) || Number.isNaN(x.getTime()) ? 1 : Math.max(1, Math.round((x.getTime() - b.getTime()) / mo) + 1);
        e.push({
          accent: s.accent,
          article: t[v] ?? null,
          classes: c.classes ?? l.defaultClasses ?? s.defaultClasses ?? [l.classId],
          companyLogoMark: s.logoMark ?? "generic",
          companyId: s.id,
          companyName: s.name,
          date: c.date,
          dateLabel: Ie(c.date, void 0, c.datePrecision),
          dateRangeLabel: Hn(c.date, c.endDate, c.datePrecision),
          durationDays: D,
          endDate: c.endDate,
          endDateLabel: c.endDate ? Ie(c.endDate) : void 0,
          eventKind: y.kind,
          eventType: y.id,
          eventTypeLabel: y.label,
          eventTypeShortLabel: y.shortLabel,
          name: c.name,
          nextName: ((A = d[m + 1]) == null ? void 0 : A.name) ?? null,
          nextSlug: f[m + 1] ?? null,
          presets: c.presets ?? l.defaultPresets ?? s.defaultPresets,
          tags: c.tags ?? l.defaultTags ?? [],
          previousName: ((F = d[m - 1]) == null ? void 0 : F.name) ?? null,
          previousSlug: f[m - 1] ?? null,
          productLineId: l.id,
          productLineLabel: l.label,
          productLineShortLabel: l.shortLabel,
          slug: v
        });
      });
    });
  }), e;
}
let Ta = null;
function po(t) {
  Ta = t;
}
function me() {
  if (!Ta)
    throw new Error("TimelineExperience requires a timeline definition before rendering.");
  return Ta;
}
function Ye() {
  return me().groups;
}
function ho() {
  return me().facets;
}
function Gn() {
  return me().filterGroups;
}
function Ve() {
  return Gn().flatMap((t) => t.domainIds);
}
function tt() {
  return me().attributeFilterIds;
}
function go() {
  const t = me().defaultFilterState;
  return {
    attributeIds: [...t.attributeIds],
    companyIds: [...t.companyIds],
    contentType: t.contentType,
    domainIds: [...t.domainIds]
  };
}
function qt() {
  return me().contentTypeOptions;
}
function Kt() {
  return me().defaultSortMode;
}
function jn() {
  return me().displayLimits;
}
function Zt() {
  return me().defaultDisplayLimit;
}
function vo() {
  return me().eventTypes.reduce(
    (t, a) => (t[a.id] = a, t),
    {}
  );
}
function qe() {
  return me().copy;
}
function at() {
  return Le(me().startDate);
}
function Xt(t, a) {
  if (t.length !== a.length)
    return !1;
  const n = new Set(a);
  return t.every((r) => n.has(r));
}
function Be(t, a) {
  const n = new Set(t);
  return a.filter((r) => n.has(r));
}
function vt() {
  return go();
}
function Ge(t) {
  const a = Ye().map((n) => n.id);
  return {
    attributeIds: Be(t.attributeIds, tt()),
    companyIds: Be(t.companyIds, a),
    contentType: qt().some((n) => n.id === t.contentType) ? t.contentType : "all",
    domainIds: Be(t.domainIds, Ve())
  };
}
function qn(t, a) {
  return t.contentType === a.contentType && Xt(t.attributeIds, a.attributeIds) && Xt(t.companyIds, a.companyIds) && Xt(t.domainIds, a.domainIds);
}
function Bt(t) {
  return ho().find((a) => a.id === t);
}
function cn(t) {
  var a;
  return ((a = Bt(t)) == null ? void 0 : a.label) ?? t;
}
function xo(t) {
  return new Set(Ve()).has(t);
}
function bo(t) {
  return Be(t.filter(xo), Ve());
}
function da(t) {
  return t.join(",");
}
function ua(t, a) {
  if (!t)
    return [];
  const n = t.split(",").map((r) => r.trim()).filter(Boolean);
  return Be(n, a);
}
function dn(t) {
  return t.productLines.reduce((a, n) => {
    const r = n.releases.reduce((e, s) => {
      const l = Le(s.date).getTime();
      return Number.isNaN(l) ? e : Math.max(e, l);
    }, 0);
    return Math.max(a, r);
  }, 0);
}
function yo(t) {
  var a, n;
  return ((n = (a = me().scoring) == null ? void 0 : a.getFacetSignificanceBase) == null ? void 0 : n.call(a, t)) ?? 50;
}
function wo(t) {
  var a, n;
  return ((n = (a = me().scoring) == null ? void 0 : a.getEventTypeSignificanceBonus) == null ? void 0 : n.call(a, t)) ?? 0;
}
function To(t, a) {
  var e, s;
  const n = (s = (e = me().scoring) == null ? void 0 : e.getRecencySignificanceBonus) == null ? void 0 : s.call(
    e,
    t,
    a
  );
  if (n !== void 0)
    return n;
  const r = a - t;
  return r < 0 ? 2 : r <= 60 ? 12 : r <= 180 ? 9 : r <= 365 ? 6 : r <= 730 ? 3 : 0;
}
function Kn(t, a, n, r) {
  var x, D, A, F;
  const e = Le(n.date), s = n.endDate ? Le(n.endDate) : e, l = Number.isNaN(s.getTime()) ? 0 : Math.round((s.getTime() - at().getTime()) / nt), d = Da(t, a, n), f = cr(t, a, n), c = Ca(n), m = d.reduce(
    (te, re) => Math.max(te, yo(re)),
    40
  ), v = ((D = (x = me().scoring) == null ? void 0 : x.getTagSignificanceBonus) == null ? void 0 : D.call(x, f)) ?? 0, y = ((F = (A = me().scoring) == null ? void 0 : A.getGroupRankBonus) == null ? void 0 : F.call(A, t)) ?? 0, b = m + v + y + wo(c.id) + To(l, r);
  return ce(Math.round(b), 1, 100);
}
function Eo(t, a, n) {
  return a.releases.reduce(
    (r, e) => Math.max(r, Kn(t, a, e, n)),
    0
  );
}
function un(t, a) {
  return t.productLines.reduce(
    (n, r) => Math.max(n, Eo(t, r, a)),
    0
  );
}
function Mo(t, a, n) {
  const r = [...t];
  return a === "significance" ? (r.sort(
    (e, s) => un(s, n) - un(e, n) || (e.raceRank ?? 999) - (s.raceRank ?? 999) || e.name.localeCompare(s.name)
  ), r) : a === "latest" ? (r.sort(
    (e, s) => dn(s) - dn(e) || e.name.localeCompare(s.name)
  ), r) : (r.sort((e, s) => e.name.localeCompare(s.name)), r);
}
const nt = 1e3 * 60 * 60 * 24, Ae = 2.24, Ma = [0.22, 1, 0.36, 1], $e = { duration: 0.34, ease: Ma }, Zn = { duration: 0.24, ease: Ma }, No = { duration: 0.4, ease: Ma }, mt = 320, ft = 196, Do = "#05070b", Co = 72, Ro = 80, So = 56, Ao = 60, ko = 8, Io = 44, Lo = 32, _o = 96, Po = 56, Fo = 80, $o = 40, Yt = 1, zt = 1.05, Pt = 4, ma = 3.4, Uo = 420, Xo = 360, Qn = 180, Yo = 300, zo = 180, Bo = 260, Jn = 112, Oo = 380, fa = 0.06, pt = 6, er = 0.92, Wo = 25e-5, Ho = 0.025, lt = 18, Vo = 8, mn = 0.08, fn = 6e-4, Go = 720, jo = 720, pn = 540, qo = 120, hn = 90, gn = 180, pa = 420, ha = 168, ut = 64, Ko = 0.88, Zo = 1.65, Qo = 1.45, vn = 6, Jo = {
  bottom: 48,
  left: 24,
  right: 24,
  top: 72
}, tr = 760, ar = 0.58, ei = 0.58, nr = { x: 0.5, y: 0.46 };
function rr(t) {
  return t ? me().wideLogoMarks.includes(t) : !1;
}
function Na(t) {
  return `${"/".endsWith("/") ? "/" : "//"}${t.replace(/^\/+/, "")}`;
}
function Qt(t) {
  const a = t.replace(/^#\/?/, ""), n = a.indexOf("?"), r = n >= 0 ? a.slice(0, n) : a, e = n >= 0 ? a.slice(n + 1) : "";
  return {
    params: new URLSearchParams(e),
    path: r
  };
}
function or(t) {
  const { path: a } = Qt(t);
  if (!a)
    return { kind: "timeline" };
  const r = (me().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), e = a.match(new RegExp(`^(?:${r}|events)/([^/?#]+)$`));
  return e ? { kind: "model", slug: decodeURIComponent(e[1]) } : { kind: "timeline" };
}
function ir(t) {
  const { params: a } = Qt(t), n = a.get("ct"), r = vt();
  return Ge({
    attributeIds: ua(a.get("a"), tt()),
    companyIds: ua(a.get("co"), Ye().map((e) => e.id)),
    contentType: qt().some((e) => e.id === n) ? n : "all",
    domainIds: a.has("d") ? ua(a.get("d"), Ve()) : r.domainIds
  });
}
function sr(t) {
  const a = Qt(t).params.get("sort");
  return a && me().sortOptions.some((n) => n.id === a) ? a : Kt();
}
function lr(t) {
  const a = Qt(t).params.get("rows");
  if (a === "all")
    return "all";
  const n = Number.parseInt(a ?? "", 10);
  return jn().includes(n) ? n : Zt();
}
function ga({
  companySortMode: t,
  filterState: a,
  route: n,
  significanceDisplayLimit: r
}) {
  const e = Ge(a), s = vt(), l = new URLSearchParams();
  Xt(e.domainIds, s.domainIds) || l.set("d", da(e.domainIds)), e.attributeIds.length > 0 && l.set("a", da(e.attributeIds)), e.contentType !== s.contentType && l.set("ct", e.contentType), e.companyIds.length > 0 && l.set("co", da(e.companyIds)), t !== Kt() && l.set("sort", t), r !== Zt() && l.set("rows", String(r));
  const d = me().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items", f = n.kind === "model" ? `/${d}/${encodeURIComponent(n.slug)}` : "/", c = l.toString().replaceAll("%2C", ",");
  return `#${f}${c ? `?${c}` : ""}`;
}
function ti() {
  return typeof window > "u" ? { kind: "timeline" } : or(window.location.hash);
}
function ai() {
  return typeof window > "u" ? vt() : ir(window.location.hash);
}
function ni() {
  return typeof window > "u" ? Kt() : sr(window.location.hash);
}
function ri() {
  return typeof window > "u" ? Zt() : lr(window.location.hash);
}
function oi(t) {
  return !(t instanceof Element) || t.closest(
    "button, a, input, label, select, textarea, [data-row-focus-label], [data-timeline-pin]"
  ) ? !1 : !!t.closest("[data-timeline-field]");
}
function ii(t, a) {
  if (a && typeof document < "u") {
    const n = document.elementFromPoint(a.clientX, a.clientY);
    if (n)
      return n;
  }
  return t;
}
function va(t, a, n, r) {
  if (!a)
    return;
  const e = ii(t, r);
  oi(e) && n();
}
function si(t, a) {
  return t.toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...a
  });
}
function xa(t, a, n) {
  const r = t.replace("#", ""), e = r.length === 3 ? r.split("").map((m) => `${m}${m}`).join("") : r, s = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e))
    return t;
  const l = Number.parseInt(e.slice(0, 2), 16), d = Number.parseInt(e.slice(2, 4), 16), f = Number.parseInt(e.slice(4, 6), 16), c = (m) => Math.round(m + (a - m) * s);
  return `rgb(${c(l)} ${c(d)} ${c(f)})`;
}
function li(t, a, n) {
  const r = (y) => {
    const b = y.replace("#", "");
    return b.length === 3 ? b.split("").map((x) => `${x}${x}`).join("") : b;
  }, e = r(t), s = r(a), l = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e) || !/^[0-9a-fA-F]{6}$/.test(s))
    return t;
  const d = [e.slice(0, 2), e.slice(2, 4), e.slice(4, 6)].map(
    (y) => Number.parseInt(y, 16)
  ), f = [s.slice(0, 2), s.slice(2, 4), s.slice(4, 6)].map(
    (y) => Number.parseInt(y, 16)
  ), [c, m, v] = d.map(
    (y, b) => Math.round(y + (f[b] - y) * l)
  );
  return `rgb(${c} ${m} ${v})`;
}
function Oe(t, a) {
  const n = t.replace("#", ""), r = n.length === 3 ? n.split("").map((d) => `${d}${d}`).join("") : n;
  if (!/^[0-9a-fA-F]{6}$/.test(r))
    return `rgba(255, 255, 255, ${a})`;
  const e = Number.parseInt(r.slice(0, 2), 16), s = Number.parseInt(r.slice(2, 4), 16), l = Number.parseInt(r.slice(4, 6), 16);
  return `rgba(${e}, ${s}, ${l}, ${a})`;
}
function ci(t, a) {
  return a.defaultClasses ?? t.defaultClasses ?? [a.classId];
}
function di(t, a) {
  return a.defaultPresets ?? t.defaultPresets;
}
function ui(t, a, n) {
  return n.classes ?? ci(t, a);
}
function Da(t, a, n) {
  return n.presets ?? di(t, a);
}
function mi(t) {
  return t.defaultTags ?? [];
}
function cr(t, a, n) {
  return n.tags ?? mi(a);
}
function Ca(t) {
  const a = vo(), n = me().defaultEventTypeId;
  return a[t.eventType ?? n] ?? a[n];
}
function fi(t) {
  var f;
  const a = Ge(t), n = Ve().filter((c) => a.domainIds.includes(c)), r = qn(a, vt()), e = qe();
  if (n.length === 0)
    return {
      description: e.emptyBoardDetail,
      isComposite: !0,
      isDefault: !1,
      isEmpty: !0,
      label: e.emptyBoardLabel
    };
  if (r) {
    const c = a.domainIds[0], m = c ? Bt(c) : null;
    return {
      description: (m == null ? void 0 : m.description) ?? e.defaultBoardDescription,
      isComposite: !1,
      isDefault: !0,
      isEmpty: !1,
      label: (m == null ? void 0 : m.label) ?? n.join(", ")
    };
  }
  const l = [n.length === Ve().length ? "All domains" : n.length === 1 ? cn(n[0]) : `${n.length} domains`];
  a.attributeIds.forEach((c) => {
    l.push(cn(c));
  });
  const d = vt().contentType;
  return a.contentType !== d && l.push(
    ((f = qt().find((c) => c.id === a.contentType)) == null ? void 0 : f.label) ?? a.contentType
  ), a.companyIds.length > 0 && l.push(`${a.companyIds.length} ${e.groupPluralLabel}`), {
    description: l.join(", "),
    isComposite: l.length > 1 || n.length > 1,
    isDefault: !1,
    isEmpty: !1,
    label: l.join(" · ")
  };
}
function pi(t, a) {
  if (a === "all")
    return !0;
  const n = Ca(t), r = n.kind === "event" || n.id === "product-launch";
  return a === "events" ? r : !r;
}
function hi(t, a, n, r) {
  const e = Da(t, a, n), s = r.domainIds.some((d) => e.includes(d)), l = r.attributeIds.length === 0 || r.attributeIds.some((d) => e.includes(d));
  return s && l && pi(n, r.contentType);
}
function Jt(t, a, n = {}) {
  const r = Ge(a), e = new Set(r.companyIds);
  return r.domainIds.length === 0 ? [] : t.filter((s) => n.ignoreCompanyFilter || e.size === 0 || e.has(s.id)).map((s) => ({
    ...s,
    productLines: s.productLines.map((l) => ({
      ...l,
      releases: l.releases.filter(
        (d) => hi(s, l, d, r)
      )
    })).filter((l) => l.releases.length > 0)
  })).filter((s) => s.productLines.length > 0);
}
function dr(t) {
  return {
    providerCount: t.length,
    releaseCount: t.reduce(
      (a, n) => a + n.productLines.reduce((r, e) => r + e.releases.length, 0),
      0
    )
  };
}
function gi(t, a) {
  return Ve().reduce((n, r) => (n[r] = dr(
    Jt(t, { ...a, companyIds: [], domainIds: [r] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function vi(t, a) {
  return tt().reduce((n, r) => (n[r] = dr(
    Jt(t, { ...a, attributeIds: [r], companyIds: [] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function xi(t, a) {
  return Jt(t, { ...a, companyIds: [] }, { ignoreCompanyFilter: !0 }).map((n) => ({
    id: n.id,
    name: n.name,
    releaseCount: n.productLines.reduce((r, e) => r + e.releases.length, 0)
  }));
}
function bi(t) {
  const a = t.productLines.find((n) => n.classId !== "events") ?? t.productLines[0];
  return (a == null ? void 0 : a.classId) ?? t.defaultClasses[0] ?? me().defaultClassId;
}
function yi(t, a, n) {
  const r = [...t], [e] = r.splice(a, 1);
  return e === void 0 ? t : (r.splice(n, 0, e), r);
}
function Ra(t) {
  const a = new Set(Ye().map((s) => s.id)), n = t.filter((s) => a.has(s)), r = new Set(n), e = Ye().map((s) => s.id).filter((s) => !r.has(s));
  return [...n, ...e];
}
function wi(t, a, n, r, e) {
  const s = new Map(t.map((m) => [m.id, m])), l = new Set(n), d = Ra(a).map((m) => s.get(m)).filter((m) => !!m), f = new Set(d.map((m) => m.id)), c = t.filter((m) => !f.has(m.id));
  return Mo(
    [...d, ...c].filter((m) => !l.has(m.id)),
    r,
    e
  );
}
function Ti(t, a, n) {
  if (a === "all")
    return t;
  const r = t.slice(0, a);
  if (!n || r.some((s) => s.id === n))
    return r;
  const e = t.find((s) => s.id === n);
  return e ? [...r, e] : r;
}
function Ei(t, a, n, r) {
  if (n === r)
    return t;
  const e = new Set(a), s = Ra(t), l = s.filter((v) => e.has(v)), d = l.indexOf(n), f = l.indexOf(r);
  if (d < 0 || f < 0)
    return s;
  const c = yi(l, d, f);
  let m = 0;
  return s.map((v) => {
    if (!e.has(v))
      return v;
    const y = c[m];
    return m += 1, y ?? v;
  });
}
function Mi(t, a, n, r) {
  const e = new Set(a), s = Ra(t).filter(
    (f) => e.has(f)
  ), l = s.indexOf(n), d = r === "up" ? l - 1 : l + 1;
  return l < 0 || d < 0 || d >= s.length ? t : Ei(t, a, n, s[d]);
}
function Ni(t, a) {
  const n = [], r = t.map((l) => {
    const d = l.productLines.map((x) => {
      const A = x.releases.map((w) => ({
        ...w,
        classes: ui(l, x, w),
        presets: Da(l, x, w),
        tags: cr(l, x, w)
      })).sort((w, P) => {
        const z = Le(w.date).getTime(), k = Le(P.date).getTime();
        return z - k || w.name.localeCompare(P.name);
      }).reduce((w, P) => {
        const z = Le(P.date), k = P.endDate ? Le(P.endDate) : z;
        if (Number.isNaN(z.getTime()))
          return n.push(`${l.name} / ${x.label}: ${P.name}`), w;
        if (P.endDate && Number.isNaN(k.getTime()))
          return n.push(`${l.name} / ${x.label}: ${P.name} end date`), w;
        const O = w[w.length - 1], q = Math.round((z.getTime() - at().getTime()) / nt), Z = Number.isNaN(k.getTime()) ? q : Math.max(q, Math.round((k.getTime() - at().getTime()) / nt)), H = O ? q - O.globalDay : 0, de = Ca(P), j = Kn(l, x, P, a);
        return w.push({
          ...P,
          articleSlug: Vn(l.id, x.id, P),
          dateLabel: Ie(z, void 0, P.datePrecision),
          dateRangeLabel: Hn(P.date, P.endDate, P.datePrecision),
          durationDays: Z - q + 1,
          endDateLabel: P.endDate ? Ie(P.endDate) : void 0,
          endGlobalDay: Z,
          eventKind: de.kind,
          eventType: de.id,
          eventTypeLabel: de.label,
          eventTypeShortLabel: de.shortLabel,
          globalDay: q,
          gap: H,
          significanceScore: j
        }), w;
      }, []), F = A[A.length - 1] ?? null, te = A.reduce((w, P) => w + P.gap, 0), re = A.length > 1 ? Math.round(te / (A.length - 1)) : null, se = A[0], Q = A.reduce(
        (w, P) => Math.max(w, P.significanceScore),
        0
      );
      return {
        ...x,
        averageGap: re,
        latestRelease: F,
        releases: A,
        significanceScore: Q,
        startDay: (se == null ? void 0 : se.globalDay) ?? 0,
        totalSpan: F && se ? F.endGlobalDay - se.globalDay : 0
      };
    }).sort(
      (x, D) => {
        var A, F;
        return D.significanceScore - x.significanceScore || (((A = D.latestRelease) == null ? void 0 : A.globalDay) ?? 0) - (((F = x.latestRelease) == null ? void 0 : F.globalDay) ?? 0) || x.label.localeCompare(D.label);
      }
    ), f = [...d].filter((x) => x.latestRelease).sort((x, D) => {
      var A, F;
      return (((A = D.latestRelease) == null ? void 0 : A.endGlobalDay) ?? 0) - (((F = x.latestRelease) == null ? void 0 : F.endGlobalDay) ?? 0);
    })[0] ?? null, c = (f == null ? void 0 : f.latestRelease) ?? null, m = [...d].flatMap((x) => x.releases).sort((x, D) => x.globalDay - D.globalDay)[0] ?? null, v = d.reduce(
      (x, D) => x + D.releases.reduce((A, F) => A + F.gap, 0),
      0
    ), y = d.reduce(
      (x, D) => x + Math.max(D.releases.length - 1, 0),
      0
    ), b = d.reduce(
      (x, D) => Math.max(x, D.significanceScore),
      0
    );
    return {
      ...l,
      averageGap: y > 0 ? Math.round(v / y) : null,
      latestProductLine: f,
      latestRelease: c,
      productLines: d,
      significanceScore: b,
      startDay: (m == null ? void 0 : m.globalDay) ?? 0,
      totalSpan: c && m ? c.endGlobalDay - m.globalDay : 0
    };
  }), e = r.reduce((l, d) => {
    var c;
    const f = ((c = d.latestRelease) == null ? void 0 : c.endGlobalDay) ?? 0;
    return Math.max(l, f);
  }, 0), s = r.reduce(
    (l, d) => l + d.productLines.reduce((f, c) => f + c.releases.length, 0),
    0
  );
  return {
    invalidEntries: n,
    latestGlobalDay: e,
    processedCompanies: r,
    totalReleases: s
  };
}
function xn({ endDay: t, startDay: a }) {
  const n = [], r = [], e = Math.floor(a), s = Math.max(e, Math.ceil(t)), l = new Date(at().getTime() + e * nt), d = new Date(at().getTime() + s * nt), f = new Date(Date.UTC(l.getUTCFullYear(), l.getUTCMonth(), 1));
  for (f.getTime() < l.getTime() && f.setUTCMonth(f.getUTCMonth() + 1); f <= d; ) {
    const c = Math.round((f.getTime() - at().getTime()) / nt);
    f.getUTCMonth() === 0 ? r.push({ days: c, label: f.getUTCFullYear() }) : n.push({
      days: c,
      label: si(f, { month: "short" })
    }), f.setUTCMonth(f.getUTCMonth() + 1);
  }
  return { monthTicks: n, yearTicks: r };
}
function Ot({
  camera: t,
  compact: a = !1,
  futureBufferDays: n = 0,
  pastBufferDays: r = 0,
  viewport: e,
  zoom: s
}) {
  if (e.width <= 0)
    return { endDay: 0, startDay: 0 };
  const l = a ? ft : mt, d = a ? Jn : Qn, f = Math.max(s, 1e-3), c = t.x, m = t.x + e.width / f, v = (c - d - l) / Ae, y = (m - d - l) / Ae, b = Math.floor(v - r);
  return { endDay: Math.max(b + 30, Math.ceil(y + n)), startDay: b };
}
function Di(t, a = qo) {
  const n = Math.max(1, a);
  return {
    endDay: Math.ceil(t.endDay / n) * n,
    startDay: Math.floor(t.startDay / n) * n
  };
}
function bn({
  camera: t,
  compact: a = !1,
  viewport: n,
  zoom: r
}) {
  return n.width <= 0 ? { endDay: Number.POSITIVE_INFINITY, startDay: Number.NEGATIVE_INFINITY } : Di(
    Ot({
      camera: t,
      compact: a,
      futureBufferDays: pn,
      pastBufferDays: pn,
      viewport: n,
      zoom: r
    })
  );
}
function Ci(t, a) {
  return t.startDay === a.startDay && t.endDay === a.endDay;
}
function Ft(t, a, n) {
  return a >= n.startDay && t <= n.endDay;
}
function yn({
  camera: t,
  compact: a = !1,
  minimumDays: n,
  viewport: r,
  zoom: e
}) {
  const s = Ot({
    camera: t,
    compact: a,
    futureBufferDays: Go,
    pastBufferDays: jo,
    viewport: r,
    zoom: e
  });
  return {
    endDay: Math.max(n, s.endDay),
    startDay: Math.min(0, s.startDay)
  };
}
function ze(t, a) {
  return (t - a) * Ae;
}
function Wt(t, a) {
  return Math.max(0, (a - t) * Ae);
}
function Sa(t, a) {
  return t.latestRelease ? Math.max(0, Math.floor(a - t.latestRelease.endGlobalDay)) : 0;
}
function Ri(t, a) {
  return a === 0 ? 100 : Math.max(0, Math.round((1 - t / a) * 100));
}
function Si(t) {
  return `${t} ${t === 1 ? "Day" : "Days"} since last update`;
}
function ba(t) {
  if (t <= 0)
    return "Same day";
  if (t < 31)
    return `${t} ${t === 1 ? "day" : "days"}`;
  const a = Math.floor(t / 365), n = t - a * 365, r = Math.floor(n / 30), e = n - r * 30, s = [];
  return a > 0 && s.push(`${a} ${a === 1 ? "year" : "years"}`), r > 0 && s.push(`${r} ${r === 1 ? "month" : "months"}`), e > 0 && a === 0 && s.push(`${e} ${e === 1 ? "day" : "days"}`), s.length > 0 ? s.join(", ") : `${t} days`;
}
function Ai(t, a) {
  if (a === null || a <= 0)
    return null;
  const n = t - a, r = Math.abs(n);
  return r <= 2 ? `On pace with this line's ${a}-day average` : `${r} ${r === 1 ? "day" : "days"} ${n > 0 ? "slower" : "faster"} than this line's ${a}-day average`;
}
function je(t, a = 1) {
  return Math.max(1, Math.round(t * a));
}
function Aa(t = !1, a = 1) {
  return je(t ? Ao : So, a);
}
function ka(t, a = !1, n = 1) {
  const r = Math.max(t, 1), e = je(a ? Ro : Co, n), s = je(ko, n), l = Aa(a, n), d = r * l + Math.max(r - 1, 0) * s, f = Math.max(e, d + (r > 1 ? je(16, n) : 0));
  return {
    groupHeight: f,
    lineGap: s,
    lineHeight: l,
    topOffset: Math.max(0, (f - d) / 2)
  };
}
function Ia(t, a = !1, n = 1) {
  return ka(t.productLines.length, a, n).groupHeight;
}
function La(t, a, n = !1, r = 1) {
  const { lineGap: e, lineHeight: s, topOffset: l } = ka(t, n, r);
  return l + a * (s + e) + s / 2;
}
function ot(t = !1, a = 1) {
  return {
    bottomPadding: je(t ? $o : Po, a),
    companyGap: je(t ? Lo : Io, a),
    topPadding: je(t ? Fo : _o, a)
  };
}
function Ht(t, a = !1, n = 1) {
  const r = ot(a, n), e = t.reduce((l, d) => l + Ia(d, a, n), 0), s = Math.max(t.length - 1, 0) * r.companyGap;
  return Math.max(
    je(a ? 384 : 448, n),
    e + s + r.topPadding + r.bottomPadding + je(a ? 40 : 32, n)
  );
}
function Dt(t, a = !1, n = 1, r = ot(a, n)) {
  let e = r.topPadding;
  return t.map((s, l) => {
    const d = Ia(s, a, n), f = {
      company: s,
      height: d,
      index: l,
      y: e
    };
    return e += d + r.companyGap, f;
  });
}
function Vt({
  compact: t = !1,
  currentGlobalDay: a,
  maxDays: n,
  summaryCount: r,
  timelineStartDay: e = 0,
  timelineHeight: s,
  timelineWidth: l,
  viewport: d
}) {
  const f = Math.max(d.width, t ? 360 : 1024), c = Math.max(d.height, t ? 720 : 680), m = t ? ft : mt, v = t ? Jn : Qn, y = t ? Oo : Yo, b = t ? zo : Uo, x = t ? Bo : Xo, D = v + m + a * Ae, A = Math.max(0, D - f * (t ? 0.78 : 0.72)), F = t ? Math.min(390, Math.max(292, f - 64)) : 720, te = t ? Math.min(360, Math.max(280, f - 56)) : 360, re = t ? Math.min(420, Math.max(290, f - 48)) : 520, se = t ? Math.min(620, Math.max(320, f - 32)) : 1180, Q = Math.max(b * 0.34, A + (t ? 20 : f * 0.24)), w = t ? 0 : 4, P = Math.max(
    0,
    Math.min(
      y - c * (t ? 0.28 : 0.24),
      w - (t ? 18 : 24)
    )
  ), z = t ? Q + F + 18 : Math.min(Q + F + 28, A + f - te - 24), k = w + 8, O = Q, q = y + s + (t ? 42 : 52), Z = Q, H = q + (t ? 132 : 118), de = t ? f >= 640 ? 2 : 1 : 4, E = Math.max(1, Math.ceil(Math.max(r, 1) / de)) * (t ? 172 : 224), C = v + m + Math.max(n, 0) * Ae, I = v + e * Ae, _ = Math.max(
    C + b,
    I + l + m + b,
    z + te + b,
    Z + se + b,
    A + f + b
  ), g = Math.max(
    y + s + x,
    H + E + x,
    k + (t ? 152 : 172) + x,
    P + c + x
  );
  return {
    contentCards: {
      intro: { height: t ? 176 : 202, width: F, x: Q, y: w },
      latest: { height: t ? 96 : 74, width: re, x: O, y: q },
      notes: { height: t ? 142 : 170, width: te, x: z, y: k },
      summaries: { width: se, x: Z, y: H }
    },
    initialCameraX: A,
    initialCameraY: P,
    railWidth: m,
    timelineX: v,
    timelineY: y,
    worldHeight: g,
    worldWidth: _
  };
}
function ki(t) {
  return {
    x: t.initialCameraX,
    y: t.initialCameraY
  };
}
function $t(t, a = !1) {
  return {
    camera: ki(t),
    zoom: a ? zt : Yt
  };
}
function _a(t) {
  return Number.isFinite(t) ? Math.max(1e-3, t) : 1;
}
function Pa(t, a) {
  return `translate3d(${-t.x * a}px, ${-t.y * a}px, 0) scale(${a})`;
}
const ya = /* @__PURE__ */ new WeakMap(), Ii = 126;
function Ut(t, a, n) {
  if (!t)
    return;
  t.style.transform = Pa(a, n), t.style.setProperty("--map-zoom", String(_a(n))), t.style.willChange = "transform";
  const r = ya.get(t);
  r !== void 0 && window.clearTimeout(r);
  const e = window.setTimeout(() => {
    t.style.willChange = "auto", ya.delete(t);
  }, Ii);
  ya.set(t, e);
}
function We(t) {
  return {
    "--label-size": String(t)
  };
}
function wa(t, a, n) {
  const r = t.maxX - t.minX, e = t.maxY - t.minY, s = Math.max(0, (a - r) / 2), l = Math.max(0, (n - e) / 2);
  return {
    maxX: t.maxX + s,
    maxY: t.maxY + l,
    minX: t.minX - s,
    minY: t.minY - l
  };
}
function Fa(t, a) {
  for (const n of t)
    for (let r = 0; r < n.productLines.length; r += 1) {
      const s = n.productLines[r].releases.find((l) => l.articleSlug === a);
      if (s)
        return { company: n, productLineIndex: r, release: s };
    }
  return null;
}
const ur = 6, Li = 2.75;
function _i(t, a, n, r) {
  const e = ot(n, r), s = Dt(t, n, r, e), l = new Map(s.map((f) => [f.company.id, f])), d = [];
  return t.forEach((f) => {
    const c = l.get(f.id);
    c && f.productLines.forEach((m, v) => {
      m.releases.forEach((y) => {
        d.push({
          slug: y.articleSlug,
          x: a.timelineX + a.railWidth + y.globalDay * Ae,
          y: a.timelineY + c.y + La(f.productLines.length, v, n, r)
        });
      });
    });
  }), d;
}
function Pi(t, a, n, r, e, s, l, d) {
  if (e) {
    const c = Fa(t, e);
    if (c) {
      const v = Dt(
        t,
        n,
        r,
        ot(n, r)
      ).find((y) => y.company.id === c.company.id);
      if (v)
        return {
          x: a.timelineX + a.railWidth + c.release.globalDay * Ae,
          y: a.timelineY + v.y + La(c.company.productLines.length, c.productLineIndex, n, r)
        };
    }
  }
  const f = Math.max(l, 1e-3);
  return {
    x: s.x + d.width / (2 * f),
    y: s.y + d.height / (2 * f)
  };
}
function Fi(t, a, n, r) {
  const e = (r == null ? void 0 : r.minPrimaryDistance) ?? ur;
  let s = null, l = 1 / 0, d = 1 / 0;
  return a.forEach((f) => {
    if (r != null && r.excludeSlug && f.slug === r.excludeSlug)
      return;
    const c = f.x - t.x, m = f.y - t.y;
    let v = 0, y = 0;
    if (n === "right") {
      if (c < e)
        return;
      v = c, y = Math.abs(m);
    } else if (n === "left") {
      if (c > -e)
        return;
      v = -c, y = Math.abs(m);
    } else if (n === "down") {
      if (m < e)
        return;
      v = m, y = Math.abs(c);
    } else {
      if (m > -e)
        return;
      v = -m, y = Math.abs(c);
    }
    const b = y * Li + v, x = Math.hypot(c, m);
    (b < l || b === l && x < d) && (s = f, l = b, d = x);
  }), s;
}
function $i(t) {
  return t === "ArrowRight" ? "right" : t === "ArrowLeft" ? "left" : t === "ArrowDown" ? "down" : t === "ArrowUp" ? "up" : null;
}
function Ui(t) {
  if (t.altKey || t.ctrlKey || t.metaKey)
    return !0;
  const a = t.target;
  return a instanceof Element ? a.closest('[aria-label="Timeline zoom controls"]') ? !0 : !!a.closest('input, textarea, select, [contenteditable="true"]') : !1;
}
function wn({
  compact: t = !1,
  layout: a,
  productLineIndex: n,
  release: r,
  row: e,
  verticalScale: s = 1
}) {
  const l = Aa(t, s), d = a.timelineY + e.y + La(e.company.productLines.length, n, t, s), f = a.timelineX + a.railWidth + r.globalDay * Ae, c = a.timelineX + a.railWidth + r.endGlobalDay * Ae, m = t ? 28 : 36;
  return {
    maxX: Math.max(f, c) + m,
    maxY: d + l / 2 + 12,
    minX: Math.min(f, c) - m,
    minY: d - l / 2 - 12
  };
}
function Xi(t, a, n) {
  return n ? a ? { bottom: 40, left: 16, right: 16, top: 64 } : {
    bottom: 48,
    left: 100,
    right: Math.min(tr, Math.round(t.width * ar)),
    top: 72
  } : Jo;
}
function Yi(t, a) {
  const n = Math.min(
    tr,
    Math.round(t.width * ar)
  ), e = (t.width - n) * ei, s = Math.max(
    1,
    t.width - a.left - a.right - ut * 2
  );
  return { x: ce(
    (e - a.left - ut) / s,
    0.42,
    0.68
  ), y: nr.y };
}
function zi({
  anchor: t,
  bounds: a,
  focusMaxZoom: n,
  insets: r,
  layout: e,
  maxZoom: s,
  minZoom: l,
  viewport: d
}) {
  if (d.width <= 0 || d.height <= 0)
    return null;
  const f = Math.max(
    1,
    d.width - r.left - r.right - ut * 2
  ), c = Math.max(
    1,
    d.height - r.top - r.bottom - ut * 2
  ), m = Math.max(a.maxX - a.minX, 1), v = Math.max(a.maxY - a.minY, 1), y = Math.min(f / m, c / v) * er * Ko, b = Number(ce(y, l, Math.min(s, n)).toFixed(3)), x = (a.minX + a.maxX) / 2, D = (a.minY + a.maxY) / 2, A = r.left + ut + f * t.x, F = r.top + ut + c * t.y, te = Math.max(0, e.worldWidth - d.width / b), re = Math.max(0, e.worldHeight - d.height / b);
  return {
    camera: {
      x: ce(x - A / b, 0, te),
      y: ce(D - F / b, 0, re)
    },
    zoom: b
  };
}
function Bi(t, a, n, r, e = !1, s = 1) {
  if (t.kind === "bounds")
    return t.bounds;
  const l = ot(e, s), d = Dt(a, e, s, l);
  if (t.kind === "slug") {
    const b = Fa(a, t.slug);
    if (!b)
      return null;
    const x = d.find((A) => A.company.id === b.company.id);
    if (!x)
      return null;
    const D = wn({
      compact: e,
      layout: n,
      productLineIndex: b.productLineIndex,
      release: b.release,
      row: x,
      verticalScale: s
    });
    return wa(D, pa, ha);
  }
  if (t.kind === "release") {
    const b = d.find((A) => A.company.id === t.companyId);
    if (!b)
      return null;
    const x = b.company.productLines.findIndex((A) => A.id === t.productLineId);
    if (x < 0)
      return null;
    const D = wn({
      compact: e,
      layout: n,
      productLineIndex: x,
      release: {
        endGlobalDay: t.endGlobalDay ?? t.globalDay,
        globalDay: t.globalDay
      },
      row: b,
      verticalScale: s
    });
    return wa(D, pa, ha);
  }
  const f = n.timelineX + n.railWidth + t.globalDay * Ae, c = t.endGlobalDay ?? t.globalDay, m = n.timelineX + n.railWidth + c * Ae, v = n.timelineY + r * 0.44, y = e ? 100 : 120;
  return wa(
    {
      maxX: Math.max(f, m) + 40,
      maxY: v + y / 2,
      minX: Math.min(f, m) - 40,
      minY: v - y / 2
    },
    pa,
    ha
  );
}
function Oi(t, a, n, r) {
  const e = Math.max(a, 1e-3);
  return {
    worldX: t.x + n / e,
    worldY: t.y + r / e
  };
}
function ct(t, a, n, r, e) {
  const s = Math.max(e, 1e-3);
  return {
    x: t - n / s,
    y: a - r / s
  };
}
function Tn({
  anchorX: t,
  anchorY: a,
  camera: n,
  existingAnchor: r,
  zoom: e
}) {
  if (r && r.viewportX === t && r.viewportY === a)
    return r;
  const { worldX: s, worldY: l } = Oi(n, e, t, a);
  return {
    viewportX: t,
    viewportY: a,
    worldX: s,
    worldY: l
  };
}
function dt(t, a, n) {
  return t + (a - t) * n;
}
function ce(t, a, n) {
  return Math.min(Math.max(t, a), n);
}
function Wi(t) {
  const a = ce(t, 0, 1), n = 1 / (1 + Math.exp(pt / 2)), r = 1 / (1 + Math.exp(-pt / 2));
  return (1 / (1 + Math.exp(-pt * (a - 0.5))) - n) / (r - n);
}
function Hi(t) {
  const a = ce(t, 0, 1), n = 1 / (1 + Math.exp(pt / 2)), r = 1 / (1 + Math.exp(-pt / 2)), e = n + a * (r - n);
  return ce(0.5 + Math.log(e / (1 - e)) / pt, 0, 1);
}
function Ea(t, a, n) {
  if (n <= a)
    return a;
  const r = Wi(t);
  return a + r * (n - a);
}
function mr(t, a, n) {
  if (n <= a)
    return 0;
  const r = (ce(t, a, n) - a) / (n - a);
  return Hi(r);
}
function Et(t, a, n, r) {
  const e = mr(t, n, r);
  return Ea(e + a, n, r);
}
function En(t, a, n) {
  if (t <= 0 || n <= 0)
    return 0.35;
  const r = Math.max(t - a, 120);
  return ce(r / n * er, 0.08, 1);
}
function Vi(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ o("path", { d: "M11 5v12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ o("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Gi(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ o("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ o("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Mt({ classId: t, className: a }) {
  const n = a ?? "h-4 w-4";
  return t === "frontier-llms" ? /* @__PURE__ */ o(no, { className: n, strokeWidth: 1.8 }) : t === "open-source-llms" ? /* @__PURE__ */ o(ro, { className: n, strokeWidth: 1.8 }) : t === "image-generation" ? /* @__PURE__ */ o(oo, { className: n, strokeWidth: 1.8 }) : t === "video-generation" ? /* @__PURE__ */ o(Wn, { className: n, strokeWidth: 1.8 }) : t === "audio-generation" ? /* @__PURE__ */ o(io, { className: n, strokeWidth: 1.8 }) : t === "3d-generation" ? /* @__PURE__ */ o(so, { className: n, strokeWidth: 1.8 }) : t === "world-models" ? /* @__PURE__ */ o(rt, { className: n, strokeWidth: 1.8 }) : t === "coding-harnesses" ? /* @__PURE__ */ o(lo, { className: n, strokeWidth: 1.8 }) : t === "events" ? /* @__PURE__ */ o(jt, { className: n, strokeWidth: 1.8 }) : t === "robotics" ? /* @__PURE__ */ o(co, { className: n, strokeWidth: 1.8 }) : t === "vehicle-autonomy" ? /* @__PURE__ */ o(uo, { className: n, strokeWidth: 1.8 }) : /* @__PURE__ */ o(rt, { className: n, strokeWidth: 1.8 });
}
function ji({
  attributeStats: t,
  boardView: a,
  className: n = "",
  companySortMode: r,
  companyOptions: e,
  domainStats: s,
  filterState: l,
  isOpen: d,
  onAttributeToggle: f,
  onClearAll: c,
  onClearCompanyFilter: m,
  onCompanyToggle: v,
  onCompanySortModeChange: y,
  onContentTypeChange: b,
  onDomainToggle: x,
  onReset: D,
  onSelectAll: A,
  onSignificanceDisplayLimitChange: F,
  onToggle: te,
  significanceDisplayLimit: re,
  totalMatchedCompanyCount: se,
  variant: Q = "panel",
  visibleCompanyCount: w
}) {
  var le;
  const P = l.domainIds.length + l.attributeIds.length + l.companyIds.length + (l.contentType === "all" ? 0 : 1), z = Q === "rail", k = z && !d, O = qe(), q = `${z ? d ? "w-[var(--category-expanded-width,286px)]" : "w-[74px]" : "w-full"} timeline-fluid-obstacle overflow-hidden rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${k ? "cursor-pointer hover:bg-[var(--surface-strong)]" : ""} ${n}`, Z = ({
    buttonKey: E,
    description: C,
    icon: I,
    isSelected: _,
    meta: g,
    onClick: N,
    title: W
  }) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      title: W,
      disabled: !d,
      onClick: N,
      className: `flex h-11 w-full items-center gap-2 rounded-[0.85rem] border px-2.5 text-left transition duration-300 active:scale-[0.99] ${_ ? "border-[var(--edge-strong)] bg-[var(--surface-strong)]" : "border-[var(--edge)] bg-transparent hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
      children: [
        I ?? /* @__PURE__ */ o(to, { className: "h-4 w-4 shrink-0 text-[var(--ink)]", strokeWidth: 1.8 }),
        /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ o("span", { className: "block truncate text-xs font-semibold tracking-tight text-[var(--ink)]", children: C }),
          /* @__PURE__ */ o("span", { className: "mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--muted)]", children: g })
        ] }),
        /* @__PURE__ */ o(
          "span",
          {
            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${_ ? "border-[var(--edge-strong)] bg-[var(--ink)] text-[var(--page-bg)]" : "border-[var(--edge)] text-transparent"}`,
            children: /* @__PURE__ */ o(ao, { className: "h-3 w-3", strokeWidth: 2 })
          }
        )
      ]
    },
    E
  ), H = me().sortOptions, de = ((le = H.find((E) => E.id === r)) == null ? void 0 : le.label) ?? "Significance", j = r === "significance" ? "score" : de;
  return /* @__PURE__ */ h("aside", { className: q, onClick: k ? te : void 0, children: [
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
          /* @__PURE__ */ o("span", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink)] shadow-[var(--soft-shadow)]", children: /* @__PURE__ */ o(Qr, { className: "h-4 w-4", strokeWidth: 1.8 }) }),
          d ? /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ o("span", { className: "block text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]", children: O.filterPanelLabel }),
            /* @__PURE__ */ o("span", { className: "mt-1 block truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.label }),
            /* @__PURE__ */ h("span", { className: "mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
              w,
              "/",
              se,
              " rows · sort ",
              j
            ] })
          ] }) : /* @__PURE__ */ o("span", { className: "sr-only", children: a.label }),
          /* @__PURE__ */ o(
            Jr,
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
          ge.div,
          {
            initial: !1,
            animate: { y: d ? 0 : -10 },
            transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
            className: "max-h-[min(620px,calc(100dvh-18rem))] overflow-y-auto px-3 py-3",
            children: /* @__PURE__ */ h("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start", children: [
              /* @__PURE__ */ h("div", { className: "space-y-3", children: [
                Gn().map((E) => /* @__PURE__ */ h("div", { children: [
                  /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: E.label }),
                  /* @__PURE__ */ o("div", { className: "space-y-1.5", children: E.domainIds.map((C) => {
                    const I = Bt(C);
                    if (!I)
                      return null;
                    const _ = s[C] ?? { providerCount: 0, releaseCount: 0 };
                    return Z({
                      buttonKey: I.id,
                      description: I.label,
                      icon: /* @__PURE__ */ o(Mt, { classId: I.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                      isSelected: l.domainIds.includes(C),
                      meta: `${_.providerCount}c / ${_.releaseCount}r`,
                      onClick: () => x(C),
                      title: I.description
                    });
                  }) })
                ] }, E.label)),
                /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
                  /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: O.contentTypeHeading }),
                  /* @__PURE__ */ o("div", { className: "grid grid-cols-3 gap-1.5", children: qt().map((E) => {
                    const C = l.contentType === E.id, I = E.id === "events" ? jt : E.id === "releases" ? Bn : rt;
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => b(E.id),
                        title: E.description,
                        className: `inline-flex h-9 items-center justify-center gap-1.5 rounded-[0.85rem] border px-2 text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${C ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ o(I, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
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
                      onClick: A,
                      title: O.selectAllTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(rt, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
                        O.selectAllLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: c,
                      title: O.clearFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(On, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        O.clearFiltersLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: D,
                      title: O.resetFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(Gt, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        O.resetFiltersLabel
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3 md:border-l md:border-t-0 md:py-1 md:pl-3", children: [
                /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: "Attributes" }),
                /* @__PURE__ */ o("div", { className: "space-y-1.5", children: tt().map((E) => {
                  const C = Bt(E);
                  if (!C)
                    return null;
                  const I = t[E] ?? { providerCount: 0, releaseCount: 0 };
                  return Z({
                    buttonKey: E,
                    description: C.label,
                    icon: /* @__PURE__ */ o(Mt, { classId: C.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                    isSelected: l.attributeIds.includes(E),
                    meta: `${I.providerCount}c / ${I.releaseCount}r`,
                    onClick: () => f(E),
                    title: C.description
                  });
                }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: O.companyFiltersHeading }),
                /* @__PURE__ */ o("div", { className: "max-h-44 space-y-1.5 overflow-y-auto pr-1", children: e.length > 0 ? /* @__PURE__ */ h(gt, { children: [
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: m,
                      title: O.allRelevantLabel,
                      className: `flex h-8 w-full items-center justify-between rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${l.companyIds.length === 0 ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        O.allRelevantLabel,
                        /* @__PURE__ */ h("span", { className: "font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                          e.length,
                          "c"
                        ] })
                      ]
                    }
                  ),
                  e.map((E) => {
                    const C = l.companyIds.includes(E.id);
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => v(E.id),
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
                ] }) : /* @__PURE__ */ o("div", { className: "rounded-[0.75rem] border border-[var(--edge)] px-2 py-2 text-[11px] leading-4 text-[var(--muted)]", children: O.companyFilterEmpty }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: O.sortHeading }),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5", children: H.map((E) => {
                  const C = r === E.id;
                  return /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => y(E.id),
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
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: O.displayedRowsHeading }),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-4 gap-1.5 md:grid-cols-2", children: jn().map((E) => {
                  const C = re === E, I = E === "all" ? "All" : String(E);
                  return /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => F(E),
                      className: `h-8 rounded-[0.85rem] border px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition duration-300 active:scale-[0.99] ${C ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: I
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
    /* @__PURE__ */ o(He, { initial: !1, children: !d && z ? /* @__PURE__ */ h(
      ge.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        className: "flex flex-col items-center gap-3 px-2 pb-5",
        children: [
          /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]", style: { writingMode: "vertical-rl" }, children: O.filterPanelLabel }),
          /* @__PURE__ */ o("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] font-mono text-[10px] text-[var(--ink-soft)]", children: P })
        ]
      },
      "filter-rail"
    ) : null })
  ] });
}
function Mn(t) {
  return /* @__PURE__ */ o(ji, { ...t });
}
function ht({
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
function fr({
  className: t = "",
  compact: a = !1,
  maxZoom: n,
  minZoom: r,
  onSliderActiveChange: e,
  onZoomChange: s,
  zoom: l
}) {
  const d = ne(null), f = ne(null), c = ne(null), m = ne(null), v = ne(null), [y, b] = Ee(!1), [x, D] = Ee(!1), [A, F] = Ee(!1), te = mr(l, r, n), re = 8 + (1 - te) * 84, se = a ? "h-3.5 w-3.5" : "h-4 w-4", Q = y || x || A, w = Q ? a ? "h-10 min-w-10 px-2 text-[9px]" : "h-11 min-w-11 px-2.5 text-[10px]" : a ? "h-4 min-w-4 px-0 text-[0px]" : "h-5 min-w-5 px-0 text-[0px]", P = a ? "group-hover/zoomrail:h-10 group-hover/zoomrail:min-w-10 group-hover/zoomrail:px-2 group-hover/zoomrail:text-[9px] group-focus-within/zoomrail:h-10 group-focus-within/zoomrail:min-w-10 group-focus-within/zoomrail:px-2 group-focus-within/zoomrail:text-[9px]" : "group-hover/zoomrail:h-11 group-hover/zoomrail:min-w-11 group-hover/zoomrail:px-2.5 group-hover/zoomrail:text-[10px] group-focus-within/zoomrail:h-11 group-focus-within/zoomrail:min-w-11 group-focus-within/zoomrail:px-2.5 group-focus-within/zoomrail:text-[10px]", z = y ? "text-[var(--ink)] opacity-100" : "opacity-45", k = (g, N = !1) => {
    const W = () => {
      b(g), e == null || e(g);
    };
    if (N) {
      Xn(W);
      return;
    }
    W();
  }, O = (g) => {
    const N = Number(g.currentTarget.value);
    s(() => Ea(N, r, n));
  };
  Ce(() => () => {
    var g;
    v.current !== null && window.cancelAnimationFrame(v.current), m.current = null, (g = c.current) == null || g.call(c), e == null || e(!1);
  }, [e]);
  const q = (g) => {
    var X;
    const N = (X = d.current) == null ? void 0 : X.getBoundingClientRect();
    if (!N || N.height <= 0)
      return;
    const W = ce(1 - (g - N.top) / N.height, 0, 1);
    s(() => Ea(W, r, n));
  }, Z = () => {
    v.current !== null && (window.cancelAnimationFrame(v.current), v.current = null);
    const g = m.current;
    m.current = null, g !== null && q(g);
  }, H = (g) => {
    m.current = g, v.current === null && (v.current = window.requestAnimationFrame(() => {
      v.current = null;
      const N = m.current;
      m.current = null, N !== null && q(N);
    }));
  }, de = (g) => {
    !g.isPrimary || g.button !== 0 || (f.current = g.pointerId, g.currentTarget.setPointerCapture(g.pointerId), k(!0, !0), q(g.clientY));
  }, j = (g) => {
    f.current === g.pointerId && (H(g.clientY), g.preventDefault());
  }, le = (g) => {
    f.current === g.pointerId && (Z(), g.currentTarget.hasPointerCapture(g.pointerId) && g.currentTarget.releasePointerCapture(g.pointerId), f.current = null, k(!1));
  }, E = () => {
    var g;
    Z(), (g = c.current) == null || g.call(c), c.current = null, k(!1);
  }, C = (g) => {
    var X;
    if (g.button !== 0 || f.current !== null)
      return;
    (X = c.current) == null || X.call(c), k(!0, !0), q(g.clientY);
    const N = (J) => {
      H(J.clientY), J.preventDefault();
    }, W = () => E();
    window.addEventListener("mousemove", N), window.addEventListener("mouseup", W, { once: !0 }), c.current = () => {
      window.removeEventListener("mousemove", N), window.removeEventListener("mouseup", W);
    };
  }, I = (g) => {
    const N = g.shiftKey ? fa : Ho;
    if (g.key === "ArrowUp" || g.key === "ArrowRight") {
      s((W) => Et(W, N, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "ArrowDown" || g.key === "ArrowLeft") {
      s((W) => Et(W, -N, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "PageUp") {
      s((W) => Et(W, fa, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "PageDown") {
      s((W) => Et(W, -fa, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "Home") {
      s(() => r), g.preventDefault();
      return;
    }
    g.key === "End" && (s(() => n), g.preventDefault());
  }, _ = (g) => {
    g.currentTarget.contains(g.relatedTarget) || D(!1);
  };
  return /* @__PURE__ */ h(
    "div",
    {
      "aria-label": "Timeline zoom controls",
      role: "group",
      className: `absolute z-40 flex ${a ? "min-h-[17rem] w-12 py-3" : "min-h-[22rem] w-14 py-4"} group/zoomrail select-none flex-col items-center justify-center gap-3 px-2 text-[var(--ink-soft)] transition-[opacity,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] hover:opacity-100 focus-within:text-[var(--ink)] focus-within:opacity-100 ${z} ${t}`,
      onBlur: _,
      onFocus: () => D(!0),
      onMouseEnter: () => F(!0),
      onMouseLeave: () => F(!1),
      onPointerEnter: () => F(!0),
      onPointerLeave: () => F(!1),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ o(Vi, { className: se })
          }
        ),
        /* @__PURE__ */ h(
          "label",
          {
            ref: d,
            className: `relative z-10 ${a ? "h-[12.5rem] w-8" : "h-[16rem] w-9"} cursor-ns-resize touch-none rounded-full focus-within:ring-2 focus-within:ring-[rgba(237,242,250,0.3)]`,
            onMouseDown: C,
            onPointerCancel: le,
            onPointerDown: de,
            onPointerMove: j,
            onPointerUp: le,
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
                  className: `pointer-events-none absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-center ${y ? "transition-none" : "transition-[clip-path] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
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
                  className: `absolute left-1/2 grid ${w} ${P} -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(237,242,250,0.48)] bg-[rgba(237,242,250,0.95)] font-mono font-semibold text-[#0b0e14] shadow-[0_16px_32px_-22px_rgba(0,0,0,0.78)] ${y ? "scale-[1.04] transition-none" : "transition-[top,width,height,min-width,padding,transform,box-shadow,font-size] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: { top: `${re}%` },
                  children: /* @__PURE__ */ h("span", { className: `transition-opacity duration-200 group-hover/zoomrail:opacity-100 group-focus-within/zoomrail:opacity-100 ${Q ? "opacity-100" : "opacity-0"}`, children: [
                    Math.round(l * 100),
                    "%"
                  ] })
                }
              ),
              /* @__PURE__ */ o(
                "input",
                {
                  "aria-label": "Timeline zoom",
                  "aria-orientation": "vertical",
                  "aria-valuetext": `${Math.round(l * 100)} percent`,
                  type: "range",
                  min: "0",
                  max: "1",
                  step: "0.001",
                  value: te,
                  onBlur: () => k(!1),
                  onChange: O,
                  onKeyDown: I,
                  onPointerCancel: () => k(!1),
                  onPointerDown: () => k(!0, !0),
                  onPointerUp: () => k(!1),
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
            children: /* @__PURE__ */ o(Gi, { className: se })
          }
        )
      ]
    }
  );
}
function pr({
  className: t = "",
  company: a
}) {
  return /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 items-center justify-center text-[var(--ink)] ${t}`, children: /* @__PURE__ */ o(Mt, { classId: bi(a), className: "h-[1rem] w-[1rem]" }) });
}
function qi({
  compact: t = !1,
  company: a
}) {
  const n = a.logoMark, r = n ? me().logoAssetPaths[n] : void 0, e = r && rr(n), s = e ? t ? "h-7 w-12 rounded-[0.72rem]" : "h-8 w-14 rounded-[0.82rem]" : t ? "h-7 w-7 rounded-[0.72rem]" : "h-8 w-8 rounded-[0.82rem]", l = e ? t ? "relative h-[11px] w-9 object-contain" : "relative h-3 w-11 object-contain" : t ? "relative h-[18px] w-[18px] object-contain" : "relative h-5 w-5 object-contain", d = t ? "text-[10px]" : "text-xs";
  return /* @__PURE__ */ o(
    "span",
    {
      "aria-label": `${a.name} logo`,
      className: `${s} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${r ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: `${a.name} logo`,
      children: r ? /* @__PURE__ */ o("img", { "aria-hidden": "true", alt: "", className: l, src: Na(r) }) : n ? /* @__PURE__ */ h(gt, { children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${Oe(a.accent, 0.35)}, transparent 48%)`
            }
          }
        ),
        hr(n, a.accent, d)
      ] }) : /* @__PURE__ */ o(pr, { className: t ? "h-4 w-4" : "h-5 w-5", company: a })
    }
  );
}
function hr(t, a, n) {
  const r = `relative font-semibold tracking-tight ${n}`;
  return t === "calendar" ? /* @__PURE__ */ o(jt, { className: "relative h-7 w-7 text-[var(--ink)]", strokeWidth: 1.8 }) : t === "gpt" || t === "openai" ? /* @__PURE__ */ o("span", { className: r, children: "AI" }) : t === "claude" || t === "anthropic" ? /* @__PURE__ */ o("span", { className: r, children: "C" }) : t === "cursor" ? /* @__PURE__ */ o("span", { className: r, children: "C" }) : t === "gemini" || t === "google" ? /* @__PURE__ */ o("span", { className: r, children: "G" }) : t === "deepseek" ? /* @__PURE__ */ o("span", { className: r, children: "D" }) : t === "sora" ? /* @__PURE__ */ o(Wn, { className: "relative h-4 w-4", strokeWidth: 1.8 }) : t === "figure" ? /* @__PURE__ */ o("span", { className: r, children: "F" }) : t === "tesla" ? /* @__PURE__ */ o("span", { className: r, children: "T" }) : t === "xai" ? /* @__PURE__ */ o("span", { className: r, children: "x" }) : /* @__PURE__ */ o("span", { className: r, style: { color: a }, children: "AI" });
}
function Ki(t) {
  return t === "square" ? "rounded-[5px]" : t === "diamond" ? "rotate-45 rounded-[4px]" : "rounded-full";
}
function Nn(t) {
  return t.classId !== "events";
}
function Zi(t, a) {
  const n = t[a];
  if (!n || !Nn(n))
    return null;
  const r = t.findIndex(Nn);
  if (r < 0 || r === a)
    return null;
  const e = t[r];
  return e ? {
    productLine: e,
    productLineIndex: r
  } : null;
}
function Qi({
  primaryLine: t,
  productLine: a,
  timelineStartDay: n
}) {
  var s;
  if (t.releases.length === 0 || a.releases.length === 0)
    return null;
  const r = ((s = t.releases[0]) == null ? void 0 : s.globalDay) ?? 0, e = a.releases.find((l) => l.globalDay >= r) ?? a.releases[0];
  return ze(e.globalDay, n);
}
function Ji({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onModelSelect: l,
  productLine: d,
  productLineIndex: f,
  renderWindow: c,
  timelineStartDay: m,
  verticalScale: v = 1
}) {
  const y = Aa(a, v), b = d.classId === "coding-harnesses", x = li(n.accent, Do, 0.34), D = Ki(d.markerShape), A = a ? "h-3.5 w-3.5" : "h-4 w-4", F = a ? "absolute left-3 top-0 origin-bottom-left -translate-y-1 -rotate-[22deg]" : "absolute left-4 top-0 origin-bottom-left -translate-y-2 -rotate-[28deg] transition duration-300 group-hover:-translate-y-3", te = a ? "timeline-map-screen-label whitespace-nowrap rounded-[0.7rem] border px-1.5 py-0.5 font-bold tracking-[0.01em] shadow-[var(--soft-shadow)] backdrop-blur-sm" : "timeline-map-screen-label whitespace-nowrap rounded-[0.8rem] border bg-[var(--surface-strong)] px-2 py-1 font-bold tracking-[0.015em] shadow-[var(--soft-shadow)] backdrop-blur-sm group-hover:bg-[var(--surface)]", re = a ? 10 : 12, se = Zi(n.productLines, f), Q = se ? Qi({
    primaryLine: se.productLine,
    productLine: d,
    timelineStartDay: m
  }) ?? 0 : 0;
  return /* @__PURE__ */ h(
    ge.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: Zn },
      transition: {
        opacity: $e
      },
      className: "relative z-10 shrink-0 hover:z-40 focus-within:z-40",
      style: { height: `${y}px` },
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "absolute right-0 top-1/2 h-px -translate-y-1/2 bg-[var(--track-line)]",
            style: { left: `${Q}px` }
          }
        ),
        /* @__PURE__ */ o("div", { className: "pointer-events-none absolute left-2 top-1/2 z-10 -translate-y-1/2", children: /* @__PURE__ */ h(
          "span",
          {
            className: "timeline-map-label inline-flex items-center gap-1.5 rounded-full border bg-[rgba(10,13,19,0.88)] px-2 py-1 font-mono uppercase tracking-[0.13em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)] backdrop-blur-sm",
            style: {
              borderColor: Oe(n.accent, 0.28),
              ...We(a ? 8 : 9)
            },
            children: [
              /* @__PURE__ */ o(Mt, { classId: d.classId, className: a ? "h-3 w-3" : "h-3.5 w-3.5" }),
              d.shortLabel
            ]
          }
        ) }),
        /* @__PURE__ */ o(He, { initial: !1, mode: "popLayout", children: d.releases.map((w, P) => {
          var ue, ee;
          const z = d.releases[P - 1], k = t === w.articleSlug, O = k || Ft(w.globalDay, w.endGlobalDay, c), q = !!z && Ft((z == null ? void 0 : z.globalDay) ?? w.globalDay, w.globalDay, c), Z = w.endGlobalDay > w.globalDay && Ft(w.globalDay, w.endGlobalDay, c);
          if (!O && !q && !Z)
            return null;
          const H = ze(w.globalDay, m), de = z ? ze(z.globalDay, m) : H, j = z ? Math.max(0, H - de) : 0, le = z ? Ai(w.gap, d.averageGap) : null, E = Wt(w.globalDay, w.endGlobalDay), C = ((ue = d.latestRelease) == null ? void 0 : ue.name) === w.name && ((ee = d.latestRelease) == null ? void 0 : ee.date) === w.date, I = C ? xa(n.accent, 255, 0.12) : xa(n.accent, 255, 0.24), _ = Oe(n.accent, C ? 0.52 : 0.34), g = w.tags.includes("landmark-release"), N = C ? Oe(n.accent, 0.12) : g ? Oe(n.accent, 0.08) : void 0, X = w.eventKind === "event" ? "Open event" : "Open release", J = k ? `0 0 0 ${a ? 3 : 4}px rgba(237, 242, 250, 0.92), 0 0 0 ${a ? 7 : 8}px color-mix(in srgb, ${n.accent} 48%, transparent)` : g ? `0 0 0 ${a ? 5 : 6}px color-mix(in srgb, ${n.accent} 24%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 50%, transparent), 0 0 42px color-mix(in srgb, ${n.accent} 28%, transparent)` : C ? `0 0 0 ${a ? 4 : 5}px color-mix(in srgb, ${n.accent} 20%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 40%, transparent)` : `0 0 0 4px color-mix(in srgb, ${n.accent} 11%, transparent)`, K = k ? "saturate(1.45) brightness(1.14)" : g ? "saturate(1.38) brightness(1.1)" : C ? "saturate(1.35) brightness(1.08)" : void 0;
          return /* @__PURE__ */ h(
            ge.div,
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
                z && q ? /* @__PURE__ */ h(gt, { children: [
                  /* @__PURE__ */ o(
                    ge.div,
                    {
                      initial: { opacity: 0, scaleX: 0 },
                      animate: { opacity: b ? 0.72 : 0.58, scaleX: 1 },
                      transition: $e,
                      className: `pointer-events-none absolute top-1/2 -translate-y-1/2 origin-left ${b ? "h-px" : "h-[2px]"}`,
                      style: {
                        backgroundColor: b ? x : n.accent,
                        left: `${de}px`,
                        width: `${j}px`
                      }
                    }
                  ),
                  /* @__PURE__ */ o(
                    "div",
                    {
                      className: "timeline-gap absolute top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50",
                      style: {
                        left: `${de + j / 2}px`,
                        "--gap-world-width": j
                      },
                      children: /* @__PURE__ */ h(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Gap of ${ba(w.gap)} between ${z.name} and ${w.name}`,
                          onPointerDown: (G) => G.stopPropagation(),
                          onClick: (G) => G.stopPropagation(),
                          className: "group/gap relative flex h-6 cursor-default items-center justify-center outline-none",
                          children: [
                            /* @__PURE__ */ h(
                              "span",
                              {
                                className: "timeline-gap-collapse timeline-gap-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2 py-1 font-mono uppercase tracking-[0.1em] text-[var(--ink)] shadow-[var(--soft-shadow)] group-focus-visible/gap:border-[var(--edge-strong)]",
                                style: We(a ? 9 : 10),
                                children: [
                                  w.gap,
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
                                    z.name,
                                    " → ",
                                    w.name
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: [
                                    ba(w.gap),
                                    " gap"
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                    z.dateLabel,
                                    " – ",
                                    w.dateLabel
                                  ] }),
                                  le ? /* @__PURE__ */ o("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: le }) : null
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ] }) : null,
                Z ? /* @__PURE__ */ o(
                  ge.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: C ? 0.72 : 0.54, scaleX: 1 },
                    transition: $e,
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
                O ? /* @__PURE__ */ o(
                  ge.div,
                  {
                    initial: { opacity: 0, scale: 0.82, y: a ? 6 : 8 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.82, y: a ? 6 : 8 },
                    transition: {
                      opacity: $e,
                      scale: $e,
                      y: $e
                    },
                    className: `absolute top-1/2 -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50 ${k ? "z-30" : "z-20"}`,
                    style: { left: `${H}px` },
                    children: /* @__PURE__ */ o("div", { className: "overflow-visible", children: /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        "data-timeline-pin": !0,
                        "aria-current": k ? "page" : void 0,
                        "aria-label": `${X} for ${w.name}, ${w.dateRangeLabel}`,
                        onClick: (G) => {
                          G.stopPropagation(), l(w.articleSlug);
                        },
                        onPointerDown: (G) => G.stopPropagation(),
                        className: `group relative block size-0 overflow-visible cursor-pointer text-left outline-none ${k ? "timeline-pin--selected" : ""}`,
                        children: [
                          /* @__PURE__ */ h("div", { className: "timeline-pin-marker-stack relative z-0 size-0 shrink-0", children: [
                            g ? /* @__PURE__ */ o(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: `${a ? "h-8 w-8" : "h-10 w-10"} timeline-pin-landmark-aura absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ${D}`,
                                style: { "--pin-accent": n.accent }
                              }
                            ) : null,
                            k ? /* @__PURE__ */ o(
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
                                className: `${A} timeline-pin-marker absolute left-0 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 border-[3px] border-[var(--surface-strong)] transition duration-300 ${D} ${k ? "timeline-pin-marker--selected scale-[1.18]" : "group-hover:scale-[1.22] group-focus-visible:scale-[1.22]"}`,
                                style: {
                                  backgroundColor: n.accent,
                                  boxShadow: J,
                                  filter: K
                                }
                              }
                            )
                          ] }),
                          /* @__PURE__ */ o("div", { className: `${F} z-[2]`, children: /* @__PURE__ */ o(
                            "div",
                            {
                              className: `${te} ${k ? "timeline-pin-label--selected" : ""}`,
                              style: {
                                backgroundColor: k ? "var(--surface-strong)" : N,
                                borderColor: k ? Oe(n.accent, 0.88) : _,
                                borderWidth: k ? 2 : void 0,
                                color: k ? xa(n.accent, 255, 0.06) : I,
                                boxShadow: k ? `0 0 0 1px color-mix(in srgb, ${n.accent} 55%, transparent)` : void 0,
                                textShadow: k ? "0 1px 14px rgba(0, 0, 0, 0.62)" : C ? "0 1px 12px rgba(0, 0, 0, 0.5)" : "0 1px 10px rgba(0, 0, 0, 0.38)",
                                filter: k ? "saturate(1.28)" : C ? "saturate(1.18)" : void 0,
                                ...We(re)
                              },
                              children: w.name
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
                                /* @__PURE__ */ o("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: w.name }),
                                /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                  w.eventTypeLabel,
                                  " · ",
                                  w.dateRangeLabel
                                ] }),
                                z ? /* @__PURE__ */ h("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: [
                                  ba(w.gap),
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
            w.articleSlug
          );
        }) }),
        d.latestRelease && e > d.latestRelease.endGlobalDay && Ft(d.latestRelease.endGlobalDay, e, c) ? /* @__PURE__ */ h(gt, { children: [
          /* @__PURE__ */ o(
            ge.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: b ? 0.48 : 0.42, scaleX: 1 },
              transition: $e,
              className: `absolute top-1/2 origin-left -translate-y-1/2 ${b ? "h-px" : "quiet-extension-flow h-[2px]"}`,
              style: {
                backgroundColor: b ? x : void 0,
                left: `${ze(d.latestRelease.endGlobalDay, m)}px`,
                "--quiet-flow-duration": `${a ? 5.4 : 6.4}s`,
                "--quiet-line-color": n.accent,
                width: `${Wt(d.latestRelease.endGlobalDay, e)}px`
              }
            }
          ),
          /* @__PURE__ */ o(
            "div",
            {
              className: "absolute top-1/2 z-0 -translate-y-1/2 pl-3",
              style: { left: `${ze(e, m)}px` },
              children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ h(
                "div",
                {
                  className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1 font-mono uppercase tracking-[0.14em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                  style: We(a ? 9 : 10),
                  children: [
                    "+",
                    Sa(d, e),
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
const es = Nt.memo(Ji);
function ts({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onCompanyBlur: l,
  onCompanyFocus: d,
  onModelSelect: f,
  renderWindow: c,
  timelineStartDay: m,
  verticalScale: v = 1
}) {
  const { lineGap: y } = ka(n.productLines.length, a, v), b = () => d == null ? void 0 : d(n.id), x = () => l == null ? void 0 : l();
  return /* @__PURE__ */ o(
    ge.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: Zn },
      transition: {
        opacity: $e
      },
      className: "relative flex flex-col justify-center",
      onClick: (D) => {
        const A = D.target;
        A instanceof Element && A.closest("button, a, input, label, select, textarea, [data-row-focus-label]") || b();
      },
      onMouseEnter: b,
      onMouseLeave: x,
      onPointerEnter: (D) => {
        D.pointerType !== "touch" && b();
      },
      onPointerLeave: (D) => {
        D.pointerType !== "touch" && x();
      },
      style: { height: `${Ia(n, a, v)}px`, gap: `${y}px` },
      children: /* @__PURE__ */ o(He, { initial: !1, mode: "popLayout", children: n.productLines.map((D, A) => /* @__PURE__ */ o(
        es,
        {
          activeArticleSlug: t,
          compact: a,
          company: n,
          companyIndex: r,
          currentGlobalDay: e,
          maxDays: s,
          onModelSelect: f,
          productLine: D,
          productLineIndex: A,
          renderWindow: c,
          timelineStartDay: m,
          verticalScale: v
        },
        `${n.id}-${D.id}`
      )) })
    }
  );
}
function Dn(t, a) {
  return a ? t.productLines.some(
    (n) => n.releases.some((r) => r.articleSlug === a)
  ) : !1;
}
const gr = Nt.memo(
  ts,
  (t, a) => {
    const n = Dn(t.company, t.activeArticleSlug), r = Dn(a.company, a.activeArticleSlug);
    return t.compact === a.compact && t.company === a.company && t.companyIndex === a.companyIndex && t.currentGlobalDay === a.currentGlobalDay && t.maxDays === a.maxDays && t.timelineStartDay === a.timelineStartDay && t.verticalScale === a.verticalScale && Ci(t.renderWindow, a.renderWindow) && n === r && (!n || t.activeArticleSlug === a.activeArticleSlug);
  }
);
function as({
  compact: t = !1,
  company: a,
  currentGlobalDay: n,
  index: r,
  maxSummaryQuietDays: e
}) {
  var c, m;
  const s = qe(), l = Sa(a, n), d = Ri(l, e), f = a.productLines.length > 1;
  return /* @__PURE__ */ h(
    ge.div,
    {
      layout: !0,
      initial: { opacity: 0, y: t ? 12 : 14 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: t ? 12 : 14 },
      transition: {
        layout: No,
        opacity: $e,
        y: $e
      },
      className: "rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] p-4",
      children: [
        /* @__PURE__ */ h("div", { className: "min-w-0", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ o(pr, { className: "h-7 w-7", company: a }),
            /* @__PURE__ */ h("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ o("p", { className: "truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.name }),
              /* @__PURE__ */ h("p", { className: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: [
                s.significanceLabel,
                " ",
                a.significanceScore
              ] })
            ] })
          ] }),
          f ? /* @__PURE__ */ o("div", { className: "mt-3 space-y-2", children: a.productLines.map((v) => {
            var y;
            return /* @__PURE__ */ h("div", { className: "min-w-0 rounded-[0.85rem] border border-[var(--edge)] bg-[rgba(255,255,255,0.02)] px-3 py-2", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center gap-2 text-xs font-semibold tracking-tight text-[var(--ink)]", children: [
                  /* @__PURE__ */ o(Mt, { classId: v.classId, className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ o("span", { className: "truncate", children: v.shortLabel })
                ] }),
                /* @__PURE__ */ o("span", { className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]", children: v.significanceScore })
              ] }),
              /* @__PURE__ */ o("p", { className: "mt-1 truncate text-sm text-[var(--ink-soft)]", children: ((y = v.latestRelease) == null ? void 0 : y.name) ?? "No releases" })
            ] }, `${a.id}-${v.id}-summary-line`);
          }) }) : /* @__PURE__ */ h(gt, { children: [
            /* @__PURE__ */ o("p", { className: "mt-3 text-base font-semibold tracking-tight text-[var(--ink)]", children: Si(l) }),
            /* @__PURE__ */ h("div", { className: "mt-2 min-w-0", children: [
              /* @__PURE__ */ o("p", { className: "truncate text-sm text-[var(--ink-soft)]", children: ((c = a.latestRelease) == null ? void 0 : c.name) ?? "No releases" }),
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
const vr = Nt.memo(as);
function ns(t) {
  const a = t.companyLogoMark === "openai" ? "gpt" : t.companyLogoMark === "google" ? "gemini" : t.companyLogoMark === "anthropic" ? "claude" : t.companyLogoMark;
  return {
    modelLabel: t.name,
    modelMark: a
  };
}
function Cn({
  accent: t,
  label: a,
  mark: n,
  size: r
}) {
  const e = r === "large", s = me().logoAssetPaths[n], l = s && rr(n), d = l ? e ? "h-16 w-28 rounded-[1.25rem]" : "h-11 w-20 rounded-[0.95rem]" : e ? "h-16 w-16 rounded-[1.25rem]" : "h-11 w-11 rounded-[0.95rem]", f = l ? e ? "relative h-5 w-20 object-contain" : "relative h-3 w-14 object-contain" : e ? "relative h-10 w-10 object-contain" : "relative h-7 w-7 object-contain", c = e ? "text-lg" : "text-sm", m = n === "calendar" ? `${a} event icon` : `${a} logo`;
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
              background: `radial-gradient(circle at 28% 24%, ${Oe(t, 0.35)}, transparent 48%)`
            }
          }
        ),
        s ? /* @__PURE__ */ o("img", { "aria-hidden": "true", alt: "", className: f, src: Na(s) }) : hr(n, t, c)
      ]
    }
  );
}
function Rn({
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
          /* @__PURE__ */ o(eo, { className: "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5", strokeWidth: 1.8 })
        ] })
      ]
    }
  );
}
function rs({ media: t }) {
  const [a, n] = Ee(!1);
  return a ? null : /* @__PURE__ */ h("figure", { className: "mt-7 overflow-hidden rounded-[1.25rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)]", children: [
    /* @__PURE__ */ o(
      "img",
      {
        src: Na(t.src),
        alt: t.alt,
        className: "w-full bg-black object-contain",
        loading: "lazy",
        onError: () => n(!0)
      }
    ),
    t.caption ? /* @__PURE__ */ o("figcaption", { className: "border-t border-[var(--edge)] px-4 py-3 text-xs leading-5 text-[var(--ink-soft)]", children: t.caption }) : null
  ] });
}
const Sn = 640, An = 448, xr = 96, os = 4096, kn = 8, In = 5200, Ln = 16, _n = 190, Pn = 0.07;
function is(t) {
  let a = 2166136261;
  for (let n = 0; n < t.length; n += 1)
    a ^= t.charCodeAt(n), a = Math.imul(a, 16777619);
  return a >>> 0;
}
function ss(t) {
  let a = t || 1;
  return () => {
    a = a + 1831565813 | 0;
    let n = Math.imul(a ^ a >>> 15, 1 | a);
    return n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n, ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function ls(t) {
  const a = t.replace("#", ""), n = a.length === 3 ? a.split("").map((e) => e + e).join("") : a, r = Number.parseInt(n, 16);
  return !Number.isFinite(r) || n.length !== 6 ? [125, 145, 175] : [r >> 16 & 255, r >> 8 & 255, r & 255];
}
function Tt(t, a, n) {
  return [
    t[0] + (a[0] - t[0]) * n,
    t[1] + (a[1] - t[1]) * n,
    t[2] + (a[2] - t[2]) * n
  ];
}
const Fn = [
  [-0.295, 0.62],
  [0.31, 0.42],
  [-1.04, 0.25],
  [-0.78, 0.18]
], $n = [
  [0.5667, -0.5],
  [0.5, -0.55],
  [0.6, -0.45]
];
function cs(t) {
  const a = ss(is(t)), n = Math.floor(a() * 4), r = a() * Math.PI * 2, e = 0.768 + a() * 0.034;
  let s = Math.cos(r) * e, l = Math.sin(r) * e, d = 0;
  if (n === 2) {
    const f = Fn[Math.floor(a() * Fn.length)];
    s = f[0] + (a() - 0.5) * 0.05, l = f[1] + (a() - 0.5) * 0.05;
  } else if (n === 3) {
    const f = $n[Math.floor(a() * $n.length)];
    s = f[0] + (a() - 0.5) * 0.03, d = f[1] + (a() - 0.5) * 0.03, l = 0;
  }
  return {
    variant: n,
    cRe: s,
    cIm: l,
    phoenixRe: d,
    zoom: 0.52 + a() * 0.33,
    rotation: a() * Math.PI * 2,
    centerX: (a() - 0.5) * 0.3,
    centerY: (a() - 0.5) * 0.3
  };
}
function ds(t, a, n) {
  let r = a, e = n, s = 0, l = 0;
  for (let d = 0; d < xr; d += 1) {
    const f = r * r + e * e;
    if (f > os)
      return d + 1 - Math.log(Math.log(f) * 0.5) / Math.LN2;
    let c, m;
    if (t.variant === 1) {
      const v = Math.abs(r);
      c = v * v - e * e + t.cRe, m = 2 * v * e + t.cIm;
    } else t.variant === 2 ? (c = r * r - e * e + t.cRe, m = -2 * r * e + t.cIm) : t.variant === 3 ? (c = r * r - e * e + t.cRe + t.phoenixRe * s, m = 2 * r * e + t.phoenixRe * l) : (c = r * r - e * e + t.cRe, m = 2 * r * e + t.cIm);
    s = r, l = e, r = c, e = m;
  }
  return -1;
}
function us({ accent: t, seedKey: a }) {
  const n = ne(null);
  return Ce(() => {
    const r = n.current, e = r == null ? void 0 : r.getContext("2d");
    if (!r || !e)
      return;
    const s = cs(a), l = ls(t), d = [8, 11, 16], f = [
      { at: 0, rgb: d },
      { at: 0.38, rgb: Tt(d, l, 0.45) },
      { at: 0.62, rgb: l },
      { at: 0.86, rgb: Tt(l, [235, 240, 248], 0.55) },
      { at: 1, rgb: [240, 244, 250] }
    ], c = (X) => {
      for (let J = 1; J < f.length; J += 1)
        if (X <= f[J].at) {
          const K = f[J - 1], ue = f[J], ee = (X - K.at) / (ue.at - K.at);
          return Tt(K.rgb, ue.rgb, ee);
        }
      return f[f.length - 1].rgb;
    }, m = Sn, v = An, y = m * v;
    e.clearRect(0, 0, m, v), e.imageSmoothingEnabled = !0, e.imageSmoothingQuality = "high";
    const b = Math.cos(s.rotation), x = Math.sin(s.rotation), D = m / v, A = Tt(d, l, 0.28), F = Tt(l, [240, 244, 250], 0.7), te = (X) => {
      if (X < 0)
        return 1;
      const J = Math.min(
        1,
        Math.max(0, Math.log(1 + X) / Math.log(1 + xr))
      );
      return Math.pow(J, 1.1);
    }, re = (X, J, K, ue) => {
      const ee = ((J + 0.5) / ue * 2 - 1) / s.zoom, G = ((X + 0.5) / K * 2 - 1) * D / s.zoom, Y = G * b - ee * x + s.centerX, V = G * x + ee * b + s.centerY, ie = ds(s, Y, V);
      return {
        interior: ie < 0,
        shaped: te(ie)
      };
    }, se = Math.ceil(m / kn), Q = Math.ceil(v / kn), w = document.createElement("canvas");
    w.width = se, w.height = Q;
    const P = w.getContext("2d"), z = document.createElement("canvas");
    z.width = m, z.height = v;
    const k = z.getContext("2d");
    if (!P || !k)
      return;
    const O = P.createImageData(se, Q), q = k.createImageData(m, v), Z = new Uint8ClampedArray(y * 3), H = new Uint8ClampedArray(y), de = new Float32Array(y), j = (X) => X < 0.5 ? 4 * X * X * X : 1 - Math.pow(-2 * X + 2, 3) / 2;
    let le = !1, E = 0, C = "base", I = 0, _ = 0, g = 0, N = 0;
    const W = () => {
      if (le)
        return;
      if (C === "base") {
        const ee = Math.max(1, Math.floor(In / se)), G = Math.min(I + ee, Q);
        for (let Y = I; Y < G; Y += 1)
          for (let V = 0; V < se; V += 1) {
            const ie = re(V, Y, se, Q), fe = (Y * se + V) * 4, be = ie.interior ? A : c(ie.shaped);
            O.data[fe] = be[0], O.data[fe + 1] = be[1], O.data[fe + 2] = be[2], O.data[fe + 3] = ie.interior ? 150 : Math.round(30 + ie.shaped * 225);
          }
        I = G, I >= Q && (P.putImageData(O, 0, 0), C = "baseFade"), E = window.requestAnimationFrame(W);
        return;
      }
      if (C === "baseFade") {
        _ += 1, e.clearRect(0, 0, m, v), e.globalAlpha = _ / Ln, e.drawImage(w, 0, 0, m, v), e.globalAlpha = 1, _ >= Ln && (C = "full"), E = window.requestAnimationFrame(W);
        return;
      }
      if (C === "full") {
        const ee = Math.max(1, Math.floor(In / m)), G = Math.min(g + ee, v);
        for (let Y = g; Y < G; Y += 1)
          for (let V = 0; V < m; V += 1) {
            const ie = re(V, Y, m, v), fe = Y * m + V, be = ie.interior ? A : c(ie.shaped);
            Z[fe * 3] = be[0], Z[fe * 3 + 1] = be[1], Z[fe * 3 + 2] = be[2], H[fe] = ie.interior ? 150 : Math.round(30 + ie.shaped * 225), de[fe] = ie.shaped;
          }
        g = G, g >= v && (C = "reveal"), E = window.requestAnimationFrame(W);
        return;
      }
      N += 1;
      const X = Math.min(1, N / _n), J = j(X) * (1 + Pn * 2), K = q.data;
      for (let ee = 0; ee < y; ee += 1) {
        const G = (J - de[ee]) / Pn, Y = G <= 0 ? 0 : G >= 1 ? 1 : G, V = Y * (1 - Y) * 2, ie = ee * 4;
        K[ie] = Z[ee * 3] + (F[0] - Z[ee * 3]) * V, K[ie + 1] = Z[ee * 3 + 1] + (F[1] - Z[ee * 3 + 1]) * V, K[ie + 2] = Z[ee * 3 + 2] + (F[2] - Z[ee * 3 + 2]) * V, K[ie + 3] = H[ee] * Y + V * 70;
      }
      k.putImageData(q, 0, 0), e.clearRect(0, 0, m, v);
      const ue = 1 - j(X);
      ue > 3e-3 && (e.globalAlpha = ue, e.drawImage(w, 0, 0, m, v), e.globalAlpha = 1), e.drawImage(z, 0, 0), N < _n && (E = window.requestAnimationFrame(W));
    };
    return E = window.requestAnimationFrame(W), () => {
      le = !0, window.cancelAnimationFrame(E);
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
          width: Sn,
          height: An,
          className: "h-full w-full object-cover opacity-75 blur-[1px]"
        }
      )
    }
  );
}
function ms({
  entry: t,
  onBack: a,
  onNavigate: n,
  requestedSlug: r
}) {
  const e = qe(), s = (t == null ? void 0 : t.article) ?? null, l = t ? t.eventKind === "event" ? {
    modelLabel: t.name,
    modelMark: "calendar"
  } : (s == null ? void 0 : s.logo) ?? ns(t) : null, d = (s == null ? void 0 : s.title) ?? (t == null ? void 0 : t.name) ?? e.routeMissingTitle, f = (s == null ? void 0 : s.summary) ?? (t ? `${t.name} is tracked as a ${t.eventTypeLabel.toLowerCase()} from ${t.companyName} in the ${t.productLineLabel} line.` : e.routeMissingDetail.replace("{slug}", r));
  return /* @__PURE__ */ h(
    ge.aside,
    {
      initial: { opacity: 0, x: 72 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 72 },
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      className: "fixed inset-y-0 right-0 z-40 w-full overflow-y-auto border-l border-[var(--edge-strong)] bg-[rgba(8,11,16,0.98)] shadow-[0_34px_100px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl md:w-[min(760px,58vw)]",
      children: [
        t ? /* @__PURE__ */ o(us, { accent: t.accent, seedKey: r }) : null,
        /* @__PURE__ */ h("article", { className: "min-h-full px-5 py-5 md:px-8 md:py-8", children: [
          /* @__PURE__ */ h("div", { className: "sticky top-0 z-20 -mx-5 flex items-center justify-between gap-3 border-b border-[var(--edge)] bg-[rgba(8,11,16,0.94)] px-5 py-4 shadow-[0_18px_34px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl md:static md:mx-0 md:border-b-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none", children: [
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                onClick: a,
                className: "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                children: [
                  /* @__PURE__ */ o(jr, { className: "h-4 w-4", strokeWidth: 1.8 }),
                  e.articleBackLabel
                ]
              }
            ),
            t ? /* @__PURE__ */ h("span", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: [
              /* @__PURE__ */ o(jt, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
              t.dateRangeLabel
            ] }) : null
          ] }),
          t && l ? /* @__PURE__ */ h("div", { className: "mt-9 flex items-start gap-4", children: [
            /* @__PURE__ */ o(Cn, { accent: t.accent, label: l.modelLabel, mark: l.modelMark, size: "large" }),
            /* @__PURE__ */ o(Cn, { accent: t.accent, label: t.companyName, mark: t.companyLogoMark, size: "small" })
          ] }) : null,
          /* @__PURE__ */ o("p", { className: "mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: (s == null ? void 0 : s.eyebrow) ?? (t == null ? void 0 : t.eventTypeLabel) ?? "Unknown route" }),
          /* @__PURE__ */ o("h1", { className: "mt-3 max-w-[12ch] text-4xl leading-none tracking-tighter text-[var(--ink)] md:text-6xl", children: d }),
          /* @__PURE__ */ o("p", { className: "mt-5 max-w-[68ch] text-base leading-8 text-[var(--ink-soft)] md:text-lg", children: (s == null ? void 0 : s.dek) ?? f }),
          s != null && s.media ? /* @__PURE__ */ o(rs, { media: s.media }) : null,
          t ? /* @__PURE__ */ o("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: ((s == null ? void 0 : s.facts) ?? [
            { label: "Company", value: t.companyName },
            { label: "Product line", value: t.productLineLabel },
            { label: t.eventKind === "event" ? "Event date" : "Release date", value: t.dateRangeLabel },
            { label: "Type", value: t.eventTypeLabel }
          ]).map((c) => /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
            /* @__PURE__ */ o("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: c.label }),
            /* @__PURE__ */ o("p", { className: "mt-1 text-sm font-semibold text-[var(--ink)]", children: c.value })
          ] }, `${c.label}-${c.value}`)) }) : null,
          /* @__PURE__ */ h("section", { className: "mt-9 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ h("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
              /* @__PURE__ */ o(Bn, { className: "h-4 w-4", strokeWidth: 1.8 }),
              "Summary"
            ] }),
            /* @__PURE__ */ o("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: f }),
            s != null && s.impact ? /* @__PURE__ */ o("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: s.impact }) : null
          ] }),
          s == null ? void 0 : s.sections.map((c) => /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ o("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: c.heading }),
            /* @__PURE__ */ o("div", { className: "mt-4 space-y-4", children: c.body.map((m) => /* @__PURE__ */ o("p", { className: "text-base leading-8 text-[var(--ink-soft)]", children: m }, m)) })
          ] }, c.heading)),
          s != null && s.sources.length ? /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ o("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: "Sources" }),
            /* @__PURE__ */ o("div", { className: "mt-4 space-y-2", children: s.sources.map((c) => /* @__PURE__ */ h(
              "a",
              {
                href: c.url,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]",
                children: [
                  /* @__PURE__ */ o("span", { children: c.label }),
                  /* @__PURE__ */ o(qr, { className: "h-4 w-4 shrink-0", strokeWidth: 1.8 })
                ]
              },
              c.url
            )) })
          ] }) : null,
          t ? /* @__PURE__ */ h("div", { className: "mt-8 grid gap-3 border-t border-[var(--edge)] pt-7 sm:grid-cols-2", children: [
            /* @__PURE__ */ o(Rn, { label: "Previous", onNavigate: n, slug: t.previousSlug, title: t.previousName }),
            /* @__PURE__ */ o(Rn, { label: "Next", onNavigate: n, slug: t.nextSlug, title: t.nextName })
          ] }) : /* @__PURE__ */ o("div", { className: "mt-8 rounded-[1.1rem] border border-[var(--edge)] bg-[var(--surface)] p-5", children: /* @__PURE__ */ o("p", { className: "text-sm leading-6 text-[var(--ink-soft)]", children: "This route does not match a known model or event entry." }) })
        ] })
      ]
    },
    "model-article-panel"
  );
}
function Un({
  detail: t,
  title: a
}) {
  const n = qe();
  return /* @__PURE__ */ o("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ o("div", { className: "mx-auto flex min-h-[100dvh] max-w-[880px] items-center px-5 py-10 md:px-8", children: /* @__PURE__ */ h("div", { className: "rounded-[2rem] border border-[var(--edge)] bg-[var(--surface)] p-8 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]", children: n.statusEyebrow }),
    /* @__PURE__ */ o("h1", { className: "mt-4 text-4xl tracking-tighter text-[var(--ink)]", children: a }),
    /* @__PURE__ */ o("p", { className: "mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--ink-soft)]", children: t })
  ] }) }) });
}
const fs = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`, ps = `
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
`, hs = `
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
`, gs = `
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
`, vs = `
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
`, xs = `
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
`, bs = `
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
`, ys = `
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
`, ws = `
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
function Ts() {
  const t = ne(null), a = ne(!1), n = ne(!1);
  return Ce(() => {
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
    const s = (R, M) => {
      const $ = e.createShader(R);
      return $ ? (e.shaderSource($, M), e.compileShader($), e.getShaderParameter($, e.COMPILE_STATUS) ? $ : (console.warn(e.getShaderInfoLog($)), e.deleteShader($), null)) : null;
    }, l = (R) => {
      const M = s(e.VERTEX_SHADER, fs), $ = s(e.FRAGMENT_SHADER, R);
      if (!M || !$)
        return M && e.deleteShader(M), $ && e.deleteShader($), null;
      const S = e.createProgram();
      return S ? (e.attachShader(S, M), e.attachShader(S, $), e.linkProgram(S), e.deleteShader(M), e.deleteShader($), e.getProgramParameter(S, e.LINK_STATUS) ? S : (console.warn(e.getProgramInfoLog(S)), e.deleteProgram(S), null)) : (e.deleteShader(M), e.deleteShader($), null);
    }, d = l(ws), f = l(ps), c = l(hs), m = l(gs), v = l(vs), y = l(xs), b = l(bs), x = l(ys), D = () => {
      [d, f, c, m, v, y, b, x].forEach((R) => {
        R && e.deleteProgram(R);
      });
    };
    if (!d || !f || !c || !m || !v || !y || !b || !x) {
      D();
      return;
    }
    const A = e.createBuffer();
    if (!A) {
      D();
      return;
    }
    e.bindBuffer(e.ARRAY_BUFFER, A), e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      e.STATIC_DRAW
    );
    const F = (R) => {
      const M = e.getAttribLocation(R, "aPosition");
      M < 0 || (e.bindBuffer(e.ARRAY_BUFFER, A), e.enableVertexAttribArray(M), e.vertexAttribPointer(M, 2, e.FLOAT, !1, 0, 0));
    }, te = {
      resolution: e.getUniformLocation(d, "uResolution"),
      fluidTexel: e.getUniformLocation(d, "uFluidTexel"),
      widgetRect: e.getUniformLocation(d, "uWidgetRect"),
      elapsedTime: e.getUniformLocation(d, "uElapsedTime"),
      emitterDebug: e.getUniformLocation(d, "uEmitterDebug"),
      emitterSeed: e.getUniformLocation(d, "uEmitterSeed"),
      velocityMap: e.getUniformLocation(d, "uVelocityMap"),
      dyeMap: e.getUniformLocation(d, "uDyeMap")
    }, re = {
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
    }, se = {
      velocityMap: e.getUniformLocation(c, "uVelocityMap"),
      texel: e.getUniformLocation(c, "uTexel"),
      aspect: e.getUniformLocation(c, "uAspect")
    }, Q = {
      velocityMap: e.getUniformLocation(m, "uVelocityMap"),
      curlMap: e.getUniformLocation(m, "uCurlMap"),
      texel: e.getUniformLocation(m, "uTexel"),
      deltaTime: e.getUniformLocation(m, "uDeltaTime"),
      strength: e.getUniformLocation(m, "uStrength"),
      aspect: e.getUniformLocation(m, "uAspect")
    }, w = {
      velocityMap: e.getUniformLocation(v, "uVelocityMap"),
      texel: e.getUniformLocation(v, "uTexel"),
      obstacleRect: e.getUniformLocation(v, "uObstacleRect"),
      aspect: e.getUniformLocation(v, "uAspect")
    }, P = {
      pressureMap: e.getUniformLocation(y, "uPressureMap"),
      divergenceMap: e.getUniformLocation(y, "uDivergenceMap"),
      texel: e.getUniformLocation(y, "uTexel"),
      obstacleRect: e.getUniformLocation(y, "uObstacleRect"),
      aspect: e.getUniformLocation(y, "uAspect")
    }, z = {
      velocityMap: e.getUniformLocation(b, "uVelocityMap"),
      pressureMap: e.getUniformLocation(b, "uPressureMap"),
      texel: e.getUniformLocation(b, "uTexel"),
      obstacleRect: e.getUniformLocation(b, "uObstacleRect"),
      aspect: e.getUniformLocation(b, "uAspect")
    }, k = {
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
    }, O = (R) => {
      const M = e.createTexture(), $ = e.createFramebuffer();
      if (!M || !$)
        return M && e.deleteTexture(M), $ && e.deleteFramebuffer($), !1;
      e.bindTexture(e.TEXTURE_2D, M), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, R, null), e.bindFramebuffer(e.FRAMEBUFFER, $), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, M, 0);
      const S = e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE;
      return e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(M), e.deleteFramebuffer($), S;
    }, Z = (() => {
      const R = e.getExtension("OES_texture_half_float"), M = e.getExtension("OES_texture_half_float_linear");
      if (e.getExtension("EXT_color_buffer_half_float"), R && M && O(R.HALF_FLOAT_OES))
        return {
          filter: e.LINEAR,
          type: R.HALF_FLOAT_OES
        };
      const $ = e.getExtension("OES_texture_float"), S = e.getExtension("OES_texture_float_linear");
      return e.getExtension("WEBGL_color_buffer_float"), $ && S && O(e.FLOAT) ? {
        filter: e.LINEAR,
        type: e.FLOAT
      } : {
        filter: e.LINEAR,
        type: e.UNSIGNED_BYTE
      };
    })(), H = (R, M, $) => {
      const S = e.createTexture(), oe = e.createFramebuffer();
      return !S || !oe ? (S && e.deleteTexture(S), oe && e.deleteFramebuffer(oe), null) : (e.bindTexture(e.TEXTURE_2D, S), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, Z.filter), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, Z.filter), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, R, M, 0, e.RGBA, Z.type, null), e.bindFramebuffer(e.FRAMEBUFFER, oe), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, S, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(S), e.deleteFramebuffer(oe), null) : (e.viewport(0, 0, R, M), e.clearColor($[0], $[1], $[2], $[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null), { framebuffer: oe, height: M, texture: S, width: R }));
    }, de = (R, M) => {
      e.bindFramebuffer(e.FRAMEBUFFER, R.framebuffer), e.viewport(0, 0, R.width, R.height), e.clearColor(M[0], M[1], M[2], M[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null);
    }, j = (R) => {
      e.deleteFramebuffer(R.framebuffer), e.deleteTexture(R.texture);
    }, le = () => {
      const R = Math.min(window.devicePixelRatio || 1, 1.3), M = Math.max(120, Math.min(340, Math.floor(window.innerWidth * R / 5))), $ = Math.max(80, Math.min(220, Math.floor(window.innerHeight * R / 5)));
      return [M, $];
    };
    let E = 0, C = !1, I = null, _ = null, g = null, N = null, W = null, X = 0, J = 0, K = 0;
    const ue = performance.now(), ee = window.matchMedia("(prefers-reduced-motion: reduce)"), G = [-1, -1, -1, -1];
    let Y = [0.5, 0.5], V = [0, 0], ie = 0, fe = null, be = ue;
    const B = () => {
      const [R, M] = le();
      if ((I == null ? void 0 : I[0].width) === R && I[0].height === M)
        return !0;
      I == null || I.forEach(j), _ == null || _.forEach(j), g == null || g.forEach(j), N && j(N), W && j(W);
      const $ = [
        H(R, M, [0.5, 0.5, 0, 1]),
        H(R, M, [0.5, 0.5, 0, 1])
      ], S = [
        H(R, M, [0.5, 0, 0, 1]),
        H(R, M, [0.5, 0, 0, 1])
      ], oe = [
        H(R, M, [0, 0, 0, 0]),
        H(R, M, [0, 0, 0, 0])
      ], Pe = H(R, M, [0.5, 0, 0, 1]), Se = H(R, M, [0.5, 0, 0, 1]), Xe = [...$, ...S, ...oe, Pe, Se];
      return Xe.some((Fe) => !Fe) ? (Xe.forEach((Fe) => {
        Fe && j(Fe);
      }), I = null, _ = null, g = null, N = null, W = null, !1) : (I = $, _ = S, g = oe, N = Pe, W = Se, X = 0, J = 0, K = 0, !0);
    };
    let ve = ue;
    const Ke = 0.5, xe = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ], _e = () => {
      const M = Math.max(1, Math.floor(window.innerWidth * 1)), $ = Math.max(1, Math.floor(window.innerHeight * 1));
      (r.width !== M || r.height !== $) && (r.width = M, r.height = $, e.viewport(0, 0, M, $)), e.useProgram(d), e.uniform2f(te.resolution, M, $), B();
    }, L = (R) => {
      const M = R * 60;
      ie *= Math.pow(0.9, M), V = [
        V[0] * Math.pow(0.94, M),
        V[1] * Math.pow(0.94, M)
      ];
    }, Ze = (R) => {
      if (!a.current || R.pointerType === "touch")
        return;
      const M = Math.max(window.innerWidth, 1), $ = Math.max(window.innerHeight, 1), S = [
        Math.max(0, Math.min(1, R.clientX / M)),
        Math.max(0, Math.min(1, 1 - R.clientY / $))
      ], oe = performance.now(), Pe = Math.max((oe - be) / 1e3, 1 / 120);
      if (fe) {
        const Se = [
          Math.max(-7.5, Math.min(7.5, (S[0] - fe[0]) / Pe)),
          Math.max(-7.5, Math.min(7.5, (S[1] - fe[1]) / Pe))
        ];
        V = [
          V[0] + (Se[0] - V[0]) * 0.74,
          V[1] + (Se[1] - V[1]) * 0.74
        ];
      }
      Y = S, fe = S, be = oe, ie = Math.min(1, ie + 0.92), ee.matches && Ue(oe);
    }, it = () => {
      const R = Math.max(window.innerWidth, 1), M = Math.max(window.innerHeight, 1), S = Array.from(document.querySelectorAll(".timeline-fluid-obstacle")).find((Pe) => {
        const Se = Pe.getBoundingClientRect(), Xe = window.getComputedStyle(Pe);
        return Xe.display !== "none" && Xe.visibility !== "hidden" && Se.width > 1 && Se.height > 1 && Se.bottom > 0 && Se.top < M && Se.right > 0 && Se.left < R;
      });
      if (!S)
        return [-1, -1, -1, -1];
      const oe = S.getBoundingClientRect();
      return [
        Math.max(0, Math.min(1, oe.left / R)),
        Math.max(0, Math.min(1, 1 - oe.bottom / M)),
        Math.max(0, Math.min(1, oe.right / R)),
        Math.max(0, Math.min(1, 1 - oe.top / M))
      ];
    }, ye = (R, M) => {
      if (!I || !_ || !g || !N || !W)
        return;
      const $ = r.width / Math.max(r.height, 1);
      let S = I[X], oe = I[1 - X];
      const Pe = g[K];
      e.bindFramebuffer(e.FRAMEBUFFER, oe.framebuffer), e.viewport(0, 0, oe.width, oe.height), e.useProgram(f), F(f), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Pe.texture), e.uniform1i(re.velocityMap, 0), e.uniform1i(re.dyeMap, 1), e.uniform2f(re.texel, 1 / S.width, 1 / S.height), e.uniform2f(re.pointerPosition, Y[0], Y[1]), e.uniform2f(re.pointerVelocity, V[0], V[1]), e.uniform1f(re.pointerActive, a.current ? ie : 0), e.uniform1f(re.pointerRadius, 0.088), e.uniform1f(re.deltaTime, R), e.uniform1f(re.elapsedTime, M), e.uniform1f(re.aspect, $), e.uniform4f(re.emitterSeed, xe[0], xe[1], xe[2], xe[3]), e.drawArrays(e.TRIANGLES, 0, 6), X = 1 - X, S = I[X], e.bindFramebuffer(e.FRAMEBUFFER, W.framebuffer), e.viewport(0, 0, W.width, W.height), e.useProgram(c), F(c), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.uniform1i(se.velocityMap, 0), e.uniform2f(se.texel, 1 / S.width, 1 / S.height), e.uniform1f(se.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), oe = I[1 - X], e.bindFramebuffer(e.FRAMEBUFFER, oe.framebuffer), e.viewport(0, 0, oe.width, oe.height), e.useProgram(m), F(m), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, W.texture), e.uniform1i(Q.velocityMap, 0), e.uniform1i(Q.curlMap, 1), e.uniform2f(Q.texel, 1 / S.width, 1 / S.height), e.uniform1f(Q.deltaTime, R * 0.25), e.uniform1f(Q.strength, 13), e.uniform1f(Q.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), X = 1 - X, S = I[X], e.bindFramebuffer(e.FRAMEBUFFER, N.framebuffer), e.viewport(0, 0, N.width, N.height), e.useProgram(v), F(v), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.uniform1i(w.velocityMap, 0), e.uniform2f(w.texel, 1 / S.width, 1 / S.height), e.uniform4f(w.obstacleRect, G[0], G[1], G[2], G[3]), e.uniform1f(w.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), _.forEach((Fe) => de(Fe, [0.5, 0, 0, 1])), J = 0;
      for (let Fe = 0; Fe < 12; Fe += 1) {
        const pe = _[J], Qe = _[1 - J];
        e.bindFramebuffer(e.FRAMEBUFFER, Qe.framebuffer), e.viewport(0, 0, Qe.width, Qe.height), e.useProgram(y), F(y), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, pe.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, N.texture), e.uniform1i(P.pressureMap, 0), e.uniform1i(P.divergenceMap, 1), e.uniform2f(P.texel, 1 / pe.width, 1 / pe.height), e.uniform4f(P.obstacleRect, G[0], G[1], G[2], G[3]), e.uniform1f(P.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), J = 1 - J;
      }
      oe = I[1 - X], e.bindFramebuffer(e.FRAMEBUFFER, oe.framebuffer), e.viewport(0, 0, oe.width, oe.height), e.useProgram(b), F(b), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, _[J].texture), e.uniform1i(z.velocityMap, 0), e.uniform1i(z.pressureMap, 1), e.uniform2f(z.texel, 1 / S.width, 1 / S.height), e.uniform4f(z.obstacleRect, G[0], G[1], G[2], G[3]), e.uniform1f(z.aspect, $), e.drawArrays(e.TRIANGLES, 0, 6), X = 1 - X, S = I[X];
      const Se = g[K], Xe = g[1 - K];
      e.bindFramebuffer(e.FRAMEBUFFER, Xe.framebuffer), e.viewport(0, 0, Xe.width, Xe.height), e.useProgram(x), F(x), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Se.texture), e.uniform1i(k.velocityMap, 0), e.uniform1i(k.dyeMap, 1), e.uniform2f(k.pointerPosition, Y[0], Y[1]), e.uniform2f(k.pointerVelocity, V[0], V[1]), e.uniform1f(k.pointerActive, a.current ? ie : 0), e.uniform1f(k.pointerRadius, 0.088), e.uniform1f(k.deltaTime, R), e.uniform1f(k.elapsedTime, M), e.uniform1f(k.aspect, $), e.uniform4f(k.emitterSeed, xe[0], xe[1], xe[2], xe[3]), e.drawArrays(e.TRIANGLES, 0, 6), K = 1 - K;
    }, Re = (R) => {
      if (!I || !g)
        return;
      const M = I[X], $ = g[K];
      e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, r.width, r.height), e.useProgram(d), F(d), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, M.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, $.texture), e.uniform1i(te.velocityMap, 0), e.uniform1i(te.dyeMap, 1), e.uniform2f(te.resolution, r.width, r.height), e.uniform2f(te.fluidTexel, 1 / M.width, 1 / M.height);
      const S = it();
      e.uniform4f(te.widgetRect, S[0], S[1], S[2], S[3]), e.uniform1f(te.elapsedTime, R), e.uniform1f(te.emitterDebug, n.current ? 1 : 0), e.uniform4f(te.emitterSeed, xe[0], xe[1], xe[2], xe[3]), e.drawArrays(e.TRIANGLES, 0, 6);
    }, Ue = (R) => {
      _e();
      const M = Math.min(Math.max((R - ve) / 1e3, 1 / 120), 1 / 20);
      ve = R;
      const $ = (R - ue) / 1e3, S = M * Ke, oe = $ * Ke;
      L(M), ye(S, oe), Re(oe);
    }, ea = (R) => {
      C || (E = window.requestAnimationFrame(ea), !document.hidden && Ue(R));
    }, ke = () => {
      C || (_e(), Ue(ue + 1e3), ee.matches || (E = window.requestAnimationFrame(ea)));
    };
    return window.addEventListener("resize", _e), window.addEventListener("pointermove", Ze, { passive: !0 }), ke(), () => {
      C = !0, window.cancelAnimationFrame(E), window.removeEventListener("resize", _e), window.removeEventListener("pointermove", Ze), I == null || I.forEach(j), _ == null || _.forEach(j), g == null || g.forEach(j), N && j(N), W && j(W), e.deleteBuffer(A), D();
    };
  }, []), /* @__PURE__ */ h(gt, { children: [
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
function br({
  boardView: t,
  hiddenCompanyCount: a,
  onShowHiddenCompanies: n
}) {
  const r = a > 0, e = qe();
  return /* @__PURE__ */ o("div", { className: "flex min-h-[18rem] items-center justify-center px-6 py-14", children: /* @__PURE__ */ h("div", { className: "max-w-[34rem] text-center", children: [
    /* @__PURE__ */ o("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink-soft)]", children: /* @__PURE__ */ o(rt, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ o("p", { className: "mt-5 text-lg font-semibold tracking-tight text-[var(--ink)]", children: r ? `All visible ${e.groupPluralLabel} are hidden` : `${t.label} has no releases yet` }),
    /* @__PURE__ */ o("p", { className: "mt-2 text-sm leading-6 text-[var(--ink-soft)]", children: r ? `Show hidden ${e.groupPluralLabel} or turn on another product line to repopulate the timeline.` : e.emptyBoardDescription }),
    r ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        onClick: n,
        className: "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
        children: [
          /* @__PURE__ */ o(Gt, { className: "h-4 w-4", strokeWidth: 1.8 }),
          e.showHiddenLabel
        ]
      }
    ) : null
  ] }) });
}
function Es() {
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
function yr({
  activeCompanyId: t,
  compact: a = !1,
  onCompanyBlur: n,
  onCompanyFocus: r,
  onCompanyTap: e,
  railWidth: s,
  rowLayouts: l,
  timelineWidth: d
}) {
  return /* @__PURE__ */ o("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 z-[6]", children: l.map((f) => {
    const c = t === f.company.id;
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
            className: `absolute inset-x-0 top-1/2 h-[calc(100%+1.25rem)] -translate-y-1/2 border-y transition duration-200 ${c ? "opacity-100" : "opacity-0"}`,
            style: {
              background: `linear-gradient(90deg, ${Oe(f.company.accent, a ? 0.16 : 0.12)}, transparent 42%, ${Oe(
                f.company.accent,
                0.08
              )})`,
              borderColor: Oe(f.company.accent, a ? 0.28 : 0.22)
            }
          }
        )
      },
      `${f.company.id}-${a ? "mobile" : "desktop"}-focus-band`
    );
  }) });
}
function wr({
  compact: t = !1,
  onClearFocus: a,
  onCompanyHide: n,
  onCompanyMove: r,
  onPointerEnter: e,
  onPointerLeave: s,
  row: l,
  rowCount: d,
  screenX: f,
  screenY: c
}) {
  const m = l.company, v = m.latestRelease, y = v ? v.name : "No releases", b = m.productLines.map((D) => D.shortLabel).join(" / "), x = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[rgba(255,255,255,0.035)] text-[var(--ink-soft)] transition duration-200 hover:border-[var(--edge-strong)] hover:bg-[rgba(255,255,255,0.075)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-30";
  return /* @__PURE__ */ o(
    "div",
    {
      "data-row-focus-label": !0,
      className: "pointer-events-none absolute z-30 will-change-transform",
      style: {
        transform: `translate3d(${f}px, ${c}px, 0) translateY(-50%)`
      },
      children: /* @__PURE__ */ h(
        ge.div,
        {
          initial: { opacity: 0, scale: 0.96, x: -8 },
          animate: { opacity: 1, scale: 1, x: 0 },
          exit: { opacity: 0, scale: 0.96, x: -8 },
          transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
          className: `pointer-events-auto rounded-[1.15rem] border border-[var(--edge-strong)] bg-[rgba(8,11,16,0.92)] shadow-[0_22px_48px_-30px_rgba(0,0,0,0.88)] backdrop-blur-xl ${t ? "w-[min(15.5rem,calc(100vw-8rem))] p-3" : "w-[18rem] p-3.5"}`,
          onMouseEnter: e,
          onMouseLeave: s,
          onPointerDown: (D) => D.stopPropagation(),
          onPointerEnter: e,
          onPointerLeave: s,
          children: [
            /* @__PURE__ */ h("div", { className: "flex min-w-0 items-start gap-3", children: [
              /* @__PURE__ */ o(qi, { compact: t, company: m }),
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
                /* @__PURE__ */ o("p", { className: "mt-1 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: b }),
                /* @__PURE__ */ o("p", { className: "mt-2 truncate text-xs font-medium text-[var(--ink-soft)]", children: y })
              ] })
            ] }),
            /* @__PURE__ */ h("div", { className: "mt-3 flex items-center justify-between gap-2 border-t border-[var(--edge)] pt-2.5", children: [
              /* @__PURE__ */ h("span", { className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: [
                "Score ",
                m.significanceScore,
                " · Row ",
                l.index + 1,
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
                    disabled: l.index === 0,
                    onClick: (D) => {
                      D.stopPropagation(), r(m.id, "up");
                    },
                    children: /* @__PURE__ */ o(Kr, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${m.name} down`,
                    title: `Move ${m.name} down`,
                    className: x,
                    disabled: l.index === d - 1,
                    onClick: (D) => {
                      D.stopPropagation(), r(m.id, "down");
                    },
                    children: /* @__PURE__ */ o(Zr, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Hide ${m.name}`,
                    title: `Hide ${m.name}`,
                    className: x,
                    onClick: (D) => {
                      D.stopPropagation(), n(m.id), a();
                    },
                    children: /* @__PURE__ */ o(On, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
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
function Ms({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handlePointerDown: e,
  handlePointerMove: s,
  hiddenCompanyCount: l,
  handleZoomChange: d,
  isPanning: f,
  latestCompany: c,
  maxDays: m,
  minZoom: v,
  maxZoom: y,
  maxSummaryQuietDays: b,
  modelExplorer: x,
  monthTicks: D,
  onCompanyHide: A,
  onCompanyMove: F,
  onDismissArticle: te,
  onModelSelect: re,
  onResetCamera: se,
  onShowHiddenCompanies: Q,
  onToggleTimelineGrid: w,
  processedCompanies: P,
  renderWindow: z,
  scrollContainerRef: k,
  showTimelineGrid: O,
  stopPanning: q,
  summaryCompanies: Z,
  timelineStartDay: H,
  timelineWidth: de,
  viewport: j,
  worldRef: le,
  yearTicks: E,
  zoom: C
}) {
  var _e;
  const _ = ot(!1, 1), g = Ht(P, !1, 1), N = Vt({
    currentGlobalDay: r,
    maxDays: m,
    summaryCount: Z.length,
    timelineStartDay: H,
    timelineHeight: g,
    timelineWidth: de,
    viewport: j
  }), W = Dt(P, !1, 1, _), [X, J] = Ee(null), K = ne(null), ue = () => {
    K.current !== null && (window.clearTimeout(K.current), K.current = null);
  }, ee = (L) => {
    ue(), J(L);
  }, G = () => {
    ue(), J(null);
  }, Y = () => {
    ue(), K.current = window.setTimeout(() => {
      J(null), K.current = null;
    }, 120);
  };
  Ce(() => () => ue(), []);
  const V = W.find((L) => L.company.id === X) ?? null, fe = ce(116, 16, Math.max(16, j.width - 288 - 16)), be = V ? ce(
    (N.timelineY + V.y + V.height / 2 - n.y) * C,
    82,
    Math.max(82, j.height - 84)
  ) : 0, B = qe(), ve = a.isDefault ? B.defaultBoardDescription : a.isEmpty ? B.emptyBoardDetail : a.isComposite ? B.compositeBoardDescription(a.label) : B.singleBoardDescription(a.label), Ke = N.timelineX + H * Ae, xe = de + mt;
  return /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ o("div", { className: "absolute left-5 top-5 z-40 [--category-expanded-width:40rem]", children: x }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: k,
        className: `absolute inset-0 overflow-hidden [overflow-anchor:none] ${f ? "cursor-grabbing" : "cursor-grab"}`,
        onClickCapture: (L) => te(L.target, { clientX: L.clientX, clientY: L.clientY }),
        onPointerDown: e,
        onPointerMove: s,
        onPointerUp: q,
        onPointerCancel: q,
        onLostPointerCapture: q,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: le,
            className: "relative",
            style: {
              height: `${N.worldHeight}px`,
              transform: Pa(n, C),
              transformOrigin: "0 0",
              width: `${N.worldWidth}px`,
              "--map-zoom": String(_a(C))
            },
            children: [
              /* @__PURE__ */ h(
                ge.div,
                {
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
                    /* @__PURE__ */ o("p", { className: "mt-5 max-w-[68ch] text-base leading-7 text-[var(--ink-soft)]", children: ve })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                ge.div,
                {
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
                ge.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${g}px`,
                    left: `${Ke}px`,
                    top: `${N.timelineY}px`,
                    width: `${xe}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ o(
                      yr,
                      {
                        activeCompanyId: X,
                        onCompanyBlur: Y,
                        onCompanyFocus: ee,
                        onCompanyTap: ee,
                        railWidth: mt,
                        rowLayouts: W,
                        timelineWidth: de
                      }
                    ),
                    P.length === 0 ? /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-[320px] right-0 top-0 z-20 flex items-center justify-center px-6", children: /* @__PURE__ */ o(
                      br,
                      {
                        boardView: a,
                        hiddenCompanyCount: l,
                        onShowHiddenCompanies: Q
                      }
                    ) }) : null,
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${xe}px` },
                        children: /* @__PURE__ */ o("div", { style: { paddingLeft: `${mt}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${de}px`, minHeight: `${g}px` },
                            children: [
                              O ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                D.map((L) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${ze(L.days, H)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-10 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.18em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: We(10),
                                        children: L.label
                                      }
                                    ) }) })
                                  },
                                  `month-${L.days}`
                                )),
                                E.map((L) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${ze(L.days, H)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-2 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1.5 font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: We(11),
                                        children: L.label
                                      }
                                    ) }) })
                                  },
                                  `year-${L.label}`
                                )),
                                /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${ze(r, H)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-2 font-semibold uppercase tracking-[0.18em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: We(11),
                                        children: B.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              P.length > 0 ? /* @__PURE__ */ o(
                                ge.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${_.companyGap}px`,
                                    paddingBottom: `${_.bottomPadding}px`,
                                    paddingTop: `${_.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ o(He, { initial: !1, mode: "popLayout", children: P.map((L, Ze) => /* @__PURE__ */ o(
                                    gr,
                                    {
                                      activeArticleSlug: t,
                                      company: L,
                                      companyIndex: Ze,
                                      currentGlobalDay: r,
                                      maxDays: m,
                                      onCompanyBlur: Y,
                                      onCompanyFocus: ee,
                                      onModelSelect: re,
                                      renderWindow: z,
                                      timelineStartDay: H,
                                      verticalScale: 1
                                    },
                                    L.id
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
                ge.div,
                {
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
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: (c == null ? void 0 : c.name) ?? B.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: ((_e = c == null ? void 0 : c.latestRelease) == null ? void 0 : _e.name) ?? B.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ o("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: B.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                ge.div,
                {
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
                    /* @__PURE__ */ o("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: /* @__PURE__ */ o(He, { initial: !1, mode: "popLayout", children: Z.map((L, Ze) => /* @__PURE__ */ o(
                      vr,
                      {
                        company: L,
                        currentGlobalDay: r,
                        index: Ze,
                        maxSummaryQuietDays: b
                      },
                      L.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ o(He, { children: V ? /* @__PURE__ */ o(Nt.Fragment, { children: /* @__PURE__ */ o(
      wr,
      {
        onClearFocus: G,
        onCompanyHide: A,
        onCompanyMove: F,
        onPointerEnter: ue,
        onPointerLeave: Y,
        row: V,
        rowCount: W.length,
        screenX: fe,
        screenY: be
      }
    ) }, `${V.company.id}-desktop-focus-label`) : null }),
    /* @__PURE__ */ o(
      fr,
      {
        className: "right-5 top-1/2 -translate-y-1/2",
        maxZoom: y,
        minZoom: v,
        onZoomChange: d,
        zoom: C
      }
    ),
    /* @__PURE__ */ h("div", { className: "absolute right-6 top-[calc(50%+12.5rem)] z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        ht,
        {
          label: O ? B.timelineGridHideLabel : B.timelineGridShowLabel,
          onClick: w,
          pressed: O,
          children: [
            O ? /* @__PURE__ */ o(Yn, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ o(zn, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ o("span", { children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(ht, { label: B.resetCameraLabel, onClick: se, children: [
        /* @__PURE__ */ o(Gt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { children: "Reset" })
      ] }),
      l > 0 ? /* @__PURE__ */ h(ht, { label: B.showHiddenLabel, onClick: Q, children: [
        /* @__PURE__ */ o(rt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { children: B.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function Ns({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handleTouchEnd: e,
  handleTouchMove: s,
  handleTouchStart: l,
  handleZoomChange: d,
  hiddenCompanyCount: f,
  latestCompany: c,
  minZoom: m,
  maxZoom: v,
  maxDays: y,
  maxSummaryQuietDays: b,
  modelExplorer: x,
  monthTicks: D,
  onCompanyHide: A,
  onCompanyMove: F,
  onDismissArticle: te,
  onModelSelect: re,
  onResetCamera: se,
  onShowHiddenCompanies: Q,
  onToggleTimelineGrid: w,
  processedCompanies: P,
  renderWindow: z,
  scrollContainerRef: k,
  showTimelineGrid: O,
  timelineStartDay: q,
  timelineWidth: Z,
  viewport: H,
  worldRef: de,
  yearTicks: j,
  zoom: le
}) {
  var be;
  const C = ot(!0, 1), I = Ht(P, !0, 1), _ = Vt({
    compact: !0,
    currentGlobalDay: r,
    maxDays: y,
    summaryCount: P.length,
    timelineStartDay: q,
    timelineHeight: I,
    timelineWidth: Z,
    viewport: H
  }), g = Dt(P, !0, 1, C), [N, W] = Ee(null), X = (B) => W(B), J = () => W(null), K = g.find((B) => B.company.id === N) ?? null, ee = Math.max(16, Math.min(126, Math.max(16, H.width - 248 - 12))), G = K ? ce(
    (_.timelineY + K.y + K.height / 2 - n.y) * le,
    98,
    Math.max(98, H.height - 104)
  ) : 0, Y = qe(), V = a.isDefault ? Y.defaultBoardDescription : a.isEmpty ? Y.emptyBoardDetail : a.isComposite ? Y.compositeBoardDescriptionMobile(a.label) : Y.singleBoardDescriptionMobile(a.label), ie = _.timelineX + q * Ae, fe = Z + ft;
  return /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ o("div", { className: "absolute left-3 top-3 z-40 [--category-expanded-width:min(20rem,calc(100vw-5rem))]", children: x }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: k,
        className: "absolute inset-0 touch-none overflow-hidden [overflow-anchor:none]",
        onClickCapture: (B) => te(B.target, { clientX: B.clientX, clientY: B.clientY }),
        onClick: (B) => {
          const ve = B.target;
          ve instanceof Element && (ve.closest("[data-row-focus-band], [data-row-focus-label], button, a, input, label, select, textarea") || J());
        },
        onTouchCancel: e,
        onTouchEnd: e,
        onTouchMove: s,
        onTouchStart: l,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: de,
            className: "relative",
            style: {
              height: `${_.worldHeight}px`,
              transform: Pa(n, le),
              transformOrigin: "0 0",
              width: `${_.worldWidth}px`,
              "--map-zoom": String(_a(le))
            },
            children: [
              /* @__PURE__ */ h(
                ge.div,
                {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.7rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.86)] p-5 shadow-[var(--panel-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${_.contentCards.intro.x}px`,
                    top: `${_.contentCards.intro.y}px`,
                    width: `${_.contentCards.intro.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ o("h1", { className: "mt-3 max-w-sm text-[2.25rem] leading-none tracking-tighter text-[var(--ink)]", children: Y.primaryHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-4 text-sm leading-6 text-[var(--ink-soft)]", children: V })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                ge.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.25rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.78)] p-4 shadow-[var(--soft-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${_.contentCards.notes.x}px`,
                    top: `${_.contentCards.notes.y}px`,
                    width: `${_.contentCards.notes.width}px`,
                    "--border-sheen-delay": "2.8s"
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: Y.timelineNotesHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-3 text-xs leading-5 text-[var(--ink-soft)]", children: Y.timelineInteractionNoteMobile })
                  ]
                }
              ),
              /* @__PURE__ */ o(
                ge.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${I}px`,
                    left: `${ie}px`,
                    top: `${_.timelineY}px`,
                    width: `${fe}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ o(
                      yr,
                      {
                        activeCompanyId: N,
                        compact: !0,
                        onCompanyFocus: X,
                        onCompanyTap: X,
                        railWidth: ft,
                        rowLayouts: g,
                        timelineWidth: Z
                      }
                    ),
                    P.length === 0 ? /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-[196px] right-0 top-0 z-20 flex items-center justify-center px-3", children: /* @__PURE__ */ o(
                      br,
                      {
                        boardView: a,
                        hiddenCompanyCount: f,
                        onShowHiddenCompanies: Q
                      }
                    ) }) : null,
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${fe}px` },
                        children: /* @__PURE__ */ o("div", { style: { paddingLeft: `${ft}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${Z}px`, minHeight: `${I}px` },
                            children: [
                              O ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                D.map((B) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${ze(B.days, q)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-9 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.16em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: We(9),
                                        children: B.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-month-${B.days}`
                                )),
                                j.map((B) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${ze(B.days, q)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1 font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: We(10),
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
                                    style: { left: `${ze(r, q)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1.5 font-semibold uppercase tracking-[0.16em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: We(10),
                                        children: Y.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              P.length > 0 ? /* @__PURE__ */ o(
                                ge.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${C.companyGap}px`,
                                    paddingBottom: `${C.bottomPadding}px`,
                                    paddingTop: `${C.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ o(He, { initial: !1, mode: "popLayout", children: P.map((B, ve) => /* @__PURE__ */ o(
                                    gr,
                                    {
                                      activeArticleSlug: t,
                                      compact: !0,
                                      company: B,
                                      companyIndex: ve,
                                      currentGlobalDay: r,
                                      maxDays: y,
                                      onCompanyFocus: X,
                                      onModelSelect: re,
                                      renderWindow: z,
                                      timelineStartDay: q,
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
                ge.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${_.contentCards.latest.x}px`,
                    top: `${_.contentCards.latest.y}px`,
                    width: `${_.contentCards.latest.width}px`
                  },
                  children: [
                    /* @__PURE__ */ h("p", { className: "text-xs leading-5 text-[var(--ink-soft)]", children: [
                      Y.latestMobileLabel,
                      ": ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: (c == null ? void 0 : c.name) ?? Y.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: ((be = c == null ? void 0 : c.latestRelease) == null ? void 0 : be.name) ?? Y.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ o("p", { className: "mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: Y.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                ge.div,
                {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.68, delay: 0.24, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${_.contentCards.summaries.x}px`,
                    top: `${_.contentCards.summaries.y}px`,
                    width: `${_.contentCards.summaries.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]", children: Y.recencyHeading }),
                    /* @__PURE__ */ o("div", { className: "grid gap-3 sm:grid-cols-2", children: /* @__PURE__ */ o(He, { initial: !1, mode: "popLayout", children: P.map((B, ve) => /* @__PURE__ */ o(
                      vr,
                      {
                        compact: !0,
                        company: B,
                        currentGlobalDay: r,
                        index: ve,
                        maxSummaryQuietDays: b
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
    /* @__PURE__ */ o(He, { children: K ? /* @__PURE__ */ o(Nt.Fragment, { children: /* @__PURE__ */ o(
      wr,
      {
        compact: !0,
        onClearFocus: J,
        onCompanyHide: A,
        onCompanyMove: F,
        row: K,
        rowCount: g.length,
        screenX: ee,
        screenY: G
      }
    ) }, `${K.company.id}-mobile-focus-label`) : null }),
    /* @__PURE__ */ o(
      fr,
      {
        compact: !0,
        className: "right-1 top-1/2 -translate-y-1/2",
        maxZoom: v,
        minZoom: m,
        onZoomChange: d,
        zoom: le
      }
    ),
    /* @__PURE__ */ h("div", { className: "absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        ht,
        {
          label: O ? Y.timelineGridHideLabel : Y.timelineGridShowLabel,
          onClick: w,
          pressed: O,
          children: [
            O ? /* @__PURE__ */ o(Yn, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ o(zn, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ o("span", { className: "sr-only", children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(ht, { label: Y.resetCameraLabel, onClick: se, children: [
        /* @__PURE__ */ o(Gt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: "Reset" })
      ] }),
      f > 0 ? /* @__PURE__ */ h(ht, { label: Y.showHiddenLabel, onClick: Q, children: [
        /* @__PURE__ */ o(rt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: Y.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function Ls({ definition: t }) {
  po(t);
  const [a, n] = Ee(() => ai()), [r, e] = Ee(() => ni()), [s, l] = Ee(
    () => ri()
  ), [d, f] = Ee(!1), [c, m] = Ee(
    () => typeof window > "u" ? !0 : window.matchMedia("(min-width: 768px)").matches
  ), [v, y] = Ee(Yt), [b, x] = Ee(zt), [D, A] = Ee(!1), [F, te] = Ee(!1), [re, se] = Ee(!0), [Q, w] = Ee([]), [P, z] = Ee(() => Ye().map((i) => i.id)), [k, O] = Ee({ x: 0, y: 0 }), [q, Z] = Ee({ x: 0, y: 0 }), [H, de] = Ee(() => ti()), j = ne(Yt), le = ne(zt), E = ne({ x: 0, y: 0 }), C = ne({ x: 0, y: 0 }), I = ne({
    frameId: null,
    lastFrameAt: null,
    stiffness: lt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: Yt
    },
    zoomAnchor: null
  }), _ = ne({
    frameId: null,
    lastFrameAt: null,
    stiffness: lt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: zt
    },
    zoomAnchor: null
  }), g = ne(null), N = ne(null), W = ne(null), X = ne(null), J = ne(null), K = ne(null), ue = ne(null), ee = ne(null), G = ne(!1), Y = ne(!1), V = ne(null), ie = ne(null), fe = ne(!1), be = ne(null), B = ne(() => {
  }), ve = ne(null), Ke = ne(null), xe = ne({
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0
  });
  ne(/* @__PURE__ */ new Map());
  const _e = ne(null), [L, Ze] = Ee({
    desktop: { height: 0, width: 0 },
    mobile: { height: 0, width: 0 }
  }), it = qe(), ye = H.kind === "model" ? H.slug : null, Re = ye ? me().articleIndexBySlug[ye] ?? null : null, Ue = H.kind === "model", ke = (Te(() => /* @__PURE__ */ new Date(), []).getTime() - at().getTime()) / nt, R = Te(() => fi(a), [a]), M = Te(
    () => Jt(Ye(), a),
    [a]
  ), $ = Te(
    () => wi(M, P, Q, r, ke),
    [P, r, ke, Q, M]
  ), S = Te(
    () => Ti($, s, Re == null ? void 0 : Re.companyId),
    [Re == null ? void 0 : Re.companyId, $, s]
  ), oe = Te(
    () => S.map((i) => i.id),
    [S]
  ), Pe = Te(() => {
    const i = new Set(Q);
    return M.filter((u) => i.has(u.id)).length;
  }, [Q, M]), Se = Te(() => gi(Ye(), a), [a]), Xe = Te(() => vi(Ye(), a), [a]), Fe = Te(() => xi(Ye(), a), [a]), pe = Te(
    () => Ni(S, ke),
    [ke, S]
  ), Qe = Math.max(Math.ceil(ke) + 36, pe.latestGlobalDay + 36, 720), $a = Math.max(Qe * Ae, 1), xt = En(L.desktop.width, mt, $a), Ct = En(L.mobile.width, ft, $a), Ua = yn({
    camera: k,
    minimumDays: Qe,
    viewport: L.desktop,
    zoom: v
  }), Xa = yn({
    camera: q,
    compact: !0,
    minimumDays: Qe,
    viewport: L.mobile,
    zoom: b
  }), Rt = Ua.endDay, St = Ua.startDay, At = Xa.endDay, kt = Xa.startDay, ta = Math.max(Wt(St, Rt), 1), aa = Math.max(
    Wt(kt, At),
    1
  ), Tr = Te(
    () => bn({
      camera: k,
      viewport: L.desktop,
      zoom: v
    }),
    [k, L.desktop, v]
  ), Er = Te(
    () => bn({
      camera: q,
      compact: !0,
      viewport: L.mobile,
      zoom: b
    }),
    [q, b, L.mobile]
  ), na = 1, ra = 1, It = Ht(pe.processedCompanies, !1, na), Lt = Ht(pe.processedCompanies, !0, ra), Ya = Te(
    () => Ot({
      camera: k,
      futureBufferDays: gn,
      pastBufferDays: hn,
      viewport: L.desktop,
      zoom: v
    }),
    [k, L.desktop, v]
  ), za = Te(
    () => Ot({
      camera: q,
      compact: !0,
      futureBufferDays: gn,
      pastBufferDays: hn,
      viewport: L.mobile,
      zoom: b
    }),
    [q, b, L.mobile]
  ), { monthTicks: Mr, yearTicks: Nr } = Te(() => xn(Ya), [Ya]), { monthTicks: Dr, yearTicks: Cr } = Te(
    () => xn(za),
    [za]
  ), Ba = Te(() => [...pe.processedCompanies].filter((i) => i.latestRelease).sort((i, u) => {
    var p, T;
    return (((p = u.latestRelease) == null ? void 0 : p.globalDay) ?? 0) - (((T = i.latestRelease) == null ? void 0 : T.globalDay) ?? 0);
  })[0] ?? null, [pe.processedCompanies]), bt = Te(() => pe.processedCompanies, [pe.processedCompanies]), Oa = Te(() => bt.reduce((i, u) => {
    const p = Sa(u, ke);
    return Math.max(i, p);
  }, 0), [ke, bt]), Je = Te(
    () => Vt({
      currentGlobalDay: ke,
      maxDays: Rt,
      summaryCount: bt.length,
      timelineStartDay: St,
      timelineHeight: It,
      timelineWidth: ta,
      viewport: L.desktop
    }),
    [
      ke,
      It,
      Rt,
      bt.length,
      St,
      ta,
      L.desktop
    ]
  ), et = Te(
    () => Vt({
      compact: !0,
      currentGlobalDay: ke,
      maxDays: At,
      summaryCount: pe.processedCompanies.length,
      timelineStartDay: kt,
      timelineHeight: Lt,
      timelineWidth: aa,
      viewport: L.mobile
    }),
    [
      ke,
      At,
      kt,
      Lt,
      aa,
      pe.processedCompanies.length,
      L.mobile
    ]
  );
  Ce(() => {
    const i = window.setTimeout(() => te(!0), 120);
    return () => window.clearTimeout(i);
  }, []), Ce(() => {
    const i = () => {
      const u = window.location.hash;
      de(or(u)), n(ir(u)), e(sr(u)), l(lr(u));
    };
    return i(), window.addEventListener("hashchange", i), () => window.removeEventListener("hashchange", i);
  }, []), Ce(() => {
    const i = ga({
      companySortMode: r,
      filterState: a,
      route: H,
      significanceDisplayLimit: s
    });
    window.location.hash !== i && window.history.replaceState(null, "", i);
  }, [r, a, H, s]), Ce(() => () => {
    var i;
    (i = ve.current) == null || i.call(ve), I.current.frameId !== null && window.cancelAnimationFrame(I.current.frameId), _.current.frameId !== null && window.cancelAnimationFrame(_.current.frameId);
  }, []), Ce(() => {
    Re && (n((i) => {
      const u = bo(Re.presets), p = Be(Re.presets, tt()), T = Ge({
        ...i,
        attributeIds: Be([...i.attributeIds, ...p], tt()),
        companyIds: i.companyIds.length > 0 && !i.companyIds.includes(Re.companyId) ? [...i.companyIds, Re.companyId] : i.companyIds,
        domainIds: u.length > 0 ? Be([...i.domainIds, ...u], Ve()) : i.domainIds
      });
      return qn(i, T) ? i : T;
    }), w((i) => i.filter((u) => u !== Re.companyId)));
  }, [Re]), Ce(() => {
    const i = new Set(Fe.map((u) => u.id));
    n((u) => {
      const p = u.companyIds.filter((T) => i.has(T));
      return p.length === u.companyIds.length ? u : { ...u, companyIds: p };
    });
  }, [Fe]), Ce(() => {
    const i = window.matchMedia("(min-width: 768px)"), u = () => m(i.matches);
    return u(), i.addEventListener("change", u), () => i.removeEventListener("change", u);
  }, []), Ce(() => {
    const i = () => {
      var p, T, U, ae;
      Ze({
        desktop: {
          height: ((p = g.current) == null ? void 0 : p.clientHeight) ?? window.innerHeight,
          width: ((T = g.current) == null ? void 0 : T.clientWidth) ?? window.innerWidth
        },
        mobile: {
          height: ((U = N.current) == null ? void 0 : U.clientHeight) ?? window.innerHeight,
          width: ((ae = N.current) == null ? void 0 : ae.clientWidth) ?? window.innerWidth
        }
      });
    };
    i();
    const u = window.requestAnimationFrame(i);
    return window.addEventListener("resize", i), () => {
      window.cancelAnimationFrame(u), window.removeEventListener("resize", i);
    };
  }, [c, F]), Ce(() => {
    if (G.current)
      return;
    const i = () => {
      if (G.current || !g.current || g.current.clientWidth === 0)
        return;
      const p = $t(Je);
      E.current = p.camera, I.current.target = p, ia(p.zoom, p.camera), G.current = !0;
    };
    if (i(), !G.current)
      return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [Je, L.desktop, v]), Ce(() => {
    if (Y.current)
      return;
    const i = () => {
      if (Y.current || !N.current || N.current.clientWidth === 0)
        return;
      const p = $t(et, !0);
      C.current = p.camera, _.current.target = p, sa(p.zoom, p.camera), Y.current = !0;
    };
    if (i(), !Y.current)
      return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [et, b, L.mobile]);
  const Rr = (i) => {
    n((u) => {
      const p = u.domainIds.includes(i) ? u.domainIds.filter((T) => T !== i) : Be([...u.domainIds, i], Ve());
      return Ge({ ...u, companyIds: [], domainIds: p });
    });
  }, Sr = (i) => {
    n((u) => {
      const p = u.attributeIds.includes(i) ? u.attributeIds.filter((T) => T !== i) : Be([...u.attributeIds, i], tt());
      return Ge({ ...u, attributeIds: p, companyIds: [] });
    });
  }, Ar = (i) => {
    n((u) => Ge({ ...u, companyIds: [], contentType: i }));
  }, kr = (i) => {
    n((u) => {
      const p = u.companyIds.length === 0 ? [i] : u.companyIds.includes(i) ? u.companyIds.filter((T) => T !== i) : [...u.companyIds, i];
      return Ge({ ...u, companyIds: p });
    });
  }, Ir = () => {
    n((i) => ({ ...i, companyIds: [] }));
  }, Lr = () => {
    n(vt()), e(Kt()), l(Zt()), w([]), z(Ye().map((i) => i.id));
  }, _r = () => {
    n({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: [...Ve()]
    });
  }, Pr = () => {
    n({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: []
    });
  }, Wa = (i) => {
    w((u) => u.includes(i) ? u : [...u, i]);
  }, Ha = () => {
    w([]);
  }, Va = ln(() => {
    se((i) => !i);
  }, []), Ga = (i, u) => {
    z((p) => Mi(p, oe, i, u));
  }, ja = () => {
    window.location.hash = ga({
      companySortMode: r,
      filterState: a,
      route: { kind: "timeline" },
      significanceDisplayLimit: s
    });
  }, _t = (i) => {
    window.location.hash = ga({
      companySortMode: r,
      filterState: a,
      route: { kind: "model", slug: i },
      significanceDisplayLimit: s
    });
  }, oa = () => {
    H.kind === "model" && (ie.current = null, ja());
  }, qa = (i, u) => {
    if (fe.current) {
      fe.current = !1;
      return;
    }
    va(
      i,
      ye,
      oa,
      u
    );
  }, Ka = {
    attributeStats: Xe,
    boardView: R,
    companySortMode: r,
    companyOptions: Fe,
    domainStats: Se,
    filterState: a,
    isOpen: d,
    onAttributeToggle: Sr,
    onClearAll: Pr,
    onClearCompanyFilter: Ir,
    onCompanyToggle: kr,
    onCompanySortModeChange: e,
    onContentTypeChange: Ar,
    onDomainToggle: Rr,
    onReset: Lr,
    onSelectAll: _r,
    onSignificanceDisplayLimitChange: l,
    onToggle: () => f((i) => !i),
    significanceDisplayLimit: s,
    totalMatchedCompanyCount: $.length,
    visibleCompanyCount: S.length
  }, ia = (i, u) => {
    j.current = i, E.current = u, Ut(W.current, u, i), y(i), O(u);
  }, sa = (i, u) => {
    le.current = i, C.current = u, Ut(X.current, u, i), x(i), Z(u);
  }, Za = (i) => {
    const u = I.current, p = u.lastFrameAt === null ? 1 / 60 : ce((i - u.lastFrameAt) / 1e3, 0, 0.064);
    u.lastFrameAt = i;
    const { target: T, zoomAnchor: U } = u, ae = 1 - Math.exp(-u.stiffness * p), he = dt(j.current, T.zoom, ae), we = U ? ct(
      U.worldX,
      U.worldY,
      U.viewportX,
      U.viewportY,
      he
    ) : {
      x: dt(E.current.x, T.camera.x, ae),
      y: dt(E.current.y, T.camera.y, ae)
    };
    ia(he, we);
    const Me = Math.hypot(T.camera.x - we.x, T.camera.y - we.y), Ne = Math.abs(T.zoom - he);
    if (Me > mn || Ne > fn) {
      u.frameId = window.requestAnimationFrame(Za);
      return;
    }
    u.frameId = null, u.lastFrameAt = null;
    const De = U ? ct(
      U.worldX,
      U.worldY,
      U.viewportX,
      U.viewportY,
      T.zoom
    ) : T.camera;
    u.zoomAnchor = null, ia(T.zoom, De);
  }, Qa = (i) => {
    const u = _.current, p = u.lastFrameAt === null ? 1 / 60 : ce((i - u.lastFrameAt) / 1e3, 0, 0.064);
    u.lastFrameAt = i;
    const { target: T, zoomAnchor: U } = u, ae = 1 - Math.exp(-u.stiffness * p), he = dt(le.current, T.zoom, ae), we = U ? ct(
      U.worldX,
      U.worldY,
      U.viewportX,
      U.viewportY,
      he
    ) : {
      x: dt(C.current.x, T.camera.x, ae),
      y: dt(C.current.y, T.camera.y, ae)
    };
    sa(he, we);
    const Me = Math.hypot(T.camera.x - we.x, T.camera.y - we.y), Ne = Math.abs(T.zoom - he);
    if (Me > mn || Ne > fn) {
      u.frameId = window.requestAnimationFrame(Qa);
      return;
    }
    u.frameId = null, u.lastFrameAt = null;
    const De = U ? ct(
      U.worldX,
      U.worldY,
      U.viewportX,
      U.viewportY,
      T.zoom
    ) : T.camera;
    u.zoomAnchor = null, sa(T.zoom, De);
  }, la = (i, u) => {
    const p = I.current;
    p.target = i, p.stiffness = (u == null ? void 0 : u.stiffness) ?? lt, u ? p.zoomAnchor = u.zoomAnchor ?? null : p.zoomAnchor = null, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(Za));
  }, ca = (i, u) => {
    const p = _.current;
    p.target = i, p.stiffness = (u == null ? void 0 : u.stiffness) ?? lt, u ? p.zoomAnchor = u.zoomAnchor ?? null : p.zoomAnchor = null, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(Qa));
  }, Fr = ln(
    (i) => {
      const u = !c, p = u ? L.mobile : L.desktop;
      if (p.width <= 0 || p.height <= 0)
        return;
      const T = u ? et : Je, U = u ? Lt : It, ae = Bi(
        i,
        pe.processedCompanies,
        T,
        U,
        u,
        1
      );
      if (!ae)
        return;
      const he = Xi(p, u, Ue), we = Ue && !u ? Yi(p, he) : nr, Me = zi({
        anchor: we,
        bounds: ae,
        focusMaxZoom: u ? Qo : Zo,
        insets: he,
        layout: T,
        maxZoom: u ? ma : Pt,
        minZoom: u ? Ct : xt,
        viewport: p
      });
      if (!Me)
        return;
      const Ne = i.kind === "slug" ? { stiffness: Vo } : {};
      if (u) {
        ca(Me, Ne);
        return;
      }
      la(Me, Ne);
    },
    [
      Je,
      xt,
      It,
      Ue,
      c,
      et,
      Ct,
      Lt,
      pe.processedCompanies,
      L.desktop,
      L.mobile
    ]
  );
  Ce(() => {
    if (!Ue || !ye) {
      Ue || (ie.current = null);
      return;
    }
    if (!c) {
      ie.current = ye;
      return;
    }
    !F || D || V.current !== null || (c ? L.desktop : L.mobile).width <= 0 || ie.current !== ye && Fa(pe.processedCompanies, ye) && (Fr({ kind: "slug", slug: ye }), ie.current = ye);
  }, [
    ye,
    Ue,
    c,
    D,
    F,
    pe.processedCompanies,
    L.desktop,
    L.mobile
  ]), Ce(() => {
    const i = (u) => {
      const p = $i(u.key);
      if (!p || Ui(u) || !F)
        return;
      const T = !c, U = T ? L.mobile : L.desktop;
      if (U.width <= 0 || U.height <= 0)
        return;
      const ae = T ? et : Je, he = T ? ra : na, we = _i(
        pe.processedCompanies,
        ae,
        T,
        he
      );
      if (we.length === 0)
        return;
      const Me = T ? C.current : E.current, Ne = T ? le.current : j.current, De = Pi(
        pe.processedCompanies,
        ae,
        T,
        he,
        ye,
        Me,
        Ne,
        U
      ), wt = Fi(De, we, p, {
        excludeSlug: ye,
        minPrimaryDistance: ye ? ur : 0
      });
      !wt || wt.slug === ye || (u.preventDefault(), ie.current = null, _t(wt.slug));
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [
    ye,
    Je,
    c,
    F,
    et,
    ra,
    na,
    pe.processedCompanies,
    L.desktop,
    L.mobile
  ]);
  const $r = () => {
    const i = I.current;
    i.frameId !== null && (window.cancelAnimationFrame(i.frameId), i.frameId = null), i.lastFrameAt = null, i.target = {
      camera: E.current,
      zoom: j.current
    }, i.stiffness = lt, i.zoomAnchor = null;
  }, Ur = () => {
    const i = _.current;
    i.frameId !== null && (window.cancelAnimationFrame(i.frameId), i.frameId = null), i.lastFrameAt = null, i.target = {
      camera: C.current,
      zoom: le.current
    }, i.stiffness = lt, i.zoomAnchor = null;
  }, Xr = () => {
    const i = g.current;
    J.current = ((i == null ? void 0 : i.clientWidth) ?? L.desktop.width) / 2, K.current = ((i == null ? void 0 : i.clientHeight) ?? L.desktop.height) / 2, la($t(Je));
  }, Yr = () => {
    const i = N.current;
    ue.current = ((i == null ? void 0 : i.clientWidth) ?? L.mobile.width) / 2, ee.current = ((i == null ? void 0 : i.clientHeight) ?? L.mobile.height) / 2, ca($t(et, !0));
  }, Ja = (i, u) => {
    const p = g.current, T = L.desktop, U = ce(
      (u == null ? void 0 : u.x) ?? J.current ?? ((p == null ? void 0 : p.clientWidth) ?? T.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? T.width
    ), ae = ce(
      (u == null ? void 0 : u.y) ?? K.current ?? ((p == null ? void 0 : p.clientHeight) ?? T.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? T.height
    ), he = I.current, we = j.current, Me = Number(ce(i(we), xt, Pt).toFixed(3));
    if (Me === we)
      return;
    const Ne = Tn({
      anchorX: U,
      anchorY: ae,
      camera: E.current,
      existingAnchor: he.zoomAnchor,
      zoom: we
    }), De = ct(
      Ne.worldX,
      Ne.worldY,
      U,
      ae,
      Me
    );
    la(
      {
        camera: De,
        zoom: Me
      },
      { zoomAnchor: Ne }
    );
  }, en = (i, u) => {
    const p = N.current, T = L.mobile, U = ce(
      (u == null ? void 0 : u.x) ?? ue.current ?? ((p == null ? void 0 : p.clientWidth) ?? T.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? T.width
    ), ae = ce(
      (u == null ? void 0 : u.y) ?? ee.current ?? ((p == null ? void 0 : p.clientHeight) ?? T.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? T.height
    ), he = _.current, we = le.current, Me = Number(ce(i(we), Ct, ma).toFixed(3));
    if (Me === we)
      return;
    const Ne = Tn({
      anchorX: U,
      anchorY: ae,
      camera: C.current,
      existingAnchor: he.zoomAnchor,
      zoom: we
    }), De = ct(
      Ne.worldX,
      Ne.worldY,
      U,
      ae,
      Me
    );
    ca(
      {
        camera: De,
        zoom: Me
      },
      { zoomAnchor: Ne }
    );
  };
  B.current = (i) => {
    if (!g.current || i.deltaY === 0)
      return;
    i.cancelable && i.preventDefault();
    const u = g.current, p = u.getBoundingClientRect(), T = {
      x: ce(i.clientX - p.left, 0, u.clientWidth),
      y: ce(i.clientY - p.top, 0, u.clientHeight)
    };
    J.current = T.x, K.current = T.y;
    const U = i.deltaMode === 1 ? i.deltaY * 16 : i.deltaMode === 2 ? i.deltaY * u.clientHeight : i.deltaY;
    Ja(
      (ae) => Et(ae, -U * Wo, xt, Pt),
      T
    );
  }, Ce(() => {
    if (!F || !c)
      return;
    const i = g.current;
    if (!i)
      return;
    const u = (p) => B.current(p);
    return i.addEventListener("wheel", u, { passive: !1 }), () => {
      i.removeEventListener("wheel", u);
    };
  }, [c, F]);
  const zr = (i) => {
    var U;
    if (i.pointerType !== "mouse" || i.button !== 0 || !g.current)
      return;
    const u = g.current, p = u.getBoundingClientRect();
    J.current = i.clientX - p.left, K.current = i.clientY - p.top, $r(), fe.current = !1, V.current = i.pointerId, xe.current = {
      lastX: i.clientX,
      lastY: i.clientY,
      startX: i.clientX,
      startY: i.clientY
    }, u.setPointerCapture(i.pointerId), (U = ve.current) == null || U.call(ve);
    const T = (ae) => B.current(ae);
    window.addEventListener("wheel", T, { capture: !0, passive: !1 }), ve.current = () => {
      window.removeEventListener("wheel", T, !0);
    }, Xn(() => A(!0)), i.preventDefault();
  }, tn = () => {
    if (be.current = null, !g.current)
      return;
    const i = Ke.current;
    if (!i || V.current === null)
      return;
    const p = g.current.getBoundingClientRect(), T = i.clientX - p.left;
    J.current = T, K.current = i.clientY - p.top;
    const U = i.clientX - xe.current.lastX, ae = i.clientY - xe.current.lastY, he = {
      x: E.current.x - U / Math.max(j.current, 1e-3),
      y: E.current.y - ae / Math.max(j.current, 1e-3)
    };
    I.current.target = {
      camera: he,
      zoom: j.current
    }, E.current = he, Ut(W.current, he, j.current), xe.current.lastX = i.clientX, xe.current.lastY = i.clientY;
  }, Br = (i) => {
    if (i.pointerType === "mouse" && g.current) {
      const u = g.current.getBoundingClientRect();
      J.current = ce(
        i.clientX - u.left,
        0,
        g.current.clientWidth
      ), K.current = ce(
        i.clientY - u.top,
        0,
        g.current.clientHeight
      );
    }
    i.pointerId === V.current && (Ke.current = {
      clientX: i.clientX,
      clientY: i.clientY
    }, be.current === null && (be.current = window.requestAnimationFrame(tn)), i.preventDefault());
  }, Or = (i) => {
    var p;
    if (i.pointerId !== V.current || !g.current)
      return;
    be.current !== null && (window.cancelAnimationFrame(be.current), be.current = null, tn()), g.current.hasPointerCapture(i.pointerId) && g.current.releasePointerCapture(i.pointerId), V.current = null, Ke.current = null, (p = ve.current) == null || p.call(ve), ve.current = null, Math.hypot(
      i.clientX - xe.current.startX,
      i.clientY - xe.current.startY
    ) > vn ? fe.current = !0 : va(
      i.target,
      ye,
      oa,
      { clientX: i.clientX, clientY: i.clientY }
    ), O(E.current), A(!1);
  }, an = (i, u) => Math.hypot(u.clientX - i.clientX, u.clientY - i.clientY), nn = (i, u) => ({
    clientX: (i.clientX + u.clientX) / 2,
    clientY: (i.clientY + u.clientY) / 2
  }), rn = (i, u) => {
    const p = u.getBoundingClientRect();
    ue.current = ce(i.clientX - p.left, 0, u.clientWidth), ee.current = ce(i.clientY - p.top, 0, u.clientHeight);
  }, on = (i, u) => {
    const p = {
      x: C.current.x - i / Math.max(le.current, 1e-3),
      y: C.current.y - u / Math.max(le.current, 1e-3)
    };
    _.current.target = {
      camera: p,
      zoom: le.current
    }, C.current = p, Ut(X.current, p, le.current);
  }, sn = (i) => i instanceof Element && !i.closest("[data-timeline-pin]") && !!i.closest("button, a, input, label, select, textarea, [data-row-focus-label]"), st = (i) => ({
    clientX: i.clientX,
    clientY: i.clientY
  }), yt = (i) => {
    if (i.length === 0) {
      _e.current = null, ue.current = null, ee.current = null;
      return;
    }
    if (i.length === 1) {
      const U = st(i[0]);
      _e.current = {
        distance: 0,
        lastMidpointX: U.clientX,
        lastMidpointY: U.clientY,
        lastX: U.clientX,
        lastY: U.clientY,
        startX: U.clientX,
        startY: U.clientY,
        type: "pan"
      };
      return;
    }
    const u = st(i[0]), p = st(i[1]), T = nn(u, p);
    _e.current = {
      distance: Math.max(an(u, p), 1),
      lastMidpointX: T.clientX,
      lastMidpointY: T.clientY,
      lastX: T.clientX,
      lastY: T.clientY,
      startX: T.clientX,
      startY: T.clientY,
      type: "pinch"
    };
  }, Wr = (i) => {
    !N.current || sn(i.target) || (Ur(), yt(i.touches));
  }, Hr = (i) => {
    if (!N.current || sn(i.target))
      return;
    const u = N.current, p = _e.current;
    if (!p) {
      yt(i.touches);
      return;
    }
    if (i.touches.length === 1) {
      const De = st(i.touches[0]);
      if (rn(De, u), p.type === "pan") {
        const wt = De.clientX - p.lastX, Gr = De.clientY - p.lastY;
        on(wt, Gr), p.lastX = De.clientX, p.lastY = De.clientY;
      } else
        yt(i.touches);
      i.preventDefault();
      return;
    }
    if (i.touches.length < 2)
      return;
    const T = st(i.touches[0]), U = st(i.touches[1]), ae = nn(T, U), he = Math.max(an(T, U), 1);
    if (rn(ae, u), p.type !== "pinch") {
      yt(i.touches), i.preventDefault();
      return;
    }
    const we = ae.clientX - p.lastMidpointX, Me = ae.clientY - p.lastMidpointY;
    on(we, Me);
    const Ne = ce(he / Math.max(p.distance, 1), 0.78, 1.28);
    en((De) => De * Ne, {
      x: ue.current ?? u.clientWidth / 2,
      y: ee.current ?? u.clientHeight / 2
    }), p.distance = he, p.lastMidpointX = ae.clientX, p.lastMidpointY = ae.clientY, p.lastX = ae.clientX, p.lastY = ae.clientY, i.preventDefault();
  }, Vr = (i) => {
    const u = _e.current;
    if (yt(i.touches), Z(C.current), !u || u.type !== "pan" || i.changedTouches.length === 0)
      return;
    const p = i.changedTouches[0];
    Math.hypot(p.clientX - u.startX, p.clientY - u.startY) > vn || va(
      p.target,
      ye,
      oa,
      { clientX: p.clientX, clientY: p.clientY }
    );
  };
  return Ye().length === 0 ? /* @__PURE__ */ o(
    Un,
    {
      title: it.emptyDataTitle,
      detail: it.emptyDataDetail
    }
  ) : pe.invalidEntries.length > 0 ? /* @__PURE__ */ o(
    Un,
    {
      title: it.timelineStatusDataErrorTitle,
      detail: it.timelineStatusDataErrorDetail(pe.invalidEntries)
    }
  ) : F ? /* @__PURE__ */ h("div", { className: "relative isolate min-h-[100dvh] overflow-hidden bg-[var(--page-bg)] text-[var(--ink)] selection:bg-emerald-500/25 selection:text-[var(--ink)]", children: [
    /* @__PURE__ */ o(Ts, {}),
    /* @__PURE__ */ h("div", { className: "relative z-10", children: [
      c ? null : /* @__PURE__ */ o("div", { className: "md:hidden", children: /* @__PURE__ */ o(
        Ns,
        {
          activeArticleSlug: ye,
          boardView: R,
          camera: q,
          currentGlobalDay: ke,
          handleTouchEnd: Vr,
          handleTouchMove: Hr,
          handleTouchStart: Wr,
          handleZoomChange: en,
          hiddenCompanyCount: Pe,
          latestCompany: Ba,
          minZoom: Ct,
          maxZoom: ma,
          maxDays: At,
          maxSummaryQuietDays: Oa,
          modelExplorer: /* @__PURE__ */ o(Mn, { ...Ka, variant: "rail" }),
          monthTicks: Dr,
          onCompanyHide: Wa,
          onCompanyMove: Ga,
          onDismissArticle: qa,
          onModelSelect: _t,
          onResetCamera: Yr,
          onShowHiddenCompanies: Ha,
          onToggleTimelineGrid: Va,
          processedCompanies: pe.processedCompanies,
          renderWindow: Er,
          scrollContainerRef: N,
          showTimelineGrid: re,
          timelineStartDay: kt,
          timelineWidth: aa,
          viewport: L.mobile,
          worldRef: X,
          yearTicks: Cr,
          zoom: b
        }
      ) }),
      c ? /* @__PURE__ */ o("div", { className: "hidden md:block", children: /* @__PURE__ */ o(
        Ms,
        {
          activeArticleSlug: ye,
          boardView: R,
          camera: k,
          currentGlobalDay: ke,
          handlePointerDown: zr,
          handlePointerMove: Br,
          handleZoomChange: Ja,
          hiddenCompanyCount: Pe,
          isPanning: D,
          latestCompany: Ba,
          maxDays: Rt,
          minZoom: xt,
          maxZoom: Pt,
          maxSummaryQuietDays: Oa,
          modelExplorer: /* @__PURE__ */ o(Mn, { ...Ka, variant: "rail" }),
          monthTicks: Mr,
          onCompanyHide: Wa,
          onCompanyMove: Ga,
          onDismissArticle: qa,
          onModelSelect: _t,
          onResetCamera: Xr,
          onShowHiddenCompanies: Ha,
          onToggleTimelineGrid: Va,
          processedCompanies: pe.processedCompanies,
          renderWindow: Tr,
          scrollContainerRef: g,
          showTimelineGrid: re,
          stopPanning: Or,
          summaryCompanies: bt,
          timelineStartDay: St,
          timelineWidth: ta,
          viewport: L.desktop,
          worldRef: W,
          yearTicks: Nr,
          zoom: v
        }
      ) }) : null
    ] }),
    /* @__PURE__ */ o(He, { children: Ue ? /* @__PURE__ */ o(
      ms,
      {
        entry: Re,
        onBack: ja,
        onNavigate: _t,
        requestedSlug: ye ?? ""
      }
    ) : null })
  ] }) : /* @__PURE__ */ o(Es, {});
}
export {
  mo as DAY_MS,
  Ls as TimelineExperience,
  Is as buildTimelineArticleIndex,
  fo as createTimelineItemSlug,
  Ie as formatTimelineDate,
  Hn as formatTimelineDateRange,
  Vn as getTimelineItemSlug,
  ks as indexTimelineArticles,
  Le as parseTimelineDate
};
