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
    console.log("tag", tag, value);
    if (value?.includes(tag)) {
      setValue(value.filter((t) => t !== tag));
    } else {
      setValue([...(value ?? []), tag]);
    }
  };

  // console.log({ value });

  return (
    <div className="space-y-3">
      {templateItem.values.map((tag) => (
        <label
          key={tag}
          className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer border-primary/50 hover:bg-accent"
          onClick={(e) => {
            handleTagChange(tag);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Checkbox id={tag} checked={Array.isArray(value) && value.includes(tag)} className="w-6 h-6" />
          <span className="flex-1 text-base cursor-pointer">{tag}</span>
        </label>
      ))}
    </div>
  );
};
