import { z } from "zod";

export type SendReviewRequest = z.infer<typeof $sendReviewRequest>;

export const $sendReviewRequest = z.object({
    rating: z.number().min(1, "Выставите оценку"),
    content: z.string({ required_error: "Введите текст отзыва" }),
});
