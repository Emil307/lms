import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import {
    DeleteAdminTransactionRequest,
    DeleteAdminTransactionResponse,
    GetAdminTransactionResponse,
    GetAdminTransactionsResponse,
    transactionApi,
} from "@entities/transaction";

export const useDeleteTransaction = ({ id }: DeleteAdminTransactionRequest) => {
    return useMutation<DeleteAdminTransactionResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ADMIN_TRANSACTION, id],
        () => transactionApi.deleteAdminTransaction({ id }),
        {
            onSuccess: () => {
                const transactionData = queryClient.getQueryData<GetAdminTransactionResponse>([QueryKeys.GET_ADMIN_TRANSACTION, id]);
                const transactionFromList = queryClient
                    .getQueriesData<GetAdminTransactionsResponse>([QueryKeys.GET_ADMIN_TRANSACTIONS])[0]?.[1]
                    ?.data.find((transaction) => transaction.id.toString() === id);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление транзакции",
                    message: `Транзация "${transactionData?.id || transactionFromList?.id}" успешно удалена`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_TRANSACTIONS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления транзакции",
                });
            },
        },
    );
};
