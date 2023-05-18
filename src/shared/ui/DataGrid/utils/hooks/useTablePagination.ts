import React from "react";
import { TPaginationProps } from "../../components";

export const useTablePagination = <T extends Record<string, any>>({ data, table }: Pick<TPaginationProps<T>, "data" | "table">) => {
    const { getState, setPagination } = table;

    const firstElemIndex = (data?.perPage ?? 0) * ((data?.currentPage ?? 0) - 1) + 1;
    const lastElemIndex = (data?.perPage ?? 0) * ((data?.currentPage ?? 0) - 1) + (data?.count ?? 0);

    const {
        pagination: { pageIndex = 1, pageSize = 10 },
    } = getState();

    const handleChangePage = (selectedPage: number) => {
        setPagination((state) => ({
            ...state,
            pageIndex: selectedPage,
        }));
    };

    const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPagination({
            pageIndex: 1,
            pageSize: Number(e.target.value),
        });
    };

    return { firstElemIndex, lastElemIndex, pageIndex, pageSize, handleChangePage, handleChangePerPage };
};
