import * as Types from "../constants/actionTypes";

const initialState = {
  catgoryData: [],
  allCatgoryData:  [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case Types.ALLCATEGORYDATA:
      return {
        ...state,
        allCatgoryData: action.data.data,
        error: null,
      };
    case Types.CATEGORYDATA:
      return {
        ...state,
        catgoryData: action.data.data,
        error: null,
      };
    default:
      return state;
  }
};


