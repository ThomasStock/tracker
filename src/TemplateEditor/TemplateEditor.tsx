import { useAtom } from "jotai";
import { templateAtom } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReadOnlyItem from "./ReadOnlyItem";
import { Link } from "@tanstack/react-router";
import { useRef, useEffect } from "react";
import { StickyHeader } from "@/components/ui/sticky-header";

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
  const [template] = useAtom(templateAtom);
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  return (
    <div className="pb-8">
      <StickyHeader paddingClassName="px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight text-center">Templates</h1>
      </StickyHeader>

      <div className="px-4">
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
              <Link to="/template-edit/$index" params={{ index }} className="block">
                <Card className={`overflow-hidden cursor-pointer hover:border-primary/50`}>
                  <CardHeader className="pb-2">
                    <div className="space-y-2">
                      <CardTitle className="text-base font-semibold break-words">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ReadOnlyItem item={item} />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        <Link to="/template-create">
          <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
            <span className="sr-only">Add new template</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
