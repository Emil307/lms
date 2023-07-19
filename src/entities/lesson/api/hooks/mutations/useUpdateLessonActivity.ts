import { UseMutationResult, useMutation, InfiniteData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, TPaginationResponse } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    AdminLessonFromList,
    GetAdminLessonResponse,
    GetAdminLessonsResponse,
    lessonApi,
    UpdateLessonActivityRequest,
    UpdateLessonActivityResponse,
} from "@entities/lesson";

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
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_LESSON, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_LESSONS] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_MODULE_LESSONS, moduleId] });

            //TODO: Добавить получение данных из кэша для списка всех уроков

            const previousLessonData = queryClient.getQueryData<GetAdminLessonResponse>([QueryKeys.GET_ADMIN_LESSON, id]);
            const previousModuleLessonsData = queryClient.getQueryData<InfiniteData<TPaginationResponse<AdminLessonFromList[]>>>([
                QueryKeys.GET_ADMIN_MODULE_LESSONS,
                moduleId,
            ]);
            const previousLessonListData = queryClient.getQueryData<GetAdminLessonsResponse>([QueryKeys.GET_ADMIN_LESSONS]);

            queryClient.setQueryData<GetAdminLessonResponse>(
                [QueryKeys.GET_ADMIN_LESSON, id],
                (previousData) => previousData && { ...previousData, isActive: updatedStatus }
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
                }
            );
            queryClient.setQueriesData<GetAdminLessonsResponse>([QueryKeys.GET_ADMIN_LESSONS], (previousData) => {
                if (!previousData) {
                    return undefined;
                }
                return {
                    ...previousData,
                    data: previousData.data.map((lesson) => (String(lesson.id) === id ? { ...lesson, isActive: updatedStatus } : lesson)),
                };
            });

            return { previousLessonData, previousModuleLessonsData, previousLessonListData };
        },
        onError: (err, _, context) => {
            if (context?.previousLessonListData) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_LESSONS], context.previousLessonListData);
            }
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
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Урок "${lessonName}" ${statusMessage}.`,
            });

            //TODO: Добавил инвалидэйт деталки урока из-за нужды обновлять LastUpdated
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON, id]);

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_MODULE_LESSONS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSONS_FOR_SELECT]);
        },
    });
};
