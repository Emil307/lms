import { z } from "zod";
import { $Discount, $UploadedFile, $getFiltersRequestType, $getMultiValueObjectType, $getPaginationResponseType } from "@shared/types";
import { $Course } from "@entities/course";

export type CoursePackage = z.infer<typeof $CoursePackage>;
export type CoursePackageDetail = z.infer<typeof $CoursePackageDetail>;
export type CourseFromCoursePackage = z.infer<typeof $CourseFromCoursePackage>;

export type CoursePackagesFiltersForm = z.infer<typeof $CoursePackagesFiltersForm>;

export type GetCoursePackagesRequest = z.infer<typeof $GetCoursePackagesRequest>;
export type GetCoursePackagesResponse = z.infer<typeof $GetCoursePackagesResponse>;

export const $CourseFromCoursePackage = $Course
    .omit({
        cover: true,
        category: true,
        discount: true,
    })
    .extend({
        isActive: z.boolean(),
        isDemonstrative: z.boolean(),
        isFulfillment: z.boolean(),
        hasDiscount: z.boolean(),
        hasAuthors: z.boolean(),
        hasTeachers: z.boolean(),
        finishingDate: z.coerce.date(),
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date(),
    });

export const $CoursePackage = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    cover: $UploadedFile.nullable(),
    discount: $Discount.nullable(),
    courses: $CourseFromCoursePackage.array(),
});

export const $CoursePackageDetail = $CoursePackage.extend({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    isActive: z.boolean(),
    hasDiscount: z.boolean(),
    coursesCount: z.number(),
});

export const $GetCoursePackagesResponse = $getPaginationResponseType($CoursePackage);

export const $CoursePackagesRequest = z.object({
    filter: z
        .object({
            id: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});

export const $GetCoursePackagesRequest = $getFiltersRequestType($CoursePackagesRequest).partial();

export const $CoursePackagesFiltersForm = z.object({
    exceptionCoursePackageId: z.string().optional(),
});
