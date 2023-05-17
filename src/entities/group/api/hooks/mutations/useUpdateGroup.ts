import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { GetAdminGroupResponse, groupApi, UpdateGroupRequest } from "@entities/group";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateGroup = (id: string) => {
    return useMutation<GetAdminGroupResponse, AxiosError<FormErrorResponse>, Omit<UpdateGroupRequest, "id">>(
        [MutationKeys.UPDATE_GROUP],
        (data: Omit<UpdateGroupRequest, "id">) => groupApi.updateGroup({ ...data, id }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP, id]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления группы",
                });
            },
        }
    );
};
