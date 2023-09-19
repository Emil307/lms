import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteAdminTransactionRequest, DeleteAdminTransactionResponse, transactionApi } from "@entities/transaction";

export const useDeleteTransaction = ({ id }: DeleteAdminTransactionRequest) => {
    return useMutation<DeleteAdminTransactionResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ADMIN_TRANSACTION, id],
        () => transactionApi.deleteAdminTransaction({ id }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление транзакции",
                    message: `Транзакция №${id} успешно удалена`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_TRANSACTIONS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления транзакции",
                });
            },
        }
    );
};
