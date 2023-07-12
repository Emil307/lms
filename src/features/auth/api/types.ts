import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";

export type AuthFormValidationSchema = z.infer<typeof $AuthFormValidationSchema>;
export type SignUpFormValidationSchema = z.infer<typeof $SignUpFormValidationSchema>;
export type RecoveryPasswordFormData = z.infer<typeof $RecoveryPasswordFormValidationSchema>;
export type ChangePasswordFormData = z.infer<typeof $ChangePasswordFormValidationSchema>;

export const $AuthFormValidationSchema = z.object({
    email: z.string({ required_error: "Введите email" }).email({ message: "Неверный формат" }),
    // TODO: вернуть как у всех тестовых учеток будут валидные пароли
    password: z.string({ required_error: "Введите пароль" }), //.regex(REGEXP_PASSWORD, "Неверный формат"),
});

export const $SignUpFormValidationSchema = z.object({
    firstName: z.string({ required_error: "Введите имя" }),
    lastName: z.string({ required_error: "Введите фамилию" }),
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

export const $RecoveryPasswordFormValidationSchema = z
    .object({
        password: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        passwordConfirmation: z.string({ required_error: "Введите пароль" }).regex(REGEXP_PASSWORD, "Неверный формат"),
    })
    .refine((value) => value.password === value.passwordConfirmation, {
        message: "Пароли не совпадают",
        path: ["passwordConfirmation"],
    });

export const $ChangePasswordFormValidationSchema = z.object({
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
