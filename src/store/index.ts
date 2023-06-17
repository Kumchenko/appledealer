import { configureStore } from "@reduxjs/toolkit";
import componentsSlice from "../slices/ComponentSlice"
import servicesSlice from "../slices/ServicesSlice"
import orderSlice from "../slices/OrderSlice"
import callSlice from "../slices/CallSlice"
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

const store = configureStore({
    reducer: {
        componentsSlice,
        servicesSlice,
        orderSlice,
        callSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;
export type IDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
export const useDispatch: () => IDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;