import { combineReducers } from "redux";
import themeReducer from "./themeReducer";

const createRootReducer = () => {
  const rootReducer = combineReducers({ theme: themeReducer });
  return rootReducer;
};

export default createRootReducer;
