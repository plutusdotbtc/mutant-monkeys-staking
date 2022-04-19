import { createAction, createReducer } from '@reduxjs/toolkit'

export const setCurrentCollection = createAction('SET_CURRENT_COLLECTION')

const currentCollectionReducer = createReducer([], (builder) => {
  builder
    .addCase(setCurrentCollection, (state, action) => {
      return action.payload.collectionId
    })
})

export default currentCollectionReducer;
