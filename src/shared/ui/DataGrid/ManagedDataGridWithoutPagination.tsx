import React, { memo } from "react";
import { FormikValues } from "formik";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
    DataGridResponseWithoutPagination,
    TCollapsedFiltersBlockProps,
    TDisplayMetaProps,
    TExtraFiltersProps,
    TFiltersProps,
    TFunctionParamsWithoutPagination,
    TSelectProps,
} from "./types";
import DataGrid, { TDataGridProps } from "./DataGrid";
import { useDataGridSort, useDataGridSelect, useDataGridFilters, getInitialSortColumnName } from "./utils";

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
    TDisplayMetaProps<Meta, MetaData> &
    TCollapsedFiltersBlockProps<Filter>;

export type TManagedDataGridWithoutPaginationProps<
    Data extends Record<string, any>,
    Filter,
    Extra,
    Meta,
    MetaData extends Record<string, any>,
    Request,
    Formik extends FormikValues
> = {
    queryFunction: (params: Request) => Promise<DataGridResponseWithoutPagination<Data, MetaData>>;
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
function ManagedDataGridWithoutPagination<
    Data extends Record<string, any>,
    Filter = unknown,
    Extra = unknown,
    Meta = unknown,
    MetaData extends Record<string, any> = Meta extends Record<string, any> ? Meta : Record<string, any>,
    Request = TFunctionParamsWithoutPagination<Filter, Extra>,
    Formik extends FormikValues = Filter extends FormikValues ? Filter : FormikValues
>(props: TManagedDataGridWithoutPaginationProps<Data, Filter, Extra, Meta, MetaData, Request, Formik>) {
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
        ...rest
    } = props;

    const { rowSelection, setRowSelection } = useDataGridSelect({ selectItems, onChangeSelect });

    const { sortingParams, handleChangeSorting, sortParamsForRequest } = useDataGridSort({
        disableQueryParams,
        initialSortColumnName: getInitialSortColumnName(rest.initialState),
    });
    const filters = useDataGridFilters<Formik>({ filter, disableQueryParams });

    const paramsForRequest = {
        ...sortParamsForRequest,
        ...filters?.filterParamsForRequest,
        ...extraFilterParams,
    } as Request;

    const {
        data: queryData,
        isLoading,
        isRefetching,
        isFetching,
    } = useQuery<DataGridResponseWithoutPagination<Data, MetaData>>({
        queryKey: [queryKey, ...queryCacheKeys.map((key) => paramsForRequest[key])],
        queryFn: () => queryFunction(paramsForRequest),
        enabled: router.isReady && ((defaultBlock && !filters?.isEmptyFilter) || !defaultBlock),
    });

    const collapsed = {
        ...collapsedFiltersBlockProps,
        queryParams: filters?.filterParamsForRequest,
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
            onSortingChange={handleChangeSorting}
            sorting={sortingParams}
            meta={queryData?.meta}
            disablePagination
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

export default memo(ManagedDataGridWithoutPagination) as typeof ManagedDataGridWithoutPagination;
