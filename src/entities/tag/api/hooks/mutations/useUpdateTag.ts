import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { AdminTag, tagApi, UpdateAdminTagRequest } from "@entities/tag";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateTag = (tagId: string) => {
    return useMutation<AdminTag, AxiosError<FormErrorResponse>, UpdateAdminTagRequest>(
        [MutationKeys.UPDATE_TAG, tagId],
        (data) => tagApi.updateAdminTag(tagId, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_TAGS]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_TAG, tagId]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления тега",
                });
            },
        },
    );
};
