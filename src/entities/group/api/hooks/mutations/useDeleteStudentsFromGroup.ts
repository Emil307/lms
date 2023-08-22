import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { DeleteStudentsFromGroupRequest, DeleteStudentsFromGroupResponse, groupApi } from "@entities/group";
import { ToastType, createNotification } from "@shared/utils";
import { queryClient } from "@app/providers";

export const useDeleteStudentsFromGroup = ({ groupId }: Pick<DeleteStudentsFromGroupRequest, "groupId">) => {
    return useMutation<DeleteStudentsFromGroupResponse, AxiosError<FormErrorResponse>, Omit<DeleteStudentsFromGroupRequest, "groupId">>(
        [MutationKeys.DELETE_ADMIN_STUDENTS_FROM_GROUP, groupId],
        (data) => groupApi.deleteStudentsFromGroup({ ...data, groupId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление ученика",
                    message: `Ученик успешно удален из группы`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENTS_NO_INCLUDED_GROUP]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP_STUDENTS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления ученика из группы",
                });
            },
        }
    );
};
