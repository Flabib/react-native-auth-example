import { APIState, User } from "../../../types/app";
import * as SecureStore from 'expo-secure-store';

export type AuthState = APIState<{
    user: User | null,
}>

export const initialAuthState: AuthState = {
    data: {
        user: SecureStore.getItem('user') ? JSON.parse(SecureStore.getItem('user') as string) : null,
    },
    status: "idle",
    error: null
};