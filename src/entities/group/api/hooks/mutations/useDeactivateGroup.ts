import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { groupApi } from "@entities/group";

export const useDeactivateGroup = (courseId: string) => {
    const queryClient = useQueryClient();
    return useMutation<null, AxiosError<FormErrorResponse>, void>(
        [MutationKeys.DEACTIVATE_GROUP, courseId],
        () => groupApi.deactivateGroup(courseId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUP, courseId]);
            },
        }
    );
};
