import { z } from "zod";
import { $HomeworkAnswerStatusName } from "@entities/lesson";

export type AdminHomeworkAnswersFilters = z.infer<typeof $AdminHomeworkAnswersFilters>;

export const $AdminHomeworkAnswersFilters = z.object({
    query: z.string(),
    status: $HomeworkAnswerStatusName.or(z.literal("")),
    studentId: z.string(),
    courseId: z.string(),
    updatedAtFrom: z.coerce.date().nullable(),
    updatedAtTo: z.coerce.date().nullable(),
});
