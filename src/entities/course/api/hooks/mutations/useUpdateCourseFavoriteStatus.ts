import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { TPaginationResponse, ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    courseApi,
    CourseFromList,
    GetCourseResponse,
    UpdateCourseFavoriteStatusRequest,
    UpdateCourseFavoriteStatusResponse,
} from "@entities/course";
import { queryClient } from "@app/providers";

type GetCourseQueriesData = { pages: TPaginationResponse<CourseFromList[]>[]; pageParams: Array<number | null> };

export const useUpdateCourseFavoriteStatus = ({
    id,
}: Pick<UpdateCourseFavoriteStatusRequest, "id">): UseMutationResult<
    UpdateCourseFavoriteStatusResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateCourseFavoriteStatusRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_COURSE_FAVORITE, id], (data) => courseApi.updateCourseFavoriteStatus({ ...data, id }), {
        onMutate: async ({ isFavorite }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_COURSE, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_COURSES] });

            const previousCourseData = queryClient.getQueryData<GetCourseResponse>([QueryKeys.GET_COURSE, id]);
            const previousCoursesData = queryClient.getQueriesData<GetCourseQueriesData>([QueryKeys.GET_COURSES]);

            queryClient.setQueryData<GetCourseResponse>(
                [QueryKeys.GET_COURSE, id],
                (previousData) => previousData && { ...previousData, isFavorite }
            );

            queryClient.setQueryData<GetCourseQueriesData>([QueryKeys.GET_COURSES], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    pages: previousData.pages.map((page) => {
                        const updatedDataPage = page.data.map((article) =>
                            String(article.id) === id ? { ...article, isFavorite } : article
                        );

                        return {
                            ...page,
                            data: updatedDataPage,
                        };
                    }),
                };
            });

            return { previousCourseData, previousCoursesData };
        },
        onSettled: () => {
            queryClient.invalidateQueries([QueryKeys.GET_COURSE, id]);
            queryClient.invalidateQueries([QueryKeys.GET_COURSES]);
        },
        onError: (err, _, context) => {
            if (context?.previousCourseData) {
                queryClient.setQueryData([QueryKeys.GET_COURSE, id], context.previousCourseData);
            }

            if (context?.previousCoursesData) {
                queryClient.setQueryData([QueryKeys.GET_COURSES], context.previousCoursesData);
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка обновления списка избранных курсов",
            });
        },
    });
};
