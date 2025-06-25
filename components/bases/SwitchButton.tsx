"use client";
import classNames from "classnames";
import React, { useCallback } from "react";

interface Props {
    checked?: boolean;
    textInactive?: string;
    textActive?: string;
    className?: string;
    disabled?: boolean;
    backgroundColor?: string;
    backgroundColorActive?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

function SwitchButton({
    checked,
    textInactive,
    textActive,
    className = "",
    backgroundColor = "bg-[#E6E6E6]",
    backgroundColorActive = "bg-[#27AE60]",
    disabled,
    onClick,
}: Props) {
    const handleOnClicked = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            if (disabled) return;
            onClick?.(e);
        },
        [disabled, onClick]
    );

    return (
        <div
            className="cursor-pointer select-none flex flex-row justify-start items-center"
            onClick={handleOnClicked}
        >
            <div
                className={classNames(
                    "rounded-3xl p-[2px] relative text-[12px] leading-[18px]",
                    checked ? backgroundColorActive : backgroundColor,
                    className
                )}
            >
                <div
                    className={classNames(
                        "bg-white w-6/12 h-full relative rounded-[12px] transition-all duration-500 z-0",
                        checked ? "ml-[50%]" : "ml-0"
                    )}
                ></div>
                <div
                    className={classNames(
                        "w-6/12 h-full rounded flex items-center justify-center absolute left-0 top-0",
                        {
                            "text-[#FFFFFF]/70": checked,
                        }
                    )}
                >
                    {textInactive}
                </div>
                <div
                    className={classNames(
                        "w-6/12 h-full rounded flex items-center justify-center absolute left-[50%] top-0",
                        {
                            "text-[#FFFFFF]/70": !checked,
                        }
                    )}
                >
                    {textActive}
                </div>
            </div>
        </div>
    );
}

export default SwitchButton;
