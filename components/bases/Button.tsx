"use client";
import cn from "classnames";
import { forwardRef } from "react";

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "fullWidth"> {
    size?: "xs" | "sm" | "md";
    fullWidth?: boolean;
}

export const Button = forwardRef(function Button(
    { children, className, size = "md", fullWidth, ...props }: Props,
    ref: React.Ref<HTMLButtonElement>
) {
    const getSize = {
        xs: "text-[12px] leading-[18px] px-2 py-[9px] rounded-lg",
        sm: "text-[14px] leading-[18px] p-3 rounded-xl",
        md: "text-base leading-5 py-[9px] px-5 rounded-xl",
    };

    return (
        <button
            ref={ref}
            className={cn(
                "font-input font-semibold leading-none whitespace-nowrap select-none btn",
                !className?.includes("btn-text") ? getSize[size] : "",
                {
                    "w-full": fullWidth,
                },

                className
            )}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";
