import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, CourseType, GetAdminCourseResponse, UpdateCourseTypeResponse } from "@entities/course";

export const useUpdateCourseType = (id: string): UseMutationResult<UpdateCourseTypeResponse, AxiosError<FormErrorResponse>, CourseType> => {
    return useMutation([MutationKeys.UPDATE_COURSE_TYPE, id], (type: CourseType) => courseApi.updateCourseType({ id, type }), {
        onMutate: async (updatedType) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE, id] });
            const previousCourseData = queryClient.getQueryData<GetAdminCourseResponse>([QueryKeys.GET_ADMIN_COURSE, id]);

            queryClient.setQueryData<GetAdminCourseResponse>(
                [QueryKeys.GET_ADMIN_COURSE, id],
                (previousData) => previousData && { ...previousData, type: updatedType }
            );

            return { previousCourseData };
        },
        onError: (err, _, context) => {
            if (context?.previousCourseData) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_COURSE, id], context.previousCourseData);
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения интерактивности",
            });
        },
        onSuccess: ({ type }, _, context) => {
            const course = context?.previousCourseData;
            const statusMessage = type === "interactive" ? "стал интерактивным" : "стал неинтерактивным";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение интерактивности",
                message: `Учебный курс "${course?.name}" ${statusMessage}.`,
            });
        },
    });
};
