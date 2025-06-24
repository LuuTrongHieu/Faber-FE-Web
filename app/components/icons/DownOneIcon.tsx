import classNames from "classnames";
import React from "react";

interface Props extends React.SVGAttributes<SVGElement> {
    pathColor?: string;
}

const DownOneIcon = ({ className, ...props }: Props) => {
    return (
        <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classNames(" fill-[#4F4F4F] stroke-[#4F4F4F]", className)}
            {...props}
        >
            <path
                d="M6.58579 0H1.41421C0.523309 0 0.0771402 1.07714 0.707105 1.70711L3.29289 4.29289C3.68342 4.68342 4.31658 4.68342 4.70711 4.29289L7.29289 1.70711C7.92286 1.07714 7.47669 0 6.58579 0Z"
                fill="black"
                fillOpacity="0.7"
            />
        </svg>
    );
};

export default DownOneIcon;
