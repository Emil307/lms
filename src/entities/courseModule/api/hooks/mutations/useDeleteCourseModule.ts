import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
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

            invalidateQueriesWithPredicate({ entityName: EntityNames.COURSE_MODULE, exclude: [QueryKeys.GET_ADMIN_COURSE_MODULE] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления модуля",
            });
        },
    });
};
