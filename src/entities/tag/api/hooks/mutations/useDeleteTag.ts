import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { AdminTag, GetAdminTagsResponse, tagApi } from "@entities/tag";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteTag = (tagId: string) => {
    return useMutation<null, AxiosError<FormErrorResponse>, null>([MutationKeys.DELETE_TAG, tagId], () => tagApi.deleteTag(tagId), {
        onSuccess: () => {
            const tagData = queryClient.getQueryData<AdminTag>([QueryKeys.GET_ADMIN_TAG, tagId]);
            const tagFromList = queryClient
                .getQueriesData<GetAdminTagsResponse>([QueryKeys.GET_ADMIN_TAGS])[0]?.[1]
                ?.data.find((tag) => tag.id.toString() === tagId);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление тега",
                message: `Тег "${tagData?.name || tagFromList?.name}" успешно удален`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_TAGS]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления тега",
            });
        },
    });
};
