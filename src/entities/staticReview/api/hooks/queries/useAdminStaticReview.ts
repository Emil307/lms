import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminStaticReviewRequest, GetAdminStaticReviewResponse, staticReviewApi } from "@entities/staticReview";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminStaticReview = ({
    id,
}: GetAdminStaticReviewRequest): UseQueryResult<GetAdminStaticReviewResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_STATIC_REVIEW, [EntityNames.STATIC_REVIEW], id],
        () => staticReviewApi.getAdminStaticReview({ id }),
        { enabled: !!id }
    );
};
