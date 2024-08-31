import * as Types from "../constants/actionTypes";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import createHeaders from "../../utils/headers";


export const addCategory = (data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      headers['Content-Type'] = 'multipart/form-data';
      const response = await axios.post(`${baseUrl}/category/save`, data,{
        headers,
    });

      return dispatch({
        type: Types.ADDNEWCATEGORY,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.ADDNEWCATEGORY_FAILURE,
        data: err.response,
      });
    }
  };
};

export const getAllCategories = (search="",sorting) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.get(`${baseUrl}/category/allCategories?search=${search}`,{
        params:{sort:sorting},
        headers,
    });

      //console.log("getAllCategories=>",response)
      return dispatch({
        type: Types.ALLCATEGORYDATA,
        data: response,
      });
       
    } catch (err) {
      return dispatch({
        type: Types.CATEGORYDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const getCategory = (id) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.get(`${baseUrl}/category/${id}`,{
        headers,
    });

      return dispatch({
        type: Types.CATEGORYDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.CATEGORYDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const updateCategory = (id,data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      headers['Content-Type'] = 'multipart/form-data';
      const response = await axios.post(`${baseUrl}/category/update/${id}`,data,{
        headers,
    });
      return dispatch({
        type: Types.UPDATECATEGORYDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.UPDATECATEGORYDATA_FAILURE,
        data: err.response,
      });
    }
  };
};


export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.delete(`${baseUrl}/category/delete/${id}`,{
        headers,
    });
      return dispatch({
        type: Types.DELETECATEGORYDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.DELETECATEGORYDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

export const updateCategoryStatus = (id, data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.patch(`${baseUrl}/category/update-status/${id}`, data,{
        headers,
    });

      return dispatch({
        type: Types.UPDATECATEGORYSTATUSDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.UPDATECATEGORYDATA_FAILURE,
        data: err.response,
      });
    }
  };
};
