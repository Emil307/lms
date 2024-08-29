import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";
import {
    courseApi,
    GetAdminCourseResponse,
    GetAdminCoursesResponse,
    UpdateCourseActivityRequest,
    UpdateCourseActivityResponse,
} from "@entities/course";

interface UseUpdateCourseActivityProps extends Pick<UpdateCourseActivityRequest, "id"> {
    name?: string;
}

export const useUpdateCourseActivity = ({
    id,
    name,
}: UseUpdateCourseActivityProps): UseMutationResult<
    UpdateCourseActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateCourseActivityRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_COURSE_ACTIVITY, id], (data) => courseApi.updateCourseActivity({ ...data, id }), {
        onMutate: async ({ isActive }) => {
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
            await queryClient.cancelQueries({
                queryKey: [QueryKeys.GET_ADMIN_COURSES, [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER]],
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
            const previousCoursesData = queryClient.getQueriesData<GetAdminCoursesResponse>([
                QueryKeys.GET_ADMIN_COURSES,
                [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
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
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueriesData<GetAdminCoursesResponse>(
                [QueryKeys.GET_ADMIN_COURSES, [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER]],
                (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((course) => (String(course.id) === id ? { ...course, isActive } : course)),
                    };
                }
            );

            return { previousCourseData, previousCoursesData };
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
            if (context?.previousCoursesData) {
                queryClient.setQueriesData(
                    [QueryKeys.GET_ADMIN_COURSES, [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER]],
                    context.previousCoursesData
                );
            }
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Учебный курс "${name}" ${statusMessage}.`,
            });
        },
        onSettled() {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES]);
            queryClient.invalidateQueries([QueryKeys.GET_COURSES]);
            queryClient.invalidateQueries([QueryKeys.GET_COURSES_INFINITE]);
            //ресурсы/фильтра
            queryClient.invalidateQueries([QueryKeys.GET_COURSE_RESOURCES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_COLLECTION_RESOURCES]);
            //[entityName] has article
            queryClient.invalidateQueries([QueryKeys.GET_TEACHER_COURSES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES_FROM_NO_COURSE_COLLECTION]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSES_FROM_COURSE_COLLECTION]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_COURSES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_ARTICLE_COURSES]);
            //TODO: Возможно еще какие-нибудь ключи, тк бек не может точно мне представить где активность курса влияет на отображение, а где нет
        },
    });
};
