import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type Discount = z.infer<typeof $discount>;
export type AdminArticlePackageCategory = z.infer<typeof $adminArticlePackageCategory>;
export type AdminArticlePackageTag = z.infer<typeof $adminArticlePackageTag>;
export type AdminArticlePackage = z.infer<typeof $adminArticlePackage>;
export type AdminArticlePackageDetails = z.infer<typeof $adminArticlePackageDetails>;
export type AdminArticleFromArticlePackage = z.infer<typeof $adminArticleFromArticlePackage>;
export type ResourceOption = z.infer<typeof $resourceOption>;

export type AdminArticlePackagesFilters = z.infer<typeof $adminArticlePackagesFilters>;
export type AdminArticlesFromArticlePackageFilters = z.infer<typeof $adminArticlesFromArticlePackageFilters>;

export type GetAdminArticlePackagesRequestParams = TRequestFilterParams<AdminArticlePackagesFilters>;
export type GetAdminArticlesFromArticlePackageRequestParams = TRequestFilterParams<AdminArticlesFromArticlePackageFilters>;

export type GetAdminArticlePackagesResponse = z.infer<typeof $getAdminArticlePackagesResponse>;
export type GetAdminArticlePackagesResourceResponse = z.infer<typeof $getAdminArticlePackagesResourceResponse>;
export type CreateAdminArticlePackageRequest = z.infer<typeof $createAdminArticlePackageRequest>;
export type UpdateAdminArticlePackageRequest = z.infer<typeof $updateAdminArticlePackageRequest>;
export type GetAdminArticlesFromArticlePackageResponse = z.infer<typeof $getAdminArticlesFromArticlePackageResponse>;
export type DeleteAdminArticleFromPackageRequest = z.infer<typeof $deleteAdminArticleFromPackageRequest>;

export const $discount = z.object({
    type: z.literal("percentage").or(z.literal("currency")).optional(),
    amount: z.number().optional(),
    startingDate: z.coerce.date().nullable(),
    finishingDate: z.coerce.date().nullable(),
});

export const $resourceOption = z.object({
    id: z.number(),
    name: z.string(),
});

export const $adminArticlePackageCategory = z.object({
    id: z.number(),
    name: z.string(),
});

export const $adminArticlePackageTag = z.object({
    id: z.number(),
    name: z.string(),
});

export const $adminArticlePackage = z.object({
    id: z.number(),
    name: z.string(),
    fullPrice: z.number(),
    discountPrice: z.number().nullable(),
    createdAt: z.coerce.date(),
    discount: $discount.nullable(),
    categories: $adminArticlePackageCategory.array(),
});

export const $adminArticlePackageDetails = $adminArticlePackage.extend({
    tags: $adminArticlePackageTag.array(),
});

export const $adminArticleFromArticlePackage = z.object({
    id: z.number(),
    name: z.string(),
    courses: z.object({ id: z.number(), name: z.string() }).array(),
    category: z.object({ id: z.number(), name: z.string() }),
    subcategory: z.object({ id: z.number(), name: z.string() }),
});

export const $getAdminArticlesFromArticlePackageResponse = $getPaginationResponseType($adminArticleFromArticlePackage);

export const $getAdminArticlePackagesResponse = $getPaginationResponseType($adminArticlePackage);

export const $adminArticlePackagesFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    categoryId: z.string(),
    createdAt: z.string().datetime(),
    //TODO: Добавить фильтра периоды действий
});

export const $adminArticlesFromArticlePackageFilters = z.object({
    articlePackageId: z.string(),
});

export const $getAdminArticlePackagesResourceResponse = z.object({
    categories: $resourceOption.array(),
    tags: $resourceOption.array(),
});

export const $createAdminArticlePackageRequest = z.object({
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
    discount: z
        .object({
            type: z.literal("percentage").or(z.literal("currency")),
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

export const $updateAdminArticlePackageRequest = $createAdminArticlePackageRequest;

export const $deleteAdminArticleFromPackageRequest = z.object({
    articlePackageId: z.string(),
    articleId: z.number(),
});
