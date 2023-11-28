import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";
import { AdminCoursePackageDetails, GetAdminCoursePackagesResponse, coursePackageApi } from "@entities/coursePackage";

export const useDeleteCoursePackage = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_COURSE_PACKAGE, id], () => coursePackageApi.deleteCoursePackage(id), {
        onSuccess: () => {
            const coursePackageData = queryClient.getQueryData<AdminCoursePackageDetails>([
                QueryKeys.GET_ADMIN_COURSE_PACKAGE,
                [EntityNames.COURSE_PACKAGE, EntityNames.COURSE, EntityNames.USER],
                id,
            ]);
            const coursePackageFromList = queryClient
                .getQueriesData<GetAdminCoursePackagesResponse>([
                    QueryKeys.GET_ADMIN_COURSE_PACKAGES,
                    [EntityNames.COURSE_PACKAGE, EntityNames.COURSE],
                ])[0]?.[1]
                ?.data.find((coursePackage) => coursePackage.id.toString() === id);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление пакета курсов",
                message: `Пакет курсов "${coursePackageData?.name || coursePackageFromList?.name}" успешно удален`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.COURSE_PACKAGE, exclude: [QueryKeys.GET_ADMIN_COURSE_PACKAGE] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления пакета курсов",
            });
        },
    });
};
