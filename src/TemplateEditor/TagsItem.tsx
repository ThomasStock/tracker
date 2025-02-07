import type { TagsTemplate } from "../store/templateAtom";
import type { TemplateItemProps } from "./types";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-2">
      {item.values.map((tag, tagIndex) => (
        <div key={tagIndex} className="flex items-center space-x-2">
          <input value={tag} onChange={(e) => updateTag(tagIndex, e.target.value)} className="border rounded px-2 py-1 flex-grow" />
          <button
            onClick={() => removeTag(tagIndex)}
            className="text-destructive bg-transparent border border-input hover:bg-destructive/10 px-2 py-1 rounded transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
      <Button onClick={addTag} variant="secondary">
        Add Tag
      </Button>
    </div>
  );
}
