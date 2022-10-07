import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    selectedSlice:''

}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {

    setSelectedSlice:(state,action)=>{
        state.selectedSlice=action.payload
    }
 

  },
})

// Action creators are generated for each case reducer function
export const actions = mainSlice.actions

export default mainSlice.reducer