import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    DeleteAdminCourseCollectionRequest,
    DeleteAdminCourseCollectionResponse,
    GetAdminCourseCollectionResponse,
    GetAdminCourseCollectionsResponse,
    courseCollectionApi,
} from "@entities/courseCollection";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useAdminDeleteCourseCollection = ({ id }: DeleteAdminCourseCollectionRequest) => {
    return useMutation<DeleteAdminCourseCollectionResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ADMIN_COURSE_COLLECTION, id],
        () => courseCollectionApi.deleteAdminCourseCollection({ id }),
        {
            onSuccess: () => {
                const courseCollectionData = queryClient.getQueryData<GetAdminCourseCollectionResponse>([
                    QueryKeys.GET_ADMIN_COURSE_COLLECTION,
                    id,
                ]);
                const courseCollectionFromList = queryClient
                    .getQueriesData<GetAdminCourseCollectionsResponse>([QueryKeys.GET_ADMIN_COURSE_COLLECTIONS])[0]?.[1]
                    ?.data.find((courseCollection) => courseCollection.id.toString() === id);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление подборки курсов",
                    message: `Подборка курсов "${courseCollectionData?.name || courseCollectionFromList?.name}" успешно удалена`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_COLLECTIONS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления подборки курсов",
                });
            },
        },
    );
};
