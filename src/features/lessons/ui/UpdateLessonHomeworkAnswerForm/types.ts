import { z } from "zod";
import { $UploadedFile } from "@shared/types";
import { REGEXP_TEXTEDITOR_INNER_TEXT } from "@shared/constant";

export type UpdateLessonHomeworkAnswerFormValidation = z.infer<typeof $UpdateLessonHomeworkAnswerFormValidation>;

export const $UpdateLessonHomeworkAnswerFormValidation = z.object({
    answer: z.string({ required_error: "Введите ответ" }).refine((value) => value.replace(REGEXP_TEXTEDITOR_INNER_TEXT, "").length, {
        message: "Введите ответ",
    }),
    files: $UploadedFile.array(),
});
