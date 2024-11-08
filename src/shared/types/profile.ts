import { z } from "zod";
import { $UploadedFile } from "./file";

export const $Profile = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string().nullable(),
    avatar: $UploadedFile.nullable(),
    description: z.string().nullable(),
    additionalImage: $UploadedFile.nullable().optional(),
});

export type TProfile = z.infer<typeof $Profile>;
