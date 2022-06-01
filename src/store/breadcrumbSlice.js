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
    markaTabSelected:false,
    categoryTabSelected:false,
  },
  reducers: {
    selectTab: (state, action) => {
      debugger;
    
      if (action.payload.selectedTab === 0) {
     //   state.subcategories = action.payload.subcategories
        debugger;
     //   state.category=action.payload.selectedCategory
       
      }
     // state.selectedTab = action.payload.selectedTab
     

    },
    selectCategory: (state, action) => {
      debugger;
      state.selectedCategory = action.payload.selectedCategory
      
      state.subcategories = action.payload.subcategories
      state.drawerOpen=false
      state.selectedTab= 0
      debugger;
    },
    selectSubcategory: (state, action) => {
      debugger;
      //state.subcategory = action.payload.selectedSubcategory
      state.subCatTotal = action.payload.subCatTotal
      state.selectedSubcategory = action.payload.selectedSubcategory
      debugger;
      state.selectedTab = 2
      debugger;
    },
    selectMarka: (state, action) => {
      
      if(state.selectedMarka===action.payload.selectedMarka){
        state.selectedMarka=null
      } else{
        state.selectedMarka = action.payload.selectedMarka
      }

      debugger;

   
    },

    selectBreadCrumbCategory: (state, action) => {
      state.selectedSubcategory = null
      state.selectedTab = 0

    },
    selectBreadCrumbTop: (state, action) => {
      debugger;
      state.drawerOpen=true
      state.category = null;
      state.subcategory = null;
   
      if (state.selectedTabLabel === 'Markalar') {
      //  // state.selectedTab = 1
      //   state.selectedSubcategory = null
  
      //   state.category = null;
      //   //  state.marka=null;
      //   state.subcategory = null;
    

      } else if (state.selectedTabLabel === 'Ürünler') {
        //state.selectedTab = 0
      //   state.selectedSubcategory = null
      //   state.category = null;
      //  // state.marka = null;
      //   state.subcategory = null;
      }

    },
    toggleDrawer: (state, action) => {
      state.drawerOpen = !state.drawerOpen
    },
    selectMarkaTab:(state,action)=>{
      state.markaTabSelected=!state.markaTabSelected
      if(state.markaTabSelected){
        state.categoryTabSelected=false
        state.selectedTabLabel='Markalar'
        state.selectedCategory=null;
        state.selectedSubcategory=null;
      }
    },
    selectCategoryTab:(state,action)=>{
      state.categoryTabSelected=!state.categoryTabSelected
      if(state.categoryTabSelected){
        state.markaTabSelected=false
        state.selectedTabLabel='Ürünler'
        state.selectedMarka=null;
        state.selectedCategory=null;
        state.selectedSubcategory=null;
      }else{
      
      } 
    }
  },
})

// Action creators are generated for each case reducer function
export const actions = breadcrumbSlice.actions

export default breadcrumbSlice.reducer