import { LoadingStatus } from '@/constants'
import { ILoadingStatus } from '@/interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IOrderGetReq, IOrderPostReq, IOrder, IApiError } from '../../interfaces'
import call from '@/api/call'
import { AxiosError } from 'axios'

interface IInitialState extends ILoadingStatus {
    order: IOrder | null
}

const initialState: IInitialState = {
    order: null,
    loadingStatus: LoadingStatus.Idle,
}

const getOrder = createAsyncThunk('order/getOrder', async ({ id, tel }: IOrderGetReq, thunkAPI) => {
    try {
        return (
            await call.get<IOrder>(`/orders/order/${id}/`, {
                params: {
                    tel,
                },
            })
        ).data
    } catch (err) {
        return thunkAPI.rejectWithValue((err as AxiosError<IApiError>).response?.data)
    }
})

const postOrder = createAsyncThunk('order/postOrder', async (orderData: IOrderPostReq, thunkAPI) => {
    try {
        return (await call.post<IOrder>('/orders', orderData)).data
    } catch (err) {
        return thunkAPI.rejectWithValue((err as AxiosError<IApiError>).response?.data)
    }
})

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            // getOrder reducers
            .addCase(getOrder.pending, state => {
                state.order = null
                state.loadingStatus = LoadingStatus.Fetching
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.order = action.payload
                state.loadingStatus = LoadingStatus.Fetched
            })
            .addCase(getOrder.rejected, state => {
                state.order = null
                state.loadingStatus = LoadingStatus.Error
            })
            // postOrder reducers
            .addCase(postOrder.pending, state => {
                state.order = null
                state.loadingStatus = LoadingStatus.Fetching
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.order = action.payload
                state.loadingStatus = LoadingStatus.Fetched
            })
            .addCase(postOrder.rejected, state => {
                state.order = null
                state.loadingStatus = LoadingStatus.Error
            }),
})

const { actions, reducer } = OrderSlice

export default reducer
export { getOrder, postOrder }
