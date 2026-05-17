import { type Page } from "playwright";
export interface AutoFillResult {
    pagesProcessed: number;
    totalFieldsFound: number;
    totalFieldsFilled: number;
    skippedFields: Array<{
        label: string;
        reason: string;
    }>;
    errors: string[];
    resumeUploaded: boolean;
    confidence: "high" | "medium" | "low";
}
export declare function autoFillApplication(page: Page, apiKey: string, jobContext?: {
    title?: string;
    company?: string;
    description?: string;
}, onProgress?: (msg: string) => void): Promise<AutoFillResult>;
