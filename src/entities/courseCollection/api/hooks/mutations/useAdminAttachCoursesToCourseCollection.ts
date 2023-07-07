import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import {
    AttachAdminCoursesToCourseCollectionRequest,
    AttachAdminCoursesToCourseCollectionResponse,
    courseCollectionApi,
} from "@entities/courseCollection";

export const useAdminAttachCoursesToCourseCollection = ({
    courseCollectionId,
}: Pick<AttachAdminCoursesToCourseCollectionRequest, "courseCollectionId">) => {
    return useMutation<
        AttachAdminCoursesToCourseCollectionResponse,
        AxiosError<FormErrorResponse>,
        Omit<AttachAdminCoursesToCourseCollectionRequest, "courseCollectionId">
    >(
        [MutationKeys.ATTACH_ADMIN_COURSE_TO_COURSE_COLLECTION, courseCollectionId],
        (data) => courseCollectionApi.attachAdminCoursesToCourseCollection({ ...data, courseCollectionId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Курсы успешно добавлены в подборку",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES_FROM_NO_COURSE_COLLECTION]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_COLLECTION]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка добавления курсов в подборку",
                });
            },
        },
    );
};
