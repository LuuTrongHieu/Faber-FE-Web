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
    bLoggingOut?: boolean;
    bLogging?: TActionStage;
    loginError?: TLoginError;
    accessToken?: string;
    refreshToken?: string;
    refreshTokenExpiredAt?: string;
};

const initialState: TAuthState = {
    bLoggingOut: false,
    bLogging: undefined,
    loginError: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    refreshTokenExpiredAt: undefined,
};

const _setAccessToken: CaseReducer<TAuthState, PayloadAction<string | undefined>> = (
    state,
    action
) => {
    state.accessToken = action.payload;
    state.bLogging = "fulfilled";
};

const _setRefreshToken: CaseReducer<TAuthState, PayloadAction<string | undefined>> = (
    state,
    action
) => {
    state.refreshToken = action.payload;
};

const _setRefreshTokenExpiredAt: CaseReducer<TAuthState, PayloadAction<string | undefined>> = (
    state,
    action
) => {
    state.refreshTokenExpiredAt = action.payload;
};

const _resetLoginErrors: CaseReducer<TAuthState> = (state) => {
    state.loginError = undefined;
};

const _startLogout: CaseReducer<TAuthState> = (state) => {
    state.bLoggingOut = true;
};

const _logout: CaseReducer<TAuthState> = (state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
    state.refreshTokenExpiredAt = undefined;
    state.bLoggingOut = false;
    state.bLogging = undefined;
    window.localStorage.clear();
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setAccessToken: _setAccessToken,
        setRefreshToken: _setRefreshToken,
        setRefreshTokenExpiredAt: _setRefreshTokenExpiredAt,
        resetLoginErrors: _resetLoginErrors,
        startLogout: _startLogout,
        logout: _logout,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.loginRemember.matchPending, (state) => {
                state.bLogging = "pending";
                state.loginError = undefined;
            })
            .addMatcher(authApi.endpoints.loginRemember.matchFulfilled, (state, action) => {
                state.bLogging = "fulfilled";
                const accessToken = action.payload.access_token;
                const refreshToken = action.payload.refresh_token;
                const refreshTokenExpiredAt = action.payload.expires_at;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.refreshTokenExpiredAt = refreshTokenExpiredAt;
                window.localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken || "");
                window.localStorage.setItem(LOCAL_STORAGE_KEYS.refreshToken, refreshToken || "");
                window.localStorage.setItem(
                    LOCAL_STORAGE_KEYS.refreshTokenExpiredAt,
                    refreshTokenExpiredAt || ""
                );
            })
            .addMatcher(authApi.endpoints.loginRemember.matchRejected, (state) => {
                state.bLogging = "rejected";
                state = {
                    ...state,
                    accessToken: undefined,
                    refreshToken: undefined,
                    refreshTokenExpiredAt: undefined,
                };
            });
        builder
            .addMatcher(authApi.endpoints.refreshToken.matchPending, (state) => {
                state.bLogging = "pending";
                state.loginError = undefined;
            })
            .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
                state.bLogging = "fulfilled";
                const accessToken = action.payload.access_token;
                state.accessToken = accessToken;
                window.localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken || "");
            })
            .addMatcher(authApi.endpoints.refreshToken.matchRejected, (state) => {
                state.bLogging = "rejected";
                state.accessToken = undefined;
                state.refreshToken = undefined;
                state.refreshTokenExpiredAt = undefined;
                window.localStorage.clear();
            });
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
