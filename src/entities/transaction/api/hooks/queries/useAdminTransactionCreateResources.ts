import { useQuery } from "@tanstack/react-query";
import { GetAdminTransactionsCreateResourcesResponse, transactionApi } from "@entities/transaction";
import { QueryKeys } from "@shared/constant";

export const useAdminTransactionCreateResources = () => {
    return useQuery<GetAdminTransactionsCreateResourcesResponse>([QueryKeys.GET_ADMIN_TRANSACTION_CREATE_RESOURCES], () =>
        transactionApi.getAdminTransactionsCreateResources(),
    );
};
