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
    selectedSubcategory: null,
    drawerOpen: false,
    subcategories: []
  },
  reducers: {
    selectTab: (state, action) => {
      debugger;
    
      if (action.payload.selectedTab === 0) {
        state.subcategories = action.payload.subcategories
        debugger;
        state.category=action.payload.selectedCategory
        state.drawerOpen=false
      }
      state.selectedTab = action.payload.selectedTab
      state.selectedTabLabel = action.payload.selectedTabLabel

    },
    selectCategory: (state, action) => {
      debugger;
      state.category = action.payload.category
    
      
      debugger;
    },
    selectSubcategory: (state, action) => {
      debugger;
      state.subcategory = action.payload.selectedSubcategory
      state.subCatTotal = action.payload.subCatTotal
      state.selectedSubcategory = action.payload.selectedSubcategory
      debugger;
      state.selectedTab = 2
      debugger;
    },
    selectMarka: (state, action) => {
      state.marka = action.payload.marka
      debugger;

   
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
        //  state.marka=null;
        state.subcategory = null;


      } else if (state.selectedTabLabel === 'Ürünler') {
        state.selectedTab = 0
        state.selectedSubcategory = null
        state.expanded = []
        state.category = null;
        state.marka = null;
        state.subcategory = null;
      }

    },
    toggleDrawer: (state, action) => {
      state.drawerOpen = !state.drawerOpen
    }
  },
})

// Action creators are generated for each case reducer function
export const actions = breadcrumbSlice.actions

export default breadcrumbSlice.reducer