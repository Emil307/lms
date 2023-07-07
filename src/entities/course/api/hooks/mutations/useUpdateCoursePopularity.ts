import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, GetAdminCourseResponse, UpdateCoursePopularityResponse } from "@entities/course";

export const useUpdateCoursePopularity = (
    id: string,
): UseMutationResult<UpdateCoursePopularityResponse, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation(
        [MutationKeys.UPDATE_COURSE_POPULARITY, id],
        (isPopular: boolean) => courseApi.updateCoursePopularity({ id, isPopular }),
        {
            onMutate: async (updatedPopularity) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE, id] });
                const previousCourseData = queryClient.getQueryData<GetAdminCourseResponse>([QueryKeys.GET_ADMIN_COURSE, id]);

                queryClient.setQueryData<GetAdminCourseResponse>(
                    [QueryKeys.GET_ADMIN_COURSE, id],
                    (previousData) => previousData && { ...previousData, isPopular: updatedPopularity },
                );

                return { previousCourseData };
            },
            onError: (err, _, context) => {
                if (context?.previousCourseData) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_COURSE, id], context.previousCourseData);
                }
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSuccess: ({ isPopular }, _, context) => {
                const course = context?.previousCourseData;
                const statusMessage = isPopular ? "добавлен в популярные" : "удален из популярных";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса популярности",
                    message: `Учебный курс "${course?.name}" ${statusMessage}.`,
                });
            },
        },
    );
};
