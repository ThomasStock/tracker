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
import { ChevronLeft, ChevronRight } from "lucide-react";

export const EntriesEditor = () => {
  const [entries, setEntries] = useAtom(entriesAtom);
  const template = useAtomValue(templateAtom);

  const [selectedDate, setSelectedDate] = useState(DateTime.now());

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
    setSelectedDate(selectedDate.minus({ days: 1 }));
  };

  const goForward = () => {
    setSelectedDate(selectedDate.plus({ days: 1 }));
  };

  const handlers = useSwipeable({
    onSwipedLeft: goForward,
    onSwipedRight: goBack,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl">
        <CardHeader {...handlers} className="space-y-4 px-2 sticky top-0 bg-background z-20 pb-4 pt-6 border-b mb-4">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ChevronLeft className="!size-6" />
              <span className="sr-only">Previous day</span>
            </Button>
            <div className="text-center">
              <div className="text-xl font-semibold">{selectedDate.toLocaleString(DateTime.DATE_FULL)}</div>
            </div>
            <Button variant="ghost" onClick={goForward}>
              <ChevronRight className="!size-6" />
              <span className="sr-only">Next day</span>
            </Button>
          </div>
        </CardHeader>
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
      </div>
    </div>
  );
};

const ItemComponentMap = {
  range: RangeEditor,
  enum: EnumEditor,
  time: TimeEditor,
  tags: TagsEditor,
};
