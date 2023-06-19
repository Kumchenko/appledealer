import { _apiBase } from "@/constants";
import { IComponents, ILoadingStatus } from "@/interfaces";
import { fetchJSON } from "@/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IInitialState extends IComponents, ILoadingStatus { }

const initialState: IInitialState = {
    components: [],
    loadingStatus: 'idle'
}

const fetchComponents = createAsyncThunk(
    'components/fetchComponents',
    async (model: string) => {
        return await fetchJSON(`${_apiBase}/api/components`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model })
        });
    }
);

const ComponentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        clearComponents: state => state = initialState
    },
    extraReducers: builder => {
        builder
            .addCase(fetchComponents.pending, state => { state.loadingStatus = 'fetching' })
            .addCase(fetchComponents.fulfilled, (state, action) => {
                state.components = action.payload;
                state.loadingStatus = 'fetched';
            })
            .addCase(fetchComponents.rejected, state => { state.loadingStatus = 'error' })
    }
})

const { actions, reducer } = ComponentsSlice;

export default reducer;
export const {
    clearComponents
} = actions;
export { fetchComponents };