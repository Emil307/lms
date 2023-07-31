import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, DeleteFavoriteCoursesResponse } from "@entities/course";
import { queryClient } from "@app/providers";

export const useDeleteFavoriteCourses = (): UseMutationResult<DeleteFavoriteCoursesResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_FAVORITE_COURSES], () => courseApi.deleteFavoriteCourses(), {
        onSuccess: () => {
            createNotification({
                type: ToastType.INFO,
                title: "Удаление избранных курсов",
                message: `Избранные курсы успешно удалены`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_COURSES]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления списка избранных курсов",
            });
        },
    });
};
