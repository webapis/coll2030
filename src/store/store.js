import { configureStore } from '@reduxjs/toolkit'
import breadcrumbSlice from './breadcrumbSlice'


const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbSlice,

  }
})


export default store