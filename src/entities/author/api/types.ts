import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";
import { $uploadedFile } from "@shared/ui";

export type Author = z.infer<typeof $author>;

export type AuthorsFilters = z.infer<typeof $authorsFilters>;

export type GetAuthorsRequestParams = TRequestFilterParams<AuthorsFilters>;

export type GetAuthorsResponse = z.infer<typeof $getAuthorsResponse>;
export type CreateAuthorRequest = z.infer<typeof $createAuthorRequest>;
export type UpdateAuthorRequest = z.infer<typeof $updateAuthorRequest>;
export type UpdateActivityAuthorRequest = z.infer<typeof $updateActivityAuthorRequest>;

export const $author = z.object({
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

export const $getAuthorsResponse = $getPaginationResponseType($author);

export const $createAuthorRequest = $author.omit({ id: true, createdAt: true, updatedAt: true, avatar: true }).extend({
    avatarId: z.number().nullish(),
    avatar: $uploadedFile.nullable(),
});

export const $updateAuthorRequest = $author.omit({ id: true, createdAt: true, updatedAt: true, avatar: true }).extend({
    avatarId: z.number().nullish(),
    avatar: $uploadedFile.nullable(),
});

export const $updateActivityAuthorRequest = z.object({
    id: z.string(),
    status: z.boolean(),
});

export const $authorsFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
});
