import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    increment: (state)=>{
      state.value += 1
    }
  }
})

export const {increment} = coinSlice.actions

export default coinSlice.reducer