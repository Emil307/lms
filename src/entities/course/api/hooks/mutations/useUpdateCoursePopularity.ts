import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, GetAdminCourseResponse, UpdateCoursePopularityRequest, UpdateCoursePopularityResponse } from "@entities/course";

interface UseUpdateCoursePopularityProps extends Pick<UpdateCoursePopularityRequest, "id"> {
    name?: string;
}

export const useUpdateCoursePopularity = ({
    id,
    name,
}: UseUpdateCoursePopularityProps): UseMutationResult<
    UpdateCoursePopularityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateCoursePopularityRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_COURSE_POPULARITY, id], (data) => courseApi.updateCoursePopularity({ ...data, id }), {
        onMutate: async ({ isPopular }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE, id] });
            const previousCourseData = queryClient.getQueryData<GetAdminCourseResponse>([QueryKeys.GET_ADMIN_COURSE, id]);

            queryClient.setQueryData<GetAdminCourseResponse>(
                [QueryKeys.GET_ADMIN_COURSE, id],
                (previousData) => previousData && { ...previousData, isPopular }
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
        onSuccess: ({ isPopular }) => {
            const statusMessage = isPopular ? "добавлен в популярные" : "удален из популярных";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса популярности",
                message: `Учебный курс "${name}" ${statusMessage}.`,
            });
        },
    });
};
