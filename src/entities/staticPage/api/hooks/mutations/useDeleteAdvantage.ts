import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Advantage, GetAdvantagesResponse, staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteAdvantage = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ADVANTAGE, id],
        () => staticPageApi.deleteAdvantage(id),
        {
            onSuccess: () => {
                const advantageData = queryClient.getQueryData<Advantage>([QueryKeys.GET_ADVANTAGE, id]);
                const advantageFromList = queryClient
                    .getQueriesData<GetAdvantagesResponse>([QueryKeys.GET_ADVANTAGES])[0]?.[1]
                    ?.data.find((advantage) => advantage.id.toString() === id);

                const advantageFromAdminList = queryClient
                    .getQueriesData<GetAdvantagesResponse>([QueryKeys.GET_ADMIN_ADVANTAGES])[0]?.[1]
                    ?.data.find((advantage) => advantage.id.toString() === id);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление карточки преимущества",
                    message: `Карточка с преимуществом "${
                        advantageData?.title || advantageFromList?.title || advantageFromAdminList?.title
                    }" успешно удалена`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADVANTAGES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ADVANTAGES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления карточки преимущества",
                });
            },
        }
    );
};
