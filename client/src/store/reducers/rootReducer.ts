import { combineReducers } from "redux";
import { RootState } from "../types";
import { interfaceReducer } from "./interfaceReducer";
import { noteReducer } from "./noteReducer";
import { userAuthReducer } from "./userAuthReducer";

export const rootReducer = combineReducers<RootState>({
  notes: noteReducer,
  user: userAuthReducer,
  interface: interfaceReducer,
});
