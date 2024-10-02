import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminCourseResponse, courseApi } from "@entities/course";
import { FormErrorResponse } from "@shared/types";

export const useAdminCourse = (id: string): UseQueryResult<GetAdminCourseResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ADMIN_COURSE,
            [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER, EntityNames.COURSE_REVIEW],
            id,
        ],
        () => courseApi.getAdminCourse(id),
        { enabled: !!id }
    );
};
