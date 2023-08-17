import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AttachMaterialsToLessonRequest, GetAdminLessonResponse } from "../../types";
import { lessonApi } from "../../lessonApi";

export const useAttachMaterialsToLesson = ({
    lessonId,
}: Omit<AttachMaterialsToLessonRequest, "ids">): UseMutationResult<void, AxiosError<FormErrorResponse>, string[]> => {
    return useMutation(
        [MutationKeys.ATTACH_MATERIALS_TO_LESSON, lessonId],
        (fileIds: string[]) => lessonApi.attachMaterialsToLesson({ lessonId, ids: fileIds }),
        {
            onSuccess: () => {
                const lessonData = queryClient.getQueryData<GetAdminLessonResponse>([QueryKeys.GET_ADMIN_LESSON, lessonId]);

                createNotification({
                    type: ToastType.INFO,
                    title: "Добавление материалов к уроку",
                    message: `Материалы успешно добавлены в урок "${lessonData?.name}"`,
                });

                //TODO: Временное решение, так как на бэке не успевают обновиться зависимости
                setTimeout(() => {
                    queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON_MATERIALS, lessonId]);
                    queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON_MATERIALS_FOR_SELECT, lessonId]);
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
