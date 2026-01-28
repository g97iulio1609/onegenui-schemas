// src/shared-schemas.ts
import { z } from "zod";
var chartDatumSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string().nullable()
});
var listItemSchema = z.lazy(
  () => z.object({
    id: z.string().nullable().optional(),
    text: z.string().optional(),
    description: z.string().nullable().optional(),
    primary: z.string().optional(),
    secondary: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    subItems: z.array(listItemSchema).nullable().optional()
  }).catchall(z.unknown()).transform((item) => ({
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
var timelineItemSchema = z.lazy(
  () => z.object({
    id: z.string().nullable(),
    title: z.string(),
    date: z.string(),
    description: z.string().nullable(),
    status: z.string().nullable(),
    subItems: z.array(timelineItemSchema).nullable()
  }).catchall(z.unknown())
);
var toDoItemSchema = z.lazy(
  () => z.object({
    id: z.string(),
    text: z.string(),
    time: z.string().nullable(),
    priority: z.enum(["high", "medium", "low"]).nullable(),
    status: z.enum(["pending", "in-progress", "done"]).nullable(),
    subItems: z.array(toDoItemSchema).nullable()
  }).catchall(z.unknown())
);
var tableRowSchema = z.lazy(
  () => z.object({
    id: z.string().nullable(),
    subRows: z.array(tableRowSchema).nullable()
  }).catchall(z.unknown())
);
var mindMapNodeSchema = z.lazy(
  () => z.object({
    id: z.string().describe("Unique ID (REQUIRED)"),
    label: z.string().describe("Node text label (REQUIRED)"),
    description: z.string().nullable(),
    color: z.string().nullable(),
    icon: z.string().nullable(),
    children: z.array(mindMapNodeSchema).nullable().describe("Nested child nodes (recursive)")
  }).catchall(z.unknown())
);
var graphNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().nullable(),
  group: z.string().nullable(),
  type: z.string().nullable(),
  color: z.string().nullable(),
  size: z.number().nullable(),
  icon: z.string().nullable()
}).catchall(z.unknown());
var graphEdgeSchema = z.object({
  id: z.string().nullable(),
  from: z.string().nullable(),
  to: z.string().nullable(),
  source: z.string().nullable(),
  target: z.string().nullable(),
  label: z.string().nullable(),
  weight: z.number().nullable(),
  directed: z.boolean().nullable(),
  color: z.string().nullable()
}).refine(
  (data) => data.from || data.source,
  "Either 'from' or 'source' must be provided"
).refine(
  (data) => data.to || data.target,
  "Either 'to' or 'target' must be provided"
);
var kanbanItemSchema = z.lazy(
  () => z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    assignee: z.string().nullable(),
    priority: z.enum(["low", "medium", "high"]).nullable(),
    dueDate: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
    subItems: z.array(kanbanItemSchema).nullable()
  }).catchall(z.unknown())
);
var kanbanColumnSchema = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string().nullable(),
  items: z.array(kanbanItemSchema).nullable()
});
var ganttTaskSchema = z.lazy(
  () => z.object({
    id: z.string(),
    name: z.string(),
    start: z.string(),
    end: z.string(),
    progress: z.number().nullable(),
    dependencies: z.array(z.string()).nullable(),
    subTasks: z.array(ganttTaskSchema).nullable()
  }).catchall(z.unknown())
);
var emailItemSchema = z.object({
  id: z.string().describe("Unique ID (REQUIRED)"),
  from: z.string(),
  subject: z.string(),
  body: z.string(),
  date: z.string(),
  read: z.boolean().nullable().optional()
});
var workoutSetSchema = z.object({
  id: z.string(),
  setNumber: z.number().optional(),
  reps: z.number().nullable().optional(),
  weight: z.number().nullable().optional(),
  rpe: z.number().nullable().optional(),
  completed: z.boolean().nullable().optional(),
  type: z.enum(["warmup", "normal", "drop", "failure"]).optional(),
  targetReps: z.number().nullable().optional(),
  targetWeight: z.number().nullable().optional()
});
var exerciseSchema = z.lazy(
  () => z.object({
    id: z.string().describe("Unique ID (REQUIRED)"),
    name: z.string(),
    type: z.enum(["exercise", "cardio", "superset", "circuit", "warmup"]).optional(),
    sets: z.number().nullable().optional(),
    reps: z.number().nullable().optional(),
    weight: z.number().nullable().optional(),
    actualSets: z.number().nullable().optional(),
    actualReps: z.number().nullable().optional(),
    actualWeight: z.number().nullable().optional(),
    distance: z.number().nullable().optional(),
    duration: z.string().nullable().optional(),
    intensity: z.string().nullable().optional(),
    actualDistance: z.number().nullable().optional(),
    actualDuration: z.string().nullable().optional(),
    actualIntensity: z.string().nullable().optional(),
    items: z.array(exerciseSchema).nullable().optional(),
    rpe: z.number().nullable().optional(),
    oneRm: z.number().nullable().optional(),
    suggestedBy: z.string().nullable().optional(),
    rationale: z.string().nullable().optional(),
    completed: z.boolean().nullable().optional(),
    notes: z.string().nullable().optional(),
    series: z.array(workoutSetSchema).nullable().optional()
  })
);
var mealItemSchema = z.object({
  id: z.string().describe("Unique ID (REQUIRED)"),
  name: z.string().describe("Food Item Name (REQUIRED)"),
  protein: z.number().describe("Protein in g (REQUIRED)"),
  carbs: z.number().describe("Carbs in g (REQUIRED)"),
  fats: z.number().describe("Fats in g (REQUIRED)"),
  calories: z.number().nullable().optional(),
  grams: z.number().nullable().optional(),
  consumed: z.boolean().nullable().optional()
});
var mealSchema = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(mealItemSchema),
  source: z.string().nullable().optional(),
  conflict: z.string().nullable().optional()
});
var messageItemSchema = z.object({
  id: z.string().describe("Unique ID (REQUIRED)"),
  sender: z.string(),
  content: z.string(),
  timestamp: z.string(),
  participantId: z.string().nullable().optional()
});
var participantSchema = z.object({
  id: z.string().describe("Unique ID (REQUIRED)"),
  name: z.string(),
  role: z.string(),
  avatar: z.string().nullable().optional(),
  color: z.string().nullable().optional()
});
export {
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
};
//# sourceMappingURL=index.js.map