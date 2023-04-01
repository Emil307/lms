import { z } from "zod";
import { MRT_SortingState } from "mantine-react-table";
import { $paginationResponse } from "@shared/types";

const $user = z.object({
    email: z.string(),
    fullName: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    roleName: z.string(),
});

const $usersResponse = z.object({
    data: z.array($user),
    meta: $paginationResponse,
});

const $userDetailResponse = z.object({
    description: z.string(),
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
});

const $userCreate = z.object({
    email: z.string({ required_error: "Это обязательное поле" }),
    password: z.string({ required_error: "Это обязательное поле" }),
    passwordConfirmation: z.string({ required_error: "Это обязательное поле" }),
    firstName: z.string({ required_error: "Это обязательное поле" }),
    lastName: z.string({ required_error: "Это обязательное поле" }),
    patronymic: z.string({ required_error: "Это обязательное поле" }),
    description: z.string(),
    isActive: z.boolean(),
});

const $userCreateResponse = z.object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string(),
    description: z.string(),
    roleName: z.string().optional(),
    roleId: z.number().optional(),
    isActive: z.boolean(),
    isStatic: z.boolean().optional(),
    notifications: z.array(z.string()).optional(),
    loginIn: z.string(),
    updatedAt: z.string(),
});

type UserDetailResponse = z.infer<typeof $userDetailResponse>;
interface UsersRequestParamsType {
    sorting?: MRT_SortingState;
    perPage: number;
    page: number;
    query?: string;
    filters?: {
        isActive?: "0" | "1";
    };
}

type UserDetailResponseType = z.infer<typeof $userDetailResponse>;

type UsersResponseType = z.infer<typeof $usersResponse>;
type TUser = z.infer<typeof $user>;

type UserCreateRequest = z.infer<typeof $userCreate>;

type UserCreateResponse = z.infer<typeof $userCreateResponse>;

export { $usersResponse, $userDetailResponse, $userCreate, $userCreateResponse };

export type {
    UsersResponseType,
    TUser,
    UserDetailResponse,
    UsersRequestParamsType,
    UserCreateResponse,
    UserCreateRequest,
    UserDetailResponseType,
};
