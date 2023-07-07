import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    AdminStaticReview,
    DeleteStaticReviewRequest,
    DeleteStaticReviewResponse,
    GetAdminStaticReviewsResponse,
    staticReviewApi,
} from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteStaticReview = ({ id }: DeleteStaticReviewRequest) => {
    return useMutation<DeleteStaticReviewResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_STATIC_REVIEW, id],
        () => staticReviewApi.deleteStaticReview({ id }),
        {
            onSuccess: () => {
                const staticReviewData = queryClient.getQueryData<AdminStaticReview>([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);

                const staticReviewFromList = queryClient
                    .getQueriesData<GetAdminStaticReviewsResponse>([QueryKeys.GET_ADMIN_STATIC_REVIEWS])[0]?.[1]
                    ?.data.find((review) => review.id.toString() === id);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление отзыва",
                    message: `Статический отзыв "${staticReviewData?.id || staticReviewFromList?.id}" успешно удален`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления отзыва",
                });
            },
        },
    );
};
