import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AdminFaqItem, UpdateFaqRequest, staticPageApi } from "@entities/staticPage";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateFaq = (id: number) => {
    return useMutation<AdminFaqItem, AxiosError<FormErrorResponse>, UpdateFaqRequest>(
        [MutationKeys.UPDATE_FAQ, id],
        (data) => staticPageApi.updateFaq({ id, ...data }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_FAQ]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления карточки вопрос-ответ",
                });
            },
        }
    );
};
