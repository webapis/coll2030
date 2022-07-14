import { createSlice } from '@reduxjs/toolkit'

export const mainTabSlice = createSlice({
  name: 'maintab',
  initialState: {
    selectedMainTab:0,
    selectedMarka:'',
    selectedSubcategory:'',
    selectedKeyword:'',
    totalSubcategory:0
  },
  reducers: {
    setMainTab: (state, action) => {
  
      state.selectedMainTab = action.payload
    },
    setMarka:(state,action)=>{
      state.selectedMarka = action.payload
     
    },
    setSubcategory:(state,action)=>{
      state.selectedSubcategory = action.payload.subcategory
      state.totalSubcategory = action.payload.totalSubcategory
    },
    setKeyword:(state,action)=>{
      state.selectedKeyword = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const actions = mainTabSlice.actions

export default mainTabSlice.reducer