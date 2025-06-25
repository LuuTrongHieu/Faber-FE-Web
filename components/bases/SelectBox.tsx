"use client";
import cn from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../lib/hooks/common";
import DarkDownOneIcon from "../icons/DarkDownOneIcon";
import DownOneIcon from "../icons/DownOneIcon";
import OptionSelectedTick from "../icons/OptionSelected";

export type TOption = {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
};

type Props = {
    options: TOption[];
    children?: React.ReactNode;
    disabled?: boolean;
    optionsClass?: string;
    optionClass?: string;
    onChange?: (value: string | number) => void;
    defaultValue?: string | number;
    customClassName?: string;
    placeHolder?: string;
    textClassName?: string;
    iconClassName?: string;
    showSelected?: boolean;
    darkThemeDownIcon?: boolean;
};

function SelectBox({
    options,
    placeHolder,
    disabled = false,
    optionsClass = "",
    optionClass = "",
    onChange,
    defaultValue,
    customClassName,
    textClassName,
    iconClassName,
    showSelected,
    darkThemeDownIcon,
}: Props) {
    const [selected, setSelected] = useState<TOption>(
        options.find((option) => option.value === defaultValue) || {
            label: "",
            value: "",
            icon: undefined,
        }
    );
    const { theme } = useAppSelector((state) => state.accessibility);

    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectionPosition, setSelectionPosition] = useState("");
    const [generatedId, setGeneratedId] = useState("");
    const handleExpanded = useCallback(() => {
        if (disabled) return;
        setExpanded((state) => !state);
    }, [disabled]);

    const handleItemOnClick = useCallback(
        (option: TOption) => {
            if (option.value === selected.value) return;
            setSelected(option);
            onChange?.(option.value);
        },
        [onChange, selected]
    );

    const handleCollapse = useCallback(() => {
        setExpanded(false);
    }, []);

    useEffect(() => {
        const position = document
            .getElementById(`selection-list-${generatedId}`)
            ?.getBoundingClientRect();
        const clientHeight = window.innerHeight;
        const positionSelectBox = document
            .getElementById(`selection-box-${generatedId}`)
            ?.getBoundingClientRect();

        if (!position || !positionSelectBox) return;
        if (position?.height + positionSelectBox?.bottom + 50 > clientHeight) {
            setSelectionPosition(`-${position.height + 8}px`);
        } else {
            setSelectionPosition("");
        }
    }, [expanded, generatedId]);

    useEffect(() => {
        const random = `${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`;
        setGeneratedId(random);
    }, []);

    useEffect(() => {
        setSelected(
            options.find((option) => option.value === defaultValue) || {
                label: "",
                value: "",
                icon: undefined,
            }
        );
    }, [defaultValue, options]);

    return (
        <div
            onClick={handleExpanded}
            className={cn(
                "relative px-4 py-[8px] flex items-center cursor-pointer",
                "border border-black/10 rounded-lg dark:border-white/10 !outline-none",
                "transition-all ease-in-out duration-300",
                {
                    "cursor-not-allowed text-black bg-black/10 border-black/10": disabled,
                    "border-black": expanded,
                },
                customClassName
            )}
            tabIndex={0}
            onBlur={handleCollapse}
            id={`selection-box-${generatedId}`}
        >
            <div
                className={cn(
                    "text-black dark:text-white text-base mr-5 flex flex-row items-center",
                    textClassName
                )}
            >
                {selected.icon && <div className="w-5 h-5 mr-3">{selected.icon}</div>}
                {selected?.label ? selected.label : placeHolder || "Select"}
            </div>

            <div
                className={cn(
                    "absolute top-1/2 right-[12px] -translate-y-1/2",
                    "transition-transform duration-300",
                    {
                        "rotate-180 ": expanded,
                        "opacity-50": disabled,
                    }
                )}
            >
                {darkThemeDownIcon && theme === "dark" ? (
                    <DarkDownOneIcon />
                ) : (
                    <DownOneIcon className={iconClassName} />
                )}
            </div>
            {expanded && (
                <div
                    className={cn(
                        "absolute z-10 left-0 right-0 top-full py-[8px]",
                        "bg-white rounded-md drop-shadow-[0px_5px_20px_rgba(0,0,0,0.1)]",
                        "dark:bg-[#2F2F2F]",
                        "overflow-hidden transition-all duration-300 ease-in",
                        expanded ? "max-h-[430px]" : "max-h-0 h-0",
                        optionsClass
                    )}
                    id={`selection-list-${generatedId}`}
                    style={{
                        top: selectionPosition,
                        marginTop: selectionPosition ? "0" : "8px",
                    }}
                >
                    {options?.map((option, index) => (
                        <div
                            onClick={() => {
                                handleItemOnClick(option);
                            }}
                            key={index}
                            className={cn(
                                "px-4 py-3 text-base",
                                "hover:bg-secondary-4 hover:text-secondary-3",
                                "hover:dark:bg-black/20 dark:text-white hover:dark:text-secondary-3",
                                "flex flex-row items-center",
                                option.value === selected.value &&
                                    showSelected &&
                                    "text-[#00A0F2] justify-between",
                                optionClass
                            )}
                        >
                            <div className={cn("flex", showSelected && "gap-[5px] items-center")}>
                                {option.icon && <div className="h-5 w-5 mr-3">{option.icon}</div>}
                                {option.label}
                            </div>
                            {showSelected && option.value === selected.value && (
                                <OptionSelectedTick />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SelectBox;
