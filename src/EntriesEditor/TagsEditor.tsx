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
  console.log("tag", value, templateItem);
  const handleTagChange = (tag: string) => {
    console.log("handletagchange", tag);
    if (value?.includes(tag)) {
      setValue(value.filter((t) => t !== tag));
    } else {
      setValue([...(value ?? []), tag]);
    }
  };

  return (
    <div className="flex gap-2 flex-col">
      {templateItem.values.map((tag) => (
        <div className="flex items-center space-x-2">
          <Checkbox id={tag} checked={value?.includes(tag)} onChange={() => handleTagChange(tag)} />
          <label htmlFor={tag} className="text-sm font-medium leading-none">
            {tag}
          </label>
        </div>
      ))}
    </div>
  );
};
