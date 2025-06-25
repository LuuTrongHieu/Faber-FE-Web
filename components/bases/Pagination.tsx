"use client";
import { DOTS, usePagination } from "@/app/lib/hooks/usePagination";
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "./Input";
import SelectBox from "./SelectBox";
import BackPageIcon from "../icons/BackPageIcon";
import NextPageIcon from "../icons/NextPageIcon";

const BUTTON_CONST = 3;
const SIBLING_COUNT = 1;

type TProps = {
    currentPage: number;
    totalItems: number;
    itemPerPage: number;
    onChangePage?: (page: number) => void;
    onChangeItemPerPage?: (itemPerPage: number, currentPage: number) => void;
};

const pageSizeOptions = [
    {
        label: "10 / Page",
        value: 10,
    },
    {
        label: "20 / Page",
        value: 20,
    },
    {
        label: "50 / Page",
        value: 50,
    },
    {
        label: "100 / Page",
        value: 100,
    },
];

const Pagination: React.FC<TProps> = ({
    currentPage,
    totalItems,
    itemPerPage,
    onChangePage,
    onChangeItemPerPage,
}) => {
    const buttonConst = BUTTON_CONST;
    const siblingCount = SIBLING_COUNT;
    const [pageInputted, setPageInputted] = useState<string>(currentPage.toString());

    const totalPageCount = useMemo(
        () => Math.ceil(totalItems / itemPerPage),
        [totalItems, itemPerPage]
    );
    const paginationRange = usePagination({
        totalPageCount,
        buttonConst,
        siblingCount,
        currentPage,
    });

    const handleChangedCurrentPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === "0") return;
        if (value && /[^0-9]/g.test(value)) return;
        setPageInputted(event.target.value);
    }, []);

    const handleKeyUp = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (!onChangePage) return;
            if (!paginationRange?.length) return;
            if (event.code === "Enter" || event.keyCode === 13) {
                let pageReturn;
                if (!pageInputted) {
                    pageReturn = 1;
                } else if (
                    Number(pageInputted) > Number(paginationRange[paginationRange?.length - 1])
                ) {
                    pageReturn = Number(paginationRange[paginationRange?.length - 1]);
                } else {
                    pageReturn = Number(pageInputted);
                }
                if (pageReturn === currentPage) return setPageInputted(String(pageReturn));
                return onChangePage(pageReturn);
            }
        },
        [currentPage, onChangePage, pageInputted, paginationRange]
    );

    const handleClickPage = useCallback(
        (page: number) => {
            if (!onChangePage) return;
            if (page === currentPage) return;
            onChangePage(page);
            setPageInputted(page.toString());
        },
        [currentPage, onChangePage]
    );

    const handleSelectItemPerPage = useCallback(
        (limit: number | string) => {
            if (!onChangeItemPerPage) return;
            if (limit === itemPerPage) return;
            onChangeItemPerPage(limit as number, 1);
            setPageInputted("1");
        },
        [onChangeItemPerPage, itemPerPage]
    );

    useEffect(() => {
        setPageInputted(currentPage.toString());
    }, [currentPage]);

    return (
        <ul className="sticky left-0 flex flex-row justify-end items-center gap-x-2 mb-5">
            <div className="flex justify-end items-center gap-x-2">
                <li
                    className={classNames(
                        "border rounded w-[28px] h-[28px] flex justify-center items-center cursor-pointer dark:border-white/10",
                        { invisible: currentPage === 1 }
                    )}
                    onClick={() => handleClickPage(currentPage - 1)}
                >
                    <BackPageIcon className="w-4 h-4 fill-black dark:fill-[#B7B9BA]" />
                </li>
                {paginationRange?.map((item, index) => {
                    if (item === DOTS) {
                        return (
                            <li
                                key={index}
                                className={classNames(
                                    "border rounded w-[28px] h-[28px] justify-center items-center hidden lg:flex",
                                    "dark:text-[#B7B9BA]/30 text-[#171717]/30 dark:border-white/10"
                                )}
                            >
                                {DOTS}
                            </li>
                        );
                    }

                    return (
                        <li
                            className={classNames(
                                "border rounded w-[28px] h-[28px] flex justify-center items-center cursor-pointer text-sm",
                                "dark:border-white/10 dark:text-[#B7B9BA]/30",
                                currentPage === item
                                    ? "bg-[#DC413A] font-bold !text-white border-0"
                                    : "text-[#171717]/30 hidden lg:flex"
                            )}
                            key={index}
                            onClick={() => handleClickPage(Number(item))}
                        >
                            {item}
                        </li>
                    );
                })}
                <li
                    className={classNames(
                        "border rounded w-[28px] h-[28px] flex justify-center items-center cursor-pointer dark:border-white/10",
                        { hidden: currentPage === totalPageCount || !paginationRange?.length }
                    )}
                    onClick={() => handleClickPage(currentPage + 1)}
                >
                    <NextPageIcon className="w-4 h-4 fill-black dark:fill-[#B7B9BA]" />
                </li>
                <SelectBox
                    options={pageSizeOptions}
                    defaultValue={itemPerPage}
                    customClassName={classNames(
                        "border-[1px] rounded !py-1 !px-[6px]",
                        "w-fit h-fit min-w-[97px]",
                        "small-select hidden lg:block"
                    )}
                    textClassName="dark:text-[#B7B9BA]/50 text-[#171717]/50"
                    optionsClass="options"
                    optionClass="text-[#171717] opacity-50 dark:text-[#B7B9BA]"
                    onChange={handleSelectItemPerPage}
                />
            </div>
            <div className="text-h9 font-normal text-[#171717]/50 dark:text-[#B7B9BA]">
                Go to page
                <Input
                    className={classNames(
                        "border rounded w-[50px] h-[28px] px-2 ml-2",
                        "first:odd:text-sm even:text-sm text-center",
                        "text-[#171717]/50"
                    )}
                    maxLength={4}
                    value={pageInputted}
                    onChange={handleChangedCurrentPage}
                    onKeyUp={handleKeyUp}
                />
            </div>
        </ul>
    );
};

export default Pagination;
