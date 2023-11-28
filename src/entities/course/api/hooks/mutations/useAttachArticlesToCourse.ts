import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { AttachArticlesToCourseRequest, AttachArticlesToCourseResponse, courseApi } from "@entities/course";
import { queryClient } from "@app/providers";

export const useAttachArticlesToCourse = ({
    courseId,
}: Pick<AttachArticlesToCourseRequest, "courseId">): UseMutationResult<
    AttachArticlesToCourseResponse,
    AxiosError<FormErrorResponse>,
    Omit<AttachArticlesToCourseRequest, "courseId">
> => {
    return useMutation(
        [MutationKeys.ATTACH_ARTICLES_TO_COURSE, courseId],
        (params) => courseApi.attachArticlesToCourse({ ...params, courseId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Статьи успешно привязаны к курсу",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_COURSE_ARTICLES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_ARTICLES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка привязки статей к курсу",
                });
            },
        }
    );
};
