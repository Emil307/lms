import { z } from "zod";
import { FormikConfig, FormikValues } from "formik";
import { MRT_Cell, MRT_Column, MRT_Row, MRT_TableInstance } from "mantine-react-table";
import React from "react";
import { $getPaginationResponseType, TDefaultRequestParams, TSortOrder, TSortParams } from "@shared/types";
import { CollapsedFiltersBlockProps } from "../CollapsedFiltersBlock";

type DataGridResponseData<T, M> = { data: T[]; meta?: M };

export type DataGridResponseWithoutPagination<T, M> = DataGridResponseData<T, M>;

export type DataGridResponse<T, M> = z.infer<ReturnType<typeof $getPaginationResponseType>> & DataGridResponseData<T, M>;

export type TDefaultSortQueryParams = {
    sortField: string;
    sortOrder: TSortOrder;
};

export type TDefaultPageQueryParams = {
    page: string;
    perPage: string;
};

export type TFunctionParamsWithoutPagination<F = unknown, E = unknown> = TSortParams & Partial<F> & E;

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

export type TDisplayMetaData<G> = {
    name?: string;
    value: (meta: G) => string;
};

export type TDisplayMeta<G> = {
    leftSide?: TDisplayMetaData<G>;
    rightSide?: TDisplayMetaData<G>;
};

export type TDisplayMetaProps<M, G> = M extends Record<string, any> ? { displayMeta: TDisplayMeta<G> } : { displayMeta?: never };

export type TMetaProps<M> = {
    meta?: M;
    displayMeta?: TDisplayMeta<M>;
};

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
