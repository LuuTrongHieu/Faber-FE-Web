/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LOCAL_STORAGE_KEYS } from "@/lib/classes/Storage";
import { useAuthentication } from "@/lib/hooks/useAuthentication";
import { authActions } from "@/lib/redux/features/auth/authSlice";
import { toastMessageActions } from "@/lib/redux/features/toastMessage/toastMessageSlice";
import authApi from "@/lib/services/endpoints/auth";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ToastMessage from "../components/commons/ToastMessage";
import { useAppDispatch, useAppSelector, useModalQueue } from "../lib/hooks/common";

const App = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const modalState = useAppSelector((state) => state.modal);
    const modalQueue = useModalQueue(modalState.queue);
    const bAuthenticated = useAuthentication();
    const [refreshToken] = authApi.useRefreshTokenMutation();
    const refreshInterval = useRef<NodeJS.Timeout | undefined>(undefined);
    const expiredInterval = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        const oldAccessToken = window.localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
        const oldRefreshToken = window.localStorage.getItem(LOCAL_STORAGE_KEYS.refreshToken);
        const oldRefreshTokenExpiredAt = window.localStorage.getItem(
            LOCAL_STORAGE_KEYS.refreshTokenExpiredAt
        );
        if (!oldAccessToken || !oldRefreshToken) {
            dispatch(authActions.logout());
            return;
        }
        refreshToken({ token: oldRefreshToken });
        dispatch(authActions.setRefreshToken(oldRefreshToken || undefined));
        dispatch(authActions.setRefreshTokenExpiredAt(oldRefreshTokenExpiredAt || undefined));
    }, [dispatch]);

    useEffect(() => {
        if (refreshInterval.current) clearInterval(refreshInterval.current);
        if (!authState.accessToken || !authState.refreshToken) return;
        refreshInterval.current = setInterval(async () => {
            if (!authState.refreshToken) return;
            try {
                refreshToken({ token: authState.refreshToken });
            } catch (error) {
                console.error("Session restore failed", error);
                dispatch(authActions.logout());
            }
        }, 58 * 60 * 1000);

        return () => clearInterval(refreshInterval.current);
    }, [authState.refreshToken]);

    useEffect(() => {
        if (expiredInterval.current) {
            clearInterval(expiredInterval.current);
        }

        const checkExpiration = () => {
            const now = dayjs();
            const expireAt = dayjs(authState.refreshTokenExpiredAt);
            const diff = expireAt.diff(now);

            if (diff <= 0) {
                dispatch(authActions.logout());
                toastMessageActions.addToastMessage({
                    title: "Logout",
                    description:
                        "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại để tiếp tục sử dụng",
                    type: "warning",
                });
                router.replace("/login");
            }
        };

        if (authState.refreshTokenExpiredAt) {
            checkExpiration(); // Check once immediately
            expiredInterval.current = setInterval(checkExpiration, 15 * 1000); // every 15 seconds
        }

        return () => {
            if (expiredInterval.current) {
                clearInterval(expiredInterval.current);
            }
        };
    }, [authState.refreshTokenExpiredAt]);

    return (
        <>
            <ToastMessage />
            {modalQueue}
            {children}
        </>
    );
};

export default App;
