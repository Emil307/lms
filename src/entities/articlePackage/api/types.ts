import { z } from "zod";
import {
    $Discount,
    $DiscountType,
    $LastUpdated,
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $getPaginationResponseType,
} from "@shared/types";

/**
 *
 * ADMIN TYPES
 *
 */

export type AdminArticlePackageCategory = z.infer<typeof $AdminArticlePackageCategory>;
export type AdminArticlePackageTag = z.infer<typeof $AdminArticlePackageTag>;
export type AdminArticlePackage = z.infer<typeof $AdminArticlePackage>;
export type AdminArticlePackageFromList = z.infer<typeof $AdminArticlePackageFromList>;
export type AdminArticleFromArticlePackage = z.infer<typeof $AdminArticleFromArticlePackage>;
//students <-> articlePackage
export type AdminStudentArticlePackageFromList = z.infer<typeof $AdminStudentArticlePackageFromList>;

//FILTERS
export type AdminArticlePackagesFiltersForm = z.infer<typeof $AdminArticlePackagesFiltersForm>;
export type AdminArticlesFromArticlePackageExtraFilters = z.infer<typeof $AdminArticlesFromArticlePackageExtraFilters>;

//REQ/RESP
export type GetAdminArticlePackagesRequest = z.infer<typeof $GetAdminArticlePackagesRequest>;
export type GetAdminArticlePackagesResponse = z.infer<typeof $GetAdminArticlePackagesResponse>;
export type GetAdminArticlePackageResponse = z.infer<typeof $GetAdminArticlePackageResponse>;
export type GetAdminArticlePackageFiltersResponse = z.infer<typeof $GetAdminArticlePackageFiltersResponse>;
export type GetAdminArticlePackageResourcesCreateResponse = z.infer<typeof $GetAdminArticlePackageResourcesCreateResponse>;
export type CreateArticlePackageRequest = z.infer<typeof $CreateArticlePackageRequest>;
export type UpdateArticlePackageRequest = z.infer<typeof $UpdateArticlePackageRequest>;
export type UpdateArticlePackageActivityRequest = z.infer<typeof $UpdateArticlePackageActivityRequest>;
export type UpdateArticlePackageActivityResponse = z.infer<typeof $UpdateArticlePackageActivityResponse>;
export type CreateArticlePackageResponse = z.infer<typeof $CreateArticlePackageResponse>;
export type UpdateArticlePackageResponse = z.infer<typeof $UpdateArticlePackageResponse>;
export type DeleteArticleFromPackageRequest = z.infer<typeof $DeleteArticleFromPackageRequest>;
export type AttachArticleToPackageRequest = z.infer<typeof $AttachArticleToPackageRequest>;
//students <-> articlePackage
export type GetAdminStudentArticlePackagesRequest = z.infer<typeof $GetAdminStudentArticlePackagesRequest>;
export type GetAdminStudentArticlePackagesResponse = z.infer<typeof $GetAdminStudentArticlePackagesResponse>;
export type AttachArticlePackagesToStudentRequest = z.infer<typeof $AttachArticlePackagesToStudentRequest>;
export type AttachArticlePackagesToStudentResponse = z.infer<typeof $AttachArticlePackagesToStudentResponse>;
export type DeleteStudentArticlePackageRequest = z.infer<typeof $DeleteStudentArticlePackageRequest>;
export type DeleteStudentArticlePackageResponse = z.infer<typeof $DeleteStudentArticlePackageResponse>;

/**
 *
 * USER TYPES
 *
 */
export type ArticlePackageCategory = z.infer<typeof $ArticlePackageCategory>;
export type ArticlePackageFromList = z.infer<typeof $ArticlePackageFromList>;
//FILTERS
export type ArticlePackagesFiltersForm = z.infer<typeof $ArticlePackagesFiltersForm>;

//REQ/RSP
export type GetArticlePackagesRequest = z.infer<typeof $GetArticlePackagesRequest>;
export type GetArticlePackagesResponse = z.infer<typeof $GetArticlePackagesResponse>;

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminArticlePackageCategory = z.object({
    id: z.number(),
    name: z.string(),
});

export const $AdminArticlePackageTag = $AdminArticlePackageCategory;

