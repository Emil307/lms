import { z } from "zod";
import {
    $FilterType,
    $LastUpdated,
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $getPaginationResponseType,
} from "@shared/types";

/**
 *
 * ADMIN TYPES
 *
 */
export type AdminCourseCollection = z.infer<typeof $AdminCourseCollection>;
export type AdminCourseCollectionFromList = z.infer<typeof $AdminCourseCollectionFromList>;
export type AdminCourseCollectionCourse = z.infer<typeof $AdminCourseCollectionCourse>;
//FILTERS
export type AdminCourseCollectionsFiltersForm = z.infer<typeof $AdminCourseCollectionsFiltersForm>;
// COURSE_COLLECTION <--> COURSES
export type AdminCoursesFromCourseCollectionExtraFilters = z.infer<typeof $AdminCoursesFromCourseCollectionExtraFilters>;

//REQ/RESP
export type GetAdminCourseCollectionsRequest = z.infer<typeof $GetAdminCourseCollectionsRequest>;
export type GetAdminCourseCollectionsResponse = z.infer<typeof $GetAdminCourseCollectionsResponse>;
export type GetAdminCourseCollectionRequest = z.infer<typeof $GetAdminCourseCollectionRequest>;
export type GetAdminCourseCollectionResponse = z.infer<typeof $GetAdminCourseCollectionResponse>;
export type GetAdminCourseCollectionResourcesRequest = z.infer<typeof $GetAdminCourseCollectionResourcesRequest>;
export type GetAdminCourseCollectionResourcesResponse = z.infer<typeof $GetAdminCourseCollectionResourcesResponse>;
export type CreateAdminCourseCollectionRequest = z.infer<typeof $CreateAdminCourseCollectionRequest>;
export type CreateAdminCourseCollectionResponse = z.infer<typeof $CreateAdminCourseCollectionResponse>;
export type UpdateAdminCourseCollectionRequest = z.infer<typeof $UpdateAdminCourseCollectionRequest>;
export type UpdateAdminCourseCollectionResponse = z.infer<typeof $UpdateAdminCourseCollectionResponse>;
export type DeleteAdminCourseCollectionRequest = z.infer<typeof $DeleteAdminCourseCollectionRequest>;
export type DeleteAdminCourseCollectionResponse = z.infer<typeof $DeleteAdminCourseCollectionResponse>;
export type UpdateAdminCourseCollectionActivityRequest = z.infer<typeof $UpdateAdminCourseCollectionActivityRequest>;
export type UpdateAdminCourseCollectionActivityResponse = z.infer<typeof $UpdateAdminCourseCollectionActivityResponse>;
// COURSE_COLLECTION <--> COURSES
export type AttachAdminCoursesToCourseCollectionRequest = z.infer<typeof $AttachAdminCoursesToCourseCollectionRequest>;
export type AttachAdminCoursesToCourseCollectionResponse = z.infer<typeof $AttachAdminCoursesToCourseCollectionResponse>;
export type DeleteAdminCourseFromCourseCollectionRequest = z.infer<typeof $DeleteAdminCourseFromCourseCollectionRequest>;
export type DeleteAdminCourseFromCourseCollectionResponse = z.infer<typeof $DeleteAdminCourseFromCourseCollectionResponse>;

/**
 *
 * USER TYPES
 *
 */
export type CourseCollection = z.infer<typeof $CourseCollection>;
export type CourseCollectionFromList = z.infer<typeof $CourseCollectionFromList>;

//FILTERS
export type CourseCollectionsExtraFilters = z.infer<typeof $CourseCollectionsExtraFilters>;

//REQ/RESP
export type GetCourseCollectionsRequest = z.infer<typeof $GetCourseCollectionsRequest>;
export type GetCourseCollectionsResponse = z.infer<typeof $GetCourseCollectionsResponse>;
export type GetCourseCollectionRequest = z.infer<typeof $GetCourseCollectionRequest>;
export type GetCourseCollectionResponse = z.infer<typeof $GetCourseCollectionResponse>;
export type GetRandomCourseCollectionResponse = z.infer<typeof $GetRandomCourseCollectionResponse>;

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminCourseCollectionCourse = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
});

