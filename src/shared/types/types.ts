import { z, ZodRawShape, ZodTypeAny } from "zod";
import { $Profile } from "./profile";

export interface TRouterQueries {
    id: string;
    tab?: string;
}

export interface FormErrorResponse {
    message: string;
    errors: {
        [key: string]: string[];
    };
}

const $sortOrder = z.literal("asc").or(z.literal("desc"));
const $sortRequest = z.record(z.string(), $sortOrder);

const $pageParams = z.object({
    perPage: z.number(),
    page: z.number(),
});

const $sortParams = z.object({
    sort: $sortRequest.optional(),
});

const $DefaultRequestParams = $pageParams.merge($sortParams);

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

export const $DiscountType = z.literal("percentage").or(z.literal("currency"));

export const $Discount = z.object({
    type: $DiscountType,
    amount: z.number(),
    startingDate: z.coerce.date(),
    finishingDate: z.coerce.date(),
});

export const $multiValueOperator = z.literal("or").or(z.literal("and")).or(z.literal("not")).or(z.literal("lte"));
export const $dateOperator = z.literal("range").or(z.literal("between"));

export type TMultiValueOperator = z.infer<typeof $multiValueOperator>;
export type TDateOperator = z.infer<typeof $dateOperator>;
export type TSortOrder = z.infer<typeof $sortOrder>;
export type TDefaultRequestParams = z.infer<typeof $DefaultRequestParams>;
export type TPageParams = z.infer<typeof $pageParams>;
export type TSortParams = z.infer<typeof $sortParams>;
export type TPagination = z.infer<typeof $pagination>;
export type Discount = z.infer<typeof $Discount>;
export type LastUpdated = z.infer<typeof $LastUpdated>;

export type TRequestFilterParams<T extends Record<string, any>> = TDefaultRequestParams & Partial<T>;

export const $LastUpdated = z.object({
    date: z.coerce.date(),
    user: z
        .object({
            id: z.number(),
            email: z.string(),
            profile: $Profile.omit({ avatar: true, additionalImage: true }),
        })
        .nullable(),
});

export function $getFiltersRequestType<T extends ZodRawShape>(data: z.ZodObject<T>) {
    return data.merge($DefaultRequestParams);
}

export function $getMultiValueObjectType<T extends TMultiValueOperator = "or">(data: z.ZodString, operator: z.ZodLiteral<T>) {
    return z.object({
        items: z.array(data),
        operator,
    });
}

export function $getDateObjectType<T extends TDateOperator = "range">(operator: z.ZodLiteral<T>) {
    return z.object({
        items: z.array(z.string().nullable(), z.string().nullable()),
        operator,
    });
}

export function $getPaginationResponseType<T extends ZodTypeAny, M extends ZodTypeAny>(data: T, meta?: M) {
    return z.object({
        data: data.array(),
        pagination: $pagination,
        meta: meta ? meta : z.never(),
    });
}
