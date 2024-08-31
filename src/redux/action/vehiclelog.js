import * as Types from "../constants/actionTypes";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import createHeaders from "../../utils/headers";


export const getAllVehicleLogs = (search,sorting) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.get(`${baseUrl}/vehicle-log/all?search=${search}`,{
        params:{sort:sorting},
        headers,
    });

      //console.log("getAllVehicleLogs=>",response)
      return dispatch({
        type: Types.ALL_VEHICLELOGDATA,
        data: response,
      });
       
    } catch (err) {
      return dispatch({
        type: Types.VEHICLELOGDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const getVehicleLog = (id) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.get(`${baseUrl}/vehicle-log/${id}`,{
        headers,
    });

      return dispatch({
        type: Types.ALL_VEHICLELOGDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.VEHICLELOGDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const deleteVehicleLog = (id) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.delete(`${baseUrl}/vehicle-log/delete/${id}`,{
        headers,
    });
      return dispatch({
        type: Types.DELETE_VEHICLELOGDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.DELETE_VEHICLELOGDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const updateVehicleLogStatus = (id, data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.patch(`${baseUrl}/vehicle-log/update-status/${id}`, data,{
        headers,
    });

      return dispatch({
        type: Types.UPDATE_VEHICLELOGSTATUSDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.UPDATE_VEHICLELOGDATA_FAILURE,
        data: err.response,
      });
    }
  };
};
