import { z } from "zod";

export type CreateMessageFormValidation = z.infer<typeof $CreateMessageFormValidation>;

export const $CreateMessageFormValidation = z.object({
    message: z.string({ required_error: "Введите сообщение" }),
});
