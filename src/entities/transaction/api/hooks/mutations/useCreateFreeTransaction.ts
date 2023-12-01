import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { CreateFreeTransactionRequest, transactionApi } from "@entities/transaction";

export const useCreateFreeTransaction = (
    data: CreateFreeTransactionRequest
): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    const getEntityName = () => {
        switch (data.entityType) {
            case "course":
                return "Курс";
            case "coursePackage":
                return "Пакет курсов";
            case "articlePackage":
                return "Пакет статей";
        }
    };
    const getDeclensionEntityName = () => {
        switch (data.entityType) {
            case "course":
                return "курса";
            case "coursePackage":
                return "пакета курсов";
            case "articlePackage":
                return "пакета статей";
        }
    };
    const entityName = getEntityName();
    const declensionEntityName = getDeclensionEntityName();

    return useMutation([MutationKeys.CREATE_FREE_TRANSACTION], () => transactionApi.createFreeTransaction(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: `Покупка ${declensionEntityName}`,
                message: `${entityName} успешно куплен`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.COURSE });
            invalidateQueriesWithPredicate({ entityName: EntityNames.ARTICLE });
        },
        onError: (error) => {
            createNotification({
                type: ToastType.WARN,
                title: `Ошибка покупки ${declensionEntityName}`,
                message: error.response?.data.message
            });
        },
    });
};
