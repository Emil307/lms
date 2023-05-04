import { z } from "zod";
import { $UploadedFile } from "./uploadedFile";

export const $profile = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string().nullable(),
    patronymic: z.string().nullable(),
    avatar: $UploadedFile.nullable(),
    description: z.string().nullable(),
    additionalImage: $UploadedFile.nullable().optional(),
});

export type TProfile = z.infer<typeof $profile>;
