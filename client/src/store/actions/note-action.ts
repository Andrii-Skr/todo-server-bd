import { createAction } from "@reduxjs/toolkit";
import { GetNoteResponse, GetStatsResponse } from "src/api/note-api";

// export type NoteAction = {
//   getNotes: string;
//   getStats: string;
//   update: string;
//   loading: string;
// };

// export const noteAction = {
//   getNotes: "noteActionGetNotes",
//   getStats: "noteActionGetStats",
//   update: "noteActionUpdate",
//   loading: "noteActionLoading",
// };

export const getNotesAction = createAction<GetNoteResponse>("noteActionGetNotes");
export const getStatsAction = createAction<GetStatsResponse>("noteActionGetStats");
export const updateAction = createAction("noteActionUpdate");
export const loadingAction = createAction("noteActionLoading");
