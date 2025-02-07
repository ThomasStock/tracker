import { useId } from "react";
import type { TemplateItemProps } from "./types";
import type { RangeTemplate } from "../store/templateAtom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor={`min-${id}`}>Min</Label>
        <Input id={`min-${id}`} type="number" value={item.min} onChange={(e) => updateItem("min", Number(e.target.value))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`max-${id}`}>Max</Label>
        <Input id={`max-${id}`} type="number" value={item.max} onChange={(e) => updateItem("max", Number(e.target.value))} />
      </div>
    </div>
  );
}
