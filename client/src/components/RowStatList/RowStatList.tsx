import React from "react";
import RowStat from "./RowStat";
import HeaderStat from "./HeaderStat";
import "./RowStatList.css";
import { useSelector } from "react-redux";
import { selectIsStats } from "src/store/store";

const RowStatList = () => {
  const notesStats = useSelector(selectIsStats);
  return (
    <div className="categorylist">
      <HeaderStat />
      {notesStats.map((stat) => {
        return <RowStat stat={stat} key={stat.id} />;
      })}
    </div>
  );
};

export default RowStatList;
