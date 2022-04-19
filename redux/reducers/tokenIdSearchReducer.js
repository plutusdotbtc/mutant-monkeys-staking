import { createAction, createReducer } from '@reduxjs/toolkit'

export const setTokenIdSearchItems = createAction('SET_TOKEN_ID_SEARCH_ITEMS')

const tokenIdSearchReducer = createReducer([], (builder) => {
  builder
    .addCase(setTokenIdSearchItems, (state, action) => {
      return action.payload
    })
})

export default tokenIdSearchReducer;
