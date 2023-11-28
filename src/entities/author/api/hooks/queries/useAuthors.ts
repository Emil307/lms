import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { authorApi, GetAdminAuthorsRequest, GetAdminAuthorsResponse } from "@entities/author";
import { FormErrorResponse } from "@shared/types";

export const useAuthors = (params: GetAdminAuthorsRequest): UseQueryResult<GetAdminAuthorsResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_AUTHORS, [EntityNames.AUTHOR], params], () => authorApi.getAdminAuthors(params), {
        keepPreviousData: true,
        refetchOnMount: true,
    });
};
