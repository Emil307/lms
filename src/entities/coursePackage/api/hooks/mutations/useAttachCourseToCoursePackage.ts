import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { AttachCourseFromCoursePackageRequest, coursePackageApi } from "@entities/coursePackage";

export const useAttachCourseToCoursePackage = (coursePackageId: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, Omit<AttachCourseFromCoursePackageRequest, "coursePackageId">>(
        [MutationKeys.ATTACH_COURSE_TO_COURSE_PACKAGE, coursePackageId],
        (params) => coursePackageApi.attachCoursesFromCoursePackage({ ...params, coursePackageId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Курсы успешно добавлены в пакет",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_PACKAGE]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка добавления курсов в пакет",
                });
            },
        }
    );
};
