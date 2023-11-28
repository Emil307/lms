import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { AdminCoursePackageDetails, coursePackageApi } from "@entities/coursePackage";
import { FormErrorResponse } from "@shared/types";

export const useAdminCoursePackage = (id?: string): UseQueryResult<AdminCoursePackageDetails, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_COURSE_PACKAGE, [EntityNames.COURSE_PACKAGE, EntityNames.COURSE, EntityNames.USER], id],
        () => coursePackageApi.getAdminCoursePackage(id),
        {
            enabled: !!id,
        }
    );
};
