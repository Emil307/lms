import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetCourseRequest, GetCourseResponse, courseApi } from "@entities/course";
import { FormErrorResponse } from "@shared/types";

export const useCourse = ({ id }: GetCourseRequest): UseQueryResult<GetCourseResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_COURSE,
            [
                EntityNames.COURSE,
                EntityNames.COURSE_MODULE,
                EntityNames.GROUP,
                EntityNames.LESSON,
                EntityNames.LESSON_HOMEWORK,
                EntityNames.LESSON_TEST,
                EntityNames.CATEGORY,
                EntityNames.TAG,

                EntityNames.USER,
                EntityNames.COURSE_REVIEW,
            ],
            id,
        ],
        () => courseApi.getCourse({ id }),
        {
            enabled: !!id,
        }
    );
};
