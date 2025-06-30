import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { TAppDispatch, TRootState } from "../redux/store";
import { authActions } from "../redux/features/auth/authSlice";
import { LOCAL_STORAGE_KEYS } from "../classes/Storage";

export const authMiddleware: Middleware =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store: MiddlewareAPI<TAppDispatch, TRootState>) => (next) => async (action: any) => {
        switch (action.type) {
            default: {
                const token = store.getState().auth.accessToken;
                const oldToken = window.localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
                if (oldToken && !token && action.type !== authActions.setAccessToken.type) {
                    store.dispatch(authActions.setAccessToken(oldToken));
                    return next(action);
                }
                if (
                    (action.payload?.error && action.payload.error.status === 401) ||
                    (action.payload && action.payload.status === 401)
                ) {
                    store.dispatch(authActions.logout());
                    return;
                }

                const result = next(action);

                return result;
            }
        }
    };
