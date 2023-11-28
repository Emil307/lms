import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { AttachStudentsToGroupRequest, AttachStudentsToGroupResponse, groupApi } from "@entities/group";

export const useAttachStudentsToGroup = ({
    groupId,
}: Pick<AttachStudentsToGroupRequest, "groupId">): UseMutationResult<
    AttachStudentsToGroupResponse,
    AxiosError<FormErrorResponse>,
    Omit<AttachStudentsToGroupRequest, "groupId">
> => {
    return useMutation(
        [MutationKeys.ATTACH_ADMIN_STUDENTS_TO_GROUP, groupId],
        (params) => groupApi.attachStudentsToGroup({ ...params, groupId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Ученики успешно добавлены в группу",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENTS_NO_INCLUDED_GROUP]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP_STUDENTS]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT_GROUPS]);
                invalidateQueriesWithPredicate({ entityName: EntityNames.NOTIFICATION });
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
