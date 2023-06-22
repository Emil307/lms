import { z } from "zod";
import { $Profile, $getDateObjectType, $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";
import { $User } from "@entities/user";

/**
 *
 * ADMIN TYPES
 *
 */

export type AdminCourseReview = z.infer<typeof $AdminCourseReview>;
export type AdminCourseReviewFromList = z.infer<typeof $AdminCourseReviewFromList>;
export type AdminCourseReviewGroup = z.infer<typeof $AdminCourseReviewGroup>;
export type AdminCourseReviewCourse = z.infer<typeof $AdminCourseReviewCourse>;

//FILTERS
export type AdminCourseReviewFiltersForm = z.infer<typeof $AdminCourseReviewFiltersForm>;

//REQ/RESP
export type GetAdminCourseReviewsRequest = z.infer<typeof $GetAdminCourseReviewsRequest>;
export type GetAdminCourseReviewsResponse = z.infer<typeof $GetAdminCourseReviewsResponse>;
export type GetAdminCourseReviewRequest = z.infer<typeof $GetAdminCourseReviewRequest>;
export type GetAdminCourseReviewResponse = z.infer<typeof $GetAdminCourseReviewResponse>;
export type GetAdminCourseReviewResourcesResponse = z.infer<typeof $GetAdminCourseReviewResourcesResponse>;
export type UpdateCourseReviewPublishingStatusRequest = z.infer<typeof $UpdateCourseReviewPublishingStatusRequest>;
export type UpdateCourseReviewPublishingStatusResponse = z.infer<typeof $UpdateCourseReviewPublishingStatusResponse>;
export type DeleteCourseReviewRequest = z.infer<typeof $DeleteCourseReviewRequest>;
export type DeleteCourseReviewResponse = z.infer<typeof $DeleteCourseReviewResponse>;

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

//TODO: Заменить на схему из групп
export const $AdminCourseReviewGroup = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    education: z.object({
        from: z.coerce.date(),
        to: z.coerce.date(),
    }),
    status: z.string(),
    maxStudents: z.number(),
    isActive: z.boolean(),
    course: z.null(), //TODO:
});

export const $AdminCourseReviewCourse = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
});

export const $AdminCourseReview = z.object({
    id: z.number(),
    content: z.string(),
    score: z.number(),
    isPublished: z.boolean(),
    publishedAt: z.coerce.date().nullable(),
    createdAt: z.coerce.date(),
    user: $User
        .pick({
            id: true,
            email: true,
            isActive: true,
            //TODO: как бек поправит схему
            // profile: true,
        })
        .merge(
            z.object({
                profile: $Profile.pick({
                    id: true,
                    firstName: true,
                    lastName: true,
                    patronymic: true,
                    description: true,
                }),
            })
        ),
    group: $AdminCourseReviewGroup,
});

export const $AdminCourseReviewFromList = $AdminCourseReview;

export const $GetAdminCourseReviewsResponse = $getPaginationResponseType($AdminCourseReviewFromList);

export const $AdminCourseReviewFiltersForm = z.object({
    isPublished: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    courseId: z.string(),
    score: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
});

export const $AdminCourseReviewsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isPublished: z.boolean(),
            courseId: z.string(),
            score: z.string(),
            createdAt: $getDateObjectType(z.literal("range")),
        })
        .partial(),
});

export const $GetAdminCourseReviewsRequest = $getFiltersRequestType($AdminCourseReviewsRequest);

export const $GetAdminCourseReviewRequest = z.object({
    id: z.string(),
});

export const $GetAdminCourseReviewResponse = $AdminCourseReview;

export const $GetAdminCourseReviewResourcesResponse = z.object({
    courses: $AdminCourseReviewCourse.array(),
});

export const $UpdateCourseReviewPublishingStatusRequest = z.object({
    id: z.string(),
    isPublished: z.boolean(),
});

export const $UpdateCourseReviewPublishingStatusResponse = z.object({
    isPublished: z.boolean(),
});

export const $DeleteCourseReviewRequest = z.object({
    id: z.string(),
});

export const $DeleteCourseReviewResponse = z.null();

/***
 *
 *
 * USER ZOD
 *
 */
