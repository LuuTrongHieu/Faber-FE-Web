export interface IUnpaidOrderOfUser {
    cart_item_id: number;
    product: string;
    code: string;
    volume: number;
    color_code: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    order_date: string;
    days_pending: number;
    image_path: string;
}

export interface IUserOfAllUnpaidOrders {
    user_id: number;
    user_name: string;
    user_phone: string;
    user_address: string;
    is_retail_customer: boolean;
    is_agent: boolean;
    total_unpaid_items: number;
    total_unpaid_amount: number;
    unpaid_orders: IUnpaidOrderOfUser[];
}
export interface IGetAllUnpaidOrdersReturn {
    message: string;
    total_users_with_unpaid: number;
    total_unpaid_items: number;
    total_unpaid_amount: number;
    users: IUserOfAllUnpaidOrders[];
}

interface IUpdateParams {
    cart_item_id: number;
    product_name: string;
    quantity: number;
    color_code: string;
    volume: number;
}

interface IUpdateItemsReturn {
    cart_item_id: number;
    old_product: string;
    new_product: string;
    old_quantity: number;
    new_quantity: number;
    old_color_code: string;
    new_color_code: string;
    old_volume: number;
    new_volume: number;
    old_bonus_points: number;
    new_bonus_points: number;
    price_change: number;
}

export interface IUpdateUnpaidOrderReqeust {
    user_id: number;
    updates: IUpdateParams[];
}

export interface IUpdateUnpaidOrderReturn {
    message: string;
    total_items_updated: number;
    old_total_bonus_points: number;
    new_total_bonus_points: number;
    updated_items: IUpdateItemsReturn[];
}
