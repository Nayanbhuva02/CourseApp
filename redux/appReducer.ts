import { combineReducers } from "@reduxjs/toolkit";
import { courseSlice } from "./slices/courseSlice";

const appReducer = combineReducers({
  course: courseSlice.reducer,
});
const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
