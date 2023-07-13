import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AttachLessonFromCourseModuleRequest, courseModuleApi, GetCourseModuleResponse } from "@entities/courseModule";

export const useAttachLessonToCourseModule = ({
    courseId,
    moduleId,
}: Omit<AttachLessonFromCourseModuleRequest, "ids">): UseMutationResult<void, AxiosError<FormErrorResponse>, string[]> => {
    return useMutation(
        [MutationKeys.ATTACH_LESSON_FROM_COURSE_MODULE, moduleId],
        (lessonIds: string[]) => courseModuleApi.attachLessonToModule({ courseId, moduleId, ids: lessonIds }),
        {
            onSuccess: () => {
                const moduleData = queryClient.getQueryData<GetCourseModuleResponse>([QueryKeys.GET_COURSE_MODULE, courseId, moduleId]);

                createNotification({
                    type: ToastType.INFO,
                    title: "Прикрепление урока(ов) к модулю",
                    message: `Урок(и) успешно добавлен(ы) в модуль "${moduleData?.name}"`,
                });

                //TODO: Временное решение, так как на бэке не успевают обновиться зависимости
                setTimeout(() => {
                    queryClient.invalidateQueries([QueryKeys.GET_ADMIN_MODULE_LESSONS, moduleId]);
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
