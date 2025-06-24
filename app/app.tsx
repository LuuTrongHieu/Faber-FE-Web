"use client";

import ToastMessage from "./components/commons/ToastMessage";
import { useAppSelector, useModalQueue } from "./hooks/common";

const App = ({ children }: { children: React.ReactNode }) => {
    const modalState = useAppSelector((state) => state.modal);
    const modalQueue = useModalQueue(modalState.queue);

    return (
        <>
            <ToastMessage />
            {modalQueue}
            {children}
        </>
    );
};

export default App;
