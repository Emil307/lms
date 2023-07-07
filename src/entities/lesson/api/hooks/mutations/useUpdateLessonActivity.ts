import { UseMutationResult, useMutation, InfiniteData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, TPaginationResponse } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    AdminLessonFromList,
    GetAdminLessonResponse,
    lessonApi,
    UpdateLessonActivityRequest,
    UpdateLessonActivityResponse,
} from "@entities/lesson";

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

            //TODO: Добавить получение данных из кэша для списка всех уроков

            const previousLessonData = queryClient.getQueryData<GetAdminLessonResponse>([QueryKeys.GET_ADMIN_LESSON, id]);
            const previousModuleLessonsData = queryClient.getQueryData<InfiniteData<TPaginationResponse<AdminLessonFromList[]>>>([
                QueryKeys.GET_ADMIN_MODULE_LESSONS,
                moduleId,
            ]);

            queryClient.setQueryData<GetAdminLessonResponse>(
                [QueryKeys.GET_ADMIN_LESSON, id],
                (previousData) => previousData && { ...previousData, isActive: updatedStatus },
            );
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
                },
            );

            return { previousLessonData, previousModuleLessonsData };
        },
        onError: (err, _, context) => {
            //TODO: Добавить установку кэша для списка всех уроков

            // if (context?.previousCourseModuleData) {
            //     queryClient.setQueryData([QueryKeys.GET_COURSE_MODULE, courseId, moduleId], context.previousCourseModuleData);
            // }
            if (context?.previousLessonData) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_LESSON, id], context.previousLessonData);
            }
            if (context?.previousModuleLessonsData) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_MODULE_LESSONS, moduleId], context.previousModuleLessonsData);
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSuccess: ({ isActive }, _, context) => {
            //TODO: Добавить получение данных из прошлого кэша для списка всех уроков

            const lesson = context?.previousLessonData;
            const moduleLesson = context?.previousModuleLessonsData?.pages
                .find((page) => page.data.find((lesson) => String(lesson.id) === id))
                ?.data.find((lesson) => String(lesson.id) === id);
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Урок "${moduleLesson?.name || lesson?.name}" ${statusMessage}.`,
            });

            //TODO: Добавил инвалидэйт деталки урока из-за нужды обновлять LastUpdated
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON, id]);

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_MODULE_LESSONS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS_FOR_SELECT]);
        },
    });
};
