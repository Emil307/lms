import { z } from "zod";

export type Role = z.infer<typeof $Role>;

export const $Role = z.object({
    id: z.number(),
    name: z.string(),
    displayName: z.string(),
});
