import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";
import { $UploadedFile, $getPaginationResponseType, $profile, $role, TRequestFilterParams } from "@shared/types";

export type TUser = z.infer<typeof $user>;

export type UsersFilters = z.infer<typeof $usersFilters>;

export type UsersRequestParamsType = TRequestFilterParams<UsersFilters>;
export type UserDetailResponseType = z.infer<typeof $userDetailResponse>;
export type UserDetailResponse = z.infer<typeof $userDetailResponse>;
export type UsersResponseType = z.infer<typeof $usersResponse>;
export type UserCreateResponse = z.infer<typeof $userCreateResponse>;
export type UsersAdministratorsFiltersResponse = z.infer<typeof $usersAdministratorsFilters>;
export type GetAdminStudentsFiltersResponse = z.infer<typeof $getAdminStudentsFiltersResponse>;
export type UpdateUserRequest = z.infer<typeof $updateUserRequest>;
export type CreateUserRequest = z.infer<typeof $createUserRequest>;
export type UpdateActivityStatusUserRequest = z.infer<typeof $UpdateActivityStatusUserRequest>;
export type ChangeUserPasswordRequest = z.infer<typeof $changeUserPasswordRequest>;

export const $user = z.object({
    email: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    isStatic: z.boolean(),
    profile: $profile,
    roles: z.array($role),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $usersResponse = $getPaginationResponseType($user);

export const $userDetailResponse = $user;

export const $createUserRequest = z
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

export const $userCreateResponse = $user;

export const $updateUserRequest = z.object({
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

export const $usersAdministratorsFilters = z.object({
    roles: z.array($role),
});

export const $getAdminStudentsFiltersResponse = z.object({
    roles: z.array($role),
});

export const $usersFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    roleName: z.string(),
});

export const $changeUserPasswordRequest = z.object({
    id: z.number().nullish(),
    oldPassword: z.string().optional(),
    password: z.string(),
    passwordConfirmation: z.string(),
});
