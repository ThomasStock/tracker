import React from "react";
import { type TagsValue } from "../store/entriesAtom";
import type { TagsTemplate } from "../store/templateAtom";

interface TagsEditorProps {
  templateItem: TagsTemplate;
  value: TagsValue;
  setValue: (value: TagsValue) => void;
}

export const TagsEditor: React.FC<TagsEditorProps> = ({ templateItem, value, setValue }) => {
  const handleTagChange = (tag: string) => {
    if (value.includes(tag)) {
      setValue(value.filter((t) => t !== tag));
    } else {
      setValue([...value, tag]);
    }
  };

  return (
    <div>
      {templateItem.values.map((tag) => (
        <label key={tag} className="tag">
          <input type="checkbox" checked={value.includes(tag)} onChange={() => handleTagChange(tag)} />
          {tag}
        </label>
      ))}
    </div>
  );
};
