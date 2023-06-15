import { UseMutationResult, useMutation, InfiniteData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, TPaginationResponse } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { AdminLessonFromList, lessonApi, UpdateLessonActivityRequest, UpdateLessonActivityResponse } from "@entities/lesson";

export const useUpdateLessonActivity = ({
    id,
    moduleId,
}: Omit<UpdateLessonActivityRequest, "isActive">): UseMutationResult<
    UpdateLessonActivityResponse,
    AxiosError<FormErrorResponse>,
    boolean
> => {
    return useMutation([MutationKeys.UPDATE_LESSON_ACTIVITY, id], (isActive: boolean) => lessonApi.updateLessonActivity({ id, isActive }), {
        onMutate: async (updatedStatus) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_LESSON, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_LESSONS] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_MODULE_LESSONS, moduleId] });

            //TODO: Добавить получение данных из кэша для списка всех уроков + деталки урока

            // const previousCourseModuleData = queryClient.getQueryData<GetCourseModuleResponse>([
            //     QueryKeys.GET_COURSE_MODULE,
            //     courseId,
            //     moduleId,
            // ]);
            const previousModuleLessonsData = queryClient.getQueryData<InfiniteData<TPaginationResponse<AdminLessonFromList[]>>>([
                QueryKeys.GET_ADMIN_MODULE_LESSONS,
                moduleId,
            ]);

            // queryClient.setQueryData<GetCourseModuleResponse>(
            //     [QueryKeys.GET_COURSE_MODULE, courseId, moduleId],
            //     (previousData) => previousData && { ...previousData, isActive: updatedStatus }
            // );
            queryClient.setQueriesData<InfiniteData<TPaginationResponse<AdminLessonFromList[]>>>(
                [QueryKeys.GET_ADMIN_MODULE_LESSONS, moduleId],
                (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }
                    return {
                        ...previousData,
                        pages: previousData.pages.map((page) => ({
                            ...page,
                            data: page.data.map((lesson) => (String(lesson.id) === id ? { ...lesson, isActive: updatedStatus } : lesson)),
                        })),
                    };
                }
            );

            return { previousModuleLessonsData };
        },
        onError: (err, _, context) => {
            //TODO: Добавить установку кэша для списка всех уроков + деталки урока

            // if (context?.previousCourseModuleData) {
            //     queryClient.setQueryData([QueryKeys.GET_COURSE_MODULE, courseId, moduleId], context.previousCourseModuleData);
            // }
            if (context?.previousModuleLessonsData) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_MODULE_LESSONS, moduleId], context.previousModuleLessonsData);
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSuccess: ({ isActive }, _, context) => {
            //TODO: Добавить получение данных из прошлого кэша для списка всех уроков + деталки урока

            // const courseModule = context?.previousCourseModuleData;
            const moduleLessons = context?.previousModuleLessonsData?.pages
                .find((page) => page.data.find((lesson) => String(lesson.id) === id))
                ?.data.find((lesson) => String(lesson.id) === id);
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Урок "${moduleLessons?.name}" ${statusMessage}.`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_MODULE_LESSONS]);
        },
    });
};
