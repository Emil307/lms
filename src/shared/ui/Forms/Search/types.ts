import { z } from "zod";

export type ManagedSelectFuncParams = z.infer<typeof $ManagedSelectFuncParams>;

const $ManagedSelectFuncParams = z.object({
    page: z.number(),
    perPage: z.number(),
    query: z.string().optional(),
    filter: z.object({
        id: z.number().optional(),
    }),
});
