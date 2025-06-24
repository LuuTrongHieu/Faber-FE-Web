"use client";
import ReactDOM from "react-dom";
import cn from "classnames";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../hooks/common";
import CloseIcon from "../icons/CloseIcon";
import { modalSliceActions } from "@/lib/redux/features/modal/modalSlice";

type Props = {
    children: React.ReactNode;
    className?: string;
    container: HTMLElement;
    bCloseBtn?: boolean;
    bBlockClickBGCloseModal?: boolean;
    onCloseHandler?: () => void;
};
export default function Modal({
    children,
    className,
    container,
    bCloseBtn = true,
    bBlockClickBGCloseModal,
    onCloseHandler,
}: Props): React.ReactElement {
    const dispatch = useAppDispatch();

    const handleOnCloseBtnClicked = useCallback(() => {
        onCloseHandler?.();
        dispatch(modalSliceActions.shiftFromQueue());
    }, [dispatch, onCloseHandler]);

    const handleClickBackground = useCallback(() => {
        if (bBlockClickBGCloseModal) return;
        handleOnCloseBtnClicked();
    }, [handleOnCloseBtnClicked, bBlockClickBGCloseModal]);

    const renderCloseBtn = useCallback(() => {
        if (!bCloseBtn) return;

        return (
            <div
                onClick={handleOnCloseBtnClicked}
                className={cn(
                    "absolute top-5 right-5 z-10",
                    "w-[34px] h-[34px] rounded-[50%]",
                    "flex items-center justify-center border-[1.5px] border-[#A3A3A3] cursor-pointer"
                )}
            >
                <CloseIcon className="fill-[#231815] dark:fill-[#B7B9BA] w-[10.5px] h-[10.5px]" />
            </div>
        );
    }, [bCloseBtn, handleOnCloseBtnClicked]);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center">
            <div
                onClick={handleClickBackground}
                className="absolute top-0 left-0 bottom-0 right-0 bg-modal-backdrop/70"
            ></div>
            <div
                className={cn(
                    "flex flex-col items-start relative mx-6 p-6 bg-modal-light dark:bg-modal-dark rounded-2xl max-h-[80vh] overflow-auto lg:max-h-full ",
                    className
                )}
            >
                {renderCloseBtn()}
                {children}
            </div>
        </div>,
        container
    );
}
