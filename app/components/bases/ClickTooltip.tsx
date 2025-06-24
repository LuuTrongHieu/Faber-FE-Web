"use client";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Props = {
    message: string | React.ReactNode;
    children: React.ReactNode;
    positionY?: "center" | "left" | "right";
    positionX?: "top" | "bottom";
    className?: string;
    classNameChildren?: string;
    suffixClassName?: string;
    contentClassName?: string;
};

const ClickTooltip: React.FC<Props> = ({
    message,
    children,
    positionY = "center",
    positionX = "top",
    className,
    classNameChildren,
    suffixClassName,
    contentClassName,
}) => {
    const [generatedId, setGeneratedId] = useState("");
    const [contentPosition, setContentPosition] = useState({
        left: "",
        right: "",
    });
    const [suffixPosition, setSuffixPosition] = useState({
        left: "",
        right: "",
    });

    const [isShow, setIsShow] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const loadPosition = useCallback(() => {
        const container = document
            .getElementById(`tooltip-container-${generatedId}`)
            ?.getBoundingClientRect();
        const content = document
            .getElementById(`tooltip-content-${generatedId}`)
            ?.getBoundingClientRect();
        const children = document
            .getElementById(`tooltip-position-${generatedId}`)
            ?.getBoundingClientRect();
        if (!container || !children || !content) return;
        console.log(
            "test",
            document.getElementById(`tooltip-container-${generatedId}`),
            document.getElementById(`tooltip-content-${generatedId}`),
            document.getElementById(`tooltip-position-${generatedId}`)
        );
        const contentPosition = {
            left: "",
            right: "",
        };
        const suffixPosition = {
            left: "",
            right: "",
        };
        switch (positionY) {
            case "center":
                contentPosition.left = `${(container.width - content.width) / 2}px`;
                suffixPosition.left = `${(content.width - children.width) / 2}px`;
                break;
            case "left":
                contentPosition.left = "0";
                suffixPosition.left = `${container.width / 2}px`;
                break;
            case "right":
                contentPosition.right = "0";
                suffixPosition.right = `${container.width / 2}px`;
                break;
            default:
                break;
        }
        setContentPosition(contentPosition);
        setSuffixPosition(suffixPosition);
    }, [generatedId, positionY]);

    const handleClickTooltip = useCallback(() => {
        setTimeout(() => {
            loadPosition();
        }, 0.1);
        setIsShow(true);
    }, [loadPosition]);

    const handleClickOutside = useCallback((event: Event) => {
        if (
            (tooltipRef.current && !tooltipRef.current?.contains(event.target as Node)) ||
            Array.from((event.target as HTMLDivElement)?.classList).findIndex(
                (ele: string | unknown) => ele === "got-it"
            ) !== -1
        ) {
            setIsShow(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        const random = `${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`;
        setGeneratedId(random);
    }, []);

    useEffect(() => {
        document
            .getElementById(`tooltip-container-${generatedId}`)
            ?.addEventListener("mouseenter", loadPosition);

        return () => {
            document
                .getElementById(`tooltip-container-${generatedId}`)
                ?.removeEventListener("mouseenter", loadPosition);
        };
    }, [generatedId, loadPosition]);

    useEffect(() => {
        loadPosition();
    }, [loadPosition, message]);

    return (
        <div
            className={classNames("relative inline-block group", classNameChildren)}
            id={`tooltip-container-${generatedId}`}
            onClick={handleClickTooltip}
        >
            {children}
            {isShow && (
                <>
                    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center lg:min-w-[1240px] lg:w-full">
                        <div className="absolute top-0 left-0 bottom-0 right-0 bg-modal-backdrop/70"></div>
                    </div>
                    <div
                        className={classNames(
                            "break-words absolute z-[999]",
                            positionX === "top" ? "mb-9" : "-mb-11",
                            contentClassName
                        )}
                        id={`tooltip-content-${generatedId}`}
                        style={{
                            ...contentPosition,
                        }}
                        ref={tooltipRef}
                    >
                        <div
                            className={classNames(
                                "relative z-10 text-[14px] text-center bg-white text-black dark:text-[#FFFFFFE5] dark:bg-[#333333] shadow-lg rounded-[20px]",
                                className
                            )}
                        >
                            {message}
                        </div>
                        <div
                            className={classNames(
                                "w-3 h-3 -mt-[6px] rotate-45 bg-white dark:bg-[#333333]",
                                "absolute",
                                {
                                    "top-0": positionX === "bottom",
                                },
                                suffixClassName
                            )}
                            id={`tooltip-position-${generatedId}`}
                            style={{
                                ...suffixPosition,
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ClickTooltip;
