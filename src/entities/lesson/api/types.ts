import { z } from "zod";
import {
    $FilterType,
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $getPaginationResponseType,
    $LastUpdated,
    $Profile,
    $Role,
    $UploadedFile,
} from "@shared/types";
import { $User } from "@entities/user";
import { $LessonStatus } from "@entities/group";

/***
 *
 * ADMIN TYPES
 *
 */

export type AdminLesson = z.infer<typeof $AdminLesson>;
export type AdminLessonFromList = z.infer<typeof $AdminLessonFromList>;
export type AdminTest = z.infer<typeof $AdminTest>;
export type AdminTestQuestion = z.infer<typeof $AdminTestQuestion>;
export type AdminTestAnswer = z.infer<typeof $AdminTestAnswer>;
export type AdminHomework = z.infer<typeof $AdminHomework>;
export type HomeworkRequiredType = z.infer<typeof $HomeworkRequiredType>;
export type AdminHomeworkAnswer = z.infer<typeof $AdminHomeworkAnswer>;
export type AdminHomeworkAnswerFromList = z.infer<typeof $AdminHomeworkAnswerFromList>;

export type AdminLessonsFilters = z.infer<typeof $AdminLessonsFilters>;
export type AdminSelectLessonsFilters = z.infer<typeof $AdminSelectLessonsFilters>;
export type AdminSelectLessonsExtraFilters = z.infer<typeof $AdminSelectLessonsExtraFilters>;

export type GetAdminLessonsRequest = z.infer<typeof $GetAdminLessonsRequest>;
export type GetAdminLessonsResponse = z.infer<typeof $GetAdminLessonsResponse>;
export type GetAdminLessonsFromModuleRequest = z.infer<typeof $GetAdminLessonsFromModuleRequest>;
export type GetAdminLessonResponse = z.infer<typeof $GetAdminLessonResponse>;

export type CreateLessonFormValues = z.infer<typeof $CreateLessonFormValues>;
export type CreateLessonRequest = z.infer<typeof $CreateLessonRequest>;
export type CreateLessonResponse = z.infer<typeof $CreateLessonResponse>;
export type UpdateLessonFormValues = z.infer<typeof $UpdateLessonFormValues>;
export type UpdateLessonRequest = z.infer<typeof $UpdateLessonRequest>;
export type UpdateLessonResponse = z.infer<typeof $UpdateLessonResponse>;
export type UpdateLessonContentFormValues = z.infer<typeof $UpdateLessonContentFormValues>;
export type UpdateLessonContentRequest = z.infer<typeof $UpdateLessonContentRequest>;
export type UpdateLessonContentResponse = z.infer<typeof $UpdateLessonContentResponse>;
export type UpdateLessonActivityRequest = z.infer<typeof $UpdateLessonActivityRequest>;
export type UpdateLessonActivityResponse = z.infer<typeof $UpdateLessonActivityResponse>;
export type UpdateLessonOrderRequest = z.infer<typeof $UpdateLessonOrderRequest>;
export type UpdateLessonOrderResponse = z.infer<typeof $UpdateLessonOrderResponse>;

export type GetAdminTestResponse = z.infer<typeof $GetAdminTestResponse>;
export type UpdateAdminTestRequest = z.infer<typeof $UpdateAdminTestRequest>;
export type UpdateAdminTestResponse = z.infer<typeof $UpdateAdminTestResponse>;

export type GetAdminHomeworkResponse = z.infer<typeof $GetAdminHomeworkResponse>;
export type UpdateAdminHomeworkFormValues = z.infer<typeof $UpdateAdminHomeworkFormValues>;
export type UpdateAdminHomeworkRequest = z.infer<typeof $UpdateAdminHomeworkRequest>;
export type UpdateAdminHomeworkResponse = z.infer<typeof $UpdateAdminHomeworkResponse>;

