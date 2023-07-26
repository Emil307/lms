import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { courseModuleApi, DeleteCourseModuleRequest } from "@entities/courseModule";

interface Props extends DeleteCourseModuleRequest {
    moduleName: string;
}

export const useDeleteCourseModule = ({
    courseId,
    moduleId,
    moduleName,
}: Props): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_COURSE_MODULE, courseId], () => courseModuleApi.deleteModule({ courseId, moduleId }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.INFO,
                title: "Удаление модуля",
                message: `Модуль "${moduleName}" успешно удален`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_MODULES, courseId]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления модуля",
            });
        },
    });
};
