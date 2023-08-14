import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { AttachStudentsToGroupRequest, AttachStudentsToGroupResponse, groupApi } from "@entities/group";

export const useAttachStudentsToGroup = ({ groupId }: Pick<AttachStudentsToGroupRequest, "groupId">) => {
    return useMutation<AttachStudentsToGroupResponse, AxiosError<FormErrorResponse>, Omit<AttachStudentsToGroupRequest, "groupId">>(
        [MutationKeys.ATTACH_ADMIN_STUDENTS_TO_GROUP, groupId],
        (params) => groupApi.attachStudentsToGroup({ ...params, groupId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Ученики успешно добавлены в группу",
                });

                //TODO: Добавить invalidate на ключ для списка ученико в которых нет в группе
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP_STUDENTS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка добавления учеников в группу",
                });
            },
        }
    );
};
