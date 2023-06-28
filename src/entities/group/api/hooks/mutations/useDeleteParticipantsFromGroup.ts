import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { DeleteParticipantsFromGroupRequest, DeleteParticipantsFromGroupResponse, groupApi } from "@entities/group";
import { ToastType, createNotification } from "@shared/utils";
import { queryClient } from "@app/providers";

export const useDeleteParticipantsFromGroup = ({ groupId }: Pick<DeleteParticipantsFromGroupRequest, "groupId">) => {
    return useMutation<
        DeleteParticipantsFromGroupResponse,
        AxiosError<FormErrorResponse>,
        Omit<DeleteParticipantsFromGroupRequest, "groupId">
    >([MutationKeys.DELETE_PARTICIPANTS_FROM_GROUP, groupId], (data) => groupApi.deleteParticipantsFromGroup({ ...data, groupId }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление пользователя",
                message: `Пользователь успешно удален из группы`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP_PARTICIPANTS]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления пользователя из группы",
            });
        },
    });
};
