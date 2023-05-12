import { useRouter } from "next/router";
import { TPagination } from "@shared/types";

interface UseListPaginationProps {
    data?: TPagination;
}

export const useListPagination = ({ data }: UseListPaginationProps) => {
    const router = useRouter();

    const firstElemIndex = (data?.perPage ?? 0) * ((data?.currentPage ?? 0) - 1) + 1;
    const lastElemIndex = (data?.perPage ?? 0) * ((data?.currentPage ?? 0) - 1) + (data?.count ?? 0);

    const pageIndex = Number(router.query.page) || 1;

    const handleChangePage = (selectedPage: number) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page: selectedPage.toString() },
            },
            undefined,
            { shallow: true }
        );
    };

    return { firstElemIndex, lastElemIndex, pageIndex, handleChangePage };
};
