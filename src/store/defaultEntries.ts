import { DateTime } from "luxon";
import type { Template } from "./templateAtom";

export const defaultEntries = {
  // Define your default entries and templates here
  entries: {
    [DateTime.now().toISODate()]: [
      {
        id: 1,
        value: 5,
      },
      {
        id: 2,
        value: "2 drinks",
      },
      {
        id: 3,
        value: "17:45",
      },
    ],
  },
  templates: [
    {
      id: 1,
      title: "Sleep quality",
      type: {
        kind: "range",
        min: 0,
        max: 100,
      },
      readOnly: true,
    },
    {
      id: 2,
      title: "Alcohol consumption yesterday",
      type: {
        kind: "enum",
        values: ["1 drink", "2 drinks", "3 or more drinks"],
      },
      readOnly: true,
    },
    {
      id: 3,
      title: "Last alcohol consumption yesterday",
      type: {
        kind: "time",
      },
      readOnly: true,
    },
    {
      id: 4,
      title: "Exercised yesterday",
      type: {
        kind: "tags",
        values: ["Minimal", "Gym", "Walk", "Running"],
      },
      readOnly: true,
    },
  ] as Template,
};
