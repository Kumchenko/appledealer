import call from '@/api/call'
import { LoadingStatus } from '@/constants'
import { IApiError, ILoadingStatus } from '@/interfaces'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

interface IInitialState extends ILoadingStatus {
    componentIds: string[]
}

const initialState: IInitialState = {
    componentIds: [],
    loadingStatus: LoadingStatus.Idle,
}

const fetchComponents = createAsyncThunk('components/fetchComponents', async (modelId: string, thunkAPI) => {
    try {
        return (await call.get<string[]>(`/component/${modelId}`)).data
    } catch (err) {
        return thunkAPI.rejectWithValue((err as AxiosError<IApiError>).response?.data)
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
                state.componentIds = []
                state.loadingStatus = LoadingStatus.Error
            })
    },
})

const { actions, reducer } = ComponentsSlice

export default reducer
export const { clearComponents } = actions
export { fetchComponents }
