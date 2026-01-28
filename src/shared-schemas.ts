/**
 * Shared Zod schemas used across multiple components
 */
import { z } from "zod";

// =============================================================================
// Chart Schemas
// =============================================================================

export const chartDatumSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string().nullable(),
});

// =============================================================================
// List & Item Schemas
// =============================================================================

/**
 * List item schema that accepts both canonical (text/description) and alternative (primary/secondary) naming.
 * This ensures compatibility with different AI model outputs.
 */
export const listItemSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z
    .object({
      id: z.string().nullable().optional(),
      text: z.string().optional(),
      description: z.string().nullable().optional(),
      primary: z.string().optional(),
      secondary: z.string().nullable().optional(),
      status: z.string().nullable().optional(),
      subItems: z.array(listItemSchema).nullable().optional(),
    })
    .catchall(z.unknown())
    .transform((item) => ({
      id: item.id ?? null,
      text: item.text ?? item.primary ?? "",
      description: item.description ?? item.secondary ?? null,
      status: item.status ?? null,
      subItems: item.subItems ?? null,
      ...Object.fromEntries(
        Object.entries(item).filter(
          ([k]) =>
            ![
              "id",
              "text",
              "description",
              "primary",
              "secondary",
              "status",
              "subItems",
            ].includes(k),
        ),
      ),
    })),
);

export const timelineItemSchema: z.ZodType<Record<string, unknown>> = z.lazy(
  () =>
    z
      .object({
        id: z.string().nullable(),
        title: z.string(),
        date: z.string(),
        description: z.string().nullable(),
        status: z.string().nullable(),
        subItems: z.array(timelineItemSchema).nullable(),
      })
      .catchall(z.unknown()),
);

export const toDoItemSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z
    .object({
      id: z.string(),
      text: z.string(),
      time: z.string().nullable(),
      priority: z.enum(["high", "medium", "low"]).nullable(),
      status: z.enum(["pending", "in-progress", "done"]).nullable(),
      subItems: z.array(toDoItemSchema).nullable(),
    })
    .catchall(z.unknown()),
);

// =============================================================================
// Table Schemas
// =============================================================================

export const tableRowSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z
    .object({
      id: z.string().nullable(),
      subRows: z.array(tableRowSchema).nullable(),
    })
    .catchall(z.unknown()),
);

// =============================================================================
// Visualization Schemas
// =============================================================================

export const mindMapNodeSchema: z.ZodType<Record<string, unknown>> = z.lazy(
  () =>
    z
      .object({
        id: z.string().describe("Unique ID (REQUIRED)"),
        label: z.string().describe("Node text label (REQUIRED)"),
        description: z.string().nullable(),
        color: z.string().nullable(),
        icon: z.string().nullable(),
        children: z
          .array(mindMapNodeSchema)
          .nullable()
          .describe("Nested child nodes (recursive)"),
      })
      .catchall(z.unknown()),
);

export const graphNodeSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    description: z.string().nullable(),
    group: z.string().nullable(),
    type: z.string().nullable(),
    color: z.string().nullable(),
    size: z.number().nullable(),
    icon: z.string().nullable(),
  })
  .catchall(z.unknown());

export const graphEdgeSchema = z
  .object({
    id: z.string().nullable(),
    from: z.string().nullable(),
    to: z.string().nullable(),
    source: z.string().nullable(),
    target: z.string().nullable(),
    label: z.string().nullable(),
    weight: z.number().nullable(),
    directed: z.boolean().nullable(),
    color: z.string().nullable(),
  })
  .refine(
    (data) => data.from || data.source,
    "Either 'from' or 'source' must be provided",
  )
  .refine(
    (data) => data.to || data.target,
    "Either 'to' or 'target' must be provided",
  );

// =============================================================================
// Kanban Schemas
// =============================================================================

export const kanbanItemSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      assignee: z.string().nullable(),
      priority: z.enum(["low", "medium", "high"]).nullable(),
      dueDate: z.string().nullable(),
      tags: z.array(z.string()).nullable(),
      subItems: z.array(kanbanItemSchema).nullable(),
    })
    .catchall(z.unknown()),
);

