import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, GetCourseResponse, UpdateCourseFavoriteStatusRequest, UpdateCourseFavoriteStatusResponse } from "@entities/course";
import { queryClient } from "@app/providers";

export const useUpdateCourseFavoriteStatus = ({
    id,
}: Pick<UpdateCourseFavoriteStatusRequest, "id">): UseMutationResult<
    UpdateCourseFavoriteStatusResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateCourseFavoriteStatusRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_COURSE_FAVORITE, id], (data) => courseApi.updateCourseFavoriteStatus({ ...data, id }), {
        onMutate: async ({ isFavorite }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE, id] });
            const previousCourseData = queryClient.getQueryData<GetCourseResponse>([QueryKeys.GET_COURSE, id]);

            queryClient.setQueryData<GetCourseResponse>(
                [QueryKeys.GET_COURSE, id],
                (previousData) => previousData && { ...previousData, isFavorite }
            );

            return { previousCourseData };
        },
        onError: (err, _, context) => {
            if (context?.previousCourseData) {
                queryClient.setQueryData([QueryKeys.GET_COURSE, id], context.previousCourseData);
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка обновления списка избранных курсов",
            });
        },
    });
};
