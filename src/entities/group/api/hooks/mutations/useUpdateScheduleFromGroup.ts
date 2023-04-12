import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { UpdateScheduleFromGroupRequest, groupApi } from "@entities/group";

export const useUpdateScheduleFromGroup = (groupId?: string) => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<FormErrorResponse>, UpdateScheduleFromGroupRequest>(
        [MutationKeys.ADD_SCHEDULE_TO_GROUP],
        (data) => groupApi.updateScheduleFromGroup({ groupId, ...data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_GROUP_SCHEDULES]);
            },
        }
    );
};
