import { _apiBase } from "@/constants";
import { IComponents, ILoadingStatus, LoadingStatus } from "@/interfaces";
import { fetchJSON } from "@/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IInitialState extends IComponents, ILoadingStatus { }

const initialState: IInitialState = {
    components: [],
    loadingStatus: LoadingStatus.Idle
}

const fetchComponents = createAsyncThunk(
    'components/fetchComponents',
    async (modelId: string) => {
        return await fetchJSON(`${_apiBase}/api/component/${modelId}`);
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
            .addCase(fetchComponents.pending, state => { state.loadingStatus = LoadingStatus.Fetching })
            .addCase(fetchComponents.fulfilled, (state, action) => {
                state.components = action.payload;
                state.loadingStatus = LoadingStatus.Fetched;
            })
            .addCase(fetchComponents.rejected, state => { state.loadingStatus = LoadingStatus.Error })
    }
})

const { actions, reducer } = ComponentsSlice;

export default reducer;
export const {
    clearComponents
} = actions;
export { fetchComponents };