"use client";
import classNames from "classnames";
import ReactDOM from "react-dom";
import { useAppSelector } from "../../lib/hooks/common";
import ToastMessageItem from "./ToastMessageItem";
import { useEffect, useState } from "react";

interface Props {
    container?: HTMLElement;
}

const ToastMessage = ({ container }: Props) => {
    const { toastList } = useAppSelector((state) => state.toastMessage);
    const [mounted, setMounted] = useState(false);
    const [targetContainer, setTargetContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        // Nếu không có container từ props, mặc định dùng document.body
        setTargetContainer(container || document.body);
    }, [container]);

    return (
        <>
            {!mounted || !targetContainer ? null : (
                <>
                    {ReactDOM.createPortal(
                        <div
                            className={classNames(
                                "fixed flex flex-col-reverse justify-end",
                                "transition-transform duration-500 ease-in-out",
                                "box-border top-header right-0 z-[51]"
                            )}
                        >
                            {toastList.map((toast) => {
                                return (
                                    <div key={toast.id}>
                                        <ToastMessageItem {...toast} />
                                    </div>
                                );
                            })}
                        </div>,
                        targetContainer
                    )}
                </>
            )}
        </>
    );
};
export default ToastMessage;
