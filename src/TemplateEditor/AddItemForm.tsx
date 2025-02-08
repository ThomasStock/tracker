import { useState } from "react";
import type { TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="space-y-3 px-4 pb-8">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="kind">Type</Label>
        <Select value={kind} onValueChange={setKind}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="range">Numeric Range</SelectItem>
            <SelectItem value="enum">Single Choice</SelectItem>
            <SelectItem value="time">Time Picker</SelectItem>
            <SelectItem value="tags">Multiple Choice</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleAddItem} className="w-full mt-4" disabled={!title || !kind}>
        Create Template
      </Button>
    </div>
  );
}
