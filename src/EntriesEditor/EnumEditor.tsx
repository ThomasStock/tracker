import React from "react";
import { type EnumValue } from "../store/entriesAtom";
import type { EnumTemplate } from "../store/templateAtom";
import { RadioGroup } from "@/components/ui/radio-group";

interface EnumEditorProps {
  templateItem: EnumTemplate;
  value: EnumValue;
  setValue: (value: EnumValue) => void;
}

export const EnumEditor: React.FC<EnumEditorProps> = ({ templateItem, value, setValue }) => {
  return (
    <RadioGroup value={value} onValueChange={setValue} className="space-y-0.5">
      {templateItem.values.map((option) => (
        <div
          key={option}
          className={`flex items-center space-x-6 rounded-lg py-1.5 px-4 cursor-pointer hover:bg-accent ${
            value === option ? "" : "opacity-70"
          }`}
          onClick={() => setValue(option)}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full ${value === option ? "bg-primary" : ""}`} />
          </div>
          <span className="flex-1 text-base cursor-pointer">{option}</span>
        </div>
      ))}
    </RadioGroup>
  );
};
