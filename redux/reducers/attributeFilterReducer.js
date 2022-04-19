import { createAction, createReducer } from '@reduxjs/toolkit'

export const setAttributeFilter = createAction('SET_ATTRIBUTE_FILTERS')
export const addKeyAndSubKeys = createAction('ADD_KEY_AND_SUBKEYS')
export const selectAttributeFilter = createAction('SELECT_ATTRIBUTE_FILTER')
export const deselectAttributeFilter = createAction('DESELECT_ATTRIBUTE_FILTER')
export const sortSelectedAttributeFilters = createAction('SORT_SELECTED_ATTRIBUTE_FILTERS')
export const hideAttributeFilters = createAction('HIDE_ATTRIBUTE_FILTERS')

const attributeFilterReducer = createReducer([], (builder) => {
  builder
    .addCase(setAttributeFilter, (state, action) => {
      return action.payload
    })
    .addCase(selectAttributeFilter, (state, action) => {
      const item = action.payload.item
      const index = action.payload.index
      state[item.subKey][index].filterId = action.payload.filterId
      state[item.subKey][index].selected = !state[item.subKey][index].selected
    })
    .addCase(deselectAttributeFilter, (state, action) => {
      const item = action.payload.item
      state[item.subKey].forEach((i) => {
        if (i.filterId == item.filterId) {
          i.selected = false
          delete i.filterId
        }
      });
    })
    .addCase(sortSelectedAttributeFilters, (state, action) => {
      const item = action.payload.item
      state[item.subKey].sort((a, b) => {
        let aHas = a.hasOwnProperty("selected")
        let bHas = b.hasOwnProperty("selected")
        if (aHas && bHas) return b.selected - a.selected
        return aHas ? -1 : bHas ? 1 : 0;
      })
    })
    .addCase(hideAttributeFilters, (state, action) => {
      const searchInputValue = action.payload.searchInputValue;
      const attr = action.payload.attr
      state[attr].forEach((item) => {
        if (item.value) {
          if (item.value.toLowerCase().includes(searchInputValue.toLowerCase()) != true) {
            item.hide = true
          } else {
            delete item.hide
          }
        } else {
          item.hide = true
        }
      })
    })
})

export default attributeFilterReducer;
