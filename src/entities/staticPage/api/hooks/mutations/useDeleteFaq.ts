import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminFaqResponse, staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteFaq = (id: number) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>([MutationKeys.DELETE_FAQ, id], () => staticPageApi.deleteFaq(id), {
        onSuccess: () => {
            const faqFromAdminList = queryClient
                .getQueriesData<GetAdminFaqResponse>([QueryKeys.GET_ADMIN_FAQ])[0]?.[1]
                ?.data.find((faq) => faq.id === id);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление карточки вопрос-ответ",
                message: `Карточка с вопросом "${faqFromAdminList?.question}" успешно удалена`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_FAQ]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления карточки вопрос-ответ",
            });
        },
    });
};
