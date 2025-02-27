import { useAtom, useAtomValue } from "jotai";
import { entriesAtom } from "../store/entriesAtom";
import { templateAtom } from "../store/templateAtom";
import { RangeEditor } from "./RangeEditor";
import { DateTime } from "luxon";
import { EnumEditor } from "./EnumEditor";
import { TagsEditor } from "./TagsEditor";
import { TimeEditor } from "./TimeEditor";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Settings, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Footer } from "@/components/ui/footer";
import { Link } from "@tanstack/react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import version from "../version.txt?raw";

export const EntriesEditor = () => {
  const [entries, setEntries] = useAtom(entriesAtom);
  const template = useAtomValue(templateAtom);
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [swipeDirection, setSwipeDirection] = useState<1 | -1>(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const entryValues = entries[selectedDate.toISODate()] ?? [];

  const setEntryValue = (id: number, value: any) => {
    setEntries((prev) => {
      const dateEntries = prev[selectedDate.toISODate()] ?? [];
      const updatedEntries = dateEntries.some((entry) => entry.id === id)
        ? dateEntries.map((entry) => (entry.id === id ? { ...entry, value } : entry))
        : [...dateEntries, { id, value }];
      return { ...prev, [selectedDate.toISODate()]: updatedEntries };
    });
  };

  const goBack = () => {
    setSwipeDirection(-1);
    setSelectedDate(selectedDate.minus({ days: 1 }));
  };

  const goForward = () => {
    setSwipeDirection(1);
    setSelectedDate(selectedDate.plus({ days: 1 }));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative flex flex-col min-h-full overflow-x-hidden">
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={swipeDirection}>
          <motion.div
            key={selectedDate.toISODate()}
            custom={swipeDirection}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full"
          >
            <div className="h-full pb-24">
              <CardContent className="space-y-12 px-2">
                {template.map((templateItem) => {
                  const entry = entryValues.find((entry) => entry.id === templateItem.id);
                  const ItemComponent = ItemComponentMap[templateItem.type.kind];
                  return (
                    <div key={templateItem.id} className="relative">
                      <div className="flex justify-between items-center mb-2 px-1">
                        <h3 className="font-header text-lg font-semibold break-words">{templateItem.title}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to="/template-edit/$id" params={{ id: templateItem.id }} className="flex items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Edit Template</span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Card className="overflow-hidden cursor-pointer hover:border-primary/50">
                        <CardContent className="p-4">
                          <ItemComponent
                            templateItem={templateItem.type as never}
                            value={entry?.value as never}
                            setValue={(newValue) => setEntryValue(templateItem.id, newValue)}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
                <div className="text-xs text-muted-foreground text-center mt-8">{version}</div>
              </CardContent>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer>
        <div className="flex items-center justify-between gap-4 w-full">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ChevronLeft className="!size-6" />
            <span className="sr-only">Previous day</span>
          </Button>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="font-semibold text-lg h-auto py-0">
                <div className="flex flex-col items-center">
                  <div className="">{selectedDate.toFormat("MMMM dd")}</div>
                  <div className="text-sm font-normal text-muted-foreground font-body">
                    {(() => {
                      const now = DateTime.now().startOf("day");
                      const date = selectedDate.startOf("day");
                      if (date.hasSame(now, "day")) return "Today";
                      if (date.hasSame(now.minus({ days: 1 }), "day")) return "Yesterday";
                      if (date.hasSame(now.plus({ days: 1 }), "day")) return "Tomorrow";

                      const diff = date.diff(now, ["months", "weeks", "days"]);
                      const months = Math.floor(Math.abs(diff.months));
                      const weeks = Math.floor(Math.abs(diff.weeks));
                      const days = Math.floor(Math.abs(diff.days));

                      const isFuture = date > now;
                      const prefix = isFuture ? "in " : "";
                      const suffix = isFuture ? "" : " ago";

                      if (months > 0) {
                        return `${prefix}${months} month${months === 1 ? "" : "s"}${suffix}`;
                      }
                      if (weeks > 0) {
                        return `${prefix}${weeks} week${weeks === 1 ? "" : "s"}${suffix}`;
                      }
                      return `${prefix}${days} day${days === 1 ? "" : "s"}${suffix}`;
                    })()}
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                value={selectedDate}
                onChange={(date) => {
                  setSwipeDirection(date < selectedDate ? -1 : 1);
                  setSelectedDate(date);
                  setIsCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="icon" onClick={goForward}>
            <ChevronRight className="!size-6" />
            <span className="sr-only">Next day</span>
          </Button>
        </div>
      </Footer>
    </div>
  );
};

const ItemComponentMap = {
  range: RangeEditor,
  enum: EnumEditor,
  time: TimeEditor,
  tags: TagsEditor,
};
