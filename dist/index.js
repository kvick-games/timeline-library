import { jsx as i, jsxs as g, Fragment as st } from "react/jsx-runtime";
import _t, { useState as xe, useRef as ee, useMemo as Me, useEffect as Ne, useCallback as En, useImperativeHandle as yi, useLayoutEffect as ir } from "react";
import { flushSync as or } from "react-dom";
import { EyeOff as lr, Eye as sr, RotateCcw as ca, Layers3 as ct, ArrowLeft as wi, CalendarDays as da, BookOpen as cr, ExternalLink as Ti, ArrowUp as Ei, ArrowDown as Mi, X as dr, SlidersHorizontal as Ni, ChevronDown as Di, ArrowRight as Ci, Sparkles as Ri, Check as Ai, BrainCircuit as Si, Globe2 as Ii, Image as ki, Clapperboard as ur, AudioLines as Li, Box as _i, Code2 as Pi, Bot as Fi, CarFront as $i } from "lucide-react";
import { AnimatePresence as je, motion as be, useDragControls as Ui, useMotionValue as Xi, animate as Mn } from "motion/react";
const mr = 1e3 * 60 * 60 * 24;
function Yi(t, a, n, r) {
  const e = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${e(t)}-${e(a)}-${e(n)}-${r}`;
}
function _e(t) {
  return /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
}
const Nn = /* @__PURE__ */ new Map();
function Ma(t, a) {
  const n = JSON.stringify(a);
  let r = Nn.get(n);
  return r || (r = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...a }), Nn.set(n, r)), r.format(t);
}
function Le(t, a = { month: "short", day: "numeric", year: "numeric" }, n = "day") {
  const r = typeof t == "string" ? _e(t) : t;
  return Number.isNaN(r.getTime()) ? typeof t == "string" ? t : "Date unavailable" : n === "year" ? Ma(r, { year: "numeric" }) : n === "month" ? Ma(r, { month: "short", year: "numeric" }) : Ma(r, a);
}
function fr(t, a, n = "day", r = "day") {
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
function zi(t, a = /* @__PURE__ */ new Date()) {
  const n = _e(t);
  if (Number.isNaN(n.getTime()))
    return null;
  const r = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()), e = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  return Math.round((e - r) / mr);
}
function Bi(t, a = /* @__PURE__ */ new Date()) {
  const n = zi(t, a);
  return n === null ? null : n === 0 ? "Today" : n === 1 ? "1 day ago" : n === -1 ? "Tomorrow" : n > 1 ? `${n.toLocaleString("en-US")} days ago` : `in ${Math.abs(n).toLocaleString("en-US")} days`;
}
function Oi(t, {
  date: a,
  eventKind: n,
  now: r
}) {
  const e = Bi(a, r);
  if (!e)
    return t;
  const s = n === "event" ? "Time since event" : "Time since release", c = { label: s, value: e }, d = t.findIndex((u) => u.label === s);
  if (d >= 0)
    return t.map((u, h) => h === d ? c : u);
  const f = n === "event" ? "Event date" : "Release date", m = t.findIndex((u) => u.label === f);
  return m === -1 ? [...t, c] : [...t.slice(0, m + 1), c, ...t.slice(m + 1)];
}
function pr(t, a, n) {
  return n.articleSlug ?? Yi(t, a, n.name, n.date);
}
function Ts(t) {
  return t.reduce((a, n) => (a[n.slug] = n, a), {});
}
function Es({
  articlesBySlug: t,
  eventTypesById: a,
  fallbackEventTypeId: n,
  groups: r
}) {
  const e = [];
  return r.forEach((s) => {
    s.productLines.forEach((c) => {
      const d = [...c.releases].sort(
        (m, u) => _e(m.date).getTime() - _e(u.date).getTime()
      ), f = d.map((m) => pr(s.id, c.id, m));
      d.forEach((m, u) => {
        var I, M;
        const h = f[u], b = a[m.eventType ?? n] ?? a[n], x = _e(m.date), v = m.endDate ? _e(m.endDate) : x, T = Number.isNaN(x.getTime()) || Number.isNaN(v.getTime()) ? 1 : Math.max(1, Math.round((v.getTime() - x.getTime()) / mr) + 1);
        e.push({
          accent: s.accent,
          article: t[h] ?? null,
          classes: m.classes ?? c.defaultClasses ?? s.defaultClasses ?? [c.classId],
          companyLogoMark: s.logoMark ?? "generic",
          companyId: s.id,
          companyName: s.name,
          date: m.date,
          dateLabel: Le(m.date, void 0, m.datePrecision),
          dateRangeLabel: fr(m.date, m.endDate, m.datePrecision),
          durationDays: T,
          endDate: m.endDate,
          endDateLabel: m.endDate ? Le(m.endDate) : void 0,
          eventKind: b.kind,
          eventType: b.id,
          eventTypeLabel: b.label,
          eventTypeShortLabel: b.shortLabel,
          name: m.name,
          nextName: ((I = d[u + 1]) == null ? void 0 : I.name) ?? null,
          nextSlug: f[u + 1] ?? null,
          presets: m.presets ?? c.defaultPresets ?? s.defaultPresets,
          tags: m.tags ?? c.defaultTags ?? [],
          previousName: ((M = d[u - 1]) == null ? void 0 : M.name) ?? null,
          previousSlug: f[u - 1] ?? null,
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
function Wi(t) {
  Xa = t;
}
function he() {
  if (!Xa)
    throw new Error("TimelineExperience requires a timeline definition before rendering.");
  return Xa;
}
function Be() {
  return he().groups;
}
function Hi() {
  return he().facets;
}
function hr() {
  return he().filterGroups;
}
function qe() {
  return hr().flatMap((t) => t.domainIds);
}
function it() {
  return he().attributeFilterIds;
}
function Vi() {
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
function gr() {
  return he().displayLimits;
}
function fa() {
  return he().defaultDisplayLimit;
}
function Gi() {
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
function He(t, a) {
  const n = new Set(t);
  return a.filter((r) => n.has(r));
}
function Et() {
  return Vi();
}
function We(t) {
  const a = Be().map((n) => n.id);
  return {
    attributeIds: He(t.attributeIds, it()),
    companyIds: He(t.companyIds, a),
    contentType: ua().some((n) => n.id === t.contentType) ? t.contentType : "all",
    domainIds: He(t.domainIds, qe())
  };
}
function vr(t, a) {
  return t.contentType === a.contentType && ta(t.attributeIds, a.attributeIds) && ta(t.companyIds, a.companyIds) && ta(t.domainIds, a.domainIds);
}
function aa(t) {
  return Hi().find((a) => a.id === t);
}
function Dn(t) {
  var a;
  return ((a = aa(t)) == null ? void 0 : a.label) ?? t;
}
function ji(t) {
  return new Set(qe()).has(t);
}
function qi(t) {
  return He(t.filter(ji), qe());
}
function Na(t) {
  return t.join(",");
}
function Da(t, a) {
  if (!t)
    return [];
  const n = t.split(",").map((r) => r.trim()).filter(Boolean);
  return He(n, a);
}
function Cn(t) {
  return t.productLines.reduce((a, n) => {
    const r = n.releases.reduce((e, s) => {
      const c = _e(s.date).getTime();
      return Number.isNaN(c) ? e : Math.max(e, c);
    }, 0);
    return Math.max(a, r);
  }, 0);
}
function Ki(t) {
  var a, n;
  return ((n = (a = he().scoring) == null ? void 0 : a.getFacetSignificanceBase) == null ? void 0 : n.call(a, t)) ?? 50;
}
function Zi(t) {
  var a, n;
  return ((n = (a = he().scoring) == null ? void 0 : a.getEventTypeSignificanceBonus) == null ? void 0 : n.call(a, t)) ?? 0;
}
function Qi(t, a) {
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
function xr(t, a, n, r) {
  var v, T, I, M;
  const e = _e(n.date), s = n.endDate ? _e(n.endDate) : e, c = Number.isNaN(s.getTime()) ? 0 : Math.round((s.getTime() - ot().getTime()) / lt), d = Wa(t, a, n), f = kr(t, a, n), m = Ha(n), u = d.reduce(
    (j, V) => Math.max(j, Ki(V)),
    40
  ), h = ((T = (v = he().scoring) == null ? void 0 : v.getTagSignificanceBonus) == null ? void 0 : T.call(v, f)) ?? 0, b = ((M = (I = he().scoring) == null ? void 0 : I.getGroupRankBonus) == null ? void 0 : M.call(I, t)) ?? 0, x = u + h + b + Zi(m.id) + Qi(c, r);
  return oe(Math.round(x), 1, 100);
}
function Ji(t, a, n) {
  return a.releases.reduce(
    (r, e) => Math.max(r, xr(t, a, e, n)),
    0
  );
}
function Rn(t, a) {
  return t.productLines.reduce(
    (n, r) => Math.max(n, Ji(t, r, a)),
    0
  );
}
function eo(t, a, n) {
  const r = [...t];
  return a === "significance" ? (r.sort(
    (e, s) => Rn(s, n) - Rn(e, n) || (e.raceRank ?? 999) - (s.raceRank ?? 999) || e.name.localeCompare(s.name)
  ), r) : a === "latest" ? (r.sort(
    (e, s) => Cn(s) - Cn(e) || e.name.localeCompare(s.name)
  ), r) : (r.sort((e, s) => e.name.localeCompare(s.name)), r);
}
const lt = 1e3 * 60 * 60 * 24, Se = 2.24, Ba = [0.22, 1, 0.36, 1], Ue = { duration: 0.34, ease: Ba }, br = { duration: 0.24, ease: Ba }, to = { duration: 0.4, ease: Ba }, bt = 320, yt = 196, ao = "#05070b", no = 72, ro = 80, io = 56, oo = 60, lo = 8, so = 44, co = 32, uo = 96, mo = 56, fo = 80, po = 40, St = 1, It = 1.05, Rt = 4, Zt = 3.4, ho = 420, go = 360, yr = 180, vo = 300, xo = 180, bo = 260, wr = 112, yo = 380, Ca = 0.06, wt = 6, Tr = 0.92, wo = 25e-5, To = 0.025, rt = 18, Eo = 8, An = 0.08, Sn = 6e-4, Mo = 720, No = 720, In = 540, Do = 120, kn = 90, Ln = 180, Ra = 420, Aa = 168, xt = 64, Co = 0.88, Ro = 1.65, Ao = 1.45, _n = 6, So = {
  bottom: 48,
  left: 24,
  right: 24,
  top: 72
}, Er = 760, Mr = 0.58, Io = 0.58, Nr = { x: 0.5, y: 0.46 }, ko = 0.46, Pn = 500, Fn = { type: "spring", stiffness: 420, damping: 42, mass: 0.9 };
function Dr(t) {
  return Math.round(t * ko);
}
function Cr(t) {
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
function Rr(t) {
  const { path: a } = pa(t);
  if (!a)
    return { kind: "timeline" };
  const r = (he().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), e = a.match(new RegExp(`^(?:${r}|events)/([^/?#]+)$`));
  return e ? { kind: "model", slug: decodeURIComponent(e[1]) } : { kind: "timeline" };
}
function Ar(t) {
  const { params: a } = pa(t), n = a.get("ct"), r = Et();
  return We({
    attributeIds: Da(a.get("a"), it()),
    companyIds: Da(a.get("co"), Be().map((e) => e.id)),
    contentType: ua().some((e) => e.id === n) ? n : "all",
    domainIds: a.has("d") ? Da(a.get("d"), qe()) : r.domainIds
  });
}
function Sr(t) {
  const a = pa(t).params.get("sort");
  return a && he().sortOptions.some((n) => n.id === a) ? a : ma();
}
function Ir(t) {
  const a = pa(t).params.get("rows");
  if (a === "all")
    return "all";
  const n = Number.parseInt(a ?? "", 10);
  return gr().includes(n) ? n : fa();
}
function Sa({
  companySortMode: t,
  filterState: a,
  route: n,
  significanceDisplayLimit: r
}) {
  const e = We(a), s = Et(), c = new URLSearchParams();
  ta(e.domainIds, s.domainIds) || c.set("d", Na(e.domainIds)), e.attributeIds.length > 0 && c.set("a", Na(e.attributeIds)), e.contentType !== s.contentType && c.set("ct", e.contentType), e.companyIds.length > 0 && c.set("co", Na(e.companyIds)), t !== ma() && c.set("sort", t), r !== fa() && c.set("rows", String(r));
  const d = he().routeItemPathPrefix.replace(/^\/+|\/+$/g, "") || "items", f = n.kind === "model" ? `/${d}/${encodeURIComponent(n.slug)}` : "/", m = c.toString().replaceAll("%2C", ",");
  return `#${f}${m ? `?${m}` : ""}`;
}
function Lo() {
  return typeof window > "u" ? { kind: "timeline" } : Rr(window.location.hash);
}
function _o() {
  return typeof window > "u" ? Et() : Ar(window.location.hash);
}
function Po() {
  return typeof window > "u" ? ma() : Sr(window.location.hash);
}
function Fo() {
  return typeof window > "u" ? fa() : Ir(window.location.hash);
}
function $o(t) {
  return !(t instanceof Element) || t.closest(
    "button, a, input, label, select, textarea, [data-row-focus-label], [data-timeline-pin]"
  ) ? !1 : !!t.closest("[data-timeline-field]");
}
function Uo(t, a) {
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
  const e = Uo(t, r);
  $o(e) && n();
}
function Xo(t, a) {
  return Le(t, a);
}
function ka(t, a, n) {
  const r = t.replace("#", ""), e = r.length === 3 ? r.split("").map((u) => `${u}${u}`).join("") : r, s = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e))
    return t;
  const c = Number.parseInt(e.slice(0, 2), 16), d = Number.parseInt(e.slice(2, 4), 16), f = Number.parseInt(e.slice(4, 6), 16), m = (u) => Math.round(u + (a - u) * s);
  return `rgb(${m(c)} ${m(d)} ${m(f)})`;
}
function Yo(t, a, n) {
  const r = (b) => {
    const x = b.replace("#", "");
    return x.length === 3 ? x.split("").map((v) => `${v}${v}`).join("") : x;
  }, e = r(t), s = r(a), c = Math.max(0, Math.min(1, n));
  if (!/^[0-9a-fA-F]{6}$/.test(e) || !/^[0-9a-fA-F]{6}$/.test(s))
    return t;
  const d = [e.slice(0, 2), e.slice(2, 4), e.slice(4, 6)].map(
    (b) => Number.parseInt(b, 16)
  ), f = [s.slice(0, 2), s.slice(2, 4), s.slice(4, 6)].map(
    (b) => Number.parseInt(b, 16)
  ), [m, u, h] = d.map(
    (b, x) => Math.round(b + (f[x] - b) * c)
  );
  return `rgb(${m} ${u} ${h})`;
}
function Ve(t, a) {
  const n = t.replace("#", ""), r = n.length === 3 ? n.split("").map((d) => `${d}${d}`).join("") : n;
  if (!/^[0-9a-fA-F]{6}$/.test(r))
    return `rgba(255, 255, 255, ${a})`;
  const e = Number.parseInt(r.slice(0, 2), 16), s = Number.parseInt(r.slice(2, 4), 16), c = Number.parseInt(r.slice(4, 6), 16);
  return `rgba(${e}, ${s}, ${c}, ${a})`;
}
function zo(t, a) {
  return a.defaultClasses ?? t.defaultClasses ?? [a.classId];
}
function Bo(t, a) {
  return a.defaultPresets ?? t.defaultPresets;
}
function Oo(t, a, n) {
  return n.classes ?? zo(t, a);
}
function Wa(t, a, n) {
  return n.presets ?? Bo(t, a);
}
function Wo(t) {
  return t.defaultTags ?? [];
}
function kr(t, a, n) {
  return n.tags ?? Wo(a);
}
function Ha(t) {
  const a = Gi(), n = he().defaultEventTypeId;
  return a[t.eventType ?? n] ?? a[n];
}
function Ho(t) {
  var f;
  const a = We(t), n = qe().filter((m) => a.domainIds.includes(m)), r = vr(a, Et()), e = at();
  if (n.length === 0)
    return {
      description: e.emptyBoardDetail,
      isComposite: !0,
      isDefault: !1,
      isEmpty: !0,
      label: e.emptyBoardLabel
    };
  if (r) {
    const m = a.domainIds[0], u = m ? aa(m) : null;
    return {
      description: (u == null ? void 0 : u.description) ?? e.defaultBoardDescription,
      isComposite: !1,
      isDefault: !0,
      isEmpty: !1,
      label: (u == null ? void 0 : u.label) ?? n.join(", ")
    };
  }
  const c = [n.length === qe().length ? "All domains" : n.length === 1 ? Dn(n[0]) : `${n.length} domains`];
  a.attributeIds.forEach((m) => {
    c.push(Dn(m));
  });
  const d = Et().contentType;
  return a.contentType !== d && c.push(
    ((f = ua().find((m) => m.id === a.contentType)) == null ? void 0 : f.label) ?? a.contentType
  ), a.companyIds.length > 0 && c.push(`${a.companyIds.length} ${e.groupPluralLabel}`), {
    description: c.join(", "),
    isComposite: c.length > 1 || n.length > 1,
    isDefault: !1,
    isEmpty: !1,
    label: c.join(" · ")
  };
}
function Vo(t, a) {
  if (a === "all")
    return !0;
  const n = Ha(t), r = n.kind === "event" || n.id === "product-launch";
  return a === "events" ? r : !r;
}
function Go(t, a, n, r) {
  const e = Wa(t, a, n), s = r.domainIds.some((d) => e.includes(d)), c = r.attributeIds.length === 0 || r.attributeIds.some((d) => e.includes(d));
  return s && c && Vo(n, r.contentType);
}
function ha(t, a, n = {}) {
  const r = We(a), e = new Set(r.companyIds);
  return r.domainIds.length === 0 ? [] : t.filter((s) => n.ignoreCompanyFilter || e.size === 0 || e.has(s.id)).map((s) => ({
    ...s,
    productLines: s.productLines.map((c) => ({
      ...c,
      releases: c.releases.filter(
        (d) => Go(s, c, d, r)
      )
    })).filter((c) => c.releases.length > 0)
  })).filter((s) => s.productLines.length > 0);
}
function Lr(t) {
  return {
    providerCount: t.length,
    releaseCount: t.reduce(
      (a, n) => a + n.productLines.reduce((r, e) => r + e.releases.length, 0),
      0
    )
  };
}
function jo(t, a) {
  return qe().reduce((n, r) => (n[r] = Lr(
    ha(t, { ...a, companyIds: [], domainIds: [r] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function qo(t, a) {
  return it().reduce((n, r) => (n[r] = Lr(
    ha(t, { ...a, attributeIds: [r], companyIds: [] }, { ignoreCompanyFilter: !0 })
  ), n), {});
}
function Ko(t, a) {
  return ha(t, { ...a, companyIds: [] }, { ignoreCompanyFilter: !0 }).map((n) => ({
    id: n.id,
    name: n.name,
    releaseCount: n.productLines.reduce((r, e) => r + e.releases.length, 0)
  }));
}
function Zo(t) {
  const a = t.productLines.find((n) => n.classId !== "events") ?? t.productLines[0];
  return (a == null ? void 0 : a.classId) ?? t.defaultClasses[0] ?? he().defaultClassId;
}
function Qo(t, a, n) {
  const r = [...t], [e] = r.splice(a, 1);
  return e === void 0 ? t : (r.splice(n, 0, e), r);
}
function ga(t) {
  const a = new Set(Be().map((s) => s.id)), n = t.filter((s) => a.has(s)), r = new Set(n), e = Be().map((s) => s.id).filter((s) => !r.has(s));
  return [...n, ...e];
}
function Jo(t, a, n, r, e) {
  const s = new Map(t.map((u) => [u.id, u])), c = new Set(n), d = ga(a).map((u) => s.get(u)).filter((u) => !!u), f = new Set(d.map((u) => u.id)), m = t.filter((u) => !f.has(u.id));
  return eo(
    [...d, ...m].filter((u) => !c.has(u.id)),
    r,
    e
  );
}
function el(t, a, n) {
  if (a === "all")
    return t;
  const r = t.slice(0, a);
  if (!n || r.some((s) => s.id === n))
    return r;
  const e = t.find((s) => s.id === n);
  return e ? [...r, e] : r;
}
function tl(t, a, n, r) {
  if (n === r)
    return t;
  const e = new Set(a), s = ga(t), c = s.filter((h) => e.has(h)), d = c.indexOf(n), f = c.indexOf(r);
  if (d < 0 || f < 0)
    return s;
  const m = Qo(c, d, f);
  let u = 0;
  return s.map((h) => {
    if (!e.has(h))
      return h;
    const b = m[u];
    return u += 1, b ?? h;
  });
}
function al(t, a, n, r) {
  const e = new Set(a), s = ga(t).filter(
    (f) => e.has(f)
  ), c = s.indexOf(n), d = r === "up" ? c - 1 : c + 1;
  return c < 0 || d < 0 || d >= s.length ? t : tl(t, a, n, s[d]);
}
function nl(t, a) {
  const n = [], r = t.map((c) => {
    const d = c.productLines.map((v) => {
      const I = v.releases.map((W) => ({
        ...W,
        classes: Oo(c, v, W),
        presets: Wa(c, v, W),
        tags: kr(c, v, W)
      })).sort((W, k) => {
        const Z = _e(W.date).getTime(), H = _e(k.date).getTime();
        return Z - H || W.name.localeCompare(k.name);
      }).reduce((W, k) => {
        const Z = _e(k.date), H = k.endDate ? _e(k.endDate) : Z;
        if (Number.isNaN(Z.getTime()))
          return n.push(`${c.name} / ${v.label}: ${k.name}`), W;
        if (k.endDate && Number.isNaN(H.getTime()))
          return n.push(`${c.name} / ${v.label}: ${k.name} end date`), W;
        const E = W[W.length - 1], q = Math.round((Z.getTime() - ot().getTime()) / lt), z = Number.isNaN(H.getTime()) ? q : Math.max(q, Math.round((H.getTime() - ot().getTime()) / lt)), _ = E ? q - E.globalDay : 0, de = Ha(k), Q = xr(c, v, k, a);
        return W.push({
          ...k,
          articleSlug: pr(c.id, v.id, k),
          dateLabel: Le(Z, void 0, k.datePrecision),
          dateRangeLabel: fr(k.date, k.endDate, k.datePrecision),
          durationDays: z - q + 1,
          endDateLabel: k.endDate ? Le(k.endDate) : void 0,
          endGlobalDay: z,
          eventKind: de.kind,
          eventType: de.id,
          eventTypeLabel: de.label,
          eventTypeShortLabel: de.shortLabel,
          globalDay: q,
          gap: _,
          significanceScore: Q
        }), W;
      }, []), M = I[I.length - 1] ?? null, j = I.reduce((W, k) => W + k.gap, 0), V = I.length > 1 ? Math.round(j / (I.length - 1)) : null, ie = I[0], K = I.reduce(
        (W, k) => Math.max(W, k.significanceScore),
        0
      );
      return {
        ...v,
        averageGap: V,
        latestRelease: M,
        releases: I,
        significanceScore: K,
        startDay: (ie == null ? void 0 : ie.globalDay) ?? 0,
        totalSpan: M && ie ? M.endGlobalDay - ie.globalDay : 0
      };
    }).sort(
      (v, T) => {
        var I, M;
        return T.significanceScore - v.significanceScore || (((I = T.latestRelease) == null ? void 0 : I.globalDay) ?? 0) - (((M = v.latestRelease) == null ? void 0 : M.globalDay) ?? 0) || v.label.localeCompare(T.label);
      }
    ), f = [...d].filter((v) => v.latestRelease).sort((v, T) => {
      var I, M;
      return (((I = T.latestRelease) == null ? void 0 : I.endGlobalDay) ?? 0) - (((M = v.latestRelease) == null ? void 0 : M.endGlobalDay) ?? 0);
    })[0] ?? null, m = (f == null ? void 0 : f.latestRelease) ?? null, u = [...d].flatMap((v) => v.releases).sort((v, T) => v.globalDay - T.globalDay)[0] ?? null, h = d.reduce(
      (v, T) => v + T.releases.reduce((I, M) => I + M.gap, 0),
      0
    ), b = d.reduce(
      (v, T) => v + Math.max(T.releases.length - 1, 0),
      0
    ), x = d.reduce(
      (v, T) => Math.max(v, T.significanceScore),
      0
    );
    return {
      ...c,
      averageGap: b > 0 ? Math.round(h / b) : null,
      latestProductLine: f,
      latestRelease: m,
      productLines: d,
      significanceScore: x,
      startDay: (u == null ? void 0 : u.globalDay) ?? 0,
      totalSpan: m && u ? m.endGlobalDay - u.globalDay : 0
    };
  }), e = r.reduce((c, d) => {
    var m;
    const f = ((m = d.latestRelease) == null ? void 0 : m.endGlobalDay) ?? 0;
    return Math.max(c, f);
  }, 0), s = r.reduce(
    (c, d) => c + d.productLines.reduce((f, m) => f + m.releases.length, 0),
    0
  );
  return {
    invalidEntries: n,
    latestGlobalDay: e,
    processedCompanies: r,
    totalReleases: s
  };
}
function $n({ endDay: t, startDay: a }) {
  const n = [], r = [], e = Math.floor(a), s = Math.max(e, Math.ceil(t)), c = new Date(ot().getTime() + e * lt), d = new Date(ot().getTime() + s * lt), f = new Date(Date.UTC(c.getUTCFullYear(), c.getUTCMonth(), 1));
  for (f.getTime() < c.getTime() && f.setUTCMonth(f.getUTCMonth() + 1); f <= d; ) {
    const m = Math.round((f.getTime() - ot().getTime()) / lt);
    f.getUTCMonth() === 0 ? r.push({ days: m, label: f.getUTCFullYear() }) : n.push({
      days: m,
      label: Xo(f, { month: "short" })
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
  zoom: s
}) {
  if (e.width <= 0)
    return { endDay: 0, startDay: 0 };
  const c = a ? yt : bt, d = a ? wr : yr, f = Math.max(s, 1e-3), m = t.x, u = t.x + e.width / f, h = (m - d - c) / Se, b = (u - d - c) / Se, x = Math.floor(h - r);
  return { endDay: Math.max(x + 30, Math.ceil(b + n)), startDay: x };
}
function ra(t, a = Do) {
  const n = Math.max(1, a);
  return {
    endDay: Math.ceil(t.endDay / n) * n,
    startDay: Math.floor(t.startDay / n) * n
  };
}
function Un({
  camera: t,
  compact: a = !1,
  viewport: n,
  zoom: r
}) {
  return n.width <= 0 ? { endDay: Number.POSITIVE_INFINITY, startDay: Number.NEGATIVE_INFINITY } : ra(
    na({
      camera: t,
      compact: a,
      futureBufferDays: In,
      pastBufferDays: In,
      viewport: n,
      zoom: r
    })
  );
}
function rl(t, a) {
  return t.startDay === a.startDay && t.endDay === a.endDay;
}
function Qt(t, a, n) {
  return a >= n.startDay && t <= n.endDay;
}
function Xn({
  camera: t,
  compact: a = !1,
  minimumDays: n,
  viewport: r,
  zoom: e
}) {
  const s = ra(
    na({
      camera: t,
      compact: a,
      futureBufferDays: Mo,
      pastBufferDays: No,
      viewport: r,
      zoom: e
    })
  );
  return {
    endDay: Math.max(n, s.endDay),
    startDay: Math.min(0, s.startDay)
  };
}
function Oe(t, a) {
  return (t - a) * Se;
}
function ia(t, a) {
  return Math.max(0, (a - t) * Se);
}
function Va(t, a) {
  return t.latestRelease ? Math.max(0, Math.floor(a - t.latestRelease.endGlobalDay)) : 0;
}
function il(t, a) {
  return a === 0 ? 100 : Math.max(0, Math.round((1 - t / a) * 100));
}
function ol(t) {
  return `${t} ${t === 1 ? "Day" : "Days"} since last update`;
}
function La(t) {
  if (t <= 0)
    return "Same day";
  if (t < 31)
    return `${t} ${t === 1 ? "day" : "days"}`;
  const a = Math.floor(t / 365), n = t - a * 365, r = Math.floor(n / 30), e = n - r * 30, s = [];
  return a > 0 && s.push(`${a} ${a === 1 ? "year" : "years"}`), r > 0 && s.push(`${r} ${r === 1 ? "month" : "months"}`), e > 0 && a === 0 && s.push(`${e} ${e === 1 ? "day" : "days"}`), s.length > 0 ? s.join(", ") : `${t} days`;
}
function ll(t, a) {
  if (a === null || a <= 0)
    return null;
  const n = t - a, r = Math.abs(n);
  return r <= 2 ? `On pace with this line's ${a}-day average` : `${r} ${r === 1 ? "day" : "days"} ${n > 0 ? "slower" : "faster"} than this line's ${a}-day average`;
}
const _a = 3, sl = 4, cl = 12, dl = 132, ul = 4, ml = "[data-timeline-pin]:not([aria-current]):not([data-timeline-event-type]) .timeline-map-screen-label", Pa = /* @__PURE__ */ new Map();
let Fa;
function ze(t) {
  const a = Number.parseFloat(t ?? "");
  return Number.isFinite(a) ? a : 0;
}
function fl(t) {
  const a = t.parentElement;
  if (!a)
    return null;
  const n = getComputedStyle(a), r = getComputedStyle(t), [e, s] = n.translate === "none" ? [] : n.translate.split(" "), c = n.rotate === "none" ? 0 : -ze(n.rotate);
  return {
    anchorX: ze(n.left) + ze(e),
    anchorY: -(ze(n.top) + a.offsetHeight + ze(s)),
    angleRad: c * Math.PI / 180,
    font: `${r.fontWeight} ${r.fontSize} ${r.fontFamily}`,
    fontSizePx: ze(r.fontSize),
    heightPx: t.offsetHeight,
    horizontalChromePx: ze(r.paddingLeft) + ze(r.paddingRight) + ze(r.borderLeftWidth) + ze(r.borderRightWidth),
    letterSpacingPx: ze(r.letterSpacing)
  };
}
function pl(t, a) {
  Fa === void 0 && (Fa = document.createElement("canvas").getContext("2d"));
  const n = Fa;
  let r = t.length * a.fontSizePx * 0.6;
  return n && (n.font = a.font, r = n.measureText(t).width), r + t.length * a.letterSpacingPx + a.horizontalChromePx;
}
function hl(t, a) {
  const n = Math.sin(a.angleRad), r = Math.cos(a.angleRad), e = a.heightPx + _a, s = a.heightPx / 2 * r, c = a.heightPx / 2 * n - a.anchorX, d = Math.max(
    sl,
    cl - a.anchorY - s
  ), f = t.map((h) => ({
    lift: 0,
    slug: h.articleSlug,
    width: pl(h.name, a),
    x: h.globalDay * Se
  })).sort((h, b) => h.x - b.x), m = (h, b) => {
    const x = h + a.anchorX + (b > 0 ? c : 0), v = a.anchorY + b;
    return { n: -x * n + v * r, s: x * r + v * n };
  }, u = (h, b) => {
    const x = m(h.x, h.lift), v = m(b.x, b.lift), T = v.s - x.s;
    return Math.abs(x.n - v.n) < e && T < h.width + _a && -T < b.width + _a;
  };
  for (let h = f.length - 2; h >= 0; h -= 1) {
    const b = f[h], x = f.slice(h + 1).filter((M) => M.x - b.x < b.width / r + e);
    if (!x.some((M) => u(b, M)))
      continue;
    const v = m(b.x, 0).n - c * n, T = x.map((M) => Math.max(d, (m(M.x, M.lift).n + e - v) / r + 0.5)).sort((M, j) => M - j), I = T.find(
      (M) => x.every((j) => !u({ ...b, lift: M }, j))
    );
    b.lift = Math.min(dl, I ?? T[T.length - 1]);
  }
  return new Map(
    f.map((h) => {
      const b = Math.round(h.lift);
      return [
        h.slug,
        b > 0 ? {
          leaderHeight: a.anchorY + b + s + ul,
          lift: b,
          shiftX: c
        } : { leaderHeight: 0, lift: 0, shiftX: 0 }
      ];
    })
  );
}
function tt(t, a = 1) {
  return Math.max(1, Math.round(t * a));
}
function Ga(t = !1, a = 1) {
  return tt(t ? oo : io, a);
}
function ja(t, a = !1, n = 1) {
  const r = Math.max(t, 1), e = tt(a ? ro : no, n), s = tt(lo, n), c = Ga(a, n), d = r * c + Math.max(r - 1, 0) * s, f = Math.max(e, d + (r > 1 ? tt(16, n) : 0));
  return {
    groupHeight: f,
    lineGap: s,
    lineHeight: c,
    topOffset: Math.max(0, (f - d) / 2)
  };
}
function qa(t, a = !1, n = 1) {
  return ja(t.productLines.length, a, n).groupHeight;
}
function Ka(t, a, n = !1, r = 1) {
  const { lineGap: e, lineHeight: s, topOffset: c } = ja(t, n, r);
  return c + a * (s + e) + s / 2;
}
function dt(t = !1, a = 1) {
  return {
    bottomPadding: tt(t ? po : mo, a),
    companyGap: tt(t ? co : so, a),
    topPadding: tt(t ? fo : uo, a)
  };
}
function oa(t, a = !1, n = 1) {
  const r = dt(a, n), e = t.reduce((c, d) => c + qa(d, a, n), 0), s = Math.max(t.length - 1, 0) * r.companyGap;
  return Math.max(
    tt(a ? 384 : 448, n),
    e + s + r.topPadding + r.bottomPadding + tt(a ? 40 : 32, n)
  );
}
function Pt(t, a = !1, n = 1, r = dt(a, n)) {
  let e = r.topPadding;
  return t.map((s, c) => {
    const d = qa(s, a, n), f = {
      company: s,
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
  timelineHeight: s,
  timelineWidth: c,
  viewport: d
}) {
  const f = Math.max(d.width, t ? 360 : 1024), m = Math.max(d.height, t ? 720 : 680), u = t ? yt : bt, h = t ? wr : yr, b = t ? yo : vo, x = t ? xo : ho, v = t ? bo : go, T = h + u + a * Se, I = Math.max(0, T - f * (t ? 0.78 : 0.72)), M = t ? Math.min(390, Math.max(292, f - 64)) : 720, j = t ? Math.min(360, Math.max(280, f - 56)) : 360, V = t ? Math.min(420, Math.max(290, f - 48)) : 520, ie = t ? Math.min(620, Math.max(320, f - 32)) : 1180, K = Math.max(x * 0.34, I + (t ? 20 : f * 0.24)), W = t ? 0 : 4, k = Math.max(
    0,
    Math.min(
      b - m * (t ? 0.28 : 0.24),
      W - (t ? 18 : 24)
    )
  ), Z = t ? K + M + 18 : Math.min(K + M + 28, I + f - j - 24), H = W + 8, E = K, q = b + s + (t ? 42 : 52), z = K, _ = q + (t ? 132 : 118), de = t ? f >= 640 ? 2 : 1 : 4, N = Math.max(1, Math.ceil(Math.max(r, 1) / de)) * (t ? 172 : 224), P = h + u + Math.max(n, 0) * Se, R = h + e * Se, A = Math.max(
    P + x,
    R + c + u + x,
    Z + j + x,
    z + ie + x,
    I + f + x
  ), y = Math.max(
    b + s + v,
    _ + N + v,
    H + (t ? 152 : 172) + v,
    k + m + v
  );
  return {
    contentCards: {
      intro: { height: t ? 176 : 202, width: M, x: K, y: W },
      latest: { height: t ? 96 : 74, width: V, x: E, y: q },
      notes: { height: t ? 142 : 170, width: j, x: Z, y: H },
      summaries: { width: ie, x: z, y: _ }
    },
    initialCameraX: I,
    initialCameraY: k,
    railWidth: u,
    timelineX: h,
    timelineY: b,
    worldHeight: y,
    worldWidth: A
  };
}
function gl(t) {
  return {
    x: t.initialCameraX,
    y: t.initialCameraY
  };
}
function ht(t, a = !1) {
  return {
    camera: gl(t),
    zoom: a ? It : St
  };
}
function _r(t) {
  return Number.isFinite(t) ? Math.max(1e-3, t) : 1;
}
function Za(t, a) {
  return `translate3d(${-t.x * a}px, ${-t.y * a}px, 0) scale(${a})`;
}
const Jt = /* @__PURE__ */ new WeakMap(), vl = 126, Pr = ["timeline-map-label", "timeline-map-screen-fixed", "timeline-gap-collapse"], xl = "timeline-gap-tooltip", bl = ".timeline-gap:hover .timeline-gap-tooltip, .timeline-gap:focus-within .timeline-gap-tooltip", Yn = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakMap();
function Fr(t) {
  let a = Yn.get(t);
  return a || (a = [...Pr, xl].map(
    (n) => t.getElementsByClassName(n)
  ), Yn.set(t, a)), a;
}
function zn(t, a) {
  t.style.getPropertyValue("--map-zoom-frame") !== a && t.style.setProperty("--map-zoom-frame", a);
}
function yl(t, a) {
  const n = Fr(t);
  for (let r = 0; r < Pr.length; r += 1) {
    const e = n[r];
    for (let s = 0; s < e.length; s += 1)
      zn(e[s], a);
  }
  t.querySelectorAll(bl).forEach((r) => zn(r, a));
}
function wl(t) {
  for (const a of Fr(t))
    for (let n = 0; n < a.length; n += 1)
      a[n].style.removeProperty("--map-zoom-frame");
}
function Ya(t, a) {
  t.style.getPropertyValue("--map-zoom") !== a && t.style.setProperty("--map-zoom", a), wl(t);
}
function ea(t, a, n) {
  if (!t)
    return;
  t.style.transform = Za(a, n);
  const r = String(_r(n));
  sa.get(t) !== r && (Jt.has(t) ? yl(t, r) : Ya(t, r), sa.set(t, r)), t.style.willChange = "transform", t.setAttribute("data-camera-moving", "");
  const e = Jt.get(t);
  e !== void 0 && window.clearTimeout(e);
  const s = window.setTimeout(() => {
    t.style.willChange = "auto", t.removeAttribute("data-camera-moving"), Ya(t, r), Jt.delete(t);
  }, vl);
  Jt.set(t, s);
}
function $r(t, a) {
  ir(() => {
    const n = t.current;
    if (n && !sa.has(n)) {
      const r = String(_r(a));
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
  const r = t.maxX - t.minX, e = t.maxY - t.minY, s = Math.max(0, (a - r) / 2), c = Math.max(0, (n - e) / 2);
  return {
    maxX: t.maxX + s,
    maxY: t.maxY + c,
    minX: t.minX - s,
    minY: t.minY - c
  };
}
function Qa(t, a) {
  for (const n of t)
    for (let r = 0; r < n.productLines.length; r += 1) {
      const s = n.productLines[r].releases.find((c) => c.articleSlug === a);
      if (s)
        return { company: n, productLineIndex: r, release: s };
    }
  return null;
}
const Ur = 6, Tl = 2.75;
function El(t, a, n, r) {
  const e = dt(n, r), s = Pt(t, n, r, e), c = new Map(s.map((f) => [f.company.id, f])), d = [];
  return t.forEach((f) => {
    const m = c.get(f.id);
    m && f.productLines.forEach((u, h) => {
      u.releases.forEach((b) => {
        d.push({
          slug: b.articleSlug,
          x: a.timelineX + a.railWidth + b.globalDay * Se,
          y: a.timelineY + m.y + Ka(f.productLines.length, h, n, r)
        });
      });
    });
  }), d;
}
function Ml(t, a, n, r, e, s, c, d) {
  if (e) {
    const m = Qa(t, e);
    if (m) {
      const h = Pt(
        t,
        n,
        r,
        dt(n, r)
      ).find((b) => b.company.id === m.company.id);
      if (h)
        return {
          x: a.timelineX + a.railWidth + m.release.globalDay * Se,
          y: a.timelineY + h.y + Ka(m.company.productLines.length, m.productLineIndex, n, r)
        };
    }
  }
  const f = Math.max(c, 1e-3);
  return {
    x: s.x + d.width / (2 * f),
    y: s.y + d.height / (2 * f)
  };
}
function Nl(t, a, n, r) {
  const e = (r == null ? void 0 : r.minPrimaryDistance) ?? Ur;
  let s = null, c = 1 / 0, d = 1 / 0;
  return a.forEach((f) => {
    if (r != null && r.excludeSlug && f.slug === r.excludeSlug)
      return;
    const m = f.x - t.x, u = f.y - t.y;
    let h = 0, b = 0;
    if (n === "right") {
      if (m < e)
        return;
      h = m, b = Math.abs(u);
    } else if (n === "left") {
      if (m > -e)
        return;
      h = -m, b = Math.abs(u);
    } else if (n === "down") {
      if (u < e)
        return;
      h = u, b = Math.abs(m);
    } else {
      if (u > -e)
        return;
      h = -u, b = Math.abs(m);
    }
    const x = b * Tl + h, v = Math.hypot(m, u);
    (x < c || x === c && v < d) && (s = f, c = x, d = v);
  }), s;
}
function Dl(t) {
  return t === "ArrowRight" ? "right" : t === "ArrowLeft" ? "left" : t === "ArrowDown" ? "down" : t === "ArrowUp" ? "up" : null;
}
function Cl(t) {
  if (t.altKey || t.ctrlKey || t.metaKey)
    return !0;
  const a = t.target;
  return a instanceof Element ? a.closest('[aria-label="Timeline zoom controls"]') ? !0 : !!a.closest('input, textarea, select, [contenteditable="true"]') : !1;
}
function Bn({
  compact: t = !1,
  layout: a,
  productLineIndex: n,
  release: r,
  row: e,
  verticalScale: s = 1
}) {
  const c = Ga(t, s), d = a.timelineY + e.y + Ka(e.company.productLines.length, n, t, s), f = a.timelineX + a.railWidth + r.globalDay * Se, m = a.timelineX + a.railWidth + r.endGlobalDay * Se, u = t ? 28 : 36;
  return {
    maxX: Math.max(f, m) + u,
    maxY: d + c / 2 + 12,
    minX: Math.min(f, m) - u,
    minY: d - c / 2 - 12
  };
}
function Rl(t, a, n) {
  return n ? a ? { bottom: Dr(t.height) + 12, left: 16, right: 16, top: 64 } : {
    bottom: 48,
    left: 100,
    right: Math.min(Er, Math.round(t.width * Mr)),
    top: 72
  } : So;
}
function Al(t, a) {
  const n = Math.min(
    Er,
    Math.round(t.width * Mr)
  ), e = (t.width - n) * Io, s = Math.max(
    1,
    t.width - a.left - a.right - xt * 2
  );
  return { x: oe(
    (e - a.left - xt) / s,
    0.42,
    0.68
  ), y: Nr.y };
}
function Sl({
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
    d.width - r.left - r.right - xt * 2
  ), m = Math.max(
    1,
    d.height - r.top - r.bottom - xt * 2
  ), u = Math.max(a.maxX - a.minX, 1), h = Math.max(a.maxY - a.minY, 1), b = Math.min(f / u, m / h) * Tr * Co, x = Number(oe(b, c, Math.min(s, n)).toFixed(3)), v = (a.minX + a.maxX) / 2, T = (a.minY + a.maxY) / 2, I = r.left + xt + f * t.x, M = r.top + xt + m * t.y, j = Math.max(0, e.worldWidth - d.width / x), V = Math.max(0, e.worldHeight - d.height / x);
  return {
    camera: {
      x: oe(v - I / x, 0, j),
      y: oe(T - M / x, 0, V)
    },
    zoom: x
  };
}
function Xr(t, a, n, r, e = !1, s = 1) {
  if (t.kind === "bounds")
    return t.bounds;
  const c = dt(e, s), d = Pt(a, e, s, c);
  if (t.kind === "slug") {
    const x = Qa(a, t.slug);
    if (!x)
      return null;
    const v = d.find((I) => I.company.id === x.company.id);
    if (!v)
      return null;
    const T = Bn({
      compact: e,
      layout: n,
      productLineIndex: x.productLineIndex,
      release: x.release,
      row: v,
      verticalScale: s
    });
    return $a(T, Ra, Aa);
  }
  if (t.kind === "slugs") {
    const x = t.slugs.map(
      (v) => Xr(
        { kind: "slug", slug: v },
        a,
        n,
        r,
        e,
        s
      )
    ).filter((v) => !!v);
    return x.length === 0 ? null : x.reduce(
      (v, T) => ({
        maxX: Math.max(v.maxX, T.maxX),
        maxY: Math.max(v.maxY, T.maxY),
        minX: Math.min(v.minX, T.minX),
        minY: Math.min(v.minY, T.minY)
      }),
      x[0]
    );
  }
  if (t.kind === "release") {
    const x = d.find((I) => I.company.id === t.companyId);
    if (!x)
      return null;
    const v = x.company.productLines.findIndex((I) => I.id === t.productLineId);
    if (v < 0)
      return null;
    const T = Bn({
      compact: e,
      layout: n,
      productLineIndex: v,
      release: {
        endGlobalDay: t.endGlobalDay ?? t.globalDay,
        globalDay: t.globalDay
      },
      row: x,
      verticalScale: s
    });
    return $a(T, Ra, Aa);
  }
  const f = n.timelineX + n.railWidth + t.globalDay * Se, m = t.endGlobalDay ?? t.globalDay, u = n.timelineX + n.railWidth + m * Se, h = n.timelineY + r * 0.44, b = e ? 100 : 120;
  return $a(
    {
      maxX: Math.max(f, u) + 40,
      maxY: h + b / 2,
      minX: Math.min(f, u) - 40,
      minY: h - b / 2
    },
    Ra,
    Aa
  );
}
function Il(t, a, n, r) {
  const e = Math.max(a, 1e-3);
  return {
    worldX: t.x + n / e,
    worldY: t.y + r / e
  };
}
function gt(t, a, n, r, e) {
  const s = Math.max(e, 1e-3);
  return {
    x: t - n / s,
    y: a - r / s
  };
}
function On({
  anchorX: t,
  anchorY: a,
  camera: n,
  existingAnchor: r,
  zoom: e
}) {
  if (r && r.viewportX === t && r.viewportY === a)
    return r;
  const { worldX: s, worldY: c } = Il(n, e, t, a);
  return {
    viewportX: t,
    viewportY: a,
    worldX: s,
    worldY: c
  };
}
function vt(t, a, n) {
  return t + (a - t) * n;
}
function oe(t, a, n) {
  return Math.min(Math.max(t, a), n);
}
function kl(t) {
  const a = oe(t, 0, 1), n = 1 / (1 + Math.exp(wt / 2)), r = 1 / (1 + Math.exp(-wt / 2));
  return (1 / (1 + Math.exp(-wt * (a - 0.5))) - n) / (r - n);
}
function Ll(t) {
  const a = oe(t, 0, 1), n = 1 / (1 + Math.exp(wt / 2)), r = 1 / (1 + Math.exp(-wt / 2)), e = n + a * (r - n);
  return oe(0.5 + Math.log(e / (1 - e)) / wt, 0, 1);
}
function za(t, a, n) {
  if (n <= a)
    return a;
  const r = kl(t);
  return a + r * (n - a);
}
function Yr(t, a, n) {
  if (n <= a)
    return 0;
  const r = (oe(t, a, n) - a) / (n - a);
  return Ll(r);
}
function kt(t, a, n, r) {
  const e = Yr(t, n, r);
  return za(e + a, n, r);
}
function Wn(t, a, n) {
  if (t <= 0 || n <= 0)
    return 0.35;
  const r = Math.max(t - a, 120);
  return oe(r / n * Tr, 0.08, 1);
}
function _l(t) {
  return /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ i("path", { d: "M11 5v12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ i("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Pl(t) {
  return /* @__PURE__ */ g("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", ...t, children: [
    /* @__PURE__ */ i("path", { d: "M5 11h12", strokeLinecap: "round" }),
    /* @__PURE__ */ i("path", { d: "M20 20l-4.2-4.2", strokeLinecap: "round" }),
    /* @__PURE__ */ i("circle", { cx: "11", cy: "11", r: "7" })
  ] });
}
function Lt({ classId: t, className: a }) {
  const n = a ?? "h-4 w-4";
  return t === "frontier-llms" ? /* @__PURE__ */ i(Si, { className: n, strokeWidth: 1.8 }) : t === "open-source-llms" ? /* @__PURE__ */ i(Ii, { className: n, strokeWidth: 1.8 }) : t === "image-generation" ? /* @__PURE__ */ i(ki, { className: n, strokeWidth: 1.8 }) : t === "video-generation" ? /* @__PURE__ */ i(ur, { className: n, strokeWidth: 1.8 }) : t === "audio-generation" ? /* @__PURE__ */ i(Li, { className: n, strokeWidth: 1.8 }) : t === "3d-generation" ? /* @__PURE__ */ i(_i, { className: n, strokeWidth: 1.8 }) : t === "world-models" ? /* @__PURE__ */ i(ct, { className: n, strokeWidth: 1.8 }) : t === "coding-harnesses" ? /* @__PURE__ */ i(Pi, { className: n, strokeWidth: 1.8 }) : t === "events" ? /* @__PURE__ */ i(da, { className: n, strokeWidth: 1.8 }) : t === "robotics" ? /* @__PURE__ */ i(Fi, { className: n, strokeWidth: 1.8 }) : t === "vehicle-autonomy" ? /* @__PURE__ */ i($i, { className: n, strokeWidth: 1.8 }) : /* @__PURE__ */ i(ct, { className: n, strokeWidth: 1.8 });
}
function Fl({
  attributeStats: t,
  boardView: a,
  className: n = "",
  companySortMode: r,
  companyOptions: e,
  domainStats: s,
  filterState: c,
  isOpen: d,
  onAttributeToggle: f,
  onClearAll: m,
  onClearCompanyFilter: u,
  onCompanyToggle: h,
  onCompanySortModeChange: b,
  onContentTypeChange: x,
  onDomainToggle: v,
  onReset: T,
  onSelectAll: I,
  onSignificanceDisplayLimitChange: M,
  onToggle: j,
  significanceDisplayLimit: V,
  totalMatchedCompanyCount: ie,
  variant: K = "panel",
  visibleCompanyCount: W
}) {
  var ge;
  const k = c.domainIds.length + c.attributeIds.length + c.companyIds.length + (c.contentType === "all" ? 0 : 1), Z = K === "rail", H = Z && !d, E = at(), q = `${Z ? d ? "w-[var(--category-expanded-width,286px)]" : "w-[74px]" : "w-full"} timeline-fluid-obstacle overflow-hidden rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${H ? "cursor-pointer hover:bg-[var(--surface-strong)]" : ""} ${n}`, z = ({
    buttonKey: N,
    description: P,
    icon: R,
    isSelected: A,
    meta: y,
    onClick: D,
    title: S
  }) => /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      title: S,
      disabled: !d,
      onClick: D,
      className: `flex h-11 w-full items-center gap-2 rounded-[0.85rem] border px-2.5 text-left transition duration-300 active:scale-[0.99] ${A ? "border-[var(--edge-strong)] bg-[var(--surface-strong)]" : "border-[var(--edge)] bg-transparent hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
      children: [
        R ?? /* @__PURE__ */ i(Ri, { className: "h-4 w-4 shrink-0 text-[var(--ink)]", strokeWidth: 1.8 }),
        /* @__PURE__ */ g("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ i("span", { className: "block truncate text-xs font-semibold tracking-tight text-[var(--ink)]", children: P }),
          /* @__PURE__ */ i("span", { className: "mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--muted)]", children: y })
        ] }),
        /* @__PURE__ */ i(
          "span",
          {
            className: `inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${A ? "border-[var(--edge-strong)] bg-[var(--ink)] text-[var(--page-bg)]" : "border-[var(--edge)] text-transparent"}`,
            children: /* @__PURE__ */ i(Ai, { className: "h-3 w-3", strokeWidth: 2 })
          }
        )
      ]
    },
    N
  ), _ = he().sortOptions, de = ((ge = _.find((N) => N.id === r)) == null ? void 0 : ge.label) ?? "Significance", Q = r === "significance" ? "score" : de;
  return /* @__PURE__ */ g("aside", { className: q, onClick: H ? j : void 0, children: [
    /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        "aria-expanded": d,
        "aria-label": "Timeline filter and sort controls",
        onClick: (N) => {
          N.stopPropagation(), j();
        },
        className: `flex w-full items-center gap-3 text-left transition duration-300 hover:bg-[var(--surface-strong)] active:scale-[0.99] ${d ? "justify-between border-b border-[var(--edge)] px-3 py-3" : "justify-center px-0 py-4"}`,
        children: [
          /* @__PURE__ */ i("span", { className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink)] shadow-[var(--soft-shadow)]", children: /* @__PURE__ */ i(Ni, { className: "h-4 w-4", strokeWidth: 1.8 }) }),
          d ? /* @__PURE__ */ g("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ i("span", { className: "block text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]", children: E.filterPanelLabel }),
            /* @__PURE__ */ i("span", { className: "mt-1 block truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.label }),
            /* @__PURE__ */ g("span", { className: "mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
              W,
              "/",
              ie,
              " rows · sort ",
              Q
            ] })
          ] }) : /* @__PURE__ */ i("span", { className: "sr-only", children: a.label }),
          /* @__PURE__ */ i(
            Di,
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
          be.div,
          {
            initial: !1,
            animate: { y: d ? 0 : -10 },
            transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
            className: "max-h-[min(620px,calc(100dvh-18rem))] overflow-y-auto px-3 py-3",
            children: /* @__PURE__ */ g("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start", children: [
              /* @__PURE__ */ g("div", { className: "space-y-3", children: [
                hr().map((N) => /* @__PURE__ */ g("div", { children: [
                  /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: N.label }),
                  /* @__PURE__ */ i("div", { className: "space-y-1.5", children: N.domainIds.map((P) => {
                    const R = aa(P);
                    if (!R)
                      return null;
                    const A = s[P] ?? { providerCount: 0, releaseCount: 0 };
                    return z({
                      buttonKey: R.id,
                      description: R.label,
                      icon: /* @__PURE__ */ i(Lt, { classId: R.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                      isSelected: c.domainIds.includes(P),
                      meta: `${A.providerCount}c / ${A.releaseCount}r`,
                      onClick: () => v(P),
                      title: R.description
                    });
                  }) })
                ] }, N.label)),
                /* @__PURE__ */ g("div", { className: "border-t border-[var(--edge)] pt-3", children: [
                  /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: E.contentTypeHeading }),
                  /* @__PURE__ */ i("div", { className: "grid grid-cols-3 gap-1.5", children: ua().map((N) => {
                    const P = c.contentType === N.id, R = N.id === "events" ? da : N.id === "releases" ? cr : ct;
                    return /* @__PURE__ */ g(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => x(N.id),
                        title: N.description,
                        className: `inline-flex h-9 items-center justify-center gap-1.5 rounded-[0.85rem] border px-2 text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ i(R, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                          N.label
                        ]
                      },
                      N.id
                    );
                  }) })
                ] }),
                /* @__PURE__ */ g("div", { className: "grid grid-cols-3 gap-1.5 border-t border-[var(--edge)] pt-3 md:border-t-0 md:pt-0", children: [
                  /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: I,
                      title: E.selectAllTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(ct, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
                        E.selectAllLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: m,
                      title: E.clearFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(dr, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        E.clearFiltersLabel
                      ]
                    }
                  ),
                  /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: T,
                      title: E.resetFiltersTitle,
                      className: "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[var(--edge)] px-2 text-[11px] font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ i(ca, { className: "h-3.5 w-3.5 shrink-0", strokeWidth: 1.8 }),
                        E.resetFiltersLabel
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ g("div", { className: "border-t border-[var(--edge)] pt-3 md:border-l md:border-t-0 md:py-1 md:pl-3", children: [
                /* @__PURE__ */ i("p", { className: "mb-1.5 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: "Attributes" }),
                /* @__PURE__ */ i("div", { className: "space-y-1.5", children: it().map((N) => {
                  const P = aa(N);
                  if (!P)
                    return null;
                  const R = t[N] ?? { providerCount: 0, releaseCount: 0 };
                  return z({
                    buttonKey: N,
                    description: P.label,
                    icon: /* @__PURE__ */ i(Lt, { classId: P.classId, className: "h-4 w-4 shrink-0 text-[var(--ink)]" }),
                    isSelected: c.attributeIds.includes(N),
                    meta: `${R.providerCount}c / ${R.releaseCount}r`,
                    onClick: () => f(N),
                    title: P.description
                  });
                }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: E.companyFiltersHeading }),
                /* @__PURE__ */ i("div", { className: "max-h-44 space-y-1.5 overflow-y-auto pr-1", children: e.length > 0 ? /* @__PURE__ */ g(st, { children: [
                  /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: u,
                      title: E.allRelevantLabel,
                      className: `flex h-8 w-full items-center justify-between rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${c.companyIds.length === 0 ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        E.allRelevantLabel,
                        /* @__PURE__ */ g("span", { className: "font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                          e.length,
                          "c"
                        ] })
                      ]
                    }
                  ),
                  e.map((N) => {
                    const P = c.companyIds.includes(N.id);
                    return /* @__PURE__ */ g(
                      "button",
                      {
                        type: "button",
                        disabled: !d,
                        onClick: () => h(N.id),
                        title: `Filter to ${N.name}`,
                        className: `flex h-8 w-full items-center justify-between gap-2 rounded-[0.75rem] border px-2 text-left text-[11px] font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                        children: [
                          /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: N.name }),
                          /* @__PURE__ */ g("span", { className: "shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]", children: [
                            N.releaseCount,
                            "r"
                          ] })
                        ]
                      },
                      N.id
                    );
                  })
                ] }) : /* @__PURE__ */ i("div", { className: "rounded-[0.75rem] border border-[var(--edge)] px-2 py-2 text-[11px] leading-4 text-[var(--muted)]", children: E.companyFilterEmpty }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: E.sortHeading }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-1 gap-1.5", children: _.map((N) => {
                  const P = r === N.id;
                  return /* @__PURE__ */ g(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => b(N.id),
                      className: `flex h-9 w-full items-center justify-between rounded-[0.85rem] border px-2.5 text-left text-xs font-semibold tracking-tight transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: [
                        N.label,
                        /* @__PURE__ */ i(
                          "span",
                          {
                            className: `h-2.5 w-2.5 rounded-full border ${P ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--edge)] bg-transparent"}`
                          }
                        )
                      ]
                    },
                    N.id
                  );
                }) }),
                /* @__PURE__ */ i("p", { className: "mb-1.5 mt-3 px-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]", children: E.displayedRowsHeading }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-4 gap-1.5 md:grid-cols-2", children: gr().map((N) => {
                  const P = V === N, R = N === "all" ? "All" : String(N);
                  return /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      disabled: !d,
                      onClick: () => M(N),
                      className: `h-8 rounded-[0.85rem] border px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition duration-300 active:scale-[0.99] ${P ? "border-[var(--edge-strong)] bg-[var(--surface-strong)] text-[var(--ink)]" : "border-[var(--edge)] text-[var(--ink-soft)] hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]"}`,
                      children: R
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
    /* @__PURE__ */ i(je, { initial: !1, children: !d && Z ? /* @__PURE__ */ g(
      be.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        className: "flex flex-col items-center gap-3 px-2 pb-5",
        children: [
          /* @__PURE__ */ i("span", { className: "font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]", style: { writingMode: "vertical-rl" }, children: E.filterPanelLabel }),
          /* @__PURE__ */ i("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] font-mono text-[10px] text-[var(--ink-soft)]", children: k })
        ]
      },
      "filter-rail"
    ) : null })
  ] });
}
function Hn(t) {
  return /* @__PURE__ */ i(Fl, { ...t });
}
function Tt({
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
function zr({
  className: t = "",
  compact: a = !1,
  maxZoom: n,
  minZoom: r,
  onSliderActiveChange: e,
  onZoomChange: s,
  zoom: c
}) {
  const d = ee(null), f = ee(null), m = ee(null), u = ee(null), h = ee(null), [b, x] = xe(!1), [v, T] = xe(!1), [I, M] = xe(!1), j = Yr(c, r, n), V = 8 + (1 - j) * 84, ie = a ? "h-3.5 w-3.5" : "h-4 w-4", K = b || v || I, W = K ? a ? "h-10 min-w-10 px-2 text-[9px]" : "h-11 min-w-11 px-2.5 text-[10px]" : a ? "h-4 min-w-4 px-0 text-[0px]" : "h-5 min-w-5 px-0 text-[0px]", k = a ? "group-hover/zoomrail:h-10 group-hover/zoomrail:min-w-10 group-hover/zoomrail:px-2 group-hover/zoomrail:text-[9px] group-focus-within/zoomrail:h-10 group-focus-within/zoomrail:min-w-10 group-focus-within/zoomrail:px-2 group-focus-within/zoomrail:text-[9px]" : "group-hover/zoomrail:h-11 group-hover/zoomrail:min-w-11 group-hover/zoomrail:px-2.5 group-hover/zoomrail:text-[10px] group-focus-within/zoomrail:h-11 group-focus-within/zoomrail:min-w-11 group-focus-within/zoomrail:px-2.5 group-focus-within/zoomrail:text-[10px]", Z = b ? "text-[var(--ink)] opacity-100" : "opacity-45", H = (y, D = !1) => {
    const S = () => {
      x(y), e == null || e(y);
    };
    if (D) {
      or(S);
      return;
    }
    S();
  }, E = (y) => {
    const D = Number(y.currentTarget.value);
    s(() => za(D, r, n));
  };
  Ne(() => () => {
    var y;
    h.current !== null && window.cancelAnimationFrame(h.current), u.current = null, (y = m.current) == null || y.call(m), e == null || e(!1);
  }, [e]);
  const q = (y) => {
    var B;
    const D = (B = d.current) == null ? void 0 : B.getBoundingClientRect();
    if (!D || D.height <= 0)
      return;
    const S = oe(1 - (y - D.top) / D.height, 0, 1);
    s(() => za(S, r, n));
  }, z = () => {
    h.current !== null && (window.cancelAnimationFrame(h.current), h.current = null);
    const y = u.current;
    u.current = null, y !== null && q(y);
  }, _ = (y) => {
    u.current = y, h.current === null && (h.current = window.requestAnimationFrame(() => {
      h.current = null;
      const D = u.current;
      u.current = null, D !== null && q(D);
    }));
  }, de = (y) => {
    !y.isPrimary || y.button !== 0 || (f.current = y.pointerId, y.currentTarget.setPointerCapture(y.pointerId), H(!0, !0), q(y.clientY));
  }, Q = (y) => {
    f.current === y.pointerId && (_(y.clientY), y.preventDefault());
  }, ge = (y) => {
    f.current === y.pointerId && (z(), y.currentTarget.hasPointerCapture(y.pointerId) && y.currentTarget.releasePointerCapture(y.pointerId), f.current = null, H(!1));
  }, N = () => {
    var y;
    z(), (y = m.current) == null || y.call(m), m.current = null, H(!1);
  }, P = (y) => {
    var B;
    if (y.button !== 0 || f.current !== null)
      return;
    (B = m.current) == null || B.call(m), H(!0, !0), q(y.clientY);
    const D = (te) => {
      _(te.clientY), te.preventDefault();
    }, S = () => N();
    window.addEventListener("mousemove", D), window.addEventListener("mouseup", S, { once: !0 }), m.current = () => {
      window.removeEventListener("mousemove", D), window.removeEventListener("mouseup", S);
    };
  }, R = (y) => {
    const D = y.shiftKey ? Ca : To;
    if (y.key === "ArrowUp" || y.key === "ArrowRight") {
      s((S) => kt(S, D, r, n)), y.preventDefault();
      return;
    }
    if (y.key === "ArrowDown" || y.key === "ArrowLeft") {
      s((S) => kt(S, -D, r, n)), y.preventDefault();
      return;
    }
    if (y.key === "PageUp") {
      s((S) => kt(S, Ca, r, n)), y.preventDefault();
      return;
    }
    if (y.key === "PageDown") {
      s((S) => kt(S, -Ca, r, n)), y.preventDefault();
      return;
    }
    if (y.key === "Home") {
      s(() => r), y.preventDefault();
      return;
    }
    y.key === "End" && (s(() => n), y.preventDefault());
  }, A = (y) => {
    y.currentTarget.contains(y.relatedTarget) || T(!1);
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "aria-label": "Timeline zoom controls",
      "data-timeline-presentation-hide": !0,
      role: "group",
      className: `absolute z-40 flex ${a ? "min-h-[17rem] w-12 py-3" : "min-h-[22rem] w-14 py-4"} group/zoomrail select-none flex-col items-center justify-center gap-3 px-2 text-[var(--ink-soft)] transition-[opacity,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] hover:opacity-100 focus-within:text-[var(--ink)] focus-within:opacity-100 ${Z} ${t}`,
      onBlur: A,
      onFocus: () => T(!0),
      onMouseEnter: () => M(!0),
      onMouseLeave: () => M(!1),
      onPointerEnter: () => M(!0),
      onPointerLeave: () => M(!1),
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ i(_l, { className: ie })
          }
        ),
        /* @__PURE__ */ g(
          "label",
          {
            ref: d,
            className: `relative z-10 ${a ? "h-[12.5rem] w-8" : "h-[16rem] w-9"} cursor-ns-resize touch-none rounded-full focus-within:ring-2 focus-within:ring-[rgba(237,242,250,0.3)]`,
            onMouseDown: P,
            onPointerCancel: ge,
            onPointerDown: de,
            onPointerMove: Q,
            onPointerUp: ge,
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
                  className: `pointer-events-none absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-center ${b ? "transition-none" : "transition-[clip-path] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: {
                    backgroundImage: "radial-gradient(circle, rgba(237,242,250,0.92) 1.5px, transparent 1.7px)",
                    backgroundSize: "12px 12px",
                    clipPath: `inset(${(1 - j) * 100}% 0 0 0)`
                  }
                }
              ),
              /* @__PURE__ */ i(
                "span",
                {
                  className: `absolute left-1/2 grid ${W} ${k} -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(237,242,250,0.48)] bg-[rgba(237,242,250,0.95)] font-mono font-semibold text-[#0b0e14] shadow-[0_16px_32px_-22px_rgba(0,0,0,0.78)] ${b ? "scale-[1.04] transition-none" : "transition-[top,width,height,min-width,padding,transform,box-shadow,font-size] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"}`,
                  style: { top: `${V}%` },
                  children: /* @__PURE__ */ g("span", { className: `transition-opacity duration-200 group-hover/zoomrail:opacity-100 group-focus-within/zoomrail:opacity-100 ${K ? "opacity-100" : "opacity-0"}`, children: [
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
                  value: j,
                  onBlur: () => H(!1),
                  onChange: E,
                  onKeyDown: R,
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
        /* @__PURE__ */ i(
          "div",
          {
            "aria-hidden": "true",
            className: `${a ? "h-6 w-6" : "h-7 w-7"} relative z-10 inline-flex shrink-0 items-center justify-center opacity-70`,
            children: /* @__PURE__ */ i(Pl, { className: ie })
          }
        )
      ]
    }
  );
}
function Br({
  className: t = "",
  company: a
}) {
  return /* @__PURE__ */ i("span", { className: `inline-flex shrink-0 items-center justify-center text-[var(--ink)] ${t}`, children: /* @__PURE__ */ i(Lt, { classId: Zo(a), className: "h-[1rem] w-[1rem]" }) });
}
function $l({
  compact: t = !1,
  company: a
}) {
  const n = a.logoMark, r = n ? he().logoAssetPaths[n] : void 0, e = r && Cr(n), s = e ? t ? "h-7 w-12 rounded-[0.72rem]" : "h-8 w-14 rounded-[0.82rem]" : t ? "h-7 w-7 rounded-[0.72rem]" : "h-8 w-8 rounded-[0.82rem]", c = e ? t ? "relative h-[11px] w-9 object-contain" : "relative h-3 w-11 object-contain" : t ? "relative h-[18px] w-[18px] object-contain" : "relative h-5 w-5 object-contain", d = t ? "text-[10px]" : "text-xs";
  return /* @__PURE__ */ i(
    "span",
    {
      "aria-label": `${a.name} logo`,
      className: `${s} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${r ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: `${a.name} logo`,
      children: r ? /* @__PURE__ */ i("img", { "aria-hidden": "true", alt: "", className: c, src: Oa(r) }) : n ? /* @__PURE__ */ g(st, { children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${Ve(a.accent, 0.35)}, transparent 48%)`
            }
          }
        ),
        Or(n, a.accent, d)
      ] }) : /* @__PURE__ */ i(Br, { className: t ? "h-4 w-4" : "h-5 w-5", company: a })
    }
  );
}
function Or(t, a, n) {
  const r = `relative font-semibold tracking-tight ${n}`;
  return t === "calendar" ? /* @__PURE__ */ i(da, { className: "relative h-7 w-7 text-[var(--ink)]", strokeWidth: 1.8 }) : t === "gpt" || t === "openai" ? /* @__PURE__ */ i("span", { className: r, children: "AI" }) : t === "claude" || t === "anthropic" ? /* @__PURE__ */ i("span", { className: r, children: "C" }) : t === "cursor" ? /* @__PURE__ */ i("span", { className: r, children: "C" }) : t === "gemini" || t === "google" ? /* @__PURE__ */ i("span", { className: r, children: "G" }) : t === "deepseek" ? /* @__PURE__ */ i("span", { className: r, children: "D" }) : t === "sora" ? /* @__PURE__ */ i(ur, { className: "relative h-4 w-4", strokeWidth: 1.8 }) : t === "figure" ? /* @__PURE__ */ i("span", { className: r, children: "F" }) : t === "tesla" ? /* @__PURE__ */ i("span", { className: r, children: "T" }) : t === "xai" ? /* @__PURE__ */ i("span", { className: r, children: "x" }) : /* @__PURE__ */ i("span", { className: r, style: { color: a }, children: "AI" });
}
function Ul(t) {
  return t === "square" ? "rounded-[5px]" : t === "diamond" ? "rotate-45 rounded-[4px]" : "rounded-full";
}
function Vn(t) {
  return t.classId !== "events";
}
function Xl(t, a) {
  const n = t[a];
  if (!n || !Vn(n))
    return null;
  const r = t.findIndex(Vn);
  if (r < 0 || r === a)
    return null;
  const e = t[r];
  return e ? {
    productLine: e,
    productLineIndex: r
  } : null;
}
function Yl({
  primaryLine: t,
  productLine: a,
  timelineStartDay: n
}) {
  var s;
  if (t.releases.length === 0 || a.releases.length === 0)
    return null;
  const r = ((s = t.releases[0]) == null ? void 0 : s.globalDay) ?? 0, e = a.releases.find((c) => c.globalDay >= r) ?? a.releases[0];
  return Oe(e.globalDay, n);
}
function zl({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onModelSelect: c,
  productLine: d,
  productLineIndex: f,
  renderWindow: m,
  timelineStartDay: u,
  verticalScale: h = 1
}) {
  const b = Ga(a, h), x = d.classId === "coding-harnesses", v = Yo(n.accent, ao, 0.34), T = Ul(d.markerShape), I = a ? "h-3.5 w-3.5" : "h-4 w-4", M = a ? "absolute left-3 top-0 origin-bottom-left -translate-y-1 -rotate-[22deg]" : "absolute left-4 top-0 origin-bottom-left -translate-y-2 -rotate-[28deg] transition duration-300 group-hover:-translate-y-3", j = a ? "timeline-map-screen-label whitespace-nowrap rounded-[0.7rem] border px-1.5 py-0.5 font-bold tracking-[0.01em] shadow-[var(--soft-shadow)] backdrop-blur-sm" : "timeline-map-screen-label whitespace-nowrap rounded-[0.8rem] border bg-[var(--surface-strong)] px-2 py-1 font-bold tracking-[0.015em] shadow-[var(--soft-shadow)] group-hover:bg-[var(--surface)]", V = a ? 10 : 12, ie = ee(null), [K, W] = xe(
    () => Pa.get(a) ?? null
  ), k = Me(
    () => K ? hl(d.releases, K) : null,
    [d.releases, K]
  );
  ir(() => {
    var z;
    let E = Pa.get(a);
    if (!E) {
      const _ = (z = ie.current) == null ? void 0 : z.querySelector(ml);
      if (E = _ ? fl(_) ?? void 0 : void 0, !E)
        return;
      Pa.set(a, E);
    }
    const q = E;
    W((_) => _ === q ? _ : q);
  });
  const Z = Xl(n.productLines, f), H = Z ? Yl({
    primaryLine: Z.productLine,
    productLine: d,
    timelineStartDay: u
  }) ?? 0 : 0;
  return /* @__PURE__ */ g(
    be.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: br },
      transition: {
        opacity: Ue
      },
      ref: ie,
      className: "relative z-10 shrink-0 hover:z-40 focus-within:z-40",
      style: { height: `${b}px` },
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: "absolute right-0 top-1/2 h-px -translate-y-1/2 bg-[var(--track-line)]",
            style: { left: `${H}px` }
          }
        ),
        /* @__PURE__ */ i("div", { className: "pointer-events-none absolute left-2 top-1/2 z-10 -translate-y-1/2", children: /* @__PURE__ */ g(
          "span",
          {
            className: "timeline-map-label inline-flex items-center gap-1.5 rounded-full border bg-[rgba(10,13,19,0.88)] px-2 py-1 font-mono uppercase tracking-[0.13em] text-[var(--ink-soft)] shadow-[var(--soft-shadow)] backdrop-blur-sm",
            style: {
              borderColor: Ve(n.accent, 0.28),
              ...Ge(a ? 8 : 9)
            },
            children: [
              /* @__PURE__ */ i(Lt, { classId: d.classId, className: a ? "h-3 w-3" : "h-3.5 w-3.5" }),
              d.shortLabel
            ]
          }
        ) }),
        /* @__PURE__ */ i(je, { initial: !1, mode: "popLayout", children: d.releases.map((E, q) => {
          var ue, ve;
          const z = d.releases[q - 1], _ = t === E.articleSlug, de = _ || Qt(E.globalDay, E.endGlobalDay, m), Q = !!z && Qt((z == null ? void 0 : z.globalDay) ?? E.globalDay, E.globalDay, m), ge = E.endGlobalDay > E.globalDay && Qt(E.globalDay, E.endGlobalDay, m);
          if (!de && !Q && !ge)
            return null;
          const N = Oe(E.globalDay, u), P = z ? Oe(z.globalDay, u) : N, R = z ? Math.max(0, N - P) : 0, A = z ? ll(E.gap, d.averageGap) : null, y = ia(E.globalDay, E.endGlobalDay), D = ((ue = d.latestRelease) == null ? void 0 : ue.name) === E.name && ((ve = d.latestRelease) == null ? void 0 : ve.date) === E.date, S = D ? ka(n.accent, 255, 0.12) : ka(n.accent, 255, 0.24), B = Ve(n.accent, D ? 0.52 : 0.34), te = E.tags.includes("landmark-release"), ae = D ? Ve(n.accent, 0.12) : te ? Ve(n.accent, 0.08) : void 0, ne = E.eventKind === "event" ? "Open event" : "Open release", J = k == null ? void 0 : k.get(E.articleSlug), X = J && J.lift > 0 ? J : null, G = _ ? `0 0 0 ${a ? 3 : 4}px rgba(237, 242, 250, 0.92), 0 0 0 ${a ? 7 : 8}px color-mix(in srgb, ${n.accent} 48%, transparent)` : te ? `0 0 0 ${a ? 5 : 6}px color-mix(in srgb, ${n.accent} 24%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 50%, transparent), 0 0 42px color-mix(in srgb, ${n.accent} 28%, transparent)` : D ? `0 0 0 ${a ? 4 : 5}px color-mix(in srgb, ${n.accent} 20%, transparent), 0 0 18px color-mix(in srgb, ${n.accent} 40%, transparent)` : `0 0 0 4px color-mix(in srgb, ${n.accent} 11%, transparent)`, le = _ ? "saturate(1.45) brightness(1.14)" : te ? "saturate(1.38) brightness(1.1)" : D ? "saturate(1.35) brightness(1.08)" : void 0;
          return /* @__PURE__ */ g(
            be.div,
            {
              initial: { opacity: 0, scale: 0.84 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.84 },
              transition: {
                opacity: Ue,
                scale: Ue
              },
              className: "timeline-release-slot absolute inset-0",
              children: [
                z && Q ? /* @__PURE__ */ g(st, { children: [
                  /* @__PURE__ */ i(
                    be.div,
                    {
                      initial: { opacity: 0, scaleX: 0 },
                      animate: { opacity: x ? 0.72 : 0.58, scaleX: 1 },
                      transition: Ue,
                      className: `pointer-events-none absolute top-1/2 -translate-y-1/2 origin-left ${x ? "h-px" : "h-[2px]"}`,
                      style: {
                        backgroundColor: x ? v : n.accent,
                        left: `${P}px`,
                        width: `${R}px`
                      }
                    }
                  ),
                  /* @__PURE__ */ i(
                    "div",
                    {
                      className: "timeline-gap absolute top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 hover:z-50 focus-within:z-50",
                      style: {
                        left: `${P + R / 2}px`,
                        "--gap-world-width": R
                      },
                      children: /* @__PURE__ */ g(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Gap of ${La(E.gap)} between ${z.name} and ${E.name}`,
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
                                  E.gap,
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
                                    E.name
                                  ] }),
                                  /* @__PURE__ */ g("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: [
                                    La(E.gap),
                                    " gap"
                                  ] }),
                                  /* @__PURE__ */ g("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                    z.dateLabel,
                                    " – ",
                                    E.dateLabel
                                  ] }),
                                  A ? /* @__PURE__ */ i("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: A }) : null
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  )
                ] }) : null,
                ge ? /* @__PURE__ */ i(
                  be.div,
                  {
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: D ? 0.72 : 0.54, scaleX: 1 },
                    transition: Ue,
                    className: `absolute top-1/2 z-10 origin-left -translate-y-1/2 rounded-full ${a ? "h-[7px]" : "h-2"}`,
                    style: {
                      backgroundColor: n.accent,
                      boxShadow: `0 0 18px color-mix(in srgb, ${n.accent} 34%, transparent)`,
                      left: `${N}px`,
                      minWidth: a ? "8px" : "10px",
                      width: `${y}px`
                    }
                  }
                ) : null,
                de && X ? (
                  // Sits below every release (z-20) so it passes behind neighbouring labels.
                  /* @__PURE__ */ i(
                    "div",
                    {
                      "aria-hidden": "true",
                      "data-timeline-label-leader": !0,
                      className: `timeline-label-leader ${a ? "timeline-label-leader--compact" : ""} ${_ ? "timeline-label-leader--selected" : ""}`,
                      style: {
                        left: `${N}px`,
                        "--leader-accent": n.accent,
                        "--leader-height": `${X.leaderHeight}px`
                      }
                    }
                  )
                ) : null,
                de ? /* @__PURE__ */ i(
                  be.div,
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
                    style: { left: `${N}px` },
                    children: /* @__PURE__ */ i("div", { className: "overflow-visible", children: /* @__PURE__ */ g(
                      "button",
                      {
                        type: "button",
                        "data-timeline-company-id": n.id,
                        "data-timeline-pin": !0,
                        "data-timeline-product-line-id": d.id,
                        "data-timeline-slug": E.articleSlug,
                        "aria-current": _ ? "page" : void 0,
                        "aria-label": `${ne} for ${E.name}, ${E.dateRangeLabel}`,
                        onClick: (U) => {
                          U.stopPropagation(), c(E.articleSlug);
                        },
                        onPointerDown: (U) => U.stopPropagation(),
                        className: `group relative block size-0 overflow-visible cursor-pointer text-left outline-none ${_ ? "timeline-pin--selected" : ""}`,
                        children: [
                          /* @__PURE__ */ g("div", { className: "timeline-pin-marker-stack relative z-0 size-0 shrink-0", children: [
                            te ? /* @__PURE__ */ i(
                              "span",
                              {
                                "aria-hidden": "true",
                                className: `${a ? "h-8 w-8" : "h-10 w-10"} timeline-pin-landmark-aura absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ${T}`,
                                style: { "--pin-accent": n.accent }
                              }
                            ) : null,
                            _ ? /* @__PURE__ */ i(
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
                                className: `${I} timeline-pin-marker absolute left-0 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 border-[3px] border-[var(--surface-strong)] transition duration-300 ${T} ${_ ? "timeline-pin-marker--selected scale-[1.18]" : "group-hover:scale-[1.22] group-focus-visible:scale-[1.22]"}`,
                                style: {
                                  backgroundColor: n.accent,
                                  boxShadow: G,
                                  filter: le
                                }
                              }
                            )
                          ] }),
                          /* @__PURE__ */ i(
                            "div",
                            {
                              className: `${M} z-[2]`,
                              style: X ? { marginLeft: `${X.shiftX}px`, marginTop: `${-X.lift}px` } : void 0,
                              children: /* @__PURE__ */ i(
                                "div",
                                {
                                  className: `${j} ${// The fluid behind the timeline redraws every frame, so each
                                  // backdrop blur is re-rendered every frame too. Desktop labels
                                  // sit on the ~opaque surface unless they carry an accent tint,
                                  // so only blur where the backdrop actually shows through.
                                  a || ae && !_ ? "backdrop-blur-sm" : ""} ${_ ? "timeline-pin-label--selected" : ""}`,
                                  style: {
                                    backgroundColor: _ ? "var(--surface-strong)" : ae,
                                    borderColor: _ ? Ve(n.accent, 0.88) : B,
                                    borderWidth: _ ? 2 : void 0,
                                    color: _ ? ka(n.accent, 255, 0.06) : S,
                                    boxShadow: _ ? `0 0 0 1px color-mix(in srgb, ${n.accent} 55%, transparent)` : void 0,
                                    textShadow: _ ? "0 1px 14px rgba(0, 0, 0, 0.62)" : D ? "0 1px 12px rgba(0, 0, 0, 0.5)" : "0 1px 10px rgba(0, 0, 0, 0.38)",
                                    filter: _ ? "saturate(1.28)" : D ? "saturate(1.18)" : void 0,
                                    ...Ge(V)
                                  },
                                  children: E.name
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
                                /* @__PURE__ */ i("span", { className: "font-sans text-[13px] font-semibold leading-tight text-[var(--ink)]", children: E.name }),
                                /* @__PURE__ */ g("span", { className: "font-mono text-[11px] text-[var(--ink-soft)]", children: [
                                  E.eventTypeLabel,
                                  " · ",
                                  E.dateRangeLabel
                                ] }),
                                z ? /* @__PURE__ */ g("span", { className: "font-sans text-[11px] leading-snug text-[var(--muted)]", children: [
                                  La(E.gap),
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
            E.articleSlug
          );
        }) }),
        d.latestRelease && e > d.latestRelease.endGlobalDay && Qt(d.latestRelease.endGlobalDay, e, m) ? /* @__PURE__ */ g(st, { children: [
          /* @__PURE__ */ i(
            be.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: x ? 0.48 : 0.42, scaleX: 1 },
              transition: Ue,
              className: `absolute top-1/2 origin-left -translate-y-1/2 ${x ? "h-px" : "quiet-extension-flow h-[2px]"}`,
              style: {
                backgroundColor: x ? v : void 0,
                left: `${Oe(d.latestRelease.endGlobalDay, u)}px`,
                "--quiet-flow-duration": `${a ? 5.4 : 6.4}s`,
                "--quiet-line-color": n.accent,
                width: `${ia(d.latestRelease.endGlobalDay, e)}px`
              }
            }
          ),
          /* @__PURE__ */ i(
            "div",
            {
              className: "absolute top-1/2 z-0 -translate-y-1/2 pl-3",
              style: { left: `${Oe(e, u)}px` },
              children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ g(
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
const Bl = _t.memo(zl);
function Ol({
  activeArticleSlug: t,
  compact: a = !1,
  company: n,
  companyIndex: r,
  currentGlobalDay: e,
  maxDays: s,
  onCompanyBlur: c,
  onCompanyFocus: d,
  onModelSelect: f,
  renderWindow: m,
  timelineStartDay: u,
  verticalScale: h = 1
}) {
  const { lineGap: b } = ja(n.productLines.length, a, h), x = () => d == null ? void 0 : d(n.id), v = () => c == null ? void 0 : c();
  return /* @__PURE__ */ i(
    be.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: br },
      transition: {
        opacity: Ue
      },
      className: "relative flex flex-col justify-center",
      onClick: (T) => {
        const I = T.target;
        I instanceof Element && I.closest("button, a, input, label, select, textarea, [data-row-focus-label]") || x();
      },
      onMouseEnter: x,
      onMouseLeave: v,
      onPointerEnter: (T) => {
        T.pointerType !== "touch" && x();
      },
      onPointerLeave: (T) => {
        T.pointerType !== "touch" && v();
      },
      style: { height: `${qa(n, a, h)}px`, gap: `${b}px` },
      children: /* @__PURE__ */ i(je, { initial: !1, mode: "popLayout", children: n.productLines.map((T, I) => /* @__PURE__ */ i(
        Bl,
        {
          activeArticleSlug: t,
          compact: a,
          company: n,
          companyIndex: r,
          currentGlobalDay: e,
          maxDays: s,
          onModelSelect: f,
          productLine: T,
          productLineIndex: I,
          renderWindow: m,
          timelineStartDay: u,
          verticalScale: h
        },
        `${n.id}-${T.id}`
      )) })
    }
  );
}
function Gn(t, a) {
  return a ? t.productLines.some(
    (n) => n.releases.some((r) => r.articleSlug === a)
  ) : !1;
}
const Wr = _t.memo(
  Ol,
  (t, a) => {
    const n = Gn(t.company, t.activeArticleSlug), r = Gn(a.company, a.activeArticleSlug);
    return t.compact === a.compact && t.company === a.company && t.companyIndex === a.companyIndex && t.currentGlobalDay === a.currentGlobalDay && t.maxDays === a.maxDays && t.timelineStartDay === a.timelineStartDay && t.verticalScale === a.verticalScale && rl(t.renderWindow, a.renderWindow) && n === r && (!n || t.activeArticleSlug === a.activeArticleSlug);
  }
);
function Wl({
  compact: t = !1,
  company: a,
  currentGlobalDay: n,
  index: r,
  maxSummaryQuietDays: e
}) {
  var m, u;
  const s = at(), c = Va(a, n), d = il(c, e), f = a.productLines.length > 1;
  return /* @__PURE__ */ g(
    be.div,
    {
      layout: !0,
      initial: { opacity: 0, y: t ? 12 : 14 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: t ? 12 : 14 },
      transition: {
        layout: to,
        opacity: Ue,
        y: Ue
      },
      className: "rounded-[1.6rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)] p-4",
      children: [
        /* @__PURE__ */ g("div", { className: "min-w-0", children: [
          /* @__PURE__ */ g("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ i(Br, { className: "h-7 w-7", company: a }),
            /* @__PURE__ */ g("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ i("p", { className: "truncate text-sm font-semibold tracking-tight text-[var(--ink)]", children: a.name }),
              /* @__PURE__ */ g("p", { className: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: [
                s.significanceLabel,
                " ",
                a.significanceScore
              ] })
            ] })
          ] }),
          f ? /* @__PURE__ */ i("div", { className: "mt-3 space-y-2", children: a.productLines.map((h) => {
            var b;
            return /* @__PURE__ */ g("div", { className: "min-w-0 rounded-[0.85rem] border border-[var(--edge)] bg-[rgba(255,255,255,0.02)] px-3 py-2", children: [
              /* @__PURE__ */ g("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ g("span", { className: "inline-flex min-w-0 items-center gap-2 text-xs font-semibold tracking-tight text-[var(--ink)]", children: [
                  /* @__PURE__ */ i(Lt, { classId: h.classId, className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ i("span", { className: "truncate", children: h.shortLabel })
                ] }),
                /* @__PURE__ */ i("span", { className: "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]", children: h.significanceScore })
              ] }),
              /* @__PURE__ */ i("p", { className: "mt-1 truncate text-sm text-[var(--ink-soft)]", children: ((b = h.latestRelease) == null ? void 0 : b.name) ?? "No releases" })
            ] }, `${a.id}-${h.id}-summary-line`);
          }) }) : /* @__PURE__ */ g(st, { children: [
            /* @__PURE__ */ i("p", { className: "mt-3 text-base font-semibold tracking-tight text-[var(--ink)]", children: ol(c) }),
            /* @__PURE__ */ g("div", { className: "mt-2 min-w-0", children: [
              /* @__PURE__ */ i("p", { className: "truncate text-sm text-[var(--ink-soft)]", children: ((m = a.latestRelease) == null ? void 0 : m.name) ?? "No releases" }),
              /* @__PURE__ */ i("p", { className: "mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]", children: ((u = a.latestRelease) == null ? void 0 : u.dateRangeLabel) ?? "Date unavailable" })
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
const Hr = _t.memo(Wl);
function Hl(t) {
  const a = t.companyLogoMark === "openai" ? "gpt" : t.companyLogoMark === "google" ? "gemini" : t.companyLogoMark === "anthropic" ? "claude" : t.companyLogoMark;
  return {
    modelLabel: t.name,
    modelMark: a
  };
}
function jn({
  accent: t,
  label: a,
  mark: n,
  size: r
}) {
  const e = r === "large", s = he().logoAssetPaths[n], c = s && Cr(n), d = c ? e ? "h-16 w-28 rounded-[1.25rem]" : "h-11 w-20 rounded-[0.95rem]" : e ? "h-16 w-16 rounded-[1.25rem]" : "h-11 w-11 rounded-[0.95rem]", f = c ? e ? "relative h-5 w-20 object-contain" : "relative h-3 w-14 object-contain" : e ? "relative h-10 w-10 object-contain" : "relative h-7 w-7 object-contain", m = e ? "text-lg" : "text-sm", u = n === "calendar" ? `${a} event icon` : `${a} logo`;
  return /* @__PURE__ */ g(
    "span",
    {
      "aria-label": u,
      className: `${d} relative grid shrink-0 place-items-center overflow-hidden border border-white/10 ${s ? "bg-[#f4f3ef]" : "bg-[rgba(255,255,255,0.045)]"} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`,
      title: u,
      children: [
        s ? null : /* @__PURE__ */ i(
          "span",
          {
            className: "absolute inset-0 opacity-70",
            style: {
              background: `radial-gradient(circle at 28% 24%, ${Ve(t, 0.35)}, transparent 48%)`
            }
          }
        ),
        s ? /* @__PURE__ */ i("img", { "aria-hidden": "true", alt: "", className: f, src: Oa(s) }) : Or(n, t, m)
      ]
    }
  );
}
function qn({
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
        /* @__PURE__ */ i("span", { className: "block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: t }),
        /* @__PURE__ */ g("span", { className: "mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
          r,
          /* @__PURE__ */ i(Ci, { className: "h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5", strokeWidth: 1.8 })
        ] })
      ]
    }
  );
}
function Vl({ media: t }) {
  const [a, n] = xe(!1);
  return a ? null : /* @__PURE__ */ g("figure", { className: "mt-7 overflow-hidden rounded-[1.25rem] border border-[var(--edge)] bg-[var(--surface)] shadow-[var(--soft-shadow)]", children: [
    /* @__PURE__ */ i(
      "img",
      {
        src: Oa(t.src),
        alt: t.alt,
        className: "w-full bg-black object-contain",
        loading: "lazy",
        onError: () => n(!0)
      }
    ),
    t.caption ? /* @__PURE__ */ i("figcaption", { className: "border-t border-[var(--edge)] px-4 py-3 text-xs leading-5 text-[var(--ink-soft)]", children: t.caption }) : null
  ] });
}
const Kn = 640, Zn = 448, Vr = 96, Gl = 4096, Qn = 8, Jn = 12e3, er = 10, Ua = 1300, jl = 3, tr = 0.09, ql = 0.35;
function Kl(t) {
  let a = 2166136261;
  for (let n = 0; n < t.length; n += 1)
    a ^= t.charCodeAt(n), a = Math.imul(a, 16777619);
  return a >>> 0;
}
function Zl(t) {
  let a = t || 1;
  return () => {
    a = a + 1831565813 | 0;
    let n = Math.imul(a ^ a >>> 15, 1 | a);
    return n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n, ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function Ql(t) {
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
const ar = [
  [-0.295, 0.62],
  [0.31, 0.42],
  [-1.04, 0.25],
  [-0.78, 0.18]
], nr = [
  [0.5667, -0.5],
  [0.5, -0.55],
  [0.6, -0.45]
];
function Jl(t) {
  const a = Zl(Kl(t)), n = Math.floor(a() * 4), r = a() * Math.PI * 2, e = 0.768 + a() * 0.034;
  let s = Math.cos(r) * e, c = Math.sin(r) * e, d = 0;
  if (n === 2) {
    const f = ar[Math.floor(a() * ar.length)];
    s = f[0] + (a() - 0.5) * 0.05, c = f[1] + (a() - 0.5) * 0.05;
  } else if (n === 3) {
    const f = nr[Math.floor(a() * nr.length)];
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
function es(t, a, n) {
  let r = a, e = n, s = 0, c = 0;
  for (let d = 0; d < Vr; d += 1) {
    const f = r * r + e * e;
    if (f > Gl)
      return d + 1 - Math.log(Math.log(f) * 0.5) / Math.LN2;
    let m, u;
    if (t.variant === 1) {
      const h = Math.abs(r);
      m = h * h - e * e + t.cRe, u = 2 * h * e + t.cIm;
    } else t.variant === 2 ? (m = r * r - e * e + t.cRe, u = -2 * r * e + t.cIm) : t.variant === 3 ? (m = r * r - e * e + t.cRe + t.phoenixRe * s, u = 2 * r * e + t.phoenixRe * c) : (m = r * r - e * e + t.cRe, u = 2 * r * e + t.cIm);
    s = r, c = e, r = m, e = u;
  }
  return -1;
}
function ts({ accent: t, seedKey: a }) {
  const n = ee(null);
  return Ne(() => {
    const r = n.current, e = r == null ? void 0 : r.getContext("2d");
    if (!r || !e)
      return;
    const s = Jl(a), c = Ql(t), d = [8, 11, 16], f = [
      { at: 0, rgb: d },
      { at: 0.38, rgb: At(d, c, 0.45) },
      { at: 0.62, rgb: c },
      { at: 0.86, rgb: At(c, [235, 240, 248], 0.55) },
      { at: 1, rgb: [240, 244, 250] }
    ], m = (B) => {
      for (let te = 1; te < f.length; te += 1)
        if (B <= f[te].at) {
          const ae = f[te - 1], me = f[te], ne = (B - ae.at) / (me.at - ae.at);
          return At(ae.rgb, me.rgb, ne);
        }
      return f[f.length - 1].rgb;
    }, u = Kn, h = Zn, b = u * h;
    e.clearRect(0, 0, u, h), e.imageSmoothingEnabled = !0, e.imageSmoothingQuality = "high";
    const x = Math.cos(s.rotation), v = Math.sin(s.rotation), T = u / h, I = At(d, c, 0.28), M = At(c, [240, 244, 250], 0.7), j = (B) => {
      if (B < 0)
        return 1;
      const te = Math.min(
        1,
        Math.max(0, Math.log(1 + B) / Math.log(1 + Vr))
      );
      return Math.pow(te, 1.1);
    }, V = (B, te, ae, me) => {
      const ne = ((te + 0.5) / me * 2 - 1) / s.zoom, J = ((B + 0.5) / ae * 2 - 1) * T / s.zoom, X = J * x - ne * v + s.centerX, G = J * v + ne * x + s.centerY, le = es(s, X, G);
      return {
        interior: le < 0,
        shaped: j(le)
      };
    }, ie = Math.ceil(u / Qn), K = Math.ceil(h / Qn), W = document.createElement("canvas");
    W.width = ie, W.height = K;
    const k = W.getContext("2d"), Z = document.createElement("canvas");
    Z.width = u, Z.height = h;
    const H = Z.getContext("2d");
    if (!k || !H)
      return;
    const E = k.createImageData(ie, K), q = H.createImageData(u, h), z = new Uint8ClampedArray(b * 3), _ = new Uint8ClampedArray(b), de = new Float32Array(b), Q = (B) => 1 - Math.pow(1 - B, 3);
    let ge = !1, N = 0, P = "base", R = 0, A = 0, y = 0, D = 0;
    const S = () => {
      if (ge)
        return;
      if (P === "base") {
        const ne = Math.max(1, Math.floor(Jn / ie)), J = Math.min(R + ne, K);
        for (let X = R; X < J; X += 1)
          for (let G = 0; G < ie; G += 1) {
            const le = V(G, X, ie, K), ue = (X * ie + G) * 4, ve = le.interior ? I : m(le.shaped);
            E.data[ue] = ve[0], E.data[ue + 1] = ve[1], E.data[ue + 2] = ve[2], E.data[ue + 3] = le.interior ? 150 : Math.round(30 + le.shaped * 225);
          }
        R = J, R >= K && (k.putImageData(E, 0, 0), P = "baseFade"), N = window.requestAnimationFrame(S);
        return;
      }
      if (P === "baseFade") {
        A += 1, e.clearRect(0, 0, u, h), e.globalAlpha = A / er, e.drawImage(W, 0, 0, u, h), e.globalAlpha = 1, A >= er && (P = "full"), N = window.requestAnimationFrame(S);
        return;
      }
      if (P === "full") {
        const ne = Math.max(1, Math.floor(Jn / u)), J = Math.min(y + ne, h);
        for (let X = y; X < J; X += 1)
          for (let G = 0; G < u; G += 1) {
            const le = V(G, X, u, h), ue = X * u + G, ve = le.interior ? I : m(le.shaped);
            z[ue * 3] = ve[0], z[ue * 3 + 1] = ve[1], z[ue * 3 + 2] = ve[2], _[ue] = le.interior ? 150 : Math.round(30 + le.shaped * 225), de[ue] = le.shaped;
          }
        y = J, y >= h && (P = "reveal"), N = window.requestAnimationFrame(S);
        return;
      }
      if (D += 1, D % jl !== 0 && D < Ua) {
        N = window.requestAnimationFrame(S);
        return;
      }
      const B = Math.min(1, D / Ua), te = Q(B) * (1 + tr * 2), ae = q.data;
      for (let ne = 0; ne < b; ne += 1) {
        const J = (te - de[ne]) / tr, X = J <= 0 ? 0 : J >= 1 ? 1 : J, G = X * (1 - X) * 2 * ql, le = ne * 4;
        ae[le] = z[ne * 3] + (M[0] - z[ne * 3]) * G, ae[le + 1] = z[ne * 3 + 1] + (M[1] - z[ne * 3 + 1]) * G, ae[le + 2] = z[ne * 3 + 2] + (M[2] - z[ne * 3 + 2]) * G, ae[le + 3] = _[ne] * X + G * 30;
      }
      H.putImageData(q, 0, 0), e.clearRect(0, 0, u, h);
      const me = 1 - Q(B);
      me > 3e-3 && (e.globalAlpha = me, e.drawImage(W, 0, 0, u, h), e.globalAlpha = 1), e.drawImage(Z, 0, 0), D < Ua && (N = window.requestAnimationFrame(S));
    };
    return N = window.requestAnimationFrame(S), () => {
      ge = !0, window.cancelAnimationFrame(N);
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
          width: Kn,
          height: Zn,
          className: "h-full w-full object-cover opacity-75 blur-[1px]"
        }
      )
    }
  );
}
function as({
  backdrop: t,
  body: a,
  header: n,
  onDismiss: r,
  resetKey: e
}) {
  const [s, c] = xe(() => window.innerHeight), [d, f] = xe(!1), m = Ui(), u = ee(null), h = ee(!1), b = s - Dr(s), x = Xi(s);
  Ne(() => {
    const M = () => c(window.innerHeight);
    return window.addEventListener("resize", M), () => window.removeEventListener("resize", M);
  }, []), Ne(() => {
    const M = Mn(x, d ? 0 : b, Fn);
    return () => M.stop();
  }, [d, b, x]), Ne(() => {
    var M;
    (M = u.current) == null || M.scrollTo({ top: 0 });
  }, [e]);
  const v = (M) => {
    f(M), Mn(x, M ? 0 : b, Fn);
  }, T = (M) => {
    h.current = !1, m.start(M);
  }, I = (M, j) => {
    const V = x.get(), ie = b + (s - b) * 0.35;
    if (j.velocity.y > Pn) {
      d && V < b ? v(!1) : r();
      return;
    }
    if (j.velocity.y < -Pn) {
      v(!0);
      return;
    }
    if (V > ie) {
      r();
      return;
    }
    v(V < b / 2);
  };
  return /* @__PURE__ */ g(
    be.aside,
    {
      drag: "y",
      dragControls: m,
      dragListener: !1,
      dragConstraints: { bottom: s, top: 0 },
      dragElastic: { bottom: 0.5, top: 0.04 },
      dragMomentum: !1,
      onDragStart: () => {
        h.current = !0;
      },
      onDragEnd: I,
      exit: { y: s, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
      style: { height: s, y: x },
      className: "fixed inset-x-0 top-0 z-40 flex flex-col overflow-hidden rounded-t-[1.6rem] border-t border-[var(--edge-strong)] bg-[rgba(8,11,16,0.98)] shadow-[0_-24px_60px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl",
      children: [
        /* @__PURE__ */ g("div", { className: "relative z-20 shrink-0 touch-none select-none", onPointerDown: T, children: [
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              "aria-label": d ? "Collapse article" : "Expand article",
              "aria-expanded": d,
              onClick: () => {
                h.current || v(!d);
              },
              className: "flex h-6 w-full items-end justify-center",
              children: /* @__PURE__ */ i("span", { className: "h-1 w-10 rounded-full bg-[var(--edge-strong)]" })
            }
          ),
          /* @__PURE__ */ i("div", { className: "px-5", children: n })
        ] }),
        /* @__PURE__ */ g(
          "div",
          {
            ref: u,
            onPointerDown: d ? void 0 : T,
            onClick: (M) => {
              d || h.current || M.target instanceof Element && M.target.closest("a, button") || v(!0);
            },
            className: `relative isolate min-h-0 flex-1 ${d ? "overflow-y-auto overscroll-contain" : "touch-none select-none overflow-hidden"}`,
            children: [
              t,
              /* @__PURE__ */ i("article", { className: "px-5 pb-10", children: a })
            ]
          }
        )
      ]
    },
    "model-article-panel"
  );
}
function ns({
  compact: t,
  entry: a,
  onBack: n,
  onNavigate: r,
  requestedSlug: e
}) {
  const s = at(), c = (a == null ? void 0 : a.article) ?? null, d = a ? a.eventKind === "event" ? {
    modelLabel: a.name,
    modelMark: "calendar"
  } : (c == null ? void 0 : c.logo) ?? Hl(a) : null, f = (c == null ? void 0 : c.title) ?? (a == null ? void 0 : a.name) ?? s.routeMissingTitle, m = (c == null ? void 0 : c.summary) ?? (a ? `${a.name} is tracked as a ${a.eventTypeLabel.toLowerCase()} from ${a.companyName} in the ${a.productLineLabel} line.` : s.routeMissingDetail.replace("{slug}", e)), u = a ? /* @__PURE__ */ i(ts, { accent: a.accent, seedKey: e }) : null, h = /* @__PURE__ */ g("div", { className: "sticky top-0 z-20 -mx-5 flex items-center justify-between gap-3 border-b border-[var(--edge)] bg-[rgba(8,11,16,0.94)] px-5 py-4 shadow-[0_18px_34px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl md:static md:mx-0 md:border-b-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none", children: [
    /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: n,
        className: "inline-flex h-10 items-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
        children: [
          /* @__PURE__ */ i(wi, { className: "h-4 w-4", strokeWidth: 1.8 }),
          s.articleBackLabel
        ]
      }
    ),
    a ? /* @__PURE__ */ g("span", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--edge)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: [
      /* @__PURE__ */ i(da, { className: "h-3.5 w-3.5", strokeWidth: 1.8 }),
      a.dateRangeLabel
    ] }) : null
  ] }), b = /* @__PURE__ */ g(st, { children: [
    a && d ? /* @__PURE__ */ g("div", { className: "mt-6 flex items-start gap-4 md:mt-9", children: [
      /* @__PURE__ */ i(jn, { accent: a.accent, label: d.modelLabel, mark: d.modelMark, size: "large" }),
      /* @__PURE__ */ i(jn, { accent: a.accent, label: a.companyName, mark: a.companyLogoMark, size: "small" })
    ] }) : null,
    /* @__PURE__ */ i("p", { className: "mt-7 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: (c == null ? void 0 : c.eyebrow) ?? (a == null ? void 0 : a.eventTypeLabel) ?? "Unknown route" }),
    /* @__PURE__ */ i("h1", { className: "mt-3 max-w-[12ch] text-4xl leading-none tracking-tighter text-[var(--ink)] md:text-6xl", children: f }),
    /* @__PURE__ */ i("p", { className: "mt-5 max-w-[68ch] text-base leading-8 text-[var(--ink-soft)] md:text-lg", children: (c == null ? void 0 : c.dek) ?? m }),
    c != null && c.media ? /* @__PURE__ */ i(Vl, { media: c.media }) : null,
    a ? /* @__PURE__ */ i("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: Oi(
      (c == null ? void 0 : c.facts) ?? [
        { label: "Company", value: a.companyName },
        { label: "Product line", value: a.productLineLabel },
        { label: a.eventKind === "event" ? "Event date" : "Release date", value: a.dateRangeLabel },
        { label: "Type", value: a.eventTypeLabel }
      ],
      { date: a.date, eventKind: a.eventKind }
    ).map((x) => /* @__PURE__ */ g("div", { className: "border-t border-[var(--edge)] pt-3", children: [
      /* @__PURE__ */ i("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: x.label }),
      /* @__PURE__ */ i("p", { className: "mt-1 text-sm font-semibold text-[var(--ink)]", children: x.value })
    ] }, `${x.label}-${x.value}`)) }) : null,
    /* @__PURE__ */ g("section", { className: "mt-9 border-t border-[var(--edge)] pt-7", children: [
      /* @__PURE__ */ g("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--ink)]", children: [
        /* @__PURE__ */ i(cr, { className: "h-4 w-4", strokeWidth: 1.8 }),
        "Summary"
      ] }),
      /* @__PURE__ */ i("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: m }),
      c != null && c.impact ? /* @__PURE__ */ i("p", { className: "mt-4 text-base leading-8 text-[var(--ink-soft)]", children: c.impact }) : null
    ] }),
    c == null ? void 0 : c.sections.map((x) => /* @__PURE__ */ g("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
      /* @__PURE__ */ i("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: x.heading }),
      /* @__PURE__ */ i("div", { className: "mt-4 space-y-4", children: x.body.map((v) => /* @__PURE__ */ i("p", { className: "text-base leading-8 text-[var(--ink-soft)]", children: v }, v)) })
    ] }, x.heading)),
    c != null && c.sources.length ? /* @__PURE__ */ g("section", { className: "mt-8 border-t border-[var(--edge)] pt-7", children: [
      /* @__PURE__ */ i("h2", { className: "text-xl font-semibold tracking-tight text-[var(--ink)]", children: "Sources" }),
      /* @__PURE__ */ i("div", { className: "mt-4 space-y-2", children: c.sources.map((x) => /* @__PURE__ */ g(
        "a",
        {
          href: x.url,
          target: "_blank",
          rel: "noreferrer",
          className: "flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--edge)] px-4 py-3 text-sm text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)]",
          children: [
            /* @__PURE__ */ i("span", { children: x.label }),
            /* @__PURE__ */ i(Ti, { className: "h-4 w-4 shrink-0", strokeWidth: 1.8 })
          ]
        },
        x.url
      )) })
    ] }) : null,
    a ? /* @__PURE__ */ g("div", { className: "mt-8 grid gap-3 border-t border-[var(--edge)] pt-7 sm:grid-cols-2", children: [
      /* @__PURE__ */ i(qn, { label: "Previous", onNavigate: r, slug: a.previousSlug, title: a.previousName }),
      /* @__PURE__ */ i(qn, { label: "Next", onNavigate: r, slug: a.nextSlug, title: a.nextName })
    ] }) : /* @__PURE__ */ i("div", { className: "mt-8 rounded-[1.1rem] border border-[var(--edge)] bg-[var(--surface)] p-5", children: /* @__PURE__ */ i("p", { className: "text-sm leading-6 text-[var(--ink-soft)]", children: "This route does not match a known model or event entry." }) })
  ] });
  return t ? /* @__PURE__ */ i(
    as,
    {
      backdrop: u,
      body: b,
      header: h,
      onDismiss: n,
      resetKey: e
    }
  ) : /* @__PURE__ */ g(
    be.aside,
    {
      initial: { opacity: 0, x: 72 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 72 },
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      className: "fixed inset-y-0 right-0 z-40 w-full overflow-y-auto border-l border-[var(--edge-strong)] bg-[rgba(8,11,16,0.98)] shadow-[0_34px_100px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl md:w-[min(760px,58vw)]",
      children: [
        u,
        /* @__PURE__ */ g("article", { className: "min-h-full px-5 py-5 md:px-8 md:py-8", children: [
          h,
          b
        ] })
      ]
    },
    "model-article-panel"
  );
}
function rr({
  detail: t,
  title: a
}) {
  const n = at();
  return /* @__PURE__ */ i("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ i("div", { className: "mx-auto flex min-h-[100dvh] max-w-[880px] items-center px-5 py-10 md:px-8", children: /* @__PURE__ */ g("div", { className: "rounded-[2rem] border border-[var(--edge)] bg-[var(--surface)] p-8 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: [
    /* @__PURE__ */ i("p", { className: "text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]", children: n.statusEyebrow }),
    /* @__PURE__ */ i("h1", { className: "mt-4 text-4xl tracking-tighter text-[var(--ink)]", children: a }),
    /* @__PURE__ */ i("p", { className: "mt-4 max-w-[56ch] text-base leading-relaxed text-[var(--ink-soft)]", children: t })
  ] }) }) });
}
const rs = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`, is = `
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
`, os = `
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
`, ls = `
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
`, ss = `
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
`, cs = `
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
`, ds = `
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
`, us = `
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
`, ms = `
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
function fs() {
  const t = ee(null), a = ee(!1), n = ee(!1);
  return Ne(() => {
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
    const s = (L, C) => {
      const Y = e.createShader(L);
      return Y ? (e.shaderSource(Y, C), e.compileShader(Y), e.getShaderParameter(Y, e.COMPILE_STATUS) ? Y : (console.warn(e.getShaderInfoLog(Y)), e.deleteShader(Y), null)) : null;
    }, c = (L) => {
      const C = s(e.VERTEX_SHADER, rs), Y = s(e.FRAGMENT_SHADER, L);
      if (!C || !Y)
        return C && e.deleteShader(C), Y && e.deleteShader(Y), null;
      const $ = e.createProgram();
      return $ ? (e.attachShader($, C), e.attachShader($, Y), e.linkProgram($), e.deleteShader(C), e.deleteShader(Y), e.getProgramParameter($, e.LINK_STATUS) ? $ : (console.warn(e.getProgramInfoLog($)), e.deleteProgram($), null)) : (e.deleteShader(C), e.deleteShader(Y), null);
    }, d = c(ms), f = c(is), m = c(os), u = c(ls), h = c(ss), b = c(cs), x = c(ds), v = c(us), T = () => {
      [d, f, m, u, h, b, x, v].forEach((L) => {
        L && e.deleteProgram(L);
      });
    };
    if (!d || !f || !m || !u || !h || !b || !x || !v) {
      T();
      return;
    }
    const I = e.createBuffer();
    if (!I) {
      T();
      return;
    }
    e.bindBuffer(e.ARRAY_BUFFER, I), e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      e.STATIC_DRAW
    );
    const M = (L) => {
      const C = e.getAttribLocation(L, "aPosition");
      C < 0 || (e.bindBuffer(e.ARRAY_BUFFER, I), e.enableVertexAttribArray(C), e.vertexAttribPointer(C, 2, e.FLOAT, !1, 0, 0));
    }, j = {
      resolution: e.getUniformLocation(d, "uResolution"),
      fluidTexel: e.getUniformLocation(d, "uFluidTexel"),
      widgetRect: e.getUniformLocation(d, "uWidgetRect"),
      elapsedTime: e.getUniformLocation(d, "uElapsedTime"),
      emitterDebug: e.getUniformLocation(d, "uEmitterDebug"),
      emitterSeed: e.getUniformLocation(d, "uEmitterSeed"),
      velocityMap: e.getUniformLocation(d, "uVelocityMap"),
      dyeMap: e.getUniformLocation(d, "uDyeMap")
    }, V = {
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
    }, ie = {
      velocityMap: e.getUniformLocation(m, "uVelocityMap"),
      texel: e.getUniformLocation(m, "uTexel"),
      aspect: e.getUniformLocation(m, "uAspect")
    }, K = {
      velocityMap: e.getUniformLocation(u, "uVelocityMap"),
      curlMap: e.getUniformLocation(u, "uCurlMap"),
      texel: e.getUniformLocation(u, "uTexel"),
      deltaTime: e.getUniformLocation(u, "uDeltaTime"),
      strength: e.getUniformLocation(u, "uStrength"),
      aspect: e.getUniformLocation(u, "uAspect")
    }, W = {
      velocityMap: e.getUniformLocation(h, "uVelocityMap"),
      texel: e.getUniformLocation(h, "uTexel"),
      obstacleRect: e.getUniformLocation(h, "uObstacleRect"),
      aspect: e.getUniformLocation(h, "uAspect")
    }, k = {
      pressureMap: e.getUniformLocation(b, "uPressureMap"),
      divergenceMap: e.getUniformLocation(b, "uDivergenceMap"),
      texel: e.getUniformLocation(b, "uTexel"),
      obstacleRect: e.getUniformLocation(b, "uObstacleRect"),
      aspect: e.getUniformLocation(b, "uAspect")
    }, Z = {
      velocityMap: e.getUniformLocation(x, "uVelocityMap"),
      pressureMap: e.getUniformLocation(x, "uPressureMap"),
      texel: e.getUniformLocation(x, "uTexel"),
      obstacleRect: e.getUniformLocation(x, "uObstacleRect"),
      aspect: e.getUniformLocation(x, "uAspect")
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
    }, E = (L) => {
      const C = e.createTexture(), Y = e.createFramebuffer();
      if (!C || !Y)
        return C && e.deleteTexture(C), Y && e.deleteFramebuffer(Y), !1;
      e.bindTexture(e.TEXTURE_2D, C), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, L, null), e.bindFramebuffer(e.FRAMEBUFFER, Y), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, C, 0);
      const $ = e.checkFramebufferStatus(e.FRAMEBUFFER) === e.FRAMEBUFFER_COMPLETE;
      return e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture(C), e.deleteFramebuffer(Y), $;
    }, z = (() => {
      const L = e.getExtension("OES_texture_half_float"), C = e.getExtension("OES_texture_half_float_linear");
      if (e.getExtension("EXT_color_buffer_half_float"), L && C && E(L.HALF_FLOAT_OES))
        return {
          filter: e.LINEAR,
          type: L.HALF_FLOAT_OES
        };
      const Y = e.getExtension("OES_texture_float"), $ = e.getExtension("OES_texture_float_linear");
      return e.getExtension("WEBGL_color_buffer_float"), Y && $ && E(e.FLOAT) ? {
        filter: e.LINEAR,
        type: e.FLOAT
      } : {
        filter: e.LINEAR,
        type: e.UNSIGNED_BYTE
      };
    })(), _ = (L, C, Y) => {
      const $ = e.createTexture(), se = e.createFramebuffer();
      return !$ || !se ? ($ && e.deleteTexture($), se && e.deleteFramebuffer(se), null) : (e.bindTexture(e.TEXTURE_2D, $), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, z.filter), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, z.filter), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, L, C, 0, e.RGBA, z.type, null), e.bindFramebuffer(e.FRAMEBUFFER, se), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, $, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE ? (e.bindFramebuffer(e.FRAMEBUFFER, null), e.deleteTexture($), e.deleteFramebuffer(se), null) : (e.viewport(0, 0, L, C), e.clearColor(Y[0], Y[1], Y[2], Y[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null), { framebuffer: se, height: C, texture: $, width: L }));
    }, de = (L, C) => {
      e.bindFramebuffer(e.FRAMEBUFFER, L.framebuffer), e.viewport(0, 0, L.width, L.height), e.clearColor(C[0], C[1], C[2], C[3]), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.FRAMEBUFFER, null);
    }, Q = (L) => {
      e.deleteFramebuffer(L.framebuffer), e.deleteTexture(L.texture);
    }, ge = () => {
      const L = Math.min(window.devicePixelRatio || 1, 1.3), C = Math.max(120, Math.min(340, Math.floor(window.innerWidth * L / 5))), Y = Math.max(80, Math.min(220, Math.floor(window.innerHeight * L / 5)));
      return [C, Y];
    };
    let N = 0, P = !1, R = null, A = null, y = null, D = null, S = null, B = 0, te = 0, ae = 0;
    const me = performance.now(), ne = window.matchMedia("(prefers-reduced-motion: reduce)"), J = [-1, -1, -1, -1];
    let X = [0.5, 0.5], G = [0, 0], le = 0, ue = null, ve = me;
    const U = () => {
      const [L, C] = ge();
      if ((R == null ? void 0 : R[0].width) === L && R[0].height === C)
        return !0;
      R == null || R.forEach(Q), A == null || A.forEach(Q), y == null || y.forEach(Q), D && Q(D), S && Q(S);
      const Y = [
        _(L, C, [0.5, 0.5, 0, 1]),
        _(L, C, [0.5, 0.5, 0, 1])
      ], $ = [
        _(L, C, [0.5, 0, 0, 1]),
        _(L, C, [0.5, 0, 0, 1])
      ], se = [
        _(L, C, [0, 0, 0, 0]),
        _(L, C, [0, 0, 0, 0])
      ], ke = _(L, C, [0.5, 0, 0, 1]), Pe = _(L, C, [0.5, 0, 0, 1]), pe = [...Y, ...$, ...se, ke, Pe];
      return pe.some((Fe) => !Fe) ? (pe.forEach((Fe) => {
        Fe && Q(Fe);
      }), R = null, A = null, y = null, D = null, S = null, !1) : (R = Y, A = $, y = se, D = ke, S = Pe, B = 0, te = 0, ae = 0, !0);
    };
    let Re = me;
    const nt = 0.5, fe = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()
    ], Xe = () => {
      const C = Math.max(1, Math.floor(window.innerWidth * 1)), Y = Math.max(1, Math.floor(window.innerHeight * 1));
      (r.width !== C || r.height !== Y) && (r.width = C, r.height = Y, e.viewport(0, 0, C, Y)), e.useProgram(d), e.uniform2f(j.resolution, C, Y), U();
    }, ce = (L) => {
      const C = L * 60;
      le *= Math.pow(0.9, C), G = [
        G[0] * Math.pow(0.94, C),
        G[1] * Math.pow(0.94, C)
      ];
    }, $e = (L) => {
      if (!a.current || L.pointerType === "touch")
        return;
      const C = Math.max(window.innerWidth, 1), Y = Math.max(window.innerHeight, 1), $ = [
        Math.max(0, Math.min(1, L.clientX / C)),
        Math.max(0, Math.min(1, 1 - L.clientY / Y))
      ], se = performance.now(), ke = Math.max((se - ve) / 1e3, 1 / 120);
      if (ue) {
        const Pe = [
          Math.max(-7.5, Math.min(7.5, ($[0] - ue[0]) / ke)),
          Math.max(-7.5, Math.min(7.5, ($[1] - ue[1]) / ke))
        ];
        G = [
          G[0] + (Pe[0] - G[0]) * 0.74,
          G[1] + (Pe[1] - G[1]) * 0.74
        ];
      }
      X = $, ue = $, ve = se, le = Math.min(1, le + 0.92), ne.matches && Ae(se);
    }, re = document.getElementsByClassName("timeline-fluid-obstacle"), Ft = () => {
      const L = Math.max(window.innerWidth, 1), C = Math.max(window.innerHeight, 1), Y = Array.from(re).find((se) => {
        const ke = se.getBoundingClientRect(), Pe = window.getComputedStyle(se);
        return Pe.display !== "none" && Pe.visibility !== "hidden" && ke.width > 1 && ke.height > 1 && ke.bottom > 0 && ke.top < C && ke.right > 0 && ke.left < L;
      });
      if (!Y)
        return [-1, -1, -1, -1];
      const $ = Y.getBoundingClientRect();
      return [
        Math.max(0, Math.min(1, $.left / L)),
        Math.max(0, Math.min(1, 1 - $.bottom / C)),
        Math.max(0, Math.min(1, $.right / L)),
        Math.max(0, Math.min(1, 1 - $.top / C))
      ];
    };
    let Ye = [-1, -1, -1, -1], ye = 0;
    const Ie = () => {
      ye !== 0 || P || (ye = window.setTimeout(() => {
        ye = 0, Ye = Ft();
      }, 0));
    }, Ke = (L, C) => {
      if (!R || !A || !y || !D || !S)
        return;
      const Y = r.width / Math.max(r.height, 1);
      let $ = R[B], se = R[1 - B];
      const ke = y[ae];
      e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(f), M(f), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, ke.texture), e.uniform1i(V.velocityMap, 0), e.uniform1i(V.dyeMap, 1), e.uniform2f(V.texel, 1 / $.width, 1 / $.height), e.uniform2f(V.pointerPosition, X[0], X[1]), e.uniform2f(V.pointerVelocity, G[0], G[1]), e.uniform1f(V.pointerActive, a.current ? le : 0), e.uniform1f(V.pointerRadius, 0.088), e.uniform1f(V.deltaTime, L), e.uniform1f(V.elapsedTime, C), e.uniform1f(V.aspect, Y), e.uniform4f(V.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6), B = 1 - B, $ = R[B], e.bindFramebuffer(e.FRAMEBUFFER, S.framebuffer), e.viewport(0, 0, S.width, S.height), e.useProgram(m), M(m), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.uniform1i(ie.velocityMap, 0), e.uniform2f(ie.texel, 1 / $.width, 1 / $.height), e.uniform1f(ie.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), se = R[1 - B], e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(u), M(u), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, S.texture), e.uniform1i(K.velocityMap, 0), e.uniform1i(K.curlMap, 1), e.uniform2f(K.texel, 1 / $.width, 1 / $.height), e.uniform1f(K.deltaTime, L * 0.25), e.uniform1f(K.strength, 13), e.uniform1f(K.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), B = 1 - B, $ = R[B], e.bindFramebuffer(e.FRAMEBUFFER, D.framebuffer), e.viewport(0, 0, D.width, D.height), e.useProgram(h), M(h), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.uniform1i(W.velocityMap, 0), e.uniform2f(W.texel, 1 / $.width, 1 / $.height), e.uniform4f(W.obstacleRect, J[0], J[1], J[2], J[3]), e.uniform1f(W.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), A.forEach((Fe) => de(Fe, [0.5, 0, 0, 1])), te = 0;
      for (let Fe = 0; Fe < 12; Fe += 1) {
        const ft = A[te], Ze = A[1 - te];
        e.bindFramebuffer(e.FRAMEBUFFER, Ze.framebuffer), e.viewport(0, 0, Ze.width, Ze.height), e.useProgram(b), M(b), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, ft.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, D.texture), e.uniform1i(k.pressureMap, 0), e.uniform1i(k.divergenceMap, 1), e.uniform2f(k.texel, 1 / ft.width, 1 / ft.height), e.uniform4f(k.obstacleRect, J[0], J[1], J[2], J[3]), e.uniform1f(k.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), te = 1 - te;
      }
      se = R[1 - B], e.bindFramebuffer(e.FRAMEBUFFER, se.framebuffer), e.viewport(0, 0, se.width, se.height), e.useProgram(x), M(x), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, A[te].texture), e.uniform1i(Z.velocityMap, 0), e.uniform1i(Z.pressureMap, 1), e.uniform2f(Z.texel, 1 / $.width, 1 / $.height), e.uniform4f(Z.obstacleRect, J[0], J[1], J[2], J[3]), e.uniform1f(Z.aspect, Y), e.drawArrays(e.TRIANGLES, 0, 6), B = 1 - B, $ = R[B];
      const Pe = y[ae], pe = y[1 - ae];
      e.bindFramebuffer(e.FRAMEBUFFER, pe.framebuffer), e.viewport(0, 0, pe.width, pe.height), e.useProgram(v), M(v), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, $.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Pe.texture), e.uniform1i(H.velocityMap, 0), e.uniform1i(H.dyeMap, 1), e.uniform2f(H.pointerPosition, X[0], X[1]), e.uniform2f(H.pointerVelocity, G[0], G[1]), e.uniform1f(H.pointerActive, a.current ? le : 0), e.uniform1f(H.pointerRadius, 0.088), e.uniform1f(H.deltaTime, L), e.uniform1f(H.elapsedTime, C), e.uniform1f(H.aspect, Y), e.uniform4f(H.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6), ae = 1 - ae;
    }, Ja = (L) => {
      if (!R || !y)
        return;
      const C = R[B], Y = y[ae];
      e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, r.width, r.height), e.useProgram(d), M(d), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, C.texture), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, Y.texture), e.uniform1i(j.velocityMap, 0), e.uniform1i(j.dyeMap, 1), e.uniform2f(j.resolution, r.width, r.height), e.uniform2f(j.fluidTexel, 1 / C.width, 1 / C.height), e.uniform4f(j.widgetRect, Ye[0], Ye[1], Ye[2], Ye[3]), e.uniform1f(j.elapsedTime, L), e.uniform1f(j.emitterDebug, n.current ? 1 : 0), e.uniform4f(j.emitterSeed, fe[0], fe[1], fe[2], fe[3]), e.drawArrays(e.TRIANGLES, 0, 6);
    }, Ae = (L) => {
      Xe();
      const C = Math.min(Math.max((L - Re) / 1e3, 1 / 120), 1 / 20);
      Re = L;
      const Y = (L - me) / 1e3, $ = C * nt, se = Y * nt;
      ce(C), Ke($, se), Ja(se), Ie();
    }, ut = (L) => {
      P || (N = window.requestAnimationFrame(ut), !document.hidden && Ae(L));
    }, mt = () => {
      P || (Xe(), Ye = Ft(), Ae(me + 1e3), ne.matches || (N = window.requestAnimationFrame(ut)));
    };
    return window.addEventListener("resize", Xe), window.addEventListener("pointermove", $e, { passive: !0 }), mt(), () => {
      P = !0, window.cancelAnimationFrame(N), window.clearTimeout(ye), window.removeEventListener("resize", Xe), window.removeEventListener("pointermove", $e), R == null || R.forEach(Q), A == null || A.forEach(Q), y == null || y.forEach(Q), D && Q(D), S && Q(S), e.deleteBuffer(I), T();
    };
  }, []), /* @__PURE__ */ g(st, { children: [
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
function Gr({
  boardView: t,
  hiddenCompanyCount: a,
  onShowHiddenCompanies: n
}) {
  const r = a > 0, e = at();
  return /* @__PURE__ */ i("div", { className: "flex min-h-[18rem] items-center justify-center px-6 py-14", children: /* @__PURE__ */ g("div", { className: "max-w-[34rem] text-center", children: [
    /* @__PURE__ */ i("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--edge)] bg-[var(--surface-strong)] text-[var(--ink-soft)]", children: /* @__PURE__ */ i(ct, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
    /* @__PURE__ */ i("p", { className: "mt-5 text-lg font-semibold tracking-tight text-[var(--ink)]", children: r ? `All visible ${e.groupPluralLabel} are hidden` : `${t.label} has no releases yet` }),
    /* @__PURE__ */ i("p", { className: "mt-2 text-sm leading-6 text-[var(--ink-soft)]", children: r ? `Show hidden ${e.groupPluralLabel} or turn on another product line to repopulate the timeline.` : e.emptyBoardDescription }),
    r ? /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: n,
        className: "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--edge)] px-4 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:border-[var(--edge-strong)] hover:bg-[var(--surface)] active:scale-[0.98]",
        children: [
          /* @__PURE__ */ i(ca, { className: "h-4 w-4", strokeWidth: 1.8 }),
          e.showHiddenLabel
        ]
      }
    ) : null
  ] }) });
}
function ps() {
  return /* @__PURE__ */ i("div", { className: "min-h-[100dvh] bg-[var(--page-bg)] text-[var(--ink)]", children: /* @__PURE__ */ g("div", { className: "mx-auto max-w-[1400px] px-5 pb-16 pt-8 md:px-8 md:pt-10", children: [
    /* @__PURE__ */ g("div", { className: "grid animate-pulse gap-10 lg:grid-cols-[minmax(0,1.18fr)_360px] lg:items-end", children: [
      /* @__PURE__ */ g("div", { className: "space-y-6", children: [
        /* @__PURE__ */ i("div", { className: "h-10 w-44 rounded-full bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
        /* @__PURE__ */ g("div", { className: "space-y-4", children: [
          /* @__PURE__ */ i("div", { className: "h-16 max-w-[720px] rounded-[1.75rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
          /* @__PURE__ */ i("div", { className: "h-6 max-w-[620px] rounded-full bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
        ] }),
        /* @__PURE__ */ g("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_280px]", children: [
          /* @__PURE__ */ i("div", { className: "h-32 rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" }),
          /* @__PURE__ */ i("div", { className: "h-32 rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "h-[360px] rounded-[2rem] bg-[var(--surface)] shadow-[var(--soft-shadow)]" })
    ] }),
    /* @__PURE__ */ i("div", { className: "mt-10 overflow-hidden rounded-[2.4rem] border border-[var(--edge)] bg-[var(--surface)] p-6 shadow-[var(--panel-shadow)] backdrop-blur-xl", children: /* @__PURE__ */ g("div", { className: "flex animate-pulse flex-col gap-6", children: [
      /* @__PURE__ */ g("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ i("div", { className: "h-8 w-80 rounded-full bg-[var(--surface-strong)]" }),
        /* @__PURE__ */ i("div", { className: "h-11 w-44 rounded-full bg-[var(--surface-strong)]" })
      ] }),
      [0, 1, 2, 3].map((t) => /* @__PURE__ */ i("div", { className: "relative h-[4.5rem] rounded-[1.25rem] bg-[var(--surface-strong)]", children: /* @__PURE__ */ i("div", { className: "absolute inset-y-1/2 left-12 right-12 h-px -translate-y-1/2 bg-[var(--edge)]" }) }, t))
    ] }) })
  ] }) });
}
function jr({
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
    const m = t === f.company.id;
    return /* @__PURE__ */ i(
      "div",
      {
        "data-row-focus-band": !0,
        className: "pointer-events-auto absolute left-0 rounded-[1.25rem]",
        onClick: (u) => {
          e && (u.stopPropagation(), e(f.company.id));
        },
        onMouseEnter: () => r(f.company.id),
        onMouseLeave: () => n == null ? void 0 : n(),
        onPointerEnter: (u) => {
          u.pointerType !== "touch" && r(f.company.id);
        },
        onPointerLeave: (u) => {
          u.pointerType !== "touch" && (n == null || n());
        },
        style: {
          height: `${f.height}px`,
          top: `${f.y}px`,
          width: `${d + s}px`
        },
        children: /* @__PURE__ */ i(
          "div",
          {
            className: `absolute inset-x-0 top-1/2 h-[calc(100%+1.25rem)] -translate-y-1/2 border-y transition duration-200 ${m ? "opacity-100" : "opacity-0"}`,
            style: {
              background: `linear-gradient(90deg, ${Ve(f.company.accent, a ? 0.16 : 0.12)}, transparent 42%, ${Ve(
                f.company.accent,
                0.08
              )})`,
              borderColor: Ve(f.company.accent, a ? 0.28 : 0.22)
            }
          }
        )
      },
      `${f.company.id}-${a ? "mobile" : "desktop"}-focus-band`
    );
  }) });
}
function qr({
  compact: t = !1,
  onClearFocus: a,
  onCompanyHide: n,
  onCompanyMove: r,
  onPointerEnter: e,
  onPointerLeave: s,
  row: c,
  rowCount: d,
  screenX: f,
  screenY: m
}) {
  const u = c.company, h = u.latestRelease, b = h ? h.name : "No releases", x = u.productLines.map((T) => T.shortLabel).join(" / "), v = "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--edge)] bg-[rgba(255,255,255,0.035)] text-[var(--ink-soft)] transition duration-200 hover:border-[var(--edge-strong)] hover:bg-[rgba(255,255,255,0.075)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-30";
  return /* @__PURE__ */ i(
    "div",
    {
      "data-row-focus-label": !0,
      "data-timeline-presentation-hide": !0,
      className: "pointer-events-none absolute z-30 will-change-transform",
      style: {
        transform: `translate3d(${f}px, ${m}px, 0) translateY(-50%)`
      },
      children: /* @__PURE__ */ g(
        be.div,
        {
          initial: { opacity: 0, scale: 0.96, x: -8 },
          animate: { opacity: 1, scale: 1, x: 0 },
          exit: { opacity: 0, scale: 0.96, x: -8 },
          transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
          className: `pointer-events-auto rounded-[1.15rem] border border-[var(--edge-strong)] bg-[rgba(8,11,16,0.92)] shadow-[0_22px_48px_-30px_rgba(0,0,0,0.88)] backdrop-blur-xl ${t ? "w-[min(15.5rem,calc(100vw-8rem))] p-3" : "w-[18rem] p-3.5"}`,
          onMouseEnter: e,
          onMouseLeave: s,
          onPointerDown: (T) => T.stopPropagation(),
          onPointerEnter: e,
          onPointerLeave: s,
          children: [
            /* @__PURE__ */ g("div", { className: "flex min-w-0 items-start gap-3", children: [
              /* @__PURE__ */ i($l, { compact: t, company: u }),
              /* @__PURE__ */ g("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ g("div", { className: "flex min-w-0 items-center gap-2", children: [
                  /* @__PURE__ */ i("p", { className: "truncate text-sm font-semibold leading-tight tracking-tight text-[var(--ink)]", children: u.name }),
                  /* @__PURE__ */ i(
                    "span",
                    {
                      className: "h-1.5 w-1.5 shrink-0 rounded-full",
                      style: { backgroundColor: u.accent }
                    }
                  )
                ] }),
                /* @__PURE__ */ i("p", { className: "mt-1 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: x }),
                /* @__PURE__ */ i("p", { className: "mt-2 truncate text-xs font-medium text-[var(--ink-soft)]", children: b })
              ] })
            ] }),
            /* @__PURE__ */ g("div", { className: "mt-3 flex items-center justify-between gap-2 border-t border-[var(--edge)] pt-2.5", children: [
              /* @__PURE__ */ g("span", { className: "font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]", children: [
                "Score ",
                u.significanceScore,
                " · Row ",
                c.index + 1,
                "/",
                d
              ] }),
              /* @__PURE__ */ g("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${u.name} up`,
                    title: `Move ${u.name} up`,
                    className: v,
                    disabled: c.index === 0,
                    onClick: (T) => {
                      T.stopPropagation(), r(u.id, "up");
                    },
                    children: /* @__PURE__ */ i(Ei, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Move ${u.name} down`,
                    title: `Move ${u.name} down`,
                    className: v,
                    disabled: c.index === d - 1,
                    onClick: (T) => {
                      T.stopPropagation(), r(u.id, "down");
                    },
                    children: /* @__PURE__ */ i(Mi, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Hide ${u.name}`,
                    title: `Hide ${u.name}`,
                    className: v,
                    onClick: (T) => {
                      T.stopPropagation(), n(u.id), a();
                    },
                    children: /* @__PURE__ */ i(dr, { className: "h-3.5 w-3.5", strokeWidth: 1.8 })
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
function hs({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handlePointerDown: e,
  handlePointerMove: s,
  hiddenCompanyCount: c,
  handleZoomChange: d,
  isPanning: f,
  latestCompany: m,
  maxDays: u,
  minZoom: h,
  maxZoom: b,
  maxSummaryQuietDays: x,
  modelExplorer: v,
  monthTicks: T,
  onCompanyHide: I,
  onCompanyMove: M,
  onDismissArticle: j,
  onModelSelect: V,
  onResetCamera: ie,
  onShowHiddenCompanies: K,
  onToggleTimelineGrid: W,
  processedCompanies: k,
  renderWindow: Z,
  scrollContainerRef: H,
  showTimelineGrid: E,
  stopPanning: q,
  summaryCompanies: z,
  timelineStartDay: _,
  timelineWidth: de,
  viewport: Q,
  worldRef: ge,
  yearTicks: N,
  zoom: P
}) {
  var Xe;
  const A = dt(!1, 1), y = oa(k, !1, 1), D = la({
    currentGlobalDay: r,
    maxDays: u,
    summaryCount: z.length,
    timelineStartDay: _,
    timelineHeight: y,
    timelineWidth: de,
    viewport: Q
  }), S = Pt(k, !1, 1, A), [B, te] = xe(null), ae = ee(null), me = () => {
    ae.current !== null && (window.clearTimeout(ae.current), ae.current = null);
  }, ne = (ce) => {
    me(), te(ce);
  }, J = () => {
    me(), te(null);
  }, X = () => {
    me(), ae.current = window.setTimeout(() => {
      te(null), ae.current = null;
    }, 120);
  };
  Ne(() => () => me(), []);
  const G = S.find((ce) => ce.company.id === B) ?? null, ue = oe(116, 16, Math.max(16, Q.width - 288 - 16)), ve = G ? oe(
    (D.timelineY + G.y + G.height / 2 - n.y) * P,
    82,
    Math.max(82, Q.height - 84)
  ) : 0, U = at(), Re = a.isDefault ? U.defaultBoardDescription : a.isEmpty ? U.emptyBoardDetail : a.isComposite ? U.compositeBoardDescription(a.label) : U.singleBoardDescription(a.label), nt = D.timelineX + _ * Se, fe = de + bt;
  return $r(ge, P), /* @__PURE__ */ g("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ i("div", { "data-timeline-presentation-hide": !0, className: "absolute left-5 top-5 z-40 [--category-expanded-width:40rem]", children: v }),
    /* @__PURE__ */ i(
      "div",
      {
        ref: H,
        className: `absolute inset-0 overflow-hidden [overflow-anchor:none] ${f ? "cursor-grabbing" : "cursor-grab"}`,
        onClickCapture: (ce) => j(ce.target, { clientX: ce.clientX, clientY: ce.clientY }),
        onPointerDown: e,
        onPointerMove: s,
        onPointerUp: q,
        onPointerCancel: q,
        onLostPointerCapture: q,
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: ge,
            className: "relative",
            style: {
              height: `${D.worldHeight}px`,
              transform: Za(n, P),
              transformOrigin: "0 0",
              width: `${D.worldWidth}px`
            },
            children: [
              /* @__PURE__ */ g(
                be.div,
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
                    /* @__PURE__ */ i("h1", { className: "mt-4 max-w-4xl text-5xl leading-none tracking-tighter text-[var(--ink)]", children: U.primaryHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-5 max-w-[68ch] text-base leading-7 text-[var(--ink-soft)]", children: Re })
                  ]
                }
              ),
              /* @__PURE__ */ g(
                be.div,
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
                    /* @__PURE__ */ i("p", { className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]", children: U.timelineNotesHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-4 text-sm leading-7 text-[var(--ink-soft)]", children: U.timelineInteractionNoteDesktop })
                  ]
                }
              ),
              /* @__PURE__ */ i(
                be.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${y}px`,
                    left: `${nt}px`,
                    top: `${D.timelineY}px`,
                    width: `${fe}px`
                  },
                  children: /* @__PURE__ */ g("div", { className: "relative", children: [
                    /* @__PURE__ */ i(
                      jr,
                      {
                        activeCompanyId: B,
                        onCompanyBlur: X,
                        onCompanyFocus: ne,
                        onCompanyTap: ne,
                        railWidth: bt,
                        rowLayouts: S,
                        timelineWidth: de
                      }
                    ),
                    k.length === 0 ? /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-[320px] right-0 top-0 z-20 flex items-center justify-center px-6", children: /* @__PURE__ */ i(
                      Gr,
                      {
                        boardView: a,
                        hiddenCompanyCount: c,
                        onShowHiddenCompanies: K
                      }
                    ) }) : null,
                    /* @__PURE__ */ i(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${fe}px` },
                        children: /* @__PURE__ */ i("div", { style: { paddingLeft: `${bt}px` }, children: /* @__PURE__ */ g(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${de}px`, minHeight: `${y}px` },
                            children: [
                              E ? /* @__PURE__ */ g("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                T.map((ce) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${Oe(ce.days, _)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-10 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
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
                                N.map((ce) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${Oe(ce.days, _)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-2 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
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
                                /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${Oe(r, _)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
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
                              k.length > 0 ? /* @__PURE__ */ i(
                                be.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${A.companyGap}px`,
                                    paddingBottom: `${A.bottomPadding}px`,
                                    paddingTop: `${A.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ i(je, { initial: !1, mode: "popLayout", children: k.map((ce, $e) => /* @__PURE__ */ i(
                                    Wr,
                                    {
                                      activeArticleSlug: t,
                                      company: ce,
                                      companyIndex: $e,
                                      currentGlobalDay: r,
                                      maxDays: u,
                                      onCompanyBlur: X,
                                      onCompanyFocus: ne,
                                      onModelSelect: V,
                                      renderWindow: Z,
                                      timelineStartDay: _,
                                      verticalScale: 1
                                    },
                                    ce.id
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
              /* @__PURE__ */ g(
                be.div,
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
                    /* @__PURE__ */ g("p", { className: "text-sm leading-relaxed text-[var(--ink-soft)]", children: [
                      U.latestDesktopLabel,
                      ": ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: (m == null ? void 0 : m.name) ?? U.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: ((Xe = m == null ? void 0 : m.latestRelease) == null ? void 0 : Xe.name) ?? U.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ i("p", { className: "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]", children: U.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ g(
                be.div,
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
                    /* @__PURE__ */ i("p", { className: "mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]", children: U.recencyHeading }),
                    /* @__PURE__ */ i("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: /* @__PURE__ */ i(je, { initial: !1, mode: "popLayout", children: z.map((ce, $e) => /* @__PURE__ */ i(
                      Hr,
                      {
                        company: ce,
                        currentGlobalDay: r,
                        index: $e,
                        maxSummaryQuietDays: x
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
    /* @__PURE__ */ i(je, { children: G ? /* @__PURE__ */ i(_t.Fragment, { children: /* @__PURE__ */ i(
      qr,
      {
        onClearFocus: J,
        onCompanyHide: I,
        onCompanyMove: M,
        onPointerEnter: me,
        onPointerLeave: X,
        row: G,
        rowCount: S.length,
        screenX: ue,
        screenY: ve
      }
    ) }, `${G.company.id}-desktop-focus-label`) : null }),
    /* @__PURE__ */ i(
      zr,
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
        Tt,
        {
          label: E ? U.timelineGridHideLabel : U.timelineGridShowLabel,
          onClick: W,
          pressed: E,
          children: [
            E ? /* @__PURE__ */ i(lr, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ i(sr, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ i("span", { children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ g(Tt, { label: U.resetCameraLabel, onClick: ie, children: [
        /* @__PURE__ */ i(ca, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { children: "Reset" })
      ] }),
      c > 0 ? /* @__PURE__ */ g(Tt, { label: U.showHiddenLabel, onClick: K, children: [
        /* @__PURE__ */ i(ct, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { children: U.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function gs({
  activeArticleSlug: t,
  boardView: a,
  camera: n,
  currentGlobalDay: r,
  handleTouchEnd: e,
  handleTouchMove: s,
  handleTouchStart: c,
  handleZoomChange: d,
  hiddenCompanyCount: f,
  latestCompany: m,
  minZoom: u,
  maxZoom: h,
  maxDays: b,
  maxSummaryQuietDays: x,
  modelExplorer: v,
  monthTicks: T,
  onCompanyHide: I,
  onCompanyMove: M,
  onDismissArticle: j,
  onModelSelect: V,
  onResetCamera: ie,
  onShowHiddenCompanies: K,
  onToggleTimelineGrid: W,
  processedCompanies: k,
  renderWindow: Z,
  scrollContainerRef: H,
  showTimelineGrid: E,
  timelineStartDay: q,
  timelineWidth: z,
  viewport: _,
  worldRef: de,
  yearTicks: Q,
  zoom: ge
}) {
  var ve;
  const P = dt(!0, 1), R = oa(k, !0, 1), A = la({
    compact: !0,
    currentGlobalDay: r,
    maxDays: b,
    summaryCount: k.length,
    timelineStartDay: q,
    timelineHeight: R,
    timelineWidth: z,
    viewport: _
  }), y = Pt(k, !0, 1, P), [D, S] = xe(null), B = (U) => S(U), te = () => S(null), ae = y.find((U) => U.company.id === D) ?? null, ne = Math.max(16, Math.min(126, Math.max(16, _.width - 248 - 12))), J = ae ? oe(
    (A.timelineY + ae.y + ae.height / 2 - n.y) * ge,
    98,
    Math.max(98, _.height - 104)
  ) : 0, X = at(), G = a.isDefault ? X.defaultBoardDescription : a.isEmpty ? X.emptyBoardDetail : a.isComposite ? X.compositeBoardDescriptionMobile(a.label) : X.singleBoardDescriptionMobile(a.label), le = A.timelineX + q * Se, ue = z + yt;
  return $r(de, ge), /* @__PURE__ */ g("section", { className: "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden", children: [
    /* @__PURE__ */ i("div", { "data-timeline-presentation-hide": !0, className: "absolute left-3 top-3 z-40 [--category-expanded-width:min(20rem,calc(100vw-5rem))]", children: v }),
    /* @__PURE__ */ i(
      "div",
      {
        ref: H,
        className: "absolute inset-0 touch-none overflow-hidden [overflow-anchor:none]",
        onClickCapture: (U) => j(U.target, { clientX: U.clientX, clientY: U.clientY }),
        onClick: (U) => {
          const Re = U.target;
          Re instanceof Element && (Re.closest("[data-row-focus-band], [data-row-focus-label], button, a, input, label, select, textarea") || te());
        },
        onTouchCancel: e,
        onTouchEnd: e,
        onTouchMove: s,
        onTouchStart: c,
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: de,
            className: "relative",
            style: {
              height: `${A.worldHeight}px`,
              transform: Za(n, ge),
              transformOrigin: "0 0",
              width: `${A.worldWidth}px`
            },
            children: [
              /* @__PURE__ */ g(
                be.div,
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
                    /* @__PURE__ */ i("h1", { className: "mt-3 max-w-sm text-[2.25rem] leading-none tracking-tighter text-[var(--ink)]", children: X.primaryHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-4 text-sm leading-6 text-[var(--ink-soft)]", children: G })
                  ]
                }
              ),
              /* @__PURE__ */ g(
                be.div,
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
                    /* @__PURE__ */ i("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]", children: X.timelineNotesHeading }),
                    /* @__PURE__ */ i("p", { className: "mt-3 text-xs leading-5 text-[var(--ink-soft)]", children: X.timelineInteractionNoteMobile })
                  ]
                }
              ),
              /* @__PURE__ */ i(
                be.section,
                {
                  "data-timeline-field": !0,
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  className: "absolute z-10 overflow-visible",
                  style: {
                    height: `${R}px`,
                    left: `${le}px`,
                    top: `${A.timelineY}px`,
                    width: `${ue}px`
                  },
                  children: /* @__PURE__ */ g("div", { className: "relative", children: [
                    /* @__PURE__ */ i(
                      jr,
                      {
                        activeCompanyId: D,
                        compact: !0,
                        onCompanyFocus: B,
                        onCompanyTap: B,
                        railWidth: yt,
                        rowLayouts: y,
                        timelineWidth: z
                      }
                    ),
                    k.length === 0 ? /* @__PURE__ */ i("div", { className: "absolute bottom-0 left-[196px] right-0 top-0 z-20 flex items-center justify-center px-3", children: /* @__PURE__ */ i(
                      Gr,
                      {
                        boardView: a,
                        hiddenCompanyCount: f,
                        onShowHiddenCompanies: K
                      }
                    ) }) : null,
                    /* @__PURE__ */ i(
                      "div",
                      {
                        className: "relative",
                        style: { minWidth: `${ue}px` },
                        children: /* @__PURE__ */ i("div", { style: { paddingLeft: `${yt}px` }, children: /* @__PURE__ */ g(
                          "div",
                          {
                            className: "relative",
                            style: { width: `${z}px`, minHeight: `${R}px` },
                            children: [
                              E ? /* @__PURE__ */ g("div", { className: "pointer-events-none absolute inset-0", "data-timeline-grid": !0, children: [
                                T.map((U) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l border-[var(--grid-line)]",
                                    style: { left: `${Oe(U.days, q)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-9 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
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
                                Q.map((U) => /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--grid-line-strong)]",
                                    style: { left: `${Oe(U.days, q)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
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
                                /* @__PURE__ */ i(
                                  "div",
                                  {
                                    className: "absolute bottom-0 top-0 border-l-2 border-[var(--today-line)]",
                                    style: { left: `${Oe(r, q)}px` },
                                    children: /* @__PURE__ */ i("div", { className: "absolute left-0 top-1 -translate-x-1/2", children: /* @__PURE__ */ i("div", { className: "timeline-map-screen-fixed", children: /* @__PURE__ */ i(
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
                              k.length > 0 ? /* @__PURE__ */ i(
                                be.div,
                                {
                                  className: "relative flex flex-col",
                                  style: {
                                    gap: `${P.companyGap}px`,
                                    paddingBottom: `${P.bottomPadding}px`,
                                    paddingTop: `${P.topPadding}px`
                                  },
                                  children: /* @__PURE__ */ i(je, { initial: !1, mode: "popLayout", children: k.map((U, Re) => /* @__PURE__ */ i(
                                    Wr,
                                    {
                                      activeArticleSlug: t,
                                      compact: !0,
                                      company: U,
                                      companyIndex: Re,
                                      currentGlobalDay: r,
                                      maxDays: b,
                                      onCompanyFocus: B,
                                      onModelSelect: V,
                                      renderWindow: Z,
                                      timelineStartDay: q,
                                      verticalScale: 1
                                    },
                                    U.id
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
              /* @__PURE__ */ g(
                be.div,
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
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: (m == null ? void 0 : m.name) ?? X.latestUnavailable }),
                      " ",
                      "with ",
                      /* @__PURE__ */ i("span", { className: "font-semibold text-[var(--ink)]", children: ((ve = m == null ? void 0 : m.latestRelease) == null ? void 0 : ve.name) ?? X.latestUnavailable }),
                      "."
                    ] }),
                    /* @__PURE__ */ i("p", { className: "mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--muted)]", children: X.timezoneLabel })
                  ]
                }
              ),
              /* @__PURE__ */ g(
                be.div,
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
                    /* @__PURE__ */ i("p", { className: "mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]", children: X.recencyHeading }),
                    /* @__PURE__ */ i("div", { className: "grid gap-3 sm:grid-cols-2", children: /* @__PURE__ */ i(je, { initial: !1, mode: "popLayout", children: k.map((U, Re) => /* @__PURE__ */ i(
                      Hr,
                      {
                        compact: !0,
                        company: U,
                        currentGlobalDay: r,
                        index: Re,
                        maxSummaryQuietDays: x
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
    /* @__PURE__ */ i(je, { children: ae ? /* @__PURE__ */ i(_t.Fragment, { children: /* @__PURE__ */ i(
      qr,
      {
        compact: !0,
        onClearFocus: te,
        onCompanyHide: I,
        onCompanyMove: M,
        row: ae,
        rowCount: y.length,
        screenX: ne,
        screenY: J
      }
    ) }, `${ae.company.id}-mobile-focus-label`) : null }),
    /* @__PURE__ */ i(
      zr,
      {
        compact: !0,
        className: "right-1 top-1/2 -translate-y-1/2",
        maxZoom: h,
        minZoom: u,
        onZoomChange: d,
        zoom: ge
      }
    ),
    /* @__PURE__ */ g("div", { "data-timeline-presentation-hide": !0, className: "absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ g(
        Tt,
        {
          label: E ? X.timelineGridHideLabel : X.timelineGridShowLabel,
          onClick: W,
          pressed: E,
          children: [
            E ? /* @__PURE__ */ i(lr, { className: "h-4 w-4", strokeWidth: 1.8 }) : /* @__PURE__ */ i(sr, { className: "h-4 w-4", strokeWidth: 1.8 }),
            /* @__PURE__ */ i("span", { className: "sr-only", children: "Grid" })
          ]
        }
      ),
      /* @__PURE__ */ g(Tt, { label: X.resetCameraLabel, onClick: ie, children: [
        /* @__PURE__ */ i(ca, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { className: "sr-only", children: "Reset" })
      ] }),
      f > 0 ? /* @__PURE__ */ g(Tt, { label: X.showHiddenLabel, onClick: K, children: [
        /* @__PURE__ */ i(ct, { className: "h-4 w-4", strokeWidth: 1.8 }),
        /* @__PURE__ */ i("span", { className: "sr-only", children: X.companyFiltersHeading })
      ] }) : null
    ] })
  ] });
}
function Ms({ controllerRef: t, definition: a, presentation: n = !1 }) {
  Wi(a);
  const [r, e] = xe(() => _o()), [s, c] = xe(() => Po()), [d, f] = xe(
    () => Fo()
  ), [m, u] = xe(!1), [h, b] = xe(
    () => typeof window > "u" ? !0 : window.matchMedia("(min-width: 768px)").matches
  ), [x, v] = xe(St), [T, I] = xe(It), [M, j] = xe(!1), [V, ie] = xe(!1), [K, W] = xe(!0), [k, Z] = xe([]), [H, E] = xe(() => Be().map((o) => o.id)), [q, z] = xe({ x: 0, y: 0 }), [_, de] = xe({ x: 0, y: 0 }), [Q, ge] = xe(() => Lo()), N = ee(St), P = ee(It), R = ee({ x: 0, y: 0 }), A = ee({ x: 0, y: 0 }), y = ee({
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
  }), D = ee({
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
  }), S = ee(null), B = ee(null), te = ee(null), ae = ee(null), me = ee(null), ne = ee(null), J = ee(null), X = ee(null), G = ee(!1), le = ee(!1), ue = ee(null), ve = ee(null), U = ee(!1), Re = ee(null), nt = ee(() => {
  }), fe = ee(null), Xe = ee(null), ce = ee({
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0
  });
  ee(/* @__PURE__ */ new Map());
  const $e = ee(null), [re, Ft] = xe({
    desktop: { height: 0, width: 0 },
    mobile: { height: 0, width: 0 }
  }), Ye = at(), ye = Q.kind === "model" ? Q.slug : null, Ie = ye ? he().articleIndexBySlug[ye] ?? null : null, Ke = Q.kind === "model", Ae = (Me(() => /* @__PURE__ */ new Date(), []).getTime() - ot().getTime()) / lt, ut = Me(() => Ho(r), [r]), mt = Me(
    () => ha(Be(), r),
    [r]
  ), L = Me(
    () => Jo(mt, H, k, s, Ae),
    [H, s, Ae, k, mt]
  ), C = Me(
    () => el(L, d, Ie == null ? void 0 : Ie.companyId),
    [Ie == null ? void 0 : Ie.companyId, L, d]
  ), Y = Me(
    () => C.map((o) => o.id),
    [C]
  ), $ = Me(() => {
    const o = new Set(k);
    return mt.filter((l) => o.has(l.id)).length;
  }, [k, mt]), se = Me(() => jo(Be(), r), [r]), ke = Me(() => qo(Be(), r), [r]), Pe = Me(() => Ko(Be(), r), [r]), pe = Me(
    () => nl(C, Ae),
    [Ae, C]
  ), Fe = Math.max(Math.ceil(Ae) + 36, pe.latestGlobalDay + 36, 720), ft = Math.max(Fe * Se, 1), Ze = Wn(re.desktop.width, bt, ft), $t = Wn(re.mobile.width, yt, ft), en = Xn({
    camera: q,
    minimumDays: Fe,
    viewport: re.desktop,
    zoom: x
  }), tn = Xn({
    camera: _,
    compact: !0,
    minimumDays: Fe,
    viewport: re.mobile,
    zoom: T
  }), Ut = en.endDay, Xt = en.startDay, Yt = tn.endDay, zt = tn.startDay, va = Math.max(ia(Xt, Ut), 1), xa = Math.max(
    ia(zt, Yt),
    1
  ), Kr = Me(
    () => Un({
      camera: q,
      viewport: re.desktop,
      zoom: x
    }),
    [q, re.desktop, x]
  ), Zr = Me(
    () => Un({
      camera: _,
      compact: !0,
      viewport: re.mobile,
      zoom: T
    }),
    [_, T, re.mobile]
  ), ba = 1, ya = 1, Bt = oa(pe.processedCompanies, !1, ba), Ot = oa(pe.processedCompanies, !0, ya), Wt = ra(
    na({
      camera: q,
      futureBufferDays: Ln,
      pastBufferDays: kn,
      viewport: re.desktop,
      zoom: x
    })
  ), Ht = ra(
    na({
      camera: _,
      compact: !0,
      futureBufferDays: Ln,
      pastBufferDays: kn,
      viewport: re.mobile,
      zoom: T
    })
  ), { monthTicks: Qr, yearTicks: Jr } = Me(
    () => $n({ endDay: Wt.endDay, startDay: Wt.startDay }),
    [Wt.endDay, Wt.startDay]
  ), { monthTicks: ei, yearTicks: ti } = Me(
    () => $n({ endDay: Ht.endDay, startDay: Ht.startDay }),
    [Ht.endDay, Ht.startDay]
  ), an = Me(() => [...pe.processedCompanies].filter((o) => o.latestRelease).sort((o, l) => {
    var p, w;
    return (((p = l.latestRelease) == null ? void 0 : p.globalDay) ?? 0) - (((w = o.latestRelease) == null ? void 0 : w.globalDay) ?? 0);
  })[0] ?? null, [pe.processedCompanies]), Mt = Me(() => pe.processedCompanies, [pe.processedCompanies]), nn = Me(() => Mt.reduce((o, l) => {
    const p = Va(l, Ae);
    return Math.max(o, p);
  }, 0), [Ae, Mt]), Qe = Me(
    () => la({
      currentGlobalDay: Ae,
      maxDays: Ut,
      summaryCount: Mt.length,
      timelineStartDay: Xt,
      timelineHeight: Bt,
      timelineWidth: va,
      viewport: re.desktop
    }),
    [
      Ae,
      Bt,
      Ut,
      Mt.length,
      Xt,
      va,
      re.desktop
    ]
  ), Je = Me(
    () => la({
      compact: !0,
      currentGlobalDay: Ae,
      maxDays: Yt,
      summaryCount: pe.processedCompanies.length,
      timelineStartDay: zt,
      timelineHeight: Ot,
      timelineWidth: xa,
      viewport: re.mobile
    }),
    [
      Ae,
      Yt,
      zt,
      Ot,
      xa,
      pe.processedCompanies.length,
      re.mobile
    ]
  );
  Ne(() => {
    const o = window.setTimeout(() => ie(!0), 120);
    return () => window.clearTimeout(o);
  }, []), Ne(() => {
    const o = () => {
      const l = window.location.hash;
      ge(Rr(l)), e(Ar(l)), c(Sr(l)), f(Ir(l));
    };
    return o(), window.addEventListener("hashchange", o), () => window.removeEventListener("hashchange", o);
  }, []), Ne(() => {
    if (n)
      return;
    const o = Sa({
      companySortMode: s,
      filterState: r,
      route: Q,
      significanceDisplayLimit: d
    });
    window.location.hash !== o && window.history.replaceState(null, "", o);
  }, [s, r, n, Q, d]), Ne(() => () => {
    var o, l, p, w, F;
    (o = fe.current) == null || o.call(fe), y.current.frameId !== null && window.cancelAnimationFrame(y.current.frameId), (p = (l = y.current).complete) == null || p.call(l, "cancelled"), D.current.frameId !== null && window.cancelAnimationFrame(D.current.frameId), (F = (w = D.current).complete) == null || F.call(w, "cancelled");
  }, []), Ne(() => {
    Ie && (e((o) => {
      const l = qi(Ie.presets), p = He(Ie.presets, it()), w = We({
        ...o,
        attributeIds: He([...o.attributeIds, ...p], it()),
        companyIds: o.companyIds.length > 0 && !o.companyIds.includes(Ie.companyId) ? [...o.companyIds, Ie.companyId] : o.companyIds,
        domainIds: l.length > 0 ? He([...o.domainIds, ...l], qe()) : o.domainIds
      });
      return vr(o, w) ? o : w;
    }), Z((o) => o.filter((l) => l !== Ie.companyId)));
  }, [Ie]), Ne(() => {
    const o = new Set(Pe.map((l) => l.id));
    e((l) => {
      const p = l.companyIds.filter((w) => o.has(w));
      return p.length === l.companyIds.length ? l : { ...l, companyIds: p };
    });
  }, [Pe]), Ne(() => {
    const o = window.matchMedia("(min-width: 768px)"), l = () => b(o.matches);
    return l(), o.addEventListener("change", l), () => o.removeEventListener("change", l);
  }, []), Ne(() => {
    const o = () => {
      var p, w, F, O;
      Ft({
        desktop: {
          height: ((p = S.current) == null ? void 0 : p.clientHeight) ?? window.innerHeight,
          width: ((w = S.current) == null ? void 0 : w.clientWidth) ?? window.innerWidth
        },
        mobile: {
          height: ((F = B.current) == null ? void 0 : F.clientHeight) ?? window.innerHeight,
          width: ((O = B.current) == null ? void 0 : O.clientWidth) ?? window.innerWidth
        }
      });
    };
    o();
    const l = window.requestAnimationFrame(o);
    return window.addEventListener("resize", o), () => {
      window.cancelAnimationFrame(l), window.removeEventListener("resize", o);
    };
  }, [h, V]), Ne(() => {
    if (G.current)
      return;
    const o = () => {
      if (G.current || !S.current || S.current.clientWidth === 0)
        return;
      const p = ht(Qe);
      R.current = p.camera, y.current.target = p, Gt(p.zoom, p.camera), G.current = !0;
    };
    if (o(), !G.current)
      return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, [Qe, re.desktop, x]), Ne(() => {
    if (le.current)
      return;
    const o = () => {
      if (le.current || !B.current || B.current.clientWidth === 0)
        return;
      const p = ht(Je, !0);
      A.current = p.camera, D.current.target = p, jt(p.zoom, p.camera), le.current = !0;
    };
    if (o(), !le.current)
      return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, [Je, T, re.mobile]);
  const ai = (o) => {
    e((l) => {
      const p = l.domainIds.includes(o) ? l.domainIds.filter((w) => w !== o) : He([...l.domainIds, o], qe());
      return We({ ...l, companyIds: [], domainIds: p });
    });
  }, ni = (o) => {
    e((l) => {
      const p = l.attributeIds.includes(o) ? l.attributeIds.filter((w) => w !== o) : He([...l.attributeIds, o], it());
      return We({ ...l, attributeIds: p, companyIds: [] });
    });
  }, ri = (o) => {
    e((l) => We({ ...l, companyIds: [], contentType: o }));
  }, ii = (o) => {
    e((l) => {
      const p = l.companyIds.length === 0 ? [o] : l.companyIds.includes(o) ? l.companyIds.filter((w) => w !== o) : [...l.companyIds, o];
      return We({ ...l, companyIds: p });
    });
  }, oi = () => {
    e((o) => ({ ...o, companyIds: [] }));
  }, li = () => {
    e(Et()), c(ma()), f(fa()), Z([]), E(Be().map((o) => o.id));
  }, si = () => {
    e({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: [...qe()]
    });
  }, ci = () => {
    e({
      attributeIds: [],
      companyIds: [],
      contentType: "all",
      domainIds: []
    });
  }, rn = (o) => {
    Z((l) => l.includes(o) ? l : [...l, o]);
  }, on = () => {
    Z([]);
  }, ln = En(() => {
    W((o) => !o);
  }, []), sn = (o, l) => {
    E((p) => al(p, Y, o, l));
  }, cn = () => {
    window.location.hash = Sa({
      companySortMode: s,
      filterState: r,
      route: { kind: "timeline" },
      significanceDisplayLimit: d
    });
  }, Vt = (o) => {
    window.location.hash = Sa({
      companySortMode: s,
      filterState: r,
      route: { kind: "model", slug: o },
      significanceDisplayLimit: d
    });
  }, wa = () => {
    Q.kind === "model" && (ve.current = null, cn());
  }, dn = (o, l) => {
    if (U.current) {
      U.current = !1;
      return;
    }
    Ia(
      o,
      ye,
      wa,
      l
    );
  }, un = {
    attributeStats: ke,
    boardView: ut,
    companySortMode: s,
    companyOptions: Pe,
    domainStats: se,
    filterState: r,
    isOpen: m,
    onAttributeToggle: ni,
    onClearAll: ci,
    onClearCompanyFilter: oi,
    onCompanyToggle: ii,
    onCompanySortModeChange: c,
    onContentTypeChange: ri,
    onDomainToggle: ai,
    onReset: li,
    onSelectAll: si,
    onSignificanceDisplayLimitChange: f,
    onToggle: () => u((o) => !o),
    significanceDisplayLimit: d,
    totalMatchedCompanyCount: L.length,
    visibleCompanyCount: C.length
  }, Gt = (o, l) => {
    N.current = o, R.current = l, ea(te.current, l, o), v(o), z(l);
  }, jt = (o, l) => {
    P.current = o, A.current = l, ea(ae.current, l, o), I(o), de(l);
  }, mn = (o) => {
    var Ct;
    const l = y.current, p = l.lastFrameAt === null ? 1 / 60 : oe((o - l.lastFrameAt) / 1e3, 0, 0.064);
    l.lastFrameAt = o;
    const { target: w, zoomAnchor: F } = l;
    l.durationMs !== null && l.startedAt === null && (l.startedAt = o);
    const O = l.durationMs === null ? null : oe((o - (l.startedAt ?? o)) / l.durationMs, 0, 1), we = O === null ? 1 - Math.exp(-l.stiffness * p) : O * O * O * (O * (O * 6 - 15) + 10), De = O === null ? N.current : l.start.zoom, Ce = O === null ? R.current : l.start.camera, Ee = vt(De, w.zoom, we), Te = F ? gt(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      Ee
    ) : {
      x: vt(Ce.x, w.camera.x, we),
      y: vt(Ce.y, w.camera.y, we)
    };
    Gt(Ee, Te);
    const et = Math.hypot(w.camera.x - Te.x, w.camera.y - Te.y), Dt = Math.abs(w.zoom - Ee);
    if (O !== null ? O < 1 : et > An || Dt > Sn) {
      l.frameId = window.requestAnimationFrame(mn);
      return;
    }
    l.durationMs = null, l.frameId = null, l.lastFrameAt = null, l.startedAt = null;
    const Ea = F ? gt(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      w.zoom
    ) : w.camera;
    l.zoomAnchor = null, Gt(w.zoom, Ea), (Ct = l.complete) == null || Ct.call(l, "completed"), l.complete = null;
  }, fn = (o) => {
    var Ct;
    const l = D.current, p = l.lastFrameAt === null ? 1 / 60 : oe((o - l.lastFrameAt) / 1e3, 0, 0.064);
    l.lastFrameAt = o;
    const { target: w, zoomAnchor: F } = l;
    l.durationMs !== null && l.startedAt === null && (l.startedAt = o);
    const O = l.durationMs === null ? null : oe((o - (l.startedAt ?? o)) / l.durationMs, 0, 1), we = O === null ? 1 - Math.exp(-l.stiffness * p) : O * O * O * (O * (O * 6 - 15) + 10), De = O === null ? P.current : l.start.zoom, Ce = O === null ? A.current : l.start.camera, Ee = vt(De, w.zoom, we), Te = F ? gt(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      Ee
    ) : {
      x: vt(Ce.x, w.camera.x, we),
      y: vt(Ce.y, w.camera.y, we)
    };
    jt(Ee, Te);
    const et = Math.hypot(w.camera.x - Te.x, w.camera.y - Te.y), Dt = Math.abs(w.zoom - Ee);
    if (O !== null ? O < 1 : et > An || Dt > Sn) {
      l.frameId = window.requestAnimationFrame(fn);
      return;
    }
    l.durationMs = null, l.frameId = null, l.lastFrameAt = null, l.startedAt = null;
    const Ea = F ? gt(
      F.worldX,
      F.worldY,
      F.viewportX,
      F.viewportY,
      w.zoom
    ) : w.camera;
    l.zoomAnchor = null, jt(w.zoom, Ea), (Ct = l.complete) == null || Ct.call(l, "completed"), l.complete = null;
  }, qt = (o, l) => {
    var w;
    const p = y.current;
    return (w = p.complete) == null || w.call(p, "cancelled"), p.durationMs = (l == null ? void 0 : l.durationMs) === void 0 ? null : oe(l.durationMs, 120, 5e3), p.start = {
      camera: { ...R.current },
      zoom: N.current
    }, p.startedAt = null, p.target = o, p.stiffness = (l == null ? void 0 : l.stiffness) ?? rt, l ? p.zoomAnchor = l.zoomAnchor ?? null : p.zoomAnchor = null, new Promise((F) => {
      p.complete = F, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(mn));
    });
  }, Kt = (o, l) => {
    var w;
    const p = D.current;
    return (w = p.complete) == null || w.call(p, "cancelled"), p.durationMs = (l == null ? void 0 : l.durationMs) === void 0 ? null : oe(l.durationMs, 120, 5e3), p.start = {
      camera: { ...A.current },
      zoom: P.current
    }, p.startedAt = null, p.target = o, p.stiffness = (l == null ? void 0 : l.stiffness) ?? rt, l ? p.zoomAnchor = l.zoomAnchor ?? null : p.zoomAnchor = null, new Promise((F) => {
      p.complete = F, p.frameId === null && (p.lastFrameAt = null, p.frameId = window.requestAnimationFrame(fn));
    });
  }, Ta = En(
    (o, l) => {
      const p = !h, w = p ? re.mobile : re.desktop;
      if (w.width <= 0 || w.height <= 0)
        return Promise.resolve("unavailable");
      const F = p ? Je : Qe, O = p ? Ot : Bt, we = Xr(
        o,
        pe.processedCompanies,
        F,
        O,
        p,
        1
      );
      if (!we)
        return Promise.resolve("unavailable");
      const De = Rl(w, p, Ke), Ce = l != null && l.anchor ? {
        x: oe(l.anchor.x, 0, 1),
        y: oe(l.anchor.y, 0, 1)
      } : Ke && !p ? Al(w, De) : Nr, Ee = Sl({
        anchor: Ce,
        bounds: we,
        focusMaxZoom: Math.min(
          (l == null ? void 0 : l.maxZoom) ?? (p ? Ao : Ro),
          p ? Zt : Rt
        ),
        insets: De,
        layout: F,
        maxZoom: p ? Zt : Rt,
        minZoom: p ? $t : Ze,
        viewport: w
      });
      if (!Ee)
        return Promise.resolve("unavailable");
      const Te = {
        durationMs: l == null ? void 0 : l.durationMs,
        stiffness: (l == null ? void 0 : l.stiffness) ?? (o.kind === "slug" ? Eo : rt)
      };
      return p ? Kt(Ee, Te) : qt(Ee, Te);
    },
    [
      Qe,
      Ze,
      Bt,
      Ke,
      h,
      Je,
      $t,
      Ot,
      pe.processedCompanies,
      re.desktop,
      re.mobile
    ]
  ), pn = (o) => ([y.current, D.current].forEach((l) => {
    var p;
    l.frameId !== null && window.cancelAnimationFrame(l.frameId), (p = l.complete) == null || p.call(l, "cancelled"), l.complete = null, l.durationMs = null, l.frameId = null, l.lastFrameAt = null, l.startedAt = null, l.zoomAnchor = null;
  }), o.filterState && e(We(o.filterState)), o.companySortMode !== void 0 && c(o.companySortMode), o.significanceDisplayLimit !== void 0 && f(o.significanceDisplayLimit), o.hiddenCompanyIds && Z([...o.hiddenCompanyIds]), o.companyOrderIds && E(ga(o.companyOrderIds)), o.route && (ge(o.route), ve.current = null), o.showTimelineGrid !== void 0 && W(o.showTimelineGrid), (o.desktopCamera || o.desktopZoom !== void 0) && Gt(
    o.desktopZoom ?? N.current,
    o.desktopCamera ?? R.current
  ), (o.mobileCamera || o.mobileZoom !== void 0) && jt(
    o.mobileZoom ?? P.current,
    o.mobileCamera ?? A.current
  ), new Promise((l) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => l()));
  }));
  yi(
    t,
    () => ({
      cancelFocus() {
        [y.current, D.current].forEach((o) => {
          var l;
          o.frameId !== null && window.cancelAnimationFrame(o.frameId), (l = o.complete) == null || l.call(o, "cancelled"), o.complete = null, o.durationMs = null, o.frameId = null, o.lastFrameAt = null, o.startedAt = null, o.zoomAnchor = null;
        });
      },
      focus(o, l) {
        return o.kind === "default" ? h ? qt(ht(Qe), {
          durationMs: l == null ? void 0 : l.durationMs,
          stiffness: l == null ? void 0 : l.stiffness
        }) : Kt(ht(Je, !0), {
          durationMs: l == null ? void 0 : l.durationMs,
          stiffness: l == null ? void 0 : l.stiffness
        }) : Ta(o, l);
      },
      getState() {
        return {
          companyOrderIds: [...H],
          companySortMode: s,
          desktopCamera: { ...R.current },
          desktopZoom: N.current,
          filterState: {
            ...r,
            attributeIds: [...r.attributeIds],
            companyIds: [...r.companyIds],
            domainIds: [...r.domainIds]
          },
          hiddenCompanyIds: [...k],
          mobileCamera: { ...A.current },
          mobileZoom: P.current,
          route: { ...Q },
          showTimelineGrid: K,
          significanceDisplayLimit: d
        };
      },
      restoreState(o) {
        return pn(o);
      },
      setState(o) {
        return pn(o);
      }
    }),
    [
      H,
      s,
      t,
      Qe,
      r,
      k,
      h,
      Ta,
      Je,
      Q,
      K,
      d
    ]
  ), Ne(() => {
    if (!Ke || !ye) {
      Ke || (ve.current = null);
      return;
    }
    !V || M || ue.current !== null || (h ? re.desktop : re.mobile).width <= 0 || ve.current !== ye && Qa(pe.processedCompanies, ye) && (Ta({ kind: "slug", slug: ye }), ve.current = ye);
  }, [
    ye,
    Ke,
    h,
    M,
    V,
    pe.processedCompanies,
    re.desktop,
    re.mobile
  ]), Ne(() => {
    const o = (l) => {
      const p = Dl(l.key);
      if (n || !p || Cl(l) || !V)
        return;
      const w = !h, F = w ? re.mobile : re.desktop;
      if (F.width <= 0 || F.height <= 0)
        return;
      const O = w ? Je : Qe, we = w ? ya : ba, De = El(
        pe.processedCompanies,
        O,
        w,
        we
      );
      if (De.length === 0)
        return;
      const Ce = w ? A.current : R.current, Ee = w ? P.current : N.current, Te = Ml(
        pe.processedCompanies,
        O,
        w,
        we,
        ye,
        Ce,
        Ee,
        F
      ), et = Nl(Te, De, p, {
        excludeSlug: ye,
        minPrimaryDistance: ye ? Ur : 0
      });
      !et || et.slug === ye || (l.preventDefault(), ve.current = null, Vt(et.slug));
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, [
    ye,
    Qe,
    h,
    V,
    Je,
    ya,
    ba,
    n,
    pe.processedCompanies,
    re.desktop,
    re.mobile
  ]);
  const di = () => {
    var l;
    const o = y.current;
    (l = o.complete) == null || l.call(o, "cancelled"), o.complete = null, o.frameId !== null && (window.cancelAnimationFrame(o.frameId), o.frameId = null), o.durationMs = null, o.lastFrameAt = null, o.startedAt = null, o.target = {
      camera: R.current,
      zoom: N.current
    }, o.stiffness = rt, o.zoomAnchor = null;
  }, ui = () => {
    var l;
    const o = D.current;
    (l = o.complete) == null || l.call(o, "cancelled"), o.complete = null, o.frameId !== null && (window.cancelAnimationFrame(o.frameId), o.frameId = null), o.durationMs = null, o.lastFrameAt = null, o.startedAt = null, o.target = {
      camera: A.current,
      zoom: P.current
    }, o.stiffness = rt, o.zoomAnchor = null;
  }, mi = () => {
    const o = S.current;
    me.current = ((o == null ? void 0 : o.clientWidth) ?? re.desktop.width) / 2, ne.current = ((o == null ? void 0 : o.clientHeight) ?? re.desktop.height) / 2, qt(ht(Qe));
  }, fi = () => {
    const o = B.current;
    J.current = ((o == null ? void 0 : o.clientWidth) ?? re.mobile.width) / 2, X.current = ((o == null ? void 0 : o.clientHeight) ?? re.mobile.height) / 2, Kt(ht(Je, !0));
  }, hn = (o, l) => {
    const p = S.current, w = re.desktop, F = oe(
      (l == null ? void 0 : l.x) ?? me.current ?? ((p == null ? void 0 : p.clientWidth) ?? w.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? w.width
    ), O = oe(
      (l == null ? void 0 : l.y) ?? ne.current ?? ((p == null ? void 0 : p.clientHeight) ?? w.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? w.height
    ), we = y.current, De = N.current, Ce = Number(oe(o(De), Ze, Rt).toFixed(3));
    if (Ce === De)
      return;
    const Ee = On({
      anchorX: F,
      anchorY: O,
      camera: R.current,
      existingAnchor: we.zoomAnchor,
      zoom: De
    }), Te = gt(
      Ee.worldX,
      Ee.worldY,
      F,
      O,
      Ce
    );
    qt(
      {
        camera: Te,
        zoom: Ce
      },
      { zoomAnchor: Ee }
    );
  }, gn = (o, l) => {
    const p = B.current, w = re.mobile, F = oe(
      (l == null ? void 0 : l.x) ?? J.current ?? ((p == null ? void 0 : p.clientWidth) ?? w.width) / 2,
      0,
      (p == null ? void 0 : p.clientWidth) ?? w.width
    ), O = oe(
      (l == null ? void 0 : l.y) ?? X.current ?? ((p == null ? void 0 : p.clientHeight) ?? w.height) / 2,
      0,
      (p == null ? void 0 : p.clientHeight) ?? w.height
    ), we = D.current, De = P.current, Ce = Number(oe(o(De), $t, Zt).toFixed(3));
    if (Ce === De)
      return;
    const Ee = On({
      anchorX: F,
      anchorY: O,
      camera: A.current,
      existingAnchor: we.zoomAnchor,
      zoom: De
    }), Te = gt(
      Ee.worldX,
      Ee.worldY,
      F,
      O,
      Ce
    );
    Kt(
      {
        camera: Te,
        zoom: Ce
      },
      { zoomAnchor: Ee }
    );
  };
  nt.current = (o) => {
    if (!S.current || o.deltaY === 0)
      return;
    o.cancelable && o.preventDefault();
    const l = S.current, p = l.getBoundingClientRect(), w = {
      x: oe(o.clientX - p.left, 0, l.clientWidth),
      y: oe(o.clientY - p.top, 0, l.clientHeight)
    };
    me.current = w.x, ne.current = w.y;
    const F = o.deltaMode === 1 ? o.deltaY * 16 : o.deltaMode === 2 ? o.deltaY * l.clientHeight : o.deltaY;
    hn(
      (O) => kt(O, -F * wo, Ze, Rt),
      w
    );
  }, Ne(() => {
    if (!V || !h)
      return;
    const o = S.current;
    if (!o)
      return;
    const l = (p) => nt.current(p);
    return o.addEventListener("wheel", l, { passive: !1 }), () => {
      o.removeEventListener("wheel", l);
    };
  }, [h, V]);
  const pi = (o) => {
    var F;
    if (o.pointerType !== "mouse" || o.button !== 0 || !S.current)
      return;
    const l = S.current, p = l.getBoundingClientRect();
    me.current = o.clientX - p.left, ne.current = o.clientY - p.top, di(), U.current = !1, ue.current = o.pointerId, ce.current = {
      lastX: o.clientX,
      lastY: o.clientY,
      startX: o.clientX,
      startY: o.clientY
    }, l.setPointerCapture(o.pointerId), (F = fe.current) == null || F.call(fe);
    const w = (O) => nt.current(O);
    window.addEventListener("wheel", w, { capture: !0, passive: !1 }), fe.current = () => {
      window.removeEventListener("wheel", w, !0);
    }, or(() => j(!0)), o.preventDefault();
  }, vn = () => {
    if (Re.current = null, !S.current)
      return;
    const o = Xe.current;
    if (!o || ue.current === null)
      return;
    const p = S.current.getBoundingClientRect(), w = o.clientX - p.left;
    me.current = w, ne.current = o.clientY - p.top;
    const F = o.clientX - ce.current.lastX, O = o.clientY - ce.current.lastY, we = {
      x: R.current.x - F / Math.max(N.current, 1e-3),
      y: R.current.y - O / Math.max(N.current, 1e-3)
    };
    y.current.target = {
      camera: we,
      zoom: N.current
    }, R.current = we, ea(te.current, we, N.current), ce.current.lastX = o.clientX, ce.current.lastY = o.clientY;
  }, hi = (o) => {
    if (o.pointerType === "mouse" && S.current) {
      const l = S.current.getBoundingClientRect();
      me.current = oe(
        o.clientX - l.left,
        0,
        S.current.clientWidth
      ), ne.current = oe(
        o.clientY - l.top,
        0,
        S.current.clientHeight
      );
    }
    o.pointerId === ue.current && (Xe.current = {
      clientX: o.clientX,
      clientY: o.clientY
    }, Re.current === null && (Re.current = window.requestAnimationFrame(vn)), o.preventDefault());
  }, gi = (o) => {
    var p;
    if (o.pointerId !== ue.current || !S.current)
      return;
    Re.current !== null && (window.cancelAnimationFrame(Re.current), Re.current = null, vn()), S.current.hasPointerCapture(o.pointerId) && S.current.releasePointerCapture(o.pointerId), ue.current = null, Xe.current = null, (p = fe.current) == null || p.call(fe), fe.current = null, Math.hypot(
      o.clientX - ce.current.startX,
      o.clientY - ce.current.startY
    ) > _n ? U.current = !0 : Ia(
      o.target,
      ye,
      wa,
      { clientX: o.clientX, clientY: o.clientY }
    ), z(R.current), j(!1);
  }, xn = (o, l) => Math.hypot(l.clientX - o.clientX, l.clientY - o.clientY), bn = (o, l) => ({
    clientX: (o.clientX + l.clientX) / 2,
    clientY: (o.clientY + l.clientY) / 2
  }), yn = (o, l) => {
    const p = l.getBoundingClientRect();
    J.current = oe(o.clientX - p.left, 0, l.clientWidth), X.current = oe(o.clientY - p.top, 0, l.clientHeight);
  }, wn = (o, l) => {
    const p = {
      x: A.current.x - o / Math.max(P.current, 1e-3),
      y: A.current.y - l / Math.max(P.current, 1e-3)
    };
    D.current.target = {
      camera: p,
      zoom: P.current
    }, A.current = p, ea(ae.current, p, P.current);
  }, Tn = (o) => o instanceof Element && !o.closest("[data-timeline-pin]") && !!o.closest("button, a, input, label, select, textarea, [data-row-focus-label]"), pt = (o) => ({
    clientX: o.clientX,
    clientY: o.clientY
  }), Nt = (o) => {
    if (o.length === 0) {
      $e.current = null, J.current = null, X.current = null;
      return;
    }
    if (o.length === 1) {
      const F = pt(o[0]);
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
    const l = pt(o[0]), p = pt(o[1]), w = bn(l, p);
    $e.current = {
      distance: Math.max(xn(l, p), 1),
      lastMidpointX: w.clientX,
      lastMidpointY: w.clientY,
      lastX: w.clientX,
      lastY: w.clientY,
      startX: w.clientX,
      startY: w.clientY,
      type: "pinch"
    };
  }, vi = (o) => {
    !B.current || Tn(o.target) || (ui(), Nt(o.touches));
  }, xi = (o) => {
    if (!B.current || Tn(o.target))
      return;
    const l = B.current, p = $e.current;
    if (!p) {
      Nt(o.touches);
      return;
    }
    if (o.touches.length === 1) {
      const Te = pt(o.touches[0]);
      if (yn(Te, l), p.type === "pan") {
        const et = Te.clientX - p.lastX, Dt = Te.clientY - p.lastY;
        wn(et, Dt), p.lastX = Te.clientX, p.lastY = Te.clientY;
      } else
        Nt(o.touches);
      o.preventDefault();
      return;
    }
    if (o.touches.length < 2)
      return;
    const w = pt(o.touches[0]), F = pt(o.touches[1]), O = bn(w, F), we = Math.max(xn(w, F), 1);
    if (yn(O, l), p.type !== "pinch") {
      Nt(o.touches), o.preventDefault();
      return;
    }
    const De = O.clientX - p.lastMidpointX, Ce = O.clientY - p.lastMidpointY;
    wn(De, Ce);
    const Ee = oe(we / Math.max(p.distance, 1), 0.78, 1.28);
    gn((Te) => Te * Ee, {
      x: J.current ?? l.clientWidth / 2,
      y: X.current ?? l.clientHeight / 2
    }), p.distance = we, p.lastMidpointX = O.clientX, p.lastMidpointY = O.clientY, p.lastX = O.clientX, p.lastY = O.clientY, o.preventDefault();
  }, bi = (o) => {
    const l = $e.current;
    if (Nt(o.touches), de(A.current), !l || l.type !== "pan" || o.changedTouches.length === 0)
      return;
    const p = o.changedTouches[0];
    Math.hypot(p.clientX - l.startX, p.clientY - l.startY) > _n || Ia(
      p.target,
      ye,
      wa,
      { clientX: p.clientX, clientY: p.clientY }
    );
  };
  return Be().length === 0 ? /* @__PURE__ */ i(
    rr,
    {
      title: Ye.emptyDataTitle,
      detail: Ye.emptyDataDetail
    }
  ) : pe.invalidEntries.length > 0 ? /* @__PURE__ */ i(
    rr,
    {
      title: Ye.timelineStatusDataErrorTitle,
      detail: Ye.timelineStatusDataErrorDetail(pe.invalidEntries)
    }
  ) : V ? /* @__PURE__ */ g(
    "div",
    {
      "data-timeline-presentation": n ? "" : void 0,
      className: `relative isolate min-h-[100dvh] overflow-hidden bg-[var(--page-bg)] text-[var(--ink)] selection:bg-emerald-500/25 selection:text-[var(--ink)] ${n ? "pointer-events-none" : ""}`,
      children: [
        /* @__PURE__ */ i(fs, {}),
        /* @__PURE__ */ g("div", { className: "relative z-10", children: [
          h ? null : /* @__PURE__ */ i("div", { className: "md:hidden", children: /* @__PURE__ */ i(
            gs,
            {
              activeArticleSlug: ye,
              boardView: ut,
              camera: _,
              currentGlobalDay: Ae,
              handleTouchEnd: bi,
              handleTouchMove: xi,
              handleTouchStart: vi,
              handleZoomChange: gn,
              hiddenCompanyCount: $,
              latestCompany: an,
              minZoom: $t,
              maxZoom: Zt,
              maxDays: Yt,
              maxSummaryQuietDays: nn,
              modelExplorer: /* @__PURE__ */ i(Hn, { ...un, variant: "rail" }),
              monthTicks: ei,
              onCompanyHide: rn,
              onCompanyMove: sn,
              onDismissArticle: dn,
              onModelSelect: Vt,
              onResetCamera: fi,
              onShowHiddenCompanies: on,
              onToggleTimelineGrid: ln,
              processedCompanies: pe.processedCompanies,
              renderWindow: Zr,
              scrollContainerRef: B,
              showTimelineGrid: K,
              timelineStartDay: zt,
              timelineWidth: xa,
              viewport: re.mobile,
              worldRef: ae,
              yearTicks: ti,
              zoom: T
            }
          ) }),
          h ? /* @__PURE__ */ i("div", { className: "hidden md:block", children: /* @__PURE__ */ i(
            hs,
            {
              activeArticleSlug: ye,
              boardView: ut,
              camera: q,
              currentGlobalDay: Ae,
              handlePointerDown: pi,
              handlePointerMove: hi,
              handleZoomChange: hn,
              hiddenCompanyCount: $,
              isPanning: M,
              latestCompany: an,
              maxDays: Ut,
              minZoom: Ze,
              maxZoom: Rt,
              maxSummaryQuietDays: nn,
              modelExplorer: /* @__PURE__ */ i(Hn, { ...un, variant: "rail" }),
              monthTicks: Qr,
              onCompanyHide: rn,
              onCompanyMove: sn,
              onDismissArticle: dn,
              onModelSelect: Vt,
              onResetCamera: mi,
              onShowHiddenCompanies: on,
              onToggleTimelineGrid: ln,
              processedCompanies: pe.processedCompanies,
              renderWindow: Kr,
              scrollContainerRef: S,
              showTimelineGrid: K,
              stopPanning: gi,
              summaryCompanies: Mt,
              timelineStartDay: Xt,
              timelineWidth: va,
              viewport: re.desktop,
              worldRef: te,
              yearTicks: Jr,
              zoom: x
            }
          ) }) : null
        ] }),
        /* @__PURE__ */ i(je, { children: Ke && !n ? /* @__PURE__ */ i(
          ns,
          {
            compact: !h,
            entry: Ie,
            onBack: cn,
            onNavigate: Vt,
            requestedSlug: ye ?? ""
          }
        ) : null })
      ]
    }
  ) : /* @__PURE__ */ i(ps, {});
}
export {
  mr as DAY_MS,
  Ms as TimelineExperience,
  Es as buildTimelineArticleIndex,
  Yi as createTimelineItemSlug,
  Bi as formatDaysSince,
  Le as formatTimelineDate,
  fr as formatTimelineDateRange,
  pr as getTimelineItemSlug,
  zi as getUtcCalendarDayDelta,
  Ts as indexTimelineArticles,
  _e as parseTimelineDate,
  Oi as withDaysSinceFact
};
