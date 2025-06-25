import api from "../api";
import { TLoginRequest, TLoginReturn, TRegisterRequest, TRegisterReturn } from "../types/auth";

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<TRegisterReturn, TRegisterRequest>({
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
    }),
});

export default authApi;
