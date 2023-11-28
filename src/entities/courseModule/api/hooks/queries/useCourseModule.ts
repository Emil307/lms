import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { courseModuleApi, GetCourseModuleRequest, GetCourseModuleResponse } from "@entities/courseModule";
import { FormErrorResponse } from "@shared/types";

export const useCourseModule = ({
    courseId,
    moduleId,
}: GetCourseModuleRequest): UseQueryResult<GetCourseModuleResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ADMIN_COURSE_MODULE,
            [EntityNames.COURSE_MODULE, EntityNames.COURSE, EntityNames.LESSON, EntityNames.USER],
            moduleId,
        ],
        () => courseModuleApi.getCourseModule({ courseId, moduleId }),
        {
            enabled: !!courseId && !!moduleId,
        }
    );
};
