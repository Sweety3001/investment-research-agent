
export interface ApiError {
    code: string;
    message: string;
    details?: unknown;
}
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: ApiError;
}