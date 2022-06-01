import { createReducer } from "@reduxjs/toolkit";
import { Note, Stat } from "../types";

export type NoteState = { notes: Note[]; notesStats: Stat[]; updateNotes: boolean };
const defaultState: NoteState = {
  notes: [],
  notesStats: [],
  updateNotes: false,
};
export const noteReducer = createReducer<NoteState>(defaultState, (builder) => {
  builder.addCase("getNotes", (state, action: any) => {
    state.notes = [...action.payload.note];
  });
  builder.addCase("getStats", (state, action: any) => {
    state.notesStats = [...action.payload.stats];
  });
  builder.addCase("update", (state, action: any) => {
    state.updateNotes = !state.updateNotes;
  });
});
