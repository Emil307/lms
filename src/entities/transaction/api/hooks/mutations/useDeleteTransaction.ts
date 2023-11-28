import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { DeleteAdminTransactionRequest, DeleteAdminTransactionResponse, transactionApi } from "@entities/transaction";

export const useDeleteTransaction = ({
    id,
}: DeleteAdminTransactionRequest): UseMutationResult<DeleteAdminTransactionResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ADMIN_TRANSACTION, id], () => transactionApi.deleteAdminTransaction({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление транзакции",
                message: `Транзакция №${id} успешно удалена`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.TRANSACTION, exclude: [QueryKeys.GET_ADMIN_TRANSACTION] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления транзакции",
            });
        },
    });
};
