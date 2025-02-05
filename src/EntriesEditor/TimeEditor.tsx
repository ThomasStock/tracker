import React from "react";
import { type TimeValue } from "../store/entriesAtom";
import type { TimeTemplate } from "../store/templateAtom";
import { TimePicker } from "./TimePicker";

interface TimeEditorProps {
  templateItem: TimeTemplate;
  value: TimeValue;
  setValue: (value: TimeValue) => void;
}

export const TimeEditor: React.FC<TimeEditorProps> = ({ value, setValue }) => {
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return <TimePicker time={value} onTimeSelected={handleChange} />;
};
