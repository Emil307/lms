import { z } from "zod";
import { $pagination } from "@shared/types";

export type CoursePackage = z.infer<typeof $coursePackage>;
export type CourseFromCoursePackage = z.infer<typeof $courseFromCoursePackage>;
export type CourseDiscount = z.infer<typeof $courseDiscount>;

export type GetCoursePackagesResponse = z.infer<typeof $getCoursePackagesResponse>;

export const $courseFromCoursePackage = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    price: z.number(),
    isPurchased: z.boolean(),
});

export const $courseDiscount = z
    .object({
        isActive: z.boolean(),
        type: z.string(),
        value: z.number(),
        from: z.string().datetime().nullable(),
        to: z.string().datetime().nullable(),
    })
    .nullable();

export const $coursePackage = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    courses: z.object({
        data: z.array($courseFromCoursePackage),
        meta: z.object({
            pagination: $pagination,
        }),
    }),
    price: z.number(),
    isDiscount: z.boolean(),
    discount: $courseDiscount,
    isPurchased: z.boolean(),
});

export const $getCoursePackagesResponse = z.object({
    data: z.array($coursePackage),
    meta: z.object({
        pagination: $pagination,
    }),
});
