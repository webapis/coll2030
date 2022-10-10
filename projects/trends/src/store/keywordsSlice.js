import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editor: {
    keywords: '',
    title: '',
    exclude: '',
    keywordType: '',
    groupName: '',
    functionName: ''
  },
  keywords: [],
  addKeywords: false,
  loadingKeywords: false,
  postingNewKeyword: false,
  filteredGroupName:'',
  filteredKeywords:[]
}

export const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    setEditorValue: (state, action) => {
      state.editor[action.payload.name] = action.payload.value
      if (action.payload.name === 'keywordType' && action.payload.value === 'marka') {
        state.groupName = 'Marka'

      }
      else if (action.payload.name === 'keywordType' && action.payload.value === 'fiyat') {
        state.groupName = 'Fiyat'
      }
    },
    setKeywords: (state, action) => {
      state.keywords = action.payload
    },

    setAddKeywords: (state, action) => {
      state.addKeywords = !state.addKeywords
    },
    setAddedKeyword: (state, action) => {
      state.keywords = [...state.keywords, action.payload]
      state.addKeywords = false
    },
    setLoadingKeywords: (state, action) => {
      state.loadingKeywords = action.payload
    },
    setPostingNewKeyword: (state, action) => {
      debugger
      state.postingNewKeyword = action.payload
    },
    setKeywordsFilter: (state, action) => {

      debugger
     state.filteredKeywords = action.payload
      state.filteredGroupName=action.payload
      debugger
    }
  },

})

// Action creators are generated for each case reducer function
export const actions = keywordsSlice.actions

export default keywordsSlice.reducer