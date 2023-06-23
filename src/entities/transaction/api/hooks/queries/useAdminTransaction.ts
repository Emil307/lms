import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminTransactionRequest, GetAdminTransactionResponse, transactionApi } from "@entities/transaction";

export const useAdminTransaction = ({ id }: GetAdminTransactionRequest) => {
    return useQuery<GetAdminTransactionResponse>([QueryKeys.GET_ADMIN_TRANSACTION, id], () => transactionApi.getAdminTransaction({ id }), {
        enabled: !!id,
    });
};
