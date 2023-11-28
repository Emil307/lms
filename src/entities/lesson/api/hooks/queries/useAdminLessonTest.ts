import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminTestResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useAdminLessonTest = (lessonId: string): UseQueryResult<GetAdminTestResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_LESSON_TEST, [EntityNames.LESSON, EntityNames.LESSON_TEST], lessonId],
        () => lessonApi.getAdminTest(lessonId),
        { enabled: !!lessonId }
    );
};
