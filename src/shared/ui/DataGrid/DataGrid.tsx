import { Box, Flex } from "@mantine/core";
import React, { memo } from "react";
import { FormikValues } from "formik";
import { TPagination } from "@shared/types";
import { BaseTable, Filter, CountData, TBaseTableProps, TFilterProps, SelectedRowsCount } from "./components";

type TExtendedProps<T extends Record<string, any>, F extends FormikValues = FormikValues> = Omit<TBaseTableProps<T>, "key" | "pagination"> &
    TFilterProps<F>;

export type TDataGridProps<T extends Record<string, any>, F extends FormikValues = FormikValues> = {
    pagination?: TPagination;
    countName?: string;
} & TExtendedProps<T, F>;

function DataGrid<T extends Record<string, any>, F extends FormikValues = FormikValues>({
    data,
    pagination,
    formikConfig,
    formRef,
    countName,
    children,
    ...rest
}: TDataGridProps<T, F>) {
    return (
        <>
            <Filter<F> formikConfig={formikConfig} formRef={formRef}>
                {children}
            </Filter>
            <Flex gap={16} justify="space-between">
                <CountData countName={countName} pagination={pagination} />
                {rest.initialState?.columnOrder?.includes("mrt-row-select") && <SelectedRowsCount />}
            </Flex>
            <Box mt={24}>
                <BaseTable<T>
                    {...rest}
                    data={data}
                    pagination={pagination}
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
