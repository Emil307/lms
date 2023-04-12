import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { groupApi } from "@entities/group";

export const useDeleteGroup = (courseId: string) => {
    const queryClient = useQueryClient();
    return useMutation<null, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_GROUP, courseId],
        () => groupApi.deleteGroup(courseId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_GROUPS, courseId]);
            },
        }
    );
};
