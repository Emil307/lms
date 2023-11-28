import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { AdminFaqItem, CreateFaqRequest, staticPageApi } from "@entities/staticPage";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useCreateFaq = (): UseMutationResult<AdminFaqItem, AxiosError<FormErrorResponse>, CreateFaqRequest> => {
    return useMutation([MutationKeys.CREATE_FAQ], (data) => staticPageApi.createFaq(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Создание карточки вопрос-ответ",
                message: "Карточка успешно создана",
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.STATIC_FAQ });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка создания карточки вопрос-ответ",
            });
        },
    });
};
