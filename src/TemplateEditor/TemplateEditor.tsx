import { useAtom } from "jotai";
import RangeItem from "./RangeItem";
import EnumItem from "./EnumItem";
import TimeItem from "./TimeItem";
import TagsItem from "./TagsItem";
import AddItemForm from "./AddItemForm";
import { templateAtom, type TemplateItem } from "../store/templateAtom";

export default function TemplateEditor() {
  const [template, setTemplate] = useAtom(templateAtom);

  const removeItem = (index: number) => {
    setTemplate(template.filter((_, i) => i !== index));
  };

  const editItem = (index: number, newItem: TemplateItem) => {
    setTemplate((prev) => prev.map((t, i) => (i === index ? newItem : t)));
  };

  const addItem = (item: TemplateItem) => {
    setTemplate((prev) => [...prev, item]);
  };

  return (
    <div className="space-y-4">
      {template.map((item, index) => {
        const ItemComponent = ItemComponentMap[item.type.kind];
        return (
          <div key={index} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <ItemComponent item={item.type as never} onChange={(type: any) => editItem(index, { ...item, type })} />
            <button
              onClick={() => removeItem(index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        );
      })}
      <AddItemForm addItem={addItem} />
    </div>
  );
}

const ItemComponentMap = {
  range: RangeItem,
  enum: EnumItem,
  time: TimeItem,
  tags: TagsItem,
};
