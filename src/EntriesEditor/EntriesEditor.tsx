import { useAtom, useAtomValue } from "jotai";
import { entriesAtom } from "../store/entriesAtom";
import { templateAtom } from "../store/templateAtom";
import { RangeEditor } from "./RangeEditor";
import { DateTime } from "luxon";
import { EnumEditor } from "./EnumEditor";
import { TagsEditor } from "./TagsEditor";
import { TimeEditor } from "./TimeEditor";

export const EntriesEditor = () => {
  const [entries, setEntries] = useAtom(entriesAtom);
  const template = useAtomValue(templateAtom);

  const getTemplateItem = (id: number) => {
    return template.find((item) => item.id === id);
  };

  const setEntryValue = (key: string, id: number, value: any) => {
    setEntries((prev) => ({
      ...prev,
      [key]: prev[key].map((entry) => (entry.id === id ? { ...entry, value } : entry)),
    }));
  };

  return (
    <div>
      {Object.keys(entries).map((key, index) => {
        const date = DateTime.fromISO(key).toLocaleString(DateTime.DATE_FULL);
        const entryValues = entries[key];
        return (
          <div key={index} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{date}</h2>
            {entryValues.map((entry, index) => {
              const templateItem = getTemplateItem(entry.id);
              if (!templateItem) {
                return null;
              }
              const ItemComponent = ItemComponentMap[templateItem.type.kind];
              console.log("rendering", templateItem.title, templateItem.type.kind, entry);
              return (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{templateItem.title}</h3>
                  <ItemComponent
                    key={index}
                    templateItem={templateItem.type as never}
                    value={entry.value as never}
                    setValue={(newValue) => setEntryValue(key, entry.id, newValue)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const ItemComponentMap = {
  range: RangeEditor,
  enum: EnumEditor,
  time: TimeEditor,
  tags: TagsEditor,
};
