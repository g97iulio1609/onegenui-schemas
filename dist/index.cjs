"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  chartDatumSchema: () => chartDatumSchema,
  emailItemSchema: () => emailItemSchema,
  exerciseSchema: () => exerciseSchema,
  ganttTaskSchema: () => ganttTaskSchema,
  graphEdgeSchema: () => graphEdgeSchema,
  graphNodeSchema: () => graphNodeSchema,
  kanbanColumnSchema: () => kanbanColumnSchema,
  kanbanItemSchema: () => kanbanItemSchema,
  listItemSchema: () => listItemSchema,
  mealItemSchema: () => mealItemSchema,
  mealSchema: () => mealSchema,
  messageItemSchema: () => messageItemSchema,
  mindMapNodeSchema: () => mindMapNodeSchema,
  participantSchema: () => participantSchema,
  tableRowSchema: () => tableRowSchema,
  timelineItemSchema: () => timelineItemSchema,
  toDoItemSchema: () => toDoItemSchema,
  workoutSetSchema: () => workoutSetSchema
});
module.exports = __toCommonJS(index_exports);

// src/shared-schemas.ts
var import_zod = require("zod");
var chartDatumSchema = import_zod.z.object({
  label: import_zod.z.string(),
  value: import_zod.z.number(),
  color: import_zod.z.string().nullable()
});
var listItemSchema = import_zod.z.lazy(
  () => import_zod.z.object({
    id: import_zod.z.string().nullable().optional(),
    text: import_zod.z.string().optional(),
    description: import_zod.z.string().nullable().optional(),
    primary: import_zod.z.string().optional(),
    secondary: import_zod.z.string().nullable().optional(),
    status: import_zod.z.string().nullable().optional(),
    subItems: import_zod.z.array(listItemSchema).nullable().optional()
  }).catchall(import_zod.z.unknown()).transform((item) => ({
    id: item.id ?? null,
    text: item.text ?? item.primary ?? "",
    description: item.description ?? item.secondary ?? null,
    status: item.status ?? null,
    subItems: item.subItems ?? null,
    ...Object.fromEntries(
      Object.entries(item).filter(
        ([k]) => ![
          "id",
          "text",
          "description",
          "primary",
          "secondary",
          "status",
          "subItems"
        ].includes(k)
      )
    )
  }))
);
var timelineItemSchema = import_zod.z.lazy(
  () => import_zod.z.object({
    id: import_zod.z.string().nullable(),
    title: import_zod.z.string(),
    date: import_zod.z.string(),
    description: import_zod.z.string().nullable(),
    status: import_zod.z.string().nullable(),
    subItems: import_zod.z.array(timelineItemSchema).nullable()
  }).catchall(import_zod.z.unknown())
);
var toDoItemSchema = import_zod.z.lazy(
  () => import_zod.z.object({
    id: import_zod.z.string(),
    text: import_zod.z.string(),
    time: import_zod.z.string().nullable(),
    priority: import_zod.z.enum(["high", "medium", "low"]).nullable(),
    status: import_zod.z.enum(["pending", "in-progress", "done"]).nullable(),
    subItems: import_zod.z.array(toDoItemSchema).nullable()
  }).catchall(import_zod.z.unknown())
);
var tableRowSchema = import_zod.z.lazy(
  () => import_zod.z.object({
    id: import_zod.z.string().nullable(),
    subRows: import_zod.z.array(tableRowSchema).nullable()
  }).catchall(import_zod.z.unknown())
);
var mindMapNodeSchema = import_zod.z.lazy(
  () => import_zod.z.object({
    id: import_zod.z.string().describe("Unique ID (REQUIRED)"),
    label: import_zod.z.string().describe("Node text label (REQUIRED)"),
    description: import_zod.z.string().nullable(),
    color: import_zod.z.string().nullable(),
    icon: import_zod.z.string().nullable(),
    children: import_zod.z.array(mindMapNodeSchema).nullable().describe("Nested child nodes (recursive)")
  }).catchall(import_zod.z.unknown())
);
var graphNodeSchema = import_zod.z.object({
  id: import_zod.z.string(),
  label: import_zod.z.string(),
  description: import_zod.z.string().nullable(),
  group: import_zod.z.string().nullable(),
  type: import_zod.z.string().nullable(),
  color: import_zod.z.string().nullable(),
  size: import_zod.z.number().nullable(),
  icon: import_zod.z.string().nullable()
}).catchall(import_zod.z.unknown());
var graphEdgeSchema = import_zod.z.object({
  id: import_zod.z.string().nullable(),
  from: import_zod.z.string().nullable(),
  to: import_zod.z.string().nullable(),
  source: import_zod.z.string().nullable(),
  target: import_zod.z.string().nullable(),
  label: import_zod.z.string().nullable(),
  weight: import_zod.z.number().nullable(),
  directed: import_zod.z.boolean().nullable(),
  color: import_zod.z.string().nullable()
}).refine(
  (data) => data.from || data.source,
  "Either 'from' or 'source' must be provided"
).refine(
  (data) => data.to || data.target,
  "Either 'to' or 'target' must be provided"
);
var kanbanItemSchema = import_zod.z.lazy(
  () => import_zod.z.object({
    id: import_zod.z.string(),
    title: import_zod.z.string(),
    description: import_zod.z.string().nullable(),
    assignee: import_zod.z.string().nullable(),
    priority: import_zod.z.enum(["low", "medium", "high"]).nullable(),
    dueDate: import_zod.z.string().nullable(),
    tags: import_zod.z.array(import_zod.z.string()).nullable(),
    subItems: import_zod.z.array(kanbanItemSchema).nullable()
  }).catchall(import_zod.z.unknown())
);
var kanbanColumnSchema = import_zod.z.object({
  id: import_zod.z.string(),
  title: import_zod.z.string(),
  color: import_zod.z.string().nullable(),
  items: import_zod.z.array(kanbanItemSchema).nullable()
});
var ganttTaskSchema = import_zod.z.lazy(
  () => import_zod.z.object({
    id: import_zod.z.string(),
    name: import_zod.z.string(),
    start: import_zod.z.string(),
    end: import_zod.z.string(),
    progress: import_zod.z.number().nullable(),
    dependencies: import_zod.z.array(import_zod.z.string()).nullable(),
    subTasks: import_zod.z.array(ganttTaskSchema).nullable()
  }).catchall(import_zod.z.unknown())
);
var emailItemSchema = import_zod.z.object({
  id: import_zod.z.string().describe("Unique ID (REQUIRED)"),
  from: import_zod.z.string(),
  subject: import_zod.z.string(),
  body: import_zod.z.string(),
  date: import_zod.z.string(),
  read: import_zod.z.boolean().nullable().optional()
});
var workoutSetSchema = import_zod.z.object({
  id: import_zod.z.string(),
  setNumber: import_zod.z.number().optional(),
  reps: import_zod.z.number().nullable().optional(),
  weight: import_zod.z.number().nullable().optional(),
  rpe: import_zod.z.number().nullable().optional(),
  completed: import_zod.z.boolean().nullable().optional(),
  type: import_zod.z.enum(["warmup", "normal", "drop", "failure"]).optional(),
  targetReps: import_zod.z.number().nullable().optional(),
  targetWeight: import_zod.z.number().nullable().optional()
});
var exerciseSchema = import_zod.z.lazy(
  () => import_zod.z.object({
    id: import_zod.z.string().describe("Unique ID (REQUIRED)"),
    name: import_zod.z.string(),
    type: import_zod.z.enum(["exercise", "cardio", "superset", "circuit", "warmup"]).optional(),
    sets: import_zod.z.number().nullable().optional(),
    reps: import_zod.z.number().nullable().optional(),
    weight: import_zod.z.number().nullable().optional(),
    actualSets: import_zod.z.number().nullable().optional(),
    actualReps: import_zod.z.number().nullable().optional(),
    actualWeight: import_zod.z.number().nullable().optional(),
    distance: import_zod.z.number().nullable().optional(),
    duration: import_zod.z.string().nullable().optional(),
    intensity: import_zod.z.string().nullable().optional(),
    actualDistance: import_zod.z.number().nullable().optional(),
    actualDuration: import_zod.z.string().nullable().optional(),
    actualIntensity: import_zod.z.string().nullable().optional(),
    items: import_zod.z.array(exerciseSchema).nullable().optional(),
    rpe: import_zod.z.number().nullable().optional(),
    oneRm: import_zod.z.number().nullable().optional(),
    suggestedBy: import_zod.z.string().nullable().optional(),
    rationale: import_zod.z.string().nullable().optional(),
    completed: import_zod.z.boolean().nullable().optional(),
    notes: import_zod.z.string().nullable().optional(),
    series: import_zod.z.array(workoutSetSchema).nullable().optional()
  })
);
var mealItemSchema = import_zod.z.object({
  id: import_zod.z.string().describe("Unique ID (REQUIRED)"),
  name: import_zod.z.string().describe("Food Item Name (REQUIRED)"),
  protein: import_zod.z.number().describe("Protein in g (REQUIRED)"),
  carbs: import_zod.z.number().describe("Carbs in g (REQUIRED)"),
  fats: import_zod.z.number().describe("Fats in g (REQUIRED)"),
  calories: import_zod.z.number().nullable().optional(),
  grams: import_zod.z.number().nullable().optional(),
  consumed: import_zod.z.boolean().nullable().optional()
});
var mealSchema = import_zod.z.object({
  id: import_zod.z.string(),
  name: import_zod.z.string(),
  items: import_zod.z.array(mealItemSchema),
  source: import_zod.z.string().nullable().optional(),
  conflict: import_zod.z.string().nullable().optional()
});
var messageItemSchema = import_zod.z.object({
  id: import_zod.z.string().describe("Unique ID (REQUIRED)"),
  sender: import_zod.z.string(),
  content: import_zod.z.string(),
  timestamp: import_zod.z.string(),
  participantId: import_zod.z.string().nullable().optional()
});
var participantSchema = import_zod.z.object({
  id: import_zod.z.string().describe("Unique ID (REQUIRED)"),
  name: import_zod.z.string(),
  role: import_zod.z.string(),
  avatar: import_zod.z.string().nullable().optional(),
  color: import_zod.z.string().nullable().optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  chartDatumSchema,
  emailItemSchema,
  exerciseSchema,
  ganttTaskSchema,
  graphEdgeSchema,
  graphNodeSchema,
  kanbanColumnSchema,
  kanbanItemSchema,
  listItemSchema,
  mealItemSchema,
  mealSchema,
  messageItemSchema,
  mindMapNodeSchema,
  participantSchema,
  tableRowSchema,
  timelineItemSchema,
  toDoItemSchema,
  workoutSetSchema
});
//# sourceMappingURL=index.cjs.map