import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { isCreateAction } from "src/store/actions/interface-action";
import { AppDispatch } from "src/store/types";
import EditModal from "../EditModal";
import RowList from "../RowList";
import RowStatList from "../RowStatList";

const NoteListRoute = () => {
  const navigate = useNavigate();
  let { list } = useParams();
  //let { noteState } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  //const [archiveState, setState] = useState<boolean>(archiveStateDefault);

  const activeState = (state: boolean) => {
    if (list === "archivelist") {
      navigate("/note/list");
    } else {
      navigate("/note/archivelist/");
    }
  };

  return (
    <>
      <RowList archiveState={list === "archivelist"} state={activeState} />
      <div className="createNoteRight">
        <button
          onClick={() => {
            navigate(`/note/${list}/createNote`);
            dispatch({ type: isCreateAction });
            //dispatch({ type: isVisibleAction, payload: { isVisible: true } });
          }}
          className="createNote"
        >
          Create
        </button>
      </div>
      <EditModal archiveState={list === "archivelist"} />
      <RowStatList />
    </>
  );
};

export default NoteListRoute;
