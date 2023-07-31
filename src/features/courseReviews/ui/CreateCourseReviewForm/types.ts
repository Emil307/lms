import { z } from "zod";

export type CreateCourseReviewFormValidation = z.infer<typeof $CreateCourseReviewFormValidation>;

export const $CreateCourseReviewFormValidation = z.object({
    score: z.number().min(1, "Выставите оценку"),
    content: z.string({ required_error: "Введите текст отзыва" }),
});
