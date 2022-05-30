import { createSlice } from '@reduxjs/toolkit'

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: {
    subcategory:null,
    category:null,
    marka:null,
    navCategory:'Ürünler',
    subCatTotal:0
  },
  reducers: {
    selectNavCategory: (state,action) => {
      state.navCategory=action.payload
      state.subcategory=null;
      state.subCatTotal=null;
      state.marka=null;
      state.category=null;
    },
    selectCategory: (state,action) => {
      debugger;
      state.category=action.payload
    },
    selectSubcategory: (state, action) => {
    state.subcategory=action.payload.subcategory
    state.subCatTotal=action.payload.subCatTotal
    },
    selectMarka:(state,action)=>{
      state.marka=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const actions = breadcrumbSlice.actions

export default breadcrumbSlice.reducer