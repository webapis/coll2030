import { createSlice } from '@reduxjs/toolkit'

export const accordionSlice = createSlice({
  name: 'accordion',
  initialState: {
    accordionOneValue: '',
    accordionOneIsExpanded: true,
    accordionMarkaValue: '',
    accordionMarkaIsExpanded: true,
    selectedMarka: '',
    accordionSubcategoryIsExpanded: true,
    totalSubcategory: 0,
    selectedSubcategory: '',
    accordionKeywordsIsExpanded: true,
    selectedKeyword: '',
    keywords: {},
    totalKeyword:0,
    accordionProductIsExpanded:true


  },
  reducers: {
    setAccordionOne: (state, action) => {
      state.accordionOneValue = action.payload
      state.accordionOneIsExpanded = false

    },

    setAccordionMarka: (state, action) => {
      state.accordionMarkaValue = action.payload
      state.accordionmarkaIsExpanded = false

    },
    toggleAccordionOne: (state, action) => {
      state.accordionOneIsExpanded = !state.accordionOneIsExpanded
    },
    toggleAccordionMarka: (state, action) => {
      state.accordionMarkaIsExpanded = !state.accordionMarkaIsExpanded
    },
    setMarka: (state, action) => {
      state.selectedMarka = action.payload
      state.accordionMarkaIsExpanded = false

    },
    toggleAccordionSubcategory: (state, action) => {
      state.accordionSubcategoryIsExpanded = !state.accordionSubcategoryIsExpanded
    },

    setSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload.subcategory
      state.totalSubcategory = action.payload.totalSubcategory
      state.accordionSubcategoryIsExpanded = false
      
    },
    setSelectedKeyword: (state,action) => {
      state.selectedKeyword = action.payload.keyword
      state.totalKeyword = action.payload.total
      state.accordionKeywordsIsExpanded=false
      debugger
    },
    toggleAccordionKeywords: (state, action) => {
      state.accordionKeywordsIsExpanded = !state.accordionKeywordsIsExpanded
    },

    setKeywords: (state, action) => {
      state.keywords = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const actions = accordionSlice.actions

export default accordionSlice.reducer