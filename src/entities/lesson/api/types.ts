import { z } from "zod";
import {
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $getPaginationResponseType,
    $LastUpdated,
    $UploadedFile,
} from "@shared/types";

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

export type AttachMaterialsToLessonRequest = z.infer<typeof $AttachMaterialsToLessonRequest>;
export type DetachMaterialsFromLessonRequest = z.infer<typeof $DetachMaterialsFromLessonRequest>;

/***
 *
 * USER TYPES
 *
 */
export type Test = z.infer<typeof $Test>;
export type TestTask = z.infer<typeof $TestTask>;
export type TestTaskAnswer = z.infer<typeof $TestTaskAnswer>;
export type TestStatusName = z.infer<typeof $TestStatusName>;
export type TestPass = z.infer<typeof $TestPass>;
export type TestPassAnswer = z.infer<typeof $TestPassAnswer>;
export type TestPassTaskAnswer = z.infer<typeof $TestPassTaskAnswer>;

//REQ/RESP
export type GetTestRequest = z.infer<typeof $GetTestRequest>;
export type GetTestResponse = z.infer<typeof $GetTestResponse>;
export type GetTestPassRequest = z.infer<typeof $GetTestPassRequest>;
export type GetTestPassResponse = z.infer<typeof $GetTestPassResponse>;
export type UpdateTestPassRequest = z.infer<typeof $UpdateTestPassRequest>;
export type UpdateTestPassResponse = z.infer<typeof $UpdateTestPassResponse>;

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
    isActive: z.boolean(),
    videos: z.array($UploadedFile),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
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
});

export const $CreateLessonRequest = $CreateLessonFormValues;
export const $CreateLessonResponse = $AdminLesson;

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
    moduleIds: z.array(z.string()),
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

export const $HomeworkRequiredType = z.literal("required").or(z.literal("not_required"));

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

/***
 *
 * USER ZOD
 *
 */

export const $TestStatusName = z.literal("completed").or(z.literal("needs_edit")).or(z.literal("not_started"));

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
    //TODO: исправить на camelCase
    test_pass_id: z.number(),
    question: z.string(),
    answer: $TestPassAnswer.array(),
    result: z.boolean(),
});

export const $TestTask = z.object({
    id: z.number(),
    order: z.number(),
    content: z.string(),
    answers: $TestTaskAnswer.array(),
    //TODO: исправить на camelCase
    is_checkbox: z.boolean(),
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
    answers: $TestPassTaskAnswer.array().optional(),
});

export const $GetTestRequest = z.object({
    lessonId: z.string(),
});

export const $GetTestResponse = $Test;

export const $GetTestPassRequest = z.object({
    lessonId: z.string(),
});

export const $GetTestPassResponse = $TestPass;

export const $UpdateTestPassRequest = z.object({
    lessonId: z.string(),
    courseId: z.string(),
    answers: z
        .object({
            //TODO: исправить на camelCase
            test_task_id: z.number(),
            selections: z.number().array(),
        })
        .array(),
});

export const $UpdateTestPassResponse = $TestPass;
