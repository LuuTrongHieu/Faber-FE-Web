"use client";
import classNames from "classnames";
import React, { BaseHTMLAttributes, useCallback } from "react";

interface Props extends BaseHTMLAttributes<HTMLElement> {
    checked?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

function CheckBox({ checked, disabled, children, onClick, ...props }: Props) {
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
            {...props}
        >
            <div
                className={classNames(
                    "w-[18px] h-[18px] border border-black rounded-full flex justify-center items-center",
                    { "!border-slate-500": disabled }
                )}
            >
                {checked && (
                    <div
                        className={classNames("bg-black w-[10px] h-[10px] rounded-full", {
                            "!bg-slate-500": disabled,
                        })}
                    ></div>
                )}
            </div>
            {children && (
                <div
                    className={classNames("ml-2 first:ml-0 leading-none", {
                        "!text-slate-500": disabled,
                    })}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export default CheckBox;
