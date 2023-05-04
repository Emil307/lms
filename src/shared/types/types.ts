import { z, ZodTypeAny } from "zod";
import { FormikValues } from "formik";

export interface TRouterQueries {
    id: string;
}

export interface FormErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}

const $sortOrder = z.literal("asc").or(z.literal("desc"));
const $sortRequest = z.record(z.string(), $sortOrder);
const $defaultRequestParams = z.object({
    sort: $sortRequest.optional(),
    perPage: z.number(),
    page: z.number(),
});

export const $pagination = z.object({
    count: z.number(),
    currentPage: z.number(),
    links: z.object({
        next: z.string().nullish(),
        previous: z.string().nullish(),
    }),
    perPage: z.number(),
    total: z.number(),
    totalPages: z.number(),
});

export type TSortOrder = z.infer<typeof $sortOrder>;
export type TDefaultRequestParams = z.infer<typeof $defaultRequestParams>;
export type TPagination = z.infer<typeof $pagination>;

export type TRequestFilterParams<T extends FormikValues> = TDefaultRequestParams & Partial<T>;

export const $defaultMeta = z.object({
    pagination: $pagination,
});

export function $getPaginationResponseType<T extends ZodTypeAny>(data: T) {
    return z.object({
        data: data.array(),
        pagination: $pagination,
    });
}
