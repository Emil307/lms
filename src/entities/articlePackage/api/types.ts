import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type Discount = z.infer<typeof $Discount>;
export type AdminArticlePackageCategory = z.infer<typeof $AdminArticlePackageCategory>;
export type AdminArticlePackageTag = z.infer<typeof $AdminArticlePackageTag>;
export type AdminArticlePackage = z.infer<typeof $AdminArticlePackage>;
export type AdminArticlePackageDetails = z.infer<typeof $AdminArticlePackageDetails>;
export type AdminArticleFromArticlePackage = z.infer<typeof $AdminArticleFromArticlePackage>;
export type ResourceOption = z.infer<typeof $ResourceOption>;

export type AdminArticlePackagesFilters = z.infer<typeof $AdminArticlePackagesFilters>;
export type AdminArticlesFromArticlePackageFilters = z.infer<typeof $AdminArticlesFromArticlePackageFilters>;

export type GetAdminArticlePackagesRequestParams = TRequestFilterParams<AdminArticlePackagesFilters>;
export type GetAdminArticlesFromArticlePackageRequestParams = TRequestFilterParams<AdminArticlesFromArticlePackageFilters>;

export type GetAdminArticlePackagesResponse = z.infer<typeof $GetAdminArticlePackagesResponse>;
export type GetAdminArticlePackagesResourceResponse = z.infer<typeof $GetAdminArticlePackagesResourceResponse>;
export type CreateAdminArticlePackageRequest = z.infer<typeof $CreateAdminArticlePackageRequest>;
export type UpdateAdminArticlePackageRequest = z.infer<typeof $UpdateAdminArticlePackageRequest>;
export type GetAdminArticlesFromArticlePackageResponse = z.infer<typeof $GetAdminArticlesFromArticlePackageResponse>;
export type DeleteAdminArticleFromPackageRequest = z.infer<typeof $DeleteAdminArticleFromPackageRequest>;
export type UpdateActivityStatusArticlePackageRequest = z.infer<typeof $UpdateActivityStatusArticlePackageRequest>;
export type UpdateActivityStatusArticlePackageResponse = z.infer<typeof $UpdateActivityStatusArticlePackageResponse>;

export const $Discount = z.object({
    type: z.literal("percentage").or(z.literal("currency")).optional(),
    amount: z.number().optional(),
    startingDate: z.coerce.date().nullable(),
    finishingDate: z.coerce.date().nullable(),
});

export const $ResourceOption = z.object({
    id: z.number(),
    name: z.string(),
});

export const $AdminArticlePackageCategory = z.object({
    id: z.number(),
    name: z.string(),
});

export const $AdminArticlePackageTag = z.object({
    id: z.number(),
    name: z.string(),
});

export const $AdminArticlePackage = z.object({
    id: z.number(),
    name: z.string(),
    fullPrice: z.number(),
    discountPrice: z.number().nullable(),
    createdAt: z.coerce.date(),
    discount: $Discount.nullable(),
    categories: $AdminArticlePackageCategory.array(),
    isActive: z.boolean(),
});

export const $AdminArticlePackageDetails = $AdminArticlePackage.extend({
    tags: $AdminArticlePackageTag.array(),
});

export const $AdminArticleFromArticlePackage = z.object({
    id: z.number(),
    name: z.string(),
    courses: z.object({ id: z.number(), name: z.string() }).array(),
    category: z.object({ id: z.number(), name: z.string() }),
    subcategory: z.object({ id: z.number(), name: z.string() }),
});

export const $GetAdminArticlesFromArticlePackageResponse = $getPaginationResponseType($AdminArticleFromArticlePackage);

export const $GetAdminArticlePackagesResponse = $getPaginationResponseType($AdminArticlePackage);

export const $AdminArticlePackagesFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    categoryId: z.string(),
    createdAt: z.string().datetime(),
    //TODO: Добавить фильтра периоды действий
});

export const $AdminArticlesFromArticlePackageFilters = z.object({
    articlePackageId: z.string(),
});

export const $GetAdminArticlePackagesResourceResponse = z.object({
    categories: $ResourceOption.array(),
    tags: $ResourceOption.array(),
});

export const $CreateAdminArticlePackageRequest = z.object({
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

export const $UpdateAdminArticlePackageRequest = $CreateAdminArticlePackageRequest;

export const $DeleteAdminArticleFromPackageRequest = z.object({
    articlePackageId: z.string(),
    articleId: z.number(),
});

export const $UpdateActivityStatusArticlePackageRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateActivityStatusArticlePackageResponse = z.object({
    isActive: z.boolean(),
});
