import classNames from "classnames";
import React, { BaseHTMLAttributes } from "react";

function Panel({ children, ...props }: BaseHTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={classNames("py-[50px] px-[60px]", "rounded-3xl bg-white shadow-lg")}
            {...props}
        >
            {children}
        </div>
    );
}

export default Panel;
