export const FAVOURITE = '[Favourite]';
export const FAVOURITE_ADD = `${FAVOURITE} ADD`;
export const FAVOURITE_REMOVE = `${FAVOURITE} REMOVE`;

export const addFavourite = payload => ({
  type: FAVOURITE_ADD,
  payload,
});

export const removeFavourite = payload => ({
  type: FAVOURITE_REMOVE,
  payload,
});