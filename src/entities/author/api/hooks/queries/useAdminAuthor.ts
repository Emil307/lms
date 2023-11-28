import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminAuthorRequest, GetAdminAuthorResponse, authorApi } from "@entities/author";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminAuthor = ({ id }: GetAdminAuthorRequest): UseQueryResult<GetAdminAuthorResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_AUTHOR, [EntityNames.AUTHOR, EntityNames.USER], id], () => authorApi.getAdminAuthor({ id }));
};
