import api from "../api";
import { TLoginRequest, TLoginReturn, TRegisterRequest, TRegisterReturn } from "../types/auth";

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<TRegisterReturn, TRegisterRequest>({
            query: (params) => ({
                url: "/auth/register",
                method: "POST",
                body: params,
            }),
        }),
        login: builder.mutation<TLoginReturn, TLoginRequest>({
            query: (params) => ({
                url: "/auth/login",
                method: "POST",
                body: params,
            }),
        }),
    }),
});

export default authApi;
