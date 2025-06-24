"use client";
import classNames from "classnames";
import React, { useCallback } from "react";

interface Props {
    onEnter?: () => void;
    endAdornment?: React.ReactNode;
    classNameContainer?: string;
}

export const TextArea = React.forwardRef<
    HTMLTextAreaElement,
    Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
    const renderContent = useCallback(() => {
        return (
            <textarea
                ref={ref}
                placeholder={props.placeholder}
                className={classNames(
                    className,
                    "font-input outline-none appearance-none",
                    "bg-transparent rounded-lg py-2 px-[14px]",
                    "input-normal",
                    "placeholder:text-[16px]",
                    "placeholder:font-normal dark:caret-white",
                    "text-black border-black/10 placeholder:text-black/30 focus:border-black",
                    "disabled:border-black/10 disabled:bg-gray-f1",
                    "dark:text-white dark:border-white/10 dark:focus:border-white/70 dark:placeholder:text-white/30"
                )}
                {...props}
            />
        );
    }, [className, props, ref]);

    return renderContent();
});

TextArea.displayName = "TextArea";
