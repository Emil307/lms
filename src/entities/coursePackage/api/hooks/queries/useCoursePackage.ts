import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { CoursePackageDetails, coursePackageApi } from "@entities/coursePackage";
import { FormErrorResponse } from "@shared/types";

export const useCoursePackage = (id?: string): UseQueryResult<CoursePackageDetails, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_COURSE_PACKAGE, [EntityNames.COURSE_PACKAGE, EntityNames.COURSE], id],
        () => coursePackageApi.getCoursePackage(id),
        {
            enabled: !!id,
        }
    );
};
