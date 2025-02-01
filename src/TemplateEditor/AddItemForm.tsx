import { useState } from "react";
import type { TemplateItem } from "../store/templateAtom";

export default function AddItemForm({ addItem }: { addItem: (item: TemplateItem) => void }) {
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("");

  const handleAddItem = () => {
    const newItem: any = { title, type: { kind } };

    switch (kind) {
      case "range":
        newItem.type = { ...newItem.type, min: 0, max: 10 };
        break;
      case "enum":
      case "tags":
        newItem.type = { ...newItem.type, values: [] };
        break;
      case "time":
        // No additional properties needed
        break;
    }

    addItem(newItem);
    setTitle("");
    setKind("");
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg">
      <h2 className="text-xl font-semibold">Add New Item</h2>
      <div className="space-y-2">
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="kind" className="block font-medium">
          Kind
        </label>
        <select id="kind" value={kind} onChange={(e) => setKind(e.target.value)} className="w-full border rounded px-2 py-1">
          <option value="">Select kind</option>
          <option value="range">Range</option>
          <option value="enum">Enum</option>
          <option value="time">Time</option>
          <option value="tags">Tags</option>
        </select>
      </div>
      <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
        Add Item
      </button>
    </div>
  );
}
