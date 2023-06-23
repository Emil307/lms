import { z } from "zod";
import { $LastUpdated, $UploadedFile, $getPaginationResponseType, TDefaultRequestParams } from "@shared/types";

/**
 *
 * ADMIN TYPES
 *
 */
export type AdminStaticReview = z.infer<typeof $AdminStaticReview>;
export type AdminStaticReviewFromList = z.infer<typeof $AdminStaticReviewFromList>;

//REQ/RESP
export type GetAdminStaticReviewRequest = z.infer<typeof $GetAdminStaticReviewRequest>;
export type GetAdminStaticReviewResponse = z.infer<typeof $GetAdminStaticReviewResponse>;
export type GetAdminStaticReviewsRequest = TDefaultRequestParams;
export type GetAdminStaticReviewsResponse = z.infer<typeof $GetAdminStaticReviewsResponse>;
export type CreateAdminStaticReviewRequest = z.infer<typeof $CreateAdminStaticReviewRequest>;
export type CreateAdminStaticReviewResponse = z.infer<typeof $CreateAdminStaticReviewResponse>;
export type UpdateAdminStaticReviewRequest = z.infer<typeof $UpdateAdminStaticReviewRequest>;
export type UpdateAdminStaticReviewResponse = z.infer<typeof $UpdateAdminStaticReviewResponse>;
export type UpdateStaticReviewActivityRequest = z.infer<typeof $UpdateStaticReviewActivityRequest>;
export type UpdateStaticReviewActivityResponse = z.infer<typeof $UpdateStaticReviewActivityResponse>;
export type DeleteStaticReviewRequest = z.infer<typeof $DeleteStaticReviewRequest>;
export type DeleteStaticReviewResponse = z.infer<typeof $DeleteStaticReviewResponse>;

/**
 *
 * USER TYPES
 *
 */
export type StaticReview = z.infer<typeof $StaticReview>;
export type StaticReviewFromList = z.infer<typeof $StaticReviewFromList>;

//REQ/RESP
export type GetStaticReviewRequest = z.infer<typeof $GetStaticReviewRequest>;
export type GetStaticReviewResponse = z.infer<typeof $GetStaticReviewResponse>;
export type GetStaticReviewsRequest = TDefaultRequestParams;
export type GetStaticReviewsResponse = z.infer<typeof $GetStaticReviewsResponse>;

/**
 *
 * ADMIN ZOD
 *
 */

export const $AdminStaticReview = z.object({
    id: z.number(),
    authorAvatar: $UploadedFile.nullable(),
    authorIsActive: z.boolean(),
    content: z.string(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    position: z.string().nullable(),
    isActive: z.boolean(),
    preview: $UploadedFile.nullable(), //TODO:
    quote: z.string().nullable(),
    video: $UploadedFile.nullable(), //TODO:
    lastUpdated: $LastUpdated.nullable(),
});

export const $AdminStaticReviewFromList = $AdminStaticReview.pick({
    id: true,
    authorIsActive: true,
    firstName: true,
    lastName: true,
    position: true,
    content: true,
    quote: true,
    isActive: true,
    video: true,
    authorAvatar: true,
    preview: true,
});

export const $GetAdminStaticReviewsResponse = $getPaginationResponseType($AdminStaticReviewFromList);

export const $GetAdminStaticReviewRequest = z.object({
    id: z.string(),
});

export const $GetAdminStaticReviewResponse = $AdminStaticReview;

export const $CreateAdminStaticReviewRequest = z.object({
    isActive: z.boolean(),
    videoId: z.number().optional(),
    previewId: z.number().optional(),
    content: z.string(),
    authorIsActive: z.boolean(),
    authorAvatarId: z.number().optional(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    position: z.string().optional(),
    quote: z.string().optional(),
});

export const $CreateAdminStaticReviewResponse = $AdminStaticReview;

export const $UpdateAdminStaticReviewRequest = $CreateAdminStaticReviewRequest.extend({
    id: z.string(),
});

export const $UpdateAdminStaticReviewResponse = $AdminStaticReview;

export const $UpdateStaticReviewActivityRequest = z.object({
    id: z.number(),
    isActive: z.boolean(),
});

export const $UpdateStaticReviewActivityResponse = z.object({
    isActive: z.boolean(),
});

export const $DeleteStaticReviewRequest = z.object({
    id: z.string(),
});

export const $DeleteStaticReviewResponse = z.null();

/**
 *
 * USER ZOD
 *
 */
export const $StaticReview = z.object({
    id: z.number(),
    authorIsActive: z.boolean(),
    firstName: z.string(),
    lastName: z.string(),
    position: z.string(),
    content: z.string(),
    quote: z.string(),
    isActive: z.boolean(),
    video: $UploadedFile,
    authorAvatar: $UploadedFile.nullable(),
    preview: $UploadedFile,
});

export const $StaticReviewFromList = $StaticReview;

export const $GetStaticReviewsResponse = $getPaginationResponseType($StaticReviewFromList);

export const $GetStaticReviewRequest = z.object({
    id: z.string(),
});

export const $GetStaticReviewResponse = $StaticReview;
