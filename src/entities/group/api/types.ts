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
//students
export type AdminGroupStudent = z.infer<typeof $AdminGroupStudent>;
export type AdminGroupStudentFromList = z.infer<typeof $AdminGroupStudentFromList>;
export type AdminGroupStudentStatus = z.infer<typeof $AdminGroupStudentStatus>;
export type AdminGroupStudentStatusName = z.infer<typeof $AdminGroupStudentStatusName>;
export type AdminGroupStudentStatistics = z.infer<typeof $AdminGroupStudentStatistics>;
export type AdminGroupModuleForStudentStatistics = z.infer<typeof $AdminGroupModuleForStudentStatistics>;
export type AdminGroupLessonForStudentStatistics = z.infer<typeof $AdminGroupLessonForStudentStatistics>;
export type HomeworkStatusName = z.infer<typeof $HomeworkStatusName>;
export type TestStatusName = z.infer<typeof $TestStatusName>;
export type AdminGroupStudentLessonsStatistics = z.infer<typeof $AdminGroupStudentLessonsStatistics>;
export type AdminGroupStudentTestsStatistics = z.infer<typeof $AdminGroupStudentTestsStatistics>;
export type AdminGroupStudentHomeworksStatistics = z.infer<typeof $AdminGroupStudentHomeworksStatistics>;
//schedules
export type AdminGroupSchedule = z.infer<typeof $AdminGroupSchedule>;
export type AdminGroupScheduleTiming = z.infer<typeof $AdminGroupScheduleTiming>;

//students <-> group
export type AdminStudentGroupFromList = z.infer<typeof $AdminStudentGroupFromList>;
export type AdminStudentGroupStatusType = z.infer<typeof $AdminStudentGroupStatusType>;
export type AdminStudentGroupStatus = z.infer<typeof $AdminStudentGroupStatus>;

//FILTERS
export type AdminGroupsFiltersForm = z.infer<typeof $AdminGroupsFiltersForm>;
//students
export type AdminGroupStudentsExtraFilters = z.infer<typeof $AdminGroupStudentsExtraFilters>;
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
//students
export type GetAdminGroupStudentsRequest = z.infer<typeof $GetAdminGroupStudentsRequest>;
export type GetAdminGroupStudentsResponse = z.infer<typeof $GetAdminGroupStudentsResponse>;
export type GetAdminGroupStudentStatisticsRequest = z.infer<typeof $GetAdminGroupStudentStatisticsRequest>;
export type GetAdminGroupStudentStatisticsResponse = z.infer<typeof $GetAdminGroupStudentStatisticsResponse>;
export type AttachStudentsToGroupRequest = z.infer<typeof $AttachStudentsToGroupRequest>;
export type AttachStudentsToGroupResponse = z.infer<typeof $AttachStudentsToGroupResponse>;
export type DeleteStudentsFromGroupRequest = z.infer<typeof $DeleteStudentsFromGroupRequest>;
export type DeleteStudentsFromGroupResponse = z.infer<typeof $DeleteStudentsFromGroupResponse>;



//students <-> group
export type GetAdminStudentGroupsRequest = z.infer<typeof $GetAdminStudentGroupsRequest>;
export type GetAdminStudentGroupsResponse = z.infer<typeof $GetAdminStudentGroupsResponse>;

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
/**
 * @deprecated
 */
export type GroupAuthor = z.infer<typeof $GroupAuthor>;
export type GroupTag = z.infer<typeof $GroupTag>;
export type GroupCategory = z.infer<typeof $GroupCategory>;
//group module
export type GroupModule = z.infer<typeof $GroupModule>;
export type GroupModuleFromList = z.infer<typeof $GroupModuleFromList>;
export type GroupModuleLesson = z.infer<typeof $GroupModuleLesson>;
export type LessonStatus = z.infer<typeof $LessonStatus>;
export type LessonStatusName = z.infer<typeof $LessonStatusName>;
//schedules
export type GroupSchedule = z.infer<typeof $GroupSchedule>;
export type GroupSchedulesInfo = z.infer<typeof $GroupSchedulesInfo>;

