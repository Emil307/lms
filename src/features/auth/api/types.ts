import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";

export const $authFormValidationSchema = z.object({
    email: z.string({ required_error: "Введите email" }).email({ message: "Неверный формат" }),
    // TODO: вернуть как у всех тестовых учеток будут валидные пароли
    password: z.string({ required_error: "Введите пароль" }), //.regex(REGEXP_PASSWORD, "Неверный формат"),
});

export const $signUpFormValidationSchema = z.object({
    firstName: z.string({ required_error: "Введите имя" }),
    email: z.string({ required_error: "Введите email" }).email({ message: "Неверный формат" }),
    passwords: z
        .object({
            password: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
            passwordConfirmation: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        })
        .refine((passwords) => passwords.password === passwords.passwordConfirmation, {
            message: "Пароли не совпадают",
            path: ["passwordConfirmation"],
        }),
    agreementWithConditionsAndTerms: z.boolean().refine((val) => !!val, {
        message: "Примите пользовательское соглашение",
    }),
});

export const $recoveryPasswordFormValidationSchema = z
    .object({
        password: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        passwordConfirmation: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
    })
    .refine((value) => value.password === value.passwordConfirmation, {
        message: "Пароли не совпадают",
        path: ["passwordConfirmation"],
    });

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

export type AuthData = z.infer<typeof $authFormValidationSchema>;
export type SignUpFormData = z.infer<typeof $signUpFormValidationSchema>;
export type RecoveryPasswordFormData = z.infer<typeof $recoveryPasswordFormValidationSchema>;
export type ChangePasswordFormData = z.infer<typeof $changePasswordFormValidationSchema>;
