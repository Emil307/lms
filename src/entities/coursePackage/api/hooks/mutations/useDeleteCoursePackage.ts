import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { AdminCoursePackageDetails, GetAdminCoursePackagesResponse, coursePackageApi } from "@entities/coursePackage";

export const useDeleteCoursePackage = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_COURSE_PACKAGE, id],
        () => coursePackageApi.deleteCoursePackage(id),
        {
            onSuccess: () => {
                const coursePackageData = queryClient.getQueryData<AdminCoursePackageDetails>([QueryKeys.GET_ADMIN_COURSE_PACKAGE, id]);
                const coursePackageFromList = queryClient
                    .getQueriesData<GetAdminCoursePackagesResponse>([QueryKeys.GET_ADMIN_COURSE_PACKAGES])[0]?.[1]
                    ?.data.find((coursePackage) => coursePackage.id.toString() === id);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление пакета курсов",
                    message: `Пакет курсов "${coursePackageData?.name || coursePackageFromList?.name}" успешно удален`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_PACKAGES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления пакета курсов",
                });
            },
        }
    );
};
