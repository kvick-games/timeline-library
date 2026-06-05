export type TimelineClassId = string;
export type TimelineFacetId = string;
export type TimelineTag = string;
export type TimelineLogoMark = string;

export type TimelineEventKind = 'release' | 'event';
export type TimelineDatePrecision = 'day' | 'month' | 'year';
export type ProductMarkerShape = 'circle' | 'square' | 'diamond';

export type PresetConfig = {
  id: TimelineFacetId;
  classId: TimelineClassId;
  label: string;
  description: string;
};

export type TimelineEventTypeConfig = {
  id: string;
  kind: TimelineEventKind;
  label: string;
  shortLabel: string;
  description: string;
};

export type ReleaseRecord = {
  articleSlug?: string;
  classes?: TimelineClassId[];
  datePrecision?: TimelineDatePrecision;
  endDate?: string;
  eventType?: string;
  name: string;
  presets?: TimelineFacetId[];
  tags?: TimelineTag[];
  date: string;
};

export type ProductLineId = string;

export type ProductLineConfig = {
  id: ProductLineId;
  label: string;
  shortLabel: string;
  classId: TimelineClassId;
  markerShape: ProductMarkerShape;
};

export type ProductLineRecord = ProductLineConfig & {
  defaultClasses?: TimelineClassId[];
  defaultPresets?: TimelineFacetId[];
  defaultTags?: TimelineTag[];
  releases: ReleaseRecord[];
};

export type CompanyProfile = {
  id: string;
  name: string;
  accent: string;
  logoMark?: TimelineLogoMark;
  raceRank?: number;
};

export type CompanyRecord = CompanyProfile & {
  defaultClasses: TimelineClassId[];
  defaultPresets: TimelineFacetId[];
  productLines: ProductLineRecord[];
};

export type ProcessedRelease = ReleaseRecord & {
  articleSlug: string;
  classes: TimelineClassId[];
  dateLabel: string;
  dateRangeLabel: string;
  durationDays: number;
  endDateLabel?: string;
  endGlobalDay: number;
  eventKind: TimelineEventKind;
  eventType: string;
  eventTypeLabel: string;
  eventTypeShortLabel: string;
  globalDay: number;
  gap: number;
  presets: TimelineFacetId[];
  significanceScore: number;
  tags: TimelineTag[];
};

export type ProcessedProductLine = Omit<ProductLineRecord, 'releases'> & {
  averageGap: number | null;
  latestRelease: ProcessedRelease | null;
  releases: ProcessedRelease[];
  significanceScore: number;
  startDay: number;
  totalSpan: number;
};

export type ProcessedCompany = Omit<CompanyRecord, 'productLines'> & {
  averageGap: number | null;
  latestProductLine: ProcessedProductLine | null;
  latestRelease: ProcessedRelease | null;
  productLines: ProcessedProductLine[];
  significanceScore: number;
  startDay: number;
  totalSpan: number;
};

export type ArticleFact = {
  label: string;
  value: string;
};

export type ArticleSection = {
  heading: string;
  body: string[];
};

export type ArticleSource = {
  label: string;
  url: string;
};

export type ArticleMedia = {
  alt: string;
  caption?: string;
  src: string;
};

export type ModelLogo = {
  modelLabel: string;
  modelMark: TimelineLogoMark;
};

export type ModelArticle = {
  slug: string;
  release: {
    companyId: string;
    productLineId: string;
    name: string;
    date: string;
    endDate?: string;
  };
  logo: ModelLogo;
  eyebrow: string;
  title: string;
  dek: string;
  summary: string;
  impact: string;
  media?: ArticleMedia;
  facts: ArticleFact[];
  sections: ArticleSection[];
  sources: ArticleSource[];
};

export type ModelReleaseIndexEntry = {
  accent: string;
  article: ModelArticle | null;
  classes: TimelineClassId[];
  companyLogoMark: TimelineLogoMark;
  companyId: string;
  companyName: string;
  date: string;
  dateLabel: string;
  dateRangeLabel: string;
  durationDays: number;
  endDate?: string;
  endDateLabel?: string;
  eventKind: TimelineEventKind;
  eventType: string;
  eventTypeLabel: string;
  eventTypeShortLabel: string;
  name: string;
  nextName: string | null;
  nextSlug: string | null;
  presets: TimelineFacetId[];
  tags: TimelineTag[];
  previousName: string | null;
  previousSlug: string | null;
  productLineId: string;
  productLineLabel: string;
  productLineShortLabel: string;
  slug: string;
};

