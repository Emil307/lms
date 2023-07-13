import { UseMutationResult, useMutation, InfiniteData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, TPaginationResponse } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    CourseModule,
    courseModuleApi,
    GetCourseModuleResponse,
    UpdateCourseModuleActivityRequest,
    UpdateCourseModuleActivityResponse,
} from "@entities/courseModule";

export const useUpdateCourseModuleActivity = ({
    courseId,
    moduleId,
}: Omit<UpdateCourseModuleActivityRequest, "isActive">): UseMutationResult<
    UpdateCourseModuleActivityResponse,
    AxiosError<FormErrorResponse>,
    boolean
> => {
    return useMutation(
        [MutationKeys.UPDATE_COURSE_MODULE_ACTIVITY, courseId, moduleId],
        (isActive: boolean) => courseModuleApi.updateModuleActivity({ courseId, moduleId, isActive }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_COURSE_MODULE, courseId, moduleId] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_COURSE_MODULES, courseId] });

                const previousCourseModuleData = queryClient.getQueryData<GetCourseModuleResponse>([
                    QueryKeys.GET_COURSE_MODULE,
                    courseId,
                    moduleId,
                ]);
                const previousCourseModulesData = queryClient.getQueryData<InfiniteData<TPaginationResponse<CourseModule[]>>>([
                    QueryKeys.GET_COURSE_MODULES,
                    courseId,
                ]);

                queryClient.setQueryData<GetCourseModuleResponse>(
                    [QueryKeys.GET_COURSE_MODULE, courseId, moduleId],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );
                queryClient.setQueriesData<InfiniteData<TPaginationResponse<CourseModule[]>>>(
                    [QueryKeys.GET_COURSE_MODULES, courseId],
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
                    queryClient.setQueryData([QueryKeys.GET_COURSE_MODULE, courseId, moduleId], context.previousCourseModuleData);
                }
                if (context?.previousCourseModulesData) {
                    queryClient.setQueryData([QueryKeys.GET_COURSE_MODULES, courseId], context.previousCourseModulesData);
                }
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSuccess: ({ isActive }, _, context) => {
                const courseModule = context?.previousCourseModuleData;
                const courseModuleFromList = context?.previousCourseModulesData?.pages
                    .find((page) => page.data.find((module) => String(module.id) === moduleId))
                    ?.data.find((module) => String(module.id) === moduleId);
                const statusMessage = isActive ? "активирован" : "деактивирован";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Модуль "${courseModule?.name || courseModuleFromList?.name}" ${statusMessage}.`,
                });
            },
        }
    );
};
