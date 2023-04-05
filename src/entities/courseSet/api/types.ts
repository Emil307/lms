import { z } from "zod";
import { $pagination } from "@shared/types";

export type CourseSet = z.infer<typeof $courseSet>;
export type CourseFromCourseSet = z.infer<typeof $courseFromCourseSet>;

export type GetCourseSetsResponse = z.infer<typeof $getCourseSetsResponse>;
export type GetCourseSetsRequest = z.infer<typeof $getCourseSetsRequest>;

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
    courses: z.object({
        data: z.array($courseFromCourseSet),
        meta: z.object({
            pagination: $pagination,
        }),
    }),
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

export const $getCourseSetsResponse = z.object({
    data: z.array($courseSet),
    meta: z.object({
        pagination: $pagination,
    }),
});
