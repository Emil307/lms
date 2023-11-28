import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetTestRequest, GetTestResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useTest = ({ lessonId, courseId }: GetTestRequest): UseQueryResult<GetTestResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_LESSON_TEST, [EntityNames.LESSON, EntityNames.LESSON_TEST, EntityNames.COURSE], lessonId, courseId],
        () => lessonApi.getTest({ lessonId, courseId }),
        {
            enabled: !!lessonId && !!courseId,
        }
    );
};
