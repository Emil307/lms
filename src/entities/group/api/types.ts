import { z } from "zod";
import {
    $FilterType,
    $getDateObjectType,
    $getFiltersRequestType,
    $getPaginationResponseType,
    $LastUpdated,
    $Profile,
    $UploadedFile,
} from "@shared/types";
import { $User } from "@entities/user";
import { $AdminCourse, $CourseType } from "@entities/course";

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
export type AdminGroupSchedulesInfo = z.infer<typeof $AdminGroupSchedulesInfo>;
export type GetAdminGroupSchedulesInfoRequest = z.infer<typeof $GetAdminGroupSchedulesInfoRequest>;
export type GetAdminGroupSchedulesInfoResponse = z.infer<typeof $GetAdminGroupSchedulesInfoResponse>;
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
export type Group = z.infer<typeof $Group>;
export type GroupFromList = z.infer<typeof $GroupFromList>;
export type GroupsCount = z.infer<typeof $GroupsCount>;
export type GroupStatus = z.infer<typeof $GroupStatus>;
export type GroupStatusName = z.infer<typeof $GroupStatusName>;
export type GroupAuthor = z.infer<typeof $GroupAuthor>;
export type GroupTag = z.infer<typeof $GroupTag>;
export type GroupCategory = z.infer<typeof $GroupCategory>;
//group module
export type GroupModule = z.infer<typeof $GroupModule>;
export type GroupModuleFromList = z.infer<typeof $GroupModuleFromList>;
export type GroupModuleLesson = z.infer<typeof $GroupModuleLesson>;
export type GroupModuleLessonStatus = z.infer<typeof $GroupModuleLessonStatus>;
export type GroupModuleLessonStatusName = z.infer<typeof $GroupModuleLessonStatusName>;

//REQ/RESP
export type GetGroupsRequest = z.infer<typeof $GetGroupsRequest>;
export type GetGroupsResponse = z.infer<typeof $GetGroupsResponse>;
export type GetGroupRequest = z.infer<typeof $GetGroupRequest>;
export type GetGroupResponse = z.infer<typeof $GetGroupResponse>;
export type GetGroupsCountsResponse = z.infer<typeof $GetGroupsCountsResponse>;
//group module
export type GetGroupModulesRequest = z.infer<typeof $GetGroupModulesRequest>;
export type GetGroupModulesResponse = z.infer<typeof $GetGroupModulesResponse>;

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

export const $AdminGroupSchedulesInfo = z.object({
    id: z.number(),
    name: z.string(),
    educationStartDate: z.coerce.date(),
    educationFinishDate: z.coerce.date(),
    course: z.object({
        id: z.number(),
        name: z.string(),
    }),
    schedules: z.array($AdminGroupSchedule),
});

export const $GetAdminGroupSchedulesInfoRequest = $getFiltersRequestType(z.object({}));

export const $GetAdminGroupSchedulesInfoResponse = $getPaginationResponseType($AdminGroupSchedulesInfo);

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
            .optional()
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
            .optional()
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

export const $GroupStatusName = z
    .literal("inProgress")
    .or(z.literal("notStarted"))
    .or(z.literal("completed"))
    .or(z.literal("archive"))
    .or(z.literal("all"));

export const $GroupTag = z.object({
    id: z.number(),
    name: z.string(),
});

export const $GroupCategory = $GroupTag;

export const $GroupStatus = z.object({
    name: $GroupStatusName,
    displayName: z.string(),
});

//TODO: Заменить из апи авторов
export const $GroupAuthor = z.object({
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().nullable(),
    description: z.string().nullable(),
    avatar: $UploadedFile.nullable(),
});

export const $GroupsCount = z.object({
    name: z.string(),
    displayName: z.string(),
    count: z.number(),
});

export const $Group = z.object({
    groupId: z.number(),
    courseId: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    type: $CourseType,
    availableTo: z.coerce.date().nullable(),
    status: $GroupStatus,
    nextLesson: z.number().nullable(),
    prevLesson: z.number().nullable(),
    lessonsCount: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    practiceCount: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    cover: $UploadedFile,
    category: $GroupCategory.nullable(),
    tags: $GroupTag.array(),
    authors: $GroupAuthor.array(),
    rating: z.object({
        reviewsCount: z.number(),
        averageRating: z.number(),
    }),
});

export const $GroupFromList = $Group.pick({
    groupId: true,
    courseId: true,
    name: true,
    availableTo: true,
    status: true,
    prevLesson: true,
    lessonsCount: true,
    practiceCount: true,
    cover: true,
});

export const $GetGroupsResponse = $getPaginationResponseType($GroupFromList);

export const $GroupsRequest = z.object({
    filter: z
        .object({
            status: z.string(),
        })
        .partial(),
});

export const $GetGroupsRequest = $getFiltersRequestType($GroupsRequest);

export const $GetGroupRequest = z.object({
    id: z.string(),
});

export const $GetGroupResponse = $Group;

export const $GetGroupsCountsResponse = $GroupsCount.array();

//group modules

export const $GroupModuleLessonStatusName = z
    .literal("blocked")
    .or(z.literal("inProgress"))
    .or(z.literal("onReview"))
    .or(z.literal("completed"));

export const $GroupModuleLessonStatus = z.object({
    name: $GroupModuleLessonStatusName,
    displayName: z.string(),
});

export const $GroupModuleLesson = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    hasTest: z.boolean(),
    hasHomework: z.boolean(),
    lessonStatus: $GroupModuleLessonStatus,
    videos: $UploadedFile.array(),
    files: $UploadedFile.array(),
});

export const $GroupModule = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    lessons: $GroupModuleLesson.array(),
});

export const $GroupModuleFromList = $GroupModule;

export const $GetGroupModulesResponse = $getPaginationResponseType($GroupModuleFromList);

export const $GroupModulesRequest = z.object({
    groupId: z.string(),
});

export const $GetGroupModulesRequest = $getFiltersRequestType($GroupModulesRequest);
