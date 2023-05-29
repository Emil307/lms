import { z } from "zod";
import { $UploadedFile, $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type Author = z.infer<typeof $Author>;

export type AuthorsFilters = z.infer<typeof $AuthorsFilters>;

export type GetAuthorsRequestParams = TRequestFilterParams<AuthorsFilters>;

export type GetAuthorsResponse = z.infer<typeof $GetAuthorsResponse>;
export type CreateAuthorRequest = z.infer<typeof $CreateAuthorRequest>;
export type UpdateAuthorRequest = z.infer<typeof $UpdateAuthorRequest>;
export type UpdateAuthorActivityRequest = z.infer<typeof $UpdateAuthorActivityRequest>;

export const $Author = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().nullish(),
    about: z.string().nullish(),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    avatar: z.string().optional(),
});

export const $GetAuthorsResponse = $getPaginationResponseType($Author);

export const $CreateAuthorRequest = $Author.omit({ id: true, createdAt: true, updatedAt: true, avatar: true }).extend({
    avatarId: z.number().nullish(),
    avatar: $UploadedFile.nullable(),
});

export const $UpdateAuthorRequest = $Author.omit({ id: true, createdAt: true, updatedAt: true, avatar: true }).extend({
    avatarId: z.number().nullish(),
    avatar: $UploadedFile.nullable(),
});

export const $UpdateAuthorActivityRequest = z.object({
    id: z.string(),
    status: z.boolean(),
});

export const $AuthorsFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
});
