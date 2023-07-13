import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, GetAdminCourseResponse, UpdateCoursePublicationResponse } from "@entities/course";
import { queryClient } from "@app/providers";

export const useUpdateCoursePublication = (
    id: string
): UseMutationResult<UpdateCoursePublicationResponse, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation(
        [MutationKeys.UPDATE_PUBLICATION_COURSE, id],
        (isFulfillment: boolean) => courseApi.updateCoursePublication({ id, isFulfillment }),
        {
            onMutate: async (updatedPublication) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_COURSE, id] });
                const previousCourseData = queryClient.getQueryData<GetAdminCourseResponse>([QueryKeys.GET_ADMIN_COURSE, id]);

                queryClient.setQueryData<GetAdminCourseResponse>(
                    [QueryKeys.GET_ADMIN_COURSE, id],
                    (previousData) => previousData && { ...previousData, isFulfillment: updatedPublication }
                );

                return { previousCourseData };
            },
            onError: (err, _, context) => {
                if (context?.previousCourseData) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_COURSE, id], context.previousCourseData);
                }
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка публикации",
                });
            },
        }
    );
};
