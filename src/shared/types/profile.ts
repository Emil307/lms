import { z } from "zod";
import { $uploadedFile } from "@shared/ui";

export const $profile = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string().nullable(),
    patronymic: z.string().nullable(),
    avatar: $uploadedFile.nullable(),
    description: z.string().nullable(),
});

export type TProfile = z.infer<typeof $profile>;
