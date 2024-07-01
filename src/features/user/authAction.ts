import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/userService";

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async () => {
        const response = await userService.getUsers();
        return response.data;
    }
);