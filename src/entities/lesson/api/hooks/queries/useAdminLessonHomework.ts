import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminHomeworkResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useAdminLessonHomework = (lessonId: string): UseQueryResult<GetAdminHomeworkResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_LESSON_HOMEWORK, [EntityNames.LESSON, EntityNames.LESSON_HOMEWORK], lessonId],
        () => lessonApi.getAdminHomework(lessonId),
        { enabled: !!lessonId }
    );
};
