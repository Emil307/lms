import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetTransactionsFiltersResponse, transactionApi } from "@entities/transaction";

export const useTransactionFilters = () => {
    return useQuery<GetTransactionsFiltersResponse>([QueryKeys.GET_TRANSACTIONS_FILTERS], () => transactionApi.getTransactionsFilters());
};
