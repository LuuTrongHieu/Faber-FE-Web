import Icon from "../bases/Icon";

export default function CloseToastIcon({ className }: { className?: string }): React.ReactElement {
    return (
        <Icon className={className} viewBoxWidth={16} viewBoxHeight={16}>
            <path d="M11 1L1 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1L11 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}
