"use client";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type TFilePitch = {
    file: File;
    url: string;
};

interface IUploader {
    files: TFilePitch[];
    setFiles: (file: TFilePitch[]) => void;
    className?: string;
    setIsDirty?: (isDirty: boolean) => void;
    isLoading?: boolean;
}

const UploadInput = ({ className, setFiles, files, setIsDirty }: IUploader) => {
    const [error, setError] = useState<string>();
    // const { lang } = useContext(AppContext).state;

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const acceptedFilesArr = acceptedFiles.filter((file) => {
                const size = parseFloat((file.size / (1024 * 1024)).toFixed(2));
                if (size > 10) {
                    setIsDirty?.(true);
                }
                return size <= 10;
            });
            const acceptedFilesData: TFilePitch[] = acceptedFilesArr.map((file: File) => ({
                file,
                url: "",
            }));
            const listFilesAfterFilter = [...files, ...acceptedFilesData].filter(
                (_, index) => index < 10
            );
            setFiles(listFilesAfterFilter);
            setError(
                files.length >= 10 || acceptedFilesData.length > 10
                    ? "Your image could not be uploaded. Uploaded images are maxed"
                    : ""
            );
        },
        [files, setFiles, setIsDirty]
    );

    const { getInputProps, getRootProps, fileRejections } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
    });

    useEffect(() => {
        if (fileRejections.length) {
            setIsDirty?.(true);
        }
    }, [fileRejections, setIsDirty]);

    useEffect(() => {
        if (!files.length) {
            setError("");
        }
    }, [files]);

    return (
        <>
            <>
                <div
                    {...getRootProps({ maxfiles: 1 })}
                    className={classNames(
                        className,
                        "w-full px-[16px] py-[12px] cursor-text",
                        "border-[2px] border-[#000000]/[10%] dark:border-[#FFFFFF]/[20%]  rounded-[8px]",
                        "dark:focus-within:border-white/70"
                    )}
                >
                    <input {...getInputProps()} />
                    <p className="font-normal text-[16px] dark:text-[#FFFFFF]/[30%] text-[#000000]/[30%]">
                        Add file or drop files here
                    </p>
                </div>
                {error && <div className="text-[#EE312F]">{error}</div>}
            </>
        </>
    );
};

export default UploadInput;
