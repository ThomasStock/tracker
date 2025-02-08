import { atomWithStorage } from "jotai/utils";
import * as v from "valibot";
import { templateSchema } from "./templateAtom";
import { defaultEntries } from "./defaultEntries";

export const rangeValueSchema = v.number();
export type RangeValue = v.InferOutput<typeof rangeValueSchema>;

export const tagsValueSchema = v.array(v.string());
export type TagsValue = v.InferOutput<typeof tagsValueSchema>;

export const enumValueSchema = v.string();
export type EnumValue = v.InferOutput<typeof enumValueSchema>;

export const timeValueSchema = v.string();
export type TimeValue = v.InferOutput<typeof timeValueSchema>;

export const entrySchema = v.array(
  v.object({
    id: v.number(),
    value: v.union([rangeValueSchema, tagsValueSchema, enumValueSchema, timeValueSchema]),
  })
);

export const entriesSchema = v.record(v.string(), templateSchema);
export type Entries = v.InferOutput<typeof entriesSchema>;

export const entriesAtom = atomWithStorage("entries", defaultEntries.entries);
