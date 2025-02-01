import React from "react";
import { type RangeValue } from "../store/entriesAtom";
import type { RangeTemplate } from "../store/templateAtom";

interface RangeEditorProps {
  templateItem: RangeTemplate;
  value: RangeValue;
  setValue: (value: RangeValue) => void;
}

export const RangeEditor: React.FC<RangeEditorProps> = ({ templateItem, value, setValue }) => {
  console.log("value", value);
  return (
    <input
      type="range"
      min={templateItem.min}
      max={templateItem.max}
      value={value}
      onChange={(e) => {
        setValue(parseInt(e.target.value, 10));
      }}
    />
  );
};
