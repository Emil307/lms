import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { RemoveScheduleFromGroupRequest, groupApi } from "@entities/group";

export const useDeleteScheduleFromGroup = (groupId?: string) => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<FormErrorResponse>, RemoveScheduleFromGroupRequest>(
        [MutationKeys.ADD_SCHEDULE_TO_GROUP],
        (data) => groupApi.removeScheduleFromGroup({ groupId, ...data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_GROUP_SCHEDULES]);
            },
        }
    );
};
