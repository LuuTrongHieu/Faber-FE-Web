import { IUnpaidOrderOfUser } from "@/lib/services/types/cart";
import { BaseHTMLAttributes, useCallback, useState } from "react";
import Modal from "../bases/Modal";
import { Input } from "../bases/Input";
import { Button } from "../bases/Button";
import LoadingIcon from "../icons/LoadingIcon";
import { useAppDispatch } from "@/lib/hooks/common";
import cartApi from "@/lib/services/endpoints/cart";
import { modalSliceActions } from "@/lib/redux/features/modal/modalSlice";
import { toastMessageActions } from "@/lib/redux/features/toastMessage/toastMessageSlice";

type TInfoUpdate = "VOLUME" | "COLORCODE" | "QUANTITY";

export interface IUpdateOrderInformationModalProps extends BaseHTMLAttributes<HTMLDivElement> {
    container: HTMLElement;
    propsState: {
        userId: number;
        unpaidOrderOfUser: IUnpaidOrderOfUser;
    };
}

const UpdateOrderInformationModal = ({
    container,
    propsState,
}: IUpdateOrderInformationModalProps) => {
    const { userId, unpaidOrderOfUser } = propsState;
    const dispatch = useAppDispatch();
    const [updateUnpaidOrder] = cartApi.useUpdateUnpaidOrderMutation();
    const [getAllUnpaidOrders] = cartApi.useLazyGetAllUnpaidOrdersQuery();
    const [orderUpdating, setOrderUpdating] = useState<IUnpaidOrderOfUser>(unpaidOrderOfUser);
    const [bIsLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeInformation = useCallback(
        (type: TInfoUpdate, event: React.ChangeEvent<HTMLInputElement>) => {
            switch (type) {
                case "VOLUME":
                    setOrderUpdating({ ...orderUpdating, volume: Number(event.target.value) });
                    break;
                case "COLORCODE":
                    setOrderUpdating({ ...orderUpdating, color_code: event.target.value });
                    break;
                case "QUANTITY":
                    setOrderUpdating({ ...orderUpdating, quantity: Number(event.target.value) });
                    break;
                default:
                    break;
            }
        },
        [orderUpdating]
    );

    const handleUpdateOrderInformation = useCallback(async () => {
        if (bIsLoading) return;
        setIsLoading(true);
        await updateUnpaidOrder({
            user_id: userId,
            updates: [
                {
                    cart_item_id: orderUpdating.cart_item_id,
                    product_name: orderUpdating.product,
                    quantity: orderUpdating.quantity,
                    color_code: orderUpdating.color_code,
                    volume: orderUpdating.volume,
                },
            ],
        })
            .then(async () => {
                await getAllUnpaidOrders(undefined);
                setIsLoading(false);
                dispatch(modalSliceActions.shiftFromQueue());
            })
            .catch((error) => {
                console.error("Failed: ", error);
                setIsLoading(false);
                dispatch(
                    toastMessageActions.addToastMessage({
                        title: "Cập nhật thông tin đơn hàng không thành công",
                        type: "danger",
                    })
                );
            });
    }, [dispatch, bIsLoading, userId, orderUpdating, updateUnpaidOrder, getAllUnpaidOrders]);

    return (
        <Modal container={container} className="w-[720px] !py-14 !px-16">
            <div className="w-full">
                <div className="text-h4 font-semibold text-left text-black">
                    Chỉnh sửa thông tin đơn đặt hàng
                </div>
                <div className="mt-9 w-full flex flex-col items-start gap-8">
                    <div className="flex flex-col w-full">
                        <div>
                            <label className="text-[14px] leading-[20px] text-[#171717]/70 font-bold">
                                Tên sản phẩm
                            </label>
                        </div>
                        <div className="relative mt-1">
                            <Input
                                placeholder="Nhập tên sản phẩm"
                                className="input-md placeholder:text-[#171717]/30 w-full input-border"
                                value={orderUpdating.product}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div>
                            <label className="text-[14px] leading-[20px] text-[#171717]/70 font-bold">
                                Kích thước
                            </label>
                        </div>
                        <div className="relative mt-1">
                            <Input
                                placeholder="Nhập kích thước"
                                className="input-md placeholder:text-[#171717]/30 w-full input-border"
                                value={orderUpdating.volume}
                                onChange={(e) => handleChangeInformation("VOLUME", e)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div>
                            <label className="text-[14px] leading-[20px] text-[#171717]/70 font-bold">
                                Mã màu
                            </label>
                        </div>
                        <div className="relative mt-1">
                            <Input
                                placeholder="Nhập mã màu"
                                className="input-md placeholder:text-[#171717]/30 w-full input-border"
                                value={orderUpdating.color_code}
                                onChange={(e) => handleChangeInformation("COLORCODE", e)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div>
                            <label className="text-[14px] leading-[20px] text-[#171717]/70 font-bold">
                                Số lượng
                            </label>
                        </div>
                        <div className="relative mt-1">
                            <Input
                                placeholder="Nhập số lượng"
                                className="input-md placeholder:text-[#171717]/30 w-full input-border"
                                value={orderUpdating.quantity}
                                onChange={(e) => handleChangeInformation("QUANTITY", e)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-9 flex flex-row items-center justify-center">
                    <Button
                        onClick={handleUpdateOrderInformation}
                        type="button"
                        className="btn btn-primary btn-lg w-[50%] font-bold leading-[22px]"
                    >
                        {bIsLoading && (
                            <div className="w-icon-sm h-icon-sm grow-0 shrink-0 mr-4 last:mr-0">
                                <LoadingIcon className="fill-icon-dark animate-spin" />
                            </div>
                        )}
                        <span>Cập nhật</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateOrderInformationModal;
