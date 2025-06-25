import { TActionStage } from "@/lib/classes/API";
import { LOCAL_STORAGE_KEYS } from "@/lib/classes/Storage";
import authApi from "@/lib/services/endpoints/auth";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TLoginError = {
    so_dien_thoai?: string;
    password?: string;
    type?: string;
};

export type TAuthState = {
    bGreeting?: boolean;
    bLoggingOut?: boolean;
    bLogging?: TActionStage;
    token?: string;
    loginError?: TLoginError;
};

const initialState: TAuthState = {
    bGreeting: undefined,
    bLoggingOut: undefined,
    bLogging: undefined,
    token: undefined,
    loginError: undefined,
};

const _setToken: CaseReducer<TAuthState, PayloadAction<string | undefined>> = (state, action) => {
    state.token = action.payload;
};

const _resetLoginErrors: CaseReducer<TAuthState> = (state) => {
    state.loginError = undefined;
};

const _startLogout: CaseReducer<TAuthState> = (state) => {
    state.bLoggingOut = true;
};

const _logout: CaseReducer<TAuthState> = (state) => {
    state.bLoggingOut = undefined;
    state.token = undefined;
};

const _setGreeting: CaseReducer<TAuthState, PayloadAction<boolean>> = (state, action) => {
    state.bGreeting = action.payload;
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setToken: _setToken,
        resetLoginErrors: _resetLoginErrors,
        startLogout: _startLogout,
        logout: _logout,
        setGreeting: _setGreeting,
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
            state.bGreeting = true;
        });
        builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
            state.bLogging = "pending";
            state.loginError = undefined;
        });
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.bLogging = "fulfilled";
            const token = action.payload.data.access_token;
            state.token = token;
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.token, token || "");
        });
        builder.addMatcher(authApi.endpoints.login.matchRejected, (state) => {
            state.bLogging = "rejected";
            state.token = undefined;
        });
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
