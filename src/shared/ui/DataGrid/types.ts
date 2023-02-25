import { z } from "zod";
import { ZodTypeAny } from "zod/lib";

export type DefaultDataGridEntityType<T> = T extends Record<string, any> ? T : never;
export type DataGridResponse<T> = Omit<z.infer<ReturnType<typeof $DataGridResponse>>, 'data'> & { data: T[] };

export function $DataGridResponse<T extends ZodTypeAny>(schema: T) {
    return z.object({
        data: schema.array(),
        pagination: z.object({
            count: z.number(),
            currentPage: z.number(),
            totalPages: z.number(),
            total: z.number(),
            perPage: z.number().min(1)
        })
    })
}

