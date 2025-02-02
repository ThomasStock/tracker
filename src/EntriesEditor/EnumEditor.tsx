import React from "react";
import { type EnumValue } from "../store/entriesAtom";
import type { EnumTemplate } from "../store/templateAtom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EnumEditorProps {
  templateItem: EnumTemplate;
  value: EnumValue;
  setValue: (value: EnumValue) => void;
}

export const EnumEditor: React.FC<EnumEditorProps> = ({ templateItem, value, setValue }) => {
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      {templateItem.values.map((value) => (
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={value} id={value} />
          <Label htmlFor={value}>{value}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};
