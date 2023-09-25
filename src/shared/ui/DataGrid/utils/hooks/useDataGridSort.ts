import { useState } from "react";
import { MRT_SortingState } from "mantine-react-table";
import { createEnumParam, NumberParam, StringParam, useQueryParams } from "use-query-params";
import { SortingState } from "@tanstack/table-core";
import { TSortOrder, TSortParams } from "@shared/types";

type TParams = {
    disableQueryParams: boolean;
    goToFirstPage?: () => void;
};

export const useDataGridSort = ({ disableQueryParams, goToFirstPage }: TParams) => {
    const [query, setQuery] = useQueryParams({
        sortField: StringParam,
        sortOrder: createEnumParam(["asc", "desc"]),
        page: NumberParam,
    });

    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const handleChangeSorting = (updater: () => SortingState) => {
        const value = updater();
        if (disableQueryParams) {
            goToFirstPage && goToFirstPage();
            if (sorting.length && !sorting[0].desc && !value[0].desc) {
                return setSorting([]);
            }
            return setSorting(value);
        }
        setQuery(createNewSortParams(value));
    };

    const getSortParamsForRequest = (): TSortParams | undefined => {
        if (disableQueryParams && !sorting.length) {
            return undefined;
        }
        if (disableQueryParams) {
            return { sort: { [sorting[0].id]: sorting[0].desc ? "desc" : "asc" } };
        }
        if (!query.sortField || !query.sortOrder) {
            return undefined;
        }
        return { sort: { [query.sortField]: query.sortOrder } };
    };

    const createNewSortParams = (value: SortingState) => {
        if (query.sortOrder === "asc" && !value[0].desc) {
            return {
                sortField: undefined,
                sortOrder: undefined,
                page: goToFirstPage ? 1 : undefined,
            };
        }
        const { id, desc } = value[0];
        return {
            sortField: id,
            sortOrder: desc ? "desc" : ("asc" as TSortOrder),
            page: goToFirstPage ? 1 : undefined,
        };
    };

    const getSortingParams = () => {
        if (disableQueryParams) {
            return sorting;
        }
        const { sortField, sortOrder } = query;
        if (!sortField || !sortOrder) {
            return [];
        }
        return [{ id: sortField, desc: sortOrder === "desc" }];
    };

    return { sortingParams: getSortingParams(), handleChangeSorting, sortParamsForRequest: getSortParamsForRequest() };
};
