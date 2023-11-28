import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminHomeworkAnswerResponse, lessonApi } from "@entities/lesson";
import { FormErrorResponse } from "@shared/types";

export const useAdminLessonHomeworkAnswer = (
    homeworkAnswerId: string
): UseQueryResult<GetAdminHomeworkAnswerResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWER,
            [EntityNames.LESSON_HOMEWORK, EntityNames.COURSE, EntityNames.GROUP, EntityNames.STUDENT, EntityNames.COURSE_MODULE],
            homeworkAnswerId,
        ],
        () => lessonApi.getAdminHomeworkAnswer(homeworkAnswerId),
        { enabled: !!homeworkAnswerId }
    );
};
