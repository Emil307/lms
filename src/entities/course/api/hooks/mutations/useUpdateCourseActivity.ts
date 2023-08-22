import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    courseApi,
    GetAdminCourseResponse,
    GetAdminCoursesResponse,
    UpdateCourseActivityRequest,
    UpdateCourseActivityResponse,
} from "@entities/course";

interface UseUpdateCourseActivityProps extends Pick<UpdateCourseActivityRequest, "id"> {
    name?: string;
}

export const useUpdateCourseActivity = ({
    id,
    name,
}: UseUpdateCourseActivityProps): UseMutationResult<
    UpdateCourseActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateCourseActivityRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_COURSE_ACTIVITY, id], (data) => courseApi.updateCourseActivity({ ...data, id }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSES] });

            const previousCourseData = queryClient.getQueryData<GetAdminCourseResponse>([QueryKeys.GET_ADMIN_COURSE, id]);
            const previousCoursesData = queryClient.getQueriesData<GetAdminCoursesResponse>([QueryKeys.GET_ADMIN_COURSES]);

            queryClient.setQueryData<GetAdminCourseResponse>(
                [QueryKeys.GET_ADMIN_COURSE, id],
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueriesData<GetAdminCoursesResponse>([QueryKeys.GET_ADMIN_COURSES], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((course) => (String(course.id) === id ? { ...course, isActive } : course)),
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
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Учебный курс "${name}" ${statusMessage}.`,
            });
        },
        onSettled() {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES]);
        },
    });
};
