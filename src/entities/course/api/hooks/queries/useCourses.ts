import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { courseApi, GetCoursesRequest, GetCoursesResponse } from "@entities/course";
import { FormErrorResponse } from "@shared/types";

export const useCourses = (
    data: GetCoursesRequest,
    enabled?: boolean
): UseQueryResult<GetCoursesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_COURSES,
            [
                EntityNames.COURSE,
                EntityNames.LESSON,
                EntityNames.CATEGORY,
                EntityNames.GROUP,
                EntityNames.TAG,
                EntityNames.COURSE_COLLECTION,
            ],
            data,
        ],
        () => courseApi.getCourses(data),
        { enabled }
    );
};
