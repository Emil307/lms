import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Advantage, GetAdvantagesResponse, staticPageApi } from "@entities/staticPage";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useDeleteAdvantage = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ADVANTAGE, id], () => staticPageApi.deleteAdvantage(id), {
        onSuccess: () => {
            const advantageData = queryClient.getQueryData<Advantage>([QueryKeys.GET_ADVANTAGE, [EntityNames.STATIC_ADVANTAGE], id]);
            const advantageFromList = queryClient
                .getQueriesData<GetAdvantagesResponse>([QueryKeys.GET_ADVANTAGES, [EntityNames.STATIC_ADVANTAGE]])[0]?.[1]
                ?.data.find((advantage) => advantage.id.toString() === id);

            const advantageFromAdminList = queryClient
                .getQueriesData<GetAdvantagesResponse>([
                    QueryKeys.GET_ADMIN_ADVANTAGES,
                    [EntityNames.STATIC_ADVANTAGE, EntityNames.USER],
                ])[0]?.[1]
                ?.data.find((advantage) => advantage.id.toString() === id);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление карточки преимущества",
                message: `Карточка с преимуществом "${
                    advantageData?.title || advantageFromList?.title || advantageFromAdminList?.title
                }" успешно удалена`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.STATIC_ADVANTAGE });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления карточки преимущества",
            });
        },
    });
};
