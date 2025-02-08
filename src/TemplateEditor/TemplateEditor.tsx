import { useAtom } from "jotai";
import RangeItem from "./RangeItem";
import EnumItem from "./EnumItem";
import TimeItem from "./TimeItem";
import TagsItem from "./TagsItem";
import AddItemForm from "./AddItemForm";
import { templateAtom, type TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Pencil } from "lucide-react";
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
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReadOnlyItem from "./ReadOnlyItem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TemplateType } from "./TemplateType";

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    height: 0,
    marginBottom: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    height: "auto",
    marginBottom: 16, // matches space-y-4
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
  exitHeight: {
    height: 0,
    marginBottom: 0,
    transition: {
      duration: 0.3,
      delay: 0.1,
    },
  },
};

export default function TemplateEditor() {
  const [template, setTemplate] = useAtom(templateAtom);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const removeItem = (index: number) => {
    setEditingIndex(null);
    setIsRemoving(true);
    setTimeout(() => {
      setTemplate(template.filter((_, i) => i !== index));
      setItemToRemove(null);
      setIsRemoving(false);
    }, 400);
  };

  const editItem = (index: number, updates: Partial<TemplateItem>) => {
    setTemplate((prev) => prev.map((t, i) => (i === index ? { ...t, ...updates, readOnly: true } : t)));
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
  };

  const stopEditing = () => {
    setEditingIndex(null);
  };

  const addItem = (item: TemplateItem) => {
    setTemplate((prev) => [...prev, { ...item, readOnly: true }]);
  };

  return (
    <div className="pb-8">
      <AlertDialog
        open={itemToRemove !== null}
        onOpenChange={(open) => {
          if (!open && !isRemoving) {
            setItemToRemove(null);
          }
        }}
      >
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Template Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this template item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => itemToRemove !== null && removeItem(itemToRemove)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Drawer open={editingIndex !== null} onOpenChange={(open) => !open && stopEditing()}>
        <DrawerContent>
          {editingIndex !== null && (
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader className="text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {isTitleEditing ? (
                      <div className="flex-1">
                        <Label htmlFor="title" className="sr-only">
                          Title
                        </Label>
                        <Input
                          id="title"
                          value={template[editingIndex].title}
                          onChange={(e) => editItem(editingIndex, { title: e.target.value })}
                          className="text-lg font-semibold"
                          autoFocus
                          onBlur={() => setIsTitleEditing(false)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setIsTitleEditing(false);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <DrawerTitle>{template[editingIndex].title}</DrawerTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsTitleEditing(true)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit title</span>
                        </Button>
                      </>
                    )}
                  </div>
                  <TemplateType type={template[editingIndex].type.kind} />
                </div>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-2">
                {(() => {
                  const ItemComponent = ItemComponentMap[template[editingIndex].type.kind];
                  return template[editingIndex].type.kind !== "time" ? (
                    <ItemComponent item={template[editingIndex].type as never} onChange={(type: any) => editItem(editingIndex, { type })} />
                  ) : null;
                })()}
              </div>
              <DrawerFooter className="pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setItemToRemove(editingIndex)}
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      Done
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      <Drawer open={isAddingTemplate} onOpenChange={setIsAddingTemplate}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader className="text-left">
              <DrawerTitle>Add New Template</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2">
              <AddItemForm
                addItem={(item) => {
                  addItem(item);
                  setIsAddingTemplate(false);
                }}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <AnimatePresence mode="popLayout">
        {template.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial={isInitialMount.current ? "visible" : "hidden"}
            animate="visible"
            exit={["exit", "exitHeight"]}
            className="relative"
          >
            <Card className={`overflow-hidden cursor-pointer hover:border-primary/50`} onClick={() => startEditing(index)}>
              <CardHeader className="pb-2">
                <div className="space-y-2">
                  <CardTitle className="text-base font-semibold break-words">{item.title}</CardTitle>
                  <TemplateType type={item.type.kind} />
                </div>
              </CardHeader>
              <CardContent>
                <ReadOnlyItem item={item} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" onClick={() => setIsAddingTemplate(true)}>
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add new template</span>
      </Button>
    </div>
  );
}

const ItemComponentMap = {
  range: RangeItem,
  enum: EnumItem,
  time: TimeItem,
  tags: TagsItem,
};
