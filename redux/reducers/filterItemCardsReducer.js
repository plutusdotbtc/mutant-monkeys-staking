import { createAction, createReducer } from '@reduxjs/toolkit'

export const addCollectionFilterItemCard = createAction('ADD_COLLECTION_FILTER_ITEM_CARD')
export const removeCollectionFilterItemCard = createAction('REMOVE_COLLECTION_FILTER_ITEM_CARD')
export const sortFilterItemCards = createAction('SORT_COLLECTION_FILTER_ITEM_CARD')
export const addSortFilterItemCard = createAction('ADD_SORT_FILTER_ITEM_CARD')
export const removeSortFilterItemCard = createAction('REMOVE_SORT_FILTER_ITEM_CARD')
export const addAttributeFilterItemCard = createAction('ADD_ATTRIBUTE_FILTER_ITEM_CARD')
export const removeAttributeFilterItemCard = createAction('REMOVE_ATTRIBUTE_FILTER_ITEM_CARD')
export const removeAllAttributeFilterItemCards = createAction('REMOVE_ALL_ATTRIBUTE_FILTER_ITEM_CARDS')
export const removeAllFilterItemCards = createAction('REMOVE_ALL_FILTER_ITEM_CARDS')
export const addTokenIdFilterItemCard = createAction('ADD_TOKEN_ID_FILTER_ITEM_CARD')
export const removeTokenIdFilterItemCard = createAction('REMOVE_TOKEN_ID_FILTER_ITEM_CARD')

const filterItemCardsReducer = createReducer([], (builder) => {
  builder
    .addCase(addCollectionFilterItemCard, (state, action) => {
      state.push({
        filterId: action.payload.filterID,
        id: action.payload.collection.id,
        title: action.payload.collection.title,
        key: action.payload.collection.key,
        contract_key: action.payload.collection.contract_key,
        image: action.payload.collection.image,
        selected: true
      })
    })
    .addCase(removeCollectionFilterItemCard, (state, action) => {
      return state.filter(item => item.key !== 'filterCollections')
    })
    .addCase(sortFilterItemCards, (state, action) => {
      state.sort((x,y) =>{
        return x.key == 'filterCollections' ? -1 : y.key == 'filterCollections' ? 1 : 0;
      })
    })
    .addCase(addSortFilterItemCard, (state, action) => {
      state.push({
        filterId: action.payload.filterId,
        id: action.payload.sortItem.id,
        title: action.payload.sortItem.title,
        sort: action.payload.sortItem.sort,
        query: action.payload.sortItem.query,
        key: action.payload.sortItem.key,
        listed: action.payload.sortItem.listed
      })
    })
    .addCase(removeSortFilterItemCard, (state, action) => {
      return state.filter(item => item.key !== 'sortFilter')
    })
    .addCase(addAttributeFilterItemCard, (state, action) => {
      state.push({
        filterId: action.payload.filterId,
        index: action.payload.index,
        selected: true,
        value: action.payload.attributeItem.value,
        rarity: action.payload.attributeItem.rarity,
        title: action.payload.attributeItem.subKey + " - " + action.payload.attributeItem.value,
        key: action.payload.attributeItem.key,
        subKey: action.payload.attributeItem.subKey
      })
    })
    .addCase(removeAttributeFilterItemCard, (state, action) => {
      return state.filter(item => item.filterId !== action.payload.item.filterId)
    })
    .addCase(removeAllAttributeFilterItemCards, (state, action) => {
      return state.filter(item => item.key != 'attributes')
    })
    .addCase(removeAllFilterItemCards, (state, action) => {
      return []
    })
    .addCase(addTokenIdFilterItemCard, (state, action) => {
      state.push({
        title: 'Search By ID',
        key: 'tokenIdSearch'
      })
    })
    .addCase(removeTokenIdFilterItemCard, (state, action) => {
      return state.filter(item => item.key !== 'tokenIdSearch')
    })
})

export default filterItemCardsReducer;
