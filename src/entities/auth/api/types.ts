import { z } from "zod";
import { $UploadedFile, $Profile, $Role, $UserNotifications } from "@shared/types";
import { defaultPhoneLength } from "@shared/ui";
import { Roles } from "@app/routes";

export type User = z.infer<typeof $User>;

export type UpdateMeForm = z.infer<typeof $UpdateMeForm>;
export type UpdateMeRequest = z.infer<typeof $UpdateMeRequest>;
export type UpdateMeResponse = z.infer<typeof $UpdateMeResponse>;
export type ChangePasswordRequest = z.infer<typeof $ChangePasswordRequest>;
export type ChangePasswordResponse = z.infer<typeof $ChangePasswordResponse>;
export type SignUpRequest = z.infer<typeof $SignUpRequest>;
export type SignUpResponse = z.infer<typeof $SignUpResponse>;
export type AuthenticateResponse = z.infer<typeof $AuthenticateResponse>;
export type ResetPasswordRequest = z.infer<typeof $ResetPasswordRequest>;
export type ResetPasswordResponse = z.infer<typeof $ResetPasswordResponse>;
export type RecoveryPasswordRequest = z.infer<typeof $RecoveryPasswordRequest>;
export type RecoveryPasswordResponse = z.infer<typeof $RecoveryPasswordResponse>;

export const $User = z.object({
    id: z.number(),
    email: z.string(),
    profile: $Profile,
    roles: z.array($Role),
    notifications: $UserNotifications,
    phone: z.string().nullish()
});

export const $ChangePasswordRequest = z.object({
    oldPassword: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
});

export const $ChangePasswordResponse = z.null();

export const $RecoveryPasswordRequest = z.object({
    email: z.string({ required_error: "Введите email" }).email({ message: "Неверный формат" }),
});

export const $RecoveryPasswordResponse = z.null();

export const $ResetPasswordRequest = z.object({
    password: z.string(),
    passwordConfirmation: z.string(),
    token: z.string(),
    email: z.string(),
});

export const $ResetPasswordResponse = z.null();

export const $UpdateMeForm = z.object({
    firstName: z.string({ required_error: "Введите имя" }).max(32, "Должно быть не более 32 символов"),
    lastName: z.string({ required_error: "Введите фамилию" }).max(32, "Должно быть не более 32 символов"),
    patronymic: z.string().max(32, "Должно быть не более 32 символов").optional(),
    phone: z.string().optional(),
    email: z.string({ required_error: "Введите email" }),
    avatar: $UploadedFile.nullable().optional(),
    roleId: z.number(),
})
    .refine(
        (data) => {
            if (data.roleId !== Roles.student && data.roleId !== Roles.employee) {
                return true;
            }
            return !!data.phone
        },
        {
            message: "Введите телефон",
            path: ["phone"],
        },
    )
    .refine(
        (data) => {
            if (data.roleId !== Roles.student && data.roleId !== Roles.employee) {
                return true;
            }
            return data.phone && data.phone.length === defaultPhoneLength
        },
        {
            message: `Должно быть ${defaultPhoneLength} цифр`,
            path: ["phone"],
        },
    )

export const $UpdateMeRequest = z.object({
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().optional(),
    phone: z.string().optional(),
    email: z.string(),
}).extend({
    avatarId: z.number().optional(),
});

export const $UpdateMeResponse = $User.omit({ roles: true, notifications: true });

export const $SignUpRequest = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
});

export const $SignUpResponse = z.object({
    data: z.object({
        tokenType: z.string(),
        expiresIn: z.number(),
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    meta: z.object({
        user: $User.omit({ notifications: true, phone: true }),
    }),
});

export const $AuthenticateResponse = z.object({
    data: z.object({
        tokenType: z.string(),
        expiresIn: z.number(),
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    meta: z.object({
        user: $User.omit({ notifications: true, phone: true }),
    }),
});
