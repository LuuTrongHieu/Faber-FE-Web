import { IUserOfAllUnpaidOrders } from "@/lib/services/types/cart";
import dayjs from "dayjs";

const columns = [
    {
        title: "STT",
        width: 50,
        render: (_text: string, _record: IUserOfAllUnpaidOrders, index: number) => (
            <div>{index + 1}</div>
        ),
    },
    {
        title: "Họ và tên",
        dataIndex: "user_name",
        key: "userName",
        width: "200",
        render: (text: string) => <div>{text || "-"}</div>,
    },
    {
        title: "Số điện thoại",
        dataIndex: "user_phone",
        key: "userPhone",
        width: "200",
        render: (text: string) => <div>{text || "-"}</div>,
    },
    {
        title: "Địa chỉ",
        dataIndex: "user_address",
        key: "userAddress",
        width: "200",
        render: (text: string) => <div>{text || "-"}</div>,
    },
    {
        title: "Tệp khách hàng",
        key: "typeOfUser",
        width: "200",
        render: (_text: string, record: IUserOfAllUnpaidOrders) => (
            <div>
                {record.is_retail_customer
                    ? "Khách hàng lẻ"
                    : record.is_agent
                    ? "Khách hàng đại lý"
                    : "-"}
            </div>
        ),
    },
];

export const expandColumns = [
    {
        title: "Tên sản phẩm",
        dataIndex: "product",
        key: "productName",
        width: "150",
        render: (text: number) => <div>{text || "-"}</div>,
    },
    {
        title: "Mã sản phẩm",
        dataIndex: "code",
        key: "code",
        width: "100",
        render: (text: number) => <div>{text || "-"}</div>,
    },
    {
        title: "Kích thước",
        dataIndex: "volume",
        key: "volume",
        width: "80",
        render: (text: number) => <div>{text || "-"}</div>,
    },
    {
        title: "Mã màu",
        dataIndex: "color_code",
        key: "colorCode",
        width: "100",
        render: (text: number) => <div>{text || "-"}</div>,
    },
    {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        width: "100",
        render: (text: number) => <div>{text || "-"}</div>,
    },
    {
        title: "Đơn giá",
        dataIndex: "unit_price",
        key: "unitPrice",
        width: "100",
        render: (text: number) => <div>{text || "-"}</div>,
    },
    {
        title: "Tổng tiền",
        dataIndex: "total_price",
        key: "totalPrice",
        width: "100",
        render: (text: number) => <div>{text || "-"}</div>,
    },
    {
        title: "Ngày đặt hàng",
        dataIndex: "order_date",
        key: "orderDate",
        width: "100",
        render: (text: number) => <div>{text ? dayjs(text).format("YYYY/MM/DD") : "-"}</div>,
    },
];

export default columns;
