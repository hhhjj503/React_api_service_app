import React from "react";
import { combineReducers } from "redux";
import sections from "./reducers/sections";
import chosenDistricts from "./reducers/chosenDistricts";
import fineDust from "./reducers/fineDust";

const rootReducer = combineReducers({
  sections,
  chosenDistricts,
  fineDust,
});

export default rootReducer;
