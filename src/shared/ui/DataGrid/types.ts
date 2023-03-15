import { z } from "zod";
import { ZodTypeAny } from "zod/lib";

export type DefaultDataGridEntityType<T> = T extends Record<string, any> ? T : never;
export type DataGridResponse<T> = z.infer<ReturnType<typeof $DataGridResponse>> & { data: { data: T[] } };

export function $DataGridResponse<T extends ZodTypeAny>(schema: T) {
    return z.object({
        data: z.object({
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
        }),

        // data: schema.array(),
        // meta: z.object({
        //     pagination: z.object({
        //         total: z.number(),
        //         count: z.number(),
        //         per_page: z.number(),
        //         current_page: z.number(),
        //         total_pages: z.number(),
        //         links: z.object({
        //             next: z.string()
        //         })
        //     })
        // })
        // pagination: z.object({
        //     count: z.number(),
        //     currentPage: z.number(),
        //     totalPages: z.number(),
        //     total: z.number(),
        //     perPage: z.number().min(1)
        // })
    });
}
