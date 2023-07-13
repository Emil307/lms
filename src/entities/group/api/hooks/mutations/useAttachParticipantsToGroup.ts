import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { AttachParticipantsToGroupRequest, AttachParticipantsToGroupResponse, groupApi } from "@entities/group";

export const useAttachParticipantsToGroup = ({ groupId }: Pick<AttachParticipantsToGroupRequest, "groupId">) => {
    return useMutation<AttachParticipantsToGroupResponse, AxiosError<FormErrorResponse>, Omit<AttachParticipantsToGroupRequest, "groupId">>(
        [MutationKeys.ATTACH_PARTICIPANTS_TO_GROUP, groupId],
        (params) => groupApi.attachParticipantsToGroup({ ...params, groupId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Ученики успешно добавлены в группу",
                });

                //TODO: Добавить invalidate на ключ для списка ученико в которых нет в группе
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP_PARTICIPANTS]);
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
