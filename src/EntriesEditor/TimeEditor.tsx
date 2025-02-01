import React from "react";
import { type TimeValue } from "../store/entriesAtom";
import type { TimeTemplate } from "../store/templateAtom";

interface TimeEditorProps {
  templateItem: TimeTemplate;
  value: TimeValue;
  setValue: (value: TimeValue) => void;
}

export const TimeEditor: React.FC<TimeEditorProps> = ({ value, setValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <input type="time" value={value} onChange={handleChange} min="12:00" step={900} />;
};
