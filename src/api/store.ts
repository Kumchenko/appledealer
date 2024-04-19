import { combineReducers, configureStore } from '@reduxjs/toolkit'
import componentsSlice from './Component/ComponentSlice'
import servicesSlice from './Service/ServicesSlice'
import orderSlice from './Order/OrderSlice'
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'
import { env } from '@/constants/env'

const rootReducer = combineReducers({
    componentsSlice,
    servicesSlice,
    orderSlice,
})

const store = configureStore({
    reducer: rootReducer,
    devTools: env.isDev(),
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export default store
export type IDispatch = typeof store.dispatch
export type IRootState = ReturnType<typeof rootReducer>
export const useDispatch: () => IDispatch = useReduxDispatch
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector
