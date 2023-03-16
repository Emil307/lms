import { z } from "zod";
import { ZodTypeAny } from "zod/lib";

export type DefaultDataGridEntityType<T> = T extends Record<string, any> ? T : never;
export type DataGridResponse<T> = z.infer<ReturnType<typeof $DataGridResponse>> & { data: T[] };

export function $DataGridResponse<T extends ZodTypeAny>(schema: T) {
    return z.object({
        data: schema.array(),
        meta: z.object({
            pagination: z.object({
                total: z.number(),
                count: z.number(),
                per_page: z.number(),
                current_page: z.number(),
                total_pages: z.number(),
                links: z.object({
                    next: z.string(),
                }),
            }),
        }),
    });
}