//REQ/RESP
export type GetGroupsRequest = z.infer<typeof $GetGroupsRequest>;
export type GetGroupsResponse = z.infer<typeof $GetGroupsResponse>;
export type GetGroupRequest = z.infer<typeof $GetGroupRequest>;
export type GetGroupResponse = z.infer<typeof $GetGroupResponse>;
export type GetGroupsCountsResponse = z.infer<typeof $GetGroupsCountsResponse>;
//group module
export type GetGroupModulesRequest = z.infer<typeof $GetGroupModulesRequest>;
export type GetGroupModulesResponse = z.infer<typeof $GetGroupModulesResponse>;
//schedules
export type GetGroupsSchedulesInfoRequest = z.infer<typeof $GetGroupsSchedulesInfoRequest>;
export type GetGroupsSchedulesInfoResponse = z.infer<typeof $GetGroupsSchedulesInfoResponse>;

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminGroupTeacher = z
    .object({
        id: z.number(),
        email: z.string().optional(),
        isActive: z.boolean().optional(),
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
    isActive: z.boolean().optional(),
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
    maxStudentsCount: z.number().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    studentsCount: z.number(),
    freePlacesCount: z.number(),
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
        /**
         * @deprecated
         */
        hasAuthors: true,
        hasTeachers: true,
        createdAt: true,
        updatedAt: true,
    }),
    lastUpdated: $LastUpdated.nullable(),
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
    freePlacesCount: true,
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
            state: z.string(),
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
    freePlacesCount: true,
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

export const $CreateAdminGroupResponse = $AdminGroup.omit({ studentsCount: true, freePlacesCount: true, lastUpdated: true });

export const $UpdateAdminGroupRequest = $CreateAdminGroupRequest.extend({
    id: z.string(),
});

export const $UpdateAdminGroupResponse = $CreateAdminGroupResponse;

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

//students
export const $AdminGroupStudentStatusName = z
    .literal("inProgress")
    .or(z.literal("completed"))
    .or(z.literal("notStarted"))
    .or(z.literal("archive"));

export const $AdminGroupStudentStatus = z.object({
    name: $AdminGroupStudentStatusName,
    displayName: z.string(),
});

export const $AdminGroupStudentLessonsStatistics = z.object({
    completedCount: z.number(),
    totalCount: z.number(),
});
export const $AdminGroupStudentTestsStatistics = $AdminGroupStudentLessonsStatistics;
export const $AdminGroupStudentHomeworksStatistics = $AdminGroupStudentLessonsStatistics;

export const $AdminGroupStudent = z.object({
    id: z.number(),
    isActive: z.boolean(),
    lessons: $AdminGroupStudentLessonsStatistics,
    tests: $AdminGroupStudentTestsStatistics,
    homeworks: $AdminGroupStudentHomeworksStatistics,
    status: $AdminGroupStudentStatus,
    profile: $Profile.pick({
        id: true,
        firstName: true,
        lastName: true,
        patronymic: true,
        description: true,
    }),
});

export const $AdminGroupStudentFromList = $AdminGroupStudent;

export const $GetAdminGroupStudentsResponse = $getPaginationResponseType($AdminGroupStudentFromList);

export const $LessonStatusName = z
    .literal("blocked")
    .or(z.literal("notStarted"))
    .or(z.literal("inProgress"))
    .or(z.literal("onReview"))
    .or(z.literal("completed"));

export const $LessonStatus = z.object({
    name: $LessonStatusName,
    displayName: z.string(),
});

export const $TestStatusName = z.literal("completed").or(z.literal("needsEdit")).or(z.literal("notStarted"));

export const $TestStatus = z.object({
    name: $TestStatusName,
    displayName: z.string(),
});

export const $HomeworkStatusName = z
    .literal("notAttempted")
    .or(z.literal("onReview"))
    .or(z.literal("needsEdit"))
    .or(z.literal("completed"));

export const $HomeworkStatus = z.object({
    name: $HomeworkStatusName,
    displayName: z.string(),
});

export const $AdminGroupLessonForStudentStatistics = z.object({
    id: z.number(),
    name: z.string(),
    hasTest: z.boolean(),
    hasHomework: z.boolean(),
    lessonStatus: $LessonStatus.nullable(),
    testStatus: $TestStatus.nullable(),
    homeworkStatus: $HomeworkStatus.nullable(),
});

export const $AdminGroupModuleForStudentStatistics = z.object({
    id: z.number(),
    name: z.string(),
    completedPercent: z.number(),
    lessons: z.array($AdminGroupLessonForStudentStatistics),
});

export const $GetAdminGroupStudentStatisticsRequest = z.object({
    groupId: z.string(),
    studentId: z.string(),
});

