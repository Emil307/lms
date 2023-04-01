import { Box, useMantineTheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormikConfig } from "formik";
import { MRT_SortingState } from "mantine-react-table";
import { Form } from "@shared/ui";
import { $validationSchema } from "@features/users/list/types/validation";
import BaseDataGrid, { BaseDataGridProps } from "./BaseDataGrid";
import { DataGridResponse } from "./types";
import { useManagedDataGridStyles } from "./ManagedDataGrid.styles";
import Pagination from "./Pagination";

type ExtendedProps<T extends Record<string, any>> = React.PropsWithChildren<Omit<BaseDataGridProps<T>, "data" | "key">>;

export interface ManagedDataGridProps<T extends Record<string, any>, D extends Record<string, any>> extends ExtendedProps<T> {
    getData: (params: any) => Promise<DataGridResponse<T>>;
    queryKey: string[];
    filters: D;
    countName?: string;
}

export default function ManagedDataGrid<T extends Record<string, any>, D extends Record<string, any>>({
    getData,
    queryKey,
    children,
    filters,
    countName,
    ...rest
}: ManagedDataGridProps<T, D>) {
    const router = useRouter();
    const { classes } = useManagedDataGridStyles();
    //TODO: Filters and Sorting
    const {
        isLoading,
        data: queryData,
        isRefetching,
        isFetching,
    } = useQuery<DataGridResponse<T>>({
        queryKey: queryKey,
        queryFn: () => getData(router.query),
        enabled: router.isReady,
    });

    const cfg: FormikConfig<D> = {
        initialValues: filters,
        enableReinitialize: true,
        validationSchema: $validationSchema,
        onSubmit: async (values) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...values, page: "1" },
                },
                undefined,
                { shallow: true }
            );
        },
    };

    const data = queryData?.data ?? [];
    const pagination = queryData?.meta.pagination;

    const theme = useMantineTheme();

    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    useEffect(() => {
        if (!router.isReady) return;
        if (!sorting[0]) {
            const resetSortParams = router.query;
            delete resetSortParams["sort"];
            router.push(
                {
                    pathname: router.pathname,
                    query: {
                        ...resetSortParams,
                    },
                },
                undefined,
                { shallow: true }
            );
            return;
        }
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    sort: `{"${sorting[0].id}":"${sorting[0].desc ? "desc" : "asc"}"}`,
                },
            },
            undefined,
            { shallow: true }
        );
    }, [sorting]);

    const firstElemIndex = (pagination?.per_page ?? 0) * ((pagination?.current_page ?? 0) - 1) + 1;
    const lastElemIndex = (pagination?.per_page ?? 0) * ((pagination?.current_page ?? 0) - 1) + (pagination?.count ?? 0);

    return (
        <>
            <Form config={cfg}>{children}</Form>
            {countName && (
                <Box
                    sx={{
                        color: theme.colors.gray45[0],
                        lineHeight: "16px",
                        span: {
                            color: theme.colors.dark[0],
                        },
                    }}
                    mt={32}>
                    {countName}: <span>{pagination?.per_page}</span> из <span>{pagination?.total}</span>
                </Box>
            )}
            <Box mt={24}>
                <BaseDataGrid<T>
                    {...rest}
                    onSortingChange={setSorting}
                    manualSorting
                    enableFilters={rest.enableFilters || false}
                    enableColumnActions={rest.enableColumnActions || false}
                    data={data}
                    rowCount={pagination?.count}
                    state={{
                        isLoading: isLoading || isRefetching || isFetching,
                        pagination: {
                            pageIndex: pagination?.current_page || 0,
                            pageSize: pagination?.per_page || 10,
                        },
                        sorting,
                    }}
                    pageCount={pagination?.total_pages || 0}
                    manualPagination
                    mantineTableHeadRowProps={{
                        className: classes.tableHeadRow,
                    }}
                    mantineTableHeadCellProps={{
                        className: classes.tableHeadCell,
                    }}
                    mantineColumnActionsButtonProps={{
                        className: classes.columnActionsButton,
                    }}
                    mantinePaperProps={{
                        className: classes.paper,
                    }}
                    mantineTableContainerProps={{
                        className: classes.tableContainer,
                    }}
                    mantineTableBodyRowProps={{
                        className: classes.tableBodyRow,
                    }}
                    mantineTableBodyCellProps={{
                        className: classes.tableBodyCell,
                    }}
                    mantineSelectAllCheckboxProps={{
                        className: classes.selectCheckbox,
                    }}
                    mantineSelectCheckboxProps={{
                        className: classes.selectCheckbox,
                    }}
                    renderBottomToolbar={({ table }) => {
                        if (!pagination) {
                            return null;
                        }
                        return (
                            <Pagination
                                table={table}
                                firstElemIndex={firstElemIndex}
                                lastElemIndex={lastElemIndex}
                                count={pagination.total}
                            />
                        );
                    }}
                />
            </Box>
        </>
    );
}
