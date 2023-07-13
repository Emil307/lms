import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateAdminSupportMessageRequest, CreateAdminSupportMessageResponse, supportApi } from "@entities/support";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useCreateAdminSupportMessage = () => {
    return useMutation<CreateAdminSupportMessageResponse, AxiosError<FormErrorResponse>, CreateAdminSupportMessageRequest>(
        [MutationKeys.CREATE_ADMIN_SUPPORT_MESSAGE],
        (data) => supportApi.createAdminSupportMessage(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_SUPPORT_MESSAGES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_SUPPORT_CONVERSATIONS]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Сообщение успешно отправлено",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка отправки сообщения",
                });
            },
        }
    );
};
