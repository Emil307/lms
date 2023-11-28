import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, GetAdminCourseResponse, UpdateCoursePublicationRequest, UpdateCoursePublicationResponse } from "@entities/course";
import { queryClient } from "@app/providers";

export const useUpdateCoursePublication = ({
    id,
}: Pick<UpdateCoursePublicationRequest, "id">): UseMutationResult<
    UpdateCoursePublicationResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateCoursePublicationRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_PUBLICATION_COURSE, id], (data) => courseApi.updateCoursePublication({ ...data, id }), {
        onMutate: async ({ isFulfillment }) => {
            await queryClient.cancelQueries({
                queryKey: [
                    QueryKeys.GET_ADMIN_COURSE,
                    [
                        EntityNames.COURSE,
                        EntityNames.CATEGORY,
                        EntityNames.TAG,
                        EntityNames.USER,
                        EntityNames.AUTHOR,
                        EntityNames.COURSE_REVIEW,
                    ],
                    id,
                ],
            });
            const previousCourseData = queryClient.getQueryData<GetAdminCourseResponse>([
                QueryKeys.GET_ADMIN_COURSE,
                [
                    EntityNames.COURSE,
                    EntityNames.CATEGORY,
                    EntityNames.TAG,
                    EntityNames.USER,
                    EntityNames.AUTHOR,
                    EntityNames.COURSE_REVIEW,
                ],
                id,
            ]);

            queryClient.setQueryData<GetAdminCourseResponse>(
                [
                    QueryKeys.GET_ADMIN_COURSE,
                    [
                        EntityNames.COURSE,
                        EntityNames.CATEGORY,
                        EntityNames.TAG,
                        EntityNames.USER,
                        EntityNames.AUTHOR,
                        EntityNames.COURSE_REVIEW,
                    ],
                    id,
                ],
                (previousData) => previousData && { ...previousData, isFulfillment }
            );

            return { previousCourseData };
        },
        onError: (err, _, context) => {
            if (context?.previousCourseData) {
                queryClient.setQueryData(
                    [
                        QueryKeys.GET_ADMIN_COURSE,
                        [
                            EntityNames.COURSE,
                            EntityNames.CATEGORY,
                            EntityNames.TAG,
                            EntityNames.USER,
                            EntityNames.AUTHOR,
                            EntityNames.COURSE_REVIEW,
                        ],
                        id,
                    ],
                    context.previousCourseData
                );
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка публикации",
            });
        },
    });
};
