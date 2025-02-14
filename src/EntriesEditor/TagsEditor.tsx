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
    <div className="">
      {templateItem.values.map((tag) => {
        const isSelected = Array.isArray(value) && value.includes(tag);
        return (
          <label
            key={tag}
            className={`flex items-center space-x-6 rounded-lg p-4 cursor-pointer hover:bg-accent ${isSelected ? "" : "opacity-70"}`}
            onClick={(e) => {
              handleTagChange(tag);
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Checkbox id={tag} checked={isSelected} className="w-6 h-6" />
            <span className="flex-1 text-base cursor-pointer">{tag}</span>
          </label>
        );
      })}
    </div>
  );
};
