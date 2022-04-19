import { createAction, createReducer } from '@reduxjs/toolkit'

export const selectSortFilterItem = createAction('SELECT_SORT_FILTER_ITEM')
export const selectInitialSortFilterItem = createAction('SELECT_INITIAL_SORT_FILTER_ITEM')

const initialState = [
  {
    id: 0,
    title: 'Recently Listed',
    query: 'list_block_height',
    sort: -1,
    selected: false,
    key: 'sortFilter',
    listed: [true]
  },
  {
    id: 1,
    title: 'Recently Sold',
    query: 'buys',
    sort: -1,
    selected: false,
    key: 'sortFilter',
    listed: [true]
  },
  {
    id: 2,
    title: 'For Sale: Low to High',
    query: 'list_price',
    sort: 1,
    selected: false,
    key: 'sortFilter',
    listed: [true]
  },
  {
    id: 3,
    title: 'For Sale: High to Low',
    query: 'list_price',
    sort: -1,
    selected: false,
    key: 'sortFilter',
    listed: [true]
  },
  {
    id: 4,
    title: 'Collection: Bid High',
    query: 'bid_price',
    sort: -1,
    selected: false,
    key: 'sortFilter',
    listed: [true, false]
  },
  {
    id: 5,
    title: 'Collection: Bid Low',
    query: 'bid_price',
    sort: 1,
    selected: false,
    key: 'sortFilter',
    listed: [true, false]
  },
  {
    id: 6,
    title: 'Collection: Rarest First',
    query: 'ranking',
    sort: 1,
    selected: false,
    key: 'sortFilter',
    listed: [true, false]
  },
  {
    id: 7,
    title: 'Collection: Least Rare First',
    query: 'ranking',
    sort: -1,
    selected: false,
    key: 'sortFilter',
    listed: [true, false]
  },
  {
    id: 8,
    title: 'Collection: Low Id First',
    query: 'token_id',
    sort: 1,
    selected: false,
    key: 'sortFilter',
    listed: [true, false]
  },
  {
    id: 9,
    title: 'Collection: High Id First',
    query: 'token_id',
    sort: -1,
    selected: false,
    key: 'sortFilter',
    listed: [true, false]
  }
]

const sortFilterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectSortFilterItem, (state, action) => {
      state.forEach((item) => {
        if (item.id == action.payload.id) {
          item.selected = true
          item.filterId = action.payload.filterId
        } else {
          item.selected = false
        }
      })
      state.sort((a, b) => b.selected - a.selected)
    })
    .addCase(selectInitialSortFilterItem, (state, action) => {
      for (let item of state) {
        if (item.id == 0) {
          item.selected = true
          item.filterId = action.payload.filterId
        } else {
          item.selected = false
        }
      }
      state.sort((a, b) => b.selected - a.selected)
    })
})

export default sortFilterReducer;
