import { useMantineTheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormikConfig } from "formik";
import { MRT_SortingState } from "mantine-react-table";
import { Form } from "@shared/ui";
import { $validationSchema } from "@features/users/list/types/validation";
import BaseDataGrid, { BaseDataGridProps } from "./BaseDataGrid";
import { DataGridResponse } from "./types";

type ExtendedProps<T extends Record<string, any>> = React.PropsWithChildren<Omit<BaseDataGridProps<T>, "data" | "key">>;

export interface ManagedDataGridProps<T extends Record<string, any>, D extends Record<string, any>> extends ExtendedProps<T> {
    getData: (params: any) => Promise<DataGridResponse<T>>;
    queryKey: string[];
    filters: D;
}

export default function ManagedDataGrid<T extends Record<string, any>, D extends Record<string, any>>({
    getData,
    queryKey,
    children,
    filters,
    ...rest
}: ManagedDataGridProps<T, D>) {
    const router = useRouter();
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
            // delete resetSortParams["order"];
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

    return (
        <>
            <Form config={cfg}>{children}</Form>
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
                    sx: {
                        backgroundColor: theme.colors.light[0],
                    },
                }}
                mantinePaperProps={{
                    sx: {
                        border: "none",
                        boxShadow: "none",
                    },
                }}
                mantineTableBodyCellProps={{
                    sx: {
                        border: "none !important",
                        fontSize: "14px !important",
                        lineHeight: "16px !important",
                    },
                }}
                mantineSelectAllCheckboxProps={{
                    sx: {
                        input: {
                            backgroundColor: theme.colors.grayLight[0],
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                        },
                    },
                }}
                mantineSelectCheckboxProps={{
                    sx: {
                        input: {
                            backgroundColor: theme.colors.grayLight[0],
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                        },
                    },
                }}
            />
        </>
    );
}
