import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { authApi, User } from "@entities/auth";

export const useMe = () => {
    return useQuery<User>([QueryKeys.GET_ME], () => authApi.getMe(), { cacheTime: 0 });
};
