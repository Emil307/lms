import React from "react";
import { useRouter } from "next/router";
import { TPaginationProps } from "../../components";

export const useTablePagination = <T extends Record<string, any>>({ data, table }: TPaginationProps<T>) => {
    const router = useRouter();
    const { getState, setPageIndex, setPageSize } = table;

    const firstElemIndex = (data?.per_page ?? 0) * ((data?.current_page ?? 0) - 1) + 1;
    const lastElemIndex = (data?.per_page ?? 0) * ((data?.current_page ?? 0) - 1) + (data?.count ?? 0);

    const {
        pagination: { pageIndex = 0, pageSize = Number(router.query.perPage) || 10 },
    } = getState();

    const handleChangePage = (selectedPage: number) => {
        setPageIndex(selectedPage);
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page: `${selectedPage}` },
            },
            undefined,
            { shallow: true }
        );
    };

    const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, perPage: e.target.value, page: "1" },
            },
            undefined,
            { shallow: true }
        );
    };

    return { firstElemIndex, lastElemIndex, pageIndex, pageSize, handleChangePage, handleChangePerPage };
};
