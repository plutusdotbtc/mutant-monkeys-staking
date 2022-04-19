import { createAction, createReducer } from '@reduxjs/toolkit'

export const setPageCount = createAction('SET_MARKETPLACE_PAGE_COUNT')

const marketplacePageCountReducer = createReducer(0, (builder) => {
  builder
    .addCase(setPageCount, (state, action) => {
      return action.payload
    })
})

export default marketplacePageCountReducer;
