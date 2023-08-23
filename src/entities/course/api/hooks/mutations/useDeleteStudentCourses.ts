import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteStudentCoursesRequest, DeleteStudentCoursesResponse, courseApi } from "@entities/course";
import { queryClient } from "@app/providers";

export const useDeleteStudentCourses = ({ name, ...data }: DeleteStudentCoursesRequest & { name?: string }) => {
    return useMutation<DeleteStudentCoursesResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_STUDENT_COURSES, data],
        () => courseApi.deleteStudentCourses(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_STUDENT_COURSES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT_COURSES]);
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление доступа к курсу",
                    message: `Доступ к курсу "${name}" успешно удален`,
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: `Ошибка удаления доступа к курсу "${name}"`,
                });
            },
        }
    );
};
