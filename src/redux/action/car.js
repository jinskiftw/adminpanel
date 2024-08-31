import * as Types from "../constants/actionTypes";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import createHeaders from "../../utils/headers";


export const getAllCars = (id,search="",sortvalue={}) => {
  return async (dispatch) => {
    try {
      var query="";
      if(id){
        query=`?carId=${id}`;
      }
      if(search)
      {
        query=`?search=${search}`;
      }
      console.log(`${baseUrl}/user/allCars${query}`)
      let headers = createHeaders();
      const response = await axios.get(`${baseUrl}/user/allCars${query}`,{
        params:{sort:sortvalue},
        headers,
    });

      console.log("getAllCars=>",response)
      return dispatch({
        type: Types.ALL_CARDATA,
        data: response,
      });
       
    } catch (err) {
      return dispatch({
        type: Types.CARDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const getCar = (id) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.get(`${baseUrl}/user/cars/${id}`,{
        headers,
    });

      return dispatch({
        type: Types.CARDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.CARDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const deleteCar = (id) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.delete(`${baseUrl}/user/car/delete/${id}`,{
        headers,
    });
      return dispatch({
        type: Types.DELETE_CARDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.DELETE_CARDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const updateCarStatus = (id, data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.patch(`${baseUrl}/user/car/update-status/${id}`, data,{
        headers,
    });

      return dispatch({
        type: Types.UPDATE_CARSTATUSDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.UPDATE_CARDATA_FAILURE,
        data: err.response,
      });
    }
  };
};
