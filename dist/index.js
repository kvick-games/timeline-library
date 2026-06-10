import { jsx as o, jsxs as h, Fragment as xt } from "react/jsx-runtime";
import Dt, { useState as xe, useRef as Z, useMemo as ve, useEffect as Me, useCallback as un } from "react";
import { flushSync as Fn } from "react-dom";
import { EyeOff as $n, Eye as Un, RotateCcw as qt, Layers3 as it, ArrowLeft as Hr, CalendarDays as Kt, BookOpen as Xn, ExternalLink as Vr, ArrowUp as Gr, ArrowDown as jr, X as Yn, SlidersHorizontal as qr, ChevronDown as Kr, ArrowRight as Zr, Sparkles as Qr, Check as Jr, BrainCircuit as eo, Globe2 as to, Image as ao, Clapperboard as zn, AudioLines as no, Box as ro, Code2 as oo, Bot as io, CarFront as so } from "lucide-react";
import { AnimatePresence as Ge, motion as me } from "motion/react";
const lo = 1e3 * 60 * 60 * 24;
function co(t, a, n, r) {
  const e = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${e(t)}-${e(a)}-${e(n)}-${r}`;
}
function Ae(t) {
  return /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
}
function ke(t, a = { month: "short", day: "numeric", year: "numeric" }, n = "day") {
  const r = typeof t == "string" ? Ae(t) : t;
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
function Bn(t, a, n = "day", r = "day") {
  if (!a || a === t)
    return ke(t, void 0, n);
  const e = Ae(t), s = Ae(a);
  if (Number.isNaN(e.getTime()) || Number.isNaN(s.getTime()))
    return `${t} - ${a}`;
  if (s.getTime() < e.getTime())
    return `${ke(t, void 0, n)} - ${ke(a, void 0, r)}`;
  if (n !== "day" || r !== "day")
    return `${ke(e, void 0, n)} - ${ke(s, void 0, r)}`;
  const l = e.getUTCFullYear() === s.getUTCFullYear();
  return l && e.getUTCMonth() === s.getUTCMonth() ? `${ke(e, { month: "short", day: "numeric" })}-${ke(s, { day: "numeric" })}, ${s.getUTCFullYear()}` : l ? `${ke(e, { month: "short", day: "numeric" })} - ${ke(s, { month: "short", day: "numeric", year: "numeric" })}` : `${ke(e)} - ${ke(s)}`;
}
function On(t, a, n) {
  return n.articleSlug ?? co(t, a, n.name, n.date);
}
function Ss(t) {
  return t.reduce((a, n) => (a[n.slug] = n, a), {});
}
function ks({
  articlesBySlug: t,
  eventTypesById: a,
  fallbackEventTypeId: n,
  groups: r
}) {
  const e = [];
  return r.forEach((s) => {
    s.productLines.forEach((l) => {
      const c = [...l.releases].sort(
        (d, f) => Ae(d.date).getTime() - Ae(f.date).getTime()
      ), m = c.map((d) => On(s.id, l.id, d));
      c.forEach((d, f) => {
        var k, _;
        const x = m[f], w = a[d.eventType ?? n] ?? a[n], b = Ae(d.date), v = d.endDate ? Ae(d.endDate) : b, M = Number.isNaN(b.getTime()) || Number.isNaN(v.getTime()) ? 1 : Math.max(1, Math.round((v.getTime() - b.getTime()) / lo) + 1);
        e.push({
          accent: s.accent,
          article: t[x] ?? null,
          classes: d.classes ?? l.defaultClasses ?? s.defaultClasses ?? [l.classId],
          companyLogoMark: s.logoMark ?? "generic",
          companyId: s.id,
          companyName: s.name,
          date: d.date,
          dateLabel: ke(d.date, void 0, d.datePrecision),
          dateRangeLabel: Bn(d.date, d.endDate, d.datePrecision),
          durationDays: M,
          endDate: d.endDate,
          endDateLabel: d.endDate ? ke(d.endDate) : void 0,
          eventKind: w.kind,
          eventType: w.id,
          eventTypeLabel: w.label,
          eventTypeShortLabel: w.shortLabel,
          name: d.name,
          nextName: ((k = c[f + 1]) == null ? void 0 : k.name) ?? null,
          nextSlug: m[f + 1] ?? null,
          presets: d.presets ?? l.defaultPresets ?? s.defaultPresets,
          tags: d.tags ?? l.defaultTags ?? [],
          previousName: ((_ = c[f - 1]) == null ? void 0 : _.name) ?? null,
          previousSlug: m[f - 1] ?? null,
          productLineId: l.id,
          productLineLabel: l.label,
          productLineShortLabel: l.shortLabel,
          slug: x
        });
      });
    });
  }), e;
}
let Na = null;
function uo(t) {
  Na = t;
}
function le() {
  if (!Na)
    throw new Error("TimelineExperience requires a timeline definition before rendering.");
  return Na;
}
function Ye() {
  return le().groups;
}
function mo() {
  return le().facets;
}
function Wn() {
  return le().filterGroups;
}
function je() {
  return Wn().flatMap((t) => t.domainIds);
}
function nt() {
  return le().attributeFilterIds;
}
function fo() {
  const t = le().defaultFilterState;
  return {
    attributeIds: [...t.attributeIds],
    companyIds: [...t.companyIds],
    contentType: t.contentType,
    domainIds: [...t.domainIds]
  };
}
function Zt() {
  return le().contentTypeOptions;
}
function Qt() {
  return le().defaultSortMode;
}
function Hn() {
  return le().displayLimits;
}
function Jt() {
  return le().defaultDisplayLimit;
}
function po() {
  return le().eventTypes.reduce(
    (t, a) => (t[a.id] = a, t),
    {}
  );
}
function Ze() {
  return le().copy;
}
function rt() {
  return Ae(le().startDate);
}
function zt(t, a) {
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
  return fo();
}
function qe(t) {
  const a = Ye().map((n) => n.id);
  return {
    attributeIds: We(t.attributeIds, nt()),
    companyIds: We(t.companyIds, a),
    contentType: Zt().some((n) => n.id === t.contentType) ? t.contentType : "all",
    domainIds: We(t.domainIds, je())
  };
}
function Vn(t, a) {
  return t.contentType === a.contentType && zt(t.attributeIds, a.attributeIds) && zt(t.companyIds, a.companyIds) && zt(t.domainIds, a.domainIds);
}
function Wt(t) {
  return mo().find((a) => a.id === t);
}
function mn(t) {
  var a;
  return ((a = Wt(t)) == null ? void 0 : a.label) ?? t;
}
function ho(t) {
  return new Set(je()).has(t);
}
function go(t) {
  return We(t.filter(ho), je());
}
function ma(t) {
  return t.join(",");
}
function fa(t, a) {
  if (!t)
    return [];
  const n = t.split(",").map((r) => r.trim()).filter(Boolean);
  return We(n, a);
}
function fn(t) {
  return t.productLines.reduce((a, n) => {
    const r = n.releases.reduce((e, s) => {
      const l = Ae(s.date).getTime();
      return Number.isNaN(l) ? e : Math.max(e, l);
    }, 0);
    return Math.max(a, r);
  }, 0);
}
function vo(t) {
  var a, n;
  return ((n = (a = le().scoring) == null ? void 0 : a.getFacetSignificanceBase) == null ? void 0 : n.call(a, t)) ?? 50;
}
function xo(t) {
  var a, n;
  return ((n = (a = le().scoring) == null ? void 0 : a.getEventTypeSignificanceBonus) == null ? void 0 : n.call(a, t)) ?? 0;
}
function bo(t, a) {
  var e, s;
  const n = (s = (e = le().scoring) == null ? void 0 : e.getRecencySignificanceBonus) == null ? void 0 : s.call(
    e,
    t,
    a
  );
  if (n !== void 0)
    return n;
  const r = a - t;
  return r < 0 ? 2 : r <= 60 ? 12 : r <= 180 ? 9 : r <= 365 ? 6 : r <= 730 ? 3 : 0;
}
function Gn(t, a, n, r) {
  var v, M, k, _;
  const e = Ae(n.date), s = n.endDate ? Ae(n.endDate) : e, l = Number.isNaN(s.getTime()) ? 0 : Math.round((s.getTime() - rt().getTime()) / ot), c = Sa(t, a, n), m = ir(t, a, n), d = ka(n), f = c.reduce(
    (V, Q) => Math.max(V, vo(Q)),
    40
  ), x = ((M = (v = le().scoring) == null ? void 0 : v.getTagSignificanceBonus) == null ? void 0 : M.call(v, m)) ?? 0, w = ((_ = (k = le().scoring) == null ? void 0 : k.getGroupRankBonus) == null ? void 0 : _.call(k, t)) ?? 0, b = f + x + w + xo(d.id) + bo(l, r);
  return ie(Math.round(b), 1, 100);
}
function yo(t, a, n) {
  return a.releases.reduce(
    (r, e) => Math.max(r, Gn(t, a, e, n)),
    0
  );
}
function pn(t, a) {
  return t.productLines.reduce(
    (n, r) => Math.max(n, yo(t, r, a)),
    0
  );
}
function wo(t, a, n) {
  const r = [...t];
  return a === "significance" ? (r.sort(
    (e, s) => pn(s, n) - pn(e, n) || (e.raceRank ?? 999) - (s.raceRank ?? 999) || e.name.localeCompare(s.name)
  ), r) : a === "latest" ? (r.sort(
    (e, s) => fn(s) - fn(e) || e.name.localeCompare(s.name)
  ), r) : (r.sort((e, s) => e.name.localeCompare(s.name)), r);
}
const ot = 1e3 * 60 * 60 * 24, Ce = 2.24, Ca = [0.22, 1, 0.36, 1], $e = { duration: 0.34, ease: Ca }, jn = { duration: 0.24, ease: Ca }, To = { duration: 0.4, ease: Ca }, pt = 320, ht = 196, Eo = "#05070b", Mo = 72, No = 80, Do = 56, Co = 60, Ro = 8, So = 44, ko = 32, Ao = 96, Io = 56, Lo = 80, _o = 40, Bt = 1, Ot = 1.05, Ft = 4, pa = 3.4, Po = 420, Fo = 360, qn = 180, $o = 300, Uo = 180, Xo = 260, Kn = 112, Yo = 380, ha = 0.06, gt = 6, Zn = 0.92, zo = 25e-5, Bo = 0.025, dt = 18, Oo = 8, hn = 0.08, gn = 6e-4, Wo = 720, Ho = 720, vn = 540, Vo = 120, xn = 90, bn = 180, ga = 420, va = 168, ft = 64, Go = 0.88, jo = 1.65, qo = 1.45, yn = 6, Ko = {
  bottom: 48,
  left: 24,
  right: 24,
  top: 72
}, Qn = 760, Jn = 0.58, Zo = 0.58, er = { x: 0.5, y: 0.46 };
function tr(t) {
  return t ? le().wideLogoMarks.includes(t) : !1;
}
function Ra(t) {
  return `${"/".endsWith("/") ? "/" : "//"}${t.replace(/^\/+/, "")}`;
}
function ea(t) {
  const a = t.replace(/^#\/?/, ""), n = a.indexOf("?"), r = n >= 0 ? a.slice(0, n) : a, e = n >= 0 ? a.slice(n + 1) : "";
  return {
    params: new URLSearchParams(e),
    path: r
  };
}
function ar(t) {
  const { path: a } = ea(t);
  if (!a)
    return { kind: "timeline" };
  const r = (le().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), e = a.match(new RegExp(`^(?:${r}|events)/([^/?#]+)$`));
  return e ? { kind: "model", slug: decodeURIComponent(e[1]) } : { kind: "timeline" };
}
function nr(t) {
  const { params: a } = ea(t), n = a.get("ct"), r = bt();
  return qe({
    attributeIds: fa(a.get("a"), nt()),
    companyIds: fa(a.get("co"), Ye().map((e) => e.id)),
    contentType: Zt().some((e) => e.id === n) ? n : "all",
    domainIds: a.has("d") ? fa(a.get("d"), je()) : r.domainIds
  });
}
function rr(t) {
  const a = ea(t).params.get("sort");
  return a && le().sortOptions.some((n) => n.id === a) ? a : Qt();
}
function or(t) {
  const a = ea(t).params.get("rows");
  if (a === "all")
    return "all";
  const n = Number.parseInt(a ?? "", 10);
  return Hn().includes(n) ? n : Jt();
}
function xa({
  companySortMode: t,
  filterState: a,
  route: n,
  significanceDisplayLimit: r
}) {
  const e = qe(a), s = bt(), l = new URLSearchParams();
  zt(e.domainIds, s.domainIds) || l.set("d", ma(e.domainIds)), e.attributeIds.length > 0 && l.set("a", ma(e.attributeIds)), e.contentType !== s.contentType && l.set("ct", e.contentType), e.companyIds.length > 0 && l.set("co", ma(e.companyIds)), t !== Qt() && l.set("sort", t), r !== Jt() && l.set("rows", String(r));
  const c = le().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items", m = n.kind === "model" ? `/${c}/${encodeURIComponent(n.slug)}` : "/", d = l.toString().replaceAll("%2C", ",");
  return `#${m}${d ? `?${d}` : ""}`;
}
function Qo() {
  return typeof window > "u" ? { kind: "timeline" } : ar(window.location.hash);
}
function Jo() {
  return typeof window > "u" ? bt() : nr(window.location.hash);
}
function ei() {
  return typeof window > "u" ? Qt() : rr(window.location.hash);
}
function ti() {
  return typeof window > "u" ? Jt() : or(window.location.hash);
}
function ai(t) {
  return !(t instanceof Element) || t.closest(
    "button, a, input, label, select, textarea, [data-row-focus-label], [data-timeline-pin]"
  ) ? !1 : !!t.closest("[data-timeline-field]");
}
function ni(t, a) {
  if (a && typeof document < "u") {
    const n = document.elementFromPoint(a.clientX, a.clientY);
    if (n)
      return n;
  }
  return t;
}
function ba(t, a, n, r) {
  if (!a)
    return;
  const e = ni(t, r);
  ai(e) && n();
}
function ri(t, a) {
  return t.toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...a
  });
}
function ya(t, a, n) {
  const r = t.replace("#", ""), e = r.length === 3 ? r.split("").map((f) => `${f}${f}`).join("") : r, s = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e))
    return t;
  const l = Number.parseInt(e.slice(0, 2), 16), c = Number.parseInt(e.slice(2, 4), 16), m = Number.parseInt(e.slice(4, 6), 16), d = (f) => Math.round(f + (a - f) * s);
  return `rgb(${d(l)} ${d(c)} ${d(m)})`;
}
function oi(t, a, n) {
  const r = (w) => {
    const b = w.replace("#", "");
    return b.length === 3 ? b.split("").map((v) => `${v}${v}`).join("") : b;
  }, e = r(t), s = r(a), l = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e) || !/^[0-9a-fA-F]{6}$/.test(s))
    return t;
  const c = [e.slice(0, 2), e.slice(2, 4), e.slice(4, 6)].map(
    (w) => Number.parseInt(w, 16)
  ), m = [s.slice(0, 2), s.slice(2, 4), s.slice(4, 6)].map(
    (w) => Number.parseInt(w, 16)
  ), [d, f, x] = c.map(
    (w, b) => Math.round(w + (m[b] - w) * l)
  );
  return `rgb(${d} ${f} ${x})`;
}
function He(t, a) {
  const n = t.replace("#", ""), r = n.length === 3 ? n.split("").map((c) => `${c}${c}`).join("") : n;
  if (!/^[0-9a-fA-F]{6}$/.test(r))
    return `rgba(255, 255, 255, ${a})`;
  const e = Number.parseInt(r.slice(0, 2), 16), s = Number.parseInt(r.slice(2, 4), 16), l = Number.parseInt(r.slice(4, 6), 16);
  return `rgba(${e}, ${s}, ${l}, ${a})`;
}
function ii(t, a) {
  return a.defaultClasses ?? t.defaultClasses ?? [a.classId];
}
function si(t, a) {
  return a.defaultPresets ?? t.defaultPresets;
}
function li(t, a, n) {
  return n.classes ?? ii(t, a);
}
function Sa(t, a, n) {
  return n.presets ?? si(t, a);
}
function ci(t) {
  return t.defaultTags ?? [];
}
function ir(t, a, n) {
  return n.tags ?? ci(a);
}
function ka(t) {
  const a = po(), n = le().defaultEventTypeId;
  return a[t.eventType ?? n] ?? a[n];
}
function di(t) {
  var m;
  const a = qe(t), n = je().filter((d) => a.domainIds.includes(d)), r = Vn(a, bt()), e = Ze();
  if (n.length === 0)
    return {
      description: e.emptyBoardDetail,
      isComposite: !0,
      isDefault: !1,
      isEmpty: !0,
      label: e.emptyBoardLabel
    };
  if (r) {
    const d = a.domainIds[0], f = d ? Wt(d) : null;
    return {
      description: (f == null ? void 0 : f.description) ?? e.defaultBoardDescription,
      isComposite: !1,
      isDefault: !0,
      isEmpty: !1,
      label: (f == null ? void 0 : f.label) ?? n.join(", ")
    };
  }
  const l = [n.length === je().length ? "All domains" : n.length === 1 ? mn(n[0]) : `${n.length} domains`];
  a.attributeIds.forEach((d) => {
    l.push(mn(d));
  });
  const c = bt().contentType;
  return a.contentType !== c && l.push(
    ((m = Zt().find((d) => d.id === a.contentType)) == null ? void 0 : m.label) ?? a.contentType
  ), a.companyIds.length > 0 && l.push(`${a.companyIds.length} ${e.groupPluralLabel}`), {
    description: l.join(", "),
    isComposite: l.length > 1 || n.length > 1,
    isDefault: !1,
    isEmpty: !1,
    label: l.join(" · ")
  };
}
function ui(t, a) {
  if (a === "all")
    return !0;
  const n = ka(t), r = n.kind === "event" || n.id === "product-launch";
  return a === "events" ? r : !r;
}
function mi(t, a, n, r) {
  const e = Sa(t, a, n), s = r.domainIds.some((c) => e.includes(c)), l = r.attributeIds.length === 0 || r.attributeIds.some((c) => e.includes(c));
  return s && l && ui(n, r.contentType);
}
function ta(t, a, n = {}) {
  const r = qe(a), e = new Set(r.companyIds);
  return r.domainIds.length === 0 ? [] : t.filter((s) => n.ignoreCompanyFilter || e.size === 0 || e.has(s.id)).map((s) => ({
    ...s,
    productLines: s.productLines.map((l) => ({
      ...l,
      releases: l.releases.filter(
        (c) => mi(s, l, c, r)
      )
    })).filter((l) => l.releases.length > 0)
  })).filter((s) => s.productLines.length > 0);
}
function sr(t) {
  return {
    providerCount: t.length,
    releaseCount: t.reduce(
      (a, n) => a + n.productLines.reduce((r, e) => r + e.releases.length, 0),
      0
    )
  };
}
function fi(t, a) {
  return je().reduce((n, r) => (n[r] = sr(
    ta(t, { ...a, companyIds: [], domainIds: [r] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function pi(t, a) {
  return nt().reduce((n, r) => (n[r] = sr(
    ta(t, { ...a, attributeIds: [r], companyIds: [] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function hi(t, a) {
  return ta(t, { ...a, companyIds: [] }, { ignoreCompanyFilter: !0 }).map((n) => ({
    id: n.id,
    name: n.name,
    releaseCount: n.productLines.reduce((r, e) => r + e.releases.length, 0)
  }));
}
function gi(t) {
  const a = t.productLines.find((n) => n.classId !== "events") ?? t.productLines[0];
  return (a == null ? void 0 : a.classId) ?? t.defaultClasses[0] ?? le().defaultClassId;
}
function vi(t, a, n) {
  const r = [...t], [e] = r.splice(a, 1);
  return e === void 0 ? t : (r.splice(n, 0, e), r);
}
function Aa(t) {
  const a = new Set(Ye().map((s) => s.id)), n = t.filter((s) => a.has(s)), r = new Set(n), e = Ye().map((s) => s.id).filter((s) => !r.has(s));
  return [...n, ...e];
}
function xi(t, a, n, r, e) {
  const s = new Map(t.map((f) => [f.id, f])), l = new Set(n), c = Aa(a).map((f) => s.get(f)).filter((f) => !!f), m = new Set(c.map((f) => f.id)), d = t.filter((f) => !m.has(f.id));
  return wo(
    [...c, ...d].filter((f) => !l.has(f.id)),
    r,
    e
  );
}
function bi(t, a, n) {
  if (a === "all")
    return t;
  const r = t.slice(0, a);
  if (!n || r.some((s) => s.id === n))
    return r;
  const e = t.find((s) => s.id === n);
  return e ? [...r, e] : r;
}
function yi(t, a, n, r) {
  if (n === r)
    return t;
  const e = new Set(a), s = Aa(t), l = s.filter((x) => e.has(x)), c = l.indexOf(n), m = l.indexOf(r);
  if (c < 0 || m < 0)
    return s;
  const d = vi(l, c, m);
  let f = 0;
  return s.map((x) => {
    if (!e.has(x))
      return x;
    const w = d[f];
    return f += 1, w ?? x;
  });
}
function wi(t, a, n, r) {
  const e = new Set(a), s = Aa(t).filter(
    (m) => e.has(m)
  ), l = s.indexOf(n), c = r === "up" ? l - 1 : l + 1;
  return l < 0 || c < 0 || c >= s.length ? t : yi(t, a, n, s[c]);
}
function Ti(t, a) {
  const n = [], r = t.map((l) => {
    const c = l.productLines.map((v) => {
      const k = v.releases.map((y) => ({
        ...y,
        classes: li(l, v, y),
        presets: Sa(l, v, y),
        tags: ir(l, v, y)
      })).sort((y, I) => {
        const Y = Ae(y.date).getTime(), C = Ae(I.date).getTime();
        return Y - C || y.name.localeCompare(I.name);
      }).reduce((y, I) => {
        const Y = Ae(I.date), C = I.endDate ? Ae(I.endDate) : Y;
        if (Number.isNaN(Y.getTime()))
          return n.push(`${l.name} / ${v.label}: ${I.name}`), y;
        if (I.endDate && Number.isNaN(C.getTime()))
          return n.push(`${l.name} / ${v.label}: ${I.name} end date`), y;
        const B = y[y.length - 1], G = Math.round((Y.getTime() - rt().getTime()) / ot), ee = Number.isNaN(C.getTime()) ? G : Math.max(G, Math.round((C.getTime() - rt().getTime()) / ot)), F = B ? G - B.globalDay : 0, W = ka(I), O = Gn(l, v, I, a);
        return y.push({
          ...I,
          articleSlug: On(l.id, v.id, I),
          dateLabel: ke(Y, void 0, I.datePrecision),
          dateRangeLabel: Bn(I.date, I.endDate, I.datePrecision),
          durationDays: ee - G + 1,
          endDateLabel: I.endDate ? ke(I.endDate) : void 0,
          endGlobalDay: ee,
          eventKind: W.kind,
          eventType: W.id,
          eventTypeLabel: W.label,
          eventTypeShortLabel: W.shortLabel,
          globalDay: G,
          gap: F,
          significanceScore: O
        }), y;
      }, []), _ = k[k.length - 1] ?? null, V = k.reduce((y, I) => y + I.gap, 0), Q = k.length > 1 ? Math.round(V / (k.length - 1)) : null, ne = k[0], q = k.reduce(
        (y, I) => Math.max(y, I.significanceScore),
        0
      );
      return {
        ...v,
        averageGap: Q,
        latestRelease: _,
        releases: k,
        significanceScore: q,
        startDay: (ne == null ? void 0 : ne.globalDay) ?? 0,
        totalSpan: _ && ne ? _.endGlobalDay - ne.globalDay : 0
      };
    }).sort(
      (v, M) => {
        var k, _;
        return M.significanceScore - v.significanceScore || (((k = M.latestRelease) == null ? void 0 : k.globalDay) ?? 0) - (((_ = v.latestRelease) == null ? void 0 : _.globalDay) ?? 0) || v.label.localeCompare(M.label);
      }
    ), m = [...c].filter((v) => v.latestRelease).sort((v, M) => {
      var k, _;
      return (((k = M.latestRelease) == null ? void 0 : k.endGlobalDay) ?? 0) - (((_ = v.latestRelease) == null ? void 0 : _.endGlobalDay) ?? 0);
    })[0] ?? null, d = (m == null ? void 0 : m.latestRelease) ?? null, f = [...c].flatMap((v) => v.releases).sort((v, M) => v.globalDay - M.globalDay)[0] ?? null, x = c.reduce(
      (v, M) => v + M.releases.reduce((k, _) => k + _.gap, 0),
      0
    ), w = c.reduce(
      (v, M) => v + Math.max(M.releases.length - 1, 0),
      0
    ), b = c.reduce(
      (v, M) => Math.max(v, M.significanceScore),
      0
    );
    return {
      ...l,
      averageGap: w > 0 ? Math.round(x / w) : null,
      latestProductLine: m,
      latestRelease: d,
      productLines: c,
      significanceScore: b,
      startDay: (f == null ? void 0 : f.globalDay) ?? 0,
      totalSpan: d && f ? d.endGlobalDay - f.globalDay : 0
    };
  }), e = r.reduce((l, c) => {
    var d;
    const m = ((d = c.latestRelease) == null ? void 0 : d.endGlobalDay) ?? 0;
    return Math.max(l, m);
  }, 0), s = r.reduce(
    (l, c) => l + c.productLines.reduce((m, d) => m + d.releases.length, 0),
    0
  );
  return {
    invalidEntries: n,
    latestGlobalDay: e,
    processedCompanies: r,
    totalReleases: s
  };
}
function wn({ endDay: t, startDay: a }) {
  const n = [], r = [], e = Math.floor(a), s = Math.max(e, Math.ceil(t)), l = new Date(rt().getTime() + e * ot), c = new Date(rt().getTime() + s * ot), m = new Date(Date.UTC(l.getUTCFullYear(), l.getUTCMonth(), 1));
  for (m.getTime() < l.getTime() && m.setUTCMonth(m.getUTCMonth() + 1); m <= c; ) {
    const d = Math.round((m.getTime() - rt().getTime()) / ot);
    m.getUTCMonth() === 0 ? r.push({ days: d, label: m.getUTCFullYear() }) : n.push({
      days: d,
      label: ri(m, { month: "short" })
    }), m.setUTCMonth(m.getUTCMonth() + 1);
  }
  return { monthTicks: n, yearTicks: r };
}
function Ht({
  camera: t,
  compact: a = !1,
  futureBufferDays: n = 0,
  pastBufferDays: r = 0,
  viewport: e,
  zoom: s
}) {
  if (e.width <= 0)
    return { endDay: 0, startDay: 0 };
  const l = a ? ht : pt, c = a ? Kn : qn, m = Math.max(s, 1e-3), d = t.x, f = t.x + e.width / m, x = (d - c - l) / Ce, w = (f - c - l) / Ce, b = Math.floor(x - r);
  return { endDay: Math.max(b + 30, Math.ceil(w + n)), startDay: b };
}
function Ei(t, a = Vo) {
  const n = Math.max(1, a);
  return {
    endDay: Math.ceil(t.endDay / n) * n,
    startDay: Math.floor(t.startDay / n) * n
  };
}
function Tn({
  camera: t,
  compact: a = !1,
  viewport: n,
  zoom: r
}) {
  return n.width <= 0 ? { endDay: Number.POSITIVE_INFINITY, startDay: Number.NEGATIVE_INFINITY } : Ei(
    Ht({
      camera: t,
      compact: a,
      futureBufferDays: vn,
      pastBufferDays: vn,
      viewport: n,
      zoom: r
    })
  );
}
function Mi(t, a) {
  return t.startDay === a.startDay && t.endDay === a.endDay;
}
function $t(t, a, n) {
  return a >= n.startDay && t <= n.endDay;
}
function En({
  camera: t,
  compact: a = !1,
  minimumDays: n,
  viewport: r,
  zoom: e
}) {
  const s = Ht({
    camera: t,
    compact: a,
    futureBufferDays: Wo,
    pastBufferDays: Ho,
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
function Vt(t, a) {
  return Math.max(0, (a - t) * Ce);
}
function Ia(t, a) {
  return t.latestRelease ? Math.max(0, Math.floor(a - t.latestRelease.endGlobalDay)) : 0;
}
function Ni(t, a) {
  return a === 0 ? 100 : Math.max(0, Math.round((1 - t / a) * 100));
}
function Di(t) {
  return `${t} ${t === 1 ? "Day" : "Days"} since last update`;
}
function wa(t) {
  if (t <= 0)
    return "Same day";
  if (t < 31)
    return `${t} ${t === 1 ? "day" : "days"}`;
  const a = Math.floor(t / 365), n = t - a * 365, r = Math.floor(n / 30), e = n - r * 30, s = [];
  return a > 0 && s.push(`${a} ${a === 1 ? "year" : "years"}`), r > 0 && s.push(`${r} ${r === 1 ? "month" : "months"}`), e > 0 && a === 0 && s.push(`${e} ${e === 1 ? "day" : "days"}`), s.length > 0 ? s.join(", ") : `${t} days`;
}
function Ci(t, a) {
  if (a === null || a <= 0)
    return null;
  const n = t - a, r = Math.abs(n);
  return r <= 2 ? `On pace with this line's ${a}-day average` : `${r} ${r === 1 ? "day" : "days"} ${n > 0 ? "slower" : "faster"} than this line's ${a}-day average`;
}
function Ke(t, a = 1) {
  return Math.max(1, Math.round(t * a));
}
function La(t = !1, a = 1) {
  return Ke(t ? Co : Do, a);
}
function _a(t, a = !1, n = 1) {
  const r = Math.max(t, 1), e = Ke(a ? No : Mo, n), s = Ke(Ro, n), l = La(a, n), c = r * l + Math.max(r - 1, 0) * s, m = Math.max(e, c + (r > 1 ? Ke(16, n) : 0));
  return {
    groupHeight: m,
    lineGap: s,
    lineHeight: l,
    topOffset: Math.max(0, (m - c) / 2)
  };
}
function Pa(t, a = !1, n = 1) {
  return _a(t.productLines.length, a, n).groupHeight;
}
function Fa(t, a, n = !1, r = 1) {
  const { lineGap: e, lineHeight: s, topOffset: l } = _a(t, n, r);
  return l + a * (s + e) + s / 2;
}
function st(t = !1, a = 1) {
  return {
    bottomPadding: Ke(t ? _o : Io, a),
    companyGap: Ke(t ? ko : So, a),
    topPadding: Ke(t ? Lo : Ao, a)
  };
}
function Gt(t, a = !1, n = 1) {
  const r = st(a, n), e = t.reduce((l, c) => l + Pa(c, a, n), 0), s = Math.max(t.length - 1, 0) * r.companyGap;
  return Math.max(
    Ke(a ? 384 : 448, n),
    e + s + r.topPadding + r.bottomPadding + Ke(a ? 40 : 32, n)
  );
}
function Ct(t, a = !1, n = 1, r = st(a, n)) {
  let e = r.topPadding;
  return t.map((s, l) => {
    const c = Pa(s, a, n), m = {
      company: s,
      height: c,
      index: l,
      y: e
    };
    return e += c + r.companyGap, m;
  });
}
function jt({
  compact: t = !1,
  currentGlobalDay: a,
  maxDays: n,
  summaryCount: r,
  timelineStartDay: e = 0,
  timelineHeight: s,
  timelineWidth: l,
  viewport: c
}) {
  const m = Math.max(c.width, t ? 360 : 1024), d = Math.max(c.height, t ? 720 : 680), f = t ? ht : pt, x = t ? Kn : qn, w = t ? Yo : $o, b = t ? Uo : Po, v = t ? Xo : Fo, M = x + f + a * Ce, k = Math.max(0, M - m * (t ? 0.78 : 0.72)), _ = t ? Math.min(390, Math.max(292, m - 64)) : 720, V = t ? Math.min(360, Math.max(280, m - 56)) : 360, Q = t ? Math.min(420, Math.max(290, m - 48)) : 520, ne = t ? Math.min(620, Math.max(320, m - 32)) : 1180, q = Math.max(b * 0.34, k + (t ? 20 : m * 0.24)), y = t ? 0 : 4, I = Math.max(
    0,
    Math.min(
      w - d * (t ? 0.28 : 0.24),
      y - (t ? 18 : 24)
    )
  ), Y = t ? q + _ + 18 : Math.min(q + _ + 28, k + m - V - 24), C = y + 8, B = q, G = w + s + (t ? 42 : 52), ee = q, F = G + (t ? 132 : 118), W = t ? m >= 640 ? 2 : 1 : 4, E = Math.max(1, Math.ceil(Math.max(r, 1) / W)) * (t ? 172 : 224), D = x + f + Math.max(n, 0) * Ce, P = x + e * Ce, $ = Math.max(
    D + b,
    P + l + f + b,
    Y + V + b,
    ee + ne + b,
    k + m + b
  ), g = Math.max(
    w + s + v,
    F + E + v,
    C + (t ? 152 : 172) + v,
    I + d + v
  );
  return {
    contentCards: {
      intro: { height: t ? 176 : 202, width: _, x: q, y },
      latest: { height: t ? 96 : 74, width: Q, x: B, y: G },
      notes: { height: t ? 142 : 170, width: V, x: Y, y: C },
      summaries: { width: ne, x: ee, y: F }
    },
    initialCameraX: k,
    initialCameraY: I,
    railWidth: f,
    timelineX: x,
    timelineY: w,
    worldHeight: g,
    worldWidth: $
  };
}
function Ri(t) {
  return {
    x: t.initialCameraX,
    y: t.initialCameraY
  };
}
function Ut(t, a = !1) {
  return {
    camera: Ri(t),
    zoom: a ? Ot : Bt
  };
}
function $a(t) {
  return Number.isFinite(t) ? Math.max(1e-3, t) : 1;
}
function Ua(t, a) {
  return `translate3d(${-t.x * a}px, ${-t.y * a}px, 0) scale(${a})`;
}
const Ta = /* @__PURE__ */ new WeakMap(), Si = 126;
function Xt(t, a, n) {
  if (!t)
    return;
  t.style.transform = Ua(a, n), t.style.setProperty("--map-zoom", String($a(n))), t.style.willChange = "transform";
  const r = Ta.get(t);
  r !== void 0 && window.clearTimeout(r);
  const e = window.setTimeout(() => {
    t.style.willChange = "auto", Ta.delete(t);
  }, Si);
  Ta.set(t, e);
}
function Ve(t) {
  return {
    "--label-size": String(t)
  };
}
function Ea(t, a, n) {
  const r = t.maxX - t.minX, e = t.maxY - t.minY, s = Math.max(0, (a - r) / 2), l = Math.max(0, (n - e) / 2);
  return {
    maxX: t.maxX + s,
    maxY: t.maxY + l,
    minX: t.minX - s,
    minY: t.minY - l
  };
}
function Xa(t, a) {
  for (const n of t)
    for (let r = 0; r < n.productLines.length; r += 1) {
      const s = n.productLines[r].releases.find((l) => l.articleSlug === a);
      if (s)
        return { company: n, productLineIndex: r, release: s };
    }
  return null;
}
const lr = 6, ki = 2.75;
function Ai(t, a, n, r) {
  const e = st(n, r), s = Ct(t, n, r, e), l = new Map(s.map((m) => [m.company.id, m])), c = [];
  return t.forEach((m) => {
    const d = l.get(m.id);
    d && m.productLines.forEach((f, x) => {
      f.releases.forEach((w) => {
        c.push({
          slug: w.articleSlug,
          x: a.timelineX + a.railWidth + w.globalDay * Ce,
          y: a.timelineY + d.y + Fa(m.productLines.length, x, n, r)
        });
      });
    });
  }), c;
}
function Ii(t, a, n, r, e, s, l, c) {
  if (e) {
    const d = Xa(t, e);
    if (d) {
      const x = Ct(
        t,
        n,
        r,
        st(n, r)
      ).find((w) => w.company.id === d.company.id);
      if (x)
        return {
          x: a.timelineX + a.railWidth + d.release.globalDay * Ce,
          y: a.timelineY + x.y + Fa(d.company.productLines.length, d.productLineIndex, n, r)
        };
    }
  }
  const m = Math.max(l, 1e-3);
  return {
    x: s.x + c.width / (2 * m),
    y: s.y + c.height / (2 * m)
  };
}
function Li(t, a, n, r) {
  const e = (r == null ? void 0 : r.minPrimaryDistance) ?? lr;
  let s = null, l = 1 / 0, c = 1 / 0;
  return a.forEach((m) => {
    if (r != null && r.excludeSlug && m.slug === r.excludeSlug)
      return;
    const d = m.x - t.x, f = m.y - t.y;
    let x = 0, w = 0;
    if (n === "right") {
      if (d < e)
        return;
      x = d, w = Math.abs(f);
    } else if (n === "left") {
      if (d > -e)
        return;
      x = -d, w = Math.abs(f);
    } else if (n === "down") {
      if (f < e)
        return;
      x = f, w = Math.abs(d);
    } else {
      if (f > -e)
        return;
      x = -f, w = Math.abs(d);
    }
    const b = w * ki + x, v = Math.hypot(d, f);
    (b < l || b === l && v < c) && (s = m, l = b, c = v);
  }), s;
}
function _i(t) {
  return t === "ArrowRight" ? "right" : t === "ArrowLeft" ? "left" : t === "ArrowDown" ? "down" : t === "ArrowUp" ? "up" : null;
}
function Pi(t) {
  if (t.altKey || t.ctrlKey || t.metaKey)
    return !0;
  const a = t.target;
  return a instanceof Element ? a.closest('[aria-label="Timeline zoom controls"]') ? !0 : !!a.closest('input, textarea, select, [contenteditable="true"]') : !1;
}
function Mn({
  compact: t = !1,
  layout: a,
  productLineIndex: n,
  release: r,
  row: e,
  verticalScale: s = 1
}) {
  const l = La(t, s), c = a.timelineY + e.y + Fa(e.company.productLines.length, n, t, s), m = a.timelineX + a.railWidth + r.globalDay * Ce, d = a.timelineX + a.railWidth + r.endGlobalDay * Ce, f = t ? 28 : 36;
  return {
    maxX: Math.max(m, d) + f,
    maxY: c + l / 2 + 12,
    minX: Math.min(m, d) - f,
    minY: c - l / 2 - 12
  };
}
function Fi(t, a, n) {
  return n ? a ? { bottom: 40, left: 16, right: 16, top: 64 } : {
    bottom: 48,
    left: 100,
    right: Math.min(Qn, Math.round(t.width * Jn)),
    top: 72
  } : Ko;
}
function $i(t, a) {
  const n = Math.min(
    Qn,
    Math.round(t.width * Jn)
  ), e = (t.width - n) * Zo, s = Math.max(
    1,
    t.width - a.left - a.right - ft * 2
  );
  return { x: ie(
    (e - a.left - ft) / s,
    0.42,
    0.68
  ), y: er.y };
}
function Ui({
  anchor: t,
  bounds: a,
  focusMaxZoom: n,
  insets: r,
  layout: e,
  maxZoom: s,
  minZoom: l,
  viewport: c
}) {
  if (c.width <= 0 || c.height <= 0)
    return null;
  const m = Math.max(
    1,
    c.width - r.left - r.right - ft * 2
  ), d = Math.max(
    1,
    c.height - r.top - r.bottom - ft * 2
  ), f = Math.max(a.maxX - a.minX, 1), x = Math.max(a.maxY - a.minY, 1), w = Math.min(m / f, d / x) * Zn * Go, b = Number(ie(w, l, Math.min(s, n)).toFixed(3)), v = (a.minX + a.maxX) / 2, M = (a.minY + a.maxY) / 2, k = r.left + ft + m * t.x, _ = r.top + ft + d * t.y, V = Math.max(0, e.worldWidth - c.width / b), Q = Math.max(0, e.worldHeight - c.height / b);
  return {
    camera: {
      x: ie(v - k / b, 0, V),
      y: ie(M - _ / b, 0, Q)
    },
    zoom: b
  };
}
function Xi(t, a, n, r, e = !1, s = 1) {
  if (t.kind === "bounds")
    return t.bounds;
  const l = st(e, s), c = Ct(a, e, s, l);
  if (t.kind === "slug") {
    const b = Xa(a, t.slug);
    if (!b)
      return null;
    const v = c.find((k) => k.company.id === b.company.id);
    if (!v)
      return null;
    const M = Mn({
      compact: e,
      layout: n,
      productLineIndex: b.productLineIndex,
      release: b.release,
      row: v,
      verticalScale: s
    });
    return Ea(M, ga, va);
  }
  if (t.kind === "release") {
    const b = c.find((k) => k.company.id === t.companyId);
    if (!b)
      return null;
    const v = b.company.productLines.findIndex((k) => k.id === t.productLineId);
    if (v < 0)
      return null;
    const M = Mn({
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
    return Ea(M, ga, va);
  }
  const m = n.timelineX + n.railWidth + t.globalDay * Ce, d = t.endGlobalDay ?? t.globalDay, f = n.timelineX + n.railWidth + d * Ce, x = n.timelineY + r * 0.44, w = e ? 100 : 120;
  return Ea(
    {
      maxX: Math.max(m, f) + 40,
      maxY: x + w / 2,
      minX: Math.min(m, f) - 40,
      minY: x - w / 2
    },
    ga,
    va
  );
}
function Yi(t, a, n, r) {
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
function Nn({
  anchorX: t,
  anchorY: a,
  camera: n,
  existingAnchor: r,
  zoom: e
}) {
  if (r && r.viewportX === t && r.viewportY === a)
    return r;
  const { worldX: s, worldY: l } = Yi(n, e, t, a);
  return {
    viewportX: t,
    viewportY: a,
    worldX: s,
    worldY: l
  };
}
function mt(t, a, n) {
  return t + (a - t) * n;
}
function ie(t, a, n) {
  return Math.min(Math.max(t, a), n);
}
function zi(t) {
  const a = ie(t, 0, 1), n = 1 / (1 + Math.exp(gt / 2)), r = 1 / (1 + Math.exp(-gt / 2));
  return (1 / (1 + Math.exp(-gt * (a - 0.5))) - n) / (r - n);
}
function Bi(t) {
  const a = ie(t, 0, 1), n = 1 / (1 + Math.exp(gt / 2)), r = 1 / (1 + Math.exp(-gt / 2)), e = n + a * (r - n);
  return ie(0.5 + Math.log(e / (1 - e)) / gt, 0, 1);
}
function Da(t, a, n) {
  if (n <= a)
    return a;
  const r = zi(t);
  return a + r * (n - a);
}
function cr(t, a, n) {
  if (n <= a)
    return 0;
  const r = (ie(t, a, n) - a) / (n - a);
  return Bi(r);
}
function Mt(t, a, n, r) {
  const e = cr(t, n, r);
  return Da(e + a, n, r);
}
function Dn(t, a, n) {
  if (t <= 0 || n <= 0)
    return 0.35;
  const r = Math.max(t - a, 120);
  return ie(r / n * Zn, 0.08, 1);
}
function Oi(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ o("path", { d: "M11 5v12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ o("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Wi(t) {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ o("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ o("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ o("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Nt({ classId: t, className: a }) {
  const n = a ?? "h-4 w-4";
  return t === "frontier-llms" ? /* @__PURE__ */ o(eo, { className: n, strokeWidth: 1.8 }) : t === "open-source-llms" ? /* @__PURE__ */ o(to, { className: n, strokeWidth: 1.8 }) : t === "image-generation" ? /* @__PURE__ */ o(ao, { className: n, strokeWidth: 1.8 }) : t === "video-generation" ? /* @__PURE__ */ o(zn, { className: n, strokeWidth: 1.8 }) : t === "audio-generation" ? /* @__PURE__ */ o(no, { className: n, strokeWidth: 1.8 }) : t === "3d-generation" ? /* @__PURE__ */ o(ro, { className: n, strokeWidth: 1.8 }) : t === "world-models" ? /* @__PURE__ */ o(it, { className: n, strokeWidth: 1.8 }) : t === "coding-harnesses" ? /* @__PURE__ */ o(oo, { className: n, strokeWidth: 1.8 }) : t === "events" ? /* @__PURE__ */ o(Kt, { className: n, strokeWidth: 1.8 }) : t === "robotics" ? /* @__PURE__ */ o(io, { className: n, strokeWidth: 1.8 }) : t === "vehicle-autonomy" ? /* @__PURE__ */ o(so, { className: n, strokeWidth: 1.8 }) : /* @__PURE__ */ o(it, { className: n, strokeWidth: 1.8 });
}
function Hi({
  attributeStats: t,
  boardView: a,
  className: n = "",
  companySortMode: r,
  companyOptions: e,
  domainStats: s,
  filterState: l,
  isOpen: c,
  onAttributeToggle: m,
  onClearAll: d,
  onClearCompanyFilter: f,
  onCompanyToggle: x,
  onCompanySortModeChange: w,
  onContentTypeChange: b,
  onDomainToggle: v,
  onReset: M,
  onSelectAll: k,
  onSignificanceDisplayLimitChange: _,
  onToggle: V,
  significanceDisplayLimit: Q,
  totalMatchedCompanyCount: ne,
  variant: q = "panel",
  visibleCompanyCount: y
}) {
  var j;
  const I = l.domainIds.length + l.attributeIds.length + l.companyIds.length + (l.contentType === "all" ? 0 : 1), Y = q === "rail", C = Y && !c, B = Ze(), G = `${Y ? c ? "w-[var(--category-expanded-width,286px)]" : "w-[74px]" : "w-full"} timeline-fluid-obstacle overflow-hidden rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${C ? "cursor-pointer hover:bg-[var(--surface-strong)]" : ""} ${n}`, ee = ({
    buttonKey: E,
    description: D,
    icon: P,
    isSelected: $,
    meta: g,
    onClick: R,
    title: H
  }) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      title: H,
      disabled: !c,
      onClick: R,
      className: `flex h-11 w-full items-center gap-2 rounded-[0.85rem] border px-2.5 text-left transition duration-300 active:scale-[0.99] ${$ ? "border-[var(--edge-strong)] bg-[var(--surface-strong)]" : "border-[var(--edge)] bg-transparent hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
      children: [
        P ?? /* @__PURE__ */ o(Qr, { className: "h-4 w-4 shrink-0 text-[var(--ink)]", strokeWidth: 1.8 }),
        /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ o("span", { className: "block truncate text-xs font-semibold tracking-tight text-[var(--ink)]", children: D }),
          /* @__PURE__ */ o("span", { className: "mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--muted)]", children: g })
        ] }),
        /* @__PURE__ */ o(
          "span",
          {
            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${$ ? "border-[var(--edge-strong)] bg-[var(--ink)] text-[var(--page-bg)]" : "border-[var(--edge)] text-transparent"}`,
            children: /* @__PURE__ */ o(Jr, { className: "h-3 w-3", strokeWidth: 2 })
          }
        )
      ]
    },
    E
  ), F = le().sortOptions, W = ((j = F.find((E) => E.id === r)) == null ? void 0 : j.label) ?? "Significance", O = r === "significance" ? "score" : W;
  return /* @__PURE__ */ h("aside", { className: G, onClick: C ? V : void 0, children: [
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-expanded": c,
        "aria-label": "Timeline filter and sort controls",
        onClick: (E) => {
          E.stopPropagation(), V();
        },
        className: `flex w-full items-center gap-3 text-left transition duration-300 hover:bg-[var(--surface-strong)] active:scale-[0.99] ${c ? "justify-between border-b border-[var(--edge)] px-3 py-3" : "justify-center px-0 py-4"}`,
        children: [
          /* @__PURE__ */ o("span", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink)] shadow-[var(--soft-shadow)]", children: /* @__PURE__ */ o(qr, { className: "h-4 w-4", strokeWidth: 1.8 }) }),
          c ? /* @__PURE__ */ h("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ o("span", { className: "block text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]", children: B.filterPanelLabel }),
            /* @__PURE__ */ o("span", { className: "mt-1 block truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.label }),
            /* @__PURE__ */ h("span", { className: "mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
              y,
              "/",
              ne,
              " rows · sort ",
              O
            ] })
          ] }) : /* @__PURE__ */ o("span", { className: "sr-only", children: a.label }),
          /* @__PURE__ */ o(
            Kr,
            {
              className: `h-4 w-4 shrink-0 text-[var(--ink-soft)] transition duration-300 ${c ? "rotate-180" : "-rotate-90"}`,
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
        "aria-hidden": !c,
        className: `overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${c ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"}`,
        style: { pointerEvents: c ? "auto" : "none" },
        children: /* @__PURE__ */ o(
          me.div,
          {
            initial: !1,
            animate: { y: c ? 0 : -10 },
            transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
            className: "max-h-[min(620px,calc(100dvh-18rem))] overflow-y-auto px-3 py-3",
            children: /* @__PURE__ */ h("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start", children: [
              /* @__PURE__ */ h("div", { className: "space-y-3", children: [
                Wn().map((E) => /* @__PURE__ */ h("div", { children: [
                  /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: E.label }),
                  /* @__PURE__ */ o("div", { className: "space-y-1.5", children: E.domainIds.map((D) => {
                    const P = Wt(D);
                    if (!P)
                      return null;
                    const $ = s[D] ?? { providerCount: 0, releaseCount: 0 };
                    return ee({
                      buttonKey: P.id,
                      description: P.label,
                      icon: /* @__PURE__ */ o(Nt, { classId: P.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                      isSelected: l.domainIds.includes(D),
                      meta: `${$.providerCount}c / ${$.releaseCount}r`,
                      onClick: () => v(D),
                      title: P.description
                    });
                  }) })
                ] }, E.label)),
                /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
                  /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: B.contentTypeHeading }),
                  /* @__PURE__ */ o("div", { className: "grid grid-cols-3 gap-1.5", children: Zt().map((E) => {
                    const D = l.contentType === E.id, P = E.id === "events" ? Kt : E.id === "releases" ? Xn : it;
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !c,
                        onClick: () => b(E.id),
                        title: E.description,
                        className: `inline-flex h-9 items-center justify-center gap-1.5 rounded-[0.85rem] border px-2 text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${D ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ o(P, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
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
                      disabled: !c,
                      onClick: k,
                      title: B.selectAllTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(it, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
                        B.selectAllLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !c,
                      onClick: d,
                      title: B.clearFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(Yn, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        B.clearFiltersLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !c,
                      onClick: M,
                      title: B.resetFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ o(qt, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        B.resetFiltersLabel
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3 md:border-l md:border-t-0 md:py-1 md:pl-3", children: [
                /* @__PURE__ */ o("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: "Attributes" }),
                /* @__PURE__ */ o("div", { className: "space-y-1.5", children: nt().map((E) => {
                  const D = Wt(E);
                  if (!D)
                    return null;
                  const P = t[E] ?? { providerCount: 0, releaseCount: 0 };
                  return ee({
                    buttonKey: E,
                    description: D.label,
                    icon: /* @__PURE__ */ o(Nt, { classId: D.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                    isSelected: l.attributeIds.includes(E),
                    meta: `${P.providerCount}c / ${P.releaseCount}r`,
                    onClick: () => m(E),
                    title: D.description
                  });
                }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: B.companyFiltersHeading }),
                /* @__PURE__ */ o("div", { className: "max-h-44 space-y-1.5 overflow-y-auto pr-1", children: e.length > 0 ? /* @__PURE__ */ h(xt, { children: [
                  /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !c,
                      onClick: f,
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
                  e.map((E) => {
                    const D = l.companyIds.includes(E.id);
                    return /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        disabled: !c,
                        onClick: () => x(E.id),
                        title: `Filter to ${E.name}`,
                        className: `flex h-8 w-full items-center justify-between gap-2 rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${D ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
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
                ] }) : /* @__PURE__ */ o("div", { className: "rounded-[0.75rem] border border-[var(--edge)] px-2 py-2 text-[11px] leading-4 text-[var(--muted)]", children: B.companyFilterEmpty }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: B.sortHeading }),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5", children: F.map((E) => {
                  const D = r === E.id;
                  return /* @__PURE__ */ h(
                    "button",
                    {
                      type: "button",
                      disabled: !c,
                      onClick: () => w(E.id),
                      className: `flex h-9 w-full items-center justify-between rounded-[0.85rem] border px-2.5 text-left text-xs font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${D ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        E.label,
                        /* @__PURE__ */ o(
                          "span",
                          {
                            className: `h-2.5 w-2.5 rounded-full border ${D ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--edge)] bg-transparent"}`
                          }
                        )
                      ]
                    },
                    E.id
                  );
                }) }),
                /* @__PURE__ */ o("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: B.displayedRowsHeading }),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-4 gap-1.5 md:grid-cols-2", children: Hn().map((E) => {
                  const D = Q === E, P = E === "all" ? "All" : String(E);
                  return /* @__PURE__ */ o(
                    "button",
                    {
                      type: "button",
                      disabled: !c,
                      onClick: () => _(E),
                      className: `h-8 rounded-[0.85rem] border px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition duration-300 active:scale-[0.99] ${D ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: P
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
    /* @__PURE__ */ o(Ge, { initial: !1, children: !c && Y ? /* @__PURE__ */ h(
      me.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        className: "flex flex-col items-center gap-3 px-2 pb-5",
        children: [
          /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]", style: { writingMode: "vertical-rl" }, children: B.filterPanelLabel }),
          /* @__PURE__ */ o("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] font-mono text-[10px] text-[var(--ink-soft)]", children: I })
        ]
      },
      "filter-rail"
    ) : null })
  ] });
}
function Cn(t) {
  return /* @__PURE__ */ o(Hi, { ...t });
}
function vt({
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
function dr({
  className: t = "",
  compact: a = !1,
  maxZoom: n,
  minZoom: r,
  onSliderActiveChange: e,
  onZoomChange: s,
  zoom: l
}) {
  const c = Z(null), m = Z(null), d = Z(null), f = Z(null), x = Z(null), [w, b] = xe(!1), [v, M] = xe(!1), [k, _] = xe(!1), V = cr(l, r, n), Q = 8 + (1 - V) * 84, ne = a ? "h-3.5 w-3.5" : "h-4 w-4", q = w || v || k, y = q ? a ? "h-10 min-w-10 px-2 text-[9px]" : "h-11 min-w-11 px-2.5 text-[10px]" : a ? "h-4 min-w-4 px-0 text-[0px]" : "h-5 min-w-5 px-0 text-[0px]", I = a ? "group-hover/zoomrail:h-10 group-hover/zoomrail:min-w-10 group-hover/zoomrail:px-2 group-hover/zoomrail:text-[9px] group-focus-within/zoomrail:h-10 group-focus-within/zoomrail:min-w-10 group-focus-within/zoomrail:px-2 group-focus-within/zoomrail:text-[9px]" : "group-hover/zoomrail:h-11 group-hover/zoomrail:min-w-11 group-hover/zoomrail:px-2.5 group-hover/zoomrail:text-[10px] group-focus-within/zoomrail:h-11 group-focus-within/zoomrail:min-w-11 group-focus-within/zoomrail:px-2.5 group-focus-within/zoomrail:text-[10px]", Y = w ? "text-[var(--ink)] opacity-100" : "opacity-45", C = (g, R = !1) => {
    const H = () => {
      b(g), e == null || e(g);
    };
    if (R) {
      Fn(H);
      return;
    }
    H();
  }, B = (g) => {
    const R = Number(g.currentTarget.value);
    s(() => Da(R, r, n));
  };
  Me(() => () => {
    var g;
    x.current !== null && window.cancelAnimationFrame(x.current), f.current = null, (g = d.current) == null || g.call(d), e == null || e(!1);
  }, [e]);
  const G = (g) => {
    var te;
    const R = (te = c.current) == null ? void 0 : te.getBoundingClientRect();
    if (!R || R.height <= 0)
      return;
    const H = ie(1 - (g - R.top) / R.height, 0, 1);
    s(() => Da(H, r, n));
  }, ee = () => {
    x.current !== null && (window.cancelAnimationFrame(x.current), x.current = null);
    const g = f.current;
    f.current = null, g !== null && G(g);
  }, F = (g) => {
    f.current = g, x.current === null && (x.current = window.requestAnimationFrame(() => {
      x.current = null;
      const R = f.current;
      f.current = null, R !== null && G(R);
    }));
  }, W = (g) => {
    !g.isPrimary || g.button !== 0 || (m.current = g.pointerId, g.currentTarget.setPointerCapture(g.pointerId), C(!0, !0), G(g.clientY));
  }, O = (g) => {
    m.current === g.pointerId && (F(g.clientY), g.preventDefault());
  }, j = (g) => {
    m.current === g.pointerId && (ee(), g.currentTarget.hasPointerCapture(g.pointerId) && g.currentTarget.releasePointerCapture(g.pointerId), m.current = null, C(!1));
  }, E = () => {
    var g;
    ee(), (g = d.current) == null || g.call(d), d.current = null, C(!1);
  }, D = (g) => {
    var te;
    if (g.button !== 0 || m.current !== null)
      return;
    (te = d.current) == null || te.call(d), C(!0, !0), G(g.clientY);
    const R = (ce) => {
      F(ce.clientY), ce.preventDefault();
    }, H = () => E();
    window.addEventListener("mousemove", R), window.addEventListener("mouseup", H, { once: !0 }), d.current = () => {
      window.removeEventListener("mousemove", R), window.removeEventListener("mouseup", H);
    };
  }, P = (g) => {
    const R = g.shiftKey ? ha : Bo;
    if (g.key === "ArrowUp" || g.key === "ArrowRight") {
      s((H) => Mt(H, R, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "ArrowDown" || g.key === "ArrowLeft") {
      s((H) => Mt(H, -R, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "PageUp") {
      s((H) => Mt(H, ha, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "PageDown") {
      s((H) => Mt(H, -ha, r, n)), g.preventDefault();
      return;
    }
    if (g.key === "Home") {
      s(() => r), g.preventDefault();
      return;
    }
    g.key === "End" && (s(() => n), g.preventDefault());
  }, $ = (g) => {
    g.currentTarget.contains(g.relatedTarget) || M(!1);
  };
  return /* @__PURE__ */ h(
    "div",
    {
      "aria-label": "Timeline zoom controls",
      role: "group",
      className: `absolute z-40 flex ${a ? "min-h-[17rem] w-12 py-3" : "min-h-[22rem] w-14 py-4"} group/zoomrail select-none flex-col items-center justify-center gap-3 px-2 text-[var(--ink-soft)] transition-[opacity,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] hover:opacity-100 focus-within:text-[var(--ink)] focus-within:opacity-100 ${Y} ${t}`,
      onBlur: $,
      onFocus: () => M(!0),
      onMouseEnter: () => _(!0),
      onMouseLeave: () => _(!1),
      onPointerEnter: () => _(!0),
      onPointerLeave: () => _(!1),
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ o(Oi, { className: ne })
          }
        ),
        /* @__PURE__ */ h(
          "label",
          {
            ref: c,
            className: `relative z-10 ${a ? "h-[12.5rem] w-8" : "h-[16rem] w-9"} cursor-ns-resize touch-none rounded-full focus-within:ring-2 focus-within:ring-[rgba(237,242,250,0.3)]`,
            onMouseDown: D,
            onPointerCancel: j,
            onPointerDown: W,
            onPointerMove: O,
            onPointerUp: j,
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
                    clipPath: `inset(${(1 - V) * 100}% 0 0 0)`
                  }
                }
              ),
              /* @__PURE__ */ o(
                "span",
                {
                  className: `absolute left-1/2 grid ${y} ${I} -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(237,242,250,0.48)] bg-[rgba(237,242,250,0.95)] font-mono font-semibold text-[#0b0e14] shadow-[0_16px_32px_-22px_rgba(0,0,0,0.78)] ${w ? "scale-[1.04] transition-none" : "transition-[top,width,height,min-width,padding,transform,box-shadow,font-size] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: { top: `${Q}%` },
                  children: /* @__PURE__ */ h("span", { className: `transition-opacity duration-200 group-hover/zoomrail:opacity-100 group-focus-within/zoomrail:opacity-100 ${q ? "opacity-100" : "opacity-0"}`, children: [
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
                  value: V,
                  onBlur: () => C(!1),
                  onChange: B,
                  onKeyDown: P,
                  onPointerCancel: () => C(!1),
                  onPointerDown: () => C(!0, !0),
                  onPointerUp: () => C(!1),
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
            children: /* @__PURE__ */ o(Wi, { className: ne })
          }
        )
      ]
    }
  );
}
function ur({
  className: t = "",
  company: a
}) {
  return /* @__PURE__ */ o("span", { className: `inline-flex shrink-0 items-center justify-center text-[var(--ink)] ${t}`, children: /* @__PURE__ */ o(Nt, { classId: gi(a), className: "h-[1rem] w-[1rem]" }) });
}
function Vi({
  compact: t = !1,
  company: a
}) {
  const n = a.logoMark, r = n ? le().logoAssetPaths[n] : void 0, e = r && tr(n), s = e ? t ? "h-7 w-12 rounded-[0.72rem]" : "h-8 w-14 rounded-[0.82rem]" : t ? "h-7 w-7 rounded-[0.72rem]" : "h-8 w-8 rounded-[0.82rem]", l = e ? t ? "relative h-[11px] w-9 object-contain" : "relative h-3 w-11 object-contain" : t ? "relative h-[18px] w-[18px] object-contain" : "relative h-5 w-5 object-contain", c = t ? "text-[10px]" : "text-xs";
  return /* @__PURE__ */ o(
    "span",
    {
      "aria-label": `${a.name} logo`,
      className: `${s} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${r ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: `${a.name} logo`,
      children: r ? /* @__PURE__ */ o("img", { "aria-hidden": "true", alt: "", className: l, src: Ra(r) }) : n ? /* @__PURE__ */ h(xt, { children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${He(a.accent, 0.35)}, transparent 48%)`
            }
          }
        ),
        mr(n, a.accent, c)
      ] }) : /* @__PURE__ */ o(ur, { className: t ? "h-4 w-4" : "h-5 w-5", company: a })
    }
  );
}
function mr(t, a, n) {
  const r = `relative font-semibold tracking-tight ${n}`;
  return t === "calendar" ? /* @__PURE__ */ o(Kt, { className: "relative h-7 w-7 text-[var(--ink)]", strokeWidth: 1.8 }) : t === "gpt" || t === "openai" ? /* @__PURE__ */ o("span", { className: r, children: "AI" }) : t === "claude" || t === "anthropic" ? /* @__PURE__ */ o("span", { className: r, children: "C" }) : t === "cursor" ? /* @__PURE__ */ o("span", { className: r, children: "C" }) : t === "gemini" || t === "google" ? /* @__PURE__ */ o("span", { className: r, children: "G" }) : t === "deepseek" ? /* @__PURE__ */ o("span", { className: r, children: "D" }) : t === "sora" ? /* @__PURE__ */ o(zn, { className: "relative h-4 w-4", strokeWidth: 1.8 }) : t === "figure" ? /* @__PURE__ */ o("span", { className: r, children: "F" }) : t === "tesla" ? /* @__PURE__ */ o("span", { className: r, children: "T" }) : t === "xai" ? /* @__PURE__ */ o("span", { className: r, children: "x" }) : /* @__PURE__ */ o("span", { className: r, style: { color: a }, children: "AI" });
}
function Gi(t) {
  return t === "square" ? "rounded-[5px]" : t === "diamond" ? "rotate-45 rounded-[4px]" : "rounded-full";
}
function Rn(t) {
  return t.classId !== "events";
}
function ji(t, a) {
  const n = t[a];
  if (!n || !Rn(n))
    return null;
  const r = t.findIndex(Rn);
  if (r < 0 || r === a)
    return null;
  const e = t[r];
  return e ? {
    productLine: e,
    productLineIndex: r
  } : null;
}
function qi({
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
function Ki({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onModelSelect: l,
  productLine: c,
  productLineIndex: m,
  renderWindow: d,
  timelineStartDay: f,
  verticalScale: x = 1
}) {
  const w = La(a, x), b = c.classId === "coding-harnesses", v = oi(n.accent, Eo, 0.34), M = Gi(c.markerShape), k = a ? "h-3.5 w-3.5" : "h-4 w-4", _ = a ? "absolute left-3 top-0 origin-bottom-left -translate-y-1 -rotate-[22deg]" : "absolute left-4 top-0 origin-bottom-left -translate-y-2 -rotate-[28deg] transition duration-300 group-hover:-translate-y-3", V = a ? "timeline-map-screen-label whitespace-nowrap rounded-[0.7rem] border px-1.5 py-0.5 font-bold tracking-[0.01em] shadow-[var(--soft-shadow)] backdrop-blur-sm" : "timeline-map-screen-label whitespace-nowrap rounded-[0.8rem] border bg-[var(--surface-strong)] px-2 py-1 font-bold tracking-[0.015em] shadow-[var(--soft-shadow)] backdrop-blur-sm group-hover:bg-[var(--surface)]", Q = a ? 10 : 12, ne = ji(n.productLines, m), q = ne ? qi({
    primaryLine: ne.productLine,
    productLine: c,
    timelineStartDay: f
  }) ?? 0 : 0;
  return /* @__PURE__ */ h(
    me.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: jn },
      transition: {
        opacity: $e
      },
      className: "relative z-10 shrink-0 hover:z-40 focus-within:z-40",
      style: { height: `${w}px` },
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "absolute right-0 top-1/2 h-px -translate-y-1/2 bg-[var(--track-line)]",
            style: { left: `${q}px` }
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
              /* @__PURE__ */ o(Nt, { classId: c.classId, className: a ? "h-3 w-3" : "h-3.5 w-3.5" }),
              c.shortLabel
            ]
          }
        ) }),
        /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: c.releases.map((y, I) => {
          var be, Te;
          const Y = c.releases[I - 1], C = t === y.articleSlug, B = C || $t(y.globalDay, y.endGlobalDay, d), G = !!Y && $t((Y == null ? void 0 : Y.globalDay) ?? y.globalDay, y.globalDay, d), ee = y.endGlobalDay > y.globalDay && $t(y.globalDay, y.endGlobalDay, d);
          if (!B && !G && !ee)
            return null;
          const F = ze(y.globalDay, f), W = Y ? ze(Y.globalDay, f) : F, O = Y ? Math.max(0, F - W) : 0, j = Y ? Ci(y.gap, c.averageGap) : null, E = Vt(y.globalDay, y.endGlobalDay), D = ((be = c.latestRelease) == null ? void 0 : be.name) === y.name && ((Te = c.latestRelease) == null ? void 0 : Te.date) === y.date, P = D ? ya(n.accent, 255, 0.12) : ya(n.accent, 255, 0.24), $ = He(n.accent, D ? 0.52 : 0.34), g = y.tags.includes("landmark-release"), R = D ? He(n.accent, 0.12) : g ? He(n.accent, 0.08) : void 0, te = y.eventKind === "event" ? "Open event" : "Open release", ce = C ? `0 0 0 ${a ? 3 : 4}px rgba(237, 242, 250, 0.92), 0 0 0 ${a ? 7 : 8}px color-mix(in srgb, ${n.accent} 48%, transparent)` : g ? `0 0 0 ${a ? 5 : 6}px color-mix(in srgb, ${n.accent} 24%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 50%, transparent), 0 0 42px color-mix(in srgb, ${n.accent} 28%, transparent)` : D ? `0 0 0 ${a ? 4 : 5}px color-mix(in srgb, ${n.accent} 20%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 40%, transparent)` : `0 0 0 4px color-mix(in srgb, ${n.accent} 11%, transparent)`, re = C ? "saturate(1.45) brightness(1.14)" : g ? "saturate(1.38) brightness(1.1)" : D ? "saturate(1.35) brightness(1.08)" : void 0;
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
                Y && G ? /* @__PURE__ */ h(xt, { children: [
                  /* @__PURE__ */ o(
                    me.div,
                    {
                      initial: { opacity: 0, scaleX: 0 },
                      animate: { opacity: b ? 0.72 : 0.58, scaleX: 1 },
                      transition: $e,
                      className: `pointer-events-none absolute top-1/2 -translate-y-1/2 origin-left ${b ? "h-px" : "h-[2px]"}`,
                      style: {
                        backgroundColor: b ? v : n.accent,
                        left: `${W}px`,
                        width: `${O}px`
                      }
                    }
                  ),
                  /* @__PURE__ */ o(
                    "div",
                    {
                      className: "timeline-gap absolute top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50",
                      style: {
                        left: `${W + O / 2}px`,
                        "--gap-world-width": O
                      },
                      children: /* @__PURE__ */ h(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Gap of ${wa(y.gap)} between ${Y.name} and ${y.name}`,
                          onPointerDown: (oe) => oe.stopPropagation(),
                          onClick: (oe) => oe.stopPropagation(),
                          className: "group/gap relative flex h-6 cursor-default items-center justify-center outline-none",
                          children: [
                            /* @__PURE__ */ h(
                              "span",
                              {
                                className: "timeline-gap-collapse timeline-gap-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2 py-1 font-mono uppercase tracking-[0.1em] text-[var(--ink)] shadow-[var(--soft-shadow)] group-focus-visible/gap:border-[var(--edge-strong)]",
                                style: Ve(a ? 9 : 10),
                                children: [
                                  y.gap,
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
                                    y.name
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: [
                                    wa(y.gap),
                                    " gap"
                                  ] }),
                                  /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                    Y.dateLabel,
                                    " – ",
                                    y.dateLabel
                                  ] }),
                                  j ? /* @__PURE__ */ o("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: j }) : null
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ] }) : null,
                ee ? /* @__PURE__ */ o(
                  me.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: D ? 0.72 : 0.54, scaleX: 1 },
                    transition: $e,
                    className: `absolute top-1/2 z-10 origin-left -translate-y-1/2 rounded-full ${a ? "h-[7px]" : "h-2"}`,
                    style: {
                      backgroundColor: n.accent,
                      boxShadow: `0 0 18px color-mix(in srgb, ${n.accent} 34%, transparent)`,
                      left: `${F}px`,
                      minWidth: a ? "8px" : "10px",
                      width: `${E}px`
                    }
                  }
                ) : null,
                B ? /* @__PURE__ */ o(
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
                    className: `absolute top-1/2 -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50 ${C ? "z-30" : "z-20"}`,
                    style: { left: `${F}px` },
                    children: /* @__PURE__ */ o("div", { className: "overflow-visible", children: /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        "data-timeline-pin": !0,
                        "aria-current": C ? "page" : void 0,
                        "aria-label": `${te} for ${y.name}, ${y.dateRangeLabel}`,
                        onClick: (oe) => {
                          oe.stopPropagation(), l(y.articleSlug);
                        },
                        onPointerDown: (oe) => oe.stopPropagation(),
                        className: `group relative block size-0 overflow-visible cursor-pointer text-left outline-none ${C ? "timeline-pin--selected" : ""}`,
                        children: [
                          /* @__PURE__ */ h("div", { className: "timeline-pin-marker-stack relative z-0 size-0 shrink-0", children: [
                            g ? /* @__PURE__ */ o(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: `${a ? "h-8 w-8" : "h-10 w-10"} timeline-pin-landmark-aura absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ${M}`,
                                style: { "--pin-accent": n.accent }
                              }
                            ) : null,
                            C ? /* @__PURE__ */ o(
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
                                className: `${k} timeline-pin-marker absolute left-0 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 border-[3px] border-[var(--surface-strong)] transition duration-300 ${M} ${C ? "timeline-pin-marker--selected scale-[1.18]" : "group-hover:scale-[1.22] group-focus-visible:scale-[1.22]"}`,
                                style: {
                                  backgroundColor: n.accent,
                                  boxShadow: ce,
                                  filter: re
                                }
                              }
                            )
                          ] }),
                          /* @__PURE__ */ o("div", { className: `${_} z-[2]`, children: /* @__PURE__ */ o(
                            "div",
                            {
                              className: `${V} ${C ? "timeline-pin-label--selected" : ""}`,
                              style: {
                                backgroundColor: C ? "var(--surface-strong)" : R,
                                borderColor: C ? He(n.accent, 0.88) : $,
                                borderWidth: C ? 2 : void 0,
                                color: C ? ya(n.accent, 255, 0.06) : P,
                                boxShadow: C ? `0 0 0 1px color-mix(in srgb, ${n.accent} 55%, transparent)` : void 0,
                                textShadow: C ? "0 1px 14px rgba(0, 0, 0, 0.62)" : D ? "0 1px 12px rgba(0, 0, 0, 0.5)" : "0 1px 10px rgba(0, 0, 0, 0.38)",
                                filter: C ? "saturate(1.28)" : D ? "saturate(1.18)" : void 0,
                                ...Ve(Q)
                              },
                              children: y.name
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
                                  c.shortLabel
                                ] }),
                                /* @__PURE__ */ o("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: y.name }),
                                /* @__PURE__ */ h("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                  y.eventTypeLabel,
                                  " · ",
                                  y.dateRangeLabel
                                ] }),
                                Y ? /* @__PURE__ */ h("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: [
                                  wa(y.gap),
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
            y.articleSlug
          );
        }) }),
        c.latestRelease && e > c.latestRelease.endGlobalDay && $t(c.latestRelease.endGlobalDay, e, d) ? /* @__PURE__ */ h(xt, { children: [
          /* @__PURE__ */ o(
            me.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: b ? 0.48 : 0.42, scaleX: 1 },
              transition: $e,
              className: `absolute top-1/2 origin-left -translate-y-1/2 ${b ? "h-px" : "quiet-extension-flow h-[2px]"}`,
              style: {
                backgroundColor: b ? v : void 0,
                left: `${ze(c.latestRelease.endGlobalDay, f)}px`,
                "--quiet-flow-duration": `${a ? 5.4 : 6.4}s`,
                "--quiet-line-color": n.accent,
                width: `${Vt(c.latestRelease.endGlobalDay, e)}px`
              }
            }
          ),
          /* @__PURE__ */ o(
            "div",
            {
              className: "absolute top-1/2 z-0 -translate-y-1/2 pl-3",
              style: { left: `${ze(e, f)}px` },
              children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ h(
                "div",
                {
                  className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1 font-mono uppercase tracking-[0.14em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                  style: Ve(a ? 9 : 10),
                  children: [
                    "+",
                    Ia(c, e),
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
const Zi = Dt.memo(Ki);
function Qi({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onCompanyBlur: l,
  onCompanyFocus: c,
  onModelSelect: m,
  renderWindow: d,
  timelineStartDay: f,
  verticalScale: x = 1
}) {
  const { lineGap: w } = _a(n.productLines.length, a, x), b = () => c == null ? void 0 : c(n.id), v = () => l == null ? void 0 : l();
  return /* @__PURE__ */ o(
    me.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: jn },
      transition: {
        opacity: $e
      },
      className: "relative flex flex-col justify-center",
      onClick: (M) => {
        const k = M.target;
        k instanceof Element && k.closest("button, a, input, label, select, textarea, [data-row-focus-label]") || b();
      },
      onMouseEnter: b,
      onMouseLeave: v,
      onPointerEnter: (M) => {
        M.pointerType !== "touch" && b();
      },
      onPointerLeave: (M) => {
        M.pointerType !== "touch" && v();
      },
      style: { height: `${Pa(n, a, x)}px`, gap: `${w}px` },
      children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: n.productLines.map((M, k) => /* @__PURE__ */ o(
        Zi,
        {
          activeArticleSlug: t,
          compact: a,
          company: n,
          companyIndex: r,
          currentGlobalDay: e,
          maxDays: s,
          onModelSelect: m,
          productLine: M,
          productLineIndex: k,
          renderWindow: d,
          timelineStartDay: f,
          verticalScale: x
        },
        `${n.id}-${M.id}`
      )) })
    }
  );
}
function Sn(t, a) {
  return a ? t.productLines.some(
    (n) => n.releases.some((r) => r.articleSlug === a)
  ) : !1;
}
const fr = Dt.memo(
  Qi,
  (t, a) => {
    const n = Sn(t.company, t.activeArticleSlug), r = Sn(a.company, a.activeArticleSlug);
    return t.compact === a.compact && t.company === a.company && t.companyIndex === a.companyIndex && t.currentGlobalDay === a.currentGlobalDay && t.maxDays === a.maxDays && t.timelineStartDay === a.timelineStartDay && t.verticalScale === a.verticalScale && Mi(t.renderWindow, a.renderWindow) && n === r && (!n || t.activeArticleSlug === a.activeArticleSlug);
  }
);
function Ji({
  compact: t = !1,
  company: a,
  currentGlobalDay: n,
  index: r,
  maxSummaryQuietDays: e
}) {
  var d, f;
  const s = Ze(), l = Ia(a, n), c = Ni(l, e), m = a.productLines.length > 1;
  return /* @__PURE__ */ h(
    me.div,
    {
      layout: !0,
      initial: { opacity: 0, y: t ? 12 : 14 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: t ? 12 : 14 },
      transition: {
        layout: To,
        opacity: $e,
        y: $e
      },
      className: "rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] p-4",
      children: [
        /* @__PURE__ */ h("div", { className: "min-w-0", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ o(ur, { className: "h-7 w-7", company: a }),
            /* @__PURE__ */ h("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ o("p", { className: "truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.name }),
              /* @__PURE__ */ h("p", { className: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: [
                s.significanceLabel,
                " ",
                a.significanceScore
              ] })
            ] })
          ] }),
          m ? /* @__PURE__ */ o("div", { className: "mt-3 space-y-2", children: a.productLines.map((x) => {
            var w;
            return /* @__PURE__ */ h("div", { className: "min-w-0 rounded-[0.85rem] border border-[var(--edge)] bg-[rgba(255,255,255,0.02)] px-3 py-2", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center gap-2 text-xs font-semibold tracking-tight text-[var(--ink)]", children: [
                  /* @__PURE__ */ o(Nt, { classId: x.classId, className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ o("span", { className: "truncate", children: x.shortLabel })
                ] }),
                /* @__PURE__ */ o("span", { className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]", children: x.significanceScore })
              ] }),
              /* @__PURE__ */ o("p", { className: "mt-1 truncate text-sm text-[var(--ink-soft)]", children: ((w = x.latestRelease) == null ? void 0 : w.name) ?? "No releases" })
            ] }, `${a.id}-${x.id}-summary-line`);
          }) }) : /* @__PURE__ */ h(xt, { children: [
            /* @__PURE__ */ o("p", { className: "mt-3 text-base font-semibold tracking-tight text-[var(--ink)]", children: Di(l) }),
            /* @__PURE__ */ h("div", { className: "mt-2 min-w-0", children: [
              /* @__PURE__ */ o("p", { className: "truncate text-sm text-[var(--ink-soft)]", children: ((d = a.latestRelease) == null ? void 0 : d.name) ?? "No releases" }),
              /* @__PURE__ */ o("p", { className: "mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]", children: ((f = a.latestRelease) == null ? void 0 : f.dateRangeLabel) ?? "Date unavailable" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "mt-4 h-1.5 rounded-full bg-[var(--edge)]", children: /* @__PURE__ */ o(
          "div",
          {
            className: "h-full origin-left rounded-full",
            style: { backgroundColor: a.accent, width: `${c}%` }
          }
        ) })
      ]
    },
    `${a.id}-${t ? "mobile" : "desktop"}-summary`
  );
}
const pr = Dt.memo(Ji);
function es(t) {
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
  const e = r === "large", s = le().logoAssetPaths[n], l = s && tr(n), c = l ? e ? "h-16 w-28 rounded-[1.25rem]" : "h-11 w-20 rounded-[0.95rem]" : e ? "h-16 w-16 rounded-[1.25rem]" : "h-11 w-11 rounded-[0.95rem]", m = l ? e ? "relative h-5 w-20 object-contain" : "relative h-3 w-14 object-contain" : e ? "relative h-10 w-10 object-contain" : "relative h-7 w-7 object-contain", d = e ? "text-lg" : "text-sm", f = n === "calendar" ? `${a} event icon` : `${a} logo`;
  return /* @__PURE__ */ h(
    "span",
    {
      "aria-label": f,
      className: `${c} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${s ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: f,
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
        s ? /* @__PURE__ */ o("img", { "aria-hidden": "true", alt: "", className: m, src: Ra(s) }) : mr(n, t, d)
      ]
    }
  );
}
function An({
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
          /* @__PURE__ */ o(Zr, { className: "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5", strokeWidth: 1.8 })
        ] })
      ]
    }
  );
}
function ts({ media: t }) {
  const [a, n] = xe(!1);
  return a ? null : /* @__PURE__ */ h("figure", { className: "mt-7 overflow-hidden rounded-[1.25rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)]", children: [
    /* @__PURE__ */ o(
      "img",
      {
        src: Ra(t.src),
        alt: t.alt,
        className: "w-full bg-black object-contain",
        loading: "lazy",
        onError: () => n(!0)
      }
    ),
    t.caption ? /* @__PURE__ */ o("figcaption", { className: "border-t border-[var(--edge)] px-4 py-3 text-xs leading-5 text-[var(--ink-soft)]", children: t.caption }) : null
  ] });
}
const Be = 640, Oe = 448, hr = 96, as = 4096, In = [8, 4, 2, 1], ns = 5200, Ma = 16;
function rs(t) {
  let a = 2166136261;
  for (let n = 0; n < t.length; n += 1)
    a ^= t.charCodeAt(n), a = Math.imul(a, 16777619);
  return a >>> 0;
}
function os(t) {
  let a = t || 1;
  return () => {
    a = a + 1831565813 | 0;
    let n = Math.imul(a ^ a >>> 15, 1 | a);
    return n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n, ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function is(t) {
  const a = t.replace("#", ""), n = a.length === 3 ? a.split("").map((e) => e + e).join("") : a, r = Number.parseInt(n, 16);
  return !Number.isFinite(r) || n.length !== 6 ? [125, 145, 175] : [r >> 16 & 255, r >> 8 & 255, r & 255];
}
function Yt(t, a, n) {
  return [
    t[0] + (a[0] - t[0]) * n,
    t[1] + (a[1] - t[1]) * n,
    t[2] + (a[2] - t[2]) * n
  ];
}
const Ln = [
  [-0.295, 0.62],
  [0.31, 0.42],
  [-1.04, 0.25],
  [-0.78, 0.18]
], _n = [
  [0.5667, -0.5],
  [0.5, -0.55],
  [0.6, -0.45]
];
function ss(t) {
  const a = os(rs(t)), n = Math.floor(a() * 4), r = a() * Math.PI * 2, e = 0.768 + a() * 0.034;
  let s = Math.cos(r) * e, l = Math.sin(r) * e, c = 0;
  if (n === 2) {
    const m = Ln[Math.floor(a() * Ln.length)];
    s = m[0] + (a() - 0.5) * 0.05, l = m[1] + (a() - 0.5) * 0.05;
  } else if (n === 3) {
    const m = _n[Math.floor(a() * _n.length)];
    s = m[0] + (a() - 0.5) * 0.03, c = m[1] + (a() - 0.5) * 0.03, l = 0;
  }
  return {
    variant: n,
    cRe: s,
    cIm: l,
    phoenixRe: c,
    zoom: 0.52 + a() * 0.33,
    rotation: a() * Math.PI * 2,
    centerX: (a() - 0.5) * 0.3,
    centerY: (a() - 0.5) * 0.3
  };
}
function ls(t, a, n) {
  let r = a, e = n, s = 0, l = 0;
  for (let c = 0; c < hr; c += 1) {
    const m = r * r + e * e;
    if (m > as)
      return c + 1 - Math.log(Math.log(m) * 0.5) / Math.LN2;
    let d, f;
    if (t.variant === 1) {
      const x = Math.abs(r);
      d = x * x - e * e + t.cRe, f = 2 * x * e + t.cIm;
    } else t.variant === 2 ? (d = r * r - e * e + t.cRe, f = -2 * r * e + t.cIm) : t.variant === 3 ? (d = r * r - e * e + t.cRe + t.phoenixRe * s, f = 2 * r * e + t.phoenixRe * l) : (d = r * r - e * e + t.cRe, f = 2 * r * e + t.cIm);
    s = r, l = e, r = d, e = f;
  }
  return -1;
}
function cs({ accent: t, seedKey: a }) {
  const n = Z(null);
  return Me(() => {
    const r = n.current, e = r == null ? void 0 : r.getContext("2d");
    if (!r || !e)
      return;
    const s = ss(a), l = is(t), c = [8, 11, 16], m = [
      { at: 0, rgb: c },
      { at: 0.38, rgb: Yt(c, l, 0.45) },
      { at: 0.62, rgb: l },
      { at: 0.86, rgb: Yt(l, [235, 240, 248], 0.55) },
      { at: 1, rgb: [240, 244, 250] }
    ], d = (F) => {
      for (let W = 1; W < m.length; W += 1)
        if (F <= m[W].at) {
          const O = m[W - 1], j = m[W], E = (F - O.at) / (j.at - O.at);
          return Yt(O.rgb, j.rgb, E);
        }
      return m[m.length - 1].rgb;
    };
    e.clearRect(0, 0, Be, Oe), e.imageSmoothingEnabled = !0, e.imageSmoothingQuality = "high";
    const f = Math.cos(s.rotation), x = Math.sin(s.rotation), w = Be / Oe, b = Yt(c, l, 0.28), v = (F, W, O) => {
      if (O < 0) {
        F[W] = b[0], F[W + 1] = b[1], F[W + 2] = b[2], F[W + 3] = 150;
        return;
      }
      const j = Math.min(
        1,
        Math.max(0, Math.log(1 + O) / Math.log(1 + hr))
      ), E = Math.pow(j, 1.1), D = d(E);
      F[W] = D[0], F[W + 1] = D[1], F[W + 2] = D[2], F[W + 3] = Math.round(30 + E * 225);
    }, M = document.createElement("canvas"), k = M.getContext("2d"), _ = document.createElement("canvas");
    _.width = Be, _.height = Oe;
    const V = _.getContext("2d");
    if (!k || !V)
      return;
    V.imageSmoothingEnabled = !0, V.imageSmoothingQuality = "high";
    let Q = !1, ne = 0, q = 0, y = 0, I = 0, Y = null, C = 0, B = 0;
    const G = () => {
      const F = In[q];
      y = Math.ceil(Be / F), I = Math.ceil(Oe / F), M.width = y, M.height = I, Y = k.createImageData(y, I), C = 0, B = 0;
    }, ee = () => {
      if (!Q) {
        if (Y && C < I) {
          const F = Math.max(1, Math.floor(ns / y)), W = Math.min(C + F, I), O = Y.data;
          for (let j = C; j < W; j += 1) {
            const E = ((j + 0.5) / I * 2 - 1) / s.zoom;
            for (let D = 0; D < y; D += 1) {
              const P = ((D + 0.5) / y * 2 - 1) * w / s.zoom, $ = P * f - E * x + s.centerX, g = P * x + E * f + s.centerY;
              v(O, (j * y + D) * 4, ls(s, $, g));
            }
          }
          C = W, C >= I && k.putImageData(Y, 0, 0), ne = window.requestAnimationFrame(ee);
          return;
        }
        if (B < Ma) {
          B += 1, e.clearRect(0, 0, Be, Oe), e.drawImage(_, 0, 0), e.globalAlpha = B / Ma, e.drawImage(M, 0, 0, Be, Oe), e.globalAlpha = 1, B >= Ma && (V.clearRect(0, 0, Be, Oe), V.drawImage(M, 0, 0, Be, Oe), e.clearRect(0, 0, Be, Oe), e.drawImage(_, 0, 0)), ne = window.requestAnimationFrame(ee);
          return;
        }
        q += 1, q < In.length && (G(), ne = window.requestAnimationFrame(ee));
      }
    };
    return G(), ne = window.requestAnimationFrame(ee), () => {
      Q = !0, window.cancelAnimationFrame(ne);
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
          width: Be,
          height: Oe,
          className: "h-full w-full object-cover opacity-75 blur-[1px]"
        }
      )
    }
  );
}
function ds({
  entry: t,
  onBack: a,
  onNavigate: n,
  requestedSlug: r
}) {
  const e = Ze(), s = (t == null ? void 0 : t.article) ?? null, l = t ? t.eventKind === "event" ? {
    modelLabel: t.name,
    modelMark: "calendar"
  } : (s == null ? void 0 : s.logo) ?? es(t) : null, c = (s == null ? void 0 : s.title) ?? (t == null ? void 0 : t.name) ?? e.routeMissingTitle, m = (s == null ? void 0 : s.summary) ?? (t ? `${t.name} is tracked as a ${t.eventTypeLabel.toLowerCase()} from ${t.companyName} in the ${t.productLineLabel} line.` : e.routeMissingDetail.replace("{slug}", r));
  return /* @__PURE__ */ h(
    me.aside,
    {
      initial: { opacity: 0, x: 72 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 72 },
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      className: "fixed inset-y-0 right-0 z-40 w-full overflow-y-auto border-l border-[var(--edge-strong)] bg-[rgba(8,11,16,0.98)] shadow-[0_34px_100px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl md:w-[min(760px,58vw)]",
      children: [
        t ? /* @__PURE__ */ o(cs, { accent: t.accent, seedKey: r }) : null,
        /* @__PURE__ */ h("article", { className: "min-h-full px-5 py-5 md:px-8 md:py-8", children: [
          /* @__PURE__ */ h("div", { className: "sticky top-0 z-20 -mx-5 flex items-center justify-between gap-3 border-b border-[var(--edge)] bg-[rgba(8,11,16,0.94)] px-5 py-4 shadow-[0_18px_34px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl md:static md:mx-0 md:border-b-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none", children: [
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                onClick: a,
                className: "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                children: [
                  /* @__PURE__ */ o(Hr, { className: "h-4 w-4", strokeWidth: 1.8 }),
                  e.articleBackLabel
                ]
              }
            ),
            t ? /* @__PURE__ */ h("span", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: [
              /* @__PURE__ */ o(Kt, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
              t.dateRangeLabel
            ] }) : null
          ] }),
          t && l ? /* @__PURE__ */ h("div", { className: "mt-9 flex items-start gap-4", children: [
            /* @__PURE__ */ o(kn, { accent: t.accent, label: l.modelLabel, mark: l.modelMark, size: "large" }),
            /* @__PURE__ */ o(kn, { accent: t.accent, label: t.companyName, mark: t.companyLogoMark, size: "small" })
          ] }) : null,
          /* @__PURE__ */ o("p", { className: "mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: (s == null ? void 0 : s.eyebrow) ?? (t == null ? void 0 : t.eventTypeLabel) ?? "Unknown route" }),
          /* @__PURE__ */ o("h1", { className: "mt-3 max-w-[12ch] text-4xl leading-none tracking-tighter text-[var(--ink)] md:text-6xl", children: c }),
          /* @__PURE__ */ o("p", { className: "mt-5 max-w-[68ch] text-base leading-8 text-[var(--ink-soft)] md:text-lg", children: (s == null ? void 0 : s.dek) ?? m }),
          s != null && s.media ? /* @__PURE__ */ o(ts, { media: s.media }) : null,
          t ? /* @__PURE__ */ o("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: ((s == null ? void 0 : s.facts) ?? [
            { label: "Company", value: t.companyName },
            { label: "Product line", value: t.productLineLabel },
            { label: t.eventKind === "event" ? "Event date" : "Release date", value: t.dateRangeLabel },
            { label: "Type", value: t.eventTypeLabel }
          ]).map((d) => /* @__PURE__ */ h("div", { className: "border-t border-[var(--edge)] pt-3", children: [
            /* @__PURE__ */ o("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: d.label }),
            /* @__PURE__ */ o("p", { className: "mt-1 text-sm font-semibold text-[var(--ink)]", children: d.value })
          ] }, `${d.label}-${d.value}`)) }) : null,
          /* @__PURE__ */ h("section", { className: "mt-9 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ h("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
              /* @__PURE__ */ o(Xn, { className: "h-4 w-4", strokeWidth: 1.8 }),
              "Summary"
            ] }),
            /* @__PURE__ */ o("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: m }),
            s != null && s.impact ? /* @__PURE__ */ o("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: s.impact }) : null
          ] }),
          s == null ? void 0 : s.sections.map((d) => /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ o("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: d.heading }),
            /* @__PURE__ */ o("div", { className: "mt-4 space-y-4", children: d.body.map((f) => /* @__PURE__ */ o("p", { className: "text-base leading-8 text-[var(--ink-soft)]", children: f }, f)) })
          ] }, d.heading)),
          s != null && s.sources.length ? /* @__PURE__ */ h("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
            /* @__PURE__ */ o("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: "Sources" }),
            /* @__PURE__ */ o("div", { className: "mt-4 space-y-2", children: s.sources.map((d) => /* @__PURE__ */ h(
              "a",
              {
                href: d.url,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]",
                children: [
                  /* @__PURE__ */ o("span", { children: d.label }),
                  /* @__PURE__ */ o(Vr, { className: "h-4 w-4 shrink-0", strokeWidth: 1.8 })
                ]
              },
              d.url
            )) })
          ] }) : null,
          t ? /* @__PURE__ */ h("div", { className: "mt-8 grid gap-3 border-t border-[var(--edge)] pt-7 sm:grid-cols-2", children: [
            /* @__PURE__ */ o(An, { label: "Previous", onNavigate: n, slug: t.previousSlug, title: t.previousName }),
            /* @__PURE__ */ o(An, { label: "Next", onNavigate: n, slug: t.nextSlug, title: t.nextName })
          ] }) : /* @__PURE__ */ o("div", { className: "mt-8 rounded-[1.1rem] border border-[var(--edge)] bg-[var(--surface)] p-5", children: /* @__PURE__ */ o("p", { className: "text-sm leading-6 text-[var(--ink-soft)]", children: "This route does not match a known model or event entry." }) })
        ] })
      ]
    },
    "model-article-panel"
  );
}
function Pn({
  detail: t,
  title: a
}) {
  const n = Ze();
  return /* @__PURE__ */ o("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ o("div", { className: "mx-auto flex min-h-[100dvh] max-w-[880px] items-center px-5 py-10 md:px-8", children: /* @__PURE__ */ h("div", { className: "rounded-[2rem] border border-[var(--edge)] bg-[var(--surface)] p-8 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]", children: n.statusEyebrow }),
    /* @__PURE__ */ o("h1", { className: "mt-4 text-4xl tracking-tighter text-[var(--ink)]", children: a }),
    /* @__PURE__ */ o("p", { className: "mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--ink-soft)]", children: t })
  ] }) }) });
}
const us = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`, ms = `
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
`, fs = `
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
`, ps = `
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
`, hs = `
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
`, gs = `
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
`, vs = `
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
`, xs = `
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
`, bs = `
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
function ys() {
  const t = Z(null), a = Z(!1), n = Z(!1);
  return Me(() => {
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
    const s = (S, N) => {
      const U = e.createShader(S);
      return U ? (e.shaderSource(U, N), e.compileShader(U), e.getShaderParameter(U, e.COMPILE_STATUS) ? U : (console.warn(e.getShaderInfoLog(U)), e.deleteShader(U), null)) : null;
    }, l = (S) => {
      const N = s(e.VERTEX_SHADER, us), U = s(e.FRAGMENT_SHADER, S);
      if (!N || !U)
        return N && e.deleteShader(N), U && e.deleteShader(U), null;
      const A = e.createProgram();
      return A ? (e.attachShader(A, N), e.attachShader(A, U), e.linkProgram(A), e.deleteShader(N), e.deleteShader(U), e.getProgramParameter(A, e.LINK_STATUS) ? A : (console.warn(e.getProgramInfoLog(A)), e.deleteProgram(A), null)) : (e.deleteShader(N), e.deleteShader(U), null);
    }, c = l(bs), m = l(ms), d = l(fs), f = l(ps), x = l(hs), w = l(gs), b = l(vs), v = l(xs), M = () => {
      [c, m, d, f, x, w, b, v].forEach((S) => {
        S && e.deleteProgram(S);
      });
    };
    if (!c || !m || !d || !f || !x || !w || !b || !v) {
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
    const _ = (S) => {
      const N = e.getAttribLocation(S, "aPosition");
      N < 0 || (e.bindBuffer(e.ARRAY_BUFFER, k), e.enableVertexAttribArray(N), e.vertexAttribPointer(N, 2, e.FLOAT, !1, 0, 0));
    }, V = {
      resolution: e.getUniformLocation(c, "uResolution"),
      fluidTexel: e.getUniformLocation(c, "uFluidTexel"),
      widgetRect: e.getUniformLocation(c, "uWidgetRect"),
      elapsedTime: e.getUniformLocation(c, "uElapsedTime"),
      emitterDebug: e.getUniformLocation(c, "uEmitterDebug"),
      emitterSeed: e.getUniformLocation(c, "uEmitterSeed"),
      velocityMap: e.getUniformLocation(c, "uVelocityMap"),
      dyeMap: e.getUniformLocation(c, "uDyeMap")
    }, Q = {
      velocityMap: e.getUniformLocation(m, "uVelocityMap"),
      dyeMap: e.getUniformLocation(m, "uDyeMap"),
      texel: e.getUniformLocation(m, "uTexel"),
      pointerPosition: e.getUniformLocation(m, "uPointerPosition"),
      pointerVelocity: e.getUniformLocation(m, "uPointerVelocity"),
      pointerActive: e.getUniformLocation(m, "uPointerActive"),
      pointerRadius: e.getUniformLocation(m, "uPointerRadius"),
      deltaTime: e.getUniformLocation(m, "uDeltaTime"),
      elapsedTime: e.getUniformLocation(m, "uElapsedTime"),
      aspect: e.getUniformLocation(m, "uAspect"),
      emitterSeed: e.getUniformLocation(m, "uEmitterSeed")
    }, ne = {
      velocityMap: e.getUniformLocation(d, "uVelocityMap"),
      texel: e.getUniformLocation(d, "uTexel"),
      aspect: e.getUniformLocation(d, "uAspect")
    }, q = {
      velocityMap: e.getUniformLocation(f, "uVelocityMap"),
      curlMap: e.getUniformLocation(f, "uCurlMap"),
      texel: e.getUniformLocation(f, "uTexel"),
      deltaTime: e.getUniformLocation(f, "uDeltaTime"),
      strength: e.getUniformLocation(f, "uStrength"),
      aspect: e.getUniformLocation(f, "uAspect")
    }, y = {
      velocityMap: e.getUniformLocation(x, "uVelocityMap"),
      texel: e.getUniformLocation(x, "uTexel"),
      obstacleRect: e.getUniformLocation(x, "uObstacleRect"),
      aspect: e.getUniformLocation(x, "uAspect")
    }, I = {
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
    }, C = {
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
    }, B = (S) => {
      const N = e.createTexture(), U = e.createFramebuffer();
      if (!N || !U)
        return N && e.deleteTexture(N), U && e.deleteFramebuffer(U), !1;
      e.bindTexture(e.TEXTURE_2D, N), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, S, null), e.bindFramebuffer(e.FRAMEBUFFER, U), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, N, 0);
      const A = e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE;
      return e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(N), e.deleteFramebuffer(U), A;
    }, ee = (() => {
      const S = e.getExtension("OES_texture_half_float"), N = e.getExtension("OES_texture_half_float_linear");
      if (e.getExtension("EXT_color_buffer_half_float"), S && N && B(S.HALF_FLOAT_OES))
        return {
          filter: e.LINEAR,
          type: S.HALF_FLOAT_OES
        };
      const U = e.getExtension("OES_texture_float"), A = e.getExtension("OES_texture_float_linear");
      return e.getExtension("WEBGL_color_buffer_float"), U && A && B(e.FLOAT) ? {
        filter: e.LINEAR,
        type: e.FLOAT
      } : {
        filter: e.LINEAR,
        type: e.UNSIGNED_BYTE
      };
    })(), F = (S, N, U) => {
      const A = e.createTexture(), J = e.createFramebuffer();
      return !A || !J ? (A && e.deleteTexture(A), J && e.deleteFramebuffer(J), null) : (e.bindTexture(e.TEXTURE_2D, A), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, ee.filter), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, ee.filter), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, S, N, 0, e.RGBA, ee.type, null), e.bindFramebuffer(e.FRAMEBUFFER, J), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, A, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(A), e.deleteFramebuffer(J), null) : (e.viewport(0, 0, S, N), e.clearColor(U[0], U[1], U[2], U[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null), { framebuffer: J, height: N, texture: A, width: S }));
    }, W = (S, N) => {
      e.bindFramebuffer(e.FRAMEBUFFER, S.framebuffer), e.viewport(0, 0, S.width, S.height), e.clearColor(N[0], N[1], N[2], N[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null);
    }, O = (S) => {
      e.deleteFramebuffer(S.framebuffer), e.deleteTexture(S.texture);
    }, j = () => {
      const S = Math.min(window.devicePixelRatio || 1, 1.3), N = Math.max(120, Math.min(340, Math.floor(window.innerWidth * S / 5))), U = Math.max(80, Math.min(220, Math.floor(window.innerHeight * S / 5)));
      return [N, U];
    };
    let E = 0, D = !1, P = null, $ = null, g = null, R = null, H = null, te = 0, ce = 0, re = 0;
    const be = performance.now(), Te = window.matchMedia("(prefers-reduced-motion: reduce)"), oe = [-1, -1, -1, -1];
    let ae = [0.5, 0.5], se = [0, 0], Re = 0, Ie = null, Le = be;
    const z = () => {
      const [S, N] = j();
      if ((P == null ? void 0 : P[0].width) === S && P[0].height === N)
        return !0;
      P == null || P.forEach(O), $ == null || $.forEach(O), g == null || g.forEach(O), R && O(R), H && O(H);
      const U = [
        F(S, N, [0.5, 0.5, 0, 1]),
        F(S, N, [0.5, 0.5, 0, 1])
      ], A = [
        F(S, N, [0.5, 0, 0, 1]),
        F(S, N, [0.5, 0, 0, 1])
      ], J = [
        F(S, N, [0, 0, 0, 0]),
        F(S, N, [0, 0, 0, 0])
      ], Pe = F(S, N, [0.5, 0, 0, 1]), De = F(S, N, [0.5, 0, 0, 1]), Xe = [...U, ...A, ...J, Pe, De];
      return Xe.some((Fe) => !Fe) ? (Xe.forEach((Fe) => {
        Fe && O(Fe);
      }), P = null, $ = null, g = null, R = null, H = null, !1) : (P = U, $ = A, g = J, R = Pe, H = De, te = 0, ce = 0, re = 0, !0);
    };
    let fe = be;
    const Qe = 0.5, pe = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ], _e = () => {
      const N = Math.max(1, Math.floor(window.innerWidth * 1)), U = Math.max(1, Math.floor(window.innerHeight * 1));
      (r.width !== N || r.height !== U) && (r.width = N, r.height = U, e.viewport(0, 0, N, U)), e.useProgram(c), e.uniform2f(V.resolution, N, U), z();
    }, L = (S) => {
      const N = S * 60;
      Re *= Math.pow(0.9, N), se = [
        se[0] * Math.pow(0.94, N),
        se[1] * Math.pow(0.94, N)
      ];
    }, Je = (S) => {
      if (!a.current || S.pointerType === "touch")
        return;
      const N = Math.max(window.innerWidth, 1), U = Math.max(window.innerHeight, 1), A = [
        Math.max(0, Math.min(1, S.clientX / N)),
        Math.max(0, Math.min(1, 1 - S.clientY / U))
      ], J = performance.now(), Pe = Math.max((J - Le) / 1e3, 1 / 120);
      if (Ie) {
        const De = [
          Math.max(-7.5, Math.min(7.5, (A[0] - Ie[0]) / Pe)),
          Math.max(-7.5, Math.min(7.5, (A[1] - Ie[1]) / Pe))
        ];
        se = [
          se[0] + (De[0] - se[0]) * 0.74,
          se[1] + (De[1] - se[1]) * 0.74
        ];
      }
      ae = A, Ie = A, Le = J, Re = Math.min(1, Re + 0.92), Te.matches && Ue(J);
    }, lt = () => {
      const S = Math.max(window.innerWidth, 1), N = Math.max(window.innerHeight, 1), A = Array.from(document.querySelectorAll(".timeline-fluid-obstacle")).find((Pe) => {
        const De = Pe.getBoundingClientRect(), Xe = window.getComputedStyle(Pe);
        return Xe.display !== "none" && Xe.visibility !== "hidden" && De.width > 1 && De.height > 1 && De.bottom > 0 && De.top < N && De.right > 0 && De.left < S;
      });
      if (!A)
        return [-1, -1, -1, -1];
      const J = A.getBoundingClientRect();
      return [
        Math.max(0, Math.min(1, J.left / S)),
        Math.max(0, Math.min(1, 1 - J.bottom / N)),
        Math.max(0, Math.min(1, J.right / S)),
        Math.max(0, Math.min(1, 1 - J.top / N))
      ];
    }, he = (S, N) => {
      if (!P || !$ || !g || !R || !H)
        return;
      const U = r.width / Math.max(r.height, 1);
      let A = P[te], J = P[1 - te];
      const Pe = g[re];
      e.bindFramebuffer(e.FRAMEBUFFER, J.framebuffer), e.viewport(0, 0, J.width, J.height), e.useProgram(m), _(m), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, A.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Pe.texture), e.uniform1i(Q.velocityMap, 0), e.uniform1i(Q.dyeMap, 1), e.uniform2f(Q.texel, 1 / A.width, 1 / A.height), e.uniform2f(Q.pointerPosition, ae[0], ae[1]), e.uniform2f(Q.pointerVelocity, se[0], se[1]), e.uniform1f(Q.pointerActive, a.current ? Re : 0), e.uniform1f(Q.pointerRadius, 0.088), e.uniform1f(Q.deltaTime, S), e.uniform1f(Q.elapsedTime, N), e.uniform1f(Q.aspect, U), e.uniform4f(Q.emitterSeed, pe[0], pe[1], pe[2], pe[3]), e.drawArrays(e.TRIANGLES, 0, 6), te = 1 - te, A = P[te], e.bindFramebuffer(e.FRAMEBUFFER, H.framebuffer), e.viewport(0, 0, H.width, H.height), e.useProgram(d), _(d), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, A.texture), e.uniform1i(ne.velocityMap, 0), e.uniform2f(ne.texel, 1 / A.width, 1 / A.height), e.uniform1f(ne.aspect, U), e.drawArrays(e.TRIANGLES, 0, 6), J = P[1 - te], e.bindFramebuffer(e.FRAMEBUFFER, J.framebuffer), e.viewport(0, 0, J.width, J.height), e.useProgram(f), _(f), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, A.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, H.texture), e.uniform1i(q.velocityMap, 0), e.uniform1i(q.curlMap, 1), e.uniform2f(q.texel, 1 / A.width, 1 / A.height), e.uniform1f(q.deltaTime, S * 0.25), e.uniform1f(q.strength, 13), e.uniform1f(q.aspect, U), e.drawArrays(e.TRIANGLES, 0, 6), te = 1 - te, A = P[te], e.bindFramebuffer(e.FRAMEBUFFER, R.framebuffer), e.viewport(0, 0, R.width, R.height), e.useProgram(x), _(x), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, A.texture), e.uniform1i(y.velocityMap, 0), e.uniform2f(y.texel, 1 / A.width, 1 / A.height), e.uniform4f(y.obstacleRect, oe[0], oe[1], oe[2], oe[3]), e.uniform1f(y.aspect, U), e.drawArrays(e.TRIANGLES, 0, 6), $.forEach((Fe) => W(Fe, [0.5, 0, 0, 1])), ce = 0;
      for (let Fe = 0; Fe < 12; Fe += 1) {
        const de = $[ce], et = $[1 - ce];
        e.bindFramebuffer(e.FRAMEBUFFER, et.framebuffer), e.viewport(0, 0, et.width, et.height), e.useProgram(w), _(w), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, de.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, R.texture), e.uniform1i(I.pressureMap, 0), e.uniform1i(I.divergenceMap, 1), e.uniform2f(I.texel, 1 / de.width, 1 / de.height), e.uniform4f(I.obstacleRect, oe[0], oe[1], oe[2], oe[3]), e.uniform1f(I.aspect, U), e.drawArrays(e.TRIANGLES, 0, 6), ce = 1 - ce;
      }
      J = P[1 - te], e.bindFramebuffer(e.FRAMEBUFFER, J.framebuffer), e.viewport(0, 0, J.width, J.height), e.useProgram(b), _(b), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, A.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, $[ce].texture), e.uniform1i(Y.velocityMap, 0), e.uniform1i(Y.pressureMap, 1), e.uniform2f(Y.texel, 1 / A.width, 1 / A.height), e.uniform4f(Y.obstacleRect, oe[0], oe[1], oe[2], oe[3]), e.uniform1f(Y.aspect, U), e.drawArrays(e.TRIANGLES, 0, 6), te = 1 - te, A = P[te];
      const De = g[re], Xe = g[1 - re];
      e.bindFramebuffer(e.FRAMEBUFFER, Xe.framebuffer), e.viewport(0, 0, Xe.width, Xe.height), e.useProgram(v), _(v), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, A.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, De.texture), e.uniform1i(C.velocityMap, 0), e.uniform1i(C.dyeMap, 1), e.uniform2f(C.pointerPosition, ae[0], ae[1]), e.uniform2f(C.pointerVelocity, se[0], se[1]), e.uniform1f(C.pointerActive, a.current ? Re : 0), e.uniform1f(C.pointerRadius, 0.088), e.uniform1f(C.deltaTime, S), e.uniform1f(C.elapsedTime, N), e.uniform1f(C.aspect, U), e.uniform4f(C.emitterSeed, pe[0], pe[1], pe[2], pe[3]), e.drawArrays(e.TRIANGLES, 0, 6), re = 1 - re;
    }, Ne = (S) => {
      if (!P || !g)
        return;
      const N = P[te], U = g[re];
      e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, r.width, r.height), e.useProgram(c), _(c), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, N.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, U.texture), e.uniform1i(V.velocityMap, 0), e.uniform1i(V.dyeMap, 1), e.uniform2f(V.resolution, r.width, r.height), e.uniform2f(V.fluidTexel, 1 / N.width, 1 / N.height);
      const A = lt();
      e.uniform4f(V.widgetRect, A[0], A[1], A[2], A[3]), e.uniform1f(V.elapsedTime, S), e.uniform1f(V.emitterDebug, n.current ? 1 : 0), e.uniform4f(V.emitterSeed, pe[0], pe[1], pe[2], pe[3]), e.drawArrays(e.TRIANGLES, 0, 6);
    }, Ue = (S) => {
      _e();
      const N = Math.min(Math.max((S - fe) / 1e3, 1 / 120), 1 / 20);
      fe = S;
      const U = (S - be) / 1e3, A = N * Qe, J = U * Qe;
      L(N), he(A, J), Ne(J);
    }, aa = (S) => {
      D || (E = window.requestAnimationFrame(aa), !document.hidden && Ue(S));
    }, Se = () => {
      D || (_e(), Ue(be + 1e3), Te.matches || (E = window.requestAnimationFrame(aa)));
    };
    return window.addEventListener("resize", _e), window.addEventListener("pointermove", Je, { passive: !0 }), Se(), () => {
      D = !0, window.cancelAnimationFrame(E), window.removeEventListener("resize", _e), window.removeEventListener("pointermove", Je), P == null || P.forEach(O), $ == null || $.forEach(O), g == null || g.forEach(O), R && O(R), H && O(H), e.deleteBuffer(k), M();
    };
  }, []), /* @__PURE__ */ h(xt, { children: [
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
function gr({
  boardView: t,
  hiddenCompanyCount: a,
  onShowHiddenCompanies: n
}) {
  const r = a > 0, e = Ze();
  return /* @__PURE__ */ o("div", { className: "flex min-h-[18rem] items-center justify-center px-6 py-14", children: /* @__PURE__ */ h("div", { className: "max-w-[34rem] text-center", children: [
    /* @__PURE__ */ o("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink-soft)]", children: /* @__PURE__ */ o(it, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ o("p", { className: "mt-5 text-lg font-semibold tracking-tight text-[var(--ink)]", children: r ? `All visible ${e.groupPluralLabel} are hidden` : `${t.label} has no releases yet` }),
    /* @__PURE__ */ o("p", { className: "mt-2 text-sm leading-6 text-[var(--ink-soft)]", children: r ? `Show hidden ${e.groupPluralLabel} or turn on another product line to repopulate the timeline.` : e.emptyBoardDescription }),
    r ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        onClick: n,
        className: "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
        children: [
          /* @__PURE__ */ o(qt, { className: "h-4 w-4", strokeWidth: 1.8 }),
          e.showHiddenLabel
        ]
      }
    ) : null
  ] }) });
}
function ws() {
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
function vr({
  activeCompanyId: t,
  compact: a = !1,
  onCompanyBlur: n,
  onCompanyFocus: r,
  onCompanyTap: e,
  railWidth: s,
  rowLayouts: l,
  timelineWidth: c
}) {
  return /* @__PURE__ */ o("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 z-[6]", children: l.map((m) => {
    const d = t === m.company.id;
    return /* @__PURE__ */ o(
      "div",
      {
        "data-row-focus-band": !0,
        className: "pointer-events-auto absolute left-0 rounded-[1.25rem]",
        onClick: (f) => {
          e && (f.stopPropagation(), e(m.company.id));
        },
        onMouseEnter: () => r(m.company.id),
        onMouseLeave: () => n == null ? void 0 : n(),
        onPointerEnter: (f) => {
          f.pointerType !== "touch" && r(m.company.id);
        },
        onPointerLeave: (f) => {
          f.pointerType !== "touch" && (n == null || n());
        },
        style: {
          height: `${m.height}px`,
          top: `${m.y}px`,
          width: `${c + s}px`
        },
        children: /* @__PURE__ */ o(
          "div",
          {
            className: `absolute inset-x-0 top-1/2 h-[calc(100%+1.25rem)] -translate-y-1/2 border-y transition duration-200 ${d ? "opacity-100" : "opacity-0"}`,
            style: {
              background: `linear-gradient(90deg, ${He(m.company.accent, a ? 0.16 : 0.12)}, transparent 42%, ${He(
                m.company.accent,
                0.08
              )})`,
              borderColor: He(m.company.accent, a ? 0.28 : 0.22)
            }
          }
        )
      },
      `${m.company.id}-${a ? "mobile" : "desktop"}-focus-band`
    );
  }) });
}
function xr({
  compact: t = !1,
  onClearFocus: a,
  onCompanyHide: n,
  onCompanyMove: r,
  onPointerEnter: e,
  onPointerLeave: s,
  row: l,
  rowCount: c,
  screenX: m,
  screenY: d
}) {
  const f = l.company, x = f.latestRelease, w = x ? x.name : "No releases", b = f.productLines.map((M) => M.shortLabel).join(" / "), v = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[rgba(255,255,255,0.035)] text-[var(--ink-soft)] transition duration-200 hover:border-[var(--edge-strong)] hover:bg-[rgba(255,255,255,0.075)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-30";
  return /* @__PURE__ */ o(
    "div",
    {
      "data-row-focus-label": !0,
      className: "pointer-events-none absolute z-30 will-change-transform",
      style: {
        transform: `translate3d(${m}px, ${d}px, 0) translateY(-50%)`
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
          onPointerDown: (M) => M.stopPropagation(),
          onPointerEnter: e,
          onPointerLeave: s,
          children: [
            /* @__PURE__ */ h("div", { className: "flex min-w-0 items-start gap-3", children: [
              /* @__PURE__ */ o(Vi, { compact: t, company: f }),
              /* @__PURE__ */ h("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ h("div", { className: "flex min-w-0 items-center gap-2", children: [
                  /* @__PURE__ */ o("p", { className: "truncate text-sm font-semibold leading-tight tracking-tight text-[var(--ink)]", children: f.name }),
                  /* @__PURE__ */ o(
                    "span",
                    {
                      className: "h-1.5 w-1.5 shrink-0 rounded-full",
                      style: { backgroundColor: f.accent }
                    }
                  )
                ] }),
                /* @__PURE__ */ o("p", { className: "mt-1 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: b }),
                /* @__PURE__ */ o("p", { className: "mt-2 truncate text-xs font-medium text-[var(--ink-soft)]", children: w })
              ] })
            ] }),
            /* @__PURE__ */ h("div", { className: "mt-3 flex items-center justify-between gap-2 border-t border-[var(--edge)] pt-2.5", children: [
              /* @__PURE__ */ h("span", { className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: [
                "Score ",
                f.significanceScore,
                " · Row ",
                l.index + 1,
                "/",
                c
              ] }),
              /* @__PURE__ */ h("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${f.name} up`,
                    title: `Move ${f.name} up`,
                    className: v,
                    disabled: l.index === 0,
                    onClick: (M) => {
                      M.stopPropagation(), r(f.id, "up");
                    },
                    children: /* @__PURE__ */ o(Gr, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${f.name} down`,
                    title: `Move ${f.name} down`,
                    className: v,
                    disabled: l.index === c - 1,
                    onClick: (M) => {
                      M.stopPropagation(), r(f.id, "down");
                    },
                    children: /* @__PURE__ */ o(jr, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Hide ${f.name}`,
                    title: `Hide ${f.name}`,
                    className: v,
                    onClick: (M) => {
                      M.stopPropagation(), n(f.id), a();
                    },
                    children: /* @__PURE__ */ o(Yn, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
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
function Ts({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handlePointerDown: e,
  handlePointerMove: s,
  hiddenCompanyCount: l,
  handleZoomChange: c,
  isPanning: m,
  latestCompany: d,
  maxDays: f,
  minZoom: x,
  maxZoom: w,
  maxSummaryQuietDays: b,
  modelExplorer: v,
  monthTicks: M,
  onCompanyHide: k,
  onCompanyMove: _,
  onDismissArticle: V,
  onModelSelect: Q,
  onResetCamera: ne,
  onShowHiddenCompanies: q,
  onToggleTimelineGrid: y,
  processedCompanies: I,
  renderWindow: Y,
  scrollContainerRef: C,
  showTimelineGrid: B,
  stopPanning: G,
  summaryCompanies: ee,
  timelineStartDay: F,
  timelineWidth: W,
  viewport: O,
  worldRef: j,
  yearTicks: E,
  zoom: D
}) {
  var _e;
  const $ = st(!1, 1), g = Gt(I, !1, 1), R = jt({
    currentGlobalDay: r,
    maxDays: f,
    summaryCount: ee.length,
    timelineStartDay: F,
    timelineHeight: g,
    timelineWidth: W,
    viewport: O
  }), H = Ct(I, !1, 1, $), [te, ce] = xe(null), re = Z(null), be = () => {
    re.current !== null && (window.clearTimeout(re.current), re.current = null);
  }, Te = (L) => {
    be(), ce(L);
  }, oe = () => {
    be(), ce(null);
  }, ae = () => {
    be(), re.current = window.setTimeout(() => {
      ce(null), re.current = null;
    }, 120);
  };
  Me(() => () => be(), []);
  const se = H.find((L) => L.company.id === te) ?? null, Ie = ie(116, 16, Math.max(16, O.width - 288 - 16)), Le = se ? ie(
    (R.timelineY + se.y + se.height / 2 - n.y) * D,
    82,
    Math.max(82, O.height - 84)
  ) : 0, z = Ze(), fe = a.isDefault ? z.defaultBoardDescription : a.isEmpty ? z.emptyBoardDetail : a.isComposite ? z.compositeBoardDescription(a.label) : z.singleBoardDescription(a.label), Qe = R.timelineX + F * Ce, pe = W + pt;
  return /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ o("div", { className: "absolute left-5 top-5 z-40 [--category-expanded-width:40rem]", children: v }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: C,
        className: `absolute inset-0 overflow-hidden [overflow-anchor:none] ${m ? "cursor-grabbing" : "cursor-grab"}`,
        onClickCapture: (L) => V(L.target, { clientX: L.clientX, clientY: L.clientY }),
        onPointerDown: e,
        onPointerMove: s,
        onPointerUp: G,
        onPointerCancel: G,
        onLostPointerCapture: G,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: j,
            className: "relative",
            style: {
              height: `${R.worldHeight}px`,
              transform: Ua(n, D),
              transformOrigin: "0 0",
              width: `${R.worldWidth}px`,
              "--map-zoom": String($a(D))
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
                    left: `${R.contentCards.intro.x}px`,
                    top: `${R.contentCards.intro.y}px`,
                    width: `${R.contentCards.intro.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ o("h1", { className: "mt-4 max-w-4xl text-5xl leading-none tracking-tighter text-[var(--ink)]", children: z.primaryHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-5 max-w-[68ch] text-base leading-7 text-[var(--ink-soft)]", children: fe })
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
                    left: `${R.contentCards.notes.x}px`,
                    top: `${R.contentCards.notes.y}px`,
                    width: `${R.contentCards.notes.width}px`,
                    "--border-sheen-delay": "2.8s"
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: z.timelineNotesHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-4 text-sm leading-7 text-[var(--ink-soft)]", children: z.timelineInteractionNoteDesktop })
                  ]
                }
              ),
              /* @__PURE__ */ o(
                me.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${g}px`,
                    left: `${Qe}px`,
                    top: `${R.timelineY}px`,
                    width: `${pe}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ o(
                      vr,
                      {
                        activeCompanyId: te,
                        onCompanyBlur: ae,
                        onCompanyFocus: Te,
                        onCompanyTap: Te,
                        railWidth: pt,
                        rowLayouts: H,
                        timelineWidth: W
                      }
                    ),
                    I.length === 0 ? /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-[320px] right-0 top-0 z-20 flex items-center justify-center px-6", children: /* @__PURE__ */ o(
                      gr,
                      {
                        boardView: a,
                        hiddenCompanyCount: l,
                        onShowHiddenCompanies: q
                      }
                    ) }) : null,
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${pe}px` },
                        children: /* @__PURE__ */ o("div", { style: { paddingLeft: `${pt}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${W}px`, minHeight: `${g}px` },
                            children: [
                              B ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                M.map((L) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${ze(L.days, F)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-10 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.18em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: Ve(10),
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
                                    style: { left: `${ze(L.days, F)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-2 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-1.5 font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: Ve(11),
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
                                    style: { left: `${ze(r, F)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-3 py-2 font-semibold uppercase tracking-[0.18em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: Ve(11),
                                        children: z.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              I.length > 0 ? /* @__PURE__ */ o(
                                me.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${$.companyGap}px`,
                                    paddingBottom: `${$.bottomPadding}px`,
                                    paddingTop: `${$.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: I.map((L, Je) => /* @__PURE__ */ o(
                                    fr,
                                    {
                                      activeArticleSlug: t,
                                      company: L,
                                      companyIndex: Je,
                                      currentGlobalDay: r,
                                      maxDays: f,
                                      onCompanyBlur: ae,
                                      onCompanyFocus: Te,
                                      onModelSelect: Q,
                                      renderWindow: Y,
                                      timelineStartDay: F,
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
                me.div,
                {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center",
                  style: {
                    left: `${R.contentCards.latest.x}px`,
                    top: `${R.contentCards.latest.y}px`,
                    width: `${R.contentCards.latest.width}px`
                  },
                  children: [
                    /* @__PURE__ */ h("p", { className: "text-sm leading-relaxed text-[var(--ink-soft)]", children: [
                      z.latestDesktopLabel,
                      ": ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: (d == null ? void 0 : d.name) ?? z.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: ((_e = d == null ? void 0 : d.latestRelease) == null ? void 0 : _e.name) ?? z.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ o("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: z.timezoneLabel })
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
                    left: `${R.contentCards.summaries.x}px`,
                    top: `${R.contentCards.summaries.y}px`,
                    width: `${R.contentCards.summaries.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]", children: z.recencyHeading }),
                    /* @__PURE__ */ o("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: ee.map((L, Je) => /* @__PURE__ */ o(
                      pr,
                      {
                        company: L,
                        currentGlobalDay: r,
                        index: Je,
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
    /* @__PURE__ */ o(Ge, { children: se ? /* @__PURE__ */ o(Dt.Fragment, { children: /* @__PURE__ */ o(
      xr,
      {
        onClearFocus: oe,
        onCompanyHide: k,
        onCompanyMove: _,
        onPointerEnter: be,
        onPointerLeave: ae,
        row: se,
        rowCount: H.length,
        screenX: Ie,
        screenY: Le
      }
    ) }, `${se.company.id}-desktop-focus-label`) : null }),
    /* @__PURE__ */ o(
      dr,
      {
        className: "right-5 top-1/2 -translate-y-1/2",
        maxZoom: w,
        minZoom: x,
        onZoomChange: c,
        zoom: D
      }
    ),
    /* @__PURE__ */ h("div", { className: "absolute right-6 top-[calc(50%+12.5rem)] z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        vt,
        {
          label: B ? z.timelineGridHideLabel : z.timelineGridShowLabel,
          onClick: y,
          pressed: B,
          children: [
            B ? /* @__PURE__ */ o($n, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ o(Un, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ o("span", { children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(vt, { label: z.resetCameraLabel, onClick: ne, children: [
        /* @__PURE__ */ o(qt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { children: "Reset" })
      ] }),
      l > 0 ? /* @__PURE__ */ h(vt, { label: z.showHiddenLabel, onClick: q, children: [
        /* @__PURE__ */ o(it, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { children: z.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function Es({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handleTouchEnd: e,
  handleTouchMove: s,
  handleTouchStart: l,
  handleZoomChange: c,
  hiddenCompanyCount: m,
  latestCompany: d,
  minZoom: f,
  maxZoom: x,
  maxDays: w,
  maxSummaryQuietDays: b,
  modelExplorer: v,
  monthTicks: M,
  onCompanyHide: k,
  onCompanyMove: _,
  onDismissArticle: V,
  onModelSelect: Q,
  onResetCamera: ne,
  onShowHiddenCompanies: q,
  onToggleTimelineGrid: y,
  processedCompanies: I,
  renderWindow: Y,
  scrollContainerRef: C,
  showTimelineGrid: B,
  timelineStartDay: G,
  timelineWidth: ee,
  viewport: F,
  worldRef: W,
  yearTicks: O,
  zoom: j
}) {
  var Le;
  const D = st(!0, 1), P = Gt(I, !0, 1), $ = jt({
    compact: !0,
    currentGlobalDay: r,
    maxDays: w,
    summaryCount: I.length,
    timelineStartDay: G,
    timelineHeight: P,
    timelineWidth: ee,
    viewport: F
  }), g = Ct(I, !0, 1, D), [R, H] = xe(null), te = (z) => H(z), ce = () => H(null), re = g.find((z) => z.company.id === R) ?? null, Te = Math.max(16, Math.min(126, Math.max(16, F.width - 248 - 12))), oe = re ? ie(
    ($.timelineY + re.y + re.height / 2 - n.y) * j,
    98,
    Math.max(98, F.height - 104)
  ) : 0, ae = Ze(), se = a.isDefault ? ae.defaultBoardDescription : a.isEmpty ? ae.emptyBoardDetail : a.isComposite ? ae.compositeBoardDescriptionMobile(a.label) : ae.singleBoardDescriptionMobile(a.label), Re = $.timelineX + G * Ce, Ie = ee + ht;
  return /* @__PURE__ */ h("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ o("div", { className: "absolute left-3 top-3 z-40 [--category-expanded-width:min(20rem,calc(100vw-5rem))]", children: v }),
    /* @__PURE__ */ o(
      "div",
      {
        ref: C,
        className: "absolute inset-0 touch-none overflow-hidden [overflow-anchor:none]",
        onClickCapture: (z) => V(z.target, { clientX: z.clientX, clientY: z.clientY }),
        onClick: (z) => {
          const fe = z.target;
          fe instanceof Element && (fe.closest("[data-row-focus-band], [data-row-focus-label], button, a, input, label, select, textarea") || ce());
        },
        onTouchCancel: e,
        onTouchEnd: e,
        onTouchMove: s,
        onTouchStart: l,
        children: /* @__PURE__ */ h(
          "div",
          {
            ref: W,
            className: "relative",
            style: {
              height: `${$.worldHeight}px`,
              transform: Ua(n, j),
              transformOrigin: "0 0",
              width: `${$.worldWidth}px`,
              "--map-zoom": String($a(j))
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
                    left: `${$.contentCards.intro.x}px`,
                    top: `${$.contentCards.intro.y}px`,
                    width: `${$.contentCards.intro.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: a.label }),
                    /* @__PURE__ */ o("h1", { className: "mt-3 max-w-sm text-[2.25rem] leading-none tracking-tighter text-[var(--ink)]", children: ae.primaryHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-4 text-sm leading-6 text-[var(--ink-soft)]", children: se })
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
                    left: `${$.contentCards.notes.x}px`,
                    top: `${$.contentCards.notes.y}px`,
                    width: `${$.contentCards.notes.width}px`,
                    "--border-sheen-delay": "2.8s"
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: ae.timelineNotesHeading }),
                    /* @__PURE__ */ o("p", { className: "mt-3 text-xs leading-5 text-[var(--ink-soft)]", children: ae.timelineInteractionNoteMobile })
                  ]
                }
              ),
              /* @__PURE__ */ o(
                me.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${P}px`,
                    left: `${Re}px`,
                    top: `${$.timelineY}px`,
                    width: `${Ie}px`
                  },
                  children: /* @__PURE__ */ h("div", { className: "relative", children: [
                    /* @__PURE__ */ o(
                      vr,
                      {
                        activeCompanyId: R,
                        compact: !0,
                        onCompanyFocus: te,
                        onCompanyTap: te,
                        railWidth: ht,
                        rowLayouts: g,
                        timelineWidth: ee
                      }
                    ),
                    I.length === 0 ? /* @__PURE__ */ o("div", { className: "absolute bottom-0 left-[196px] right-0 top-0 z-20 flex items-center justify-center px-3", children: /* @__PURE__ */ o(
                      gr,
                      {
                        boardView: a,
                        hiddenCompanyCount: m,
                        onShowHiddenCompanies: q
                      }
                    ) }) : null,
                    /* @__PURE__ */ o(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${Ie}px` },
                        children: /* @__PURE__ */ o("div", { style: { paddingLeft: `${ht}px` }, children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${ee}px`, minHeight: `${P}px` },
                            children: [
                              B ? /* @__PURE__ */ h("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                M.map((z) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${ze(z.days, G)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-9 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full bg-[var(--surface-strong)] px-2 py-1 font-medium uppercase tracking-[0.16em] text-[var(--muted)] shadow-[var(--soft-shadow)]",
                                        style: Ve(9),
                                        children: z.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-month-${z.days}`
                                )),
                                O.map((z) => /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${ze(z.days, G)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1 font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)]",
                                        style: Ve(10),
                                        children: z.label
                                      }
                                    ) }) })
                                  },
                                  `mobile-year-${z.label}`
                                )),
                                /* @__PURE__ */ o(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${ze(r, G)}px` },
                                    children: /* @__PURE__ */ o("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ o("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ o(
                                      "div",
                                      {
                                        className: "timeline-map-screen-label inline-flex items-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] px-2.5 py-1.5 font-semibold uppercase tracking-[0.16em] text-[var(--ink)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]",
                                        style: Ve(10),
                                        children: ae.todayLabel
                                      }
                                    ) }) })
                                  }
                                )
                              ] }) : null,
                              I.length > 0 ? /* @__PURE__ */ o(
                                me.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${D.companyGap}px`,
                                    paddingBottom: `${D.bottomPadding}px`,
                                    paddingTop: `${D.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: I.map((z, fe) => /* @__PURE__ */ o(
                                    fr,
                                    {
                                      activeArticleSlug: t,
                                      compact: !0,
                                      company: z,
                                      companyIndex: fe,
                                      currentGlobalDay: r,
                                      maxDays: w,
                                      onCompanyFocus: te,
                                      onModelSelect: Q,
                                      renderWindow: Y,
                                      timelineStartDay: G,
                                      verticalScale: 1
                                    },
                                    z.id
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
                me.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute",
                  style: {
                    left: `${$.contentCards.latest.x}px`,
                    top: `${$.contentCards.latest.y}px`,
                    width: `${$.contentCards.latest.width}px`
                  },
                  children: [
                    /* @__PURE__ */ h("p", { className: "text-xs leading-5 text-[var(--ink-soft)]", children: [
                      ae.latestMobileLabel,
                      ": ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: (d == null ? void 0 : d.name) ?? ae.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ o("span", { className: "font-semibold text-[var(--ink)]", children: ((Le = d == null ? void 0 : d.latestRelease) == null ? void 0 : Le.name) ?? ae.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ o("p", { className: "mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: ae.timezoneLabel })
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
                    left: `${$.contentCards.summaries.x}px`,
                    top: `${$.contentCards.summaries.y}px`,
                    width: `${$.contentCards.summaries.width}px`
                  },
                  children: [
                    /* @__PURE__ */ o("p", { className: "mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]", children: ae.recencyHeading }),
                    /* @__PURE__ */ o("div", { className: "grid gap-3 sm:grid-cols-2", children: /* @__PURE__ */ o(Ge, { initial: !1, mode: "popLayout", children: I.map((z, fe) => /* @__PURE__ */ o(
                      pr,
                      {
                        compact: !0,
                        company: z,
                        currentGlobalDay: r,
                        index: fe,
                        maxSummaryQuietDays: b
                      },
                      z.id
                    )) }) })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ o(Ge, { children: re ? /* @__PURE__ */ o(Dt.Fragment, { children: /* @__PURE__ */ o(
      xr,
      {
        compact: !0,
        onClearFocus: ce,
        onCompanyHide: k,
        onCompanyMove: _,
        row: re,
        rowCount: g.length,
        screenX: Te,
        screenY: oe
      }
    ) }, `${re.company.id}-mobile-focus-label`) : null }),
    /* @__PURE__ */ o(
      dr,
      {
        compact: !0,
        className: "right-1 top-1/2 -translate-y-1/2",
        maxZoom: x,
        minZoom: f,
        onZoomChange: c,
        zoom: j
      }
    ),
    /* @__PURE__ */ h("div", { className: "absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ h(
        vt,
        {
          label: B ? ae.timelineGridHideLabel : ae.timelineGridShowLabel,
          onClick: y,
          pressed: B,
          children: [
            B ? /* @__PURE__ */ o($n, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ o(Un, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ o("span", { className: "sr-only", children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ h(vt, { label: ae.resetCameraLabel, onClick: ne, children: [
        /* @__PURE__ */ o(qt, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: "Reset" })
      ] }),
      m > 0 ? /* @__PURE__ */ h(vt, { label: ae.showHiddenLabel, onClick: q, children: [
        /* @__PURE__ */ o(it, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ o("span", { className: "sr-only", children: ae.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function As({ definition: t }) {
  uo(t);
  const [a, n] = xe(() => Jo()), [r, e] = xe(() => ei()), [s, l] = xe(
    () => ti()
  ), [c, m] = xe(!1), [d, f] = xe(
    () => typeof window > "u" ? !0 : window.matchMedia("(min-width: 768px)").matches
  ), [x, w] = xe(Bt), [b, v] = xe(Ot), [M, k] = xe(!1), [_, V] = xe(!1), [Q, ne] = xe(!0), [q, y] = xe([]), [I, Y] = xe(() => Ye().map((i) => i.id)), [C, B] = xe({ x: 0, y: 0 }), [G, ee] = xe({ x: 0, y: 0 }), [F, W] = xe(() => Qo()), O = Z(Bt), j = Z(Ot), E = Z({ x: 0, y: 0 }), D = Z({ x: 0, y: 0 }), P = Z({
    frameId: null,
    lastFrameAt: null,
    stiffness: dt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: Bt
    },
    zoomAnchor: null
  }), $ = Z({
    frameId: null,
    lastFrameAt: null,
    stiffness: dt,
    target: {
      camera: { x: 0, y: 0 },
      zoom: Ot
    },
    zoomAnchor: null
  }), g = Z(null), R = Z(null), H = Z(null), te = Z(null), ce = Z(null), re = Z(null), be = Z(null), Te = Z(null), oe = Z(!1), ae = Z(!1), se = Z(null), Re = Z(null), Ie = Z(!1), Le = Z(null), z = Z(() => {
  }), fe = Z(null), Qe = Z(null), pe = Z({
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0
  });
  Z(/* @__PURE__ */ new Map());
  const _e = Z(null), [L, Je] = xe({
    desktop: { height: 0, width: 0 },
    mobile: { height: 0, width: 0 }
  }), lt = Ze(), he = F.kind === "model" ? F.slug : null, Ne = he ? le().articleIndexBySlug[he] ?? null : null, Ue = F.kind === "model", Se = (ve(() => /* @__PURE__ */ new Date(), []).getTime() - rt().getTime()) / ot, S = ve(() => di(a), [a]), N = ve(
    () => ta(Ye(), a),
    [a]
  ), U = ve(
    () => xi(N, I, q, r, Se),
    [I, r, Se, q, N]
  ), A = ve(
    () => bi(U, s, Ne == null ? void 0 : Ne.companyId),
    [Ne == null ? void 0 : Ne.companyId, U, s]
  ), J = ve(
    () => A.map((i) => i.id),
    [A]
  ), Pe = ve(() => {
    const i = new Set(q);
    return N.filter((u) => i.has(u.id)).length;
  }, [q, N]), De = ve(() => fi(Ye(), a), [a]), Xe = ve(() => pi(Ye(), a), [a]), Fe = ve(() => hi(Ye(), a), [a]), de = ve(
    () => Ti(A, Se),
    [Se, A]
  ), et = Math.max(Math.ceil(Se) + 36, de.latestGlobalDay + 36, 720), Ya = Math.max(et * Ce, 1), yt = Dn(L.desktop.width, pt, Ya), Rt = Dn(L.mobile.width, ht, Ya), za = En({
    camera: C,
    minimumDays: et,
    viewport: L.desktop,
    zoom: x
  }), Ba = En({
    camera: G,
    compact: !0,
    minimumDays: et,
    viewport: L.mobile,
    zoom: b
  }), St = za.endDay, kt = za.startDay, At = Ba.endDay, It = Ba.startDay, na = Math.max(Vt(kt, St), 1), ra = Math.max(
    Vt(It, At),
    1
  ), br = ve(
    () => Tn({
      camera: C,
      viewport: L.desktop,
      zoom: x
    }),
    [C, L.desktop, x]
  ), yr = ve(
    () => Tn({
      camera: G,
      compact: !0,
      viewport: L.mobile,
      zoom: b
    }),
    [G, b, L.mobile]
  ), oa = 1, ia = 1, Lt = Gt(de.processedCompanies, !1, oa), _t = Gt(de.processedCompanies, !0, ia), Oa = ve(
    () => Ht({
      camera: C,
      futureBufferDays: bn,
      pastBufferDays: xn,
      viewport: L.desktop,
      zoom: x
    }),
    [C, L.desktop, x]
  ), Wa = ve(
    () => Ht({
      camera: G,
      compact: !0,
      futureBufferDays: bn,
      pastBufferDays: xn,
      viewport: L.mobile,
      zoom: b
    }),
    [G, b, L.mobile]
  ), { monthTicks: wr, yearTicks: Tr } = ve(() => wn(Oa), [Oa]), { monthTicks: Er, yearTicks: Mr } = ve(
    () => wn(Wa),
    [Wa]
  ), Ha = ve(() => [...de.processedCompanies].filter((i) => i.latestRelease).sort((i, u) => {
    var p, T;
    return (((p = u.latestRelease) == null ? void 0 : p.globalDay) ?? 0) - (((T = i.latestRelease) == null ? void 0 : T.globalDay) ?? 0);
  })[0] ?? null, [de.processedCompanies]), wt = ve(() => de.processedCompanies, [de.processedCompanies]), Va = ve(() => wt.reduce((i, u) => {
    const p = Ia(u, Se);
    return Math.max(i, p);
  }, 0), [Se, wt]), tt = ve(
    () => jt({
      currentGlobalDay: Se,
      maxDays: St,
      summaryCount: wt.length,
      timelineStartDay: kt,
      timelineHeight: Lt,
      timelineWidth: na,
      viewport: L.desktop
    }),
    [
      Se,
      Lt,
      St,
      wt.length,
      kt,
      na,
      L.desktop
    ]
  ), at = ve(
    () => jt({
      compact: !0,
      currentGlobalDay: Se,
      maxDays: At,
      summaryCount: de.processedCompanies.length,
      timelineStartDay: It,
      timelineHeight: _t,
      timelineWidth: ra,
      viewport: L.mobile
    }),
    [
      Se,
      At,
      It,
      _t,
      ra,
      de.processedCompanies.length,
      L.mobile
    ]
  );
  Me(() => {
    const i = window.setTimeout(() => V(!0), 120);
    return () => window.clearTimeout(i);
  }, []), Me(() => {
    const i = () => {
      const u = window.location.hash;
      W(ar(u)), n(nr(u)), e(rr(u)), l(or(u));
    };
    return i(), window.addEventListener("hashchange", i), () => window.removeEventListener("hashchange", i);
  }, []), Me(() => {
    const i = xa({
      companySortMode: r,
      filterState: a,
      route: F,
      significanceDisplayLimit: s
    });
    window.location.hash !== i && window.history.replaceState(null, "", i);
  }, [r, a, F, s]), Me(() => () => {
    var i;
    (i = fe.current) == null || i.call(fe), P.current.frameId !== null && window.cancelAnimationFrame(P.current.frameId), $.current.frameId !== null && window.cancelAnimationFrame($.current.frameId);
  }, []), Me(() => {
    Ne && (n((i) => {
      const u = go(Ne.presets), p = We(Ne.presets, nt()), T = qe({
        ...i,
        attributeIds: We([...i.attributeIds, ...p], nt()),
        companyIds: i.companyIds.length > 0 && !i.companyIds.includes(Ne.companyId) ? [...i.companyIds, Ne.companyId] : i.companyIds,
        domainIds: u.length > 0 ? We([...i.domainIds, ...u], je()) : i.domainIds
      });
      return Vn(i, T) ? i : T;
    }), y((i) => i.filter((u) => u !== Ne.companyId)));
  }, [Ne]), Me(() => {
    const i = new Set(Fe.map((u) => u.id));
    n((u) => {
      const p = u.companyIds.filter((T) => i.has(T));
      return p.length === u.companyIds.length ? u : { ...u, companyIds: p };
    });
  }, [Fe]), Me(() => {
    const i = window.matchMedia("(min-width: 768px)"), u = () => f(i.matches);
    return u(), i.addEventListener("change", u), () => i.removeEventListener("change", u);
  }, []), Me(() => {
    const i = () => {
      var p, T, X, K;
      Je({
        desktop: {
          height: ((p = g.current) == null ? void 0 : p.clientHeight) ?? window.innerHeight,
          width: ((T = g.current) == null ? void 0 : T.clientWidth) ?? window.innerWidth
        },
        mobile: {
          height: ((X = R.current) == null ? void 0 : X.clientHeight) ?? window.innerHeight,
          width: ((K = R.current) == null ? void 0 : K.clientWidth) ?? window.innerWidth
        }
      });
    };
    i();
    const u = window.requestAnimationFrame(i);
    return window.addEventListener("resize", i), () => {
      window.cancelAnimationFrame(u), window.removeEventListener("resize", i);
    };
  }, [d, _]), Me(() => {
    if (oe.current)
      return;
    const i = () => {
      if (oe.current || !g.current || g.current.clientWidth === 0)
        return;
      const p = Ut(tt);
      E.current = p.camera, P.current.target = p, la(p.zoom, p.camera), oe.current = !0;
    };
    if (i(), !oe.current)
      return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [tt, L.desktop, x]), Me(() => {
    if (ae.current)
      return;
    const i = () => {
      if (ae.current || !R.current || R.current.clientWidth === 0)
        return;
      const p = Ut(at, !0);
      D.current = p.camera, $.current.target = p, ca(p.zoom, p.camera), ae.current = !0;
    };
    if (i(), !ae.current)
      return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, [at, b, L.mobile]);
  const Nr = (i) => {
    n((u) => {
      const p = u.domainIds.includes(i) ? u.domainIds.filter((T) => T !== i) : We([...u.domainIds, i], je());
      return qe({ ...u, companyIds: [], domainIds: p });
    });
  }, Dr = (i) => {
    n((u) => {
      const p = u.attributeIds.includes(i) ? u.attributeIds.filter((T) => T !== i) : We([...u.attributeIds, i], nt());
      return qe({ ...u, attributeIds: p, companyIds: [] });
    });
  }, Cr = (i) => {
    n((u) => qe({ ...u, companyIds: [], contentType: i }));
  }, Rr = (i) => {
    n((u) => {
      const p = u.companyIds.length === 0 ? [i] : u.companyIds.includes(i) ? u.companyIds.filter((T) => T !== i) : [...u.companyIds, i];
      return qe({ ...u, companyIds: p });
    });
  }, Sr = () => {
    n((i) => ({ ...i, companyIds: [] }));
  }, kr = () => {
    n(bt()), e(Qt()), l(Jt()), y([]), Y(Ye().map((i) => i.id));
  }, Ar = () => {
    n({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: [...je()]
    });
  }, Ir = () => {
    n({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: []
    });
  }, Ga = (i) => {
    y((u) => u.includes(i) ? u : [...u, i]);
  }, ja = () => {
    y([]);
  }, qa = un(() => {
    ne((i) => !i);
  }, []), Ka = (i, u) => {
    Y((p) => wi(p, J, i, u));
  }, Za = () => {
    window.location.hash = xa({
      companySortMode: r,
      filterState: a,
      route: { kind: "timeline" },
      significanceDisplayLimit: s
    });
  }, Pt = (i) => {
    window.location.hash = xa({
      companySortMode: r,
      filterState: a,
      route: { kind: "model", slug: i },
      significanceDisplayLimit: s
    });
  }, sa = () => {
    F.kind === "model" && (Re.current = null, Za());
  }, Qa = (i, u) => {
    if (Ie.current) {
      Ie.current = !1;
      return;
    }
    ba(
      i,
      he,
      sa,
      u
    );
  }, Ja = {
    attributeStats: Xe,
    boardView: S,
    companySortMode: r,
    companyOptions: Fe,
    domainStats: De,
    filterState: a,
    isOpen: c,
    onAttributeToggle: Dr,
    onClearAll: Ir,
    onClearCompanyFilter: Sr,
    onCompanyToggle: Rr,
    onCompanySortModeChange: e,
    onContentTypeChange: Cr,
    onDomainToggle: Nr,
    onReset: kr,
    onSelectAll: Ar,
    onSignificanceDisplayLimitChange: l,
    onToggle: () => m((i) => !i),
    significanceDisplayLimit: s,
    totalMatchedCompanyCount: U.length,
    visibleCompanyCount: A.length
  }, la = (i, u) => {
    O.current = i, E.current = u, Xt(H.current, u, i), w(i), B(u);
  }, ca = (i, u) => {
    j.current = i, D.current = u, Xt(te.current, u, i), v(i), ee(u);
  }, en = (i) => {
    const u = P.current, p = u.lastFrameAt === null ? 1 / 60 : ie((i - u.lastFrameAt) / 1e3, 0, 0.064);
    u.lastFrameAt = i;
    const { target: T, zoomAnchor: X } = u, K = 1 - Math.exp(-u.stiffness * p), ue = mt(O.current, T.zoom, K), ge = X ? ut(
      X.worldX,
      X.worldY,
      X.viewportX,
      X.viewportY,
      ue
    ) : {
      x: mt(E.current.x, T.camera.x, K),
      y: mt(E.current.y, T.camera.y, K)
    };
    la(ue, ge);
    const ye = Math.hypot(T.camera.x - ge.x, T.camera.y - ge.y), we = Math.abs(T.zoom - ue);
    if (ye > hn || we > gn) {
      u.frameId = window.requestAnimationFrame(en);
      return;
    }
    u.frameId = null, u.lastFrameAt = null;
    const Ee = X ? ut(
      X.worldX,
      X.worldY,
      X.viewportX,
      X.viewportY,
      T.zoom
    ) : T.camera;
    u.zoomAnchor = null, la(T.zoom, Ee);
  }, tn = (i) => {
    const u = $.current, p = u.lastFrameAt === null ? 1 / 60 : ie((i - u.lastFrameAt) / 1e3, 0, 0.064);
    u.lastFrameAt = i;
    const { target: T, zoomAnchor: X } = u, K = 1 - Math.exp(-u.stiffness * p), ue = mt(j.current, T.zoom, K), ge = X ? ut(
      X.worldX,
      X.worldY,
      X.viewportX,
      X.viewportY,
      ue
    ) : {
      x: mt(D.current.x, T.camera.x, K),
      y: mt(D.current.y, T.camera.y, K)
    };
    ca(ue, ge);
    const ye = Math.hypot(T.camera.x - ge.x, T.camera.y - ge.y), we = Math.abs(T.zoom - ue);
    if (ye > hn || we > gn) {
      u.frameId = window.requestAnimationFrame(tn);
      return;
    }
    u.frameId = null, u.lastFrameAt = null;
    const Ee = X ? ut(
      X.worldX,
      X.worldY,
      X.viewportX,
      X.viewportY,
      T.zoom
    ) : T.camera;
    u.zoomAnchor = null, ca(T.zoom, Ee);
  }, da = (i, u) => {
    const p = P.current;
    p.target = i, p.stiffness = (u == null ? void 0 : u.stiffness) ?? dt, u ? p.zoomAnchor = u.zoomAnchor ?? null : p.zoomAnchor = null, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(en));
  }, ua = (i, u) => {
    const p = $.current;
    p.target = i, p.stiffness = (u == null ? void 0 : u.stiffness) ?? dt, u ? p.zoomAnchor = u.zoomAnchor ?? null : p.zoomAnchor = null, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(tn));
  }, Lr = un(
    (i) => {
      const u = !d, p = u ? L.mobile : L.desktop;
      if (p.width <= 0 || p.height <= 0)
        return;
      const T = u ? at : tt, X = u ? _t : Lt, K = Xi(
        i,
        de.processedCompanies,
        T,
        X,
        u,
        1
      );
      if (!K)
        return;
      const ue = Fi(p, u, Ue), ge = Ue && !u ? $i(p, ue) : er, ye = Ui({
        anchor: ge,
        bounds: K,
        focusMaxZoom: u ? qo : jo,
        insets: ue,
        layout: T,
        maxZoom: u ? pa : Ft,
        minZoom: u ? Rt : yt,
        viewport: p
      });
      if (!ye)
        return;
      const we = i.kind === "slug" ? { stiffness: Oo } : {};
      if (u) {
        ua(ye, we);
        return;
      }
      da(ye, we);
    },
    [
      tt,
      yt,
      Lt,
      Ue,
      d,
      at,
      Rt,
      _t,
      de.processedCompanies,
      L.desktop,
      L.mobile
    ]
  );
  Me(() => {
    if (!Ue || !he) {
      Ue || (Re.current = null);
      return;
    }
    if (!d) {
      Re.current = he;
      return;
    }
    !_ || M || se.current !== null || (d ? L.desktop : L.mobile).width <= 0 || Re.current !== he && Xa(de.processedCompanies, he) && (Lr({ kind: "slug", slug: he }), Re.current = he);
  }, [
    he,
    Ue,
    d,
    M,
    _,
    de.processedCompanies,
    L.desktop,
    L.mobile
  ]), Me(() => {
    const i = (u) => {
      const p = _i(u.key);
      if (!p || Pi(u) || !_)
        return;
      const T = !d, X = T ? L.mobile : L.desktop;
      if (X.width <= 0 || X.height <= 0)
        return;
      const K = T ? at : tt, ue = T ? ia : oa, ge = Ai(
        de.processedCompanies,
        K,
        T,
        ue
      );
      if (ge.length === 0)
        return;
      const ye = T ? D.current : E.current, we = T ? j.current : O.current, Ee = Ii(
        de.processedCompanies,
        K,
        T,
        ue,
        he,
        ye,
        we,
        X
      ), Et = Li(Ee, ge, p, {
        excludeSlug: he,
        minPrimaryDistance: he ? lr : 0
      });
      !Et || Et.slug === he || (u.preventDefault(), Re.current = null, Pt(Et.slug));
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [
    he,
    tt,
    d,
    _,
    at,
    ia,
    oa,
    de.processedCompanies,
    L.desktop,
    L.mobile
  ]);
  const _r = () => {
    const i = P.current;
    i.frameId !== null && (window.cancelAnimationFrame(i.frameId), i.frameId = null), i.lastFrameAt = null, i.target = {
      camera: E.current,
      zoom: O.current
    }, i.stiffness = dt, i.zoomAnchor = null;
  }, Pr = () => {
    const i = $.current;
    i.frameId !== null && (window.cancelAnimationFrame(i.frameId), i.frameId = null), i.lastFrameAt = null, i.target = {
      camera: D.current,
      zoom: j.current
    }, i.stiffness = dt, i.zoomAnchor = null;
  }, Fr = () => {
    const i = g.current;
    ce.current = ((i == null ? void 0 : i.clientWidth) ?? L.desktop.width) / 2, re.current = ((i == null ? void 0 : i.clientHeight) ?? L.desktop.height) / 2, da(Ut(tt));
  }, $r = () => {
    const i = R.current;
    be.current = ((i == null ? void 0 : i.clientWidth) ?? L.mobile.width) / 2, Te.current = ((i == null ? void 0 : i.clientHeight) ?? L.mobile.height) / 2, ua(Ut(at, !0));
  }, an = (i, u) => {
    const p = g.current, T = L.desktop, X = ie(
      (u == null ? void 0 : u.x) ?? ce.current ?? ((p == null ? void 0 : p.clientWidth) ?? T.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? T.width
    ), K = ie(
      (u == null ? void 0 : u.y) ?? re.current ?? ((p == null ? void 0 : p.clientHeight) ?? T.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? T.height
    ), ue = P.current, ge = O.current, ye = Number(ie(i(ge), yt, Ft).toFixed(3));
    if (ye === ge)
      return;
    const we = Nn({
      anchorX: X,
      anchorY: K,
      camera: E.current,
      existingAnchor: ue.zoomAnchor,
      zoom: ge
    }), Ee = ut(
      we.worldX,
      we.worldY,
      X,
      K,
      ye
    );
    da(
      {
        camera: Ee,
        zoom: ye
      },
      { zoomAnchor: we }
    );
  }, nn = (i, u) => {
    const p = R.current, T = L.mobile, X = ie(
      (u == null ? void 0 : u.x) ?? be.current ?? ((p == null ? void 0 : p.clientWidth) ?? T.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? T.width
    ), K = ie(
      (u == null ? void 0 : u.y) ?? Te.current ?? ((p == null ? void 0 : p.clientHeight) ?? T.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? T.height
    ), ue = $.current, ge = j.current, ye = Number(ie(i(ge), Rt, pa).toFixed(3));
    if (ye === ge)
      return;
    const we = Nn({
      anchorX: X,
      anchorY: K,
      camera: D.current,
      existingAnchor: ue.zoomAnchor,
      zoom: ge
    }), Ee = ut(
      we.worldX,
      we.worldY,
      X,
      K,
      ye
    );
    ua(
      {
        camera: Ee,
        zoom: ye
      },
      { zoomAnchor: we }
    );
  };
  z.current = (i) => {
    if (!g.current || i.deltaY === 0)
      return;
    i.cancelable && i.preventDefault();
    const u = g.current, p = u.getBoundingClientRect(), T = {
      x: ie(i.clientX - p.left, 0, u.clientWidth),
      y: ie(i.clientY - p.top, 0, u.clientHeight)
    };
    ce.current = T.x, re.current = T.y;
    const X = i.deltaMode === 1 ? i.deltaY * 16 : i.deltaMode === 2 ? i.deltaY * u.clientHeight : i.deltaY;
    an(
      (K) => Mt(K, -X * zo, yt, Ft),
      T
    );
  }, Me(() => {
    if (!_ || !d)
      return;
    const i = g.current;
    if (!i)
      return;
    const u = (p) => z.current(p);
    return i.addEventListener("wheel", u, { passive: !1 }), () => {
      i.removeEventListener("wheel", u);
    };
  }, [d, _]);
  const Ur = (i) => {
    var X;
    if (i.pointerType !== "mouse" || i.button !== 0 || !g.current)
      return;
    const u = g.current, p = u.getBoundingClientRect();
    ce.current = i.clientX - p.left, re.current = i.clientY - p.top, _r(), Ie.current = !1, se.current = i.pointerId, pe.current = {
      lastX: i.clientX,
      lastY: i.clientY,
      startX: i.clientX,
      startY: i.clientY
    }, u.setPointerCapture(i.pointerId), (X = fe.current) == null || X.call(fe);
    const T = (K) => z.current(K);
    window.addEventListener("wheel", T, { capture: !0, passive: !1 }), fe.current = () => {
      window.removeEventListener("wheel", T, !0);
    }, Fn(() => k(!0)), i.preventDefault();
  }, rn = () => {
    if (Le.current = null, !g.current)
      return;
    const i = Qe.current;
    if (!i || se.current === null)
      return;
    const p = g.current.getBoundingClientRect(), T = i.clientX - p.left;
    ce.current = T, re.current = i.clientY - p.top;
    const X = i.clientX - pe.current.lastX, K = i.clientY - pe.current.lastY, ue = {
      x: E.current.x - X / Math.max(O.current, 1e-3),
      y: E.current.y - K / Math.max(O.current, 1e-3)
    };
    P.current.target = {
      camera: ue,
      zoom: O.current
    }, E.current = ue, Xt(H.current, ue, O.current), pe.current.lastX = i.clientX, pe.current.lastY = i.clientY;
  }, Xr = (i) => {
    if (i.pointerType === "mouse" && g.current) {
      const u = g.current.getBoundingClientRect();
      ce.current = ie(
        i.clientX - u.left,
        0,
        g.current.clientWidth
      ), re.current = ie(
        i.clientY - u.top,
        0,
        g.current.clientHeight
      );
    }
    i.pointerId === se.current && (Qe.current = {
      clientX: i.clientX,
      clientY: i.clientY
    }, Le.current === null && (Le.current = window.requestAnimationFrame(rn)), i.preventDefault());
  }, Yr = (i) => {
    var p;
    if (i.pointerId !== se.current || !g.current)
      return;
    Le.current !== null && (window.cancelAnimationFrame(Le.current), Le.current = null, rn()), g.current.hasPointerCapture(i.pointerId) && g.current.releasePointerCapture(i.pointerId), se.current = null, Qe.current = null, (p = fe.current) == null || p.call(fe), fe.current = null, Math.hypot(
      i.clientX - pe.current.startX,
      i.clientY - pe.current.startY
    ) > yn ? Ie.current = !0 : ba(
      i.target,
      he,
      sa,
      { clientX: i.clientX, clientY: i.clientY }
    ), B(E.current), k(!1);
  }, on = (i, u) => Math.hypot(u.clientX - i.clientX, u.clientY - i.clientY), sn = (i, u) => ({
    clientX: (i.clientX + u.clientX) / 2,
    clientY: (i.clientY + u.clientY) / 2
  }), ln = (i, u) => {
    const p = u.getBoundingClientRect();
    be.current = ie(i.clientX - p.left, 0, u.clientWidth), Te.current = ie(i.clientY - p.top, 0, u.clientHeight);
  }, cn = (i, u) => {
    const p = {
      x: D.current.x - i / Math.max(j.current, 1e-3),
      y: D.current.y - u / Math.max(j.current, 1e-3)
    };
    $.current.target = {
      camera: p,
      zoom: j.current
    }, D.current = p, Xt(te.current, p, j.current);
  }, dn = (i) => i instanceof Element && !i.closest("[data-timeline-pin]") && !!i.closest("button, a, input, label, select, textarea, [data-row-focus-label]"), ct = (i) => ({
    clientX: i.clientX,
    clientY: i.clientY
  }), Tt = (i) => {
    if (i.length === 0) {
      _e.current = null, be.current = null, Te.current = null;
      return;
    }
    if (i.length === 1) {
      const X = ct(i[0]);
      _e.current = {
        distance: 0,
        lastMidpointX: X.clientX,
        lastMidpointY: X.clientY,
        lastX: X.clientX,
        lastY: X.clientY,
        startX: X.clientX,
        startY: X.clientY,
        type: "pan"
      };
      return;
    }
    const u = ct(i[0]), p = ct(i[1]), T = sn(u, p);
    _e.current = {
      distance: Math.max(on(u, p), 1),
      lastMidpointX: T.clientX,
      lastMidpointY: T.clientY,
      lastX: T.clientX,
      lastY: T.clientY,
      startX: T.clientX,
      startY: T.clientY,
      type: "pinch"
    };
  }, zr = (i) => {
    !R.current || dn(i.target) || (Pr(), Tt(i.touches));
  }, Br = (i) => {
    if (!R.current || dn(i.target))
      return;
    const u = R.current, p = _e.current;
    if (!p) {
      Tt(i.touches);
      return;
    }
    if (i.touches.length === 1) {
      const Ee = ct(i.touches[0]);
      if (ln(Ee, u), p.type === "pan") {
        const Et = Ee.clientX - p.lastX, Wr = Ee.clientY - p.lastY;
        cn(Et, Wr), p.lastX = Ee.clientX, p.lastY = Ee.clientY;
      } else
        Tt(i.touches);
      i.preventDefault();
      return;
    }
    if (i.touches.length < 2)
      return;
    const T = ct(i.touches[0]), X = ct(i.touches[1]), K = sn(T, X), ue = Math.max(on(T, X), 1);
    if (ln(K, u), p.type !== "pinch") {
      Tt(i.touches), i.preventDefault();
      return;
    }
    const ge = K.clientX - p.lastMidpointX, ye = K.clientY - p.lastMidpointY;
    cn(ge, ye);
    const we = ie(ue / Math.max(p.distance, 1), 0.78, 1.28);
    nn((Ee) => Ee * we, {
      x: be.current ?? u.clientWidth / 2,
      y: Te.current ?? u.clientHeight / 2
    }), p.distance = ue, p.lastMidpointX = K.clientX, p.lastMidpointY = K.clientY, p.lastX = K.clientX, p.lastY = K.clientY, i.preventDefault();
  }, Or = (i) => {
    const u = _e.current;
    if (Tt(i.touches), ee(D.current), !u || u.type !== "pan" || i.changedTouches.length === 0)
      return;
    const p = i.changedTouches[0];
    Math.hypot(p.clientX - u.startX, p.clientY - u.startY) > yn || ba(
      p.target,
      he,
      sa,
      { clientX: p.clientX, clientY: p.clientY }
    );
  };
  return Ye().length === 0 ? /* @__PURE__ */ o(
    Pn,
    {
      title: lt.emptyDataTitle,
      detail: lt.emptyDataDetail
    }
  ) : de.invalidEntries.length > 0 ? /* @__PURE__ */ o(
    Pn,
    {
      title: lt.timelineStatusDataErrorTitle,
      detail: lt.timelineStatusDataErrorDetail(de.invalidEntries)
    }
  ) : _ ? /* @__PURE__ */ h("div", { className: "relative isolate min-h-[100dvh] overflow-hidden bg-[var(--page-bg)] text-[var(--ink)] selection:bg-emerald-500/25 selection:text-[var(--ink)]", children: [
    /* @__PURE__ */ o(ys, {}),
    /* @__PURE__ */ h("div", { className: "relative z-10", children: [
      d ? null : /* @__PURE__ */ o("div", { className: "md:hidden", children: /* @__PURE__ */ o(
        Es,
        {
          activeArticleSlug: he,
          boardView: S,
          camera: G,
          currentGlobalDay: Se,
          handleTouchEnd: Or,
          handleTouchMove: Br,
          handleTouchStart: zr,
          handleZoomChange: nn,
          hiddenCompanyCount: Pe,
          latestCompany: Ha,
          minZoom: Rt,
          maxZoom: pa,
          maxDays: At,
          maxSummaryQuietDays: Va,
          modelExplorer: /* @__PURE__ */ o(Cn, { ...Ja, variant: "rail" }),
          monthTicks: Er,
          onCompanyHide: Ga,
          onCompanyMove: Ka,
          onDismissArticle: Qa,
          onModelSelect: Pt,
          onResetCamera: $r,
          onShowHiddenCompanies: ja,
          onToggleTimelineGrid: qa,
          processedCompanies: de.processedCompanies,
          renderWindow: yr,
          scrollContainerRef: R,
          showTimelineGrid: Q,
          timelineStartDay: It,
          timelineWidth: ra,
          viewport: L.mobile,
          worldRef: te,
          yearTicks: Mr,
          zoom: b
        }
      ) }),
      d ? /* @__PURE__ */ o("div", { className: "hidden md:block", children: /* @__PURE__ */ o(
        Ts,
        {
          activeArticleSlug: he,
          boardView: S,
          camera: C,
          currentGlobalDay: Se,
          handlePointerDown: Ur,
          handlePointerMove: Xr,
          handleZoomChange: an,
          hiddenCompanyCount: Pe,
          isPanning: M,
          latestCompany: Ha,
          maxDays: St,
          minZoom: yt,
          maxZoom: Ft,
          maxSummaryQuietDays: Va,
          modelExplorer: /* @__PURE__ */ o(Cn, { ...Ja, variant: "rail" }),
          monthTicks: wr,
          onCompanyHide: Ga,
          onCompanyMove: Ka,
          onDismissArticle: Qa,
          onModelSelect: Pt,
          onResetCamera: Fr,
          onShowHiddenCompanies: ja,
          onToggleTimelineGrid: qa,
          processedCompanies: de.processedCompanies,
          renderWindow: br,
          scrollContainerRef: g,
          showTimelineGrid: Q,
          stopPanning: Yr,
          summaryCompanies: wt,
          timelineStartDay: kt,
          timelineWidth: na,
          viewport: L.desktop,
          worldRef: H,
          yearTicks: Tr,
          zoom: x
        }
      ) }) : null
    ] }),
    /* @__PURE__ */ o(Ge, { children: Ue ? /* @__PURE__ */ o(
      ds,
      {
        entry: Ne,
        onBack: Za,
        onNavigate: Pt,
        requestedSlug: he ?? ""
      }
    ) : null })
  ] }) : /* @__PURE__ */ o(ws, {});
}
export {
  lo as DAY_MS,
  As as TimelineExperience,
  ks as buildTimelineArticleIndex,
  co as createTimelineItemSlug,
  ke as formatTimelineDate,
  Bn as formatTimelineDateRange,
  On as getTimelineItemSlug,
  Ss as indexTimelineArticles,
  Ae as parseTimelineDate
};
