import React from 'react';
import type { CompanySortMode, SignificanceDisplayLimit, TimelineDefinition, TimelineFilterState } from './types';
export type TimelineExperienceRoute = {
    kind: 'timeline';
} | {
    kind: 'model';
    slug: string;
};
export type TimelineExperienceFocusTarget = {
    kind: 'default';
} | {
    kind: 'slug';
    slug: string;
} | {
    kind: 'slugs';
    slugs: string[];
};
export type TimelineExperienceFocusOptions = {
    anchor?: {
        x: number;
        y: number;
    };
    maxZoom?: number;
    stiffness?: number;
};
export type TimelineExperienceTransitionResult = 'completed' | 'cancelled' | 'unavailable';
export type TimelineExperienceState = {
    companyOrderIds: string[];
    companySortMode: CompanySortMode;
    desktopCamera: CameraState;
    desktopZoom: number;
    filterState: TimelineFilterState;
    hiddenCompanyIds: string[];
    mobileCamera: CameraState;
    mobileZoom: number;
    route: TimelineExperienceRoute;
    showTimelineGrid: boolean;
    significanceDisplayLimit: SignificanceDisplayLimit;
};
export type TimelineExperienceStatePatch = Partial<TimelineExperienceState>;
export type TimelineExperienceController = {
    cancelFocus: () => void;
    focus: (target: TimelineExperienceFocusTarget, options?: TimelineExperienceFocusOptions) => Promise<TimelineExperienceTransitionResult>;
    getState: () => TimelineExperienceState;
    restoreState: (state: TimelineExperienceState) => Promise<void>;
    setState: (state: TimelineExperienceStatePatch) => Promise<void>;
};
export type TimelineExperienceProps = {
    controllerRef?: React.Ref<TimelineExperienceController>;
    definition: TimelineDefinition;
    presentation?: boolean;
};
type CameraState = {
    x: number;
    y: number;
};
export declare function TimelineExperience({ controllerRef, definition, presentation }: TimelineExperienceProps): React.JSX.Element;
export {};
//# sourceMappingURL=TimelineExperience.d.ts.map