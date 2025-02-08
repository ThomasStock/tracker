import { atomWithStorage } from "jotai/utils";
import * as v from "valibot";
import { defaultEntries } from "./defaultEntries";

export const rangeSchema = v.object({
  kind: v.literal("range"),
  min: v.number(),
  max: v.number(),
});
export type RangeTemplate = v.InferOutput<typeof rangeSchema>;

export const tagsSchema = v.object({
  kind: v.literal("tags"),
  values: v.array(v.string()),
});
export type TagsTemplate = v.InferOutput<typeof tagsSchema>;

export const enumSchema = v.object({
  kind: v.literal("enum"),
  values: v.array(v.string()),
});
export type EnumTemplate = v.InferOutput<typeof enumSchema>;

export const timeSchema = v.object({
  kind: v.literal("time"),
});
export type TimeTemplate = v.InferOutput<typeof timeSchema>;

export const templateSchema = v.array(
  v.object({
    id: v.number(),
    title: v.string(),
    type: v.variant("kind", [rangeSchema, tagsSchema, enumSchema, timeSchema]),
    readOnly: v.boolean(),
  })
);
export type Template = v.InferOutput<typeof templateSchema>;
export type TemplateItem = Template[number];

export const templateAtom = atomWithStorage<Template>("template", defaultEntries.templates);
