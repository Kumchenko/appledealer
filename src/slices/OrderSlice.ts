import { ILoadingStatus } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrderReqQuery, IOrderReqBody, IOrderResData } from "pages/api/interfaces";

interface IInitialState extends ILoadingStatus {
    order: IOrderResData | null
}

const initialState: IInitialState = {
    order: null,
    loadingStatus: 'idle'
}

const getOrder = createAsyncThunk(
    'order/getOrder',
    async ({ id, tel }: IOrderReqQuery, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/api/order?id=${id}&tel=${encodeURIComponent(tel)}`)
        const order = await response.json();
        console.log(order);
        if (order) {
            return order;
        } else {
            return thunkAPI.rejectWithValue(null);
        }
    }
)

const postOrder = createAsyncThunk(
    'order/postOrder',
    async (order: IOrderReqBody) => {
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
            .addCase(postOrder.pending, state => { state.loadingStatus = 'fetching' })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.loadingStatus = 'fetched';
            })
            .addCase(postOrder.rejected, state => { state.loadingStatus = 'error' })
            .addCase(getOrder.pending, state => { state.loadingStatus = 'fetching' })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.loadingStatus = 'fetched';
            })
            .addCase(getOrder.rejected, state => { state.loadingStatus = 'error' })
})

const { actions, reducer } = OrderSlice;

export default reducer;
export const {
    clearOrder
} = actions;
export { getOrder, postOrder };