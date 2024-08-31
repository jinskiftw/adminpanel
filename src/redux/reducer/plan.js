import * as Types from "../constants/actionTypes";

const initialState = {
  planData: [],
  allPlanData:  [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case Types.ALLPLANDATA:
      return {
        ...state,
        allPlanData: action.data.data,
        error: null,
      };
    case Types.PLANDATA:
      return {
        ...state,
        planData: action.data.data,
        error: null,
      };
    default:
      return state;
  }
};


