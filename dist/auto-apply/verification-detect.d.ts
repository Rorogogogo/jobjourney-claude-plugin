import { type Page } from "playwright";
export interface VerificationHint {
    detected: boolean;
    type?: "email_code" | "phone_code" | "captcha" | "email_link";
    message?: string;
    email?: string;
    selector?: string;
    instruction?: string;
    searchHints?: {
        siteName?: string;
        domain?: string;
        afterTimestamp: string;
        searchQuery: string;
    };
}
/**
 * Detect if the current page is asking for a verification code or similar challenge.
 * Returns structured hints so any agent can act on it using whatever email/SMS MCP it has.
 */
export declare function detectVerification(page: Page): Promise<VerificationHint>;
