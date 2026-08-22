import type {
  ArticleFact,
  CompanyRecord,
  ModelArticle,
  ModelReleaseIndexEntry,
  ReleaseRecord,
  TimelineDatePrecision,
  TimelineEventKind,
  TimelineEventTypeConfig,
} from './types';

export const DAY_MS = 1000 * 60 * 60 * 24;

export function createTimelineItemSlug(groupId: string, laneId: string, itemName: string, date: string) {
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  return `${slugify(groupId)}-${slugify(laneId)}-${slugify(itemName)}-${date}`;
}

export function parseTimelineDate(input: string) {
  return new Date(`${input}T00:00:00Z`);
}

export function formatTimelineDate(
  input: string | Date,
  options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric', year: 'numeric'},
  precision: TimelineDatePrecision = 'day',
) {
  const parsedDate = typeof input === 'string' ? parseTimelineDate(input) : input;

  if (Number.isNaN(parsedDate.getTime())) {
    return typeof input === 'string' ? input : 'Date unavailable';
  }

  if (precision === 'year') {
    return parsedDate.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
    });
  }

  if (precision === 'month') {
    return parsedDate.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      month: 'short',
      year: 'numeric',
    });
  }

  return parsedDate.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    ...options,
  });
}

export function formatTimelineDateRange(
  startDate: string,
  endDate?: string,
  startPrecision: TimelineDatePrecision = 'day',
  endPrecision: TimelineDatePrecision = 'day',
) {
  if (!endDate || endDate === startDate) {
    return formatTimelineDate(startDate, undefined, startPrecision);
  }

  const start = parseTimelineDate(startDate);
  const end = parseTimelineDate(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${startDate} - ${endDate}`;
  }

  if (end.getTime() < start.getTime()) {
    return `${formatTimelineDate(startDate, undefined, startPrecision)} - ${formatTimelineDate(endDate, undefined, endPrecision)}`;
  }

  if (startPrecision !== 'day' || endPrecision !== 'day') {
    return `${formatTimelineDate(start, undefined, startPrecision)} - ${formatTimelineDate(end, undefined, endPrecision)}`;
  }

  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth) {
    return `${formatTimelineDate(start, {month: 'short', day: 'numeric'})}-${formatTimelineDate(end, {day: 'numeric'})}, ${end.getUTCFullYear()}`;
  }

  if (sameYear) {
    return `${formatTimelineDate(start, {month: 'short', day: 'numeric'})} - ${formatTimelineDate(end, {month: 'short', day: 'numeric', year: 'numeric'})}`;
  }

  return `${formatTimelineDate(start)} - ${formatTimelineDate(end)}`;
}

export function getUtcCalendarDayDelta(fromIsoDate: string, toDate: Date = new Date()): number | null {
  const from = parseTimelineDate(fromIsoDate);

  if (Number.isNaN(from.getTime())) {
    return null;
  }

  const fromUtc = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  const toUtc = Date.UTC(toDate.getUTCFullYear(), toDate.getUTCMonth(), toDate.getUTCDate());
  return Math.round((toUtc - fromUtc) / DAY_MS);
}

export function formatDaysSince(fromIsoDate: string, toDate: Date = new Date()): string | null {
  const days = getUtcCalendarDayDelta(fromIsoDate, toDate);

  if (days === null) {
    return null;
  }

  if (days === 0) {
    return 'Today';
  }

  if (days === 1) {
    return '1 day ago';
  }

  if (days === -1) {
    return 'Tomorrow';
  }

  if (days > 1) {
    return `${days.toLocaleString('en-US')} days ago`;
  }

  return `in ${Math.abs(days).toLocaleString('en-US')} days`;
}

export function withDaysSinceFact(
  facts: ArticleFact[],
  {
    date,
    eventKind,
    now,
  }: {
    date: string;
    eventKind: TimelineEventKind;
    now?: Date;
  },
): ArticleFact[] {
  const value = formatDaysSince(date, now);

  if (!value) {
    return facts;
  }

  const label = eventKind === 'event' ? 'Time since event' : 'Time since release';
  const ageFact: ArticleFact = {label, value};
  const existingIndex = facts.findIndex((fact) => fact.label === label);

  if (existingIndex >= 0) {
    return facts.map((fact, index) => (index === existingIndex ? ageFact : fact));
  }

  const dateLabel = eventKind === 'event' ? 'Event date' : 'Release date';
  const dateIndex = facts.findIndex((fact) => fact.label === dateLabel);

  if (dateIndex === -1) {
    return [...facts, ageFact];
  }

  return [...facts.slice(0, dateIndex + 1), ageFact, ...facts.slice(dateIndex + 1)];
}

export function getTimelineItemSlug(groupId: string, laneId: string, item: ReleaseRecord) {
  return item.articleSlug ?? createTimelineItemSlug(groupId, laneId, item.name, item.date);
}

export function indexTimelineArticles(articles: ModelArticle[]) {
  return articles.reduce<Record<string, ModelArticle>>((articlesBySlug, article) => {
    articlesBySlug[article.slug] = article;
    return articlesBySlug;
  }, {});
}

export function buildTimelineArticleIndex({
  articlesBySlug,
  eventTypesById,
  fallbackEventTypeId,
  groups,
}: {
  articlesBySlug: Record<string, ModelArticle>;
  eventTypesById: Record<string, TimelineEventTypeConfig>;
  fallbackEventTypeId: string;
  groups: CompanyRecord[];
}) {
  const entries: ModelReleaseIndexEntry[] = [];

  groups.forEach((group) => {
    group.productLines.forEach((lane) => {
      const sortedItems = [...lane.releases].sort(
        (left, right) => parseTimelineDate(left.date).getTime() - parseTimelineDate(right.date).getTime(),
      );
      const itemSlugs = sortedItems.map((item) => getTimelineItemSlug(group.id, lane.id, item));

      sortedItems.forEach((item, itemIndex) => {
        const slug = itemSlugs[itemIndex];
        const eventType = eventTypesById[item.eventType ?? fallbackEventTypeId] ?? eventTypesById[fallbackEventTypeId];
        const startDate = parseTimelineDate(item.date);
        const endDate = item.endDate ? parseTimelineDate(item.endDate) : startDate;
        const durationDays = Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())
          ? 1
          : Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / DAY_MS) + 1);

        entries.push({
          accent: group.accent,
          article: articlesBySlug[slug] ?? null,
          classes: item.classes ?? lane.defaultClasses ?? group.defaultClasses ?? [lane.classId],
          companyLogoMark: group.logoMark ?? 'generic',
          companyId: group.id,
          companyName: group.name,
          date: item.date,
          dateLabel: formatTimelineDate(item.date, undefined, item.datePrecision),
          dateRangeLabel: formatTimelineDateRange(item.date, item.endDate, item.datePrecision),
          durationDays,
          endDate: item.endDate,
          endDateLabel: item.endDate ? formatTimelineDate(item.endDate) : undefined,
          eventKind: eventType.kind,
          eventType: eventType.id,
          eventTypeLabel: eventType.label,
          eventTypeShortLabel: eventType.shortLabel,
          name: item.name,
          nextName: sortedItems[itemIndex + 1]?.name ?? null,
          nextSlug: itemSlugs[itemIndex + 1] ?? null,
          presets: item.presets ?? lane.defaultPresets ?? group.defaultPresets,
          tags: item.tags ?? lane.defaultTags ?? [],
          previousName: sortedItems[itemIndex - 1]?.name ?? null,
          previousSlug: itemSlugs[itemIndex - 1] ?? null,
          productLineId: lane.id,
          productLineLabel: lane.label,
          productLineShortLabel: lane.shortLabel,
          slug,
        });
      });
    });
  });

  return entries;
}
