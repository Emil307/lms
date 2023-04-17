import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type AdminTag = z.infer<typeof $adminTag>;

export type TagsFilters = z.infer<typeof $tagsFilters>;

export type GetAdminTagsRequest = TRequestFilterParams<TagsFilters>;
export type GetAdminTagsResponse = z.infer<typeof $getAdminTagsResponse>;
export type UpdateAdminTagRequest = z.infer<typeof $updateAdminTagRequest>;
export type CreateAdminTagRequest = z.infer<typeof $createAdminTagRequest>;

export const $adminTag = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string().datetime(),
});

export const $getAdminTagsResponse = $getPaginationResponseType($adminTag);
export const $updateAdminTagRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
});

export const $createAdminTagRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
});

export const $tagsFilters = z.object({
    query: z.string(),
});
