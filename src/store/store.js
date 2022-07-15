import { configureStore } from '@reduxjs/toolkit'
import breadcrumbSlice from './breadcrumbSlice'
import mainTabSlice from './mainTabSlice'
import accordionSlice from './accordionSlice'


const store = configureStore({
  reducer: {
    breadcrumb:breadcrumbSlice,
    accordion:accordionSlice,
    maintab:mainTabSlice
  }
})


export default store