export const initialState = null;

export const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DEVICE": {
      return action.payload;
    }
    default:
      return state;
  }
};
