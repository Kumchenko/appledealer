import { _apiBase } from "@/constants";
import { ILoadingStatus, LoadingStatus } from "@/interfaces";
import { fetchJSON } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrderReqQuery, IOrderReqBody, IOrderResData } from "pages/api/interfaces";

interface IInitialState extends ILoadingStatus {
    order: IOrderResData | null
}

const initialState: IInitialState = {
    order: null,
    loadingStatus: LoadingStatus.Idle
}

const getOrder = createAsyncThunk(
    'order/getOrder',
    async ({ id, tel }: IOrderReqQuery) => {
        const order = await fetchJSON(`${_apiBase}/api/order?id=${id}&tel=${encodeURIComponent(tel)}`);
        if (order) {
            return order;
        } else {
            throw Error(`Received empty order`)
        }
    }
)

const postOrder = createAsyncThunk(
    'order/postOrder',
    async (orderData: IOrderReqBody) => {
        const order = await fetchJSON(`${_apiBase}/api/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...orderData })
        })
        if (order) {
            return order;
        } else {
            throw Error(`Received empty order`)
        }
    })

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder: state => state = initialState
    },
    extraReducers: builder =>
        builder
            .addCase(postOrder.pending, state => { state.loadingStatus = LoadingStatus.Fetching })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.loadingStatus = LoadingStatus.Fetched;
            })
            .addCase(postOrder.rejected, state => { state.loadingStatus = LoadingStatus.Error })
            .addCase(getOrder.pending, state => { state.loadingStatus = LoadingStatus.Fetching })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.loadingStatus = LoadingStatus.Fetched;
            })
            .addCase(getOrder.rejected, state => { state.loadingStatus = LoadingStatus.Error })
})

const { actions, reducer } = OrderSlice;

export default reducer;
export const {
    clearOrder
} = actions;
export { getOrder, postOrder };