import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminStaticReviewDetail, UpdateAdminStaticReviewRequest, staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useUpdateStaticReview = (id: string) => {
    return useMutation<AdminStaticReviewDetail, AxiosError<FormErrorResponse>, UpdateAdminStaticReviewRequest>(
        [MutationKeys.UPDATE_STATIC_REVIEW, id],
        (data) => staticReviewApi.updateAdminStaticReview(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);
            },
        }
    );
};