export type GetAdminHomeworkAnswersResourcesRequest = z.infer<typeof $GetAdminHomeworkAnswersResourcesRequest>;
export type GetAdminHomeworkAnswersResourcesResponse = z.infer<typeof $GetAdminHomeworkAnswersResourcesResponse>;
export type GetAdminHomeworkAnswersRequest = z.infer<typeof $GetAdminHomeworkAnswersRequest>;
export type GetAdminHomeworkAnswersResponse = z.infer<typeof $GetAdminHomeworkAnswersResponse>;
export type AdminHomeworkAnswersRequest = z.infer<typeof $AdminHomeworkAnswersRequest>;
export type GetAdminHomeworkAnswerResponse = z.infer<typeof $GetAdminHomeworkAnswerResponse>;
export type UpdateAdminHomeworkAnswerStatusRequest = z.infer<typeof $UpdateAdminHomeworkAnswerStatusRequest>;
export type UpdateAdminHomeworkAnswerStatusResponse = z.infer<typeof $UpdateAdminHomeworkAnswerStatusResponse>;

export type AdminHomeworkAnswerMessage = z.infer<typeof $AdminHomeworkAnswerMessage>;
export type AdminHomeworkAnswerMessagesRequest = z.infer<typeof $AdminHomeworkAnswerMessagesRequest>;
export type GetAdminHomeworkAnswerMessagesRequest = z.infer<typeof $GetAdminHomeworkAnswerMessagesRequest>;
export type GetAdminHomeworkAnswerMessagesResponse = z.infer<typeof $GetAdminHomeworkAnswerMessagesResponse>;
export type CreateAdminHomeworkAnswerMessageRequest = z.infer<typeof $CreateAdminHomeworkAnswerMessageRequest>;
export type CreateAdminHomeworkAnswerMessageResponse = z.infer<typeof $CreateAdminHomeworkAnswerMessageResponse>;

export type AttachMaterialsToLessonRequest = z.infer<typeof $AttachMaterialsToLessonRequest>;
export type DetachMaterialsFromLessonRequest = z.infer<typeof $DetachMaterialsFromLessonRequest>;

/***
 *
 * USER TYPES
 *
 */
export type Lesson = z.infer<typeof $Lesson>;
//test
export type Test = z.infer<typeof $Test>;
export type TestTask = z.infer<typeof $TestTask>;
export type TestTaskAnswer = z.infer<typeof $TestTaskAnswer>;
export type TestStatusName = z.infer<typeof $TestStatusName>;
export type TestPass = z.infer<typeof $TestPass>;
export type TestPassAnswer = z.infer<typeof $TestPassAnswer>;
export type TestPassTaskAnswer = z.infer<typeof $TestPassTaskAnswer>;
//homework
export type Homework = z.infer<typeof $Homework>;
export type HomeworkAnswer = z.infer<typeof $HomeworkAnswer>;
export type HomeworkAnswerStatusName = z.infer<typeof $HomeworkAnswerStatusName>;
export type HomeworkAnswerStatus = z.infer<typeof $HomeworkAnswerStatus>;
//homework messages
export type HomeworkAnswerMessage = z.infer<typeof $HomeworkAnswerMessage>;
export type HomeworkAnswerMessageFromList = z.infer<typeof $HomeworkAnswerMessageFromList>;

