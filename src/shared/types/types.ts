import { z } from "zod";

export interface FormErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}

export interface TPaginationResponse<T> {
    data: T;
    meta: {
        pagination: Pagination;
    };
}

export type Pagination = z.infer<typeof $pagination>;

export const $pagination = z.object({
    count: z.number(),
    current_page: z.number(),
    links: z.object({
        next: z.string().nullish(),
        previous: z.string().nullish(),
    }),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
});
