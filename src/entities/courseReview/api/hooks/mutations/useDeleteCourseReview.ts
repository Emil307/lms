import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteCourseReviewRequest, DeleteCourseReviewResponse, courseReviewApi } from "@entities/courseReview";

export const useDeleteCourseReview = ({ id }: DeleteCourseReviewRequest) => {
    return useMutation<DeleteCourseReviewResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_COURSE_REVIEW, id],
        () => courseReviewApi.deleteCourseReview({ id }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление отзыва",
                    message: `Отзыв успешно удален`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_REVIEWS]);
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
