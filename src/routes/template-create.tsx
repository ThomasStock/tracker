import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { templateAtom, type TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import RangeItem from "../TemplateEditor/RangeItem";
import EnumItem from "../TemplateEditor/EnumItem";
import TimeItem from "../TemplateEditor/TimeItem";
import TagsItem from "../TemplateEditor/TagsItem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackButton } from "@/components/ui/back-button";
import { StickyHeader } from "@/components/ui/sticky-header";

export const Route = createFileRoute("/template-create")({
  component: TemplateCreatePage,
});

type TemplateType = "range" | "enum" | "time" | "tags";

function TemplateCreatePage() {
  const [template, setTemplate] = useAtom(templateAtom);
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState<TemplateType | "">("");
  const [typeConfig, setTypeConfig] = useState<TemplateItem["type"] | null>(null);

  const handleTypeChange = (type: TemplateType) => {
    setSelectedType(type);
    switch (type) {
      case "range":
        setTypeConfig({ kind: "range", min: 1, max: 5 });
        break;
      case "enum":
        setTypeConfig({ kind: "enum", values: [""] });
        break;
      case "time":
        setTypeConfig({ kind: "time" });
        break;
      case "tags":
        setTypeConfig({ kind: "tags", values: [""] });
        break;
    }
  };

  const handleCreate = () => {
    if (!typeConfig) return;

    const newItem: TemplateItem = {
      id: Math.max(0, ...template.map((t) => t.id)) + 1,
      title,
      type: typeConfig,
      readOnly: false,
    };

    setTemplate((prev) => [...prev, newItem]);
    window.history.back();
  };

  return (
    <>
      <StickyHeader paddingClassName="px-4 py-6">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-2xl font-semibold tracking-tight">Create Template Item</h1>
        </div>
      </StickyHeader>

      <div className="px-4">
        <Card className="border-border/40 shadow-sm">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3">
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg" placeholder="Template Title" />
            </div>

            <div className="space-y-4">
              <Select value={selectedType} onValueChange={(value) => handleTypeChange(value as TemplateType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="range">Range</SelectItem>
                  <SelectItem value="enum">Multiple Choice</SelectItem>
                  <SelectItem value="tags">Tags</SelectItem>
                  <SelectItem value="time">Time</SelectItem>
                </SelectContent>
              </Select>

              {typeConfig && (
                <div className="space-y-6">
                  {typeConfig.kind === "range" ? (
                    <RangeItem item={typeConfig} onChange={setTypeConfig} />
                  ) : typeConfig.kind === "enum" ? (
                    <EnumItem item={typeConfig} onChange={setTypeConfig} />
                  ) : typeConfig.kind === "tags" ? (
                    <TagsItem item={typeConfig} onChange={setTypeConfig} />
                  ) : typeConfig.kind === "time" ? (
                    <TimeItem item={typeConfig} onChange={setTypeConfig} />
                  ) : null}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleCreate} className="flex-1" disabled={!title || !typeConfig}>
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
