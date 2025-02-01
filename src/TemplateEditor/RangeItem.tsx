import { useId } from "react";
import type { TemplateItemProps } from "./types";
import type { RangeTemplate } from "../store/templateAtom";

export default function RangeItem({ item, onChange }: TemplateItemProps<RangeTemplate>) {
  if (item.kind !== "range") {
    throw new Error("Invalid item type");
  }

  const id = useId();

  const updateItem = (key: "min" | "max", value: number) => {
    onChange({
      ...item,
      [key]: value,
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <label htmlFor={`min-${id}`} className="font-medium">
          Min:
        </label>
        <input
          id={`min-${id}`}
          type="number"
          value={item.min}
          onChange={(e) => updateItem("min", Number(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor={`max-${id}`} className="font-medium">
          Max:
        </label>
        <input
          id={`max-${id}`}
          type="number"
          value={item.max}
          onChange={(e) => updateItem("max", Number(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
}
