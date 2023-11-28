import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminTransactionsFiltersResponse, transactionApi } from "@entities/transaction";
import { FormErrorResponse } from "@shared/types";

export const useAdminTransactionFilters = (): UseQueryResult<GetAdminTransactionsFiltersResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ADMIN_TRANSACTIONS_FILTERS,
            [EntityNames.TRANSACTION, EntityNames.COURSE, EntityNames.COURSE_PACKAGE, EntityNames.ARTICLE_PACKAGE],
        ],
        () => transactionApi.getAdminTransactionsFilters()
    );
};
