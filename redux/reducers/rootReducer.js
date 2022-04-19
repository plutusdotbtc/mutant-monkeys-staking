import {combineReducers} from 'redux';
import sortFilterReducer from './sortFilterReducer';
import collectionFilterReducer  from './collectionFilterReducer';
import attributeFilterReducer from './attributeFilterReducer';
import filterItemCardsReducer from './filterItemCardsReducer';
import currentCollectionReducer from './currentCollectionReducer';
import tokenIdSearchReducer from './tokenIdSearchReducer';
import marketplacePageCountReducer from './marketplacePageCountReducer';
import scrollPositionReducer from './scrollPositionReducer';

const rootReducer = combineReducers({
  sortFilter: sortFilterReducer,
  collectionFilter: collectionFilterReducer,
  attributeFilter: attributeFilterReducer,
  filterItemCards: filterItemCardsReducer,
  currentCollection: currentCollectionReducer,
  tokenIdSearchItems: tokenIdSearchReducer,
  marketplacePageCount:  marketplacePageCountReducer,
  scrollPosition: scrollPositionReducer
});

export default rootReducer;