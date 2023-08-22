import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { DeleteAdminGroupRequest, DeleteAdminGroupResponse, groupApi } from "@entities/group";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

interface UseAdminDeleteGroupProps extends DeleteAdminGroupRequest {
    name?: string;
}

export const useAdminDeleteGroup = ({ id, name }: UseAdminDeleteGroupProps) => {
    return useMutation<DeleteAdminGroupResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ADMIN_GROUP, id],
        () => groupApi.deleteAdminGroup({ id }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление группы",
                    message: `Группа "${name}" успешно удалена`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUPS]);
            },

            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления группы",
                });
            },
        }
    );
};
