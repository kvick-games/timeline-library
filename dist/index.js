import { jsx as i, jsxs as h, Fragment as gt } from "react/jsx-runtime";
import Nt, { useState as ve, useRef as j, useMemo as ge, useEffect as De, useCallback as sn } from "react";
import { flushSync as kn } from "react-dom";
import { EyeOff as Rn, Eye as An, RotateCcw as Vt, Layers3 as rt, ArrowLeft as $r, CalendarDays as Gt, BookOpen as In, ExternalLink as Ur, ArrowUp as Xr, ArrowDown as Yr, X as Ln, SlidersHorizontal as zr, ChevronDown as Br, ArrowRight as Or, Sparkles as Wr, Check as Hr, BrainCircuit as Vr, Globe2 as Gr, Image as jr, Clapperboard as Pn, AudioLines as qr, Box as Kr, Code2 as Zr, Bot as Qr, CarFront as Jr } from "lucide-react";
import { AnimatePresence as He, motion as me } from "motion/react";
const ei = 1e3 * 60 * 60 * 24;
function ti(t, a, n, r) {
  const e = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${e(t)}-${e(a)}-${e(n)}-${r}`;
}
function Re(t) {
  return /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
}
function ke(t, a = { month: "short", day: "numeric", year: "numeric" }, n = "day") {
  const r = typeof t == "string" ? Re(t) : t;
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
function _n(t, a, n = "day", r = "day") {
  if (!a || a === t)
    return ke(t, void 0, n);
  const e = Re(t), s = Re(a);
  if (Number.isNaN(e.getTime()) || Number.isNaN(s.getTime()))
    return `${t} - ${a}`;
  if (s.getTime() < e.getTime())
    return `${ke(t, void 0, n)} - ${ke(a, void 0, r)}`;
  if (n !== "day" || r !== "day")
    return `${ke(e, void 0, n)} - ${ke(s, void 0, r)}`;
  const l = e.getUTCFullYear() === s.getUTCFullYear();
  return l && e.getUTCMonth() === s.getUTCMonth() ? `${ke(e, { month: "short", day: "numeric" })}-${ke(s, { day: "numeric" })}, ${s.getUTCFullYear()}` : l ? `${ke(e, { month: "short", day: "numeric" })} - ${ke(s, { month: "short", day: "numeric", year: "numeric" })}` : `${ke(e)} - ${ke(s)}`;
}
function Fn(t, a, n) {
  return n.articleSlug ?? ti(t, a, n.name, n.date);
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
  return r.forEach((s) => {
    s.productLines.forEach((l) => {
      const u = [...l.releases].sort(
        (d, m) => Re(d.date).getTime() - Re(m.date).getTime()
      ), f = u.map((d) => Fn(s.id, l.id, d));
      u.forEach((d, m) => {
        var R, $;
        const x = f[m], w = a[d.eventType ?? n] ?? a[n], b = Re(d.date), v = d.endDate ? Re(d.endDate) : b, N = Number.isNaN(b.getTime()) || Number.isNaN(v.getTime()) ? 1 : Math.max(1, Math.round((v.getTime() - b.getTime()) / ei) + 1);
        e.push({
          accent: s.accent,
          article: t[x] ?? null,
          classes: d.classes ?? l.defaultClasses ?? s.defaultClasses ?? [l.classId],
          companyLogoMark: s.logoMark ?? "generic",
          companyId: s.id,
          companyName: s.name,
          date: d.date,
          dateLabel: ke(d.date, void 0, d.datePrecision),
          dateRangeLabel: _n(d.date, d.endDate, d.datePrecision),
          durationDays: N,
          endDate: d.endDate,
          endDateLabel: d.endDate ? ke(d.endDate) : void 0,
          eventKind: w.kind,
          eventType: w.id,
          eventTypeLabel: w.label,
          eventTypeShortLabel: w.shortLabel,
          name: d.name,
          nextName: ((R = u[m + 1]) == null ? void 0 : R.name) ?? null,
          nextSlug: f[m + 1] ?? null,
          presets: d.presets ?? l.defaultPresets ?? s.defaultPresets,
          tags: d.tags ?? l.defaultTags ?? [],
          previousName: (($ = u[m - 1]) == null ? void 0 : $.name) ?? null,
          previousSlug: f[m - 1] ?? null,
          productLineId: l.id,
          productLineLabel: l.label,
          productLineShortLabel: l.shortLabel,
          slug: x
        });
      });
    });
  }), e;
}
let wa = null;
function ai(t) {
  wa = t;
}
function oe() {
  if (!wa)
    throw new Error("TimelineExperience requires a timeline definition before rendering.");
  return wa;
}
function Ye() {
  return oe().groups;
}
function ni() {
  return oe().facets;
}
function $n() {
  return oe().filterGroups;
}
function Ve() {
  return $n().flatMap((t) => t.domainIds);
}
function tt() {
  return oe().attributeFilterIds;
}
function ri() {
  const t = oe().defaultFilterState;
  return {
    attributeIds: [...t.attributeIds],
    companyIds: [...t.companyIds],
    contentType: t.contentType,
    domainIds: [...t.domainIds]
  };
}
function jt() {
  return oe().contentTypeOptions;
}
function qt() {
  return oe().defaultSortMode;
}
function Un() {
  return oe().displayLimits;
}
function Kt() {
  return oe().defaultDisplayLimit;
}
function ii() {
  return oe().eventTypes.reduce(
    (t, a) => (t[a.id] = a, t),
    {}
  );
}
function qe() {
  return oe().copy;
}
function at() {
  return Re(oe().startDate);
}
function Ut(t, a) {
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
  return ri();
}
function Ge(t) {
  const a = Ye().map((n) => n.id);
  return {
    attributeIds: Be(t.attributeIds, tt()),
    companyIds: Be(t.companyIds, a),
    contentType: jt().some((n) => n.id === t.contentType) ? t.contentType : "all",
    domainIds: Be(t.domainIds, Ve())
  };
}
function Xn(t, a) {
  return t.contentType === a.contentType && Ut(t.attributeIds, a.attributeIds) && Ut(t.companyIds, a.companyIds) && Ut(t.domainIds, a.domainIds);
}
function zt(t) {
  return ni().find((a) => a.id === t);
}
function ln(t) {
  var a;
  return ((a = zt(t)) == null ? void 0 : a.label) ?? t;
}
function oi(t) {
  return new Set(Ve()).has(t);
}
function si(t) {
  return Be(t.filter(oi), Ve());
}
function ca(t) {
  return t.join(",");
}
function da(t, a) {
  if (!t)
    return [];
  const n = t.split(",").map((r) => r.trim()).filter(Boolean);
  return Be(n, a);
}
function cn(t) {
  return t.productLines.reduce((a, n) => {
    const r = n.releases.reduce((e, s) => {
      const l = Re(s.date).getTime();
      return Number.isNaN(l) ? e : Math.max(e, l);
    }, 0);
    return Math.max(a, r);
  }, 0);
}
function li(t) {
  var a, n;
  return ((n = (a = oe().scoring) == null ? void 0 : a.getFacetSignificanceBase) == null ? void 0 : n.call(a, t)) ?? 50;
}
function ci(t) {
  var a, n;
  return ((n = (a = oe().scoring) == null ? void 0 : a.getEventTypeSignificanceBonus) == null ? void 0 : n.call(a, t)) ?? 0;
}
function di(t, a) {
  var e, s;
  const n = (s = (e = oe().scoring) == null ? void 0 : e.getRecencySignificanceBonus) == null ? void 0 : s.call(
    e,
    t,
    a
  );
  if (n !== void 0)
    return n;
  const r = a - t;
  return r < 0 ? 2 : r <= 60 ? 12 : r <= 180 ? 9 : r <= 365 ? 6 : r <= 730 ? 3 : 0;
}
function Yn(t, a, n, r) {
  var v, N, R, $;
  const e = Re(n.date), s = n.endDate ? Re(n.endDate) : e, l = Number.isNaN(s.getTime()) ? 0 : Math.round((s.getTime() - at().getTime()) / nt), u = Ma(t, a, n), f = Jn(t, a, n), d = Da(n), m = u.reduce(
    (q, Q) => Math.max(q, li(Q)),
    40
  ), x = ((N = (v = oe().scoring) == null ? void 0 : v.getTagSignificanceBonus) == null ? void 0 : N.call(v, f)) ?? 0, w = (($ = (R = oe().scoring) == null ? void 0 : R.getGroupRankBonus) == null ? void 0 : $.call(R, t)) ?? 0, b = m + x + w + ci(d.id) + di(l, r);
  return ne(Math.round(b), 1, 100);
}
function ui(t, a, n) {
  return a.releases.reduce(
    (r, e) => Math.max(r, Yn(t, a, e, n)),
    0
  );
}
function dn(t, a) {
  return t.productLines.reduce(
    (n, r) => Math.max(n, ui(t, r, a)),
    0
  );
}
function mi(t, a, n) {
  const r = [...t];
  return a === "significance" ? (r.sort(
    (e, s) => dn(s, n) - dn(e, n) || (e.raceRank ?? 999) - (s.raceRank ?? 999) || e.name.localeCompare(s.name)
  ), r) : a === "latest" ? (r.sort(
    (e, s) => cn(s) - cn(e) || e.name.localeCompare(s.name)
  ), r) : (r.sort((e, s) => e.name.localeCompare(s.name)), r);
}
const nt = 1e3 * 60 * 60 * 24, Ce = 2.24, Ea = [0.22, 1, 0.36, 1], $e = { duration: 0.34, ease: Ea }, zn = { duration: 0.24, ease: Ea }, fi = { duration: 0.4, ease: Ea }, mt = 320, ft = 196, pi = "#05070b", hi = 72, gi = 80, vi = 56, xi = 60, bi = 8, yi = 44, wi = 32, Ti = 96, Ei = 56, Ni = 80, Mi = 40, Xt = 1, Yt = 1.05, Pt = 4, ua = 3.4, Di = 420, Ci = 360, Bn = 180, Si = 300, ki = 180, Ri = 260, On = 112, Ai = 380, ma = 0.06, pt = 6, Wn = 0.92, Ii = 25e-5, Li = 0.025, lt = 18, Pi = 8, un = 0.08, mn = 6e-4, _i = 720, Fi = 720, fn = 540, $i = 120, pn = 90, hn = 180, fa = 420, pa = 168, ut = 64, Ui = 0.88, Xi = 1.65, Yi = 1.45, gn = 6, zi = {
  bottom: 48,
  left: 24,
  right: 24,
  top: 72
}, Hn = 760, Vn = 0.58, Bi = 0.58, Gn = { x: 0.5, y: 0.46 };
function jn(t) {
  return t ? oe().wideLogoMarks.includes(t) : !1;
}
function Na(t) {
  return `${"/".endsWith("/") ? "/" : "//"}${t.replace(/^\/+/, "")}`;
}
function Zt(t) {
  const a = t.replace(/^#\/?/, ""), n = a.indexOf("?"), r = n >= 0 ? a.slice(0, n) : a, e = n >= 0 ? a.slice(n + 1) : "";
  return {
    params: new URLSearchParams(e),
    path: r
  };
}
function qn(t) {
  const { path: a } = Zt(t);
  if (!a)
    return { kind: "timeline" };
  const r = (oe().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), e = a.match(new RegExp(`^(?:${r}|events)/([^/?#]+)$`));
  return e ? { kind: "model", slug: decodeURIComponent(e[1]) } : { kind: "timeline" };
}
function Kn(t) {
  const { params: a } = Zt(t), n = a.get("ct"), r = vt();
  return Ge({
    attributeIds: da(a.get("a"), tt()),
    companyIds: da(a.get("co"), Ye().map((e) => e.id)),
    contentType: jt().some((e) => e.id === n) ? n : "all",
    domainIds: a.has("d") ? da(a.get("d"), Ve()) : r.domainIds
  });
}
function Zn(t) {
  const a = Zt(t).params.get("sort");
  return a && oe().sortOptions.some((n) => n.id === a) ? a : qt();
}
function Qn(t) {
  const a = Zt(t).params.get("rows");
  if (a === "all")
    return "all";
  const n = Number.parseInt(a ?? "", 10);
  return Un().includes(n) ? n : Kt();
}
function ha({
  companySortMode: t,
  filterState: a,
  route: n,
  significanceDisplayLimit: r
}) {
  const e = Ge(a), s = vt(), l = new URLSearchParams();
  Ut(e.domainIds, s.domainIds) || l.set("d", ca(e.domainIds)), e.attributeIds.length > 0 && l.set("a", ca(e.attributeIds)), e.contentType !== s.contentType && l.set("ct", e.contentType), e.companyIds.length > 0 && l.set("co", ca(e.companyIds)), t !== qt() && l.set("sort", t), r !== Kt() && l.set("rows", String(r));
  const u = oe().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items", f = n.kind === "model" ? `/${u}/${encodeURIComponent(n.slug)}` : "/", d = l.toString().replaceAll("%2C", ",");
  return `#${f}${d ? `?${d}` : ""}`;
}
function Oi() {
  return typeof window > "u" ? { kind: "timeline" } : qn(window.location.hash);
}
function Wi() {
  return typeof window > "u" ? vt() : Kn(window.location.hash);
}
function Hi() {
  return typeof window > "u" ? qt() : Zn(window.location.hash);
}
function Vi() {
  return typeof window > "u" ? Kt() : Qn(window.location.hash);
}
function Gi(t) {
  return !(t instanceof Element) || t.closest(
    "button, a, input, label, select, textarea, [data-row-focus-label], [data-timeline-pin]"
  ) ? !1 : !!t.closest("[data-timeline-field]");
}
function ji(t, a) {
  if (a && typeof document < "u") {
    const n = document.elementFromPoint(a.clientX, a.clientY);
    if (n)
      return n;
  }
  return t;
}
function ga(t, a, n, r) {
  if (!a)
    return;
  const e = ji(t, r);
  Gi(e) && n();
}
function qi(t, a) {
  return t.toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...a
  });
}
function va(t, a, n) {
  const r = t.replace("#", ""), e = r.length === 3 ? r.split("").map((m) => `${m}${m}`).join("") : r, s = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e))
    return t;
  const l = Number.parseInt(e.slice(0, 2), 16), u = Number.parseInt(e.slice(2, 4), 16), f = Number.parseInt(e.slice(4, 6), 16), d = (m) => Math.round(m + (a - m) * s);
  return `rgb(${d(l)} ${d(u)} ${d(f)})`;
}
function Ki(t, a, n) {
  const r = (w) => {
    const b = w.replace("#", "");
    return b.length === 3 ? b.split("").map((v) => `${v}${v}`).join("") : b;
  }, e = r(t), s = r(a), l = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e) || !/^[0-9a-fA-F]{6}$/.test(s))
    return t;
  const u = [e.slice(0, 2), e.slice(2, 4), e.slice(4, 6)].map(
    (w) => Number.parseInt(w, 16)
  ), f = [s.slice(0, 2), s.slice(2, 4), s.slice(4, 6)].map(
    (w) => Number.parseInt(w, 16)
  ), [d, m, x] = u.map(
    (w, b) => Math.round(w + (f[b] - w) * l)
  );
  return `rgb(${d} ${m} ${x})`;
}
function Oe(t, a) {
  const n = t.replace("#", ""), r = n.length === 3 ? n.split("").map((u) => `${u}${u}`).join("") : n;
  if (!/^[0-9a-fA-F]{6}$/.test(r))
    return `rgba(255, 255, 255, ${a})`;
  const e = Number.parseInt(r.slice(0, 2), 16), s = Number.parseInt(r.slice(2, 4), 16), l = Number.parseInt(r.slice(4, 6), 16);
  return `rgba(${e}, ${s}, ${l}, ${a})`;
}
function Zi(t, a) {
  return a.defaultClasses ?? t.defaultClasses ?? [a.classId];
}
function Qi(t, a) {
  return a.defaultPresets ?? t.defaultPresets;
}
function Ji(t, a, n) {
  return n.classes ?? Zi(t, a);
}
function Ma(t, a, n) {
  return n.presets ?? Qi(t, a);
}
function eo(t) {
  return t.defaultTags ?? [];
}
function Jn(t, a, n) {
  return n.tags ?? eo(a);
}
function Da(t) {
  const a = ii(), n = oe().defaultEventTypeId;
  return a[t.eventType ?? n] ?? a[n];
}
function to(t) {
  var f;
  const a = Ge(t), n = Ve().filter((d) => a.domainIds.includes(d)), r = Xn(a, vt()), e = qe();
  if (n.length === 0)
    return {
      description: e.emptyBoardDetail,
      isComposite: !0,
      isDefault: !1,
      isEmpty: !0,
      label: e.emptyBoardLabel
    };
  if (r) {
    const d = a.domainIds[0], m = d ? zt(d) : null;
    return {
      description: (m == null ? void 0 : m.description) ?? e.defaultBoardDescription,
      isComposite: !1,
      isDefault: !0,
      isEmpty: !1,
      label: (m == null ? void 0 : m.label) ?? n.join(", ")
    };
  }
  const l = [n.length === Ve().length ? "All domains" : n.length === 1 ? ln(n[0]) : `${n.length} domains`];
  a.attributeIds.forEach((d) => {
    l.push(ln(d));
  });
  const u = vt().contentType;
  return a.contentType !== u && l.push(
    ((f = jt().find((d) => d.id === a.contentType)) == null ? void 0 : f.label) ?? a.contentType
  ), a.companyIds.length > 0 && l.push(`${a.companyIds.length} ${e.groupPluralLabel}`), {
    description: l.join(", "),
    isComposite: l.length > 1 || n.length > 1,
    isDefault: !1,
    isEmpty: !1,
    label: l.join(" · ")
  };
}
function ao(t, a) {
  if (a === "all")
    return !0;
  const n = Da(t), r = n.kind === "event" || n.id === "product-launch";
  return a === "events" ? r : !r;
}
function no(t, a, n, r) {
  const e = Ma(t, a, n), s = r.domainIds.some((u) => e.includes(u)), l = r.attributeIds.length === 0 || r.attributeIds.some((u) => e.includes(u));
  return s && l && ao(n, r.contentType);
}
function Qt(t, a, n = {}) {
  const r = Ge(a), e = new Set(r.companyIds);
  return r.domainIds.length === 0 ? [] : t.filter((s) => n.ignoreCompanyFilter || e.size === 0 || e.has(s.id)).map((s) => ({
    ...s,
    productLines: s.productLines.map((l) => ({
      ...l,
      releases: l.releases.filter(
        (u) => no(s, l, u, r)
      )
    })).filter((l) => l.releases.length > 0)
  })).filter((s) => s.productLines.length > 0);
}
function er(t) {
  return {
    providerCount: t.length,
    releaseCount: t.reduce(
      (a, n) => a + n.productLines.reduce((r, e) => r + e.releases.length, 0),
      0
    )
  };
}
function ro(t, a) {
  return Ve().reduce((n, r) => (n[r] = er(
    Qt(t, { ...a, companyIds: [], domainIds: [r] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function io(t, a) {
  return tt().reduce((n, r) => (n[r] = er(
    Qt(t, { ...a, attributeIds: [r], companyIds: [] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function oo(t, a) {
  return Qt(t, { ...a, companyIds: [] }, { ignoreCompanyFilter: !0 }).map((n) => ({
    id: n.id,
    name: n.name,
    releaseCount: n.productLines.reduce((r, e) => r + e.releases.length, 0)
  }));
}
function so(t) {
  const a = t.productLines.find((n) => n.classId !== "events") ?? t.productLines[0];
  return (a == null ? void 0 : a.classId) ?? t.defaultClasses[0] ?? oe().defaultClassId;
}
function lo(t, a, n) {
  const r = [...t], [e] = r.splice(a, 1);
  return e === void 0 ? t : (r.splice(n, 0, e), r);
}
function Ca(t) {
  const a = new Set(Ye().map((s) => s.id)), n = t.filter((s) => a.has(s)), r = new Set(n), e = Ye().map((s) => s.id).filter((s) => !r.has(s));
  return [...n, ...e];
}
function co(t, a, n, r, e) {
  const s = new Map(t.map((m) => [m.id, m])), l = new Set(n), u = Ca(a).map((m) => s.get(m)).filter((m) => !!m), f = new Set(u.map((m) => m.id)), d = t.filter((m) => !f.has(m.id));
  return mi(
    [...u, ...d].filter((m) => !l.has(m.id)),
    r,
    e
  );
}
function uo(t, a, n) {
  if (a === "all")
    return t;
  const r = t.slice(0, a);
  if (!n || r.some((s) => s.id === n))
    return r;
  const e = t.find((s) => s.id === n);
  return e ? [...r, e] : r;
}
function mo(t, a, n, r) {
  if (n === r)
    return t;
  const e = new Set(a), s = Ca(t), l = s.filter((x) => e.has(x)), u = l.indexOf(n), f = l.indexOf(r);
  if (u < 0 || f < 0)
    return s;
  const d = lo(l, u, f);
  let m = 0;
  return s.map((x) => {
    if (!e.has(x))
      return x;
    const w = d[m];
    return m += 1, w ?? x;
  });
}
function fo(t, a, n, r) {
  const e = new Set(a), s = Ca(t).filter(
    (f) => e.has(f)
  ), l = s.indexOf(n), u = r === "up" ? l - 1 : l + 1;
  return l < 0 || u < 0 || u >= s.length ? t : mo(t, a, n, s[u]);
}
function po(t, a) {
  const n = [], r = t.map((l) => {
    const u = l.productLines.map((v) => {
      const R = v.releases.map((T) => ({
        ...T,
        classes: Ji(l, v, T),
        presets: Ma(l, v, T),
        tags: Jn(l, v, T)
      })).sort((T, F) => {
        const Y = Re(T.date).getTime(), A = Re(F.date).getTime();
        return Y - A || T.name.localeCompare(F.name);
      }).reduce((T, F) => {
        const Y = Re(F.date), A = F.endDate ? Re(F.endDate) : Y;
        if (Number.isNaN(Y.getTime()))
          return n.push(`${l.name} / ${v.label}: ${F.name}`), T;
        if (F.endDate && Number.isNaN(A.getTime()))
          return n.push(`${l.name} / ${v.label}: ${F.name} end date`), T;
        const B = T[T.length - 1], H = Math.round((Y.getTime() - at().getTime()) / nt), ee = Number.isNaN(A.getTime()) ? H : Math.max(H, Math.round((A.getTime() - at().getTime()) / nt)), z = B ? H - B.globalDay : 0, ce = Da(F), W = Yn(l, v, F, a);
        return T.push({
          ...F,
          articleSlug: Fn(l.id, v.id, F),
          dateLabel: ke(Y, void 0, F.datePrecision),
          dateRangeLabel: _n(F.date, F.endDate, F.datePrecision),
          durationDays: ee - H + 1,
          endDateLabel: F.endDate ? ke(F.endDate) : void 0,
          endGlobalDay: ee,
          eventKind: ce.kind,
          eventType: ce.id,
          eventTypeLabel: ce.label,
          eventTypeShortLabel: ce.shortLabel,
          globalDay: H,
          gap: z,
          significanceScore: W
        }), T;
      }, []), $ = R[R.length - 1] ?? null, q = R.reduce((T, F) => T + F.gap, 0), Q = R.length > 1 ? Math.round(q / (R.length - 1)) : null, se = R[0], J = R.reduce(
        (T, F) => Math.max(T, F.significanceScore),
        0
      );
      return {
        ...v,
        averageGap: Q,
        latestRelease: $,
        releases: R,
        significanceScore: J,
        startDay: (se == null ? void 0 : se.globalDay) ?? 0,
        totalSpan: $ && se ? $.endGlobalDay - se.globalDay : 0
      };
    }).sort(
      (v, N) => {
        var R, $;
        return N.significanceScore - v.significanceScore || (((R = N.latestRelease) == null ? void 0 : R.globalDay) ?? 0) - ((($ = v.latestRelease) == null ? void 0 : $.globalDay) ?? 0) || v.label.localeCompare(N.label);
      }
    ), f = [...u].filter((v) => v.latestRelease).sort((v, N) => {
      var R, $;
      return (((R = N.latestRelease) == null ? void 0 : R.endGlobalDay) ?? 0) - ((($ = v.latestRelease) == null ? void 0 : $.endGlobalDay) ?? 0);
    })[0] ?? null, d = (f == null ? void 0 : f.latestRelease) ?? null, m = [...u].flatMap((v) => v.releases).sort((v, N) => v.globalDay - N.globalDay)[0] ?? null, x = u.reduce(
      (v, N) => v + N.releases.reduce((R, $) => R + $.gap, 0),
      0
    ), w = u.reduce(
      (v, N) => v + Math.max(N.releases.length - 1, 0),
      0
    ), b = u.reduce(
      (v, N) => Math.max(v, N.significanceScore),
      0
    );
    return {
      ...l,
      averageGap: w > 0 ? Math.round(x / w) : null,
      latestProductLine: f,
      latestRelease: d,
      productLines: u,
      significanceScore: b,
      startDay: (m == null ? void 0 : m.globalDay) ?? 0,
      totalSpan: d && m ? d.endGlobalDay - m.globalDay : 0
    };
  }), e = r.reduce((l, u) => {
    var d;
    const f = ((d = u.latestRelease) == null ? void 0 : d.endGlobalDay) ?? 0;
    return Math.max(l, f);
  }, 0), s = r.reduce(
    (l, u) => l + u.productLines.reduce((f, d) => f + d.releases.length, 0),
    0
  );
  return {
    invalidEntries: n,
    latestGlobalDay: e,
    processedCompanies: r,
    totalReleases: s
  };
}
function vn({ endDay: t, startDay: a }) {
  const n = [], r = [], e = Math.floor(a), s = Math.max(e, Math.ceil(t)), l = new Date(at().getTime() + e * nt), u = new Date(at().getTime() + s * nt), f = new Date(Date.UTC(l.getUTCFullYear(), l.getUTCMonth(), 1));
  for (f.getTime() < l.getTime() && f.setUTCMonth(f.getUTCMonth() + 1); f <= u; ) {
    const d = Math.round((f.getTime() - at().getTime()) / nt);
    f.getUTCMonth() === 0 ? r.push({ days: d, label: f.getUTCFullYear() }) : n.push({
      days: d,
      label: qi(f, { month: "short" })
    }), f.setUTCMonth(f.getUTCMonth() + 1);
  }
  return { monthTicks: n, yearTicks: r };
}
function Bt({
  camera: t,
  compact: a = !1,
  futureBufferDays: n = 0,
  pastBufferDays: r = 0,
  viewport: e,
  zoom: s
}) {
  if (e.width <= 0)
    return { endDay: 0, startDay: 0 };
  const l = a ? ft : mt, u = a ? On : Bn, f = Math.max(s, 1e-3), d = t.x, m = t.x + e.width / f, x = (d - u - l) / Ce, w = (m - u - l) / Ce, b = Math.floor(x - r);
  return { endDay: Math.max(b + 30, Math.ceil(w + n)), startDay: b };
}
function ho(t, a = $i) {
  const n = Math.max(1, a);
  return {
    endDay: Math.ceil(t.endDay / n) * n,
    startDay: Math.floor(t.startDay / n) * n
  };
}
function xn({
  camera: t,
  compact: a = !1,
  viewport: n,
  zoom: r
}) {
  return n.width <= 0 ? { endDay: Number.POSITIVE_INFINITY, startDay: Number.NEGATIVE_INFINITY } : ho(
    Bt({
      camera: t,
      compact: a,
      futureBufferDays: fn,
      pastBufferDays: fn,
      viewport: n,
      zoom: r
    })
  );
}
function go(t, a) {
  return t.startDay === a.startDay && t.endDay === a.endDay;
}
function _t(t, a, n) {
  return a >= n.startDay && t <= n.endDay;
}
function bn({
  camera: t,
  compact: a = !1,
  minimumDays: n,
  viewport: r,
  zoom: e
}) {
  const s = Bt({
    camera: t,
    compact: a,
    futureBufferDays: _i,
    pastBufferDays: Fi,
    viewport: r,
    zoom: e
  });
  return {
    endDay: Math.max(n, s.endDay),
    startDay: Math.min(0, s.startDay)
  };
}
function ze(t, a) {
  return (t - a) * Ce;
}
function Ot(t, a) {
  return Math.max(0, (a - t) * Ce);
}
function Sa(t, a) {
  return t.latestRelease ? Math.max(0, Math.floor(a - t.latestRelease.endGlobalDay)) : 0;
}
function vo(t, a) {
  return a === 0 ? 100 : Math.max(0, Math.round((1 - t / a) * 100));
}
function xo(t) {
  return `${t} ${t === 1 ? "Day" : "Days"} since last update`;
}
function xa(t) {
  if (t <= 0)
    return "Same day";
  if (t < 31)
    return `${t} ${t === 1 ? "day" : "days"}`;
  const a = Math.floor(t / 365), n = t - a * 365, r = Math.floor(n / 30), e = n - r * 30, s = [];
  return a > 0 && s.push(`${a} ${a === 1 ? "year" : "years"}`), r > 0 && s.push(`${r} ${r === 1 ? "month" : "months"}`), e > 0 && a === 0 && s.push(`${e} ${e === 1 ? "day" : "days"}`), s.length > 0 ? s.join(", ") : `${t} days`;
}
function bo(t, a) {
  if (a === null || a <= 0)
    return null;
  const n = t - a, r = Math.abs(n);
  return r <= 2 ? `On pace with this line's ${a}-day average` : `${r} ${r === 1 ? "day" : "days"} ${n > 0 ? "slower" : "faster"} than this line's ${a}-day average`;
}
function je(t, a = 1) {
  return Math.max(1, Math.round(t * a));
}
function ka(t = !1, a = 1) {
  return je(t ? xi : vi, a);
}
function Ra(t, a = !1, n = 1) {
  const r = Math.max(t, 1), e = je(a ? gi : hi, n), s = je(bi, n), l = ka(a, n), u = r * l + Math.max(r - 1, 0) * s, f = Math.max(e, u + (r > 1 ? je(16, n) : 0));
  return {
    groupHeight: f,
    lineGap: s,
    lineHeight: l,
    topOffset: Math.max(0, (f - u) / 2)
  };
}
function Aa(t, a = !1, n = 1) {
  return Ra(t.productLines.length, a, n).groupHeight;
}
function Ia(t, a, n = !1, r = 1) {
  const { lineGap: e, lineHeight: s, topOffset: l } = Ra(t, n, r);
  return l + a * (s + e) + s / 2;
}
function it(t = !1, a = 1) {
  return {
    bottomPadding: je(t ? Mi : Ei, a),
    companyGap: je(t ? wi : yi, a),
    topPadding: je(t ? Ni : Ti, a)
  };
}
function Wt(t, a = !1, n = 1) {
  const r = it(a, n), e = t.reduce((l, u) => l + Aa(u, a, n), 0), s = Math.max(t.length - 1, 0) * r.companyGap;
  return Math.max(
    je(a ? 384 : 448, n),
    e + s + r.topPadding + r.bottomPadding + je(a ? 40 : 32, n)
  );
}
function Mt(t, a = !1, n = 1, r = it(a, n)) {
  let e = r.topPadding;
  return t.map((s, l) => {
    const u = Aa(s, a, n), f = {
      company: s,
      height: u,
      index: l,
      y: e
    };
    return e += u + r.companyGap, f;
  });
}
function Ht({
  compact: t = !1,
  currentGlobalDay: a,
  maxDays: n,
  summaryCount: r,
  timelineStartDay: e = 0,
  timelineHeight: s,
  timelineWidth: l,
  viewport: u
}) {
  const f = Math.max(u.width, t ? 360 : 1024), d = Math.max(u.height, t ? 720 : 680), m = t ? ft : mt, x = t ? On : Bn, w = t ? Ai : Si, b = t ? ki : Di, v = t ? Ri : Ci, N = x + m + a * Ce, R = Math.max(0, N - f * (t ? 0.78 : 0.72)), $ = t ? Math.min(390, Math.max(292, f - 64)) : 720, q = t ? Math.min(360, Math.max(280, f - 56)) : 360, Q = t ? Math.min(420, Math.max(290, f - 48)) : 520, se = t ? Math.min(620, Math.max(320, f - 32)) : 1180, J = Math.max(b * 0.34, R + (t ? 20 : f * 0.24)), T = t ? 0 : 4, F = Math.max(
    0,
    Math.min(
      w - d * (t ? 0.28 : 0.24),
      T - (t ? 18 : 24)
    )
  ), Y = t ? J + $ + 18 : Math.min(J + $ + 28, R + f - q - 24), A = T + 8, B = J, H = w + s + (t ? 42 : 52), ee = J, z = H + (t ? 132 : 118), ce = t ? f >= 640 ? 2 : 1 : 4, M = Math.max(1, Math.ceil(Math.max(r, 1) / ce)) * (t ? 172 : 224), I = x + m + Math.max(n, 0) * Ce, L = x + e * Ce, P = Math.max(
    I + b,
    L + l + m + b,
    Y + q + b,
    ee + se + b,
    R + f + b
  ), g = Math.max(
    w + s + v,
    z + M + v,
    A + (t ? 152 : 172) + v,
    F + d + v
  );
  return {
    contentCards: {
      intro: { height: t ? 176 : 202, width: $, x: J, y: T },
      latest: { height: t ? 96 : 74, width: Q, x: B, y: H },
      notes: { height: t ? 142 : 170, width: q, x: Y, y: A },
      summaries: { width: se, x: ee, y: z }
    },
    initialCameraX: R,
    initialCameraY: F,
    railWidth: m,
    timelineX: x,
    timelineY: w,
    worldHeight: g,
    worldWidth: P
  };
}
function yo(t) {
  return {
    x: t.initialCameraX,
    y: t.initialCameraY
  };
}
function Ft(t, a = !1) {
  return {
    camera: yo(t),
    zoom: a ? Yt : Xt
  };
}
function La(t) {
  return Number.isFinite(t) ? Math.max(1e-3, t) : 1;
}
function Pa(t, a) {
  return `translate3d(${-t.x * a}px, ${-t.y * a}px, 0) scale(${a})`;
}
const ba = /* @__PURE__ */ new WeakMap(), wo = 126;
function $t(t, a, n) {
  if (!t)
    return;
  t.style.transform = Pa(a, n), t.style.setProperty("--map-zoom", String(La(n))), t.style.willChange = "transform";
  const r = ba.get(t);
  r !== void 0 && window.clearTimeout(r);
  const e = window.setTimeout(() => {
    t.style.willChange = "auto", ba.delete(t);
  }, wo);
  ba.set(t, e);
}
function We(t) {
  return {
    "--label-size": String(t)
  };
}
function ya(t, a, n) {
  const r = t.maxX - t.minX, e = t.maxY - t.minY, s = Math.max(0, (a - r) / 2), l = Math.max(0, (n - e) / 2);
  return {
    maxX: t.maxX + s,
    maxY: t.maxY + l,
    minX: t.minX - s,
    minY: t.minY - l
  };
}
function _a(t, a) {
  for (const n of t)
    for (let r = 0; r < n.productLines.length; r += 1) {
      const s = n.productLines[r].releases.find((l) => l.articleSlug === a);
      if (s)
        return { company: n, productLineIndex: r, release: s };
    }
  return null;
}
const tr = 6, To = 2.75;
function Eo(t, a, n, r) {
  const e = it(n, r), s = Mt(t, n, r, e), l = new Map(s.map((f) => [f.company.id, f])), u = [];
  return t.forEach((f) => {
    const d = l.get(f.id);
    d && f.productLines.forEach((m, x) => {
      m.releases.forEach((w) => {
        u.push({
          slug: w.articleSlug,
          x: a.timelineX + a.railWidth + w.globalDay * Ce,
          y: a.timelineY + d.y + Ia(f.productLines.length, x, n, r)
        });
      });
    });
  }), u;
}
function No(t, a, n, r, e, s, l, u) {
  if (e) {
    const d = _a(t, e);
    if (d) {
      const x = Mt(
        t,
        n,
        r,
        it(n, r)
      ).find((w) => w.company.id === d.company.id);
      if (x)
        return {
          x: a.timelineX + a.railWidth + d.release.globalDay * Ce,
          y: a.timelineY + x.y + Ia(d.company.productLines.length, d.productLineIndex, n, r)
        };
    }
  }
  const f = Math.max(l, 1e-3);
  return {
    x: s.x + u.width / (2 * f),
    y: s.y + u.height / (2 * f)
  };
}
function Mo(t, a, n, r) {
  const e = (r == null ? void 0 : r.minPrimaryDistance) ?? tr;
  let s = null, l = 1 / 0, u = 1 / 0;
  return a.forEach((f) => {
    if (r != null && r.excludeSlug && f.slug === r.excludeSlug)
      return;
    const d = f.x - t.x, m = f.y - t.y;
    let x = 0, w = 0;
    if (n === "right") {
      if (d < e)
        return;
      x = d, w = Math.abs(m);
    } else if (n === "left") {
      if (d > -e)
        return;
      x = -d, w = Math.abs(m);
    } else if (n === "down") {
      if (m < e)
        return;
      x = m, w = Math.abs(d);
    } else {
      if (m > -e)
        return;
      x = -m, w = Math.abs(d);
    }
    const b = w * To + x, v = Math.hypot(d, m);
    (b < l || b === l && v < u) && (s = f, l = b, u = v);
  }), s;
}
function Do(t) {
  return t === "ArrowRight" ? "right" : t === "ArrowLeft" ? "left" : t === "ArrowDown" ? "down" : t === "ArrowUp" ? "up" : null;
}
function Co(t) {
  if (t.altKey || t.ctrlKey || t.metaKey)
    return !0;
  const a = t.target;
  return a instanceof Element ? a.closest('[aria-label="Timeline zoom controls"]') ? !0 : !!a.closest('input, textarea, select, [contenteditable="true"]') : !1;
}
function yn({
  compact: t = !1,
  layout: a,
  productLineIndex: n,
  release: r,
  row: e,
  verticalScale: s = 1
}) {
  const l = ka(t, s), u = a.timelineY + e.y + Ia(e.company.productLines.length, n, t, s), f = a.timelineX + a.railWidth + r.globalDay * Ce, d = a.timelineX + a.railWidth + r.endGlobalDay * Ce, m = t ? 28 : 36;
  return {
    maxX: Math.max(f, d) + m,
    maxY: u + l / 2 + 12,
    minX: Math.min(f, d) - m,
    minY: u - l / 2 - 12
  };
}
function So(t, a, n) {
  return n ? a ? { bottom: 40, left: 16, right: 16, top: 64 } : {
    bottom: 48,
    left: 100,
    right: Math.min(Hn, Math.round(t.width * Vn)),
    top: 72
  } : zi;
}
function ko(t, a) {
  const n = Math.min(
    Hn,
    Math.round(t.width * Vn)
  ), e = (t.width - n) * Bi, s = Math.max(
    1,
    t.width - a.left - a.right - ut * 2
  );
  return { x: ne(
    (e - a.left - ut) / s,
    0.42,
    0.68
  ), y: Gn.y };
}
function Ro({
  anchor: t,
  bounds: a,
  focusMaxZoom: n,
  insets: r,
  layout: e,
  maxZoom: s,
  minZoom: l,
  viewport: u
}) {
  if (u.width <= 0 || u.height <= 0)
    return null;
  const f = Math.max(
    1,
    u.width - r.left - r.right - ut * 2
  ), d = Math.max(
    1,
    u.height - r.top - r.bottom - ut * 2
  ), m = Math.max(a.maxX - a.minX, 1), x = Math.max(a.maxY - a.minY, 1), w = Math.min(f / m, d / x) * Wn * Ui, b = Number(ne(w, l, Math.min(s, n)).toFixed(3)), v = (a.minX + a.maxX) / 2, N = (a.minY + a.maxY) / 2, R = r.left + ut + f * t.x, $ = r.top + ut + d * t.y, q = Math.max(0, e.worldWidth - u.width / b), Q = Math.max(0, e.worldHeight - u.height / b);
  return {
    camera: {
      x: ne(v - R / b, 0, q),
      y: ne(N - $ / b, 0, Q)
    },
    zoom: b
  };
}
function Ao(t, a, n, r, e = !1, s = 1) {
  if (t.kind === "bounds")
    return t.bounds;
  const l = it(e, s), u = Mt(a, e, s, l);
  if (t.kind === "slug") {
    const b = _a(a, t.slug);
    if (!b)
      return null;
    const v = u.find((R) => R.company.id === b.company.id);
    if (!v)
      return null;
    const N = yn({
      compact: e,
      layout: n,
      productLineIndex: b.productLineIndex,
      release: b.release,
      row: v,
      verticalScale: s
    });
    return ya(N, fa, pa);
  }
  if (t.kind === "release") {
    const b = u.find((R) => R.company.id === t.companyId);
    if (!b)
      return null;
    const v = b.company.productLines.findIndex((R) => R.id === t.productLineId);
    if (v < 0)
      return null;
    const N = yn({
      compact: e,
      layout: n,
      productLineIndex: v,
      release: {
        endGlobalDay: t.endGlobalDay ?? t.globalDay,
        globalDay: t.globalDay
      },
      row: b,
      verticalScale: s
    });
    return ya(N, fa, pa);
  }
  const f = n.timelineX + n.railWidth + t.globalDay * Ce, d = t.endGlobalDay ?? t.globalDay, m = n.timelineX + n.railWidth + d * Ce, x = n.timelineY + r * 0.44, w = e ? 100 : 120;
  return ya(
    {
      maxX: Math.max(f, m) + 40,
      maxY: x + w / 2,
      minX: Math.min(f, m) - 40,
      minY: x - w / 2
    },
    fa,
    pa
  );
}
function Io(t, a, n, r) {
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
function wn({
  anchorX: t,
  anchorY: a,
  camera: n,
  existingAnchor: r,
  zoom: e
}) {
  if (r && r.viewportX === t && r.viewportY === a)
    return r;
  const { worldX: s, worldY: l } = Io(n, e, t, a);
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
function ne(t, a, n) {
  return Math.min(Math.max(t, a), n);
}
function Lo(t) {
  const a = ne(t, 0, 1), n = 1 / (1 + Math.exp(pt / 2)), r = 1 / (1 + Math.exp(-pt / 2));
  return (1 / (1 + Math.exp(-pt * (a - 0.5))) - n) / (r - n);
}
function Po(t) {
  const a = ne(t, 0, 1), n = 1 / (1 + Math.exp(pt / 2)), r = 1 / (1 + Math.exp(-pt / 2)), e = n + a * (r - n);
  return ne(0.5 + Math.log(e / (1 - e)) / pt, 0, 1);
}
function Ta(t, a, n) {
  if (n <= a)
    return a;
  const r = Lo(t);
  return a + r * (n - a);
}
function ar(t, a, n) {
  if (n <= a)
    return 0;
  const r = (ne(t, a, n) - a) / (n - a);
  return Po(r);
}
function Tt(t, a, n, r) {
  const e = ar(t, n, r);
  return Ta(e + a, n, r);
}
function Tn(t, a, n) {
  if (t <= 0 || n <= 0)
    return 0.35;
  const r = Math.max(t - a, 120);
  return ne(r / n * Wn, 0.08, 1);
}
function _o(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ i("path", { d: "M11 5v12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ i("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Fo(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ i("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ i("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Et({ classId: t, className: a }) {
  const n = a ?? "h-4 w-4";
  return t === "frontier-llms" ? /* @__PURE__ */ i(Vr, { className: n, strokeWidth: 1.8 }) : t === "open-source-llms" ? /* @__PURE__ */ i(Gr, { className: n, strokeWidth: 1.8 }) : t === "image-generation" ? /* @__PURE__ */ i(jr, { className: n, strokeWidth: 1.8 }) : t === "video-generation" ? /* @__PURE__ */ i(Pn, { className: n, strokeWidth: 1.8 }) : t === "audio-generation" ? /* @__PURE__ */ i(qr, { className: n, strokeWidth: 1.8 }) : t === "3d-generation" ? /* @__PURE__ */ i(Kr, { className: n, strokeWidth: 1.8 }) : t === "world-models" ? /* @__PURE__ */ i(rt, { className: n, strokeWidth: 1.8 }) : t === "coding-harnesses" ? /* @__PURE__ */ i(Zr, { className: n, strokeWidth: 1.8 }) : t === "events" ? /* @__PURE__ */ i(Gt, { className: n, strokeWidth: 1.8 }) : t === "robotics" ? /* @__PURE__ */ i(Qr, { className: n, strokeWidth: 1.8 }) : t === "vehicle-autonomy" ? /* @__PURE__ */ i(Jr, { className: n, strokeWidth: 1.8 }) : /* @__PURE__ */ i(rt, { className: n, strokeWidth: 1.8 });
}
function $o({
  attributeStats: t,
  boardView: a,
  className: n = "",
  companySortMode: r,
  companyOptions: e,
  domainStats: s,
  filterState: l,
  isOpen: u,
  onAttributeToggle: f,
  onClearAll: d,
  onClearCompanyFilter: m,
  onCompanyToggle: x,
  onCompanySortModeChange: w,
  onContentTypeChange: b,
  onDomainToggle: v,
  onReset: N,
  onSelectAll: R,
  onSignificanceDisplayLimitChange: $,
  onToggle: q,
  significanceDisplayLimit: Q,
  totalMatchedCompanyCount: se,
  variant: J = "panel",
  visibleCompanyCount: T
}) {
  var re;
  const F = l.domainIds.length + l.attributeIds.length + l.companyIds.length + (l.contentType === "all" ? 0 : 1), Y = J === "rail", A = Y && !u, B = qe(), H = `${Y ? u ? "w-[var(--category-expanded-width,286px)]" : "w-[74px]" : "w-full"} timeline-fluid-obstacle overflow-hidden rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${A ? "cursor-pointer hover:bg-[var(--surface-strong)]" : ""} ${n}`, ee = ({
    buttonKey: M,
    description: I,
    icon: L,
    isSelected: P,
    meta: g,
    onClick: D,
    title: O
  }) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      title: O,
      disabled: !u,
      onClick: D,
      className: `flex h-11 w-full items-center gap-2 rounded-[0.85rem] border px-2.5 text-left transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)]" : "border-[var(--edge)] bg-transparent hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
      children: [
        L ?? /* @__PURE__ */ i(Wr, { className: "h-4 w-4 shrink-0 text-[var(--ink)]", strokeWidth: 1.8 }),
        /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ i("span", { className: "block truncate text-xs font-semibold tracking-tight text-[var(--ink)]", children: I }),
          /* @__PURE__ */ i("span", { className: "mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--muted)]", children: g })
        ] }),
        /* @__PURE__ */ i(
          "span",
          {
            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${P ? "border-[var(--edge-strong)] bg-[var(--ink)] text-[var(--page-bg)]" : "border-[var(--edge)] text-transparent"}`,
            children: /* @__PURE__ */ i(Hr, { className: "h-3 w-3", strokeWidth: 2 })
          }
        )
      ]
    },
    M
  ), z = oe().sortOptions, ce = ((re = z.find((M) => M.id === r)) == null ? void 0 : re.label) ?? "Significance", W = r === "significance" ? "score" : ce;
  return /* @__PURE__ */ h("aside", { className: H, onClick: A ? q : void 0, children: [
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-expanded": u,
        "aria-label": "Timeline filter and sort controls",
        onClick: (M) => {
          M.stopPropagation(), q();
        },
        className: `flex w-full items-center gap-3 text-left transition duration-300 hover:bg-[var(--surface-strong)] active:scale-[0.99] ${u ? "justify-between border-b border-[var(--edge)] px-3 py-3" : "justify-center px-0 py-4"}`,
        children: [
          /* @__PURE__ */ i("span", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink)] shadow-[var(--soft-shadow)]", children: /* @__PURE__ */ i(zr, { className: "h-4 w-4", strokeWidth: 1.8 }) }),
          u ? /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ i("span", { className: "block text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]", children: B.filterPanelLabel }),
            /* @__PURE__ */ i("span", { className: "mt-1 block truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.label }),
            /* @__PURE__ */ h("span", { className: "mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
              T,
              "/",
              se,
              " rows · sort ",
              W
            ] })
          ] }) : /* @__PURE__ */ i("span", { className: "sr-only", children: a.label }),
          /* @__PURE__ */ i(
            Br,
            {
              className: `h-4 w-4 shrink-0 text-[var(--ink-soft)] transition duration-300 ${u ? "rotate-180" : "-rotate-90"}`,
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
        "aria-hidden": !u,
        className: `overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${u ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"}`,
        style: { pointerEvents: u ? "auto" : "none" },
        children: /* @__PURE__ */ i(
          me.div,
          {
            initial: !1,
            animate: { y: u ? 0 : -10 },
            transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
            className: "max-h-[min(620px,calc(100dvh-18rem))] overflow-y-auto px-3 py-3",
            children: /* @__PURE__ */ h("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start", children: [
              /* @__PURE__ */ h("div", { className: "space-y-3", children: [
                $n().map((M) => /* @__PURE__ */ h("div", { children: [
                  /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: M.label }),
                  /* @__PURE__ */ i("div", { className: "space-y-1.5", children: M.domainIds.map((I) => {
                    const L = zt(I);
                    if (!L)
                      return null;
                    const P = s[I] ?? { providerCount: 0, releaseCount: 0 };
                    return ee({
                      buttonKey: L.id,
                      description: L.label,
                      icon: /* @__PURE__ */ i(Et, { classId: L.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                      isSelected: l.domainIds.includes(I),
                      meta: `${P.providerCount}c / ${P.releaseCount}r`,
                      onClick: () => v(I),
                      title: L.description
                    });
                  }) })
                ] }, M.label)),
                /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
                  /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: B.contentTypeHeading }),
                  /* @__PURE__ */ i("div", { className: "grid grid-cols-3 gap-1.5", children: jt().map((M) => {
                    const I = l.contentType === M.id, L = M.id === "events" ? Gt : M.id === "releases" ? In : rt;
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !u,
                        onClick: () => b(M.id),
                        title: M.description,
                        className: `inline-flex h-9 items-center justify-center gap-1.5 rounded-[0.85rem] border px-2 text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${I ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ i(L, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                          M.label
                        ]
                      },
                      M.id
                    );
                  }) })
                ] }),
                /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-1.5 border-t border-[var(--edge)] pt-3 md:border-t-0 md:pt-0", children: [
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !u,
                      onClick: R,
                      title: B.selectAllTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(rt, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
                        B.selectAllLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !u,
                      onClick: d,
                      title: B.clearFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(Ln, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        B.clearFiltersLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !u,
                      onClick: N,
                      title: B.resetFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(Vt, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        B.resetFiltersLabel
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3 md:border-l md:border-t-0 md:py-1 md:pl-3", children: [
                /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: "Attributes" }),
                /* @__PURE__ */ i("div", { className: "space-y-1.5", children: tt().map((M) => {
                  const I = zt(M);
                  if (!I)
                    return null;
                  const L = t[M] ?? { providerCount: 0, releaseCount: 0 };
                  return ee({
                    buttonKey: M,
                    description: I.label,
                    icon: /* @__PURE__ */ i(Et, { classId: I.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                    isSelected: l.attributeIds.includes(M),
                    meta: `${L.providerCount}c / ${L.releaseCount}r`,
                    onClick: () => f(M),
                    title: I.description
                  });
                }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: B.companyFiltersHeading }),
                /* @__PURE__ */ i("div", { className: "max-h-44 space-y-1.5 overflow-y-auto pr-1", children: e.length > 0 ? /* @__PURE__ */ h(gt, { children: [
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !u,
                      onClick: m,
                      title: B.allRelevantLabel,
                      className: `flex h-8 w-full items-center justify-between rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${l.companyIds.length === 0 ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        B.allRelevantLabel,
                        /* @__PURE__ */ h("span", { className: "font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                          e.length,
                          "c"
                        ] })
                      ]
                    }
                  ),
                  e.map((M) => {
                    const I = l.companyIds.includes(M.id);
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !u,
                        onClick: () => x(M.id),
                        title: `Filter to ${M.name}`,
                        className: `flex h-8 w-full items-center justify-between gap-2 rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${I ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: M.name }),
                          /* @__PURE__ */ h("span", { className: "shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                            M.releaseCount,
                            "r"
                          ] })
                        ]
                      },
                      M.id
                    );
                  })
                ] }) : /* @__PURE__ */ i("div", { className: "rounded-[0.75rem] border border-[var(--edge)] px-2 py-2 text-[11px] leading-4 text-[var(--muted)]", children: B.companyFilterEmpty }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: B.sortHeading }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-1 gap-1.5", children: z.map((M) => {
                  const I = r === M.id;
                  return /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !u,
                      onClick: () => w(M.id),
                      className: `flex h-9 w-full items-center justify-between rounded-[0.85rem] border px-2.5 text-left text-xs font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${I ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        M.label,
                        /* @__PURE__ */ i(
                          "span",
                          {
                            className: `h-2.5 w-2.5 rounded-full border ${I ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--edge)] bg-transparent"}`
                          }
                        )
                      ]
                    },
                    M.id
                  );
                }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: B.displayedRowsHeading }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-4 gap-1.5 md:grid-cols-2", children: Un().map((M) => {
                  const I = Q === M, L = M === "all" ? "All" : String(M);
                  return /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      disabled: !u,
                      onClick: () => $(M),
                      className: `h-8 rounded-[0.85rem] border px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition duration-300 active:scale-[0.99] ${I ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: L
                    },
                    String(M)
                  );
                }) })
              ] })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ i(He, { initial: !1, children: !u && Y ? /* @__PURE__ */ h(
      me.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        className: "flex flex-col items-center gap-3 px-2 pb-5",
        children: [
          /* @__PURE__ */ i("span", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]", style: { writingMode: "vertical-rl" }, children: B.filterPanelLabel }),
          /* @__PURE__ */ i("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] font-mono text-[10px] text-[var(--ink-soft)]", children: F })
        ]
      },
      "filter-rail"
    ) : null })
  ] });
}
function En(t) {
  return /* @__PURE__ */ i($o, { ...t });
}
function ht({
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
function nr({
  className: t = "",
  compact: a = !1,
  maxZoom: n,
  minZoom: r,
  onSliderActiveChange: e,
  onZoomChange: s,
  zoom: l
}) {
  const u = j(null), f = j(null), d = j(null), m = j(null), x = j(null), [w, b] = ve(!1), [v, N] = ve(!1), [R, $] = ve(!1), q = ar(l, r, n), Q = 8 + (1 - q) * 84, se = a ? "h-3.5 w-3.5" : "h-4 w-4", J = w || v || R, T = J ? a ? "h-10 min-w-10 px-2 text-[9px]" : "h-11 min-w-11 px-2.5 text-[10px]" : a ? "h-4 min-w-4 px-0 text-[0px]" : "h-5 min-w-5 px-0 text-[0px]", F = a ? "group-hover/zoomrail:h-10 group-hover/zoomrail:min-w-10 group-hover/zoomrail:px-2 group-hover/zoomrail:text-[9px] group-focus-within/zoomrail:h-10 group-focus-within/zoomrail:min-w-10 group-focus-within/zoomrail:px-2 group-focus-within/zoomrail:text-[9px]" : "group-hover/zoomrail:h-11 group-hover/zoomrail:min-w-11 group-hover/zoomrail:px-2.5 group-hover/zoomrail:text-[10px] group-focus-within/zoomrail:h-11 group-focus-within/zoomrail:min-w-11 group-focus-within/zoomrail:px-2.5 group-focus-within/zoomrail:text-[10px]", Y = w ? "text-[var(--ink)] opacity-100" : "opacity-45", A = (g, D = !1) => {
    const O = () => {
      b(g), e == null || e(g);
    };
    if (D) {
      kn(O);
      return;
    }
    O();
  }, B = (g) => {
    const D = Number(g.currentTarget.value);
    s(() => Ta(D, r, n));
  };
  De(() => () => {
    var g;
    x.current !== null && window.cancelAnimationFrame(x.current), m.current = null, (g = d.current) == null || g.call(d), e == null || e(!1);
  }, [e]);
  const H = (g) => {
    var K;
    const D = (K = u.current) == null ? void 0 : K.getBoundingClientRect();
    if (!D || D.height <= 0)
      return;
    const O = ne(1 - (g - D.top) / D.height, 0, 1);
    s(() => Ta(O, r, n));
  }, ee = () => {
    x.current !== null && (window.cancelAnimationFrame(x.current), x.current = null);
    const g = m.current;
    m.current = null, g !== null && H(g);
  }, z = (g) => {
    m.current = g, x.current === null && (x.current = window.requestAnimationFrame(() => {
      x.current = null;
      const D = m.current;
      m.current = null, D !== null && H(D);
    }));
  }, ce = (g) => {
    !g.isPrimary || g.button !== 0 || (f.current = g.pointerId, g.currentTarget.setPointerCapture(g.pointerId), A(!0, !0), H(g.clientY));
  }, W = (g) => {
    f.current === g.pointerId && (z(g.clientY), g.preventDefault());
  }, re = (g) => {
    f.current === g.pointerId && (ee(), g.currentTarget.hasPointerCapture(g.pointerId) && g.currentTarget.releasePointerCapture(g.pointerId), f.current = null, A(!1));
  }, M = () => {
    var g;
    ee(), (g = d.current) == null || g.call(d), d.current = null, A(!1);
  }, I = (g) => {
    var K;
    if (g.button !== 0 || f.current !== null)
      return;
    (K = d.current) == null || K.call(d), A(!0, !0), H(g.clientY);
    const D = (le) => {
      z(le.clientY), le.preventDefault();
    }, O = () => M();
    window.addEventListener("mousemove", D), window.addEventListener("mouseup", O, { once: !0 }), d.current = () => {
      window.removeEventListener("mousemove", D), window.removeEventListener("mouseup", O);
    };
  }, L = (g) => {
    const D = g.shiftKey ? ma : Li;
    if (g.key === "ArrowUp" || g.key === "ArrowRight") {
      s((O) => Tt(O, D, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "ArrowDown" || g.key === "ArrowLeft") {
      s((O) => Tt(O, -D, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "PageUp") {
      s((O) => Tt(O, ma, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "PageDown") {
      s((O) => Tt(O, -ma, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "Home") {
      s(() => r), g.preventDefault();
      return;
    }
    g.key === "End" && (s(() => n), g.preventDefault());
  }, P = (g) => {
    g.currentTarget.contains(g.relatedTarget) || N(!1);
  };
  return /* @__PURE__ */ h(
    "div",
    {
      "aria-label": "Timeline zoom controls",
      role: "group",
      className: `absolute z-40 flex ${a ? "min-h-[17rem] w-12 py-3" : "min-h-[22rem] w-14 py-4"} group/zoomrail select-none flex-col items-center justify-center gap-3 px-2 text-[var(--ink-soft)] transition-[opacity,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] hover:opacity-100 focus-within:text-[var(--ink)] focus-within:opacity-100 ${Y} ${t}`,
      onBlur: P,
      onFocus: () => N(!0),
      onMouseEnter: () => $(!0),
      onMouseLeave: () => $(!1),
      onPointerEnter: () => $(!0),
      onPointerLeave: () => $(!1),
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ i(_o, { className: se })
          }
        ),
        /* @__PURE__ */ h(
          "label",
          {
            ref: u,
            className: `relative z-10 ${a ? "h-[12.5rem] w-8" : "h-[16rem] w-9"} cursor-ns-resize touch-none rounded-full focus-within:ring-2 focus-within:ring-[rgba(237,242,250,0.3)]`,
            onMouseDown: I,
            onPointerCancel: re,
            onPointerDown: ce,
            onPointerMove: W,
            onPointerUp: re,
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
                    clipPath: `inset(${(1 - q) * 100}% 0 0 0)`
                  }
                }
              ),
              /* @__PURE__ */ i(
                "span",
                {
                  className: `absolute left-1/2 grid ${T} ${F} -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(237,242,250,0.48)] bg-[rgba(237,242,250,0.95)] font-mono font-semibold text-[#0b0e14] shadow-[0_16px_32px_-22px_rgba(0,0,0,0.78)] ${w ? "scale-[1.04] transition-none" : "transition-[top,width,height,min-width,padding,transform,box-shadow,font-size] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: { top: `${Q}%` },
                  children: /* @__PURE__ */ h("span", { className: `transition-opacity duration-200 group-hover/zoomrail:opacity-100 group-focus-within/zoomrail:opacity-100 ${J ? "opacity-100" : "opacity-0"}`, children: [
                    Math.round(l * 100),
                    "%"
                  ] })
                }
              ),
              /* @__PURE__ */ i(
                "input",
                {
                  "aria-label": "Timeline zoom",
                  "aria-orientation": "vertical",
                  "aria-valuetext": `${Math.round(l * 100)} percent`,
                  type: "range",
                  min: "0",
                  max: "1",
                  step: "0.001",
                  value: q,
                  onBlur: () => A(!1),
                  onChange: B,
                  onKeyDown: L,
                  onPointerCancel: () => A(!1),
                  onPointerDown: () => A(!0, !0),
                  onPointerUp: () => A(!1),
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
            children: /* @__PURE__ */ i(Fo, { className: se })
          }
        )
      ]
    }
  );
}
function rr({
  className: t = "",
  company: a
}) {
  return /* @__PURE__ */ i("span", { className: `inline-flex shrink-0 items-center justify-center text-[var(--ink)] ${t}`, children: /* @__PURE__ */ i(Et, { classId: so(a), className: "h-[1rem] w-[1rem]" }) });
}
function Uo({
  compact: t = !1,
  company: a
}) {
  const n = a.logoMark, r = n ? oe().logoAssetPaths[n] : void 0, e = r && jn(n), s = e ? t ? "h-7 w-12 rounded-[0.72rem]" : "h-8 w-14 rounded-[0.82rem]" : t ? "h-7 w-7 rounded-[0.72rem]" : "h-8 w-8 rounded-[0.82rem]", l = e ? t ? "relative h-[11px] w-9 object-contain" : "relative h-3 w-11 object-contain" : t ? "relative h-[18px] w-[18px] object-contain" : "relative h-5 w-5 object-contain", u = t ? "text-[10px]" : "text-xs";
  return /* @__PURE__ */ i(
    "span",
    {
      "aria-label": `${a.name} logo`,
      className: `${s} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${r ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: `${a.name} logo`,
      children: r ? /* @__PURE__ */ i("img", { "aria-hidden": "true", alt: "", className: l, src: Na(r) }) : n ? /* @__PURE__ */ h(gt, { children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${Oe(a.accent, 0.35)}, transparent 48%)`
            }
          }
        ),
        ir(n, a.accent, u)
      ] }) : /* @__PURE__ */ i(rr, { className: t ? "h-4 w-4" : "h-5 w-5", company: a })
    }
  );
}
function ir(t, a, n) {
  const r = `relative font-semibold tracking-tight ${n}`;
  return t === "calendar" ? /* @__PURE__ */ i(Gt, { className: "relative h-7 w-7 text-[var(--ink)]", strokeWidth: 1.8 }) : t === "gpt" || t === "openai" ? /* @__PURE__ */ i("span", { className: r, children: "AI" }) : t === "claude" || t === "anthropic" ? /* @__PURE__ */ i("span", { className: r, children: "C" }) : t === "cursor" ? /* @__PURE__ */ i("span", { className: r, children: "C" }) : t === "gemini" || t === "google" ? /* @__PURE__ */ i("span", { className: r, children: "G" }) : t === "deepseek" ? /* @__PURE__ */ i("span", { className: r, children: "D" }) : t === "sora" ? /* @__PURE__ */ i(Pn, { className: "relative h-4 w-4", strokeWidth: 1.8 }) : t === "figure" ? /* @__PURE__ */ i("span", { className: r, children: "F" }) : t === "tesla" ? /* @__PURE__ */ i("span", { className: r, children: "T" }) : t === "xai" ? /* @__PURE__ */ i("span", { className: r, children: "x" }) : /* @__PURE__ */ i("span", { className: r, style: { color: a }, children: "AI" });
}
function Xo(t) {
  return t === "square" ? "rounded-[5px]" : t === "diamond" ? "rotate-45 rounded-[4px]" : "rounded-full";
}
function Nn(t) {
  return t.classId !== "events";
}
function Yo(t, a) {
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
function zo({
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
function Bo({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onModelSelect: l,
  productLine: u,
  productLineIndex: f,
  renderWindow: d,
  timelineStartDay: m,
  verticalScale: x = 1
}) {
  const w = ka(a, x), b = u.classId === "coding-harnesses", v = Ki(n.accent, pi, 0.34), N = Xo(u.markerShape), R = a ? "h-3.5 w-3.5" : "h-4 w-4", $ = a ? "absolute left-3 top-0 origin-bottom-left -translate-y-1 -rotate-[22deg]" : "absolute left-4 top-0 origin-bottom-left -translate-y-2 -rotate-[28deg] transition duration-300 group-hover:-translate-y-3", q = a ? "timeline-map-screen-label whitespace-nowrap rounded-[0.7rem] border px-1.5 py-0.5 font-bold tracking-[0.01em] shadow-[var(--soft-shadow)] backdrop-blur-sm" : "timeline-map-screen-label whitespace-nowrap rounded-[0.8rem] border bg-[var(--surface-strong)] px-2 py-1 font-bold tracking-[0.015em] shadow-[var(--soft-shadow)] backdrop-blur-sm group-hover:bg-[var(--surface)]", Q = a ? 10 : 12, se = Yo(n.productLines, f), J = se ? zo({
    primaryLine: se.productLine,
    productLine: u,
    timelineStartDay: m
  }) ?? 0 : 0;
  return /* @__PURE__ */ h(
    me.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: zn },
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
              borderColor: Oe(n.accent, 0.28),
              ...We(a ? 8 : 9)
            },
            children: [
              /* @__PURE__ */ i(Et, { classId: u.classId, className: a ? "h-3 w-3" : "h-3.5 w-3.5" }),
              u.shortLabel
            ]
          }
        ) }),
        /* @__PURE__ */ i(He, { initial: !1, mode: "popLayout", children: u.releases.map((T, F) => {
          var be, Te;
          const Y = u.releases[F - 1], A = t === T.articleSlug, B = A || _t(T.globalDay, T.endGlobalDay, d), H = !!Y && _t((Y == null ? void 0 : Y.globalDay) ?? T.globalDay, T.globalDay, d), ee = T.endGlobalDay > T.globalDay && _t(T.globalDay, T.endGlobalDay, d);
          if (!B && !H && !ee)
            return null;
          const z = ze(T.globalDay, m), ce = Y ? ze(Y.globalDay, m) : z, W = Y ? Math.max(0, z - ce) : 0, re = Y ? bo(T.gap, u.averageGap) : null, M = Ot(T.globalDay, T.endGlobalDay), I = ((be = u.latestRelease) == null ? void 0 : be.name) === T.name && ((Te = u.latestRelease) == null ? void 0 : Te.date) === T.date, L = I ? va(n.accent, 255, 0.12) : va(n.accent, 255, 0.24), P = Oe(n.accent, I ? 0.52 : 0.34), g = T.tags.includes("landmark-release"), D = I ? Oe(n.accent, 0.12) : g ? Oe(n.accent, 0.08) : void 0, K = T.eventKind === "event" ? "Open event" : "Open release", le = A ? `0 0 0 ${a ? 3 : 4}px rgba(237, 242, 250, 0.92), 0 0 0 ${a ? 7 : 8}px color-mix(in srgb, ${n.accent} 48%, transparent)` : g ? `0 0 0 ${a ? 5 : 6}px color-mix(in srgb, ${n.accent} 24%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 50%, transparent), 0 0 42px color-mix(in srgb, ${n.accent} 28%, transparent)` : I ? `0 0 0 ${a ? 4 : 5}px color-mix(in srgb, ${n.accent} 20%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 40%, transparent)` : `0 0 0 4px color-mix(in srgb, ${n.accent} 11%, transparent)`, te = A ? "saturate(1.45) brightness(1.14)" : g ? "saturate(1.38) brightness(1.1)" : I ? "saturate(1.35) brightness(1.08)" : void 0;
          return /* @__PURE__ */ h(
            me.div,
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
                Y && H ? /* @__PURE__ */ h(gt, { children: [
                  /* @__PURE__ */ i(
                    me.div,
                    {
                      initial: { opacity: 0, scaleX: 0 },
                      animate: { opacity: b ? 0.72 : 0.58, scaleX: 1 },
                      transition: $e,
                      className: `pointer-events-none absolute top-1/2 -translate-y-1/2 origin-left ${b ? "h-px" : "h-[2px]"}`,
                      style: {
                        backgroundColor: b ? v : n.accent,
                        left: `${ce}px`,
                        width: `${W}px`
                      }
                    }
                  ),
                  /* @__PURE__ */ i(
                    "div",
                    {
                      className: "timeline-gap absolute top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50",
                      style: {
                        left: `${ce + W / 2}px`,
                        "--gap-world-width": W
                      },
                      children: /* @__PURE__ */ h(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Gap of ${xa(T.gap)} between ${Y.name} and ${T.name}`,
                          onPointerDown: (ae) => ae.stopPropagation(),
                          onClick: (ae) => ae.stopPropagation(),
                          className: "group/gap relative flex h-6 cursor-default items-center justify-center outline-none",
                          children: [
                            /* @__PURE__ */ h(
                              "span",
                              {
                                className: "timeline-gap-collapse timeline-gap-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2 py-1 font-mono uppercase tracking-[0.1em] text-[var(--ink)] shadow-[var(--soft-shadow)] group-focus-visible/gap:border-[var(--edge-strong)]",
                                style: We(a ? 9 : 10),
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
                                    xa(T.gap),
                                    " gap"
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                    Y.dateLabel,
                                    " – ",
                                    T.dateLabel
                                  ] }),
                                  re ? /* @__PURE__ */ i("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: re }) : null
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ] }) : null,
                ee ? /* @__PURE__ */ i(
                  me.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: I ? 0.72 : 0.54, scaleX: 1 },
                    transition: $e,
                    className: `absolute top-1/2 z-10 origin-left -translate-y-1/2 rounded-full ${a ? "h-[7px]" : "h-2"}`,
                    style: {
                      backgroundColor: n.accent,
                      boxShadow: `0 0 18px color-mix(in srgb, ${n.accent} 34%, transparent)`,
                      left: `${z}px`,
                      minWidth: a ? "8px" : "10px",
                      width: `${M}px`
                    }
                  }
                ) : null,
                B ? /* @__PURE__ */ i(
                  me.div,
                  {
                    initial: { opacity: 0, scale: 0.82, y: a ? 6 : 8 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.82, y: a ? 6 : 8 },
                    transition: {
                      opacity: $e,
                      scale: $e,
                      y: $e
                    },
                    className: `absolute top-1/2 -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50 ${A ? "z-30" : "z-20"}`,
                    style: { left: `${z}px` },
                    children: /* @__PURE__ */ i("div", { className: "overflow-visible", children: /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        "data-timeline-pin": !0,
                        "aria-current": A ? "page" : void 0,
                        "aria-label": `${K} for ${T.name}, ${T.dateRangeLabel}`,
                        onClick: (ae) => {
                          ae.stopPropagation(), l(T.articleSlug);
                        },
                        onPointerDown: (ae) => ae.stopPropagation(),
                        className: `group relative block size-0 overflow-visible cursor-pointer text-left outline-none ${A ? "timeline-pin--selected" : ""}`,
                        children: [
                          /* @__PURE__ */ h("div", { className: "timeline-pin-marker-stack relative z-0 size-0 shrink-0", children: [
                            g ? /* @__PURE__ */ i(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: `${a ? "h-8 w-8" : "h-10 w-10"} timeline-pin-landmark-aura absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ${N}`,
                                style: { "--pin-accent": n.accent }
                              }
                            ) : null,
                            A ? /* @__PURE__ */ i(
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
                                className: `${R} timeline-pin-marker absolute left-0 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 border-[3px] border-[var(--surface-strong)] transition duration-300 ${N} ${A ? "timeline-pin-marker--selected scale-[1.18]" : "group-hover:scale-[1.22] group-focus-visible:scale-[1.22]"}`,
                                style: {
                                  backgroundColor: n.accent,
                                  boxShadow: le,
                                  filter: te
                                }
                              }
                            )
                          ] }),
                          /* @__PURE__ */ i("div", { className: `${$} z-[2]`, children: /* @__PURE__ */ i(
                            "div",
                            {
                              className: `${q} ${A ? "timeline-pin-label--selected" : ""}`,
                              style: {
                                backgroundColor: A ? "var(--surface-strong)" : D,
                                borderColor: A ? Oe(n.accent, 0.88) : P,
                                borderWidth: A ? 2 : void 0,
                                color: A ? va(n.accent, 255, 0.06) : L,
                                boxShadow: A ? `0 0 0 1px color-mix(in srgb, ${n.accent} 55%, transparent)` : void 0,
                                textShadow: A ? "0 1px 14px rgba(0, 0, 0, 0.62)" : I ? "0 1px 12px rgba(0, 0, 0, 0.5)" : "0 1px 10px rgba(0, 0, 0, 0.38)",
                                filter: A ? "saturate(1.28)" : I ? "saturate(1.18)" : void 0,
                                ...We(Q)
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
                                  u.shortLabel
                                ] }),
                                /* @__PURE__ */ i("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: T.name }),
                                /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                  T.eventTypeLabel,
                                  " · ",
                                  T.dateRangeLabel
                                ] }),
                                Y ? /* @__PURE__ */ h("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: [
                                  xa(T.gap),
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
        u.latestRelease && e > u.latestRelease.endGlobalDay && _t(u.latestRelease.endGlobalDay, e, d) ? /* @__PURE__ */ h(gt, { children: [
          /* @__PURE__ */ i(
            me.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: b ? 0.48 : 0.42, scaleX: 1 },
              transition: $e,
              className: `absolute top-1/2 origin-left -translate-y-1/2 ${b ? "h-px" : "quiet-extension-flow h-[2px]"}`,
              style: {
                backgroundColor: b ? v : void 0,
                left: `${ze(u.latestRelease.endGlobalDay, m)}px`,
                "--quiet-flow-duration": `${a ? 5.4 : 6.4}s`,
                "--quiet-line-color": n.accent,
                width: `${Ot(u.latestRelease.endGlobalDay, e)}px`
              }
            }
          ),
          /* @__PURE__ */ i(
            "div",
            {
              className: "absolute top-1/2 z-0 -translate-y-1/2 pl-3",
              style: { left: `${ze(e, m)}px` },
              children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ h(
                "div",
                {
                  className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1 font-mono uppercase tracking-[0.14em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                  style: We(a ? 9 : 10),
                  children: [
                    "+",
                    Sa(u, e),
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
const Oo = Nt.memo(Bo);
function Wo({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onCompanyBlur: l,
  onCompanyFocus: u,
  onModelSelect: f,
  renderWindow: d,
  timelineStartDay: m,
  verticalScale: x = 1
}) {
  const { lineGap: w } = Ra(n.productLines.length, a, x), b = () => u == null ? void 0 : u(n.id), v = () => l == null ? void 0 : l();
  return /* @__PURE__ */ i(
    me.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: zn },
      transition: {
        opacity: $e
      },
      className: "relative flex flex-col justify-center",
      onClick: (N) => {
        const R = N.target;
        R instanceof Element && R.closest("button, a, input, label, select, textarea, [data-row-focus-label]") || b();
      },
      onMouseEnter: b,
      onMouseLeave: v,
      onPointerEnter: (N) => {
        N.pointerType !== "touch" && b();
      },
      onPointerLeave: (N) => {
        N.pointerType !== "touch" && v();
      },
      style: { height: `${Aa(n, a, x)}px`, gap: `${w}px` },
      children: /* @__PURE__ */ i(He, { initial: !1, mode: "popLayout", children: n.productLines.map((N, R) => /* @__PURE__ */ i(
        Oo,
        {
          activeArticleSlug: t,
          compact: a,
          company: n,
          companyIndex: r,
          currentGlobalDay: e,
          maxDays: s,
          onModelSelect: f,
          productLine: N,
          productLineIndex: R,
          renderWindow: d,
          timelineStartDay: m,
          verticalScale: x
        },
        `${n.id}-${N.id}`
      )) })
    }
  );
}
function Mn(t, a) {
  return a ? t.productLines.some(
    (n) => n.releases.some((r) => r.articleSlug === a)
  ) : !1;
}
const or = Nt.memo(
  Wo,
  (t, a) => {
    const n = Mn(t.company, t.activeArticleSlug), r = Mn(a.company, a.activeArticleSlug);
    return t.compact === a.compact && t.company === a.company && t.companyIndex === a.companyIndex && t.currentGlobalDay === a.currentGlobalDay && t.maxDays === a.maxDays && t.timelineStartDay === a.timelineStartDay && t.verticalScale === a.verticalScale && go(t.renderWindow, a.renderWindow) && n === r && (!n || t.activeArticleSlug === a.activeArticleSlug);
  }
);
function Ho({
  compact: t = !1,
  company: a,
  currentGlobalDay: n,
  index: r,
  maxSummaryQuietDays: e
}) {
  var d, m;
  const s = qe(), l = Sa(a, n), u = vo(l, e), f = a.productLines.length > 1;
  return /* @__PURE__ */ h(
    me.div,
    {
      layout: !0,
      initial: { opacity: 0, y: t ? 12 : 14 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: t ? 12 : 14 },
      transition: {
        layout: fi,
        opacity: $e,
        y: $e
      },
      className: "rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] p-4",
      children: [
        /* @__PURE__ */ h("div", { className: "min-w-0", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ i(rr, { className: "h-7 w-7", company: a }),
            /* @__PURE__ */ h("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ i("p", { className: "truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.name }),
              /* @__PURE__ */ h("p", { className: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: [
                s.significanceLabel,
                " ",
                a.significanceScore
              ] })
            ] })
          ] }),
          f ? /* @__PURE__ */ i("div", { className: "mt-3 space-y-2", children: a.productLines.map((x) => {
            var w;
            return /* @__PURE__ */ h("div", { className: "min-w-0 rounded-[0.85rem] border border-[var(--edge)] bg-[rgba(255,255,255,0.02)] px-3 py-2", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center gap-2 text-xs font-semibold tracking-tight text-[var(--ink)]", children: [
                  /* @__PURE__ */ i(Et, { classId: x.classId, className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ i("span", { className: "truncate", children: x.shortLabel })
                ] }),
                /* @__PURE__ */ i("span", { className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]", children: x.significanceScore })
              ] }),
              /* @__PURE__ */ i("p", { className: "mt-1 truncate text-sm text-[var(--ink-soft)]", children: ((w = x.latestRelease) == null ? void 0 : w.name) ?? "No releases" })
            ] }, `${a.id}-${x.id}-summary-line`);
          }) }) : /* @__PURE__ */ h(gt, { children: [
            /* @__PURE__ */ i("p", { className: "mt-3 text-base font-semibold tracking-tight text-[var(--ink)]", children: xo(l) }),
            /* @__PURE__ */ h("div", { className: "mt-2 min-w-0", children: [
              /* @__PURE__ */ i("p", { className: "truncate text-sm text-[var(--ink-soft)]", children: ((d = a.latestRelease) == null ? void 0 : d.name) ?? "No releases" }),
              /* @__PURE__ */ i("p", { className: "mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]", children: ((m = a.latestRelease) == null ? void 0 : m.dateRangeLabel) ?? "Date unavailable" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "mt-4 h-1.5 rounded-full bg-[var(--edge)]", children: /* @__PURE__ */ i(
          "div",
          {
            className: "h-full origin-left rounded-full",
            style: { backgroundColor: a.accent, width: `${u}%` }
          }
        ) })
      ]
    },
    `${a.id}-${t ? "mobile" : "desktop"}-summary`
  );
}
const sr = Nt.memo(Ho);
function Vo(t) {
  const a = t.companyLogoMark === "openai" ? "gpt" : t.companyLogoMark === "google" ? "gemini" : t.companyLogoMark === "anthropic" ? "claude" : t.companyLogoMark;
  return {
    modelLabel: t.name,
    modelMark: a
  };
}
function Dn({
  accent: t,
  label: a,
  mark: n,
  size: r
}) {
  const e = r === "large", s = oe().logoAssetPaths[n], l = s && jn(n), u = l ? e ? "h-16 w-28 rounded-[1.25rem]" : "h-11 w-20 rounded-[0.95rem]" : e ? "h-16 w-16 rounded-[1.25rem]" : "h-11 w-11 rounded-[0.95rem]", f = l ? e ? "relative h-5 w-20 object-contain" : "relative h-3 w-14 object-contain" : e ? "relative h-10 w-10 object-contain" : "relative h-7 w-7 object-contain", d = e ? "text-lg" : "text-sm", m = n === "calendar" ? `${a} event icon` : `${a} logo`;
  return /* @__PURE__ */ h(
    "span",
    {
      "aria-label": m,
      className: `${u} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${s ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: m,
      children: [
        s ? null : /* @__PURE__ */ i(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${Oe(t, 0.35)}, transparent 48%)`
            }
          }
        ),
        s ? /* @__PURE__ */ i("img", { "aria-hidden": "true", alt: "", className: f, src: Na(s) }) : ir(n, t, d)
      ]
    }
  );
}
function Cn({
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
          /* @__PURE__ */ i(Or, { className: "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5", strokeWidth: 1.8 })
        ] })
      ]
    }
  );
}
function Go({ media: t }) {
  const [a, n] = ve(!1);
  return a ? null : /* @__PURE__ */ h("figure", { className: "mt-7 overflow-hidden rounded-[1.25rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)]", children: [
    /* @__PURE__ */ i(
      "img",
      {
        src: Na(t.src),
        alt: t.alt,
        className: "w-full bg-black object-contain",
        loading: "lazy",
        onError: () => n(!0)
      }
    ),
    t.caption ? /* @__PURE__ */ i("figcaption", { className: "border-t border-[var(--edge)] px-4 py-3 text-xs leading-5 text-[var(--ink-soft)]", children: t.caption }) : null
  ] });
}
function jo({
  entry: t,
  onBack: a,
  onNavigate: n,
  requestedSlug: r
}) {
  const e = qe(), s = (t == null ? void 0 : t.article) ?? null, l = t ? t.eventKind === "event" ? {
    modelLabel: t.name,
    modelMark: "calendar"
  } : (s == null ? void 0 : s.logo) ?? Vo(t) : null, u = (s == null ? void 0 : s.title) ?? (t == null ? void 0 : t.name) ?? e.routeMissingTitle, f = (s == null ? void 0 : s.summary) ?? (t ? `${t.name} is tracked as a ${t.eventTypeLabel.toLowerCase()} from ${t.companyName} in the ${t.productLineLabel} line.` : e.routeMissingDetail.replace("{slug}", r));
  return /* @__PURE__ */ i(
    me.aside,
    {
      initial: { opacity: 0, x: 72 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 72 },
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      className: "fixed inset-y-0 right-0 z-40 w-full overflow-y-auto border-l border-[var(--edge-strong)] bg-[rgba(8,11,16,0.98)] shadow-[0_34px_100px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl md:w-[min(760px,58vw)]",
      children: /* @__PURE__ */ h("article", { className: "min-h-full px-5 py-5 md:px-8 md:py-8", children: [
        /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: a,
              className: "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
              children: [
                /* @__PURE__ */ i($r, { className: "h-4 w-4", strokeWidth: 1.8 }),
                e.articleBackLabel
              ]
            }
          ),
          t ? /* @__PURE__ */ h("span", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: [
            /* @__PURE__ */ i(Gt, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
            t.dateRangeLabel
          ] }) : null
        ] }),
        t && l ? /* @__PURE__ */ h("div", { className: "mt-9 flex items-start gap-4", children: [
          /* @__PURE__ */ i(Dn, { accent: t.accent, label: l.modelLabel, mark: l.modelMark, size: "large" }),
          /* @__PURE__ */ i(Dn, { accent: t.accent, label: t.companyName, mark: t.companyLogoMark, size: "small" })
        ] }) : null,
        /* @__PURE__ */ i("p", { className: "mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: (s == null ? void 0 : s.eyebrow) ?? (t == null ? void 0 : t.eventTypeLabel) ?? "Unknown route" }),
        /* @__PURE__ */ i("h1", { className: "mt-3 max-w-[12ch] text-4xl leading-none tracking-tighter text-[var(--ink)] md:text-6xl", children: u }),
        /* @__PURE__ */ i("p", { className: "mt-5 max-w-[68ch] text-base leading-8 text-[var(--ink-soft)] md:text-lg", children: (s == null ? void 0 : s.dek) ?? f }),
        s != null && s.media ? /* @__PURE__ */ i(Go, { media: s.media }) : null,
        t ? /* @__PURE__ */ i("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: ((s == null ? void 0 : s.facts) ?? [
          { label: "Company", value: t.companyName },
          { label: "Product line", value: t.productLineLabel },
          { label: t.eventKind === "event" ? "Event date" : "Release date", value: t.dateRangeLabel },
          { label: "Type", value: t.eventTypeLabel }
        ]).map((d) => /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
          /* @__PURE__ */ i("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: d.label }),
          /* @__PURE__ */ i("p", { className: "mt-1 text-sm font-semibold text-[var(--ink)]", children: d.value })
        ] }, `${d.label}-${d.value}`)) }) : null,
        /* @__PURE__ */ h("section", { className: "mt-9 border-t border-[var(--edge)] pt-7", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
            /* @__PURE__ */ i(In, { className: "h-4 w-4", strokeWidth: 1.8 }),
            "Summary"
          ] }),
          /* @__PURE__ */ i("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: f }),
          s != null && s.impact ? /* @__PURE__ */ i("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: s.impact }) : null
        ] }),
        s == null ? void 0 : s.sections.map((d) => /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
          /* @__PURE__ */ i("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: d.heading }),
          /* @__PURE__ */ i("div", { className: "mt-4 space-y-4", children: d.body.map((m) => /* @__PURE__ */ i("p", { className: "text-base leading-8 text-[var(--ink-soft)]", children: m }, m)) })
        ] }, d.heading)),
        s != null && s.sources.length ? /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
          /* @__PURE__ */ i("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: "Sources" }),
          /* @__PURE__ */ i("div", { className: "mt-4 space-y-2", children: s.sources.map((d) => /* @__PURE__ */ h(
            "a",
            {
              href: d.url,
              target: "_blank",
              rel: "noreferrer",
              className: "flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]",
              children: [
                /* @__PURE__ */ i("span", { children: d.label }),
                /* @__PURE__ */ i(Ur, { className: "h-4 w-4 shrink-0", strokeWidth: 1.8 })
              ]
            },
            d.url
          )) })
        ] }) : null,
        t ? /* @__PURE__ */ h("div", { className: "mt-8 grid gap-3 border-t border-[var(--edge)] pt-7 sm:grid-cols-2", children: [
          /* @__PURE__ */ i(Cn, { label: "Previous", onNavigate: n, slug: t.previousSlug, title: t.previousName }),
          /* @__PURE__ */ i(Cn, { label: "Next", onNavigate: n, slug: t.nextSlug, title: t.nextName })
        ] }) : /* @__PURE__ */ i("div", { className: "mt-8 rounded-[1.1rem] border border-[var(--edge)] bg-[var(--surface)] p-5", children: /* @__PURE__ */ i("p", { className: "text-sm leading-6 text-[var(--ink-soft)]", children: "This route does not match a known model or event entry." }) })
      ] })
    },
    "model-article-panel"
  );
}
function Sn({
  detail: t,
  title: a
}) {
  const n = qe();
  return /* @__PURE__ */ i("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ i("div", { className: "mx-auto flex min-h-[100dvh] max-w-[880px] items-center px-5 py-10 md:px-8", children: /* @__PURE__ */ h("div", { className: "rounded-[2rem] border border-[var(--edge)] bg-[var(--surface)] p-8 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: [
    /* @__PURE__ */ i("p", { className: "text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]", children: n.statusEyebrow }),
    /* @__PURE__ */ i("h1", { className: "mt-4 text-4xl tracking-tighter text-[var(--ink)]", children: a }),
    /* @__PURE__ */ i("p", { className: "mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--ink-soft)]", children: t })
  ] }) }) });
}
const qo = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`, Ko = `
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
`, Zo = `
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
`, Qo = `
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
`, Jo = `
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
  const t = j(null), a = j(!1), n = j(!1);
  return De(() => {
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
    const s = (C, E) => {
      const _ = e.createShader(C);
      return _ ? (e.shaderSource(_, E), e.compileShader(_), e.getShaderParameter(_, e.COMPILE_STATUS) ? _ : (console.warn(e.getShaderInfoLog(_)), e.deleteShader(_), null)) : null;
    }, l = (C) => {
      const E = s(e.VERTEX_SHADER, qo), _ = s(e.FRAGMENT_SHADER, C);
      if (!E || !_)
        return E && e.deleteShader(E), _ && e.deleteShader(_), null;
      const S = e.createProgram();
      return S ? (e.attachShader(S, E), e.attachShader(S, _), e.linkProgram(S), e.deleteShader(E), e.deleteShader(_), e.getProgramParameter(S, e.LINK_STATUS) ? S : (console.warn(e.getProgramInfoLog(S)), e.deleteProgram(S), null)) : (e.deleteShader(E), e.deleteShader(_), null);
    }, u = l(ns), f = l(Ko), d = l(Zo), m = l(Qo), x = l(Jo), w = l(es), b = l(ts), v = l(as), N = () => {
      [u, f, d, m, x, w, b, v].forEach((C) => {
        C && e.deleteProgram(C);
      });
    };
    if (!u || !f || !d || !m || !x || !w || !b || !v) {
      N();
      return;
    }
    const R = e.createBuffer();
    if (!R) {
      N();
      return;
    }
    e.bindBuffer(e.ARRAY_BUFFER, R), e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      e.STATIC_DRAW
    );
    const $ = (C) => {
      const E = e.getAttribLocation(C, "aPosition");
      E < 0 || (e.bindBuffer(e.ARRAY_BUFFER, R), e.enableVertexAttribArray(E), e.vertexAttribPointer(E, 2, e.FLOAT, !1, 0, 0));
    }, q = {
      resolution: e.getUniformLocation(u, "uResolution"),
      fluidTexel: e.getUniformLocation(u, "uFluidTexel"),
      widgetRect: e.getUniformLocation(u, "uWidgetRect"),
      elapsedTime: e.getUniformLocation(u, "uElapsedTime"),
      emitterDebug: e.getUniformLocation(u, "uEmitterDebug"),
      emitterSeed: e.getUniformLocation(u, "uEmitterSeed"),
      velocityMap: e.getUniformLocation(u, "uVelocityMap"),
      dyeMap: e.getUniformLocation(u, "uDyeMap")
    }, Q = {
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
      velocityMap: e.getUniformLocation(d, "uVelocityMap"),
      texel: e.getUniformLocation(d, "uTexel"),
      aspect: e.getUniformLocation(d, "uAspect")
    }, J = {
      velocityMap: e.getUniformLocation(m, "uVelocityMap"),
      curlMap: e.getUniformLocation(m, "uCurlMap"),
      texel: e.getUniformLocation(m, "uTexel"),
      deltaTime: e.getUniformLocation(m, "uDeltaTime"),
      strength: e.getUniformLocation(m, "uStrength"),
      aspect: e.getUniformLocation(m, "uAspect")
    }, T = {
      velocityMap: e.getUniformLocation(x, "uVelocityMap"),
      texel: e.getUniformLocation(x, "uTexel"),
      obstacleRect: e.getUniformLocation(x, "uObstacleRect"),
      aspect: e.getUniformLocation(x, "uAspect")
    }, F = {
      pressureMap: e.getUniformLocation(w, "uPressureMap"),
      divergenceMap: e.getUniformLocation(w, "uDivergenceMap"),
      texel: e.getUniformLocation(w, "uTexel"),
      obstacleRect: e.getUniformLocation(w, "uObstacleRect"),
      aspect: e.getUniformLocation(w, "uAspect")
    }, Y = {
      velocityMap: e.getUniformLocation(b, "uVelocityMap"),
      pressureMap: e.getUniformLocation(b, "uPressureMap"),
      texel: e.getUniformLocation(b, "uTexel"),
      obstacleRect: e.getUniformLocation(b, "uObstacleRect"),
      aspect: e.getUniformLocation(b, "uAspect")
    }, A = {
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
    }, B = (C) => {
      const E = e.createTexture(), _ = e.createFramebuffer();
      if (!E || !_)
        return E && e.deleteTexture(E), _ && e.deleteFramebuffer(_), !1;
      e.bindTexture(e.TEXTURE_2D, E), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, C, null), e.bindFramebuffer(e.FRAMEBUFFER, _), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, E, 0);
      const S = e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE;
      return e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(E), e.deleteFramebuffer(_), S;
    }, ee = (() => {
      const C = e.getExtension("OES_texture_half_float"), E = e.getExtension("OES_texture_half_float_linear");
      if (e.getExtension("EXT_color_buffer_half_float"), C && E && B(C.HALF_FLOAT_OES))
        return {
          filter: e.LINEAR,
          type: C.HALF_FLOAT_OES
        };
      const _ = e.getExtension("OES_texture_float"), S = e.getExtension("OES_texture_float_linear");
      return e.getExtension("WEBGL_color_buffer_float"), _ && S && B(e.FLOAT) ? {
        filter: e.LINEAR,
        type: e.FLOAT
      } : {
        filter: e.LINEAR,
        type: e.UNSIGNED_BYTE
      };
    })(), z = (C, E, _) => {
      const S = e.createTexture(), G = e.createFramebuffer();
      return !S || !G ? (S && e.deleteTexture(S), G && e.deleteFramebuffer(G), null) : (e.bindTexture(e.TEXTURE_2D, S), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, ee.filter), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, ee.filter), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, C, E, 0, e.RGBA, ee.type, null), e.bindFramebuffer(e.FRAMEBUFFER, G), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, S, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(S), e.deleteFramebuffer(G), null) : (e.viewport(0, 0, C, E), e.clearColor(_[0], _[1], _[2], _[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null), { framebuffer: G, height: E, texture: S, width: C }));
    }, ce = (C, E) => {
      e.bindFramebuffer(e.FRAMEBUFFER, C.framebuffer), e.viewport(0, 0, C.width, C.height), e.clearColor(E[0], E[1], E[2], E[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null);
    }, W = (C) => {
      e.deleteFramebuffer(C.framebuffer), e.deleteTexture(C.texture);
    }, re = () => {
      const C = Math.min(window.devicePixelRatio || 1, 1.3), E = Math.max(120, Math.min(340, Math.floor(window.innerWidth * C / 5))), _ = Math.max(80, Math.min(220, Math.floor(window.innerHeight * C / 5)));
      return [E, _];
    };
    let M = 0, I = !1, L = null, P = null, g = null, D = null, O = null, K = 0, le = 0, te = 0;
    const be = performance.now(), Te = window.matchMedia("(prefers-reduced-motion: reduce)"), ae = [-1, -1, -1, -1];
    let Z = [0.5, 0.5], ie = [0, 0], Ae = 0, Ie = null, Le = be;
    const X = () => {
      const [C, E] = re();
      if ((L == null ? void 0 : L[0].width) === C && L[0].height === E)
        return !0;
      L == null || L.forEach(W), P == null || P.forEach(W), g == null || g.forEach(W), D && W(D), O && W(O);
      const _ = [
        z(C, E, [0.5, 0.5, 0, 1]),
        z(C, E, [0.5, 0.5, 0, 1])
      ], S = [
        z(C, E, [0.5, 0, 0, 1]),
        z(C, E, [0.5, 0, 0, 1])
      ], G = [
        z(C, E, [0, 0, 0, 0]),
        z(C, E, [0, 0, 0, 0])
      ], _e = z(C, E, [0.5, 0, 0, 1]), Me = z(C, E, [0.5, 0, 0, 1]), Xe = [..._, ...S, ...G, _e, Me];
      return Xe.some((Fe) => !Fe) ? (Xe.forEach((Fe) => {
        Fe && W(Fe);
      }), L = null, P = null, g = null, D = null, O = null, !1) : (L = _, P = S, g = G, D = _e, O = Me, K = 0, le = 0, te = 0, !0);
    };
    let fe = be;
    const Ke = 0.5, pe = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ], Pe = () => {
      const E = Math.max(1, Math.floor(window.innerWidth * 1)), _ = Math.max(1, Math.floor(window.innerHeight * 1));
      (r.width !== E || r.height !== _) && (r.width = E, r.height = _, e.viewport(0, 0, E, _)), e.useProgram(u), e.uniform2f(q.resolution, E, _), X();
    }, k = (C) => {
      const E = C * 60;
      Ae *= Math.pow(0.9, E), ie = [
        ie[0] * Math.pow(0.94, E),
        ie[1] * Math.pow(0.94, E)
      ];
    }, Ze = (C) => {
      if (!a.current || C.pointerType === "touch")
        return;
      const E = Math.max(window.innerWidth, 1), _ = Math.max(window.innerHeight, 1), S = [
        Math.max(0, Math.min(1, C.clientX / E)),
        Math.max(0, Math.min(1, 1 - C.clientY / _))
      ], G = performance.now(), _e = Math.max((G - Le) / 1e3, 1 / 120);
      if (Ie) {
        const Me = [
          Math.max(-7.5, Math.min(7.5, (S[0] - Ie[0]) / _e)),
          Math.max(-7.5, Math.min(7.5, (S[1] - Ie[1]) / _e))
        ];
        ie = [
          ie[0] + (Me[0] - ie[0]) * 0.74,
          ie[1] + (Me[1] - ie[1]) * 0.74
        ];
      }
      Z = S, Ie = S, Le = G, Ae = Math.min(1, Ae + 0.92), Te.matches && Ue(G);
    }, ot = () => {
      const C = Math.max(window.innerWidth, 1), E = Math.max(window.innerHeight, 1), S = Array.from(document.querySelectorAll(".timeline-fluid-obstacle")).find((_e) => {
        const Me = _e.getBoundingClientRect(), Xe = window.getComputedStyle(_e);
        return Xe.display !== "none" && Xe.visibility !== "hidden" && Me.width > 1 && Me.height > 1 && Me.bottom > 0 && Me.top < E && Me.right > 0 && Me.left < C;
      });
      if (!S)
        return [-1, -1, -1, -1];
      const G = S.getBoundingClientRect();
      return [
        Math.max(0, Math.min(1, G.left / C)),
        Math.max(0, Math.min(1, 1 - G.bottom / E)),
        Math.max(0, Math.min(1, G.right / C)),
        Math.max(0, Math.min(1, 1 - G.top / E))
      ];
    }, xe = (C, E) => {
      if (!L || !P || !g || !D || !O)
        return;
      const _ = r.width / Math.max(r.height, 1);
      let S = L[K], G = L[1 - K];
      const _e = g[te];
      e.bindFramebuffer(e.FRAMEBUFFER, G.framebuffer), e.viewport(0, 0, G.width, G.height), e.useProgram(f), $(f), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, _e.texture), e.uniform1i(Q.velocityMap, 0), e.uniform1i(Q.dyeMap, 1), e.uniform2f(Q.texel, 1 / S.width, 1 / S.height), e.uniform2f(Q.pointerPosition, Z[0], Z[1]), e.uniform2f(Q.pointerVelocity, ie[0], ie[1]), e.uniform1f(Q.pointerActive, a.current ? Ae : 0), e.uniform1f(Q.pointerRadius, 0.088), e.uniform1f(Q.deltaTime, C), e.uniform1f(Q.elapsedTime, E), e.uniform1f(Q.aspect, _), e.uniform4f(Q.emitterSeed, pe[0], pe[1], pe[2], pe[3]), e.drawArrays(e.TRIANGLES, 0, 6), K = 1 - K, S = L[K], e.bindFramebuffer(e.FRAMEBUFFER, O.framebuffer), e.viewport(0, 0, O.width, O.height), e.useProgram(d), $(d), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.uniform1i(se.velocityMap, 0), e.uniform2f(se.texel, 1 / S.width, 1 / S.height), e.uniform1f(se.aspect, _), e.drawArrays(e.TRIANGLES, 0, 6), G = L[1 - K], e.bindFramebuffer(e.FRAMEBUFFER, G.framebuffer), e.viewport(0, 0, G.width, G.height), e.useProgram(m), $(m), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, O.texture), e.uniform1i(J.velocityMap, 0), e.uniform1i(J.curlMap, 1), e.uniform2f(J.texel, 1 / S.width, 1 / S.height), e.uniform1f(J.deltaTime, C * 0.25), e.uniform1f(J.strength, 13), e.uniform1f(J.aspect, _), e.drawArrays(e.TRIANGLES, 0, 6), K = 1 - K, S = L[K], e.bindFramebuffer(e.FRAMEBUFFER, D.framebuffer), e.viewport(0, 0, D.width, D.height), e.useProgram(x), $(x), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.uniform1i(T.velocityMap, 0), e.uniform2f(T.texel, 1 / S.width, 1 / S.height), e.uniform4f(T.obstacleRect, ae[0], ae[1], ae[2], ae[3]), e.uniform1f(T.aspect, _), e.drawArrays(e.TRIANGLES, 0, 6), P.forEach((Fe) => ce(Fe, [0.5, 0, 0, 1])), le = 0;
      for (let Fe = 0; Fe < 12; Fe += 1) {
        const de = P[le], Qe = P[1 - le];
        e.bindFramebuffer(e.FRAMEBUFFER, Qe.framebuffer), e.viewport(0, 0, Qe.width, Qe.height), e.useProgram(w), $(w), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, de.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, D.texture), e.uniform1i(F.pressureMap, 0), e.uniform1i(F.divergenceMap, 1), e.uniform2f(F.texel, 1 / de.width, 1 / de.height), e.uniform4f(F.obstacleRect, ae[0], ae[1], ae[2], ae[3]), e.uniform1f(F.aspect, _), e.drawArrays(e.TRIANGLES, 0, 6), le = 1 - le;
      }
      G = L[1 - K], e.bindFramebuffer(e.FRAMEBUFFER, G.framebuffer), e.viewport(0, 0, G.width, G.height), e.useProgram(b), $(b), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, P[le].texture), e.uniform1i(Y.velocityMap, 0), e.uniform1i(Y.pressureMap, 1), e.uniform2f(Y.texel, 1 / S.width, 1 / S.height), e.uniform4f(Y.obstacleRect, ae[0], ae[1], ae[2], ae[3]), e.uniform1f(Y.aspect, _), e.drawArrays(e.TRIANGLES, 0, 6), K = 1 - K, S = L[K];
      const Me = g[te], Xe = g[1 - te];
      e.bindFramebuffer(e.FRAMEBUFFER, Xe.framebuffer), e.viewport(0, 0, Xe.width, Xe.height), e.useProgram(v), $(v), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, S.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Me.texture), e.uniform1i(A.velocityMap, 0), e.uniform1i(A.dyeMap, 1), e.uniform2f(A.pointerPosition, Z[0], Z[1]), e.uniform2f(A.pointerVelocity, ie[0], ie[1]), e.uniform1f(A.pointerActive, a.current ? Ae : 0), e.uniform1f(A.pointerRadius, 0.088), e.uniform1f(A.deltaTime, C), e.uniform1f(A.elapsedTime, E), e.uniform1f(A.aspect, _), e.uniform4f(A.emitterSeed, pe[0], pe[1], pe[2], pe[3]), e.drawArrays(e.TRIANGLES, 0, 6), te = 1 - te;
    }, Ne = (C) => {
      if (!L || !g)
        return;
      const E = L[K], _ = g[te];
      e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, r.width, r.height), e.useProgram(u), $(u), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, E.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, _.texture), e.uniform1i(q.velocityMap, 0), e.uniform1i(q.dyeMap, 1), e.uniform2f(q.resolution, r.width, r.height), e.uniform2f(q.fluidTexel, 1 / E.width, 1 / E.height);
      const S = ot();
      e.uniform4f(q.widgetRect, S[0], S[1], S[2], S[3]), e.uniform1f(q.elapsedTime, C), e.uniform1f(q.emitterDebug, n.current ? 1 : 0), e.uniform4f(q.emitterSeed, pe[0], pe[1], pe[2], pe[3]), e.drawArrays(e.TRIANGLES, 0, 6);
    }, Ue = (C) => {
      Pe();
      const E = Math.min(Math.max((C - fe) / 1e3, 1 / 120), 1 / 20);
      fe = C;
      const _ = (C - be) / 1e3, S = E * Ke, G = _ * Ke;
      k(E), xe(S, G), Ne(G);
    }, Jt = (C) => {
      I || (M = window.requestAnimationFrame(Jt), !document.hidden && Ue(C));
    }, Se = () => {
      I || (Pe(), Ue(be + 1e3), Te.matches || (M = window.requestAnimationFrame(Jt)));
    };
    return window.addEventListener("resize", Pe), window.addEventListener("pointermove", Ze, { passive: !0 }), Se(), () => {
      I = !0, window.cancelAnimationFrame(M), window.removeEventListener("resize", Pe), window.removeEventListener("pointermove", Ze), L == null || L.forEach(W), P == null || P.forEach(W), g == null || g.forEach(W), D && W(D), O && W(O), e.deleteBuffer(R), N();
    };
  }, []), /* @__PURE__ */ h(gt, { children: [
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
function lr({
  boardView: t,
  hiddenCompanyCount: a,
  onShowHiddenCompanies: n
}) {
  const r = a > 0, e = qe();
  return /* @__PURE__ */ i("div", { className: "flex min-h-[18rem] items-center justify-center px-6 py-14", children: /* @__PURE__ */ h("div", { className: "max-w-[34rem] text-center", children: [
    /* @__PURE__ */ i("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink-soft)]", children: /* @__PURE__ */ i(rt, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ i("p", { className: "mt-5 text-lg font-semibold tracking-tight text-[var(--ink)]", children: r ? `All visible ${e.groupPluralLabel} are hidden` : `${t.label} has no releases yet` }),
    /* @__PURE__ */ i("p", { className: "mt-2 text-sm leading-6 text-[var(--ink-soft)]", children: r ? `Show hidden ${e.groupPluralLabel} or turn on another product line to repopulate the timeline.` : e.emptyBoardDescription }),
    r ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        onClick: n,
        className: "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
        children: [
          /* @__PURE__ */ i(Vt, { className: "h-4 w-4", strokeWidth: 1.8 }),
          e.showHiddenLabel
        ]
      }
    ) : null
  ] }) });
}
function is() {
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
function cr({
  activeCompanyId: t,
  compact: a = !1,
  onCompanyBlur: n,
  onCompanyFocus: r,
  onCompanyTap: e,
  railWidth: s,
  rowLayouts: l,
  timelineWidth: u
}) {
  return /* @__PURE__ */ i("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 z-[6]", children: l.map((f) => {
    const d = t === f.company.id;
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
          width: `${u + s}px`
        },
        children: /* @__PURE__ */ i(
          "div",
          {
            className: `absolute inset-x-0 top-1/2 h-[calc(100%+1.25rem)] -translate-y-1/2 border-y transition duration-200 ${d ? "opacity-100" : "opacity-0"}`,
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
function dr({
  compact: t = !1,
  onClearFocus: a,
  onCompanyHide: n,
  onCompanyMove: r,
  onPointerEnter: e,
  onPointerLeave: s,
  row: l,
  rowCount: u,
  screenX: f,
  screenY: d
}) {
  const m = l.company, x = m.latestRelease, w = x ? x.name : "No releases", b = m.productLines.map((N) => N.shortLabel).join(" / "), v = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[rgba(255,255,255,0.035)] text-[var(--ink-soft)] transition duration-200 hover:border-[var(--edge-strong)] hover:bg-[rgba(255,255,255,0.075)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-30";
  return /* @__PURE__ */ i(
    "div",
    {
      "data-row-focus-label": !0,
      className: "pointer-events-none absolute z-30 will-change-transform",
      style: {
        transform: `translate3d(${f}px, ${d}px, 0) translateY(-50%)`
      },
      children: /* @__PURE__ */ h(
        me.div,
        {
          initial: { opacity: 0, scale: 0.96, x: -8 },
          animate: { opacity: 1, scale: 1, x: 0 },
          exit: { opacity: 0, scale: 0.96, x: -8 },
          transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
          className: `pointer-events-auto rounded-[1.15rem] border border-[var(--edge-strong)] bg-[rgba(8,11,16,0.92)] shadow-[0_22px_48px_-30px_rgba(0,0,0,0.88)] backdrop-blur-xl ${t ? "w-[min(15.5rem,calc(100vw-8rem))] p-3" : "w-[18rem] p-3.5"}`,
          onMouseEnter: e,
          onMouseLeave: s,
          onPointerDown: (N) => N.stopPropagation(),
          onPointerEnter: e,
          onPointerLeave: s,
          children: [
            /* @__PURE__ */ h("div", { className: "flex min-w-0 items-start gap-3", children: [
              /* @__PURE__ */ i(Uo, { compact: t, company: m }),
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
                /* @__PURE__ */ i("p", { className: "mt-1 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: b }),
                /* @__PURE__ */ i("p", { className: "mt-2 truncate text-xs font-medium text-[var(--ink-soft)]", children: w })
              ] })
            ] }),
            /* @__PURE__ */ h("div", { className: "mt-3 flex items-center justify-between gap-2 border-t border-[var(--edge)] pt-2.5", children: [
              /* @__PURE__ */ h("span", { className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: [
                "Score ",
                m.significanceScore,
                " · Row ",
                l.index + 1,
                "/",
                u
              ] }),
              /* @__PURE__ */ h("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${m.name} up`,
                    title: `Move ${m.name} up`,
                    className: v,
                    disabled: l.index === 0,
                    onClick: (N) => {
                      N.stopPropagation(), r(m.id, "up");
                    },
                    children: /* @__PURE__ */ i(Xr, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${m.name} down`,
                    title: `Move ${m.name} down`,
                    className: v,
                    disabled: l.index === u - 1,
                    onClick: (N) => {
                      N.stopPropagation(), r(m.id, "down");
                    },
                    children: /* @__PURE__ */ i(Yr, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Hide ${m.name}`,
                    title: `Hide ${m.name}`,
                    className: v,
                    onClick: (N) => {
                      N.stopPropagation(), n(m.id), a();
                    },
                    children: /* @__PURE__ */ i(Ln, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
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
  handlePointerMove: s,
  hiddenCompanyCount: l,
  handleZoomChange: u,
  isPanning: f,
  latestCompany: d,
  maxDays: m,
  minZoom: x,
  maxZoom: w,
  maxSummaryQuietDays: b,
  modelExplorer: v,
  monthTicks: N,
  onCompanyHide: R,
  onCompanyMove: $,
  onDismissArticle: q,
  onModelSelect: Q,
  onResetCamera: se,
  onShowHiddenCompanies: J,
  onToggleTimelineGrid: T,
  processedCompanies: F,
  renderWindow: Y,
  scrollContainerRef: A,
  showTimelineGrid: B,
  stopPanning: H,
  summaryCompanies: ee,
  timelineStartDay: z,
  timelineWidth: ce,
  viewport: W,
  worldRef: re,
  yearTicks: M,
  zoom: I
}) {
  var Pe;
  const P = it(!1, 1), g = Wt(F, !1, 1), D = Ht({
    currentGlobalDay: r,
    maxDays: m,
    summaryCount: ee.length,
    timelineStartDay: z,
    timelineHeight: g,
    timelineWidth: ce,
    viewport: W
  }), O = Mt(F, !1, 1, P), [K, le] = ve(null), te = j(null), be = () => {
    te.current !== null && (window.clearTimeout(te.current), te.current = null);
  }, Te = (k) => {
    be(), le(k);
  }, ae = () => {
    be(), le(null);
  }, Z = () => {
    be(), te.current = window.setTimeout(() => {
      le(null), te.current = null;
    }, 120);
  };
  De(() => () => be(), []);
  const ie = O.find((k) => k.company.id === K) ?? null, Ie = ne(116, 16, Math.max(16, W.width - 288 - 16)), Le = ie ? ne(
    (D.timelineY + ie.y + ie.height / 2 - n.y) * I,
    82,
    Math.max(82, W.height - 84)
  ) : 0, X = qe(), fe = a.isDefault ? X.defaultBoardDescription : a.isEmpty ? X.emptyBoardDetail : a.isComposite ? X.compositeBoardDescription(a.label) : X.singleBoardDescription(a.label), Ke = D.timelineX + z * Ce, pe = ce + mt;
  return /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ i("div", { className: "absolute left-5 top-5 z-40 [--category-expanded-width:40rem]", children: v }),
    /* @__PURE__ */ i(
      "div",
      {
        ref: A,
        className: `absolute inset-0 overflow-hidden [overflow-anchor:none] ${f ? "cursor-grabbing" : "cursor-grab"}`,
        onClickCapture: (k) => q(k.target, { clientX: k.clientX, clientY: k.clientY }),
        onPointerDown: e,
        onPointerMove: s,
        onPointerUp: H,
        onPointerCancel: H,
        onLostPointerCapture: H,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: re,
            className: "relative",
            style: {
              height: `${D.worldHeight}px`,
              transform: Pa(n, I),
              transformOrigin: "0 0",
              width: `${D.worldWidth}px`,
              "--map-zoom": String(La(I))
            },
            children: [
              /* @__PURE__ */ h(
                me.div,
                {
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
                    /* @__PURE__ */ i("h1", { className: "mt-4 max-w-4xl text-5xl leading-none tracking-tighter text-[var(--ink)]", children: X.primaryHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-5 max-w-[68ch] text-base leading-7 text-[var(--ink-soft)]", children: fe })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                me.div,
                {
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
                    /* @__PURE__ */ i("p", { className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: X.timelineNotesHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-4 text-sm leading-7 text-[var(--ink-soft)]", children: X.timelineInteractionNoteDesktop })
                  ]
                }
              ),
              /* @__PURE__ */ i(
                me.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${g}px`,
                    left: `${Ke}px`,
                    top: `${D.timelineY}px`,
                    width: `${pe}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ i(
                      cr,
                      {
                        activeCompanyId: K,
                        onCompanyBlur: Z,
                        onCompanyFocus: Te,
                        onCompanyTap: Te,
                        railWidth: mt,
                        rowLayouts: O,
                        timelineWidth: ce
                      }
                    ),
                    F.length === 0 ? /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-[320px] right-0 top-0 z-20 flex items-center justify-center px-6", children: /* @__PURE__ */ i(
                      lr,
                      {
                        boardView: a,
                        hiddenCompanyCount: l,
                        onShowHiddenCompanies: J
                      }
                    ) }) : null,
                    /* @__PURE__ */ i(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${pe}px` },
                        children: /* @__PURE__ */ i("div", { style: { paddingLeft: `${mt}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${ce}px`, minHeight: `${g}px` },
                            children: [
                              B ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                N.map((k) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${ze(k.days, z)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-10 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.18em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: We(10),
                                        children: k.label
                                      }
                                    ) }) })
                                  },
                                  `month-${k.days}`
                                )),
                                M.map((k) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${ze(k.days, z)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-2 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1.5 font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: We(11),
                                        children: k.label
                                      }
                                    ) }) })
                                  },
                                  `year-${k.label}`
                                )),
                                /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${ze(r, z)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-2 font-semibold uppercase tracking-[0.18em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: We(11),
                                        children: X.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              F.length > 0 ? /* @__PURE__ */ i(
                                me.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${P.companyGap}px`,
                                    paddingBottom: `${P.bottomPadding}px`,
                                    paddingTop: `${P.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ i(He, { initial: !1, mode: "popLayout", children: F.map((k, Ze) => /* @__PURE__ */ i(
                                    or,
                                    {
                                      activeArticleSlug: t,
                                      company: k,
                                      companyIndex: Ze,
                                      currentGlobalDay: r,
                                      maxDays: m,
                                      onCompanyBlur: Z,
                                      onCompanyFocus: Te,
                                      onModelSelect: Q,
                                      renderWindow: Y,
                                      timelineStartDay: z,
                                      verticalScale: 1
                                    },
                                    k.id
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
                me.div,
                {
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
                      X.latestDesktopLabel,
                      ": ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: (d == null ? void 0 : d.name) ?? X.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: ((Pe = d == null ? void 0 : d.latestRelease) == null ? void 0 : Pe.name) ?? X.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ i("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: X.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                me.div,
                {
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
                    /* @__PURE__ */ i("p", { className: "mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]", children: X.recencyHeading }),
                    /* @__PURE__ */ i("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: /* @__PURE__ */ i(He, { initial: !1, mode: "popLayout", children: ee.map((k, Ze) => /* @__PURE__ */ i(
                      sr,
                      {
                        company: k,
                        currentGlobalDay: r,
                        index: Ze,
                        maxSummaryQuietDays: b
                      },
                      k.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(He, { children: ie ? /* @__PURE__ */ i(Nt.Fragment, { children: /* @__PURE__ */ i(
      dr,
      {
        onClearFocus: ae,
        onCompanyHide: R,
        onCompanyMove: $,
        onPointerEnter: be,
        onPointerLeave: Z,
        row: ie,
        rowCount: O.length,
        screenX: Ie,
        screenY: Le
      }
    ) }, `${ie.company.id}-desktop-focus-label`) : null }),
    /* @__PURE__ */ i(
      nr,
      {
        className: "right-5 top-1/2 -translate-y-1/2",
        maxZoom: w,
        minZoom: x,
        onZoomChange: u,
        zoom: I
      }
    ),
    /* @__PURE__ */ h("div", { className: "absolute right-6 top-[calc(50%+12.5rem)] z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        ht,
        {
          label: B ? X.timelineGridHideLabel : X.timelineGridShowLabel,
          onClick: T,
          pressed: B,
          children: [
            B ? /* @__PURE__ */ i(Rn, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ i(An, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ i("span", { children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(ht, { label: X.resetCameraLabel, onClick: se, children: [
        /* @__PURE__ */ i(Vt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { children: "Reset" })
      ] }),
      l > 0 ? /* @__PURE__ */ h(ht, { label: X.showHiddenLabel, onClick: J, children: [
        /* @__PURE__ */ i(rt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { children: X.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function ss({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handleTouchEnd: e,
  handleTouchMove: s,
  handleTouchStart: l,
  handleZoomChange: u,
  hiddenCompanyCount: f,
  latestCompany: d,
  minZoom: m,
  maxZoom: x,
  maxDays: w,
  maxSummaryQuietDays: b,
  modelExplorer: v,
  monthTicks: N,
  onCompanyHide: R,
  onCompanyMove: $,
  onDismissArticle: q,
  onModelSelect: Q,
  onResetCamera: se,
  onShowHiddenCompanies: J,
  onToggleTimelineGrid: T,
  processedCompanies: F,
  renderWindow: Y,
  scrollContainerRef: A,
  showTimelineGrid: B,
  timelineStartDay: H,
  timelineWidth: ee,
  viewport: z,
  worldRef: ce,
  yearTicks: W,
  zoom: re
}) {
  var Le;
  const I = it(!0, 1), L = Wt(F, !0, 1), P = Ht({
    compact: !0,
    currentGlobalDay: r,
    maxDays: w,
    summaryCount: F.length,
    timelineStartDay: H,
    timelineHeight: L,
    timelineWidth: ee,
    viewport: z
  }), g = Mt(F, !0, 1, I), [D, O] = ve(null), K = (X) => O(X), le = () => O(null), te = g.find((X) => X.company.id === D) ?? null, Te = Math.max(16, Math.min(126, Math.max(16, z.width - 248 - 12))), ae = te ? ne(
    (P.timelineY + te.y + te.height / 2 - n.y) * re,
    98,
    Math.max(98, z.height - 104)
  ) : 0, Z = qe(), ie = a.isDefault ? Z.defaultBoardDescription : a.isEmpty ? Z.emptyBoardDetail : a.isComposite ? Z.compositeBoardDescriptionMobile(a.label) : Z.singleBoardDescriptionMobile(a.label), Ae = P.timelineX + H * Ce, Ie = ee + ft;
  return /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ i("div", { className: "absolute left-3 top-3 z-40 [--category-expanded-width:min(20rem,calc(100vw-5rem))]", children: v }),
    /* @__PURE__ */ i(
      "div",
      {
        ref: A,
        className: "absolute inset-0 touch-none overflow-hidden [overflow-anchor:none]",
        onClickCapture: (X) => q(X.target, { clientX: X.clientX, clientY: X.clientY }),
        onClick: (X) => {
          const fe = X.target;
          fe instanceof Element && (fe.closest("[data-row-focus-band], [data-row-focus-label], button, a, input, label, select, textarea") || le());
        },
        onTouchCancel: e,
        onTouchEnd: e,
        onTouchMove: s,
        onTouchStart: l,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: ce,
            className: "relative",
            style: {
              height: `${P.worldHeight}px`,
              transform: Pa(n, re),
              transformOrigin: "0 0",
              width: `${P.worldWidth}px`,
              "--map-zoom": String(La(re))
            },
            children: [
              /* @__PURE__ */ h(
                me.div,
                {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.7rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.86)] p-5 shadow-[var(--panel-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${P.contentCards.intro.x}px`,
                    top: `${P.contentCards.intro.y}px`,
                    width: `${P.contentCards.intro.width}px`
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ i("h1", { className: "mt-3 max-w-sm text-[2.25rem] leading-none tracking-tighter text-[var(--ink)]", children: Z.primaryHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-4 text-sm leading-6 text-[var(--ink-soft)]", children: ie })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                me.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
                  className: "timeline-border-sheen timeline-fluid-obstacle absolute z-30 rounded-[1.25rem] border border-[var(--edge)] bg-[rgba(10,13,19,0.78)] p-4 shadow-[var(--soft-shadow)] backdrop-blur-xl",
                  style: {
                    left: `${P.contentCards.notes.x}px`,
                    top: `${P.contentCards.notes.y}px`,
                    width: `${P.contentCards.notes.width}px`,
                    "--border-sheen-delay": "2.8s"
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: Z.timelineNotesHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-3 text-xs leading-5 text-[var(--ink-soft)]", children: Z.timelineInteractionNoteMobile })
                  ]
                }
              ),
              /* @__PURE__ */ i(
                me.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${L}px`,
                    left: `${Ae}px`,
                    top: `${P.timelineY}px`,
                    width: `${Ie}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ i(
                      cr,
                      {
                        activeCompanyId: D,
                        compact: !0,
                        onCompanyFocus: K,
                        onCompanyTap: K,
                        railWidth: ft,
                        rowLayouts: g,
                        timelineWidth: ee
                      }
                    ),
                    F.length === 0 ? /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-[196px] right-0 top-0 z-20 flex items-center justify-center px-3", children: /* @__PURE__ */ i(
                      lr,
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
                        style: { minWidth: `${Ie}px` },
                        children: /* @__PURE__ */ i("div", { style: { paddingLeft: `${ft}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${ee}px`, minHeight: `${L}px` },
                            children: [
                              B ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                N.map((X) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${ze(X.days, H)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-9 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.16em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: We(9),
                                        children: X.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-month-${X.days}`
                                )),
                                W.map((X) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${ze(X.days, H)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1 font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: We(10),
                                        children: X.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-year-${X.label}`
                                )),
                                /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${ze(r, H)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1.5 font-semibold uppercase tracking-[0.16em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: We(10),
                                        children: Z.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              F.length > 0 ? /* @__PURE__ */ i(
                                me.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${I.companyGap}px`,
                                    paddingBottom: `${I.bottomPadding}px`,
                                    paddingTop: `${I.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ i(He, { initial: !1, mode: "popLayout", children: F.map((X, fe) => /* @__PURE__ */ i(
                                    or,
                                    {
                                      activeArticleSlug: t,
                                      compact: !0,
                                      company: X,
                                      companyIndex: fe,
                                      currentGlobalDay: r,
                                      maxDays: w,
                                      onCompanyFocus: K,
                                      onModelSelect: Q,
                                      renderWindow: Y,
                                      timelineStartDay: H,
                                      verticalScale: 1
                                    },
                                    X.id
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
                me.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${P.contentCards.latest.x}px`,
                    top: `${P.contentCards.latest.y}px`,
                    width: `${P.contentCards.latest.width}px`
                  },
                  children: [
                    /* @__PURE__ */ h("p", { className: "text-xs leading-5 text-[var(--ink-soft)]", children: [
                      Z.latestMobileLabel,
                      ": ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: (d == null ? void 0 : d.name) ?? Z.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: ((Le = d == null ? void 0 : d.latestRelease) == null ? void 0 : Le.name) ?? Z.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ i("p", { className: "mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: Z.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ h(
                me.div,
                {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.68, delay: 0.24, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${P.contentCards.summaries.x}px`,
                    top: `${P.contentCards.summaries.y}px`,
                    width: `${P.contentCards.summaries.width}px`
                  },
                  children: [
                    /* @__PURE__ */ i("p", { className: "mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]", children: Z.recencyHeading }),
                    /* @__PURE__ */ i("div", { className: "grid gap-3 sm:grid-cols-2", children: /* @__PURE__ */ i(He, { initial: !1, mode: "popLayout", children: F.map((X, fe) => /* @__PURE__ */ i(
                      sr,
                      {
                        compact: !0,
                        company: X,
                        currentGlobalDay: r,
                        index: fe,
                        maxSummaryQuietDays: b
                      },
                      X.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(He, { children: te ? /* @__PURE__ */ i(Nt.Fragment, { children: /* @__PURE__ */ i(
      dr,
      {
        compact: !0,
        onClearFocus: le,
        onCompanyHide: R,
        onCompanyMove: $,
        row: te,
        rowCount: g.length,
        screenX: Te,
        screenY: ae
      }
    ) }, `${te.company.id}-mobile-focus-label`) : null }),
    /* @__PURE__ */ i(
      nr,
      {
        compact: !0,
        className: "right-1 top-1/2 -translate-y-1/2",
        maxZoom: x,
        minZoom: m,
        onZoomChange: u,
        zoom: re
      }
    ),
    /* @__PURE__ */ h("div", { className: "absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        ht,
        {
          label: B ? Z.timelineGridHideLabel : Z.timelineGridShowLabel,
          onClick: T,
          pressed: B,
          children: [
            B ? /* @__PURE__ */ i(Rn, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ i(An, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ i("span", { className: "sr-only", children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(ht, { label: Z.resetCameraLabel, onClick: se, children: [
        /* @__PURE__ */ i(Vt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { className: "sr-only", children: "Reset" })
      ] }),
      f > 0 ? /* @__PURE__ */ h(ht, { label: Z.showHiddenLabel, onClick: J, children: [
        /* @__PURE__ */ i(rt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { className: "sr-only", children: Z.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function hs({ definition: t }) {
  ai(t);
  const [a, n] = ve(() => Wi()), [r, e] = ve(() => Hi()), [s, l] = ve(
    () => Vi()
  ), [u, f] = ve(!1), [d, m] = ve(
    () => typeof window > "u" ? !0 : window.matchMedia("(min-width: 768px)").matches
  ), [x, w] = ve(Xt), [b, v] = ve(Yt), [N, R] = ve(!1), [$, q] = ve(!1), [Q, se] = ve(!0), [J, T] = ve([]), [F, Y] = ve(() => Ye().map((o) => o.id)), [A, B] = ve({ x: 0, y: 0 }), [H, ee] = ve({ x: 0, y: 0 }), [z, ce] = ve(() => Oi()), W = j(Xt), re = j(Yt), M = j({ x: 0, y: 0 }), I = j({ x: 0, y: 0 }), L = j({
    frameId: null,
    lastFrameAt: null,
    stiffness: lt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: Xt
    },
    zoomAnchor: null
  }), P = j({
    frameId: null,
    lastFrameAt: null,
    stiffness: lt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: Yt
    },
    zoomAnchor: null
  }), g = j(null), D = j(null), O = j(null), K = j(null), le = j(null), te = j(null), be = j(null), Te = j(null), ae = j(!1), Z = j(!1), ie = j(null), Ae = j(null), Ie = j(!1), Le = j(null), X = j(() => {
  }), fe = j(null), Ke = j(null), pe = j({
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0
  });
  j(/* @__PURE__ */ new Map());
  const Pe = j(null), [k, Ze] = ve({
    desktop: { height: 0, width: 0 },
    mobile: { height: 0, width: 0 }
  }), ot = qe(), xe = z.kind === "model" ? z.slug : null, Ne = xe ? oe().articleIndexBySlug[xe] ?? null : null, Ue = z.kind === "model", Se = (ge(() => /* @__PURE__ */ new Date(), []).getTime() - at().getTime()) / nt, C = ge(() => to(a), [a]), E = ge(
    () => Qt(Ye(), a),
    [a]
  ), _ = ge(
    () => co(E, F, J, r, Se),
    [F, r, Se, J, E]
  ), S = ge(
    () => uo(_, s, Ne == null ? void 0 : Ne.companyId),
    [Ne == null ? void 0 : Ne.companyId, _, s]
  ), G = ge(
    () => S.map((o) => o.id),
    [S]
  ), _e = ge(() => {
    const o = new Set(J);
    return E.filter((c) => o.has(c.id)).length;
  }, [J, E]), Me = ge(() => ro(Ye(), a), [a]), Xe = ge(() => io(Ye(), a), [a]), Fe = ge(() => oo(Ye(), a), [a]), de = ge(
    () => po(S, Se),
    [Se, S]
  ), Qe = Math.max(Math.ceil(Se) + 36, de.latestGlobalDay + 36, 720), Fa = Math.max(Qe * Ce, 1), xt = Tn(k.desktop.width, mt, Fa), Dt = Tn(k.mobile.width, ft, Fa), $a = bn({
    camera: A,
    minimumDays: Qe,
    viewport: k.desktop,
    zoom: x
  }), Ua = bn({
    camera: H,
    compact: !0,
    minimumDays: Qe,
    viewport: k.mobile,
    zoom: b
  }), Ct = $a.endDay, St = $a.startDay, kt = Ua.endDay, Rt = Ua.startDay, ea = Math.max(Ot(St, Ct), 1), ta = Math.max(
    Ot(Rt, kt),
    1
  ), ur = ge(
    () => xn({
      camera: A,
      viewport: k.desktop,
      zoom: x
    }),
    [A, k.desktop, x]
  ), mr = ge(
    () => xn({
      camera: H,
      compact: !0,
      viewport: k.mobile,
      zoom: b
    }),
    [H, b, k.mobile]
  ), aa = 1, na = 1, At = Wt(de.processedCompanies, !1, aa), It = Wt(de.processedCompanies, !0, na), Xa = ge(
    () => Bt({
      camera: A,
      futureBufferDays: hn,
      pastBufferDays: pn,
      viewport: k.desktop,
      zoom: x
    }),
    [A, k.desktop, x]
  ), Ya = ge(
    () => Bt({
      camera: H,
      compact: !0,
      futureBufferDays: hn,
      pastBufferDays: pn,
      viewport: k.mobile,
      zoom: b
    }),
    [H, b, k.mobile]
  ), { monthTicks: fr, yearTicks: pr } = ge(() => vn(Xa), [Xa]), { monthTicks: hr, yearTicks: gr } = ge(
    () => vn(Ya),
    [Ya]
  ), za = ge(() => [...de.processedCompanies].filter((o) => o.latestRelease).sort((o, c) => {
    var p, y;
    return (((p = c.latestRelease) == null ? void 0 : p.globalDay) ?? 0) - (((y = o.latestRelease) == null ? void 0 : y.globalDay) ?? 0);
  })[0] ?? null, [de.processedCompanies]), bt = ge(() => de.processedCompanies, [de.processedCompanies]), Ba = ge(() => bt.reduce((o, c) => {
    const p = Sa(c, Se);
    return Math.max(o, p);
  }, 0), [Se, bt]), Je = ge(
    () => Ht({
      currentGlobalDay: Se,
      maxDays: Ct,
      summaryCount: bt.length,
      timelineStartDay: St,
      timelineHeight: At,
      timelineWidth: ea,
      viewport: k.desktop
    }),
    [
      Se,
      At,
      Ct,
      bt.length,
      St,
      ea,
      k.desktop
    ]
  ), et = ge(
    () => Ht({
      compact: !0,
      currentGlobalDay: Se,
      maxDays: kt,
      summaryCount: de.processedCompanies.length,
      timelineStartDay: Rt,
      timelineHeight: It,
      timelineWidth: ta,
      viewport: k.mobile
    }),
    [
      Se,
      kt,
      Rt,
      It,
      ta,
      de.processedCompanies.length,
      k.mobile
    ]
  );
  De(() => {
    const o = window.setTimeout(() => q(!0), 120);
    return () => window.clearTimeout(o);
  }, []), De(() => {
    const o = () => {
      const c = window.location.hash;
      ce(qn(c)), n(Kn(c)), e(Zn(c)), l(Qn(c));
    };
    return o(), window.addEventListener("hashchange", o), () => window.removeEventListener("hashchange", o);
  }, []), De(() => {
    const o = ha({
      companySortMode: r,
      filterState: a,
      route: z,
      significanceDisplayLimit: s
    });
    window.location.hash !== o && window.history.replaceState(null, "", o);
  }, [r, a, z, s]), De(() => () => {
    var o;
    (o = fe.current) == null || o.call(fe), L.current.frameId !== null && window.cancelAnimationFrame(L.current.frameId), P.current.frameId !== null && window.cancelAnimationFrame(P.current.frameId);
  }, []), De(() => {
    Ne && (n((o) => {
      const c = si(Ne.presets), p = Be(Ne.presets, tt()), y = Ge({
        ...o,
        attributeIds: Be([...o.attributeIds, ...p], tt()),
        companyIds: o.companyIds.length > 0 && !o.companyIds.includes(Ne.companyId) ? [...o.companyIds, Ne.companyId] : o.companyIds,
        domainIds: c.length > 0 ? Be([...o.domainIds, ...c], Ve()) : o.domainIds
      });
      return Xn(o, y) ? o : y;
    }), T((o) => o.filter((c) => c !== Ne.companyId)));
  }, [Ne]), De(() => {
    const o = new Set(Fe.map((c) => c.id));
    n((c) => {
      const p = c.companyIds.filter((y) => o.has(y));
      return p.length === c.companyIds.length ? c : { ...c, companyIds: p };
    });
  }, [Fe]), De(() => {
    const o = window.matchMedia("(min-width: 768px)"), c = () => m(o.matches);
    return c(), o.addEventListener("change", c), () => o.removeEventListener("change", c);
  }, []), De(() => {
    const o = () => {
      var p, y, U, V;
      Ze({
        desktop: {
          height: ((p = g.current) == null ? void 0 : p.clientHeight) ?? window.innerHeight,
          width: ((y = g.current) == null ? void 0 : y.clientWidth) ?? window.innerWidth
        },
        mobile: {
          height: ((U = D.current) == null ? void 0 : U.clientHeight) ?? window.innerHeight,
          width: ((V = D.current) == null ? void 0 : V.clientWidth) ?? window.innerWidth
        }
      });
    };
    o();
    const c = window.requestAnimationFrame(o);
    return window.addEventListener("resize", o), () => {
      window.cancelAnimationFrame(c), window.removeEventListener("resize", o);
    };
  }, [d, $]), De(() => {
    if (ae.current)
      return;
    const o = () => {
      if (ae.current || !g.current || g.current.clientWidth === 0)
        return;
      const p = Ft(Je);
      M.current = p.camera, L.current.target = p, ia(p.zoom, p.camera), ae.current = !0;
    };
    if (o(), !ae.current)
      return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, [Je, k.desktop, x]), De(() => {
    if (Z.current)
      return;
    const o = () => {
      if (Z.current || !D.current || D.current.clientWidth === 0)
        return;
      const p = Ft(et, !0);
      I.current = p.camera, P.current.target = p, oa(p.zoom, p.camera), Z.current = !0;
    };
    if (o(), !Z.current)
      return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, [et, b, k.mobile]);
  const vr = (o) => {
    n((c) => {
      const p = c.domainIds.includes(o) ? c.domainIds.filter((y) => y !== o) : Be([...c.domainIds, o], Ve());
      return Ge({ ...c, companyIds: [], domainIds: p });
    });
  }, xr = (o) => {
    n((c) => {
      const p = c.attributeIds.includes(o) ? c.attributeIds.filter((y) => y !== o) : Be([...c.attributeIds, o], tt());
      return Ge({ ...c, attributeIds: p, companyIds: [] });
    });
  }, br = (o) => {
    n((c) => Ge({ ...c, companyIds: [], contentType: o }));
  }, yr = (o) => {
    n((c) => {
      const p = c.companyIds.length === 0 ? [o] : c.companyIds.includes(o) ? c.companyIds.filter((y) => y !== o) : [...c.companyIds, o];
      return Ge({ ...c, companyIds: p });
    });
  }, wr = () => {
    n((o) => ({ ...o, companyIds: [] }));
  }, Tr = () => {
    n(vt()), e(qt()), l(Kt()), T([]), Y(Ye().map((o) => o.id));
  }, Er = () => {
    n({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: [...Ve()]
    });
  }, Nr = () => {
    n({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: []
    });
  }, Oa = (o) => {
    T((c) => c.includes(o) ? c : [...c, o]);
  }, Wa = () => {
    T([]);
  }, Ha = sn(() => {
    se((o) => !o);
  }, []), Va = (o, c) => {
    Y((p) => fo(p, G, o, c));
  }, Ga = () => {
    window.location.hash = ha({
      companySortMode: r,
      filterState: a,
      route: { kind: "timeline" },
      significanceDisplayLimit: s
    });
  }, Lt = (o) => {
    window.location.hash = ha({
      companySortMode: r,
      filterState: a,
      route: { kind: "model", slug: o },
      significanceDisplayLimit: s
    });
  }, ra = () => {
    z.kind === "model" && (Ae.current = null, Ga());
  }, ja = (o, c) => {
    if (Ie.current) {
      Ie.current = !1;
      return;
    }
    ga(
      o,
      xe,
      ra,
      c
    );
  }, qa = {
    attributeStats: Xe,
    boardView: C,
    companySortMode: r,
    companyOptions: Fe,
    domainStats: Me,
    filterState: a,
    isOpen: u,
    onAttributeToggle: xr,
    onClearAll: Nr,
    onClearCompanyFilter: wr,
    onCompanyToggle: yr,
    onCompanySortModeChange: e,
    onContentTypeChange: br,
    onDomainToggle: vr,
    onReset: Tr,
    onSelectAll: Er,
    onSignificanceDisplayLimitChange: l,
    onToggle: () => f((o) => !o),
    significanceDisplayLimit: s,
    totalMatchedCompanyCount: _.length,
    visibleCompanyCount: S.length
  }, ia = (o, c) => {
    W.current = o, M.current = c, $t(O.current, c, o), w(o), B(c);
  }, oa = (o, c) => {
    re.current = o, I.current = c, $t(K.current, c, o), v(o), ee(c);
  }, Ka = (o) => {
    const c = L.current, p = c.lastFrameAt === null ? 1 / 60 : ne((o - c.lastFrameAt) / 1e3, 0, 0.064);
    c.lastFrameAt = o;
    const { target: y, zoomAnchor: U } = c, V = 1 - Math.exp(-c.stiffness * p), ue = dt(W.current, y.zoom, V), he = U ? ct(
      U.worldX,
      U.worldY,
      U.viewportX,
      U.viewportY,
      ue
    ) : {
      x: dt(M.current.x, y.camera.x, V),
      y: dt(M.current.y, y.camera.y, V)
    };
    ia(ue, he);
    const ye = Math.hypot(y.camera.x - he.x, y.camera.y - he.y), we = Math.abs(y.zoom - ue);
    if (ye > un || we > mn) {
      c.frameId = window.requestAnimationFrame(Ka);
      return;
    }
    c.frameId = null, c.lastFrameAt = null;
    const Ee = U ? ct(
      U.worldX,
      U.worldY,
      U.viewportX,
      U.viewportY,
      y.zoom
    ) : y.camera;
    c.zoomAnchor = null, ia(y.zoom, Ee);
  }, Za = (o) => {
    const c = P.current, p = c.lastFrameAt === null ? 1 / 60 : ne((o - c.lastFrameAt) / 1e3, 0, 0.064);
    c.lastFrameAt = o;
    const { target: y, zoomAnchor: U } = c, V = 1 - Math.exp(-c.stiffness * p), ue = dt(re.current, y.zoom, V), he = U ? ct(
      U.worldX,
      U.worldY,
      U.viewportX,
      U.viewportY,
      ue
    ) : {
      x: dt(I.current.x, y.camera.x, V),
      y: dt(I.current.y, y.camera.y, V)
    };
    oa(ue, he);
    const ye = Math.hypot(y.camera.x - he.x, y.camera.y - he.y), we = Math.abs(y.zoom - ue);
    if (ye > un || we > mn) {
      c.frameId = window.requestAnimationFrame(Za);
      return;
    }
    c.frameId = null, c.lastFrameAt = null;
    const Ee = U ? ct(
      U.worldX,
      U.worldY,
      U.viewportX,
      U.viewportY,
      y.zoom
    ) : y.camera;
    c.zoomAnchor = null, oa(y.zoom, Ee);
  }, sa = (o, c) => {
    const p = L.current;
    p.target = o, p.stiffness = (c == null ? void 0 : c.stiffness) ?? lt, c ? p.zoomAnchor = c.zoomAnchor ?? null : p.zoomAnchor = null, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(Ka));
  }, la = (o, c) => {
    const p = P.current;
    p.target = o, p.stiffness = (c == null ? void 0 : c.stiffness) ?? lt, c ? p.zoomAnchor = c.zoomAnchor ?? null : p.zoomAnchor = null, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(Za));
  }, Mr = sn(
    (o) => {
      const c = !d, p = c ? k.mobile : k.desktop;
      if (p.width <= 0 || p.height <= 0)
        return;
      const y = c ? et : Je, U = c ? It : At, V = Ao(
        o,
        de.processedCompanies,
        y,
        U,
        c,
        1
      );
      if (!V)
        return;
      const ue = So(p, c, Ue), he = Ue && !c ? ko(p, ue) : Gn, ye = Ro({
        anchor: he,
        bounds: V,
        focusMaxZoom: c ? Yi : Xi,
        insets: ue,
        layout: y,
        maxZoom: c ? ua : Pt,
        minZoom: c ? Dt : xt,
        viewport: p
      });
      if (!ye)
        return;
      const we = o.kind === "slug" ? { stiffness: Pi } : {};
      if (c) {
        la(ye, we);
        return;
      }
      sa(ye, we);
    },
    [
      Je,
      xt,
      At,
      Ue,
      d,
      et,
      Dt,
      It,
      de.processedCompanies,
      k.desktop,
      k.mobile
    ]
  );
  De(() => {
    if (!Ue || !xe) {
      Ue || (Ae.current = null);
      return;
    }
    !$ || N || ie.current !== null || (d ? k.desktop : k.mobile).width <= 0 || Ae.current !== xe && _a(de.processedCompanies, xe) && (Mr({ kind: "slug", slug: xe }), Ae.current = xe);
  }, [
    xe,
    Ue,
    d,
    N,
    $,
    de.processedCompanies,
    k.desktop,
    k.mobile
  ]), De(() => {
    const o = (c) => {
      const p = Do(c.key);
      if (!p || Co(c) || !$)
        return;
      const y = !d, U = y ? k.mobile : k.desktop;
      if (U.width <= 0 || U.height <= 0)
        return;
      const V = y ? et : Je, ue = y ? na : aa, he = Eo(
        de.processedCompanies,
        V,
        y,
        ue
      );
      if (he.length === 0)
        return;
      const ye = y ? I.current : M.current, we = y ? re.current : W.current, Ee = No(
        de.processedCompanies,
        V,
        y,
        ue,
        xe,
        ye,
        we,
        U
      ), wt = Mo(Ee, he, p, {
        excludeSlug: xe,
        minPrimaryDistance: xe ? tr : 0
      });
      !wt || wt.slug === xe || (c.preventDefault(), Ae.current = null, Lt(wt.slug));
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, [
    xe,
    Je,
    d,
    $,
    et,
    na,
    aa,
    de.processedCompanies,
    k.desktop,
    k.mobile
  ]);
  const Dr = () => {
    const o = L.current;
    o.frameId !== null && (window.cancelAnimationFrame(o.frameId), o.frameId = null), o.lastFrameAt = null, o.target = {
      camera: M.current,
      zoom: W.current
    }, o.stiffness = lt, o.zoomAnchor = null;
  }, Cr = () => {
    const o = P.current;
    o.frameId !== null && (window.cancelAnimationFrame(o.frameId), o.frameId = null), o.lastFrameAt = null, o.target = {
      camera: I.current,
      zoom: re.current
    }, o.stiffness = lt, o.zoomAnchor = null;
  }, Sr = () => {
    const o = g.current;
    le.current = ((o == null ? void 0 : o.clientWidth) ?? k.desktop.width) / 2, te.current = ((o == null ? void 0 : o.clientHeight) ?? k.desktop.height) / 2, sa(Ft(Je));
  }, kr = () => {
    const o = D.current;
    be.current = ((o == null ? void 0 : o.clientWidth) ?? k.mobile.width) / 2, Te.current = ((o == null ? void 0 : o.clientHeight) ?? k.mobile.height) / 2, la(Ft(et, !0));
  }, Qa = (o, c) => {
    const p = g.current, y = k.desktop, U = ne(
      (c == null ? void 0 : c.x) ?? le.current ?? ((p == null ? void 0 : p.clientWidth) ?? y.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? y.width
    ), V = ne(
      (c == null ? void 0 : c.y) ?? te.current ?? ((p == null ? void 0 : p.clientHeight) ?? y.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? y.height
    ), ue = L.current, he = W.current, ye = Number(ne(o(he), xt, Pt).toFixed(3));
    if (ye === he)
      return;
    const we = wn({
      anchorX: U,
      anchorY: V,
      camera: M.current,
      existingAnchor: ue.zoomAnchor,
      zoom: he
    }), Ee = ct(
      we.worldX,
      we.worldY,
      U,
      V,
      ye
    );
    sa(
      {
        camera: Ee,
        zoom: ye
      },
      { zoomAnchor: we }
    );
  }, Ja = (o, c) => {
    const p = D.current, y = k.mobile, U = ne(
      (c == null ? void 0 : c.x) ?? be.current ?? ((p == null ? void 0 : p.clientWidth) ?? y.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? y.width
    ), V = ne(
      (c == null ? void 0 : c.y) ?? Te.current ?? ((p == null ? void 0 : p.clientHeight) ?? y.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? y.height
    ), ue = P.current, he = re.current, ye = Number(ne(o(he), Dt, ua).toFixed(3));
    if (ye === he)
      return;
    const we = wn({
      anchorX: U,
      anchorY: V,
      camera: I.current,
      existingAnchor: ue.zoomAnchor,
      zoom: he
    }), Ee = ct(
      we.worldX,
      we.worldY,
      U,
      V,
      ye
    );
    la(
      {
        camera: Ee,
        zoom: ye
      },
      { zoomAnchor: we }
    );
  };
  X.current = (o) => {
    if (!g.current || o.deltaY === 0)
      return;
    o.cancelable && o.preventDefault();
    const c = g.current, p = c.getBoundingClientRect(), y = {
      x: ne(o.clientX - p.left, 0, c.clientWidth),
      y: ne(o.clientY - p.top, 0, c.clientHeight)
    };
    le.current = y.x, te.current = y.y;
    const U = o.deltaMode === 1 ? o.deltaY * 16 : o.deltaMode === 2 ? o.deltaY * c.clientHeight : o.deltaY;
    Qa(
      (V) => Tt(V, -U * Ii, xt, Pt),
      y
    );
  }, De(() => {
    if (!$ || !d)
      return;
    const o = g.current;
    if (!o)
      return;
    const c = (p) => X.current(p);
    return o.addEventListener("wheel", c, { passive: !1 }), () => {
      o.removeEventListener("wheel", c);
    };
  }, [d, $]);
  const Rr = (o) => {
    var U;
    if (o.pointerType !== "mouse" || o.button !== 0 || !g.current)
      return;
    const c = g.current, p = c.getBoundingClientRect();
    le.current = o.clientX - p.left, te.current = o.clientY - p.top, Dr(), Ie.current = !1, ie.current = o.pointerId, pe.current = {
      lastX: o.clientX,
      lastY: o.clientY,
      startX: o.clientX,
      startY: o.clientY
    }, c.setPointerCapture(o.pointerId), (U = fe.current) == null || U.call(fe);
    const y = (V) => X.current(V);
    window.addEventListener("wheel", y, { capture: !0, passive: !1 }), fe.current = () => {
      window.removeEventListener("wheel", y, !0);
    }, kn(() => R(!0)), o.preventDefault();
  }, en = () => {
    if (Le.current = null, !g.current)
      return;
    const o = Ke.current;
    if (!o || ie.current === null)
      return;
    const p = g.current.getBoundingClientRect(), y = o.clientX - p.left;
    le.current = y, te.current = o.clientY - p.top;
    const U = o.clientX - pe.current.lastX, V = o.clientY - pe.current.lastY, ue = {
      x: M.current.x - U / Math.max(W.current, 1e-3),
      y: M.current.y - V / Math.max(W.current, 1e-3)
    };
    L.current.target = {
      camera: ue,
      zoom: W.current
    }, M.current = ue, $t(O.current, ue, W.current), pe.current.lastX = o.clientX, pe.current.lastY = o.clientY;
  }, Ar = (o) => {
    if (o.pointerType === "mouse" && g.current) {
      const c = g.current.getBoundingClientRect();
      le.current = ne(
        o.clientX - c.left,
        0,
        g.current.clientWidth
      ), te.current = ne(
        o.clientY - c.top,
        0,
        g.current.clientHeight
      );
    }
    o.pointerId === ie.current && (Ke.current = {
      clientX: o.clientX,
      clientY: o.clientY
    }, Le.current === null && (Le.current = window.requestAnimationFrame(en)), o.preventDefault());
  }, Ir = (o) => {
    var p;
    if (o.pointerId !== ie.current || !g.current)
      return;
    Le.current !== null && (window.cancelAnimationFrame(Le.current), Le.current = null, en()), g.current.hasPointerCapture(o.pointerId) && g.current.releasePointerCapture(o.pointerId), ie.current = null, Ke.current = null, (p = fe.current) == null || p.call(fe), fe.current = null, Math.hypot(
      o.clientX - pe.current.startX,
      o.clientY - pe.current.startY
    ) > gn ? Ie.current = !0 : ga(
      o.target,
      xe,
      ra,
      { clientX: o.clientX, clientY: o.clientY }
    ), B(M.current), R(!1);
  }, tn = (o, c) => Math.hypot(c.clientX - o.clientX, c.clientY - o.clientY), an = (o, c) => ({
    clientX: (o.clientX + c.clientX) / 2,
    clientY: (o.clientY + c.clientY) / 2
  }), nn = (o, c) => {
    const p = c.getBoundingClientRect();
    be.current = ne(o.clientX - p.left, 0, c.clientWidth), Te.current = ne(o.clientY - p.top, 0, c.clientHeight);
  }, rn = (o, c) => {
    const p = {
      x: I.current.x - o / Math.max(re.current, 1e-3),
      y: I.current.y - c / Math.max(re.current, 1e-3)
    };
    P.current.target = {
      camera: p,
      zoom: re.current
    }, I.current = p, $t(K.current, p, re.current);
  }, on = (o) => o instanceof Element && !!o.closest("button, a, input, label, select, textarea, [data-timeline-pin]"), st = (o) => ({
    clientX: o.clientX,
    clientY: o.clientY
  }), yt = (o) => {
    if (o.length === 0) {
      Pe.current = null, be.current = null, Te.current = null;
      return;
    }
    if (o.length === 1) {
      const U = st(o[0]);
      Pe.current = {
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
    const c = st(o[0]), p = st(o[1]), y = an(c, p);
    Pe.current = {
      distance: Math.max(tn(c, p), 1),
      lastMidpointX: y.clientX,
      lastMidpointY: y.clientY,
      lastX: y.clientX,
      lastY: y.clientY,
      startX: y.clientX,
      startY: y.clientY,
      type: "pinch"
    };
  }, Lr = (o) => {
    !D.current || on(o.target) || (Cr(), yt(o.touches));
  }, Pr = (o) => {
    if (!D.current || on(o.target))
      return;
    const c = D.current, p = Pe.current;
    if (!p) {
      yt(o.touches);
      return;
    }
    if (o.touches.length === 1) {
      const Ee = st(o.touches[0]);
      if (nn(Ee, c), p.type === "pan") {
        const wt = Ee.clientX - p.lastX, Fr = Ee.clientY - p.lastY;
        rn(wt, Fr), p.lastX = Ee.clientX, p.lastY = Ee.clientY;
      } else
        yt(o.touches);
      return;
    }
    if (o.touches.length < 2)
      return;
    const y = st(o.touches[0]), U = st(o.touches[1]), V = an(y, U), ue = Math.max(tn(y, U), 1);
    if (nn(V, c), p.type !== "pinch") {
      yt(o.touches);
      return;
    }
    const he = V.clientX - p.lastMidpointX, ye = V.clientY - p.lastMidpointY;
    rn(he, ye);
    const we = ne(ue / Math.max(p.distance, 1), 0.78, 1.28);
    Ja((Ee) => Ee * we, {
      x: be.current ?? c.clientWidth / 2,
      y: Te.current ?? c.clientHeight / 2
    }), p.distance = ue, p.lastMidpointX = V.clientX, p.lastMidpointY = V.clientY, p.lastX = V.clientX, p.lastY = V.clientY;
  }, _r = (o) => {
    const c = Pe.current;
    if (yt(o.touches), ee(I.current), !c || c.type !== "pan" || o.changedTouches.length === 0)
      return;
    const p = o.changedTouches[0];
    Math.hypot(p.clientX - c.startX, p.clientY - c.startY) > gn || ga(
      p.target,
      xe,
      ra,
      { clientX: p.clientX, clientY: p.clientY }
    );
  };
  return Ye().length === 0 ? /* @__PURE__ */ i(
    Sn,
    {
      title: ot.emptyDataTitle,
      detail: ot.emptyDataDetail
    }
  ) : de.invalidEntries.length > 0 ? /* @__PURE__ */ i(
    Sn,
    {
      title: ot.timelineStatusDataErrorTitle,
      detail: ot.timelineStatusDataErrorDetail(de.invalidEntries)
    }
  ) : $ ? /* @__PURE__ */ h("div", { className: "relative isolate min-h-[100dvh] overflow-hidden bg-[var(--page-bg)] text-[var(--ink)] selection:bg-emerald-500/25 selection:text-[var(--ink)]", children: [
    /* @__PURE__ */ i(rs, {}),
    /* @__PURE__ */ h("div", { className: "relative z-10", children: [
      d ? null : /* @__PURE__ */ i("div", { className: "md:hidden", children: /* @__PURE__ */ i(
        ss,
        {
          activeArticleSlug: xe,
          boardView: C,
          camera: H,
          currentGlobalDay: Se,
          handleTouchEnd: _r,
          handleTouchMove: Pr,
          handleTouchStart: Lr,
          handleZoomChange: Ja,
          hiddenCompanyCount: _e,
          latestCompany: za,
          minZoom: Dt,
          maxZoom: ua,
          maxDays: kt,
          maxSummaryQuietDays: Ba,
          modelExplorer: /* @__PURE__ */ i(En, { ...qa, variant: "rail" }),
          monthTicks: hr,
          onCompanyHide: Oa,
          onCompanyMove: Va,
          onDismissArticle: ja,
          onModelSelect: Lt,
          onResetCamera: kr,
          onShowHiddenCompanies: Wa,
          onToggleTimelineGrid: Ha,
          processedCompanies: de.processedCompanies,
          renderWindow: mr,
          scrollContainerRef: D,
          showTimelineGrid: Q,
          timelineStartDay: Rt,
          timelineWidth: ta,
          viewport: k.mobile,
          worldRef: K,
          yearTicks: gr,
          zoom: b
        }
      ) }),
      d ? /* @__PURE__ */ i("div", { className: "hidden md:block", children: /* @__PURE__ */ i(
        os,
        {
          activeArticleSlug: xe,
          boardView: C,
          camera: A,
          currentGlobalDay: Se,
          handlePointerDown: Rr,
          handlePointerMove: Ar,
          handleZoomChange: Qa,
          hiddenCompanyCount: _e,
          isPanning: N,
          latestCompany: za,
          maxDays: Ct,
          minZoom: xt,
          maxZoom: Pt,
          maxSummaryQuietDays: Ba,
          modelExplorer: /* @__PURE__ */ i(En, { ...qa, variant: "rail" }),
          monthTicks: fr,
          onCompanyHide: Oa,
          onCompanyMove: Va,
          onDismissArticle: ja,
          onModelSelect: Lt,
          onResetCamera: Sr,
          onShowHiddenCompanies: Wa,
          onToggleTimelineGrid: Ha,
          processedCompanies: de.processedCompanies,
          renderWindow: ur,
          scrollContainerRef: g,
          showTimelineGrid: Q,
          stopPanning: Ir,
          summaryCompanies: bt,
          timelineStartDay: St,
          timelineWidth: ea,
          viewport: k.desktop,
          worldRef: O,
          yearTicks: pr,
          zoom: x
        }
      ) }) : null
    ] }),
    /* @__PURE__ */ i(He, { children: Ue ? /* @__PURE__ */ i(
      jo,
      {
        entry: Ne,
        onBack: Ga,
        onNavigate: Lt,
        requestedSlug: xe ?? ""
      }
    ) : null })
  ] }) : /* @__PURE__ */ i(is, {});
}
export {
  ei as DAY_MS,
  hs as TimelineExperience,
  ps as buildTimelineArticleIndex,
  ti as createTimelineItemSlug,
  ke as formatTimelineDate,
  _n as formatTimelineDateRange,
  Fn as getTimelineItemSlug,
  fs as indexTimelineArticles,
  Re as parseTimelineDate
};
