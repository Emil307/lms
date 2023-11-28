import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AttachMaterialsToLessonRequest, GetAdminLessonResponse, lessonApi } from "@entities/lesson";

export const useAttachMaterialsToLesson = ({
    lessonId,
}: Omit<AttachMaterialsToLessonRequest, "ids">): UseMutationResult<void, AxiosError<FormErrorResponse>, string[]> => {
    return useMutation(
        [MutationKeys.ATTACH_MATERIALS_TO_LESSON, lessonId],
        (fileIds: string[]) => lessonApi.attachMaterialsToLesson({ lessonId, ids: fileIds }),
        {
            onSuccess: () => {
                const lessonData = queryClient.getQueryData<GetAdminLessonResponse>([
                    QueryKeys.GET_ADMIN_LESSON,
                    [EntityNames.LESSON, EntityNames.USER],
                    lessonId,
                ]);

                createNotification({
                    type: ToastType.INFO,
                    title: "Добавление материалов к уроку",
                    message: `Материалы успешно добавлены в урок "${lessonData?.name}"`,
                });

                //TODO: Временное решение, так как на бэке не успевают обновиться зависимости
                setTimeout(() => {
                    queryClient.invalidateQueries([
                        QueryKeys.GET_ADMIN_LESSON_MATERIALS,
                        [EntityNames.MATERIAL, EntityNames.CATEGORY, EntityNames.LESSON],
                        lessonId,
                    ]);
                    queryClient.invalidateQueries([
                        QueryKeys.GET_ADMIN_LESSON_MATERIALS_FOR_SELECT,
                        [EntityNames.MATERIAL, EntityNames.CATEGORY, EntityNames.LESSON],
                        lessonId,
                    ]);
                    queryClient.invalidateQueries([
                        QueryKeys.GET_LESSON,
                        [EntityNames.LESSON, EntityNames.LESSON_HOMEWORK, EntityNames.LESSON_TEST, EntityNames.MATERIAL],
                        lessonId,
                    ]);
                }, 1500);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка добавления материалов к уроку",
                });
            },
        }
    );
};
