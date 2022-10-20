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
  filteredGroupName: {groupName:''},
  keywordsToDisplay: null
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
  debugger
    },
    setLoadingKeywords: (state, action) => {
      state.loadingKeywords = action.payload
      debugger
    },
    setPostingNewKeyword: (state, action) => {

      state.postingNewKeyword = action.payload
    },

    editKeyword: (state, action) => {
      state.addKeywords = true
      state.editor = action.payload
    },


    setFilteredGroupName:(state,action)=>{
      state.filteredGroupName=action.payload
      debugger
    }
  },

})

// Action creators are generated for each case reducer function
export const actions = keywordsSlice.actions

export default keywordsSlice.reducer