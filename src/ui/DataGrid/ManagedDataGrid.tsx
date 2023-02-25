import { useQuery } from "@tanstack/react-query";
import React from "react";
import BaseDataGrid, { BaseDataGridProps } from "./BaseDataGrid";
import { DataGridResponse } from "./types";

type ExtendedProps<T extends Record<string, any>> = React.PropsWithChildren<Omit<BaseDataGridProps<T>, "data" | "key">>;

export interface ManagedDataGridProps<T extends Record<string, any>> extends ExtendedProps<T> {
    getData: (params: any) => Promise<DataGridResponse<T>>;
    queryKey: string;
}

export default function ManagedDataGrid<T extends Record<string, any>>({ getData, queryKey, children, ...rest }: ManagedDataGridProps<T>) {
    //TODO: Filters and Sorting

    const { isLoading, data: queryData } = useQuery<DataGridResponse<T>>({
        queryKey: [queryKey],
        queryFn: getData,
    });

    const data = queryData?.data ?? [];
    const pagination = queryData?.pagination;

    return (
        <>  {!!children && children}
            <BaseDataGrid<T>
                {...rest}
                enableFilters={rest.enableFilters || false}
                enableColumnActions={rest.enableColumnActions || false}
                data={data}
                rowCount={pagination?.count}
                state={{
                    isLoading,
                    pagination: {
                        pageIndex: pagination?.currentPage || 0,
                        pageSize: pagination?.perPage || 10,
                    },
                }}
                manualPagination
            />
        </>
    );
}
