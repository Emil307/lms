import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
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

interface UseUpdateGroupActivityProps extends Pick<UpdateGroupActivityRequest, "id"> {
    name?: string;
}

export const useUpdateGroupActivity = ({
    id,
    name,
}: UseUpdateGroupActivityProps): UseMutationResult<
    UpdateGroupActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateGroupActivityRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_GROUP_ACTIVITY, id], (data) => groupApi.updateGroupActivity({ ...data, id }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({
                queryKey: [QueryKeys.GET_ADMIN_GROUP, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT], id],
            });
            await queryClient.cancelQueries({
                queryKey: [QueryKeys.GET_ADMIN_GROUPS, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT]],
            });

            const previousGroupData = queryClient.getQueryData<GetAdminGroupResponse>([
                QueryKeys.GET_ADMIN_GROUP,
                [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT],
                id,
            ]);
            const previousGroupsData = queryClient.getQueriesData<GetAdminGroupsResponse>([
                QueryKeys.GET_ADMIN_GROUPS,
                [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT],
            ]);

            queryClient.setQueryData<GetAdminGroupResponse>(
                [QueryKeys.GET_ADMIN_GROUP, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT], id],
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueriesData<GetAdminGroupsResponse>(
                [QueryKeys.GET_ADMIN_GROUPS, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT]],
                (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((group) => (String(group.id) === id ? { ...group, isActive } : group)),
                    };
                }
            );

            return { previousGroupData, previousGroupsData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousGroupData" in context) {
                queryClient.setQueryData(
                    [QueryKeys.GET_ADMIN_GROUP, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT], id],
                    context.previousGroupData
                );
            }
            if (typeof context === "object" && "previousGroupsData" in context) {
                queryClient.setQueriesData(
                    [QueryKeys.GET_ADMIN_GROUPS, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT]],
                    context.previousGroupsData
                );
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSettled() {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUPS]);
            queryClient.invalidateQueries([QueryKeys.GET_GROUPS]);
        },
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирована" : "деактивирована";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Группа "${name}" ${statusMessage}.`,
            });
        },
    });
};
