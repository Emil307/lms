import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AttachLessonFromCourseModuleRequest, courseModuleApi } from "@entities/courseModule";

interface Props extends Omit<AttachLessonFromCourseModuleRequest, "ids"> {
    moduleName: string;
}

export const useAttachLessonToCourseModule = ({
    courseId,
    moduleId,
    moduleName,
}: Props): UseMutationResult<void, AxiosError<FormErrorResponse>, string[]> => {
    return useMutation(
        [MutationKeys.ATTACH_LESSON_FROM_COURSE_MODULE, moduleId],
        (lessonIds: string[]) => courseModuleApi.attachLessonToModule({ courseId, moduleId, ids: lessonIds }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.INFO,
                    title: "Прикрепление урока(ов) к модулю",
                    message: `Урок(и) успешно добавлен(ы) в модуль "${moduleName}"`,
                });

                //TODO: Временное решение, так как на бэке не успевают обновиться зависимости
                setTimeout(() => {
                    queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_MODULE, moduleId]);
                    queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS_FOR_SELECT]);
                }, 500);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка прикрепления урока(ов) к модулю",
                });
            },
        }
    );
};
