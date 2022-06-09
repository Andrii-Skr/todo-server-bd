import { createReducer } from "@reduxjs/toolkit";
import { isCreateAction, isEditAction, isVisibleAction } from "../actions/interface-action";
import { InterfaceState, Note } from "../types";

const defaultState: InterfaceState = {
  isEdit: false,
  currentNote: {} as Note,
  isVisible: false,
};
export const interfaceReducer = createReducer<InterfaceState>(defaultState, (builder) => {
  builder.addCase(isEditAction, (state, action) => {
    console.log("isEdit", action);
    state.currentNote = action.payload.note;
    state.isEdit = true;
  });
  builder.addCase(isVisibleAction, (state, action) => {
    state.isVisible = action.payload.isVisible;
  });
  builder.addCase(isCreateAction, (state, action) => {
    state.isEdit = false;
  });
});
