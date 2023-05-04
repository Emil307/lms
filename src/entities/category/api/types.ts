import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type AdminCategory = z.infer<typeof $AdminCategory>;

export type CategoriesFilters = z.infer<typeof $CategoriesFilters>;
export type SubCategoriesFilters = z.infer<typeof $SubCategoriesExtraFilters>;

export type GetAdminCategoriesRequest = TRequestFilterParams<CategoriesFilters & { isActive?: boolean }>;
export type GetAdminSubCategoriesRequest = TRequestFilterParams<SubCategoriesFilters>;
export type GetAdminCategoriesResponse = z.infer<typeof $GetAdminCategoriesResponse>;
export type UpdateAdminCategoryRequest = z.infer<typeof $UpdateAdminCategoryRequest>;
export type CreateAdminCategoryRequest = z.infer<typeof $CreateAdminCategoryRequest>;
export type UpdateActivityStatusCategoryRequest = z.infer<typeof $UpdateActivityStatusCategoryRequest>;
export type UpdateActivityStatusCategoryResponse = z.infer<typeof $UpdateActivityStatusCategoryResponse>;

const $SubCategoriesExtraFilters = z.object({
    parentId: z.string(),
});

export const $CategoriesFilters = z.object({
    query: z.string(),
});

export const $AdminCategory = z.object({
    id: z.number(),
    name: z.string(),
    subCategoriesCount: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    isActive: z.boolean(),
});

export const $GetAdminCategoriesResponse = $getPaginationResponseType($AdminCategory);

export const $UpdateAdminCategoryRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    parentId: z.number().optional(),
});

export const $CreateAdminCategoryRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    parentId: z.number().optional(),
});

export const $UpdateActivityStatusCategoryRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateActivityStatusCategoryResponse = z.object({
    isActive: z.boolean(),
});
