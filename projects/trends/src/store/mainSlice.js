import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  collectedReport: '',
  drawerCollectedOpen: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {

    toggleCollectedDrawer: (state, action) => {

      state.drawerCollectedOpen = !state.drawerCollectedOpen
    },

    setCollectedReport: (state, action) => {
      state.drawerCollectedOpen = !state.drawerCollectedOpen
      state.collectedReport = action.payload
 
    }






  },
})

// Action creators are generated for each case reducer function
export const actions = mainSlice.actions

export default mainSlice.reducer