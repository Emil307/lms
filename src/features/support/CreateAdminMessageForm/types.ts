import { z } from "zod";

export type CreateAdminMessageFormValidation = z.infer<typeof $CreateAdminMessageFormValidation>;

export const $CreateAdminMessageFormValidation = z.object({
    message: z.string({ required_error: "Введите сообщение" }),
});