//REQ/RESP
export type GetLessonRequest = z.infer<typeof $GetLessonRequest>;
export type GetLessonResponse = z.infer<typeof $GetLessonResponse>;
export type GetLessonByGroupRequest = z.infer<typeof $GetLessonByGroupRequest>;
export type FinishLessonRequest = z.infer<typeof $FinishLessonRequest>;
export type FinishLessonResponse = z.infer<typeof $FinishLessonResponse>;
//test
export type GetTestRequest = z.infer<typeof $GetTestRequest>;
export type GetTestResponse = z.infer<typeof $GetTestResponse>;
export type GetTestPassRequest = z.infer<typeof $GetTestPassRequest>;
export type GetTestPassResponse = z.infer<typeof $GetTestPassResponse>;
export type UpdateTestPassRequest = z.infer<typeof $UpdateTestPassRequest>;
export type UpdateTestPassResponse = z.infer<typeof $UpdateTestPassResponse>;
//homework
export type GetHomeworkRequest = z.infer<typeof $GetHomeworkRequest>;
export type GetHomeworkResponse = z.infer<typeof $GetHomeworkResponse>;
export type UpdateHomeworkAnswerRequest = z.infer<typeof $UpdateHomeworkAnswerRequest>;
export type UpdateHomeworkAnswerResponse = z.infer<typeof $UpdateHomeworkAnswerResponse>;
//homework messages
export type GetHomeworkAnswerMessagesRequest = z.infer<typeof $GetHomeworkAnswerMessagesRequest>;
export type GetHomeworkAnswerMessagesResponse = z.infer<typeof $GetHomeworkAnswerMessagesResponse>;
export type CreateHomeworkAnswerMessageRequest = z.infer<typeof $CreateHomeworkAnswerMessageRequest>;
export type CreateHomeworkAnswerMessageResponse = z.infer<typeof $CreateHomeworkAnswerMessageResponse>;

/***
 *
 * ADMIN ZOD
 *
 */

export const $AdminLesson = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    content: z.string().nullable(),
    hasTest: z.boolean(),
    hasHomework: z.boolean(),
    isActive: z.boolean().optional(),
    videos: z.array($UploadedFile),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    lastUpdated: $LastUpdated,
});

export const $GetAdminLessonResponse = $AdminLesson;

export const $AdminLessonFromList = $AdminLesson.omit({
    content: true,
    videos: true,
    updatedAt: true,
    lastUpdated: true,
});

export const $AdminLessonsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
            createdAt: $getDateObjectType(z.literal("range")),
            moduleIds: $getMultiValueObjectType(z.string(), z.literal("not")),
            courseIds: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});

export const $GetAdminLessonsRequest = $getFiltersRequestType($AdminLessonsRequest);
export const $GetAdminLessonsResponse = $getPaginationResponseType($AdminLessonFromList);

export const $AdminLessonsFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
});

export const $AdminLessonsFromModuleRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
            createdAt: $getDateObjectType(z.literal("range")),
            moduleIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        })
        .partial(),
});

export const $GetAdminLessonsFromModuleRequest = $getFiltersRequestType($AdminLessonsFromModuleRequest);

export const $CreateLessonFormValues = z.object({
    name: z.string({ required_error: "Введите название" }),
    description: z.string({ required_error: "Введите описание" }),
    hasTest: z.boolean(),
    hasHomework: z.boolean(),
    isActive: z.boolean(),
});

export const $CreateLessonRequest = $CreateLessonFormValues;
export const $CreateLessonResponse = $AdminLesson.omit({
    content: true,
});

export const $UpdateLessonFormValues = $CreateLessonFormValues;

export const $UpdateLessonRequest = $CreateLessonRequest.extend({
    id: z.string(),
});
export const $UpdateLessonResponse = $AdminLesson;

export const $UpdateLessonContentFormValues = z.object({
    hasContent: z.boolean(),
    content: z.string(),
    videos: z.array($UploadedFile),
});

export const $UpdateLessonContentRequest = z.object({
    id: z.string(),
    content: z.string(),
    videoFileIds: z.array(z.number()),
});
export const $UpdateLessonContentResponse = $AdminLesson.omit({
    lastUpdated: true,
});

export const $UpdateLessonActivityRequest = z.object({
    id: z.string(),
    moduleId: z.string().optional(),
    isActive: z.boolean(),
});
export const $UpdateLessonActivityResponse = $UpdateLessonActivityRequest.pick({
    isActive: true,
});

export const $AdminSelectLessonsFilters = $AdminLessonsFilters.omit({
    isActive: true,
});
export const $AdminSelectLessonsExtraFilters = z.object({
    courseIds: z.array(z.string()),
});

