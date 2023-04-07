import { z } from "zod";
import { $uploadedFile } from "@shared/ui";

export interface ChangePasswordRequest {
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
}

export type GetMeResponse = z.infer<typeof $getMeResponse>;
export type UpdateMeRequest = z.infer<typeof $updateMeRequest>;
export type UpdateMeResponse = z.infer<typeof $updateMeResponse>;

export const $getMeResponse = z.object({
    id: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    isStatic: z.boolean(),
    profile: z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        patronymic: z.string(),
        avatar: $uploadedFile.nullable(),
        description: z.string().nullable(),
    }),
    role: z.object({
        id: z.number(),
        name: z.string(),
        displayName: z.string(),
    }),
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
