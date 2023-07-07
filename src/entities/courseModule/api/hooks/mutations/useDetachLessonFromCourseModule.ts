import { UseMutationResult, useMutation, InfiniteData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, TPaginationResponse } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { courseModuleApi, DetachLessonFromCourseModuleRequest, GetCourseModuleResponse } from "@entities/courseModule";
import { AdminLessonFromList } from "@entities/lesson";

export const useDetachLessonFromCourseModule = ({
    courseId,
    moduleId,
    lessonId,
}: Omit<DetachLessonFromCourseModuleRequest, "ids"> & { lessonId: string }): UseMutationResult<
    void,
    AxiosError<FormErrorResponse>,
    null
> => {
    return useMutation(
        [MutationKeys.DETACH_LESSON_FROM_COURSE_MODULE, moduleId],
        () => courseModuleApi.detachLessonFromModule({ courseId, moduleId, ids: [lessonId] }),
        {
            onSuccess: () => {
                const moduleLessonsData = queryClient.getQueryData<InfiniteData<TPaginationResponse<AdminLessonFromList[]>>>([
                    QueryKeys.GET_ADMIN_MODULE_LESSONS,
                    moduleId,
                ]);
                const lesson = moduleLessonsData?.pages
                    .find((page) => page.data.find((lesson) => String(lesson.id) === lessonId))
                    ?.data.find((module) => String(module.id) === lessonId);

                const moduleData = queryClient.getQueryData<GetCourseModuleResponse>([QueryKeys.GET_COURSE_MODULE, courseId, moduleId]);

                createNotification({
                    type: ToastType.INFO,
                    title: "Удаление урока из модуля",
                    message: `Урок "${lesson?.name}" успешно удален из модуля "${moduleData?.name}"`,
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
                    title: "Ошибка удаления урока из модуля",
                });
            },
        },
    );
};
