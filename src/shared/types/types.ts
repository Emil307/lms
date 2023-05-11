import { z, ZodTypeAny } from "zod";
import { FormikValues } from "formik";
import { $profile } from "./profile";

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

export const $Discount = z.object({
    type: z.literal("percentage").or(z.literal("currency")).optional(),
    amount: z.number().optional(),
    startingDate: z.coerce.date().nullable(),
    finishingDate: z.coerce.date().nullable(),
});

export type TSortOrder = z.infer<typeof $sortOrder>;
export type TDefaultRequestParams = z.infer<typeof $defaultRequestParams>;
export type TPagination = z.infer<typeof $pagination>;
export type Discount = z.infer<typeof $Discount>;
export type LastUpdated = z.infer<typeof $LastUpdated>;

export type TRequestFilterParams<T extends FormikValues> = TDefaultRequestParams & Partial<T>;

export const $defaultMeta = z.object({
    pagination: $pagination,
});

export const $LastUpdated = z.object({
    date: z.coerce.date(),
    user: z
        .object({
            id: z.number(),
            email: z.string(),
            profile: $profile.omit({ avatar: true, additionalImage: true }),
        })
        .nullable(),
});

export function $getPaginationResponseType<T extends ZodTypeAny>(data: T) {
    return z.object({
        data: data.array(),
        pagination: $pagination,
    });
}
