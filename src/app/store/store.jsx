import { configureStore } from "@reduxjs/toolkit";
import conterReducer from './counterSlice.jsx'


export const store = configureStore({
    reducer:{
        counter : conterReducer
    },
})