export const $AdminGroupStudentStatistics = z.object({
    id: z.number(),
    lessons: $AdminGroupStudentLessonsStatistics.extend({
        completedPercent: z.number(),
    }),
    tests: $AdminGroupStudentTestsStatistics.extend({
        completedPercent: z.number(),
    }),
    homeworks: $AdminGroupStudentHomeworksStatistics.extend({
        completedPercent: z.number(),
    }),
    course: z.object({
        id: z.number(),
        name: z.string(),
    }),
    group: z.object({
        id: z.number(),
        name: z.string(),
    }),
    modules: z.array($AdminGroupModuleForStudentStatistics),
    profile: $Profile.pick({
        id: true,
        firstName: true,
        lastName: true,
        patronymic: true,
    }),
});

export const $GetAdminGroupStudentStatisticsResponse = $AdminGroupStudentStatistics;

export const $AdminGroupStudentsExtraFilters = z.object({
    groupId: z.string(),
});

export const $AdminGroupStudentsRequest = z.object({
    groupId: z.string(),
});

export const $GetAdminGroupStudentsRequest = $getFiltersRequestType($AdminGroupStudentsRequest);

export const $AttachStudentsToGroupRequest = z.object({
    groupId: z.string(),
    ids: z.number().array(),
});

export const $AttachStudentsToGroupResponse = z.null();

export const $DeleteStudentsFromGroupRequest = z.object({
    groupId: z.string(),
    ids: z.number().array(),
});

export const $DeleteStudentsFromGroupResponse = z.null();

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

export const $AdminGroupSchedulesExtraFilters = z.object({
    groupId: z.string(),
});



//students <-> group

export const $AdminStudentGroupStatusType = z
    .literal("notStarted")
    .or(z.literal("inProgress"))
    .or(z.literal("completed"))
    .or(z.literal("archive"));

export const $AdminStudentGroupStatus = z.object({
    name: $AdminStudentGroupStatusType,
    displayName: z.string(),
});

export const $AdminStudentGroup = $AdminGroup
    .pick({
        id: true,
        name: true,
        isActive: true,
        createdAt: true,
        status: true,
    })
    .extend({
        status: $AdminStudentGroupStatus.nullable(),
        accessExpirationDate: z.coerce.date().nullable(),
        course: $AdminCourse.pick({
            name: true,
        }),
    });

export const $AdminStudentGroupFromList = $AdminStudentGroup;

export const $GetAdminStudentGroupsResponse = $getPaginationResponseType($AdminStudentGroupFromList);

export const $AdminStudentGroupsRequest = z.object({
    studentId: z.string(),
});

export const $GetAdminStudentGroupsRequest = $getFiltersRequestType($AdminStudentGroupsRequest);

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
/**
 * @deprecated
 */
export const $GroupAuthor = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        patronymic: z.string().nullable(),
        description: z.string().nullable(),
        avatar: $UploadedFile.nullable(),
    })
    .nullish();

export const $GroupsCount = z.object({
    name: z.string(),
    displayName: z.string(),
    count: z.number(),
});

export const $Group = z.object({
    groupId: z.number(),
    courseId: z.number(),
    name: z.string(),
    shortDescription: z.string().nullable(),
    description: z.string().nullable(),
    type: $CourseType,
    availableTo: z.coerce.date().nullable(),
    educationStartDate: z.coerce.date(),
    status: $GroupStatus,
    nextLesson: z
        .object({
            id: z.number(),
            name: z.string(),
        })
        .nullable(),
    lessonsCount: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    practiceCount: z.object({
        total: z.number(),
        passed: z.number(),
    }),
    modalShowed: z.boolean().nullable(),
    isReviewed: z.boolean(),
    cover: $UploadedFile.nullable(),
    category: $GroupCategory.nullable(),
    tags: $GroupTag.array(),
    /**
     * @deprecated
     */
    authors: $GroupAuthor.array().nullish(),
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
    nextLesson: true,
    lessonsCount: true,
    practiceCount: true,
    isReviewed: true,
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

export const $GroupModuleLesson = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    hasTest: z.boolean(),
    hasHomework: z.boolean(),
    lessonStatus: $LessonStatus,
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

export const $GroupSchedule = z.object({
    id: z.number(),
    date: z.coerce.date(),
    timings: $AdminGroupScheduleTiming.array(),
});

export const $GroupSchedulesInfo = z.object({
    id: z.number(),
    name: z.string(),
    educationStartDate: z.coerce.date(),
    educationFinishDate: z.coerce.date(),
    course: z.object({
        id: z.number(),
        name: z.string(),
    }),
    schedules: z.array($GroupSchedule),
});

export const $GetGroupsSchedulesInfoRequest = $getFiltersRequestType(z.object({}));

export const $GetGroupsSchedulesInfoResponse = $getPaginationResponseType($GroupSchedulesInfo);
