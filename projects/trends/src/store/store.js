import { configureStore } from '@reduxjs/toolkit'
import collectedDataSlice from './collectedDataSlice'
import keywordsSlice from './keywordsSlice'
import mainSlice from './mainSlice'

const store = configureStore({
  reducer: {


    collectedData:collectedDataSlice,
    keywords:keywordsSlice,
    main:mainSlice

  }
})


export default store