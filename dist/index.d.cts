import { z } from 'zod';

/**
 * Shared Zod schemas used across multiple components
 */

declare const chartDatumSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodNumber;
    color: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
/**
 * List item schema that accepts both canonical (text/description) and alternative (primary/secondary) naming.
 * This ensures compatibility with different AI model outputs.
 */
declare const listItemSchema: z.ZodType<Record<string, unknown>>;
declare const timelineItemSchema: z.ZodType<Record<string, unknown>>;
declare const toDoItemSchema: z.ZodType<Record<string, unknown>>;
declare const tableRowSchema: z.ZodType<Record<string, unknown>>;
declare const mindMapNodeSchema: z.ZodType<Record<string, unknown>>;
declare const graphNodeSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    group: z.ZodNullable<z.ZodString>;
    type: z.ZodNullable<z.ZodString>;
    color: z.ZodNullable<z.ZodString>;
    size: z.ZodNullable<z.ZodNumber>;
    icon: z.ZodNullable<z.ZodString>;
}, z.core.$catchall<z.ZodUnknown>>;
declare const graphEdgeSchema: z.ZodObject<{
    id: z.ZodNullable<z.ZodString>;
    from: z.ZodNullable<z.ZodString>;
    to: z.ZodNullable<z.ZodString>;
    source: z.ZodNullable<z.ZodString>;
    target: z.ZodNullable<z.ZodString>;
    label: z.ZodNullable<z.ZodString>;
    weight: z.ZodNullable<z.ZodNumber>;
    directed: z.ZodNullable<z.ZodBoolean>;
    color: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
declare const kanbanItemSchema: z.ZodType<Record<string, unknown>>;
declare const kanbanColumnSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    color: z.ZodNullable<z.ZodString>;
    items: z.ZodNullable<z.ZodArray<z.ZodType<Record<string, unknown>, unknown, z.core.$ZodTypeInternals<Record<string, unknown>, unknown>>>>;
}, z.core.$strip>;
declare const ganttTaskSchema: z.ZodType<Record<string, unknown>>;
declare const emailItemSchema: z.ZodObject<{
    id: z.ZodString;
    from: z.ZodString;
    subject: z.ZodString;
    body: z.ZodString;
    date: z.ZodString;
    read: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
declare const workoutSetSchema: z.ZodObject<{
    id: z.ZodString;
    setNumber: z.ZodOptional<z.ZodNumber>;
    reps: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    weight: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    rpe: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    completed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    type: z.ZodOptional<z.ZodEnum<{
        warmup: "warmup";
        normal: "normal";
        drop: "drop";
        failure: "failure";
    }>>;
    targetReps: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    targetWeight: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
type WorkoutSet = z.infer<typeof workoutSetSchema>;
interface ExerciseItem {
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
declare const exerciseSchema: z.ZodType<ExerciseItem>;
declare const mealItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    calories: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    grams: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    consumed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
declare const mealSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        calories: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        grams: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        consumed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    conflict: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const messageItemSchema: z.ZodObject<{
    id: z.ZodString;
    sender: z.ZodString;
    content: z.ZodString;
    timestamp: z.ZodString;
    participantId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const participantSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    role: z.ZodString;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;

export { type ExerciseItem, type WorkoutSet, chartDatumSchema, emailItemSchema, exerciseSchema, ganttTaskSchema, graphEdgeSchema, graphNodeSchema, kanbanColumnSchema, kanbanItemSchema, listItemSchema, mealItemSchema, mealSchema, messageItemSchema, mindMapNodeSchema, participantSchema, tableRowSchema, timelineItemSchema, toDoItemSchema, workoutSetSchema };
