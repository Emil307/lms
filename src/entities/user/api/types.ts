import { z } from "zod";
import { MRT_SortingState } from "mantine-react-table";
import { $pagination } from "@shared/types";
import { REGEXP_PASSWORD } from "@features/utils";
import { $uploadedFile } from "@shared/ui";

export type TUser = z.infer<typeof $user>;

export interface UsersRequestParamsType {
    sorting?: MRT_SortingState;
    perPage: number;
    page: number;
    query?: string;
    filters?: {
        isActive?: "0" | "1";
        roleName?: string;
    };
}
export type UserDetailResponseType = z.infer<typeof $userDetailResponse>;
export type UserDetailResponse = z.infer<typeof $userDetailResponse>;
export type UsersResponseType = z.infer<typeof $usersResponse>;
export type UserCreateResponse = z.infer<typeof $userCreateResponse>;
export type UsersAdministratorsFiltersResponse = z.infer<typeof $usersAdministratorsFilters>;
export type UsersAdministratorsCreateOptionsResponse = z.infer<typeof $usersAdministratorsCreateOptions>;
export type GetAdminStudentsFiltersResponse = z.infer<typeof $getAdminStudentsFiltersResponse>;
export type UpdateUserRequest = z.infer<typeof $updateUserRequest>;
export type CreateUserRequest = z.infer<typeof $createUserRequest>;

export const $user = z.object({
    email: z.string(),
    fullName: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    roleName: z.string(),
});

export const $usersResponse = z.object({
    data: z.array($user),
    meta: z.object({
        pagination: $pagination,
    }),
});

export const $userDetailResponse = z.object({
    description: z.string().nullable(),
    email: z.string(),
    firstName: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    isStatic: z.boolean(),
    lastName: z.string(),
    loginIn: z.string(),
    notifications: z.array(z.string()).optional(),
    patronymic: z.string(),
    roleId: z.number(),
    roleName: z.string(),
    updatedAt: z.string(),
    avatarUrl: z.string().nullable(),
    additionalImageUrl: z.string().nullable(),
});

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
        avatar: $uploadedFile.nullable(),
        additionalImage: $uploadedFile.nullable(),
        avatarId: z.number().optional(),
        additionalImageId: z.number().optional(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Пароли должны совпадать",
        path: ["passwordConfirmation"],
    });

export const $userCreateResponse = z.object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string(),
    description: z.string().nullable(),
    roleName: z.string().optional(),
    roleId: z.number().optional(),
    isActive: z.boolean(),
    isStatic: z.boolean().optional(),
    notifications: z.array(z.string()).optional(),
    loginIn: z.string(),
    updatedAt: z.string(),
    additionalImageId: z.number().nullable(),
    additionalImageUrl: z.string().nullable(),
});

export const $updateUserRequest = z.object({
    email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
    firstName: z.string({ required_error: "Это обязательное поле" }),
    lastName: z.string({ required_error: "Это обязательное поле" }),
    patronymic: z.string().optional(),
    isActive: z.boolean(),
    roleId: z.string(),
    avatar: $uploadedFile.nullable(),
    additionalImage: $uploadedFile.nullable(),
    avatarId: z.number().optional(),
    additionalImageId: z.number().optional(),
});

export const $role = z.object({
    id: z.number(),
    name: z.string(),
    displayName: z.string(),
});

export const $usersAdministratorsFilters = z.object({
    roles: z.array($role),
});

export const $getAdminStudentsFiltersResponse = z.object({
    roles: z.array($role),
});

export const $usersAdministratorsCreateOptions = z.object({
    roles: z.array($role),
});
