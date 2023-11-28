import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { DeleteAdminGroupRequest, DeleteAdminGroupResponse, groupApi } from "@entities/group";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

interface UseAdminDeleteGroupProps extends DeleteAdminGroupRequest {
    name?: string;
}

export const useAdminDeleteGroup = ({
    id,
    name,
}: UseAdminDeleteGroupProps): UseMutationResult<DeleteAdminGroupResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ADMIN_GROUP, id], () => groupApi.deleteAdminGroup({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление группы",
                message: `Группа "${name}" успешно удалена`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.GROUP, exclude: [QueryKeys.GET_ADMIN_GROUP] });
        },

        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления группы",
            });
        },
    });
};
