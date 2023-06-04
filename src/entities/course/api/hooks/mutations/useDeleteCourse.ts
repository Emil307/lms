import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, GetAdminCourseResponse, GetAdminCoursesResponse } from "@entities/course";
import { queryClient } from "@app/providers";

export const useDeleteCourse = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_COURSE, id], () => courseApi.deleteCourse(id), {
        onSuccess: () => {
            const course = queryClient.getQueryData<GetAdminCourseResponse>([QueryKeys.GET_ADMIN_COURSE, id]);
            const courseFromList = queryClient
                .getQueriesData<GetAdminCoursesResponse>([QueryKeys.GET_ADMIN_COURSES])[0]?.[1]
                ?.data.find((course) => course.id.toString() === id);

            createNotification({
                type: ToastType.INFO,
                title: "Удаление курса",
                message: `Учебный курс "${course?.name || courseFromList?.name}" успешно удален`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления учебного курса",
            });
        },
    });
};
