"use client";
import store, { TAppStore } from "@/lib/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<TAppStore | null>(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store;
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
