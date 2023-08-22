import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteCourseArticlesRequest, DeleteCourseArticlesResponse, courseApi } from "@entities/course";
import { queryClient } from "@app/providers";

interface UseDeleteCourseArticlesProps extends DeleteCourseArticlesRequest {
    name: string;
}

export const useDeleteCourseArticles = ({ name, ...data }: UseDeleteCourseArticlesProps) => {
    return useMutation<DeleteCourseArticlesResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_COURSE_ARTICLES, data],
        () => courseApi.deleteCourseArticles(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_COURSE_ARTICLES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_ARTICLES]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление привязки статьи к курсу",
                    message: `Статья "${name}" успешно удалена`,
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления привязки курса",
                });
            },
        }
    );
};
