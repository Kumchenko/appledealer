import { LoadingStatus } from '@/constants'

export type State = {
    loadingStatus: LoadingStatus
}

type DerivedStates = {
    isIdle: boolean
    isLoading: boolean
    isLoaded: boolean
    isError: boolean
}

export const selectStatus = <T extends State>(state: T): T & DerivedStates => ({
    ...state,
    isIdle: state.loadingStatus === LoadingStatus.Idle,
    isLoading: state.loadingStatus === LoadingStatus.Fetching,
    isLoaded: state.loadingStatus === LoadingStatus.Fetched,
    isError: state.loadingStatus === LoadingStatus.Error,
})
