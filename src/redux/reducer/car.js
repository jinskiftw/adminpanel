import * as Types from "../constants/actionTypes";

const initialState = {
  carData: [],
  allCarData:  [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case Types.ALL_CARDATA:
      return {
        ...state,
        allCarData: action.data.data,
        error: null,
      };
    case Types.CARDATA:
      return {
        ...state,
        carData: action.data.data,
        error: null,
      };
    default:
      return state;
  }
};


