import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AdminFaqItem, UpdateFaqOrderRequest, staticPageApi } from "@entities/staticPage";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateFaqOrder = () => {
    return useMutation<AdminFaqItem, AxiosError<FormErrorResponse>, UpdateFaqOrderRequest>(
        [MutationKeys.UPDATE_FAQ_ORDER],
        (data) => staticPageApi.updateFaqOrder(data),
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
                    title: "Ошибка обновления порядка карточек",
                });
            },
        },
    );
};
