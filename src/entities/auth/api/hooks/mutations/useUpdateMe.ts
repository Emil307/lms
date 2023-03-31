import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { $updateMeResponse, authApi, UpdateMeRequest } from "@entities/auth";

export const useUpdateMe = () => {
    const queryClient = useQueryClient();
    return useMutation(
        [MutationKeys.UPDATE_ME],
        async (data: UpdateMeRequest) => {
            const response = await authApi.updateMe(data);
            return $updateMeResponse.parse(response);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ME]);
            },
        }
    );
};
