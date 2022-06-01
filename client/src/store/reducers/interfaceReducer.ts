import { createReducer } from "@reduxjs/toolkit";
import { interfaceAction } from "../actions/interface-action";
import { InterfaceState, Note } from "../types";

const defaultState: InterfaceState = {
  isEdit: false,
  currentNote: {} as Note,
  isVisible: false,
};
export const interfaceReducer = createReducer<InterfaceState>(defaultState, (builder) => {
  builder.addCase(interfaceAction.isEdit, (state, action: any) => {
    console.log("isEdit", action);
    state.currentNote = action.note;
    state.isEdit = true;
  });
  builder.addCase(interfaceAction.isVisible, (state, action: any) => {
    state.isVisible = action.isVisible;
  });
  builder.addCase(interfaceAction.isCreate, (state, action: any) => {
    state.isEdit = false;
  });
});
