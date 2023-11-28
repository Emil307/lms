import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { DeleteAdminTagRequest, DeleteAdminTagResponse, tagApi } from "@entities/tag";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

interface UseDeleteTagProps extends DeleteAdminTagRequest {
    name: string;
}

export const useDeleteTag = ({
    id,
    name,
}: UseDeleteTagProps): UseMutationResult<DeleteAdminTagResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ADMIN_TAG, id], () => tagApi.deleteAdminTag({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление тега",
                message: `Тег "${name}" успешно удален`,
            });
            invalidateQueriesWithPredicate({ entityName: EntityNames.TAG });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления тега",
            });
        },
    });
};
