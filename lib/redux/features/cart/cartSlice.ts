import cartApi from "@/lib/services/endpoints/cart";
import { IUserOfAllUnpaidOrders } from "@/lib/services/types/cart";
import { createSlice } from "@reduxjs/toolkit";

export type TCartState = {
    users?: IUserOfAllUnpaidOrders[];
};

const initialState: TCartState = {
    users: undefined,
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(cartApi.endpoints.getAllUnpaidOrders.matchFulfilled, (state, action) => {
            state.users = action.payload.users;
        });
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
