import { createAction } from "@reduxjs/toolkit";
import { Note } from "../types";

// export type InterfaceAction = {
//   isEdit: string;
//   isVisible: string;
// };

// export const interfaceAction = {
//   isEdit: "isEdit",
//   isVisible: "isVisible",
//   isCreate: "isCreate",
// };

export type EditNote = { note: Note };

export const isCreateAction = createAction("isCreate");
export const isEditAction = createAction<EditNote>("isEdit");
export const isVisibleAction = createAction<{ isVisible: boolean }>("isVisible");
