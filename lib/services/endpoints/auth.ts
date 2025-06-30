import api from "../api";
import {
    IRefreshTokenRequest,
    IRefreshTokenResponse,
    TLoginRequest,
    TLoginReturn,
    TRegisterRequest,
} from "../types/auth";

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<boolean, TRegisterRequest>({
            query: (params) => ({
                url: "/api/v1/auth/register-request",
                method: "POST",
                body: params,
            }),
        }),
        login: builder.mutation<TLoginReturn, TLoginRequest>({
            query: (params) => ({
                url: "/api/v1/auth/login",
                method: "POST",
                body: params,
            }),
        }),
        loginRemember: builder.mutation<TLoginReturn, TLoginRequest>({
            query: (params) => ({
                url: "/api/v1/auth/login/remember",
                method: "POST",
                body: params,
            }),
        }),
        refreshToken: builder.mutation<IRefreshTokenResponse, IRefreshTokenRequest>({
            query: (params) => ({
                url: "/api/v1/auth/refresh-token",
                method: "POST",
                params,
            }),
        }),
    }),
});

export default authApi;
