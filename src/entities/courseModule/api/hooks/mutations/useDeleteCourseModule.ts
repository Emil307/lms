import { UseMutationResult, useMutation, InfiniteData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, TPaginationResponse } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { CourseModule, courseModuleApi, DeleteCourseModuleRequest } from "@entities/courseModule";

export const useDeleteCourseModule = ({
    courseId,
    moduleId,
}: DeleteCourseModuleRequest): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_COURSE_MODULE, courseId], () => courseModuleApi.deleteModule({ courseId, moduleId }), {
        onSuccess: () => {
            const courseModulesData = queryClient.getQueryData<InfiniteData<TPaginationResponse<CourseModule[]>>>([
                QueryKeys.GET_COURSE_MODULES,
                courseId,
            ]);
            const courseModule = courseModulesData?.pages
                .find((page) => page.data.find((module) => String(module.id) === moduleId))
                ?.data.find((module) => String(module.id) === moduleId);

            createNotification({
                type: ToastType.INFO,
                title: "Удаление модуля",
                message: `Модуль "${courseModule?.name}" успешно удален`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_COURSE_MODULES, courseId]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления модуля",
            });
        },
    });
};
