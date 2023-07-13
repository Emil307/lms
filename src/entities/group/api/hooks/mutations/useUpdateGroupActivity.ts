import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    GetAdminGroupResponse,
    GetAdminGroupsResponse,
    UpdateGroupActivityRequest,
    UpdateGroupActivityResponse,
    groupApi,
} from "@entities/group";

export const useUpdateGroupActivity = ({
    id,
}: Pick<UpdateGroupActivityRequest, "id">): UseMutationResult<
    UpdateGroupActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateGroupActivityRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_GROUP_ACTIVITY, id], (data) => groupApi.updateGroupActivity({ ...data, id }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_GROUP, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_GROUPS] });

            const previousGroupData = queryClient.getQueryData<GetAdminGroupResponse>([QueryKeys.GET_ADMIN_GROUP, id]);
            const previousGroupsData = queryClient.getQueriesData<GetAdminGroupsResponse>([QueryKeys.GET_ADMIN_GROUPS]);

            queryClient.setQueryData<GetAdminGroupResponse>(
                [QueryKeys.GET_ADMIN_GROUP, id],
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueriesData<GetAdminGroupsResponse>([QueryKeys.GET_ADMIN_GROUPS], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((group) => (String(group.id) === id ? { ...group, isActive } : group)),
                };
            });

            return { previousGroupData, previousGroupsData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousGroupData" in context) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_GROUP, id], context.previousGroupData);
            }
            if (typeof context === "object" && "previousGroupsData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_ADMIN_GROUPS], context.previousGroupsData);
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSettled() {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUPS]);
        },
        onSuccess: (updatedStatus) => {
            const coursePackageData = queryClient.getQueryData<GetAdminGroupResponse>([QueryKeys.GET_ADMIN_GROUP, id]);
            const coursePackageFromList = queryClient
                .getQueriesData<GetAdminGroupsResponse>([QueryKeys.GET_ADMIN_GROUPS])?.[0]?.[1]
                ?.data.find((group) => group.id.toString() === id);

            const statusMessage = updatedStatus.isActive ? "активирована" : "деактивирована";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Группа "${coursePackageData?.name || coursePackageFromList?.name}" ${statusMessage}.`,
            });
        },
    });
};