export const $AdminArticlePackage = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
    description: z.string(),
    fullPrice: z.number(),
    discountPrice: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    hasDiscount: z.boolean(),
    discount: $Discount.nullable(),
    categories: $AdminArticlePackageCategory.array(),
    tags: $AdminArticlePackageTag.array(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $CreateArticlePackageResponse = $AdminArticlePackage;
export const $UpdateArticlePackageResponse = $AdminArticlePackage;

export const $AdminArticlePackageFromList = $AdminArticlePackage
    .pick({
        id: true,
        name: true,
        isActive: true,
        fullPrice: true,
        discountPrice: true,
        createdAt: true,
        hasDiscount: true,
        categories: true,
    })
    .extend({
        discount: $Discount
            .pick({
                startingDate: true,
                finishingDate: true,
            })
            .nullable(),
    });

export const $GetAdminArticlePackagesResponse = $getPaginationResponseType($AdminArticlePackageFromList);

export const $GetAdminArticlePackageResponse = $AdminArticlePackage;

export const $CreateArticlePackageRequest = z.object({
    name: z.string({ required_error: "Введите наименование" }),
    categories: z.number().array().min(1, "Выберите категории"),
    tags: z.number().array().min(1, "Выберите теги"),
    price: z
        .number({ required_error: "Введите стоимость" })
        .positive("Число должно быть положительным")
        .int("Число должно быть целым")
        .nullable()
        .refine((value) => value !== null, {
            message: "Введите стоимость",
        }),
    description: z.string({ required_error: "Введите описание" }),
    isActive: z.boolean(),
    hasDiscount: z.boolean(),
    discount: z
        .object({
            type: $DiscountType,
            amount: z
                .number({ required_error: "Укажите размер скидки" })
                .positive("Число должно быть положительным")
                .int("Число должно быть целым")
                .nullable()
                .refine((value) => value !== null, {
                    message: "Укажите размер скидки",
                }),
            startingDate: z.string().datetime(),
            finishingDate: z.string().datetime(),
        })
        .nullish(),
});

export const $UpdateArticlePackageRequest = $CreateArticlePackageRequest.extend({ id: z.string() });

export const $UpdateArticlePackageActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateArticlePackageActivityResponse = z.object({
    isActive: z.boolean(),
});

export const $GetAdminArticlePackageFiltersResponse = z.object({
    categories: $AdminArticlePackageCategory.array(),
    tags: $AdminArticlePackageTag.array(),
});

export const $GetAdminArticlePackageResourcesCreateResponse = $GetAdminArticlePackageFiltersResponse;

export const $AdminArticlePackagesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")),
            "categories.id": z.string(),
            createdAt: $getDateObjectType(z.literal("range")),
            userIds: $getMultiValueObjectType(z.string(), z.literal("not")),
            "discount.finishingDate": $getDateObjectType(z.literal("range")),
        })
        .partial(),
});

export const $GetAdminArticlePackagesRequest = $getFiltersRequestType($AdminArticlePackagesRequest);

export const $AdminArticlePackagesFiltersForm = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    categoryId: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
    discountFinishingDateFrom: z.coerce.date().nullable(),
    discountFinishingDateTo: z.coerce.date().nullable(),
});

export const $AdminArticlesFromArticlePackageExtraFilters = z.object({
    articlePackageIds: z.string(),
});

export const $AttachArticleToPackageRequest = z.object({
    articlePackageId: z.string(),
    articleIds: z.string().array(),
});

export const $DeleteArticleFromPackageRequest = z.object({
    articlePackageId: z.string(),
    articleId: z.number(),
});

//students <-> articlePackage
export const $AdminStudentArticlePackage = $AdminArticlePackage
    .pick({
        id: true,
        name: true,
        isActive: true,
        fullPrice: true,
        categories: true,
    })
    .extend({
        availableFrom: z.coerce.date().nullable(),
    });

export const $AdminStudentArticlePackageFromList = $AdminStudentArticlePackage;

export const $GetAdminStudentArticlePackagesResponse = $getPaginationResponseType($AdminStudentArticlePackageFromList);

export const $AdminStudentArticlePackagesRequest = z.object({
    studentId: z.string(),
});

export const $GetAdminStudentArticlePackagesRequest = $getFiltersRequestType($AdminStudentArticlePackagesRequest);

export const $AttachArticlePackagesToStudentRequest = z.object({
    studentId: z.string(),
    articlePackageIds: z.string().array(),
});

export const $AttachArticlePackagesToStudentResponse = z.null();

export const $DeleteStudentArticlePackageRequest = z.object({
    studentId: z.string(),
    articlePackageId: z.number(),
});

export const $DeleteStudentArticlePackageResponse = z.null();

/**
 *
 * USER ZOD
 *
 */
export const $ArticlePackageCategory = z.object({
    id: z.number().nullable(),
    name: z.string(),
    articlesCount: z.number(),
});

export const $ArticlePackageFromList = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    fullPrice: z.number(),
    discountPrice: z.number(),
    articlesCount: z.number(),
    discount: $Discount.nullable(),
    categories: $ArticlePackageCategory.array(),
});

export const $ArticlePackagesFiltersForm = z.object({
    query: z.string(),
    paginate: z.boolean(),
    courseIds: z.number(),
});

export const $ArticlePackagesRequest = z.object({
    query: z.string().optional(),
    paginate: z.boolean().optional(),
    filter: z
        .object({
            courseIds: z.string(),
        })
        .partial(),
});

export const $GetArticlePackagesRequest = $getFiltersRequestType($ArticlePackagesRequest);

export const $GetArticlePackagesResponse = $getPaginationResponseType($ArticlePackageFromList);

export const $ArticleFromArticlePackage = z.object({
    id: z.number(),
    name: z.string(),
    content: z.string(),
    isActive: z.boolean(),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    category: z.object({ id: z.number(), name: z.string() }),
});

export const $AdminArticleFromArticlePackage = $ArticleFromArticlePackage.extend({
    courses: z.object({ id: z.number(), name: z.string() }).array(),
    category: z.object({ id: z.number(), name: z.string() }),
    subcategory: z.object({ id: z.number(), name: z.string() }),
});

export const $GetArticlesFromArticlePackage = $getPaginationResponseType($ArticleFromArticlePackage);

export const $GetAdminArticlesFromArticlePackageResponse = $getPaginationResponseType($AdminArticleFromArticlePackage);

export const $AdminArticlesFromArticlePackageFilters = z.object({
    articlePackageId: z.string(),
});

export const $DeleteAdminArticleFromPackageRequest = z.object({
    articlePackageId: z.string(),
    articleId: z.number(),
});

export const $GetArticlesFromArticlePackageRequest = z.object({
    articlePackageId: z.number(),
    categoryId: z.number(),
    page: z.number(),
});
