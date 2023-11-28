import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteStudentCoursesRequest, DeleteStudentCoursesResponse, courseApi } from "@entities/course";
import { queryClient } from "@app/providers";

export const useDeleteStudentCourses = ({
    name,
    ...data
}: DeleteStudentCoursesRequest & { name?: string }): UseMutationResult<
    DeleteStudentCoursesResponse,
    AxiosError<FormErrorResponse>,
    null
> => {
    return useMutation([MutationKeys.DELETE_STUDENT_COURSES, data], () => courseApi.deleteStudentCourses(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление доступа к курсу",
                message: `Доступ к курсу "${name}" успешно удален`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_STUDENT_COURSES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT_COURSES]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: `Ошибка удаления доступа к курсу "${name}"`,
            });
        },
    });
};
