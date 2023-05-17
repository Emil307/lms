import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminStaticReviewDetail, GetAdminStaticReviewsResponse, staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useActivateStaticReview = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, void, unknown>(
        [MutationKeys.ACTIVATE_STATIC_REVIEW],
        () => staticReviewApi.activateStaticReview(id),
        {
            onSuccess: () => {
                const staticReviewData = queryClient.getQueryData<AdminStaticReviewDetail>([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);

                const staticReviewFromList = queryClient
                    .getQueriesData<GetAdminStaticReviewsResponse>([QueryKeys.GET_ADMIN_STATIC_REVIEWS])[0]?.[1]
                    ?.data.find((review) => review.id.toString() === id);

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Статический отзыв "${staticReviewData?.id || staticReviewFromList?.id}" активирован`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
        }
    );
};
