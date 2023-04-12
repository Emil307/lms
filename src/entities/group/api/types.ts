import { z } from "zod";
import { MRT_SortingState } from "mantine-react-table";
import { $pagination } from "@shared/types";

export type Group = z.infer<typeof $group>;
export type ScheduleLine = z.infer<typeof $scheduleLine>;

export interface GetAdminGroupsRequest {
    sorting?: MRT_SortingState;
    perPage: number;
    page: number;
    query?: string;
    filters?: {
        isActive?: "0" | "1";
    };
}
export type CreateGroupRequest = z.infer<typeof $createGroupRequest>;
export type UpdateGroupRequest = z.infer<typeof $updateGroupRequest>;
export type GetAdminGroupsResponse = z.infer<typeof $getAdminGroupsResponse>;
export type GetAdminGroupResponse = z.infer<typeof $getAdminGroupResponse>;
export type GroupSchedulesFilters = z.infer<typeof $groupSchedulesFilters>;
export type GetGroupSchedulesResponse = z.infer<typeof $getGroupSchedulesResponse>;
export type AddScheduleToGroupRequest = z.infer<typeof $addScheduleToGroupRequest>;
export type RemoveScheduleFromGroupRequest = z.infer<typeof $removeScheduleFromGroupRequest>;
export type UpdateScheduleFromGroupRequest = z.infer<typeof $updateScheduleFromGroupRequest>;

export const $group = z.object({
    id: z.number(),
    name: z.string(),
    courseName: z.string(),
    createdAt: z.string().datetime(),
    students: z.number(),
    education: z.object({
        from: z.string().datetime(),
        to: z.string().datetime(),
    }),
    teacherFullName: z.string(),
    status: z.string().nullable(),
    isActive: z.boolean(),
});

export const $scheduleLine = z.object({
    id: z.number(),
    date: z.string().datetime(),
    timings: z.object({
        data: z.array(
            z.object({
                from: z.string().datetime(),
                to: z.string().datetime(),
            })
        ),
    }),
});

export const $createGroupRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    courseName: z.string({ required_error: "Выберите курс" }).nullish(),
    educationFrom: z
        .string()
        .datetime({ offset: true })
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите даты",
        }),
    educationTo: z.string().datetime({ offset: true }).nullable(),

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
    educationFrom: z
        .string()
        .datetime({ offset: true })
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите даты",
        }),
    educationTo: z.string().datetime({ offset: true }).nullable(),

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

export const $getAdminGroupsResponse = z.object({
    data: z.array($group),
    meta: z.object({
        pagination: $pagination,
    }),
});

export const $getAdminGroupResponse = z.object({
    data: $group.extend({
        teacherId: z.number().nullable(),
    }),
});

export const $groupSchedulesFilters = z.object({
    groupId: z.string(),
    page: z.number().optional(),
    perPage: z.number().optional(),
});

export const $getGroupSchedulesResponse = z.object({
    data: z.array($scheduleLine),
    meta: z.object({
        pagination: $pagination,
    }),
});

export const $addScheduleToGroupRequest = z.object({
    scheduleDate: z
        .date()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите датy",
        }),
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
    scheduleDate: z
        .date()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите датy",
        }),
    oldTimings: z.array(
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
    newTimings: z.array(
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
