export default function SuccessToastIcon({
    className,
}: {
    className?: string;
}): React.ReactElement {
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
                d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5ZM21.9571 11.9571C22.3476 11.5666 22.3476 10.9334 21.9571 10.5429C21.5666 10.1524 20.9334 10.1524 20.5429 10.5429L13.75 17.3358L10.7071 14.2929C10.3166 13.9024 9.68342 13.9024 9.29289 14.2929C8.90237 14.6834 8.90237 15.3166 9.29289 15.7071L13.0429 19.4571C13.4334 19.8476 14.0666 19.8476 14.4571 19.4571L21.9571 11.9571Z"
                fill="white"
            />
        </svg>
    );
}
