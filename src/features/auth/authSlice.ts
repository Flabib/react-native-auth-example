import { createSlice } from "@reduxjs/toolkit";
import { initialAuthState } from "./authData";
import { RootState } from "../../app/store";
import { login } from "./authAction";
import * as SecureStore from 'expo-secure-store';

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        logout: (state) => {
            state.data.user = null;
        },
        clearAuthState: (state) => {
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.data.user = action.payload.user;

                SecureStore.setItemAsync('accessToken', action.payload.accessToken);
                SecureStore.setItemAsync('user', JSON.stringify(action.payload.user));
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Something went wrong";
            });
    }
});

export const { logout, clearAuthState } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;
export default authReducer;