export const $AdminCourseCollection = z.object({
    id: z.number(),
    iconName: z.string(),
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    lastUpdated: $LastUpdated.nullable(),
    coursesCount: z.number(),
});

export const $AdminCourseCollectionFromList = $AdminCourseCollection.pick({
    id: true,
    name: true,
    isActive: true,
    createdAt: true,
    coursesCount: true,
});

export const $GetAdminCourseCollectionsResponse = $getPaginationResponseType($AdminCourseCollectionFromList);

export const $AdminCourseCollectionsFiltersForm = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    courseId: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
});

export const $AdminCourseCollectionsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.boolean(),
            courseIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            createdAt: $getDateObjectType(z.literal("range")),
        })
        .partial(),
});

export const $GetAdminCourseCollectionsRequest = $getFiltersRequestType($AdminCourseCollectionsRequest);

export const $GetAdminCourseCollectionRequest = z.object({
    id: z.string(),
});

export const $GetAdminCourseCollectionResponse = $AdminCourseCollection.omit({ coursesCount: true });

export const $GetAdminCourseCollectionResourcesRequest = z.object({
    type: $FilterType,
});

export const $GetAdminCourseCollectionResourcesResponse = z.object({
    courses: $AdminCourseCollectionCourse.array(),
});

export const $CreateAdminCourseCollectionRequest = z.object({
    iconName: z.string(),
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
});

export const $CreateAdminCourseCollectionResponse = $AdminCourseCollection.omit({ coursesCount: true });

export const $UpdateAdminCourseCollectionRequest = $CreateAdminCourseCollectionRequest.extend({
    id: z.string(),
});

export const $UpdateAdminCourseCollectionResponse = $AdminCourseCollection.omit({ coursesCount: true });

export const $DeleteAdminCourseCollectionRequest = z.object({
    id: z.string(),
});

export const $DeleteAdminCourseCollectionResponse = z.null();

export const $UpdateAdminCourseCollectionActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateAdminCourseCollectionActivityResponse = z.object({
    isActive: z.boolean(),
});

// COURSE_COLLECTION <--> COURSES
export const $AdminCoursesFromCourseCollectionExtraFilters = z.object({
    collectionIds: z.string(),
});

export const $AttachAdminCoursesToCourseCollectionRequest = z.object({
    courseCollectionId: z.string(),
    ids: z.string().array(),
});

export const $AttachAdminCoursesToCourseCollectionResponse = z.null();

export const $DeleteAdminCourseFromCourseCollectionRequest = z.object({
    courseCollectionId: z.string(),
    ids: z.number().array(),
});

export const $DeleteAdminCourseFromCourseCollectionResponse = z.null();

/**
 *
 * USER ZOD
 *
 */

const $CourseCollection = z.object({
    id: z.number(),
    iconName: z.string(),
    name: z.string(),
    description: z.string(),
    coursesCount: z.number(),
});

export const $CourseCollectionFromList = $CourseCollection;

export const $GetCourseCollectionsResponse = $getPaginationResponseType($CourseCollectionFromList);

export const $CourseCollectionsExtraFilters = z.object({
    id: z.string().optional(),
});

export const $CourseCollectionsRequest = z.object({
    filter: z
        .object({
            id: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial()
        .optional(),
});

export const $GetCourseCollectionsRequest = $getFiltersRequestType($CourseCollectionsRequest);

export const $GetCourseCollectionRequest = z.object({
    id: z.string(),
});

export const $GetCourseCollectionResponse = $CourseCollection.pick({
    id: true,
    iconName: true,
    name: true,
    description: true,
});

export const $GetRandomCourseCollectionResponse = $GetCourseCollectionResponse.nullable();
