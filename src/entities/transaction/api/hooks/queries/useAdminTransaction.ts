import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminTransactionRequest, GetAdminTransactionResponse, transactionApi } from "@entities/transaction";
import { FormErrorResponse } from "@shared/types";

export const useAdminTransaction = ({
    id,
}: GetAdminTransactionRequest): UseQueryResult<GetAdminTransactionResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ADMIN_TRANSACTION,
            [EntityNames.TRANSACTION, EntityNames.USER, EntityNames.STUDENT, EntityNames.COURSE, EntityNames.ARTICLE_PACKAGE],
            id,
        ],
        () => transactionApi.getAdminTransaction({ id }),
        {
            enabled: !!id,
        }
    );
};
