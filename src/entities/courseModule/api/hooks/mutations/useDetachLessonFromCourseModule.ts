import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { courseModuleApi, DetachLessonFromCourseModuleRequest } from "@entities/courseModule";

interface Props extends Omit<DetachLessonFromCourseModuleRequest, "ids"> {
    lessonId: string;
    lessonName: string;
    moduleName: string;
}

export const useDetachLessonFromCourseModule = ({
    courseId,
    moduleId,
    lessonId,
    lessonName,
    moduleName,
}: Props): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation(
        [MutationKeys.DETACH_LESSON_FROM_COURSE_MODULE, moduleId],
        () => courseModuleApi.detachLessonFromModule({ courseId, moduleId, ids: [lessonId] }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.INFO,
                    title: "Удаление урока из модуля",
                    message: `Урок "${lessonName}" успешно удален из модуля "${moduleName}"`,
                });

                //TODO: Временное решение, так как на бэке не успевают обновиться зависимости
                setTimeout(() => {
                    queryClient.invalidateQueries([
                        QueryKeys.GET_ADMIN_COURSE_MODULE,
                        [EntityNames.COURSE_MODULE, EntityNames.COURSE, EntityNames.LESSON, EntityNames.USER],
                        moduleId,
                    ]);
                    queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS_FOR_SELECT]);
                }, 500);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления урока из модуля",
                });
            },
        }
    );
};
