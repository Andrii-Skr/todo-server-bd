import React from "react";

type HeaderProp = { state: (a: boolean) => void; archiveState: boolean };
const Header = ({ state, archiveState }: HeaderProp) => {
  return (
    <div className="row header">
      <div className="cell"></div>
      <div className="cell">Name</div>
      <div className="cell">Created</div>
      <div className="cell">Category</div>
      <div className="cell">Content</div>
      <div className="cell">Dates</div>
      <div className="cell btnRow">
        <div title="Archive mode"> {archiveState ? "A" : ""}</div>
        <div onClick={() => state(archiveState)} className="myBtn archiveAll">
          <img src="./img/archiveWhite.png" alt="archive" title="Show archive/notes" />
        </div>
        <div className="myBtn deleteAll">
          <img src="./img/binWhite.png" alt="deleteAll" title="Delete all notes" />
        </div>
      </div>
    </div>
  );
};

export default Header;