export type TimelineContentTypeOption = {
  description: string;
  id: string;
  label: string;
};

export type TimelineFilterGroup = {
  label: string;
  domainIds: TimelineFacetId[];
};

export type CompanySortMode = 'significance' | 'latest' | 'alphabetical' | string;
export type SignificanceDisplayLimit = number | 'all';

export type TimelineFilterState = {
  attributeIds: TimelineFacetId[];
  companyIds: string[];
  contentType: string;
  domainIds: TimelineFacetId[];
};

export type TimelineSortOption = {
  id: CompanySortMode;
  label: string;
};

export type TimelineCopy = {
  allRelevantLabel: string;
  articleBackLabel: string;
  clearFiltersLabel: string;
  clearFiltersTitle: string;
  companyFilterEmpty: string;
  companyFiltersHeading: string;
  compositeBoardDescription: (label: string) => string;
  compositeBoardDescriptionMobile: (label: string) => string;
  contentTypeHeading: string;
  defaultBoardDescription: string;
  displayedRowsHeading: string;
  emptyBoardDescription: string;
  emptyBoardDetail: string;
  emptyBoardLabel: string;
  emptyDataDetail: string;
  emptyDataTitle: string;
  filterPanelLabel: string;
  groupPluralLabel: string;
  latestDesktopLabel: string;
  latestMobileLabel: string;
  latestUnavailable: string;
  primaryHeading: string;
  recencyHeading: string;
  resetCameraLabel: string;
  resetFiltersLabel: string;
  resetFiltersTitle: string;
  routeMissingDetail: string;
  routeMissingTitle: string;
  selectAllLabel: string;
  selectAllTitle: string;
  showHiddenLabel: string;
  significanceLabel: string;
  singleBoardDescription: (label: string) => string;
  singleBoardDescriptionMobile: (label: string) => string;
  sortHeading: string;
  statusEyebrow: string;
  timezoneLabel: string;
  timelineGridHideLabel: string;
  timelineGridShowLabel: string;
  timelineInteractionNoteDesktop: string;
  timelineInteractionNoteMobile: string;
  timelineNotesHeading: string;
  timelineStatusDataErrorDetail: (invalidEntries: string[]) => string;
  timelineStatusDataErrorTitle: string;
  todayLabel: string;
};

export type TimelineScoringConfig = {
  getEventTypeSignificanceBonus?: (eventTypeId: string) => number;
  getFacetSignificanceBase?: (facetId: TimelineFacetId) => number;
  getGroupRankBonus?: (group: CompanyRecord) => number;
  getRecencySignificanceBonus?: (releaseEndGlobalDay: number, currentGlobalDay: number) => number;
  getTagSignificanceBonus?: (tags: TimelineTag[]) => number;
};

export type TimelineDefinition = {
  articleIndexBySlug: Record<string, ModelReleaseIndexEntry>;
  attributeFilterIds: TimelineFacetId[];
  contentTypeOptions: TimelineContentTypeOption[];
  defaultClassId: TimelineClassId;
  defaultDisplayLimit: SignificanceDisplayLimit;
  defaultEventTypeId: string;
  defaultFilterState: TimelineFilterState;
  defaultSortMode: CompanySortMode;
  displayLimits: SignificanceDisplayLimit[];
  eventTypes: TimelineEventTypeConfig[];
  facets: PresetConfig[];
  filterGroups: TimelineFilterGroup[];
  groups: CompanyRecord[];
  logoAssetPaths: Partial<Record<TimelineLogoMark, string>>;
  routeItemPathPrefix: string;
  scoring?: TimelineScoringConfig;
  sortOptions: TimelineSortOption[];
  startDate: string;
  wideLogoMarks: TimelineLogoMark[];
  copy: TimelineCopy;
};

export type ArticleLogoMark = TimelineLogoMark;
export type ModelClassId = TimelineClassId;
export type PresetId = TimelineFacetId;
export type TimelineArticle = ModelArticle;
export type TimelineArticleIndexEntry = ModelReleaseIndexEntry;
export type TimelineArticleLogo = ModelLogo;
export type TimelineGroupProfile = CompanyProfile;
export type TimelineGroupRecord = CompanyRecord;
export type TimelineItemRecord = ReleaseRecord;
export type TimelineLaneConfig = ProductLineConfig;
export type TimelineLaneId = ProductLineId;
export type TimelineLaneRecord = ProductLineRecord;
