import { z } from "zod";
import { $getPaginationResponseType } from "@shared/types";
import { $uploadedFile } from "@shared/ui";
import { $course } from "@entities/course";

export type CourseSet = z.infer<typeof $courseSet>;
export type CourseFromCourseSet = z.infer<typeof $courseFromCourseSet>;

export type GetCourseSetsResponse = z.infer<typeof $getCourseSetsResponse>;
export type GetCourseSetsRequest = z.infer<typeof $getCourseSetsRequest>;
export type GetCourseSetRequest = z.infer<typeof $getCourseSetRequest>;

export const $courseFromCourseSet = z.object({
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

export const $courseSet = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    courses: $getPaginationResponseType($course),
    price: z.number(),
    isDiscount: z.boolean(),
    discount: z.object({
        data: z
            .object({
                is_active: z.boolean(),
                type: z.string(),
                value: z.number(),
                from: z.string().datetime().nullable(),
                to: z.string().datetime().nullable(),
            })
            .nullable()
            .or(
                z.array(
                    z
                        .object({
                            is_active: z.boolean(),
                            type: z.string(),
                            value: z.number(),
                            from: z.string().datetime().nullable(),
                            to: z.string().datetime().nullable(),
                        })
                        .nullable()
                )
            ),
    }),
    isPurchased: z.boolean(),
    //TODO: на беке нет то что ниже
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

export const $getCourseSetsRequest = z.object({
    page: z.number().optional(),
    perPage: z.number().optional(),
});

export const $getCourseSetRequest = z.object({
    id: z.number(),
    page: z.number().optional(),
    perPage: z.number().optional(),
});

export const $getCourseSetsResponse = $getPaginationResponseType($courseSet);

export const $getCourseSetResponse = z.object({
    id: z.number(),
    name: z.string(),
    picture: z.object({
        data: $uploadedFile,
    }),
    description: z.string(),
    courses: $getPaginationResponseType($courseSet),
});
