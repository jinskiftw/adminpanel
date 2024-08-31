import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import car from "./car";
import vehiclelog from "./vehiclelog";
import plan from "./plan";
import payment from "./payment";

const rootReducer = combineReducers({
  auth,
  category,
  car,
  vehiclelog,
  plan,
  payment
});

export default rootReducer;
