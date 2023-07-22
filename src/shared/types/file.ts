import { z } from "zod";

export type FileStatus = "done" | "loading" | "error";

export type UploadedFile = z.infer<typeof $UploadedFile>;

export const $UploadedFile = z.object({
    id: z.number(),
    name: z.string(),
    extension: z.string(),
    size: z.number(),
    absolutePath: z.string(),
});
