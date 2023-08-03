import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminHomeworkAnswersResourcesRequest, GetAdminHomeworkAnswersResourcesResponse, lessonApi } from "@entities/lesson";

export const useAdminLessonHomeworkAnswersResources = (params: GetAdminHomeworkAnswersResourcesRequest) => {
    return useQuery<GetAdminHomeworkAnswersResourcesResponse>([QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWERS_RESOURCES, params], () =>
        lessonApi.getAdminHomeworkAnswersResources(params)
    );
};
