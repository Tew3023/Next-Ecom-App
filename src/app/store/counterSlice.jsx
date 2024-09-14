import { createSlice } from "@reduxjs/toolkit";

// Initial state with value and data object
const initialState = {
  value: 0,
  data: {
    name: '',
    url: '',
    price: 0,
  },
}

// Create the slice with reducers to handle state changes
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setName: (state, action) => {
      state.data.name = action.payload;
    },
    setUrl: (state, action) => {
      state.data.url = action.payload;
    },
    setPrice: (state, action) => {
      state.data.price = action.payload;
    },
  },
});

export const { increment, decrement, setName, setUrl, setPrice } = counterSlice.actions;
export default counterSlice.reducer;
