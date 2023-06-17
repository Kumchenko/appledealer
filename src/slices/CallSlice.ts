import { ILoadingStatus } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICallReqData } from "pages/api/interfaces";

const initialState: ILoadingStatus = {
    loadingStatus: 'idle'
}

const postCall = createAsyncThunk(
    'call/postCall',
    async (call: ICallReqData, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/api/callme`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...call })
        })
        const callResponse = await response.json();
        if (callResponse) {
            return true;
        } else {
            return thunkAPI.rejectWithValue(null);
        }
    }
)

const CallSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(postCall.pending, state => { state.loadingStatus = 'fetching' })
            .addCase(postCall.fulfilled, state => { state.loadingStatus = 'fetched' })
            .addCase(postCall.rejected, state => { state.loadingStatus = 'error' })
});

const { actions, reducer } = CallSlice;

export default reducer
export const {

} = actions
export { postCall }