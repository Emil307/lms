import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { GetAdminGroupResponse, GetAdminGroupsResponse, groupApi } from "@entities/group";
import { ToastType, createNotification } from "@shared/utils";

export const useActivateGroup = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<null, AxiosError<FormErrorResponse>, void>([MutationKeys.ACTIVATE_GROUP, id], () => groupApi.activateGroup(id), {
        onSuccess: () => {
            const groupData = queryClient.getQueryData<GetAdminGroupResponse>([QueryKeys.GET_ADMIN_GROUP, id]);
            const groupFromList = queryClient
                .getQueriesData<GetAdminGroupsResponse>([QueryKeys.GET_ADMIN_GROUPS])[0]?.[1]
                ?.data.find((group) => group.id.toString() === id);

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Группа "${groupData?.name || groupFromList?.name}" активирована`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP, id]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUPS]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
    });
};
