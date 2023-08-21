import React, { memo } from "react";
import { FormikValues } from "formik";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
    DataGridResponse,
    TCollapsedFiltersBlockProps,
    TExtraFiltersProps,
    TFiltersProps,
    TFunctionParams,
    TMetaProps,
    TSelectProps,
} from "./types";
import DataGrid, { TDataGridProps } from "./DataGrid";
import { useDataGridSort, useDataGridSelect, useDataGridFilters, useDataGridPagination } from "./utils";

type TExtendedProps<
    Data extends Record<string, any>,
    Filter,
    Extra,
    Meta,
    MetaData extends Record<string, any>,
    Formik extends FormikValues
> = Omit<TDataGridProps<Data, MetaData, Formik>, "data" | "pagination" | "meta" | "formikConfig" | "isEmptyFilter" | "isLoading"> &
    TFiltersProps<Filter, Formik> &
    TExtraFiltersProps<Extra> &
    TMetaProps<Meta, MetaData> &
    TCollapsedFiltersBlockProps<Filter>;

export type TManagedDataGridProps<
    Data extends Record<string, any>,
    Filter,
    Extra,
    Meta,
    MetaData extends Record<string, any>,
    Request,
    Formik extends FormikValues
> = {
    queryFunction: (params: Request) => Promise<DataGridResponse<Data, Meta, MetaData>>;
    queryKey: string;
    queryCacheKeys?: Array<keyof Request>;
    disableQueryParams?: boolean;
} & TExtendedProps<Data, Filter, Extra, Meta, MetaData, Formik> &
    TSelectProps;

/**
 * Компонент таблицы с фильтрами.
 * @template Data - Тип возвращаемого массива данных.
 * @template Filter - Тип фильтра Formik.
 * @template Extra - Тип object для передачи дополнительных параметров для запроса, не включаемые в фильтр Formik.
 * @template Meta - Тип возвращаемых meta данных.
 */
function ManagedDataGrid<
    Data extends Record<string, any>,
    Filter = unknown,
    Extra = unknown,
    Meta = unknown,
    MetaData extends Record<string, any> = Meta extends Record<string, any> ? Meta : Record<string, any>,
    Request = TFunctionParams<Filter, Extra>,
    Formik extends FormikValues = Filter extends FormikValues ? Filter : FormikValues
>(props: TManagedDataGridProps<Data, Filter, Extra, Meta, MetaData, Request, Formik>) {
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
        defaultBlock,
        displayMeta,
        ...rest
    } = props;

    const { rowSelection, setRowSelection } = useDataGridSelect({ disableQueryParams, selectItems, onChangeSelect });

    const { setPagination, paginationParams, goToFirstPage } = useDataGridPagination(disableQueryParams);
    const { sorting, setSorting, sortParams } = useDataGridSort({ disableQueryParams, goToFirstPage });
    const filters = useDataGridFilters<Formik>({ filter, disableQueryParams, goToFirstPage });

    const paramsForRequest = {
        ...paginationParams,
        ...sortParams,
        ...filters?.filterParams,
        ...extraFilterParams,
    } as Request;

    const {
        data: queryData,
        isLoading,
        isRefetching,
        isFetching,
    } = useQuery<DataGridResponse<Data, Meta, MetaData>>({
        queryKey: [queryKey, ...queryCacheKeys.map((key) => paramsForRequest[key])],
        queryFn: () => queryFunction(paramsForRequest),
        enabled: router.isReady && ((defaultBlock && !filters?.isEmptyFilter) || !defaultBlock),
    });

    const collapsed = {
        ...collapsedFiltersBlockProps,
        queryParams: filters?.filterParams,
        initialValues: filter?.initialValues,
    };

    return (
        <DataGrid<Data, MetaData, Formik>
            {...rest}
            formikConfig={filters?.formikConfig}
            formRef={filters?.formRef}
            isEmptyFilter={filters?.isEmptyFilter}
            isLoading={isLoading || isRefetching || isFetching}
            data={queryData?.data}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            sorting={sorting}
            pagination={queryData?.pagination}
            meta={queryData?.meta}
            defaultBlock={defaultBlock}
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
