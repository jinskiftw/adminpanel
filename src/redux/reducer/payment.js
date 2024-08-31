import * as Types from "../constants/actionTypes";

const initialState = {
 
  allPaymentData:  [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case Types.ALLPAYMENTDATA:
      return {
        ...state,
        allPaymentData: action.data.data.data,
        error: null,
      };
 
    default:
      return state;
  }
};


