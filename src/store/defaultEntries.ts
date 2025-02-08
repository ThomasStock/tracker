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
      {
        id: 4,
        value: "Happy",
      },
      {
        id: 5,
        value: "10",
      },
      {
        id: 8,
        value: 8000,
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
        max: 10,
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
    {
      id: 5,
      title: "Mood",
      type: {
        kind: "range",
        min: 1,
        max: 10,
      },
      readOnly: true,
    },
    {
      id: 6,
      title: "Water intake",
      type: {
        kind: "enum",
        values: ["not a lot", "normal amount", "a lot"],
      },
      readOnly: true,
    },
    {
      id: 7,
      title: "Last meal time",
      type: {
        kind: "time",
      },
      readOnly: true,
    },
    {
      id: 8,
      title: "Exercise type",
      type: {
        kind: "tags",
        values: ["Yoga", "Running", "Cycling", "Swimming"],
      },
      readOnly: true,
    },
    {
      id: 9,
      title: "Steps count",
      type: {
        kind: "range",
        min: 0,
        max: 20000,
      },
      readOnly: true,
    },
  ] as Template,
};
