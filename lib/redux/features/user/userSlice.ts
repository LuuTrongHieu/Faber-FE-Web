import userApi from "@/lib/services/endpoints/user";
import { IGetCurrentUserInfoReturn } from "@/lib/services/types/user";
import { createSlice } from "@reduxjs/toolkit";

export type TUserState = {
    user?: IGetCurrentUserInfoReturn;
};

const initialState: TUserState = {
    user: undefined,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.getCurrentUserInfo.matchFulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
