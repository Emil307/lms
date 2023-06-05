import { z } from "zod";
import { $getFiltersRequestType, $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type AdminCategory = z.infer<typeof $AdminCategory>;

export type CategoriesFilters = z.infer<typeof $CategoriesFilters>;
export type SubCategoriesFilters = z.infer<typeof $SubCategoriesExtraFilters>;

export type GetAdminCategoriesRequest = TRequestFilterParams<CategoriesFilters & { isActive?: boolean }>;
export type GetAdminSubCategoriesPaginateRequest = z.infer<typeof $GetAdminSubCategoriesPaginateRequest>;
export type GetAdminSubCategoriesRequest = z.infer<typeof $GetAdminSubCategoriesRequest>;
export type GetAdminSubCategoriesPaginateResponse = z.infer<typeof $GetAdminSubCategoriesPaginateResponse>;
export type GetAdminSubCategoriesResponse = z.infer<typeof $GetAdminSubCategoriesResponse>;
export type GetAdminCategoriesResponse = z.infer<typeof $GetAdminCategoriesResponse>;
export type UpdateAdminCategoryRequest = z.infer<typeof $UpdateAdminCategoryRequest>;
export type CreateAdminCategoryRequest = z.infer<typeof $CreateAdminCategoryRequest>;
export type UpdateCategoryActivityRequest = z.infer<typeof $UpdateCategoryActivityRequest>;
export type UpdateCategoryActivityResponse = z.infer<typeof $UpdateCategoryActivityResponse>;

/**
 *
 * USER TYPES
 *
 */
export type Category = z.infer<typeof $Category>;

//REQ/RESP
export type GetCategoryResponse = z.infer<typeof $GetCategoryResponse>;

const $SubCategoriesExtraFilters = z.object({
    parentId: z.string(),
});

export const $CategoriesFilters = z.object({
    query: z.string(),
});

export const $AdminCategory = z.object({
    id: z.number(),
    name: z.string(),
    subCategoriesCount: z.number().optional(),
    createdAt: z.coerce.date(),
    isActive: z.boolean(),
});

export const $GetAdminCategoriesResponse = $getPaginationResponseType($AdminCategory);
export const $GetAdminSubCategoriesPaginateResponse = $GetAdminCategoriesResponse;

export const $AdminSubCategoriesFiltersRequest = z.object({
    filter: z
        .object({
            parentId: z.string(),
        })
        .partial(),
    paginate: z.boolean(),
});

export const $GetAdminSubCategoriesRequest = $AdminSubCategoriesFiltersRequest;
export const $GetAdminSubCategoriesResponse = z.array($AdminCategory);

export const $GetAdminSubCategoriesPaginateRequest = $getFiltersRequestType($AdminSubCategoriesFiltersRequest);

export const $UpdateAdminCategoryRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    parentId: z.number().optional(),
});

export const $CreateAdminCategoryRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    isActive: z.boolean().optional(),
    parentId: z.number().optional(),
});

export const $UpdateCategoryActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateCategoryActivityResponse = z.object({
    isActive: z.boolean(),
});

export const $Category = z.object({
    id: z.number(),
    name: z.string(),
    parent: z
        .object({
            id: z.number(),
            name: z.string(),
            isActive: z.boolean(),
            parentId: z.number().nullable(),
            createdAt: z.coerce.date(),
            updatedAt: z.coerce.date(),
        })
        .nullable(),
});

export const $GetCategoryResponse = $Category;
