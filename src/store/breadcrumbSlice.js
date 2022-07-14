import { createSlice } from '@reduxjs/toolkit'

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: {
    selectedMainTabLabel: 'Marka',
    selectedMarka:''

  },
  reducers: {
    setMainTabLabel: (state, action) => {
      state.selectedMainTabLabel = action.payload
    },


  },
})

// Action creators are generated for each case reducer function
export const actions = breadcrumbSlice.actions

export default breadcrumbSlice.reducer