export default function DangerToastIcon({ className }: { className?: string }): React.ReactElement {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 5C20.5228 5 25 9.47715 25 15C25 20.5228 20.5228 25 15 25C9.47715 25 5 20.5228 5 15C5 9.47715 9.47715 5 15 5ZM15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5Z"
                fill="white"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 21.25C14.3096 21.25 13.75 20.6904 13.75 20C13.75 19.3096 14.3096 18.75 15 18.75C15.6904 18.75 16.25 19.3096 16.25 20C16.25 20.6904 15.6904 21.25 15 21.25ZM15 16.25C14.3096 16.25 13.75 15.6904 13.75 15V10C13.75 9.30964 14.3096 8.75 15 8.75C15.6904 8.75 16.25 9.30964 16.25 10V15C16.25 15.6904 15.6904 16.25 15 16.25Z"
                fill="white"
            />
        </svg>
    );
}