export const $UpdateLessonOrderRequest = z.object({
    lessonId: z.string(),
    moduleId: z.string(),
    after: z.number(),
});

export const $UpdateLessonOrderResponse = $AdminLessonFromList;

export const $AttachMaterialsToLessonRequest = z.object({
    lessonId: z.string(),
    ids: z.array(z.string()),
});

export const $DetachMaterialsFromLessonRequest = z.object({
    lessonId: z.string(),
    ids: z.array(z.string()),
});

export const $AdminTestAnswer = z.object({
    id: z.number(),
    order: z.number(),
    content: z.string(),
    isCorrect: z.boolean(),
});

export const $AdminTestQuestion = z.object({
    id: z.number(),
    order: z.number(),
    content: z.string(),
    answers: z.array($AdminTestAnswer),
});

export const $AdminTest = z.object({
    id: z.number(),
    correctAnswersCount: z.number(),
    tasks: z.array($AdminTestQuestion),
});

export const $GetAdminTestResponse = $AdminTest.nullable();

export const $UpdateAdminTestRequest = z.object({
    lessonId: z.string(),
    correctAnswersCount: z.number(),
    tasks: z.array(
        $AdminTestQuestion.omit({
            id: true,
        })
    ),
});

export const $UpdateAdminTestResponse = $AdminTest.nullable();

export const $HomeworkRequiredType = z.literal("required").or(z.literal("notRequired"));

export const $HomeworkAnswerStatusName = z
    .literal("notAttempted")
    .or(z.literal("onReview"))
    .or(z.literal("needsEdit"))
    .or(z.literal("completed"));

export const $HomeworkAnswerStatus = z.object({
    name: $HomeworkAnswerStatusName,
    displayName: z.string(),
});

export const $AdminHomework = z.object({
    id: z.number(),
    content: z.string(),
    requiredType: $HomeworkRequiredType,
    files: z.array($UploadedFile),
});

export const $GetAdminHomeworkResponse = $AdminHomework.nullable();

export const $UpdateAdminHomeworkFormValues = $AdminHomework.omit({
    id: true,
});

export const $UpdateAdminHomeworkRequest = z.object({
    id: z.string(),
    content: z.string(),
    requiredType: $HomeworkRequiredType,
    fileIds: z.array(z.number()),
});

export const $UpdateAdminHomeworkResponse = $AdminHomework;

export const $AdminHomeworkAnswer = z.object({
    id: z.number(),
    answer: z.string(),
    status: $HomeworkAnswerStatus.nullish(),
    updatedAt: z.coerce.date(),
    files: $UploadedFile.array(),
    student: z.object({
        id: z.number(),
        email: z.string(),
        profile: $Profile.omit({
            additionalImage: true,
        }),
    }),
    course: z.object({
        name: z.string(),
    }),
    module: z
        .object({
            name: z.string(),
        })
        .nullable(),
    homework: z.object({
        id: z.number(),
        content: z.string(),
        requiredType: $HomeworkRequiredType,
        files: $UploadedFile.array(),
        lesson: $AdminLesson.omit({
            lastUpdated: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            videos: true,
        }),
    }),
    group: z.object({
        name: z.string(),
    }),
});

export const $GetAdminHomeworkAnswerResponse = $AdminHomeworkAnswer;

export const $GetAdminHomeworkAnswersResourcesRequest = z.object({
    type: $FilterType,
});

export const $GetAdminHomeworkAnswersResourcesResponse = z.object({
    courses: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ),
    students: z.array(
        z.object({
            id: z.number(),
            profile: z.object({
                firstName: z.string(),
                lastName: z.string(),
            }),
        })
    ),
});

export const $AdminHomeworkAnswersRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            status: $HomeworkAnswerStatusName.or(z.literal("")),
            updatedAt: $getDateObjectType(z.literal("range")),
            "student.id": z.string(),
            "course.id": z.string(),
        })
        .partial(),
});

