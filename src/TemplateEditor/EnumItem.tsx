import type { EnumTemplate } from "../store/templateAtom";
import type { TemplateItemProps } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export default function EnumItem({ item, onChange }: TemplateItemProps<EnumTemplate>) {
  if (item.kind !== "enum") {
    throw new Error("Invalid item type");
  }

  const updateValue = (index: number, value: string) => {
    onChange({
      ...item,
      values: item.values.map((v, i) => (i === index ? value : v)),
    });
  };

  const removeValue = (index: number) => {
    onChange({
      ...item,
      values: item.values.filter((_, i) => i !== index),
    });
  };

  const addValue = () => {
    onChange({
      ...item,
      values: [...item.values, ""],
    });
  };

  return (
    <div className="space-y-3">
      {item.values.map((value, valueIndex) => (
        <div key={valueIndex} className="flex items-center gap-2">
          <Input
            value={value}
            onChange={(e) => updateValue(valueIndex, e.target.value)}
            placeholder={`Option ${valueIndex + 1}`}
            className="flex-1"
          />
          <Button
            onClick={() => removeValue(valueIndex)}
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove option</span>
          </Button>
        </div>
      ))}
      <Button onClick={addValue} variant="secondary" className="w-full">
        Add new option
      </Button>
    </div>
  );
}
