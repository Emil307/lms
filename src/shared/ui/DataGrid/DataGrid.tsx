import { Box, Flex } from "@mantine/core";
import React, { memo } from "react";
import { FormikValues } from "formik";
import { TPagination } from "@shared/types";
import { BaseTable, Filter, CountData, TBaseTableProps, TFilterProps, SelectedRowsCount, MetaData } from "./components";
import { EmptyData, EmptyDataProps } from "@shared/ui";
import { TMetaProps } from "@shared/ui/DataGrid/types";

type TExtendedProps<T extends Record<string, any>, M extends Record<string, any>, F extends FormikValues = FormikValues> = Omit<
    TBaseTableProps<T>,
    "key" | "pagination" | "meta"
> &
    TFilterProps<F> &
    TMetaProps<M>;

export type TDataGridProps<T extends Record<string, any>, M extends Record<string, any>, F extends FormikValues = FormikValues> = {
    pagination?: TPagination;
    countName?: string;
    defaultBlock?: Required<EmptyDataProps>;
    isEmptyFilter?: boolean;
} & TExtendedProps<T, M, F>;

function DataGrid<T extends Record<string, any>, M extends Record<string, any>, F extends FormikValues = FormikValues>({
    data,
    pagination,
    meta,
    displayMeta,
    formikConfig,
    formRef,
    isEmptyFilter,
    defaultBlock,
    countName,
    children,
    collapsedFiltersBlockProps,
    ...rest
}: TDataGridProps<T, M, F>) {
    const renderContent = () => {
        if (defaultBlock && isEmptyFilter) {
            return (
                <Box mt={56}>
                    <EmptyData {...defaultBlock} />
                </Box>
            );
        }
        return (
            <>
                <Flex gap={16} justify="space-between" mt={32} wrap="wrap">
                    <Flex gap={12} wrap="wrap">
                        <CountData countName={countName} pagination={pagination} />
                        <MetaData<M> meta={meta} displayMeta={displayMeta?.leftSide} />
                    </Flex>
                    <Flex gap={12} wrap="wrap">
                        <MetaData<M> meta={meta} displayMeta={displayMeta?.rightSide} />
                        {rest.initialState?.columnOrder?.includes("mrt-row-select") && (
                            <SelectedRowsCount rowSelection={rest.rowSelection} />
                        )}
                    </Flex>
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
    };

    return (
        <>
            <Filter<F> formikConfig={formikConfig} formRef={formRef} collapsedFiltersBlockProps={collapsedFiltersBlockProps}>
                {children}
            </Filter>
            {renderContent()}
        </>
    );
}

export default memo(DataGrid) as typeof DataGrid;
