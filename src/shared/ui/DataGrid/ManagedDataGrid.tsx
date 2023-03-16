import { useMantineTheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { FormikConfig } from "formik";
import { z } from "zod";
import { Form } from "@shared/ui";
import BaseDataGrid, { BaseDataGridProps } from "./BaseDataGrid";
import { DataGridResponse } from "./types";

type ExtendedProps<T extends Record<string, any>> = React.PropsWithChildren<Omit<BaseDataGridProps<T>, "data" | "key">>;

export interface ManagedDataGridProps<T extends Record<string, any>, D extends Record<string, any>> extends ExtendedProps<T> {
    getData: (params: any) => Promise<DataGridResponse<T>>;
    queryKey: string[];
    initialFilter: D;
}

export default function ManagedDataGrid<T extends Record<string, any>, D extends Record<string, any>>({
    getData,
    queryKey,
    children,
    initialFilter,
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

    const $validationSchema = z.object({});

    const cfg: FormikConfig<D> = {
        initialValues: {
            ...initialFilter,
        },
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

    return (
        <>
            <Form config={cfg}>{children}</Form>
            <BaseDataGrid<T>
                {...rest}
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
