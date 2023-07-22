import React, { memo } from "react";
import { FormikValues } from "formik";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { DataGridResponse, TCollapsedFiltersBlockProps, TExtraFiltersProps, TFiltersProps, TFunctionParams, TSelectProps } from "./types";
import DataGrid, { TDataGridProps } from "./DataGrid";
import { useDataGridSort, useDataGridSelect, useDataGridFilters, useDataGridPagination } from "./utils";

type TExtendedProps<T extends Record<string, any>, F, E, K extends FormikValues> = Omit<
    TDataGridProps<T, K>,
    "data" | "pagination" | "formikConfig" | "isLoading"
> &
    TFiltersProps<F, K> &
    TExtraFiltersProps<E> &
    TCollapsedFiltersBlockProps<F>;

export type TManagedDataGridProps<T extends Record<string, any>, F, E, R, K extends FormikValues> = {
    queryFunction: (params: R) => Promise<DataGridResponse<T>>;
    queryKey: string;
    queryCacheKeys?: Array<keyof R>;
    disableQueryParams?: boolean;
} & TExtendedProps<T, F, E, K> &
    TSelectProps;

/**
 * Компонент таблицы с фильтрами.
 * @template T - Тип возвращаемого массива данных.
 * @template F - Тип фильтра Formik.
 * @template Е - Тип object для передачи дополнительных параметров для запроса, не включаемые в фильтр Formik.
 */
function ManagedDataGrid<
    T extends Record<string, any>,
    F = unknown,
    E = unknown,
    R = TFunctionParams<F, E>,
    K extends FormikValues = F extends FormikValues ? F : FormikValues
>(props: TManagedDataGridProps<T, F, E, R, K>) {
    const router = useRouter();
    const {
        queryFunction,
        queryKey,
        queryCacheKeys = [],
        children,
        filter,
        extraFilterParams = {},
        disableQueryParams = false,
        selectItems,
        onChangeSelect,
        collapsedFiltersBlockProps,
        ...rest
    } = props;

    const { rowSelection, setRowSelection } = useDataGridSelect({ disableQueryParams, selectItems, onChangeSelect });

    const { setPagination, paginationParams, goToFirstPage } = useDataGridPagination(disableQueryParams);
    const { sorting, setSorting, sortParams } = useDataGridSort({ disableQueryParams, goToFirstPage });
    const filters = useDataGridFilters<K>({ filter, disableQueryParams, goToFirstPage });

    const paramsForRequest = {
        ...paginationParams,
        ...sortParams,
        ...filters?.filterParams,
        ...extraFilterParams,
    } as R;

    const {
        data: queryData,
        isLoading,
        isRefetching,
        isFetching,
    } = useQuery<DataGridResponse<T>>({
        queryKey: [queryKey, ...queryCacheKeys.map((key) => paramsForRequest[key])],
        queryFn: () => queryFunction(paramsForRequest),
        enabled: router.isReady,
    });

    const collapsed = {
        ...collapsedFiltersBlockProps,
        queryParams: filters?.filterParams,
        initialValues: filter?.initialValues,
    };

    return (
        <DataGrid<T, K>
            {...rest}
            formikConfig={filters?.formikConfig}
            formRef={filters?.formRef}
            isLoading={isLoading || isRefetching || isFetching}
            data={queryData?.data}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            sorting={sorting}
            pagination={queryData?.pagination}
            enableFilters={false}
            enableColumnActions={false}
            getRowId={(row) => row.id}
            manualPagination
            manualSorting
            collapsedFiltersBlockProps={collapsed}>
            {children}
        </DataGrid>
    );
}

export default memo(ManagedDataGrid) as typeof ManagedDataGrid;
