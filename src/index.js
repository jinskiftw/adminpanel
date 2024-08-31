/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Login from "./views/examples/Login.js";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import PrivateRoute from "components/PrivateRoute/index.js";
import ForgotPassword from "views/examples/ForgotPassword.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/admin/*" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        } />
        <Route path="/auth/*" element={<PrivateRoute>
          <AuthLayout />
        </PrivateRoute>} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<PrivateRoute>
          <Navigate to="/admin/index" replace />
        </PrivateRoute>} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
