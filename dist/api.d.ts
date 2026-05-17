import { SessionAuth } from "./types.js";
export declare const API_BASE_URL: string;
type AuthArg = SessionAuth | string | undefined;
export declare function getAuthHeaders(auth: AuthArg): Record<string, string>;
export declare function apiCall(endpoint: string, options?: RequestInit, auth?: AuthArg): Promise<unknown>;
export {};
