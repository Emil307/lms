import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetHomeworkRequest, GetHomeworkResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useHomework = ({
    lessonId,
    courseId,
}: GetHomeworkRequest): UseQueryResult<GetHomeworkResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_LESSON_HOMEWORK,
            [EntityNames.LESSON, EntityNames.LESSON_HOMEWORK, EntityNames.COURSE, EntityNames.STUDENT, EntityNames.MATERIAL],
            lessonId,
            courseId,
        ],
        () => lessonApi.getHomework({ lessonId, courseId }),
        {
            enabled: !!lessonId && !!courseId,
        }
    );
};
