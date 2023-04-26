import { z } from "zod";
import { $uploadedFile } from "@shared/ui";

export interface ChangePasswordRequest {
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
}

export type User = z.infer<typeof $user>;
export type UpdateMeRequest = z.infer<typeof $updateMeRequest>;
export type UpdateMeResponse = z.infer<typeof $updateMeResponse>;
export type SignUpRequest = z.infer<typeof $signUpRequest>;
export type SignUpResponse = z.infer<typeof $signUpResponse>;
export type AuthenticateResponse = z.infer<typeof $authenticateResponse>;
export type ResetPasswordRequest = z.infer<typeof $resetPasswordRequest>;
export type RecoveryPasswordRequest = z.infer<typeof $recoveryPasswordRequest>;

export const $user = z.object({
    id: z.number(),
    email: z.string(),
    profile: z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string().nullable(),
        patronymic: z.string().nullable(),
        avatar: $uploadedFile.nullable(),
        description: z.string().nullable(),
    }),

    roles: z.array(z.object({ id: z.number(), name: z.string(), displayName: z.string() })),
});

export const $recoveryPasswordRequest = z.object({
    email: z.string({ required_error: "Введите email" }).email({ message: "Неверный формат" }),
});

export const $resetPasswordRequest = z.object({
    password: z.string(),
    passwordConfirmation: z.string(),
    token: z.string(),
    email: z.string(),
});

export const $updateMeRequest = z.object({
    firstName: z.string({ required_error: "Введите имя" }),
    lastName: z.string({ required_error: "Введите фамилию" }),
    patronymic: z.string().optional(),
    email: z.string({ required_error: "Введите email" }),
    avatar: $uploadedFile.nullable().optional(),
    role: z.string(),
});

export const $updateMeResponse = z.object({
    id: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    roleName: z.string(),
    profile: z.object({
        data: z.object({
            id: z.number(),
            firstName: z.string(),
            lastName: z.string(),
            patronymic: z.string(),
        }),
    }),
});

export const $signUpRequest = z.object({
    firstName: z.string(),
    email: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
});

export const $signUpResponse = z.object({
    data: z.object({
        tokenType: z.string(),
        expiresIn: z.number(),
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    meta: z.object({
        user: z.object({
            data: $user,
        }),
    }),
});

export const $authenticateResponse = z.object({
    data: z.object({
        tokenType: z.string(),
        expiresIn: z.number(),
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    meta: z.object({
        user: $user,
    }),
});
