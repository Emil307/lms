import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { AttachCoursesToStudentRequest, AttachCoursesToStudentResponse, courseApi } from "@entities/course";

export const useAttachCoursesToStudent = ({ studentId }: Pick<AttachCoursesToStudentRequest, "studentId">) => {
    return useMutation<AttachCoursesToStudentResponse, AxiosError<FormErrorResponse>, Omit<AttachCoursesToStudentRequest, "studentId">>(
        [MutationKeys.ATTACH_COURSES_TO_STUDENT, studentId],
        (params) => courseApi.attachCoursesToStudent({ ...params, studentId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Курсы успешно добавлены пользователю",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_STUDENT_COURSES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_STUDENT_COURSES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка добавления курсов пользователю",
                });
            },
        }
    );
};
