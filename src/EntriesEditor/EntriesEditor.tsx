import { useAtom, useAtomValue } from "jotai";
import { entriesAtom } from "../store/entriesAtom";
import { templateAtom } from "../store/templateAtom";
import { RangeEditor } from "./RangeEditor";
import { DateTime } from "luxon";
import { EnumEditor } from "./EnumEditor";
import { TagsEditor } from "./TagsEditor";
import { TimeEditor } from "./TimeEditor";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { StickyHeader } from "@/components/ui/sticky-header";
import { Header } from "@/components/ui/header";
import { Link } from "@tanstack/react-router";

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

  const handlers = useSwipeable({
    onSwipedLeft: goForward,
    onSwipedRight: goBack,
  });

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
    <>
      <Header
        leftButton={
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        }
      />
      <StickyHeader {...handlers}>
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ChevronLeft className="!size-6" />
            <span className="sr-only">Previous day</span>
          </Button>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="font-semibold text-xl h-auto py-2">
                <div className="flex flex-col items-center">
                  <div>{selectedDate.toLocaleString(DateTime.DATE_FULL)}</div>
                  <div className="text-sm font-normal text-muted-foreground">
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
      </StickyHeader>
      <AnimatePresence mode="popLayout" initial={false} custom={swipeDirection}>
        <motion.div
          key={selectedDate.toISODate()}
          custom={swipeDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <CardContent className="space-y-6 px-2">
            {template.map((templateItem) => {
              const entry = entryValues.find((entry) => entry.id === templateItem.id);
              const ItemComponent = ItemComponentMap[templateItem.type.kind];
              return (
                <div key={templateItem.id} className="relative">
                  <Card className="overflow-hidden cursor-pointer hover:border-primary/50">
                    <CardHeader className="pb-2">
                      <div className="space-y-2">
                        <CardTitle className="text-base font-semibold break-words">{templateItem.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
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
          </CardContent>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const ItemComponentMap = {
  range: RangeEditor,
  enum: EnumEditor,
  time: TimeEditor,
  tags: TagsEditor,
};
