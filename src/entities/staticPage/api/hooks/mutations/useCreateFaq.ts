import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AdminFaqItem, CreateFaqRequest, staticPageApi } from "@entities/staticPage";
import { ToastType, createNotification } from "@shared/utils";

export const useCreateFaq = () => {
    return useMutation<AdminFaqItem, AxiosError<FormErrorResponse>, CreateFaqRequest>(
        [MutationKeys.CREATE_FAQ],
        (data) => staticPageApi.createFaq(data),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Создание карточки вопрос-ответ",
                    message: "Карточка успешно создана",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_FAQ]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка создания карточки вопрос-ответ",
                });
            },
        }
    );
};
