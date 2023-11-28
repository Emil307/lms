import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminHomeworkAnswersResourcesRequest, GetAdminHomeworkAnswersResourcesResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useAdminLessonHomeworkAnswersResources = (
    params: GetAdminHomeworkAnswersResourcesRequest
): UseQueryResult<GetAdminHomeworkAnswersResourcesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWERS_RESOURCES,
            [EntityNames.LESSON_HOMEWORK, EntityNames.COURSE, EntityNames.STUDENT],
            params,
        ],
        () => lessonApi.getAdminHomeworkAnswersResources(params)
    );
};
