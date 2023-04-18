import { z } from "zod";
import { MRT_SortingState } from "mantine-react-table";
import { $pagination } from "@shared/types";

export type AdminCategory = z.infer<typeof $adminCategory>;

export type GetAdminCategoriesResponse = z.infer<typeof $getAdminCategoriesResponse>;
export type UpdateAdminCategoryRequest = z.infer<typeof $updateAdminCategoryRequest>;
export type CreateAdminCategoryRequest = z.infer<typeof $createAdminCategoryRequest>;
export interface GetAdminCategoriesRequest {
    sorting?: MRT_SortingState;
    perPage: number;
    page: number;
    query?: string;
    filter?: {
        hasParent?: "0" | "1";
        parentId?: string;
    };
}

export const $adminCategory = z.object({
    id: z.number(),
    name: z.string(),
    subCategories: z.number(),
    createdAt: z.string().datetime(),
    isActive: z.boolean(),
});

export const $getAdminCategoriesResponse = z.object({
    data: z.array($adminCategory),
    meta: z.object({
        pagination: $pagination,
    }),
});
export const $updateAdminCategoryRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    parentId: z.number().optional(),
});

export const $createAdminCategoryRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
    parentId: z.number().optional(),
});
