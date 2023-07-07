import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { GetAdminFaqResponse, UpdateFaqActivityStatusResponse, staticPageApi } from "@entities/staticPage";

export const useUpdateFaqActivity = (
    id: number,
): UseMutationResult<UpdateFaqActivityStatusResponse, AxiosError<FormErrorResponse>, boolean, unknown> => {
    return useMutation(
        [MutationKeys.UPDATE_FAQ_ACTIVITY, id],
        (isActive: boolean) => staticPageApi.updateActivityStatusFaq({ id, isActive }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_FAQ] });

                const previousFaqData = queryClient.getQueriesData<GetAdminFaqResponse>([QueryKeys.GET_ADMIN_FAQ]);

                queryClient.setQueriesData<GetAdminFaqResponse>([QueryKeys.GET_ADMIN_FAQ], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((faq) => (faq.id === id ? { ...faq, isActive: updatedStatus } : faq)),
                    };
                });

                return { previousFaqData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && "previousFaqData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ADMIN_FAQ], context.previousFaqData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_FAQ]);
            },
            onSuccess: () => {
                const faqFromList = queryClient
                    .getQueriesData<GetAdminFaqResponse>([QueryKeys.GET_ADMIN_FAQ])?.[0]?.[1]
                    ?.data.find((faq) => faq.id === id);

                const statusMessage = faqFromList?.isActive ? "активирован" : "деактивирован";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Материал "${faqFromList?.question}" ${statusMessage}.`,
                });
            },
        },
    );
};
