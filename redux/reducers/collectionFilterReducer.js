import { createAction, createReducer } from '@reduxjs/toolkit'

export const setCollectionFilters = createAction('SET_COLLECTION_FILTERS')
export const selectCollectionFilter = createAction('SELECT_COLLECTION_FILTER')
export const hideCollectionFilters = createAction('HIDE_COLLECTION_FILTERS')

const collectionFilterReducer = createReducer([], (builder) => {
  builder
    .addCase(setCollectionFilters, (state, action) => {
      return action.payload
    })
    .addCase(selectCollectionFilter, (state, action) => {
      state.forEach((item) => {
        if (item.contract_key == action.payload.contract_key) {
          item.selected = true
          item.filterId = action.payload.filterId
        } else {
          item.selected = false
        }
      })
      state.sort((a, b) => b.selected - a.selected)
    })
    .addCase(hideCollectionFilters, (state, action) => {
      const searchInputValue = action.payload.searchInputValue;
      state.forEach((item) => {
        if (item.title.toLowerCase().includes(searchInputValue.toLowerCase()) != true) {
          item.hide = true
        } else {
          delete item.hide
        }
      })
    })
})

export default collectionFilterReducer;
