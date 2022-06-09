import { createSlice } from '@reduxjs/toolkit'

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: {
    subcategory: '',
    selectedCategory: '',
    selectedMarka: '',
    subCatTotal: 0,
    expanded: [],
    selectedTab: 0,
    selectedTabLabel: 'Ürünler',
    selectedSubcategory: '',
    drawerOpen: false,
    subcategories: [],
    markaTabSelected: false,
    categoryTabSelected: false,
    totalFetchedProducts: 0,
    fetching: false,
    products: [],
    selectedRegex: '',
    search: ''
  },
  reducers: {
    setFetchState: (state, action) => {
      state.fetching = action.payload
    },
    setSearchText: (state, action) => {
      state.selectedRegex = ''
      state.selectedMarka = '';
      state.selectedCategory = '';
      state.selectedSubcategory = '';
      state.search = action.payload
      debugger;
    },
    searchText:(state,action)=>{
   
      state.selectedMarka = '';
      state.selectedCategory = '';
      state.selectedSubcategory = '';
      state.selectedTab = 2
      state.products= []
      state.selectedSubcategory= state.search
    },
    
    setFetchedProductsTotal: (state, action) => {
      state.totalFetchedProducts = state.totalFetchedProducts + action.payload.products.length
      state.subCatTotal = action.payload.subCatTotal
      debugger;
      if (action.payload.products) {
        state.products = [...state.products, ...action.payload.products]
      }
    },
    selectTab: (state, action) => {

    },
    selectCategory: (state, action) => {
      state.search=''
      state.selectedCategory = action.payload.selectedCategory
      state.selectedSubcategory = ''
      state.selectedRegex = ''
      state.subcategories = action.payload.subcategories
      state.drawerOpen = false
      state.selectedTab = 0

    },
    selectSubcategory: (state, action) => {

      state.search=''
      state.subCatTotal = action.payload.subCatTotal

      state.selectedSubcategory = action.payload.selectedSubcategory
      state.selectedRegex = action.payload.regex

      state.totalFetchedProducts = 0
      state.products = []

      state.selectedTab = 2


    },
    selectMarka: (state, action) => {
  state.search=''
      if (state.selectedMarka === action.payload.selectedMarka) {
        state.selectedMarka = ''
      } else {
        state.selectedMarka = action.payload.selectedMarka
      }




    },

    selectBreadCrumbCategory: (state, action) => {
      state.search=''
      state.selectedSubcategory = ''
      state.selectedRegex = ''
      state.selectedTab = 0

    },
    selectBreadCrumbTop: (state, action) => {
      state.search=''
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
        state.selectedCategory = '';
        state.selectedSubcategory = '';
        state.search=''
        state.selectedRegex = ''
      }
    },
    selectCategoryTab: (state, action) => {
      state.search=''
      state.categoryTabSelected = !state.categoryTabSelected
      if (state.categoryTabSelected) {
        state.markaTabSelected = false
        state.selectedTabLabel = 'Ürünler'
        state.selectedMarka = '';
        state.selectedCategory = '';
        state.selectedSubcategory = '';
        state.selectedRegex = ''
      } else {

      }
    }
  },
})

// Action creators are generated for each case reducer function
export const actions = breadcrumbSlice.actions

export default breadcrumbSlice.reducer