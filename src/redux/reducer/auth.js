import * as Types from "../constants/actionTypes";

const initialState = {
  userData: [],
  alluserData: "",
  dashboardData:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        userData: action.data.data.userDetails,
        error: null,
      };
    case Types.USERDATA:
     
      return {
        ...state,
        alluserData: action.data.data,
        error: null,
      };
    case Types.DASHBOARDDATA:
     
      return {
        ...state,
        dashboardData: {
          ...state.dashboardData,
          [action.key]: action.data.data.data,
        },
        error: null,
      };
    case Types.LOGOUT:
      return {
        ...state,
        userData: [],
        error: null,
      };
    default:
      return state;
  }
};


