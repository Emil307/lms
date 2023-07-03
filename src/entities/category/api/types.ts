import { z } from "zod";
import { $LastUpdated, $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";

/**
 *
 * ADMIN TYPES
 *
 */

// export type AdminCategory = z.infer<typeof $AdminCategory>;
export type AdminCategoryFromList = z.infer<typeof $AdminCategoryFromList>;
//subcategories
export type AdminSubCategory = z.infer<typeof $AdminSubCategory>;
export type AdminSubCategoryFromList = z.infer<typeof $AdminSubCategoryFromList>;

//FILTERS
export type AdminCategoriesFiltersForm = z.infer<typeof $AdminCategoriesFiltersForm>;
//subCategories
export type AdminSubCategoriesExtraFilters = z.infer<typeof $AdminSubCategoriesExtraFilters>;

//REQ/RESP
export type GetAdminCategoriesRequest = z.infer<typeof $GetAdminCategoriesRequest>;
export type GetAdminCategoriesResponse = z.infer<typeof $GetAdminCategoriesResponse>;
export type GetAdminCategoryRequest = z.infer<typeof $GetAdminCategoryRequest>;
export type GetAdminCategoryResponse = z.infer<typeof $GetAdminCategoryResponse>;
export type CreateAdminCategoryRequest = z.infer<typeof $CreateAdminCategoryRequest>;
export type CreateAdminCategoryResponse = z.infer<typeof $CreateAdminCategoryResponse>;
export type UpdateAdminCategoryRequest = z.infer<typeof $UpdateAdminCategoryRequest>;
export type UpdateAdminCategoryResponse = z.infer<typeof $UpdateAdminCategoryResponse>;
export type DeleteAdminCategoryRequest = z.infer<typeof $DeleteAdminCategoryRequest>;
export type DeleteAdminCategoryResponse = z.infer<typeof $DeleteAdminCategoryResponse>;
export type UpdateAdminCategoryActivityRequest = z.infer<typeof $UpdateAdminCategoryActivityRequest>;
export type UpdateAdminCategoryActivityResponse = z.infer<typeof $UpdateAdminCategoryActivityResponse>;
//subcategories
export type GetAdminSubCategoriesRequest = z.infer<typeof $GetAdminSubCategoriesRequest>;
export type GetAdminSubCategoriesResponse = z.infer<typeof $GetAdminSubCategoriesResponse>;
export type GetAdminSubCategoriesPaginateResponse = z.infer<typeof $GetAdminSubCategoriesPaginateResponse>;

/**
 *
 * USER TYPES
 *
 */
export type Category = z.infer<typeof $Category>;

//REQ/RESP
export type GetCategoryRequest = z.infer<typeof $GetCategoryRequest>;
export type GetCategoryResponse = z.infer<typeof $GetCategoryResponse>;

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminCategory = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
    parentId: z.number().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    lastUpdated: $LastUpdated.nullable(),
    subCategoriesCount: z.number(),
});

export const $AdminCategoryFromList = $AdminCategory.pick({
    id: true,
    name: true,
    isActive: true,
    createdAt: true,
    subCategoriesCount: true,
});

export const $GetAdminCategoriesResponse = $getPaginationResponseType($AdminCategoryFromList);

export const $AdminCategoriesFiltersForm = z.object({
    query: z.string(),
});

export const $AdminCategoriesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            //TODO: скорее всего этот фильтр уберем
            hasParent: z.boolean(),
            isActive: z.boolean(),
        })
        .partial(),
});

export const $GetAdminCategoriesRequest = $getFiltersRequestType($AdminCategoriesRequest);

export const $GetAdminCategoryRequest = z.object({
    id: z.string(),
});

export const $GetAdminCategoryResponse = $AdminCategory.pick({
    id: true,
    name: true,
    isActive: true,
    parentId: true,
    createdAt: true,
    updatedAt: true,
    lastUpdated: true,
});

export const $CreateAdminCategoryRequest = z.object({
    name: z.string(),
    isActive: z.boolean().optional(),
    parentId: z.number().nullable(),
});

export const $CreateAdminCategoryResponse = $AdminCategory.pick({
    id: true,
    name: true,
    isActive: true,
    parentId: true,
    createdAt: true,
    updatedAt: true,
    subCategoriesCount: true,
});

export const $UpdateAdminCategoryRequest = $CreateAdminCategoryRequest.extend({
    id: z.string(),
});

export const $UpdateAdminCategoryResponse = $AdminCategory.pick({
    id: true,
    name: true,
    isActive: true,
    parentId: true,
    createdAt: true,
    updatedAt: true,
});

export const $DeleteAdminCategoryRequest = z.object({
    id: z.string(),
});
export const $DeleteAdminCategoryResponse = z.null();

export const $UpdateAdminCategoryActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateAdminCategoryActivityResponse = z.object({
    isActive: z.boolean(),
});

//subcategories
export const $AdminSubCategory = $AdminCategory.pick({
    id: true,
    name: true,
    isActive: true,
    createdAt: true,
});

export const $AdminSubCategoryFromList = $AdminSubCategory;

export const $GetAdminSubCategoriesPaginateResponse = $getPaginationResponseType($AdminSubCategoryFromList);

export const $GetAdminSubCategoriesResponse = $AdminSubCategoryFromList.array();

export const $AdminSubCategoriesExtraFilters = z.object({
    parentId: z.string(),
});

export const $AdminSubCategoriesRequest = z.object({
    query: z.string().optional(),
    paginate: z.boolean().optional(),
    filter: z
        .object({
            parentId: z.string(),
        })
        .partial(),
});

export const $GetAdminSubCategoriesRequest = $getFiltersRequestType($AdminSubCategoriesRequest);

///OLD

/**
 *
 * USER ZOD
 *
 */

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

export const $GetCategoryRequest = z.object({
    id: z.string().optional(),
});
