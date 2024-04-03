import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetTestPassRequest, GetTestPassResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useTestPass = (
    { lessonId, groupId }: GetTestPassRequest,
    enabled = false,
): UseQueryResult<GetTestPassResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_LESSON_TEST_PASS, [EntityNames.LESSON, EntityNames.LESSON_TEST, EntityNames.COURSE], lessonId, groupId],
        () => lessonApi.getTestPass({ lessonId, groupId }),
        {
            enabled: !!lessonId && !!groupId && enabled,
        },
    );
};
