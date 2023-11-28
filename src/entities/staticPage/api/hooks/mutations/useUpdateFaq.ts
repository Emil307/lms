import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { AdminFaqItem, UpdateFaqRequest, staticPageApi } from "@entities/staticPage";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useUpdateFaq = (id: number): UseMutationResult<AdminFaqItem, AxiosError<FormErrorResponse>, UpdateFaqRequest> => {
    return useMutation([MutationKeys.UPDATE_FAQ, id], (data) => staticPageApi.updateFaq({ id, ...data }), {
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
                title: "Ошибка обновления карточки вопрос-ответ",
            });
        },
    });
};
