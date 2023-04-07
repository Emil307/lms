import { z } from "zod";

export const $role = z.object({
    id: z.number(),
    name: z.string(),
    displayName: z.string(),
});
