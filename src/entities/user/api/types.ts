import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";
import {
    $Role,
    $UploadedFile,
    $getPaginationResponseType,
    $Profile,
    TRequestFilterParams,
    $getFiltersRequestType,
    $LastUpdated,
} from "@shared/types";
import { $UserNotifications } from "@entities/notification";

export type TUser = z.infer<typeof $User>;
export type UserFromList = z.infer<typeof $UserFromList>;

export type UsersFilters = z.infer<typeof $UsersFilters>;

export type UsersRequestParamsType = TRequestFilterParams<UsersFilters>;
export type UserDetailResponse = z.infer<typeof $UserDetailResponse>;
export type GetUsersResponse = z.infer<typeof $GetUsersResponse>;
export type CreateUserResponse = z.infer<typeof $CreateUserResponse>;
export type GetUsersAdminFiltersResponse = z.infer<typeof $GetUsersAdminFiltersResponse>;
export type GetAdminStudentsFiltersResponse = z.infer<typeof $GetAdminStudentsFiltersResponse>;
export type UpdateUserRequest = z.infer<typeof $UpdateUserRequest>;
export type CreateUserRequest = z.infer<typeof $CreateUserRequest>;
export type UpdateUserActivityRequest = z.infer<typeof $UpdateUserActivityRequest>;
export type ChangeUserPasswordRequest = z.infer<typeof $ChangeUserPasswordRequest>;

//static users
export type StaticUser = z.infer<typeof $StaticUser>;
export type StaticUserFromList = z.infer<typeof $StaticUserFromList>;
//filters
export type StaticUsersExtraFilters = z.infer<typeof $StaticUsersExtraFilters>;

//req/resp
export type GetStaticUsersRequest = z.infer<typeof $GetStaticUsersRequest>;
export type GetStaticUsersResponse = z.infer<typeof $GetStaticUsersResponse>;

export const $User = z.object({
    id: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    isStatic: z.boolean(),
    profile: $Profile,
    roles: z.array($Role),
    notifications: $UserNotifications,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $UserFromList = $User.omit({
    notifications: true,
});

export const $GetUsersResponse = $getPaginationResponseType($UserFromList);

export const $UserDetailResponse = $User.extend({
    lastLoginAt: z.coerce.date().nullable(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $CreateUserRequest = z
    .object({
        email: z.string().email({ message: "Неверный формат" }),
        password: z.string().regex(REGEXP_PASSWORD, "Неверный формат"),
        passwordConfirmation: z.string().regex(REGEXP_PASSWORD, "Неверный формат"),
        firstName: z.string(),
        lastName: z.string(),
        patronymic: z.string().optional(),
        description: z.string().optional(),
        isActive: z.boolean(),
        roleId: z.number(),
        avatar: $UploadedFile.nullable(),
        additionalImage: $UploadedFile.nullable(),
        avatarId: z.number().optional(),
        additionalImageId: z.number().optional(),
        notifications: z
            .object({
                newHomework: z.boolean(),
                supportMessage: z.boolean(),
                invoiceForPayment: z.boolean(),
            })
            .or(
                z.object({
                    homeworkChecked: z.boolean(),
                    groupAdded: z.boolean(),
                    supportMessage: z.boolean(),
                })
            ),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Пароли должны совпадать",
        path: ["passwordConfirmation"],
    });

export const $CreateUserResponse = $User;

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

export const $UpdateUserActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $GetUsersAdminFiltersResponse = z.object({
    roles: z.array($Role),
});

export const $GetAdminStudentsFiltersResponse = z.object({
    roles: z.array($Role),
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

//static users

export const $StaticUser = $User
    .pick({
        id: true,
        email: true,
        profile: true,
    })
    .extend({
        courseCount: z.number(),
    });

export const $StaticUserFromList = $StaticUser;

export const $StaticUsersExtraFilters = z.object({
    roleName: z.string(),
});

export const $StaticUsersRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            roleName: z.string(),
        })
        .partial(),
});

export const $GetStaticUsersRequest = $getFiltersRequestType($StaticUsersRequest);

export const $GetStaticUsersResponse = $getPaginationResponseType($StaticUserFromList);
