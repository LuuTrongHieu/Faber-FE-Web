"use client";
import cn from "classnames";
import { useCallback } from "react";

type Props = {
    value: boolean;
    onClick: (val: boolean) => void;
    className?: string;
};

const ToggleButton = ({ className, value, onClick }: Props) => {
    const handleClickToggleBtn = useCallback(() => {
        onClick?.(!value);
    }, [onClick, value]);

    return (
        <div
            className={cn(
                "w-9 rounded-xl p-1 relative cursor-pointer flex",
                value ? "bg-secondary-2" : "bg-gray-2",
                value ? "flex-row-reverse" : "flex-row",
                "transition-all duration-100",
                className
            )}
            onClick={handleClickToggleBtn}
        >
            <div className={cn("w-3 h-3 rounded-[50%] bg-white")} />
        </div>
    );
};

export default ToggleButton;
