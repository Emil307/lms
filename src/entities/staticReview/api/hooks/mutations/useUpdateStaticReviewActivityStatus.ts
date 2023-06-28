import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    AdminStaticReview,
    GetAdminStaticReviewsResponse,
    UpdateStaticReviewActivityRequest,
    UpdateStaticReviewActivityResponse,
    staticReviewApi,
} from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateStaticReviewActivityStatus = ({ id }: Pick<UpdateStaticReviewActivityRequest, "id">) => {
    return useMutation<
        UpdateStaticReviewActivityResponse,
        AxiosError<FormErrorResponse>,
        Pick<UpdateStaticReviewActivityRequest, "isActive">
    >([MutationKeys.UPDATE_STATIC_REVIEW_ACTIVITY, id], ({ isActive }) => staticReviewApi.updateStaticReviewActivity({ id, isActive }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEW, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEWS] });

            const previousReviewData = queryClient.getQueryData<AdminStaticReview>([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);
            const previousReviewsData = queryClient.getQueriesData<GetAdminStaticReviewsResponse>([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);

            queryClient.setQueryData<AdminStaticReview>(
                [QueryKeys.GET_ADMIN_STATIC_REVIEW, id],
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueriesData<GetAdminStaticReviewsResponse>([QueryKeys.GET_ADMIN_STATIC_REVIEWS], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((review) => (review.id === id ? { ...review, isActive } : review)),
                };
            });

            return { previousReviewData, previousReviewsData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && context !== null && "previousReviewData" in context) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_STATIC_REVIEW, id], context.previousReviewData);
            }
            if (typeof context === "object" && context !== null && "previousReviewsData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_ADMIN_STATIC_REVIEWS], context.previousReviewsData);
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STATIC_REVIEWS]);
        },
        onSuccess: () => {
            const staticReviewData = queryClient.getQueryData<AdminStaticReview>([QueryKeys.GET_ADMIN_STATIC_REVIEW, id]);
            const staticReviewFromList = queryClient
                .getQueriesData<GetAdminStaticReviewsResponse>([QueryKeys.GET_ADMIN_STATIC_REVIEWS])?.[0]?.[1]
                ?.data.find((review) => review.id === id);

            const statusMessage = staticReviewData?.isActive || staticReviewFromList?.isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Статический отзыв "${staticReviewData?.id || staticReviewFromList?.id}" ${statusMessage}`,
            });
        },
    });
};