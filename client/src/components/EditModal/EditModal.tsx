import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, Category, Note } from "src/store/types";
import MySelect from "./MySelect";
import "./EditModal.css";
import { createThunk, editThunk } from "src/store/thunk/notes-thunk";
import { useSelector } from "react-redux";
import { selectCurrentNote, selectIsEdit, selectIsVisible } from "src/store/store";
import { isVisibleAction } from "src/store/actions/interface-action";

type EditModalProp = {
  archiveState: boolean;
};

const defaultNote: Note = {
  _id: "-1",
  dates: [],
  created: "",
  archive: false,
  name: "",
  content: "",
  category: Category.Task,
};

const options = [
  { value: "Task", name: "Task" },
  { value: "Random Thought", name: "Random Thought" },
  { value: "Idea", name: "Idea" },
];

const EditModal = (props: EditModalProp) => {
  const isEdite = useSelector(selectIsEdit);
  const isVisible = useSelector(selectIsVisible);
  const dispatch = useDispatch<AppDispatch>();
  const currentNote = useSelector(selectCurrentNote);
  const [editedNote, setEditedNote] = useState(defaultNote);
  console.log("editedNote");
  useEffect(() => {
    if (isEdite) {
      setEditedNote(currentNote);
    }
  }, [currentNote]);

  const btnCancel = () => {
    dispatch({ type: isVisibleAction, payload: { isVisible: false } });
    setEditedNote(defaultNote);
  };

  const saveEdit = () => {
    if (isEdite) {
      dispatch(editThunk({ ...editedNote, archive: props.archiveState }));
      dispatch({ type: isVisibleAction, payload: { isVisible: false } });
      setEditedNote(defaultNote);
    } else {
      if (editedNote.name === "") {
        return;
      }
      setEditedNote(defaultNote);
      dispatch(
        createThunk({
          ...editedNote,
          archive: props.archiveState,
        })
      );
      dispatch({ type: isVisibleAction, payload: { isVisible: false } });
    }
  };

  return (
    <div
      className={isVisible ? "editModal visible" : "editModal"}
      onClick={() => dispatch({ type: isVisibleAction, payload: { isVisible: false } })}
    >
      <div className="editModalContent" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="form"
        >
          <h3>{isEdite ? "Etit Note" : "Create Note"}</h3>
          <div>
            <label>Note name</label>
            <input
              type="text"
              className="cell name"
              value={editedNote.name}
              onInput={(e) => setEditedNote({ ...editedNote, name: e.currentTarget.value })}
              placeholder="Enter note name"
            />
          </div>

          <div>
            <label>Category</label>

            <MySelect
              onChange={(value) => setEditedNote({ ...editedNote, category: value })}
              value={editedNote.category}
              options={options}
            />
          </div>
          <div>
            <label>Content</label>
            <input
              type="text"
              className="cell content"
              placeholder="Enter content"
              value={editedNote.content}
              onInput={(e) => setEditedNote({ ...editedNote, content: e.currentTarget.value })}
            />
          </div>
          <div className="formBtns">
            <div>
              <button onClick={() => btnCancel()} className="createNote">
                Cancel
              </button>
            </div>
            <div>
              <button onClick={() => saveEdit()} className="createNote">
                {isEdite ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
