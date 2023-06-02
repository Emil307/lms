import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi } from "@entities/course";
import { queryClient } from "@app/providers";

export const useDeleteCourse = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_COURSE, id], () => courseApi.deleteCourse(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES]);

            createNotification({
                type: ToastType.INFO,
                title: "Удаление курса",
                message: `Учебный курс успешно удален`,
            });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления курса",
            });
        },
    });
};
