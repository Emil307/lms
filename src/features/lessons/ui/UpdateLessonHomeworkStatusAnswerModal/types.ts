import { z } from "zod";

export type UpdateHomeworkAnswerStatusFormValues = z.infer<typeof $UpdateHomeworkAnswerStatusFormValues>;

export const $UpdateHomeworkAnswerStatusFormValues = z.object({
    content: z.string().optional(),
});
