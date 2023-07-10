import { _apiBase, LoadingStatus } from "@/constants";
import { ILoadingStatus } from "@/interfaces";
import { fetchJSON, idToNumber, instanceOfAE } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrderGetReq, IOrderPostReq, IOrder, IApiError } from "../interfaces";
import { ensureError } from "@/utils";

interface IInitialState extends ILoadingStatus {
    order: IOrder | null
}

const initialState: IInitialState = {
    order: null,
    loadingStatus: LoadingStatus.Idle
}

const getOrder = createAsyncThunk<IOrder, IOrderGetReq, {
    rejectValue: IApiError
}>(
    'order/getOrder',
    async ({ id, tel }, thunkAPI) => {
        try {
            return await fetchJSON(`${_apiBase}/api/order/${idToNumber(id)}/?tel=${encodeURIComponent(tel)}`);
        }
        catch (e) {
            return thunkAPI.rejectWithValue(ensureError(e))
        }
    }
)

const postOrder = createAsyncThunk<IOrder, IOrderPostReq, {
    rejectValue: IApiError
}>(
    'order/postOrder',
    async (orderData: IOrderPostReq, thunkAPI) => {
        try {
            return await fetchJSON(`${_apiBase}/api/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...orderData })
            })
        }
        catch (e) {
            return thunkAPI.rejectWithValue(ensureError(e))
        }
    })

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            // postOrder reducers
            .addCase(postOrder.pending, state => {
                state.loadingStatus = LoadingStatus.Fetching
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.loadingStatus = LoadingStatus.Fetched;
            })
            .addCase(postOrder.rejected, state => { state.loadingStatus = LoadingStatus.Error })

            // getOrder reducers
            .addCase(getOrder.pending, state => {
                state.loadingStatus = LoadingStatus.Fetching
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.loadingStatus = LoadingStatus.Fetched;
            })
            .addCase(getOrder.rejected, state => { state.loadingStatus = LoadingStatus.Error })
})

const { actions, reducer } = OrderSlice;

export default reducer;
export { getOrder, postOrder };