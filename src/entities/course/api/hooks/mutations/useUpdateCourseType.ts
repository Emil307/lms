import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import { courseApi, CourseType, GetAdminCourseResponse, UpdateCourseTypeRequest, UpdateCourseTypeResponse } from "@entities/course";

interface UseUpdateCourseTypeProps extends Pick<UpdateCourseTypeRequest, "id"> {
    name?: string;
}

export const useUpdateCourseType = ({
    id,
    name,
}: UseUpdateCourseTypeProps): UseMutationResult<UpdateCourseTypeResponse, AxiosError<FormErrorResponse>, CourseType> => {
    return useMutation([MutationKeys.UPDATE_COURSE_TYPE, id], (type) => courseApi.updateCourseType({ id, type }), {
        onMutate: async (updatedType) => {
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
                (previousData) => previousData && { ...previousData, type: updatedType }
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
                title: "Ошибка изменения интерактивности",
            });
        },
        onSuccess: ({ type }) => {
            const statusMessage = type === "interactive" ? "стал интерактивным" : "стал неинтерактивным";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение интерактивности",
                message: `Учебный курс "${name}" ${statusMessage}.`,
            });
        },
    });
};
