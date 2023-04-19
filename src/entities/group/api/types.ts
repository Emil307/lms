import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type Group = z.infer<typeof $group>;
export type ScheduleLine = z.infer<typeof $scheduleLine>;

export type GroupsListFilters = z.infer<typeof $groupListFilters>;
export type GroupSchedulesFilters = z.infer<typeof $groupSchedulesFilters>;

export type GetAdminGroupsRequest = TRequestFilterParams<GroupsListFilters>;
export type CreateGroupRequest = z.infer<typeof $createGroupRequest>;
export type UpdateGroupRequest = z.infer<typeof $updateGroupRequest>;
export type GetAdminGroupsResponse = z.infer<typeof $getAdminGroupsResponse>;
export type GetAdminGroupResponse = z.infer<typeof $getAdminGroupResponse>;
export type GetGroupSchedulesRequest = TRequestFilterParams<GroupSchedulesFilters>;
export type GetGroupSchedulesResponse = z.infer<typeof $getGroupSchedulesResponse>;
export type AddScheduleToGroupRequest = z.infer<typeof $addScheduleToGroupRequest>;
export type RemoveScheduleFromGroupRequest = z.infer<typeof $removeScheduleFromGroupRequest>;
export type UpdateScheduleFromGroupRequest = z.infer<typeof $updateScheduleFromGroupRequest>;

export const $group = z.object({
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

export const $scheduleLine = z.object({
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

export const $createGroupRequest = z.object({
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

export const $updateGroupRequest = z.object({
    id: z.number(),
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

export const $getAdminGroupsResponse = $getPaginationResponseType($group);

export const $getAdminGroupResponse = $group.extend({
    teacherId: z.number().nullable(),
});

export const $groupListFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
});

export const $groupSchedulesFilters = z.object({
    groupId: z.string(),
});

export const $getGroupSchedulesResponse = $getPaginationResponseType($scheduleLine);

export const $addScheduleToGroupRequest = z.object({
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

export const $removeScheduleFromGroupRequest = z.object({
    scheduleId: z.number(),
});

export const $updateScheduleFromGroupRequest = z.object({
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
