import { ThunkDispatch } from "@reduxjs/toolkit";
import { NoteState } from "./reducers/noteReducer";
import { UserState } from "./reducers/userAuthReducer";

export enum Category {
  Task = "Task",
  Idea = "Idea",
  Random_Thought = "Random Thought",
}
export type UserDto = {
  email: string;
  id: string;
  isActivated: boolean;
};
export type InterfaceState = {
  isEdit: boolean;
  currentNote: Note;
  isVisible: boolean;
};
export type RootState = {
  notes: NoteState;
  user: UserState;
  interface: InterfaceState;
};

export type AppDispatch = ThunkDispatch<RootState, any, any>;

export type Note = {
  dates: string[];
  _id: string;
  name: string;
  created: string;
  category: Category;
  content: string;
  archive: boolean;
};

export type CategoryStat = { [key: string]: { archive: number; active: number; id: number } };

export type Stat = {
  archive: number;
  active: number;
  id: number;
  category: string;
};

export type userData = {
  id: string;
  email: string;
  isActivated: boolean;
};

export type AuthRes = {
  AccessToken: string;
  RefreshToken: string;
  user: userData;
};
