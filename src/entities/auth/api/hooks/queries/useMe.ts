import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { QueryKeys } from "@shared/constant";
import { authApi, User } from "@entities/auth";
import { ECookies } from "@app/config/axios/cookies";

export const useMe = () => {
    const token = getCookie(ECookies.TOKEN);
    const tokenType = getCookie(ECookies.TOKEN_TYPE);

    return useQuery<User>([QueryKeys.GET_ME], () => authApi.getMe(), { enabled: !!token && !!tokenType });
};
