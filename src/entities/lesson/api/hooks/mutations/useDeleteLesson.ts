import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { GetAdminLessonsResponse, GetAdminLessonResponse, lessonApi } from "@entities/lesson";

export const useDeleteLesson = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_LESSON, id], () => lessonApi.deleteLesson(id), {
        onSuccess: () => {
            const lesson = queryClient.getQueryData<GetAdminLessonResponse>([
                QueryKeys.GET_ADMIN_LESSON,
                [EntityNames.LESSON, EntityNames.USER],
                id,
            ]);
            const lessonFromList = queryClient
                .getQueriesData<GetAdminLessonsResponse>([QueryKeys.GET_ADMIN_LESSONS, [EntityNames.LESSON]])[0]?.[1]
                ?.data.find((lesson) => lesson.id.toString() === id);

            createNotification({
                type: ToastType.INFO,
                title: "Удаление Урока",
                message: `Урок "${lesson?.name || lessonFromList?.name}" успешно удален`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.LESSON, exclude: [QueryKeys.GET_ADMIN_LESSON] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления урока",
            });
        },
    });
};
