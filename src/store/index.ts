import { Action, AnyAction, Middleware, PayloadAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import componentsSlice from "../slices/ComponentSlice"
import servicesSlice from "../slices/ServicesSlice"
import orderSlice from "../slices/OrderSlice"
import callSlice from "../slices/CallSlice"
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { errorMiddleware } from "@/middlewares";

const rootReducer = combineReducers({
    componentsSlice,
    servicesSlice,
    orderSlice,
    callSlice
})

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(errorMiddleware),
})

export default store;
export type IDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof rootReducer>;
export const useDispatch: () => IDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;