import { configureStore } from '@reduxjs/toolkit'
import breadcrumbSlice from './breadcrumbSlice'
import mainTabSlice from './mainTabSlice'
import accordionSlice from './accordionSlice'
import productsSlice from './productsSlice'

const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbSlice,
    maintab: mainTabSlice,
    products: productsSlice,
    accordion:accordionSlice
  }
})


export default store