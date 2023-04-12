import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { groupApi } from "@entities/group";

export const useActivateGroup = (courseId: string) => {
    const queryClient = useQueryClient();
    return useMutation<null, AxiosError<FormErrorResponse>, void>(
        [MutationKeys.ACTIVATE_GROUP, courseId],
        () => groupApi.activateGroup(courseId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP, courseId]);
            },
        }
    );
};
