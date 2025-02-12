import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { templateAtom, type TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import RangeItem from "../TemplateEditor/RangeItem";
import EnumItem from "../TemplateEditor/EnumItem";
import TimeItem from "../TemplateEditor/TimeItem";
import TagsItem from "../TemplateEditor/TagsItem";
import { BackButton } from "@/components/ui/back-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StickyHeader } from "@/components/ui/sticky-header";

export const Route = createFileRoute("/template-edit/$index")({
  component: TemplateEditPage,
  params: {
    parse: (params) => ({
      index: +params.index,
    }),
    stringify: (params) => ({
      index: params.index.toString(),
    }),
  },
});

function TemplateEditPage() {
  const { index } = Route.useParams();
  const [template, setTemplate] = useAtom(templateAtom);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const itemIndex = index;
  const item = template[itemIndex];

  if (!item) {
    return <div>Template item not found</div>;
  }

  const editItem = (updates: Partial<TemplateItem>) => {
    setTemplate((prev) => prev.map((t, i) => (i === itemIndex ? { ...t, ...updates } : t)));
  };

  const removeItem = () => {
    setTemplate(template.filter((_, i) => i !== itemIndex));
    window.history.back();
  };

  return (
    <>
      <StickyHeader paddingClassName="px-4 py-6">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-2xl font-semibold tracking-tight truncate">{item.title}</h1>
        </div>
      </StickyHeader>

      <div className="px-4">
        <Card className="border-border/40 shadow-sm">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3">
              <Input id="title" value={item.title} onChange={(e) => editItem({ title: e.target.value })} className="text-lg" />
            </div>

            <div className="space-y-6">
              {item.type.kind === "range" ? (
                <RangeItem item={item.type} onChange={(type) => editItem({ type })} />
              ) : item.type.kind === "enum" ? (
                <EnumItem item={item.type} onChange={(type) => editItem({ type })} />
              ) : item.type.kind === "tags" ? (
                <TagsItem item={item.type} onChange={(type) => editItem({ type })} />
              ) : item.type.kind === "time" ? (
                <TimeItem item={item.type} onChange={(type) => editItem({ type })} />
              ) : null}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => setShowDeleteDialog(true)}
            className="w-full text-destructive hover:text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Item
          </Button>
        </div>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Template Item</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Are you sure you want to remove this template item? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={removeItem} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Remove Item
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
