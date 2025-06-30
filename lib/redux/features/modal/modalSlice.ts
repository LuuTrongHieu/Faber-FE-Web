import { TModalData } from "@/lib/classes/Modal";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TModalState = {
    queue: Array<TModalData>;
};

const initialState: TModalState = {
    queue: [],
};

const _addToQueue: CaseReducer<TModalState, PayloadAction<TModalData>> = (state, action) => {
    if (state.queue.indexOf(action.payload) !== -1) return;
    state.queue.push(action.payload);
};

const _switchTo: CaseReducer<TModalState, PayloadAction<TModalData>> = (state, action) => {
    state.queue.shift();
    if (state.queue.indexOf(action.payload) !== -1) return;
    state.queue.push(action.payload);
};

const _shiftFromQueue: CaseReducer<TModalState> = (state) => {
    state.queue.shift();
};

const _clearAll: CaseReducer<TModalState> = (state) => {
    state.queue = [];
};

const _addToQueueAtBegin: CaseReducer<TModalState, PayloadAction<TModalData>> = (state, action) => {
    if (state.queue.indexOf(action.payload) !== -1) return;
    state.queue.unshift(action.payload);
};

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        addToQueue: _addToQueue,
        switchTo: _switchTo,
        shiftFromQueue: _shiftFromQueue,
        clearAll: _clearAll,
        addToQueueAtBegin: _addToQueueAtBegin,
    },
});

export default modalSlice.reducer;
export const modalSliceActions = modalSlice.actions;
