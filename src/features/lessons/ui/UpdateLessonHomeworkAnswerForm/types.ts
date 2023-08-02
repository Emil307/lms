import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateLessonHomeworkAnswerFormValidation = z.infer<typeof $UpdateLessonHomeworkAnswerFormValidation>;

export const $UpdateLessonHomeworkAnswerFormValidation = z.object({
    answer: z.string(),
    files: $UploadedFile.array(),
});
