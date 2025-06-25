"use client";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";
// import AppContext from "../../contexts/AppContext";
import Pagination from "./Pagination";
import Tooltip from "./Tooltip";

// import Pagination from "./Pagination";

export interface IColumn<Item> {
    title: string;
    dataIndex?: keyof Item;
    render?: (text?: Item[keyof Item], item?: Item, index?: number) => React.ReactNode;
    sortable?: boolean;
    displayError?: (index: number) => boolean;
    width?: string;
    textOverflow?: boolean;
    renderTooltip?: (item?: Item) => React.ReactNode;
}

export interface ITable<Item> {
    columns: Array<IColumn<Item>>;
    data: Item[];
    showPagination?: boolean;
    filter?: TableFilterParams;
    handleSort?: (params: string) => void;
    handleChangePage?: (params: number) => void;
    handleChangeItemPerPage?: (params: number, currentPage: number) => void;
    className?: string;
    maxHeightContent?: string;
    displayIndexNumber?: boolean;
    onClickRow?: (item: Item) => void;
    widthFitContent?: boolean;
}

export type TableFilterParams = {
    page?: number;
    size?: number;
    sortBy?: string;
    direction?: "ASC" | "DESC";
    total?: number;
};

export default function Table<Item>({
    className,
    columns,
    data,
    showPagination = true,
    filter,
    handleSort,
    handleChangePage,
    handleChangeItemPerPage,
    maxHeightContent,
    displayIndexNumber = false,
    onClickRow,
    widthFitContent,
}: PropsWithChildren<ITable<Item>>) {
    // const { lang } = useContext(AppContext).state;
    return (
        <>
            {widthFitContent ? (
                <table
                    className={`relative border rounded-[9px] dark:border-none mb-5 ${className} lg:min-w-fit w-full border-spacing-0 border-separate`}
                >
                    <thead
                        className={classNames(
                            "bg-secondary-4 rounded-tl-[8px] rounded-tr-[8px] text-black/50 px-5",
                            "dark:bg-[#373737] dark:text-[#898989] border-b dark:border-none"
                        )}
                    >
                        <tr className={classNames("text-h9")}>
                            {displayIndexNumber && <th style={{ width: "5%" }}>No</th>}
                            {columns.map((column, index) => (
                                <th
                                    style={{
                                        width: column.width || `${100 / columns.length}%`,
                                    }}
                                    className={classNames(
                                        widthFitContent &&
                                            `!w-fit whitespace-nowrap min-w-[10%] max-w-[${
                                                100 / columns.length
                                            }%] pt-[9px] px-[18px] pb-[11px] font-[400]`,
                                        index === 0 && "rounded-tl-[9px]",
                                        index === columns.length - 1 && "rounded-tr-[9px]"
                                    )}
                                    key={index}
                                >
                                    <div className="flex items-center gap-x-1">
                                        <span
                                            className={classNames({
                                                "cursor-pointer": column.sortable,
                                            })}
                                            onClick={() =>
                                                column.sortable && handleSort
                                                    ? handleSort(String(column.dataIndex))
                                                    : {}
                                            }
                                        >
                                            {column.title}
                                        </span>
                                        {column.sortable && (
                                            <span
                                                onClick={() =>
                                                    handleSort
                                                        ? handleSort(String(column.dataIndex))
                                                        : {}
                                                }
                                                className="cursor-pointer h-4"
                                            >
                                                {/* {renderSortDirection(String(column.dataIndex))} */}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody
                        className={classNames(
                            "text-h9 text-black min-h-[100px] overflow-x-hidden rounded-b-md px-5",
                            "dark:bg-[#2F2F2F] dark:text-white",
                            {
                                "overflow-y-auto scrollbar-thin": !showPagination,
                            },
                            maxHeightContent
                        )}
                    >
                        {data?.length ? (
                            data.map((item, rowIndex) => (
                                <tr
                                    className={classNames(
                                        "border-b last:border-b-0 dark:border-[#393939]",
                                        {
                                            "cursor-pointer": !!onClickRow,
                                        },
                                        widthFitContent && "!justify-start"
                                    )}
                                    key={rowIndex}
                                    onClick={() => onClickRow && onClickRow(item)}
                                >
                                    {displayIndexNumber && filter?.page && (
                                        <div style={{ width: "5%" }}>
                                            {(filter?.page - 1) * 10 + rowIndex + 1 < 10
                                                ? `0${(filter?.page - 1) * 10 + rowIndex + 1}`
                                                : `${(filter?.page - 1) * 10 + rowIndex + 1}`}
                                        </div>
                                    )}
                                    {columns.map((column, colIndex) => (
                                        <td
                                            className={classNames(
                                                rowIndex === 0 && "border-t-[1px] border-[#e5e7eb]",
                                                widthFitContent &&
                                                    `!w-fit min-w-[5%] whitespace-nowrap max-w-[${
                                                        100 / columns.length
                                                    }%]`,
                                                "px-[18px] py-[21px]",
                                                {
                                                    "bg-[#F8D9D8]":
                                                        column.displayError &&
                                                        column.displayError(rowIndex),
                                                    "text-ellipsis overflow-hidden whitespace-nowrap":
                                                        column.textOverflow,
                                                    "cursor-pointer":
                                                        column.renderTooltip &&
                                                        column.renderTooltip(item),
                                                }
                                            )}
                                            style={{
                                                width: column.width || `${100 / columns.length}%`,
                                            }}
                                            key={colIndex}
                                        >
                                            {column.render ? (
                                                <>
                                                    {column.renderTooltip &&
                                                    column.renderTooltip(item) ? (
                                                        <>
                                                            <Tooltip
                                                                positionX={
                                                                    rowIndex === 0
                                                                        ? "bottom"
                                                                        : "top"
                                                                }
                                                                message={`seller ID: ${
                                                                    column.renderTooltip(item) || ""
                                                                }`}
                                                            >
                                                                {column.dataIndex
                                                                    ? column.render(
                                                                          item[column.dataIndex],
                                                                          item,
                                                                          rowIndex
                                                                      )
                                                                    : column.render(
                                                                          undefined,
                                                                          item,
                                                                          rowIndex
                                                                      )}
                                                            </Tooltip>
                                                        </>
                                                    ) : column.dataIndex ? (
                                                        column.render(
                                                            item[column.dataIndex],
                                                            item,
                                                            rowIndex
                                                        )
                                                    ) : (
                                                        column.render(undefined, item, rowIndex)
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {column.dataIndex
                                                        ? String(item[column.dataIndex])
                                                        : null}
                                                </>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-black/50 py-16 text-center dark:text-[#898989]"
                                >
                                    {/* {lang["profile/no-data"]} */}
                                    No data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                <div
                    className={`relative border rounded-[9px] dark:border-none mb-5 ${className} min-w-[700px] lg:min-w-fit`}
                >
                    <div className="w-full text-left">
                        <div
                            className={classNames(
                                "bg-secondary-4 rounded-tl-[8px] rounded-tr-[8px] text-black/50 px-5",
                                "dark:bg-[#373737] dark:text-[#898989] border-b dark:border-none"
                            )}
                        >
                            <div
                                className={classNames(
                                    "flex flex-row items-center justify-between text-h9 pt-[9px] px-[18px] pb-[11px]",
                                    widthFitContent && "!justify-start"
                                )}
                            >
                                {displayIndexNumber && <div style={{ width: "5%" }}>No</div>}
                                {columns.map((column, index) => (
                                    <div
                                        style={{
                                            width: column.width || `${100 / columns.length}%`,
                                        }}
                                        className={classNames(
                                            widthFitContent &&
                                                `!w-fit min-w-[10%] max-w-[${
                                                    100 / columns.length
                                                }%]`
                                        )}
                                        key={index}
                                    >
                                        <div className="flex items-center gap-x-1">
                                            <span
                                                className={classNames({
                                                    "cursor-pointer": column.sortable,
                                                })}
                                                onClick={() =>
                                                    column.sortable && handleSort
                                                        ? handleSort(String(column.dataIndex))
                                                        : {}
                                                }
                                            >
                                                {column.title}
                                            </span>
                                            {column.sortable && (
                                                <span
                                                    onClick={() =>
                                                        handleSort
                                                            ? handleSort(String(column.dataIndex))
                                                            : {}
                                                    }
                                                    className="cursor-pointer h-4"
                                                >
                                                    {/* {renderSortDirection(String(column.dataIndex))} */}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className={classNames(
                                "text-h9 text-black min-h-[100px] overflow-x-hidden rounded-b-md px-5",
                                "dark:bg-[#2F2F2F] dark:text-white",
                                {
                                    "overflow-y-auto scrollbar-thin": !showPagination,
                                },
                                maxHeightContent
                            )}
                        >
                            {data?.length ? (
                                data.map((item, rowIndex) => (
                                    <div
                                        className={classNames(
                                            "border-b last:border-b-0 dark:border-[#393939]",
                                            "flex flex-row items-center justify-between",
                                            "px-[18px] py-[21px]",
                                            {
                                                "cursor-pointer": !!onClickRow,
                                            },
                                            widthFitContent && "!justify-start"
                                        )}
                                        key={rowIndex}
                                        onClick={() => onClickRow && onClickRow(item)}
                                    >
                                        {displayIndexNumber && filter?.page && (
                                            <div style={{ width: "5%" }}>
                                                {(filter?.page - 1) * 10 + rowIndex + 1 < 10
                                                    ? `0${(filter?.page - 1) * 10 + rowIndex + 1}`
                                                    : `${(filter?.page - 1) * 10 + rowIndex + 1}`}
                                            </div>
                                        )}
                                        {columns.map((column, colIndex) => (
                                            <div
                                                className={classNames(
                                                    "pr-5 ",
                                                    widthFitContent &&
                                                        `!w-fit min-w-[10%] max-w-[${
                                                            100 / columns.length
                                                        }%]`,

                                                    {
                                                        "bg-[#F8D9D8]":
                                                            column.displayError &&
                                                            column.displayError(rowIndex),
                                                        "text-ellipsis overflow-hidden whitespace-nowrap":
                                                            column.textOverflow,
                                                        "cursor-pointer":
                                                            column.renderTooltip &&
                                                            column.renderTooltip(item),
                                                    }
                                                )}
                                                style={{
                                                    width:
                                                        column.width || `${100 / columns.length}%`,
                                                }}
                                                key={colIndex}
                                            >
                                                {/* {column.render ? (
                                                <>
                                                    {column.dataIndex
                                                        ? column.render(
                                                              item[column.dataIndex],
                                                              item,
                                                              rowIndex
                                                          )
                                                        : column.render(undefined, item, rowIndex)}
                                                </>
                                            ) : (
                                                <>
                                                    {column.dataIndex ? item[column.dataIndex] : ""}
                                                </>
                                            )} */}

                                                {column.render ? (
                                                    <>
                                                        {column.renderTooltip &&
                                                        column.renderTooltip(item) ? (
                                                            <>
                                                                <Tooltip
                                                                    positionX={
                                                                        rowIndex === 0
                                                                            ? "bottom"
                                                                            : "top"
                                                                    }
                                                                    message={`seller ID: ${
                                                                        column.renderTooltip(
                                                                            item
                                                                        ) || ""
                                                                    }`}
                                                                >
                                                                    {column.dataIndex
                                                                        ? column.render(
                                                                              item[
                                                                                  column.dataIndex
                                                                              ],
                                                                              item,
                                                                              rowIndex
                                                                          )
                                                                        : column.render(
                                                                              undefined,
                                                                              item,
                                                                              rowIndex
                                                                          )}
                                                                </Tooltip>
                                                            </>
                                                        ) : column.dataIndex ? (
                                                            column.render(
                                                                item[column.dataIndex],
                                                                item,
                                                                rowIndex
                                                            )
                                                        ) : (
                                                            column.render(undefined, item, rowIndex)
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {column.dataIndex
                                                            ? String(item[column.dataIndex])
                                                            : ""}
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="text-black/50 py-16 flex flex-col justify-center items-center dark:text-[#898989]">
                                    {/* {lang["profile/no-data"]} */}
                                    No data
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {data.length > 0 && showPagination && (
                <Pagination
                    currentPage={filter?.page || 1}
                    totalItems={filter?.total || 0}
                    itemPerPage={filter?.size || 10}
                    onChangePage={handleChangePage}
                    onChangeItemPerPage={handleChangeItemPerPage}
                />
            )}
        </>
    );
}
