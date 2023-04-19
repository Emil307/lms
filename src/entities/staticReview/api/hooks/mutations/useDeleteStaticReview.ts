import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteStaticReview = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_TAG, id],
        () => staticReviewApi.deleteStaticReview(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
            },
        }
    );
};
