import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeactivateStaticReview = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, void>(
        [MutationKeys.DEACTIVATE_STATIC_REVIEW],
        () => staticReviewApi.deactivateStaticReview(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
            },
        }
    );
};
