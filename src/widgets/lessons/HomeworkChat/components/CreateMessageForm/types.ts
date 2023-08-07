import { z } from "zod";

export type CreateHomeworkAnswerMessageFormValidation = z.infer<typeof $CreateHomeworkAnswerMessageFormValidation>;

export const $CreateHomeworkAnswerMessageFormValidation = z.object({
    content: z.string({ required_error: "Введите сообщение" }),
});
