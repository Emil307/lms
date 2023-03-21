import { z } from "zod";
import { REGEXP_PASSWORD } from "@features/utils";

export const $changePasswordFormValidationSchema = z.object({
    oldPassword: z.string({ required_error: "Введите пароль" }),
    newPasswords: z
        .object({
            password: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
            passwordConfirmation: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        })
        .refine((value) => value.password === value.passwordConfirmation, {
            message: "Пароли не совпадают",
            path: ["passwordConfirmation"],
        }),
});

export type ChangePasswordFormData = z.infer<typeof $changePasswordFormValidationSchema>;
