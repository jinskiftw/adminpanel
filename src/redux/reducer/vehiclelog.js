import * as Types from "../constants/actionTypes";

const initialState = {
  vehicleLogData: [],
  allVehicleLogData:  [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case Types.ALL_VEHICLELOGDATA:
      return {
        ...state,
        allVehicleLogData: action.data.data,
        error: null,
      };
    case Types.VEHICLELOGDATA:
      return {
        ...state,
        vehicleLogData: action.data.data,
        error: null,
      };
    default:
      return state;
  }
};


