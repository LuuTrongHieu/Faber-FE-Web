import React from "react";
import cn from "classnames";

interface Props extends React.SVGAttributes<HTMLOrSVGElement> {
    children: React.ReactNode;
    className?: string;
    viewBoxWidth?: number;
    viewBoxHeight?: number;
}

export default function Icon({
    children,
    className,
    viewBoxWidth = 24,
    viewBoxHeight = 24,
    ...props
}: Props): React.ReactElement {
    return (
        <svg
            className={cn(
                "w-full h-full select-none cursor-pointer",
                className ? className : "fill-icon-dark dark:fill-icon"
            )}
            xmlns="http://www.w3.org/2000/svg"
            width={viewBoxWidth}
            height={viewBoxHeight}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            {...props}
        >
            {children}
        </svg>
    );
}
