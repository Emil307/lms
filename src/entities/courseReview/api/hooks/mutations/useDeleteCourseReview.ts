import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { DeleteCourseReviewRequest, DeleteCourseReviewResponse, courseReviewApi } from "@entities/courseReview";

export const useDeleteCourseReview = ({
    id,
}: DeleteCourseReviewRequest): UseMutationResult<DeleteCourseReviewResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_COURSE_REVIEW, id], () => courseReviewApi.deleteCourseReview({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление отзыва",
                message: `Отзыв успешно удален`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.COURSE_REVIEW, exclude: [QueryKeys.GET_ADMIN_COURSE_REVIEW] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления отзыва",
            });
        },
    });
};
