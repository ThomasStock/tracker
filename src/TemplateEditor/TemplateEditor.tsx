import { useAtom } from "jotai";
import RangeItem from "./RangeItem";
import EnumItem from "./EnumItem";
import TimeItem from "./TimeItem";
import TagsItem from "./TagsItem";
import AddItemForm from "./AddItemForm";
import { templateAtom, type TemplateItem } from "../store/templateAtom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

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
    <div className="space-y-4 pb-8">
      {template.map((item, index) => {
        const ItemComponent = ItemComponentMap[item.type.kind];
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
              <Button
                onClick={() => removeItem(index)}
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </CardHeader>
            <CardContent>
              <ItemComponent item={item.type as never} onChange={(type: any) => editItem(index, { ...item, type })} />
            </CardContent>
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
