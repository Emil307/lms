import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminTransactionsCreateResourcesResponse, transactionApi } from "@entities/transaction";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminTransactionCreateResources = (): UseQueryResult<
    GetAdminTransactionsCreateResourcesResponse,
    AxiosError<FormErrorResponse>
> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_TRANSACTION_CREATE_RESOURCES, [EntityNames.TRANSACTION, EntityNames.COURSE, EntityNames.ARTICLE_PACKAGE]],
        () => transactionApi.getAdminTransactionsCreateResources()
    );
};
