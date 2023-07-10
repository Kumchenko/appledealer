import { LoadingStatus, _apiBase } from "@/constants";
import { ensureError, fetchJSON } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiError, ICallPostReq } from "@/interfaces";

const initialState = {
    loadingStatus: LoadingStatus.Idle
}

const postCall = createAsyncThunk<{}, ICallPostReq, {
    rejectValue: IApiError
}>(
    'call/postCall',
    async (callData, thunkAPI) => {
        try {
            return await fetchJSON(`${_apiBase}/api/callme`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...callData })
            })
        }
        catch (e) {
            return thunkAPI.rejectWithValue(ensureError(e))
        }
    }
)

const CallSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(postCall.pending, state => { state.loadingStatus = LoadingStatus.Fetching })
            .addCase(postCall.fulfilled, state => { state.loadingStatus = LoadingStatus.Fetched })
            .addCase(postCall.rejected, state => { state.loadingStatus = LoadingStatus.Error })
});

const { actions, reducer } = CallSlice;

export default reducer
export { postCall }