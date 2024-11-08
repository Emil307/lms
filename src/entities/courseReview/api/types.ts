import { z } from "zod";
import { $FilterType, $Profile, $getDateObjectType, $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";
import { $User } from "@entities/user";
import { $AdminGroup } from "@entities/group";
import { $CourseType } from "@entities/course";

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
export type GetAdminCourseReviewResourcesRequest = z.infer<typeof $GetAdminCourseReviewResourcesRequest>;
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
export type CourseReview = z.infer<typeof $CourseReview>;
export type CourseReviewFromList = z.infer<typeof $CourseReviewFromList>;

//FILTERS
export type CourseReviewsFiltersForm = z.infer<typeof $CourseReviewsFiltersForm>;

//REQ/RESP
export type GetCourseReviewsRequest = z.infer<typeof $GetCourseReviewsRequest>;
export type GetCourseReviewsResponse = z.infer<typeof $GetCourseReviewsResponse>;
export type CreateCourseReviewRequest = z.infer<typeof $CreateCourseReviewRequest>;
export type CreateCourseReviewResponse = z.infer<typeof $CreateCourseReviewResponse>;

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminCourseReviewGroup = $AdminGroup.pick({
    id: true,
    name: true,
    status: true,
    educationStartDate: true,
    educationFinishDate: true,
    maxStudentsCount: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    course: true,
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
    user: $User.pick({
        id: true,
        email: true,
        isActive: true,
        profile: true,
    }),
    group: $AdminGroup.pick({
        id: true,
        name: true,
        status: true,
        educationStartDate: true,
        educationFinishDate: true,
        maxStudentsCount: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        course: true,
    }),
});

export const $AdminCourseReviewFromList = $AdminCourseReview.omit({ user: true }).extend({
    user: $User
        .pick({
            id: true,
            email: true,
            isActive: true,
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
});

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
            courseId: z.number(),
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

export const $GetAdminCourseReviewResourcesRequest = z.object({
    type: $FilterType,
});

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

//TODO: Заменить на схему из курсов, когда беки обновят курсы
export const $CourseReviewCourse = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    discountPrice: z.number(),
    type: $CourseType,
});

export const $CourseReview = $AdminCourseReview
    .pick({
        id: true,
        content: true,
        score: true,
        createdAt: true,
    })
    .extend({
        user: $User.pick({
            id: true,
            email: true,
            profile: true,
        }),
        course: $CourseReviewCourse.nullable(),
    });

export const $CourseReviewFromList = $CourseReview;

export const $GetCourseReviewsResponse = $getPaginationResponseType($CourseReviewFromList);

export const $CourseReviewsFiltersForm = z.object({
    courseId: z.string(),
});

export const $CourseReviewsRequest = z.object({
    filter: z
        .object({
            "course.id": z.string(),
        })
        .partial()
        .optional(),
});

export const $GetCourseReviewsRequest = $getFiltersRequestType($CourseReviewsRequest);

export const $CreateCourseReviewRequest = z.object({
    courseGroupId: z.string(),
    score: z.number(),
    content: z.string(),
});

export const $CreateCourseReviewResponse = $CourseReview.pick({
    id: true,
    content: true,
    score: true,
    isPublished: true,
    publishedAt: true,
    createdAt: true,
});