export const $GetAdminHomeworkAnswersRequest = $getFiltersRequestType($AdminHomeworkAnswersRequest);

export const $AdminHomeworkAnswerFromList = $AdminHomeworkAnswer
    .omit({
        files: true,
        homework: true,
        student: true,
    })
    .extend({
        homework: z.object({
            id: z.number(),
            content: z.string(),
            requiredType: $HomeworkRequiredType,
            lesson: $AdminLesson.omit({
                lastUpdated: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                videos: true,
            }),
        }),
        student: z.object({
            profile: $Profile.pick({
                firstName: true,
                lastName: true,
            }),
        }),
    });

export const $GetAdminHomeworkAnswersResponse = $getPaginationResponseType($AdminHomeworkAnswerFromList);

export const $UpdateAdminHomeworkAnswerStatusRequest = z.object({
    id: z.string(),
    status: $HomeworkAnswerStatusName,
    content: z.string().nullable(),
});

export const $UpdateAdminHomeworkAnswerStatusResponse = $AdminHomeworkAnswer
    .pick({
        id: true,
        answer: true,
        status: true,
        updatedAt: true,
        course: true,
        module: true,
        group: true,
    })
    .extend({
        homework: z.object({
            id: z.number(),
            content: z.string(),
            requiredType: $HomeworkRequiredType,
            lesson: $AdminLesson.omit({
                lastUpdated: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                videos: true,
            }),
        }),
        student: $User
            .pick({
                id: true,
                email: true,
            })
            .extend({
                profile: $Profile.omit({ avatar: true, additionalImage: true }),
            }),
    });

export const $AdminHomeworkAnswerMessage = z.object({
    id: z.number(),
    content: z.string(),
    isRead: z.boolean(),
    createdAt: z.coerce.date(),
    sender: z.object({
        id: z.number(),
        email: z.string(),
        profile: $Profile.omit({
            additionalImage: true,
        }),
        roles: z.array($Role),
    }),
});

export const $AdminHomeworkAnswerMessagesRequest = z.object({
    homeworkAnswerId: z.string(),
});

export const $GetAdminHomeworkAnswerMessagesRequest = $getFiltersRequestType($AdminHomeworkAnswerMessagesRequest);

export const $GetAdminHomeworkAnswerMessagesResponse = $getPaginationResponseType($AdminHomeworkAnswerMessage);

export const $CreateAdminHomeworkAnswerMessageRequest = z.object({
    homeworkAnswerId: z.string(),
    content: z.string(),
});

export const $CreateAdminHomeworkAnswerMessageResponse = $AdminHomeworkAnswerMessage;

/***
 *
 * USER ZOD
 *
 */

export const $TestStatusName = z.literal("completed").or(z.literal("needsEdit")).or(z.literal("notStarted"));

export const $TestTaskAnswer = z.object({
    id: z.number(),
    order: z.number(),
    content: z.string(),
});

export const $TestPassAnswer = $TestTaskAnswer.extend({
    isCorrect: z.boolean(),
    isSelected: z.boolean(),
});

export const $TestPassTaskAnswer = z.object({
    id: z.number(),
    testPassId: z.number(),
    question: z.string(),
    answer: $TestPassAnswer.array(),
});

export const $TestTask = z.object({
    id: z.number(),
    order: z.number(),
    content: z.string(),
    answers: $TestTaskAnswer.array(),
    isCheckbox: z.boolean(),
});

export const $Test = z.object({
    id: z.number(),
    tasks: $TestTask.array(),
});

export const $TestPass = z.object({
    id: z.number(),
    correctAnswersCount: z.number(),
    wrongAnswersCount: z.number(),
    requiredAnswersCount: z.number(),
    status: z.object({
        name: $TestStatusName,
        displayName: z.string(),
    }),
    answers: z.array($TestPassTaskAnswer).nullable().optional(),
});

export const $GetTestRequest = z.object({
    lessonId: z.string(),
    groupId: z.string(),
});

