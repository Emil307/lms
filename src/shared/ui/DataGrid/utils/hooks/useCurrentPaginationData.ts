import {useEffect, useState} from "react";
import {TPagination} from "@shared/types";

export const useCurrentPaginationData = (pagination?: TPagination) => {
    const [paginationData, setPaginationData] = useState<TPagination>();

    useEffect(() => {
        if (pagination) {
            setPaginationData(pagination);
        }
    }, [pagination])

    return paginationData
}