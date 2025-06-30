import api from "../api";
import {
    IGetAllUnpaidOrdersReturn,
    IUpdateUnpaidOrderReqeust,
    IUpdateUnpaidOrderReturn,
} from "../types/cart";

const cartApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUnpaidOrders: builder.query<IGetAllUnpaidOrdersReturn, unknown>({
            query: (params) => ({
                url: "/api/v1/cart/admin/all-unpaid-orders-by-user",
                method: "GET",
                body: params,
            }),
        }),
        updateUnpaidOrder: builder.mutation<IUpdateUnpaidOrderReturn, IUpdateUnpaidOrderReqeust>({
            query: (params) => ({
                url: "/api/v1/cart/admin/update-unpaid-order",
                method: "PATCH",
                body: params,
            }),
        }),
    }),
});

export default cartApi;
