import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRootState } from "../redux/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as TRootState;
        const { token } = state.auth;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        headers.set("User-Agent", navigator.userAgent);
        headers.append("Max-Touch-Points", String(navigator.maxTouchPoints));
        headers.append("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);
        return headers;
    },
});

const api = createApi({
    baseQuery,
    endpoints: () => ({}),
    keepUnusedDataFor: 0,
});

export default api;
