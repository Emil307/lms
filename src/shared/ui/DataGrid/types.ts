import { z } from "zod";
import { FormikConfig, FormikValues } from "formik";
import { MRT_Cell, MRT_Column, MRT_Row, MRT_TableInstance } from "mantine-react-table";
import React from "react";
import { $getPaginationResponseType, TDefaultRequestParams, TSortOrder } from "@shared/types";
import { CollapsedFiltersBlockProps } from "../CollapsedFiltersBlock";

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

export type TSelectProps = { selectItems?: string[]; onChangeSelect?: (selectedItems: string[]) => void };

export type TCollapsedFiltersBlockProps<F> = {
    collapsedFiltersBlockProps?: Omit<CollapsedFiltersBlockProps<F>, "queryParams" | "initialValues" | "children">;
};

export type TCellProps<T extends Record<string, any>> = {
    cell: MRT_Cell<T>;
    renderedCellValue: React.ReactNode;
    column: MRT_Column<T>;
    row: MRT_Row<T>;
    table: MRT_TableInstance<T>;
};
