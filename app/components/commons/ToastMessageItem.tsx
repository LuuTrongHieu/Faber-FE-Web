"use client";
import classNames from "classnames";
import React, { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../hooks/common";
import { IToast, toastMessageActions } from "@/lib/redux/features/toastMessage/toastMessageSlice";
import SuccessToastIcon from "../icons/SuccessToastIcon";
import DangerToastIcon from "../icons/DangerToastIcon";
import WarningIcon from "../icons/WarningIcon";
import CloseToastIcon from "../icons/CloseToastIcon";

const TOAST_TIME = 5000;

const ToastMessageItem = ({ id, title, description, type }: IToast) => {
    const dispatch = useAppDispatch();
    const colorList = {
        success: "bg-secondary-3 text-[#FFF]",
        danger: "bg-main text-[#FFF]",
        info: "bg-secondary-3 text-[#FFF]",
        warning: "bg-secondary-1 text-[#000]",
    };

    const iconList = {
        success: <SuccessToastIcon className="w-7 h-7" />,
        danger: <DangerToastIcon className="w-7 h-7" />,
        info: <WarningIcon className="w-7 h-7" />,
        warning: <WarningIcon className="w-7 h-7" />,
    };

    const handleOnCloseBtnClicked = useCallback(
        (index: number) => {
            dispatch(toastMessageActions.removeToastMessage(index));
        },
        [dispatch]
    );

    useEffect(() => {
        if (!id) return;
        const timeout = setTimeout(() => {
            dispatch(toastMessageActions.removeToastMessage(id));
        }, TOAST_TIME);
        return () => {
            clearTimeout(timeout);
        };
    }, [dispatch, id]);

    return (
        <div
            className={classNames(
                "animate-[toastIn_5s_ease-in-out_forwards]",
                "relative transition-all overflow-hidden",
                "w-[370px] m-h-20 py-[14px] pr-[44px] pl-[50px] rounded-tl-lg rounded-bl-lg mt-2 origin-right",
                colorList[type]
            )}
        >
            <div className={classNames("absolute top-[12.5px] left-[12.5px]", "w-7 h-7")}>
                {iconList[type]}
            </div>

            <div>
                <p className="text-base font-semibold text-white">{title}</p>
                <p className="text-h9 text-white/70 mt-1">{description}</p>
            </div>

            <button
                onClick={() => {
                    if (!id) return;
                    handleOnCloseBtnClicked(id);
                }}
                className="absolute w-[12px] top-6 right-5"
            >
                <CloseToastIcon className="stroke-white" />
            </button>
        </div>
    );
};

export default ToastMessageItem;
