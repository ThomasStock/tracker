import { useState } from "react";
import type { TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

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
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Plus className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-muted-foreground">Add New Template</h2>
      </div>
      <div className="rounded-lg border-2 border-dashed p-6 hover:border-primary/50 transition-colors">
        <div className="space-y-4">
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
          <Button onClick={handleAddItem} className="w-full" disabled={!title || !kind}>
            Create Template
          </Button>
        </div>
      </div>
    </div>
  );
}
