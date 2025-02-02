import React from "react";
import { type RangeValue } from "../store/entriesAtom";
import type { RangeTemplate } from "../store/templateAtom";
import { Slider } from "@/components/ui/slider";

interface RangeEditorProps {
  templateItem: RangeTemplate;
  value: RangeValue;
  setValue: (value: RangeValue) => void;
}

export const RangeEditor: React.FC<RangeEditorProps> = ({ templateItem, value, setValue }) => {
  console.log("value", value);
  return (
    <Slider
      defaultValue={[33]}
      value={[value]}
      onValueChange={(e) => {
        setValue(e[0]);
      }}
      max={templateItem.max}
      min={templateItem.min}
      step={1}
    />
  );
};
