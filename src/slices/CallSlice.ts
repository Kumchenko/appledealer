import { _apiBase } from "@/constants";
import { ILoadingStatus } from "@/interfaces";
import { fetchJSON } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICallReqData } from "pages/api/interfaces";

const initialState: ILoadingStatus = {
    loadingStatus: 'idle'
}

const postCall = createAsyncThunk(
    'call/postCall',
    async (callData: ICallReqData) => {
        const call = await fetchJSON(`${_apiBase}/api/callme`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...callData })
        })
        if (!call) {
            throw Error('Received empty callme');
        }
    }
)

const CallSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {},
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