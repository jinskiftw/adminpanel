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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import CarManagement from "views/examples/CarManagement.js";
import UserManagement from "views/examples/UserManagement.js";
import CategoryManagement from "views/examples/CategoryManagement.js";
import PlanManagement from "views/examples/PlanManagement";
import Payment from "views/examples/Payment";
import VehicleLogManagement from "views/examples/VehicleLogManagement.js";
import BlogManagement from "views/examples/BlogManagement.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fas fa-tv",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-management",
    name: "User Management",
    icon: "fas fa-users",
    component: <UserManagement />,
    layout: "/admin",
  },
  {
    path: "/car-management",
    name: "Car Management",
    icon: "fas fa-car",
    component: <CarManagement />,
    layout: "/admin",
  },  
  {
    path: "/vehicle-logs",
    name: "Vehicle Logs",
    icon: "far fa-sticky-note",
    component: <VehicleLogManagement />,
    layout: "/admin",
  },  
  {
    path: "/category-management",
    name: "Category Management",
    icon: "fas fa-bars",
    component: <CategoryManagement />,
    layout: "/admin",
  },  
  {
    path: "/plan-management",
    name: "Plan Management",
    icon: "fas fa-circle",
    component: <PlanManagement />,
    layout: "/admin",
  },  
  {
    path: "/payments",
    name: "Payment Management",
    icon: "fas fa-dollar-sign",
    component: <Payment />,
    layout: "/admin",
  } 
];
export default routes;

