import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { CreateGroupRequest, GetAdminGroupResponse, groupApi } from "@entities/group";
import { ToastType, createNotification } from "@shared/utils";
import { queryClient } from "@app/providers";

export const useCreateGroup = () => {
    return useMutation<GetAdminGroupResponse, AxiosError<FormErrorResponse>, CreateGroupRequest>(
        [MutationKeys.CREATE_GROUP],
        (data: CreateGroupRequest) => groupApi.createGroup(data),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Создание группы",
                    message: "Группа успешно создана",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUPS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка создания группы",
                });
            },
        }
    );
};
