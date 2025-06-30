import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "../middlewares/auth";
import api from "../services/api";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/modal/modalSlice";
import toastMessageReducer from "./features/toastMessage/toastMessageSlice";
import accessibilityReducer from "./features/accessibility/accessibilitySlice";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    modal: modalReducer,
    toastMessage: toastMessageReducer,
    accessibility: accessibilityReducer,
    user: userReducer,
    cart: cartReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(api.middleware)
            .concat(authMiddleware),
});

export type TAppStore = typeof store;
export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
export default store;
