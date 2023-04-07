import { z } from "zod";
import { MRT_SortingState } from "mantine-react-table";
import { $pagination } from "@shared/types";

const $user = z.object({
    email: z.string(),
    fullName: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    roleName: z.string(),
});

const $usersResponse = z.object({
    data: z.array($user),
    meta: z.object({
        pagination: $pagination,
    }),
});

const $userDetailResponse = z.object({
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

const $userCreate = z.object({
    email: z.string({ required_error: "Это обязательное поле" }),
    password: z.string({ required_error: "Это обязательное поле" }),
    passwordConfirmation: z.string({ required_error: "Это обязательное поле" }),
    firstName: z.string({ required_error: "Это обязательное поле" }),
    lastName: z.string({ required_error: "Это обязательное поле" }),
    patronymic: z.string({ required_error: "Это обязательное поле" }),
    description: z.string().optional(),
    isActive: z.boolean(),
    roleId: z.string(),
    avatarId: z.number().nullable(),
    additionalImageId: z.number().nullable(),
});

const $userCreateResponse = z.object({
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

const $role = z.object({
    id: z.number(),
    name: z.string(),
    displayName: z.string(),
});

const $usersAdministratorsFilters = z.object({
    data: z.object({
        roles: z.array($role),
    }),
});

const $usersAdministratorsCreateOptions = z.object({
    roles: z.array($role),
});

type UserDetailResponse = z.infer<typeof $userDetailResponse>;
interface UsersRequestParamsType {
    sorting?: MRT_SortingState;
    perPage: number;
    page: number;
    query?: string;
    filters?: {
        isActive?: "0" | "1";
        roleName?: string;
    };
}

type UserDetailResponseType = z.infer<typeof $userDetailResponse>;

type UsersResponseType = z.infer<typeof $usersResponse>;
type TUser = z.infer<typeof $user>;
type UserCreateRequest = z.infer<typeof $userCreate>;
type UserCreateResponse = z.infer<typeof $userCreateResponse>;
type UsersAdministratorsFiltersResponse = z.infer<typeof $usersAdministratorsFilters>;
type UsersAdministratorsCreateOptionsResponse = z.infer<typeof $usersAdministratorsCreateOptions>;

export {
    $usersResponse,
    $userDetailResponse,
    $userCreate,
    $userCreateResponse,
    $usersAdministratorsCreateOptions,
    $usersAdministratorsFilters,
};

export type {
    UsersResponseType,
    TUser,
    UserDetailResponse,
    UsersRequestParamsType,
    UserCreateResponse,
    UserCreateRequest,
    UserDetailResponseType,
    UsersAdministratorsFiltersResponse,
    UsersAdministratorsCreateOptionsResponse,
};
