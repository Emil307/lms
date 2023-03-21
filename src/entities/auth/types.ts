import { z } from "zod";

export type GetMeResponse = z.infer<typeof $getMeResponse>;

export const $getMeResponse = z.object({
    id: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    isStatic: z.boolean(),
    profile: z.object({
        data: z.object({
            id: z.number(),
            firstName: z.string(),
            lastName: z.string(),
            patronymic: z.string(),
        }),
    }),
    role: z.object({
        data: z.object({
            id: z.number(),
            name: z.string(),
        }),
    }),
});
