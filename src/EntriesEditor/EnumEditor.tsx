import React from "react";
import { type EnumValue } from "../store/entriesAtom";
import type { EnumTemplate } from "../store/templateAtom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react"; // Import the checkmark icon

interface EnumEditorProps {
  templateItem: EnumTemplate;
  value: EnumValue;
  setValue: (value: EnumValue) => void;
}

export const EnumEditor: React.FC<EnumEditorProps> = ({ templateItem, value, setValue }) => {
  return (
    <RadioGroup value={value} onValueChange={setValue} className="space-y-1">
      {templateItem.values.map((option) => (
        <div
          key={option}
          className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent ${
            value === option ? "bg-accent" : ""
          }`}
          onClick={() => setValue(option)}
        >
          <div className="w-6 h-6 flex items-center justify-center">{value === option && <Check className="size-7 text-primary" />}</div>
          <Label htmlFor={`enum-${option}`} className="flex-1 text-base cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
