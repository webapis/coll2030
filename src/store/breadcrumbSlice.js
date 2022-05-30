import { createSlice } from '@reduxjs/toolkit'

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: {
    subcategory: null,
    category: null,
    marka: null,
    subCatTotal: 0,
    expanded: [],
    selectedTab: 0,
    selectedTabLabel: 'Ürünler',
    selectedSubcategory: null
  },
  reducers: {
    selectTab: (state, action) => {
      debugger;
      if (action.payload.selectedTab !== 2) {
        state.navCategory = action.payload
        state.subcategory = null;
        state.subCatTotal = null;
        state.marka = null;
        state.category = null;
        state.selectedSubcategory = null;
        state.expanded = []
      }
      state.selectedTab = action.payload.selectedTab
      state.selectedTabLabel = action.payload.selectedTabLabel

    },
    selectCategory: (state, action) => {
      debugger;
      state.category = action.payload.category
      let isTopNav = action.payload.expanded.includes('top-')
      debugger;
      if (state.expanded.find(f => f === action.payload.expanded)) {
        state.expanded = state.expanded.filter(f => f !== action.payload.expanded)
      } else {
        if (isTopNav) {
          state.expanded = []
        }
        state.expanded.push(action.payload.expanded)
      }
      debugger;
    },
    selectSubcategory: (state, action) => {
      debugger;
      state.subcategory = action.payload.subcategory
      state.subCatTotal = action.payload.subCatTotal
      state.selectedSubcategory = action.payload.selectedSubcategory
      debugger;
      state.selectedTab = 2
      debugger;
    },
    selectMarka: (state, action) => {
      state.marka = action.payload.marka
      debugger;
      let isTopNav = action.payload.expanded.includes('top-')
      if (state.expanded.find(f => f === action.payload.expanded)) {
        state.expanded = state.expanded.filter(f => f !== action.payload.expanded)
      }
      else {
        if (isTopNav) {
          state.expanded = []
        }
        state.expanded.push(action.payload.expanded)
      }
    },

    selectBreadCrumbCategory: (state, action) => {
      if (state.selectedTabLabel === 'Markalar') {
        state.selectedTab = 1
        state.subcategory = null
      } else if (state.selectedTabLabel === 'Ürünler') {
        state.subcategory = null
        state.selectedTab = 0
      }
    },
    selectBreadCrumbTop: (state, action) => {
      if (state.selectedTabLabel === 'Markalar') {
        state.selectedTab = 1
        state.selectedSubcategory = null
        state.expanded = []
        state.category = null;
        state.marka=null;
        state.subcategory=null;
        

      } else if (state.selectedTabLabel === 'Ürünler') {
        state.selectedTab = 0
        state.selectedSubcategory = null
        state.expanded = []
        state.category = null;
        state.marka=null;
        state.subcategory=null;
      }
    },

  },
})

// Action creators are generated for each case reducer function
export const actions = breadcrumbSlice.actions

export default breadcrumbSlice.reducer