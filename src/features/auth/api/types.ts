import { z } from "zod";
import { REGEXP_PASSWORD } from "@features/utils";

export const $authFormValidationSchema = z.object({
    login: z.string({ required_error: "Введите email" }),
    password: z.string({ required_error: "Введите пароль" }),
});

export const $signUpFormValidationSchema = z.object({
    username: z.string({ required_error: "Введите имя" }),
    email: z.string({ required_error: "Введите email" }).email({ message: "Неверный формат" }),
    passwords: z
        .object({
            password: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
            confirmPassword: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        })
        .refine((passwords) => passwords.password === passwords.confirmPassword, {
            message: "Пароли не совпадают",
            path: ["confirmPassword"],
        }),
    agreementWithConditionsAndTerms: z.boolean({ required_error: "Примите пользовательское соглашение" }),
});

export const $forgotPasswordFormValidationSchema = z.object({
    email: z.string({ required_error: "Введите email" }).email({ message: "Неверный формат" }),
});

export const $recoveryPasswordFormValidationSchema = z
    .object({
        password: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        confirmPassword: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
    })
    .refine((value) => value.password === value.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
    });

export type AuthData = z.infer<typeof $authFormValidationSchema>;
export type SignUpFormData = z.infer<typeof $signUpFormValidationSchema>;
export type ForgotPasswordFormData = z.infer<typeof $forgotPasswordFormValidationSchema>;
export type RecoveryPasswordFormData = z.infer<typeof $recoveryPasswordFormValidationSchema>;
