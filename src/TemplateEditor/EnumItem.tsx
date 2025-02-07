import type { EnumTemplate } from "../store/templateAtom";
import type { TemplateItemProps } from "./types";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-2">
      {item.values.map((value, valueIndex) => (
        <div key={valueIndex} className="flex items-center space-x-2">
          <input value={value} onChange={(e) => updateValue(valueIndex, e.target.value)} className="border rounded px-2 py-1 flex-grow" />
          <button
            onClick={() => removeValue(valueIndex)}
            className="text-destructive bg-transparent border border-input hover:bg-destructive/10 px-2 py-1 rounded transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
      <Button onClick={addValue} variant="secondary">
        Add Value
      </Button>
    </div>
  );
}
