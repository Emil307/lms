import { useEffect, useState } from "react";
import { MRT_SortingState } from "mantine-react-table";
import { useRouter } from "next/router";
import { TDefaultSortQueryParams } from "@shared/ui/DataGrid/types";
import { TSortParams } from "@shared/types";

export const useDataGridSort = (disableQueryParams: boolean) => {
    const router = useRouter();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const { sortField, sortOrder } = router.query as TDefaultSortQueryParams;

    useEffect(() => {
        if (disableQueryParams) {
            return;
        }
        setSorting(getInitialSortParams());
    }, [router.isReady]);

    useEffect(() => {
        if (!router.isReady || disableQueryParams) {
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

    const prepareSortParams = (): TSortParams | undefined => {
        if (disableQueryParams && !sorting.length) {
            return undefined;
        }
        if (!disableQueryParams && !sortField) {
            return undefined;
        }
        if (disableQueryParams) {
            return { sort: { [sorting[0].id]: sorting[0].desc ? "desc" : "asc" } };
        }
        return { sort: { [sortField]: sortOrder } };
    };

    const getInitialSortParams = () => {
        if (!sortField || Array.isArray(sortField)) {
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

    return { sorting, setSorting, sortParams: prepareSortParams() };
};
