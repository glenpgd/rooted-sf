import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = collectionsMap => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap
});