export const kanbanColumnSchema = z.object({
  id: z.string(),
  title: z.string(),
  color: z.string().nullable(),
  items: z.array(kanbanItemSchema).nullable(),
});

// =============================================================================
// Gantt Schemas
// =============================================================================

export const ganttTaskSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z
    .object({
      id: z.string(),
      name: z.string(),
      start: z.string(),
      end: z.string(),
      progress: z.number().nullable(),
      dependencies: z.array(z.string()).nullable(),
      subTasks: z.array(ganttTaskSchema).nullable(),
    })
    .catchall(z.unknown()),
);

// =============================================================================
// Email Schemas
// =============================================================================

export const emailItemSchema = z.object({
  id: z.string().describe("Unique ID (REQUIRED)"),
  from: z.string(),
  subject: z.string(),
  body: z.string(),
  date: z.string(),
  read: z.boolean().nullable().optional(),
});

// =============================================================================
// Workout Schemas
// =============================================================================

export const workoutSetSchema = z.object({
  id: z.string(),
  setNumber: z.number().optional(),
  reps: z.number().nullable().optional(),
  weight: z.number().nullable().optional(),
  rpe: z.number().nullable().optional(),
  completed: z.boolean().nullable().optional(),
  type: z.enum(["warmup", "normal", "drop", "failure"]).optional(),
  targetReps: z.number().nullable().optional(),
  targetWeight: z.number().nullable().optional(),
});

export type WorkoutSet = z.infer<typeof workoutSetSchema>;

export interface ExerciseItem {
  id: string;
  name: string;
  type?: "exercise" | "cardio" | "superset" | "circuit" | "warmup";
  sets?: number | null;
  reps?: number | null;
  weight?: number | null;
  actualSets?: number | null;
  actualReps?: number | null;
  actualWeight?: number | null;
  distance?: number | null;
  duration?: string | null;
  intensity?: string | null;
  actualDistance?: number | null;
  actualDuration?: string | null;
  actualIntensity?: string | null;
  items?: ExerciseItem[] | null;
  rpe?: number | null;
  oneRm?: number | null;
  suggestedBy?: string | null;
  rationale?: string | null;
  completed?: boolean | null;
  notes?: string | null;
  series?: WorkoutSet[] | null;
}

export const exerciseSchema: z.ZodType<ExerciseItem> = z.lazy(() =>
  z.object({
    id: z.string().describe("Unique ID (REQUIRED)"),
    name: z.string(),
    type: z
      .enum(["exercise", "cardio", "superset", "circuit", "warmup"])
      .optional(),
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
    series: z.array(workoutSetSchema).nullable().optional(),
  }),
);

// =============================================================================
// Nutrition Schemas
// =============================================================================

export const mealItemSchema = z.object({
  id: z.string().describe("Unique ID (REQUIRED)"),
  name: z.string().describe("Food Item Name (REQUIRED)"),
  protein: z.number().describe("Protein in g (REQUIRED)"),
  carbs: z.number().describe("Carbs in g (REQUIRED)"),
  fats: z.number().describe("Fats in g (REQUIRED)"),
  calories: z.number().nullable().optional(),
  grams: z.number().nullable().optional(),
  consumed: z.boolean().nullable().optional(),
});

export const mealSchema = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(mealItemSchema),
  source: z.string().nullable().optional(),
  conflict: z.string().nullable().optional(),
});

// =============================================================================
// Message/Chat Schemas
// =============================================================================

export const messageItemSchema = z.object({
  id: z.string().describe("Unique ID (REQUIRED)"),
  sender: z.string(),
  content: z.string(),
  timestamp: z.string(),
  participantId: z.string().nullable().optional(),
});

export const participantSchema = z.object({
  id: z.string().describe("Unique ID (REQUIRED)"),
  name: z.string(),
  role: z.string(),
  avatar: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
});
