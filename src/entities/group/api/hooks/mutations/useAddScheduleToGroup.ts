import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { AddScheduleToGroupRequest, groupApi } from "@entities/group";

export const useAddScheduleToGroup = (groupId?: string) => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<FormErrorResponse>, AddScheduleToGroupRequest>(
        [MutationKeys.ADD_SCHEDULE_TO_GROUP],
        (data: AddScheduleToGroupRequest) => groupApi.addScheduleToGroup({ groupId, ...data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_GROUP_SCHEDULES]);
            },
        }
    );
};
