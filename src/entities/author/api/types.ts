import { z } from "zod";
import { $LastUpdated, $UploadedFile, $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";

export type AdminAuthor = z.infer<typeof $AdminAuthor>;
export type AdminAuthorFromList = z.infer<typeof $AdminAuthorFromList>;

//FILTERS
export type AdminAuthorsFiltersForm = z.infer<typeof $AdminAuthorsFiltersForm>;

//REQ/RESP
export type GetAdminAuthorsRequest = z.infer<typeof $GetAdminAuthorsRequest>;
export type GetAdminAuthorsResponse = z.infer<typeof $GetAdminAuthorsResponse>;
export type GetAdminAuthorRequest = z.infer<typeof $GetAdminAuthorRequest>;
export type GetAdminAuthorResponse = z.infer<typeof $GetAdminAuthorResponse>;
export type CreateAuthorRequest = z.infer<typeof $CreateAuthorRequest>;
export type CreateAuthorResponse = z.infer<typeof $CreateAuthorResponse>;
export type UpdateAuthorRequest = z.infer<typeof $UpdateAuthorRequest>;
export type UpdateAuthorResponse = z.infer<typeof $UpdateAuthorResponse>;
export type UpdateAuthorActivityRequest = z.infer<typeof $UpdateAuthorActivityRequest>;
export type UpdateAuthorActivityResponse = z.infer<typeof $UpdateAuthorActivityResponse>;
export type DeleteAuthorRequest = z.infer<typeof $DeleteAuthorRequest>;
export type DeleteAuthorResponse = z.infer<typeof $DeleteAuthorResponse>;

export const $AdminAuthor = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().nullish(),
    description: z.string().nullish(),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    avatar: $UploadedFile.nullable(),
    lastUpdated: $LastUpdated.nullable(),
});

export const $AdminAuthorFromList = $AdminAuthor.pick({
    id: true,
    firstName: true,
    lastName: true,
    patronymic: true,
    isActive: true,
    createdAt: true,
});

export const $GetAdminAuthorsResponse = $getPaginationResponseType($AdminAuthorFromList);

export const $AdminAuthorsFiltersForm = z.object({
    query: z.string(),
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
});

export const $AdminAuthorsRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.boolean(),
        })
        .partial(),
});

export const $GetAdminAuthorsRequest = $getFiltersRequestType($AdminAuthorsRequest);

export const $GetAdminAuthorRequest = z.object({
    id: z.string(),
});

export const $GetAdminAuthorResponse = $AdminAuthor;

export const $CreateAuthorRequest = z.object({
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().nullish(),
    description: z.string().nullish(),
    isActive: z.boolean(),
    avatarId: z.number().nullable(),
});

export const $CreateAuthorResponse = $AdminAuthor;

export const $UpdateAuthorRequest = $CreateAuthorRequest.extend({
    id: z.string(),
});

export const $UpdateAuthorResponse = $AdminAuthor;

export const $UpdateAuthorActivityRequest = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

export const $UpdateAuthorActivityResponse = z.object({
    isActive: z.boolean(),
});

export const $DeleteAuthorRequest = z.object({
    id: z.string(),
});

export const $DeleteAuthorResponse = z.null();
