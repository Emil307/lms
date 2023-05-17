import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { Advantage, CreateAdvantageRequest, staticPageApi } from "@entities/staticPage";
import { ToastType, createNotification } from "@shared/utils";

export const useCreateAdvantage = () => {
    return useMutation<Advantage, AxiosError<FormErrorResponse>, CreateAdvantageRequest>(
        [MutationKeys.CREATE_ADVANTAGE],
        (data) => staticPageApi.createAdvantage(data),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Создание карточки преимущества",
                    message: "Карточка успешно создана",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADVANTAGES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка создания карточки преимущества",
                });
            },
        }
    );
};
