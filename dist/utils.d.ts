import type { ArticleFact, CompanyRecord, ModelArticle, ModelReleaseIndexEntry, ReleaseRecord, TimelineDatePrecision, TimelineEventKind, TimelineEventTypeConfig } from './types';
export declare const DAY_MS: number;
export declare function createTimelineItemSlug(groupId: string, laneId: string, itemName: string, date: string): string;
export declare function parseTimelineDate(input: string): Date;
export declare function formatTimelineDate(input: string | Date, options?: Intl.DateTimeFormatOptions, precision?: TimelineDatePrecision): string;
export declare function formatTimelineDateRange(startDate: string, endDate?: string, startPrecision?: TimelineDatePrecision, endPrecision?: TimelineDatePrecision): string;
export declare function getUtcCalendarDayDelta(fromIsoDate: string, toDate?: Date): number | null;
export declare function formatDaysSince(fromIsoDate: string, toDate?: Date): string | null;
export declare function withDaysSinceFact(facts: ArticleFact[], { date, eventKind, now, }: {
    date: string;
    eventKind: TimelineEventKind;
    now?: Date;
}): ArticleFact[];
export declare function getTimelineItemSlug(groupId: string, laneId: string, item: ReleaseRecord): string;
export declare function indexTimelineArticles(articles: ModelArticle[]): Record<string, ModelArticle>;
export declare function buildTimelineArticleIndex({ articlesBySlug, eventTypesById, fallbackEventTypeId, groups, }: {
    articlesBySlug: Record<string, ModelArticle>;
    eventTypesById: Record<string, TimelineEventTypeConfig>;
    fallbackEventTypeId: string;
    groups: CompanyRecord[];
}): ModelReleaseIndexEntry[];
//# sourceMappingURL=utils.d.ts.map