import React, { memo } from "react";
import { FormikValues } from "formik";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { DataGridResponse, TExtraFiltersProps, TFiltersProps, TFunctionParams } from "./types";
import DataGrid, { TDataGridProps } from "./DataGrid";
import { useDataGridSort, useDataGridSelect, useDataGridFilters, useDataGridPagination } from "./utils";

type TExtendedProps<T extends Record<string, any>, F, E, K extends FormikValues> = Omit<
    TDataGridProps<T, K>,
    "data" | "pagination" | "formikConfig" | "isLoading"
> &
    TFiltersProps<F, K> &
    TExtraFiltersProps<E>;

export type TManagedDataGridProps<T extends Record<string, any>, F, E, R, K extends FormikValues> = {
    queryFunction: (params: R) => Promise<DataGridResponse<T>>;
    queryKey: string;
    queryCacheKeys?: Array<keyof R>;
    disableQueryParams?: boolean;
} & TExtendedProps<T, F, E, K>;

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
        countName,
        extraFilterParams = {},
        disableQueryParams = false,
        ...rest
    } = props;

    const { rowSelection, setRowSelection } = useDataGridSelect(disableQueryParams);

    const { sorting, setSorting, sortParams } = useDataGridSort(disableQueryParams);
    const { setPagination, paginationParams, goToFirstPage } = useDataGridPagination(disableQueryParams);
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
            manualPagination
            manualSorting>
            {children}
        </DataGrid>
    );
}

export default memo(ManagedDataGrid) as typeof ManagedDataGrid;
