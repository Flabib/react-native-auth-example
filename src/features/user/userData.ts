import { APIState, User } from "../../../types/app";

export type UserState = APIState<{ users: User[] }>

export const initialUserState: UserState = {
    data: {
        users: [],
    },
    status: "idle",
    error: null
};