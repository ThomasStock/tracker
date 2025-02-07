import { useAtom } from "jotai";
import RangeItem from "./RangeItem";
import EnumItem from "./EnumItem";
import TimeItem from "./TimeItem";
import TagsItem from "./TagsItem";
import AddItemForm from "./AddItemForm";
import { templateAtom, type TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X } from "lucide-react";
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
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const removeItem = (index: number) => {
    setIsRemoving(true);
    // Wait for dialog to close before starting remove animation
    setTimeout(() => {
      setTemplate(template.filter((_, i) => i !== index));
      setItemToRemove(null);
      setIsRemoving(false);
    }, 200); // Match this with dialog close animation duration
  };

  const editItem = (index: number, newItem: TemplateItem) => {
    setTemplate((prev) => prev.map((t, i) => (i === index ? newItem : t)));
  };

  const addItem = (item: TemplateItem) => {
    setTemplate((prev) => [...prev, item]);
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

      <AnimatePresence mode="popLayout">
        {template.map((item, index) => {
          const ItemComponent = ItemComponentMap[item.type.kind];
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              initial={isInitialMount.current ? "visible" : "hidden"}
              animate="visible"
              exit={["exit", "exitHeight"]}
              className="relative"
            >
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                    <CardDescription className="text-xs rounded-md bg-muted px-2 py-0.5">{typeLabels[item.type.kind]}</CardDescription>
                  </div>
                  <Button
                    onClick={() => setItemToRemove(index)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <ItemComponent item={item.type as never} onChange={(type: any) => editItem(index, { ...item, type })} />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className="mt-4">
        <AddItemForm addItem={addItem} />
      </div>
    </div>
  );
}

const ItemComponentMap = {
  range: RangeItem,
  enum: EnumItem,
  time: TimeItem,
  tags: TagsItem,
};
