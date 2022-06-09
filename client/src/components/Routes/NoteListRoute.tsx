// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { isCreateAction, isVisibleAction } from "src/store/actions/interface-action";
// import { AppDispatch } from "src/store/types";
// import EditModal from "../EditModal";
// import RowList from "../RowList";
// import RowStatList from "../RowStatList";

// const NoteListRoute = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const [archiveState, setState] = useState<boolean>(false);
//   const activeState = (state: boolean) => {
//     setState(!state);
//     if (state) {
//       navigate("notelist");
//     } else {
//       navigate("archive");
//     }
//   };
//   return (
//     <>
//       <RowList archiveState={archiveState} state={activeState} />
//       <div className="createNoteRight">
//         <button
//           onClick={() => {
//             dispatch({ type: isCreateAction });
//             dispatch({ type: isVisibleAction, payload: { isVisible: true } });
//           }}
//           className="createNote"
//         >
//           Create
//         </button>
//       </div>
//       <EditModal archiveState={archiveState} />
//       <RowStatList />
//     </>
//   );
// };

// export default NoteListRoute;
export {};
