import { z } from "zod";
import { $pagination } from "@shared/utils";
import { $uploadedFile } from "@shared/ui";

export type CourseSet = z.infer<typeof $courseSet>;
export type CourseFromCourseSet = z.infer<typeof $courseFromCourseSet>;

export type GetCourseSetsResponse = z.infer<typeof $getCourseSetsResponse>;

export const $courseFromCourseSet = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    price: z.number(),
    isPurchased: z.boolean(),
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
    discount: z
        .object({
            isActive: z.boolean(),
            type: z.string(),
            value: z.number(),
            from: z.string().datetime().nullable(),
            to: z.string().datetime().nullable(),
        })
        .nullable(),
    isPurchased: z.boolean(),
    //TODO: на беке нет то что ниже
    picture: $uploadedFile,
});

export const $getCourseSetsResponse = z.object({
    data: z.array($courseSet),
    meta: z.object({
        pagination: $pagination,
    }),
});
