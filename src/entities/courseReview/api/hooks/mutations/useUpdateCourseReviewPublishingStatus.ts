import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
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

export const useUpdateCourseReviewPublishingStatus = ({
    id,
}: Omit<UpdateCourseReviewPublishingStatusRequest, "isPublished">): UseMutationResult<
    UpdateCourseReviewPublishingStatusResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateCourseReviewPublishingStatusRequest, "id">
> => {
    return useMutation(
        [MutationKeys.UPDATE_COURSE_REVIEW_PUBLISHING_STATUS],
        (data) => courseReviewApi.updateCourseReviewPublishingStatus({ ...data, id }),
        {
            onMutate: async ({ isPublished }) => {
                await queryClient.cancelQueries({
                    queryKey: [
                        QueryKeys.GET_ADMIN_COURSE_REVIEW,
                        [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                        id,
                    ],
                });
                await queryClient.cancelQueries({
                    queryKey: [
                        QueryKeys.GET_ADMIN_COURSE_REVIEWS,
                        [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                    ],
                });

                const previousCourseReviewData = queryClient.getQueryData<GetAdminCourseReviewResponse>([
                    QueryKeys.GET_ADMIN_COURSE_REVIEW,
                    [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                    id,
                ]);
                const previousCourseReviewsData = queryClient.getQueriesData<GetAdminCourseReviewsResponse>([
                    QueryKeys.GET_ADMIN_COURSE_REVIEWS,
                    [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                ]);

                queryClient.setQueryData<GetAdminCourseReviewResponse>(
                    [
                        QueryKeys.GET_ADMIN_COURSE_REVIEW,
                        [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                        id,
                    ],
                    (previousData) => previousData && { ...previousData, isPublished }
                );

                queryClient.setQueriesData<GetAdminCourseReviewsResponse>(
                    [
                        QueryKeys.GET_ADMIN_COURSE_REVIEWS,
                        [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                    ],
                    (previousData) => {
                        if (!previousData) {
                            return undefined;
                        }

                        return {
                            ...previousData,
                            data: previousData.data.map((courseReview) =>
                                String(courseReview.id) === id ? { ...courseReview, isPublished } : courseReview
                            ),
                        };
                    }
                );

                return { previousCourseReviewData, previousCourseReviewsData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && context !== null && "previousCourseReviewData" in context) {
                    queryClient.setQueryData(
                        [
                            QueryKeys.GET_ADMIN_COURSE_REVIEW,
                            [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                            id,
                        ],
                        context.previousCourseReviewData
                    );
                }
                if (typeof context === "object" && context !== null && "previousCourseReviewsData" in context) {
                    queryClient.setQueriesData(
                        [
                            QueryKeys.GET_ADMIN_COURSE_REVIEWS,
                            [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                        ],
                        context.previousCourseReviewsData
                    );
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
                const courseReviewData = queryClient.getQueryData<GetAdminCourseReviewResponse>([
                    QueryKeys.GET_ADMIN_COURSE_REVIEW,
                    [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                    id,
                ]);
                const courseReviewFromList = queryClient
                    .getQueriesData<GetAdminCourseReviewsResponse>([
                        QueryKeys.GET_ADMIN_COURSE_REVIEWS,
                        [EntityNames.COURSE_REVIEW, EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
                    ])?.[0]?.[1]
                    ?.data.find((courseReview) => courseReview.id.toString() === id);

                const statusMessage =
                    courseReviewData?.isPublished || courseReviewFromList?.isPublished ? "опубликован" : "снят с публикации";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса публикации",
                    message: `Отзыв  ${statusMessage}.`,
                });
            },
        }
    );
};
