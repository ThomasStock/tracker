import type { TemplateItem } from "../store/templateAtom";

interface ReadOnlyItemProps {
  item: TemplateItem;
}

export default function ReadOnlyItem({ item }: ReadOnlyItemProps) {
  const getTypeDetails = () => {
    switch (item.type.kind) {
      case "range":
        return `Range from ${item.type.min} to ${item.type.max}`;
      case "enum":
        return `Options: ${item.type.values.join(", ")}`;
      case "tags":
        return `Tags: ${item.type.values.join(", ")}`;
      case "time":
        return "Time picker";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="text-sm text-muted-foreground">{getTypeDetails()}</div>
      </div>
    </div>
  );
}
