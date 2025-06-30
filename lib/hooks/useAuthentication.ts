import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "./common";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../classes/Storage";
import { modalSliceActions } from "../redux/features/modal/modalSlice";

export const useAuthentication = (): boolean => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { accessToken } = useAppSelector((state) => state.auth);
    const [bAuthenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (accessToken) {
            setAuthenticated(true);
            return;
        }

        if (window.localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken)) {
            setAuthenticated(true);
            return;
        }

        setAuthenticated(false);
        dispatch(modalSliceActions.clearAll());
        router.replace("/login");
    }, [dispatch, accessToken, router]);

    return bAuthenticated;
};
