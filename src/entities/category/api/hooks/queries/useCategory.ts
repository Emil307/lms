import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetCategoryRequest, GetCategoryResponse, categoryApi } from "@entities/category";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useCategory = ({ id }: GetCategoryRequest): UseQueryResult<GetCategoryResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_CATEGORY, [EntityNames.CATEGORY], id], () => categoryApi.getCategory({ id }), {
        enabled: !!id && id !== "null",
    });
};
