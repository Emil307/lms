import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";

export type ChangePasswordFormValidationSchema = z.infer<typeof $changePasswordFormValidationSchema>;

export const $changePasswordFormValidationSchema = z
    .object({
        isOldPassword: z.boolean(),
        oldPassword: z.string().regex(REGEXP_PASSWORD, "Неверный формат").optional(),
        password: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        passwordConfirmation: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
    })
    .refine(
        (data) => {
            if (!data.isOldPassword) {
                return true;
            }
            return !!data.oldPassword;
        },
        {
            message: "Введите пароль",
            path: ["oldPassword"],
        },
    )
    .refine((value) => value.password === value.passwordConfirmation, {
        message: "Пароли не совпадают",
        path: ["passwordConfirmation"],
    });
