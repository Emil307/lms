import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, DeleteCourseRequest, DeleteCourseResponse } from "@entities/course";
import { queryClient } from "@app/providers";

interface UseDeleteCourseProps extends DeleteCourseRequest {
    name: string;
}

export const useDeleteCourse = ({
    id,
    name,
}: UseDeleteCourseProps): UseMutationResult<DeleteCourseResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_COURSE, id], () => courseApi.deleteCourse({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.INFO,
                title: "Удаление курса",
                message: `Учебный курс "${name}" успешно удален`,
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
