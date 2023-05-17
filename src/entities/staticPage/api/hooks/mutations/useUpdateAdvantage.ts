import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { Advantage, UpdateAdvantageRequest, staticPageApi } from "@entities/staticPage";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateAdvantage = (id: string) => {
    return useMutation<Advantage, AxiosError<FormErrorResponse>, UpdateAdvantageRequest>(
        [MutationKeys.UPDATE_ADVANTAGE, id],
        (data) => staticPageApi.updateAdvantage({ id, ...data }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADVANTAGES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADVANTAGE, id]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления карточки преимущества",
                });
            },
        }
    );
};
