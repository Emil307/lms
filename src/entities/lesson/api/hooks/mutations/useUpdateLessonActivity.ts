import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    GetAdminLessonResponse,
    GetAdminLessonsResponse,
    lessonApi,
    UpdateLessonActivityRequest,
    UpdateLessonActivityResponse,
} from "@entities/lesson";
import { GetCourseModuleResponse } from "@entities/courseModule";

interface ExtraProps {
    lessonName?: string;
}

export const useUpdateLessonActivity = ({
    id,
    moduleId,
    lessonName,
}: Omit<UpdateLessonActivityRequest, "isActive"> & ExtraProps): UseMutationResult<
    UpdateLessonActivityResponse,
    AxiosError<FormErrorResponse>,
    boolean
> => {
    return useMutation([MutationKeys.UPDATE_LESSON_ACTIVITY, id], (isActive: boolean) => lessonApi.updateLessonActivity({ id, isActive }), {
        onMutate: async (updatedStatus) => {
            await queryClient.cancelQueries({
                queryKey: [QueryKeys.GET_ADMIN_LESSON, [EntityNames.LESSON, EntityNames.USER], id],
            });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_LESSONS, [EntityNames.LESSON]] });
            await queryClient.cancelQueries({
                queryKey: [
                    QueryKeys.GET_ADMIN_COURSE_MODULE,
                    [EntityNames.COURSE_MODULE, EntityNames.COURSE, EntityNames.LESSON, EntityNames.USER],
                    moduleId,
                ],
            });

            //TODO: Добавить получение данных из кэша для списка всех уроков

            const previousLessonData = queryClient.getQueryData<GetAdminLessonResponse>([
                QueryKeys.GET_ADMIN_LESSON,
                [EntityNames.LESSON, EntityNames.USER],
                id,
            ]);
            const previousModuleData = queryClient.getQueryData<GetCourseModuleResponse>([
                QueryKeys.GET_ADMIN_COURSE_MODULE,
                [EntityNames.COURSE_MODULE, EntityNames.COURSE, EntityNames.LESSON, EntityNames.USER],
                moduleId,
            ]);
            const previousLessonListData = queryClient.getQueryData<GetAdminLessonsResponse>([
                QueryKeys.GET_ADMIN_LESSONS,
                [EntityNames.LESSON],
            ]);

            queryClient.setQueryData<GetAdminLessonResponse>(
                [QueryKeys.GET_ADMIN_LESSON, [EntityNames.LESSON, EntityNames.USER], id],
                (previousData) => previousData && { ...previousData, isActive: updatedStatus }
            );
            queryClient.setQueryData<GetCourseModuleResponse>(
                [
                    QueryKeys.GET_ADMIN_COURSE_MODULE,
                    [EntityNames.COURSE_MODULE, EntityNames.COURSE, EntityNames.LESSON, EntityNames.USER],
                    moduleId,
                ],
                (previousData) =>
                    previousData && {
                        ...previousData,
                        lessons: previousData.lessons.map((lesson) =>
                            String(lesson.id) === id ? { ...lesson, isActive: updatedStatus } : lesson
                        ),
                    }
            );
            queryClient.setQueriesData<GetAdminLessonsResponse>([QueryKeys.GET_ADMIN_LESSONS, [EntityNames.LESSON]], (previousData) => {
                if (!previousData) {
                    return undefined;
                }
                return {
                    ...previousData,
                    data: previousData.data.map((lesson) => (String(lesson.id) === id ? { ...lesson, isActive: updatedStatus } : lesson)),
                };
            });

            return { previousLessonData, previousModuleData, previousLessonListData };
        },
        onError: (err, _, context) => {
            if (context?.previousLessonListData) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_LESSONS, [EntityNames.LESSON]], context.previousLessonListData);
            }
            if (context?.previousLessonData) {
                queryClient.setQueryData(
                    [QueryKeys.GET_ADMIN_LESSON, [EntityNames.LESSON, EntityNames.USER], id],
                    context.previousLessonData
                );
            }
            if (context?.previousModuleData) {
                queryClient.setQueryData(
                    [
                        QueryKeys.GET_ADMIN_COURSE_MODULE,
                        [EntityNames.COURSE_MODULE, EntityNames.COURSE, EntityNames.LESSON, EntityNames.USER],
                        moduleId,
                    ],
                    context.previousModuleData
                );
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Урок "${lessonName}" ${statusMessage}.`,
            });

            //TODO: Добавил инвалидэйт деталки урока из-за нужды обновлять LastUpdated
            // queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON, id]);

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_MODULE]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS_FOR_SELECT]);
            queryClient.invalidateQueries([QueryKeys.GET_LESSON]);
        },
    });
};
