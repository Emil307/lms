import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import {
    GetAdminCourseReviewResponse,
    GetAdminCourseReviewsResponse,
    UpdateCourseReviewPublishingStatusRequest,
    UpdateCourseReviewPublishingStatusResponse,
    courseReviewApi,
} from "@entities/courseReview";

export const useUpdateCourseReviewPublishingStatus = ({ id }: Omit<UpdateCourseReviewPublishingStatusRequest, "isPublished">) => {
    return useMutation<
        UpdateCourseReviewPublishingStatusResponse,
        AxiosError<FormErrorResponse>,
        Omit<UpdateCourseReviewPublishingStatusRequest, "id">,
        unknown
    >(
        [MutationKeys.UPDATE_COURSE_REVIEW_PUBLISHING_STATUS],
        (data) => courseReviewApi.updateCourseReviewPublishingStatus({ ...data, id }),
        {
            onMutate: async ({ isPublished }) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE_REVIEW, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE_REVIEWS] });

                const previousCourseReviewData = queryClient.getQueryData<GetAdminCourseReviewResponse>([
                    QueryKeys.GET_ADMIN_COURSE_REVIEW,
                    id,
                ]);
                const previousCourseReviewsData = queryClient.getQueriesData<GetAdminCourseReviewsResponse>([
                    QueryKeys.GET_ADMIN_COURSE_REVIEWS,
                ]);

                queryClient.setQueryData<GetAdminCourseReviewResponse>(
                    [QueryKeys.GET_ADMIN_COURSE_REVIEW, id],
                    (previousData) => previousData && { ...previousData, isPublished },
                );

                queryClient.setQueriesData<GetAdminCourseReviewsResponse>([QueryKeys.GET_ADMIN_COURSE_REVIEWS], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((courseReview) =>
                            String(courseReview.id) === id ? { ...courseReview, isPublished } : courseReview,
                        ),
                    };
                });

                return { previousCourseReviewData, previousCourseReviewsData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && context !== null && "previousCourseReviewData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_COURSE_REVIEW, id], context.previousCourseReviewData);
                }
                if (typeof context === "object" && context !== null && "previousCourseReviewsData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ADMIN_COURSE_REVIEWS], context.previousCourseReviewsData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса публикации",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_REVIEWS]);
            },
            onSuccess: () => {
                const courseReviewData = queryClient.getQueryData<GetAdminCourseReviewResponse>([QueryKeys.GET_ADMIN_COURSE_REVIEW, id]);
                const courseReviewFromList = queryClient
                    .getQueriesData<GetAdminCourseReviewsResponse>([QueryKeys.GET_ADMIN_COURSE_REVIEWS])?.[0]?.[1]
                    ?.data.find((courseReview) => courseReview.id.toString() === id);

                const statusMessage =
                    courseReviewData?.isPublished || courseReviewFromList?.isPublished ? "опубликован" : "снят с публикации";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса публикации",
                    message: `Отзыв  ${statusMessage}.`,
                });
            },
        },
    );
};
