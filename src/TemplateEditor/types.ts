export type TemplateItemProps<T> = {
  item: T;
  onChange: (value: T) => void;
};
