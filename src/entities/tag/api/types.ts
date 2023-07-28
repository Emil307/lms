import { z } from "zod";
import { $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";

/**
 *
 * ADMIN TYPES
 *
 */

export type AdminTag = z.infer<typeof $AdminTag>;
export type AdminTagFromList = z.infer<typeof $AdminTagFromList>;

//filters
export type TagsFilters = z.infer<typeof $TagsFilters>;

//REQ/RESP
export type GetAdminTagsRequest = z.infer<typeof $GetAdminTagsRequest>;
export type GetAdminTagsResponse = z.infer<typeof $GetAdminTagsResponse>;
export type GetAdminTagRequest = z.infer<typeof $GetAdminTagRequest>;
export type GetAdminTagResponse = z.infer<typeof $GetAdminTagResponse>;
export type CreateAdminTagRequest = z.infer<typeof $CreateAdminTagRequest>;
export type CreateAdminTagResponse = z.infer<typeof $CreateAdminTagResponse>;
export type UpdateAdminTagRequest = z.infer<typeof $UpdateAdminTagRequest>;
export type UpdateAdminTagResponse = z.infer<typeof $UpdateAdminTagResponse>;
export type DeleteAdminTagRequest = z.infer<typeof $DeleteAdminTagRequest>;
export type DeleteAdminTagResponse = z.infer<typeof $DeleteAdminTagResponse>;

/**
 *
 * USER TYPES
 *
 */

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminTag = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $AdminTagFromList = $AdminTag;

export const $GetAdminTagsResponse = $getPaginationResponseType($AdminTagFromList);

export const $AdminTagsRequest = z.object({
    query: z.string().optional(),
});

export const $GetAdminTagsRequest = $getFiltersRequestType($AdminTagsRequest);

export const $TagsFilters = z.object({
    query: z.string(),
});

export const $GetAdminTagRequest = z.object({
    id: z.string(),
});

export const $GetAdminTagResponse = $AdminTag;

export const $CreateAdminTagRequest = z.object({
    name: z.string(),
});

export const $CreateAdminTagResponse = $AdminTag;

export const $UpdateAdminTagRequest = $CreateAdminTagRequest.extend({
    id: z.string(),
});

export const $UpdateAdminTagResponse = $AdminTag;

export const $DeleteAdminTagRequest = z.object({
    id: z.string(),
});

export const $DeleteAdminTagResponse = z.null();

/**
 *
 * USER ZOD
 *
 */
