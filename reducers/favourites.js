import { FAVOURITE_ADD, FAVOURITE_REMOVE } from '../actions';

export const initialState = [];

export const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITE_ADD: {
      return [...state, action.payload];
    }
    case FAVOURITE_REMOVE: {
      return state.filter(element => element.slug !== action.payload);
    }
    default:
      return state;
  }
};