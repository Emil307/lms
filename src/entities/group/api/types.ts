import { z } from "zod";
import { $FilterType, $getDateObjectType, $getFiltersRequestType, $getPaginationResponseType, $LastUpdated, $Profile } from "@shared/types";
import { $User } from "@entities/user";
import { $AdminCourse } from "@entities/course";

/**
 *
 * ADMIN TYPES
 *
 */
export type AdminGroup = z.infer<typeof $AdminGroup>;
export type AdminGroupFromList = z.infer<typeof $AdminGroupFromList>;
export type AdminGroupTeacher = z.infer<typeof $AdminGroupTeacher>;
export type AdminGroupTeacherFromList = z.infer<typeof $AdminGroupTeacherFromList>;
export type AdminGroupCourse = z.infer<typeof $AdminGroupCourse>;
export type AdminGroupStatus = z.infer<typeof $AdminGroupStatus>;
export type AdminGroupStatusType = z.infer<typeof $AdminGroupStatusType>;
//participants (students)
export type AdminGroupParticipant = z.infer<typeof $AdminGroupParticipant>;
export type AdminGroupParticipantFromList = z.infer<typeof $AdminGroupParticipantFromList>;
export type AdminGroupParticipantStatus = z.infer<typeof $AdminGroupParticipantStatus>;
export type AdminGroupParticipantLessonsStatistics = z.infer<typeof $AdminGroupParticipantLessonsStatistics>;
export type AdminGroupParticipantTestsStatistics = z.infer<typeof $AdminGroupParticipantTestsStatistics>;
export type AdminGroupParticipantHomeworksStatistics = z.infer<typeof $AdminGroupParticipantHomeworksStatistics>;
//schedules
export type AdminGroupSchedule = z.infer<typeof $AdminGroupSchedule>;
export type AdminGroupScheduleTiming = z.infer<typeof $AdminGroupScheduleTiming>;
export type AdminGroupScheduleFromList = z.infer<typeof $AdminGroupScheduleFromList>;

//FILTERS
export type AdminGroupsFiltersForm = z.infer<typeof $AdminGroupsFiltersForm>;
//participants (students)
export type AdminGroupParticipantsExtraFilters = z.infer<typeof $AdminGroupParticipantsExtraFilters>;
//schedules
export type AdminGroupSchedulesExtraFilters = z.infer<typeof $AdminGroupSchedulesExtraFilters>;

//REQ/RESP
export type GetAdminGroupsRequest = z.infer<typeof $GetAdminGroupsRequest>;
export type GetAdminGroupsResponse = z.infer<typeof $GetAdminGroupsResponse>;
export type GetAdminGroupFiltersRequest = z.infer<typeof $GetAdminGroupFiltersRequest>;
export type GetAdminGroupFiltersResponse = z.infer<typeof $GetAdminGroupFiltersResponse>;
export type GetAdminGroupRequest = z.infer<typeof $GetAdminGroupRequest>;
export type GetAdminGroupResponse = z.infer<typeof $GetAdminGroupResponse>;
export type CreateAdminGroupRequest = z.infer<typeof $CreateAdminGroupRequest>;
export type CreateAdminGroupResponse = z.infer<typeof $CreateAdminGroupResponse>;
export type UpdateAdminGroupRequest = z.infer<typeof $UpdateAdminGroupRequest>;
export type UpdateAdminGroupResponse = z.infer<typeof $UpdateAdminGroupResponse>;
export type UpdateGroupActivityRequest = z.infer<typeof $UpdateGroupActivityRequest>;
export type UpdateGroupActivityResponse = z.infer<typeof $UpdateGroupActivityResponse>;
export type DeleteAdminGroupRequest = z.infer<typeof $DeleteAdminGroupRequest>;
export type DeleteAdminGroupResponse = z.infer<typeof $DeleteAdminGroupResponse>;
//participants (students)
export type GetAdminGroupParticipantsRequest = z.infer<typeof $GetAdminGroupParticipantsRequest>;
export type GetAdminGroupParticipantsResponse = z.infer<typeof $GetAdminGroupParticipantsResponse>;
export type AttachParticipantsToGroupRequest = z.infer<typeof $AttachParticipantsToGroupRequest>;
export type AttachParticipantsToGroupResponse = z.infer<typeof $AttachParticipantsToGroupResponse>;
export type DeleteParticipantsFromGroupRequest = z.infer<typeof $DeleteParticipantsFromGroupRequest>;
export type DeleteParticipantsFromGroupResponse = z.infer<typeof $DeleteParticipantsFromGroupResponse>;
//schedules
export type GetAdminGroupSchedulesRequest = z.infer<typeof $GetAdminGroupSchedulesRequest>;
export type GetAdminGroupSchedulesResponse = z.infer<typeof $GetAdminGroupSchedulesResponse>;
export type CreateAdminGroupScheduleRequest = z.infer<typeof $CreateAdminGroupScheduleRequest>;
export type CreateAdminGroupScheduleResponse = z.infer<typeof $CreateAdminGroupScheduleResponse>;
export type UpdateAdminGroupScheduleRequest = z.infer<typeof $UpdateAdminGroupScheduleRequest>;
export type UpdateAdminGroupScheduleResponse = z.infer<typeof $UpdateAdminGroupScheduleResponse>;
export type DeleteAdminGroupScheduleRequest = z.infer<typeof $DeleteAdminGroupScheduleRequest>;
export type DeleteAdminGroupScheduleResponse = z.infer<typeof $DeleteAdminGroupScheduleResponse>;

