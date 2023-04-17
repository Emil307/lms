import { z } from "zod";
import { $getPaginationResponseType } from "@shared/types";
import { $course } from "@entities/course";

export type CoursePackage = z.infer<typeof $coursePackage>;
export type CourseFromCoursePackage = z.infer<typeof $courseFromCoursePackage>;
export type CourseDiscount = z.infer<typeof $courseDiscount>;

export type GetCoursePackagesResponse = z.infer<typeof $getCoursePackagesResponse>;
export type GetCoursePackageResponse = z.infer<typeof $getCoursePackageResponse>;

export const $file = z.object({
    name: z.string(),
    path: z.string(),
    type: z.string(),
    size: z.number(),
});

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
    courses: $getPaginationResponseType($courseFromCoursePackage),
    price: z.number(),
    isDiscount: z.boolean(),
    discount: $courseDiscount,
    isPurchased: z.boolean(),
});

export const $getCoursePackageResponse = z.object({
    id: z.number(),
    name: z.string(),
    picture: $file,
    description: z.string(),
    courses: $getPaginationResponseType($course),
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
});

export const $getCoursePackagesResponse = $getPaginationResponseType($coursePackage);
