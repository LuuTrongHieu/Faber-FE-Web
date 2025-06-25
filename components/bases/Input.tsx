/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import cn from "classnames";
import React, { useCallback, useState } from "react";

const INPUT_LEVELS = ["sm", "md", "lg", "xl"] as const;
export type TInputLevel = (typeof INPUT_LEVELS)[number];

interface Props {
    onEnter?: () => void;
    endAdornment?: React.ReactNode;
    classNameContainer?: string;
}

export const Input = React.forwardRef<
    HTMLInputElement,
    Props & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, classNameContainer, onEnter, autoFocus = false, endAdornment, ...props }, ref) => {
    const handleOnEnter: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (onEnter && event.key === "Enter") {
                onEnter();
            }
        },
        [onEnter]
    );
    const [isFocus, setIsFocus] = useState<boolean>(autoFocus);

    const renderWithAdornment = useCallback(() => {
        return (
            <div
                ref={ref}
                className={cn(
                    "input-normal rounded-lg px-[14px]",
                    "flex flex-row items-center justify-between",
                    "text-black border-black/10 placeholder:text-black/30 hover:focus-within:-black",
                    "disabled:border-black/10 disabled:bg-gray-f1",
                    "dark:text-white dark:border-white/10 dark:focus-within:border-white/70 dark:placeholder:text-white/30",
                    classNameContainer,
                    {
                        "border-black dark:border-white/70": isFocus,
                    }
                )}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            >
                <input
                    onKeyDown={handleOnEnter}
                    className={cn(
                        className,
                        "font-input outline-none",
                        "bg-transparent py-2 w-full mr-[14px]"
                    )}
                    {...props}
                />
                {endAdornment}
            </div>
        );
    }, [className, classNameContainer, endAdornment, handleOnEnter, isFocus, props, ref]);

    const renderContent = useCallback(() => {
        if (endAdornment) return renderWithAdornment();

        return (
            <input
                ref={ref}
                onKeyDown={handleOnEnter}
                className={cn(
                    className,
                    "font-input outline-none appearance-none",
                    "bg-transparent rounded-lg py-2 px-[14px]",
                    "input-normal",
                    props.type === "date"
                        ? "dark:invert"
                        : [
                              "text-black border-black/10 placeholder:text-black/30 focus:border-black",
                              "disabled:border-black/10 disabled:bg-gray-f1",
                              "dark:text-white dark:border-white/10 dark:focus:border-white/70 dark:placeholder:text-white/30",
                          ]
                )}
                {...props}
            />
        );
    }, [className, endAdornment, handleOnEnter, props, ref, renderWithAdornment]);

    return renderContent();
});

Input.displayName = "Input";
