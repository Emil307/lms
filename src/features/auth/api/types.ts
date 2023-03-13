import { z } from "zod";

export const $authFormValidationSchema = z.object({
    login: z.string({ required_error: "Введите email" }),
    password: z.string({ required_error: "Введите пароль" }),
});

export type AuthData = z.infer<typeof $authFormValidationSchema>;
