import type { TagsTemplate } from "../store/templateAtom";
import type { TemplateItemProps } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export default function TagsItem({ item, onChange }: TemplateItemProps<TagsTemplate>) {
  if (item.kind !== "tags") {
    throw new Error("Invalid item type");
  }

  const updateTag = (index: number, value: string) => {
    onChange({
      ...item,
      values: item.values.map((v, i) => (i === index ? value : v)),
    });
  };

  const removeTag = (index: number) => {
    onChange({
      ...item,
      values: item.values.filter((_, i) => i !== index),
    });
  };

  const addTag = () => {
    onChange({
      ...item,
      values: [...item.values, ""],
    });
  };

  return (
    <div className="space-y-3">
      {item.values.map((tag, tagIndex) => (
        <div key={tagIndex} className="flex items-center gap-2">
          <Input value={tag} onChange={(e) => updateTag(tagIndex, e.target.value)} placeholder={`Tag ${tagIndex + 1}`} className="flex-1" />
          <Button
            onClick={() => removeTag(tagIndex)}
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove tag</span>
          </Button>
        </div>
      ))}
      <Button onClick={addTag} variant="secondary" className="w-full">
        Add Tag
      </Button>
    </div>
  );
}
