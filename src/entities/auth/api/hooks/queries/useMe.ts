import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { $getMeResponse, authApi, GetMeResponse } from "@entities/auth";

export const useMe = () => {
    return useQuery<GetMeResponse>(
        [QueryKeys.GET_ME],
        async () => {
            const response = await authApi.getMe();
            return $getMeResponse.parse(response);
        },
        { cacheTime: 0 }
    );
};
