export interface APIState<T> {
    data: T;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface User {
    name: string;
    email: string;
    password: string;
}