import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@shared/constant";
import { $updateMeResponse, authApi, UpdateMeRequest } from "@entities/auth";

export const useUpdateMe = () => {
    return useMutation([MutationKeys.UPDATE_ME], async (data: UpdateMeRequest) => {
        const response = await authApi.updateMe(data);
        return $updateMeResponse.parse(response);
    });
};
