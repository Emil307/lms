import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    DeleteAdminCourseCollectionRequest,
    DeleteAdminCourseCollectionResponse,
    GetAdminCourseCollectionResponse,
    GetAdminCourseCollectionsResponse,
    courseCollectionApi,
} from "@entities/courseCollection";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useAdminDeleteCourseCollection = ({
    id,
}: DeleteAdminCourseCollectionRequest): UseMutationResult<DeleteAdminCourseCollectionResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ADMIN_COURSE_COLLECTION, id], () => courseCollectionApi.deleteAdminCourseCollection({ id }), {
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
                ])[0]?.[1]
                ?.data.find((courseCollection) => courseCollection.id.toString() === id);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление подборки курсов",
                message: `Подборка курсов "${courseCollectionData?.name || courseCollectionFromList?.name}" успешно удалена`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.COURSE_COLLECTION, exclude: [QueryKeys.GET_ADMIN_COURSE_COLLECTION] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления подборки курсов",
            });
        },
    });
};
