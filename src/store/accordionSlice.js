import { createSlice } from '@reduxjs/toolkit'

const initialState = {


  drawerOpen: false,

  selectedMarka: '',

  totalSubcategory: 0,
  selectedSubcategory: '',
  selectedKeyword: '',
  selectedKeywordTitle: '',
  keywords: null,
  totalKeyword: 0,
  selectedMainTab: 0,
  //products
  products: [],
  startAt: 0,
  fetching: false,
  scrollHandled: false,
  fetchingKeywords: false,
  parentKeyword: null,
  subcategories: [],
  markas: [],
  childkeywords: [], fetchAllComplete: '',
  navKeywords: [],
  selectedNavIndex: '',
  selectedKeywords: [],
  displayFilter: false
}

export const accordionSlice = createSlice({
  name: 'accordion',
  initialState,
  reducers: {
    setDisplayFilter: (state, action) => {
      state.displayFilter = action.payload
    },
    setNavkeywords: (state, action) => {
      state.fetchingKeywords = false
      state.navKeywords = action.payload.navKeywords

    },
    setSelectedNavIndex: (state, action) => {
      const indexExist = state.selectedNavIndex.split('-').find(f => action.payload.index !== "" && action.payload.index.replace('-', "") === f)
      if (indexExist) {
        
        state.selectedNavIndex = state.selectedNavIndex.split('-').filter(f => f !== "" && f !== indexExist).map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
        state.selectedKeywords = state.selectedKeywords.filter(f => f.index !== action.payload.index)
      }
      else {
        
        state.selectedNavIndex = state.selectedNavIndex.concat(action.payload.index).split('-').filter(f => f !== "").map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
        state.selectedKeywords = [...state.selectedKeywords, { keyword: action.payload.keyword, index: action.payload.index }]
      }

      
      state.displayFilter = action.payload.displayFilter
      state.fetchingKeywords = true
      state.startAt = 0
     

    },
    toggleDrawer: (state, action) => {

      state.drawerOpen = !state.drawerOpen
    },
    setMarkas: (state, action) => {

      state.markas = action.payload
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload
    },


    setSubcategory: (state, action) => {
      if(state.selectedSubcategory!==action.payload.subcategory){

        state.drawerOpen = !state.drawerOpen
        state.selectedSubcategory = action.payload.subcategory
        state.totalSubcategory = action.payload.totalSubcategory
        state.products = []
        state.keywords = null
        state.parentKeyword = null
        state.childkeywords = []
        state.totalKeyword = ''
        state.selectedKeyword = ''
        state.selectedKeywordTitle = ''
        state.startAt = 0
        state.fetching = false
        state.scrollHandled = false
      } else{
        state.drawerOpen = !state.drawerOpen
      }
    



    },
 
    

    setKeywords: (state, action) => {
      state.keywords = action.payload
      state.fetchingKeywords = false

    },
    
    setFetchingKeywords: (state, action) => {
      state.fetchingKeywords = action.payload
    },
    setFetchState: (state, action) => {
        if(state.startAt==0){
          state.products=[]
        }
      state.fetching = action.payload
    },

    //products

    productsFetched: (state, action) => {
      if( state.startAt===0){
        state.products = [...action.payload.products]
      } else{

        state.products = [...state.products, ...action.payload.products]
      }
     
      state.startAt = state.startAt + 100
      state.fetchAllComplete = action.payload.fetchAllComplete
      state.scrollHandled = false

      state.fetching = false
    },
    emptyProducts: (state, action) => {
      state.products = []
    },
    setScrollHandled: (state, action) => {
      state.scrollHandled = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const actions = accordionSlice.actions

export default accordionSlice.reducer