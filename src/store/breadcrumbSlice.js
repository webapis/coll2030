import { createSlice } from '@reduxjs/toolkit'

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: {
    subcategory: null,
    selectedCategory: null,
    selectedMarka: null,
    subCatTotal: 0,
    expanded: [],
    selectedTab: 0,
    selectedTabLabel: 'Ürünler',
    selectedSubcategory: null,
    drawerOpen: false,
    subcategories: [],
    markaTabSelected: false,
    categoryTabSelected: false,
    totalFetchedProducts: 0,
    fetching:false,
    products:[],
    selectedRegex:''
  },
  reducers: {
    setFetchState:(state,action)=>{
      state.fetching=action.payload
    },
    setFetchedProductsTotal: (state, action) => {
      state.totalFetchedProducts = state.totalFetchedProducts + action.payload.products.length
      if(action.payload.products){
        state.products=[...state.products,...action.payload.products]
      }
    },
    selectTab: (state, action) => {
      
    },
    selectCategory: (state, action) => {
      
      state.selectedCategory = action.payload.selectedCategory
      state.selectedSubcategory = null
      state.selectedRegex=''
      state.subcategories = action.payload.subcategories
      state.drawerOpen = false
      state.selectedTab = 0
      
    },
    selectSubcategory: (state, action) => {
      

      state.subCatTotal = action.payload.subCatTotal
      
      state.selectedSubcategory = action.payload.selectedSubcategory
      state.selectedRegex=action.payload.regex
      debugger;
      state.totalFetchedProducts=0
      state.products=[]
      
      state.selectedTab = 2
   
      
    },
    selectMarka: (state, action) => {

      if (state.selectedMarka === action.payload.selectedMarka) {
        state.selectedMarka = null
      } else {
        state.selectedMarka = action.payload.selectedMarka
      }

      


    },

    selectBreadCrumbCategory: (state, action) => {
      state.selectedSubcategory = null
      state.selectedRegex=''
      state.selectedTab = 0

    },
    selectBreadCrumbTop: (state, action) => {
      
      state.drawerOpen = true
      //state.selectedCategory = null;
      // state.selectedSubcategory = null;
      // state.selectedMarka=null;


    },
    toggleDrawer: (state, action) => {
      state.drawerOpen = !state.drawerOpen
    },
    selectMarkaTab: (state, action) => {
      state.markaTabSelected = !state.markaTabSelected
      if (state.markaTabSelected) {
        state.categoryTabSelected = false
        state.selectedTabLabel = 'Markalar'
        state.selectedCategory = null;
        state.selectedSubcategory = null;
        state.selectedRegex=''
      }
    },
    selectCategoryTab: (state, action) => {
      state.categoryTabSelected = !state.categoryTabSelected
      if (state.categoryTabSelected) {
        state.markaTabSelected = false
        state.selectedTabLabel = 'Ürünler'
        state.selectedMarka = null;
        state.selectedCategory = null;
        state.selectedSubcategory = null;
        state.selectedRegex=''
      } else {

      }
    }
  },
})

// Action creators are generated for each case reducer function
export const actions = breadcrumbSlice.actions

export default breadcrumbSlice.reducer