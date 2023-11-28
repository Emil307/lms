import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    GetAdminCourseCollectionResponse,
    GetAdminCourseCollectionsResponse,
    UpdateAdminCourseCollectionActivityRequest,
    UpdateAdminCourseCollectionActivityResponse,
    courseCollectionApi,
} from "@entities/courseCollection";

export const useAdminUpdateCourseCollectionActivity = ({
    id,
}: Pick<UpdateAdminCourseCollectionActivityRequest, "id">): UseMutationResult<
    UpdateAdminCourseCollectionActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateAdminCourseCollectionActivityRequest, "id">
> => {
    return useMutation(
        [MutationKeys.UPDATE_ADMIN_COURSE_COLLECTION_ACTIVITY, id],
        (data) => courseCollectionApi.updateAdminCourseCollectionActivity({ ...data, id }),
        {
            onMutate: async ({ isActive }) => {
                await queryClient.cancelQueries({
                    queryKey: [QueryKeys.GET_ADMIN_COURSE_COLLECTION, [EntityNames.COURSE_COLLECTION, EntityNames.USER], id],
                });
                await queryClient.cancelQueries({
                    queryKey: [QueryKeys.GET_ADMIN_COURSE_COLLECTIONS, [EntityNames.COURSE_COLLECTION, EntityNames.COURSE]],
                });

                const previousCourseCollectionData = queryClient.getQueryData<GetAdminCourseCollectionResponse>([
                    QueryKeys.GET_ADMIN_COURSE_COLLECTION,
                    [EntityNames.COURSE_COLLECTION, EntityNames.USER],
                    id,
                ]);
                const previousCourseCollectionsData = queryClient.getQueriesData<GetAdminCourseCollectionsResponse>([
                    QueryKeys.GET_ADMIN_COURSE_COLLECTIONS,
                    [EntityNames.COURSE_COLLECTION, EntityNames.COURSE],
                ]);

                queryClient.setQueryData<GetAdminCourseCollectionResponse>(
                    [QueryKeys.GET_ADMIN_COURSE_COLLECTION, [EntityNames.COURSE_COLLECTION, EntityNames.USER], id],
                    (previousData) => previousData && { ...previousData, isActive }
                );

                queryClient.setQueriesData<GetAdminCourseCollectionsResponse>(
                    [QueryKeys.GET_ADMIN_COURSE_COLLECTIONS, [EntityNames.COURSE_COLLECTION, EntityNames.COURSE]],
                    (previousData) => {
                        if (!previousData) {
                            return undefined;
                        }

                        return {
                            ...previousData,
                            data: previousData.data.map((courseCollection) =>
                                String(courseCollection.id) === id ? { ...courseCollection, isActive } : courseCollection
                            ),
                        };
                    }
                );

                return { previousCourseCollectionData, previousCourseCollectionsData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && "previousCourseCollectionData" in context) {
                    queryClient.setQueryData(
                        [QueryKeys.GET_ADMIN_COURSE_COLLECTION, [EntityNames.COURSE_COLLECTION, EntityNames.USER], id],
                        context.previousCourseCollectionData
                    );
                }
                if (typeof context === "object" && "previousCourseCollectionsData" in context) {
                    queryClient.setQueriesData(
                        [QueryKeys.GET_ADMIN_COURSE_COLLECTIONS, [EntityNames.COURSE_COLLECTION, EntityNames.COURSE]],
                        context.previousCourseCollectionsData
                    );
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_COLLECTIONS]);
                queryClient.invalidateQueries([
                    QueryKeys.GET_ADMIN_COURSE_COLLECTION,
                    [EntityNames.COURSE_COLLECTION, EntityNames.USER],
                    id,
                ]);
            },
            onSuccess: () => {
                const courseCollectionData = queryClient.getQueryData<GetAdminCourseCollectionResponse>([
                    QueryKeys.GET_ADMIN_COURSE_COLLECTION,
                    [EntityNames.COURSE_COLLECTION, EntityNames.USER],
                    id,
                ]);
                const courseCollectionFromList = queryClient
                    .getQueriesData<GetAdminCourseCollectionsResponse>([
                        QueryKeys.GET_ADMIN_COURSE_COLLECTIONS,
                        [EntityNames.COURSE_COLLECTION, EntityNames.COURSE],
                    ])?.[0]?.[1]
                    ?.data.find((courseCollection) => courseCollection.id.toString() === id);

                const statusMessage =
                    courseCollectionData?.isActive || courseCollectionFromList?.isActive ? "активирована" : "деактивирована";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Подборка курсов "${courseCollectionData?.name || courseCollectionFromList?.name}" ${statusMessage}.`,
                });
            },
        }
    );
};
