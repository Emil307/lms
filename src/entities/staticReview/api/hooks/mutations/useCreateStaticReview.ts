import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AdminStaticReviewDetail, CreateAdminStaticReviewRequest, staticReviewApi } from "@entities/staticReview";

export const useCreateStaticReview = () => {
    return useMutation<AdminStaticReviewDetail, AxiosError<FormErrorResponse>, CreateAdminStaticReviewRequest>(
        [MutationKeys.CREATE_STATIC_REVIEW],
        (data) => staticReviewApi.createStaticReview(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
            },
        }
    );
};
