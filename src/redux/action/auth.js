import * as Types from "../constants/actionTypes";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";

export const logIn = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/user/adminLogin`, data);
      if (response.data.token) {
        window.localStorage.setItem("token", response.data.token)
      }
      return dispatch({
        type: Types.LOGIN,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.LOGIN_FAILURE,
        data: err.response,
      });
    }
  };
};

export const addUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/user/register`, data);

      return dispatch({
        type: Types.USERDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.ADDNEWUSER_FAILURE,
        data: err.response,
      });
    }
  };
};

export const getAllUser = (searchUser,sorting) => {
  return async (dispatch) => {
    try {
       
      const response = await axios.get(`${baseUrl}/user/getUser?searchUser=${searchUser}`,{
        params:{sort:sorting},
      });

      //console.log("getAllUser=>",response)
      return dispatch({
        type: Types.USERDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.USERDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const getDashboardData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/user/dashboardCounts`);

      return dispatch({
        type: Types.DASHBOARDDATA,
        key:'count',
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.USERDATA_FAILURE,
        data: err.response,
      });
    }
  };
};


export const getDashboardRecentPayment = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/dashboard/recent-transaction`);

      return dispatch({
        type: Types.DASHBOARDDATA,
        key:'recentPayments',
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.USERDATA_FAILURE,
        data: err.response,
      });
    }
  };
};




export const getDashboardCostBreakdown = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/dashboard/cost-tracking/cost-breakdown-by-category`);

      return dispatch({
        type: Types.DASHBOARDDATA,
        key:'costBreakdown',
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.USERDATA_FAILURE,
        data: err.response,
      });
    }
  };
};









export const deleteUser = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${baseUrl}/user/deleteUser/${data}`);
      return dispatch({
        type: Types.DELETEUSERDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.DELETEUSERDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const forgotPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${baseUrl}/user/forgetpassword`, data);
      return dispatch({
        type: Types.FORGOT_PASSWORD,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.FORGOT_PASSWORD_FAILURE,
        data: err.response,
      });
    }
  };
};

export const updateUserStatus = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`${baseUrl}/user/updateUserAccount/${id}`, data);
      //console.log(response,"resresr");
      return dispatch({
        type: Types.USERDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.ADDNEWUSER_FAILURE,
        data: err.response,
      });
    }
  };
};

export const logoutAction = () => {
  return {
    type: Types.LOGOUT,
  };
};