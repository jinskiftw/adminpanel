import * as Types from "../constants/actionTypes";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import createHeaders from "../../utils/headers";
 

export const addPlan = (data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      //headers['Content-Type'] = 'multipart/form-data';
      const response = await axios.post(`${baseUrl}/plan`, data,{
        headers,
    });

      return dispatch({
        type: Types.ADDNEWPLAN,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.ADDNEWPLAN_FAILURE,
        data: err.response,
      });
    }
  };
};

export const getAllPlans = (search="",sorting) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.get(`${baseUrl}/plan?search=${search}`,{
        params:{sort:sorting},
        headers,
    });

      //console.log("getAllCategories=>",response)
      return dispatch({
        type: Types.ALLPLANDATA,
        data: response,
      });
       
    } catch (err) {
      return dispatch({
        type: Types.ALLPLANDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

 
export const updatePlan = (id,data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
 
      const response = await axios.put(`${baseUrl}/plan/${id}`,data,{
        headers,
    });
      return dispatch({
        type: Types.UPDATEPLANDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.UPDATEPLANDATA_FAILURE,
        data: err.response,
      });
    }
  };
};


export const  deletePlan = (id) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.delete(`${baseUrl}/plan/${id}`,{
        headers,
    });
      return dispatch({
        type: Types.DELETEPLANDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.DELETEPLANDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

    
