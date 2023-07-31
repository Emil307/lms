import { z } from "zod";

export type UpdateLessonTestPassFormValidation = z.infer<typeof $UpdateLessonTestPassFormValidation>;
export type TaskTestPass = z.infer<typeof $TaskTestPass>;
export type TaskPossibleAnswer = z.infer<typeof $TaskPossibleAnswer>;

export const $TaskPossibleAnswer = z.object({
    id: z.number(),
    order: z.number(),
    content: z.string(),
    isSelected: z.boolean(),
    isPrevSelected: z.boolean(),
});

export const $TaskTestPass = z.object({
    id: z.number(),
    order: z.number(),
    content: z.string(),
    answers: $TaskPossibleAnswer.array(),
    isCheckbox: z.boolean(),
});

export const $UpdateLessonTestPassFormValidation = z.object({
    tasks: $TaskTestPass.array(),
    progressCounter: z.number(),
});
