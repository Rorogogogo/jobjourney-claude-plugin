import { type ExtractedField, type PageContext } from "./dom-extractor.js";
import { type UserProfile } from "./profile-loader.js";
export interface FillAction {
    action: "fill" | "select" | "check" | "skip";
    index: number;
    value: string;
    reason?: string;
}
export interface FillPlan {
    actions: FillAction[];
    confidence: "high" | "medium" | "low";
    notes?: string;
}
export declare function buildFillPlan(fields: ExtractedField[], profile: UserProfile, pageContext?: PageContext, jobContext?: {
    title?: string;
    company?: string;
    description?: string;
}): Promise<FillPlan>;
