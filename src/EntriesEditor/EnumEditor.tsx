import React from "react";
import { type EnumValue } from "../store/entriesAtom";
import type { EnumTemplate } from "../store/templateAtom";

interface EnumEditorProps {
  templateItem: EnumTemplate;
  value: EnumValue;
  setValue: (value: EnumValue) => void;
}

export const EnumEditor: React.FC<EnumEditorProps> = ({ templateItem, value, setValue }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      {templateItem.values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
