import { ILoadingStatus } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrderReqData, IOrderResData } from "pages/api/interfaces";

interface IInitialState extends ILoadingStatus {
    order: IOrderResData | null
}

const initialState: IInitialState = {
    order: null,
    loadingStatus: 'idle'
}

const pushOrder = createAsyncThunk(
    'order/pushOrder',
    async (order: IOrderReqData) => {
        const response = await fetch('http://localhost:3000/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...order })
        })
        return response.json();
    })

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder: state => state = initialState
    },
    extraReducers: builder =>
        builder
            .addCase(pushOrder.pending, state => { state.loadingStatus = 'fetching' })
            .addCase(pushOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.loadingStatus = 'fetched';
            })
            .addCase(pushOrder.rejected, state => { state.loadingStatus = 'error' })
})

const { actions, reducer } = OrderSlice;

export default reducer;
export const {
    clearOrder
} = actions;
export { pushOrder };