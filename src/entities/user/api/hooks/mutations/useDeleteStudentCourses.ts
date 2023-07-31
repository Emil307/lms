import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteStudentCoursesRequest, DeleteStudentCoursesResponse, userApi } from "@entities/user";

export const useDeleteStudentCourses = ({ courseName, ...data }: DeleteStudentCoursesRequest & { courseName?: string }) => {
    return useMutation<DeleteStudentCoursesResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_STUDENT_COURSES, data],
        () => userApi.deleteStudentCourses(data),
        {
            onSuccess: () => {
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
