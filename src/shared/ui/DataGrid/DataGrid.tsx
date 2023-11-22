import { Box, Flex } from "@mantine/core";
import React, { memo } from "react";
import { FormikValues } from "formik";
import { EmptyData, EmptyDataProps } from "@shared/ui";
import { TMetaProps } from "@shared/ui/DataGrid/types";
import { BaseTable, Filter, CountData, TBaseTableProps, TFilterProps, SelectedRowsCount, MetaData } from "./components";
import useStyles from "./DataGrid.styles";

type TExtendedProps<T extends Record<string, any>, M extends Record<string, any>, F extends FormikValues = FormikValues> = Omit<
    TBaseTableProps<T>,
    "key" | "meta"
> &
    TFilterProps<F> &
    TMetaProps<M>;

export type TDataGridProps<T extends Record<string, any>, M extends Record<string, any>, F extends FormikValues = FormikValues> = {
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
    const { classes } = useStyles();

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
                <Flex gap={16} justify="space-between" wrap="wrap">
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
                <Flex className={classes.tableWrapper}>
                    <BaseTable<T>
                        {...rest}
                        data={data}
                        pagination={pagination}
                        enableFilters={false}
                        enableColumnActions={false}
                        manualPagination
                        manualSorting
                    />
                </Flex>
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
