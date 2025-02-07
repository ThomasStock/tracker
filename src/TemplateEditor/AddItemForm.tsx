import { useState } from "react";
import type { TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-lg font-semibold">Add New Item</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kind">Kind</Label>
          <Select value={kind} onValueChange={setKind}>
            <SelectTrigger>
              <SelectValue placeholder="Select kind" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="range">Range</SelectItem>
              <SelectItem value="enum">Enum</SelectItem>
              <SelectItem value="time">Time</SelectItem>
              <SelectItem value="tags">Tags</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddItem} className="w-full" disabled={!title || !kind}>
          Add Item
        </Button>
      </CardContent>
    </Card>
  );
}
