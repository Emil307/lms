import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";
import {
    $Role,
    $getPaginationResponseType,
    $Profile,
    TRequestFilterParams,
    $getFiltersRequestType,
    $LastUpdated,
    $UserNotifications,
    $getMultiValueObjectType,
} from "@shared/types";

export type TUser = z.infer<typeof $User>;
export type UserFromList = z.infer<typeof $UserFromList>;

export type UsersFilters = z.infer<typeof $UsersFilters>;

export type UsersRequestParamsType = TRequestFilterParams<UsersFilters>;
export type UserDetailResponse = z.infer<typeof $UserDetailResponse>;
export type GetUsersResponse = z.infer<typeof $GetUsersResponse>;
export type CreateUserResponse = z.infer<typeof $CreateUserResponse>;
export type GetUsersAdminFiltersResponse = z.infer<typeof $GetUsersAdminFiltersResponse>;
export type GetAdminStudentsFiltersResponse = z.infer<typeof $GetAdminStudentsFiltersResponse>;
export type UpdateAdminUserRequest = z.infer<typeof $UpdateAdminUserRequest>;
export type UpdateAdminUserResponse = z.infer<typeof $UpdateAdminUserResponse>;
export type CreateUserRequest = z.infer<typeof $CreateUserRequest>;
export type UpdateUserActivityRequest = z.infer<typeof $UpdateUserActivityRequest>;
export type UpdateUserActivityResponse = z.infer<typeof $UpdateUserActivityResponse>;
export type UpdateUserStaticRequest = z.infer<typeof $UpdateUserStaticRequest>;
export type UpdateUserStaticResponse = z.infer<typeof $UpdateUserStaticResponse>;
export type ChangeUserPasswordRequest = z.infer<typeof $ChangeUserPasswordRequest>;
export type ChangeUserPasswordResponse = z.infer<typeof $ChangeUserPasswordResponse>;
export type DeleteUserRequest = z.infer<typeof $DeleteUserRequest>;
export type DeleteUserResponse = z.infer<typeof $DeleteUserResponse>;

//students
export type AdminStudentsFiltersForm = z.infer<typeof $AdminStudentsFiltersForm>;

//req/resp
export type GetAdminStudentsRequest = z.infer<typeof $GetAdminStudentsRequest>;
export type GetAdminStudentsResponse = z.infer<typeof $GetAdminStudentsResponse>;

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
    isActive: z.boolean().optional(),
    isStatic: z.boolean(),
    profile: $Profile,
    roles: z.array($Role),
    notifications: $UserNotifications,
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});

export const $UserFromList = $User.omit({
    notifications: true,
});

export const $GetUsersResponse = $getPaginationResponseType($UserFromList);

export const $UserDetailResponse = $User.extend({
    description: z.string().optional(),
    lastLoginAt: z.coerce.date().nullable(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $CreateUserRequest = z.object({
    email: z.string().email(),
    password: z.string().regex(REGEXP_PASSWORD, "Неверный формат"),
    passwordConfirmation: z.string().regex(REGEXP_PASSWORD, "Неверный формат"),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean(),
    roleId: z.number(),
    // avatar: $UploadedFile.nullable(),
    // additionalImage: $UploadedFile.nullable(),
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
});

export const $CreateUserResponse = $User;

export const $UpdateAdminUserRequest = z.object({
    id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().optional(),
    isActive: z.boolean(),
    roleId: z.string(),
    description: z.string().optional(),
    // avatar: $UploadedFile.nullable(),
    // additionalImage: $UploadedFile.nullable(),
    avatarId: z.number().optional(),
    additionalImageId: z.number().optional(),
});

export const $UpdateAdminUserResponse = $UserDetailResponse;

export const $UpdateUserActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateUserActivityResponse = z.object({
    isActive: z.boolean(),
});

export const $UpdateUserStaticRequest = z.object({
    id: z.string(),
    isStatic: z.boolean(),
});

export const $UpdateUserStaticResponse = z.object({
    isStatic: z.boolean(),
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

export const $ChangeUserPasswordResponse = z.null();

export const $DeleteUserRequest = z.object({
    id: z.string(),
});

export const $DeleteUserResponse = z.null();

//static users

export const $StaticUser = $User
    .pick({
        id: true,
        email: true,
        profile: true,
    })
    .extend({
        coursesCount: z.number(),
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

//students

export const $AdminStudentsFiltersForm = z.object({
    query: z.string(),
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    roleName: z.string(),
});

export const $AdminStudentsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            studentCourseIds: z.number(),
            studentGroupIds: $getMultiValueObjectType(z.string(), z.literal("not")),
            isActive: z.boolean(),
            roleName: z.string(),
        })
        .partial(),
});

export const $GetAdminStudentsRequest = $getFiltersRequestType($AdminStudentsRequest);

export const $GetAdminStudentsResponse = $GetUsersResponse;
