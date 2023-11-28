import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { authApi, User } from "@entities/auth";
import { ECookies } from "@app/config/axios/cookies";
import { FormErrorResponse } from "@shared/types";

export const useMe = (): UseQueryResult<User, AxiosError<FormErrorResponse>> => {
    const token = getCookie(ECookies.TOKEN);
    const tokenType = getCookie(ECookies.TOKEN_TYPE);

    return useQuery([QueryKeys.GET_ME, [EntityNames.AUTH]], () => authApi.getMe(), {
        enabled: !!token && !!tokenType,
    });
};
