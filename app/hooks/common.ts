"use client";
import Modal, { TModalData } from "@/lib/classes/Modal";
import { TAppDispatch, TRootState } from "@/lib/redux/store";
import { JSX, useCallback, useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useGlobalContainer = (): HTMLElement | undefined => {
    const [container, setContainer] = useState<HTMLElement>();

    const getContainer = useCallback(() => document.body, []);

    useEffect(() => {
        setContainer(getContainer());
    }, [getContainer]);

    return container;
};

export const useModalQueue = (queue: Array<TModalData>): React.ReactNode => {
    const [modal, setModal] = useState<JSX.Element>();
    const container = useGlobalContainer();
    useEffect(() => {
        if (!container) return;
        const modalGenerator = Modal.generateFromQueue(queue, container);
        setModal(modalGenerator.next().value);
    }, [container, queue]);

    return modal;
};
