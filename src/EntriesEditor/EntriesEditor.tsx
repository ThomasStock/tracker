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

export const EntriesEditor = () => {
  const [entries, setEntries] = useAtom(entriesAtom);
  const template = useAtomValue(templateAtom);

  const [selectedDate, setSelectedDate] = useState(DateTime.now().toISODate());

  const entryValues = entries[selectedDate] ?? [];

  const setEntryValue = (id: number, value: any) => {
    setEntries((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate].map((entry) => (entry.id === id ? { ...entry, value } : entry)),
    }));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setSelectedDate(DateTime.fromISO(selectedDate).plus({ days: 1 }).toISODate()!),
    onSwipedRight: () => setSelectedDate(DateTime.fromISO(selectedDate).minus({ days: 1 }).toISODate()!),
  });

  return (
    <div {...handlers}>
      <div className="border p-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <button onClick={() => setSelectedDate(DateTime.fromISO(selectedDate).minus({ days: 1 }).toISODate()!)}>Back</button>
          <h2 className="text-xl font-semibold mb-2">{DateTime.fromISO(selectedDate).toLocaleString(DateTime.DATETIME_FULL)}</h2>
          <button onClick={() => setSelectedDate(DateTime.fromISO(selectedDate).plus({ days: 1 }).toISODate()!)}>Forward</button>
        </div>
        {template.map((templateItem, index) => {
          const entry = entryValues.find((entry) => entry.id === templateItem.id);
          const ItemComponent = ItemComponentMap[templateItem.type.kind];
          console.log("rendering", templateItem.title, templateItem.type.kind, entry);
          return (
            <div key={templateItem.id} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{templateItem.title}</h3>
              <ItemComponent
                key={index}
                templateItem={templateItem.type as never}
                value={entry?.value as never}
                setValue={(newValue) => setEntryValue(templateItem.id, newValue)}
              />
            </div>
          );
        })}
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
