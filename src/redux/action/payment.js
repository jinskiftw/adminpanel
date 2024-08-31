import * as Types from "../constants/actionTypes";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import createHeaders from "../../utils/headers";


export const getAllPayments= (search="",sorting) => {
    return async (dispatch) => {
      try {
        let headers = createHeaders();
        const response = await axios.get(`${baseUrl}/payment?search=${search}&pageSize=100`,{
          params:{sort:sorting},
          headers,
      });
  
        console.log("action allpayment=>",response)
        return dispatch({
          type: Types.ALLPAYMENTDATA,
          data: response,
        });
         
      } catch (err) {
        return dispatch({
          type: Types.ALLPAYMENTDATA_FAILURE,
          data: err.response,
        });
      }
    };
  };
  