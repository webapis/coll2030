import { createSlice } from '@reduxjs/toolkit'

const initialState = {


  drawerOpen: false,
  accordionMarkaValue: '',
  accordionMarkaIsExpanded: true,
  selectedMarka: '',
  accordionSubcategoryIsExpanded: true,
  totalSubcategory: 0,
  selectedSubcategory: 'elbise',
  accordionKeywordsIsExpanded: true,
  selectedKeyword: '',
  selectedKeywordTitle: '',
  keywords: null,
  totalKeyword: 0,
  accordionProductIsExpanded: true,
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
  selectedKeywords: []
}

export const accordionSlice = createSlice({
  name: 'accordion',
  initialState,
  reducers: {
    setNavkeywords: (state, action) => {

      state.navKeywords = action.payload.navKeywords

    },
    setSelectedNavIndex: (state, action) => {
      const indexExist = state.selectedNavIndex.split('-').find(f => action.payload.index !== "" && action.payload.index.replace('-', "") === f)
      if (indexExist) {
        debugger
        state.selectedNavIndex = state.selectedNavIndex.split('-').filter(f => f !== "" && f !== indexExist).map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
        state.selectedKeywords = state.selectedKeywords.filter(f => f !== action.payload.keyword)
      }
      else {
        debugger
        state.selectedNavIndex = state.selectedNavIndex.concat(action.payload.index).split('-').filter(f => f !== "").map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
        state.selectedKeywords = [...state.selectedKeywords, action.payload.keyword]
      }

      debugger


      state.startAt = 0
      state.products = []

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
    setMainTab: (state, action) => {
      state.selectedMainTab = action.payload
      state.accordionMarkaValue = ''
      state.accordionMarkaIsExpanded = true
      state.selectedMarka = ''
      state.accordionSubcategoryIsExpanded = true
      state.totalSubcategory = 0
      state.selectedSubcategory = ''
      state.accordionKeywordsIsExpanded = true
      state.selectedKeyword = ''
      state.selectedKeywordTitle = ''
      state.keywords = null
      state.parentKeyword = null
      state.childkeywords = []
      state.totalKeyword = 0
      state.accordionProductIsExpanded = true
      //products
      state.products = []
      state.startAt = 0
      state.fetching = false
      state.scrollHandled = false
      state.fetchingKeywords = false
      state.subcategories = []
      state.markas = []
    },
    setAccordionMarka: (state, action) => {
      state.accordionMarkaValue = action.payload
      state.accordionmarkaIsExpanded = false
    },

    toggleAccordionMarka: (state, action) => {
      state.accordionMarkaIsExpanded = !state.accordionMarkaIsExpanded
    },
    setMarka: (state, action) => {
      if (state.selectedMarka !== action.payload) {
        state.selectedMarka = action.payload
        state.accordionMarkaIsExpanded = false
        state.products = []
        state.totalSubcategory = 0
        state.selectedSubcategory = ''
        state.accordionSubcategoryIsExpanded = true

        state.keywords = null
        state.parentKeyword = null
        state.childkeywords = []
        state.totalKeyword = ''
        state.selectedKeyword = ''
        state.selectedKeywordTitle = ''
        state.accordionKeywordsIsExpanded = true
        state.subcategories = []

        state.startAt = 0
        state.fetching = false
        state.scrollHandled = false

      } else {

        state.accordionMarkaIsExpanded = false
      }



    },
    toggleAccordionSubcategory: (state, action) => {
      state.accordionSubcategoryIsExpanded = !state.accordionSubcategoryIsExpanded
    },

    setSubcategory: (state, action) => {
      state.drawerOpen = !state.drawerOpen
      state.selectedSubcategory = action.payload.subcategory
      state.totalSubcategory = action.payload.totalSubcategory
      state.accordionSubcategoryIsExpanded = false
      state.products = []
      state.keywords = null
      state.parentKeyword = null
      state.childkeywords = []
      state.totalKeyword = ''
      state.selectedKeyword = ''
      state.selectedKeywordTitle = ''
      state.accordionKeywordsIsExpanded = true
      state.accordionSubcategoryIsExpanded = false
      state.startAt = 0
      state.fetching = false
      state.scrollHandled = false



    },
    setSelectedKeyword: (state, action) => {
      state.products = []
      state.startAt = 0
      state.fetching = false
      state.scrollHandled = false
      state.selectedKeyword = action.payload.keyword
      state.selectedKeywordTitle = action.payload.title
      state.parentKeyword = action.payload.parentKeyword
      state.childkeywords = action.payload.childkeywords
      state.totalKeyword = action.payload.total
      state.accordionKeywordsIsExpanded = false

    },
    toggleAccordionKeywords: (state, action) => {
      state.accordionKeywordsIsExpanded = !state.accordionKeywordsIsExpanded
    },

    setKeywords: (state, action) => {
      state.keywords = action.payload
      state.fetchingKeywords = false

    },
    setFetchingKeywords: (state, action) => {
      state.fetchingKeywords = action.payload
    },
    setFetchState: (state, action) => {
      state.fetching = action.payload
    },

    //products

    productsFetched: (state, action) => {
      state.products = [...state.products, ...action.payload.products]
      state.startAt = state.startAt + 100
      state.fetchAllComplete = action.payload.fetchAllComplete
      state.scrollHandled = false

      state.fetching = false
    },
    emptyProducts: (state, action) => {
      state.products = []
    },
    setFetchState: (state, action) => {
      state.fetching = action.payload
    },
    setScrollHandled: (state, action) => {
      state.scrollHandled = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const actions = accordionSlice.actions

export default accordionSlice.reducer