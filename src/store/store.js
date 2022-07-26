import { configureStore } from '@reduxjs/toolkit'

import accordionSlice from './accordionSlice'


const store = configureStore({
  reducer: {


    accordion:accordionSlice

  }
})


export default store