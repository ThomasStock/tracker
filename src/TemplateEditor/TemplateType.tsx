import { CardDescription } from "@/components/ui/card";

const typeLabels = {
  range: "Numeric Range",
  enum: "Single Choice",
  time: "Time Picker",
  tags: "Multiple Choice",
} as const;

type TemplateTypeProps = {
  type: keyof typeof typeLabels;
};

export function TemplateType({ type }: TemplateTypeProps) {
  return <CardDescription className="text-xs rounded-md bg-muted px-2 py-0.5 w-fit">{typeLabels[type]}</CardDescription>;
}

export { typeLabels };
