import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { DeleteCourseFromCoursePackageRequest, coursePackageApi } from "@entities/coursePackage";
import { GetAdminCoursesResponse } from "@entities/course";

export const useDeleteCourseFromCoursePackage = (params: DeleteCourseFromCoursePackageRequest) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_COURSE_FROM_COURSE_PACKAGE, params],
        () => coursePackageApi.deleteCourseFromCoursePackage(params),
        {
            onSuccess: () => {
                const courseFromPackage = queryClient
                    .getQueriesData<GetAdminCoursesResponse>([QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_PACKAGE])[0]?.[1]
                    ?.data.find((course) => params.ids.includes(course.id.toString()));

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление курса из пакета",
                    message: `Курс "${courseFromPackage?.name}" успешно удален из пакета`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_PACKAGE]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления курса из пакета",
                });
            },
        },
    );
};
