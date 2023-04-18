import { Box } from "@mantine/core";
import React, { memo } from "react";
import { FormikValues } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BaseTable, Filter, CountData, TBaseTableProps, TFilterProps } from "./components";
import { DataGridResponse, TFunctionParams } from "./types";
import { useTableQueryParams } from "./utils";

type TExtendedProps<T extends Record<string, any>, F> = Omit<TFilterProps<F>, "filterParams"> &
    Omit<TBaseTableProps<T>, "data" | "key" | "pagination" | "isLoading">;

export type TDataGridProps<T extends Record<string, any>, F, R> = {
    queryFunction: (params: R) => Promise<DataGridResponse<T>>;
    queryKey: string;
    queryCacheKeys?: Array<keyof R>;
    countName?: string;
} & TExtendedProps<T, F>;

function DataGrid<T extends Record<string, any>, F extends FormikValues = FormikValues, R extends TFunctionParams<F> = TFunctionParams<F>>(
    props: TDataGridProps<T, F, R>
) {
    const router = useRouter();
    const { queryFunction, queryKey, queryCacheKeys = [], children, countName, filter, ...rest } = props;
    const filterFields = filter ? Object.keys(filter.initialValues).map((key) => key) : [];
    const { paramsForRequest, filterParams } = useTableQueryParams<F, R>(filterFields);

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
        <>
            <Filter<F> filter={filter} filterParams={filterParams}>
                {children}
            </Filter>
            <CountData countName={countName} pagination={queryData?.meta.pagination} />
            <Box mt={24}>
                <BaseTable<T>
                    {...rest}
                    isLoading={isLoading || isRefetching || isFetching}
                    data={queryData?.data}
                    pagination={queryData?.meta.pagination}
                    enableFilters={false}
                    enableColumnActions={false}
                    manualPagination
                    manualSorting
                />
            </Box>
        </>
    );
}

export default memo(DataGrid) as typeof DataGrid;
