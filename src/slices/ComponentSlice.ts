import { _apiBase, LoadingStatus } from '@/constants'
import { IApiError, ILoadingStatus } from '@/interfaces'
import { ensureError, fetchJSON } from '@/utils'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface IInitialState extends ILoadingStatus {
    componentIds: string[]
}

const initialState: IInitialState = {
    componentIds: [],
    loadingStatus: LoadingStatus.Idle,
}

const fetchComponents = createAsyncThunk<
    string[],
    string,
    {
        rejectValue: IApiError
    }
>('components/fetchComponents', async (modelId: string, thunkAPI) => {
    try {
        return await fetchJSON(`${_apiBase}/api/component/${modelId}`)
    } catch (e) {
        return thunkAPI.rejectWithValue(ensureError(e))
    }
})

const ComponentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        clearComponents: state => (state = initialState),
    },
    extraReducers: builder => {
        builder
            .addCase(fetchComponents.pending, state => {
                state.loadingStatus = LoadingStatus.Fetching
            })
            .addCase(fetchComponents.fulfilled, (state, action) => {
                state.componentIds = action.payload
                state.loadingStatus = LoadingStatus.Fetched
            })
            .addCase(fetchComponents.rejected, state => {
                state.loadingStatus = LoadingStatus.Error
            })
    },
})

const { actions, reducer } = ComponentsSlice

export default reducer
export const { clearComponents } = actions
export { fetchComponents }
