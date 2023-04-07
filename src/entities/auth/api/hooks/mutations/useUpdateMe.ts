import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { authApi, UpdateMeRequest } from "@entities/auth";

export const useUpdateMe = () => {
    const queryClient = useQueryClient();
    return useMutation([MutationKeys.UPDATE_ME], (data: UpdateMeRequest) => authApi.updateMe(data), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ME]);
        },
    });
};
