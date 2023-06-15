import { z } from "zod";
import {
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $getPaginationResponseType,
    $LastUpdated,
    $UploadedFile,
} from "@shared/types";

export type AdminLesson = z.infer<typeof $AdminLesson>;

export type AdminSelectLessonsFilters = z.infer<typeof $AdminSelectLessonsFilters>;
export type AdminSelectLessonsExtraFilters = z.infer<typeof $AdminSelectLessonsExtraFilters>;

export type AdminLessonFromList = z.infer<typeof $AdminLessonFromList>;
export type GetAdminLessonsRequest = z.infer<typeof $GetAdminLessonsRequest>;
export type GetAdminLessonsResponse = z.infer<typeof $GetAdminLessonsResponse>;
export type GetAdminSelectLessonsRequest = z.infer<typeof $GetAdminSelectLessonsRequest>;
export type CreateLessonFormValues = z.infer<typeof $CreateLessonFormValues>;
export type CreateLessonRequest = z.infer<typeof $CreateLessonRequest>;
export type CreateLessonResponse = z.infer<typeof $CreateLessonResponse>;
export type UpdateLessonFormValues = z.infer<typeof $UpdateLessonFormValues>;
export type UpdateLessonRequest = z.infer<typeof $UpdateLessonRequest>;
export type UpdateLessonResponse = z.infer<typeof $UpdateLessonResponse>;
export type UpdateLessonActivityRequest = z.infer<typeof $UpdateLessonActivityRequest>;
export type UpdateLessonActivityResponse = z.infer<typeof $UpdateLessonActivityResponse>;

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
            moduleIds: $getMultiValueObjectType(z.string(), z.literal("or")),
        })
        .partial(),
});

export const $GetAdminLessonsRequest = $getFiltersRequestType($AdminLessonsRequest);
export const $GetAdminLessonsResponse = $getPaginationResponseType($AdminLessonFromList);

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

export const $UpdateLessonActivityRequest = z.object({
    id: z.string(),
    moduleId: z.string().optional(),
    isActive: z.boolean(),
});
export const $UpdateLessonActivityResponse = $UpdateLessonActivityRequest.pick({
    isActive: true,
});

export const $AdminSelectLessonsFilters = z.object({
    query: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
});

export const $AdminSelectLessonsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            createdAt: $getDateObjectType(z.literal("range")),
            moduleIds: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});
export const $GetAdminSelectLessonsRequest = $getFiltersRequestType($AdminSelectLessonsRequest);

export const $AdminSelectLessonsExtraFilters = z.object({
    moduleIds: z.array(z.string()),
});
