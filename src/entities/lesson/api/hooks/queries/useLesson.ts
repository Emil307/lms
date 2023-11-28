import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetLessonRequest, GetLessonResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useLesson = ({ id, courseId }: GetLessonRequest): UseQueryResult<GetLessonResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_LESSON,
            [EntityNames.LESSON, EntityNames.LESSON_HOMEWORK, EntityNames.LESSON_TEST, EntityNames.MATERIAL],
            id,
            String(courseId),
        ],
        () => lessonApi.getLesson({ id, courseId }),
        {
            enabled: !!id && !!courseId,
        }
    );
};
