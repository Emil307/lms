import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminTransactionsFiltersResponse, transactionApi } from "@entities/transaction";

export const useAdminTransactionFilters = () => {
    return useQuery<GetAdminTransactionsFiltersResponse>([QueryKeys.GET_ADMIN_TRANSACTIONS_FILTERS], () =>
        transactionApi.getAdminTransactionsFilters()
    );
};
