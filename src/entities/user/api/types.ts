import { z } from "zod";

export type TUser = {
    id: number;
    fullName: string;
    email: string;
    roleName: string;
    isActive: boolean;
};

const $usersResponse = z.object({
    data: z.array(
        z.object({
            email: z.string(),
            fullName: z.string(),
            id: z.number(),
            isActive: z.boolean(),
            roleName: z.string(),
        })
    ),
    meta: z.object({
        pagination: z.object({
            count: z.number(),
            current_page: z.number(),
            links: z.object({
                next: z.string().nullish(),
                previous: z.string().nullish(),
            }),
            per_page: z.number(),
            total: z.number(),
            total_pages: z.number(),
        }),
    }),
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

type UsersResponseType = z.infer<typeof $usersResponse>;

type UserCreateRequest = z.infer<typeof $userCreate>;

type UserCreateResponse = z.infer<typeof $userCreateResponse>;

export { $usersResponse, $userDetailResponse, $userCreate, $userCreateResponse };

export type { UsersResponseType, UserDetailResponse, UserCreateRequest, UserCreateResponse };
