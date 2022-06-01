import React from "react";
import Row from "./Row";
import { Note } from "src/store/types";
import Header from "./Header";
import "./RowList.css";
import { useSelector } from "react-redux";
import { selectNotes } from "src/store/store";

type RowListProps = {
  archiveState: boolean;
  state: (a: boolean) => void;
};
const RowList = ({ archiveState, state }: RowListProps) => {
  const notes = useSelector(selectNotes);
  return (
    <div className="todolist">
      <Header archiveState={archiveState} state={state} />
      {notes
        .filter((note: Note) => note.archive === archiveState)
        .map((note: Note) => {
          return <Row key={note._id} note={note} />;
        })}
    </div>
  );
};

export default RowList;
