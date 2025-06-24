"use client";
import classNames from "classnames";
import { useCallback } from "react";
import CheckedIcon from "../icons/CheckedIcon";

interface Props {
    checked?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    groupClassName?: {
        wrapClassName?: string;
        boxClassName?: string;
        checkClassName?: string;
    };
}

function CheckBox({ checked, disabled, children, onClick, groupClassName }: Props) {
    const handleOnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            if (disabled) return;
            onClick?.();
        },
        [disabled, onClick]
    );

    const handleOnKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key !== " " && e.key !== "Enter") return;
            onClick?.();
        },
        [onClick]
    );

    return (
        <div
            className={classNames(
                "cursor-pointer select-none flex flex-row justify-start items-center relative",
                groupClassName?.wrapClassName
            )}
            onClick={handleOnClicked}
        >
            <div
                className={classNames(
                    "w-5 h-5 border-[2px] rounded-[6px] flex justify-center items-center",
                    "border-gray-d9 dark:border-white/50",
                    groupClassName?.boxClassName,
                    { "!border-slate-500": disabled }
                )}
                onKeyDown={handleOnKeyDown}
                tabIndex={0}
            >
                {checked && (
                    <div
                        className={classNames(
                            "bg-secondary-2 rounded-[6px]",
                            "absolute flex items-center justify-center h-full w-[20px]",
                            groupClassName?.checkClassName,
                            {
                                "!bg-slate-500": disabled,
                            }
                        )}
                    >
                        <CheckedIcon className="fill-white w-[16px] h-[12px]" />
                    </div>
                )}
            </div>
            {children && (
                <div
                    className={classNames(
                        "ml-2 first:ml-0 leading-none text-black dark:text-white text-base",
                        // checked ? "dark:text-white" : "dark:text-white/30",
                        { "!text-slate-500": disabled }
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export default CheckBox;
