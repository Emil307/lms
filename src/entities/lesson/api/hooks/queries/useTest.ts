import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetTestRequest, GetTestResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useTest = ({ lessonId, groupId }: GetTestRequest): UseQueryResult<GetTestResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_LESSON_TEST, [EntityNames.LESSON, EntityNames.LESSON_TEST, EntityNames.COURSE], lessonId, groupId],
        () => lessonApi.getTest({ lessonId, groupId }),

        {
            enabled: !!lessonId && !!groupId,
        },
    );
};
