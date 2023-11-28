import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, DeleteCourseRequest, DeleteCourseResponse } from "@entities/course";

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

            invalidateQueriesWithPredicate({ entityName: EntityNames.COURSE, exclude: [QueryKeys.GET_ADMIN_COURSE] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления учебного курса",
            });
        },
    });
};
