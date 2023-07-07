import { z } from "zod";
import {
    $UploadedFile,
    $getDateObjectType,
    $getFiltersRequestType,
    $getMultiValueObjectType,
    $getPaginationResponseType,
} from "@shared/types";

export type FileType = z.infer<typeof $FileType>;
export type UploadedFileResourceCategory = z.infer<typeof $UploadedFileResourceCategory>;
export type FileForUpdate = z.infer<typeof $FileForUpdate>;
export type MaterialType = z.infer<typeof $MaterialType>;
export type AdminUploadedFile = z.infer<typeof $AdminUploadedFile>;
export type UploadedFileFromList = z.infer<typeof $UploadedFileFromList>;

//FILTERS
export type UploadedFilesFiltersForm = z.infer<typeof $UploadedFilesFiltersForm>;
export type AdminMaterialsNoIncludedArticleFiltersForm = z.infer<typeof $AdminMaterialsNoIncludedArticleFiltersForm>;
export type AdminArticleMaterialsExtraFilters = z.infer<typeof $AdminArticleMaterialsExtraFilters>;

//REQ/RES
export type GetAdminUploadedFileResponse = z.infer<typeof $GetAdminUploadedFileResponse>;
export type UploadFileRequest = z.infer<typeof $UploadFileRequest>;
export type UploadFileResponse = z.infer<typeof $UploadFileResponse>;
export type GetUploadedFilesRequest = z.infer<typeof $GetUploadedFilesRequest>;
export type GetUploadedFilesResponse = z.infer<typeof $GetUploadedFilesResponse>;
export type GetUploadedFileResourcesResponse = z.infer<typeof $GetUploadedFileResourcesResponse>;
export type UpdateUploadedFileActivityRequest = z.infer<typeof $UpdateUploadedFileActivityRequest>;
export type UpdateUploadedFilesRequest = z.infer<typeof $UpdateUploadedFilesRequest>;
export type GetAdminMaterialsNoIncludedArticleRequest = z.infer<typeof $GetAdminMaterialsNoIncludedArticleRequest>;
export type DeleteUploadedFileRequest = z.infer<typeof $DeleteUploadedFileRequest>;
export type DeleteUploadedFileResponse = z.infer<typeof $DeleteUploadedFileResponse>;

export const $FileType = z.literal("avatar").or(z.literal("image")).or(z.literal("video")).or(z.literal("document"));
export const $MaterialType = z.literal("document").or(z.literal("video"));

export const $UploadedFileType = z.object({
    name: z.string(),
    type: z.string(),
});

export const $UploadedFileResourceCategory = z.object({
    id: z.number(),
    name: z.string(),
});

export const $FileForUpdate = $UploadedFileResourceCategory;

export const $AdminUploadedFileCategory = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
    parentId: z.number().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $AdminUploadedFile = z.object({
    id: z.number(),
    name: z.string(),
    extension: z.string(),
    //TODO: ждем как бек добавит обратно это поле
    // size: z.number(),
    absolutePath: z.string(),
    type: z.object({
        value: $FileType,
        name: z.string(),
    }),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    categories: $AdminUploadedFileCategory.array(),
}); //.partial({ type: true, isActive: true, createdAt: true,});

export const $GetAdminUploadedFileResponse = $AdminUploadedFile;

export const $UploadFileRequest = z.object({
    file: z.any(),
    name: z.string().optional(),
    visibility: z.string().optional(),
    educational: z.boolean().optional(),
});

export const $UploadedFileFromList = $AdminUploadedFile.merge(
    z.object({
        categories: z.object({ name: z.string() }).array(),
    }),
);

export const $GetUploadedFileResourcesResponse = z.object({
    categories: $UploadedFileResourceCategory.array(),
    types: $UploadedFileType.array(),
});

export const $UpdateUploadedFileActivityRequest = z.object({
    status: z.boolean(),
});

export const $UpdateUploadedFilesRequest = z.object({
    files: $FileForUpdate.array(),
    categoryIds: z.number().array(),
});

export const $GetUploadedFilesResponse = $getPaginationResponseType($UploadedFileFromList);

export const $UploadedFilesFiltersForm = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    categoryIds: z.string(),
    type: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
});

export const $UploadedFilesRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            isActive: z.literal("1").or(z.literal("0")),
            categoryIds: z.string(),
            type: z.string(),
            createdAt: $getDateObjectType(z.literal("range")),
            articleIds: z.string(),
        })
        .partial(),
});

export const $GetUploadedFilesRequest = $getFiltersRequestType($UploadedFilesRequest);

export const $AdminArticleMaterialsExtraFilters = z.object({
    articleId: z.string(),
});

export const $AdminMaterialsNoIncludedArticleFiltersForm = z.object({
    query: z.string(),
    categoryIds: z.string(),
    type: z.string(),
    createdAtFrom: z.coerce.date().nullable(),
    createdAtTo: z.coerce.date().nullable(),
});

export const $AdminMaterialsNoIncludedArticleRequest = z.object({
    query: z.string().optional(),
    filter: z
        .object({
            categoryIds: z.string(),
            "type.type": z.string(),
            createdAt: $getDateObjectType(z.literal("range")),
            articleIds: $getMultiValueObjectType(z.string(), z.literal("not")),
        })
        .partial(),
});

export const $GetAdminMaterialsNoIncludedArticleRequest = $getFiltersRequestType($AdminMaterialsNoIncludedArticleRequest);

export const $UploadFileResponse = $UploadedFile;

export const $DeleteUploadedFileRequest = z.object({
    id: z.string(),
});

export const $DeleteUploadedFileResponse = z.null();
