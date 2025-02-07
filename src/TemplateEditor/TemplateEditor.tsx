import { useAtom } from "jotai";
import RangeItem from "./RangeItem";
import EnumItem from "./EnumItem";
import TimeItem from "./TimeItem";
import TagsItem from "./TagsItem";
import AddItemForm from "./AddItemForm";
import { templateAtom, type TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
          <Card key={index} className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <ItemComponent item={item.type as never} onChange={(type: any) => editItem(index, { ...item, type })} />
            <Button onClick={() => removeItem(index)} variant="destructive" className="mt-2">
              Remove
            </Button>
          </Card>
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
