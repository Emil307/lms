import { z } from "zod";
import { $getFiltersRequestType, $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type Group = z.infer<typeof $Group>;
export type ScheduleLine = z.infer<typeof $ScheduleLine>;

export type GroupsListFilters = z.infer<typeof $GroupListFilters>;
export type GroupSchedulesFilters = z.infer<typeof $GroupSchedulesFilters>;

export type GetAdminGroupsRequest = z.infer<typeof $GetAdminGroupsRequest>; //TRequestFilterParams<GroupsListFilters>;
export type CreateGroupRequest = z.infer<typeof $CreateGroupRequest>;
export type UpdateGroupRequest = z.infer<typeof $UpdateGroupRequest>;
export type GetAdminGroupsResponse = z.infer<typeof $GetAdminGroupsResponse>;
export type GetAdminGroupResponse = z.infer<typeof $GetAdminGroupResponse>;
export type GetGroupSchedulesRequest = TRequestFilterParams<GroupSchedulesFilters>;
export type GetGroupSchedulesResponse = z.infer<typeof $GetGroupSchedulesResponse>;
export type AddScheduleToGroupRequest = z.infer<typeof $AddScheduleToGroupRequest>;
export type RemoveScheduleFromGroupRequest = z.infer<typeof $RemoveScheduleFromGroupRequest>;
export type UpdateScheduleFromGroupRequest = z.infer<typeof $UpdateScheduleFromGroupRequest>;

export const $Group = z.object({
    id: z.number(),
    name: z.string(),
    courseName: z.string(),
    createdAt: z.coerce.date(),
    students: z.number(),
    education: z.object({
        from: z.coerce.date(),
        to: z.coerce.date(),
    }),
    teacherFullName: z.string(),
    status: z.string().nullable(),
    isActive: z.boolean(),
});

export const $ScheduleLine = z.object({
    id: z.number(),
    date: z.coerce.date(),
    timings: z.object({
        data: z.array(
            z.object({
                id: z.number().optional(),
                from: z.coerce.date(),
                to: z.coerce.date(),
            })
        ),
    }),
});

export const $AdminGroupsRequest = z.object({
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
        })
        .partial(),
});

export const $GetAdminGroupsRequest = $getFiltersRequestType($AdminGroupsRequest);

export const $CreateGroupRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    courseName: z.string({ required_error: "Выберите курс" }).nullish(),
    educationFrom: z.coerce
        .date()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите даты",
        }),
    educationTo: z.coerce.date().nullable(),

    maxStudents: z
        .number({ required_error: "Введите количество" })
        .positive("Число должно быть положительным")
        .int("Число должно быть целым")
        .nullable()
        .refine((value) => value !== null, {
            message: "Введите количество",
        }),
    teacherId: z.number().nullish(),
    isActive: z.boolean(),
});

export const $UpdateGroupRequest = z.object({
    id: z.string(),
    name: z.string({ required_error: "Введите название" }),
    courseName: z.string({ required_error: "Выберите курс" }).nullish(),
    educationFrom: z.coerce
        .date()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите даты",
        }),
    educationTo: z.coerce.date().nullable(),

    maxStudents: z
        .number({ required_error: "Введите количество" })
        .positive("Число должно быть положительным")
        .int("Число должно быть целым")
        .nullable()
        .refine((value) => value !== null, {
            message: "Введите количество",
        }),
    teacherId: z.number().nullish(),
    isActive: z.boolean(),
});

export const $GetAdminGroupsResponse = $getPaginationResponseType($Group);

export const $GetAdminGroupResponse = $Group.extend({
    teacherId: z.number().nullable(),
});

export const $GroupListFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
});

export const $GroupSchedulesFilters = z.object({
    groupId: z.string(),
});

export const $GetGroupSchedulesResponse = $getPaginationResponseType($ScheduleLine);

export const $AddScheduleToGroupRequest = z.object({
    scheduleDate: z.string(),

    scheduleTimings: z.array(
        z
            .object({
                from: z
                    .string()
                    .datetime({ offset: true })
                    .nullable()
                    .refine((value) => value !== null, {
                        message: "Выберите время",
                    }),
                to: z.string().datetime({ offset: true }).nullable(),
            })
            .optional()
    ),
});

export const $RemoveScheduleFromGroupRequest = z.object({
    groupId: z.string().optional(),
    scheduleId: z.number(),
});

export const $UpdateScheduleFromGroupRequest = z.object({
    scheduleId: z.number(),
    scheduleDate: z.string().datetime({ offset: true }),
    scheduleTimings: z.array(
        z.object({
            id: z.number().optional(),
            from: z.string().datetime({ offset: true }),
            to: z.string().datetime({ offset: true }),
        })
    ),
});
