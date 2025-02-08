import { useAtom } from "jotai";
import RangeItem from "./RangeItem";
import EnumItem from "./EnumItem";
import TimeItem from "./TimeItem";
import TagsItem from "./TagsItem";
import AddItemForm from "./AddItemForm";
import { templateAtom, type TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
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

const typeLabels = {
  range: "Numeric Range",
  enum: "Single Choice",
  time: "Time Picker",
  tags: "Multiple Choice",
} as const;

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
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const removeItem = (index: number) => {
    setIsRemoving(true);
    setTimeout(() => {
      setTemplate(template.filter((_, i) => i !== index));
      setItemToRemove(null);
      setEditingIndex(null);
      setIsRemoving(false);
    }, 200);
  };

  const editItem = (index: number, newItem: TemplateItem) => {
    setTemplate((prev) => prev.map((t, i) => (i === index ? { ...newItem, readOnly: true } : t)));
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
                <div className="flex items-center justify-between">
                  <DrawerTitle>{template[editingIndex].title}</DrawerTitle>
                  <CardDescription className="text-xs rounded-md bg-muted px-2 py-0.5 whitespace-nowrap">
                    {typeLabels[template[editingIndex].type.kind]}
                  </CardDescription>
                </div>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-2">
                {(() => {
                  const ItemComponent = ItemComponentMap[template[editingIndex].type.kind];
                  return template[editingIndex].type.kind !== "time" ? (
                    <ItemComponent
                      item={template[editingIndex].type as never}
                      onChange={(type: any) => editItem(editingIndex, { ...template[editingIndex], type })}
                    />
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
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-base font-semibold break-words">{item.title}</CardTitle>
                  <CardDescription className="text-xs rounded-md bg-muted px-2 py-0.5 whitespace-nowrap">
                    {typeLabels[item.type.kind]}
                  </CardDescription>
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
