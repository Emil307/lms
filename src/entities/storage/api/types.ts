import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type UploadFileType = "avatar" | "image" | "video" | "document";
export type UploadedMaterialFileDetails = z.infer<typeof $uploadedMaterialFileDetails>;
export type UploadedMaterialFile = z.infer<typeof $uploadedMaterialFile>;
export type MaterialCategory = z.infer<typeof $materialCategory>;
export type ResourceOption = z.infer<typeof $resourceOption>;
export type ResourceFileTypeOption = z.infer<typeof $resourceFileTypeOption>;

export type MaterialsFilters = z.infer<typeof $materialsFilters>;

export type GetMaterialsRequestParams = TRequestFilterParams<MaterialsFilters>;

export type UploadFileRequest = z.infer<typeof $uploadFileRequest>;
export type GetUploadedFilesResponse = z.infer<typeof $getUploadedFilesResponse>;
export type GetUploadedFileResourceResponse = z.infer<typeof $getUploadedFileResourceResponse>;
export type UpdateActivityStatusUploadedFileRequest = z.infer<typeof $updateActivityStatusUploadedFileRequest>;
export type UpdateUploadedFilesRequest = z.infer<typeof $updateUploadedFilesRequest>;

export const $uploadFileRequest = z.object({
    file: z.any(),
    name: z.string().optional(),
    visibility: z.string().optional(),
    educational: z.boolean().optional(),
});

export const $materialCategory = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
    parentId: z.number().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $uploadedMaterialFileDetails = z.object({
    id: z.number(),
    name: z.string(),
    extension: z.string(),
    size: z.number(),
    absolutePath: z.string(),
    type: z.object({
        value: z.literal("video").or(z.literal("document")),
        name: z.string(),
    }),
    isActive: z.boolean(),
    createdAt: z.coerce.date(),
    categories: $materialCategory.pick({ name: true }).array(),
});

export const $uploadedMaterialFile = $uploadedMaterialFileDetails.omit({ size: true });

export const $materialsFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    categoryIds: z.string(),
    type: z.string(),
    createdAt: z.string(),
});

export const $resourceOption = z.object({
    id: z.number(),
    name: z.string(),
});

export const $resourceFileTypeOption = z.object({
    name: z.string(),
    type: z.string(),
});

export const $getUploadedFilesResponse = $getPaginationResponseType($uploadedMaterialFile);

export const $getUploadedFileResourceResponse = z.object({
    categories: $resourceOption.array(),
    types: $resourceFileTypeOption.array(),
});

export const $updateActivityStatusUploadedFileRequest = z.object({
    status: z.boolean(),
});

export const $updateUploadedFilesRequest = z.object({
    files: $resourceOption.array(),
    categoryIds: z.number().array(),
});
