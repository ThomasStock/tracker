import React from "react";
import { useAtom } from "jotai";
import { entriesAtom } from "../store/entriesAtom";

interface RangeEditorProps {
  entryId: number;
  date: string;
}

const RangeEditor: React.FC<RangeEditorProps> = ({ entryId, date }) => {
  const [entries, setEntries] = useAtom(entriesAtom);
  const entry = entries[date]?.find((e) => e.id === entryId);

  if (!entry) {
    return <div>Entry not found</div>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setEntries({
      ...entries,
      [date]: entries[date].map((e) => (e.id === entryId ? { ...e, value: newValue } : e)),
    });
  };

  return (
    <div>
      <label>
        Range Value:
        <input type="number" value={entry.value as number} onChange={handleChange} />
      </label>
    </div>
  );
};

export default RangeEditor;
