import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useActivateStaticReview = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, void, unknown>(
        [MutationKeys.ACTIVATE_STATIC_REVIEW],
        () => staticReviewApi.activateStaticReview(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
            },
        }
    );
};
