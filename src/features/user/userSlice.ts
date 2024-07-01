import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "./userData";
import { getUsers } from "./authAction";
import { RootState } from "../../app/store";

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.data.users = action.payload;
            })
            .addCase(getUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export const selectUser = (state: RootState) => state.user;

const userReducer = userSlice.reducer;
export default userReducer;