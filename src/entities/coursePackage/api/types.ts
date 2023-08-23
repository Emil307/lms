import { z } from "zod";
import {
    $Discount,
    $DiscountType,
    $FilterType,
    $LastUpdated,
    $UploadedFile,
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $getPaginationResponseType,
} from "@shared/types";
import { $Course } from "@entities/course";

export type CoursePackage = z.infer<typeof $CoursePackage>;
export type CoursePackageDetails = z.infer<typeof $CoursePackageDetails>;
export type CourseFromCoursePackage = z.infer<typeof $CourseFromCoursePackage>;
// export type AdminCoursePackage = z.infer<typeof $AdminCoursePackage>;
export type AdminCoursePackageFromList = z.infer<typeof $AdminCoursePackageFromList>;
export type AdminCoursePackageDetails = z.infer<typeof $AdminCoursePackageDetails>;

export type AdminCoursePackagesFiltersForm = z.infer<typeof $AdminCoursePackagesFiltersForm>;
export type AdminCourseFromCoursePackageFilters = z.infer<typeof $AdminCourseFromCoursePackageFilters>;

export type CoursePackagesFiltersForm = z.infer<typeof $CoursePackagesFiltersForm>;

export type GetCoursePackagesRequest = z.infer<typeof $GetCoursePackagesRequest>;
export type GetCoursePackagesResponse = z.infer<typeof $GetCoursePackagesResponse>;
export type GetAdminCoursePackagesResponse = z.infer<typeof $GetAdminCoursePackagesResponse>;
export type GetAdminCoursePackagesRequest = z.infer<typeof $GetAdminCoursePackagesRequest>;
export type GetAdminCoursePackageResoursesRequest = z.infer<typeof $GetAdminCoursePackageResoursesRequest>;
export type GetAdminCoursePackageResoursesResponse = z.infer<typeof $GetAdminCoursePackageResoursesResponse>;
export type UpdateCoursePackageActivityRequest = z.infer<typeof $UpdateCoursePackageActivityRequest>;
export type UpdateCoursePackageActivityResponse = z.infer<typeof $UpdateCoursePackageActivityResponse>;
export type CreateCoursePackageRequest = z.infer<typeof $CreateCoursePackageRequest>;
export type UpdateCoursePackageRequest = z.infer<typeof $UpdateCoursePackageRequest>;
export type DeleteCourseFromCoursePackageRequest = z.infer<typeof $DeleteCourseFromCoursePackageRequest>;
export type AttachCourseToCoursePackageRequest = z.infer<typeof $AttachCourseToCoursePackageRequest>;

export const $CourseFromCoursePackage = $Course.pick({
    id: true,
    name: true,
    description: true,
    price: true,
    discountPrice: true,
    type: true,
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

export const $CoursePackageDetails = $CoursePackage;

export const $AdminCoursePackage = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    discountPrice: z.number(),
    createdAt: z.coerce.date(),
    isActive: z.boolean(),
    coursesCount: z.number(),
    discount: $Discount.nullable(),
});

export const $AdminCoursePackageFromList = $AdminCoursePackage;

export const $AdminCoursePackageDetails = $AdminCoursePackage.omit({ coursesCount: true }).extend({
    description: z.string(),
    updatedAt: z.coerce.date(),
    hasDiscount: z.boolean(),
    cover: $UploadedFile.nullable(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $GetCoursePackagesResponse = $getPaginationResponseType($CoursePackage);

export const $GetAdminCoursePackagesResponse = $getPaginationResponseType($AdminCoursePackage);

export const $AdminCoursePackagesFiltersForm = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    courseIds: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
    discountFinishingDateFrom: z.coerce.date().nullable(),
    discountFinishingDateTo: z.coerce.date().nullable(),
});

const $AdminCourse = z.object({
    id: z.number(),
    name: z.string(),
});

export const $AdminCoursePackagesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")),
            courseIds: $getMultiValueObjectType(z.string(), z.literal("or")),
            createdAt: $getDateObjectType(z.literal("range")),
            "discount.finishingDate": $getDateObjectType(z.literal("range")),
        })
        .partial(),
});

export const $GetAdminCoursePackagesRequest = $getFiltersRequestType($AdminCoursePackagesRequest);

export const $GetAdminCoursePackageResoursesRequest = z.object({
    type: $FilterType,
});

export const $GetAdminCoursePackageResoursesResponse = z.object({
    courses: $AdminCourse.array(),
});

export const $UpdateCoursePackageActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateCoursePackageActivityResponse = z.object({
    isActive: z.boolean(),
});

export const $CreateCoursePackageRequest = z.object({
    coverId: z.number().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number().nullable(),
    isActive: z.boolean(),
    hasDiscount: z.boolean(),
    discount: z
        .object({
            type: $DiscountType,
            amount: z.number().nullable(),
            startingDate: z.string().datetime().nullable(),
            finishingDate: z.string().datetime().nullable(),
        })
        .nullish(),
});

export const $CoursePackagesRequest = z.object({
    filter: z
        .object({
            courseIds: z.string(),
            id: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});

export const $GetCoursePackagesRequest = $getFiltersRequestType($CoursePackagesRequest).partial();

export const $CoursePackagesFiltersForm = z.object({
    exceptionCoursePackageId: z.string().optional(),
    courseId: z.string().optional(),
});
export const $UpdateCoursePackageRequest = $CreateCoursePackageRequest.extend({ id: z.string() });

export const $AdminCourseFromCoursePackageFilters = z.object({
    coursePackageId: z.string(),
});

export const $AttachCourseToCoursePackageRequest = z.object({
    coursePackageId: z.string(),
    ids: z.string().array(),
});

export const $DeleteCourseFromCoursePackageRequest = $AttachCourseToCoursePackageRequest;
