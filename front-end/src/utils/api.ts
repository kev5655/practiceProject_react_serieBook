import { TokenError } from "./Error.ts";

// Add types for window.API_URL
declare global {
    interface Window {
        API_URL?: string;
    }
}

// Get the API URL from the window.API_URL which is set in env-config.js
// This is injected at runtime by our Docker entrypoint script
const serverUrl: string = window.API_URL || 'http://localhost:8081';

/**
 * Request configuration interface
 */
export interface RequestConfig {
    /** API endpoint to call (without base URL) */
    url: string;
    /** HTTP method */
    method?: string;
    /** HTTP headers */
    headers?: Record<string, string>;
    /** Request body (will be stringified if Content-Type is application/json) */
    body?: any;
}

/**
 * Send an HTTP request to the API
 * 
 * @param requestConfig - Configuration for the request
 * @returns Response data as JSON
 * @throws Error|TokenError - Throws appropriate error for API failures
 */
export const sendRequest = async <T = any>(requestConfig: RequestConfig): Promise<T> => {
    // Prepare the request configuration
    const config: RequestInit = {
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers || {},
        body: null
    };

    // Handle JSON content type
    if (requestConfig.headers &&
        requestConfig.headers['Content-Type'] === 'application/json' &&
        requestConfig.body) {
        config.body = JSON.stringify(requestConfig.body);
    } else if (requestConfig.body) {
        config.body = requestConfig.body;
    }

    // Make the request
    const response = await fetch(serverUrl + requestConfig.url, config);

    // Handle non-OK responses
    if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        throw new Error(errorMessage);
    }

    // Parse the response
    const data = await response.json() as T;

    // Check for token errors
    if ((data as any).error_message && typeof (data as any).error_message === 'string' &&
        (data as any).error_message.includes("Token")) {
        console.log("Token error detected:", (data as any).error_message);
        if (TokenError.backendErrors.some(error => (data as any).error_message.includes(error))) {
            throw new TokenError((data as any).error_message);
        }
    }

    return data;
};

/**
 * Get appropriate error message based on response status
 */
const getErrorMessage = async (response: Response): Promise<string> => {
    switch (response.status) {
        case 401:
            return "Authentication failed. Please log in again.";
        case 403:
            return "You don't have permission to access this resource.";
        case 404:
            return "Resource not found or server is not reachable.";
        case 500:
            return "Internal server error. Please try again later.";
        default:
            // Try to get error details from response
            try {
                const errorData = await response.json();
                return errorData.message || errorData.error_message || `Error ${response.status}: Request failed`;
            } catch {
                return `Error ${response.status}: Request failed`;
            }
    }
};

/**
 * Convert a JavaScript object to x-www-form-urlencoded format
 */
export function convert_JSObject_To_x_www_form_urlencoded(data: Record<string, any>): string {
    let formBody: string[] = [];
    for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
    }
    return formBody.join("&");
}
