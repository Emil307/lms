import { z } from "zod";
import { FormikConfig, FormikValues } from "formik";
import { $getPaginationResponseType, TDefaultRequestParams, TSortOrder } from "@shared/types";

export type DataGridResponse<T> = z.infer<ReturnType<typeof $getPaginationResponseType>> & { data: T[] };

export type TDefaultSortQueryParams = {
    sortField: string;
    sortOrder: TSortOrder;
};

export type TDefaultPageQueryParams = {
    page: string;
    perPage: string;
};

export type TDefaultQueryParams = TDefaultSortQueryParams & TDefaultPageQueryParams;

export type TFunctionParams<F = unknown, E = unknown> = TDefaultRequestParams & Partial<F> & E;

export type TFilterTable<F> = {
    initialValues: Required<F>;
    validationSchema?: FormikConfig<F>["validationSchema"];
};

export type TFiltersProps<F, K> = F extends FormikValues ? { filter: TFilterTable<K> } : { filter?: never };

export type TExtraFiltersProps<E> = E extends Record<string, any> ? { extraFilterParams: E } : { extraFilterParams?: never };
