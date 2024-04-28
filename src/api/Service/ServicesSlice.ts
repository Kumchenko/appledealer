import call from '@/api/call'
import { LoadingStatus } from '@/constants'
import { IApiError, ILoadingStatus, IServices, IServicesFetchReq } from '@/interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

interface IInitialState extends ILoadingStatus, IServices {}

const initialState: IInitialState = {
    services: [],
    loadingStatus: LoadingStatus.Idle,
}

const fetchServices = createAsyncThunk('services/fetchServices', async (serviceData: IServicesFetchReq, thunkAPI) => {
    try {
        return (await call.get('/services', { params: serviceData })).data
    } catch (err) {
        return thunkAPI.rejectWithValue((err as AxiosError<IApiError>).response?.data)
    }
})

const ServicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        clearServices: state => (state = initialState),
    },
    extraReducers: builder => {
        builder
            .addCase(fetchServices.pending, state => {
                state.loadingStatus = LoadingStatus.Fetching
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.services = action.payload
                state.loadingStatus = LoadingStatus.Fetched
            })
            .addCase(fetchServices.rejected, state => {
                state.services = []
                state.loadingStatus = LoadingStatus.Error
            })
    },
})

const { actions, reducer } = ServicesSlice

export default reducer
export const { clearServices } = actions
export { fetchServices }
