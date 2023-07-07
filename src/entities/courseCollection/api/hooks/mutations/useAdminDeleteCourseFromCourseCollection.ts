import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import {
    DeleteAdminCourseFromCourseCollectionRequest,
    DeleteAdminCourseFromCourseCollectionResponse,
    courseCollectionApi,
} from "@entities/courseCollection";
import { GetAdminCoursesResponse } from "@entities/course";

export const useAdminDeleteCourseFromCourseCollection = (params: DeleteAdminCourseFromCourseCollectionRequest) => {
    return useMutation<DeleteAdminCourseFromCourseCollectionResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_COURSE_FROM_COURSE_COLLECTION, params],
        () => courseCollectionApi.deleteAdminCourseFromCourseCollection(params),
        {
            onSuccess: () => {
                const courseFromCourseCollection = queryClient
                    .getQueriesData<GetAdminCoursesResponse>([QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_COLLECTION])[0]?.[1]
                    ?.data.find((course) => params.ids.includes(course.id));

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление курса из подборки",
                    message: `Курс "${courseFromCourseCollection?.name}" успешно удален`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_COLLECTION]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES_FROM_NO_COURSE_COLLECTION]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления курса из подборки",
                });
            },
        }
    );
};
