import { ILoadingStatus, IServices } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IInitialState extends ILoadingStatus, IServices { }

const initialState: IInitialState = {
    services: [],
    loadingStatus: 'idle'
}

const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async ({ model, component }: { model: string, component: string }) => {
        const response = await fetch('http://localhost:3000/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, component })
        });
        return await response.json();
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
            .addCase(fetchServices.pending, state => { state.loadingStatus = 'fetching' })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loadingStatus = 'fetched';
            })
            .addCase(fetchServices.rejected, state => { state.loadingStatus = 'error' })
    }
})

const { actions, reducer } = ServicesSlice;

export default reducer;
export const {
    clearServices
} = actions;
export { fetchServices };