import { createAction, createReducer } from '@reduxjs/toolkit'

export const setScrollPosition = createAction('SET_MARKETPLACE_SCROLL_POSITION')

const scrollPositionReducer = createReducer(0, (builder) => {
  builder
    .addCase(setScrollPosition, (state, action) => {
      return action.payload
    })
})

export default scrollPositionReducer;