/**
 *
 * USER TYPES
 *
 */

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminGroupTeacher = $User
    .pick({
        id: true,
        email: true,
        isActive: true,
    })
    .extend({
        profile: $Profile.pick({
            id: true,
            firstName: true,
            lastName: true,
            patronymic: true,
            description: true,
        }),
    });

export const $AdminGroupTeacherFromList = $AdminGroupTeacher
    .pick({
        id: true,
        isActive: true,
    })
    .extend({
        profile: $Profile.pick({
            firstName: true,
            lastName: true,
        }),
    });

export const $AdminGroupCourse = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
});
export const $AdminGroupStatusType = z.literal("notStarted").or(z.literal("inProgress")).or(z.literal("completed"));

export const $AdminGroupStatus = z.object({
    type: $AdminGroupStatusType,
    name: z.string(),
});

export const $AdminGroup = z.object({
    id: z.number(),
    name: z.string(),
    status: $AdminGroupStatus,
    educationStartDate: z.coerce.date(),
    educationFinishDate: z.coerce.date(),
    maxStudentsCount: z.number(),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    studentsCount: z.number(),
    teacher: $AdminGroupTeacher.nullable(),
    course: $AdminCourse.pick({
        id: true,
        name: true,
        description: true,
        price: true,
        discountPrice: true,
        type: true,
        isActive: true,
        isDemonstrative: true,
        isFulfillment: true,
        hasDiscount: true,
        hasAuthors: true,
        hasTeachers: true,
        createdAt: true,
        updatedAt: true,
    }),
    //TODO: беки должны добавить инфу о пользаке
    lastUpdated: $LastUpdated.pick({ date: true }).nullable(),
});

export const $AdminGroupFromList = $AdminGroup.pick({
    id: true,
    name: true,
    status: true,
    educationStartDate: true,
    educationFinishDate: true,
    maxStudentsCount: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    studentsCount: true,
    teacher: true,
    course: true,
});

export const $GetAdminGroupsResponse = $getPaginationResponseType($AdminGroupFromList);

export const $AdminGroupsFiltersForm = z.object({
    query: z.string(),
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    courseId: z.string(),
    teacherId: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
    statusType: z.string(),
});

export const $AdminGroupsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.boolean(),
            "course.id": z.string(),
            "teacher.id": z.string(),
            createdAt: $getDateObjectType(z.literal("range")),
            "status.type": z.string(),
        })
        .partial(),
});

export const $GetAdminGroupsRequest = $getFiltersRequestType($AdminGroupsRequest);

export const $GetAdminGroupFiltersRequest = z.object({
    type: $FilterType,
});

export const $GetAdminGroupFiltersResponse = z.object({
    teachers: $AdminGroupTeacherFromList.array(),
    courses: $AdminGroupCourse.array(),
    statuses: $AdminGroupStatus.array(),
});

export const $GetAdminGroupRequest = z.object({
    id: z.string(),
});

export const $GetAdminGroupResponse = $AdminGroup.omit({
    studentsCount: true,
});

