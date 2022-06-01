import React from "react";
import { Stat } from "src/store/types";

const icons = {
  Task: <img src="./img/Task.png" alt="icon" />,
  "Random Thought": <img src="./img/Random.png" alt="icon" />,
  Idea: <img src="./img/Idea.png" alt="icon" />,
};
type RowStatProps = {
  stat: Stat;
};
const RowStat = ({ stat }: RowStatProps) => {
  return (
    <div className="row stat">
      <div className="cell">{icons[stat.category]}</div>
      <div className="cell">{stat.category}</div>
      <div className="cell">{stat.active}</div>
      <div className="cell">{stat.archive}</div>
    </div>
  );
};

export default RowStat;
