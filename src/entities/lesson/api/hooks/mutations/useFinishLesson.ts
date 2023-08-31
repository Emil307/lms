import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { lessonApi, FinishLessonResponse, FinishLessonRequest } from "@entities/lesson";

export const useFinishLesson = ({ courseId, lessonId, name }: FinishLessonRequest & { name: string }) => {
    return useMutation<FinishLessonResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.FINISH_LESSON, courseId, lessonId],
        () => lessonApi.finishLesson({ courseId, lessonId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.INFO,
                    title: "Завершение урока",
                    message: `Урок "${name}" успешно завершен`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_GROUP_MODULES]);
                queryClient.invalidateQueries([QueryKeys.GET_LESSON, lessonId, courseId]);
            },
            onError: (error) => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка завершения урока",
                    message: error.response?.data.message,
                });
            },
        }
    );
};