export const $CreateAdminGroupRequest = z.object({
    courseId: z.number(),
    teacherId: z.number().optional(),
    name: z.string(),
    maxStudentsCount: z.number(),
    isActive: z.boolean(),
    educationStartDate: z.string().datetime(),
    educationFinishDate: z.string().datetime(),
});

export const $CreateAdminGroupResponse = $AdminGroup;

export const $UpdateAdminGroupRequest = $CreateAdminGroupRequest.extend({
    id: z.string(),
});

export const $UpdateAdminGroupResponse = $AdminGroup;

export const $UpdateGroupActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateGroupActivityResponse = z.object({
    isActive: z.boolean(),
});

export const $DeleteAdminGroupRequest = z.object({
    id: z.string(),
});

export const $DeleteAdminGroupResponse = z.null();

//participants (students)

export const $AdminGroupParticipantStatus = z.literal("inProgress").or(z.literal("completed"));

export const $AdminGroupParticipantLessonsStatistics = z.object({
    completed: z.number(),
    total: z.number(),
});
export const $AdminGroupParticipantTestsStatistics = $AdminGroupParticipantLessonsStatistics;
export const $AdminGroupParticipantHomeworksStatistics = $AdminGroupParticipantLessonsStatistics;

export const $AdminGroupParticipant = z.object({
    id: z.number(),
    lessons: $AdminGroupParticipantLessonsStatistics,
    tests: $AdminGroupParticipantTestsStatistics,
    homeworks: $AdminGroupParticipantHomeworksStatistics,
    status: $AdminGroupParticipantStatus,
    profile: $Profile.pick({
        id: true,
        firstName: true,
        lastName: true,
        patronymic: true,
        description: true,
    }),
});

export const $AdminGroupParticipantFromList = $AdminGroupParticipant;

export const $GetAdminGroupParticipantsResponse = $getPaginationResponseType($AdminGroupParticipantFromList);

export const $AdminGroupParticipantsExtraFilters = z.object({
    groupId: z.string(),
});

export const $AdminGroupParticipantsRequest = z.object({
    groupId: z.string(),
});

export const $GetAdminGroupParticipantsRequest = $getFiltersRequestType($AdminGroupParticipantsRequest);

export const $AttachParticipantsToGroupRequest = z.object({
    groupId: z.string(),
    ids: z.string().array(),
});

export const $AttachParticipantsToGroupResponse = z.null();

export const $DeleteParticipantsFromGroupRequest = z.object({
    groupId: z.string(),
    ids: z.string().array(),
});

export const $DeleteParticipantsFromGroupResponse = z.null();

//schedules

export const $AdminGroupScheduleTiming = z.object({
    id: z.number(),
    from: z.coerce.date(),
    to: z.coerce.date(),
});

export const $AdminGroupSchedule = z.object({
    id: z.number(),
    date: z.coerce.date(),
    timings: $AdminGroupScheduleTiming.array(),
});

export const $AdminGroupScheduleFromList = $AdminGroupSchedule;

export const $GetAdminGroupSchedulesResponse = $getPaginationResponseType($AdminGroupScheduleFromList);

export const $AdminGroupSchedulesExtraFilters = z.object({
    groupId: z.string(),
});

export const $AdminGroupSchedulesRequest = z.object({
    groupId: z.string(),
});

export const $GetAdminGroupSchedulesRequest = $getFiltersRequestType($AdminGroupSchedulesRequest);

export const $CreateAdminGroupScheduleRequest = z.object({
    groupId: z.string(),
    scheduleDate: z.string().datetime(),
    scheduleTimings: z.array(
        z
            .object({
                from: z.string().datetime(),
                to: z.string().datetime(),
            })
            .optional(),
    ),
});

export const $CreateAdminGroupScheduleResponse = z.null();

export const $UpdateAdminGroupScheduleRequest = z.object({
    groupId: z.string(),
    scheduleDate: z.string().datetime(),
    scheduleTimings: z.array(
        z
            .object({
                id: z.number().optional(),
                from: z.string().datetime(),
                to: z.string().datetime(),
            })
            .optional(),
    ),
    scheduleId: z.number(),
});

export const $UpdateAdminGroupScheduleResponse = z.null();

export const $DeleteAdminGroupScheduleRequest = z.object({
    groupId: z.string(),
    scheduleId: z.number(),
});

export const $DeleteAdminGroupScheduleResponse = z.null();

/**
 *
 * USER ZOD
 *
 */
