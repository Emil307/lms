import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MRT_PaginationState } from "mantine-react-table";
import { TDefaultPageQueryParams } from "@shared/ui/DataGrid/types";
import { TPageParams } from "@shared/types";

export const useDataGridPagination = (disableQueryParams: boolean) => {
    const router = useRouter();
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });

    const { page = 1, perPage = 10 } = router.query as TDefaultPageQueryParams;

    useEffect(() => {
        if (disableQueryParams) {
            return;
        }
        setPagination({ pageIndex: Number(page), pageSize: Number(perPage) });
    }, [router.isReady]);

    useEffect(() => {
        if (!router.isReady || disableQueryParams) {
            return;
        }
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, perPage: `${pagination.pageSize}`, page: `${pagination.pageIndex}` },
            },
            undefined,
            { shallow: true },
        );
    }, [pagination, router.isReady]);

    const goToFirstPage = () => {
        setPagination((state) => ({ ...state, pageIndex: 1 }));
    };

    const preparePaginationParams = (): TPageParams => {
        if (disableQueryParams) {
            return {
                perPage: pagination.pageSize,
                page: pagination.pageIndex,
            };
        }
        return {
            perPage: Number(perPage),
            page: Number(page),
        };
    };

    return { setPagination, paginationParams: preparePaginationParams(), goToFirstPage };
};
