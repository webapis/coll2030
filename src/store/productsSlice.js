import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        startAt: 0,
        fetching: false,
        scrollHandled: false
    },
    reducers: {
        productsFetched: (state, action) => {
            state.products = [...state.products, ...action.payload.products]
            state.startAt = state.startAt + 100

            state.scrollHandled = false

            state.fetching = false
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
export const actions = productsSlice.actions

export default productsSlice.reducer