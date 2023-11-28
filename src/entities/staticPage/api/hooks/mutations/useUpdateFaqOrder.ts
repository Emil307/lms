import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { AdminFaqItem, UpdateFaqOrderRequest, staticPageApi } from "@entities/staticPage";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useUpdateFaqOrder = (): UseMutationResult<AdminFaqItem, AxiosError<FormErrorResponse>, UpdateFaqOrderRequest> => {
    return useMutation([MutationKeys.UPDATE_FAQ_ORDER], (data) => staticPageApi.updateFaqOrder(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Изменения сохранены",
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.STATIC_FAQ });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка обновления порядка карточек",
            });
        },
    });
};
