import { z } from "zod";

export const $paginationResponse = z.object({
    pagination: z.object({
        count: z.number(),
        current_page: z.number(),
        links: z.object({
            next: z.string().nullish(),
            previous: z.string().nullish(),
        }),
        per_page: z.number(),
        total: z.number(),
        total_pages: z.number(),
    }),
});
