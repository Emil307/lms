import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteStudentCoursesRequest, DeleteStudentCoursesResponse, userApi } from "@entities/user";
import { queryClient } from "@app/providers";

export const useDeleteStudentCourses = ({ courseName, ...data }: DeleteStudentCoursesRequest & { courseName?: string }) => {
    return useMutation<DeleteStudentCoursesResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_STUDENT_COURSES, data],
        () => userApi.deleteStudentCourses(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_STUDENT_COURSES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT_COURSES]);
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление доступа к курсу",
                    message: `Доступ к курсу "${courseName}" успешно удален`,
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: `Ошибка удаления доступа к курсу "${courseName}"`,
                });
            },
        }
    );
};
