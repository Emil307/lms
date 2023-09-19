import { TPaginationProps } from "../../components";

export const useTablePagination = <T extends Record<string, any>>({ data, table }: Omit<TPaginationProps<T>, "perPageOptions">) => {
    const { getState, setPagination } = table;

    const firstElemIndex = (data?.perPage ?? 0) * ((data?.currentPage ?? 0) - 1) + 1;
    const lastElemIndex = (data?.perPage ?? 0) * ((data?.currentPage ?? 0) - 1) + (data?.count ?? 0);

    const {
        pagination: { pageIndex, pageSize },
    } = getState();

    const handleChangePage = (selectedPage: number) => {
        setPagination((state) => ({
            ...state,
            pageIndex: selectedPage,
        }));
    };

    const handleChangePerPage = (value: string | null) => {
        if (value) {
            setPagination({
                pageIndex: 1,
                pageSize: Number(value),
            });
        }
    };

    return { firstElemIndex, lastElemIndex, pageIndex, pageSize, handleChangePage, handleChangePerPage };
};
