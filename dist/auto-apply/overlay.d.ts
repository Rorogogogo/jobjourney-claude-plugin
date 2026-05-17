import { type Page } from "playwright";
/**
 * Inject the auto-apply progress overlay (top-right floating card).
 * Mirrors the scraping overlay style from src/scraper/core/browser.ts.
 */
export declare function injectAutoApplyOverlay(page: Page): Promise<void>;
/**
 * Update the overlay progress. Silently no-ops if page closed or overlay removed.
 */
export declare function updateAutoApplyOverlay(page: Page, update: {
    text: string;
    percent: number;
    fieldsFilled?: number;
}): Promise<void>;
/**
 * Mark the overlay as complete (green checkmark, no spinner).
 */
export declare function completeAutoApplyOverlay(page: Page, summary: {
    fieldsFilled: number;
    totalFields: number;
    confidence: string;
}): Promise<void>;
