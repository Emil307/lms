import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type AdminCategory = z.infer<typeof $adminCategory>;

export type CategoriesFilters = z.infer<typeof $categoriesFilters>;
export type SubCategoriesFilters = z.infer<typeof $subCategoriesExtraFilters>;

export type GetAdminCategoriesRequest = TRequestFilterParams<CategoriesFilters & { isActive?: boolean }>;
export type GetAdminSubCategoriesRequest = TRequestFilterParams<SubCategoriesFilters>;
export type GetAdminCategoriesResponse = z.infer<typeof $getAdminCategoriesResponse>;
export type UpdateAdminCategoryRequest = z.infer<typeof $updateAdminCategoryRequest>;
export type CreateAdminCategoryRequest = z.infer<typeof $createAdminCategoryRequest>;

const $subCategoriesExtraFilters = z.object({
    parentId: z.string(),
});

export const $categoriesFilters = z.object({
    query: z.string(),
});

export const $adminCategory = z.object({
    id: z.number(),
    name: z.string(),
    subCategoriesCount: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    isActive: z.boolean(),
});

export const $getAdminCategoriesResponse = $getPaginationResponseType($adminCategory);
export const $updateAdminCategoryRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    parentId: z.number().optional(),
});

export const $createAdminCategoryRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    parentId: z.number().optional(),
});
