import { IComponents, ILoadingStatus } from "@/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IInitialState extends IComponents, ILoadingStatus { }

const initialState: IInitialState = {
    components: [],
    loadingStatus: 'idle'
}

const fetchComponents = createAsyncThunk(
    'components/fetchComponents',
    async (model: string) => {
        const response = await fetch('http://localhost:3000/api/components', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model })
        });
        return await response.json();
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