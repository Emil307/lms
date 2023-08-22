import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { DeleteAdminTagRequest, DeleteAdminTagResponse, tagApi } from "@entities/tag";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

interface UseDeleteTagProps extends DeleteAdminTagRequest {
    name: string;
}

export const useDeleteTag = ({ id, name }: UseDeleteTagProps) => {
    return useMutation<DeleteAdminTagResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ADMIN_TAG, id],
        () => tagApi.deleteAdminTag({ id }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление тега",
                    message: `Тег "${name}" успешно удален`,
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
