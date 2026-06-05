import type {
  CompanyRecord,
  ModelArticle,
  ModelReleaseIndexEntry,
  ReleaseRecord,
  TimelineDatePrecision,
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
