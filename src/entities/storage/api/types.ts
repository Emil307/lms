import { z } from "zod";

export type UploadFileRequest = z.infer<typeof $uploadFileRequest>;

export enum FileFormat {
    "jpg",
    "rtf",
    "txt",
    "png",
    "jpeg",
    "pdf",
    "csv",
    "gif",
    "svg",
    "webp",
    "mp4",
    "zip",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "exe",
}

export enum Visibility {
    "public",
    "private",
}

export const $uploadFileRequest = z.object({
    file: z.any(), //z.instanceof(File),
    name: z.string().optional(),
    visibility: z.string().optional(), //z.nativeEnum(Visibility).optional(),
});
