import { useState } from "react";
import { MRT_PaginationState } from "mantine-react-table";
import { PaginationState } from "@tanstack/table-core/src/features/Pagination";
import {createEnumParam, NumberParam, useQueryParams} from "use-query-params";
import { TPageParams } from "@shared/types";
import { PAGE_DEFAULT } from "@shared/ui/DataGrid/constants";

type TParams = {
    disableQueryParams: boolean;
    perPageOptions: [number, number, ...number[]];
}

export const useDataGridPagination = ({ disableQueryParams, perPageOptions }: TParams) => {
    const [query, setQuery] = useQueryParams({
        page: NumberParam,
        perPage: createEnumParam(perPageOptions.map(option => String(option))),
    });

    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: PAGE_DEFAULT,
        pageSize: perPageOptions[1],
    });

    const handleChangePagination = (updater: () => Partial<PaginationState>) => {
        const values = updater();
        if (disableQueryParams) {
            return setPagination((state) => ({ ...state, ...values }));
        }
        setQuery((state) => ({ page: values.pageIndex || state.page, perPage: values.pageSize ? String(values.pageSize) : state.perPage }));
    };

    const goToFirstPage = () => {
        setPagination((state) => ({ ...state, pageIndex: 1 }));
    };

    const getPaginationParams = (): TPageParams => {
        if (disableQueryParams) {
            return {
                page: pagination.pageIndex,
                perPage: pagination.pageSize,
            };
        }
        return {
            page: query.page || pagination.pageIndex,
            perPage: Number(query.perPage) || pagination.pageSize,
        };
    };

    return { handleChangePagination, paginationParams: getPaginationParams(), goToFirstPage };
};