export const $GetTestResponse = $Test.nullable();

export const $GetTestPassRequest = z.object({
    lessonId: z.string(),
    groupId: z.string(),
});

export const $GetTestPassResponse = $TestPass.nullable();

export const $UpdateTestPassRequest = z.object({
    lessonId: z.string(),
    courseId: z.string(),
    answers: z
        .object({
            testTaskId: z.number(),
            selections: z.number().array(),
        })
        .array(),
});

export const $UpdateTestPassResponse = $TestPass;

//HOMEWORK
export const $HomeworkAnswer = z.object({
    id: z.number(),
    answer: z.string(),
    status: $HomeworkAnswerStatus,
    updatedAt: z.coerce.date(),
    student: $User.pick({
        id: true,
        email: true,
        profile: true,
    }),
    files: $UploadedFile.array(),
});

export const $Homework = z.object({
    id: z.number(),
    content: z.string(),
    requiredType: z.string(),
    files: $UploadedFile.array(),
    answer: $HomeworkAnswer.nullable(),
});

export const $GetHomeworkRequest = z.object({
    lessonId: z.string(),
    groupId: z.string(),
});

export const $GetHomeworkResponse = $Homework.nullable();

export const $UpdateHomeworkAnswerRequest = z.object({
    lessonId: z.string(),
    courseId: z.string(),
    answer: z.string(),
    fileIds: z.number().array(),
});

export const $UpdateHomeworkAnswerResponse = $Homework;

//LESSON
export const $NeighboringLesson = z.object({
    id: z.number(),
    name: z.string(),
    isAvailable: z.boolean(),
});

export const $Lesson = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    content: z.string().nullable(),
    hasTest: z.boolean(),
    homeworkRequired: z.boolean(),
    hasHomework: z.boolean(),
    testExists: z.boolean().optional(),
    homeworkExists: z.boolean().optional(),
    lessonStatus: $LessonStatus,
    prevLesson: $NeighboringLesson.nullable(),
    nextLesson: $NeighboringLesson.nullable(),
    homeworkStatus: z
        .object({
            name: $HomeworkAnswerStatusName,
            displayName: z.string(),
        })
        .nullable(),
    testStatus: z
        .object({
            name: $TestStatusName,
            displayName: z.string(),
        })
        .nullable(),
    videos: $UploadedFile.array(),
    files: $UploadedFile.array(),
});

export const $GetLessonRequest = z.object({
    id: z.string(),
    courseId: z.number().optional(),
});

export const $GetLessonByGroupRequest = z.object({
    id: z.string(),
    groupId: z.number().optional(),
});

export const $GetLessonResponse = $Lesson;

export const $FinishLessonRequest = z.object({
    courseId: z.string(),
    lessonId: z.string(),
});

export const $FinishLessonResponse = $Lesson.omit({
    homeworkRequired: true,
});

//HOMEWORK MESSAGE
export const $HomeworkAnswerMessage = z.object({
    id: z.number(),
    content: z.string(),
    isRead: z.boolean(),
    createdAt: z.coerce.date(),
    sender: $User.pick({
        id: true,
        email: true,
        profile: true,
        roles: true,
    }),
});
export const $HomeworkAnswerMessageFromList = $HomeworkAnswerMessage;

export const $GetHomeworkAnswerMessagesResponse = $getPaginationResponseType($HomeworkAnswerMessageFromList);

export const $HomeworkAnswerMessagesRequest = z.object({
    homeworkAnswerId: z.string(),
    courseId: z.string(),
});

export const $GetHomeworkAnswerMessagesRequest = $getFiltersRequestType($HomeworkAnswerMessagesRequest);

export const $CreateHomeworkAnswerMessageRequest = z.object({
    homeworkAnswerId: z.string(),
    courseId: z.string(),
    content: z.string(),
});

export const $CreateHomeworkAnswerMessageResponse = $HomeworkAnswerMessage;
