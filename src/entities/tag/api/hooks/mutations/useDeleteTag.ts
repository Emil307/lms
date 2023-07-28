import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { AdminTagFromList, DeleteAdminTagRequest, DeleteAdminTagResponse, GetAdminTagsResponse, tagApi } from "@entities/tag";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteTag = ({ id }: DeleteAdminTagRequest) => {
    return useMutation<DeleteAdminTagResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ADMIN_TAG, id],
        () => tagApi.deleteAdminTag({ id }),
        {
            onSuccess: () => {
                const tagData = queryClient.getQueryData<AdminTagFromList>([QueryKeys.GET_ADMIN_TAG, id]);
                const tagFromList = queryClient
                    .getQueriesData<GetAdminTagsResponse>([QueryKeys.GET_ADMIN_TAGS])[0]?.[1]
                    ?.data.find((tag) => tag.id.toString() === id);

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
        }
    );
};
