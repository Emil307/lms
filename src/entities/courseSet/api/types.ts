import { z } from "zod";
import { $UploadedFile, $getFiltersRequestType, $getMultiValueObjectType, $getPaginationResponseType } from "@shared/types";

export type CourseSet = z.infer<typeof $CourseSet>;
export type CourseSetDetail = z.infer<typeof $CourseSetDetail>;
export type CourseFromCourseSet = z.infer<typeof $CourseFromCourseSet>;

export type CourseSetsFiltersForm = z.infer<typeof $CourseSetsFiltersForm>;

export type GetCourseSetRequest = z.infer<typeof $GetCourseSetRequest>;
export type GetCourseSetsRequest = z.infer<typeof $GetCourseSetsRequest>;
export type GetCourseSetsResponse = z.infer<typeof $GetCourseSetsResponse>;

export const $CourseFromCourseSet = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    price: z.number(),
    isPurchased: z.boolean(),
    isFavorite: z.boolean().optional(),
    picture: z
        .object({
            data: z.object({
                name: z.string(),
                path: z.string(),
                type: z.string(),
                size: z.number(),
            }),
        })
        .optional(),
});

export const $CourseSet = z.object({
    id: z.number(),
    iconName: z.string(),
    name: z.string(),
    description: z.string(),
    coursesCount: z.number(),
});

export const $CourseSetDetail = $CourseSet.omit({ coursesCount: true }).extend({
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $GetCourseSetRequest = z.object({
    id: z.number(),
    page: z.number().optional(),
    perPage: z.number().optional(),
});

export const $GetCourseSetsResponse = $getPaginationResponseType($CourseSet);

export const $GetCourseSetResponse = z.object({
    id: z.number(),
    name: z.string(),
    picture: z.object({
        data: $UploadedFile,
    }),
    description: z.string(),
    courses: $getPaginationResponseType($CourseSet),
});

export const $CourseSetsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            id: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});

export const $GetCourseSetsRequest = $getFiltersRequestType($CourseSetsRequest);

export const $CourseSetsFiltersForm = z.object({
    exceptionCourseSetId: z.string().optional(),
    perPage: z.number(),
    page: z.number(),
});
