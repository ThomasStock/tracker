import { atomWithStorage } from "jotai/utils";
import * as v from "valibot";

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
  })
);
export type Template = v.InferOutput<typeof templateSchema>;
export type TemplateItem = Template[number];

export const defaultTemplate: Template = [
  {
    id: 1,
    title: "Sleep quality",
    type: {
      kind: "range",
      min: 0,
      max: 10,
    },
  },
  {
    id: 2,
    title: "Alcohol consumption yesterday",
    type: {
      kind: "enum",
      values: ["1 drink", "2 drinks", "3 or more drinks"],
    },
  },
  {
    id: 3,
    title: "Last alcohol consumption yesterday",
    type: {
      kind: "time",
    },
  },
  {
    id: 4,
    title: "Exercised yesterday",
    type: {
      kind: "tags",
      values: ["Minimal", "Gym", "Walk", "Running"],
    },
  },
];

export const templateAtom = atomWithStorage<Template>("template", defaultTemplate);
