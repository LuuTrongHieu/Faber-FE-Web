"use client";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";

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

const Tooltip: React.FC<Props> = ({
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
        >
            {children}
            <div
                className={classNames(
                    "break-words absolute bottom-0 invisible group-hover:visible",
                    positionX === "top" ? "mb-9" : "-mb-11",
                    contentClassName
                )}
                id={`tooltip-content-${generatedId}`}
                style={{
                    ...contentPosition,
                }}
            >
                <div
                    className={classNames(
                        "relative z-10 p-2 text-[14px] text-white text-center bg-gray-600 shadow-lg rounded-md",
                        className
                    )}
                >
                    {message}
                </div>
                <div
                    className={classNames(
                        "w-3 h-3 -mt-[6px] rotate-45 bg-gray-600",
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
        </div>
    );
};

export default Tooltip;
