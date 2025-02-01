import { useAtom, useAtomValue } from "jotai";
import { entriesAtom } from "../store/entriesAtom";
import { templateAtom } from "../store/templateAtom";
import RangeEditor from "./RangeEditor";
import { DateTime } from "luxon";

export const EntriesEditor = () => {
  const [entries, setEntries] = useAtom(entriesAtom);
  const template = useAtomValue(templateAtom);

  const getTemplateItem = (id: number) => {
    return template.find((item) => item.id === id);
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
              const templateItem = getTemplateItem(entry.id)!;
              const ItemComponent = ItemComponentMap[templateItem.type.kind];
              return (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{templateItem.title}</h3>
                  <ItemComponent templateItem={templateItem.type} value={entry} />
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
