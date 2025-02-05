import React from "react";
import { type TagsValue } from "../store/entriesAtom";
import type { TagsTemplate } from "../store/templateAtom";
import { Checkbox } from "@/components/ui/checkbox";

interface TagsEditorProps {
  templateItem: TagsTemplate;
  value: TagsValue | null;
  setValue: (value: TagsValue) => void;
}

export const TagsEditor: React.FC<TagsEditorProps> = ({ templateItem, value, setValue }) => {
  const handleTagChange = (tag: string) => {
    if (value?.includes(tag)) {
      setValue(value.filter((t) => t !== tag));
    } else {
      setValue([...(value ?? []), tag]);
    }
  };

  return (
    <div className="space-y-3">
      {templateItem.values.map((tag) => (
        <div
          key={tag}
          className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent"
          onClick={() => handleTagChange(tag)}
        >
          <Checkbox id={tag} checked={value?.includes(tag)} onChange={() => handleTagChange(tag)} className="w-6 h-6" />
          <label htmlFor={tag} className="flex-1 text-base cursor-pointer">
            {tag}
          </label>
        </div>
      ))}
    </div>
  );
};
