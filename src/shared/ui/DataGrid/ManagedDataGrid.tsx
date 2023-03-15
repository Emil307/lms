import { useMantineTheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import BaseDataGrid, { BaseDataGridProps } from "./BaseDataGrid";
import { DataGridResponse } from "./types";

type ExtendedProps<T extends Record<string, any>> = React.PropsWithChildren<Omit<BaseDataGridProps<T>, "data" | "key">>;

export interface ManagedDataGridProps<T extends Record<string, any>> extends ExtendedProps<T> {
    getData: (params: any) => Promise<DataGridResponse<T>>;
    queryKey: string[];
}

export default function ManagedDataGrid<T extends Record<string, any>>({ getData, queryKey, children, ...rest }: ManagedDataGridProps<T>) {
    const router = useRouter();
    //TODO: Filters and Sorting
    const {
        isLoading,
        data: queryData,
        isRefetching,
        isFetching,
    } = useQuery<DataGridResponse<T>>({
        queryKey: queryKey,
        queryFn: getData,
        enabled: router.isReady,
    });

    const data = queryData?.data.data ?? [];
    const pagination = queryData?.data.meta.pagination;
   
    const theme = useMantineTheme();

    return (
        <>
            {!!children && children}
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
                // mantineTableFooterRowProps={{
                //     sx: {
                //         backgroundColor: "red",
                //     },
                // }}
                mantineTableBodyRowProps={
                    {
                        // sx: {
                        //     border: "none",
                        // },
                    }
                }
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
