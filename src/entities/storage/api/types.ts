import { z } from "zod";
import { $getPaginationResponseType, TRequestFilterParams } from "@shared/types";

export type UploadFileType = "avatar" | "image" | "video" | "document";
export type UploadedMaterialFileDetails = z.infer<typeof $UploadedMaterialFileDetails>;
export type UploadedMaterialFile = z.infer<typeof $UploadedMaterialFile>;
export type MaterialCategory = z.infer<typeof $MaterialCategory>;
export type ResourceOption = z.infer<typeof $ResourceOption>;
export type ResourceFileTypeOption = z.infer<typeof $ResourceFileTypeOption>;

export type MaterialsFilters = z.infer<typeof $MaterialsFilters>;

export type GetMaterialsRequestParams = TRequestFilterParams<MaterialsFilters>;

export type UploadFileRequest = z.infer<typeof $UploadFileRequest>;
export type GetUploadedFilesResponse = z.infer<typeof $getUploadedFilesResponse>;
export type GetUploadedFileResourceResponse = z.infer<typeof $GetUploadedFileResourceResponse>;
export type UpdateUploadedFileActivityRequest = z.infer<typeof $UpdateUploadedFileActivityRequest>;
export type UpdateUploadedFilesRequest = z.infer<typeof $UpdateUploadedFilesRequest>;

export const $UploadFileRequest = z.object({
    file: z.any(),
    name: z.string().optional(),
    visibility: z.string().optional(),
    educational: z.boolean().optional(),
});

export const $MaterialCategory = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
    parentId: z.number().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const $UploadedMaterialFileDetails = z.object({
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
    categories: $MaterialCategory.pick({ name: true }).array(),
});

export const $UploadedMaterialFile = $UploadedMaterialFileDetails.omit({ size: true });

export const $MaterialsFilters = z.object({
    isActive: z.literal("1").or(z.literal("0")).or(z.literal("")),
    query: z.string(),
    categoryIds: z.string(),
    type: z.string(),
    createdAt: z.string(),
});

export const $ResourceOption = z.object({
    id: z.number(),
    name: z.string(),
});

export const $ResourceFileTypeOption = z.object({
    name: z.string(),
    type: z.string(),
});

export const $getUploadedFilesResponse = $getPaginationResponseType($UploadedMaterialFile);

export const $GetUploadedFileResourceResponse = z.object({
    categories: $ResourceOption.array(),
    types: $ResourceFileTypeOption.array(),
});

export const $UpdateUploadedFileActivityRequest = z.object({
    status: z.boolean(),
});

export const $UpdateUploadedFilesRequest = z.object({
    files: $ResourceOption.array(),
    categoryIds: z.number().array(),
});
