import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
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
    name,
    absolutePath,
}: Pick<UpdateCourseFavoriteStatusRequest, "id" | "name" | "absolutePath">): UseMutationResult<
    UpdateCourseFavoriteStatusResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateCourseFavoriteStatusRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_COURSE_FAVORITE, id], (data) => courseApi.updateCourseFavoriteStatus({ ...data, id }), {
        onMutate: async ({ isFavorite }) => {
            await queryClient.cancelQueries({
                queryKey: [
                    QueryKeys.GET_COURSE,
                    [
                        EntityNames.COURSE,
                        EntityNames.COURSE_MODULE,
                        EntityNames.GROUP,
                        EntityNames.LESSON,
                        EntityNames.LESSON_HOMEWORK,
                        EntityNames.LESSON_TEST,
                        EntityNames.CATEGORY,
                        EntityNames.TAG,

                        EntityNames.USER,
                        EntityNames.COURSE_REVIEW,
                    ],
                    id,
                ],
            });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_COURSES] });

            const previousCourseData = queryClient.getQueryData<GetCourseResponse>([
                QueryKeys.GET_COURSE,
                [
                    EntityNames.COURSE,
                    EntityNames.COURSE_MODULE,
                    EntityNames.GROUP,
                    EntityNames.LESSON,
                    EntityNames.LESSON_HOMEWORK,
                    EntityNames.LESSON_TEST,
                    EntityNames.CATEGORY,
                    EntityNames.TAG,

                    EntityNames.USER,
                    EntityNames.COURSE_REVIEW,
                ],
                id,
            ]);
            const previousCoursesData = queryClient.getQueriesData<GetCourseQueriesData>([QueryKeys.GET_COURSES]);

            queryClient.setQueryData<GetCourseResponse>(
                [
                    QueryKeys.GET_COURSE,
                    [
                        EntityNames.COURSE,
                        EntityNames.COURSE_MODULE,
                        EntityNames.GROUP,
                        EntityNames.LESSON,
                        EntityNames.LESSON_HOMEWORK,
                        EntityNames.LESSON_TEST,
                        EntityNames.CATEGORY,
                        EntityNames.TAG,

                        EntityNames.USER,
                        EntityNames.COURSE_REVIEW,
                    ],
                    id,
                ],
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
        onSuccess: (data) => {
            if (!data.isFavorite) {
                createNotification({
                    type: ToastType.IMAGE,
                    srcImage: absolutePath,
                    title: name,
                    message: "Курс удален из избранных",
                });
            }
            if (data.isFavorite) {
                createNotification({
                    type: ToastType.IMAGE,
                    srcImage: absolutePath,
                    title: name,
                    message: "Курс добавлен в избранное",
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries([
                QueryKeys.GET_COURSE,
                [
                    EntityNames.COURSE,
                    EntityNames.COURSE_MODULE,
                    EntityNames.GROUP,
                    EntityNames.LESSON,
                    EntityNames.LESSON_HOMEWORK,
                    EntityNames.LESSON_TEST,
                    EntityNames.CATEGORY,
                    EntityNames.TAG,

                    EntityNames.USER,
                    EntityNames.COURSE_REVIEW,
                ],
                id,
            ]);
            queryClient.invalidateQueries([QueryKeys.GET_COURSES]);
            queryClient.invalidateQueries([QueryKeys.GET_COURSES_INFINITE]);
        },
        onError: (err, _, context) => {
            if (context?.previousCourseData) {
                queryClient.setQueryData(
                    [
                        QueryKeys.GET_COURSE,
                        [
                            EntityNames.COURSE,
                            EntityNames.COURSE_MODULE,
                            EntityNames.GROUP,
                            EntityNames.LESSON,
                            EntityNames.LESSON_HOMEWORK,
                            EntityNames.LESSON_TEST,
                            EntityNames.CATEGORY,
                            EntityNames.TAG,

                            EntityNames.USER,
                            EntityNames.COURSE_REVIEW,
                        ],
                        id,
                    ],
                    context.previousCourseData
                );
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
