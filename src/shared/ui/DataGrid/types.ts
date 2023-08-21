import { z } from "zod";
import { FormikConfig, FormikValues } from "formik";
import { MRT_Cell, MRT_Column, MRT_Row, MRT_TableInstance } from "mantine-react-table";
import React from "react";
import { $getPaginationResponseType, TDefaultRequestParams, TSortOrder } from "@shared/types";
import { CollapsedFiltersBlockProps } from "../CollapsedFiltersBlock";

type DataGridResponseData<T, M, G> = M extends Record<string, any> ? { data: T[]; meta: G } : { data: T[] };

export type DataGridResponse<T, M, G> = z.infer<ReturnType<typeof $getPaginationResponseType>> & DataGridResponseData<T, M, G>;

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

export type TSelectProps = { selectItems?: string[]; onChangeSelect?: (selectedItems: string[]) => void };

export type TCollapsedFiltersBlockProps<F> = {
    collapsedFiltersBlockProps?: Omit<CollapsedFiltersBlockProps<F>, "queryParams" | "initialValues" | "children">;
};

export type TDisplayMeta<G> = {
    name?: string;
    value: (meta: G) => string;
};

export type TMetaProps<M, G> = M extends Record<string, any> ? { displayMeta: TDisplayMeta<G> } : { displayMeta?: never };

export type TCellProps<T extends Record<string, any>> = {
    cell: MRT_Cell<T>;
    renderedCellValue: React.ReactNode;
    column: MRT_Column<T>;
    row: MRT_Row<T>;
    table: MRT_TableInstance<T>;
};

export type TCellBadge = {
    condition: boolean;
    color?: string;
};
