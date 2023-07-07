import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, GetAdminCourseResponse, GetAdminCoursesResponse, UpdateCourseActivityResponse } from "@entities/course";

export const useUpdateCourseActivity = (
    id: string,
): UseMutationResult<UpdateCourseActivityResponse, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation([MutationKeys.UPDATE_COURSE_ACTIVITY, id], (isActive: boolean) => courseApi.updateCourseActivity({ id, isActive }), {
        onMutate: async (updatedStatus) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSES] });

            const previousCourseData = queryClient.getQueryData<GetAdminCourseResponse>([QueryKeys.GET_ADMIN_COURSE, id]);
            const previousCoursesData = queryClient.getQueriesData<GetAdminCoursesResponse>([QueryKeys.GET_ADMIN_COURSES]);

            queryClient.setQueryData<GetAdminCourseResponse>(
                [QueryKeys.GET_ADMIN_COURSE, id],
                (previousData) => previousData && { ...previousData, isActive: updatedStatus },
            );

            queryClient.setQueriesData<GetAdminCoursesResponse>([QueryKeys.GET_ADMIN_COURSES], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((course) => (String(course.id) === id ? { ...course, isActive: updatedStatus } : course)),
                };
            });

            return { previousCourseData, previousCoursesData };
        },
        onError: (err, _, context) => {
            if (context?.previousCourseData) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_COURSE, id], context.previousCourseData);
            }
            if (context?.previousCoursesData) {
                queryClient.setQueriesData([QueryKeys.GET_ADMIN_COURSES], context.previousCoursesData);
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSuccess: ({ isActive }, _, context) => {
            const course = context?.previousCourseData;
            const courseFromList = context?.previousCoursesData[0]?.[1]?.data.find((course) => String(course.id) === id);
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Учебный курс "${course?.name || courseFromList?.name}" ${statusMessage}.`,
            });
        },
        onSettled() {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES]);
        },
    });
};
