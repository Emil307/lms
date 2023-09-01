import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { GetAdminFaqResponse, UpdateFaqActivityStatusRequest, UpdateFaqActivityStatusResponse, staticPageApi } from "@entities/staticPage";

interface UseUpdateFaqActivityProps extends Pick<UpdateFaqActivityStatusRequest, "id"> {
    name: string;
}

export const useUpdateFaqActivity = ({
    id,
    name,
}: UseUpdateFaqActivityProps): UseMutationResult<
    UpdateFaqActivityStatusResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateFaqActivityStatusRequest, "id">,
    unknown
> => {
    return useMutation([MutationKeys.UPDATE_FAQ_ACTIVITY, id], (data) => staticPageApi.updateActivityStatusFaq({ ...data, id }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_FAQ] });

            const previousFaqData = queryClient.getQueriesData<GetAdminFaqResponse>([QueryKeys.GET_ADMIN_FAQ]);

            queryClient.setQueriesData<GetAdminFaqResponse>([QueryKeys.GET_ADMIN_FAQ], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((faq) => (faq.id === id ? { ...faq, isActive } : faq)),
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
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Вопрос "${name}" ${statusMessage}.`,
            });
        },
    });
};
