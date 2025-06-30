import api from "../api";
import { IGetCurrentUserInfoReturn } from "../types/user";

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUserInfo: builder.query<IGetCurrentUserInfoReturn, unknown>({
            query: (params) => ({
                url: "/api/v1/users/me",
                method: "GET",
                body: params,
            }),
        }),
    }),
});

export default userApi;
