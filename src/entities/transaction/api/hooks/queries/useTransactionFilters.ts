import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetTransactionsFiltersResponse, transactionApi } from "@entities/transaction";
import { FormErrorResponse } from "@shared/types";

export const useTransactionFilters = (): UseQueryResult<GetTransactionsFiltersResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_TRANSACTIONS_FILTERS,
            [EntityNames.TRANSACTION, EntityNames.COURSE, EntityNames.COURSE_PACKAGE, EntityNames.ARTICLE_PACKAGE],
        ],
        () => transactionApi.getTransactionsFilters()
    );
};
