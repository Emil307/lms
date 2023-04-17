import { useEffect, useState } from "react";
import { MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";

export const useTableSort = () => {
    const router = useRouter();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    useEffect(() => {
        setSorting(getInitialSortParams());
    }, [router.isReady]);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        router.push(
            {
                pathname: router.pathname,
                query: createNewSortParams(),
            },
            undefined,
            { shallow: true }
        );
    }, [sorting, router.isReady]);

    const getInitialSortParams = () => {
        const { sortField, sortOrder } = router.query;
        if (!sortField || !sortOrder || Array.isArray(sortField)) {
            return [];
        }
        return [{ id: sortField, desc: sortOrder === "desc" }];
    };

    const createNewSortParams = () => {
        const newQueryParams = { ...router.query };
        if (!sorting.length) {
            delete newQueryParams.sortField;
            delete newQueryParams.sortOrder;
            return newQueryParams;
        }
        const { id, desc } = sorting[0];
        newQueryParams.sortField = id;
        newQueryParams.sortOrder = desc ? "desc" : "asc";
        return newQueryParams;
    };

    return { sorting, setSorting };
};
