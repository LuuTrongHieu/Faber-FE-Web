"use client";
import { Button } from "@/components/bases/Button";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/common";
import { authActions } from "@/lib/redux/features/auth/authSlice";
import { modalSliceActions } from "@/lib/redux/features/modal/modalSlice";
import { toastMessageActions } from "@/lib/redux/features/toastMessage/toastMessageSlice";
import cartApi from "@/lib/services/endpoints/cart";
import userApi from "@/lib/services/endpoints/user";
import { IUnpaidOrderOfUser, IUserOfAllUnpaidOrders } from "@/lib/services/types/cart";
import { Table } from "antd";
import cn from "classnames";
import { useEffect, useState } from "react";
import columns, { expandColumns } from "../column";

const HomeComponent = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.cart);
    const [getCurrentUserInfo] = userApi.useLazyGetCurrentUserInfoQuery();
    const [getAllUnpaidOrders] = cartApi.useLazyGetAllUnpaidOrdersQuery();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            Promise.all([getCurrentUserInfo(undefined), getAllUnpaidOrders(undefined)])
                .then(() => setIsLoading(false))
                .catch((error) => {
                    console.error("Failed: ", error);
                    setIsLoading(false);
                });
        })();
    }, [getCurrentUserInfo, getAllUnpaidOrders]);

    return (
        <>
            {isLoading && (
                <div className={cn("h-screen justify-center items-center flex")}>
                    <div className="w-[54px] h-[57px] animate-spin ">
                        <LoadingIcon />
                    </div>
                </div>
            )}
            <div className="h-full flex flex-col">
                <div
                    className={cn(
                        "h-[72px] bg-white drop-shadow-[0_6px_50px_rgba(0, 0, 0, 0.8)]",
                        "text-black flex flex-row items-center justify-between px-[16px] py-[24px]",
                        "text-[20px] font-semibold text-black/88"
                    )}
                >
                    <span>Danh sách đơn hàng chưa thanh toán</span>
                    <Button
                        className="btn btn-sm contained-secondary mr-5"
                        onClick={() => {
                            dispatch(authActions.logout());
                            dispatch(
                                toastMessageActions.addToastMessage({
                                    title: "Đăng xuất",
                                    description: "Bạn đã đăng xuất tài khoản thành công",
                                    type: "info",
                                })
                            );
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
                <div className="h-full m-[16px]">
                    <div className="h-full bg-white border-solid border-[1px] border-[ #f0f0f0] rounded-[8px] p-[24px]">
                        <Table
                            rowKey={(record: IUserOfAllUnpaidOrders) =>
                                `userOfAllUnpaidOrders${record.user_id}`
                            }
                            columns={columns}
                            pagination={false}
                            bordered={true}
                            dataSource={users === undefined ? [] : users}
                            className="custom-table"
                            expandable={{
                                expandedRowRender: (expandRecord: IUserOfAllUnpaidOrders) => (
                                    <Table
                                        rowKey={(rec: IUnpaidOrderOfUser) =>
                                            `expandKetQuaPhanTich${rec.cart_item_id}`
                                        }
                                        dataSource={
                                            expandRecord.unpaid_orders === undefined
                                                ? []
                                                : expandRecord.unpaid_orders
                                        }
                                        columns={[
                                            ...expandColumns,
                                            {
                                                title: "",
                                                width: 100,
                                                render: (unpaidOrder: IUnpaidOrderOfUser) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-end",
                                                            gap: "6px",
                                                        }}
                                                    >
                                                        <Button
                                                            className="btn outlined-primary px-5 py-[10px] rounded-lg min-h-[40px] text-sm"
                                                            onClick={() =>
                                                                dispatch(
                                                                    modalSliceActions.addToQueue({
                                                                        type: "popup/update-order-information",
                                                                        propsState: {
                                                                            userId: expandRecord.user_id,
                                                                            unpaidOrderOfUser:
                                                                                unpaidOrder,
                                                                        },
                                                                    })
                                                                )
                                                            }
                                                        >
                                                            Chỉnh sửa
                                                        </Button>
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        pagination={false}
                                    />
                                ),
                                expandRowByClick: true,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeComponent;
