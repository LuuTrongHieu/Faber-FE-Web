import React from "react";
import Icon from "../bases/Icon";

export default function CloseIcon({ className }: { className?: string }): React.ReactElement {
    return (
        <Icon className={className}>
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
        </Icon>
    );
}
