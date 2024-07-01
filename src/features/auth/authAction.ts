import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const login = createAsyncThunk(
    "auth/login",
    async (data: { email: string, password: string }) => {
        const response = await authService.login(data);
        return response.data;
    }
);