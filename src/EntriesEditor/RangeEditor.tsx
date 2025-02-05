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
  return (
    <div className="space-y-3">
      <Slider
        value={[value]}
        onValueChange={(e) => setValue(e[0])}
        max={templateItem.max}
        min={templateItem.min}
        step={1}
        className="py-4"
      />
    </div>
  );
};
