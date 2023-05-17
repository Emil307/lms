import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { GetAdminGroupResponse, GetAdminGroupsResponse, groupApi } from "@entities/group";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteGroup = (id: string) => {
    const router = useRouter();
    return useMutation<null, AxiosError<FormErrorResponse>, null>([MutationKeys.DELETE_GROUP, id], () => groupApi.deleteGroup(id), {
        onSuccess: () => {
            const groupData = queryClient.getQueryData<GetAdminGroupResponse>([QueryKeys.GET_ADMIN_GROUP, id]);
            const groupFromList = queryClient
                .getQueriesData<GetAdminGroupsResponse>([QueryKeys.GET_ADMIN_GROUPS])?.[0]?.[1]
                ?.data.find((group) => group.id.toString() === id);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление группы",
                message: `Группа "${groupData?.name || groupFromList?.name}" успешно удалена`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUPS]);

            router.push({ pathname: "/admin/groups" });
        },

        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления группы",
            });
        },
    });
};
