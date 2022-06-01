import React from "react";
import { Category } from "src/store/types";

type optionsT = {
  value: string;
  name: string;
};
type MySelectProp = { options: optionsT[]; value: string; onChange: (e: Category) => void };
const MySelect = ({ options, value, onChange }: MySelectProp) => {
  return (
    <select
      name="select"
      className="cell category"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value as Category)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
