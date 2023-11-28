import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminCategoryRequest, GetAdminCategoryResponse, categoryApi } from "@entities/category";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminCategory = ({
    id,
}: GetAdminCategoryRequest): UseQueryResult<GetAdminCategoryResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_CATEGORY, [EntityNames.CATEGORY, EntityNames.USER], id],
        () => categoryApi.getAdminCategory({ id }),
        {
            enabled: !!id,
        }
    );
};
