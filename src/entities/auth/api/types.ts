import { z } from "zod";
import { $UploadedFile, $profile, $role } from "@shared/types";
import { $UserNotifications } from "@entities/notification";

export interface ChangePasswordRequest {
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
}

export type User = z.infer<typeof $User>;

export type UpdateMeRequest = z.infer<typeof $UpdateMeRequest>;
export type UpdateMeResponse = z.infer<typeof $UpdateMeResponse>;
export type SignUpRequest = z.infer<typeof $SignUpRequest>;
export type SignUpResponse = z.infer<typeof $SignUpResponse>;
export type AuthenticateResponse = z.infer<typeof $AuthenticateResponse>;
export type ResetPasswordRequest = z.infer<typeof $ResetPasswordRequest>;
export type RecoveryPasswordRequest = z.infer<typeof $RecoveryPasswordRequest>;

export const $User = z.object({
    id: z.number(),
    email: z.string(),
    profile: $profile,
    roles: z.array($role),
    notifications: $UserNotifications,
});

export const $RecoveryPasswordRequest = z.object({
    email: z.string({ required_error: "Введите email" }).email({ message: "Неверный формат" }),
});

export const $ResetPasswordRequest = z.object({
    password: z.string(),
    passwordConfirmation: z.string(),
    token: z.string(),
    email: z.string(),
});

export const $UpdateMeRequest = z.object({
    firstName: z.string({ required_error: "Введите имя" }),
    lastName: z.string({ required_error: "Введите фамилию" }),
    patronymic: z.string().optional(),
    email: z.string({ required_error: "Введите email" }),
    avatar: $UploadedFile.nullable().optional(),
    role: z.string(),
});

export const $UpdateMeResponse = $User.omit({ roles: true, notifications: true });

export const $SignUpRequest = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
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
        user: $User.omit({ notifications: true }),
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
        user: $User.omit({ notifications: true }),
    }),
});
