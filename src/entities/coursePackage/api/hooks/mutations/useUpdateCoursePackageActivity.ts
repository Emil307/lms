import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    AdminCoursePackageDetails,
    GetAdminCoursePackagesResponse,
    UpdateCoursePackageActivityResponse,
    coursePackageApi,
} from "@entities/coursePackage";

export const useUpdateCoursePackageActivity = (
    id: string
): UseMutationResult<UpdateCoursePackageActivityResponse, AxiosError<FormErrorResponse>, boolean, unknown> => {
    return useMutation(
        [MutationKeys.UPDATE_COURSE_PACKAGE_ACTIVITY, id],
        (isActive: boolean) => coursePackageApi.updateCoursePackageActivity({ id, isActive }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE_PACKAGE, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE_PACKAGES] });

                const previousCoursePackageData = queryClient.getQueryData<AdminCoursePackageDetails>([
                    QueryKeys.GET_ADMIN_COURSE_PACKAGE,
                    id,
                ]);
                const previousCoursePackagesData = queryClient.getQueriesData<GetAdminCoursePackagesResponse>([
                    QueryKeys.GET_ADMIN_COURSE_PACKAGES,
                ]);

                queryClient.setQueryData<AdminCoursePackageDetails>(
                    [QueryKeys.GET_ADMIN_COURSE_PACKAGE, id],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );

                queryClient.setQueriesData<GetAdminCoursePackagesResponse>([QueryKeys.GET_ADMIN_COURSE_PACKAGES], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((coursePackage) =>
                            String(coursePackage.id) === id ? { ...coursePackage, isActive: updatedStatus } : coursePackage
                        ),
                    };
                });

                return { previousCoursePackageData, previousCoursePackagesData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && "previousCoursePackageData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_COURSE_PACKAGE, id], context.previousCoursePackageData);
                }
                if (typeof context === "object" && "previousCoursePackagesData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ADMIN_COURSE_PACKAGES], context.previousCoursePackagesData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_PACKAGES]);
            },
            onSuccess: (updatedStatus) => {
                const coursePackageData = queryClient.getQueryData<AdminCoursePackageDetails>([QueryKeys.GET_ADMIN_COURSE_PACKAGE, id]);
                const coursePackageFromList = queryClient
                    .getQueriesData<GetAdminCoursePackagesResponse>([QueryKeys.GET_ADMIN_COURSE_PACKAGES])?.[0]?.[1]
                    ?.data.find((coursePackage) => coursePackage.id.toString() === id);

                const statusMessage = updatedStatus.isActive ? "активирован" : "деактивирован";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Пакет статей "${coursePackageData?.name || coursePackageFromList?.name}" ${statusMessage}.`,
                });
            },
        }
    );
};
