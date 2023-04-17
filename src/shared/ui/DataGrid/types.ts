import { z } from "zod";
import { FormikConfig } from "formik";
import { $getPaginationResponseType, TDefaultRequestParams, TSortOrder } from "@shared/types";

export type DataGridResponse<T> = z.infer<ReturnType<typeof $getPaginationResponseType>> & { data: T[] };

export type TDefaultPageQueryParams = {
    page: string;
    perPage: string;
    sortField: string;
    sortOrder: TSortOrder;
};

export type TFunctionParams<F> = TDefaultRequestParams & Required<F>;

export type TFilterTable<F> = {
    initialValues: Required<F>;
    validationSchema?: FormikConfig<F>["validationSchema"];
};
