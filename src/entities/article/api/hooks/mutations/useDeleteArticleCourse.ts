import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteArticleCourseRequest, DeleteArticleCourseResponse, articleApi } from "@entities/article";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { GetUploadedFilesResponse } from "@entities/storage";

export const useDeleteArticleCourse = (
    data: DeleteArticleCourseRequest
): UseMutationResult<DeleteArticleCourseResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ARTICLE_COURSE, data], () => articleApi.deleteArticleCourse(data), {
        onSuccess: () => {
            const courseFromList = queryClient
                .getQueriesData<GetUploadedFilesResponse>([
                    QueryKeys.GET_ADMIN_ARTICLE_COURSES,
                    [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER, EntityNames.ARTICLE],
                ])[0]?.[1]
                ?.data.find((course) => course.id === data.courseId);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление привязки курса к статье",
                message: `Курс "${courseFromList?.name}" успешно удален`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_COURSES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_ARTICLE_COURSES]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления привязки курса",
            });
        },
    });
};
