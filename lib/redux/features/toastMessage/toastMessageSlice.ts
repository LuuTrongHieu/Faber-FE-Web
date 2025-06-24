import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export interface IToast {
    id?: number;
    title: string;
    description?: string;
    type: "success" | "danger" | "info" | "warning";
}

type ToastMessageState = {
    toastList: Array<IToast>;
};

const initialState: ToastMessageState = { toastList: [] };

const _addToastMessage: CaseReducer<ToastMessageState, PayloadAction<IToast>> = (state, action) => {
    // SHOULD: remove hot fix
    if (action.payload.id === 200) {
        const loginMessages = state.toastList.filter((item) => item.id === 200);
        if (loginMessages.length > 0) return;
    }
    state.toastList.push({ ...action.payload, id: action.payload.id || Date.now() });
};

const _removeToastMessage: CaseReducer<ToastMessageState, PayloadAction<number>> = (
    state,
    action
) => {
    state.toastList = state.toastList.filter((item) => item.id !== action.payload);
};

const toastMessageSlice = createSlice({
    name: "toastMessageSlice",
    initialState,
    reducers: {
        addToastMessage: _addToastMessage,
        removeToastMessage: _removeToastMessage,
    },
});

export const toastMessageActions = toastMessageSlice.actions;

export default toastMessageSlice.reducer;
