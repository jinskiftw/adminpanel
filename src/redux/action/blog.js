import * as Types from "../constants/actionTypes";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import createHeaders from "../../utils/headers";
 

export const addBlog = (data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      //headers['Content-Type'] = 'multipart/form-data';
      const response = await axios.post(`${baseUrl}/blog`, data,{
        headers,
    });

      return dispatch({
        type: Types.ADDNEWBLOG,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.ADDNEWBLOG_FAILURE,
        data: err.response,
      });
    }
  };
};

export const getAllBlogs = (search="",sorting) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.get(`${baseUrl}/blog?search=${search}`,{
        params:{sort:sorting},
        headers,
    });

      //console.log("getAllCategories=>",response)
      return dispatch({
        type: Types.ALLBLOGDATA,
        data: response,
      });
       
    } catch (err) {
      return dispatch({
        type: Types.ALLBLOGDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

 
export const updateBlog = (id,data) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
 
      const response = await axios.put(`${baseUrl}/blog/${id}`,data,{
        headers,
    });
      return dispatch({
        type: Types.UPDATEBLOGDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.UPDATEBLOGDATA_FAILURE,
        data: err.response,
      });
    }
  };
};


export const  deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      let headers = createHeaders();
      const response = await axios.delete(`${baseUrl}/blog/${id}`,{
        headers,
    });
      return dispatch({
        type: Types.DELETEBLOGDATA,
        data: response,
      });
    } catch (err) {
      return dispatch({
        type: Types.DELETEBLOGDATA_FAILURE,
        data: err.response,
      });
    }
  };
};

    
