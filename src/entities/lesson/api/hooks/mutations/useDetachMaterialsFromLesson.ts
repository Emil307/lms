import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { DetachMaterialsFromLessonRequest, GetAdminLessonResponse, lessonApi } from "@entities/lesson";

export const useDetachMaterialsFromLesson = ({
    lessonId,
}: Omit<DetachMaterialsFromLessonRequest, "ids">): UseMutationResult<void, AxiosError<FormErrorResponse>, string[]> => {
    return useMutation(
        [MutationKeys.DETACH_MATERIALS_FROM_LESSON, lessonId],
        (fileIds: string[]) => lessonApi.detachMaterialsFromLesson({ lessonId, ids: fileIds }),
        {
            onSuccess: () => {
                const lessonData = queryClient.getQueryData<GetAdminLessonResponse>([QueryKeys.GET_ADMIN_LESSON, lessonId]);

                createNotification({
                    type: ToastType.INFO,
                    title: "Удаления материалов из урока",
                    message: `Материалы успешно удалены из урока "${lessonData?.name}"`,
                });

                //TODO: Временное решение, так как на бэке не успевают обновиться зависимости
                setTimeout(() => {
                    queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON_MATERIALS, lessonId]);
                    queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON_MATERIALS_FOR_SELECT, lessonId]);
                }, 500);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления материалов из урока",
                });
            },
        }
    );
};
