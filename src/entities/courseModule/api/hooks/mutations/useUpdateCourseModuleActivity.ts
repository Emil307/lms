import { UseMutationResult, useMutation, InfiniteData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, TPaginationResponse } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    courseModuleApi,
    CourseModuleWithoutLessons,
    GetCourseModuleResponse,
    UpdateCourseModuleActivityRequest,
    UpdateCourseModuleActivityResponse,
} from "@entities/courseModule";

interface Props extends Omit<UpdateCourseModuleActivityRequest, "isActive"> {
    moduleName: string;
}

export const useUpdateCourseModuleActivity = ({
    courseId,
    moduleId,
    moduleName,
}: Props): UseMutationResult<UpdateCourseModuleActivityResponse, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation(
        [MutationKeys.UPDATE_COURSE_MODULE_ACTIVITY, courseId, moduleId],
        (isActive: boolean) => courseModuleApi.updateModuleActivity({ courseId, moduleId, isActive }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE_MODULE, moduleId] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE_MODULES, courseId] });

                const previousCourseModuleData = queryClient.getQueryData<GetCourseModuleResponse>([
                    QueryKeys.GET_ADMIN_COURSE_MODULE,
                    moduleId,
                ]);
                const previousCourseModulesData = queryClient.getQueryData<InfiniteData<TPaginationResponse<CourseModuleWithoutLessons[]>>>(
                    [QueryKeys.GET_ADMIN_COURSE_MODULES, courseId]
                );

                queryClient.setQueryData<GetCourseModuleResponse>(
                    [QueryKeys.GET_ADMIN_COURSE_MODULE, moduleId],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );
                queryClient.setQueriesData<InfiniteData<TPaginationResponse<CourseModuleWithoutLessons[]>>>(
                    [QueryKeys.GET_ADMIN_COURSE_MODULES, courseId],
                    (previousData) => {
                        if (!previousData) {
                            return undefined;
                        }
                        return {
                            ...previousData,
                            pages: previousData.pages.map((page) => ({
                                ...page,
                                data: page.data.map((module) =>
                                    String(module.id) === moduleId ? { ...module, isActive: updatedStatus } : module
                                ),
                            })),
                        };
                    }
                );

                return { previousCourseModuleData, previousCourseModulesData };
            },
            onError: (err, _, context) => {
                if (context?.previousCourseModuleData) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_COURSE_MODULE, moduleId], context.previousCourseModuleData);
                }
                if (context?.previousCourseModulesData) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_COURSE_MODULES, courseId], context.previousCourseModulesData);
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
                    message: `Модуль "${moduleName}" ${statusMessage}.`,
                });
            },
        }
    );
};
