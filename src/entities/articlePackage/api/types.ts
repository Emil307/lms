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

/**
 *
 * USER TYPES
 *
 */
export type ArticlePackageCategory = z.infer<typeof $ArticlePackageCategory>;
export type ArticlePackageFromList = z.infer<typeof $ArticlePackageFromList>;

//REQ/RSP
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
            categoryIds: z.string(),
            createdAt: $getDateObjectType(z.literal("range")),
            "discount.finishingDate": $getMultiValueObjectType(z.string(), z.literal("lte")),
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
    discountFinishingDate: z.coerce.date().nullable(),
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

/**
 *
 * USER ZOD
 *
 */
export const $ArticlePackageCategory = z.object({
    id: z.number(),
    name: z.string(),
    articlesCount: z.number(),
});

export const $ArticlePackageFromList = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    fullPrice: z.number(),
    discountPrice: z.number().nullable(),
    articlesCount: z.number(),
    discount: $Discount.nullable(),
    categories: $ArticlePackageCategory.array(),
});

export const $GetArticlePackagesResponse = $getPaginationResponseType($ArticlePackageFromList);
