import { _apiBase } from "@/constants";
import { ILoadingStatus, IServices, LoadingStatus } from "@/interfaces";
import { fetchJSON } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IInitialState extends ILoadingStatus, IServices { }

const initialState: IInitialState = {
    services: [],
    loadingStatus: LoadingStatus.Idle
}

const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async ({ modelId, componentId }: { modelId: string, componentId: string }) => {
        return await fetchJSON(`${_apiBase}/api/service?modelId=${modelId}&componentId=${componentId}`);
    }
);

const ServicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        clearServices: state => state = initialState
    },
    extraReducers: builder => {
        builder
            .addCase(fetchServices.pending, state => { state.loadingStatus = LoadingStatus.Fetching })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loadingStatus = LoadingStatus.Fetched;
            })
            .addCase(fetchServices.rejected, state => { state.loadingStatus = LoadingStatus.Error })
    }
})

const { actions, reducer } = ServicesSlice;

export default reducer;
export const {
    clearServices
} = actions;
export { fetchServices };