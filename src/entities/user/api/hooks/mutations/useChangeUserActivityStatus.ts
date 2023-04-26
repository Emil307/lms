import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { usersApi } from "@entities/user";

export const useChangeUserActivityStatus = (id: string): UseMutationResult<void, unknown, boolean> => {
    return useMutation(
        [MutationKeys.CHANGE_ACTIVITY_STATUS_USER],
        (status) => usersApi.changeUserActivityStatus({ id, isActive: status }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_USER, id]);
                queryClient.invalidateQueries([QueryKeys.GET_USERS]);
            },
        }
    );
};
