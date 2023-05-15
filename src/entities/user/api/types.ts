import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";
import { $UploadedFile, $getPaginationResponseType, $profile, $role, TRequestFilterParams } from "@shared/types";

export type TUser = z.infer<typeof $User>;

export type UsersFilters = z.infer<typeof $UsersFilters>;

export type UsersRequestParamsType = TRequestFilterParams<UsersFilters>;
export type UserDetailResponse = z.infer<typeof $UserDetailResponse>;
export type GetUsersResponse = z.infer<typeof $GetUsersResponse>;
export type UserCreateResponse = z.infer<typeof $UserCreateResponse>;
export type GetUsersAdminFiltersResponse = z.infer<typeof $GetUsersAdminFiltersResponse>;
export type GetAdminStudentsFiltersResponse = z.infer<typeof $GetAdminStudentsFiltersResponse>;
export type UpdateUserRequest = z.infer<typeof $UpdateUserRequest>;
export type CreateUserRequest = z.infer<typeof $CreateUserRequest>;
export type UpdateActivityStatusUserRequest = z.infer<typeof $UpdateActivityStatusUserRequest>;
export type ChangeUserPasswordRequest = z.infer<typeof $ChangeUserPasswordRequest>;

export const $User = z.object({
    email: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    isStatic: z.boolean(),
    profile: $profile,
    roles: z.array($role),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $GetUsersResponse = $getPaginationResponseType($User);

export const $UserDetailResponse = $User.extend({
    lastLoginAt: z.coerce.date().nullable(),
});

export const $CreateUserRequest = z
    .object({
        email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
        password: z.string({ required_error: "Это обязательное поле" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        passwordConfirmation: z.string({ required_error: "Это обязательное поле" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        firstName: z.string({ required_error: "Это обязательное поле" }),
        lastName: z.string({ required_error: "Это обязательное поле" }),
        patronymic: z.string().optional(),
        description: z.string().optional(),
        isActive: z.boolean(),
        roleId: z.string(),
        avatar: $UploadedFile.nullable(),
        additionalImage: $UploadedFile.nullable(),
        avatarId: z.number().optional(),
        additionalImageId: z.number().optional(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Пароли должны совпадать",
        path: ["passwordConfirmation"],
    });

export const $UserCreateResponse = $User;

export const $UpdateUserRequest = z.object({
    email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
    firstName: z.string({ required_error: "Это обязательное поле" }),
    lastName: z.string({ required_error: "Это обязательное поле" }),
    patronymic: z.string().optional(),
    isActive: z.boolean(),
    roleId: z.string(),
    avatar: $UploadedFile.nullable(),
    additionalImage: $UploadedFile.nullable(),
    avatarId: z.number().optional(),
    additionalImageId: z.number().optional(),
});

export const $UpdateActivityStatusUserRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $GetUsersAdminFiltersResponse = z.object({
    roles: z.array($role),
});

export const $GetAdminStudentsFiltersResponse = z.object({
    roles: z.array($role),
});

export const $UsersFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    roleName: z.string(),
});

export const $ChangeUserPasswordRequest = z.object({
    id: z.number().nullish(),
    oldPassword: z.string().optional(),
    password: z.string(),
    passwordConfirmation: z.string(),
});
