import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { TUser, GetUsersResponse, usersApi } from "@entities/user";
import { FormErrorResponse } from "@shared/types";

export const useUpdateActivityStatusUser = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation([MutationKeys.UPDATE_ACTIVITY_USER], (isActive) => usersApi.updateActivityStatusUser({ id, isActive }), {
        onMutate: async (updatedStatus) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_USER, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_USERS] });

            const previousUserData = queryClient.getQueryData<TUser>([QueryKeys.GET_USER, id]);
            const previousUsersData = queryClient.getQueriesData<GetUsersResponse>([QueryKeys.GET_USERS]);

            queryClient.setQueryData<TUser>(
                [QueryKeys.GET_USER, id],
                (previousData) => previousData && { ...previousData, isActive: updatedStatus }
            );

            queryClient.setQueriesData<GetUsersResponse>([QueryKeys.GET_USERS], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((user) => (String(user.id) === id ? { ...user, isActive: updatedStatus } : user)),
                };
            });

            return { previousUserData, previousUsersData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && context !== null && "previousUserData" in context) {
                queryClient.setQueryData([QueryKeys.GET_USER, id], context.previousUserData);
            }
            if (typeof context === "object" && context !== null && "previousUsersData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_USERS], context.previousUsersData);
            }
        },
        onSettled() {
            queryClient.invalidateQueries([QueryKeys.GET_USERS]);
        },
    });
};
