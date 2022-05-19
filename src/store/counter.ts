import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.count++;
    },
    decrement: state => {
      state.count--;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
